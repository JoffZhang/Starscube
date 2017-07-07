package com.starscube.timetable.dao;

import com.starscube.timetable.model.ClassInfo;
import org.apache.ibatis.annotations.*;

import java.util.List;

/**
 * @Author : ZhangYun
 * @Description :
 * @Date :  2017/6/5.
 */
@Mapper
public interface ClassInfoDao {
    @Results({
            @Result(id=true,property = "id",column = "classId"),
            @Result(property = "className",column = "className")
    })
    @Select("SELECT classId,className FROM class_info WHERE schoolUUID=#{schoolUUID}")
    public List<ClassInfo> getClassBySchoolUUID(@Param("schoolUUID") String schoolUUID) ;

}
