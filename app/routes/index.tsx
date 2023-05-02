import {Dialog, Transition} from "@headlessui/react";
import {ChevronDoubleDownIcon} from "@heroicons/react/20/solid";
import {LinksFunction, LoaderFunction, MetaFunction} from "@remix-run/node";
import {Link, useFetcher} from "@remix-run/react";
import React, {useEffect, useState} from "react";
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
import {FAQSection} from "~/components/faqs";
import {LeadersCarousel} from "~/components/leadersCarousel";
import LivguardDialog from "~/components/livguardDialog";
import {OtpVerificationDialog} from "~/components/otpVerificationDialog";
import {PageScaffold} from "~/components/pageScaffold";
import {TestimonialsCarousel} from "~/components/testimonialsCarousel";
import {CoverImage} from "~/global-common-typescript/components/coverImage";
import {FixedHeightImage} from "~/global-common-typescript/components/fixedHeightImage";
import {FullWidthImage} from "~/global-common-typescript/components/fullWidthImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces, generateUuid} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {emailIdValidationPattern, phoneNumberValidationPattern} from "~/global-common-typescript/utilities/validationPatterns";
import {useEmlbaCarouselWithIndex} from "~/hooks/useEmlbaCarouselWithIndex";
import {FormSubmissionSuccessLivguardDialog} from "~/routes/dealer-for-inverters-and-batteries";
import {PowerPlannerTeaser} from "~/routes/load-calculator";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import {FormType, Language, Theme, UserPreferences} from "~/typeDefinitions";
import {appendSpaceToString, getRedirectToUrlFromRequest} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";

export const meta: MetaFunction = ({data}:{data: LoaderData}) => {
    const userPreferences: UserPreferences = data.userPreferences;
    if (userPreferences.language == Language.English) {
        return {
            title: "Livguard : Buy inverter, batteries and all types of home energy storage solutions",
            description: "Shop for the best range of inverters, batteries and energy storage solutions for your home with Livguard",
        };
    } else if (userPreferences.language == Language.Hindi) {
        return {
            title: "लिवगार्ड: इनवर्टर, बैटरी और सभी प्रकार के ऊर्जा संग्रहण समाधान खरीदें",
            description: "लिवगार्ड के साथ अपने घर के लिए इनवर्टर, बैटरी और ऊर्जा संग्रहण समाधानों की सर्वोत्तम श्रेणी की खरीदारी करें",
        };
    } else {
        throw Error(`Undefined language ${userPreferences.language}`);
    }
};

export const links: LinksFunction = () => {
    return [{rel: "canonical", href: "https://www.livguard.com/"}];
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
                breadcrumbs={[{contentId: "cfab263f-0175-43fb-91e5-fccc64209d36", link: "#"}]}
            >
                <HomePage
                    userPreferences={userPreferences}
                    utmParameters={utmSearchParameters}
                />
            </PageScaffold>

            <StickyBottomBar userPreferences={userPreferences} />

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
            />
        </>
    );
}

function HomePage({
    userPreferences,
    utmParameters,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
}) {
    return (
        <div className="tw-grid tw-grid-rows-1 tw-grid-cols-1 lg:tw-grid-rows-1 lg:tw-grid-cols-6 tw-gap-x-8 tw-align-stretch">
            <HeroSection
                userPreferences={userPreferences}
                utmParameters={utmParameters}
                className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
            />

            <VerticalSpacer className="tw-row-start-2 tw-col-start-1 lg:tw-col-span-full tw-h-10 lg:tw-h-20" />

            <EnergyStorageSolutions
                userPreferences={userPreferences}
                className="tw-row-start-3 tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-row-start-4 tw-col-start-1 lg:tw-col-span-full tw-h-10 lg:tw-h-20" />

            <EnergySolutions
                userPreferences={userPreferences}
                className="tw-row-start-5 tw-col-start-1 lg:tw-row-start-5 lg:tw-col-start-1 lg:tw-col-span-3 lg:tw-pl-[72px] xl:tw-pl-[120px]"
            />

            <VerticalSpacer className="tw-row-start-6 tw-col-start-1 lg:tw-col-span-full tw-h-10 lg:tw-h-20" />

            <PowerPlannerTeaser
                userPreferences={userPreferences}
                className="tw-row-start-7 tw-col-start-1 lg:tw-row-start-7 lg:tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-row-start-[8] tw-col-start-1 lg:tw-col-span-full tw-h-10 lg:tw-h-20" />

            <DealerLocator
                userPreferences={userPreferences}
                showCtaButton={true}
                className="tw-row-start-9 tw-col-start-1 lg:tw-row-start-[13] lg:tw-col-start-3 lg:tw-col-span-2 lg:tw-self-end lg:tw-h-full"
            />

            <VerticalSpacer className="tw-row-start-10 tw-col-start-1 lg:tw-row-start-[12] lg:tw-col-span-full tw-h-10 lg:tw-h-20" />

            <WeAreOneOfAKind
                userPreferences={userPreferences}
                className="tw-row-start-11 tw-col-start-1 lg:tw-row-start-5 lg:tw-col-start-4 lg:tw-col-span-3 lg:tw-pr-[72px] xl:tw-pr-[120px]"
            />

            <VerticalSpacer className="tw-row-start-12 tw-col-start-1 lg:tw-row-start-[10] lg:tw-col-span-full tw-h-10 lg:tw-h-20" />

            <TransformingLives
                userPreferences={userPreferences}
                className="tw-row-start-13 tw-col-start-1 lg:tw-row-start-[9] lg:tw-col-start-1 lg:tw-col-span-full lg:tw-pl-[72px] xl:tw-pl-[120px] lg:tw-pr-0"
            />

            <VerticalSpacer className="tw-row-start-14 tw-col-start-1 lg:tw-hidden tw-h-10 lg:tw-h-20" />

            <SolarSolutions
                userPreferences={userPreferences}
                className="tw-row-start-15 tw-col-start-1 lg:tw-row-start-[11] lg:tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-row-start-14 tw-col-start-1 lg:tw-row-start-[14] lg:tw-col-start-1 lg:tw-col-span-full tw-h-10 lg:tw-h-20" />

            <MeetOurLeadership
                userPreferences={userPreferences}
                className="tw-row-start-13 tw-col-start-1 lg:tw-row-start-[13] lg:tw-col-start-1 lg:tw-col-span-2 lg:tw-self-end lg:tw-pl-[40px] xl:tw-pl-[120px]"
            />

            <VerticalSpacer className="tw-row-start-14 tw-col-start-1 lg:tw-row-start-[16] lg:tw-col-start-1 lg:tw-col-span-full tw-h-10 lg:tw-h-20" />

            <FaqSection
                userPreferences={userPreferences}
                className="tw-row-start-13 tw-col-start-1 lg:tw-row-start-[15] lg:tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-row-start-14 tw-col-start-1 lg:tw-hidden tw-h-10 lg:tw-h-20" />

            <ShowerSomeLoveOnSocialHandles
                userPreferences={userPreferences}
                heading={{text1: "homeS11H1T1", text2: "homeS11H1T2"}}
                className="tw-row-start-13 tw-col-start-1 lg:tw-row-start-[13] lg:tw-col-start-5 lg:tw-col-span-2 lg:tw-self-end lg:tw-pr-[40px] xl:tw-pr-[120px] lg:tw-h-full"
            />

            <VerticalSpacer className="tw-row-start-14 tw-col-start-1 lg:col-start-[18] tw-h-10 lg:tw-h-20" />

            <PowerfulPurposePowerfulImpact
                userPreferences={userPreferences}
                className="tw-row-start-13 tw-col-start-1 lg:tw-row-start-[17] lg:tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
            />
        </div>
    );
}

function HeroSection({
    userPreferences,
    utmParameters,
    className,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
    className?: string;
}) {
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();

    return (
        // screen = 48px + 56px + ? + 32px + 56px + 32px + 90px
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-h-[calc(100vh-19.625rem-var(--lg-mobile-ui-height))] lg:tw-h-[calc(100vh-9rem)] tw-overflow-hidden tw-grid tw-grid-rows-[1.5rem_3rem_minmax(0,1fr)_auto_1rem_auto_1rem_minmax(0,1fr)_auto_3rem] tw-justify-items-center tw-text-secondary-900-dark",
                className,
            )}
            ref={ref}
        >
            {containerWidth == null || containerHeight == null ? null : (
                <CoverImage
                    relativePath={containerHeight > containerWidth ? "/livguard/home/1/1-mobile.jpg" : "/livguard/home/1/1-desktop.jpg"}
                    className="tw-row-start-1 tw-col-start-1 tw-row-span-full"
                    key={containerHeight > containerWidth ? "/livguard/home/1/1-mobile.jpg" : "/livguard/home/1/1-desktop.jpg"}
                />
            )}

            <div className="tw-row-1 tw-col-start-1 tw-row-span-full tw-w-full tw-h-full tw-bg-black tw-opacity-40" />

            <h2 className="tw-row-start-4 tw-col-start-1 tw-flex tw-flex-col tw-gap-y-2 tw-z-10 tw-text-center lg-px-screen-edge">
                <DefaultTextAnimation>
                    <div className="lg-text-banner">{appendSpaceToString(getVernacularString("homeS1T1", userPreferences.language))}</div>
                </DefaultTextAnimation>

                <DefaultTextAnimation>
                    <div className="lg-text-title1">{getVernacularString("homeS1T2", userPreferences.language)}</div>
                </DefaultTextAnimation>
            </h2>

            <DefaultElementAnimation className="tw-row-start-6 tw-col-start-1 tw-z-10">
                <ContactUsCta
                    userPreferences={userPreferences}
                    textVernacId="homeS1T3"
                    className="tw-z-10"
                    utmParameters={utmParameters}
                />
            </DefaultElementAnimation>

            <Link
                to="#energy-storage-solutions"
                className="tw-row-[9] tw-col-start-1"
            >
                <ChevronDoubleDownIcon className="tw-w-12 tw-h-12 lg-text-primary-500 tw-animate-bounce tw-z-10" />
            </Link>
        </div>
    );
}

function EnergyStorageSolutions({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div
            id="energy-storage-solutions"
            className={className}
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
    const {emblaRef, emblaApi, selectedIndex} = useEmlbaCarouselWithIndex({loop: true});

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
                                buttonLink: "/automotive-batteries.php",
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
            <div className="tw-flex tw-flex-col tw-bg-gradient-to-b tw-from-secondary-100-light tw-to-background-500-light dark:tw-from-secondary-100-dark dark:tw-to-background-500-dark tw-px-4 tw-pt-6 tw-rounded-lg">
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
                    />
                </DefaultImageAnimation>

                <DefaultImageAnimation className="tw-hidden lg:tw-block tw-w-full">
                    <FullWidthImage
                        relativePath="/livguard/home/4/1-desktop.jpg"
                    />
                </DefaultImageAnimation>
            </div>
        </div>
    );
}

export function TransformingLives({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={className}>
            <div className="lg-px-screen-edge lg-text-headline tw-text-center lg:tw-pr-[72px] xl:tw-pr-[120px]">
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
                        productImage: "/livguard/category/jodi/rural_jodi.png",
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
                        productImage: "/livguard/category/jodi/urban_jodi.png",
                        productName: `${getVernacularString("review2ProductName", userPreferences.language)}`,
                    },
                    {
                        name: `${getVernacularString("review3Name", userPreferences.language)}`,
                        rating: 5,
                        state: `${getVernacularString("review3State", userPreferences.language)}`,
                        message: `${getVernacularString("review3Message", userPreferences.language)}`,
                        productImage: "/livguard/inverter images/Livguard-LGS1100iPV_power-verter-Inverter-Front.png",
                        productName: `${getVernacularString("review3ProductName", userPreferences.language)}`,
                    },
                    {
                        name: `${getVernacularString("review4Name", userPreferences.language)}`,
                        rating: 4,
                        state: `${getVernacularString("review4State", userPreferences.language)}`,
                        message: `${getVernacularString("review4Message", userPreferences.language)}`,
                        productImage: "/livguard/category/jodi/urban_jodi.png",
                        productName: `${getVernacularString("review4ProductName", userPreferences.language)}`,
                    },
                ]}
            />
        </div>
    );
}

export function SolarSolutions({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-rows-[repeat(5,auto)] tw-grid-cols-1 lg:tw-grid-rows-[1fr_repeat(4,auto)_1fr] lg:tw-grid-cols-[minmax(0,4fr),minmax(0,3fr)] tw-gap-x-4 tw-gap-y-4 lg:tw-gap-y-8 lg-bg-secondary-100 tw-rounded-lg tw-justify-center tw-text-center tw-py-6">
                <h2 className="tw-row-start-1 tw-col-start-1 lg:tw-row-start-2 lg:tw-col-start-1 tw-px-6 lg-text-headline">
                    <div dangerouslySetInnerHTML={{__html: appendSpaceToString(getVernacularString("homeS7H1T1", userPreferences.language))}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS7H1T2", userPreferences.language)}} />
                </h2>

                <div className="tw-row-start-2 tw-col-start-1 lg:tw-row-start-3 lg:tw-col-start-1 tw-px-6 lg-text-body lg:tw-max-w-[35rem] lg:tw-place-self-center">
                    {getVernacularString("homeS7T2", userPreferences.language)}
                </div>

                <div className="tw-row-start-3 tw-col-start-1 lg:tw-row-start-4 lg:tw-col-start-1 tw-px-6 lg-text-title2">{getVernacularString("homeS7T3", userPreferences.language)}</div>

                <CarouselStyle2
                    userPreferences={userPreferences}
                    className="tw-row-start-4 tw-col-start-1 lg:tw-row-start-1 lg:tw-col-start-2 lg:tw-row-span-full lg:tw-px-8"
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

        <FAQSection faqs={faqs} userPreferences={userPreferences} className={className}/>
    );
}

export function DealerLocator({userPreferences, showCtaButton, className}: {userPreferences: UserPreferences; showCtaButton: boolean; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("[@media(max-width:1024px)]:lg-px-screen-edge", className)}>
            <div className="tw-relative lg-bg-secondary-100 tw-rounded-lg tw-h-[350px] tw-overflow-hidden lg:tw-h-full lg:tw-px-2">
                <div className="tw-flex tw-flex-col tw-absolute tw-m-auto tw-top-0 tw-left-0 tw-right-0 tw-bottom-0 tw-justify-center tw-items-center">
                    <div className="tw-absolute tw-inset-0">
                        <CoverImage
                            relativePath={userPreferences.theme == Theme.Dark ? "/livguard/home/10/1-dark.jpg" : "/livguard/home/10/1-light.jpg"}
                        />
                    </div>

                    <div className="tw-z-10 lg-text-headline tw-text-center">
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS10H1T1", userPreferences.language)}} />
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS10H1T2", userPreferences.language)}} />
                    </div>

                    <VerticalSpacer className="tw-h-1" />

                    <div className="tw-z-10 lg-text-title2">{getVernacularString("homeS10T2", userPreferences.language)}</div>

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
            <div className="tw-flex tw-flex-col lg-bg-secondary-100 tw-rounded-lg tw-text-center lg-px-screen-edge lg:tw-h-full lg:tw-justify-center lg:tw-items-center lg:tw-py-4">
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

export function PowerfulPurposePowerfulImpact({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge", className)}>
            <div className="tw-grid tw-grid-rows-[repeat(5,auto)] tw-grid-cols-1 lg:tw-grid-rows-[1fr_repeat(4,auto)_1fr] lg:tw-grid-cols-2 tw-gap-y-4 lg-bg-secondary-100 tw-px-4 lg:tw-pl-8 tw-py-4 tw-rounded-lg">
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

                <a
                    href="/csr-initiatives.php"
                    className="tw-row-start-5 tw-col-start-1 lg:tw-row-start-5 lg:tw-col-start-1 lg-cta-button tw-justify-self-center lg:tw-justify-self-start"
                >
                    {getVernacularString("homeS12T4", userPreferences.language)}
                </a>
            </div>
        </div>
    );
}

export function ContactUsCta({
    userPreferences,
    textVernacId,
    utmParameters,
    className,
}: {
    userPreferences: UserPreferences;
    textVernacId: string;
    utmParameters: {[searchParameter: string]: string};
    className?: string;
}) {
    const [isContactUsDialogOpen, setIsContactUsDialogOpen] = useState(false);

    function tryToOpenContactUsDialog() {
        setIsContactUsDialogOpen(true);
    }

    return (
        <div className={className}>
            <button
                type="button"
                className="lg-cta-button"
                onClick={tryToOpenContactUsDialog}
            >
                {getVernacularString(textVernacId, userPreferences.language)}
            </button>

            <ContactUsDialog
                userPreferences={userPreferences}
                isContactUsDialogOpen={isContactUsDialogOpen}
                setIsContactUsDialogOpen={setIsContactUsDialogOpen}
                utmParameters={utmParameters}
            />
        </div>
    );
}

export function ContactUsDialog({
    userPreferences,
    isContactUsDialogOpen,
    setIsContactUsDialogOpen,
    utmParameters,
}: {
    userPreferences: UserPreferences;
    isContactUsDialogOpen: boolean;
    setIsContactUsDialogOpen: React.Dispatch<boolean>;
    utmParameters: {[searchParameter: string]: string};
}) {
    // TODO: Understand why we cannot use action for this
    const fetcher = useFetcher();
    const [inputData, setInputData] = useState<{name: string; phoneNumber: string; emailId: string}>({name:"", phoneNumber:"", emailId:""});
    const [step, setStep] = useState(1);
    const leadId = generateUuid();

    useEffect(() => {
        if (fetcher.data == null) {
            return;
        }

        if (fetcher.data.error != null) {
            toast.error(fetcher.data.error);
            return;
        }

        if(fetcher.data.type == FormType.otpVerification){
            setStep(2);
        }

        if(fetcher.data.type == FormType.contactUsSubmission){
            setStep(3);
        }

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({event: "submit"});
    }, [fetcher.data]);

    function tryToCloseContactUsDialog() {
        setIsContactUsDialogOpen(false);
    }

    return (
        <>
            <LivguardDialog
                isDialogOpen={isContactUsDialogOpen && step == 1}
                tryToCloseDialog={tryToCloseContactUsDialog}
                title={getVernacularString("contactUsT1", userPreferences.language)}
            >
                <fetcher.Form
                    className="tw-w-full tw-flex tw-flex-col"
                    method="post"
                    action="/otp-verification"
                >
                    <div className="lg-text-body-bold lg-text-secondary-900 tw-pl-3">{getVernacularString("contactUsT2", userPreferences.language)}</div>

                    <VerticalSpacer className="tw-h-2" />

                    <input
                        type="text"
                        name="phoneNumber"
                        pattern={phoneNumberValidationPattern}
                        required
                        className="lg-text-input"
                        onChange={(e) => {
                            const newState = structuredClone(inputData);
                            newState.phoneNumber = e.target.value;
                            setInputData(newState);
                        }}
                    />

                    <VerticalSpacer className="tw-h-4" />

                    <div className="lg-text-body-bold lg-text-secondary-900 tw-pl-3">{getVernacularString("contactUsT3", userPreferences.language)}</div>

                    <VerticalSpacer className="tw-h-2" />

                    <input
                        type="text"
                        name="name"
                        required
                        className="lg-text-input"
                        onChange={(e) => {
                            const newState = structuredClone(inputData);
                            newState.name = e.target.value;
                            setInputData(newState);
                        }}
                    />

                    <VerticalSpacer className="tw-h-4" />

                    <div className="lg-text-body-bold lg-text-secondary-900 tw-pl-3">{getVernacularString("contactUsT4", userPreferences.language)}</div>

                    <VerticalSpacer className="tw-h-2" />

                    <input
                        type="text"
                        name="emailId"
                        className="lg-text-input"
                        pattern={emailIdValidationPattern}
                        required
                        onChange={(e) => {
                            const newState = structuredClone(inputData);
                            newState.emailId = e.target.value;
                            setInputData(newState);
                        }}
                    />

                    <VerticalSpacer className="tw-h-8" />

                    <div className="tw-self-center">
                        <FixedHeightImage
                            relativePath="/livguard/header/akshay.png"
                            height="13.75rem"
                        />
                    </div>

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
                        value={leadId}
                    />

                    <input
                        name="formType"
                        className="tw-hidden"
                        readOnly
                        value={FormType.contactUsSubmission}
                    />

                    <button
                        type="submit"
                        className="lg-cta-button tw-px-4 tw-self-center tw-w-60"
                        disabled={fetcher.state != "idle"}
                    >
                        {getVernacularString("contactUsT5", userPreferences.language)}
                    </button>
                </fetcher.Form>
            </LivguardDialog>

            <OtpVerificationDialog
                userPreferences={userPreferences}
                isDialogOpen={isContactUsDialogOpen && step == 2}
                setIsDialogOpen={tryToCloseContactUsDialog}
                inputData={inputData}
                fetcher={fetcher}
                utmParameters={utmParameters}
                leadId={leadId}
                formType={FormType.contactUsSubmission}
            />

            <FormSubmissionSuccessLivguardDialog
                userPreferences={userPreferences}
                isDialogOpen={isContactUsDialogOpen && step == 3}
                tryToCloseDialog={tryToCloseContactUsDialog}
            />
        </>
    );
}
