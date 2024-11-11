# Mon Vieux Grimoire - Backend API

**Mon Vieux Grimoire** est une API backend développée en **Node.js** et **Express** qui permet le référencement et la notation de livres. L'application gère également l'authentification des utilisateurs et permet le stockage sécurisé des images.

## Table des matières

-   [Technologies](#technologies)
-   [Prérequis](#prérequis)
-   [Installation](#installation)
-   [Configuration](#configuration)
-   [Utilisation](#utilisation)
-   [Routes API](#routes-api)
-   [Licence](#licence)

## Technologies

-   **Node.js** et **Express** pour le backend
-   **MongoDB** avec **Mongoose** pour la base de données
-   **dotenv** pour la gestion des variables d'environnement
-   **JWT** (JSON Web Token) pour l'authentification
-   **Multer** pour le téléchargement et la gestion des images

## Prérequis

-   **Node.js** installé sur votre machine
-   **npm** (Node Package Manager)
-   Un compte MongoDB pour configurer votre base de données

## Installation

1. Clonez ce dépôt sur votre machine locale :
    ```bash
    git clone git@github.com:SimonGallien/OC_Projet_6.git
    ```
2. Accédez au dossier du projet :
    ```bash
    cd OC_Projet_6
    ```
3. Installez les dépendances du projet :
    ```bash
    npm install
    ```
4. Configurez vos variables d'environnement (voir la section [Configuration](#configuration)).

## Configuration

1. Créez un fichier **.env** à la racine du projet en utilisant **.env.sample** comme modèle :
    ```env
    MONGODB_URI=your-mongodb-connection-string
    SECRET_KEY=your-secret-key
    PORT=4000
    NODE_ENV=development
    ```
2. Assurez-vous que votre fichier **.env** est ajouté à votre **.gitignore** pour éviter de le versionner accidentellement.

## Utilisation

1. Pour démarrer le serveur en mode développement :
    ```bash
    npm run dev
    ```
2. Pour démarrer le serveur en mode production :
    ```bash
    npm start
    ```
3. L'API sera accessible sur `http://localhost:4000` (ou le port que vous avez défini).

## Routes API

### Authentification

-   `POST /api/auth/signup` : Inscrire un nouvel utilisateur
-   `POST /api/auth/login` : Connecter un utilisateur

### Livres

-   `GET /api/books` : Récupérer tous les livres
-   `POST /api/books` : Ajouter un nouveau livre
-   `GET /api/books/:id` : Récupérer un livre par son ID
-   `PUT /api/books/:id` : Mettre à jour les informations d'un livre
-   `DELETE /api/books/:id` : Supprimer un livre
-   `POST /api/books/:id/rating` : Ajouter une note à un livre

### Gestion des Images

-   `GET /images` : Accéder aux images stockées
-   `POST /upload` : Télécharger une image de couverture de livre (via Multer)

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.
