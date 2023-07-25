package com.example.mienspav7.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.mienspav7.model.Category;
import com.example.mienspav7.repository.CategoryRepository;



@Service
public class CategoryService {
	@Autowired
	private CategoryRepository repository;
	
	public Category save(Category Category) {
		return repository.save(Category);
	}
	
	public List<Category> getAll() {
		return repository.findAll();
	}

	public Category getById(Integer id) {
		return repository.findById(id).orElse(null);
	}
	public void deleteArray(Integer[] id) {
		for (Integer item : id) {
			repository.delete(repository.findById(item).orElse(null));
		}
	}


	public void delete(Category category) {
		repository.delete(category);
	}
	

}
