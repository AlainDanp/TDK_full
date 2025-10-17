package com.tdk.backend_tdk.controller;

import com.tdk.backend_tdk.model.AuthResponse;
import com.tdk.backend_tdk.model.Role;
import com.tdk.backend_tdk.model.User;
import com.tdk.backend_tdk.security.JWTUtil;
import com.tdk.backend_tdk.DTO.RegisterDTO;
import com.tdk.backend_tdk.DTO.LoginRequest;
import com.tdk.backend_tdk.Repository.RoleRepository;
import com.tdk.backend_tdk.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterDTO registerDTO) {
        if (userRepository.findByEmail(registerDTO.getEmail()).isPresent()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Erreur : email déjà utilisé.");
        }
        if(userRepository.existsByEmail(registerDTO.getEmail())){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Erreur: L'email est déjà utilisé.");
        }
        if(userRepository.existsByUsername(registerDTO.getUsername())){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Erreur: Le nom d'utilisateur est déjà utilisé.");
        }
        if (userRepository.findByPhoneNumber(registerDTO.getphoneNumber()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Erreur: Le numéro de téléphone est déjà utilisé.");
        }
        Set<String> roles = registerDTO.getRoles();
        if(roles == null || roles.isEmpty()) roles = Set.of("USER");

        User user = new User();
        user.setEmail(registerDTO.getEmail());
        user.setUsername(registerDTO.getUsername());
        user.setPhoneNumber(registerDTO.getphoneNumber());
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));

        Set<Role> userRoles = new HashSet<>();

        if (registerDTO.getRoles() == null || registerDTO.getRoles().isEmpty()) {
            Role userRole = roleRepository.findByName("USER")
                    .orElseThrow(() -> new RuntimeException("Erreur: Le rôle USER n'existe pas."));
            userRoles.add(userRole);
        }
        if (registerDTO.getRoles() != null && registerDTO.getRoles().contains("ADMIN")) {
            Role adminRole = roleRepository.findByName("ADMIN")
                    .orElseThrow(() -> new RuntimeException("Erreur: Le rôle ADMIN n'existe pas."));
            userRoles.add(adminRole);
        } else {
            for (String roleName : registerDTO.getRoles()) {
                Role role = roleRepository.findByName(roleName.toUpperCase())
                        .orElseThrow(() -> new RuntimeException("Erreur: Le rôle " + roleName + " n'existe pas."));
                userRoles.add(role);
            }
        }
        user.setRoles(userRoles);
        userRepository.save(user);

        return ResponseEntity.ok("Utilisateur enregistré avec succès.");
    }

    @PostMapping("/login")
    private ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            System.out.println("Tentative de connexion avec email : " + loginRequest.getEmail());

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );

            User user = userRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

            List<String> roles = user.getRoles()
                    .stream()
                    .map(role -> role.getRole())
                    .collect(Collectors.toList());

            String token = jwtUtil.generateToken(user.getEmail(),roles);

            return ResponseEntity.ok(new AuthResponse(token,roles));

        } catch (AuthenticationException e) {
            System.out.println("Erreur d'authentification : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou mot de passe incorrect");
        }
    }
}
