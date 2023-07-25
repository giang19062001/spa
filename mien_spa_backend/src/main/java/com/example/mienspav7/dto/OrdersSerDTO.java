package com.example.mienspav7.dto;

import java.util.List;

public class OrdersSerDTO extends AbstractDTO<OrdersSerDTO>{
	private String orSerId;
	private String orSerUserId ;
	private String orSerPhoneNo;
	private String orSerStatus;
	private String orSerStartTime;
	private String orSerEndTime;
	private Integer orSer_Total;
	private List<String> listSerId;
	
	public OrdersSerDTO() {
		super();
	}

	public OrdersSerDTO(String orSerId, String orSerUserId, String orSerPhoneNo, String orSerStatus,
			String orSerStartTime, String orSerEndTime, Integer orSer_Total, List<String> listSerId) {
		super();
		this.orSerId = orSerId;
		this.orSerUserId = orSerUserId;
		this.orSerPhoneNo = orSerPhoneNo;
		this.orSerStatus = orSerStatus;
		this.orSerStartTime = orSerStartTime;
		this.orSerEndTime = orSerEndTime;
		this.orSer_Total = orSer_Total;
		this.listSerId = listSerId;
	}

	public String getOrSerId() {
		return orSerId;
	}

	public void setOrSerId(String orSerId) {
		this.orSerId = orSerId;
	}

	public String getOrSerUserId() {
		return orSerUserId;
	}

	public void setOrSerUserId(String orSerUserId) {
		this.orSerUserId = orSerUserId;
	}

	public String getOrSerPhoneNo() {
		return orSerPhoneNo;
	}

	public void setOrSerPhoneNo(String orSerPhoneNo) {
		this.orSerPhoneNo = orSerPhoneNo;
	}

	public String getOrSerStatus() {
		return orSerStatus;
	}

	public void setOrSerStatus(String orSerStatus) {
		this.orSerStatus = orSerStatus;
	}

	public String getOrSerStartTime() {
		return orSerStartTime;
	}

	public void setOrSerStartTime(String orSerStartTime) {
		this.orSerStartTime = orSerStartTime;
	}

	public String getOrSerEndTime() {
		return orSerEndTime;
	}

	public void setOrSerEndTime(String orSerEndTime) {
		this.orSerEndTime = orSerEndTime;
	}

	public Integer getOrSer_Total() {
		return orSer_Total;
	}

	public void setOrSer_Total(Integer orSer_Total) {
		this.orSer_Total = orSer_Total;
	}

	public List<String> getListSerId() {
		return listSerId;
	}

	public void setListSerId(List<String> listSerId) {
		this.listSerId = listSerId;
	}
}
