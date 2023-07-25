package com.example.mienspav7.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
@CrossOrigin
@Controller
@RequestMapping("/image")
@SuppressWarnings("null")
public class GetImageController {

	HttpHeaders responseHeaders = new HttpHeaders();

	@RequestMapping(value = "/user/{id}/{photo}", method = RequestMethod.GET)
	 @PreAuthorize("hasRole('USER')")
	 @ResponseBody
	    public ResponseEntity<?> getUserImages(@PathVariable("id") String id,@PathVariable("photo") String photo) {
	        if (photo != null || !photo.equals(" ")) {
	            try {
	                Path fileName = Paths.get("Images/Users/"+id, photo);
	                byte[] buffet = Files.readAllBytes(fileName);
					String base64EncodedImageBytes = Base64.getEncoder().encodeToString(buffet);
	                return ResponseEntity
	                        .ok()	                   
	                        .body(base64EncodedImageBytes);
	            } catch (Exception e) {
	            	return  new ResponseEntity<>("This image is not exist .", responseHeaders, HttpStatus.NOT_FOUND);
	            }
	        }
	        return ResponseEntity.badRequest().build();
	    }
	 @RequestMapping(value = "/allUser/{id}/{photo}", method = RequestMethod.GET)
	 @ResponseBody
	    public ResponseEntity<?> getAllUserImages(@PathVariable("id") String id,@PathVariable("photo") String photo) {
	        if (photo != null || !photo.equals(" ")) {
	            try {
	                Path fileName = Paths.get("Images/Users/"+id, photo);
	                byte[] buffet = Files.readAllBytes(fileName);
	                ByteArrayResource byteArrayResource = new ByteArrayResource(buffet);
	                return ResponseEntity
	                        .ok()
	                        .contentLength(buffet.length)
	                        .contentType(MediaType.parseMediaType("image/png"))
	                        .body(byteArrayResource);
	            } catch (Exception e) {
	            	return  new ResponseEntity<>("This image is not exist .", responseHeaders, HttpStatus.NOT_FOUND);
	            }
	        }
	        return ResponseEntity.badRequest().build();
	    }
	 
	 @RequestMapping(value = "/product/{id}/{photo}", method = RequestMethod.GET)
	 @ResponseBody
	    public ResponseEntity<?> getProductImages(@PathVariable("id") String id, @PathVariable("photo") String photo) {
	        if (photo != null || !photo.equals(" ")) {
	            try {
	                Path fileName = Paths.get("Images/Products/"+id, photo);
	                byte[] buffet = Files.readAllBytes(fileName);
	                ByteArrayResource byteArrayResource = new ByteArrayResource(buffet);
	                return ResponseEntity
	                        .ok()
	                        .contentLength(buffet.length)
	                        .contentType(MediaType.parseMediaType("image/png"))
	                        .body(byteArrayResource);
	            } catch (Exception e) {
	            	return  new ResponseEntity<>("This image is not exist .", responseHeaders, HttpStatus.NOT_FOUND);
	            }
	        }
	        return ResponseEntity.badRequest().build();
	    }
	
	 @RequestMapping(value="/service/{id}/{photo}",method = RequestMethod.GET)
	 @ResponseBody
	    public ResponseEntity<?> getImage(@PathVariable("id") String id, @PathVariable("photo") String photo){
	        if(photo!=null || !photo.equals("")){
	            try{
	                Path filename = Paths.get("Images/Services/"+id,photo);
	                byte[] buffer = Files.readAllBytes(filename);
	                ByteArrayResource byteArrayResource = new ByteArrayResource(buffer);
	                return ResponseEntity.ok()
	                        .contentLength(buffer.length)
	                        .contentType(MediaType.parseMediaType("image/png"))
	                        .body(byteArrayResource);
	            }
	            catch(Exception e){
	            	return  new ResponseEntity<>("This image is not exist .", responseHeaders, HttpStatus.NOT_FOUND);
	            }
	        }
	        return ResponseEntity.badRequest().build();
	    }
	 
}
