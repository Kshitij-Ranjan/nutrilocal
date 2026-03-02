"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";

export default function DietPage() {
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("Low");
  const [dietType, setDietType] = useState("Vegetarian");
  const [deficiency, setDeficiency] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const [chatOpen, setChatOpen] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  useEffect(() => {
    const handleMove = (e) => {
      const { innerWidth, innerHeight } = window;

      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;

      rotateX.set(-y);
      rotateY.set(x);

      setMouse({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [rotateX, rotateY]);

  const handleAgeChange = (value) => {
    const num = Number(value);
    if (num >= 0) setAge(num);
  };

  const generatePlan = async () => {
    if (age === "" || age < 0) {
      alert("Enter valid age.");
      return;
    }

    setLoading(true);

    try {
      const dietRes = await fetch("/api/diet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location,
          budget,
          dietType,
          deficiency,
        }),
      });

      const dietData = await dietRes.json();
      setResult(dietData.result);
    } catch {
      setResult("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden px-6 py-32">

      {/* Cursor Glow */}
      <div
        className="pointer-events-none fixed w-64 h-64 bg-red-600/20 blur-[120px] rounded-full transition duration-200"
        style={{
          left: mouse.x - 128,
          top: mouse.y - 128,
        }}
      />

      {/* Tilt Glass Card */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1000,
        }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-3xl backdrop-blur-xl bg-white/5 border border-white/10 p-10 rounded-3xl shadow-2xl"
      >
        <h1 className="text-4xl font-bold text-center text-red-500 mb-8">
          Get Your Personalized Diet
        </h1>

        <div className="grid gap-5">

          <input
            type="number"
            min="0"
            placeholder="Age"
            className="bg-black/40 p-3 rounded-xl border border-zinc-700 focus:border-red-600 outline-none transition"
            value={age}
            onChange={(e) => handleAgeChange(e.target.value)}
          />

          <input
            type="text"
            placeholder="Location"
            className="bg-black/40 p-3 rounded-xl border border-zinc-700 focus:border-red-600 outline-none transition"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <select
            className="bg-black/40 p-3 rounded-xl border border-zinc-700"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          >
            <option>Low</option>
            <option>Moderate</option>
            <option>Flexible</option>
          </select>

          <select
            className="bg-black/40 p-3 rounded-xl border border-zinc-700"
            value={dietType}
            onChange={(e) => setDietType(e.target.value)}
          >
            <option>Vegetarian</option>
            <option>Non-Vegetarian</option>
          </select>

          <input
            type="text"
            placeholder="Known Deficiency"
            className="bg-black/40 p-3 rounded-xl border border-zinc-700 focus:border-red-600 outline-none transition"
            value={deficiency}
            onChange={(e) => setDeficiency(e.target.value)}
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generatePlan}
            className="bg-red-600 hover:bg-red-700 p-3 rounded-xl font-semibold transition shadow-[0_0_30px_rgba(220,38,38,0.4)]"
          >
            {loading ? "Generating..." : "Generate Plan"}
          </motion.button>

        </div>

        {result && (
          <div className="mt-8 bg-black/40 p-6 rounded-xl border border-zinc-700 whitespace-pre-line">
            <h2 className="text-2xl font-bold text-red-500 mb-4">
              Your Plan
            </h2>
            {result}
          </div>
        )}
      </motion.div>

      {/* Floating Chat Button */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-2xl transition duration-300"
        >
          S
        </button>
      )}

    </main>
  );
}