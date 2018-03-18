package com.candyland.resource;

import com.candyland.domain.CartItem;
import com.candyland.domain.Event;
import com.candyland.domain.ShoppingCart;
import com.candyland.domain.User;
import com.candyland.service.CartItemService;
import com.candyland.service.EventService;
import com.candyland.service.ShoppingCartService;
import com.candyland.service.UserService;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cart")
public class ShoppingCartResource {
    @Autowired
    private UserService userService;

    @Autowired
    private EventService eventService;

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private ShoppingCartService shoppingCartService;

    @RequestMapping("/add")
    public ResponseEntity addItem(
        @RequestBody HashMap<String, String> mapper,
        Principal principal
    ) {
        String eventId = (String) mapper.get("eventId");
        String qty = (String) mapper.get("qty");

        User user = userService.findByUsername(principal.getName());
        Event event = eventService.findOne(Long.parseLong(eventId));

        if (Integer.parseInt(qty) > event.getAvailableTickets()) {
            return new ResponseEntity("Not Enough Stock!", HttpStatus.BAD_REQUEST);
        }

        CartItem cartItem = cartItemService.addEventToCartItem(event, user, Integer.parseInt(qty));

        return new ResponseEntity("Event Added Successfully", HttpStatus.OK);
    }

    @RequestMapping("/getCartItemList")
    public List<CartItem> getCartItemList(Principal principal) {
        User user = userService.findByUsername(principal.getName());
        ShoppingCart shoppingCart = user.getShoppingCart();

        List<CartItem> cartItemList = cartItemService.findByShoppingCart(shoppingCart);

        shoppingCartService.updateShoppingCart(shoppingCart);

        return cartItemList;
    }

    @RequestMapping("/getShoppingCart")
    public ShoppingCart getShoppingCart(Principal principal) {
        User user = userService.findByUsername(principal.getName());
        ShoppingCart shoppingCart = user.getShoppingCart();

        shoppingCartService.updateShoppingCart(shoppingCart);
        return shoppingCart;
    }

    @RequestMapping("/removeItem")
    public ResponseEntity removeItem(@RequestBody String id) {
        cartItemService.removeCartItem(cartItemService.findById(Long.parseLong(id)));

        return new ResponseEntity("Cart Item Removed Successfully!", HttpStatus.OK);
    }

    @RequestMapping("/updateCartItem")
    public ResponseEntity updateCartItem(
        @RequestBody HashMap<String, String> mapper
    ) {
        String cartItemId = mapper.get("cartItemId");
        String qty = mapper.get("qty");

        CartItem cartItem = cartItemService.findById(Long.parseLong(cartItemId));
        cartItem.setQty(Integer.parseInt(qty));

        cartItemService.updateCartItem(cartItem);

        return new ResponseEntity("Cart Item Updated Successfully!", HttpStatus.OK);
    }
}
