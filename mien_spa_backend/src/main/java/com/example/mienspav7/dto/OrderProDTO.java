package com.example.mienspav7.dto;

import java.util.Collection;

public class OrderProDTO extends AbstractDTO<OrderProDTO>{
	private String orProId;
	private String orProUserId;
	private String orProUserName;
	private String orProDob;
	private String orProAddress;
	private String orProPhoneNo;
	private String orProPayStatus;
	private String orProPayment;
	private String orProStatus;
	private String orProNote;
	   private Integer orProTotal;
	    private Integer orProShip;
	
	private Collection<DetailsProductDTO> listPro;
	
	
	public OrderProDTO() {
	}

	public OrderProDTO(String orProId, String orProUserId, String orProUserName, String orProDob, String orProAddress,
			String orProPhoneNo, String orProPayStatus, String orProPayment, String orProStatus, String orProNote,Integer orProTotal,Integer orProShip) {
		super();
		this.orProId = orProId;
		this.orProUserId = orProUserId;
		this.orProUserName = orProUserName;
		this.orProDob = orProDob;
		this.orProAddress = orProAddress;
		this.orProPhoneNo = orProPhoneNo;
		this.orProPayStatus = orProPayStatus;
		this.orProPayment = orProPayment;
		this.orProStatus = orProStatus;
		this.orProNote = orProNote;
		this.orProTotal = orProTotal;
		this.orProShip = orProShip;
	}

	public Integer getOrProTotal() {
		return orProTotal;
	}

	public void setOrProTotal(Integer orProTotal) {
		this.orProTotal = orProTotal;
	}

	public Integer getOrProShip() {
		return orProShip;
	}

	public void setOrProShip(Integer orProShip) {
		this.orProShip = orProShip;
	}

	public String getOrProId() {
		return orProId;
	}

	public void setOrProId(String orProId) {
		this.orProId = orProId;
	}

	public String getOrProUserId() {
		return orProUserId;
	}

	public void setOrProUserId(String orProUserId) {
		this.orProUserId = orProUserId;
	}

	public String getOrProUserName() {
		return orProUserName;
	}

	public void setOrProUserName(String orProUserName) {
		this.orProUserName = orProUserName;
	}

	public String getOrProDob() {
		return orProDob;
	}

	public void setOrProDob(String orProDob) {
		this.orProDob = orProDob;
	}

	public String getOrProAddress() {
		return orProAddress;
	}

	public void setOrProAddress(String orProAddress) {
		this.orProAddress = orProAddress;
	}

	public String getOrProPhoneNo() {
		return orProPhoneNo;
	}

	public void setOrProPhoneNo(String orProPhoneNo) {
		this.orProPhoneNo = orProPhoneNo;
	}

	public String getOrProPayStatus() {
		return orProPayStatus;
	}

	public void setOrProPayStatus(String orProPayStatus) {
		this.orProPayStatus = orProPayStatus;
	}

	public String getOrProPayment() {
		return orProPayment;
	}

	public void setOrProPayment(String orProPayment) {
		this.orProPayment = orProPayment;
	}

	public String getOrProStatus() {
		return orProStatus;
	}

	public void setOrProStatus(String orProStatus) {
		this.orProStatus = orProStatus;
	}

	public String getOrProNote() {
		return orProNote;
	}

	public void setOrProNote(String orProNote) {
		this.orProNote = orProNote;
	}

	public Collection<DetailsProductDTO> getListProId() {
		return listPro;
	}

	public void setListProId(Collection<DetailsProductDTO> listProId) {
		this.listPro = listProId;
	}
}
