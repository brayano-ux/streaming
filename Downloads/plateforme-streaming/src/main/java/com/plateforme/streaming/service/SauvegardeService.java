package com.plateforme.streaming.service;

import com.plateforme.streaming.model.Utilisateur;
import com.plateforme.streaming.repository.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

// Tache planifiee cote serveur : une fois par jour, sans action de l'utilisateur,
// rassemble tous les fichiers de chaque utilisateur actif dans une archive zip
// et l'envoie par email (sauvegarde de securite).
@Service
@RequiredArgsConstructor
@Slf4j
public class SauvegardeService {

    private final UtilisateurRepository utilisateurRepository;
    private final StorageService storageService;
    private final EmailService emailService;

    // Tous les jours a 03h00
    @Scheduled(cron = "0 0 3 * * *")
    public void executerSauvegardeQuotidienne() {
        List<Utilisateur> utilisateursActifs = utilisateurRepository.findByCompteActifTrue();
        log.info("Debut de la sauvegarde quotidienne pour {} utilisateur(s) actif(s)", utilisateursActifs.size());
        for (Utilisateur utilisateur : utilisateursActifs) {
            try {
                sauvegarderUtilisateur(utilisateur);
            } catch (Exception e) {
                log.error("Echec de la sauvegarde quotidienne pour l'utilisateur {}", utilisateur.getEmail(), e);
            }
        }
    }

    public void sauvegarderUtilisateur(Utilisateur utilisateur) throws IOException {
        Path dossierUtilisateur = storageService.getDossierUtilisateur(utilisateur.getId());
        if (!Files.exists(dossierUtilisateur) || !Files.isDirectory(dossierUtilisateur)) {
            log.info("Aucun fichier a sauvegarder pour {}", utilisateur.getEmail());
            return;
        }

        File archive = File.createTempFile("sauvegarde-" + utilisateur.getId() + "-", ".zip");
        try (ZipOutputStream zos = new ZipOutputStream(new FileOutputStream(archive))) {
            try (var fichiers = Files.list(dossierUtilisateur)) {
                for (Path fichier : fichiers.toList()) {
                    if (Files.isRegularFile(fichier)) {
                        zos.putNextEntry(new ZipEntry(fichier.getFileName().toString()));
                        Files.copy(fichier, zos);
                        zos.closeEntry();
                    }
                }
            }
        }

        emailService.envoyerEmailSauvegardeQuotidienne(utilisateur, archive);
        archive.deleteOnExit();
    }
}
