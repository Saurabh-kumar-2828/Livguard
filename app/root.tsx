import {ErrorBoundaryComponent, json, LinksFunction, LoaderFunction, MetaFunction} from "@remix-run/node";
import {Link, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch, useLoaderData} from "@remix-run/react";
import {getUserPreferencesFromCookies} from "~/server/userPreferencesCookieHelper.server";
import {Theme, UserPreferences} from "~/typeDefinitions";

import tailwindStylesheet from "../build/tailwind.css";
import rootStylesheet from "./styles/root.css";
import reactToastifyStylesheet from "react-toastify/dist/ReactToastify.css";
import {useEffect} from "react";

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
    {rel: "stylesheet", href: rootStylesheet},
    {rel: "stylesheet", href: reactToastifyStylesheet},
    // {rel: "preconnect", href: "https://fonts.googleapis.com"},
    // {rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous"},
    // {rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap", crossOrigin: "anonymous"},
];

// TODO: Set fallback font, and adjust fallback font to be the width as actual font
export default function() {
    const {userPreferences} = useLoaderData() as LoaderData;

    useEffect(() => {
        setTimeout(() => {
            const scriptTag = document.createElement("script");
            scriptTag.src = "//in.fw-cdn.com/30772163/407987.js";
            scriptTag.setAttribute("chat", "true");
            // scriptTag.addEventListener("load", onLoad);
            document.body.appendChild(scriptTag);
        }, 5000);
    }, []);

    return (
        <html
            lang="en"
            className={userPreferences.theme == Theme.Light || (typeof window != "undefined" && window.matchMedia("(prefers-color-scheme: light)").matches) ? undefined : "tw-dark"}
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
                        `
                    }}
                />
                <noscript><img height="1" width="1" style={{display: "none"}} src="https://www.facebook.com/tr?id=635911646858607&ev=PageView&noscript=1" /></noscript>
                {/* End Meta Pixel Code */}

                <meta name="facebook-domain-verification" content="vvv1ovrlljfrtp4dnwttb9j964i14k" />

                {/* <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            if (${userPreferences.theme == Theme.Dark} || (${userPreferences.theme == null} && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
                                document.documentElement.classList.add("tw-dark");
                            } else {
                                document.documentElement.classList.remove("tw-dark");
                            }
                        `,
                    }}
                /> */}
            </head>

            <body className="lg-bg-background-500 lg-text-secondary-900 lg-text-body">
                {/* Google Tag Manager (noscript) */}
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-5HRQL29"
                        height="0"
                        width="0"
                        style={{display: "none", visibility: "hidden"}}
                    ></iframe>
                </noscript>
                {/* End Google Tag Manager (noscript) */}

                {/* Start Facebook Mwta Pixel code  */}
                <noscript>
                    <img
                        height="1"
                        width="1"
                        style={{display:"none"}}
                        src="https://www.facebook.com/tr?id=635911646858607&ev=PageView&noscript=1"
                    />
                </noscript>
                {/* End Facebook Mwta Pixel code  */}

                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}

export function CatchBoundary() {
    const caught = useCatch();

    console.log("CatchBoundary");
    console.log(caught);

    return (
        <html lang="en">
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
    console.log("ErrorBoundary");
    console.log(error);

    return (
        <html lang="en">
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
