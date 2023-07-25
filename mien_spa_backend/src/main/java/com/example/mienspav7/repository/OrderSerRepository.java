package com.example.mienspav7.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.mienspav7.model.OrdersSer;


@Repository
public interface OrderSerRepository extends JpaRepository<OrdersSer, String>{
	@Query(value = "SELECT * FROM ordersser WHERE orSer_UserId  = ?", nativeQuery = true)
	List<OrdersSer> findAllByUserId(String id);
	@Query(value = "SELECT COUNT(orSer_id) FROM ordersser WHERE DATE(created_at) LIKE ?", nativeQuery = true)
	Integer countOrSerByDate(LocalDate date);
	@Query(value = "SELECT * FROM ordersser WHERE updated_at LIKE ? and orSer_Status = 'Đã hoàn thành'", nativeQuery = true)
	List<OrdersSer> findAllByUpdateDay(String date);
}
