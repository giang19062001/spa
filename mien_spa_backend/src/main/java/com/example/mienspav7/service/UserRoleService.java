package com.example.mienspav7.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.mienspav7.model.UserRole;
import com.example.mienspav7.repository.UserRoleRepository;

@Service
public class UserRoleService {
	@Autowired
	private UserRoleRepository repository;
	
	public UserRole save(UserRole UserRole) {
		return repository.save(UserRole);
	}
	
	public List<UserRole> getAllByUserId(String id) {
		return repository.findAllByUserId(id);
	}

	public void delete(UserRole UserRole) {
		repository.delete(UserRole);
	}
	

}
