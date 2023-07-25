package com.example.mienspav7.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.mienspav7.model.Product;
import com.example.mienspav7.repository.ProductRepository;

@Service
public class ProductService {
	@Autowired
	private ProductRepository repository;
	
	public Product save(Product Product) {
		return repository.save(Product);
	}
	public String getIdLast() {
		return repository.getLastIdProduct();
	}
	
	public List<Product> getAll() {
		return repository.findAll();
	}
	public Integer getCountProByDate(LocalDate date) {
		return repository.countProByDate(date);
	}
	public Product getById(String id) {
		return repository.findById(id).orElse(null);
	}
	public void deleteArray(String[] id) {
		for (String item : id) {
			repository.delete(repository.findById(item).orElse(null));
		}
	}

	public void delete(Product product) {
		repository.delete(product);
	}
}
