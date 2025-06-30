# NextJS 15 Checkpoint 3

Welcome to Checkpoint 3 of the NextJS 15 course! This project will help you solinpm run ify your understanding of Next.js, React, and good software engineering practices.

## Getting Started

Follow these steps to get the application up and running on your local machine:

1.  **Create `.env` file**: Copy the `.env.sample` file to `.env`.

    ```bash
    cp env.example .env
    ```

2.  **Install dependencies**: Install all the necessary project dependencies.

    ```bash
    npm install
    ```

3.  **Run database migrations**: Set up your database schema.

    ```bash
    npm run db:migrate
    ```

4.  **Seed the database**: Populate your database with initial data.

    ```bash
    npm run db:seed
    ```

5.  **Launch the development server**: Start the Next.js development server.
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Votre mission, si vous choisissez de l'accepter...

Hey, j'ai vibecodé ma première application ! Mais malheureusement, je rencontre quelques problèmes et j'ai besoin d'un dev pour m'aider...

### Première étape : La méthode Add présente un problème !

Trouvez ce qui ne va pas et faites en sorte que cela fonctionne. Testez la page d'ajout dans l'application pour voir si tout va bien !

### Deuxième étape : Les méthodes API Editer et Supprimer n'ont pas été implémentées !

Implémentez-les et testez l'application en modifiant et en supprimant quelques recettes.

### Troisième étape : La fonction Get est implémentée mais ne respecte pas le modèle de conception de l'application !

Modifiez-la en fonction des bonnes pratiques employées dans l'architecture.

### Bonus Step : Catégories !

Ajoutez un lien dans l'en-tête vers « /categories ». Vous verrez un itinéraire, mais les images ne sont pas encore disponibles pour les catégories. Gérer l'application pour ajouter des images pour les catégories !

### Bonus Partie 2 : Recettes pour les catégories !

J'aimerais que ma route `/categories/[id]` affiche une catégorie et toutes ses recettes. Créez les méthodes pour y arriver, en respectant le modèle de l'architecture.

### Bonus Dernière partie : Tableau de bord !

Créer un tableau de bord pour gérer les opérations CRUD des catégories.

## Bonne chance, amusez-vous bien !

Ce Checkpoint vous aidera à mettre en pratique et à renforcer votre compréhension de Next.js et de ses fonctionnalités. N'hésitez pas à demander de l'aide si vous êtes bloqué !
