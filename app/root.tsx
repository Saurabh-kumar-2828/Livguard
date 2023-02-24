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
export default function App() {
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

                {/* <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            !function(e,t,a){var c=e.head||e.getElementsByTagName("head")[0],n=e.createElement("script");n.async=!0,n.defer=!0, n.type="text/javascript",n.src=t+"/static/js/widget.js?config="+JSON.stringify(a),c.appendChild(n)}(document,"https://app.engati.com",{bot_key:"169eda7edf434ed0",welcome_msg:true,branding_key:"default",server:"https://app.engati.com",e:"p" });
                        `,
                    }}
                /> */}
            </head>

            <body className="lg-bg-background-500 lg-text-secondary-900 lg-text-body">
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
