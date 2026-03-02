"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useMotionValue } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [showPassword, setShowPassword] = useState(false);

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

  const handleLogin = () => {
    setError("");

    const users =
      JSON.parse(localStorage.getItem("nutriUsers")) || [];

    const matchedUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!matchedUser) {
      setError("Invalid email or password.");
      return;
    }

    localStorage.setItem("nutriUser", JSON.stringify(matchedUser));
    router.push("/home");
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">

      {/* Cursor Glow */}
      <div
        className="pointer-events-none fixed w-64 h-64 bg-red-600/20 blur-[120px] rounded-full transition duration-200"
        style={{
          left: mouse.x - 128,
          top: mouse.y - 128,
        }}
      />

      {/* Glass Card With Tilt */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1000,
        }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 p-10 rounded-3xl shadow-2xl"
      >
        <h1 className="text-4xl font-bold text-center text-red-500 mb-8">
          Login
        </h1>

        <div className="grid gap-5">

          <input
            type="email"
            placeholder="Email"
            className="bg-black/40 p-3 rounded-xl border border-zinc-700 focus:border-red-600 outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="bg-black/40 p-3 rounded-xl border border-zinc-700 focus:border-red-600 outline-none transition w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-sm text-gray-400 cursor-pointer"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogin}
            className="bg-red-600 hover:bg-red-700 p-3 rounded-xl font-semibold transition shadow-[0_0_30px_rgba(220,38,38,0.4)]"
          >
            Login
          </motion.button>

        </div>

        <p className="text-gray-400 text-sm text-center mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-red-500 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </motion.div>

    </main>
  );
}