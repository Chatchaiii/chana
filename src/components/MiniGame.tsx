import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Heart, RotateCcw, Trophy, Star } from 'lucide-react';

interface MiniGameProps {
  onBack: () => void;
}

export function MiniGame({ onBack }: MiniGameProps) {
  const [gameType, setGameType] = useState<'menu' | 'memory' | 'match'>('menu');
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');

  // Memory Game State
  const [cards, setCards] = useState<Array<{ id: number; emoji: string; isFlipped: boolean; isMatched: boolean }>>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  // Match Game State
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [matchScore, setMatchScore] = useState(0);

  const loveEmojis = ['💕', '💖', '💝', '💗', '💓', '💘', '🥰', '😍'];
  
  const matchQuestions = [
    {
      question: "What do I love most about you?",
      options: ["Your smile", "Your eyes", "Your laugh", "All of the above"],
      correct: 3
    },
    {
      question: "Our perfect date would be:",
      options: ["Movie night", "Romantic dinner", "Adventure trip", "Cozy home time"],
      correct: 3
    },
    {
      question: "What makes our relationship special?",
      options: ["Trust", "Communication", "Love", "Everything together"],
      correct: 3
    }
  ];

  // Initialize Memory Game
  const initializeMemoryGame = () => {
    const gameEmojis = loveEmojis.slice(0, 6);
    const gameCards = [...gameEmojis, ...gameEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false
      }));
    setCards(gameCards);
    setFlippedCards([]);
    setMoves(0);
    setGameState('playing');
    setGameType('memory');
  };

  // Initialize Match Game
  const initializeMatchGame = () => {
    setCurrentQuestion(0);
    setMatchScore(0);
    setGameState('playing');
    setGameType('match');
  };

  // Memory Game Logic
  const handleCardFlip = (cardId: number) => {
    if (flippedCards.length === 2 || cards[cardId].isFlipped || cards[cardId].isMatched) return;

    const newCards = cards.map(card =>
      card.id === cardId ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);
    setFlippedCards([...flippedCards, cardId]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves(moves + 1);
      const [first, second] = flippedCards;
      
      if (cards[first].emoji === cards[second].emoji) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map(card =>
            card.id === first || card.id === second
              ? { ...card, isMatched: true }
              : card
          ));
          setFlippedCards([]);
          
          // Check if game is won
          const newCards = cards.map(card =>
            card.id === first || card.id === second
              ? { ...card, isMatched: true }
              : card
          );
          if (newCards.every(card => card.isMatched)) {
            setGameState('won');
            setScore(Math.max(0, 100 - moves * 5));
          }
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(card =>
            card.id === first || card.id === second
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards, moves]);

  // Match Game Logic
  const handleMatchAnswer = (answerIndex: number) => {
    if (answerIndex === matchQuestions[currentQuestion].correct) {
      setMatchScore(matchScore + 1);
    }
    
    if (currentQuestion < matchQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setGameState('won');
      setScore(Math.round((matchScore / matchQuestions.length) * 100));
    }
  };

  const resetGame = () => {
    setGameType('menu');
    setScore(0);
    setGameState('playing');
  };

  // Game Menu
  if (gameType === 'menu') {
    return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button onClick={onBack} variant="ghost" size="sm">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl text-indigo-600">Mini-Games</h1>
        </div>

        {/* Game Selection */}
        <div className="space-y-4">
          <h2 className="text-gray-700 text-center">Choose a Love Game!</h2>
          
          <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={initializeMemoryGame}>
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-gray-800 mb-2">Love Memory Game</h3>
                <p className="text-sm text-gray-600">
                  Match pairs of love emojis! Test your memory and create beautiful matches just like we did! 💕
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={initializeMatchGame}>
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-gray-800 mb-2">Love Match Quiz</h3>
                <p className="text-sm text-gray-600">
                  Answer questions about our love! Show how well you know what makes our relationship special! ⭐
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Love Note */}
        <Card className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
          <div className="text-center space-y-2">
            <Heart className="w-6 h-6 text-indigo-600 mx-auto" />
            <p className="text-indigo-800 text-sm">
              Playing games together is just another way to have fun and create memories! 
              Even in games, everything is better with you! 🎮💕
            </p>
          </div>
        </Card>
      </div>
    );
  }

  // Memory Game
  if (gameType === 'memory') {
    return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button onClick={resetGame} variant="ghost" size="sm">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl text-pink-600">Love Memory</h1>
          </div>
          <Button onClick={initializeMemoryGame} variant="ghost" size="sm">
            <RotateCcw className="w-5 h-5" />
          </Button>
        </div>

        {/* Game Stats */}
        <div className="flex justify-between text-sm text-gray-600">
          <span>Moves: {moves}</span>
          <span>Matches: {cards.filter(c => c.isMatched).length / 2}/{cards.length / 2}</span>
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-4 gap-3">
          {cards.map((card) => (
            <Card
              key={card.id}
              className={`aspect-square flex items-center justify-center cursor-pointer transition-all ${
                card.isMatched ? 'bg-green-100 border-green-300' :
                card.isFlipped ? 'bg-pink-100 border-pink-300' : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => handleCardFlip(card.id)}
            >
              <span className="text-2xl">
                {card.isFlipped || card.isMatched ? card.emoji : '💝'}
              </span>
            </Card>
          ))}
        </div>

        {/* Win Screen */}
        {gameState === 'won' && (
          <Card className="p-6 bg-gradient-to-r from-pink-50 to-purple-50 border-pink-300">
            <div className="text-center space-y-4">
              <Trophy className="w-12 h-12 text-yellow-500 mx-auto" />
              <div>
                <h2 className="text-xl text-gray-800 mb-2">Congratulations!</h2>
                <p className="text-gray-600">You matched all the love emojis!</p>
                <p className="text-pink-600">Score: {score} points</p>
              </div>
              <div className="space-y-2">
                <Button onClick={initializeMemoryGame} className="w-full bg-pink-500 hover:bg-pink-600">
                  Play Again
                </Button>
                <Button onClick={resetGame} variant="outline" className="w-full">
                  Back to Games
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    );
  }

  // Match Quiz Game
  if (gameType === 'match') {
    if (gameState === 'won') {
      return (
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center space-x-4">
            <Button onClick={resetGame} variant="ghost" size="sm">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl text-blue-600">Quiz Results</h1>
          </div>

          <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300">
            <div className="text-center space-y-4">
              <Star className="w-12 h-12 text-yellow-500 mx-auto" />
              <div>
                <h2 className="text-xl text-gray-800 mb-2">Love Quiz Complete!</h2>
                <p className="text-gray-600">You answered {matchScore}/{matchQuestions.length} correctly!</p>
                <p className="text-blue-600">Score: {score}%</p>
              </div>
              <div className="space-y-2">
                <Button onClick={initializeMatchGame} className="w-full bg-blue-500 hover:bg-blue-600">
                  Play Again
                </Button>
                <Button onClick={resetGame} variant="outline" className="w-full">
                  Back to Games
                </Button>
              </div>
            </div>
          </Card>
        </div>
      );
    }

    return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button onClick={resetGame} variant="ghost" size="sm">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl text-blue-600">Love Match Quiz</h1>
          </div>
          <span className="text-sm text-gray-500">
            {currentQuestion + 1}/{matchQuestions.length}
          </span>
        </div>

        {/* Question */}
        <Card className="p-6 space-y-6">
          <div className="text-center">
            <h2 className="text-lg text-gray-800 mb-6">
              {matchQuestions[currentQuestion].question}
            </h2>
          </div>

          <div className="space-y-3">
            {matchQuestions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleMatchAnswer(index)}
                variant="outline"
                className="w-full p-4 text-left justify-start hover:bg-blue-50"
              >
                {option}
              </Button>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  return null;
}