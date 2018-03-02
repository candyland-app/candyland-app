package com.candyland.repository;

import org.springframework.data.repository.CrudRepository;

import com.candyland.domain.UserPayment;

public interface PaymentRepository extends CrudRepository<UserPayment, Long> {
}
