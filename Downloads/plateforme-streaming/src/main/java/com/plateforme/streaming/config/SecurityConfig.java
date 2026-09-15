package com.plateforme.streaming.config;

import com.plateforme.streaming.security.CustomOAuth2UserService;
import com.plateforme.streaming.security.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomUserDetailsService customUserDetailsService;
    private final CustomOAuth2UserService customOAuth2UserService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(customUserDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                        "/", "/accueil",
                        "/inscription/**", "/verification/**", "/connexion",
                        "/oauth2/**", "/login/**",
                        "/css/**", "/js/**",
                        "/api/auth/**",
                        "/swagger-ui/**", "/v3/api-docs/**",
                        "/h2-console/**"
                ).permitAll()
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginPage("/connexion")
                .loginProcessingUrl("/api/auth/connexion")
                .defaultSuccessUrl("/dashboard", true)
                .failureUrl("/connexion?erreur")
                .permitAll()
            )
            .oauth2Login(oauth2 -> oauth2
                .loginPage("/connexion")
                // Aligne les URLs OAuth2 sur celles du sujet :
                // GET /api/auth/connexion-google et GET /api/auth/callback-google
                .authorizationEndpoint(authorization -> authorization.baseUri("/api/auth/connexion-google"))
                .redirectionEndpoint(redirection -> redirection.baseUri("/api/auth/callback-google"))
                .userInfoEndpoint(userInfo -> userInfo.userService(customOAuth2UserService))
                .defaultSuccessUrl("/dashboard", true)
            )
            .logout(logout -> logout
                .logoutUrl("/api/auth/deconnexion")
                .logoutSuccessUrl("/connexion?deconnexion")
                .permitAll()
            )
            .authenticationProvider(authenticationProvider())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
            .csrf(csrf -> csrf.ignoringRequestMatchers("/api/**", "/h2-console/**"))
            .headers(headers -> headers.frameOptions(frame -> frame.sameOrigin()));

        return http.build();
    }
}
