package com.candyland.money;

import com.candyland.enums.CardType;

/**
 * Credit or Debit card to be used by registered users and admins.
 *
 */
public class Card {

    private static final int MIN_CARD_DIGITS = 16;

    private static final int MAX_CARD_DIGITS = 19;

    private String cardNo;

    private CardType cardType;

    public Card() {
        setCardNo(null);
    }

    /**
     * Checks if the card number is valid.
     * 
     * @return true if the field cardNo is a valid card number
     */
    public boolean cardNoValidator() {
        // TODO probably more criteria!
        int length = (getCardNo() != null) ? getCardNo().trim().length() : 0;
        if ((length >= MIN_CARD_DIGITS) && (length <= MAX_CARD_DIGITS)) {
            return true;
        }
        return false;
    }

    public String getCardNo() {
        return cardNo;
    }

    public void setCardNo(String cardNo) {
        this.cardNo = cardNo;
    }

    public CardType getCardType() {
        return cardType;
    }

    public void setCardType(CardType cardType) {
        this.cardType = cardType;
    }

}
