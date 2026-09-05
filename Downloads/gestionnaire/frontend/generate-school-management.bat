@echo off
setlocal enabledelayedexpansion
echo ==========================================
echo   SCHOOL MANAGEMENT SYSTEM GENERATOR
echo   (Angular CLI 21.x - standalone)
echo ==========================================

:: =====================================================
:: NOTES SUR L'ADAPTATION A ANGULAR CLI 21
:: =====================================================
:: 1) Les composants sont "standalone" par defaut depuis Angular 17.
::    Il n'existe donc plus de raison de generer des NgModules de feature
::    ("ng g m xxx --routing"). Ce script cree a la place un fichier
::    "xxx.routes.ts" (tableau Routes) pour chaque feature, a brancher
::    en lazy-loading dans app.routes.ts via loadChildren/loadComponent.
:: 2) Les guards et interceptors sont generes en version FONCTIONNELLE
::    par defaut (CanActivateFn / HttpInterceptorFn) depuis un moment
::    deja - aucune option supplementaire requise.
:: 3) Depuis Angular 20, le CLI ne suffixe plus par defaut les fichiers
::    de component/service/pipe/directive (ex: eleve.service.ts -> eleve.ts,
::    dashboard.component.ts -> dashboard.ts) et separe le suffixe des
::    guard/interceptor/module/resolver par un tiret plutot qu'un point
::    (ex: auth.guard.ts -> auth-guard.ts).
::    => Si tu veux garder les anciennes conventions (fortement recommande
::       sur un projet de cette taille pour eviter toute ambiguite),
::       ajoute ceci dans angular.json AVANT de lancer ce script :
::
::  "schematics": {
::    "@schematics/angular:component": { "type": "component" },
::    "@schematics/angular:directive": { "type": "directive" },
::    "@schematics/angular:service":   { "type": "service" },
::    "@schematics/angular:guard":       { "typeSeparator": "." },
::    "@schematics/angular:interceptor": { "typeSeparator": "." },
::    "@schematics/angular:resolver":    { "typeSeparator": "." }
::  }
::
:: =====================================================

:: =====================================
:: CORE / SHARED (simples dossiers, plus de NgModule)
:: =====================================

if not exist "src\app\core" mkdir "src\app\core"
if not exist "src\app\shared" mkdir "src\app\shared"

call ng g guard core/guards/auth --implements=CanActivate
call ng g guard core/guards/admin --implements=CanActivate
call ng g guard core/guards/directeur --implements=CanActivate
call ng g guard core/guards/secretaire --implements=CanActivate
call ng g guard core/guards/enseignant --implements=CanActivate

call ng g interceptor core/interceptors/auth --functional

:: =====================================
:: LAYOUTS (standalone par defaut)
:: =====================================

call ng g c layouts/auth-layout
call ng g c layouts/dashboard-layout

:: =====================================
:: HELPER - cree un fichier de routes standalone pour une feature
:: usage: call :CreateRoutes <dossier-feature> <NOM_CONST_ROUTES>
:: =====================================

goto :AfterHelper

:CreateRoutes
set "featDir=src\app\features\%~1"
if not exist "%featDir%" mkdir "%featDir%"
(
echo import { Routes } from '@angular/router';
echo.
echo export const %~2: Routes = [];
) > "%featDir%\%~1.routes.ts"
exit /b

:AfterHelper

:: =====================================
:: DASHBOARD
:: =====================================

call :CreateRoutes dashboard DASHBOARD_ROUTES

call ng g c features/dashboard/pages/dashboard
call ng g s features/dashboard/services/dashboard

:: =====================================
:: AUTH
:: =====================================

call :CreateRoutes auth AUTH_ROUTES

call ng g c features/auth/pages/login
call ng g c features/auth/pages/forgot-password
call ng g s features/auth/services/auth

:: =====================================
:: ELEVES
:: =====================================

call :CreateRoutes eleves ELEVES_ROUTES

call ng g c features/eleves/pages/liste-eleves
call ng g c features/eleves/pages/nouvel-eleve
call ng g c features/eleves/pages/details-eleve
call ng g c features/eleves/pages/modifier-eleve

call ng g c features/eleves/components/eleve-form
call ng g c features/eleves/components/eleve-table
call ng g c features/eleves/components/eleve-card

call ng g s features/eleves/services/eleve

:: =====================================
:: INSCRIPTIONS
:: =====================================

call :CreateRoutes inscriptions INSCRIPTIONS_ROUTES

call ng g c features/inscriptions/pages/liste-inscriptions
call ng g c features/inscriptions/pages/nouvelle-inscription
call ng g s features/inscriptions/services/inscription

:: =====================================
:: CLASSES
:: =====================================

call :CreateRoutes classes CLASSES_ROUTES

call ng g c features/classes/pages/liste-classes
call ng g c features/classes/pages/nouvelle-classe
call ng g s features/classes/services/classe

:: =====================================
:: FILIERES
:: =====================================

call :CreateRoutes filieres FILIERES_ROUTES

call ng g c features/filieres/pages/liste-filieres
call ng g c features/filieres/pages/nouvelle-filiere
call ng g s features/filieres/services/filiere

:: =====================================
:: NIVEAUX
:: =====================================

call :CreateRoutes niveaux NIVEAUX_ROUTES

call ng g c features/niveaux/pages/liste-niveaux
call ng g c features/niveaux/pages/nouveau-niveau
call ng g s features/niveaux/services/niveau

:: =====================================
:: MATIERES
:: =====================================

call :CreateRoutes matieres MATIERES_ROUTES

call ng g c features/matieres/pages/liste-matieres
call ng g c features/matieres/pages/nouvelle-matiere
call ng g s features/matieres/services/matiere

:: =====================================
:: ENSEIGNANTS
:: =====================================

call :CreateRoutes enseignants ENSEIGNANTS_ROUTES

call ng g c features/enseignants/pages/liste-enseignants
call ng g c features/enseignants/pages/nouvel-enseignant
call ng g s features/enseignants/services/enseignant

:: =====================================
:: EMPLOI DU TEMPS
:: =====================================

call :CreateRoutes emplois-du-temps EMPLOIS_DU_TEMPS_ROUTES

call ng g c features/emplois-du-temps/pages/liste-emplois
call ng g c features/emplois-du-temps/pages/nouvel-emploi
call ng g s features/emplois-du-temps/services/emploi-du-temps

:: =====================================
:: NOTES
:: =====================================

call :CreateRoutes notes NOTES_ROUTES

call ng g c features/notes/pages/saisie-notes
call ng g c features/notes/pages/liste-notes
call ng g s features/notes/services/note

:: =====================================
:: BULLETINS
:: =====================================

call :CreateRoutes bulletins BULLETINS_ROUTES

call ng g c features/bulletins/pages/liste-bulletins
call ng g s features/bulletins/services/bulletin

:: =====================================
:: PAIEMENTS
:: =====================================

call :CreateRoutes paiements PAIEMENTS_ROUTES

call ng g c features/paiements/pages/liste-paiements
call ng g c features/paiements/pages/nouveau-paiement
call ng g s features/paiements/services/paiement

:: =====================================
:: DEPENSES
:: =====================================

call :CreateRoutes depenses DEPENSES_ROUTES

call ng g c features/depenses/pages/liste-depenses
call ng g c features/depenses/pages/nouvelle-depense
call ng g s features/depenses/services/depense

:: =====================================
:: RECETTES
:: =====================================

call :CreateRoutes recettes RECETTES_ROUTES

call ng g c features/recettes/pages/liste-recettes
call ng g c features/recettes/pages/nouvelle-recette
call ng g s features/recettes/services/recette

:: =====================================
:: SALAIRES
:: =====================================

call :CreateRoutes salaires SALAIRES_ROUTES

call ng g c features/salaires/pages/liste-salaires
call ng g s features/salaires/services/salaire

:: =====================================
:: STATISTIQUES
:: =====================================

call :CreateRoutes statistiques STATISTIQUES_ROUTES

call ng g c features/statistiques/pages/dashboard-statistiques
call ng g s features/statistiques/services/statistique

:: =====================================
:: UTILISATEURS
:: =====================================

call :CreateRoutes utilisateurs UTILISATEURS_ROUTES

call ng g c features/utilisateurs/pages/liste-utilisateurs
call ng g s features/utilisateurs/services/utilisateur

:: =====================================
:: PARAMETRES
:: =====================================

call :CreateRoutes parametres PARAMETRES_ROUTES

call ng g c features/parametres/pages/parametres
call ng g s features/parametres/services/parametre

:: =====================================
:: DOCUMENTS
:: =====================================

call :CreateRoutes documents DOCUMENTS_ROUTES

call ng g c features/documents/pages/certificats
call ng g c features/documents/pages/cartes
call ng g c features/documents/pages/releves
call ng g c features/documents/pages/rapports

call ng g s features/documents/services/document

:: =====================================
:: MODELS
:: =====================================

call ng g interface core/models/user
call ng g interface core/models/role
call ng g interface core/models/eleve
call ng g interface core/models/parent
call ng g interface core/models/classe
call ng g interface core/models/niveau
call ng g interface core/models/filiere
call ng g interface core/models/matiere
call ng g interface core/models/enseignant
call ng g interface core/models/emploi-du-temps
call ng g interface core/models/annee-scolaire
call ng g interface core/models/inscription
call ng g interface core/models/note
call ng g interface core/models/bulletin
call ng g interface core/models/paiement
call ng g interface core/models/depense
call ng g interface core/models/recette
call ng g interface core/models/salaire
call ng g interface core/models/statistique

echo.
echo ==========================================
echo       ARCHITECTURE GENEREE
echo   N'oublie pas de brancher chaque
echo   *.routes.ts dans app.routes.ts via
echo   loadChildren: () =^> import('./features/xxx/xxx.routes').then(m =^> m.XXX_ROUTES)
echo ==========================================

pause
