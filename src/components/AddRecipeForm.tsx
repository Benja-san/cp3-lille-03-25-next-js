"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import styles from "@/app/add/add.module.css"
import { createRecipe } from "@/service/RecipeService"
import { ICategory as Category } from "@/models/Category"

interface AddRecipeFormProps {
  categories: Category[]
}

export default function AddRecipeForm({ categories }: AddRecipeFormProps) {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    setIsPending(true)
    setError(null)

    try {
      await createRecipe(formData)
      router.push("/")
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message)
      } else {
        setError("An unexpected error occurred.")
      }
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form className={styles.form} action={handleSubmit}>
      {error && <p className={styles.error}>{error}</p>}
      <label htmlFor="title" className={styles.label}>
        Title
      </label>
      <input
        type="text"
        id="title"
        name="title"
        className={styles.input}
        required
      />

      <label htmlFor="description" className={styles.label}>
        Description
      </label>
      <textarea
        id="description"
        name="description"
        className={styles.textarea}
        required
      ></textarea>

      <label htmlFor="ingredients" className={styles.label}>
        Ingredients
      </label>
      <textarea
        id="ingredients"
        name="ingredients"
        className={styles.textarea}
        required
      ></textarea>

      <label htmlFor="picture" className={styles.label}>
        Picture URL
      </label>
      <input
        type="text"
        id="picture"
        name="picture"
        className={styles.input}
        required
      />

      <label htmlFor="category" className={styles.label}>
        Category
      </label>
      <select id="category" name="category" className={styles.input} required>
        <option value="">Select a category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.title}
          </option>
        ))}
      </select>

      <button type="submit" className={styles.button} disabled={isPending}>
        {isPending ? "Adding Recipe..." : "Add Recipe"}
      </button>
    </form>
  )
}
