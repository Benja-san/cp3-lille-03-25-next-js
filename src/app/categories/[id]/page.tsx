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
  const data = await getCategoryWithRecipes(id);
  const recipes = Array.isArray(data) ? data : [];
  const categoryTitle = recipes[0]?.category_title || "Category Title";

  const {
    category,
    recipes: finalRecipes,
  }: {
    category: Category | { id: string; title: string };
    recipes: Recipe[];
  } = {
    category: { id: id, title: `${categoryTitle} category` },
    recipes: [],
  };

  if (!id || !category || recipes.length === 0)
    return <p>Nothing has been found there mate !</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recipes in {category.title}</h1>
      <div className={styles.grid}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
