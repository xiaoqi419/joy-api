package com.joy.joyapi.service;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * @ClassName : UserInterfaceInfoServiceTest
 * @Description :
 * @Author : Jason
 * @Date: 2024-04-14 22:12
 */
@SpringBootTest
class UserInterfaceInfoServiceTest {

    @Resource
    private UserInterfaceInfoService userInterfaceInfoService;

    @Test
    void invokeCount() {
        boolean invoked = userInterfaceInfoService.invokeCount(1, 1);
        assertTrue(invoked);
    }
}