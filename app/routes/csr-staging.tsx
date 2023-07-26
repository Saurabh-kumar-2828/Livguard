import {LinksFunction, LoaderFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {PageScaffold} from "~/components/pageScaffold";
import {concatenateNonNullStringsWithSpaces, generateUuid} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import {UserPreferences} from "~/typeDefinitions";
import {getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";
import {CoverImage} from "~/components/images/coverImage";
import {useResizeDetector} from "react-resize-detector";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {useState} from "react";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ImageCdnProvider} from "~/global-common-typescript/typeDefinitions";
import {CarouselStyle7} from "~/components/carouselStyle7";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";

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

// export const links: LinksFunction = () => {
//     return [{rel: "canonical", href: "https://www.livguard.com/term-and-condition"}];
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
        <div className="">
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
                <CsrPage userPreferences={userPreferences} />
            </PageScaffold>
        </div>
    );
};

function CsrPage({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="lg-bg-secondary-100 dark:tw-bg-background-500-dark tw-w-full tw-h-full">
            <HeroSection userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <OurCsrInitiative
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="lg:tw-h-20  tw-h-10" />

            <OurVision
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="lg:tw-h-20  tw-h-10" />

            <OurProjectsDesktop
                className="tw-hidden lg:tw-block tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <OurProjectsMobile
                className="tw-block lg:tw-hidden tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="lg:tw-h-20  tw-h-10" />

            <CompositionOfCsrCommittee
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="lg:tw-h-20  tw-h-10" />
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
                    relativePath={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/csr/1/banner-mobile.jpg" : "/livguard/csr/1/banner-desktop.jpg"}
                    className="tw-row-start-1 tw-col-start-1 tw-row-span-full"
                    key={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/csr/1/banner-mobile.jpg" : "/livguard/csr/1/banner-desktop.jpg"}
                />
            )}
        </div>
    );
}

function OurCsrInitiative({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge-2 tw-w-full", className)}>
            <div
                className="lg-text-headline tw-text-center"
                dangerouslySetInnerHTML={{__html: getVernacularString("09b7690d-2117-461b-8a05-110dc4319240", userPreferences.language)}}
            ></div>
            <VerticalSpacer className="tw-h-[1.5rem]" />
            <div
                className="lg-text-body lg-text-secondary-900 tw-text-center lg:tw-px-[5rem]"
                dangerouslySetInnerHTML={{__html: getVernacularString("b0e9add2-cb81-4ba8-a38b-ee9ac0734225", userPreferences.language)}}
            ></div>
            <VerticalSpacer className="tw-h-[1.5rem]" />
            <div className="tw-grid lg:tw-grid-cols-4 lg:tw-grid-rows-1 md:tw-grid-cols-2 md:tw-grid-rows-2 tw-grid-rows-4 tw-grid-cols-1 tw-gap-[1.5rem] tw-items-center tw-justify-center ">
                <ItemBuilder
                    items={[
                        {
                            svgIcone: "/livguard/csr/2/education.svg",
                            title: "9b48da94-c77c-433d-a704-12c87673d23a",
                            text: "998c7be8-35d4-4f1e-ba7c-b1ead3af22ae",
                        },
                        {
                            svgIcone: "/livguard/csr/2/promotion-healthcare.svg",
                            title: "7ecc798a-b004-4363-b6c4-109b214a9c56",
                            text: "714cb12b-e61e-45cc-8bf5-efe8f05313f6",
                        },
                        {
                            svgIcone: "/livguard/csr/2/promotion-livelihood.svg",
                            title: "69e2dcc3-d054-4201-91f2-0d615de566db",
                            text: "4fdfc3c9-3c2d-4b98-9a6c-8da1a66b2c88",
                        },
                        {
                            svgIcone: "/livguard/csr/2/sustainability.svg",
                            title: "4415a7de-a118-45ab-beaf-095576d3d2dc",
                            text: "06174709-99f2-4a5e-8db2-e499622975dc",
                        },
                    ]}
                    itemBuilder={(item, itemIndex) => (
                        <div
                            className="tw-h-full tw-grid lg:tw-grid-rows-[minmax(0,1fr)_0.5rem_auto_0.5rem_minmax(0,1fr)] tw-grid-rows-[auto_0.2rem_minmax(0,1fr)] lg:tw-grid-cols-1 tw-grid-cols-[1fr_3fr] lg-card-shadow tw-justify-items-start lg:tw-justify-items-center lg:tw-px-1 tw-rounded-md tw-items-center lg:tw-py-[1.5rem] tw-py-[1rem] tw-px-[1rem]  tw-border-secondary-100-light dark:tw-border-secondary-100-dark tw-border lg-bg-secondary-100 tw-gap-x-5"
                            key={itemIndex}
                        >
                            <div className="tw-col-start-1 tw-row-start-1 lg:tw-row-end-2 tw-row-end-4 tw-w-[5rem] tw-h-[5rem] tw-rounded-full tw-grid tw-items-center tw-justify-center tw-border-secondary-100-light dark:tw-border-secondary-100-dark tw-border lg-card-shadow dark:tw-bg-secondary-300-dark">
                                {/* <img
                                    src={`https://growthjockey.imgix.net${item.svgIcone}`}
                                    className={concatenateNonNullStringsWithSpaces("tw-w-6 tw-h-6 dark:tw-invert ")}
                                /> */}
                                <img
                                    src={getAbsolutePathForRelativePath(getMetadataForImage(item.svgIcone).finalUrl, ImageCdnProvider.Bunny, null, null)}
                                    className={concatenateNonNullStringsWithSpaces("dark:tw-invert")}
                                />
                            </div>
                            <div
                                className="lg:tw-col-start-1 tw-col-start-2 lg:tw-row-start-3 tw-row-start-1"
                                dangerouslySetInnerHTML={{__html: getVernacularString(item.title, userPreferences.language)}}
                            />
                            <div className="lg:tw-col-start-1 tw-col-start-2 lg:tw-row-start-5 tw-row-start-3 lg-text-body lg-text-secondary-900 lg:tw-text-center">
                                {getVernacularString(item.text, userPreferences.language)}
                            </div>
                        </div>
                    )}
                />
            </div>
        </div>
    );
}

function OurVision({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-bg-[#F2F2F2] dark:tw-bg-secondary-100-dark lg:tw-bg-secondary-100-light dark:lg:tw-bg-background-500-dark lg-px-screen-edge-2 tw-w-full",
                className,
            )}
        >
            <div className="lg:tw-bg-[#F2F2F2] lg:dark:tw-bg-secondary-100-dark tw-w-full tw-h-full tw-py-6 lg:tw-py-10">
                <div className="tw-grid tw-justify-center tw-items-center tw-gap-4">
                    <div className="tw-h-[4rem] tw-w-[4rem] tw-bg-secondary-100-light dark:tw-bg-secondary-300-dark tw-rounded-full tw-grid tw-justify-center tw-justify-self-center tw-items-center">
                        <img
                            src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/csr/3/our-vision.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
                            className={concatenateNonNullStringsWithSpaces("tw-w-6 tw-h-6 tw-invert dark:tw-invert-0")}
                        />
                    </div>
                    <div
                        className="lg-text-headline tw-text-center"
                        dangerouslySetInnerHTML={{__html: getVernacularString("8a7e10ee-cde7-461f-9392-22301c8474a1", userPreferences.language)}}
                    />
                </div>
                <VerticalSpacer className="tw-h-[1.5rem]" />

                <div className="lg-text-body lg-text-secondary-900 tw-text-center lg:tw-px-[5rem]">{getVernacularString("d304550b-a5f6-41d8-8db6-8dae4f68b0af", userPreferences.language)}</div>
            </div>
        </div>
    );
}

function OurProjectsDesktop({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge-2 tw-w-full", className)}>
            <div
                className="lg-text-headline tw-text-center"
                dangerouslySetInnerHTML={{__html: getVernacularString("423d9fb0-8f59-4a7c-94e6-6eae3e78ec46", userPreferences.language)}}
            />
            <VerticalSpacer className="tw-h-[1.5rem]" />

            <div
                className="lg-text-body lg-text-secondary-900 tw-text-center"
                dangerouslySetInnerHTML={{__html: getVernacularString("9ffed122-9c1f-4e60-8d86-543812ebe4b5", userPreferences.language)}}
            ></div>
            <VerticalSpacer className="tw-h-[1.5rem]" />
            <div className="tw-grid lg:tw-grid-cols-2 lg:tw-grid-rows-2 tw-grid-cols-1 tw-grid-rows-4 tw-gap-[1.5rem]">
                <ItemBuilder
                    items={[
                        {
                            image: "/livguard/csr/4/1.png",
                            title: "040d0fed-8daf-4463-bbb1-c732b22995ec",
                            buttontext: "3cf2dca9-b278-4047-888a-c7f950364512",
                            text: "3f15697a-6dcf-48b5-b244-cb2337ea3e79",
                        },
                        {
                            image: "/livguard/csr/4/2.png",
                            title: "d1f7806b-96e5-4763-95e4-1904a3394ce8",
                            buttontext: "d263a415-1139-4e5b-a809-09594a14f078",
                            text: "759ad098-736a-4d83-8d5e-cd743006f1f9",
                        },
                        {
                            image: "/livguard/csr/4/3.png",
                            title: "1c5a01c5-fb13-4a79-a200-e80395fd302f",
                            buttontext: "67cd40f9-6d45-4005-84a0-b00e97de8c82",
                            text: "49372a39-5011-4426-abff-3ccd5bca1a1b",
                        },
                        {
                            image: "/livguard/csr/4/2.png",
                            title: "871e1887-2b27-49b5-8dea-1dc093f8ca96",
                            buttontext: "a3aec8ec-b853-4a86-9cd4-dd09c7153b84",
                            text: "71949a30-ffab-4c86-90b8-44a88b27d9df",
                        },
                    ]}
                    itemBuilder={(item, itemIndex) => {
                        return (
                            <div
                                className={`tw-grid tw-grid-rows-[0,minmax(0,1fr)] tw-relative tw-group tw-rounded-lg`}
                                key={itemIndex}
                            >
                                <CoverImage
                                    relativePath={item.image}
                                    className="tw-col-start-1 tw-col-span-full tw-row-start-1 tw-row-span-full"
                                />
                                <div className="tw-row-start-2 tw-col-start-1 tw-absolute tw-transition-all tw-duration-300 tw-bottom-0 tw-ease-in tw-pb-1 group-hover:tw-pb-2 tw-w-full tw-px-4  tw-rounded-lg tw-bg-[#00000066] tw-backdrop-opacity-[2px] tw-overflow-y-auto">
                                    <div
                                        className="lg-text-title2 tw-col-start-1 tw-row-start-1 tw-text-[#FFFFFF] tw-py-2 tw-grid tw-items-center"
                                        dangerouslySetInnerHTML={{__html: getVernacularString(item.title, userPreferences.language)}}
                                    ></div>
                                    <div
                                        className="lg-text-body tw-row-start-2 tw-col-start-1 tw-col-end-3 !tw-text-[#FFFFFF] tw-hidden tw-transition-all tw-ease-in tw-duration-300 group-hover:tw-block"
                                        dangerouslySetInnerHTML={{__html: getVernacularString(item.text, userPreferences.language)}}
                                    ></div>
                                </div>
                            </div>
                        );
                    }}
                />
            </div>
        </div>
    );
}

function OurProjectsMobile({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const [imgText, setImgText] = useState(false);
    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge-2 tw-w-full", className)}>
            <div
                className="lg-text-headline tw-text-center"
                dangerouslySetInnerHTML={{__html: getVernacularString("423d9fb0-8f59-4a7c-94e6-6eae3e78ec46", userPreferences.language)}}
            />
            <VerticalSpacer className="tw-h-[1.5rem]" />

            <div
                className="lg-text-body lg-text-secondary-900 tw-text-center"
                dangerouslySetInnerHTML={{__html: getVernacularString("6ee5eb99-9c51-46fd-a08c-e940e31af061", userPreferences.language)}}
            ></div>
            <VerticalSpacer className="tw-h-[1.5rem]" />
            <div className="tw-grid tw-grid-cols-1 tw-grid-rows-4 tw-gap-[1.5rem]">
                <ItemBuilder
                    items={[
                        {
                            image: "/livguard/csr/4/1-mobile.png",
                            title: "040d0fed-8daf-4463-bbb1-c732b22995ec",
                            buttontext: "3cf2dca9-b278-4047-888a-c7f950364512",
                            text: "3f15697a-6dcf-48b5-b244-cb2337ea3e79",
                        },
                        {
                            image: "/livguard/csr/4/2-mobile.png",
                            title: "d1f7806b-96e5-4763-95e4-1904a3394ce8",
                            buttontext: "d263a415-1139-4e5b-a809-09594a14f078",
                            text: "759ad098-736a-4d83-8d5e-cd743006f1f9",
                        },
                        {
                            image: "/livguard/csr/4/3-mobile.png",
                            title: "1c5a01c5-fb13-4a79-a200-e80395fd302f",
                            buttontext: "67cd40f9-6d45-4005-84a0-b00e97de8c82",
                            text: "49372a39-5011-4426-abff-3ccd5bca1a1b",
                        },
                        {
                            image: "/livguard/csr/4/4-mobile.png",
                            title: "871e1887-2b27-49b5-8dea-1dc093f8ca96",
                            buttontext: "a3aec8ec-b853-4a86-9cd4-dd09c7153b84",
                            text: "71949a30-ffab-4c86-90b8-44a88b27d9df",
                        },
                    ]}
                    itemBuilder={(item, itemIndex) => (
                        <div
                            className="tw-grid tw-grid-rows-[0,minmax(0,1fr)] tw-relative tw-group tw-rounded-lg"
                            key={itemIndex}
                        >
                            <CoverImage
                                relativePath={item.image}
                                className="tw-col-start-1 tw-col-span-full tw-row-start-1 tw-row-span-full"
                            />
                            <div className="tw-row-start-2 tw-col-start-1 tw-absolute tw-transition-all tw-duration-300 tw-bottom-0 tw-ease-in tw-pb-1 group-hover:tw-pb-2 tw-w-full tw-px-2 tw-rounded-lg tw-bg-[#00000066] tw-backdrop-opacity-[2px] tw-max-h-[calc(100%-2rem)] tw-overflow-y-auto">
                                <div className="tw-flex tw-flex-wrap tw-justify-between">
                                    <div
                                        className="lg-text-title2 tw-col-start-1 tw-row-start-1 tw-text-[#FFFFFF] tw-py-2 tw-grid tw-items-center"
                                        dangerouslySetInnerHTML={{__html: getVernacularString(item.title, userPreferences.language)}}
                                    ></div>
                                    <div className="tw-py-2">
                                        <button
                                            className="tw-col-start-2 tw-row-start-1  lg-cta-button tw-w-full tw-items-center tw-justify-center tw-justify-items-center tw-px-3 tw-py-2"
                                            onClick={() => {
                                                setImgText((prev) => !prev);
                                            }}
                                        >
                                            <div
                                                className="lg-text-body-bold !tw-text-[#FFFFFF]"
                                                dangerouslySetInnerHTML={{__html: getVernacularString(item.buttontext, userPreferences.language)}}
                                            ></div>
                                        </button>
                                    </div>
                                </div>
                                {imgText && (
                                    <div
                                        className="lg-text-body tw-row-start-2 tw-col-start-1 tw-col-end-3 !tw-text-[#FFFFFF] tw-hidden tw-transition-all tw-ease-in tw-duration-300 group-hover:tw-block "
                                        dangerouslySetInnerHTML={{__html: getVernacularString(item.text, userPreferences.language)}}
                                    ></div>
                                )}
                            </div>
                        </div>
                    )}
                />
            </div>
        </div>
    );
}

function CompositionOfCsrCommittee({userPreferences, className}: {userPreferences: UserPreferences; className: string}) {
    const leadersData: Array<{title: string; position: string; description: string; imageRelativePath: string}> = [
        {
            title: getVernacularString("d867ff63-d4bf-49ae-8ac7-7290a76caef3", userPreferences.language),
            position: getVernacularString("755f8e01-18c9-4883-956c-5851e4e3885f", userPreferences.language),
            description: getVernacularString("8ddd1acf-9b2d-41f4-b4cd-e2395c211c88", userPreferences.language),
            imageRelativePath: "/livguard/about-us/3/leader-rakesh.png",
        },
        {
            title: getVernacularString("4ca82802-b39e-4844-9586-82ce4b095cff", userPreferences.language),
            position: getVernacularString("23fd4d15-8063-44e1-be03-a3aa6585d33b", userPreferences.language),
            description: getVernacularString("4f82218c-1156-4660-b634-a1231d82d457", userPreferences.language),
            imageRelativePath: "/livguard/about-us/3/leader-gurpreet.png",
        },
        {
            title: getVernacularString("54c7930a-aed3-4efc-b2eb-68a7b5b87ae2", userPreferences.language),
            position: getVernacularString("5267b971-9cbf-41dc-9cf8-abb2f8d7f2c5", userPreferences.language),
            description: getVernacularString("07d2f8d0-b81b-4dd3-a547-1adef20b3fea", userPreferences.language),
            imageRelativePath: "/livguard/about-us/3/leader-navneet.png",
        },
        {
            title: getVernacularString("d867ff63-d4bf-49ae-8ac7-7290a76caef3", userPreferences.language),
            position: getVernacularString("755f8e01-18c9-4883-956c-5851e4e3885f", userPreferences.language),
            description: getVernacularString("8ddd1acf-9b2d-41f4-b4cd-e2395c211c88", userPreferences.language),
            imageRelativePath: "/livguard/about-us/3/leader-rakesh.png",
        },
        {
            title: getVernacularString("4ca82802-b39e-4844-9586-82ce4b095cff", userPreferences.language),
            position: getVernacularString("23fd4d15-8063-44e1-be03-a3aa6585d33b", userPreferences.language),
            description: getVernacularString("4f82218c-1156-4660-b634-a1231d82d457", userPreferences.language),
            imageRelativePath: "/livguard/about-us/3/leader-gurpreet.png",
        },
        {
            title: getVernacularString("54c7930a-aed3-4efc-b2eb-68a7b5b87ae2", userPreferences.language),
            position: getVernacularString("5267b971-9cbf-41dc-9cf8-abb2f8d7f2c5", userPreferences.language),
            description: getVernacularString("07d2f8d0-b81b-4dd3-a547-1adef20b3fea", userPreferences.language),
            imageRelativePath: "/livguard/about-us/3/leader-navneet.png",
        },
    ];

    return (
        <>
            <div className={concatenateNonNullStringsWithSpaces("lg:tw-pb-6 lg:lg-px-screen-edge-2", className)}>
                <DefaultTextAnimation className="tw-flex tw-flex-col tw-items-center lg-text-headline lg-px-screen-edge-2 lg:tw-pl-0 lg:tw-pr-0 tw-text-center lg:tw-text-left">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("fccd6c6b-9f47-4862-9464-4592c9a14c84", userPreferences.language)}} />
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-4 lg:tw-h-8" />

                <div className="tw-grid tw-grid-flow-row lg:tw-grid-flow-col lg:tw-grid-cols-3">
                    <CompositionCard
                        userPreferences={userPreferences}
                        content={{
                            headingTextContentId: "0eeb2d2b-6dca-47bb-b5a8-05453bf8c91c",
                            descriptionTextContentId: "97498b14-b629-4e6e-81a3-6a480bdd6652",
                            ctaButton1TextContentId: "e1fa0021-2310-4c6a-a221-9025e3b35ed7",
                            ctaButton1Link: "",
                            ctaButton2TextContentId: "dd1fd5f5-12e4-4c37-b41d-969150aa721a",
                            ctaButton2Link: "",
                        }}
                        className="lg-px-screen-edge-2 lg:tw-px-0 lg:tw-pt-6 lg:tw-h-full"
                    />

                    <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

                    <CarouselStyle7
                        items={leadersData}
                        className="tw-mx-auto"
                        slidesContainerClassName="lg:tw-h-full"
                        deselectedContainersClassName="tw-pt-6 md:tw-pt-12 tw-h-full lg-px-screen-edge-2 lg:tw-px-0"
                        selectedContainerClassName="tw-pt-6 tw-h-full lg-px-screen-edge-2 lg:tw-px-0"
                        chevronButtonsBelowCarousel={false}
                        chevronButtonsDivisionFactor={2}
                        toggleMobileOnly={true}
                    />

                    <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

                    <CompositionCard
                        userPreferences={userPreferences}
                        content={{
                            headingTextContentId: "2b6ccacf-093d-48d2-b29c-e5d1c537f3c1",
                            descriptionTextContentId: "97498b14-b629-4e6e-81a3-6a480bdd6652",
                            ctaButton1TextContentId: "e1fa0021-2310-4c6a-a221-9025e3b35ed7",
                            ctaButton1Link: "",
                            ctaButton2TextContentId: "dd1fd5f5-12e4-4c37-b41d-969150aa721a",
                            ctaButton2Link: "",
                        }}
                        className="lg-px-screen-edge-2 lg:tw-px-0 lg:tw-pt-6 lg:tw-h-full"
                    />
                </div>
            </div>
        </>
    );
}

function CompositionCard({
    userPreferences,
    className,
    content,
}: {
    userPreferences: UserPreferences;
    className?: string;
    content: {
        headingTextContentId: string;
        descriptionTextContentId: string;
        ctaButton1TextContentId: string;
        ctaButton1Link: string;
        ctaButton2TextContentId: string;
        ctaButton2Link: string;
    };
}) {
    return (
        <div className={className}>
            <div
                className={concatenateNonNullStringsWithSpaces(
                    "tw-grid tw-grid-rows-[repeat(3,auto)_minmax(3rem,1fr)_auto] lg:tw-grid-rows-[minmax(0,1fr)_repeat(3,auto)_minmax(3rem,1fr)_auto_minmax(0,1fr)] tw-py-6 lg:tw-py-10 tw-px-4 tw-justify-items-center tw-rounded-lg lg-bg-secondary-100 lg-csr-leaders-shadow lg:tw-h-[calc(100%-1rem)]",
                )}
            >
                <div
                    className="tw-row-start-1 lg:tw-row-start-2 lg-text-title1 tw-text-center"
                    dangerouslySetInnerHTML={{__html: getVernacularString(content.headingTextContentId, userPreferences.language)}}
                />

                <VerticalSpacer className="tw-row-start-2 lg:tw-row-start-3 tw-h-4" />

                <div className="tw-row-start-3 lg:tw-row-start-4 lg-text-body tw-text-center">{getVernacularString(content.descriptionTextContentId, userPreferences.language)}</div>

                <div className="tw-row-start-5 lg:tw-row-start-6 tw-grid tw-grid-flow-row tw-gap-y-4">
                    <button className="lg-cta-button tw-px-4">{getVernacularString(content.ctaButton1TextContentId, userPreferences.language)}</button>
                    <button className="lg-cta-outline-button tw-px-4">{getVernacularString(content.ctaButton2TextContentId, userPreferences.language)}</button>
                </div>
            </div>
        </div>
    );
}
