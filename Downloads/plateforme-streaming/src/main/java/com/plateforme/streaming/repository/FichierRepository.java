package com.plateforme.streaming.repository;

import com.plateforme.streaming.model.Fichier;
import com.plateforme.streaming.model.Utilisateur;
import com.plateforme.streaming.model.enums.TypeMedia;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FichierRepository extends JpaRepository<Fichier, Long> {
    List<Fichier> findByUtilisateurOrderByDateUploadDesc(Utilisateur utilisateur);
    List<Fichier> findByUtilisateurAndTypeMediaOrderByDateUploadDesc(Utilisateur utilisateur, TypeMedia typeMedia);
}
