package com.candyland.entities;

/**
 * User with administrative privileges.
 */
public class Admin extends RegisteredUser {

    /**
     * Ban the user.
     * 
     * @param user
     */
    public <U extends RegisteredUser> void banUser(U user) {
        // empty
    }

}
