package com.joy.joyapi.service;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.joy.joyapi.model.dto.interfaceinfo.InterfaceInfoAuditRequest;
import com.joy.joyapi.model.dto.interfaceinfo.InterfaceInfoInvokeRequest;
import com.joy.joyapi.model.dto.interfaceinfo.InterfaceInfoQueryRequest;
import com.joy.joyapi.model.entity.InterfaceInfo;
import com.joy.joyapi.model.vo.InterfaceInfoVO;

import javax.servlet.http.HttpServletRequest;

/**
 * @author 26504
 * @description 针对表【interface_info(接口)】的数据库操作Service
 * @createDate 2024-02-20 19:26:07
 */
public interface InterfaceInfoService extends IService<InterfaceInfo> {

    /**
     * 校验
     *
     * @param interfaceInfo 接口信息
     * @param add           是否新增
     */
    void validInterfaceInfo(InterfaceInfo interfaceInfo, boolean add);

    /**
     * 获取接口信息VO
     *
     * @param interfaceInfo 接口信息
     * @param request       请求
     * @return 接口信息VO
     */
    InterfaceInfoVO getInterfaceInfoVO(InterfaceInfo interfaceInfo, HttpServletRequest request);

    /**
     * 获取查询条件
     *
     * @param interfaceInfoQueryRequest 查询条件
     * @return 查询条件
     */
    Wrapper<InterfaceInfo> getQueryWrapper(InterfaceInfoQueryRequest interfaceInfoQueryRequest);

    /**
     * 获取接口信息分页
     *
     * @param interfaceInfoPage 接口信息分页
     * @param request           请求
     * @return 接口信息VO分页
     */
    Page<InterfaceInfoVO> getInterfaceInfoVOPage(Page<InterfaceInfo> interfaceInfoPage, HttpServletRequest request);

    /**
     * 获取接口信息分页
     *
     * @param interfaceInfoQueryRequest 查询条件
     * @return 接口信息分页
     */
    Page<InterfaceInfo> searchFromEs(InterfaceInfoQueryRequest interfaceInfoQueryRequest);

    /**
     * 审核接口信息
     *
     * @param interfaceInfoAuditRequest 接口信息审核请求
     * @return 是否成功
     */
    boolean auditInterfaceInfo(InterfaceInfoAuditRequest interfaceInfoAuditRequest);

    /**
     * 测试调用接口
     *
     * @param interfaceInfoInvokeRequest 调用请求
     * @param request                    请求
     * @return 是否成功
     */
    Object invokeInterfaceInfo(InterfaceInfoInvokeRequest interfaceInfoInvokeRequest, HttpServletRequest request);

}
