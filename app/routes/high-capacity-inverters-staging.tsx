import {LoaderFunction} from "@remix-run/node";
import {Link, useLoaderData} from "@remix-run/react";
import {useResizeDetector} from "react-resize-detector";
import {Facebook, Instagram, Linkedin, Twitter, Youtube} from "react-bootstrap-icons";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {CoverImage} from "~/components/images/coverImage";
import {PageScaffold} from "~/components/pageScaffold";
import {FaqSectionInternal} from "~/components/faqs";
import {EmbeddedYoutubeVideo} from "~/components/embeddedYoutubeVideo";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import {Theme, UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";
import {getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {CarouselStyle5} from "~/components/carouselStyle5";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {CarouselStyle3} from "~/components/carouselStyle3";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ImageCdnProvider} from "~/global-common-typescript/typeDefinitions";
import {StickyBottomBar} from "~/components/bottomBar";
import {FixedWidthImage} from "~/components/images/fixedWidthImage";
import {allProductDetails} from "~/productData";
import {useState} from "react";
import {ProductAndCategoryBottomBar} from "~/components/productAndCategoryBottomBar";

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
                breadcrumbs={[]}
            >
                <HKVAPage userPreferences={userPreferences} />
            </PageScaffold>

            <ProductAndCategoryBottomBar
                userPreferences={userPreferences}
                utmParameters={utmSearchParameters}
                pageUrl={pageUrl}
            />
        </>
    );
};

function HKVAPage({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <>
            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-x-16 tw-items-start tw-justify-center">
                <HeroSection
                    userPreferences={userPreferences}
                    className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
                />

                <VerticalSpacer className="tw-h-10 tw-row-start-2 tw-col-start-1 lg:tw-col-span-full" />

                <ExperienceHighPower
                    userPreferences={userPreferences}
                    className="tw-row-start-3 tw-col-start-1 lg-px-screen-edge-2 lg:tw-px-0 tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-4 tw-col-start-1 lg:tw-col-span-full" />

                <ChooseYourInverter
                    userPreferences={userPreferences}
                    className="tw-row-start-5 tw-col-start-1 lg:tw-col-span-full"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-6 tw-col-start-1 lg:tw-col-span-full" />

                <PowerhouseInverters
                    userPreferences={userPreferences}
                    className="tw-row-start-7 tw-col-start-1 lg:tw-col-span-full tw-w-full"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-8 tw-col-start-1 lg:tw-col-span-full" />

                <PowerUpWithHighCapacityInverters
                    userPreferences={userPreferences}
                    className="tw-row-start-9 lg:tw-col-span-full tw-w-full tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-10 tw-col-start-1 lg:tw-col-span-full" />

                <div className="tw-row-start-11 tw-grid lg:tw-grid-cols-[minmax(0,1fr)_minmax(0,2fr)] tw-col-span-full lg:lg-px-screen-edge-2 tw-gap-x-5 tw-max-w-7xl tw-mx-auto">
                    <WeAreEverywhere
                        userPreferences={userPreferences}
                        className="tw-row-start-5 lg:tw-col-start-1 lg:tw-h-full"
                        showCtaButton={true}
                    />

                    <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-6 lg:tw-col-start-1 lg:tw-col-span-full lg:tw-hidden" />

                    <YourGuideToFindingTheRightInverter
                        userPreferences={userPreferences}
                        className="tw-row-start-7 lg:tw-row-start-5 lg:tw-col-start-2"
                    />
                </div>

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[12] tw-col-start-1 lg:tw-col-span-full" />

                <FaqSection
                    userPreferences={userPreferences}
                    className="tw-row-start-[13] lg:tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px] tw-max-w-7xl"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[14] tw-col-start-1 lg:tw-col-span-full" />

                <SocialHandles
                    userPreferences={userPreferences}
                    heading={{text1: "b0a3aa40-4b00-4bdd-88e0-67085fafa92b", text2: `c0f802cc-902b-4328-b631-a3fad8fc7d18`}}
                    className="tw-row-start-[15] tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px] tw-gap-[1rem] tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[16] tw-col-start-1 lg:tw-col-span-full" />
            </div>
        </>
    );
}

function HeroSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height)-9.5rem)] lg:tw-h-[70vh] tw-grid tw-grid-rows-[minmax(0,1fr)_repeat(3,auto)_minmax(0,1fr)] lg:tw-grid-rows-[minmax(0,1fr)_repeat(3,auto)_minmax(0,1fr)] tw-text-center lg:tw-text-left lg:tw-grid-cols-2",
                className,
            )}
            ref={ref}
        >
            <div className="tw-row-start-1 tw-col-start-1 tw-row-span-full tw-col-span-full tw-h-full tw-w-full tw-relative">
                {containerWidth == null || containerHeight == null ? null : (
                    <>
                        <CoverImage
                            relativePath={containerHeight > containerWidth || containerWidth < 1024 ? "/livguard/hkva/1/banner-mobile.jpg" : "/livguard/hkva/1/banner-desktop.jpg"}
                            key={containerHeight > containerWidth || containerWidth < 1024 ? "/livguard/hkva/1/banner-mobile.jpg" : "/livguard/hkva/1/banner-desktop.jpg"}
                        />

                        <img
                            src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/hkva/1/products.png").finalUrl, ImageCdnProvider.Bunny, null, null)}
                            alt="Batteries"
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-absolute ",
                                containerWidth < 1024 ? "tw-bottom-2 tw-inset-x-0 tw-mx-auto tw-h-1/4" : "tw-bottom-2 tw-left-[1.5rem] lg:tw-left-[4.5rem] xl:tw-left-[7.5rem] tw-h-1/3",
                            )}
                        />
                    </>
                )}
            </div>

            <DefaultTextAnimation className="tw-row-start-2 tw-col-start-1 lg-px-screen-edge-2">
                <div className="lg-text-banner tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">
                    {getVernacularString("1333b617-c9a4-4b8c-b6ae-652d2b17c58b", userPreferences.language)}
                </div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-3 tw-col-start-1 lg-px-screen-edge-2">
                <div className="lg-text-banner tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">
                    {getVernacularString("f7ab7eb5-83ec-4ced-b179-c9ad29f8673e", userPreferences.language)}
                </div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-4 tw-col-start-1 lg-px-screen-edge-2">
                <div className="lg-text-body !tw-text-secondary-900-dark">{getVernacularString("6576ec8d-6a69-482e-b4e9-9f11b9b01dfd", userPreferences.language)}</div>
            </DefaultTextAnimation>
        </div>
    );
}

function ExperienceHighPower({userPreferences, className}: {userPreferences: UserPreferences; className: string}) {
    const InverterUSPCard = ({title, description, imageRelativePath}: {title: string; description: string; imageRelativePath: string}) => {
        return (
            <div
                className={concatenateNonNullStringsWithSpaces(
                    "tw-place-self-center tw-grid tw-grid-rows-[1rem_auto_1rem_auto_1rem_auto_minmax(1rem,1fr)] tw-cols-[auto] tw-w-full tw-h-full tw-px-4 tw-py-4 lg-bg-secondary-100 tw-rounded-lg",
                )}
            >
                <div className="tw-row-start-2">
                    <FullWidthImage relativePath={imageRelativePath} />
                </div>

                <div className="tw-row-start-4 tw-text-center lg-text-title1">{title}</div>

                <div className="tw-row-start-6 tw-text-center lg-text-body">{description}</div>
            </div>
        );
    };

    const invertersData: Array<{titleTextContentPiece: string; bodyTextContentPiece: string; imageRelativePath: string}> = [
        {
            titleTextContentPiece: "ceb40b2c-64aa-4279-a44b-88fdfa0f6940",
            bodyTextContentPiece: "82a58556-3b79-42da-99fa-fb37bf75fc76",
            imageRelativePath: "/livguard/hkva/2/2.2.png",
        },
        {
            titleTextContentPiece: "bdf346b3-6536-4eb0-bf84-833185c53ec6",
            bodyTextContentPiece: "312aecd5-8481-4cad-867d-70f3cca7a78c",
            imageRelativePath: "/livguard/hkva/2/2.3.png",
        },
        {
            titleTextContentPiece: "9b22fdf1-dec8-48c8-9710-f0d8ac89b7d9",
            bodyTextContentPiece: "6aa6f045-8ba1-4157-a838-c794bc015eba",
            imageRelativePath: "/livguard/hkva/2/2.2.png",
        },
        {
            titleTextContentPiece: "bfc88889-a1cb-4fc0-9823-aa2596efdde8",
            bodyTextContentPiece: "6a0ce82e-1378-4cfd-a26f-83152e0ec09a",
            imageRelativePath: "/livguard/hkva/2/2.3.png",
        },
        {
            titleTextContentPiece: "ceb40b2c-64aa-4279-a44b-88fdfa0f6940",
            bodyTextContentPiece: "82a58556-3b79-42da-99fa-fb37bf75fc76",
            imageRelativePath: "/livguard/hkva/2/2.2.png",
        },
        {
            titleTextContentPiece: "bdf346b3-6536-4eb0-bf84-833185c53ec6",
            bodyTextContentPiece: "312aecd5-8481-4cad-867d-70f3cca7a78c",
            imageRelativePath: "/livguard/hkva/2/2.3.png",
        },
        {
            titleTextContentPiece: "9b22fdf1-dec8-48c8-9710-f0d8ac89b7d9",
            bodyTextContentPiece: "6aa6f045-8ba1-4157-a838-c794bc015eba",
            imageRelativePath: "/livguard/hkva/2/2.2.png",
        },
        {
            titleTextContentPiece: "bfc88889-a1cb-4fc0-9823-aa2596efdde8",
            bodyTextContentPiece: "6a0ce82e-1378-4cfd-a26f-83152e0ec09a",
            imageRelativePath: "/livguard/hkva/2/2.3.png",
        },
    ];

    return (
        <>
            <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg:tw-col-span-full", className)}>
                <DefaultTextAnimation className="tw-flex tw-flex-col tw-items-center lg-text-headline lg:lg-px-screen-edge-2 lg:tw-pl-0 lg:tw-pr-0 tw-text-center lg:tw-text-left">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("eaa6ffa9-a509-4be1-8f5e-93a008f86aaf", userPreferences.language)}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("354321fa-4e5e-4cc5-80a4-07a320dfe654", userPreferences.language)}} />
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-4 lg:tw-h-8" />

                <CarouselStyle5
                    items={invertersData.map((batteryData, batteryDataIndex) => (
                        <InverterUSPCard
                            title={getVernacularString(batteryData.titleTextContentPiece, userPreferences.language)}
                            description={getVernacularString(batteryData.bodyTextContentPiece, userPreferences.language)}
                            imageRelativePath={batteryData.imageRelativePath}
                            key={batteryDataIndex}
                        />
                    ))}
                    className="tw-mx-auto"
                    deselectedContainersClassName="tw-scale-[0.9] tw-h-full"
                    selectedContainerClassName="tw-h-full"
                />
            </div>
        </>
    );
}

function ChooseYourInverter({userPreferences, className}: {userPreferences: UserPreferences; className: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-flex tw-flex-col lg:tw-items-center lg:tw-justify-cente", className)}>
            <h2 className="lg-text-screen-edge lg-text-headline tw-text-center">
                <div dangerouslySetInnerHTML={{__html: getVernacularString("b3b052f7-ef5b-43d1-b426-279e9c05ca84", userPreferences.language)}} />
                <div dangerouslySetInnerHTML={{__html: getVernacularString("354448cd-c3be-4427-b3a5-c3f5cf7afaf9", userPreferences.language)}} />
            </h2>

            <VerticalSpacer className="lg:tw-h-[6.5rem]" />

            <ChooseYourInverterInternal userPreferences={userPreferences} />
        </div>
    );
}

function ChooseYourInverterInternal({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="md:tw-flex md:tw-justify-center">
            <div className="lg-px-screen-edge tw-grid tw-grid-rows-[7.5rem_repeat(7,auto)] lg:tw-grid-rows-[7.5rem_repeat(7,auto)] tw-grid-cols-[4.5rem_14rem_14rem] tw-overflow-x-scroll tw-overflow-y-visible [@media(min-width:55rem)]:tw-overflow-visible md:tw-grid-cols-[4.5rem_22rem_22rem] tw-gap-x-2 tw-pt-20 lg:tw-pt-0">
                <div className="tw-row-start-1 tw-col-start-2 tw-row-span-full tw-w-full tw-h-full tw-py-3 lg-bg-secondary-100 tw-rounded-lg" />

                <div className="tw-row-start-1 tw-col-start-3 tw-row-span-full tw-w-full tw-h-full tw-py-3 lg-bg-secondary-300 tw-rounded-lg" />

                <div className="tw-row-start-1 tw-col-start-2 tw-px-5 tw-relative tw-bottom-1/2">
                    <div className="tw-flex tw-justify-center tw-items-center tw-rounded-full tw-bg-[#D9D9D9] tw-w-fit tw-aspect-square tw-mx-auto">
                        <FixedWidthImage
                            relativePath="/livguard/hkva/3/3.2.png"
                            width="10rem"
                        />
                    </div>
                </div>

                <div className="tw-row-start-1 tw-col-start-3 tw-px-5 tw-relative tw-bottom-1/2">
                    <div className="tw-flex tw-justify-center tw-items-center tw-rounded-full tw-bg-[#D9D9D9] tw-w-fit tw-aspect-square tw-mx-auto">
                        <FixedWidthImage
                            relativePath="/livguard/hkva/3/3.2.png"
                            width="10rem"
                        />
                    </div>
                </div>

                <div className="tw-row-start-2 tw-col-start-2 tw-px-4 lg-text-title2 tw-pb-3 tw-text-center">
                    {getVernacularString("0bcd7c25-b650-4085-990b-36795b06c1f5", userPreferences.language)}
                </div>

                <div className="tw-row-start-2 tw-col-start-3 tw-px-4 lg-text-title2 tw-pb-3 tw-text-center">
                    {getVernacularString("7618d425-96b8-4402-9ffb-50f4a69efbf9", userPreferences.language)}
                </div>

                <div className="tw-row-start-3 tw-col-start-1 tw-mr-2 tw-py-3 lg-text-icon tw-border-solid tw-border-b lg-border-secondary-900 tw-border-opacity-50 lg-text-secondary">
                    {getVernacularString("1685c892-2604-467b-835b-751154288554", userPreferences.language)}
                </div>

                <div className="tw-row-start-3 tw-col-start-2 tw-mx-4 tw-py-3 tw-text-center tw-border-solid tw-border-b lg-border-secondary-300 tw-border-opacity-50">
                    {getVernacularString("1e7e9b6c-9b4b-43c9-876c-3b1eb84c555f", userPreferences.language)}
                </div>

                <div className="tw-row-start-3 tw-col-start-3 tw-mx-4 tw-py-3 tw-text-center tw-border-solid tw-border-b lg-border-hkva-table tw-border-opacity-50">
                    {getVernacularString("a5350102-acd3-4024-a3ef-bcf478522fbb", userPreferences.language)}
                </div>

                <div className="tw-row-start-4 tw-col-start-1 tw-mr-2 tw-py-3 lg-text-icon tw-border-solid tw-border-b lg-border-secondary-900 tw-border-opacity-50 text-secondary">
                    {getVernacularString("a331300e-7f4f-4937-b652-be74e52427fa", userPreferences.language)}
                </div>

                <div className="tw-row-start-4 tw-col-start-2 tw-mx-4 tw-py-3 tw-text-center tw-border-solid tw-border-b lg-border-secondary-300 tw-border-opacity-50">
                    {getVernacularString("86034731-4b04-4172-8ba3-bc4f6ba538a7", userPreferences.language)}
                </div>

                <div className="tw-row-start-4 tw-col-start-3 tw-mx-4 tw-py-3 tw-text-center tw-border-solid tw-border-b lg-border-hkva-table tw-border-opacity-50">
                    {getVernacularString("45f25658-b0ea-4f47-aee0-99769c6be404", userPreferences.language)}
                </div>

                <div className="tw-row-start-5 tw-col-start-1 tw-mr-2 tw-py-3 tw-pb-8 lg-text-icon lg-text-secondary-900 tw-border-solid tw-border-b lg-border-secondary-900 tw-border-opacity-50 text-secondary">
                    {getVernacularString("72d5d1e9-8be5-4207-8b96-24ca298341ec", userPreferences.language)}
                </div>

                <div className="tw-row-start-5 tw-col-start-2 tw-mx-4 tw-py-3 tw-pb-8 tw-text-center tw-border-solid tw-border-b lg-border-secondary-300 tw-border-opacity-50">
                    {getVernacularString("3e617d69-c451-401f-aba2-40937134cee3", userPreferences.language)}
                </div>

                <div className="tw-row-start-5 tw-col-start-3 tw-mx-4 tw-py-3 tw-pb-8 tw-text-center tw-border-solid tw-border-b lg-border-hkva-table tw-border-opacity-50">
                    {getVernacularString("d293fd91-73a4-4cb9-94b1-fa261e25f284", userPreferences.language)}
                </div>

                <div className="tw-row-start-6 tw-col-start-1 tw-mr-2 tw-py-3 tw-pb-8 lg-text-icon lg-text-secondary-900">
                    {getVernacularString("2ae8f286-2ead-4d34-9c10-b28b49c90149", userPreferences.language)}
                </div>

                <div className="tw-row-start-6 tw-col-start-2 tw-mx-4 tw-py-3 tw-pb-8 tw-text-center">{getVernacularString("32461cc4-3f7b-403d-b4f3-b4b413c39c59", userPreferences.language)}</div>

                <div className="tw-row-start-6 tw-col-start-3 tw-mx-4 tw-py-3 tw-pb-8 tw-text-center">{getVernacularString("f1a96b7a-bb14-4c20-803a-81373f0195fc", userPreferences.language)}</div>
            </div>
        </div>
    );
}

function PowerhouseInverters({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const inverters = [
        allProductDetails["lg2350ixl"][userPreferences.language],
        allProductDetails["lgs2500"][userPreferences.language],
        allProductDetails["lgs3000"][userPreferences.language],
        allProductDetails["lg3500"][userPreferences.language],
        allProductDetails["lgs4000"][userPreferences.language],
        allProductDetails["lgs5000"][userPreferences.language],
    ];
    const inverterData = [
        {
            inverterSlug: "lg2350ixl",
            imageRelativeUrl: "/livguard/products/inverters/lg2350ixl/thumbnail.png",
            name: inverters[0].title,
            description: inverters[0].description,
            warranty: inverters[0].specifications[1].value,
            capacity: inverters[0].specifications[2].value,
            technology: inverters[0].specifications[3].value,
            dimensions: inverters[0].specifications[4].value,
        },
        {
            inverterSlug: "lgs2500",
            imageRelativeUrl: "/livguard/products/inverters/lgs2500/thumbnail.png",
            name: inverters[1].title,
            description: inverters[1].description,
            warranty: inverters[1].specifications[1].value,
            capacity: inverters[1].specifications[2].value,
            technology: inverters[1].specifications[3].value,
            dimensions: inverters[1].specifications[4].value,
        },
        {
            inverterSlug: "lgs3000",
            imageRelativeUrl: "/livguard/products/inverters/lgs3000/thumbnail.png",
            name: inverters[2].title,
            description: inverters[2].description,
            warranty: inverters[2].specifications[1].value,
            capacity: inverters[2].specifications[2].value,
            technology: inverters[2].specifications[3].value,
            dimensions: inverters[2].specifications[4].value,
        },
        {
            inverterSlug: "lg3500",
            imageRelativeUrl: "/livguard/products/inverters/lg3500/thumbnail.png",
            name: inverters[3].title,
            description: inverters[3].description,
            warranty: inverters[3].specifications[1].value,
            capacity: inverters[3].specifications[2].value,
            technology: inverters[3].specifications[3].value,
            dimensions: inverters[3].specifications[4].value,
        },
        {
            inverterSlug: "lgs4000",
            imageRelativeUrl: "/livguard/products/inverters/lgs4000/thumbnail.png",
            name: inverters[4].title,
            description: inverters[4].description,
            warranty: inverters[4].specifications[1].value,
            capacity: inverters[4].specifications[2].value,
            technology: inverters[4].specifications[3].value,
            dimensions: inverters[4].specifications[4].value,
        },
        {
            inverterSlug: "lgs5000",
            imageRelativeUrl: "/livguard/products/inverters/lgs5000/thumbnail.png",
            name: inverters[5].title,
            description: inverters[5].description,
            warranty: inverters[5].specifications[1].value,
            capacity: inverters[5].specifications[2].value,
            technology: inverters[5].specifications[3].value,
            dimensions: inverters[5].specifications[4].value,
        },
    ];

    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full tw-grid tw-grid-flow-row lg-bg-our-suggestions tw-rounded-lg", className)}>
            <VerticalSpacer className="tw-h-6 lg:tw-h-10" />

            <div
                className="lg-text-headline tw-place-self-center"
                dangerouslySetInnerHTML={{__html: getVernacularString("32366348-8f4d-4253-959f-f9b586c26b25", userPreferences.language)}}
            />
            <div className="lg-text-headline tw-place-self-center">{getVernacularString("33d1aa29-9949-4a28-92f3-4c27ce30d244", userPreferences.language)}</div>

            <VerticalSpacer className="tw-h-4 lg:tw-h-6" />

            <CarouselStyle5
                // @ts-ignore
                items={inverterData.map((inverter, inverterIndex) => {
                    return (
                        <InverterCard
                            userPreferences={userPreferences}
                            inverterSlug={inverter.inverterSlug}
                            imageRelativeUrl={inverter.imageRelativeUrl}
                            name={inverter.name}
                            description={inverter.description}
                            warranty={inverter.warranty}
                            capacity={inverter.capacity}
                            technology={inverter.technology}
                            dimensions={inverter.dimensions}
                            key={inverterIndex}
                        />
                    );
                })}
                slidesContainerClassName="!tw-auto-cols-[100%] lg:!tw-auto-cols-max tw-place-self-center tw-items-center"
                selectedContainerClassName="tw-h-full"
                deselectedContainersClassName="tw-scale-[0.9] tw-h-full"
            />

            <VerticalSpacer className="tw-h-4 lg:tw-h-10" />
        </div>
    );
}

function InverterCard({
    userPreferences,
    inverterSlug,
    imageRelativeUrl,
    name,
    description,
    warranty,
    capacity,
    technology,
    dimensions,
}: {
    userPreferences: UserPreferences;
    inverterSlug: string;
    imageRelativeUrl: string;
    name: string;
    description: string;
    warranty: string;
    capacity: string;
    technology: string;
    dimensions: string;
}) {
    return (
        <div className="tw-max-w-3xl tw-mx-auto tw-grid tw-grid-cols-1 lg:tw-grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:tw-gap-x-2 lg-bg-our-suggestions-card tw-rounded-lg tw-px-4 tw-py-3 lg:tw-py-6 lg:tw-px-8">
            <div className="tw-col-start-1 tw-grid tw-grid-flow-row tw-place-items-center">
                <div className="lg:tw-hidden tw-bg-[#c5c5c5] dark:tw-bg-[#3a3a3a] tw-p-2">{getVernacularString("7854d25c-c385-49b5-b1e5-e1127f1d1e5d", userPreferences.language)}</div>
                <div>
                    <FullWidthImage relativePath={imageRelativeUrl} />
                </div>

                <Link
                    className="tw-hidden lg:tw-block"
                    to={`/product/${inverterSlug}`}
                >
                    <button className="lg-cta-button">{getVernacularString("dd68b98c-5aa6-4f3f-824e-056ffa6ae4ee", userPreferences.language)}</button>
                </Link>
            </div>

            <div className="tw-col-start-1 lg:tw-col-start-2 tw-grid tw-grid-flow-row">
                <div className="lg-text-title1 tw-text-center lg:tw-text-left">{name}</div>

                <VerticalSpacer className="tw-h-2" />

                <div className="lg-text-body tw-text-center lg:tw-text-left">{description}</div>

                <VerticalSpacer className="tw-h-4" />

                <div className="tw-grid tw-grid-rows-[auto_auto_minmax(0,1fr)] md:max-lg:tw-grid-cols-1 md:max-lg:tw-grid-flow-row md:max-lg:tw-place-items-center md:max-lg:tw-place-self-center md:max-lg:tw-w-fit tw-grid-cols-2 tw-gap-x-4 tw-gap-y-8">
                    <div className="tw-row-start-1 tw-col-start-1 md:max-lg:tw-w-full tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2 lg:tw-place-self-start">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/hkva/4/4.warranty-icon.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{getVernacularString("be198f94-415e-4384-87d4-3887e8cd8a2c", userPreferences.language)}</div>
                            <div className="tw-row-start-3">{warranty}</div>
                        </div>
                    </div>

                    <div className="tw-row-start-1 tw-col-start-2 md:max-lg:tw-w-full md:max-lg:tw-row-start-2 md:max-lg:tw-col-start-1 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/hkva/4/4.capacity-icon.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{getVernacularString("7ee64780-1190-49dc-a305-0f6e9551e8aa", userPreferences.language)}</div>
                            <div className="tw-row-start-3">{capacity}</div>
                        </div>
                    </div>

                    <div className="tw-row-start-2 tw-col-start-1 md:max-lg:tw-w-full md:max-lg:tw-row-start-3 md:max-lg:tw-col-start-1 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/hkva/4/4.grid-icon.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{getVernacularString("94ba8c21-8088-4d61-a674-4f9d4ec28744", userPreferences.language)}</div>
                            <div className="tw-row-start-3">{technology}</div>
                        </div>
                    </div>

                    <div className="tw-row-start-2 tw-col-start-2 md:max-lg:tw-w-full md:max-lg:tw-row-start-4 md:max-lg:tw-col-start-1 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/hkva/4/4.dimensions.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{getVernacularString("781a0678-8e4b-4543-bda3-c80a5cf30176", userPreferences.language)}</div>
                            <div className="tw-row-start-3">{dimensions}</div>
                        </div>
                    </div>
                </div>

                <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

                <Link
                    className="tw-place-self-center lg:tw-hidden"
                    to={inverterSlug}
                >
                    <button className="lg-cta-button">{getVernacularString("dd68b98c-5aa6-4f3f-824e-056ffa6ae4ee", userPreferences.language)}</button>
                </Link>

                <VerticalSpacer className="tw-h-4 lg:tw-hidden" />
            </div>
        </div>
    );
}

function PowerUpWithHighCapacityInverters({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const inverters = [
        allProductDetails["lg2350ixl"][userPreferences.language],
        allProductDetails["lgs2500"][userPreferences.language],
        allProductDetails["lgs3000"][userPreferences.language],
        allProductDetails["lg3500"][userPreferences.language],
        allProductDetails["lgs4000"][userPreferences.language],
        allProductDetails["lgs5000"][userPreferences.language],
    ];

    const featuredProducts = [
        {
            name: inverters[0].title,
            slug: "lg2350ixl",
            capacity: inverters[0].productIcons[1].text,
            warranty: inverters[0].specifications[1].value,
            price: "XXXXX",
            imageRelativeUrl: "/livguard/products/inverters/lg2350ixl/thumbnail.png",
        },
        {
            name: inverters[1].title,
            slug: "lgs2500",
            capacity: inverters[1].productIcons[1].text,
            warranty: inverters[1].specifications[1].value,
            price: "XXXXX",
            imageRelativeUrl: "/livguard/products/inverters/lgs2500/thumbnail.png",
        },
        {
            name: inverters[2].title,
            slug: "lgs3000",
            capacity: inverters[2].productIcons[1].text,
            warranty: inverters[2].specifications[1].value,
            price: "XXXXX",
            imageRelativeUrl: "/livguard/products/inverters/lgs3000/thumbnail.png",
        },
        {
            name: inverters[3].title,
            slug: "lg3500",
            capacity: inverters[3].productIcons[1].text,
            warranty: inverters[3].specifications[1].value,
            price: "XXXXX",
            imageRelativeUrl: "/livguard/products/inverters/lg3500/thumbnail.png",
        },
        {
            name: inverters[4].title,
            slug: "lgs4000",
            capacity: inverters[4].productIcons[1].text,
            warranty: inverters[4].specifications[1].value,
            price: "XXXXX",
            imageRelativeUrl: "/livguard/products/inverters/lgs4000/thumbnail.png",
        },
        {
            name: inverters[5].title,
            slug: "lgs5000",
            capacity: inverters[5].productIcons[1].text,
            warranty: inverters[5].specifications[1].value,
            price: "XXXXX",
            imageRelativeUrl: "/livguard/products/inverters/lgs5000/thumbnail.png",
        },
    ];

    function InverterCard({
        slug,
        userPreferences,
        isBestSeller,
        productName,
        productPrice,
        capacity,
        warranty,
        imageRelativeUrl,
    }: {
        slug: string;
        userPreferences: UserPreferences;
        isBestSeller?: boolean;
        productName: string;
        productPrice: string;
        capacity: string;
        warranty: string;
        imageRelativeUrl: string;
    }) {
        return (
            <Link
                to={`/product/${slug}`}
                className="tw-w-full tw-h-full tw-grid tw-grid-cols-1 lg-bg-secondary-100 tw-rounded-lg"
            >
                {/* {isBestSeller != null && isBestSeller === true ? (
                    <div className="tw-row-start-1 tw-h-6 lg-stabilizers-best-seller-gradient tw-rounded-tr-lg tw-place-self-end tw-text-xs tw-px-3 tw-py-1 lg:tw-px-4 tw-flex tw-flex-row tw-items-center !tw-text-secondary-900-dark">
                        <span>{getVernacularString("f4b66650-853d-4dd7-946f-1cda1f5c724a", userPreferences.language)}</span>
                    </div>
                ) : ( */}
                {/* <VerticalSpacer className="tw-h-6" /> */}
                {/* )} */}

                <div className="tw-p-4 tw-grid tw-grid-flow-row lg:tw-grid-rows-[minmax(0,1fr)_repeat(9,auto)] lg:tw-items-center">
                    <FullWidthImage relativePath={imageRelativeUrl} />

                    <div className="tw-w-full tw-text-center lg-text-body-bold lg-text-secondary-900">{productName}</div>

                    <VerticalSpacer className="tw-h-2" />

                    <div className="tw-place-self-center tw-grid tw-grid-cols-[minmax(0,1fr)_auto_0.5rem_70%_minmax(0,1fr)] tw-items-center tw-w-full">
                        <img
                            className="tw-col-start-2 tw-invert dark:tw-invert-0"
                            src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/hkva/5/5.capacity.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
                        />
                        <span className="tw-col-start-4 tw-text-center">{capacity}</span>
                    </div>

                    <VerticalSpacer className="tw-h-2" />

                    <div className="tw-place-self-center tw-grid tw-grid-cols-[minmax(0,1fr)_auto_0.5rem_70%_minmax(0,1fr)] tw-items-center tw-w-full">
                        <img
                            className="tw-col-start-2 tw-invert dark:tw-invert-0"
                            src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/hkva/5/5.warranty.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
                        />
                        <span className="tw-col-start-4 tw-text-center">{warranty}</span>
                    </div>

                    <VerticalSpacer className="tw-h-6" />

                    <div className="tw-w-full tw-text-center lg-text-secondary-700">
                        {`${getVernacularString("5a00bddd-f110-4ef7-8eae-40524a72dd91", userPreferences.language)}${productPrice}${getVernacularString(
                            "0febb66a-4aa4-4e78-8a17-14c49f5d6a86",
                            userPreferences.language,
                        )}`}
                    </div>

                    <VerticalSpacer className="tw-h-4" />

                    <button className="lg-cta-outline-button lg-cta-outline-button-transition tw-w-full tw-text-center tw-px-1">
                        {getVernacularString("b6b6bee5-c2b4-4221-8776-7e55212e5a0e", userPreferences.language)}
                    </button>
                </div>
            </Link>
        );
    }

    const [isViewMore, setIsViewMore] = useState(false);

    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-px-3", className)}>
            <div className="tw-grid tw-grid-cols-1">
                <DefaultTextAnimation>
                    <h2
                        className="lg-text-headline tw-text-center"
                        dangerouslySetInnerHTML={{__html: getVernacularString("857b8564-8171-4ea0-b4eb-940b767fb270", userPreferences.language)}}
                    />

                    <h2
                        className="lg-text-headline tw-text-center"
                        dangerouslySetInnerHTML={{__html: getVernacularString("6cf663f6-3c72-4bbd-93a6-f9e53a53cc08", userPreferences.language)}}
                    />
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-6 lg:tw-h-12" />

                <div className="tw-grid tw-grid-cols-[repeat(2,minmax(0,1fr))] lg:tw-grid-cols-[repeat(auto-fill,14.5rem)] lg:tw-grid-flow-row-dense lg:tw-justify-center tw-gap-4 lg:tw-gap-8">
                    {isViewMore
                        ? featuredProducts.map((featuredProduct, featuredProductIndex) => (
                              <InverterCard
                                  slug={featuredProduct.slug}
                                  productName={featuredProduct.name}
                                  productPrice={featuredProduct.price}
                                  capacity={`${featuredProduct.capacity} ${getVernacularString("7ee64780-1190-49dc-a305-0f6e9551e8aa", userPreferences.language)}`}
                                  warranty={featuredProduct.warranty}
                                  userPreferences={userPreferences}
                                  // isBestSeller={featuredProduct.isBestSeller != null ? featuredProduct.isBestSeller : false}
                                  key={featuredProductIndex}
                                  imageRelativeUrl={featuredProduct.imageRelativeUrl}
                              />
                          ))
                        : featuredProducts.slice(0, 4).map((featuredProduct, featuredProductIndex) => (
                              <InverterCard
                                  slug={featuredProduct.slug}
                                  productName={featuredProduct.name}
                                  productPrice={featuredProduct.price}
                                  capacity={`${featuredProduct.capacity} ${getVernacularString("7ee64780-1190-49dc-a305-0f6e9551e8aa", userPreferences.language)}`}
                                  warranty={featuredProduct.warranty}
                                  userPreferences={userPreferences}
                                  // isBestSeller={featuredProduct.isBestSeller != null ? featuredProduct.isBestSeller : false}
                                  key={featuredProductIndex}
                                  imageRelativeUrl={featuredProduct.imageRelativeUrl}
                              />
                          ))}
                </div>

                <VerticalSpacer className="tw-h-4 lg:tw-h-8" />

                <button
                    className="lg-cta-button tw-justify-self-center"
                    onClick={() => setIsViewMore((prev) => !prev)}
                >
                    {!isViewMore
                        ? getVernacularString("10a749b0-d7b2-4c29-add5-a4afb989249d", userPreferences.language)
                        : getVernacularString("05dd627c-2d81-4390-a8ec-4543cb8b8cd7", userPreferences.language)}
                </button>
            </div>
        </div>
    );
}

function WeAreEverywhere({userPreferences, showCtaButton, className}: {userPreferences: UserPreferences; showCtaButton: boolean; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("[@media(max-width:1024px)]:lg-px-screen-edge", className)}>
            <div className="tw-relative lg-bg-secondary-100 tw-rounded-lg tw-h-[350px] tw-overflow-hidden lg:tw-h-full lg:tw-px-2">
                <div className="tw-flex tw-flex-col tw-absolute tw-m-auto tw-top-0 tw-left-0 tw-right-0 tw-bottom-0 tw-justify-center tw-items-center">
                    <div className="tw-absolute tw-inset-0">
                        <CoverImage relativePath={userPreferences.theme == Theme.Dark ? "/livguard/home/10/1-dark.jpg" : "/livguard/home/10/1-light.jpg"} />
                    </div>

                    <div className="tw-z-10 lg-text-headline tw-text-center">
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("92897a67-ff1d-4e6c-804f-4f69dd03db4d", userPreferences.language)}} />
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("53b219cb-fdee-4ea2-aff4-858f5c63aed0", userPreferences.language)}} />
                    </div>

                    <VerticalSpacer className="tw-h-1" />

                    <div className="tw-z-10 lg-text-title2">{getVernacularString("24bb85a9-42af-4302-b21b-dece9f9d0d21", userPreferences.language)}</div>

                    {showCtaButton && (
                        <>
                            <VerticalSpacer className="tw-h-6" />

                            <Link
                                to="/dealer-for-inverters-and-batteries"
                                className="tw-z-10 lg-cta-button"
                            >
                                {getVernacularString("db232019-b302-4eb7-a10c-05b17e72a800", userPreferences.language)}
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

function YourGuideToFindingTheRightInverter({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_1rem_auto_1rem_auto_minmax(0,1fr)] ", className)}>
            <div className="tw-row-start-2 tw-text-center lg-text-headline">{getVernacularString("a5bdaea0-3ac4-4e61-bb56-15921022d881", userPreferences.language)}</div>
            <div
                className="tw-row-start-3 tw-text-center lg-text-headline"
                dangerouslySetInnerHTML={{__html: getVernacularString("cd0ff218-fadc-488a-a3b8-f97beffed82b", userPreferences.language)}}
            />
            <div className="tw-row-start-5 tw-text-center lg-px-screen-edge-2">{getVernacularString("b137befb-819f-4e24-a9f1-8a8a7fefeb3a", userPreferences.language)}</div>

            <div className="tw-row-start-7 tw-w-full tw-grid tw-grid-cols-[minmax(0,1fr)_minmax(0,1fr)] tw-p-4 tw-gap-4">
                <a
                    href="https://www.livguard.com/static-assets/livguard-buying-guide.pdf"
                    download
                    target="_blank"
                    className="lg-bg-secondary-100 tw-py-4 tw-rounded-lg tw-grid tw-grid-cols-[auto_1rem_auto_minmax(0,1fr)] tw-h-full tw-p-4"
                >
                    <img
                        className="tw-row-start-1 tw-col-start-1 tw-place-self-center"
                        src="https://files.growthjockey.com/livguard/icons/stabilizer/buying-guide.svg"
                    />
                    <div className="tw-row-start-1 tw-col-start-3 tw-flex tw-flex-row tw-items-center lg-text-body">
                        {getVernacularString("8d939846-726e-4b7a-a834-a985292cec9b", userPreferences.language)}
                    </div>
                </a>
                <a
                    href="https://www.livguard.com/static-assets/livguard-ib-leaflet.pdf"
                    download
                    target="_blank"
                    className="lg-bg-secondary-100 tw-py-4 tw-rounded-lg tw-grid tw-grid-cols-[auto_1rem_auto_minmax(0,1fr)] tw-h-full tw-p-4"
                >
                    <img
                        className="tw-row-start-1 tw-col-start-1 tw-place-self-center"
                        src="https://files.growthjockey.com/livguard/icons/stabilizer/download-catalogue.svg"
                    />
                    <div className="tw-row-start-1 tw-col-start-3 tw-flex tw-flex-row tw-items-center lg-text-body">
                        {getVernacularString("d44ffe14-87dd-42e8-8550-0b82ac2dad04", userPreferences.language)}
                    </div>
                </a>
            </div>

            <VerticalSpacer className="tw-row-start-8 tw-h-6" />

            <Link
                to="/load-calculator"
                className="tw-row-start-9 tw-grid tw-place-items-center"
            >
                <div className="lg-cta-button tw-place-self-center">{getVernacularString("bfcd956a-49a7-4586-b645-b6b1a4e20a83", userPreferences.language)}</div>
            </Link>

            <VerticalSpacer className="lg:tw-row-start-10 tw-hidden lg:tw-block lg:tw-h-12" />
        </div>
    );
}

function FaqSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const faqs = [
        {
            question: "4810d194-34b9-4aec-b27b-61905a838517",
            answer: "adf7b4db-adfb-47fe-8a4e-6290465e6abb",
        },
        {
            question: "7fe9f5d4-00a9-41a1-a09e-facb4f63ee0b",
            answer: "3b1d76dd-c2bb-4d9f-b56d-d682a0cd42de",
        },
        {
            question: "22698520-ae75-494a-a16b-4afc4ac1992c",
            answer: "7e5ac090-a155-46f8-8461-404c710b925d",
        },
        {
            question: "a78c0c49-ffb7-4dce-aa79-308daa5623a4",
            answer: "31c4c4e8-2c27-4d1f-abce-9bffd83915b2",
        },
        {
            question: "9f264c8e-4212-43c1-a101-8f680845d25c",
            answer: "64882f53-b9a6-4486-89a7-5c673f36a258",
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

function SocialHandles({userPreferences, heading, className}: {userPreferences: UserPreferences; heading: {text1: string; text2: string}; className?: string}) {
    const embeddedVideos = [
        <EmbeddedYoutubeVideo
            id="b6gqLXTnZnw"
            style={{aspectRatio: "560/315"}}
        />,
        <EmbeddedYoutubeVideo
            id="CRabeGp9800"
            style={{aspectRatio: "560/315"}}
        />,
        <EmbeddedYoutubeVideo
            id="tFj9GJcjq6s"
            style={{aspectRatio: "560/315"}}
        />,
    ];

    return (
        <div className={concatenateNonNullStringsWithSpaces("[@media(max-width:1024px)]:lg-px-screen-edge tw-w-full tw-max-w-7xl tw-mx-auto", className)}>
            <div className="tw-flex tw-flex-col lg-bg-secondary-100 tw-rounded-lg tw-text-center lg-px-screen-edge lg:tw-hidden">
                <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

                <div className="lg-text-headline">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString(heading.text1, userPreferences.language)}} />

                    <div dangerouslySetInnerHTML={{__html: getVernacularString(heading.text2, userPreferences.language)}} />
                </div>

                <VerticalSpacer className="tw-h-4" />

                <CarouselStyle3 items={embeddedVideos} />

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-body">{getVernacularString("homeS11T2", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-2" />

                <div className="tw-flex tw-justify-evenly">
                    <a
                        href="https://www.facebook.com/LivguardEnergy/"
                        target="_blank"
                    >
                        <Facebook className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                    <a
                        href="https://twitter.com/LivguardEnergy"
                        target="_blank"
                    >
                        <Twitter className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                    <a
                        href="https://www.instagram.com/livguardenergy/"
                        target="_blank"
                    >
                        <Instagram className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                    <a
                        href="https://www.linkedin.com/company/livguard-energy/"
                        target="_blank"
                    >
                        <Linkedin className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                    <a
                        href="https://www.youtube.com/@LivguardEnergy"
                        target="_blank"
                    >
                        <Youtube className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                </div>

                <VerticalSpacer className="tw-h-4" />
            </div>

            <div className="tw-hidden lg:tw-flex tw-flex-col tw-justify-center tw-text-center">
                <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

                <div className="lg-text-headline">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString(heading.text1, userPreferences.language)}} />

                    <div dangerouslySetInnerHTML={{__html: getVernacularString(heading.text2, userPreferences.language)}} />
                </div>

                <VerticalSpacer className="tw-h-8" />

                <div className="tw-grid tw-grid-cols-3 tw-gap-4">
                    <ItemBuilder
                        items={embeddedVideos}
                        itemBuilder={(video, videoIndex) => (
                            <div
                                className="tw-flex tw-flex-col lg-bg-secondary-100 tw-rounded-lg tw-pb-4 tw-overflow-hidden"
                                key={videoIndex}
                            >
                                {video}

                                <VerticalSpacer className="tw-h-2" />

                                <div className="lg-text-body">{getVernacularString("homeS11T2", userPreferences.language)}</div>

                                <div className="tw-flex tw-justify-evenly">
                                    <a
                                        href="https://www.facebook.com/LivguardEnergy/"
                                        target="_blank"
                                    >
                                        <Facebook className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                                    </a>
                                    <a
                                        href="https://twitter.com/LivguardEnergy"
                                        target="_blank"
                                    >
                                        <Twitter className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                                    </a>
                                    <a
                                        href="https://www.instagram.com/livguardenergy/"
                                        target="_blank"
                                    >
                                        <Instagram className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/company/livguard-energy/"
                                        target="_blank"
                                    >
                                        <Linkedin className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                                    </a>
                                    <a
                                        href="https://www.youtube.com/@LivguardEnergy"
                                        target="_blank"
                                    >
                                        <Youtube className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                                    </a>
                                </div>
                            </div>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}
