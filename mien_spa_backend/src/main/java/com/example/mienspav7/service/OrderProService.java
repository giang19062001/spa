package com.example.mienspav7.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.mienspav7.model.OrdersPro;
import com.example.mienspav7.repository.OrderProRepository;


@Service
public class OrderProService {
	@Autowired
	private OrderProRepository repository;
	
	public OrdersPro save(OrdersPro OrdersPro) {
		return repository.save(OrdersPro);
	}
	
	public List<OrdersPro> getAll() {
		return repository.findAll();
	}
	public Integer getCountOrProByDate(LocalDate date) {
		return repository.countOrProByDate(date);
	}
	public List<OrdersPro> getAllByUserId(String id) {
		return repository.findAllByUserId(id);
	}
	
	public List<OrdersPro> getAllByUpdateDate(String date) {
		return repository.findAllByUpdateDay(date+"%");
	}
	
	public OrdersPro getById(String id) {
		return repository.findById(id).orElse(null);
	}


	public void delete(OrdersPro ordersPro) {
		repository.delete(ordersPro);
	}
	

}
