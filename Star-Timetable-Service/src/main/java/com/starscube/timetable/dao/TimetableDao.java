package com.starscube.timetable.dao;

import com.starscube.timetable.dao.provider.TimetableProvider;
import com.starscube.timetable.model.TimetableBase;
import com.starscube.timetable.model.TimetableInfo;
import com.starscube.timetable.model.TimetableInfoUser;
import com.starscube.timetable.model.TimetableTemp;
import org.apache.ibatis.annotations.*;

import java.util.Date;
import java.util.List;

/**
 * @Author : ZhangYun
 * @Description :
 * @Date :  2017/6/5.
 */
@Mapper
public interface TimetableDao {
    @Results({
            @Result(id = true, property = "id", column = "id"),
            @Result(property = "startTime", column = "start_time"),
            @Result(property = "endTime", column = "end_time"),
            @Result(property = "version", column = "version"),
            @Result(property = "schoolId", column = "school_id")
    })
    @Select("SELECT * FROM timetable_temp WHERE school_id=#{schoolId} and version=(select max(version) from timetable_temp where school_id=#{schoolId}) order by start_time")
    public List<TimetableTemp> getTemps(@Param("schoolId") Integer schoolId);

    @InsertProvider(type = TimetableProvider.class, method = "insertAll")
    int saveTemps(@Param("tempList") List<TimetableTemp> temps);

    @Insert("INSERT INTO timetable_base(stages_id,grade_id ,class_id , start_date,  end_date , school_id ) VALUES(#{baseInfo.stagesId},#{baseInfo.gradeId } ,#{baseInfo.classId} , #{baseInfo.startDate},  #{baseInfo.endDate} , #{baseInfo.schoolId} )")
    @Options(useGeneratedKeys = true,keyProperty = "baseInfo.id")
    int saveTimetableBase(@Param("baseInfo") TimetableBase baseInfo);

    @Insert("INSERT INTO timetable_info(base_id,mon,tue,wed,thur,fri,temp_id) VALUES(#{timetableInfo.baseId},#{timetableInfo.mon},#{timetableInfo.tue},#{timetableInfo.wed},#{timetableInfo.thur},#{timetableInfo.fri},#{timetableInfo.tempId})")
    @Options(useGeneratedKeys = true,keyProperty = "timetableInfo.id")
    int saveTimetableInfo(@Param("timetableInfo") TimetableInfo timetableInfo);
    @Insert("INSERT INTO timetable_info_user(info_id,mon,tue,wed,thur,fri) VALUES(#{timetableInfoUser.infoId},#{timetableInfoUser.mon},#{timetableInfoUser.tue},#{timetableInfoUser.wed},#{timetableInfoUser.thur},#{timetableInfoUser.fri})")
    int saveTimetableInfoUser(@Param("timetableInfoUser")TimetableInfoUser timetableInfoUser);

    @Select("SELECT * FROM timetable_base WHERE id=#{id}")
    @Results({
            @Result(id = true,property="id",column = "id"),
            @Result(property = "stagesId",column = "stages_id"),
            @Result(property="gradeId",column="grade_id"),
            @Result(property="classId",column="class_id"),
            @Result(property="startDate",column="start_date"),
            @Result(property="endDate",column="end_date"),
            @Result(property="schoolId",column="school_id"),
            @Result(property = "infoList",javaType = List.class,column = "{baseId=id,schoolId=school_id}",
            many = @Many(select = "com.starscube.timetable.dao.TimetableDao.getTimetableInfoByBaseId"))

    })
    TimetableBase getTimetableById(@Param("id") Integer id);

    @Select("SELECT i.*,t.start_time as start_time,t.end_time as end_time FROM timetable_info i RIGHT JOIN timetable_temp t ON i.temp_id=t.id WHERE i.base_id = #{baseId} and t.version=(select max(version) from timetable_temp where school_id=#{schoolId}) order by t.start_time")
    @Results({
            @Result(id=true,property = "id",column = "id"),
            @Result(property = "baseId",column = "base_id"),
            @Result(property = "mon",column = "mon"),
            @Result(property = "tue",column = "tue"),
            @Result(property = "wed",column = "wed"),
            @Result(property = "thur",column = "thur"),
            @Result(property = "fri",column = "fri"),
            @Result(property = "tempId",column = "temp_id"),
            @Result(property = "startTime", column = "start_time"),
            @Result(property = "endTime", column = "end_time"),
            @Result(property = "infoUser",column="id",one = @One(select="com.starscube.timetable.dao.TimetableDao.getTimetableInfoUserByInfoId"))
    })
    List<TimetableInfo> getTimetableInfoByBaseId(@Param("baseId")Integer baseId,@Param("schoolId")String schoolId);


    @Select("SELECT * FROM timetable_info_user WHERE info_id = #{infoId}")
    @Results({
            @Result(id=true,property = "infoId",column = "info_id"),
            @Result(property = "mon",column = "mon"),
            @Result(property = "tue",column = "tue"),
            @Result(property = "wed",column = "wed"),
            @Result(property = "thur",column = "thur"),
            @Result(property = "fri",column = "fri")
    })
    List<TimetableInfoUser> getTimetableInfoUserByInfoId(@Param("infoId")Integer infoId);


    @Update("UPDATE timetable_base set stages_id=#{baseInfo.stagesId},grade_id=#{baseInfo.gradeId},class_id=#{baseInfo.classId},start_date=#{baseInfo.startDate},end_date=#{baseInfo.endDate},status=#{baseInfo.status} where id=#{baseInfo.id}")
    Integer updateTimetableBase(@Param("baseInfo") TimetableBase baseInfo);

    @Update("UPDATE timetable_info set mon=#{info.mon},tue=#{info.tue},wed=#{info.wed},thur=#{info.thur},fri=#{info.fri},temp_id=#{info.tempId} where id=#{info.id}")
    int updateTimetableInfo(@Param("info")TimetableInfo info);

    @Update("UPDATE timetable_info_user set mon=#{info.mon},tue=#{info.tue},wed=#{info.wed},thur=#{info.thur},fri=#{info.fri} where info_id=#{info.infoId}")
    int updateTimetableInfoUser(@Param("info")TimetableInfoUser info);

    @Results({
            @Result(id = true,property="id",column = "id"),
            @Result(property = "stagesId",column = "stages_id"),
            @Result(property="gradeId",column="grade_id"),
            @Result(property="classId",column="class_id"),
            @Result(property="startDate",column="start_date"),
            @Result(property="endDate",column="end_date"),
            @Result(property="schoolId",column="school_id"),
            @Result(property="stageName",column="stageName"),
            @Result(property="className",column="className"),
            @Result(property="gradeName",column="gradeName")
    })
    @SelectProvider(type = TimetableProvider.class,method = "getTimetables")
    List<TimetableBase> getTimetableList(@Param("schoolId") Integer schoolId,@Param("stagesId") Integer stagesId,@Param("gradeId") Integer gradeId,@Param("type") Integer type,@Param("date") Date date,@Param("pageIndex") Integer pageIndex,@Param("pageSize") Integer pageSize,@Param("status")Integer status);


    @SelectProvider(type = TimetableProvider.class,method = "getTimetablesCount")
    Integer getTimetableCount(@Param("schoolId") Integer schoolId,@Param("stagesId") Integer stagesId,@Param("gradeId") Integer gradeId,@Param("type") Integer type,@Param("date") Date date,@Param("status")Integer status);

    @UpdateProvider(type= TimetableProvider.class,method = "changeBaseStatus")
    int changeBaseStatus(@Param("schoolId") Integer schoolId, @Param("version")Integer version);
}
