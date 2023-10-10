import type {LoaderFunction, V2_MetaFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {useContext, useEffect, useState} from "react";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {EmbeddedYoutubeVideo} from "~/components/embeddedYoutubeVideo";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {PageScaffold} from "~/components/pageScaffold";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {ImageCdnProvider, ImageMetadata} from "~/common--type-definitions/typeDefinitions";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {UserPreferences} from "~/typeDefinitions";
import {Language} from "~/typeDefinitions";
import {getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
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
                href: "https://www.livguard.com/video-gallery",
            },
            {
                title: "Livguard Video Gallery: Exploring Innovation and Inspiration",
            },
            {
                name: "description",
                content: "Immerse yourself in Livguard's video gallery, discover insightful videos showcasing our products, technologies, and stories that inspire.",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/video-gallery",
            },
            {
                property: "og:title",
                content: "Livguard Video Gallery: Exploring Innovation and Inspiration",
            },
            {
                property: "og:description",
                content: "Immerse yourself in Livguard's video gallery, discover insightful videos showcasing our products, technologies, and stories that inspire.",
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
                href: "https://www.livguard.com/video-gallery",
            },
            {
                title: "Livguard Video Gallery: Exploring Innovation and Inspiration",
            },
            {
                name: "description",
                content: "Immerse yourself in Livguard's video gallery, discover insightful videos showcasing our products, technologies, and stories that inspire.",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/video-gallery",
            },
            {
                property: "og:title",
                content: "Livguard Video Gallery: Exploring Innovation and Inspiration",
            },
            {
                property: "og:description",
                content: "Immerse yourself in Livguard's video gallery, discover insightful videos showcasing our products, technologies, and stories that inspire.",
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

    const vernacularData = getVernacularFromBackend("videoGalleryPage", userPreferences.language);
    const imageMetaDataLibrary = getImageMetadataLibraryFromBackend("videoGalleryPage");
    const ogBanner = getAbsolutePathForRelativePath(getMetadataForImageServerSide("/livguard/video-gallery/video-gallery-og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null);

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
                        breadcrumbs={[
                            {contentId: "cfab263f-0175-43fb-91e5-fccc64209d36", link: "/"},
                            {contentId: "da7484cc-f689-4649-8a7a-5c4fab3b0a0f", link: "#"},
                        ]}
                    >
                        <VideoGallery userPreferences={userPreferences} />
                    </PageScaffold>
                </ContentProviderContext.Provider>
            </ImageProviderContext.Provider>
        </>
    );
};

function VideoGallery({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <>
            <div className="tw-grid tw-grid-cols-1 tw-gap-x-16 tw-items-start tw-justify-center">
                <HeroSection
                    userPreferences={userPreferences}
                    className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
                />

                <VerticalSpacer className="tw-h-16 md:tw-h-20 tw-row-start-2 tw-col-start-1 lg:tw-col-span-full" />

                <OurVideoGallery
                    userPreferences={userPreferences}
                    className="tw-row-start-3 sm:tw-row-start-6 tw-col-start-1 lg:tw-col-span-full tw-max-w-7xl tw-mx-auto"
                />
                <VerticalSpacer className="tw-h-10 tw-row-start-9 tw-col-start-1 lg:tw-col-span-full" />
            </div>
        </>
    );
}

function HeroSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);
    const contentData = useContext(ContentProviderContext);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-aspect-square lg:tw-aspect-[1280/380] tw-grid lg:tw-grid-rows-[minmax(0,1fr)_auto_minmax(0,1fr)] tw-grid-rows-[minmax(0,1fr)_auto_2rem_2rem_auto]",
                className,
            )}
        >
            <div className="tw-row-start-1 tw-col-start-1 tw-row-span-full">
                {isScreenSizeBelow == null ? null : (
                    <FullWidthImage
                        relativePath={isScreenSizeBelow ? "/livguard/video-gallery/1/mobile-banner.jpg" : "/livguard/video-gallery/1/desktop-banner.jpg"}
                        className="tw-w-full tw-h-full"
                        key={isScreenSizeBelow ? "/livguard/video-gallery/1/mobile-banner.jpg" : "/livguard/video-gallery/1/desktop-banner.jpg"}
                    />
                )}
            </div>

            <DefaultTextAnimation className="tw-row-start-2 tw-col-start-1 tw-text-center lg:tw-text-start">
                <div className="lg-text-banner tw-text-secondary-900-dark lg-px-screen-edge-2">{contentData.getContent("93410e83-2080-4748-b66c-bb3152e48b0e")}</div>
            </DefaultTextAnimation>
        </div>
    );
}

enum ProductType {
    all = "All",
    inverter = "Inverter",
    solar = "Solar",
    automotive = "Automotive",
    erickshaw = "E-rickshaw",
    testimonials = "Testimonials",
}

const videoTypeData = [
    {
        id: "ZtywGUDhzqw",
        productType: ProductType.inverter,
        heading: "Livguard i-verter for noiseless performance | Sine wave technology",
    },
    {
        id: "0pDKs9nC7rs",
        productType: ProductType.inverter,
        heading: "Experience Uninterrupted Power with Livguard Inverter and Inverter Battery | The Perfect Combo",
    },
    {
        id: "b6gqLXTnZnw",
        productType: ProductType.inverter,
        heading: "Livguard | Inverter & Inverter Battery | Smart and Strong Chale Lifelong",
    },
    {
        id: "0wbz7bSgNq0",
        productType: ProductType.erickshaw,
        heading: "Livguard E-Shakti E-Rickshaw Batteries | Baniye Aatmanirbhar | Hindi",
    },
    {
        id: "9Ew1VxZf-6o",
        productType: ProductType.solar,
        heading: "Discover Livguard's Integrated Smart Solar Solutions for Your Home",
    },
    {
        id: "tFj9GJcjq6s",
        productType: ProductType.solar,
        heading: "Livguard Solar | Expert Ko Bulao Asani Se Lagao | EnergyUnlimited",
    },
    {
        id: "PwNzzjXxjZU",
        productType: ProductType.automotive,
        heading: "Livguard - Rough India ki Tough Battery",
    },
    {
        id: "GVlcxY7-RZ0",
        productType: ProductType.automotive,
        heading: "The making of Livguard - Rough India Ki Tough Battery",
    },
    {
        id: "N4sI0nyvtr4",
        productType: ProductType.automotive,
        heading: "Livguard Automotive Batteries - Manufacturing",
    },
    {
        id: "rVC-ncTBhls",
        productType: ProductType.testimonials,
        heading: "Watch How Rehan gained limitless energy with Livguard",
    },
    {
        id: "pNMTMVDWtiU",
        productType: ProductType.testimonials,
        heading: "How Livguard Empowered Rishab with Unlimited Energy",
    },
];

function OurVideoGallery({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    const [selectedProductType, setSelectedProductType] = useState(ProductType.all);
    const [videoTypeDataArr, setVideoTypeDataArr] = useState(videoTypeData);
    const [selectedVideo, setSelectedVideo] = useState(videoTypeData?.[0]);

    useEffect(() => {
        if (selectedProductType === ProductType.all) {
            setVideoTypeDataArr(videoTypeData);
        } else {
            const filteredData = videoTypeData.filter((item) => item.productType === selectedProductType);
            setVideoTypeDataArr(filteredData);
        }
    }, [selectedProductType]);

    return (
        <>
            <div className={concatenateNonNullStringsWithSpaces("tw-grid tw-w-full", className)}>
                <DefaultTextAnimation className="tw-row-start-1 tw-justify-self-center lg-px-screen-edge-2">
                    <div
                        className="lg-text-headline tw-place-self-center lg:tw-place-self-start"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("7b821e90-174f-45a4-ba42-97566a0a09ae")}}
                    />
                </DefaultTextAnimation>
                <VerticalSpacer className="tw-h-6" />
                <div className="tw-grid tw-grid-flow-col tw-w-full lg:tw-w-[60%] lg:tw-mx-auto tw-gap-4 tw-overflow-x-scroll lg-scroll-bar-hidden md:tw-overflow-auto tw-p-4 lg-bg-secondary-200 tw-rounded-lg">
                    <DefaultElementAnimation>
                        <button
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-w-full tw-min-w-[6rem] tw-col-start-1 tw-flex tw-flex-row tw-justify-center tw-items-center tw-rounded-lg hover:tw-cursor-pointer tw-p-2 tw-gap-2 lg-ewaste-management-box-shadow tw-transition-colors tw-duration-200",
                                `${selectedProductType == ProductType.all ? "lg-cta-button-gradient lg-text-secondary-900" : "lg-card lg-text-secondary-900"} `,
                            )}
                            onClick={() => {
                                setSelectedProductType(ProductType.all);
                                setSelectedVideo(videoTypeData[0]);
                            }}
                        >
                            <div className={concatenateNonNullStringsWithSpaces("tw-text-body", `${selectedProductType == ProductType.all ? "tw-text-secondary-100-light" : "lg-text-body"}`)}>
                                {contentData.getContent("0465146e-0127-4109-9c83-f0fa9b81b878")}
                            </div>
                        </button>
                    </DefaultElementAnimation>
                    <DefaultElementAnimation>
                        <button
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-w-full tw-min-w-[6rem] tw-col-start-2  tw-flex tw-flex-row tw-justify-center tw-items-center tw-rounded-lg hover:tw-cursor-pointer tw-p-2 tw-gap-2 lg-ewaste-management-box-shadow",
                                `${selectedProductType == ProductType.inverter ? "lg-cta-button-gradient lg-text-secondary-900" : "lg-card lg-text-secondary-900"} `,
                            )}
                            onClick={() => {
                                setSelectedProductType(ProductType.inverter);
                                setSelectedVideo(videoTypeData.filter((item) => item.productType === ProductType.inverter)[0]);
                            }}
                        >
                            <div className={concatenateNonNullStringsWithSpaces("tw-text-body", `${selectedProductType == ProductType.inverter ? "tw-text-secondary-100-light" : "lg-text-body"}`)}>
                                {contentData.getContent("b80ff1bf-5d72-41c4-b1b7-20376cd9e43c")}
                            </div>
                        </button>
                    </DefaultElementAnimation>
                    <DefaultElementAnimation>
                        <button
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-w-full tw-min-w-[6rem] tw-col-start-2 tw-flex tw-flex-row tw-justify-center tw-items-center tw-rounded-lg hover:tw-cursor-pointer tw-p-2 tw-gap-2 lg-ewaste-management-box-shadow",
                                `${selectedProductType == ProductType.solar ? "lg-cta-button-gradient lg-text-secondary-900" : "lg-card lg-text-secondary-900"} `,
                            )}
                            onClick={() => {
                                setSelectedProductType(ProductType.solar);
                                setSelectedVideo(videoTypeData.filter((item) => item.productType === ProductType.solar)[0]);
                            }}
                        >
                            <div className={concatenateNonNullStringsWithSpaces("tw-text-body", `${selectedProductType == ProductType.solar ? "tw-text-secondary-100-light" : "lg-text-body"}`)}>
                                {contentData.getContent("41c87e2b-3640-42ee-85e0-80aad377ee8a")}
                            </div>
                        </button>
                    </DefaultElementAnimation>
                    <DefaultElementAnimation>
                        <button
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-w-full tw-min-w-[6rem] tw-col-start-2 tw-flex tw-flex-row tw-justify-center tw-items-center tw-rounded-lg hover:tw-cursor-pointer tw-p-2 tw-gap-2 lg-ewaste-management-box-shadow",
                                `${selectedProductType == ProductType.automotive ? "lg-cta-button-gradient lg-text-secondary-900" : "lg-card lg-text-secondary-900"} `,
                            )}
                            onClick={() => {
                                setSelectedProductType(ProductType.automotive);
                                setSelectedVideo(videoTypeData.filter((item) => item.productType === ProductType.automotive)[0]);
                            }}
                        >
                            <div className={concatenateNonNullStringsWithSpaces("tw-text-body", `${selectedProductType == ProductType.automotive ? "tw-text-secondary-100-light" : "lg-text-body"}`)}>
                                {contentData.getContent("d643ce5a-83e4-4026-9e9e-f1959175a6db")}
                            </div>
                        </button>
                    </DefaultElementAnimation>
                    <DefaultElementAnimation>
                        <button
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-w-full tw-min-w-[6rem] tw-col-start-2 tw-flex tw-flex-row tw-justify-center tw-items-center tw-rounded-lg hover:tw-cursor-pointer tw-p-2 tw-gap-2 lg-ewaste-management-box-shadow",
                                `${selectedProductType == ProductType.erickshaw ? "lg-cta-button-gradient lg-text-secondary-900" : "lg-card lg-text-secondary-900"} `,
                            )}
                            onClick={() => {
                                setSelectedProductType(ProductType.erickshaw);
                                setSelectedVideo(videoTypeData.filter((item) => item.productType === ProductType.erickshaw)[0]);
                            }}
                        >
                            <div className={concatenateNonNullStringsWithSpaces("tw-text-body", `${selectedProductType == ProductType.erickshaw ? "tw-text-secondary-100-light" : "lg-text-body"}`)}>
                                {contentData.getContent("ad195899-aa04-427f-b939-a88ecdb8650a")}
                            </div>
                        </button>
                    </DefaultElementAnimation>
                    <DefaultElementAnimation>
                        <button
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-w-full tw-min-w-[6rem] tw-col-start-2 tw-flex tw-flex-row tw-justify-center tw-items-center tw-rounded-lg hover:tw-cursor-pointer tw-p-2 tw-gap-2 lg-ewaste-management-box-shadow",
                                `${selectedProductType == ProductType.testimonials ? "lg-cta-button-gradient lg-text-secondary-900" : "lg-card lg-text-secondary-900"} `,
                            )}
                            onClick={() => {
                                setSelectedProductType(ProductType.testimonials);
                                setSelectedVideo(videoTypeData.filter((item) => item.productType === ProductType.testimonials)[0]);
                            }}
                        >
                            <div className={concatenateNonNullStringsWithSpaces("tw-text-body", `${selectedProductType == ProductType.testimonials ? "tw-text-secondary-100-light" : "lg-text-body"}`)}>
                                {contentData.getContent("2d8630fa-9bd5-4ca7-aa34-aeaa48f79a49")}
                            </div>
                        </button>
                    </DefaultElementAnimation>
                </div>
                <VerticalSpacer className="tw-h-8" />

                <div className="lg-text-title2 lg-px-screen-edge-2">
                    {selectedProductType == ProductType.all ? (
                        <>
                            {selectedVideo?.heading} - <span className="lg-text-primary-500 lg-text-title1">{selectedVideo?.productType}</span>
                        </>
                    ) : (
                        selectedVideo?.heading
                    )}
                </div>
                <VerticalSpacer className="tw-h-2" />
                <div className="tw-grid tw-grid-rows-[auto_auto] lg:tw-grid-rows-[auto] lg:tw-grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:tw-grid-flow-col lg:tw-gap-2 tw-relative lg-px-screen-edge-2">
                    <div className="tw-row-start-1 tw-rounded-lg tw-overflow-hidden tw-grid tw-aspect-video tw-sticky tw-top-24">
                        <EmbeddedYoutubeVideo
                            id={selectedVideo?.id}
                            style={{aspectRatio: "560/315"}}
                        />
                    </div>

                    <div className="tw-w-full tw-h-full lg:tw-relative max-lg:tw-pt-4">
                        <div className="lg:tw-absolute lg:tw-inset-0 lg:tw-grid lg:tw-grid-cols-1 tw-overflow-auto">
                            <div className="tw-grid tw-gap-y-4 tw-content-start tw-overflow-y-auto tw-max-h-[26rem]">
                                {videoTypeDataArr?.map((item, index) => (
                                    <div
                                        className={concatenateNonNullStringsWithSpaces(
                                            "tw-grid tw-grid-cols-[4rem_minmax(0,1fr)] tw-gap-x-2 tw-items-center tw-pr-2",
                                            `${videoTypeDataArr.length - 1 === index && "tw-pb-[2.5rem]"}`,
                                        )}
                                        key={`selected-${index}`}
                                    >
                                        <div
                                            className={concatenateNonNullStringsWithSpaces(
                                                "tw-rounded-md tw-h-fit tw-w-fit",
                                                `${selectedVideo?.heading === item?.heading && "tw-border-solid tw-border-2 tw-border-red-500"}`,
                                            )}
                                        >
                                            <div
                                                className=""
                                                onClick={() => setSelectedVideo(item)}
                                            >
                                                <img
                                                    className=""
                                                    src={`https://img.youtube.com/vi/${item.id}/hqdefault.jpg`}
                                                />
                                            </div>
                                        </div>
                                        <div
                                            onClick={() => setSelectedVideo(item)}
                                            className={concatenateNonNullStringsWithSpaces("lg-text-body tw-py-2 tw-cursor-pointer", `${selectedVideo?.heading === item?.heading && "tw-font-bold"}`)}
                                        >
                                            {selectedProductType == ProductType.all ? (
                                                <>
                                                    {item.heading}- <span className="lg-text-primary-500">{item.productType}</span>
                                                </>
                                            ) : (
                                                item.heading
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="tw-h-[3rem] tw-bg-gradient-to-b tw-from-transparent tw-to-white tw-w-full tw-absolute tw-left-0 tw-bottom-0 tw-right-0 tw-pointer-events-none"></div>
                    </div>
                </div>
            </div>
        </>
    );
}
