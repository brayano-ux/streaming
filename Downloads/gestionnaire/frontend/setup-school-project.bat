@echo off
echo ==========================================
echo   SCHOOL MANAGEMENT SYSTEM GENERATOR
echo ==========================================

:: =====================================
:: CORE
:: =====================================

ng g m core
ng g m shared

ng g g guard core/guards/auth
ng g g guard core/guards/admin
ng g g guard core/guards/directeur
ng g g guard core/guards/secretaire
ng g g guard core/guards/enseignant

ng g interceptor core/interceptors/auth

:: =====================================
:: LAYOUTS
:: =====================================

ng g c layouts/auth-layout
ng g c layouts/dashboard-layout

:: =====================================
:: DASHBOARD
:: =====================================

ng g m features/dashboard --routing

ng g c features/dashboard/pages/dashboard

ng g s features/dashboard/services/dashboard

:: =====================================
:: AUTH
:: =====================================

ng g m features/auth --routing

ng g c features/auth/pages/login
ng g c features/auth/pages/forgot-password

ng g s features/auth/services/auth

:: =====================================
:: ELEVES
:: =====================================

ng g m features/eleves --routing

ng g c features/eleves/pages/liste-eleves
ng g c features/eleves/pages/nouvel-eleve
ng g c features/eleves/pages/details-eleve
ng g c features/eleves/pages/modifier-eleve

ng g c features/eleves/components/eleve-form
ng g c features/eleves/components/eleve-table
ng g c features/eleves/components/eleve-card

ng g s features/eleves/services/eleve

:: =====================================
:: INSCRIPTIONS
:: =====================================

ng g m features/inscriptions --routing

ng g c features/inscriptions/pages/liste-inscriptions
ng g c features/inscriptions/pages/nouvelle-inscription

ng g s features/inscriptions/services/inscription

:: =====================================
:: CLASSES
:: =====================================

ng g m features/classes --routing

ng g c features/classes/pages/liste-classes
ng g c features/classes/pages/nouvelle-classe

ng g s features/classes/services/classe

:: =====================================
:: FILIERES
:: =====================================

ng g m features/filieres --routing

ng g c features/filieres/pages/liste-filieres
ng g c features/filieres/pages/nouvelle-filiere

ng g s features/filieres/services/filiere

:: =====================================
:: NIVEAUX
:: =====================================

ng g m features/niveaux --routing

ng g c features/niveaux/pages/liste-niveaux
ng g c features/niveaux/pages/nouveau-niveau

ng g s features/niveaux/services/niveau

:: =====================================
:: MATIERES
:: =====================================

ng g m features/matieres --routing

ng g c features/matieres/pages/liste-matieres
ng g c features/matieres/pages/nouvelle-matiere

ng g s features/matieres/services/matiere

:: =====================================
:: ENSEIGNANTS
:: =====================================

ng g m features/enseignants --routing

ng g c features/enseignants/pages/liste-enseignants
ng g c features/enseignants/pages/nouvel-enseignant

ng g s features/enseignants/services/enseignant

:: =====================================
:: EMPLOI DU TEMPS
:: =====================================

ng g m features/emplois-du-temps --routing

ng g c features/emplois-du-temps/pages/liste-emplois
ng g c features/emplois-du-temps/pages/nouvel-emploi

ng g s features/emplois-du-temps/services/emploi-du-temps

:: =====================================
:: NOTES
:: =====================================

ng g m features/notes --routing

ng g c features/notes/pages/saisie-notes
ng g c features/notes/pages/liste-notes

ng g s features/notes/services/note

:: =====================================
:: BULLETINS
:: =====================================

ng g m features/bulletins --routing

ng g c features/bulletins/pages/liste-bulletins

ng g s features/bulletins/services/bulletin

:: =====================================
:: PAIEMENTS
:: =====================================

ng g m features/paiements --routing

ng g c features/paiements/pages/liste-paiements
ng g c features/paiements/pages/nouveau-paiement

ng g s features/paiements/services/paiement

:: =====================================
:: DEPENSES
:: =====================================

ng g m features/depenses --routing

ng g c features/depenses/pages/liste-depenses
ng g c features/depenses/pages/nouvelle-depense

ng g s features/depenses/services/depense

:: =====================================
:: RECETTES
:: =====================================

ng g m features/recettes --routing

ng g c features/recettes/pages/liste-recettes
ng g c features/recettes/pages/nouvelle-recette

ng g s features/recettes/services/recette

:: =====================================
:: SALAIRES
:: =====================================

ng g m features/salaires --routing

ng g c features/salaires/pages/liste-salaires

ng g s features/salaires/services/salaire

:: =====================================
:: STATISTIQUES
:: =====================================

ng g m features/statistiques --routing

ng g c features/statistiques/pages/dashboard-statistiques

ng g s features/statistiques/services/statistique

:: =====================================
:: UTILISATEURS
:: =====================================

ng g m features/utilisateurs --routing

ng g c features/utilisateurs/pages/liste-utilisateurs

ng g s features/utilisateurs/services/utilisateur

:: =====================================
:: PARAMETRES
:: =====================================

ng g m features/parametres --routing

ng g c features/parametres/pages/parametres

ng g s features/parametres/services/parametre

:: =====================================
:: DOCUMENTS
:: =====================================

ng g m features/documents --routing

ng g c features/documents/pages/certificats
ng g c features/documents/pages/cartes
ng g c features/documents/pages/releves
ng g c features/documents/pages/rapports

ng g s features/documents/services/document

:: =====================================
:: MODELS
:: =====================================

ng g interface core/models/user
ng g interface core/models/role
ng g interface core/models/eleve
ng g interface core/models/parent
ng g interface core/models/classe
ng g interface core/models/niveau
ng g interface core/models/filiere
ng g interface core/models/matiere
ng g interface core/models/enseignant
ng g interface core/models/emploi-du-temps
ng g interface core/models/annee-scolaire
ng g interface core/models/inscription
ng g interface core/models/note
ng g interface core/models/bulletin
ng g interface core/models/paiement
ng g interface core/models/depense
ng g interface core/models/recette
ng g interface core/models/salaire
ng g interface core/models/statistique

echo.
echo ==========================================
echo       ARCHITECTURE GENEREE
echo ==========================================

pause
