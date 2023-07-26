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
import {Language, UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";
import {appendSpaceToString, getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ImageCdnProvider} from "~/global-common-typescript/typeDefinitions";

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
                <InvestorPage userPreferences={userPreferences} />
            </PageScaffold>
        </>
    );
};

function InvestorPage({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <>
            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-x-16 tw-items-start tw-justify-center">
                <HeroSection
                    userPreferences={userPreferences}
                    className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
                />

                <VerticalSpacer className="tw-h-10 tw-row-start-2 tw-col-start-1 lg:tw-col-span-full" />

                <FinancialStatements
                    userPreferences={userPreferences}
                    className="tw-row-start-3 tw-col-start-1 lg:tw-col-span-full tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 tw-row-start-4 tw-col-start-1 lg:tw-col-span-full" />
            </div>
        </>
    );
}

function HeroSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height)-9.5rem)] lg:tw-h-[70vh] tw-grid tw-grid-rows-[minmax(0,1fr)_auto_4rem] lg:tw-grid-rows-[minmax(0,1fr)_auto_minmax(0,1fr)] tw-text-center lg:tw-text-left",
                className,
            )}
            ref={ref}
        >
            {containerWidth == null || containerHeight == null ? null : (
                <CoverImage
                    relativePath={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/investor/1/banner-mobile.jpg" : "/livguard/investor/1/banner-desktop.jpg"}
                    className="tw-row-start-1 tw-col-start-1 tw-row-span-full"
                    key={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/investor/1/banner-mobile.jpg" : "/livguard/investor/1/banner-desktop.jpg"}
                />
            )}

            <DefaultTextAnimation className="tw-row-start-2 tw-col-start-1">
                <div className="lg-text-banner lg-px-screen-edge-2 tw-place-self-center lg:tw-place-self-start">
                    {getVernacularString("89fb5c95-3b83-4a5a-8bc9-aa810d620ee9", userPreferences.language)}
                </div>
            </DefaultTextAnimation>
        </div>
    );
}

export function FinancialStatements({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const documents = [
        {
            name: "LBPL_Notice of Secured creditors meeting dt 01/04/2023",
            link: "https://www.livguard.com/static-assets/LBPL_Notice%20of%20Secured%20creditors%20meeting%20dt%2001.04.2023.pdf",
        },
        {
            name: "LBPL_Notice of Unsecured creditors meeting dt 01/04/2023",
            link: "https://www.livguard.com/static-assets/LBPL_Notice%20of%20Unsecured%20creditors%20meeting%20dt%2001.04.2023.pdf",
        },
        {
            name: "LETPL_Notice of Secured creditors meeting dt 01/04/2023",
            link: "https://www.livguard.com/static-assets/LETPL_Notice%20of%20Secured%20creditors%20meeting%20dt%2001.04.2023.pdf",
        },
        {
            name: "MGT-7_2021-22_LBPL",
            link: "https://www.livguard.com/static-assets/MGT-7_2021-22_LBPL.pdf",
        },
        {
            name: "MGT-7_2021-22_LETPL",
            link: "https://www.livguard.com/static-assets/MGT-7_2021-22_LETPL.pdf",
        },
        {
            name: "LBPL Notice dt 01/04/2023",
            link: "https://www.livguard.com/static-assets/LBPL_Notice%20of%20Secured%20creditors%20meeting%20dt%2001.04.2023.pdf",
        },
        {
            name: "LBPL Notice dt 01/04/2023",
            link: "https://www.livguard.com/static-assets/LBPL_Notice%20of%20Unsecured%20creditors%20meeting%20dt%2001.04.2023.pdf",
        },
        {
            name: "LETPL Notice dt 01/04/2023",
            link: "https://www.livguard.com/static-assets/LETPL_Notice%20of%20Secured%20creditors%20meeting%20dt%2001.04.2023.pdf",
        },
    ];
    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge-2 tw-grid tw-grid-cols-1 tw-gap-y-8", className)}>
            <DefaultTextAnimation className="tw-row-start-1 tw-justify-self-center">
                <div
                    className="lg-text-headline"
                    dangerouslySetInnerHTML={{__html: getVernacularString("9119e503-aa95-4d61-8daa-323c666e9986", userPreferences.language)}}
                />
            </DefaultTextAnimation>

            <div className="tw-row-start-2 tw-grid tw-grid-cols-2 lg:tw-grid-cols-4 tw-grid-flow-row tw-gap-8">
                {documents.map((document, documentIndex) => {
                    return (
                        <DownloadPdfDocument
                            userPreferences={userPreferences}
                            className=""
                            documentName={document.name}
                            documentLink={document.link}
                            key={documentIndex}
                        />
                    );
                })}
            </div>
        </div>
    );
}

function DownloadPdfDocument({userPreferences, className, documentName, documentLink}: {userPreferences: UserPreferences; className?: string; documentName: string; documentLink: string}) {
    return (
        <a
            href={documentLink}
            download
            target="_blank"
            className="tw-grid tw-grid-rows-[1.5rem_auto_auto_1.5rem_auto_minmax(0.75rem,1fr)] lg:tw-grid-rows-[2.5rem_auto_auto_2.5rem_auto_minmax(1rem,1fr)] tw-px-3 lg:tw-px-6 tw-justify-items-center tw-border lg-border-primary-500 tw-rounded-lg"
        >
            <img
                src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/investor/2/pdf-download-icon.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
                className="tw-row-start-2"
            />
            <div className="tw-row-start-3 lg-text-primary-500">{getVernacularString("6dbfd771-e134-4326-96d6-8c37b1827056", userPreferences.language)}</div>
            <div className="tw-row-start-5">{documentName}</div>
        </a>
    );
}
