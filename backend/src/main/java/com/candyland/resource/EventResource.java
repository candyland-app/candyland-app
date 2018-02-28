package com.candyland.resource;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.candyland.domain.Event;
import com.candyland.service.EventService;

@RestController
@RequestMapping("/event")
public class EventResource {
    @Autowired
    private EventService eventService;

    @RequestMapping (value = "/add", method = RequestMethod.POST)
    public Event addEventPost(@RequestBody Event event) {
        return eventService.save(event);
    }

    @RequestMapping(value = "/add/image", method = RequestMethod.POST)
    public ResponseEntity upload(
        @RequestParam("id") Long id,
        HttpServletResponse response, HttpServletRequest request
        ) {
        try {
            Event event = eventService.findOne(id);
            MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
            Iterator<String> it = multipartRequest.getFileNames();
            MultipartFile multipartFile = multipartRequest.getFile(it.next());
            String fileName = id + ".png";


            byte[] bytes = multipartFile.getBytes();
            BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File("src/main/resources/static/image/event/" + fileName)));
            stream.write(bytes);
            stream.close();

            return new ResponseEntity("Upload Successful", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity("Upload Failed", HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/update/image", method = RequestMethod.POST)
    public ResponseEntity updateImagePost(
        @RequestParam("id") Long id,
        HttpServletResponse response, HttpServletRequest request
        ) {
        try {
            Event event = eventService.findOne(id);
            MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
            Iterator<String> it = multipartRequest.getFileNames();
            MultipartFile multipartFile = multipartRequest.getFile(it.next());
            String fileName = id + ".png";

            Files.delete(Paths.get("src/main/resources/static/image/event/" + fileName));

            byte[] bytes = multipartFile.getBytes();
            BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File("src/main/resources/static/image/event/" + fileName)));
            stream.write(bytes);
            stream.close();

            return new ResponseEntity("Upload Successful", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity("Upload Failed", HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping("/eventList")
    public List<Event> getEventList() {
        return eventService.findAll();
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public Event updateEventPost(@RequestBody Event event) {
        return eventService.save(event);
    }

    @RequestMapping(value = "/remove", method = RequestMethod.POST)
    public ResponseEntity remove(
        @RequestBody String id
        ) throws IOException {
        eventService.removeOne(Long.parseLong(id));
        String fileName = id + ".png";

        Files.delete(Paths.get("src/main/resources/static/image/event/" + fileName));

        return new ResponseEntity("Remove Succesful", HttpStatus.OK);
    }

    @RequestMapping("/{id}")
    public Event getEvent(@PathVariable("id") Long id) {
        Event event = eventService.findOne(id);

        return event;
    }

    @RequestMapping(value = "/searchEvent", method = RequestMethod.POST)
    public List<Event> searchEvent(@RequestBody String keyword) {
        List<Event> eventList = eventService.blurrySearch(keyword);

        return eventList;
    }
}
