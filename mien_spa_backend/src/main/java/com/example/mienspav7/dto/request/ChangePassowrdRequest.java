package com.example.mienspav7.dto.request;

public class ChangePassowrdRequest {
	private String UserId;
	private String OldPassword;
	private String NewPassword;
 
	
	
	public ChangePassowrdRequest() {
		super();
	}
	public ChangePassowrdRequest(String userId, String oldPassword, String newPassword) {
		super();
		UserId = userId;
		OldPassword = oldPassword;
		NewPassword = newPassword;
	}
	public String getUserId() {
		return UserId;
	}
	public void setUserId(String userId) {
		UserId = userId;
	}
	public String getOldPassword() {
		return OldPassword;
	}
	public void setOldPassword(String oldPassword) {
		OldPassword = oldPassword;
	}
	public String getNewPassword() {
		return NewPassword;
	}
	public void setNewPassword(String newPassword) {
		NewPassword = newPassword;
	}
	
	
}
