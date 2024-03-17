package com.joy.joyapi.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.IService;
import com.joy.joyapi.common.BaseResponse;
import com.joy.joyapi.model.dto.user.UserQueryRequest;
import com.joy.joyapi.model.entity.User;
import com.joy.joyapi.model.vo.LoginUserVO;
import com.joy.joyapi.model.vo.UserVO;
import me.chanjar.weixin.common.bean.WxOAuth2UserInfo;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 用户服务
 *
 * @author <a href="https://github.com/liyupi">程序员鱼皮</a>
 * @from <a href="https://yupi.icu">编程导航知识星球</a>
 */
public interface UserService extends IService<User> {

    /**
     * 用户注册
     *
     * @param userAccount   用户账户
     * @param userPassword  用户密码
     * @param checkPassword 校验密码
     * @param captchaCode   验证码
     * @param request       请求
     * @return 新用户 id
     */
    long userRegister(String userAccount, String userPassword, String checkPassword, String captchaCode, HttpServletRequest request);

    /**
     * 用户登录
     *
     * @param userAccount  用户账户
     * @param userPassword 用户密码
     * @param request      请求
     * @return 脱敏后的用户信息
     */
    LoginUserVO userLogin(String userAccount, String userPassword, HttpServletRequest request);

    /**
     * 用户登录（微信开放平台）
     *
     * @param wxOAuth2UserInfo 从微信获取的用户信息
     * @param request
     * @return 脱敏后的用户信息
     */
    LoginUserVO userLoginByMpOpen(WxOAuth2UserInfo wxOAuth2UserInfo, HttpServletRequest request);

    /**
     * 获取当前登录用户
     *
     * @param request
     * @return
     */
    User getLoginUser(HttpServletRequest request);

    /**
     * 获取当前登录用户（允许未登录）
     *
     * @param request
     * @return
     */
    User getLoginUserPermitNull(HttpServletRequest request);

    /**
     * 是否为管理员
     *
     * @param request
     * @return
     */
    boolean isAdmin(HttpServletRequest request);

    /**
     * 是否为管理员
     *
     * @param user
     * @return
     */
    boolean isAdmin(User user);

    /**
     * 用户注销
     *
     * @param request
     * @return
     */
    boolean userLogout(HttpServletRequest request);

    /**
     * 获取脱敏的已登录用户信息
     *
     * @return
     */
    LoginUserVO getLoginUserVO(User user);

    /**
     * 获取脱敏的用户信息
     *
     * @param user
     * @return
     */
    UserVO getUserVO(User user);

    /**
     * 获取脱敏的用户信息
     *
     * @param userList
     * @return
     */
    List<UserVO> getUserVO(List<User> userList);

    /**
     * 获取查询条件
     *
     * @param userQueryRequest
     * @return
     */
    QueryWrapper<User> getQueryWrapper(UserQueryRequest userQueryRequest);

    /**
     * 获取注册邮箱验证码
     *
     * @param email 邮箱
     * @return 是否发送成功
     */
    BaseResponse<Boolean> getEmailCode(String email);

    /**
     * 根据用户id获取用户信息
     *
     * @param userId 用户id
     * @return 用户信息
     */
    User getUserById(Long userId);

    /**
     * 忘记密码
     *
     * @param userAccount  用户账户
     * @param userPassword 用户密码
     * @param captcha      验证码
     * @return 是否成功
     */
    BaseResponse<Boolean> forgetPassword(String userAccount, String userPassword, String captcha);

    /**
     * 更新密码
     *
     * @param loginUser   登录用户
     * @param oldPassword 旧密码
     * @param newPassword 新密码
     * @return 是否成功
     */
    BaseResponse<Boolean> updatePassword(User loginUser, String oldPassword, String newPassword);
}
