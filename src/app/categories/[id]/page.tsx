import styles from "@/app/page.module.css"
import RecipeCard from "@/components/RecipeCard"
import { Category } from "@/models/Category"
import { Recipe } from "@/models/Recipe"

export default async function CategoryRecipesPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = await params
  // Fetch category and recipes data based on the id and update the const declaration bellow
  const {
    category,
    recipes,
  }: {
    category: Category | { id: string; title: string }
    recipes: Recipe[]
  } = {
    category: { id: id, title: "Category Title" }, // Placeholder for category data
    recipes: [], // Placeholder for recipes data
  }

  if (!id || !category || recipes.length === 0)
    return <p>Nothing has been found there mate !</p>

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recipes in {category.title}</h1>
      <div className={styles.grid}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}
