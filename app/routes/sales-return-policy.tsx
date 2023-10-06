import type {LinksFunction, LoaderFunction, V2_MetaFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {PageScaffold} from "~/components/pageScaffold";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {ImageCdnProvider} from "~/common--type-definitions/typeDefinitions";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {UserPreferences} from "~/typeDefinitions";
import {Language} from "~/typeDefinitions";
import {getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";

export const meta: V2_MetaFunction = ({data: loaderData}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = loaderData.userPreferences;
    if (userPreferences.language == Language.English) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/sales-return-policy",
            },
            {
                title: "Inverter, Car Battery, Solar Panel at Best Price in India - Livguard",
            },
            {
                name: "description",
                content:
                    "Get the best inverter for your home today. With unlimited energy power up your spaces. Livguard's wide range of inverters are especially built to deliver high performance in our fast paced lives..",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/sales-return-policy",
            },
            {
                property: "og:title",
                content: "Inverter, Car Battery, Solar Panel at Best Price in India - Livguard",
            },
            {
                property: "og:description",
                content:
                    "Get the best inverter for your home today. With unlimited energy power up your spaces. Livguard's wide range of inverters are especially built to deliver high performance in our fast paced lives..",
            },
            {
                property: "og:site_name",
                content: "Livguard",
            },
            {
                property: "og:type",
                content: "Website",
            },
            {
                property: "og:image",
                content: `${getAbsolutePathForRelativePath(getMetadataForImage("/livguard/common/og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null)}`,
            },
        ];
    } else if (userPreferences.language == Language.Hindi) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/sales-return-policy",
            },
            {
                title: "Inverter, Car Battery, Solar Panel at Best Price in India - Livguard",
            },
            {
                name: "description",
                content:
                    "Get the best inverter for your home today. With unlimited energy power up your spaces. Livguard's wide range of inverters are especially built to deliver high performance in our fast paced lives..",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/sales-return-policy",
            },
            {
                property: "og:title",
                content: "Inverter, Car Battery, Solar Panel at Best Price in India - Livguard",
            },
            {
                property: "og:description",
                content:
                    "Get the best inverter for your home today. With unlimited energy power up your spaces. Livguard's wide range of inverters are especially built to deliver high performance in our fast paced lives..",
            },
            {
                property: "og:site_name",
                content: "Livguard",
            },
            {
                property: "og:type",
                content: "Website",
            },
            {
                property: "og:image",
                content: `${getAbsolutePathForRelativePath(getMetadataForImage("/livguard/common/og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null)}`,
            },
        ];
    } else {
        throw Error(`Undefined language ${userPreferences.language}`);
    }
};

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
                breadcrumbs={[
                    {contentId: "cfab263f-0175-43fb-91e5-fccc64209d36", link: "/"},
                    {contentId: "43953acd-0fe3-40a8-a307-297f4bb7124b", link: "#"},
                ]}
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

            <VerticalSpacer className="tw-h-10" />

            <SalesReturnPolicy
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="tw-h-20" />
        </div>
    );
}

function HeroSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-aspect-square lg:tw-aspect-[1280/380] tw-grid tw-grid-rows-[minmax(0,1fr)_auto_3.4rem] lg:tw-grid-rows-[minmax(0,1fr)_auto_1rem_auto_minmax(0,1fr)] tw-text-center lg:tw-text-left tw-items-center",
                className,
            )}
        >
            <div className="tw-row-start-1 tw-col-start-1 tw-row-span-full">
                {isScreenSizeBelow == null ? null : (
                    <FullWidthImage
                        relativePath={isScreenSizeBelow ? "/livguard/sales-return-policy/1/mobile-banner.jpg" : "/livguard/sales-return-policy/1/desktop-banner.jpg"}
                        key={isScreenSizeBelow ? "/livguard/sales-return-policy/1/mobile-banner.jpg" : "/livguard/sales-return-policy/1/desktop-banner.jpg"}
                    />
                )}
            </div>
            <DefaultTextAnimation className="tw-row-start-2 tw-col-start-1">
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
                    className="lg-text-headline lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: getVernacularString("74cd145f-e021-4f2d-81e4-3bdd4cbcf891", userPreferences.language)}}
                ></div>
                <div className="lg-text-title2  lg-text-secondary-900">{getVernacularString("d57d1a75-b578-4caa-8966-a13ab6146b20", userPreferences.language)}</div>
            </div>

            <VerticalSpacer className="tw-h-[1.5rem]" />

            <div
                className="lg-text-headline lg-text-secondary-900"
                dangerouslySetInnerHTML={{__html: getVernacularString("f30c51d9-5f1c-429b-865a-adb5062e9d55", userPreferences.language)}}
            ></div>

            <VerticalSpacer className="tw-h-3" />

            <div className="lg-text-body lg-text-secondary-900 tw-pl-[3rem]">{getVernacularString("559ec70e-f4ad-48ef-8fd0-31778c9ca07a", userPreferences.language)}</div>

            <VerticalSpacer className="tw-h-[1.5rem]" />

            <div
                className="lg-text-headline lg-text-secondary-900"
                dangerouslySetInnerHTML={{__html: getVernacularString("3a5323eb-1863-4778-af39-b75a7f027144", userPreferences.language)}}
            ></div>

            <VerticalSpacer className="tw-h-3" />

            <div className="lg-text-body lg-text-secondary-900 tw-pl-[3rem]">{getVernacularString("56bba6ff-0903-41ab-8921-b7f9f178be2d", userPreferences.language)}</div>

            <VerticalSpacer className="tw-h-[1.5rem]" />

            <div className="tw-grid tw-grid-flow-rows tw-gap-3">
                <div
                    className="lg-text-headline lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: getVernacularString("dfa7ddd9-0a82-4e34-bad3-5d007af442ab", userPreferences.language)}}
                ></div>

                <div className="lg-text-body lg-text-secondary-900 tw-pl-[3rem]">{getVernacularString("e87b74a4-6ad4-4afb-9128-6c96107329f6", userPreferences.language)}</div>

                <div className="lg-text-body lg-text-secondary-900 tw-pl-[3rem]">{getVernacularString("c648db7a-2882-40b6-8bb4-c6f5e9a25ded", userPreferences.language)}</div>

                <div className="lg-text-body lg-text-secondary-900 tw-pl-[3rem]">{getVernacularString("2f62912e-e64c-4b2d-bcb5-39c7647850f7", userPreferences.language)}</div>
            </div>
        </div>
    );
}
