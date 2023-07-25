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

import com.example.mienspav7.dto.OrdersSerDTO;
import com.example.mienspav7.model.OrderSerDetail;
import com.example.mienspav7.model.OrdersSer;
import com.example.mienspav7.model.Serce;
import com.example.mienspav7.service.OrderSerDetailService;
import com.example.mienspav7.service.OrderSerService;
import com.example.mienspav7.service.SerceService;
import com.example.mienspav7.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class OrderSerController {

	@Autowired
	private OrderSerService service;

	@Autowired
	private OrderSerDetailService OrSerDeSer;

	@Autowired
	private SerceService SerSer;

	@Autowired
	private UserService UseSer;

	@Autowired
	private ModelMapper modelMapper;

	HttpHeaders responseHeaders = new HttpHeaders();

	@GetMapping(value = "/OrdersSer")
	@PreAuthorize("hasRole('USER') or hasRole('ORDER_SERVICE') or hasRole('ADMIN')")
	public ResponseEntity<List<OrdersSerDTO>> getAll() {
		try {
			List<OrdersSer> entityList = service.getAll();
			List<OrdersSerDTO> dtos = entityList.stream().map(user -> modelMapper.map(user, OrdersSerDTO.class))
					.collect(Collectors.toList());

			for (OrdersSer entity : entityList) {
				List<String> listDetails = new ArrayList<>();
				for (OrdersSerDTO dto : dtos) {
					if (dto.getOrSerId().equals(entity.getOrSerId())) {
						if (entity.getUsers() != null) {
							dto.setOrSerUserId(entity.getUsers().getUsId());			
						} else {
							dto.setOrSerUserId(null);
						}
						for (OrderSerDetail order : entity.getOrderserdetails()) {
							listDetails.add(order.getSerce().getSeId().toString());
						}
						dto.setOrSer_Total(entity.getOrSerTotal());
						dto.setListSerId(listDetails);
					}
				}
			}
			return new ResponseEntity<>(dtos, responseHeaders, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(null, responseHeaders, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@GetMapping(value = "/OrdersSer/User/{userId}")
	@PreAuthorize("hasRole('USER') or hasRole('ORDER_SERVICE') or hasRole('ADMIN')")
	public ResponseEntity<List<OrdersSerDTO>> getAllByUserId(@PathVariable("userId") String userId) {
		try {
			List<OrdersSer> entityList = service.getAllByUserId(userId);
			List<OrdersSerDTO> dtos = entityList.stream().map(user -> modelMapper.map(user, OrdersSerDTO.class))
					.collect(Collectors.toList());

			for (OrdersSer entity : entityList) {
				List<String> listDetails = new ArrayList<>();
				for (OrdersSerDTO dto : dtos) {
					if (dto.getOrSerId().equals(entity.getOrSerId())) {
						if(entity.getUsers() != null) {
							dto.setOrSerUserId(entity.getUsers().getUsId());
						}else {
							dto.setOrSerUserId(null);
						}				
						for (OrderSerDetail order : entity.getOrderserdetails()) {
							listDetails.add(order.getSerce().getSeId().toString());
						}
						dto.setOrSer_Total(entity.getOrSerTotal());
						dto.setListSerId(listDetails);			
					}
				}
			}
			return new ResponseEntity<>(dtos, responseHeaders, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(null, responseHeaders, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@GetMapping(value = "/OrdersSer/UpdateDate/{date}")
	@PreAuthorize("hasRole('USER') or hasRole('ORDER_SERVICE') or hasRole('ADMIN')")
	public ResponseEntity<List<OrdersSerDTO>> getAllByUpdateDate(@PathVariable("date") String date) {
		try {
			List<OrdersSer> entityList = service.getAllByUpdateDate(date);
			List<OrdersSerDTO> dtos = entityList.stream().map(user -> modelMapper.map(user, OrdersSerDTO.class))
					.collect(Collectors.toList());

			for (OrdersSer entity : entityList) {
				List<String> listDetails = new ArrayList<>();
				for (OrdersSerDTO dto : dtos) {
					if (dto.getOrSerId().equals(entity.getOrSerId())) {
						if (entity.getUsers() != null) {
							dto.setOrSerUserId(entity.getUsers().getUsId());
							for (OrderSerDetail order : entity.getOrderserdetails()) {
								listDetails.add(order.getSerce().getSeId().toString());
							}
							dto.setListSerId(listDetails);
						} else {
							dto.setOrSerUserId(null);
						}
						dto.setOrSer_Total(entity.getOrSerTotal());

					}
				}
			}
			return new ResponseEntity<>(dtos, responseHeaders, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(null, responseHeaders, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@GetMapping(value = "/OrdersSer/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ORDER_SERVICE') or hasRole('ADMIN')")
	public ResponseEntity<OrdersSerDTO> getById(@PathVariable("id") String id) {
		try {
			OrdersSer entity = service.getById(id);
			List<String> listDetails = new ArrayList<>();
			if (service.getById(id) != null) {
				OrdersSerDTO dto = modelMapper.map(entity, OrdersSerDTO.class);
				if(entity.getUsers() != null) {
					dto.setOrSerUserId(entity.getUsers().getUsId());
				}else {
					dto.setOrSerUserId(null);
				}
				for (OrderSerDetail order : entity.getOrderserdetails()) {
					listDetails.add(order.getSerce().getSeId().toString());
				}
				dto.setListSerId(listDetails);
				dto.setOrSer_Total(entity.getOrSerTotal());
				return new ResponseEntity<>(dto, responseHeaders, HttpStatus.OK);
			}
			return new ResponseEntity<>(null, responseHeaders, HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(null, responseHeaders, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	
	@PostMapping(value = "/OrdersSer")
	public ResponseEntity<OrdersSerDTO> create(@RequestBody OrdersSerDTO dto) {
		try {
			OrdersSer entityRequest = modelMapper.map(dto, OrdersSer.class);
			entityRequest.setOrSerId(idOrSerIentity());
			entityRequest.setUsers(UseSer.getById(dto.getOrSerUserId()));
			OrdersSer entity = service.save(entityRequest);
			for (String serId : dto.getListSerId()) {
				if(!serId.isEmpty()) {
					if(SerSer.getById(serId)!= null) {
						Serce ser = SerSer.getById(serId);
						OrderSerDetail orderSerDetail = new OrderSerDetail(ser,entity);
						OrSerDeSer.save(orderSerDetail);
					}
				}
			}			
			OrdersSerDTO dtoReponse = modelMapper.map(entity, OrdersSerDTO.class);
			if(entity.getUsers() != null) {
				dtoReponse.setOrSerUserId(entity.getUsers().getUsId());

			}else {
				dtoReponse.setOrSerUserId(null);

			}
			return new ResponseEntity<>(dtoReponse, responseHeaders, HttpStatus.CREATED);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(null, responseHeaders, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@PutMapping(value = "/OrdersSer/{id}")
	@PreAuthorize("hasRole('MODERATOR') and hasRole('ORDER_SERVICE') or hasRole('ADMIN') or hasRole('USER')")
	public ResponseEntity<OrdersSerDTO> update(@PathVariable("id") String id, @RequestBody OrdersSerDTO dto) {
		try {
			System.out.print(id);
			if (service.getById(id) != null) {
				OrdersSer entityRequest = modelMapper.map(dto, OrdersSer.class);
				if(dto.getOrSerUserId() != null) {
					entityRequest.setUsers(UseSer.getById(dto.getOrSerUserId()));
				}	
				entityRequest.setOrSerId(id);
				OrdersSer entity = service.save(entityRequest);
				OrdersSerDTO dtoReponse = modelMapper.map(entity, OrdersSerDTO.class);
				if(dto.getOrSerUserId() != null) {
					dtoReponse.setOrSerUserId(entity.getUsers().getUsId());
				}		
				return new ResponseEntity<>(dtoReponse, responseHeaders, HttpStatus.OK);
			}
			return new ResponseEntity<>(null, responseHeaders, HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(null, responseHeaders, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@DeleteMapping(value = "/OrdersSerArray")
	@PreAuthorize("hasRole('MODERATOR') and hasRole('ORDER_SERVICE') or hasRole('ADMIN')")
	public ResponseEntity<Boolean> deleteArrayOrdersSer(@RequestBody String[] id) {
		try {
			for (String orSerId : id) {
				if (service.getById(orSerId) != null) {
					OrdersSer entity = service.getById(orSerId);
					for (OrderSerDetail item : entity.getOrderserdetails()) {
						OrSerDeSer.delete(item);
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

	@DeleteMapping(value = "/OrdersSer")
	@PreAuthorize("hasRole('MODERATOR') and hasRole('ORDER_SERVICE') or hasRole('ADMIN')")
	public ResponseEntity<Boolean> deleteOrdersSer(@RequestBody String id) {
		try {
			OrdersSer entity = service.getById(id);
			if (service.getById(id) != null) {
				for (OrderSerDetail item : entity.getOrderserdetails()) {
					OrSerDeSer.delete(item);
				}
				service.delete(entity);
				return new ResponseEntity<>(true, responseHeaders, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(false, responseHeaders, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(null, responseHeaders, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	public String idOrSerIentity() {
		LocalDate today = LocalDate.now();
		int numberUser = service.getCountOrSerByDate(today);
		int year = (today.getYear() % 100);
		String number = String.valueOf(numberUser);
		String id = null;
		switch (number.length()) {
		case 1:
			if (numberUser != 9) {
				id = "ORSER" + today.getDayOfMonth() + "" + today.getMonthValue() + "" + year + "000" + (numberUser + 1);
			} else {
				id = "ORSER" + today.getDayOfMonth() + "" + today.getMonthValue() + "" + year + "00" + (numberUser + 1);
			}
			break;
		case 2:
			if (numberUser != 99) {
				id = "ORSER" + today.getDayOfMonth() + "" + today.getMonthValue() + "" + year + "00" + (numberUser + 1);
			} else {
				id = "ORSER" + today.getDayOfMonth() + "" + today.getMonthValue() + "" + year + "0" + (numberUser + 1);
			}
			break;
		case 3:
			if (numberUser != 999) {
				id = "ORSER" + today.getDayOfMonth() + "" + today.getMonthValue() + "" + year + "0" + (numberUser + 1);
			} else {
				id = "ORSER" + today.getDayOfMonth() + "" + today.getMonthValue() + "" + year + "" + (numberUser + 1);
			}
			break;
		case 4:
			id = "ORSER" + today.getDayOfMonth() + "" + today.getMonthValue() + "" + year + "" + (numberUser + 1);
			break;
		default:
			System.out.print("Id error");
			break;
		}
		return id;
	}
}
