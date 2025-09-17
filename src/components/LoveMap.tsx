import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import {
  ArrowLeft,
  MapPin,
  Heart,
  Calendar,
  Camera,
  Coffee,
  Star
} from 'lucide-react';
import { motion } from 'motion/react';
import { isAbsolute } from 'path';

interface LoveMapProps {
  onBack: () => void;
}

export function LoveMap({ onBack }: LoveMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);

  // --- Swipe detection state ---
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchEndX - touchStartX;

    if (diffX > 100) {
      // onBack(); // Trigger back on swipe right
    }
    setTouchStartX(null);
  };

  const loveLocations = [
    {
      id: 1,
      name: "The Coffee Shop",
      type: "First Meeting",
      date: "3 months ago",
      description: "Where our eyes first met across a crowded room",
      icon: Coffee,
      color: "bg-amber-500",
      coordinates: { x: 30, y: 25 },
      memory:
        "I remember ordering my usual latte and then seeing you smile. Suddenly, coffee became the least important thing in that room. Your laugh made my heart skip a beat, and I knew I had to talk to you. Best decision ever! ☕️💕",
    },
    {
      id: 2,
      name: "Sunset Point",
      type: "First Date",
      date: "2.5 months ago",
      description: "Our magical first date watching the sunset",
      icon: Star,
      color: "bg-orange-500",
      coordinates: { x: 70, y: 40 },
      memory:
        "We talked for hours as the sun painted the sky in beautiful colors. You said something funny and I laughed so hard I nearly fell off the bench. That's when I realized how comfortable I felt with you, like we'd known each other forever. 🌅💖",
    },
    {
      id: 3,
      name: "The Park",
      type: "Became Official",
      date: "2 months ago",
      description: "Where we decided to write our love story together",
      icon: Heart,
      color: "bg-green-500",
      coordinates: { x: 50, y: 60 },
      memory:
        "We were walking hand in hand when you stopped and asked if I wanted to be yours. My heart exploded with joy! I said yes before you even finished the question. The ducks in the pond seemed to celebrate with us! 🦆💕",
    },
    {
      id: 4,
      name: "Downtown Gallery",
      type: "First Trip",
      date: "1.5 months ago",
      description: "Our first adventure exploring art together",
      icon: Camera,
      color: "bg-purple-500",
      coordinates: { x: 40, y: 30 },
      memory:
        "You pretended to understand modern art while I secretly took photos of you admiring the paintings. You were more beautiful than any artwork in that gallery. We created our own masterpiece that day - us! 🎨💝",
    },
    {
      id: 5,
      name: "Cozy Restaurant",
      type: "Meeting Friends",
      date: "1 month ago",
      description: "Where you met my best friends",
      icon: Heart,
      color: "bg-pink-500",
      coordinates: { x: 60, y: 70 },
      memory:
        "I was so nervous about you meeting my friends, but you charmed them instantly with your kindness and humor. By the end of the night, they were planning our wedding! You fit perfectly into my world. 👥💕",
    },
    {
      id: 6,
      name: "Our Favorite Spot",
      type: "Special Place",
      date: "Ongoing",
      description: "The bench where we always sit and talk",
      icon: MapPin,
      color: "bg-blue-500",
      coordinates: { x: 45, y: 45 },
      memory:
        "This has become 'our spot' - where we go to talk about everything and nothing. Whether we're sharing dreams, fears, or just enjoying comfortable silence, this place holds so many of our conversations and connections. 💬💙",
    },
  ];

  return (
    <div
      className="mt-16 p-6 space-y-6"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Instructions */}
      <Card className="p-4 bg-gray-800">
        <div className="flex items-start space-x-3">
          <MapPin className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
          <p className="text-gray-300 text-sm">
            Special places in our love. Each location marks a meaningful moment
            we've shared together. Tap any location to revisit that memory.
          </p>
        </div>
      </Card>

      {/* Interactive Map */}
      <Card className="p-6">
        <div className="relative bg-gray-800 rounded-lg h-80 overflow-hidden">
          {/* Map Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-16 left-0 w-full h-1 bg-gray-300"></div>
            <div className="absolute top-0 left-20 w-1 h-full bg-gray-300"></div>
            <div className="absolute bottom-20 left-0 w-full h-1 bg-gray-300 opacity-50"></div>
            <div className="absolute top-10 right-10 w-8 h-8 bg-gray-400 rounded-full opacity-30"></div>
            <div className="absolute bottom-10 left-10 w-6 h-6 bg-gray-400 rounded-full opacity-30"></div>
            <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-gray-400 rounded-full opacity-30"></div>
          </div>

          {/* Location Pins */}
          {loveLocations.map((location, idx) => (
            <motion.div
              key={location.id}
              drag
              dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
              dragElastic={0.2}
              className="absolute"
              style={{
                left: `${location.coordinates.x}%`,
                top: `${location.coordinates.y}%`,
              }}
              whileTap={{
                zIndex: 50,
                scale: 1.15,
              }}
              animate={{
                y: [0, -2, 0, 2, 0], // float up and down
                x: [0, -2, 0, 2, 0], // float right and left
              }}
              transition={{
                duration: 3 + (idx % 3) * 0.5, // slight variation per pin
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <button
                onClick={() => setSelectedLocation(location.id)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${location.color} text-white rounded-full p-2 shadow-lg hover:scale-110 transition-transform z-10`}
                style={{
                  left: `${location.coordinates.x}%`,
                  top: `${location.coordinates.y}%`,
                }}
              >
                <location.icon className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Location List */}
      <div className="mb-16 space-y-3">
        <h2 className="text-gray-300 font-bold">Our Love Journey Locations</h2>
        {
          loveLocations.map((location) => (
            <Card
              key={location.id}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedLocation(location.id)}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`p-2 rounded-full ${location.color} text-white`}
                >
                  <location.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-gray-300 font-bold">{location.name}</h3>
                    <span className="text-xs text-gray-400">{location.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-gray-400">{location.type}</span>
                    <span className="text-xs text-gray-500">
                      {location.description}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))
        }
      </div >

      {/* Memory Modal */}
      {
        selectedLocation && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedLocation(null)}
          >
            <Card className="max-w-sm w-full p-6">
              <div className="space-y-4">
                {/* Location Header */}
                <div className="text-center space-y-3">
                  <div
                    className={`w-16 h-16 ${loveLocations.find((l) => l.id === selectedLocation)?.color
                      } rounded-full flex items-center justify-center mx-auto`}
                  >
                    {React.createElement(
                      loveLocations.find((l) => l.id === selectedLocation)?.icon ||
                      MapPin,
                      { className: 'w-8 h-8 text-white' }
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl text-gray-300 font-bold">
                      {
                        loveLocations.find((l) => l.id === selectedLocation)
                          ?.name
                      }
                    </h3>
                    <p className="text-sm text-gray-400">
                      {
                        loveLocations.find((l) => l.id === selectedLocation)
                          ?.type
                      }{' '}
                      •{' '}
                      {
                        loveLocations.find((l) => l.id === selectedLocation)
                          ?.date
                      }
                    </p>
                  </div>
                </div>

                {/* Memory */}
                <div className="bg-gray-800 rounded-lg p-4">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {
                      loveLocations.find((l) => l.id === selectedLocation)
                        ?.memory
                    }
                  </p>
                </div>

                {/* Close Button */}
                <Button
                  onClick={() => setSelectedLocation(null)}
                  className="w-full bg-gray-300 hover:bg-gray-700"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Beautiful Memory!
                </Button>
              </div>
            </Card>
          </div>
        )
      }
    </div >
  );
}