import {LoaderFunction} from "@remix-run/node";
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
import {StarFill} from "react-bootstrap-icons";
import {ProductCardComponent} from "~/components/category/common";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {StickyLandingPageBottomBar} from "~/components/landingPageBottomBar";
import {allProductDetails, ProductInfo} from "~/productData";
import {FixedHeightImage} from "~/global-common-typescript/components/fixedHeightImage";
import {ImageCdnProvider} from "~/global-common-typescript/components/growthJockeyImage";
import {FullWidthImage} from "~/global-common-typescript/components/fullWidthImage";

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

    return (
        <>
            <PageScaffold
                userPreferences={userPreferences}
                redirectTo={redirectTo}
                showMobileMenuIcon={true}
            >
                <ProductPage
                    userPreferences={userPreferences}
                    productData={productData}
                />
            </PageScaffold>
            <StickyLandingPageBottomBar userPreferences={userPreferences} />
        </>
    );
}



function ProductPage({userPreferences, productData}: {userPreferences: UserPreferences; productData: ProductInfo}) {


    return (
        <>
            <VerticalSpacer className="tw-h-10" />

            <ProductInfo
                userPreferences={userPreferences}
                productInfo={productData}
            />

            <VerticalSpacer className="tw-h-10" />

            <ProductSpecifications
                userPreferences={userPreferences}
                productInfo={productData}
            />

            <VerticalSpacer className="tw-h-10" />

            <ProductDescription
                userPreferences={userPreferences}
                productDescription={productData.productDescription}
            />

            <VerticalSpacer className="tw-h-10" />

            <ProductRating
                userPreferences={userPreferences}
                reviews={productData.reviews}
            />

            <VerticalSpacer className="tw-h-10" />

            <TransformingLives userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <DealerLocator
                userPreferences={userPreferences}
                showCtaButton={true}
            />

            <VerticalSpacer className="tw-h-10" />

            <SuggestedProducts userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <FaqSection userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <ShowerSomeLoveOnSocialHandles userPreferences={userPreferences} heading={{text1: "homeS11H1T1",text2: "homeS11H1T2"}}/>

            <VerticalSpacer className="tw-h-10" />
        </>
    );
}

function ProductInfo({userPreferences, productInfo}: {userPreferences: UserPreferences; productInfo : ProductInfo}) {
    return (
        <div className="lg-px-screen-edge">
            <div className="tw-grid tw-grid-cols-1 tw-grid-rows-[auto,auto] lg:tw-grid-cols-[minmax(0,4fr),minmax(0,3fr)] lg:tw-grid-rows-1 tw-justify-items-center tw-text-center tw-gap-2 lg:tw-gap-4">
                <div className="tw-grid tw-grid-cols-1 tw-grid-rows-[minmax(0,1fr),auto] lg:tw-grid-cols-[auto,minmax(0,1fr)] lg:tw-grid-rows-1 tw-row-start-1 lg:tw-col-start-1 tw-gap-2 tw-w-full">
                    <div className="tw-row-start-1 lg:tw-col-start-2">
                        <div className="tw-w-full tw-h-[300px] tw-rounded-lg lg-bg-secondary-500"></div>
                        <FixedHeightImage
                            relativePath={productInfo.images[0].image}
                            imageCdnProvider={ImageCdnProvider.GrowthJockey}
                            height="300px"
                            className="tw-rounded-lg"
                        />
                    </div>
                    <div className="tw-grid tw-grid-rows-1 tw-grid-cols-4 lg:tw-grid-rows-4 lg:tw-grid-cols-1 tw-row-start-2 lg:tw-col-start-1 lg:tw-row-start-1 tw-w-full tw-gap-2">
                        <ItemBuilder
                            items={productInfo.images}
                            itemBuilder={(image, imageIndex) => (
                                <div
                                    className="tw-rounded-lg tw-w-full tw-h-[80px] lg:tw-w-[80px] lg:tw-h-full"
                                    key={imageIndex}
                                >
                                <FullWidthImage
                                    relativePath={image.image}
                                    imageCdnProvider={ImageCdnProvider.GrowthJockey}
                                />
                                </div>
                            )}
                        />
                    </div>
                </div>
                <div className="tw-flex tw-flex-col tw-row-start-2 lg:tw-col-start-2 lg:tw-row-start-1">
                    <VerticalSpacer className="tw-h-4" />

                    <div className="lg-text-title1 tw-text-left">{productInfo.name}</div>

                    <VerticalSpacer className="tw-h-4" />

                    <div className="tw-text-left">{productInfo.description}</div>

                    <VerticalSpacer className="tw-h-4" />

                    <div className="tw-grid tw-grid-cols-[minmax(0,1fr),auto,minmax(0,1fr),auto,minmax(0,1fr),auto,minmax(0,1fr)] tw-gap-2">
                        <ItemBuilder
                            items={productInfo.productIcons}
                            itemBuilder={(icon, iconIndex) => (
                                <>
                                    <div
                                        className="tw-flex tw-flex-col tw-gap-1 tw-justify-center tw-items-center"
                                        key={iconIndex}
                                    >
                                        <div className="tw-w-4 tw-h-4 lg-bg-secondary-500 tw-rounded-full"></div>
                                        <div className="tw-text-center">{icon.text}</div>
                                    </div>

                                    {iconIndex < productInfo.productIcons.length - 1 && <div className="tw-w-full tw-border"></div>}
                                </>
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProductSpecifications({userPreferences, productInfo}: {userPreferences: UserPreferences; productInfo: ProductInfo}) {
    const [selectedTab, setSelectedTab] = useState("specifications");

    const getDataFromProductInfo = (tab: string) => {
        if(tab == "specifications"){
            return productInfo.specifications;
        }else if(tab == "features"){
            return productInfo.features;
        }else if(tab == "additionalInfo"){
            return productInfo.additionalInfo;
        }else{
            throw Error("value not found");
        }
    }

    return (
        <div className="tw-flex tw-flex-col tw-gap-4">
            <div className="lg-px-screen-edge">
                <div className="tw-grid tw-grid-cols-[minmax(0,1fr),auto,minmax(0,1fr),auto,minmax(0,1fr)] tw-gap-2 tw-border-b tw-py-2">
                    <ItemBuilder
                        items={[
                            {
                                title: "Specifications",
                                value: "specifications",
                            },
                            {
                                title: "Features",
                                value: "features",
                            },
                            {
                                title: "Additional Info",
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
                                    <div className={`${item.value == selectedTab ? "tw-underline" : "lg-text-secondary-700"}`}>{item.title}</div>
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
                        <div className={`tw-grid tw-grid-cols-2 lg-px-screen-edge tw-py-2 tw-items-center tw-text-left ${itemIndex % 2 == 0 ? "lg-bg-secondary-500" : ""}`}>
                            <div className="tw-col-start-1 tw-font-bold">{item.title}</div>
                            <div className="tw-col-start-2">{item.value}</div>
                        </div>
                    )}
                />
            </div>
        </div>
    );
}

function ProductDescription({userPreferences, productDescription}: {userPreferences: UserPreferences; productDescription: {description: string; images: Array<{image: string}>}}) {
    return (
        <div className="lg-px-screen-edge tw-flex-tw-flex-col">
            <div className="lg-text-headline tw-text-center">Product Description</div>

            <VerticalSpacer className="tw-h-6" />

            <div className="tw-text-center">{productDescription.description}</div>

            <VerticalSpacer className="tw-h-6" />

            <ItemBuilder
                items={productDescription.images}
                itemBuilder={(image, imageIndex) => (
                    <>
                        <div className="tw-rounded-lg lg-bg-secondary-500 tw-w-full tw-h-[250px]"></div>

                        <VerticalSpacer className="tw-h-4" />
                    </>
                )}
            />
        </div>
    );
}


function ProductRating({userPreferences, reviews}: {userPreferences: UserPreferences; reviews: {rating: number; numberOfReviews: number}}) {
    return (
        <div className="lg-px-screen-edge">
            <div className="lg-bg-secondary-100 tw-rounded-lg tw-p-6 tw-grid tw-grid-cols-[minmax(0,4fr),minmax(0,3fr)] tw-items-center">
                <div className="tw-col-start-1 tw-flex tw-flex-col tw-gap-3">
                    <div className="lg-text-headline">{`${reviews.rating}/5`}</div>

                    <div className="lg-text-title2">{`Based on ${reviews.numberOfReviews} Review`}</div>

                    <div className="tw-flex tw-flex-row tw-gap-x-2">
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

                <div className="tw-col-start-2 tw-flex tw-flex-col tw-items-center">
                    <ItemBuilder
                        items={[
                            {
                                startRating : 5,
                                percentage: 90,
                            },
                            {
                                startRating : 4,
                                percentage: 50,
                            },
                            {
                                startRating : 3,
                                percentage: 30,
                            },
                            {
                                startRating : 2,
                                percentage: 15,
                            },
                            {
                                startRating : 1,
                                percentage: 10,
                            },
                        ]}
                        itemBuilder={(rating, ratingIndex) => (
                            <div className="tw-flex tw-flex-row tw-gap-4 tw-items-center" key={ratingIndex}>
                                <div>{`${rating.startRating} Star`}</div>
                                <div className="tw-w-[50px] tw-h-[6px] lg-bg-secondary-300 tw-rounded-lg ">
                                    <div className={`tw-bg-gradient-to-r tw-from-[#F25F60] tw-to-[#EB2A2B] tw-w-[${rating.percentage}%] tw-h-full tw-rounded-lg`}></div>
                                </div>
                            </div>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

function SuggestedProducts({userPreferences}: {userPreferences: UserPreferences}) {
    const jodisData: Array<{
        title: string;
        imageRelativePath: string;
        buttonText: string;
        bestseller: boolean;
    }> = [
        {
            title: `${getVernacularString("categoryBattriesS6Jodi1Title", userPreferences.language)}`,
            imageRelativePath: "/livguard/category/jodi/urban_jodi.png",
            buttonText: `${getVernacularString("categoryBattriesS6JodiButtontext", userPreferences.language)}`,
            bestseller: false,
        },
        {
            title: `${getVernacularString("categoryBattriesS6Jodi2Title", userPreferences.language)}`,
            imageRelativePath: "/livguard/category/jodi/rural_jodi.png",
            buttonText: `${getVernacularString("categoryBattriesS6JodiButtontext", userPreferences.language)}`,
            bestseller: true,
        },
        {
            title: `${getVernacularString("categoryBattriesS6Jodi3Title", userPreferences.language)}`,
            imageRelativePath: "/livguard/category/jodi/super_life_jodi.png",
            buttonText: `${getVernacularString("categoryBattriesS6JodiButtontext", userPreferences.language)}`,
            bestseller: true,
        },
        {
            title: `${getVernacularString("categoryBattriesS6Jodi4Title", userPreferences.language)}`,
            imageRelativePath: "/livguard/category/jodi/urban_jodi.png",
            buttonText: `${getVernacularString("categoryBattriesS6JodiButtontext", userPreferences.language)}`,
            bestseller: false,
        },
    ];

    return (
        <div className="lg-px-screen-edge">
            <div className="tw-flex tw-flex-col">
                <div className="lg-text-headline tw-text-center">
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("categoryBattriesS6HT1", userPreferences.language)}} />
                    </DefaultTextAnimation>
                </div>
            </div>

            <VerticalSpacer className="tw-h-10" />

            <div className="tw-grid tw-grid-cols-[minmax(0,1fr),minmax(0,1fr)] tw-grid-rows-[minmax(0,1fr),minmax(0,1fr)] tw-gap-x-3 tw-gap-y-10">
                <ItemBuilder
                    items={jodisData}
                    itemBuilder={(jodi, jodiIndex) => (
                        <ProductCardComponent
                            vernacularContent={jodi}
                            key={jodiIndex}
                        />
                    )}
                />
            </div>

            <VerticalSpacer className="tw-h-6" />

            <DefaultElementAnimation>
                <div className="lg-cta-outline-button">{getVernacularString("categoryBattriesS6Buttontext", userPreferences.language)}</div>
            </DefaultElementAnimation>
        </div>
    );
}

function StickyBottomBar({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="tw-sticky tw-bottom-0 lg-bg-secondary-300 tw-rounded-t-lg tw-grid tw-grid-cols-[2fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr_auto_2fr] tw-py-[0.8125rem]">
            <div className="tw-row-start-1 tw-col-start-2 tw-flex tw-flex-col tw-items-center tw-text-center">
                <div className="tw-w-8 tw-h-8 tw-rounded-full lg-bg-primary-500" />
                <div className="lg-text-icon">Something</div>
            </div>

            <div className="tw-row-start-1 tw-col-start-4 tw-flex tw-flex-col tw-items-center">
                <div className="tw-w-8 tw-h-8 tw-rounded-full lg-bg-primary-500" />
                <div className="lg-text-icon">Something</div>
            </div>

            <div className="tw-row-start-1 tw-col-start-6 tw-flex tw-flex-col tw-items-center">
                {/* <div className="tw-w-16 tw-h-16 tw-rounded-full lg-bg-primary-500" /> */}
                <div className="lg-text-icon">Something</div>
            </div>

            <div className="tw-row-start-1 tw-col-start-8 tw-flex tw-flex-col tw-items-center">
                <div className="tw-w-8 tw-h-8 tw-rounded-full lg-bg-primary-500" />
                <div className="lg-text-icon">Something</div>
            </div>

            <div className="tw-row-start-1 tw-col-start-10 tw-flex tw-flex-col tw-items-center">
                <div className="tw-w-8 tw-h-8 tw-rounded-full lg-bg-primary-500" />
                <div className="lg-text-icon">Something</div>
            </div>
        </div>
    );
}
