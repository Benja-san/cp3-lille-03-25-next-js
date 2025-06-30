import { deleteRecipe } from "@/lib/deleteRecipe";
import { getRecipe } from "@/lib/getRecipe";
import { getRecipes } from "@/lib/getRecipes";
import { postRecipe } from "@/lib/postRecipe";
import { updateRecipe } from "@/lib/updateRecipe";
import { Recipe } from "@/models/Recipe";

async function getOneRecipe(id: string): Promise<Recipe> {
  return await getRecipe(id);
}

async function getAll(): Promise<Recipe[]> {
  return await getRecipes();
}

async function deleteOneRecipe(id: number): Promise<Response> {
  return await deleteRecipe(id);
}

async function updateOneRecipe(
  id: string,
  recipe: Omit<Recipe, "id" | "categoryTitle">
): Promise<Response> {
  return await updateRecipe(id, recipe);
}

async function createRecipe(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const ingredients = formData.get("ingredients") as string;
  const picture = formData.get("picture") as string;
  const categoryId = formData.get("category") as string;

  if (!title || !description || !ingredients || !categoryId) {
    throw new Error("Missing required fields");
  }

  const recipe: Omit<Recipe, "id" | "categoryTitle"> = {
    title,
    description,
    ingredients,
    picture,
    categoryId: parseInt(categoryId),
  };

  return await postRecipe(recipe);
}

export { createRecipe, deleteOneRecipe, getAll, getOneRecipe, updateOneRecipe };
