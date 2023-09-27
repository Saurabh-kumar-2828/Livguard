import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import Autoplay from "embla-carousel-autoplay";
import {useEffect, useState} from "react";
import {number} from "zod";
import {EmpowerYourHomeComponent} from "~/components/category/common";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {FixedWidthImage} from "~/components/images/fixedWidthImage";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useEmblaCarouselWithIndex} from "~/hooks/useEmblaCarouselWithIndex";
import {UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";

export function ComboCarousel({
    userPreferences,
    items,
}: {
    userPreferences: UserPreferences;
    items: Array<{
        title: string;
        description: string;
        keySpecifications: Array<{keySpecificationContent: string; keySpecificationIconRelativePath: string}>;
        comboImageRelativePath: string;
    }>;
}) {
    const {emblaRef, emblaApi, selectedIndex} = useEmblaCarouselWithIndex({loop: true}, 8000, 6000);

    return (
        <div
            className="tw-overflow-hidden tw-w-full"
            ref={emblaRef}
        >
            <div className="tw-grid tw-grid-flow-col tw-auto-cols-[100%] lg:tw-auto-cols-[min(50%,47rem)] tw-pt-2">
                <ItemBuilder
                    items={items}
                    itemBuilder={(item, itemIndex) => (
                        <div
                            className="lg-px-screen-edge tw-h-full tw-flex tw-flex-col lg-card-shadow"
                            key={itemIndex}
                        >
                            <div
                                className="tw-w-full tw-flex tw-flex-col tw-h-full"
                                key={itemIndex}
                            >
                                <DefaultElementAnimation className="tw-h-full">
                                    <div className="tw-flex tw-flex-col [@media(max-width: 1080px)]:tw-items-center tw-text-center lg-bg-secondary-100 tw-rounded-lg tw-p-4 lg:tw-px-8 tw-w-full tw-h-full">
                                        <VerticalSpacer className="tw-h-4" />
                                        <div className="tw-hidden lg:tw-block tw-text-left lg-text-titile1">
                                            <div
                                                dangerouslySetInnerHTML={{__html: getVernacularString("landingPage2S4HT1", userPreferences.language)}}
                                                className="lg:lg-text-title1"
                                            />

                                            <div
                                                dangerouslySetInnerHTML={{__html: getVernacularString("landingPage2S4HT2", userPreferences.language)}}
                                                className="lg:lg-text-title1"
                                            />
                                        </div>

                                        <VerticalSpacer className="tw-h-4" />

                                        <div className="lg-text-title1 lg:tw-text-left lg:lg-text-title2">{item.title}</div>

                                        <VerticalSpacer className="tw-h-4" />

                                        <div className="lg-text-body tw-flex-1 lg:tw-text-left">{item.description}</div>

                                        <VerticalSpacer className="tw-h-6" />

                                        <div className="lg-text-title2 lg:tw-text-left">{`${getVernacularString("landingPage2S4KeySpecificationTitle", userPreferences.language)}`}</div>

                                        <VerticalSpacer className="tw-h-6" />

                                        <div className="tw-grid tw-grid-rows-[auto_auto] tw-grid-cols-1 lg:tw-grid-cols-[minmax(0,3fr),minmax(0,2fr)] lg:tw-grid-rows-1 tw-gap-y-2">
                                            <div className="tw-row-start-1 lg:tw-row-start-1 lg:tw-col-start-1 tw-grid tw-grid-cols-[minmax(0,1fr),minmax(0,1fr)] tw-grid-rows-[repeat(2,minmax(0,max-content))] tw-gap-x-3 tw-gap-y-8 tw-max-h-fit">
                                                <ItemBuilder
                                                    items={item.keySpecifications}
                                                    itemBuilder={(keySpecification, keySpecificationIndex) => (
                                                        <div
                                                            className={`tw-row-start-${keySpecificationIndex <= 1 ? "1" : "2"} tw-col-start-${
                                                                (keySpecificationIndex % 2) + 1
                                                            } tw-flex tw-flex-row tw-items-start tw-justify-start tw-gap-3 tw-mx-auto tw-w-[120px]`}
                                                            key={keySpecificationIndex}
                                                        >
                                                            <div className="tw-flex tw-min-w-[2.5rem] tw-h-10 tw-rounded-full lg-bg-primary-500 tw-items-center tw-justify-center">
                                                                <FixedWidthImage
                                                                    relativePath={keySpecification.keySpecificationIconRelativePath}
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

                                            {/* <VerticalSpacer className="tw-h-4" /> */}

                                            <div className="tw-row-start-2 lg:tw-row-start-1 lg:tw-col-start-2 tw-mx-12">
                                                <FullWidthImage relativePath={item.comboImageRelativePath} />
                                            </div>
                                        </div>
                                    </div>
                                </DefaultElementAnimation>

                                <VerticalSpacer className="tw-h-4" />
                            </div>
                        </div>
                    )}
                />
            </div>

            <VerticalSpacer className="tw-h-4" />

            <div className="tw-flex tw-justify-center">
                <div className="lg:tw-w-[15rem] tw-flex tw-flex-row tw-justify-between tw-gap-x-10 tw-items-center">
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
                                    className={concatenateNonNullStringsWithSpaces("tw-w-2 tw-h-2 tw-rounded-full", scrollSnapIndex == selectedIndex ? "lg-bg-secondary-900" : "lg-bg-secondary-300")}
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
            {/* { timerProgress>=0 &&<div>{timerProgress}%</div>} */}
        </div>
    );
}
