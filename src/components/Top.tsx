import { Heart, Users, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { FeatureType } from "../App";

interface TopProps {
  onNavigate: (feature: FeatureType) => void;
}

export function Top({ onNavigate }: TopProps) {
  return (
    <>
      {/* Dimming overlay for top of screen */}
      <div
        className="pointer-events-none fixed left-0 right-0 top-0 z-[40] overflow-auto mb-auto"
        style={{
          height: "100px",
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(10, 10, 10, 1) 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0,0,0,1) 100%)",
          maskImage:
            "linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0,0,0,1) 100%)",
          backdropFilter: "blur(5px)",
          transition: "background 0.3s",
        }}
      />
      <div className="fixed select-none overflow-auto mb-auto">
        <motion.div
          drag
          dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
          dragElastic={0.2}
          className="fixed top-3 right-3 left-3 z-[50] mb-auto"
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
            bottom: "20px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            pointerEvents: "auto",
            backdropFilter: "blur(5px)",
            background: "rgba(24,24,27,0.3)",
            borderTopLeftRadius: "3.4rem",
            borderTopRightRadius: "3.4rem",
            borderBottomLeftRadius: "3.4rem",
            borderBottomRightRadius: "3.4rem",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Card className="flex w-full border-transparent bg-transparent">
            <div className="flex w-full justify-between relative p-2">
              {/* Button on the left */}
              <Card className="border-transparent bg-transparent">
                <motion.div
                  whileHover={{
                    scale: [null, 1.1, null],
                    transition: {
                      duration: 0.3,
                      times: [0, 0.6, 1],
                      ease: ["easeInOut", "easeOut"],
                    },
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeOut",
                  }}
                >
                  <Button
                    onClick={() => {
                      localStorage.setItem("auth", "false");
                      window.location.href = "/login.html";
                    }}
                    className="flex items-center bg-transparent font-bold text-gray-300 select-none rounded-full cursor-pointer"
                    variant="none"
                  >
                    <Lock className="text-gray-300" />
                  </Button>
                </motion.div>
              </Card>
              {/* Centered CHANA */}
              <h1
                className="text-3xl font-bold text-white flex items-center select-none mx-auto"
                onClick={() => onNavigate("home")}
              >
                CH
                <motion.div
                  drag
                  dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }} // keeps it constrained
                  dragElastic={0.2} // controls how far it can be pulled beyond constraints
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
                  className="relative z-100"
                >
                  <Heart
                    className="w-8 h-7 text-pink-600 mx-1 cursor-pointer"
                    fill="currentcolor"
                    stroke="currentcolor"
                  />
                </motion.div>
                NA
              </h1>
              {/* Button on the right */}
              <Card className="border-transparent bg-transparent">
                <motion.div
                  whileHover={{
                    scale: [null, 1.1, null],
                    transition: {
                      duration: 0.3,
                      times: [0, 0.6, 1],
                      ease: ["easeInOut", "easeOut"],
                    },
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeOut",
                  }}
                >
                  <Button
                    onClick={() => onNavigate("user")}
                    className="flex items-center font-bold text-gray-300 select-none rounded-full cursor-pointer"
                    variant="none"
                  >
                    <Users className="text-pink-600" />
                  </Button>
                </motion.div>
              </Card>
            </div>
          </Card>
        </motion.div>
      </div>
    </>
  );
}
