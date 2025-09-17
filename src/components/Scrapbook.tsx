// jpeg
import P_the_start from "../assets/images/timeline/the_start.jpeg";
import P_the_lake1 from "../assets/images/timeline/the_lake_1.jpeg";
import P_the_lake2 from "../assets/images/timeline/the_lake_2.jpeg";
import P_the_lake3 from "../assets/images/timeline/the_lake_3.jpeg";
import P_the_lake4 from "../assets/images/timeline/the_lake_4.jpeg";
import P_the_lake5 from "../assets/images/timeline/the_lake_5.jpeg";
import P_theatre1 from "../assets/images/timeline/theatre_1.jpeg";
import P_theatre2 from "../assets/images/timeline/theatre_2.jpeg";
import P_theatre3 from "../assets/images/timeline/theatre_3.jpeg";
import P_wannsee1 from "../assets/images/timeline/wannsee_1.jpeg";
import P_wannsee2 from "../assets/images/timeline/wannsee_2.jpeg";
import P_photo_booth from "../assets/images/timeline/photo_booth.jpeg";
import P_reflections1 from "../assets/images/timeline/reflections_1.jpeg";
import P_reflections2 from "../assets/images/timeline/reflections_2.jpeg";
import P_flight from "../assets/images/timeline/flight.jpeg";
import P_reunion from "../assets/images/timeline/reunion.jpeg";
import P_birthday_1 from "../assets/images/timeline/birthday_1.jpeg";
import P_birthday_2 from "../assets/images/timeline/birthday_2.jpeg";
import P_birthday_3 from "../assets/images/timeline/birthday_3.jpeg";
import P_birthday_4 from "../assets/images/timeline/birthday_4.jpeg";
import P_birthday_5 from "../assets/images/timeline/birthday_5.jpeg";
import P_birthday_6 from "../assets/images/timeline/birthday_6.jpeg";
import P_birthday_7 from "../assets/images/timeline/birthday_7.jpeg";
import P_birthday_2_1 from "../assets/images/timeline/birthday_2_1.jpeg";
import P_birthday_2_2 from "../assets/images/timeline/birthday_2_2.jpeg";
import P_ldr from "../assets/images/timeline/ldr.jpeg";
import P_return from "../assets/images/timeline/return.jpeg";
import P_eternal from "../assets/images/timeline/eternal.jpeg";

// video
import V_photo_booth from "../assets/video/photo_booth.mov";
import V_ldr from "../assets/video/ldr.mov";

// config
import React, { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ScrapbookProps {
  onBack: () => void;
}

type PhotoOrVideo = {
  id: number;
  src: string;
  caption: string;
  date: string;
  type?: "image" | "video";
};

export function Scrapbook({ onBack }: ScrapbookProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // swipe tracking
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // esc key close for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const items: PhotoOrVideo[] = [
    { id: 1, src: P_the_start, caption: "Sushi", date: "06.06.2025", type: "image" },
    { id: 2, src: P_the_lake1, caption: "Bridge", date: "09.06.2025", type: "image" },
    { id: 3, src: P_the_lake2, caption: "Bridge 2", date: "09.06.2025", type: "image" },
    { id: 4, src: P_the_lake3, caption: "Feet", date: "09.06.2025", type: "image" },
    { id: 5, src: P_the_lake4, caption: "Ali & Mehmet", date: "09.06.2025", type: "image" },
    { id: 6, src: P_the_lake5, caption: "First Selfie", date: "09.06.2025", type: "image" },
    { id: 7, src: P_theatre1, caption: "Hot Persian", date: "18.06.2025", type: "image" },
    { id: 8, src: P_theatre2, caption: "Eyes don't lie", date: "18.06.2025", type: "image" },
    { id: 9, src: P_theatre3, caption: "Hot Persian (in Bed)", date: "18.06.2025", type: "image" },
    { id: 10, src: P_wannsee1, caption: "Happiness", date: "26.06.2025", type: "image" },
    { id: 11, src: P_wannsee2, caption: "Sunset", date: "26.06.2025", type: "image" },
    { id: 12, src: P_photo_booth, caption: "Photo-booth", date: "05.07.2025", type: "image" },
    { id: 13, src: V_photo_booth, caption: "No. 1 Party Anthem", date: "05.07.2025", type: "video" },
    { id: 14, src: P_reflections1, caption: "Reflections of us", date: "13.07.2025", type: "image" },
    { id: 15, src: P_reflections2, caption: "My flower", date: "13.07.2025", type: "image" },
    { id: 16, src: P_flight, caption: "Flight", date: "15.07.2025", type: "image" },
    { id: 17, src: P_reunion, caption: "Reunion", date: "19.07.2025", type: "image" },
    { id: 18, src: P_birthday_1, caption: "Scavenger hunt", date: "20.07.2025", type: "image" },
    { id: 23, src: P_birthday_6, caption: "Flower-girl", date: "20.07.2025", type: "image" },
    { id: 19, src: P_birthday_2, caption: "", date: "20.07.2025", type: "image" },
    { id: 20, src: P_birthday_3, caption: "", date: "20.07.2025", type: "image" },
    { id: 21, src: P_birthday_4, caption: "", date: "20.07.2025", type: "image" },
    { id: 22, src: P_birthday_5, caption: "", date: "20.07.2025", type: "image" },
    { id: 24, src: P_birthday_7, caption: "", date: "20.07.2025", type: "image" },
    { id: 25, src: P_birthday_2_1, caption: "Oh Hannah, I wanna feel you close", date: "23.07.2025", type: "image" },
    { id: 26, src: P_birthday_2_2, caption: "Oh, Hannah, come lie with my bones", date: "23.07.2025", type: "image" },
    { id: 27, src: P_ldr, caption: "Sleep little baby", date: "01.08.2025", type: "image" },
    { id: 28, src: V_ldr, caption: "Mwahhh", date: "01.08.2025", type: "video" },
    { id: 29, src: P_return, caption: "Return", date: "05.08.2025", type: "image" },
    { id: 30, src: P_eternal, caption: "Eternal forever", date: "08.08.2025", type: "image" },
  ];

  // Group items by date
  const groupedItems = items.reduce<Record<string, PhotoOrVideo[]>>((acc, item) => {
    if (!acc[item.date]) acc[item.date] = [];
    acc[item.date].push(item);
    return acc;
  }, {});

  // Find selected item
  const selectedItem = items.find((item) => item.id === selectedId);

  return (
    <div
      className="p-6 space-y-6"
      onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStartX !== null) {
          const deltaX = e.changedTouches[0].clientX - touchStartX;
          if (deltaX > 100) {
            // onBack();
          }
        }
        setTouchStartX(null);
      }}
    >
      {/* Header */}
      <motion.div
        drag
        dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
        dragElastic={0.2}
        whileHover={{
          scale: [null, 1.01, null],
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
        <div className="grid grid-cols-1 items-center select-none">
          <Card className="border border-8">
            <Button
              onClick={onBack}
              variant="none"
              size="sm"
              className="flex items-center justify-start w-full p-6 rounded-lg cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 text-gray-200" />
              <span className="ml-4 text-2xl text-gray-200 font-bold">Scrapbook</span>
            </Button>
          </Card>
        </div>
      </motion.div>

      {/* Grouped Sections */}
      <div className="space-y-6 select-none">
        {Object.entries(groupedItems).map(([date, itemsForDate]) => (
          <div key={date}>
            <h2 className="text-lg font-bold font-mono text-gray-300 mb-2">
              {date}
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {itemsForDate.map((item) => (
                <motion.div
                  key={item.id}
                  layoutId={`scrapbook-media-${item.id}`}
                  whileHover={{
                    scale: [null, 1.01, null],
                    transition: {
                      duration: 0.3,
                      times: [0, 0.6, 1],
                      ease: ["easeInOut", "easeOut"],
                    },
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    type: "spring",
                    stiffness: 700,
                    damping: 60,
                  }}
                  onClick={() => setSelectedId(item.id)}
                >
                  <Card className="p-2 cursor-pointer">
                    <div className="flex items-center">
                      <div className="w-16 aspect-square rounded-lg overflow-hidden">
                        {item.type === "video" ? (
                          <video
                            src={item.src}
                            className="w-full h-full object-cover"
                            muted
                            autoPlay
                            loop
                            playsInline
                            preload="metadata"
                          />
                        ) : (
                          <ImageWithFallback
                            src={item.src}
                            alt={item.caption}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="ml-4">
                        <p className="font-bold text-sm text-gray-400">{item.caption}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal with Timeline-style animation */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            layoutId={`scrapbook-media-${selectedItem.id}`}
            className="fixed inset-0 z-100 flex justify-center"
            style={{
              background: "rgba(10,10,10,0.98)",
              pointerEvents: "auto",
              boxSizing: "border-box",
            }}
            transition={{
              type: "spring",
              stiffness: 800,
              damping: 60,
            }}
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              className="bg-gray-900 rounded-2xl p-4 mx-auto w-full"
              style={{ minHeight: 300 }}
              initial={{ borderRadius: 24 }}
              animate={{ borderRadius: 24 }}
              exit={{ borderRadius: 24 }}
              transition={{
                type: "spring",
                stiffness: 800,
                damping: 60,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button and caption */}
              <div className="rounded-lg mb-4">
                {selectedItem.type === "video" ? (
                  <video
                    src={selectedItem.src}
                    className="rounded-lg w-full h-full"
                    muted
                    autoPlay
                    loop
                    playsInline
                    controls
                  />
                ) : (
                  <ImageWithFallback
                    src={selectedItem.src}
                    alt={selectedItem.caption}
                    className="rounded-lg w-full h-full"
                  />
                )}
              </div>
              <div className="flex w-full items-center justify-between text-left font-bold">
                <p className="ml-2 text-gray-300">{selectedItem.caption}</p>
                <p className="mr-2 text-sm text-gray-500">{selectedItem.date}</p>
              </div>
              <div className="flex items-center mb-4 mt-10">
                <button
                  className="flex items-center bg-gray-200 rounded-lg w-full text-gray-400 z-50 p-2"
                  onClick={() => setSelectedId(null)}
                  aria-label="Close"
                >
                  <div className="mx-auto text-gray-700">
                    <X className="w-5 h-5" />
                  </div>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed flex-col-2 select-none">
              <motion.div
                drag
                dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
                dragElastic={0.2}
                className="fixed left-auto right-3 z-[50]"
                whileHover={{
                  scale: [null, 1.01, null],
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
                style={{
                  bottom: "20px",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  pointerEvents: "auto",
                  backdropFilter: "blur(5px)",
                  background: "rgba(217,217,217,0.3)",
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
                  <Card className="w-full border border-transparent bg-transparent shadow-none">
                    <div
                      onClick={onBack}
                      className="p-4 w-full cursor-pointer"
                    >
                      <ArrowLeft className="ml-2 mr-2 w-5 h-5 text-gray-200" />
                    </div>
                  </Card>
              </motion.div>
              <motion.div
                drag
                dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
                dragElastic={0.2}
                className="fixed left-3 right-auto z-[50]"
                whileHover={{
                  scale: [null, 1.01, null],
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
                  <Card className="w-full border border-transparent bg-transparent shadow-none">
                    <h2 
                      className="flex item-center justify-center p-4 w-full cursor-pointer font-bold text-lg"
                      style={{ 
                        width: "200px", 
                      }}
                    >
                      Scrapbook
                    </h2>
                  </Card>
              </motion.div>
            </div>
    </div>
  );
}