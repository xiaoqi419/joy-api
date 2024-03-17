package com.joy.joyapi.model.dto.user;

import lombok.Data;

/**
 * @program: joyapi-backend
 * @ClassName: UserUpdatePasswordRequest
 * @description:
 * @author: Jason
 * @create: 2024-03-17 12:21
 * @from: <a href="https://www.ojason.top">我的博客</a>
 */
@Data
public class UserUpdatePasswordRequest {

    private String oldPassword;

    private String newPassword;

    private String checkPassword;
}
