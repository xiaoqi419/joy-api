package com.joy.joyapi.model.dto.interfaceinfo;

import com.joy.joyapi.common.PageRequest;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

/**
 * 接口信息审核请求
 *
 * @author Jason
 * @from <a href="https://www.ojason.top">我的博客</a>
 */

@Getter
@Setter
public class InterfaceInfoAuditRequest extends PageRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * id列表
     */
    private List<Long> id;

    /**
     * 审核状态
     */
    private Integer auditStatus;


}
