import React from "react";
import {
    motion,
    MotionValue,
    useScroll,
    useSpring,
    useTransform,
} from "motion/react";
import { useRef } from "react";
import { ChevronLeft } from "lucide-react";

import silly_1 from "../../assets/images/collections/silly/silly_1.jpeg";
import silly_2 from "../../assets/images/collections/silly/silly_2.jpeg";
import silly_3 from "../../assets/images/collections/silly/silly_3.jpeg";
import silly_4 from "../../assets/images/collections/silly/silly_4.jpeg";
import silly_5 from "../../assets/images/collections/silly/silly_5.jpeg";
import silly_6 from "../../assets/images/collections/silly/silly_6.jpeg";
import silly_7 from "../../assets/images/collections/silly/silly_7.jpeg";
import silly_8 from "../../assets/images/collections/silly/silly_8.jpeg";
import silly_9 from "../../assets/images/collections/silly/silly_9.jpeg";
import silly_10 from "../../assets/images/collections/silly/silly_10.jpeg";
import silly_11 from "../../assets/images/collections/silly/silly_11.jpeg";
import silly_12 from "../../assets/images/collections/silly/silly_12.jpeg";
import silly_13 from "../../assets/images/collections/silly/silly_13.jpeg";
import silly_14 from "../../assets/images/collections/silly/silly_14.jpeg";
import silly_15 from "../../assets/images/collections/silly/silly_15.jpeg";
import silly_16 from "../../assets/images/collections/silly/silly_16.jpeg";
import silly_17 from "../../assets/images/collections/silly/silly_17.jpeg";
import silly_18 from "../../assets/images/collections/silly/silly_18.jpeg";
import silly_19 from "../../assets/images/collections/silly/silly_19.jpeg";
import silly_20 from "../../assets/images/collections/silly/silly_20.jpeg";

export function useSilly(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance]);
}

export function Silly_id({ id }: { id: number }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useSilly(scrollYProgress, 300);

    // Map id to imported images
    const images: { [key: number]: string } = {
        1: silly_1,
        2: silly_2,
        3: silly_3,
        4: silly_4,
        5: silly_5,
        6: silly_6,
        7: silly_7,
        8: silly_8,
        9: silly_9,
        10: silly_10,
        11: silly_11,
        12: silly_12,
        13: silly_13,
        14: silly_14,
        15: silly_15,
        16: silly_16,
        17: silly_17,
        18: silly_18,
        19: silly_19,
        20: silly_20,
    };

    return (
        <section className="img-container flex flex-col">
            <div ref={ref}>
                <img src={images[id]} alt="My baby" />
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
                    borderRadius: "3rem",
                    padding: "0.5rem 1rem",
                }}
            >{`#0${id}`}</motion.h2>
        </section>
    );
}

export default function Silly({ onBack }: { onBack?: () => void }) {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <div id="example">
            <motion.div
                drag
                dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
                dragElastic={0.2}
                className="fixed left-3 right-auto z-[50] mt-auto"
                whileHover={{
                    scale: [null, 1.01, null],
                    transition: {
                        duration: 0.3,
                        times: [0, 0.6, 1],
                        ease: ["easeInOut", "easeOut"],
                    },
                }}
                whileTap={{ scale: 0.9 }}
                transition={{
                    duration: 0.2,
                    ease: "easeOut",
                }}
                onClick={onBack}
                style={{
                    position: "fixed",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(5px)",
                    background: "rgba(223, 223, 223, 0.12)",
                    borderRadius: "3rem",
                    top: "81.5%",
                    width: "98%",
                    left: "1%",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    gap: "0.5rem",
                    color: "white",
                    padding: "0.5rem 1rem",
                    zIndex: 20,
                    cursor: "pointer",
                }}
            >
                <ChevronLeft />
                <p className="font-bold">Back</p>
            </motion.div>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((image) => (
                <Silly_id key={image} id={image} />
            ))}
            <motion.div
                className="progress"
                style={{ scaleX, borderRadius: "1rem" }}
            />
            <StyleSheet />
        </div>
    );
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
        }

        .img-container img {
            display: block;
            max-width: 100vw;
            max-height: 80vh;
            width: auto;
            height: auto;
            object-fit: contain;
            border: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
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
            text-align: center;
            font-family: "Azeret Mono", monospace;
            font-size: 30px;
            font-weight: 700;
            width: 100px;
            silly-spacing: -3px;
            line-height: 1.2;
            position: relative;
            display: inline-block;
            bottom: 60%;
            left: 30%;
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
    );
}
