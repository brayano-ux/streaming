package com.plateforme.streaming.security;

import com.plateforme.streaming.model.Utilisateur;
import com.plateforme.streaming.model.enums.MethodeConnexion;
import com.plateforme.streaming.repository.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UtilisateurRepository utilisateurRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String email = oAuth2User.getAttribute("email");
        String nom = oAuth2User.getAttribute("name");

        if (email == null) {
            throw new OAuth2AuthenticationException("Aucun email fourni par Google");
        }

        Utilisateur utilisateur = utilisateurRepository.findByEmail(email).orElseGet(() -> {
            Utilisateur nouveau = Utilisateur.builder()
                    .nom(nom != null ? nom : email)
                    .email(email)
                    .motDePasse(null)
                    .methodeConnexion(MethodeConnexion.GOOGLE)
                    .compteActif(true) // un compte cree via Google est automatiquement actif
                    .build();
            return utilisateurRepository.save(nouveau);
        });

        utilisateur.setDerniereConnexion(LocalDateTime.now());
        utilisateurRepository.save(utilisateur);

        return oAuth2User;
    }
}
