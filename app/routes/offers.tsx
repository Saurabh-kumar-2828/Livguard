import type {LoaderFunction, V2_MetaFunction} from "@remix-run/node";
import {Link} from "@remix-run/react";
import {useEffect, useState, useContext} from "react";
import {useInView} from "react-intersection-observer";
import {useResizeDetector} from "react-resize-detector";
import {useLoaderData} from "react-router";
import {getProductFromSlugAndLanguage} from "~/backend/product.server";
import {StickyBottomBar} from "~/components/bottomBar";
import {CarouselStyle4} from "~/components/carouselStyle4";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {FaqSectionInternal} from "~/components/faqs";
import {CoverImage} from "~/components/images/coverImage";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {PageScaffold} from "~/components/pageScaffold";
import {SecondaryNavigation} from "~/components/secondaryNavigation";
import {SecondaryNavigationControllerContext} from "~/contexts/secondaryNavigationControllerContext";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {ImageCdnProvider} from "~/global-common-typescript/typeDefinitions";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {useEmblaCarouselWithIndex} from "~/hooks/useEmblaCarouselWithIndex";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {SecondaryNavigationController, useSecondaryNavigationController} from "~/hooks/useSecondaryNavigationController";
import {ProductDetails, ProductType, allProductDetails} from "~/productData.types";
import {ContactUsDialog, DealerLocator} from "~/routes";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import {Language, type UserPreferences} from "~/typeDefinitions";
import {appendSpaceToString, convertProductInternalNameToPublicName, getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest, secondaryNavThreshold} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";

export const meta: V2_MetaFunction = ({data: loaderData}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = loaderData.userPreferences;
    if (userPreferences.language == Language.English) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/offers",
            },
            {
                title: "Exciting Livguard Offers: Buy Inverters, Batteries, and More at Unbeatable Prices!",
            },
            {
                name: "description",
                content: "Get the best deals on Livguard batteries and inverters. Power up your life with reliable and long-lasting solutions. Hurry, limited time offer!",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/offers",
            },
            {
                property: "og:title",
                content: "Exciting Livguard Offers: Buy Inverters, Batteries, and More at Unbeatable Prices!",
            },
            {
                property: "og:description",
                content: "Get the best deals on Livguard batteries and inverters. Power up your life with reliable and long-lasting solutions. Hurry, limited time offer!",
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
                content: `${getAbsolutePathForRelativePath(getMetadataForImage("/livguard/offers/offer-og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null)}`,
            },
            {
                "script:ld+json": {
                    "@type": "SiteNavigationElement",
                    name: "Offer Page",
                    url: "https://www.livguard.com/contact-us",
                    telephone: "+91 92056-67999",
                    contactType: "",
                    streetAddress: "SAR Group Plot No. 221, Udyog Vihar Phase 1, Sector 20",
                    addressLocality: "Gurugram",
                    addressRegion: "Haryana",
                    postalCode: "122016",
                    addressCountry: "India",
                    "E-mail": "marketing@livguard.com, export@sar-group.com",
                },
            },
        ];
    } else if (userPreferences.language == Language.Hindi) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/offers",
            },
            {
                title: "लिवगार्ड के रोमांचक ऑफर: इनवर्टर, बैटरी और बहुत कुछ कम कीमतों पर खरीदें!",
            },
            {
                name: "description",
                content: "पाएं लिवगार्ड बैटरी और इनवर्टर पर सबसे अच्छे सौदे। विश्वसनीय और टिकाऊ समाधानों के साथ अपने जीवन को ऊर्जा से संचालित करें। जल्दी करें, सीमित समय का प्रस्ताव!",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/offers",
            },
            {
                property: "og:title",
                content: "लिवगार्ड के रोमांचक ऑफर: इनवर्टर, बैटरी और बहुत कुछ कम कीमतों पर खरीदें!",
            },
            {
                property: "og:description",
                content: "पाएं लिवगार्ड बैटरी और इनवर्टर पर सबसे अच्छे सौदे। विश्वसनीय और टिकाऊ समाधानों के साथ अपने जीवन को ऊर्जा से संचालित करें। जल्दी करें, सीमित समय का प्रस्ताव!",
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
                content: `${getAbsolutePathForRelativePath(getMetadataForImage("/livguard/offers/offer-og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null)}`,
            },
        ];
    } else {
        throw Error(`Undefined language ${userPreferences.language}`);
    }
};

type LoaderData = {
    userPreferences: UserPreferences;
    redirectTo: string;
    pageUrl: string;
    featuredProducts: Array<ProductDetails>;
};

export const loader: LoaderFunction = async ({request}) => {
    const userPreferences = await getUserPreferencesFromCookiesAndUrlSearchParameters(request);
    if (userPreferences instanceof Error) {
        throw userPreferences;
    }

    const slugs = ["lg700e", "lgs1100i", "it1548tt", "it2272tt", "lg1950i", "lgs1700", "it1584tt", "it1578tt"];

    const featuredProducts = slugs.map((slug) => getProductFromSlugAndLanguage(slug, userPreferences.language));

    const loaderData: LoaderData = {
        userPreferences: userPreferences,
        redirectTo: getRedirectToUrlFromRequest(request),
        pageUrl: getUrlFromRequest(request),
        featuredProducts: featuredProducts,
    };

    return loaderData;
};

export default function () {
    const {userPreferences, redirectTo, pageUrl, featuredProducts} = useLoaderData() as LoaderData;

    const utmSearchParameters = useUtmSearchParameters();
    const secondaryNavigationController = useSecondaryNavigationController();

    return (
        <>
            <PageScaffold
                userPreferences={userPreferences}
                redirectTo={redirectTo}
                showMobileMenuIcon={true}
                utmParameters={utmSearchParameters}
                pageUrl={pageUrl}
                secondaryNavigationController={secondaryNavigationController}
                breadcrumbs={[
                    {contentId: "d502b3fa-3677-4a4a-add3-05647aed0690", link: "/"},
                    {contentId: "af3ba663-53b9-4e18-b3ca-9ea9f80d5134", link: "#"},
                ]}
            >
                <SecondaryNavigationControllerContext.Provider value={secondaryNavigationController}>
                    <OffersPage
                        userPreferences={userPreferences}
                        utmParameters={utmSearchParameters}
                        pageUrl={pageUrl}
                        featuredProducts={featuredProducts}
                        secondaryNavigationController={secondaryNavigationController}
                    />
                </SecondaryNavigationControllerContext.Provider>
            </PageScaffold>

            <StickyBottomBar userPreferences={userPreferences} />
        </>
    );
}

function OffersPage({
    userPreferences,
    utmParameters,
    pageUrl,
    featuredProducts,
    secondaryNavigationController,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
    pageUrl: string;
    featuredProducts: Array<ProductDetails>;
    secondaryNavigationController?: SecondaryNavigationController;
}) {
    const [isContactUsDialogOpen, setIsContactUsDialogOpen] = useState(false);

    function tryToOpenContactUsDialog() {
        setIsContactUsDialogOpen(true);
    }
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);

    return (
        <div className="tw-grid tw-grid-rows-1 tw-grid-cols-1 lg:tw-grid-rows-1 lg:tw-grid-cols-6 tw-gap-x-8 tw-align-stretch tw-pb-10 lg:tw-pb-20">
            <HeroSection
                userPreferences={userPreferences}
                utmParameters={utmParameters}
                pageUrl={pageUrl}
                className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-2 lg:tw-col-span-full" />

            <BestOffers
                userPreferences={userPreferences}
                utmParameters={utmParameters}
                tryToOpenContactUsDialog={tryToOpenContactUsDialog}
                isContactUsDialogOpen={isContactUsDialogOpen}
                setIsContactUsDialogOpen={setIsContactUsDialogOpen}
                pageUrl={pageUrl}
                className="tw-row-start-3 tw-col-start-1 lg:tw-col-span-full tw-w-full lg-px-screen-edge-2 lg:tw-px-[72px] xl:tw-px-[120px] tw-max-w-7xl tw-mx-auto"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-4 lg:tw-col-span-full" />

            <FeaturedProducts
                userPreferences={userPreferences}
                featuredProducts={featuredProducts}
                className="tw-row-start-5 tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px] tw-max-w-7xl tw-mx-auto"
            />
            <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-6 lg:tw-col-span-full" />

            <div className="tw-row-start-7 tw-col-start-1 tw-col-span-full tw-grid tw-grid-cols-1 lg:tw-grid-cols-[minmax(0,2fr),minmax(0,3fr)] lg:tw-grid-rows-1 tw-gap-y-10 lg:tw-gap-x-4 lg:tw-px-[72px] xl:tw-px-[120px] lg:tw-items-center tw-w-full tw-max-w-7xl tw-mx-auto">
                <DealerLocator
                    userPreferences={userPreferences}
                    showCtaButton={true}
                    // TODO: Why do we have a max-h here?
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
    // const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            top: {
                humanReadableName: getVernacularString("9fc64723-0e15-4211-983a-ba03cf9a4d41", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height)-7.5rem)] lg:tw-h-[calc(100vh-7rem)] tw-grid tw-grid-rows-[0_2.5rem_0_auto_0.5rem_auto_1rem_auto_1rem_minmax(0,1fr)_auto_1.5rem] lg:tw-grid-rows-[1.5rem_3rem_minmax(0,1fr)_auto_0.5rem_auto_1rem_auto_1rem_minmax(0,3fr)_auto_1.5rem] tw-justify-items-center tw-text-center lg:tw-text-left tw-relative lg:tw-grid-cols-2 tw-isolate tw-overflow-hidden",
                className,
            )}
            id="top"
            ref={sectionRef}
        >
            <div className="tw-row-start-1 tw-col-start-1 tw-row-span-full tw-col-span-full tw-w-full tw-h-full tw-relative -tw-z-10 tw-isolate">
                <>
                    <CoverImage
                        relativePath={isScreenSizeBelow ? "/livguard/offers/1/bg-banner-desktop.jpg" : "/livguard/offers/1/bg-banner-mobile.jpg"}
                        key={isScreenSizeBelow ? "/livguard/offers/1/bg-banner-desktop.jpg" : "/livguard/offers/1/bg-banner-mobile.jpg"}
                    />

                    <img
                        src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/common/akshay.png")?.finalUrl, ImageCdnProvider.Bunny, null, null)}
                        alt="Akshay Kumar"
                        className={concatenateNonNullStringsWithSpaces(
                            "tw-absolute",
                            isScreenSizeBelow ? "tw-bottom-8 tw-inset-x-0 tw-mx-auto tw-h-3/5 md:tw-h-2/3" : "tw-bottom-[calc(10%+2rem)] tw-right-[20%] tw-h-3/4",
                        )}
                    />

                    <img
                        src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/offers/1/all-products.png")?.finalUrl, ImageCdnProvider.Bunny, null, null)}
                        alt="Livguard inverter-battery combo"
                        className={concatenateNonNullStringsWithSpaces(
                            "tw-absolute",
                            isScreenSizeBelow ? "tw-bottom-8 tw-inset-x-0 tw-mx-auto tw-w-[90%] md:tw-w-[60%]" : "tw-bottom-8 tw-right-0 tw-h-1/2",
                        )}
                    />
                </>
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
    const offers: Array<Array<{offers: Array<{name: string; validTill: string}>; emptyOfferButtonTextPiece: string; emptyOfferButtonLink: string; target?: boolean}>> = [
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
                emptyOfferButtonLink: "/battery-finder",
            },
        ],
        [{offers: [], emptyOfferButtonTextPiece: "1945f91a-ddb2-42ab-99d0-f094a02094b0", emptyOfferButtonLink: "https://www.livguardsolar.com/", target: true}],
        [{offers: [], emptyOfferButtonTextPiece: "15f8008f-5fa5-4b55-9876-916ff55cf323", emptyOfferButtonLink: "/inverter-trolley"}],
    ];

    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "best-offers": {
                humanReadableName: getVernacularString("c7712522-8ed0-4081-b015-bad7c20015a1", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-grid tw-grid-rows-[auto,auto,minmax(0,1fr)] tw-grid-cols-1 lg:tw-grid-rows-[auto,minmax(0,1fr)] lg:tw-grid-cols-[auto,minmax(0,1fr)] tw-gap-x-4 tw-gap-y-6",
                className,
            )}
            id="best-offers"
            ref={sectionRef}
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
                className="tw-overflow-hidden tw-col-start-1 tw-col-span-full tw-row-start-3 lg:tw-row-start-2 lg:tw-col-start-2 lg-card-shadow-hack"
                // ref={emblaRef}
            >
                <div className="tw-grid tw-grid-flow-col tw-auto-cols-[100%]">
                    {offers[selectedCategoryIndex][0].offers.length === 0 ? (
                        <EmptyOfferCard
                            userPreferences={userPreferences}
                            buttonText={getVernacularString(offers[selectedCategoryIndex][0].emptyOfferButtonTextPiece, userPreferences.language)}
                            buttonLink={offers[selectedCategoryIndex][0].emptyOfferButtonLink}
                            target={offers[selectedCategoryIndex][0].target}
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

function FeaturedProducts({userPreferences, featuredProducts, className}: {userPreferences: UserPreferences; featuredProducts: Array<ProductDetails>; className?: string}) {
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "featured-products": {
                humanReadableName: getVernacularString("86aa4572-0487-4dcd-a8fd-bcf887b6e296", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    // const featuredProducts = [
    //     {
    //         type: ProductType.inverter,
    //         warranty: "a8de768d-be36-4746-b3d4-ee72e6dbe3a6",
    //         capacity: "fac6f9bf-7f72-487d-b802-4e2e9a1d520f",
    //         slug: "lg700e",
    //         price: "4,699",
    //     },
    //     {
    //         type: ProductType.inverter,
    //         warranty: "a8de768d-be36-4746-b3d4-ee72e6dbe3a6",
    //         capacity: "ede80aa8-51b8-4695-adb7-0fd148def188",
    //         slug: "lgs1100i",
    //         isBestSeller: true,
    //         price: "6,999",
    //     },
    //     {
    //         type: ProductType.battery,
    //         capacity: "68195aa4-ec44-46ec-8b74-51e341e4ed66",
    //         warranty: "9d144768-a8e3-49be-8b89-b27300a9769a",
    //         slug: "it1548tt",
    //         isBestSeller: true,
    //         price: "14,440",
    //     },
    //     {
    //         type: ProductType.battery,
    //         capacity: "e42d6d5a-4b06-45de-b675-cc467d47d4b4",
    //         warranty: "33862866-bbdb-46ad-a797-f7fbd07df131",
    //         slug: "it2272tt",
    //         price: "19,499",
    //     },
    //     {
    //         type: ProductType.inverter,
    //         warranty: "9c479fcb-3f9a-47e2-a882-bd8f7d0a07c0",
    //         capacity: "20184ae3-2f4e-467f-b440-e446ae611331",
    //         slug: "lg1950i",
    //         price: "7,699",
    //     },
    //     {
    //         type: ProductType.inverter,
    //         warranty: "81bdfd50-fab0-419b-a8d3-2116c190ba9f",
    //         capacity: "05b5a3d3-5023-4549-b8af-87c5e284b022",
    //         slug: "lgs1700",
    //         price: "9,499",
    //     },
    //     {
    //         type: ProductType.battery,
    //         capacity: "c41f16ec-4789-43a2-81cd-74852fa07169",
    //         warranty: "7b2dc937-de7d-4c76-9f7a-6a804267562e",
    //         slug: "it1584tt",
    //         price: "15,999",
    //     },
    //     {
    //         type: ProductType.battery,
    //         capacity: "0224e287-af94-47fa-8ca4-410424c8861c",
    //         warranty: "d997eb4d-3ffc-4b1a-a4f5-e88ae9aabcee",
    //         slug: "it1578tt",
    //         price: "15,199",
    //     },
    // ];

    return (
        <div
            className={className}
            id="featured-products"
            ref={sectionRef}
        >
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
                                capacity={featuredProduct.productIcons[0].text}
                                warranty={featuredProduct.productIcons[1].text}
                                userPreferences={userPreferences}
                                key={featuredProductIndex}
                                isBestSeller={featuredProductIndex == 2 || featuredProductIndex == 3}
                                price={featuredProduct.price == null ? undefined : featuredProduct.price.toString()}
                                humanReadableModelNumber={featuredProduct.humanReadableModelNumber}
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
    // TODO: Check if this can be removed now
    productType,
    userPreferences,
    isBestSeller,
    capacity,
    warranty,
    price,
    humanReadableModelNumber,
}: {
    slug: string;
    productType: ProductType;
    userPreferences: UserPreferences;
    isBestSeller?: boolean;
    capacity: string;
    warranty: string;
    price?: string;
    humanReadableModelNumber: string;
}) {
    return (
        <Link
            to={`/product/${slug}`}
            className="tw-w-full tw-h-full tw-grid tw-grid-cols-1 tw-grid-rows-[1.5rem_auto] lg-card"
        >
            {isBestSeller != null && isBestSeller === true ? (
                <div className="tw-row-start-1 tw-h-full lg-stabilizers-best-seller-gradient tw-rounded-tr-lg tw-place-self-end tw-text-xs tw-px-3 tw-py-1 lg:tw-px-4 tw-flex tw-flex-row tw-items-center !tw-text-secondary-900-dark">
                    <span>{getVernacularString("14e0e286-5fd7-43aa-a6f3-5b3b9a0ec71f", userPreferences.language)}</span>
                </div>
            ) : (
                <VerticalSpacer className="tw-h-full" />
            )}

            <div className="tw-p-4 tw-grid tw-grid-flow-row tw-grid-rows-[repeat(6,auto)_minmax(0,1fr)_repeat(4,auto)]">
                <FullWidthImage relativePath={`/livguard/products/${slug}/thumbnail.png`} />

                <div className="tw-w-full tw-text-center lg-text-body-bold lg-text-secondary-900">
                    {humanReadableModelNumber}
                    {/* {name} */}
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

                <div className="tw-w-full tw-text-center lg-text-secondary-700 tw-row-start-8">
                    {price == null
                        ? "Price under updation"
                        : `${getVernacularString("abce92ec-fd9a-4578-ab56-ddfd9fdafe72", userPreferences.language)}${price}${getVernacularString(
                              "0044b486-6eca-4e3a-abf0-102eede6e10c",
                              userPreferences.language,
                          )}`}
                </div>

                <VerticalSpacer className="tw-h-4 tw-row-start-10" />

                <button className="lg-cta-button-product-card tw-w-full tw-text-center tw-px-1 tw-row-start-11">
                    {getVernacularString("042883e9-36eb-4803-ae55-4a0e495a8752", userPreferences.language)}
                </button>
            </div>
        </Link>
    );
}

function EmptyOfferCard({userPreferences, buttonText, buttonLink, target}: {userPreferences: UserPreferences; buttonText?: string; buttonLink?: string; target?: boolean}) {
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

                <Link
                    to={buttonLink}
                    target={target === true ? "_blank" : undefined}
                >
                    <button className="lg-cta-button tw-px-6 tw-py-4">{buttonText}</button>
                </Link>
            </div>
        </div>
    );
}

function OfferCard({offer, tryToOpenContactUsDialog, userPreferences, className}: {offer; tryToOpenContactUsDialog; userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full tw-grid tw-grid-cols-1 lg:tw-grid-cols-[minmax(0,1fr)_auto] tw-gap-x-2 lg-card tw-rounded-lg", className)}>
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

            <VerticalSpacer className="tw-h-6 lg:tw-col-span-2" />

            {/* <div className="tw-text-center lg:tw-col-span-2 lg:tw-pl-2">
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
            </div> */}

            {/* <VerticalSpacer className="tw-h-4 lg:tw-col-span-2" /> */}

            <button
                onClick={tryToOpenContactUsDialog}
                className="lg-cta-button lg:tw-col-span-2 tw-px-2 tw-w-1/2 tw-place-self-center"
            >
                {getVernacularString("4d53d9a4-bbd6-464b-be5c-f0bab1defe02", userPreferences.language)}
            </button>

            <VerticalSpacer className="tw-h-6 lg:tw-col-span-2" />
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
