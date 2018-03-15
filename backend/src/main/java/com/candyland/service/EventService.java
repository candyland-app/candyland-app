package com.candyland.service;

import com.candyland.domain.Event;

import java.util.List;

public interface EventService {

    List<Event> findAll();

    Event findOne(Long id);

    Event save(Event book);

    List<Event> blurrySearch(String name);

    void removeOne(Long id);
}
