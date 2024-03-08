package com.joy.joyapiinterface.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.joy.joyapiinterface.mapper.UserMapper;
import com.joy.joyapiinterface.model.entity.User;
import com.joy.joyapiinterface.service.UserService;
import org.springframework.stereotype.Service;

/**
 * @author Jason
 * @description 针对表【user(用户)】的数据库操作Service实现
 * @createDate 2024-03-07 22:46:50
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User>
        implements UserService {

}




