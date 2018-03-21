package com.candyland.service;

import com.candyland.domain.User;
import com.candyland.domain.UserBilling;
import com.candyland.domain.UserPayment;
import com.candyland.domain.security.UserRole;

import java.util.List;
import java.util.Set;

public interface UserService {

    User createUser(User user, Set<UserRole> userRoles);

    User findByUsername(String username);

    User findByEmail(String email);

    User save(User user);

    User findById(Long id);

    List<User> findAll();

    void removeOne(Long id);

    User findOne(Long id);

    public void updateUserPaymentInfo(UserBilling userBilling, UserPayment userPayment, User user);

    public void updateUserBilling(UserBilling userBilling, UserPayment userPayment, User user);

    public void setUserDefaultPayment(Long userPayment, User user);
}
