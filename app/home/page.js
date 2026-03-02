"use client";

import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // Tilt logic
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("nutriUser"));
    if (!storedUser) {
      window.location.href = "/login";
    } else {
      setUser(storedUser);
    }

    const handleMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 15;
      const y = (e.clientY / innerHeight - 0.5) * 15;
      rotateX.set(-y);
      rotateY.set(x);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [rotateX, rotateY]);

  // Parallax zoom
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-xl font-bold text-white tracking-wide">
            NutriLocal
          </h1>

          <div className="relative group">
            <span className="text-red-500 text-lg font-semibold cursor-pointer">
              {user?.name}
            </span>

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

      {/* HERO */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center text-center text-white overflow-hidden"
      >
        <motion.div
          style={{ scale }}
          className="absolute inset-0 bg-fixed bg-cover bg-center"
          style={{
            backgroundImage: "url('/hero-bg.png')",
            scale,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />

        <motion.div
          style={{
            rotateX,
            rotateY,
            transformPerspective: 1000,
          }}
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 px-6"
        >
          {user && (
            <h2 className="text-2xl mb-4 font-semibold">
              Welcome,{" "}
              <span className="text-red-500">
                {user.name}
              </span>
            </h2>
          )}

          <h1 className="text-7xl font-extrabold tracking-tight bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(220,38,38,0.6)]">
            NutriLocal
          </h1>

          <p className="text-xl mt-6 max-w-2xl mx-auto text-gray-300">
            Personalized nutrition. Local food intelligence.
            Budget-aware health planning.
          </p>
        </motion.div>
      </motion.section>

      {/* RED DIVIDER */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-40"></div>

      {/* WHAT WE DO */}
      <motion.section className="min-h-screen flex items-center justify-center bg-black text-white px-8">
        <div className="max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-center mb-12"
          >
            What We Do
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-10 text-gray-400 text-lg">
            {[
              {
                icon: "🧠",
                text: "We analyze symptoms and nutritional deficiencies to understand your body's needs.",
              },
              {
                icon: "🌍",
                text: "We generate plans based on local food availability so recommendations are realistic.",
              },
              {
                icon: "💰",
                text: "Every plan is optimized for your budget — no expensive supplements required.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-zinc-800 p-8 rounded-2xl backdrop-blur-md"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <p>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* RED DIVIDER */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-40"></div>

      {/* WHY IT MATTERS */}
      <motion.section className="min-h-screen flex items-center justify-center bg-black text-white px-8">
        <div className="max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-6xl font-bold mb-12"
          >
            Why It Matters
          </motion.h2>

          <div className="space-y-6 text-gray-300 text-lg">
            <p>
              Many people experience fatigue or muscle cramps but lack clarity
              on the nutritional root causes.
            </p>

            <p>
              NutriLocal transforms confusion into structured daily meal guidance
              tailored to availability and affordability.
            </p>

            <p>
              Health should be practical, accessible, and personalized —
              not dependent on expensive pills.
            </p>
          </div>
        </div>
      </motion.section>

      {/* RED DIVIDER */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-40"></div>

      {/* CTA */}
      <motion.section className="min-h-screen flex items-center justify-center bg-black text-white px-8">
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
    </>
  );
}