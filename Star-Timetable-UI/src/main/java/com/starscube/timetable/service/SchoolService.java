package com.starscube.timetable.service;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.starscube.basedata.model.Dict;
import com.starscube.timetable.model.ClassInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author : ZhangYun
 * @Description :
 * @Date :  2017/5/23.
 */
@Service
public class SchoolService {
    @Autowired
    RestTemplate restTemplate;

    final String SERVICE_NAME="SERVICE-TIMETABLE";

    @HystrixCommand(fallbackMethod = "fallback")
    public List<ClassInfo> searchClassesBySchool(String schoolUUID){
        Map<String,String> variable = new HashMap<>(1);
        variable.put("schoolUUID",schoolUUID);
        return restTemplate.getForObject("http://"+SERVICE_NAME+"/schools/{schoolUUID}/classes",List.class,variable);
    }
    private List<ClassInfo> fallback(String schoolUUID){
        System.out.println("HystrixCommand fallbackMethod handle!");
        return new ArrayList<ClassInfo>(0);
    }
}
