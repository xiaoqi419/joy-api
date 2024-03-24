package com.joy.joyapi.client;

import cn.hutool.core.util.RandomUtil;
import cn.hutool.http.HttpRequest;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.joy.joyapiclientsdk.model.dto.virtualuserinterface.VirtualUserInterfaceQueryRequest;
import com.joy.joyapiclientsdk.utils.SignUtil;

import java.util.HashMap;
import java.util.Map;

/**
 * @program: joyapi-interface
 * @ClassName: JoyApiClient
 * @description: 调用第三方接口的客户端
 * @author: Jason
 * @create: 2024-03-06 21:57
 * @from: <a href="https://www.ojason.top">我的博客</a>
 */
public class JoyApiClient {

    String accessKey;
    String secretKey;

    public JoyApiClient(String accessKey, String secretKey) {
        this.accessKey = accessKey;
        this.secretKey = secretKey;
    }


    private Map<String, String> getHeaders(String body) {
        Map<String, String> headers = new HashMap<>();
        headers.put("accessKey", accessKey);
        headers.put("nonce", RandomUtil.randomNumbers(5));
        headers.put("body", body);
        headers.put("timestamp", String.valueOf(System.currentTimeMillis() / 1000));
        headers.put("sign", SignUtil.getSign(headers, secretKey));
        return headers;
    }


    /**
     * 获取虚拟用户
     *
     * @param request 请求参数
     * @return 虚拟用户
     */
    public JSONObject getVirtualUser(VirtualUserInterfaceQueryRequest request) {
        String json = JSONUtil.toJsonStr(request);
        String jsonStr = HttpRequest.post("http://localhost:8102/api/virtualUser/getVirtualUser")
                .body(json)
                .addHeaders(getHeaders(json))
                .execute().body();
        return JSONUtil.parseObj(jsonStr);
    }

    /**
     * 获取固定数量的虚拟用户
     *
     * @param request 请求参数
     * @return 固定数量的虚拟用户
     */
    public JSONObject getFixedNumberVirtualUser(VirtualUserInterfaceQueryRequest request) {
        String json = JSONUtil.toJsonStr(request);
        String jsonStr = HttpRequest.get("http://localhost:8102/api/virtualUser/getFixedVirtualUser")
                .addHeaders(getHeaders(json))
                .execute().body();
        return JSONUtil.parseObj(jsonStr);
    }
}
