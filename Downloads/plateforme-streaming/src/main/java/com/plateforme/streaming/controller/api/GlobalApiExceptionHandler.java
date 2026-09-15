package com.plateforme.streaming.controller.api;

import com.plateforme.streaming.service.AuthService;
import com.plateforme.streaming.service.FichierService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice(basePackages = "com.plateforme.streaming.controller.api")
public class GlobalApiExceptionHandler {

    @ExceptionHandler(AuthService.EmailDejaUtiliseException.class)
    public ResponseEntity<Map<String, String>> emailDejaUtilise(AuthService.EmailDejaUtiliseException e) {
        return erreur(HttpStatus.CONFLICT, e.getMessage());
    }

    @ExceptionHandler({AuthService.CodeInvalideException.class, AuthService.CompteIntrouvableException.class})
    public ResponseEntity<Map<String, String>> authErreur(RuntimeException e) {
        return erreur(HttpStatus.BAD_REQUEST, e.getMessage());
    }

    @ExceptionHandler(FichierService.FichierIntrouvableException.class)
    public ResponseEntity<Map<String, String>> fichierIntrouvable(FichierService.FichierIntrouvableException e) {
        return erreur(HttpStatus.NOT_FOUND, e.getMessage());
    }

    @ExceptionHandler(FichierService.TypeMediaInvalideException.class)
    public ResponseEntity<Map<String, String>> typeInvalide(FichierService.TypeMediaInvalideException e) {
        return erreur(HttpStatus.BAD_REQUEST, e.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> validation(MethodArgumentNotValidException e) {
        Map<String, String> erreurs = new HashMap<>();
        for (FieldError fieldError : e.getBindingResult().getFieldErrors()) {
            erreurs.put(fieldError.getField(), fieldError.getDefaultMessage());
        }
        return ResponseEntity.badRequest().body(erreurs);
    }

    private ResponseEntity<Map<String, String>> erreur(HttpStatus status, String message) {
        return ResponseEntity.status(status).body(Map.of("erreur", message));
    }
}
