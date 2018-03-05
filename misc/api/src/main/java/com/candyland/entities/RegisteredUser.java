package com.candyland.entities;

import java.awt.image.BufferedImage;
import java.util.ArrayList;

import com.candyland.enums.CardType;
import com.candyland.money.Card;
import com.candyland.money.Wallet;

/**
 * Registered user.
 *
 */
public class RegisteredUser extends Person {

    private Wallet wallet;

    private BufferedImage avatar; // TODO

    /**
     * Superclass constructor.
     */
    public RegisteredUser() {
        super();
    }

    /**
     * Constructor with field.
     * 
     * @param wallet
     */
    public RegisteredUser(Wallet wallet) {
        super();
        this.wallet = wallet;
    }

    /**
     * Adds an associated card to the user's wallet.
     * 
     * @param type
     *            The {@link CardType} of the card to be added
     */
    public void addCard(Card card) {
        if (card.cardNoValidator()) {
            if (wallet.getLinkedCards() == null) {
                wallet.setLinkedCards(new ArrayList<Card>());
            }
            wallet.getLinkedCards().add(card);
        } else {
            System.out.println("Not a valid card");
        }
    }

    public Wallet getWallet() {
        return wallet;
    }

    public void setWallet(Wallet wallet) {
        this.wallet = wallet;
    }

    public String getUsername() {
        return this.userName;
    }

    public void setUsername(String username) {
        this.userName = username;
    }

    public BufferedImage getAvatar() {
        return avatar;
    }

    public void setAvatar(BufferedImage avatar) {
        this.avatar = avatar;
    }

}
