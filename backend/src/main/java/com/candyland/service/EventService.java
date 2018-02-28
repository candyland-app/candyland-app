package com.candyland.service;

import java.util.List;

import com.candyland.domain.Event;

public interface EventService {
    List<Event> findAll();

    Event findOne(Long id);

    Event save(Event event);

    List<Event> blurrySearch(String name);

    void removeOne(Long id);
}
