package com.joy.joyapiinterface.client;

import cn.hutool.http.HttpRequest;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.joy.joyapiinterface.model.dto.virtualuserinterface.VirtualUserInterfaceQueryRequest;

/**
 * @program: joyapi-interface
 * @ClassName: JoyApiClient
 * @description: 调用第三方接口的客户端
 * @author: Jason
 * @create: 2024-03-06 21:57
 * @from: <a href="https://www.ojason.top">我的博客</a>
 */
public class JoyApiClient {

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
                .execute().body();
        return JSONUtil.parseObj(jsonStr);
    }
}
