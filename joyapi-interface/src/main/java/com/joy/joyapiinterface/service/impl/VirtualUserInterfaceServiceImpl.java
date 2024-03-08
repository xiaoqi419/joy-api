package com.joy.joyapiinterface.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.joy.joyapiinterface.common.ErrorCode;
import com.joy.joyapiinterface.exception.BusinessException;
import com.joy.joyapiinterface.mapper.VirtualUserInterfaceMapper;
import com.joy.joyapiinterface.model.dto.virtualuserinterface.VirtualUserInterfaceQueryRequest;
import com.joy.joyapiinterface.model.entity.User;
import com.joy.joyapiinterface.model.entity.VirtualUserInterface;
import com.joy.joyapiinterface.service.UserService;
import com.joy.joyapiinterface.service.VirtualUserInterfaceService;
import com.joy.joyapiinterface.utils.RedisUtil;
import com.joy.joyapiinterface.utils.SignUtil;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.joy.joyapiinterface.constant.InterfaceConstant.VIRTUAL_USER;
import static com.joy.joyapiinterface.constant.RedisConstant.API_NAME;
import static com.joy.joyapiinterface.constant.RedisConstant.RANDOM;

/**
 * @author Jason
 * @description 针对表【virtual_user_interface(虚拟用户接口表)】的数据库操作Service实现
 * @createDate 2024-03-04 23:02:46
 */
@Service
public class VirtualUserInterfaceServiceImpl extends ServiceImpl<VirtualUserInterfaceMapper, VirtualUserInterface>
        implements VirtualUserInterfaceService {

    @Resource
    private VirtualUserInterfaceMapper virtualUserInterfaceMapper;
    @Resource
    private UserService userService;
    @Resource
    private RedisUtil redisUtil;


    @Override
    public Page<VirtualUserInterface> getVirtualUser(VirtualUserInterfaceQueryRequest queryRequest, HttpServletRequest request) {
        // 从数据库中获取参数
        String accessKey = request.getHeader("accessKey");
        String nonce = request.getHeader("nonce");
        String sign = request.getHeader("sign");
        String timestamp = request.getHeader("timestamp");
        String body = request.getHeader("body");
        // 根据accessKey获取用户
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("access_key", accessKey);
        User user = userService.getOne(queryWrapper);
        // 如果用户不存在，则返回错误
        if (user == null) {
            throw new BusinessException(ErrorCode.FORBIDDEN_ERROR, "用户不存在");
        }
        try {
            // 从redis中获取随机数，如果存在相同的随机数，则返回错误
            String random = redisUtil.get(API_NAME + VIRTUAL_USER + RANDOM);
            // 如果随机数和redis中的随机数相同，则返回错误
            if (random != null && !random.equals(nonce)) {
                throw new BusinessException(ErrorCode.FORBIDDEN_ERROR, "请勿重复请求");
            }
            // 生成一个随机数存储到redis中
            redisUtil.set(API_NAME + VIRTUAL_USER + RANDOM, nonce, 100);
        } catch (Exception e) {
            throw new BusinessException(ErrorCode.FORBIDDEN_ERROR, "请勿重复请求");
        } finally {
            redisUtil.close();
        }
        // 时间和当前时间不能超过五分钟
        long currentTime = System.currentTimeMillis() / 1000;
        if (currentTime - Long.parseLong(timestamp) > 300) {
            throw new BusinessException(ErrorCode.FORBIDDEN_ERROR, "请求超时");
        }
        // 生成签名
        Map<String, String> headers = new HashMap<>();
        headers.put("accessKey", accessKey);
        headers.put("nonce", nonce);
        headers.put("body", body);
        headers.put("timestamp", timestamp);
        String signStr = SignUtil.getSign(headers, user.getSecretKey());
        // 如果签名不相同，则返回错误
        if (!signStr.equals(sign)) {
            throw new BusinessException(ErrorCode.NO_AUTH_ERROR, "签名错误");
        }
        // 如果当前页数小于1或不存在，则默认为1
        if (queryRequest.getCurrent() < 1) {
            queryRequest.setCurrent(1);
        }
        // 如果当前size不存在，则默认为10
        if (queryRequest.getPageSize() < 1) {
            queryRequest.setPageSize(10);
        }
        long current = queryRequest.getCurrent();
        long size = queryRequest.getPageSize();
        // 获取分页的虚拟用户
        return virtualUserInterfaceMapper.selectPage(new Page<>(current, size), null);
    }

    @Override
    public List<VirtualUserInterface> getFixedVirtualUser() {
        // 获取固定数量的虚拟用户
        int count = 10;
        return virtualUserInterfaceMapper.selectRandom(count);
    }
}




