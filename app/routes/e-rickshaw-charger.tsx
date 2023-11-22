import {LoaderFunction, V2_MetaFunction} from "@remix-run/node";
import {Link, useLoaderData} from "@remix-run/react";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {PageScaffold} from "~/components/pageScaffold";
import {FaqSectionInternal} from "~/components/faqs";
import {EmbeddedYoutubeVideo} from "~/components/embeddedYoutubeVideo";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import {Language, Theme, UserPreferences} from "~/typeDefinitions";
import {getContentGenerator} from "~/vernacularProvider";
import {getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest, secondaryNavThreshold} from "~/utilities";
import {CarouselStyle5} from "~/components/carouselStyle5";
import {FullWidthImage} from "~/components/images/simpleFullWidthImage";
import React, {useContext, useEffect} from "react";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ImageCdnProvider, ImageMetadata} from "~/common--type-definitions/typeDefinitions";
import {FormSelectComponent} from "~/livguard-common-typescript/scratchpad";
import {ProductAndCategoryBottomBar} from "~/components/productAndCategoryBottomBar";
import {DealerLocator} from "~/reusableSections/dealerLocator";
import {SocialHandles} from "~/components/category/common";
import {ProductDetails} from "~/productData.types";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {SecondaryNavigationController, useSecondaryNavigationController} from "~/hooks/useSecondaryNavigationController";
import {SecondaryNavigationControllerContext} from "~/contexts/secondaryNavigationControllerContext";
import {useInView} from "react-intersection-observer";
import {getProductFromSlugAndLanguage} from "~/backend/product.server";
import {getVernacularFromBackend} from "~/backend/vernacularProvider.server";
import {ContentProviderContext} from "~/contexts/contentProviderContext";
import {getImageMetadataLibraryFromBackend, getMetadataForImageServerSide} from "~/backend/imageMetaDataLibrary.server";
import {ImageProviderContext} from "~/contexts/imageMetaDataContext";
import {AutomotiveTestimonials} from "~/routes/two-wheeler-batteries";
import { SocialMediaFeedsSection } from ".";

export const meta: V2_MetaFunction = ({data: loaderData}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = loaderData.userPreferences;
    if (userPreferences.language == Language.English) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/e-rickshaw-charger",
            },
            {
                title: "Get a Livguard e-rickshaw charger to energise every ride",
            },
            {
                name: "description",
                content: "Choose Livguard's e-rickshaw chargers for unmatched performance and exceptional journeys. Experience hassle-free charging even during low input voltages.",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/e-rickshaw-charger",
            },
            {
                property: "og:title",
                content: "Get a Livguard e-rickshaw charger to energise every ride",
            },
            {
                property: "og:description",
                content: "Choose Livguard's e-rickshaw chargers for unmatched performance and exceptional journeys. Experience hassle-free charging even during low input voltages.",
            },
            {
                property: "og:site_name",
                content: "Livguard",
            },
            {
                property: "og:type",
                content: "Product",
            },
            {
                property: "og:image",
                content: loaderData.ogBanner,
            },
        ];
    } else if (userPreferences.language == Language.Hindi) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/e-rickshaw-charger",
            },
            {
                title: "हर सफर को ऊर्जावान बनाने के लिए लिवगार्ड ई-रिक्शा चार्जर प्राप्त करें",
            },
            {
                name: "description",
                content: "बेजोड़ प्रदर्शन और ख़ास यात्राओं के लिए लिवगार्ड के ई-रिक्शा चार्जर को चुनें। कम इनपुट वोल्टेज के दौरान भी बिना किसी परेशानी के चार्जिंग का अनुभव करें।",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/e-rickshaw-charger",
            },
            {
                property: "og:title",
                content: "हर सफर को ऊर्जावान बनाने के लिए लिवगार्ड ई-रिक्शा चार्जर प्राप्त करें",
            },
            {
                property: "og:description",
                content: "बेजोड़ प्रदर्शन और ख़ास यात्राओं के लिए लिवगार्ड के ई-रिक्शा चार्जर को चुनें। कम इनपुट वोल्टेज के दौरान भी बिना किसी परेशानी के चार्जिंग का अनुभव करें।",
            },
            {
                property: "og:site_name",
                content: "Livguard",
            },
            {
                property: "og:type",
                content: "Product",
            },
            {
                property: "og:image",
                content: loaderData.ogBanner,
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
    products: Array<ProductDetails>;
    vernacularData: {
        [id: string]: string;
    };
    imageMetaDataLibrary: {
        [relativePath: string]: ImageMetadata | undefined;
    };
    ogBanner: string;
};

export const loader: LoaderFunction = async ({request}) => {
    const userPreferences = await getUserPreferencesFromCookiesAndUrlSearchParameters(request);
    if (userPreferences instanceof Error) {
        throw userPreferences;
    }

    const slugs = ["e-rickshaw-charger", "e-rickshaw-charger-black"];

    const products = slugs.map((slug) => getProductFromSlugAndLanguage(slug, userPreferences.language));
    const vernacularData = getVernacularFromBackend("eRickshawChargerPage", userPreferences.language);
    const imageMetaDataLibrary = getImageMetadataLibraryFromBackend("eRickshawChargerPage");
    const ogBanner = getAbsolutePathForRelativePath(getMetadataForImageServerSide("/livguard/e-rickshaw-charger/e-rickshaw-charger-og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null);

    const loaderData: LoaderData = {
        userPreferences: userPreferences,
        redirectTo: getRedirectToUrlFromRequest(request),
        pageUrl: getUrlFromRequest(request),
        products: products,
        vernacularData: vernacularData,
        imageMetaDataLibrary: imageMetaDataLibrary,
        ogBanner: ogBanner,
    };

    return loaderData;
};

export default () => {
    const {userPreferences, redirectTo, pageUrl, products, vernacularData, imageMetaDataLibrary} = useLoaderData() as LoaderData;

    const utmSearchParameters = useUtmSearchParameters();

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
                            {contentId: "9ca81248-816e-4978-90b0-34b4d0dd69e9", link: "#"},
                        ]}
                        secondaryNavigationController={secondaryNavigationController}
                    >
                        <SecondaryNavigationControllerContext.Provider value={secondaryNavigationController}>
                            <ERickshawChargerPage
                                userPreferences={userPreferences}
                                utmParameters={utmSearchParameters}
                                pageUrl={pageUrl}
                                secondaryNavigationController={secondaryNavigationController}
                                products={products}
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
};

function ERickshawChargerPage({
    userPreferences,
    utmParameters,
    pageUrl,
    secondaryNavigationController,
    products,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
    pageUrl: string;
    secondaryNavigationController?: SecondaryNavigationController;
    products: Array<ProductDetails>;
}) {
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);
    return (
        <>
            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-x-16 tw-items-start tw-justify-center">
                <HeroSection
                    userPreferences={userPreferences}
                    className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
                />
                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-2 tw-col-start-1 lg:tw-col-span-full" />

                <SuperiorFeatures
                    userPreferences={userPreferences}
                    className="tw-row-start-4 tw-col-start-1 lg-px-screen-edge-2 lg:tw-px-0 tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-5 tw-col-start-1 lg:tw-col-span-full" />

                <OurSuggestionsBasedOnYourChoice
                    products={products}
                    userPreferences={userPreferences}
                    className="tw-row-start-6 tw-col-start-1 lg:tw-col-span-full tw-w-full"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-7 tw-col-start-1 lg:tw-col-span-full" />

                <DiscoverMore
                    userPreferences={userPreferences}
                    className="tw-row-start-8 tw-col-start-1 lg:tw-col-span-full tw-w-full tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-9 tw-col-start-1 lg:tw-col-span-full" />

                <div className="tw-row-start-[10] tw-grid lg:tw-grid-cols-[minmax(0,1fr)_minmax(0,2fr)] tw-col-span-full lg:lg-px-screen-edge-2 tw-gap-x-5 tw-max-w-7xl tw-mx-auto">
                    <DealerLocator
                        userPreferences={userPreferences}
                        showCtaButton={true}
                        secondaryNavigationName="0cb6d442-7df4-4272-a36d-9f956bdd8a54"
                        className="tw-row-start-5 lg:tw-col-start-1 lg:tw-h-full"
                    />

                    <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-6 lg:tw-col-start-1 lg:tw-col-span-full lg:tw-hidden" />

                    <ChooseTheRightBattery
                        userPreferences={userPreferences}
                        className="tw-row-start-7 lg:tw-row-start-5 lg:tw-col-start-2"
                    />
                </div>

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[11] tw-col-start-1 lg:tw-col-span-full" />

                <AutomotiveTestimonials
                    userPreferences={userPreferences}
                    className="tw-row-start-[12] lg:tw-col-start-1 lg:tw-col-span-full lg-px-screen-edge-2"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[13] tw-col-start-1 lg:tw-col-span-full" />

                <SocialMediaFeedsSection
                    userPreferences={userPreferences}
                    className="tw-row-start-[14] tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px] tw-gap-[1rem] tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[15] tw-col-start-1 lg:tw-col-span-full" />

                <FaqSection
                    userPreferences={userPreferences}
                    className="tw-row-start-[16] lg:tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px] tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[17] tw-col-start-1 lg:tw-col-span-full" />
            </div>
        </>
    );
}

function HeroSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-aspect-square lg:tw-aspect-[1280/380] tw-grid tw-grid-rows-[2rem_auto_auto_1rem_auto_1.5rem_minmax(0,1fr)] lg:tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)] tw-text-center lg:tw-text-left",
                className,
            )}
        >
            <div className="tw-row-start-1 tw-col-start-1 tw-row-span-full tw-col-span-full tw-h-full tw-w-full">
                {isScreenSizeBelow == null ? null : (
                    <>
                        <FullWidthImage
                            relativePath={isScreenSizeBelow ? "/livguard/e-rickshaw-charger/1/mobile-banner.jpg" : "/livguard/e-rickshaw-charger/1/desktop-banner.jpg"}
                            key={isScreenSizeBelow ? "/livguard/e-rickshaw-charger/1/mobile-banner.jpg" : "/livguard/e-rickshaw-charger/1/desktop-banner.jpg"}
                        />
                    </>
                )}
            </div>

            <DefaultTextAnimation className="tw-row-start-2 tw-col-start-1 lg:tw-col-span-full lg-px-screen-edge-2 tw-place-self-center lg:tw-justify-self-start lg:tw-text-left">
                <div className="lg-text-banner tw-text-secondary-900-dark tw-text-center">{contentData.getContent("cf6da0b7-e5ad-4b79-b0a5-65a72b31b132")}</div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-3 tw-col-start-1 lg:tw-col-span-full lg-px-screen-edge-2 tw-place-self-center lg:tw-justify-self-start lg:tw-text-left">
                <div className="lg-text-banner tw-text-secondary-900-dark tw-text-center">{contentData.getContent("1e3021a0-0a0d-479a-84eb-bcc17a9747a0")}</div>
            </DefaultTextAnimation>
        </div>
    );
}

function SuperiorFeatures({userPreferences, className}: {userPreferences: UserPreferences; className: string}) {
    const contentData = useContext(ContentProviderContext);
    const BatteryCard = ({title, description, imageRelativePath}: {title: string; description: string; imageRelativePath: string}) => {
        return (
            <div
                className={concatenateNonNullStringsWithSpaces(
                    "tw-place-self-center tw-grid tw-grid-rows-[1rem_auto_1rem_auto_1rem_auto_minmax(1rem,1fr)] tw-cols-[auto] tw-w-full tw-h-full tw-px-4 tw-py-4 lg-card",
                )}
            >
                <div className="tw-row-start-2">
                    <FullWidthImage
                        relativePath={imageRelativePath}
                        className="tw-rounded-lg"
                    />
                </div>

                <div className="tw-row-start-4 tw-text-center lg-text-title1">{title}</div>

                <div className="tw-row-start-6 tw-text-center lg-text-body">{description}</div>
            </div>
        );
    };

    const batteriesData: Array<{titleTextContentPiece: string; bodyTextContentPiece: string; imageRelativePath: string}> = [
        {
            titleTextContentPiece: "21748a0f-e0be-44cd-923a-11ae935b45eb",
            bodyTextContentPiece: "82f2e4a8-15fb-4550-99f8-2fc0237de6d8",
            imageRelativePath: "/livguard/e-rickshaw-charger/2/battery-life.jpg",
        },
        {
            titleTextContentPiece: "b36f8113-ef64-414d-b594-6bb905020b19",
            bodyTextContentPiece: "0d3152bf-e182-4056-94b4-e8db4de162fb",
            imageRelativePath: "/livguard/e-rickshaw-charger/2/consumes-less-electricity.jpg",
        },
        {
            titleTextContentPiece: "b2b7631c-eef1-4fbd-9220-5fcf78963f22",
            bodyTextContentPiece: "0a9f62b4-59aa-4928-ae6f-2a2b9ac00504",
            imageRelativePath: "/livguard/e-rickshaw-charger/2/consumes-less-water.jpg",
        },
        {
            titleTextContentPiece: "b51fbf4d-1863-4023-8f74-56da965cc2d6",
            bodyTextContentPiece: "9ad07919-0bfe-452d-866a-ae6230941971",
            imageRelativePath: "/livguard/e-rickshaw-charger/2/overcharge-protection.jpg",
        },
        {
            titleTextContentPiece: "d1559042-37b6-400d-8c27-8bf1ff82dcbf",
            bodyTextContentPiece: "8fda5ab6-83c8-4373-b253-4aa6db78f4c1",
            imageRelativePath: "/livguard/e-rickshaw-charger/2/low-voltage-charging.jpg",
        },
        {
            titleTextContentPiece: "16dd3897-b1b3-4de7-92f0-f602d56b2b7f",
            bodyTextContentPiece: "9361ff0a-c2ac-4582-b8fd-cc9273f05058",
            imageRelativePath: "/livguard/e-rickshaw-charger/2/deep-discharge.jpg",
        },
    ];
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            features: {
                humanReadableName: contentData.getContent("f19bea1b-ce21-4a14-af85-b49b68827611"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <>
            <div
                className={concatenateNonNullStringsWithSpaces("tw-w-full lg:tw-col-span-full", className)}
                id="features"
                ref={sectionRef}
            >
                <DefaultTextAnimation className="tw-flex tw-flex-col tw-items-center lg-text-headline lg:lg-px-screen-edge-2 lg:tw-pl-0 lg:tw-pr-0 tw-text-center lg:tw-text-left">
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent("6148b8eb-4751-480f-96ef-b8ef9a1754a0")}} />
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent("5323b1af-564e-435c-8e06-2d3041494551")}} />
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-4 lg:tw-h-8" />

                <CarouselStyle5
                    items={batteriesData.map((batteryData, batteryDataIndex) => (
                        <BatteryCard
                            title={contentData.getContent(batteryData.titleTextContentPiece)}
                            description={contentData.getContent(batteryData.bodyTextContentPiece)}
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

function OurSuggestionsBasedOnYourChoice({userPreferences, className, products}: {userPreferences: UserPreferences; className?: string; products: Array<ProductDetails>}) {
    const contentData = useContext(ContentProviderContext);
    const chargersData = products.map((product) => ({
        batterySlug: product.slug,
        imageRelativeUrl: product.images[0].image,
        name: product.title,
        description: product.description,
        warranty: product.specifications[1].value,
        capacity: product.specifications[2].value,
        grid: product.specifications[3].value,
        dimensions: product.specifications[4].value,
    }));

    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "featured-products": {
                humanReadableName: contentData.getContent("86aa4572-0487-4dcd-a8fd-bcf887b6e296"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-w-full tw-grid tw-grid-flow-row lg-card tw-rounded-lg", className)}
            id="featured-products"
            ref={sectionRef}
        >
            <VerticalSpacer className="tw-h-6 lg:tw-h-10" />

            <div
                className="lg-text-headline tw-place-self-center"
                dangerouslySetInnerHTML={{__html: contentData.getContent("2fb36c26-a28f-4b1a-878a-fdb7d122caf4")}}
            />
            <div className="lg-text-headline tw-place-self-center">{contentData.getContent("b15faf10-0686-425c-abf7-50c35e7f1658")}</div>

            <VerticalSpacer className="tw-h-4 lg:tw-h-6" />

            <CarouselStyle5
                // @ts-ignore
                items={chargersData.map((battery, batteryIndex) => {
                    return (
                        <BatteryCard
                            userPreferences={userPreferences}
                            batterySlug={battery.batterySlug}
                            imageRelativeUrl={battery.imageRelativeUrl}
                            name={battery.name}
                            description={battery.description}
                            warranty={battery.warranty}
                            capacity={battery.capacity}
                            grid={battery.grid}
                            dimensions={battery.dimensions}
                            key={batteryIndex}
                        />
                    );
                })}
                slidesContainerClassName="!tw-auto-cols-[100%] lg:!tw-auto-cols-max tw-place-self-center tw-items-center"
                selectedContainerClassName="tw-h-full"
                deselectedContainersClassName="tw-scale-[0.9] tw-h-full"
                autoplayDelay={null}
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
    grid,
    dimensions,
}: {
    userPreferences: UserPreferences;
    batterySlug: string;
    imageRelativeUrl: string;
    name: string;
    description: string;
    warranty: string;
    capacity: string;
    grid: string;
    dimensions: string;
}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className="tw-max-w-3xl tw-mx-auto tw-grid tw-grid-cols-1 lg:tw-grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:tw-gap-x-2 lg-card tw-rounded-lg tw-px-4 tw-py-3 lg:tw-py-6 lg:tw-pr-8 lg:tw-pl-4">
            <div className="tw-col-start-1 tw-grid tw-grid-flow-row tw-place-items-center">
                <div className="lg:tw-hidden tw-bg-[#c5c5c5] dark:tw-bg-[#3a3a3a] tw-p-2">{contentData.getContent("22669d2d-400b-4699-9d1c-2dd7078949b5")}</div>
                <div className="tw-w-full tw-h-full tw-grid tw-place-items-center">
                    <FullWidthImage relativePath={imageRelativeUrl} />
                </div>

                <Link
                    className="tw-hidden lg:tw-block"
                    to={`/product/${batterySlug}`}
                >
                    <button className="lg-cta-button">{contentData.getContent("e48d4eeb-f921-45f5-b023-680f699816c5")}</button>
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
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/e-rickshaw-charger/3/voltage-range.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{contentData.getContent("4c6fccf0-2b50-4b41-b2a7-db93be1a7c60")}</div>
                            <div className="tw-row-start-3">{warranty}</div>
                        </div>
                    </div>

                    <div className="tw-row-start-1 tw-col-start-2 md:max-lg:tw-w-full md:max-lg:tw-row-start-2 md:max-lg:tw-col-start-1 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/e-rickshaw-charger/3/connection-type.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{contentData.getContent("5f779720-c57f-4e67-ae7f-5605f86b9e6b")}</div>
                            <div className="tw-row-start-3">{capacity}</div>
                        </div>
                    </div>

                    <div className="tw-row-start-2 tw-col-start-1 md:max-lg:tw-w-full md:max-lg:tw-row-start-3 md:max-lg:tw-col-start-1 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/e-rickshaw-charger/3/weight.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{contentData.getContent("48437a5b-ca95-4bf8-bf26-c899b11b6c87")}</div>
                            <div className="tw-row-start-3">{grid}</div>
                        </div>
                    </div>

                    <div className="tw-row-start-2 tw-col-start-2 md:max-lg:tw-w-full md:max-lg:tw-row-start-4 md:max-lg:tw-col-start-1 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/e-rickshaw-charger/3/3.dimensions.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{contentData.getContent("7c917657-140b-4406-93de-a64702394135")}</div>
                            <div className="tw-row-start-3">{dimensions}</div>
                        </div>
                    </div>
                </div>

                <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

                <Link
                    className="tw-place-self-center lg:tw-hidden"
                    to={`/product/${batterySlug}`}
                >
                    <button className="lg-cta-button">{contentData.getContent("e48d4eeb-f921-45f5-b023-680f699816c5")}</button>
                </Link>

                <VerticalSpacer className="tw-h-4 lg:tw-hidden" />
            </div>
        </div>
    );
}

function DiscoverMore({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "video-guide": {
                humanReadableName: contentData.getContent("067bdc8d-d3a5-4f85-b579-4655b69b6a16"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-flow-row lg-px-screen-edge-2", className)}
            id="video-guide"
            ref={sectionRef}
        >
            <DefaultTextAnimation className="tw-place-self-center">
                <div className="lg-text-headline">{contentData.getContent("bd79396d-6510-44b5-b0cc-222450998828")}</div>
            </DefaultTextAnimation>
            <div className="tw-place-self-center">
                <div
                    className="lg-text-headline"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("a3079b91-9d9c-4adc-9859-158932a6b433")}}
                />
            </div>

            <VerticalSpacer className="tw-h-6" />

            <div className="tw-grid tw-grid-flow-row tw-gap-y-4 lg:tw-gap-y-0 lg:tw-grid-flow-col lg:tw-grid-cols-2 lg:tw-gap-x-4">
                <EmbeddedYoutubeVideo
                    id="GYrIEB_WpBw"
                    style={{aspectRatio: "560/315", borderRadius: "0.5rem"}}
                />
                <EmbeddedYoutubeVideo
                    id="GZLm9rnFncc"
                    style={{aspectRatio: "560/315", borderRadius: "0.5rem"}}
                />
            </div>
        </div>
    );
}

function ChooseTheRightBattery({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "e-rickshaw-battery": {
                humanReadableName: contentData.getContent("afef1fab-9606-4ee8-b11c-d9aad18a9cf0"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_1rem_auto_1rem_auto_minmax(0,1fr)] ", className)}
            id="e-rickshaw-battery"
            ref={sectionRef}
        >
            <div
                className="tw-row-start-2 tw-text-center lg-text-headline"
                dangerouslySetInnerHTML={{__html: contentData.getContent("449e3c56-4dd9-4495-b968-a4ef45533fbb")}}
            />
            <div
                className="tw-row-start-3 tw-text-center lg-text-headline"
                dangerouslySetInnerHTML={{__html: contentData.getContent("e8fb1edc-fdbc-4bc9-b660-012d4cbb10f5")}}
            />
            <div className="tw-row-start-5 tw-text-center lg-px-screen-edge-2">{contentData.getContent("698f4100-216f-4ce8-89be-80b336b942ed")}</div>

            <div className="tw-row-start-7 tw-grid tw-p-4 tw-justify-center tw-w-full">
                <div className="tw-w-fit tw-grid tw-grid-rows-2 lg:tw-grid-rows-1 lg:tw-grid-cols-2 tw-gap-4 tw-grid-flow-col">
                    <a
                        href="https://www.livguard.com/static-assets/livguard-ib-leaflet.pdf"
                        download
                        target="_blank"
                        className="lg-cta-outline-button lg-cta-outline-button-category-section-transition tw-py-3 tw-rounded-full tw-grid tw-grid-cols-[auto_1rem_auto_minmax(0,1fr)] tw-group tw-h-full tw-px-4"
                    >
                        <img
                            className="tw-row-start-1 tw-col-start-1 tw-h-4 tw-w-4 lg:tw-h-6 lg:tw-w-6 tw-place-self-center tw-transition-colors tw-duration-200 group-hover:tw-brightness-0 group-hover:tw-invert"
                            src="https://www.livguard.com/static-assets/icons/stabilizer/download-catalogue.svg"
                        />
                        <div className="tw-row-start-1 tw-col-start-3 tw-flex tw-flex-row tw-items-center lg-text-body group-hover:!tw-text-secondary-100-light tw-transition-colors tw-duration-200">
                            {contentData.getContent("51ae4bbd-0f66-42bc-b031-cc3e9dc4dc26")}
                        </div>
                    </a>
                    <Link
                        to="/e-rickshaw-batteries"
                        className="tw-h-full tw-w-full tw-grid tw-place-items-center"
                    >
                        <div className="tw-h-full tw-w-full tw-grid tw-items-center lg-cta-button tw-place-self-center">{contentData.getContent("c32db78a-c200-4267-b144-cea5563916fe")}</div>
                    </Link>
                </div>
            </div>

            <VerticalSpacer className="lg:tw-row-start-8 tw-hidden lg:tw-block lg:tw-h-12" />
        </div>
    );
}

function FaqSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const faqs = [
        {
            question: "cbf6a50a-ad52-4a12-b18d-022d92cb3197",
            answer: "babe2b57-3281-4fdb-8bf1-f0a884606b9d",
        },
        {
            question: "44e50e4b-ca63-441d-87c0-0f9a8162ede8",
            answer: "b25238bd-2ec4-47ce-9fef-5eb81fc64442",
        },
        {
            question: "5d8cc48e-949d-42ff-aa09-990bae6dcc0e",
            answer: "03c46b7e-91c1-4c05-bd48-690da4852dfb",
        },
        {
            question: "db6d4483-e8d0-4bb4-9b91-e6c200968032",
            answer: "37cc5a33-96d2-4d33-81c5-f3b380aab4c2",
        },
        {
            question: "712e2131-84e1-4fa6-85f7-db2f539c3de6",
            answer: "a8ff0bbf-9b37-4430-b382-9104fb459027",
        },
    ];
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full tw-h-full", className)}>
            <FaqSectionInternal
                faqs={faqs}
                userPreferences={userPreferences}
                className=""
            />
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
    const contentData = useContext(ContentProviderContext);

    return (
        <>
            <LivguardDialog
                isDialogOpen={isContactUsDialogOpen}
                tryToCloseDialog={tryToCloseContactUsDialog}
                title={contentData.getContent("0dc1ec96-3b51-4314-ab45-9b5b542f66c5")}
                showCloseIcon={true}
            >
                <div className="tw-place-self-center tw-w-full tw-grid tw-grid-flow-row tw-gap-y-6">
                    <div>
                        <FormSelectComponent
                            items={Object.keys(brandBatteries)}
                            itemBuilder={(item) => {
                                return item == "" ? contentData.getContent("51d56374-4d1d-46c1-8ef1-f72396e12e6a") : item;
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
                                return item == "" ? contentData.getContent("5793b8a3-16b1-4c11-bc37-ef5062160855") : item;
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
                                return item == "" ? contentData.getContent("97f3fc31-1116-46f6-a385-d4df5e25bde1") : item;
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
                            {contentData.getContent("3231d38a-1950-46eb-be3b-76bd8bce6998")}
                        </button>
                    </div>
                </div>
            </LivguardDialog>
        </>
    );
}

function SocialHandlesSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("", className)}>
            <SocialHandles
                userPreferences={userPreferences}
                heading={{text1: "b0a3aa40-4b00-4bdd-88e0-67085fafa92b", text2: `c0f802cc-902b-4328-b631-a3fad8fc7d18`}}
            />
        </div>
    );
}
