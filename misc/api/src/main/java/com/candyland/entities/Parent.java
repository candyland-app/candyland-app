package com.candyland.entities;

import com.candyland.money.Wallet;

/**
 * Parent user entity.
 */
public class Parent extends RegisteredUser {

    private Integer purchases;
    private Double points;
    private Double pointsSinceLastBonus;
    private Short locked;

    /**
     * Default constructor.
     */
    public Parent() {
        super();
    }

    /**
     * Constructor with fields, empty wallet for new registration.
     * 
     * @param purchases
     * @param points
     * @param pointsSinceLastBonus
     * @param locked
     */
    public Parent(Integer purchases, Double points, Double pointsSinceLastBonus, Short locked) {
        super(new Wallet());
        this.purchases = purchases;
        this.points = points;
        this.pointsSinceLastBonus = pointsSinceLastBonus;
        this.locked = locked;
        setWallet(new Wallet());
    }

    public Integer getPurchases() {
        return purchases;
    }

    public void setPurchases(Integer purchases) {
        this.purchases = purchases;
    }

    public Double getPoints() {
        return points;
    }

    public void setPoints(Double points) {
        this.points = points;
    }

    public Double getPointsSinceLastBonus() {
        return pointsSinceLastBonus;
    }

    public void setPointsSinceLastBonus(Double pointsSinceLastBonus) {
        this.pointsSinceLastBonus = pointsSinceLastBonus;
    }

    public Short getLocked() {
        return locked;
    }

    public void setLocked(Short locked) {
        this.locked = locked;
    }

}
