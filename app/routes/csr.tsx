import type {LoaderFunction, V2_MetaFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {useContext, useEffect, useState} from "react";
import {useInView} from "react-intersection-observer";
import {CarouselStyle5} from "~/components/carouselStyle5";
import {CarouselStyle7} from "~/components/carouselStyle7";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {CoverImage} from "~/components/images/coverImage";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {PageScaffold} from "~/components/pageScaffold";
import {SecondaryNavigation} from "~/components/secondaryNavigation";
import {SecondaryNavigationControllerContext} from "~/contexts/secondaryNavigationControllerContext";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {ImageCdnProvider} from "~/common--type-definitions/typeDefinitions";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {SecondaryNavigationController, useSecondaryNavigationController} from "~/hooks/useSecondaryNavigationController";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {UserPreferences} from "~/typeDefinitions";
import {Language} from "~/typeDefinitions";
import {getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest, secondaryNavThreshold} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";

export const meta: V2_MetaFunction = ({data: loaderData}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = loaderData.userPreferences;
    if (userPreferences.language == Language.English) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/csr",
            },
            {
                title: "Corporate Social Responsibility (CSR) Initiatives | Livguard",
            },
            {
                name: "description",
                content: "All CSR activities are being implemented through Sita Devi Malhotra Charitable Trust (SDMC TRUST)",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/csr",
            },
            {
                property: "og:title",
                content: "Corporate Social Responsibility (CSR) Initiatives | Livguard",
            },
            {
                property: "og:description",
                content: "All CSR activities are being implemented through Sita Devi Malhotra Charitable Trust (SDMC TRUST)",
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
                content: `${getAbsolutePathForRelativePath(getMetadataForImage("/livguard/csr/csr-og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null)}`,
            },
        ];
    } else if (userPreferences.language == Language.Hindi) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/csr",
            },
            {
                title: "Corporate Social Responsibility (CSR) Initiatives | Livguard",
            },
            {
                name: "description",
                content: "All CSR activities are being implemented through Sita Devi Malhotra Charitable Trust (SDMC TRUST)",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/csr",
            },
            {
                property: "og:title",
                content: "Corporate Social Responsibility (CSR) Initiatives | Livguard",
            },
            {
                property: "og:description",
                content: "All CSR activities are being implemented through Sita Devi Malhotra Charitable Trust (SDMC TRUST)",
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
                content: `${getAbsolutePathForRelativePath(getMetadataForImage("/livguard/csr/csr-og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null)}`,
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
        <div className="">
            <PageScaffold
                userPreferences={userPreferences}
                redirectTo={redirectTo}
                showMobileMenuIcon={true}
                utmParameters={utmSearchParameters}
                pageUrl={pageUrl}
                breadcrumbs={[
                    {contentId: "cfab263f-0175-43fb-91e5-fccc64209d36", link: "/"},
                    {contentId: "5888e217-c7c5-4951-9e72-7527c0702882", link: "#"},
                ]}
                secondaryNavigationController={secondaryNavigationController}
            >
                <SecondaryNavigationControllerContext.Provider value={secondaryNavigationController}>
                    <CsrPage
                        userPreferences={userPreferences}
                        utmParameters={utmSearchParameters}
                        pageUrl={pageUrl}
                        secondaryNavigationController={secondaryNavigationController}
                    />
                </SecondaryNavigationControllerContext.Provider>
            </PageScaffold>
        </div>
    );
};

function CsrPage({
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
        <div className="lg-bg-secondary-100 dark:tw-bg-background-500-dark tw-w-full tw-h-full">
            <HeroSection userPreferences={userPreferences} />
            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <OurCsrInitiative
                className=""
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="lg:tw-h-20  tw-h-10" />

            <OurVision
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="lg:tw-h-20  tw-h-10" />
            {!isScreenSizeBelow ? (
                <>
                    <OurProjectsDesktop
                        className="tw-max-w-7xl tw-mx-auto"
                        userPreferences={userPreferences}
                    />
                </>
            ) : (
                <>
                    <OurProjectsMobile
                        className="tw-max-w-7xl tw-mx-auto"
                        userPreferences={userPreferences}
                    />
                </>
            )}

            <VerticalSpacer className="lg:tw-h-20  tw-h-10" />

            <CompositionOfCsrCommittee
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="lg:tw-h-20  tw-h-10" />
        </div>
    );
}

function HeroSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-aspect-square lg:tw-aspect-[1280/380]  tw-grid tw-grid-rows-[3.5rem_auto_1rem_auto_minmax(0,1fr)] lg:tw-grid-rows-[minmax(0,1fr)_auto_1rem_auto_minmax(0,1fr)] tw-text-center lg:tw-text-left tw-items-center",
                className,
            )}
        >
            <div className="tw-row-start-1 tw-col-start-1 tw-row-span-full">
                {isScreenSizeBelow == null ? null : (
                    <FullWidthImage
                        relativePath={isScreenSizeBelow ? "/livguard/csr/1/mobile-banner.jpg" : "/livguard/csr/1/desktop-banner.jpg"}
                        key={isScreenSizeBelow ? "/livguard/csr/1/mobile-banner.jpg" : "/livguard/csr/1/desktop-banner.jpg"}
                    />
                )}
            </div>
        </div>
    );
}

function OurCsrInitiative({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const items = [
        {
            svgIcon: "/livguard/csr/2/education.svg",
            title: "9b48da94-c77c-433d-a704-12c87673d23a",
            text: "998c7be8-35d4-4f1e-ba7c-b1ead3af22ae",
        },
        {
            svgIcon: "/livguard/csr/2/promotion-healthcare.svg",
            title: "7ecc798a-b004-4363-b6c4-109b214a9c56",
            text: "714cb12b-e61e-45cc-8bf5-efe8f05313f6",
        },
        {
            svgIcon: "/livguard/csr/2/promotion-livelihood.svg",
            title: "69e2dcc3-d054-4201-91f2-0d615de566db",
            text: "4fdfc3c9-3c2d-4b98-9a6c-8da1a66b2c88",
        },
        {
            svgIcon: "/livguard/csr/2/sustainability.svg",
            title: "4415a7de-a118-45ab-beaf-095576d3d2dc",
            text: "06174709-99f2-4a5e-8db2-e499622975dc",
        },
        {
            svgIcon: "/livguard/csr/2/education.svg",
            title: "9b48da94-c77c-433d-a704-12c87673d23a",
            text: "998c7be8-35d4-4f1e-ba7c-b1ead3af22ae",
        },
        {
            svgIcon: "/livguard/csr/2/promotion-healthcare.svg",
            title: "7ecc798a-b004-4363-b6c4-109b214a9c56",
            text: "714cb12b-e61e-45cc-8bf5-efe8f05313f6",
        },
        {
            svgIcon: "/livguard/csr/2/promotion-livelihood.svg",
            title: "69e2dcc3-d054-4201-91f2-0d615de566db",
            text: "4fdfc3c9-3c2d-4b98-9a6c-8da1a66b2c88",
        },
        {
            svgIcon: "/livguard/csr/2/sustainability.svg",
            title: "4415a7de-a118-45ab-beaf-095576d3d2dc",
            text: "06174709-99f2-4a5e-8db2-e499622975dc",
        },
    ];
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "csr-journey": {
                humanReadableName: getVernacularString("8fc9ce3b-96c8-4ed0-aa3e-f479d5f0d762", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge-2 lg:tw-px-0", className)}
            id="csr-journey"
            ref={sectionRef}
        >
            <div
                className="lg-text-headline tw-text-center"
                dangerouslySetInnerHTML={{__html: getVernacularString("09b7690d-2117-461b-8a05-110dc4319240", userPreferences.language)}}
            ></div>
            <VerticalSpacer className="tw-h-[1.5rem]" />
            <div
                className="lg-text-body lg-text-secondary-900 tw-text-center lg:tw-px-[5rem]"
                dangerouslySetInnerHTML={{__html: getVernacularString("b0e9add2-cb81-4ba8-a38b-ee9ac0734225", userPreferences.language)}}
            ></div>
            <VerticalSpacer className="tw-h-[1.5rem]" />
            {/* <div className="tw-grid lg:tw-grid-cols-4 lg:tw-grid-rows-1 md:tw-grid-cols-2 md:tw-grid-rows-2 tw-grid-rows-4 tw-grid-cols-1 tw-gap-[1.5rem] tw-items-center tw-justify-center"> */}

            <CarouselStyle5
                snapDotsDivisionFactor={2}
                items={items.map((item, itemIndex) => {
                    return (
                        <div
                            className="tw-h-full tw-grid tw-grid-rows-[auto_1rem_auto_1rem_minmax(0,1fr)] tw-grid-cols-1 lg-card tw-justify-items-center tw-px-[1rem] tw-rounded-md tw-py-[1.5rem] tw-max-w-[19.5rem] lg:tw-max-w-[23rem]"
                            key={itemIndex}
                        >
                            <div className="tw-col-start-1 tw-row-start-1 tw-row-end-2 tw-w-[5rem] tw-h-[5rem] tw-rounded-full tw-grid tw-items-center tw-justify-center lg-card">
                                <img
                                    src={getAbsolutePathForRelativePath(getMetadataForImage(item.svgIcon).finalUrl, ImageCdnProvider.Bunny, null, null)}
                                    className={concatenateNonNullStringsWithSpaces("dark:tw-invert")}
                                />
                            </div>
                            <div
                                className="tw-col-start-1 tw-row-start-3 lg-text-highlighted lg-text-body-bold tw-text-center lg-text-secondary-900"
                                dangerouslySetInnerHTML={{__html: getVernacularString(item.title, userPreferences.language)}}
                            />
                            <div className="tw-col-start-1 tw-row-start-5 lg-text-body lg-text-secondary-900 tw-text-center">{getVernacularString(item.text, userPreferences.language)}</div>
                        </div>
                    );
                })}
                className="tw-mx-auto"
                deselectedContainersClassName="tw-scale-[0.9] tw-h-full"
                selectedContainerClassName="tw-h-full"
                itemContainerClassName="lg:tw-px-0"
                slidesContainerClassName="!tw-auto-cols-max"
            />

            {/* </div> */}
        </div>
    );
}

function OurVision({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "csr-vision": {
                humanReadableName: getVernacularString("8adac62a-bc43-4744-aa00-339d0624248f", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge-2 tw-w-full", className)}
            id="csr-vision"
            ref={sectionRef}
        >
            <div className="tw-w-full tw-h-full tw-py-6 lg:tw-py-10 lg-card">
                <div className="tw-grid tw-justify-center tw-items-center tw-gap-4">
                    <div className="lg-card tw-h-[4rem] tw-w-[4rem] tw-rounded-full tw-grid tw-justify-center tw-justify-self-center tw-items-center">
                        <img
                            src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/csr/3/our-vision.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
                            className={concatenateNonNullStringsWithSpaces("tw-w-6 tw-h-6 tw-invert dark:tw-invert-0")}
                        />
                    </div>
                    <div
                        className="lg-text-headline tw-text-center"
                        dangerouslySetInnerHTML={{__html: getVernacularString("8a7e10ee-cde7-461f-9392-22301c8474a1", userPreferences.language)}}
                    />
                </div>
                <VerticalSpacer className="tw-h-[1.5rem]" />

                <div className="lg-text-body lg-text-secondary-900 tw-text-center lg:tw-px-[5rem]">{getVernacularString("d304550b-a5f6-41d8-8db6-8dae4f68b0af", userPreferences.language)}</div>
            </div>
        </div>
    );
}

function OurProjectsDesktop({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const [isViewMore, setIsViewMore] = useState(false);
    const items = [
        {
            image: "/livguard/csr/4/education.jpg",
            title: "a122d087-2b57-483a-b339-5b04e6cc1008",
            buttontext: "3cf2dca9-b278-4047-888a-c7f950364512",
            text: "c4f4e7d8-b77b-4019-95cb-4561d220092b",
        },
        {
            image: "/livguard/csr/4/health.jpg",
            title: "8f25886f-84c1-4103-84d9-5dcd0a966da7",
            buttontext: "d4c20c34-f47f-4fbf-bdfb-b04c242d6b6d",
            text: "d2c06ff7-d1a4-4f67-85fe-d7e8cd2bce5b",
        },
        {
            image: "/livguard/csr/4/health.jpg",
            title: "8d6883c0-0ca6-47b8-bf07-8c18a2187e9c",
            buttontext: "d4c20c34-f47f-4fbf-bdfb-b04c242d6b6d",
            text: "5c6965a4-2d78-49b3-b6d7-037baed79001",
        },
        {
            image: "/livguard/csr/4/livelihood.jpg",
            title: "0e69eb5a-a6eb-412e-a3b4-3462849b30ce",
            buttontext: "f4dc779b-6680-4c34-8e60-5283b21a8ab5",
            text: "6cf33ef3-328a-4ca5-b1bf-45cbe24eeefc",
        },
        {
            image: "/livguard/csr/4/livelihood.jpg",
            title: "0e69eb5a-a6eb-412e-a3b4-3462849b30ce",
            buttontext: "f4dc779b-6680-4c34-8e60-5283b21a8ab5",
            text: "6cf33ef3-328a-4ca5-b1bf-45cbe24eeefc",
        },
    ];
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "our-projects": {
                humanReadableName: getVernacularString("e2178aa3-294f-4cf6-a5c4-eecdd2b63217", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge-2 tw-w-full", className)}
            id="our-projects"
            ref={sectionRef}
        >
            <div
                className="lg-text-headline tw-text-center"
                dangerouslySetInnerHTML={{__html: getVernacularString("423d9fb0-8f59-4a7c-94e6-6eae3e78ec46", userPreferences.language)}}
            />
            <VerticalSpacer className="tw-h-[1.5rem]" />
            <div
                className="lg-text-body lg-text-secondary-900 tw-text-center"
                dangerouslySetInnerHTML={{__html: getVernacularString("9ffed122-9c1f-4e60-8d86-543812ebe4b5", userPreferences.language)}}
            ></div>
            <VerticalSpacer className="tw-h-[1.5rem]" />
            <div className="tw-grid tw-grid-cols-2 tw-gap-[1.5rem]">
                {!isViewMore &&
                    items.slice(0, 4).map((item, itemIndex) => (
                        <div
                            className={`tw-grid tw-grid-rows-[0,minmax(0,1fr)] tw-relative tw-group`}
                            key={itemIndex}
                        >
                            <CoverImage
                                relativePath={item.image}
                                className="tw-col-start-1 tw-col-span-full tw-row-start-1 tw-row-span-full tw-rounded-lg"
                                imageClassName="tw-rounded-lg"
                            />
                            <div className="tw-row-start-2 tw-col-start-1 tw-absolute tw-transition-all tw-duration-200 tw-bottom-0 tw-ease-in tw-pb-1 group-hover:tw-pb-2 tw-w-full tw-px-4  tw-rounded-lg tw-bg-[#00000066] tw-backdrop-opacity-[2px] tw-overflow-y-auto">
                                <div
                                    className="lg-text-title2 tw-col-start-1 tw-row-start-1 tw-text-[#FFFFFF] tw-py-2 tw-grid tw-items-center"
                                    dangerouslySetInnerHTML={{__html: getVernacularString(item.title, userPreferences.language)}}
                                ></div>
                                <div
                                    className="lg-text-body tw-row-start-2 tw-col-start-1 tw-col-end-3 !tw-text-[#FFFFFF] tw-hidden tw-transition-all tw-ease-in tw-duration-200 group-hover:tw-block"
                                    dangerouslySetInnerHTML={{__html: getVernacularString(item.text, userPreferences.language)}}
                                ></div>
                            </div>
                        </div>
                    ))}

                {isViewMore &&
                    items.map((item, itemIndex) => (
                        <div
                            className={`tw-grid tw-grid-rows-[0,minmax(0,1fr)] tw-relative tw-group`}
                            key={itemIndex}
                        >
                            <CoverImage
                                relativePath={item.image}
                                className="tw-col-start-1 tw-col-span-full tw-row-start-1 tw-row-span-full tw-rounded-lg"
                                imageClassName="tw-rounded-lg"
                            />
                            <div className="tw-row-start-2 tw-col-start-1 tw-absolute tw-transition-all tw-duration-200 tw-bottom-0 tw-ease-in tw-pb-1 group-hover:tw-pb-2 tw-w-full tw-px-4  tw-rounded-lg tw-bg-[#00000066] tw-backdrop-opacity-[2px] tw-overflow-y-auto">
                                <div
                                    className="lg-text-title2 tw-col-start-1 tw-row-start-1 tw-text-[#FFFFFF] tw-py-2 tw-grid tw-items-center"
                                    dangerouslySetInnerHTML={{__html: getVernacularString(item.title, userPreferences.language)}}
                                ></div>
                                <div
                                    className="lg-text-body tw-row-start-2 tw-col-start-1 tw-col-end-3 !tw-text-[#FFFFFF] tw-hidden tw-transition-all tw-ease-in tw-duration-200 group-hover:tw-block"
                                    dangerouslySetInnerHTML={{__html: getVernacularString(item.text, userPreferences.language)}}
                                ></div>
                            </div>
                        </div>
                    ))}
            </div>
            <VerticalSpacer className="tw-h-6" />
            <div className="tw-grid tw-justify-items-center">
                <button
                    className="lg-cta-button tw-grid tw-place-self-center"
                    onClick={() => setIsViewMore((prev) => !prev)}
                >
                    {isViewMore
                        ? getVernacularString("ac9a30fb-5654-4692-9995-84c2dbe8301b", userPreferences.language)
                        : getVernacularString("8993dcbc-2216-4dd2-954e-e8145571049f", userPreferences.language)}
                </button>
            </div>
        </div>
    );
}

function OurProjectsMobile({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const [imgText, setImgText] = useState(false);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "our-projects": {
                humanReadableName: getVernacularString("e2178aa3-294f-4cf6-a5c4-eecdd2b63217", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge-2 tw-w-full", className)}
            id="our-projects"
            ref={sectionRef}
        >
            <div
                className="lg-text-headline tw-text-center"
                dangerouslySetInnerHTML={{__html: getVernacularString("423d9fb0-8f59-4a7c-94e6-6eae3e78ec46", userPreferences.language)}}
            />
            <VerticalSpacer className="tw-h-[1.5rem]" />

            <div
                className="lg-text-body lg-text-secondary-900 tw-text-center"
                dangerouslySetInnerHTML={{__html: getVernacularString("9ffed122-9c1f-4e60-8d86-543812ebe4b5", userPreferences.language)}}
            ></div>
            <VerticalSpacer className="tw-h-[1.5rem]" />
            <div className="tw-grid tw-grid-flow-row tw-grid-cols-1 tw-gap-[1.5rem]">
                <ItemBuilder
                    items={[
                        {
                            image: "/livguard/csr/4/education.jpg",
                            title: "a122d087-2b57-483a-b339-5b04e6cc1008",
                            buttontext: "3cf2dca9-b278-4047-888a-c7f950364512",
                            text: "c4f4e7d8-b77b-4019-95cb-4561d220092b",
                        },
                        {
                            image: "/livguard/csr/4/health.jpg",
                            title: "8f25886f-84c1-4103-84d9-5dcd0a966da7",
                            buttontext: "d4c20c34-f47f-4fbf-bdfb-b04c242d6b6d",
                            text: "d2c06ff7-d1a4-4f67-85fe-d7e8cd2bce5b",
                        },
                        {
                            image: "/livguard/csr/4/health.jpg",
                            title: "8d6883c0-0ca6-47b8-bf07-8c18a2187e9c",
                            buttontext: "d4c20c34-f47f-4fbf-bdfb-b04c242d6b6d",
                            text: "5c6965a4-2d78-49b3-b6d7-037baed79001",
                        },
                        {
                            image: "/livguard/csr/4/livelihood.jpg",
                            title: "0e69eb5a-a6eb-412e-a3b4-3462849b30ce",
                            buttontext: "f4dc779b-6680-4c34-8e60-5283b21a8ab5",
                            text: "6cf33ef3-328a-4ca5-b1bf-45cbe24eeefc",
                        },
                        {
                            image: "/livguard/csr/4/environment.jpg",
                            title: "705025d8-3bd7-44fa-9ab6-26d4c002d7fd",
                            buttontext: "9d9729a9-368b-4ffd-be0b-af85eaec59bf",
                            text: "4796d842-e26d-4ea1-9cd6-f6686b5458ad",
                        },
                    ]}
                    itemBuilder={(item, itemIndex) => (
                        <div
                            className="tw-grid tw-grid-rows-[0,minmax(0,1fr)] tw-relative tw-group"
                            key={itemIndex}
                        >
                            <CoverImage
                                relativePath={item.image}
                                className="tw-col-start-1 tw-col-span-full tw-row-start-1 tw-row-span-full"
                                imageClassName="tw-rounded-lg"
                            />
                            <div className="tw-row-start-2 tw-col-start-1 tw-absolute tw-transition-all tw-duration-200 tw-bottom-0 tw-ease-in tw-pb-1 group-hover:tw-pb-2 tw-w-full tw-px-2 tw-rounded-lg tw-bg-[#00000066] tw-backdrop-opacity-[2px] tw-max-h-[calc(100%-2rem)] tw-overflow-y-auto">
                                <div className="tw-grid tw-grid-flow-row tw-justify-items-start">
                                    <div
                                        className="lg-text-title2 tw-col-start-1 tw-row-start-1 tw-text-[#FFFFFF] tw-py-2 tw-grid tw-items-center"
                                        dangerouslySetInnerHTML={{__html: getVernacularString(item.title, userPreferences.language)}}
                                    ></div>
                                    <div className="tw-py-2">
                                        <button
                                            className="tw-col-start-2 tw-row-start-1  lg-cta-button tw-w-full tw-items-center tw-justify-center tw-justify-items-center tw-px-3 tw-py-2"
                                            onClick={() => {
                                                setImgText((prev) => !prev);
                                            }}
                                        >
                                            <div
                                                className="lg-text-body-bold !tw-text-[#FFFFFF]"
                                                dangerouslySetInnerHTML={{__html: getVernacularString(item.buttontext, userPreferences.language)}}
                                            ></div>
                                        </button>
                                    </div>
                                </div>
                                {imgText && (
                                    <div
                                        className="lg-text-body tw-row-start-2 tw-col-start-1 tw-col-end-3 !tw-text-[#FFFFFF] tw-hidden tw-transition-all tw-ease-in tw-duration-200 group-hover:tw-block "
                                        dangerouslySetInnerHTML={{__html: getVernacularString(item.text, userPreferences.language)}}
                                    ></div>
                                )}
                            </div>
                        </div>
                    )}
                />
            </div>
        </div>
    );
}

function CompositionOfCsrCommittee({userPreferences, className}: {userPreferences: UserPreferences; className: string}) {
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "csr-committee": {
                humanReadableName: getVernacularString("6eaa372b-cfbe-434f-8dfb-cf31db5a1f35", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    const leadersData: Array<{title: string; position: string; description: string; imageRelativePath: string}> = [
        {
            title: getVernacularString("d867ff63-d4bf-49ae-8ac7-7290a76caef3", userPreferences.language),
            position: getVernacularString("755f8e01-18c9-4883-956c-5851e4e3885f", userPreferences.language),
            description: getVernacularString("8ddd1acf-9b2d-41f4-b4cd-e2395c211c88", userPreferences.language),
            imageRelativePath: "/livguard/about-us/3/leader-rakesh.png",
        },
        {
            title: getVernacularString("4ca82802-b39e-4844-9586-82ce4b095cff", userPreferences.language),
            position: getVernacularString("23fd4d15-8063-44e1-be03-a3aa6585d33b", userPreferences.language),
            description: getVernacularString("4f82218c-1156-4660-b634-a1231d82d457", userPreferences.language),
            imageRelativePath: "/livguard/about-us/3/leader-gurpreet.png",
        },
        {
            title: getVernacularString("54c7930a-aed3-4efc-b2eb-68a7b5b87ae2", userPreferences.language),
            position: getVernacularString("5267b971-9cbf-41dc-9cf8-abb2f8d7f2c5", userPreferences.language),
            description: getVernacularString("07d2f8d0-b81b-4dd3-a547-1adef20b3fea", userPreferences.language),
            imageRelativePath: "/livguard/about-us/3/leader-navneet.png",
        },
        {
            title: getVernacularString("d867ff63-d4bf-49ae-8ac7-7290a76caef3", userPreferences.language),
            position: getVernacularString("755f8e01-18c9-4883-956c-5851e4e3885f", userPreferences.language),
            description: getVernacularString("8ddd1acf-9b2d-41f4-b4cd-e2395c211c88", userPreferences.language),
            imageRelativePath: "/livguard/about-us/3/leader-rakesh.png",
        },
        {
            title: getVernacularString("4ca82802-b39e-4844-9586-82ce4b095cff", userPreferences.language),
            position: getVernacularString("23fd4d15-8063-44e1-be03-a3aa6585d33b", userPreferences.language),
            description: getVernacularString("4f82218c-1156-4660-b634-a1231d82d457", userPreferences.language),
            imageRelativePath: "/livguard/about-us/3/leader-gurpreet.png",
        },
        {
            title: getVernacularString("54c7930a-aed3-4efc-b2eb-68a7b5b87ae2", userPreferences.language),
            position: getVernacularString("5267b971-9cbf-41dc-9cf8-abb2f8d7f2c5", userPreferences.language),
            description: getVernacularString("07d2f8d0-b81b-4dd3-a547-1adef20b3fea", userPreferences.language),
            imageRelativePath: "/livguard/about-us/3/leader-navneet.png",
        },
    ];

    return (
        <>
            <div
                className={concatenateNonNullStringsWithSpaces("lg:tw-pb-6 lg:lg-px-screen-edge-2", className)}
                id="csr-committee"
                ref={sectionRef}
            >
                <DefaultTextAnimation className="tw-flex tw-flex-col tw-items-center lg-text-headline lg-px-screen-edge-2 lg:tw-pl-0 lg:tw-pr-0 tw-text-center lg:tw-text-left">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("fccd6c6b-9f47-4862-9464-4592c9a14c84", userPreferences.language)}} />
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-4 lg:tw-h-8" />

                <div className="tw-grid tw-grid-flow-row lg:tw-grid-flow-col lg:tw-grid-cols-3">
                    <CompositionCard
                        userPreferences={userPreferences}
                        content={{
                            headingTextContentId: "0eeb2d2b-6dca-47bb-b5a8-05453bf8c91c",
                            descriptionTextContentId: "97498b14-b629-4e6e-81a3-6a480bdd6652",
                            ctaButton1TextContentId: "e1fa0021-2310-4c6a-a221-9025e3b35ed7",
                            ctaButton1Link: "https://www.livguard.com/static-assets/csr-policy-livguard-energy.pdf",
                            ctaButton2TextContentId: "dd1fd5f5-12e4-4c37-b41d-969150aa721a",
                            ctaButton2Link: "https://www.livguard.com/static-assets/csr-project-livguard-energy.pdf",
                        }}
                        className="lg-px-screen-edge-2 lg:tw-px-0 lg:tw-pt-6 lg:tw-h-full"
                    />

                    <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

                    <CarouselStyle7
                        items={leadersData}
                        className="tw-mx-auto"
                        slidesContainerClassName="lg:tw-h-full"
                        deselectedContainersClassName="tw-pt-6 md:tw-pt-12 tw-h-full lg-px-screen-edge-2 lg:tw-px-0"
                        selectedContainerClassName="tw-pt-6 tw-h-full lg-px-screen-edge-2 lg:tw-px-0"
                        chevronButtonsBelowCarousel={false}
                        snapDotsDivisionFactor={2}
                        toggleMobileOnly={true}
                    />

                    <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

                    <CompositionCard
                        userPreferences={userPreferences}
                        content={{
                            headingTextContentId: "2b6ccacf-093d-48d2-b29c-e5d1c537f3c1",
                            descriptionTextContentId: "528dd262-635a-43cf-ab1e-e6a7fc5a052b",
                            ctaButton1TextContentId: "e1fa0021-2310-4c6a-a221-9025e3b35ed7",
                            ctaButton1Link: "https://www.livguard.com/static-assets/csr-policy-livguard-batteries.pdf",
                            ctaButton2TextContentId: "dd1fd5f5-12e4-4c37-b41d-969150aa721a",
                            ctaButton2Link: "https://www.livguard.com/static-assets/csr-project-livguard-batteries.pdf",
                        }}
                        className="lg-px-screen-edge-2 lg:tw-px-0 lg:tw-pt-6 lg:tw-h-full"
                    />
                </div>
            </div>
        </>
    );
}

function CompositionCard({
    userPreferences,
    className,
    content,
}: {
    userPreferences: UserPreferences;
    className?: string;
    content: {
        headingTextContentId: string;
        descriptionTextContentId: string;
        ctaButton1TextContentId: string;
        ctaButton1Link: string;
        ctaButton2TextContentId: string;
        ctaButton2Link: string;
    };
}) {
    return (
        <div className={className}>
            <div
                className={concatenateNonNullStringsWithSpaces(
                    "tw-grid tw-grid-rows-[repeat(3,auto)_minmax(3rem,1fr)_auto] lg:tw-grid-rows-[minmax(0,1fr)_repeat(3,auto)_minmax(3rem,1fr)_auto_minmax(0,1fr)] tw-py-6 lg:tw-py-10 tw-px-4 tw-justify-items-center lg-card lg:tw-h-[calc(100%-1rem)]",
                )}
            >
                <div
                    className="tw-row-start-1 lg:tw-row-start-2 lg-text-title1 tw-text-center"
                    dangerouslySetInnerHTML={{__html: getVernacularString(content.headingTextContentId, userPreferences.language)}}
                />

                <VerticalSpacer className="tw-row-start-2 lg:tw-row-start-3 tw-h-4" />

                <div className="tw-row-start-3 lg:tw-row-start-4 lg-text-body tw-text-center">{getVernacularString(content.descriptionTextContentId, userPreferences.language)}</div>

                <div className="tw-row-start-5 lg:tw-row-start-6 tw-grid tw-grid-flow-row tw-gap-y-4">
                    <a
                        target="_blank"
                        download
                        href={content.ctaButton1Link}
                        className="lg-cta-button tw-px-4 tw-text-center"
                    >
                        {getVernacularString(content.ctaButton1TextContentId, userPreferences.language)}
                    </a>
                    <a
                        target="_blank"
                        download
                        href={content.ctaButton2Link}
                        className="lg-cta-outline-button tw-px-4 tw-text-center"
                    >
                        {getVernacularString(content.ctaButton2TextContentId, userPreferences.language)}
                    </a>
                </div>
            </div>
        </div>
    );
}
