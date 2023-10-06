import type {LoaderFunction, V2_MetaFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {useContext, useEffect} from "react";
import {useInView} from "react-intersection-observer";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {PageScaffold} from "~/components/pageScaffold";
import {SecondaryNavigation} from "~/components/secondaryNavigation";
import {SecondaryNavigationControllerContext} from "~/contexts/secondaryNavigationControllerContext";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
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
                href: "https://www.livguard.com/investors",
            },
            {
                title: "Livguard Investors: Partnering in Development",
            },
            {
                name: "description",
                content: "Discover Livguard's existing investors and their valuable contributions to our journey.",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/investors",
            },
            {
                property: "og:title",
                content: "Livguard Investors: Partnering in Development",
            },
            {
                property: "og:description",
                content: "Discover Livguard's existing investors and their valuable contributions to our journey.",
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
                content: `${getAbsolutePathForRelativePath(getMetadataForImage("/livguard/investor/investor-og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null)}`,
            },
        ];
    } else if (userPreferences.language == Language.Hindi) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/investors",
            },
            {
                title: "Livguard Investors: Partnering in Development",
            },
            {
                name: "description",
                content: "Discover Livguard's existing investors and their valuable contributions to our journey.",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/investors",
            },
            {
                property: "og:title",
                content: "Livguard Investors: Partnering in Development",
            },
            {
                property: "og:description",
                content: "Discover Livguard's existing investors and their valuable contributions to our journey.",
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
                content: `${getAbsolutePathForRelativePath(getMetadataForImage("/livguard/investor/investor-og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null)}`,
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
                breadcrumbs={[
                    {contentId: "cfab263f-0175-43fb-91e5-fccc64209d36", link: "/"},
                    {contentId: "6baac105-c0e8-4412-90cd-802739069c52", link: "#"},
                ]}
                secondaryNavigationController={secondaryNavigationController}
            >
                <SecondaryNavigationControllerContext.Provider value={secondaryNavigationController}>
                    <InvestorPage
                        userPreferences={userPreferences}
                        secondaryNavigationController={secondaryNavigationController}
                    />
                </SecondaryNavigationControllerContext.Provider>
            </PageScaffold>
        </>
    );
};

function InvestorPage({userPreferences, secondaryNavigationController}: {userPreferences: UserPreferences; secondaryNavigationController?: SecondaryNavigationController}) {
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);
    return (
        <>
            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-x-16 tw-items-start tw-justify-center">
                <HeroSection
                    userPreferences={userPreferences}
                    className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-2 tw-col-start-1 tw-col-span-full" />

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
                "tw-aspect-square lg:tw-aspect-[1280/380] tw-grid tw-grid-rows-[minmax(0,1fr)_auto_3.5rem] lg:tw-grid-rows-[minmax(0,1fr)_auto_minmax(0,1fr)] tw-text-center lg:tw-text-left",
                className,
            )}
            id="top"
            ref={sectionRef}
        >
            <div className="tw-row-start-1 tw-col-start-1 tw-row-span-full">
                {isScreenSizeBelow == null ? null : (
                    <FullWidthImage
                        relativePath={isScreenSizeBelow ? "/livguard/investor/1/mobile-banner.jpg" : "/livguard/investor/1/desktop-banner.jpg"}
                        key={isScreenSizeBelow ? "/livguard/investor/1/mobile-banner.jpg" : "/livguard/investor/1/desktop-banner.jpg"}
                    />
                )}
            </div>
            <DefaultTextAnimation className="lg:tw-row-start-2  tw-row-start-3 tw-col-start-1">
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
            name: "LBPL - Secured creditors meeting - April'23",
            link: "https://www.livguard.com/static-assets/LBPL%20-%20Secured%20creditors%20meeting%20-%20April'23.pdf",
        },
        {
            name: "LBPL - Unsecured creditors meeting - April'23",
            link: "https://www.livguard.com/static-assets/LBPL%20-%20Unsecured%20creditors%20meeting%20-%20April'23.pdf",
        },
        {
            name: "LETPL - Secured creditors meeting - April'23",
            link: "https://www.livguard.com/static-assets/LETPL%20-%20Secured%20creditors%20meeting%20-%20April'23.pdf",
        },
        {
            name: "LBPL - Annual Return - FY 21-22",
            link: "https://www.livguard.com/static-assets/LBPL%20-%20Annual%20Return%20-%20FY%2021-22.pdf",
        },
        {
            name: "LETPL - Annual Return - FY 21-22",
            link: "https://www.livguard.com/static-assets/LETPL%20-%20Annual%20Return%20-%20FY%2021-22.pdf",
        },
    ];
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            financials: {
                humanReadableName: getVernacularString("b2a44a66-bdca-45c5-b848-a103cc193da4", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge-2 tw-grid tw-grid-cols-1 tw-gap-y-8", className)}
            id="financials"
            ref={sectionRef}
        >
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
