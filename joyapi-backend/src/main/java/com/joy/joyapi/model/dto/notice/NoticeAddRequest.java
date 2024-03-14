package com.joy.joyapi.model.dto.notice;

import lombok.Data;

import java.io.Serializable;

/**
 * 创建请求
 *
 * @author Jason
 */
@Data
public class NoticeAddRequest implements Serializable {

    /**
     * 内容
     */
    private String content;


    private static final long serialVersionUID = 1L;
}