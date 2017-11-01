package com.candyland.entities;

import java.util.ArrayList;

import com.candyland.enums.CardType;
import com.candyland.interfaces.User;
import com.candyland.money.Card;
import com.candyland.money.Wallet;

/**
 * Registered user.
 *
 */
public class RegisteredUser implements User {

    private String username;

    private Wallet wallet;

    /**
     * Adds an associated card to the user's wallet
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
            // TODO change, better design for the frontend
        }
    }

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
