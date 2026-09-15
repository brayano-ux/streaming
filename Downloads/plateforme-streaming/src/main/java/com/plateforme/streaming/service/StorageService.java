package com.plateforme.streaming.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class StorageService {

    @Value("${application.stockage.dossier:uploads}")
    private String dossierRacine;

    // Chaque utilisateur a son propre sous-dossier, identifie par son id.
    public String stockerFichier(Long utilisateurId, MultipartFile fichier) throws IOException {
        Path dossierUtilisateur = getDossierUtilisateur(utilisateurId);
        Files.createDirectories(dossierUtilisateur);

        String extension = "";
        String nomOriginal = fichier.getOriginalFilename();
        if (nomOriginal != null && nomOriginal.contains(".")) {
            extension = nomOriginal.substring(nomOriginal.lastIndexOf("."));
        }
        String nomStocke = UUID.randomUUID() + extension;

        Path chemin = dossierUtilisateur.resolve(nomStocke);
        Files.copy(fichier.getInputStream(), chemin, StandardCopyOption.REPLACE_EXISTING);

        return nomStocke;
    }

    public Path getDossierUtilisateur(Long utilisateurId) {
        return Paths.get(dossierRacine, "utilisateur-" + utilisateurId);
    }

    public Path getCheminFichier(Long utilisateurId, String nomStocke) {
        return getDossierUtilisateur(utilisateurId).resolve(nomStocke);
    }
}
