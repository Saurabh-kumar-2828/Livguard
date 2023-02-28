import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import {FullWidthImage} from "~/global-common-typescript/components/fullWidthImage";
import {ImageCdnProvider} from "~/global-common-typescript/components/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useEmlbaCarouselWithIndex} from "~/hooks/useEmlbaCarouselWithIndex";
import {UserPreferences} from "~/typeDefinitions";

export function ProductInfoCarousel({items}: {items: Array<any>}) {
    const {emblaRef, emblaApi, selectedIndex} = useEmlbaCarouselWithIndex({loop: true, align: "start"}, 8000);

    return (
        <div
            className="tw-overflow-hidden tw-w-full"
            ref={emblaRef}
        >
            <div className="tw-grid tw-grid-flow-col tw-auto-cols-[45%]">
                <ItemBuilder
                    items={items}
                    itemBuilder={(item, itemIndex) => (
                        <div
                            className="tw-px-3"
                            key={itemIndex}
                        >
                            <React.Fragment key={itemIndex}>
                                <div className="tw-rounded-lg tw-w-full">
                                    <FullWidthImage
                                        relativePath={item.image}
                                        imageCdnProvider={ImageCdnProvider.Imgix}
                                        className="tw-rounded-lg"
                                    />
                                </div>
                            </React.Fragment>
                        </div>
                    )}
                />
            </div>

            <VerticalSpacer className="tw-h-4" />

            <div className="tw-w-full tw-flex tw-flex-row tw-justify-between lg:tw-justify-center lg:tw-gap-10 tw-items-center">
                <button
                    type="button"
                    className="tw-rounded-full tw-p-1 tw-border tw-border-solid tw-border-secondary-900-light dark:tw-border-secondary-900-dark"
                    onClick={() => emblaApi?.scrollPrev()}
                >
                    <ChevronLeftIcon className="tw-w-6 tw-h-6" />
                </button>

                <div className="tw-flex tw-flex-row tw-gap-x-2">
                    <ItemBuilder
                        items={items}
                        itemBuilder={(_, scrollSnapIndex) => (
                            <React.Fragment key={scrollSnapIndex}>
                                <div
                                    className={concatenateNonNullStringsWithSpaces("tw-w-2 tw-h-2 tw-rounded-full", scrollSnapIndex == selectedIndex ? "lg-bg-secondary-900" : "lg-bg-secondary-300")}
                                    key={scrollSnapIndex}
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
        </div>
    );
}
