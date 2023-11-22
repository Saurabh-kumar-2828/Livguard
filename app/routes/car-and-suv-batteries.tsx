import type {LoaderFunction, V2_MetaFunction} from "@remix-run/node";
import {Fetcher, FetcherWithComponents, Link, useFetcher, useLoaderData} from "@remix-run/react";
import React, {useContext, useEffect, useReducer, useRef, useState} from "react";
import {Facebook, Instagram, Linkedin, Twitter, Youtube} from "react-bootstrap-icons";
import {useInView} from "react-intersection-observer";
import {carAndSuvBatteriesBrands} from "~/backend/battery-finder.server";
import {getProductFromSlugAndLanguage} from "~/backend/product.server";
import {SubCategoryProductsInternal} from "~/components/automotive-batteries/subCategoryProductsInternal";
import {CarouselStyle3} from "~/components/carouselStyle3";
import {CarouselStyle5} from "~/components/carouselStyle5";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {EmbeddedYoutubeVideo} from "~/components/embeddedYoutubeVideo";
import {FaqSectionInternal} from "~/components/faqs";
import {FilterAccordion} from "~/components/filterAccordion";
import {FullHeightImage} from "~/components/images/fullHeightImage";
import {FullWidthImage} from "~/components/images/simpleFullWidthImage";
import {PageScaffold} from "~/components/pageScaffold";
import {ProductAndCategoryBottomBar} from "~/components/productAndCategoryBottomBar";
import {SecondaryNavigationControllerContext} from "~/contexts/secondaryNavigationControllerContext";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {ImageCdnProvider, ImageMetadata} from "~/common--type-definitions/typeDefinitions";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {SecondaryNavigationController, useSecondaryNavigationController} from "~/hooks/useSecondaryNavigationController";
import {FormSelectComponent} from "~/livguard-common-typescript/scratchpad";
import {ProductDetails, ProductType} from "~/productData.types";
import {DealerLocator} from "~/reusableSections/dealerLocator";
import type {BatteryFinderAction} from "~/routes/car-and-suv/index.state";
import {BatteryFinderActionType, batteryFinderInitialState, batteryFinderReducer} from "~/routes/car-and-suv/index.state";
import type {BatteryFinderState} from "~/routes/car-and-suv/index.types";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {UserPreferences} from "~/typeDefinitions";
import {Language} from "~/typeDefinitions";
import {getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest, secondaryNavThreshold} from "~/utilities";
import {getContentGenerator} from "~/vernacularProvider";
import {ContentProviderContext} from "~/contexts/contentProviderContext";
import {getVernacularFromBackend} from "~/backend/vernacularProvider.server";
import {getImageMetadataLibraryFromBackend, getMetadataForImageServerSide} from "~/backend/imageMetaDataLibrary.server";
import {ImageProviderContext} from "~/contexts/imageMetaDataContext";
import {FancySearchableSelect} from "~/components/searchableSelects";
import {AutomotiveTestimonials} from "~/routes/two-wheeler-batteries";
import { SocialMediaFeedsSection } from ".";

export const meta: V2_MetaFunction = ({data: loaderData}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = loaderData.userPreferences;
    if (userPreferences.language == Language.English) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/car-and-suv-batteries",
            },
            {
                title: "Enhance Your Ride with Livguard Car & SUV Batteries",
            },
            {
                name: "description",
                content: "Discover thrilling journeys with Livguard's extensive selection of Car & SUV batteries. Make each ride unique by selecting the ideal fit for your vehicle's need.",
            },
            {
                property: "og:title",
                content: "Enhance Your Ride with Livguard Car & SUV Batteries",
            },
            {
                property: "og:description",
                content: "Discover thrilling journeys with Livguard's extensive selection of Car & SUV batteries. Make each ride unique by selecting the ideal fit for your vehicle's need.",
            },
            {
                property: "og:site_name",
                content: "Livguard",
            },
            {
                property: "og:type",
                content: "Product",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/car-and-suv-batteries",
            },
            {
                property: "og:image",
                content: loaderData.ogBanner,
            },
        ];
    } else if (userPreferences.language == Language.Hindi) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/car-and-suv-batteries",
            },
            {
                title: "लिवगार्ड कार और एसयूवी बैटरियों के साथ अपनी यात्रा को बेहतर बनाएं",
            },
            {
                name: "description",
                content: "लिवगार्ड की कार और एसयूवी बैटरियों के व्यापक चयन के साथ रोमांचक यात्राओं की खोज करें। अपने वाहन की आवश्यकताओं के लिए आदर्श फिट का चयन करके प्रत्येक यात्रा को अनोखा बनाएं।",
            },
            {
                property: "og:title",
                content: "लिवगार्ड कार और एसयूवी बैटरियों के साथ अपनी यात्रा को बेहतर बनाएं",
            },
            {
                property: "og:description",
                content: "लिवगार्ड की कार और एसयूवी बैटरियों के व्यापक चयन के साथ रोमांचक यात्राओं की खोज करें। अपने वाहन की आवश्यकताओं के लिए आदर्श फिट का चयन करके प्रत्येक यात्रा को अनोखा बनाएं।",
            },
            {
                property: "og:site_name",
                content: "Livguard",
            },
            {
                property: "og:type",
                content: "Product",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/car-and-suv-batteries",
            },
            {
                property: "og:image",
                content: loaderData.ogBanner,
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
    zingEternaProducts: Array<ProductDetails>;
    zingUltraProducts: Array<ProductDetails>;
    zingPrimoProducts: Array<ProductDetails>;
    xtraProducts: Array<ProductDetails>;
    proCabProducts: Array<ProductDetails>;
    proCabPlusProducts: Array<ProductDetails>;
    batteryFinderBrands: Array<string>;
    initialRecommendedBatteries: Array<ProductDetails>;
    vernacularData: {
        [id: string]: string;
    };
    imageMetaDataLibrary: {
        [relativePath: string]: ImageMetadata | undefined;
    };
    ogBanner: string;
};

export const loader: LoaderFunction = async ({request}) => {
    const userPreferences = await getUserPreferencesFromCookiesAndUrlSearchParameters(request);
    if (userPreferences instanceof Error) {
        throw userPreferences;
    }

    const zingEternaSlugs = ["ze38b20l", "ze38b20r", "ze55b24lsl"];
    const zingUltraSlugs = ["zu42b20l", "zu42b20r", "zu42b20bhl", "zudin44lhl", "zudin50l", "zudin55r", "zudin60l", "zudin65lhl", "zu75d23bhl"];
    const zingPrimoSlugs = ["zp38b20l", "zp38b20r", "zp70d26l", "zp70d26r"];
    const xtraSlugs = ["zx40b20l", "zx40b20r"];
    const proCabSlugs = ["pc38b20l"];
    const proCabPlusSlugs = ["pp38b20l"];

    const zingEternaProducts = zingEternaSlugs.map((slug) => getProductFromSlugAndLanguage(slug, userPreferences.language));
    const zingUltraProducts = zingUltraSlugs.map((slug) => getProductFromSlugAndLanguage(slug, userPreferences.language));
    const zingPrimoProducts = zingPrimoSlugs.map((slug) => getProductFromSlugAndLanguage(slug, userPreferences.language));
    const xtraProducts = xtraSlugs.map((slug) => getProductFromSlugAndLanguage(slug, userPreferences.language));
    const proCabProducts = proCabSlugs.map((slug) => getProductFromSlugAndLanguage(slug, userPreferences.language));
    const proCabPlusProducts = proCabPlusSlugs.map((slug) => getProductFromSlugAndLanguage(slug, userPreferences.language));

    const batteryFinderBrands = carAndSuvBatteriesBrands;

    const initialRecommendedBatterySlugs = ["zp38b20r", "zudin50l"];
    const initialRecommendedBatteries = initialRecommendedBatterySlugs.map((slug) => getProductFromSlugAndLanguage(slug, userPreferences.language));

    const vernacularData = getVernacularFromBackend("carAndSuvBatteriesPage", userPreferences.language);
    const imageMetaDataLibrary = getImageMetadataLibraryFromBackend("carAndSuvBatteriesPage");
    const ogBanner = getAbsolutePathForRelativePath(getMetadataForImageServerSide("/livguard/car-and-suv/car-and-suv-og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null);

    const loaderData: LoaderData = {
        userPreferences: userPreferences,
        redirectTo: getRedirectToUrlFromRequest(request),
        pageUrl: getUrlFromRequest(request),
        zingEternaProducts: zingEternaProducts,
        zingUltraProducts: zingUltraProducts,
        zingPrimoProducts: zingPrimoProducts,
        xtraProducts: xtraProducts,
        proCabProducts: proCabProducts,
        proCabPlusProducts: proCabPlusProducts,
        batteryFinderBrands: batteryFinderBrands,
        initialRecommendedBatteries: initialRecommendedBatteries,
        vernacularData: vernacularData,
        imageMetaDataLibrary: imageMetaDataLibrary,
        ogBanner: ogBanner,
    };

    return loaderData;
};

export default () => {
    const {
        userPreferences,
        redirectTo,
        pageUrl,
        zingEternaProducts,
        zingUltraProducts,
        zingPrimoProducts,
        xtraProducts,
        proCabProducts,
        proCabPlusProducts,
        batteryFinderBrands,
        initialRecommendedBatteries,
        vernacularData,
        imageMetaDataLibrary,
    } = useLoaderData() as LoaderData;

    const utmSearchParameters = useUtmSearchParameters();

    const secondaryNavigationController = useSecondaryNavigationController();

    return (
        <>
            <ImageProviderContext.Provider value={imageMetaDataLibrary}>
                <ContentProviderContext.Provider
                    value={{
                        getContent: getContentGenerator(vernacularData),
                    }}
                >
                    <PageScaffold
                        userPreferences={userPreferences}
                        redirectTo={redirectTo}
                        showMobileMenuIcon={true}
                        utmParameters={utmSearchParameters}
                        pageUrl={pageUrl}
                        breadcrumbs={[
                            {contentId: "cfab263f-0175-43fb-91e5-fccc64209d36", link: "/"},
                            {contentId: "968b8d68-221e-401e-9876-095dc769f912", link: "#"},
                        ]}
                        secondaryNavigationController={secondaryNavigationController}
                    >
                        <SecondaryNavigationControllerContext.Provider value={secondaryNavigationController}>
                            <CarAndSuvBatteriesPage
                                userPreferences={userPreferences}
                                utmParameters={utmSearchParameters}
                                pageUrl={pageUrl}
                                secondaryNavigationController={secondaryNavigationController}
                                zingEternaProducts={zingEternaProducts}
                                zingUltraProducts={zingUltraProducts}
                                zingPrimoProducts={zingPrimoProducts}
                                xtraProducts={xtraProducts}
                                proCabProducts={proCabProducts}
                                proCabPlusProducts={proCabPlusProducts}
                                batteryFinderBrands={batteryFinderBrands}
                                initialRecommendedBatteries={initialRecommendedBatteries}
                            />
                        </SecondaryNavigationControllerContext.Provider>
                    </PageScaffold>

                    <ProductAndCategoryBottomBar
                        userPreferences={userPreferences}
                        utmParameters={utmSearchParameters}
                        pageUrl={pageUrl}
                    />
                </ContentProviderContext.Provider>
            </ImageProviderContext.Provider>
        </>
    );
};

function CarAndSuvBatteriesPage({
    userPreferences,
    utmParameters,
    pageUrl,
    secondaryNavigationController,
    zingEternaProducts,
    zingUltraProducts,
    zingPrimoProducts,
    xtraProducts,
    proCabProducts,
    proCabPlusProducts,
    batteryFinderBrands,
    initialRecommendedBatteries,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
    pageUrl: string;
    secondaryNavigationController?: SecondaryNavigationController;
    zingEternaProducts: Array<ProductDetails>;
    zingUltraProducts: Array<ProductDetails>;
    zingPrimoProducts: Array<ProductDetails>;
    xtraProducts: Array<ProductDetails>;
    proCabProducts: Array<ProductDetails>;
    proCabPlusProducts: Array<ProductDetails>;
    batteryFinderBrands: Array<string>;
    initialRecommendedBatteries: Array<ProductDetails>;
}) {
    return (
        <>
            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-x-16 tw-items-start tw-justify-center">
                <HeroSection
                    userPreferences={userPreferences}
                    className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
                />
                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-2 tw-col-start-1 lg:tw-col-span-full" />

                <StrongAutomotiveBatteries
                    userPreferences={userPreferences}
                    className="tw-row-start-4 tw-col-start-1 lg-px-screen-edge-2 lg:tw-px-0 tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-5 tw-col-start-1 lg:tw-col-span-full" />

                <OurSuggestionsBasedOnYourChoice
                    userPreferences={userPreferences}
                    className="tw-row-start-6 tw-col-start-1 lg:tw-col-span-full tw-w-full"
                    batteryFinderBrands={batteryFinderBrands}
                    initialRecommendedBatteries={initialRecommendedBatteries}
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-7 tw-col-start-1 lg:tw-col-span-full" />

                <TopCarAndSuvBatteryPicks
                    userPreferences={userPreferences}
                    className="tw-row-start-8 tw-col-start-1 lg:tw-col-span-full tw-max-w-7xl tw-mx-auto"
                    zingEternaProducts={zingEternaProducts}
                    zingUltraProducts={zingUltraProducts}
                    zingPrimoProducts={zingPrimoProducts}
                    xtraProducts={xtraProducts}
                    proCabProducts={proCabProducts}
                    proCabPlusProducts={proCabPlusProducts}
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-9 tw-col-start-1 lg:tw-col-span-full" />

                <div className="tw-row-start-10 tw-grid lg:tw-grid-cols-[minmax(0,1fr)_minmax(0,2fr)] tw-col-span-full lg:lg-px-screen-edge-2 tw-gap-x-5 tw-max-w-7xl tw-mx-auto">
                    <DealerLocator
                        userPreferences={userPreferences}
                        showCtaButton={true}
                        secondaryNavigationName="0cb6d442-7df4-4272-a36d-9f956bdd8a54"
                        className="tw-row-start-5 lg:tw-col-start-1 lg:tw-h-full"
                    />

                    <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-6 lg:tw-col-start-1 lg:tw-col-span-full lg:tw-hidden" />

                    <ChooseYourIdealCarAndSUVBattery
                        userPreferences={userPreferences}
                        className="tw-row-start-7 lg:tw-row-start-5 lg:tw-col-start-2"
                    />
                </div>

                <VerticalSpacer className="tw-h-11 lg:tw-h-20 tw-row-start-[11] tw-col-start-1 lg:tw-col-span-full" />

                <AutomotiveTestimonials
                    userPreferences={userPreferences}
                    className="tw-row-start-[12] lg:tw-col-start-1 lg:tw-col-span-full lg-px-screen-edge-2"
                />

                <VerticalSpacer className="tw-h-11 lg:tw-h-20 tw-row-start-[13] tw-col-start-1 lg:tw-col-span-full" />

                {/* <SocialHandles
                    userPreferences={userPreferences}
                    heading={{text1: "b0a3aa40-4b00-4bdd-88e0-67085fafa92b", text2: `c0f802cc-902b-4328-b631-a3fad8fc7d18`}}
                    className="tw-row-start-[14] tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px] tw-gap-[1rem] tw-max-w-7xl tw-mx-auto"
                /> */}
                <SocialMediaFeedsSection
                    userPreferences={userPreferences}
                    className="tw-row-start-[14] tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px] tw-gap-[1rem] tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[15] tw-col-start-1 lg:tw-col-span-full" />

                <FaqSection
                    userPreferences={userPreferences}
                    className="tw-row-start-[16] lg:tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px] tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[17] tw-col-start-1 lg:tw-col-span-full" />
            </div>
        </>
    );
}

function HeroSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-aspect-square lg:tw-aspect-[1280/380] tw-grid tw-grid-rows-[4rem_auto_auto_minmax(0,1fr)] lg:tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)] lg:tw-grid-cols-2 tw-text-center",
                className,
            )}
        >
            {isScreenSizeBelow == null ? null : (
                <div className="tw-row-start-1 tw-col-start-1 tw-row-span-full lg:tw-col-span-full">
                    <FullWidthImage
                        relativePath={isScreenSizeBelow ? "/livguard/car-and-suv/1/mobile-banner.jpg" : "/livguard/car-and-suv/1/desktop-banner.jpg"}
                        key={isScreenSizeBelow ? "/livguard/car-and-suv/1/mobile-banner.jpg" : "/livguard/car-and-suv/1/desktop-banner.jpg"}
                    />
                </div>
            )}

            <DefaultTextAnimation className="tw-row-start-2 tw-col-start-1 lg-px-screen-edge-2 lg:tw-px-0">
                <div className="lg-text-banner tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start lg:tw-text-left lg:lg-px-screen-edge-2">
                    {contentData.getContent("835eb595-c459-46db-a37a-f310363e1733")}
                </div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-3 tw-col-start-1 lg-px-screen-edge-2 lg:tw-px-0">
                <div className="lg-text-banner tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start lg:tw-text-left lg:lg-px-screen-edge-2">
                    {contentData.getContent("4abfa328-bde2-4190-b944-71556401c22c")}
                </div>
            </DefaultTextAnimation>
        </div>
    );
}

function StrongAutomotiveBatteries({userPreferences, className}: {userPreferences: UserPreferences; className: string}) {
    const contentData = useContext(ContentProviderContext);
    const BatteryCard = ({title, description, imageRelativePath}: {title: string; description: string; imageRelativePath: string}) => {
        return (
            <div
                className={concatenateNonNullStringsWithSpaces(
                    "tw-place-self-center tw-grid tw-grid-rows-[auto_1rem_auto_1rem_auto_minmax(1rem,1fr)] tw-cols-[auto] tw-w-full tw-h-full tw-px-4 tw-py-4 lg-card tw-rounded-lg",
                )}
            >
                <div className="tw-row-start-1">
                    <FullWidthImage
                        relativePath={imageRelativePath}
                        className="tw-rounded-lg"
                    />
                </div>

                <div className="tw-row-start-3 tw-text-center lg-text-title1 lg-text-secondary-900">{title}</div>

                <div className="tw-row-start-5 tw-text-center lg-text-body lg-text-secondary-900">{description}</div>
            </div>
        );
    };

    const batteriesData: Array<{titleTextContentPiece: string; bodyTextContentPiece: string; imageRelativePath: string}> = [
        {
            titleTextContentPiece: "f6ffda18-14b4-4973-9f1d-8394404caae0",
            bodyTextContentPiece: "a3d4f75e-dfc7-4a1e-b227-f7ba59c7415d",
            imageRelativePath: "/livguard/car-and-suv/2/warranty.jpg",
        },
        {
            titleTextContentPiece: "035647a1-11fd-46c8-9779-6ca45d66aef9",
            bodyTextContentPiece: "7e6ef891-fa59-4673-b436-af77ecff2da0",
            imageRelativePath: "/livguard/car-and-suv/2/cranking.jpg",
        },
        {
            titleTextContentPiece: "c5b351d6-0747-4a75-8e47-48f20f9adb0f",
            bodyTextContentPiece: "521768ff-9aa1-41fe-b403-5fbeaf100b3b",
            imageRelativePath: "/livguard/car-and-suv/2/maintainance.jpg",
        },
        {
            titleTextContentPiece: "79f76b0b-3fce-4d4f-8fb8-4a468a20420b",
            bodyTextContentPiece: "559a1118-7d22-4c63-8838-c246921b9361",
            imageRelativePath: "/livguard/car-and-suv/2/battery-life.jpg",
        },
        {
            titleTextContentPiece: "f6ffda18-14b4-4973-9f1d-8394404caae0",
            bodyTextContentPiece: "a3d4f75e-dfc7-4a1e-b227-f7ba59c7415d",
            imageRelativePath: "/livguard/car-and-suv/2/warranty.jpg",
        },
        {
            titleTextContentPiece: "035647a1-11fd-46c8-9779-6ca45d66aef9",
            bodyTextContentPiece: "7e6ef891-fa59-4673-b436-af77ecff2da0",
            imageRelativePath: "/livguard/car-and-suv/2/cranking.jpg",
        },
        {
            titleTextContentPiece: "c5b351d6-0747-4a75-8e47-48f20f9adb0f",
            bodyTextContentPiece: "521768ff-9aa1-41fe-b403-5fbeaf100b3b",
            imageRelativePath: "/livguard/car-and-suv/2/maintainance.jpg",
        },
        {
            titleTextContentPiece: "79f76b0b-3fce-4d4f-8fb8-4a468a20420b",
            bodyTextContentPiece: "559a1118-7d22-4c63-8838-c246921b9361",
            imageRelativePath: "/livguard/car-and-suv/2/battery-life.jpg",
        },
    ];
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "automotive-batteries": {
                humanReadableName: contentData.getContent("6a913f56-4d4d-47c2-8eb3-b45107adc2fa"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <>
            <div
                className={concatenateNonNullStringsWithSpaces("tw-w-full lg:tw-col-span-full", className)}
                id="automotive-batteries"
                ref={sectionRef}
            >
                <DefaultTextAnimation className="tw-flex tw-flex-col tw-items-center lg-text-headline lg:lg-px-screen-edge-2 lg:tw-pl-0 lg:tw-pr-0 tw-text-center lg:tw-text-left">
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent("32311f43-f3bd-4137-8d35-381f0bfff7bf")}} />
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent("30486bb4-8e46-4f90-87e0-1ecf2addaba4")}} />
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-4 lg:tw-h-8" />

                <CarouselStyle5
                    snapDotsDivisionFactor={2}
                    items={batteriesData.map((batteryData, batteryDataIndex) => (
                        <BatteryCard
                            title={contentData.getContent(batteryData.titleTextContentPiece)}
                            description={contentData.getContent(batteryData.bodyTextContentPiece)}
                            imageRelativePath={batteryData.imageRelativePath}
                            key={batteryDataIndex}
                        />
                    ))}
                    className="tw-mx-auto"
                    deselectedContainersClassName="tw-scale-[0.9] tw-h-full"
                    selectedContainerClassName="tw-h-full"
                    itemContainerClassName="lg:tw-px-0"
                />
            </div>
        </>
    );
}

function OurSuggestionsBasedOnYourChoice({
    userPreferences,
    className,
    batteryFinderBrands,
    initialRecommendedBatteries,
}: {
    userPreferences: UserPreferences;
    className?: string;
    batteryFinderBrands: Array<string>;
    initialRecommendedBatteries: Array<ProductDetails>;
}) {
    const contentData = useContext(ContentProviderContext);
    const [batteryFinderState, dispatch] = useReducer(batteryFinderReducer, batteryFinderInitialState(userPreferences.language, batteryFinderBrands, initialRecommendedBatteries));

    const segmentFetcher = useFetcher();
    const modelFetcher = useFetcher();
    const fuelFetcher = useFetcher();
    const findBatteryFetcher = useFetcher();
    const [brandIndex, setBrandIndex] = useState <number | null> (null);

    useEffect(() => {
        if (segmentFetcher.data != null) {
            dispatch({
                actionType: BatteryFinderActionType.setSegments,
                payload: segmentFetcher.data.segments,
            });
        }
    }, [segmentFetcher.data]);

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
            dispatch({
                actionType: BatteryFinderActionType.setRecommendedBatteries,
                payload: findBatteryFetcher.data.recommendedBatteries,
            });
        }
    }, [findBatteryFetcher.data]);

    const isScreenSizeBelow = useIsScreenSizeBelow(1024);

    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "our-suggestions": {
                humanReadableName: contentData.getContent("fd870044-1ccb-40ac-b406-2a94d7ea0228"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-w-full tw-grid tw-grid-flow-row lg-bg-our-suggestions", className)}
            id="our-suggestions"
            ref={sectionRef}
        >
            <VerticalSpacer className="tw-h-6 lg:tw-h-10" />

            <div
                className="lg-text-headline tw-place-self-center"
                dangerouslySetInnerHTML={{__html: contentData.getContent("1d2d55db-13cc-47d8-b960-9aa8906e1922")}}
            />
            <div className="lg-text-headline tw-place-self-center">{contentData.getContent("cd8f0fe0-3dae-485f-aa06-dac1a5450012")}</div>

            <VerticalSpacer className="tw-h-4 lg:tw-h-6" />

            <div className="tw-max-w-7xl tw-mx-auto lg-px-screen-edge-2 tw-hidden tw-w-full tw-place-self-center lg:tw-grid lg:tw-grid-flow-col lg:tw-grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] tw-items-center tw-gap-4">
                <div>{contentData.getContent("c505d928-fde1-4ad6-95f4-2f3109e0e87f")}</div>
                <div>
                    {/* <FormSelectComponent
                        items={batteryFinderBrands}
                        itemBuilder={(item) => {
                            return item == null ? contentData.getContent("38a5a09b-8b40-42ea-8d49-52cce1c949c2") : item;
                        }}
                        value={batteryFinderState.selectedBrand == "" ? contentData.getContent("38a5a09b-8b40-42ea-8d49-52cce1c949c2") : batteryFinderState.selectedBrand}
                        setValue={(item) => {
                            dispatch({
                                actionType: BatteryFinderActionType.setSelectedBrand,
                                payload: item,
                            });
                            segmentFetcher.submit(
                                {
                                    selectedBrand: item,
                                },
                                {method: "GET", action: `/battery-finder/get-segments`},
                            );
                        }}
                    /> */}

                    <FancySearchableSelect
                        items={
                            batteryFinderBrands == null
                                ? []
                                : batteryFinderBrands.map((brand, brandIndex) => {
                                      return {
                                          name: brand,
                                          index: brandIndex,
                                      };
                                  })
                        }
                        selectedItem={
                            batteryFinderBrands == null || brandIndex == null
                                ? null
                                : {
                                      name: batteryFinderBrands[brandIndex],
                                      index: brandIndex,
                                  }
                        }
                        placeholder={contentData.getContent("38a5a09b-8b40-42ea-8d49-52cce1c949c2")}
                        setSelectedItem={(item) => {
                            if (item == null) {
                                return null;
                            }
                            setBrandIndex(item.index);
                            dispatch({
                                actionType: BatteryFinderActionType.setSelectedBrand,
                                payload: item.name,
                            });
                            segmentFetcher.submit(
                                {
                                    selectedBrand: item.name,
                                },
                                {method: "GET", action: `/battery-finder/get-segments`},
                            );
                        }}
                        filterFunction={(items, query) => items.filter((item) => item.name.toLowerCase().startsWith(query.toLowerCase()))}
                        renderFunction={(item) => {
                            if (item == null) {
                                return "";
                            }
                            return `${item.name}`;
                        }}
                        disabled={batteryFinderBrands == null}
                        inputClassName="disabled:tw-opacity-[0.6] disabled:!tw-bg-secondary-100-light disabled:dark:tw-opacity-1 disabled:dark:!tw-bg-secondary-300-dark disabled:dark:!tw-text-secondary-900-dark tw-rounded-lg"
                    />
                </div>
                <div>
                    <FormSelectComponent
                        items={batteryFinderState.segments}
                        itemBuilder={(item) => {
                            return item == null ? contentData.getContent("89d6339c-70c9-4b06-aada-fc1800ed6018") : item;
                        }}
                        value={batteryFinderState.selectedSegment == "" ? contentData.getContent("89d6339c-70c9-4b06-aada-fc1800ed6018") : batteryFinderState.selectedSegment}
                        setValue={(item) => {
                            dispatch({
                                actionType: BatteryFinderActionType.setSelectedSegment,
                                payload: item,
                            });
                            modelFetcher.submit(
                                {
                                    selectedBrand: batteryFinderState.selectedBrand,
                                    selectedSegment: item,
                                },
                                {method: "GET", action: "/battery-finder/get-models"},
                            );
                        }}
                        disabled={batteryFinderState.selectedBrand == null}
                        buttonClassName="disabled:tw-opacity-[0.4] disabled:!tw-bg-secondary-100-light disabled:dark:tw-opacity-1 disabled:dark:!tw-bg-secondary-300-dark disabled:dark:!tw-text-secondary-900-dark"
                    />
                </div>
                <div>
                    <FormSelectComponent
                        items={batteryFinderState.models}
                        itemBuilder={(item) => {
                            return item == null ? contentData.getContent("c7f85209-525c-4954-8450-f5dd4b3c3d1e") : item;
                        }}
                        value={batteryFinderState.selectedModel == "" ? contentData.getContent("c7f85209-525c-4954-8450-f5dd4b3c3d1e") : batteryFinderState.selectedModel}
                        setValue={(item) => {
                            dispatch({
                                actionType: BatteryFinderActionType.setSelectedModel,
                                payload: item,
                            });
                            fuelFetcher.submit(
                                {
                                    selectedBrand: batteryFinderState.selectedBrand,
                                    selectedSegment: batteryFinderState.selectedSegment,
                                    selectedModel: item,
                                },
                                {method: "GET", action: "/battery-finder/get-fuels"},
                            );
                        }}
                        disabled={batteryFinderState.selectedBrand == null || batteryFinderState.selectedSegment == null}
                        buttonClassName="disabled:tw-opacity-[0.4] disabled:!tw-bg-secondary-100-light disabled:dark:tw-opacity-1 disabled:dark:!tw-bg-secondary-300-dark disabled:dark:!tw-text-secondary-900-dark"
                    />
                </div>

                <div>
                    <FormSelectComponent
                        items={batteryFinderState.fuelTypes}
                        itemBuilder={(item) => {
                            return item == null ? contentData.getContent("9e1abe1a-e9ab-47a1-ae4a-36b66a06af82") : item;
                        }}
                        value={batteryFinderState.selectedFuelType == "" ? contentData.getContent("9e1abe1a-e9ab-47a1-ae4a-36b66a06af82") : batteryFinderState.selectedFuelType}
                        setValue={(item) => {
                            dispatch({
                                actionType: BatteryFinderActionType.setSelectedFuelType,
                                payload: item,
                            });
                        }}
                        disabled={batteryFinderState.selectedBrand == null || batteryFinderState.selectedSegment == null || batteryFinderState.selectedModel == null}
                        buttonClassName="disabled:tw-opacity-[0.4] disabled:!tw-bg-secondary-100-light disabled:dark:tw-opacity-1 disabled:dark:!tw-bg-secondary-300-dark disabled:dark:!tw-text-secondary-900-dark"
                    />
                </div>

                <div>
                    <button
                        className="lg-cta-button disabled:!tw-bg-none disabled:!tw-bg-secondary-300-light disabled:dark:!tw-bg-secondary-300-dark disabled:!tw-text-secondary-700-light disabled:dark:!tw-text-secondary-700-dark"
                        onClick={() => {
                            findBatteryFetcher.submit(
                                {
                                    selectedBrand: batteryFinderState.selectedBrand,
                                    selectedSegment: batteryFinderState.selectedSegment,
                                    selectedModel: batteryFinderState.selectedModel,
                                    selectedFuel: batteryFinderState.selectedFuelType,
                                    vtype: "carnsuv",
                                },
                                {method: "GET", action: "/battery-finder/get-recommended-batteries"},
                            );
                        }}
                        disabled={batteryFinderState.selectedFuelType == null}
                    >
                        {contentData.getContent("85423d3b-8623-4b4b-b4f1-48953aa4fee7")}
                    </button>
                </div>
            </div>

            {isScreenSizeBelow && (
                <FilterAccordion
                    userPreferences={userPreferences}
                    panelItem={
                        <div className="lg-text-secondary-900">
                            <FilterMobile
                                userPreferences={userPreferences}
                                batteryFinderState={batteryFinderState}
                                dispatch={dispatch}
                                batteryFinderBrands={batteryFinderBrands}
                                segmentFetcher={segmentFetcher}
                                modelFetcher={modelFetcher}
                                fuelFetcher={fuelFetcher}
                                findBatteryFetcher={findBatteryFetcher}
                                brandIndex={brandIndex}
                                setBrandIndex={setBrandIndex}
                            />
                        </div>
                    }
                    buttonTextContentId="c505d928-fde1-4ad6-95f4-2f3109e0e87f"
                    filterIcon="/livguard/car-and-suv/3/3.filter.svg"
                />
            )}

            <VerticalSpacer className="tw-h-4 lg:tw-h-6" />

            <CarouselStyle5
                // @ts-ignore
                items={batteryFinderState.recommendedBatteries?.map((battery, batteryIndex) => {
                    return (
                        <OurSuggestionsBatteryCard
                            userPreferences={userPreferences}
                            {...battery}
                            key={batteryIndex}
                        />
                    );
                })}
                slidesContainerClassName="!tw-auto-cols-[100%] lg:!tw-auto-cols-max tw-place-self-center tw-items-center"
                selectedContainerClassName="tw-h-full"
                deselectedContainersClassName="tw-scale-[0.9] tw-h-full"
                key={batteryFinderState.recommendedBatteries?.length}
                autoplayDelay={null}
            />

            <VerticalSpacer className="tw-h-4 lg:tw-h-10" />
        </div>
    );
}

function OurSuggestionsBatteryCard({
    userPreferences,
    batterySlug,
    imageRelativeUrl,
    name,
    description,
    warranty,
    capacity,
    polarity,
    dimensions,
}: {
    userPreferences: UserPreferences;
    batterySlug: string;
    imageRelativeUrl: string;
    name: string;
    description: string;
    warranty: string;
    capacity: string;
    polarity: string;
    dimensions: string;
}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className="tw-h-full lg:tw-h-auto tw-grid tw-grid-cols-1 lg:tw-grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:tw-gap-x-4 lg-bg-our-suggestions-card tw-rounded-lg tw-px-4 tw-py-3 lg:tw-py-6 lg:tw-pr-8 lg:tw-pl-5 tw-max-w-[50rem] tw-mx-auto">
            <div className="tw-h-full tw-col-start-1 tw-grid tw-grid-flow-row lg:tw-grid-rows-[60%_auto] tw-place-items-center">
                <div className="lg:tw-hidden lg-bg-primary-500 tw-text-secondary-900-dark tw-px-2 tw-py-1">{contentData.getContent("e2ceac17-9977-44d4-933b-1f221aed6c85")}</div>
                <div className="lg:tw-h-full tw-h-full tw-w-full lg:tw-grid lg:tw-justify-center">
                    <FullHeightImage relativePath={imageRelativeUrl} />
                </div>

                <Link
                    className="tw-hidden lg:tw-block"
                    to={batterySlug}
                >
                    <button className="lg-cta-button">{contentData.getContent("30de7643-a5bc-49a0-b85f-bfa770836330")}</button>
                </Link>
            </div>

            <div className="tw-col-start-1 lg:tw-col-start-2 tw-grid tw-grid-flow-row">
                <div className="lg-text-title1 tw-text-center lg:tw-text-left">{name}</div>

                <VerticalSpacer className="tw-h-2" />

                <div className="lg-text-body tw-text-center lg:tw-text-left">{description}</div>

                <VerticalSpacer className="tw-h-4" />

                <div className="tw-grid tw-grid-rows-[auto_auto_minmax(0,1fr)] md:max-lg:tw-grid-cols-1 md:max-lg:tw-grid-flow-row md:max-lg:tw-place-items-center md:max-lg:tw-place-self-center md:max-lg:tw-w-fit tw-grid-cols-2 tw-gap-x-2 tw-gap-y-4 lg:tw-gap-x-4 lg:tw-gap-y-8">
                    <div className="tw-row-start-1 tw-col-start-1 md:max-lg:tw-w-full tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2 lg:tw-place-self-start">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/car-and-suv/3/3.warranty.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{contentData.getContent("95a938d7-dd71-46de-80b0-a417845dfb4d")}</div>
                            <div className="tw-row-start-3">{warranty}</div>
                        </div>
                    </div>

                    <div className="tw-row-start-1 tw-col-start-2 md:max-lg:tw-w-full md:max-lg:tw-row-start-2 md:max-lg:tw-col-start-1 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/car-and-suv/3/3.capacity.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{contentData.getContent("c4c53678-fb9a-41c2-8782-de0690cffdd4")}</div>
                            <div className="tw-row-start-3">{capacity}</div>
                        </div>
                    </div>

                    <div className="tw-row-start-2 tw-col-start-1 md:max-lg:tw-w-full md:max-lg:tw-row-start-3 md:max-lg:tw-col-start-1 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/car-and-suv/3/3.polarity.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{contentData.getContent("05bda873-c84c-4376-8a17-6503ac9d2820")}</div>
                            <div className="tw-row-start-3">{polarity}</div>
                        </div>
                    </div>

                    <div className="tw-row-start-2 tw-col-start-2 md:max-lg:tw-w-full md:max-lg:tw-row-start-4 md:max-lg:tw-col-start-1 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/car-and-suv/3/3.dimensions.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{contentData.getContent("9c719db5-fa53-423e-9b96-a77602b3c5bc")}</div>
                            <div className="tw-row-start-3">{dimensions}</div>
                        </div>
                    </div>
                </div>

                <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

                <Link
                    className="tw-place-self-center lg:tw-hidden"
                    to={batterySlug}
                >
                    <button className="lg-cta-button">{contentData.getContent("30de7643-a5bc-49a0-b85f-bfa770836330")}</button>
                </Link>

                <VerticalSpacer className="tw-h-4 lg:tw-hidden" />
            </div>
        </div>
    );
}

function TopCarAndSuvBatteryPicks({
    userPreferences,
    className,
    zingEternaProducts,
    zingUltraProducts,
    zingPrimoProducts,
    xtraProducts,
    proCabProducts,
    proCabPlusProducts,
}: {
    userPreferences: UserPreferences;
    className?: string;
    zingEternaProducts: Array<ProductDetails>;
    zingUltraProducts: Array<ProductDetails>;
    zingPrimoProducts: Array<ProductDetails>;
    xtraProducts: Array<ProductDetails>;
    proCabProducts: Array<ProductDetails>;
    proCabPlusProducts: Array<ProductDetails>;
}) {
    const contentData = useContext(ContentProviderContext);
    const featuredProducts = {
        Eterna: {
            title: "5bda278a-5862-4086-ab7c-f54aa5a0df4c",
            vehicleImageRelativeUrl: "/livguard/car-and-suv/4/zing-eterna.png",
            productImageRelativeUrl: "/livguard/car-and-suv/4/4.zing-eterna.png",
            products: zingEternaProducts.map((product) => ({
                productType: ProductType.automotiveBattery,
                name: product.humanReadableModelNumber,
                slug: product.slug,
                capacity: product.specifications[2].value,
                warranty: product.specifications[1].value,
                price: product.price || null,
            })),
        },
        Ultra: {
            title: "16c43b68-0710-47d2-953d-2e0ac5c33f9d",
            vehicleImageRelativeUrl: "/livguard/car-and-suv/4/zing-ultra.png",
            productImageRelativeUrl: "/livguard/car-and-suv/4/4.zing-ultra.png",
            products: zingUltraProducts.map((product) => ({
                productType: ProductType.automotiveBattery,
                name: product.humanReadableModelNumber,
                slug: product.slug,
                capacity: product.specifications[2].value,
                warranty: product.specifications[1].value,
                price: product.price || null,
            })),
        },
        Primo: {
            title: "f2314bd0-7e41-4ce1-9b84-08b02a2ccaa9",
            vehicleImageRelativeUrl: "/livguard/car-and-suv/4/zing-primo.png",
            productImageRelativeUrl: "/livguard/car-and-suv/4/4.zing-primo.png",
            products: zingPrimoProducts.map((product) => ({
                productType: ProductType.automotiveBattery,
                name: product.humanReadableModelNumber,
                slug: product.slug,
                capacity: product.specifications[2].value,
                warranty: product.specifications[1].value,
                price: product.price || null,
            })),
        },
        Xtra: {
            title: "b017acfd-f8a0-4285-aba8-d7c2ee4a09c2",
            vehicleImageRelativeUrl: "/livguard/car-and-suv/4/xtra.png",
            productImageRelativeUrl: "/livguard/products/zx40b20l/thumbnail.png",
            products: xtraProducts.map((product) => ({
                productType: ProductType.automotiveBattery,
                name: product.humanReadableModelNumber,
                slug: "ze38b20l",
                capacity: product.specifications[2].value,
                warranty: product.specifications[1].value,
                price: product.price || null,
            })),
        },
        ProCab: {
            title: "50836139-5c57-4eee-88e4-69f83fb371ab",
            vehicleImageRelativeUrl: "/livguard/car-and-suv/4/pro-cab.png",
            productImageRelativeUrl: "/livguard/car-and-suv/4/4.pro-cab.png",
            products: proCabProducts.map((product) => ({
                productType: ProductType.automotiveBattery,
                name: product.humanReadableModelNumber,
                slug: product.slug,
                capacity: product.specifications[2].value,
                warranty: product.specifications[1].value,
                price: product.price || null,
            })),
        },
        ProCabPlus: {
            title: "299dcb87-0cc8-489e-a94b-596cd3335156",
            vehicleImageRelativeUrl: "/livguard/car-and-suv/4/pro-cab-plus-car.png",
            productImageRelativeUrl: "/livguard/products/pp38b20l/thumbnail.png",
            products: proCabPlusProducts.map((product) => ({
                productType: ProductType.automotiveBattery,
                name: product.humanReadableModelNumber,
                slug: product.slug,
                capacity: product.specifications[2].value,
                warranty: product.specifications[1].value,
                price: product.price || null,
            })),
        },
    };

    const eternaRef = useRef(null);
    const ultraRef = useRef(null);
    const primoRef = useRef(null);
    const xtraRef = useRef(null);
    const proCabRef = useRef(null);
    const proCabPlusRef = useRef(null);

    const refs = [eternaRef, ultraRef, primoRef, xtraRef, proCabRef, proCabPlusRef];

    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold / 2});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "battery-picks": {
                humanReadableName: contentData.getContent("6aa2ed07-f553-410a-bf96-7c177c13cbff"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-flow-row tw-w-full tw-px-3 lg:lg-px-screen-edge-2 lg:tw-py-4", className)}
            id="battery-picks"
            ref={sectionRef}
        >
            <DefaultTextAnimation className="tw-grid tw-grid-flow-row tw-gap-y-1 tw-text-center lg-text-headline">
                <div dangerouslySetInnerHTML={{__html: contentData.getContent("72238b02-d35a-497e-be9d-1d1f2742dd6d")}}></div>
                <div>{contentData.getContent("7dccb0a9-930e-498d-bc45-194b73920af2")}</div>
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-6" />

            <SubCategoryProductsInternal
                userPreferences={userPreferences}
                refs={refs}
                featuredProducts={featuredProducts}
                navigatorsContainerClassName="lg:tw-w-fit tw-grid tw-grid-rows-2 tw-grid-cols-2 lg:tw-grid-rows-1 lg:tw-grid-flow-col lg:tw-auto-cols-max lg:tw-justify-center tw-gap-4"
                vehicleImageClassName="lg:tw-absolute lg:tw-bottom-0 tw-w-full lg:tw-w-[calc(100%-4rem)]"
                vehicleImageRightClassName="lg:tw-right-[2%]"
                productImageClassName="tw-z-[2] tw-absolute tw-bottom-[-0.3125rem] tw-h-[50%] lg:tw-h-1/3"
                productImageLeftClassName="lg:tw-left-[5%] tw-left-[0rem]"
                productImageRightClassName="lg:tw-right-[5%] tw-right-[0rem]"
            />
        </div>
    );
}

function ChooseYourIdealCarAndSUVBattery({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "find-my-battery": {
                humanReadableName: contentData.getContent("8fe6e7d5-6357-4b49-83c5-0a09f80f4cea"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_1rem_auto_1rem_auto_minmax(0,1fr)] ", className)}
            id="find-my-battery"
            ref={sectionRef}
        >
            <div className="tw-row-start-2 tw-text-center lg-text-headline">{contentData.getContent("3dd8ef5c-fbb6-42e3-ba7a-32ac98bef635")}</div>
            <div
                className="tw-row-start-3 tw-text-center lg-text-headline"
                dangerouslySetInnerHTML={{__html: contentData.getContent("a1cd74ff-061a-4631-916b-66ca35810235")}}
            />
            <div className="tw-row-start-5 tw-text-center lg-px-screen-edge-2">{contentData.getContent("9e3c8233-9c58-4c24-b87c-fd99c33ff11e")}</div>

            <div className="tw-row-start-7 tw-grid tw-p-4 tw-justify-center tw-w-full">
                <div className="tw-w-fit tw-grid tw-grid-rows-2 lg:tw-grid-rows-1 lg:tw-grid-cols-2 tw-gap-4 tw-grid-flow-col">
                    <a
                        href="https://www.livguard.com/static-assets/leaflet-car-n-suv.pdf"
                        download
                        target="_blank"
                        className="lg-cta-outline-button lg-cta-outline-button-category-section-transition tw-py-3 tw-rounded-full tw-grid tw-grid-cols-[auto_1rem_auto_minmax(0,1fr)] tw-group tw-h-full tw-px-4"
                    >
                        <img
                            className="tw-row-start-1 tw-col-start-1 tw-h-4 tw-w-4 lg:tw-h-6 lg:tw-w-6 tw-place-self-center tw-transition-colors tw-duration-200 group-hover:tw-brightness-0 group-hover:tw-invert"
                            src="https://www.livguard.com/static-assets/icons/stabilizer/download-catalogue.svg"
                        />
                        <div className="tw-row-start-1 tw-col-start-3 tw-flex tw-flex-row tw-items-center lg-text-body group-hover:!tw-text-secondary-100-light tw-transition-colors tw-duration-200">
                            {contentData.getContent("51ae4bbd-0f66-42bc-b031-cc3e9dc4dc26")}
                        </div>
                    </a>
                    <Link
                        to="/battery-finder"
                        className="tw-h-full tw-w-full tw-grid tw-place-items-center"
                    >
                        <div className="tw-h-full tw-w-full tw-grid tw-items-center lg-cta-button tw-place-self-center">{contentData.getContent("1271cac7-693c-48bc-850f-16199416dd0e")}</div>
                    </Link>
                </div>
            </div>

            <VerticalSpacer className="lg:tw-row-start-8 tw-hidden lg:tw-block lg:tw-h-12" />
        </div>
    );
}

function FaqSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const faqs = [
        {
            question: "2e95883c-ae7a-46d4-91c7-baff1724f551",
            answer: "e5dc6e92-092d-4879-8e6f-869818c6fe35",
        },
        {
            question: "c7184bc7-e542-4611-9a62-ad9459b1c6ec",
            answer: "1a580e9e-7d49-4c5e-b99a-4c75b5788551",
        },
        {
            question: "9d49ec97-e7f0-4fb7-90ad-23f73ed28b69",
            answer: "93d6fb1c-e245-43ee-a440-43938bc33b1d",
        },
        {
            question: "348ff8a2-eb90-4f43-8099-306938e8f7cb",
            answer: "ec314aa6-aed3-4ef2-96d4-9627a4241bc4",
        },
        {
            question: "09cfe0e4-6cf2-4624-96d2-814f38c3a7b7",
            answer: "a334719f-b502-42db-ad3d-61020e863d49",
        },
    ];
    return (
        <div className={className}>
            <FaqSectionInternal
                faqs={faqs}
                userPreferences={userPreferences}
                className="tw-h-full tw-w-full"
            />
        </div>
    );
}

function SocialHandles({userPreferences, heading, className}: {userPreferences: UserPreferences; heading: {text1: string; text2: string}; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    const embeddedVideos = [
        <EmbeddedYoutubeVideo
            id="b6gqLXTnZnw"
            style={{aspectRatio: "560/315"}}
        />,
        <EmbeddedYoutubeVideo
            id="CRabeGp9800"
            style={{aspectRatio: "560/315"}}
        />,
        <EmbeddedYoutubeVideo
            id="tFj9GJcjq6s"
            style={{aspectRatio: "560/315"}}
        />,
    ];
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            testimonials: {
                humanReadableName: contentData.getContent("ab5df361-c4a5-4f3a-b26e-21eff3cb23bc"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("[@media(max-width:1024px)]:lg-px-screen-edge tw-w-full tw-max-w-7xl tw-mx-auto", className)}
            id="testimonials"
            ref={sectionRef}
        >
            <div className="tw-flex tw-flex-col lg-bg-secondary-100 tw-rounded-lg tw-text-center lg-px-screen-edge lg:tw-hidden">
                <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

                <div className="lg-text-headline">
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent(heading.text1)}} />

                    <div dangerouslySetInnerHTML={{__html: contentData.getContent(heading.text2)}} />
                </div>

                <VerticalSpacer className="tw-h-4" />

                <CarouselStyle3 items={embeddedVideos} />

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-body">{contentData.getContent("homeS11T2")}</div>

                <VerticalSpacer className="tw-h-2" />

                <div className="tw-flex tw-justify-evenly">
                    <a
                        href="https://www.facebook.com/LivguardEnergy/"
                        target="_blank"
                    >
                        <Facebook className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                    <a
                        href="https://twitter.com/LivguardEnergy"
                        target="_blank"
                    >
                        <Twitter className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                    <a
                        href="https://www.instagram.com/livguardenergy/"
                        target="_blank"
                    >
                        <Instagram className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                    <a
                        href="https://www.linkedin.com/company/livguard-energy/"
                        target="_blank"
                    >
                        <Linkedin className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                    <a
                        href="https://www.youtube.com/@LivguardEnergy"
                        target="_blank"
                    >
                        <Youtube className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                </div>

                <VerticalSpacer className="tw-h-4" />
            </div>

            <div className="tw-hidden lg:tw-flex tw-flex-col tw-justify-center tw-text-center">
                <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

                <div className="lg-text-headline">
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent(heading.text1)}} />

                    <div dangerouslySetInnerHTML={{__html: contentData.getContent(heading.text2)}} />
                </div>

                <VerticalSpacer className="tw-h-8" />

                <div className="tw-grid tw-grid-cols-3 tw-gap-4">
                    <ItemBuilder
                        items={embeddedVideos}
                        itemBuilder={(video, videoIndex) => (
                            <div
                                className="tw-flex tw-flex-col lg-bg-secondary-100 tw-rounded-lg tw-pb-4 tw-overflow-hidden"
                                key={videoIndex}
                            >
                                {video}

                                <VerticalSpacer className="tw-h-2" />

                                <div className="lg-text-body">{contentData.getContent("homeS11T2")}</div>

                                <div className="tw-flex tw-justify-evenly">
                                    <a
                                        href="https://www.facebook.com/LivguardEnergy/"
                                        target="_blank"
                                    >
                                        <Facebook className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                                    </a>
                                    <a
                                        href="https://twitter.com/LivguardEnergy"
                                        target="_blank"
                                    >
                                        <Twitter className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                                    </a>
                                    <a
                                        href="https://www.instagram.com/livguardenergy/"
                                        target="_blank"
                                    >
                                        <Instagram className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/company/livguard-energy/"
                                        target="_blank"
                                    >
                                        <Linkedin className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                                    </a>
                                    <a
                                        href="https://www.youtube.com/@LivguardEnergy"
                                        target="_blank"
                                    >
                                        <Youtube className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                                    </a>
                                </div>
                            </div>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

export function FilterMobile({
    userPreferences,
    batteryFinderState,
    dispatch,
    batteryFinderBrands,
    segmentFetcher,
    modelFetcher,
    fuelFetcher,
    findBatteryFetcher,
    brandIndex,
    setBrandIndex
}: {
    userPreferences: UserPreferences;
    batteryFinderState: BatteryFinderState;
    dispatch: React.Dispatch<BatteryFinderAction>;
    batteryFinderBrands: Array<string>;
    segmentFetcher: FetcherWithComponents<any>;
    modelFetcher: FetcherWithComponents<any>;
    fuelFetcher: FetcherWithComponents<any>;
    findBatteryFetcher: FetcherWithComponents<any>;
    brandIndex: number | null;
    setBrandIndex: React.Dispatch<React.SetStateAction<number | null>>
}) {
    const contentData = useContext(ContentProviderContext);
    const brands = batteryFinderState.brands;

    return (
        <>
            <div className="tw-place-self-center tw-w-full tw-grid tw-grid-flow-row tw-gap-y-6">
                <div>
                    {/* <FormSelectComponent
                        items={batteryFinderBrands}
                        itemBuilder={(item) => {
                            return item == null ? contentData.getContent("38a5a09b-8b40-42ea-8d49-52cce1c949c2") : item;
                        }}
                        value={batteryFinderState.selectedBrand == "" ? contentData.getContent("38a5a09b-8b40-42ea-8d49-52cce1c949c2") : batteryFinderState.selectedBrand}
                        setValue={(item) => {
                            dispatch({
                                actionType: BatteryFinderActionType.setSelectedBrand,
                                payload: item,
                            });
                            segmentFetcher.submit(
                                {
                                    selectedBrand: item,
                                },
                                {method: "GET", action: `/battery-finder/get-segments`},
                            );
                        }}
                        buttonClassName="disabled:tw-opacity-[0.4] disabled:!tw-bg-secondary-100-light"
                    /> */}
                    <FancySearchableSelect
                        items={
                            batteryFinderBrands == null
                                ? []
                                : batteryFinderBrands.map((brand, brandIndex) => {
                                      return {
                                          name: brand,
                                          index: brandIndex,
                                      };
                                  })
                        }
                        selectedItem={
                            batteryFinderBrands == null || brandIndex == null
                                ? null
                                : {
                                      name: batteryFinderBrands[brandIndex],
                                      index: brandIndex,
                                  }
                        }
                        placeholder={contentData.getContent("38a5a09b-8b40-42ea-8d49-52cce1c949c2")}
                        setSelectedItem={(item) => {
                            if (item == null) {
                                return null;
                            }
                            setBrandIndex(item.index);
                            dispatch({
                                actionType: BatteryFinderActionType.setSelectedBrand,
                                payload: item.name,
                            });
                            segmentFetcher.submit(
                                {
                                    selectedBrand: item.name,
                                },
                                {method: "GET", action: `/battery-finder/get-segments`},
                            );
                        }}
                        filterFunction={(items, query) => items.filter((item) => item.name.toLowerCase().startsWith(query.toLowerCase()))}
                        renderFunction={(item) => {
                            if (item == null) {
                                return "";
                            }
                            return `${item.name}`;
                        }}
                        disabled={batteryFinderBrands == null}
                        inputClassName="disabled:tw-opacity-[0.6] disabled:!tw-bg-secondary-100-light disabled:dark:tw-opacity-1 disabled:dark:!tw-bg-secondary-300-dark disabled:dark:!tw-text-secondary-900-dark tw-rounded-lg"
                    />
                </div>
                <div>
                    <FormSelectComponent
                        items={batteryFinderState.segments}
                        itemBuilder={(item) => {
                            return item == null ? contentData.getContent("89d6339c-70c9-4b06-aada-fc1800ed6018") : item;
                        }}
                        value={batteryFinderState.selectedSegment == "" ? contentData.getContent("89d6339c-70c9-4b06-aada-fc1800ed6018") : batteryFinderState.selectedSegment}
                        setValue={(item) => {
                            dispatch({
                                actionType: BatteryFinderActionType.setSelectedSegment,
                                payload: item,
                            });
                            modelFetcher.submit(
                                {
                                    selectedBrand: batteryFinderState.selectedBrand,
                                    selectedSegment: item,
                                },
                                {method: "GET", action: "/battery-finder/get-models"},
                            );
                        }}
                        disabled={batteryFinderState.selectedBrand == null}
                        buttonClassName="disabled:tw-opacity-[0.4] disabled:!tw-bg-secondary-100-light disabled:dark:tw-opacity-1 disabled:dark:!tw-bg-secondary-300-dark disabled:dark:!tw-text-secondary-900-dark"
                    />
                </div>
                <div>
                    <FormSelectComponent
                        items={batteryFinderState.models}
                        itemBuilder={(item) => {
                            return item == null ? contentData.getContent("c7f85209-525c-4954-8450-f5dd4b3c3d1e") : item;
                        }}
                        value={batteryFinderState.selectedModel == "" ? contentData.getContent("c7f85209-525c-4954-8450-f5dd4b3c3d1e") : batteryFinderState.selectedModel}
                        setValue={(item) => {
                            dispatch({
                                actionType: BatteryFinderActionType.setSelectedModel,
                                payload: item,
                            });
                            fuelFetcher.submit(
                                {
                                    selectedBrand: batteryFinderState.selectedBrand,
                                    selectedSegment: batteryFinderState.selectedSegment,
                                    selectedModel: item,
                                },
                                {method: "GET", action: "/battery-finder/get-fuels"},
                            );
                        }}
                        disabled={batteryFinderState.selectedBrand == null || batteryFinderState.selectedSegment == null}
                        buttonClassName="disabled:tw-opacity-[0.4] disabled:!tw-bg-secondary-100-light disabled:dark:tw-opacity-1 disabled:dark:!tw-bg-secondary-300-dark disabled:dark:!tw-text-secondary-900-dark"
                    />
                </div>

                <div>
                    <FormSelectComponent
                        items={batteryFinderState.fuelTypes}
                        itemBuilder={(item) => {
                            return item == null ? contentData.getContent("9e1abe1a-e9ab-47a1-ae4a-36b66a06af82") : item;
                        }}
                        value={batteryFinderState.selectedFuelType == "" ? contentData.getContent("9e1abe1a-e9ab-47a1-ae4a-36b66a06af82") : batteryFinderState.selectedFuelType}
                        setValue={(item) => {
                            dispatch({
                                actionType: BatteryFinderActionType.setSelectedFuelType,
                                payload: item,
                            });
                        }}
                        disabled={batteryFinderState.selectedBrand == null || batteryFinderState.selectedSegment == null || batteryFinderState.selectedModel == null}
                        buttonClassName="disabled:tw-opacity-[0.4] disabled:!tw-bg-secondary-100-light disabled:dark:tw-opacity-1 disabled:dark:!tw-bg-secondary-300-dark disabled:dark:!tw-text-secondary-900-dark"
                    />
                </div>

                <div>
                    <button
                        className="tw-w-full lg-cta-button disabled:!tw-bg-none disabled:!tw-bg-secondary-300-light disabled:dark:!tw-bg-secondary-300-dark disabled:!tw-text-secondary-700-light disabled:dark:!tw-text-secondary-700-dark"
                        // disabled={selectedBrand == "" || selectedSegment == "" || selectedModel == ""}
                        onClick={() => {
                            findBatteryFetcher.submit(
                                {
                                    selectedBrand: batteryFinderState.selectedBrand,
                                    selectedSegment: batteryFinderState.selectedSegment,
                                    selectedModel: batteryFinderState.selectedModel,
                                    selectedFuel: batteryFinderState.selectedFuelType,
                                },
                                {method: "GET", action: "/car-and-suv/get-recommended-batteries"},
                            );
                        }}
                        disabled={batteryFinderState.selectedFuelType == null}
                    >
                        {contentData.getContent("85423d3b-8623-4b4b-b4f1-48953aa4fee7")}
                    </button>
                </div>
            </div>
        </>
    );
}
