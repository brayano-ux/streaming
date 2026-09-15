package com.plateforme.streaming.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "codes_activation")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CodeActivation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 6)
    private String code;

    @Column(nullable = false)
    private LocalDateTime dateGeneration;

    @Column(nullable = false)
    private LocalDateTime dateExpiration;

    @Column(nullable = false)
    @Builder.Default
    private boolean utilise = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "utilisateur_id", nullable = false)
    private Utilisateur utilisateur;
}
