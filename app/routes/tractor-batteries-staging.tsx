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
import {Language, Theme, UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";
import {convertProductInternalNameToPublicName, getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {CarouselStyle5} from "~/components/carouselStyle5";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {CarouselStyle3} from "~/components/carouselStyle3";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {ProductType, allProductDetails} from "~/productData";
import React, {useEffect, useRef, useState} from "react";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ImageCdnProvider} from "~/global-common-typescript/typeDefinitions";
import {FormSelectComponent} from "~/livguard-common-typescript/scratchpad";
import LivguardDialog from "~/components/livguardDialog";
import {CarouselStyle4} from "~/components/carouselStyle4";
import {FullHeightImage} from "~/components/images/fullHeightImage";
import {FixedWidthImage} from "~/components/images/fixedWidthImage";
import {FixedHeightImage} from "~/components/images/fixedHeightImage";
import {ProductAndCategoryBottomBar} from "~/components/productAndCategoryBottomBar";
import {SubCategoryProductsInternal} from "~/components/automotive-batteries/subCategoryProductsInternal";

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
                <TractorBatteriesPage userPreferences={userPreferences} />
            </PageScaffold>

            <ProductAndCategoryBottomBar
                userPreferences={userPreferences}
                utmParameters={utmSearchParameters}
                pageUrl={pageUrl}
            />
        </>
    );
};

function TractorBatteriesPage({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <>
            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-x-16 tw-items-start tw-justify-center">
                <HeroSection
                    userPreferences={userPreferences}
                    className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
                />

                <VerticalSpacer className="tw-h-10 tw-row-start-2 tw-col-start-1 lg:tw-col-span-full" />

                <StrongAutomotiveBatteries
                    userPreferences={userPreferences}
                    className="tw-row-start-3 tw-col-start-1 lg-px-screen-edge-2 lg:tw-px-0 tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-4 tw-col-start-1 lg:tw-col-span-full" />

                <TractorBatteriesCarousel
                    userPreferences={userPreferences}
                    className="tw-row-start-5 tw-col-start-1 lg:tw-col-span-full tw-w-full"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-6 tw-col-start-1 lg:tw-col-span-full" />

                <TopTractorBatteryPicks
                    userPreferences={userPreferences}
                    className="tw-row-start-7 tw-col-start-1 lg:tw-col-span-full tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-8 tw-col-start-1 lg:tw-col-span-full" />

                <div className="tw-row-start-9 tw-grid lg:tw-grid-cols-[minmax(0,1fr)_minmax(0,2fr)] tw-col-span-full lg:lg-px-screen-edge-2 tw-gap-x-5 tw-max-w-7xl tw-mx-auto">
                    <WeAreEverywhere
                        userPreferences={userPreferences}
                        className="tw-row-start-5 lg:tw-col-start-1 lg:tw-h-full"
                        showCtaButton={true}
                    />

                    <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-6 lg:tw-col-start-1 lg:tw-col-span-full lg:tw-hidden" />

                    <ChooseYourIdealTwoWheelerBattery
                        userPreferences={userPreferences}
                        className="tw-row-start-7 lg:tw-row-start-5 lg:tw-col-start-2"
                    />
                </div>

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[10] tw-col-start-1 lg:tw-col-span-full" />

                <FaqSection
                    userPreferences={userPreferences}
                    className="tw-row-start-[11] lg:tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px] tw-max-w-7xl"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[12] tw-col-start-1 lg:tw-col-span-full" />

                <SocialHandles
                    userPreferences={userPreferences}
                    heading={{text1: "b0a3aa40-4b00-4bdd-88e0-67085fafa92b", text2: `c0f802cc-902b-4328-b631-a3fad8fc7d18`}}
                    className="tw-row-start-[13] tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px] tw-gap-[1rem] tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[14] tw-col-start-1 lg:tw-col-span-full" />
            </div>
        </>
    );
}

function HeroSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-grid tw-grid-rows-[2rem_auto_auto_1rem_auto] lg:tw-grid-rows-[3rem_auto_auto_1rem_auto] lg:tw-grid-cols-[0_auto_minmax(0,1fr)] tw-text-center",
                className,
            )}
            ref={ref}
        >
            <div className="tw-row-start-1 tw-col-start-1 tw-row-span-full tw-col-span-full tw-h-fit">
                {containerWidth == null || containerHeight == null ? null : (
                    // <CoverImage
                    // relativePath={containerHeight > containerWidth || containerWidth < 1024 ? "/livguard/tractor/1/banner-mobile.jpg" : "/livguard/tractor/1/banner-desktop.jpg"}
                    // className="tw-row-start-1 tw-col-start-1 tw-row-span-full lg:tw-col-span-full"
                    // key={containerHeight > containerWidth || containerWidth < 1024 ? "/livguard/tractor/1/banner-mobile.jpg" : "/livguard/tractor/1/banner-desktop.jpg"}
                    // />

                    <FullWidthImage
                        relativePath={containerHeight > containerWidth || containerWidth < 1024 ? "/livguard/tractor/1/banner-mobile.jpg" : "/livguard/tractor/1/banner-desktop.png"}
                        key={containerHeight > containerWidth || containerWidth < 1024 ? "/livguard/tractor/1/banner-mobile.jpg" : "/livguard/tractor/1/banner-desktop.png"}
                    />
                )}
            </div>

            <div className="tw-row-start-2 tw-col-start-1 lg:tw-col-start-2 lg-px-screen-edge-2">
                <DefaultTextAnimation className="tw-row-start-2 tw-col-start-1 lg:tw-col-start-2 lg-px-screen-edge-2 lg:tw-px-0">
                    <div className="lg-text-banner tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">
                        {getVernacularString("1ff75fcb-01bd-4946-84bc-f759d4dad669", userPreferences.language)}
                    </div>
                </DefaultTextAnimation>

                <DefaultTextAnimation className="tw-row-start-3 tw-col-start-1 lg:tw-col-start-2 lg-px-screen-edge-2 lg:tw-px-0">
                    <div className="lg-text-banner tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">
                        {getVernacularString("d11c39cc-f5a5-412e-acfa-a08385f2fd26", userPreferences.language)}
                    </div>
                </DefaultTextAnimation>
            </div>
        </div>
    );
}

function StrongAutomotiveBatteries({userPreferences, className}: {userPreferences: UserPreferences; className: string}) {
    const BatteryCard = ({title, description, imageRelativePath}: {title: string; description: string; imageRelativePath: string}) => {
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

    const batteriesData: Array<{titleTextContentPiece: string; bodyTextContentPiece: string; imageRelativePath: string}> = [
        {
            titleTextContentPiece: "054be978-134a-4185-9c1c-af2e2115a679",
            bodyTextContentPiece: "52f9b679-cbea-492f-be72-97980bbd8f4f",
            imageRelativePath: "/livguard/tractor/2/2.1.png",
        },
        {
            titleTextContentPiece: "55d766c4-1a47-4ba3-bb6f-299997cb27ee",
            bodyTextContentPiece: "3d8116d8-57fd-461c-916d-060537ceda59",
            imageRelativePath: "/livguard/tractor/2/2.2.png",
        },
        {
            titleTextContentPiece: "2e1d6311-034a-4ee3-8f50-bee164a05906",
            bodyTextContentPiece: "141b0934-353a-4b48-ba96-69afbe2bc115",
            imageRelativePath: "/livguard/tractor/2/2.3.png",
        },
        {
            titleTextContentPiece: "054be978-134a-4185-9c1c-af2e2115a679",
            bodyTextContentPiece: "52f9b679-cbea-492f-be72-97980bbd8f4f",
            imageRelativePath: "/livguard/tractor/2/2.1.png",
        },
        {
            titleTextContentPiece: "55d766c4-1a47-4ba3-bb6f-299997cb27ee",
            bodyTextContentPiece: "3d8116d8-57fd-461c-916d-060537ceda59",
            imageRelativePath: "/livguard/tractor/2/2.2.png",
        },
        {
            titleTextContentPiece: "2e1d6311-034a-4ee3-8f50-bee164a05906",
            bodyTextContentPiece: "141b0934-353a-4b48-ba96-69afbe2bc115",
            imageRelativePath: "/livguard/tractor/2/2.3.png",
        },
    ];

    return (
        <>
            <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg:tw-col-span-full", className)}>
                <DefaultTextAnimation className="tw-flex tw-flex-col tw-items-center lg-text-headline lg:lg-px-screen-edge-2 lg:tw-pl-0 lg:tw-pr-0 tw-text-center lg:tw-text-left">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("c15def47-2c4f-4e42-ba57-102da4f0ee11", userPreferences.language)}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("7547aa62-ca76-48e4-9fb0-62cea563108c", userPreferences.language)}} />
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-4 lg:tw-h-8" />

                <CarouselStyle5
                    items={batteriesData.map((batteryData, batteryDataIndex) => (
                        <BatteryCard
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

function TractorBatteriesCarousel({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const products = [
        allProductDetails["lgptr800r"][userPreferences.language],
        allProductDetails["lgptr900l"][userPreferences.language],
        allProductDetails["lgptr1000l"][userPreferences.language],
        allProductDetails["lgpxtr8048r"][userPreferences.language],
        allProductDetails["lgpxtr9048l"][userPreferences.language],
        allProductDetails["lgpxtr10048l"][userPreferences.language],
        allProductDetails["lgpxtr9048h29l"][userPreferences.language],
    ];
    const brandBatteries = [
        {
            batterySlug: "lgptr800r",
            name: "LGP TR800 R",
            description: products[0].description,
            warranty: products[0].specifications[1].value,
            capacity: products[0].specifications[2].value,
            grid: "", //Add when data is available
            dimensions: "",
        },
        {
            batterySlug: "lgptr900l",
            name: "LGP TR900 L",
            description: products[1].description,
            warranty: products[1].specifications[1].value,
            capacity: products[1].specifications[2].value,
            grid: "",
            dimensions: "",
        },
        {
            batterySlug: "lgptr1000l",
            name: "LGP TR1000 L",
            description: products[2].description,
            warranty: products[2].specifications[1].value,
            capacity: products[2].specifications[2].value,
            grid: "",
            dimensions: "",
        },
        {
            batterySlug: "lgpxtr8048r",
            name: "LGPX TR8048 R",
            description: products[3].description,
            warranty: products[3].specifications[1].value,
            capacity: products[3].specifications[2].value,
            grid: "",
            dimensions: "",
        },
        {
            batterySlug: "lgpxtr9048l",
            name: "LGPX TR9048 L",
            description: products[4].description,
            warranty: products[4].specifications[1].value,
            capacity: products[4].specifications[2].value,
            grid: "",
            dimensions: "",
        },
        {
            batterySlug: "lgpxtr10048l",
            name: "LGPX TR10048 L",
            description: products[5].description,
            warranty: products[5].specifications[1].value,
            capacity: products[5].specifications[2].value,
            grid: "",
            dimensions: "",
        },
        {
            batterySlug: "lgpxtr9048h29l",
            name: "LGPX TR9048H29 L",
            description: products[6].description,
            warranty: products[6].specifications[1].value,
            capacity: products[6].specifications[2].value,
            grid: "",
            dimensions: "",
        },
    ];

    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full tw-grid tw-grid-flow-row lg-bg-our-suggestions tw-rounded-lg", className)}>
            <VerticalSpacer className="tw-h-6 lg:tw-h-10" />

            <div
                className="lg-text-headline tw-place-self-center"
                dangerouslySetInnerHTML={{__html: getVernacularString("368be9b9-37b1-4c94-9b54-9c7b8bbea351", userPreferences.language)}}
            />
            <div className="lg-text-headline tw-place-self-center">{getVernacularString("e102bc0e-f831-4631-abb2-60f166440bbe", userPreferences.language)}</div>

            <VerticalSpacer className="tw-h-4 lg:tw-h-6" />

            <VerticalSpacer className="tw-h-4 lg:tw-h-6" />

            <CarouselStyle5
                // @ts-ignore
                items={brandBatteries.map((battery, batteryIndex) => {
                    return (
                        <CarouselBatteryCard
                            userPreferences={userPreferences}
                            batterySlug={battery.batterySlug}
                            name={battery.name}
                            description={battery.description}
                            capacity={`${battery.capacity} ${getVernacularString("c4c53678-fb9a-41c2-8782-de0690cffdd4", userPreferences.language)}`}
                            warranty={`${battery.warranty} ${getVernacularString("95a938d7-dd71-46de-80b0-a417845dfb4d", userPreferences.language)}`}
                            grid={battery.grid}
                            dimensions={battery.dimensions}
                            key={batteryIndex}
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

function CarouselBatteryCard({
    userPreferences,
    batterySlug,
    name,
    description,
    warranty,
    capacity,
    grid,
    dimensions,
}: {
    userPreferences: UserPreferences;
    batterySlug: string;
    name: string;
    description: string;
    warranty: string;
    capacity: string;
    grid: string;
    dimensions: string;
}) {
    return (
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:tw-gap-x-2 lg-bg-our-suggestions-card tw-rounded-lg tw-px-4 tw-py-3 lg:tw-py-6 lg:tw-px-8 tw-w-full tw-max-w-3xl tw-mx-auto">
            <div className="tw-col-start-1 tw-grid tw-grid-flow-row tw-place-items-center">
                <div className="lg:tw-hidden tw-bg-[#c5c5c5] dark:tw-bg-[#3a3a3a] tw-p-2">{getVernacularString("4f1b53b9-36a8-4a0e-b693-4f92e8a1b32b", userPreferences.language)}</div>
                <div>{/* <FullWidthImage relativePath={`product/automotive-batteries/${batterySlug}`} /> */}</div>

                <Link
                    className="tw-hidden lg:tw-block"
                    to="#"
                    //Add slug when products are available
                    // to={batterySlug}
                >
                    <button className="lg-cta-button">{getVernacularString("d7631d6c-a568-464f-8411-e1840750556a", userPreferences.language)}</button>
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
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/three-wheeler/3/3.warranty-icon.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{getVernacularString("8ef7eb7a-a46a-46b2-9479-cb31ce29ea98", userPreferences.language)}</div>
                            <div className="tw-row-start-3">{warranty}</div>
                        </div>
                    </div>

                    <div className="tw-row-start-1 tw-col-start-2 md:max-lg:tw-w-full md:max-lg:tw-row-start-2 md:max-lg:tw-col-start-1 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/three-wheeler/3/3.capacity-icon.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{getVernacularString("28225ecc-5c09-4c69-a82a-0614dc248123", userPreferences.language)}</div>
                            <div className="tw-row-start-3">{capacity}</div>
                        </div>
                    </div>

                    <div className="tw-row-start-2 tw-col-start-1 md:max-lg:tw-w-full md:max-lg:tw-row-start-3 md:max-lg:tw-col-start-1 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/three-wheeler/3/3.polarity-icon.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{getVernacularString("d71a4882-3a3c-4e2d-a884-071523e265d1", userPreferences.language)}</div>
                            <div className="tw-row-start-3">{grid}</div>
                        </div>
                    </div>

                    <div className="tw-row-start-2 tw-col-start-2 md:max-lg:tw-w-full md:max-lg:tw-row-start-4 md:max-lg:tw-col-start-1 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/three-wheeler/3/3.dimensions-icon.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{getVernacularString("ff09f4be-754d-49ed-95bb-9223ab5d383e", userPreferences.language)}</div>
                            <div className="tw-row-start-3">{dimensions}</div>
                        </div>
                    </div>
                </div>

                <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

                <Link
                    className="tw-place-self-center lg:tw-hidden"
                    to={batterySlug}
                >
                    <button className="lg-cta-button">{getVernacularString("d7631d6c-a568-464f-8411-e1840750556a", userPreferences.language)}</button>
                </Link>

                <VerticalSpacer className="tw-h-4 lg:tw-hidden" />
            </div>
        </div>
    );
}

function TopTractorBatteryPicks({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const pradhaanProducts = [
        allProductDetails["lgptr800r"][userPreferences.language],
        allProductDetails["lgptr900l"][userPreferences.language],
        allProductDetails["lgptr1000l"][userPreferences.language],
    ];
    const xtralifeProducts = [
        allProductDetails["lgpxtr8048r"][userPreferences.language],
        allProductDetails["lgpxtr9048l"][userPreferences.language],
        allProductDetails["lgpxtr10048l"][userPreferences.language],
        allProductDetails["lgpxtr9048h29l"][userPreferences.language],
    ];

    const featuredProducts = {
        Pradhaan: {
            title: "3daf8d68-a883-4175-b8b5-6dca9724201a",
            vehicleImageRelativeUrl: "/livguard/tractor/3/pradhan-tractor.png",
            productImageRelativeUrl: "/livguard/tractor/3/pradhan-battery.png",
            products: [
                {
                    productType: ProductType.automotiveBattery,
                    name: "LGP TR800 R",
                    slug: "lgptr800r",
                    capacity: pradhaanProducts[0].specifications[2].value,
                    warranty: pradhaanProducts[0].specifications[1].value,
                    price: "XXXXX",
                },
                {
                    productType: ProductType.automotiveBattery,
                    name: "LGP TR900 L",
                    slug: "lgptr900l",
                    capacity: pradhaanProducts[1].specifications[2].value,
                    warranty: pradhaanProducts[1].specifications[1].value,
                    price: "XXXXX",
                },
                {
                    productType: ProductType.automotiveBattery,
                    name: "LGP TR1000 L",
                    slug: "lgptr1000l",
                    capacity: pradhaanProducts[2].specifications[2].value,
                    warranty: pradhaanProducts[2].specifications[1].value,
                    price: "XXXXX",
                },
            ],
        },
        "Pradhaan Xtralife": {
            title: "e2420ef0-f6c0-48df-b14f-e801d8273618",
            vehicleImageRelativeUrl: "/livguard/tractor/3/humraahi-tractor.png",
            productImageRelativeUrl: "/livguard/tractor/3/humraahi-battery.png",
            products: [
                {
                    productType: ProductType.automotiveBattery,
                    name: "LGPX TR8048 R",
                    slug: "lgpxtr8048r",
                    capacity: xtralifeProducts[0].specifications[2].value,
                    warranty: xtralifeProducts[0].specifications[1].value,
                    price: "XXXXX",
                },
                {
                    productType: ProductType.automotiveBattery,
                    name: "LGPX TR9048 L",
                    slug: "lgpxtr9048l",
                    capacity: xtralifeProducts[1].specifications[2].value,
                    warranty: xtralifeProducts[1].specifications[1].value,
                    price: "XXXXX",
                },
                {
                    productType: ProductType.automotiveBattery,
                    name: "LGPX TR10048 L",
                    slug: "lgpxtr10048l",
                    capacity: xtralifeProducts[2].specifications[2].value,
                    warranty: xtralifeProducts[2].specifications[1].value,
                    price: "XXXXX",
                },
                {
                    productType: ProductType.automotiveBattery,
                    name: "LGPX TR9048H29 L",
                    slug: "lgpxtr9048h29l",
                    capacity: xtralifeProducts[3].specifications[2].value,
                    warranty: xtralifeProducts[3].specifications[1].value,
                    price: "XXXXX",
                },
            ],
        },
    };

    const pradhaanRef = useRef(null);
    const xtralifeRef = useRef(null);

    const refs = [pradhaanRef, xtralifeRef];

    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-flow-row tw-w-full tw-px-3 lg:lg-px-screen-edge-2 lg:tw-py-4", className)}>
            <DefaultTextAnimation className="tw-grid tw-grid-flow-row tw-gap-y-1 tw-text-center lg-text-headline">
                <div dangerouslySetInnerHTML={{__html: getVernacularString("713355d6-1d59-4ecb-af08-1e9a651bddc1", userPreferences.language)}}></div>
                <div>{getVernacularString("7dccb0a9-930e-498d-bc45-194b73920af2", userPreferences.language)}</div>
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-6" />

            <SubCategoryProductsInternal
                userPreferences={userPreferences}
                refs={refs}
                featuredProducts={featuredProducts}
                navigatorsContainerClassName="lg:tw-w-fit tw-grid tw-grid-rows-1 tw-grid-cols-2 lg:tw-grid-rows-1 lg:tw-grid-cols-[auto_auto] lg:tw-grid-flow-col lg:tw-justify-center tw-gap-4"
                vehicleImageClassName="lg:tw-absolute lg:tw-bottom-0 tw-w-full lg:tw-w-[calc(100%-2rem)]"
                productImageClassName="tw-z-[2] tw-absolute tw-bottom-[-0.3125rem] tw-h-[25%] lg:tw-h-[30%]"
                productImageLeftClassName="lg:tw-left-[5%] tw-left-[0rem]"
                productImageRightClassName="lg:tw-right-[5%] tw-right-[0rem]"
            />
            {/* <div className="tw-grid tw-grid-rows-1 tw-grid-cols-2 lg:tw-grid-cols-[minmax(0,1fr)_repeat(4,auto)_minmax(0,1fr)] tw-gap-4">
                <div
                    className="lg:tw-col-start-2 lg-bg-secondary-100 tw-py-2 tw-px-4 lg:tw-px-8 tw-text-center tw-rounded-lg tw-cursor-pointer"
                    onClick={() => {
                        pradhaanRef.current?.scrollIntoView();
                    }}
                >
                    {getVernacularString("3daf8d68-a883-4175-b8b5-6dca9724201a", userPreferences.language)}
                </div>
                <div
                    className="lg:tw-col-start-3 lg-bg-secondary-100 tw-py-2 tw-px-4 lg:tw-px-8 tw-text-center tw-rounded-lg tw-cursor-pointer"
                    onClick={() => {
                        xtralifeRef.current?.scrollIntoView();
                    }}
                >
                    {getVernacularString("e2420ef0-f6c0-48df-b14f-e801d8273618", userPreferences.language)}
                </div>
            </div>

            <VerticalSpacer className="tw-h-10" />

            <div className="tw-grid tw-grid-flow-row tw-gap-y-10">
                {Object.values(featuredProducts).map((category, categoryIndex) => {
                    const orientation = categoryIndex % 2 === 0 ? "left" : "right";
                    return (
                        <div
                            key={categoryIndex}
                            className="tw-relative"
                        >
                            <div
                                className="tw-invisible tw-absolute tw-top-[-6.5rem] tw-z-[-10] tw-h-[10.5rem] lg:tw-h-[6.5rem]"
                                ref={refs[categoryIndex]}
                            ></div>

                            <div
                                className={concatenateNonNullStringsWithSpaces(
                                    "tw-grid tw-grid-flow-row lg:tw-grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:tw-p-4 tw-rounded-lg",
                                    orientation === "left"
                                        ? "lg-automotive-bg-gradient-left-to-right-vertical-light dark:lg-automotive-bg-gradient-left-to-right-vertical-dark lg:lg-automotive-bg-gradient-left-to-right-light lg:dark:lg-automotive-bg-gradient-left-to-right-dark"
                                        : "lg-automotive-bg-gradient-right-to-left-vertical-light dark:lg-automotive-bg-gradient-right-to-left-vertical-dark lg:lg-automotive-bg-gradient-right-to-left-light lg:dark:lg-automotive-bg-gradient-right-to-left-dark",
                                )}
                                id={`category${categoryIndex}`}
                            >
                                <div
                                    className={concatenateNonNullStringsWithSpaces(
                                        "lg:tw-row-start-1 tw-w-full tw-h-full tw-relative tw-isolate lg:tw-p-4",
                                        orientation === "left" ? "lg:tw-col-start-1" : "lg:tw-col-start-2",
                                    )}
                                >
                                    <VerticalSpacer className="tw-h-4 lg:tw-hidden" />
                                    <div
                                        className={concatenateNonNullStringsWithSpaces(
                                            "lg:tw-row-start-1 lg:tw-col-start-1 tw-text-center lg-text-title1",
                                            orientation === "left" ? "lg:tw-text-left" : "lg:tw-text-right",
                                        )}
                                    >
                                        {getVernacularString(category.title, userPreferences.language)} ({category.products.length})
                                    </div>
                                    <VerticalSpacer className="tw-h-4" />
                                    <div className="lg:tw-absolute lg:tw-bottom-0 tw-w-full lg:tw-w-[calc(100%-2rem)]">
                                        <FullWidthImage
                                            className="tw-z-[2]"
                                            relativePath={category.vehicleImageRelativeUrl}
                                        />
                                    </div>
                                    <img
                                        className={concatenateNonNullStringsWithSpaces(
                                            "tw-z-[2] tw-absolute tw-bottom-[-0.3125rem] tw-h-[25%] lg:tw-h-[24%]",
                                            orientation === "left" ? "lg:tw-left-[5%] tw-left-[0rem]" : "lg:tw-right-[5%] tw-right-[0rem]",
                                        )}
                                        src={getAbsolutePathForRelativePath(getMetadataForImage(category.productImageRelativeUrl).finalUrl, ImageCdnProvider.Bunny, null, null)}
                                    />
                                </div>

                                <VerticalSpacer className="tw-h-6 lg:tw-hidden" />

                                {category.products.length > 1 ? (
                                    <CarouselStyle4
                                        items={category.products.map((product, productIndex) => {
                                            return (
                                                <BatteryCard
                                                    userPreferences={userPreferences}
                                                    productName={product.name}
                                                    productPrice={product.price}
                                                    slug={product.slug}
                                                    capacity={`${product.capacity} ${userPreferences.language === Language.English ? "Capacity" : "?????"}`}
                                                    warranty={`${product.warranty} ${userPreferences.language === Language.English ? "Warranty" : "?????"}`}
                                                    productType={product.productType}
                                                    // isBestSeller={product.isBestSeller}
                                                    imageRelativeUrl={`/product/automotive-batteries/${product.slug}/thumbnail.png`}
                                                    key={productIndex}
                                                />
                                            );
                                        })}
                                        itemContainerClassName=""
                                        slidesContainerClassName="!tw-auto-cols-[min(100%,15rem)] lg:!tw-auto-cols-[50%]"
                                        controlsContainerClassName="tw-p-4"
                                        className={concatenateNonNullStringsWithSpaces(
                                            "lg:tw-row-start-1 lg:tw-row-span-full lg:tw-py-4",
                                            orientation === "left" ? "lg:tw-col-start-2" : "lg:tw-col-start-1",
                                        )}
                                    />
                                ) : (
                                    <div
                                        className={concatenateNonNullStringsWithSpaces(
                                            "lg:tw-row-start-1 lg:tw-row-span-full lg:tw-py-4 tw-grid tw-grid-flow-col tw-justify-center !tw-auto-cols-[min(100%,15rem)] lg:!tw-auto-cols-[50%]",
                                            orientation === "left" ? "lg:tw-col-start-2" : "lg:tw-col-start-1",
                                        )}
                                    >
                                        {category.products.map((product, productIndex) => {
                                            return (
                                                <div className="tw-px-3">
                                                    <BatteryCard
                                                        userPreferences={userPreferences}
                                                        productName={getVernacularString(product.name, userPreferences.language)}
                                                        productPrice={product.price}
                                                        slug={product.slug}
                                                        capacity={`${product.capacity} ${getVernacularString("c4c53678-fb9a-41c2-8782-de0690cffdd4", userPreferences.language)}`}
                                                        warranty={`${product.warranty} ${getVernacularString("95a938d7-dd71-46de-80b0-a417845dfb4d", userPreferences.language)}`}
                                                        productType={product.productType}
                                                        // isBestSeller={product.isBestSeller}
                                                        imageRelativeUrl={`/product/automotive-batteries/${product.slug}/thumbnail.png`}
                                                        key={productIndex}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div> */}
        </div>
    );
}

function BatteryCard({
    slug,
    productType,
    userPreferences,
    isBestSeller,
    imageRelativeUrl,
    productName,
    productPrice,
    capacity,
    warranty,
}: {
    slug: string;
    productType: ProductType;
    userPreferences: UserPreferences;
    isBestSeller?: boolean;
    imageRelativeUrl: string;
    productName: string;
    productPrice: string;
    capacity: string;
    warranty: string;
}) {
    return (
        <Link
            to={`/product/${slug}`}
            className="tw-w-full tw-h-full tw-grid tw-grid-cols-1 lg-bg-secondary-100 tw-rounded-lg"
        >
            {isBestSeller != null && isBestSeller === true ? (
                <div className="tw-row-start-1 tw-h-1rem lg-stabilizers-best-seller-gradient tw-rounded-tr-lg tw-place-self-end tw-text-xs tw-px-3 tw-py-1 lg:tw-px-4 tw-flex tw-flex-row tw-items-center !tw-text-secondary-900-dark">
                    <span>{getVernacularString("14e0e286-5fd7-43aa-a6f3-5b3b9a0ec71f", userPreferences.language)}</span>
                </div>
            ) : (
                <VerticalSpacer className="tw-h-[1.5rem]" />
            )}

            <div className="tw-p-4 tw-grid tw-grid-flow-row">
                <FullWidthImage relativePath={imageRelativeUrl} />

                <VerticalSpacer className="tw-h-4" />

                <div className="tw-w-full tw-text-center lg-text-body-bold lg-text-secondary-900 tw-whitespace-nowrap">{productName}</div>

                <VerticalSpacer className="tw-h-2" />

                <div className="tw-place-self-center tw-grid tw-grid-cols-[minmax(0,1fr)_auto_0.5rem_70%_minmax(0,1fr)] tw-items-center tw-w-full">
                    <img
                        className="tw-col-start-2 tw-invert dark:tw-invert-0"
                        src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/car-and-suv/4/capacity.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
                    />
                    <span className="tw-col-start-4 tw-text-center lg-text-icon lg:lg-text-body lg:!lg-text-secondary-900">{capacity}</span>
                </div>

                <VerticalSpacer className="tw-h-2" />

                <div className="tw-place-self-center tw-grid tw-grid-cols-[minmax(0,1fr)_auto_0.5rem_70%_minmax(0,1fr)] tw-items-center tw-w-full">
                    <img
                        className="tw-col-start-2 tw-invert dark:tw-invert-0"
                        src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/car-and-suv/4/warranty.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
                    />
                    <span className="tw-col-start-4 tw-text-center lg-text-icon lg:lg-text-body lg:!lg-text-secondary-900">{warranty}</span>
                </div>

                <VerticalSpacer className="tw-h-6" />

                <div className="tw-w-full tw-text-center lg-text-secondary-700">
                    {`${getVernacularString("abce92ec-fd9a-4578-ab56-ddfd9fdafe72", userPreferences.language)}${productPrice}${getVernacularString(
                        "0044b486-6eca-4e3a-abf0-102eede6e10c",
                        userPreferences.language,
                    )}`}
                </div>

                <VerticalSpacer className="tw-h-4" />

                <button className="lg-cta-button tw-w-full tw-text-center tw-px-1">{getVernacularString("063dc56b-910e-4a48-acb8-8f52668a4c72", userPreferences.language)}</button>
            </div>
        </Link>
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

function ChooseYourIdealTwoWheelerBattery({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_1rem_auto_1rem_auto_minmax(0,1fr)] ", className)}>
            <div className="tw-row-start-2 tw-text-center lg-text-headline">{getVernacularString("27518d22-a27d-4519-b01a-18d1fed070ed", userPreferences.language)}</div>
            <div
                className="tw-row-start-3 tw-text-center lg-text-headline"
                dangerouslySetInnerHTML={{__html: getVernacularString("4092b04f-c277-4ec3-b313-0844337ae7df", userPreferences.language)}}
            />
            <div className="tw-row-start-5 tw-text-center lg-px-screen-edge-2">{getVernacularString("c92fa811-4140-4bef-86a4-6034b9ad2cf9", userPreferences.language)}</div>

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
                        {getVernacularString("ec0d9e43-a1e3-414a-b6fe-01114e016fd3", userPreferences.language)}
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
                        {getVernacularString("b0b06e47-de82-4dba-acc2-90e3b74df96b", userPreferences.language)}
                    </div>
                </a>
            </div>

            <VerticalSpacer className="tw-row-start-8 tw-h-6" />

            <a
                href="/battery-finder.php"
                target="_blank"
                className="tw-row-start-9 tw-grid tw-place-items-center"
            >
                <div className="lg-cta-button tw-place-self-center">{getVernacularString("734ba5fc-030e-4c78-a3c3-b31ae30e1f51", userPreferences.language)}</div>
            </a>

            <VerticalSpacer className="lg:tw-row-start-10 tw-hidden lg:tw-block lg:tw-h-12" />
        </div>
    );
}

function FaqSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const faqs = [
        {
            question: "6a9dcdf2-db86-4d1a-a9aa-0431dc441372",
            answer: "775f35e2-464a-4571-a75e-babbc97ac4d2",
        },
        {
            question: "a5472cd9-0d41-4450-88ed-d7c07c18a319",
            answer: "550c8080-9893-46ac-92bf-b317fc9aaeb4",
        },
        {
            question: "a46b2d72-9f30-4fc6-ac40-48427ed1f401",
            answer: "477e9287-3dd5-4d80-99b2-49cab09dcc3d",
        },
        {
            question: "8bf5fb61-8c2c-4728-b93f-0b291817209e",
            answer: "563e329b-a70c-4093-9ec9-e07c9942721d",
        },
        {
            question: "9b90fd59-08ca-4378-b846-3f364b90d058",
            answer: "aaa8b7ad-37fa-4782-8f3a-68f3690cf08b",
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

export function FilterDialog({
    userPreferences,
    isContactUsDialogOpen,
    setIsContactUsDialogOpen,
    brandBatteries,
    selectedBrand,
    setSelectedBrand,
    setAppliedBrand,
    selectedSegment,
    setSelectedSegment,
    setAppliedSegment,
    selectedModel,
    setSelectedModel,
    setAppliedModel,
    selectedFuel,
    setSelectedFuel,
    setAppliedFuel,
    setApplyChanges,
}: {
    userPreferences: UserPreferences;
    isContactUsDialogOpen: boolean;
    setIsContactUsDialogOpen: React.Dispatch<boolean>;
    brandBatteries: any;
    selectedBrand: string;
    setSelectedBrand: React.Dispatch<string>;
    appliedBrand: string;
    setAppliedBrand: React.Dispatch<string>;
    selectedSegment: string;
    setSelectedSegment: React.Dispatch<string>;
    appliedSegment: string;
    setAppliedSegment: React.Dispatch<string>;
    selectedModel: string;
    setSelectedModel: React.Dispatch<string>;
    appliedModel: string;
    setAppliedModel: React.Dispatch<string>;
    selectedFuel: string;
    setSelectedFuel: React.Dispatch<string>;
    setAppliedFuel: React.Dispatch<string>;
    setApplyChanges: React.Dispatch<boolean>;
}) {
    function tryToCloseContactUsDialog() {
        setIsContactUsDialogOpen(false);
    }

    return (
        <>
            <LivguardDialog
                isDialogOpen={isContactUsDialogOpen}
                tryToCloseDialog={tryToCloseContactUsDialog}
                title={"Filter"}
                showCloseIcon={true}
            >
                <div className="tw-place-self-center tw-w-full tw-grid tw-grid-flow-row tw-gap-y-6">
                    <div>
                        <FormSelectComponent
                            items={Object.keys(brandBatteries)}
                            itemBuilder={(item) => {
                                return item == "" ? getVernacularString("38a5a09b-8b40-42ea-8d49-52cce1c949c2", userPreferences.language) : item;
                            }}
                            value={selectedBrand}
                            setValue={(item) => {
                                setApplyChanges(false);
                                setSelectedSegment("");
                                setSelectedModel("");
                                setSelectedFuel("");
                                if (item != "") {
                                    setSelectedBrand(item);
                                    return;
                                }

                                setSelectedBrand("");
                            }}
                            buttonClassName="disabled:tw-bg-[#aeaeae]"
                        />
                    </div>
                    <div>
                        <FormSelectComponent
                            items={selectedBrand == "" ? [] : Object.keys(brandBatteries[selectedBrand])}
                            itemBuilder={(item) => {
                                return item == "" ? getVernacularString("89d6339c-70c9-4b06-aada-fc1800ed6018", userPreferences.language) : item;
                            }}
                            value={selectedSegment}
                            setValue={(item) => {
                                setApplyChanges(false);
                                setSelectedModel("");
                                setSelectedFuel("");
                                if (item != "") {
                                    setSelectedSegment(item);
                                    return;
                                }

                                setSelectedSegment("");
                            }}
                            disabled={selectedBrand == ""}
                            buttonClassName="disabled:tw-bg-[#aeaeae]"
                        />
                    </div>
                    <div>
                        <FormSelectComponent
                            items={selectedBrand == "" || selectedSegment == "" ? [] : Object.keys(brandBatteries[selectedBrand][selectedSegment])}
                            itemBuilder={(item) => {
                                return item == "" ? getVernacularString("c7f85209-525c-4954-8450-f5dd4b3c3d1e", userPreferences.language) : item;
                            }}
                            value={selectedModel}
                            setValue={(item) => {
                                setApplyChanges(false);
                                setSelectedFuel("");
                                if (item != "") {
                                    setSelectedModel(item);
                                    return;
                                }

                                setSelectedModel("");
                            }}
                            disabled={selectedBrand == "" || selectedSegment == ""}
                            buttonClassName="disabled:tw-bg-[#aeaeae]"
                        />
                    </div>

                    <div>
                        <FormSelectComponent
                            items={selectedBrand == "" || selectedSegment == "" || selectedModel == "" ? [] : Object.keys(brandBatteries[selectedBrand][selectedSegment][selectedModel])}
                            itemBuilder={(item) => {
                                return item == "" ? getVernacularString("9e1abe1a-e9ab-47a1-ae4a-36b66a06af82", userPreferences.language) : item;
                            }}
                            value={selectedFuel}
                            setValue={(item) => {
                                setApplyChanges(false);
                                if (item != "") {
                                    setSelectedFuel(item);
                                    return;
                                }

                                setSelectedFuel("");
                            }}
                            disabled={selectedBrand == "" || selectedSegment == "" || selectedModel == ""}
                            buttonClassName="disabled:tw-bg-[#aeaeae]"
                        />
                    </div>

                    <div
                        onClick={() => {
                            setApplyChanges(true);
                            tryToCloseContactUsDialog();
                        }}
                    >
                        <button
                            className="lg-cta-button tw-w-full"
                            // disabled={selectedBrand == "" || selectedSegment == "" || selectedModel == ""}
                            onClick={() => {
                                setApplyChanges(true);
                                setAppliedBrand(selectedBrand);
                                setAppliedSegment(selectedSegment);
                                setAppliedModel(selectedModel);
                                setAppliedFuel(selectedFuel);
                            }}
                        >
                            {getVernacularString("85423d3b-8623-4b4b-b4f1-48953aa4fee7", userPreferences.language)}
                        </button>
                    </div>
                </div>
            </LivguardDialog>
        </>
    );
}