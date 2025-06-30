import styles from "@/app/add/add.module.css"
import { getOneRecipe } from "@/service/RecipeService"
import { getAllCategories } from "@/service/CategoryService"
import EditRecipeForm from "@/components/EditRecipeForm"

export default async function EditRecipePage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = await params
  const recipe = await getOneRecipe(id)
  const categories = await getAllCategories()

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit {recipe.title}</h1>
      <EditRecipeForm recipe={recipe} categories={categories} />
    </div>
  )
}
