import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import Autoplay from "embla-carousel-autoplay";
import {DefaultImageAnimation} from "~/components/defaultImageAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {FullWidthImage} from "~/global-common-typescript/components/fullWidthImage";
import {ImageCdnProvider} from "~/global-common-typescript/components/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useEmlbaCarouselWithIndex} from "~/hooks/useEmlbaCarouselWithIndex";
import {UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";

export function CarouselStyle2({userPreferences, items}: {userPreferences: UserPreferences; items: Array<{imageRelativePath: string; titleTextContentPiece: string; bodyTextContentPiece: string}>}) {
    const {emblaRef, emblaApi, selectedIndex} = useEmlbaCarouselWithIndex({loop: true}, 3000);

    return (
        <div
            className="tw-overflow-hidden"
            ref={emblaRef}
        >
            <div className="tw-grid tw-grid-flow-col tw-auto-cols-[100%] tw-text-secondary-900-dark">
                <ItemBuilder
                    items={items}
                    itemBuilder={(item, itemIndex) => (
                        <div
                            className="tw-px-6"
                            key={itemIndex}
                        >
                            <div
                                className="tw-w-full tw-h-full tw-grid tw-grid-rows-[1.5rem_auto_1fr_auto_0_auto_1fr_1.5rem] tw-grid-cols-[1.5rem_minmax(0,1fr)_1.5rem]"
                                key={itemIndex}
                            >
                                <DefaultImageAnimation className="tw-row-start-1 tw-col-start-1 tw-row-span-full tw-col-span-full -tw-z-10">
                                    <FullWidthImage
                                        relativePath={item.imageRelativePath}
                                        className="tw-rounded-lg"
                                        imageCdnProvider={ImageCdnProvider.GrowthJockey}
                                    />
                                </DefaultImageAnimation>

                                <div className="tw-row-start-2 tw-col-start-2 tw-w-full tw-flex tw-flex-row tw-justify-end tw-items-center tw-gap-x-4">
                                    <button
                                        type="button"
                                        className="tw-rounded-full tw-p-1 tw-border tw-border-solid tw-border-secondary-900-dark"
                                        onClick={() => emblaApi?.scrollPrev()}
                                    >
                                        <ChevronLeftIcon className="tw-w-6 tw-h-6" />
                                    </button>

                                    <button
                                        type="button"
                                        className="tw-rounded-full tw-p-1 tw-border tw-border-solid tw-border-secondary-900-dark"
                                        onClick={() => emblaApi?.scrollNext()}
                                    >
                                        <ChevronRightIcon className="tw-w-6 tw-h-6" />
                                    </button>
                                </div>

                                <DefaultTextAnimation className="tw-row-start-4 tw-col-start-2">
                                    <div className="lg-text-title1 tw-whitespace-pre-line tw-text-secondary-900-dark">{getVernacularString(item.titleTextContentPiece, userPreferences.language)}</div>
                                </DefaultTextAnimation>

                                <DefaultTextAnimation className="tw-row-start-6 tw-col-start-2">
                                    <div className="lg-text-body !tw-text-secondary-900-dark">{getVernacularString(item.bodyTextContentPiece, userPreferences.language)}</div>
                                </DefaultTextAnimation>
                            </div>
                        </div>
                    )}
                />
            </div>
        </div>
    );
}
