package com.plateforme.streaming.model;

import com.plateforme.streaming.model.enums.StatutEmail;
import com.plateforme.streaming.model.enums.TypeEmail;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "historique_emails")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HistoriqueEmail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String destinataire;

    @Column(nullable = false)
    private String sujet;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TypeEmail type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatutEmail statut;

    @Column(nullable = false)
    @Builder.Default
    private LocalDateTime dateEnvoi = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "utilisateur_id")
    private Utilisateur utilisateur;
}
