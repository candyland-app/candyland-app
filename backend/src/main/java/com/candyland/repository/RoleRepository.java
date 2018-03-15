package com.candyland.repository;

import com.candyland.domain.security.Role;

import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<Role, Long> {

}
