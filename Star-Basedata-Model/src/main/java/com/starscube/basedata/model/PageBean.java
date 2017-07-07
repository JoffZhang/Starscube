package com.starscube.basedata.model;

import java.util.ArrayList;
import java.util.List;

/**
 * @Author : ZhangYun
 * @Description :
 * @Date :  2017/6/13.
 */
public class PageBean<T> {
    private final static int DEFAULT_PAGE_SIZE = 10;
    private Integer pageIndex = 0;
    private Integer pageSize = DEFAULT_PAGE_SIZE;
    private Integer totalNum = 0;
    private Integer totalPages = 0;

    private List<T> list;

    public PageBean(){

    }

    public PageBean(Integer pageIndex, Integer pageSize, Integer totalNum) {
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;
        this.totalNum = totalNum;
        this.totalPages = totalNum%pageSize == 0 ?  totalNum/pageSize:totalNum/pageSize+1;
        this.list = new ArrayList<>();
    }

    public List<T> getList() {
        return list;
    }

    public void setList(List<T> list) {
        this.list = list;
    }

    public Integer getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(Integer totalPages) {
        this.totalPages = totalPages;
    }

    public Integer getTotalNum() {
        return totalNum;
    }

    public void setTotalNum(Integer totalNum) {
        this.totalNum = totalNum;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Integer getPageIndex() {
        return pageIndex;
    }

    public void setPageIndex(Integer pageIndex) {
        this.pageIndex = pageIndex;
    }
}
