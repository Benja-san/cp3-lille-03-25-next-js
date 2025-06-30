import { NextResponse } from "next/server"
import { getConnection } from "@/lib/db"

export async function GET() {
  const connection = await getConnection()
  try {
    const [rows] = await connection.execute("SELECT * FROM categories")
    return NextResponse.json(rows)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json(
      { message: "Error fetching categories" },
      { status: 500 }
    )
  } finally {
    connection.end()
  }
}
