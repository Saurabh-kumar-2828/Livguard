import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import {EmpowerYourHomeComponent} from "~/components/category/common";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {FixedWidthImage} from "~/global-common-typescript/components/fixedWidthImage";
import {FullWidthImage} from "~/global-common-typescript/components/fullWidthImage";
import {ImageCdnProvider} from "~/global-common-typescript/components/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useEmlbaCarouselWithIndex} from "~/hooks/useEmlbaCarouselWithIndex";
import {UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";

export function JodiCarousel({
    userPreferences,
    items,
}: {
    userPreferences: UserPreferences;
    items: Array<{
        title: string;
        description: string;
        keySpecifications: Array<{keySpecificationContent: string; keySpecificationIconRelativePath: string}>;
        jodiImageRelativePath: string;
    }>;
}) {
    const {emblaRef, emblaApi, selectedIndex} = useEmlbaCarouselWithIndex({loop: true});

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
                            className="lg-px-screen-edge tw-h-full"
                            key={itemIndex}
                        >
                            <div
                                className="tw-w-full tw-flex tw-flex-col tw-h-full"
                                key={itemIndex}
                            >
                                <DefaultElementAnimation className="tw-h-full">
                                    <div className="tw-flex tw-flex-col tw-items-center tw-text-center lg-bg-secondary-100 tw-rounded-lg tw-p-4 tw-w-full tw-h-full">
                                        <VerticalSpacer className="tw-h-4" />

                                        <div className="lg-text-title1">{item.title}</div>

                                        <VerticalSpacer className="tw-h-4" />

                                        <div className="lg-text-body tw-flex-1">{item.description}</div>

                                        <VerticalSpacer className="tw-h-6" />

                                        <div className="lg-text-title2">{`${getVernacularString("landingPage2S4KeySpecificationTitle", userPreferences.language)}`}</div>

                                        <VerticalSpacer className="tw-h-6" />

                                        <div className="tw-grid tw-grid-cols-[minmax(0,1fr),minmax(0,1fr)] tw-grid-rows-[minmax(0,1fr),minmax(0,1fr)] tw-gap-x-3 tw-gap-y-10">
                                            <ItemBuilder
                                                items={item.keySpecifications}
                                                itemBuilder={(keySpecification, keySpecificationIndex) => (
                                                    <div
                                                        className={`tw-row-start-${keySpecificationIndex / 2 + 1} tw-col-start-${
                                                            (keySpecificationIndex % 2) + 1
                                                        } tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-3 tw-mx-auto tw-w-[120px]`}
                                                    >
                                                        <div className="tw-flex tw-w-10 tw-h-10 tw-rounded-full lg-bg-primary-500 tw-items-center tw-justify-center">
                                                            <FixedWidthImage
                                                                relativePath={keySpecification.keySpecificationIconRelativePath}
                                                                imageCdnProvider={ImageCdnProvider.GrowthJockey}
                                                                width="1.5rem"
                                                            />
                                                        </div>

                                                        <div className="tw-flex tw-flex-col tw-gap-1 tw-justify-start">
                                                            <div className="lg-text-body tw-font-bold tw-text-left">{`${getVernacularString(
                                                                `landingPage2S4Specification${keySpecificationIndex + 1}Title`,
                                                                userPreferences.language,
                                                            )}`}</div>
                                                            <div className="lg-text-body tw-text-left">{keySpecification.keySpecificationContent}</div>
                                                        </div>
                                                    </div>
                                                )}
                                            />
                                        </div>

                                        <VerticalSpacer className="tw-h-4" />

                                        <div className="tw-mx-12 tw-flex-1">
                                            <FullWidthImage
                                                relativePath={item.jodiImageRelativePath}
                                                imageCdnProvider={ImageCdnProvider.GrowthJockey}
                                            />
                                        </div>
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
