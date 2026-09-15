package com.plateforme.streaming.repository;

import com.plateforme.streaming.model.Commentaire;
import com.plateforme.streaming.model.Fichier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentaireRepository extends JpaRepository<Commentaire, Long> {
    List<Commentaire> findByFichierOrderByDateCommentaireAsc(Fichier fichier);
}
