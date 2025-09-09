import the_start from '../assets/text/the_start/the_start.md?raw';
import sushi from '../assets/images/the_start/sushi.jpg';
import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Heart, Star, Calendar, Waves, VenetianMask, Camera } from 'lucide-react';

interface TimelineProps {
  onBack: () => void;
}

interface BlogPostBlockProps {
  title: string;
  date: string;
  text: string;
  imageUrl: string;
  icon: React.ElementType;
}

const blogPosts: BlogPostBlockProps[] = [
  {
    title: "The Start",
    date: "06.06.2025",
    text: the_start,
    imageUrl: sushi,
    icon: Star,
  },
  {
    title: "The Lake",
    date: "09.06.2025",
    text: "One of my core memories of us would be this day.\nWe laughed, we swam, and the world felt still.",
    imageUrl: "https://placekitten.com/601/350",
    icon: Waves,
  },
  {
    title: "Theatre",
    date: "18.06.2025",
    text: "God, was I nervous to see your theatre. But you shined on stage.",
    imageUrl: "https://placekitten.com/602/350",
    icon: VenetianMask,
  },
  {
    title: "Wannsee",
    date: "26.06.2025",
    text: "The weather first had different plans for us. It was rainy, it was windy, it was cloudy - like a storm.",
    imageUrl: "https://placekitten.com/603/350",
    icon: Waves,
  },
  {
    title: "Photo-booth",
    date: "05.07.2025",
    text: "I may acted like it was a normal day, but I was excited as fuck.",
    imageUrl: "https://placekitten.com/604/350",
    icon: Camera,
  },
  {
    title: "Flight",
    date: "Today",
    text: "Celebrating our beautiful journey and looking forward to more.",
    imageUrl: "https://placekitten.com/605/350",
    icon: Calendar,
  },
];

function BlogPostBlock({ title, date, text, imageUrl, icon: Icon }: BlogPostBlockProps) {
  return (
    <Card className="space-y-2 bg-gray-800 rounded-xl shadow-lg p-6 max-w-2xl mx-auto my-8">
      <div className="flex items-center mb-4 space-x-3">
        {/* <div className="p-2 rounded-full bg-gray-600 text-white">
          <Icon className="w-6 h-4" />
        </div> */}
        <h2 className="text-2xl font-bold text-gray-100">{title}</h2>
        <span className="ml-auto text-sm text-gray-400">{date}</span>
      </div>
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <p className="text-gray-300 whitespace-pre-line">{text}</p>
    </Card>
  );
}

export function Timeline({ onBack }: TimelineProps) {
  return (
    <div className="space-y-6 min-h-screen flex flex-col p-6 bg-gray-900">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8 bg-gray-900">
        <Button onClick={onBack} variant="" size="sm" className="rounded-full bg-grey-800 hover:bg-gray-700">
          <ArrowLeft className="w-5 h-5 bg-gray-900 text-gray-300" />
        </Button>
        <h1 className="text-2xl text-gray-300">Timeline</h1>
      </div>

      {/* Blog Posts */}
      <div className="space-y-6 flex-1">
        {blogPosts.map((post, idx) => (
          <BlogPostBlock key={idx} {...post} />
        ))}
      </div>

      {/* Love Quote
      <Card className="p-6 bg-gray-900 border-gray-900 mt-8">
        <div className="text-center space-y-2">
          <Heart className="w-8 h-8 text-gray-800 mx-auto" />
          <p className="text-gray-300 italic">
            "Every love story is beautiful, but ours is my favorite."
          </p>
        </div>
      </Card> */}
    </div>
  );
}


// ########################################

// import the_start from '../assets/text/the_start/the_start.md?raw';
// import React, { useState } from 'react';
// import { Card } from './ui/card';
// import { Button } from './ui/button';
// import { ArrowLeft, Heart, Star, Calendar, Waves, VenetianMask, Droplets, Camera } from 'lucide-react';

// interface TimelineProps {
//   onBack: () => void;
// }

// export function Timeline({ onBack }: TimelineProps) {
//   const milestones = [
//     {
//       date: "06.06.2025",
//       title: "The Start",
//       description: "Starting with June 6th, I've never expected us to come so far when looking back.",
//       text: the_start,
//       icon: Star,
//       color: "bg-gray-600"
//     },
//     {
//       date: "09.06.2025",
//       title: "The Lake",
//       description: "One of my core memories of us would be this day.",
//       text:"dsdsds",
//       icon: Waves,
//       color: "bg-gray-600"
//     },
//     {
//       date: "18.06.2025",
//       title: "Theatre",
//       description: "God, was I nervous to see your theatre.",
//       text:"dsdsds",
//       icon: VenetianMask,
//       color: "bg-gray-600"
//     },
//     {
//       date: "22.06.2025",
//       title: "The day",
//       description: "Nervous to speak, nervous to breathe, nervous to look at you.",
//       text:"dsdsds",
//       icon: Droplets,
//       color: "bg-gray-600"
//     },
//     {
//       date: "26.06.2025",
//       title: "Wannsee",
//       description: "The weather first had different plans for us. It was rainy, it was windy, it was cloudy - like a storm.",
//       text:"dsdsds",
//       icon: Waves,
//       color: "bg-gray-600"
//     },
//     {
//       date: "05.07.2025",
//       title: "Photo-booth",
//       description: "I may acted like it was a normal day, but I was excited as fuck.",
//       text:"dsdsds",
//       icon: Camera,
//       color: "bg-gray-600"
//     },
//     {
//       date: "Today",
//       title: "Flight",
//       description: "Celebrating our beautiful journey and looking forward to more",
//       text:"dsdsds",
//       icon: Calendar,
//       color: "bg-gray-600"
//     }
//   ];

//   // State for modal
//   const [selected, setSelected] = useState<null | number>(null);

//   // Example modal component
//   function Modal({ milestone, onClose }: { milestone: typeof milestones[0], onClose: () => void }) {
//     return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
//         <div className="bg-gray-800 rounded-lg p-6 max-w-sm w-full relative max-h-[90vh] overflow-y-auto">
//           <button
//             className="absolute top-0 right-1 text-gray-400 hover:text-gray-200"
//             onClick={onClose}
//             aria-label="Close"
//           >
//             ×
//           </button>
//           <div className="flex flex-col items-center space-y-4">
//             <img
//               src={milestone.title}
//               alt="error"
//               className="relative w60 h-60 mx-auto rounded-2xl overflow-hidden shadow-md text-gray-300"
//             />
//             <p className="text-gray-300 text-left whitespace-pre-line">
//               <b>{milestone.title}</b>.<br />
//               {milestone.text}
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex items-center space-x-4">
//         <Button onClick={onBack} variant="ghost" size="sm">
//           <ArrowLeft className="w-5 h-5" />
//         </Button>
//         <h1 className="text-2xl text-gray-300">Timeline</h1>
//       </div>
//       {/* Timeline */}
//       <div className="space-y-4">
//         {milestones.map((milestone, index) => (
//           <Card
//             key={index}
//             className="p-3 relative cursor-pointer hover:bg-gray-700 transition"
//             onClick={() => setSelected(index)}
//           >
//             <div className="flex items-start space-x-4">
//               <div className={`p-2 rounded-full ${milestone.color} text-white flex-shrink-0`}>
//                 <milestone.icon className="w-5 h-5" />
//               </div>
//               <div className="flex-1 space-y-2">
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-gray-200">{milestone.title}</h3>
//                   <span className="text-sm text-gray-400">{milestone.date}</span>
//                 </div>
//                 <p className="text-gray-300 text-sm leading-relaxed">
//                   {milestone.description}
//                 </p>
//               </div>
//             </div>
//           </Card>
//         ))}
//       </div>

//       {/* Love Quote */}
//       <Card className="p-6 bg-gray-900 border-gray-900">
//         <div className="text-center space-y-2">
//           <Heart className="w-8 h-8 text-gray-800 mx-auto" />
//           <p className="text-gray-300 italic">
//             "Every love story is beautiful, but ours is my favorite."
//           </p>
//         </div>
//       </Card>

//       {/* Modal */}
//       {selected !== null && (
//         <Modal
//           milestone={milestones[selected]}
//           onClose={() => setSelected(null)}
//         />
//       )}
//     </div>
//   );
// }