package com.candyland.resource;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.candyland.domain.BillingAddress;
import com.candyland.domain.User;
import com.candyland.domain.UserPayment;
import com.candyland.service.PaymentService;
import com.candyland.service.UserService;

@RestController
@RequestMapping("/payment")
public class PaymentResource {
    @Autowired
    private UserService userService;

    @Autowired
    private PaymentService paymentService;

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public ResponseEntity addNewCreditCardPost(@RequestBody UserPayment payment, Principal principal) {
        User user = userService.findByUsername(principal.getName());

        BillingAddress userBilling = payment.getBillingAddress();

        userService.updateUserBilling(userBilling, payment, user);

        return new ResponseEntity("Payment Added Successfully", HttpStatus.OK);
    }

    @RequestMapping(value = "/remove", method = RequestMethod.POST)
    public ResponseEntity removePaymentPost(@RequestBody String id, Principal principal) {
        paymentService.removeById(Long.valueOf(id));

        return new ResponseEntity("Payment Removed Successfully", HttpStatus.OK);
    }

    @RequestMapping(value = "/setDefault", method = RequestMethod.POST)
    public ResponseEntity setDefaultPaymentPost(@RequestBody String id, Principal principal) {
        User user = userService.findByUsername(principal.getName());

        userService.setUserDefaultPayment(Long.parseLong(id), user);

        return new ResponseEntity("Payment Removed Successfully", HttpStatus.OK);
    }

    @RequestMapping("/getUserPaymentList")
    public List<UserPayment> getUserPaymentList(Principal principal) {
        User user = userService.findByUsername(principal.getName());

        List<UserPayment> userPaymentList = user.getUserPaymentList();

        return userPaymentList;
    }
}
