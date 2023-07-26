import {PageScaffold} from "~/components/pageScaffold";
import {concatenateNonNullStringsWithSpaces, generateUuid} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import {Language, UserPreferences} from "~/typeDefinitions";
import {getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";
import {CoverImage} from "~/components/images/coverImage";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {useResizeDetector} from "react-resize-detector";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {LinksFunction, LoaderFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {parseClassName} from "react-toastify/dist/utils";

// export const meta: MetaFunction = ({data}: {data: LoaderData}) => {
//     const userPreferences: UserPreferences = data.userPreferences;
//     if (userPreferences.language == Language.English) {
//         return {
//             title: "Livguard Services - Reliable Solutions for Your Power Needs",
//             description: "Get reliable and effective Livguard services that ensure seamless performance of your automotive, home, and industrial needs. Contact us for expert solutions.",
//             "og:title": "Livguard Services - Reliable Solutions for Your Power Needs",
//             "og:site_name": "Livguard",
//             "og:url": "https://www.livguard.com/terms-and-condition",
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

export const links: LinksFunction = () => {
    return [{rel: "canonical", href: "https://www.livguard.com/sales-return-policy"}];
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

    return (
        <>
            <PageScaffold
                userPreferences={userPreferences}
                redirectTo={redirectTo}
                showMobileMenuIcon={true}
                utmParameters={utmSearchParameters}
                pageUrl={pageUrl}
                breadcrumbs={
                    [
                        // {contentId: "cfab263f-0175-43fb-91e5-fccc64209d36", link: "/"},
                        // {contentId: "15a15952-4fe9-4c9e-b07f-fb1467a3614d", link: "#"},
                    ]
                }
            >
                <SalesReturnPolicypage userPreferences={userPreferences} />
            </PageScaffold>
        </>
    );
};

function SalesReturnPolicypage({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div>
            <HeroSection userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <SalesReturnPolicy
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="tw-h-20" />
        </div>
    );
}

function HeroSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height)-9.5rem)] lg:tw-h-[70vh] tw-grid tw-grid-rows-[3.5rem_auto_1rem_auto_minmax(0,1fr)] lg:tw-grid-rows-[minmax(0,1fr)_auto_1rem_auto_minmax(0,1fr)] tw-text-center lg:tw-text-left tw-items-center",
                className,
            )}
            ref={ref}
        >
            {containerWidth == null || containerHeight == null ? null : (
                <CoverImage
                    relativePath={
                        containerHeight > containerWidth || containerWidth < 640
                            ? "/livguard/sales-return-policy/1/banner-mobile-sales.png"
                            : "/livguard/sales-return-policy/1/banner-desktop-sales.png"
                    }
                    className="tw-row-start-1 tw-col-start-1 tw-row-span-full"
                    key={
                        containerHeight > containerWidth || containerWidth < 640
                            ? "/livguard/sales-return-policy/1/banner-mobile-sales.png"
                            : "/livguard/sales-return-policy/1/banner-desktop-sales.png"
                    }
                />
            )}

            <DefaultTextAnimation className="lg:tw-row-start-2 tw-row-start-5 tw-col-start-1">
                <div className="lg-text-banner lg-px-screen-edge-2 tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">
                    {getVernacularString("661b01b0-1ac1-49ce-af95-39777ff6a99c", userPreferences.language)}
                </div>
            </DefaultTextAnimation>
        </div>
    );
}

function SalesReturnPolicy({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-2">
                <div
                    className="lg-text-headline"
                    dangerouslySetInnerHTML={{__html: getVernacularString("74cd145f-e021-4f2d-81e4-3bdd4cbcf891", userPreferences.language)}}
                ></div>
                <div className="lg-text-title2  lg-text-secondary-900">{getVernacularString("d57d1a75-b578-4caa-8966-a13ab6146b20", userPreferences.language)}</div>
            </div>

            <VerticalSpacer className="tw-h-[1.5rem]" />

            <div
                className="lg-text-headline"
                dangerouslySetInnerHTML={{__html: getVernacularString("f30c51d9-5f1c-429b-865a-adb5062e9d55", userPreferences.language)}}
            ></div>

            <VerticalSpacer className="tw-h-3" />

            <div className="lg-text-body tw-pl-[3rem]">{getVernacularString("559ec70e-f4ad-48ef-8fd0-31778c9ca07a", userPreferences.language)}</div>

            <VerticalSpacer className="tw-h-[1.5rem]" />

            <div
                className="lg-text-headline"
                dangerouslySetInnerHTML={{__html: getVernacularString("3a5323eb-1863-4778-af39-b75a7f027144", userPreferences.language)}}
            ></div>

            <VerticalSpacer className="tw-h-3" />

            <div className="lg-text-body tw-pl-[3rem]">{getVernacularString("56bba6ff-0903-41ab-8921-b7f9f178be2d", userPreferences.language)}</div>

            <VerticalSpacer className="tw-h-[1.5rem]" />

            <div className="tw-grid tw-grid-flow-rows tw-gap-3">
                <div
                    className="lg-text-headline"
                    dangerouslySetInnerHTML={{__html: getVernacularString("dfa7ddd9-0a82-4e34-bad3-5d007af442ab", userPreferences.language)}}
                ></div>

                <div className="lg-text-body tw-pl-[3rem]">{getVernacularString("e87b74a4-6ad4-4afb-9128-6c96107329f6", userPreferences.language)}</div>

                <div className="lg-text-body tw-pl-[3rem]">{getVernacularString("c648db7a-2882-40b6-8bb4-c6f5e9a25ded", userPreferences.language)}</div>

                <div className="lg-text-body tw-pl-[3rem]">{getVernacularString("2f62912e-e64c-4b2d-bcb5-39c7647850f7", userPreferences.language)}</div>
            </div>
        </div>
    );
}
