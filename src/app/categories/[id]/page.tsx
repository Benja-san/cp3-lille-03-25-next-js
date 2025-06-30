import styles from "@/app/page.module.css";
import RecipeCard from "@/components/RecipeCard";
import { Category } from "@/models/Category";
import { Recipe } from "@/models/Recipe";
import { getCategoryWithRecipes } from "@/service/CategoryService";

export default async function CategoryRecipesPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const data: any[] = await getCategoryWithRecipes(id);
  const category: Category = {
    id: data[0].category_id,
    title: data[0].category_title,
    image: data[0].category_image,
  };

  const recipes: Recipe[] = data
    .filter((row) => row.recipe_id)
    .map((row) => ({
      id: row.recipe_id,
      title: row.recipe_title,
      description: row.recipe_description,
      picture: row.recipe_image,
    }));

  if (!id || !category || recipes.length === 0)
    return <p>Nothing has been found there mate !</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recipes in {category.title}</h1>
      <div className={styles.grid}>
        {recipes.map((recipe: Recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
