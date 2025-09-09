import whiteheart from "../assets/images/homepage/white-heart.svg";
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
    {
      id: "music" as FeatureType,
      name: "Music",
      icon: Music,
      color: "bg-gray-000",
    },
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
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-left space-y-6">
        {/* <div>
          <h1 className="text-3xl text-gray-300 mb-6">chana</h1>
        </div> */}

        <div className="relative w10 h-10 mx-auto rounded-2xl overflow-hidden shadow-md">
          <ImageWithFallback
            src={whiteheart}
            alt="white heart"
            className="w-10 h-10 object-cover"
          />
        </div>

        {/* <div className="relative w90 h-60 mx-auto rounded-2xl overflow-hidden shadow-md">
          <ImageWithFallback
            src={image_42923102f2346903b4aa7d3bc56934f2c31f318c}
            alt="Love celebration"
            className="w-full h-full object-cover"
          />
        </div> */}

        {/* <p className="text-gray-400 leading-relaxed">
          Happy anniversary doret begardam &lt;3
        </p> */}
      </div>
      {/* Text Body */}
      <p className="text-center text-[11pt] font-bold italic text-gray-300 my-6">
        "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."
      </p>

      {/* Features Grid */}
      <div className="space-y-3">
        {features.map((feature) => (
          <Card
            key={feature.id}
            className="p-3 hover:shadow-lg transition-shadow"
          >
            <Button
              onClick={() => onNavigate(feature.id)}
              className="w-full flex items-center justify-start space-x-3 bg-transparent hover:bg-gray-900 text-gray-300 p-3"
              variant="ghost"
            >
              <div
                className={`p-1 rounded-lg ${feature.color} text-white`}
              >
                <feature.icon className="w-6 h-6" />
              </div>
              <span className="flex-1 text-left">
                {feature.name}
              </span>
            </Button>
          </Card>
        ))}
      </div>

      {/* Footer
      <div className="text-center text-sm text-gray-400 mt-8">
        dooset daram eshgham
      </div> */}
    </div>
  );
}