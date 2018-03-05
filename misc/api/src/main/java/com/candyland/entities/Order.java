package com.candyland.entities;

import java.util.Date;

/**
 * Order for an {@link Event}
 */
public class Order {

    private Long orderId;
    private Long ticketId;
    private Long paymentCard;

    private Integer parentId;
    private Integer ticketsNumber;

    private Double totalCost;

    private Short status;

    private Date date;

    /**
     * Default constructor.
     */
    public Order() {
        // empty
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getTicketId() {
        return ticketId;
    }

    public void setTicketId(Long ticketId) {
        this.ticketId = ticketId;
    }

    public Long getPaymentCard() {
        return paymentCard;
    }

    public void setPaymentCard(Long paymentCard) {
        this.paymentCard = paymentCard;
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    public Integer getTicketsNumber() {
        return ticketsNumber;
    }

    public void setTicketsNumber(Integer ticketsNumber) {
        this.ticketsNumber = ticketsNumber;
    }

    public Double getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(Double totalCost) {
        this.totalCost = totalCost;
    }

    public Short getStatus() {
        return status;
    }

    public void setStatus(Short status) {
        this.status = status;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

}
