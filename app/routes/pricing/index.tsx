import {Popover} from "@headlessui/react";
import {AdjustmentsHorizontalIcon} from "@heroicons/react/20/solid";
import * as Slider from "@radix-ui/react-slider";
import type {LoaderFunction, V2_MetaFunction} from "@remix-run/node";
import React, {useEffect, useReducer, useRef, useState} from "react";
import {X} from "react-bootstrap-icons";
import {useLoaderData} from "react-router";
import {StickyBottomBar} from "~/components/bottomBar";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {PageScaffold} from "~/components/pageScaffold";
import {ProductCardTwoDetails} from "~/components/reusable-components/productCardTwoDetails";
import {ChipButtonWithText} from "~/components/scratchpad";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import { ImageCdnProvider } from "~/global-common-typescript/typeDefinitions";
import {concatenateNonNullStringsWithSpaces, getIntegerArrayOfLength} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import type {PricingPageAction} from "~/routes/pricing/index.state";
import {PricingPageActionType, defaultMaxPrice, defaultMinPrice, pricingPageInitialStateGenerator, pricingPageReducer} from "~/routes/pricing/index.state";
import type {PricingPageState} from "~/routes/pricing/index.types";
import {PricingPageFilterAttribute, PricingPageProductType, allPricingPageFilters} from "~/routes/pricing/index.types";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import {Language, type UserPreferences} from "~/typeDefinitions";
import {getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";

export const meta: V2_MetaFunction = ({data: loaderData}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = loaderData.userPreferences;
    if (userPreferences.language == Language.English) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/pricing",
            },
            {
                title: "Unlocking the Value of Livguard Pricing Page",
            },
            {
                name: "description",
                content: "Explore Livguard's Pricing Page for expert insights and comprehensive solutions that cater to your needs. Discover pricing plans designed to empower you.",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/pricing",
            },
            {
                property: "og:title",
                content: "Unlocking the Value of Livguard Pricing Page",
            },
            {
                property: "og:description",
                content: "Explore Livguard's Pricing Page for expert insights and comprehensive solutions that cater to your needs. Discover pricing plans designed to empower you.",
            },
            {
                property: "og:site_name",
                content: "Livguard",
            },
            {
                property: "og:type",
                content: "website",
            },
            {
                property: "og:image",
                content: `${getAbsolutePathForRelativePath(getMetadataForImage("/livguard/pricing/pricing-og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null)}`,
            },
        ];
    } else if (userPreferences.language == Language.Hindi) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/pricing",
            },
            {
                title: "Unlocking the Value of Livguard Pricing Page",
            },
            {
                name: "description",
                content: "Explore Livguard's Pricing Page for expert insights and comprehensive solutions that cater to your needs. Discover pricing plans designed to empower you.",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/pricing",
            },
            {
                property: "og:title",
                content: "Unlocking the Value of Livguard Pricing Page",
            },
            {
                property: "og:description",
                content: "Explore Livguard's Pricing Page for expert insights and comprehensive solutions that cater to your needs. Discover pricing plans designed to empower you.",
            },
            {
                property: "og:site_name",
                content: "Livguard",
            },
            {
                property: "og:type",
                content: "website",
            },
            {
                property: "og:image",
                content: `${getAbsolutePathForRelativePath(getMetadataForImage("/livguard/pricing/pricing-og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null)}`,
            },
        ];
    } else {
        throw Error(`Undefined language ${userPreferences.language}`);
    }
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
                breadcrumbs={[
                    {contentId: "cfab263f-0175-43fb-91e5-fccc64209d36", link: "/"},
                    {contentId: "f26397f8-a9be-49e3-972a-34265e3f6441", link: "#"},
                ]}
                pageUrl={pageUrl}
            >
                <PricingPage
                    userPreferences={userPreferences}
                    utmParameters={utmSearchParameters}
                    pageUrl={pageUrl}
                />
            </PageScaffold>

            <StickyBottomBar userPreferences={userPreferences} />
        </>
    );
}

function PricingPage({
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
    const [pricingPageState, dispatch] = useReducer(pricingPageReducer, userPreferences, (userPreferences) => pricingPageInitialStateGenerator(userPreferences));

    return (
        <div className="tw-w-full tw-grid tw-grid-cols-1 tw-align-stretch tw-gap-y-10 lg:tw-gap-y-20 tw-pb-10 lg:tw-pb-20">
            <HeroSection
                userPreferences={userPreferences}
                utmParameters={utmParameters}
                pageUrl={pageUrl}
            />

            <PricingSection
                userPreferences={userPreferences}
                utmParameters={utmParameters}
                pageUrl={pageUrl}
                pricingPageState={pricingPageState}
                dispatch={dispatch}
                className="lg-px-screen-edge-2 tw-max-w-7xl tw-mx-auto"
            />
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
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-w-full tw-aspect-square lg:tw-aspect-[3840/1140] tw-relative tw-isolate tw-grid tw-grid-rows-[2rem_auto_auto_minmax(0,1fr)] lg:tw-grid-rows-[2rem_auto_auto_minmax(0,1fr)]",
                className,
            )}
        >
            {isScreenSizeBelow == null ? null : (
                <FullWidthImage
                    relativePath={isScreenSizeBelow ? "/livguard/pricing/1/banner-mobile.jpg" : "/livguard/pricing/1/banner-desktop.jpg"}
                    className="tw-absolute tw-inset-0 -tw-z-10"
                    key={isScreenSizeBelow ? "/livguard/pricing/1/banner-mobile.jpg" : "/livguard/pricing/1/banner-desktop.jpg"}
                />
            )}
        </div>
    );
}

function PricingSection({
    userPreferences,
    utmParameters,
    className,
    pageUrl,
    pricingPageState,
    dispatch,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
    className?: string;
    pageUrl: string;
    pricingPageState: PricingPageState;
    dispatch: React.Dispatch<PricingPageAction>;
}) {
    const productRef = useRef<HTMLDivElement>(null);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-w-full tw-grid tw-grid-cols-1 lg:tw-grid-rows-[auto_auto_minmax(0,1fr)] lg:tw-grid-cols-[20rem_minmax(0,1fr)] tw-gap-x-4 tw-gap-y-4",
                className,
            )}
        >
            <CategoryFilters
                userPreferences={userPreferences}
                utmParameters={utmParameters}
                pageUrl={pageUrl}
                pricingPageState={pricingPageState}
                dispatch={dispatch}
                className="tw-row-start-1 tw-col-start-1 lg:tw-row-start-1 lg:tw-col-start-1 lg:tw-col-span-2"
            />

            {[PricingPageProductType.all, PricingPageProductType.inverter, PricingPageProductType.inverterBattery, PricingPageProductType.automotiveBatteries].includes(
                pricingPageState.selectedPricingPageProductType,
            ) && (
                <Filters
                    userPreferences={userPreferences}
                    utmParameters={utmParameters}
                    pageUrl={pageUrl}
                    pricingPageState={pricingPageState}
                    dispatch={dispatch}
                    className="tw-row-start-2 tw-col-start-1 lg:tw-row-start-2 lg:tw-col-start-1 lg:tw-row-span-2"
                />
            )}

            <AppliedFiltersAndSort
                userPreferences={userPreferences}
                utmParameters={utmParameters}
                pageUrl={pageUrl}
                pricingPageState={pricingPageState}
                dispatch={dispatch}
                className="tw-row-start-3 tw-col-start-1 lg:tw-row-start-2 lg:tw-col-start-2"
            />

            <div
                ref={productRef}
                className="tw-row-start-4 tw-col-start-1 lg:tw-row-start-3 lg:tw-col-start-2 tw-grid tw-grid-cols-2 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-x-4 tw-gap-y-4"
            >
                {pricingPageState.filteredProducts.length == 0 ? (
                    <div className="tw-col-span-full tw-w-full tw-h-full tw-grid tw-place-items-center">No products found!</div>
                ) : (
                    <ItemBuilder
                        items={pricingPageState.filteredProducts}
                        itemBuilder={(item, itemIndex) => (
                            <ProductCardTwoDetails
                                slug={item.slug}
                                productType={item.productType}
                                isBestSeller={item.isBestSeller}
                                imageRelativeUrl={item.imageRelativeUrl}
                                productName={item.productName}
                                productPrice={item.productPrice}
                                specification1Icon={item.specification1Icon}
                                specification1={item.specification1}
                                specification2Icon={item.specification2Icon}
                                specification2={item.specification2}
                                userPreferences={userPreferences}
                                key={itemIndex}
                            />
                        )}
                    />
                )}
            </div>

            <Paginator
                paginatedProducts={pricingPageState.filteredProducts}
                productRef={productRef}
                pricingPageState={pricingPageState}
                dispatch={dispatch}
                userPreferences={userPreferences}
            />
        </div>
    );
}

function CategoryFilters({
    userPreferences,
    utmParameters,
    className,
    pageUrl,
    pricingPageState,
    dispatch,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
    className?: string;
    pageUrl: string;
    pricingPageState: PricingPageState;
    dispatch: React.Dispatch<PricingPageAction>;
}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full tw-overflow-x-auto", className)}>
            <div className="tw-flex tw-flex-row tw-justify-start tw-gap-x-4 tw-pb-4">
                <ItemBuilder
                    items={[
                        PricingPageProductType.all,
                        PricingPageProductType.inverter,
                        PricingPageProductType.inverterBattery,
                        PricingPageProductType.automotiveBatteries,
                        // PricingPageProductType.solar,
                        PricingPageProductType.accessoriesAndOtherBatteries,
                    ]}
                    itemBuilder={(item, itemIndex) => (
                        <ChipButtonWithText
                            contentId={item}
                            isSelected={pricingPageState.selectedPricingPageProductType == item}
                            onClick={() =>
                                dispatch({
                                    actionType: PricingPageActionType.setSelectedPricingPageProductType,
                                    payload: {selectedPricingPageProductType: item, userPreferences: userPreferences},
                                })
                            }
                            userPreferences={userPreferences}
                            className="tw-flex-none"
                            key={itemIndex}
                        />
                    )}
                />
            </div>
        </div>
    );
}

function Filters({
    userPreferences,
    utmParameters,
    className,
    pageUrl,
    pricingPageState,
    dispatch,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
    className?: string;
    pageUrl: string;
    pricingPageState: PricingPageState;
    dispatch: React.Dispatch<PricingPageAction>;
}) {
    return (
        <>
            <div className={concatenateNonNullStringsWithSpaces("tw-hidden lg:tw-grid tw-w-full tw-grid-cols-1 tw-auto-rows-auto tw-content-start", className)}>
                <div className="tw-grid tw-grid-flow-col tw-auto-cols-auto tw-justify-start tw-items-center tw-gap-x-2">
                    <AdjustmentsHorizontalIcon className="tw-w-5 tw-h-5" />
                    <div className="lg-text-body-bold">{getVernacularString("d601a330-dff5-4a63-ac15-b3ad27428b54", userPreferences.language)}</div>
                </div>

                <div className="tw-w-full tw-h-px lg-bg-secondary-900 tw-mt-4 tw-mb-4" />

                {[PricingPageProductType.all, PricingPageProductType.inverter, PricingPageProductType.inverterBattery].includes(pricingPageState.selectedPricingPageProductType) && (
                    <>
                        <div className="lg-text-body-bold">{getVernacularString("c1ce8369-9ae0-4d33-aba7-85b0414ffaa3", userPreferences.language)}</div>

                        <SliderComponent
                            min={defaultMinPrice}
                            max={defaultMaxPrice}
                            values={[pricingPageState.minPrice, pricingPageState.maxPrice]}
                            onValuesChange={(newValues) =>
                                dispatch({
                                    actionType: PricingPageActionType.setPrice,
                                    payload: {
                                        minPrice: Math.min(...newValues),
                                        maxPrice: Math.max(...newValues),
                                        userPreferences: userPreferences,
                                    },
                                })
                            }
                            step={100}
                        />
                        <div className="tw-w-full tw-h-px lg-bg-secondary-900 tw-mt-4 tw-mb-4" />
                    </>
                )}

                {pricingPageState.selectedPricingPageProductType === PricingPageProductType.automotiveBatteries && (
                    <>
                        <div className="lg-text-body-bold">{getVernacularString("615fec41-accc-4091-b2c9-fcd74e9d280e", userPreferences.language)}</div>

                        <VerticalSpacer className="tw-h-2" />

                        <ItemBuilder
                            items={allPricingPageFilters.filter((filter) => filter.filterAttribute == PricingPageFilterAttribute.automotiveSubType)}
                            itemBuilder={(item, itemIndex) => (
                                <div key={itemIndex}>
                                    <Checkbox
                                        contentId={item.displayContentId}
                                        checked={pricingPageState.appliedFilters.filter((appliedFilter) => appliedFilter.displayContentId == item.displayContentId).length > 0}
                                        onChange={(checked) =>
                                            dispatch({
                                                actionType: checked == true ? PricingPageActionType.addFilter : PricingPageActionType.removeFilter,
                                                payload: {filterDisplayContentId: item.displayContentId, userPreferences: userPreferences},
                                            })
                                        }
                                        userPreferences={userPreferences}
                                    />
                                </div>
                            )}
                        />

                        <div className="tw-w-full tw-h-px lg-bg-secondary-900 tw-mt-4 tw-mb-4" />
                    </>
                )}

                {[PricingPageProductType.all, PricingPageProductType.inverter, PricingPageProductType.inverterBattery, PricingPageProductType.automotiveBatteries].includes(
                    pricingPageState.selectedPricingPageProductType,
                ) && (
                    <>
                        <div className="lg-text-body-bold">{getVernacularString("8c207582-8a8a-4995-bd70-2a7c555bd50a", userPreferences.language)}</div>

                        <VerticalSpacer className="tw-h-2" />

                        <ItemBuilder
                            items={allPricingPageFilters.filter((filter) => filter.filterAttribute == PricingPageFilterAttribute.capacity)}
                            itemBuilder={(item, itemIndex) => (
                                <div key={itemIndex}>
                                    <Checkbox
                                        contentId={item.displayContentId}
                                        checked={pricingPageState.appliedFilters.filter((appliedFilter) => appliedFilter.displayContentId == item.displayContentId).length > 0}
                                        onChange={(checked) =>
                                            dispatch({
                                                actionType: checked == true ? PricingPageActionType.addFilter : PricingPageActionType.removeFilter,
                                                payload: {filterDisplayContentId: item.displayContentId, userPreferences: userPreferences},
                                            })
                                        }
                                        userPreferences={userPreferences}
                                    />
                                </div>
                            )}
                        />

                        <div className="tw-w-full tw-h-px lg-bg-secondary-900 tw-mt-4 tw-mb-4" />

                        <div className="lg-text-body-bold">{getVernacularString("872214aa-3d2c-4a10-935b-257b5dbde56f", userPreferences.language)}</div>

                        <VerticalSpacer className="tw-h-2" />

                        <ItemBuilder
                            items={allPricingPageFilters.filter((filter) => filter.filterAttribute == PricingPageFilterAttribute.warranty)}
                            itemBuilder={(item, itemIndex) => (
                                <div key={itemIndex}>
                                    <Checkbox
                                        contentId={item.displayContentId}
                                        checked={pricingPageState.appliedFilters.filter((appliedFilter) => appliedFilter.displayContentId == item.displayContentId).length > 0}
                                        onChange={(checked) =>
                                            dispatch({
                                                actionType: checked == true ? PricingPageActionType.addFilter : PricingPageActionType.removeFilter,
                                                payload: {filterDisplayContentId: item.displayContentId, userPreferences: userPreferences},
                                            })
                                        }
                                        userPreferences={userPreferences}
                                    />
                                </div>
                            )}
                        />
                    </>
                )}
            </div>

            <div className="tw-relative">
                <div className="tw-w-full tw-overflow-x-auto">
                    <div className={concatenateNonNullStringsWithSpaces("tw-grid lg:tw-hidden tw-w-full tw-grid-flow-col tw-auto-cols-auto tw-justify-start tw-gap-x-4 tw-pb-4", className)}>
                        <div className="tw-grid tw-grid-flow-col tw-auto-cols-auto tw-justify-start tw-items-center tw-gap-x-2">
                            <AdjustmentsHorizontalIcon className="tw-w-5 tw-h-5" />
                            <div className="lg-text-body-bold">{getVernacularString("d601a330-dff5-4a63-ac15-b3ad27428b54", userPreferences.language)}</div>
                        </div>

                        <Popover>
                            {({open}) => (
                                <>
                                    <Popover.Button className="tw-duration-200 hover:lg-text-primary-500 tw-whitespace-nowrap tw-grid tw-grid-cols-1 tw-items-center tw-gap-x-2 tw-w-max">
                                        {getVernacularString("c1ce8369-9ae0-4d33-aba7-85b0414ffaa3", userPreferences.language)}
                                    </Popover.Button>

                                    <Popover.Panel className="tw-absolute tw-top-[1.5rem] tw-left-0 tw-right-0 tw-rounded-lg lg-bg-new-background-500 lg-card tw-grid tw-grid-cols-1 tw-p-4 tw-items-start">
                                        <SliderComponent
                                            min={defaultMinPrice}
                                            max={defaultMaxPrice}
                                            values={[pricingPageState.minPrice, pricingPageState.maxPrice]}
                                            onValuesChange={(newValues) =>
                                                dispatch({
                                                    actionType: PricingPageActionType.setPrice,
                                                    payload: {
                                                        minPrice: Math.min(...newValues),
                                                        maxPrice: Math.max(...newValues),
                                                        userPreferences: userPreferences,
                                                    },
                                                })
                                            }
                                            step={100}
                                        />
                                    </Popover.Panel>
                                </>
                            )}
                        </Popover>

                        {pricingPageState.selectedPricingPageProductType === PricingPageProductType.automotiveBatteries && (
                            <Popover>
                                {({open}) => (
                                    <>
                                        <Popover.Button className="tw-duration-200 hover:lg-text-primary-500 tw-whitespace-nowrap tw-grid tw-grid-cols-1 tw-items-center tw-gap-x-2 tw-w-max">
                                            {getVernacularString("615fec41-accc-4091-b2c9-fcd74e9d280e", userPreferences.language)}
                                        </Popover.Button>

                                        <Popover.Panel className="tw-absolute tw-top-[1.5rem] tw-left-0 tw-right-0 tw-rounded-lg lg-bg-new-background-500 lg-card tw-grid tw-grid-cols-1 tw-p-4 tw-items-start">
                                            <ItemBuilder
                                                items={allPricingPageFilters.filter((filter) => filter.filterAttribute == PricingPageFilterAttribute.automotiveSubType)}
                                                itemBuilder={(item, itemIndex) => (
                                                    <div key={itemIndex}>
                                                        <Checkbox
                                                            contentId={item.displayContentId}
                                                            checked={pricingPageState.appliedFilters.filter((appliedFilter) => appliedFilter.displayContentId == item.displayContentId).length > 0}
                                                            onChange={(checked) =>
                                                                dispatch({
                                                                    actionType: checked == true ? PricingPageActionType.addFilter : PricingPageActionType.removeFilter,
                                                                    payload: {filterDisplayContentId: item.displayContentId, userPreferences: userPreferences},
                                                                })
                                                            }
                                                            userPreferences={userPreferences}
                                                        />
                                                    </div>
                                                )}
                                            />
                                        </Popover.Panel>
                                    </>
                                )}
                            </Popover>
                        )}

                        <Popover>
                            {({open}) => (
                                <>
                                    <Popover.Button className="tw-duration-200 hover:lg-text-primary-500 tw-whitespace-nowrap tw-grid tw-grid-cols-1 tw-items-center tw-gap-x-2 tw-w-max">
                                        {getVernacularString("8c207582-8a8a-4995-bd70-2a7c555bd50a", userPreferences.language)}
                                    </Popover.Button>

                                    <Popover.Panel className="tw-absolute tw-top-[1.5rem] tw-left-0 tw-right-0 tw-rounded-lg lg-bg-new-background-500 lg-card tw-grid tw-grid-cols-1 tw-p-4 tw-items-start">
                                        <ItemBuilder
                                            items={allPricingPageFilters.filter((filter) => filter.filterAttribute == PricingPageFilterAttribute.capacity)}
                                            itemBuilder={(item, itemIndex) => (
                                                <div key={itemIndex}>
                                                    <Checkbox
                                                        contentId={item.displayContentId}
                                                        checked={pricingPageState.appliedFilters.filter((appliedFilter) => appliedFilter.displayContentId == item.displayContentId).length > 0}
                                                        onChange={(checked) =>
                                                            dispatch({
                                                                actionType: checked == true ? PricingPageActionType.addFilter : PricingPageActionType.removeFilter,
                                                                payload: {filterDisplayContentId: item.displayContentId, userPreferences: userPreferences},
                                                            })
                                                        }
                                                        userPreferences={userPreferences}
                                                    />
                                                </div>
                                            )}
                                        />
                                    </Popover.Panel>
                                </>
                            )}
                        </Popover>

                        <Popover>
                            {({open}) => (
                                <>
                                    <Popover.Button className="tw-duration-200 hover:lg-text-primary-500 tw-whitespace-nowrap tw-grid tw-grid-cols-1 tw-items-center tw-gap-x-2 tw-w-max">
                                        {getVernacularString("872214aa-3d2c-4a10-935b-257b5dbde56f", userPreferences.language)}
                                    </Popover.Button>

                                    <Popover.Panel className="tw-absolute tw-top-[1.5rem] tw-left-0 tw-right-0 tw-rounded-lg lg-bg-new-background-500 lg-card tw-border tw-border-solid tw-grid tw-grid-cols-1 tw-p-4 tw-items-start">
                                        <ItemBuilder
                                            items={allPricingPageFilters.filter((filter) => filter.filterAttribute == PricingPageFilterAttribute.warranty)}
                                            itemBuilder={(item, itemIndex) => (
                                                <div key={itemIndex}>
                                                    <Checkbox
                                                        contentId={item.displayContentId}
                                                        checked={pricingPageState.appliedFilters.filter((appliedFilter) => appliedFilter.displayContentId == item.displayContentId).length > 0}
                                                        onChange={(checked) =>
                                                            dispatch({
                                                                actionType: checked == true ? PricingPageActionType.addFilter : PricingPageActionType.removeFilter,
                                                                payload: {filterDisplayContentId: item.displayContentId, userPreferences: userPreferences},
                                                            })
                                                        }
                                                        userPreferences={userPreferences}
                                                    />
                                                </div>
                                            )}
                                        />
                                    </Popover.Panel>
                                </>
                            )}
                        </Popover>
                    </div>
                </div>
            </div>
        </>
    );
}

function AppliedFiltersAndSort({
    userPreferences,
    utmParameters,
    className,
    pageUrl,
    pricingPageState,
    dispatch,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
    className?: string;
    pageUrl: string;
    pricingPageState: PricingPageState;
    dispatch: React.Dispatch<PricingPageAction>;
}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full tw-grid tw-grid-cols-[minmax(0,1fr)_auto]", className)}>
            {pricingPageState.minPrice == defaultMinPrice && pricingPageState.maxPrice == defaultMaxPrice ? null : (
                <Chip
                    text={`Price: ${pricingPageState.minPrice} - ${pricingPageState.maxPrice}`}
                    onClick={() =>
                        dispatch({
                            actionType: PricingPageActionType.setPrice,
                            payload: {
                                minPrice: defaultMinPrice,
                                maxPrice: defaultMaxPrice,
                                userPreferences: userPreferences,
                            },
                        })
                    }
                />
            )}
        </div>
    );
}

function SliderComponent({
    min,
    max,
    step,
    values,
    onValuesChange,
    className,
}: {
    min: number;
    max: number;
    step: number;
    values: number[];
    onValuesChange: (value: number[]) => void;
    className?: string;
}) {
    return (
        <Slider.Root
            className={concatenateNonNullStringsWithSpaces("tw-relative tw-flex tw-items-center tw-w-full lg:tw-h-full tw-flex-grow tw-pt-6 tw-pb-2", className)}
            min={min}
            max={max}
            step={step}
            value={values}
            onValueChange={onValuesChange}
        >
            <Slider.Track className="lg-bg-secondary-500 tw-rounded-full tw-relative tw-w-full tw-h-1">
                <Slider.Range className="tw-absolute lg-bg-primary-500 tw-h-full tw-rounded-full" />
            </Slider.Track>

            <Slider.Thumb className="focus-visible:!tw-outline-none tw-group tw-relative tw-h-3 tw-w-3 lg-bg-primary-500 tw-rounded-full tw-grid tw-justify-center tw-items-center hover:tw-cursor-pointer">
                <div className="tw-absolute tw-w-2 tw-h-2 tw-rounded-full tw-bg-primary tw-place-self-center"></div>
                <div className="tw-absolute tw-inset-x-0 -tw-top-4 tw-grid tw-justify-center tw-items-center">
                    <div className="lg-text-icon">{values[0]}</div>
                </div>
            </Slider.Thumb>

            <Slider.Thumb className="focus-visible:!tw-outline-none tw-group tw-relative tw-h-3 tw-w-3 lg-bg-primary-500 tw-rounded-full tw-grid tw-justify-center tw-items-center hover:tw-cursor-pointer">
                <div className="tw-absolute tw-w-2 tw-h-2 tw-rounded-full tw-bg-primary tw-place-self-center"></div>
                <div className="tw-absolute tw-inset-x-0 -tw-top-4 tw-grid tw-justify-center tw-items-center">
                    <div className="lg-text-icon">{values[1]}</div>
                </div>
            </Slider.Thumb>
        </Slider.Root>
    );
}

function Chip({text, onClick}: {text: string; onClick: () => void}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="tw-w-fit lg-card tw-rounded-full tw-pl-2 tw-pr-3 tw-py-2 lg-text-icon tw-grid tw-grid-cols-[auto_auto] tw-gap-x-2 tw-items-center"
        >
            <X className="tw-w-4 tw-h-4" />
            <div>{text}</div>
        </button>
    );
}

function Checkbox({contentId, checked, onChange, userPreferences}: {contentId: string; checked: boolean; onChange: (checked: boolean) => void; userPreferences: UserPreferences}) {
    return (
        <div className="tw-w-full tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            <div className="">{getVernacularString(contentId, userPreferences.language)}</div>
        </div>
    );
}

function Paginator({
    paginatedProducts,
    className,
    productRef,
    pricingPageState,
    dispatch,
    userPreferences,
}: {
    paginatedProducts: Array<any>;
    className?: string;
    productRef: React.RefObject<HTMLDivElement>;
    pricingPageState: PricingPageState;
    dispatch: React.Dispatch<PricingPageAction>;
    userPreferences: UserPreferences;
}) {
    const [paginatorStartIndex, setPaginatorStartIndex] = useState(pricingPageState.activePageNumber < 2 ? 0 : pricingPageState.activePageNumber - 2);
    const [paginatorEndIndex, setPaginatorEndIndex] = useState(paginatorStartIndex + 5 > pricingPageState.totalPages - 2 ? pricingPageState.totalPages - 2 : paginatorStartIndex + 5);

    useEffect(() => {
        setPaginatorStartIndex(pricingPageState.activePageNumber < 2 ? 0 : pricingPageState.activePageNumber - 2);
        setPaginatorEndIndex(paginatorStartIndex + 5 > pricingPageState.totalPages - 2 ? pricingPageState.totalPages - 2 : paginatorStartIndex + 5);
    }, [pricingPageState.totalPages]);

    if (paginatedProducts.length == 0) {
        return null;
    }

    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-flex tw-flex-col tw-items-center tw-gap-y-4", className)}>
            {/* <div>{`Showing results ${activePageNumber * resultsPerPage + 1} to ${(activePageNumber + 1) * resultsPerPage} of ${paginatedProducts.length}`}</div> */}

            <div className="tw-flex tw-flex-row tw-flex-wrap tw-justify-center tw-gap-x-4">
                {pricingPageState.totalPages > 1 &&
                    getIntegerArrayOfLength(pricingPageState.totalPages)
                        // .slice(paginatorStartIndex, paginatorEndIndex)
                        .map((pageNumber) => (
                            <div key={pageNumber}>
                                <button
                                    className={concatenateNonNullStringsWithSpaces(
                                        "tw-w-8 tw-h-8 tw-rounded-full tw-grid tw-place-items-center gj-text-body-bold tw-transition tw-duration-200",
                                        pageNumber == pricingPageState.activePageNumber ? "lg-bg-primary-500 tw-text-secondary-900-dark" : undefined,
                                    )}
                                    onClick={(e) => {
                                        if (pageNumber == pricingPageState.activePageNumber) {
                                            return;
                                        }

                                        dispatch({
                                            actionType: PricingPageActionType.setPageNumber,
                                            payload: {pageNumber: pageNumber, userPreferences: userPreferences},
                                        });

                                        // productRef.current?.scrollIntoView(true);
                                        window.scrollTo({
                                            behavior: "smooth",
                                            top: window.scrollY + productRef.current!.getBoundingClientRect().top - 200,
                                        });
                                    }}
                                >
                                    {pageNumber + 1}
                                </button>
                            </div>
                        ))}
            </div>
        </div>
    );
}
