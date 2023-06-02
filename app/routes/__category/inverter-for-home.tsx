import {ChevronDoubleDownIcon} from "@heroicons/react/20/solid";
import type {LinksFunction, LoaderFunction, MetaFunction} from "@remix-run/node";
import {useState} from "react";
import {useResizeDetector} from "react-resize-detector";
import {useLoaderData} from "react-router";
import {OurSuggestionsComponent, ProductCardComponent, ProductOverviewComponent, SocialHandles, WhatsBestForYouComponent} from "~/components/category/common";
import {CategoryCarousel1} from "~/components/categoryCarousel1";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {DownloadCatalogueBottomBar} from "~/components/downloadCatalogueBottomBar";
import {FaqSectionInternal} from "~/components/faqs";
import {CoverImage} from "~/components/images/coverImage";
import {FixedWidthImage} from "~/components/images/fixedWidthImage";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {PageScaffold} from "~/components/pageScaffold";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {DealerLocator} from "~/routes";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {UserPreferences} from "~/typeDefinitions";
import {InverterType, Language} from "~/typeDefinitions";
import {appendSpaceToString, getRedirectToUrlFromRequest} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";

export const meta: MetaFunction = ({data}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = data.userPreferences;
    if (userPreferences.language == Language.English) {
        return {
            title: "Buy Best Inverter for Home at the Lowest Price in India",
            description: "Livguard offers the best range of inverters for home. Experience unlimited energy with inverters made with the finest materials",
        };
    } else if (userPreferences.language == Language.Hindi) {
        return {
            title: "भारत में सबसे कम कीमत पर घर के लिए सर्वश्रेष्ठ इनवर्टर खरीदें",
            description: "लिवगार्ड आपके घर के लिए इनवर्टर की सर्वोत्तम रेंज पेश करता है। बेहतरीन सामग्री से बने इनवर्टर के साथ असीमित ऊर्जा का अनुभव करें",
        };
    } else {
        throw Error(`Undefined language ${userPreferences.language}`);
    }
};

export const links: LinksFunction = () => {
    return [{rel: "canonical", href: "https://www.livguard.com/inverter-for-home/"}];
};

type LoaderData = {
    userPreferences: UserPreferences;
    redirectTo: string;
};

export const loader: LoaderFunction = async ({request}) => {
    const userPreferences = await getUserPreferencesFromCookiesAndUrlSearchParameters(request);
    if (userPreferences instanceof Error) {
        throw userPreferences;
    }

    const loaderData: LoaderData = {
        userPreferences: userPreferences,
        redirectTo: getRedirectToUrlFromRequest(request),
    };

    return loaderData;
};

export default function () {
    const {userPreferences, redirectTo} = useLoaderData() as LoaderData;

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
                    {contentId: "377e65a0-631b-4188-b63a-7ae3661bbe85", link: "#"},
                ]}
            >
                <CategoryPage
                    userPreferences={userPreferences}
                    utmParameters={utmSearchParameters}
                />
            </PageScaffold>

            <DownloadCatalogueBottomBar userPreferences={userPreferences} />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: `
                        {
                            "@context": "https://schema.org",
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                {
                                    "@type": "ListItem",
                                    "position": 1,
                                    "name": "LivGuard",
                                    "item": "https://www.livguard.com/",
                                    "description": " We Are One of A Kind With Livguard, you are always in trusted hands. In just 9 years, Livguard has become the fastest-growing Energy Storage Solutions brand. Our zeal to develop a complete and connected ecosystem of happy customers, committed partners, & the best quality every time has made us the choice of people nationwide.",
                                    "image": [
                                        " https://files.growthjockey.com/livguard/icons/logo-dark.svg"
                                    ]
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "name": "Inverters",
                                    "item": "https://www.livguard.com/inverter-for-home",
                                    "description": "Inverters made with high quality materials to ensure a unlimited flow of energy for you",
                                    "image": [
                                        "https://growthjockey.imgix.net/livguard/category/inverters/2/new_age_design.jpg?w=714.7166748046875"
                                    ]
                                },
                                {
                                    "@type": "SiteNavigationElement",
                                    "name": "Livguard",
                                    "url": "https://www.livguard.com/",
                                    "description": " We Are One of A Kind With Livguard, you are always in trusted hands. In just 9 years, Livguard has become the fastest-growing Energy Storage Solutions brand. Our zeal to develop a complete and connected ecosystem of happy customers, committed partners, & the best quality every time has made us the choice of people nationwide.",
                                    "image": [
                                        "https://files.growthjockey.com/livguard/icons/logo-dark.svg"
                                    ]
                                },
                                {
                                    "@type": "SiteNavigationElement",
                                    "name": "Inverters",
                                    "url": "https://www.livguard.com/inverter-for-home",
                                    "description": "Inverters made with high quality materials to ensure a unlimited flow of energy for you",
                                    "image": [
                                        "https://growthjockey.imgix.net/livguard/category/inverters/2/new_age_design.jpg?w=714.7166748046875"
                                    ]
                                }
                            ]
                        }
                    `,
                }}
            />
        </>
    );
}

function CategoryPage({userPreferences, utmParameters}: {userPreferences: UserPreferences; utmParameters: {[searchParameter: string]: string}}) {
    return (
        <>
            <HeroSection userPreferences={userPreferences} />

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

            <SuggestedJodiSection
                userPreferences={userPreferences}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <div className="tw-grid tw-grid-cols-1 tw-grid-rows-2 lg:tw-grid-cols-[minmax(0,2fr),minmax(0,3fr)] lg:tw-grid-rows-1 tw-gap-y-10 lg:tw-gap-x-4 lg:tw-px-[72px] xl:tw-px-[120px] lg:tw-items-center">
                <DealerLocator
                    userPreferences={userPreferences}
                    showCtaButton={true}
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

            <SocialHandles
                userPreferences={userPreferences}
                heading={{text1: "dealerLocatorSocialHT1", text2: "dealerLocatorSocialHT2"}}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />
        </>
    );
}

function HeroSection({userPreferences}: {userPreferences: UserPreferences}) {
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();

    return (
        <div
            className="tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height)-4.75rem)] lg:tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height))] tw-min-h-[calc(100vw*7/16)] tw-grid tw-grid-rows-[1.5rem_3rem_minmax(0,1fr)_auto_0.5rem_auto_1rem_auto_1rem_minmax(0,1fr)_auto_3.5rem] tw-justify-items-center tw-text-center tw-isolate"
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
    );
}

export function OurInvertersSection({userPreferences, className}: {userPreferences: UserPreferences; className: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-flex tw-flex-col lg:tw-items-center lg:tw-justify-cente", className)}>
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

                <div className="tw-row-start-1 tw-col-start-2 tw-row-span-full tw-w-full tw-h-full tw-py-3 lg-bg-secondary-100 tw-rounded-lg" />

                <div className="tw-row-start-1 tw-col-start-3 tw-row-span-full tw-w-full tw-h-full tw-py-3 lg-bg-secondary-300 tw-rounded-lg" />

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

    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-flex tw-flex-col", className)}>
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
            />
        </div>
    );
}

export function OurSuggestionsSection({userPreferences, className}: {userPreferences: UserPreferences; className: string}) {
    const [secledtedInverterType, setsecledtedInverterType] = useState(InverterType.sine);

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
            imagesRelativePath: "/livguard/products/inverters/",
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
            imagesRelativePath: "/livguard/products/inverters/",
            link: "/product/lg1550i",
            exploreButton: getVernacularString("categoryBatteriesS4BT", userPreferences.language),
            relatedProductsHeading: getVernacularString("categoryInvertersS4RelatedProductsHeading", userPreferences.language),
            relatedProducts: ["lg700e", "lg900", "lg1100", "lg1450i", "lg1950i"],
        },
    ];

    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge", className)}>
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

                <div className="tw-grid tw-grid-cols-[minmax(0,1fr),minmax(0,1fr)] tw-gap-4">
                    <DefaultElementAnimation>
                        <button
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-w-full tw-min-w-[10rem] tw-col-start-1 tw-flex tw-flex-row tw-justify-center tw-items-center tw-rounded-lg hover:tw-cursor-pointer tw-p-2 tw-gap-2",
                                `${secledtedInverterType == InverterType.sine ? "lg-bg-primary-500 lg-text-secondary-900" : "lg-bg-secondary-700 lg-text-secondary-100"} `,
                            )}
                            onClick={() => setsecledtedInverterType(InverterType.sine)}
                        >
                            <div className="tw-h-8 tw-w-8 tw-bg-secondary-900-dark tw-rounded-full tw-p-2">
                                <FullWidthImage relativePath="/livguard/icons/sineWave.png" />
                            </div>
                            <div className={concatenateNonNullStringsWithSpaces("tw-text-body", `${secledtedInverterType == InverterType.sine ? "lg-text-secondary-900" : "lg-text-secondary-100"}`)}>
                                {getVernacularString("categoryInvertersS4BTFlat", userPreferences.language)}
                            </div>
                        </button>
                    </DefaultElementAnimation>

                    <DefaultElementAnimation>
                        <button
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-w-full tw-min-w-[10rem] tw-col-start-2 tw-flex tw-flex-row tw-justify-center tw-items-center tw-rounded-lg hover:tw-cursor-pointer tw-p-2 tw-gap-2",
                                `${secledtedInverterType == InverterType.square ? "lg-bg-primary-500 lg-text-secondary-900" : "lg-bg-secondary-700 lg-text-secondary-100"} `,
                            )}
                            onClick={() => setsecledtedInverterType(InverterType.square)}
                        >
                            <div className="tw-h-8 tw-w-8 tw-bg-secondary-900-dark tw-rounded-full tw-p-2">
                                <FullWidthImage relativePath="/livguard/icons/squareWave.png" />
                            </div>
                            <div className={concatenateNonNullStringsWithSpaces("tw-text-body", `${secledtedInverterType == InverterType.square ? "lg-text-secondary-900" : "lg-text-secondary-100"}`)}>
                                {getVernacularString("categoryInvertersS4BTTubular", userPreferences.language)}
                            </div>
                        </button>
                    </DefaultElementAnimation>
                </div>

                <VerticalSpacer className="tw-h-4" />

                <OurSuggestionsComponent
                    vernacularContent={secledtedInverterType == InverterType.sine ? sectionData[0] : sectionData[1]}
                    // backgroundColor={secledtedInverterType == InverterType.sine ? "primary-500" : "secondary-100"}
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

export function SuggestedJodiSection({userPreferences, className}: {userPreferences: UserPreferences; className: string}) {
    const jodisData: Array<{
        title: string;
        imageRelativePath: string;
        buttonText: string;
        bestseller: boolean;
        link: string;
    }> = [
        {
            title: `${getVernacularString("categoryInvertersS6Jodi1Title", userPreferences.language)}`,
            imageRelativePath: "/livguard/products/jodis/urban-jodi/thumbnail.png",
            buttonText: "categoryViewJodiButtontext",
            bestseller: false,
            link: "/product/urban-jodi",
        },
        {
            title: `${getVernacularString("categoryInvertersS6Jodi2Title", userPreferences.language)}`,
            imageRelativePath: "/livguard/products/jodis/peace-of-mind-jodi/thumbnail.png",
            buttonText: "categoryViewJodiButtontext",
            bestseller: true,
            link: "/product/peace-of-mind-jodi",
        },
        {
            title: `${getVernacularString("categoryInvertersS6Jodi3Title", userPreferences.language)}`,
            imageRelativePath: "/livguard/products/jodis/super-life-jodi/thumbnail.png",
            buttonText: "categoryViewJodiButtontext",
            bestseller: true,
            link: "/product/super-life-jodi",
        },
        {
            title: `${getVernacularString("categoryInvertersS6Jodi4Title", userPreferences.language)}`,
            imageRelativePath: "/livguard/products/jodis/hi-power-jodi/thumbnail.png",
            buttonText: "categoryViewJodiButtontext",
            bestseller: false,
            link: "/product/hi-power-jodi",
        },
    ];

    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge tw-flex tw-flex-col", className)}>
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
                    items={jodisData}
                    itemBuilder={(jodi, jodiIndex) => (
                        <div
                            className={`lg-bg-secondary-100 tw-rounded-lg`}
                            key={jodiIndex}
                        >
                            <ProductCardComponent
                                vernacularContent={jodi}
                                key={jodiIndex}
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

    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge", className)}>
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
        <FaqSectionInternal
            faqs={faqs}
            userPreferences={userPreferences}
            className={className}
        />
    );
}
