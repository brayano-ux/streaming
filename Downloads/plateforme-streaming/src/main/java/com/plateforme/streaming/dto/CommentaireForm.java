package com.plateforme.streaming.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CommentaireForm {

    @NotBlank(message = "Le commentaire ne peut pas etre vide")
    private String contenu;
}
