package com.joy.joyapi.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.joy.joyapi.common.BaseResponse;
import com.joy.joyapi.common.ErrorCode;
import com.joy.joyapi.common.ResultUtils;
import com.joy.joyapi.exception.BusinessException;
import com.joy.joyapi.exception.ThrowUtils;
import com.joy.joyapi.mapper.UserInterfaceInfoMapper;
import com.joy.joyapi.model.dto.userinterfaceinfo.UserInterfaceInfoQueryRequest;
import com.joy.joyapi.model.entity.User;
import com.joy.joyapi.model.entity.UserInterfaceInfo;
import com.joy.joyapi.service.UserInterfaceInfoService;
import com.joy.joyapi.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * @author Jason
 * @description 针对表【user_interface_info(用户调用接口关系表)】的数据库操作Service实现
 * @createDate 2024-03-25 22:31:58
 */
@Service
public class UserInterfaceInfoServiceImpl extends ServiceImpl<UserInterfaceInfoMapper, UserInterfaceInfo>
        implements UserInterfaceInfoService {

    @Resource
    private UserService userService;

    @Override
    public BaseResponse<Long> addUserInterfaceInfo(UserInterfaceInfo userInterfaceInfo, HttpServletRequest request) {
        validUserInterfaceInfo(userInterfaceInfo, true);
        User user = userService.getLoginUser(request);
        userInterfaceInfo.setUserId(user.getId());
        boolean result = this.save(userInterfaceInfo);
        if (!result) {
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "保存失败");
        }
        long id = userInterfaceInfo.getId();
        return ResultUtils.success(id);
    }

    @Override
    public void validUserInterfaceInfo(UserInterfaceInfo userInterfaceInfo, boolean add) {
        if (userInterfaceInfo == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        // 创建时
        if (add && (userInterfaceInfo.getUserId() <= 0 || userInterfaceInfo.getInterfaceId() <= 0)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "接口或用户不存在");

        }
        if (userInterfaceInfo.getStatus() == 1) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "该接口已被禁用");
        }
    }

    @Override
    public QueryWrapper<UserInterfaceInfo> getQueryWrapper(UserInterfaceInfoQueryRequest userInterfaceInfoQueryRequest) {
        QueryWrapper<UserInterfaceInfo> queryWrapper = new QueryWrapper<>();
        if (userInterfaceInfoQueryRequest == null) {
            return queryWrapper;
        }
        if (userInterfaceInfoQueryRequest.getId() != null) {
            queryWrapper.eq("id", userInterfaceInfoQueryRequest.getId());
        }
        if (userInterfaceInfoQueryRequest.getInterfaceId() != null) {
            queryWrapper.eq("interface_id", userInterfaceInfoQueryRequest.getInterfaceId());
        }
        if (userInterfaceInfoQueryRequest.getUserId() != null) {
            queryWrapper.eq("user_id", userInterfaceInfoQueryRequest.getUserId());
        }
        if (userInterfaceInfoQueryRequest.getTotalNum() != null) {
            queryWrapper.eq("total_num", userInterfaceInfoQueryRequest.getTotalNum());
        }
        if (userInterfaceInfoQueryRequest.getStatus() != null) {
            queryWrapper.eq("status", userInterfaceInfoQueryRequest.getStatus());
        }
        return queryWrapper;
    }

    @Override
    @Transactional
    public boolean invokeCount(long interfaceInfoId, long userId) {
        // 校验
        ThrowUtils.throwIf(interfaceInfoId <= 0 || userId <= 0, ErrorCode.PARAMS_ERROR);
        UpdateWrapper<UserInterfaceInfo> updateWrapper = new UpdateWrapper<>();
        updateWrapper.eq("interface_id", interfaceInfoId);
        updateWrapper.eq("user_id", userId);
        updateWrapper.setSql("total_num = total_num + 1");
        boolean result = update(null, updateWrapper);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return true;
    }
}




