package com.starscube;

import com.starscube.basedata.dao.DictDao;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

/**
 * Unit test for simple BaseDataApplication.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
@WebAppConfiguration
public class AppTest {
    @Autowired
    private DictDao schoolStageSubjectRepository;

    @Test
    public void test() {
        /*System.out.println(schoolStageSubjectRepository.findDatas(2, 1).size());
        schoolStageSubjectRepository.findDatas(2, 1).forEach(item -> System.out.println(item.getTitle()));*/
    }
}
