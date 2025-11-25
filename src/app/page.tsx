"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function check() {
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/check", {
      method: "POST",
      body: JSON.stringify({ handle: input }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-6"
      style={{
        backgroundImage: "url('/tria.jfif')",
      }}
    >
      <div className="backdrop-blur-md bg-black/40 p-8 rounded-xl max-w-md w-full border border-white/20 shadow-xl space-y-5 text-white">
        <h1 className="text-3xl font-bold text-center">Tria Airdrop Checker</h1>

        <input
          className="w-full p-3 rounded bg-white/10 border border-white/20 placeholder-white/50 focus:outline-none"
          placeholder="Enter X / Twitter handle..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={check}
          disabled={!input || loading}
          className="w-full bg-blue-500 hover:bg-blue-600 p-3 rounded font-bold disabled:bg-gray-600 transition"
        >
          {loading ? "Checking..." : "Check Eligibility"}
        </button>

        {result && (
          <div className="p-4 bg-white/10 border border-white/20 rounded">
            {result.error && <p className="text-red-300">{result.error}</p>}

            {result.eligible === true && (
              <div>
                <p className="text-green-400 font-semibold text-lg">
                  🎉 Eligible!
                </p>
                <p className="mt-1">Rank: {result.rank}</p>
                <p>Allocation: {result.allocation}</p>
              </div>
            )}

            {result.eligible === false && (
              <p className="text-red-400 font-semibold text-lg">
                ❌ Not Eligible
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
