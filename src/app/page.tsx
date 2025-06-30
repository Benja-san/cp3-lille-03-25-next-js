import Link from "next/link"
import RecipeCard from "@/components/RecipeCard"
import styles from "./page.module.css"
import { Recipe } from "@/models/Recipe"

import { getAllRecipes } from "@/service/RecipeService"

export default async function Home() {
  let recipes: Recipe[] = []
  let error: string | null = null

  try {
    recipes = await getAllRecipes()
  } catch (e: unknown) {
    if (e instanceof Error) {
      error = e.message
    } else {
      error = "An unknown error occurred"
    }
  }

  if (error) {
    return <main className={styles.main}>Error: {error}</main>
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
  )
}
