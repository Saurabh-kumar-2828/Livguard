import {useEffect, useState} from "react";

function getIsScreenSizeBelow(mobileMaxWidth: number): boolean | null {
    if (typeof window === "undefined") {
        return null;
    }

    return window.innerWidth < mobileMaxWidth;
}

export default function useIsScreenSizeBelow(mobileMaxWidth: number) {
    const [isMobile, setIsMobile] = useState<boolean | null>(getIsScreenSizeBelow(mobileMaxWidth));

    useEffect(() => {
        const onResize = () => {
            setIsMobile(getIsScreenSizeBelow(mobileMaxWidth));
        };

        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, [mobileMaxWidth]);

    return isMobile;
}
