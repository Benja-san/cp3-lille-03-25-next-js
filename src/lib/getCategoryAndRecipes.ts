import { Category } from "@/models/Category"
import { Recipe } from "@/models/Recipe"
import { doSomething } from "./data"

interface CategoryWithRecipes {
  category: Category
  recipes: Recipe[]
}

export async function getCategoryAndRecipes(
  id: string
): Promise<CategoryWithRecipes | string> {
  // fetch API with REST pattern to get categories and recipes
  return doSomething(id)
}
