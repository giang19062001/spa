package com.example.mienspav7.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.mienspav7.model.OrdersSer;
import com.example.mienspav7.repository.OrderSerRepository;

@Service
public class OrderSerService {
	@Autowired
	private OrderSerRepository repository;
	
	public OrdersSer save(OrdersSer OrdersSer) {
		return repository.save(OrdersSer);
	}
	public Integer getCountOrSerByDate(LocalDate date) {
		return repository.countOrSerByDate(date);
	}
	public List<OrdersSer> getAll() {
		return repository.findAll();
	}

	public List<OrdersSer> getAllByUserId(String id) {
		return repository.findAllByUserId(id);
	}
	
	public List<OrdersSer> getAllByUpdateDate(String date) {
		return repository.findAllByUpdateDay(date+"%");
	}
	
	public OrdersSer getById(String id) {
		return repository.findById(id).orElse(null);
	}
	public void deleteArray(String[] id) {
		for (String item : id) {
			repository.delete(repository.findById(item).orElse(null));
		}
	}


	public void delete(OrdersSer ordersSer) {
		repository.delete(ordersSer);
	}
	

}
