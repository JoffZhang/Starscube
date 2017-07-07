package com.starscube.timetable.web;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.starscube.basedata.model.PageBean;
import com.starscube.timetable.bomodel.Timetable;
import com.starscube.timetable.dao.TimetableDao;
import com.starscube.timetable.model.TimetableBase;
import com.starscube.timetable.model.TimetableInfo;
import com.starscube.timetable.model.TimetableInfoUser;
import com.starscube.timetable.model.TimetableTemp;
import com.starscube.timetable.service.TimetableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

import static javafx.scene.input.KeyCode.H;

/**
 * @Author : ZhangYun
 * @Description :
 * @Date :  2017/6/5.
 */
@RestController
@RequestMapping(value = "timetable")
public class TimetableController {
    @Autowired
    private TimetableDao timetableDao;

    @Autowired
    private TimetableService timetableService;

    @RequestMapping(value = "/tempList", method = RequestMethod.GET)
    public List<TimetableTemp> getTemps(@RequestParam(value = "schoolId", required = true) Integer schoolId) {
        return timetableDao.getTemps(schoolId);
    }
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public Integer deleteTimetable(@RequestParam(value = "id") Integer id, @RequestParam(value = "schoolId") Integer schoolId) {
        return timetableService.deleteTimetable(id,schoolId);
    }
    @RequestMapping(value = "/saveTemp", method = RequestMethod.POST)
    public List<TimetableTemp> saveTemps(@RequestParam(value = "temps") String temps, @RequestParam(value = "schoolId") Integer schoolId) {
        ObjectMapper objectMapper = new ObjectMapper();
        JavaType javaType = objectMapper.getTypeFactory().constructParametricType(List.class, TimetableTemp.class);
        try {
            List<TimetableTemp> list = objectMapper.readValue(temps, javaType);
            int rows = timetableDao.saveTemps(list);
            if(rows>0){
                timetableService.changeBaseStatus(list.get(0).getSchoolId(),list.get(0).getVersion());
            }
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
        return timetableDao.getTemps(schoolId);
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity saveTimetable(@RequestBody Timetable timetable) {
        int result = timetableService.saveTimetable(timetable);
        return new ResponseEntity(result,HttpStatus.OK);
    }

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public TimetableBase getTimetable(@RequestParam(value = "id", required = true) Integer id) {
        TimetableBase timetableBase = timetableService.selectTimetableById(id);
        return timetableBase;
    }
    @RequestMapping(value = "/timetables", method = RequestMethod.GET)
    public PageBean<TimetableBase> getTimetableList(@RequestParam(value = "schoolId", required = true) Integer schoolId,
                                                Integer stagesId,Integer gradeId,
                                                @RequestParam(value = "type", defaultValue = "1") Integer type,
                                                @RequestParam(value = "pageIndex",defaultValue = "0") Integer pageIndex,
                                                @RequestParam(value = "pageSize",defaultValue = "20") Integer pageSize
        ) {
        Date today = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        try {
            today = sdf.parse(sdf.format(today));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        PageBean<TimetableBase> list = timetableService.selectTimetableList(schoolId,stagesId,gradeId,type,today,pageIndex,pageSize);
        return list;
    }

}
