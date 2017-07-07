package com.starscube.basedata.dao;

import com.starscube.basedata.model.Dict;
import org.apache.ibatis.annotations.*;

import java.util.List;

/**
 * @Author : ZhangYun
 * @Description :
 * @Date :  2017/5/22.
 */
@Mapper
public interface DictDao {
    @Results({
            @Result(id=true,property = "id",column = "ID"),
            @Result(property = "title",column = "Title")
    })
    @Select("SELECT ID,Title FROM Dict WHERE ParentID=#{parentId} and status=#{status} and type=#{type}")
    List<Dict> findDatas(@Param("parentId") Integer parentId,  @Param("type") Integer type,@Param("status") Integer status);
}
