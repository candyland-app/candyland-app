package com.candyland.repository;

import org.springframework.data.repository.CrudRepository;

import com.candyland.domain.Checkout;

public interface CheckoutRepository extends CrudRepository<Checkout, Long>{

}
