import styles from "@/app/page.module.css";
import { getAllCategories } from "@/service/CategoryService";
import Link from "next/link";

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Categories</h1>
      <div className={styles.grid}>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.id}`}
            className={styles.card}
          >
            <h2>{category.title}</h2>
            <img
              src={category.image_path}
              alt={category.title}
              width={250}
              height={250}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
