package com.candyland.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

@Entity
public class CartItem implements Serializable {
    private static final long serialVersionUID = -189412481L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private int qty;
    private BigDecimal subtotal;

    @OneToOne
    private Event event;

    @OneToMany(mappedBy = "cartItem")
    @JsonIgnore
    private List<EventToCartItem> eventToCartItemList;

    @ManyToOne
    @JoinColumn(name = "shopping_cart_id")
    @JsonIgnore
    private ShoppingCart shoppingCart;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getQty() {
        return qty;
    }

    public void setQty(int qty) {
        this.qty = qty;
    }

    public BigDecimal getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(BigDecimal subtotal) {
        this.subtotal = subtotal;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public List<EventToCartItem> getEventToCartItemList() {
        return eventToCartItemList;
    }

    public void setEventToCartItemList(List<EventToCartItem> eventToCartItemList) {
        this.eventToCartItemList = eventToCartItemList;
    }

    public ShoppingCart getShoppingCart() {
        return shoppingCart;
    }

    public void setShoppingCart(ShoppingCart shoppingCart) {
        this.shoppingCart = shoppingCart;
    }
}
