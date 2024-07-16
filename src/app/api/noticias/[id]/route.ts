import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// Configura la conexión a la base de datos
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "uesevipr_uesevi",
};

// Función para habilitar CORS
function enableCors(response) {
  response.headers.set("Access-Control-Allow-Origin", "*"); // Permite todas las solicitudes
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return response;
}

// Función GET para realizar una consulta
export async function GET(req, context) {
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

    // Devolver los resultados en formato JSON con CORS habilitado
    let response = NextResponse.json(rows);
    return enableCors(response);
  } catch (error) {
    // Manejo de errores
    console.error("Error al realizar la consulta:", error);
    let response = NextResponse.json(
      { error: "Error al realizar la consulta" },
      { status: 500 }
    );
    return enableCors(response);
  }
}

// Función OPTIONS para manejar preflight requests
export function OPTIONS(req) {
  let response = new NextResponse();
  return enableCors(response);
}
