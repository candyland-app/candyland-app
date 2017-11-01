package com.candyland.operations;

import com.candyland.entities.RegisteredUser;
import com.candyland.money.Card;
import com.candyland.money.Wallet;

public class MoneyOperations {

    public static <U extends RegisteredUser> void addFundsToWallet(U user, Double amount, Card card) {
        validateWalletRequest(user, amount, card);
        Wallet w = user.getWallet();
        w.setPoints(w.getPoints() + moneyToPoints(amount));
        // TODO add some dummy validation for funds sufficiency ?
    }

    private static <U extends RegisteredUser> boolean validateWalletRequest(U user, Double amount, Card card) {
        try {
            if (user.getWallet().getLinkedCards().contains(card)) {
                return true;
            }
        } catch (NullPointerException e) {
            System.out.println("The specified card was not found or the user has used his wallet yet!");
            // TODO to be changed, don't like sysout and it has to blend with the front end!
            return false;
        }
        return true;
    }

    /**
     * A conversion from dollaz to points. <br>
     * The goal is to award big spending (obviously) by giving bonuses for deposits
     * of a specified amount or more.
     * 
     * @param amount
     *            Amount of money
     * @return The points calculated from the given money
     */
    private static Long moneyToPoints(Double amount) {
        Long points;
        if (amount < 50.0) {
            points = amount.longValue();
        } else {
            points = new Double(amount * 1.420).longValue();
        }
        return points;
    }

}
