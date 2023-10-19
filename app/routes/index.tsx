import {ChevronDoubleDownIcon, ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import type {LinksFunction, LoaderFunction, V2_MetaFunction} from "@remix-run/node";
import {Link, useFetcher, useNavigate} from "@remix-run/react";
import React, {useContext, useEffect, useReducer, useRef, useState} from "react";
import {Facebook, Instagram, Linkedin, Twitter, Whatsapp, Youtube} from "react-bootstrap-icons";
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
import {FullWidthImage} from "~/components/images/simpleFullWidthImage";
import {InTheNewsCarousel} from "~/components/inTheNewsCarousel";
import LivguardDialog from "~/components/livguardDialog";
import {PageScaffold} from "~/components/pageScaffold";
import {FancySearchableSelect, SearchableSelect} from "~/components/searchableSelects";
import {TestimonialsCarousel} from "~/components/testimonialsCarousel";
import {SecondaryNavigationControllerContext} from "~/contexts/secondaryNavigationControllerContext";
import {HiddenFormField} from "~/global-common-typescript/components/hiddenFormField";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {ImageCdnProvider, ImageMetadata, type Uuid} from "~/common--type-definitions/typeDefinitions";
import {concatenateNonNullStringsWithSpaces, generateUuid} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {emailIdValidationPattern, indianPhoneNumberValidationPattern} from "~/global-common-typescript/utilities/validationPatterns";
import {useEmblaCarouselWithIndex} from "~/hooks/useEmblaCarouselWithIndex";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {SecondaryNavigationController, useSecondaryNavigationController} from "~/hooks/useSecondaryNavigationController";
import type {FormStateInputsAction} from "~/routes/lead-form.state";
import {FormStateInputsActionType, FormStateInputsReducer, createInitialFormState} from "~/routes/lead-form.state";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {Dealer, UserPreferences} from "~/typeDefinitions";
import {FormType, Language} from "~/typeDefinitions";
import {appendSpaceToString, getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest, secondaryNavThreshold} from "~/utilities";
import {getContentGenerator} from "~/vernacularProvider";
import {SocialMediaFeeds} from "~/reusableSections/socialMediaFeeds";
import {getVernacularFromBackend} from "~/backend/vernacularProvider.server";
import {ContentProviderContext} from "~/contexts/contentProviderContext";
import {getImageMetadataLibraryFromBackend, getMetadataForImageServerSide} from "~/backend/imageMetaDataLibrary.server";
import {ImageProviderContext} from "~/contexts/imageMetaDataContext";
import {SimpleCoverImage} from "~/components/images/simpleCoverImage";
import {FormSubmissionSuccessLivguardDialog} from "~/reusableSections/formSubmissionSuccessLivguardDialog";
import {MiniPowerPlannerTeaser} from "~/reusableSections/miniPowerPlannerTeaser";
import {DealerLocator, DialogType} from "~/reusableSections/dealerLocator";
import {InitialFindTheThiefDialogComponent} from "~/components/find-the-thief/initialFindTheThiefDialogComponent";
import termsAndConditions from "~/routes/terms-and-conditions";

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
                content: loaderData.ogBanner,
            },
        ];
    } else {
        throw Error(`Undefined language ${userPreferences.language}`);
    }
};

export const links: LinksFunction = () => [
    {
        rel: "preload",
        as: "image",
        imageSrcSet: "https://intellsys-optimizer.b-cdn.net/livguard/home/second-banner/mob-banner-6904e4.jpg?quality=85&width=720 720w",
        imageSizes: "100vw",
    },
];

type LoaderData = {
    userPreferences: UserPreferences;
    redirectTo: string;
    pageUrl: string;
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

    const vernacularData = getVernacularFromBackend("homePage", userPreferences.language);
    const imageMetaDataLibrary = getImageMetadataLibraryFromBackend("homePage");
    const ogBanner = getAbsolutePathForRelativePath(getMetadataForImageServerSide("/livguard/home/home-og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null);

    const loaderData: LoaderData = {
        userPreferences: userPreferences,
        redirectTo: getRedirectToUrlFromRequest(request),
        pageUrl: getUrlFromRequest(request),
        vernacularData: vernacularData,
        imageMetaDataLibrary: imageMetaDataLibrary,
        ogBanner: ogBanner,
    };

    return loaderData;
};

export default function () {
    const {userPreferences, redirectTo, pageUrl, vernacularData, imageMetaDataLibrary} = useLoaderData() as LoaderData;

    const utmSearchParameters = useUtmSearchParameters();

    const secondaryNavigationController = useSecondaryNavigationController();
    const [isFindTheThiefDialogOpen, setIsFindTheThiefDialogOpen] = useState(false);

    useEffect(() => {
        // if (localStorage.getItem("cookiesAccepted") == null) {
        //     setIsFindTheThiefDialogOpen(false);
        //     return;
        // }

        const treasureHuntStep = localStorage.getItem("treasureHuntStep");
        if (treasureHuntStep == null || treasureHuntStep == "0") {
            setIsFindTheThiefDialogOpen(true);
        }
    }, []);

    // useEffect(() => {
    //     const treasureHuntStep = localStorage.getItem("treasureHuntStep");
    //     if (isCookieDialogOpen === false && localStorage.getItem("cookiesAccepted") != null && (treasureHuntStep == null || treasureHuntStep === "0")) {
    //         setTimeout(() => {
    //             setIsFindTheThiefDialogOpen(true);
    //         }, 1000);
    //     }
    // }, [isCookieDialogOpen]);

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
                        breadcrumbs={[{contentId: "cfab263f-0175-43fb-91e5-fccc64209d36", link: "#"}]}
                        secondaryNavigationController={secondaryNavigationController}
                    >
                        <SecondaryNavigationControllerContext.Provider value={secondaryNavigationController}>
                            <HomePage
                                userPreferences={userPreferences}
                                utmParameters={utmSearchParameters}
                                pageUrl={pageUrl}
                                secondaryNavigationController={secondaryNavigationController}
                                setIsFindTheThiefDialogOpen={setIsFindTheThiefDialogOpen}
                            />
                        </SecondaryNavigationControllerContext.Provider>
                    </PageScaffold>

                    <FindTheThiefDialog
                        isDialogOpen={isFindTheThiefDialogOpen}
                        setIsDialogOpen={setIsFindTheThiefDialogOpen}
                        userPreferences={userPreferences}
                        showSunraysPattern={false}
                    >
                        <InitialFindTheThiefDialogComponent
                            userPreferences={userPreferences}
                            buttonClickFunction={() => {
                                setIsFindTheThiefDialogOpen(false);
                                localStorage.setItem("treasureHuntStep", "1");
                                window.dispatchEvent(new Event("treasureHuntInitiated"));
                            }}
                        />
                    </FindTheThiefDialog>

                    <StickyBottomBar userPreferences={userPreferences} />
                </ContentProviderContext.Provider>
            </ImageProviderContext.Provider>
        </>
    );
}

function HomePage({
    userPreferences,
    utmParameters,
    pageUrl,
    secondaryNavigationController,
    setIsFindTheThiefDialogOpen,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
    pageUrl: string;
    secondaryNavigationController?: SecondaryNavigationController;
    setIsFindTheThiefDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
                setIsFindTheThiefDialogOpen={setIsFindTheThiefDialogOpen}
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
                secondaryNavigationName="bc9269a0-800f-4adf-ac22-d866887da9f4"
            />

            {/* <ShowerSomeLoveOnSocialHandles
                userPreferences={userPreferences}
                heading={{text1: "homeS11H1T1", text2: "homeS11H1T2"}}
                className="tw-row-start-6 lg:tw-row-start-6 lg:tw-col-start-5 lg:tw-col-span-2 lg:tw-self-end lg:tw-pr-[40px] xl:tw-pr-[120px] lg:tw-h-full"
            /> */}

            <VerticalSpacer className="max-lg:tw-hidden tw-h-20 tw-row-start-7 tw-col-span-full" />

            <SocialMediaFeedsSection
                userPreferences={userPreferences}
                className="tw-row-start-6 lg:tw-row-start-8 tw-col-span-full"
            />

            <VerticalSpacer className="max-lg:tw-hidden tw-h-20 tw-row-start-9 tw-col-span-full" />

            <TransformingLives
                userPreferences={userPreferences}
                className="tw-row-start-7 lg:tw-row-start-10 lg:tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="max-lg:tw-hidden tw-h-20 tw-row-start-11 tw-col-span-full" />

            <FaqSection
                userPreferences={userPreferences}
                className="tw-row-start-8 lg:tw-row-start-12 lg:tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="max-lg:tw-hidden tw-h-20 tw-row-start-13 tw-col-span-full" />

            <InTheNewsSection
                userPreferences={userPreferences}
                className="tw-row-start-9 lg:tw-row-start-14 tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="max-lg:tw-hidden tw-h-20 tw-row-start-15 tw-col-span-full" />

            <PowerfulPurposePowerfulImpact
                userPreferences={userPreferences}
                className="tw-row-start-10 tw-col-start-1 lg:tw-row-start-16 lg:tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
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
    setIsFindTheThiefDialogOpen,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
    className?: string;
    pageUrl: string;
    setIsFindTheThiefDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const contentData = useContext(ContentProviderContext);

    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();
    const {emblaRef, emblaApi, selectedIndex} = useEmblaCarouselWithIndex({loop: true}, 10000);
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);
    const [selectedBannerIndex, setSelectedBannerIndex] = useState(0);
    let treasureHuntStep: string | null = null;

    useEffect(() => {
        treasureHuntStep = localStorage.getItem("treasureHuntStep");
    }, []);
    const banners = [
        {
            mobileImageRelativePath: "/livguard/home/second-banner/mob-banner.jpg",
            desktopImageRelativePath: "/livguard/home/second-banner/desktop-banner.jpg",
            titleVernacId: "0f24d13c-8b25-4165-b0d4-197c059e4794",
            subTitleVernacId: "bb45dab0-a985-4bf8-9f07-845806b20b77",
            contactButtonVernacId: "ab1da9d6-1aaa-46d4-9b50-b911b3006b11",
            buttonLink: "https://api.whatsapp.com/send?phone=9599198444",
        },
        {
            mobileImageRelativePath: "/livguard/home/1/mobile-banner-3.jpg",
            desktopImageRelativePath: "/livguard/home/1/desktop-banner-3.jpg",
            titleVernacId: "13419db0-afcd-4c94-a571-35f6c62de3b4",
            subTitleVernacId: "a782b30b-13a2-48f1-90f5-0569dba18c1c",
            vernacId: "homeS12T4",
        },
        {
            mobileImageRelativePath: "/livguard/home/1/new-mobile.jpg",
            desktopImageRelativePath: "/livguard/home/1/new-desktop.jpg",
            titleVernacId: "homeS1T1",
            subTitleVernacId: "homeS1T2",
            contactButtonVernacId: "homeS1T3",
        },
    ];
    return (
        // screen = 48px + 56px + ? + 32px + 56px + 32px + 90px
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-overflow-hidden max-[380px]:tw-h-[calc(100vh-10rem-var(--lg-mobile-ui-height))] tw-h-[calc(100vh-16.625rem-var(--lg-mobile-ui-height))] lg:tw-h-[calc(100vh-9rem)] lg:tw-min-h-[calc(100vw*7.5/16)] tw-relative",
                className,
            )}
            // ref={emblaRef}
        >
            <div
                className="tw-w-full tw-h-full tw-grid tw-grid-flow-col tw-auto-cols-[100%] tw-items-stretch tw-z-20"
                ref={ref}
            >
                <div
                    // tw-grid-rows-[3rem_minmax(0,1fr)_auto_minmax(0,1fr)_3rem]
                    className={concatenateNonNullStringsWithSpaces(
                        selectedBannerIndex === 0
                            ? "tw-h-full tw-overflow-hidden tw-grid lg:tw-grid-rows-[0.5rem_1rem_minmax(0,1fr)_auto_1rem_auto_1rem_minmax(0,1fr)_auto_3rem] tw-grid-rows-[1rem_2rem_1rem_auto_1rem_auto_1rem_minmax(0,1fr)_auto_3rem] tw-justify-items-center tw-text-secondary-900-dark tw-grid-cols-1 tw-isolate"
                            : selectedBannerIndex === 2
                            ? "tw-h-full tw-overflow-hidden tw-grid lg:tw-grid-rows-[1.5rem_3rem_minmax(0,1fr)_auto_1rem_auto_1rem_minmax(0,1fr)_auto_3rem] tw-grid-rows-[1.5rem_3rem_minmax(0,1fr)_auto_1rem_auto_5rem_minmax(0,1fr)_auto_3rem] tw-justify-items-center tw-text-secondary-900-dark tw-grid-cols-1 tw-isolate"
                            : "tw-h-full tw-overflow-hidden tw-grid tw-grid-rows-[1.5rem_3rem_minmax(0,1fr)_auto_1rem_auto_1rem_minmax(0,1fr)_auto_3rem] tw-justify-items-center tw-text-secondary-900-dark tw-grid-cols-1 tw-isolate",
                    )}
                    key={selectedBannerIndex}
                >
                    {/* {item.englishDesktopImageRelativePath &&
                                item.englishMobileImageRelativePath &&B
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

                    {/* <SimpleCoverImage
                        relativePath={isScreenSizeBelow ? banners[selectedBannerIndex].mobileImageRelativePath : banners[selectedBannerIndex].desktopImageRelativePath}
                        className="tw-row-start-1 tw-col-start-1 tw-row-span-full"
                        key={isScreenSizeBelow ? banners[selectedBannerIndex].mobileImageRelativePath : banners[selectedBannerIndex].desktopImageRelativePath}
                        loading={selectedBannerIndex == 0 ? "eager" : "lazy"}
                    /> */}

                    <picture className="tw-row-start-1 tw-col-start-1 tw-row-span-full tw-w-full tw-h-full">
                        {/* <source
                            srcSet={`${getAbsolutePathForRelativePath(getMetadataForImage(banners[selectedBannerIndex].mobileImageRelativePath).finalUrl, ImageCdnProvider.Bunny, 480, null)}`}
                            media="(max-width: 480px)"
                        /> */}
                        <source
                            srcSet={`${getAbsolutePathForRelativePath(getMetadataForImage(banners[selectedBannerIndex].mobileImageRelativePath).finalUrl, ImageCdnProvider.Bunny, 720, null)}`}
                            media="(max-width: 720px)"
                        />
                        <source
                            srcSet={`${getAbsolutePathForRelativePath(getMetadataForImage(banners[selectedBannerIndex].desktopImageRelativePath).finalUrl, ImageCdnProvider.Bunny, 1080, null)}`}
                            media="(min-width: 1080px)"
                        />
                        <source
                            srcSet={`${getAbsolutePathForRelativePath(getMetadataForImage(banners[selectedBannerIndex].desktopImageRelativePath).finalUrl, ImageCdnProvider.Bunny, 1366, null)}`}
                            media="(min-width: 1366px)"
                        />
                        <source
                            srcSet={`${getAbsolutePathForRelativePath(getMetadataForImage(banners[selectedBannerIndex].desktopImageRelativePath).finalUrl, ImageCdnProvider.Bunny, 1920, null)}`}
                            media="(min-width: 1920px)"
                        />
                        <source
                            srcSet={`${getAbsolutePathForRelativePath(getMetadataForImage(banners[selectedBannerIndex].desktopImageRelativePath).finalUrl, ImageCdnProvider.Bunny, 2560, null)}`}
                            media="(min-width: 2560px)"
                        />
                        <source
                            srcSet={`${getAbsolutePathForRelativePath(getMetadataForImage(banners[selectedBannerIndex].desktopImageRelativePath).finalUrl, ImageCdnProvider.Bunny, 3840, null)}`}
                            media="(min-width: 3840px)"
                        />
                        <img
                            src={`${getAbsolutePathForRelativePath(getMetadataForImage(banners[selectedBannerIndex].mobileImageRelativePath).finalUrl, ImageCdnProvider.Bunny, 1920, null)}`}
                            key={isScreenSizeBelow ? banners[selectedBannerIndex].mobileImageRelativePath : banners[selectedBannerIndex].desktopImageRelativePath}
                            className="tw-object-cover tw-w-full tw-h-full"
                        />
                    </picture>

                    {/* <img
                        // src={getAbsolutePathForRelativePath(getMetadataForImage(isScreenSizeBelow ? banners[selectedBannerIndex].mobileImageRelativePath : banners[selectedBannerIndex].desktopImageRelativePath), ImageCdnProvider.Bunny, null, null)}
                        srcSet={
                            selectedBannerIndex === 0
                                ? "https://intellsys-optimizer.b-cdn.net/livguard/home/second-banner/mob-banner-6904e4.jpg?quality=85&width=480 480w, https://intellsys-optimizer.b-cdn.net/livguard/home/second-banner/mob-banner-6904e4.jpg?quality=85&width=720 720w, https://intellsys-optimizer.b-cdn.net/livguard/home/second-banner/desktop-banner-abc407.jpg?quality=85&width=1280 1280w, https://intellsys-optimizer.b-cdn.net/livguard/home/second-banner/desktop-banner-abc407.jpg?quality=85&width=1366 1366w, https://intellsys-optimizer.b-cdn.net/livguard/home/second-banner/desktop-banner-abc407.jpg?quality=85&width=1920 1920w, https://intellsys-optimizer.b-cdn.net/livguard/home/second-banner/desktop-banner-abc407.jpg?quality=85&width=2560 2560w, https://intellsys-optimizer.b-cdn.net/livguard/home/second-banner/desktop-banner-abc407.jpg?quality=85&width=3840 3840w"
                                : selectedBannerIndex === 1
                                ? "https://intellsys-optimizer.b-cdn.net/livguard/home/1/mobile-banner-3-d4bec5.jpg?quality=85&width=480 480w, https://intellsys-optimizer.b-cdn.net/livguard/home/1/mobile-banner-3-d4bec5.jpg?quality=85&width=720 720w, https://intellsys-optimizer.b-cdn.net/livguard/home/1/desktop-banner-3-2ec540.jpg?quality=85&width=1280 1280w, https://intellsys-optimizer.b-cdn.net/livguard/home/1/desktop-banner-3-2ec540.jpg?quality=85&width=1366 1366w, https://intellsys-optimizer.b-cdn.net/livguard/home/1/desktop-banner-3-2ec540.jpg?quality=85&width=1920 1920w, https://intellsys-optimizer.b-cdn.net/livguard/home/1/desktop-banner-3-2ec540.jpg?quality=85&width=2560 2560w, https://intellsys-optimizer.b-cdn.net/livguard/home/1/desktop-banner-3-2ec540.jpg?quality=85&width=3840 3840w"
                                : "https://intellsys-optimizer.b-cdn.net/livguard/home/1/new-mobile-72612f.jpg?quality=85&width=480 480w, https://intellsys-optimizer.b-cdn.net/livguard/home/1/new-mobile-72612f.jpg?quality=85&width=720 720w, https://intellsys-optimizer.b-cdn.net/livguard/home/1/new-desktop-ffc115.jpg?quality=85&width=1280 1280w, https://intellsys-optimizer.b-cdn.net/livguard/home/1/new-desktop-ffc115.jpg?quality=85&width=1366 1366w, https://intellsys-optimizer.b-cdn.net/livguard/home/1/new-desktop-ffc115.jpg?quality=85&width=1920 1920w, https://intellsys-optimizer.b-cdn.net/livguard/home/1/new-desktop-ffc115.jpg?quality=85&width=2560 2560w, https://intellsys-optimizer.b-cdn.net/livguard/home/1/new-desktop-ffc115.jpg?quality=85&width=3840 3840w"
                        }
                        sizes="100vw"
                        className="tw-row-start-1 tw-col-start-1 tw-row-span-full tw-object-cover tw-w-full tw-h-full"
                        key={isScreenSizeBelow ? banners[selectedBannerIndex].mobileImageRelativePath : banners[selectedBannerIndex].desktopImageRelativePath}
                    /> */}

                    {/* {banners[selectedBannerIndex].titleVernacId && (
                        <div
                            className={concatenateNonNullStringsWithSpaces(
                                selectedBannerIndex === 0
                                    ? "max-lg:tw-row-1 max-lg:tw-col-start-1 max-lg:tw-row-span-7 max-lg:tw-w-full max-lg:tw-h-full max-lg:tw-bg-black max-lg:tw-opacity-40"
                                    : "tw-row-1 tw-col-start-1 tw-row-span-full tw-w-full tw-h-full tw-bg-black tw-opacity-40",
                            )}
                        />
                    )} */}

                    {banners[selectedBannerIndex].titleVernacId && banners[selectedBannerIndex].subTitleVernacId && (
                        <h2
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-row-start-4 tw-col-start-1 tw-flex tw-flex-col tw-gap-y-2 tw-z-10 tw-text-center lg-px-screen-edge max-[380px]:tw-px-[1rem]",
                                // itemIndex === 1 ? "tw-row-start-4 tw-col-start-1 tw-flex tw-flex-col tw-gap-y-2 tw-z-10 tw-text-center lg-px-screen-edge" : "",
                            )}
                        >
                            <DefaultTextAnimation>
                                <div
                                    className={concatenateNonNullStringsWithSpaces("lg-text-banner", banners[selectedBannerIndex].titleVernacId == "" ? "tw-visibility-hidden" : "")}
                                    dangerouslySetInnerHTML={{__html: appendSpaceToString(contentData.getContent(banners[selectedBannerIndex].titleVernacId))}}
                                ></div>
                            </DefaultTextAnimation>

                            <DefaultTextAnimation>
                                <div
                                    className="lg-text-title1"
                                    dangerouslySetInnerHTML={{__html: contentData.getContent(banners[selectedBannerIndex].subTitleVernacId)}}
                                ></div>
                            </DefaultTextAnimation>
                        </h2>
                    )}

                    {selectedBannerIndex === 1 && treasureHuntStep != null && treasureHuntStep === "0" && (
                        <div
                            className="lg-cta-button tw-w-fit tw-row-start-6 tw-col-start-1 tw-z-10 "
                            onClick={() => setIsFindTheThiefDialogOpen(true)}
                        >
                            {contentData.getContent("homeS12T4")}
                        </div>
                    )}

                    {banners[selectedBannerIndex].contactButtonVernacId && banners[selectedBannerIndex].buttonLink == null && (
                        <DefaultElementAnimation
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-row-start-6 tw-col-start-1 tw-z-10 ",
                                // itemIndex == 1 ? "tw-relative max-lg:tw-top-[3rem] lg:max-xl:tw-top-2 max-sm:tw-top-0" : "",
                            )}
                        >
                            <ContactUsCta
                                userPreferences={userPreferences}
                                textVernacId={banners[selectedBannerIndex].contactButtonVernacId}
                                className="tw-z-10"
                                utmParameters={utmParameters}
                                pageUrl={pageUrl}
                            />
                        </DefaultElementAnimation>
                    )}

                    {banners[selectedBannerIndex].buttonLink != null && (
                        <DefaultElementAnimation className={concatenateNonNullStringsWithSpaces("tw-row-start-6 tw-col-start-1 tw-z-10")}>
                            <Link
                                className="tw-rounded-full tw-bg-[#3AC340] tw-pr-4 tw-z-10 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-2 tw-place-items-center"
                                to={banners[selectedBannerIndex].buttonLink}
                            >
                                <span className="tw-bg-[#40D421] tw-rounded-full tw-p-2">
                                    <Whatsapp className="tw-h-6 tw-w-6" />
                                </span>
                                {contentData.getContent(banners[selectedBannerIndex].contactButtonVernacId)}
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
                {/* <ItemBuilder
                    items={[
                        {
                            mobileImageRelativePath: "/livguard/home/second-banner/mob-banner.jpg",
                            desktopImageRelativePath: "/livguard/home/second-banner/desktop-banner.jpg",
                            titleVernacId: "0f24d13c-8b25-4165-b0d4-197c059e4794",
                            subTitleVernacId: "bb45dab0-a985-4bf8-9f07-845806b20b77",
                            contactButtonVernacId: "ab1da9d6-1aaa-46d4-9b50-b911b3006b11",
                            buttonLink: "https://api.whatsapp.com/send?phone=9599198444",
                        },
                        {
                            mobileImageRelativePath: "/livguard/home/1/mobile-banner-3.jpg",
                            desktopImageRelativePath: "/livguard/home/1/desktop-banner-3.jpg",
                            titleVernacId: "13419db0-afcd-4c94-a571-35f6c62de3b4",
                            subTitleVernacId: "a782b30b-13a2-48f1-90f5-0569dba18c1c",
                            contactButtonVernacId: "",
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
                            className={concatenateNonNullStringsWithSpaces(
                                itemIndex === 0
                                    ? "tw-h-full tw-overflow-hidden tw-grid lg:tw-grid-rows-[0.5rem_1rem_minmax(0,1fr)_auto_1rem_auto_1rem_minmax(0,1fr)_auto_3rem] tw-grid-rows-[1rem_2rem_1rem_auto_1rem_auto_1rem_minmax(0,1fr)_auto_3rem] tw-justify-items-center tw-text-secondary-900-dark tw-grid-cols-1 tw-isolate"
                                    : itemIndex === 2
                                    ? "tw-h-full tw-overflow-hidden tw-grid lg:tw-grid-rows-[1.5rem_3rem_minmax(0,1fr)_auto_1rem_auto_1rem_minmax(0,1fr)_auto_3rem] tw-grid-rows-[1.5rem_3rem_minmax(0,1fr)_auto_1rem_auto_5rem_minmax(0,1fr)_auto_3rem] tw-justify-items-center tw-text-secondary-900-dark tw-grid-cols-1 tw-isolate"
                                    : "tw-h-full tw-overflow-hidden tw-grid tw-grid-rows-[1.5rem_3rem_minmax(0,1fr)_auto_1rem_auto_1rem_minmax(0,1fr)_auto_3rem] tw-justify-items-center tw-text-secondary-900-dark tw-grid-cols-1 tw-isolate",
                            )}
                            key={itemIndex}
                        >
                            {/* {item.englishDesktopImageRelativePath &&
                                item.englishMobileImageRelativePath &&B
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

                {/* <SimpleCoverImage
                                relativePath={isScreenSizeBelow ? item.mobileImageRelativePath : item.desktopImageRelativePath}
                                className="tw-row-start-1 tw-col-start-1 tw-row-span-full"
                                key={isScreenSizeBelow ? item.mobileImageRelativePath : item.desktopImageRelativePath}
                                loading={itemIndex == 0 ? "eager" : "lazy"}
                            />

                            {item.titleVernacId && (
                                <div
                                    className={concatenateNonNullStringsWithSpaces(
                                        itemIndex === 2 ? "tw-row-1 tw-col-start-1 tw-row-span-full tw-w-full tw-h-full tw-bg-black tw-opacity-40" : undefined,
                                    )}
                                />
                            )}

                            {item.titleVernacId && item.subTitleVernacId && (
                                <h2
                                    className={concatenateNonNullStringsWithSpaces(
                                        "tw-row-start-4 tw-col-start-1 tw-flex tw-flex-col tw-gap-y-2 tw-z-10 tw-text-center lg-px-screen-edge max-[380px]:tw-px-[1rem]",
                                        // itemIndex === 1 ? "tw-row-start-4 tw-col-start-1 tw-flex tw-flex-col tw-gap-y-2 tw-z-10 tw-text-center lg-px-screen-edge" : "",
                                    )}
                                >
                                    <DefaultTextAnimation>
                                        <div
                                            className={concatenateNonNullStringsWithSpaces("lg-text-banner", item.titleVernacId == "" ? "tw-visibility-hidden" : "")}
                                            dangerouslySetInnerHTML={{__html: appendSpaceToString(contentData.getContent(item.titleVernacId))}}
                                        ></div>
                                    </DefaultTextAnimation>

                                    <DefaultTextAnimation>
                                        <div
                                            className="lg-text-title1"
                                            dangerouslySetInnerHTML={{__html: contentData.getContent(item.subTitleVernacId)}}
                                        ></div>
                                    </DefaultTextAnimation>
                                </h2>
                            )}

                            {item.contactButtonVernacId && item.buttonLink == null && (
                                <DefaultElementAnimation
                                    className={concatenateNonNullStringsWithSpaces(
                                        "tw-row-start-6 tw-col-start-1 tw-z-10 ",
                                        // itemIndex == 1 ? "tw-relative max-lg:tw-top-[3rem] lg:max-xl:tw-top-2 max-sm:tw-top-0" : "",
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
                                        className="tw-rounded-full tw-bg-[#3AC340] tw-pr-4 tw-z-10 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-2 tw-place-items-center"
                                        to={item.buttonLink}
                                    >
                                        <span className="tw-bg-[#40D421] tw-rounded-full tw-p-2">
                                            <Whatsapp className="tw-h-6 tw-w-6" />
                                        </span>
                                        {contentData.getContent(item.contactButtonVernacId)}
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
                    )} */}
                {/* /> */}
            </div>
            {/* <div className="tw-w-full tw-flex tw-flex-row tw-justify-between tw-items-center tw-absolute tw-top-0 tw-bottom-0 tw-right-0 tw-left-0 tw-px-6"> */}
            <button
                type="button"
                className="tw-h-fit tw-absolute tw-top-0 tw-bottom-0 tw-my-auto tw-left-4 tw-rounded-full tw-p-1 tw-border tw-border-solid tw-border-secondary-900-light lg-bg-secondary-300"
                onClick={() => {
                    // emblaApi?.scrollPrev();
                    setSelectedBannerIndex(selectedBannerIndex - 1 < 0 ? banners.length - 1 : selectedBannerIndex - 1);
                }}
            >
                <ChevronLeftIcon className="tw-w-6 tw-h-6" />
            </button>

            <button
                type="button"
                className="tw-h-fit tw-absolute tw-top-0 tw-bottom-0 tw-my-auto tw-right-4 tw-rounded-full tw-p-1 tw-border tw-border-solid tw-border-secondary-900-light lg-bg-secondary-300"
                onClick={() => {
                    // emblaApi?.scrollNext();
                    setSelectedBannerIndex(selectedBannerIndex + 1 > banners.length - 1 ? 0 : selectedBannerIndex + 1);
                }}
            >
                <ChevronRightIcon className="tw-w-6 tw-h-6" />
            </button>
            {/* </div> */}
        </div>
    );
}

function EnergyStorageSolutions({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div
            id="energy-storage-solutions"
            className={concatenateNonNullStringsWithSpaces("tw-w-full tw-max-w-7xl tw-mx-auto", className)}
        >
            <h1 className="tw-flex tw-flex-col tw-items-center lg-text-headline">
                <DefaultTextAnimation>
                    <div className="lg-text-highlighted">{appendSpaceToString(contentData.getContent("homeS2T1"))}</div>
                </DefaultTextAnimation>
                <DefaultTextAnimation>
                    <div>{contentData.getContent("homeS2T2")}</div>
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
    const contentData = useContext(ContentProviderContext);
    const {emblaRef, emblaApi, selectedIndex} = useEmblaCarouselWithIndex({loop: true});

    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "product-range": {
                humanReadableName: contentData.getContent("ee76a8f5-ba19-4a3e-ad60-67de3b59a6d2"),
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
            id="product-range"
            ref={sectionRef}
        >
            <h2 className="lg-px-screen-edge lg-text-headline tw-text-center tw-row-start-1 tw-col-start-1 tw-col-span-full lg:tw-row-start-1 lg:tw-col-start-2">
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: appendSpaceToString(contentData.getContent("homeS3H1T1"))}} />
                </DefaultTextAnimation>
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent("homeS3H1T2")}} />
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

                            <div className="lg-text-icon tw-text-center">{`${contentData.getContent(item.title)}`}</div>
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
                                headingContent1: `${contentData.getContent("homeS3Tab2HC1")}`,
                                headingContent2: `${contentData.getContent("homeS3Tab2HC2")}`,
                                content: `${contentData.getContent("homeS3Tab2C")}`,
                                buttontext: `${contentData.getContent("homeS3Tab2BT")}`,
                                buttonLink: "/inverter-for-home",
                                target: null,
                            },
                            {
                                image: "/livguard/home/3/3.jpg",
                                headingContent1: `${contentData.getContent("homeS3Tab3HC1")}`,
                                headingContent2: `${contentData.getContent("homeS3Tab3HC2")}`,
                                content: `${contentData.getContent("homeS3Tab3C")}`,
                                buttontext: `${contentData.getContent("homeS3Tab3BT")}`,
                                buttonLink: "/inverter-batteries",
                                target: null,
                            },
                            {
                                image: "/livguard/home/3/1.jpg",
                                headingContent1: `${contentData.getContent("homeS3Tab1HC1")}`,
                                headingContent2: `${contentData.getContent("homeS3Tab1HC2")}`,
                                content: `${contentData.getContent("homeS3Tab1C")}`,
                                buttontext: `${contentData.getContent("homeS3Tab1BT")}`,
                                buttonLink: "/battery-finder",
                                target: "_blank",
                            },
                            {
                                image: "/livguard/home/3/4.jpg",
                                headingContent1: `${contentData.getContent("homeS3Tab4HC1")}`,
                                headingContent2: `${contentData.getContent("homeS3Tab4HC2")}`,
                                content: `${contentData.getContent("homeS3Tab4C")}`,
                                buttontext: `${contentData.getContent("homeS3Tab4BT")}`,
                                buttonLink: "https://www.livguardsolar.com/",
                                target: "_blank",
                            },
                            {
                                image: "/livguard/home/3/5.jpg",
                                headingContent1: `${contentData.getContent("homeS3Tab5HC1")}`,
                                headingContent2: `${contentData.getContent("homeS3Tab5HC2")}`,
                                content: `${contentData.getContent("homeS3Tab5C")}`,
                                buttontext: `${contentData.getContent("homeS3Tab5BT")}`,
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
    const contentData = useContext(ContentProviderContext);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "why-livguard": {
                humanReadableName: contentData.getContent("ccf268de-2880-455f-9cc3-bdc066866b2c"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

    const isScreenSizeBelow = useIsScreenSizeBelow(1024);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge", className)}
            id="why-livguard"
            ref={sectionRef}
        >
            <div className="tw-flex tw-flex-col lg-card tw-px-4 tw-py-6 tw-rounded-lg">
                <VerticalSpacer className="tw-h-4" />

                <DefaultTextAnimation>
                    <div className="tw-flex tw-flex-col lg-text-headline tw-text-center">
                        <div dangerouslySetInnerHTML={{__html: contentData.getContent("homeS4H1T1")}} />
                        <div dangerouslySetInnerHTML={{__html: contentData.getContent("homeS4H1T2")}} />

                        {/* <div>{contentData.getContent("homeS5H1T2")}</div> */}
                    </div>
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-6" />

                <DefaultTextAnimation>
                    <div className="lg-text-title2 tw-text-center">{contentData.getContent("homeS4T2")}</div>
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-6" />

                <DefaultTextAnimation>
                    <div className="lg-text-body tw-text-center">{contentData.getContent("homeS4T3")}</div>
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-6" />

                <DefaultImageAnimation className="tw-w-full">
                    <FullWidthImage
                        relativePath={isScreenSizeBelow ? "/livguard/home/4/1-mobile.jpg" : "/livguard/home/4/1-desktop.jpg"}
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
    const contentData = useContext(ContentProviderContext);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "power-planner": {
                humanReadableName: contentData.getContent("02e2e193-5c13-4674-93cb-02d15e2b71da"),
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
    const contentData = useContext(ContentProviderContext);
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
            id="testimonials"
            ref={sectionRef}
            className={className}
        >
            <div className="lg-px-screen-edge lg-text-headline tw-text-center">
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent("homeS6H1T1")}} />
                </DefaultTextAnimation>
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent("homeS6H1T2")}} />
                </DefaultTextAnimation>
            </div>

            <VerticalSpacer className="tw-h-8" />

            <TestimonialsCarousel
                // snapDotsDivisionFactor={2}
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
                        name: `${contentData.getContent("review1Name")}`,
                        rating: 5,
                        state: `${contentData.getContent("review1State")}`,
                        message: `${contentData.getContent("review1Message")}`,
                        productImage: "/livguard/products/peace-of-mind-combo/thumbnail.png",
                        // productName: `${contentData.getContent("review1ProductName")}`,
                    },
                    {
                        video: (
                            <EmbeddedYoutubeVideo
                                id="pNHmKwg073g"
                                style={{aspectRatio: "560/315"}}
                                className="tw-rounded-lg"
                            />
                        ),
                        name: `${contentData.getContent("review2Name")}`,
                        rating: 5,
                        // state: `${contentData.getContent("review2State")}`,
                        state: ``,
                        message: `${contentData.getContent("review2Message")}`,
                        productImage: "/livguard/products/urban-combo/thumbnail.png",
                        // productName: `${contentData.getContent("review2ProductName")}`,
                    },
                    {
                        video: (
                            <EmbeddedYoutubeVideo
                                id="RbRSzFRHkzo"
                                style={{aspectRatio: "560/315"}}
                                className="tw-rounded-lg"
                            />
                        ),
                        name: `${contentData.getContent("review3Name")}`,
                        rating: 5,
                        // state: `${contentData.getContent("review3State")}`,
                        state: ``,
                        message: `${contentData.getContent("review3Message")}`,
                        productImage: "/livguard/products/peace-of-mind-combo/thumbnail.png",
                        // productName: `${contentData.getContent("review1ProductName")}`,
                    },
                    {
                        video: (
                            <EmbeddedYoutubeVideo
                                id="Oaj6OiYSlYQ"
                                style={{aspectRatio: "560/315"}}
                                className="tw-rounded-lg"
                            />
                        ),
                        name: `${contentData.getContent("review4Name")}`,
                        rating: 5,
                        state: `${contentData.getContent("review4State")}`,
                        message: `${contentData.getContent("review4Message")}`,
                        productImage: "/livguard/products/urban-combo/thumbnail.png",
                        // productName: `${contentData.getContent("review2ProductName")}`,
                    },
                    // {
                    //     video: (
                    //         <EmbeddedYoutubeVideo
                    //             id="rVC-ncTBhls"
                    //             style={{aspectRatio: "560/315"}}
                    //         />
                    //     ),
                    //     name: `${contentData.getContent("review1Name")}`,
                    //     rating: 5,
                    //     state: `${contentData.getContent("review1State")}`,
                    //     message: `${contentData.getContent("review1Message")}`,
                    //     productImage: "/livguard/products/peace-of-mind-combo/thumbnail.png",
                    //     productName: `${contentData.getContent("review1ProductName")}`,
                    // },
                    // {
                    //     video: (
                    //         <EmbeddedYoutubeVideo
                    //             id="pNMTMVDWtiU"
                    //             style={{aspectRatio: "560/315"}}
                    //             className="tw-rounded-lg"
                    //         />
                    //     ),
                    //     name: `${contentData.getContent("review2Name")}`,
                    //     rating: 5,
                    //     state: `${contentData.getContent("review2State")}`,
                    //     message: `${contentData.getContent("review2Message")}`,
                    //     productImage: "/livguard/products/urban-combo/thumbnail.png",
                    //     productName: `${contentData.getContent("review2ProductName")}`,
                    // },
                    // {
                    //     name: `${contentData.getContent("review3Name")}`,
                    //     rating: 5,
                    //     state: `${contentData.getContent("review3State")}`,
                    //     message: `${contentData.getContent("review3Message")}`,
                    //     productImage: "/livguard/products/lgs1100i/thumbnail.png",
                    //     productName: `${contentData.getContent("review3ProductName")}`,
                    // },
                    // {
                    //     name: `${contentData.getContent("review4Name")}`,
                    //     rating: 4,
                    //     state: `${contentData.getContent("review4State")}`,
                    //     message: `${contentData.getContent("review4Message")}`,
                    //     productImage: "/livguard/products/urban-combo/thumbnail.png",
                    //     productName: `${contentData.getContent("review4ProductName")}`,
                    // },
                    // {
                    //     video: (
                    //         <EmbeddedYoutubeVideo
                    //             id="rVC-ncTBhls"
                    //             style={{aspectRatio: "560/315"}}
                    //             className="tw-rounded-lg"
                    //         />
                    //     ),
                    //     name: `${contentData.getContent("review1Name")}`,
                    //     rating: 5,
                    //     state: `${contentData.getContent("review1State")}`,
                    //     message: `${contentData.getContent("review1Message")}`,
                    //     productImage: "/livguard/products/peace-of-mind-combo/thumbnail.png",
                    //     productName: `${contentData.getContent("review1ProductName")}`,
                    // },
                    // {
                    //     video: (
                    //         <EmbeddedYoutubeVideo
                    //             id="pNMTMVDWtiU"
                    //             style={{aspectRatio: "560/315"}}
                    //             className="tw-rounded-lg"
                    //         />
                    //     ),
                    //     name: `${contentData.getContent("review2Name")}`,
                    //     rating: 5,
                    //     state: `${contentData.getContent("review2State")}`,
                    //     message: `${contentData.getContent("review2Message")}`,
                    //     productImage: "/livguard/products/urban-combo/thumbnail.png",
                    //     productName: `${contentData.getContent("review2ProductName")}`,
                    // },
                    // {
                    //     name: `${contentData.getContent("review3Name")}`,
                    //     rating: 5,
                    //     state: `${contentData.getContent("review3State")}`,
                    //     message: `${contentData.getContent("review3Message")}`,
                    //     productImage: "/livguard/products/lgs1100i/thumbnail.png",
                    //     productName: `${contentData.getContent("review3ProductName")}`,
                    // },
                    // {
                    //     name: `${contentData.getContent("review4Name")}`,
                    //     rating: 4,
                    //     state: `${contentData.getContent("review4State")}`,
                    //     message: `${contentData.getContent("review4Message")}`,
                    //     productImage: "/livguard/products/urban-combo/thumbnail.png",
                    //     productName: `${contentData.getContent("review4ProductName")}`,
                    // },
                ]}
            />
        </div>
    );
}

export function SolarSolutions({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge-2 tw-w-full tw-max-w-7xl tw-mx-auto", className)}>
            <div className="tw-grid tw-grid-rows-[repeat(5,auto)] tw-grid-cols-1 lg:tw-grid-rows-[1fr_repeat(4,auto)_1fr] lg:tw-grid-cols-[minmax(0,4fr),minmax(0,3fr)] tw-gap-x-4 tw-gap-y-4 lg:tw-gap-y-8 lg-bg-secondary-100 tw-rounded-lg tw-justify-center tw-text-center tw-py-6">
                <h2 className="tw-row-start-1 tw-col-start-1 lg:tw-row-start-2 lg:tw-col-start-1 tw-px-6 lg-text-headline">
                    <div dangerouslySetInnerHTML={{__html: appendSpaceToString(contentData.getContent("homeS7H1T1"))}} />
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent("homeS7H1T2")}} />
                </h2>

                <div className="tw-row-start-2 tw-col-start-1 lg:tw-row-start-3 lg:tw-col-start-1 tw-px-6 lg-text-body lg:tw-max-w-[35rem] lg:tw-place-self-center">
                    {contentData.getContent("homeS7T2")}
                </div>

                <div className="tw-row-start-3 tw-col-start-1 lg:tw-row-start-4 lg:tw-col-start-1 tw-px-6 lg-text-title2">{contentData.getContent("homeS7T3")}</div>

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
                        {contentData.getContent("homeS7T4")}
                    </a>
                </div>
            </div>
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

export function ShowerSomeLoveOnSocialHandles({userPreferences, heading, className}: {userPreferences: UserPreferences; heading: {text1: string; text2: string}; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "social-feed": {
                humanReadableName: contentData.getContent("01553562-bafd-4ad3-a18c-7b6cc113f03f"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

    return (
        <div
            id="social-feed"
            ref={sectionRef}
            className={concatenateNonNullStringsWithSpaces("[@media(max-width:1024px)]:lg-px-screen-edge lg:tw-h-full", className)}
        >
            <div className="tw-flex tw-flex-col lg-card tw-text-center lg-px-screen-edge lg:tw-h-full lg:tw-justify-center lg:tw-items-center lg:tw-py-4">
                <VerticalSpacer className="tw-h-4" />

                <h2 className="[@media(max-width:1024px)]:lg-text-headline lg:lg-text-title2">
                    <div dangerouslySetInnerHTML={{__html: appendSpaceToString(contentData.getContent(heading.text1))}} />
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent(heading.text2)}} />
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

                <div className="lg-text-body">{contentData.getContent("homeS11T2")}</div>

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
    const contentData = useContext(ContentProviderContext);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "in-the-news": {
                humanReadableName: contentData.getContent("30174373-893d-4b43-82e5-30969f80385b"),
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
                <div dangerouslySetInnerHTML={{__html: contentData.getContent("79c83c5f-5a33-4b6b-9b5f-789ee5d140a8")}} />
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
    const contentData = useContext(ContentProviderContext);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            csr: {
                humanReadableName: contentData.getContent("3011d264-9e86-4df5-a284-154c88e54209"),
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
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent("homeS12H1T1")}} />
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent("homeS12H1T2")}} />
                </div>

                <div className="tw-row-start-2 tw-col-start-1 lg:tw-row-start-3 lg:tw-col-start-1 lg-text-body lg:tw-pr-[60px]">{contentData.getContent("homeS12T2")}</div>

                <ul className="tw-row-start-3 tw-col-start-1 lg:tw-row-start-4 lg:tw-col-start-1 tw-list-disc tw-ml-5 lg:tw-pr-[60px]">
                    <li>
                        <div className="lg-text-body">{contentData.getContent("homeS12T3P1")}</div>
                    </li>
                    <li>
                        <div className="lg-text-body">{contentData.getContent("homeS12T3P2")}</div>
                    </li>
                    <li>
                        <div className="lg-text-body">{contentData.getContent("homeS12T3P3")}</div>
                    </li>
                    <li>
                        <div className="lg-text-body">{contentData.getContent("homeS12T3P4")}</div>
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
                    {contentData.getContent("homeS12T4")}
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
    const contentData = useContext(ContentProviderContext);
    const [isContactUsDialogOpen, setIsContactUsDialogOpen] = useState(false);
    // const cityFetcher = useFetcher();

    function tryToOpenContactUsDialog() {
        setIsContactUsDialogOpen(true);
    }

    // const [cities, setCities] = useState(null);

    // useEffect(() => {
    //     if (cityFetcher.data != null) {
    //         setCities(cityFetcher.data.cityList);
    //     }
    // }, [cityFetcher.data]);

    return (
        <div className={className}>
            <button
                type="button"
                className={concatenateNonNullStringsWithSpaces("lg-cta-button", buttonClassName)}
                onClick={() => {
                    tryToOpenContactUsDialog();
                    // cityFetcher.submit(null, {method: "get", action: "/get-city-of-dealers"});
                }}
            >
                {contentData.getContent(textVernacId)}
            </button>

            <ContactUsDialog
                userPreferences={userPreferences}
                isContactUsDialogOpen={isContactUsDialogOpen}
                setIsContactUsDialogOpen={setIsContactUsDialogOpen}
                utmParameters={utmParameters}
                pageUrl={pageUrl}
                // cityFetcherData={cities}
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
    const contentData = useContext(ContentProviderContext);
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
                const action: FormStateInputsAction = {
                    actionType: FormStateInputsActionType.SetResendTimeOut,
                    payload: formStateInputs.resendTimeOut - 1,
                };
                dispatch(action);
            }, 1000);
            setTimeoutId(timeout);
        }
    }, [formStateInputs.resendTimeOut]);

    // useEffect(() => {
    //     if (dealerFetcher.data != null) {
    //         setDealerList([]);
    //         dealerFetcher.data.dealerList.map((item: Dealer) => setDealerList((prev) => [...prev, {name: item.name, code: item.dealerCode}]));
    //     }
    // }, [dealerFetcher.data]);

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
                title={contentData.getContent("contactUsT1")}
                showCloseIcon={true}
            >
                <fetcher.Form
                    className="tw-w-full tw-flex tw-flex-col"
                    method="post"
                    action="/lead-form-submission"
                >
                    <div className="lg-text-body-bold lg-text-secondary-900 tw-pl-3">{contentData.getContent("contactUsT3")}</div>

                    <VerticalSpacer className="tw-h-1" />

                    <input
                        type="text"
                        name="name"
                        required
                        className="lg-text-input"
                        placeholder={contentData.getContent("7ce2eaa7-4d46-4f80-80d2-b91b81085a49")}
                        onChange={(e) => {
                            const action: FormStateInputsAction = {
                                actionType: FormStateInputsActionType.SetName,
                                payload: e.target.value,
                            };
                            dispatch(action);
                        }}
                    />

                    <VerticalSpacer className="tw-h-2" />

                    <div className="lg-text-body-bold lg-text-secondary-900 tw-pl-3">{contentData.getContent("contactUsT4")}</div>

                    <VerticalSpacer className="tw-h-1" />

                    <input
                        type="text"
                        name="emailId"
                        placeholder={contentData.getContent("29ca1701-2fb9-49ec-a4d6-3af793c194b1")}
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

                    {/* <div className="lg-text-body-bold lg-text-secondary-900 tw-pl-3">{contentData.getContent("5132b06f-9057-4e22-a21e-aca383247dda")}</div>

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
                        placeholder={contentData.getContent("91cb41a5-571d-4516-91fb-fc5e67266990")}
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

                    <div className="lg-text-body-bold lg-text-secondary-900 tw-pl-3">{contentData.getContent("76bb0c30-c244-4815-b68d-a1780f8c697e")}</div>

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
                        placeholder={contentData.getContent("11eba4f7-13aa-45bd-93bd-31d98b72531a")}
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
                    /> */}

                    <VerticalSpacer className="tw-h-2" />

                    {!formStateInputs.showOtpField ? (
                        <div className="lg-text-body-bold lg-text-secondary-900 tw-pl-3">{contentData.getContent("contactUsT2")}</div>
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
                                {contentData.getContent("phoneNumberChnage")}
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
                                placeholder={contentData.getContent("10b102a7-4be9-4832-9240-f747cf81a855")}
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
                                {contentData.getContent("OfferFormGetOTP")}
                            </div>
                        </div>
                    ) : (
                        <div
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-flex tw-flex-col tw-w-full",
                                formStateInputs.showOtpField ? "tw-opacity-100 tw-duration-100 tw-z-10" : "tw-opacity-0 -tw-z-100",
                            )}
                        >
                            {/* <div className="lg-text-body-bold lg-text-secondary-900 tw-pl-3">{contentData.getContent("contactUsOTPT3")}</div>

                            <VerticalSpacer className="tw-h-1" /> */}

                            <div className="tw-relative">
                                <input
                                    type="text"
                                    name="otpSubmitted"
                                    className="lg-text-input"
                                    required
                                    placeholder={contentData.getContent("contactUsOTPT3E")}
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
                                    <div className="lg-text-primary-500 tw-absolute lg-text-icon tw-right-2 tw-top-0 tw-bottom-0 tw-pt-[18px]">{contentData.getContent("OfferInvalidOTP")}</div>
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
                            {contentData.getContent("OfferResendOTP")}
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

                    {/* <HiddenFormField
                        name="city"
                        value={cityFetcherData && selectedCityIndex != null ? cityFetcherData[selectedCityIndex].city : ""}
                    />

                    <HiddenFormField
                        name="dealer"
                        value={dealerList && selectedDealerIndex != null ? dealerList[selectedDealerIndex] : ""}
                    /> */}

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

                        <div dangerouslySetInnerHTML={{__html: contentData.getContent("termsAndConditionsCheckboxtext")}} />
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
                        {contentData.getContent("contactUsT5")}
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

export function SocialMediaFeedsSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});

    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "social-media": {
                humanReadableName: contentData.getContent("34faf8f5-f199-4cb7-be52-dc46737415e6"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

    const [loadEmbeds, setLoadEmbeds] = useState(false);
    useEffect(() => {
        if (sectionInView == true && loadEmbeds == false) {
            setLoadEmbeds(true);
        }
    }, [sectionInView]);

    return (
        <div
            className={className}
            id="social-media"
            ref={sectionRef}
        >
            {loadEmbeds == false ? null : <SocialMediaFeeds userPreferences={userPreferences} />}
        </div>
    );
}
