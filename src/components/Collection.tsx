import React, { useState, useEffect } from "react";
import Letters from "./collections/Letters"; // Import the default export (the gallery)
import Sleeping from "./collections/Sleeping"; // Import the default export (the gallery)
import { motion } from "motion/react";
import { Mail, Bed } from "lucide-react";

export type CollectionType = "letters" | "sleeping";

export default function Collection() {
  const [currentCollection, setCurrentCollection] =
    useState<CollectionType>("letters");
  const [showLetters, setShowLetters] = useState(false);
  const [showSleeping, setShowSleeping] = useState(false);

  // Scroll to top on collection change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentCollection, showLetters, showSleeping]);

  const renderCollection = () => {
    if (showLetters) {
      return <Letters onBack={() => setShowLetters(false)} />;
    }
    if (showSleeping) {
      return <Sleeping onBack={() => setShowSleeping(false)} />;
    }
    return (
      <div className="mt-16 flex flex-col items-center min-h-screen p-6 gap-4">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
          style={{
            width: "100%",
            height: "50px",
            borderRadius: "3rem",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(5px)",
            background: "oklch(0.656 0.241 354.308, 0.12)",
          }}
          className="flex text-center text-white font-bold text-lg items-center gap-4 p-5"
          onClick={() => setShowLetters(true)}
        >
          <Mail />
          Letters
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
          style={{
            width: "100%",
            height: "50px",
            borderRadius: "3rem",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(5px)",
            background: "oklch(0.656 0.241 354.308, 0.12)",
          }}
          className="flex text-center text-white font-bold text-lg items-center gap-4 p-5"
          onClick={() => setShowSleeping(true)}
        >
          <Bed />
          Sleeping
        </motion.div>
      </div>
    );
  };

  return (
    <div className="dark min-h-screen" style={{ background: "#0A0A0A" }}>
      <div className="mx-auto min-h-screen" style={{ background: "#0A0A0A" }}>
        {renderCollection()}
      </div>
    </div>
  );
}
