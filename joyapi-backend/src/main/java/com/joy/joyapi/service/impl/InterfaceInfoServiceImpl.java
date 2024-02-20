package com.joy.joyapi.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.joy.joyapi.model.entity.InterfaceInfo;
import com.joy.joyapi.service.InterfaceInfoService;
import generator.mapper.InterfaceInfoMapper;
import org.springframework.stereotype.Service;

/**
* @author 26504
* @description 针对表【interface_info(接口)】的数据库操作Service实现
* @createDate 2024-02-20 19:26:07
*/
@Service
public class InterfaceInfoServiceImpl extends ServiceImpl<InterfaceInfoMapper, InterfaceInfo>
    implements InterfaceInfoService{

}




