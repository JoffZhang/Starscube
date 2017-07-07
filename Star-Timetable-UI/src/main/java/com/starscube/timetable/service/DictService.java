package com.starscube.timetable.service;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.starscube.basedata.model.Dict;
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
public class DictService {
    @Autowired
    RestTemplate restTemplate;

    final String SERVICE_NAME="SERVICE-BASEDATA";

    @HystrixCommand(fallbackMethod = "fallbackSearchSSSDatas")
    public List<Dict> readSchoolStageSubject(Integer parentId,Integer type){
        Map<String,Integer> variable = new HashMap<>(2);
        variable.put("parentId",parentId);
        variable.put("type",type);
        return restTemplate.getForObject("http://"+SERVICE_NAME+"/basedata/{parentId}?type={type}",List.class,variable);
    }
    private List<Dict> fallbackSearchSSSDatas(Integer parentId,Integer type){
        System.out.println("HystrixCommand fallbackMethod handle!");
        return new ArrayList<Dict>(0);
    }
}
