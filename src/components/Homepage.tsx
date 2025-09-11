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
  Calendar,
  Star,
  Quote,
} from "lucide-react";
import { FeatureType } from "../App";
import Markdown from "react-markdown";

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

  // Timetable data
  const timetable = [
    {
      time: "16:30",
      title: "Fotoblink",
      address: "Bergmannstraße 27, 10961 Berlin",
    },
    {
      time: "18:00",
      title: "Sori Kono",
      address: "Dominicusstraße 41, 10827 Berlin",
    },
    {
      time: "19:30",
      title: "Hafis",
      address: "Neue Kantstraße 17, 14057 Berlin",
    },
    {
      time: "21:00",
      title: "Home",
      address: "",
    },
  ];

  // Sort by time (HH:mm)
  const sortedTimetable = [...timetable].sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="p-4 space-y-6 overflow-x-auto scrollbar-none">
      {/* Header */}
      <div className="flex flex-col items-left space-y-6">
        <div className="w-full flex mb-4 justify-center">
          <h1 className="text-3xl font-bold text-white flex items-center select-none">
            CH
            <Heart className="w-8 h-7 text-pink-600 mx-1" fill="currentcolor" stroke="currentcolor" />
            NA
          </h1>
        </div>
        {/* Carousel */}
        <div className="relative w-full max-w-xl mx-auto">
          <div
            className="relative w-full h-60 rounded-none overflow-hidden"
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
          {/* Text Body */}
          <p className="relative font-bold flex gap-8 items-center text-left text-xs text-gray-400 p-4 select-none bg-gray-800">
            <Quote className="relative left-1 w-10 h-10 text-gray-500" />
            "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."
          </p>
        </div>
      </div>


      {/* Features Grid */}
      <h1 className="font-bold items-center flex text-2xl text-gray-300 gap-2 select-none">
        <Star className="w-7 h-7 text-pink-500" />
        Features
        </h1>
      <div className="space-y-0 space-x-0 grid grid-cols-2 gap-3">
        {features.map((feature) => (
          <Card
            key={feature.id}
            className="hover:bg-gray-950 transition-shadow p-0"
          >
            <Button
              onClick={() => onNavigate(feature.id)}
              className="w-full flex items-left justify-start space-x-3 bg-transparent text-gray-300 p-6 select-none"
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
      <h1 className="font-bold text-2xl text-gray-300 flex items-center select-none gap-2">
        <Calendar className="w-7 h-7 text-pink-500" />
        Today's plan
        </h1>
      <div className="relative flex flex-col items-center">
        {sortedTimetable.map((item, idx) => (
          <div className="flex items-center w-full max-w-md" key={item.time + item.title}>
            {/* Wire/line on the left */}
            <div className="flex flex-col items-center mr-2 ml-1 select-none">
              {/* Top wire */}
              {idx !== 0 && (
                <div className="w-1 h-4 rounded-full bg-pink-500" />
              )}
              {/* Dot */}
              <div className="w-4 h-4 border-2 border-gray-900 rounded-xl bg-pink-500"></div>
              {/* Bottom wire */}
              {idx !== sortedTimetable.length - 1 && (
                <div className="w-1 h-4 rounded-full bg-pink-500" />
              )}
            </div>
            {/* Box */}
            <Card className="flex-1 mb-2 bg-gray-900 rounded-2xl p-6">
              <div className="flex items-center space-x-3">
                <span className="text-lg font-bold text-gray-200 w-16 select-none">{item.time}</span>
                <div>
                  <div className="font-bold text-gray-200">{item.title}</div>
                  {item.address && (
                    <div className="text-xs text-gray-400">{item.address}</div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="h-8 text-center text-sm text-gray-700 select-none">
        خیلی دوستت دارم
      </div>
    </div>
  );
}