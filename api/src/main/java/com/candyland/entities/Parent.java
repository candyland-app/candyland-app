package com.candyland.entities;

import com.candyland.interfaces.Person;
import com.candyland.money.Wallet;

/**
 * Parent user entity.
 *
 */

public class Parent extends RegisteredUser implements Person {

    private String firstName;
    private String lastName;
    private String username;

    /**
     * Constructor.
     * 
     * @param firstName
     * @param lastName
     * @param username
     */
    public Parent(String firstName, String lastName, String username) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        // Upon registration the wallet is always empty
        setWallet(new Wallet());
    }

    public String getFirstName() {
        return this.firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

}
