"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import styles from "@/app/add/add.module.css"
import { Recipe } from "@/models/Recipe"
import { Category } from "@/models/Category"
import { updateOneRecipe } from "@/service/RecipeService"

interface EditRecipeFormProps {
  recipe: Recipe
  categories: Category[]
}

export default function EditRecipeForm({
  recipe,
  categories,
}: EditRecipeFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [formValues, setFormValues] = useState({
    title: recipe.title,
    description: recipe.description,
    ingredients: recipe.ingredients,
    categoryId: recipe.categoryId ? String(recipe.categoryId) : "",
    picture: recipe.picture || "",
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      try {
        await updateOneRecipe(String(recipe.id), {
          ...formValues,
          categoryId: parseInt(formValues.categoryId),
        })
        router.push(`/${recipe.id}`)
      } catch (e: unknown) {
        if (e instanceof Error) {
          alert(`Error updating recipe: ${e.message}`)
        } else {
          alert("An unknown error occurred while updating the recipe.")
        }
      }
    })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="title" className={styles.label}>
        Title
      </label>
      <input
        type="text"
        id="title"
        name="title"
        className={styles.input}
        value={formValues.title}
        onChange={handleChange}
        required
      />
      <label htmlFor="description" className={styles.label}>
        Description
      </label>
      <textarea
        id="description"
        name="description"
        className={styles.textarea}
        value={formValues.description}
        onChange={handleChange}
        required
      />
      <label htmlFor="ingredients" className={styles.label}>
        Ingredients
      </label>
      <textarea
        id="ingredients"
        name="ingredients"
        className={styles.textarea}
        value={formValues.ingredients}
        onChange={handleChange}
        required
      />
      <label htmlFor="picture" className={styles.label}>
        Picture URL
      </label>
      <input
        type="text"
        id="picture"
        name="picture"
        className={styles.input}
        value={formValues.picture}
        onChange={handleChange}
      />
      <label htmlFor="category" className={styles.label}>
        Category
      </label>
      <select
        id="category"
        name="categoryId"
        className={styles.input}
        value={formValues.categoryId}
        onChange={handleChange}
      >
        <option value="">Select a category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={String(cat.id)}>
            {cat.title}
          </option>
        ))}
      </select>
      <button type="submit" className={styles.button} disabled={isPending}>
        {isPending ? "Updating..." : "Update Recipe"}
      </button>
    </form>
  )
}
