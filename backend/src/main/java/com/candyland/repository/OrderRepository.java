package com.candyland.repository;

import com.candyland.domain.Order;
import com.candyland.domain.User;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface OrderRepository extends CrudRepository<Order, Long> {
    List<Order> findByUser(User user);
}
