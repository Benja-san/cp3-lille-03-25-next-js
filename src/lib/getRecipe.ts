import { Recipe } from "@/models/Recipe";

export async function getRecipe(id: string): Promise<Recipe> {
  const res = await fetch(`http://localhost:3000/api/recipes/${id}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch recipe");
  }
  return res.json();
}