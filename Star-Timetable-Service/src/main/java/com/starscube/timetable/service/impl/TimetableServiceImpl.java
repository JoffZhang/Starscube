package com.starscube.timetable.service.impl;

import com.starscube.basedata.model.PageBean;
import com.starscube.timetable.bomodel.Timetable;
import com.starscube.timetable.dao.TimetableDao;
import com.starscube.timetable.model.TimetableBase;
import com.starscube.timetable.model.TimetableInfo;
import com.starscube.timetable.model.TimetableInfoUser;
import com.starscube.timetable.service.TimetableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

/**
 * @Author : ZhangYun
 * @Description :
 * @Date :  2017/6/12.
 */

@Service
public class TimetableServiceImpl implements TimetableService {


    @Autowired
    private TimetableDao timetableDao;


    @Override
    @Transactional(readOnly = true)
    public TimetableBase selectTimetableById(Integer id) {
        return timetableDao.getTimetableById(id);
    }

    @Override
    public PageBean<TimetableBase> selectTimetableList(Integer schoolId,Integer stagesId,Integer gradeId,Integer type,Date date,Integer pageIndex,Integer pageSize) {
        Integer count = timetableDao.getTimetableCount(schoolId,stagesId,gradeId,type,date,1);
        PageBean<TimetableBase> page = new PageBean<>(pageIndex,pageSize,count);
        if(count > 0){
            pageIndex = pageIndex*pageSize;
            List<TimetableBase> timetableList = timetableDao.getTimetableList(schoolId, stagesId, gradeId, type, date, pageIndex, pageSize,1);
            page.setList(timetableList);
        }
        return page;
    }

    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public Integer deleteTimetable(Integer id, Integer schoolId) {
        //TimetableBase base = timetableDao.getTimetable(id,schoolId);
        TimetableBase base = timetableDao.getTimetableById(id);
        if(base != null){
            base.setStatus(0);
            return timetableDao.updateTimetableBase(base);
        }
        return 0;
    }

    @Override
    public int changeBaseStatus(Integer schoolId, Integer version) {
        if(version == null || version == 0) return 1;
        int rows = timetableDao.changeBaseStatus(schoolId,version);
        return rows;
    }


    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public Integer saveTimetable(Timetable timetable) {
        TimetableBase baseInfo = timetable.getBaseInfo();
        baseInfo.setStatus(1);
        Integer  result = 0;
        if(baseInfo.getId() != null && baseInfo.getId() !=0){
            result = timetableDao.updateTimetableBase(baseInfo);
        }else{
            result = timetableDao.saveTimetableBase(baseInfo);
        }
        List<TimetableInfo> info = timetable.getInfo();
        List<TimetableInfoUser> userInfo = timetable.getUserInfo();
        for (int i = 0; i < info.size(); i++) {
            TimetableInfo timetableInfo = info.get(i);
            if(timetableInfo.getId() !=null && timetableInfo.getId() !=0){
                result =  timetableDao.updateTimetableInfo(timetableInfo);
            }else{
                timetableInfo.setBaseId(baseInfo.getId());
                result = timetableDao.saveTimetableInfo(timetableInfo);
            }
            TimetableInfoUser timetableInfoUser = userInfo.get(i);
            if(timetableInfoUser.getInfoId() !=null && timetableInfoUser.getInfoId() !=0){
                result = timetableDao.updateTimetableInfoUser(timetableInfoUser);
            }else{
                timetableInfoUser.setInfoId(timetableInfo.getId());
                result = timetableDao.saveTimetableInfoUser(timetableInfoUser);
            }
        }
        return result;
    }
}
