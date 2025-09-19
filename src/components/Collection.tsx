import {
    motion,
    MotionValue,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import { useRef } from "react";

import P_the_lake_1 from "../assets/images/timeline/the_lake_1.jpeg";
import P_the_lake_2 from "../assets/images/timeline/the_lake_2.jpeg";
import P_the_lake_3 from "../assets/images/timeline/the_lake_3.jpeg";
import P_the_lake_4 from "../assets/images/timeline/the_lake_5.jpeg";

export function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance])
}

export function Collection({ id }: { id: number }) {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({ target: ref })
    const y = useParallax(scrollYProgress, 300)

    // Map id to imported images
    const images: { [key: number]: string } = {
        1: P_the_lake_1,
        2: P_the_lake_2,
        3: P_the_lake_3,
        4: P_the_lake_4,
    };

    return (
        <section className="img-container">
            <div ref={ref}>
                <img
                    src={images[id]}
                    alt="My baby"
                />
            </div>
            <motion.h2
                // Hide until scroll progress is measured
                initial={{ visibility: "hidden" }}
                animate={{ visibility: "visible" }}
                style={{ 
                    y,
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(5px)",
                    background: "rgba(24,24,27,0.3)",
                    borderRadius: "1rem",
                    padding: "0.5rem 1rem",
                }}
            >{`#00${id}`}</motion.h2>
        </section>
    )
}

export default function Parallax() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    return (
        <div id="example">
            {[1, 2, 3, 4].map((image) => (
                <Collection key={image} id={image} />
            ))}
            <motion.div className="progress" style={{ scaleX }} />
            <StyleSheet />
        </div>
    )
}

/**
 * ==============   Styles   ================
 */

export function StyleSheet() {
    return (
        <style>{`
        html {
            scroll-snap-type: y mandatory;
        }

        .img-container {
            min-height: 100vh;
            scroll-snap-align: start;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;

        }

        .img-container > div {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 20px;
            background: #0A0A0A;
            overflow: hidden;
            border-radius: 12px;
            /* Remove width and height */
        }

        .img-container img {
            display: block;
            max-width: 100vw;
            max-height: 80vh;
            width: auto;
            height: auto;
            object-fit: contain;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        @media (max-width: 500px) {
            .img-container img {
                max-width: 98vw;
                max-height: 60vh;
            }
        }

        .img-container h2 {
            color: oklch(0.656 0.241 354.308);
            margin: 0;
            font-family: "Azeret Mono", monospace;
            font-size: 50px;
            font-weight: 700;
            letter-spacing: -3px;
            line-height: 1.2;
            position: absolute;
            display: inline-block;
            top: calc(50% + 80px);
            left: calc(50% + 70px);
        }

        .progress {
            position: fixed;
            left: 0;
            right: 0;
            height: 5px;
            background: oklch(0.656 0.241 354.308);
            bottom: 85px;
            transform: scaleX(0);
        }
    `}</style>
    )
}
