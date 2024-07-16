import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// Configura la conexión a la base de datos
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "uesevipr_uesevi",
};

// Función GET para realizar una consulta
export async function GET(req: any, context: any) {

  const { params } = context;
  try {
    // Crear una conexión a la base de datos
    const connection = await mysql.createConnection(dbConfig);

    // Realizar una consulta
    const [rows, fields] = await connection.execute(
      "SELECT * FROM noticias WHERE id = ?",
      [params.id]
    );

    // Cerrar la conexión
    await connection.end();

    // Devolver los resultados en formato JSON
    return NextResponse.json(rows);
  } catch (error) {
    // Manejo de errores
    console.error("Error al realizar la consulta:", error);
    return NextResponse.json(
      { error: "Error al realizar la consulta" },
      { status: 500 }
    );
  }
}
