package com.plateforme.streaming.controller.api;

import com.plateforme.streaming.model.Commentaire;
import com.plateforme.streaming.model.Fichier;
import com.plateforme.streaming.model.Utilisateur;
import com.plateforme.streaming.model.enums.TypeMedia;
import com.plateforme.streaming.service.CommentaireService;
import com.plateforme.streaming.service.FichierService;
import com.plateforme.streaming.util.AuthenticatedUserResolver;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/fichiers")
@RequiredArgsConstructor
@Tag(name = "Fichiers", description = "Depot, consultation et telechargement des videos, photos et musiques")
public class FichierApiController {

    private final FichierService fichierService;
    private final CommentaireService commentaireService;
    private final com.plateforme.streaming.service.StorageService storageService;
    private final AuthenticatedUserResolver authenticatedUserResolver;

    @PostMapping
    @Operation(summary = "Envoyer un fichier (declenche l'email de confirmation)")
    public ResponseEntity<Fichier> deposer(@RequestParam("fichier") MultipartFile fichier,
                                            @RequestParam TypeMedia typeMedia,
                                            Authentication authentication) throws IOException {
        Utilisateur utilisateur = authenticatedUserResolver.resolve(authentication);
        Fichier cree = fichierService.deposerFichier(utilisateur, fichier, typeMedia);
        return ResponseEntity.ok(cree);
    }

    @GetMapping
    @Operation(summary = "Lister les fichiers, filtres par type (VIDEO, PHOTO ou MUSIQUE)")
    public ResponseEntity<List<Fichier>> lister(@RequestParam(required = false) TypeMedia type,
                                                 Authentication authentication) {
        Utilisateur utilisateur = authenticatedUserResolver.resolve(authentication);
        return ResponseEntity.ok(fichierService.listerFichiers(utilisateur, type));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Consulter les informations d'un fichier")
    public ResponseEntity<Fichier> consulter(@PathVariable Long id, Authentication authentication) {
        Utilisateur utilisateur = authenticatedUserResolver.resolve(authentication);
        return ResponseEntity.ok(fichierService.getFichierAccessible(id, utilisateur));
    }

    @GetMapping("/{id}/telecharger")
    @Operation(summary = "Telecharger ou lire le fichier")
    public ResponseEntity<Resource> telecharger(@PathVariable Long id, Authentication authentication) {
        Utilisateur utilisateur = authenticatedUserResolver.resolve(authentication);
        Fichier fichier = fichierService.getFichierAccessible(id, utilisateur);
        Path chemin = storageService.getCheminFichier(utilisateur.getId(), fichier.getNomStocke());
        Resource resource = new FileSystemResource(chemin);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(fichier.getTypeMime()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fichier.getNomOriginal() + "\"")
                .body(resource);
    }

    @PostMapping("/{id}/commentaires")
    @Operation(summary = "Ajouter un commentaire a un fichier")
    public ResponseEntity<Commentaire> ajouterCommentaire(@PathVariable Long id,
                                                            @RequestBody Map contenu,
                                                            Authentication authentication) {
        Utilisateur utilisateur = authenticatedUserResolver.resolve(authentication);
        Fichier fichier = fichierService.getFichierAccessible(id, utilisateur);
        String texte = String.valueOf(contenu.get("contenu"));
        return ResponseEntity.ok(commentaireService.ajouterCommentaire(fichier, utilisateur, texte));
    }

    @GetMapping("/{id}/commentaires")
    @Operation(summary = "Lister les commentaires d'un fichier")
    public ResponseEntity<List<Commentaire>> listerCommentaires(@PathVariable Long id, Authentication authentication) {
        Utilisateur utilisateur = authenticatedUserResolver.resolve(authentication);
        Fichier fichier = fichierService.getFichierAccessible(id, utilisateur);
        return ResponseEntity.ok(commentaireService.listerCommentaires(fichier));
    }
}
