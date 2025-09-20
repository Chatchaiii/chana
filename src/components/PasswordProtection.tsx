import React, { useState } from "react";
import { ArrowRight, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PasswordProtectionProps {
  onNavigate: () => void;
}

export function PasswordProtection({ onNavigate }: PasswordProtectionProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorKey, setErrorKey] = useState(0);
  const correctPassword = "zendegim";

  // Reset error when user types
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) {
      setError("");
      setErrorKey((prev) => prev + 1); // Change key to force AnimatePresence exit
    }
  };

  const handleSubmit = () => {
    if (password === correctPassword) {
      onNavigate();
      setError("");
    } else {
      setError("no possible");
      setErrorKey((prev) => prev + 1); // Change key to restart animation
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div
        className="max-w-sm border border-2 p-8 rounded-2xl shadow-lg flex flex-col items-center justify-center"
        style={{
          width: "90%",
          height: "200px",
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(10, 10, 10, 1) 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0,0,0,1) 100%)",
          maskImage:
            "linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0,0,0,1) 100%)",
          backdropFilter: "blur(5px)",
        }}
      >
        <h1 className="text-3xl font-bold text-white flex items-center justify-center select-none mx-auto mb-2">
          CH
          <motion.div
            drag
            dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
            dragElastic={0.2}
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
        <div className="flex flex-col items-center justify-center">
          <div
            className="border border-2 flex flex-col-2 items-center justify-between bg-gray-700 rounded-full px-4 z-[1]"
            style={{
              background:
                "linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(10, 10, 10, 1) 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0,0,0,1) 100%)",
              maskImage:
                "linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0,0,0,1) 100%)",
              backdropFilter: "blur(5px)",
            }}
          >
            <motion.input
              type="password"
              className="p-2 text-gray-200 outline-none"
              value={password}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
              placeholder=""
              style={{
                textAlign: "left",
              }}
            />
            <button
              className="bg-transparent text-gray-300 px-4 py-1 rounded-full font-bold"
              onClick={handleSubmit}
            >
              <ArrowRight className="text-pink-500" />
            </button>
          </div>
          <div className="mt-2 text-red-300 select-none">
            <AnimatePresence>
              {error && (
                <motion.div
                  key={errorKey}
                  initial={{
                    opacity: 1,
                    y: -15,
                    zIndex: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -30,
                    zIndex: 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 700,
                    damping: 60,
                  }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
