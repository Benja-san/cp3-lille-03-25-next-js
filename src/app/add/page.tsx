import AddRecipeForm from "@/components/AddRecipeForm"
import { getAllCategories } from "@/service/CategoryService"
import styles from "./add.module.css"
import { ICategory as Category } from "@/models/Category"

export default async function AddRecipePage() {
  const categories: Category[] = await getAllCategories()

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add New Recipe</h1>
      <AddRecipeForm categories={categories} />
    </div>
  )
}
