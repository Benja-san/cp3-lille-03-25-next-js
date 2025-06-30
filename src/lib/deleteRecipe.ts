import { doSomething } from "./data"

export async function deleteRecipe(recipeId: number): Promise<Response> {
  const response = await fetch(
    `http://localhost:3000/api/recipes/${recipeId}`,
    {
      method: "DELETE",
    }
  )
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const data = await response.json()
  if (data.message === doSomething(recipeId.toString())) {
    throw new Error(doSomething(recipeId.toString()))
  }
  return response
}
