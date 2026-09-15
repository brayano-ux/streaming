package com.plateforme.streaming.controller.api;

import com.plateforme.streaming.dto.ReactionForm;
import com.plateforme.streaming.dto.ReactionTotalDto;
import com.plateforme.streaming.model.Fichier;
import com.plateforme.streaming.model.Utilisateur;
import com.plateforme.streaming.service.FichierService;
import com.plateforme.streaming.service.ReactionService;
import com.plateforme.streaming.util.AuthenticatedUserResolver;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/fichiers/{id}/reactions")
@RequiredArgsConstructor
@Tag(name = "Reactions", description = "Aime / n'aime pas sur un fichier")
public class ReactionApiController {

    private final FichierService fichierService;
    private final ReactionService reactionService;
    private final AuthenticatedUserResolver authenticatedUserResolver;

    @PostMapping
    @Operation(summary = "Ajouter ou changer sa reaction (aime / n'aime pas)")
    public ResponseEntity<ReactionTotalDto> reagir(@PathVariable Long id,
                                                     @Valid @RequestBody ReactionForm form,
                                                     Authentication authentication) {
        Utilisateur utilisateur = authenticatedUserResolver.resolve(authentication);
        Fichier fichier = fichierService.getFichierAccessible(id, utilisateur);
        reactionService.reagir(fichier, utilisateur, form.getType());
        return ResponseEntity.ok(reactionService.getTotaux(fichier, utilisateur));
    }

    @GetMapping
    @Operation(summary = "Obtenir le total des reactions d'un fichier")
    public ResponseEntity<ReactionTotalDto> totaux(@PathVariable Long id, Authentication authentication) {
        Utilisateur utilisateur = authenticatedUserResolver.resolve(authentication);
        Fichier fichier = fichierService.getFichierAccessible(id, utilisateur);
        return ResponseEntity.ok(reactionService.getTotaux(fichier, utilisateur));
    }
}
