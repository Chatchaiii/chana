import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Heart, Volume2 } from 'lucide-react';

interface MusicPlayerProps {
  onBack: () => void;
}

export function MusicPlayer({ onBack }: MusicPlayerProps) {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(75);

  const playlist = [
    {
      title: "Perfect",
      artist: "Ed Sheeran",
      description: "Our song - the one that perfectly describes how I feel about you",
      duration: "4:23",
      color: "from-red-400 to-pink-500"
    },
    {
      title: "All of Me",
      artist: "John Legend",
      description: "Because you have all of me, and I love all of you",
      duration: "4:29",
      color: "from-purple-400 to-pink-500"
    },
    {
      title: "Thinking Out Loud",
      artist: "Ed Sheeran",
      description: "When we're dancing in the kitchen at 2am",
      duration: "4:41",
      color: "from-blue-400 to-purple-500"
    },
    {
      title: "A Thousand Years",
      artist: "Christina Perri",
      description: "How long I want to love you",
      duration: "4:45",
      color: "from-green-400 to-blue-500"
    },
    {
      title: "Can't Help Myself",
      artist: "Four Tops",
      description: "How I feel every time I see you",
      duration: "2:58",
      color: "from-yellow-400 to-orange-500"
    }
  ];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    setCurrentSong(currentSong > 0 ? currentSong - 1 : playlist.length - 1);
  };

  const handleNext = () => {
    setCurrentSong(currentSong < playlist.length - 1 ? currentSong + 1 : 0);
  };

  const handleSongSelect = (index: number) => {
    setCurrentSong(index);
    setIsPlaying(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button onClick={onBack} variant="ghost" size="sm">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl text-green-600">Background Music</h1>
      </div>

      {/* Current Song Player */}
      <Card className="p-6">
        <div className={`bg-gradient-to-br ${playlist[currentSong].color} rounded-lg p-6 text-white mb-6`}>
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-xl mb-1">{playlist[currentSong].title}</h2>
              <p className="text-white text-opacity-90">{playlist[currentSong].artist}</p>
            </div>
          </div>
        </div>

        {/* Song Description */}
        <div className="mb-6 text-center">
          <p className="text-gray-600 text-sm italic">
            {playlist[currentSong].description}
          </p>
        </div>

        {/* Progress Bar (Mock) */}
        <div className="space-y-2 mb-6">
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div className="bg-green-500 h-1 rounded-full w-1/3"></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>1:25</span>
            <span>{playlist[currentSong].duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-6 mb-6">
          <Button onClick={handlePrevious} variant="ghost" size="sm">
            <SkipBack className="w-6 h-6" />
          </Button>
          <Button 
            onClick={handlePlayPause}
            className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8" />
            ) : (
              <Play className="w-8 h-8 ml-1" />
            )}
          </Button>
          <Button onClick={handleNext} variant="ghost" size="sm">
            <SkipForward className="w-6 h-6" />
          </Button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-3">
          <Volume2 className="w-5 h-5 text-gray-600" />
          <div className="flex-1">
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
          <span className="text-sm text-gray-600 w-8">{volume}</span>
        </div>
      </Card>

      {/* Playlist */}
      <div className="space-y-4">
        <h2 className="text-gray-700">Our Love Playlist</h2>
        <div className="space-y-2">
          {playlist.map((song, index) => (
            <Card 
              key={index} 
              className={`p-4 cursor-pointer transition-all ${
                index === currentSong ? 'ring-2 ring-green-500 bg-green-50' : 'hover:shadow-md'
              }`}
              onClick={() => handleSongSelect(index)}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${song.color} rounded-lg flex items-center justify-center`}>
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-800">{song.title}</h3>
                  <p className="text-sm text-gray-600">{song.artist}</p>
                </div>
                <div className="text-sm text-gray-500">
                  {song.duration}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Music Note */}
      <Card className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <div className="text-center space-y-2">
          <Heart className="w-6 h-6 text-green-600 mx-auto" />
          <p className="text-green-800 text-sm">
            Each song reminds me of a special moment with you. Music is even more beautiful when I listen to it thinking of you! 🎵💕
          </p>
        </div>
      </Card>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}