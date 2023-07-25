package com.example.mienspav7.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;

@Service
public class EmailService {

	@Autowired
	private JavaMailSender mailSender;
	
	public boolean sendOtpMessage(String to, String otp) {   
	      try {
	    	  MimeMessage message = mailSender.createMimeMessage();
	    		 boolean multipart = true;
	    		 MimeMessageHelper helper = new MimeMessageHelper(message, multipart, "utf-8");
	    		 String htmlMsg = "<div style=\"font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2\">\r\n"
	    		 		+ "<div style=\"margin:50px auto;width:80%;padding:20px 0\">\r\n"
	    		 		+ "<div style=\"border-bottom:5px solid #eee\">\r\n"
	    		 		+ "  <a href=\"\" style=\"font-size:30px;color: #f7c800;text-decoration:none;font-weight:600\">AppName</a>\r\n"
	    		 		+ "</div>\r\n"
	    		 		+ "<p style=\"font-size:15px\">Hello</p>\r\n"
	    		 		+ "<p>Thank you for choosing Appname. Use this OTP to complete your Sign Up procedures and verify your account on AppName.</p>\r\n"
	    		 		+ "<p>Remember, Never share this OTP with anyone.</p>\r\n"
	    		 		+ "<h2 style=\"background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;\">"+otp+"</h2>\r\n"
	    		 		+ "<p style=\"font-size:15px;\">Regards,<br />Team AppName</p>\r\n"
	    		 		+ "<hr style=\"border:none;border-top:5px solid #eee\" />\r\n"
	    		 		+ "<div style=\"float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300\">\r\n"
	    		 		+ "  <p>App Name Inc</p>\r\n"
	    		 		+ "  <p>address</p>\r\n"
	    		 		+ " </div>\r\n"
	    		 		+ "</div>\r\n"
	    		 		+ "</div>";
	 	               
	    		message.setContent(htmlMsg, "text/html; charset=UTF-8");
	    		helper.setFrom("hoangdhts2011010@fpt.edu.vn","Mien-Spa");
	    		helper.setTo(to);
	         helper.setSubject("Otp");
	         mailSender.send(message);
	         return true;
		} catch (Exception e) {
			return false;
		}
   }
	
}