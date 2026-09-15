package com.plateforme.streaming.controller;

import com.plateforme.streaming.dto.InscriptionForm;
import com.plateforme.streaming.dto.VerificationForm;
import com.plateforme.streaming.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
public class AuthPageController {

    private final AuthService authService;

    @GetMapping("/connexion")
    public String pageConnexion() {
        return "connexion";
    }

    @GetMapping("/inscription")
    public String pageInscription(Model model) {
        model.addAttribute("inscriptionForm", new InscriptionForm());
        return "inscription";
    }

    @PostMapping("/inscription")
    public String traiterInscription(@Valid @ModelAttribute InscriptionForm inscriptionForm,
                                      BindingResult bindingResult, Model model) {
        if (bindingResult.hasErrors()) {
            return "inscription";
        }
        try {
            authService.inscrire(inscriptionForm);
        } catch (AuthService.EmailDejaUtiliseException e) {
            model.addAttribute("erreur", e.getMessage());
            return "inscription";
        }
        return "redirect:/verification?email=" + inscriptionForm.getEmail();
    }

    @GetMapping("/verification")
    public String pageVerification(@RequestParam String email, Model model) {
        VerificationForm form = new VerificationForm();
        form.setEmail(email);
        model.addAttribute("verificationForm", form);
        return "verification";
    }

    @PostMapping("/verification")
    public String traiterVerification(@Valid @ModelAttribute VerificationForm verificationForm,
                                       BindingResult bindingResult, Model model) {
        if (bindingResult.hasErrors()) {
            return "verification";
        }
        try {
            authService.verifierCode(verificationForm.getEmail(), verificationForm.getCode());
        } catch (RuntimeException e) {
            model.addAttribute("erreur", e.getMessage());
            return "verification";
        }
        return "redirect:/connexion?active";
    }

    @PostMapping("/verification/renvoi")
    public String renvoyerCode(@RequestParam String email, Model model) {
        authService.renvoyerCode(email);
        model.addAttribute("info", "Un nouveau code a ete envoye");
        VerificationForm form = new VerificationForm();
        form.setEmail(email);
        model.addAttribute("verificationForm", form);
        return "verification";
    }
}
