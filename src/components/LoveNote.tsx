import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Heart, Lock, Unlock, Eye } from 'lucide-react';

interface LoveNoteProps {
  onBack: () => void;
}

export function LoveNote({ onBack }: LoveNoteProps) {
  const [unlockedNotes, setUnlockedNotes] = useState<number[]>([]);
  const [selectedNote, setSelectedNote] = useState<number | null>(null);

  const loveNotes = [
    {
      id: 1,
      title: "Why I Love Your Smile",
      hint: "What lights up my world?",
      password: "smile",
      content: "Your smile is the first thing I fell in love with. It lights up every room you enter and makes my heart skip a beat every single time. When you smile at me, I feel like the luckiest person in the world. Your smile tells me that everything will be okay, and it's the most beautiful sight I could ever hope to see. Keep smiling, my love, because your happiness is my happiness. 😊💕"
    },
    {
      id: 2,
      title: "Our First Kiss",
      hint: "What made time stop?",
      password: "kiss",
      content: "I still remember every detail of our first kiss. The way time seemed to stop, how my heart raced, and how perfectly we fit together. It was magical, sweet, and everything I had dreamed it would be. In that moment, I knew that you were someone special, someone I wanted to keep kissing for the rest of my life. That kiss sealed our love and started our beautiful journey together. 💋❤️"
    },
    {
      id: 3,
      title: "Future Dreams",
      hint: "What do we build together?",
      password: "future",
      content: "I love dreaming about our future together. I see us traveling the world, creating a beautiful home, maybe getting a cute pet, and building a life filled with love and laughter. I dream of lazy Sunday mornings, cooking together, and growing old with you by my side. Every dream I have includes you, because you're not just my present happiness - you're my forever. Let's make all these dreams come true together! 🌟💕"
    },
    {
      id: 4,
      title: "What Makes You Special",
      hint: "What makes you unique?",
      password: "special",
      content: "You are special in so many ways that sometimes I wonder how I got so lucky. Your kindness, your sense of humor, the way you listen to me, your passion for life, and your beautiful heart make you absolutely incredible. You see the world in such a unique way, and you make me want to be a better person every day. You're not just special to me - you're extraordinary in every sense of the word. 🌟💖"
    },
    {
      id: 5,
      title: "Three Months and Forever",
      hint: "What's our promise?",
      password: "forever",
      content: "Three months ago, you walked into my life and changed everything. These have been the most wonderful three months of my life, filled with love, laughter, and countless beautiful memories. But this is just the beginning of our story. I promise to love you not just for three months, but for three years, three decades, and beyond. You have my heart forever, and I can't wait to see what the rest of our love story holds. Here's to forever with you! 💕♾️"
    }
  ];

  const [passwordInput, setPasswordInput] = useState('');
  const [attemptingUnlock, setAttemptingUnlock] = useState<number | null>(null);
  const [wrongPassword, setWrongPassword] = useState(false);

  const handleUnlockAttempt = (noteId: number) => {
    const note = loveNotes.find(n => n.id === noteId);
    if (note && passwordInput.toLowerCase() === note.password) {
      setUnlockedNotes([...unlockedNotes, noteId]);
      setAttemptingUnlock(null);
      setPasswordInput('');
      setWrongPassword(false);
    } else {
      setWrongPassword(true);
      setTimeout(() => setWrongPassword(false), 2000);
    }
  };

  const isUnlocked = (noteId: number) => unlockedNotes.includes(noteId);

  return (
    <div className="p-6 space-y-6">
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
        <h1 className="text-2xl text-gray-300">Hidden Love Notes</h1>
      </div>

      {/* Instructions */}
      <Card className="p-4 bg-gray-800">
        <div className="flex items-start space-x-3">
          <Heart className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-gray-300 text-sm">
              I've hidden special love notes for you! Use the hints to guess the passwords and unlock each note.
              Each one contains a piece of my heart.
            </p>
          </div>
        </div>
      </Card>

      {/* Love Notes */}
      <div className="space-y-4">
        {loveNotes.map((note) => (
          <Card key={note.id} className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-300 font-bold">{note.title}</h3>
                {isUnlocked(note.id) ? (
                  <Unlock className="w-5 h-5 text-green-500" />
                ) : (
                  <Lock className="w-5 h-5 text-gray-400" />
                )}
              </div>

              {!isUnlocked(note.id) && (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 italic">{note.hint}</p>

                  {attemptingUnlock === note.id ? (
                    <div className="space-y-3">
                      <input
                        type="password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        placeholder="Enter password..."
                        className={`w-full p-3 border rounded-lg ${wrongPassword ? 'border-red-300 bg-red-50' : 'border-gray-700'
                          }`}
                        onKeyPress={(e) => e.key === 'Enter' && handleUnlockAttempt(note.id)}
                      />
                      {wrongPassword && (
                        <p className="text-red-500 text-sm">Wrong password! Try again.</p>
                      )}
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleUnlockAttempt(note.id)}
                          size="sm"
                          className="bg-gray-300 hover:bg-gray-700"
                        >
                          Unlock
                        </Button>
                        <Button
                          onClick={() => {
                            setAttemptingUnlock(null);
                            setPasswordInput('');
                            setWrongPassword(false);
                          }}
                          size="sm"
                          variant="outline"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      onClick={() => setAttemptingUnlock(note.id)}
                      size="sm"
                      variant="outline"
                      className="w-full"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Try to Unlock
                    </Button>
                  )}
                </div>
              )}

              {isUnlocked(note.id) && (
                <div className="space-y-3">
                  <Button
                    onClick={() => setSelectedNote(note.id)}
                    className="w-full bg-green-500 hover:bg-green-600"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Read Love Note
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Progress */}
      <Card className="p-4 bg-gray-300">
        <div className="text-center space-y-2">
          <p className="text-gray-800 font-bold">
            Notes Unlocked: {unlockedNotes.length}/{loveNotes.length}
          </p>
          <div className="w-full bg-gray-300 rounded-full h-2">
            <div
              className="bg-gray-800 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(unlockedNotes.length / loveNotes.length) * 100}%` }}
            ></div>
          </div>
          {unlockedNotes.length === loveNotes.length && (
            <p className="text-gray-800 text-sm font-bold mt-2">
              You've found all my love notes!
            </p>
          )}
        </div>
      </Card>

      {/* Love Note Modal */}
      {selectedNote && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedNote(null)}
        >
          <Card className="max-w-sm w-full p-6 max-h-96 overflow-y-auto">
            <div className="space-y-4">
              <div className="text-center">
                <Heart className="w-8 h-8 text-pink-500 mx-auto mb-2" />
                <h3 className="text-xl text-gray-800">
                  {loveNotes.find(n => n.id === selectedNote)?.title}
                </h3>
              </div>
              <div className="prose prose-sm">
                <p className="text-gray-700 leading-relaxed">
                  {loveNotes.find(n => n.id === selectedNote)?.content}
                </p>
              </div>
              <Button
                onClick={() => setSelectedNote(null)}
                className="w-full bg-pink-500 hover:bg-pink-600"
              >
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}