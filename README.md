Mon Vieux Grimoire - Backend API
Mon Vieux Grimoire est une API backend développée en Node.js et Express qui permet le référencement et de notation de livres. L'application gère également l'authentification des utilisateurs et permet le stockage sécurisé des images.

Table des matières
Technologies
Prérequis
Installation
Configuration
Utilisation
Routes API
Licence

Technologies
Node.js et Express pour le backend
MongoDB avec Mongoose pour la base de données
dotenv pour la gestion des variables d'environnement
JWT (JSON Web Token) pour l'authentification
Multer pour le téléchargement et la gestion des images

Prérequis
Node.js installé sur votre machine
npm (Node Package Manager)
Un compte MongoDB pour configurer votre base de données

Installation
Clonez ce dépôt sur votre machine locale :
bash
Copier le code
git clone https://github.com/votre-utilisateur/menu-maker.git
Accédez au dossier du projet :
bash
Copier le code
cd menu-maker
Installez les dépendances du projet :
bash
Copier le code
npm install
Configurez vos variables d'environnement (voir la section Configuration).
Configuration
Créez un fichier .env à la racine du projet en utilisant .env.sample comme modèle :
env
Copier le code
MONGODB_URI=your-mongodb-connection-string
SECRET_KEY=your-secret-key
PORT=4000
NODE_ENV=development
Assurez-vous que votre fichier .env est ajouté à votre .gitignore pour éviter de le versionner accidentellement.
Utilisation
Pour démarrer le serveur en mode développement :
bash
Copier le code
npm run dev
Pour démarrer le serveur en mode production :
bash
Copier le code
npm start
L'API sera accessible sur http://localhost:4000 (ou le port que vous avez défini).
Routes API
Authentification
POST /api/auth/signup : Inscrire un nouvel utilisateur
POST /api/auth/login : Connecter un utilisateur
livre
GET /api/books : Récupérer tous les livre
POST /api/books : Créer un nouveau livre
GET /api/books/:id : Récupérer un livre par son ID
PUT /api/books/:id : Mettre à jour un livre
DELETE /api/books/:id : Supprimer un livre
Gestion des Images
GET /images : Accéder aux images stockées
Licence
Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.
