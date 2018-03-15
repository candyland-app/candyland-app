package com.candyland.repository;

import com.candyland.domain.Event;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface EventRepository extends CrudRepository<Event, Long> {
    List<Event> findByNameContaining(String keyword);
}
