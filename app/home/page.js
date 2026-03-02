"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function HomePage() {
  const router = useRouter();

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const [user, setUser] = useState(null);

useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("nutriUser"));
  if (!storedUser) {
    window.location.href = "/login";
  } else {
    setUser(storedUser);
  }
}, []);

useEffect(() => {
  const user = localStorage.getItem("nutriUser");
  if (!user) {
    window.location.href = "/login";
  }
}, []);
  return (
    <>
      {/* NAVBAR */}
<nav className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md border-b border-zinc-800">
  <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

    {/* Logo */}
    <h1 className="text-xl font-bold text-white tracking-wide">
      NutriLocal
    </h1>

    {/* User Section */}
    <div className="relative group">

      {/* Username */}
      <span className="text-red-500 text-lg font-semibold cursor-pointer transition">
        {user?.name}
      </span>

      {/* Hover Logout */}
      <button
        onClick={() => {
          localStorage.removeItem("nutriUser");
          window.location.href = "/login";
        }}
        className="absolute right-0 top-full mt-2 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-lg text-sm text-white opacity-0 group-hover:opacity-100 transition duration-200 shadow-xl"
      >
        Logout
      </button>

    </div>

  </div>
</nav>

      {/* HERO SECTION */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center text-center text-white overflow-hidden"
      >
        {/* Background Zoom Parallax */}
        <motion.div
          className="absolute inset-0 bg-fixed bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-bg.png')", scale }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 px-6"
        >
          {/* Premium Interactive Title */}
<motion.h1
  onMouseMove={(e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;

    e.currentTarget.style.transform = `
      perspective(1000px)
      rotateX(${-rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.05)
    `;
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
  }}
  initial={{ opacity: 0, y: 60 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  className="relative text-7xl font-extrabold tracking-tight 
             bg-gradient-to-r from-red-500 via-red-400 to-red-600 
             bg-clip-text text-transparent 
             drop-shadow-[0_0_30px_rgba(220,38,38,0.4)] 
             transition-transform duration-200 ease-out"
>
  NutriLocal

  {/* Light Sweep Effect */}
  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                   opacity-0 hover:opacity-100 transition duration-700 
                   blur-xl pointer-events-none"></span>
</motion.h1>

          <p className="text-xl mt-6 max-w-2xl mx-auto text-gray-300">
            Personalized nutrition. Local food intelligence.
            Budget-aware health planning.
          </p>
        </motion.div>
      </motion.section>
      
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-40"></div>
      {/* WHAT WE DO */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="min-h-screen flex items-center justify-center bg-black text-white px-8"
      >
        <div className="max-w-4xl text-center">
          <motion.h2
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-5xl font-bold mb-8"
          >
            What We Do
          </motion.h2>

          <motion.p
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-lg text-gray-400"
          >
            NutriLocal analyzes symptoms and deficiencies to generate a
            location-aware, budget-friendly daily diet plan — using only
            real food that you can access.
          </motion.p>
        </div>
      </motion.section>

      <div className="h-1 w-full bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-40"></div>

      {/* IMPORTANCE SECTION */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center text-center text-white overflow-hidden"
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-fixed bg-cover bg-center"
          style={{ backgroundImage: "url('/importance-bg.png')" }}
        />

        {/* Cinematic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/95" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-3xl px-8"
        >
          <h2 className="text-6xl font-bold mb-6">
            Why It Matters
          </h2>

          <p className="text-lg text-gray-300">
            Most people know their symptoms — but not what to eat.
            NutriLocal bridges that gap with intelligent food planning
            grounded in accessibility and affordability.
          </p>
        </motion.div>
      </motion.section>

      <div className="h-1 w-full bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-40"></div>

      {/* CTA SECTION */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="min-h-screen flex items-center justify-center bg-black text-white px-8"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-6xl font-extrabold mb-8">
            Ready to Transform Your Diet?
          </h2>

          <button
            onClick={() => router.push("/diet")}
            className="bg-red-600 hover:bg-red-700 text-white py-5 px-10 rounded-xl text-xl font-bold transition duration-300 shadow-xl"
          >
            Get Your Personalized Diet
          </button>
        </motion.div>
      </motion.section>

      {/* FLOATING CTA */}
      <button
        onClick={() => router.push("/diet")}
        className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white p-5 rounded-full shadow-2xl text-lg font-bold animate-pulse transition duration-300"
      >
        Get Diet
      </button>
    </>
  );
}