import {ErrorBoundaryComponent, json, LinksFunction, LoaderFunction, MetaFunction} from "@remix-run/node";
import {Link, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch, useLoaderData} from "@remix-run/react";
import {useEffect} from "react";
import {getUserPreferencesFromCookies} from "~/server/userPreferencesCookieHelper.server";
import {Theme, UserPreferences} from "~/typeDefinitions";
import reactToastifyStylesheet from "react-toastify/dist/ReactToastify.css";
import {logFrontendError} from "~/global-common-typescript/logging";
import tailwindStylesheet from "../build/tailwind.css";
import {getErrorFromUnknown} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {getCalculatedTheme} from "~/utilities";
import {unknown} from "zod";
import {UserPreferencesContext} from "~/contexts/userPreferencesContext";

type LoaderData = {
    userPreferences: UserPreferences;
};

export const loader: LoaderFunction = async ({request}) => {
    const userPreferences = await getUserPreferencesFromCookies(request);
    if (userPreferences instanceof Error) {
        throw userPreferences;
    }

    const loaderData: LoaderData = {
        userPreferences: userPreferences,
    };

    return json(loaderData);
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

// TODO: Set fallback font, and adjust fallback font to be the width as actual font
export default function () {
    const {userPreferences} = useLoaderData() as LoaderData;

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
    useEffect(() => {
        const onDocumentLoad = () => {
            setTimeout(() => {
                const scriptTag = document.createElement("script");
                scriptTag.src = "//in.fw-cdn.com/30708678/381117.js";
                scriptTag.setAttribute("chat", "true");
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

    const calculatedTheme = getCalculatedTheme(userPreferences);

    return (
        // <UserPreferencesContext.Provider value={userPreferences}>
            <html
                // lang="en"
                className={calculatedTheme == Theme.Dark ? "tw-dark" : undefined}
            >
                <head>
                    <Meta />
                    <Links />

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
                    <ScrollRestoration />
                    <Scripts />
                    <LiveReload />
                </body>
            </html>
        // </UserPreferencesContext.Provider>
    );
}

export function CatchBoundary() {
    const caught = useCatch();

    const error = getErrorFromUnknown(caught);

    if (error.message.toLowerCase().includes("hydration") || error.message.toLocaleLowerCase().startsWith("minified react error")) {
        return <></>;
    }

    logFrontendError(error);

    return (
        <html
            // lang="en"
        >
            <head>
                <Meta />
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
            // lang="en"
        >
            <head>
                <Meta />
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
