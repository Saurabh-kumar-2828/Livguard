import {LoaderFunction} from "@remix-run/node";
import {Link, useLoaderData} from "@remix-run/react";
import {useResizeDetector} from "react-resize-detector";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {CoverImage} from "~/components/images/coverImage";
import {PageScaffold} from "~/components/pageScaffold";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import {Theme, UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";
import {getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {CarouselStyle4} from "~/components/carouselStyle4";
import {useEmblaCarouselWithIndex} from "~/hooks/useEmblaCarouselWithIndex";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {DefaultImageAnimation} from "~/components/defaultImageAnimation";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {ContactUsCta} from "~/routes/index";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ImageCdnProvider} from "~/global-common-typescript/typeDefinitions";

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
                breadcrumbs={[]}
            >
                <GlobalOpsPage
                    userPreferences={userPreferences}
                    utmParameters={utmSearchParameters}
                    pageUrl={pageUrl}
                />
            </PageScaffold>
        </>
    );
};

function GlobalOpsPage({
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
            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-x-16 tw-items-start tw-justify-center tw-bg-secondary-100-light dark:tw-bg-background-500-dark">
                <HeroSection
                    userPreferences={userPreferences}
                    className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
                    utmParameters={utmParameters}
                    pageUrl={pageUrl}
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-2 tw-col-start-1 lg:tw-col-span-full" />

                <div className="tw-row-start-3 tw-col-start-1 lg:tw-col-span-full tw-w-full tw-max-w-7xl tw-mx-auto tw-grid tw-grid-cols-1 tw-grid-flow-row lg:tw-grid-cols-2 lg:tw-gap-x-20 lg-px-screen-edge-2">
                    <InternationalOperations
                        userPreferences={userPreferences}
                        className="tw-row-start-1 tw-col-start-1 tw-w-full"
                    />
                    <VerticalSpacer className="tw-h-10 lg:tw-hidden tw-row-start-2 tw-col-start-1" />

                    <WhyLivguard
                        userPreferences={userPreferences}
                        className="tw-row-start-3 tw-col-start-1 lg:tw-row-start-1 lg:tw-col-start-2 tw-w-full tw-max-w-7xl tw-mx-auto"
                    />
                </div>

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-4 tw-col-start-1 lg:tw-col-span-full" />

                <InternationalPresence
                    userPreferences={userPreferences}
                    className="tw-row-start-5 tw-col-start-1 lg:tw-col-span-full tw-w-full tw-max-w-7xl tw-mx-auto lg:lg-px-screen-edge-2"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-6 tw-col-start-1 lg:tw-col-span-full" />

                <div className="tw-row-start-7 tw-col-start-1 lg:tw-col-span-full tw-w-full tw-max-w-7xl tw-mx-auto lg:lg-px-screen-edge-2 tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-grid-flow-row lg:tw-gap-x-20">
                    <EnergySolutions
                        userPreferences={userPreferences}
                        className="tw-row-start-3 tw-col-start-1 lg:tw-row-start-1 tw-w-full"
                    />

                    <VerticalSpacer className="tw-h-10 lg:tw-hidden tw-row-start-2 tw-col-start-1" />

                    <InnovationSolution
                        userPreferences={userPreferences}
                        className="tw-row-start-1 tw-col-start-1 lg:tw-row-start-1 lg:tw-col-start-2 tw-w-full"
                    />
                </div>

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-8 tw-col-start-1 lg:tw-col-span-full" />

                <LegacyAndHeritage
                    userPreferences={userPreferences}
                    className="tw-row-start-9 tw-col-start-1 lg:tw-col-span-full lg-px-screen-edge-2 tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-10 tw-col-start-1 lg:tw-col-span-full" />
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
                <div className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full tw-grid lg:tw-grid-rows-[minmax(0,1fr)_auto_2.5rem]">
                    <CoverImage
                        relativePath={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/india-ops/1/banner-mobile.png" : "/livguard/india-ops/1/banner-desktop.jpg"}
                        className="tw-row-start-1 tw-col-start-1 tw-row-span-full tw-col-span-full tw-w-full tw-h-full tw-max-h-[40vh] lg:tw-max-h-[60vh]"
                        key={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/india-ops/1/banner-mobile.png" : "/livguard/india-ops/1/banner-desktop.jpg"}
                    />

                    <PowerThatEmpowersLives
                        userPreferences={userPreferences}
                        utmParameters={utmParameters}
                        pageUrl={pageUrl}
                    />
                </div>
            )}

            <VerticalSpacer className="tw-h-4 lg:tw-h-10" />

            <div className="lg-px-screen-edge-2 tw-w-full tw-max-w-7xl tw-mx-auto">{getVernacularString("434a3b79-cd9d-47e9-8284-f23b7d677d97", userPreferences.language)}</div>
        </div>
    );
}

function PowerThatEmpowersLives({
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
        <div className="tw-w-4/5 lg:tw-w-full tw-place-self-center tw-relative tw-bottom-4 tw-z-[2] tw-p-4 tw-rounded-lg tw-row-start-2 tw-col-start-1 tw-bg-secondary-100-light dark:tw-bg-secondary-100-dark lg:!tw-bg-transparent tw-grid tw-grid-rows-[repeat(4,auto)] max-lg:lg-ops-pages-shadow">
            <div className="lg:tw-row-start-1 lg:tw-col-start-1 lg:tw-z-[2] lg:tw-justify-self-start lg:tw-ml-20 lg-text-headline lg:tw-text-secondary-900-dark">
                {getVernacularString("d1c50aa6-1529-4fe4-8e3b-b526888ec7e9", userPreferences.language)}
            </div>
            <div className="lg:tw-row-start-2 lg:tw-col-start-1 lg:tw-z-[2] lg:tw-justify-self-start lg:tw-ml-20 lg-text-title2 lg:tw-text-secondary-900-dark">
                {getVernacularString("ac1d1b59-b34e-4bad-8b06-bf9de7999447", userPreferences.language)}
            </div>

            <VerticalSpacer className="lg:tw-row-start-3 tw-h-4" />

            <ContactUsCta
                userPreferences={userPreferences}
                textVernacId="2c463782-52de-4cf3-b55d-93bfce4e1ec1"
                className="lg:tw-row-start-4 lg:tw-col-start-1 lg:tw-z-[2] tw-justify-self-center lg:tw-justify-self-start lg:tw-ml-20 lg-text-headline lg:tw-text-secondary-900-dark"
                utmParameters={utmParameters}
                pageUrl={pageUrl}
            />
        </div>
    );
}

function InternationalOperations({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-grid tw-grid-flow-row tw-place-items-center lg:tw-grid-rows-[max-content_1.5rem_minmax(0,1fr)] lg:tw-items-start lg-px-screen-edge-2 lg:lg-bg-secondary-100 lg:tw-rounded-lg lg:tw-px-6 lg:tw-py-12 lg:lg-ops-pages-shadow",
                className,
            )}
        >
            <DefaultTextAnimation>
                <div
                    dangerouslySetInnerHTML={{__html: getVernacularString("a21ac9fc-8b0d-47cf-8624-d5a8b747e817", userPreferences.language)}}
                    className="tw-text-center lg-text-headline lg:tw-row-start-1"
                />
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-4 lg:tw-hidden lg:tw-row-start-2" />

            <DefaultTextAnimation className="tw-text-center lg-text-body lg:tw-row-start-3 tw-self-center">
                {getVernacularString("ad28c51d-af5e-4e47-9c32-68313738a1f2", userPreferences.language)}
            </DefaultTextAnimation>
        </div>
    );
}

function WhyLivguard({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-grid tw-grid-flow-row tw-place-items-center lg:tw-grid-rows-[max-content_1.5rem_minmax(0,1fr)] lg:tw-items-start lg-px-screen-edge-2 lg:lg-bg-secondary-100 lg:tw-rounded-lg lg:tw-px-6 lg:tw-py-12 lg:lg-ops-pages-shadow",
                className,
            )}
        >
            <DefaultTextAnimation>
                <div
                    dangerouslySetInnerHTML={{__html: getVernacularString("1c837763-6546-4d29-a8cf-53ea73f3fe0b", userPreferences.language)}}
                    className="tw-text-center lg-text-headline lg:tw-row-start-1"
                />
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-4 lg:tw-hidden lg:tw-row-start-2" />

            <DefaultTextAnimation className="tw-text-center lg-text-body lg:tw-row-start-3 tw-self-center">
                {getVernacularString("e461e21e-79be-4fc9-891c-725ff8dcd336", userPreferences.language)}
            </DefaultTextAnimation>
        </div>
    );
}

function InternationalPresence({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();

    const presenceData = [
        {
            numberContentPiece: "04aa014b-9343-44e4-b0a5-35efab1f87ca",
            textContentPiece: "9bb5760a-18e0-42bf-880d-6ddcc259dbc6",
        },
        {
            numberContentPiece: "142e6c8d-b760-494f-8bb6-3c7d1a1a8663",
            textContentPiece: "b491fad1-4bcd-4167-95d3-dfdf48769a67",
        },
        {
            numberContentPiece: "f2dd4264-0102-44f7-a3d8-4ed0747dc785",
            textContentPiece: "b4a41fb9-4438-4760-954c-b92d5f752602",
        },
    ];

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-h-[70vh] lg:tw-h-[40vh] tw-grid tw-grid-rows-[repeat(4,auto)_minmax(0,1fr)] lg:tw-grid-rows-[minmax(0,1fr)_auto_auto_1.25rem_auto_minmax(0,1fr)] tw-text-center lg:tw-text-left lg:tw-grid-cols-[minmax(0,1fr)_minmax(0,1fr)]",
                className,
            )}
            ref={ref}
        >
            <DefaultTextAnimation className="lg:tw-hidden tw-row-start-1 tw-col-start-1 tw-justify-self-center">
                <div className="lg-text-banner lg-px-screen-edge-2 tw-place-self-center lg:tw-place-self-start tw-text-center">
                    {getVernacularString("539abcc9-a3b3-4ba8-b0b7-9320c02921a9", userPreferences.language)}
                </div>
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-row-start-2 tw-h-6" />

            <div className="lg:tw-hidden tw-row-start-3 tw-col-start-1 lg-px-screen-edge-2 tw-justify-self-center tw-grid tw-grid-flow-col tw-grid-cols-3 tw-gap-x-4 tw-justify-center tw-justify-items-center">
                {presenceData.map((presence, presenceIndex) => {
                    return (
                        <div
                            className="tw-grid tw-grid-flow-row tw-gap-y-2 lg-bg-secondary-100 tw-px-4 tw-py-3 tw-w-full tw-rounded-lg lg-ops-pages-shadow"
                            key={presenceIndex}
                        >
                            <div className="lg-text-primary-500 lg-text-title1 tw-text-center">{getVernacularString(presence.numberContentPiece, userPreferences.language)}</div>
                            <div className="lg-text-secondary-900 lg-text-title2 tw-text-center">{getVernacularString(presence.textContentPiece, userPreferences.language)}</div>
                        </div>
                    );
                })}
            </div>

            <VerticalSpacer className="tw-row-start-4 tw-h-6" />

            {containerWidth == null || containerHeight == null ? null : (
                <>
                    <CoverImage
                        relativePath={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/global-ops/3/banner-mobile.jpg" : "/livguard/global-ops/3/banner-desktop.jpg"}
                        className="tw-row-start-5 lg:tw-row-start-1 tw-col-start-1 tw-row-span-full tw-col-span-full"
                        key={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/global-ops/3/banner-mobile.jpg" : "/livguard/global-ops/3/banner-desktop.jpg"}
                        imageClassName="lg:tw-rounded-lg"
                    />
                </>
            )}

            <DefaultTextAnimation className="tw-hidden lg:tw-block lg:tw-row-start-2 lg:tw-col-start-1 lg:tw-col-span-full lg:tw-justify-self-center">
                <div className="lg-text-banner lg-px-screen-edge-2 tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start tw-text-center">
                    {getVernacularString("539abcc9-a3b3-4ba8-b0b7-9320c02921a9", userPreferences.language)}
                </div>
            </DefaultTextAnimation>

            <div className="tw-hidden lg:tw-row-start-5 tw-col-start-1 lg:tw-col-span-full lg-px-screen-edge-2 tw-justify-self-center lg:tw-grid lg:tw-grid-flow-col lg:tw-grid-cols-3 lg:tw-gap-x-6 lg:tw-justify-center lg:tw-justify-items-center">
                {presenceData.map((presence, presenceIndex) => {
                    return (
                        <div
                            className="tw-grid tw-grid-flow-row tw-gap-y-2 tw-bg-secondary-100-light tw-px-8 tw-py-4 tw-w-full tw-rounded-lg lg-ops-pages-shadow"
                            key={presenceIndex}
                        >
                            <div className="lg-text-primary-500 lg-text-title1 tw-text-center">{getVernacularString(presence.numberContentPiece, userPreferences.language)}</div>
                            <div className="tw-text-secondary-900-light lg-text-title2 tw-text-center">{getVernacularString(presence.textContentPiece, userPreferences.language)}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function EnergySolutions({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
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
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("f0a9f643-18b1-4220-ab20-07882267fb84", userPreferences.language)}} />
                </DefaultTextAnimation>
            </h2>

            <div className="lg-px-screen-edge tw-grid tw-grid-cols-5 tw-gap-x-4 tw-row-start-2 tw-col-start-1 tw-col-span-full lg:tw-grid-rows-5 lg:tw-grid-cols-1 lg:tw-gap-y-4 lg:tw-row-start-1 lg:tw-row-span-full lg:tw-col-start-1 lg:tw-col-span-1 lg:tw-py-10">
                <ItemBuilder
                    items={[
                        {
                            svgIcon: "/livguard/india-ops/2/category-home-inverters.svg",
                            title: "eb3dd920-3d22-4d87-a269-b95b1c0d4d14",
                        },
                        {
                            svgIcon: "/livguard/india-ops/2/category-inverter-battery.svg",
                            title: "572d155d-bf16-45f3-9bac-66c905f3ad17",
                        },
                        {
                            svgIcon: "/livguard/india-ops/2/category-automotive.svg",
                            title: "329b0815-9513-4218-b6fb-7b6ef834b015",
                        },
                        {
                            svgIcon: "/livguard/india-ops/2/category-solar.svg",
                            title: "f6791517-756d-46e8-b3b6-c05b8b2a9910",
                        },
                        {
                            svgIcon: "/livguard/india-ops/2/category-other.svg",
                            title: "94ef620f-270c-4196-92b4-58bf6993de50",
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
                                    "tw-w-12 tw-h-12 tw-rounded-full tw-flex tw-flex-row tw-items-center tw-justify-center tw-duration-200 lg-ops-pages-shadow",
                                    `${itemIndex == selectedIndex ? "lg-bg-primary-500 tw-scale-110" : "lg-bg-secondary-100"}`,
                                )}
                            >
                                <img
                                    src={`https://growthjockey.imgix.net${item.svgIcon}`}
                                    className={concatenateNonNullStringsWithSpaces("tw-w-6 tw-h-6", itemIndex == selectedIndex ? "tw-scale-125 tw-brightness-0 tw-invert" : "")}
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

                                {/* <DefaultElementAnimation>
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
                                </DefaultElementAnimation> */}
                            </div>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

function InnovationSolution({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const carouselItems = [
        {
            imageRelativeUrl: "/livguard/home/3/2.jpg",
            titleContentPiece: "06daee92-6429-4732-996c-adc4de0153a5",
            descriptionContentPiece: "5c6e3030-2ce7-4f27-8f39-e75490428d22",
        },
        {
            imageRelativeUrl: "/livguard/home/3/2.jpg",
            titleContentPiece: "06daee92-6429-4732-996c-adc4de0153a5",
            descriptionContentPiece: "5c6e3030-2ce7-4f27-8f39-e75490428d22",
        },
        {
            imageRelativeUrl: "/livguard/home/3/2.jpg",
            titleContentPiece: "06daee92-6429-4732-996c-adc4de0153a5",
            descriptionContentPiece: "5c6e3030-2ce7-4f27-8f39-e75490428d22",
        },
        {
            imageRelativeUrl: "/livguard/home/3/2.jpg",
            titleContentPiece: "06daee92-6429-4732-996c-adc4de0153a5",
            descriptionContentPiece: "5c6e3030-2ce7-4f27-8f39-e75490428d22",
        },
    ];

    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge-2 lg:tw-px-0", className)}>
            <div className="tw-rounded-lg tw-py-8 tw-px-4 lg-bg-secondary-100 lg-ops-pages-shadow tw-grid tw-grid-flow-row tw-auto-rows-auto tw-h-full tw-w-full">
                <DefaultElementAnimation className="tw-px-3">
                    <div
                        className="tw-text-center lg-text-headline"
                        dangerouslySetInnerHTML={{__html: getVernacularString("287da09c-577e-48c9-8bf8-afdde8dfeb7f", userPreferences.language)}}
                    />
                </DefaultElementAnimation>

                <VerticalSpacer className="tw-h-4" />

                <CarouselStyle4
                    items={carouselItems.map((item, itemIndex) => {
                        return (
                            <div
                                className="tw-grid tw-grid-flow-row tw-auto-rows-max"
                                key={itemIndex}
                            >
                                <div>
                                    <FullWidthImage
                                        relativePath={item.imageRelativeUrl}
                                        className="tw-rounded-lg"
                                    />
                                </div>

                                <VerticalSpacer className="tw-h-2 lg:tw-h-4" />

                                <div className="lg-text-title2 tw-text-center">{getVernacularString(item.titleContentPiece, userPreferences.language)}</div>

                                <VerticalSpacer className="lg:tw-h-2" />

                                <div className="lg-text-body tw-text-center">{getVernacularString(item.descriptionContentPiece, userPreferences.language)}</div>
                            </div>
                        );
                    })}
                    slidesContainerClassName="!tw-auto-cols-[100%]"
                />
            </div>
        </div>
    );
}

function LegacyAndHeritage({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();

    const timelineCards = [
        {
            descriptionTextContentPiece: "8c6d06ec-e5a5-42d4-af83-67c9719cb313",
            yearTextContentPiece: "e8cf0cf1-7c32-4576-9cb9-9128c0d90ce8",
        },
        {
            descriptionTextContentPiece: "8c6d06ec-e5a5-42d4-af83-67c9719cb313",
            yearTextContentPiece: "e8cf0cf1-7c32-4576-9cb9-9128c0d90ce8",
        },
        {
            descriptionTextContentPiece: "8c6d06ec-e5a5-42d4-af83-67c9719cb313",
            yearTextContentPiece: "e8cf0cf1-7c32-4576-9cb9-9128c0d90ce8",
        },
        {
            descriptionTextContentPiece: "8c6d06ec-e5a5-42d4-af83-67c9719cb313",
            yearTextContentPiece: "e8cf0cf1-7c32-4576-9cb9-9128c0d90ce8",
        },
        {
            descriptionTextContentPiece: "8c6d06ec-e5a5-42d4-af83-67c9719cb313",
            yearTextContentPiece: "e8cf0cf1-7c32-4576-9cb9-9128c0d90ce8",
        },
        {
            descriptionTextContentPiece: "8c6d06ec-e5a5-42d4-af83-67c9719cb313",
            yearTextContentPiece: "e8cf0cf1-7c32-4576-9cb9-9128c0d90ce8",
        },
    ];

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-w-full", className)}
            ref={ref}
        >
            {containerWidth == null || containerHeight == null ? null : containerHeight > containerWidth || containerWidth < 640 ? (
                <TimelineMobile
                    cards={timelineCards}
                    userPreferences={userPreferences}
                />
            ) : (
                <TimelineDesktop
                    cards={timelineCards}
                    userPreferences={userPreferences}
                />
            )}
        </div>
    );
}

function TimelineMobile({cards, userPreferences}: {cards: Array<{descriptionTextContentPiece: string; yearTextContentPiece: string}>; userPreferences: UserPreferences}) {
    return (
        <div className="tw-w-full tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2 tw-auto-rows-auto tw-justify-center">
            {cards.map((card, index) => {
                return (
                    <div
                        className={`tw-row-start-${index + 1} tw-col-start-1 tw-w-full tw-h-full tw-grid tw-grid-flow-row tw-grid-rows-[auto_minmax(0,1fr)]`}
                        key={index}
                    >
                        <div className="tw-self-start tw-h-fit">
                            <Circle />
                            <Line orientation="vertical" />
                        </div>

                        {index < cards.length - 1 && <Line />}
                    </div>
                );
            })}
            {cards.map((card, cardIndex) => {
                return (
                    <div className={`tw-row-start-${cardIndex + 1} tw-col-start-2`}>
                        <TimelineCard
                            descriptionText={getVernacularString(card.descriptionTextContentPiece, userPreferences.language)}
                            yearText={getVernacularString(card.yearTextContentPiece, userPreferences.language)}
                            key={cardIndex}
                        />
                    </div>
                );
            })}

            <div
                style={{gridRowStart: 6, gridColumnStart: 1}}
                className="tw-grid tw-grid-flow-row tw-gap-y-[1px] tw-items-end"
            >
                <Line
                    orientation="vertical"
                    className={`!tw-h-[40%] !tw-border-opacity-100`}
                />
                <Line
                    orientation="vertical"
                    className={`!tw-h-[40%] !tw-border-opacity-80`}
                />
                <Line
                    orientation="vertical"
                    className={`!tw-h-[40%] !tw-border-opacity-60`}
                />
                <Line
                    orientation="vertical"
                    className={`!tw-h-[40%] !tw-border-opacity-40`}
                />
                <Line
                    orientation="vertical"
                    className={`!tw-h-[40%] !tw-border-opacity-20`}
                />
            </div>
        </div>
    );
}

function TimelineDesktop({cards, userPreferences}: {cards: Array<{descriptionTextContentPiece: string; yearTextContentPiece: string}>; userPreferences: UserPreferences}) {
    return (
        <div className="tw-w-full tw-grid tw-grid-rows-[repeat(3,auto)] tw-grid-flow-col tw-grid-cols-[auto_minmax(0,1fr)_2rem_auto_minmax(0,1fr)_2rem_auto_minmax(0,1fr)_2rem_auto_minmax(0,1fr)_2rem_auto_minmax(0,1fr)_2rem_auto_minmax(0,1fr)_2rem_auto_minmax(0,1fr)]">
            {cards.map((card, cardIndex) => {
                const cardColStart = 3 * (cardIndex + 1) - 2;
                const circleColStart = 3 * (cardIndex + 1) - 2;
                const lineColStart = 3 * (cardIndex + 1) - 1;
                return (
                    <>
                        <div style={{gridRowStart: 2, gridColumnStart: circleColStart}}>
                            <Circle />
                        </div>

                        {cardIndex < cards.length - 1 && (
                            <div style={{gridRowStart: 2, gridColumnStart: lineColStart, gridColumnEnd: lineColStart + 2}}>
                                <Line orientation="horizontal" />
                            </div>
                        )}

                        <div style={{gridColumnStart: cardColStart, gridColumnEnd: cardColStart + 5, gridRowStart: cardIndex % 2 === 0 ? "1" : "3"}}>
                            <TimelineCard
                                descriptionText={getVernacularString(card.descriptionTextContentPiece, userPreferences.language)}
                                yearText={getVernacularString(card.yearTextContentPiece, userPreferences.language)}
                            />
                        </div>
                    </>
                );
            })}

            <div style={{gridRowStart: 2, gridColumnStart: 17, gridColumnEnd: 19}}>
                <Line orientation="horizontal" />
            </div>

            <div
                style={{gridRowStart: 2, gridColumnStart: 20, gridColumnEnd: 21}}
                className="tw-grid tw-grid-flow-col tw-gap-x-[1px] tw-justify-items-end"
            >
                <Line
                    orientation="horizontal"
                    className={`!tw-w-[40%] !tw-border-t-2 !tw-border-b-0 !tw-border-opacity-100 dark:!tw-border-opacity-100`}
                />
                <Line
                    orientation="horizontal"
                    className={`!tw-w-[40%] !tw-border-t-2 !tw-border-b-0 !tw-border-opacity-80 dark:!tw-border-opacity-80`}
                />
                <Line
                    orientation="horizontal"
                    className={`!tw-w-[40%] !tw-border-t-2 !tw-border-b-0 !tw-border-opacity-60 dark:!tw-border-opacity-60`}
                />
                <Line
                    orientation="horizontal"
                    className={`!tw-w-[40%] !tw-border-t-2 !tw-border-b-0 !tw-border-opacity-40 dark:!tw-border-opacity-40`}
                />
                <Line
                    orientation="horizontal"
                    className={`!tw-w-[40%] !tw-border-t-2 !tw-border-b-0 !tw-border-opacity-20 dark:!tw-border-opacity-20`}
                />
            </div>

            <div style={{gridRowStart: 2, gridColumnStart: 22, visibility: "hidden"}}>
                <Circle />
            </div>
        </div>
    );
}

function Circle() {
    return <div className="tw-h-[0.875rem] tw-w-[0.875rem] tw-border-[0.25rem] tw-border-primary-500-light tw-rounded-full "></div>;
}

function Line({orientation, className}: {orientation: "vertical" | "horizontal"; className?: string}) {
    return (
        <>
            {orientation === "horizontal" ? (
                <>
                    <div
                        className={concatenateNonNullStringsWithSpaces(
                            "tw-border-b-2 tw-border-primary-500-light dark:tw-border-primary-500-dark tw-w-full tw-relative tw-top-1/2 tw-mb-[-1px]",
                            className,
                        )}
                    ></div>
                </>
            ) : (
                <>
                    <div
                        className={concatenateNonNullStringsWithSpaces(
                            "tw-border-l-2 tw-border-primary-500-light dark:tw-border-primary-500-dark tw-h-full tw-relative tw-left-1/2 tw-ml-[-1px]",
                            className,
                        )}
                    ></div>
                </>
            )}
        </>
    );
}

function TimelineCard({descriptionText, yearText}: {descriptionText: string; yearText: string}) {
    return (
        <div className="tw-w-full tw-grid tw-grid-flow-row tw-p-4 lg-bg-secondary-100 tw-rounded-lg tw-my-2 lg-ops-pages-shadow">
            <div className="lg-text-body !lg-text-secondary-900">{descriptionText}</div>

            <VerticalSpacer className="tw-h-2" />

            <div className="lg-bg-primary-500 tw-text-secondary-900-dark tw-px-4 tw-py-2 tw-w-fit tw-rounded-[0.25rem]">{yearText}</div>
        </div>
    );
}
