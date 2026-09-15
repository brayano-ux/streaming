package com.plateforme.streaming.dto;

import com.plateforme.streaming.model.enums.TypeReaction;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ReactionForm {

    @NotNull
    private TypeReaction type;
}
