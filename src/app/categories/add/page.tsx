import AddCategoryForm from "@/components/AddCategoryForm";
import { getAllCategories } from "@/service/CategoryService";
import styles from "./add.module.css";
import { ICategory as Category } from "@/models/Category";

export default async function AddCategoryPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add New Category</h1>
      <AddCategoryForm />
    </div>
  );
}
