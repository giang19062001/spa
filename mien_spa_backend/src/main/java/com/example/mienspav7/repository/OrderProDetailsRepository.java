package com.example.mienspav7.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.mienspav7.model.OrdersProDetail;




@Repository
public interface OrderProDetailsRepository extends JpaRepository<OrdersProDetail, Integer>{
	@Query(value = "SELECT * FROM ordersprodetail WHERE ordPro_OrderId = ?", nativeQuery = true)
	List<OrdersProDetail> findAllByOrProId(String id);
}
