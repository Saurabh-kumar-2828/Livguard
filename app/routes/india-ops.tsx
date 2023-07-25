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
import {getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {CarouselStyle4} from "~/components/carouselStyle4";
import {useEmblaCarouselWithIndex} from "~/hooks/useEmblaCarouselWithIndex";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {DefaultImageAnimation} from "~/components/defaultImageAnimation";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {Menu} from "@headlessui/react";

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
                pageUrl={pageUrl}
            >
                <IndiaOpsPage userPreferences={userPreferences} />
            </PageScaffold>
        </>
    );
};

function IndiaOpsPage({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <>
            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-x-16 tw-items-start tw-justify-center tw-bg-secondary-100-light dark:tw-bg-background-500-dark">
                <HeroSection
                    userPreferences={userPreferences}
                    className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-2 tw-col-start-1 lg:tw-col-span-full" />

                <div className="tw-row-start-3 tw-col-start-1 lg:tw-col-span-full tw-w-full tw-max-w-7xl tw-mx-auto tw-grid tw-grid-cols-1 tw-grid-flow-row lg:tw-grid-cols-2 lg:tw-gap-x-20 lg:lg-px-screen-edge-2">
                    <EnergySolutions
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

                <div className="tw-row-start-5 tw-col-start-1 lg:tw-col-span-full tw-w-full tw-max-w-7xl tw-mx-auto lg:lg-px-screen-edge-2 tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-grid-flow-row lg:tw-gap-x-20">
                    <HeadOffice
                        userPreferences={userPreferences}
                        className="tw-row-start-1 tw-col-start-1"
                    />

                    <VerticalSpacer className="tw-h-10 lg:tw-hidden tw-row-start-2 tw-col-start-1" />

                    <RegionalOffices
                        userPreferences={userPreferences}
                        className="tw-row-start-3 tw-col-start-1 lg:tw-row-start-1 lg:tw-col-start-2 tw-w-full"
                    />
                </div>

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-6 tw-col-start-1 lg:tw-col-span-full" />

                <div className="tw-row-start-7 tw-col-start-1 lg:tw-col-span-full tw-grid tw-grid-flow-row tw-w-full tw-max-w-7xl tw-mx-auto lg-px-screen-edge-2 tw-grid-cols-1 lg:tw-grid-cols-2 lg:tw-gap-x-20">
                    <div
                        className="lg-text-headline tw-text-center tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
                        dangerouslySetInnerHTML={{__html: getVernacularString("2f75c946-eefa-4173-ba70-2bf71894c373", userPreferences.language)}}
                    />
                    <div className="lg-text-headline tw-text-center tw-row-start-2 tw-col-start-1 lg:tw-col-span-full">
                        {getVernacularString("75f36250-5f38-4b37-99a3-39caaee72b31", userPreferences.language)}
                    </div>

                    <VerticalSpacer className="tw-h-4" />

                    <WeAreEverywhere
                        userPreferences={userPreferences}
                        className="lg:tw-row-[span_3_/_span_5]s lg:tw-col-start-1 lg-ops-pages-shadow"
                        showCtaButton={true}
                    />

                    <VerticalSpacer className="tw-h-6 lg:tw-hidden" />

                    <ChooseTheRightInverter
                        userPreferences={userPreferences}
                        className="lg:tw-row-start-4 lg:tw-col-start-2"
                    />
                </div>

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-12 tw-col-start-1 lg:tw-col-span-full" />
            </div>
        </>
    );
}

function HeroSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-flow-row lg:tw-max-h-[fit] tw-text-center", className)}
            ref={ref}
        >
            {containerWidth == null || containerHeight == null ? null : (
                <div className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full">
                    <CoverImage
                        relativePath={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/india-ops/1/banner-mobile.png" : "/livguard/india-ops/1/banner-desktop.jpg"}
                        className="tw-w-full tw-h-full lg:tw-max-h-[70vh]"
                        key={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/india-ops/1/banner-mobile.png" : "/livguard/india-ops/1/banner-desktop.jpg"}
                    />
                </div>
            )}

            <VerticalSpacer className="tw-h-4 lg:tw-h-10" />

            <div className="lg-px-screen-edge-2 lg:tw-text-left tw-w-full tw-max-w-7xl tw-mx-auto">{getVernacularString("434a3b79-cd9d-47e9-8284-f23b7d677d97", userPreferences.language)}</div>
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
                                {/* <FixedWidthImage
                                    relativePath={item.icon}
                                    width="1.5rem"
                                /> */}

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

function WhyLivguard({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-grid tw-grid-flow-row tw-place-items-center lg:tw-grid-rows-[max-content_1.5rem_max-content_2.5rem_max-content] lg:tw-items-start lg-px-screen-edge-2 lg:tw-px-0",
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

            <DefaultTextAnimation className="tw-text-center lg-text-body lg:tw-row-start-3">
                {getVernacularString("e461e21e-79be-4fc9-891c-725ff8dcd336", userPreferences.language)}
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-6 lg:tw-hidden lg:tw-row-start-4" />

            <div className="tw-grid tw-w-full tw-h-full tw-grid-cols-2 tw-grid-rows-2 tw-gap-2 tw-place-items-center lg:tw-row-start-5">
                <div className="tw-w-full tw-row-start-1 tw-col-start-1 lg-bg-secondary-100 tw-text-center tw-rounded-lg tw-px-4 tw-py-4 lg-ops-pages-shadow">
                    <div className="lg-text-title1">{getVernacularString("e416be0f-8181-43bb-9914-bd9fcf072388", userPreferences.language)}</div>
                    <div className="lg-text-icon">{getVernacularString("8452789c-6e24-4998-af36-6e9c54dac50d", userPreferences.language)}</div>
                </div>
                <div className="tw-w-full tw-row-start-1 tw-col-start-2 lg-bg-secondary-100 tw-text-center tw-rounded-lg tw-px-4 tw-py-4 lg-ops-pages-shadow">
                    <div className="lg-text-title1">{getVernacularString("08480ce3-5f9e-4d09-910d-779b36d312d3", userPreferences.language)}</div>
                    <div className="lg-text-icon">{getVernacularString("e81a4f23-4e59-4e14-88bf-a78fa13218e0", userPreferences.language)}</div>
                </div>
                <div className="tw-w-full tw-row-start-2 tw-col-start-1 lg-bg-secondary-100 tw-text-center tw-rounded-lg tw-px-4 tw-py-4 lg-ops-pages-shadow">
                    <div className="lg-text-title1">{getVernacularString("7ab1943f-7e7d-4fbe-8c67-67541b59d8dc", userPreferences.language)}</div>
                    <div className="lg-text-icon">{getVernacularString("36b96437-768d-44b7-9715-eb9658574b6d", userPreferences.language)}</div>
                </div>
                <div className="tw-w-full tw-row-start-2 tw-col-start-2 lg-bg-secondary-100 tw-text-center tw-rounded-lg tw-px-4 tw-py-4 lg-ops-pages-shadow">
                    <div className="lg-text-title1">{getVernacularString("2b763748-e9c4-4f29-9063-84844e38ab13", userPreferences.language)}</div>
                    <div className="lg-text-icon">{getVernacularString("b002d357-ffa0-43d2-b9b9-ced844e6d0c5", userPreferences.language)}</div>
                </div>
            </div>
        </div>
    );
}

function HeadOffice({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge-2 lg:tw-px-0 tw-h-full", className)}>
            <div className="tw-grid tw-py-8 tw-px-4 tw-grid-flow-row tw-place-items-center lg:tw-auto-rows-max lg:tw-items-start lg-bg-secondary-100 lg-ops-pages-shadow tw-rounded-lg tw-h-full">
                <DefaultTextAnimation>
                    <div
                        dangerouslySetInnerHTML={{__html: getVernacularString("c984cd4a-eae3-4584-a958-8b18d1df3f0e", userPreferences.language)}}
                        className="tw-text-center lg-text-headline"
                    />
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-4" />

                <div className="tw-grid tw-grid-flow-row tw-px-3 tw-rounded-lg">
                    <div>
                        <FullWidthImage
                            relativePath="/livguard/india-ops/4/head-office.png"
                            className="tw-rounded-lg"
                        />
                    </div>

                    <VerticalSpacer className="tw-h-4" />

                    <div className="tw-text-center lg-text-title1">{getVernacularString("a6e58719-05ec-4bfb-8b33-cea19d8e172e", userPreferences.language)}</div>

                    <VerticalSpacer className="tw-h-2" />

                    <div
                        className="tw-text-center lg-text-body"
                        dangerouslySetInnerHTML={{__html: getVernacularString("a0f90939-327f-4308-9150-4896b4608ecd", userPreferences.language)}}
                    />
                </div>
            </div>
        </div>
    );
}

function RegionalOffices({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const offices = [
        {
            imageRelativeUrl: "/livguard/india-ops/5/regional-office.png",
            titleTextContentPiece: "49784df9-4213-42cb-b013-6360553d726b",
            descriptionTextContentPiece: "8feca67b-7fe9-4672-a4cc-cf958dc8fdf8",
        },
        {
            imageRelativeUrl: "/livguard/india-ops/5/regional-office.png",
            titleTextContentPiece: "49784df9-4213-42cb-b013-6360553d726b",
            descriptionTextContentPiece: "8feca67b-7fe9-4672-a4cc-cf958dc8fdf8",
        },
        {
            imageRelativeUrl: "/livguard/india-ops/5/regional-office.png",
            titleTextContentPiece: "49784df9-4213-42cb-b013-6360553d726b",
            descriptionTextContentPiece: "8feca67b-7fe9-4672-a4cc-cf958dc8fdf8",
        },
    ];

    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge-2 lg:tw-px-0", className)}>
            <div className="tw-rounded-lg tw-py-8 tw-px-4 lg-bg-secondary-100 lg-ops-pages-shadow tw-grid tw-grid-flow-row tw-auto-rows-auto tw-h-full tw-w-full">
                <DefaultElementAnimation className="tw-px-3">
                    <div
                        className="tw-text-center lg-text-headline"
                        dangerouslySetInnerHTML={{__html: getVernacularString("b98270e9-5f07-47d8-9cd9-67235c9e92d7", userPreferences.language)}}
                    />
                </DefaultElementAnimation>

                <VerticalSpacer className="tw-h-4" />

                <CarouselStyle4
                    items={offices.map((item, itemIndex) => {
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

                                <div className="lg-text-title2 tw-text-center">{getVernacularString(item.titleTextContentPiece, userPreferences.language)}</div>

                                <VerticalSpacer className="lg:tw-h-2" />

                                <div
                                    className="lg-text-body tw-text-center"
                                    dangerouslySetInnerHTML={{__html: getVernacularString(item.descriptionTextContentPiece, userPreferences.language)}}
                                />
                            </div>
                        );
                    })}
                    slidesContainerClassName="!tw-auto-cols-[100%]"
                />
            </div>
        </div>
    );
}

function WeAreEverywhere({userPreferences, showCtaButton, className}: {userPreferences: UserPreferences; showCtaButton: boolean; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("", className)}>
            <div className="tw-relative lg-bg-secondary-100 tw-rounded-lg tw-h-[350px] tw-overflow-hidden lg:tw-h-[31.25rem]">
                <div className="tw-flex tw-flex-col tw-absolute tw-m-auto tw-top-0 tw-left-0 tw-right-0 tw-bottom-0 tw-justify-center tw-items-center">
                    <div className="tw-absolute tw-inset-0">
                        <CoverImage relativePath={userPreferences.theme == Theme.Dark ? "/livguard/home/10/1-dark.jpg" : "/livguard/home/10/1-light.jpg"} />
                    </div>

                    <div className="tw-z-10 lg-text-headline tw-text-center">
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("92897a67-ff1d-4e6c-804f-4f69dd03db4d", userPreferences.language)}} />
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("53b219cb-fdee-4ea2-aff4-858f5c63aed0", userPreferences.language)}} />
                    </div>

                    <VerticalSpacer className="tw-h-1" />

                    <div className="tw-z-10 lg-text-title2">{getVernacularString("24bb85a9-42af-4302-b21b-dece9f9d0d21", userPreferences.language)}</div>

                    {showCtaButton && (
                        <>
                            <VerticalSpacer className="tw-h-6" />

                            <Link
                                to="/dealer-for-inverters-and-batteries"
                                className="tw-z-10 lg-cta-button"
                            >
                                {getVernacularString("db232019-b302-4eb7-a10c-05b17e72a800", userPreferences.language)}
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

function ChooseTheRightInverter({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_1rem_auto_1rem_auto_auto_minmax(0,1fr)]", className)}>
            <div className="tw-row-start-2 tw-text-center lg-text-headline">{getVernacularString("56fb901a-105b-41f6-9f28-5352624665ea", userPreferences.language)}</div>
            <div
                className="tw-row-start-3 tw-text-center lg-text-headline"
                dangerouslySetInnerHTML={{__html: getVernacularString("2c808484-f637-4570-8825-b0e8d877a58f", userPreferences.language)}}
            />
            <div className="tw-row-start-5 tw-text-center lg-px-screen-edge-2 lg:tw-px-0">{getVernacularString("eb5b90de-47c1-423e-8f2c-9945498c0d5d", userPreferences.language)}</div>

            <VerticalSpacer className="tw-row-start-6 tw-h-6" />

            <DownloadCatalogueButton
                userPreferences={userPreferences}
                className="tw-row-start-7 tw-place-self-center tw-w-full tw-grid tw-justify-items-center"
            />
        </div>
    );
}

function DownloadCatalogueButton({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <Menu
            as="div"
            className={concatenateNonNullStringsWithSpaces("tw-relative tw-z-[2]", className)}
        >
            <Menu.Button className="lg-cta-button tw-w-fit">{getVernacularString("47f28213-0a21-4782-b006-cf696dec0758", userPreferences.language)}</Menu.Button>

            <Menu.Items className="tw-absolute tw-top-12 tw-left-0 lg-bg-background-500 tw-border-2 tw-border-solid tw-border-primary-500-light tw-rounded-lg tw-grid tw-grid-cols-1 tw-w-full tw-px-4">
                <Menu.Item>
                    <a
                        href="/dummy"
                        download
                        className="tw-w-fit tw-py-2 lg-text-primary-500"
                        target="_blank"
                    >
                        {getVernacularString("7d4dc76d-c541-4f5c-af15-3ec0f0ef4487", userPreferences.language)}
                    </a>
                </Menu.Item>

                <div className="tw-w-full tw-h-px lg-bg-secondary-300" />

                <Menu.Item>
                    <a
                        href="/dummy"
                        download
                        className="tw-w-fit tw-py-2 lg-text-primary-500"
                        target="_blank"
                    >
                        {getVernacularString("b3026d95-83f1-4957-82b0-80480b7a31e3", userPreferences.language)}
                    </a>
                </Menu.Item>

                <div className="tw-w-full tw-h-px lg-bg-secondary-300" />

                <Menu.Item>
                    <a
                        href="/dummy"
                        download
                        className="tw-w-fit tw-py-2 lg-text-primary-500"
                        target="_blank"
                    >
                        {getVernacularString("d82b18b5-075b-40f8-a295-142db690894b", userPreferences.language)}
                    </a>
                </Menu.Item>

                <div className="tw-w-full tw-h-px lg-bg-secondary-300" />

                <Menu.Item>
                    <a
                        href="/dummy"
                        download
                        className="tw-w-fit tw-py-2 lg-text-primary-500"
                        target="_blank"
                    >
                        {getVernacularString("3850de5b-b7ba-4b2a-863a-bfb9416da0e6", userPreferences.language)}
                    </a>
                </Menu.Item>

                <div className="tw-w-full tw-h-px lg-bg-secondary-300" />

                <Menu.Item>
                    <a
                        href="/dummy"
                        download
                        className="tw-w-fit tw-py-2 lg-text-primary-500"
                        target="_blank"
                    >
                        {getVernacularString("d1aa9371-f547-41b6-9d8a-650971f771f8", userPreferences.language)}
                    </a>
                </Menu.Item>
            </Menu.Items>
        </Menu>
    );
}
