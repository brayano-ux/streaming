package com.plateforme.streaming.service;

import com.plateforme.streaming.model.Commentaire;
import com.plateforme.streaming.model.Fichier;
import com.plateforme.streaming.model.Utilisateur;
import com.plateforme.streaming.repository.CommentaireRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentaireService {

    private final CommentaireRepository commentaireRepository;

    public Commentaire ajouterCommentaire(Fichier fichier, Utilisateur utilisateur, String contenu) {
        Commentaire commentaire = Commentaire.builder()
                .contenu(contenu)
                .fichier(fichier)
                .utilisateur(utilisateur)
                .build();
        return commentaireRepository.save(commentaire);
    }

    public List<Commentaire> listerCommentaires(Fichier fichier) {
        return commentaireRepository.findByFichierOrderByDateCommentaireAsc(fichier);
    }
}
