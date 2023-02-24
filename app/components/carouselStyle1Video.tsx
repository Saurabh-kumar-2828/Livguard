import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import Autoplay from "embla-carousel-autoplay";
import {DefaultImageAnimation} from "~/components/defaultImageAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {EmbeddedYoutubeVideo} from "~/components/embeddedYoutubeVideo";
import {FullWidthImage} from "~/global-common-typescript/components/fullWidthImage";
import {getAbsolutePathForRelativePath, ImageCdnProvider} from "~/global-common-typescript/components/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useEmlbaCarouselWithIndex} from "~/hooks/useEmlbaCarouselWithIndex";
import {UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";

export function CarouselStyle1Video({
    userPreferences,
    items,
}: {
    userPreferences: UserPreferences;
    items: Array<{youtubeVideoId: string; videoAspectRatio: string; titleTextContentPiece: string; bodyTextContentPiece: string}>;
}) {
    const {emblaRef, emblaApi, selectedIndex} = useEmlbaCarouselWithIndex({loop: true});

    return (
        <div
            className="tw-overflow-hidden"
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
                                className="tw-w-full tw-h-full lg-bg-secondary-100 lg:lg-bg-background-500 tw-p-4 tw-grid tw-grid-rows-[auto_auto_auto] tw-grid-cols-1 lg:tw-grid-rows-[auto_auto] lg:tw-grid-cols-2 tw-gap-x-12 tw-gap-y-4 tw-rounded-lg tw-items-center tw-text-center lg:tw-text-left"
                                key={itemIndex}
                            >
                                <DefaultImageAnimation className="tw-row-start-1 tw-col-start-1 lg:tw-row-start-1 lg:tw-col-start-1 tw-w-full">
                                    <EmbeddedYoutubeVideo
                                        id={item.youtubeVideoId}
                                        style={{aspectRatio: item.videoAspectRatio}}
                                    />
                                </DefaultImageAnimation>

                                <div className="tw-row-start-2 tw-col-start-1 lg:tw-row-start-1 lg:tw-col-start-2 tw-w-full tw-flex tw-flex-col tw-items-center tw-text-center lg:tw-text-left">
                                    <DefaultTextAnimation className="tw-row-start-2 tw-col-start-1 tw-w-full">
                                        <div className="lg-text-title1">{getVernacularString(item.titleTextContentPiece, userPreferences.language)}</div>
                                    </DefaultTextAnimation>

                                    <VerticalSpacer className="tw-row-start-3 tw-col-start-1 tw-h-2" />

                                    <DefaultTextAnimation className="tw-row-start-4 tw-col-start-1 tw-flex-1 tw-w-full">
                                        <div className="lg-text-body lg-text-secondary-700">{getVernacularString(item.bodyTextContentPiece, userPreferences.language)}</div>
                                    </DefaultTextAnimation>
                                </div>

                                <div className="tw-row-start-3 tw-col-start-1 lg:tw-row-start-2 lg:tw-col-start-1 lg:tw-col-span-2 tw-w-full tw-max-w-xs tw-justify-self-center tw-flex tw-flex-row tw-justify-between tw-items-center">
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
                        </div>
                    )}
                />
            </div>
        </div>
    );
}
