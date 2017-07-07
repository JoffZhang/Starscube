package com.starscube.timetable.web;

import com.starscube.timetable.model.TimetableTemp;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @Author : ZhangYun
 * @Description :
 * @Date :  2017/6/16.
 */
@RestController
@RequestMapping(value = "user")
public class UserController {

    @RequestMapping(value="/userLogin",method = RequestMethod.GET)
    public void userLogin(HttpServletRequest request,String schoolUUID,String schoolId){
        request.getSession().setAttribute("schoolUUID",schoolUUID);
        request.getSession().setAttribute("schoolId",schoolId);
    }
}
