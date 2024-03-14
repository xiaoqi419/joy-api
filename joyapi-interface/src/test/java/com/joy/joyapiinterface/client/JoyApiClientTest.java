package com.joy.joyapiinterface.client;

import cn.hutool.json.JSONObject;
import com.joy.joyapiclientsdk.client.JoyApiClient;
import com.joy.joyapiclientsdk.model.dto.virtualuserinterface.VirtualUserInterfaceQueryRequest;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

/**
 * @ClassName : JoyApiClientTest
 * @Description :
 * @Author : Jason
 * @Date: 2024-03-06 22:13
 */
@SpringBootTest
class JoyApiClientTest {

    @Resource
    private JoyApiClient joyApiClient;

    @Test
    void getVirtualUser() {
        VirtualUserInterfaceQueryRequest request = new VirtualUserInterfaceQueryRequest();
        request.setCurrent(1);
        request.setPageSize(10);
        JSONObject virtualUser = joyApiClient.getVirtualUser(request);
        System.out.println(virtualUser);

        JSONObject fixedNumberVirtualUser = joyApiClient.getFixedNumberVirtualUser(request);
        System.out.println(fixedNumberVirtualUser);
    }
}