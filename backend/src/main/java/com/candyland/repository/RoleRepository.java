package com.candyland.repository;

import org.springframework.data.repository.CrudRepository;

import com.candyland.domain.security.Role;

public interface RoleRepository extends CrudRepository<Role, Long> {

}
