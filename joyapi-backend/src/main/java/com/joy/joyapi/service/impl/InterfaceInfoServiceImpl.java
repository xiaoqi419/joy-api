package com.joy.joyapi.service.impl;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.joy.joyapi.common.ErrorCode;
import com.joy.joyapi.exception.BusinessException;
import com.joy.joyapi.mapper.InterfaceInfoMapper;
import com.joy.joyapi.model.dto.interfaceinfo.InterfaceInfoAuditRequest;
import com.joy.joyapi.model.dto.interfaceinfo.InterfaceInfoQueryRequest;
import com.joy.joyapi.model.entity.InterfaceInfo;
import com.joy.joyapi.model.vo.InterfaceInfoVO;
import com.joy.joyapi.service.InterfaceInfoService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

/**
 * @author 26504
 * @description 针对表【interface_info(接口)】的数据库操作Service实现
 * @createDate 2024-02-20 19:26:07
 */
@Service
public class InterfaceInfoServiceImpl extends ServiceImpl<InterfaceInfoMapper, InterfaceInfo>
        implements InterfaceInfoService {


    @Override
    public void validInterfaceInfo(InterfaceInfo interfaceInfo, boolean add) {
        if (interfaceInfo == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Long id = interfaceInfo.getId();
        String name = interfaceInfo.getName();
        String description = interfaceInfo.getDescription();
        String url = interfaceInfo.getUrl();
        String requestHeader = interfaceInfo.getRequestHeader();
        String responseHeader = interfaceInfo.getResponseHeader();
        Integer status = interfaceInfo.getStatus();
        String method = interfaceInfo.getMethod();
        Long userId = interfaceInfo.getUserId();
        Date createTime = interfaceInfo.getCreateTime();
        Date updateTime = interfaceInfo.getUpdateTime();
        Integer isDelete = interfaceInfo.getIsDelete();
        String category = interfaceInfo.getCategory();
        String requestExp = interfaceInfo.getRequestExample();
        String responseExp = interfaceInfo.getResponseExample();

        if (StringUtils.isAnyBlank(name, url, method, category, description, requestExp, responseExp) || userId == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }

        if (StringUtils.isNotBlank(name) && name.length() < 50) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "接口名称长度不能超过50");
        }
    }

    @Override
    public InterfaceInfoVO getInterfaceInfoVO(InterfaceInfo interfaceInfo, HttpServletRequest request) {
        if (interfaceInfo != null) {
            return InterfaceInfoVO.objToVo(interfaceInfo);
        }
        return null;
    }

    @Override
    public Wrapper<InterfaceInfo> getQueryWrapper(InterfaceInfoQueryRequest interfaceInfoQueryRequest) {
        QueryWrapper<InterfaceInfo> queryWrapper = new QueryWrapper<>();
        // 如果存在则模糊查询
        if (StringUtils.isNotBlank(interfaceInfoQueryRequest.getName())) {
            queryWrapper.like("name", interfaceInfoQueryRequest.getName());
        }
        if (StringUtils.isNotBlank(interfaceInfoQueryRequest.getUrl())) {
            queryWrapper.like("url", interfaceInfoQueryRequest.getUrl());
        }
        if (StringUtils.isNotBlank(interfaceInfoQueryRequest.getMethod())) {
            queryWrapper.eq("method", interfaceInfoQueryRequest.getMethod());
        }
        if (interfaceInfoQueryRequest.getStatus() != null) {
            queryWrapper.eq("status", interfaceInfoQueryRequest.getStatus());
        }
        if (interfaceInfoQueryRequest.getUserId() != null) {
            queryWrapper.eq("user_id", interfaceInfoQueryRequest.getUserId());
        }
        if (interfaceInfoQueryRequest.getId() != null) {
            queryWrapper.eq("id", interfaceInfoQueryRequest.getId());
        }
        if (StringUtils.isNotBlank(interfaceInfoQueryRequest.getDescription())) {
            queryWrapper.like("description", interfaceInfoQueryRequest.getDescription());
        }
        if (StringUtils.isNotBlank(interfaceInfoQueryRequest.getRequestHeader())) {
            queryWrapper.like("request_header", interfaceInfoQueryRequest.getRequestHeader());
        }
        if (StringUtils.isNotBlank(interfaceInfoQueryRequest.getResponseHeader())) {
            queryWrapper.like("response_header", interfaceInfoQueryRequest.getResponseHeader());
        }
        return queryWrapper;
    }

    @Override
    public Page<InterfaceInfoVO> getInterfaceInfoVOPage(Page<InterfaceInfo> interfaceInfoPage, HttpServletRequest request) {
        if (interfaceInfoPage != null) {
            Page<InterfaceInfoVO> interfaceInfoVOPage = new Page<>();
            interfaceInfoVOPage.setTotal(interfaceInfoPage.getTotal());
            interfaceInfoVOPage.setSize(interfaceInfoPage.getSize());
            interfaceInfoVOPage.setCurrent(interfaceInfoPage.getCurrent());
            interfaceInfoVOPage.setRecords(InterfaceInfoVO.listObjToListVo(interfaceInfoPage.getRecords()));
            return interfaceInfoVOPage;
        }
        return null;
    }

    @Override
    public Page<InterfaceInfo> searchFromEs(InterfaceInfoQueryRequest interfaceInfoQueryRequest) {
        // todo 从Es中查询
        return null;
    }

    @Override
    public boolean auditInterfaceInfo(InterfaceInfoAuditRequest interfaceInfoAuditRequest) {
        // 该接口存在则审核通过
        if (interfaceInfoAuditRequest != null && interfaceInfoAuditRequest.getId() != null && !interfaceInfoAuditRequest.getId().isEmpty() && interfaceInfoAuditRequest.getAuditStatus() != null && interfaceInfoAuditRequest.getAuditStatus() == 1) {
            InterfaceInfo interfaceInfo = new InterfaceInfo();
            interfaceInfo.setStatus(1);
            return update(interfaceInfo, new QueryWrapper<InterfaceInfo>().in("id", interfaceInfoAuditRequest.getId()));
        }
        if (interfaceInfoAuditRequest != null && interfaceInfoAuditRequest.getId() != null && !interfaceInfoAuditRequest.getId().isEmpty() && interfaceInfoAuditRequest.getAuditStatus() != null && interfaceInfoAuditRequest.getAuditStatus() == 0) {
            InterfaceInfo interfaceInfo = new InterfaceInfo();
            interfaceInfo.setStatus(0);
            return update(interfaceInfo, new QueryWrapper<InterfaceInfo>().in("id", interfaceInfoAuditRequest.getId()));
        }
        return false;
    }
}




