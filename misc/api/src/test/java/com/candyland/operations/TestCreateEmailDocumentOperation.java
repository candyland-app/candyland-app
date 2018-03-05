package com.candyland.operations;

import static org.junit.Assert.assertNotNull;

import java.io.IOException;
import java.time.Instant;
import java.util.Date;

import org.junit.Test;

import com.candyland.entities.Event;
import com.candyland.entities.Order;
import com.candyland.entities.Parent;
import com.candyland.entities.Provider;
import com.candyland.entities.Ticket;

public class TestCreateEmailDocumentOperation {

    @Test
    public void testExecute() throws IOException {
        CreateEmailDocumentOperation op = new CreateEmailDocumentOperation();
        Provider business = new Provider();
        business.setCompanyName("Kagk inc.");
        business.setFirstName("Elon");
        business.setLastName("Musk");
        op.setBusiness(business);
        Parent customer = new Parent();
        customer.setLastName("Dogg");
        op.setCustomer(customer);
        Event event = new Event();
        event.setStartDate(Date.from(Instant.now()));
        event.setName("show");
        op.setEvent(event);
        Ticket ticket = new Ticket();
        ticket.setTicketId(1234L);
        ticket.setTicketCost(420.0);
        ticket.setOrderId(123L);
        op.setTicket(ticket);
        Order order = new Order();
        order.setOrderId(123L);
        order.setPaymentCard(1234123412341234L);
        op.setOrder(order);

        op.execute();

        assertNotNull(op.getDocument());
    }

}
