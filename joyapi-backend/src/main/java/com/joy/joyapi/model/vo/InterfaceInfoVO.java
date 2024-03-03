package com.joy.joyapi.model.vo;

import com.joy.joyapi.model.entity.InterfaceInfo;
import lombok.Data;
import org.springframework.beans.BeanUtils;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


/**
 * 接口信息视图
 * <p>
 * 作者：Jason
 * <p>
 * 链接：<a href="https://www.ojason.top">我的博客</a>
 */
@Data
public class InterfaceInfoVO implements Serializable {

    /**
     * 主键
     */
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
     * 包装类转对象
     *
     * @param infoVO 包装类
     * @return 对象
     */
    public static InterfaceInfo voToObj(InterfaceInfoVO infoVO) {
        if (infoVO == null) {
            return null;
        }
        InterfaceInfo info = new InterfaceInfo();
        BeanUtils.copyProperties(infoVO, info);
        return info;
    }

    /**
     * 对象转包装类
     *
     * @param info 信息
     * @return 包装类
     */
    public static InterfaceInfoVO objToVo(InterfaceInfo info) {
        if (info == null) {
            return null;
        }
        InterfaceInfoVO infoVO = new InterfaceInfoVO();
        BeanUtils.copyProperties(info, infoVO);
        return infoVO;
    }

    public static List<InterfaceInfoVO> listObjToListVo(List<InterfaceInfo> records) {
        List<InterfaceInfoVO> list = new ArrayList<>();
        for (InterfaceInfo info : records) {
            InterfaceInfoVO infoVO = objToVo(info);
            list.add(infoVO);
        }
        return list;
    }
}
