import type {LoaderFunction, V2_MetaFunction} from "@remix-run/node";
import {Response} from "@remix-run/node";
import React, {useState} from "react";
import {CircleFill, StarFill} from "react-bootstrap-icons";
import {useLoaderData} from "react-router";
import {ProductCardComponent, SocialHandles} from "~/components/category/common";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {FixedWidthImage} from "~/components/images/fixedWidthImage";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {PageScaffold} from "~/components/pageScaffold";
import {ProductAndCategoryBottomBar} from "~/components/productAndCategoryBottomBar";
import {ProductInfoCarousel} from "~/components/productInfoCarousel";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {getNonEmptyStringFromUnknown} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {concatenateNonNullStringsWithSpaces, getIntegerArrayOfLength} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import type {ProductDetails, ProductDetailsRecommendedProduct} from "~/productData";
import {ProductType, allProductDetails} from "~/productData";
import {ContactUsCta, DealerLocator, FaqSection, TransformingLives} from "~/routes";
import {ChooseBestInverterBattery} from "~/routes/__category/inverter-batteries";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {UserPreferences} from "~/typeDefinitions";
import {Language} from "~/typeDefinitions";
import {getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {addVernacularString, getVernacularString} from "~/vernacularProvider";

export const meta: V2_MetaFunction = ({data: loaderData}: {data: LoaderData}) => {
    return [
        {
            tagName: "link",
            rel: "canonical",
            href: loaderData.productData.metadata.canonicalUrl,
        },
        {
            title: loaderData.productData.metadata.title,
        },
        {
            name: "description",
            content: loaderData.productData.metadata.description,
        },
        {
            property: "og:url",
            content: `https://www.livguard.com/products/${loaderData.productData.slug}`,
        },
        {
            property: "og:title",
            content: loaderData.productData.metadata.title,
        },
        {
            property: "og:description",
            content: loaderData.productData.metadata.description,
        },
        {
            property: "og:site_name",
            content: "Livguard",
        },
        {
            property: "og:type",
            content: "website",
        },
        {
            property: "og:image",
            content: getMetadataForImage(`/livguard/products/${loaderData.productData.slug}/thumbnail.png`).finalUrl,
        },
    ];
};

type LoaderData = {
    userPreferences: UserPreferences;
    redirectTo: string;
    productData: ProductDetails;
    pageUrl: string;
};

export const loader: LoaderFunction = async ({request, params}) => {
    const userPreferences = await getUserPreferencesFromCookiesAndUrlSearchParameters(request);
    if (userPreferences instanceof Error) {
        throw userPreferences;
    }

    const productId = getNonEmptyStringFromUnknown(params.productId as string);

    const productData = allProductDetails[productId];
    if (productData == null) {
        throw new Response(null, {status: 404});
    }

    const loaderData: LoaderData = {
        userPreferences: userPreferences,
        redirectTo: getRedirectToUrlFromRequest(request),
        productData: productData[userPreferences.language],
        pageUrl: getUrlFromRequest(request),
    };

    return loaderData;
};

export default function () {
    const {userPreferences, redirectTo, productData, pageUrl} = useLoaderData() as LoaderData;

    const utmSearchParameters = useUtmSearchParameters();

    // Hack 48af9f18-d006-44b5-88fc-bf514c7d4b67
    // TODO: This is a very ugly hack, see if there is some other way around this
    let breadcrumbLastContentId;
    const modelNumber = productData.humanReadableModelNumber;

    breadcrumbLastContentId = "a3c3f514-2bf9-401e-9351-d921d4f1cbe4";
    addVernacularString(breadcrumbLastContentId, {
        [Language.English]: modelNumber,
        [Language.Hindi]: modelNumber,
    });
    // /Hack

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
                    productData.type == ProductType.inverter
                        ? {contentId: "377e65a0-631b-4188-b63a-7ae3661bbe85", link: "/inverter-for-home"}
                        : productData.type == ProductType.battery
                        ? {contentId: "09b8631b-98e0-4ae8-bafb-65bb57001872", link: "/inverter-batteries"}
                        : productData.type == ProductType.combo
                        ? {contentId: "377e65a0-631b-4188-b63a-7ae3661bbe85", link: "/inverter-for-home"}
                        : {contentId: "377e65a0-631b-4188-b63a-7ae3661bbe85", link: "/inverter-for-home"},
                    // TODO: Somehow get this to work
                    // {contentId: getSingletonValueOrNull(productData.specifications.filter(specification => specification.title == "Model Number"))?.value ?? "7f1b0663-3535-464c-86c9-78967d00dcc8", link: "#"},
                    {contentId: breadcrumbLastContentId, link: "#"},
                ]}
            >
                <ProductPage
                    userPreferences={userPreferences}
                    productData={productData}
                    utmParameters={utmSearchParameters}
                    pageUrl={pageUrl}
                />
            </PageScaffold>

            <ProductAndCategoryBottomBar
                userPreferences={userPreferences}
                utmParameters={utmSearchParameters}
                pageUrl={pageUrl}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: productData.metadata.schema,
                }}
            />
        </>
    );
}

function ProductPage({
    userPreferences,
    productData,
    utmParameters,
    pageUrl,
}: {
    userPreferences: UserPreferences;
    productData: ProductDetails;
    utmParameters: {
        [searchParameter: string]: string;
    };
    pageUrl: string;
}) {
    return (
        <>
            <VerticalSpacer className="tw-h-10" />

            <ProductInfo
                userPreferences={userPreferences}
                productDetails={productData}
                utmParameters={utmParameters}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
                pageUrl={pageUrl}
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <ProductSpecifications
                userPreferences={userPreferences}
                productDetails={productData}
                className="lg:tw-px-[72px] xl:tw-px-[120px] tw-w-full tw-max-w-7xl tw-mx-auto"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <ProductDescription
                userPreferences={userPreferences}
                productDescription={productData.productDescription}
                className="lg:tw-px-[72px] xl:tw-px-[120px] tw-max-w-7xl tw-mx-auto"
            />

            {/* <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <ProductRating
                userPreferences={userPreferences}
                reviews={productData.reviews}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
            /> */}

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <TransformingLives
                userPreferences={userPreferences}
                className="lg:tw-pl-[72px] xl:tw-pl-[120px] tw-max-w-7xl tw-mx-auto"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <div className="tw-grid tw-grid-cols-1 tw-grid-rows-2 lg:tw-grid-cols-[minmax(0,2fr),minmax(0,3fr)] lg:tw-grid-rows-1 tw-gap-y-10 tw-gap-x-4 lg:tw-px-[72px] xl:tw-px-[120px] lg:tw-items-center tw-max-w-7xl tw-mx-auto">
                <DealerLocator
                    userPreferences={userPreferences}
                    showCtaButton={true}
                    className="tw-row-start-1 lg:tw-row-span-full lg:tw-col-start-1 lg:tw-h-full lg:tw-min-h-[36rem]"
                />

                <ChooseBestInverterBattery
                    userPreferences={userPreferences}
                    utmParameters={utmParameters}
                    className="tw-row-start-2 lg:tw-col-start-2 lg:tw-row-start-1"
                    productType={productData.type}
                    productSubType={productData.subType}
                />
            </div>

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <SuggestedProducts
                userPreferences={userPreferences}
                recommendedProducts={productData.recommendedProducts}
                className="lg:tw-px-[72px] xl:tw-px-[120px] tw-max-w-7xl tw-mx-auto"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <FaqSection
                userPreferences={userPreferences}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <SocialHandles
                userPreferences={userPreferences}
                heading={{text1: "homeS11H1T1", text2: "homeS11H1T2"}}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />
        </>
    );
}

function ProductInfo({
    userPreferences,
    productDetails,
    className,
    utmParameters,
    pageUrl,
}: {
    userPreferences: UserPreferences;
    productDetails: ProductDetails;
    className?: string;
    utmParameters: {
        [searchParameter: string]: string;
    };
    pageUrl: string;
}) {
    const [mainImageIndex, setMainImageIndex] = useState(0);

    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge tw-max-w-7xl tw-mx-auto", className)}>
            <div className="tw-grid tw-grid-cols-1 tw-grid-rows-[minmax(0,1fr),auto] lg:tw-grid-cols-[minmax(0,4fr),minmax(0,3fr)] lg:tw-grid-rows-1 tw-justify-items-center tw-text-center tw-gap-2">
                <div className="tw-grid tw-grid-cols-1 tw-grid-rows-[minmax(0,1fr),auto] lg:tw-grid-cols-[auto,minmax(0,1fr)] lg:tw-grid-rows-1 tw-row-start-1 lg:tw-col-start-1 tw-gap-2 tw-w-full">
                    <div className="tw-row-start-1 lg:tw-col-start-2 lg:tw-pr-10">
                        <DefaultElementAnimation>
                            <FullWidthImage
                                relativePath={productDetails.images[mainImageIndex].image}
                                className="tw-rounded-lg"
                                key={productDetails.images[mainImageIndex].image}
                            />
                        </DefaultElementAnimation>
                    </div>
                    <div className="tw-row-start-2 lg:tw-col-start-1 lg:tw-row-start-1 tw-gap-4 tw-flex tw-flex-row lg:tw-flex-col">
                        <ItemBuilder
                            items={productDetails.images}
                            itemBuilder={(image, imageIndex) => (
                                <div
                                    className="tw-rounded-lg tw-h-[80px] tw-max-h-[80px] tw-max-w-[80px] tw-w-[80px] hover:tw-cursor-pointer"
                                    onClick={() => setMainImageIndex(imageIndex)}
                                    key={imageIndex}
                                >
                                    <FullWidthImage
                                        relativePath={image.image}
                                        className={`tw-rounded-lg ${imageIndex == mainImageIndex ? "lg-border-primary-500 tw-border-2" : ""}`}
                                    />
                                </div>
                            )}
                        />
                    </div>
                </div>

                <div className="tw-flex tw-flex-col tw-row-start-2 lg:tw-col-start-2 lg:tw-row-start-1">
                    <VerticalSpacer className="tw-h-4" />

                    <h1 className="lg-text-title1 tw-text-left">
                        {productDetails.title} <span className="tw-italic">{productDetails.subTitle} </span>
                    </h1>

                    <VerticalSpacer className="tw-h-4" />

                    <div className="tw-text-left">{productDetails.description}</div>

                    <VerticalSpacer className="tw-h-8" />

                    <div className="tw-grid tw-grid-cols-[minmax(0,1fr),auto,minmax(0,1fr),auto,minmax(0,1fr),auto,minmax(0,1fr)] tw-gap-2">
                        <ItemBuilder
                            items={productDetails.productIcons}
                            itemBuilder={(icon, iconIndex) => (
                                <React.Fragment key={iconIndex}>
                                    <div className="tw-flex tw-flex-col tw-gap-2 tw-justify-start tw-items-center tw-h-full">
                                        <div className="tw-w-10 tw-h-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-items-center tw-justify-center">
                                            <FixedWidthImage
                                                relativePath={icon.icon}
                                                width="1.5rem"
                                            />
                                        </div>
                                        <div className="tw-text-center tw-place-items-start">{icon.text}</div>
                                    </div>

                                    {iconIndex < productDetails.productIcons.length - 1 && <div className="tw-w-full tw-border lg-border-secondary-900"></div>}
                                </React.Fragment>
                            )}
                        />
                    </div>

                    <VerticalSpacer className="tw-h-8" />

                    <ContactUsCta
                        userPreferences={userPreferences}
                        textVernacId="landingPage1S1T3"
                        utmParameters={utmParameters}
                        className="tw-place-self-center lg:tw-place-self-start"
                        pageUrl={pageUrl}
                    />
                </div>
            </div>
        </div>
    );
}

function ProductSpecifications({userPreferences, productDetails, className}: {userPreferences: UserPreferences; productDetails: ProductDetails; className: string}) {
    const [selectedTab, setSelectedTab] = useState("specifications");

    const getDataFromProductDetails = (tab: string) => {
        if (tab == "specifications") {
            return productDetails.specifications;
        } else if (tab == "features") {
            return productDetails.features;
        } else if (tab == "additionalInfo") {
            return productDetails.additionalInfo;
        } else {
            throw Error("value not found");
        }
    };

    const visibleTabs = [];
    if (productDetails.specifications.length > 0) {
        visibleTabs.push({
            title: `${getVernacularString("productPageSpecifications", userPreferences.language)}`,
            value: "specifications",
        });
    }
    if (productDetails.features.length > 0) {
        visibleTabs.push({
            title: `${getVernacularString("productPageFeatures", userPreferences.language)}`,
            value: "features",
        });
    }
    if (productDetails.additionalInfo.length > 0) {
        visibleTabs.push({
            title: `${getVernacularString("productPageAdditionalInfo", userPreferences.language)}`,
            value: "additionalInfo",
        });
    }

    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-flex tw-flex-col tw-gap-4", className)}>
            <div className="lg-px-screen-edge">
                <div
                    className={concatenateNonNullStringsWithSpaces(
                        "tw-grid tw-gap-2 tw-border-b tw-py-2",
                        visibleTabs.length == 1
                            ? "tw-grid-cols-[minmax(0,1fr)"
                            : visibleTabs.length == 2
                            ? "tw-grid-cols-[minmax(0,1fr),auto,minmax(0,1fr)]"
                            : "tw-grid-cols-[minmax(0,1fr),auto,minmax(0,1fr),auto,minmax(0,1fr)]",
                    )}
                >
                    <ItemBuilder
                        items={visibleTabs}
                        itemBuilder={(item, itemIndex) => (
                            <div
                                className="tw-flex tw-flex-col tw-gap-1 tw-justify-center tw-items-center"
                                onClick={() => setSelectedTab(item.value)}
                                key={itemIndex}
                            >
                                <div className={`tw-cursor-pointer ${item.value == selectedTab ? "tw-underline tw-underline-offset-4" : "lg-text-secondary-700"}`}>{item.title}</div>
                            </div>
                        )}
                        spaceBuilder={(spaceIndex) => (
                            <div
                                className="tw-w-full tw-border"
                                key={spaceIndex}
                            />
                        )}
                    />
                </div>
            </div>

            <div className="tw-flex tw-flex-col">
                <ItemBuilder
                    items={getDataFromProductDetails(selectedTab)}
                    itemBuilder={(item, itemIndex) => (
                        <React.Fragment key={itemIndex}>
                            {selectedTab == "specifications" ? (
                                <div className={`tw-grid tw-grid-cols-2 lg-px-screen-edge tw-py-2 tw-items-center tw-text-left ${itemIndex % 2 == 0 ? "lg-bg-secondary-300" : ""}`}>
                                    <div className="tw-col-start-1 tw-font-bold">{item.title}</div>
                                    <div className="tw-col-start-2">{item.value}</div>
                                </div>
                            ) : selectedTab == "features" ? (
                                <div className={`lg-px-screen-edge tw-flex tw-flex-row tw-py-2 tw-items-center tw-gap-2 tw-text-left ${itemIndex % 2 == 0 ? "lg-bg-secondary-300" : ""}`}>
                                    <div className="tw-w-2">
                                        <CircleFill className="tw-w-1.5 tw-h-1.5 lg-bg-secondary-100 tw-rounded-full" />
                                    </div>

                                    <div>{item.value}</div>
                                </div>
                            ) : (
                                <div className={`tw-grid tw-grid-cols-2 lg-px-screen-edge tw-py-2 tw-items-center tw-text-left ${itemIndex % 2 == 0 ? "lg-bg-secondary-300" : ""}`}>
                                    <div className="tw-col-start-1 tw-font-bold">{item.title}</div>
                                    <div className="tw-col-start-2">{item.value}</div>
                                </div>
                            )}
                        </React.Fragment>
                    )}
                />
            </div>
        </div>
    );
}

function ProductDescription({
    userPreferences,
    productDescription,
    className,
}: {
    userPreferences: UserPreferences;
    productDescription: {description: string; images: Array<{image: string}>};
    className: string;
}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge tw-flex-tw-flex-col", className)}>
            <div className="lg-text-headline tw-text-center">{getVernacularString("productPageProductDescription", userPreferences.language)}</div>

            <VerticalSpacer className="tw-h-6" />

            <div className="tw-text-center">{productDescription.description}</div>

            <VerticalSpacer className="tw-h-6" />

            <div className="tw-flex tw-flex-col lg:tw-hidden">
                <ItemBuilder
                    items={productDescription.images}
                    itemBuilder={(image, imageIndex) => (
                        <React.Fragment key={imageIndex}>
                            <div className="tw-rounded-lg tw-w-full">
                                <FullWidthImage
                                    relativePath={image.image}
                                    className="tw-rounded-lg"
                                />
                            </div>

                            <VerticalSpacer className="tw-h-4" />
                        </React.Fragment>
                    )}
                />
            </div>
            {productDescription.images.length > 1 ? (
                <div className="tw-hidden lg:tw-block">
                    <ProductInfoCarousel items={productDescription.images} />
                </div>
            ) : (
                productDescription.images.length === 1 && (
                    <div className="tw-hidden lg:tw-grid lg:tw-grid-flow-col lg:tw-auto-cols-[45%] lg:tw-justify-center">
                        <div className="tw-rounded-lg tw-w-full">
                            <FullWidthImage
                                relativePath={productDescription.images[0].image}
                                className="tw-rounded-lg"
                            />
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

function ProductRating({userPreferences, reviews, className}: {userPreferences: UserPreferences; reviews: {rating: number; numberOfReviews: number}; className: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge", className)}>
            <div className="tw-grid tw-grid-rows-[auto,auto] lg:tw-grid-rows-1 lg:tw-grid-cols-2 tw-items-center tw-gap-2 lg:tw-gap-4">
                <div className="tw-row-start-1 tw-col-start-1 tw-flex tw-flex-col tw-text-center tw-justify-center lg:tw-place-self-end">
                    <div className="tw-text-[96px] tw-leading-[90px] lg-font-brueur">{reviews.rating}</div>

                    <div className="lg-text-title2">{`${getVernacularString("productPageNumberReviewBefore", userPreferences.language)} ${reviews.numberOfReviews} ${getVernacularString(
                        "productPageNumberReviewAfter",
                        userPreferences.language,
                    )}`}</div>

                    <VerticalSpacer className="tw-h-2" />

                    <div className="tw-flex tw-flex-row tw-gap-x-2 tw-justify-center">
                        <ItemBuilder
                            items={getIntegerArrayOfLength(5)}
                            itemBuilder={(_, itemIndex) => (
                                <StarFill
                                    className={concatenateNonNullStringsWithSpaces("tw-w-4 tw-h-4", itemIndex + 1 <= reviews.rating ? "lg-text-primary-500" : "lg-text-secondary-300")}
                                    key={itemIndex}
                                />
                            )}
                        />
                    </div>
                </div>

                <div className="tw-row-start-2 lg:tw-row-start-1 lg:tw-col-start-2 lg:tw-max-w-[25rem] tw-flex tw-flex-col tw-items-center tw-w-full lg-bg-secondary-100 tw-rounded-lg tw-p-2 tw-px-4 tw-gap-2">
                    <ItemBuilder
                        items={[
                            {
                                startRating: 5,
                                percentage: 90,
                            },
                            {
                                startRating: 4,
                                percentage: 50,
                            },
                            {
                                startRating: 3,
                                percentage: 30,
                            },
                            {
                                startRating: 2,
                                percentage: 15,
                            },
                        ]}
                        itemBuilder={(rating, ratingIndex) => (
                            <div
                                className="tw-grid tw-w-full tw-grid-cols-[minmax(0,2fr),minmax(0,5fr)] tw-gap-4 tw-items-center"
                                key={ratingIndex}
                            >
                                <div className="tw-col-start-1 tw-text-center lg-text-secondary-700">{`${rating.startRating} Star`}</div>
                                <div className="tw-w-full tw-col-start-2 lg-bg-secondary-300 tw-rounded-lg tw-h-[8px]">
                                    <div
                                        className={`tw-bg-gradient-to-r tw-from-[#F25F60] tw-to-[#EB2A2B]
                                        ${rating.startRating == 5 ? "tw-w-[90%]" : rating.startRating == 4 ? "tw-w-[60%]" : rating.startRating == 3 ? "tw-w-[40%]" : "tw-w-[25%]"}
                                        tw-h-full tw-rounded-lg`}
                                    ></div>
                                </div>
                            </div>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

function SuggestedProducts({userPreferences, recommendedProducts, className}: {userPreferences: UserPreferences; recommendedProducts: Array<ProductDetailsRecommendedProduct>; className: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge", className)}>
            <div className="tw-flex tw-flex-col">
                <div className="lg-text-headline tw-text-center">
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("productPageSuggestedProduct", userPreferences.language)}} />
                    </DefaultTextAnimation>
                </div>
            </div>

            <VerticalSpacer className="tw-h-10" />

            <div className="tw-grid max-lg:tw-grid-cols-[minmax(0,1fr),minmax(0,1fr)] tw-grid-rows-[minmax(0,1fr),minmax(0,1fr)] lg:tw-grid-rows-1 lg:tw-grid-flow-col lg:tw-auto-cols-[15.875rem] lg:tw-justify-center tw-gap-x-3 tw-gap-y-10">
                <ItemBuilder
                    items={recommendedProducts}
                    itemBuilder={(recommendedProduct, recommendedProductIndex) => (
                        <div
                            className={`lg-bg-secondary-100 tw-rounded-lg`}
                            key={recommendedProductIndex}
                        >
                            <ProductCardComponent
                                recommendedProduct={recommendedProduct}
                                key={recommendedProductIndex}
                                userPreferences={userPreferences}
                            />
                        </div>
                    )}
                />
            </div>

            {/* <VerticalSpacer className="tw-h-6" />

            <DefaultElementAnimation>
                <div className="lg-cta-outline-button">{getVernacularString("categoryBatteriesS6Buttontext", userPreferences.language)}</div>
            </DefaultElementAnimation> */}
        </div>
    );
}
