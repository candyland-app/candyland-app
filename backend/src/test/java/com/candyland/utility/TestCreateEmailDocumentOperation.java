package com.candyland.utility;

import static org.junit.Assert.assertNotNull;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.Test;

import com.candyland.domain.CartItem;
import com.candyland.domain.Event;
import com.candyland.domain.Order;
import com.candyland.domain.Payment;
import com.candyland.utility.CreateEmailDocumentOperation;

public class TestCreateEmailDocumentOperation {

    @Test
    public void testExecute() throws IOException {
        CreateEmailDocumentOperation op = new CreateEmailDocumentOperation();
        Event event = new Event();
        event.setStartDate(Date.from(Instant.now()).toString());
        event.setName("show");
        op.setEvent(event);
        Order order = new Order();
        order.setId(123L);
        Payment payment = new Payment();
        payment.setCardNumber("1324132413241324");
        order.setPayment(payment);
        List<CartItem> tickets = new ArrayList<>();
        CartItem e1 = new CartItem();
        e1.setEvent(event);
        e1.setQty(2);
        e1.setSubtotal(new BigDecimal(120.0));
        e1.setId(222L);
        e1.setOrder(order);
        tickets.add(e1);
        CartItem e2 = new CartItem();
        e2.setEvent(event);
        e2.setQty(2);
        e2.setSubtotal(new BigDecimal(120.0));
        e2.setId(222L);
        e2.setOrder(order);
        tickets.add(e2);
        order.setCartItemList(tickets);
        op.setOrder(order);
        op.setIndex(1);

        op.execute();

        assertNotNull(op.getDocument());
    }

}