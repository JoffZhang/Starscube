package com.starscube.timetable.service;

import com.starscube.basedata.model.PageBean;
import com.starscube.timetable.bomodel.Timetable;
import com.starscube.timetable.model.TimetableBase;

import java.util.Date;
import java.util.List;

/**
 * @Author : ZhangYun
 * @Description :
 * @Date :  2017/6/12.
 */
public interface TimetableService {

    Integer saveTimetable(Timetable timetable);

    TimetableBase selectTimetableById(Integer id);

    PageBean<TimetableBase> selectTimetableList(Integer schoolId, Integer stagesId, Integer gradeId, Integer type, Date date, Integer pageIndex, Integer pageSize);

    Integer deleteTimetable(Integer id, Integer schoolId);

    int changeBaseStatus(Integer schoolId, Integer version);
}
