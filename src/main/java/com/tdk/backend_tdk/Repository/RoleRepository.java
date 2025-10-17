package com.tdk.backend_tdk.Repository;

import com.tdk.backend_tdk.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(String name);
    Role findByname(String role);
}
