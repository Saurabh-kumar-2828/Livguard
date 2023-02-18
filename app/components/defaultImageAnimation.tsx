import {Fade} from "react-awesome-reveal";

export function DefaultImageAnimation({delay, className, children}: {delay?: number; className?: string; children}) {
    return (
        <Fade
            delay={100 + (delay ?? 0)}
            fraction={0.25}
            className={className}
        >
            {children}
        </Fade>
    );
}
