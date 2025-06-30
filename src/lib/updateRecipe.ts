import { Recipe } from "@/models/Recipe"
import { doSomething } from "./data"

export async function updateRecipe(
  id: string,
  recipe: Omit<Recipe, "id" | "categoryTitle">
): Promise<Response> {
  console.log(recipe)
  const response = await fetch(`http://localhost:3000/api/recipes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  })
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const data = await response.json()
  if (data.message === doSomething(id)) {
    throw new Error(doSomething(id))
  }
  return response
}
