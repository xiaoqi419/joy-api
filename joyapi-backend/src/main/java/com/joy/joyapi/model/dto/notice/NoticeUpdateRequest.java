package com.joy.joyapi.model.dto.notice;

import lombok.Data;

import java.io.Serializable;

/**
 * 更新请求
 *
 * @author Jason
 */
@Data
public class NoticeUpdateRequest implements Serializable {

    /**
     * id
     */
    private Long id;

    /**
     * 内容
     */
    private String content;


    private static final long serialVersionUID = 1L;
}