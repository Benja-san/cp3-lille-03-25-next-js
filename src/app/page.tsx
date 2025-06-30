import Link from "next/link";
import RecipeCard from "@/components/RecipeCard";
import styles from "./page.module.css";
import { Recipe } from "@/models/Recipe";

async function getRecipes(): Promise<Recipe[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes`);
  if (!res.ok) {
    throw new Error("Failed to fetch recipes");
  }
  return res.json();
}

export default async function Home() {
  let recipes: Recipe[] = [];
  let error: string | null = null;

  try {
    recipes = await getRecipes();
  } catch (e: unknown) {
    if (e instanceof Error) {
      error = e.message;
    } else {
      error = "An unknown error occurred";
    }
  }

  if (error) {
    console.warn("Erreur de fetch : ", error);
  }

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Recipes</h1>
        <Link href="/add" className={styles.addButton}>
          Add New Recipe ➕
        </Link>
      </div>
      <div className={styles.grid}>
        {recipes.length === 0 ? (
          <p>No recipes found. Add one!</p>
        ) : (
          recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        )}
      </div>
    </main>
  );
}
