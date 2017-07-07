package com.starscube.timetable.web;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.starscube.basedata.model.PageBean;
import com.starscube.timetable.model.SchoolInfoBean;
import com.starscube.timetable.model.TimetableBase;
import com.starscube.timetable.model.TimetableTemp;
import com.starscube.timetable.service.TimetableService;
import com.starscube.timetable.bomodel.Timetable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * @Author : ZhangYun
 * @Description :
 * @Date :  2017/6/5.
 */
@RestController
@RequestMapping(value = "timetable")
public class TimetableController {
    @Autowired
    TimetableService timetableService;
    @Autowired
    StringRedisTemplate stringRedisTemplate;

    @RequestMapping(value="/tempList",method = RequestMethod.GET)
    public ResponseEntity<List<TimetableTemp>> readTemps(@RequestParam Integer schoolId){
        List<TimetableTemp> datas = timetableService.readTimetableTemps(schoolId);
        return new ResponseEntity<List<TimetableTemp>>(datas, HttpStatus.OK);
    }

    @RequestMapping(value="/saveTemp",method = RequestMethod.POST)
    public ResponseEntity<List<TimetableTemp>> saveTemp(@RequestBody Map<String,Object> map) throws IOException {
        /*ObjectMapper objectMapper = new ObjectMapper();
        JavaType javaType = objectMapper.getTypeFactory().constructParametricType(List.class,TimetableTemp.class);
        List<TimetableTemp> list = objectMapper.readValue(temps,javaType);
        Integer schoolId = list.get(0).getSchoolId();*/
        List<TimetableTemp> datas = timetableService.saveTemp(Integer.parseInt(map.get("schoolId").toString()),map.get("temps").toString());
        return new ResponseEntity<List<TimetableTemp> >(datas,HttpStatus.OK);
    }

    @RequestMapping(value = "/save",method = RequestMethod.POST)
    public Object saveTimetable(@RequestBody Timetable timetable){
        Integer flag = timetableService.saveTimetable(timetable);
        if(flag != null && flag >0){
            SchoolInfoBean schoolInfoBean = timetable.getSchoolInfoBean();
            if(stringRedisTemplate.opsForValue().get("provinceCode-"+schoolInfoBean.getProvinceCode())==null){
                stringRedisTemplate.opsForValue().set("provinceCode-"+schoolInfoBean.getProvinceCode(),schoolInfoBean.getProvinceName());
            }

            if(stringRedisTemplate.opsForValue().get("cityCode-"+schoolInfoBean.getProvinceCode()+"-"+schoolInfoBean.getCityCode())==null){
                stringRedisTemplate.opsForValue().set("cityCode-"+schoolInfoBean.getProvinceCode()+"-"+schoolInfoBean.getCityCode(),schoolInfoBean.getCityName());
            }

            if(stringRedisTemplate.opsForValue().get("districtCode-"+schoolInfoBean.getProvinceCode()+"-"+schoolInfoBean.getCityCode()+"-"+schoolInfoBean.getDistrictCode())==null){
                stringRedisTemplate.opsForValue().set("districtCode-"+schoolInfoBean.getProvinceCode()+"-"+schoolInfoBean.getCityCode()+"-"+schoolInfoBean.getDistrictCode(),schoolInfoBean.getDistrictName());
            }
            return new ResponseEntity(HttpStatus.OK);
        }

        return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @RequestMapping(value = "/delete",method = RequestMethod.POST)
    public Object deleteTimetable(@RequestBody Map<String,Integer> map){
        if(map.containsKey("id")){
            Integer flag = timetableService.deleteTimetable( map.get("id"),map.get("schoolId"));
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value="/list",method = RequestMethod.GET)
    public ResponseEntity<TimetableBase> getTimetable(@RequestParam(value = "id") Integer id){
        TimetableBase datas = timetableService.getTimetable(id);
        return new ResponseEntity<TimetableBase>(datas, HttpStatus.OK);
    }

    @RequestMapping(value="/timetables",method = RequestMethod.GET)
    public ResponseEntity<PageBean<TimetableBase>> getTimetables(Integer stagesId,Integer gradeId,
                                                                 @RequestParam(value = "type", defaultValue = "1") Integer type,
                                                                 @RequestParam(value = "schoolId") Integer schoolId,
                                                                 @RequestParam(value = "pageIndex",defaultValue = "0") Integer pageIndex,
                                                                 @RequestParam(value = "pageSize",defaultValue = "20") Integer pageSize){
        PageBean<TimetableBase> datas = timetableService.getTimetables(schoolId,stagesId,gradeId,type,pageIndex,pageSize);
        return new ResponseEntity<PageBean<TimetableBase>>(datas, HttpStatus.OK);
    }
}
