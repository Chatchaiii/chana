// md
import T_the_start from "../assets/text/timeline/the_start.md?raw";
import T_the_lake from "../assets/text/timeline/the_lake.md?raw";
import T_theatre from "../assets/text/timeline/theatre.md?raw";
import T_the_day from "../assets/text/timeline/the_day.md?raw";
import T_wannsee from "../assets/text/timeline/wannsee.md?raw";
import T_photo_booth from "../assets/text/timeline/photo_booth.md?raw";
import T_reflections from "../assets/text/timeline/reflections.md?raw";
import T_flight from "../assets/text/timeline/flight.md?raw";

// hidden notes
import H_the_start from "../assets/text/timeline/hidden/h_the_start.md?raw";
import H_the_lake from "../assets/text/timeline/hidden/h_the_lake.md?raw";
import H_the_day from "../assets/text/timeline/hidden/h_the_day.md?raw";
import H_flight from "../assets/text/timeline/hidden/h_flight.md?raw";

// jpeg
import P_the_start from "../assets/images/timeline/the_start.jpeg";
import P_the_lake1 from "../assets/images/timeline/the_lake_1.jpeg";
import P_the_lake2 from "../assets/images/timeline/the_lake_2.jpeg";
import P_the_lake3 from "../assets/images/timeline/the_lake_3.jpeg";
import P_the_lake5 from "../assets/images/timeline/the_lake_5.jpeg";
import P_theatre1 from "../assets/images/timeline/theatre_2.jpeg";
import P_theatre2 from "../assets/images/timeline/theatre_3.jpeg";
import P_wannsee1 from "../assets/images/timeline/wannsee_1.jpeg";
import P_wannsee2 from "../assets/images/timeline/wannsee_2.jpeg";
import P_photo_booth from "../assets/images/timeline/photo_booth.jpeg";
import P_reflections1 from "../assets/images/timeline/reflections_1.jpeg";
import P_reflections2 from "../assets/images/timeline/reflections_2.jpeg";
import P_flight from "../assets/images/timeline/flight.jpeg";

// config
import React, { useState } from "react";
import ReactMarkdown from 'react-markdown';
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {
  ArrowLeft,
  Star,
  Waves,
  VenetianMask,
  Camera,
  Plane,
  Sparkle,
  Calendar,
} from "lucide-react";

interface TimelineProps {
  onBack: () => void;
}

interface BlogPostBlockProps {
  title: string;
  date: string;
  text: string;
  imageUrls: string[];
  icon: React.ElementType;
  noteText?: string; // <-- optional note text
}

// Example: add noteText to your blogPosts if you want a custom note, otherwise omit to hide the button
const blogPosts: BlogPostBlockProps[] = [
  {
    title: "The Start",
    date: "06.06.2025",
    text: T_the_start,
    imageUrls: [P_the_start],
    icon: Star,
    noteText: H_the_start,
  },
  {
    title: "The Lake",
    date: "09.06.2025",
    text: T_the_lake,
    imageUrls: [P_the_lake1, P_the_lake2, P_the_lake3, P_the_lake5],
    icon: Waves,
    noteText: H_the_lake,
  },
  {
    title: "Theatre",
    date: "18.06.2025",
    text: T_theatre,
    imageUrls: [
      P_theatre1,
      P_theatre2
    ],
    icon: VenetianMask,
  },
  {
    title: "The day",
    date: "18.06.2025",
    text: T_the_day,
    imageUrls: [
    ],
    icon: Calendar,
    noteText: H_the_day,
  },
  {
    title: "Wannsee",
    date: "26.06.2025",
    text: T_wannsee,
    imageUrls: [
      P_wannsee1,
      P_wannsee2
    ],
    icon: Waves,
  },
  {
    title: "Photo-booth",
    date: "05.07.2025",
    text: T_photo_booth,
    imageUrls: [
      P_photo_booth
    ],
    icon: Camera,
  },
  {
    title: "Reflecions",
    date: "13.07.2025",
    text: T_reflections,
    imageUrls: [
      P_reflections1,
      P_reflections2
    ],
    icon: Sparkle,
  },
  {
    title: "Flight",
    date: "15.07.2025",
    text: T_flight,
    imageUrls: [
      P_flight
    ],
    icon: Plane,
    noteText: H_flight,
  },
];

// BlogPostBlock with hidden note button and popup
function BlogPostBlock({
  title,
  date,
  text,
  imageUrls,
  icon: Icon,
  noteText,
}: BlogPostBlockProps) {
  const [current, setCurrent] = React.useState(0);
  const [showNote, setShowNote] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const touchStartX = React.useRef<number | null>(null);

  const hasMultipleImages = imageUrls.length > 1;
  const hasNoImage = imageUrls.length === 0;

  // Auto-rotate every 5 seconds, only if more than one image
  React.useEffect(() => {
    if (!hasMultipleImages) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % imageUrls.length);
    }, 5000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, imageUrls.length, hasMultipleImages]);

  // Swipe handlers, only if more than one image
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!hasMultipleImages) return;
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!hasMultipleImages || touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        setCurrent((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
      } else {
        setCurrent((prev) => (prev + 1) % imageUrls.length);
      }
    }
    touchStartX.current = null;
  };

  return (
    <Card className="space-y-2 bg-gray-800 rounded-xl shadow-lg p-6 max-w-2xl mx-auto my-8">
      <div className="flex items-center mb-4 space-x-3">
        <div className="p-2 rounded-full bg-gray-600 text-white">
          <Icon className="w-6 h-4" />
        </div>
        <h2 className="text-2xl font-bold text-gray-100">{title}</h2>
        <span className="ml-auto text-sm text-gray-400">{date}</span>
      </div>
      {/* Images area */}
      {!hasNoImage && (
        <div
          className="relative w-full h-64 rounded-lg overflow-hidden mb-4"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {hasMultipleImages ? (
            <>
              <div
                className="flex transition-transform duration-700 ease-in-out h-64"
                style={{
                  width: `${imageUrls.length * 100}%`,
                  transform: `translateX(-${current * (100 / imageUrls.length)}%)`,
                }}
              >
                {imageUrls.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`${title} ${idx + 1}`}
                    className="w-full h-64 object-cover flex-shrink-0"
                    style={{ width: `${100 / imageUrls.length}%` }}
                  />
                ))}
              </div>
              {/* Indicator dots */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
                {imageUrls.map((_, idx) => (
                  <span
                    key={idx}
                    className={`inline-block w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === current ? "bg-pink-500 scale-110" : "bg-gray-400 opacity-50"
                    }`}
                  />
                ))}
              </div>
            </>
          ) : (
            <img
              src={imageUrls[0]}
              alt={title}
              className="w-full h-64 object-cover rounded-lg"
            />
          )}
        </div>
      )}
      <div className="prose prose-invert text-gray-300">
        <ReactMarkdown>
          {text}
        </ReactMarkdown>
      </div>
      {/* Hidden Note Button */}
      {noteText && noteText.trim().length > 0 && (
        <>
          <Button
            className="bg-gray-300 text-gray-800 mb-2"
            onClick={() => setShowNote(true)}
          >
            Hidden-Note
          </Button>
          {/* Popup Modal */}
          {showNote && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
              <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl relative border">
                <button
                  className="absolute top-0 right-2 text-gray-400 text-2xl"
                  onClick={() => setShowNote(false)}
                  aria-label="Close"
                >
                  ×
                </button>
                <div className="text-gray-300">
                  <ReactMarkdown>{noteText}</ReactMarkdown>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </Card>
  );
}

export function Timeline({ onBack }: TimelineProps) {
  return (
    <div className="space-y-6 min-h-screen flex flex-col p-6 bg-gray-900">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8 bg-gray-900">
        <Button
          onClick={onBack}
          variant=""
          size="sm"
          className="rounded-full bg-grey-800 hover:bg-gray-700"
        >
          <ArrowLeft className="w-5 h-5 bg-gray-900 text-gray-300" />
        </Button>
        <h1 className="text-2xl text-gray-300 font-bold">Timeline</h1>
      </div>

      {/* Blog Posts */}
      <div className="space-y-6 flex-1">
        {blogPosts.map((post, idx) => (
          <BlogPostBlock key={idx} {...post} />
        ))}
      </div>
    </div>
  );
}