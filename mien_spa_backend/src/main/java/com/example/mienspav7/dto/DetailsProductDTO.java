package com.example.mienspav7.dto;

public class DetailsProductDTO {
	private String ProductId;
	private Integer ordProQuantity;
	
	public DetailsProductDTO() {
	}

	public DetailsProductDTO(String productId, Integer ordProQuantity) {
		super();
		ProductId = productId;
		this.ordProQuantity = ordProQuantity;
	}

	public String getProductId() {
		return ProductId;
	}

	public void setProductId(String productId) {
		ProductId = productId;
	}

	public Integer getOrdProQuantity() {
		return ordProQuantity;
	}

	public void setOrdProQuantity(Integer ordProQuantity) {
		this.ordProQuantity = ordProQuantity;
	}
	
}
