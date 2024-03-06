package com.joy.joyapiinterface.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.joy.joyapiinterface.model.dto.virtualuserinterface.VirtualUserInterfaceQueryRequest;
import com.joy.joyapiinterface.model.entity.VirtualUserInterface;

/**
 * @author Jason
 * @description 针对表【virtual_user_interface(虚拟用户接口表)】的数据库操作Service
 * @createDate 2024-03-04 23:02:46
 */
public interface VirtualUserInterfaceService extends IService<VirtualUserInterface> {

    /**
     * 根据数量获取虚拟用户
     *
     * @param request 请求参数
     * @return 虚拟用户
     */
    Page<VirtualUserInterface> getVirtualUser(VirtualUserInterfaceQueryRequest request);
}
