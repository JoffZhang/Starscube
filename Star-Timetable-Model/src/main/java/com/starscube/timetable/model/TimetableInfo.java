package com.starscube.timetable.model;

import java.util.Date;

/**
 * @Author : ZhangYun
 * @Description :
 * @Date :  2017/6/9.
 */
public class TimetableInfo {
    private Integer id;
    private Integer baseId;
    private Integer mon;
    private Integer tue;
    private Integer wed;
    private Integer thur;
    private Integer fri;
    private Integer tempId;

    private Date startTime;
    private Date endTime;

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public Integer getTempId() {
        return tempId;
    }

    public void setTempId(Integer tempId) {
        this.tempId = tempId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getBaseId() {
        return baseId;
    }

    public void setBaseId(Integer baseId) {
        this.baseId = baseId;
    }

    public Integer getMon() {
        return mon;
    }

    public void setMon(Integer mon) {
        this.mon = mon;
    }

    public Integer getTue() {
        return tue;
    }

    public void setTue(Integer tue) {
        this.tue = tue;
    }

    public Integer getWed() {
        return wed;
    }

    public void setWed(Integer wed) {
        this.wed = wed;
    }

    public Integer getThur() {
        return thur;
    }

    public void setThur(Integer thur) {
        this.thur = thur;
    }

    public Integer getFri() {
        return fri;
    }

    public void setFri(Integer fri) {
        this.fri = fri;
    }


    private TimetableInfoUser infoUser;

    public TimetableInfoUser getInfoUser() {
        return infoUser;
    }

    public void setInfoUser(TimetableInfoUser infoUser) {
        this.infoUser = infoUser;
    }
}
