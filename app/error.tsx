"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        background: "#ffffff",
        color: "#18181b",
        textAlign: "center",
        padding: 24,
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize: 24,
          fontWeight: 700,
        }}
      >
        Something went wrong
      </h1>

      <p
        style={{
          margin: 0,
          fontSize: 14,
          color: "#71717a",
        }}
      >
        We couldn&apos;t load this page. Please try again.
      </p>

      <button
        type="button"
        onClick={() => reset()}
        style={{
          border: "1px solid #e4e4e7",
          borderRadius: 10,
          background: "#ffffff",
          padding: "10px 16px",
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </main>
  );
}