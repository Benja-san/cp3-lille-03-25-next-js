import { NextRequest, NextResponse } from "next/server"
import { getConnection } from "@/lib/db"
import {  Recipe } from "@/lib/data"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const connection = await getConnection()
  try {
    const { id } = await params
    const [rows] = await connection.execute(
      "SELECT r.*, c.title as category_title FROM recipes r LEFT JOIN categories c ON r.category_id = c.id WHERE r.id = ?",
      [id]
    )
    if ((rows as Recipe[]).length === 0) {
      return NextResponse.json({ message: "Recipe not found" }, { status: 404 })
    }
    return NextResponse.json((rows as Recipe[])[0])
  } catch (error) {
    console.error("Error fetching recipe:", error)
    return NextResponse.json(
      { message: "Error fetching recipe" },
      { status: 500 }
    )
  } finally {
    connection.end()
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const connection = await getConnection()
  try {
    const { id } = await params
    const recipeId = parseInt(id, 10)

    if (isNaN(recipeId)) {
      return NextResponse.json(
        { message: "Invalid recipe ID" },
        { status: 400 }
      )
    }

    const { title, description, ingredients, picture, categoryId } = await request.json()

    if (!title || !description || !ingredients || !picture || !categoryId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }

    await connection.execute(
      "UPDATE recipes SET title = ?, description = ?, ingredients = ?, picture = ?, category_id = ? WHERE id = ?",
      [title, description, ingredients, picture, categoryId, recipeId]
    )

    return NextResponse.json({
      message: "Recipe updated successfully",
      id: recipeId,
      title,
      description,
      ingredients,
      picture,
      categoryId
    })
  } catch (error) {
    console.error("Error updating recipe:", error)
    return NextResponse.json(
      { message: "Error updating recipe" },
      { status: 500 }
    )
  } finally {
    connection.end()
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const connection = await getConnection()
  try {
    const { id } = await params
    const recipeId = parseInt(id, 10)

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
