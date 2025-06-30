import { doSomething } from "@/lib/data";
import { getCategories } from "@/lib/getCategories";
import { Category } from "@/models/Category";
import { Recipe } from "@/models/Recipe";
import { getCategoryAndRecipes } from "@/lib/getCategoryAndRecipes";

export async function getAllCategories(): Promise<Category[]> {
  return await getCategories();
}

export async function getCategoryWithRecipes(
  id: string
): Promise<{ category: Category; recipes: Recipe[] } | string> {
  return await getCategoryAndRecipes(id);
}
