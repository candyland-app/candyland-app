package com.candyland.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.candyland.domain.Event;
import com.candyland.repository.EventRepository;
import com.candyland.service.EventService;

@Service
public class EventServiceImpl implements EventService{

	@Autowired
	private EventRepository eventRepository;

	public List<Event> findAll() {
		List<Event> eventList = (List<Event>) eventRepository.findAll();

		List<Event> activeEventList = new ArrayList<>();

		for (Event event : eventList) {
			if(event.isActive()) {
				activeEventList.add(event);
			}
		}

		return activeEventList;
	}

	public Event findOne(Long id) {
		return eventRepository.findOne(id);
	}

	public Event save(Event event) {
		return eventRepository.save(event);
	}

	public List<Event> blurrySearch(String keyword) {
		List<Event> eventList = eventRepository.findByDescriptionContaining(keyword);

		List<Event> activeEventList = new ArrayList<>();

		for (Event event : eventList) {
			if(event.isActive()) {
				activeEventList.add(event);
			}
		}

		return activeEventList;
	}

	public void removeOne(Long id) {
		eventRepository.delete(id);
	}
}
