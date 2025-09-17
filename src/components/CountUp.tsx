import React, { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {
  ArrowLeft,
  Heart,
  Calendar,
  Clock,
  Infinity,
  Activity,
  Smile,
  UsersRound,
} from "lucide-react";
import { motion } from "framer-motion";

interface CountUpProps {
  onBack: () => void;
}

export function CountUp({ onBack }: CountUpProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Set our relationship start date to 22.06.2025, 8pm
  const relationshipStart = new Date(2025, 5, 22, 20, 0, 0, 0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;

    if (deltaX > 80) {
      // swipe right threshold
      // onBack();
    }

    setTouchStartX(null);
  };

  // If currentTime is before relationshipStart, show zeros
  const timeDifference =
    Math.max(0, currentTime.getTime() - relationshipStart.getTime());

  const days = Math.floor(
    timeDifference / (1000 * 60 * 60 * 24),
  );
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor(
    (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
  );
  const seconds = Math.floor(
    (timeDifference % (1000 * 60)) / 1000,
  );

  const totalHours = Math.floor(
    timeDifference / (1000 * 60 * 60),
  );
  const totalMinutes = Math.floor(timeDifference / (1000 * 60));
  const totalSeconds = Math.floor(timeDifference / 1000);

  const milestones = [
    {
      value: days,
      label: "Days Together",
      icon: Calendar,
      color: "text-gray-300",
    },
    {
      value: totalHours,
      label: "Total Hours",
      icon: Clock,
      color: "text-gray-300",
    },
    {
      value: totalMinutes,
      label: "Total Minutes",
      icon: Heart,
      color: "text-gray-300",
    },
    {
      value: totalSeconds,
      label: "Total Seconds",
      icon: Heart,
      color: "text-gray-300",
    },
  ];

  return (
    <div
      className="mt-16 mb-14 p-6 space-y-6"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Main Counter */}
      <Card className="p-6 bg-gray-800">
        <div className="text-center space-y-4">
          <div>
            <div className="flex items-center justify-between mb-5 p-3">
              <Heart 
                className="h-6 text-pink-500"
              />
              <h2 className="text-xl text-gray-300 font-bold">
                We've been together for
              </h2>
              <Heart 
                className="h-6 text-pink-500"
              />
            </div>
            <div className="grid grid-cols-4 gap-4 text-center font-bold">
              <div className="space-y-1">
                <div className="text-3xl text-gray-300">{days}</div>
                <div className="text-sm text-gray-300">Days</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl text-gray-300">{hours}</div>
                <div className="text-sm text-gray-300">Hours</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl text-gray-300">{minutes}</div>
                <div className="text-sm text-gray-300">Minutes</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl text-gray-300">{seconds}</div>
                <div className="text-sm text-gray-300">Seconds</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Milestone Cards */}
      <div className="space-y-3">
        <h2 className="text-gray-300 font-bold">Love Milestones</h2>
        {milestones.map((milestone, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <milestone.icon className={`w-6 h-6 text-pink-500`} />
                <span className="text-gray-300">{milestone.label}</span>
              </div>
              <span className={`text-2xl ${milestone.color}`}>
                {milestone.value.toLocaleString()}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Fun Facts */}
      <Card className="p-6 bg-gray-800">
        <div className="space-y-4">
          <h3 className="text-gray-300 text-center font-bold">
            Fun Love Facts
          </h3>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex">
              <Activity className="w-4 h-5 mr-2 text-pink-500" />
              <span>Heartbeats together (approx):</span>
              <span className="text-gray-300 ml-auto">
                {(totalMinutes * 70).toLocaleString()}
              </span>
            </div>
            <div className="flex">
              <Smile className="w-4 h-5 mr-2 text-pink-500" />
              <span>Smiles shared:</span>
              <span className="text-gray-300 ml-auto">Countless</span>
            </div>
            <div className="flex">
              <UsersRound className="w-4 h-5 mr-2 text-pink-500" />
              <span>Hugs given:</span>
              <span className="text-gray-300 ml-auto">Not enough</span>
            </div>
            <div className="flex">
              <Heart className="w-4 h-5 mr-2 text-pink-500" />
              <span>Love level:</span>
              <span className="text-gray-200 ml-auto">
                <Infinity className="w-4 h-5" />
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Anniversary Date */}
      <Card className="-mt-7 p-4 bg-transparent text-center border border-transparent">
        <div className="space-y-2">
          <p className="-mb-1 text-gray-400 font-bold">
            Our relationship started on:
          </p>
          <p className="text-sm italic text-gray-500">
            {relationshipStart.toLocaleDateString("en-DE", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </Card>
    </div>
  );
}