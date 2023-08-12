import {ChevronDoubleDownIcon} from "@heroicons/react/20/solid";
import type {LinksFunction, LoaderFunction, MetaFunction, V2_MetaFunction} from "@remix-run/node";
import {Link, useFetcher} from "@remix-run/react";
import React, {useEffect, useReducer, useRef, useState} from "react";
import {Facebook, Instagram, Linkedin, Twitter, Youtube} from "react-bootstrap-icons";
import {useResizeDetector} from "react-resize-detector";
import {useLoaderData} from "react-router";
import {toast} from "react-toastify";
import {StickyBottomBar} from "~/components/bottomBar";
import {CarouselStyle1Video} from "~/components/carouselStyle1Video";
import {CarouselStyle2} from "~/components/carouselStyle2";
import {CarouselStyle3} from "~/components/carouselStyle3";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultImageAnimation} from "~/components/defaultImageAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {EmbeddedYoutubeVideo} from "~/components/embeddedYoutubeVideo";
import {FaqSectionInternal} from "~/components/faqs";
import {CoverImage} from "~/components/images/coverImage";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {InTheNewsCarousel} from "~/components/inTheNewsCarousel";
import {LeadersCarousel} from "~/components/leadersCarousel";
import LivguardDialog from "~/components/livguardDialog";
import {PageScaffold} from "~/components/pageScaffold";
import {TestimonialsCarousel} from "~/components/testimonialsCarousel";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import type {Uuid} from "~/global-common-typescript/typeDefinitions";
import {concatenateNonNullStringsWithSpaces, generateUuid} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {emailIdValidationPattern, indianPhoneNumberValidationPattern} from "~/global-common-typescript/utilities/validationPatterns";
import {useEmblaCarouselWithIndex} from "~/hooks/useEmblaCarouselWithIndex";
import {FormSubmissionSuccessLivguardDialog} from "~/routes/dealer-for-inverters-and-batteries";
import type {FormStateInputsAction} from "~/routes/lead-form.state";
import {FormStateInputsActionType, FormStateInputsReducer, createInitialFormState} from "~/routes/lead-form.state";
import {MiniPowerPlannerTeaser} from "~/routes/load-calculator";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {UserPreferences} from "~/typeDefinitions";
import {FormType, Language, Theme} from "~/typeDefinitions";
import {appendSpaceToString, getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";

// export const meta: MetaFunction = ({data}: {data: LoaderData}) => {
//     const userPreferences: UserPreferences = data.userPreferences;
//     if (userPreferences.language == Language.English) {
//         return {
//             title: "Livguard Energy Storage Solutions for Inverters and Batteries ",
//             description: "Livguard's best range of energy storage solutions for your home, including inverters, batteries, automotive batteries and solar power solutions.",
//             "og:title": "Livguard Energy Storage Solutions for Inverters and Batteries ",
//             "og:site_name": "Livguard",
//             "og:url": "https://www.livguard.com/",
//             "og:description": "Livguard's best range of energy storage solutions for your home, including inverters, batteries, automotive batteries and solar power solutions.",
//             "og:type": "website",
//             "og:image": "https://growthjockey.imgix.net/livguard/home/3/2.jpg?w=764.140625",
//         };
//     } else if (userPreferences.language == Language.Hindi) {
//         return {
//             title: "इनवर्टर और बैटरी के लिए लिवगार्ड ऊर्जा संग्रहण समाधान",
//             description: "अपने घर के लिए लिवगार्ड के ऊर्जा संग्रहण समाधानों की सर्वोत्तम श्रेणी देखे, जिसमें इनवर्टर, बैटरी, ऑटोमोटिव बैटरी, सौर ऊर्जा और स्टेबलाइजर्स शामिल हैं",
//             "og:title": "इनवर्टर और बैटरी के लिए लिवगार्ड ऊर्जा संग्रहण समाधान",
//             "og:site_name": "Livguard",
//             "og:url": "https://www.livguard.com/",
//             "og:description": "अपने घर के लिए लिवगार्ड के ऊर्जा संग्रहण समाधानों की सर्वोत्तम श्रेणी देखे, जिसमें इनवर्टर, बैटरी, ऑटोमोटिव बैटरी, सौर ऊर्जा और स्टेबलाइजर्स शामिल हैं",
//             "og:type": "website",
//             "og:image": "https://growthjockey.imgix.net/livguard/home/3/2.jpg?w=764.140625",
//         };
//     } else {
//         throw Error(`Undefined language ${userPreferences.language}`);
//     }
// };

// export const links: LinksFunction = () => {
//     return [{rel: "canonical", href: "https://www.livguard.com/"}];
// };

export const meta: V2_MetaFunction = ({data: loaderData}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = loaderData.userPreferences;
    if (userPreferences.language == Language.English) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/",
            },
            {
                title: "Livguard Energy Storage Solutions for Inverters and Batteries ",
            },
            {
                name: "description",
                content: "Livguard's best range of energy storage solutions for your home, including inverters, batteries, automotive batteries and solar power solutions.",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/",
            },
            {
                property: "og:title",
                content: "Livguard Energy Storage Solutions for Inverters and Batteries",
            },
            {
                property: "og:description",
                content: "Livguard's best range of energy storage solutions for your home, including inverters, batteries, automotive batteries and solar power solutions.",
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
                content: "https://growthjockey.imgix.net/livguard/home/3/2.jpg?w=764.140625",
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
                            "@type": "ListItem",
                            position: 3,
                            name: "Inverters Batteries",
                            item: "https://www.livguard.com/inverter-batteries",
                            description: " Inverter batteries with a powerful backup, made to empower your home with limitless energy whenever you need",
                            image: ["https://growthjockey.imgix.net/livguard/category/batteries/2/3.jpg?w=714.7166748046875"],
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
                        {
                            "@type": "SiteNavigationElement",
                            name: "Inverters Batteries",
                            url: "https://www.livguard.com/inverter-batteries",
                            description: "Inverter batteries with a powerful backup, made to empower your home with limitless energy whenever you need",
                            image: ["https://growthjockey.imgix.net/livguard/category/batteries/2/3.jpg?w=714.7166748046875"],
                        },
                        {
                            "@type": "Organization",
                            legalName: "Livguard Energy Technologies Private Limited",
                            url: "https://www.livguard.com/",
                            logo: "https://files.growthjockey.com/livguard/icons/logo-dark.svg",
                            contactPoint: {
                                "@type": "ContactPoint",
                                telephone: "+91-124-4987 400",
                            },
                            address: {
                                "@type": "PostalAddress",
                                streetAddress: "SAR Group Plot No. 221, Udyog Vihar Phase 1, Sector 20",
                                addressLocality: "Gurugram",
                                addressRegion: "Haryana",
                                postalCode: "122016",
                                addressCountry: "India",
                            },
                            sameAs: [
                                "https://www.facebook.com/LivguardEnergy/",
                                "https://twitter.com/LivguardEnergy",
                                "https://www.instagram.com/livguardenergy/",
                                "https://www.linkedin.com/company/livguard-energy/",
                                "https://www.youtube.com/@LivguardEnergy",
                            ],
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
                href: "https://www.livguard.com/",
            },
            {
                title: "इनवर्टर और बैटरी के लिए लिवगार्ड ऊर्जा संग्रहण समाधान",
            },
            {
                name: "description",
                content: "अपने घर के लिए लिवगार्ड के ऊर्जा संग्रहण समाधानों की सर्वोत्तम श्रेणी देखे, जिसमें इनवर्टर, बैटरी, ऑटोमोटिव बैटरी, सौर ऊर्जा और स्टेबलाइजर्स शामिल हैं",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/",
            },
            {
                property: "og:title",
                content: "इनवर्टर और बैटरी के लिए लिवगार्ड ऊर्जा संग्रहण समाधान",
            },
            {
                property: "og:description",
                content: "अपने घर के लिए लिवगार्ड के ऊर्जा संग्रहण समाधानों की सर्वोत्तम श्रेणी देखे, जिसमें इनवर्टर, बैटरी, ऑटोमोटिव बैटरी, सौर ऊर्जा और स्टेबलाइजर्स शामिल हैं",
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
                content: "https://growthjockey.imgix.net/livguard/home/3/2.jpg?w=764.140625",
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
                pageUrl={pageUrl}
                breadcrumbs={[{contentId: "cfab263f-0175-43fb-91e5-fccc64209d36", link: "#"}]}
            >
                <HomePage
                    userPreferences={userPreferences}
                    utmParameters={utmSearchParameters}
                    pageUrl={pageUrl}
                />
            </PageScaffold>

            <StickyBottomBar userPreferences={userPreferences} />

            {/* <script
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
                                    "@type": "ListItem",
                                    "position": 3,
                                    "name": "Inverters Batteries",
                                    "item": "https://www.livguard.com/inverter-batteries",
                                    "description": " Inverter batteries with a powerful backup, made to empower your home with limitless energy whenever you need",
                                    "image": [
                                        "https://growthjockey.imgix.net/livguard/category/batteries/2/3.jpg?w=714.7166748046875"
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
                                },
                                {
                                    "@type": "SiteNavigationElement",
                                    "name": "Inverters Batteries",
                                    "url": "https://www.livguard.com/inverter-batteries",
                                    "description": "Inverter batteries with a powerful backup, made to empower your home with limitless energy whenever you need",
                                    "image": [
                                        "https://growthjockey.imgix.net/livguard/category/batteries/2/3.jpg?w=714.7166748046875"
                                    ]
                                },
                                {
                                    "@type": "Organization",
                                    "legalName": "Livguard Energy Technologies Private Limited",
                                    "url": "https://www.livguard.com/",
                                    "logo": "https://files.growthjockey.com/livguard/icons/logo-dark.svg",
                                    "contactPoint": {
                                        "@type": "ContactPoint",
                                        "telephone": "+91-124-4987 400"
                                    },
                                    "address": {
                                        "@type": "PostalAddress",
                                        "streetAddress": "SAR Group Plot No. 221, Udyog Vihar Phase 1, Sector 20",
                                        "addressLocality": "Gurugram",
                                        "addressRegion": "Haryana",
                                        "postalCode": "122016",
                                        "addressCountry": "India"
                                    },
                                    "sameAs": [
                                        "https://www.facebook.com/LivguardEnergy/",
                                        "https://twitter.com/LivguardEnergy",
                                        "https://www.instagram.com/livguardenergy/",
                                        "https://www.linkedin.com/company/livguard-energy/",
                                        "https://www.youtube.com/@LivguardEnergy"
                                    ]
                                }
                            ]
                        }
                    `,
                }}
            /> */}
        </>
    );
}

function HomePage({
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
    return (
        <div className="tw-grid tw-grid-rows-1 tw-grid-cols-1 lg:tw-grid-rows-1 lg:tw-grid-cols-6 tw-gap-x-8 tw-align-stretch tw-gap-y-10 lg:tw-gap-y-20 tw-pb-10 lg:tw-pb-20">
            <HeroSection
                userPreferences={userPreferences}
                utmParameters={utmParameters}
                pageUrl={pageUrl}
                className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
            />

            {/* <EnergyStorageSolutions
                userPreferences={userPreferences}
                className="tw-row-start-2 tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
            /> */}

            <EnergySolutions
                userPreferences={userPreferences}
                className="tw-row-start-2 tw-col-start-1 lg:tw-row-start-2 lg:tw-col-start-1 lg:tw-col-span-3 lg:tw-pl-[72px] xl:tw-pl-[120px]"
            />

            <MiniPowerPlannerTeaser
                userPreferences={userPreferences}
                className="tw-row-start-4 lg:tw-row-start-3 lg:tw-col-start-1 lg:tw-col-span-2 lg:tw-self-end lg:tw-pl-[40px] xl:tw-pl-[120px] tw-h-full"
            />

            <DealerLocator
                userPreferences={userPreferences}
                showCtaButton={true}
                className="tw-row-start-5 tw-col-start-1 lg:tw-row-start-3 lg:tw-col-start-3 lg:tw-col-span-2 lg:tw-self-end lg:tw-h-full"
            />

            <WeAreOneOfAKind
                userPreferences={userPreferences}
                className="tw-row-start-3 tw-col-start-1 lg:tw-row-start-2 lg:tw-col-start-4 lg:tw-col-span-3 lg:tw-pr-[72px] xl:tw-pr-[120px]"
            />

            <TransformingLives
                userPreferences={userPreferences}
                className="tw-row-start-7 lg:tw-row-start-4 lg:tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <FaqSection
                userPreferences={userPreferences}
                className="tw-row-start-8 lg:tw-row-start-5 lg:tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <ShowerSomeLoveOnSocialHandles
                userPreferences={userPreferences}
                heading={{text1: "homeS11H1T1", text2: "homeS11H1T2"}}
                className="tw-row-start-6 lg:tw-row-start-3 lg:tw-col-start-5 lg:tw-col-span-2 lg:tw-self-end lg:tw-pr-[40px] xl:tw-pr-[120px] lg:tw-h-full"
            />

            <InTheNewsSection
                userPreferences={userPreferences}
                className="tw-row-start-9 tw-col-start-1 lg:tw-row-start-6 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <PowerfulPurposePowerfulImpact
                userPreferences={userPreferences}
                className="tw-row-start-10 tw-col-start-1 lg:tw-row-start-7 lg:tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
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
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();
    // const {emblaRef, emblaApi, selectedIndex} = useEmblaCarouselWithIndex({loop: true}, 10000);

    return (
        // screen = 48px + 56px + ? + 32px + 56px + 32px + 90px
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-h-[calc(100vh-16.625rem-var(--lg-mobile-ui-height))] lg:tw-h-[calc(100vh-9rem)] lg:tw-min-h-[calc(100vw*7.5/16)] tw-overflow-hidden",
                className,
            )}
            // ref={emblaRef}
        >
            <div
                className="tw-w-full tw-h-full tw-grid tw-grid-flow-col tw-auto-cols-[100%] tw-items-stretch"
                ref={ref}
            >
                <ItemBuilder
                    items={[
                        {
                            mobileImageRelativePath: "/livguard/home/1/new-mobile.jpg",
                            desktopImageRelativePath: "/livguard/home/1/new-desktop.jpg",
                            titleVernacId: "homeS1T1",
                            subTitleVernacId: "homeS1T2",
                            contactButtonVernacId: "homeS1T3",
                        },
                        // {
                        //     englishMobileImageRelativePath: "/livguard/landing-pages/3/top-banner-mobile-english.jpg",
                        //     hindiMobileImageRelativePath: "/livguard/landing-pages/3/top-banner-mobile-hindi.jpg",
                        //     englishDesktopImageRelativePath: "/livguard/landing-pages/3/top-banner-desktop-english.jpg",
                        //     hindiDesktopImageRelativePath: "/livguard/landing-pages/3/top-banner-desktop-hindi.jpg",
                        //     titleVernacId: null,
                        //     subTitleVernacId: null,
                        //     contactButtonVernacId: null,
                        // },
                    ]}
                    itemBuilder={(item, itemIndex) => (
                        <div
                            // tw-grid-rows-[3rem_minmax(0,1fr)_auto_minmax(0,1fr)_3rem]
                            className="tw-h-full tw-overflow-hidden tw-grid tw-grid-rows-[1.5rem_3rem_minmax(0,1fr)_auto_1rem_auto_1rem_minmax(0,1fr)_auto_3rem] tw-justify-items-center tw-text-secondary-900-dark tw-grid-cols-1 tw-isolate tw-relative"
                            key={itemIndex}
                        >
                            {/* {item.englishDesktopImageRelativePath &&
                                item.englishMobileImageRelativePath &&
                                (containerWidth == null || containerHeight == null ? null : (
                                    <Link
                                        to="/offers/inverter-and-battery-jodi"
                                        className="tw-w-full tw-h-full tw-row-span-full tw-absolute"
                                    >
                                        <CoverImage
                                            relativePath={
                                                containerHeight > containerWidth || containerWidth < 640
                                                    ? userPreferences.language == Language.English
                                                        ? item.englishMobileImageRelativePath
                                                        : item.hindiMobileImageRelativePath
                                                    : userPreferences.language == Language.English
                                                    ? item.englishDesktopImageRelativePath
                                                    : item.hindiDesktopImageRelativePath
                                            }
                                            className="tw-row-start-1 tw-col-start-1 tw-row-span-full"
                                            key={
                                                containerHeight > containerWidth || containerWidth < 640
                                                    ? userPreferences.language == Language.English
                                                        ? item.englishMobileImageRelativePath
                                                        : item.hindiMobileImageRelativePath
                                                    : userPreferences.language == Language.English
                                                    ? item.englishDesktopImageRelativePath
                                                    : item.hindiDesktopImageRelativePath
                                            }
                                        />
                                    </Link>
                                ))} */}

                            {item.mobileImageRelativePath &&
                                item.desktopImageRelativePath &&
                                (containerWidth == null || containerHeight == null ? null : (
                                    <CoverImage
                                        relativePath={containerHeight > containerWidth || containerWidth < 640 ? item.mobileImageRelativePath : item.desktopImageRelativePath}
                                        className="tw-row-start-1 tw-col-start-1 tw-row-span-full"
                                        key={containerHeight > containerWidth || containerWidth < 640 ? item.mobileImageRelativePath : item.desktopImageRelativePath}
                                    />
                                ))}

                            {item.titleVernacId && <div className="tw-row-1 tw-col-start-1 tw-row-span-full tw-w-full tw-h-full tw-bg-black tw-opacity-40" />}

                            {item.titleVernacId && item.subTitleVernacId && (
                                <h2 className="tw-row-start-4 tw-col-start-1 tw-flex tw-flex-col tw-gap-y-2 tw-z-10 tw-text-center lg-px-screen-edge">
                                    <DefaultTextAnimation>
                                        <div className="lg-text-banner">{appendSpaceToString(getVernacularString(item.titleVernacId, userPreferences.language))}</div>
                                    </DefaultTextAnimation>

                                    <DefaultTextAnimation>
                                        <div className="lg-text-title1">{getVernacularString(item.subTitleVernacId, userPreferences.language)}</div>
                                    </DefaultTextAnimation>
                                </h2>
                            )}

                            {item.contactButtonVernacId && (
                                <DefaultElementAnimation className="tw-row-start-6 tw-col-start-1 tw-z-10">
                                    <ContactUsCta
                                        userPreferences={userPreferences}
                                        textVernacId={item.contactButtonVernacId}
                                        className="tw-z-10"
                                        utmParameters={utmParameters}
                                        pageUrl={pageUrl}
                                    />
                                </DefaultElementAnimation>
                            )}

                            <Link
                                to="#energy-storage-solutions"
                                className="tw-row-[9] tw-col-start-1"
                            >
                                <ChevronDoubleDownIcon className="tw-w-12 tw-h-12 lg-text-primary-500 tw-animate-bounce tw-z-10" />
                            </Link>
                        </div>
                    )}
                />
            </div>
        </div>
    );
}

function EnergyStorageSolutions({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div
            id="energy-storage-solutions"
            className={concatenateNonNullStringsWithSpaces("tw-w-full tw-max-w-7xl tw-mx-auto", className)}
        >
            <h1 className="tw-flex tw-flex-col tw-items-center lg-text-headline">
                <DefaultTextAnimation>
                    <div className="lg-text-highlighted">{appendSpaceToString(getVernacularString("homeS2T1", userPreferences.language))}</div>
                </DefaultTextAnimation>
                <DefaultTextAnimation>
                    <div>{getVernacularString("homeS2T2", userPreferences.language)}</div>
                </DefaultTextAnimation>
            </h1>

            <VerticalSpacer className="tw-h-8" />

            {/* <CarouselStyle1
                userPreferences={userPreferences}
                items={[
                    {
                        imageRelativePath: "/livguard/home/2/1.jpg",
                        titleTextContentPiece: "homeS2C1T1",
                        bodyTextContentPiece: "homeS2C1T2",
                    },
                    {
                        imageRelativePath: "/livguard/home/2/2.jpg",
                        titleTextContentPiece: "homeS2C2T1",
                        bodyTextContentPiece: "homeS2C2T2",
                    },
                ]}
            /> */}

            <CarouselStyle1Video
                userPreferences={userPreferences}
                items={[
                    {
                        youtubeVideoId: "NwxWY5uBSj4",
                        videoAspectRatio: "560/315",
                        titleTextContentPiece: "homeS2C1T1",
                        bodyTextContentPiece: "homeS2C1T2",
                    },
                    {
                        youtubeVideoId: "mpnBoJvAlMk",
                        videoAspectRatio: "560/315",
                        titleTextContentPiece: "homeS2C2T1",
                        bodyTextContentPiece: "homeS2C2T2",
                    },
                ]}
            />
        </div>
    );
}

export function EnergySolutions({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const {emblaRef, emblaApi, selectedIndex} = useEmblaCarouselWithIndex({loop: true});

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-grid tw-grid-rows-[auto,auto,minmax(0,1fr)] tw-grid-cols-1 lg:tw-grid-rows-[auto,minmax(0,1fr)] lg:tw-grid-cols-[auto,minmax(0,1fr)] tw-gap-x-4 tw-gap-y-6",
                className,
            )}
            id="energy-solutions"
        >
            <h2 className="lg-px-screen-edge lg-text-headline tw-text-center tw-row-start-1 tw-col-start-1 tw-col-span-full lg:tw-row-start-1 lg:tw-col-start-2">
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: appendSpaceToString(getVernacularString("homeS3H1T1", userPreferences.language))}} />
                </DefaultTextAnimation>
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS3H1T2", userPreferences.language)}} />
                </DefaultTextAnimation>
            </h2>

            <div className="lg-px-screen-edge tw-grid tw-grid-cols-5 tw-gap-x-4 tw-row-start-2 tw-col-start-1 tw-col-span-full lg:tw-grid-rows-5 lg:tw-grid-cols-1 lg:tw-gap-y-4 lg:tw-row-start-1 lg:tw-row-span-full lg:tw-col-start-1 lg:tw-col-span-1 lg:tw-py-10">
                <ItemBuilder
                    items={[
                        {
                            svgIcon: "/livguard/home/3/2-icon.png",
                            title: "homeS3Tab2H",
                        },
                        {
                            svgIcon: "/livguard/home/3/3-icon.png",
                            title: "homeS3Tab3H",
                        },
                        {
                            svgIcon: "/livguard/home/3/1-icon.png",
                            title: "homeS3Tab1H",
                        },
                        {
                            svgIcon: "/livguard/home/3/4-icon.png",
                            title: "homeS3Tab4H",
                        },
                        {
                            svgIcon: "/livguard/home/3/5-icon.png",
                            title: "homeS3Tab5H",
                        },
                    ]}
                    itemBuilder={(item, itemIndex) => (
                        <button
                            type="button"
                            className="group tw-flex tw-flex-col tw-items-center"
                            onClick={(e) => emblaApi?.scrollTo(itemIndex)}
                            key={itemIndex}
                        >
                            <div
                                className={concatenateNonNullStringsWithSpaces(
                                    "tw-w-12 tw-h-12 tw-rounded-full tw-flex tw-flex-row tw-items-center tw-justify-center tw-duration-200",
                                    `${itemIndex == selectedIndex ? "lg-bg-primary-500 tw-scale-110" : "lg-bg-secondary-300"}`,
                                )}
                            >
                                {/* <FixedWidthImage
                                    relativePath={item.icon}
                                    width="1.5rem"
                                /> */}

                                <img
                                    src={`https://growthjockey.imgix.net${item.svgIcon}`}
                                    className={concatenateNonNullStringsWithSpaces("tw-w-6 tw-h-6", itemIndex == selectedIndex ? "tw-scale-125" : "tw-opacity-50")}
                                />
                            </div>

                            <VerticalSpacer className="tw-h-2" />

                            <div className="lg-text-icon tw-text-center">{`${getVernacularString(item.title, userPreferences.language)}`}</div>
                        </button>
                    )}
                />
            </div>

            <div
                className="tw-overflow-hidden tw-col-start-1 tw-col-span-full tw-row-start-3 lg:tw-row-start-2 lg:tw-col-start-2"
                ref={emblaRef}
            >
                <div className="tw-grid tw-grid-flow-col tw-auto-cols-[100%]">
                    <ItemBuilder
                        items={[
                            {
                                image: "/livguard/home/3/2.jpg",
                                headingContent1: `${getVernacularString("homeS3Tab2HC1", userPreferences.language)}`,
                                headingContent2: `${getVernacularString("homeS3Tab2HC2", userPreferences.language)}`,
                                content: `${getVernacularString("homeS3Tab2C", userPreferences.language)}`,
                                buttontext: `${getVernacularString("homeS3Tab2BT", userPreferences.language)}`,
                                buttonLink: "/inverter-for-home",
                                target: null,
                            },
                            {
                                image: "/livguard/home/3/3.jpg",
                                headingContent1: `${getVernacularString("homeS3Tab3HC1", userPreferences.language)}`,
                                headingContent2: `${getVernacularString("homeS3Tab3HC2", userPreferences.language)}`,
                                content: `${getVernacularString("homeS3Tab3C", userPreferences.language)}`,
                                buttontext: `${getVernacularString("homeS3Tab3BT", userPreferences.language)}`,
                                buttonLink: "/inverter-batteries",
                                target: null,
                            },
                            {
                                image: "/livguard/home/3/1.jpg",
                                headingContent1: `${getVernacularString("homeS3Tab1HC1", userPreferences.language)}`,
                                headingContent2: `${getVernacularString("homeS3Tab1HC2", userPreferences.language)}`,
                                content: `${getVernacularString("homeS3Tab1C", userPreferences.language)}`,
                                buttontext: `${getVernacularString("homeS3Tab1BT", userPreferences.language)}`,
                                buttonLink: "/battery-finder",
                                target: "_blank",
                            },
                            {
                                image: "/livguard/home/3/4.jpg",
                                headingContent1: `${getVernacularString("homeS3Tab4HC1", userPreferences.language)}`,
                                headingContent2: `${getVernacularString("homeS3Tab4HC2", userPreferences.language)}`,
                                content: `${getVernacularString("homeS3Tab4C", userPreferences.language)}`,
                                buttontext: `${getVernacularString("homeS3Tab4BT", userPreferences.language)}`,
                                buttonLink: "https://www.livguardsolar.com/",
                                target: "_blank",
                            },
                            {
                                image: "/livguard/home/3/5.jpg",
                                headingContent1: `${getVernacularString("homeS3Tab5HC1", userPreferences.language)}`,
                                headingContent2: `${getVernacularString("homeS3Tab5HC2", userPreferences.language)}`,
                                content: `${getVernacularString("homeS3Tab5C", userPreferences.language)}`,
                                buttontext: `${getVernacularString("homeS3Tab5BT", userPreferences.language)}`,
                                buttonLink: "/lg-trolley-category/",
                                target: "_blank",
                            },
                        ]}
                        itemBuilder={(item, itemIndex) => (
                            <div
                                className="[@media(max-width:1024px)]:lg-px-screen-edge tw-flex tw-flex-col tw-justify-center tw-text-center tw-items-center"
                                key={itemIndex}
                            >
                                <DefaultImageAnimation className="tw-w-full">
                                    <FullWidthImage
                                        relativePath={item.image}
                                        className="tw-rounded-lg"
                                    />
                                </DefaultImageAnimation>

                                <VerticalSpacer className="tw-h-4" />

                                <DefaultTextAnimation>
                                    <div className="lg-text-body">{item.headingContent1}</div>
                                </DefaultTextAnimation>

                                <VerticalSpacer className="tw-h-1" />

                                <DefaultTextAnimation>
                                    <div className="lg-text-title1">{item.headingContent2}</div>
                                </DefaultTextAnimation>

                                <VerticalSpacer className="tw-h-4" />

                                <DefaultTextAnimation className="tw-flex-1">
                                    <div className="lg-text-body">{item.content}</div>
                                </DefaultTextAnimation>

                                <VerticalSpacer className="tw-h-4" />

                                <DefaultElementAnimation>
                                    {item.target != null ? (
                                        <Link
                                            to={item.buttonLink}
                                            target="_blank"
                                            className="lg-cta-button"
                                        >
                                            {item.buttontext}
                                        </Link>
                                    ) : (
                                        <Link
                                            to={item.buttonLink}
                                            className="lg-cta-button"
                                        >
                                            {item.buttontext}
                                        </Link>
                                    )}
                                </DefaultElementAnimation>
                            </div>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

export function WeAreOneOfAKind({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge", className)}>
            <div className="tw-flex tw-flex-col lg-card tw-px-4 tw-py-6 tw-rounded-lg">
                <VerticalSpacer className="tw-h-4" />

                <DefaultTextAnimation>
                    <div className="tw-flex tw-flex-col lg-text-headline tw-text-center">
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS4H1T1", userPreferences.language)}} />
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS4H1T2", userPreferences.language)}} />

                        {/* <div>{getVernacularString("homeS5H1T2", userPreferences.language)}</div> */}
                    </div>
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-6" />

                <DefaultTextAnimation>
                    <div className="lg-text-title2 tw-text-center">{getVernacularString("homeS4T2", userPreferences.language)}</div>
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-6" />

                <DefaultTextAnimation>
                    <div className="lg-text-body tw-text-center">{getVernacularString("homeS4T3", userPreferences.language)}</div>
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-6" />

                <DefaultImageAnimation className="tw-block lg:tw-hidden tw-w-full">
                    <FullWidthImage
                        relativePath="/livguard/home/4/1-mobile.jpg"
                        className="tw-rounded-lg"
                    />
                </DefaultImageAnimation>

                <DefaultImageAnimation className="tw-hidden lg:tw-block tw-w-full">
                    <FullWidthImage
                        relativePath="/livguard/home/4/1-desktop.jpg"
                        className="tw-rounded-lg"
                    />
                </DefaultImageAnimation>
            </div>
        </div>
    );
}

export function TransformingLives({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={className}>
            <div className="lg-px-screen-edge lg-text-headline tw-text-center">
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS6H1T1", userPreferences.language)}} />
                </DefaultTextAnimation>
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS6H1T2", userPreferences.language)}} />
                </DefaultTextAnimation>
            </div>

            <VerticalSpacer className="tw-h-8" />

            <TestimonialsCarousel
                userPreferences={userPreferences}
                testimonials={[
                    {
                        video: (
                            <EmbeddedYoutubeVideo
                                id="rVC-ncTBhls"
                                style={{aspectRatio: "560/315"}}
                            />
                        ),
                        name: `${getVernacularString("review1Name", userPreferences.language)}`,
                        rating: 5,
                        state: `${getVernacularString("review1State", userPreferences.language)}`,
                        message: `${getVernacularString("review1Message", userPreferences.language)}`,
                        productImage: "/livguard/products/peace-of-mind-combo/thumbnail.png",
                        productName: `${getVernacularString("review1ProductName", userPreferences.language)}`,
                    },
                    {
                        video: (
                            <EmbeddedYoutubeVideo
                                id="pNMTMVDWtiU"
                                style={{aspectRatio: "560/315"}}
                            />
                        ),
                        name: `${getVernacularString("review2Name", userPreferences.language)}`,
                        rating: 5,
                        state: `${getVernacularString("review2State", userPreferences.language)}`,
                        message: `${getVernacularString("review2Message", userPreferences.language)}`,
                        productImage: "/livguard/products/urban-combo/thumbnail.png",
                        productName: `${getVernacularString("review2ProductName", userPreferences.language)}`,
                    },
                    {
                        name: `${getVernacularString("review3Name", userPreferences.language)}`,
                        rating: 5,
                        state: `${getVernacularString("review3State", userPreferences.language)}`,
                        message: `${getVernacularString("review3Message", userPreferences.language)}`,
                        productImage: "/livguard/products/lgs1100i/thumbnail.png",
                        productName: `${getVernacularString("review3ProductName", userPreferences.language)}`,
                    },
                    {
                        name: `${getVernacularString("review4Name", userPreferences.language)}`,
                        rating: 4,
                        state: `${getVernacularString("review4State", userPreferences.language)}`,
                        message: `${getVernacularString("review4Message", userPreferences.language)}`,
                        productImage: "/livguard/products/urban-combo/thumbnail.png",
                        productName: `${getVernacularString("review4ProductName", userPreferences.language)}`,
                    },
                ]}
            />
        </div>
    );
}

export function SolarSolutions({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge-2 tw-w-full tw-max-w-7xl tw-mx-auto", className)}>
            <div className="tw-grid tw-grid-rows-[repeat(5,auto)] tw-grid-cols-1 lg:tw-grid-rows-[1fr_repeat(4,auto)_1fr] lg:tw-grid-cols-[minmax(0,4fr),minmax(0,3fr)] tw-gap-x-4 tw-gap-y-4 lg:tw-gap-y-8 lg-bg-secondary-100 tw-rounded-lg tw-justify-center tw-text-center tw-py-6">
                <h2 className="tw-row-start-1 tw-col-start-1 lg:tw-row-start-2 lg:tw-col-start-1 tw-px-6 lg-text-headline">
                    <div dangerouslySetInnerHTML={{__html: appendSpaceToString(getVernacularString("homeS7H1T1", userPreferences.language))}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS7H1T2", userPreferences.language)}} />
                </h2>

                <div className="tw-row-start-2 tw-col-start-1 lg:tw-row-start-3 lg:tw-col-start-1 tw-px-6 lg-text-body lg:tw-max-w-[35rem] lg:tw-place-self-center">
                    {getVernacularString("homeS7T2", userPreferences.language)}
                </div>

                <div className="tw-row-start-3 tw-col-start-1 lg:tw-row-start-4 lg:tw-col-start-1 tw-px-6 lg-text-title2">{getVernacularString("homeS7T3", userPreferences.language)}</div>

                <div className="tw-row-start-4 tw-col-start-1 lg:tw-row-start-1 lg:tw-col-start-2 lg:tw-row-span-full lg:tw-pr-8">
                    <CarouselStyle2
                        userPreferences={userPreferences}
                        items={[
                            {
                                imageRelativePath: "/livguard/home/7/1.jpg",
                                titleTextContentPiece: "homeS7S1T1",
                                bodyTextContentPiece: "homeS7S1T2",
                            },
                            {
                                imageRelativePath: "/livguard/home/7/2.jpg",
                                titleTextContentPiece: "homeS7S2T1",
                                bodyTextContentPiece: "homeS7S2T2",
                            },
                            {
                                imageRelativePath: "/livguard/home/7/3.jpg",
                                titleTextContentPiece: "homeS7S3T1",
                                bodyTextContentPiece: "homeS7S3T2",
                            },
                        ]}
                    />
                </div>

                <div className="tw-row-start-5 tw-col-start-1 lg:tw-row-start-5 lg:tw-col-start-1 tw-justify-self-center tw-px-6">
                    <a
                        href="https://www.livguardsolar.com/"
                        className="lg-cta-button"
                    >
                        {getVernacularString("homeS7T4", userPreferences.language)}
                    </a>
                </div>
            </div>
        </div>
    );
}

export function MeetOurLeadership({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-flex tw-flex-col lg:tw-h-full", className)}>
            <div className="[@media(max-width:1024px)]:lg-px-screen-edge [@media(max-width:1024px)]:lg-text-headline lg:lg-text-title2 tw-text-center lg:tw-hidden">
                <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS8H1T1", userPreferences.language)}} />
                <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS8H1T2", userPreferences.language)}} />
            </div>

            <VerticalSpacer className="tw-h-8 lg:tw-hidden" />

            <LeadersCarousel
                userPreferences={userPreferences}
                leaders={[
                    {
                        image: "/livguard/home/8/1.jpg",
                        name: "homeS8Slide1T1",
                        designation: "homeS8Slide1T2",
                        bio: "homeS8Slide1T3",
                    },
                    {
                        image: "/livguard/home/8/2.jpg",
                        name: "homeS8Slide2T1",
                        designation: "homeS8Slide2T2",
                        bio: "homeS8Slide2T3",
                    },
                    {
                        image: "/livguard/home/8/3.jpg",
                        name: "homeS8Slide3T1",
                        designation: "homeS8Slide3T2",
                        bio: "homeS8Slide3T3",
                    },
                    {
                        image: "/livguard/home/8/4.jpg",
                        name: "homeS8Slide4T1",
                        designation: "homeS8Slide4T2",
                        bio: "homeS8Slide4T3",
                    },
                ]}
            />
        </div>
    );
}

export function FaqSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
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

export function DealerLocator({userPreferences, showCtaButton, className}: {userPreferences: UserPreferences; showCtaButton: boolean; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("[@media(max-width:1024px)]:lg-px-screen-edge", className)}>
            <div className="tw-relative lg-card tw-h-[21.875rem] tw-overflow-hidden lg:tw-h-full lg:tw-min-h-[31.25rem] lg:tw-px-2">
                <div className="tw-flex tw-flex-col tw-absolute tw-m-auto tw-top-0 tw-left-0 tw-right-0 tw-bottom-0 tw-justify-center tw-items-center">
                    <div className="tw-absolute tw-inset-0">
                        <CoverImage relativePath={userPreferences.theme == Theme.Dark ? "/livguard/home/10/1-dark.jpg" : "/livguard/home/10/1-light.jpg"} />
                    </div>

                    <div className="tw-z-10 lg-text-headline tw-text-center">
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS10H1T1", userPreferences.language)}} />
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS10H1T2", userPreferences.language)}} />
                    </div>

                    <VerticalSpacer className="tw-h-1" />

                    <div className="tw-z-10 lg-text-title2 tw-text-center">{getVernacularString("homeS10T2", userPreferences.language)}</div>

                    {showCtaButton && (
                        <>
                            <VerticalSpacer className="tw-h-6" />

                            <Link
                                to="/dealer-for-inverters-and-batteries"
                                className="tw-z-10 lg-cta-button"
                            >
                                {getVernacularString("homeS10T3", userPreferences.language)}
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export function ShowerSomeLoveOnSocialHandles({userPreferences, heading, className}: {userPreferences: UserPreferences; heading: {text1: string; text2: string}; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("[@media(max-width:1024px)]:lg-px-screen-edge lg:tw-h-full", className)}>
            <div className="tw-flex tw-flex-col lg-card tw-text-center lg-px-screen-edge lg:tw-h-full lg:tw-justify-center lg:tw-items-center lg:tw-py-4">
                <VerticalSpacer className="tw-h-4" />

                <h2 className="[@media(max-width:1024px)]:lg-text-headline lg:lg-text-title2">
                    <div dangerouslySetInnerHTML={{__html: appendSpaceToString(getVernacularString(heading.text1, userPreferences.language))}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString(heading.text2, userPreferences.language)}} />
                </h2>

                <VerticalSpacer className="tw-h-4" />

                <CarouselStyle3
                    items={[
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
                    ]}
                />

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-body">{getVernacularString("homeS11T2", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-2" />

                <div className="tw-flex tw-justify-evenly ">
                    <a
                        href="https://www.facebook.com/LivguardEnergy/"
                        target="_blank"
                        className="tw-px-2"
                    >
                        <Facebook className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                    <a
                        href="https://twitter.com/LivguardEnergy"
                        target="_blank"
                        className="tw-px-2"
                    >
                        <Twitter className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                    <a
                        href="https://www.instagram.com/livguardenergy/"
                        target="_blank"
                        className="tw-px-2"
                    >
                        <Instagram className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                    <a
                        href="https://www.linkedin.com/company/livguard-energy/"
                        target="_blank"
                        className="tw-px-2"
                    >
                        <Linkedin className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                    <a
                        href="https://www.youtube.com/@LivguardEnergy"
                        target="_blank"
                        className="tw-px-2"
                    >
                        <Youtube className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                </div>

                <VerticalSpacer className="tw-h-4" />
            </div>
        </div>
    );
}

export function InTheNewsSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const newsArticles = [
        {
            imageRelativeUrl: "/livguard/home/12/logo-thehindu.png",
            imageSurroundingColor: "#FFF0F0",
            title: "Conquering Power Cuts: Livguard Inverter and Inverter Batteries, the Ultimate Smart Solution",
            link: "https://www.thehindu.com/brandhub/conquering-power-cuts-livguard-inverter-and-inverter-batteries-the-ultimate-smart-solution/article67018979.ece",
        },
        {
            imageRelativeUrl: "/livguard/home/12/logo-et.png",
            imageSurroundingColor: "#FFF0F0",
            title: "Breaking barriers: Livguard's inverter solutions pave the way for a power-cut-free India",
            link: "https://economictimes.indiatimes.com/industry/cons-products/electronics/breaking-barriers-livguards-inverter-solutions-pave-the-way-for-a-power-cut-free-india/articleshow/101344909.cms",
        },
        {
            imageRelativeUrl: "/livguard/home/12/logo-nbt.png",
            imageSurroundingColor: "#FFF0F0",
            title: "चाहे बिजली हो न हो, Livguard इन्वर्टर से घर में होगी रोशनी, आज ही ले आएं घर",
            link: "https://navbharattimes.indiatimes.com/tech/gadgets-news/solving-power-cuts-with-livguard-inverters/articleshow/101343860.cms",
        },
        {
            imageRelativeUrl: "/livguard/home/12/logo-toi.png",
            imageSurroundingColor: "#FFF0F0",
            title: "Unlocking India's Potential: Overcoming power cuts with innovative inverter solutions by Livguard - Times of India",
            link: "https://m.timesofindia.com/spotlight/unlocking-indias-potential-overcoming-power-cuts-with-innovative-inverter-solutions-by-livguard/articleshow/100700838.cms",
        },
        {
            imageRelativeUrl: "/livguard/home/12/logo-indiablooms.png",
            imageSurroundingColor: "#FFF0F0",
            title: "A New Era in Residential Power Backup: Inverter and Battery Combo | Indiablooms - First Portal on Digital News Management",
            link: "https://www.indiablooms.com/life-details/L/7267/a-new-era-in-residential-power-backup-inverter-and-battery-combo.html",
        },
    ];

    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge tw-w-full tw-max-w-7xl tw-mx-auto", className)}>
            <div className="tw-row-start-1 tw-col-start-1 lg:tw-row-start-1 lg:tw-col-start-1 lg-text-headline tw-text-center">
                <div dangerouslySetInnerHTML={{__html: getVernacularString("79c83c5f-5a33-4b6b-9b5f-789ee5d140a8", userPreferences.language)}} />
            </div>

            <VerticalSpacer className="tw-h-4 lg:tw-h-8" />

            <div className="tw-grid tw-grid-rows-1 tw-grid-cols-1 lg:tw-grid-rows-[auto] lg:tw-grid-cols-1 tw-gap-y-4 lg:tw-gap-x-12 lg:tw-pb-8 tw-pb-4 lg:tw-items-center tw-rounded-lg">
                <InTheNewsCarousel
                    className=""
                    items={newsArticles}
                />
            </div>
        </div>
    );
}

export function PowerfulPurposePowerfulImpact({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge tw-w-full tw-max-w-7xl tw-mx-auto", className)}>
            <div className="tw-grid tw-grid-rows-[repeat(5,auto)] tw-grid-cols-1 lg:tw-grid-rows-[1fr_repeat(4,auto)_1fr] lg:tw-grid-cols-2 tw-gap-y-4 lg-card tw-px-4 lg:tw-pl-8 tw-py-4 tw-rounded-lg">
                <div className="tw-row-start-1 tw-col-start-1 lg:tw-row-start-2 lg:tw-col-start-1 lg-text-headline">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS12H1T1", userPreferences.language)}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS12H1T2", userPreferences.language)}} />
                </div>

                <div className="tw-row-start-2 tw-col-start-1 lg:tw-row-start-3 lg:tw-col-start-1 lg-text-body lg:tw-pr-[60px]">{getVernacularString("homeS12T2", userPreferences.language)}</div>

                <ul className="tw-row-start-3 tw-col-start-1 lg:tw-row-start-4 lg:tw-col-start-1 tw-list-disc tw-ml-5 lg:tw-pr-[60px]">
                    <li>
                        <div className="lg-text-body">{getVernacularString("homeS12T3P1", userPreferences.language)}</div>
                    </li>
                    <li>
                        <div className="lg-text-body">{getVernacularString("homeS12T3P2", userPreferences.language)}</div>
                    </li>
                    <li>
                        <div className="lg-text-body">{getVernacularString("homeS12T3P3", userPreferences.language)}</div>
                    </li>
                    <li>
                        <div className="lg-text-body">{getVernacularString("homeS12T3P4", userPreferences.language)}</div>
                    </li>
                </ul>

                <CarouselStyle3
                    className="tw-row-start-4 tw-col-start-1 lg:tw-row-start-1 lg:tw-col-start-2 lg:tw-row-span-full"
                    items={[
                        <FullWidthImage
                            relativePath="/livguard/home/11/1.jpg"
                            className="tw-rounded-lg"
                        />,
                        <FullWidthImage
                            relativePath="/livguard/home/11/2.jpg"
                            className="tw-rounded-lg"
                        />,
                        <FullWidthImage
                            relativePath="/livguard/home/11/3.jpg"
                            className="tw-rounded-lg"
                        />,
                    ]}
                />

                <Link
                    to="/csr"
                    className="tw-row-start-5 tw-col-start-1 lg:tw-row-start-5 lg:tw-col-start-1 lg-cta-button tw-justify-self-center lg:tw-justify-self-start"
                >
                    {getVernacularString("homeS12T4", userPreferences.language)}
                </Link>
            </div>
        </div>
    );
}

export function ContactUsCta({
    userPreferences,
    textVernacId,
    utmParameters,
    className,
    pageUrl,
    buttonClassName,
}: {
    userPreferences: UserPreferences;
    textVernacId: string;
    utmParameters: {[searchParameter: string]: string};
    className?: string;
    pageUrl: string;
    buttonClassName?: string;
}) {
    const [isContactUsDialogOpen, setIsContactUsDialogOpen] = useState(false);

    function tryToOpenContactUsDialog() {
        setIsContactUsDialogOpen(true);
    }

    return (
        <div className={className}>
            <button
                type="button"
                className={concatenateNonNullStringsWithSpaces("lg-cta-button", buttonClassName)}
                onClick={tryToOpenContactUsDialog}
            >
                {getVernacularString(textVernacId, userPreferences.language)}
            </button>

            <ContactUsDialog
                userPreferences={userPreferences}
                isContactUsDialogOpen={isContactUsDialogOpen}
                setIsContactUsDialogOpen={setIsContactUsDialogOpen}
                utmParameters={utmParameters}
                pageUrl={pageUrl}
            />
        </div>
    );
}

export function ContactUsDialog({
    userPreferences,
    isContactUsDialogOpen,
    setIsContactUsDialogOpen,
    utmParameters,
    pageUrl,
}: {
    userPreferences: UserPreferences;
    isContactUsDialogOpen: boolean;
    setIsContactUsDialogOpen: React.Dispatch<boolean>;
    utmParameters: {[searchParameter: string]: string};
    pageUrl: string;
}) {
    // TODO: Understand why we cannot use action for this
    const fetcher = useFetcher();
    const otpFetcher = useFetcher();
    const otpFieldRef = useRef(null);
    const phoneNumberRef = useRef(null);
    const leadId = useRef<Uuid>(generateUuid());

    const [formStateInputs, dispatch] = useReducer(FormStateInputsReducer, createInitialFormState());

    useEffect(() => {
        if (fetcher.data == null) {
            return;
        }

        if (fetcher.data.error != null) {
            toast.error(fetcher.data.error);
            const action: FormStateInputsAction = {
                actionType: FormStateInputsActionType.SetInvalidOtp,
                payload: true,
            };
            dispatch(action);
            return;
        }

        const action: FormStateInputsAction = {
            actionType: FormStateInputsActionType.SetFormSuccessfullySubmited,
            payload: true,
        };
        dispatch(action);
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({event: "submit"});
        return;
    }, [fetcher.data]);

    useEffect(() => {
        if (otpFetcher.data == null) {
            return;
        } else if (otpFetcher.data.error != null) {
            toast.error(otpFetcher.data.error);
            return;
        }
        if (formStateInputs.isOtpresent) {
            toast.success("OTP resent successfully");
        } else {
            toast.success("OTP sent successfully");
        }
    }, [otpFetcher.data]);

    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);
    useEffect(() => {
        if (formStateInputs.resendTimeOut > 0 && formStateInputs.showOtpField) {
            if (timeoutId != null) {
                clearTimeout(timeoutId);
            }
            let timeout = setTimeout(() => {
                console.log("action dispatching", formStateInputs.resendTimeOut);
                const action: FormStateInputsAction = {
                    actionType: FormStateInputsActionType.SetResendTimeOut,
                    payload: formStateInputs.resendTimeOut - 1,
                };
                dispatch(action);
            }, 1000);
            setTimeoutId(timeout);
        }
    }, [formStateInputs.resendTimeOut]);

    function tryToCloseContactUsDialog() {
        setIsContactUsDialogOpen(false);
        const action: FormStateInputsAction = {
            actionType: FormStateInputsActionType.TryToCloseDialog,
            payload: true,
        };
        dispatch(action);
    }

    return (
        <>
            <LivguardDialog
                isDialogOpen={isContactUsDialogOpen && !formStateInputs.formSuccessfullySubmitted}
                tryToCloseDialog={tryToCloseContactUsDialog}
                title={getVernacularString("contactUsT1", userPreferences.language)}
                showCloseIcon={true}
            >
                <fetcher.Form
                    className="tw-w-full tw-flex tw-flex-col"
                    method="post"
                    action="/lead-form-submission"
                >
                    <div className="lg-text-body-bold lg-text-secondary-900 tw-pl-3">{getVernacularString("contactUsT3", userPreferences.language)}</div>

                    <VerticalSpacer className="tw-h-1" />

                    <input
                        type="text"
                        name="name"
                        required
                        className="lg-text-input"
                        onChange={(e) => {
                            const action: FormStateInputsAction = {
                                actionType: FormStateInputsActionType.SetName,
                                payload: e.target.value,
                            };
                            dispatch(action);
                        }}
                    />

                    <VerticalSpacer className="tw-h-2" />

                    <div className="lg-text-body-bold lg-text-secondary-900 tw-pl-3">{getVernacularString("contactUsT4", userPreferences.language)}</div>

                    <VerticalSpacer className="tw-h-1" />

                    <input
                        type="text"
                        name="emailId"
                        className="lg-text-input"
                        pattern={emailIdValidationPattern}
                        required
                        onChange={(e) => {
                            const action: FormStateInputsAction = {
                                actionType: FormStateInputsActionType.SetEmail,
                                payload: e.target.value,
                            };
                            dispatch(action);
                        }}
                    />

                    <VerticalSpacer className="tw-h-2" />

                    {!formStateInputs.showOtpField ? (
                        <div className="lg-text-body-bold lg-text-secondary-900 tw-pl-3">{getVernacularString("contactUsT2", userPreferences.language)}</div>
                    ) : (
                        <div className="tw-grid tw-w-full tw-items-center tw-grid-cols-[auto_0.5rem_minmax(0,1fr)] tw-pl-3">
                            <div
                                className="tw-col-start-1 tw-text-primary-500-light hover:tw-cursor-pointer lg-text-body-bold"
                                onClick={(e) => {
                                    const action: FormStateInputsAction = {
                                        actionType: FormStateInputsActionType.EditPhoneNumber,
                                        payload: true,
                                    };
                                    dispatch(action);
                                    if (phoneNumberRef.current != null) {
                                        phoneNumberRef.current.focus();
                                    }
                                }}
                            >
                                {getVernacularString("phoneNumberChnage", userPreferences.language)}
                            </div>
                            <div className="tw-col-start-3 lg-text-secondary-900 lg-text-body-bold">{formStateInputs.inputData.phoneNumber}</div>
                        </div>
                    )}

                    <VerticalSpacer className="tw-h-1" />

                    {!formStateInputs.showOtpField ? (
                        <div className="tw-relative tw-w-full tw-items-center tw-grid">
                            <input
                                type="text"
                                name="phoneNumber"
                                pattern={indianPhoneNumberValidationPattern}
                                required
                                autoFocus={true}
                                className="lg-text-input tw-w-full"
                                disabled={formStateInputs.showOtpField}
                                defaultValue={formStateInputs.inputData.phoneNumber}
                                ref={phoneNumberRef}
                                onChange={(e) => {
                                    const phoneNumber = e.target.value;
                                    const action: FormStateInputsAction = {
                                        actionType: FormStateInputsActionType.SetPhoneNumber,
                                        payload: phoneNumber,
                                    };
                                    dispatch(action);
                                    if (phoneNumber.length == 10) {
                                        const action: FormStateInputsAction = {
                                            actionType: FormStateInputsActionType.SetShowOtpButton,
                                            payload: true,
                                        };
                                        dispatch(action);
                                    } else {
                                        const action: FormStateInputsAction = {
                                            actionType: FormStateInputsActionType.SetShowOtpButton,
                                            payload: false,
                                        };
                                        dispatch(action);
                                    }
                                }}
                                onBlur={(e) => {
                                    if (formStateInputs.inputData.phoneNumber.length == 10) {
                                        const action: FormStateInputsAction = {
                                            actionType: FormStateInputsActionType.SetShowOtpButton,
                                            payload: true,
                                        };
                                        dispatch(action);
                                    }
                                }}
                                onFocus={(e) => {
                                    if (formStateInputs.inputData.phoneNumber.length == 10) {
                                        const action: FormStateInputsAction = {
                                            actionType: FormStateInputsActionType.SetShowOtpButton,
                                            payload: true,
                                        };
                                        dispatch(action);
                                    }
                                }}
                            />
                            <div
                                className={concatenateNonNullStringsWithSpaces(
                                    "tw-absolute tw-right-2 tw-bg-gradient-to-r tw-from-[#F25F60] tw-to-[#EB2A2B] tw-rounded-full tw-px-2 tw-py-1 tw-items-center tw-text-secondary-100-light hover:tw-cursor-pointer",
                                    formStateInputs.showOtpButton ? "tw-opacity-100 tw-duration-100 tw-z-10" : "tw-opacity-0 -tw-z-100 tw-duration-100",
                                )}
                                onClick={(e) => {
                                    if (formStateInputs.inputData.name == "") {
                                        toast.error("Name field can't be empty");
                                        return;
                                    }
                                    const action: FormStateInputsAction = {
                                        actionType: FormStateInputsActionType.SendOtp,
                                        payload: true,
                                    };
                                    dispatch(action);
                                    // setResendTimeOut(60);
                                    if (otpFieldRef.current != null) {
                                        otpFieldRef.current.focus();
                                    }
                                    const data = new FormData();
                                    data.append("phoneNumber", formStateInputs.inputData.phoneNumber);
                                    data.append("name", formStateInputs.inputData.name);
                                    otpFetcher.submit(data, {method: "post", action: "/resend-otp"});
                                }}
                            >
                                {getVernacularString("OfferFormGetOTP", userPreferences.language)}
                            </div>
                        </div>
                    ) : (
                        <div
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-flex tw-flex-col tw-w-full",
                                formStateInputs.showOtpField ? "tw-opacity-100 tw-duration-100 tw-z-10" : "tw-opacity-0 -tw-z-100",
                            )}
                        >
                            {/* <div className="lg-text-body-bold lg-text-secondary-900 tw-pl-3">{getVernacularString("contactUsOTPT3", userPreferences.language)}</div>

                            <VerticalSpacer className="tw-h-1" /> */}

                            <div className="tw-relative">
                                <input
                                    type="text"
                                    name="otpSubmitted"
                                    className="lg-text-input"
                                    required
                                    placeholder={getVernacularString("contactUsOTPT3E", userPreferences.language)}
                                    ref={otpFieldRef}
                                    onChange={(e) => {
                                        const action: FormStateInputsAction = {
                                            actionType: FormStateInputsActionType.SetOtpSubmitted,
                                            payload: e.target.value,
                                        };
                                        dispatch(action);
                                    }}
                                />
                                {formStateInputs.invalidOtp && (
                                    <div className="lg-text-primary-500 tw-absolute lg-text-icon tw-right-2 tw-top-0 tw-bottom-0 tw-pt-[18px]">
                                        {getVernacularString("OfferInvalidOTP", userPreferences.language)}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <VerticalSpacer className="tw-h-1" />

                    <div
                        className={concatenateNonNullStringsWithSpaces(
                            "tw-flex tw-flex-row tw-justify-between tw-w-full tw-px-3",
                            formStateInputs.showOtpField ? "tw-opacity-100 tw-duration-100 tw-z-10" : "tw-opacity-0 -tw-z-100",
                        )}
                    >
                        <div
                            className={concatenateNonNullStringsWithSpaces("lg-text-secondary-700 tw-text-[12px]", `${formStateInputs.resendTimeOut > 0 ? "undefined" : "hover:tw-cursor-pointer"}`)}
                            onClick={() => {
                                const action: FormStateInputsAction = {
                                    actionType: FormStateInputsActionType.SetIsOtpResent,
                                    payload: true,
                                };
                                dispatch(action);
                                const data = new FormData();
                                data.append("phoneNumber", formStateInputs.inputData.phoneNumber);
                                data.append("name", formStateInputs.inputData.name);
                                otpFetcher.submit(data, {method: "post", action: "/resend-otp"});
                            }}
                        >
                            {getVernacularString("OfferResendOTP", userPreferences.language)}
                        </div>
                        <div className="lg-text-secondary-700 tw-text-[12px]">{`00:${formStateInputs.resendTimeOut}`}</div>
                    </div>

                    <VerticalSpacer className="tw-h-4" />

                    <input
                        name="utmParameters"
                        className="tw-hidden"
                        readOnly
                        value={JSON.stringify(utmParameters)}
                    />

                    <input
                        name="leadId"
                        className="tw-hidden"
                        readOnly
                        value={leadId.current}
                    />

                    <input
                        name="formType"
                        className="tw-hidden"
                        readOnly
                        value={FormType.leadFormSubmission}
                    />

                    <input
                        name="inputData"
                        className="tw-hidden"
                        readOnly
                        value={JSON.stringify(formStateInputs.inputData)}
                    />

                    <input
                        name="pageUrl"
                        className="tw-hidden"
                        readOnly
                        value={pageUrl}
                    />

                    <div className="tw-w-full tw-flex tw-flex-row tw-gap-x-2 tw-justify-center tw-items-center">
                        <input
                            type="checkbox"
                            name="termsAndConditionsChecked"
                            style={{accentColor: `${formStateInputs.inputData.termsAndConditionsChecked ? "#eb2a2b" : "white"}`}}
                            defaultChecked={formStateInputs.inputData.termsAndConditionsChecked}
                            required
                            onChange={(e) => {
                                const action: FormStateInputsAction = {
                                    actionType: FormStateInputsActionType.TermsAndConditionsCheckboxClicked,
                                    payload: e.target.value,
                                };
                                dispatch(action);
                            }}
                        />

                        <div dangerouslySetInnerHTML={{__html: getVernacularString("termsAndConditionsCheckboxtext", userPreferences.language)}} />
                    </div>

                    <button
                        type="submit"
                        className="lg-cta-button tw-px-4 tw-self-center tw-w-60"
                        disabled={
                            fetcher.state != "idle" ||
                            formStateInputs.inputData.name == "" ||
                            formStateInputs.inputData.email == "" ||
                            formStateInputs.inputData.phoneNumber == "" ||
                            formStateInputs.inputData.phoneNumber.length != 10 ||
                            formStateInputs.inputData.otpSubmitted == "" ||
                            formStateInputs.inputData.otpSubmitted.length != 6
                        }
                    >
                        {getVernacularString("contactUsT5", userPreferences.language)}
                    </button>
                </fetcher.Form>
            </LivguardDialog>

            <FormSubmissionSuccessLivguardDialog
                userPreferences={userPreferences}
                isDialogOpen={isContactUsDialogOpen && formStateInputs.formSuccessfullySubmitted}
                tryToCloseDialog={tryToCloseContactUsDialog}
            />
        </>
    );
}
