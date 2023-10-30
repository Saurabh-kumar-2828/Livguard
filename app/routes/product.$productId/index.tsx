import type {LoaderFunction, V2_MetaFunction} from "@remix-run/node";
import {Response} from "@remix-run/node";
import React, {useContext, useEffect, useState} from "react";
import {CircleFill, StarFill} from "react-bootstrap-icons";
import {useInView} from "react-intersection-observer";
import {useLoaderData} from "react-router";
import {getProductFromSlug, getProductFromSlugAndLanguage} from "~/backend/product.server";
import {SocialHandles} from "~/components/category/common";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {FixedWidthImage} from "~/components/images/fixedWidthImage";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {PageScaffold} from "~/components/pageScaffold";
import {ProductAndCategoryBottomBar} from "~/components/productAndCategoryBottomBar";
import {ProductInfoCarousel} from "~/components/productInfoCarousel";
import {ProductCardTwoDetails} from "~/components/reusable-components/productCardTwoDetails";
import {SecondaryNavigation} from "~/components/secondaryNavigation";
import {SecondaryNavigationControllerContext} from "~/contexts/secondaryNavigationControllerContext";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {ImageCdnProvider, ImageMetadata} from "~/common--type-definitions/typeDefinitions";
import {getNonEmptyStringFromUnknown} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {concatenateNonNullStringsWithSpaces, getIntegerArrayOfLength} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {SecondaryNavigationController, useSecondaryNavigationController} from "~/hooks/useSecondaryNavigationController";
import type {ProductDetails, ProductType} from "~/productData.types";
import {ContactUsCta, FaqSection, TransformingLives} from "~/routes";
import {DealerLocator} from "~/reusableSections/dealerLocator";
import {ChooseBestInverterBattery} from "~/routes/__category/inverter-batteries";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {UserPreferences} from "~/typeDefinitions";
import {Language} from "~/typeDefinitions";
import {getBreadcrumbsConditionally, getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest, secondaryNavThreshold} from "~/utilities";
import {getContentGenerator} from "~/vernacularProvider";
import {getVernacularFromBackend} from "~/backend/vernacularProvider.server";
import {ContentProviderContext} from "~/contexts/contentProviderContext";
import {getImageMetadataLibraryForPage, getImageMetadataLibraryFromBackend, getMetadataForImageServerSide} from "~/backend/imageMetaDataLibrary.server";
import {ImageProviderContext} from "~/contexts/imageMetaDataContext";

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
            content: loaderData.ogBanner,
        },
        {
            "script:ld+json": loaderData.productData.metadata.schema,
        },
    ];
};

type RecommendedProducts = {
    slug: string;
    productType: ProductType;
    productName: string;
    productPrice: string | null;
    specification1Icon: string;
    specification1: string;
    specification2Icon: string;
    specification2: string;
};

type LoaderData = {
    userPreferences: UserPreferences;
    redirectTo: string;
    productData: ProductDetails;
    recommendedProducts: Array<RecommendedProducts>;
    pageUrl: string;
    vernacularData: {
        [id: string]: string;
    };
    imageMetaDataLibrary: {
        [relativePath: string]: ImageMetadata | undefined;
    };
    ogBanner: string;
    breadcrumbLastContentId: string;
};

export const loader: LoaderFunction = async ({request, params}) => {
    const userPreferences = await getUserPreferencesFromCookiesAndUrlSearchParameters(request);
    if (userPreferences instanceof Error) {
        throw userPreferences;
    }

    const productId = getNonEmptyStringFromUnknown(params.productId as string);

    const productData = getProductFromSlug(productId.toLowerCase());
    if (productData == null) {
        throw new Response(null, {status: 404});
    }

    const recommendedProductsSlug = productData[userPreferences.language].recommendedProducts.map((data) => data.slug);

    const recommendedProducts: Array<RecommendedProducts> = recommendedProductsSlug.map((slug) => {
        return {
            slug: slug,
            productType: getProductFromSlugAndLanguage(slug, userPreferences.language).type,
            productName: getProductFromSlugAndLanguage(slug, userPreferences.language).humanReadableModelNumber,
            productPrice: getProductFromSlugAndLanguage(slug, userPreferences.language).price == null ? null : `${getProductFromSlugAndLanguage(slug, userPreferences.language).price}`,
            specification1Icon: getProductFromSlugAndLanguage(slug, userPreferences.language).productIcons[1].icon,
            specification1: getProductFromSlugAndLanguage(slug, userPreferences.language).productIcons[1].text,
            specification2Icon: getProductFromSlugAndLanguage(slug, userPreferences.language).productIcons[0].icon,
            specification2: getProductFromSlugAndLanguage(slug, userPreferences.language).productIcons[0].text,
        };
    });

    // Hack 48af9f18-d006-44b5-88fc-bf514c7d4b67
    // TODO: This is a very ugly hack, see if there is some other way around this
    let breadcrumbLastContentId = "a3c3f514-2bf9-401e-9351-d921d4f1cbe4";
    const modelNumber = productData[userPreferences.language].humanReadableModelNumber;
    // addVernacularString(breadcrumbLastContentId, {
    //     [Language.English]: modelNumber,
    //     [Language.Hindi]: modelNumber,
    // });
    const vernacularData = {
        ...getVernacularFromBackend("productPage", userPreferences.language),
        [breadcrumbLastContentId]: modelNumber,
    };
    const imageMetaDataLibrary = {
        ...getImageMetadataLibraryForPage(productData[userPreferences.language].images.map((image) => image.image)),
        ...getImageMetadataLibraryForPage(productData[userPreferences.language].productIcons.map((icon) => icon.icon)),
        ...getImageMetadataLibraryForPage(productData[userPreferences.language].productDescription.images.map((image) => image.image)),
        ...getImageMetadataLibraryForPage(productData[userPreferences.language].recommendedProducts.map((product) => `/livguard/products/${product.slug}/thumbnail.png`)),
        ...getImageMetadataLibraryForPage([`/livguard/products/${productData[userPreferences.language].slug}/thumbnail.png`]),
        ...getImageMetadataLibraryFromBackend("productPage"),
    };
    const ogBanner = getAbsolutePathForRelativePath(
        getMetadataForImageServerSide(`/livguard/products/${productData[userPreferences.language].slug}/thumbnail.png`).finalUrl,
        ImageCdnProvider.Bunny,
        null,
        null,
    );

    const loaderData: LoaderData = {
        userPreferences: userPreferences,
        redirectTo: getRedirectToUrlFromRequest(request),
        productData: productData[userPreferences.language],
        pageUrl: getUrlFromRequest(request),
        recommendedProducts: recommendedProducts,
        vernacularData: vernacularData,
        imageMetaDataLibrary: imageMetaDataLibrary,
        ogBanner: ogBanner,
        breadcrumbLastContentId: breadcrumbLastContentId,
    };

    return loaderData;
};

export default function () {
    const {userPreferences, redirectTo, productData, pageUrl, recommendedProducts, vernacularData, imageMetaDataLibrary, breadcrumbLastContentId} = useLoaderData() as LoaderData;

    const utmSearchParameters = useUtmSearchParameters();

    const conditionalBreadcrumb = getBreadcrumbsConditionally(productData.type, productData.subType);
    const secondaryNavigationController = useSecondaryNavigationController();

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
                            {contentId: conditionalBreadcrumb.contentId, link: conditionalBreadcrumb.link},
                            // TODO: Somehow get this to work
                            // {contentId: getSingletonValueOrNull(productData.specifications.filter(specification => specification.title == "Model Number"))?.value ?? "7f1b0663-3535-464c-86c9-78967d00dcc8", link: "#"},
                            {contentId: breadcrumbLastContentId, link: "#"},
                        ]}
                        secondaryNavigationController={secondaryNavigationController}
                    >
                        <SecondaryNavigationControllerContext.Provider value={secondaryNavigationController}>
                            <ProductPage
                                userPreferences={userPreferences}
                                utmParameters={utmSearchParameters}
                                productData={productData}
                                pageUrl={pageUrl}
                                recommendedProducts={recommendedProducts}
                                secondaryNavigationController={secondaryNavigationController}
                            />
                        </SecondaryNavigationControllerContext.Provider>
                    </PageScaffold>

                    <ProductAndCategoryBottomBar
                        userPreferences={userPreferences}
                        utmParameters={utmSearchParameters}
                        pageUrl={pageUrl}
                    />
                </ContentProviderContext.Provider>
            </ImageProviderContext.Provider>
        </>
    );
}

function ProductPage({
    userPreferences,
    productData,
    recommendedProducts,
    utmParameters,
    pageUrl,
    secondaryNavigationController,
}: {
    userPreferences: UserPreferences;
    productData: ProductDetails;
    recommendedProducts: Array<RecommendedProducts>;
    utmParameters: {
        [searchParameter: string]: string;
    };
    pageUrl: string;
    secondaryNavigationController?: SecondaryNavigationController;
}) {
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);
    const contentData = useContext(ContentProviderContext);

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
                className="!tw-w-full tw-col-start-1 lg:tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px] tw-max-w-7xl tw-mx-auto"
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
                recommendedProducts={recommendedProducts}
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
    const contentData = useContext(ContentProviderContext);
    const [mainImageIndex, setMainImageIndex] = useState(0);
    // const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    // const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    // useEffect(() => {
    //     secondaryNavigationController.setSections((previousSections) => ({
    //         ...previousSections,
    //         top: {
    //             humanReadableName: contentData.getContent("9fc64723-0e15-4211-983a-ba03cf9a4d41", userPreferences.language),
    //             isCurrentlyVisible: sectionInView,
    //         },
    //     }));
    // }, [sectionRef, sectionInView]);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge tw-max-w-7xl tw-mx-auto", className)}
            // id="top"
            // ref={sectionRef}
        >
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
    const contentData = useContext(ContentProviderContext);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            specification: {
                humanReadableName: contentData.getContent("cd1f1433-8736-4f1d-a5e6-927e59a02ec2"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

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
            title: `${contentData.getContent("productPageSpecifications")}`,
            value: "specifications",
        });
    }
    if (productDetails.features.length > 0) {
        visibleTabs.push({
            title: `${contentData.getContent("productPageFeatures")}`,
            value: "features",
        });
    }
    if (productDetails.additionalInfo.length > 0) {
        visibleTabs.push({
            title: `${contentData.getContent("productPageAdditionalInfo")}`,
            value: "additionalInfo",
        });
    }

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-flex tw-flex-col tw-gap-4", className)}
            id="specification"
            ref={sectionRef}
        >
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
    const contentData = useContext(ContentProviderContext);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            description: {
                humanReadableName: contentData.getContent("abea43c2-a4ec-471c-ad0b-7f3cf8e42cb3"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-w-full lg-px-screen-edge tw-flex-tw-flex-col", className)}
            id="description"
            ref={sectionRef}
        >
            <div className="lg-text-headline tw-text-center">{contentData.getContent("productPageProductDescription")}</div>

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
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge", className)}>
            <div className="tw-grid tw-grid-rows-[auto,auto] lg:tw-grid-rows-1 lg:tw-grid-cols-2 tw-items-center tw-gap-2 lg:tw-gap-4">
                <div className="tw-row-start-1 tw-col-start-1 tw-flex tw-flex-col tw-text-center tw-justify-center lg:tw-place-self-end">
                    <div className="tw-text-[96px] tw-leading-[90px] lg-font-brueur">{reviews.rating}</div>

                    <div className="lg-text-title2">{`${contentData.getContent("productPageNumberReviewBefore")} ${reviews.numberOfReviews} ${contentData.getContent(
                        "productPageNumberReviewAfter",
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

function SuggestedProducts({userPreferences, recommendedProducts, className}: {userPreferences: UserPreferences; recommendedProducts: Array<RecommendedProducts>; className: string}) {
    const contentData = useContext(ContentProviderContext);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "suggested-products": {
                humanReadableName: contentData.getContent("4e366b86-4e66-47f4-99ef-6a33dc519099"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge", className)}
            id="suggested-products"
            ref={sectionRef}
        >
            <div className="tw-flex tw-flex-col">
                <div className="lg-text-headline tw-text-center">
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: contentData.getContent("productPageSuggestedProduct")}} />
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
                            <ProductCardTwoDetails
                                slug={recommendedProduct.slug}
                                productType={recommendedProduct.productType}
                                exploreProduct={true}
                                isBestSeller={false}
                                imageRelativeUrl={`/livguard/products/${recommendedProduct.slug}/thumbnail.png`}
                                productName={recommendedProduct.productName}
                                productPrice={recommendedProduct.productPrice}
                                specification1Icon={recommendedProduct.specification1Icon}
                                specification1={recommendedProduct.specification1}
                                specification2Icon={recommendedProduct.specification2Icon}
                                specification2={recommendedProduct.specification2}
                                userPreferences={userPreferences}
                            />
                        </div>
                    )}
                />
            </div>

            {/* <VerticalSpacer className="tw-h-6" />

            <DefaultElementAnimation>
                <div className="lg-cta-outline-button">{contentData.getContent("categoryBatteriesS6Buttontext")}</div>
            </DefaultElementAnimation> */}
        </div>
    );
}
