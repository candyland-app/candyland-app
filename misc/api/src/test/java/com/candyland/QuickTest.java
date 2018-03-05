package com.candyland;

import org.junit.Assert;
import org.junit.Test;

import com.candyland.entities.Parent;
import com.candyland.enums.CardType;
import com.candyland.money.Card;
import com.candyland.operations.MoneyOperations;

/**
 * To be used for every purpose imaginable... <br>
 * NOT TO BE COMMITED!1!lne
 *
 */
public class QuickTest {

    @Test
    public void Test() {
        Parent p = new Parent("george", "bax", "gbax");
        Card card = new Card(CardType.CREDIT_CARD);
        card.setCardNo("1234123412341234");
        p.addCard(card);
        MoneyOperations.addFundsToWallet(p, 420.0, p.getWallet().getLinkedCards().get(0));
        Assert.assertNotNull(p.getWallet().getLinkedCards());
    }

}
