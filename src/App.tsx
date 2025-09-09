import React, { useState } from 'react';
import { Homepage } from './components/Homepage';
import { Timeline } from './components/Timeline';
import { Scrapbook } from './components/Scrapbook';
import { LoveQuiz } from './components/LoveQuiz';
import { CountUp } from './components/CountUp';
import { LoveNote } from './components/LoveNote';
import { MusicPlayer } from './components/MusicPlayer';
import { GiftBox } from './components/GiftBox';
import { LoveMap } from './components/LoveMap';
import { MiniGame } from './components/MiniGame';

export type FeatureType = 'home' | 'timeline' | 'scrapbook' | 'quiz' | 'countup' | 'note' | 'music' | 'gifts' | 'map' | 'game';

export default function App() {
  const [currentFeature, setCurrentFeature] = useState<FeatureType>('home');

  const renderFeature = () => {
    switch (currentFeature) {
      case 'home':
        return <Homepage onNavigate={setCurrentFeature} />;
      case 'timeline':
        return <Timeline onBack={() => setCurrentFeature('home')} />;
      case 'scrapbook':
        return <Scrapbook onBack={() => setCurrentFeature('home')} />;
      case 'quiz':
        return <LoveQuiz onBack={() => setCurrentFeature('home')} />;
      case 'countup':
        return <CountUp onBack={() => setCurrentFeature('home')} />;
      case 'note':
        return <LoveNote onBack={() => setCurrentFeature('home')} />;
      case 'music':
        return <MusicPlayer onBack={() => setCurrentFeature('home')} />;
      case 'gifts':
        return <GiftBox onBack={() => setCurrentFeature('home')} />;
      case 'map':
        return <LoveMap onBack={() => setCurrentFeature('home')} />;
      case 'game':
        return <MiniGame onBack={() => setCurrentFeature('home')} />;
      default:
        return <Homepage onNavigate={setCurrentFeature} />;
    }
  };

  return (
    <div className="dark min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-md mx-auto min-h-screen bg-background shadow-xl">
        {renderFeature()}
      </div>
    </div>
  );
}