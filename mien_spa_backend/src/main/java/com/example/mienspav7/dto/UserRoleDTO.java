package com.example.mienspav7.dto;

import java.util.Set;

public class UserRoleDTO extends AbstractDTO<UserRoleDTO>{
	private String usrUserId;
	private Set<String> listRole;
	
	
	public UserRoleDTO() {
	}

	public UserRoleDTO(String usrUserId, Set<String> listRole) {
		super();
		this.usrUserId = usrUserId;
		this.listRole = listRole;
	}


	public String getUsrUserId() {
		return usrUserId;
	}


	public void setUsrUserId(String usrUserId) {
		this.usrUserId = usrUserId;
	}


	public Set<String> getListRole() {
		return listRole;
	}


	public void setListRole(Set<String> listRole) {
		this.listRole = listRole;
	}

	
}
