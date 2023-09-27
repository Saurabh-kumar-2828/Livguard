import type {LoaderFunction, V2_MetaFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {useContext, useEffect} from "react";
import {useInView} from "react-intersection-observer";
import {useResizeDetector} from "react-resize-detector";
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
import {ImageCdnProvider} from "~/global-common-typescript/typeDefinitions";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {useEmblaCarouselWithIndex} from "~/hooks/useEmblaCarouselWithIndex";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {SecondaryNavigationController, useSecondaryNavigationController} from "~/hooks/useSecondaryNavigationController";
import {ContactUsCta} from "~/routes/index";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import {Language, type UserPreferences} from "~/typeDefinitions";
import {getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest, secondaryNavThreshold} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";

export const meta: V2_MetaFunction = ({data: loaderData}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = loaderData.userPreferences;
    if (userPreferences.language == Language.English) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/global-ops",
            },
            {
                title: "Energy Solutions in Global Markets | Livguard Experts",
            },
            {
                name: "description",
                content: "Livguard Experts for limitless energy solutions in global markets. With 35 years of legacy, in 35+ countries presence.",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/global-ops",
            },
            {
                property: "og:title",
                content: "Energy Solutions in Global Markets | Livguard Experts",
            },
            {
                property: "og:description",
                content: "Livguard Experts for limitless energy solutions in global markets. With 35 years of legacy, in 35+ countries presence.",
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
                content: `${getAbsolutePathForRelativePath(getMetadataForImage("/livguard/global-ops/global-og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null)}`,
            },
        ];
    } else if (userPreferences.language == Language.Hindi) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/global-ops",
            },
            {
                title: "Energy Solutions in Global Markets | Livguard Experts",
            },
            {
                name: "description",
                content: "Livguard Experts for limitless energy solutions in global markets. With 35 years of legacy, in 35+ countries presence.",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/global-ops",
            },
            {
                property: "og:title",
                content: "Energy Solutions in Global Markets | Livguard Experts",
            },
            {
                property: "og:description",
                content: "Livguard Experts for limitless energy solutions in global markets. With 35 years of legacy, in 35+ countries presence.",
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
                content: `${getAbsolutePathForRelativePath(getMetadataForImage("/livguard/global-ops/global-og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null)}`,
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
                secondaryNavigationController={secondaryNavigationController}
                breadcrumbs={[
                    {contentId: "cfab263f-0175-43fb-91e5-fccc64209d36", link: "/"},
                    {contentId: "b7f2abd0-ae79-46a6-b8bb-72224f16ad05", link: "#"},
                ]}
            >
                <SecondaryNavigationControllerContext.Provider value={secondaryNavigationController}>
                    <GlobalOpsPage
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

function GlobalOpsPage({
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
                "tw-aspect-square lg:tw-aspect-[1280/380] tw-grid tw-grid-cols-1 lg:tw-grid-rows-[minmax(0,1fr)_auto_minmax(0,1fr)] tw-grid-rows-[auto_1rem_auto] tw-items-center tw-text-center",
                className,
            )}
            id="top"
            ref={sectionRef}
        >
            <div className="tw-row-start-1 lg:tw-row-span-full tw-row-span-2 tw-col-start-1 tw-col-span-full">
                {isScreenSizeBelow == null ? null : (
                    <>
                        <FullWidthImage
                            relativePath={isScreenSizeBelow ? "/livguard/global-ops/1/mobile-banner.jpg" : "/livguard/global-ops/1/desktop-banner.jpg"}
                            key={isScreenSizeBelow ? "/livguard/global-ops/1/mobile-banner.jpg" : "/livguard/global-ops/1/desktop-banner.jpg"}
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

            {/* <div className="lg-px-screen-edge-2 tw-w-full tw-max-w-7xl tw-mx-auto">{getVernacularString("434a3b79-cd9d-47e9-8284-f23b7d677d97", userPreferences.language)}</div> */}
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
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "international-business-operations": {
                humanReadableName: getVernacularString("b59605a7-e182-46d3-a704-9c492604dfc4", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-grid tw-grid-flow-row tw-place-items-center lg:tw-grid-rows-[max-content_1.5rem_minmax(0,1fr)] lg:tw-items-start lg-px-screen-edge-2 lg:lg-bg-secondary-100 lg:tw-rounded-lg lg:tw-px-6 lg:tw-py-12 lg:lg-ops-pages-shadow",
                className,
            )}
            id="international-business-operations"
            ref={sectionRef}
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
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "why-livguard": {
                humanReadableName: getVernacularString("16d054b7-e1e8-4a21-b9b9-b99c4ec7ad97", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-grid tw-grid-flow-row tw-place-items-center lg:tw-grid-rows-[max-content_1.5rem_minmax(0,1fr)] lg:tw-items-start lg-px-screen-edge-2 lg:lg-bg-secondary-100 lg:tw-rounded-lg lg:tw-px-6 lg:tw-py-12 lg:lg-ops-pages-shadow",
                className,
            )}
            id="why-livguard"
            ref={sectionRef}
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
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);

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
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "international-presence": {
                humanReadableName: getVernacularString("df025538-0d6a-4954-aba0-4234b2d34565", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-aspect-square lg:tw-aspect-[1280/380] tw-grid tw-grid-rows-[repeat(4,auto)_minmax(0,1fr)] lg:tw-grid-rows-[minmax(0,1fr)_auto_auto_1.25rem_auto_minmax(0,1fr)] tw-text-center lg:tw-text-left lg:tw-grid-cols-[minmax(0,1fr)_minmax(0,1fr)]",
                className,
            )}
            id="international-presence"
            ref={sectionRef}
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
                            className="tw-grid tw-grid-flow-row tw-gap-y-2 lg-bg-secondary-100 tw-px-0 tw-py-3 tw-w-full tw-rounded-lg lg-ops-pages-shadow"
                            key={presenceIndex}
                        >
                            <div
                                dangerouslySetInnerHTML={{__html: getVernacularString(presence.numberContentPiece, userPreferences.language)}}
                                className="lg-text-primary-500 lg-text-title1 tw-text-center"
                            />
                            <div
                                dangerouslySetInnerHTML={{__html: getVernacularString(presence.textContentPiece, userPreferences.language)}}
                                className="lg-text-secondary-900 lg-text-title2 tw-text-center"
                            />
                        </div>
                    );
                })}
            </div>

            <VerticalSpacer className="tw-row-start-4 tw-h-6" />
            <div className="tw-row-start-5 lg:tw-row-start-1 tw-col-start-1 tw-row-span-full tw-col-span-full">
                {isScreenSizeBelow == null ? null : (
                    <>
                        <FullWidthImage
                            relativePath={isScreenSizeBelow ? "/livguard/global-ops/3/banner-mobile.jpg" : "/livguard/global-ops/3/banner-desktop.jpg"}
                            className="lg:tw-rounded-lg"
                            key={isScreenSizeBelow ? "/livguard/global-ops/3/banner-mobile.jpg" : "/livguard/global-ops/3/banner-desktop.jpg"}
                        />
                    </>
                )}
            </div>

            <DefaultTextAnimation className="tw-hidden lg:tw-block lg:tw-row-start-2 lg:tw-col-start-1 lg:tw-col-span-full lg:tw-justify-self-center">
                <div className="lg-text-banner lg-px-screen-edge-2 tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start tw-text-center">
                    {getVernacularString("539abcc9-a3b3-4ba8-b0b7-9320c02921a9", userPreferences.language)}
                </div>
            </DefaultTextAnimation>

            <div className="tw-hidden lg:tw-row-start-5 tw-col-start-1 lg:tw-col-span-full lg:tw-px-60 tw-justify-self-center lg:tw-grid lg:tw-grid-flow-col lg:tw-grid-cols-3 lg:tw-gap-x-6 lg:tw-justify-center lg:tw-content-center lg:tw-justify-items-center">
                {presenceData.map((presence, presenceIndex) => {
                    return (
                        <div
                            className="tw-grid tw-grid-flow-row tw-grid-rows-[max-content,max-content] tw-gap-y-2 tw-bg-secondary-100-light tw-px-8 tw-py-4 tw-w-full tw-rounded-lg lg-ops-pages-shadow"
                            key={presenceIndex}
                        >
                            <div
                                dangerouslySetInnerHTML={{__html: getVernacularString(presence.numberContentPiece, userPreferences.language)}}
                                className="lg-text-primary-500 lg-text-title1 tw-text-center"
                            />
                            <div
                                dangerouslySetInnerHTML={{__html: getVernacularString(presence.textContentPiece, userPreferences.language)}}
                                className="tw-text-secondary-900-light lg-text-title2 tw-text-center"
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function EnergySolutions({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const {emblaRef, emblaApi, selectedIndex} = useEmblaCarouselWithIndex({loop: true});
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "energy-solutions": {
                humanReadableName: getVernacularString("f73b94be-d44a-48f8-a1b7-623071cf1fe0", userPreferences.language),
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
                                headingContent2: `${getVernacularString("cc8f5274-ab27-4dd9-9958-9be9d1b58a4b", userPreferences.language)}`,
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
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "innovative-solutions": {
                humanReadableName: getVernacularString("3d9d6727-c879-4b32-a9d0-829ac636f865", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    const carouselItems = [
        {
            imageRelativeUrl: "/livguard/global-ops/5/ai-charging.jpg",
            titleContentPiece: "38190d9c-d8b4-4694-abd5-8a1b2a907644",
            descriptionContentPiece: "968f95c6-391c-4752-8f0a-6a130d7247d3",
        },
        {
            imageRelativeUrl: "/livguard/global-ops/5/cnt-technology.jpg",
            titleContentPiece: "819dd6dc-90d2-4bfd-a73a-6904481af9ad",
            descriptionContentPiece: "df905ecc-8efa-412a-bb7b-930aaef64ffe",
        },
        {
            imageRelativeUrl: "/livguard/global-ops/5/best-in-class-warranty.jpg",
            titleContentPiece: "b3226570-cafa-42c9-8b1c-8f3affdf73f7",
            descriptionContentPiece: "bd4bfc08-3225-4aaa-b04f-a0d1285aac7a",
        },
        {
            imageRelativeUrl: "/livguard/global-ops/5/6-wheel-tuffness.jpg",
            titleContentPiece: "964dbdf4-8b00-4471-9227-29d5d218d156",
            descriptionContentPiece: "1dbef3f7-a5f0-4ea4-859a-4c2e90bcfbe1",
        },
        {
            imageRelativeUrl: "/livguard/global-ops/5/solar-rooftop-solution.jpg",
            titleContentPiece: "57d8b9dd-8e88-4656-996b-94b467c9e321",
            descriptionContentPiece: "a72cbe3b-9abc-4e19-a789-dba48179cfe6",
        },
    ];

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge-2 lg:tw-px-0", className)}
            id="innovative-solutions"
            ref={sectionRef}
        >
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
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "our-journey": {
                humanReadableName: getVernacularString("6791d4aa-ae4c-4145-a535-b0bec4de6d64", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

    const timelineCards = [
        {
            descriptionTextContentPiece: "8c6d06ec-e5a5-42d4-af83-67c9719cb313",
            yearTextContentPiece: "e8cf0cf1-7c32-4576-9cb9-9128c0d90ce8",
        },
        {
            descriptionTextContentPiece: "7f9e5d13-7aee-4b3d-a437-b56d3c5cd17c",
            yearTextContentPiece: "67726d9d-17c5-47a8-8257-749c0a9d9d2f",
        },
        {
            descriptionTextContentPiece: "7fe6ddc2-67d3-4e35-bec2-56961675498f",
            yearTextContentPiece: "f28f2dd3-2dc5-469e-ae81-da74f6d140ed",
        },
        {
            descriptionTextContentPiece: "3edfb06c-0460-493f-97da-bc9ff21a78f7",
            yearTextContentPiece: "95bc00f0-d599-44dc-a807-6b4bc9338a73",
        },
        {
            descriptionTextContentPiece: "925184da-5c67-4e32-a491-5b2b1f214c47",
            yearTextContentPiece: "47f1ef98-3b15-423b-b190-8a46bfa4d8f3",
        },
        {
            descriptionTextContentPiece: "87c78964-385a-4113-83c0-20b588fc6674",
            yearTextContentPiece: "5d614c09-822d-4e0a-a81e-bf55e607b656",
        },
        {
            descriptionTextContentPiece: "e356d80b-8513-41c9-9c60-ab3a11e07cbf",
            yearTextContentPiece: "4354e23a-20cb-4e51-9555-5d0b4de88dbb",
        },
    ];
    const isScreenSizeBelow = useIsScreenSizeBelow(640);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-w-full", className)}
            ref={sectionRef}
            id="our-journey"
        >
            <DefaultTextAnimation className="tw-grid tw-justify-center">
                <div
                    className="lg-text-headline"
                    dangerouslySetInnerHTML={{__html: getVernacularString("90fd7093-85d7-4ad6-841f-292c5f387777", userPreferences.language)}}
                />
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-4 lg:tw-h-10" />

            {isScreenSizeBelow ? (
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

                        {index < cards.length - 1 && <Line orientation="vertical" />}
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
                style={{gridRowStart: 7, gridColumnStart: 1}}
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
        <div className="tw-w-full tw-grid tw-grid-rows-[repeat(3,auto)] tw-grid-flow-col tw-grid-cols-[auto_minmax(0,1fr)_2rem_auto_minmax(0,1fr)_2rem_auto_minmax(0,1fr)_2rem_auto_minmax(0,1fr)_2rem_auto_minmax(0,1fr)_2rem_auto_minmax(0,1fr)_2rem_auto_minmax(0,1fr)_2rem_auto_minmax(0,1fr)] tw-overflow-x-auto">
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

                        <div
                            className="tw-grid tw-items-end"
                            style={{gridColumnStart: cardColStart, gridColumnEnd: cardColStart + 5, gridRowStart: cardIndex % 2 === 0 ? "1" : "3"}}
                        >
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
                style={{gridRowStart: 2, gridColumnStart: 20, gridColumnEnd: 24}}
                className="tw-grid tw-grid-flow-col tw-gap-x-[1px] tw-justify-items-end"
            >
                <Line
                    orientation="horizontal"
                    className={`!tw-w-[40%] !tw-border-t-2 !tw-border-b-0 !tw-border-opacity-100 dark:!tw-border-opacity-100`}
                />
                <Line
                    orientation="horizontal"
                    className={`!tw-w-[40%] !tw-border-t-2 !tw-border-b-0 !tw-border-opacity-90 dark:!tw-border-opacity-90`}
                />
                <Line
                    orientation="horizontal"
                    className={`!tw-w-[40%] !tw-border-t-2 !tw-border-b-0 !tw-border-opacity-80 dark:!tw-border-opacity-80`}
                />
                <Line
                    orientation="horizontal"
                    className={`!tw-w-[40%] !tw-border-t-2 !tw-border-b-0 !tw-border-opacity-70 dark:!tw-border-opacity-70`}
                />
                <Line
                    orientation="horizontal"
                    className={`!tw-w-[40%] !tw-border-t-2 !tw-border-b-0 !tw-border-opacity-60 dark:!tw-border-opacity-60`}
                />
                <Line
                    orientation="horizontal"
                    className={`!tw-w-[40%] !tw-border-t-2 !tw-border-b-0 !tw-border-opacity-50 dark:!tw-border-opacity-50`}
                />
                <Line
                    orientation="horizontal"
                    className={`!tw-w-[40%] !tw-border-t-2 !tw-border-b-0 !tw-border-opacity-40 dark:!tw-border-opacity-40`}
                />
                <Line
                    orientation="horizontal"
                    className={`!tw-w-[40%] !tw-border-t-2 !tw-border-b-0 !tw-border-opacity-30 dark:!tw-border-opacity-30`}
                />
                <Line
                    orientation="horizontal"
                    className={`!tw-w-[40%] !tw-border-t-2 !tw-border-b-0 !tw-border-opacity-20 dark:!tw-border-opacity-20`}
                />
                <Line
                    orientation="horizontal"
                    className={`!tw-w-[40%] !tw-border-t-2 !tw-border-b-0 !tw-border-opacity-10 dark:!tw-border-opacity-10`}
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
