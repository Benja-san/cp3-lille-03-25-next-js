import { getConnection } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const connection = await getConnection();
  try {
    const { id } = params;
    const categoriesId = parseInt(id);

    if (isNaN(categoriesId)) {
      return NextResponse.json(
        { error: "Identifiant incorrect, aucune catégorie trouvée" },
        { status: 400 }
      );
    }
    const [rows] = await connection.execute(
      "SELECT c.id AS category_id, c.title AS category_title, c.image_path AS category_image, r.id AS recipe_id, r.title AS recipe_title, r.description AS recipe_description, r.picture AS recipe_image FROM categories AS c LEFT JOIN recipes AS r ON c.id = r.category_id WHERE c.id = ?",
      [categoriesId]
    );
    if ((rows as any[]).length === 0) {
      return NextResponse.json(
        { message: "Catégorie non trouvée" },
        { status: 404 }
      );
    }
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching category and recipes:", error);
    return NextResponse.json(
      { message: "Error fetching category and recipes" },
      { status: 500 }
    );
  } finally {
    connection.end();
  }
}
