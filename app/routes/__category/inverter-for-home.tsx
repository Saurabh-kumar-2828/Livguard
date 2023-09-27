import {ChevronDoubleDownIcon} from "@heroicons/react/20/solid";
import type {LoaderFunction, V2_MetaFunction} from "@remix-run/node";
import {useContext, useEffect, useState} from "react";
import {useInView} from "react-intersection-observer";
import {useResizeDetector} from "react-resize-detector";
import {useLoaderData} from "react-router";
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
import { getAbsolutePathForRelativePath } from "~/global-common-typescript/components/images/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import { ImageCdnProvider } from "~/global-common-typescript/typeDefinitions";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {SecondaryNavigationController, useSecondaryNavigationController} from "~/hooks/useSecondaryNavigationController";
import type {ProductDetailsRecommendedProduct} from "~/productData";
import {DealerLocator} from "~/routes";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {UserPreferences} from "~/typeDefinitions";
import {InverterType, Language} from "~/typeDefinitions";
import {appendSpaceToString, getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest, secondaryNavThreshold} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";

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
                content: `${getAbsolutePathForRelativePath(getMetadataForImage("/livguard/category/inverters/inverter-home-for.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null)}`,
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
                content: `${getAbsolutePathForRelativePath(getMetadataForImage("/livguard/category/inverters/inverter-home-for.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null)}`,
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

    const secondaryNavigationController = useSecondaryNavigationController();

    return (
        <>
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
                    />
                </SecondaryNavigationControllerContext.Provider>
            </PageScaffold>

            <ProductAndCategoryBottomBar
                userPreferences={userPreferences}
                utmParameters={utmSearchParameters}
                pageUrl={pageUrl}
            />
        </>
    );
}

function CategoryPage({
    userPreferences,
    utmParameters,
    pageUrl,
    secondaryNavigationController,
}: {
    userPreferences: UserPreferences;
    utmParameters: {[searchParameter: string]: string};
    pageUrl: string;
    secondaryNavigationController?: SecondaryNavigationController;
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
                <DealerLocatorSection
                    userPreferences={userPreferences}
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
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            top: {
                humanReadableName: getVernacularString("9fc64723-0e15-4211-983a-ba03cf9a4d41", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height)-4.75rem)] lg:tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height))] tw-min-h-[calc(100vw*8.5/18)] tw-overflow-hidden",
                className,
            )}
            id="top"
            ref={sectionRef}
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
                    <div className="lg-text-banner lg-px-screen-edge tw-text-secondary-900-dark">{getVernacularString("categoryInvertersS1T1", userPreferences.language)}</div>
                </DefaultTextAnimation>

                <DefaultTextAnimation className="tw-row-start-6 tw-col-start-1">
                    <div className="lg-text-title1 lg-px-screen-edge tw-text-secondary-900-dark">{getVernacularString("categoryInvertersS1T2", userPreferences.language)}</div>
                </DefaultTextAnimation>

                <DefaultTextAnimation className="tw-row-start-[8] tw-col-start-1">
                    <div className="lg-text-body lg-px-screen-edge !tw-text-secondary-900-dark">{getVernacularString("categoryInvertersS1T3", userPreferences.language)}</div>
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
                humanReadableName: getVernacularString("fdb7fec0-6865-44e5-a84c-73b11f76c326", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-flex tw-flex-col lg:tw-items-center lg:tw-justify-center", className)}
            id="choose-your-inverter"
            ref={sectionRef}
        >
            <h2 className="lg-text-screen-edge lg-text-headline tw-text-center">
                <div dangerouslySetInnerHTML={{__html: appendSpaceToString(getVernacularString("categoryInvertersS3T1", userPreferences.language))}} />
                <div dangerouslySetInnerHTML={{__html: getVernacularString("categoryInvertersS3T2", userPreferences.language)}} />
            </h2>

            <VerticalSpacer className="tw-h-6" />

            <OurInvertersSectionInternal userPreferences={userPreferences} />
        </div>
    );
}

export function OurInvertersSectionInternal({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div>
            <div className="lg-px-screen-edge tw-grid tw-grid-rows-[repeat(7,auto)] tw-grid-cols-[4.5rem_minmax(0,1fr)_minmax(0,1fr)] lg:tw-grid-cols-[4.5rem_22rem_22rem] tw-gap-x-2">
                {/* <div className="tw-row-start-1 tw-col-start-1 tw-row-span-full tw-w-full tw-h-full tw-bg-gradient-to-l tw-from-[#F25F60] tw-to-[#EB2A2B] tw-rounded-lg" /> */}

                <div className="tw-row-start-1 tw-col-start-2 tw-row-span-full tw-w-full tw-h-full tw-py-3 lg-card lg-bg-secondary-100 tw-rounded-lg" />

                <div className="tw-row-start-1 tw-col-start-3 tw-row-span-full tw-w-full tw-h-full tw-py-3 lg-card lg-bg-secondary-300 tw-rounded-lg" />

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

                <div className="tw-row-start-2 tw-col-start-2 tw-px-4 lg-text-title2 tw-pb-3 tw-text-center">{getVernacularString("categoryInvertersS3R1C2", userPreferences.language)}</div>

                <div className="tw-row-start-2 tw-col-start-3 tw-px-4 lg-text-title2 tw-pb-3 tw-text-center">{getVernacularString("categoryInvertersS3R1C3", userPreferences.language)}</div>

                <div className="tw-row-start-3 tw-col-start-1 tw-mx-2 tw-py-3 lg-text-icon tw-border-solid tw-border-b tw-border-secondary-900-dark tw-border-opacity-50 lg-text-secondary">
                    {getVernacularString("categoryInvertersS3R2C1", userPreferences.language)}
                </div>

                <div className="tw-row-start-3 tw-col-start-2 tw-mx-4 tw-py-3 tw-text-center tw-border-solid tw-border-b tw-border-secondary-300-dark tw-border-opacity-50">
                    {getVernacularString("categoryInvertersS3R2C2", userPreferences.language)}
                </div>

                <div className="tw-row-start-3 tw-col-start-3 tw-mx-4 tw-py-3 tw-text-center tw-border-solid tw-border-b tw-border-secondary-100-dark tw-border-opacity-50">
                    {getVernacularString("categoryInvertersS3R2C3", userPreferences.language)}
                </div>

                <div className="tw-row-start-4 tw-col-start-1 tw-mx-2 tw-py-3 lg-text-icon tw-border-solid tw-border-b tw-border-secondary-900-dark tw-border-opacity-50 text-secondary">
                    {getVernacularString("categoryInvertersS3R3C1", userPreferences.language)}
                </div>

                <div className="tw-row-start-4 tw-col-start-2 tw-mx-4 tw-py-3 tw-text-center tw-border-solid tw-border-b tw-border-secondary-300-dark tw-border-opacity-50">
                    {getVernacularString("categoryInvertersS3R3C2", userPreferences.language)}
                </div>

                <div className="tw-row-start-4 tw-col-start-3 tw-mx-4 tw-py-3 tw-text-center tw-border-solid tw-border-b tw-border-secondary-100-dark tw-border-opacity-50">
                    {getVernacularString("categoryInvertersS3R3C3", userPreferences.language)}
                </div>

                <div className="tw-row-start-5 tw-col-start-1 tw-mx-2 tw-py-3 tw-pb-8 lg-text-icon lg-text-secondary-900">
                    {getVernacularString("categoryInvertersS3R4C1", userPreferences.language)}
                </div>

                <div className="tw-row-start-5 tw-col-start-2 tw-mx-4 tw-py-3 tw-pb-8 tw-text-center">{getVernacularString("categoryInvertersS3R4C2", userPreferences.language)}</div>

                <div className="tw-row-start-5 tw-col-start-3 tw-mx-4 tw-py-3 tw-pb-8 tw-text-center">{getVernacularString("categoryInvertersS3R4C3", userPreferences.language)}</div>

                {/* <div className="tw-row-start-6 tw-col-start-1 tw-mx-2 tw-py-3 lg-text-icon tw-text-secondary-900-dark">{getVernacularString("categoryInvertersS3R5C1", userPreferences.language)}</div>

                <div className="tw-row-start-6 tw-col-start-2 tw-mx-4 tw-py-3 tw-text-center">{getVernacularString("categoryInvertersS3R5C2", userPreferences.language)}</div>

                <div className="tw-row-start-6 tw-col-start-3 tw-mx-4 tw-py-3 tw-text-center">{getVernacularString("categoryInvertersS3R5C3", userPreferences.language)}</div> */}
            </div>
        </div>
    );
}

export function InvertersAreMeantToLast({userPreferences, className}: {userPreferences: UserPreferences; className: string}) {
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
            "livguard-inverter": {
                humanReadableName: getVernacularString("eb553bbb-e1af-4d2a-923a-096c297441e2", userPreferences.language),
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
                    <div dangerouslySetInnerHTML={{__html: appendSpaceToString(getVernacularString("categoryInvertersS2HT1", userPreferences.language))}} />
                </DefaultTextAnimation>
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("categoryInvertersS2HT2", userPreferences.language)}} />
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

export function OurSuggestionsSection({userPreferences, className}: {userPreferences: UserPreferences; className: string}) {
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
            heading: `${getVernacularString("categoryInvertersS4Slide1Heading", userPreferences.language)}`,
            description: `${getVernacularString("categoryInvertersS4Slide1Description", userPreferences.language)}`,
            specificationHeading: `${getVernacularString("categoryInvertersS4SpecificationHeading", userPreferences.language)}`,
            keySpecifications: [
                {
                    keySpecificationTitle: getVernacularString("categoryInvertersS2Slide1KS1Title", userPreferences.language),
                    keySpecificationContent: getVernacularString("categoryInvertersSlide1KS1Description", userPreferences.language),
                    keySpecificationIconRelativePath: "/livguard/icons/waranty.png",
                },
                {
                    keySpecificationTitle: getVernacularString("categoryInvertersS2Slide1KS2Title", userPreferences.language),
                    keySpecificationContent: getVernacularString("categoryInvertersSlide1KS2Description", userPreferences.language),
                    keySpecificationIconRelativePath: "/livguard/icons/capacity.png",
                },
                {
                    keySpecificationTitle: getVernacularString("categoryInvertersS2Slide1KS3Title", userPreferences.language),
                    keySpecificationContent: getVernacularString("categoryInvertersSlide1KS3Description", userPreferences.language),
                    keySpecificationIconRelativePath: "/livguard/icons/aiCharging.png",
                },
                {
                    keySpecificationTitle: getVernacularString("categoryInvertersS2Slide1KS4Title", userPreferences.language),
                    keySpecificationContent: getVernacularString("categoryInvertersSlide1KS4Description", userPreferences.language),
                    keySpecificationIconRelativePath: "/livguard/icons/dimensions.png",
                },
            ],
            imagesRelativePath: "/livguard/products/",
            link: "/product/lgs1100i",
            exploreButton: getVernacularString("categoryBatteriesS4BT", userPreferences.language),
            relatedProductsHeading: getVernacularString("categoryInvertersS4RelatedProductsHeading", userPreferences.language),
            relatedProducts: ["lgs900i", "lgs1000i", "lgs1600", "lgs1700"],
        },
        {
            heading: `${getVernacularString("categoryInvertersS4Slide2Heading", userPreferences.language)}`,
            description: `${getVernacularString("categoryInvertersS4Slide2Description", userPreferences.language)}`,
            specificationHeading: `${getVernacularString("categoryInvertersS4SpecificationHeading", userPreferences.language)}`,
            keySpecifications: [
                {
                    keySpecificationTitle: getVernacularString("categoryInvertersS2Slide2KS1Title", userPreferences.language),
                    keySpecificationContent: getVernacularString("categoryInvertersSlide2KS1Description", userPreferences.language),
                    keySpecificationIconRelativePath: "/livguard/icons/waranty.png",
                },
                {
                    keySpecificationTitle: getVernacularString("categoryInvertersS2Slide2KS2Title", userPreferences.language),
                    keySpecificationContent: getVernacularString("categoryInvertersSlide2KS2Description", userPreferences.language),
                    keySpecificationIconRelativePath: "/livguard/icons/capacity.png",
                },
                {
                    keySpecificationTitle: getVernacularString("categoryInvertersS2Slide2KS3Title", userPreferences.language),
                    keySpecificationContent: getVernacularString("categoryInvertersSlide2KS3Description", userPreferences.language),
                    keySpecificationIconRelativePath: "/livguard/icons/aiCharging.png",
                },
                {
                    keySpecificationTitle: getVernacularString("categoryInvertersS2Slide2KS4Title", userPreferences.language),
                    keySpecificationContent: getVernacularString("categoryInvertersSlide2KS4Description", userPreferences.language),
                    keySpecificationIconRelativePath: "/livguard/icons/dimensions.png",
                },
            ],
            imagesRelativePath: "/livguard/products/",
            link: "/product/lg1550i",
            exploreButton: getVernacularString("categoryBatteriesS4BT", userPreferences.language),
            relatedProductsHeading: getVernacularString("categoryInvertersS4RelatedProductsHeading", userPreferences.language),
            relatedProducts: ["lg700e", "lg900", "lg1100", "lg1450i", "lg1950i"],
        },
    ];
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "our-suggestion": {
                humanReadableName: getVernacularString("0620b5a6-a7bb-4d55-84fb-6a3202439edb", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge", className)}
            id="our-suggestion"
            ref={sectionRef}
        >
            <div className="tw-flex tw-flex-col tw-items-center">
                <h2 className="lg-text-headline tw-text-center">
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: appendSpaceToString(getVernacularString("categoryInvertersS4HT1", userPreferences.language))}} />
                    </DefaultTextAnimation>
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("categoryInvertersS4HT2", userPreferences.language)}} />
                    </DefaultTextAnimation>
                </h2>

                <VerticalSpacer className="tw-h-6" />

                <DefaultTextAnimation>
                    <div className="lg-text-title2 tw-text-center">{getVernacularString("categoryInvertersS4Heading", userPreferences.language)}</div>
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
                                        `${selectedInverterType == item.inverterType ? "lg-bg-primary-500 tw-text-secondary-900-dark" : "lg-bg-secondary-100 lg-text-secondary-900"} `,
                                    )}
                                    onClick={() => setSelectedInverterType(item.inverterType)}
                                    key={itemIndex}
                                >
                                    <div className="tw-h-8 tw-w-8 tw-bg-secondary-900-dark tw-rounded-full tw-p-2 lg-card">
                                        <FullWidthImage relativePath={item.icon} />
                                    </div>
                                    <div className="tw-text-body">{getVernacularString(item.textContentId, userPreferences.language)}</div>
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
                    className={"lg-bg-secondary-100"}
                />
            </div>
        </div>
    );
}

export function SideBySideOverviewSection({userPreferences, className}: {userPreferences: UserPreferences; className: string}) {
    const productOverview: Array<{
        heading: string;
        image: string;
        features: Array<{title: string; highlighted: boolean}>;
    }> = [
        {
            image: "",
            heading: `${getVernacularString("categoryInvertersS5Slide1Heading", userPreferences.language)}`,
            features: [
                {
                    title: `${getVernacularString("categoryInvertersS5F1Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryInvertersS5F2Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryInvertersS5F3Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryInvertersS5F4Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryInvertersS5F5Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryInvertersS5F6Title", userPreferences.language)}`,
                    highlighted: true,
                },
            ],
        },
        {
            image: "",
            heading: `${getVernacularString("categoryInvertersS5Slide2Heading", userPreferences.language)}`,
            features: [
                {
                    title: `${getVernacularString("categoryInvertersS5F1Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryInvertersS5F2Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryInvertersS5F3Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryInvertersS5F4Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryInvertersS5F5Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryInvertersS5F6Title", userPreferences.language)}`,
                    highlighted: true,
                },
            ],
        },
        {
            image: "",
            heading: `${getVernacularString("categoryInvertersS5Slide3Heading", userPreferences.language)}`,
            features: [
                {
                    title: `${getVernacularString("categoryInvertersS5F1Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryInvertersS5F2Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryInvertersS5F3Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryInvertersS5F4Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryInvertersS5F5Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryInvertersS5F6Title", userPreferences.language)}`,
                    highlighted: true,
                },
            ],
        },
    ];

    return (
        <div className="lg-px-screen-edge">
            <div className="tw-flex tw-flex-col">
                <div className="lg-text-headline tw-text-center">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("categoryInvertersS5HT1", userPreferences.language)}} />
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
    const combosData: Array<ProductDetailsRecommendedProduct> = [
        {
            humanReadableModelNumber: getVernacularString("categoryInvertersS6Combo1Title", userPreferences.language),
            slug: "urban-combo",
            bestseller: false,
        },
        {
            humanReadableModelNumber: getVernacularString("categoryInvertersS6Combo2Title", userPreferences.language),
            slug: "peace-of-mind-combo",
            bestseller: true,
        },
        {
            humanReadableModelNumber: getVernacularString("categoryInvertersS6Combo3Title", userPreferences.language),
            slug: "super-life-combo",
            bestseller: true,
        },
        {
            humanReadableModelNumber: getVernacularString("categoryInvertersS6Combo4Title", userPreferences.language),
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
                humanReadableName: getVernacularString("5270f2b4-c38b-45b7-8dac-0434f3e7bfcf", userPreferences.language),
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
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("categoryInvertersS6HT1", userPreferences.language)}} />
                    </DefaultTextAnimation>
                </div>
            </div>

            <VerticalSpacer className="tw-h-10" />

            <div className="tw-grid tw-grid-cols-[minmax(0,1fr),minmax(0,1fr)] tw-grid-rows-[minmax(0,1fr),minmax(0,1fr)] lg:tw-grid-rows-1 lg:tw-grid-cols-4 tw-gap-x-2 lg:tw-gap-x-4 tw-gap-y-10">
                <ItemBuilder
                    items={combosData}
                    itemBuilder={(recommendedProduct, recommendedProductIndex) => (
                        <div
                            className={`lg-bg-secondary-100 tw-rounded-lg`}
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
    const sectionData: {
        description: string;
        downloadButtons: Array<{iconRelativePath: string; text: string; downloadLink: string; popup: boolean}>;
        buttonText: string;
    } = {
        description: `${getVernacularString("categoryInvertersS8Description", userPreferences.language)}`,
        downloadButtons: [
            {
                iconRelativePath: "/livguard/icons/buyingGuide.png",
                text: `${getVernacularString("categoryInvertersS8B1T", userPreferences.language)}`,
                downloadLink: "https://www.livguard.com/static-assets/livguard-buying-guide.pdf",
                popup: false,
            },
            {
                iconRelativePath: "/livguard/icons/downloadCatalogue.png",
                text: `${getVernacularString("categoryInvertersS8B2T", userPreferences.language)}`,
                downloadLink: "https://www.livguard.com/static-assets/livguard-ib-leaflet.pdf",
                popup: false,
            },
        ],
        buttonText: `${getVernacularString("categoryInvertersS8BT", userPreferences.language)}`,
    };
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "plan-your-power": {
                humanReadableName: getVernacularString("4364581e-7ad6-4f87-9c83-66bf480d3fab", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge", className)}
            id="plan-your-power"
            ref={sectionRef}
        >
            <div className="tw-flex tw-flex-col">
                <h2 className="lg-text-headline tw-text-center">
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: appendSpaceToString(getVernacularString("categoryInvertersS8HT1", userPreferences.language))}} />
                    </DefaultTextAnimation>
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("categoryInvertersS8HT2", userPreferences.language)}} />
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

function DealerLocatorSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "find-my-dealer": {
                humanReadableName: getVernacularString("bc9269a0-800f-4adf-ac22-d866887da9f4", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className=""
            id="find-my-dealer"
            ref={sectionRef}
        >
            <DealerLocator
                userPreferences={userPreferences}
                showCtaButton={true}
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
