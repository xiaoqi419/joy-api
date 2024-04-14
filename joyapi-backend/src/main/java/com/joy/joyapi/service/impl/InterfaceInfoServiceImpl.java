package com.joy.joyapi.service.impl;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.google.gson.Gson;
import com.joy.joyapi.common.ErrorCode;
import com.joy.joyapi.exception.BusinessException;
import com.joy.joyapi.exception.ThrowUtils;
import com.joy.joyapi.mapper.InterfaceInfoMapper;
import com.joy.joyapi.model.dto.interfaceinfo.InterfaceInfoAuditRequest;
import com.joy.joyapi.model.dto.interfaceinfo.InterfaceInfoInvokeRequest;
import com.joy.joyapi.model.dto.interfaceinfo.InterfaceInfoQueryRequest;
import com.joy.joyapi.model.dto.userinterfaceinfo.UserInterfaceInfoQueryRequest;
import com.joy.joyapi.model.entity.InterfaceInfo;
import com.joy.joyapi.model.entity.User;
import com.joy.joyapi.model.entity.UserInterfaceInfo;
import com.joy.joyapi.model.enums.InterfaceInfoStatusEnum;
import com.joy.joyapi.model.vo.InterfaceInfoVO;
import com.joy.joyapi.service.InterfaceInfoService;
import com.joy.joyapi.service.UserInterfaceInfoService;
import com.joy.joyapi.service.UserService;
import com.joy.joyapiclientsdk.client.JoyApiClient;
import com.joy.joyapiclientsdk.model.dto.virtualuserinterface.VirtualUserInterfaceQueryRequest;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @author Jason
 * @description 针对表【interface_info(接口)】的数据库操作Service实现
 * @createDate 2024-02-20 19:26:07
 */
@Service
public class InterfaceInfoServiceImpl extends ServiceImpl<InterfaceInfoMapper, InterfaceInfo>
        implements InterfaceInfoService {

    @Resource
    private UserService userService;
    @Resource
    private UserInterfaceInfoService userInterfaceInfoService;


    @Override
    public void validInterfaceInfo(InterfaceInfo interfaceInfo, boolean add) {
        if (!add) {
            return;
        }
        if (interfaceInfo == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Long id = interfaceInfo.getId();
        String name = interfaceInfo.getName();
        String description = interfaceInfo.getDescription();
        String url = interfaceInfo.getUrl();
        String method = interfaceInfo.getMethod();
        Long userId = interfaceInfo.getUserId();
        String category = interfaceInfo.getCategory();
        String requestExp = interfaceInfo.getRequestExample();
        String responseExp = interfaceInfo.getResponseExample();

        if (StringUtils.isAnyBlank(name, url, method, category, description, requestExp, responseExp)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }

        if (StringUtils.isNotBlank(name) && name.length() > 1024) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "接口名称长度不能超过1024");
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
        if (interfaceInfoAuditRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        List<Long> id = interfaceInfoAuditRequest.getId();
        Integer status = interfaceInfoAuditRequest.getAuditStatus();
        if (id == null || status == null || status < 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        // 从数据库中批量查找id符合的接口
        List<InterfaceInfo> interfaceInfoList = listByIds(id);
        if (interfaceInfoList == null || interfaceInfoList.size() != id.size()) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "接口不存在");
        }
        if (InterfaceInfoStatusEnum.getEnumByValue(status)) {
            // 上线
            for (InterfaceInfo interfaceInfo : interfaceInfoList) {
                if (interfaceInfo.getStatus().equals(InterfaceInfoStatusEnum.ONLINE.getCode())) {
                    throw new BusinessException(ErrorCode.PARAMS_ERROR, "接口已上线");
                }
                // 上线接口
                interfaceInfo.setStatus(InterfaceInfoStatusEnum.ONLINE.getCode());
                QueryWrapper<InterfaceInfo> queryWrapper = new QueryWrapper<>();
                queryWrapper.eq("id", interfaceInfo.getId());
                update(interfaceInfo, queryWrapper);
            }
        }
        if (status.equals(InterfaceInfoStatusEnum.OFFLINE.getCode())) {
            // 下线
            for (InterfaceInfo interfaceInfo : interfaceInfoList) {
                if (interfaceInfo.getStatus().equals(InterfaceInfoStatusEnum.OFFLINE.getCode())) {
                    throw new BusinessException(ErrorCode.PARAMS_ERROR, "接口已下线");
                }
                // 下线接口
                interfaceInfo.setStatus(InterfaceInfoStatusEnum.OFFLINE.getCode());
                QueryWrapper<InterfaceInfo> queryWrapper = new QueryWrapper<>();
                queryWrapper.eq("id", interfaceInfo.getId());
                update(interfaceInfo, queryWrapper);
            }
        }
        return true;
    }

    @Override
    public Object invokeInterfaceInfo(InterfaceInfoInvokeRequest interfaceInfoInvokeRequest, HttpServletRequest request) {
        long id = interfaceInfoInvokeRequest.getId();
        String requestParams = interfaceInfoInvokeRequest.getUserRequestParams();
        // 判断接口是否存在
        InterfaceInfo interfaceInfo = this.getById(id);
        ThrowUtils.throwIf(interfaceInfo == null, ErrorCode.NOT_FOUND_ERROR);
        // 判断接口是否已通过审核
        ThrowUtils.throwIf(!interfaceInfo.getStatus().equals(InterfaceInfoStatusEnum.ONLINE.getCode()),
                ErrorCode.FORBIDDEN_ERROR);
        User user = userService.getLoginUser(request);
        String accessKey = user.getAccessKey();
        String secretKey = user.getSecretKey();
        Gson gson = new Gson();
        VirtualUserInterfaceQueryRequest virtualUserInterfaceQueryRequest = gson.fromJson(requestParams, VirtualUserInterfaceQueryRequest.class);
        // TODO 测试调用
        JoyApiClient joyApiClient = new JoyApiClient(accessKey, secretKey);
        // 调用接口成功后在接口统计中判断是否有该用户该接口的调用统计
        UserInterfaceInfoQueryRequest userInterfaceInfoQueryRequest = new UserInterfaceInfoQueryRequest();
        userInterfaceInfoQueryRequest.setUserId(user.getId());
        Wrapper<UserInterfaceInfo> queryWrapper = userInterfaceInfoService.getQueryWrapper(userInterfaceInfoQueryRequest);
        UserInterfaceInfo info = userInterfaceInfoService.getOne(queryWrapper);
        if (info == null) {
            // 如果没有则添加
            UserInterfaceInfo userInterfaceInfo = new UserInterfaceInfo();
            userInterfaceInfo.setInterfaceId(interfaceInfo.getId());
            userInterfaceInfoService.addUserInterfaceInfo(userInterfaceInfo, request);
            boolean invoked = userInterfaceInfoService.invokeCount(interfaceInfo.getId(), user.getId());
            ThrowUtils.throwIf(!invoked, ErrorCode.INTERNAL_SERVER_ERROR);
        }
        boolean invoked = userInterfaceInfoService.invokeCount(interfaceInfo.getId(), user.getId());
        ThrowUtils.throwIf(!invoked, ErrorCode.INTERNAL_SERVER_ERROR);

        return joyApiClient.getVirtualUser(virtualUserInterfaceQueryRequest);
    }
}




