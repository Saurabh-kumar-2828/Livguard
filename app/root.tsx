import {json, LinksFunction, LoaderFunction, MetaFunction} from "@remix-run/node";
import {Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch, useLoaderData} from "@remix-run/react";
import {getUserPreferencesFromCookies} from "~/server/userPreferencesCookieHelper.server";
import {Theme, UserPreferences} from "~/typeDefinitions";

import tailwindStylesheet from "../build/tailwind.css";
import rootStylesheet from "./styles/root.css";

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
    // {rel: "preconnect", href: "https://fonts.googleapis.com"},
    // {rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous"},
    // {rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap", crossOrigin: "anonymous"},
];

// TODO: Set fallback font, and adjust fallback font to be the width as actual font
export default function App() {
    const {userPreferences} = useLoaderData() as LoaderData;

    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            if (${userPreferences.theme == Theme.Dark} || (${userPreferences.theme == null} && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
                                document.documentElement.classList.add("tw-dark");
                            } else {
                                document.documentElement.classList.remove("tw-dark");
                            }
                        `,
                    }}
                />
            </head>

            <body className="lg-bg-background-500 lg-text-secondary-900 lg-text-body">
                <Outlet />
                {/* <ScrollRestoration /> */}
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}

// export function CatchBoundary() {
//     const caught = useCatch();

//     // TODO: Prevent the code duplication here somehow
//     return (
//         <html lang="en">
//             <head>
//                 <Meta />
//                 <Links />
//             </head>

//             <body className="tw-bg-bg tw-text-base tw-text-fg">
//                 <div
//                     className="tw-flex tw-flex-col tw-min-h-screen"
//                     // className="tw-grid tw-grid-rows-[auto_1fr_auto] tw-grid-flow-col tw-min-h-screen"
//                 >
//                     <div className="tw-grid tw-grid-cols-[auto_1fr] headerHideLinks:tw-grid-cols-[auto_1fr] tw-items-center tw-bg-black tw-p-4 tw-h-[4.5rem]">
//                         <Link to="/">
//                             <img src="https://imagedelivery.net/QSJTsX8HH4EtEhHrJthznA/7092154f-52f6-4a5f-7e8c-baa05d6c2f00/w=32" className="tw-h-8" />
//                         </Link>
//                     </div>

//                     <div className="tw-grow tw-grid tw-place-items-center tw-fillScreenExcludingHeader">
//                         {caught.status == 404 ? (
//                             <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-y-4">
//                                 <div className="tw-text-5rem">404</div>

//                                 <div>The page you are looking for does not exist.</div>

//                                 <Link to="/" className="tw-text-muted tw-lx-underline-on-hover">
//                                     Back to Home
//                                 </Link>
//                             </div>
//                         ) : (
//                             <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-y-4">
//                                 <div className="tw-text-5rem">{caught.status}</div>

//                                 <div>{caught.statusText}</div>
//                             </div>
//                         )}
//                     </div>
//                     <FooterComponent />
//                 </div>
//                 <ScrollRestoration />
//                 <Scripts />
//                 <LiveReload />
//             </body>
//         </html>
//     );
// }
