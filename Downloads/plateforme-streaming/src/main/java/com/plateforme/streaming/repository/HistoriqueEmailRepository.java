package com.plateforme.streaming.repository;

import com.plateforme.streaming.model.HistoriqueEmail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HistoriqueEmailRepository extends JpaRepository<HistoriqueEmail, Long> {
}
