package com.candyland.service.impl;

import com.candyland.domain.UserPayment;
import com.candyland.repository.UserPaymentRepository;
import com.candyland.service.UserPaymentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserPaymentServiceImpl implements UserPaymentService {

    @Autowired
    private UserPaymentRepository userPaymentRepository;

    public UserPayment findById(Long id) {
        return userPaymentRepository.findOne(id);
    }

    public void removeById(Long id) {
        userPaymentRepository.delete(id);
    }
}
