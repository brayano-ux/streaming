package com.plateforme.streaming.util;

import com.plateforme.streaming.model.Utilisateur;
import com.plateforme.streaming.repository.UtilisateurRepository;
import com.plateforme.streaming.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

// Permet de retrouver l'Utilisateur courant, qu'il se soit connecte
// en classique (email/mot de passe) ou via Google OAuth2.
@Component
@RequiredArgsConstructor
public class AuthenticatedUserResolver {

    private final UtilisateurRepository utilisateurRepository;

    public Utilisateur resolve(Authentication authentication) {
        if (authentication == null) {
            return null;
        }
        Object principal = authentication.getPrincipal();

        if (principal instanceof CustomUserDetails customUserDetails) {
            return customUserDetails.getUtilisateur();
        }

        if (principal instanceof OAuth2User oAuth2User) {
            String email = oAuth2User.getAttribute("email");
            if (email != null) {
                return utilisateurRepository.findByEmail(email).orElse(null);
            }
        }
        return null;
    }
}
