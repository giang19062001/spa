
package com.example.mienspav7.controller;

import java.io.File;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.mindrot.jbcrypt.BCrypt;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.mienspav7.dto.UsersDTO;
import com.example.mienspav7.dto.request.ChangePassowrdRequest;
import com.example.mienspav7.model.UserRole;
import com.example.mienspav7.model.Users;
import com.example.mienspav7.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.swagger.annotations.ApiParam;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class UserController {
	
	@Autowired
	private UserService service;
	
	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	PasswordEncoder encoder;
	
	HttpHeaders responseHeaders = new HttpHeaders();
	ObjectMapper mapper = new ObjectMapper();
	
	@GetMapping(value = "/Users")
	@PreAuthorize("hasRole('ACCOUNT') or hasRole('ADMIN')")
	public ResponseEntity<List<UsersDTO>> getAll(){
		try {
			List<Users> entityList = service.getAll();
			List<UsersDTO> dtos = entityList.stream().map(user -> modelMapper.map(user, UsersDTO.class))
					.collect(Collectors.toList());

			for (Users entity : entityList) {
				List<String> listRole = new ArrayList<>();
				for (UsersDTO dto : dtos) {
					if (dto.getUsId().equals(entity.getUsId())) {
						for(UserRole role : entity.getUserRoles()) {
							listRole.add(role.getRole().getRoName());
						}
						dto.setListRole(listRole);
					}
				}
			}
			return new ResponseEntity<>(
					dtos, 
					responseHeaders,
					HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(null, responseHeaders, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	
	@GetMapping(value = "/Users/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ACCOUNT') or hasRole('ADMIN')")
	public ResponseEntity<UsersDTO> getUserById(@PathVariable("id") String id){
		try {
			List<String> listRole = new ArrayList<>();
			Users entity = service.getById(id);
			for(UserRole role : entity.getUserRoles()) {
				listRole.add(role.getRole().getRoName());
			}	
			UsersDTO dto = modelMapper.map(entity, UsersDTO.class);
			dto.setListRole(listRole);
			return new ResponseEntity<>(dto, responseHeaders, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(null, responseHeaders, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	
	@PostMapping(value = "/Users")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') and hasRole('ACCOUNT') or hasRole('ADMIN')")
	public ResponseEntity<UsersDTO> create(@RequestBody UsersDTO dto) {
		try {
			String hash = BCrypt.hashpw(dto.getUsPassword(), BCrypt.gensalt(12));
			dto.setUsPassword(hash);
	        Users entityResquest = modelMapper.map(dto, Users.class);
	        Users entity = service.save(entityResquest);
	        UsersDTO dtoReponse = modelMapper.map(entity, UsersDTO.class);
			return new ResponseEntity<>(dtoReponse, responseHeaders, HttpStatus.CREATED);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(null, responseHeaders, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@PutMapping(value = "/Users")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') and hasRole('ACCOUNT') or hasRole('ADMIN') or hasRole('USER')")
	public ResponseEntity<UsersDTO> update(@RequestPart(name ="data_json",required = false) String json,
			@RequestPart(required = false) @ApiParam(required = true, value = "") MultipartFile file) {
		try {
			UsersDTO dto = mapper.readValue(json, UsersDTO.class);
			if (service.getById(dto.getUsId()) != null) {		       
				if (file == null) {
					if(dto.getUsPassword() == null) {
						Users entityOld = service.getById(dto.getUsId());
						dto.setUsPassword(entityOld.getUsPassword());
					}else {
						dto.setUsPassword(encoder.encode(dto.getUsPassword()));
					}
					Users entityRequest = modelMapper.map(dto, Users.class);
					Users entity = service.save(entityRequest);
				    UsersDTO dtoReponse = modelMapper.map(entity, UsersDTO.class);
					return new ResponseEntity<>(dtoReponse, responseHeaders, HttpStatus.ACCEPTED);
				} else {				
					//delete old image
					if(dto.getUsImage() != null) {
						File directoryToDelete = new File("Images/Users/"+dto.getUsId());
						FileSystemUtils.deleteRecursively(directoryToDelete);
					}
					if(dto.getUsPassword() == null) {
						Users entityOld = service.getById(dto.getUsId());
						dto.setUsPassword(entityOld.getUsPassword());
					}else {
						dto.setUsPassword(encoder.encode(dto.getUsPassword()));
					}
					Users entityRequest = modelMapper.map(dto, Users.class);
					File folder=new File("Images/Users/"+entityRequest.getUsId());
					folder.mkdirs();
					Path path = Paths.get(folder.getPath());
					InputStream inputStream = file.getInputStream();
					Files.copy(inputStream, path.resolve(file.getOriginalFilename()), StandardCopyOption.REPLACE_EXISTING);
					entityRequest.setUsImage(entityRequest.getUsId()+"/"+file.getOriginalFilename().toLowerCase());
					Users entity = service.save(entityRequest);
					UsersDTO dtoReponse = modelMapper.map(entity, UsersDTO.class);
					return new ResponseEntity<>(dtoReponse, responseHeaders, HttpStatus.ACCEPTED);

				}
			}
			return  new ResponseEntity<>(null, responseHeaders, HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(null, responseHeaders, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@PutMapping(value = "/UserChangePassword")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> changeUserPassword(@RequestBody ChangePassowrdRequest changePass) {
		try {
			System.out.print(changePass);
			if (service.getById(changePass.getUserId()) != null) {
				Users entity = service.getById(changePass.getUserId());
				 PasswordEncoder passencoder = new BCryptPasswordEncoder();
				 boolean chekPass = passencoder.matches(changePass.getOldPassword(),entity.getUsPassword());
				 if(chekPass) {
					 if(changePass.getOldPassword().equals(changePass.getNewPassword())) {
						 return new ResponseEntity<>(false, responseHeaders, HttpStatus.OK);
					 }else {
						 String hash = BCrypt.hashpw(changePass.getNewPassword(), BCrypt.gensalt(12));
						 entity.setUsPassword(hash);
						 service.save(entity);
						 return new ResponseEntity<>(true, responseHeaders, HttpStatus.OK);
					 }
					
				 }else {
					 return  new ResponseEntity<>("Failed", responseHeaders, HttpStatus.NOT_FOUND);
				 }		
			}
			return  new ResponseEntity<>("Failed", responseHeaders, HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>("Failed", responseHeaders, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@DeleteMapping(value = "/UsersArray")
	@PreAuthorize("hasRole('MODERATOR') and hasRole('ACCOUNT') or hasRole('ADMIN')")
	public void deleteArrayUsers(@RequestBody String[] id) {
		service.deleteArray(id);
	}
	
	@DeleteMapping(value = "/Users")
	@PreAuthorize("hasRole('MODERATOR') and hasRole('ACCOUNT') or hasRole('ADMIN')")
	public ResponseEntity<Boolean> deleteUsers(@RequestBody String id) {
		try {
			Users entity = service.getById(id);
			if (service.getById(id) != null) {
				if(entity.getUsImage() != null) {
					File directoryToDelete = new File("Images/Users/"+entity.getUsImage());
					FileSystemUtils.deleteRecursively(directoryToDelete);
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
}
