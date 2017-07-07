package com.starscube.timetable.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.starscube.basedata.model.PageBean;
import com.starscube.timetable.bomodel.Timetable;
import com.starscube.timetable.model.TimetableBase;
import com.starscube.timetable.model.TimetableInfo;
import com.starscube.timetable.model.TimetableInfoUser;
import com.starscube.timetable.model.TimetableTemp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.Charset;
import java.util.*;

/**
 * @Author : ZhangYun
 * @Description :
 * @Date :  2017/6/5.
 */
@Service
public class TimetableService {
    @Autowired
    RestTemplate restTemplate;

    final String SERVICE_NAME="SERVICE-TIMETABLE";

    @HystrixCommand(fallbackMethod = "fallbackTimetableTemp")
    public List<TimetableTemp> readTimetableTemps(Integer schooleId){
        Map<String,Integer> variable = new HashMap<>(1);
        variable.put("schoolId",schooleId);
        return restTemplate.getForObject("http://"+SERVICE_NAME+"/timetable/tempList?schoolId={schoolId}",List.class,variable);
    }

    public TimetableBase getTimetable(Integer id) {
        Map<String,Integer> variable = new HashMap<>(1);
        variable.put("id",id);
        return restTemplate.getForObject("http://"+SERVICE_NAME+"/timetable/list?id={id}",TimetableBase.class,variable);
    }

    private List<TimetableTemp> fallbackTimetableTemp(Integer schooleId){
        System.out.println("HystrixCommand fallbackTimetableTemp handle!");
        return new ArrayList<TimetableTemp>(0);
    }

    public List<TimetableTemp> saveTemp(Integer schoolId,String temps) {
        MultiValueMap<String,Object> variable = new LinkedMultiValueMap<>(2);
        variable.add("temps",temps);
        variable.add("schoolId",schoolId);
        return restTemplate.postForObject("http://"+SERVICE_NAME+"/timetable/saveTemp",variable ,List.class);
    }
    public Integer saveTimetable(Timetable timetable) {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(new MediaType("application","json",Charset.forName("UTF-8")));
        HttpEntity<String> stringHttpEntity = new HttpEntity<>(JSON.toJSONString(timetable), httpHeaders);
        return restTemplate.postForObject("http://"+SERVICE_NAME+"/timetable/save",stringHttpEntity ,Integer.class);
    }

    public static void main(String[] args) {
        RestTemplate restTemplate = new RestTemplate();
        MultiValueMap<String,Object> variable = new LinkedMultiValueMap<>(2);
        Timetable timetable = new Timetable();
        TimetableBase baseInfo = new TimetableBase();
        baseInfo.setSchoolId(1);
        baseInfo.setEndDate(new Date());
        ArrayList<TimetableInfo> info = new ArrayList<>();
        TimetableInfo timetableInfo1 = new TimetableInfo();
        timetableInfo1.setFri(3);
        timetableInfo1.setMon(4);

        info.add(timetableInfo1);
        ArrayList<TimetableInfoUser> objects = new ArrayList<>();
        TimetableInfoUser timetableInfoUser = new TimetableInfoUser();
        timetableInfoUser.setMon("张三");
        objects.add(timetableInfoUser);
        timetable.setInfo(info);
        timetable.setBaseInfo(baseInfo);
        timetable.setUserInfo(objects);

        System.out.println(JSON.toJSONString(timetable));

        variable.add("timetable",timetable);


        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(new MediaType("application","json", Charset.forName("UTF-8")));
        HttpEntity<String> stringHttpEntity = new HttpEntity<>(JSON.toJSONString(timetable), httpHeaders);


        restTemplate.postForObject("http://localhost:2010/timetable/save",stringHttpEntity ,List.class);
    }


    public PageBean<TimetableBase> getTimetables(Integer schoolId, Integer stagesId, Integer gradeId, Integer type, Integer pageIndex, Integer pageSize) {
        Map<String,Integer> variable = new HashMap<>(6);
        variable.put("schoolId",schoolId);
        variable.put("stagesId",stagesId);
        variable.put("gradeId",gradeId);
        variable.put("type",type);
        variable.put("pageIndex",pageIndex);
        variable.put("pageSize",pageSize);
        return restTemplate.getForObject("http://"+SERVICE_NAME+"/timetable/timetables?schoolId={schoolId}&stagesId={stagesId}&gradeId={gradeId}&type={type}&pageIndex={pageIndex}&pageSize={pageSize}",PageBean.class,variable);
    }

    public Integer deleteTimetable(Integer id,Integer schoolId) {
        MultiValueMap<String,Object> variable = new LinkedMultiValueMap<>(2);
        variable.add("id",id);
        variable.add("schoolId",schoolId);
        return restTemplate.postForObject("http://"+SERVICE_NAME+"/timetable/delete",variable,Integer.class);
    }
}
