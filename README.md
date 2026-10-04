# Mes tâches

Petite application de liste de tâches en React et Vite, avec une interface responsive en français.

## Prérequis

Node.js 22.12 ou supérieur (Node.js 24 recommandé) et npm.

## Lancer le projet

```sh
npm install
npm run dev
```

Ouvrez l’adresse affichée dans le terminal (par défaut http://localhost:5173).

## Build de production

```sh
npm run build
npm run preview
```

Le build est généré dans `dist/`. La prévisualisation est accessible par défaut sur http://localhost:4173. Pour un déploiement, servez le contenu de `dist/` avec un hébergement statique.

## Tests

```sh
npm test
```

Les tests vérifient l’ajout, la validation des champs, le changement d’état, les filtres, la suppression et la sauvegarde.

## Utilisation

- Saisissez une tâche puis cliquez sur **Ajouter** ou appuyez sur Entrée.
- Cochez une tâche pour la terminer ; décochez-la pour la remettre à faire.
- Cliquez sur la corbeille pour la supprimer.
- Utilisez **Toutes**, **À faire** ou **Terminées** pour filtrer la liste.

Les tâches sont sauvegardées localement dans votre navigateur (`localStorage`). Aucun compte ni serveur n’est nécessaire. Elles ne sont pas synchronisées entre appareils. Si le stockage est indisponible, l’application continue de fonctionner pendant la session et affiche un avertissement.
