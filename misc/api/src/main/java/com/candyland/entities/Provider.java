package com.candyland.entities;

import com.candyland.money.Wallet;

/**
 * Business user entity.
 */
public class Provider extends RegisteredUser {

    private String companyName;
    private String taxNumber;
    private String bankAccountNo;
    private String description;

    private Short locked;
    private Short confirmed;

    public String getCompanyName() {
        return companyName;
    }

    /**
     * Default Constructor.
     */
    public Provider() {
        super();
    }

    public Provider(String companyName, String taxNumber, String bankAccountNo, String description, Short locked,
            Short confirmed) {
        super(new Wallet());
        this.companyName = companyName;
        this.taxNumber = taxNumber;
        this.bankAccountNo = bankAccountNo;
        this.description = description;
        this.locked = locked;
        this.confirmed = confirmed;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getTaxNumber() {
        return taxNumber;
    }

    public void setTaxNumber(String taxNumber) {
        this.taxNumber = taxNumber;
    }

    public String getBankAccountNo() {
        return bankAccountNo;
    }

    public void setBankAccountNo(String bankAccountNo) {
        this.bankAccountNo = bankAccountNo;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Short getLocked() {
        return locked;
    }

    public void setLocked(Short locked) {
        this.locked = locked;
    }

    public Short getConfirmed() {
        return confirmed;
    }

    public void setConfirmed(Short confirmed) {
        this.confirmed = confirmed;
    }

}
