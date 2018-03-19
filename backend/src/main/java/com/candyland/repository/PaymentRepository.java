package com.candyland.repository;

import com.candyland.domain.Payment;

import org.springframework.data.repository.CrudRepository;

public interface PaymentRepository extends CrudRepository<Payment, Long> {

}
