package com.joy.joyapiinterface.client;

import cn.hutool.json.JSONObject;
import com.joy.joyapiinterface.model.dto.virtualuserinterface.VirtualUserInterfaceQueryRequest;
import org.junit.jupiter.api.Test;

/**
 * @ClassName : JoyApiClientTest
 * @Description :
 * @Author : Jason
 * @Date: 2024-03-06 22:13
 */
class JoyApiClientTest {

    @Test
    void getVirtualUser() {
        JoyApiClient joyApiClient = new JoyApiClient();
        // 定义一个包含current,size的JSON格式请求参数
        VirtualUserInterfaceQueryRequest request = new VirtualUserInterfaceQueryRequest();
        request.setCurrent(1);
        request.setPageSize(10);
        JSONObject virtualUser = joyApiClient.getVirtualUser(request);
        System.out.println(virtualUser);
    }
}