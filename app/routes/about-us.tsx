import type {LoaderFunction, V2_MetaFunction} from "@remix-run/node";
import {Link, useLoaderData} from "@remix-run/react";
import {Marquee} from "dynamic-marquee-react";
import {useContext, useEffect, useState} from "react";
import {useInView} from "react-intersection-observer";
import {useResizeDetector} from "react-resize-detector";
import {CarouselStyle7} from "~/components/carouselStyle7";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {PageScaffold} from "~/components/pageScaffold";
import {SecondaryNavigation} from "~/components/secondaryNavigation";
import {SecondaryNavigationControllerContext} from "~/contexts/secondaryNavigationControllerContext";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {ImageCdnProvider} from "~/common--type-definitions/typeDefinitions";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {SecondaryNavigationController, useSecondaryNavigationController} from "~/hooks/useSecondaryNavigationController";
import {DealerLocator} from "~/routes";
import {OurPresence} from "~/routes/contact-us";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {UserPreferences} from "~/typeDefinitions";
import {Language} from "~/typeDefinitions";
import {appendSpaceToString, getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest, secondaryNavThreshold} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";

export const meta: V2_MetaFunction = ({data: loaderData}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = loaderData.userPreferences;
    if (userPreferences.language == Language.English) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/about-us",
            },
            {
                title: "Get to Know Livguard - Your Trusted Energy and Power Solutions Provider",
            },
            {
                name: "description",
                content:
                    "Livguard is a leading brand in the power backup and home appliances industry, committed to providing innovative and reliable solutions to satisfy the diverse needs of customers.",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/about-us",
            },
            {
                property: "og:title",
                content: "Get to Know Livguard - Your Trusted Energy and Power Solutions Provider",
            },
            {
                property: "og:description",
                content:
                    "Livguard is a leading brand in the power backup and home appliances industry, committed to providing innovative and reliable solutions to satisfy the diverse needs of customers.",
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
                content: `${getAbsolutePathForRelativePath(getMetadataForImage("/livguard/about-us/about-us-og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null)}`,
            },
            {
                "script:ld+json": {
                    "@type": "SiteNavigationElement",
                    name: "Contact us",
                    url: "https://www.livguard.com/contact-us",
                    telephone: "+91 92056-67999",
                    contactType: "",
                    streetAddress: "SAR Group Plot No. 221, Udyog Vihar Phase 1, Sector 20",
                    addressLocality: "Gurugram",
                    addressRegion: "Haryana",
                    postalCode: "122016",
                    addressCountry: "India",
                    "E-mail": "marketing@livguard.com, export@sar-group.com",
                },
            },
        ];
    } else if (userPreferences.language == Language.Hindi) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/about-us",
            },
            {
                title: "लिवगार्ड: आपकी ऊर्जा और पावर समस्याओं का विश्वसनीय समाधान",
            },
            {
                name: "description",
                content:
                    "लिवगार्ड ऊर्जा संगठन और घरेलू उपकरण उद्योग में एक अग्रणी ब्रांड है, जो ग्राहकों की विभिन्न आवश्यकताओं को पूरा करने के लिए नवाचारी और विश्वसनीय समाधान प्रदान करने के प्रतिबद्ध है।",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/about-us",
            },
            {
                property: "og:title",
                content: "लिवगार्ड: आपकी ऊर्जा और पावर समस्याओं का विश्वसनीय समाधान",
            },
            {
                property: "og:description",
                content:
                    "लिवगार्ड ऊर्जा संगठन और घरेलू उपकरण उद्योग में एक अग्रणी ब्रांड है, जो ग्राहकों की विभिन्न आवश्यकताओं को पूरा करने के लिए नवाचारी और विश्वसनीय समाधान प्रदान करने के प्रतिबद्ध है।",
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
                content: `${getAbsolutePathForRelativePath(getMetadataForImage("/livguard/about-us/about-us-og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null)}`,
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

export default () => {
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
                    {contentId: "849dabf7-0fa6-47e6-a1f8-e4f544306f7c", link: "/"},
                    {contentId: "6d164881-cc49-4447-8460-d6fa6cf7a14f", link: "#"},
                ]}
                secondaryNavigationController={secondaryNavigationController}
            >
                <SecondaryNavigationControllerContext.Provider value={secondaryNavigationController}>
                    <AboutUsPage
                        userPreferences={userPreferences}
                        utmParameters={utmSearchParameters}
                        pageUrl={pageUrl}
                        secondaryNavigationController={secondaryNavigationController}
                    />
                </SecondaryNavigationControllerContext.Provider>
            </PageScaffold>
        </>
    );
};

function AboutUsPage({
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
    return (
        <>
            <div className="">
                <HeroSection
                    userPreferences={userPreferences}
                    utmParameters={utmParameters}
                    pageUrl={pageUrl}
                    className=""
                />
                <VerticalSpacer className="tw-h-10" />

                <WhoWeAre
                    userPreferences={userPreferences}
                    className="  tw-w-full tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

                <MeetOurLeaders
                    userPreferences={userPreferences}
                    className="tw-w-full tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

                <OurOperations
                    userPreferences={userPreferences}
                    className="tw-w-full tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 " />

                <div className="tw-grid lg:tw-grid-cols-[minmax(0,3fr)_minmax(0,2fr)] tw-col-span-full tw-gap-x-5 tw-w-full lg-px-screen-edge-2 tw-max-w-7xl tw-mx-auto">
                    <OurValues
                        userPreferences={userPreferences}
                        className="tw-row-start-1 lg:tw-col-start-1"
                    />

                    <VerticalSpacer className="tw-h-10 tw-row-start-2 lg:tw-col-start-1 lg:tw-hidden" />

                    <Everywhere
                        userPreferences={userPreferences}
                        className="tw-row-start-3 lg:tw-row-start-1 lg:tw-col-start-2 lg:tw-h-full"
                    />
                </div>

                <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

                {/* Remember to change tw-row-start numbers when uncommenting */}
                {/* <ExploreCareers
                    userPreferences={userPreferences}
                    className="lg:lg-pl-screen-edge-2 lg:lg-pr-screen-edge-2 tw-row-start-11 lg:tw-col-span-full tw-w-full tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-12 tw-col-start-1 lg:tw-col-span-full" /> */}

                <div className="tw-row-start-11 tw-col-start-1 lg:tw-col-span-full tw-w-full tw-max-w-7xl tw-mx-auto lg-px-screen-edge-2">
                    <EmpoweredBySAR
                        userPreferences={userPreferences}
                        className="tw-w-full"
                    />
                </div>

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-12 tw-col-start-1 lg:tw-col-span-full" />
            </div>
        </>
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
    // const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);
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
                "tw-aspect-square lg:tw-aspect-[1280/380] tw-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] tw-grid tw-grid-rows-[3rem_auto_minmax(0,1fr)] tw-text-center lg:tw-text-left tw-relative tw-isolate",
                className,
            )}
            id="top"
            ref={sectionRef}
        >
            <div className="tw-row-start-1 tw-col-start-1 lg:tw-col-start-2 tw-row-span-full lg:tw-col-span-full tw-isolate tw-z-[-10]">
                {isScreenSizeBelow == null ? null : (
                    <FullWidthImage
                        relativePath={isScreenSizeBelow ? "/livguard/about-us/1/mobile-banner.jpg" : "/livguard/about-us/1/desktop-banner.jpg"}
                        key={isScreenSizeBelow ? "/livguard/about-us/1/mobile-banner.jpg" : "/livguard/about-us/1/desktop-banner.jpg"}
                    />
                )}
            </div>

            <div className="lg:lg-about-us-banner-text-gradient tw-grid tw-grid-flow-row tw-row-start-2 tw-col-start-1 lg:tw-py-3">
                <DefaultTextAnimation className=" tw-row-start-2 tw-col-start-1 tw-place-self-start lg-px-screen-edge-2 tw-justify-self-center lg:tw-justify-self-start tw-grid tw-grid-flow-row">
                    <div
                        dangerouslySetInnerHTML={{__html: getVernacularString("b38f6ec8-1c38-44ef-b016-93da7ed7bf19", userPreferences.language)}}
                        className="tw-row-start-1 lg-text-banner tw-text-secondary-900-dark tw-place-self-center tw-self-center tw-text-center lg:tw-text-left tw-max-w-[31rem]"
                    />
                </DefaultTextAnimation>
                <DefaultTextAnimation className="tw-row-start-3 tw-col-start-1 tw-place-self-start lg-px-screen-edge-2 tw-justify-self-center lg:tw-justify-self-start tw-grid tw-grid-flow-row">
                    <div
                        dangerouslySetInnerHTML={{__html: getVernacularString("ca68e2b9-8aba-4002-adbf-d9c40945027d", userPreferences.language)}}
                        className="tw-row-start-2 lg-text-banner tw-text-secondary-900-dark tw-place-self-center tw-self-center tw-text-center lg:tw-text-left tw-max-w-[31rem]"
                    />
                </DefaultTextAnimation>
            </div>
        </div>
    );
}

function WhoWeAre({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    function WhoWeAreCard({iconUrl, title, description}: {iconUrl: string; title: string; description: string}) {
        return (
            <div className="tw-grid tw-grid-rows-[auto_minmax(0,1fr)] tw-border-[3px] lg-card ">
                {/* <div className="lg-card tw-bg-new-background-border-500-light dark:tw-bg-new-background-border-500-dark tw-rounded-t-lg tw-row-start-1 tw-grid tw-items-center tw-justify-items-center tw-p-4"> */}
                    <div className="tw-w-full tw-h-full tw-rounded-md tw-place-self-center tw-grid tw-place-content-center tw-py-6 lg-card tw-border-none">
                        <img
                            src={iconUrl}
                            className="tw-invert dark:tw-invert-0 lg:tw-h-[6.25rem] lg:tw-w-[6.25rem]"
                        />
                    </div>
                {/* </div> */}
                <div className="tw-row-start-2 lg:tw-py-4 tw-pt-2 tw-pb-6 tw-px-6 ">
                    <DefaultTextAnimation className="tw-row-start-4 lg-text-title2 tw-text-center">{title}</DefaultTextAnimation>
                    <DefaultTextAnimation className="tw-row-start-6 lg-text-body tw-text-center">{description}</DefaultTextAnimation>
                </div>
            </div>
        );
    }
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "who-we-are": {
                humanReadableName: getVernacularString("1048c716-f3d1-4740-90b8-99e7d1e3b80d", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    const whoWeAreCardsContent = [
        {
            iconUrl: `${getAbsolutePathForRelativePath(getMetadataForImage("/livguard/about-us/2/our-mission.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}`,
            title: getVernacularString("8a35dff2-079c-4638-a96a-8100d04a72b6", userPreferences.language),
            description: getVernacularString("4e49216b-9457-488a-860e-3fb97ba34100", userPreferences.language),
        },
        {
            iconUrl: "https://files.growthjockey.com/livguard/icons/about-us/2/our-vision.svg",
            title: getVernacularString("68b1762f-e31f-4110-bf87-3afc487d7edf", userPreferences.language),
            description: getVernacularString("373fedff-da89-4396-b215-ed4099abfcf9", userPreferences.language),
        },
    ];

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-grid lg-px-screen-edge-2 lg:tw-grid-cols-[minmax(0,4fr)_minmax(0,3fr)_minmax(0,3fr)] tw-gap-6", className)}
            id="who-we-are"
            ref={sectionRef}
        >
            <div className="lg:tw-col-start-1 tw-w-full tw-h-full tw-grid tw-px-8 max-lg:tw-py-8 lg:tw-grid-rows-[minmax(2rem,1fr)_auto_auto_0.75rem_auto_minmax(2rem,1fr)] lg-card">
                <DefaultTextAnimation className="tw-row-start-1 lg:tw-row-start-2 lg-text-banner tw-text-center lg:tw-text-left">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("540952b6-a7ef-453f-a6e5-cd8953fa4222", userPreferences.language)}}></div>
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-row-start-2 lg:tw-hidden tw-h-2" />

                <DefaultTextAnimation className="tw-row-start-3 lg-text-title2 tw-text-center lg:tw-text-left">
                    {getVernacularString("55c526fa-c19d-4a73-a460-62c333174a1b", userPreferences.language)}
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-row-start-4 lg:tw-hidden tw-h-2" />

                <DefaultTextAnimation className="tw-row-start-5 lg-text-body tw-text-center lg:tw-text-left">
                    {getVernacularString("a95dff17-79db-4ac9-b9aa-2518f93919c5", userPreferences.language)}
                </DefaultTextAnimation>
            </div>

            {whoWeAreCardsContent.map((cardContent, cardContentIndex) => {
                return (
                    <WhoWeAreCard
                        key={cardContentIndex}
                        iconUrl={cardContent.iconUrl}
                        title={cardContent.title}
                        description={cardContent.description}
                    />
                );
            })}
        </div>
    );
}

function MeetOurLeaders({userPreferences, className}: {userPreferences: UserPreferences; className: string}) {
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();

    const leadersData: Array<{title: string; position: string; description: string; imageRelativePath: string}> = [
        {
            title: getVernacularString("d867ff63-d4bf-49ae-8ac7-7290a76caef3", userPreferences.language),
            position: getVernacularString("755f8e01-18c9-4883-956c-5851e4e3885f", userPreferences.language),
            description: getVernacularString("8ddd1acf-9b2d-41f4-b4cd-e2395c211c88", userPreferences.language),
            imageRelativePath: "/livguard/about-us/3/leader-rakesh.png",
        },
        {
            title: getVernacularString("54c7930a-aed3-4efc-b2eb-68a7b5b87ae2", userPreferences.language),
            position: getVernacularString("5267b971-9cbf-41dc-9cf8-abb2f8d7f2c5", userPreferences.language),
            description: getVernacularString("07d2f8d0-b81b-4dd3-a547-1adef20b3fea", userPreferences.language),
            imageRelativePath: "/livguard/about-us/3/leader-navneet.png",
        },
        {
            title: getVernacularString("4ca82802-b39e-4844-9586-82ce4b095cff", userPreferences.language),
            position: getVernacularString("23fd4d15-8063-44e1-be03-a3aa6585d33b", userPreferences.language),
            description: getVernacularString("4f82218c-1156-4660-b634-a1231d82d457", userPreferences.language),
            imageRelativePath: "/livguard/about-us/3/leader-gurpreet.png",
        },
        {
            title: getVernacularString("d867ff63-d4bf-49ae-8ac7-7290a76caef3", userPreferences.language),
            position: getVernacularString("755f8e01-18c9-4883-956c-5851e4e3885f", userPreferences.language),
            description: getVernacularString("8ddd1acf-9b2d-41f4-b4cd-e2395c211c88", userPreferences.language),
            imageRelativePath: "/livguard/about-us/3/leader-rakesh.png",
        },
        {
            title: getVernacularString("54c7930a-aed3-4efc-b2eb-68a7b5b87ae2", userPreferences.language),
            position: getVernacularString("5267b971-9cbf-41dc-9cf8-abb2f8d7f2c5", userPreferences.language),
            description: getVernacularString("07d2f8d0-b81b-4dd3-a547-1adef20b3fea", userPreferences.language),
            imageRelativePath: "/livguard/about-us/3/leader-navneet.png",
        },
        {
            title: getVernacularString("4ca82802-b39e-4844-9586-82ce4b095cff", userPreferences.language),
            position: getVernacularString("23fd4d15-8063-44e1-be03-a3aa6585d33b", userPreferences.language),
            description: getVernacularString("4f82218c-1156-4660-b634-a1231d82d457", userPreferences.language),
            imageRelativePath: "/livguard/about-us/3/leader-gurpreet.png",
        },
    ];
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "meet-our-leaders": {
                humanReadableName: getVernacularString("b1387a67-2e83-4f5f-b794-3cf1c7bc61fd", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);

    return (
        <div
            id="meet-our-leaders"
            ref={sectionRef}
        >
            <div
                className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge-2", className)}
                ref={ref}
            >
                <DefaultTextAnimation className="tw-flex tw-flex-col tw-items-center lg-text-headline lg-px-screen-edge-2 lg:tw-pl-0 lg:tw-pr-0 tw-text-center lg:tw-text-left">
                    <div>{getVernacularString("13f6e1c4-d97c-46cf-8ddb-52712843410b", userPreferences.language)}</div>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("cb60764f-1758-4b61-a998-8f7acc7b0b92", userPreferences.language)}} />
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-4 lg:tw-h-20" />

                {isScreenSizeBelow == null ? null : isScreenSizeBelow ? (
                    <CarouselStyle7
                        items={leadersData}
                        className="tw-mx-auto"
                        slidesContainerClassName=""
                        deselectedContainersClassName="tw-pt-6 md:tw-pt-12 tw-h-full tw-mx-3"
                        selectedContainerClassName="tw-pt-6 tw-h-full tw-mx-3"
                        chevronButtonsBelowCarousel={!isScreenSizeBelow}
                        snapDotsDivisionFactor={2}
                    />
                ) : (
                    <div className="tw-grid lg:tw-grid-cols-3 lg:tw-gap-x-4">
                        {leadersData.slice(0, leadersData.length / 2).map((item, itemIndex) => {
                            return (
                                <div
                                    // className={`tw-h-full tw-grid tw-grid-rows-[auto_0.75rem_auto_auto_1rem_auto_minmax(3.5rem,1fr)] lg:tw-grid-rows-[auto_0.75rem_auto_0.25rem_auto_1rem_auto_minmax(3.5rem,1fr)] tw-grid-cols-[minmax(0,1fr)_minmax(0,1fr)] tw-rounded-[0.625rem] tw-px-5 ${
                                    //     isBackgroundPrimary ? "lg-about-us-leaders-bg-gradient !tw-text-secondary-900-dark" : "lg-bg-secondary-100 lg-text-secondary-900"
                                    // }`}
                                    key={itemIndex}
                                    className={concatenateNonNullStringsWithSpaces(
                                        "tw-h-full tw-grid tw-grid-rows-[auto_0.75rem_auto_auto_1rem_auto_minmax(3.5rem,1fr)] tw-grid-cols-[minmax(0,1fr)_minmax(0,1fr)] tw-rounded-[0.625rem] tw-px-5 tw-overflow-visible",
                                        itemIndex % 2 === 0 ? "lg-about-us-leaders-bg-gradient !tw-text-secondary-900-dark" : "lg-card",
                                    )}
                                >
                                    <div className="tw-row-start-1 tw-col-start-1 tw-h-[8.3rem] tw-w-[8.3rem] tw-rounded-full tw-relative tw-bottom-6">
                                        <FullWidthImage relativePath={item.imageRelativePath} />
                                    </div>

                                    <div className="tw-row-start-3 tw-col-start-1 tw-col-span-full lg-text-headline">{item.title}</div>
                                    <div className={concatenateNonNullStringsWithSpaces("tw-row-start-4 tw-col-start-1 tw-col-span-full lg-text-title2")}>{item.position}</div>
                                    <div className={concatenateNonNullStringsWithSpaces("tw-row-start-6 tw-col-start-1 tw-col-span-full")}>{item.description}</div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

function OurValues({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    enum Values {
        Aim = 0,
        Inspire = 1,
        Measure = 2,
        Analyze = 3,
        Communicate = 4,
        Trust = 5,
    }

    const valuesData = [
        {
            letter: "8c3a35da-197a-422d-93e0-331f1a9370e4",
            valueText: "795f5dfe-542d-4eaa-a26d-90effc18a849",
            // valueImageDesktop: "/livguard/about-us/5/value-aim-desktop.png",
            // valueImageMobile: "/livguard/about-us/5/value-aim-mobile.png",
            valueImageDesktop: "/livguard/about-us/5/a.png",
            valueImageMobile: "/livguard/about-us/5/a.png",
        },
        {
            letter: "b2620aa3-0677-4330-9b99-ef2c0d7170cd",
            valueText: "59a5ec6f-6eba-4395-9047-bec0c8bec32e",
            // valueImageDesktop: "/livguard/about-us/5/value-inspire-desktop.png",
            // valueImageMobile: "/livguard/about-us/5/value-inspire-mobile.png",
            valueImageDesktop: "/livguard/about-us/5/i.png",
            valueImageMobile: "/livguard/about-us/5/i.png",
        },
        {
            letter: "dac92472-0230-4fe5-a152-bb6aab17c8e0",
            valueText: "bffefb3c-8634-4f2b-bc52-e7c4d487da23",
            // valueImageDesktop: "/livguard/about-us/5/value-measure-desktop.png",
            // valueImageMobile: "/livguard/about-us/5/value-measure-mobile.png",
            valueImageDesktop: "/livguard/about-us/5/m.png",
            valueImageMobile: "/livguard/about-us/5/m.png",
        },
        {
            letter: "d83054c4-751b-4bc1-a061-fd43e39c177c",
            valueText: "8e99838f-3d77-4c89-955e-9411d2e447eb",
            valueImageDesktop: "/livguard/about-us/5/value-analyze-desktop.png",
            valueImageMobile: "/livguard/about-us/5/value-analyze-mobile.png",
        },
        {
            letter: "2bbf5d96-c268-4c3a-ad76-0bc5d3dc5bc5",
            valueText: "6bf5ab86-1ff2-42d6-b20e-b3641dc69d28",
            valueImageDesktop: "/livguard/about-us/5/value-communicate-desktop.png",
            valueImageMobile: "/livguard/about-us/5/value-communicate-mobile.png",
        },
        {
            letter: "d5435550-b3aa-493f-9513-56bc9e701701",
            valueText: "d54dcad5-4ae4-4300-ab3a-e44d26e2a82a",
            valueImageDesktop: "/livguard/about-us/5/value-trust-desktop.png",
            valueImageMobile: "/livguard/about-us/5/value-trust-mobile.png",
        },
    ];
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "our-values": {
                humanReadableName: getVernacularString("35610704-9140-46c7-a510-9365b19f837d", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    const [selectedValue, setSelectedValue] = useState<Values>(Values.Aim);

    const ValueDisplay = ({valueDisplayClassName}: {valueDisplayClassName?: string}) => {
        return (
            <div className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-rows-[auto_1rem_auto]", valueDisplayClassName)}>
                <div
                    dangerouslySetInnerHTML={{__html: getVernacularString(valuesData[selectedValue].valueText, userPreferences.language)}}
                    className="tw-row-start-1 tw-text-center lg:tw-text-left"
                ></div>
                <div className="tw-row-start-3 tw-flex flex-row tw-justify-center lg:tw-justify-start">
                    <FullWidthImage
                        className="tw-rounded-lg"
                        // relativePath={containerWidth != undefined && containerWidth < 1024 ? valuesData[selectedValue].valueImageMobile : valuesData[selectedValue].valueImageDesktop}
                        relativePath={valuesData[selectedValue].valueImageDesktop}
                    />
                </div>
            </div>
        );
    };

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-rows-[auto_0.5rem_auto_1rem_auto_1rem_auto]", className)}
            id="our-values"
            ref={sectionRef}
        >
            <div
                dangerouslySetInnerHTML={{__html: getVernacularString("389859cd-81c3-4b9a-95ad-b38dde856511", userPreferences.language)}}
                className="tw-row-start-1 lg-text-headline tw-text-center lg:tw-text-left"
            />

            <div className="tw-row-start-3 lg-text-title2 tw-text-center lg:tw-text-left">{getVernacularString("0840f752-7ac4-4277-8e49-5cf832119941", userPreferences.language)}</div>

            {/* <ValueSelector valueSelectorClassName="tw-row-start-5" /> */}
            <div className={concatenateNonNullStringsWithSpaces("tw-row-start-5 tw-grid tw-auto-cols-[repeat(6,1fr)] tw-gap-1")}>
                {valuesData.map((valueData, valueDataIndex) => {
                    const isSelected = selectedValue === valueDataIndex;
                    return (
                        <div
                            key={valueDataIndex}
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-grid tw-place-items-center tw-place-content-center tw-px-5 tw-py-3 tw-row-start-1 tw-rounded-sm lg-text-body-bold tw-cursor-pointer tw-transition-colors tw-duration-200",
                                isSelected ? "!tw-text-secondary-900-dark lg-bg-primary-500" : "lg-card",
                            )}
                            onClick={() => {
                                setSelectedValue(valueDataIndex);
                            }}
                        >
                            {getVernacularString(valueData.letter, userPreferences.language)}
                        </div>
                    );
                })}
            </div>

            <ValueDisplay valueDisplayClassName="tw-row-start-7" />
        </div>
    );
}

function ExploreCareers({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge-2", className)}>
            <div className="tw-p-6 lg-contact-gradient-light dark:lg-contact-gradient-dark tw-rounded-lg tw-grid tw-grid-rows-[auto_1rem_auto_1rem_minmax(0,1fr)_1rem_auto] lg:tw-grid-rows-1 lg:tw-grid-cols-[auto_2rem_20rem_2rem_minmax(0,1fr)_2rem_auto] tw-items-center">
                <div className="tw-w-[7.75rem] tw-h-[7.75rem] tw-col-start-1 tw-row-start-1 lg-bg-secondary-100 tw-rounded-full tw-grid tw-justify-center tw-items-center tw-place-self-center lg:tw-place-self-start">
                    <img
                        src="https://files.growthjockey.com/livguard/icons/contact-us/hiring.svg"
                        alt="hiring"
                        className="tw-w-[4rem] tw-h-[4rem]"
                    />
                </div>

                <div
                    className="tw-row-start-3 tw-col-start-1 lg:tw-row-start-1 lg:tw-col-start-3 lg-text-headline tw-text-center lg:tw-text-left"
                    dangerouslySetInnerHTML={{__html: appendSpaceToString(getVernacularString("2adcc683-70f0-4b39-be83-73211ea28f20", userPreferences.language))}}
                />

                <div className="tw-row-start-5 tw-col-start-1 lg:tw-row-start-1 lg:tw-col-start-5 tw-text-center lg:tw-text-left lg:tw-max-w-[20rem] lg:tw-place-self-center">
                    {getVernacularString("1aa2a41b-b500-43bb-b0cd-b9999f5e442b", userPreferences.language)}
                </div>

                <Link
                    className="tw-row-start-7 tw-col-start-1 lg:tw-row-start-1 lg:tw-col-start-7 tw-place-self-center lg-cta-button tw-max-w-fit"
                    to="/"
                >
                    {getVernacularString("c1a8bbb2-f085-4c71-8082-7e292fcde4e7", userPreferences.language)}
                </Link>
            </div>
        </div>
    );
}

function EmpoweredBySAR({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "empowered-by-sar": {
                humanReadableName: getVernacularString("fe6d299f-3f6a-44fe-9b3a-877ff0d423d2", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    const sisterCompanies = [
        {
            logoUrl: "/livguard/about-us/7/livpure.png",
            link: "https://livpure.com/",
        },
        {
            logoUrl: "/livguard/about-us/7/livfast.png",
            link: "https://www.livfast.in/",
        },
        {
            logoUrl: "/livguard/about-us/7/livgreen.png",
            link: "https://www.livgreenbioenergy.com/",
        },
        {
            logoUrl: "/livguard/about-us/7/livpure-smart.png",
            link: "https://www.livpuresmart.com/",
        },
        {
            logoUrl: "/livguard/about-us/7/ncubate.png",
            link: "https://ncubatelogistics.com/",
        },
    ];
    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-grid tw-grid-rows-[auto_0.5rem_auto_1rem_auto] md:tw-grid-rows-[minmax(0,1fr)_2.5rem_auto_auto_1rem_auto_2.5rem_minmax(0,1fr)] tw-justify-center tw-place-items-center md:tw-border-2 lg-card tw-px-8 md:tw-px-16 max-md:tw-py-8",
                className,
            )}
            id="empowered-by-sar"
            ref={sectionRef}
        >
            <div className="tw-row-start-1 md:tw-row-start-3 tw-grid tw-grid-rows-[auto_0.5rem_auto_1rem_auto_0.5rem_auto] md:tw-grid-rows-[auto_auto_1rem_auto] md:tw-grid-cols-[minmax(0,11fr)_1.5rem_minmax(0,9fr)] md:tw-w-full">
                <div
                    className="tw-row-start-1 lg-text-headline tw-text-center md:tw-row-start-1 md:tw-col-start-3"
                    dangerouslySetInnerHTML={{__html: getVernacularString("310ad3b5-2e4a-409b-9622-c1389c366dbd", userPreferences.language)}}
                />
                <div className="tw-row-start-3 tw-text-center lg-text-title2 md:tw-row-start-2 md:tw-col-start-3">
                    {getVernacularString("b005d8fa-48dc-4f1a-acee-4afdeec1a1d2", userPreferences.language)}
                </div>
                <div className="tw-row-start-5 md:tw-row-start-1 md:tw-row-span-full md:tw-col-start-1 md:tw-place-self-center tw-h-full tw-w-full">
                    <div className="tw-h-full tw-w-full tw-grid tw-items-center">
                        <FullWidthImage relativePath="/livguard/about-us/7/sar.png" />
                    </div>
                </div>
                <div className="tw-row-start-7 tw-text-center md:tw-row-start-4 md:tw-col-start-3 md:tw-w-full lg-text-body lg-text-secondary-900">
                    {getVernacularString("4a0ff6e2-3456-4e80-a100-dd0437e1e1a5", userPreferences.language)}
                </div>
            </div>
            <div className="tw-row-start-3 md:tw-row-start-4 tw-text-center lg-text-title2 md:lg-text-body md:lg-text-secondary-900">
                {getVernacularString("1dac654a-dcb3-48bf-9b14-2e08470548d9", userPreferences.language)}
            </div>
            <div className="tw-row-start-5 md:tw-row-start-6 tw-w-full lg:tw-grid-cols-5 tw-items-center tw-grid tw-grid-flow-col tw-overflow-hidden tw-gap-x-8">
                {isScreenSizeBelow == null ? null : isScreenSizeBelow ? (
                    <Marquee
                        rate={-60}
                        startOnScreen={true}
                    >
                        {sisterCompanies.map((sisterCompany, sisterCompanyIndex) => (
                            <div
                                className="tw-w-[10rem] tw-h-[4rem] tw-mx-3 tw-grid tw-items-center"
                                key={sisterCompanyIndex}
                            >
                                <a
                                    href={sisterCompany.link}
                                    target="_blank"
                                    className="tw-w-full tw-h-fit"
                                >
                                    <img src={getAbsolutePathForRelativePath(getMetadataForImage(sisterCompany.logoUrl).finalUrl, ImageCdnProvider.Bunny, null, null)} />
                                </a>
                            </div>
                        ))}
                    </Marquee>
                ) : (
                    sisterCompanies.map((sisterCompany, sisterCompanyIndex) => {
                        return (
                            <a
                                key={sisterCompanyIndex}
                                href={sisterCompany.link}
                                target="_blank"
                            >
                                <FullWidthImage
                                    relativePath={sisterCompany.logoUrl}
                                    className="tw-grayscale-[95%] hover:tw-grayscale-0 dark:tw-invert hover:dark:tw-invert-0 tw-transition tw-duration-[250ms]"
                                />
                            </a>
                        );
                    })
                )}
            </div>
        </div>
    );
}

function OurOperations({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "our-operations": {
                humanReadableName: getVernacularString("591ebee7-9d2d-416f-8942-29e3840cc4c4", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className=""
            id="our-operations"
            ref={sectionRef}
        >
            <OurPresence
                userPreferences={userPreferences}
                headingTextContentId="75b7261b-7ced-4385-891a-ecfe8123bab5"
            />
        </div>
    );
}

function Everywhere({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
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
