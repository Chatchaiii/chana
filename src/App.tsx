import React, { useState } from 'react';
import { Homepage } from './components/Homepage';
import { Timeline } from './components/Timeline';
import { Scrapbook } from './components/Scrapbook';
import { LoveQuiz } from './components/LoveQuiz';
import { CountUp } from './components/CountUp';
import { LoveNote } from './components/LoveNote';
import { PasswordProtection } from './components/PasswordProtection';
import { GiftBox } from './components/GiftBox';
import { LoveMap } from './components/LoveMap';
import { User } from './components/User';

export type FeatureType = 'home' | 'timeline' | 'scrapbook' | 'quiz' | 'countup' | 'note' | 'password' | 'gifts' | 'map' | 'user';

export default function App() {
  const [currentFeature, setCurrentFeature] = useState<FeatureType>('password');

  return (
    <div className="dark min-h-screen bg-gray-900">
      <div className="mx-auto min-h-screen bg-background shadow-xl">

        {/* Pre-mount everything */}
        <div style={{ display: currentFeature === 'home' ? 'block' : 'none' }}>
          <Homepage onNavigate={setCurrentFeature} />
        </div>

        <div style={{ display: currentFeature === 'timeline' ? 'block' : 'none' }}>
          <Timeline onBack={() => setCurrentFeature('home')} />
        </div>

        <div style={{ display: currentFeature === 'scrapbook' ? 'block' : 'none' }}>
          <Scrapbook onBack={() => setCurrentFeature('home')} />
        </div>

        <div style={{ display: currentFeature === 'quiz' ? 'block' : 'none' }}>
          <LoveQuiz onBack={() => setCurrentFeature('home')} />
        </div>

        <div style={{ display: currentFeature === 'countup' ? 'block' : 'none' }}>
          <CountUp onBack={() => setCurrentFeature('home')} />
        </div>

        <div style={{ display: currentFeature === 'note' ? 'block' : 'none' }}>
          <LoveNote onBack={() => setCurrentFeature('home')} />
        </div>

        <div style={{ display: currentFeature === 'password' ? 'block' : 'none' }}>
          <PasswordProtection onBack={() => setCurrentFeature('home')} />
        </div>

        <div style={{ display: currentFeature === 'gifts' ? 'block' : 'none' }}>
          <GiftBox onBack={() => setCurrentFeature('home')} />
        </div>

        <div style={{ display: currentFeature === 'map' ? 'block' : 'none' }}>
          <LoveMap onBack={() => setCurrentFeature('home')} />
        </div>
        
        <div style={{ display: currentFeature === 'user' ? 'block' : 'none' }}>
          <User onBack={() => setCurrentFeature('home')} />
        </div>
      </div>
    </div>
  );
}