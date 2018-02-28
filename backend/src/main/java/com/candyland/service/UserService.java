package com.candyland.service;

import java.util.List;
import java.util.Set;

import com.candyland.domain.User;
import com.candyland.domain.security.UserRole;

public interface UserService {
    User save(User user);

    User findById(Long id);

    User findByEmail(String email);

    User findByUsername(String username);

    User createUser(User user, Set<UserRole> userRoles);
}
