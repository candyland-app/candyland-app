package com.candyland.entities;

/**
 * Business user entity.
 *
 */

public class Business extends RegisteredUser {

    private String username;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

}
