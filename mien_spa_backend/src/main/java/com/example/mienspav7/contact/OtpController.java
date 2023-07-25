package com.example.mienspav7.contact;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.mienspav7.dto.request.ForgotPasswordRequest;
import com.example.mienspav7.dto.request.OtpRequest;
import com.example.mienspav7.model.Users;
import com.example.mienspav7.service.EmailService;
import com.example.mienspav7.service.OtpService;
import com.example.mienspav7.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/otp")
public class OtpController {

	@Autowired
	public OtpService otpService;
	
	@Autowired
	public UserService usService;

	@Autowired
	public EmailService emailService;
	
	@Autowired
	PasswordEncoder encoder;

	HttpHeaders responseHeaders = new HttpHeaders();

	@PostMapping("/generateOTP")
	public ResponseEntity<?> generateOTP(@RequestBody String email) {
		try {
			boolean checkEmail = usService.checkMail(email);
			if(checkEmail) {
				int otp = otpService.generateOTP(email);
				// Generate The Template to send OTP
				boolean sendCheck = emailService.sendOtpMessage(email, String.valueOf(otp));
				if(sendCheck) {
					return new ResponseEntity<>("Otp has been sent to " + email, responseHeaders, HttpStatus.OK);
				}else {
					return new ResponseEntity<>("Send otp failed", responseHeaders, HttpStatus.BAD_REQUEST);
				}
			}else {
				return new ResponseEntity<>("Unregistered email", responseHeaders, HttpStatus.NOT_FOUND);
			}
			
		} catch (Exception e) {
			return new ResponseEntity<>("Send otp failed", responseHeaders, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/validateOtp")
	public ResponseEntity<?> validateOtp(@RequestBody OtpRequest otp) {
		final String SUCCESS = "Entered Otp is valid";
		final String FAIL = "Entered Otp is NOT valid. Please Retry!";
		// Validate the Otp
		if (Integer.parseInt(otp.getOtp()) >= 0) { 
			int serverOtp = otpService.getOtp(otp.getEmail());
			if (serverOtp > 0) {
				if (Integer.parseInt(otp.getOtp()) == serverOtp) {
					return new ResponseEntity<>(SUCCESS, responseHeaders, HttpStatus.OK);
				} else {
					return new ResponseEntity<>(FAIL, responseHeaders, HttpStatus.NOT_FOUND);
				}
			} else {
				return new ResponseEntity<>(FAIL, responseHeaders, HttpStatus.NOT_FOUND);
			}
		} else {
			return new ResponseEntity<>(FAIL, responseHeaders, HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/forgot_password")
	public ResponseEntity<?> processForgotPassword(@RequestBody ForgotPasswordRequest forgotPassword) {
		try {
			Users entity = usService.getByEmail(forgotPassword.getEmail());	
			if(entity != null) {
				if (Integer.parseInt(forgotPassword.getOtp()) >= 0) {
					int serverOtp = otpService.getOtp(forgotPassword.getEmail());
					if (serverOtp > 0) {
						if (Integer.parseInt(forgotPassword.getOtp()) == serverOtp) {
							entity.setUsPassword(encoder.encode(forgotPassword.getPassword()));
							usService.save(entity);
							otpService.clearOTP(forgotPassword.getEmail());
							return new ResponseEntity<>("SUCCESS", responseHeaders, HttpStatus.OK);
						} else {
							return new ResponseEntity<>("FAIL", responseHeaders, HttpStatus.NOT_FOUND);
						}
					} else {
						return new ResponseEntity<>("FAIL", responseHeaders, HttpStatus.NOT_FOUND);
					}
				} else {
					return new ResponseEntity<>("Otp error", responseHeaders, HttpStatus.NOT_FOUND);
				}
			}else {
				return new ResponseEntity<>("Unregistered email", responseHeaders, HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), responseHeaders, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
