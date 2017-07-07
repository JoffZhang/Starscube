package com.starscube.basedata.web;

import com.starscube.basedata.dao.DictDao;
import com.starscube.basedata.model.Dict;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @Author : ZhangYun
 * @Description :
 * @Date :  2017/5/22.
 */
@RestController
@RequestMapping(value = "/basedata")
public class DictController {

    @Autowired
    private DictDao dictDao;

    @RequestMapping(value = "/{parentId}",method = RequestMethod.GET)
    public List<Dict> findDatas(@PathVariable Integer parentId,Integer type){
        if(type == null)type = 3;
        return dictDao.findDatas(parentId,type,1);
    }
}
