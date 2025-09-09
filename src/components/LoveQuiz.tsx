import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Heart, CheckCircle, XCircle } from 'lucide-react';

interface LoveQuizProps {
  onBack: () => void;
}

export function LoveQuiz({ onBack }: LoveQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

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
      options: ["Your jokes", "Funny movies", "Bin ich ein hurensohn?", "Our inside jokes"],
      correct: 2,
      explanation: "Nagut"
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
    if (percentage === 100) return "Perfect! You know me so well! 💕";
    if (percentage >= 80) return "Amazing! We're so connected! 💖";
    if (percentage >= 60) return "Pretty good! We're learning about each other! 💗";
    return "We have so much more to discover about each other! 💘";
  };

  if (showResult) {
    return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button onClick={onBack} variant="ghost" size="sm">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl text-gray-300">Quiz Results</h1>
        </div>

        {/* Results */}
        <Card className="p-6 text-center space-y-6">
          <div className="space-y-4">
            <Heart className="w-16 h-16 text-gray-400 mx-auto" />
            <div>
              <h2 className="text-3xl text-gray-200 mb-2">{score}/{questions.length}</h2>
              <p className="text-gray-300">{getScoreMessage()}</p>
            </div>
          </div>

          <div className="space-y-3">
            <Button onClick={resetQuiz} className="w-full bg-gray-100 hover:bg-gray-700">
              Take Quiz Again
            </Button>
            <Button onClick={onBack} variant="outline" className="w-full">
              Back to Home
            </Button>
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
          <Button
            onClick={onBack}
            variant=""
            size="sm"
            className="rounded-full bg-grey-800 hover:bg-gray-700"
          >
            <ArrowLeft className="w-5 h-5 bg-gray-900 text-gray-300" />
          </Button>
          <h1 className="text-2xl text-gray-300">Love Quiz</h1>
        </div>
        <div className="text-sm text-gray-500">
          {currentQuestion + 1}/{questions.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-900 rounded-full h-2">
        <div
          className="bg-gray-300 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question */}
      <Card className="p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-xl text-gray-200 mb-6">{questions[currentQuestion].question}</h2>
        </div>

        {/* Answer Options */}
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => {
            let buttonClass = "w-full p-4 text-left border rounded-lg transition-colors ";

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
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={buttonClass}
                disabled={answered}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {answered && index === questions[currentQuestion].correct && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                  {answered && index === selectedAnswer && index !== questions[currentQuestion].correct && (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
              </button>
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
          <Button onClick={handleNext} className="w-full bg-gray-100 hover:bg-gray-700">
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
          </Button>
        )}
      </Card>
    </div>
  );
}