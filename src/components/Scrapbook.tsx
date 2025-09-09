import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Plus, Heart, Camera, Upload } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ScrapbookProps {
  onBack: () => void;
}

export function Scrapbook({ onBack }: ScrapbookProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const photos = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1605462747736-58ddb84a87f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsb3ZlJTIwbGV0dGVycyUyMHZpbnRhZ2UlMjByb21hbnRpY3xlbnwxfHx8fDE3NTc0MDUzMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      caption: "Our first coffee date ☕️",
      date: "Month 1"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1643123928085-b93ff675ec79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGNvdXBsZSUyMGhlYXJ0JTIwbG92ZXxlbnwxfHx8fDE3NTc0MDUzMDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      caption: "Perfect sunset together 🌅",
      date: "Month 2"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1605462747736-58ddb84a87f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNsb3ZlJTIwbGV0dGVycyUyMHZpbnRhZ2UlMjByb21hbnRpY3xlbnwxfHx8fDE3NTc0MDUzMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      caption: "Adventures together 🚗",
      date: "Month 3"
    }
  ];

  const memories = [
    "First 'I love you' 💕",
    "Inside jokes that make us laugh 😄",
    "Favorite songs we discovered together 🎵",
    "Places we want to visit 🗺️",
    "Dreams we're building together ✨"
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button onClick={onBack} variant="ghost" size="sm">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl text-gray-300">Digital Scrapbook</h1>
      </div>

      {/* Photo Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-gray-300">Our Memories</h2>
          <Button size="sm" className="bg-gray-600 hover:bg-gray-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Photo
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {photos.map((photo) => (
            <Card 
              key={photo.id} 
              className="p-2 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedPhoto(photo.id)}
            >
              <div className="space-y-2">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-300">{photo.caption}</p>
                  <p className="text-xs text-gray-400">{photo.date}</p>
                </div>
              </div>
            </Card>
          ))}
          
          {/* Add Photo Placeholder */}
          <Card className="p-2 border-dashed border-2 border-gray-600 hover:border-gray-500 cursor-pointer transition-colors">
            <div className="aspect-square flex flex-col items-center justify-center space-y-2 text-gray-500">
              <Upload className="w-8 h-8" />
              <p className="text-sm">Add Photo</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Memory Notes */}
      <div className="space-y-4">
        <h2 className="text-gray-300">Special Memories</h2>
        <div className="space-y-3">
          {memories.map((memory, index) => (
            <Card key={index} className="p-4 bg-gradient-to-r from-gray-800 to-gray-700">
              <div className="flex items-center space-x-3">
                <Heart className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <p className="text-gray-300">{memory}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <Card className="max-w-sm w-full p-4">
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={photos.find(p => p.id === selectedPhoto)?.src || ''}
                  alt={photos.find(p => p.id === selectedPhoto)?.caption || ''}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <p className="text-gray-300">{photos.find(p => p.id === selectedPhoto)?.caption}</p>
                <p className="text-sm text-gray-400">{photos.find(p => p.id === selectedPhoto)?.date}</p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}