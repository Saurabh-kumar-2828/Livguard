import React, {useEffect, useState} from "react";
import {ActionFunction, LoaderFunction, json} from "@remix-run/node";
import {Form, Link, useActionData, useLoaderData} from "@remix-run/react";
import {Dialog, Transition} from "@headlessui/react";
import {toast} from "react-toastify";
import {useResizeDetector} from "react-resize-detector";
import {Facebook, Instagram, Linkedin, Twitter, X, Youtube} from "react-bootstrap-icons";

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

import {Theme, UserPreferences} from "~/typeDefinitions";

import {getVernacularString} from "~/vernacularProvider";

import {appendSpaceToString, getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {CarouselStyle5} from "~/components/carouselStyle5";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {CarouselStyle3} from "~/components/carouselStyle3";
import {SocialHandles, WhatsBestForYouComponent} from "~/components/category/common";
import {DealerLocator} from ".";

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

export type ActionData = {
    error: string | null;
};

export const action: ActionFunction = async ({request, params}) => {
    const body = await request.formData();

    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~ inside action data ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

    const issueDetails = safeParse(getStringFromUnknown, body.get("issueDetails"));
    const contactNumber = safeParse(getStringFromUnknown, body.get("contactNumber"));
    const emailId = safeParse(getStringFromUnknown, body.get("emailId"));
    const name = safeParse(getStringFromUnknown, body.get("name"));
    const pinCode = safeParse(getStringFromUnknown, body.get("pinCode"));
    const city = safeParse(getStringFromUnknown, body.get("city"));
    const state = safeParse(getStringFromUnknown, body.get("state"));
    const serviceNumber = safeParse(getStringFromUnknown, body.get("serviceNumber"));
    const termsAndConditionsChecked = safeParse(getStringFromUnknown, body.get("termsAndConditionsChecked"));
    const utmParameters = safeParse(getStringFromUnknown, body.get("utmParameters"));
    const product = safeParse(getStringFromUnknown, body.get("product"));

    if (
        utmParameters === null ||
        termsAndConditionsChecked === null ||
        issueDetails === null ||
        contactNumber === null ||
        emailId === null ||
        name === null ||
        pinCode === null ||
        city === null ||
        state === null ||
        product === null
    ) {
        const actionData: ActionData = {
            error: "Inputs cannot be null! Error code: af16f518-6eef-4b8c-9ccf-34f86cee43c7",
        };
        return json(actionData);
    }

    const utmParametersDecoded = JSON.parse(utmParameters);

    const insertResult = await insertServiceRequests(generateUuid(), {
        issueDetails: issueDetails,
        product: product,
        contactNumber: contactNumber,
        emailId: emailId,
        name: name,
        pinCode: pinCode,
        city: city,
        state: state,
        serviceNumber: serviceNumber,
        utmParameters: utmParametersDecoded,
        termsAndConditionsChecked: termsAndConditionsChecked,
    });

    if (insertResult instanceof Error) {
        const actionData: ActionData = {
            error: "Error in submiting form! Error code: 7b84af66-174a-4b89-bbfa-3a51d9aa8862",
        };
        return json(actionData);
    }

    const actionData: ActionData = {
        error: null,
    };

    return json(actionData);
};

export default () => {
    const {userPreferences, redirectTo} = useLoaderData() as LoaderData;
    const actionData = useActionData() as ActionData;

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
                <StabilizerPage
                    userPreferences={userPreferences}
                    actionData={actionData}
                />
            </PageScaffold>
        </>
    );
};

function StabilizerPage({userPreferences, actionData}: {userPreferences: UserPreferences; actionData: {error: string | null}}) {
    const utmParameters = useUtmSearchParameters();

    return (
        <>
            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-x-16 tw-items-start tw-justify-center">
                <HeroSection
                    userPreferences={userPreferences}
                    className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
                />

                <VerticalSpacer className="tw-h-10 tw-row-start-2 tw-col-start-1 lg:tw-col-span-full" />

                <BatteriesThatAreMeantToLast
                    userPreferences={userPreferences}
                    className="tw-row-start-3 tw-col-start-1 tw-col-span-full"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-4 tw-col-start-1 lg:tw-col-span-full" />

                <div className="tw-row-start-5 tw-grid lg:tw-grid-cols-[minmax(0,1fr)_minmax(0,2fr)] tw-col-span-full lg:lg-px-screen-edge-2 tw-gap-x-5">
                    <WeAreEverywhere
                        userPreferences={userPreferences}
                        className="tw-row-start-5 lg:tw-col-start-1 lg:tw-h-full"
                        showCtaButton={true}
                    />

                    <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-6 lg:tw-col-start-1 lg:tw-col-span-full lg:tw-hidden" />

                    <ChooseTheBestStabilizer
                        userPreferences={userPreferences}
                        className="tw-row-start-7 lg:tw-row-start-5 lg:tw-col-start-2"
                    />
                </div>
                {/* <div className="tw-row-start-5 lg:tw-row-start-5 tw-grid tw-grid-cols-1 tw-grid-rows-2 lg:tw-items-center lg:tw-grid-cols-[minmax(0,2fr)_auto_minmax(0,3fr)] lg:tw-grid-rows-1 tw-gap-y-10 lg:tw-gap-x-4 lg:tw-px-[72px] xl:tw-px-[120px] tw-col-span-full">
                    <WeAreEverywhere
                        userPreferences={userPreferences}
                        showCtaButton={true}
                        className="tw-row-start-1 tw-col-start-1 lg:tw-row-span-full lg:tw-col-start-1 lg:tw-h-full lg:tw-min-h-[36rem]"
                    />
                    <DealerLocator
                        userPreferences={userPreferences}
                        showCtaButton={true}
                        className="tw-row-start-1 tw-col-start-1 lg:tw-row-span-full lg:tw-col-start-1 lg:tw-h-full lg:tw-min-h-[36rem]"
                    />

                    <ChooseBestInverterBattery
                        userPreferences={userPreferences}
                        utmParameters={utmParameters}
                        className="tw-row-start-2 lg:tw-col-start-3 lg:tw-row-start-1"
                    />
                </div> */}

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-8 lg:tw-row-start-6 tw-col-start-1 lg:tw-col-span-full" />

                <FaqSection
                    userPreferences={userPreferences}
                    className="tw-row-start-9 lg:tw-row-start-7 lg:tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-10 lg:tw-row-start-8 tw-col-start-1 lg:tw-col-span-full" />

                <SocialHandles
                    userPreferences={userPreferences}
                    heading={{text1: "b0a3aa40-4b00-4bdd-88e0-67085fafa92b", text2: `c0f802cc-902b-4328-b631-a3fad8fc7d18`}}
                    className="tw-row-start-11 lg:tw-row-start-9 tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-12 lg:tw-row-start-10 tw-col-start-1 lg:tw-col-span-full" />
            </div>
        </>
    );
}

function HeroSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                // tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height))-9.5rem]
                "tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height)-9.5rem)] lg:tw-h-[70vh] tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_1rem_auto_1.5rem] lg:tw-grid-rows-[minmax(0,1fr)_auto_auto_1rem_auto_3.5rem] lg:tw-grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] tw-text-center",
                className,
            )}
            ref={ref}
        >
            {containerWidth == null || containerHeight == null ? null : (
                <CoverImage
                    relativePath={
                        containerHeight > containerWidth || containerWidth < 640
                            ? "/livguard/services-page/6/service_mobile_banner-1adc56.jpg"
                            : "/livguard/services-page/6/service_desktop_banner-7f2e3f.jpg"
                    }
                    className="tw-row-start-1 tw-col-start-1 tw-row-span-full lg:tw-col-span-full"
                    key={
                        containerHeight > containerWidth || containerWidth < 640
                            ? "/livguard/services-page/6/service_mobile_banner-1adc56.jpg"
                            : "/livguard/services-page/6/service_desktop_banner-7f2e3f.jpg"
                    }
                />
            )}

            <DefaultTextAnimation className="tw-row-start-2 tw-col-start-1 lg:tw-col-start-2">
                <div className="lg-text-banner tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">
                    {/* {getVernacularString("1f489840-705d-44b1-a18a-73a2645594de", userPreferences.language)} */}
                    Best Voltage
                </div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-3 tw-col-start-1 lg:tw-col-start-2">
                <div className="lg-text-banner tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">
                    {/* {getVernacularString("1f489840-705d-44b1-a18a-73a2645594de", userPreferences.language)} */}
                    Stabilizers for Home
                </div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-5 tw-col-start-1 lg:tw-col-start-2">
                <div className="lg-text-body !tw-text-secondary-900-dark">
                    {/* {getVernacularString("5a7fe2d5-9f46-4bb4-814e-7f075f8ca843", userPreferences.language)} */}
                    Livguard, aims at offering “Smart and Innovative energy solutions” to its customers. Our company is determined at delivering quality,
                </div>
            </DefaultTextAnimation>
        </div>
    );
}

function BatteriesThatAreMeantToLast({userPreferences, className}: {userPreferences: UserPreferences; className: string}) {
    const BatteryCard = ({title, description, imageRelativePath}: {title: string; description: string; imageRelativePath: string}) => {
        return (
            <div
                className={concatenateNonNullStringsWithSpaces(
                    "tw-grid tw-grid-rows-[1rem_auto_1rem_auto_minmax(1rem,1fr)_auto_minmax(1rem,1fr)] tw-cols-[auto] tw-w-full tw-h-full tw-px-4 tw-py-4 tw-bg-secondary-100-dark tw-rounded-lg",
                    className,
                )}
            >
                <div className="tw-row-start-2">
                    <FullWidthImage relativePath={imageRelativePath} />
                </div>

                <DefaultTextAnimation className="tw-row-start-4 tw-text-center lg-text-title1">{title}</DefaultTextAnimation>

                <DefaultTextAnimation className="tw-row-start-6 tw-text-center lg-text-body">{description}</DefaultTextAnimation>
            </div>
        );
    };

    const batteriesData: Array<{titleTextContentPiece: string; bodyTextContentPiece: string; imageRelativePath: string}> = [
        {
            titleTextContentPiece: "categoryBatteriesS2Slide1Heading",
            bodyTextContentPiece: "categoryBatteriesS2Slide1Description",
            imageRelativePath: "/livguard/category/batteries/2/1.jpg",
        },
        {
            titleTextContentPiece: "categoryBatteriesS2Slide2Heading",
            bodyTextContentPiece: "categoryBatteriesS2Slide2Description",
            imageRelativePath: "/livguard/category/batteries/2/2.jpg",
        },
        {
            titleTextContentPiece: "categoryBatteriesS2Slide3Heading",
            bodyTextContentPiece: "categoryBatteriesS2Slide3Description",
            imageRelativePath: "/livguard/category/batteries/2/3.jpg",
        },
        {
            titleTextContentPiece: "categoryBatteriesS2Slide4Heading",
            bodyTextContentPiece: "categoryBatteriesS2Slide4Description",
            imageRelativePath: "/livguard/category/batteries/2/4.jpg",
        },
        {
            titleTextContentPiece: "categoryBatteriesS2Slide4Heading",
            bodyTextContentPiece: "categoryBatteriesS2Slide4Description",
            imageRelativePath: "/livguard/category/batteries/2/4.jpg",
        },
        {
            titleTextContentPiece: "categoryBatteriesS2Slide4Heading",
            bodyTextContentPiece: "categoryBatteriesS2Slide4Description",
            imageRelativePath: "/livguard/category/batteries/2/4.jpg",
        },
        {
            titleTextContentPiece: "categoryBatteriesS2Slide4Heading",
            bodyTextContentPiece: "categoryBatteriesS2Slide4Description",
            imageRelativePath: "/livguard/category/batteries/2/4.jpg",
        },
    ];

    return (
        <>
            <div className={className}>
                <DefaultTextAnimation className="tw-flex tw-flex-col tw-items-center lg-text-headline lg-px-screen-edge-2 lg:tw-pl-0 lg:tw-pr-0 tw-text-center lg:tw-text-left">
                    {/* <div>{getVernacularString("74058229-5e75-4efe-833c-18009f248c6a", userPreferences.language)}</div> */}
                    <div>Batteries That Are</div>
                    {/* <div dangerouslySetInnerHTML={{__html: getVernacularString("afe86242-a8aa-4955-8951-516c560fc956", userPreferences.language)}} /> */}
                    <div>
                        <span className="lg-text-highlighted">Meant To Last</span>
                    </div>
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-4 lg:tw-h-4" />

                <CarouselStyle5
                    items={batteriesData.map((batteryData) => (
                        <BatteryCard
                            title={getVernacularString(batteryData.titleTextContentPiece, userPreferences.language)}
                            description={getVernacularString(batteryData.bodyTextContentPiece, userPreferences.language)}
                            imageRelativePath={batteryData.imageRelativePath}
                        />
                    ))}
                    className="tw-mx-auto"
                    slidesContainerClassName=""
                />
            </div>
        </>
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
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS10H1T1", userPreferences.language)}} />
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS10H1T2", userPreferences.language)}} />
                    </div>

                    <VerticalSpacer className="tw-h-1" />

                    <div className="tw-z-10 lg-text-title2">{getVernacularString("homeS10T2", userPreferences.language)}</div>

                    {showCtaButton && (
                        <>
                            <VerticalSpacer className="tw-h-6" />

                            <Link
                                to="/dealer-for-inverters-and-batteries"
                                className="tw-z-10 lg-cta-button"
                            >
                                {getVernacularString("homeS10T3", userPreferences.language)}
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

function ChooseTheBestStabilizer({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_1rem_auto_1rem_auto_minmax(0,1fr)] ", className)}>
            <div className="tw-row-start-2 tw-text-center lg-text-headline">Choose The</div>
            <div className="tw-row-start-3 tw-text-center lg-text-headline">
                <span className="lg-text-highlighted">Right Stabilizer</span> For You
            </div>
            <div className="tw-row-start-5 tw-text-center lg-px-screen-edge-2">
                Find the suitable pick of inverter that fulfils your requirements with efficiency. Use our Buying Guide to get to know in detail about how you can buy your inverter battery and our
                Product Catalogue for product specifications
            </div>

            <div className="tw-row-start-7 tw-w-full tw-grid tw-grid-cols-[minmax(0,1fr)_minmax(0,1fr)] tw-p-4 tw-gap-4">
                <div className="tw-bg-secondary-100-dark tw-py-4 tw-rounded-lg tw-grid tw-grid-cols-[auto_1rem_auto_minmax(0,1fr)] tw-h-full tw-p-4">
                    <img
                        className="tw-row-start-1 tw-col-start-1 tw-place-self-center"
                        src="https://files.growthjockey.com/livguard/icons/stabilizer/buying-guide.svg"
                    />
                    <div className="tw-row-start-1 tw-col-start-3 tw-flex tw-flex-row tw-items-center lg-text-body">Buying Guide</div>
                </div>
                <div className="tw-bg-secondary-100-dark tw-py-4 tw-rounded-lg tw-grid tw-grid-cols-[auto_1rem_auto_minmax(0,1fr)] tw-h-full tw-p-4">
                    <img
                        className="tw-row-start-1 tw-col-start-1 tw-place-self-center"
                        src="https://files.growthjockey.com/livguard/icons/stabilizer/download-catalogue.svg"
                    />
                    <div className="tw-row-start-1 tw-col-start-3 tw-flex tw-flex-row tw-items-center lg-text-body">Download Catalogue</div>
                </div>
            </div>

            <VerticalSpacer className="tw-row-start-8 tw-h-6" />

            <div className="tw-row-start-9 tw-grid tw-place-items-center">
                <button className="lg-cta-button tw-place-self-center">Plan Your Power</button>
            </div>

            <VerticalSpacer className="lg:tw-row-start-10 tw-hidden lg:tw-block lg:tw-h-12" />
        </div>
    );
}

function FaqSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const faqs = [
        {
            question: "homeS9Q1Q",
            answer: "homeS9Q1A",
        },
        {
            question: "homeS9Q2Q",
            answer: "homeS9Q2A",
        },
        {
            question: "homeS9Q3Q",
            answer: "homeS9Q3A",
        },
        {
            question: "homeS9Q4Q",
            answer: "homeS9Q4A",
        },
        {
            question: "homeS9Q5Q",
            answer: "homeS9Q5A",
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

export function ChooseBestInverterBattery({userPreferences, utmParameters, className}: {userPreferences: UserPreferences; utmParameters: {[searchParameter: string]: string}; className?: string}) {
    const sectionData: {
        description: string;
        downloadButtons: Array<{iconRelativePath: string; text: string; downloadLink: string; popup: boolean}>;
        buttonText: string;
    } = {
        description: `${getVernacularString("categoryBatteriesS8Description", userPreferences.language)}`,
        downloadButtons: [
            {
                iconRelativePath: "/livguard/icons/buyingGuide.png",
                text: `${getVernacularString("categoryBatteriesS8B1T", userPreferences.language)}`,
                downloadLink: "https://www.livguard.com/static-assets/livguard-buying-guide.pdf",
                popup: false,
            },
            {
                iconRelativePath: "/livguard/icons/downloadCatalogue.png",
                text: `${getVernacularString("categoryBatteriesS8B2T", userPreferences.language)}`,
                downloadLink: "https://www.livguard.com/static-assets/livguard-ib-leaflet.pdf",
                popup: false,
            },
        ],
        buttonText: `${getVernacularString("categoryBatteriesS8BT", userPreferences.language)}`,
    };

    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge", className)}>
            <div className="tw-flex tw-flex-col">
                <h2 className="lg-text-headline tw-text-center">
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: appendSpaceToString(getVernacularString("categoryBatteriesS8HT1", userPreferences.language))}} />
                    </DefaultTextAnimation>
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("categoryBatteriesS8HT2", userPreferences.language)}} />
                    </DefaultTextAnimation>
                </h2>

                <VerticalSpacer className="tw-h-6" />

                <WhatsBestForYouComponent
                    vernacularContent={sectionData}
                    userPreferences={userPreferences}
                    utmParameters={utmParameters}
                />
            </div>
        </div>
    );
}
