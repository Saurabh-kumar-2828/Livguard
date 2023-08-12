import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useEmblaCarouselWithIndex} from "~/hooks/useEmblaCarouselWithIndex";
import {FixedWidthImage} from "./images/fixedWidthImage";

export function InTheNewsCarousel({
    items,
    className,
}: {
    items: Array<{
        imageRelativeUrl: string;
        imageSurroundingColor: string;
        title: string;
        link: string;
    }>;
    className?: string;
}) {
    const {emblaRef, emblaApi, selectedIndex} = useEmblaCarouselWithIndex({loop: true});

    return (
        <div className="tw-grid tw-grid-rows-[max-content,auto] lg:tw-grid-rows-1 tw-grid-cols-1 lg:tw-grid-cols-[minmax(0,2fr)_minmax(0,3fr)] tw-gap-x-12 tw-px-4 lg:tw-px-10 tw-py-6 lg-card">
            <div
                className="tw-hidden lg:tw-grid tw-row-start-1 lg:tw-col-start-1 tw-justify-center tw-items-center tw-rounded-lg"
                style={{
                    backgroundColor: items[selectedIndex].imageSurroundingColor,
                }}
            >
                <FixedWidthImage
                    width="15.625rem"
                    relativePath={items[selectedIndex].imageRelativeUrl}
                />
            </div>
            <div
                className="tw-grid lg:tw-hidden tw-row-start-1 lg:tw-col-start-1 tw-justify-center tw-items-center tw-rounded-lg tw-px-4 tw-py-10 tw-h-max"
                style={{
                    backgroundColor: items[selectedIndex].imageSurroundingColor,
                }}
            >
                <FixedWidthImage
                    width="10rem"
                    relativePath={items[selectedIndex].imageRelativeUrl}
                />
            </div>

            <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

            <div
                className={concatenateNonNullStringsWithSpaces("tw-row-start-2 lg:tw-row-start-1 lg:tw-col-start-2 tw-overflow-hidden lg:tw-py-10", className)}
                ref={emblaRef}
            >
                <div className="tw-grid tw-grid-flow-col tw-auto-cols-[100%]">
                    <ItemBuilder
                        items={items}
                        itemBuilder={(item, itemIndex) => (
                            <div
                                key={itemIndex}
                                className="tw-grid tw-items-center tw-justify-items-center"
                            >
                                <a
                                    className="lg-text-title1 lg-text-secondary-700 tw-text-center"
                                    href={item.link}
                                    target="_blank"
                                >
                                    "{item.title}"
                                </a>
                            </div>
                        )}
                    />
                </div>

                <VerticalSpacer className="tw-h-4" />

                <div className="tw-w-full tw-flex tw-flex-row tw-justify-between tw-items-center lg:tw-justify-center lg:tw-gap-10">
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
        </div>
    );
}
