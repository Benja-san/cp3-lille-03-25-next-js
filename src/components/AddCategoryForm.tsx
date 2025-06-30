"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/add/add.module.css";
import { createCategory } from "@/service/CategoryService";

export default function AddCategoryForm() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsPending(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      await createCategory(formData);
      router.push("/categories");
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && <p className={styles.error}>{error}</p>}
      <label htmlFor="title" className={styles.label}>
        Title
      </label>
      <input
        type="text"
        id="title"
        name="title"
        className={styles.input}
        required
      />

      <label htmlFor="picture" className={styles.label}>
        Picture URL
      </label>
      <input
        type="text"
        id="picture"
        name="picture"
        className={styles.input}
        required
      />

      <button type="submit" className={styles.button} disabled={isPending}>
        {isPending ? "Adding Category..." : "Add Category"}
      </button>
    </form>
  );
}
