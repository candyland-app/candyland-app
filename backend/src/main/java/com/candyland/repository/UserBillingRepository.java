package com.candyland.repository;

import org.springframework.data.repository.CrudRepository;

import com.candyland.domain.BillingAddress;

public interface UserBillingRepository extends CrudRepository<UserBilling, Long> {

}
