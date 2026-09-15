package com.plateforme.streaming.service;

import com.plateforme.streaming.dto.ReactionTotalDto;
import com.plateforme.streaming.model.Fichier;
import com.plateforme.streaming.model.Reaction;
import com.plateforme.streaming.model.Utilisateur;
import com.plateforme.streaming.model.enums.TypeReaction;
import com.plateforme.streaming.repository.ReactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ReactionService {

    private final ReactionRepository reactionRepository;

    // un utilisateur ne peut avoir qu'une seule reaction active par fichier :
    // on cree, ou on met a jour / bascule la reaction existante.
    @Transactional
    public void reagir(Fichier fichier, Utilisateur utilisateur, TypeReaction type) {
        Reaction reaction = reactionRepository.findByFichierAndUtilisateur(fichier, utilisateur)
                .orElse(Reaction.builder().fichier(fichier).utilisateur(utilisateur).build());
        reaction.setType(type);
        reactionRepository.save(reaction);
    }

    public ReactionTotalDto getTotaux(Fichier fichier, Utilisateur utilisateur) {
        long totalAime = reactionRepository.countByFichierAndType(fichier, TypeReaction.AIME);
        long totalPasAime = reactionRepository.countByFichierAndType(fichier, TypeReaction.PAS_AIME);
        String maReaction = null;
        if (utilisateur != null) {
            maReaction = reactionRepository.findByFichierAndUtilisateur(fichier, utilisateur)
                    .map(r -> r.getType().name())
                    .orElse(null);
        }
        return new ReactionTotalDto(totalAime, totalPasAime, maReaction);
    }
}
