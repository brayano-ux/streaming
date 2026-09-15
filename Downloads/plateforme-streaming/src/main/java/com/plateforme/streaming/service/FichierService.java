package com.plateforme.streaming.service;

import com.plateforme.streaming.model.Fichier;
import com.plateforme.streaming.model.Utilisateur;
import com.plateforme.streaming.model.enums.TypeMedia;
import com.plateforme.streaming.repository.FichierRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FichierService {

    private final FichierRepository fichierRepository;
    private final StorageService storageService;
    private final EmailService emailService;

    public static class FichierIntrouvableException extends RuntimeException {
        public FichierIntrouvableException(String message) { super(message); }
    }

    public static class TypeMediaInvalideException extends RuntimeException {
        public TypeMediaInvalideException(String message) { super(message); }
    }

    @Transactional
    public Fichier deposerFichier(Utilisateur utilisateur, MultipartFile fichierMultipart, TypeMedia typeMedia)
            throws IOException {
        validerType(fichierMultipart, typeMedia);

        String nomStocke = storageService.stockerFichier(utilisateur.getId(), fichierMultipart);
        Path chemin = storageService.getCheminFichier(utilisateur.getId(), nomStocke);

        Fichier fichier = Fichier.builder()
                .nomOriginal(fichierMultipart.getOriginalFilename())
                .nomStocke(nomStocke)
                .typeMedia(typeMedia)
                .typeMime(fichierMultipart.getContentType())
                .taille(fichierMultipart.getSize())
                .cheminStockage(chemin.toString())
                .utilisateur(utilisateur)
                .build();
        fichier = fichierRepository.save(fichier);

        // copie envoyee par email en confirmation, des l'envoi
        emailService.envoyerEmailConfirmationEnvoi(utilisateur, fichier.getNomOriginal(), chemin);

        return fichier;
    }

    private void validerType(MultipartFile fichier, TypeMedia typeMedia) {
        String mime = fichier.getContentType();
        if (mime == null) {
            throw new TypeMediaInvalideException("Type de fichier non reconnu");
        }
        boolean valide = switch (typeMedia) {
            case VIDEO -> mime.startsWith("video/");
            case PHOTO -> mime.startsWith("image/");
            case MUSIQUE -> mime.startsWith("audio/");
        };
        if (!valide) {
            throw new TypeMediaInvalideException("Le fichier envoye ne correspond pas au type " + typeMedia);
        }
    }

    public List<Fichier> listerFichiers(Utilisateur utilisateur, TypeMedia typeMedia) {
        if (typeMedia == null) {
            return fichierRepository.findByUtilisateurOrderByDateUploadDesc(utilisateur);
        }
        return fichierRepository.findByUtilisateurAndTypeMediaOrderByDateUploadDesc(utilisateur, typeMedia);
    }

    public Fichier getFichierAccessible(Long id, Utilisateur utilisateur) {
        Fichier fichier = fichierRepository.findById(id)
                .orElseThrow(() -> new FichierIntrouvableException("Fichier introuvable"));
        if (!fichier.getUtilisateur().getId().equals(utilisateur.getId())) {
            throw new FichierIntrouvableException("Fichier introuvable");
        }
        return fichier;
    }
}
