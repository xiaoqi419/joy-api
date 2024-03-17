package com.joy.joyapiinterface.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.joy.joyapiinterface.common.BaseResponse;
import com.joy.joyapiinterface.common.ResultUtils;
import com.joy.joyapiinterface.model.dto.virtualuserinterface.VirtualUserInterfaceQueryRequest;
import com.joy.joyapiinterface.model.entity.VirtualUserInterface;
import com.joy.joyapiinterface.service.VirtualUserInterfaceService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 虚拟用户接口
 *
 * @author Jason
 */
@RestController
@RequestMapping("/virtualUser")
@Api(tags = "虚拟用户接口")
@Slf4j
public class VirtualUserInterfaceController {

    @Resource
    private VirtualUserInterfaceService virtualUserInterfaceService;

    /**
     * 根据分页获取虚拟用户
     *
     * @param request 请求参数
     */
    @ApiOperation(value = "分页获取虚拟用户")
    @PostMapping("/getVirtualUser")
    public BaseResponse<Page<VirtualUserInterface>> getVirtualUser(@RequestBody VirtualUserInterfaceQueryRequest queryRequest, HttpServletRequest request) {
        Page<VirtualUserInterface> virtualUserInterfacePage = virtualUserInterfaceService.getVirtualUser(queryRequest, request);
        return ResultUtils.success(virtualUserInterfacePage, "获取成功！");
    }


    /**
     * 获取固定数量的虚拟用户
     */
    @ApiOperation(value = "获取固定数量的虚拟用户")
    @GetMapping("/getFixedVirtualUser")
    public BaseResponse<List<VirtualUserInterface>> getFixedVirtualUser() {
        List<VirtualUserInterface> virtualUserInterfacePage = virtualUserInterfaceService.getFixedVirtualUser();
        return ResultUtils.success(virtualUserInterfacePage, "获取成功！");
    }
}
