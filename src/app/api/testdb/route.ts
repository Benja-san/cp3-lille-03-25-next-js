import { NextResponse } from "next/server";
import { getConnection } from "@/lib/db";

export async function GET() {
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute("SELECT 1");
    connection.end();
    return NextResponse.json({ success: true, result: rows });
  } catch (error: any) {
    console.error("Erreur de connexion :", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
