import type {EmblaCarouselType} from "embla-carousel-react";
import useEmblaCarousel from "embla-carousel-react";
import {useCallback, useEffect, useRef, useState} from "react";

// <- userInteractionPauseDuration
export function useEmblaCarouselWithIndex(options, autoplayDelay?: number, autoPlayIndexChangeOffset?: number) {
    const [emblaRef, emblaApi] = useEmblaCarousel(options);

    const [selectedIndex, setSelectedIndex] = useState(0);

    const timeoutHandle = useRef<any>(null);
    // const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);

    const onSlideChange = useCallback(() => {
        if (!emblaApi) {
            return;
        }
        // setTimerProgress(-60)
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
        // emblaApi.on("scroll", ()=> setTimerProgress(20));
        // emblaApi.on("scroll", ()=> console.log("asd"));
        // emblaApi.on("pointerUp", ()=> {
        //     moveToNextSlide();
        // });

        if (timeoutHandle.current != null) {
            clearTimeout(timeoutHandle.current);
            timeoutHandle.current = null;
        }

        if (autoplayDelay != null) {
            setTimeout(autoplay, autoplayDelay, emblaApi);
        }
    }, [emblaApi, onSlideChange]);

    // function moveToNextSlide(){
    //     if(autoplayDelay){
    //         if(userInteractionPauseDuaration){
    //             var changingFactor = Math.ceil(-(100/autoplayDelay)*userInteractionPauseDuaration);
    //         }else{
    //             var changingFactor = -60
    //         }
    //     setTimerProgress(changingFactor);
    //     }       
    // }

    // function increaseTimer(){
    //     if(timerProgress != 100){
    //         setTimerProgress(prev => prev + 1);
    //         return;
    //     }else{
    //         setTimerProgress(0)
    //         emblaApi?.scrollNext()
    //     }
    // }

    // if(autoplayDelay){
    //     var delay = Math.ceil(autoplayDelay/200);
    // }else {
    //     var delay = 50
    // }

    // useEffect(() => {
    //         if (timeoutId != null) {
    //             clearTimeout(timeoutId);
    //         }
    //         let timeout = setTimeout(() => {
    //             setTimeout(increaseTimer,delay);
    //         }, 50);
    //         setTimeoutId(timeout);
        
    // }, [timerProgress]);

    return {emblaRef, emblaApi, selectedIndex};
}
// -> currentSlide
// -> autoplayProgress
// -> moveToNextSlide
// -> moveToPreviousSlide
