import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import Autoplay from "embla-carousel-autoplay";
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
    const {emblaRef, emblaApi, selectedIndex} = useEmlbaCarouselWithIndex({loop: true}, [Autoplay({delay: 3000})]);

    return (
        <div>
            <div
                className="tw-overflow-hidden"
                ref={emblaRef}
            >
                <div className="tw-grid tw-grid-flow-col tw-auto-cols-[100%]">
                    <ItemBuilder
                        items={testimonials}
                        itemBuilder={(testimonial, testimonialIndex) => (
                            <div
                                className="lg-px-screen-edge"
                                key={testimonialIndex}
                            >
                                <div className="tw-h-full tw-rounded-lg lg-bg-secondary-100 tw-flex tw-flex-col tw-px-8 tw-py-6">
                                    <div className="tw-grid tw-grid-cols-[auto,minmax(0,1fr)] tw-grid-rows-[auto,auto,auto] tw-gap-x-4 tw-gap-y-2">
                                        <div className="tw-col-start-1 tw-row-start-1 tw-row-span-3">
                                            <FixedWidthImage
                                                relativePath={testimonial.image}
                                                width="5rem"
                                                imageCdnProvider={ImageCdnProvider.GrowthJockey}
                                                className="tw-rounded-full"
                                            />
                                        </div>

                                        <div className="tw-col-start-2 tw-row-start-1">
                                            <div className="lg-text-headline tw-text-left">{testimonial.name}</div>
                                        </div>

                                        <div className="tw-col-start-2 tw-row-start-2 tw-flex tw-flex-row tw-gap-x-2">
                                            <ItemBuilder
                                                items={getIntegerArrayOfLength(5)}
                                                itemBuilder={(_, itemIndex) => (
                                                    <StarFill
                                                        className={concatenateNonNullStringsWithSpaces(
                                                            "tw-w-4 tw-h-4",
                                                            itemIndex <= testimonial.rating ? "lg-text-primary-500" : "lg-text-secondary-300",
                                                        )}
                                                        key={itemIndex}
                                                    />
                                                )}
                                            />
                                        </div>

                                        <div className="tw-col-start-2 tw-row-start-3">
                                            <div className="lg-text-body-bold">{testimonial.name}</div>
                                        </div>
                                    </div>

                                    <VerticalSpacer className="tw-h-6" />

                                    <div className="lg-text-body tw-text-center tw-flex-1">{testimonial.message}</div>

                                    <VerticalSpacer className="tw-h-6" />

                                    <div className="tw-w-full tw-h-px lg-bg-secondary-900"></div>

                                    <VerticalSpacer className="tw-h-4" />

                                    <div className="tw-grid tw-grid-cols-[minmax(0,1fr),minmax(0,1fr)] tw-justify-center tw-items-center">
                                        <div className="tw-col-start-1">
                                            <FixedWidthImage
                                                relativePath={testimonial.productImage}
                                                imageCdnProvider={ImageCdnProvider.GrowthJockey}
                                                width="120px"
                                            />
                                        </div>
                                        <div className="tw-col-start-2 tw-text-right">{testimonial.productName}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    />
                </div>
            </div>

            <VerticalSpacer className="tw-h-4" />

            <div className="tw-w-full tw-flex tw-flex-row tw-justify-between tw-items-center lg-px-screen-edge">
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
