import type {LinksFunction, LoaderFunction, MetaFunction, V2_MetaFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import type {ShouldRevalidateFunction} from "@remix-run/react";
import {Link, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse, useLoaderData, useRouteError} from "@remix-run/react";
import type {V2_ErrorBoundaryComponent} from "@remix-run/react/dist/routeModules";
import {useEffect} from "react";
import {ToastContainer} from "react-toastify";
import reactToastifyStylesheet from "react-toastify/dist/ReactToastify.css";
import {DynamicLinks} from "remix-utils";
import {ErrorHeaderComponent} from "~/components/errorHeaderComponent";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {WebsiteConfigurationContext} from "~/global-common-typescript/contexts/websiteConfigurationContext";
import {getRequiredEnvironmentVariableNew} from "~/global-common-typescript/server/utilities.server";
import {ImageCdnProvider} from "~/global-common-typescript/typeDefinitions";
import {getBooleanFromUnknown} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import tailwindStylesheet from "~/tailwind.css";
import type {UserPreferences, WebsiteConfiguration} from "~/typeDefinitions";
import {Language, Theme} from "~/typeDefinitions";

type LoaderData = {
    userPreferences: UserPreferences;
    canonicalUrl: string;
    websiteConfiguration: WebsiteConfiguration;
    haptikInitSettings: {
        businessId: string;
        clientId: string;
        baseUrl: string;
    };
};

export const loader: LoaderFunction = async ({request}) => {
    const userPreferences = await getUserPreferencesFromCookiesAndUrlSearchParameters(request);
    if (userPreferences instanceof Error) {
        throw userPreferences;
    }

    const websiteBaseUrl = getRequiredEnvironmentVariableNew("WEBSITE_BASE_URL");

    const debugMode = getBooleanFromUnknown(getRequiredEnvironmentVariableNew("DEBUG_MODE"));

    const imageCdnProviderStr = getRequiredEnvironmentVariableNew("IMAGE_CDN_PROVIDER");
    // TODO: Do this properly
    const imageCdnProvider = imageCdnProviderStr == "imgix" ? ImageCdnProvider.Imgix : imageCdnProviderStr == "bunny" ? ImageCdnProvider.Bunny : ImageCdnProvider.GrowthJockey;

    const websiteConfiguration: WebsiteConfiguration = {
        websiteBaseUrl: websiteBaseUrl,
        debugMode: debugMode,
        imageCdnProvider: imageCdnProvider,
    };

    const haptikInitSettings = {
        businessId: getRequiredEnvironmentVariableNew("HAPTIK_BUSINESS_ID"),
        clientId: getRequiredEnvironmentVariableNew("HAPTIK_CLIENT_ID"),
        baseUrl: getRequiredEnvironmentVariableNew("HAPTIK_BASE_URL"),
    };

    const requestUrl = request.url.replace(/^http:\/\/localhost:\d+/, getRequiredEnvironmentVariableNew("WEBSITE_BASE_URL"));
    // TODO: This is probably incorrect, shift canonical url handling to each separate page
    const canonicalUrlUnnormalized = requestUrl.split("?")[0];
    const canonicalUrl = canonicalUrlUnnormalized.endsWith("/") ? canonicalUrlUnnormalized : `${canonicalUrlUnnormalized}/`;

    const loaderData: LoaderData = {
        userPreferences: userPreferences,
        canonicalUrl: canonicalUrl,
        websiteConfiguration: websiteConfiguration,
        haptikInitSettings: haptikInitSettings,
    };

    return json(loaderData);
};

export const shouldRevalidate: ShouldRevalidateFunction = () => {
    return true;
};

export const meta: V2_MetaFunction = ({data: loaderData}) => {
    return [
        {
            name: "viewport",
            content: "width=device-width,initial-scale=1",
        },
        {
            title: "Livguard",
        },
        // TODO: Complete this
        //     title: "Livguard",
    ];
};

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: tailwindStylesheet},
    {rel: "stylesheet", href: reactToastifyStylesheet},
];

// const dynamicLinks: DynamicLinksFunction<LoaderData> = ({
//     id,
//     data,
//     params,
//     location,
//     parentsData,
// }) => {
//     if (!data) {
//         return []
//     };

//     return [{rel: "canonical", href: data.canonicalUrl}];
// };

// export const handle = {
//     dynamicLinks: dynamicLinks,
// };

// TODO: Set fallback font, and adjust fallback font to be the width as actual font
export default function Root() {
    const {userPreferences, canonicalUrl, websiteConfiguration, haptikInitSettings} = useLoaderData() as LoaderData;

    function addScript(scriptContent: string) {
        const scriptTag = document.createElement("script");
        scriptTag.innerHTML = scriptContent;
        document.body.appendChild(scriptTag);
    }

    // TODO: Maintain state for this
    useEffect(() => {
        setTimeout(() => {
            // Google Tag Manager
            addScript(
                `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5HRQL29');`,
            );

            // Meta Pixel
            addScript(
                `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '635911646858607');fbq('track', 'PageView');`,
            );
        }, 2500);

        setTimeout(() => {
            // Microsoft Clarity
            addScript(
                `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "ganufjw8cz");`,
            );
        }, 5000);
    }, []);

    // TODO: Maintain state for this
    // Haptik
    useEffect(() => {
        const onDocumentLoad = () => {
            setTimeout(() => {
                // TODO: Shift this to use addScript as well
                const scriptTag = document.createElement("script");
                scriptTag.src = "https://toolassets.haptikapi.com/platform/javascript-xdk/production/loader.js";
                scriptTag.setAttribute("charset", "UTF-8");
                scriptTag.setAttribute("type", "text/javascript");
                document.body.appendChild(scriptTag);
            }, 5000);
        };

        if (document.readyState == "complete") {
            onDocumentLoad();
        } else {
            window.addEventListener("load", onDocumentLoad);
            return () => window.removeEventListener("load", onDocumentLoad);
        }
    }, []);

    // const suppressHydrationWarning = websiteConfiguration.websiteBaseUrl.endsWith("livguard.com") ? true : false;
    // const suppressHydrationWarning = true;

    return (
        // <UserPreferencesContext.Provider value={userPreferences}>
        <WebsiteConfigurationContext.Provider value={websiteConfiguration}>
            <html
                lang={userPreferences.language}
                className={userPreferences.theme == Theme.Dark ? "tw-dark" : undefined}
            >
                <head>
                    <Meta />
                    <DynamicLinks />
                    <Links />

                    {/* TODO: Move canonicalUrl thing here? */}

                    <link
                        rel="alternate"
                        href={canonicalUrl}
                        hrefLang="x-default"
                    />
                    <ItemBuilder
                        items={[Language.English, Language.Hindi]}
                        itemBuilder={(language, languageIndex) => (
                            <link
                                rel="alternate"
                                href={`${canonicalUrl}${canonicalUrl.includes("?") ? "&" : "?"}language=${language}`}
                                hrefLang={language}
                                key={languageIndex}
                            />
                        )}
                    />

                    {/* Site Verification */}
                    <meta
                        name="viewport"
                        content="width=device-width,initial-scale=1"
                    />
                    <meta
                        name="google-site-verification"
                        content="kBcFXIhI8Fo0WubHw2RPr_SmmpuizSmpkWqmJdsl3g0"
                    />

                    <meta
                        name="facebook-domain-verification"
                        content="vvv1ovrlljfrtp4dnwttb9j964i14k"
                    />
                    {/* End Site Verification */}

                    {/* TODO: Can we remove this now? */}
                    {/* FOUC hack */}
                    <style
                        dangerouslySetInnerHTML={{
                            __html: `
                                body {
                                    display: none;
                                };

                                html {
                                    background: #ebebeb;
                                }

                                @media (prefers-color-scheme: dark) {
                                    html {
                                        background: #020202;
                                    }
                                }
                            `,
                        }}
                    />
                    {/* /FOUC hack */}
                </head>

                <body className="lg-bg-new-background-500 lg-text-new-foreground-500 lg-text-body">
                    <Outlet />

                    <ToastContainer
                        position="top-right"
                        autoClose={8000}
                        theme="dark"
                    />

                    <ScrollRestoration />
                    <Scripts />
                    <LiveReload />

                    {/* Start Haptik Integeration */}
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.haptikInitSettings = {
                                    "business-id": "${haptikInitSettings.businessId}",
                                    "client-id": "${haptikInitSettings.clientId}",
                                    "base-url": "${haptikInitSettings.baseUrl}",
                                };
                            `,
                        }}
                    />

                    <style
                        dangerouslySetInnerHTML={{
                            __html: `
                                #haptik-xdk-wrapper {
                                    z-index: 61 !important;
                                }

                                @media (min-width: 640px) {
                                    iframe#haptik-xdk-main-view {
                                        bottom: 65px !important;
                                    }

                                    iframe.xdk-iframe {
                                        bottom: 20px !important;
                                    }
                                }

                                @media (max-width: 640px) {
                                    iframe#haptik-xdk-main-view {
                                        bottom: 115px !important;
                                    }

                                    iframe.xdk-iframe {
                                        bottom: 75px !important;
                                    }
                                }
                            `,
                        }}
                    />
                    {/* End Haptik Integeration */}

                    {/* Freshsales Chat Suppression */}
                    <style
                        dangerouslySetInnerHTML={{
                            __html: `
                                freshchat-widget {
                                    display: none;
                                }

                                #fc_frame {
                                    display: none;
                                }
                            `,
                        }}
                    />
                    {/* End Freshsales Chat Suppression */}
                </body>
            </html>
        </WebsiteConfigurationContext.Provider>
        // </UserPreferencesContext.Provider>
    );
}

export const ErrorBoundary: V2_ErrorBoundaryComponent = () => {
    const routeError = useRouteError();

    if (isRouteErrorResponse(routeError)) {
        return (
            <html>
                <head>
                    <Meta />
                    <Links />
                </head>

                <body className="tw-bg-background-500-light tw-text-secondary-900-light lg-text-body">
                    <div className="tw-grow tw-grid tw-grid-rows-[auto_minmax(0,1fr)_auto_4rem_auto_minmax(0,1fr)] tw-grid-cols-1 tw-place-items-center tw-min-h-screen">
                        <ErrorHeaderComponent className="tw-justify-self-stretch tw-flex-none" />

                        <div className="tw-row-start-3 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-y-4">
                            {routeError.status == 404 ? (
                                <>
                                    <div className="lg-text-banner">404</div>

                                    <div>Page not found</div>
                                </>
                            ) : (
                                <>
                                    <div className="lg-text-banner">{routeError.status}</div>

                                    <div>We have notified our team, they are on it.</div>
                                </>
                            )}
                        </div>

                        <Link
                            to="/"
                            className="tw-row-start-5 tw-text-muted tw-lx-underline-on-hover tw-underline tw-underline-offset-4"
                        >
                            Back to Home
                        </Link>
                    </div>

                    <ScrollRestoration />
                    <Scripts />
                    <LiveReload />
                </body>
            </html>
        );
    } else if (routeError instanceof Error) {
        // Deal with a simple Error
        return (
            <html>
                <head>
                    <Meta />
                    <Links />
                </head>

                <body className="tw-bg-background-500-light tw-text-secondary-900-light lg-text-body">
                    <div className="tw-grow tw-grid tw-grid-rows-[auto_minmax(0,1fr)_auto_4rem_auto_minmax(0,1fr)] tw-grid-cols-1 tw-place-items-center tw-min-h-screen">
                        <ErrorHeaderComponent className="tw-justify-self-stretch tw-flex-none" />

                        <div className="tw-row-start-3 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-y-4">
                            <div className="lg-text-banner">Unexpected Error</div>

                            <div>We have notified our team, they are on it.</div>
                        </div>

                        <Link
                            to="/"
                            className="tw-row-start-5 tw-text-muted tw-lx-underline-on-hover tw-underline tw-underline-offset-4"
                        >
                            Back to Home
                        </Link>
                    </div>

                    <ScrollRestoration />
                    <Scripts />
                    <LiveReload />
                </body>
            </html>
        );
    } else {
        // Deal with an unknown
        return (
            <html>
                <head>
                    <Meta />
                    <Links />
                </head>

                <body className="tw-bg-background-500-light tw-text-secondary-900-light lg-text-body">
                    <div className="tw-grow tw-grid tw-grid-rows-[auto_minmax(0,1fr)_auto_4rem_auto_minmax(0,1fr)] tw-grid-cols-1 tw-place-items-center tw-min-h-screen">
                        <ErrorHeaderComponent className="tw-justify-self-stretch tw-flex-none" />

                        <div className="tw-row-start-3 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-y-4">
                            <div className="lg-text-banner">{routeError.toString()}</div>

                            <div>We have notified our team, they are on it.</div>
                        </div>

                        <Link
                            to="/"
                            className="tw-row-start-5 tw-text-muted tw-lx-underline-on-hover tw-underline tw-underline-offset-4"
                        >
                            Back to Home
                        </Link>
                    </div>

                    <ScrollRestoration />
                    <Scripts />
                    <LiveReload />
                </body>
            </html>
        );
    }

    // logFrontendError(routeError);
};

// <html
// // TODO: Re-enable this
// // lang="en"
// >
//     <head>
//         <Meta />
//         <DynamicLinks />
//         <Links />
//     </head>

//     <body className="lg-bg-primary-500 lg-text-secondary-900 lg-text-body tw-text-secondary-900-dark">
//         <div className="tw-grow tw-grid tw-place-items-center tw-min-h-screen">
//             <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-y-4">
//                 <div className="lg-text-banner">Something went wrong</div>

//                 <div>We have notified our team, they are on it.</div>
//             </div>

//             <Link
//                 to="/"
//                 className="tw-text-muted tw-lx-underline-on-hover tw-underline tw-underline-offset-4"
//             >
//                 Back to Home
//             </Link>
//         </div>

//         <ScrollRestoration />
//         <Scripts />
//         <LiveReload />
//     </body>
// </html>
