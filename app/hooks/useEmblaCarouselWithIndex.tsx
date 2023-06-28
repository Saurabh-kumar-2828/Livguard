import type {EmblaCarouselType} from "embla-carousel-react";
import useEmblaCarousel from "embla-carousel-react";
import {useCallback, useEffect, useRef, useState} from "react";

export function useEmblaCarouselWithIndex(options, autoplayDelay?: number, autoPlayIndexChangeOffset?: number) {
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
        if (autoPlayIndexChangeOffset != null) {
            emblaApi.scrollTo(emblaApi.selectedScrollSnap() + autoPlayIndexChangeOffset);
        } else {
            emblaApi.scrollNext();
        }

        timeoutHandle.current = setTimeout(autoplay, autoplayDelay, emblaApi);
    }

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
            setTimeout(autoplay, autoplayDelay, emblaApi);
        }
    }, [emblaApi, onSlideChange]);

    return {emblaRef, emblaApi, selectedIndex};
}
