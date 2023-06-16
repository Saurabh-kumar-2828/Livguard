import {ChevronDoubleDownIcon} from "@heroicons/react/20/solid";
import type {LoaderFunction} from "@remix-run/node";
import {Link} from "@remix-run/react";
import {useState} from "react";
import {useResizeDetector} from "react-resize-detector";
import {useLoaderData} from "react-router";
import {StickyBottomBar} from "~/components/bottomBar";
import {CarouselStyle4} from "~/components/carouselStyle4";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultImageAnimation} from "~/components/defaultImageAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {CoverImage} from "~/components/images/coverImage";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {PageScaffold} from "~/components/pageScaffold";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {useEmlbaCarouselWithIndex} from "~/hooks/useEmlbaCarouselWithIndex";
import {ProductType} from "~/productData";
import {ContactUsCta, ContactUsDialog, DealerLocator} from "~/routes";
import {ChooseBestInverterBattery} from "~/routes/__category/inverter-batteries";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {UserPreferences} from "~/typeDefinitions";
import {appendSpaceToString, convertProductInternalNameToPublicName, getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";

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
                breadcrumbs={[{contentId: "af3ba663-53b9-4e18-b3ca-9ea9f80d5134", link: "#"}]}
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
                className="tw-row-start-2 tw-col-start-1 lg:tw-col-span-full tw-w-full lg:tw-px-[72px] xl:tw-px-[120px] tw-max-w-7xl tw-mx-auto"
            />

            <FeaturedProducts
                userPreferences={userPreferences}
                className="tw-row-start-3 tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <div className="tw-row-start-4 tw-col-start-1 tw-col-span-full tw-grid tw-grid-cols-1 tw-grid-rows-2 lg:tw-grid-cols-[minmax(0,2fr),minmax(0,3fr)] lg:tw-grid-rows-1 tw-gap-y-10 lg:tw-gap-x-4 lg:tw-px-[72px] xl:tw-px-[120px] lg:tw-items-center">
                <DealerLocator
                    userPreferences={userPreferences}
                    showCtaButton={true}
                    className="tw-row-start-1 lg:tw-row-span-full lg:tw-col-start-1 lg:tw-h-full lg:tw-min-h-[36rem]"
                />

                <ChooseBestInverterBattery
                    userPreferences={userPreferences}
                    utmParameters={utmParameters}
                    className="tw-row-start-2 lg:tw-col-start-2 lg:tw-row-start-1"
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
        // screen = 48px + 56px + ? + 32px + 56px + 32px + 90px
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-h-[calc(100vh-19.625rem-var(--lg-mobile-ui-height))] lg:tw-h-[calc(100vh-9rem)] tw-min-h-[calc(100vw*7/16)] tw-overflow-hidden",
                className,
            )}
            ref={ref}
        >
            {containerWidth == null || containerHeight == null ? null : (
                <CoverImage
                    relativePath={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/home/1/1-mobile.jpg" : "/livguard/home/1/1-desktop.jpg"}
                    className="tw-row-start-1 tw-col-start-1 tw-row-span-full"
                    key={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/home/1/1-mobile.jpg" : "/livguard/home/1/1-desktop.jpg"}
                />
            )}

            <div className="tw-row-1 tw-col-start-1 tw-row-span-full tw-w-full tw-h-full tw-bg-black tw-opacity-40" />

            <h2 className="tw-row-start-4 tw-col-start-1 tw-flex tw-flex-col tw-gap-y-2 tw-z-10 tw-text-center lg-px-screen-edge">
                <DefaultTextAnimation>
                    <div className="lg-text-banner">{appendSpaceToString(getVernacularString("homeS1T1", userPreferences.language))}</div>
                </DefaultTextAnimation>

                <DefaultTextAnimation>
                    <div className="lg-text-title1">{getVernacularString("homeS1T2", userPreferences.language)}</div>
                </DefaultTextAnimation>
            </h2>

            <DefaultElementAnimation className="tw-row-start-6 tw-col-start-1 tw-z-10">
                <ContactUsCta
                    userPreferences={userPreferences}
                    textVernacId="homeS1T3"
                    className="tw-z-10"
                    utmParameters={utmParameters}
                    pageUrl={pageUrl}
                />
            </DefaultElementAnimation>

            <Link
                to="#energy-storage-solutions"
                className="tw-row-[9] tw-col-start-1"
            >
                <ChevronDoubleDownIcon className="tw-w-12 tw-h-12 lg-text-primary-500 tw-animate-bounce tw-z-10" />
            </Link>
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
    isContactUsDialogOpen: boolean,
    setIsContactUsDialogOpen: React.Dispatch<boolean>,
    tryToOpenContactUsDialog: () => void;
    pageUrl: string;
    className?: string;
}) {
    const {emblaRef, emblaApi, selectedIndex} = useEmlbaCarouselWithIndex({loop: true});

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

            <div className="lg-px-screen-edge tw-grid tw-grid-cols-4 tw-gap-x-4 tw-row-start-2 tw-col-start-1 tw-col-span-full lg:tw-grid-rows-4 lg:tw-grid-cols-1 lg:tw-gap-y-4 lg:tw-row-start-2 lg:tw-col-start-1 lg:tw-col-span-1 lg:tw-py-10">
                <ItemBuilder
                    items={[
                        {
                            svgIcon: "/livguard/home/3/2-icon.png",
                            title: "7b226d84-b7f2-4f94-8626-67627cb47c28",
                        },
                        {
                            svgIcon: "/livguard/home/3/3-icon.png",
                            title: "e3f844b6-79ab-47fd-a25c-67fadebeae73",
                        },
                        {
                            svgIcon: "/livguard/home/3/1-icon.png",
                            title: "ddf400a4-3900-4561-85fb-1447c8693412",
                        },
                        {
                            svgIcon: "/livguard/home/3/4-icon.png",
                            title: "46c68fad-1e6e-442c-ab3c-fc09234693d2",
                        },
                    ]}
                    itemBuilder={(item, itemIndex) => (
                        <button
                            type="button"
                            className="group tw-flex tw-flex-col tw-items-center"
                            onClick={(e) => emblaApi?.scrollTo(itemIndex)}
                            key={itemIndex}
                        >
                            <div
                                className={concatenateNonNullStringsWithSpaces(
                                    "tw-w-12 tw-h-12 tw-rounded-full tw-flex tw-flex-row tw-items-center tw-justify-center tw-duration-200",
                                    `${itemIndex == selectedIndex ? "lg-bg-primary-500 tw-scale-110" : "lg-bg-secondary-300"}`,
                                )}
                            >
                                {/* <FixedWidthImage
                                    relativePath={item.icon}
                                    width="1.5rem"
                                /> */}

                                <img
                                    src={`https://growthjockey.imgix.net${item.svgIcon}`}
                                    className={concatenateNonNullStringsWithSpaces("tw-w-6 tw-h-6", itemIndex == selectedIndex ? "tw-scale-125" : "tw-opacity-50")}
                                />
                            </div>

                            <VerticalSpacer className="tw-h-2" />

                            <div className="lg-text-icon tw-text-center">{`${getVernacularString(item.title, userPreferences.language)}`}</div>
                        </button>
                    )}
                />
            </div>

            <div
                className="tw-overflow-hidden tw-col-start-1 tw-col-span-full tw-row-start-3 lg:tw-row-start-2 lg:tw-col-start-2"
                ref={emblaRef}
            >
                <div className="tw-grid tw-grid-flow-col tw-auto-cols-[100%]">
                    <ItemBuilder
                        items={[
                            [
                                {
                                    name: "finance-partners",
                                    validTill: "June 31, 2023",
                                },
                                null,
                                null,
                                null,
                            ],
                            [
                                {
                                    name: "finance-partners",
                                    validTill: "June 31, 2023",
                                },
                                null,
                                null,
                                null,
                            ],
                            [
                                {
                                    name: "finance-partners",
                                    validTill: "June 31, 2023",
                                },
                                null,
                                null,
                                null,
                            ],
                            [
                                null,
                                null,
                                null,
                                null,
                            ],
                        ]}
                        itemBuilder={(categoryOffers, categoryOffersIndex) => (
                            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-x-4 tw-gap-y-4 tw-px-2">
                                <ItemBuilder
                                    items={categoryOffers}
                                    itemBuilder={(offer, offerIndex) =>
                                        offer == null ? (
                                            <EmptyOfferCard
                                                userPreferences={userPreferences}
                                                key={offerIndex}
                                            />
                                        ) : (
                                            <OfferCard
                                                offer={offer}
                                                userPreferences={userPreferences}
                                                tryToOpenContactUsDialog={tryToOpenContactUsDialog}
                                                key={offerIndex}
                                            />
                                        )
                                    }
                                    key={categoryOffersIndex}
                                />
                            </div>
                        )}
                    />
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
            type: ProductType.battery,
            slug: "it1584tt",
        },
        {
            type: ProductType.inverter,
            slug: "lgs1600",
        },
        {
            type: ProductType.battery,
            slug: "it1584tt",
        },
        {
            type: ProductType.inverter,
            slug: "lgs1600",
        },
        {
            type: ProductType.battery,
            slug: "it1584tt",
        },
        {
            type: ProductType.inverter,
            slug: "lgs1600",
        },
        {
            type: ProductType.battery,
            slug: "it1584tt",
        },
        {
            type: ProductType.inverter,
            slug: "lgs1600",
        },
        {
            type: ProductType.battery,
            slug: "it1584tt",
        },
        {
            type: ProductType.inverter,
            slug: "lgs1600",
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
                    items={featuredProducts.map((featuredProduct, featuredProductIndex) => (
                        <RecommendationCard
                            slug={featuredProduct.slug}
                            productType={featuredProduct.type}
                            userPreferences={userPreferences}
                            key={featuredProductIndex}
                        />
                    ))}
                    slidesContainerClassName="tw-auto-cols-[min(100%,15rem)]"
                    controlsContainerClassName="lg-px-screen-edge"
                />
            </div>
        </div>
    );
}

function RecommendationCard({slug, productType, userPreferences}: {slug: string; productType: ProductType; userPreferences: UserPreferences}) {
    return (
        <Link
            to={`/product/${slug}`}
            className="tw-w-full tw-h-full tw-grid tw-grid-cols-1 tw-p-4 lg-bg-secondary-100 tw-rounded-lg"
        >
            <FullWidthImage
                relativePath={`/livguard/products/${productType == ProductType.battery ? "batteries" : productType == ProductType.inverter ? "inverters" : "jodis"}/${slug}/thumbnail.png`}
            />

            <div className="tw-w-full tw-text-center lg-text-body-bold lg-text-secondary-900">{convertProductInternalNameToPublicName(slug)}</div>

            <VerticalSpacer className="tw-h-2" />

            <div className="tw-w-full tw-text-center lg-text-secondary-700">
                {getVernacularString("c17b911e-a564-4192-a363-11def77e12b9", userPreferences.language)}500{getVernacularString("28c8bd29-74e4-425b-8654-9d0f51a98cba", userPreferences.language)}
            </div>

            <VerticalSpacer className="tw-h-4" />

            <div className="tw-w-full tw-text-center lg-text-body-bold lg-text-primary-500">{getVernacularString("063dc56b-910e-4a48-acb8-8f52668a4c72", userPreferences.language)}</div>
        </Link>
    );
}

function EmptyOfferCard({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="tw-w-full tw-h-full tw-min-h-[8rem] tw-grid tw-grid-cols-1 tw-place-items-center lg-bg-secondary-100 tw-rounded-lg">
            {getVernacularString("b9e34b6e-972e-4246-a393-6450421e4813", userPreferences.language)}
        </div>
    );
}

function OfferCard({offer, tryToOpenContactUsDialog, userPreferences}: {offer; tryToOpenContactUsDialog; userPreferences: UserPreferences}) {
    return (
        <div className="tw-w-full tw-grid tw-grid-cols-1 lg:tw-grid-cols-[minmax(0,1fr)_auto] tw-gap-y-1 tw-gap-x-2 lg-bg-secondary-100 tw-rounded-lg tw-pb-2">
            <div className="lg:tw-col-span-2">
                <FullWidthImage relativePath={`/livguard/offers/2/${offer.name}-${userPreferences.language}.jpg`} className="tw-rounded-lg" />
            </div>

            <div className="tw-text-center lg:tw-text-left lg:tw-pl-2">
                {getVernacularString("f0453469-c11f-46c4-b462-ad4445abfc46", userPreferences.language)}{offer.validTill}
            </div>

            <button
                onClick={tryToOpenContactUsDialog}
                className="lg:tw-pr-2 lg-text-body-bold lg-text-primary-500">
                {getVernacularString("4d53d9a4-bbd6-464b-be5c-f0bab1defe02", userPreferences.language)}
            </button>
        </div>
    );
}
