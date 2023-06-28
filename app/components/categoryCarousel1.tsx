import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import Autoplay from "embla-carousel-autoplay";
import {EmpowerYourHomeComponent} from "~/components/category/common";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useEmblaCarouselWithIndex} from "~/hooks/useEmblaCarouselWithIndex";
import {UserPreferences} from "~/typeDefinitions";

export function CategoryCarousel1({userPreferences, items, className}: {userPreferences: UserPreferences; items: Array<{imageRelativePath: string; titleTextContentPiece: string; bodyTextContentPiece: string}>; className?: string}) {
    const {emblaRef, emblaApi, selectedIndex} = useEmblaCarouselWithIndex({loop: true}, 8000);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-overflow-hidden", className)}
            ref={emblaRef}
        >
            <div className="tw-grid tw-grid-flow-col tw-auto-cols-[100%]">
                <ItemBuilder
                    items={items}
                    itemBuilder={(item, itemIndex) => (
                        <div
                            className="lg-px-screen-edge"
                            key={itemIndex}
                        >
                            <div
                                className="tw-w-full tw-h-full tw-flex tw-flex-col tw-items-center tw-text-center"
                                key={itemIndex}
                            >
                                <DefaultElementAnimation>
                                    <EmpowerYourHomeComponent
                                        userPreferences={userPreferences}
                                        item={item}
                                    />
                                </DefaultElementAnimation>
                            </div>

                            <VerticalSpacer className="tw-h-4" />
                        </div>
                    )}
                />
            </div>

            <VerticalSpacer className="tw-h-2" />

            <div className="tw-w-full tw-flex tw-flex-row tw-justify-between tw-items-center lg:tw-justify-center lg:tw-gap-10 lg-px-screen-edge">
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
    );
}
