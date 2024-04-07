package com.joy.joyapi.model.dto.userinterfaceinfo;

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
public class UserInterfaceInfoQueryRequest extends PageRequest implements Serializable {

    /**
     * id
     */
    private Long id;

    /**
     * 接口id
     */
    private Long interfaceId;

    /**
     * 调用用户 id
     */
    private Long userId;

    /**
     * 调用次数
     */
    private Integer totalNum;

    /**
     * 状态 0-正常 1-禁用
     */
    private Integer status;


    private static final long serialVersionUID = 1L;
}