package com.candyland.domain;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class BillingAddress implements Serializable{
	private static final long serialVersionUID = 78293749582348L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String billingAddressName;
	private String billingAddresPostalCode;

	@OneToOne
	@JsonIgnore
	private Order order;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getBillingAddressName() {
		return billingAddressName;
	}

	public void setBillingAddressName(String billingAddressName) {
		this.billingAddressName = billingAddressName;
	}

	public String getBillingAddresPostalCode() {
		return billingAddresPostalCode;
	}

	public void setBillingAddresPostalCode(String billingAddresPostalCode) {
		this.billingAddresPostalCode = billingAddresPostalCode;
	}

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}
}
