package com.candyland.service.impl;

import com.candyland.domain.CartItem;
import com.candyland.domain.Event;
import com.candyland.domain.EventToCartItem;
import com.candyland.domain.ShoppingCart;
import com.candyland.domain.User;
import com.candyland.repository.CartItemRepository;
import com.candyland.repository.EventToCartItemRepository;
import com.candyland.service.CartItemService;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CartItemServiceImpl implements CartItemService {
    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private EventToCartItemRepository eventToCartItemRepository;

    public CartItem addEventToCartItem(Event event, User user, int qty) {
        List<CartItem> cartItemList = findByShoppingCart(user.getShoppingCart());

        for (CartItem cartItem : cartItemList) {
            if (event.getId() == cartItem.getEvent().getId()) {
                cartItem.setQty(cartItem.getQty() + qty);
                cartItem.setSubtotal(new BigDecimal(event.getPrice()).multiply(
                    new BigDecimal(qty)));
                cartItemRepository.save(cartItem);
                return cartItem;
            }
        }

        CartItem cartItem = new CartItem();
        cartItem.setShoppingCart(user.getShoppingCart());
        cartItem.setEvent(event);
        cartItem.setQty(qty);
        cartItem.setSubtotal(new BigDecimal(event.getPrice()).multiply(new BigDecimal(qty)));

        cartItem = cartItemRepository.save(cartItem);

        EventToCartItem eventToCartItem = new EventToCartItem();
        eventToCartItem.setEvent(event);
        eventToCartItem.setCartItem(cartItem);
        eventToCartItemRepository.save(eventToCartItem);

        return cartItem;
    }

    @Transactional
    public void removeCartItem(CartItem cartItem) {
        eventToCartItemRepository.deleteByCartItem(cartItem);
        cartItemRepository.delete(cartItem);
    }

    public List<CartItem> findByShoppingCart(ShoppingCart shoppingCart) {
        return cartItemRepository.findByShoppingCart(shoppingCart);
    }

    public CartItem updateCartItem(CartItem cartItem) {
        BigDecimal bigDecimal = new BigDecimal(cartItem.getEvent().getPrice()).multiply(
            new BigDecimal(cartItem.getQty()));
        bigDecimal = bigDecimal.setScale(2, BigDecimal.ROUND_HALF_UP);
        cartItem.setSubtotal(bigDecimal);

        cartItemRepository.save(cartItem);

        return cartItem;
    }

    public CartItem findById(Long id) {
        return cartItemRepository.findOne(id);
    }

    public CartItem save(CartItem cartItem) {
        return cartItemRepository.save(cartItem);
    }

    // public List<CartItem> findByOrder(Order order) {
    // return cartItemRepository.findByOrder(order);
    // }
}
