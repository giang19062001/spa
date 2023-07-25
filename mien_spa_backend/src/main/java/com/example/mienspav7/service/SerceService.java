package com.example.mienspav7.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.mienspav7.model.Serce;
import com.example.mienspav7.repository.SerceRepository;


@Service
public class SerceService {
	@Autowired
	private SerceRepository repository;
	
	public Serce save(Serce Serce) {
		return repository.save(Serce);
	}
	public String getIdLast() {
		return repository.getLastIdSerce();
	}
	
	public List<Serce> getAll() {
		return repository.findAll();
	}
	public Integer getCountSerByDate(LocalDate date) {
		return repository.countSerByDate(date);
	}
	public Serce getById(String id) {
		return repository.findById(id).orElse(null);
	}
	public void deleteArray(String[] id) {
		for (String item : id) {
			repository.delete(repository.findById(item).orElse(null));
		}
	}


	public void delete(Serce serce) {
		repository.delete(serce);
	}
	

}
