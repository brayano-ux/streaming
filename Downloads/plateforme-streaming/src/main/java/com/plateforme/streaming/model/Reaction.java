package com.plateforme.streaming.model;

import com.plateforme.streaming.model.enums.TypeReaction;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

// Un utilisateur ne peut avoir qu'une seule reaction active par fichier
@Entity
@Table(name = "reactions", uniqueConstraints = @UniqueConstraint(columnNames = {"fichier_id", "utilisateur_id"}))
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TypeReaction type;

    @Column(nullable = false)
    @Builder.Default
    private LocalDateTime dateReaction = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fichier_id", nullable = false)
    private Fichier fichier;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "utilisateur_id", nullable = false)
    private Utilisateur utilisateur;
}
