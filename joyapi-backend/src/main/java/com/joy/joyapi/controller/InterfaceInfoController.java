package com.joy.joyapi.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.joy.joyapi.annotation.AuthCheck;
import com.joy.joyapi.common.BaseResponse;
import com.joy.joyapi.common.DeleteRequest;
import com.joy.joyapi.common.ErrorCode;
import com.joy.joyapi.common.ResultUtils;
import com.joy.joyapi.constant.UserConstant;
import com.joy.joyapi.exception.BusinessException;
import com.joy.joyapi.exception.ThrowUtils;
import com.joy.joyapi.model.dto.interfaceinfo.InterfaceInfoAddRequest;
import com.joy.joyapi.model.dto.interfaceinfo.InterfaceInfoAuditRequest;
import com.joy.joyapi.model.dto.interfaceinfo.InterfaceInfoQueryRequest;
import com.joy.joyapi.model.dto.interfaceinfo.InterfaceInfoUpdateRequest;
import com.joy.joyapi.model.entity.InterfaceInfo;
import com.joy.joyapi.model.entity.User;
import com.joy.joyapi.model.enums.InterfaceInfoStatusEnum;
import com.joy.joyapi.model.vo.InterfaceInfoVO;
import com.joy.joyapi.model.vo.UserVO;
import com.joy.joyapi.service.InterfaceInfoService;
import com.joy.joyapi.service.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;


/**
 * 接口信息
 * <p>
 * 作者：Jason
 * <p>
 * 链接：<a href="https://www.ojason.top">我的博客</a>
 */
@RestController
@RequestMapping("/InterfaceInfo")
@Slf4j
public class InterfaceInfoController {

    @Resource
    private InterfaceInfoService interfaceInfoService;

    @Resource
    private UserService userService;

    // region 增删改查

    /**
     * 创建
     *
     * @param interfaceInfoAddRequest 创建请求体
     * @param request                 请求
     * @return 是否成功
     */
    @PostMapping("/add")
    @ApiOperation(value = "创建接口", notes = "创建接口信息")
    public BaseResponse<Long> addInterfaceInfo(@RequestBody InterfaceInfoAddRequest interfaceInfoAddRequest, HttpServletRequest request) {
        if (interfaceInfoAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        InterfaceInfo interfaceInfo = new InterfaceInfo();
        BeanUtils.copyProperties(interfaceInfoAddRequest, interfaceInfo);
        interfaceInfoService.validInterfaceInfo(interfaceInfo, true);
        User loginUser = userService.getLoginUser(request);
        interfaceInfo.setUserId(loginUser.getId());
        interfaceInfo.setName(interfaceInfo.getName().trim());
        interfaceInfo.setDescription(interfaceInfo.getDescription().trim());
        interfaceInfo.setUrl(interfaceInfo.getUrl().trim());
        interfaceInfo.setStatus(InterfaceInfoStatusEnum.AUDITING.getCode());
        interfaceInfo.setCategory(interfaceInfo.getCategory().trim());
        interfaceInfo.setRequestHeader(interfaceInfo.getRequestHeader().trim());
        interfaceInfo.setResponseHeader(interfaceInfo.getResponseHeader().trim());
        interfaceInfo.setMethod(interfaceInfo.getMethod().trim());
        interfaceInfo.setRequestExample(interfaceInfo.getRequestExample().trim());
        interfaceInfo.setResponseExample(interfaceInfo.getResponseExample().trim());
        boolean result = interfaceInfoService.save(interfaceInfo);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        long newInterfaceInfoId = interfaceInfo.getId();
        return ResultUtils.success(newInterfaceInfoId);
    }

    /**
     * 删除
     *
     * @param deleteRequest 删除请求体
     * @param request       请求
     * @return 是否成功
     */
    @PostMapping("/delete")
    @ApiOperation(value = "删除接口", notes = "删除接口信息")
    public BaseResponse<Boolean> deleteInterfaceInfo(@RequestBody DeleteRequest deleteRequest, HttpServletRequest request) {
        if (deleteRequest == null || deleteRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        User user = userService.getLoginUser(request);
        long id = deleteRequest.getId();
        // 判断是否存在
        InterfaceInfo oldInterfaceInfo = interfaceInfoService.getById(id);
        ThrowUtils.throwIf(oldInterfaceInfo == null, ErrorCode.NOT_FOUND_ERROR);
        // 仅本人或管理员可删除
        if (!oldInterfaceInfo.getUserId().equals(user.getId()) && !userService.isAdmin(request)) {
            throw new BusinessException(ErrorCode.NO_AUTH_ERROR);
        }
        boolean b = interfaceInfoService.removeById(id);
        return ResultUtils.success(b);
    }

    /**
     * 更新（仅管理员）
     *
     * @param interfaceInfoUpdateRequest 更新请求
     * @return 是否成功
     */
    @PostMapping("/update")
    @ApiOperation(value = "更新接口", notes = "更新接口信息")
    public BaseResponse<Boolean> updateInterfaceInfo(@RequestBody InterfaceInfoUpdateRequest interfaceInfoUpdateRequest, HttpServletRequest request) {
        // 判断修改的用户是否是管理员或者是接口拥有者
        User user = userService.getLoginUser(request);
        InterfaceInfo interfaceInfo1 = interfaceInfoService.getById(interfaceInfoUpdateRequest.getId());
        if (interfaceInfo1 == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR);
        }
        if (user == null || (!user.getId().equals(interfaceInfo1.getUserId()) && !userService.isAdmin(request))) {
            throw new BusinessException(ErrorCode.NO_AUTH_ERROR);
        }
        if (interfaceInfoUpdateRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        InterfaceInfo interfaceInfo = new InterfaceInfo();
        BeanUtils.copyProperties(interfaceInfoUpdateRequest, interfaceInfo);
        // 参数校验
        interfaceInfoService.validInterfaceInfo(interfaceInfo, false);
        long id = interfaceInfoUpdateRequest.getId();
        // 判断是否存在
        InterfaceInfo oldInterfaceInfo = interfaceInfoService.getById(id);
        ThrowUtils.throwIf(oldInterfaceInfo == null, ErrorCode.NOT_FOUND_ERROR);
        boolean result = interfaceInfoService.updateById(interfaceInfo);
        return ResultUtils.success(result);
    }

    /**
     * 根据 id 获取
     *
     * @param id 接口id
     * @return 接口信息
     */
    @GetMapping("/get/vo")
    @ApiOperation(value = "根据id获取接口", notes = "根据id获取接口信息")
    public BaseResponse<InterfaceInfoVO> getInterfaceInfoVOById(long id, HttpServletRequest request) {
        if (id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        InterfaceInfo interfaceInfo = interfaceInfoService.getById(id);
        if (interfaceInfo == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR);
        }
        return ResultUtils.success(interfaceInfoService.getInterfaceInfoVO(interfaceInfo, request));
    }

    /**
     * 分页获取列表（仅管理员）
     *
     * @param interfaceInfoQueryRequest 查询请求
     * @return 分页列表
     */
    @PostMapping("/list/page")
    @ApiOperation(value = "分页获取接口列表（仅管理员）", notes = "分页获取接口信息列表")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Page<InterfaceInfo>> listInterfaceInfoByPage(@RequestBody InterfaceInfoQueryRequest interfaceInfoQueryRequest) {
        long current = interfaceInfoQueryRequest.getCurrent();
        long size = interfaceInfoQueryRequest.getPageSize();
        Page<InterfaceInfo> interfaceInfoPage = interfaceInfoService.page(new Page<>(current, size),
                interfaceInfoService.getQueryWrapper(interfaceInfoQueryRequest));
        // 向每个接口信息添加创建者信息
        interfaceInfoPage.getRecords().forEach(interfaceInfo -> {
            User user = userService.getById(interfaceInfo.getUserId());
            UserVO userVO = UserVO.objToVo(user);
            interfaceInfo.setCreatorInfo(userVO);
        });
        return ResultUtils.success(interfaceInfoPage);
    }

    /**
     * 分页获取列表（封装类）
     *
     * @param interfaceInfoQueryRequest 查询请求
     * @param request                   请求
     * @return 分页列表
     */
    @PostMapping("/list/page/vo")
    @ApiOperation(value = "分页获取接口列表", notes = "分页获取接口信息列表")
    public BaseResponse<Page<InterfaceInfoVO>> listInterfaceInfoVOByPage(@RequestBody InterfaceInfoQueryRequest interfaceInfoQueryRequest,
                                                                         HttpServletRequest request) {
        long current = interfaceInfoQueryRequest.getCurrent();
        long size = interfaceInfoQueryRequest.getPageSize();
        // 限制爬虫
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        Page<InterfaceInfo> interfaceInfoPage = interfaceInfoService.page(new Page<>(current, size),
                interfaceInfoService.getQueryWrapper(interfaceInfoQueryRequest));
        return ResultUtils.success(interfaceInfoService.getInterfaceInfoVOPage(interfaceInfoPage, request));
    }

    /**
     * 分页获取当前用户创建的资源列表
     *
     * @param interfaceInfoQueryRequest 查询请求
     * @param request                   请求
     * @return 分页列表
     */
    @PostMapping("/my/list/page/vo")
    @ApiOperation(value = "分页获取当前用户创建的接口列表", notes = "分页获取当前用户创建的接口信息列表")
    public BaseResponse<Page<InterfaceInfoVO>> listMyInterfaceInfoVOByPage(@RequestBody InterfaceInfoQueryRequest interfaceInfoQueryRequest,
                                                                           HttpServletRequest request) {
        if (interfaceInfoQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        User loginUser = userService.getLoginUser(request);
        interfaceInfoQueryRequest.setUserId(loginUser.getId());
        long current = interfaceInfoQueryRequest.getCurrent();
        long size = interfaceInfoQueryRequest.getPageSize();
        // 限制爬虫
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        Page<InterfaceInfo> interfaceInfoPage = interfaceInfoService.page(new Page<>(current, size),
                interfaceInfoService.getQueryWrapper(interfaceInfoQueryRequest));
        return ResultUtils.success(interfaceInfoService.getInterfaceInfoVOPage(interfaceInfoPage, request));
    }

    // endregion

    /**
     * 分页搜索（从 ES 查询，封装类）
     *
     * @param interfaceInfoQueryRequest 查询请求
     * @param request                   请求
     * @return 分页列表
     */
    @PostMapping("/search/page/vo")
    @ApiOperation(value = "分页搜索接口列表", notes = "分页搜索接口信息列表")
    public BaseResponse<Page<InterfaceInfoVO>> searchInterfaceInfoVOByPage(@RequestBody InterfaceInfoQueryRequest interfaceInfoQueryRequest,
                                                                           HttpServletRequest request) {
        long size = interfaceInfoQueryRequest.getPageSize();
        // 限制爬虫
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        Page<InterfaceInfo> interfaceInfoPage = interfaceInfoService.searchFromEs(interfaceInfoQueryRequest);
        return ResultUtils.success(interfaceInfoService.getInterfaceInfoVOPage(interfaceInfoPage, request));
    }

    /**
     * 审核接口
     */
    @PostMapping("/audit")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    @ApiOperation(value = "审核接口", notes = "审核接口信息")
    public BaseResponse<Boolean> auditInterfaceInfo(@RequestBody InterfaceInfoAuditRequest interfaceInfoAuditRequest) {
        if (interfaceInfoAuditRequest == null || interfaceInfoAuditRequest.getId() == null || interfaceInfoAuditRequest.getId().isEmpty() || interfaceInfoAuditRequest.getAuditStatus() == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        boolean result = interfaceInfoService.auditInterfaceInfo(interfaceInfoAuditRequest);
        return ResultUtils.success(result);
    }


}
