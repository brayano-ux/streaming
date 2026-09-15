package com.plateforme.streaming.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ReactionTotalDto {
    private long totalAime;
    private long totalPasAime;
    private String maReaction; // AIME, PAS_AIME ou null
}
