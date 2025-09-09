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

  // Set our relationship start date (3 months ago)
  const relationshipStart = new Date();
  relationshipStart.setMonth(relationshipStart.getMonth() - 3);
  relationshipStart.setHours(14, 30, 0, 0); // 2:30 PM when we first met

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeDifference =
    currentTime.getTime() - relationshipStart.getTime();

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
      color: "text-gray-400",
    },
    {
      value: totalHours,
      label: "Total Hours",
      icon: Clock,
      color: "text-gray-400",
    },
    {
      value: totalMinutes,
      label: "Total Minutes",
      icon: Heart,
      color: "text-gray-400",
    },
    {
      value: totalSeconds,
      label: "Total Seconds",
      icon: Heart,
      color: "text-gray-400",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button onClick={onBack} variant="ghost" size="sm">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl text-gray-300">count-up</h1>
      </div>

      {/* Main Counter */}
      <Card className="p-6 bg-gradient-to-br from-gray-1000 to-gray-950 border-gray-900">
        <div className="text-center space-y-4">
          <Heart className="w-12 h-12 text-gray-400 mx-auto" />
          <div>
            <h2 className="text-2xl text-gray-200 mb-2">
              We've been together for
            </h2>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="space-y-1">
                <div className="text-3xl text-gray-300">
                  {days}
                </div>
                <div className="text-sm text-gray-400">
                  Days
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl text-gray-300">
                  {hours}
                </div>
                <div className="text-sm text-gray-400">
                  Hours
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl text-gray-300">
                  {minutes}
                </div>
                <div className="text-sm text-gray-400">
                  Minutes
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl text-gray-300">
                  {seconds}
                </div>
                <div className="text-sm text-gray-400">
                  Seconds
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Milestone Cards */}
      <div className="space-y-3">
        <h2 className="text-gray-300">Love Milestones</h2>
        {milestones.map((milestone, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <milestone.icon
                  className={`w-6 h-6 ${milestone.color}`}
                />
                <span className="text-gray-700">
                  {milestone.label}
                </span>
              </div>
              <span className={`text-2xl ${milestone.color}`}>
                {milestone.value.toLocaleString()}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Fun Facts */}
      <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <div className="space-y-4">
          <h3 className="text-gray-800 text-center">
            Fun Love Facts
          </h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Heartbeats together (approx):</span>
              <span className="text-orange-600">
                {(totalMinutes * 70).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Smiles shared:</span>
              <span className="text-orange-600">
                Countless! 😊
              </span>
            </div>
            <div className="flex justify-between">
              <span>Hugs given:</span>
              <span className="text-orange-600">
                Not enough! 🤗
              </span>
            </div>
            <div className="flex justify-between">
              <span>Love level:</span>
              <span className="text-orange-600">
                Infinite! 💕
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Anniversary Date */}
      <Card className="p-4 text-center bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="space-y-2">
          <p className="text-gray-600">
            Our relationship started on:
          </p>
          <p className="text-lg text-purple-600">
            {relationshipStart.toLocaleDateString("en-US", {
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