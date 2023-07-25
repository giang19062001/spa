package com.example.mienspav7.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.mienspav7.dto.UserRoleDTO;
import com.example.mienspav7.model.ERole;
import com.example.mienspav7.model.UserRole;
import com.example.mienspav7.model.Users;
import com.example.mienspav7.service.RoleService;
import com.example.mienspav7.service.UserRoleService;
import com.example.mienspav7.service.UserService;

@SuppressWarnings("unused")
@CrossOrigin
@RestController
@RequestMapping("/api")
public class UserRoleController {

	@Autowired
	private UserRoleService service;

	@Autowired
	private UserService UseSer;

	@Autowired
	private RoleService RolSer;

	@Autowired
	private ModelMapper modelMapper;

	HttpHeaders responseHeaders = new HttpHeaders();
	@PostMapping(value = "/UserRole")
	@PreAuthorize("hasRole('MODERATOR') and hasRole('ACCOUNT') or hasRole('ADMIN')")
	public ResponseEntity<?> create(@RequestBody UserRoleDTO dto) {
		try {
			if (UseSer.getById(dto.getUsrUserId()) != null && service.getAllByUserId(dto.getUsrUserId()) != null) {
				List<UserRole> entityRequest = service.getAllByUserId(dto.getUsrUserId());
				Users user = UseSer.getById(dto.getUsrUserId());
				for (UserRole userRole : entityRequest) {
					service.delete(userRole);
				}
				Set<String> strRoles = dto.getListRole();
				Set<UserRole> roles = new HashSet<>();
				if (strRoles == null) {
					user.setIsAdmin(false);
					UserRole userRole = new UserRole();
					userRole.setUsers(user);
					userRole.setRole(RolSer.getByName(ERole.ROLE_USER.toString()));
					roles.add(userRole);
				} else {
					strRoles.forEach(role -> {
						switch (role) {
						case "ROLE_USER":
							user.setIsAdmin(false);
							UserRole userRole = new UserRole();
							userRole.setUsers(user);
							userRole.setRole(RolSer.getByName(ERole.ROLE_USER.toString()));
							roles.add(userRole);
							break;
						case "ROLE_ADMIN":
							user.setIsAdmin(true);
							UserRole adminRole = new UserRole();
							adminRole.setUsers(user);
							adminRole.setRole(RolSer.getByName(ERole.ROLE_ADMIN.toString()));
							roles.add(adminRole);
							break;
						case "ROLE_MODERATOR":
							user.setIsAdmin(true);

							UserRole modRole = new UserRole();
							modRole.setUsers(user);
							modRole.setRole(RolSer.getByName(ERole.ROLE_MODERATOR.toString()));
							roles.add(modRole);
							break;
						case "ROLE_CATEGORY":
							UserRole cateRole = new UserRole();
							cateRole.setUsers(user);
							cateRole.setRole(RolSer.getByName(ERole.ROLE_CATEGORY.toString()));
							roles.add(cateRole);
							break;
						case "ROLE_ORDER_SERVICE":
							user.setIsAdmin(true);
							UserRole orSerRole = new UserRole();
							orSerRole.setUsers(user);
							orSerRole.setRole(RolSer.getByName(ERole.ROLE_ORDER_SERVICE.toString()));
							roles.add(orSerRole);
							break;
						case "ROLE_ORDER_PRODUCT":
							user.setIsAdmin(true);

							UserRole orProRole = new UserRole();
							orProRole.setUsers(user);
							orProRole.setRole(RolSer.getByName(ERole.ROLE_ORDER_PRODUCT.toString()));
							roles.add(orProRole);
							break;
						case "ROLE_PRODUCT":
							user.setIsAdmin(true);

							UserRole proRole = new UserRole();
							proRole.setUsers(user);
							proRole.setRole(RolSer.getByName(ERole.ROLE_PRODUCT.toString()));
							roles.add(proRole);
							break;
						case "ROLE_SERVICE":
							user.setIsAdmin(true);

							UserRole serRole = new UserRole();
							serRole.setUsers(user);
							serRole.setRole(RolSer.getByName(ERole.ROLE_SERVICE.toString()));
							roles.add(serRole);
							break;
						case "ROLE_SHOPINFOR":
							user.setIsAdmin(true);

							UserRole shopInforRole = new UserRole();
							shopInforRole.setUsers(user);
							shopInforRole.setRole(RolSer.getByName(ERole.ROLE_SHOPINFOR.toString()));
							roles.add(shopInforRole);
							break;
						case "ROLE_ACCOUNT":
							user.setIsAdmin(true);
							UserRole accRole = new UserRole();
							accRole.setUsers(user);
							accRole.setRole(RolSer.getByName(ERole.ROLE_ACCOUNT.toString()));
							roles.add(accRole);
							break;
						default:
							break;
						}
					});
				}
				for (UserRole userRole : roles) {
					service.save(userRole);
				}
				return new ResponseEntity<>("Success", responseHeaders, HttpStatus.CREATED);
			}
			return new ResponseEntity<>(null, responseHeaders, HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(null, responseHeaders, HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
