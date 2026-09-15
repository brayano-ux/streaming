package com.plateforme.streaming.model;

import com.plateforme.streaming.model.enums.TypeMedia;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "fichiers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Fichier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nomOriginal;

    // nom unique sur le disque
    @Column(nullable = false, unique = true)
    private String nomStocke;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TypeMedia typeMedia;

    @Column(nullable = false)
    private String typeMime;

    @Column(nullable = false)
    private Long taille;

    @Column(nullable = false)
    private String cheminStockage;

    @Column(nullable = false)
    @Builder.Default
    private LocalDateTime dateUpload = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "utilisateur_id", nullable = false)
    private Utilisateur utilisateur;

    @OneToMany(mappedBy = "fichier", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Commentaire> commentaires = new ArrayList<>();

    @OneToMany(mappedBy = "fichier", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Reaction> reactions = new ArrayList<>();
}
