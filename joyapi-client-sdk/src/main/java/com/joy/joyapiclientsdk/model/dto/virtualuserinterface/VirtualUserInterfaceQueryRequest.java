package com.joy.joyapiclientsdk.model.dto.virtualuserinterface;

import com.joy.joyapiclientsdk.common.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

/**
 * @program: joyapi-interface
 * @ClassName: VirtualUserInterfaceQueryRequest
 * @description: 虚拟用户接口请求类
 * @author: Jason
 * @create: 2024-03-05 18:13
 * @from: <a href="https://www.ojason.top">我的博客</a>
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class VirtualUserInterfaceQueryRequest extends PageRequest implements Serializable {

    private static final long serialVersionUID = 1L;
    

}
