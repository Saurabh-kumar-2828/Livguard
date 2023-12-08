import type {LinksFunction, LoaderFunction, V2_MetaFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {PageScaffold} from "~/components/pageScaffold";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {ImageCdnProvider, ImageMetadata} from "~/common--type-definitions/typeDefinitions";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {UserPreferences} from "~/typeDefinitions";
import {Language} from "~/typeDefinitions";
import {getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {getContentGenerator} from "~/vernacularProvider";
import {useContext} from "react";
import {getVernacularFromBackend} from "~/backend/vernacularProvider.server";
import {ContentProviderContext} from "~/contexts/contentProviderContext";
import {getImageMetadataLibraryFromBackend, getMetadataForImageServerSide} from "~/backend/imageMetaDataLibrary.server";
import {ImageProviderContext} from "~/contexts/imageMetaDataContext";

export const meta: V2_MetaFunction = ({data: loaderData}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = loaderData.userPreferences;
    if (userPreferences.language == Language.English) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/privacy-policy",
            },
            {
                title: "Privacy Policy | Livguard",
            },
            {
                name: "description",
                content:
                    "LIVGUARD Technologies Private Limited, is a company registered under the Companies Act, 2013, having its registered office at WZ-106/101, Rajouri Garden Extension, West Delhi, New Delhi-110027.",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/privacy-policy",
            },
            {
                property: "og:title",
                content: "Privacy Policy | Livguard",
            },
            {
                property: "og:description",
                content:
                    "LIVGUARD Technologies Private Limited, is a company registered under the Companies Act, 2013, having its registered office at WZ-106/101, Rajouri Garden Extension, West Delhi, New Delhi-110027.",
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
                content: loaderData.ogBanner,
            },
        ];
    } else if (userPreferences.language == Language.Hindi) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/privacy-policy",
            },
            {
                title: "Privacy Policy | Livguard",
            },
            {
                name: "description",
                content:
                    "LIVGUARD Technologies Private Limited, is a company registered under the Companies Act, 2013, having its registered office at WZ-106/101, Rajouri Garden Extension, West Delhi, New Delhi-110027.",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/privacy-policy",
            },
            {
                property: "og:title",
                content: "Privacy Policy | Livguard",
            },
            {
                property: "og:description",
                content:
                    "LIVGUARD Technologies Private Limited, is a company registered under the Companies Act, 2013, having its registered office at WZ-106/101, Rajouri Garden Extension, West Delhi, New Delhi-110027.",
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
                content: loaderData.ogBanner,
            },
        ];
    } else {
        throw Error(`Undefined language ${userPreferences.language}`);
    }
};

export const links: LinksFunction = () => {
    return [{rel: "canonical", href: "https://www.livguard.com/privacy-policy"}];
};

type LoaderData = {
    userPreferences: UserPreferences;
    redirectTo: string;
    pageUrl: string;
    vernacularData: {
        [id: string]: string;
    };
    imageMetaDataLibrary: {
        [relativePath: string]: ImageMetadata | undefined;
    };
    ogBanner: string;
};

export const loader: LoaderFunction = async ({request}) => {
    const userPreferences = await getUserPreferencesFromCookiesAndUrlSearchParameters(request);
    if (userPreferences instanceof Error) {
        throw userPreferences;
    }

    const vernacularData = getVernacularFromBackend("privacyPolicyPage", userPreferences.language);
    const imageMetaDataLibrary = getImageMetadataLibraryFromBackend("privacyPolicyPage");
    const ogBanner = getAbsolutePathForRelativePath(getMetadataForImageServerSide("/livguard/common/og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null);

    const loaderData: LoaderData = {
        userPreferences: userPreferences,
        redirectTo: getRedirectToUrlFromRequest(request),
        pageUrl: getUrlFromRequest(request),
        vernacularData: vernacularData,
        imageMetaDataLibrary: imageMetaDataLibrary,
        ogBanner: ogBanner,
    };

    return loaderData;
};

export default () => {
    const {userPreferences, redirectTo, pageUrl, vernacularData, imageMetaDataLibrary} = useLoaderData() as LoaderData;

    const utmSearchParameters = useUtmSearchParameters();

    return (
        <>
            <ImageProviderContext.Provider value={imageMetaDataLibrary}>
                <ContentProviderContext.Provider
                    value={{
                        getContent: getContentGenerator(vernacularData),
                    }}
                >
                    <PageScaffold
                        userPreferences={userPreferences}
                        redirectTo={redirectTo}
                        showMobileMenuIcon={true}
                        utmParameters={utmSearchParameters}
                        pageUrl={pageUrl}
                        breadcrumbs={[
                            {contentId: "cfab263f-0175-43fb-91e5-fccc64209d36", link: "/"},
                            {contentId: "eea36080-325b-43d9-a29a-84e5bb4e3612", link: "#"},
                        ]}
                    >
                        <PrivacyPolicyPage userPreferences={userPreferences} />
                    </PageScaffold>
                </ContentProviderContext.Provider>
            </ImageProviderContext.Provider>
        </>
    );
};

function PrivacyPolicyPage({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div>
            <HeroSection userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <PrivacyPolicies
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="lg:tw-h-12 tw-h-6" />

            <ImportantTerms
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="lg:tw-h-12 tw-h-6" />

            <UserInformation
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="lg:tw-h-12 tw-h-6" />

            <ModesOfCollection
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="lg:tw-h-12 tw-h-6" />

            <PurposeOfCollection
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="lg:tw-h-12 tw-h-6" />

            <DisclosureAndRetention
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="lg:tw-h-12 tw-h-6" />

            <DisclosureRetention
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="lg:tw-h-12 tw-h-6" />

            <AccuracyAndProtection
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="lg:tw-h-12 tw-h-6" />

            <UserDiscretion
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="lg:tw-h-12 tw-h-6" />

            <GrievanceOfficer
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="lg:tw-h-12 tw-h-6" />

            <UpdatePrivacy
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="lg:tw-h-12 tw-h-6" />

            <GoverningLaw
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="lg:tw-h-12 tw-h-6" />

            <WhatsAppPrivacyPolicy
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="tw-h-20" />
        </div>
    );
}

function HeroSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-aspect-square lg:tw-aspect-[1280/380] tw-grid tw-grid-rows-[minmax(0,1fr)_auto_2.5rem] lg:tw-grid-rows-[minmax(0,1fr)_auto_1rem_auto_minmax(0,1fr)] tw-text-center lg:tw-text-left tw-items-center",
                className,
            )}
        >
            <div className="tw-row-start-1 tw-col-start-1 tw-row-span-full">
                {isScreenSizeBelow == null ? null : (
                    <FullWidthImage
                        relativePath={isScreenSizeBelow ? "/livguard/privacy-policies/1/mobile-banner.jpg" : "/livguard/privacy-policies/1/desktop-banner.jpg"}
                        key={isScreenSizeBelow ? "/livguard/privacy-policies/1/mobile-banner.jpg" : "/livguard/privacy-policies/1/desktop-banner.jpg"}
                    />
                )}
            </div>
            <DefaultTextAnimation className="tw-row-start-2 tw-col-start-1">
                <div className="lg-text-banner lg-px-screen-edge-2 tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">
                    {contentData.getContent("e1cd45c9-6258-4cfa-939f-92e24c409063")}
                </div>
            </DefaultTextAnimation>
        </div>
    );
}

function PrivacyPolicies({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[1.5rem] lg:tw-gap-[3rem]">
                <div className="tw-grid tw-grid-flow-row tw-gap-1">
                    <div
                        className="lg-text-headline"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("5a6dd842-e7f2-4ad7-98de-fc9c76b42c80")}}
                    ></div>
                    <div
                        className="lgs-text-body"
                        dangerouslySetInnerHTML={{
                            __html: contentData.getContent("44f6795e-31aa-489c-83cf-4855844e0c8f"),
                        }}
                    />
                </div>
                <div className="tw-grid tw-grid-flow-row tw-gap-4">
                    <div
                        className=""
                        dangerouslySetInnerHTML={{__html: contentData.getContent("58639d61-0980-400d-acca-4c01949569d3")}}
                    ></div>
                    <div
                        className="lg-text-body lg-text-secondary-900"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("c308c1f4-5547-42b0-9831-98ac935f3b58")}}
                    ></div>
                    <div
                        className="lg-text-body lg-text-secondary-900"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("20189d26-c91f-46d9-acfc-a5ede3236b5e")}}
                    ></div>
                    <div
                        className="lg-text-body lg-text-secondary-900"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("1b6394d4-0ef6-42b1-b8ef-f87cdd8b9d9f")}}
                    ></div>
                </div>
            </div>
        </div>
    );
}

function ImportantTerms({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                <div
                    className=""
                    dangerouslySetInnerHTML={{__html: contentData.getContent("77df2f43-d38d-4524-955c-812a42cf4809")}}
                ></div>
                <div
                    className="lg-text-body lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("5b04d6ba-1efb-436a-aa96-86fbee88cd6b")}}
                ></div>
                <div
                    className="lg-text-body lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("c3d023fc-788c-448b-81c3-ece4db462805")}}
                ></div>
                <div
                    className="lg-text-body lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("77038f2c-5a09-4f29-82b9-350dc7744ded")}}
                ></div>
            </div>
        </div>
    );
}

function UserInformation({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                <div
                    className=""
                    dangerouslySetInnerHTML={{__html: contentData.getContent("82fcfc12-378e-49e6-afbe-86ee7abdbf75")}}
                ></div>
                <div
                    className="lg-text-body lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("278c0506-592e-479f-9ad7-192639505c60")}}
                ></div>
                <div
                    className="lg-text-body lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("86161cc4-6f3c-49fc-8ade-58f29afc2ebb")}}
                ></div>
                <div
                    className="lg-text-body lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("5dddbe4c-dd33-4b55-ae89-8ea142e13433")}}
                ></div>
                <div
                    className="lg-text-body lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("47c69ab3-900c-4224-a43c-42b7f59021b8")}}
                ></div>
            </div>
        </div>
    );
}

function ModesOfCollection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                <div
                    className=""
                    dangerouslySetInnerHTML={{__html: contentData.getContent("f99dd265-19b4-4c6c-9bdf-e821028a7f1c")}}
                ></div>
                <div
                    className="lg-text-body lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("cb8a9e2c-c122-4364-8df0-1ca85b2cdbce")}}
                ></div>
                <div
                    className="lg-text-body lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("aa9c3a7a-59e8-494c-8735-4412242f97c4")}}
                ></div>
            </div>
        </div>
    );
}

function PurposeOfCollection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                <div
                    className=""
                    dangerouslySetInnerHTML={{__html: contentData.getContent("3ecc9b2a-3c63-474d-9030-b127f167e154")}}
                ></div>

                <div>
                    <div
                        className="lg-text-body lg-text-secondary-900"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("5b343f4f-5f88-4052-a854-03625bd47d69")}}
                    ></div>
                    <div
                        className="lg-text-body lg-text-secondary-900"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("3c1e2baa-32d5-437c-ac0d-48759c0637dc")}}
                    ></div>
                    <div
                        className="lg-text-body lg-text-secondary-900"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("431f673d-7133-4b47-a4fc-0b5d1f785a31")}}
                    ></div>
                    <div
                        className="lg-text-body lg-text-secondary-900"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("44c9b6f1-596d-48fe-b7d3-e56632034095")}}
                    ></div>
                    <div
                        className="lg-text-body lg-text-secondary-900"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("56cfc5a2-3234-4102-914a-633ba422e01b")}}
                    ></div>
                    <div
                        className="lg-text-body lg-text-secondary-900"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("e8c1605b-6bce-4fd5-9169-c49e378fd4de")}}
                    ></div>
                    <div
                        className="lg-text-body lg-text-secondary-900"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("8b853c2f-15aa-479e-965e-760dd491232e")}}
                    ></div>
                    <div
                        className="lg-text-body lg-text-secondary-900"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("113f5a01-82e6-42de-93d5-dbe1f7d19b54")}}
                    ></div>
                    <div
                        className="lg-text-body lg-text-secondary-900"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("913a55de-32d2-4a5f-84bc-ddac36747d15")}}
                    ></div>
                    <div
                        className="lg-text-body lg-text-secondary-900"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("5b2b4664-0482-41ec-a0c7-444cfca27a37")}}
                    ></div>
                    <div
                        className="lg-text-body lg-text-secondary-900"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("8337096b-9366-4d12-b39d-56e692bdaeaa")}}
                    ></div>
                    <div
                        className="lg-text-body lg-text-secondary-900"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("27d95f06-70f3-434b-a8df-b8e40aba21d5")}}
                    ></div>
                    <div
                        className="lg-text-body lg-text-secondary-900"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("7b050d8e-5836-4ea4-bc84-cac86bf0c9bc")}}
                    ></div>
                    <div
                        className="lg-text-body lg-text-secondary-900"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("66726cd7-94c1-4ef5-8cb0-6acfb7848505")}}
                    ></div>
                    <div
                        className="lg-text-body lg-text-secondary-900"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("1c7c4aad-bddc-4773-9c22-7a276fead53c")}}
                    ></div>
                    <div
                        className="lg-text-body lg-text-secondary-900"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("7cf4347b-8a4a-4fca-9c02-3761202f2a27")}}
                    ></div>
                    <div
                        className="lg-text-body lg-text-secondary-900"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("e6adca15-6dfb-48b7-8be7-dc52032ea71d")}}
                    ></div>
                </div>
            </div>
        </div>
    );
}

function DisclosureAndRetention({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[0.5rem]">
                <div
                    className=""
                    dangerouslySetInnerHTML={{__html: contentData.getContent("d27c24dd-40a2-4373-99b3-eb71ccfc2b98")}}
                ></div>

                <div>
                    <div
                        className="lg-text-body lg-text-secondary-900"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("cd391409-5d57-498e-9257-9ab02d05a788")}}
                    ></div>
                    <div
                        className="lg-text-body lg-text-secondary-900"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("96b82a04-2ff3-4ef9-8a0a-d26cc960b8b3")}}
                    ></div>
                    <div
                        className="lg-text-body lg-text-secondary-900"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("68d5e380-6f21-47fb-a843-c6aaa666dc73")}}
                    ></div>
                    <div
                        className="lg-text-body lg-text-secondary-900"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("9fa9be91-7380-451d-a225-69e8e2403635")}}
                    ></div>
                    <div
                        className="lg-text-body lg-text-secondary-900"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("6d1e570d-cc89-4de6-b652-19f51c77c8e2")}}
                    ></div>
                </div>
                <div
                    className="lg-text-body lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("54c87390-7084-4cb1-b9c9-377079b0df17")}}
                />
                <div
                    className="lg-text-body lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("7efe0543-f56d-4a42-94e8-071960afb913")}}
                ></div>
                <div
                    className="lg-text-body lg-text-secondary-900"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("4598a898-04e1-4cd3-a35d-61d27bdf34d7")}}
                ></div>
            </div>
        </div>
    );
}

function DisclosureRetention({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[0.5rem]">
                <div
                    className=""
                    dangerouslySetInnerHTML={{__html: contentData.getContent("4300717a-09da-44b8-84fd-48618c687ec1")}}
                ></div>
                <div
                    className=""
                    dangerouslySetInnerHTML={{__html: contentData.getContent("fd29f53e-96c6-4038-8427-9115cb09ecc3")}}
                ></div>
                <div
                    className=""
                    dangerouslySetInnerHTML={{__html: contentData.getContent("ea272676-3802-4843-803a-e0ad13b065f5")}}
                ></div>
            </div>
        </div>
    );
}

function AccuracyAndProtection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[0.5rem]">
                <div
                    className=""
                    dangerouslySetInnerHTML={{__html: contentData.getContent("36b37274-7ff0-4d9f-bfb2-b2739985310d")}}
                ></div>
                <div
                    className=""
                    dangerouslySetInnerHTML={{__html: contentData.getContent("d4254721-b706-42b5-ad43-58078e4494cb")}}
                ></div>
            </div>
        </div>
    );
}

function UserDiscretion({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[0.5rem]">
                <div
                    className=""
                    dangerouslySetInnerHTML={{__html: contentData.getContent("02baf425-5186-4904-8021-9fdcddfb2866")}}
                ></div>
                <div
                    className=""
                    dangerouslySetInnerHTML={{__html: contentData.getContent("b331829c-16c8-4530-92b0-05dde534174c")}}
                ></div>
                <div
                    className=""
                    dangerouslySetInnerHTML={{__html: contentData.getContent("1bdf42b3-3ccf-4beb-a596-175ec5d93b02")}}
                ></div>
                <div
                    className=""
                    dangerouslySetInnerHTML={{__html: contentData.getContent("156d8081-7106-4f47-99d5-82b2e05f3268")}}
                ></div>
            </div>
        </div>
    );
}

function GrievanceOfficer({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[0.5rem]">
                <div
                    className=""
                    dangerouslySetInnerHTML={{__html: contentData.getContent("26a57e61-ba7d-4b5d-a6f5-37e2a942baae")}}
                ></div>
                <div
                    className=""
                    dangerouslySetInnerHTML={{__html: contentData.getContent("5af772f4-4767-4d8d-94be-d19bd8f09270")}}
                ></div>
            </div>
        </div>
    );
}

function UpdatePrivacy({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[0.5rem]">
                <div
                    className=""
                    dangerouslySetInnerHTML={{__html: contentData.getContent("f9017529-2e06-448b-9fac-60b3ebe9f5f8")}}
                ></div>
                <div
                    className=""
                    dangerouslySetInnerHTML={{__html: contentData.getContent("8b508a55-0b04-4454-b098-e863009e45e4")}}
                ></div>
            </div>
        </div>
    );
}

function GoverningLaw({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[0.5rem]">
                <div
                    className=""
                    dangerouslySetInnerHTML={{__html: contentData.getContent("1827dab4-34e9-4f0f-97f3-e6e576aea81e")}}
                ></div>
                <div
                    className=""
                    dangerouslySetInnerHTML={{__html: contentData.getContent("86954c62-c133-43bf-8551-5799f57650e4")}}
                ></div>
            </div>
        </div>
    );
}

function WhatsAppPrivacyPolicy({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-flow-row tw-gap-[1rem]">
                <div
                    className=""
                    dangerouslySetInnerHTML={{__html: contentData.getContent("51d356d0-fd9e-4821-9d40-e4b5941a347d")}}
                ></div>
                <div
                    className=""
                    dangerouslySetInnerHTML={{__html: contentData.getContent("21b9fed2-0f6c-4f09-8558-a9ceeadb82b5")}}
                ></div>
                <div className="">
                    <div
                        className="lg-text-title2"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("cf616cbc-4f39-47ef-96ce-34ce5d7bac0c")}}
                    ></div>

                    <div
                        className="tw-pl-[3rem]"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("92511aa0-4496-4329-801a-e584523f43d3")}}
                    ></div>
                </div>
                <div className="">
                    <div
                        className="lg-text-title2"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("68324170-b75f-47cc-9aaa-a476e21b39d2")}}
                    ></div>

                    <div
                        className="tw-pl-[3rem]"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("41a34384-a068-4c8d-b5c5-6445391e5cde")}}
                    ></div>
                </div>
                <div className="">
                    <div
                        className="lg-text-title2"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("94a1d750-46d5-44d6-a7bb-b3c618d5c3d3")}}
                    ></div>

                    <div
                        className="tw-pl-[3rem]"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("f640f948-c51f-4108-9a2d-819ac11a4dc1")}}
                    ></div>
                </div>
                <div className="">
                    <div
                        className="lg-text-title2"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("f53f571a-74d1-4104-b9da-1820dbff78be")}}
                    ></div>

                    <div
                        className="tw-pl-[3rem]"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("91471559-ce87-4196-b5de-2187d80cccb2")}}
                    ></div>
                </div>
            </div>
        </div>
    );
}
