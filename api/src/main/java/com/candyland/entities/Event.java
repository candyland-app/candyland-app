package com.candyland.entities;

import java.util.Date;

public class Event {

    private String name;
    private String address;
    private String postalCode;
    private String startTime;
    private String endTime;
    private String description;
    private String imagesPath;

    private Integer ticketsAvailable;
    private Integer ticketsSold;

    private Short category;
    private Short minAge;
    private Short maxAge;

    private Date startDate;
    private Date endDate;

    /**
     * Default constructor.
     */
    public Event() {
        // empty
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Short getCategory() {
        return category;
    }

    public void setCategory(Short category) {
        this.category = category;
    }

    public String getImagesPath() {
        return imagesPath;
    }

    public void setImagesPath(String imagesPath) {
        this.imagesPath = imagesPath;
    }

    public Integer getTicketsAvailable() {
        return ticketsAvailable;
    }

    public void setTicketsAvailable(Integer ticketsAvailable) {
        this.ticketsAvailable = ticketsAvailable;
    }

    public Integer getTicketsSold() {
        return ticketsSold;
    }

    public void setTicketsSold(Integer ticketsSold) {
        this.ticketsSold = ticketsSold;
    }

    public Short getMinAge() {
        return minAge;
    }

    public void setMinAge(Short minAge) {
        this.minAge = minAge;
    }

    public Short getMaxAge() {
        return maxAge;
    }

    public void setMaxAge(Short maxAge) {
        this.maxAge = maxAge;
    }

}
