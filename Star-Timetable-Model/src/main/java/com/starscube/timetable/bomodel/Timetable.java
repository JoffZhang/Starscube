package com.starscube.timetable.bomodel;

import com.starscube.timetable.model.SchoolInfoBean;
import com.starscube.timetable.model.TimetableBase;
import com.starscube.timetable.model.TimetableInfo;
import com.starscube.timetable.model.TimetableInfoUser;

import java.util.List;

/**
 * @Author : ZhangYun
 * @Description :
 * @Date :  2017/6/9.
 */
public class Timetable {
    private TimetableBase baseInfo;
    private List<TimetableInfo> info;
    private List<TimetableInfoUser> userInfo;

    private SchoolInfoBean schoolInfoBean;
    private Integer schoolId;

    public SchoolInfoBean getSchoolInfoBean() {
        return schoolInfoBean;
    }

    public void setSchoolInfoBean(SchoolInfoBean schoolInfoBean) {
        this.schoolInfoBean = schoolInfoBean;
    }

    public Integer getSchoolId() {
        return schoolId;
    }

    public void setSchoolId(Integer schoolId) {
        this.schoolId = schoolId;
    }

    public TimetableBase getBaseInfo() {
        return baseInfo;
    }

    public void setBaseInfo(TimetableBase baseInfo) {
        this.baseInfo = baseInfo;
    }

    public List<TimetableInfo> getInfo() {
        return info;
    }

    public void setInfo(List<TimetableInfo> info) {
        this.info = info;
    }

    public List<TimetableInfoUser> getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(List<TimetableInfoUser> userInfo) {
        this.userInfo = userInfo;
    }


}
