package com.candyland.repository;

import org.springframework.data.repository.CrudRepository;

import com.candyland.domain.BillingAddress;

public interface BillingAddressRepository extends CrudRepository<BillingAddress, Long>{

}
