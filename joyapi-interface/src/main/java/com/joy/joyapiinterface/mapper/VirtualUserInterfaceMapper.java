package com.joy.joyapiinterface.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.joy.joyapiinterface.model.entity.VirtualUserInterface;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author Jason
 * @description 针对表【virtual_user_interface(虚拟用户接口表)】的数据库操作Mapper
 * @createDate 2024-03-04 23:02:46
 * @Entity com.joy.joyapiinterface.model.entity.VirtualUserInterface
 */
public interface VirtualUserInterfaceMapper extends BaseMapper<VirtualUserInterface> {

    List<VirtualUserInterface> selectRandom(@Param("count") int count);
}




