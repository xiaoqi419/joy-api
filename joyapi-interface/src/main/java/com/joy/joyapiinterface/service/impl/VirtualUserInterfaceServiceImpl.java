package com.joy.joyapiinterface.service.impl;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.joy.joyapiinterface.mapper.VirtualUserInterfaceMapper;
import com.joy.joyapiinterface.model.dto.virtualuserinterface.VirtualUserInterfaceQueryRequest;
import com.joy.joyapiinterface.model.entity.VirtualUserInterface;
import com.joy.joyapiinterface.service.VirtualUserInterfaceService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

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

    @Override
    public Page<VirtualUserInterface> getVirtualUser(VirtualUserInterfaceQueryRequest request) {
        // 如果当前页数小于1或不存在，则默认为1
        if (request.getCurrent() < 1) {
            request.setCurrent(1);
        }
        // 如果当前size不存在，则默认为10
        if (request.getPageSize() < 1) {
            request.setPageSize(10);
        }
        long current = request.getCurrent();
        long size = request.getPageSize();
        // 获取分页的虚拟用户
        return virtualUserInterfaceMapper.selectPage(new Page<>(current, size), null);
    }
}




