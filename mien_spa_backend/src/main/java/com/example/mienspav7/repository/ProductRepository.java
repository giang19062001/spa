package com.example.mienspav7.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.mienspav7.model.Product;



@Repository
public interface ProductRepository extends JpaRepository<Product, String>{
	@Query(value = "SELECT pro_id FROM product ORDER BY pro_id DESC LIMIT 1", nativeQuery = true)
	String getLastIdProduct();
	@Query(value = "SELECT COUNT(pro_id) FROM product WHERE DATE(created_at) = ?", nativeQuery = true)
	Integer countProByDate(LocalDate date);
}
