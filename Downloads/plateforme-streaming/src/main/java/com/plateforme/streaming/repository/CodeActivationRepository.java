package com.plateforme.streaming.repository;

import com.plateforme.streaming.model.CodeActivation;
import com.plateforme.streaming.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CodeActivationRepository extends JpaRepository<CodeActivation, Long> {
    Optional<CodeActivation> findFirstByUtilisateurAndCodeAndUtiliseFalseOrderByDateGenerationDesc(
            Utilisateur utilisateur, String code);

    Optional<CodeActivation> findFirstByUtilisateurOrderByDateGenerationDesc(Utilisateur utilisateur);
}
