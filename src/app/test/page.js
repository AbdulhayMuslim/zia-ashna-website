"use client";

import { useEffect } from "react";

export default function TestPage() {
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

      console.log(result);
    }

    sendData();
  }, []);

  return <h1>Sending Data...</h1>;
}
