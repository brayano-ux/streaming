package com.plateforme.streaming.controller;

import com.plateforme.streaming.dto.CommentaireForm;
import com.plateforme.streaming.dto.ReactionForm;
import com.plateforme.streaming.model.Fichier;
import com.plateforme.streaming.model.Utilisateur;
import com.plateforme.streaming.model.enums.TypeMedia;
import com.plateforme.streaming.service.CommentaireService;
import com.plateforme.streaming.service.FichierService;
import com.plateforme.streaming.service.ReactionService;
import com.plateforme.streaming.service.StorageService;
import com.plateforme.streaming.util.AuthenticatedUserResolver;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class FichierPageController {

    private final FichierService fichierService;
    private final CommentaireService commentaireService;
    private final ReactionService reactionService;
    private final StorageService storageService;
    private final AuthenticatedUserResolver authenticatedUserResolver;

    @GetMapping("/dashboard")
    public String dashboard(@RequestParam(required = false) TypeMedia type,
                             Authentication authentication, Model model) {
        Utilisateur utilisateur = authenticatedUserResolver.resolve(authentication);
        List<Fichier> fichiers = fichierService.listerFichiers(utilisateur, type);

        model.addAttribute("utilisateur", utilisateur);
        model.addAttribute("fichiers", fichiers);
        model.addAttribute("ongletActif", type != null ? type.name() : "TOUS");
        return "dashboard";
    }

    @PostMapping("/fichiers/upload")
    public String uploader(@RequestParam("fichier") MultipartFile fichier,
                            @RequestParam TypeMedia typeMedia,
                            Authentication authentication, Model model) {
        Utilisateur utilisateur = authenticatedUserResolver.resolve(authentication);
        try {
            fichierService.deposerFichier(utilisateur, fichier, typeMedia);
        } catch (IOException | RuntimeException e) {
            model.addAttribute("erreurUpload", e.getMessage());
            List<Fichier> fichiers = fichierService.listerFichiers(utilisateur, null);
            model.addAttribute("utilisateur", utilisateur);
            model.addAttribute("fichiers", fichiers);
            model.addAttribute("ongletActif", "TOUS");
            return "dashboard";
        }
        return "redirect:/dashboard?type=" + typeMedia;
    }

    @GetMapping("/fichiers/{id}")
    public String details(@PathVariable Long id, Authentication authentication, Model model) {
        Utilisateur utilisateur = authenticatedUserResolver.resolve(authentication);
        Fichier fichier = fichierService.getFichierAccessible(id, utilisateur);

        model.addAttribute("fichier", fichier);
        model.addAttribute("commentaires", commentaireService.listerCommentaires(fichier));
        model.addAttribute("totaux", reactionService.getTotaux(fichier, utilisateur));
        model.addAttribute("commentaireForm", new CommentaireForm());
        return "fichier-details";
    }

    @GetMapping("/fichiers/{id}/telecharger")
    @ResponseBody
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

    @PostMapping("/fichiers/{id}/commentaires")
    public String ajouterCommentaire(@PathVariable Long id, @ModelAttribute CommentaireForm commentaireForm,
                                      Authentication authentication) {
        Utilisateur utilisateur = authenticatedUserResolver.resolve(authentication);
        Fichier fichier = fichierService.getFichierAccessible(id, utilisateur);
        commentaireService.ajouterCommentaire(fichier, utilisateur, commentaireForm.getContenu());
        return "redirect:/fichiers/" + id;
    }

    @PostMapping("/fichiers/{id}/reactions")
    public String reagir(@PathVariable Long id, @ModelAttribute ReactionForm reactionForm,
                          Authentication authentication) {
        Utilisateur utilisateur = authenticatedUserResolver.resolve(authentication);
        Fichier fichier = fichierService.getFichierAccessible(id, utilisateur);
        reactionService.reagir(fichier, utilisateur, reactionForm.getType());
        return "redirect:/fichiers/" + id;
    }
}
