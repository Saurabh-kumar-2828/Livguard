import {ChevronDoubleDownIcon} from "@heroicons/react/20/solid";
import type {LoaderFunction, V2_MetaFunction} from "@remix-run/node";
import {useContext, useEffect, useState} from "react";
import {useInView} from "react-intersection-observer";
import {useResizeDetector} from "react-resize-detector";
import {useLoaderData} from "react-router";
import {getProductFromSlugAndLanguage} from "~/backend/product.server";
import {OurSuggestionsComponent, ProductCardComponent, ProductOverviewComponent, SocialHandles, WhatsBestForYouComponent} from "~/components/category/common";
import {CategoryCarousel1} from "~/components/categoryCarousel1";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {FaqSectionInternal} from "~/components/faqs";
import {CoverImage} from "~/components/images/coverImage";
import {FixedWidthImage} from "~/components/images/fixedWidthImage";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {PageScaffold} from "~/components/pageScaffold";
import {ProductAndCategoryBottomBar} from "~/components/productAndCategoryBottomBar";
import {SecondaryNavigation} from "~/components/secondaryNavigation";
import {SecondaryNavigationControllerContext} from "~/contexts/secondaryNavigationControllerContext";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {ImageCdnProvider, ImageMetadata} from "~/common--type-definitions/typeDefinitions";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {SecondaryNavigationController, useSecondaryNavigationController} from "~/hooks/useSecondaryNavigationController";
import type {ProductDetailsRecommendedProduct} from "~/productData.types";
import {DealerLocator} from "~/reusableSections/dealerLocator";
import {HumanReadableModelNumbersForSuggestions} from "~/routes/__category/inverter-batteries";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {UserPreferences} from "~/typeDefinitions";
import {InverterType, Language} from "~/typeDefinitions";
import {appendSpaceToString, getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest, secondaryNavThreshold} from "~/utilities";
import {getContentGenerator} from "~/vernacularProvider";
import {getVernacularFromBackend} from "~/backend/vernacularProvider.server";
import {ContentProviderContext} from "~/contexts/contentProviderContext";
import {getImageMetadataLibraryFromBackend, getMetadataForImageServerSide} from "~/backend/imageMetaDataLibrary.server";
import {ImageProviderContext} from "~/contexts/imageMetaDataContext";

export const meta: V2_MetaFunction = ({data: loaderData}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = loaderData.userPreferences;
    if (userPreferences.language == Language.English) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/inverter-for-home/",
            },
            {
                title: "Livguard Smart Inverters for an Uninterrupted Power Supply",
            },
            {
                name: "description",
                content: "Livguard offers the best range of inverters for home. Experience unlimited energy with inverters made with the finest materials",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/inverter-for-home",
            },
            {
                property: "og:title",
                content: "Livguard Smart Inverters for an Uninterrupted Power Supply",
            },
            {
                property: "og:description",
                content: "Livguard offers the best range of inverters for home. Experience unlimited energy with inverters made with the finest materials",
            },
            {
                property: "og:site_name",
                content: "Livguard",
            },
            {
                property: "og:type",
                content: "product",
            },
            {
                property: "og:image",
                content: loaderData.ogBanner,
            },
            {
                "script:ld+json": {
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    itemListElement: [
                        {
                            "@type": "ListItem",
                            position: 1,
                            name: "LivGuard",
                            item: "https://www.livguard.com/",
                            description:
                                " We Are One of A Kind With Livguard, you are always in trusted hands. In just 9 years, Livguard has become the fastest-growing Energy Storage Solutions brand. Our zeal to develop a complete and connected ecosystem of happy customers, committed partners, & the best quality every time has made us the choice of people nationwide.",
                            image: [" https://files.growthjockey.com/livguard/icons/logo-dark.svg"],
                        },
                        {
                            "@type": "ListItem",
                            position: 2,
                            name: "Inverters",
                            item: "https://www.livguard.com/inverter-for-home",
                            description: "Inverters made with high quality materials to ensure a unlimited flow of energy for you",
                            image: ["https://growthjockey.imgix.net/livguard/category/inverters/2/new_age_design.jpg?w=714.7166748046875"],
                        },
                        {
                            "@type": "SiteNavigationElement",
                            name: "Livguard",
                            url: "https://www.livguard.com/",
                            description:
                                " We Are One of A Kind With Livguard, you are always in trusted hands. In just 9 years, Livguard has become the fastest-growing Energy Storage Solutions brand. Our zeal to develop a complete and connected ecosystem of happy customers, committed partners, & the best quality every time has made us the choice of people nationwide.",
                            image: ["https://files.growthjockey.com/livguard/icons/logo-dark.svg"],
                        },
                        {
                            "@type": "SiteNavigationElement",
                            name: "Inverters",
                            url: "https://www.livguard.com/inverter-for-home",
                            description: "Inverters made with high quality materials to ensure a unlimited flow of energy for you",
                            image: ["https://growthjockey.imgix.net/livguard/category/inverters/2/new_age_design.jpg?w=714.7166748046875"],
                        },
                    ],
                },
            },
        ];
    } else if (userPreferences.language == Language.Hindi) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/inverter-for-home/",
            },
            {
                title: "बिना रुकावत ऊर्जा की आपूर्ति के लिए लिवगार्ड स्मार्ट इनवर्टर",
            },
            {
                name: "description",
                content: "लिवगार्ड आपके घर के लिए इनवर्टर की सर्वोत्तम रेंज पेश करता है। बेहतरीन सामग्री से बने इनवर्टर के साथ असीमित ऊर्जा का अनुभव करें",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/inverter-for-home",
            },
            {
                property: "og:title",
                content: "बिना रुकावत ऊर्जा की आपूर्ति के लिए लिवगार्ड स्मार्ट इनवर्टर",
            },
            {
                property: "og:description",
                content: "लिवगार्ड आपके घर के लिए इनवर्टर की सर्वोत्तम रेंज पेश करता है। बेहतरीन सामग्री से बने इनवर्टर के साथ असीमित ऊर्जा का अनुभव करें",
            },
            {
                property: "og:site_name",
                content: "Livguard",
            },
            {
                property: "og:type",
                content: "product",
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
    humanReadableModelNumbersForSuggestions: HumanReadableModelNumbersForSuggestions;
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

    const slugs = ["lgs900i", "lgs1000i", "lgs1600", "lgs1700", "lg700e", "lg900", "lg1100", "lg1450i", "lg1950i", "lgs1100i", "lg1550i"];
    let humanReadableModelNumbersForSuggestionsObj: HumanReadableModelNumbersForSuggestions = {};
    slugs.forEach((slug) => {
        humanReadableModelNumbersForSuggestionsObj[slug] = getProductFromSlugAndLanguage(slug, userPreferences.language).humanReadableModelNumber;
    });

    const vernacularData = getVernacularFromBackend("homeInverterPage", userPreferences.language);
    const imageMetaDataLibrary = getImageMetadataLibraryFromBackend("inverterForHomePage");
    const ogBanner = getAbsolutePathForRelativePath(getMetadataForImageServerSide("/livguard/category/inverters/inverter-home-for.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null);

    const loaderData: LoaderData = {
        userPreferences: userPreferences,
        redirectTo: getRedirectToUrlFromRequest(request),
        pageUrl: getUrlFromRequest(request),
        humanReadableModelNumbersForSuggestions: humanReadableModelNumbersForSuggestionsObj,
        vernacularData: vernacularData,
        imageMetaDataLibrary: imageMetaDataLibrary,
        ogBanner: ogBanner,
    };

    return loaderData;
};

export default function () {
    const {userPreferences, redirectTo, pageUrl, humanReadableModelNumbersForSuggestions, vernacularData, imageMetaDataLibrary} = useLoaderData() as LoaderData;

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
                            {contentId: "377e65a0-631b-4188-b63a-7ae3661bbe85", link: "#"},
                        ]}
                        secondaryNavigationController={secondaryNavigationController}
                    >
                        <SecondaryNavigationControllerContext.Provider value={secondaryNavigationController}>
                            <CategoryPage
                                userPreferences={userPreferences}
                                utmParameters={utmSearchParameters}
                                pageUrl={pageUrl}
                                secondaryNavigationController={secondaryNavigationController}
                                humanReadableModelNumbersForSuggestions={humanReadableModelNumbersForSuggestions}
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
}

function CategoryPage({
    userPreferences,
    utmParameters,
    pageUrl,
    secondaryNavigationController,
    humanReadableModelNumbersForSuggestions,
}: {
    userPreferences: UserPreferences;
    utmParameters: {[searchParameter: string]: string};
    pageUrl: string;
    secondaryNavigationController?: SecondaryNavigationController;
    humanReadableModelNumbersForSuggestions: HumanReadableModelNumbersForSuggestions;
}) {
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);
    return (
        <div className="">
            <HeroSection
                userPreferences={userPreferences}
                utmParameters={utmParameters}
                pageUrl={pageUrl}
                className=""
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <InvertersAreMeantToLast
                userPreferences={userPreferences}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <OurInvertersSection
                userPreferences={userPreferences}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <OurSuggestionsSection
                userPreferences={userPreferences}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
                humanReadableModelNumbersForSuggestions={humanReadableModelNumbersForSuggestions}
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            {/* <SideBySideOverviewSection userPreferences={userPreferences} />

<VerticalSpacer className="tw-h-10" /> */}

            <SuggestedComboSection
                userPreferences={userPreferences}
                className="lg:tw-px-[72px] xl:tw-px-[120px] "
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20 " />

            <div className=" tw-grid tw-grid-cols-1 tw-grid-rows-2 lg:tw-grid-cols-[minmax(0,2fr),minmax(0,3fr)] lg:tw-grid-rows-1 tw-gap-y-10 lg:tw-gap-x-4 lg:tw-px-[72px] xl:tw-px-[120px] lg:tw-items-center tw-max-w-7xl tw-mx-auto">
                <DealerLocator
                    userPreferences={userPreferences}
                    showCtaButton={true}
                    secondaryNavigationName="0cb6d442-7df4-4272-a36d-9f956bdd8a54"
                    className="tw-row-start-1 lg:tw-row-span-full lg:tw-col-start-1 lg:tw-h-full lg:tw-min-h-[36rem]"
                />

                <ChooseBestInverterBattery
                    userPreferences={userPreferences}
                    utmParameters={utmParameters}
                    className="tw-row-start-2 lg:tw-col-start-2 lg:tw-row-start-1"
                />
            </div>

            <VerticalSpacer className="lg:tw-h-20" />

            <FaqSection
                userPreferences={userPreferences}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <AboutLivguard
                userPreferences={userPreferences}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />
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
    //const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    //const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    //useEffect(() => {
    //    secondaryNavigationController.setSections((previousSections) => ({
    //        ...previousSections,
    //        top: {
    //            humanReadableName: contentData.getContent("9fc64723-0e15-4211-983a-ba03cf9a4d41"),
    //            isCurrentlyVisible: sectionInView,
    //        },
    //    }));
    //}, [sectionRef, sectionInView]);

    const contentData = useContext(ContentProviderContext);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height)-4.75rem)] lg:tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height))] tw-min-h-[calc(100vw*8.5/18)] tw-overflow-hidden",
                className,
            )}
            // id="top"
            // ref={sectionRef}
        >
            <div
                className="tw-w-full tw-h-full tw-grid tw-grid-rows-[1.5rem_3rem_minmax(0,1fr)_auto_0.5rem_auto_1rem_auto_1rem_minmax(0,1fr)_auto_3.5rem] tw-justify-items-center tw-text-center"
                ref={ref}
            >
                {/* <CoverImage
                relativePath="/livguard/category/inverters/1/1.jpg"
                className="tw-row-[1/span_12] tw-col-start-1"
            /> */}

                {containerWidth == null || containerHeight == null ? null : (
                    <CoverImage
                        relativePath={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/category/inverters/1/mobile_hero.jpg" : "/livguard/category/inverters/1/desktp_hero.jpg"}
                        className="tw-row-start-1 tw-col-start-1 tw-row-span-full"
                        key={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/category/inverters/1/mobile_hero.jpg" : "/livguard/category/inverters/1/desktp_hero.jpg"}
                    />
                )}

                <DefaultTextAnimation className="tw-row-start-4 tw-col-start-1">
                    <div className="lg-text-banner lg-px-screen-edge tw-text-secondary-900-dark">{contentData.getContent("categoryInvertersS1T1")}</div>
                </DefaultTextAnimation>

                <DefaultTextAnimation className="tw-row-start-6 tw-col-start-1">
                    <div className="lg-text-title1 lg-px-screen-edge tw-text-secondary-900-dark">{contentData.getContent("categoryInvertersS1T2")}</div>
                </DefaultTextAnimation>

                <DefaultTextAnimation className="tw-row-start-[8] tw-col-start-1">
                    <div className="lg-text-body lg-px-screen-edge !tw-text-secondary-900-dark">{contentData.getContent("categoryInvertersS1T3")}</div>
                </DefaultTextAnimation>

                <ChevronDoubleDownIcon className="tw-row-[11] tw-col-start-1 tw-w-12 tw-h-12 lg-text-primary-500 tw-animate-bounce" />
            </div>
        </div>
    );
}
export function OurInvertersSection({userPreferences, className}: {userPreferences: UserPreferences; className: string}) {
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "choose-your-inverter": {
                humanReadableName: contentData.getContent("fdb7fec0-6865-44e5-a84c-73b11f76c326"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

    const contentData = useContext(ContentProviderContext);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-flex tw-flex-col lg:tw-items-center lg:tw-justify-center", className)}
            id="choose-your-inverter"
            ref={sectionRef}
        >
            <h2 className="lg-text-screen-edge lg-text-headline tw-text-center">
                <div dangerouslySetInnerHTML={{__html: appendSpaceToString(contentData.getContent("categoryInvertersS3T1"))}} />
                <div dangerouslySetInnerHTML={{__html: contentData.getContent("categoryInvertersS3T2")}} />
            </h2>

            <VerticalSpacer className="tw-h-6" />

            <OurInvertersSectionInternal userPreferences={userPreferences} />
        </div>
    );
}

export function OurInvertersSectionInternal({userPreferences}: {userPreferences: UserPreferences}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div>
            <div className="lg-px-screen-edge tw-grid tw-grid-rows-[repeat(7,auto)] tw-grid-cols-[4.5rem_minmax(0,1fr)_minmax(0,1fr)] lg:tw-grid-cols-[4.5rem_22rem_22rem] tw-gap-x-2">
                {/* <div className="tw-row-start-1 tw-col-start-1 tw-row-span-full tw-w-full tw-h-full tw-bg-gradient-to-l tw-from-[#F25F60] tw-to-[#EB2A2B] tw-rounded-lg" /> */}

                <div className="tw-row-start-1 tw-col-start-2 tw-row-span-full tw-w-full tw-h-full tw-py-3 lg-card tw-rounded-lg" />

                <div className="tw-row-start-1 tw-col-start-3 tw-row-span-full tw-w-full tw-h-full tw-py-3 lg-card tw-rounded-lg" />

                <div className="tw-row-start-1 tw-col-start-2 tw-px-5">
                    <div className="tw-flex lg:tw-hidden tw-justify-center tw-items-center">
                        <FullWidthImage relativePath="/livguard/category/inverters/4/1.png" />
                    </div>
                    <div className="tw-hidden lg:tw-flex tw-justify-center tw-items-center">
                        <FixedWidthImage
                            relativePath="/livguard/category/inverters/4/1.png"
                            width="10rem"
                        />
                    </div>
                </div>

                <div className="tw-row-start-1 tw-col-start-3 tw-px-5">
                    <div className="tw-flex lg:tw-hidden tw-justify-center tw-items-center">
                        <FullWidthImage relativePath="/livguard/category/inverters/4/2.png" />
                    </div>
                    <div className="tw-hidden lg:tw-flex tw-justify-center tw-items-center">
                        <FixedWidthImage
                            relativePath="/livguard/category/inverters/4/2.png"
                            width="10rem"
                        />
                    </div>
                </div>

                <div className="tw-row-start-2 tw-col-start-2 tw-px-4 lg-text-title2 tw-pb-3 tw-text-center">{contentData.getContent("categoryInvertersS3R1C2")}</div>

                <div className="tw-row-start-2 tw-col-start-3 tw-px-4 lg-text-title2 tw-pb-3 tw-text-center">{contentData.getContent("categoryInvertersS3R1C3")}</div>

                <div className="tw-row-start-3 tw-col-start-1 tw-mx-2 tw-py-3 lg-text-icon tw-border-solid tw-border-b tw-border-secondary-300-dark tw-border-opacity-50 lg-text-secondary">
                    {contentData.getContent("categoryInvertersS3R2C1")}
                </div>

                <div className="tw-row-start-3 tw-col-start-2 tw-mx-4 tw-py-3 tw-text-center tw-border-solid tw-border-b tw-border-secondary-300-dark tw-border-opacity-50">
                    {contentData.getContent("categoryInvertersS3R2C2")}
                </div>

                <div className="tw-row-start-3 tw-col-start-3 tw-mx-4 tw-py-3 tw-text-center tw-border-solid tw-border-b tw-border-secondary-300-dark tw-border-opacity-50">
                    {contentData.getContent("categoryInvertersS3R2C3")}
                </div>

                <div className="tw-row-start-4 tw-col-start-1 tw-mx-2 tw-py-3 lg-text-icon tw-border-solid tw-border-b tw-border-secondary-300-dark tw-border-opacity-50 text-secondary">
                    {contentData.getContent("categoryInvertersS3R3C1")}
                </div>

                <div className="tw-row-start-4 tw-col-start-2 tw-mx-4 tw-py-3 tw-text-center tw-border-solid tw-border-b tw-border-secondary-300-dark tw-border-opacity-50">
                    {contentData.getContent("categoryInvertersS3R3C2")}
                </div>

                <div className="tw-row-start-4 tw-col-start-3 tw-mx-4 tw-py-3 tw-text-center tw-border-solid tw-border-b tw-border-secondary-300-dark tw-border-opacity-50">
                    {contentData.getContent("categoryInvertersS3R3C3")}
                </div>

                <div className="tw-row-start-5 tw-col-start-1 tw-mx-2 tw-py-3 tw-pb-8 lg-text-icon lg-text-secondary-900">{contentData.getContent("categoryInvertersS3R4C1")}</div>

                <div className="tw-row-start-5 tw-col-start-2 tw-mx-4 tw-py-3 tw-pb-8 tw-text-center">{contentData.getContent("categoryInvertersS3R4C2")}</div>

                <div className="tw-row-start-5 tw-col-start-3 tw-mx-4 tw-py-3 tw-pb-8 tw-text-center">{contentData.getContent("categoryInvertersS3R4C3")}</div>

                {/* <div className="tw-row-start-6 tw-col-start-1 tw-mx-2 tw-py-3 lg-text-icon tw-text-secondary-900-dark">{contentData.getContent("categoryInvertersS3R5C1")}</div>

                <div className="tw-row-start-6 tw-col-start-2 tw-mx-4 tw-py-3 tw-text-center">{contentData.getContent("categoryInvertersS3R5C2")}</div>

                <div className="tw-row-start-6 tw-col-start-3 tw-mx-4 tw-py-3 tw-text-center">{contentData.getContent("categoryInvertersS3R5C3")}</div> */}
            </div>
        </div>
    );
}

export function InvertersAreMeantToLast({userPreferences, className}: {userPreferences: UserPreferences; className: string}) {
    const contentData = useContext(ContentProviderContext);
    const sectionData: Array<{titleTextContentPiece: string; bodyTextContentPiece: string; imageRelativePath: string}> = [
        {
            titleTextContentPiece: "categoryInvertersS2Slide1Heading",
            bodyTextContentPiece: "categoryInvertersS2Slide1Description",
            imageRelativePath: "/livguard/category/inverters/2/new_age_design.jpg",
        },
        {
            titleTextContentPiece: "categoryInvertersS2Slide2Heading",
            bodyTextContentPiece: "categoryInvertersS2Slide2Description",
            imageRelativePath: "/livguard/category/inverters/2/ai_charging.jpg",
        },
        {
            titleTextContentPiece: "categoryInvertersS2Slide3Heading",
            bodyTextContentPiece: "categoryInvertersS2Slide3Description",
            imageRelativePath: "/livguard/category/inverters/2/three_years_warranty.jpg",
        },
        {
            titleTextContentPiece: "categoryInvertersS2Slide4Heading",
            bodyTextContentPiece: "categoryInvertersS2Slide4Description",
            imageRelativePath: "/livguard/category/inverters/2/dual_sensor_thermal.jpg",
        },
    ];
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "inverter-features": {
                humanReadableName: contentData.getContent("eb553bbb-e1af-4d2a-923a-096c297441e2"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-flex tw-flex-col", className)}
            id="livguard-inverter"
            ref={sectionRef}
        >
            <h1 className="lg-text-headline tw-text-center">
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: appendSpaceToString(contentData.getContent("categoryInvertersS2HT1"))}} />
                </DefaultTextAnimation>
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent("categoryInvertersS2HT2")}} />
                </DefaultTextAnimation>
            </h1>

            <VerticalSpacer className="tw-h-8" />

            <CategoryCarousel1
                userPreferences={userPreferences}
                items={sectionData}
                className="tw-max-w-7xl tw-mx-auto"
            />
        </div>
    );
}

export function OurSuggestionsSection({
    userPreferences,
    className,
    humanReadableModelNumbersForSuggestions,
}: {
    userPreferences: UserPreferences;
    className: string;
    humanReadableModelNumbersForSuggestions: HumanReadableModelNumbersForSuggestions;
}) {
    const contentData = useContext(ContentProviderContext);
    const [selectedInverterType, setSelectedInverterType] = useState(InverterType.sine);

    const sectionData: Array<{
        heading: string;
        description: string;
        specificationHeading: string;
        keySpecifications: Array<{keySpecificationTitle: string; keySpecificationContent: string; keySpecificationIconRelativePath: string}>;
        imagesRelativePath: string;
        link: string;
        exploreButton: string;
        relatedProductsHeading: string;
        relatedProducts: Array<string>;
    }> = [
        {
            heading: `${contentData.getContent("categoryInvertersS4Slide1Heading")}`,
            description: `${contentData.getContent("categoryInvertersS4Slide1Description")}`,
            specificationHeading: `${contentData.getContent("categoryInvertersS4SpecificationHeading")}`,
            keySpecifications: [
                {
                    keySpecificationTitle: contentData.getContent("categoryInvertersS2Slide1KS1Title"),
                    keySpecificationContent: contentData.getContent("categoryInvertersSlide1KS1Description"),
                    keySpecificationIconRelativePath: "/livguard/icons/waranty.png",
                },
                {
                    keySpecificationTitle: contentData.getContent("categoryInvertersS2Slide1KS2Title"),
                    keySpecificationContent: contentData.getContent("categoryInvertersSlide1KS2Description"),
                    keySpecificationIconRelativePath: "/livguard/icons/capacity.png",
                },
                {
                    keySpecificationTitle: contentData.getContent("categoryInvertersS2Slide1KS3Title"),
                    keySpecificationContent: contentData.getContent("categoryInvertersSlide1KS3Description"),
                    keySpecificationIconRelativePath: "/livguard/icons/aiCharging.png",
                },
                {
                    keySpecificationTitle: contentData.getContent("categoryInvertersS2Slide1KS4Title"),
                    keySpecificationContent: contentData.getContent("categoryInvertersSlide1KS4Description"),
                    keySpecificationIconRelativePath: "/livguard/icons/dimensions.png",
                },
            ],
            imagesRelativePath: "/livguard/products/",
            link: "/product/lgs1100i",
            exploreButton: contentData.getContent("categoryBatteriesS4BT"),
            relatedProductsHeading: contentData.getContent("categoryInvertersS4RelatedProductsHeading"),
            relatedProducts: ["lgs900i", "lgs1000i", "lgs1600", "lgs1700"],
        },
        {
            heading: `${contentData.getContent("categoryInvertersS4Slide2Heading")}`,
            description: `${contentData.getContent("categoryInvertersS4Slide2Description")}`,
            specificationHeading: `${contentData.getContent("categoryInvertersS4SpecificationHeading")}`,
            keySpecifications: [
                {
                    keySpecificationTitle: contentData.getContent("categoryInvertersS2Slide2KS1Title"),
                    keySpecificationContent: contentData.getContent("categoryInvertersSlide2KS1Description"),
                    keySpecificationIconRelativePath: "/livguard/icons/waranty.png",
                },
                {
                    keySpecificationTitle: contentData.getContent("categoryInvertersS2Slide2KS2Title"),
                    keySpecificationContent: contentData.getContent("categoryInvertersSlide2KS2Description"),
                    keySpecificationIconRelativePath: "/livguard/icons/capacity.png",
                },
                {
                    keySpecificationTitle: contentData.getContent("categoryInvertersS2Slide2KS3Title"),
                    keySpecificationContent: contentData.getContent("categoryInvertersSlide2KS3Description"),
                    keySpecificationIconRelativePath: "/livguard/icons/aiCharging.png",
                },
                {
                    keySpecificationTitle: contentData.getContent("categoryInvertersS2Slide2KS4Title"),
                    keySpecificationContent: contentData.getContent("categoryInvertersSlide2KS4Description"),
                    keySpecificationIconRelativePath: "/livguard/icons/dimensions.png",
                },
            ],
            imagesRelativePath: "/livguard/products/",
            link: "/product/lg1550i",
            exploreButton: contentData.getContent("categoryBatteriesS4BT"),
            relatedProductsHeading: contentData.getContent("categoryInvertersS4RelatedProductsHeading"),
            relatedProducts: ["lg700e", "lg900", "lg1100", "lg1450i", "lg1950i"],
        },
    ];
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "recommended-inverters": {
                humanReadableName: contentData.getContent("0620b5a6-a7bb-4d55-84fb-6a3202439edb"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge", className)}
            id="recommended-inverters"
            ref={sectionRef}
        >
            <div className="tw-flex tw-flex-col tw-items-center">
                <h2 className="lg-text-headline tw-text-center">
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: appendSpaceToString(contentData.getContent("categoryInvertersS4HT1"))}} />
                    </DefaultTextAnimation>
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: contentData.getContent("categoryInvertersS4HT2")}} />
                    </DefaultTextAnimation>
                </h2>

                <VerticalSpacer className="tw-h-6" />

                <DefaultTextAnimation>
                    <div className="lg-text-title2 tw-text-center">{contentData.getContent("categoryInvertersS4Heading")}</div>
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-6" />

                <DefaultElementAnimation>
                    <div className="tw-w-full tw-grid tw-grid-cols-2 tw-gap-4 tw-items-center">
                        <ItemBuilder
                            items={[
                                {
                                    textContentId: "categoryInvertersS4BTFlat",
                                    icon: "/livguard/icons/sineWave.png",
                                    inverterType: InverterType.sine,
                                },
                                {
                                    textContentId: "categoryInvertersS4BTTubular",
                                    icon: "/livguard/icons/squareWave.png",
                                    inverterType: InverterType.square,
                                },
                            ]}
                            itemBuilder={(item, itemIndex) => (
                                <button
                                    type="button"
                                    className={concatenateNonNullStringsWithSpaces(
                                        "tw-w-full tw-min-w-[10rem] tw-flex tw-flex-row tw-justify-center tw-items-center tw-rounded-lg hover:tw-cursor-pointer tw-p-2 tw-gap-2 lg-card",
                                        `${selectedInverterType == item.inverterType ? "lg-bg-primary-500 tw-text-secondary-900-dark" : "lg-text-secondary-900"} `,
                                    )}
                                    onClick={() => setSelectedInverterType(item.inverterType)}
                                    key={itemIndex}
                                >
                                    <div className="tw-h-8 tw-w-8 tw-bg-secondary-100-light dark:tw-bg-secondary-100-dark tw-rounded-full tw-p-2">
                                        <FullWidthImage
                                            relativePath={item.icon}
                                            className="dark:tw-invert"
                                        />
                                    </div>
                                    <div className="tw-text-body">{contentData.getContent(item.textContentId)}</div>
                                    <div
                                        className={concatenateNonNullStringsWithSpaces(
                                            "tw-text-body tw-text-center",
                                            `${selectedInverterType == item.inverterType ? "tw-text-secondary-900-dark" : "lg-text-secondary-900"}`,
                                        )}
                                    ></div>
                                </button>
                            )}
                        />
                    </div>
                </DefaultElementAnimation>

                <VerticalSpacer className="tw-h-4" />

                <OurSuggestionsComponent
                    vernacularContent={selectedInverterType == InverterType.sine ? sectionData[0] : sectionData[1]}
                    // backgroundColor={selectedInverterType == InverterType.sine ? "primary-500" : "secondary-100"}
                    userPreferences={userPreferences}
                    className={"lg-card"}
                    humanReadableModelNumbersForSuggestions={humanReadableModelNumbersForSuggestions}
                />
            </div>
        </div>
    );
}

export function SideBySideOverviewSection({userPreferences, className}: {userPreferences: UserPreferences; className: string}) {
    const contentData = useContext(ContentProviderContext);
    const productOverview: Array<{
        heading: string;
        image: string;
        features: Array<{title: string; highlighted: boolean}>;
    }> = [
        {
            image: "",
            heading: `${contentData.getContent("categoryInvertersS5Slide1Heading")}`,
            features: [
                {
                    title: `${contentData.getContent("categoryInvertersS5F1Title")}`,
                    highlighted: true,
                },
                {
                    title: `${contentData.getContent("categoryInvertersS5F2Title")}`,
                    highlighted: true,
                },
                {
                    title: `${contentData.getContent("categoryInvertersS5F3Title")}`,
                    highlighted: true,
                },
                {
                    title: `${contentData.getContent("categoryInvertersS5F4Title")}`,
                    highlighted: true,
                },
                {
                    title: `${contentData.getContent("categoryInvertersS5F5Title")}`,
                    highlighted: true,
                },
                {
                    title: `${contentData.getContent("categoryInvertersS5F6Title")}`,
                    highlighted: true,
                },
            ],
        },
        {
            image: "",
            heading: `${contentData.getContent("categoryInvertersS5Slide2Heading")}`,
            features: [
                {
                    title: `${contentData.getContent("categoryInvertersS5F1Title")}`,
                    highlighted: true,
                },
                {
                    title: `${contentData.getContent("categoryInvertersS5F2Title")}`,
                    highlighted: true,
                },
                {
                    title: `${contentData.getContent("categoryInvertersS5F3Title")}`,
                    highlighted: true,
                },
                {
                    title: `${contentData.getContent("categoryInvertersS5F4Title")}`,
                    highlighted: true,
                },
                {
                    title: `${contentData.getContent("categoryInvertersS5F5Title")}`,
                    highlighted: true,
                },
                {
                    title: `${contentData.getContent("categoryInvertersS5F6Title")}`,
                    highlighted: true,
                },
            ],
        },
        {
            image: "",
            heading: `${contentData.getContent("categoryInvertersS5Slide3Heading")}`,
            features: [
                {
                    title: `${contentData.getContent("categoryInvertersS5F1Title")}`,
                    highlighted: true,
                },
                {
                    title: `${contentData.getContent("categoryInvertersS5F2Title")}`,
                    highlighted: true,
                },
                {
                    title: `${contentData.getContent("categoryInvertersS5F3Title")}`,
                    highlighted: true,
                },
                {
                    title: `${contentData.getContent("categoryInvertersS5F4Title")}`,
                    highlighted: true,
                },
                {
                    title: `${contentData.getContent("categoryInvertersS5F5Title")}`,
                    highlighted: true,
                },
                {
                    title: `${contentData.getContent("categoryInvertersS5F6Title")}`,
                    highlighted: true,
                },
            ],
        },
    ];

    return (
        <div className="lg-px-screen-edge">
            <div className="tw-flex tw-flex-col">
                <div className="lg-text-headline tw-text-center">
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent("categoryInvertersS5HT1")}} />
                </div>

                <VerticalSpacer className="tw-h-6" />

                <div className="tw-flex tw-flex-row tw-gap-3 tw-overflow-auto tw-w-full">
                    <ItemBuilder
                        items={productOverview}
                        itemBuilder={(productOverview, productIndex) => (
                            <ProductOverviewComponent
                                vernacularContent={productOverview}
                                className="tw-min-w-[40%]"
                                key={productIndex}
                            />
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

export function SuggestedComboSection({userPreferences, className}: {userPreferences: UserPreferences; className: string}) {
    const contentData = useContext(ContentProviderContext);
    const combosData: Array<ProductDetailsRecommendedProduct> = [
        {
            humanReadableModelNumber: contentData.getContent("categoryInvertersS6Combo1Title"),
            slug: "urban-combo",
            bestseller: false,
        },
        {
            humanReadableModelNumber: contentData.getContent("categoryInvertersS6Combo2Title"),
            slug: "peace-of-mind-combo",
            bestseller: true,
        },
        {
            humanReadableModelNumber: contentData.getContent("categoryInvertersS6Combo3Title"),
            slug: "super-life-combo",
            bestseller: true,
        },
        {
            humanReadableModelNumber: contentData.getContent("categoryInvertersS6Combo4Title"),
            slug: "hi-power-combo",
            bestseller: true,
        },
    ];
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "suggested-combo": {
                humanReadableName: contentData.getContent("5270f2b4-c38b-45b7-8dac-0434f3e7bfcf"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge tw-flex tw-flex-col adasdasdas tw-max-w-7xl tw-mx-auto", className)}
            id="suggested-combo"
            ref={sectionRef}
        >
            <div className="tw-flex tw-flex-col">
                <div className="lg-text-headline tw-text-center">
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: contentData.getContent("categoryInvertersS6HT1")}} />
                    </DefaultTextAnimation>
                </div>
            </div>

            <VerticalSpacer className="tw-h-10" />

            <div className="tw-grid tw-grid-cols-[minmax(0,1fr),minmax(0,1fr)] tw-grid-rows-[minmax(0,1fr),minmax(0,1fr)] lg:tw-grid-rows-1 lg:tw-grid-cols-4 tw-gap-x-2 lg:tw-gap-x-4 tw-gap-y-10">
                <ItemBuilder
                    items={combosData}
                    itemBuilder={(recommendedProduct, recommendedProductIndex) => (
                        <div
                            className={`tw-rounded-lg`}
                            key={recommendedProductIndex}
                        >
                            <ProductCardComponent
                                recommendedProduct={recommendedProduct}
                                ctaTextId="categoryViewComboButtontext"
                                userPreferences={userPreferences}
                            />
                        </div>
                    )}
                />
            </div>
        </div>
    );
}

export function ChooseBestInverterBattery({userPreferences, utmParameters, className}: {userPreferences: UserPreferences; utmParameters: {[searchParameter: string]: string}; className: string}) {
    const contentData = useContext(ContentProviderContext);
    const sectionData: {
        description: string;
        downloadButtons: Array<{iconRelativePath: string; text: string; downloadLink: string; popup: boolean}>;
        buttonText: string;
    } = {
        description: `${contentData.getContent("categoryInvertersS8Description")}`,
        downloadButtons: [
            {
                iconRelativePath: "/livguard/icons/buyingGuide.png",
                text: `${contentData.getContent("categoryInvertersS8B1T")}`,
                downloadLink: "https://www.livguard.com/static-assets/livguard-buying-guide.pdf",
                popup: false,
            },
            {
                iconRelativePath: "/livguard/icons/downloadCatalogue.png",
                text: `${contentData.getContent("categoryInvertersS8B2T")}`,
                downloadLink: "https://www.livguard.com/static-assets/livguard-ib-leaflet.pdf",
                popup: false,
            },
        ],
        buttonText: `${contentData.getContent("categoryInvertersS8BT")}`,
    };
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "load-calculator": {
                humanReadableName: contentData.getContent("4364581e-7ad6-4f87-9c83-66bf480d3fab"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge", className)}
            id="load-calculator"
            ref={sectionRef}
        >
            <div className="tw-flex tw-flex-col">
                <h2 className="lg-text-headline tw-text-center">
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: appendSpaceToString(contentData.getContent("categoryInvertersS8HT1"))}} />
                    </DefaultTextAnimation>
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: contentData.getContent("categoryInvertersS8HT2")}} />
                    </DefaultTextAnimation>
                </h2>

                <VerticalSpacer className="tw-h-6" />

                <WhatsBestForYouComponent
                    vernacularContent={sectionData}
                    userPreferences={userPreferences}
                    utmParameters={utmParameters}
                />
            </div>
        </div>
    );
}

export function FaqSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const faqs = [
        {
            question: "categoryInveterPageFAQQ1Q",
            answer: "categoryInveterPageFAQQ1A",
        },
        {
            question: "categoryInveterPageFAQQ2Q",
            answer: "categoryInveterPageFAQQ2A",
        },
        {
            question: "categoryInveterPageFAQQ3Q",
            answer: "categoryInveterPageFAQQ3A",
        },
        {
            question: "categoryInveterPageFAQQ4Q",
            answer: "categoryInveterPageFAQQ4A",
        },
        {
            question: "categoryInveterPageFAQQ5Q",
            answer: "categoryInveterPageFAQQ5A",
        },
    ];
    return (
        <div className="">
            <FaqSectionInternal
                faqs={faqs}
                userPreferences={userPreferences}
                className={className}
            />
        </div>
    );
}

function AboutLivguard({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("", className)}>
            <SocialHandles
                userPreferences={userPreferences}
                heading={{text1: "dealerLocatorSocialHT1", text2: "dealerLocatorSocialHT2"}}
            />
        </div>
    );
}
