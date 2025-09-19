import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { FeatureType } from "../App";
import { ArrowLeft } from "lucide-react";
import {  } from "../App";

interface BottomProps {
  onNavigate: (feature: FeatureType) => void;
  featureDisplayName: string;
  FeatureIcon?: React.ElementType;
}

export function Bottom({ onNavigate, featureDisplayName, FeatureIcon }: BottomProps) {
  return (
    <>
      {/* Dimming overlay for bottom of screen */}
      <div
        className="pointer-events-none fixed left-0 right-0 bottom-0 z-[40] overflow-auto mt-auto"
        style={{
          height: "100px",
          // Gradient for color dimming
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(10, 10, 10, 1) 100%)",
          // Gradient for blur using mask-image (Webkit for Chrome/Safari, mask for Firefox)
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0,0,0,1) 100%)",
          maskImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0,0,0,1) 100%)",
          backdropFilter: "blur(5px)",
          transition: "background 0.3s",
          bottom: "0px",
          left: "0px",
          right: "0px",
        }}
      />
      <div
        className="fixed select-none overflow-auto mt-auto"
        style={{
          bottom: "-25px",
          height: "100px",
          left: "0px",
          right: "0px",
        }}
      >
        <motion.div
          drag
          dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
          dragElastic={0.2}
          className="fixed left-auto right-3 z-[50] mt-auto"
          whileHover={{
            scale: [null, 1.01, null],
            transition: {
              duration: 0.3,
              times: [0, 0.6, 1],
              ease: ["easeInOut", "easeOut"],
            },
          }}
          whileTap={{ scale: 0.9 }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
          style={{
            border: "1px solid rgba(255, 255, 255, 0.1)",
            pointerEvents: "auto",
            backdropFilter: "blur(3px)",
            background: "rgba(217, 217, 217, 0.18)",
            borderTopLeftRadius: "3.4rem",
            borderTopRightRadius: "3.4rem",
            borderBottomLeftRadius: "3.4rem",
            borderBottomRightRadius: "3.4rem",
            alignItems: "center",
            justifyContent: "center",
            height: "64px",
          }}
        >
          <Card className="w-full border border-transparent bg-transparent shadow-none">
            <div onClick={() => onNavigate('home')} className="p-4 w-full cursor-pointer">
              <ArrowLeft className="mt-1 ml-2 mr-2 w-5 h-5 text-gray-200" style={{ width: "30px"}}/>
            </div>
          </Card>
        </motion.div>
        <motion.div
          drag
          dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
          dragElastic={0.2}
          className="fixed left-3 right-auto z-[50] mt-auto"
          whileHover={{
            scale: [null, 1.01, null],
            transition: {
              duration: 0.3,
              times: [0, 0.6, 1],
              ease: ["easeInOut", "easeOut"],
            },
          }}
          whileTap={{ scale: 0.9 }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
          style={{
            border: "1px solid rgba(255, 255, 255, 0.1)",
            pointerEvents: "auto",
            backdropFilter: "blur(5px)",
            background: "rgba(24,24,27,0.3)",
            borderTopLeftRadius: "3.4rem",
            borderTopRightRadius: "3.4rem",
            borderBottomLeftRadius: "3.4rem",
            borderBottomRightRadius: "3.4rem",
            alignItems: "center",
            justifyContent: "center",
            height: "64px",
          }}
        >
          <Card className="w-full border border-transparent bg-transparent shadow-none flex items-center">
            <h2 className="flex items-center justify-center p-4 w-full cursor-pointer font-bold text-lg" style={{ width: "200px" }}>
              {FeatureIcon && <FeatureIcon className="w-5 h-5 mr-5" />}
              {featureDisplayName}
            </h2>
          </Card>
        </motion.div>
      </div>
    </>
  );
}
