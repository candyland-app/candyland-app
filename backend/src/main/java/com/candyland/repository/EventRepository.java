package com.candyland.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.candyland.domain.Event;

public interface EventRepository extends CrudRepository<Event, Long> {
    List<Event> findByTitleContaining(String keyword);
}
