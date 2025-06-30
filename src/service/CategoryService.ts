import { getCategories } from "@/lib/getCategories";
import { Category } from "@/models/Category";
import { Recipe } from "@/models/Recipe";
import { getCategoryAndRecipes } from "@/lib/getCategoryAndRecipes";
import { postCategory } from "@/lib/postCategory";

export async function getAllCategories(): Promise<Category[]> {
  return await getCategories();
}

export async function getCategoryWithRecipes(
  id: string
): Promise<{ category: Category; recipes: Recipe[] } | string> {
  return await getCategoryAndRecipes(id);
}

export async function createCategory(formData: FormData) {
  const title = formData.get("title") as string;
  const picture = formData.get("picture") as string;

  if (!title || !picture) {
    throw new Error("Missing required fields");
  }

  const category = {
    title: title,
    image_path: picture,
  };

  return await postCategory(category);
}
