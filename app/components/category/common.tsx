import {CheckCircleIcon, XCircleIcon} from "@heroicons/react/20/solid";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultImageAnimation} from "~/components/defaultImageAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {FixedWidthImage} from "~/global-common-typescript/components/fixedWidthImage";
import {FullWidthImage} from "~/global-common-typescript/components/fullWidthImage";
import {ImageCdnProvider} from "~/global-common-typescript/components/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";


export function EmpowerYourHomeComponent({
    userPreferences,
    item,
}: {
    userPreferences: UserPreferences;
    item: {imageRelativePath: string; titleTextContentPiece: string; bodyTextContentPiece: string};
}) {
    return (
        <div className="tw-grid tw-grid-cols-1 tw-grid-rows-[auto,minmax(0,1fr)] tw-gap-6 lg:tw-grid-cols-[minmax(0,3fr),minmax(0,5fr)] lg:tw-grid-rows-1 lg:tw-gap-10 tw-items-center tw-justify-center">
            <div className="tw-row-start-1 lg:tw-col-start-1 tw-text-center lg:te-text-left">
                <DefaultTextAnimation>
                    <div className="lg-text-title1">{getVernacularString(item.titleTextContentPiece, userPreferences.language)}</div>
                </DefaultTextAnimation>

                <div className="tw-h-2" />

                <DefaultTextAnimation className="tw-flex-1">
                    <div className="lg-text-body lg-text-secondary-700">{getVernacularString(item.bodyTextContentPiece, userPreferences.language)}</div>
                </DefaultTextAnimation>
            </div>
            <div className="tw-row-start-2 lg:tw-col-start-2 lg:tw-row-start-1">
                <DefaultImageAnimation>
                    <FullWidthImage
                        relativePath={item.imageRelativePath}
                        imageCdnProvider={ImageCdnProvider.GrowthJockey}
                        className="tw-rounded-lg"
                    />
                </DefaultImageAnimation>
            </div>
        </div>
    );
}


export function OurSuggestionsComponent({
    vernacularContent,
    backgroundColor,
}: {
    vernacularContent: {
        heading: string;
        description: string;
        specificationHeading: string;
        keySpecifications: Array<{keySpecificationTitle: string; keySpecificationContent: string; keySpecificationIconRelativePath: string}>;
        imageRelativePath: string;
    };
    backgroundColor: string;
}) {
    return (
        <div className={`tw-flex tw-flex-col tw-rounded-lg tw-w-full lg-bg-${backgroundColor}`}>
            <VerticalSpacer className="tw-h-8" />

            <DefaultTextAnimation>
                <div className="lg-text-title1 tw-text-center">{vernacularContent.heading}</div>
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-4" />

            <DefaultTextAnimation>
                <div className="tw-text-body tw-text-center">{vernacularContent.description}</div>
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-10" />

            <DefaultTextAnimation>
                <div className="lg-text-title1 tw-text-center">{vernacularContent.specificationHeading}</div>
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-4" />

            <div className="tw-grid tw-grid-cols-[minmax(0,1fr),minmax(0,1fr)] tw-grid-rows-[minmax(0,1fr),minmax(0,1fr)] tw-gap-x-3 tw-gap-y-10">
                <ItemBuilder
                    items={vernacularContent.keySpecifications}
                    itemBuilder={(keySpecification, keySpecificationIndex) => (
                        <div className={`tw-row-start-${keySpecificationIndex / 2 + 1} tw-col-start-${(keySpecificationIndex % 2) + 1} tw-flex tw-flex-row tw-items-between tw-gap-3 tw-mx-auto`}>
                            <div
                                className={`tw-flex tw-w-8 tw-h-8 tw-rounded-full tw-items-center tw-justify-center ${backgroundColor == "primary-500" ? "lg-bg-secondary-100" : "lg-bg-primary-500"}`}
                            >
                                <FixedWidthImage
                                    relativePath={keySpecification.keySpecificationIconRelativePath}
                                    imageCdnProvider={ImageCdnProvider.GrowthJockey}
                                    width="1.5rem"
                                    className="tw-place-self-center"
                                />
                            </div>

                            <div className="tw-flex tw-flex-col tw-gap-1">
                                <div className="lg-text-body tw-font-bold">{keySpecification.keySpecificationTitle}</div>
                                <div className="lg-text-body">{keySpecification.keySpecificationContent}</div>
                            </div>
                        </div>
                    )}
                />
            </div>

            <VerticalSpacer className="tw-h-4" />

            <div className="tw-rounded-lg tw-translate-y-8 tw-mx-12">
                <FullWidthImage
                    relativePath={vernacularContent.imageRelativePath}
                    imageCdnProvider={ImageCdnProvider.GrowthJockey}
                />
            </div>
        </div>
    );
}

export function ProductCardComponent({
    vernacularContent,
    userPreferences,
}: {
    vernacularContent: {
        title: string;
        imageRelativePath: string;
        buttonText: string;
        bestseller: boolean;
    };
    userPreferences: UserPreferences;
}) {
    return (
        <div className="tw-flex tw-flex-col tw-justify-between tw-relative tw-px-3 tw-rounded-lg lg-bg-secondary-100">
            {vernacularContent.bestseller && (
                <div className="tw-absolute tw-right-0 tw-top-0 lg-text-icon tw-px-2 tw-rounded-tr-lg lg-bg-primary-500 lg-text-secondary-900 tw-pt-[2px]"> Best Seller </div>
            )}

            <VerticalSpacer className="tw-h-8" />

            <DefaultTextAnimation>
                <div className="tw-text-body tw-text-center">{vernacularContent.title}</div>
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-4" />

            <DefaultImageAnimation>
                <div className="tw-px-4 tw-rounded-lg">
                    <FullWidthImage
                        relativePath={vernacularContent.imageRelativePath}
                        imageCdnProvider={ImageCdnProvider.GrowthJockey}
                    />
                </div>
            </DefaultImageAnimation>

            <VerticalSpacer className="tw-h-1" />

            <DefaultElementAnimation>
                <div className="lg-cta-button tw-translate-y-4 tw-px-4 tw-text-center tw-items-center">{getVernacularString(vernacularContent.buttonText, userPreferences.language)}</div>
            </DefaultElementAnimation>
        </div>
    );
}

export function WhatsBestForYouComponent({
    vernacularContent,
}: {
    vernacularContent: {
        description: string;
        downloadButtons: Array<{iconRelativePath: string; text: string; downloadLink: string}>;
        buttonText: string;
    };
}) {
    return (
        <div className="tw-flex tw-flex-col tw-justify-between tw-items-center">
            <DefaultTextAnimation>
                <div className="lg-text-body tw-text-center">{vernacularContent.description}</div>
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-4" />

            <DefaultElementAnimation>
                <div className="tw-grid tw-grid-cols-[minmax(0,1fr),minmax(0,1fr)] tw-gap-3 tw-h-full">
                    <ItemBuilder
                        items={vernacularContent.downloadButtons}
                        itemBuilder={(downloadButton, downloadButtonIndex) => (
                            <a
                                href={downloadButton.downloadLink}
                                key={downloadButtonIndex}
                                download
                                target={"_blank"}
                            >
                                <div className={`tw-col-start-${downloadButtonIndex + 1} tw-flex tw-flex-row lg-bg-secondary-100 tw-rounded-lg tw-p-4 tw-justify-start tw-items-center tw-gap-3`}>
                                    <div className="tw-h-8 tw-min-w-[32px]">
                                        <FullWidthImage
                                            relativePath={downloadButton.iconRelativePath}
                                            imageCdnProvider={ImageCdnProvider.GrowthJockey}
                                        />
                                    </div>
                                    <div className="lg-text-title2">{downloadButton.text}</div>
                                </div>
                            </a>
                        )}
                    />
                </div>
            </DefaultElementAnimation>

            <VerticalSpacer className="tw-h-4" />

            <DefaultElementAnimation>
                <div className="lg-cta-button">{vernacularContent.buttonText}</div>
            </DefaultElementAnimation>
        </div>
    );
}

export function ProductOverviewComponent({
    vernacularContent,
    className,
}: {
    vernacularContent: {
        heading: string;
        image: string;
        features: Array<{title: string; highlighted: boolean}>;
    };
    className: string;
}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-flex tw-flex-col tw-justify-between tw-px-4 lg-bg-secondary-100 tw-rounded-lg", className)}>
            <div className="lg-bg-secondary-500 tw-rounded-lg -tw-translate-x-5"></div>

            <VerticalSpacer className="tw-h-4" />

            <div className="lg-text-title2">{vernacularContent.heading}</div>

            <VerticalSpacer className="tw-h-4" />

            <div className="tw-flex tw-flex-col">
                <ItemBuilder
                    items={vernacularContent.features}
                    itemBuilder={(feature, featureIndex) => (
                        <div
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-flex tw-flex-row tw-py-1 tw-justify-between tw-items-center",
                                `${featureIndex == vernacularContent.features.length - 1 ? "" : "tw-border-b"}`,
                            )}
                        >
                            <div className="lg-text-body">{feature.title}</div>
                            <div className="tw-w-5">
                                {feature.highlighted ? (
                                    <CheckCircleIcon className="tw-h-5 tw-w-5 lg-text-primary-500 tw-rounded-full -tw-translate-y-[.10rem]" />
                                ) : (
                                    <XCircleIcon className="tw-h-5 tw-w-5 lg-text-secondary-500 tw-rounded-full -tw-translate-y-[.10rem]" />
                                )}
                            </div>
                        </div>
                    )}
                />
            </div>

            <VerticalSpacer className="tw-h-4" />
        </div>
    );
}
