package com.joy.joyapi.model.dto.userinterfaceinfo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.io.Serializable;

/**
 * 查询请求
 *
 * @author Jason
 */
@Data
public class UserInterfaceInfoQueryRequest implements Serializable {

    /**
     * id
     */
    @TableId(type = IdType.AUTO)
    private Long id;

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