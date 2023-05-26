import type {ErrorBoundaryComponent, LinksFunction, LoaderFunction, MetaFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import type {ShouldRevalidateFunction} from "@remix-run/react";
import {Link, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch, useLoaderData} from "@remix-run/react";
import {useEffect} from "react";
import reactToastifyStylesheet from "react-toastify/dist/ReactToastify.css";
import {WebsiteConfigurationContext} from "~/global-common-typescript/contexts/websiteConfigurationContext";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {logFrontendError} from "~/global-common-typescript/logging";
import {getRequiredEnvironmentVariableNew} from "~/global-common-typescript/server/utilities.server";
import {getBooleanFromUnknown} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {UserPreferences, WebsiteConfiguration} from "~/typeDefinitions";
import {Language, Theme} from "~/typeDefinitions";
import tailwindStylesheet from "~/tailwind.css";
import {DynamicLinks} from "remix-utils";
import {ToastContainer} from "react-toastify";
import {ImageCdnProvider} from "~/global-common-typescript/typeDefinitions";

type LoaderData = {
    userPreferences: UserPreferences;
    canonicalUrl: string;
    websiteConfiguration: WebsiteConfiguration;
    haptikInitSettings: {
        businessId: string;
        clientId: string;
        baseUrl: string;
    }
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
        haptikInitSettings: haptikInitSettings
    };

    return json(loaderData);
};

export const shouldRevalidate: ShouldRevalidateFunction = () => {
    return true;
};

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "Livguard",
    viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: tailwindStylesheet},
    {rel: "stylesheet", href: reactToastifyStylesheet},
    {rel: "preload", href: "https://files.growthjockey.com/livguard/fonts/source-sans-3.ttf", as: "font", crossOrigin: "anonymous"},
    {rel: "preload", href: "https://files.growthjockey.com/livguard/fonts/brueur-text.ttf", as: "font", crossOrigin: "anonymous"},
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

    // // Google Tag Manager
    // useEffect(() => {
    //     setTimeout(() => {
    //         const scriptTag = document.createElement("script");
    //         scriptTag.innerHTML = `
    //             (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    //             new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    //             j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    //             'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    //             })(window,document,'script','dataLayer','GTM-5HRQL29');
    //         `;
    //         document.body.appendChild(scriptTag);
    //     }, 5000);
    // }, []);

    // // Meta Pixel
    // useEffect(() => {
    //     setTimeout(() => {
    //         const scriptTag = document.createElement("script");
    //         scriptTag.innerHTML = `
    //             !function(f,b,e,v,n,t,s)
    //             {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    //             n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    //             if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    //             n.queue=[];t=b.createElement(e);t.async=!0;
    //             t.src=v;s=b.getElementsByTagName(e)[0];
    //             s.parentNode.insertBefore(t,s)}(window, document,'script',
    //             'https://connect.facebook.net/en_US/fbevents.js');
    //             fbq('init', '635911646858607');
    //             fbq('track', 'PageView');
    //         `;
    //         document.body.appendChild(scriptTag);
    //     }, 5000);
    // }, []);

    // Freshchat
    // useEffect(() => {
    //     const onDocumentLoad = () => {
    //         setTimeout(() => {
    //             const scriptTag = document.createElement("script");
    //             scriptTag.src = "//in.fw-cdn.com/30708678/381117.js";
    //             scriptTag.setAttribute("chat", "true");
    //             document.body.appendChild(scriptTag);
    //         }, 5000);
    //     };

    //     if (document.readyState == "complete") {
    //         onDocumentLoad();
    //     } else {
    //         window.addEventListener("load", onDocumentLoad);
    //         return () => window.removeEventListener("load", onDocumentLoad);
    //     }
    // }, []);

    // Haptik
    useEffect(() => {
        const onDocumentLoad = () => {
            setTimeout(() => {
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
                        name="google-site-verification"
                        content="kBcFXIhI8Fo0WubHw2RPr_SmmpuizSmpkWqmJdsl3g0"
                    />

                    <meta
                        name="facebook-domain-verification"
                        content="vvv1ovrlljfrtp4dnwttb9j964i14k"
                    />
                    {/* End Site Verification */}

                    {/* Google Tag Manager */}
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                                })(window,document,'script','dataLayer','GTM-5HRQL29');
                            `,
                        }}
                    />
                    {/* End Google Tag Manager */}

                    {/* Meta Pixel Code */}
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                !function(f,b,e,v,n,t,s)
                                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                                n.queue=[];t=b.createElement(e);t.async=!0;
                                t.src=v;s=b.getElementsByTagName(e)[0];
                                s.parentNode.insertBefore(t,s)}(window, document,'script',
                                'https://connect.facebook.net/en_US/fbevents.js');
                                fbq('init', '635911646858607');
                                fbq('track', 'PageView');
                            `,
                        }}
                    />
                    {/* End Meta Pixel Code */}

                    {/* Microsoft Clarity Code */}
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                (function(c,l,a,r,i,t,y){
                                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                                })(window, document, "clarity", "script", "ganufjw8cz");
                            `,
                        }}
                    />
                    {/* End Microsoft Clarity Code */}

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

                <body className="lg-bg-background-500 lg-text-secondary-900 lg-text-body">
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

export function CatchBoundary() {
    const caught = useCatch();

    return (
        <html
            // TODO: Re-enable this
            // lang="en"
        >
            <head>
                <Meta />
                <DynamicLinks />
                <Links />
            </head>

            <body className="lg-bg-primary-500 lg-text-secondary-900 lg-text-body tw-text-secondary-900-dark">
                <div className="tw-grow tw-grid tw-place-items-center tw-min-h-screen">
                    <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-y-4">
                        {caught.status == 404 ? (
                            <>
                                <div className="lg-text-banner">404</div>

                                <div>Page not found</div>
                            </>
                        ) : (
                            <>
                                <div className="lg-text-banner">{caught.status}</div>

                                <div>We have notified our team, they are on it.</div>
                            </>
                        )}
                    </div>

                    <Link
                        to="/"
                        className="tw-text-muted tw-lx-underline-on-hover tw-underline tw-underline-offset-4"
                    >
                        Back to Home
                    </Link>
                </div>

                <Link
                    to="/"
                    className="tw-text-muted tw-lx-underline-on-hover"
                >
                    Back to Home
                </Link>

                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}

export const ErrorBoundary: ErrorBoundaryComponent = ({error}) => {
    if (error.message.toLowerCase().includes("hydration") || error.message.toLocaleLowerCase().startsWith("minified react error")) {
        return <></>;
    }

    logFrontendError(error);

    return (
        <html
            // TODO: Re-enable this
            // lang="en"
        >
            <head>
                <Meta />
                <DynamicLinks />
                <Links />
            </head>

            <body className="lg-bg-primary-500 lg-text-secondary-900 lg-text-body tw-text-secondary-900-dark">
                <div className="tw-grow tw-grid tw-place-items-center tw-min-h-screen">
                    <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-y-4">
                        <div className="lg-text-banner">Something went wrong</div>

                        <div>We have notified our team, they are on it.</div>
                    </div>

                    <Link
                        to="/"
                        className="tw-text-muted tw-lx-underline-on-hover tw-underline tw-underline-offset-4"
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
};
