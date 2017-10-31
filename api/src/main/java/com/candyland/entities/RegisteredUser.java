package com.candyland.entities;

import com.candyland.interfaces.User;
import com.candyland.money.Wallet;

public class RegisteredUser implements User {

    private String username;

    private Wallet wallet;
    
    public Wallet getWallet() {
        return wallet;
    }

    public void setWallet(Wallet wallet) {
        this.wallet = wallet;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

}
