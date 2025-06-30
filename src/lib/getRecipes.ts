import { Recipe } from "@/models/Recipe";

export async function getRecipes(): Promise<Recipe[]> {
  const response = await fetch("http://localhost:3000/api/recipes");
  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }
  const data = await response.json();
  return data;
}
