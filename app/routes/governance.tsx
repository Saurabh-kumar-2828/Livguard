import type {LoaderFunction} from "@remix-run/node";
import {Link, useLoaderData} from "@remix-run/react";
import {CarouselStyle3} from "~/components/carouselStyle3";
import {CarouselStyle4} from "~/components/carouselStyle4";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {PageScaffold} from "~/components/pageScaffold";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {ImageCdnProvider} from "~/global-common-typescript/typeDefinitions";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {FinancialStatements} from "~/routes/investors";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {UserPreferences} from "~/typeDefinitions";
import {getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";

// export const meta: MetaFunction = ({data}: {data: LoaderData}) => {
//     const userPreferences: UserPreferences = data.userPreferences;
//     if (userPreferences.language == Language.English) {
//         return {
//             title: "Livguard Services - Reliable Solutions for Your Power Needs",
//             description: "Get reliable and effective Livguard services that ensure seamless performance of your automotive, home, and industrial needs. Contact us for expert solutions.",
//             "og:title": "Livguard Services - Reliable Solutions for Your Power Needs",
//             "og:site_name": "Livguard",
//             "og:url": "https://www.livguard.com/service",
//             "og:description": "Get reliable and effective Livguard services that ensure seamless performance of your automotive, home, and industrial needs. Contact us for expert solutions.",
//             "og:type": "website",
//             "og:image": "",
//         };
//     } else if (userPreferences.language == Language.Hindi) {
//         return {
//             title: "?????",
//             description: "?????",
//         };
//     } else {
//         throw Error(`Undefined language ${userPreferences.language}`);
//     }
// };

// export const links: LinksFunction = () => {
//     return [{rel: "canonical", href: "https://www.livguard.com/service"}];
// };

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
                pageUrl={pageUrl}
                breadcrumbs={[
                    {contentId: "cfab263f-0175-43fb-91e5-fccc64209d36", link: "/"},
                    {contentId: "59cc9aaf-ed88-4639-9fb4-634aeac22825", link: "#"},
                ]}
            >
                <GovernancePage userPreferences={userPreferences} />
            </PageScaffold>
        </>
    );
};

function GovernancePage({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <>
            <div className="tw-grid tw-grid-cols-1  tw-gap-x-16 tw-items-start tw-justify-center">
                <HeroSection
                    userPreferences={userPreferences}
                    className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
                />

                <VerticalSpacer className="tw-h-10 tw-row-start-2 tw-col-start-1 lg:tw-col-span-full" />

                <CsrInitiative
                    userPreferences={userPreferences}
                    className="tw-row-start-3 tw-col-start-1 lg:tw-col-span-full tw-max-w-7xl tw-mx-auto"
                />
                <VerticalSpacer className="tw-h-14 tw-row-start-4 tw-col-start-1 lg:tw-col-span-full" />

                {/* <ResponsibleRecycling
                    userPreferences={userPreferences}
                    className="tw-row-start-5 tw-col-start-1 lg:tw-col-span-full"
                />

                <VerticalSpacer className="tw-h-10 tw-row-start-6 tw-col-start-1 lg:tw-col-span-full" /> */}

                <FinancialStatements
                    userPreferences={userPreferences}
                    className="tw-row-start-7 tw-col-start-1 lg:tw-col-span-full tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 tw-row-start-8 tw-col-start-1 lg:tw-col-span-full" />
            </div>
        </>
    );
}

function HeroSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-aspect-square lg:tw-aspect-[1280/380] tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_4rem] lg:tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)] tw-text-center lg:tw-text-left",
                className,
            )}
        >
            <div className="tw-row-start-1 tw-col-start-1 tw-row-span-full">
                {isScreenSizeBelow == null ? null : (
                    <FullWidthImage
                        relativePath={isScreenSizeBelow ? "/livguard/governance/1/mobile-banner.jpg" : "/livguard/governance/1/desktop-banner.jpg"}
                        key={isScreenSizeBelow ? "/livguard/governance/1/mobile-banner.jpg" : "/livguard/governance/1/desktop-banner.jpg"}
                    />
                )}
            </div>

            <DefaultTextAnimation className="tw-row-start-2 tw-col-start-1">
                <div className="lg-text-banner tw-text-secondary-900-dark lg-px-screen-edge-2 tw-place-self-center lg:tw-place-self-start">
                    {getVernacularString("a8b4f849-32eb-4bc1-b25e-69450d63cf61", userPreferences.language)}
                </div>
            </DefaultTextAnimation>
            <DefaultTextAnimation className="tw-row-start-3 tw-col-start-1">
                <div className="lg-text-banner tw-text-secondary-900-dark lg-px-screen-edge-2 tw-place-self-center lg:tw-place-self-start">
                    {getVernacularString("050b72f1-1e00-435b-a879-2c7da1cdabe0", userPreferences.language)}
                </div>
            </DefaultTextAnimation>
        </div>
    );
}

function CsrInitiative({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-grid lg-px-screen-edge-2", className)}>
            <DefaultTextAnimation className="tw-row-start-1 tw-justify-self-center">
                <div>
                    <div
                        className="lg-text-headline tw-place-self-center lg:tw-place-self-start"
                        dangerouslySetInnerHTML={{__html: getVernacularString("1f335371-269e-4a18-ab21-c8aa8eaee078", userPreferences.language)}}
                    />
                    <div
                        className="lg-text-headline tw-place-self-center tw-text-center"
                        dangerouslySetInnerHTML={{__html: getVernacularString("fbdf2119-fb17-4ea8-8407-e3e4594c934c", userPreferences.language)}}
                    />
                </div>
            </DefaultTextAnimation>
            <VerticalSpacer className="tw-h-10" />

            <div className={concatenateNonNullStringsWithSpaces("tw-w-full")}>
                <div className="tw-grid tw-grid-rows-[repeat(5,auto)] tw-grid-cols-1 lg:tw-grid-rows-[1fr_repeat(4,auto)_1fr] lg:tw-grid-cols-2 tw-gap-y-4 tw-px-4 lg:tw-pl-8 tw-py-4 lg-bg-new-background-500 lg-card tw-rounded-lg">
                    <div className="tw-row-start-1 tw-col-start-1 lg:tw-row-start-2 lg:tw-col-start-1 lg-text-headline">
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS12H1T1", userPreferences.language)}} />
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS12H1T2", userPreferences.language)}} />
                    </div>

                    <div className="tw-row-start-2 tw-col-start-1 lg:tw-row-start-3 lg:tw-col-start-1 lg-text-body lg:tw-pr-[60px]">{getVernacularString("homeS12T2", userPreferences.language)}</div>

                    <ul className="tw-row-start-3 tw-col-start-1 lg:tw-row-start-4 lg:tw-col-start-1 tw-list-disc tw-ml-5 lg:tw-pr-[60px]">
                        <li>
                            <div className="lg-text-body">{getVernacularString("homeS12T3P1", userPreferences.language)}</div>
                        </li>
                        <li>
                            <div className="lg-text-body">{getVernacularString("homeS12T3P2", userPreferences.language)}</div>
                        </li>
                        <li>
                            <div className="lg-text-body">{getVernacularString("homeS12T3P3", userPreferences.language)}</div>
                        </li>
                        <li>
                            <div className="lg-text-body">{getVernacularString("homeS12T3P4", userPreferences.language)}</div>
                        </li>
                    </ul>

                    <CarouselStyle3
                        className="tw-row-start-4 tw-col-start-1 lg:tw-row-start-1 lg:tw-col-start-2 lg:tw-row-span-full"
                        items={[
                            <FullWidthImage
                                relativePath="/livguard/home/11/1.jpg"
                                className="tw-rounded-lg"
                            />,
                            <FullWidthImage
                                relativePath="/livguard/home/11/2.jpg"
                                className="tw-rounded-lg"
                            />,
                            <FullWidthImage
                                relativePath="/livguard/home/11/3.jpg"
                                className="tw-rounded-lg"
                            />,
                        ]}
                    />

                    <Link
                        to="/csr"
                        className="tw-row-start-5 tw-col-start-1 lg:tw-row-start-5 lg:tw-col-start-1 lg-cta-button tw-justify-self-center lg:tw-justify-self-start"
                    >
                        {getVernacularString("homeS12T4", userPreferences.language)}
                    </Link>
                </div>
            </div>
        </div>
    );
}

function ResponsibleRecycling({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const items = [
        {
            svgIcon: "/livguard/e-waste-management/5/symbol-of-three-arrows1.svg",
            title: "1795f04a-f546-4230-80aa-e73f5020a68e",
        },
        {
            svgIcon: "/livguard/e-waste-management/5/cartridge2.svg",
            title: "e133c65a-9f38-4170-b96a-8b5ee5b4260f",
        },
        {
            svgIcon: "/livguard/e-waste-management/5/computer3.svg",
            title: "51a87ae7-fadf-48b0-bc54-93000203a850",
        },
        {
            svgIcon: "/livguard/e-waste-management/5/hard-disk4.svg",
            title: "86f8e696-7719-4db9-9bc8-083b37380b39",
        },
        {
            svgIcon: "/livguard/e-waste-management/5/data-destruction5.svg",
            title: "a023698b-d95f-4faf-abb9-9aaf92d3b1a9",
        },
        {
            svgIcon: "/livguard/e-waste-management/5/data-cleaning.svg",
            title: "46300379-6d5d-49d3-90af-e1b6510e2f18",
        },
        {
            svgIcon: "/livguard/e-waste-management/5/symbol-of-three-arrows1.svg",
            title: "1795f04a-f546-4230-80aa-e73f5020a68e",
        },
        {
            svgIcon: "/livguard/e-waste-management/5/cartridge2.svg",
            title: "e133c65a-9f38-4170-b96a-8b5ee5b4260f",
        },
        {
            svgIcon: "/livguard/e-waste-management/5/computer3.svg",
            title: "51a87ae7-fadf-48b0-bc54-93000203a850",
        },
        {
            svgIcon: "/livguard/e-waste-management/5/hard-disk4.svg",
            title: "86f8e696-7719-4db9-9bc8-083b37380b39",
        },
        {
            svgIcon: "/livguard/e-waste-management/5/data-destruction5.svg",
            title: "a023698b-d95f-4faf-abb9-9aaf92d3b1a9",
        },
        {
            svgIcon: "/livguard/e-waste-management/5/data-cleaning.svg",
            title: "46300379-6d5d-49d3-90af-e1b6510e2f18",
        },
        {
            svgIcon: "/livguard/e-waste-management/5/symbol-of-three-arrows1.svg",
            title: "1795f04a-f546-4230-80aa-e73f5020a68e",
        },
        {
            svgIcon: "/livguard/e-waste-management/5/cartridge2.svg",
            title: "e133c65a-9f38-4170-b96a-8b5ee5b4260f",
        },
        {
            svgIcon: "/livguard/e-waste-management/5/computer3.svg",
            title: "51a87ae7-fadf-48b0-bc54-93000203a850",
        },
        {
            svgIcon: "/livguard/e-waste-management/5/hard-disk4.svg",
            title: "86f8e696-7719-4db9-9bc8-083b37380b39",
        },
        {
            svgIcon: "/livguard/e-waste-management/5/data-destruction5.svg",
            title: "a023698b-d95f-4faf-abb9-9aaf92d3b1a9",
        },
        {
            svgIcon: "/livguard/e-waste-management/5/data-cleaning.svg",
            title: "46300379-6d5d-49d3-90af-e1b6510e2f18",
        },
    ];
    return (
        <>
            <div className={concatenateNonNullStringsWithSpaces("tw-row-start-5 tw-grid lg-px-screen-edge-2 lg:tw-px-0", className)}>
                <DefaultTextAnimation className="tw-row-start-1 tw-justify-self-center">
                    <div
                        className="lg-text-headline tw-place-self-center lg:tw-place-self-start tw-text-center"
                        dangerouslySetInnerHTML={{__html: getVernacularString("02044d34-919d-418c-8212-1293f03bcf2d", userPreferences.language)}}
                    />
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-10" />

                <CarouselStyle4
                    chevronButtonsDivisionFactor={3}
                    items={items.map((item, itemIndex) => {
                        return (
                            <div
                                className="tw-w-full tw-h-full tw-grid tw-grid-rows-[auto_0.5rem_minmax(0,1fr)] tw-gap-2 tw-p-5 tw-border tw-border-[#474546]  tw-rounded-lg tw-justify-items-center"
                                key={itemIndex}
                            >
                                <div className="tw-row-start-1 tw-h-[4.5rem] tw-w-[4.5rem] tw-rounded-full lg-bg-secondary-100 tw-grid tw-justify-center tw-items-center">
                                    <img
                                        src={getAbsolutePathForRelativePath(getMetadataForImage(item.svgIcon).finalUrl, ImageCdnProvider.Bunny, null, null)}
                                        className={concatenateNonNullStringsWithSpaces("dark:tw-invert")}
                                    />
                                </div>
                                <div
                                    className="lg-text-body-bold tw-text-center tw-justify-start tw-row-start-3"
                                    dangerouslySetInnerHTML={{__html: getVernacularString(item.title, userPreferences.language)}}
                                />
                            </div>
                        );
                    })}
                    slidesContainerClassName="!tw-auto-cols-[14rem]"
                    controlsContainerClassName="!tw-justify-center !tw-gap-x-4"
                />
                <VerticalSpacer className="tw-h-10" />
                <div className="tw-grid tw-justify-self-center">
                    <a
                        href="/e-waste-management"
                        target="_blank"
                    >
                        <button className="lg-cta-button">Read More</button>
                    </a>
                </div>
            </div>
        </>
    );
}
