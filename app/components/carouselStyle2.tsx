import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import {DefaultImageAnimation} from "~/components/defaultImageAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useEmblaCarouselWithIndex} from "~/hooks/useEmblaCarouselWithIndex";
import {UserPreferences} from "~/typeDefinitions";
import {useContext} from "react";
import {ContentProviderContext} from "~/contexts/contentProviderContext";

export function CarouselStyle2({
    userPreferences,
    items,
    className,
}: {
    userPreferences: UserPreferences;
    items: Array<{imageRelativePath: string; titleTextContentPiece: string; bodyTextContentPiece: string}>;
    className?: string;
}) {
    const {emblaRef, emblaApi, selectedIndex} = useEmblaCarouselWithIndex({loop: true}, 8000);
    const contentData = useContext(ContentProviderContext);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-overflow-hidden", className)}
            ref={emblaRef}
        >
            <div className="tw-grid tw-grid-flow-col tw-auto-cols-[100%] lg:tw-auto-cols-[calc(100%-4rem)] tw-text-secondary-900-dark">
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
                                    <div className="lg-text-title1 [@media(min-width:1024px)]:lg-text-title2 xl:lg-text-title2 tw-whitespace-pre-line tw-text-secondary-900-dark">
                                        {contentData.getContent(item.titleTextContentPiece)}
                                    </div>
                                </DefaultTextAnimation>

                                <DefaultTextAnimation className="tw-row-start-6 tw-col-start-2">
                                    <div className="lg-text-body !tw-text-secondary-900-dark">{contentData.getContent(item.bodyTextContentPiece)}</div>
                                </DefaultTextAnimation>
                            </div>
                        </div>
                    )}
                />
            </div>
        </div>
    );
}
