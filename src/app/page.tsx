import RecipeCard from "@/components/RecipeCard";
import { getAll } from "@/service/RecipeService";
import Link from "next/link";
import styles from "./page.module.css";

export default async function Home() {
  const recipes = await getAll();
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
