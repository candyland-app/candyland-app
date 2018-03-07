package com.candyland.service;

import java.util.Set;

import com.candyland.domain.User;
import com.candyland.domain.UserBilling;
import com.candyland.domain.UserPayment;
import com.candyland.domain.security.UserRole;

public interface UserService {
	
	User createUser(User user, Set<UserRole> userRoles);

	User findByUsername(String username);
	
	User findByEmail (String email);
	
	User save(User user);
	
	User findById(Long id);
	
	public void updateUserPaymentInfo(UserBilling userBilling, UserPayment userPayment, User user);
	
	public void updateUserBilling(UserBilling userBilling, UserPayment userPayment, User user);
	
	public void setUserDefaultPayment(Long userPayment, User user);
}
