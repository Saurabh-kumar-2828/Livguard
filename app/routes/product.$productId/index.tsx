import {LoaderFunction, MetaFunction} from "@remix-run/node";
import {useLoaderData} from "react-router";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {getUserPreferencesFromCookies} from "~/server/userPreferencesCookieHelper.server";
import {UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";
import {DealerLocator, EnergySolutions, FaqSection, ShowerSomeLoveOnSocialHandles, TransformingLives} from "~/routes";
import {getRedirectToUrlFromRequest} from "~/utilities";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {PageScaffold} from "~/components/pageScaffold";
import {getNonEmptyStringFromUnknown} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {concatenateNonNullStringsWithSpaces, getIntegerArrayOfLength} from "~/global-common-typescript/utilities/utilities";
import {useState} from "react";
import {CircleFill, StarFill} from "react-bootstrap-icons";
import {ProductCardComponent, SocialHandles} from "~/components/category/common";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {StickyLandingPageBottomBar} from "~/components/landingPageBottomBar";
import {allProductDetails, ProductInfo} from "~/productData";
import {FixedHeightImage} from "~/global-common-typescript/components/fixedHeightImage";
import {ImageCdnProvider} from "~/global-common-typescript/components/growthJockeyImage";
import {FullWidthImage} from "~/global-common-typescript/components/fullWidthImage";
import {FixedWidthImage} from "~/global-common-typescript/components/fixedWidthImage";
import React from "react";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {ChooseBestInverterBattery} from "~/routes/category/inverter-batteries";
import {ProductInfoCarousel} from "~/components/productInfoCarousel";

export const meta: MetaFunction = (params) => {

    return {
        title: "",
        desscription: "",
    };
};


type LoaderData = {
    userPreferences: UserPreferences;
    redirectTo: string;
    productData: ProductInfo;
};

export const loader: LoaderFunction = async ({request, params}) => {
    const userPreferences = await getUserPreferencesFromCookies(request);
    if (userPreferences instanceof Error) {
        throw userPreferences;
    }

    const productId = getNonEmptyStringFromUnknown(params.productId as string);

    const loaderData: LoaderData = {
        userPreferences: userPreferences,
        redirectTo: getRedirectToUrlFromRequest(request),
        productData: allProductDetails[productId][userPreferences.language],
    };

    return loaderData;
};

export default function () {
    const {userPreferences, redirectTo, productData} = useLoaderData() as LoaderData;

    const utmSearchParameters = useUtmSearchParameters();

    return (
        <>
            <PageScaffold
                userPreferences={userPreferences}
                redirectTo={redirectTo}
                showMobileMenuIcon={true}
                utmParameters={utmSearchParameters}
            >
                <ProductPage
                    userPreferences={userPreferences}
                    productData={productData}
                    utmParameters={utmSearchParameters}
                />
            </PageScaffold>
            <StickyLandingPageBottomBar userPreferences={userPreferences} />
        </>
    );
}



function ProductPage({
    userPreferences,
    productData,
    utmParameters,
}: {
    userPreferences: UserPreferences;
    productData: ProductInfo;
    utmParameters: {
        [searchParameter: string]: string;
    };
}) {
    return (
        <>
            <VerticalSpacer className="tw-h-10" />

            <ProductInfo
                userPreferences={userPreferences}
                productInfo={productData}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-[72px]" />

            <ProductSpecifications
                userPreferences={userPreferences}
                productInfo={productData}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-[72px]" />

            <ProductDescription
                userPreferences={userPreferences}
                productDescription={productData.productDescription}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-h-8 lg:tw-h-[72px]" />

            <ProductRating
                userPreferences={userPreferences}
                reviews={productData.reviews}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-[72px]" />

            <TransformingLives
                userPreferences={userPreferences}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-[72px]" />

            <div className="tw-grid tw-grid-cols-1 tw-grid-rows-2 lg:tw-grid-cols-[minmax(0,2fr),minmax(0,3fr)] lg:tw-grid-rows-1 tw-gap-y-10 tw-gap-x-4 lg:tw-px-[72px] xl:tw-px-[120px]">
                <DealerLocator
                    userPreferences={userPreferences}
                    showCtaButton={true}
                    className="tw-row-start-1 lg:tw-row-span-full lg:tw-col-start-1 lg:tw-h-full"
                />

                <ChooseBestInverterBattery
                    userPreferences={userPreferences}
                    utmParameters={utmParameters}
                    className="tw-row-start-2 lg:tw-col-start-2 lg:tw-row-start-1"
                />
            </div>

            <VerticalSpacer className="lg:tw-h-[72px]" />

            <SuggestedProducts
                userPreferences={userPreferences}
                recommendedProducts={productData.recommendedProducts}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-[72px]" />

            <FaqSection
                userPreferences={userPreferences}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-[50px]" />

            <SocialHandles
                userPreferences={userPreferences}
                heading={{text1: "homeS11H1T1", text2: "homeS11H1T2"}}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-[72px]" />
        </>
    );
}

function ProductInfo({userPreferences, productInfo, className}: {userPreferences: UserPreferences; productInfo : ProductInfo; className?: string}) {
    const [mainImageIndex, setMainImageIndex] = useState(0);

    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge", className)}>
            <div className="tw-grid tw-grid-cols-1 tw-grid-rows-[minmax(0,1fr),auto] lg:tw-grid-cols-[minmax(0,4fr),minmax(0,3fr)] lg:tw-grid-rows-1 tw-justify-items-center tw-text-center tw-gap-2">
                <div className="tw-grid tw-grid-cols-1 tw-grid-rows-[minmax(0,1fr),auto] lg:tw-grid-cols-[auto,minmax(0,1fr)] lg:tw-grid-rows-1 tw-row-start-1 lg:tw-col-start-1 tw-gap-2 tw-w-full">
                    <div className="tw-row-start-1 lg:tw-col-start-2 lg:tw-pr-10">
                        <DefaultElementAnimation>
                            <FullWidthImage
                                relativePath={productInfo.images[mainImageIndex].image}
                                imageCdnProvider={ImageCdnProvider.Imgix}
                                className="tw-rounded-lg"
                            />
                        </DefaultElementAnimation>
                    </div>
                    <div className="tw-grid tw-grid-rows-1 tw-grid-cols-4 lg:tw-grid-rows-4 lg:tw-grid-cols-1 tw-row-start-2 lg:tw-col-start-1 lg:tw-row-start-1 tw-w-full tw-gap-x-2">
                        <ItemBuilder
                            items={productInfo.images}
                            itemBuilder={(image, imageIndex) => (
                                <div
                                    className="tw-rounded-lg tw-w-full tw-h-[80px] lg:tw-w-[80px] lg:tw-h-full hover:tw-cursor-pointer"
                                    key={imageIndex}
                                    onClick={() => setMainImageIndex(imageIndex)}
                                >
                                    <FullWidthImage
                                        relativePath={image.image}
                                        imageCdnProvider={ImageCdnProvider.Imgix}
                                        className={`tw-rounded-lg ${imageIndex == mainImageIndex ? "lg-border-primary-500 tw-border-2" : ""}`}
                                    />
                                </div>
                            )}
                        />
                    </div>
                </div>
                <div className="tw-flex tw-flex-col tw-row-start-2 lg:tw-col-start-2 lg:tw-row-start-1">
                    <VerticalSpacer className="tw-h-4" />

                    <div className="lg-text-title1 tw-text-left">
                        {productInfo.title} <span className="tw-italic">{productInfo.subTitle} </span>
                    </div>

                    <VerticalSpacer className="tw-h-4" />

                    <div className="tw-text-left">{productInfo.description}</div>

                    <VerticalSpacer className="tw-h-4" />

                    <div className="tw-grid tw-grid-cols-[minmax(0,1fr),auto,minmax(0,1fr),auto,minmax(0,1fr),auto,minmax(0,1fr)] tw-gap-2">
                        <ItemBuilder
                            items={productInfo.productIcons}
                            itemBuilder={(icon, iconIndex) => (
                                <>
                                    <div
                                        className="tw-flex tw-flex-col tw-gap-2 tw-justify-start tw-items-center tw-h-full"
                                        key={iconIndex}
                                    >
                                        <div className="tw-w-10 tw-h-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-items-center tw-justify-center">
                                            <FixedWidthImage
                                                relativePath={icon.icon}
                                                imageCdnProvider={ImageCdnProvider.Imgix}
                                                width="1.5rem"
                                            />
                                        </div>
                                        <div className="tw-text-center tw-place-items-start">{icon.text}</div>
                                    </div>

                                    {iconIndex < productInfo.productIcons.length - 1 && <div className="tw-w-full tw-border lg-border-secondary-900"></div>}
                                </>
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProductSpecifications({userPreferences, productInfo,className}: {userPreferences: UserPreferences; productInfo: ProductInfo; className: string}) {
    const [selectedTab, setSelectedTab] = useState("specifications");

    const getDataFromProductInfo = (tab: string) => {
        if (tab == "specifications") {
            return productInfo.specifications;
        } else if (tab == "features") {
            return productInfo.features;
        } else if (tab == "additionalInfo") {
            return productInfo.additionalInfo;
        } else {
            throw Error("value not found");
        }
    };

    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-flex tw-flex-col tw-gap-4", className)}>
            <div className="lg-px-screen-edge">
                <div className="tw-grid tw-grid-cols-[minmax(0,1fr),auto,minmax(0,1fr),auto,minmax(0,1fr)] tw-gap-2 tw-border-b tw-py-2">
                    <ItemBuilder
                        items={[
                            {
                                title: `${getVernacularString("productPageSpecifications", userPreferences.language)}`,
                                value: "specifications",
                            },
                            {
                                title: `${getVernacularString("productPageFeatures", userPreferences.language)}`,
                                value: "features",
                            },
                            {
                                title: `${getVernacularString("productPageAdditionalInfo", userPreferences.language)}`,
                                value: "additionalInfo",
                            },
                        ]}
                        itemBuilder={(item, itemIndex) => (
                            <>
                                <div
                                    className="tw-flex tw-flex-col tw-gap-1 tw-justify-center tw-items-center"
                                    key={itemIndex}
                                    onClick={() => setSelectedTab(item.value)}
                                >
                                    <div className={`${item.value == selectedTab ? "tw-underline tw-underline-offset-4" : "lg-text-secondary-700"}`}>{item.title}</div>
                                </div>

                                {itemIndex < 3 - 1 && <div className="tw-w-full tw-border"></div>}
                            </>
                        )}
                    />
                </div>
            </div>

            <div className="tw-flex tw-flex-col">
                <ItemBuilder
                    items={getDataFromProductInfo(selectedTab)}
                    itemBuilder={(item, itemIndex) => (
                        <React.Fragment key={itemIndex}>
                            {selectedTab == "features" ? (
                                <div className={`lg-px-screen-edge tw-flex tw-flex-row tw-py-2 tw-items-center tw-gap-1 tw-text-left ${itemIndex % 2 == 0 ? "lg-bg-secondary-300" : ""}`}>
                                    <div className="tw-w-2">
                                        <CircleFill className="tw-w-2 tw-h-2 lg-bg-secondary-100 tw-rounded-full" />
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

function ProductDescription({userPreferences, productDescription,className}: {userPreferences: UserPreferences; productDescription: {description: string; images: Array<{image: string}>}; className: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge tw-flex-tw-flex-col", className)}>
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
                                    imageCdnProvider={ImageCdnProvider.Imgix}
                                    className="tw-rounded-lg"
                                />
                            </div>

                            <VerticalSpacer className="tw-h-4" />
                        </React.Fragment>
                    )}
                />
            </div>
            <div className="tw-hidden lg:tw-block">
                <ProductInfoCarousel
                    items={productDescription.images}
                />
            </div>
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

function SuggestedProducts({
    userPreferences,
    recommendedProducts,
    className
}: {
    userPreferences: UserPreferences;
    recommendedProducts: Array<{
        title: string;
        imageRelativePath: string;
        buttonText: string;
        bestseller: boolean;
        link: string;
    }>;
    className: string
}) {
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

            <div className="tw-grid tw-grid-cols-[minmax(0,1fr),minmax(0,1fr)] tw-grid-rows-[minmax(0,1fr),minmax(0,1fr)] lg:tw-grid-rows-1 lg:tw-grid-flow-col lg:tw-grid-cols-4 tw-gap-x-3 tw-gap-y-10">
                <ItemBuilder
                    items={recommendedProducts}
                    itemBuilder={(jodi, jodiIndex) => (
                        <div
                            className={`lg-bg-secondary-100 tw-rounded-lg`}
                            key={jodiIndex}
                        >
                            <ProductCardComponent
                                vernacularContent={jodi}
                                key={jodiIndex}
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

