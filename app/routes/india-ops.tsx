import {Menu} from "@headlessui/react";
import type {LoaderFunction, V2_MetaFunction} from "@remix-run/node";
import {Link, useLoaderData} from "@remix-run/react";
import {useEffect, useContext} from "react";
import {useInView} from "react-intersection-observer";
import {CarouselStyle4} from "~/components/carouselStyle4";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultImageAnimation} from "~/components/defaultImageAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {PageScaffold} from "~/components/pageScaffold";
import {SecondaryNavigation} from "~/components/secondaryNavigation";
import {SecondaryNavigationControllerContext} from "~/contexts/secondaryNavigationControllerContext";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {ImageCdnProvider, ImageMetadata} from "~/common--type-definitions/typeDefinitions";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {useEmblaCarouselWithIndex} from "~/hooks/useEmblaCarouselWithIndex";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {SecondaryNavigationController, useSecondaryNavigationController} from "~/hooks/useSecondaryNavigationController";
import {ContactUsCta} from "~/routes";
import {DealerLocator} from "~/reusableSections/dealerLocator";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {UserPreferences} from "~/typeDefinitions";
import {Language} from "~/typeDefinitions";
import {getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest, secondaryNavThreshold} from "~/utilities";
import {getContentGenerator} from "~/vernacularProvider";
import {getVernacularFromBackend} from "~/backend/vernacularProvider.server";
import {ContentProviderContext} from "~/contexts/contentProviderContext";
import {getImageMetadataLibraryFromBackend, getMetadataForImageServerSide} from "~/backend/imageMetaDataLibrary.server";
import {ImageProviderContext} from "~/contexts/imageMetaDataContext";

export const meta: V2_MetaFunction = ({data: loaderData}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = loaderData.userPreferences;
    if (userPreferences.language == Language.English) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/india-ops",
            },
            {
                title: "Livguard's Indian Operations: Powering a Bright Tomorrow",
            },
            {
                name: "description",
                content: "Explore Livguard's Indian operations page to discover how we are shaping a brighter future through innovation, reliability, and commitment.",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/india-ops",
            },
            {
                property: "og:title",
                content: "Livguard's Indian Operations: Powering a Bright Tomorrow",
            },
            {
                property: "og:description",
                content: "Explore Livguard's Indian operations page to discover how we are shaping a brighter future through innovation, reliability, and commitment.",
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
    } else if (userPreferences.language == Language.Hindi) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/india-ops",
            },
            {
                title: "Livguard's Indian Operations: Powering a Bright Tomorrow",
            },
            {
                name: "description",
                content: "Explore Livguard's Indian operations page to discover how we are shaping a brighter future through innovation, reliability, and commitment.",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/india-ops",
            },
            {
                property: "og:title",
                content: "Livguard's Indian Operations: Powering a Bright Tomorrow",
            },
            {
                property: "og:description",
                content: "Explore Livguard's Indian operations page to discover how we are shaping a brighter future through innovation, reliability, and commitment.",
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

    const vernacularData = getVernacularFromBackend("indiaOpsPage", userPreferences.language);
    const imageMetaDataLibrary = getImageMetadataLibraryFromBackend("indiaOpsPage");
    const ogBanner = getAbsolutePathForRelativePath(getMetadataForImageServerSide("/livguard/india-ops/india-ops-og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null);

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

export default () => {
    const {userPreferences, redirectTo, pageUrl, vernacularData, imageMetaDataLibrary} = useLoaderData() as LoaderData;

    const utmSearchParameters = useUtmSearchParameters();
    const secondaryNavigationController = useSecondaryNavigationController();

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
                        breadcrumbs={[
                            {contentId: "cfab263f-0175-43fb-91e5-fccc64209d36", link: "/"},
                            {contentId: "3d7d661c-5848-4670-a0bb-3990374c7303", link: "#"},
                        ]}
                        pageUrl={pageUrl}
                        secondaryNavigationController={secondaryNavigationController}
                    >
                        <SecondaryNavigationControllerContext.Provider value={secondaryNavigationController}>
                            <IndiaOpsPage
                                userPreferences={userPreferences}
                                pageUrl={pageUrl}
                                secondaryNavigationController={secondaryNavigationController}
                            />
                        </SecondaryNavigationControllerContext.Provider>
                    </PageScaffold>
                </ContentProviderContext.Provider>
            </ImageProviderContext.Provider>
        </>
    );
};

function IndiaOpsPage({userPreferences, pageUrl, secondaryNavigationController}: {userPreferences: UserPreferences; pageUrl: string; secondaryNavigationController?: SecondaryNavigationController}) {
    const contentData = useContext(ContentProviderContext);
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);

    return (
        <>
            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-x-16 tw-items-start tw-justify-center">
                <HeroSection
                    userPreferences={userPreferences}
                    className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
                    pageUrl={pageUrl}
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-2 tw-col-start-1 lg:tw-col-span-full" />

                <div className="tw-row-start-3 tw-col-start-1 lg:tw-col-span-full tw-w-full tw-max-w-7xl tw-mx-auto lg:lg-px-screen-edge-2 tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-grid-flow-row lg:tw-gap-x-20">
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

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-4 tw-col-start-1 lg:tw-col-span-full" />

                <div className="tw-row-start-5 tw-col-start-1 lg:tw-col-span-full tw-w-full tw-max-w-7xl tw-mx-auto tw-grid tw-grid-cols-1 tw-grid-flow-row lg:tw-grid-cols-2 lg:tw-gap-x-20 lg:lg-px-screen-edge-2">
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

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-6 tw-col-start-1 lg:tw-col-span-full" />

                <div className="tw-row-start-7 tw-col-start-1 lg:tw-col-span-full tw-grid tw-grid-flow-row tw-w-full tw-max-w-7xl tw-mx-auto lg-px-screen-edge-2 tw-grid-cols-1 lg:tw-grid-cols-2 lg:tw-gap-x-20">
                    <div
                        className="lg-text-headline tw-text-center tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("2f75c946-eefa-4173-ba70-2bf71894c373")}}
                    />
                    <div className="lg-text-headline tw-text-center tw-row-start-2 tw-col-start-1 lg:tw-col-span-full">{contentData.getContent("75f36250-5f38-4b37-99a3-39caaee72b31")}</div>

                    <VerticalSpacer className="tw-h-4" />

                    <DealerLocator
                        userPreferences={userPreferences}
                        className="lg:tw-row-[span_3_/_span_5]s lg:tw-col-start-1"
                        secondaryNavigationName="0cb6d442-7df4-4272-a36d-9f956bdd8a54"
                        showCtaButton={true}
                    />

                    <VerticalSpacer className="tw-h-6 lg:tw-hidden" />

                    <ChooseTheRightInverter
                        userPreferences={userPreferences}
                        className="lg:tw-row-start-4 lg:tw-col-start-2"
                        pageUrl={pageUrl}
                    />
                </div>

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-12 tw-col-start-1 lg:tw-col-span-full" />
            </div>
        </>
    );
}

function HeroSection({userPreferences, className, pageUrl}: {userPreferences: UserPreferences; className?: string; pageUrl: string}) {
    const contentData = useContext(ContentProviderContext);
    const utmParameters = useUtmSearchParameters();
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);
    return (
        // <div className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-flow-row lg:tw-max-h-[fit] tw-text-center", className)}>
        //     <div className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full">
        //         {isScreenSizeBelow == null ? null : (
        //             <FullWidthImage
        //                 relativePath={isScreenSizeBelow ? "/livguard/india-ops/1/mobile-banner.jpg" : "/livguard/india-ops/1/desktop-banner.jpg"}
        //                 key={isScreenSizeBelow ? "/livguard/india-ops/1/mobile-banner.jpg" : "/livguard/india-ops/1/desktop-banner.jpg"}
        //             />
        //         )}
        //     </div>

        //     <div className="tw-col-start-1 lg:tw-row-start-3 tw-row-start-2 tw-row-span-2 tw-grid tw-items-center">
        //         <PowerThatEmpowersLives
        //             userPreferences={userPreferences}
        //             utmParameters={utmParameters}
        //             pageUrl={pageUrl}
        //         />
        //     </div>
        // </div>
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-aspect-square lg:tw-aspect-[1280/380] tw-grid tw-grid-cols-1 lg:tw-grid-rows-[minmax(0,1fr)_auto_minmax(0,1fr)] tw-grid-rows-[auto_1rem_auto] tw-items-center tw-text-center",
                className,
            )}
        >
            <div className="tw-row-start-1 lg:tw-row-span-full tw-row-span-2 tw-col-start-1 tw-col-span-full">
                {isScreenSizeBelow == null ? null : (
                    <>
                        <FullWidthImage
                            relativePath={isScreenSizeBelow ? "/livguard/india-ops/1/mobile-banner.jpg" : "/livguard/india-ops/1/desktop-banner.jpg"}
                            key={isScreenSizeBelow ? "/livguard/india-ops/1/mobile-banner.jpg" : "/livguard/india-ops/1/desktop-banner.jpg"}
                        />
                    </>
                )}
            </div>
            <div className="tw-col-start-1 lg:tw-row-start-3 tw-row-start-2 tw-row-span-2 tw-grid tw-items-center">
                <PowerThatEmpowersLives
                    userPreferences={userPreferences}
                    utmParameters={utmParameters}
                    pageUrl={pageUrl}
                />
            </div>

            {/* <VerticalSpacer className="tw-h-4 lg:tw-h-10" /> */}

            {/* <div className="lg-px-screen-edge-2 tw-w-full tw-max-w-7xl tw-mx-auto">{contentData.getContent("434a3b79-cd9d-47e9-8284-f23b7d677d97")}</div> */}
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
    const contentData = useContext(ContentProviderContext);
    return (
        <div className="tw-w-4/5 lg:tw-w-full tw-place-self-center tw-relative tw-bottom-4 tw-z-[2] tw-p-4 tw-rounded-lg tw-row-start-2 tw-col-start-1 max-lg:lg-bg-secondary-100 max-lg:lg-card lg:!tw-bg-transparent tw-grid tw-grid-rows-[repeat(4,auto)] max-lg:lg-ops-pages-shadow">
            <div className="lg:tw-row-start-1 lg:tw-col-start-1 lg:tw-z-[2] lg:tw-justify-self-start lg:tw-ml-20 lg-text-headline lg:tw-text-secondary-900-dark">
                {contentData.getContent("d1c50aa6-1529-4fe4-8e3b-b526888ec7e9")}
            </div>
            <div className="lg:tw-row-start-2 lg:tw-col-start-1 lg:tw-z-[2] lg:tw-justify-self-start lg:tw-ml-20 lg-text-title2 lg:tw-text-secondary-900-dark">
                {contentData.getContent("ac1d1b59-b34e-4bad-8b06-bf9de7999447")}
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

function EnergySolutions({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    const {emblaRef, emblaApi, selectedIndex} = useEmblaCarouselWithIndex({loop: true});
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "energy-solutions": {
                humanReadableName: contentData.getContent("f73b94be-d44a-48f8-a1b7-623071cf1fe0"),
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
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent("f0a9f643-18b1-4220-ab20-07882267fb84")}} />
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
                                headingContent2: `${contentData.getContent("32f80d9c-f431-45c9-9791-4fae42e9a37d")}`,
                                content: `${contentData.getContent("a8d7b8ac-859d-4c52-ab5f-3dbc5e310af9")}`,
                                buttontext: `${contentData.getContent("homeS3Tab2BT")}`,
                                buttonLink: "/inverter-for-home",
                                target: null,
                            },
                            {
                                image: "/livguard/home/3/3.jpg",
                                headingContent1: `${contentData.getContent("homeS3Tab3HC1")}`,
                                headingContent2: `${contentData.getContent("homeS3Tab3HC2")}`,
                                content: `${contentData.getContent("9c7f2168-03a6-4d44-8a52-829135aab8fb")}`,
                                buttontext: `${contentData.getContent("homeS3Tab3BT")}`,
                                buttonLink: "/inverter-batteries",
                                target: null,
                            },
                            {
                                image: "/livguard/home/3/1.jpg",
                                headingContent1: `${contentData.getContent("homeS3Tab1HC1")}`,
                                headingContent2: `${contentData.getContent("homeS3Tab1HC2")}`,
                                content: `${contentData.getContent("81c86672-33a4-4aae-80e8-da18b67ecdbc")}`,
                                buttontext: `${contentData.getContent("homeS3Tab1BT")}`,
                                buttonLink: "/battery-finder",
                                target: null,
                            },
                            {
                                image: "/livguard/home/3/4.jpg",
                                headingContent1: `${contentData.getContent("homeS3Tab4HC1")}`,
                                headingContent2: `${contentData.getContent("homeS3Tab4HC2")}`,
                                content: `${contentData.getContent("164717a3-598c-477c-99b9-cf2f40646026")}`,
                                buttontext: `${contentData.getContent("homeS3Tab4BT")}`,
                                buttonLink: "https://www.livguardsolar.com/",
                                target: "_blank",
                            },
                            {
                                image: "/livguard/home/3/5.jpg",
                                headingContent1: `${contentData.getContent("homeS3Tab5HC1")}`,
                                headingContent2: `${contentData.getContent("homeS3Tab5HC2")}`,
                                content: `${contentData.getContent("ef976dde-0707-440e-b576-c3722ca507a2")}`,
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

function WhyLivguard({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "why-livguard": {
                humanReadableName: contentData.getContent("16d054b7-e1e8-4a21-b9b9-b99c4ec7ad97"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-grid tw-grid-flow-row tw-place-items-center lg:tw-grid-rows-[max-content_1.5rem_max-content_2.5rem_max-content] lg:tw-items-start lg-px-screen-edge-2 lg:tw-px-0",
                className,
            )}
            id="why-livguard"
            ref={sectionRef}
        >
            <DefaultTextAnimation>
                <div
                    dangerouslySetInnerHTML={{__html: contentData.getContent("1c837763-6546-4d29-a8cf-53ea73f3fe0b")}}
                    className="tw-text-center lg-text-headline lg:tw-row-start-1"
                />
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-4 lg:tw-hidden lg:tw-row-start-2" />

            <DefaultTextAnimation className="tw-text-center lg-text-body lg:tw-row-start-3">{contentData.getContent("e461e21e-79be-4fc9-891c-725ff8dcd336")}</DefaultTextAnimation>

            <VerticalSpacer className="tw-h-6 lg:tw-hidden lg:tw-row-start-4" />

            <div className="tw-grid tw-w-full tw-h-full tw-grid-cols-2 tw-grid-rows-2 tw-gap-2 tw-place-items-center lg:tw-row-start-5">
                <div className="tw-w-full tw-row-start-1 tw-col-start-1 lg-card tw-text-center tw-rounded-lg tw-px-4 tw-py-4 lg-ops-pages-shadow">
                    <div className="lg-text-title1">{contentData.getContent("e416be0f-8181-43bb-9914-bd9fcf072388")}</div>
                    <div className="lg-text-icon">{contentData.getContent("8452789c-6e24-4998-af36-6e9c54dac50d")}</div>
                </div>
                <div className="tw-w-full tw-row-start-1 tw-col-start-2 lg-card tw-text-center tw-rounded-lg tw-px-4 tw-py-4 lg-ops-pages-shadow">
                    <div className="lg-text-title1">{contentData.getContent("08480ce3-5f9e-4d09-910d-779b36d312d3")}</div>
                    <div className="lg-text-icon">{contentData.getContent("e81a4f23-4e59-4e14-88bf-a78fa13218e0")}</div>
                </div>
                <div className="tw-w-full tw-row-start-2 tw-col-start-1 lg-card tw-text-center tw-rounded-lg tw-px-4 tw-py-4 lg-ops-pages-shadow">
                    <div className="lg-text-title1">{contentData.getContent("7ab1943f-7e7d-4fbe-8c67-67541b59d8dc")}</div>
                    <div className="lg-text-icon">{contentData.getContent("36b96437-768d-44b7-9715-eb9658574b6d")}</div>
                </div>
                <div className="tw-w-full tw-row-start-2 tw-col-start-2 lg-card tw-text-center tw-rounded-lg tw-px-4 tw-py-4 lg-ops-pages-shadow">
                    <div className="lg-text-title1">{contentData.getContent("2b763748-e9c4-4f29-9063-84844e38ab13")}</div>
                    <div className="lg-text-icon">{contentData.getContent("b002d357-ffa0-43d2-b9b9-ced844e6d0c5")}</div>
                </div>
            </div>
        </div>
    );
}

function HeadOffice({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "head-office": {
                humanReadableName: contentData.getContent("bd35a39d-092b-4a59-bb3b-6f60086a9e01"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge-2 lg:tw-px-0 tw-h-full", className)}
            id="head-office"
            ref={sectionRef}
        >
            <div className="tw-grid tw-py-8 tw-px-4 tw-grid-flow-row tw-place-items-center lg:tw-auto-rows-max lg:tw-items-start lg-card tw-rounded-lg tw-h-full">
                <DefaultTextAnimation>
                    <div
                        dangerouslySetInnerHTML={{__html: contentData.getContent("c984cd4a-eae3-4584-a958-8b18d1df3f0e")}}
                        className="tw-text-center lg-text-headline"
                    />
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-4" />

                <div className="tw-grid tw-grid-flow-row tw-px-3 tw-rounded-lg">
                    <div>
                        <FullWidthImage
                            relativePath="/livguard/india-ops/4/head-office.jpg"
                            className="tw-rounded-lg"
                        />
                    </div>

                    <VerticalSpacer className="tw-h-4" />

                    <div className="tw-text-center lg-text-title1">{contentData.getContent("a6e58719-05ec-4bfb-8b33-cea19d8e172e")}</div>

                    <VerticalSpacer className="tw-h-2" />

                    <div
                        className="tw-text-center lg-text-body"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("a0f90939-327f-4308-9150-4896b4608ecd")}}
                    />
                </div>
            </div>
        </div>
    );
}

function RegionalOffices({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "regional-office": {
                humanReadableName: contentData.getContent("ed9a0f62-e79d-49e0-a10f-784e4587a699"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    const offices = [
        {
            imageRelativeUrl: "/livguard/india-ops/5/1.jpg",
            titleTextContentPiece: "49784df9-4213-42cb-b013-6360553d726b",
            descriptionTextContentPiece: "0fc1ad43-da71-4c4b-b96d-dae763f48bf8",
        },
        {
            imageRelativeUrl: "/livguard/india-ops/5/2.jpg",
            titleTextContentPiece: "49784df9-4213-42cb-b013-6360553d726b",
            descriptionTextContentPiece: "c39eae4e-012c-45cc-aaf9-7bc683670209",
        },
        {
            imageRelativeUrl: "/livguard/india-ops/5/3.jpg",
            titleTextContentPiece: "49784df9-4213-42cb-b013-6360553d726b",
            descriptionTextContentPiece: "e086e9d3-e71a-433c-809e-7a85951631d9",
        },
    ];

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge-2 lg:tw-px-0", className)}
            id="regional-office"
            ref={sectionRef}
        >
            <div className="tw-rounded-lg tw-py-8 tw-px-4 lg-card tw-grid tw-grid-flow-row tw-auto-rows-auto tw-h-full tw-w-full">
                <DefaultElementAnimation className="tw-px-3">
                    <div
                        className="tw-text-center lg-text-headline"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("b98270e9-5f07-47d8-9cd9-67235c9e92d7")}}
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

                                <div className="lg-text-title2 tw-text-center">{contentData.getContent(item.titleTextContentPiece)}</div>

                                <VerticalSpacer className="lg:tw-h-2" />

                                <div
                                    className="lg-text-body tw-text-center"
                                    dangerouslySetInnerHTML={{__html: contentData.getContent(item.descriptionTextContentPiece)}}
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

function ChooseTheRightInverter({userPreferences, className, pageUrl}: {userPreferences: UserPreferences; className?: string; pageUrl: string}) {
    const contentData = useContext(ContentProviderContext);
    const utmParameters = useUtmSearchParameters();
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "your-guide": {
                humanReadableName: contentData.getContent("2223a612-f480-45b4-86fb-d5d02dc1a69d"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_1rem_auto_1rem_auto_auto_minmax(0,1fr)]", className)}
            id="your-guide"
            ref={sectionRef}
        >
            <div
                className="tw-row-start-2 tw-text-center lg-text-headline"
                dangerouslySetInnerHTML={{__html: contentData.getContent("56fb901a-105b-41f6-9f28-5352624665ea")}}
            />
            <div
                className="tw-row-start-3 tw-text-center lg-text-headline"
                dangerouslySetInnerHTML={{__html: contentData.getContent("2c808484-f637-4570-8825-b0e8d877a58f")}}
            />
            <div className="tw-row-start-5 tw-text-center lg-px-screen-edge-2 lg:tw-px-0">{contentData.getContent("eb5b90de-47c1-423e-8f2c-9945498c0d5d")}</div>

            <VerticalSpacer className="tw-row-start-6 tw-h-6" />

            {/* <div className="tw-row-start-7 tw-place-self-center tw-w-full tw-grid lg:tw-grid-cols-2 lg:tw-gap-x-4">
                <button className="tw-row-start-7 tw-place-self-center tw-w-full tw-grid tw-justify-items-center lg-cta-outline-button lg-cta-outline-button-transition">Download Catalogue</button>

                <ContactUsCta
                    userPreferences={userPreferences}
                    textVernacId="d0a88af5-fba8-43cd-bda5-813e7363db53"
                    utmParameters={utmParameters}
                    pageUrl={pageUrl}
                    className="tw-row-start-7"
                />
            </div> */}
            <div className="tw-row-start-7 tw-grid tw-p-4 tw-justify-center tw-w-full">
                <div className="tw-w-fit tw-grid tw-grid-rows-2 lg:tw-grid-rows-1 lg:tw-grid-cols-2 tw-gap-4 tw-grid-flow-col">
                    {/* <a
                        href="https://www.livguard.com/static-assets/livguard-ib-leaflet.pdf"
                        download
                        target="_blank"
                        className="lg-cta-outline-button lg-cta-outline-button-category-section-transition tw-py-3 tw-rounded-full tw-grid tw-grid-cols-[auto_1rem_auto_minmax(0,1fr)] tw-group tw-h-full tw-px-4"
                    >
                        <img
                            className="tw-row-start-1 tw-col-start-1 tw-h-4 tw-w-4 lg:tw-h-6 lg:tw-w-6 tw-place-self-center tw-transition-colors tw-duration-200 group-hover:tw-brightness-0 group-hover:tw-invert"
                            src="https://files.growthjockey.com/livguard/icons/stabilizer/download-catalogue.svg"
                        />
                        <div className="tw-row-start-1 tw-col-start-3 tw-flex tw-flex-row tw-items-center lg-text-body group-hover:!tw-text-secondary-100-light tw-transition-colors tw-duration-200">
                            {contentData.getContent("51ae4bbd-0f66-42bc-b031-cc3e9dc4dc26")}
                        </div>
                    </a> */}
                    <DownloadCatalogueButton
                        userPreferences={userPreferences}
                        className=""
                    />
                    <ContactUsCta
                        userPreferences={userPreferences}
                        textVernacId="d0a88af5-fba8-43cd-bda5-813e7363db53"
                        utmParameters={utmParameters}
                        pageUrl={pageUrl}
                        className="tw-h-full tw-w-full tw-grid tw-place-items-center"
                        buttonClassName="tw-w-full tw-h-full"
                    />
                </div>
            </div>
        </div>
    );
}

function DownloadCatalogueButton({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <Menu
            as="div"
            className={concatenateNonNullStringsWithSpaces("tw-relative tw-z-[2]", className)}
        >
            {/* <Menu.Button className="lg-cta-outline-button lg-cta-outline-button-category-section-transition tw-w-fit">
                {contentData.getContent("47f28213-0a21-4782-b006-cf696dec0758")}
            </Menu.Button> */}
            <Menu.Button className="tw-w-max lg-cta-outline-button lg-cta-outline-button-category-section-transition-ops tw-py-3 tw-rounded-full tw-grid tw-grid-cols-[auto_1rem_auto_minmax(0,1fr)] tw-group tw-h-full tw-px-4">
                <img
                    className="tw-row-start-1 tw-col-start-1 tw-h-4 tw-w-4 lg:tw-h-6 lg:tw-w-6 tw-place-self-center tw-transition-colors tw-duration-200 group-hover:tw-brightness-0 group-hover:tw-invert"
                    src="https://files.growthjockey.com/livguard/icons/stabilizer/download-catalogue.svg"
                />
                <div className="tw-row-start-1 tw-col-start-3 tw-flex tw-flex-row tw-items-center lg-text-body group-hover:!tw-text-secondary-100-light tw-transition-colors tw-duration-200">
                    {contentData.getContent("51ae4bbd-0f66-42bc-b031-cc3e9dc4dc26")}
                </div>
            </Menu.Button>

            <Menu.Items className="tw-absolute tw-top-12 tw-left-0 lg-bg-secondary-100 tw-border-2 tw-border-solid tw-border-primary-500-light tw-rounded-lg tw-grid tw-grid-cols-1 tw-w-full tw-px-4">
                <Menu.Item>
                    <a
                        href="https://www.livguard.com/static-assets/leaflet-automotive.pdf"
                        download
                        className="tw-w-fit tw-py-2 lg-text-primary-500"
                        target="_blank"
                    >
                        {contentData.getContent("7d4dc76d-c541-4f5c-af15-3ec0f0ef4487")}
                    </a>
                </Menu.Item>

                <div className="tw-w-full tw-h-px lg-bg-secondary-300" />

                <Menu.Item>
                    <a
                        href="https://www.livguard.com/static-assets/livguard-ib-leaflet.pdf"
                        download
                        className="tw-w-fit tw-py-2 lg-text-primary-500"
                        target="_blank"
                    >
                        {contentData.getContent("b3026d95-83f1-4957-82b0-80480b7a31e3")}
                    </a>
                </Menu.Item>

                <div className="tw-w-full tw-h-px lg-bg-secondary-300" />

                <Menu.Item>
                    <a
                        href="https://www.livguard.com/static-assets/leaflet-hkva.pdf"
                        download
                        className="tw-w-fit tw-py-2 lg-text-primary-500"
                        target="_blank"
                    >
                        {contentData.getContent("cbff5c39-b943-438a-b015-e71287f37b93")}
                    </a>
                </Menu.Item>

                <div className="tw-w-full tw-h-px lg-bg-secondary-300" />

                <Menu.Item>
                    <a
                        href="https://www.livguard.com/static-assets/international-business/livguard-solar.pdf"
                        download
                        className="tw-w-fit tw-py-2 lg-text-primary-500"
                        target="_blank"
                    >
                        {contentData.getContent("3850de5b-b7ba-4b2a-863a-bfb9416da0e6")}
                    </a>
                </Menu.Item>

                <div className="tw-w-full tw-h-px lg-bg-secondary-300" />

                {/* <Menu.Item>
                    <a
                        href="/dummy"
                        download
                        className="tw-w-fit tw-py-2 lg-text-primary-500"
                        target="_blank"
                    >
                        {contentData.getContent("d1aa9371-f547-41b6-9d8a-650971f771f8")}
                    </a>
                </Menu.Item> */}
            </Menu.Items>
        </Menu>
    );
}
