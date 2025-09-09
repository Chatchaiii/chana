import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Heart, Star, Waves, VenetianMask, Droplets, Camera, Sparkle } from 'lucide-react';

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
      color: "bg-gray-600",
      preview: "https://placekitten.com/80/60",
      gallery: [
        "https://placekitten.com/300/200",
        "https://placekitten.com/301/200",
        "https://placekitten.com/302/200"
      ],
      notes: [
        "First day of something special.",
        "We laughed a lot.",
        "The weather was perfect."
      ]
    },
    {
      date: "09.06.2025",
      title: "The Lake",
      description: "One of my core memories of us would be this day.",
      icon: Waves,
      color: "bg-gray-600",
      preview: "https://placekitten.com/81/60",
      gallery: [
        "https://placekitten.com/303/200",
        "https://placekitten.com/304/200"
      ],
      notes: [
        "The water was cold but fun.",
        "We shared secrets."
      ]
    },
    {
      date: "18.06.2025",
      title: "Theatre",
      description: "God, was I nervous to see your theatre.",
      icon: VenetianMask,
      color: "bg-gray-600",
      preview: "https://placekitten.com/82/60",
      gallery: [
        "https://placekitten.com/305/200"
      ],
      notes: [
        "You looked amazing on stage.",
        "I was so proud."
      ]
    },
    {
      date: "22.06.2025",
      title: "The day",
      description: "Nervous to speak, nervous to breathe, nervous to look at you.",
      icon: Droplets,
      color: "bg-gray-600",
      preview: "https://placekitten.com/83/60",
      gallery: [
        "https://placekitten.com/306/200"
      ],
      notes: [
        "Everything felt new.",
        "We talked for hours."
      ]
    },
    {
      date: "26.06.2025",
      title: "Wannsee",
      description: "The weather first had different plans for us. It was rainy, it was windy, it was cloudy - like a storm.",
      icon: Waves,
      color: "bg-gray-600",
      preview: "https://placekitten.com/84/60",
      gallery: [
        "https://placekitten.com/307/200"
      ],
      notes: [
        "We made the best of it.",
        "Rainy days can be beautiful."
      ]
    },
    {
      date: "05.07.2025",
      title: "Photo-booth",
      description: "I may acted like it was a normal day, but I was excited as fuck.",
      icon: Camera,
      color: "bg-gray-600",
      preview: "https://placekitten.com/85/60",
      gallery: [
        "https://placekitten.com/308/200"
      ],
      notes: [
        "Silly faces, real smiles.",
        "Photos to remember."
      ]
    },
    {
      date: "13.07.2025",
      title: "Reflections",
      description: "Reflections... As soon as I hear that word I think of three particular things. ",
      icon: Sparkle,
      color: "bg-gray-600",
      preview: "https://placekitten.com/86/60",
      gallery: [
        "https://placekitten.com/309/200"
      ],
      notes: [
        "Looking back, looking forward.",
        "Grateful for every moment."
      ]
    }
  ];

  // State for modal
  const [selected, setSelected] = useState<null | number>(null);

  // Fullscreen Modal component
  function Modal({ milestone, onClose }: { milestone: typeof milestones[0], onClose: () => void }) {
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-80 w-screen h-screen flex flex-col">
        <button
          className="absolute top-4 right-6 text-gray-400 hover:text-gray-200 text-3xl z-10"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <div className="flex flex-1 flex-col md:flex-row overflow-auto">
          {/* Main Content */}
          <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-6">
            <div className={`p-5 rounded-full ${milestone.color} text-white mb-4`}>
              <milestone.icon className="w-12 h-12" />
            </div>
            <h2 className="text-3xl text-gray-100">{milestone.title}</h2>
            <img
              src={milestone.gallery[0]}
              alt="Main"
              className="rounded shadow-lg max-w-md"
            />
            <p className="text-gray-300 text-lg text-center max-w-xl">
              {milestone.description}
            </p>
          </div>
          {/* Sidebar Content */}
          <div className="bg-gray-800 w-full md:w-96 p-8 flex flex-col space-y-6 border-t md:border-t-0 md:border-l border-gray-700">
            <h3 className="text-xl text-gray-200 mb-2">Gallery</h3>
            <div className="flex space-x-2 overflow-x-auto">
              {milestone.gallery.map((img, i) => (
                <img key={i} src={img} alt={`Gallery ${i+1}`} className="rounded w-20 h-16 object-cover" />
              ))}
            </div>
            <div>
              <h4 className="text-lg text-gray-300 mb-1">Notes</h4>
              <ul className="list-disc list-inside text-gray-400 text-sm">
                {milestone.notes.map((note, i) => (
                  <li key={i}>{note}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg text-gray-300 mb-1">Links</h4>
              <a href="#" className="text-blue-400 underline text-sm">See more photos</a>
            </div>
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
            className="p-3 relative cursor-pointer hover:bg-gray-700 transition flex items-center"
            onClick={() => setSelected(index)}
          >
            <div className={`p-2 rounded-full ${milestone.color} text-white flex-shrink-0`}>
              <milestone.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 space-y-1 ml-4">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-200">{milestone.title}</h3>
                <span className="text-sm text-gray-400">{milestone.date}</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                {milestone.description}
              </p>
            </div>
            {/* Preview image */}
            <img
              src={milestone.preview}
              alt="Preview"
              className="ml-4 rounded shadow w-20 h-14 object-cover"
            />
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