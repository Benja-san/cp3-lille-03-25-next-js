import { IRecipe as Recipe } from "@/models/Recipe"
import { ICategory as Category } from "@/models/Category"

export type { Recipe, Category }

export const doSomething = (id: string) => {
  return `Do something with recipe ID: ${id} !!`
}
