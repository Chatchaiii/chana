import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Heart, Star, Calendar, Waves, VenetianMask, Droplets, Camera } from 'lucide-react';

interface TimelineProps {
  onBack: () => void;
}

export function Timeline({ onBack }: TimelineProps) {
  const milestones = [
    {
      date: "06.06.2025",
      title: "The Start",
      description: "Starting with June 6th, I've never expected us to come so far when looking back.",
      icon: Star,
      color: "bg-gray-600"
    },
    {
      date: "09.06.2025",
      title: "The Lake",
      description: "One of my core memories of us would be this day.",
      icon: Waves,
      color: "bg-gray-600"
    },
    {
      date: "18.06.2025",
      title: "Theatre",
      description: "God, was I nervous to see your theatre.",
      icon: VenetianMask,
      color: "bg-gray-600"
    },
    {
      date: "22.06.2025",
      title: "The day",
      description: "Nervous to speak, nervous to breathe, nervous to look at you.",
      icon: Droplets,
      color: "bg-gray-600"
    },
    {
      date: "26.06.2025",
      title: "Wannsee",
      description: "The weather first had different plans for us. It was rainy, it was windy, it was cloudy - like a storm.",
      icon: Waves,
      color: "bg-gray-600"
    },
    {
      date: "05.07.2025",
      title: "Photo-booth",
      description: "I may acted like it was a normal day, but I was excited as fuck.",
      icon: Camera,
      color: "bg-gray-600"
    },
    {
      date: "Today",
      title: "3 Months Strong!",
      description: "Celebrating our beautiful journey and looking forward to more",
      icon: Calendar,
      color: "bg-gray-600"
    }
  ];

  // State for modal
  const [selected, setSelected] = useState<null | number>(null);

  // Example modal component
  function Modal({ milestone, onClose }: { milestone: typeof milestones[0], onClose: () => void }) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
        <div className="bg-gray-800 rounded-lg p-6 max-w-sm w-full relative">
          <button
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
          <div className="flex flex-col items-center space-y-4">
            <div className={`p-3 rounded-full ${milestone.color} text-white`}>
              <milestone.icon className="w-8 h-8" />
            </div>
            <h2 className="text-xl text-gray-100">{milestone.title}</h2>
            <img
              src="https://placekitten.com/300/200"
              alt="Example"
              className="rounded shadow"
            />
            <p className="text-gray-300 text-center">
              Example text for <b>{milestone.title}</b>.<br />
              {milestone.description}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button onClick={onBack} variant="ghost" size="sm">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl text-gray-300">Timeline</h1>
      </div>
      {/* Timeline */}
      <div className="space-y-4">
        {milestones.map((milestone, index) => (
          <Card
            key={index}
            className="p-3 relative cursor-pointer hover:bg-gray-700 transition"
            onClick={() => setSelected(index)}
          >
            <div className="flex items-start space-x-4">
              <div className={`p-2 rounded-full ${milestone.color} text-white flex-shrink-0`}>
                <milestone.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-200">{milestone.title}</h3>
                  <span className="text-sm text-gray-400">{milestone.date}</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Love Quote */}
      <Card className="p-6 bg-gray-900 border-gray-900">
        <div className="text-center space-y-2">
          <Heart className="w-8 h-8 text-gray-800 mx-auto" />
          <p className="text-gray-300 italic">
            "Every love story is beautiful, but ours is my favorite."
          </p>
        </div>
      </Card>

      {/* Modal */}
      {selected !== null && (
        <Modal
          milestone={milestones[selected]}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}