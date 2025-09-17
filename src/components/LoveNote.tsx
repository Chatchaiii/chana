import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Heart, Lock, Unlock, Eye } from 'lucide-react';

// text imports (same as yours)
import guelues from '../assets/text/notes/guelues.md?raw';
import el from '../assets/text/notes/milyarca/el.md?raw';
import goez from '../assets/text/notes/milyarca/goez.md?raw';
import gueluemseme from '../assets/text/notes/milyarca/gueluemseme.md?raw';
import hayat from '../assets/text/notes/milyarca/hayat.md?raw';
import kahkaha from '../assets/text/notes/milyarca/kahkaha.md?raw';
import kalp from '../assets/text/notes/milyarca/kalp.md?raw';
import ask from '../assets/text/notes/ask.md?raw';
import her_zaman from '../assets/text/notes/her_zaman.md?raw';
import kal_boeyle from '../assets/text/notes/kal_boeyle.md?raw';
import oezel from '../assets/text/notes/oezel.md?raw';
import { motion } from 'framer-motion';

interface LoveNoteProps {
  onBack: () => void;
}

export function LoveNote({ onBack }: LoveNoteProps) {
  const [unlockedNotes, setUnlockedNotes] = useState<number[]>([]);
  const [selectedNote, setSelectedNote] = useState<number | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [attemptingUnlock, setAttemptingUnlock] = useState<number | null>(null);
  const [wrongPassword, setWrongPassword] = useState(false);

  // --- Swipe detection ---
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX;
    if (diffX > 100) {
      // onBack();
    }
    setTouchStartX(null);
  };

  const loveNotes = [
    { id: 1, title: "Gülüş", hint: "Your ... lights up my world?", password: "smile", content: guelues },
    { id: 2, title: "Milyarca", hint: "", password: "million", content: el + goez + gueluemseme + hayat + kahkaha + kalp },
    { id: 3, title: "Aşk", hint: "I ... you", password: "love", content: ask },
    { id: 4, title: "Her Zaman", hint: "You are my ...", password: "always", content: her_zaman },
    { id: 5, title: "Kal Böyle", hint: "Please ... with me.", password: "stay", content: kal_boeyle },
    { id: 6, title: "Özel", hint: "You are ... to me.", password: "special", content: oezel },
  ];

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
    <div
      className="mt-16 p-6 space-y-6"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Instructions */}
      <Card className="p-4 bg-gray-800">
        <div className="flex items-start space-x-3">
          <Heart className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
          <p className="text-gray-300 text-sm">
            I've hidden special love notes for you! Use the hints to guess the passwords and unlock each note.
          </p>
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
                  <Unlock className="w-5 h-5 text-pink-500" />
                ) : (
                  <Lock className="w-5 h-5 text-gray-400" />
                )}
              </div>

              {!isUnlocked(note.id) && (
                <div className="space-y-3">
                  {note.hint && <p className="text-sm text-gray-500 italic">{note.hint}</p>}
                  {attemptingUnlock === note.id ? (
                    <div className="space-y-3">
                      <input
                        type="password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        placeholder="Enter password..."
                        className={`w-full p-3 border rounded-lg bg-gray-800 ${wrongPassword ? 'border-red-400' : 'border-gray-700'}`}
                        onKeyDown={(e) => e.key === 'Enter' && handleUnlockAttempt(note.id)}
                      />
                      {wrongPassword && <p className="text-red-500 text-sm">Wrong password 😛 Try again.</p>}
                      <div className="flex space-x-2">
                        <Button onClick={() => handleUnlockAttempt(note.id)} size="sm" className="bg-gray-300 hover:bg-gray-700">
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
                    <Button onClick={() => setAttemptingUnlock(note.id)} size="sm" variant="outline" className="w-full">
                      <Lock className="w-4 h-4 mr-1" /> Try to Unlock
                    </Button>
                  )}
                </div>
              )}

              {isUnlocked(note.id) && (
                <Button
                  onClick={() => setSelectedNote(note.id)}
                  className="w-full font-bold text-white bg-pink-500 hover:bg-pink-600"
                >
                  <Eye className="w-4 h-4" /> Read Note
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Progress */}
      <Card className="mb-16 p-4 bg-pink-600">
        <div className="text-center space-y-2">
          <p className="text-gray-200 font-bold">
            Notes Unlocked: {unlockedNotes.length}/{loveNotes.length}
          </p>
          <div className="w-full bg-pink-600 rounded-full h-2">
            <div
              className="bg-gray-200 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(unlockedNotes.length / loveNotes.length) * 100}%` }}
            />
          </div>
          {unlockedNotes.length === loveNotes.length && (
            <p className="text-gray-800 text-sm font-bold mt-2">You've found all my love notes!</p>
          )}
        </div>
      </Card>

      {/* Love Note Modal */}
      {selectedNote && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedNote(null)}
        >
          <Card
            className="max-w-sm w-full p-6 max-h-96 overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // prevent accidental close
          >
            <div className="space-y-4">
              <div className="text-center">
                <Heart className="w-8 h-8 text-pink-500 mx-auto mb-2" />
                <h3 className="text-xl text-gray-300 font-bold">
                  {loveNotes.find(n => n.id === selectedNote)?.title}
                </h3>
              </div>
              <div className="prose prose-sm text-gray-400 leading-relaxed">
                <ReactMarkdown>
                  {loveNotes.find(n => n.id === selectedNote)?.content || ""}
                </ReactMarkdown>
              </div>
              <Button onClick={() => setSelectedNote(null)} className="w-full bg-pink-500 hover:bg-pink-600">
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}