import Link from "next/link";
import styles from "./RecipeCard.module.css";
import { Recipe } from "@/models/Recipe";

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <h3 className={styles.title}>{recipe.title}</h3>
        {/* For checkpoint needs We won't use Image component, so you can import img from any url */}
        <img src={recipe.picture} alt={recipe.title} className={styles.image} />
        <p className={styles.description}>{recipe.description}</p>
        {recipe.categoryTitle && (
          <p className={styles.category}>Category: {recipe.categoryTitle}</p>
        )}
        <div className={styles.actions}>
          <Link href={`/${recipe.id}`} className={styles.button}>
            View
          </Link>
          <Link href={`/${recipe.id}/edit`} className={styles.button}>
            Edit
          </Link>
          <Link href={`/${recipe.id}/delete`} className={styles.button}>
            Delete
          </Link>
        </div>
      </div>
    </div>
  );
}
