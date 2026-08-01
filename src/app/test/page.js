"use client";

import { useEffect } from "react";

export default function TestPage() {
  useEffect(() => {
    async function load() {
      const response = await fetch("/api/hello");
      const data = await response.json();

      console.log(data);
    }

    load();
  }, []);

  return <h1>Testing API...</h1>;
}
