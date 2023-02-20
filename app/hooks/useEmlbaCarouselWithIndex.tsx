import useEmblaCarousel from "embla-carousel-react";
import {useCallback, useEffect, useState} from "react";

export function useEmlbaCarouselWithIndex(options, plugins) {
    const [emblaRef, emblaApi] = useEmblaCarousel({loop: true});

    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSlideChange = useCallback(() => {
        if (!emblaApi) {
            return;
        }

        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) {
            return;
        }

        onSlideChange();
        emblaApi.on("select", onSlideChange);
        emblaApi.on("reInit", onSlideChange);
    }, [emblaApi, onSlideChange]);

    return {emblaRef, emblaApi, selectedIndex};
}
