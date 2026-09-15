package com.plateforme.streaming.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RenvoiCodeForm {

    @NotBlank
    @Email
    private String email;
}
