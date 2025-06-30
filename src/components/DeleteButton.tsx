"use client"

import { useRouter } from "next/navigation"
import styles from "./RecipeCard.module.css"
import { deleteOneRecipe } from "@/service/RecipeService"

interface DeleteButtonProps {
  recipeId: number
}

export default function DeleteButton({ recipeId }: DeleteButtonProps) {
  const router = useRouter()

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        await deleteOneRecipe(recipeId)
        alert("Recipe deleted successfully!")
        router.push("/")
      } catch (e: unknown) {
        if (e instanceof Error) {
          alert(`Error deleting recipe: ${e.message}`)
        } else {
          alert("Unknown error deleting recipe")
        }
      }
    }
  }

  return (
    <button
      onClick={handleDelete}
      className={`${styles.button} ${styles.deleteButton}`}
    >
      Delete
    </button>
  )
}
