import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import React from "react";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useEmblaCarouselWithIndex} from "~/hooks/useEmlbaCarouselWithIndex";

/**
 * @function Multi row carousels
 */

export function CarouselStyle6({
    items,
    className,
    slidesContainerClassName,
    controlsContainerClassName,
    chevronButtonIndexChangeOffset,
}: {
    items: Array<any>;
    className?: string;
    slidesContainerClassName?: string;
    controlsContainerClassName?: string;
    chevronButtonIndexChangeOffset: number;
}) {
    const {emblaRef, emblaApi, selectedIndex} = useEmblaCarouselWithIndex({loop: true, align: "start"}, 8000, chevronButtonIndexChangeOffset);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-overflow-hidden tw-w-full", className)}
            ref={emblaRef}
        >
            <div className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-flow-col tw-auto-cols-[50%]", slidesContainerClassName)}>
                <ItemBuilder
                    items={items}
                    itemBuilder={(item, itemIndex) => (
                        <div
                            className="tw-px-4"
                            key={itemIndex}
                        >
                            {item}
                        </div>
                    )}
                />
            </div>

            <VerticalSpacer className="tw-h-4" />

            <div className={concatenateNonNullStringsWithSpaces("tw-w-full tw-flex tw-flex-row tw-justify-between tw-items-center lg:tw-justify-center lg:tw-gap-10", controlsContainerClassName)}>
                <button
                    type="button"
                    className="tw-rounded-full tw-p-1 tw-border tw-border-solid tw-border-secondary-900-light dark:tw-border-secondary-900-dark"
                    onClick={() => {
                        emblaApi?.scrollTo(selectedIndex - chevronButtonIndexChangeOffset);
                    }}
                >
                    <ChevronLeftIcon className="tw-w-6 tw-h-6" />
                </button>

                <div className="tw-flex tw-flex-row tw-gap-x-2">
                    <ItemBuilder
                        items={items.slice(0, items.length / chevronButtonIndexChangeOffset)}
                        itemBuilder={(_, scrollSnapIndex) => (
                            <React.Fragment key={scrollSnapIndex}>
                                <div
                                    className={concatenateNonNullStringsWithSpaces(
                                        "tw-w-2 tw-h-2 tw-rounded-full",
                                        scrollSnapIndex == selectedIndex / chevronButtonIndexChangeOffset ? "lg-bg-secondary-900" : "lg-bg-secondary-300",
                                    )}
                                    key={scrollSnapIndex}
                                />
                            </React.Fragment>
                        )}
                    />
                </div>

                <button
                    type="button"
                    className="tw-rounded-full tw-p-1 tw-border tw-border-solid tw-border-secondary-900-light dark:tw-border-secondary-900-dark"
                    onClick={() => {
                        emblaApi?.scrollTo(selectedIndex + chevronButtonIndexChangeOffset);
                    }}
                >
                    <ChevronRightIcon className="tw-w-6 tw-h-6" />
                </button>
            </div>
        </div>
    );
}
