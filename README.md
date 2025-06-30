.# NextJS 15 Checkpoint 3

Welcome to Checkpoint 3 of the NextJS 15 course! This project will help you solidify your understanding of Next.js, React, and good software engineering practices.

## Getting Started

Follow these steps to get the application up and running on your local machine:

1.  **Create `.env` file**: Copy the `.env.sample` file to `.env`.

    ```bash
    cp .env.sample .env
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

## Your Mission, Should You Choose to Accept It...

Hey, I vibecoded my first app! But unfortunately, I'm facing some issues and I need a dev to help me...

### First Step: The Add method has an issue!

Find what's wrong and make it work. Test the add page in the app to see if everything is okay!

### Second Step: The Edit and Delete API methods have not been implemented!

Implement them and test the app by editing and deleting some recipes.

### Third Step: The Get function is implemented but does not respect the app design pattern!

Shift it accordingly to the good practices employed in the architecture.

### Bonus Step: Categories!

Add a Link in the header toward "/categories". You'll see a route, but the pictures are not available yet for categories. Manage the app to add pictures for categories!

### Bonus Part 2: Category Recipes!

I'd like my route `/categories/[id]` to display a category and all its recipes. Create the methods in order to get there, respecting the pattern of the architecture.

### Bonus Last Part: Dashboard!

Create a Dashboard to manage categories CRUD operations.

## Good Luck, Have Fun!

This Checkpoint will help you practice and reinforce your understanding of Next.js and its features. Don't hesitate to reach out for help if you get stuck!
