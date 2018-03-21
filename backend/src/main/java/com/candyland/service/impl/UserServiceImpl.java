package com.candyland.service.impl;

import com.candyland.domain.ShoppingCart;
import com.candyland.domain.User;
import com.candyland.domain.UserBilling;
import com.candyland.domain.UserPayment;
import com.candyland.domain.security.UserRole;
import com.candyland.repository.RoleRepository;
import com.candyland.repository.UserBillingRepository;
import com.candyland.repository.UserPaymentRepository;
import com.candyland.repository.UserRepository;
import com.candyland.service.UserService;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {

    private static final Logger LOG = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserBillingRepository userBillingRepository;

    @Autowired
    private UserPaymentRepository userPaymentRepository;


    @Transactional
    public User createUser(User user, Set<UserRole> userRoles) {
        User localUser = userRepository.findByUsername(user.getUsername());

        if (localUser != null) {
            LOG.info("User with username {} already exist. Nothing will be done. ",
                user.getUsername());
        } else {
            for (UserRole ur : userRoles) {
                roleRepository.save(ur.getRole());
            }

            user.getUserRoles().addAll(userRoles);

            ShoppingCart shoppingCart = new ShoppingCart();
            shoppingCart.setUser(user);
            user.setShoppingCart(shoppingCart);

            user.setUserPaymentList(new ArrayList<UserPayment>());

            localUser = userRepository.save(user);
        }

        return localUser;
    }

    public List<User> findAll() {
        List<User> userList = (List<User>) userRepository.findAll();

        List<User> activeUserList = new ArrayList<>();

        for (User user : userList) {
            activeUserList.add(user);
        }

        return activeUserList;
    }

    public void removeOne(Long id) {
        userRepository.delete(id);
    }

    public User findOne(Long id) {
        return userRepository.findOne(id);
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public User findById(Long id) {
        return userRepository.findOne(id);
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public void updateUserPaymentInfo(UserBilling userBilling, UserPayment userPayment, User user) {
        save(user);
        userBillingRepository.save(userBilling);
        userPaymentRepository.save(userPayment);
    }

    @Override
    public void updateUserBilling(UserBilling userBilling, UserPayment userPayment, User user) {
        userPayment.setUser(user);
        userPayment.setUserBilling(userBilling);
        userPayment.setDefaultPayment(true);
        userBilling.setUserPayment(userPayment);
        user.getUserPaymentList().add(userPayment);
        save(user);
    }

    @Override
    public void setUserDefaultPayment(Long userPaymentId, User user) {
        List<UserPayment> userPaymentList = (List<UserPayment>) userPaymentRepository.findAll();

        for (UserPayment userPayment : userPaymentList) {
            if (userPayment.getId() == userPaymentId) {
                userPayment.setDefaultPayment(true);
                userPaymentRepository.save(userPayment);
            } else {
                userPayment.setDefaultPayment(false);
                userPaymentRepository.save(userPayment);
            }
        }
    }

}
