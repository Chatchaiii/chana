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

import chana_1 from "../../assets/images/collections/chana/chana_1.jpeg";
import chana_2 from "../../assets/images/collections/chana/chana_2.jpeg";
import chana_3 from "../../assets/images/collections/chana/chana_3.jpeg";
import chana_4 from "../../assets/images/collections/chana/chana_4.jpeg";
import chana_5 from "../../assets/images/collections/chana/chana_5.jpeg";
import chana_6 from "../../assets/images/collections/chana/chana_6.jpeg";
import chana_7 from "../../assets/images/collections/chana/chana_7.jpeg";
import chana_8 from "../../assets/images/collections/chana/chana_8.jpeg";
import chana_9 from "../../assets/images/collections/chana/chana_9.jpeg";
import chana_10 from "../../assets/images/collections/chana/chana_10.jpeg";
import chana_11 from "../../assets/images/collections/chana/chana_11.jpeg";
import chana_12 from "../../assets/images/collections/chana/chana_12.jpeg";
import chana_13 from "../../assets/images/collections/chana/chana_13.jpeg";
import chana_14 from "../../assets/images/collections/chana/chana_14.jpeg";
import chana_15 from "../../assets/images/collections/chana/chana_15.jpeg";
import chana_16 from "../../assets/images/collections/chana/chana_16.jpeg";
import chana_17 from "../../assets/images/collections/chana/chana_17.jpeg";
import chana_18 from "../../assets/images/collections/chana/chana_18.jpeg";
import chana_19 from "../../assets/images/collections/chana/chana_19.jpeg";
import chana_20 from "../../assets/images/collections/chana/chana_20.jpeg";
import chana_21 from "../../assets/images/collections/chana/chana_21.jpeg";
import chana_22 from "../../assets/images/collections/chana/chana_22.jpeg";
import chana_23 from "../../assets/images/collections/chana/chana_23.jpeg";
import chana_24 from "../../assets/images/collections/chana/chana_24.jpeg";
import chana_25 from "../../assets/images/collections/chana/chana_25.jpeg";
import chana_26 from "../../assets/images/collections/chana/chana_26.jpeg";
import chana_27 from "../../assets/images/collections/chana/chana_27.jpeg";

export function useChana(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance]);
}

export function Chana_id({ id }: { id: number }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useChana(scrollYProgress, 300);

    // Map id to imported images
    const images: { [key: number]: string } = {
        1: chana_1,
        2: chana_2,
        3: chana_3,
        4: chana_4,
        5: chana_5,
        6: chana_6,
        7: chana_7,
        8: chana_8,
        9: chana_9,
        10: chana_10,
        11: chana_11,
        12: chana_12,
        13: chana_13,
        14: chana_14,
        15: chana_15,
        16: chana_16,
        17: chana_17,
        18: chana_18,
        19: chana_19,
        20: chana_20,
        21: chana_21,
        22: chana_22,
        23: chana_23,
        24: chana_24,
        25: chana_25,
        26: chana_26,
        27: chana_27,
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

export default function Chana({ onBack }: { onBack?: () => void }) {
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
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27].map((image) => (
                <Chana_id key={image} id={image} />
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
            chana-spacing: -3px;
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
