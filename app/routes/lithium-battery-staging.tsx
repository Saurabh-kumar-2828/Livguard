import {useState} from "react";
import {LoaderFunction} from "@remix-run/node";
import {Link, useLoaderData} from "@remix-run/react";
import {useResizeDetector} from "react-resize-detector";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces, generateUuid} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {CoverImage} from "~/components/images/coverImage";
import {PageScaffold} from "~/components/pageScaffold";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import {Theme, UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";
import {appendSpaceToString, getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {FixedHeightImage} from "~/components/images/fixedHeightImage";
import {CarouselStyle7} from "~/components/carouselStyle7";
import {InfiniteHorizontalScroller, HorizontalScrollDirection} from "~/livguard-common-typescript/infiniteHorizontalScroller";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ImageCdnProvider} from "~/global-common-typescript/typeDefinitions";
import {ContactUsCta} from "~/routes/index";

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

    return (
        <>
            <PageScaffold
                userPreferences={userPreferences}
                redirectTo={redirectTo}
                showMobileMenuIcon={true}
                utmParameters={utmSearchParameters}
                breadcrumbs={[
                    {contentId: "849dabf7-0fa6-47e6-a1f8-e4f544306f7c", link: "/"},
                    {contentId: "6d164881-cc49-4447-8460-d6fa6cf7a14f", link: "#"},
                ]}
            >
                <AboutUsPage
                    userPreferences={userPreferences}
                    utmParameters={utmSearchParameters}
                    pageUrl={pageUrl}
                />
            </PageScaffold>
        </>
    );
};

function AboutUsPage({
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
        <>
            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-x-16 tw-items-start">
                <HeroSection
                    userPreferences={userPreferences}
                    className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
                    utmParameters={utmParameters}
                    pageUrl={pageUrl}
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-2 tw-col-start-1 lg:tw-col-span-full" />

                <EMobilitySolutions
                    userPreferences={userPreferences}
                    className="tw-row-start-3 tw-col-start-1 lg:tw-col-span-full"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-4 tw-col-start-1 lg:tw-col-span-full" />

                <WhoWeAre
                    userPreferences={userPreferences}
                    className="tw-row-start-5 tw-col-start-1 lg:tw-col-span-full tw-w-full tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-6 tw-col-start-1 lg:tw-col-span-full" />

                <MeetOurLeaders
                    userPreferences={userPreferences}
                    className="tw-row-start-7 lg:tw-col-span-full tw-w-full tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-row-start-8 tw-h-10 lg:tw-h-20" />
            </div>
        </>
    );
}

function HeroSection({
    userPreferences,
    className,
    utmParameters,
    pageUrl,
}: {
    userPreferences: UserPreferences;
    className?: string;
    utmParameters: {
        [searchParameter: string]: string;
    };
    pageUrl: string;
}) {
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-flow-row lg:tw-max-h-[fit] tw-text-center", className)}
            ref={ref}
        >
            {containerWidth == null || containerHeight == null ? null : (
                <div className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full tw-grid lg:tw-grid-rows-[minmax(0,1fr)_auto_minmax(0,1fr)]">
                    <CoverImage
                        relativePath={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/about-us/1/banner-mobile.jpg" : "/livguard/about-us/1/banner-desktop.jpg"}
                        className="tw-row-start-1 tw-col-start-1 tw-row-span-full tw-col-span-full tw-w-full tw-h-full tw-max-h-[40vh] lg:tw-max-h-[60vh]"
                        key={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/about-us/1/banner-mobile.jpg" : "/livguard/about-us/1/banner-desktop.jpg"}
                    />

                    <EndToEndSolutions
                        userPreferences={userPreferences}
                        utmParameters={utmParameters}
                        pageUrl={pageUrl}
                    />
                </div>
            )}
        </div>
    );
}

function EndToEndSolutions({
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
        <div className="tw-w-4/5 lg:tw-w-full tw-place-self-center tw-relative tw-bottom-4 tw-z-[2] tw-p-4 tw-rounded-lg tw-row-start-2 tw-col-start-1 tw-bg-secondary-100-light dark:tw-bg-secondary-100-dark lg:!tw-bg-transparent tw-grid tw-grid-rows-[repeat(4,auto)] lg:tw-grid-cols-2 max-lg:lg-ops-pages-shadow max-lg:lg-lithium-shadow">
            <div className="lg:tw-row-start-1 lg:tw-col-start-1 lg:tw-z-[2] lg:tw-justify-self-start lg:tw-ml-20 lg-text-headline lg:tw-text-secondary-900-dark lg:tw-text-left lg:tw-w-full lg:tw-whitespace-pre-wrap lg:tw-break-words">
                <span className="lg-text-headline tw-block lg:tw-inline lg:lg-text-banner">{getVernacularString("450429b9-9d3a-47e8-acdc-667773c39d28", userPreferences.language)}</span>
                <span className="lg-text-title2 lg:lg-text-banner">{getVernacularString("d9eec0e4-1258-4ff7-8871-4d530e2c8424", userPreferences.language)}</span>
            </div>

            <VerticalSpacer className="lg:tw-row-start-3 tw-h-4" />

            <ContactUsCta
                userPreferences={userPreferences}
                textVernacId="3f724c0f-7cd3-4c2e-b320-a8d48ee22cd3"
                className="lg:tw-row-start-4 lg:tw-col-start-1 lg:tw-z-[2] tw-justify-self-center lg:tw-justify-self-start lg:tw-ml-20 lg-text-headline lg:tw-text-secondary-900-dark"
                utmParameters={utmParameters}
                pageUrl={pageUrl}
            />
        </div>
    );
}

function EMobilitySolutions({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge-2 tw-grid tw-grid-rows-3 tw-grid-cols-1 tw-grid-flow-row tw-gap-y-6", className)}></div>;
}

function WhoWeAre({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    function WhoWeAreCard({iconUrl, title, description}: {iconUrl: string; title: string; description: string}) {
        return (
            <div className="tw-grid tw-grid-rows-[1.5rem_auto_0.5rem_auto_0.5rem_auto_minmax(1rem,1fr)] lg:tw-grid-rows-[4rem_auto_1rem_auto_0.75rem_auto_minmax(1rem,1fr)] tw-border-2 lg-border-secondary-900 tw-rounded-lg tw-px-6">
                <div className="tw-row-start-2 tw-h-16 tw-w-16 lg:tw-h-[6.25rem] lg:tw-w-[6.25rem] tw-rounded-full lg-bg-secondary-100 tw-place-self-center tw-grid tw-place-content-center">
                    <img
                        src={iconUrl}
                        className="tw-invert dark:tw-invert-0 tw-h-8 tw-w-8 lg:tw-h-[3.125rem] lg:tw-w-[3.125rem]"
                    />
                </div>
                <DefaultTextAnimation className="tw-row-start-4 lg-text-title2 tw-text-center">{title}</DefaultTextAnimation>
                <DefaultTextAnimation className="tw-row-start-6 lg-text-body tw-text-center">{description}</DefaultTextAnimation>
            </div>
        );
    }

    const whoWeAreCardsContent = [
        {
            iconUrl: "https://files.growthjockey.com/livguard/icons/about-us/2/our-mission.svg",
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
        <div className={concatenateNonNullStringsWithSpaces("tw-grid lg-px-screen-edge-2 lg:tw-grid-cols-[minmax(0,4fr)_minmax(0,3fr)_minmax(0,3fr)] tw-gap-6", className)}>
            <div className="lg:tw-col-start-1 tw-w-full tw-h-full tw-grid lg:lg-bg-secondary-100 lg:tw-px-8 lg:tw-grid-rows-[minmax(0,1fr)_auto_auto_0.75rem_auto_minmax(0,1fr)] lg:tw-rounded-lg lg:lg-about-us-who-we-are-bg-gradient-light lg:dark:lg-about-us-who-we-are-bg-gradient-dark">
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
            title: getVernacularString("4d638603-3fff-4920-b8b2-927d6a748d54", userPreferences.language),
            position: getVernacularString("62e2f1af-3ce5-4558-a8aa-3cbd1e48ee87", userPreferences.language),
            description: getVernacularString("fca6fd65-7e15-40dc-a89a-52895912401f", userPreferences.language),
            imageRelativePath: "/livguard/about-us/3/leader-alankar.png",
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
        {
            title: getVernacularString("4d638603-3fff-4920-b8b2-927d6a748d54", userPreferences.language),
            position: getVernacularString("62e2f1af-3ce5-4558-a8aa-3cbd1e48ee87", userPreferences.language),
            description: getVernacularString("fca6fd65-7e15-40dc-a89a-52895912401f", userPreferences.language),
            imageRelativePath: "/livguard/about-us/3/leader-alankar.png",
        },
    ];

    return (
        <>
            <div
                className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge-2 lg:tw-px-0", className)}
                ref={ref}
            >
                <DefaultTextAnimation className="tw-flex tw-flex-col tw-items-center lg-text-headline lg-px-screen-edge-2 lg:tw-pl-0 lg:tw-pr-0 tw-text-center lg:tw-text-left">
                    <div>{getVernacularString("13f6e1c4-d97c-46cf-8ddb-52712843410b", userPreferences.language)}</div>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("cb60764f-1758-4b61-a998-8f7acc7b0b92", userPreferences.language)}} />
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-4 lg:tw-h-8" />

                <CarouselStyle7
                    items={leadersData}
                    className="tw-mx-auto"
                    slidesContainerClassName=""
                    deselectedContainersClassName="tw-pt-6 md:tw-pt-12 tw-h-full"
                    selectedContainerClassName="tw-pt-6 tw-h-full"
                    chevronButtonsBelowCarousel={containerWidth != null && containerHeight != null && (containerHeight > containerWidth || containerWidth < 640) ? false : true}
                    chevronButtonsDivisionFactor={2}
                />
            </div>
        </>
    );
}
