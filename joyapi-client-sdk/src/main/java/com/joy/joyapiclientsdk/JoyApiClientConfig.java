package com.joy.joyapiclientsdk;

import com.joy.joyapiclientsdk.client.JoyApiClient;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

/**
 * @program: joyapi-client-sdk
 * @ClassName: JoyApiClientConfig
 * @description: JoyApiClient配置类
 * @author Jason
 * @create: 2024-03-14 21:51
 * @from: <a href="https://www.ojason.top">我的博客</a>
 */
@Configuration
@ConfigurationProperties(prefix = "joyapi.client")
@Data
@ComponentScan
public class JoyApiClientConfig {
    private String accessKey;
    private String secretKey;

    @Bean
    public JoyApiClient joyApiClient() {
        return new JoyApiClient(accessKey, secretKey);
    }

}
