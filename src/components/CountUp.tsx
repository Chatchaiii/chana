import React, { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {
  ArrowLeft,
  Heart,
  Calendar,
  Clock,
} from "lucide-react";

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
      onBack();
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
      className="p-6 space-y-6"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button
          onClick={onBack}
          variant=""
          size="sm"
          className="rounded-full bg-grey-800 hover:bg-gray-700"
        >
          <ArrowLeft className="w-5 h-5 bg-gray-900 text-gray-300" />
        </Button>
        <h1 className="text-2xl text-gray-300 font-bold">Count-up</h1>
      </div>

      {/* Main Counter */}
      <Card className="p-6 bg-gray-800">
        <div className="text-center space-y-4">
          <Heart className="w-12 h-12 text-gray-300 mx-auto" />
          <div>
            <h2 className="text-2xl text-gray-300 mb-2 font-bold">
              We've been together for
            </h2>
            <div className="grid grid-cols-2 gap-4 text-center">
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
                <milestone.icon className={`w-6 h-6 ${milestone.color}`} />
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
            <div className="flex justify-between">
              <span>Heartbeats together (approx):</span>
              <span className="text-gray-300">
                {(totalMinutes * 70).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Smiles shared:</span>
              <span className="text-gray-300">Countless</span>
            </div>
            <div className="flex justify-between">
              <span>Hugs given:</span>
              <span className="text-gray-300">Not enough</span>
            </div>
            <div className="flex justify-between">
              <span>Love level:</span>
              <span className="text-gray-300">Infinite</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Anniversary Date */}
      <Card className="p-4 text-center bg-gray-300 border border-gray-300">
        <div className="space-y-2">
          <p className="text-gray-800 font-bold">
            Our relationship started on:
          </p>
          <p className="text-lg text-gray-800">
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