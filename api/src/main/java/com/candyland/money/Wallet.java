package com.candyland.money;

import java.util.List;

/**
 * The e-Wallet used for transactions between parents and businesses. <br>
 * A points system is supported.
 *
 */
public class Wallet {
    
    private Integer points;
    private List<Card> linkedCards;
    
    public Wallet() {
        setPoints(0);
        setLinkedCards(null);
    }

    public List<Card> getLinkedCards() {
        return linkedCards;
    }

    public void setLinkedCards(List<Card> linkedCards) {
        this.linkedCards = linkedCards;
    }

    public Integer getPoints() {
        return points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }
    
}
