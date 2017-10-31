package com.candyland.entities;

import com.candyland.interfaces.User;

/**
 * Business user entity.
 *
 */

public class Business implements User {

    private String username;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

}
