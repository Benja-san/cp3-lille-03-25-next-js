import { Category } from "@/models/Category"

export async function getCategories(): Promise<Category[]> {
  const response = await fetch("http://localhost:3000/api/categories")
  if (!response.ok) {
    throw new Error("Failed to fetch categories")
  }
  const data = await response.json()
  return data
}
