package com.plateforme.streaming.service;

import com.plateforme.streaming.dto.InscriptionForm;
import com.plateforme.streaming.model.CodeActivation;
import com.plateforme.streaming.model.Utilisateur;
import com.plateforme.streaming.model.enums.MethodeConnexion;
import com.plateforme.streaming.repository.CodeActivationRepository;
import com.plateforme.streaming.repository.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private static final int DUREE_VALIDITE_MINUTES = 15;
    private static final SecureRandom RANDOM = new SecureRandom();

    private final UtilisateurRepository utilisateurRepository;
    private final CodeActivationRepository codeActivationRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public static class EmailDejaUtiliseException extends RuntimeException {
        public EmailDejaUtiliseException(String message) { super(message); }
    }
    public static class CodeInvalideException extends RuntimeException {
        public CodeInvalideException(String message) { super(message); }
    }
    public static class CompteIntrouvableException extends RuntimeException {
        public CompteIntrouvableException(String message) { super(message); }
    }

    @Transactional
    public Utilisateur inscrire(InscriptionForm form) {
        if (utilisateurRepository.existsByEmail(form.getEmail())) {
            throw new EmailDejaUtiliseException("Un compte existe deja avec cet email");
        }

        Utilisateur utilisateur = Utilisateur.builder()
                .nom(form.getNom())
                .email(form.getEmail())
                .motDePasse(passwordEncoder.encode(form.getMotDePasse()))
                .methodeConnexion(MethodeConnexion.EMAIL)
                .compteActif(false)
                .build();
        utilisateur = utilisateurRepository.save(utilisateur);

        genererEtEnvoyerCode(utilisateur);
        return utilisateur;
    }

    @Transactional
    public void renvoyerCode(String email) {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(email)
                .orElseThrow(() -> new CompteIntrouvableException("Aucun compte pour cet email"));
        if (utilisateur.isCompteActif()) {
            return;
        }
        genererEtEnvoyerCode(utilisateur);
    }

    private void genererEtEnvoyerCode(Utilisateur utilisateur) {
        String code = String.format("%06d", RANDOM.nextInt(1_000_000));
        CodeActivation codeActivation = CodeActivation.builder()
                .code(code)
                .dateGeneration(LocalDateTime.now())
                .dateExpiration(LocalDateTime.now().plusMinutes(DUREE_VALIDITE_MINUTES))
                .utilise(false)
                .utilisateur(utilisateur)
                .build();
        codeActivationRepository.save(codeActivation);
        emailService.envoyerEmailActivation(utilisateur, code, DUREE_VALIDITE_MINUTES);
    }

    @Transactional
    public void verifierCode(String email, String code) {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(email)
                .orElseThrow(() -> new CompteIntrouvableException("Aucun compte pour cet email"));

        CodeActivation codeActivation = codeActivationRepository
                .findFirstByUtilisateurAndCodeAndUtiliseFalseOrderByDateGenerationDesc(utilisateur, code)
                .orElseThrow(() -> new CodeInvalideException("Code invalide"));

        if (codeActivation.getDateExpiration().isBefore(LocalDateTime.now())) {
            throw new CodeInvalideException("Ce code a expire, demandez-en un nouveau");
        }

        codeActivation.setUtilise(true);
        codeActivationRepository.save(codeActivation);

        utilisateur.setCompteActif(true);
        utilisateurRepository.save(utilisateur);
    }
}
