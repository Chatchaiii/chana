import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Gift, Heart, Star, Sparkles, Package } from 'lucide-react';

interface GiftBoxProps {
  onBack: () => void;
}

export function GiftBox({ onBack }: GiftBoxProps) {
  const [openedGifts, setOpenedGifts] = useState<number[]>([]);
  const [selectedGift, setSelectedGift] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const gifts = [
    {
      id: 1,
      name: "Virtual Hug",
      description: "A warm, loving hug from me to you! Feel my arms around you wherever you are. 🤗",
      icon: "🤗",
      color: "from-pink-400 to-red-400",
      message: "Sending you the biggest, warmest hug! Imagine my arms around you right now, holding you close and making you feel safe and loved. This hug comes with all my love and a promise that a real one is coming soon! 💕"
    },
    {
      id: 2,
      name: "Kiss Collection",
      description: "A collection of sweet kisses for whenever you need them! 💋",
      icon: "💋",
      color: "from-purple-400 to-pink-400",
      message: "Here's a whole collection of kisses just for you! Forehead kisses for comfort, cheek kisses for sweetness, and lip kisses for love. Save them for when you miss me, and remember that each one comes with all my love! 😘💕"
    },
    {
      id: 3,
      name: "Love Potion",
      description: "A magical potion that makes everything better - it's called 'thinking of you'! ✨",
      icon: "🧪",
      color: "from-blue-400 to-purple-400",
      message: "This magical love potion is made with thoughts of you, sprinkled with care, and bottled with all my affection. One sip (or just thinking about it) will remind you how much you mean to me and fill your heart with warmth! 💖✨"
    },
    {
      id: 4,
      name: "Starlight Wishes",
      description: "A jar full of wishes upon stars, all made for your happiness! ⭐",
      icon: "⭐",
      color: "from-yellow-400 to-orange-400",
      message: "I've collected wishes from every star I've seen since we've been together. Each wish is for your happiness, success, and all your dreams to come true. Whenever you need hope or magic, remember these starlight wishes are always with you! 🌟💫"
    },
    {
      id: 5,
      name: "Memory Box",
      description: "A box filled with all our beautiful memories together! 📸",
      icon: "📸",
      color: "from-green-400 to-blue-400",
      message: "This memory box contains every laugh we've shared, every smile you've given me, every moment that made my heart flutter, and every memory that makes me grateful you're in my life. These memories are our treasures! 💝📷"
    },
    {
      id: 6,
      name: "Future Adventures",
      description: "A ticket to all the amazing adventures we'll have together! 🎟️",
      icon: "🎟️",
      color: "from-teal-400 to-green-400",
      message: "This ticket grants access to unlimited adventures with me! From quiet movie nights to exciting travels, from cooking disasters to perfect dates - every adventure is better with you. Our journey together is just beginning! 🚀💕"
    }
  ];

  const handleOpenGift = (giftId: number) => {
    if (!openedGifts.includes(giftId)) {
      setOpenedGifts([...openedGifts, giftId]);
    }
    setSelectedGift(giftId);
  };

  const isOpened = (giftId: number) => openedGifts.includes(giftId);

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
        <h1 className="text-2xl text-orange-600">Virtual Gift Box</h1>
      </div>

      {/* Instructions */}
      <Card className="p-4 bg-orange-50 border-orange-200">
        <div className="flex items-start space-x-3">
          <Gift className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-orange-800 text-sm">
              I've prepared special virtual gifts just for you! Each one is wrapped with love and contains something meaningful.
              Tap any gift to unwrap it! 🎁💕
            </p>
          </div>
        </div>
      </Card>

      {/* Gift Grid */}
      <div className="grid grid-cols-2 gap-4">
        {gifts.map((gift) => (
          <Card
            key={gift.id}
            className={`p-4 cursor-pointer transition-all hover:shadow-lg ${isOpened(gift.id) ? 'ring-2 ring-orange-500' : ''
              }`}
            onClick={() => handleOpenGift(gift.id)}
          >
            <div className="text-center space-y-3">
              <div
                className={`w-16 h-16 bg-gradient-to-br ${gift.color} rounded-xl flex items-center justify-center mx-auto relative`}
              >
                {isOpened(gift.id) ? (
                  <span className="text-2xl">{gift.icon}</span>
                ) : (
                  <>
                    <Package className="w-8 h-8 text-white" />
                    <Sparkles className="w-4 h-4 text-white absolute -top-1 -right-1" />
                  </>
                )}
              </div>
              <div>
                <h3 className="text-sm text-gray-800 mb-1">{gift.name}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {gift.description}
                </p>
              </div>
              {isOpened(gift.id) && (
                <div className="text-xs text-orange-600">✨ Opened!</div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Progress */}
      <Card className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center space-x-2">
            <Gift className="w-5 h-5 text-orange-600" />
            <span className="text-orange-800">
              Gifts Opened: {openedGifts.length}/{gifts.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(openedGifts.length / gifts.length) * 100}%` }}
            ></div>
          </div>
          {openedGifts.length === gifts.length && (
            <div className="space-y-2">
              <Star className="w-6 h-6 text-yellow-500 mx-auto" />
              <p className="text-orange-700 text-sm">
                You've opened all my gifts! Each one carries my love for you! 💝
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Gift Message Modal */}
      {selectedGift && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedGift(null)}
        >
          <Card className="max-w-sm w-full p-6 max-h-96 overflow-y-auto">
            <div className="space-y-4">
              {/* Gift Header */}
              <div className="text-center space-y-3">
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${gifts.find((g) => g.id === selectedGift)?.color
                    } rounded-xl flex items-center justify-center mx-auto`}
                >
                  <span className="text-3xl">
                    {gifts.find((g) => g.id === selectedGift)?.icon}
                  </span>
                </div>
                <h3 className="text-xl text-gray-800">
                  {gifts.find((g) => g.id === selectedGift)?.name}
                </h3>
              </div>

              {/* Gift Message */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {gifts.find((g) => g.id === selectedGift)?.message}
                </p>
              </div>

              {/* Close Button */}
              <Button
                onClick={() => setSelectedGift(null)}
                className="w-full bg-orange-500 hover:bg-orange-600"
              >
                <Heart className="w-4 h-4 mr-2" />
                Thank You!
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Love Message */}
      <Card className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
        <div className="text-center space-y-2">
          <Heart className="w-6 h-6 text-pink-600 mx-auto" />
          <p className="text-pink-800 text-sm">
            Every gift is a piece of my heart, wrapped with love and delivered with a smile.
            You deserve all the love in the world! 💕
          </p>
        </div>
      </Card>
    </div>
  );
}