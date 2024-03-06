package com.joy.joyapiinterface;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.joy.joyapiinterface.mapper")
public class JoyapiInterfaceApplication {

    public static void main(String[] args) {
        SpringApplication.run(JoyapiInterfaceApplication.class, args);
    }

}
