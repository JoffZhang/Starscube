package com.starscube.timetable.dao.provider;

import com.starscube.timetable.model.TimetableTemp;
import org.apache.ibatis.jdbc.SQL;

import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @Author : ZhangYun
 * @Description :
 * @Date :  2017/6/5.
 */
public class TimetableProvider {

    public String insertAll(Map map){
        List<TimetableTemp> temps = (List<TimetableTemp>) map.get("tempList");
        StringBuilder sb = new StringBuilder();
        sb.append(" INSERT INTO timetable_temp ")
            .append(" (start_time,end_time,version,school_id) ")
                .append(" VALUES ");
        MessageFormat mf = new MessageFormat(" (#'{'tempList[{0}].startTime},#'{'tempList[{0}].endTime},#'{'tempList[{0}].version},#'{'tempList[{0}].schoolId}) ");
        for(int i = 0 ; i< temps.size();i++){
            sb.append(mf.format(new Object[]{i}));
            if(i<temps.size()-1){
                sb.append(",");
            }
        }
        return sb.toString();
    }


    public String changeBaseStatus(Map map) {
        Integer schoolId = (Integer) map.get("schoolId");
        Integer version = (Integer) map.get("version");
        StringBuilder sb = new StringBuilder();
        sb.append("UPDATE timetable_base set status = ").append(version+10)
                .append(" WHERE school_id = "+schoolId).append(" and ").append(" status = ").append(version-1);
        return sb.toString();
    }
    public String getTimetables(Map map){
        Integer gradeId = (Integer) map.get("gradeId");
        Integer stagesId = (Integer) map.get("stagesId");
        Integer pageIndex = (Integer) map.get("pageIndex");
        Integer pageSize = (Integer) map.get("pageSize");
        Integer type = (Integer) map.get("type");
        String s = new SQL() {
            {
                SELECT("t.*,d.title as stageName,d2.title as gradeName,c.className as className");
                FROM("timetable_base t");
                LEFT_OUTER_JOIN("Dict d on t.stages_id=d.id");
                LEFT_OUTER_JOIN("Dict d2 on t.grade_id=d2.id");
                LEFT_OUTER_JOIN("class_info c on t.class_id=c.classId");
                WHERE("t.school_id=#{schoolId}");
                if (type == 1) {//当前学期
                    WHERE("#{date}>=t.start_date and t.end_date>=#{date}");
                } else if (type == 2) {//未来学期
                    WHERE("t.start_date>#{date}");
                } else if (type == 3) {//过去学期
                    WHERE("#{date}>t.end_date");
                }
                if (stagesId != null && stagesId != 0) {
                    WHERE("t.stages_id = #{stagesId}");
                }
                if (gradeId != null && gradeId != 0) {
                    WHERE("t.grade_id = #{gradeId}");
                }
                WHERE("t.status = #{status}");
            }
        }.toString();
        return s.toString()+" limit #{pageIndex},#{pageSize}";
    }

    public String getTimetablesCount(Map map){
        Integer gradeId = (Integer) map.get("gradeId");
        Integer stagesId = (Integer) map.get("stagesId");
        Integer type = (Integer) map.get("type");
        String s = new SQL() {
            {
                SELECT("count(*)");
                FROM("timetable_base t");
                WHERE("t.school_id=#{schoolId}");
                if (type == 1) {//当前学期
                    WHERE("#{date}>=t.start_date and t.end_date>=#{date}");
                } else if (type == 2) {//未来学期
                    WHERE("t.start_date>#{date}");
                } else if (type == 3) {//过去学期
                    WHERE("#{date}>t.end_date");
                }
                if (stagesId != null && stagesId != 0) {
                    WHERE("t.stages_id = #{stagesId}");
                }
                if (gradeId != null && gradeId != 0) {
                    WHERE("t.grade_id = #{gradeId}");
                }
                WHERE("t.status = #{status}");
            }
        }.toString();
        return s.toString();
    }
}
