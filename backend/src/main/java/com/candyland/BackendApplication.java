package com.candyland;

import com.candyland.config.SecurityUtility;
import com.candyland.domain.User;
import com.candyland.domain.security.Role;
import com.candyland.domain.security.UserRole;
import com.candyland.service.UserService;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {

    @Autowired
    private UserService userService;

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        User user1 = new User();
        user1.setFirstName("Yan");
        user1.setLastName("Kun");
        user1.setUsername("yankun");
        user1.setPassword(SecurityUtility.passwordEncoder().encode("yankun"));
        user1.setEmail("yankuun@gmail.com");
        Set<UserRole> userRoles = new HashSet<>();
        Role role1 = new Role();
        role1.setRoleId(1);
        role1.setName("ROLE_USER");
        userRoles.add(new UserRole(user1, role1));
        userService.createUser(user1, userRoles);

        userRoles.clear();

        User user2 = new User();
        user2.setFirstName("Admin");
        user2.setLastName("Admin");
        user2.setUsername("admin");
        user2.setPassword(SecurityUtility.passwordEncoder().encode("admin"));
        user2.setEmail("Admin@gmail.com");
        Role role2 = new Role();
        role2.setRoleId(0);
        role2.setName("ROLE_ADMIN");
        userRoles.add(new UserRole(user2, role2));
        userService.createUser(user2, userRoles);
    }

}
