package com.joy.joyapi.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.joy.joyapi.mapper.UserInterfaceInfoMapper;
import com.joy.joyapi.model.entity.UserInterfaceInfo;
import com.joy.joyapi.service.UserInterfaceInfoService;
import org.springframework.stereotype.Service;

/**
 * @author Jason
 * @description 针对表【user_interface_info(用户调用接口关系表)】的数据库操作Service实现
 * @createDate 2024-03-25 22:31:58
 */
@Service
public class UserInterfaceInfoServiceImpl extends ServiceImpl<UserInterfaceInfoMapper, UserInterfaceInfo>
        implements UserInterfaceInfoService {

}




