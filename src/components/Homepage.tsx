import Whiteheart from "../assets/images/homepage/white-heart.svg";
import Kiss from "../assets/images/homepage/kiss.jpg";
import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Heart,  
  Clock,
  Camera,
  Brain,
  Music,
  Gift,
  Map,
  Gamepad2,
  Mail,
} from "lucide-react";
import { FeatureType } from "../App";

interface HomepageProps {
  onNavigate: (feature: FeatureType) => void;
}

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
    // {
    //   id: "music" as FeatureType,
    //   name: "Music",
    //   icon: Music,
    //   color: "bg-gray-000",
    // },
    {
      id: "gifts" as FeatureType,
      name: "Gift Box",
      icon: Gift,
      color: "bg-gray-000",
    },
    {
      id: "map" as FeatureType,
      name: "Map",
      icon: Map,
      color: "bg-gray-000",
    },
    {
      id: "game" as FeatureType,
      name: "Mini-Game",
      icon: Gamepad2,
      color: "bg-gray-000",
    },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-left space-y-6">
        <div className="relative w10 h-10 mx-auto rounded-2xl overflow-hidden shadow-md">
          <ImageWithFallback
            src={Whiteheart}
            alt="white heart"
            className="w-10 h-10 object-cover"
          />
        </div>
        <div className="relative w90 h-60 mx-auto rounded-2xl overflow-hidden shadow-md">
          <ImageWithFallback
            src={Kiss}
            alt="kiss"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {/* Text Body */}
      <p className="text-center text-[11pt] font-bold italic text-gray-300 my-6 p-4">
        "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."
      </p>

      {/* Features Grid */}
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
      {/* Footer */}
      <div className="text-center text-sm text-gray-700 my-8">
        kheyli dooset daram eshgham
      </div>
    </div>
  );
}