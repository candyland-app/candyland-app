package com.candyland.service;

import java.util.List;

import com.candyland.domain.UserPayment;

public interface PaymentService {

    UserPayment newPayment(UserPayment payment);

    List<UserPayment> getUserPaymentList();

    void removePayment(long id);

    void setDefaultPayment(long id);

    void removeById(Long ID);

}
