import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import React from "react";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useEmblaCarouselWithIndex} from "~/hooks/useEmblaCarouselWithIndex";
import {FullWidthImage} from "~/components/images/fullWidthImage";

export function CarouselStyle7({
    items,
    className,
    slidesContainerClassName,
    selectedContainerClassName,
    deselectedContainersClassName,
    chevronButtonsBelowCarousel,
    snapDotsDivisionFactor,
    toggleMobileOnly,
}: {
    items: Array<any>;
    className?: string;
    selectedContainerClassName?: string;
    deselectedContainersClassName?: string;
    slidesContainerClassName?: string;
    chevronButtonsBelowCarousel?: boolean;
    snapDotsDivisionFactor?: number;
    toggleMobileOnly?: boolean;
}) {
    const {emblaRef, emblaApi, selectedIndex} = useEmblaCarouselWithIndex({loop: true}, 8000);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-overflow-x-hidden tw-w-full tw-pb-4", className)}
            ref={emblaRef}
        >
            <div
                className={concatenateNonNullStringsWithSpaces(
                    "tw-grid tw-grid-flow-col tw-auto-cols-[100%]",
                    slidesContainerClassName,
                    toggleMobileOnly ? "" : "md:tw-auto-cols-[50%] lg:tw-auto-cols-[28%]",
                )}
            >
                <ItemBuilder
                    items={items}
                    itemBuilder={(item, itemIndex) => {
                        const isBackgroundPrimary = itemIndex % 2 === 0;
                        // Non selected items are dimmed
                        return (
                            <div
                                className={`lg:tw-px-3 tw-transition-[height] tw-ease-linear tw-delay-200 tw-h-full ${itemIndex !== selectedIndex ? "tw-brightness-50" : ""}`}
                                key={itemIndex}
                            >
                                <div className={itemIndex !== selectedIndex ? deselectedContainersClassName : selectedContainerClassName}>
                                    <div
                                        // className={`tw-h-full tw-grid tw-grid-rows-[auto_0.75rem_auto_auto_1rem_auto_minmax(3.5rem,1fr)] lg:tw-grid-rows-[auto_0.75rem_auto_0.25rem_auto_1rem_auto_minmax(3.5rem,1fr)] tw-grid-cols-[minmax(0,1fr)_minmax(0,1fr)] tw-rounded-[0.625rem] tw-px-5 ${
                                        //     isBackgroundPrimary ? "lg-about-us-leaders-bg-gradient !tw-text-secondary-900-dark" : "lg-bg-secondary-100 lg-text-secondary-900"
                                        // }`}
                                        className={concatenateNonNullStringsWithSpaces(
                                            "tw-h-full tw-grid tw-grid-rows-[auto_0.75rem_auto_auto_1rem_auto_minmax(3.5rem,1fr)] tw-grid-cols-[minmax(0,1fr)_minmax(0,1fr)] tw-rounded-[0.625rem] tw-px-5 tw-overflow-visible",
                                            isBackgroundPrimary ? "lg-about-us-leaders-bg-gradient !tw-text-secondary-900-dark" : "lg-bg-secondary-100 lg-text-secondary-900 lg-csr-leaders-shadow",
                                            toggleMobileOnly ? "" : "lg:tw-grid-rows-[auto_0.75rem_auto_0.25rem_auto_1rem_auto_minmax(3.5rem,1fr)]",
                                        )}
                                    >
                                        <div className="tw-row-start-1 tw-col-start-1 tw-h-[8.3rem] tw-w-[8.3rem] tw-rounded-full tw-relative tw-bottom-6">
                                            <FullWidthImage relativePath={item.imageRelativePath} />
                                        </div>

                                        {!chevronButtonsBelowCarousel && (
                                            <div className="tw-row-start-1 tw-col-start-2 tw-justify-self-end tw-grid tw-grid-flow-col tw-gap-x-3 tw-self-center tw-relative tw-bottom-6">
                                                <button
                                                    type="button"
                                                    className="lg-bg-secondary-100 lg-text-secondary-900 tw-rounded-full tw-p-1 tw-border tw-border-solid tw-border-secondary-900-light dark:tw-border-secondary-900-dark"
                                                    onClick={() => emblaApi?.scrollPrev()}
                                                >
                                                    <ChevronLeftIcon className="tw-w-6 tw-h-6" />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="lg-bg-secondary-100 lg-text-secondary-900 tw-rounded-full tw-p-1 tw-border tw-border-solid tw-border-secondary-900-light dark:tw-border-secondary-900-dark"
                                                    onClick={() => emblaApi?.scrollNext()}
                                                >
                                                    <ChevronRightIcon className="tw-w-6 tw-h-6" />
                                                </button>
                                            </div>
                                        )}

                                        <div className="tw-row-start-3 tw-col-start-1 tw-col-span-full lg-text-headline">{item.title}</div>
                                        <div
                                            className={concatenateNonNullStringsWithSpaces(
                                                "tw-row-start-4 tw-col-start-1 tw-col-span-full lg-text-title2",
                                                toggleMobileOnly ? "" : "lg:tw-row-start-5",
                                            )}
                                        >
                                            {item.position}
                                        </div>
                                        <div className={concatenateNonNullStringsWithSpaces("tw-row-start-6 tw-col-start-1 tw-col-span-full", toggleMobileOnly ? "" : "lg:tw-row-start-7")}>
                                            {item.description}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }}
                />
            </div>

            <VerticalSpacer className={concatenateNonNullStringsWithSpaces("tw-h-4", toggleMobileOnly ? "lg:tw-hidden" : "")} />

            {chevronButtonsBelowCarousel && !toggleMobileOnly && (
                <div className="tw-w-full tw-flex tw-flex-row tw-justify-between tw-items-center lg:tw-justify-center lg:tw-gap-10 lg-px-screen-edge-2">
                    <button
                        type="button"
                        className="tw-rounded-full tw-p-1 tw-border tw-border-solid tw-border-secondary-900-light dark:tw-border-secondary-900-dark"
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
                        className="tw-rounded-full tw-p-1 tw-border tw-border-solid tw-border-secondary-900-light dark:tw-border-secondary-900-dark"
                        onClick={() => emblaApi?.scrollNext()}
                    >
                        <ChevronRightIcon className="tw-w-6 tw-h-6" />
                    </button>
                </div>
            )}
        </div>
    );
}
