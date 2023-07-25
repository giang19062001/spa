package com.example.mienspav7.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.mienspav7.dto.DetailsProductDTO;
import com.example.mienspav7.dto.OrderProDTO;
import com.example.mienspav7.model.OrdersPro;
import com.example.mienspav7.model.OrdersProDetail;
import com.example.mienspav7.model.Product;
import com.example.mienspav7.service.OrderProDetailService;
import com.example.mienspav7.service.OrderProService;
import com.example.mienspav7.service.ProductService;
import com.example.mienspav7.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class OrderProController {
	
	@Autowired
	private OrderProService service;
	
	@Autowired
	private OrderProDetailService DeProSer;
	
	@Autowired
	private ProductService ProSer;
	@Autowired
	private UserService UseSer;

	@Autowired
	private ModelMapper modelMapper;

	HttpHeaders responseHeaders = new HttpHeaders();
	
	@GetMapping(value = "/OrdersPro")
	@PreAuthorize("hasRole('USER') or hasRole('ORDER_PRODUCT') or hasRole('ADMIN')")
	public ResponseEntity<List<OrderProDTO>> getAll(){
		try {
			List<OrdersPro> entityList = service.getAll();
			List<OrderProDTO> dtos = entityList.stream().map(user -> modelMapper.map(user, OrderProDTO.class))
					.collect(Collectors.toList());

			for (OrdersPro entity : entityList) {
				for (OrderProDTO dto : dtos) {
					if (dto.getOrProId().equals(entity.getOrProId())) {
						if(entity.getUsers() != null) {
							dto.setOrProUserId(entity.getUsers().getUsId());

						}else {
							dto.setOrProUserId(null);

						}
					}
				}
			}
			return new ResponseEntity<>(dtos, responseHeaders, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(null, responseHeaders, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@GetMapping(value = "/OrdersPro/User/{userId}")
	@PreAuthorize("hasRole('USER') or hasRole('ORDER_PRODUCT') or hasRole('ADMIN')")
	public ResponseEntity<List<OrderProDTO>> getAllByUserId(@PathVariable("userId") String userId){
		try {
			List<OrdersPro> entityList = service.getAllByUserId(userId);
			List<OrderProDTO> dtos = entityList.stream().map(user -> modelMapper.map(user, OrderProDTO.class))
					.collect(Collectors.toList());

			for (OrdersPro entity : entityList) {
				List<DetailsProductDTO> listDetails = new ArrayList<>();
				for (OrderProDTO dto : dtos) {
					if (dto.getOrProId().equals(entity.getOrProId())) {
						if(entity.getUsers() != null) {
							dto.setOrProUserId(entity.getUsers().getUsId());

						}else {
							dto.setOrProUserId(null);

						}
						for (OrdersProDetail order : entity.getOrdersprodetails()) {
							DetailsProductDTO detail = new  DetailsProductDTO(order.getProduct().getProId(),order.getOrProQuantity());
							listDetails.add(detail);
						}
						dto.setOrProTotal(entity.getOrProTotal());
						dto.setListProId(listDetails);	
					}
				}
			}
			return new ResponseEntity<>(dtos, responseHeaders, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(null, responseHeaders, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@GetMapping(value = "/OrdersPro/UpdateDate/{date}")
	@PreAuthorize("hasRole('USER') or hasRole('ORDER_PRODUCT') or hasRole('ADMIN')")
	public ResponseEntity<List<OrderProDTO>> getAllByUpdateDate(@PathVariable("date") String date){
		try {
			List<OrdersPro> entityList = service.getAllByUpdateDate(date);
			List<OrderProDTO> dtos = entityList.stream().map(user -> modelMapper.map(user, OrderProDTO.class))
					.collect(Collectors.toList());

			for (OrdersPro entity : entityList) {
				for (OrderProDTO dto : dtos) {
					if (dto.getOrProId().equals(entity.getOrProId())) {
						if(entity.getUsers() != null) {
							dto.setOrProUserId(entity.getUsers().getUsId());

						}else {
							dto.setOrProUserId(null);
						}
					}
				}
			}
			return new ResponseEntity<>(dtos, responseHeaders, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(null, responseHeaders, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@GetMapping(value = "/OrdersPro/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ORDER_PRODUCT') or hasRole('ADMIN')")
	public ResponseEntity<OrderProDTO> getById(@PathVariable("id") String id){
		try {
			OrdersPro entity = service.getById(id);
			if (service.getById(id) != null) {
				OrderProDTO dto = modelMapper.map(entity, OrderProDTO.class);
				if(entity.getUsers() != null) {
					dto.setOrProUserId(entity.getUsers().getUsId());
				}else {
					dto.setOrProUserId(null);
				}
				return new ResponseEntity<>(dto, responseHeaders, HttpStatus.OK);
			}
			return new ResponseEntity<>(null, responseHeaders, HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(null, responseHeaders, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	@PostMapping(value = "/OrdersPro")
	public ResponseEntity<OrderProDTO> create(@RequestBody OrderProDTO dto) {
		try {
			OrdersPro entityRequest = modelMapper.map(dto, OrdersPro.class);
			entityRequest.setOrProId(idOrProIentity());
			if(dto.getOrProUserId() != null) {
				entityRequest.setUsers(UseSer.getById(dto.getOrProUserId()));
			}
			OrdersPro entity = service.save(entityRequest);
			for (DetailsProductDTO item : dto.getListProId()) {
				if(!item.getProductId().isEmpty() && item.getOrdProQuantity()!= 0) {
					if(ProSer.getById(item.getProductId())!= null) {
						Product product = ProSer.getById(item.getProductId());
						OrdersProDetail OrProDeEntity = new OrdersProDetail(entity,product,item.getOrdProQuantity());
						DeProSer.save(OrProDeEntity);
					}
				}
			}			
			OrderProDTO dtoReponse = modelMapper.map(entity, OrderProDTO.class);
			if(dto.getOrProUserId() != null) {
				dtoReponse.setOrProUserId(entity.getUsers().getUsId());
			}
			return new ResponseEntity<>(dtoReponse, responseHeaders, HttpStatus.CREATED);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(null, responseHeaders, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@PutMapping(value = "/OrdersPro/{id}")
	@PreAuthorize("hasRole('MODERATOR') and hasRole('ORDER_PRODUCT') or hasRole('ADMIN') or hasRole('USER')")
	public ResponseEntity<OrderProDTO> update(@PathVariable("id") String id, @RequestBody OrderProDTO dto) {
		try {
			if (service.getById(id) != null) {
				OrdersPro entityRequest = modelMapper.map(dto, OrdersPro.class);
				if(entityRequest.getOrProUserName().equals("") == false) {
					entityRequest.setUsers(UseSer.getById(dto.getOrProUserId()));
					entityRequest.setOrProId(id);
					OrdersPro entity = service.save(entityRequest);
					OrderProDTO dtoReponse = modelMapper.map(entity, OrderProDTO.class);
					dtoReponse.setOrProUserId(entity.getUsers().getUsId());
					return new ResponseEntity<>(dtoReponse, responseHeaders, HttpStatus.OK);
				}else {
					entityRequest.setOrProId(id);
					OrdersPro entity = service.save(entityRequest);
					OrderProDTO dtoReponse = modelMapper.map(entity, OrderProDTO.class);
					dtoReponse.setOrProUserId(null);
					return new ResponseEntity<>(dtoReponse, responseHeaders, HttpStatus.OK);
				}
			}
			return  new ResponseEntity<>(null, responseHeaders, HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(null, responseHeaders, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@DeleteMapping(value = "/OrdersProArray")
	@PreAuthorize("hasRole('MODERATOR') and hasRole('ORDER_PRODUCT') or hasRole('ADMIN')")
	public ResponseEntity<Boolean> deleteArrayOrdersPro(@RequestBody String[] id) {
		try {
			for (String orProId : id) {		
				if(service.getById(orProId) != null) {
					OrdersPro entity = service.getById(orProId);
					for (OrdersProDetail item : entity.getOrdersprodetails()) {
						DeProSer.delete(item);
					}
					service.delete(entity);
				}
			}		
			return new ResponseEntity<>(true, responseHeaders, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(null, responseHeaders, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@DeleteMapping(value = "/OrdersPro")
	@PreAuthorize("hasRole('MODERATOR') and hasRole('ORDER_PRODUCT') or hasRole('ADMIN')")
	public ResponseEntity<Boolean> deleteOrdersPro(@RequestBody String id) {
		try {
			OrdersPro entity = service.getById(id);
			if (service.getById(id) != null) {
				for (OrdersProDetail item : entity.getOrdersprodetails()) {
					DeProSer.delete(item);
				}
				service.delete(entity);			
				return new ResponseEntity<>(true, responseHeaders, HttpStatus.OK);
			}else {
				return  new ResponseEntity<>(false, responseHeaders, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(null, responseHeaders, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	public String idOrProIentity() {
		LocalDate today = LocalDate.now();
		int numberUser = service.getCountOrProByDate(today);
		int year = (today.getYear() % 100);
		String number = String.valueOf(numberUser);
		String id = null;
		switch (number.length()) {
		case 1:
			if (numberUser != 9) {
				id = "ORPRO" + today.getDayOfMonth() + "" + today.getMonthValue() + "" + year + "000" + (numberUser + 1);
			} else {
				id = "ORPRO" + today.getDayOfMonth() + "" + today.getMonthValue() + "" + year + "00" + (numberUser + 1);
			}
			break;
		case 2:
			if (numberUser != 99) {
				id = "ORPRO" + today.getDayOfMonth() + "" + today.getMonthValue() + "" + year + "00" + (numberUser + 1);
			} else {
				id = "ORPRO" + today.getDayOfMonth() + "" + today.getMonthValue() + "" + year + "0" + (numberUser + 1);
			}
			break;
		case 3:
			if (numberUser != 999) {
				id = "ORPRO" + today.getDayOfMonth() + "" + today.getMonthValue() + "" + year + "0" + (numberUser + 1);
			} else {
				id = "ORPRO" + today.getDayOfMonth() + "" + today.getMonthValue() + "" + year + "" + (numberUser + 1);
			}
			break;
		case 4:
			id = "ORPRO" + today.getDayOfMonth() + "" + today.getMonthValue() + "" + year + "" + (numberUser + 1);
			break;
		default:
			System.out.print("Id error");
			break;
		}
		return id;
	}
}
