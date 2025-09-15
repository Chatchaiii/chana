// jpeg
import P_the_start from "../assets/images/timeline/the_start.jpeg";
import P_the_lake1 from "../assets/images/timeline/the_lake_1.jpeg";
import P_the_lake2 from "../assets/images/timeline/the_lake_2.jpeg";
import P_the_lake3 from "../assets/images/timeline/the_lake_3.jpeg";
import P_the_lake4 from "../assets/images/timeline/the_lake_4.jpeg";
import P_the_lake5 from "../assets/images/timeline/the_lake_5.jpeg";
import P_theatre1 from "../assets/images/timeline/theatre_2.jpeg";
import P_theatre2 from "../assets/images/timeline/theatre_3.jpeg";
import P_wannsee1 from "../assets/images/timeline/wannsee_1.jpeg";
import P_wannsee2 from "../assets/images/timeline/wannsee_2.jpeg";
import P_photo_booth from "../assets/images/timeline/photo_booth.jpeg";
import P_reflections1 from "../assets/images/timeline/reflections_1.jpeg";
import P_reflections2 from "../assets/images/timeline/reflections_2.jpeg";
import P_flight from "../assets/images/timeline/flight.jpeg";

// video
import V_photo_booth from "../assets/video/photo_booth.mov";

// config
import React, { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

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
    { id: 8, src: P_theatre2, caption: "Hot Persian (in Bed)", date: "18.06.2025", type: "image" },
    { id: 9, src: P_wannsee1, caption: "Happiness", date: "26.06.2025", type: "image" },
    { id: 10, src: P_wannsee2, caption: "Sunset", date: "26.06.2025", type: "image" },
    { id: 11, src: P_photo_booth, caption: "Photo-booth", date: "05.07.2025", type: "image" },
    { id: 12, src: V_photo_booth, caption: "No. 1 Party Anthem", date: "05.07.2025", type: "video" },
    { id: 13, src: P_reflections1, caption: "Mirror", date: "13.07.2025", type: "image" },
    { id: 14, src: P_reflections2, caption: "My flower", date: "13.07.2025", type: "image" },
    { id: 15, src: P_flight, caption: "Flight", date: "15.07.2025", type: "image" },
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
            onBack();
          }
        }
        setTouchStartX(null);
      }}
    >
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button
          onClick={onBack}
          variant=""
          size="sm"
          className="rounded-full bg-gray-900 hover:bg-gray-700"
        >
          <ArrowLeft className="w-5 h-5 bg-gray-900 text-gray-300" />
        </Button>
        <h1 className="text-2xl text-gray-300 font-bold">Scrapbook</h1>
      </div>

      {/* Grouped Sections */}
      <div className="space-y-6">
        {Object.entries(groupedItems).map(([date, itemsForDate]) => (
          <div key={date}>
            <h2 className="text-lg font-bold font-mono text-gray-300 mb-2">
              {date}
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {itemsForDate.map((item) => (
                <Card
                  key={item.id}
                  className="p-2 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedId(item.id)}
                >
                  <div className="space-y-2">
                    <div className="aspect-square rounded-lg overflow-hidden">
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
                    <div className="text-center">
                      <p className="font-bold text-sm text-gray-400">{item.caption}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedId(null)}
        >
          <Card
            className="max-w-sm w-full p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden">
                {selectedItem.type === "video" ? (
                  <video
                    src={selectedItem.src}
                    className="w-full h-full"
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
                    className="w-full h-full"
                  />
                )}
              </div>
              <div className="text-center">
                <p className="text-gray-300">{selectedItem.caption}</p>
                <p className="text-sm text-gray-400">{selectedItem.date}</p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}