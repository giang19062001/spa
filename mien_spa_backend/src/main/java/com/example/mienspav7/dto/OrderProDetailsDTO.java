package com.example.mienspav7.dto;



public class OrderProDetailsDTO {
	private Integer ordProId;
	private String ordProOrderId;
	private String ordProProductId;
	private Integer ordProQuantity;
	
	public OrderProDetailsDTO() {
		super();
	}
	public OrderProDetailsDTO(Integer ordProId, String ordProOrderId, String ordProProductId) {
		super();
		this.ordProId = ordProId;
		this.ordProOrderId = ordProOrderId;
		this.ordProProductId = ordProProductId;
	}
	public Integer getOrdProId() {
		return ordProId;
	}
	public void setOrdProId(Integer ordProId) {
		this.ordProId = ordProId;
	}
	public String getOrdProOrderId() {
		return ordProOrderId;
	}
	public void setOrdProOrderId(String ordProOrderId) {
		this.ordProOrderId = ordProOrderId;
	}
	public String getOrdProProductId() {
		return ordProProductId;
	}
	public void setOrdProProductId(String ordProProductId) {
		this.ordProProductId = ordProProductId;
	}
	public Integer getOrdProQuantity() {
		return ordProQuantity;
	}
	public void setOrdProQuantity(Integer ordProQuantity) {
		this.ordProQuantity = ordProQuantity;
	}
	
	
	
}
