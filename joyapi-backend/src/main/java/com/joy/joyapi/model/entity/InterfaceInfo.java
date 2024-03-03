package com.joy.joyapi.model.entity;

import com.baomidou.mybatisplus.annotation.*;
import com.joy.joyapi.model.vo.UserVO;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 接口
 *
 * @TableName interface_info
 */
@TableName(value = "interface_info")
@Data
public class InterfaceInfo implements Serializable {
    /**
     * 主键
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 接口名称
     */
    private String name;

    /**
     * 描述
     */
    private String description;

    /**
     * 接口地址
     */
    private String url;

    /**
     * 请求头
     */
    private String requestHeader;

    /**
     * 响应头
     */
    private String responseHeader;

    /**
     * 接口状态 0：关闭 1：开启
     */
    private Integer status;

    /**
     * 请求类型
     */
    private String method;

    /**
     * 创建人ID
     */
    private Long userId;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新时间
     */
    private Date updateTime;

    /**
     * 是否删除(0-未删, 1-已删)
     */
    @TableLogic
    private Integer isDelete;

    /**
     * 类别
     */
    private String category;

    /**
     * 请求示例
     */
    private String requestExample;

    /**
     * 响应示例
     */
    private String responseExample;

    /**
     * 接口创建人信息
     */
    @TableField(exist = false)
    private UserVO creatorInfo;


    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}