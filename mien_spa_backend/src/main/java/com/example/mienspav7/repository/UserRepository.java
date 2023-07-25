package com.example.mienspav7.repository;


import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.mienspav7.model.Users;



@Repository
public interface UserRepository extends JpaRepository<Users, String>{
	@Query(value = "SELECT COUNT(us_Id) FROM users WHERE DATE(created_at) = ?", nativeQuery = true)
	Integer countUserByDate(LocalDate date);
	
	@Query(value = "SELECT * FROM users WHERE us_EmailNo = ?", nativeQuery = true)
	Users getUserByEmail(String email);
	
}
