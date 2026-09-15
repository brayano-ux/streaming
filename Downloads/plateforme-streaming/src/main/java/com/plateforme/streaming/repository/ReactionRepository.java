package com.plateforme.streaming.repository;

import com.plateforme.streaming.model.Fichier;
import com.plateforme.streaming.model.Reaction;
import com.plateforme.streaming.model.Utilisateur;
import com.plateforme.streaming.model.enums.TypeReaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReactionRepository extends JpaRepository<Reaction, Long> {
    Optional<Reaction> findByFichierAndUtilisateur(Fichier fichier, Utilisateur utilisateur);
    long countByFichierAndType(Fichier fichier, TypeReaction type);
}
