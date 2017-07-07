package com.starscube.timetable.model;

import java.util.Date;
import java.util.List;

/**
 * @Author : ZhangYun
 * @Description :
 * @Date :  2017/6/9.
 */
public class TimetableBase {
    private Integer id;
    private Integer stagesId;
    private Integer gradeId;
    private Integer classId;
    private Integer schoolId;
    private Date startDate;
    private Date endDate;
    private Integer status ; //0删除，1正常
    private String stageName;
    private String gradeName;
    private String className;

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getStageName() {
        return stageName;
    }

    public void setStageName(String stageName) {
        this.stageName = stageName;
    }

    public String getGradeName() {
        return gradeName;
    }

    public void setGradeName(String gradeName) {
        this.gradeName = gradeName;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getStagesId() {
        return stagesId;
    }

    public void setStagesId(Integer stagesId) {
        this.stagesId = stagesId;
    }

    public Integer getGradeId() {
        return gradeId;
    }

    public void setGradeId(Integer gradeId) {
        this.gradeId = gradeId;
    }

    public Integer getClassId() {
        return classId;
    }

    public void setClassId(Integer classId) {
        this.classId = classId;
    }

    public Integer getSchoolId() {
        return schoolId;
    }

    public void setSchoolId(Integer schoolId) {
        this.schoolId = schoolId;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    private List<TimetableInfo> infoList;
    public List<TimetableInfo> getInfoList() {
        return infoList;
    }

    public void setInfoList(List<TimetableInfo> infoList) {
        this.infoList = infoList;
    }


}
