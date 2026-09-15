package com.plateforme.streaming.security;

import com.plateforme.streaming.model.Utilisateur;
import com.plateforme.streaming.repository.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UtilisateurRepository utilisateurRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Aucun compte pour cet email : " + email));
        if (utilisateur.getMotDePasse() == null) {
            // compte cree via Google, pas de connexion classique possible
            throw new UsernameNotFoundException("Ce compte utilise la connexion Google");
        }
        return new CustomUserDetails(utilisateur);
    }
}
