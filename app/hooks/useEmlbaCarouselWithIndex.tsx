import useEmblaCarousel, {EmblaCarouselType} from "embla-carousel-react";
import {useCallback, useEffect, useRef, useState} from "react";
import {delay} from "~/global-common-typescript/utilities/utilities";

export function useEmlbaCarouselWithIndex(options, autoplayDelay?: number) {
    const [emblaRef, emblaApi] = useEmblaCarousel(options);

    const [selectedIndex, setSelectedIndex] = useState(0);

    const timeoutHandle = useRef<any>(null);

    const onSlideChange = useCallback(() => {
        if (!emblaApi) {
            return;
        }

        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    function autoplay(emblaApi: EmblaCarouselType) {
        emblaApi.scrollNext();

        timeoutHandle.current = setTimeout(autoplay, autoplayDelay, emblaApi);
    };

    useEffect(() => {
        if (!emblaApi) {
            return;
        }

        onSlideChange();
        emblaApi.on("select", onSlideChange);
        emblaApi.on("reInit", onSlideChange);

        if (timeoutHandle.current != null) {
            clearTimeout(timeoutHandle.current);
            timeoutHandle.current = null;
        }

        if (autoplayDelay != null) {
            setTimeout(autoplay, Math.floor(Math.random() * autoplayDelay), emblaApi);
        }
    }, [emblaApi, onSlideChange]);

    return {emblaRef, emblaApi, selectedIndex};
}
