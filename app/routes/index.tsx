import {ChevronDoubleDownIcon, ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import type {LoaderFunction, V2_MetaFunction} from "@remix-run/node";
import {Link, useFetcher, useNavigate} from "@remix-run/react";
import React, {useContext, useEffect, useReducer, useRef, useState} from "react";
import {Facebook, Instagram, Linkedin, Twitter, Youtube} from "react-bootstrap-icons";
import {useInView} from "react-intersection-observer";
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
import {FindTheThiefDialog} from "~/components/find-the-thief/findTheThiefDialog";
import {FirstRewardDialogComponent} from "~/components/find-the-thief/firstRewardDialogComponent";
import {SecondClueDialogComponent} from "~/components/find-the-thief/secondClueDialogComponent";
import {Thief} from "~/components/find-the-thief/thiefComponent";
import {CoverImage} from "~/components/images/coverImage";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {InTheNewsCarousel} from "~/components/inTheNewsCarousel";
import {LeadersCarousel} from "~/components/leadersCarousel";
import LivguardDialog from "~/components/livguardDialog";
import {PageScaffold} from "~/components/pageScaffold";
import {FancySearchableSelect, SearchableSelect} from "~/components/scratchpad";
import {TestimonialsCarousel} from "~/components/testimonialsCarousel";
import {SecondaryNavigationControllerContext} from "~/contexts/secondaryNavigationControllerContext";
import {HiddenFormField} from "~/global-common-typescript/components/hiddenFormField";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {ImageCdnProvider, type Uuid} from "~/global-common-typescript/typeDefinitions";
import {concatenateNonNullStringsWithSpaces, generateUuid} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {emailIdValidationPattern, indianPhoneNumberValidationPattern} from "~/global-common-typescript/utilities/validationPatterns";
import {useEmblaCarouselWithIndex} from "~/hooks/useEmblaCarouselWithIndex";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {SecondaryNavigationController, useSecondaryNavigationController} from "~/hooks/useSecondaryNavigationController";
import {FormSubmissionSuccessLivguardDialog} from "~/routes/dealer-for-inverters-and-batteries";
import type {FormStateInputsAction} from "~/routes/lead-form.state";
import {FormStateInputsActionType, FormStateInputsReducer, createInitialFormState} from "~/routes/lead-form.state";
import {MiniPowerPlannerTeaser} from "~/routes/load-calculator";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {Dealer, UserPreferences} from "~/typeDefinitions";
import {FormType, Language, Theme} from "~/typeDefinitions";
import {appendSpaceToString, getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest, secondaryNavThreshold} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";
import {SocialMediaFeeds} from "./events/renewable-energy-india-expo";

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
                content: `${getAbsolutePathForRelativePath(getMetadataForImage("/livguard/home/home-og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null)}`,
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
                content: `${getAbsolutePathForRelativePath(getMetadataForImage("/livguard/home/home-og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null)}`,
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
                breadcrumbs={[{contentId: "cfab263f-0175-43fb-91e5-fccc64209d36", link: "#"}]}
                secondaryNavigationController={secondaryNavigationController}
            >
                <SecondaryNavigationControllerContext.Provider value={secondaryNavigationController}>
                    <HomePage
                        userPreferences={userPreferences}
                        utmParameters={utmSearchParameters}
                        pageUrl={pageUrl}
                        secondaryNavigationController={secondaryNavigationController}
                    />
                </SecondaryNavigationControllerContext.Provider>
            </PageScaffold>

            <StickyBottomBar userPreferences={userPreferences} />
        </>
    );
}

enum DialogType {
    initialDialog = 0,
    firstRewardDialog = 1,
    secondClueDialog = 2,
}

function HomePage({
    userPreferences,
    utmParameters,
    pageUrl,
    secondaryNavigationController,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
    pageUrl: string;
    secondaryNavigationController?: SecondaryNavigationController;
}) {
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState<DialogType | null>(null);
    const [currentThiefLocation, setCurrentThiefLocation] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const treasureHuntStep = localStorage.getItem("treasureHuntStep");

        switch (treasureHuntStep) {
            case "1": {
                setCurrentThiefLocation(0);
                break;
            }
            case "2": {
                setIsDialogOpen(true);
                setDialogType(DialogType.secondClueDialog);
                break;
            }
            case "3": {
                setIsDialogOpen(true);
                setDialogType(DialogType.secondClueDialog);
                break;
            }
        }

        const treasureHuntInitiatedListener = () => {
            setCurrentThiefLocation(0);
            return;
        };
        window.addEventListener("treasureHuntInitiated", treasureHuntInitiatedListener);

        return () => {
            window.removeEventListener("treasureHuntInitiated", treasureHuntInitiatedListener);
        };
    }, []);

    const [cookiesAccepted, setCookiesAccepted] = useState<string | null>(null);
    useEffect(() => {
        if (localStorage.getItem("cookiesAccepted") != null) {
            setCookiesAccepted(localStorage.getItem("cookiesAccepted"));
        }
        const cookieEventListener = () => {
            setTimeout(() => {
                setCookiesAccepted(localStorage.getItem("cookiesAccepted"));
            }, 1000);
        };
        window.addEventListener("cookiesAccepted", cookieEventListener);

        return () => {
            window.removeEventListener("cookiesAccepted", cookieEventListener);
        };
    }, []);

    return (
        <div className="tw-grid tw-grid-rows-1 tw-grid-cols-1 lg:tw-grid-rows-1 lg:tw-grid-cols-6 tw-gap-x-8 tw-align-stretch tw-gap-y-10 lg:tw-gap-y-0 tw-pb-10 lg:tw-pb-20">
            <HeroSection
                userPreferences={userPreferences}
                utmParameters={utmParameters}
                pageUrl={pageUrl}
                className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
            />

            <VerticalSpacer className="max-lg:tw-hidden tw-h-20 tw-row-start-3 tw-col-span-full" />

            {/* <EnergyStorageSolutions
                userPreferences={userPreferences}
                className="tw-row-start-2 tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
            /> */}

            <EnergySolutions
                userPreferences={userPreferences}
                className="tw-row-start-2 tw-col-start-1 lg:tw-row-start-4 lg:tw-col-start-1 lg:tw-col-span-3 lg:tw-pl-[72px] xl:tw-pl-[120px]"
            />

            <WeAreOneOfAKind
                userPreferences={userPreferences}
                className="tw-row-start-3 tw-col-start-1 lg:tw-row-start-4 lg:tw-col-start-4 lg:tw-col-span-3 lg:tw-pr-[72px] xl:tw-pr-[120px]"
            />

            <VerticalSpacer className="max-lg:tw-hidden tw-h-20 tw-row-start-5 tw-col-span-full" />

            <MiniPowerPlannerTeaserContainer
                userPreferences={userPreferences}
                className="tw-row-start-4 lg:tw-row-start-6 lg:tw-col-start-1 lg:tw-col-span-3 lg:tw-self-end lg:tw-pl-[40px] xl:tw-pl-[120px] tw-h-full"
                currentThiefLocation={currentThiefLocation}
                setCurrentThiefLocation={setCurrentThiefLocation}
                setDialogType={setDialogType}
                setIsDialogOpen={setIsDialogOpen}
            />

            <DealerLocator
                userPreferences={userPreferences}
                showCtaButton={true}
                className="tw-row-start-5 tw-col-start-1 lg:tw-row-start-6 lg:tw-col-start-4 lg:tw-col-span-3 lg:tw-self-end lg:tw-h-full lg:tw-pr-[72px] xl:tw-pr-[120px]"
                currentThiefLocation={currentThiefLocation}
                setCurrentThiefLocation={setCurrentThiefLocation}
                setDialogType={setDialogType}
                setIsDialogOpen={setIsDialogOpen}
            />

            {/* <ShowerSomeLoveOnSocialHandles
                userPreferences={userPreferences}
                heading={{text1: "homeS11H1T1", text2: "homeS11H1T2"}}
                className="tw-row-start-6 lg:tw-row-start-6 lg:tw-col-start-5 lg:tw-col-span-2 lg:tw-self-end lg:tw-pr-[40px] xl:tw-pr-[120px] lg:tw-h-full"
            /> */}

            <VerticalSpacer className="max-lg:tw-hidden tw-h-20 tw-row-start-7 tw-col-span-full" />

            <SocialMediaFeeds
                userPreferences={userPreferences}
                className="tw-row-start-8 tw-col-span-full"
            />

            <VerticalSpacer className="max-lg:tw-hidden tw-h-20 tw-row-start-9 tw-col-span-full" />

            <TransformingLives
                userPreferences={userPreferences}
                className="tw-row-start-10 lg:tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="max-lg:tw-hidden tw-h-20 tw-row-start-11 tw-col-span-full" />

            <FaqSection
                userPreferences={userPreferences}
                className="tw-row-start-12 lg:tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="max-lg:tw-hidden tw-h-20 tw-row-start-13 tw-col-span-full" />

            <InTheNewsSection
                userPreferences={userPreferences}
                className="tw-row-start-14 tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="max-lg:tw-hidden tw-h-20 tw-row-start-15 tw-col-span-full" />

            <PowerfulPurposePowerfulImpact
                userPreferences={userPreferences}
                className="tw-row-start-16 tw-col-start-1 lg:tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            {cookiesAccepted == null ? null : (
                <FindTheThiefDialog
                    isDialogOpen={isDialogOpen}
                    setIsDialogOpen={setIsDialogOpen}
                    userPreferences={userPreferences}
                    showSunraysPattern={dialogType == null ? false : [DialogType.firstRewardDialog, DialogType.secondClueDialog].includes(dialogType)}
                >
                    {/* {dialogType === DialogType.initialDialog && (
                        <InitialFindTheThiefDialogComponent
                            userPreferences={userPreferences}
                            buttonClickFunction={() => {
                                setIsDialogOpen(false);
                                localStorage.setItem("treasureHuntStep", "1");
                                setCurrentThiefLocation(0);
                            }}
                        />
                    )} */}
                    {dialogType === DialogType.firstRewardDialog && (
                        <FirstRewardDialogComponent
                            userPreferences={userPreferences}
                            buttonClickFunction={() => {
                                localStorage.setItem("treasureHuntStep", "2");
                                setDialogType(DialogType.secondClueDialog);
                            }}
                        />
                    )}
                    {dialogType === DialogType.secondClueDialog && (
                        <SecondClueDialogComponent
                            userPreferences={userPreferences}
                            buttonClickFunction={() => {
                                setIsDialogOpen(false);
                                localStorage.setItem("treasureHuntStep", "3");
                                navigate("/load-calculator");
                            }}
                        />
                    )}
                </FindTheThiefDialog>
            )}
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
    const {emblaRef, emblaApi, selectedIndex} = useEmblaCarouselWithIndex({loop: true}, 8000);

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

    const isScreenSizeBelow = useIsScreenSizeBelow(1024);
    return (
        // screen = 48px + 56px + ? + 32px + 56px + 32px + 90px
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-overflow-hidden tw-h-[calc(100vh-16.625rem-var(--lg-mobile-ui-height))] lg:tw-h-[calc(100vh-9rem)] lg:tw-min-h-[calc(100vw*7.5/16)] tw-relative",
                className,
            )}
            id="top"
            ref={emblaRef}
            // ref={emblaRef}
        >
            <div
                className="tw-w-full tw-h-full tw-grid tw-grid-flow-col tw-auto-cols-[100%] tw-items-stretch"
                ref={ref}
            >
                <ItemBuilder
                    items={[
                        {
                            mobileImageRelativePath: "/livguard/home/1/mobile-banner-2.jpg",
                            desktopImageRelativePath: "/livguard/home/1/desktop-banner2.jpg",
                            titleVernacId: "",
                            subTitleVernacId: "",
                            contactButtonVernacId: "8b6be5de-9c57-461a-8ec5-106f29eccaca",
                            buttonLink: "/events/renewable-energy-india-expo",
                        },
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
                            className="tw-h-full tw-overflow-hidden tw-grid tw-grid-rows-[1.5rem_3rem_minmax(0,1fr)_auto_1rem_auto_1rem_minmax(0,1fr)_auto_3rem] tw-justify-items-center tw-text-secondary-900-dark tw-grid-cols-1 tw-isolate"
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
                                        relativePath={isScreenSizeBelow ? item.mobileImageRelativePath : item.desktopImageRelativePath}
                                        className="tw-row-start-1 tw-col-start-1 tw-row-span-full"
                                        key={isScreenSizeBelow ? item.mobileImageRelativePath : item.desktopImageRelativePath}
                                    />
                                ))}

                            {item.titleVernacId && <div className="tw-row-1 tw-col-start-1 tw-row-span-full tw-w-full tw-h-full tw-bg-black tw-opacity-40" />}

                            {item.titleVernacId && item.subTitleVernacId && (
                                <h2 className="tw-row-start-4 tw-col-start-1 tw-flex tw-flex-col tw-gap-y-2 tw-z-10 tw-text-center lg-px-screen-edge">
                                    <DefaultTextAnimation>
                                        <div className={concatenateNonNullStringsWithSpaces("lg-text-banner", item.titleVernacId == "" ? "tw-visibility-hidden" : "")}>
                                            {appendSpaceToString(getVernacularString(item.titleVernacId, userPreferences.language))}
                                        </div>
                                    </DefaultTextAnimation>

                                    <DefaultTextAnimation>
                                        <div className="lg-text-title1">{getVernacularString(item.subTitleVernacId, userPreferences.language)}</div>
                                    </DefaultTextAnimation>
                                </h2>
                            )}

                            {item.contactButtonVernacId && item.buttonLink == null && (
                                <DefaultElementAnimation
                                    className={concatenateNonNullStringsWithSpaces(
                                        "tw-row-start-6 tw-col-start-1 tw-z-10 ",
                                        itemIndex == 1 ? "tw-relative max-lg:tw-top-[3rem] lg:max-xl:tw-top-2 max-sm:tw-top-0" : "",
                                    )}
                                >
                                    <ContactUsCta
                                        userPreferences={userPreferences}
                                        textVernacId={item.contactButtonVernacId}
                                        className="tw-z-10"
                                        utmParameters={utmParameters}
                                        pageUrl={pageUrl}
                                    />
                                </DefaultElementAnimation>
                            )}

                            {item.buttonLink != null && (
                                <DefaultElementAnimation className={concatenateNonNullStringsWithSpaces("tw-row-start-6 tw-col-start-1 tw-z-10")}>
                                    <Link
                                        className="lg-cta-button tw-z-10 tw-grid tw-place-items-center lg:tw-top-6 tw-top-20 max-sm:tw-top-14 md:tw-top-24 xl:tw-top-0 tw-relative tw-w-full"
                                        to={item.buttonLink}
                                    >
                                        {getVernacularString(item.contactButtonVernacId, userPreferences.language)}
                                    </Link>
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
            {/* <div className="tw-w-full tw-flex tw-flex-row tw-justify-between tw-items-center tw-absolute tw-top-0 tw-bottom-0 tw-right-0 tw-left-0 tw-px-6"> */}
            <button
                type="button"
                className="tw-h-fit tw-absolute tw-top-0 tw-bottom-0 tw-my-auto tw-left-4 tw-rounded-full tw-p-1 tw-border tw-border-solid tw-border-secondary-900-light lg-bg-secondary-300"
                onClick={() => {
                    emblaApi?.scrollPrev();
                }}
            >
                <ChevronLeftIcon className="tw-w-6 tw-h-6" />
            </button>

            <button
                type="button"
                className="tw-h-fit tw-absolute tw-top-0 tw-bottom-0 tw-my-auto tw-right-4 tw-rounded-full tw-p-1 tw-border tw-border-solid tw-border-secondary-900-light lg-bg-secondary-300"
                onClick={() => {
                    emblaApi?.scrollNext();
                }}
            >
                <ChevronRightIcon className="tw-w-6 tw-h-6" />
            </button>
            {/* </div> */}
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

    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "energy-solutions": {
                humanReadableName: getVernacularString("ee76a8f5-ba19-4a3e-ad60-67de3b59a6d2", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-grid tw-grid-rows-[auto,auto,minmax(0,1fr)] tw-grid-cols-1 lg:tw-grid-rows-[auto,minmax(0,1fr)] lg:tw-grid-cols-[auto,minmax(0,1fr)] tw-gap-x-4 tw-gap-y-6",
                className,
            )}
            id="energy-solutions"
            ref={sectionRef}
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
                            svgIcon: "/livguard/home/2/home-inverter.svg",
                            title: "homeS3Tab2H",
                        },
                        {
                            svgIcon: "/livguard/home/2/car-battery.svg",
                            title: "homeS3Tab3H",
                        },
                        {
                            svgIcon: "/livguard/home/2/car.svg",
                            title: "homeS3Tab1H",
                        },
                        {
                            svgIcon: "/livguard/home/2/home-solar-panel.svg",
                            title: "homeS3Tab4H",
                        },
                        {
                            svgIcon: "/livguard/home/2/home-other-accessories.svg",
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
                                    className={concatenateNonNullStringsWithSpaces("tw-w-6 tw-h-6 tw-brightness-0 tw-invert", itemIndex == selectedIndex ? "tw-scale-125" : "tw-opacity-50")}
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
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "one-of-a-kind": {
                humanReadableName: getVernacularString("ccf268de-2880-455f-9cc3-bdc066866b2c", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge", className)}
            id="one-of-a-kind"
            ref={sectionRef}
        >
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

function MiniPowerPlannerTeaserContainer({
    userPreferences,
    className,
    currentThiefLocation,
    setCurrentThiefLocation,
    setIsDialogOpen,
    setDialogType,
}: {
    userPreferences: UserPreferences;
    className?: string;
    currentThiefLocation: number | null;
    setCurrentThiefLocation: React.Dispatch<number | null>;
    setDialogType: React.Dispatch<DialogType>;
    setIsDialogOpen: React.Dispatch<boolean>;
}) {
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "power-planner": {
                humanReadableName: getVernacularString("02e2e193-5c13-4674-93cb-02d15e2b71da", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);

    return (
        <div
            id="power-planner"
            className={concatenateNonNullStringsWithSpaces("tw-relative", className)}
            ref={sectionRef}
        >
            <Thief
                currentThiefLocation={currentThiefLocation}
                thiefShowLocation={0}
                onClick={() => {
                    setCurrentThiefLocation(1);
                }}
                thiefClassName="max-lg:-tw-left-1 lg:-tw-right-[4.125rem] tw-top-[40%] lg:tw-top-[20%] lg:tw-z-10 -tw-z-10"
                direction="left"
            />

            {isScreenSizeBelow && (
                <>
                    <Thief
                        currentThiefLocation={currentThiefLocation}
                        thiefShowLocation={1}
                        onClick={() => {
                            setCurrentThiefLocation(null);
                            setDialogType(DialogType.firstRewardDialog);
                            setIsDialogOpen(true);
                        }}
                        thiefClassName="tw-top-[60%] -tw-right-1 lg:-tw-right-[0.5625rem]"
                        direction="right"
                    />
                    {/* <Thief
                        currentThiefLocation={currentThiefLocation}
                        thiefShowLocation={2}
                        onClick={() => {
                            setCurrentThiefLocation(3);
                            setDialogType(DialogType.firstRewardDialog);
                            setIsDialogOpen(true);
                        }}
                        thiefClassName="tw-top-[75%] -tw-left-1 lg:-tw-left-[0.5625rem]"
                        direction="left"
                    /> */}
                </>
            )}

            <MiniPowerPlannerTeaser
                userPreferences={userPreferences}
                className="tw-h-full tw-w-full"
            />
        </div>
    );
}

export function TransformingLives({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            testimonials: {
                humanReadableName: getVernacularString("ab5df361-c4a5-4f3a-b26e-21eff3cb23bc", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

    return (
        <div
            id="testimonials"
            ref={sectionRef}
            className={className}
        >
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
                snapDotsDivisionFactor={2}
                userPreferences={userPreferences}
                testimonials={[
                    {
                        video: (
                            <EmbeddedYoutubeVideo
                                id="c1Y5SuVDPi0"
                                style={{aspectRatio: "560/315"}}
                                className="tw-rounded-lg"
                            />
                        ),
                        name: `${getVernacularString("review1Name", userPreferences.language)}`,
                        rating: 5,
                        state: `${getVernacularString("review1State", userPreferences.language)}`,
                        message: `${getVernacularString("review1Message", userPreferences.language)}`,
                        productImage: "/livguard/products/peace-of-mind-combo/thumbnail.png",
                        // productName: `${getVernacularString("review1ProductName", userPreferences.language)}`,
                    },
                    {
                        video: (
                            <EmbeddedYoutubeVideo
                                id="pNHmKwg073g"
                                style={{aspectRatio: "560/315"}}
                                className="tw-rounded-lg"
                            />
                        ),
                        name: `${getVernacularString("review2Name", userPreferences.language)}`,
                        rating: 5,
                        state: `${getVernacularString("review2State", userPreferences.language)}`,
                        message: `${getVernacularString("review2Message", userPreferences.language)}`,
                        productImage: "/livguard/products/urban-combo/thumbnail.png",
                        // productName: `${getVernacularString("review2ProductName", userPreferences.language)}`,
                    },
                    {
                        video: (
                            <EmbeddedYoutubeVideo
                                id="RbRSzFRHkzo"
                                style={{aspectRatio: "560/315"}}
                                className="tw-rounded-lg"
                            />
                        ),
                        name: `${getVernacularString("review3Name", userPreferences.language)}`,
                        rating: 5,
                        state: `${getVernacularString("review3State", userPreferences.language)}`,
                        message: `${getVernacularString("review3Message", userPreferences.language)}`,
                        productImage: "/livguard/products/peace-of-mind-combo/thumbnail.png",
                        // productName: `${getVernacularString("review1ProductName", userPreferences.language)}`,
                    },
                    {
                        video: (
                            <EmbeddedYoutubeVideo
                                id="Oaj6OiYSlYQ"
                                style={{aspectRatio: "560/315"}}
                                className="tw-rounded-lg"
                            />
                        ),
                        name: `${getVernacularString("review4Name", userPreferences.language)}`,
                        rating: 5,
                        state: `${getVernacularString("review4State", userPreferences.language)}`,
                        message: `${getVernacularString("review4Message", userPreferences.language)}`,
                        productImage: "/livguard/products/urban-combo/thumbnail.png",
                        // productName: `${getVernacularString("review2ProductName", userPreferences.language)}`,
                    },
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
                                className="tw-rounded-lg"
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
                    {
                        video: (
                            <EmbeddedYoutubeVideo
                                id="rVC-ncTBhls"
                                style={{aspectRatio: "560/315"}}
                                className="tw-rounded-lg"
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
                                className="tw-rounded-lg"
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
        <div className={className}>
            <FaqSectionInternal
                faqs={faqs}
                userPreferences={userPreferences}
                className="tw-h-full tw-w-full"
            />
        </div>
    );
}

export function DealerLocator({
    userPreferences,
    showCtaButton,
    className,
    currentThiefLocation,
    setCurrentThiefLocation,
    setDialogType,
    setIsDialogOpen,
}: {
    userPreferences: UserPreferences;
    showCtaButton: boolean;
    className?: string;
    currentThiefLocation?: number | null;
    setCurrentThiefLocation?: React.Dispatch<number>;
    setDialogType?: React.Dispatch<DialogType>;
    setIsDialogOpen?: React.Dispatch<boolean>;
}) {
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
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);

    return (
        <div
            id="find-my-dealer"
            ref={sectionRef}
            className={concatenateNonNullStringsWithSpaces("[@media(max-width:1024px)]:lg-px-screen-edge tw-relative", className)}
        >
            {isScreenSizeBelow || currentThiefLocation == null || setCurrentThiefLocation == null
                ? null
                : setDialogType != null &&
                  setIsDialogOpen != null && (
                      <Thief
                          currentThiefLocation={currentThiefLocation}
                          thiefShowLocation={1}
                          onClick={() => {
                              setCurrentThiefLocation(2);
                              setDialogType(DialogType.firstRewardDialog);
                              setIsDialogOpen(true);
                          }}
                          thiefClassName="tw-bottom-4 -tw-left-1 lg:-tw-left-[4.125rem]"
                          direction="right"
                      />
                  )}
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
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "our-social-handles": {
                humanReadableName: getVernacularString("01553562-bafd-4ad3-a18c-7b6cc113f03f", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

    return (
        <div
            id="our-social-handles"
            ref={sectionRef}
            className={concatenateNonNullStringsWithSpaces("[@media(max-width:1024px)]:lg-px-screen-edge lg:tw-h-full", className)}
        >
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
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "in-the-news": {
                humanReadableName: getVernacularString("30174373-893d-4b43-82e5-30969f80385b", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

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
        <div
            id="in-the-news"
            ref={sectionRef}
            className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge tw-w-full tw-max-w-7xl tw-mx-auto", className)}
        >
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
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            csr: {
                humanReadableName: getVernacularString("3011d264-9e86-4df5-a284-154c88e54209", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            id="csr"
            ref={sectionRef}
            className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge tw-w-full tw-max-w-7xl tw-mx-auto", className)}
        >
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
    const cityFetcher = useFetcher();

    function tryToOpenContactUsDialog() {
        setIsContactUsDialogOpen(true);
    }

    const [cities, setCities] = useState(null);

    useEffect(() => {
        if (cityFetcher.data != null) {
            setCities(cityFetcher.data.cityList);
        }
    }, [cityFetcher.data]);

    return (
        <div className={className}>
            <button
                type="button"
                className={concatenateNonNullStringsWithSpaces("lg-cta-button", buttonClassName)}
                onClick={() => {
                    tryToOpenContactUsDialog();
                    cityFetcher.submit(null, {method: "get", action: "/get-city-of-dealers"});
                }}
            >
                {getVernacularString(textVernacId, userPreferences.language)}
            </button>

            <ContactUsDialog
                userPreferences={userPreferences}
                isContactUsDialogOpen={isContactUsDialogOpen}
                setIsContactUsDialogOpen={setIsContactUsDialogOpen}
                utmParameters={utmParameters}
                pageUrl={pageUrl}
                cityFetcherData={cities}
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
    cityFetcherData,
}: {
    userPreferences: UserPreferences;
    isContactUsDialogOpen: boolean;
    setIsContactUsDialogOpen: React.Dispatch<boolean>;
    utmParameters: {[searchParameter: string]: string};
    pageUrl: string;
    cityFetcherData: Array<{city: string}> | null;
}) {
    // TODO: Understand why we cannot use action for this
    const fetcher = useFetcher();
    const otpFetcher = useFetcher();
    const otpFieldRef = useRef(null);
    const phoneNumberRef = useRef(null);
    const leadId = useRef<Uuid>(generateUuid());
    const dealerFetcher = useFetcher();
    const [selectedCityIndex, setSelectedCityIndex] = useState<number | null>(null);
    const [selectedDealerIndex, setSelectedDealerIndex] = useState<number | null>(null);
    const [dealerList, setDealerList] = useState<Array<{name: string; code: string}>>([]);

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

    useEffect(() => {
        if (dealerFetcher.data != null) {
            setDealerList([]);
            dealerFetcher.data.dealerList.map((item: Dealer) => setDealerList((prev) => [...prev, {name: item.name, code: item.dealerCode}]));
        }
    }, [dealerFetcher.data]);

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
                        placeholder={getVernacularString("7ce2eaa7-4d46-4f80-80d2-b91b81085a49", userPreferences.language)}
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
                        placeholder={getVernacularString("29ca1701-2fb9-49ec-a4d6-3af793c194b1", userPreferences.language)}
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

                    <div className="lg-text-body-bold lg-text-secondary-900 tw-pl-3">{getVernacularString("5132b06f-9057-4e22-a21e-aca383247dda", userPreferences.language)}</div>

                    <VerticalSpacer className="tw-h-1" />

                    <SearchableSelect
                        items={
                            cityFetcherData == null
                                ? []
                                : cityFetcherData.map((city, cityIndex) => {
                                      return {
                                          city: city.city,
                                          index: cityIndex,
                                      };
                                  })
                        }
                        selectedItem={
                            cityFetcherData == null || selectedCityIndex == null
                                ? null
                                : {
                                      city: cityFetcherData[selectedCityIndex].city,
                                      index: selectedCityIndex,
                                  }
                        }
                        placeholder={getVernacularString("91cb41a5-571d-4516-91fb-fc5e67266990", userPreferences.language)}
                        setSelectedItem={(item: {city: string; index: number} | null) => {
                            if (item == null) {
                                return null;
                            }
                            setSelectedCityIndex(item.index);
                            const data = new FormData();
                            data.append("query", item.city);
                            dealerFetcher.submit(data, {method: "post", action: "/dealer-for-inverters-and-batteries"});
                            const action: FormStateInputsAction = {
                                actionType: FormStateInputsActionType.SetCity,
                                payload: item.city,
                            };
                            dispatch(action);
                            return {
                                city: item.city,
                            };
                        }}
                        filterFunction={(items: Array<{city: string; index: number}>, query: string) => items.filter((item) => item.city.toLowerCase().startsWith(query.toLowerCase()))}
                        renderFunction={(item: {city: string; index: number}) => {
                            if (item == null) {
                                return "";
                            }
                            return item.city;
                        }}
                        disabled={cityFetcherData == null}
                        inputClassName="disabled:tw-opacity-[0.6] disabled:!tw-bg-secondary-100-light disabled:dark:tw-opacity-1 disabled:dark:!tw-bg-secondary-300-dark disabled:dark:!tw-text-secondary-900-dark"
                    />

                    <VerticalSpacer className="tw-h-2" />

                    <div className="lg-text-body-bold lg-text-secondary-900 tw-pl-3">{getVernacularString("76bb0c30-c244-4815-b68d-a1780f8c697e", userPreferences.language)}</div>

                    <VerticalSpacer className="tw-h-1" />

                    <FancySearchableSelect
                        items={
                            dealerList == null
                                ? []
                                : dealerList.sort().map((dealer, dealerIndex) => {
                                      return {
                                          dealer: {
                                              name: dealer.name,
                                              code: dealer.code,
                                          },
                                          index: dealerIndex,
                                      };
                                  })
                        }
                        selectedItem={
                            dealerList == null || selectedDealerIndex == null
                                ? null
                                : {
                                      dealer: {
                                          name: dealerList[selectedDealerIndex].name,
                                          code: dealerList[selectedDealerIndex].code,
                                      },
                                      index: selectedDealerIndex,
                                  }
                        }
                        placeholder={getVernacularString("11eba4f7-13aa-45bd-93bd-31d98b72531a", userPreferences.language)}
                        setSelectedItem={(item: {dealer: {name: string; code: string}; index: number} | null) => {
                            if (item == null) {
                                return null;
                            }
                            setSelectedDealerIndex(item.index);
                            const action: FormStateInputsAction = {
                                actionType: FormStateInputsActionType.setDealer,
                                payload: item.dealer.code,
                            };
                            dispatch(action);
                            return {
                                dealer: item,
                            };
                        }}
                        filterFunction={(items: Array<{dealer: {name: string; code: string}; index: number}>, query: string) =>
                            items.filter((item) => item.dealer.name.toLowerCase().startsWith(query.toLowerCase()))
                        }
                        renderFunction={(item: {dealer: {name: string; code: string}; index: number}) => {
                            if (item == null) {
                                return "";
                            }
                            return item.dealer.name;
                        }}
                        disabled={cityFetcherData == null}
                        inputClassName="disabled:tw-opacity-[0.6] disabled:!tw-bg-secondary-100-light disabled:dark:tw-opacity-1 disabled:dark:!tw-bg-secondary-300-dark disabled:dark:!tw-text-secondary-900-dark"
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
                                placeholder={getVernacularString("10b102a7-4be9-4832-9240-f747cf81a855", userPreferences.language)}
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

                    <HiddenFormField
                        name="city"
                        value={cityFetcherData && selectedCityIndex != null ? cityFetcherData[selectedCityIndex].city : ""}
                    />

                    <HiddenFormField
                        name="dealer"
                        value={dealerList && selectedDealerIndex != null ? dealerList[selectedDealerIndex] : ""}
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
