import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import {StarFill} from "react-bootstrap-icons";
import {FixedWidthImage} from "~/components/images/fixedWidthImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces, getIntegerArrayOfLength} from "~/global-common-typescript/utilities/utilities";
import {useEmlbaCarouselWithIndex} from "~/hooks/useEmlbaCarouselWithIndex";
import type {UserPreferences} from "~/typeDefinitions";

export function TestimonialsCarousel({
    userPreferences,
    testimonials,
}: {
    userPreferences: UserPreferences;
    testimonials: Array<{video?: JSX.Element; name: string; rating: number; state: string; message: string; productImage: string; productName: string}>;
}) {
    const {emblaRef, emblaApi, selectedIndex} = useEmlbaCarouselWithIndex({loop: true});

    return (
        <div>
            <div
                className="tw-overflow-hidden"
                ref={emblaRef}
            >
                <div className="tw-grid tw-grid-flow-col tw-auto-cols-[100%] lg:tw-auto-cols-[35rem] tw-h-full tw-min-h-[15rem]">
                    <ItemBuilder
                        items={testimonials}
                        itemBuilder={(testimonial, testimonialIndex) => (
                            <div
                                className={concatenateNonNullStringsWithSpaces("[@media(max-width:1024px)]:lg-px-screen-edge", `lg:tw-mr-4`)}
                                key={testimonialIndex}
                            >
                                <div className="tw-grid tw-grid-cols-[minmax(0,1fr),minmax(0,1fr)] lg:tw-min-w-[23rem] lg:tw-max-w-[35rem] tw-grid-rows-[auto,auto,minmax(0,1fr)] tw-p-3 tw-pt-5 tw-gap-x-2 tw-gap-y-2 tw-justify-center tw-items-start lg-bg-secondary-100 tw-rounded-lg tw-h-full tw-w-full">
                                    {testimonial.video ? (
                                        <div className="tw-col-start-1 tw-row-start-1 tw-col-span-full">{testimonial.video}</div>
                                    ) : (
                                        <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-col-start-1 tw-row-start-1 tw-col-span-full tw-aspect-[560/315] lg-bg-secondary-300 tw-rounded-lg tw-w-full">
                                            <div className="lg-text-title1">{testimonial.rating} Stars</div>
                                            <VerticalSpacer className="tw-h-1" />
                                            <div className="tw-flex tw-flex-row tw-gap-[2px] ">
                                                <ItemBuilder
                                                    items={getIntegerArrayOfLength(5)}
                                                    itemBuilder={(_, itemIndex) => (
                                                        <StarFill
                                                            className={concatenateNonNullStringsWithSpaces(
                                                                "tw-w-4 tw-h-4",
                                                                itemIndex < testimonial.rating ? "lg-text-primary-500" : "lg-text-secondary-100",
                                                            )}
                                                            key={itemIndex}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="tw-col-start-1 tw-row-start-2 tw-flex tw-flex-col tw-gap-1 tw-justify-start">
                                        <div className="lg-text-title1">{testimonial.name}</div>

                                        <div className="lg-text-body-bold">{testimonial.state}</div>

                                        <div className="tw-flex tw-flex-row tw-gap-[2px] ">
                                            <ItemBuilder
                                                items={getIntegerArrayOfLength(5)}
                                                itemBuilder={(_, itemIndex) => (
                                                    <StarFill
                                                        className={concatenateNonNullStringsWithSpaces(
                                                            "tw-w-2 tw-h-2",
                                                            itemIndex < testimonial.rating ? "lg-text-primary-500" : "lg-text-secondary-300",
                                                        )}
                                                        key={itemIndex}
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <div className="tw-col-start-2 tw-row-start-2 tw-justify-end tw-flex">
                                        <FixedWidthImage
                                            relativePath={testimonial.productImage}
                                            width="100px"
                                        />
                                    </div>

                                    <div className="tw-col-start-1 tw-col-span-full tw-row-start-3 tw-h-full tw-w-full">
                                        <div className="lg-text-body tw-text-left tw-flex-1">{testimonial.message}</div>
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
