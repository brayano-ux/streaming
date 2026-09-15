package com.plateforme.streaming.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class VerificationForm {

    @NotBlank
    private String email;

    @NotBlank(message = "Le code est obligatoire")
    private String code;
}
