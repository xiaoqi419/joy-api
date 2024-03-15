package com.joy.joyapi.model.dto.notice;

import com.joy.joyapi.common.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

/**
 * 查询请求
 *
 * @author Jason
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class NoticeQueryRequest extends PageRequest implements Serializable {

    /**
     * id
     */
    private Long id;

    /**
     * 内容
     */
    private String content;

    /**
     * 创建时间
     */
    private String createTime;

    /**
     * 更新时间
     */
    private String updateTime;


    private static final long serialVersionUID = 1L;
}