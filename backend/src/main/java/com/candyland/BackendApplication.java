package com.candyland;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.candyland.domain.User;
import com.candyland.service.UserService;
import com.candyland.domain.security.Role;
import com.candyland.config.SecurityUtility;
import com.candyland.domain.security.UserRole;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {

	@Autowired
	private UserService userService;

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		User parent = new User();
		parent.setFirstName("Yan");
		parent.setLastName("Kun");
		parent.setUsername("yankun");
		parent.setPassword(SecurityUtility.passwordEncoder().encode("yankun"));
		parent.setEmail("yankun@gmail.com");
		Set<UserRole> userRoles = new HashSet<>();
		Role parentRole = new Role();
		parentRole.setRoleId(1);
		parentRole.setName("ROLE_USER");
		userRoles.add(new UserRole(parent, parentRole));
		userService.createUser(parent, userRoles);
		userRoles.clear();

		User admin = new User();
		admin.setFirstName("Admin");
		admin.setLastName("Admin");
		admin.setUsername("admin");
		admin.setPassword(SecurityUtility.passwordEncoder().encode("admin"));
		admin.setEmail("admin@gmail.com");
		Role adminRole = new Role();
		adminRole.setRoleId(0);
		adminRole.setName("ROLE_ADMIN");
		userRoles.add(new UserRole(admin, adminRole));
		userService.createUser(admin, userRoles);
	}

}
