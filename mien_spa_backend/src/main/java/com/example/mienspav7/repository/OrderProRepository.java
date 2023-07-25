package com.example.mienspav7.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.mienspav7.model.OrdersPro;

@Repository
public interface OrderProRepository extends JpaRepository<OrdersPro, String>{
	@Query(value = "SELECT * FROM orderspro WHERE orPro_UserId  = ?", nativeQuery = true)
	List<OrdersPro> findAllByUserId(String id);
	@Query(value = "SELECT COUNT(orPro_id) FROM orderspro WHERE DATE(created_at) = ?", nativeQuery = true)
	Integer countOrProByDate(LocalDate date);
	@Query(value = "SELECT * FROM orderspro WHERE updated_at LIKE ? and orPro_Status = 'Giao hàng thành công'", nativeQuery = true)
	List<OrdersPro> findAllByUpdateDay(String date);
}
