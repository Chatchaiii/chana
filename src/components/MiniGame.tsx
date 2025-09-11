import React, { useState, useRef, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft, ChevronRight, ChevronUp, User } from "lucide-react";

// Placeholder images
const placeholderImages = [
	"https://placekitten.com/400/250",
	"https://placekitten.com/401/250",
	"https://placekitten.com/402/250",
];

interface PersonBio {
	name: string;
	birthdate: string;
	description: string;
	likings: string[];
	habits: string[];
	slideshowImages?: string[]; // <-- new field for main slideshow
	blogPosts: {
		title: string;
		images: string[];
		text: string;
	}[];
}

const personA: PersonBio = {
	name: "Hannah Mohammadzadeh",
	birthdate: "23.06.2006",
	description: "A short description about Person A. Loves cats and coffee.",
	likings: ["Coffee", "Cats", "Reading", "Travel"],
	habits: ["Early riser", "Jogging", "Sketching"],
	slideshowImages: [
		"https://placekitten.com/410/250",
		"https://placekitten.com/411/250",
		"https://placekitten.com/412/250",
	],
	blogPosts: [
		{
			title: "A's Childhood",
			images: [placeholderImages[0], placeholderImages[1]],
			text: "A's childhood was full of adventures and laughter. Always curious and eager to learn new things.",
		},
		{
			title: "A's Favorite Place",
			images: [placeholderImages[2]],
			text: "The old library in the city center is A's favorite place to relax and read.",
		},
	],
};

const personB: PersonBio = {
	name: "Chatchai Kemal Bozkir",
	birthdate: "13.01.2007",
	description: "A short description about Person B. Enjoys music and hiking.",
	likings: ["Music", "Hiking", "Cooking", "Movies"],
	habits: ["Night owl", "Playing guitar", "Photography"],
	slideshowImages: [
		"https://placekitten.com/420/250",
		"https://placekitten.com/421/250",
		"https://placekitten.com/422/250",
	],
	blogPosts: [
		{
			title: "B's First Concert",
			images: [placeholderImages[1], placeholderImages[2]],
			text: "B's first concert was an unforgettable experience, sparking a lifelong love for music.",
		},
		{
			title: "B's Hiking Adventure",
			images: [placeholderImages[0]],
			text: "Climbing the mountain trail was tough, but the view from the top was worth every step.",
		},
	],
};

// Carousel component for blog post images
function ImageCarousel({ images }: { images: string[] }) {
	const [current, setCurrent] = useState(0);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const touchStartX = useRef<number | null>(null);

	useEffect(() => {
		if (images.length <= 1) return;
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => {
			setCurrent((prev) => (prev + 1) % images.length);
		}, 5000);
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, [current, images.length]);

	const handleTouchStart = (e: React.TouchEvent) => {
		if (images.length <= 1) return;
		touchStartX.current = e.touches[0].clientX;
	};
	const handleTouchEnd = (e: React.TouchEvent) => {
		if (images.length <= 1 || touchStartX.current === null) return;
		const deltaX = e.changedTouches[0].clientX - touchStartX.current;
		if (Math.abs(deltaX) > 50) {
			if (deltaX > 0) {
				setCurrent((prev) => (prev - 1 + images.length) % images.length);
			} else {
				setCurrent((prev) => (prev + 1) % images.length);
			}
		}
		touchStartX.current = null;
	};

	if (images.length === 0) return null;
	return (
		<div
			className="relative w-full h-48 rounded-lg overflow-hidden mb-4"
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
		>
			<div
				className="flex transition-transform duration-700 ease-in-out h-48"
				style={{
					width: `${images.length * 100}%`,
					transform: `translateX(-${current * (100 / images.length)}%)`,
				}}
			>
				{images.map((url, idx) => (
					<img
						key={idx}
						src={url}
						alt={`blog-img-${idx + 1}`}
						className="w-full h-48 object-cover flex-shrink-0"
						style={{ width: `${100 / images.length}%` }}
					/>
				))}
			</div>
			{images.length > 1 && (
				<div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
					{images.map((_, idx) => (
						<span
							key={idx}
							className={`inline-block w-2 h-2 rounded-full transition-all duration-300 ${
								idx === current
									? "bg-pink-500 scale-110"
									: "bg-gray-400 opacity-50"
							}`}
						/>
					))}
				</div>
			)}
		</div>
	);
}

// BlogPost component
function BlogPost({ post }: { post: PersonBio["blogPosts"][0] }) {
	return (
		<Card className="mb-6 bg-gray-800 rounded-xl shadow-lg p-4">
			<h3 className="text-lg font-bold text-gray-100 mb-2">{post.title}</h3>
			<ImageCarousel images={post.images} />
			<div className="text-gray-300 mb-2">{post.text}</div>
		</Card>
	);
}

// Biography panel
function BioPanel({
	person,
	expanded,
	onToggle,
}: {
	person: PersonBio;
	expanded: boolean;
	onToggle: () => void;
}) {
	return (
		<Card
			className={`transition-all duration-500 overflow-hidden ${
				expanded ? "max-h-[1000px] p-7" : "max-h-32 p-5"
			} mb-4`}
		>
			<div
				className="flex items-center justify-between cursor-pointer"
				onClick={onToggle}
			>
				<div className="flex items-center space-x-3">
					<span className="text-2xl font-bold text-gray-200">
						{person.name}
					</span>
				</div>
				{expanded ? (
					<ChevronUp className="w-6 h-6 text-gray-400" />
				) : (
					<ChevronRight className="w-6 h-6 text-gray-400" />
				)}
			</div>
			{expanded && (
				<div className="mt-6 space-y-4">
					{/* Slideshow above birthdate */}
					{person.slideshowImages && person.slideshowImages.length > 0 && (
						<ImageCarousel images={person.slideshowImages} />
					)}
					<div>
						<span className="font-bold text-gray-300">Birthdate</span>{" "}
						<span className="italic text-gray-400">{person.birthdate}</span>
					</div>
					<div>
						<span className="font-bold text-gray-300">Description</span>
						<div className="italic text-gray-400">{person.description}</div>
					</div>
					<div>
						<span className="font-bold text-gray-300">Likings</span>
						<ul className="italic list-disc list-inside text-gray-400">
							{person.likings.map((like, idx) => (
								<li key={idx}>{like}</li>
							))}
						</ul>
					</div>
					<div>
						<span className="font-bold text-gray-300">Habits</span>
						<ul className="italic list-disc list-inside text-gray-400">
							{person.habits.map((habit, idx) => (
								<li key={idx}>{habit}</li>
							))}
						</ul>
					</div>
					<div>
						<div>
							{person.blogPosts.map((post, idx) => (
								<BlogPost key={idx} post={post} />
							))}
						</div>
					</div>
				</div>
			)}
		</Card>
	);
}

interface MiniGameProps {
	onBack: () => void;
}

export function MiniGame({ onBack }: MiniGameProps) {
	const [expanded, setExpanded] = useState<"A" | "B" | null>(null);

	return (
		<div className="p-6 space-y-6">
			{/* Header */}
			<div className="flex items-center space-x-4 mb-4">
				<Button
					onClick={onBack}
					variant=""
					size="sm"
					className="rounded-full bg-grey-800 hover:bg-gray-700"
				>
					<ArrowLeft className="w-5 h-5 bg-gray-900 text-gray-300" />
				</Button>
				<h1 className="text-2xl text-gray-300">Chana</h1>
			</div>
			{/* Two expandable boxes */}
			<BioPanel
				person={personA}
				expanded={expanded === "A"}
				onToggle={() => setExpanded(expanded === "A" ? null : "A")}
			/>
			<BioPanel
				person={personB}
				expanded={expanded === "B"}
				onToggle={() => setExpanded(expanded === "B" ? null : "B")}
			/>
		</div>
	);
}