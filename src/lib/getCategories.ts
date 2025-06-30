import { Category } from "@/models/Category";

export async function getCategories(): Promise<Category[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  const response = await fetch(`${baseUrl}/api/categories`, {});

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await response.json();
  return data;
}
