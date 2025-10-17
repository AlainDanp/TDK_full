package com.tdk.backend_tdk.DTO;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Data
public class RegisterDTO {
    private String username;
    private String password;
    private String email;
    private String nom;
    private String prenom;
    private String phoneNumber;
    private String sexe;
    private String dateNaissance;
    private String dateInscription;
    private String role;
    private Set<String> roles = new HashSet<>();

    public void setUsername(String username){
        this.username = username;
    }
    public void setPassword(String password){
        this.password = password;
    }
    public void setEmail(String email){
        this.email = email;
    }
    public Set<String> getRoles(){
        if (roles == null || roles.isEmpty()) {
            roles = new HashSet<>();
            roles.add("USER");
        }
        return roles;
    }



    public void setNom(String nom){
        this.nom = nom;
    }
    public void setPrenom(String prenom){
        this.prenom = prenom;
    }
    public void setphoneNumber(String phoneNumber){
        this.phoneNumber = phoneNumber;
    }
    public void setSexe(String sexe){
        this.sexe = sexe;
    }
    public void setDateNaissance(String dateNaissance){
        this.dateNaissance = dateNaissance;
    }
    public void setDateInscription(String dateInscription){
        this.dateInscription = dateInscription;
    }
    public String getUsername(){
        return username;
    }
    public String getPassword(){
        return password;
    }
    public String getEmail(){
        return email;
    }

    public String getNom() {
        return nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public String getphoneNumber() {
        return phoneNumber;
    }

    public String getSexe() {
        return sexe;
    }

    public String getDateNaissance() {
        return dateNaissance;
    }

    public String getDateInscription() {
        return dateInscription;
    }
    public void setRoles(Set<String> roles) {
        this.roles = (roles == null ? new HashSet<>() : roles);
    }
}
