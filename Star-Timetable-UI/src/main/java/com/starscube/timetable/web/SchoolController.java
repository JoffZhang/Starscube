package com.starscube.timetable.web;

import com.starscube.basedata.model.Dict;
import com.starscube.timetable.model.ClassInfo;
import com.starscube.timetable.service.DictService;
import com.starscube.timetable.service.SchoolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @Author : ZhangYun
 * @Description :
 * @Date :  2017/5/23.
 */
@RestController
@RequestMapping(value="schools")
public class SchoolController {

    @Autowired
    SchoolService schoolService;

    @RequestMapping(value="/classes",method = RequestMethod.GET)
    public ResponseEntity<List<ClassInfo>> searchClassesBySchool(@RequestParam String schoolId){
        List<ClassInfo> datas = schoolService.searchClassesBySchool(schoolId);
        return new ResponseEntity<List<ClassInfo>>(datas, HttpStatus.OK);
    }
}
