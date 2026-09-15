package com.plateforme.streaming.service;

import com.plateforme.streaming.model.HistoriqueEmail;
import com.plateforme.streaming.model.Utilisateur;
import com.plateforme.streaming.model.enums.StatutEmail;
import com.plateforme.streaming.model.enums.TypeEmail;
import com.plateforme.streaming.repository.HistoriqueEmailRepository;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.io.File;
import java.nio.file.Path;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;
    private final HistoriqueEmailRepository historiqueEmailRepository;

    @Value("${spring.mail.username:noreply@plateforme-streaming.local}")
    private String expediteur;

    @Async
    public void envoyerEmailActivation(Utilisateur utilisateur, String code, int dureeValiditeMinutes) {
        String sujet = "Votre code d'activation";
        Context context = new Context();
        context.setVariable("nom", utilisateur.getNom());
        context.setVariable("code", code);
        context.setVariable("dureeValiditeMinutes", dureeValiditeMinutes);
        envoyer(utilisateur, utilisateur.getEmail(), sujet, "email/activation-email", context,
                TypeEmail.ACTIVATION, null);
    }

    @Async
    public void envoyerEmailConfirmationEnvoi(Utilisateur utilisateur, String nomFichier, Path cheminFichier) {
        String sujet = "Confirmation d'envoi : " + nomFichier;
        Context context = new Context();
        context.setVariable("nom", utilisateur.getNom());
        context.setVariable("nomFichier", nomFichier);
        envoyer(utilisateur, utilisateur.getEmail(), sujet, "email/confirmation-email", context,
                TypeEmail.CONFIRMATION_ENVOI, cheminFichier != null ? cheminFichier.toFile() : null);
    }

    @Async
    public void envoyerEmailSauvegardeQuotidienne(Utilisateur utilisateur, File archiveZip) {
        String sujet = "Votre sauvegarde quotidienne";
        Context context = new Context();
        context.setVariable("nom", utilisateur.getNom());
        envoyer(utilisateur, utilisateur.getEmail(), sujet, "email/sauvegarde-email", context,
                TypeEmail.SAUVEGARDE_QUOTIDIENNE, archiveZip);
    }

    private void envoyer(Utilisateur utilisateur, String destinataire, String sujet, String template,
                          Context context, TypeEmail type, File piecJointe) {
        StatutEmail statut;
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, piecJointe != null, "UTF-8");
            String contenuHtml = templateEngine.process(template, context);

            helper.setFrom(expediteur);
            helper.setTo(destinataire);
            helper.setSubject(sujet);
            helper.setText(contenuHtml, true);

            if (piecJointe != null && piecJointe.exists()) {
                helper.addAttachment(piecJointe.getName(), piecJointe);
            }

            mailSender.send(message);
            statut = StatutEmail.REUSSI;
        } catch (Exception e) {
            log.error("Echec de l'envoi de l'email ({}) a {}", type, destinataire, e);
            statut = StatutEmail.ECHEC;
        }

        HistoriqueEmail historique = HistoriqueEmail.builder()
                .destinataire(destinataire)
                .sujet(sujet)
                .type(type)
                .statut(statut)
                .utilisateur(utilisateur)
                .build();
        historiqueEmailRepository.save(historique);
    }
}
