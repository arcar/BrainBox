# 🧠 BrainBox

![BrainBox](https://img.shields.io/badge/BrainBox-AI-blue)
![Angular](https://img.shields.io/badge/Frontend-Angular-red)
![Node.js](https://img.shields.io/badge/API-Node.js-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-darkgreen)
![Docker](https://img.shields.io/badge/Deployment-Docker-blue)

## 📌 Présentation

**BrainBox** est une application de gestion intelligente de connaissances utilisant une architecture Full Stack moderne.

L'objectif est de créer une base de connaissances personnelle capable de répondre aux questions utilisateurs grâce à une IA locale.

Le fonctionnement repose sur une approche **RAG (Retrieval Augmented Generation)** :

1. L'utilisateur pose une question.
2. L'IA analyse la demande et extrait les mots-clés pertinents.
3. BrainBox recherche les connaissances correspondantes dans MongoDB.
4. Le contexte trouvé est envoyé à un modèle IA local.
5. L'IA génère une réponse uniquement basée sur les connaissances disponibles.

L'objectif est d'obtenir une IA spécialisée, contrôlée et privée.

---

# 🏗️ Architecture
```
BrainBox
│
├── frontend-angular
│ ├── Interface utilisateur
│ ├── Gestion des connaissances
│ └── Chat IA
│
├── backend-node
│ ├── API REST Express
│ ├── Gestion MongoDB
│ ├── Recherche par tags
│ └── Communication Ollama
│
├── mongodb
│ └── Base de connaissances
│
└── ollama
└── Modèle IA local
```

---

# 🚀 Technologies utilisées

## Frontend

- Angular
- TypeScript
- HTML5
- SCSS
- Angular Standalone Components
- HttpClient
- FormsModule


## Backend

- Node.js
- Express
- JavaScript
- API REST
- MongoDB Driver


## Intelligence artificielle

- Ollama
- Qwen 2.5 3B Instruct
- Architecture RAG


## Infrastructure

- Docker
- Docker Compose
- Volumes persistants

---

# ✨ Fonctionnalités

## Gestion des connaissances

✅ Ajouter une connaissance

✅ Modifier une connaissance

✅ Supprimer une connaissance

✅ Afficher toutes les connaissances

✅ Recherche par ID MongoDB

✅ Recherche par tags

✅ Gestion des catégories


---

## Chat IA

Le module Chat permet :

- Poser une question en langage naturel
- Détection automatique des tags
- Recherche dans la base MongoDB
- Génération d'une réponse IA

```
Exemple :

Question : Comment lancer Docker Compose ?


Recherche : Tag détecté : docker


Connaissance trouvée :

Pour lancer les conteneurs, utiliser : docker compose up -d



Réponse IA :

Pour lancer Docker Compose utilisez : docker compose up -d
```

---

# 🧠 Fonctionnement RAG

BrainBox n'utilise pas une IA généraliste.

Le modèle reçoit uniquement le contexte extrait de MongoDB.


Exemple de prompt envoyé :
Tu es BrainBox.

Le contexte fourni est la seule source autorisée.

N'invente aucune information.


---

# 📂 Installation

## Pré-requis

Installer :

- Docker Desktop
- Docker Compose
- Git


Vérifier :

```bash
docker --version

docker compose version
```
---

# 📥 Installation du projet

```bash
Cloner le dépôt :

git clone https://github.com/arcar/BrainBox.git

Entrer dans le dossier :

cd brainbox
```
---

# 📥 Installation et peuplement de MongoDB

```bash
Installer et configurer MongoDB :

https://www.mongodb.com/

Installer MongoDB Compass :

https://www.mongodb.com/try/download/compass

Une fois cela complété, sur MongoDB Compass, créer une database nommée "brainbox" et y insérer une collection nommée "connaissance".

Cliquer sur "ADD Data", sélectionner "Import Json or Csv file" et choisir le fichier "brainbox.connaissance.json" situé à la racine du projet BrainBox


```


---
# ⚙️ Configuration
```bash

Créer un fichier :

.env  dans le dossier API.

Exemple :

MONGODB_USERNAME="Votre USERNAME MongoDB"
MONGODB_PASSWORD="Votre Mot de Passe MongoDB
"
MONGODB_URI="VOtre URI MongoDB"
OLLAMA_URL=http://ollama:11434
```
---
# 🐳 Lancement avec Docker
```bash
Construire et démarrer les services :

docker compose up -d --build

Vérifier les conteneurs :

docker ps

Services attendus :

brainbox-angular
brainbox-api
brainbox-mongodb
brainbox-ollama
```
---
# 🤖 Installation du modèle IA
```bash
Entrer dans le conteneur Ollama :

docker exec -it brainbox-ollama sh

Télécharger le modèle :

ollama pull qwen2.5:3b

Vérifier :

ollama list
```
---
# 🌐 Accès application
```bash
Frontend Angular :

http://localhost:4200

API Node :

http://localhost:3000

MongoDB :

localhost:27017
```
---

# 🔌 API disponibles
```bash
## Connaissances

Toutes les connaissances : GET /allConnaissances

Recherche par ID : GET /ConnaissanceParId/:id

Exemple : GET /ConnaissanceParId/6a6218b232286f6432228e19

Recherche par tag : GET /ConnaissanceParTag/:tags

Exemple : GET /ConnaissanceParTag/docker

AjouterPOST /addConnaissance

Modifier : PUT /modifConnaissance/:id

Supprimer : DELETE /deleteConnaissance/:id
```
```bash
## IA

Question IA : POST /ask

Body :

{
    "question":"Comment lancer Docker ?"
}

Réponse :

{
    "answer":"docker compose up -d",
    "tags":[
        "docker"
    ],
    "connaissances":[]
}
```
---
# 🔒 Philosophie BrainBox

BrainBox privilégie :

🔐 Confidentialité  
🏠 IA locale    
📚 Base documentaire maîtrisée  
🚫 Pas d'hallucination volontaire   
⚡ Réponses contextualisées     



---
# 🔮 Evolutions prévues   
Intelligence    
Embeddings vectoriels   
Recherche sémantique    
Base vectorielle (ChromaDB / FAISS)     
Mémoire conversationnelle
Interface   
Historique des conversations    
Gestion utilisateurs    
Favoris     
Import automatique de documents     
Déploiement     
Installation automatique        
Version serveur     
Gestion multi-utilisateurs

---
# 👨‍💻 Auteur

Projet développé par Arcar

