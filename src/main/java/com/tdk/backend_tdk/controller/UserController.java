package com.tdk.backend_tdk.controller;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @GetMapping("/profile")
    @PreAuthorize("hasAnyRole('USER')")
    public String userProfile() {
        return "Bienvenue, Utilisateur.";
    }
}