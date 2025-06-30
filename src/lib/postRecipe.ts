import { Recipe } from "@/models/Recipe";

export async function postRecipe(
  recipe: Omit<Recipe, "id" | "categoryTitle">
): Promise<Recipe> {
  const response = await fetch("/api/recipes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}
