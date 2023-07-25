import {LoaderFunction} from "@remix-run/node";
import {Link, useLoaderData} from "@remix-run/react";
import {useResizeDetector} from "react-resize-detector";
import {Facebook, Instagram, Linkedin, Twitter, Youtube} from "react-bootstrap-icons";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {CoverImage} from "~/components/images/coverImage";
import {PageScaffold} from "~/components/pageScaffold";
import {FaqSectionInternal} from "~/components/faqs";
import {EmbeddedYoutubeVideo} from "~/components/embeddedYoutubeVideo";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import {Language, Theme, UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";
import {getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {CarouselStyle5} from "~/components/carouselStyle5";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {CarouselStyle3} from "~/components/carouselStyle3";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {ProductType, allProductDetails} from "~/productData";
import React, {useRef, useState} from "react";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ImageCdnProvider} from "~/global-common-typescript/typeDefinitions";
import {FormSelectComponent} from "~/livguard-common-typescript/scratchpad";
import LivguardDialog from "~/components/livguardDialog";
import {CarouselStyle4} from "~/components/carouselStyle4";
import {ProductAndCategoryBottomBar} from "~/components/productAndCategoryBottomBar";
import {SubCategoryProductsInternal} from "~/components/automotive-batteries/subCategoryProductsInternal";

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
                <CarAndSuvBatteriesPage userPreferences={userPreferences} />
            </PageScaffold>

            <ProductAndCategoryBottomBar
                userPreferences={userPreferences}
                utmParameters={utmSearchParameters}
                pageUrl={pageUrl}
            />
        </>
    );
};

function CarAndSuvBatteriesPage({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <>
            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-x-16 tw-items-start tw-justify-center">
                <HeroSection
                    userPreferences={userPreferences}
                    className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
                />

                <VerticalSpacer className="tw-h-10 tw-row-start-2 tw-col-start-1 lg:tw-col-span-full" />

                <StrongAutomotiveBatteries
                    userPreferences={userPreferences}
                    className="tw-row-start-3 tw-col-start-1 lg-px-screen-edge-2 lg:tw-px-0 tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-4 tw-col-start-1 lg:tw-col-span-full" />

                <OurSuggestionsBasedOnYourChoice
                    userPreferences={userPreferences}
                    className="tw-row-start-5 tw-col-start-1 lg:tw-col-span-full tw-w-full"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-6 tw-col-start-1 lg:tw-col-span-full" />

                <TopCarAndSuvBatteryPicks
                    userPreferences={userPreferences}
                    className="tw-row-start-7 tw-col-start-1 lg:tw-col-span-full tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-8 tw-col-start-1 lg:tw-col-span-full" />

                <div className="tw-row-start-9 tw-grid lg:tw-grid-cols-[minmax(0,1fr)_minmax(0,2fr)] tw-col-span-full lg:lg-px-screen-edge-2 tw-gap-x-5 tw-max-w-7xl tw-mx-auto">
                    <WeAreEverywhere
                        userPreferences={userPreferences}
                        className="tw-row-start-5 lg:tw-col-start-1 lg:tw-h-full"
                        showCtaButton={true}
                    />

                    <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-6 lg:tw-col-start-1 lg:tw-col-span-full lg:tw-hidden" />

                    <ChooseYourIdealCarAndSUVBattery
                        userPreferences={userPreferences}
                        className="tw-row-start-7 lg:tw-row-start-5 lg:tw-col-start-2"
                    />
                </div>

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[10] tw-col-start-1 lg:tw-col-span-full" />

                <FaqSection
                    userPreferences={userPreferences}
                    className="tw-row-start-[11] lg:tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px] tw-max-w-7xl"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[12] tw-col-start-1 lg:tw-col-span-full" />

                <SocialHandles
                    userPreferences={userPreferences}
                    heading={{text1: "b0a3aa40-4b00-4bdd-88e0-67085fafa92b", text2: `c0f802cc-902b-4328-b631-a3fad8fc7d18`}}
                    className="tw-row-start-[13] tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px] tw-gap-[1rem] tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[14] tw-col-start-1 lg:tw-col-span-full" />
            </div>
        </>
    );
}

function HeroSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height)-9.5rem)] lg:tw-h-[70vh] tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_1rem_auto_1.5rem] lg:tw-grid-rows-[minmax(0,1fr)_auto_auto_1rem_auto_3.5rem] lg:tw-grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] tw-text-center",
                className,
            )}
            ref={ref}
        >
            {containerWidth == null || containerHeight == null ? null : (
                <CoverImage
                    relativePath={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/car-and-suv/1/1.banner-mobile.jpg" : "/livguard/car-and-suv/1/1.banner-desktop.jpg"}
                    className="tw-row-start-1 tw-col-start-1 tw-row-span-full lg:tw-col-span-full"
                    key={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/car-and-suv/1/1.banner-mobile.jpg" : "/livguard/car-and-suv/1/1.banner-desktop.jpg"}
                />
            )}

            <DefaultTextAnimation className="tw-row-start-2 tw-col-start-1 lg:tw-col-start-2 lg-px-screen-edge-2 lg:tw-px-0">
                <div className="lg-text-banner tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">
                    {getVernacularString("835eb595-c459-46db-a37a-f310363e1733", userPreferences.language)}
                </div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-3 tw-col-start-1 lg:tw-col-start-2 lg-px-screen-edge-2 lg:tw-px-0">
                <div className="lg-text-banner tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">
                    {getVernacularString("4abfa328-bde2-4190-b944-71556401c22c", userPreferences.language)}
                </div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-5 tw-col-start-1 lg:tw-col-start-2 lg-px-screen-edge-2 lg:tw-px-0">
                <div className="lg-text-body !tw-text-secondary-900-dark">{getVernacularString("1d0accca-ec98-4ea1-89b9-88072cf5881d", userPreferences.language)}</div>
            </DefaultTextAnimation>
        </div>
    );
}

function StrongAutomotiveBatteries({userPreferences, className}: {userPreferences: UserPreferences; className: string}) {
    const BatteryCard = ({title, description, imageRelativePath}: {title: string; description: string; imageRelativePath: string}) => {
        return (
            <div
                className={concatenateNonNullStringsWithSpaces(
                    "tw-place-self-center tw-grid tw-grid-rows-[1rem_auto_1rem_auto_1rem_auto_minmax(1rem,1fr)] tw-cols-[auto] tw-w-full tw-h-full tw-px-4 tw-py-4 lg-bg-secondary-100 tw-rounded-lg",
                )}
            >
                <div className="tw-row-start-2">
                    <FullWidthImage relativePath={imageRelativePath} />
                </div>

                <div className="tw-row-start-4 tw-text-center lg-text-title1">{title}</div>

                <div className="tw-row-start-6 tw-text-center lg-text-body">{description}</div>
            </div>
        );
    };

    const batteriesData: Array<{titleTextContentPiece: string; bodyTextContentPiece: string; imageRelativePath: string}> = [
        {
            titleTextContentPiece: "f6ffda18-14b4-4973-9f1d-8394404caae0",
            bodyTextContentPiece: "a3d4f75e-dfc7-4a1e-b227-f7ba59c7415d",
            imageRelativePath: "/livguard/car-and-suv/2/2.1.png",
        },
        {
            titleTextContentPiece: "035647a1-11fd-46c8-9779-6ca45d66aef9",
            bodyTextContentPiece: "7e6ef891-fa59-4673-b436-af77ecff2da0",
            imageRelativePath: "/livguard/car-and-suv/2/2.2.png",
        },
        {
            titleTextContentPiece: "c5b351d6-0747-4a75-8e47-48f20f9adb0f",
            bodyTextContentPiece: "521768ff-9aa1-41fe-b403-5fbeaf100b3b",
            imageRelativePath: "/livguard/car-and-suv/2/2.3.png",
        },
        {
            titleTextContentPiece: "79f76b0b-3fce-4d4f-8fb8-4a468a20420b",
            bodyTextContentPiece: "559a1118-7d22-4c63-8838-c246921b9361",
            imageRelativePath: "/livguard/car-and-suv/2/2.1.png",
        },
        // {
        //     titleTextContentPiece: "035647a1-11fd-46c8-9779-6ca45d66aef9",
        //     bodyTextContentPiece: "7e6ef891-fa59-4673-b436-af77ecff2da0",
        //     imageRelativePath: "/livguard/car-and-suv/2/2.2.png",
        // },
        // {
        //     titleTextContentPiece: "c5b351d6-0747-4a75-8e47-48f20f9adb0f",
        //     bodyTextContentPiece: "521768ff-9aa1-41fe-b403-5fbeaf100b3b",
        //     imageRelativePath: "/livguard/car-and-suv/2/2.3.png",
        // },
    ];

    return (
        <>
            <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg:tw-col-span-full", className)}>
                <DefaultTextAnimation className="tw-flex tw-flex-col tw-items-center lg-text-headline lg:lg-px-screen-edge-2 lg:tw-pl-0 lg:tw-pr-0 tw-text-center lg:tw-text-left">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("32311f43-f3bd-4137-8d35-381f0bfff7bf", userPreferences.language)}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("30486bb4-8e46-4f90-87e0-1ecf2addaba4", userPreferences.language)}} />
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-4 lg:tw-h-8" />

                <CarouselStyle5
                    items={batteriesData.map((batteryData, batteryDataIndex) => (
                        <BatteryCard
                            title={getVernacularString(batteryData.titleTextContentPiece, userPreferences.language)}
                            description={getVernacularString(batteryData.bodyTextContentPiece, userPreferences.language)}
                            imageRelativePath={batteryData.imageRelativePath}
                            key={batteryDataIndex}
                        />
                    ))}
                    className="tw-mx-auto"
                    deselectedContainersClassName="tw-scale-[0.9] tw-h-full"
                    selectedContainerClassName="tw-h-full"
                />
            </div>
        </>
    );
}

function OurSuggestionsBasedOnYourChoice({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const brandBatteries = {
        Honda: {
            Car: {
                Model1: {
                    "Petrol/CNG": [
                        {
                            batterySlug: "#",
                            imageRelativeUrl: "/livguard/car-and-suv/3/3.product.png",
                            name: "7c0a4fcb-46bb-4f91-bad3-c2edf00a1950",
                            description: "b356a538-622e-4f20-9c08-82c959a57934",
                            warranty: "aaabaf03-79df-4e72-9785-855769b39789",
                            capacity: "0ae2cd6e-1165-41a6-82ec-977fda0f326b",
                            polarity: "c4503ffb-5eec-496c-88ad-3b9436fe9b47",
                            dimensions: "fac2ba5d-65a2-4873-be4e-42ac01cd401e",
                        },
                        {
                            batterySlug: "#",
                            imageRelativeUrl: "/livguard/car-and-suv/3/3.product.png",
                            name: "7c0a4fcb-46bb-4f91-bad3-c2edf00a1950",
                            description: "b356a538-622e-4f20-9c08-82c959a57934",
                            warranty: "aaabaf03-79df-4e72-9785-855769b39789",
                            capacity: "0ae2cd6e-1165-41a6-82ec-977fda0f326b",
                            polarity: "c4503ffb-5eec-496c-88ad-3b9436fe9b47",
                            dimensions: "fac2ba5d-65a2-4873-be4e-42ac01cd401e",
                        },
                        {
                            batterySlug: "#",
                            imageRelativeUrl: "/livguard/car-and-suv/3/3.product.png",
                            name: "7c0a4fcb-46bb-4f91-bad3-c2edf00a1950",
                            description: "b356a538-622e-4f20-9c08-82c959a57934",
                            warranty: "aaabaf03-79df-4e72-9785-855769b39789",
                            capacity: "0ae2cd6e-1165-41a6-82ec-977fda0f326b",
                            polarity: "c4503ffb-5eec-496c-88ad-3b9436fe9b47",
                            dimensions: "fac2ba5d-65a2-4873-be4e-42ac01cd401e",
                        },
                        {
                            batterySlug: "#",
                            imageRelativeUrl: "/livguard/car-and-suv/3/3.product.png",
                            name: "7c0a4fcb-46bb-4f91-bad3-c2edf00a1950",
                            description: "b356a538-622e-4f20-9c08-82c959a57934",
                            warranty: "aaabaf03-79df-4e72-9785-855769b39789",
                            capacity: "0ae2cd6e-1165-41a6-82ec-977fda0f326b",
                            polarity: "c4503ffb-5eec-496c-88ad-3b9436fe9b47",
                            dimensions: "fac2ba5d-65a2-4873-be4e-42ac01cd401e",
                        },
                        {
                            batterySlug: "#",
                            imageRelativeUrl: "/livguard/car-and-suv/3/3.product.png",
                            name: "7c0a4fcb-46bb-4f91-bad3-c2edf00a1950",
                            description: "b356a538-622e-4f20-9c08-82c959a57934",
                            warranty: "aaabaf03-79df-4e72-9785-855769b39789",
                            capacity: "0ae2cd6e-1165-41a6-82ec-977fda0f326b",
                            polarity: "c4503ffb-5eec-496c-88ad-3b9436fe9b47",
                            dimensions: "fac2ba5d-65a2-4873-be4e-42ac01cd401e",
                        },
                    ],
                    Diesel: [
                        {
                            batterySlug: "#",
                            imageRelativeUrl: "/livguard/car-and-suv/3/3.product.png",
                            name: "7c0a4fcb-46bb-4f91-bad3-c2edf00a1950",
                            description: "b356a538-622e-4f20-9c08-82c959a57934",
                            warranty: "aaabaf03-79df-4e72-9785-855769b39789",
                            capacity: "0ae2cd6e-1165-41a6-82ec-977fda0f326b",
                            polarity: "c4503ffb-5eec-496c-88ad-3b9436fe9b47",
                            dimensions: "fac2ba5d-65a2-4873-be4e-42ac01cd401e",
                        },
                    ],
                },
                Model2: {
                    "Petrol/CNG": [
                        {
                            batterySlug: "#",
                            imageRelativeUrl: "/livguard/car-and-suv/3/3.product.png",
                            name: "7c0a4fcb-46bb-4f91-bad3-c2edf00a1950",
                            description: "b356a538-622e-4f20-9c08-82c959a57934",
                            warranty: "aaabaf03-79df-4e72-9785-855769b39789",
                            capacity: "0ae2cd6e-1165-41a6-82ec-977fda0f326b",
                            polarity: "c4503ffb-5eec-496c-88ad-3b9436fe9b47",
                            dimensions: "fac2ba5d-65a2-4873-be4e-42ac01cd401e",
                        },
                        {
                            batterySlug: "#",
                            imageRelativeUrl: "/livguard/car-and-suv/3/3.product.png",
                            name: "7c0a4fcb-46bb-4f91-bad3-c2edf00a1950",
                            description: "b356a538-622e-4f20-9c08-82c959a57934",
                            warranty: "aaabaf03-79df-4e72-9785-855769b39789",
                            capacity: "0ae2cd6e-1165-41a6-82ec-977fda0f326b",
                            polarity: "c4503ffb-5eec-496c-88ad-3b9436fe9b47",
                            dimensions: "fac2ba5d-65a2-4873-be4e-42ac01cd401e",
                        },
                        {
                            batterySlug: "#",
                            imageRelativeUrl: "/livguard/car-and-suv/3/3.product.png",
                            name: "7c0a4fcb-46bb-4f91-bad3-c2edf00a1950",
                            description: "b356a538-622e-4f20-9c08-82c959a57934",
                            warranty: "aaabaf03-79df-4e72-9785-855769b39789",
                            capacity: "0ae2cd6e-1165-41a6-82ec-977fda0f326b",
                            polarity: "c4503ffb-5eec-496c-88ad-3b9436fe9b47",
                            dimensions: "fac2ba5d-65a2-4873-be4e-42ac01cd401e",
                        },
                        {
                            batterySlug: "#",
                            imageRelativeUrl: "/livguard/car-and-suv/3/3.product.png",
                            name: "7c0a4fcb-46bb-4f91-bad3-c2edf00a1950",
                            description: "b356a538-622e-4f20-9c08-82c959a57934",
                            warranty: "aaabaf03-79df-4e72-9785-855769b39789",
                            capacity: "0ae2cd6e-1165-41a6-82ec-977fda0f326b",
                            polarity: "c4503ffb-5eec-496c-88ad-3b9436fe9b47",
                            dimensions: "fac2ba5d-65a2-4873-be4e-42ac01cd401e",
                        },
                    ],
                    Diesel: [
                        {
                            batterySlug: "#",
                            imageRelativeUrl: "/livguard/car-and-suv/3/3.product.png",
                            name: "7c0a4fcb-46bb-4f91-bad3-c2edf00a1950",
                            description: "b356a538-622e-4f20-9c08-82c959a57934",
                            warranty: "aaabaf03-79df-4e72-9785-855769b39789",
                            capacity: "0ae2cd6e-1165-41a6-82ec-977fda0f326b",
                            polarity: "c4503ffb-5eec-496c-88ad-3b9436fe9b47",
                            dimensions: "fac2ba5d-65a2-4873-be4e-42ac01cd401e",
                        },
                        {
                            batterySlug: "#",
                            imageRelativeUrl: "/livguard/car-and-suv/3/3.product.png",
                            name: "7c0a4fcb-46bb-4f91-bad3-c2edf00a1950",
                            description: "b356a538-622e-4f20-9c08-82c959a57934",
                            warranty: "aaabaf03-79df-4e72-9785-855769b39789",
                            capacity: "0ae2cd6e-1165-41a6-82ec-977fda0f326b",
                            polarity: "c4503ffb-5eec-496c-88ad-3b9436fe9b47",
                            dimensions: "fac2ba5d-65a2-4873-be4e-42ac01cd401e",
                        },
                    ],
                },
            },
            SUV: {
                Model3: {
                    "Petrol/CNG": [
                        {
                            batterySlug: "#",
                            imageRelativeUrl: "/livguard/car-and-suv/3/3.product.png",
                            name: "7c0a4fcb-46bb-4f91-bad3-c2edf00a1950",
                            description: "b356a538-622e-4f20-9c08-82c959a57934",
                            warranty: "aaabaf03-79df-4e72-9785-855769b39789",
                            capacity: "0ae2cd6e-1165-41a6-82ec-977fda0f326b",
                            polarity: "c4503ffb-5eec-496c-88ad-3b9436fe9b47",
                            dimensions: "fac2ba5d-65a2-4873-be4e-42ac01cd401e",
                        },
                        {
                            batterySlug: "#",
                            imageRelativeUrl: "/livguard/car-and-suv/3/3.product.png",
                            name: "7c0a4fcb-46bb-4f91-bad3-c2edf00a1950",
                            description: "b356a538-622e-4f20-9c08-82c959a57934",
                            warranty: "aaabaf03-79df-4e72-9785-855769b39789",
                            capacity: "0ae2cd6e-1165-41a6-82ec-977fda0f326b",
                            polarity: "c4503ffb-5eec-496c-88ad-3b9436fe9b47",
                            dimensions: "fac2ba5d-65a2-4873-be4e-42ac01cd401e",
                        },
                        {
                            batterySlug: "#",
                            imageRelativeUrl: "/livguard/car-and-suv/3/3.product.png",
                            name: "7c0a4fcb-46bb-4f91-bad3-c2edf00a1950",
                            description: "b356a538-622e-4f20-9c08-82c959a57934",
                            warranty: "aaabaf03-79df-4e72-9785-855769b39789",
                            capacity: "0ae2cd6e-1165-41a6-82ec-977fda0f326b",
                            polarity: "c4503ffb-5eec-496c-88ad-3b9436fe9b47",
                            dimensions: "fac2ba5d-65a2-4873-be4e-42ac01cd401e",
                        },
                    ],
                    Diesel: [
                        {
                            batterySlug: "#",
                            imageRelativeUrl: "/livguard/car-and-suv/3/3.product.png",
                            name: "7c0a4fcb-46bb-4f91-bad3-c2edf00a1950",
                            description: "b356a538-622e-4f20-9c08-82c959a57934",
                            warranty: "aaabaf03-79df-4e72-9785-855769b39789",
                            capacity: "0ae2cd6e-1165-41a6-82ec-977fda0f326b",
                            polarity: "c4503ffb-5eec-496c-88ad-3b9436fe9b47",
                            dimensions: "fac2ba5d-65a2-4873-be4e-42ac01cd401e",
                        },
                    ],
                },
                Model4: {
                    "Petrol/CNG": [
                        {
                            batterySlug: "#",
                            imageRelativeUrl: "/livguard/car-and-suv/3/3.product.png",
                            name: "7c0a4fcb-46bb-4f91-bad3-c2edf00a1950",
                            description: "b356a538-622e-4f20-9c08-82c959a57934",
                            warranty: "aaabaf03-79df-4e72-9785-855769b39789",
                            capacity: "0ae2cd6e-1165-41a6-82ec-977fda0f326b",
                            polarity: "c4503ffb-5eec-496c-88ad-3b9436fe9b47",
                            dimensions: "fac2ba5d-65a2-4873-be4e-42ac01cd401e",
                        },
                        {
                            batterySlug: "#",
                            imageRelativeUrl: "/livguard/car-and-suv/3/3.product.png",
                            name: "7c0a4fcb-46bb-4f91-bad3-c2edf00a1950",
                            description: "b356a538-622e-4f20-9c08-82c959a57934",
                            warranty: "aaabaf03-79df-4e72-9785-855769b39789",
                            capacity: "0ae2cd6e-1165-41a6-82ec-977fda0f326b",
                            polarity: "c4503ffb-5eec-496c-88ad-3b9436fe9b47",
                            dimensions: "fac2ba5d-65a2-4873-be4e-42ac01cd401e",
                        },
                        {
                            batterySlug: "#",
                            imageRelativeUrl: "/livguard/car-and-suv/3/3.product.png",
                            name: "7c0a4fcb-46bb-4f91-bad3-c2edf00a1950",
                            description: "b356a538-622e-4f20-9c08-82c959a57934",
                            warranty: "aaabaf03-79df-4e72-9785-855769b39789",
                            capacity: "0ae2cd6e-1165-41a6-82ec-977fda0f326b",
                            polarity: "c4503ffb-5eec-496c-88ad-3b9436fe9b47",
                            dimensions: "fac2ba5d-65a2-4873-be4e-42ac01cd401e",
                        },
                        {
                            batterySlug: "#",
                            imageRelativeUrl: "/livguard/car-and-suv/3/3.product.png",
                            name: "7c0a4fcb-46bb-4f91-bad3-c2edf00a1950",
                            description: "b356a538-622e-4f20-9c08-82c959a57934",
                            warranty: "aaabaf03-79df-4e72-9785-855769b39789",
                            capacity: "0ae2cd6e-1165-41a6-82ec-977fda0f326b",
                            polarity: "c4503ffb-5eec-496c-88ad-3b9436fe9b47",
                            dimensions: "fac2ba5d-65a2-4873-be4e-42ac01cd401e",
                        },
                    ],
                    Diesel: [
                        {
                            batterySlug: "#",
                            imageRelativeUrl: "/livguard/car-and-suv/3/3.product.png",
                            name: "7c0a4fcb-46bb-4f91-bad3-c2edf00a1950",
                            description: "b356a538-622e-4f20-9c08-82c959a57934",
                            warranty: "aaabaf03-79df-4e72-9785-855769b39789",
                            capacity: "0ae2cd6e-1165-41a6-82ec-977fda0f326b",
                            polarity: "c4503ffb-5eec-496c-88ad-3b9436fe9b47",
                            dimensions: "fac2ba5d-65a2-4873-be4e-42ac01cd401e",
                        },
                        {
                            batterySlug: "#",
                            imageRelativeUrl: "/livguard/car-and-suv/3/3.product.png",
                            name: "7c0a4fcb-46bb-4f91-bad3-c2edf00a1950",
                            description: "b356a538-622e-4f20-9c08-82c959a57934",
                            warranty: "aaabaf03-79df-4e72-9785-855769b39789",
                            capacity: "0ae2cd6e-1165-41a6-82ec-977fda0f326b",
                            polarity: "c4503ffb-5eec-496c-88ad-3b9436fe9b47",
                            dimensions: "fac2ba5d-65a2-4873-be4e-42ac01cd401e",
                        },
                    ],
                },
            },
        },
    };

    const [selectedBrand, setSelectedBrand] = useState("");
    const [appliedBrand, setAppliedBrand] = useState("");
    const [selectedSegment, setSelectedSegment] = useState("");
    const [appliedSegment, setAppliedSegment] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [appliedModel, setAppliedModel] = useState("");
    const [selectedFuel, setSelectedFuel] = useState("");
    const [appliedFuel, setAppliedFuel] = useState("");

    const [applyChanges, setApplyChanges] = useState(false);

    const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

    function tryToOpenFilterDialog() {
        setIsFilterDialogOpen(true);
    }

    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full tw-grid tw-grid-flow-row lg-bg-our-suggestions", className)}>
            <VerticalSpacer className="tw-h-6 lg:tw-h-10" />

            <div
                className="lg-text-headline tw-place-self-center"
                dangerouslySetInnerHTML={{__html: getVernacularString("1d2d55db-13cc-47d8-b960-9aa8906e1922", userPreferences.language)}}
            />
            <div className="lg-text-headline tw-place-self-center">{getVernacularString("cd8f0fe0-3dae-485f-aa06-dac1a5450012", userPreferences.language)}</div>

            <VerticalSpacer className="tw-h-4 lg:tw-h-6" />

            <div className="tw-max-w-7xl tw-mx-auto tw-hidden tw-w-full tw-place-self-center lg:tw-grid lg:tw-grid-flow-col lg:tw-grid-cols-[auto_minmax(fit-content,1fr)_minmax(fit-content,1fr)_minmax(fit-content,1fr)_minmax(fit-content,1fr)_auto] tw-items-center tw-gap-4">
                <div>{getVernacularString("c505d928-fde1-4ad6-95f4-2f3109e0e87f", userPreferences.language)}</div>
                <div>
                    <FormSelectComponent
                        items={Object.keys(brandBatteries)}
                        itemBuilder={(item) => {
                            return item == "" ? getVernacularString("38a5a09b-8b40-42ea-8d49-52cce1c949c2", userPreferences.language) : item;
                        }}
                        value={selectedBrand}
                        setValue={(item) => {
                            setApplyChanges(false);
                            setSelectedSegment("");
                            setSelectedModel("");
                            setSelectedFuel("");
                            if (item != "") {
                                setSelectedBrand(item);
                                return;
                            }

                            setSelectedBrand("");
                        }}
                        buttonClassName="disabled:tw-opacity-[0.4] disabled:!tw-bg-secondary-100-light"
                    />
                </div>
                <div>
                    <FormSelectComponent
                        items={selectedBrand == "" ? [] : Object.keys(brandBatteries[selectedBrand])}
                        itemBuilder={(item) => {
                            return item == "" ? getVernacularString("89d6339c-70c9-4b06-aada-fc1800ed6018", userPreferences.language) : item;
                        }}
                        value={selectedSegment}
                        setValue={(item) => {
                            setApplyChanges(false);
                            setSelectedModel("");
                            setSelectedFuel("");
                            if (item != "") {
                                setSelectedSegment(item);
                                return;
                            }

                            setSelectedSegment("");
                        }}
                        disabled={selectedBrand == ""}
                        buttonClassName="disabled:tw-opacity-[0.4] disabled:!tw-bg-secondary-100-light"
                    />
                </div>
                <div>
                    <FormSelectComponent
                        items={selectedBrand == "" || selectedSegment == "" ? [] : Object.keys(brandBatteries[selectedBrand][selectedSegment])}
                        itemBuilder={(item) => {
                            return item == "" ? getVernacularString("c7f85209-525c-4954-8450-f5dd4b3c3d1e", userPreferences.language) : item;
                        }}
                        value={selectedModel}
                        setValue={(item) => {
                            setApplyChanges(false);
                            setSelectedFuel("");
                            if (item != "") {
                                setSelectedModel(item);
                                return;
                            }

                            setSelectedModel("");
                        }}
                        disabled={selectedBrand == "" || selectedSegment == ""}
                        buttonClassName="disabled:tw-opacity-[0.4] disabled:!tw-bg-secondary-100-light"
                    />
                </div>

                <div>
                    <FormSelectComponent
                        items={selectedBrand == "" || selectedSegment == "" || selectedModel == "" ? [] : Object.keys(brandBatteries[selectedBrand][selectedSegment][selectedModel])}
                        itemBuilder={(item) => {
                            return item == "" ? getVernacularString("9e1abe1a-e9ab-47a1-ae4a-36b66a06af82", userPreferences.language) : item;
                        }}
                        value={selectedFuel}
                        setValue={(item) => {
                            setApplyChanges(false);
                            if (item != "") {
                                setSelectedFuel(item);
                                return;
                            }

                            setSelectedFuel("");
                        }}
                        disabled={selectedBrand == "" || selectedSegment == "" || selectedModel == ""}
                        buttonClassName="disabled:tw-opacity-[0.4] disabled:!tw-bg-secondary-100-light"
                    />
                </div>

                <div
                    onClick={() => {
                        setApplyChanges(true);
                        setAppliedBrand(selectedBrand);
                        setAppliedSegment(selectedSegment);
                        setAppliedModel(selectedModel);
                        setAppliedFuel(selectedFuel);
                    }}
                >
                    <button className="lg-cta-button">{getVernacularString("85423d3b-8623-4b4b-b4f1-48953aa4fee7", userPreferences.language)}</button>
                </div>
            </div>

            <div
                className="lg:tw-hidden"
                onClick={tryToOpenFilterDialog}
            >
                <div className="tw-w-fit tw-grid tw-grid-cols-[auto_auto] tw-gap-x-2 lg-bg-secondary-100 tw-p-2 tw-rounded-lg tw-mx-3">
                    <img
                        className="tw-row-start-1 tw-col-start-1 tw-invert dark:tw-invert-0"
                        src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/car-and-suv/3/3.filter.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
                    />
                    <span className="tw-row-start-1 tw-col-start-2 tw-text-center tw-flex tw-items-center">Filter</span>
                </div>
            </div>

            <FilterDialog
                userPreferences={userPreferences}
                isContactUsDialogOpen={isFilterDialogOpen}
                setIsContactUsDialogOpen={setIsFilterDialogOpen}
                brandBatteries={brandBatteries}
                selectedBrand={selectedBrand}
                setSelectedBrand={setSelectedBrand}
                appliedBrand={appliedBrand}
                setAppliedBrand={setAppliedBrand}
                selectedSegment={selectedSegment}
                setSelectedSegment={setSelectedSegment}
                appliedSegment={appliedSegment}
                setAppliedSegment={setAppliedSegment}
                selectedModel={selectedModel}
                setSelectedModel={setSelectedModel}
                appliedModel={appliedModel}
                setAppliedModel={setAppliedModel}
                selectedFuel={selectedFuel}
                setSelectedFuel={setSelectedFuel}
                setAppliedFuel={setAppliedFuel}
                setApplyChanges={setApplyChanges}
            />

            <VerticalSpacer className="tw-h-4 lg:tw-h-6" />

            {/* <div> */}
            <CarouselStyle5
                // @ts-ignore
                items={
                    appliedBrand == "" || appliedSegment == "" || appliedModel == ""
                        ? brandBatteries["Honda"]["Car"]["Model1"]["Petrol/CNG"].map((battery, batteryIndex) => {
                              return (
                                  <OurSuggestionsBatteryCard
                                      userPreferences={userPreferences}
                                      batterySlug={battery.batterySlug}
                                      imageRelativeUrl={battery.imageRelativeUrl}
                                      name={getVernacularString(battery.name, userPreferences.language)}
                                      description={getVernacularString(battery.description, userPreferences.language)}
                                      warranty={getVernacularString(battery.warranty, userPreferences.language)}
                                      capacity={getVernacularString(battery.capacity, userPreferences.language)}
                                      polarity={getVernacularString(battery.polarity, userPreferences.language)}
                                      dimensions={getVernacularString(battery.dimensions, userPreferences.language)}
                                      key={batteryIndex}
                                  />
                              );
                          })
                        : brandBatteries[appliedBrand][appliedSegment][appliedModel][appliedFuel].map((battery, batteryIndex) => {
                              return (
                                  <OurSuggestionsBatteryCard
                                      userPreferences={userPreferences}
                                      batterySlug={battery.batterySlug}
                                      imageRelativeUrl={battery.imageRelativeUrl}
                                      name={getVernacularString(battery.name, userPreferences.language)}
                                      description={getVernacularString(battery.description, userPreferences.language)}
                                      warranty={getVernacularString(battery.warranty, userPreferences.language)}
                                      capacity={getVernacularString(battery.capacity, userPreferences.language)}
                                      polarity={getVernacularString(battery.polarity, userPreferences.language)}
                                      dimensions={getVernacularString(battery.dimensions, userPreferences.language)}
                                      key={batteryIndex}
                                  />
                              );
                          })
                }
                slidesContainerClassName="!tw-auto-cols-[100%] lg:!tw-auto-cols-max tw-place-self-center tw-items-center"
                selectedContainerClassName="tw-h-full"
                deselectedContainersClassName="tw-scale-[0.9] tw-h-full"
                key={applyChanges}
            />
            {/* </div> */}

            <VerticalSpacer className="tw-h-4 lg:tw-h-10" />
        </div>
    );
}

function OurSuggestionsBatteryCard({
    userPreferences,
    batterySlug,
    imageRelativeUrl,
    name,
    description,
    warranty,
    capacity,
    polarity,
    dimensions,
}: {
    userPreferences: UserPreferences;
    batterySlug: string;
    imageRelativeUrl: string;
    name: string;
    description: string;
    warranty: string;
    capacity: string;
    polarity: string;
    dimensions: string;
}) {
    return (
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 lg-bg-our-suggestions-card tw-rounded-lg tw-px-4 tw-py-3 lg:tw-py-6 lg:tw-px-8 tw-max-w-3xl tw-mx-auto">
            <div className="tw-col-start-1 tw-grid tw-grid-flow-row tw-place-items-center">
                <div className="lg:tw-hidden lg-bg-our-suggestions tw-p-2">{getVernacularString("e2ceac17-9977-44d4-933b-1f221aed6c85", userPreferences.language)}</div>
                <div>
                    <FullWidthImage relativePath={imageRelativeUrl} />
                </div>

                <Link
                    className="tw-hidden lg:tw-block"
                    to={batterySlug}
                >
                    <button className="lg-cta-button">{getVernacularString("30de7643-a5bc-49a0-b85f-bfa770836330", userPreferences.language)}</button>
                </Link>
            </div>

            <div className="tw-col-start-1 lg:tw-col-start-2 tw-grid tw-grid-flow-row">
                <div className="lg-text-title1 tw-text-center lg:tw-text-left">{name}</div>

                <VerticalSpacer className="tw-h-2" />

                <div className="lg-text-body tw-text-center lg:tw-text-left">{description}</div>

                <VerticalSpacer className="tw-h-4" />

                <div className="tw-grid tw-grid-rows-[auto_auto_minmax(0,1fr)] md:max-lg:tw-grid-cols-1 md:max-lg:tw-grid-flow-row md:max-lg:tw-place-items-center md:max-lg:tw-place-self-center md:max-lg:tw-w-fit tw-grid-cols-2 tw-gap-x-4 tw-gap-y-8">
                    <div className="tw-row-start-1 tw-col-start-1 md:max-lg:tw-w-full tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2 lg:tw-place-self-start">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/car-and-suv/3/3.warranty.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{getVernacularString("95a938d7-dd71-46de-80b0-a417845dfb4d", userPreferences.language)}</div>
                            <div className="tw-row-start-3">{warranty}</div>
                        </div>
                    </div>

                    <div className="tw-row-start-1 tw-col-start-2 md:max-lg:tw-w-full md:max-lg:tw-row-start-2 md:max-lg:tw-col-start-1 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/car-and-suv/3/3.capacity.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{getVernacularString("c4c53678-fb9a-41c2-8782-de0690cffdd4", userPreferences.language)}</div>
                            <div className="tw-row-start-3">{capacity}</div>
                        </div>
                    </div>

                    <div className="tw-row-start-2 tw-col-start-1 md:max-lg:tw-w-full md:max-lg:tw-row-start-3 md:max-lg:tw-col-start-1 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/car-and-suv/3/3.polarity.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{getVernacularString("05bda873-c84c-4376-8a17-6503ac9d2820", userPreferences.language)}</div>
                            <div className="tw-row-start-3">{polarity}</div>
                        </div>
                    </div>

                    <div className="tw-row-start-2 tw-col-start-2 md:max-lg:tw-w-full md:max-lg:tw-row-start-4 md:max-lg:tw-col-start-1 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/car-and-suv/3/3.dimensions.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{getVernacularString("9c719db5-fa53-423e-9b96-a77602b3c5bc", userPreferences.language)}</div>
                            <div className="tw-row-start-3">{dimensions}</div>
                        </div>
                    </div>
                </div>

                <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

                <Link
                    className="tw-place-self-center lg:tw-hidden"
                    to={batterySlug}
                >
                    <button className="lg-cta-button">{getVernacularString("30de7643-a5bc-49a0-b85f-bfa770836330", userPreferences.language)}</button>
                </Link>

                <VerticalSpacer className="tw-h-4 lg:tw-hidden" />
            </div>
        </div>
    );
}

function TopCarAndSuvBatteryPicks({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const featuredProducts = {
        Eterna: {
            title: "5bda278a-5862-4086-ab7c-f54aa5a0df4c",
            vehicleImageRelativeUrl: "/livguard/car-and-suv/4/4.zing-eterna-car.png",
            productImageRelativeUrl: "/livguard/car-and-suv/4/4.zing-eterna.png",
            products: [
                {
                    productType: ProductType.automotiveBattery,
                    name: "ZE 38B20 L",
                    slug: "ze38b20l",
                    capacity: allProductDetails["ze38b20l"][userPreferences.language].specifications[2].value,
                    warranty: allProductDetails["ze38b20l"][userPreferences.language].specifications[1].value,
                    price: "XXXXX",
                },
                {
                    productType: ProductType.automotiveBattery,
                    name: "ZE 38B20 R",
                    slug: "ze38b20r",
                    capacity: allProductDetails["ze38b20r"][userPreferences.language].specifications[2].value,
                    warranty: allProductDetails["ze38b20r"][userPreferences.language].specifications[1].value,
                    price: "XXXXX",
                },
                {
                    productType: ProductType.automotiveBattery,
                    name: "ZE 55B24 LSL",
                    slug: "ze55b24lsl",
                    capacity: allProductDetails["ze55b24lsl"][userPreferences.language].specifications[2].value,
                    warranty: allProductDetails["ze55b24lsl"][userPreferences.language].specifications[1].value,
                    price: "XXXXX",
                },
            ],
        },
        Ultra: {
            title: "16c43b68-0710-47d2-953d-2e0ac5c33f9d",
            vehicleImageRelativeUrl: "/livguard/car-and-suv/4/4.zing-ultra-car.png",
            productImageRelativeUrl: "/livguard/car-and-suv/4/4.zing-ultra.png",
            products: [
                {
                    productType: ProductType.automotiveBattery,
                    name: "ZU 38B20 L",
                    slug: "zu38b20l",
                    capacity: allProductDetails["zu38b20l"][userPreferences.language].specifications[2].value,
                    warranty: allProductDetails["zu38b20l"][userPreferences.language].specifications[1].value,
                    price: "XXXXX",
                },
                {
                    productType: ProductType.automotiveBattery,
                    name: "ZU 38B20 R",
                    slug: "zu38b20r",
                    capacity: allProductDetails["zu38b20r"][userPreferences.language].specifications[2].value,
                    warranty: allProductDetails["zu38b20r"][userPreferences.language].specifications[1].value,
                    price: "XXXXX",
                },
                {
                    productType: ProductType.automotiveBattery,
                    name: "ZU 38B20 BHL",
                    slug: "zu38b20bhl",
                    capacity: allProductDetails["zu38b20bhl"][userPreferences.language].specifications[2].value,
                    warranty: allProductDetails["zu38b20bhl"][userPreferences.language].specifications[1].value,
                    price: "XXXXX",
                },
                {
                    productType: ProductType.automotiveBattery,
                    name: "ZU DIN44 LHL",
                    slug: "zudin44lhl",
                    capacity: allProductDetails["zudin44lhl"][userPreferences.language].specifications[2].value,
                    warranty: allProductDetails["zudin44lhl"][userPreferences.language].specifications[1].value,
                    price: "XXXXX",
                },
                {
                    productType: ProductType.automotiveBattery,
                    name: "ZU DIN50 L",
                    slug: "zudin50l",
                    capacity: allProductDetails["zudin50l"][userPreferences.language].specifications[2].value,
                    warranty: allProductDetails["zudin50l"][userPreferences.language].specifications[1].value,
                    price: "XXXXX",
                },
                {
                    productType: ProductType.automotiveBattery,
                    name: "ZU DIN55 R",
                    slug: "zudin55r",
                    capacity: allProductDetails["zudin55r"][userPreferences.language].specifications[2].value,
                    warranty: allProductDetails["zudin55r"][userPreferences.language].specifications[1].value,
                    price: "XXXXX",
                },
                {
                    productType: ProductType.automotiveBattery,
                    name: "ZU DIN60 L",
                    slug: "zudin60l",
                    capacity: allProductDetails["zudin60l"][userPreferences.language].specifications[2].value,
                    warranty: allProductDetails["zudin60l"][userPreferences.language].specifications[1].value,
                    price: "XXXXX",
                },
                {
                    productType: ProductType.automotiveBattery,
                    name: "ZU DIN65 LHL",
                    slug: "zudin65lhl",
                    capacity: allProductDetails["zudin65lhl"][userPreferences.language].specifications[2].value,
                    warranty: allProductDetails["zudin65lhl"][userPreferences.language].specifications[1].value,
                    price: "XXXXX",
                },
            ],
        },
        Primo: {
            title: "f2314bd0-7e41-4ce1-9b84-08b02a2ccaa9",
            vehicleImageRelativeUrl: "/livguard/car-and-suv/4/4.zing-primo-car.png",
            productImageRelativeUrl: "/livguard/car-and-suv/4/4.zing-primo.png",
            products: [
                {
                    productType: ProductType.automotiveBattery,
                    name: "ZP 38B20 L",
                    slug: "zp38b20l",
                    capacity: allProductDetails["zp38b20l"][userPreferences.language].specifications[2].value,
                    warranty: allProductDetails["zp38b20l"][userPreferences.language].specifications[1].value,
                    price: "XXXXX",
                },
                {
                    productType: ProductType.automotiveBattery,
                    name: "ZP 70D26 L",
                    slug: "zp70d26l",
                    capacity: allProductDetails["zp70d26l"][userPreferences.language].specifications[2].value,
                    warranty: allProductDetails["zp70d26l"][userPreferences.language].specifications[1].value,
                    price: "XXXXX",
                },
            ],
        },
        ProCab: {
            title: "50836139-5c57-4eee-88e4-69f83fb371ab",
            vehicleImageRelativeUrl: "/livguard/car-and-suv/4/4.pro-cab-car.png",
            productImageRelativeUrl: "/livguard/car-and-suv/4/4.pro-cab.png",
            products: [
                {
                    productType: ProductType.automotiveBattery,
                    name: "PC 38B20 L",
                    slug: "pc38b20l",
                    capacity: allProductDetails["pc38b20l"][userPreferences.language].specifications[2].value,
                    warranty: allProductDetails["pc38b20l"][userPreferences.language].specifications[1].value,
                    price: "XXXXX",
                },
            ],
        },
        ProCabPlus: {
            title: "299dcb87-0cc8-489e-a94b-596cd3335156",
            vehicleImageRelativeUrl: "/livguard/car-and-suv/4/4.zing-primo-car.png",
            productImageRelativeUrl: "/livguard/car-and-suv/4/4.zing-primo.png",
            products: [
                {
                    productType: ProductType.automotiveBattery,
                    name: "LG LPP 38B20 L",
                    slug: "lglpp38b20l",
                    capacity: allProductDetails["lglpp38b20l"][userPreferences.language].specifications[2].value,
                    warranty: allProductDetails["lglpp38b20l"][userPreferences.language].specifications[1].value,
                    price: "XXXXX",
                },
            ],
        },
    };

    const eternaRef = useRef(null);
    const ultraRef = useRef(null);
    const primoRef = useRef(null);
    const proCabRef = useRef(null);
    const proCabPlusRef = useRef(null);

    const refs = [eternaRef, ultraRef, primoRef, proCabRef, proCabPlusRef];

    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-flow-row tw-w-full tw-px-3 lg:lg-px-screen-edge-2 lg:tw-py-4", className)}>
            <DefaultTextAnimation className="tw-grid tw-grid-flow-row tw-gap-y-1 tw-text-center lg-text-headline">
                <div dangerouslySetInnerHTML={{__html: getVernacularString("72238b02-d35a-497e-be9d-1d1f2742dd6d", userPreferences.language)}}></div>
                <div>{getVernacularString("7dccb0a9-930e-498d-bc45-194b73920af2", userPreferences.language)}</div>
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-6" />

            <SubCategoryProductsInternal
                userPreferences={userPreferences}
                refs={refs}
                featuredProducts={featuredProducts}
                navigatorsContainerClassName="lg:tw-w-fit tw-grid tw-grid-rows-2 tw-grid-cols-2 lg:tw-grid-rows-1 lg:tw-grid-flow-col lg:tw-auto-cols-max lg:tw-justify-center tw-gap-4"
                vehicleImageClassName="lg:tw-absolute lg:tw-bottom-0 tw-w-full lg:tw-w-[calc(100%-2rem)]"
                productImageClassName="tw-z-[2] tw-absolute tw-bottom-[-0.3125rem] tw-h-[50%] lg:tw-h-1/3"
                productImageLeftClassName="lg:tw-left-[5%] tw-left-[0rem]"
                productImageRightClassName="lg:tw-right-[5%] tw-right-[0rem]"
            />
        </div>
    );
}

function BatteryCard({
    slug,
    productType,
    userPreferences,
    isBestSeller,
    imageRelativeUrl,
    productName,
    productPrice,
    capacity,
    warranty,
}: {
    slug: string;
    productType: ProductType;
    userPreferences: UserPreferences;
    isBestSeller?: boolean;
    imageRelativeUrl: string;
    productName: string;
    productPrice: string;
    capacity: string;
    warranty: string;
}) {
    return (
        <Link
            to={`/product/${slug}`}
            className="tw-w-full tw-h-full tw-grid tw-grid-cols-1 lg-bg-secondary-100 tw-rounded-lg"
        >
            {isBestSeller != null && isBestSeller === true ? (
                <div className="tw-row-start-1 tw-h-1rem lg-stabilizers-best-seller-gradient tw-rounded-tr-lg tw-place-self-end tw-text-xs tw-px-3 tw-py-1 lg:tw-px-4 tw-flex tw-flex-row tw-items-center !tw-text-secondary-900-dark">
                    <span>{getVernacularString("14e0e286-5fd7-43aa-a6f3-5b3b9a0ec71f", userPreferences.language)}</span>
                </div>
            ) : (
                <VerticalSpacer className="tw-h-[1.5rem]" />
            )}

            <div className="tw-p-4 tw-grid tw-grid-flow-row">
                <FullWidthImage relativePath={imageRelativeUrl} />

                <div className="tw-w-full tw-text-center lg-text-body-bold lg-text-secondary-900 tw-whitespace-nowrap">{productName}</div>

                <VerticalSpacer className="tw-h-2" />

                <div className="tw-place-self-center tw-grid tw-grid-cols-[minmax(0,1fr)_auto_0.5rem_70%_minmax(0,1fr)] tw-items-center tw-w-full">
                    <img
                        className="tw-col-start-2 tw-invert dark:tw-invert-0"
                        src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/car-and-suv/4/capacity.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
                    />
                    <span className="tw-col-start-4 tw-text-center lg-text-icon lg:lg-text-body lg:!lg-text-secondary-900">{capacity}</span>
                </div>

                <VerticalSpacer className="tw-h-2" />

                <div className="tw-place-self-center tw-grid tw-grid-cols-[minmax(0,1fr)_auto_0.5rem_70%_minmax(0,1fr)] tw-items-center tw-w-full">
                    <img
                        className="tw-col-start-2 tw-invert dark:tw-invert-0"
                        src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/car-and-suv/4/warranty.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
                    />
                    <span className="tw-col-start-4 tw-text-center lg-text-icon lg:lg-text-body lg:!lg-text-secondary-900">{warranty}</span>
                </div>

                <VerticalSpacer className="tw-h-6" />

                <div className="tw-w-full tw-text-center lg-text-secondary-700">
                    {`${getVernacularString("abce92ec-fd9a-4578-ab56-ddfd9fdafe72", userPreferences.language)}${productPrice}${getVernacularString(
                        "0044b486-6eca-4e3a-abf0-102eede6e10c",
                        userPreferences.language,
                    )}`}
                </div>

                <VerticalSpacer className="tw-h-4" />

                <button className="lg-cta-button tw-w-full tw-text-center tw-px-1">{getVernacularString("063dc56b-910e-4a48-acb8-8f52668a4c72", userPreferences.language)}</button>
            </div>
        </Link>
    );
}

function WeAreEverywhere({userPreferences, showCtaButton, className}: {userPreferences: UserPreferences; showCtaButton: boolean; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("[@media(max-width:1024px)]:lg-px-screen-edge", className)}>
            <div className="tw-relative lg-bg-secondary-100 tw-rounded-lg tw-h-[350px] tw-overflow-hidden lg:tw-h-full lg:tw-px-2">
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

function ChooseYourIdealCarAndSUVBattery({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_1rem_auto_1rem_auto_minmax(0,1fr)] ", className)}>
            <div className="tw-row-start-2 tw-text-center lg-text-headline">{getVernacularString("3dd8ef5c-fbb6-42e3-ba7a-32ac98bef635", userPreferences.language)}</div>
            <div
                className="tw-row-start-3 tw-text-center lg-text-headline"
                dangerouslySetInnerHTML={{__html: getVernacularString("a1cd74ff-061a-4631-916b-66ca35810235", userPreferences.language)}}
            />
            <div className="tw-row-start-5 tw-text-center lg-px-screen-edge-2">{getVernacularString("9e3c8233-9c58-4c24-b87c-fd99c33ff11e", userPreferences.language)}</div>

            <div className="tw-row-start-7 tw-grid tw-p-4 tw-justify-center tw-w-full">
                <div className="tw-w-fit tw-grid tw-grid-rows-2 lg:tw-grid-rows-1 lg:tw-grid-cols-2 tw-gap-4 tw-grid-flow-col">
                    <a
                        href="https://www.livguard.com/static-assets/livguard-buying-guide.pdf"
                        download
                        target="_blank"
                        className="lg-cta-outline-button lg-cta-outline-button-category-section-transition tw-py-3 tw-rounded-full tw-grid tw-grid-cols-[auto_1rem_auto_minmax(0,1fr)] tw-group tw-h-full tw-px-4"
                    >
                        <img
                            className="tw-row-start-1 tw-col-start-1 tw-h-4 tw-w-4 lg:tw-h-6 lg:tw-w-6 tw-place-self-center tw-transition-colors tw-duration-200 group-hover:tw-brightness-0 group-hover:tw-invert"
                            src="https://files.growthjockey.com/livguard/icons/stabilizer/buying-guide.svg"
                        />
                        <div className="tw-row-start-1 tw-col-start-3 tw-flex tw-flex-row tw-items-center lg-text-body group-hover:!tw-text-secondary-100-light tw-transition-colors tw-duration-200">
                            {getVernacularString("b3660763-f092-42d4-a97d-76a34dd701f6", userPreferences.language)}
                        </div>
                    </a>
                    <a
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
                            {getVernacularString("51ae4bbd-0f66-42bc-b031-cc3e9dc4dc26", userPreferences.language)}
                        </div>
                    </a>
                </div>
            </div>

            <VerticalSpacer className="tw-hidden lg:tw-flex tw-row-start-8 tw-h-6" />

            <Link
                to="/battery-finder"
                className="tw-row-start-9 tw-grid tw-place-items-center"
            >
                <div className="lg-cta-button tw-place-self-center">{getVernacularString("1271cac7-693c-48bc-850f-16199416dd0e", userPreferences.language)}</div>
            </Link>

            <VerticalSpacer className="lg:tw-row-start-10 tw-hidden lg:tw-block lg:tw-h-12" />
        </div>
    );
}

function FaqSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const faqs = [
        {
            question: "2e95883c-ae7a-46d4-91c7-baff1724f551",
            answer: "e5dc6e92-092d-4879-8e6f-869818c6fe35",
        },
        {
            question: "c7184bc7-e542-4611-9a62-ad9459b1c6ec",
            answer: "1a580e9e-7d49-4c5e-b99a-4c75b5788551",
        },
        {
            question: "9d49ec97-e7f0-4fb7-90ad-23f73ed28b69",
            answer: "93d6fb1c-e245-43ee-a440-43938bc33b1d",
        },
        {
            question: "348ff8a2-eb90-4f43-8099-306938e8f7cb",
            answer: "ec314aa6-aed3-4ef2-96d4-9627a4241bc4",
        },
        {
            question: "09cfe0e4-6cf2-4624-96d2-814f38c3a7b7",
            answer: "a334719f-b502-42db-ad3d-61020e863d49",
        },
    ];

    return (
        <FaqSectionInternal
            faqs={faqs}
            userPreferences={userPreferences}
            className={className}
        />
    );
}

function SocialHandles({userPreferences, heading, className}: {userPreferences: UserPreferences; heading: {text1: string; text2: string}; className?: string}) {
    const embeddedVideos = [
        <EmbeddedYoutubeVideo
            id="b6gqLXTnZnw"
            style={{aspectRatio: "560/315"}}
        />,
        <EmbeddedYoutubeVideo
            id="CRabeGp9800"
            style={{aspectRatio: "560/315"}}
        />,
        <EmbeddedYoutubeVideo
            id="tFj9GJcjq6s"
            style={{aspectRatio: "560/315"}}
        />,
    ];

    return (
        <div className={concatenateNonNullStringsWithSpaces("[@media(max-width:1024px)]:lg-px-screen-edge tw-w-full tw-max-w-7xl tw-mx-auto", className)}>
            <div className="tw-flex tw-flex-col lg-bg-secondary-100 tw-rounded-lg tw-text-center lg-px-screen-edge lg:tw-hidden">
                <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

                <div className="lg-text-headline">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString(heading.text1, userPreferences.language)}} />

                    <div dangerouslySetInnerHTML={{__html: getVernacularString(heading.text2, userPreferences.language)}} />
                </div>

                <VerticalSpacer className="tw-h-4" />

                <CarouselStyle3 items={embeddedVideos} />

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-body">{getVernacularString("homeS11T2", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-2" />

                <div className="tw-flex tw-justify-evenly">
                    <a
                        href="https://www.facebook.com/LivguardEnergy/"
                        target="_blank"
                    >
                        <Facebook className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                    <a
                        href="https://twitter.com/LivguardEnergy"
                        target="_blank"
                    >
                        <Twitter className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                    <a
                        href="https://www.instagram.com/livguardenergy/"
                        target="_blank"
                    >
                        <Instagram className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                    <a
                        href="https://www.linkedin.com/company/livguard-energy/"
                        target="_blank"
                    >
                        <Linkedin className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                    <a
                        href="https://www.youtube.com/@LivguardEnergy"
                        target="_blank"
                    >
                        <Youtube className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                </div>

                <VerticalSpacer className="tw-h-4" />
            </div>

            <div className="tw-hidden lg:tw-flex tw-flex-col tw-justify-center tw-text-center">
                <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

                <div className="lg-text-headline">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString(heading.text1, userPreferences.language)}} />

                    <div dangerouslySetInnerHTML={{__html: getVernacularString(heading.text2, userPreferences.language)}} />
                </div>

                <VerticalSpacer className="tw-h-8" />

                <div className="tw-grid tw-grid-cols-3 tw-gap-4">
                    <ItemBuilder
                        items={embeddedVideos}
                        itemBuilder={(video, videoIndex) => (
                            <div
                                className="tw-flex tw-flex-col lg-bg-secondary-100 tw-rounded-lg tw-pb-4 tw-overflow-hidden"
                                key={videoIndex}
                            >
                                {video}

                                <VerticalSpacer className="tw-h-2" />

                                <div className="lg-text-body">{getVernacularString("homeS11T2", userPreferences.language)}</div>

                                <div className="tw-flex tw-justify-evenly">
                                    <a
                                        href="https://www.facebook.com/LivguardEnergy/"
                                        target="_blank"
                                    >
                                        <Facebook className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                                    </a>
                                    <a
                                        href="https://twitter.com/LivguardEnergy"
                                        target="_blank"
                                    >
                                        <Twitter className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                                    </a>
                                    <a
                                        href="https://www.instagram.com/livguardenergy/"
                                        target="_blank"
                                    >
                                        <Instagram className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/company/livguard-energy/"
                                        target="_blank"
                                    >
                                        <Linkedin className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                                    </a>
                                    <a
                                        href="https://www.youtube.com/@LivguardEnergy"
                                        target="_blank"
                                    >
                                        <Youtube className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                                    </a>
                                </div>
                            </div>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

export function FilterDialog({
    userPreferences,
    isContactUsDialogOpen,
    setIsContactUsDialogOpen,
    brandBatteries,
    selectedBrand,
    setSelectedBrand,
    setAppliedBrand,
    selectedSegment,
    setSelectedSegment,
    setAppliedSegment,
    selectedModel,
    setSelectedModel,
    setAppliedModel,
    selectedFuel,
    setSelectedFuel,
    setAppliedFuel,
    setApplyChanges,
}: {
    userPreferences: UserPreferences;
    isContactUsDialogOpen: boolean;
    setIsContactUsDialogOpen: React.Dispatch<boolean>;
    brandBatteries: any;
    selectedBrand: string;
    setSelectedBrand: React.Dispatch<string>;
    appliedBrand: string;
    setAppliedBrand: React.Dispatch<string>;
    selectedSegment: string;
    setSelectedSegment: React.Dispatch<string>;
    appliedSegment: string;
    setAppliedSegment: React.Dispatch<string>;
    selectedModel: string;
    setSelectedModel: React.Dispatch<string>;
    appliedModel: string;
    setAppliedModel: React.Dispatch<string>;
    selectedFuel: string;
    setSelectedFuel: React.Dispatch<string>;
    setAppliedFuel: React.Dispatch<string>;
    setApplyChanges: React.Dispatch<boolean>;
}) {
    function tryToCloseContactUsDialog() {
        setIsContactUsDialogOpen(false);
    }

    return (
        <>
            <LivguardDialog
                isDialogOpen={isContactUsDialogOpen}
                tryToCloseDialog={tryToCloseContactUsDialog}
                title={"Filter"}
                showCloseIcon={true}
            >
                <div className="tw-place-self-center tw-w-full tw-grid tw-grid-flow-row tw-gap-y-6">
                    <div>
                        <FormSelectComponent
                            items={Object.keys(brandBatteries)}
                            itemBuilder={(item) => {
                                return item == "" ? getVernacularString("38a5a09b-8b40-42ea-8d49-52cce1c949c2", userPreferences.language) : item;
                            }}
                            value={selectedBrand}
                            setValue={(item) => {
                                setApplyChanges(false);
                                setSelectedSegment("");
                                setSelectedModel("");
                                setSelectedFuel("");
                                if (item != "") {
                                    setSelectedBrand(item);
                                    return;
                                }

                                setSelectedBrand("");
                            }}
                            buttonClassName="disabled:tw-opacity-[0.4] disabled:!tw-bg-secondary-100-light"
                        />
                    </div>
                    <div>
                        <FormSelectComponent
                            items={selectedBrand == "" ? [] : Object.keys(brandBatteries[selectedBrand])}
                            itemBuilder={(item) => {
                                return item == "" ? getVernacularString("89d6339c-70c9-4b06-aada-fc1800ed6018", userPreferences.language) : item;
                            }}
                            value={selectedSegment}
                            setValue={(item) => {
                                setApplyChanges(false);
                                setSelectedModel("");
                                setSelectedFuel("");
                                if (item != "") {
                                    setSelectedSegment(item);
                                    return;
                                }

                                setSelectedSegment("");
                            }}
                            disabled={selectedBrand == ""}
                            buttonClassName="disabled:tw-opacity-[0.4] disabled:!tw-bg-secondary-100-light"
                        />
                    </div>
                    <div>
                        <FormSelectComponent
                            items={selectedBrand == "" || selectedSegment == "" ? [] : Object.keys(brandBatteries[selectedBrand][selectedSegment])}
                            itemBuilder={(item) => {
                                return item == "" ? getVernacularString("c7f85209-525c-4954-8450-f5dd4b3c3d1e", userPreferences.language) : item;
                            }}
                            value={selectedModel}
                            setValue={(item) => {
                                setApplyChanges(false);
                                setSelectedFuel("");
                                if (item != "") {
                                    setSelectedModel(item);
                                    return;
                                }

                                setSelectedModel("");
                            }}
                            disabled={selectedBrand == "" || selectedSegment == ""}
                            buttonClassName="disabled:tw-opacity-[0.4] disabled:!tw-bg-secondary-100-light"
                        />
                    </div>

                    <div>
                        <FormSelectComponent
                            items={selectedBrand == "" || selectedSegment == "" || selectedModel == "" ? [] : Object.keys(brandBatteries[selectedBrand][selectedSegment][selectedModel])}
                            itemBuilder={(item) => {
                                return item == "" ? getVernacularString("9e1abe1a-e9ab-47a1-ae4a-36b66a06af82", userPreferences.language) : item;
                            }}
                            value={selectedFuel}
                            setValue={(item) => {
                                setApplyChanges(false);
                                if (item != "") {
                                    setSelectedFuel(item);
                                    return;
                                }

                                setSelectedFuel("");
                            }}
                            disabled={selectedBrand == "" || selectedSegment == "" || selectedModel == ""}
                            buttonClassName="disabled:tw-opacity-[0.4] disabled:!tw-bg-secondary-100-light"
                        />
                    </div>

                    <div
                        onClick={() => {
                            setApplyChanges(true);
                            tryToCloseContactUsDialog();
                        }}
                    >
                        <button
                            className="lg-cta-button tw-w-full"
                            // disabled={selectedBrand == "" || selectedSegment == "" || selectedModel == ""}
                            onClick={() => {
                                setApplyChanges(true);
                                setAppliedBrand(selectedBrand);
                                setAppliedSegment(selectedSegment);
                                setAppliedModel(selectedModel);
                                setAppliedFuel(selectedFuel);
                            }}
                        >
                            {getVernacularString("85423d3b-8623-4b4b-b4f1-48953aa4fee7", userPreferences.language)}
                        </button>
                    </div>
                </div>
            </LivguardDialog>
        </>
    );
}
