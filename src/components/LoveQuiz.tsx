import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Heart, CheckCircle, XCircle, RotateCw, House } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoveQuizProps {
  onBack: () => void;
}

export function LoveQuiz({ onBack }: LoveQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const questions = [
    {
      question: "What's my favorite color?",
      options: ["Blue", "Grey", "Green", "Purple"],
      correct: 1,
      explanation: "You always notice how much I love grey."
    },
    {
      question: "What's our favorite place to go together?",
      options: ["Coffee shop", "Park", "Beach", "Movies"],
      correct: 0,
      explanation: "Our coffee dates are the best."
    },
    {
      question: "What's my biggest dream?",
      options: ["Travel the world", "Start a business", "Write a book", "Learn to paint"],
      correct: 0,
      explanation: "You remember I want to explore every corner of the world with you."
    },
    {
      question: "What makes me laugh the most?",
      options: ["Your jokes", "Funny movies", "Our German jokes", "Our inside jokes"],
      correct: 2,
      explanation: "You always get me with those silly German jokes."
    },
    {
      question: "What's my love language?",
      options: ["Words of affirmation", "Quality time", "Physical touch", "Acts of service"],
      correct: 1,
      explanation: "Spending quality time together means everything to me."
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    if (answered) return;
    setSelectedAnswer(answerIndex);
    setAnswered(true);
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return "Perfect! You know me so well!";
    if (percentage >= 80) return "Amazing! We're so connected!";
    if (percentage >= 60) return "Pretty good! We're learning about each other!";
    return "We have so much more to discover about each other!";
  };

  // --- Swipe handling ---
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX;
    if (diffX > 100) {
      // onBack(); // swipe right → back
    } else if (diffX < -100 && answered) {
      // handleNext(); // swipe left → next if answered
    }
    setTouchStartX(null);
  };

  if (showResult) {
    return (
      <div className="p-6 space-y-6" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        {/* Header */}
        {/* <motion.div
          drag
          dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
          dragElastic={0.2}
          whileHover={{
            scale: [null, 1.01, null],
            transition: {
              duration: 0.3,
              times: [0, 0.6, 1],
              ease: ["easeInOut", "easeOut"],
            },
          }}
          whileTap={{ scale: 0.98 }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
        >
          <div className="grid grid-cols-1 items-center select-none">
            <Card className="border border-8">
              <Button
                onClick={onBack}
                variant="none"
                size="sm"
                className="flex items-center justify-start w-full p-6 rounded-lg cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5 text-gray-200" />
              <span className="ml-4 text-2xl text-gray-200 font-bold">Quiz</span>
              </Button>
            </Card>
          </div>
        </motion.div> */}

        {/* Results */}
        <Card className="p-6 text-center space-y-6">
          <div className="space-y-4">
            <Heart className="w-16 h-16 text-pink-500 mx-auto" />
            <div>
              <h2 className="text-3xl text-gray-200 mb-5 font-bold">{score}/{questions.length}</h2>
              <p className="text-gray-200 font-bold">{getScoreMessage()}</p>
            </div>
          </div>

          <div className="space-y-3">
            <Button onClick={resetQuiz} className="font-bold text-white w-full bg-pink-500 hover:bg-pink-600">
              <RotateCw className="w-5 h-5 inline" />
              <div>Take Quiz Again</div>
            </Button>
            <Button onClick={onBack} variant="outline" className="w-full">
              <House className="w-5 h-5 inline" />
              <div>Back to Home</div>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div
      className="p-6 space-y-6"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        {/* <motion.div
          drag
          dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
          dragElastic={0.2}
          whileHover={{
            scale: [null, 1.03, null],
            transition: {
              duration: 0.3,
              times: [0, 0.6, 1],
              ease: ["easeInOut", "easeOut"],
            },
          }}
          whileTap={{ scale: 0.98 }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
        >
          <div className="grid grid-cols-1 items-center select-none">
            <Card className="border border-8">
              <Button
                onClick={onBack}
                variant="none"
                size="sm"
                className="flex items-center justify-start w-full p-6 rounded-lg cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5 text-gray-200" />
              <span className="ml-4 text-2xl text-gray-200 font-bold">Quiz</span>
              </Button>
            </Card>
          </div>
        </motion.div> */}
        <div className="text-sm text-gray-500">
          {currentQuestion + 1}/{questions.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-900 rounded-full h-2">
        <div
          className="bg-pink-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <Card className="p-6 space-y-6">
        <div className="text-center">
          <h2 className="mt-5 text-xl text-gray-200">{questions[currentQuestion].question}</h2>
        </div>

        {/* Answer Options */}
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => {
            let buttonClass =
              "w-full p-6 text-left border rounded-lg transition-colors";

            if (answered) {
              if (index === questions[currentQuestion].correct) {
                buttonClass += "bg-green-100 border-green-100 text-green-800";
              } else if (index === selectedAnswer) {
                buttonClass += "bg-red-100 border-red-100 text-red-800";
              } else {
                buttonClass += "bg-gray-900 border-gray-900 text-gray-300";
              }
            } else {
              buttonClass += "hover:bg-gray-700 border-gray-900";
            }

            return (
              <Button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={buttonClass}
                disabled={answered}
                variant="ghost"
              >
                <div className="flex items-center justify-between w-full">
                  <span>{option}</span>
                  {answered && index === questions[currentQuestion].correct && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                  {answered &&
                    index === selectedAnswer &&
                    index !== questions[currentQuestion].correct && (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                </div>
              </Button>
            );
          })}
        </div>

        {/* Explanation */}
        {answered && (
          <Card className="p-4 bg-gray-800 border-gray-800">
            <p className="text-gray-300 text-sm">
              {questions[currentQuestion].explanation}
            </p>
          </Card>
        )}

        {/* Next Button */}
        {answered && (
          <Button
            onClick={handleNext}
            className="w-full bg-pink-500 hover:bg-pink-400 text-white font-bold"
          >
            {currentQuestion < questions.length - 1
              ? "Next Question"
              : "See Results"}
          </Button>
        )}
      </Card>
    </div>
  );
}