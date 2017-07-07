package com.starscube.timetable.web;

import com.starscube.basedata.model.Dict;
import com.starscube.timetable.service.DictService;
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
@RequestMapping(value="basedata")
public class DictController {

    @Autowired
    DictService dictService;


    @RequestMapping(value="/{parentId}",method = RequestMethod.GET)
    public ResponseEntity<List<Dict>> readSSSDatas(@PathVariable Integer parentId,@RequestParam(value = "type",required=true) Integer type){
        List<Dict> datas = dictService.readSchoolStageSubject(parentId,type);
        return new ResponseEntity<List<Dict>>(datas, HttpStatus.OK);
    }
}
