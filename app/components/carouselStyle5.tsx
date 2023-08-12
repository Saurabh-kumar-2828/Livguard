import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import React from "react";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useEmblaCarouselWithIndex} from "~/hooks/useEmblaCarouselWithIndex";

export function CarouselStyle5({
    items,
    className,
    slidesContainerClassName,
    selectedContainerClassName,
    deselectedContainersClassName,
    disabledChevronClassName,
    snapDotsDivisionFactor,
    itemContainerClassName,
    autoplayDelay = 8000,
}: {
    items: Array<any>;
    className?: string;
    selectedContainerClassName?: string;
    deselectedContainersClassName?: string;
    slidesContainerClassName?: string;
    disabledChevronClassName?: string;
    snapDotsDivisionFactor?: number;
    itemContainerClassName?: string;
    autoplayDelay?: number | null;
}) {
    const {emblaRef, emblaApi, selectedIndex} = useEmblaCarouselWithIndex({loop: true}, autoplayDelay);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-overflow-hidden tw-w-full", className)}
            ref={emblaRef}
        >
            <div className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-flow-col tw-auto-cols-[100%] md:tw-auto-cols-[50%] lg:tw-auto-cols-[28%]", slidesContainerClassName)}>
                <ItemBuilder
                    items={items}
                    itemBuilder={(item, itemIndex) => (
                        // Non selected items are dimmed
                        <div
                            className={concatenateNonNullStringsWithSpaces(
                                `tw-px-3 tw-transition-[height] tw-ease-linear tw-delay-200 tw-h-full ${itemIndex !== selectedIndex ? "tw-opacity-50" : ""}`,
                                itemContainerClassName,
                            )}
                            key={itemIndex}
                        >
                            {/* {itemIndex !== selectedIndex ? <div className={deselectedContainersClassName}>{item}</div> : <div className={selectedContainerClassName}>{item}</div>} */}
                            <div className={itemIndex === selectedIndex ? selectedContainerClassName : deselectedContainersClassName}>{item}</div>
                        </div>
                    )}
                />
            </div>

            <VerticalSpacer className="tw-h-4" />

            <div className="tw-w-full tw-flex tw-flex-row tw-justify-between tw-items-center lg:tw-justify-center lg:tw-gap-10 lg-px-screen-edge-2">
                <button
                    type="button"
                    className={concatenateNonNullStringsWithSpaces(
                        "tw-rounded-full tw-p-1 tw-border tw-border-solid tw-border-secondary-900-light dark:tw-border-secondary-900-dark",
                        selectedIndex === 0 ? disabledChevronClassName : "",
                    )}
                    onClick={() => emblaApi?.scrollPrev()}
                >
                    <ChevronLeftIcon className="tw-w-6 tw-h-6" />
                </button>

                <div className="tw-flex tw-flex-row tw-gap-x-2">
                    <ItemBuilder
                        items={snapDotsDivisionFactor == undefined ? items : items.slice(0, items.length / snapDotsDivisionFactor)}
                        itemBuilder={(_, scrollSnapIndex) => (
                            <React.Fragment key={scrollSnapIndex}>
                                <div
                                    className={concatenateNonNullStringsWithSpaces(
                                        "tw-w-2 tw-h-2 tw-rounded-full",
                                        scrollSnapIndex == selectedIndex || (snapDotsDivisionFactor != undefined && scrollSnapIndex === selectedIndex % (items.length / snapDotsDivisionFactor))
                                            ? "lg-bg-secondary-900"
                                            : "lg-bg-secondary-300",
                                    )}
                                    key={scrollSnapIndex}
                                    onClick={() => {
                                        if (scrollSnapIndex !== selectedIndex) {
                                            emblaApi?.scrollTo(scrollSnapIndex);
                                        }
                                    }}
                                />
                            </React.Fragment>
                        )}
                    />
                </div>

                <button
                    type="button"
                    className={concatenateNonNullStringsWithSpaces(
                        "tw-rounded-full tw-p-1 tw-border tw-border-solid tw-border-secondary-900-light dark:tw-border-secondary-900-dark",
                        selectedIndex === items.length - 1 ? disabledChevronClassName : "",
                    )}
                    onClick={() => emblaApi?.scrollNext()}
                >
                    <ChevronRightIcon className="tw-w-6 tw-h-6" />
                </button>
            </div>
        </div>
    );
}
