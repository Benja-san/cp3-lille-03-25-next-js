import Link from "next/link"
import styles from "./page.module.css"
import { Recipe } from "@/lib/data"
import DeleteButton from "@/components/DeleteButton"

import { getOneRecipe } from "@/service/RecipeService"

export default async function RecipePage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = await params
  let recipe: Recipe | null = null
  let error: string | null = null

  try {
    recipe = await getOneRecipe(id)
  } catch (e: unknown) {
    if (e instanceof Error) {
      error = e.message
    } else {
      error = "An unknown error occurred"
    }
  }

  if (error) {
    return <div className={styles.container}>Error: {error}</div>
  }

  if (!recipe) {
    return <div className={styles.container}>Recipe not found</div>
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{recipe.title}</h1>
      {/* For checkpoint needs We won't use Image component, so you can import img from any url */}
      <img src={recipe.picture} alt={recipe.title} className={styles.image} />
      {recipe.categoryTitle && (
        <p className={styles.category}>Category: {recipe.categoryTitle}</p>
      )}
      <div className={styles.content}>
        <h2>Description</h2>
        <p>{recipe.description}</p>
        <h2>Ingredients</h2>
        <p>{recipe.ingredients}</p>
      </div>
      <div className={styles.actions}>
        <Link href={`/${recipe.id}/edit`} className={styles.editButton}>
          Edit
        </Link>
        <DeleteButton recipeId={recipe.id} />
      </div>
    </div>
  )
}
