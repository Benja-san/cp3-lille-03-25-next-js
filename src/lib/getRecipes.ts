import { Recipe } from "@/models/Recipe"

export async function getRecipes(): Promise<Recipe[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes`)
  if (!res.ok) {
    throw new Error("Failed to fetch recipes")
  }
  return res.json()
}