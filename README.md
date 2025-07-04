# 📦 back

> Backend Node.js utilisant [NestJS](https://nestjs.com/), TypeORM et PostgreSQL.

## 📖 Description

Ce projet est une API backend développée avec le framework [NestJS](https://nestjs.com/). Il intègre une architecture modulaire, une configuration via environnement, la validation des données, un accès base de données avec TypeORM et la gestion des identifiants courts avec `nanoid`.

---

## 🚀 Démarrage rapide

### 🔧 Installation

```bash
# Cloner le projet
git clone <url-du-repo>
cd back

# Installer les dépendances
npm install
```

### ▶️ Lancer le projet

#### En développement

```bash
npm run start:dev
```

#### En production

```bash
npm run build
npm run start:prod
```

---

## 🧪 Tests

```bash
# Tests unitaires
npm run test

# En mode watch
npm run test:watch

# Couverture de code
npm run test:cov

# Tests end-to-end
npm run test:e2e
```

---

## 📂 Structure des scripts

| Script        | Description                          |
| ------------- | ------------------------------------ |
| `start`       | Démarre l'application                |
| `start:dev`   | Démarre avec rechargement à chaud    |
| `start:debug` | Démarre en mode debug                |
| `start:prod`  | Démarre l'application compilée       |
| `build`       | Compile le code TypeScript           |
| `format`      | Formate le code avec Prettier        |
| `lint`        | Analyse statique du code avec ESLint |
| `test`        | Lance les tests unitaires            |
| `test:watch`  | Tests en mode surveillance           |
| `test:cov`    | Génère le rapport de couverture      |
| `test:e2e`    | Lance les tests end-to-end           |

---

## 📦 Dépendances principales

- `@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`
- `@nestjs/typeorm`
- `pg` (PostgreSQL)
- `typeorm`
- `class-validator`, `class-transformer`
- `nanoid`

## 🛠️ Outils de développement

- `eslint`, `prettier`
- `jest`, `ts-jest`, `supertest`
- `ts-node`, `typescript`
- `@nestjs/testing`

---

## 📄 Licence

Ce projet est **non licencié** (`UNLICENSED`). Usage privé uniquement.

---

## 👤 Auteur

_À compléter dans `package.json` → `"author"`._

---

# 🌐 front

> Frontend de l'application, développé avec [Next.js](https://nextjs.org/), React 19 et Tailwind CSS 4.

## 📖 Description

Ce projet constitue l'interface utilisateur de l'application. Il est basé sur [Next.js](https://nextjs.org/) avec support TypeScript, Tailwind CSS pour le style, et utilise Turbopack pour un développement plus rapide.

---

## 🚀 Démarrage rapide

### 🔧 Installation

```bash
# Cloner le projet
git clone <url-du-repo>
cd front

# Installer les dépendances
npm install
```

### ▶️ Lancer le projet

#### En développement

```bash
npm run dev
```

#### En production

```bash
npm run build
npm run start
```

---

## 📂 Scripts disponibles

| Script  | Description                                           |
| ------- | ----------------------------------------------------- |
| `dev`   | Lance l'application en mode développement (Turbopack) |
| `build` | Compile l'application pour la production              |
| `start` | Démarre l'application en mode production              |
| `lint`  | Analyse statique avec ESLint                          |

---

## 🧩 Dépendances principales

- `react` ^19
- `react-dom` ^19
- `next` ^15

## 🛠️ Outils de développement

- `TypeScript`
- `Tailwind CSS` v4
- `ESLint`
- `@types` pour Node, React et ReactDOM

---

## 📄 Licence

Ce projet est **privé** (`private: true`). Usage interne uniquement.

---

## 👤 Auteur

_À compléter dans `package.json` → `"author"`._

---

# 🐳 Utilisation de Docker avec Docker Compose

Ce projet utilise Docker Compose pour configurer et exécuter un environnement complet comprenant :

- une application NestJS (backend)
- une base de données PostgreSQL
- une interface d'administration pgAdmin

---

## 🏗️ Structure des services

### 1. `nestjs-app`

- Application principale (NestJS)
- Port exposé : `3000`
- Dépend de : `postgres`
- Montages :
  - Volume local du code (`.:/app`)
  - Dossier `node_modules` non synchronisé

### 2. `postgres`

- Image : `postgres:15`
- Port exposé : `5432`
- Variables d’environnement :
  - `POSTGRES_USER=postgres`
  - `POSTGRES_PASSWORD=123456test`
  - `POSTGRES_DB=test`
- Volume : `postgres-data`

### 3. `pgadmin`

- Interface de gestion PostgreSQL
- Image : `dpage/pgadmin4:8`
- Port exposé : `8080`
- Accès : `http://localhost:8080`
- Identifiants :
  - Email : `admin@admin.com`
  - Mot de passe : `admin`

---

## ▶️ Lancer l'environnement

```bash
docker compose up --build
```
