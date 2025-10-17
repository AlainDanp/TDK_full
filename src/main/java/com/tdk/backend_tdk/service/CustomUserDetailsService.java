package com.tdk.backend_tdk.service;

import com.tdk.backend_tdk.model.User;
import com.tdk.backend_tdk.model.Role;
import com.tdk.backend_tdk.Repository.UserRepository;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepo;

    Logger logger = Logger.getLogger(getClass().getName());
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        logger.info("Tentative de chargement d'un utilisateur avec email : " + email);

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> {
                    logger.info("Utilisateur non trouvé avec cet email !");
                    return new UsernameNotFoundException("Utilisateur non trouvé : " + email);
                });

        logger.info("Utilisateur trouvé : " + user.getEmail());
        logger.info("Mot de passe stocké en base : " + user.getPassword());
        logger.info("Rôles de l'utilisateur :" + user.getRoles());
        logger.info("Numéro identique : " + user.getPhoneNumber());
        if (user.getRoles() != null) {
            for (Role role : user.getRoles()) {
                if (role != null) {
                    logger.info("- " + role.getName());
                } else {
                    logger.info("- null");
                }
            }
        } else {
            logger.info("- aucun rôle");
        }

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                user.getRoles().stream()
                        .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getRole()))
                        .collect(Collectors.toList())
        );
    }
}
