import {ChevronDoubleDownIcon} from "@heroicons/react/20/solid";
import type {LoaderFunction} from "@remix-run/node";
import {Link} from "@remix-run/react";
import {useResizeDetector} from "react-resize-detector";
import {useLoaderData} from "react-router";
import {StickyBottomBar} from "~/components/bottomBar";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultImageAnimation} from "~/components/defaultImageAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {FaqSectionInternal} from "~/components/faqs";
import {CoverImage} from "~/components/images/coverImage";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {PageScaffold} from "~/components/pageScaffold";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {useEmlbaCarouselWithIndex} from "~/hooks/useEmlbaCarouselWithIndex";
import {ContactUsCta, DealerLocator} from "~/routes";
import {ChooseBestInverterBattery} from "~/routes/__category/inverter-batteries";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {UserPreferences} from "~/typeDefinitions";
import {appendSpaceToString, getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";

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
                breadcrumbs={[{contentId: "af3ba663-53b9-4e18-b3ca-9ea9f80d5134", link: "#"}]}
            >
                <OffersPage
                    userPreferences={userPreferences}
                    utmParameters={utmSearchParameters}
                    pageUrl={pageUrl}
                />
            </PageScaffold>

            <StickyBottomBar userPreferences={userPreferences} />
        </>
    );
}

function OffersPage({
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

            <BestOffers
                userPreferences={userPreferences}
                className="tw-row-start-2 tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <FeaturedProducts
                userPreferences={userPreferences}
                className="tw-row-start-3 tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <div className="tw-row-start-4 tw-col-start-1 tw-col-span-full tw-grid tw-grid-cols-1 tw-grid-rows-2 lg:tw-grid-cols-[minmax(0,2fr),minmax(0,3fr)] lg:tw-grid-rows-1 tw-gap-y-10 lg:tw-gap-x-4 lg:tw-px-[72px] xl:tw-px-[120px] lg:tw-items-center">
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

    return (
        // screen = 48px + 56px + ? + 32px + 56px + 32px + 90px
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-h-[calc(100vh-19.625rem-var(--lg-mobile-ui-height))] lg:tw-h-[calc(100vh-9rem)] tw-min-h-[calc(100vw*7/16)] tw-overflow-hidden",
                className,
            )}
            ref={ref}
        >
            {containerWidth == null || containerHeight == null ? null : (
                <CoverImage
                    relativePath={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/home/1/1-mobile.jpg" : "/livguard/home/1/1-desktop.jpg"}
                    className="tw-row-start-1 tw-col-start-1 tw-row-span-full"
                    key={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/home/1/1-mobile.jpg" : "/livguard/home/1/1-desktop.jpg"}
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
                    pageUrl={pageUrl}
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

export function BestOffers({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const {emblaRef, emblaApi, selectedIndex} = useEmlbaCarouselWithIndex({loop: true});

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-grid tw-grid-rows-[auto,auto,minmax(0,1fr)] tw-grid-cols-1 lg:tw-grid-rows-[auto,minmax(0,1fr)] lg:tw-grid-cols-[auto,minmax(0,1fr)] tw-gap-x-4 tw-gap-y-6",
                className,
            )}
            id="best-offers"
        >
            <h2 className="lg-px-screen-edge lg-text-headline tw-text-center tw-row-start-1 tw-col-start-1 tw-col-span-full lg:tw-row-start-1 lg:tw-col-start-2">
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: appendSpaceToString(getVernacularString("28d2dcd2-f0a8-4314-b3d0-981ddf2444b9", userPreferences.language))}} />
                </DefaultTextAnimation>
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("5b7f29b4-216f-4c13-ac5d-811cc4cb1733", userPreferences.language)}} />
                </DefaultTextAnimation>
            </h2>

            <div className="lg-px-screen-edge tw-grid tw-grid-cols-4 tw-gap-x-4 tw-row-start-2 tw-col-start-1 tw-col-span-full lg:tw-grid-rows-4 lg:tw-grid-cols-1 lg:tw-gap-y-4 lg:tw-row-start-1 lg:tw-row-span-full lg:tw-col-start-1 lg:tw-col-span-1 lg:tw-py-10">
                <ItemBuilder
                    items={[
                        {
                            svgIcon: "/livguard/home/3/2-icon.png",
                            title: "7b226d84-b7f2-4f94-8626-67627cb47c28",
                        },
                        {
                            svgIcon: "/livguard/home/3/3-icon.png",
                            title: "e3f844b6-79ab-47fd-a25c-67fadebeae73",
                        },
                        {
                            svgIcon: "/livguard/home/3/1-icon.png",
                            title: "ddf400a4-3900-4561-85fb-1447c8693412",
                        },
                        {
                            svgIcon: "/livguard/home/3/4-icon.png",
                            title: "46c68fad-1e6e-442c-ab3c-fc09234693d2",
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

function FeaturedProducts({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const featuredProducts = [
        {
            type: "battery",
            slug: "it1560stt",
        },
        {
            type: "inverter",
            slug: "lgs1600",
        },
        {
            type: "battery",
            slug: "it1560stt",
        },
        {
            type: "inverter",
            slug: "lgs1600",
        },
        {
            type: "battery",
            slug: "it1560stt",
        },
        {
            type: "inverter",
            slug: "lgs1600",
        },
    ];

    return (
        <div className={className}>
            <div className="tw-grid tw-auto-cols-[minmax(100%,35rem)]">
                <h2 className="lg-text-headline tw-text-center">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("5ac20616-07fb-44f4-bf6f-c5e16b272eb8", userPreferences.language)}} />
                </h2>

                <div className="tw-bg-yellow-300 tw-h-40" />
            </div>
        </div>
    );
}
