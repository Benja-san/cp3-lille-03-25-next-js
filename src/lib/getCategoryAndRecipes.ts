import { Category } from "@/models/Category";
import { Recipe } from "@/models/Recipe";
import { doSomething } from "./data";

interface CategoryWithRecipes {
  category: Category;
  recipes: Recipe[];
}

export async function getCategoryAndRecipes(
  id: string
): Promise<CategoryWithRecipes | string> {
  const res = await fetch(`http://localhost:3000/api/categories/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch recipe");
  }
  return res.json();
}
