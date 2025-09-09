import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Heart, Star, Calendar } from 'lucide-react';

interface TimelineProps {
  onBack: () => void;
}

export function Timeline({ onBack }: TimelineProps) {
  const milestones = [
    {
      date: "3 months ago",
      title: "Our First Meeting",
      description: "The day our eyes first met and everything changed forever",
      icon: Star,
      color: "bg-gray-600"
    },
    {
      date: "2.5 months ago",
      title: "First Date",
      description: "Coffee turned into hours of talking and laughing together",
      icon: Heart,
      color: "bg-gray-600"
    },
    {
      date: "2 months ago",
      title: "Became Official",
      description: "The moment we decided to write our love story together",
      icon: Heart,
      color: "bg-gray-600"
    },
    {
      date: "1.5 months ago",
      title: "First Trip Together",
      description: "Creating beautiful memories in new places",
      icon: Star,
      color: "bg-gray-600"
    },
    {
      date: "1 month ago",
      title: "Meeting Friends",
      description: "Introducing each other to our worlds",
      icon: Heart,
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
        <h1 className="text-2xl text-gray-300">Timeline of Our Love</h1>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {milestones.map((milestone, index) => (
          <Card
            key={index}
            className="p-4 relative cursor-pointer hover:bg-gray-700 transition"
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
            {index < milestones.length - 1 && (
              <div className="absolute left-8 top-12 w-0.5 h-6 bg-gray-200"></div>
            )}
          </Card>
        ))}
      </div>

      {/* Love Quote */}
      <Card className="p-6 bg-gradient-to-r from-gray-800 to-gray-700 border-gray-600">
        <div className="text-center space-y-2">
          <Heart className="w-8 h-8 text-gray-400 mx-auto" />
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