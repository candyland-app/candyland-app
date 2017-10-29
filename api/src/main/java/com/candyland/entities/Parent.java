package com.candyland.entities;

import com.candyland.interfaces.Person;
import com.candyland.interfaces.User;

public class Parent implements User, Person {

	private String firstName;
	private String lastName;
	private String username;

	public String getFirstName() {
		return this.firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

}
