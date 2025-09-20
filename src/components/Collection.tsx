import React, { useState, useEffect } from "react";
import Letters from "./collections/Letters";
import Sleeping from "./collections/Sleeping";
import LoL from "./collections/LoL";
import Silly from "./collections/Silly";
import Baby from "./collections/Baby";
import Chana from "./collections/chana";

import { motion } from "motion/react";
import { Mail, Bed, View, Heart, Smile, Baby as BabyIcon, ChevronRight, ArrowRight } from "lucide-react";

export type CollectionType = "letters" | "sleeping" | "lol" | "silly" | "baby" | "chana";

export default function Collection() {
  const [currentCollection, setCurrentCollection] =
    useState<CollectionType>("letters");
  const [showLetters, setShowLetters] = useState(false);
  const [showSleeping, setShowSleeping] = useState(false);
  const [showLoL, setShowLoL] = useState(false);
  const [showSilly, setShowSilly] = useState(false);
  const [showBaby, setShowBaby] = useState(false);
  const [showChana, setShowChana] = useState(false);

  // Scroll to top on collection change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentCollection, showLetters, showSleeping, showLoL, showSilly, showBaby, showChana]);

  const renderCollection = () => {
    if (showLetters) {
      return <Letters onBack={() => setShowLetters(false)} />;
    }
    if (showSleeping) {
      return <Sleeping onBack={() => setShowSleeping(false)} />;
    }
    if (showLoL) {
      return <LoL onBack={() => setShowLoL(false)} />;
    }
    if (showSilly) {
      return <Silly onBack={() => setShowSilly(false)} />;
    }
    if (showBaby) {
      return <Baby onBack={() => setShowBaby(false)} />;
    }
    if (showChana) {
      return <Chana onBack={() => setShowChana(false)} />;
    }
    return (
      <div className="mt-16 flex flex-col items-center justify-center p-6 gap-3">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.8 }}
          style={{
            width: "100%",
            height: "50px",
            borderRadius: "1rem",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(5px)",
            background: "oklch(0.656 0.241 354.308, 0.12)",
          }}
          className="flex text-center text-gray-200 font-bold text-lg items-center gap-4 p-8"
          onClick={() => setShowBaby(true)}
        >
          <BabyIcon
            className="bg-gray-800 text-gray-200"
            style={{
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "3rem",
              width: "3rem",
              height: "2rem",
              padding: "0.3rem",
            }}
          />
          Baby
          <ArrowRight
            className="ml-auto text-pink-500"
            style={{
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "3rem",
              width: "4rem",
              height: "2rem",
              padding: "0.3rem",
            }}
          />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.8 }}
          style={{
            width: "100%",
            height: "50px",
            borderRadius: "1rem",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(5px)",
            background: "oklch(0.656 0.241 354.308, 0.12)",
          }}
          className="flex text-center text-gray-200 font-bold text-lg items-center gap-4 p-8"
          onClick={() => setShowChana(true)}
        >
          <Heart
            className="bg-gray-800 text-gray-200"
            style={{
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "3rem",
              width: "3rem",
              height: "2rem",
              padding: "0.3rem",
            }}
          />
          Chana
          <ArrowRight
            className="ml-auto text-pink-500"
            style={{
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "3rem",
              width: "4rem",
              height: "2rem",
              padding: "0.3rem",
            }}
          />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.8 }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
          style={{
            width: "100%",
            height: "50px",
            borderRadius: "1rem",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(5px)",
            background: "oklch(0.656 0.241 354.308, 0.12)",
          }}
          className="flex text-center text-gray-200 font-bold text-lg items-center gap-4 p-8"
          onClick={() => setShowLetters(true)}
        >
          <Mail
            className="bg-gray-800 text-gray-200"
            style={{
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "3rem",
              width: "3rem",
              height: "2rem",
              padding: "0.3rem",
            }}
          />
          Letters
          <ArrowRight
            className="ml-auto text-pink-500"
            style={{
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "3rem",
              width: "4rem",
              height: "2rem",
              padding: "0.3rem",
            }}
          />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.8 }}
          style={{
            width: "100%",
            height: "50px",
            borderRadius: "1rem",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(5px)",
            background: "oklch(0.656 0.241 354.308, 0.12)",
          }}
          className="flex text-center text-gray-200 font-bold text-lg items-center gap-4 p-8"
          onClick={() => setShowLoL(true)}
        >
          <View
            className="bg-gray-800 text-gray-200"
            style={{
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "3rem",
              width: "3rem",
              height: "2rem",
              padding: "0.3rem",
            }}
          />
          Look of Love
          <ArrowRight
            className="ml-auto text-pink-500"
            style={{
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "3rem",
              width: "4rem",
              height: "2rem",
              padding: "0.3rem",
            }}
          />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.8 }}
          style={{
            width: "100%",
            height: "50px",
            borderRadius: "1rem",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(5px)",
            background: "oklch(0.656 0.241 354.308, 0.12)",
          }}
          className="flex text-center text-gray-200 font-bold text-lg items-center gap-4 p-8"
          onClick={() => setShowSleeping(true)}
        >
          <Bed
            className="bg-gray-800 text-gray-200"
            style={{
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "3rem",
              width: "3rem",
              height: "2rem",
              padding: "0.3rem",
            }}
          />
          Sleeping
          <ArrowRight
            className="ml-auto text-pink-500"
            style={{
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "3rem",
              width: "4rem",
              height: "2rem",
              padding: "0.3rem",
            }}
          />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.8 }}
          style={{
            width: "100%",
            height: "50px",
            borderRadius: "1rem",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(5px)",
            background: "oklch(0.656 0.241 354.308, 0.12)",
          }}
          className="flex text-center text-gray-200 font-bold text-lg items-center gap-4 p-8"
          onClick={() => setShowSilly(true)}
        >
          <Smile
            className="bg-gray-800 text-gray-200"
            style={{
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "3rem",
              width: "3rem",
              height: "2rem",
              padding: "0.3rem",
            }}
          />
          Silly
          <ArrowRight
            className="ml-auto text-pink-500"
            style={{
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "3rem",
              width: "4rem",
              height: "2rem",
              padding: "0.3rem",
            }}
          />
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
