import { Recipe } from "@/lib/data";
import { getConnection } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const connection = await getConnection();
  try {
    const { id } = await params;
    const [rows] = await connection.execute(
      "SELECT r.*, c.title as category_title FROM recipes r LEFT JOIN categories c ON r.category_id = c.id WHERE r.id = ?",
      [id]
    );
    if ((rows as Recipe[]).length === 0) {
      return NextResponse.json(
        { message: "Recipe not found" },
        { status: 404 }
      );
    }
    return NextResponse.json((rows as Recipe[])[0]);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return NextResponse.json(
      { message: "Error fetching recipe" },
      { status: 500 }
    );
  } finally {
    connection.end();
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const connection = await getConnection();
  try {
    const { id } = await params;
    const recipeId = parseInt(id);
    const updatedRecipe = (await request.json()) as Recipe;
    const { title, description, ingredients, picture, categoryId } =
      updatedRecipe;

    if (typeof recipeId !== "number" || isNaN(recipeId)) {
      return NextResponse.json(
        { error: "Informations invalides" },
        { status: 400 }
      );
    }

    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof ingredients !== "string" ||
      typeof picture !== "string" ||
      typeof categoryId !== "number" ||
      title.trim() === "" ||
      description.trim() === "" ||
      ingredients.trim() === "" ||
      picture.trim() === "" ||
      categoryId <= 0 ||
      title.length > 255 ||
      picture.length > 255
    ) {
      return NextResponse.json(
        { error: "Les données ne sont pas valides" },
        { status: 400 }
      );
    }

    const [result] = await connection.execute(
      "UPDATE recipes SET title = ?, description = ?, ingredients = ?, picture = ?, category_id = ? WHERE id = ?",
      [
        title.trim(),
        description.trim(),
        ingredients.trim(),
        picture.trim(),
        categoryId,
        recipeId,
      ]
    );

    if (!result) {
      return NextResponse.json(
        { error: "Recette non trouvée" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Recette modifiée" });
  } catch (error) {
    console.error("Error updating recipe:", error);
    return NextResponse.json(
      { message: "Error updating recipe" },
      { status: 500 }
    );
  } finally {
    connection.end();
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const connection = await getConnection();
  try {
    const { id } = await params;
    const recipeId = parseInt(id);

    if (isNaN(recipeId)) {
      return NextResponse.json(
        { error: "Identifiant incorrect, suppression impossible" },
        { status: 400 }
      );
    }
    await connection.execute("DELETE FROM recipes WHERE id = ?", [recipeId]);
    return NextResponse.json({ message: "Recette supprimée!" });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return NextResponse.json(
      { message: "Error deleting recipe" },
      { status: 500 }
    );
  } finally {
    connection.end();
  }
}
