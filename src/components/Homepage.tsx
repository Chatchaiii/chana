// images
import Reflections from "../assets/images/timeline/reflections_1.jpeg";
import Flight from "../assets/images/timeline/flight.jpeg";
import Kiss from "../assets/images/homepage/kiss.jpg";

// general
import React, { useRef, useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Heart,
  Clock,
  Camera,
  Brain,
  Mail,
  Map,
} from "lucide-react";
import { FeatureType } from "../App";

interface HomepageProps {
  onNavigate: (feature: FeatureType) => void;
}

const carouselImages = [
  {
    src: Kiss,
    alt: "kiss",
  },
  {
    src: Flight,
    alt: "flight",
  },
  {
    src: Reflections,
    alt: "reflections",
  },
];

export function Homepage({ onNavigate }: HomepageProps) {
  const features = [
    {
      id: "timeline" as FeatureType,
      name: "Timeline",
      icon: Clock,
      color: "bg-gray-000",
    },
    {
      id: "scrapbook" as FeatureType,
      name: "Scrapbook",
      icon: Camera,
      color: "bg-gray-000",
    },
    {
      id: "quiz" as FeatureType,
      name: "Quiz",
      icon: Brain,
      color: "bg-gray-000",
    },
    {
      id: "countup" as FeatureType,
      name: "Count-Up",
      icon: Heart,
      color: "bg-gray-000",
    },
    {
      id: "note" as FeatureType,
      name: "Hidden Notes",
      icon: Mail,
      color: "bg-gray-000",
    },
    {
      id: "map" as FeatureType,
      name: "Map",
      icon: Map,
      color: "bg-gray-000",
    },
  ];

  // Carousel logic
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);

  // Auto-rotate every 3 seconds
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current]);

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        // swipe right
        setCurrent((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
      } else {
        // swipe left
        setCurrent((prev) => (prev + 1) % carouselImages.length);
      }
    }
    touchStartX.current = null;
  };

  return (
    <div className="p-4 space-y-6 overflow-x-auto scrollbar-none">
      {/* Header */}
      <div className="flex flex-col items-left space-y-6">
        <div className="w-full flex mt-2 mb-4 justify-center">
          <h1 className="text-3xl font-bold text-white flex items-center select-none my-1">
            CH
            <Heart className="w-8 h-7 text-pink-600 mx-1" fill="currentColor" stroke="none" />
            NA
          </h1>
        </div>
        {/* Carousel */}
        {/* <h1 className="font-bold text-2xl text-gray-300 select-none mb-4">HAPPY ANNIVERSARY</h1> */}
        <div className="relative w-full max-w-xl mx-auto">
          <div
            className="relative w-full h-60 rounded-2xl overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                width: `${carouselImages.length * 100}%`,
                transform: `translateX(-${current * (100 / carouselImages.length)}%)`,
              }}
            >
              {carouselImages.map((img, idx) => (
                <div
                  key={idx}
                  className="w-full flex-shrink-0 h-60"
                  style={{ width: `${100 / carouselImages.length}%` }}
                >
                  <ImageWithFallback
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Text Body */}
      <p className="text-center text-[11pt] font-bold italic text-gray-400 p-6 select-none bg-gray-800 rounded-2xl">
        "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."
      </p>

      {/* Features Grid */}
      <h1 className="font-bold text-2xl text-gray-300 select-none">Features</h1>
      <div className="space-y-0 space-x-0 grid grid-cols-2 gap-3">
        {features.map((feature) => (
          <Card
            key={feature.id}
            className="hover:bg-gray-950 transition-shadow p-0"
          >
            <Button
              onClick={() => onNavigate(feature.id)}
              className="w-full flex items-left justify-start space-x-3 bg-transparent text-gray-300 p-6"
              variant="ghost"
            >
              <feature.icon className="w-6 h-6 text-gray-300" />
              <span className="flex-1 text-left">
                {feature.name}
              </span>
            </Button>
          </Card>
        ))}
      </div>

      {/* Timetable */}
      <h1 className="font-bold text-2xl text-gray-300 select-none">Today's plan</h1>
      <Card className="p-4 bg-gray-800 rounded-2xl">
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-gray-300 select-none">22.09.2025</h2>
          <div className="text-sm text-gray-400 space-y-1">
            <p>16:30 - Fotoblink, Bergmannstraße 27, 10961 Berlin</p>
            <p>18:00 - Sori Kono, Dominicusstraße 41, 10827 Berlin</p>
            <p>19:30 - Hafis, Neue Kantstraße 17, 14057 Berlin</p>
            <p>21:00 - Home</p>
          </div>
        </div>
      </Card>

      {/* Footer */}
      <div className="text-center text-sm text-gray-700 my-8 select-none">
        خیلی دوستت دارم
      </div>
    </div>
  );
}