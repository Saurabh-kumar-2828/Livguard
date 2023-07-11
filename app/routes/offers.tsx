import type {LinksFunction, LoaderFunction, MetaFunction} from "@remix-run/node";
import {Link} from "@remix-run/react";
import {useState} from "react";
import {useResizeDetector} from "react-resize-detector";
import {useLoaderData} from "react-router";
import {StickyBottomBar} from "~/components/bottomBar";
import {CarouselStyle4} from "~/components/carouselStyle4";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {FaqSectionInternal} from "~/components/faqs";
import {CoverImage} from "~/components/images/coverImage";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {PageScaffold} from "~/components/pageScaffold";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {ImageCdnProvider} from "~/global-common-typescript/typeDefinitions";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {useEmblaCarouselWithIndex} from "~/hooks/useEmblaCarouselWithIndex";
import {ProductType} from "~/productData";
import {ContactUsDialog, DealerLocator} from "~/routes";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import {Language, type UserPreferences} from "~/typeDefinitions";
import {appendSpaceToString, convertProductInternalNameToPublicName, getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";

export const meta: MetaFunction = ({data}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = data.userPreferences;
    if (userPreferences.language == Language.English) {
        return {
            title: "Exciting Livguard Offers: Buy Inverters, Batteries, and More at Unbeatable Prices!",
            description: "Get the best deals on Livguard batteries and inverters. Power up your life with reliable and long-lasting solutions. Hurry, limited time offer!",
            "og:title": "Exciting Livguard Offers: Buy Inverters, Batteries, and More at Unbeatable Prices!",
            "og:site_name": "Livguard",
            "og:url": "https://www.livguard.com/offer-page",
            "og:description": "Get the best deals on Livguard batteries and inverters. Power up your life with reliable and long-lasting solutions. Hurry, limited time offer!",
            "og:type": "website",
            "og:image": "",
        };
    } else if (userPreferences.language == Language.Hindi) {
        return {
            title: "लिवगार्ड के रोमांचक ऑफर: इनवर्टर, बैटरी और बहुत कुछ कम कीमतों पर खरीदें!",
            description: "?????",
        };
    } else {
        throw Error(`Undefined language ${userPreferences.language}`);
    }
};

export const links: LinksFunction = () => {
    return [{rel: "canonical", href: "https://www.livguard.com/offer-page"}];
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

export default function () {
    const {userPreferences, redirectTo, pageUrl} = useLoaderData() as LoaderData;

    const utmSearchParameters = useUtmSearchParameters();

    return (
        <>
            <PageScaffold
                userPreferences={userPreferences}
                redirectTo={redirectTo}
                showMobileMenuIcon={true}
                utmParameters={utmSearchParameters}
                breadcrumbs={[
                    {contentId: "d502b3fa-3677-4a4a-add3-05647aed0690", link: "/"},
                    {contentId: "af3ba663-53b9-4e18-b3ca-9ea9f80d5134", link: "#"},
                ]}
            >
                <OffersPage
                    userPreferences={userPreferences}
                    utmParameters={utmSearchParameters}
                    pageUrl={pageUrl}
                />
            </PageScaffold>

            <StickyBottomBar userPreferences={userPreferences} />
        </>
    );
}

function OffersPage({
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
    const [isContactUsDialogOpen, setIsContactUsDialogOpen] = useState(false);

    function tryToOpenContactUsDialog() {
        setIsContactUsDialogOpen(true);
    }

    return (
        <div className="tw-grid tw-grid-rows-1 tw-grid-cols-1 lg:tw-grid-rows-1 lg:tw-grid-cols-6 tw-gap-x-8 tw-align-stretch tw-gap-y-10 lg:tw-gap-y-20 tw-pb-10 lg:tw-pb-20">
            <HeroSection
                userPreferences={userPreferences}
                utmParameters={utmParameters}
                pageUrl={pageUrl}
                className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
            />

            <BestOffers
                userPreferences={userPreferences}
                utmParameters={utmParameters}
                tryToOpenContactUsDialog={tryToOpenContactUsDialog}
                isContactUsDialogOpen={isContactUsDialogOpen}
                setIsContactUsDialogOpen={setIsContactUsDialogOpen}
                pageUrl={pageUrl}
                className="tw-row-start-2 tw-col-start-1 lg:tw-col-span-full tw-w-full lg-px-screen-edge-2 lg:tw-px-[72px] xl:tw-px-[120px] tw-max-w-7xl tw-mx-auto"
            />

            <FeaturedProducts
                userPreferences={userPreferences}
                className="tw-row-start-3 tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px] tw-max-w-7xl tw-mx-auto"
            />

            <div className="tw-row-start-4 tw-col-start-1 tw-col-span-full tw-grid tw-grid-cols-1 lg:tw-grid-cols-[minmax(0,2fr),minmax(0,3fr)] lg:tw-grid-rows-1 tw-gap-y-10 lg:tw-gap-x-4 lg:tw-px-[72px] xl:tw-px-[120px] lg:tw-items-center tw-w-full tw-max-w-7xl tw-mx-auto">
                <DealerLocator
                    userPreferences={userPreferences}
                    showCtaButton={true}
                    className="tw-row-start-1 lg:tw-row-span-full lg:tw-col-start-1 lg:tw-h-full lg:tw-min-h-[36rem] lg:tw-max-h-[36rem] lg:tw-self-start"
                />

                <FaqSection
                    userPreferences={userPreferences}
                    className="tw-row-start-2 lg:tw-col-start-2 lg:tw-row-start-1 lg:tw-justify-items-start lg:tw-pr-0"
                />
            </div>
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
                "tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height)-7.5rem)] lg:tw-h-[calc(100vh-7rem)] tw-grid tw-grid-rows-[0_2.5rem_0_auto_0.5rem_auto_1rem_auto_1rem_minmax(0,1fr)_auto_1.5rem] lg:tw-grid-rows-[1.5rem_3rem_minmax(0,1fr)_auto_0.5rem_auto_1rem_auto_1rem_minmax(0,3fr)_auto_1.5rem] tw-justify-items-center tw-text-center lg:tw-text-left tw-relative lg:tw-grid-cols-2 tw-isolate tw-overflow-hidden",
                className,
            )}
            ref={ref}
        >
            <div className="tw-row-start-1 tw-col-start-1 tw-row-span-full tw-col-span-full tw-w-full tw-h-full tw-relative -tw-z-10 tw-isolate">
                {containerWidth == null || containerHeight == null ? null : (
                    <>
                        <CoverImage
                            relativePath={containerWidth > containerHeight ? "/livguard/offers/1/bg-desktop.jpg" : "/livguard/offers/1/bg-banner-mobile.jpg"}
                            key={containerWidth > containerHeight ? "/livguard/offers/1/bg-desktop.jpg" : "/livguard/offers/1/bg-banner-mobile.jpg"}
                        />

                        <img
                            src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/common/akshay.png")?.finalUrl, ImageCdnProvider.Bunny, null, null)}
                            alt="Akshay Kumar"
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-absolute",
                                containerWidth < 1024 ? "tw-bottom-8 tw-inset-x-0 tw-mx-auto tw-h-3/5 md:tw-h-2/3" : "tw-bottom-[calc(10%+2rem)] tw-right-[20%] tw-h-3/4",
                            )}
                        />

                        <img
                            src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/offers/1/all-products.png")?.finalUrl, ImageCdnProvider.Bunny, null, null)}
                            alt="Livguard inverter-battery combo"
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-absolute",
                                containerWidth < 1024 ? "tw-bottom-8 tw-inset-x-0 tw-mx-auto tw-w-[90%] md:tw-w-[60%]" : "tw-bottom-8 tw-right-0 tw-h-1/2",
                            )}
                        />
                    </>
                )}
            </div>

            <DefaultTextAnimation className="tw-row-start-4 tw-col-start-1 lg:tw-place-self-start lg:tw-col-start-1">
                <div
                    dangerouslySetInnerHTML={{__html: getVernacularString("dfa03024-6e74-45c6-9634-8d83833930f3", userPreferences.language)}}
                    className="lg-text-banner lg-px-screen-edge tw-text-white lg:tw-pl-[120px]"
                />
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-6 tw-col-start-1 lg:tw-place-self-start lg:tw-max-w-[620px] lg:tw-col-start-1">
                <div
                    dangerouslySetInnerHTML={{__html: getVernacularString("0931e2ce-74c8-49b3-84d0-760b290166eb", userPreferences.language)}}
                    className="lg-text-title1 lg-px-screen-edge tw-text-white lg:tw-pl-[120px]"
                />
            </DefaultTextAnimation>
        </div>
    );
}

export function BestOffers({
    userPreferences,
    utmParameters,
    isContactUsDialogOpen,
    setIsContactUsDialogOpen,
    tryToOpenContactUsDialog,
    pageUrl,
    className,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
    isContactUsDialogOpen: boolean;
    setIsContactUsDialogOpen: React.Dispatch<boolean>;
    tryToOpenContactUsDialog: () => void;
    pageUrl: string;
    className?: string;
}) {
    const {emblaRef, emblaApi, selectedIndex} = useEmblaCarouselWithIndex({loop: true});

    const offers = [
        [
            {
                offers: [
                    {
                        name: "inverter-battery",
                        validTill: "June 31, 2023",
                    },
                ],
                emptyOfferButtonTextPiece: "4391ead5-8016-4a2f-9132-0b6370b40cd3",
                emptyOfferButtonLink: "/campaigns/inverter-and-battery-jodi",
            },
        ],
        [
            {
                offers: [
                    {
                        name: "automotive",
                        validTill: "June 31, 2023",
                    },
                ],
                emptyOfferButtonTextPiece: "cf35b042-9f06-44d4-b0c3-f7ed9399e400",
                emptyOfferButtonLink: "/automotive-batteries.php",
            },
        ],
        [
            {
                offers: [
                    {
                        name: "solar",
                        validTill: "June 31, 2023",
                    },
                ],
                emptyOfferButtonTextPiece: "1945f91a-ddb2-42ab-99d0-f094a02094b0",
                emptyOfferButtonLink: "https://www.livguardsolar.com/",
            },
        ],
        [{offers: [], emptyOfferButtonTextPiece: "15f8008f-5fa5-4b55-9876-916ff55cf323", emptyOfferButtonLink: "/lg-trolley-category"}],
    ];

    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-grid tw-grid-rows-[auto,auto,minmax(0,1fr)] tw-grid-cols-1 lg:tw-grid-rows-[auto,minmax(0,1fr)] lg:tw-grid-cols-[auto,minmax(0,1fr)] tw-gap-x-4 tw-gap-y-6",
                className,
            )}
            id="best-offers"
        >
            <h2 className="lg-px-screen-edge lg-text-headline tw-text-center tw-row-start-1 tw-col-start-1 tw-col-span-full lg:tw-row-start-1 lg:tw-col-start-1 lg:tw-col-span-full">
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: appendSpaceToString(getVernacularString("28d2dcd2-f0a8-4314-b3d0-981ddf2444b9", userPreferences.language))}} />
                </DefaultTextAnimation>
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("5b7f29b4-216f-4c13-ac5d-811cc4cb1733", userPreferences.language)}} />
                </DefaultTextAnimation>
            </h2>

            <div className="lg-px-screen-edge tw-grid tw-grid-cols-4 tw-gap-x-4 tw-row-start-2 tw-col-start-1 tw-col-span-full lg:tw-grid-rows-4 lg:tw-grid-cols-1 lg:tw-gap-y-4 lg:tw-row-start-2 lg:tw-col-start-1 lg:tw-col-span-1 lg:tw-py-10 lg:tw-h-fit">
                <ItemBuilder
                    items={[
                        {
                            svgIcon: "https://files.growthjockey.com/livguard/icons/offers/inverter-and-battery-offers.svg",
                            title: "7b226d84-b7f2-4f94-8626-67627cb47c28",
                        },
                        {
                            svgIcon: "https://files.growthjockey.com/livguard/icons/offers/automotive-offers.svg",
                            title: "e3f844b6-79ab-47fd-a25c-67fadebeae73",
                        },
                        {
                            svgIcon: "https://files.growthjockey.com/livguard/icons/offers/solar-offers.svg",
                            title: "ddf400a4-3900-4561-85fb-1447c8693412",
                        },
                        {
                            svgIcon: "https://files.growthjockey.com/livguard/icons/offers/accessories-offers.svg",
                            title: "46c68fad-1e6e-442c-ab3c-fc09234693d2",
                        },
                    ]}
                    itemBuilder={(item, itemIndex) => (
                        <button
                            type="button"
                            className="group tw-flex tw-flex-col tw-items-center tw-my-"
                            onClick={() => {
                                setSelectedCategoryIndex(itemIndex);
                            }}
                            key={itemIndex}
                        >
                            <div
                                className={concatenateNonNullStringsWithSpaces(
                                    "tw-w-12 tw-h-12 tw-rounded-full tw-flex tw-flex-row tw-items-center tw-justify-center tw-duration-200",
                                    `${itemIndex == selectedCategoryIndex ? "lg-bg-primary-500 tw-scale-110" : "lg-bg-secondary-300"}`,
                                )}
                            >
                                {/* <FixedWidthImage
                                    relativePath={item.icon}
                                    width="1.5rem"
                                /> */}

                                <img
                                    src={item.svgIcon}
                                    className={concatenateNonNullStringsWithSpaces("tw-w-6 tw-h-6", itemIndex == selectedCategoryIndex ? "tw-scale-125 tw-invert-0" : "tw-opacity-50")}
                                />
                            </div>

                            <VerticalSpacer className="tw-h-2" />

                            <div className="lg-text-icon tw-text-center">
                                {getVernacularString(item.title, userPreferences.language)} ({offers[itemIndex][0].offers.length})
                            </div>
                        </button>
                    )}
                />
            </div>

            <div
                className="tw-overflow-hidden tw-col-start-1 tw-col-span-full tw-row-start-3 lg:tw-row-start-2 lg:tw-col-start-2"
                // ref={emblaRef}
            >
                <div className="tw-grid tw-grid-flow-col tw-auto-cols-[100%]">
                    {offers[selectedCategoryIndex][0].offers.length === 0 ? (
                        <EmptyOfferCard
                            userPreferences={userPreferences}
                            buttonText={getVernacularString(offers[selectedCategoryIndex][0].emptyOfferButtonTextPiece, userPreferences.language)}
                            buttonLink={offers[selectedCategoryIndex][0].emptyOfferButtonLink}
                        />
                    ) : (
                        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-x-4 tw-gap-y-4 tw-px-2">
                            <ItemBuilder
                                items={offers[selectedCategoryIndex][0].offers}
                                itemBuilder={(categoryOffer, categoryOfferIndex) => {
                                    return (
                                        <OfferCard
                                            offer={categoryOffer}
                                            userPreferences={userPreferences}
                                            tryToOpenContactUsDialog={tryToOpenContactUsDialog}
                                            key={categoryOfferIndex}
                                        />
                                    );
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>

            <ContactUsDialog
                userPreferences={userPreferences}
                isContactUsDialogOpen={isContactUsDialogOpen}
                setIsContactUsDialogOpen={setIsContactUsDialogOpen}
                utmParameters={utmParameters}
                pageUrl={pageUrl}
            />
        </div>
    );
}

function FeaturedProducts({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const featuredProducts = [
        {
            type: ProductType.inverter,
            name: "3a0f3353-3cde-4043-9cf5-714be3fa406d",
            warranty: "a8de768d-be36-4746-b3d4-ee72e6dbe3a6",
            capacity: "fac6f9bf-7f72-487d-b802-4e2e9a1d520f",
            slug: "lg700e",
            price: "4,699",
        },
        {
            type: ProductType.inverter,
            name: "6dfe6fec-f82b-43e8-b9ca-6757423f56d1",
            warranty: "a8de768d-be36-4746-b3d4-ee72e6dbe3a6",
            capacity: "ede80aa8-51b8-4695-adb7-0fd148def188",
            slug: "lgs1100i",
            isBestSeller: true,
            price: "6,999",
        },
        {
            type: ProductType.battery,
            name: "ae3c747b-5b1a-4d8f-863f-caf3db8f0569",
            capacity: "68195aa4-ec44-46ec-8b74-51e341e4ed66",
            warranty: "9d144768-a8e3-49be-8b89-b27300a9769a",
            slug: "it1548tt",
            isBestSeller: true,
            price: "14,440",
        },
        {
            type: ProductType.battery,
            name: "051eb599-fedc-46ea-be7c-5d857fad1d76",
            capacity: "e42d6d5a-4b06-45de-b675-cc467d47d4b4",
            warranty: "33862866-bbdb-46ad-a797-f7fbd07df131",
            slug: "it2272tt",
            price: "19,499",
        },
        {
            type: ProductType.inverter,
            name: "3a0f3353-3cde-4043-9cf5-714be3fa406d",
            warranty: "a8de768d-be36-4746-b3d4-ee72e6dbe3a6",
            capacity: "fac6f9bf-7f72-487d-b802-4e2e9a1d520f",
            slug: "lg700e",
            price: "4,699",
        },
        {
            type: ProductType.inverter,
            name: "6dfe6fec-f82b-43e8-b9ca-6757423f56d1",
            warranty: "a8de768d-be36-4746-b3d4-ee72e6dbe3a6",
            capacity: "ede80aa8-51b8-4695-adb7-0fd148def188",
            slug: "lgs1100i",
            isBestSeller: true,
            price: "6,999",
        },
        {
            type: ProductType.battery,
            name: "ae3c747b-5b1a-4d8f-863f-caf3db8f0569",
            capacity: "68195aa4-ec44-46ec-8b74-51e341e4ed66",
            warranty: "9d144768-a8e3-49be-8b89-b27300a9769a",
            slug: "it1548tt",
            isBestSeller: true,
            price: "14,440",
        },
        {
            type: ProductType.battery,
            name: "051eb599-fedc-46ea-be7c-5d857fad1d76",
            capacity: "e42d6d5a-4b06-45de-b675-cc467d47d4b4",
            warranty: "33862866-bbdb-46ad-a797-f7fbd07df131",
            slug: "it2272tt",
            price: "19,499",
        },
    ];

    return (
        <div className={className}>
            <div className="tw-grid tw-grid-cols-1">
                <h2 className="lg-text-headline tw-text-center">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("5ac20616-07fb-44f4-bf6f-c5e16b272eb8", userPreferences.language)}} />
                </h2>

                <VerticalSpacer className="tw-h-8" />

                <CarouselStyle4
                    items={featuredProducts
                        // .sort((product) => (product.isBestSeller === true ? -1 : 1))
                        .map((featuredProduct, featuredProductIndex) => (
                            <RecommendationCard
                                slug={featuredProduct.slug}
                                productType={featuredProduct.type}
                                name={getVernacularString(featuredProduct.name, userPreferences.language)}
                                capacity={getVernacularString(featuredProduct.capacity, userPreferences.language)}
                                warranty={getVernacularString(featuredProduct.warranty, userPreferences.language)}
                                userPreferences={userPreferences}
                                key={featuredProductIndex}
                                isBestSeller={featuredProduct.isBestSeller}
                                price={featuredProduct.price}
                            />
                        ))}
                    slidesContainerClassName="tw-auto-cols-[min(100%,15rem)]"
                    controlsContainerClassName="lg-px-screen-edge"
                />
            </div>
        </div>
    );
}

function RecommendationCard({
    slug,
    productType,
    userPreferences,
    isBestSeller,
    name,
    capacity,
    warranty,
    price,
}: {
    slug: string;
    productType: ProductType;
    userPreferences: UserPreferences;
    isBestSeller?: boolean;
    name: string;
    capacity: string;
    warranty: string;
    price: string;
}) {
    return (
        <Link
            to={`/product/${slug}`}
            className="tw-w-full tw-h-full tw-grid tw-grid-cols-1 tw-grid-rows-[1.5rem_auto] lg-bg-secondary-100 tw-rounded-lg"
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
                    relativePath={`/livguard/products/${productType == ProductType.battery ? "batteries" : productType == ProductType.inverter ? "inverters" : "jodis"}/${slug}/thumbnail.png`}
                />

                <div className="tw-w-full tw-text-center lg-text-body-bold lg-text-secondary-900">
                    {/* {convertProductInternalNameToPublicName(slug)} */}
                    {name}
                </div>

                <VerticalSpacer className="tw-h-2" />

                <div className="tw-place-self-center tw-w-full tw-grid tw-grid-cols-[minmax(0,1fr)_auto_0.5rem_70%_minmax(0,1fr)] tw-items-center">
                    <img
                        className="tw-col-start-2 tw-invert dark:tw-invert-0"
                        src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/offers/3/capacity.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
                    />
                    <span className="tw-col-start-4 tw-text-center">{capacity}</span>
                </div>

                <VerticalSpacer className="tw-h-2" />

                <div className="tw-place-self-center tw-w-full tw-grid tw-grid-cols-[minmax(0,1fr)_auto_0.5rem_70%_minmax(0,1fr)] tw-items-center">
                    <img
                        className="tw-col-start-2 tw-invert dark:tw-invert-0"
                        src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/offers/3/warranty.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
                    />
                    <span className="tw-col-start-4 tw-text-center">{warranty}</span>
                </div>

                <VerticalSpacer className="tw-h-6" />

                <div className="tw-w-full tw-text-center lg-text-secondary-700">
                    {`${getVernacularString("abce92ec-fd9a-4578-ab56-ddfd9fdafe72", userPreferences.language)}${price}${getVernacularString(
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

function EmptyOfferCard({userPreferences, buttonText, buttonLink}: {userPreferences: UserPreferences; buttonText?: string; buttonLink?: string}) {
    return (
        <div className="tw-w-full tw-h-full tw-min-h-[8rem] tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 lg:tw-grid-rows-[minmax(0,5fr)_2rem_auto_minmax(0,1fr)] tw-justify-items-center tw-items-start lg:tw-place-items-center">
            <div className="lg:tw-col-span-2 lg:tw-row-start-1 tw-w-1/2">
                <FullWidthImage relativePath="/livguard/offers/2/no-offers.png" />
            </div>
            <div className="lg:tw-row-start-3 tw-grid tw-grid-flow-row tw-col-span-2 tw-place-items-center tw-place-content-center">
                <div className="tw-text-center lg-text-title1">{getVernacularString("3b44dc3a-1029-454b-ab4f-748b8cf16a8a", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-1" />

                <div className="tw-text-center lg-text-body !lg-text-secondary-900">{getVernacularString("e4b32997-8139-4b74-8508-0b3ee57977a2", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-4" />

                <Link to={buttonLink}>
                    <button className="lg-cta-button tw-px-6 tw-py-4">{buttonText}</button>
                </Link>
            </div>
        </div>
    );
}

function OfferCard({offer, tryToOpenContactUsDialog, userPreferences, className}: {offer; tryToOpenContactUsDialog; userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full tw-grid tw-grid-cols-1 lg:tw-grid-cols-[minmax(0,1fr)_auto] tw-gap-x-2 lg-bg-secondary-100 tw-rounded-lg tw-pb-2", className)}>
            <div className="lg:tw-col-span-2">
                <FullWidthImage
                    relativePath={`/livguard/offers/2/offer-${offer.name}-${userPreferences.language}.png`}
                    className="tw-rounded-lg"
                />
            </div>

            <VerticalSpacer className="tw-h-4 lg:tw-col-span-2" />

            <div
                className="tw-text-center lg-text-title2 tw-px-4 lg:tw-col-span-2"
                dangerouslySetInnerHTML={{__html: getVernacularString("8110c3a9-9ce4-4fb6-9133-eed73ee34e88", userPreferences.language)}}
            />

            <VerticalSpacer className="tw-h-4 lg:tw-col-span-2" />

            <div className="lg:tw-col-span-2 tw-grid tw-grid-cols-[repeat(2,minmax(0,1fr))] tw-gap-x-4 tw-px-4">
                <img
                    src="https://files.growthjockey.com/livguard/icons/offers/bajaj-finserv.png"
                    alt="Bajaj Finserv Logo"
                    className="tw-justify-self-end tw-px-4 tw-py-2 tw-rounded-lg"
                />

                <img
                    src="https://files.growthjockey.com/livguard/icons/offers/paytail.png"
                    alt="Paytail Logo"
                    className="tw-justify-self-start dark:tw-bg-secondary-900-dark tw-px-4 tw-py-2 tw-rounded-lg"
                />
            </div>

            <VerticalSpacer className="tw-h-4 lg:tw-col-span-2" />

            <div className="lg:tw-col-span-2 tw-px-4 tw-w-full">
                <hr className="tw-w-full lg-border-secondary-900" />
            </div>

            <VerticalSpacer className="tw-h-4 lg:tw-col-span-2" />

            <div className="tw-text-center lg:tw-col-span-2 lg:tw-pl-2">
                {userPreferences.language === Language.Hindi ? (
                    <>
                        {getVernacularString("f0453469-c11f-46c4-b462-ad4445abfc46", userPreferences.language)}
                        {offer.validTill}
                        {getVernacularString("df574a28-5854-4ceb-a9ec-9bfe5dec1b17", userPreferences.language)}
                    </>
                ) : (
                    <>
                        {getVernacularString("f0453469-c11f-46c4-b462-ad4445abfc46", userPreferences.language)}
                        {offer.validTill}
                    </>
                )}
            </div>

            <VerticalSpacer className="tw-h-4 lg:tw-col-span-2" />

            <button
                onClick={tryToOpenContactUsDialog}
                className="lg-cta-button lg:tw-col-span-2 tw-px-2 tw-w-1/2 tw-place-self-center"
            >
                {getVernacularString("4d53d9a4-bbd6-464b-be5c-f0bab1defe02", userPreferences.language)}
            </button>

            <VerticalSpacer className="tw-h-8 lg:tw-col-span-2" />
        </div>
    );
}

function FaqSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const faqs = [
        {
            question: "966a0e78-306b-45e9-ad8f-2b6a0c969baf",
            answer: "c5752ff7-5992-4b5d-8952-c7268f991508",
        },
        {
            question: "3f92c05d-76c1-42b5-acb5-b80c2bd92433",
            answer: "091214cd-663a-4560-9b6d-af4a48fa424b",
        },
        {
            question: "3eee040c-50a3-48d3-86b3-6bc76e59e2a0",
            answer: "0aed81ce-bf2b-4c77-bd84-f1bced9f1dca",
        },
        {
            question: "ef4dd710-d4a8-48c0-ac6a-8e735cb47ea7",
            answer: "34982c2c-6e0f-44be-ae61-00a435a5c754",
        },
        {
            question: "7c20c250-9b65-47fe-b9e7-705d731d2dac",
            answer: "e9d7f2b1-4824-4534-976d-afad6e4c9d75",
        },
    ];

    return (
        <FaqSectionInternal
            faqs={faqs}
            userPreferences={userPreferences}
            className={className}
            textClassName="!lg:tw-text-left"
        />
    );
}
