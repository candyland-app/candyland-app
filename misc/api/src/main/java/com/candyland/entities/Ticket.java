package com.candyland.entities;

/**
 * Ticket for an {@link Order}.
 */
public class Ticket {

    private Long ticketId;
    private Long orderId;
    private Long eventId;

    private Double ticketCost;

    /**
     * Default constructor.
     */
    public Ticket() {
        // empty
    }

    public Long getTicketId() {
        return ticketId;
    }

    public void setTicketId(Long ticketId) {
        this.ticketId = ticketId;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    public Double getTicketCost() {
        return ticketCost;
    }

    public void setTicketCost(Double ticketCost) {
        this.ticketCost = ticketCost;
    }

}
