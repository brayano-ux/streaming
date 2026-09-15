package com.plateforme.streaming.controller.api;

import com.plateforme.streaming.dto.InscriptionForm;
import com.plateforme.streaming.dto.RenvoiCodeForm;
import com.plateforme.streaming.dto.VerificationForm;
import com.plateforme.streaming.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

// Remarque : /api/auth/connexion est en realite gere par Spring Security
// (formLogin.loginProcessingUrl), il est documente ici a titre indicatif.
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Authentification", description = "Inscription, activation et connexion")
public class AuthApiController {

    private final AuthService authService;

    @PostMapping("/inscription")
    @Operation(summary = "Creer un compte (email + mot de passe), inactif jusqu'a validation du code")
    public ResponseEntity<?> inscription(@Valid @RequestBody InscriptionForm form) {
        authService.inscrire(form);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "Compte cree, code d'activation envoye par email"));
    }

    @PostMapping("/verification-code")
    @Operation(summary = "Valider le code d'activation recu par email")
    public ResponseEntity<?> verificationCode(@Valid @RequestBody VerificationForm form) {
        authService.verifierCode(form.getEmail(), form.getCode());
        return ResponseEntity.ok(Map.of("message", "Compte active avec succes"));
    }

    @PostMapping("/renvoi-code")
    @Operation(summary = "Redemander un nouveau code d'activation")
    public ResponseEntity<?> renvoiCode(@Valid @RequestBody RenvoiCodeForm form) {
        authService.renvoyerCode(form.getEmail());
        return ResponseEntity.ok(Map.of("message", "Nouveau code envoye"));
    }
}
