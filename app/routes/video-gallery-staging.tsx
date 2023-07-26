import React, {useEffect, useState} from "react";
import {ActionFunction, LinksFunction, LoaderFunction, MetaFunction, json} from "@remix-run/node";
import {Form, Link, useActionData, useLoaderData} from "@remix-run/react";
import {Dialog, Transition} from "@headlessui/react";
import {toast} from "react-toastify";
import {useResizeDetector} from "react-resize-detector";
import {X} from "react-bootstrap-icons";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces, generateUuid} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {getStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {emailIdValidationPattern, indianPhoneNumberValidationPattern} from "~/global-common-typescript/utilities/validationPatterns";
import {FormSelectComponent} from "~/livguard-common-typescript/scratchpad";
import {insertServiceRequests} from "~/backend/dealer.server";
import {FixedWidthImage} from "~/components/images/fixedWidthImage";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {CoverImage} from "~/components/images/coverImage";
import {PageScaffold} from "~/components/pageScaffold";
import {TestimonialsCarousel} from "~/components/testimonialsCarousel";
import {FaqSectionInternal} from "~/components/faqs";
import {EmbeddedYoutubeVideo} from "~/components/embeddedYoutubeVideo";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import {InverterType, Language, UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";
import {appendSpaceToString, getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ImageCdnProvider} from "~/global-common-typescript/typeDefinitions";
import {PowerfulPurposePowerfulImpact} from ".";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {CarouselStyle3} from "~/components/carouselStyle3";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {ProductCardComponent} from "~/components/category/common";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {InfiniteHorizontalScroller, HorizontalScrollDirection} from "~/livguard-common-typescript/infiniteHorizontalScroller";

export const meta: MetaFunction = ({data}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = data.userPreferences;
    if (userPreferences.language == Language.English) {
        return {
            title: "Livguard Services - Reliable Solutions for Your Power Needs",
            description: "Get reliable and effective Livguard services that ensure seamless performance of your automotive, home, and industrial needs. Contact us for expert solutions.",
            "og:title": "Livguard Services - Reliable Solutions for Your Power Needs",
            "og:site_name": "Livguard",
            "og:url": "https://www.livguard.com/service",
            "og:description": "Get reliable and effective Livguard services that ensure seamless performance of your automotive, home, and industrial needs. Contact us for expert solutions.",
            "og:type": "website",
            "og:image": "",
        };
    } else if (userPreferences.language == Language.Hindi) {
        return {
            title: "?????",
            description: "?????",
        };
    } else {
        throw Error(`Undefined language ${userPreferences.language}`);
    }
};

export const links: LinksFunction = () => {
    return [{rel: "canonical", href: "https://www.livguard.com/service"}];
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
    const {userPreferences, redirectTo} = useLoaderData() as LoaderData;

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
                <VideoGallery userPreferences={userPreferences} />
            </PageScaffold>
        </>
    );
};

function VideoGallery({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <>
            <div className="tw-grid tw-grid-cols-1  tw-gap-x-16 tw-items-start tw-justify-center">
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
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height)-3rem)] tw-grid tw-grid-rows-[auto_auto_4rem] lg:tw-grid-rows-[minmax(0,1fr)_auto_minmax(0,1fr)] tw-text-center",
                className,
            )}
            ref={ref}
        >
            {containerWidth == null || containerHeight == null ? null : (
                <div className="tw-row-start-1 tw-col-start-1 tw-row-span-full tw-overflow-hidden">
                    <CoverImage
                        relativePath={
                            containerHeight > containerWidth || containerWidth < 640
                                ? "/livguard/video-gallery/1/video-gallery-banner-mobile.jpg"
                                : "/livguard/video-gallery/1/video-gallery-banner-desktop.jpg"
                        }
                        className="tw-w-full tw-h-full"
                        key={
                            containerHeight > containerWidth || containerWidth < 640
                                ? "/livguard/video-gallery/1/video-gallery-banner-mobile.jpg"
                                : "/livguard/video-gallery/1/video-gallery-banner-desktop.jpg"
                        }
                    />
                </div>
            )}

            <DefaultTextAnimation className="tw-row-start-1 tw-col-start-1 tw-pt-4">
                <div className="lg-text-banner tw-text-secondary-900-dark lg-px-screen-edge-2 tw-place-self-center">
                    {getVernacularString("93410e83-2080-4748-b66c-bb3152e48b0e", userPreferences.language)}
                </div>
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
}

const videoTypeData = [
    {
        id: "cRwkU-znJt8",
        productImage: "/livguard/products/jodis/peace-of-mind-jodi/thumbnail.png",
        productType: ProductType.inverter,
        heading: "Livguard Inverter & Battery Unboxing, Review & Latest Price 2020",
    },
    {
        id: "cRwkU-znJt8",
        productImage: "/livguard/products/jodis/peace-of-mind-jodi/thumbnail.png",
        productType: ProductType.inverter,
        heading: "sdsdddddddddddsdsdddddddddd",
    },
    {
        id: "cRwkU-znJt8",
        productImage: "/livguard/products/jodis/peace-of-mind-jodi/thumbnail.png",
        productType: ProductType.inverter,
        heading: "sdsdddsdaaddddddddddddddddd",
    },
    {
        id: "cRwkU-znJt8",
        productImage: "/livguard/products/jodis/peace-of-mind-jodi/thumbnail.png",
        productType: ProductType.inverter,
        heading: "sdsddddddddaaaadddddddddddd",
    },
    {
        id: "cRwkU-znJt8",
        productImage: "/livguard/products/jodis/peace-of-mind-jodi/thumbnail.png",
        productType: ProductType.erickshaw,
        heading: "sdsddddddd3333ddddddddddddd",
    },
    {
        id: "cRwkU-znJt8",
        productImage: "/livguard/products/jodis/peace-of-mind-jodi/thumbnail.png",
        productType: ProductType.solar,
        heading: "sdsddddddrbrbdddddddddddddd",
    },
    {
        id: "cRwkU-znJt8",
        productImage: "/livguard/products/jodis/peace-of-mind-jodi/thumbnail.png",
        productType: ProductType.solar,
        heading: "sdsdddddddd3u83dddddddddddd",
    },
    {
        id: "cRwkU-znJt8",
        productImage: "/livguard/products/jodis/peace-of-mind-jodi/thumbnail.png",
        productType: ProductType.automotive,
        heading: "sdsddddddddddd338383ddddddddd",
    },
    {
        id: "cRwkU-znJt8",
        productImage: "/livguard/products/jodis/peace-of-mind-jodi/thumbnail.png",
        productType: ProductType.automotive,
        heading: "sdsddddddddddd23232ddddddddd",
    },
    {
        id: "cRwkU-znJt8",
        productImage: "/livguard/products/jodis/peace-of-mind-jodi/thumbnail.png",
        productType: ProductType.inverter,
        heading: "sdsdddddddddd23e2e2e2dddddddddd",
    },
];

function OurVideoGallery({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();
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
                        dangerouslySetInnerHTML={{__html: getVernacularString("7b821e90-174f-45a4-ba42-97566a0a09ae", userPreferences.language)}}
                    />
                </DefaultTextAnimation>
                <VerticalSpacer className="tw-h-6" />
                <div className="tw-grid tw-grid-flow-col tw-w-full lg:tw-w-[60%] lg:tw-mx-auto tw-gap-4 tw-overflow-x-scroll lg-scroll-bar-hidden md:tw-overflow-auto tw-p-4 lg-bg-secondary-200 tw-rounded-lg">
                    <DefaultElementAnimation>
                        <button
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-w-full tw-min-w-[6rem] tw-col-start-1 tw-flex tw-flex-row tw-justify-center tw-items-center tw-rounded-lg hover:tw-cursor-pointer tw-p-2 tw-gap-2 lg-ewaste-management-box-shadow",
                                `${selectedProductType == ProductType.all ? "lg-cta-button-gradient lg-text-secondary-900" : "lg-bg-secondary-100 lg-text-secondary-900"} `,
                            )}
                            onClick={() => {
                                setSelectedProductType(ProductType.all);
                            }}
                        >
                            <div className={concatenateNonNullStringsWithSpaces("tw-text-body", `${selectedProductType == ProductType.all ? "tw-text-secondary-100-light" : "lg-text-body"}`)}>
                                {getVernacularString("0465146e-0127-4109-9c83-f0fa9b81b878", userPreferences.language)}
                            </div>
                        </button>
                    </DefaultElementAnimation>
                    <DefaultElementAnimation>
                        <button
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-w-full tw-min-w-[6rem] tw-col-start-2  tw-flex tw-flex-row tw-justify-center tw-items-center tw-rounded-lg hover:tw-cursor-pointer tw-p-2 tw-gap-2 lg-ewaste-management-box-shadow",
                                `${selectedProductType == ProductType.inverter ? "lg-cta-button-gradient lg-text-secondary-900" : "lg-bg-secondary-100 lg-text-secondary-900"} `,
                            )}
                            onClick={() => {
                                setSelectedProductType(ProductType.inverter);
                            }}
                        >
                            <div className={concatenateNonNullStringsWithSpaces("tw-text-body", `${selectedProductType == ProductType.inverter ? "tw-text-secondary-100-light" : "lg-text-body"}`)}>
                                {getVernacularString("b80ff1bf-5d72-41c4-b1b7-20376cd9e43c", userPreferences.language)}
                            </div>
                        </button>
                    </DefaultElementAnimation>
                    <DefaultElementAnimation>
                        <button
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-w-full tw-min-w-[6rem] tw-col-start-2 tw-flex tw-flex-row tw-justify-center tw-items-center tw-rounded-lg hover:tw-cursor-pointer tw-p-2 tw-gap-2 lg-ewaste-management-box-shadow",
                                `${selectedProductType == ProductType.solar ? "lg-cta-button-gradient lg-text-secondary-900" : "lg-bg-secondary-100 lg-text-secondary-900"} `,
                            )}
                            onClick={() => {
                                setSelectedProductType(ProductType.solar);
                            }}
                        >
                            <div className={concatenateNonNullStringsWithSpaces("tw-text-body", `${selectedProductType == ProductType.solar ? "tw-text-secondary-100-light" : "lg-text-body"}`)}>
                                {getVernacularString("41c87e2b-3640-42ee-85e0-80aad377ee8a", userPreferences.language)}
                            </div>
                        </button>
                    </DefaultElementAnimation>
                    <DefaultElementAnimation>
                        <button
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-w-full tw-min-w-[6rem] tw-col-start-2 tw-flex tw-flex-row tw-justify-center tw-items-center tw-rounded-lg hover:tw-cursor-pointer tw-p-2 tw-gap-2 lg-ewaste-management-box-shadow",
                                `${selectedProductType == ProductType.automotive ? "lg-cta-button-gradient lg-text-secondary-900" : "lg-bg-secondary-100 lg-text-secondary-900"} `,
                            )}
                            onClick={() => {
                                setSelectedProductType(ProductType.automotive);
                            }}
                        >
                            <div className={concatenateNonNullStringsWithSpaces("tw-text-body", `${selectedProductType == ProductType.automotive ? "tw-text-secondary-100-light" : "lg-text-body"}`)}>
                                {getVernacularString("d643ce5a-83e4-4026-9e9e-f1959175a6db", userPreferences.language)}
                            </div>
                        </button>
                    </DefaultElementAnimation>
                    <DefaultElementAnimation>
                        <button
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-w-full tw-min-w-[6rem] tw-col-start-2 tw-flex tw-flex-row tw-justify-center tw-items-center tw-rounded-lg hover:tw-cursor-pointer tw-p-2 tw-gap-2 lg-ewaste-management-box-shadow",
                                `${selectedProductType == ProductType.erickshaw ? "lg-cta-button-gradient lg-text-secondary-900" : "lg-bg-secondary-100 lg-text-secondary-900"} `,
                            )}
                            onClick={() => {
                                setSelectedProductType(ProductType.erickshaw);
                            }}
                        >
                            <div className={concatenateNonNullStringsWithSpaces("tw-text-body", `${selectedProductType == ProductType.erickshaw ? "tw-text-secondary-100-light" : "lg-text-body"}`)}>
                                {getVernacularString("ad195899-aa04-427f-b939-a88ecdb8650a", userPreferences.language)}
                            </div>
                        </button>
                    </DefaultElementAnimation>
                </div>
                <VerticalSpacer className="tw-h-8" />

                <div className="lg-text-title2 lg-px-screen-edge-2">
                    {selectedVideo?.heading} - <span className="lg-text-primary-500 lg-text-title1">{selectedVideo?.productType}</span>
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
                                            "tw-grid tw-grid-cols-[4rem_minmax(0,1fr)] tw-gap-x-2",
                                            `${videoTypeDataArr.length - 1 === index && "tw-pb-[2.5rem]"}`,
                                        )}
                                        key={`selected-${index}`}
                                    >
                                        <div
                                            className={concatenateNonNullStringsWithSpaces(
                                                "tw-rounded-md",
                                                `${selectedVideo?.heading === item?.heading && "tw-border-solid tw-border-2 tw-border-red-500"}`,
                                            )}
                                        >
                                            <div
                                                className="tw-aspect-video"
                                                onClick={() => setSelectedVideo(item)}
                                            >
                                                <FullWidthImage
                                                    relativePath={selectedVideo?.productImage}
                                                    className=""
                                                ></FullWidthImage>
                                            </div>
                                        </div>
                                        <div
                                            onClick={() => setSelectedVideo(item)}
                                            className={concatenateNonNullStringsWithSpaces("lg-text-body tw-py-2", `${selectedVideo?.heading === item?.heading && "tw-font-bold"}`)}
                                        >
                                            {item.heading}- <span className="lg-text-primary-500">{item.productType}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="tw-h-[3rem] tw-bg-gradient-to-b tw-from-transparent tw-to-white tw-w-full tw-absolute tw-left-0 tw-bottom-0 tw-right-0"></div>
                    </div>
                </div>
            </div>
        </>
    );
}
