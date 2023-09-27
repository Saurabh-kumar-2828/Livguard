import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import {DefaultImageAnimation} from "~/components/defaultImageAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useEmblaCarouselWithIndex} from "~/hooks/useEmblaCarouselWithIndex";
import {UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";

export function CarouselStyle1({userPreferences, items}: {userPreferences: UserPreferences; items: Array<{imageRelativePath: string; titleTextContentPiece: string; bodyTextContentPiece: string}>}) {
    const {emblaRef, emblaApi, selectedIndex} = useEmblaCarouselWithIndex({loop: true}, 8000);

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
                                className="tw-w-full tw-h-full lg-bg-secondary-100 tw-p-4 tw-flex tw-flex-col tw-rounded-lg tw-items-center tw-text-center"
                                key={itemIndex}
                            >
                                <DefaultImageAnimation>
                                    <FullWidthImage relativePath={item.imageRelativePath} />
                                </DefaultImageAnimation>

                                <VerticalSpacer className="tw-h-4" />

                                <DefaultTextAnimation>
                                    <div className="lg-text-title1">{getVernacularString(item.titleTextContentPiece, userPreferences.language)}</div>
                                </DefaultTextAnimation>

                                <VerticalSpacer className="tw-h-2" />

                                <DefaultTextAnimation className="tw-flex-1">
                                    <div className="lg-text-body lg-text-secondary-700">{getVernacularString(item.bodyTextContentPiece, userPreferences.language)}</div>
                                </DefaultTextAnimation>

                                <VerticalSpacer className="tw-h-4" />

                                <div className="tw-w-full tw-flex tw-flex-row tw-justify-between tw-items-center">
                                    <button
                                        type="button"
                                        className="tw-rounded-full tw-p-1 tw-border tw-border-solid tw-border-secondary-900-light dark:tw-border-secondary-900-dark"
                                        onClick={() => {
                                            emblaApi?.scrollPrev();
                                        }}
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
                                        className="tw-rounded-full tw-p-1 tw-border tw-border-solid tw-border-secondary-900-light dark:tw-border-secondary-900-dark tw-bg-secondary-100-light tw-mt-[0.4px]"
                                        onClick={() => {
                                            emblaApi?.scrollNext();
                                        }}
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
