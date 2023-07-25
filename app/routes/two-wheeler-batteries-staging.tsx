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
import React, {useEffect, useState} from "react";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ImageCdnProvider} from "~/global-common-typescript/typeDefinitions";
import {FormSelectComponent} from "~/livguard-common-typescript/scratchpad";
import LivguardDialog from "~/components/livguardDialog";
import {StickyBottomBar} from "~/components/bottomBar";
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
                <TwoWheelerBatteriesPage userPreferences={userPreferences} />
            </PageScaffold>

            <StickyBottomBar userPreferences={userPreferences} />

            <ProductAndCategoryBottomBar
                userPreferences={userPreferences}
                utmParameters={utmSearchParameters}
                pageUrl={pageUrl}
            />
        </>
    );
};

function TwoWheelerBatteriesPage({userPreferences}: {userPreferences: UserPreferences}) {
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

                <OurSuggestionsBasedOnYourChoice
                    userPreferences={userPreferences}
                    className="tw-row-start-5 tw-col-start-1 lg:tw-col-span-full tw-w-full"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-6 tw-col-start-1 lg:tw-col-span-full" />

                <TopTwoWheelerBatteryPicks
                    userPreferences={userPreferences}
                    className="tw-row-start-7 lg:tw-col-span-full tw-w-full tw-max-w-7xl tw-mx-auto"
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
                "tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height)-9.5rem)] lg:tw-h-[70vh] tw-grid tw-grid-rows-[2rem_auto_auto_1rem_auto_1.5rem_minmax(0,1fr)] lg:tw-grid-rows-[5.5rem_auto_auto_1rem_auto_3.5rem_minmax(0,1fr)] tw-text-center lg:tw-text-left lg:tw-grid-cols-2",
                className,
            )}
            ref={ref}
        >
            <div className="tw-row-start-1 tw-col-start-1 tw-row-span-full tw-col-span-full tw-h-full tw-w-full tw-relative">
                {containerWidth == null || containerHeight == null ? null : (
                    <>
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
                    {getVernacularString("c106b24b-668c-4bc2-b9fe-747eea24944a", userPreferences.language)}
                </div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-3 tw-col-start-1 lg-px-screen-edge-2">
                <div className="lg-text-banner tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">
                    {getVernacularString("24038be1-0e21-4016-9f8e-17d3d522b20e", userPreferences.language)}
                </div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-5 tw-col-start-1 lg-px-screen-edge-2">
                <div className="lg-text-body !tw-text-secondary-900-dark">{getVernacularString("7751ea6c-f22e-4cbf-b6a7-45dfc655bdc1", userPreferences.language)}</div>
            </DefaultTextAnimation>
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
            titleTextContentPiece: "4136551e-69a6-4500-b475-321dd6b4e658",
            bodyTextContentPiece: "34bb4867-d4f4-434d-a956-e3bb03c23b34",
            imageRelativePath: "/livguard/two-wheeler/2/2.1.png",
        },
        {
            titleTextContentPiece: "701881a3-e5f5-42b7-b41e-118fa30f47e0",
            bodyTextContentPiece: "7aaf5c28-e9df-4665-8aa7-5358869f54e8",
            imageRelativePath: "/livguard/two-wheeler/2/2.2.png",
        },
        {
            titleTextContentPiece: "353cc560-e2f2-4e33-a948-607d46455471",
            bodyTextContentPiece: "fe83636f-3c6f-4450-a329-17edf6e7ea31",
            imageRelativePath: "/livguard/two-wheeler/2/2.3.png",
        },
        {
            titleTextContentPiece: "4136551e-69a6-4500-b475-321dd6b4e658",
            bodyTextContentPiece: "34bb4867-d4f4-434d-a956-e3bb03c23b34",
            imageRelativePath: "/livguard/two-wheeler/2/2.1.png",
        },
        {
            titleTextContentPiece: "701881a3-e5f5-42b7-b41e-118fa30f47e0",
            bodyTextContentPiece: "7aaf5c28-e9df-4665-8aa7-5358869f54e8",
            imageRelativePath: "/livguard/two-wheeler/2/2.2.png",
        },
        {
            titleTextContentPiece: "353cc560-e2f2-4e33-a948-607d46455471",
            bodyTextContentPiece: "fe83636f-3c6f-4450-a329-17edf6e7ea31",
            imageRelativePath: "/livguard/two-wheeler/2/2.3.png",
        },
    ];

    return (
        <>
            <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg:tw-col-span-full", className)}>
                <DefaultTextAnimation className="tw-flex tw-flex-col tw-items-center lg-text-headline lg:lg-px-screen-edge-2 lg:tw-pl-0 lg:tw-pr-0 tw-text-center lg:tw-text-left">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("d3b47f52-f35c-4523-bb3f-0c4a55113f63", userPreferences.language)}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("83e88e8e-82c4-4a1f-9540-6551a24c703c", userPreferences.language)}} />
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

function TopTwoWheelerBatteryPicks({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const featuredProducts = [
        {
            productType: ProductType.automotiveBattery,
            name: "MoRide LGBTX 2.5L",
            slug: "lgbtx2.5l",
            isBestSeller: true,
            capacity: allProductDetails["lgbtx2.5l"][userPreferences.language].specifications[2].value,
            warranty: allProductDetails["lgbtx2.5l"][userPreferences.language].specifications[1].value,
            price: "XXXXX",
        },
        {
            productType: ProductType.automotiveBattery,
            name: "MoRide LGBTX 7L",
            slug: "lgbtx7l",
            capacity: allProductDetails["lgbtx7l"][userPreferences.language].specifications[2].value,
            warranty: allProductDetails["lgbtx7l"][userPreferences.language].specifications[1].value,
            price: "XXXXX",
        },
        {
            productType: ProductType.automotiveBattery,
            name: "MoRide LGBTX 9L",
            price: "XXXXX",
            capacity: allProductDetails["lgbtx9l"][userPreferences.language].specifications[2].value,
            warranty: allProductDetails["lgbtx9l"][userPreferences.language].specifications[1].value,
            slug: "lgbtx9l",
        },
        {
            productType: ProductType.automotiveBattery,
            name: "MoRide LGZ HH TX5",
            price: "XXXXX",
            capacity: allProductDetails["lgzhhtx5"][userPreferences.language].specifications[2].value,
            warranty: allProductDetails["lgzhhtx5"][userPreferences.language].specifications[1].value,
            slug: "lgzhhtx5",
        },
        {
            productType: ProductType.automotiveBattery,
            name: "MoRide LGZ HH TZ4",
            slug: "lgzhhtz4",
            isBestSeller: true,
            capacity: allProductDetails["lgzhhtz4"][userPreferences.language].specifications[2].value,
            warranty: allProductDetails["lgzhhtz4"][userPreferences.language].specifications[1].value,
            price: "XXXXX",
        },
        {
            productType: ProductType.automotiveBattery,
            name: "MoRide LGZ HH TZ5",
            slug: "lgzhhtz5",
            capacity: allProductDetails["lgzhhtz5"][userPreferences.language].specifications[2].value,
            warranty: allProductDetails["lgzhhtz5"][userPreferences.language].specifications[1].value,
            price: "XXXXX",
        },
    ];

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
                className="tw-w-full tw-h-full tw-grid tw-grid-cols-1 tw-grid-flow-row tw-grid-rows-[1.5rem_auto] lg-bg-secondary-100 tw-rounded-lg"
            >
                {isBestSeller != null && isBestSeller === true ? (
                    <div className="tw-row-start-1 tw-h-full lg-stabilizers-best-seller-gradient tw-rounded-tr-lg tw-place-self-end tw-text-xs tw-px-3 tw-py-1 lg:tw-px-4 tw-flex tw-flex-row tw-items-center !tw-text-secondary-900-dark">
                        <span>{getVernacularString("14e0e286-5fd7-43aa-a6f3-5b3b9a0ec71f", userPreferences.language)}</span>
                    </div>
                ) : (
                    <VerticalSpacer className="tw-h-full" />
                )}

                <div className="tw-p-4 tw-grid tw-grid-flow-row">
                    <FullWidthImage
                        relativePath={`/livguard/products/${
                            productType == ProductType.battery
                                ? "batteries"
                                : productType == ProductType.inverter
                                ? "inverters"
                                : productType == ProductType.automotiveBattery
                                ? "automotive-batteries"
                                : "jodis"
                        }/${slug}/thumbnail.png`}
                    />

                    <div className="tw-w-full tw-text-center lg-text-body-bold lg-text-secondary-900">
                        {/* {convertProductInternalNameToPublicName(slug)} */}
                        {productName}
                    </div>

                    <VerticalSpacer className="tw-h-2" />

                    <div className="tw-place-self-center tw-grid tw-grid-cols-[auto_0.5rem_minmax(0,1fr)] tw-items-center">
                        <img
                            className="tw-col-start-1 tw-invert dark:tw-invert-0"
                            src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/two-wheeler/4/capacity.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
                        />
                        <span className="tw-col-start-3">{capacity}</span>
                    </div>

                    <VerticalSpacer className="tw-h-2" />

                    <div className="tw-place-self-center tw-grid tw-grid-cols-[auto_0.5rem_minmax(0,1fr)] tw-items-center">
                        <img
                            className="tw-col-start-1 tw-invert dark:tw-invert-0"
                            src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/two-wheeler/4/warranty.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
                        />
                        <span className="tw-col-start-3">{warranty}</span>
                    </div>

                    <VerticalSpacer className="tw-h-6" />

                    <div className="tw-w-full tw-text-center lg-text-secondary-700">
                        {`${getVernacularString("abce92ec-fd9a-4578-ab56-ddfd9fdafe72", userPreferences.language)}${productPrice}${getVernacularString(
                            "0044b486-6eca-4e3a-abf0-102eede6e10c",
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

    const [isViewMore, setIsViewMore] = useState(false);

    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-px-3", className)}>
            <div className="tw-grid tw-grid-cols-1">
                <DefaultTextAnimation>
                    <h2
                        className="lg-text-headline tw-text-center"
                        dangerouslySetInnerHTML={{__html: getVernacularString("3e16fc04-40ab-4a32-aca8-bb10812fe30d", userPreferences.language)}}
                    />

                    <h2
                        className="lg-text-headline tw-text-center"
                        dangerouslySetInnerHTML={{__html: getVernacularString("52d70e49-05fc-47e2-93c0-104e51b58fbc", userPreferences.language)}}
                    />
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-6 lg:tw-h-12" />

                <div className="tw-grid tw-grid-cols-[repeat(2,minmax(0,1fr))] lg:tw-grid-cols-[repeat(auto-fill,14.5rem)] lg:tw-grid-flow-row-dense lg:tw-justify-center tw-gap-4 lg:tw-gap-8">
                    {!isViewMore && (
                        <>
                            {featuredProducts.slice(0, 4).map((featuredProduct, featuredProductIndex) => (
                                <BatteryCard
                                    slug={featuredProduct.slug}
                                    productType={featuredProduct.productType}
                                    productName={featuredProduct.name}
                                    productPrice={featuredProduct.price}
                                    capacity={`${featuredProduct.capacity} ${getVernacularString("c4c53678-fb9a-41c2-8782-de0690cffdd4", userPreferences.language)}`}
                                    warranty={`${featuredProduct.warranty} ${getVernacularString("95a938d7-dd71-46de-80b0-a417845dfb4d", userPreferences.language)}`}
                                    userPreferences={userPreferences}
                                    isBestSeller={featuredProduct.isBestSeller != null ? featuredProduct.isBestSeller : false}
                                    key={featuredProductIndex}
                                />
                            ))}
                        </>
                    )}

                    {isViewMore &&
                        featuredProducts.map((featuredProduct, featuredProductIndex) => (
                            <BatteryCard
                                slug={featuredProduct.slug}
                                productType={featuredProduct.productType}
                                productName={featuredProduct.name}
                                productPrice={featuredProduct.price}
                                capacity={`${featuredProduct.capacity} ${getVernacularString("c4c53678-fb9a-41c2-8782-de0690cffdd4", userPreferences.language)}`}
                                warranty={`${featuredProduct.warranty} ${getVernacularString("95a938d7-dd71-46de-80b0-a417845dfb4d", userPreferences.language)}`}
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
                </button>
            </div>
        </div>
    );
}

function OurSuggestionsBasedOnYourChoice({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const brandBatteries = {
        Bajaj: {
            Motorcycle: {
                Model1: [
                    {
                        batterySlug: "",
                        imageRelativeUrl: "/livguard/two-wheeler/3/3.1.png",
                        name: "e9d54eec-71d3-4c7e-aa3e-265e7c7db57f",
                        description: "5cce2027-a1dd-4e17-983d-52d22b1dd958",
                        warranty: "211ca435-d909-41ca-8a4a-8ecddfc46a30",
                        capacity: "a5e5e57c-b7a4-498c-a46b-11d7a196ccad",
                        polarity: "5d3c4456-c255-43f1-80cd-17e092379dc7",
                        dimensions: "4b9c2c47-f63d-4641-895d-2fe1f3cc9fc0",
                    },
                    {
                        batterySlug: "",
                        imageRelativeUrl: "/livguard/two-wheeler/3/3.1.png",
                        name: "e9d54eec-71d3-4c7e-aa3e-265e7c7db57f",
                        description: "5cce2027-a1dd-4e17-983d-52d22b1dd958",
                        warranty: "211ca435-d909-41ca-8a4a-8ecddfc46a30",
                        capacity: "a5e5e57c-b7a4-498c-a46b-11d7a196ccad",
                        polarity: "5d3c4456-c255-43f1-80cd-17e092379dc7",
                        dimensions: "4b9c2c47-f63d-4641-895d-2fe1f3cc9fc0",
                    },
                    {
                        batterySlug: "",
                        imageRelativeUrl: "/livguard/two-wheeler/3/3.1.png",
                        name: "e9d54eec-71d3-4c7e-aa3e-265e7c7db57f",
                        description: "5cce2027-a1dd-4e17-983d-52d22b1dd958",
                        warranty: "211ca435-d909-41ca-8a4a-8ecddfc46a30",
                        capacity: "a5e5e57c-b7a4-498c-a46b-11d7a196ccad",
                        polarity: "5d3c4456-c255-43f1-80cd-17e092379dc7",
                        dimensions: "4b9c2c47-f63d-4641-895d-2fe1f3cc9fc0",
                    },
                    {
                        batterySlug: "",
                        imageRelativeUrl: "/livguard/two-wheeler/3/3.1.png",
                        name: "e9d54eec-71d3-4c7e-aa3e-265e7c7db57f",
                        description: "5cce2027-a1dd-4e17-983d-52d22b1dd958",
                        warranty: "211ca435-d909-41ca-8a4a-8ecddfc46a30",
                        capacity: "a5e5e57c-b7a4-498c-a46b-11d7a196ccad",
                        polarity: "5d3c4456-c255-43f1-80cd-17e092379dc7",
                        dimensions: "4b9c2c47-f63d-4641-895d-2fe1f3cc9fc0",
                    },
                ],
                Model2: [
                    {
                        batterySlug: "",
                        imageRelativeUrl: "/livguard/two-wheeler/3/3.1.png",
                        name: "e9d54eec-71d3-4c7e-aa3e-265e7c7db57f",
                        description: "5cce2027-a1dd-4e17-983d-52d22b1dd958",
                        warranty: "211ca435-d909-41ca-8a4a-8ecddfc46a30",
                        capacity: "a5e5e57c-b7a4-498c-a46b-11d7a196ccad",
                        polarity: "5d3c4456-c255-43f1-80cd-17e092379dc7",
                        dimensions: "4b9c2c47-f63d-4641-895d-2fe1f3cc9fc0",
                    },
                    {
                        batterySlug: "",
                        imageRelativeUrl: "/livguard/two-wheeler/3/3.1.png",
                        name: "e9d54eec-71d3-4c7e-aa3e-265e7c7db57f",
                        description: "5cce2027-a1dd-4e17-983d-52d22b1dd958",
                        warranty: "211ca435-d909-41ca-8a4a-8ecddfc46a30",
                        capacity: "a5e5e57c-b7a4-498c-a46b-11d7a196ccad",
                        polarity: "5d3c4456-c255-43f1-80cd-17e092379dc7",
                        dimensions: "4b9c2c47-f63d-4641-895d-2fe1f3cc9fc0",
                    },
                    {
                        batterySlug: "",
                        imageRelativeUrl: "/livguard/two-wheeler/3/3.1.png",
                        name: "e9d54eec-71d3-4c7e-aa3e-265e7c7db57f",
                        description: "5cce2027-a1dd-4e17-983d-52d22b1dd958",
                        warranty: "211ca435-d909-41ca-8a4a-8ecddfc46a30",
                        capacity: "a5e5e57c-b7a4-498c-a46b-11d7a196ccad",
                        polarity: "5d3c4456-c255-43f1-80cd-17e092379dc7",
                        dimensions: "4b9c2c47-f63d-4641-895d-2fe1f3cc9fc0",
                    },
                    {
                        batterySlug: "",
                        imageRelativeUrl: "/livguard/two-wheeler/3/3.1.png",
                        name: "e9d54eec-71d3-4c7e-aa3e-265e7c7db57f",
                        description: "5cce2027-a1dd-4e17-983d-52d22b1dd958",
                        warranty: "211ca435-d909-41ca-8a4a-8ecddfc46a30",
                        capacity: "a5e5e57c-b7a4-498c-a46b-11d7a196ccad",
                        polarity: "5d3c4456-c255-43f1-80cd-17e092379dc7",
                        dimensions: "4b9c2c47-f63d-4641-895d-2fe1f3cc9fc0",
                    },
                    {
                        batterySlug: "",
                        imageRelativeUrl: "/livguard/two-wheeler/3/3.1.png",
                        name: "e9d54eec-71d3-4c7e-aa3e-265e7c7db57f",
                        description: "5cce2027-a1dd-4e17-983d-52d22b1dd958",
                        warranty: "211ca435-d909-41ca-8a4a-8ecddfc46a30",
                        capacity: "a5e5e57c-b7a4-498c-a46b-11d7a196ccad",
                        polarity: "5d3c4456-c255-43f1-80cd-17e092379dc7",
                        dimensions: "4b9c2c47-f63d-4641-895d-2fe1f3cc9fc0",
                    },
                    {
                        batterySlug: "",
                        imageRelativeUrl: "/livguard/two-wheeler/3/3.1.png",
                        name: "e9d54eec-71d3-4c7e-aa3e-265e7c7db57f",
                        description: "5cce2027-a1dd-4e17-983d-52d22b1dd958",
                        warranty: "211ca435-d909-41ca-8a4a-8ecddfc46a30",
                        capacity: "a5e5e57c-b7a4-498c-a46b-11d7a196ccad",
                        polarity: "5d3c4456-c255-43f1-80cd-17e092379dc7",
                        dimensions: "4b9c2c47-f63d-4641-895d-2fe1f3cc9fc0",
                    },
                ],
            },
            Scooter: {
                Model3: [
                    {
                        batterySlug: "",
                        imageRelativeUrl: "/livguard/two-wheeler/3/3.1.png",
                        name: "e9d54eec-71d3-4c7e-aa3e-265e7c7db57f",
                        description: "5cce2027-a1dd-4e17-983d-52d22b1dd958",
                        warranty: "211ca435-d909-41ca-8a4a-8ecddfc46a30",
                        capacity: "a5e5e57c-b7a4-498c-a46b-11d7a196ccad",
                        polarity: "5d3c4456-c255-43f1-80cd-17e092379dc7",
                        dimensions: "4b9c2c47-f63d-4641-895d-2fe1f3cc9fc0",
                    },
                    {
                        batterySlug: "",
                        imageRelativeUrl: "/livguard/two-wheeler/3/3.1.png",
                        name: "e9d54eec-71d3-4c7e-aa3e-265e7c7db57f",
                        description: "5cce2027-a1dd-4e17-983d-52d22b1dd958",
                        warranty: "211ca435-d909-41ca-8a4a-8ecddfc46a30",
                        capacity: "a5e5e57c-b7a4-498c-a46b-11d7a196ccad",
                        polarity: "5d3c4456-c255-43f1-80cd-17e092379dc7",
                        dimensions: "4b9c2c47-f63d-4641-895d-2fe1f3cc9fc0",
                    },
                    {
                        batterySlug: "",
                        imageRelativeUrl: "/livguard/two-wheeler/3/3.1.png",
                        name: "e9d54eec-71d3-4c7e-aa3e-265e7c7db57f",
                        description: "5cce2027-a1dd-4e17-983d-52d22b1dd958",
                        warranty: "211ca435-d909-41ca-8a4a-8ecddfc46a30",
                        capacity: "a5e5e57c-b7a4-498c-a46b-11d7a196ccad",
                        polarity: "5d3c4456-c255-43f1-80cd-17e092379dc7",
                        dimensions: "4b9c2c47-f63d-4641-895d-2fe1f3cc9fc0",
                    },
                    {
                        batterySlug: "",
                        imageRelativeUrl: "/livguard/two-wheeler/3/3.1.png",
                        name: "e9d54eec-71d3-4c7e-aa3e-265e7c7db57f",
                        description: "5cce2027-a1dd-4e17-983d-52d22b1dd958",
                        warranty: "211ca435-d909-41ca-8a4a-8ecddfc46a30",
                        capacity: "a5e5e57c-b7a4-498c-a46b-11d7a196ccad",
                        polarity: "5d3c4456-c255-43f1-80cd-17e092379dc7",
                        dimensions: "4b9c2c47-f63d-4641-895d-2fe1f3cc9fc0",
                    },
                ],
                Model4: [
                    {
                        batterySlug: "",
                        imageRelativeUrl: "/livguard/two-wheeler/3/3.1.png",
                        name: "e9d54eec-71d3-4c7e-aa3e-265e7c7db57f",
                        description: "5cce2027-a1dd-4e17-983d-52d22b1dd958",
                        warranty: "211ca435-d909-41ca-8a4a-8ecddfc46a30",
                        capacity: "a5e5e57c-b7a4-498c-a46b-11d7a196ccad",
                        polarity: "5d3c4456-c255-43f1-80cd-17e092379dc7",
                        dimensions: "4b9c2c47-f63d-4641-895d-2fe1f3cc9fc0",
                    },
                    {
                        batterySlug: "",
                        imageRelativeUrl: "/livguard/two-wheeler/3/3.1.png",
                        name: "e9d54eec-71d3-4c7e-aa3e-265e7c7db57f",
                        description: "5cce2027-a1dd-4e17-983d-52d22b1dd958",
                        warranty: "211ca435-d909-41ca-8a4a-8ecddfc46a30",
                        capacity: "a5e5e57c-b7a4-498c-a46b-11d7a196ccad",
                        polarity: "5d3c4456-c255-43f1-80cd-17e092379dc7",
                        dimensions: "4b9c2c47-f63d-4641-895d-2fe1f3cc9fc0",
                    },
                    {
                        batterySlug: "",
                        imageRelativeUrl: "/livguard/two-wheeler/3/3.1.png",
                        name: "e9d54eec-71d3-4c7e-aa3e-265e7c7db57f",
                        description: "5cce2027-a1dd-4e17-983d-52d22b1dd958",
                        warranty: "211ca435-d909-41ca-8a4a-8ecddfc46a30",
                        capacity: "a5e5e57c-b7a4-498c-a46b-11d7a196ccad",
                        polarity: "5d3c4456-c255-43f1-80cd-17e092379dc7",
                        dimensions: "4b9c2c47-f63d-4641-895d-2fe1f3cc9fc0",
                    },
                    {
                        batterySlug: "",
                        imageRelativeUrl: "/livguard/two-wheeler/3/3.1.png",
                        name: "e9d54eec-71d3-4c7e-aa3e-265e7c7db57f",
                        description: "5cce2027-a1dd-4e17-983d-52d22b1dd958",
                        warranty: "211ca435-d909-41ca-8a4a-8ecddfc46a30",
                        capacity: "a5e5e57c-b7a4-498c-a46b-11d7a196ccad",
                        polarity: "5d3c4456-c255-43f1-80cd-17e092379dc7",
                        dimensions: "4b9c2c47-f63d-4641-895d-2fe1f3cc9fc0",
                    },
                    {
                        batterySlug: "",
                        imageRelativeUrl: "/livguard/two-wheeler/3/3.1.png",
                        name: "e9d54eec-71d3-4c7e-aa3e-265e7c7db57f",
                        description: "5cce2027-a1dd-4e17-983d-52d22b1dd958",
                        warranty: "211ca435-d909-41ca-8a4a-8ecddfc46a30",
                        capacity: "a5e5e57c-b7a4-498c-a46b-11d7a196ccad",
                        polarity: "5d3c4456-c255-43f1-80cd-17e092379dc7",
                        dimensions: "4b9c2c47-f63d-4641-895d-2fe1f3cc9fc0",
                    },
                    {
                        batterySlug: "",
                        imageRelativeUrl: "/livguard/two-wheeler/3/3.1.png",
                        name: "e9d54eec-71d3-4c7e-aa3e-265e7c7db57f",
                        description: "5cce2027-a1dd-4e17-983d-52d22b1dd958",
                        warranty: "211ca435-d909-41ca-8a4a-8ecddfc46a30",
                        capacity: "a5e5e57c-b7a4-498c-a46b-11d7a196ccad",
                        polarity: "5d3c4456-c255-43f1-80cd-17e092379dc7",
                        dimensions: "4b9c2c47-f63d-4641-895d-2fe1f3cc9fc0",
                    },
                ],
            },
        },
    };

    const [selectedBrand, setSelectedBrand] = useState("");
    const [appliedBrand, setAppliedBrand] = useState("");
    const [selectedSegment, setSelectedSegment] = useState("");
    const [appliedSegment, setAppliedSegment] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [appliedModel, setAppliedModel] = useState("");

    const [applyChanges, setApplyChanges] = useState(false);

    const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

    function tryToOpenFilterDialog() {
        setIsFilterDialogOpen(true);
    }

    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full tw-grid tw-grid-flow-row lg-bg-our-suggestions tw-rounded-lg", className)}>
            <VerticalSpacer className="tw-h-6 lg:tw-h-10" />

            <div
                className="lg-text-headline tw-place-self-center"
                dangerouslySetInnerHTML={{__html: getVernacularString("2b42baca-b2b7-489c-b1a2-2d25d18f9ffd", userPreferences.language)}}
            />
            <div className="lg-text-headline tw-place-self-center">{getVernacularString("d4091725-079a-4f18-831c-03cc7bb2ec09", userPreferences.language)}</div>

            <VerticalSpacer className="tw-h-4 lg:tw-h-6" />

            <div className="tw-max-w-7xl tw-mx-auto tw-hidden tw-place-self-center lg:tw-w-full lg:tw-grid lg:tw-grid-flow-col lg:tw-grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] tw-items-center tw-gap-4 lg-px-screen-edge-2">
                <div>{getVernacularString("0dc1ec96-3b51-4314-ab45-9b5b542f66c5", userPreferences.language)}</div>
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
                        buttonClassName="disabled:tw-opacity-[0.4] disabled:!tw-bg-secondary-100-light"
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
                        buttonClassName="disabled:tw-opacity-[0.4] disabled:!tw-bg-secondary-100-light"
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
                        buttonClassName="disabled:tw-opacity-[0.4] disabled:!tw-bg-secondary-100-light"
                    />
                </div>

                <div
                    onClick={() => {
                        setApplyChanges(true);
                        setAppliedBrand(selectedBrand);
                        setAppliedSegment(selectedSegment);
                        setAppliedModel(selectedModel);
                    }}
                >
                    <button className="lg-cta-button">{getVernacularString("3231d38a-1950-46eb-be3b-76bd8bce6998", userPreferences.language)}</button>
                </div>
            </div>

            <div
                className="lg:tw-hidden"
                onClick={tryToOpenFilterDialog}
            >
                <div className="tw-w-fit tw-grid tw-grid-cols-[auto_auto] tw-gap-x-2 lg-bg-secondary-300 tw-p-2 tw-rounded-lg tw-mx-3">
                    <img
                        className="tw-row-start-1 tw-col-start-1"
                        src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/two-wheeler/3/filter.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
                    />
                    <span className="tw-row-start-1 tw-col-start-2 tw-text-center tw-flex tw-items-center">Filter</span>
                </div>
            </div>

            <FilterDialog
                userPreferences={userPreferences}
                isContactUsDialogOpen={isFilterDialogOpen}
                setIsContactUsDialogOpen={setIsFilterDialogOpen}
                brandBatteries={brandBatteries}
                selectedBrand={selectedBrand}
                setSelectedBrand={setSelectedBrand}
                appliedBrand={appliedBrand}
                setAppliedBrand={setAppliedBrand}
                selectedSegment={selectedSegment}
                setSelectedSegment={setSelectedSegment}
                appliedSegment={appliedSegment}
                setAppliedSegment={setAppliedSegment}
                selectedModel={selectedModel}
                setSelectedModel={setSelectedModel}
                appliedModel={appliedModel}
                setAppliedModel={setAppliedModel}
                setApplyChanges={setApplyChanges}
            />

            <VerticalSpacer className="tw-h-4 lg:tw-h-6" />

            <CarouselStyle5
                // @ts-ignore
                items={
                    appliedBrand == "" || appliedSegment == "" || appliedModel == ""
                        ? brandBatteries["Bajaj"]["Motorcycle"]["Model1"].map((battery, batteryIndex) => {
                              return (
                                  <BatteryCard
                                      userPreferences={userPreferences}
                                      batterySlug={battery.batterySlug}
                                      imageRelativeUrl={battery.imageRelativeUrl}
                                      name={getVernacularString(battery.name, userPreferences.language)}
                                      description={getVernacularString(battery.description, userPreferences.language)}
                                      warranty={getVernacularString(battery.warranty, userPreferences.language)}
                                      capacity={getVernacularString(battery.capacity, userPreferences.language)}
                                      polarity={getVernacularString(battery.polarity, userPreferences.language)}
                                      dimensions={getVernacularString(battery.dimensions, userPreferences.language)}
                                      key={batteryIndex}
                                  />
                              );
                          })
                        : brandBatteries[appliedBrand][appliedSegment][appliedModel].map((battery, batteryIndex) => {
                              return (
                                  <BatteryCard
                                      userPreferences={userPreferences}
                                      batterySlug={battery.batterySlug}
                                      imageRelativeUrl={battery.imageRelativeUrl}
                                      name={getVernacularString(battery.name, userPreferences.language)}
                                      description={getVernacularString(battery.description, userPreferences.language)}
                                      warranty={getVernacularString(battery.warranty, userPreferences.language)}
                                      capacity={getVernacularString(battery.capacity, userPreferences.language)}
                                      polarity={getVernacularString(battery.polarity, userPreferences.language)}
                                      dimensions={getVernacularString(battery.dimensions, userPreferences.language)}
                                      key={batteryIndex}
                                  />
                              );
                          })
                }
                slidesContainerClassName="!tw-auto-cols-[100%] lg:!tw-auto-cols-max tw-place-self-center tw-items-center"
                selectedContainerClassName="tw-h-full"
                deselectedContainersClassName="tw-scale-[0.9] tw-h-full"
                key={applyChanges}
            />

            <VerticalSpacer className="tw-h-4 lg:tw-h-10" />
        </div>
    );
}

function BatteryCard({
    userPreferences,
    batterySlug,
    imageRelativeUrl,
    name,
    description,
    warranty,
    capacity,
    polarity,
    dimensions,
}: {
    userPreferences: UserPreferences;
    batterySlug: string;
    imageRelativeUrl: string;
    name: string;
    description: string;
    warranty: string;
    capacity: string;
    polarity: string;
    dimensions: string;
}) {
    return (
        <div className="tw-max-w-3xl tw-mx-auto tw-grid tw-grid-cols-1 lg:tw-grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:tw-gap-x-2 lg-bg-our-suggestions-card tw-rounded-lg tw-px-4 tw-py-3 lg:tw-py-6 lg:tw-px-8">
            <div className="tw-col-start-1 tw-grid tw-grid-flow-row tw-place-items-center">
                <div className="lg:tw-hidden tw-bg-[#c5c5c5] dark:tw-bg-[#3a3a3a] tw-p-2">{getVernacularString("7bcd803f-7cae-427b-9838-8c1966e13b01", userPreferences.language)}</div>
                <div>
                    <FullWidthImage relativePath={imageRelativeUrl} />
                </div>

                <Link
                    className="tw-hidden lg:tw-block"
                    to={batterySlug}
                >
                    <button className="lg-cta-button">{getVernacularString("42bd678d-83ef-4935-a3aa-7e9406887b28", userPreferences.language)}</button>
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
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/two-wheeler/3/warranty-icon.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{getVernacularString("2c6dc668-49ef-4913-88c1-904d6e9be1a2", userPreferences.language)}</div>
                            <div className="tw-row-start-3">{warranty}</div>
                        </div>
                    </div>

                    <div className="tw-row-start-1 tw-col-start-2 md:max-lg:tw-w-full md:max-lg:tw-row-start-2 md:max-lg:tw-col-start-1 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/two-wheeler/3/capacity-icon.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{getVernacularString("c73ece31-e0c3-4b1f-94c5-51d742ae3186", userPreferences.language)}</div>
                            <div className="tw-row-start-3">{capacity}</div>
                        </div>
                    </div>

                    <div className="tw-row-start-2 tw-col-start-1 md:max-lg:tw-w-full md:max-lg:tw-row-start-3 md:max-lg:tw-col-start-1 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/two-wheeler/3/polarity-icon.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{getVernacularString("0bbd2699-d61f-48ee-ae84-491a2ee102eb", userPreferences.language)}</div>
                            <div className="tw-row-start-3">{polarity}</div>
                        </div>
                    </div>

                    <div className="tw-row-start-2 tw-col-start-2 md:max-lg:tw-w-full md:max-lg:tw-row-start-4 md:max-lg:tw-col-start-1 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/two-wheeler/3/dimensions-icon.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{getVernacularString("e44c8c4b-bf5d-412c-9ca4-27552ec79104", userPreferences.language)}</div>
                            <div className="tw-row-start-3">{dimensions}</div>
                        </div>
                    </div>
                </div>

                <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

                <Link
                    className="tw-place-self-center lg:tw-hidden"
                    to={batterySlug}
                >
                    <button className="lg-cta-button">{getVernacularString("42bd678d-83ef-4935-a3aa-7e9406887b28", userPreferences.language)}</button>
                </Link>

                <VerticalSpacer className="tw-h-4 lg:tw-hidden" />
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

function ChooseYourIdealTwoWheelerBattery({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_1rem_auto_1rem_auto_minmax(0,1fr)] ", className)}>
            <div className="tw-row-start-2 tw-text-center lg-text-headline">{getVernacularString("b21c18a0-c411-4c08-adb9-cb1623a207bc", userPreferences.language)}</div>
            <div
                className="tw-row-start-3 tw-text-center lg-text-headline"
                dangerouslySetInnerHTML={{__html: getVernacularString("c0e900e7-59e1-45d8-b317-54988a6051ba", userPreferences.language)}}
            />
            <div className="tw-row-start-5 tw-text-center lg-px-screen-edge-2">{getVernacularString("114a82b5-b299-4bb9-8528-b295394771d8", userPreferences.language)}</div>

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
                        {getVernacularString("b3660763-f092-42d4-a97d-76a34dd701f6", userPreferences.language)}
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
                        {getVernacularString("51ae4bbd-0f66-42bc-b031-cc3e9dc4dc26", userPreferences.language)}
                    </div>
                </a>
            </div>

            <VerticalSpacer className="tw-row-start-8 tw-h-6" />

            <Link
                to="/battery-finder"
                className="tw-row-start-9 tw-grid tw-place-items-center"
            >
                <div className="lg-cta-button tw-place-self-center">{getVernacularString("a1ac20a8-c430-4a35-b262-2ff35b480344", userPreferences.language)}</div>
            </Link>

            <VerticalSpacer className="lg:tw-row-start-10 tw-hidden lg:tw-block lg:tw-h-12" />
        </div>
    );
}

function FaqSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const faqs = [
        {
            question: "03af4bc6-64c9-4819-8b24-32aa3e2ef3f1",
            answer: "9e54904b-adb2-4589-89c9-c1e4c407a454",
        },
        {
            question: "346c1030-2edd-4ba5-94d0-32f877f452be",
            answer: "1e94b867-5da8-4c8c-befe-4d3018a8bb56",
        },
        {
            question: "666f5b25-c71d-41b4-8695-2f2f29a2915c",
            answer: "fb9a1ce5-7522-442d-89b0-10387f9dbecd",
        },
        {
            question: "77454b24-599c-4a4a-a980-abe2ea759eda",
            answer: "44842d1f-5e7a-4ace-83f8-1e02bf0e4b81",
        },
        {
            question: "eb26cf7b-27ef-4778-b611-eaa017322540",
            answer: "2266d6d4-5dfe-4850-bd66-e2fa675eb9a5",
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
                            buttonClassName="disabled:tw-opacity-[0.4] disabled:!tw-bg-secondary-100-light"
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
                            buttonClassName="disabled:tw-opacity-[0.4] disabled:!tw-bg-secondary-100-light"
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
                            buttonClassName="disabled:tw-opacity-[0.4] disabled:!tw-bg-secondary-100-light"
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
