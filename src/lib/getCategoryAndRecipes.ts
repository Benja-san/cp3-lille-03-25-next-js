import { Category } from "@/models/Category";
import { Recipe } from "@/models/Recipe";

interface CategoryWithRecipes {
  category: Category;
  recipes: Recipe[];
}

export async function getCategoryAndRecipes(
  id: string
): Promise<CategoryWithRecipes | string> {
  const response = await fetch(`http://localhost:3000/api/categories/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch categories and recipes");
  }
  return response.json();
}
