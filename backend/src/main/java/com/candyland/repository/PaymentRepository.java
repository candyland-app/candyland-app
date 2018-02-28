package com.candyland.repository;

import org.springframework.data.repository.CrudRepository;

import com.candyland.domain.Payment;

public interface PaymentRepository extends CrudRepository<Payment, Long> {
}
