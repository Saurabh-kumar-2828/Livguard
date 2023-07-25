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
import {StickyBottomBar} from "~/components/bottomBar";
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
                <BusAndTruckBatteriesPage userPreferences={userPreferences} />
            </PageScaffold>

            <ProductAndCategoryBottomBar
                userPreferences={userPreferences}
                utmParameters={utmSearchParameters}
                pageUrl={pageUrl}
            />
        </>
    );
};

function BusAndTruckBatteriesPage({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <>
            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-x-16 tw-items-start tw-justify-center">
                <HeroSection
                    userPreferences={userPreferences}
                    className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
                />

                <VerticalSpacer className="tw-h-10 tw-row-start-2 tw-col-start-1 lg:tw-col-span-full" />

                <SuperiorFeatures
                    userPreferences={userPreferences}
                    className="tw-row-start-3 tw-col-start-1 lg-px-screen-edge-2 lg:tw-px-0 tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-4 tw-col-start-1 lg:tw-col-span-full" />

                <ExploreOurBusAndTruckBatteries
                    userPreferences={userPreferences}
                    className="tw-row-start-5 lg:tw-col-span-full tw-w-full tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-6 tw-col-start-1 lg:tw-col-span-full" />

                <div className="tw-row-start-7 tw-grid lg:tw-grid-cols-[minmax(0,1fr)_minmax(0,2fr)] tw-col-span-full lg:lg-px-screen-edge-2 tw-gap-x-5 tw-max-w-7xl tw-mx-auto">
                    <WeAreEverywhere
                        userPreferences={userPreferences}
                        className="tw-row-start-5 lg:tw-col-start-1 lg:tw-h-full"
                        showCtaButton={true}
                    />

                    <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-6 lg:tw-col-start-1 lg:tw-col-span-full lg:tw-hidden" />

                    <ChooseYourIdealBusAndTruckBattery
                        userPreferences={userPreferences}
                        className="tw-row-start-7 lg:tw-row-start-5 lg:tw-col-start-2"
                    />
                </div>

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[8] tw-col-start-1 lg:tw-col-span-full" />

                <FaqSection
                    userPreferences={userPreferences}
                    className="tw-row-start-[9] lg:tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px] tw-max-w-7xl"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[10] tw-col-start-1 lg:tw-col-span-full" />

                <SocialHandles
                    userPreferences={userPreferences}
                    heading={{text1: "b0a3aa40-4b00-4bdd-88e0-67085fafa92b", text2: `c0f802cc-902b-4328-b631-a3fad8fc7d18`}}
                    className="tw-row-start-[11] tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px] tw-gap-[1rem] tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[12] tw-col-start-1 lg:tw-col-span-full" />
            </div>
        </>
    );
}

function HeroSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height)-9.5rem)] lg:tw-h-[70vh] tw-grid tw-grid-rows-[2rem_auto_auto_1rem_auto_1.5rem_minmax(0,1fr)] lg:tw-grid-rows-[5.5rem_auto_auto_1rem_auto_3.5rem_minmax(0,1fr)] tw-text-center lg:tw-text-left lg:tw-grid-cols-2",
                className,
            )}
            ref={ref}
        >
            <div className="tw-row-start-1 tw-col-start-1 tw-row-span-full tw-col-span-full tw-h-full tw-w-full tw-relative">
                {containerWidth == null || containerHeight == null ? null : (
                    <>
                        {/* TODO: Banners update pending from design team */}
                        <CoverImage
                            relativePath={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/two-wheeler/1/banner-mobile.jpg" : "/livguard/two-wheeler/1/banner-desktop.jpg"}
                            key={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/two-wheeler/1/banner-mobile.jpg" : "/livguard/two-wheeler/1/banner-desktop.jpg"}
                        />

                        <img
                            src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/two-wheeler/1/products.png").finalUrl, ImageCdnProvider.Bunny, null, null)}
                            alt="Batteries"
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-absolute ",
                                containerWidth < 1024 ? "tw-bottom-2 tw-inset-x-0 tw-mx-auto tw-h-1/4" : "tw-bottom-2 tw-left-[4rem] tw-h-2/5",
                            )}
                        />
                    </>
                )}
            </div>

            <DefaultTextAnimation className="tw-row-start-2 tw-col-start-1 lg-px-screen-edge-2">
                <div className="lg-text-banner tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">
                    {getVernacularString("67dd15a8-c016-43f0-8715-e7ba18ca5c38", userPreferences.language)}
                </div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-3 tw-col-start-1 lg-px-screen-edge-2">
                <div className="lg-text-banner tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">
                    {getVernacularString("7853d640-7e57-4678-af5d-8631f2ec6cf7", userPreferences.language)}
                </div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-5 tw-col-start-1 lg-px-screen-edge-2">
                <div className="lg-text-body !tw-text-secondary-900-dark">{getVernacularString("cc5f0cf2-f523-4726-83b6-e950d6007ef4", userPreferences.language)}</div>
            </DefaultTextAnimation>
        </div>
    );
}

function SuperiorFeatures({userPreferences, className}: {userPreferences: UserPreferences; className: string}) {
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
            titleTextContentPiece: "70f2a04d-bc31-4848-9509-f77f40137e84",
            bodyTextContentPiece: "fbba1481-db00-4e47-8a74-8382af5b4ac4",
            imageRelativePath: "/livguard/bus-and-truck/2/2.1.png",
        },
        {
            titleTextContentPiece: "75c7f633-bbb4-4a79-bdcb-5b817da7c076",
            bodyTextContentPiece: "c5bf4b2a-a0a8-4d43-9b84-c25c048dd079",
            imageRelativePath: "/livguard/bus-and-truck/2/2.2.png",
        },
        {
            titleTextContentPiece: "3bed811b-de77-40ab-8181-86efbf684059",
            bodyTextContentPiece: "fc26240d-32c8-47bc-a2bf-c29c0a25e6af",
            imageRelativePath: "/livguard/bus-and-truck/2/2.3.png",
        },
        {
            titleTextContentPiece: "70f2a04d-bc31-4848-9509-f77f40137e84",
            bodyTextContentPiece: "fbba1481-db00-4e47-8a74-8382af5b4ac4",
            imageRelativePath: "/livguard/bus-and-truck/2/2.1.png",
        },
        {
            titleTextContentPiece: "75c7f633-bbb4-4a79-bdcb-5b817da7c076",
            bodyTextContentPiece: "c5bf4b2a-a0a8-4d43-9b84-c25c048dd079",
            imageRelativePath: "/livguard/bus-and-truck/2/2.2.png",
        },
        {
            titleTextContentPiece: "3bed811b-de77-40ab-8181-86efbf684059",
            bodyTextContentPiece: "fc26240d-32c8-47bc-a2bf-c29c0a25e6af",
            imageRelativePath: "/livguard/bus-and-truck/2/2.3.png",
        },
    ];

    return (
        <>
            <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg:tw-col-span-full", className)}>
                <DefaultTextAnimation className="tw-flex tw-flex-col tw-items-center lg-text-headline lg:lg-px-screen-edge-2 lg:tw-pl-0 lg:tw-pr-0 tw-text-center lg:tw-text-left">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("853e41c9-26ed-409d-a636-03af2124e7bb", userPreferences.language)}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("dcfc64d7-ca43-4e45-a11a-f0c4fe765152", userPreferences.language)}} />
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

function ExploreOurBusAndTruckBatteries({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const products = [
        allProductDetails["lglff80r"][userPreferences.language],
        allProductDetails["lglff80l"][userPreferences.language],
        allProductDetails["lglff100h29r"][userPreferences.language],
        allProductDetails["lglff100l"][userPreferences.language],
        allProductDetails["lglnff130r"][userPreferences.language],
        allProductDetails["lglff180r"][userPreferences.language],
        allProductDetails["lglnhd150r"][userPreferences.language],
        allProductDetails["lghx8048r"][userPreferences.language],
        allProductDetails["lghx8048l"][userPreferences.language],
        allProductDetails["lghx10048l"][userPreferences.language],
        allProductDetails["lghx10048h29r"][userPreferences.language],
    ];

    const featuredProducts = {
        Humraahi: {
            title: "a504cf0b-8c7c-4afe-b5e2-925f9576d1c0",
            vehicleImageRelativeUrl: "/livguard/bus-and-truck/3/vehicle-1.png",
            productImageRelativeUrl: "/livguard/bus-and-truck/3/product-1.png",
            products: [
                {
                    productType: ProductType.automotiveBattery,
                    name: "LGL FF 80 R",
                    slug: "lglff80r",
                    capacity: products[0].specifications[2].value,
                    warranty: products[0].specifications[1].value,
                    price: "XXXXX",
                },
                {
                    productType: ProductType.automotiveBattery,
                    name: "LGL FF 80 L",
                    slug: "lglff80l",
                    capacity: products[1].specifications[2].value,
                    warranty: products[1].specifications[1].value,
                    price: "XXXXX",
                },
                {
                    productType: ProductType.automotiveBattery,
                    name: "LGL FF 100H29 R",
                    slug: "lglff100h29r",
                    capacity: products[2].specifications[2].value,
                    warranty: products[2].specifications[1].value,
                    imageRelativeUrl: "/livguard/bus-and-truck/3/3.2.png",
                    price: "XXXXX",
                },
                {
                    productType: ProductType.automotiveBattery,
                    name: "LGL FF 100 L",
                    slug: "lglff100l",
                    capacity: products[3].specifications[2].value,
                    warranty: products[3].specifications[1].value,
                    imageRelativeUrl: "/livguard/bus-and-truck/3/3.2.png",
                    price: "XXXXX",
                },
                {
                    productType: ProductType.automotiveBattery,
                    name: "LGLN FF 130 R",
                    slug: "lglnff130r",
                    isBestSeller: true,
                    capacity: products[4].specifications[2].value,
                    warranty: products[4].specifications[1].value,
                    imageRelativeUrl: "/livguard/bus-and-truck/3/3.3.png",
                    price: "XXXXX",
                },
                {
                    productType: ProductType.automotiveBattery,
                    name: "LGL FF 180 R",
                    slug: "lglff180r",
                    capacity: products[5].specifications[2].value,
                    warranty: products[5].specifications[1].value,
                    imageRelativeUrl: "/livguard/bus-and-truck/3/3.3.png",
                    price: "XXXXX",
                },
                {
                    productType: ProductType.automotiveBattery,
                    name: "LGLN HD 150 R",
                    slug: "lglnhd150r",
                    capacity: products[6].specifications[2].value,
                    warranty: products[6].specifications[1].value,
                    imageRelativeUrl: "/livguard/bus-and-truck/3/3.4.png",
                    price: "XXXXX",
                },
            ],
        },
        "Humraahi Xtralife": {
            title: "da25b231-d277-41c9-bd06-494ce7b53ae7",
            vehicleImageRelativeUrl: "/livguard/bus-and-truck/3/vehicle-2.png",
            productImageRelativeUrl: "/livguard/bus-and-truck/3/product-2.png",
            products: [
                {
                    productType: ProductType.automotiveBattery,
                    name: "LGHX 8048 R",
                    slug: "lghx8048r",
                    capacity: products[7].specifications[2].value,
                    warranty: products[7].specifications[1].value,
                    imageRelativeUrl: "/livguard/bus-and-truck/3/3.4.png",
                    price: "XXXXX",
                },
                {
                    productType: ProductType.automotiveBattery,
                    name: "LGHX 8048 L",
                    slug: "lghx8048l",
                    capacity: products[8].specifications[2].value,
                    warranty: products[8].specifications[1].value,
                    imageRelativeUrl: "/livguard/bus-and-truck/3/3.1.png",
                    price: "XXXXX",
                },
                {
                    productType: ProductType.automotiveBattery,
                    name: "LGHX 10048 L",
                    slug: "lghx10048l",
                    capacity: products[9].specifications[2].value,
                    warranty: products[9].specifications[1].value,
                    imageRelativeUrl: "/livguard/bus-and-truck/3/3.2.png",
                    price: "XXXXX",
                },
                {
                    productType: ProductType.automotiveBattery,
                    name: "LGHX 10048H29 R",
                    slug: "lghx10048h29r",
                    capacity: products[10].specifications[2].value,
                    warranty: products[10].specifications[1].value,
                    imageRelativeUrl: "/livguard/bus-and-truck/3/3.2.png",
                    price: "XXXXX",
                },
            ],
        },
    };

    function BatteryCard({
        slug,
        productType,
        userPreferences,
        isBestSeller,
        productName,
        productPrice,
        capacity,
        warranty,
    }: {
        slug: string;
        productType: ProductType;
        userPreferences: UserPreferences;
        isBestSeller?: boolean;
        productName: string;
        productPrice: string;
        capacity: string;
        warranty: string;
    }) {
        return (
            <Link
                to={`/product/${slug}`}
                className="tw-w-full tw-h-full tw-grid tw-grid-cols-1 tw-grid-flow-row tw-grid-rows-[max-content_auto] lg-bg-secondary-100 tw-rounded-lg"
            >
                {isBestSeller != null && isBestSeller === true ? (
                    <div className="tw-row-start-1 tw-h-6 lg-stabilizers-best-seller-gradient tw-rounded-tr-lg tw-place-self-end tw-self-start tw-text-xs tw-px-3 tw-py-1 lg:tw-px-4 tw-flex tw-flex-row tw-items-center !tw-text-secondary-900-dark">
                        <span>{getVernacularString("f22a7acc-0168-4011-9eaf-6a8f3328f093", userPreferences.language)}</span>
                    </div>
                ) : (
                    <VerticalSpacer className="tw-h-6" />
                )}

                <div className="tw-p-4 tw-grid tw-grid-flow-row">
                    <FullWidthImage relativePath={`/product/${productType}/${slug}/thumbnail.png`} />

                    <div className="tw-w-full tw-text-center lg-text-body-bold lg-text-secondary-900">
                        {/* {convertProductInternalNameToPublicName(slug)} */}
                        {productName}
                    </div>

                    <VerticalSpacer className="tw-h-2" />

                    <div className="tw-place-self-center tw-grid tw-grid-cols-[minmax(0,1fr)_auto_0.5rem_70%_minmax(0,1fr)] tw-place-items-center tw-w-full">
                        <img
                            className="tw-col-start-2 tw-invert dark:tw-invert-0"
                            src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/two-wheeler/4/capacity.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
                        />
                        <span className="tw-col-start-4 tw-text-center">{capacity}</span>
                    </div>

                    <VerticalSpacer className="tw-h-2" />

                    <div className="tw-place-self-center tw-grid tw-grid-cols-[minmax(0,1fr)_auto_0.5rem_70%_minmax(0,1fr)] tw-place-items-center tw-w-full">
                        <img
                            className="tw-col-start-2 tw-invert dark:tw-invert-0"
                            src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/two-wheeler/4/warranty.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
                        />
                        <span className="tw-col-start-4 tw-text-center">{warranty}</span>
                    </div>

                    <VerticalSpacer className="tw-h-6" />

                    <div className="tw-w-full tw-text-center lg-text-secondary-700">
                        {`${getVernacularString("48ad8c65-8ec7-4a35-be5f-e73180099178", userPreferences.language)}${productPrice}${getVernacularString(
                            "584c3b75-5cd8-4b82-ba73-b105838035d6",
                            userPreferences.language,
                        )}`}
                    </div>

                    <VerticalSpacer className="tw-h-4" />

                    <button className="lg-cta-outline-button lg-cta-outline-button-transition tw-w-full tw-text-center tw-px-1">
                        {getVernacularString("063dc56b-910e-4a48-acb8-8f52668a4c72", userPreferences.language)}
                    </button>
                </div>
            </Link>
        );
    }

    const humraahiRef = useRef(null);
    const humraahiXtraLifeRef = useRef(null);

    const refs = [humraahiRef, humraahiXtraLifeRef];

    const [isViewMore, setIsViewMore] = useState(false);

    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-px-3", className)}>
            <div className="tw-grid tw-grid-cols-1">
                <DefaultTextAnimation>
                    <h2
                        className="lg-text-headline tw-text-center"
                        dangerouslySetInnerHTML={{__html: getVernacularString("537716c2-f2d4-48af-b779-46cfd71501d7", userPreferences.language)}}
                    />

                    <h2
                        className="lg-text-headline tw-text-center"
                        dangerouslySetInnerHTML={{__html: getVernacularString("8ffe8884-7063-4944-98d1-a54fe742262d", userPreferences.language)}}
                    />
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-6 lg:tw-h-12" />

                {/* <div className="tw-grid tw-grid-cols-[repeat(2,minmax(0,1fr))] lg:tw-grid-cols-[repeat(auto-fill,14.5rem)] lg:tw-grid-flow-row-dense lg:tw-justify-center tw-gap-4 lg:tw-gap-8">
                    {!isViewMore &&
                        featuredProducts.slice(0, 4).map((featuredProduct, featuredProductIndex) => (
                            <BatteryCard
                                slug={featuredProduct.slug}
                                productType={featuredProduct.productType}
                                productName={featuredProduct.name}
                                productPrice={featuredProduct.price}
                                capacity={`${featuredProduct.capacity} Capacity`}
                                warranty={`${featuredProduct.warranty} Warranty`}
                                userPreferences={userPreferences}
                                isBestSeller={featuredProduct.isBestSeller != null ? featuredProduct.isBestSeller : false}
                                key={featuredProductIndex}
                            />
                        ))}

                    {isViewMore &&
                        featuredProducts.map((featuredProduct, featuredProductIndex) => (
                            <BatteryCard
                                slug={featuredProduct.slug}
                                productType={featuredProduct.productType}
                                productName={featuredProduct.name}
                                productPrice={featuredProduct.price}
                                capacity={`${featuredProduct.capacity} Capacity`}
                                warranty={`${featuredProduct.warranty} Warranty`}
                                userPreferences={userPreferences}
                                isBestSeller={featuredProduct.isBestSeller != null ? featuredProduct.isBestSeller : false}
                                key={featuredProductIndex}
                            />
                        ))}
                </div>

                <VerticalSpacer className="tw-h-4 lg:tw-h-8" />

                <button
                    className="lg-cta-button tw-place-self-center"
                    onClick={() => setIsViewMore((prev) => !prev)}
                >
                    {isViewMore
                        ? getVernacularString("ac9a30fb-5654-4692-9995-84c2dbe8301b", userPreferences.language)
                        : getVernacularString("8993dcbc-2216-4dd2-954e-e8145571049f", userPreferences.language)}
                </button> */}
                <SubCategoryProductsInternal
                    userPreferences={userPreferences}
                    refs={refs}
                    featuredProducts={featuredProducts}
                    navigatorsContainerClassName="lg:tw-w-fit tw-grid tw-grid-rows-1 tw-grid-cols-2 lg:tw-grid-rows-1 lg:tw-grid-cols-[auto_auto] lg:tw-grid-flow-col lg:tw-justify-center tw-gap-4"
                    categoriesGridContainerClassName="tw-overflow-hidden"
                    vehicleImageClassName="lg:tw-absolute lg:tw-bottom-0 tw-w-[80%] tw-mx-auto lg:tw-w-[90%]"
                    vehicleImageLeftClassName="tw-left-[-2rem]"
                    vehicleImageRightClassName="tw-right-[-2rem]"
                    productImageClassName="tw-z-[2] tw-absolute tw-bottom-[-0.3125rem] tw-h-[40%] lg:tw-h-[30%]"
                    productImageLeftClassName="lg:tw-left-[5%] tw-left-[2.5rem]"
                    productImageRightClassName="lg:tw-right-[5%] tw-right-[1rem]"
                />
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

function ChooseYourIdealBusAndTruckBattery({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_1rem_auto_1rem_auto_minmax(0,1fr)] ", className)}>
            <div className="tw-row-start-2 tw-text-center lg-text-headline">{getVernacularString("c46c205c-ffdc-4791-a3f9-b4a839925185", userPreferences.language)}</div>
            <div
                className="tw-row-start-3 tw-text-center lg-text-headline"
                dangerouslySetInnerHTML={{__html: getVernacularString("ea7ce343-ef9d-447e-95ff-578d437bcd97", userPreferences.language)}}
            />
            <div className="tw-row-start-5 tw-text-center lg-px-screen-edge-2">{getVernacularString("13754e87-5d5e-46f4-9f02-6f84770a8ec8", userPreferences.language)}</div>

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
                        {getVernacularString("b0a19244-9a60-4fd6-93a7-d0224c9d95d5", userPreferences.language)}
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
                        {getVernacularString("f28967c2-99fe-44dc-96cb-6d926c5ea4df", userPreferences.language)}
                    </div>
                </a>
            </div>

            <VerticalSpacer className="tw-row-start-8 tw-h-6" />

            <Link
                to="/battery-finder"
                className="tw-row-start-9 tw-grid tw-place-items-center"
            >
                <div className="lg-cta-button tw-place-self-center">{getVernacularString("2c8b3327-a317-4ad0-9c09-d6dbb0846c5c", userPreferences.language)}</div>
            </Link>

            <VerticalSpacer className="lg:tw-row-start-10 tw-hidden lg:tw-block lg:tw-h-12" />
        </div>
    );
}

function FaqSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const faqs = [
        {
            question: "2b84c09e-60d6-4590-9f2a-a8b058c94087",
            answer: "0acdb496-94a8-487b-a73d-829546437963",
        },
        {
            question: "3db5b6a7-0861-41ff-8d90-2ffbac60bf69",
            answer: "4023e870-1e78-41f9-a528-2640381c5288",
        },
        {
            question: "7f21538b-0330-4a9b-a3fc-937390f6967a",
            answer: "e0581f37-46a0-472c-94e6-c7205e04d466",
        },
        {
            question: "df814438-bb8d-441c-85b2-55609037be4f",
            answer: "e4e5ac1d-e5a5-4ae8-8a8b-3e05d9264d1b",
        },
        {
            question: "ad3d0c4f-7438-4436-b607-322798870bf8",
            answer: "64eb212f-e988-4ec9-8cd9-c8af0bdb1f63",
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
    appliedBrand,
    setAppliedBrand,
    selectedSegment,
    setSelectedSegment,
    appliedSegment,
    setAppliedSegment,
    selectedModel,
    setSelectedModel,
    appliedModel,
    setAppliedModel,
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
                title={getVernacularString("0dc1ec96-3b51-4314-ab45-9b5b542f66c5", userPreferences.language)}
                showCloseIcon={true}
            >
                <div className="tw-place-self-center tw-w-full tw-grid tw-grid-flow-row tw-gap-y-6">
                    <div>
                        <FormSelectComponent
                            items={Object.keys(brandBatteries)}
                            itemBuilder={(item) => {
                                return item == "" ? getVernacularString("51d56374-4d1d-46c1-8ef1-f72396e12e6a", userPreferences.language) : item;
                            }}
                            value={selectedBrand}
                            setValue={(item) => {
                                setApplyChanges(false);
                                setSelectedSegment("");
                                setSelectedModel("");
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
                                return item == "" ? getVernacularString("5793b8a3-16b1-4c11-bc37-ef5062160855", userPreferences.language) : item;
                            }}
                            value={selectedSegment}
                            setValue={(item) => {
                                setApplyChanges(false);
                                setSelectedModel("");
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
                                return item == "" ? getVernacularString("97f3fc31-1116-46f6-a385-d4df5e25bde1", userPreferences.language) : item;
                            }}
                            value={selectedModel}
                            setValue={(item) => {
                                setApplyChanges(false);
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
                            }}
                        >
                            {getVernacularString("3231d38a-1950-46eb-be3b-76bd8bce6998", userPreferences.language)}
                        </button>
                    </div>
                </div>
            </LivguardDialog>
        </>
    );
}
