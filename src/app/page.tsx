"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/api/noticias/39");
      const data = await res.json();
      console.log(data);
      setData(data);
    };

    fetchData();
  }, []);

  return (
    <main>
      {data.length === 0 ? <h1>Cargando...</h1> : <h1>{data[0].titulo}</h1>}
    </main>
  );
}
