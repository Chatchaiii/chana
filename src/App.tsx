import React, { useState, useEffect } from 'react';
import { Homepage } from './components/Homepage';
import { Timeline } from './components/Timeline';
import { Scrapbook } from './components/Scrapbook';
import { LoveQuiz } from './components/LoveQuiz';
import { CountUp } from './components/CountUp';
import { LoveNote } from './components/LoveNote';
import Parallax from './components/Collection';
import { LoveMap } from './components/LoveMap';
import { User } from './components/User';
import { Top } from './components/Top';
import { Bottom } from './components/Bottom';
import {
  House,
  Clock4,
  Camera,
  Brain,
  Heart,
  Mail,
  Map,
  Users,
  Lock,
  Library,
} from 'lucide-react';

export type FeatureType = 'home' | 'timeline' | 'scrapbook' | 'quiz' | 'countup' | 'note' | 'collection' | 'map' | 'user';

const featureIconMap: Record<FeatureType, React.ElementType> = {
  home: House,
  timeline: Clock4,
  scrapbook: Camera,
  quiz: Brain,
  countup: Heart,
  note: Mail,
  collection: Library,
  map: Map,
  user: Users,
};

export default function App() {
  const [currentFeature, setCurrentFeature] = useState<FeatureType>('home');

  // Scroll to top on feature change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentFeature]);

  // Handler for floating back button
  const onBack = () => setCurrentFeature('home');

  const FeatureIcon = featureIconMap[currentFeature];

  const featureDisplayName = (() => {
    switch (currentFeature) {
      case "home": return "Home";
      case "timeline": return "Timeline";
      case "scrapbook": return "Scrapbook";
      case "quiz": return "Quiz";
      case "countup": return "Count-Up";
      case "note": return "Hidden Notes";
      case "collection": return "Collection";
      case "map": return "Map";
      case "user": return "User";
      default: return "";
    }
  })();

  // Function to render the current feature component
  const renderFeature = () => {
    switch (currentFeature) {
      case 'home':
        return <Homepage onNavigate={setCurrentFeature} />;
      case 'timeline':
        return <Timeline onBack={() => setCurrentFeature('home')} />;
      case 'scrapbook':
        return <Scrapbook onBack={() => setCurrentFeature('home')} />;
      case 'countup':
        return <CountUp onBack={() => setCurrentFeature('home')} />;
      case 'collection':
        return <Parallax />;
      case 'map':
        return <LoveMap onBack={() => setCurrentFeature('home')} />;
      case 'user':
        return <User onBack={() => setCurrentFeature('home')} />;
      default:
        return null;
    }
  };

  return (
    <div className="dark min-h-screen"
      style={{
        background: "#0A0A0A",
      }}
    >
      <div className="mx-auto min-h-screen"
        style={{
          background: "#0A0A0A",
        }}
      >
        {renderFeature()}

        {/* Keep rendered */}
        <div style={{ display: currentFeature === 'note' ? 'block' : 'none' }}>
          <LoveNote onBack={() => setCurrentFeature('home')} />
        </div>

        <div style={{ display: currentFeature === 'quiz' ? 'block' : 'none' }}>
          <LoveQuiz onBack={() => setCurrentFeature('home')} />
        </div>

        {/* Top-Bar when screen != password */}
        <div>
          <Top onNavigate={setCurrentFeature} />
        </div>

        {/* Bottom-Bar when screen != password && != home*/}
        <div style={{ display: currentFeature !== 'home' ? 'block' : 'none' }}>
          <Bottom
            onNavigate={setCurrentFeature}
            featureDisplayName={featureDisplayName}
            FeatureIcon={FeatureIcon}
          />
        </div>
      </div>
    </div>
  );
}