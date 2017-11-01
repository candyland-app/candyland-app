package com.candyland.entities;

import com.candyland.interfaces.Administrator;

/**
 * User with administrative privileges.
 * 
 */
public class Admin extends RegisteredUser implements Administrator {

    private String firstName;
    private String lastName;
    private String userName;

    /**
     * Ban the user.
     * 
     * @param user
     */
    public <U extends RegisteredUser> void banUser(U user) {
        // empty
    }

    public String getFirstName() {
        return firstName;
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

}
