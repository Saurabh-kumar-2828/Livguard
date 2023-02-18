import {Fade} from "react-awesome-reveal";
import Reveal from "react-awesome-reveal";
import {keyframes} from "@emotion/react";

// const fadeInKeyframes = keyframes`
//     from {
//         transform: translateY(1em);
//         opacity: 0;
//     }

//     to {
//         transform: translateY(0);
//         opacity: 100%;
//     }
// `;

export function DefaultTextAnimation({delay, className, children}: {delay?: number, className?: string; children}) {
    return (
        // <Reveal
        //     delay={delay}
        //     className={className}
        //     keyframes={fadeInKeyframes}
        //     triggerOnce
        // >
        //     {children}
        // </Reveal>
        <Fade
            direction="up"
            delay={delay}
            className={className}
            // triggerOnce
        >
            {children}
        </Fade>
    );
}
