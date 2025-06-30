import { NextRequest, NextResponse } from "next/server"
import { getConnection } from "@/lib/db"
import { ResultSetHeader } from "mysql2"

export async function GET() {
  const connection = await getConnection()
  try {
    const [rows] = await connection.execute(
      "SELECT r.*, c.title as category_title FROM recipes r LEFT JOIN categories c ON r.category_id = c.id"
    )
    return NextResponse.json(rows)
  } catch (error) {
    console.error("Error fetching recipes:", error)
    return NextResponse.json(
      { message: "Error fetching recipes" },
      { status: 500 }
    )
  } finally {
    connection.end()
  }
}

export async function POST(request: NextRequest) {
  const connection = await getConnection()
  try {
    const { title, description, ingredients, picture, categoryId } =
      await request.json()
    if (!title || !description || !ingredients || !picture || !categoryId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }
    const [result] = await connection.execute(
      "INSERT INTO recipes (title, description, ingredients, picture, category_id) VALUES (?, ?, ?, ?, ?)",
      [title, description, ingredients, picture, categoryId]
    )
    return NextResponse.json(
      {
        id: (result as ResultSetHeader).insertId,
        title,
        description,
        ingredients,
        picture,
        categoryId,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating recipe:", error)
    return NextResponse.json(
      { message: "Error creating recipe" },
      { status: 500 }
    )
  } finally {
    connection.end()
  }
}

export async function DELETE(req: Request) {
  const connection = await getConnection()
  try {
    const url = new URL(req.url)
    const idParam = url.searchParams.get("id")
    const recipeId = idParam !== null ? parseInt(idParam, 10) : NaN

    if (isNaN(recipeId)) {
      return NextResponse.json(
        { message: "Invalid recipe ID" },
        { status: 400 }
      )
    }

    await connection.execute("DELETE FROM recipes WHERE id = ?", [recipeId])
    return NextResponse.json({ message: "Recipe deleted successfully" })
  } catch (error) {
    console.error("Error deleting recipe:", error)
    return NextResponse.json(
      { message: "Error deleting recipe" },
      { status: 500 }
    )
  } finally {
    connection.end()
  }
}