import {Features} from "@headlessui/react/dist/utils/render";
import {CheckCircleIcon, XCircleIcon} from "@heroicons/react/20/solid";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";


export function EmpowerYourHomeComponent({vernacularContent}: {vernacularContent: {heading: string; description: string; image: string}}) {
    return (
        <div className="tw-grid tw-grid-cols-1 tw-grid-rows-[auto,minmax(0,1fr)] tw-gap-6 lg:tw-grid-cols-[minmax(0,3fr),minmax(0,5fr)] lg:tw-grid-rows-1 lg:tw-gap-10 tw-items-center tw-justify-center">
            <div className="tw-row-start-1 lg:tw-col-start-1 tw-text-center lg:te-text-left">
                <div className="tw-text-title1">{vernacularContent.heading}</div>

                <div className="tw-h-2" />

                <div className="tw-text-body">{vernacularContent.description}</div>
            </div>
            <div className="tw-row-start-2 lg:tw-col-start-2 lg:tw-row-start-1">
                <div className="lg-bg-secondary-500 tw-rounded-lg tw-w-full tw-h-[250px] lg:tw-h-[400px]"></div>
            </div>
        </div>
    );
}


export function OurSegestionsComponent({
    vernacularContent,
    backgroundColor,
}: {
    vernacularContent: {
        heading: string;
        description: string;
        specificationHeading: string;
        keySpecifications: Array<{keySpecificationTitle: string; keySpecificationContent: string; keySpecificationIcon: string}>;
        image: string;
    };
    backgroundColor: string;
}) {
    return (
        <div className={`tw-flex tw-flex-col tw-rounded-lg tw-w-full lg-bg-${backgroundColor}`}>
            <VerticalSpacer className="tw-h-8" />

            <div className="lg-text-title1 tw-text-center">{vernacularContent.heading}</div>

            <VerticalSpacer className="tw-h-4" />

            <div className="tw-text-body tw-text-center">{vernacularContent.description}</div>

            <VerticalSpacer className="tw-h-10" />

            <div className="lg-text-title1 tw-text-center">{vernacularContent.specificationHeading}</div>

            <VerticalSpacer className="tw-h-4" />

            <div className="tw-grid tw-grid-cols-[minmax(0,1fr),minmax(0,1fr)] tw-grid-rows-[minmax(0,1fr),minmax(0,1fr)] tw-gap-x-3 tw-gap-y-10">
                <ItemBuilder
                    items={vernacularContent.keySpecifications}
                    itemBuilder={(keySpecification, keySpecificationIndex) => (
                        <div className={`tw-row-start-${keySpecificationIndex / 2 + 1} tw-col-start-${(keySpecificationIndex % 2) + 1} tw-flex tw-flex-row tw-items-between tw-gap-3 tw-mx-auto`}>
                            <div className="tw-w-6 tw-h-6 lg-bg-secondary-500 tw-rounded-full"></div>

                            <div className="tw-flex tw-flex-col tw-gap-1">
                                <div className="lg-text-body tw-font-bold">{keySpecification.keySpecificationTitle}</div>
                                <div className="lg-text-body">{keySpecification.keySpecificationContent}</div>
                            </div>
                        </div>
                    )}
                />
            </div>

            <VerticalSpacer className="tw-h-10" />

            <div className="lg-bg-secondary-500 tw-h-[150px] tw-rounded-lg tw-translate-y-8 tw-mx-4"></div>
        </div>

        // <div className="tw-grid tw-grid-cols-1 tw-grid-rows-[minmax(0,1fr),minmax(0,1fr)] tw-gap-6 lg:tw-grid-cols-[minmax(0,3fr),minmax(0,5fr)] lg:tw-grid-rows-1 lg:tw-gap-10 tw-items-center tw-justify-center">
        //     <div className="tw-row-start-1 lg:tw-col-start-1 tw-text-center lg:te-text-left">
        //         <div className="tw-text-title1">{vernacularContent.heading}</div>
        //         <div className="tw-text-body">{vernacularContent.description}</div>
        //     </div>
        //     <div className="tw-row-start-2 lg:tw-col-start-2 lg:tw-row-start-1">
        //         <div className="lg-bg-secondary-500 tw-rounded-lg tw-w-full tw-h-[250px] lg:tw-h-[400px]"></div>
        //     </div>
        // </div>
    );
}

export function ProductCardComponent({
    vernacularContent,
}: {
    vernacularContent: {
        title: string;
        image: string;
        buttonText: string;
        bestseller: boolean;
    };
}) {
    return (
        <div className="tw-flex tw-flex-col tw-justify-between tw-relative tw-px-3 tw-rounded-lg lg-bg-secondary-100">
            {vernacularContent.bestseller && (
                <div className="tw-absolute tw-right-0 tw-top-0 lg-text-icon tw-px-2 tw-rounded-tr-lg lg-bg-primary-500 lg-text-secondary-900 tw-pt-[2px]"> Best Seller </div>
            )}

            <VerticalSpacer className="tw-h-8" />

            <div className="tw-text-body tw-text-center">{vernacularContent.title}</div>

            <VerticalSpacer className="tw-h-4" />

            <div className="tw-w-full tw-h-[100px] lg-bg-secondary-500 tw-rounded-lg"></div>

            <VerticalSpacer className="tw-h-4" />

            <div className="lg-cta-button tw-translate-y-4 tw-px-4 tw-text-center tw-items-center">{vernacularContent.buttonText}</div>
        </div>
    );
}

export function WhatsBestForYouComponent({
    vernacularContent,
}: {
    vernacularContent: {
        description: string;
        downloadButtons: Array<{icon: string; text: string}>;
        buttonText: string;
    };
}) {
    return (
        <div className="tw-flex tw-flex-col tw-justify-between tw-items-center">
            <div className="lg-text-body tw-text-center">{vernacularContent.description}</div>

            <VerticalSpacer className="tw-h-4" />

            <div className="tw-grid tw-grid-cols-[minmax(0,1fr),minmax(0,1fr)] tw-gap-3">
                <ItemBuilder
                    items={vernacularContent.downloadButtons}
                    itemBuilder={(downloadButton, downloadButtonIndex) => (
                        <div
                            className={`tw-col-start-${downloadButtonIndex + 1} tw-flex tw-flex-row lg-bg-secondary-100 tw-rounded-lg tw-p-4 tw-justify-start tw-items-center tw-gap-3`}
                            key={downloadButtonIndex}
                        >
                            <div className="tw-h-8 tw-min-w-[32px] lg-bg-secondary-500 tw-rounded-full"></div>
                            <div className="lg-text-title2">{downloadButton.text}</div>
                        </div>
                    )}
                />
            </div>

            <VerticalSpacer className="tw-h-4" />

            <div className="lg-cta-button">{vernacularContent.buttonText}</div>
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
    console.log(vernacularContent.features.length);
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
        </div>
    );
}

export function dummy({userPreferences, vernacularContent}: {userPreferences: UserPreferences; vernacularContent: any}) {
    return (
        <div className="tw-grid tw-grid-cols-1 tw-grid-rows-[minmax(0,1fr),minmax(0,1fr)] tw-gap-6 lg:tw-grid-cols-[minmax(0,3fr),minmax(0,5fr)] lg:tw-grid-rows-1 lg:tw-gap-10 tw-items-center tw-justify-center">
            <div className="tw-row-start-1 lg:tw-col-start-1 tw-text-center lg:te-text-left">
                <div className="tw-text-title1">{vernacularContent.heading}</div>
                <div className="tw-text-body">{vernacularContent.description}</div>
            </div>
            <div className="tw-row-start-2 lg:tw-col-start-2 lg:tw-row-start-1">
                <div className="lg-bg-secondary-500 tw-rounded-lg tw-w-full tw-h-[250px] lg:tw-h-[400px]"></div>
            </div>
        </div>
    );
}


