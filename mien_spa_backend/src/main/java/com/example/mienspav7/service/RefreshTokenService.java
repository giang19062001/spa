package com.example.mienspav7.service;

import java.time.Instant;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.mienspav7.jwt.exception.TokenRefreshException;
import com.example.mienspav7.model.RefreshToken;
import com.example.mienspav7.repository.RefreshTokenRepository;
import com.example.mienspav7.repository.UserRepository;

@Service
public class RefreshTokenService {
	@Value("${bezkoder.app.jwtRefreshExpirationMs}")
	  private Long refreshTokenDurationMs;

	  @Autowired
	  private RefreshTokenRepository refreshTokenRepository;

	  @Autowired
	  private UserRepository userRepository;

	  public RefreshToken findByToken(String refreshToken) {
	    return refreshTokenRepository.findByRefreshToken(refreshToken);
	  }

	  public RefreshToken createRefreshToken(String userId, String token) {
	    RefreshToken refreshToken = new RefreshToken();
	    refreshToken.setUsers(userRepository.findById(userId).get());
	    refreshToken.setToken(token);
	    refreshToken.setJwtId(UUID.randomUUID().toString());;
	    refreshToken.setIsUsed(false);
	    refreshToken.setIsRevorked(false);
	    Date expiryDate = Date.from(Instant.now().plusMillis(refreshTokenDurationMs));
	    refreshToken.setExpiryDate(expiryDate);
	    Date addedDate = Date.from(Instant.now());
	    refreshToken.setAddedDate(addedDate);
	    refreshToken = refreshTokenRepository.save(refreshToken);
	    return refreshToken;
	  }

	  public RefreshToken save(RefreshToken token) {
		  return refreshTokenRepository.save(token);
	  }
	  
	  public void delete(RefreshToken token){
		  refreshTokenRepository.delete(token);
	  }
	  public RefreshToken verifyExpiration(RefreshToken token) {
		  Date date = Date.from(Instant.now());
	    if (token.getExpiryDate().compareTo(date) < 0) {
	      refreshTokenRepository.delete(token);
	      throw new TokenRefreshException(token.getToken(), "Refresh token was expired. Please make a new signin request");
	    }

	    return token;
	  }

}
