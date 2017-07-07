package com.starscube.timetable.web;

import com.starscube.timetable.dao.ClassInfoDao;
import com.starscube.timetable.model.ClassInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @Author : ZhangYun
 * @Description :
 * @Date :  2017/6/5.
 */
@RestController
@RequestMapping(value="schools")
public class SchoolController {
    @Autowired
    private ClassInfoDao classInfoDao;

    @RequestMapping(value = "/{schoolUUID}/classes",method = RequestMethod.GET)
    public List<ClassInfo> getClassList(@PathVariable String schoolUUID){
        return classInfoDao.getClassBySchoolUUID(schoolUUID);
    }
}
