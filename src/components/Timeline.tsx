import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Star,
  Waves,
  VenetianMask,
  Camera,
  Plane,
  Sparkle,
  Calendar,
  Users,
  Cake,
  MapPinned,
  Undo2,
  Gem,
  Infinity as InfinityIcon,
  X,
  EyeOff,
} from "lucide-react";

// --- BlogPost Data ---
import T_the_start from "../assets/text/timeline/the_start.md?raw";
import T_the_lake from "../assets/text/timeline/the_lake.md?raw";
import T_theatre from "../assets/text/timeline/theatre.md?raw";
import T_the_day from "../assets/text/timeline/the_day.md?raw";
import T_wannsee from "../assets/text/timeline/wannsee.md?raw";
import T_photo_booth from "../assets/text/timeline/photo_booth.md?raw";
import T_reflections from "../assets/text/timeline/reflections.md?raw";
import T_flight from "../assets/text/timeline/flight.md?raw";
import T_reunion from "../assets/text/timeline/reunion.md?raw";
import T_birthday from "../assets/text/timeline/birthday.md?raw";
import T_birthday_2 from "../assets/text/timeline/birthday_2.md?raw";
import T_ldr from "../assets/text/timeline/ldr.md?raw";
import T_return from "../assets/text/timeline/return.md?raw";
import T_eternal from "../assets/text/timeline/eternal.md?raw";
import T_infinite from "../assets/text/timeline/infinite.md?raw";

import H_the_start from "../assets/text/timeline/hidden/h_the_start.md?raw";
import H_the_lake from "../assets/text/timeline/hidden/h_the_lake.md?raw";
import H_the_day from "../assets/text/timeline/hidden/h_the_day.md?raw";
import H_flight from "../assets/text/timeline/hidden/h_flight.md?raw";
import H_birthday from "../assets/text/timeline/hidden/h_birthday.md?raw";
import H_birthday_2 from "../assets/text/timeline/hidden/h_birthday_2.md?raw";
import H_infinite from "../assets/text/timeline/hidden/h_infinite.md?raw";

import P_the_start from "../assets/images/timeline/the_start.jpeg";
import P_the_lake1 from "../assets/images/timeline/the_lake_1.jpeg";
import P_the_lake2 from "../assets/images/timeline/the_lake_2.jpeg";
import P_the_lake3 from "../assets/images/timeline/the_lake_3.jpeg";
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
import P_infinite_1 from "../assets/images/timeline/infinite_1.jpeg";
import P_infinite_2 from "../assets/images/timeline/infinite_2.jpeg";
import P_infinite_3 from "../assets/images/timeline/infinite_3.jpeg";
import P_infinite_4 from "../assets/images/timeline/infinite_4.jpeg";

// --- Types ---
interface TimelineProps {
  onBack: () => void;
}

interface BlogPostBlockProps {
  title: string;
  date: string;
  text: string;
  imageUrls: string[];
  icon: React.ElementType;
  noteText?: string;
}

// --- Blog Posts Array ---
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
    imageUrls: [P_theatre1, P_theatre2, P_theatre3],
    icon: VenetianMask,
  },
  {
    title: "The day",
    date: "22.06.2025",
    text: T_the_day,
    imageUrls: [],
    icon: Calendar,
    noteText: H_the_day,
  },
  {
    title: "Wannsee",
    date: "26.06.2025",
    text: T_wannsee,
    imageUrls: [P_wannsee1, P_wannsee2],
    icon: Waves,
  },
  {
    title: "Photo-booth",
    date: "05.07.2025",
    text: T_photo_booth,
    imageUrls: [P_photo_booth],
    icon: Camera,
  },
  {
    title: "Reflections",
    date: "13.07.2025",
    text: T_reflections,
    imageUrls: [P_reflections1, P_reflections2],
    icon: Sparkle,
  },
  {
    title: "Flight",
    date: "15.07.2025",
    text: T_flight,
    imageUrls: [P_flight],
    icon: Plane,
    noteText: H_flight,
  },
  {
    title: "Reunion",
    date: "19.07.2025",
    text: T_reunion,
    imageUrls: [P_reunion],
    icon: Users,
  },
  {
    title: "Birthday",
    date: "20.07.2025",
    text: T_birthday,
    imageUrls: [P_birthday_1, P_birthday_2, P_birthday_3, P_birthday_4, P_birthday_5, P_birthday_6, P_birthday_7],
    icon: Cake,
    noteText: H_birthday,
  },
  {
    title: "Birthday_2",
    date: "23.07.2025",
    text: T_birthday_2,
    imageUrls: [P_birthday_2_1, P_birthday_2_2],
    icon: Cake,
    noteText: H_birthday_2,
  },
  {
    title: "Ldr",
    date: "01.08.2025",
    text: T_ldr,
    imageUrls: [P_ldr],
    icon: MapPinned,
  },
  {
    title: "Return",
    date: "05.08.2025",
    text: T_return,
    imageUrls: [P_return],
    icon: Undo2,
  },
  {
    title: "Eternal",
    date: "08.08.2025",
    text: T_eternal,
    imageUrls: [P_eternal],
    icon: Gem,
  },
  {
    title: "Infinite",
    date: "15.08.2025",
    text: T_infinite,
    imageUrls: [P_infinite_1, P_infinite_2, P_infinite_3, P_infinite_4],
    icon: InfinityIcon,
    noteText: H_infinite,
  },
];

// --- Preload Images Hook ---
function usePreloadImages(urls: string[], trigger: boolean) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!trigger) return;
    if (!urls || urls.length === 0) {
      setLoaded(true);
      return;
    }
    let isMounted = true;
    let loadedCount = 0;
    urls.forEach((url) => {
      const img = new window.Image();
      img.src = url;
      img.onload = img.onerror = () => {
        loadedCount += 1;
        if (isMounted && loadedCount === urls.length) {
          setLoaded(true);
        }
      };
    });
    return () => {
      isMounted = false;
    };
  }, [urls, trigger]);

  return loaded;
}

// --- BlogPostCollapsed ---
function BlogPostCollapsed({
  title,
  date,
  icon: Icon,
  onExpand,
  imageUrls,
  isLoading,
}: {
  title: string;
  date: string;
  icon: React.ElementType;
  onExpand: () => void;
  imageUrls: string[];
  isLoading?: boolean;
}) {
  return (
    <motion.div
      layoutId={`blogpost-${title}`}
      whileHover={{
        scale: [null, 1.03, null],
        transition: {
          duration: 0.3,
          times: [0, 0.6, 1],
          ease: ["easeInOut", "easeInOut"],
        },
      }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 700,
        damping: 60,
      }}
      className="border rounded-2xl shadow-lg px-6 py-4 flex items-center space-x-6 cursor-pointer mb-3"
      onClick={isLoading ? undefined : onExpand}
      style={{
        overflow: "hidden",
        pointerEvents: isLoading ? "none" : "auto",
        backdropFilter: "blur(15px)",
        background: "rgba(8,8,8,0.1)",
        zIndex: 100,
        opacity: isLoading ? 0.5 : 1,
      }}
    >
      <div className="px-2 py-2 rounded-full text-gray-300">
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex flex-col-2 items-center w-full">
        <h2 className="text-xl font-bold text-gray-300">{title}</h2>
        <span className="ml-auto text-sm text-gray-400">{date}</span>
      </div>
      {isLoading && (
        <span className="ml-4 text-xs text-gray-400 animate-pulse">Loading…</span>
      )}
    </motion.div>
  );
}

// --- BlogPostExpanded ---
function BlogPostExpanded({
  title,
  date,
  text,
  imageUrls,
  icon: Icon,
  noteText,
  onClose,
}: BlogPostBlockProps & { onClose: () => void }) {
  const [current, setCurrent] = useState(0);
  const [showNote, setShowNote] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasMultipleImages = imageUrls.length > 1;
  const hasNoImage = imageUrls.length === 0;

  // auto-rotate gallery
  useEffect(() => {
    if (!hasMultipleImages) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % imageUrls.length);
    }, 5000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, imageUrls.length, hasMultipleImages]);

  // swipe gallery
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!hasMultipleImages) return;
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
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
    <motion.div
      layoutId={`blogpost-${title}`}
      className="fixed inset-0 shadow-lg z-100 flex justify-center"
      style={{
        pointerEvents: "auto",
        backdropFilter: "blur(15px)",
        background: "rgba(8, 8, 8, 0.1)",
        boxSizing: "border-box",
        zIndex: 100,
      }}
      transition={{
        type: "spring",
        stiffness: 800,
        damping: 60,
      }}
    >
      <motion.div
        className="rounded-2xl p-4 mx-auto overflow-auto"
        style={{ 
          minHeight: 400, 
          zIndex: 100,
          backdropFilter: "blur(15px)",
          background: "rgba(8,8,8,0.1)",
        }}
        initial={{ borderRadius: 24 }}
        animate={{ borderRadius: 24 }}
        exit={{ borderRadius: 24 }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 60,
        }}
      >
        {/* Title always visible */}
        <div className="mt-2">
          <div>
            <button
              className="w-full mb-4"
              onClick={onClose}
              aria-label="Close"
            >
              <div className="flex items-center text-gray-200 bg-gray-900 rounded-2xl">
                <div className="ml-2 mr-3">
                  <Icon className="w-6 h-4" />
                </div>
                <div className="flex items-center w-full">
                  <h2 className="text-2xl font-bold text-gray-200 mb-1">{title}</h2>
                  <span className="relative right-4 ml-auto text-xs text-gray-500 font-bold">{date}</span>
                </div>
                <X className="mr-1 w-6 h-4" />
              </div>
            </button>
          </div>
          {/* Images */}
          {!hasNoImage && (
            <div
              className="relative w-full h-64 mb-6 rounded-lg overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {hasMultipleImages ? (
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
              ) : (
                <img
                  src={imageUrls[0]}
                  alt={title}
                  className="w-full h-64 object-cover flex-shrink-0"
                  style={{ width: `${100 / imageUrls.length}%` }}
                />
              )}
            </div>
          )}

          <div className="text-gray-300 w-full mb-6">
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>

          {noteText && noteText.trim().length > 0 && (
            <>
              <Button
                className="bg-gray-300 mb-1 text-gray-800 w-full font-bold"
                onClick={() => setShowNote(true)}
              >
                <EyeOff className="w-4 h-4" />
                <div>Hidden-Note</div>
              </Button>
              {showNote && (
                <div 
                  className="p-4 fixed inset-0 z-50 flex items-center justify-center"
                  style={{ 
                    background: "rgba(0, 0, 0, 0.95)",
                    backdropFilter: "blur(25px)",
                  }}
                >
                  <div className="bg-gray-800 rounded-2xl p-6 w-full">
                    <div className="text-gray-300 -mt-2">
                      <ReactMarkdown>{noteText}</ReactMarkdown>
                    </div>
                    <button
                      className="mt-4 flex items-center justify-center rounded-lg py-2 bg-gray-300 text-gray-700 text-2xl w-full cursor-pointer"
                      onClick={() => setShowNote(false)}
                      aria-label="Close"
                    >
                      <X className="w-6 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// --- Timeline Main ---
export function Timeline({ onBack }: TimelineProps) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [pendingIdx, setPendingIdx] = useState<number | null>(null);
  const scrollYRef = useRef<number>(0);

  // Prevent background scroll and preserve scroll position when expanded,
  useEffect(() => {
    if (expandedIdx !== null) {
      scrollYRef.current = window.scrollY;
      const originalOverflow = document.body.style.overflow;
      const originalPosition = document.body.style.position;
      const originalTop = document.body.style.top;
      const originalWidth = document.body.style.width;

      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.width = "100%";

      // Prevent touchmove on mobile
      const preventTouch = (e: TouchEvent) => e.preventDefault();
      document.body.addEventListener("touchmove", preventTouch, { passive: true });

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.position = originalPosition;
        document.body.style.top = originalTop;
        document.body.style.width = originalWidth;
        document.body.removeEventListener("touchmove", preventTouch);
        window.scrollTo(0, scrollYRef.current);
      };
    }
  }, [expandedIdx]);

  // Escape key closes expanded
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && expandedIdx !== null) {
        setExpandedIdx(null);
      }
      if (e.key === "Escape" && expandedIdx === null) {
        onBack();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expandedIdx, onBack]);

  // Preload images for the pending (about to expand) post
  const handleExpand = (idx: number) => {
    setPendingIdx(idx);
  };

  // Only expand after images are loaded
  const imagesLoaded = usePreloadImages(
    pendingIdx !== null ? blogPosts[pendingIdx].imageUrls : [],
    pendingIdx !== null
  );

  useEffect(() => {
    if (pendingIdx !== null && imagesLoaded) {
      setExpandedIdx(pendingIdx);
      setPendingIdx(null);
    }
  }, [pendingIdx, imagesLoaded]);

  return (
    <div className="relative mt-16 mb-15 min-h-screen flex flex-col p-4 bg-gray-900">
      {/* Blog Posts List */}
      <div className="space-y-6 flex-1 relative z-0">
        {blogPosts.map((post, idx) => (
          <BlogPostCollapsed
            key={idx}
            title={post.title}
            date={post.date}
            icon={post.icon}
            imageUrls={post.imageUrls}
            onExpand={() => handleExpand(idx)}
            isLoading={pendingIdx === idx && !imagesLoaded}
          />
        ))}
      </div>

      {/* Expanded Post Overlay */}
      <AnimatePresence>
        {expandedIdx !== null && (
          <BlogPostExpanded
            {...blogPosts[expandedIdx]}
            onClose={() => setExpandedIdx(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}