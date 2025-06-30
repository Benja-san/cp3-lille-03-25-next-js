import { doSomething } from "@/lib/data"
import { getCategories } from "@/lib/getCategories"
import { Category } from "@/models/Category"
import { Recipe } from "@/models/Recipe"

export async function getAllCategories(): Promise<Category[]> {
  return await getCategories()
}

export async function getCategoryWithRecipes(
  id: string
): Promise<{ category: Category; recipes: Recipe[] } | string> {
  // Fetch category and recipes data based on the id
  return doSomething(id)
}
