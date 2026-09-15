# Plateforme de streaming personnelle

Devoir pratique — espace média personnel (vidéos, photos, musique) : dépôt, lecture,
commentaires, réactions, email de confirmation à l'envoi, sauvegarde quotidienne automatique.

## Choix de frontend

**Thymeleaf** — pages générées côté serveur directement par Spring Boot (pas de projet
Angular séparé).

## Stack

- Backend : Spring Boot 3.4 + Spring Data JPA
- Frontend : Thymeleaf
- Authentification : formulaire (email + mot de passe) avec activation par code, et
  connexion Google (OAuth2)
- Base de données : H2 en mémoire en local (profil `dev`), PostgreSQL en production
  (profil `prod`, pour Render)
- Emails : Spring Mail + templates Thymeleaf (HTML)
- Documentation API : springdoc-openapi / Swagger UI
- Java : 21 par défaut dans le `pom.xml` (voir note ci-dessous si vous utilisez Java 25)

## Démarrage en local

### Pré-requis
- JDK 25 (ou 21+)
- Maven (ou le wrapper `mvnw` si vous en ajoutez un)

### Configuration

Aucune configuration n'est obligatoire pour démarrer en local : le profil `dev` est actif
par défaut et utilise une base H2 en mémoire. Pour activer réellement l'envoi d'email et
la connexion Google, définissez ces variables d'environnement avant de lancer
l'application :

```bash
export MAIL_USERNAME=votre-adresse@gmail.com
export MAIL_PASSWORD=mot-de-passe-application-gmail
export GOOGLE_CLIENT_ID=xxxx.apps.googleusercontent.com
export GOOGLE_CLIENT_SECRET=xxxx
```

Sans ces variables, l'application démarre quand même : les envois d'email échoueront
simplement (l'échec est tracé dans `HistoriqueEmail` avec le statut `ECHEC`), et la
connexion Google ne sera pas utilisable tant que les identifiants ne sont pas fournis.

### Lancer l'application

```bash
mvn spring-boot:run
```

L'application démarre sur `http://localhost:8080`.

> **Note sur Java 25** : le `pom.xml` cible Java 21 par défaut, une version LTS avec
> laquelle Spring Boot 3.4 est officiellement testé. Si vous voulez forcer la
> compilation avec votre JDK 25 local, changez simplement `<java.version>21</java.version>`
> en `<java.version>25</java.version>` dans le `pom.xml`. Si Maven refuse de compiler
> avec 25 (plugin compiler trop ancien pour connaître ce `--release`), repassez à 21 —
> le code lui-même ne dépend d'aucune fonctionnalité propre à Java 25.

### Console H2 (debug, profil dev)

`http://localhost:8080/h2-console` — JDBC URL : `jdbc:h2:mem:plateforme`, utilisateur `sa`,
mot de passe vide.

### Documentation Swagger

- Local : `http://localhost:8080/swagger-ui.html`
- Déployé : `https://<votre-app>.onrender.com/swagger-ui.html`

## Comptes de test

Aucun compte n'est pré-créé (la base démarre vide à chaque redémarrage en profil `dev`).
Créez un compte via `/inscription`, récupérez le code d'activation dans les logs de la
console si l'email n'est pas configuré (le corps de l'email est aussi visible en cas
d'échec d'envoi via `HistoriqueEmail`), ou configurez `MAIL_USERNAME`/`MAIL_PASSWORD`
pour recevoir le vrai code par email.

## Déploiement sur Render

1. Créer un **Web Service** Render à partir du dépôt Git, build command `mvn clean package -DskipTests`,
   start command `java -jar target/plateforme-streaming.jar --spring.profiles.active=prod`.
2. Créer une base **PostgreSQL** Render et renseigner `DATABASE_URL`, `DATABASE_USERNAME`,
   `DATABASE_PASSWORD` dans les variables d'environnement du service.
3. Renseigner également `MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD`,
   `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`.
4. Dans la console Google Cloud (identifiants OAuth2), ajouter comme URI de redirection
   autorisée : `https://<votre-app>.onrender.com/api/auth/callback-google` (et en local,
   `http://localhost:8080/api/auth/callback-google`). Les URLs `/api/auth/connexion-google`
   et `/api/auth/callback-google` correspondent aux endpoints demandés dans le sujet ;
   Spring Security les utilise directement comme points d'entrée/retour OAuth2.
5. Le dossier `uploads/` étant local au conteneur Render (offre gratuite = pas de disque
   persistant garanti), pensez à activer un **disque persistant** Render si vous voulez
   conserver les fichiers entre les redéploiements, ou adapter `StorageService` pour un
   stockage externe (S3-compatible) si nécessaire pour la remise.

## Structure du projet

```
src/main/java/com/plateforme/streaming/
  ├── model/            entités JPA (Utilisateur, Fichier, Commentaire, Reaction, ...)
  ├── model/enums/       TypeMedia, TypeEmail, StatutEmail, TypeReaction, MethodeConnexion
  ├── repository/        interfaces Spring Data JPA
  ├── security/           UserDetails, UserDetailsService, OAuth2 Google
  ├── service/            AuthService, FichierService, EmailService, SauvegardeService...
  ├── controller/         pages Thymeleaf (dashboard, upload, détails)
  ├── controller/api/     API REST /api/... documentée avec Swagger
  ├── dto/                formulaires et objets de transfert
  └── config/             sécurité, Swagger

src/main/resources/
  ├── templates/          pages Thymeleaf
  ├── templates/email/    templates HTML des emails envoyés
  ├── static/css, static/js
  └── application*.yml
```

## Ce qui reste à affiner avant la remise

- Les identifiants Google OAuth2 réels doivent être créés dans Google Cloud Console.
- Le dossier `uploads/` local ne survit pas forcément à un redéploiement Render gratuit
  sans disque persistant — à vérifier selon l'offre utilisée.
- Aucun test automatisé n'est fourni ; à ajouter si le barème l'exige.
