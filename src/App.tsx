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
import { Top } from './components/Top';
import { motion, scale, styleEffect } from 'framer-motion';
import { Card } from './components/ui/card';
import { 
ArrowLeft,
House,
Clock4,
Camera,
Brain,
Heart,
Mail,
Map,
Users,
Lock,
Gift,
} from 'lucide-react';

export type FeatureType = 'home' | 'timeline' | 'scrapbook' | 'quiz' | 'countup' | 'note' | 'password' | 'gifts' | 'map' | 'user';

const featureIconMap: Record<FeatureType, React.ElementType> = {
  home: House,
  timeline: Clock4,
  scrapbook: Camera,
  quiz: Brain,
  countup: Heart,
  note: Mail,
  password: Lock,
  gifts: Gift,
  map: Map,
  user: Users,
};

export default function App() {
  const [currentFeature, setCurrentFeature] = useState<FeatureType>('password');

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
    case "password": return "Password";
    case "gifts": return "Gifts";
    case "map": return "Map";
    case "user": return "User";
    default: return "";
  }
  })();

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

        <div style={{ 
          display: currentFeature !== 'password' ? 'block' : 'none'
        }}>
          <Top onNavigate={setCurrentFeature} />
        </div>

        <div style={{ 
          display: currentFeature !== 'password' && currentFeature !== 'home' ? 'block' : 'none'
        }}>
          {/* Dimming overlay for bottom of screen */}
          <div
            className="pointer-events-none fixed left-0 right-0 bottom-0 z-[40]"
            style={{
              height: "100px",
              // Gradient for color dimming
              background: "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(10, 10, 10, 1) 100%)",
              // Gradient for blur using mask-image (Webkit for Chrome/Safari, mask for Firefox)
              WebkitMaskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0,0,0,1) 100%)",
              maskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0,0,0,1) 100%)",
              backdropFilter: "blur(5px)",
              transition: "background 0.3s",
            }}
          />
          <div className="fixed flex-col-2 select-none">
            <motion.div
              drag
              dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
              dragElastic={0.2}
              className="fixed left-auto right-3 z-[50]"
              whileHover={{
                scale: [null, 1.01, null],
                transition: {
                  duration: 0.3,
                  times: [0, 0.6, 1],
                  ease: ["easeInOut", "easeOut"],
                },
              }}
              whileTap={{ scale: 0.90 }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
              style={{
                bottom: "20px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                pointerEvents: "auto",
                backdropFilter: "blur(5px)",
                background: "rgba(217,217,217,0.3)",
                borderTopLeftRadius: "3.4rem",
                borderTopRightRadius: "3.4rem",
                borderBottomLeftRadius: "3.4rem",
                borderBottomRightRadius: "3.4rem",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Card className="w-full border border-transparent bg-transparent shadow-none">
                <div
                  onClick={onBack}
                  className="p-4 w-full cursor-pointer"
                >
                  <ArrowLeft className="ml-2 mr-2 w-5 h-5 text-gray-200" />
                </div>
              </Card>
            </motion.div>
            <motion.div
              drag
              dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
              dragElastic={0.2}
              className="fixed left-3 right-auto z-[50]"
              whileHover={{
                scale: [null, 1.01, null],
                transition: {
                  duration: 0.3,
                  times: [0, 0.6, 1],
                  ease: ["easeInOut", "easeOut"],
                },
              }}
              whileTap={{ scale: 0.90 }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
              style={{
                bottom: "20px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                pointerEvents: "auto",
                backdropFilter: "blur(5px)",
                background: "rgba(24,24,27,0.3)",
                borderTopLeftRadius: "3.4rem",
                borderTopRightRadius: "3.4rem",
                borderBottomLeftRadius: "3.4rem",
                borderBottomRightRadius: "3.4rem",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Card className="w-full border border-transparent bg-transparent shadow-none flex items-center">
                <h2 
                  className="flex items-center justify-center p-4 w-full cursor-pointer font-bold text-lg"
                  style={{ width: "200px" }}
                >
                  {FeatureIcon && <FeatureIcon className="w-5 h-5 mr-5" />}
                  {featureDisplayName}
                </h2>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}