import { NextResponse } from "next/server"
import { getConnection } from "@/lib/db"
import { doSomething } from "@/lib/data"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params
  const connection = await getConnection()
  try {
    //Your SQL query to fetch the category and its recipes
    const provisoryResponse = doSomething(id)

    return NextResponse.json(provisoryResponse)
  } catch (error) {
    console.error("Error fetching category and recipes:", error)
    return NextResponse.json(
      { message: "Error fetching category and recipes" },
      { status: 500 }
    )
  } finally {
    connection.end()
  }
}
