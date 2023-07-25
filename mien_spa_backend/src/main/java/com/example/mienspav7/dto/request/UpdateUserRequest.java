package com.example.mienspav7.dto.request;

import org.springframework.web.multipart.MultipartFile;

public class UpdateUserRequest {
	private String json;
	private MultipartFile file;
	
	
	public UpdateUserRequest() {
		super();
	}


	public UpdateUserRequest(String json, MultipartFile file) {
		super();
		this.json = json;
		this.file = file;
	}


	public String getJson() {
		return json;
	}


	public void setJson(String json) {
		this.json = json;
	}


	public MultipartFile getFile() {
		return file;
	}


	public void setFile(MultipartFile file) {
		this.file = file;
	}
	
	
	
}
