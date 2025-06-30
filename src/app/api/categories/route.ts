import { NextResponse, NextRequest } from "next/server";
import { getConnection } from "@/lib/db";
import { ResultSetHeader } from "mysql2";

export async function GET() {
  const connection = await getConnection();
  try {
    const [rows] = await connection.execute("SELECT * FROM categories");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { message: "Error fetching categories" },
      { status: 500 }
    );
  } finally {
    connection.end();
  }
}

export async function POST(request: NextRequest) {
  const connection = await getConnection();
  try {
    const { title, image_path } = await request.json();
    if (!title || !image_path) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    const [result] = await connection.execute(
      "INSERT INTO categories (title, image_path) VALUES (?, ?)",
      [title, image_path]
    );
    return NextResponse.json(
      {
        id: (result as ResultSetHeader).insertId,
        title,
        image_path,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { message: "Error creating category" },
      { status: 500 }
    );
  } finally {
    connection.end();
  }
}
