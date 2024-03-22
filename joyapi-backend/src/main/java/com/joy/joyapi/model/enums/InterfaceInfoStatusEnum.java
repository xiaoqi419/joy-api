package com.joy.joyapi.model.enums;

/**
 * 接口信息状态枚举
 *
 * @author Jason
 */
public enum InterfaceInfoStatusEnum {

    OFFLINE(0, "下线"),
    ONLINE(1, "上线"),
    // 审核中
    AUDITING(2, "审核中");

    
    private final Integer code;
    private final String desc;

    InterfaceInfoStatusEnum(Integer code, String desc) {
        this.code = code;
        this.desc = desc;
    }

    public static boolean getEnumByValue(Integer status) {
        return status != null && status.equals(ONLINE.code);
    }


    public Integer getCode() {
        return code;
    }

    public String getDesc() {
        return desc;
    }


}
