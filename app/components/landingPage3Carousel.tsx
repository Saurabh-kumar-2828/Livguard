import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import Autoplay from "embla-carousel-autoplay";
import {EmpowerYourHomeComponent} from "~/components/category/common";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
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

export function LandingPage3Carousel({
    userPreferences,
    items,
}: {
    userPreferences: UserPreferences;
    items: Array<{imageRelativePath: string; titleTextContentPiece: string; bodyTextContentPiece: string}>;
}) {
    const {emblaRef, emblaApi, selectedIndex} = useEmlbaCarouselWithIndex({loop: true}, 3000);

    return (
        <div
            className="tw-overflow-hidden tw-w-full"
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
                                    <div className="tw-row-start-2 lg:tw-col-start-1 tw-text-center lg:te-text-left">
                                        <DefaultTextAnimation>
                                            <div className="lg-text-title1">{getVernacularString(item.titleTextContentPiece, userPreferences.language)}</div>
                                        </DefaultTextAnimation>

                                        <div className="tw-h-2" />

                                        <DefaultTextAnimation className="tw-flex-1">
                                            <div className="lg-text-body lg-text-secondary-700 tw-flex-1">{getVernacularString(item.bodyTextContentPiece, userPreferences.language)}</div>
                                        </DefaultTextAnimation>
                                    </div>
                                    <VerticalSpacer className="tw-h-4" />
                                    <div className="tw-row-start-1 lg:tw-col-start-2 lg:tw-row-start-1">
                                        <DefaultImageAnimation>
                                            <FullWidthImage
                                                relativePath={item.imageRelativePath}
                                                imageCdnProvider={ImageCdnProvider.GrowthJockey}
                                                className="tw-rounded-lg"
                                            />
                                        </DefaultImageAnimation>
                                    </div>
                                </DefaultElementAnimation>

                                <VerticalSpacer className="tw-h-4" />

                                <div className="tw-w-full tw-flex tw-flex-row tw-justify-between tw-items-center">
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
                                                    className={concatenateNonNullStringsWithSpaces(
                                                        "tw-w-2 tw-h-2 tw-rounded-full",
                                                        scrollSnapIndex == selectedIndex ? "lg-bg-secondary-900" : "lg-bg-secondary-300",
                                                    )}
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

                            <VerticalSpacer className="tw-h-4" />
                        </div>
                    )}
                />
            </div>
        </div>
    );
}
