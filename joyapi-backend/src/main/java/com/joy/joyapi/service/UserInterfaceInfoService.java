package com.joy.joyapi.service;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.extension.service.IService;
import com.joy.joyapi.common.BaseResponse;
import com.joy.joyapi.model.dto.userinterfaceinfo.UserInterfaceInfoQueryRequest;
import com.joy.joyapi.model.entity.UserInterfaceInfo;

import javax.servlet.http.HttpServletRequest;


/**
 * @author Jason
 * @description 针对表【user_interface_info(用户调用接口关系表)】的数据库操作Service
 * @createDate 2024-03-25 22:31:58
 */
public interface UserInterfaceInfoService extends IService<UserInterfaceInfo> {

    /**
     * Adds user interface information.
     *
     * @param userInterfaceInfo the user interface information to add
     * @param request           the HTTP servlet request
     * @return the base response
     */
    BaseResponse<Long> addUserInterfaceInfo(UserInterfaceInfo userInterfaceInfo, HttpServletRequest request);

    /**
     * 验证
     *
     * @param userInterfaceInfo 验证对象
     * @param add               是否新增
     */
    void validUserInterfaceInfo(UserInterfaceInfo userInterfaceInfo, boolean add);

    /**
     * 获取查询条件
     *
     * @param userInterfaceInfoQueryRequest 查询条件
     * @return 查询条件
     */
    Wrapper<UserInterfaceInfo> getQueryWrapper(UserInterfaceInfoQueryRequest userInterfaceInfoQueryRequest);

    /**
     * 统计调用次数
     *
     * @param interfaceInfoId 调用接口id
     * @param userId          用户id
     * @return boolean true or false
     */
    boolean invokeCount(long interfaceInfoId, long userId);

}
