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
