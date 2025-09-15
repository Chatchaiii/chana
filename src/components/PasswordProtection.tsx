import React, { useState } from 'react';
import { CircleArrowRight, Heart } from "lucide-react";
import { motion } from "motion/react"

interface PasswordProtectionProps {
  onBack: () => void;
}

export function PasswordProtection({ onBack }: PasswordProtectionProps) {
  // Password protection state
  const [entered, setEntered] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const correctPassword = "zendegim";

  if (!entered) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-lg flex flex-col items-center">
          <h1 className="text-3xl font-bold text-white flex items-center select-none mx-auto mb-2">
            CH
            <motion.div
              animate={{
                scale: [1, 1.5, 1.5, 1, 1],
                rotate: [0, 0, 0, 0, 0],
                borderRadius: ["0%", "0%", "50%", "50%", "0%"],
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              <Heart
                className="w-8 h-7 text-pink-600 mx-1"
                fill="currentcolor"
                stroke="currentcolor"
              />
            </motion.div>
            NA
          </h1>
          <input
            type="password"
            className="p-2 rounded bg-gray-800 text-gray-200 mb-2 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (password === correctPassword) {
                  onBack();
                  setEntered(true);
                  setError("");
                } else {
                  setError("no possible");
                }
              }
            }}
            placeholder="password"
          />
          <button
            className="bg-transparent text-gray-300 px-4 py-1 rounded-full font-bold"
            onClick={() => {
              if (password === correctPassword) {
                onBack();
                setEntered(true);
                setError("");
              } else {
                setError("no possible");
              }
            }}
          >
            <CircleArrowRight
              className="text-gray-400"
            />
          </button>
          {error && <div className="text-red-300 mt-2">{error}</div>}
        </div>
      </div >
    );
  }
}