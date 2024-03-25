package com.joy.joyapi.controller;

import com.joy.joyapi.common.BaseResponse;
import com.joy.joyapi.model.dto.userinterfaceinfo.UserInterfaceInfoAddRequest;
import com.joy.joyapi.service.UserInterfaceInfoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * @author Jason
 * @description: 用户调用接口统计控制器
 * @create: 2024-03-25 22:35
 * @from: <a href="https://www.ojason.top">我的博客</a>
 */
@RestController
@RequestMapping("/userInterfaceInfo")
@Slf4j
public class UserInterfaceInfo {

    @Resource
    private UserInterfaceInfoService userInterfaceInfoService;

    /**
     * 新增
     */
    public BaseResponse<Long> addUserInterfaceInfo(@RequestBody UserInterfaceInfoAddRequest userInterfaceInfoAddRequest, HttpServletRequest request) {
        return null;
    }
}
