import type {LoaderFunction, V2_MetaFunction} from "@remix-run/node";
import {Link, useLoaderData} from "@remix-run/react";
import {useEffect, useState, useContext} from "react";
import {useInView} from "react-intersection-observer";
import {getProductFromSlugAndLanguage} from "~/backend/product.server";
import {CarouselStyle5} from "~/components/carouselStyle5";
import {SocialHandles} from "~/components/category/common";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {FaqSectionInternal} from "~/components/faqs";
import {FixedHeightImage} from "~/components/images/fixedHeightImage";
import {FixedWidthImage} from "~/components/images/fixedWidthImage";
import {FullWidthImage} from "~/components/images/simpleFullWidthImage";
import {PageScaffold} from "~/components/pageScaffold";
import {ProductAndCategoryBottomBar} from "~/components/productAndCategoryBottomBar";
import {SecondaryNavigation} from "~/components/secondaryNavigation";
import {SecondaryNavigationControllerContext} from "~/contexts/secondaryNavigationControllerContext";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {ImageCdnProvider, ImageMetadata} from "~/common--type-definitions/typeDefinitions";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {SecondaryNavigationController, useSecondaryNavigationController} from "~/hooks/useSecondaryNavigationController";
import {ProductDetails, allProductDetails} from "~/productData.types";
import {DealerLocator} from "~/reusableSections/dealerLocator";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {UserPreferences} from "~/typeDefinitions";
import {Language} from "~/typeDefinitions";
import {getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest, secondaryNavThreshold} from "~/utilities";
import {getContentGenerator} from "~/vernacularProvider";
import {ContentProviderContext} from "~/contexts/contentProviderContext";
import {getVernacularFromBackend} from "~/backend/vernacularProvider.server";
import {getImageMetadataLibraryFromBackend, getMetadataForImageServerSide} from "~/backend/imageMetaDataLibrary.server";
import {ImageProviderContext} from "~/contexts/imageMetaDataContext";
import {SocialMediaFeedsSection} from ".";

export const meta: V2_MetaFunction = ({data: loaderData}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = loaderData.userPreferences;
    if (userPreferences.language == Language.English) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/high-capacity-inverter-battery",
            },
            {
                title: "Empower Your Home with High-Capacity Inverters",
            },
            {
                name: "description",
                content: "Enjoy unlimited energy with Livguard's intelligent high-capacity inverters, advanced technology, intelligent charging, and guaranteed protection.",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/high-capacity-inverter-battery",
            },
            {
                property: "og:title",
                content: "Empower Your Home with High-Capacity Inverters",
            },
            {
                property: "og:description",
                content: "Enjoy unlimited energy with Livguard's intelligent high-capacity inverters, advanced technology, intelligent charging, and guaranteed protection.",
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
                href: "https://www.livguard.com/high-capacity-inverter-battery",
            },
            {
                title: "उच्च क्षमता वाले इनवर्टर से अपने घर को सशक्त बनाएं",
            },
            {
                name: "description",
                content: "विकसित तकनीक, इंटेलिजेंट चार्जिंग और गारंटीकृत सुरक्षा के साथ लिवगार्ड के  उच्च क्षमता वाले इनवर्टर के साथ असीमित ऊर्जा का अनुभव करें",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/high-capacity-inverter-battery",
            },
            {
                property: "og:title",
                content: "उच्च क्षमता वाले इनवर्टर से अपने घर को सशक्त बनाएं",
            },
            {
                property: "og:description",
                content: "विकसित तकनीक, इंटेलिजेंट चार्जिंग और गारंटीकृत सुरक्षा के साथ लिवगार्ड के  उच्च क्षमता वाले इनवर्टर के साथ असीमित ऊर्जा का अनुभव करें",
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

    const slugs = ["lg2350ixl", "lgs2500", "lgs3000", "lg3500", "lgs4000", "lgs5000"];

    const products = slugs.map((slug) => getProductFromSlugAndLanguage(slug, userPreferences.language));
    const vernacularData = getVernacularFromBackend("hkvaInverterPage", userPreferences.language);
    const imageMetaDataLibrary = getImageMetadataLibraryFromBackend("highCapacityInverterPage");
    const ogBanner = getAbsolutePathForRelativePath(getMetadataForImageServerSide("/livguard/hkva/hkva-og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null);

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
                        secondaryNavigationController={secondaryNavigationController}
                        breadcrumbs={[
                            {contentId: "cfab263f-0175-43fb-91e5-fccc64209d36", link: "/"},
                            {contentId: "d36bc5a4-9718-4e25-bc26-1a8c4853d9b1", link: "#"},
                        ]}
                    >
                        <SecondaryNavigationControllerContext.Provider value={secondaryNavigationController}>
                            <HKVAPage
                                userPreferences={userPreferences}
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

function HKVAPage({
    userPreferences,
    secondaryNavigationController,
    products,
}: {
    userPreferences: UserPreferences;
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

                <ExperienceHighPower
                    userPreferences={userPreferences}
                    className="tw-row-start-3 tw-col-start-1 lg-px-screen-edge-2 lg:tw-px-0 tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-4 tw-col-start-1 lg:tw-col-span-full" />

                <ChooseYourInverter
                    userPreferences={userPreferences}
                    className="tw-row-start-5 tw-col-start-1 lg:tw-col-span-full"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-6 tw-col-start-1 lg:tw-col-span-full" />

                <PowerhouseInverters
                    userPreferences={userPreferences}
                    className="tw-row-start-7 tw-col-start-1 lg:tw-col-span-full tw-w-full"
                    products={products}
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-8 tw-col-start-1 lg:tw-col-span-full" />

                <PowerUpWithHighCapacityInverters
                    userPreferences={userPreferences}
                    className="tw-row-start-9 lg:tw-col-span-full tw-w-full tw-max-w-7xl tw-mx-auto"
                    products={products}
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-10 tw-col-start-1 lg:tw-col-span-full" />

                <div className="tw-row-start-11 tw-grid lg:tw-grid-cols-[minmax(0,1fr)_minmax(0,2fr)] tw-col-span-full lg:lg-px-screen-edge-2 tw-gap-x-5 tw-max-w-7xl tw-mx-auto">
                    <DealerLocator
                        userPreferences={userPreferences}
                        className="tw-row-start-5 lg:tw-col-start-1 lg:tw-h-full"
                        showCtaButton={true}
                        secondaryNavigationName="0cb6d442-7df4-4272-a36d-9f956bdd8a54"
                    />

                    <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-6 lg:tw-col-start-1 lg:tw-col-span-full lg:tw-hidden" />

                    <YourGuideToFindingTheRightInverter
                        userPreferences={userPreferences}
                        className="tw-row-start-7 lg:tw-row-start-5 lg:tw-col-start-2"
                    />
                </div>

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[12] tw-col-start-1 lg:tw-col-span-full" />

                <SocialMediaFeedsSection
                    userPreferences={userPreferences}
                    className="tw-row-start-[13] tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px] tw-gap-[1rem] tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[14] tw-col-start-1 lg:tw-col-span-full" />

                <FaqSection
                    userPreferences={userPreferences}
                    className="tw-row-start-[15] lg:tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px] tw-max-w-7xl"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[16] tw-col-start-1 lg:tw-col-span-full" />
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
                "tw-aspect-square lg:tw-aspect-[1280/380] tw-grid tw-grid-rows-[minmax(0,1fr)_repeat(3,auto)_minmax(0,1fr)] lg:tw-grid-rows-[3rem_auto_auto_minmax(0,2fr)_3rem] tw-text-center lg:tw-text-left lg:tw-grid-cols-1",
                className,
            )}
        >
            <div className="tw-row-start-1 tw-col-start-1 tw-row-span-full tw-col-span-full">
                {isScreenSizeBelow == null ? null : (
                    <>
                        <FullWidthImage
                            relativePath={isScreenSizeBelow ? "/livguard/hkva/1/mobile-banner.jpg" : "/livguard/hkva/1/desktop-banner.jpg"}
                            key={isScreenSizeBelow ? "/livguard/hkva/1/mobile-banner.jpg" : "/livguard/hkva/1/desktop-banner.jpg"}
                        />
                    </>
                )}
            </div>

            <DefaultTextAnimation className="tw-row-start-2 tw-col-start-1 lg-px-screen-edge-2">
                <div className="lg-text-banner tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">{contentData.getContent("1333b617-c9a4-4b8c-b6ae-652d2b17c58b")}</div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-3 tw-col-start-1 lg-px-screen-edge-2">
                <div className="lg-text-banner tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">{contentData.getContent("f7ab7eb5-83ec-4ced-b179-c9ad29f8673e")}</div>
            </DefaultTextAnimation>
        </div>
    );
}

function ExperienceHighPower({userPreferences, className}: {userPreferences: UserPreferences; className: string}) {
    const contentData = useContext(ContentProviderContext);
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

    const InverterUSPCard = ({title, description, imageRelativePath}: {title: string; description: string; imageRelativePath: string}) => {
        return (
            <div
                className={concatenateNonNullStringsWithSpaces(
                    "tw-place-self-center tw-grid tw-grid-rows-[auto_1rem_auto_1rem_auto_minmax(1rem,1fr)] tw-cols-[auto] tw-w-full tw-h-full tw-px-4 tw-py-4 lg-card",
                )}
            >
                <div className="tw-row-start-1">
                    <FullWidthImage
                        relativePath={imageRelativePath}
                        className="tw-rounded-lg"
                    />
                </div>

                <div className="tw-row-start-3 tw-text-center lg-text-title1 lg-text-secondary-900">{title}</div>

                <div className="tw-row-start-5 tw-text-center lg-text-body lg-text-secondary-900">{description}</div>
            </div>
        );
    };

    const invertersData: Array<{titleTextContentPiece: string; bodyTextContentPiece: string; imageRelativePath: string}> = [
        {
            titleTextContentPiece: "ceb40b2c-64aa-4279-a44b-88fdfa0f6940",
            bodyTextContentPiece: "82a58556-3b79-42da-99fa-fb37bf75fc76",
            imageRelativePath: "/livguard/hkva/2/higher-load-carrying-capacity.jpg",
        },
        {
            titleTextContentPiece: "bdf346b3-6536-4eb0-bf84-833185c53ec6",
            bodyTextContentPiece: "312aecd5-8481-4cad-867d-70f3cca7a78c",
            imageRelativePath: "/livguard/hkva/2/interactive-lcd-display.jpg",
        },
        {
            titleTextContentPiece: "9b22fdf1-dec8-48c8-9710-f0d8ac89b7d9",
            bodyTextContentPiece: "6aa6f045-8ba1-4157-a838-c794bc015eba",
            imageRelativePath: "/livguard/hkva/2/dual-mcb-protection.jpg",
        },
        {
            titleTextContentPiece: "bfc88889-a1cb-4fc0-9823-aa2596efdde8",
            bodyTextContentPiece: "6a0ce82e-1378-4cfd-a26f-83152e0ec09a",
            imageRelativePath: "/livguard/hkva/2/new-generation-technology.jpg",
        },
        {
            titleTextContentPiece: "35d69b34-f446-4c69-a20f-1a151f0d5376",
            bodyTextContentPiece: "10f168b5-b818-474b-a5ef-4f475a230786",
            imageRelativePath: "/livguard/hkva/2/smart-ai-charging.jpg",
        },
        {
            titleTextContentPiece: "ceb40b2c-64aa-4279-a44b-88fdfa0f6940",
            bodyTextContentPiece: "82a58556-3b79-42da-99fa-fb37bf75fc76",
            imageRelativePath: "/livguard/hkva/2/higher-load-carrying-capacity.jpg",
        },
        {
            titleTextContentPiece: "bdf346b3-6536-4eb0-bf84-833185c53ec6",
            bodyTextContentPiece: "312aecd5-8481-4cad-867d-70f3cca7a78c",
            imageRelativePath: "/livguard/hkva/2/interactive-lcd-display.jpg",
        },
        {
            titleTextContentPiece: "9b22fdf1-dec8-48c8-9710-f0d8ac89b7d9",
            bodyTextContentPiece: "6aa6f045-8ba1-4157-a838-c794bc015eba",
            imageRelativePath: "/livguard/hkva/2/dual-mcb-protection.jpg",
        },
        {
            titleTextContentPiece: "bfc88889-a1cb-4fc0-9823-aa2596efdde8",
            bodyTextContentPiece: "6a0ce82e-1378-4cfd-a26f-83152e0ec09a",
            imageRelativePath: "/livguard/hkva/2/new-generation-technology.jpg",
        },
        {
            titleTextContentPiece: "35d69b34-f446-4c69-a20f-1a151f0d5376",
            bodyTextContentPiece: "10f168b5-b818-474b-a5ef-4f475a230786",
            imageRelativePath: "/livguard/hkva/2/smart-ai-charging.jpg",
        },
        {
            titleTextContentPiece: "ceb40b2c-64aa-4279-a44b-88fdfa0f6940",
            bodyTextContentPiece: "82a58556-3b79-42da-99fa-fb37bf75fc76",
            imageRelativePath: "/livguard/hkva/2/higher-load-carrying-capacity.jpg",
        },
        {
            titleTextContentPiece: "bdf346b3-6536-4eb0-bf84-833185c53ec6",
            bodyTextContentPiece: "312aecd5-8481-4cad-867d-70f3cca7a78c",
            imageRelativePath: "/livguard/hkva/2/interactive-lcd-display.jpg",
        },
        {
            titleTextContentPiece: "9b22fdf1-dec8-48c8-9710-f0d8ac89b7d9",
            bodyTextContentPiece: "6aa6f045-8ba1-4157-a838-c794bc015eba",
            imageRelativePath: "/livguard/hkva/2/dual-mcb-protection.jpg",
        },
        {
            titleTextContentPiece: "bfc88889-a1cb-4fc0-9823-aa2596efdde8",
            bodyTextContentPiece: "6a0ce82e-1378-4cfd-a26f-83152e0ec09a",
            imageRelativePath: "/livguard/hkva/2/new-generation-technology.jpg",
        },
        {
            titleTextContentPiece: "35d69b34-f446-4c69-a20f-1a151f0d5376",
            bodyTextContentPiece: "10f168b5-b818-474b-a5ef-4f475a230786",
            imageRelativePath: "/livguard/hkva/2/smart-ai-charging.jpg",
        },
    ];

    return (
        <>
            <div
                className={concatenateNonNullStringsWithSpaces("tw-w-full lg:tw-col-span-full", className)}
                id="features"
                ref={sectionRef}
            >
                <DefaultTextAnimation className="tw-flex tw-flex-col tw-items-center lg-text-headline lg:lg-px-screen-edge-2 lg:tw-pl-0 lg:tw-pr-0 tw-text-center lg:tw-text-left">
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent("eaa6ffa9-a509-4be1-8f5e-93a008f86aaf")}} />
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent("354321fa-4e5e-4cc5-80a4-07a320dfe654")}} />
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-4 lg:tw-h-8" />

                <CarouselStyle5
                    snapDotsDivisionFactor={3}
                    items={invertersData.map((batteryData, batteryDataIndex) => (
                        <InverterUSPCard
                            title={contentData.getContent(batteryData.titleTextContentPiece)}
                            description={contentData.getContent(batteryData.bodyTextContentPiece)}
                            imageRelativePath={batteryData.imageRelativePath}
                            key={batteryDataIndex}
                        />
                    ))}
                    className="tw-mx-auto"
                    deselectedContainersClassName="tw-scale-[0.9] tw-h-full"
                    selectedContainerClassName="tw-h-full"
                    itemContainerClassName="lg:tw-px-0"
                />
            </div>
        </>
    );
}

function ChooseYourInverter({userPreferences, className}: {userPreferences: UserPreferences; className: string}) {
    const contentData = useContext(ContentProviderContext);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "your-inverter": {
                humanReadableName: contentData.getContent("fdb7fec0-6865-44e5-a84c-73b11f76c326"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-flex tw-flex-col lg:tw-items-center lg:tw-justify-cente", className)}
            id="your-inverter"
            ref={sectionRef}
        >
            <h2 className="lg-text-screen-edge lg-text-headline tw-text-center">
                <div dangerouslySetInnerHTML={{__html: contentData.getContent("b3b052f7-ef5b-43d1-b426-279e9c05ca84")}} />
                <div dangerouslySetInnerHTML={{__html: contentData.getContent("354448cd-c3be-4427-b3a5-c3f5cf7afaf9")}} />
            </h2>

            <VerticalSpacer className="lg:tw-h-[6.5rem]" />

            <ChooseYourInverterInternal userPreferences={userPreferences} />
        </div>
    );
}

function ChooseYourInverterInternal({userPreferences}: {userPreferences: UserPreferences}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className="md:tw-flex md:tw-justify-center">
            <div className="lg-px-screen-edge tw-grid tw-grid-rows-[7.5rem_repeat(7,auto)] lg:tw-grid-rows-[7.5rem_repeat(7,auto)] tw-grid-cols-[min-content_14rem_14rem] tw-overflow-x-scroll tw-overflow-y-visible [@media(min-width:55rem)]:tw-overflow-visible md:tw-grid-cols-[min-content_22rem_22rem] tw-gap-x-2 tw-pt-20 lg:tw-pt-0">
                <div className="tw-row-start-1 tw-col-start-2 tw-row-span-full tw-w-full tw-h-full tw-py-3 lg-card" />

                <div className="tw-row-start-1 tw-col-start-3 tw-row-span-full tw-w-full tw-h-full tw-py-3 lg-card tw-bg-new-background-border-500-light dark:tw-bg-new-background-500-dark tw-rounded-lg" />

                <div className="tw-row-start-1 tw-col-start-2 tw-px-5 tw-relative tw-bottom-1/2">
                    <div className="tw-flex tw-justify-center tw-items-center lg-card tw-rounded-full tw-h-40 tw-aspect-square tw-mx-auto">
                        <FixedHeightImage
                            relativePath="/livguard/hkva/3/3.1.png"
                            height="6rem"
                        />
                    </div>
                </div>

                <div className="tw-row-start-1 tw-col-start-3 tw-px-5 tw-relative tw-bottom-1/2">
                    <div className="tw-flex tw-justify-center tw-items-center tw-rounded-full tw-bg-[#D9D9D9] tw-w-fit tw-aspect-square tw-mx-auto">
                        <FixedWidthImage
                            relativePath="/livguard/hkva/3/3.2.png"
                            width="10rem"
                        />
                    </div>
                </div>

                <div className="tw-row-start-2 tw-col-start-2 tw-px-4 lg-text-title2 tw-pb-3 tw-text-center">{contentData.getContent("0bcd7c25-b650-4085-990b-36795b06c1f5")}</div>

                <div className="tw-row-start-2 tw-col-start-3 tw-px-4 lg-text-title2 tw-pb-3 tw-text-center">{contentData.getContent("7618d425-96b8-4402-9ffb-50f4a69efbf9")}</div>

                <div className="!tw-font-bold tw-row-start-3 tw-col-start-1 tw-mr-2 max-lg:lg-text-icon tw-py-3 tw-border-solid tw-border-b lg-border-secondary-900 tw-border-opacity-50 lg-text-secondary">
                    {contentData.getContent("1685c892-2604-467b-835b-751154288554")}
                </div>

                <div className="tw-row-start-3 tw-col-start-2 tw-mx-4 tw-py-3 tw-text-center tw-border-solid tw-border-b lg-border-secondary-300 tw-border-opacity-50">
                    {contentData.getContent("1e7e9b6c-9b4b-43c9-876c-3b1eb84c555f")}
                </div>

                <div className="tw-row-start-3 tw-col-start-3 tw-mx-4 tw-py-3 tw-text-center tw-border-solid tw-border-b lg-border-hkva-table tw-border-opacity-50">
                    {contentData.getContent("a5350102-acd3-4024-a3ef-bcf478522fbb")}
                </div>

                <div className="!tw-font-bold tw-row-start-4 tw-col-start-1 tw-mr-2 max-lg:lg-text-icon tw-py-3 tw-border-solid tw-border-b lg-border-secondary-900 tw-border-opacity-50 text-secondary">
                    {contentData.getContent("a331300e-7f4f-4937-b652-be74e52427fa")}
                </div>

                <div className="tw-row-start-4 tw-col-start-2 tw-mx-4 tw-py-3 tw-text-center tw-border-solid tw-border-b lg-border-secondary-300 tw-border-opacity-50">
                    {contentData.getContent("86034731-4b04-4172-8ba3-bc4f6ba538a7")}
                </div>

                <div className="tw-row-start-4 tw-col-start-3 tw-mx-4 tw-py-3 tw-text-center tw-border-solid tw-border-b lg-border-hkva-table tw-border-opacity-50">
                    {contentData.getContent("d293fd91-73a4-4cb9-94b1-fa261e25f284")}
                </div>

                <div className="!tw-font-bold tw-row-start-5 tw-col-start-1 tw-mr-2 max-lg:lg-text-icon tw-py-3 tw-pb-8 lg-text-secondary-900 tw-border-solid tw-border-b lg-border-secondary-900 tw-border-opacity-50 text-secondary">
                    {contentData.getContent("72d5d1e9-8be5-4207-8b96-24ca298341ec")}
                </div>

                <div className="tw-row-start-5 tw-col-start-2 tw-mx-4 tw-py-3 tw-pb-8 tw-text-center tw-border-solid tw-border-b lg-border-secondary-300 tw-border-opacity-50">
                    {contentData.getContent("3e617d69-c451-401f-aba2-40937134cee3")}
                </div>

                <div className="tw-row-start-5 tw-col-start-3 tw-mx-4 tw-py-3 tw-pb-8 tw-text-center tw-border-solid tw-border-b lg-border-hkva-table tw-border-opacity-50">
                    {contentData.getContent("45f25658-b0ea-4f47-aee0-99769c6be404")}
                </div>

                <div className="!tw-font-bold tw-row-start-6 tw-col-start-1 tw-mr-2 max-lg:lg-text-icon tw-py-3 tw-pb-8 lg-text-secondary-900">
                    {contentData.getContent("2ae8f286-2ead-4d34-9c10-b28b49c90149")}
                </div>

                <div className="tw-row-start-6 tw-col-start-2 tw-mx-4 tw-py-3 tw-pb-8 tw-text-center">{contentData.getContent("32461cc4-3f7b-403d-b4f3-b4b413c39c59")}</div>

                <div className="tw-row-start-6 tw-col-start-3 tw-mx-4 tw-py-3 tw-pb-8 tw-text-center">{contentData.getContent("a9a74f7d-81d0-42b3-9f54-690d2ecea92a")}</div>
            </div>
        </div>
    );
}

function PowerhouseInverters({userPreferences, className, products}: {userPreferences: UserPreferences; className?: string; products: Array<ProductDetails>}) {
    const contentData = useContext(ContentProviderContext);
    const inverterData = products.map((product) => ({
        inverterSlug: product.slug,
        imageRelativeUrl: `/livguard/products/${product.slug}/thumbnail.png`,
        name: product.humanReadableModelNumber,
        description: product.description,
        warranty: product.productIcons[0].text,
        capacity: product.specifications[1].value,
        technology: product.specifications[2].value,
        dimensions: product.specifications[3].value,
    }));

    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "suggeseted-inverters": {
                humanReadableName: contentData.getContent("5c88bf46-4d04-4588-ab8b-1be8ab296bf0"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-w-full tw-grid tw-grid-flow-row lg-card tw-rounded-lg", className)}
            id="suggeseted-inverters"
            ref={sectionRef}
        >
            <VerticalSpacer className="tw-h-6 lg:tw-h-10" />

            <div
                className="lg-text-headline tw-place-self-center"
                dangerouslySetInnerHTML={{__html: contentData.getContent("32366348-8f4d-4253-959f-f9b586c26b25")}}
            />
            <div className="lg-text-headline tw-place-self-center">{contentData.getContent("33d1aa29-9949-4a28-92f3-4c27ce30d244")}</div>

            <VerticalSpacer className="tw-h-4 lg:tw-h-6" />

            <CarouselStyle5
                // @ts-ignore
                items={inverterData.map((inverter, inverterIndex) => {
                    return (
                        <InverterCard
                            userPreferences={userPreferences}
                            inverterSlug={inverter.inverterSlug}
                            imageRelativeUrl={inverter.imageRelativeUrl}
                            name={inverter.name}
                            description={inverter.description}
                            warranty={inverter.warranty}
                            capacity={inverter.capacity}
                            technology={inverter.technology}
                            dimensions={inverter.dimensions}
                            key={inverterIndex}
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

function InverterCard({
    userPreferences,
    inverterSlug,
    imageRelativeUrl,
    name,
    description,
    warranty,
    capacity,
    technology,
    dimensions,
}: {
    userPreferences: UserPreferences;
    inverterSlug: string;
    imageRelativeUrl: string;
    name: string;
    description: string;
    warranty: string;
    capacity: string;
    technology: string;
    dimensions: string;
}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className="tw-max-w-3xl tw-mx-auto tw-grid tw-grid-cols-1 lg:tw-grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:tw-gap-x-2 lg-card tw-rounded-lg tw-px-4 tw-py-3 lg:tw-py-6 lg:tw-px-8">
            <div className="tw-col-start-1 tw-grid tw-grid-flow-row tw-place-items-center">
                <div className="lg:tw-hidden tw-bg-[#c5c5c5] dark:tw-bg-[#3a3a3a] tw-p-2">{contentData.getContent("7854d25c-c385-49b5-b1e5-e1127f1d1e5d")}</div>
                <div className="tw-w-full tw-h-full tw-grid tw-items-center">
                    <FullWidthImage relativePath={imageRelativeUrl} />
                </div>

                <Link
                    className="tw-hidden lg:tw-block"
                    to={`/product/${inverterSlug}`}
                >
                    <button className="lg-cta-button">{contentData.getContent("dd68b98c-5aa6-4f3f-824e-056ffa6ae4ee")}</button>
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
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/hkva/4/4.warranty-icon.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{contentData.getContent("be198f94-415e-4384-87d4-3887e8cd8a2c")}</div>
                            <div className="tw-row-start-3">{warranty}</div>
                        </div>
                    </div>

                    <div className="tw-row-start-1 tw-col-start-2 md:max-lg:tw-w-full md:max-lg:tw-row-start-2 md:max-lg:tw-col-start-1 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/hkva/4/4.capacity-icon.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{contentData.getContent("7ee64780-1190-49dc-a305-0f6e9551e8aa")}</div>
                            <div className="tw-row-start-3">{capacity}</div>
                        </div>
                    </div>

                    <div className="tw-row-start-2 tw-col-start-1 md:max-lg:tw-w-full md:max-lg:tw-row-start-3 md:max-lg:tw-col-start-1 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/hkva/4/4.grid-icon.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{contentData.getContent("94ba8c21-8088-4d61-a674-4f9d4ec28744")}</div>
                            <div className="tw-row-start-3">{technology}</div>
                        </div>
                    </div>

                    <div className="tw-row-start-2 tw-col-start-2 md:max-lg:tw-w-full md:max-lg:tw-row-start-4 md:max-lg:tw-col-start-1 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/hkva/4/4.dimensions.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{contentData.getContent("781a0678-8e4b-4543-bda3-c80a5cf30176")}</div>
                            <div className="tw-row-start-3">{dimensions}</div>
                        </div>
                    </div>
                </div>

                <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

                <Link
                    className="tw-place-self-center lg:tw-hidden"
                    to={`/product/${inverterSlug}`}
                >
                    <button className="lg-cta-button">{contentData.getContent("dd68b98c-5aa6-4f3f-824e-056ffa6ae4ee")}</button>
                </Link>

                <VerticalSpacer className="tw-h-4 lg:tw-hidden" />
            </div>
        </div>
    );
}

function PowerUpWithHighCapacityInverters({userPreferences, className, products}: {userPreferences: UserPreferences; className?: string; products: Array<ProductDetails>}) {
    const contentData = useContext(ContentProviderContext);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "our-range": {
                humanReadableName: contentData.getContent("a53c5496-6d8d-4650-bd9e-2f0af6e9da73"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

    const featuredProducts = products.map((product) => ({
        name: product.humanReadableModelNumber,
        slug: product.slug,
        capacity: product.productIcons[1].text,
        warranty: product.productIcons[0].text,
        price: product.price,
        imageRelativeUrl: `/livguard/products/${product.slug}/thumbnail.png`,
    }));

    function InverterCard({
        slug,
        userPreferences,
        isBestSeller,
        productName,
        productPrice,
        capacity,
        warranty,
        imageRelativeUrl,
    }: {
        slug: string;
        userPreferences: UserPreferences;
        isBestSeller?: boolean;
        productName: string;
        productPrice: string;
        capacity: string;
        warranty: string;
        imageRelativeUrl: string;
    }) {
        return (
            <Link
                to={`/product/${slug}`}
                className="tw-w-full tw-h-full tw-grid tw-grid-cols-1 lg-card"
            >
                {/* {isBestSeller != null && isBestSeller === true ? (
                    <div className="tw-row-start-1 tw-h-6 lg-stabilizers-best-seller-gradient tw-rounded-tr-lg tw-place-self-end tw-text-xs tw-px-3 tw-py-1 lg:tw-px-4 tw-flex tw-flex-row tw-items-center !tw-text-secondary-900-dark">
                        <span>{contentData.getContent("f4b66650-853d-4dd7-946f-1cda1f5c724a")}</span>
                    </div>
                ) : ( */}
                {/* <VerticalSpacer className="tw-h-6" /> */}
                {/* )} */}

                <div className="tw-p-4 tw-grid tw-grid-flow-row lg:tw-grid-rows-[minmax(0,1fr)_repeat(9,auto)] lg:tw-items-center">
                    <div className="tw-w-full tw-aspect-square tw-grid tw-items-center">
                        <FullWidthImage relativePath={imageRelativeUrl} />
                    </div>

                    <div className="tw-w-full tw-text-center lg-text-body-bold lg-text-secondary-900">{productName}</div>

                    <VerticalSpacer className="tw-h-2" />

                    <div className="tw-place-self-center tw-grid tw-grid-cols-[minmax(0,1fr)_auto_0.5rem_70%_minmax(0,1fr)] tw-items-center tw-w-full">
                        <img
                            className="tw-col-start-2 tw-invert dark:tw-invert-0"
                            src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/hkva/5/5.capacity.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
                        />
                        <span className="tw-col-start-4 tw-text-center">{capacity}</span>
                    </div>

                    <VerticalSpacer className="tw-h-2" />

                    <div className="tw-place-self-center tw-grid tw-grid-cols-[minmax(0,1fr)_auto_0.5rem_70%_minmax(0,1fr)] tw-items-center tw-w-full">
                        <img
                            className="tw-col-start-2 tw-invert dark:tw-invert-0"
                            src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/hkva/5/5.warranty.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
                        />
                        <span className="tw-col-start-4 tw-text-center">{warranty}</span>
                    </div>

                    <VerticalSpacer className="tw-h-6" />

                    <div className="tw-w-full tw-text-center lg-text-secondary-700">
                        {productPrice == null
                            ? contentData.getContent("ccfce5e6-08ac-44b9-84ad-ef7891d7661b")
                            : `${contentData.getContent("abce92ec-fd9a-4578-ab56-ddfd9fdafe72")}${productPrice}${contentData.getContent(
                                  "0044b486-6eca-4e3a-abf0-102eede6e10c",
                                  userPreferences.language,
                              )}`}
                    </div>

                    <VerticalSpacer className="tw-h-4" />

                    <button className="lg-cta-outline-button lg-cta-outline-button-transition tw-text-primary-500-light dark:tw-text-secondary-100-light tw-w-full tw-text-center tw-px-1">
                        {contentData.getContent("b6b6bee5-c2b4-4221-8776-7e55212e5a0e")}
                    </button>
                </div>
            </Link>
        );
    }

    const [isViewMore, setIsViewMore] = useState(false);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-px-3", className)}
            id="our-range"
            ref={sectionRef}
        >
            <div className="tw-grid tw-grid-cols-1">
                <DefaultTextAnimation>
                    <h2
                        className="lg-text-headline tw-text-center"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("857b8564-8171-4ea0-b4eb-940b767fb270")}}
                    />

                    <h2
                        className="lg-text-headline tw-text-center"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("6cf663f6-3c72-4bbd-93a6-f9e53a53cc08")}}
                    />
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-6 lg:tw-h-12" />

                <div className="tw-grid tw-grid-cols-[repeat(2,minmax(0,1fr))] lg:tw-grid-cols-[repeat(auto-fill,14.5rem)] lg:tw-grid-flow-row-dense lg:tw-justify-center tw-gap-4 lg:tw-gap-8">
                    {isViewMore
                        ? featuredProducts.map((featuredProduct, featuredProductIndex) => (
                              <InverterCard
                                  slug={featuredProduct.slug}
                                  productName={featuredProduct.name}
                                  productPrice={featuredProduct.price}
                                  capacity={`${featuredProduct.capacity} ${contentData.getContent("7ee64780-1190-49dc-a305-0f6e9551e8aa")}`}
                                  warranty={featuredProduct.warranty}
                                  userPreferences={userPreferences}
                                  // isBestSeller={featuredProduct.isBestSeller != null ? featuredProduct.isBestSeller : false}
                                  key={featuredProductIndex}
                                  imageRelativeUrl={featuredProduct.imageRelativeUrl}
                              />
                          ))
                        : featuredProducts.slice(0, 4).map((featuredProduct, featuredProductIndex) => (
                              <InverterCard
                                  slug={featuredProduct.slug}
                                  productName={featuredProduct.name}
                                  productPrice={featuredProduct.price}
                                  capacity={`${featuredProduct.capacity} ${contentData.getContent("7ee64780-1190-49dc-a305-0f6e9551e8aa")}`}
                                  warranty={featuredProduct.warranty}
                                  userPreferences={userPreferences}
                                  // isBestSeller={featuredProduct.isBestSeller != null ? featuredProduct.isBestSeller : false}
                                  key={featuredProductIndex}
                                  imageRelativeUrl={featuredProduct.imageRelativeUrl}
                              />
                          ))}
                </div>

                <VerticalSpacer className="tw-h-4 lg:tw-h-8" />

                <button
                    className="lg-cta-button tw-justify-self-center"
                    onClick={() => setIsViewMore((prev) => !prev)}
                >
                    {!isViewMore ? contentData.getContent("10a749b0-d7b2-4c29-add5-a4afb989249d") : contentData.getContent("05dd627c-2d81-4390-a8ec-4543cb8b8cd7")}
                </button>
            </div>
        </div>
    );
}

function YourGuideToFindingTheRightInverter({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "your-guide": {
                humanReadableName: contentData.getContent("2223a612-f480-45b4-86fb-d5d02dc1a69d"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_1rem_auto_1rem_auto_minmax(0,1fr)] ", className)}
            id="your-guide"
            ref={sectionRef}
        >
            <div className="tw-row-start-2 tw-text-center lg-text-headline">{contentData.getContent("a5bdaea0-3ac4-4e61-bb56-15921022d881")}</div>
            <div
                className="tw-row-start-3 tw-text-center lg-text-headline"
                dangerouslySetInnerHTML={{__html: contentData.getContent("cd0ff218-fadc-488a-a3b8-f97beffed82b")}}
            />
            <div className="tw-row-start-5 tw-text-center lg-px-screen-edge-2">{contentData.getContent("b137befb-819f-4e24-a9f1-8a8a7fefeb3a")}</div>

            <div className="tw-row-start-7 tw-grid tw-p-4 tw-justify-center tw-w-full">
                <div className="tw-w-fit tw-grid tw-grid-rows-2 lg:tw-grid-rows-1 lg:tw-grid-cols-2 tw-gap-4 tw-grid-flow-col">
                    <a
                        href="https://www.livguard.com/static-assets/leaflet-hkva.pdf"
                        download
                        target="_blank"
                        className="lg-cta-outline-button lg-cta-outline-button-category-section-transition tw-py-3 tw-rounded-full tw-grid tw-grid-cols-[auto_1rem_auto_minmax(0,1fr)] tw-group tw-h-full tw-px-4"
                    >
                        <img
                            className="tw-row-start-1 tw-col-start-1 tw-h-4 tw-w-4 lg:tw-h-6 lg:tw-w-6 tw-place-self-center tw-transition-colors tw-duration-200 group-hover:tw-brightness-0 group-hover:tw-invert"
                            src="https://files.growthjockey.com/livguard/icons/stabilizer/download-catalogue.svg"
                        />
                        <div className="tw-row-start-1 tw-col-start-3 tw-flex tw-flex-row tw-items-center lg-text-body group-hover:!tw-text-secondary-100-light tw-transition-colors tw-duration-200">
                            {contentData.getContent("51ae4bbd-0f66-42bc-b031-cc3e9dc4dc26")}
                        </div>
                    </a>
                    <Link
                        to="/load-calculator"
                        className="tw-h-full tw-w-full tw-grid tw-place-items-center"
                    >
                        <div className="tw-h-full tw-w-full tw-grid tw-items-center lg-cta-button tw-place-self-center">{contentData.getContent("59671749-651b-4389-9e22-7f86515eb145")}</div>
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
            question: "7a4063da-8367-4e3a-b134-e718454ecc6f",
            answer: "7ccc15cd-6901-40e3-9cfb-fdfb9c40ad69",
        },
        {
            question: "0d653fa7-c5a0-41f5-9913-74f8992c2f5d",
            answer: "76b40f18-bc9e-4555-a602-9b6d41bd272d",
        },
        {
            question: "3a8dace5-1bf6-455b-ac77-a9d9a8bf6e2e",
            answer: "9634b330-e9b8-446e-96e8-28d907f531db",
        },
        {
            question: "5e58c065-0b92-41ce-911d-368a94065ab2",
            answer: "2b7f86b0-dd77-42c9-9c3e-9a40b26713fa",
        },
        {
            question: "ac088cfa-86ce-44b6-9305-2a30f27784a5",
            answer: "39a21be9-ccf8-44c2-82d5-7488001d7c50",
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
