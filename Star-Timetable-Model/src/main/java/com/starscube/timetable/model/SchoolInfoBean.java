package com.starscube.timetable.model;

/**
 * 学校设备信息实体
 * @author 李亚涛
 */
public class SchoolInfoBean {
	
	public int schoolId;				//学校ID
	public String schoolUUID;//学校UUID
	public String districtCode;//地区编码
	public String schoolName;//学校名
	public String districtName;//地区名
	public String provinceName;//省名
	public String provinceCode;//省编码
	public String cityName;//城市名
	public String cityCode;//城市编码
	public String addDateTime;//新增时间
	public String lastEditDateTime;//最后一次修改时间
	
	
	public String getAddDateTime() {
		return addDateTime;
	}
	public void setAddDateTime(String addDateTime) {
		this.addDateTime = addDateTime;
	}
	public String getLastEditDateTime() {
		return lastEditDateTime;
	}
	public void setLastEditDateTime(String lastEditDateTime) {
		this.lastEditDateTime = lastEditDateTime;
	}
	public String getSchoolUUID() {
		return schoolUUID;
	}
	public void setSchoolUUID(String schoolUUID) {
		this.schoolUUID = schoolUUID;
	}
	public int getSchoolId() {
		return schoolId;
	}
	public void setSchoolId(int schoolId) {
		this.schoolId = schoolId;
	}
	public String getDistrictCode() {
		return districtCode;
	}
	public void setDistrictCode(String districtCode) {
		this.districtCode = districtCode;
	}
	public String getSchoolName() {
		return schoolName;
	}
	public void setSchoolName(String schoolName) {
		this.schoolName = schoolName;
	}
	public String getDistrictName() {
		return districtName;
	}
	public void setDistrictName(String districtName) {
		this.districtName = districtName;
	}
	public String getProvinceName() {
		return provinceName;
	}
	public void setProvinceName(String provinceName) {
		this.provinceName = provinceName;
	}
	public String getProvinceCode() {
		return provinceCode;
	}
	public void setProvinceCode(String provinceCode) {
		this.provinceCode = provinceCode;
	}
	public String getCityName() {
		return cityName;
	}
	public void setCityName(String cityName) {
		this.cityName = cityName;
	}
	public String getCityCode() {
		return cityCode;
	}
	public void setCityCode(String cityCode) {
		this.cityCode = cityCode;
	}
	public SchoolInfoBean() {
		super();
		// TODO Auto-generated constructor stub
	}
	public SchoolInfoBean(int schoolId, String districtCode, String schoolName,
						  String districtName, String provinceName, String provinceCode, String cityName,
						  String cityCode, String schoolUUID, String lastEditDateTime, String addDateTime) {
		super();
		this.schoolId = schoolId;
		this.districtCode = districtCode;
		this.schoolName = schoolName;
		this.districtName = districtName;
		this.provinceName = provinceName;
		this.provinceCode = provinceCode;
		this.cityName = cityName;
		this.cityCode = cityCode;
		this.schoolUUID=schoolUUID;
		this.lastEditDateTime=lastEditDateTime;
		this.addDateTime=addDateTime;
	}
	
}
