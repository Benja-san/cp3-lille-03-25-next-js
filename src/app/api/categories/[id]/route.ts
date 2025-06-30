import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";
import { doSomething } from "@/lib/data";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const connection = await getConnection();
  try {
    if (!id) {
      return NextResponse.json(
        { message: "Category ID is required" },
        { status: 400 }
      );
    }

    const [rows] = await connection.execute(
      "SELECT r.title, r.description, r.ingredients, r.picture, c.title as category_title FROM recipes r JOIN categories c ON r.category_id = c.id WHERE c.id = ?",
      [id]
    );

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
