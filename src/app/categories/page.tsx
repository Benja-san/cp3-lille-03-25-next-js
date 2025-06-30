import Link from "next/link";
import styles from "@/app/page.module.css";
import { getAllCategories } from "@/service/CategoryService";

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div className={styles.container}>
      <Link href="/categories/add" className={styles.addButton}>
        Add New Category ➕
      </Link>
      <h1 className={styles.title}>Categories</h1>
      <div className={styles.grid}>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.id}`}
            className={styles.card}
          >
            <h2>{category.title}</h2>
            {/* Placeholder for image */}
            <div
              style={{
                width: "100%",
                height: "150px",
                backgroundColor: "#ccc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={category.image_path}
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
