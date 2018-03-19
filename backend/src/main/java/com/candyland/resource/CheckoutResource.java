package com.candyland.resource;

import java.io.IOException;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.candyland.domain.BillingAddress;
import com.candyland.domain.CartItem;
import com.candyland.domain.Order;
import com.candyland.domain.Payment;
import com.candyland.domain.ShoppingCart;
import com.candyland.domain.User;
import com.candyland.service.CartItemService;
import com.candyland.service.OrderService;
import com.candyland.service.ShoppingCartService;
import com.candyland.service.UserService;
import com.candyland.utility.MailConstructor;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/checkout")
public class CheckoutResource {
    private Order order = new Order();

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserService userService;

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private ShoppingCartService shoppingCartService;

    @Autowired
    private MailConstructor mailConstructor;

    @RequestMapping(value = "/checkout", method = RequestMethod.POST)
    public Order checkoutPost(@RequestBody HashMap<String, Object> mapper, Principal principal)
            throws MailException, IOException {
        ObjectMapper om = new ObjectMapper();

        BillingAddress billingAddress = om.convertValue(mapper.get("billingAddress"), BillingAddress.class);
        Payment payment = om.convertValue(mapper.get("payment"), Payment.class);

        ShoppingCart shoppingCart = userService.findByUsername(principal.getName()).getShoppingCart();
        List<CartItem> cartItemList = cartItemService.findByShoppingCart(shoppingCart);
        User user = userService.findByUsername(principal.getName());
        Order order = orderService.createOrder(shoppingCart, billingAddress, payment, user);

        mailSender.send(mailConstructor.constructOrderConfirmationEmail(user, order, Locale.ENGLISH));

        shoppingCartService.clearShoppingCart(shoppingCart);

        this.order = order;
        return order;
    }
}
