package com.example.mienspav7.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.mienspav7.model.OrderSerDetail;

@Repository
public interface OrderSerDetailsRepository extends JpaRepository<OrderSerDetail, Integer>{
	@Query(value = "SELECT * FROM orderserdetail WHERE ordSer_OrderId = ?", nativeQuery = true)
	List<OrderSerDetail> findAllByOrSerId(String id);
}
