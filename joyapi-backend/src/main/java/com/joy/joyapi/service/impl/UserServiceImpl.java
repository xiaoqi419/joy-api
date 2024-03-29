package com.joy.joyapi.service.impl;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.IdUtil;
import cn.hutool.core.util.RandomUtil;
import cn.hutool.crypto.digest.DigestUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.joy.joyapi.common.BaseResponse;
import com.joy.joyapi.common.ErrorCode;
import com.joy.joyapi.common.ResultUtils;
import com.joy.joyapi.constant.CommonConstant;
import com.joy.joyapi.exception.BusinessException;
import com.joy.joyapi.mapper.UserMapper;
import com.joy.joyapi.model.dto.user.UserQueryRequest;
import com.joy.joyapi.model.entity.User;
import com.joy.joyapi.model.enums.UserRoleEnum;
import com.joy.joyapi.model.vo.LoginUserVO;
import com.joy.joyapi.model.vo.UserVO;
import com.joy.joyapi.service.UserService;
import com.joy.joyapi.utils.RandomSmsNumUtils;
import com.joy.joyapi.utils.RegExpUtil;
import com.joy.joyapi.utils.SqlUtils;
import lombok.extern.slf4j.Slf4j;
import me.chanjar.weixin.common.bean.WxOAuth2UserInfo;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.annotation.Resource;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import static com.joy.joyapi.constant.RedisConstant.SEND_EMAIL_CODE;
import static com.joy.joyapi.constant.UserConstant.USER_LOGIN_STATE;

/**
 * 用户服务实现
 *
 * @author Jason
 * @from <a href="https://www.ojason.top">我的博客</a>
 */
@Service
@Slf4j
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    /**
     * 盐值，混淆密码
     */
    public static final String SALT = "joy";

    @Resource
    private TemplateEngine templateEngine;
    @Resource
    private JavaMailSender javaMailSender;
    @Resource
    private RedisTemplate<String, Object> redisTemplate;
    @Value("${spring.mail.username}")
    private String username;

    @Override
    public long userRegister(String userAccount, String userPassword, String checkPassword, String captchaCode, HttpServletRequest request) {
        // 1. 校验
        if (StringUtils.isAnyBlank(userAccount, userPassword, checkPassword)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "参数为空");
        }
        if (userAccount.length() < 4) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "用户账号过短");
        }
        if (userPassword.length() < 8 || checkPassword.length() < 8) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "用户密码过短");
        }
        // 密码和校验密码相同
        if (!userPassword.equals(checkPassword)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "两次输入的密码不一致");
        }
        // 校验验证码，不区分大小写
        String verifyCode = (String) request.getSession().getAttribute("CaptchaCode");
        if (!StringUtils.equalsIgnoreCase(captchaCode, verifyCode)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "验证码错误");
        }

        synchronized (userAccount.intern()) {
            // 账户不能重复
            QueryWrapper<User> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("user_account", userAccount);
            long count = this.baseMapper.selectCount(queryWrapper);
            if (count > 0) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR, "账号重复");
            }
            // 2. 加密
            String encryptPassword = DigestUtils.md5DigestAsHex((SALT + userPassword).getBytes());
            // 3. 分配 accessKey 和 secretKey
            String accessKey = DigestUtil.md5Hex(SALT + userAccount + RandomUtil.randomNumbers(5));
            String secretKey = DigestUtil.md5Hex(SALT + userAccount + RandomUtil.randomNumbers(10));
            // 4. 插入数据
            User user = new User();
            user.setUserAccount(userAccount);
            user.setUserPassword(encryptPassword);
            user.setAccessKey(accessKey);
            user.setSecretKey(secretKey);
            // 随机生成用户名
            String simpleUUID = IdUtil.simpleUUID();
            user.setUserName("用户" + simpleUUID.substring(0, 10));
            // 生成独属与用户的access_key和secret_key
            user.setAccessKey(IdUtil.simpleUUID());
            user.setSecretKey(IdUtil.simpleUUID());
            boolean saveResult = this.save(user);
            if (!saveResult) {
                throw new BusinessException(ErrorCode.SYSTEM_ERROR, "注册失败，数据库错误");
            }
            return user.getId();
        }
    }

    @Override
    public LoginUserVO userLogin(String userAccount, String userPassword, HttpServletRequest request) {
        // 1. 校验
        if (StringUtils.isAnyBlank(userAccount, userPassword)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "参数为空");
        }
        if (userAccount.length() < 4) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "账号错误");
        }
        if (userPassword.length() < 8) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "密码错误");
        }
        // 2. 加密
        String encryptPassword = DigestUtils.md5DigestAsHex((SALT + userPassword).getBytes());
        // 查询用户是否存在
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_account", userAccount);
        queryWrapper.eq("user_password", encryptPassword);
        User user = this.baseMapper.selectOne(queryWrapper);
        // 用户不存在
        if (user == null) {
            log.info("user login failed, userAccount cannot match userPassword");
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "用户不存在或密码错误");
        }
        // 3. 记录用户的登录态
        request.getSession().setAttribute(USER_LOGIN_STATE, user);
        return this.getLoginUserVO(user);
    }

    @Override
    public LoginUserVO userLoginByMpOpen(WxOAuth2UserInfo wxOAuth2UserInfo, HttpServletRequest request) {
        String unionId = wxOAuth2UserInfo.getUnionId();
        String mpOpenId = wxOAuth2UserInfo.getOpenid();
        // 单机锁
        synchronized (unionId.intern()) {
            // 查询用户是否已存在
            QueryWrapper<User> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("union_id", unionId);
            User user = this.getOne(queryWrapper);
            // 被封号，禁止登录
            if (user != null && UserRoleEnum.BAN.getValue().equals(user.getUserRole())) {
                throw new BusinessException(ErrorCode.FORBIDDEN_ERROR, "该用户已被封，禁止登录");
            }
            // 用户不存在则创建
            if (user == null) {
                user = new User();
                user.setUnionId(unionId);
                user.setMpOpenId(mpOpenId);
                user.setUserAvatar(wxOAuth2UserInfo.getHeadImgUrl());
                user.setUserName(wxOAuth2UserInfo.getNickname());
                boolean result = this.save(user);
                if (!result) {
                    throw new BusinessException(ErrorCode.SYSTEM_ERROR, "登录失败");
                }
            }
            // 记录用户的登录态
            request.getSession().setAttribute(USER_LOGIN_STATE, user);
            return getLoginUserVO(user);
        }
    }

    /**
     * 获取当前登录用户
     *
     * @param request
     * @return
     */
    @Override
    public User getLoginUser(HttpServletRequest request) {
        // 先判断是否已登录
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User currentUser = (User) userObj;
        if (currentUser == null || currentUser.getId() == null) {
            throw new BusinessException(ErrorCode.NOT_LOGIN_ERROR);
        }
        // 从数据库查询（追求性能的话可以注释，直接走缓存）
        long userId = currentUser.getId();
        currentUser = this.getById(userId);
        if (currentUser == null) {
            throw new BusinessException(ErrorCode.NOT_LOGIN_ERROR);
        }
        return currentUser;
    }

    /**
     * 获取当前登录用户（允许未登录）
     *
     * @param request
     * @return
     */
    @Override
    public User getLoginUserPermitNull(HttpServletRequest request) {
        // 先判断是否已登录
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User currentUser = (User) userObj;
        if (currentUser == null || currentUser.getId() == null) {
            return null;
        }
        // 从数据库查询（追求性能的话可以注释，直接走缓存）
        long userId = currentUser.getId();
        return this.getById(userId);
    }

    /**
     * 是否为管理员
     *
     * @param request
     * @return
     */
    @Override
    public boolean isAdmin(HttpServletRequest request) {
        // 仅管理员可查询
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user = (User) userObj;
        return isAdmin(user);
    }

    @Override
    public boolean isAdmin(User user) {
        return user != null && UserRoleEnum.ADMIN.getValue().equals(user.getUserRole());
    }

    /**
     * 用户注销
     *
     * @param request
     */
    @Override
    public boolean userLogout(HttpServletRequest request) {
        if (request.getSession().getAttribute(USER_LOGIN_STATE) == null) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "未登录");
        }
        // 移除登录态
        request.getSession().removeAttribute(USER_LOGIN_STATE);
        return true;
    }

    @Override
    public LoginUserVO getLoginUserVO(User user) {
        if (user == null) {
            return null;
        }
        LoginUserVO loginUserVO = new LoginUserVO();
        BeanUtils.copyProperties(user, loginUserVO);
        return loginUserVO;
    }

    @Override
    public UserVO getUserVO(User user) {
        if (user == null) {
            return null;
        }
        UserVO userVO = new UserVO();
        BeanUtils.copyProperties(user, userVO);
        return userVO;
    }

    @Override
    public List<UserVO> getUserVO(List<User> userList) {
        if (CollUtil.isEmpty(userList)) {
            return new ArrayList<>();
        }
        return userList.stream().map(this::getUserVO).collect(Collectors.toList());
    }

    @Override
    public QueryWrapper<User> getQueryWrapper(UserQueryRequest userQueryRequest) {
        if (userQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "请求参数为空");
        }
        Long id = userQueryRequest.getId();
        String unionId = userQueryRequest.getUnionId();
        String mpOpenId = userQueryRequest.getMpOpenId();
        String userName = userQueryRequest.getUserName();
        String userProfile = userQueryRequest.getUserProfile();
        String userRole = userQueryRequest.getUserRole();
        String sortField = userQueryRequest.getSortField();
        String sortOrder = userQueryRequest.getSortOrder();
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq(id != null, "id", id);
        queryWrapper.eq(StringUtils.isNotBlank(unionId), "union_id", unionId);
        queryWrapper.eq(StringUtils.isNotBlank(mpOpenId), "mp_open_id", mpOpenId);
        queryWrapper.eq(StringUtils.isNotBlank(userRole), "user_role", userRole);
        queryWrapper.like(StringUtils.isNotBlank(userProfile), "user_profile", userProfile);
        queryWrapper.like(StringUtils.isNotBlank(userName), "user_name", userName);
        queryWrapper.orderBy(SqlUtils.validSortField(sortField), sortOrder.equals(CommonConstant.SORT_ORDER_ASC),
                sortField);
        return queryWrapper;
    }

    @Override
    public BaseResponse<Boolean> getEmailCode(String email) {
        // 校验邮箱
        RegExpUtil.regExpVerify(RegExpUtil.emailRegExp, email, "邮箱格式错误");
        // 从redis中查看有没有该邮箱的验证码
        String verifyCode = (String) redisTemplate.opsForValue().get(SEND_EMAIL_CODE + email);
        if (!StringUtils.isAnyBlank(verifyCode)) {
            // 如果redis有该手机号验证码，则返回
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "验证码已发送，请注意查收");
        }
        // 如果redis没有该手机号验证码，则获取验证码并发送短信
        verifyCode = RandomSmsNumUtils.getSixBitRandom(); // 获取六位验证码
        sendMessageToEmail(verifyCode, email);
        // 将该验证码存入redis
        redisTemplate.opsForValue().set(
                "joy:sendCode:" + email,
                verifyCode,
                5,
                TimeUnit.MINUTES);
        return ResultUtils.success(true);
    }

    @Override
    public User getUserById(Long userId) {
        if (userId == null) {
            throw new IllegalArgumentException("用户id不能为空");
        }
        User user = this.getById(userId);
        // 用户状态为 1 时，表示用户已封号
        if (user.getUserStatus() == 1) {
            throw new IllegalArgumentException("用户已被封号");
        }
        return user;
    }

    @Override
    public BaseResponse<Boolean> forgetPassword(String userAccount, String userPassword, String captcha) {
        // 校验参数
        if (StringUtils.isAnyBlank(userAccount, userPassword, captcha)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "参数为空");
        }
        RegExpUtil.regExpVerify(RegExpUtil.captchaRegExp, captcha, "验证码格式错误");
        // 查询用户是否存在
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_account", userAccount);
        User user = this.baseMapper.selectOne(queryWrapper);
        if (user == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "用户不存在");
        }
        // 校验验证码
        String verifyCode = (String) redisTemplate.opsForValue().get("joy:sendCode:" + userAccount);
        if (!StringUtils.equals(captcha, verifyCode)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "验证码错误");
        }
        // 加密密码
        String encryptPassword = DigestUtils.md5DigestAsHex((SALT + userPassword).getBytes());
        // 更新密码
        user.setUserPassword(encryptPassword);
        boolean updateResult = this.updateById(user);
        if (!updateResult) {
            throw new BusinessException(ErrorCode.SYSTEM_ERROR, "修改密码失败");
        }
        return ResultUtils.success(true);
    }

    @Override
    public BaseResponse<Boolean> updatePassword(User loginUser, String oldPassword, String newPassword) {
        // 校验密码长度 大于6小于20
        if (oldPassword.length() < 8 || oldPassword.length() > 20
                || newPassword.length() < 8 || newPassword.length() > 20) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "密码长度不符合要求");
        }
        // 校验参数
        if (loginUser == null || loginUser.getId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "用户不存在");
        }
        // 查询用户是否存在
        User user = this.getById(loginUser.getId());
        if (user == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "用户不存在");
        }
        // 校验旧密码
        String encryptOldPassword = DigestUtils.md5DigestAsHex((SALT + oldPassword).getBytes());
        if (!StringUtils.equals(encryptOldPassword, user.getUserPassword())) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "旧密码错误");
        }
        // 加密新密码
        String encryptNewPassword = DigestUtils.md5DigestAsHex((SALT + newPassword).getBytes());
        // 更新密码
        user.setUserPassword(encryptNewPassword);
        boolean updateResult = this.updateById(user);
        if (!updateResult) {
            throw new BusinessException(ErrorCode.SYSTEM_ERROR, "修改密码失败");
        }
        return ResultUtils.success(true);
    }

    @Override
    public String updateAccessKey(User loginUser) {
        // 校验参数
        if (loginUser == null || loginUser.getId() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "用户不存在");
        }
        // 查询用户是否存在
        User user = this.getById(loginUser.getId());
        if (user == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "用户不存在");
        }
        // 生成新的accessKey和secretKey
        String accessKey = DigestUtil.md5Hex(SALT + user.getUserAccount() + RandomUtil.randomNumbers(5));
        String secretKey = DigestUtil.md5Hex(SALT + user.getUserAccount() + RandomUtil.randomNumbers(10));
        // 更新accessKey和secretKey
        user.setAccessKey(accessKey);
        user.setSecretKey(secretKey);
        boolean updateResult = this.updateById(user);
        if (!updateResult) {
            throw new BusinessException(ErrorCode.SYSTEM_ERROR, "修改accessKey失败");
        }
        return accessKey;
    }

    /**
     * 发送邮箱验证码
     *
     * @param verifyCode 验证码
     * @param email      邮箱
     */
    private void sendMessageToEmail(String verifyCode, String email) {
        // 发送邮件验证码
        Context context = new Context(); // 引入Template的Context
        // 设置模板中的变量（分割验证码）
        context.setVariable("verifyCode", Arrays.asList(verifyCode.split("")));
        //将验证码存入redis中
        redisTemplate.opsForValue().set("joy:sendCode:" + email, verifyCode, 5, TimeUnit.MINUTES);
        // 第一个参数为模板的名称(html不用写全路径)
        String process = templateEngine.process("EmailCode.html", context); // 这里不用写全路径
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setSubject("【Joy Api】验证码"); // 邮件的标题
            helper.setFrom(username); // 发送者
            helper.setTo(email); // 接收者
            helper.setSentDate(new Date()); // 时间
            helper.setText(process, true); // 第二个参数true表示这是一个html文本
        } catch (MessagingException e) {
            throw new IllegalArgumentException("发送邮件失败");
        }
        javaMailSender.send(mimeMessage);

    }
}
