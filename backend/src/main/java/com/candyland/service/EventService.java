package com.candyland.service;

import java.util.List;

import com.candyland.domain.Event;

public interface EventService {
	
	List<Event> findAll();
	
	Event findOne(Long id);
	
	Event save(Event book);
	
	List<Event> blurrySearch(String title);
	
	void removeOne(Long id);
}
