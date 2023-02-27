import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import {StarFill} from "react-bootstrap-icons";
import {FixedWidthImage} from "~/global-common-typescript/components/fixedWidthImage";
import {ImageCdnProvider} from "~/global-common-typescript/components/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces, getIntegerArrayOfLength} from "~/global-common-typescript/utilities/utilities";
import {useEmlbaCarouselWithIndex} from "~/hooks/useEmlbaCarouselWithIndex";
import {UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";

export function TestimonialsCarousel({
    userPreferences,
    testimonials,
}: {
    userPreferences: UserPreferences;
    testimonials: Array<{image: string; name: string; rating: number; state: string; message: string; productImage: string; productName: string}>;
}) {
    const {emblaRef, emblaApi, selectedIndex} = useEmlbaCarouselWithIndex({loop: true, align: "start"});

    return (
        <div>
            <div
                className="tw-overflow-hidden"
                ref={emblaRef}
            >
                <div className="tw-grid tw-grid-flow-col tw-auto-cols-[100%] lg:tw-auto-cols-[40%] tw-h-full">
                    <ItemBuilder
                        items={testimonials}
                        itemBuilder={(testimonial, testimonialIndex) => (
                            <div
                                className={concatenateNonNullStringsWithSpaces("[@media(max-width:1024px)]:lg-px-screen-edge",`tw-mr-4`)}
                                key={testimonialIndex}
                            >
                                <div className="tw-grid tw-grid-cols-[auto,minmax(0,1fr),auto] lg:tw-min-w-[23rem] tw-grid-rows-[auto,auto] tw-p-3 tw-gap-x-2 tw-gap-y-2 tw-justify-center tw-items-center lg-bg-secondary-100 tw-rounded-lg tw-h-full">
                                    <div className="tw-col-start-1 tw-row-start-1">
                                        <FixedWidthImage
                                            relativePath={testimonial.image}
                                            width="5rem"
                                            imageCdnProvider={ImageCdnProvider.Imgix}
                                            className="tw-rounded-full"
                                        />
                                    </div>

                                    <div className="tw-col-start-2 tw-row-start-1 tw-flex tw-flex-col tw-gap-1 tw-justify-start">
                                        <div className="lg-text-title1">{testimonial.name}</div>

                                        <div className="lg-text-body-bold">{testimonial.state}</div>

                                        <div className="tw-flex tw-flex-row tw-gap-[2px] ">
                                            <ItemBuilder
                                                items={getIntegerArrayOfLength(5)}
                                                itemBuilder={(_, itemIndex) => (
                                                    <StarFill
                                                        className={concatenateNonNullStringsWithSpaces(
                                                            "tw-w-2 tw-h-2",
                                                            itemIndex <= testimonial.rating ? "lg-text-primary-500" : "lg-text-secondary-300",
                                                        )}
                                                        key={itemIndex}
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <div className="tw-col-start-3 tw-row-start-1">
                                        <FixedWidthImage
                                            relativePath={testimonial.productImage}
                                            imageCdnProvider={ImageCdnProvider.Imgix}
                                            width="100px"
                                        />
                                    </div>

                                    <div className="tw-col-start-1 tw-col-span-3 tw-row-start-2">
                                        <div className="lg-text-body tw-text-center tw-flex-1">{testimonial.message}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    />
                </div>
            </div>

            <VerticalSpacer className="tw-h-4" />

            <div className="tw-w-full tw-flex tw-flex-row tw-justify-between lg:tw-justify-center lg:tw-gap-10 tw-items-center lg-px-screen-edge">
                <button
                    type="button"
                    className="tw-rounded-full tw-p-1 tw-border tw-border-solid tw-border-secondary-900-light dark:tw-border-secondary-900-dark"
                    onClick={() => emblaApi?.scrollPrev()}
                >
                    <ChevronLeftIcon className="tw-w-6 tw-h-6" />
                </button>

                <div className="tw-flex tw-flex-row tw-gap-x-2">
                    <ItemBuilder
                        items={testimonials}
                        itemBuilder={(_, scrollSnapIndex) => (
                            <div
                                className={concatenateNonNullStringsWithSpaces("tw-w-2 tw-h-2 tw-rounded-full", scrollSnapIndex == selectedIndex ? "lg-bg-secondary-900" : "lg-bg-secondary-300")}
                                key={scrollSnapIndex}
                            />
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
