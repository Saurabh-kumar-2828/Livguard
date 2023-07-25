import type {LinksFunction, LoaderFunction} from "@remix-run/node";
import React, {useReducer, useState} from "react";
import {useResizeDetector} from "react-resize-detector";
import {useLoaderData} from "react-router";
import {StickyBottomBar} from "~/components/bottomBar";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {FaqSectionInternal} from "~/components/faqs";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {PageScaffold} from "~/components/pageScaffold";
import {ProductCardFourDetails} from "~/components/reusable-components/productCardFourDetails";
import {ProductCardTwoDetails} from "~/components/reusable-components/productCardTwoDetails";
import {ButtonWithIconAndText, FancySearchableSelect} from "~/components/scratchpad";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {ProductType} from "~/productData";
import {DealerLocator} from "~/routes";
import {BatteryFinderAction, BatteryFinderActionType, batteryFinderInitialState, batteryFinderReducer} from "~/routes/battery-finder-staging/index.state";
import {BatteryFinderState, VehicleCategory, categories} from "~/routes/battery-finder-staging/index.types";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {UserPreferences} from "~/typeDefinitions";
import {appendSpaceToString, getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";

// export const meta: MetaFunction = ({data}: {data: LoaderData}) => {
//     const userPreferences: UserPreferences = data.userPreferences;
//     if (userPreferences.language == Language.English) {
//         return {
//             // TODO: This contains a space, hindi version does not. Why?
//             title: "Livguard : Buy inverter, batteries and all types of home energy storage solutions",
//             description: "Shop for the best range of inverters, batteries and energy storage solutions for your home with Livguard",
//             "og:title": "Livguard : Buy inverter, batteries and all types of home energy storage solutions",
//             "og:site_name": "Livguard",
//             "og:url": "https://www.livguard.com/",
//             "og:description": "Shop for the best range of inverters, batteries and energy storage solutions for your home with Livguard",
//             "og:type": "website",
//             "og:image": "https://growthjockey.imgix.net/livguard/home/3/2.jpg?w=764.140625",
//         };
//     } else if (userPreferences.language == Language.Hindi) {
//         return {
//             title: "लिवगार्ड: इनवर्टर, बैटरी और सभी प्रकार के ऊर्जा संग्रहण समाधान खरीदें",
//             description: "लिवगार्ड के साथ अपने घर के लिए इनवर्टर, बैटरी और ऊर्जा संग्रहण समाधानों की सर्वोत्तम श्रेणी की खरीदारी करें",
//             "og:title": "लिवगार्ड: इनवर्टर, बैटरी और सभी प्रकार के ऊर्जा संग्रहण समाधान खरीदें",
//             "og:site_name": "Livguard",
//             "og:url": "https://www.livguard.com/",
//             "og:description": "लिवगार्ड के साथ अपने घर के लिए इनवर्टर, बैटरी और ऊर्जा संग्रहण समाधानों की सर्वोत्तम श्रेणी की खरीदारी करें",
//             "og:type": "website",
//             "og:image": "https://growthjockey.imgix.net/livguard/home/3/2.jpg?w=764.140625",
//         };
//     } else {
//         throw Error(`Undefined language ${userPreferences.language}`);
//     }
// };

export const links: LinksFunction = () => {
    return [{rel: "canonical", href: "https://www.livguard.com/"}];
};

type LoaderData = {
    userPreferences: UserPreferences;
    redirectTo: string;
    pageUrl: string;
};

export const loader: LoaderFunction = async ({request}) => {
    const userPreferences = await getUserPreferencesFromCookiesAndUrlSearchParameters(request);
    if (userPreferences instanceof Error) {
        throw userPreferences;
    }

    const loaderData: LoaderData = {
        userPreferences: userPreferences,
        redirectTo: getRedirectToUrlFromRequest(request),
        pageUrl: getUrlFromRequest(request),
    };

    return loaderData;
};

export default function () {
    const {userPreferences, redirectTo, pageUrl} = useLoaderData() as LoaderData;

    const utmSearchParameters = useUtmSearchParameters();

    return (
        <>
            <PageScaffold
                userPreferences={userPreferences}
                redirectTo={redirectTo}
                showMobileMenuIcon={true}
                utmParameters={utmSearchParameters}
                breadcrumbs={[{contentId: "cfab263f-0175-43fb-91e5-fccc64209d36", link: "#"}]}
            >
                <BatteryFinder
                    userPreferences={userPreferences}
                    utmParameters={utmSearchParameters}
                    pageUrl={pageUrl}
                />
            </PageScaffold>

            <StickyBottomBar userPreferences={userPreferences} />
        </>
    );
}

function BatteryFinder({
    userPreferences,
    utmParameters,
    pageUrl,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
    pageUrl: string;
}) {
    const [batteryFinderState, dispatch] = useReducer(batteryFinderReducer, batteryFinderInitialState);

    return (
        <div className="tw-grid tw-grid-cols-1 tw-align-stretch tw-gap-y-10 lg:tw-gap-y-20 tw-pb-10 lg:tw-pb-20">
            <HeroSection
                userPreferences={userPreferences}
                utmParameters={utmParameters}
                pageUrl={pageUrl}
                className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
            />

            <ChooseYourVehicle
                userPreferences={userPreferences}
                pageUrl={pageUrl}
                batteryFinderState={batteryFinderState}
                dispatch={dispatch}
            />

            {batteryFinderState.recommendedBatteries == null ? null : (
                <RecommendedBatteries
                    userPreferences={userPreferences}
                    pageUrl={pageUrl}
                    batteryFinderState={batteryFinderState}
                    dispatch={dispatch}
                />
            )}

            <VehicleCategoryDetails
                userPreferences={userPreferences}
                pageUrl={pageUrl}
                batteryFinderState={batteryFinderState}
                dispatch={dispatch}
            />

            <div className="lg-px-screen-edge-2 tw-grid tw-grid-cols-1 lg:tw-grid-cols-3 tw-gap-x-8 tw-gap-y-10">
                <DealerLocator
                    userPreferences={userPreferences}
                    showCtaButton={true}
                    className="tw-w-full lg:tw-h-[36rem]"
                />

                <FaqSection
                    userPreferences={userPreferences}
                    className="lg:tw-col-span-2"
                />
            </div>
        </div>
    );
}

function HeroSection({
    userPreferences,
    utmParameters,
    className,
    pageUrl,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
    className?: string;
    pageUrl: string;
}) {
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-w-full tw-aspect-[2/1] lg:tw-aspect-[4/1] tw-relative tw-isolate",
                // "tw-w-full tw-aspect-[2/1] lg:tw-aspect-[4/1] lg-px-screen-edge tw-py-6 lg:tw-py-14 tw-grid tw-grid-rows-[auto_auto_1rem_auto_minmax(0,1fr)] lg:tw-grid-rows-[auto_auto_1rem_auto_minmax(0,1fr)] tw-text-center tw-relative tw-isolate",
                className,
            )}
            ref={ref}
        >
            {containerWidth == null || containerHeight == null ? null : (
                // <CoverImage
                //     relativePath={
                //         containerHeight > containerWidth || containerWidth < 640 ? "/livguard/stabilizer/1/stabilizer-banner-mobile.jpg" : "/livguard/stabilizer/1/stabilizer-banner-desktop.jpg"
                //     }
                //     className="tw-absolute tw-inset-0 -tw-z-10"
                //     key={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/stabilizer/1/stabilizer-banner-mobile.jpg" : "/livguard/stabilizer/1/stabilizer-banner-desktop.jpg"}
                // />
                <div className="tw-absolute tw-inset-0 -tw-z-10 lg-bg-primary-500" />
            )}

            {/* <DefaultTextAnimation className="tw-row-start-1 tw-col-start-1 lg-px-screen-edge-2 lg:tw-px-0">
                <div className="lg-text-banner tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">
                    {getVernacularString("dead4984-38fc-490e-8b38-0670a9a03631", userPreferences.language)}
                </div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-2 tw-col-start-1 lg-px-screen-edge-2 lg:tw-px-0">
                <div className="lg-text-banner tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">
                    {getVernacularString("e716f6b1-74ad-4087-80e1-fb88fb9a44ce", userPreferences.language)}
                </div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-3 tw-col-start-1 lg-px-screen-edge-2 lg:tw-px-0">
                <div className="lg-text-body !tw-text-secondary-900-dark">{getVernacularString("10653f56-45cc-4317-9951-d6db74523397", userPreferences.language)}</div>
            </DefaultTextAnimation> */}
        </div>
    );
}

function ChooseYourVehicle({
    userPreferences,
    pageUrl,
    batteryFinderState,
    dispatch,
    className,
}: {
    userPreferences: UserPreferences;
    pageUrl: string;
    batteryFinderState: BatteryFinderState;
    dispatch: React.Dispatch<BatteryFinderAction>;
    className?: string;
}) {
    return (
        <div className="lg-px-screen-edge-2 tw-z-10">
            <div className="tw-w-full tw-rounded-lg lg-bg-secondary-100 -tw-mt-16 lg:-tw-mt-28">
                <div className="tw-p-4 ">
                    <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

                    <div className="tw-w-full lg-text-title1 lg-text-secondary-900">{getVernacularString("454f7c18-bc20-49a9-a1f8-273420f2679b", userPreferences.language)}</div>

                    <VerticalSpacer className="tw-h-4" />

                    <div className="tw-grid tw-grid-cols-2 sm:tw-grid-cols-3 md:tw-grid-cols-6 tw-gap-x-3 tw-gap-y-3">
                        <ItemBuilder
                            items={categories}
                            itemBuilder={(item, itemIndex) => (
                                <ButtonWithIconAndText
                                    iconRelativePath={item.iconRelativePath}
                                    contentId={item.titleContentId}
                                    isSelected={batteryFinderState.selectedCategoryIndex == itemIndex}
                                    onClick={() =>
                                        dispatch({
                                            actionType: BatteryFinderActionType.setSelectedCategory,
                                            payload: itemIndex,
                                        })
                                    }
                                    userPreferences={userPreferences}
                                    key={itemIndex}
                                />
                            )}
                        />
                    </div>

                    <VerticalSpacer className="tw-h-6" />

                    <div className="lg:tw-grid lg:tw-grid-cols-4 lg:tw-grid-flow-col lg:tw-gap-x-6">
                        <div className="tw-flex tw-flex-col tw-w-full tw-z-10">
                            <div className="lg-text-body-bold tw-pl-3">{getVernacularString("18953b2c-d9bf-4992-bcbd-903f9c78c0e7", userPreferences.language)}</div>

                            <VerticalSpacer className="tw-h-1" />

                            <FancySearchableSelect
                                items={batteryFinderState.brands}
                                selectedItem={batteryFinderState.selectedBrand}
                                setSelectedItem={(item) =>
                                    dispatch({
                                        actionType: BatteryFinderActionType.setSelectedBrand,
                                        payload: item,
                                    })
                                }
                                filterFunction={(items, query) => items.filter((item) => item.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, "")))}
                                renderFunction={(item) => item}
                                placeholder="Select Brand"
                            />
                        </div>

                        <VerticalSpacer className="tw-h-2 lg:tw-hidden" />

                        <div className="tw-flex tw-flex-col tw-w-full tw-z-10">
                            <div className="lg-text-body-bold tw-pl-3">{getVernacularString("4990cdb1-9ee8-44d0-876f-3a668f2e7f9b", userPreferences.language)}</div>

                            <VerticalSpacer className="tw-h-1" />

                            <FancySearchableSelect
                                items={batteryFinderState.models}
                                selectedItem={batteryFinderState.selectedModel}
                                setSelectedItem={(item) =>
                                    dispatch({
                                        actionType: BatteryFinderActionType.setSelectedModel,
                                        payload: item,
                                    })
                                }
                                filterFunction={(items, query) => items.filter((item) => item.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, "")))}
                                renderFunction={(item) => item}
                                placeholder="Select Model"
                            />
                        </div>

                        <VerticalSpacer className="tw-h-2 lg:tw-hidden" />

                        <div className="tw-flex tw-flex-col tw-w-full tw-z-10">
                            <div className="lg-text-body-bold tw-pl-3">{getVernacularString("e2131e40-08cc-401d-958c-46baa3fa8642", userPreferences.language)}</div>

                            <VerticalSpacer className="tw-h-1" />

                            <FancySearchableSelect
                                items={batteryFinderState.fuelTypes}
                                selectedItem={batteryFinderState.selectedFuelType}
                                setSelectedItem={(item) =>
                                    dispatch({
                                        actionType: BatteryFinderActionType.setSelectedFuelType,
                                        payload: item,
                                    })
                                }
                                filterFunction={(items, query) => items.filter((item) => item.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, "")))}
                                renderFunction={(item) => item}
                                placeholder="Select Fuel Type"
                            />
                        </div>

                        <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

                        <div className="tw-flex tw-flex-col tw-w-full tw-z-10 tw-h-full">
                            {/* Quick Hack to make button height equal to select components */}
                            <div className="lg-text-body-bold tw-pl-3 tw-invisible">{getVernacularString("e2131e40-08cc-401d-958c-46baa3fa8642", userPreferences.language)}</div>

                            <VerticalSpacer className="tw-h-1" />

                            <button
                                type="button"
                                className="lg-cta-button tw-w-full tw-h-full tw-px-4 tw-mx-auto"
                            >
                                {getVernacularString("112996e0-2850-4283-af77-7514a386d172", userPreferences.language)}
                            </button>
                        </div>
                    </div>

                    <VerticalSpacer className="tw-h-8" />

                    {batteryFinderState.isApplied && batteryFinderState.recommendedBatteries && (
                        <div className="tw-grid lg:tw-grid-cols-[minmax(0,3fr)_minmax(0,5fr)] lg:tw-gap-x-10">
                            <div className="tw-col-start-1 tw-w-full tw-h-full tw-border tw-border-dashed tw-border-secondary-900-light dark:tw-border-secondary-900-dark"></div>

                            <div className="tw-col-start-2">
                                <ProductCardFourDetails
                                    userPreferences={userPreferences}
                                    {...batteryFinderState.recommendedBatteries[0]}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function RecommendedBatteries({
    userPreferences,
    pageUrl,
    batteryFinderState,
    dispatch,
    className,
}: {
    userPreferences: UserPreferences;
    pageUrl: string;
    batteryFinderState: BatteryFinderState;
    dispatch: React.Dispatch<BatteryFinderAction>;
    className?: string;
}) {
    return (
        <div className="tw-w-full tw-rounded-lg lg-bg-secondary-100 lg-px-screen-edge-2">
            <div className="tw-w-full lg-text-title1 lg-text-secondary-900">{getVernacularString("454f7c18-bc20-49a9-a1f8-273420f2679b", userPreferences.language)}</div>

            <VerticalSpacer className="tw-h-4" />
        </div>
    );
}

function VehicleCategoryDetails({
    userPreferences,
    pageUrl,
    batteryFinderState,
    dispatch,
    className,
}: {
    userPreferences: UserPreferences;
    pageUrl: string;
    batteryFinderState: BatteryFinderState;
    dispatch: React.Dispatch<BatteryFinderAction>;
    className?: string;
}) {
    const products = {
        [VehicleCategory.twoWheeler]: [
            {
                slug: "lgbtx2.5l",
                productType: ProductType.automotiveBattery,
                userPreferences: userPreferences,
                isBestSeller: false,
                imageRelativeUrl: "/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                productName: "LGBTX 2.5L",
                productPrice: "XX,XXX",
                capacity: "2.5 Ah Capacity",
                warranty: "24 + 24* Months Warranty",
            },
            {
                slug: "lgbtx2.5l",
                productType: ProductType.automotiveBattery,
                userPreferences: userPreferences,
                isBestSeller: false,
                imageRelativeUrl: "/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                productName: "LGBTX 2.5L",
                productPrice: "XX,XXX",
                capacity: "2.5 Ah Capacity",
                warranty: "24 + 24* Months Warranty",
            },
            {
                slug: "lgbtx2.5l",
                productType: ProductType.automotiveBattery,
                userPreferences: userPreferences,
                isBestSeller: false,
                imageRelativeUrl: "/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                productName: "LGBTX 2.5L",
                productPrice: "XX,XXX",
                capacity: "2.5 Ah Capacity",
                warranty: "24 + 24* Months Warranty",
            },
            {
                slug: "lgbtx2.5l",
                productType: ProductType.automotiveBattery,
                userPreferences: userPreferences,
                isBestSeller: false,
                imageRelativeUrl: "/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                productName: "LGBTX 2.5L",
                productPrice: "XX,XXX",
                capacity: "2.5 Ah Capacity",
                warranty: "24 + 24* Months Warranty",
            },
        ],
        [VehicleCategory.threeWheeler]: [
            {
                slug: "lgbtx2.5l",
                productType: ProductType.automotiveBattery,
                userPreferences: userPreferences,
                isBestSeller: false,
                imageRelativeUrl: "/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                productName: "LGBTX 2.5L",
                productPrice: "XX,XXX",
                capacity: "2.5 Ah Capacity",
                warranty: "24 + 24* Months Warranty",
            },
            {
                slug: "lgbtx2.5l",
                productType: ProductType.automotiveBattery,
                userPreferences: userPreferences,
                isBestSeller: false,
                imageRelativeUrl: "/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                productName: "LGBTX 2.5L",
                productPrice: "XX,XXX",
                capacity: "2.5 Ah Capacity",
                warranty: "24 + 24* Months Warranty",
            },
            {
                slug: "lgbtx2.5l",
                productType: ProductType.automotiveBattery,
                userPreferences: userPreferences,
                isBestSeller: false,
                imageRelativeUrl: "/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                productName: "LGBTX 2.5L",
                productPrice: "XX,XXX",
                capacity: "2.5 Ah Capacity",
                warranty: "24 + 24* Months Warranty",
            },
            {
                slug: "lgbtx2.5l",
                productType: ProductType.automotiveBattery,
                userPreferences: userPreferences,
                isBestSeller: false,
                imageRelativeUrl: "/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                productName: "LGBTX 2.5L",
                productPrice: "XX,XXX",
                capacity: "2.5 Ah Capacity",
                warranty: "24 + 24* Months Warranty",
            },
        ],
        [VehicleCategory.carAndSuv]: [
            {
                slug: "lgbtx2.5l",
                productType: ProductType.automotiveBattery,
                userPreferences: userPreferences,
                isBestSeller: false,
                imageRelativeUrl: "/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                productName: "LGBTX 2.5L",
                productPrice: "XX,XXX",
                capacity: "2.5 Ah Capacity",
                warranty: "24 + 24* Months Warranty",
            },
            {
                slug: "lgbtx2.5l",
                productType: ProductType.automotiveBattery,
                userPreferences: userPreferences,
                isBestSeller: false,
                imageRelativeUrl: "/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                productName: "LGBTX 2.5L",
                productPrice: "XX,XXX",
                capacity: "2.5 Ah Capacity",
                warranty: "24 + 24* Months Warranty",
            },
            {
                slug: "lgbtx2.5l",
                productType: ProductType.automotiveBattery,
                userPreferences: userPreferences,
                isBestSeller: false,
                imageRelativeUrl: "/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                productName: "LGBTX 2.5L",
                productPrice: "XX,XXX",
                capacity: "2.5 Ah Capacity",
                warranty: "24 + 24* Months Warranty",
            },
            {
                slug: "lgbtx2.5l",
                productType: ProductType.automotiveBattery,
                userPreferences: userPreferences,
                isBestSeller: false,
                imageRelativeUrl: "/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                productName: "LGBTX 2.5L",
                productPrice: "XX,XXX",
                capacity: "2.5 Ah Capacity",
                warranty: "24 + 24* Months Warranty",
            },
        ],
        [VehicleCategory.busAndTruck]: [
            {
                slug: "lgbtx2.5l",
                productType: ProductType.automotiveBattery,
                userPreferences: userPreferences,
                isBestSeller: false,
                imageRelativeUrl: "/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                productName: "LGBTX 2.5L",
                productPrice: "XX,XXX",
                capacity: "2.5 Ah Capacity",
                warranty: "24 + 24* Months Warranty",
            },
            {
                slug: "lgbtx2.5l",
                productType: ProductType.automotiveBattery,
                userPreferences: userPreferences,
                isBestSeller: false,
                imageRelativeUrl: "/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                productName: "LGBTX 2.5L",
                productPrice: "XX,XXX",
                capacity: "2.5 Ah Capacity",
                warranty: "24 + 24* Months Warranty",
            },
            {
                slug: "lgbtx2.5l",
                productType: ProductType.automotiveBattery,
                userPreferences: userPreferences,
                isBestSeller: false,
                imageRelativeUrl: "/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                productName: "LGBTX 2.5L",
                productPrice: "XX,XXX",
                capacity: "2.5 Ah Capacity",
                warranty: "24 + 24* Months Warranty",
            },
            {
                slug: "lgbtx2.5l",
                productType: ProductType.automotiveBattery,
                userPreferences: userPreferences,
                isBestSeller: false,
                imageRelativeUrl: "/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                productName: "LGBTX 2.5L",
                productPrice: "XX,XXX",
                capacity: "2.5 Ah Capacity",
                warranty: "24 + 24* Months Warranty",
            },
        ],
        [VehicleCategory.tractor]: [
            {
                slug: "lgbtx2.5l",
                productType: ProductType.automotiveBattery,
                userPreferences: userPreferences,
                isBestSeller: false,
                imageRelativeUrl: "/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                productName: "LGBTX 2.5L",
                productPrice: "XX,XXX",
                capacity: "2.5 Ah Capacity",
                warranty: "24 + 24* Months Warranty",
            },
            {
                slug: "lgbtx2.5l",
                productType: ProductType.automotiveBattery,
                userPreferences: userPreferences,
                isBestSeller: false,
                imageRelativeUrl: "/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                productName: "LGBTX 2.5L",
                productPrice: "XX,XXX",
                capacity: "2.5 Ah Capacity",
                warranty: "24 + 24* Months Warranty",
            },
            {
                slug: "lgbtx2.5l",
                productType: ProductType.automotiveBattery,
                userPreferences: userPreferences,
                isBestSeller: false,
                imageRelativeUrl: "/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                productName: "LGBTX 2.5L",
                productPrice: "XX,XXX",
                capacity: "2.5 Ah Capacity",
                warranty: "24 + 24* Months Warranty",
            },
            {
                slug: "lgbtx2.5l",
                productType: ProductType.automotiveBattery,
                userPreferences: userPreferences,
                isBestSeller: false,
                imageRelativeUrl: "/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                productName: "LGBTX 2.5L",
                productPrice: "XX,XXX",
                capacity: "2.5 Ah Capacity",
                warranty: "24 + 24* Months Warranty",
            },
        ],
        [VehicleCategory.eRickshaw]: [
            {
                slug: "lgbtx2.5l",
                productType: ProductType.automotiveBattery,
                userPreferences: userPreferences,
                isBestSeller: false,
                imageRelativeUrl: "/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                productName: "LGBTX 2.5L",
                productPrice: "XX,XXX",
                capacity: "2.5 Ah Capacity",
                warranty: "24 + 24* Months Warranty",
            },
            {
                slug: "lgbtx2.5l",
                productType: ProductType.automotiveBattery,
                userPreferences: userPreferences,
                isBestSeller: false,
                imageRelativeUrl: "/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                productName: "LGBTX 2.5L",
                productPrice: "XX,XXX",
                capacity: "2.5 Ah Capacity",
                warranty: "24 + 24* Months Warranty",
            },
            {
                slug: "lgbtx2.5l",
                productType: ProductType.automotiveBattery,
                userPreferences: userPreferences,
                isBestSeller: false,
                imageRelativeUrl: "/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                productName: "LGBTX 2.5L",
                productPrice: "XX,XXX",
                capacity: "2.5 Ah Capacity",
                warranty: "24 + 24* Months Warranty",
            },
            {
                slug: "lgbtx2.5l",
                productType: ProductType.automotiveBattery,
                userPreferences: userPreferences,
                isBestSeller: false,
                imageRelativeUrl: "/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                productName: "LGBTX 2.5L",
                productPrice: "XX,XXX",
                capacity: "2.5 Ah Capacity",
                warranty: "24 + 24* Months Warranty",
            },
        ],
    };

    // TODO: Apply banners based on index
    const banners = {
        [VehicleCategory.twoWheeler]: {
            bannerDesktop: "/livguard/battery-finder/3/bottom-banner-desktop.jpg",
            bannerMobile: "/livguard/battery-finder/3/bottom-banner-mobile.jpg",
        },
    };

    const isScreenSizeBelow = useIsScreenSizeBelow(1024);

    return (
        <div className="tw-w-full tw-grid tw-grid-cols-1">
            {/* <div className="tw-w-full tw-aspect-[8/3] lg-bg-primary-500" /> */}

            {/* TODO: Change Banner based on selectedCategory */}
            {isScreenSizeBelow == null ? null : (
                <FullWidthImage
                    relativePath={isScreenSizeBelow ? "/livguard/battery-finder/3/bottom-banner-mobile.jpg" : "/livguard/battery-finder/3/bottom-banner-desktop.jpg"}
                    key={isScreenSizeBelow ? "/livguard/battery-finder/3/bottom-banner-mobile.jpg" : "/livguard/battery-finder/3/bottom-banner-desktop.jpg"}
                />
            )}

            <div className="lg-px-screen-edge-2 tw-z-10">
                <div className="tw-w-full tw-rounded-lg lg-bg-secondary-100 -tw-mt-16 lg:-tw-mt-28 tw-p-4 tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-x-4 tw-gap-y-4">
                    <h2 className="tw-row-start-1 tw-col-start-1 lg:tw-row-start-1 lg:tw-col-start-1 lg:tw-self-end lg-text-headline tw-text-center">
                        <div className="tw-w-full">{getVernacularString("d11295cc-c71b-40d3-b0c3-6dfb96473a3a", userPreferences.language)}</div>
                        <div className="lg-text-highlighted tw-w-fit tw-mx-auto">
                            {getVernacularString(categories[batteryFinderState.selectedCategoryIndex].titleContentId, userPreferences.language)}
                        </div>
                    </h2>

                    <div className="tw-row-start-2 tw-col-start-1 lg:tw-row-start-1 lg:tw-col-start-2 lg:tw-row-span-2 tw-self-center">
                        {getVernacularString(categories[batteryFinderState.selectedCategoryIndex].bodyContentId, userPreferences.language)}
                    </div>

                    <button
                        type="button"
                        className="tw-row-start-3 tw-col-start-1 lg:tw-row-start-2 lg:tw-col-start-1 lg:tw-self-start lg-cta-button tw-w-full lg:tw-w-fit tw-px-4 lg:tw-px-16 tw-mx-auto"
                    >
                        {getVernacularString("8b6be5de-9c57-461a-8ec5-106f29eccaca", userPreferences.language)}
                    </button>
                </div>
            </div>

            <VerticalSpacer className="tw-h-4" />

            <div className="lg-px-screen-edge-2 tw-z-10">
                <div className="tw-w-full tw-grid tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-x-4 tw-gap-y-4">
                    {products[batteryFinderState.selectedCategoryIndex].map((product, productIndex) => {
                        return (
                            <ProductCardTwoDetails
                                slug={product.slug}
                                productType={product.productType}
                                userPreferences={userPreferences}
                                imageRelativeUrl={product.imageRelativeUrl}
                                productName={product.productName}
                                productPrice={product.productPrice}
                                capacity={product.capacity}
                                warranty={product.warranty}
                                isBestSeller={false}
                                key={productIndex}
                            />
                        );
                    })}
                </div>
            </div>

            {/* <div className="tw-mt-6 lg-px-screen-edge-2">
                <div className="tw-w-full tw-h-40 tw-rounded-lg tw-bg-[#181a1cd4] tw-opacity-50" />
            </div> */}
        </div>
    );
}

function FaqSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const faqs = [
        {
            question: "homeS9Q1Q",
            answer: "homeS9Q1A",
        },
        {
            question: "homeS9Q2Q",
            answer: "homeS9Q2A",
        },
        {
            question: "homeS9Q3Q",
            answer: "homeS9Q3A",
        },
        {
            question: "homeS9Q4Q",
            answer: "homeS9Q4A",
        },
        {
            question: "homeS9Q5Q",
            answer: "homeS9Q5A",
        },
    ];

    return (
        <FaqSectionInternal
            faqs={faqs}
            userPreferences={userPreferences}
            className={className}
        />
    );
}
