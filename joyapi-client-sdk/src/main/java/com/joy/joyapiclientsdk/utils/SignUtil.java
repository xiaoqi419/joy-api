package com.joy.joyapiclientsdk.utils;

import cn.hutool.crypto.digest.DigestAlgorithm;
import cn.hutool.crypto.digest.Digester;

import java.util.Map;

/**
 * @program: joyapi-interface
 * @ClassName: SignUtil
 * @description: 签名生成工具
 * @author: Jason
 * @create: 2024-03-07 23:19
 * @from: <a href="https://www.ojason.top">我的博客</a>
 */
public class SignUtil {
    /**
     * 获取签名
     *
     * @param hashMap 请求参数
     * @return 签名
     */
    public static String getSign(Map<String, String> hashMap, String secretKey) {
        Digester md5 = new Digester(DigestAlgorithm.SHA256);
        String content = hashMap.toString() + "." + secretKey;
        return md5.digestHex(content);
    }
}
