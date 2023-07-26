import {PageScaffold} from "~/components/pageScaffold";
import {concatenateNonNullStringsWithSpaces, generateUuid, getIntegerArrayOfLength} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import {Language, UserPreferences} from "~/typeDefinitions";
import {appendSpaceToString, getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";
import {CoverImage} from "~/components/images/coverImage";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {useResizeDetector} from "react-resize-detector";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {LinksFunction, LoaderFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {parseClassName} from "react-toastify/dist/utils";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {useEmblaCarouselWithIndex} from "~/hooks/useEmblaCarouselWithIndex";
import {FaqSectionInternal} from "~/components/faqs";
import {CarouselStyle3} from "~/components/carouselStyle3";
import {EmbeddedYoutubeVideo} from "~/components/embeddedYoutubeVideo";
import {Facebook, Icon0Circle, Instagram, Linkedin, StarFill, Twitter, Youtube} from "react-bootstrap-icons";
import {SocialHandles} from "~/components/category/common";
import {CarouselStyle4} from "~/components/carouselStyle4";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ImageCdnProvider} from "~/global-common-typescript/typeDefinitions";
import {FixedWidthImage} from "~/components/images/fixedWidthImage";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {ContactUsCta} from ".";
import {string} from "zod";

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
                <EwasteManagementPage
                    userPreferences={userPreferences}
                    utmParameters={utmSearchParameters}
                    pageUrl={pageUrl}
                />
            </PageScaffold>
        </>
    );
};

function EwasteManagementPage({
    userPreferences,
    utmParameters,
    pageUrl,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
    pageUrl: string;
}) {
    return (
        <div>
            <HeroSection
                userPreferences={userPreferences}
                utmParameters={utmParameters}
                pageUrl={pageUrl}
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <Introduction
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <TypesOfEwastes
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <WhyEwaste
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <ServicesProvide
                className=""
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <NearestCollectionCenter
                className="tw-max-w-7xl tw-mx-auto"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <AwarenessPrograms userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <HappyUser
                className=""
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <SocialHandles
                userPreferences={userPreferences}
                heading={{text1: "homeS11H1T1", text2: "homeS11H1T2"}}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <FaqQuestion
                className="tw-max-w-7xl tw-mx-auto lg-px-screen-edge-2"
                userPreferences={userPreferences}
            />

            <VerticalSpacer className="tw-h-20" />
        </div>
    );
}

function HeroSection({
    userPreferences,
    utmParameters,
    className,
    pageUrl,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
    className?: string;
    pageUrl: string;
}) {
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height)-9.5rem)] lg:tw-h-[70vh] tw-grid tw-grid-rows-[3.5rem_auto_1rem_auto_minmax(0,1fr)] lg:tw-grid-rows-[minmax(0,1fr)_auto_1rem_auto_minmax(0,1fr)] tw-text-center lg:tw-text-left tw-items-center tw-relative",
                className,
            )}
            ref={ref}
        >
            {containerWidth == null || containerHeight == null ? null : (
                <CoverImage
                    relativePath={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/e-waste-management/1/mobile-hero-banner.png" : "/livguard/e-waste-management/1/hero-banner.png"}
                    className="tw-row-start-1 tw-col-start-1 tw-row-span-full"
                    key={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/e-waste-management/1/mobile-hero-banner.png" : "/livguard/e-waste-management/1/hero-banner.png"}
                />
            )}
            <h2 className="lg:tw-row-start-2 tw-row-start-5 tw-col-start-1 lg:lg-px-screen-edge-2">
                <DefaultTextAnimation>
                    <div className="lg-text-banner lg-text-secondary-100 !tw-text-secondary-100-light">
                        {appendSpaceToString(getVernacularString("bda064ee-6cc6-43f7-a7cb-8f14d9e050d9", userPreferences.language))}
                    </div>
                </DefaultTextAnimation>

                <DefaultTextAnimation>
                    <div className="lg-text-title1 lg-text-secondary-100 !tw-text-secondary-100-light">{getVernacularString("4eb87934-841c-4c9f-898e-3bfbac44f2a2", userPreferences.language)}</div>
                </DefaultTextAnimation>
                <VerticalSpacer className="tw-h-6" />
                <DefaultElementAnimation className="tw-grid tw-justify-center lg:tw-justify-start tw-z-10">
                    <ContactUsCta
                        userPreferences={userPreferences}
                        textVernacId="320a319c-7aa8-4289-b46a-8d58e8542fb1"
                        className="tw-z-10 lg:tw-place-self-end"
                        utmParameters={utmParameters}
                        pageUrl={pageUrl}
                    />
                </DefaultElementAnimation>
            </h2>
        </div>
    );
}

function Introduction({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div className="lg-text-headline tw-text-center">{getVernacularString("e7e9c51a-f71f-45dc-9607-93bd3236c6b5", userPreferences.language)}</div>
            <VerticalSpacer className="tw-h-[1rem]" />
            <div className="lg-text-body tw-block lg:tw-hidden">{getVernacularString("6df4af6d-4a94-4dd2-83a4-298ac4a56ac7", userPreferences.language)}</div>
            <div className="lg-text-body tw-hidden lg:tw-block">{getVernacularString("b4cd4e9a-a140-4d32-8c0f-2c0d385a49fb", userPreferences.language)}</div>
            <VerticalSpacer className="tw-h-4 tw-hidden lg:tw-block" />
            <div className="lg-text-body tw-hidden lg:tw-block">{getVernacularString("e9a9e6b2-592c-4d32-9f03-350f5159ca4c", userPreferences.language)}</div>
        </div>
    );
}

function TypesOfEwastes({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div
                className="lg-text-title1 tw-text-center"
                dangerouslySetInnerHTML={{__html: getVernacularString("95949a19-e3c5-456c-8dc4-65bf020a58ee", userPreferences.language)}}
            ></div>

            <VerticalSpacer className="tw-h-[1.5rem]" />

            <div className="tw-grid tw-grid-rows-3 lg:tw-grid-rows-1 lg:tw-grid-cols-3 tw-grid-cols-1 tw-gap-[1.5rem] tw-items-center tw-justify-center ">
                <ItemBuilder
                    items={[
                        {
                            svgIcone: "/livguard/e-waste-management/3/laptop-icon-1.svg",
                            title: "cce6a0e8-c566-4750-beb3-1889378386c6",
                            text: "14f34bb4-d2a6-43c3-92a4-6020ef742ad2",
                        },
                        {
                            svgIcone: "/livguard/e-waste-management/3/smart-phone-2.svg",
                            title: "cce6a0e8-c566-4750-beb3-1889378386c6",
                            text: "7fd3dd68-c99b-40f8-aca5-888de432b401",
                        },
                        {
                            svgIcone: "/livguard/e-waste-management/3/laptop-icon-1.svg",
                            title: "cce6a0e8-c566-4750-beb3-1889378386c6",
                            text: "545363c7-0354-4597-a5b2-ae58de55c291",
                        },
                    ]}
                    itemBuilder={(item, itemIndex) => (
                        <div
                            className="tw-h-full tw-grid tw-grid-rows-[auto_minmax(0,1fr)] tw-grid-cols-[1fr_3fr] lg-card-shadow tw-justify-items-start tw-rounded-md tw-items-center tw-p-[1.5rem] tw-border-secondary-100-light dark:tw-border-secondary-100-dark tw-border lg-bg-secondary-100 tw-gap-x-4"
                            key={itemIndex}
                        >
                            <div className="tw-col-start-1 tw-row-start-1 tw-row-end-4 tw-w-[5rem] tw-h-[5rem] tw-rounded-full tw-grid tw-items-center tw-justify-center tw-border-secondary-100-light dark:tw-border-secondary-100-dark tw-border lg-card-shadow dark:tw-bg-secondary-300-dark">
                                <img
                                    src={getAbsolutePathForRelativePath(getMetadataForImage(item.svgIcone).finalUrl, ImageCdnProvider.Bunny, null, null)}
                                    className={concatenateNonNullStringsWithSpaces("dark:tw-invert")}
                                />
                            </div>
                            <div
                                className=" tw-col-start-2 tw-row-start-1"
                                dangerouslySetInnerHTML={{__html: getVernacularString(item.title, userPreferences.language)}}
                            />
                            <div
                                className=" tw-col-start-2 tw-row-start-2 lg-text-body-bold lg-text-secondary-900"
                                dangerouslySetInnerHTML={{__html: getVernacularString(item.text, userPreferences.language)}}
                            ></div>
                        </div>
                    )}
                />
            </div>
        </div>
    );
}

function WhyEwaste({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div
                className="tw-w-full"
                ref={ref}
            >
                <div className=" tw-grid lg:tw-grid-rows-[1rem_minmax(0,1fr)_1rem] tw-content-center tw-grid-rows-[minmax(1rem,1fr)_auto_minmax(1rem,1fr)] tw-justify-items-center tw-relative tw-isolate">
                    <div className="tw-absolute tw-inset-0 -tw-z-10 tw-rounded-full">
                        {containerWidth == null || containerHeight == null ? null : (
                            <CoverImage
                                relativePath={
                                    containerHeight > containerWidth || containerWidth < 640 ? "/livguard/e-waste-management/4/mobile-banner.jpg" : "/livguard/e-waste-management/4/desktop-banner.jpg"
                                }
                                className="tw-rounded-lg"
                                key={
                                    containerHeight > containerWidth || containerWidth < 640 ? "/livguard/e-waste-management/4/mobile-banner.jpg" : "/livguard/e-waste-management/4/desktop-banner.jpg"
                                }
                            />
                        )}
                    </div>
                    <div className="tw-grid tw-col-start-1 tw-max-h-[13rem] tw-grid-cols-[auto_minmax(0,1fr)] tw-row-start-2 tw-mx-[2rem] lg:tw-py-8 tw-py-8 md:tw-py-2 tw-px-4 tw-justify-center tw-items-center tw-gap-[1.5rem] lg-e-waste-management-banner-card-bg">
                        <div className="lg:tw-h-[9rem] lg:tw-w-[9rem] tw-h-[6rem] tw-w-[6rem] lg-bg-secondary-100 tw-row-start-1 tw-col-start-1 tw-rounded-full tw-p-[2rem]">
                            <img
                                src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/e-waste-management/4/delete-icon.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
                                className={concatenateNonNullStringsWithSpaces("dark:tw-invert")}
                            />
                        </div>
                        <div>
                            <div
                                className="lg-text-title1 tw-text-secondary-900-light"
                                dangerouslySetInnerHTML={{__html: getVernacularString("6fa18bfe-40fb-42ec-b58c-654c4fc881da", userPreferences.language)}}
                            ></div>
                            <div
                                className="lg-text-body !tw-text-secondary-900-light"
                                dangerouslySetInnerHTML={{__html: getVernacularString("d2d23cef-3bfc-45bf-916c-a3299a9d163c", userPreferences.language)}}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
            <VerticalSpacer className="tw-h-10" />

            <div className="tw-grid tw-grid-col-1 lg:tw-grid-cols-2 tw-gap-x-[5rem] tw-gap-[1.5rem]">
                <div>
                    <div
                        className="lg-text-headline"
                        dangerouslySetInnerHTML={{__html: getVernacularString("8eb39f08-e6ac-49e8-b7cb-7b1b56a98891", userPreferences.language)}}
                    ></div>
                    <VerticalSpacer className="tw-h-4 lg:tw-h-2" />
                    <div
                        className="lg-text-body"
                        dangerouslySetInnerHTML={{__html: getVernacularString("91e2cda0-4afb-49e8-9772-8c4aa4cd246a", userPreferences.language)}}
                    ></div>
                </div>
                <div className="tw-grid tw-gap-6">
                    <div className="tw-grid tw-gap-2">
                        <div>
                            <div className="lg-text-title2 tw-grid tw-grid-cols-[3rem_minmax(0,1fr)] tw-items-center tw-gap-1">
                                <span className="lg-bg-secondary-100 tw-rounded-full tw-w-[2.625rem] tw-h-[2.625rem] tw-grid tw-justify-center tw-items-center tw-text-center">
                                    {getVernacularString("0ed9d4ea-8be2-4402-9cc9-6d9a07e96c43", userPreferences.language)}
                                </span>
                                {getVernacularString("fc71fe6d-a26c-4873-beb5-a16fe8fc7174", userPreferences.language)}
                            </div>
                        </div>
                        <div
                            className="lg-text-body"
                            dangerouslySetInnerHTML={{__html: getVernacularString("b494b200-dfd0-406c-8256-b1f655ca9066", userPreferences.language)}}
                        ></div>
                    </div>
                    <div className="tw-grid tw-gap-2">
                        <div>
                            <div className="lg-text-title2 tw-grid tw-grid-cols-[3rem_minmax(0,1fr)] tw-items-center tw-gap-1">
                                <span className="lg-bg-secondary-100 tw-rounded-full tw-w-[2.625rem] tw-h-[2.625rem] tw-grid tw-justify-center tw-items-center tw-text-center">
                                    {getVernacularString("b452610b-4e19-4d8a-a5c7-c42e7440a3e4", userPreferences.language)}
                                </span>
                                {getVernacularString("c67dd066-2f26-4073-af46-c66a4cdd21c5", userPreferences.language)}
                            </div>
                        </div>
                        <div
                            className="lg-text-body"
                            dangerouslySetInnerHTML={{__html: getVernacularString("b494b200-dfd0-406c-8256-b1f655ca9066", userPreferences.language)}}
                        ></div>
                    </div>
                    <div className="tw-grid tw-gap-2">
                        <div>
                            <div className="lg-text-title2 tw-grid tw-grid-cols-[3rem_minmax(0,1fr)] tw-items-center tw-gap-1">
                                <span className="lg-bg-secondary-100 tw-rounded-full tw-w-[2.625rem] tw-h-[2.625rem] tw-grid tw-justify-center tw-items-center tw-text-center">
                                    {getVernacularString("17bc8148-f2ed-4026-8074-ce2ca1013b4d", userPreferences.language)}
                                </span>
                                {getVernacularString("06e30da0-63f4-43d6-beb5-8fe3b7af9a33", userPreferences.language)}
                            </div>
                        </div>
                        <div
                            className="lg-text-body"
                            dangerouslySetInnerHTML={{__html: getVernacularString("b494b200-dfd0-406c-8256-b1f655ca9066", userPreferences.language)}}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ServicesProvide({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const items = Array(15).fill({
        svgIcone: "/livguard/e-waste-management/5/symbol-of-three-arrows1.svg",
        title: "1795f04a-f546-4230-80aa-e73f5020a68e",
    });
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full", className)}>
            <div
                className="lg-text-banner tw-text-center"
                dangerouslySetInnerHTML={{__html: getVernacularString("c0322003-0090-4b07-867b-e9a14cab8b06", userPreferences.language)}}
            ></div>
            <VerticalSpacer className="tw-h-[1rem]" />
            <div
                className="lg-text-body tw-text-center"
                dangerouslySetInnerHTML={{__html: getVernacularString("afc8a4c5-877d-4137-a2b0-97c9408eaded", userPreferences.language)}}
            ></div>
            <VerticalSpacer className="tw-h-[1.5rem]" />
            <CarouselStyle4
                chevronButtonsDivisionFactor={3}
                items={items.map((item, itemIndex) => {
                    return (
                        <div
                            className="tw-h-full tw-grid tw-gap-2 tw-p-5 tw-border tw-border-[#474546] tw-justify-center tw-items-center tw-rounded-lg tw-justify-items-center tw-max-w-[14rem]"
                            key={itemIndex}
                        >
                            <div className="tw-h-[4.5rem] tw-w-[4.5rem] tw-rounded-full lg-bg-secondary-100 tw-grid tw-justify-center tw-items-center">
                                <img
                                    src={getAbsolutePathForRelativePath(getMetadataForImage(item.svgIcone).finalUrl, ImageCdnProvider.Bunny, null, null)}
                                    className={concatenateNonNullStringsWithSpaces("dark:tw-invert")}
                                />
                            </div>
                            <div
                                className="lg-text-body-bold tw-text-center"
                                dangerouslySetInnerHTML={{__html: getVernacularString(item.title, userPreferences.language)}}
                            />
                        </div>
                    );
                })}
                slidesContainerClassName="lg:tw-auto-cols-[18%] tw-auto-cols-[60%] md:tw-auto-cols-[24%] 2xl:!tw-auto-cols-[10%] sm:tw-auto-cols-[37%]"
                controlsContainerClassName="!tw-justify-center !tw-gap-x-4"
            />
        </div>
    );
}

function NearestCollectionCenter({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge-2", className)}>
            <div
                className="lg-text-headline"
                dangerouslySetInnerHTML={{__html: getVernacularString("9d43b4fc-3438-4cf3-8f7d-2656d486846e", userPreferences.language)}}
            ></div>
            <VerticalSpacer className="tw-h-6" />
            <div className="tw-grid lg:tw-grid-cols-[minmax(0,1fr)_2rem_minmax(0,1fr)_1.5rem_auto] lg:tw-grid-rows-1 tw-grid-cols-1 tw-grid-rows-[minmax(0,1fr)_1rem_minmax(0,1fr)_minmax(0,1fr)] tw-items-end">
                <div className="tw-grid tw-col-start-1">
                    <div className="lg-text-body">{getVernacularString("acf56d00-92b0-4408-baf5-7c6c4596d0dc", userPreferences.language)}</div>
                    <input
                        type="text"
                        name="state"
                        className="lg-text-input"
                        placeholder={getVernacularString("ad6b181f-0115-4496-a9f8-4fb7d7d6e990", userPreferences.language)}
                        required
                    />
                </div>
                <div className="tw-grid lg:tw-col-start-3 lg:tw-row-start-1 tw-row-start-3">
                    <div className="lg-text-body">{getVernacularString("91cb41a5-571d-4516-91fb-fc5e67266990", userPreferences.language)}</div>
                    <input
                        type="text"
                        name="state"
                        className="lg-text-input"
                        placeholder={getVernacularString("07ac43fc-8777-4379-81d5-8c80533d5e66", userPreferences.language)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="lg:tw-row-start-1 tw-row-start-4 lg:tw-hidden tw-block lg:tw-col-start-5 lg-text-body lg-cta-button !tw-text-secondary-900-dark tw-w-full"
                >
                    {getVernacularString("3a2ac2b6-a897-4d0a-ac7e-0abf6425ba24", userPreferences.language)}
                </button>
                <button
                    type="submit"
                    className="lg:tw-block tw-hidden lg:tw-col-start-5 lg-text-body lg-cta-button !tw-text-secondary-900-dark"
                >
                    {getVernacularString("contactUsS3FormButtonText", userPreferences.language)}
                </button>
            </div>
            <VerticalSpacer className="tw-h-10" />
            <div className="tw-grid lg:tw-grid-cols-3 lg:tw-grid-rows-1 tw-grid-cols-1 tw-grid-rows-3 tw-gap-x-4 tw-gap-y-6">
                <ItemBuilder
                    items={[
                        {
                            name: "5fc70a88-5ac0-4369-991c-354a4d48deed",
                            address: "3534a1d3-4422-4446-8489-05c211592c14",
                            cta1: "65c54ed1-3464-4a31-bb9c-d0aaefb33bfe",
                            cta2: "0a6730e2-c863-4fea-8ed7-b9944641304e",
                        },
                        {
                            name: "5fc70a88-5ac0-4369-991c-354a4d48deed",
                            address: "3534a1d3-4422-4446-8489-05c211592c14",
                            cta1: "65c54ed1-3464-4a31-bb9c-d0aaefb33bfe",
                            cta2: "0a6730e2-c863-4fea-8ed7-b9944641304e",
                        },
                        {
                            name: "5fc70a88-5ac0-4369-991c-354a4d48deed",
                            address: "3534a1d3-4422-4446-8489-05c211592c14",
                            cta1: "65c54ed1-3464-4a31-bb9c-d0aaefb33bfe",
                            cta2: "0a6730e2-c863-4fea-8ed7-b9944641304e",
                        },
                    ]}
                    itemBuilder={(item, itemIndex) => (
                        <div
                            className="tw-grid tw-grid-rows-[minmax(0,2fr)_1.5rem_minmax(0,1fr)] lg-bg-secondary-100 tw-rounded-lg tw-px-6 tw-pt-4 tw-pb-2"
                            key={itemIndex}
                        >
                            <div className="tw-row-start-1 tw-col-start-1 ">
                                <div className="lg-text-title2">{getVernacularString(item.name, userPreferences.language)}</div>
                                <div
                                    className="lg-text-body"
                                    dangerouslySetInnerHTML={{__html: getVernacularString(item.address, userPreferences.language)}}
                                ></div>
                            </div>
                            <div className="tw-grid tw-grid-cols-2 tw-pb-4 tw-gap-6 tw-row-start-3">
                                <div className="lg-cta-button tw-grid tw-px-0 tw-py-2 tw-max-w-[8.6rem] tw-justify-center tw-items-center">
                                    {getVernacularString(item.cta1, userPreferences.language)}
                                </div>
                                <div className="lg-cta-outline-button tw-px-0 tw-py-2 tw-max-w-[8.6rem] tw-grid tw-justify-center tw-items-center">
                                    {getVernacularString(item.cta2, userPreferences.language)}
                                </div>
                            </div>
                        </div>
                    )}
                />
            </div>
        </div>
    );
}

function AwarenessPrograms({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const items = [
        {
            Image: "/livguard/e-waste-management/7/1.png",
        },
        {
            Image: "/livguard/e-waste-management/7/2.png",
        },
        {
            Image: "/livguard/e-waste-management/7/3.png",
        },
        {
            Image: "/livguard/e-waste-management/7/1.png",
        },
        {
            Image: "/livguard/e-waste-management/7/2.png",
        },
        {
            Image: "/livguard/e-waste-management/7/3.png",
        },
        {
            Image: "/livguard/e-waste-management/7/1.png",
        },
        {
            Image: "/livguard/e-waste-management/7/2.png",
        },
        {
            Image: "/livguard/e-waste-management/7/3.png",
        },
    ];
    return (
        <div className={concatenateNonNullStringsWithSpaces("", className)}>
            <div className="lg-text-headline tw-text-center">{getVernacularString("6c5422c4-c98a-4035-9e9d-7977366e50f3", userPreferences.language)}</div>
            <div className="lg-text-body tw-text-center">{getVernacularString("1eaa68c5-42b8-497e-bf30-220999dcc61a", userPreferences.language)}</div>
            <VerticalSpacer className="tw-h-6" />
            <CarouselStyle4
                chevronButtonsDivisionFactor={3}
                items={items.map((item, itemIndex) => {
                    return (
                        <div
                            className=""
                            key={itemIndex}
                        >
                            <FullWidthImage
                                relativePath={item.Image}
                                className="tw-rounded-lg tw-max-w-[31rem]"
                            />
                        </div>
                    );
                })}
                slidesContainerClassName="tw-auto-cols-[100%] lg:tw-auto-cols-[25%] 2xl:tw-auto-cols-[10%]"
                controlsContainerClassName="!tw-justify-center !tw-gap-x-4"
            />
        </div>
    );
}

export function HappyUser({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const testimonialss = [
        {
            svgIcone: "/livguard/e-waste-management/8/testominal1.png",
            name: `${getVernacularString("review1Name", userPreferences.language)}`,
            rating: 5,
            state: `${getVernacularString("review1State", userPreferences.language)}`,
            message: `${getVernacularString("review1Message", userPreferences.language)}`,
            productImage: "/livguard/products/jodis/peace-of-mind-jodi/thumbnail.png",
            productName: `${getVernacularString("review1ProductName", userPreferences.language)}`,
        },
        {
            svgIcone: "/livguard/e-waste-management/8/testominal1.png",
            name: `${getVernacularString("review2Name", userPreferences.language)}`,
            rating: 5,
            state: `${getVernacularString("review2State", userPreferences.language)}`,
            message: `${getVernacularString("review2Message", userPreferences.language)}`,
            productImage: "/livguard/products/jodis/urban-jodi/thumbnail.png",
            productName: `${getVernacularString("review2ProductName", userPreferences.language)}`,
        },
        {
            svgIcone: "/livguard/e-waste-management/8/testominal1.png",
            name: `${getVernacularString("review3Name", userPreferences.language)}`,
            rating: 5,
            state: `${getVernacularString("review3State", userPreferences.language)}`,
            message: `${getVernacularString("review3Message", userPreferences.language)}`,
            productImage: "/livguard/products/inverters/lgs1100i/thumbnail.png",
            productName: `${getVernacularString("review3ProductName", userPreferences.language)}`,
        },
        {
            svgIcone: "/livguard/e-waste-management/8/testominal1.png",
            name: `${getVernacularString("review4Name", userPreferences.language)}`,
            rating: 4,
            state: `${getVernacularString("review4State", userPreferences.language)}`,
            message: `${getVernacularString("review4Message", userPreferences.language)}`,
            productImage: "/livguard/products/jodis/urban-jodi/thumbnail.png",
            productName: `${getVernacularString("review4ProductName", userPreferences.language)}`,
        },
        {
            svgIcone: "/livguard/e-waste-management/8/testominal1.png",
            name: `${getVernacularString("review1Name", userPreferences.language)}`,
            rating: 5,
            state: `${getVernacularString("review1State", userPreferences.language)}`,
            message: `${getVernacularString("review1Message", userPreferences.language)}`,
            productImage: "/livguard/products/jodis/peace-of-mind-jodi/thumbnail.png",
            productName: `${getVernacularString("review1ProductName", userPreferences.language)}`,
        },
        {
            svgIcone: "/livguard/e-waste-management/8/testominal1.png",
            name: `${getVernacularString("review2Name", userPreferences.language)}`,
            rating: 5,
            state: `${getVernacularString("review2State", userPreferences.language)}`,
            message: `${getVernacularString("review2Message", userPreferences.language)}`,
            productImage: "/livguard/products/jodis/urban-jodi/thumbnail.png",
            productName: `${getVernacularString("review2ProductName", userPreferences.language)}`,
        },
        {
            svgIcone: "/livguard/e-waste-management/8/testominal1.png",
            name: `${getVernacularString("review3Name", userPreferences.language)}`,
            rating: 5,
            state: `${getVernacularString("review3State", userPreferences.language)}`,
            message: `${getVernacularString("review3Message", userPreferences.language)}`,
            productImage: "/livguard/products/inverters/lgs1100i/thumbnail.png",
            productName: `${getVernacularString("review3ProductName", userPreferences.language)}`,
        },
        {
            svgIcone: "/livguard/e-waste-management/8/testominal1.png",
            name: `${getVernacularString("review4Name", userPreferences.language)}`,
            rating: 4,
            state: `${getVernacularString("review4State", userPreferences.language)}`,
            message: `${getVernacularString("review4Message", userPreferences.language)}`,
            productImage: "/livguard/products/jodis/urban-jodi/thumbnail.png",
            productName: `${getVernacularString("review4ProductName", userPreferences.language)}`,
        },
        {
            svgIcone: "/livguard/e-waste-management/8/testominal1.png",
            name: `${getVernacularString("review4Name", userPreferences.language)}`,
            rating: 4,
            state: `${getVernacularString("review4State", userPreferences.language)}`,
            message: `${getVernacularString("review4Message", userPreferences.language)}`,
            productImage: "/livguard/products/jodis/urban-jodi/thumbnail.png",
            productName: `${getVernacularString("review4ProductName", userPreferences.language)}`,
        },
    ];
    return (
        <div className={className}>
            <div className="lg-text-headline tw-text-center">
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("eba7b1df-230e-4a24-9af0-03d357c63bd7", userPreferences.language)}} />
                </DefaultTextAnimation>
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("95604516-fdf0-40f3-b168-2e5c2d7dd976", userPreferences.language)}} />
                </DefaultTextAnimation>
            </div>

            <VerticalSpacer className="tw-h-8" />
            <CarouselStyle4
                chevronButtonsDivisionFactor={3}
                items={testimonialss.map((testimonials, testimonialsIndex) => {
                    return (
                        <div
                            className="tw-h-full tw-max-w-[21rem]"
                            key={testimonialsIndex}
                        >
                            <div className="tw-grid tw-grid-cols-[minmax(0,3fr),minmax(0,1fr)] tw-grid-rows-[auto,auto,minmax(0,1fr)] tw-p-3 tw-pt-5 tw-gap-x-2 tw-gap-y-2 tw-justify-center tw-items-start lg-bg-secondary-100 tw-rounded-lg tw-h-full !tw-w-max-[20rem]">
                                <div className="tw-col-start-1 tw-row-start-2 tw-flex tw-flex-col tw-gap-1 tw-justify-start">
                                    <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-8">
                                        <img
                                            src={getAbsolutePathForRelativePath(getMetadataForImage(testimonials.svgIcone).finalUrl, ImageCdnProvider.Bunny, null, null)}
                                            className={concatenateNonNullStringsWithSpaces("")}
                                        />
                                        <div className="">
                                            <div className="lg-text-title1">{testimonials.name}</div>
                                            <div className="lg-text-body-bold">{testimonials.state}</div>
                                            <div className="tw-flex tw-flex-row tw-gap-[2px] ">
                                                <ItemBuilder
                                                    items={getIntegerArrayOfLength(5)}
                                                    itemBuilder={(_, itemIndex) => (
                                                        <StarFill
                                                            className={concatenateNonNullStringsWithSpaces(
                                                                "tw-w-4 tw-h-4",
                                                                itemIndex < testimonials.rating ? "lg-text-primary-500" : "lg-text-secondary-100",
                                                            )}
                                                            key={itemIndex}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="tw-col-start-2 tw-row-start-2 tw-justify-end tw-flex">
                                    <FixedWidthImage
                                        relativePath={testimonials.productImage}
                                        width="100px"
                                    />
                                </div>

                                <div className="tw-col-start-1 tw-col-span-full tw-row-start-3 tw-h-full tw-w-full ">
                                    <div className="lg-text-body tw-text-left tw-flex-1">{testimonials.message}</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
                slidesContainerClassName="lg:!tw-auto-cols-[29%] !tw-auto-cols-[100%] md:!tw-auto-cols-[50%] !tw-gap-0"
                controlsContainerClassName="!tw-justify-center !tw-gap-x-4"
            />
        </div>
    );
}

export function FaqQuestion({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const faqs = [
        {
            question: "3f4e8b92-f79d-4e48-b731-98c0652e3ba0",
            answer: "homeS9Q1A",
        },
        {
            question: "6adb43d6-0333-4b19-877e-4bfd6862d595",
            answer: "homeS9Q2A",
        },
        {
            question: "54bb62a0-38db-41ae-b7ab-d543f4b639f6",
            answer: "homeS9Q3A",
        },
        {
            question: "188b174f-1232-4d35-9e61-c94f248a9b67",
            answer: "homeS9Q4A",
        },
        {
            question: "4d08f061-a98a-4a15-8737-0c9c43a57fc3",
            answer: "homeS9Q5A",
        },
    ];

    return (
        <FaqSectionInternal
            faqs={faqs}
            userPreferences={userPreferences}
            className={className}
        />
    );
}
