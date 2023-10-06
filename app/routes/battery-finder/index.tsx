import type {LoaderFunction, V2_MetaFunction} from "@remix-run/node";
import {Link, useFetcher} from "@remix-run/react";
import React, {useEffect, useReducer, useState} from "react";
import {useLoaderData} from "react-router";
import {busAndTruckBatteryBrands, carAndSuvBatteriesBrands, threeWheelerBatteryBrands, tractorBatteryBrands, twoWheelerBatteryBrands} from "~/backend/battery-finder.server";
import {getProductFromSlugAndLanguage} from "~/backend/product.server";
import {StickyBottomBar} from "~/components/bottomBar";
import {CarouselStyle4} from "~/components/carouselStyle4";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {FaqSectionInternal} from "~/components/faqs";
import {FixedWidthImage} from "~/components/images/fixedWidthImage";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {PageScaffold} from "~/components/pageScaffold";
import {ProductCardFourDetails} from "~/components/reusable-components/productCardFourDetails";
import {ProductCardTwoDetails} from "~/components/reusable-components/productCardTwoDetails";
import {ButtonWithIconAndText} from "~/components/scratchpad";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {ImageCdnProvider} from "~/common--type-definitions/typeDefinitions";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {FormSelectComponent} from "~/livguard-common-typescript/scratchpad";
import {ProductType, allProductDetails} from "~/productData.types";
import {DealerLocator} from "~/routes";
import type {BatteryFinderAction} from "~/routes/battery-finder/index.state";
import {BatteryFinderActionType, batteryFinderInitialState, batteryFinderReducer} from "~/routes/battery-finder/index.state";
import type {BatteryFinderState} from "~/routes/battery-finder/index.types";
import {VehicleCategory, categories, categoryNames, indexToVehicleTypeMap} from "~/routes/battery-finder/index.types";
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
                href: "https://www.livguard.com/battery-finder",
            },
            {
                title: "Discover the Perfect Automotive Battery for Your Vehicle",
            },
            {
                name: "description",
                content: "Navigate to the best automotive battery for your vehicle. Choose from a range of brands, models, and fuel types. Find the perfect fit for optimal performance.",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/battery-finder",
            },
            {
                property: "og:title",
                content: "Discover the Perfect Automotive Battery for Your Vehicle",
            },
            {
                property: "og:description",
                content: "Navigate to the best automotive battery for your vehicle. Choose from a range of brands, models, and fuel types. Find the perfect fit for optimal performance.",
            },
            {
                property: "og:site_name",
                content: "Livguard",
            },
            {
                property: "og:type",
                content: "Website",
            },
            {
                property: "og:image",
                content: `${getAbsolutePathForRelativePath(getMetadataForImage("/livguard/battery-finder/battery-finder-og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null)}`,
            },
        ];
    } else if (userPreferences.language == Language.Hindi) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/battery-finder",
            },
            {
                title: "अपने वाहन के लिए उत्तम ऑटोमोटिव बैटरी खोजें",
            },
            {
                name: "description",
                content: "अपने वाहन के लिए सर्वोत्तम ऑटोमोटिव बैटरी पर नेविगेट करें। विभिन्न ब्रांडों, मॉडलों और ईंधन प्रकारों में से चुनें।सर्वोत्तम प्रदर्शन के लिए एकदम सही विकल्प ढूंढें।",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/battery-finder",
            },
            {
                property: "og:title",
                content: "अपने वाहन के लिए उत्तम ऑटोमोटिव बैटरी खोजें",
            },
            {
                property: "og:description",
                content: "अपने वाहन के लिए सर्वोत्तम ऑटोमोटिव बैटरी पर नेविगेट करें। विभिन्न ब्रांडों, मॉडलों और ईंधन प्रकारों में से चुनें।सर्वोत्तम प्रदर्शन के लिए एकदम सही विकल्प ढूंढें।",
            },
            {
                property: "og:site_name",
                content: "Livguard",
            },
            {
                property: "og:type",
                content: "Website",
            },
            {
                property: "og:image",
                content: `${getAbsolutePathForRelativePath(getMetadataForImage("/livguard/battery-finder/battery-finder-og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null)}`,
            },
        ];
    } else {
        throw Error(`Undefined language ${userPreferences.language}`);
    }
};

type CategoryBrands = Array<Array<string>>;

type DisplayProductsSchema = {
    productName: string;
    slug: string;
    // isBestSeller: string;
    capacity: string;
    warranty: string;
    productPrice: string | number | null;
};

type LoaderData = {
    userPreferences: UserPreferences;
    redirectTo: string;
    pageUrl: string;
    categoryBrands: CategoryBrands;
    twoWheelerProducts: Array<DisplayProductsSchema>;
    threeWheelerProducts: Array<DisplayProductsSchema>;
    carAndSuvProducts: Array<DisplayProductsSchema>;
    busAndTruckProducts: Array<DisplayProductsSchema>;
    tractorProducts: Array<DisplayProductsSchema>;
};

export const loader: LoaderFunction = async ({request}) => {
    const userPreferences = await getUserPreferencesFromCookiesAndUrlSearchParameters(request);
    if (userPreferences instanceof Error) {
        throw userPreferences;
    }

    const categoryBrands = [twoWheelerBatteryBrands, threeWheelerBatteryBrands, busAndTruckBatteryBrands, tractorBatteryBrands, carAndSuvBatteriesBrands];

    function convertSlugToRequiredProductSchema(slug: string): DisplayProductsSchema {
        const product = getProductFromSlugAndLanguage(slug, userPreferences.language);
        return {
            productName: product.humanReadableModelNumber,
            slug: product.slug,
            // isBestSeller: true,
            capacity: product.specifications[2].value,
            warranty: product.specifications[1].value,
            productPrice: product.price,
        };
    }

    const twoWheelerProductSlugs = ["lgbtx2.5l", "lgbtx7l", "lgbtx9l", "lgzhhtx5", "lgzhhtz4", "lgzhhtz5"];
    const twoWheelerProducts = twoWheelerProductSlugs.map((slug) => convertSlugToRequiredProductSchema(slug));
    const threeWheelerProductSlugs = ["lgmf0ar32r", "lgmf0ar60l"];
    const threeWheelerProducts = threeWheelerProductSlugs.map((slug) => convertSlugToRequiredProductSchema(slug));
    const carAndSuvProductSlugs = [
        "ze38b20l",
        "ze38b20r",
        "ze55b24lsl",
        "zu42b20l",
        "zu42b20r",
        "zu42b20bhl",
        "zudin44lhl",
        "zudin50l",
        "zudin55r",
        "zudin60l",
        "zudin65lhl",
        "zu75d23bhl",
        "zp38b20l",
        "zp38b20r",
        "zp70d26l",
        "zp70d26r",
        "pc38b20l",
        "pp38b20l",
    ];
    const carAndSuvProducts = carAndSuvProductSlugs.map((slug) => convertSlugToRequiredProductSchema(slug));
    const busAndTruckProductSlugs = [
        "lglff80r",
        "lglff80l",
        "lglff100l",
        "lglff100h29r",
        "lglnff130r",
        "lglnhd150r",
        "lglff180r",
        "lghx8048r",
        "lghx8048l",
        "lghx10048l",
        "lghx10048r",
        "lghx10048h29r",
    ];
    const busAndTruckProducts = busAndTruckProductSlugs.map((slug) => convertSlugToRequiredProductSchema(slug));
    const tractorProductSlugs = ["lgptr800r", "lgptr900l", "lgptr1000l", "lgptr1000r", "lgpxtr8048r", "lgpxtr9048l", "lgpxtr10048l", "lgpxtr10048r", "lgpxtr9048h29l"];
    const tractorProducts = tractorProductSlugs.map((slug) => convertSlugToRequiredProductSchema(slug));

    const loaderData: LoaderData = {
        userPreferences: userPreferences,
        redirectTo: getRedirectToUrlFromRequest(request),
        pageUrl: getUrlFromRequest(request),
        categoryBrands: categoryBrands,
        twoWheelerProducts: twoWheelerProducts,
        threeWheelerProducts: threeWheelerProducts,
        carAndSuvProducts: carAndSuvProducts,
        busAndTruckProducts: busAndTruckProducts,
        tractorProducts: tractorProducts,
    };

    return loaderData;
};

export default function () {
    const {userPreferences, redirectTo, pageUrl, categoryBrands, twoWheelerProducts, threeWheelerProducts, busAndTruckProducts, carAndSuvProducts, tractorProducts} = useLoaderData() as LoaderData;

    const utmSearchParameters = useUtmSearchParameters();

    return (
        <>
            <PageScaffold
                userPreferences={userPreferences}
                redirectTo={redirectTo}
                showMobileMenuIcon={true}
                utmParameters={utmSearchParameters}
                breadcrumbs={[
                    {contentId: "cfab263f-0175-43fb-91e5-fccc64209d36", link: "#"},
                    {contentId: "62fd3993-d903-4d1b-b008-07be08fbfdef", link: "#"},
                ]}
                pageUrl={pageUrl}
            >
                <BatteryFinder
                    userPreferences={userPreferences}
                    utmParameters={utmSearchParameters}
                    pageUrl={pageUrl}
                    categoryBrands={categoryBrands}
                    twoWheelerProducts={twoWheelerProducts}
                    threeWheelerProducts={threeWheelerProducts}
                    carAndSuvProducts={carAndSuvProducts}
                    busAndTruckProducts={busAndTruckProducts}
                    tractorProducts={tractorProducts}
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
    categoryBrands,
    twoWheelerProducts,
    threeWheelerProducts,
    carAndSuvProducts,
    busAndTruckProducts,
    tractorProducts,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
    pageUrl: string;
    categoryBrands: CategoryBrands;
    twoWheelerProducts: Array<DisplayProductsSchema>;
    threeWheelerProducts: Array<DisplayProductsSchema>;
    carAndSuvProducts: Array<DisplayProductsSchema>;
    busAndTruckProducts: Array<DisplayProductsSchema>;
    tractorProducts: Array<DisplayProductsSchema>;
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
                className="tw-max-w-7xl tw-mx-auto"
                categoryBrands={categoryBrands}
            />

            <VehicleCategoryDetails
                userPreferences={userPreferences}
                pageUrl={pageUrl}
                batteryFinderState={batteryFinderState}
                dispatch={dispatch}
                className="tw-max-w-7xl tw-mx-auto"
                twoWheelerProducts={twoWheelerProducts}
                threeWheelerProducts={threeWheelerProducts}
                carAndSuvProducts={carAndSuvProducts}
                busAndTruckProducts={busAndTruckProducts}
                tractorProducts={tractorProducts}
            />

            {/* <div className="lg-px-screen-edge-2 tw-grid tw-grid-cols-1 lg:tw-grid-cols-3 tw-gap-x-8 tw-gap-y-10 tw-max-w-7xl tw-mx-auto">
                <DealerLocator
                    userPreferences={userPreferences}
                    showCtaButton={true}
                    className="tw-w-full lg:tw-h-[36rem]"
                />

                <FaqSection
                    userPreferences={userPreferences}
                    className="lg:tw-col-span-2"
                />
            </div> */}
            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-[minmax(0,2fr),minmax(0,3fr)] lg:tw-grid-rows-1 tw-gap-y-10 lg:tw-gap-x-4 lg:tw-px-[72px] xl:tw-px-[120px] lg:tw-items-center tw-w-full tw-max-w-7xl tw-mx-auto">
                <DealerLocator
                    userPreferences={userPreferences}
                    showCtaButton={true}
                    // TODO: Why do we have a max-h here?
                    className="tw-row-start-1 lg:tw-row-span-full lg:tw-col-start-1 lg:tw-h-full lg:tw-min-h-[36rem] lg:tw-max-h-[36rem] lg:tw-self-start"
                />

                <FaqSection
                    userPreferences={userPreferences}
                    className="tw-row-start-2 lg:tw-col-start-2 lg:tw-row-start-1 lg:tw-justify-items-start lg:tw-pr-0"
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
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-w-full tw-aspect-square lg:tw-aspect-[1280/380] tw-relative tw-isolate tw-grid tw-grid-rows-[2rem_auto_auto_minmax(0,1fr)] lg:tw-grid-rows-[2rem_auto_auto_minmax(0,1fr)]",
                className,
            )}
        >
            {isScreenSizeBelow == null ? null : (
                <FullWidthImage
                    relativePath={isScreenSizeBelow ? "/livguard/battery-finder/1/banner-mobile.jpg" : "/livguard/battery-finder/1/banner-desktop.jpg"}
                    className="tw-absolute tw-inset-0 -tw-z-10"
                    key={isScreenSizeBelow ? "/livguard/battery-finder/1/banner-mobile.jpg" : "/livguard/battery-finder/1/banner-desktop.jpg"}
                />
            )}

            <DefaultTextAnimation className="tw-row-start-2 lg-px-screen-edge-2">
                <div className="lg-text-banner !tw-text-secondary-900-dark tw-text-center lg:tw-text-left">{getVernacularString("d718f6ae-3052-448c-b6ef-95d7c3f5a15d", userPreferences.language)}</div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-3 lg-px-screen-edge-2">
                <div className="lg-text-banner !tw-text-secondary-900-dark tw-text-center lg:tw-text-left">{getVernacularString("c60d4c86-6b68-41d5-b0da-5a6e3930a6f2", userPreferences.language)}</div>
            </DefaultTextAnimation>
        </div>
    );
}

function ChooseYourVehicle({
    userPreferences,
    pageUrl,
    batteryFinderState,
    dispatch,
    className,
    categoryBrands,
}: {
    userPreferences: UserPreferences;
    pageUrl: string;
    batteryFinderState: BatteryFinderState;
    dispatch: React.Dispatch<BatteryFinderAction>;
    className?: string;
    categoryBrands: CategoryBrands;
}) {
    const modelFetcher = useFetcher();
    const fuelFetcher = useFetcher();
    const findBatteryFetcher = useFetcher();

    useEffect(() => {
        if (modelFetcher.data != null) {
            dispatch({
                actionType: BatteryFinderActionType.setModels,
                payload: modelFetcher.data.models,
            });
        }
    }, [modelFetcher.data]);

    useEffect(() => {
        if (fuelFetcher.data != null) {
            dispatch({
                actionType: BatteryFinderActionType.setFuelTypes,
                payload: fuelFetcher.data.fuels,
            });
        }
    }, [fuelFetcher.data]);

    useEffect(() => {
        if (findBatteryFetcher.data != null) {
            console.log(findBatteryFetcher.data);
            dispatch({
                actionType: BatteryFinderActionType.setRecommendedBatteries,
                payload: findBatteryFetcher.data.recommendedBatteries,
            });
        }
    }, [findBatteryFetcher.data]);

    return (
        <div className="lg-px-screen-edge-2 tw-z-10 tw-w-full tw-max-w-7xl tw-mx-auto">
            <div className="tw-w-full tw-rounded-lg lg-bg-secondary-100 lg-card -tw-mt-16 lg:-tw-mt-28">
                <div className="tw-p-4 ">
                    <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

                    <div className="tw-w-full lg-text-title1 lg-text-secondary-900">{getVernacularString("454f7c18-bc20-49a9-a1f8-273420f2679b", userPreferences.language)}</div>

                    <VerticalSpacer className="tw-h-4" />

                    <div className="tw-grid tw-grid-cols-2 sm:tw-grid-cols-3 md:tw-grid-cols-5 tw-gap-x-3 tw-gap-y-3">
                        <ItemBuilder
                            items={categories}
                            itemBuilder={(item, itemIndex) => (
                                <div
                                    className={concatenateNonNullStringsWithSpaces(
                                        categories.length % 2 === 1 && itemIndex === categories.length - 1 ? "max-md:tw-col-span-full max-md:tw-justify-self-center" : "",
                                    )}
                                    key={itemIndex}
                                >
                                    <ButtonWithIconAndText
                                        iconRelativePath={getAbsolutePathForRelativePath(getMetadataForImage(item.iconRelativePath).finalUrl, ImageCdnProvider.Bunny, null, null)}
                                        contentId={item.titleContentId}
                                        isSelected={batteryFinderState.selectedCategoryIndex == itemIndex}
                                        onClick={() =>
                                            dispatch({
                                                actionType: BatteryFinderActionType.setSelectedCategory,
                                                payload: itemIndex,
                                            })
                                        }
                                        userPreferences={userPreferences}
                                    />
                                </div>
                            )}
                        />
                    </div>

                    <VerticalSpacer className="tw-h-6" />

                    <div className="lg:tw-grid lg:tw-grid-cols-4 lg:tw-grid-flow-col lg:tw-gap-x-6">
                        <div className="tw-flex tw-flex-col tw-w-full tw-z-10">
                            <div className="lg-text-body-bold tw-pl-3">{getVernacularString("18953b2c-d9bf-4992-bcbd-903f9c78c0e7", userPreferences.language)}</div>

                            <VerticalSpacer className="tw-h-1" />

                            <FormSelectComponent
                                items={categoryBrands[batteryFinderState.selectedCategoryIndex]}
                                value={batteryFinderState.selectedBrand}
                                setValue={(item) => {
                                    dispatch({
                                        actionType: BatteryFinderActionType.setSelectedBrand,
                                        payload: item,
                                    });
                                    modelFetcher.submit(
                                        {
                                            selectedBrand: item,
                                        },
                                        {method: "GET", action: "/battery-finder/get-models"},
                                    );
                                }}
                                itemBuilder={(item) => (item != null ? item : getVernacularString("261ddd0c-6c3c-40e5-a899-e07dee17d221", userPreferences.language))}
                                buttonClassName="!tw-rounded-full"
                            />
                        </div>

                        <VerticalSpacer className="tw-h-2 lg:tw-hidden" />

                        <div className="tw-flex tw-flex-col tw-w-full tw-z-10">
                            <div className="lg-text-body-bold tw-pl-3">{getVernacularString("4990cdb1-9ee8-44d0-876f-3a668f2e7f9b", userPreferences.language)}</div>

                            <VerticalSpacer className="tw-h-1" />

                            <FormSelectComponent
                                items={batteryFinderState.models}
                                itemBuilder={(item) => (item != null ? item : getVernacularString("f5207071-fe8f-462d-bbf6-19cd5db04407", userPreferences.language))}
                                value={batteryFinderState.selectedModel}
                                setValue={(item) => {
                                    dispatch({
                                        actionType: BatteryFinderActionType.setSelectedModel,
                                        payload: item,
                                    });
                                    fuelFetcher.submit(
                                        {
                                            selectedBrand: batteryFinderState.selectedBrand,
                                            selectedModel: item,
                                        },
                                        {method: "GET", action: "/battery-finder/get-fuels"},
                                    );
                                }}
                                // filterFunction={(items, query) => items.filter((item) => item.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, "")))}
                                // renderFunction={(item) => item}
                                // placeholder="Select Model"
                                disabled={batteryFinderState.selectedBrand == null}
                                buttonClassName="!tw-rounded-full disabled:tw-opacity-[0.4] disabled:!tw-bg-secondary-100-light disabled:dark:tw-opacity-1 disabled:dark:!tw-bg-secondary-300-dark disabled:dark:!tw-text-secondary-900-dark"
                                // inputClassName="disabled:tw-opacity-[0.4] disabled:!tw-bg-secondary-100-light"
                            />
                        </div>

                        <VerticalSpacer className="tw-h-2 lg:tw-hidden" />

                        <div className="tw-flex tw-flex-col tw-w-full tw-z-10">
                            <div className="lg-text-body-bold tw-pl-3">{getVernacularString("e2131e40-08cc-401d-958c-46baa3fa8642", userPreferences.language)}</div>

                            <VerticalSpacer className="tw-h-1" />

                            <FormSelectComponent
                                items={batteryFinderState.fuelTypes}
                                itemBuilder={(item) => (item != null ? item : getVernacularString("8bbfc17d-9232-4f80-8758-6a4a1b98a122", userPreferences.language))}
                                value={batteryFinderState.selectedFuelType}
                                setValue={(item) =>
                                    dispatch({
                                        actionType: BatteryFinderActionType.setSelectedFuelType,
                                        payload: item,
                                    })
                                }
                                // filterFunction={(items, query) => items.filter((item) => item.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, "")))}
                                // renderFunction={(item) => item}
                                // placeholder="Select Fuel Type"
                                disabled={batteryFinderState.selectedModel == null}
                                // inputClassName="disabled:tw-opacity-[0.4] disabled:!tw-bg-secondary-100-light"
                                buttonClassName="!tw-rounded-full disabled:tw-opacity-[0.4] disabled:!tw-bg-secondary-100-light disabled:dark:tw-opacity-1 disabled:dark:!tw-bg-secondary-300-dark disabled:dark:!tw-text-secondary-900-dark"
                            />
                        </div>

                        <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

                        <div className="tw-flex tw-flex-col tw-w-full tw-z-10 tw-h-full">
                            {/* Quick Hack to make button height equal to select components */}
                            <div className="lg-text-body-bold tw-pl-3 tw-invisible">{getVernacularString("e2131e40-08cc-401d-958c-46baa3fa8642", userPreferences.language)}</div>

                            <VerticalSpacer className="tw-h-1" />

                            <button
                                type="button"
                                className="lg-cta-button tw-w-full tw-h-full tw-px-4 tw-mx-auto disabled:!tw-bg-none disabled:!tw-bg-secondary-300-light disabled:dark:!tw-bg-secondary-300-dark disabled:!tw-text-secondary-700-light disabled:dark:!tw-text-secondary-700-dark"
                                disabled={batteryFinderState.selectedFuelType == null}
                                onClick={() => {
                                    findBatteryFetcher.submit(
                                        {
                                            selectedBrand: batteryFinderState.selectedBrand,
                                            selectedModel: batteryFinderState.selectedModel,
                                            selectedFuel: batteryFinderState.selectedFuelType,
                                            vtype: indexToVehicleTypeMap[batteryFinderState.selectedCategoryIndex],
                                        },
                                        {method: "GET", action: "/battery-finder/get-recommended-batteries"},
                                    );
                                }}
                            >
                                {getVernacularString("112996e0-2850-4283-af77-7514a386d172", userPreferences.language)}
                            </button>
                        </div>
                    </div>

                    <VerticalSpacer className="tw-h-8" />

                    {batteryFinderState.isApplied && batteryFinderState.recommendedBatteries && (
                        <div className="tw-grid tw-grid-flow-row lg:tw-grid-flow-col lg:tw-grid-cols-[minmax(0,2fr)_minmax(0,5fr)] lg:tw-gap-x-10">
                            {/* <div className="tw-col-start-1 tw-w-full tw-h-full tw-border tw-border-dashed tw-border-secondary-900-light dark:tw-border-secondary-900-dark"></div> */}

                            <div
                                className={concatenateNonNullStringsWithSpaces(
                                    "tw-grid tw-grid-rows-[minmax(0,1fr)_repeat(3,auto)_minmax(0,1fr)] tw-w-full tw-h-full tw-rounded-lg tw-gap-y-4 tw-justify-center tw-place-self-center tw-px-4 tw-border tw-border-solid tw-border-secondary-900-light dark:tw-border-secondary-900-dark",
                                    // batteryFinderState.recommendedBatteries.length === 0 ? "lg:tw-col-span-full lg:tw-w-2/5 lg:tw-justify-self-center" : "",
                                )}
                            >
                                <div className="tw-row-start-2 tw-w-full tw-grid tw-justify-center">
                                    <FixedWidthImage
                                        relativePath="/livguard/icons/confirmation.png"
                                        width="10rem"
                                    />
                                </div>

                                <div className="lg-text-body-bold tw-row-start-3 tw-text-center tw-border tw-border-dashed tw-border-secondary-900-light dark:tw-border-secondary-900-dark tw-rounded-[4px] tw-p-2">
                                    <span>{getVernacularString("b5397d56-d5b3-4697-a419-6502cdd1ff81", userPreferences.language)} </span>
                                    <span>{batteryFinderState.recommendedBatteries.length}</span>
                                    <span> {getVernacularString("7cfaf737-8887-4f28-936f-014215c0dda7", userPreferences.language)}</span>
                                </div>

                                <div className="lg-text-body tw-row-start-4 tw-text-center">
                                    <span>{getVernacularString("e7c60040-8fbd-4296-82ce-9ab85cc9bbea", userPreferences.language)} </span>
                                    <span>{getVernacularString(categoryNames[batteryFinderState.selectedCategoryIndex], userPreferences.language).toLowerCase()}</span>
                                    <span>{getVernacularString("14dc2eb0-2c97-40c7-ba8f-aead0e174deb", userPreferences.language)} </span>
                                </div>
                            </div>

                            <VerticalSpacer className="tw-h-6 lg:tw-hidden" />

                            <div className="lg:tw-col-start-2">
                                {batteryFinderState.recommendedBatteries.length === 0 ? null : batteryFinderState.recommendedBatteries.length === 1 ? (
                                    <ProductCardFourDetails
                                        userPreferences={userPreferences}
                                        {...batteryFinderState.recommendedBatteries[0]}
                                    />
                                ) : (
                                    <CarouselStyle4
                                        items={batteryFinderState.recommendedBatteries.map((battery, batteryIndex) => {
                                            return (
                                                <ProductCardFourDetails
                                                    userPreferences={userPreferences}
                                                    {...battery}
                                                    key={batteryIndex}
                                                />
                                            );
                                        })}
                                        slidesContainerClassName="!tw-auto-cols-[100%]"
                                        itemContainerClassName="!tw-px-0 lg:!tw-px-3"
                                    />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function VehicleCategoryDetails({
    userPreferences,
    pageUrl,
    batteryFinderState,
    dispatch,
    className,
    twoWheelerProducts,
    threeWheelerProducts,
    carAndSuvProducts,
    busAndTruckProducts,
    tractorProducts,
}: {
    userPreferences: UserPreferences;
    pageUrl: string;
    batteryFinderState: BatteryFinderState;
    dispatch: React.Dispatch<BatteryFinderAction>;
    className?: string;
    twoWheelerProducts: Array<DisplayProductsSchema>;
    threeWheelerProducts: Array<DisplayProductsSchema>;
    carAndSuvProducts: Array<DisplayProductsSchema>;
    busAndTruckProducts: Array<DisplayProductsSchema>;
    tractorProducts: Array<DisplayProductsSchema>;
}) {
    const products = {
        [VehicleCategory.twoWheeler]: twoWheelerProducts,
        [VehicleCategory.threeWheeler]: threeWheelerProducts,
        [VehicleCategory.carAndSuv]: carAndSuvProducts,
        [VehicleCategory.busAndTruck]: busAndTruckProducts,
        [VehicleCategory.tractor]: tractorProducts,
    };

    const banners = {
        [VehicleCategory.twoWheeler]: {
            bannerDesktop: "/livguard/two-wheeler/1/banner-desktop.jpg",
            bannerMobile: "/livguard/two-wheeler/1/banner-mobile.jpg",
        },
        [VehicleCategory.threeWheeler]: {
            bannerDesktop: "/livguard/three-wheeler/1/banner-desktop.jpg",
            bannerMobile: "/livguard/three-wheeler/1/banner-mobile.jpg",
        },
        [VehicleCategory.carAndSuv]: {
            bannerDesktop: "/livguard/car-and-suv/1/banner-desktop.jpg",
            bannerMobile: "/livguard/car-and-suv/1/banner-mobile.jpg",
        },
        [VehicleCategory.tractor]: {
            bannerDesktop: "/livguard/tractor/1/banner-desktop.jpg",
            bannerMobile: "/livguard/tractor/1/banner-mobile.jpg",
        },
        // [VehicleCategory.eRickshaw]: {
        //     bannerDesktop: "/livguard/e-rickshaw-batteries/1/banner-desktop.jpg",
        //     bannerMobile: "/livguard/e-rickshaw-batteries/1/banner-mobile.jpg",
        // },
        [VehicleCategory.busAndTruck]: {
            bannerDesktop: "/livguard/bus-and-truck/1/banner-desktop.jpg",
            bannerMobile: "/livguard/bus-and-truck/1/banner-mobile.jpg",
        },
    };

    const isScreenSizeBelow = useIsScreenSizeBelow(1024);
    const [isViewMore, setIsViewMore] = useState(false);

    return (
        <div className="tw-w-full tw-grid tw-grid-cols-1">
            <div
                className={concatenateNonNullStringsWithSpaces(
                    "tw-aspect-square lg:tw-aspect-[1280/380] tw-grid tw-grid-rows-[4rem_auto_auto_minmax(0,1fr)] lg:tw-grid-rows-[4rem_auto_auto_minmax(0,1fr)] lg:tw-grid-cols-2 tw-text-center",
                )}
            >
                {isScreenSizeBelow == null ? null : (
                    <div className="tw-row-start-1 tw-col-start-1 tw-row-span-full lg:tw-col-span-full">
                        <FullWidthImage
                            relativePath={isScreenSizeBelow ? banners[batteryFinderState.selectedCategoryIndex].bannerMobile : banners[batteryFinderState.selectedCategoryIndex].bannerDesktop}
                            key={isScreenSizeBelow ? banners[batteryFinderState.selectedCategoryIndex].bannerMobile : "/livguard/battery-finder/3/bottom-banner-desktop.jpg"}
                        />
                    </div>
                )}

                <DefaultTextAnimation className="tw-row-start-2 tw-col-start-1 lg-px-screen-edge-2 lg:tw-px-0">
                    <div className="lg-text-banner tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start lg:tw-text-left lg:lg-px-screen-edge-2">
                        {getVernacularString("d11295cc-c71b-40d3-b0c3-6dfb96473a3a", userPreferences.language)}
                    </div>
                </DefaultTextAnimation>

                <DefaultTextAnimation className="tw-row-start-3 tw-col-start-1 lg-px-screen-edge-2 lg:tw-px-0">
                    <div className="lg-text-banner tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start lg:tw-text-left lg:lg-px-screen-edge-2">
                        {getVernacularString(categories[batteryFinderState.selectedCategoryIndex].titleContentId, userPreferences.language)}
                    </div>
                </DefaultTextAnimation>
            </div>

            <div className="lg-px-screen-edge-2 tw-z-10 tw-max-w-7xl tw-mx-auto">
                <div className="tw-w-full tw-rounded-lg lg-bg-secondary-100 lg-card -tw-mt-4 lg:-tw-mt-4 tw-grid tw-grid-cols-1 tw-gap-x-4 tw-gap-y-4 tw-p-9">
                    <div className="tw-row-start-1 tw-col-start-1 tw-self-center tw-text-center">
                        {getVernacularString(categories[batteryFinderState.selectedCategoryIndex].bodyContentId, userPreferences.language)}
                    </div>

                    <Link
                        to={categories[batteryFinderState.selectedCategoryIndex].link}
                        className="tw-row-start-2 tw-col-start-1 tw-place-self-center lg-cta-outline-button lg-cta-outline-button-transition hover:tw-px-[4.125rem] tw-w-full lg:tw-w-fit tw-px-4 lg:tw-px-16 tw-mx-auto tw-text-center"
                    >
                        {getVernacularString("8b6be5de-9c57-461a-8ec5-106f29eccaca", userPreferences.language)}
                    </Link>
                </div>
            </div>

            <VerticalSpacer className="tw-h-4" />

            <div className="lg-px-screen-edge-2 tw-z-10 tw-max-w-7xl tw-mx-auto">
                <div className="tw-w-full tw-grid tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-x-4 tw-gap-y-4">
                    {isViewMore
                        ? products[batteryFinderState.selectedCategoryIndex].map((product, productIndex) => {
                              return (
                                  <ProductCardTwoDetails
                                      slug={product.slug}
                                      productType={product.productType}
                                      userPreferences={userPreferences}
                                      imageRelativeUrl={`/livguard/products/${product.slug}/thumbnail.png`}
                                      productName={product.productName}
                                      productPrice={product.productPrice}
                                      specification1={`${product.capacity} ${getVernacularString("2e8cc29a-b2ca-4363-90d8-aba062f1d5fb", userPreferences.language)}`}
                                      specification2={`${product.warranty} ${getVernacularString("05c55898-5398-4058-86d3-2d0002a1b3d4", userPreferences.language)}`}
                                      isBestSeller={false}
                                      key={productIndex}
                                  />
                              );
                          })
                        : products[batteryFinderState.selectedCategoryIndex].slice(0, 4).map((product, productIndex) => {
                              return (
                                  <ProductCardTwoDetails
                                      slug={product.slug}
                                      productType={product.productType}
                                      userPreferences={userPreferences}
                                      imageRelativeUrl={`/livguard/products/${product.slug}/thumbnail.png`}
                                      productName={product.productName}
                                      productPrice={product.productPrice}
                                      specification1={`${product.capacity} ${getVernacularString("2e8cc29a-b2ca-4363-90d8-aba062f1d5fb", userPreferences.language)}`}
                                      specification2={`${product.warranty} ${getVernacularString("05c55898-5398-4058-86d3-2d0002a1b3d4", userPreferences.language)}`}
                                      isBestSeller={false}
                                      key={productIndex}
                                  />
                              );
                          })}
                </div>
            </div>

            <VerticalSpacer className="tw-h-4 lg:tw-h-8" />

            {products[batteryFinderState.selectedCategoryIndex].length == null
                ? null
                : products[batteryFinderState.selectedCategoryIndex].length > 4 && (
                      <button
                          className="lg-cta-button tw-place-self-center"
                          onClick={() => setIsViewMore((prev) => !prev)}
                      >
                          {isViewMore
                              ? getVernacularString("ac9a30fb-5654-4692-9995-84c2dbe8301b", userPreferences.language)
                              : getVernacularString("8993dcbc-2216-4dd2-954e-e8145571049f", userPreferences.language)}
                      </button>
                  )}
        </div>
    );
}

function FaqSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const faqs = [
        {
            question: "6c5df4f9-c8bd-4725-8267-cc67c1e65feb",
            answer: "bbe1fe9e-db3f-47a9-8966-2e620d35d460",
        },
        {
            question: "8e43c85e-b25f-401f-83bd-cb0083ab4ae5",
            answer: "f8376afd-334a-4ad2-b9af-d2e0637bf1aa",
        },
        {
            question: "36fed918-e880-4b8c-afb6-66f1a2e6fdd1",
            answer: "e304fd7e-b654-43ab-b396-9ac850df846b",
        },
        {
            question: "e922ab6c-96e4-4f6f-9536-49a66592ce1a",
            answer: "b8b8b211-3092-4f5f-98df-f74f28aa1b21",
        },
        {
            question: "5b8bcbfe-df7a-4df6-b45d-1f541c2934e5",
            answer: "f1b65223-4013-403e-8991-79be559dd397",
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
