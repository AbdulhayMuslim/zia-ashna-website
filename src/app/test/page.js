"use client";

import { useEffect, useState } from "react";

export default function TestPage() {
  const [message, setMessage] = useState("Waiting for backend...");

  useEffect(() => {
    async function sendData() {
      const response = await fetch("/api/hello", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Ahmad",
          age: 22,
        }),
      });

      const result = await response.json();

      setMessage(JSON.stringify(result));
    }

    sendData();
  }, []);

  return (
    <div>
      <h1>Testing API</h1>
      <p>{message}</p>
    </div>
  );
}
