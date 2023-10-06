import {LinksFunction, LoaderFunction, MetaFunction, V2_MetaFunction} from "@remix-run/node";
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
import {Language, Theme, UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";
import {convertProductInternalNameToPublicName, getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest, secondaryNavThreshold} from "~/utilities";
import {CarouselStyle5} from "~/components/carouselStyle5";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {CarouselStyle3} from "~/components/carouselStyle3";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {ProductDetails, ProductType, allProductDetails} from "~/productData.types";
import React, {useContext, useEffect, useState} from "react";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ImageCdnProvider} from "~/global-common-typescript/typeDefinitions";
import {FormSelectComponent} from "~/livguard-common-typescript/scratchpad";
import LivguardDialog from "~/components/livguardDialog";
import {StickyBottomBar} from "~/components/bottomBar";
import {FixedWidthImage} from "~/components/images/fixedWidthImage";
import {FullHeightImage} from "~/components/images/fullHeightImage";
import {ProductAndCategoryBottomBar} from "~/components/productAndCategoryBottomBar";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {DealerLocator} from "~/routes";
import {SecondaryNavigationControllerContext} from "~/contexts/secondaryNavigationControllerContext";
import {SecondaryNavigationController, useSecondaryNavigationController} from "~/hooks/useSecondaryNavigationController";
import {SecondaryNavigation} from "~/components/secondaryNavigation";
import {useInView} from "react-intersection-observer";
import {getProductFromSlugAndLanguage} from "~/backend/product.server";

export const meta: V2_MetaFunction = ({data: loaderData}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = loaderData.userPreferences;
    if (userPreferences.language == Language.English) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/inverter-trolley",
            },
            {
                title: "Find the Ideal Inverter trolley to Protect Your Power!",
            },
            {
                name: "description",
                content: "Get the ideal inverter battery trolley from Livguard that combines style, strength, and stability for your inverter and inverter battery.",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/inverter-trolley",
            },
            {
                property: "og:title",
                content: "Find the Ideal Inverter trolley to Protect Your Power!",
            },
            {
                property: "og:description",
                content: "Get the ideal inverter battery trolley from Livguard that combines style, strength, and stability for your inverter and inverter battery.",
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
                content: `${getAbsolutePathForRelativePath(getMetadataForImage("/livguard/inverter-trolley/inverter-trolley-og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null)}`,
            },
        ];
    } else if (userPreferences.language == Language.Hindi) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/inverter-trolley",
            },
            {
                title: "अपनी ऊर्जा की सुरक्षा के लिए उत्तम इन्वर्टर ट्रॉली खोजें",
            },
            {
                name: "description",
                content: "अपने इन्वर्टर और इन्वर्टर बैटरी के लिए लिवगार्ड से आदर्श इन्वर्टर बैटरी ट्रॉली प्राप्त करें जो स्टाइल, मजबूती और स्थिरता को संयोजित करती है।",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/inverter-trolley",
            },
            {
                property: "og:title",
                content: "अपनी ऊर्जा की सुरक्षा के लिए उत्तम इन्वर्टर ट्रॉली खोजें",
            },
            {
                property: "og:description",
                content: "अपने इन्वर्टर और इन्वर्टर बैटरी के लिए लिवगार्ड से आदर्श इन्वर्टर बैटरी ट्रॉली प्राप्त करें जो स्टाइल, मजबूती और स्थिरता को संयोजित करती है।",
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
                content: `${getAbsolutePathForRelativePath(getMetadataForImage("/livguard/inverter-trolley/inverter-trolley-og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null)}`,
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
};

export const loader: LoaderFunction = async ({request}) => {
    const userPreferences = await getUserPreferencesFromCookiesAndUrlSearchParameters(request);
    if (userPreferences instanceof Error) {
        throw userPreferences;
    }

    const slugs = ["trolley"];
    const products = slugs.map((slug) => getProductFromSlugAndLanguage(slug, userPreferences.language));

    const loaderData: LoaderData = {
        userPreferences: userPreferences,
        redirectTo: getRedirectToUrlFromRequest(request),
        pageUrl: getUrlFromRequest(request),
        products: products,
    };

    return loaderData;
};

export default () => {
    const {userPreferences, redirectTo, pageUrl, products} = useLoaderData() as LoaderData;

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
                breadcrumbs={[
                    {contentId: "cfab263f-0175-43fb-91e5-fccc64209d36", link: "/"},
                    {contentId: "6596ffc6-6377-4446-92b9-4cac254af278", link: "#"},
                ]}
                secondaryNavigationController={secondaryNavigationController}
            >
                <SecondaryNavigationControllerContext.Provider value={secondaryNavigationController}>
                    <InverterTrolleyPage
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
        </>
    );
};

function InverterTrolleyPage({
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

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-2 tw-col-start-1 tw-col-span-full" />

                <ExperienceHighPower
                    userPreferences={userPreferences}
                    className="tw-row-start-3 tw-col-start-1 lg-px-screen-edge-2 lg:tw-px-0 tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-4 tw-col-start-1 lg:tw-col-span-full" />

                <OurSuggestionsBasedOnYourChoice
                    userPreferences={userPreferences}
                    className="tw-row-start-5 tw-col-start-1 lg:tw-col-span-full tw-max-w-7xl tw-mx-auto"
                    products={products}
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-6 tw-col-start-1 lg:tw-col-span-full" />

                <div className="tw-row-start-7 tw-grid lg:tw-grid-cols-[minmax(0,1fr)_minmax(0,2fr)] tw-col-span-full lg:lg-px-screen-edge-2 tw-gap-x-5 tw-max-w-7xl tw-mx-auto">
                    <DealerLocator
                        userPreferences={userPreferences}
                        className="tw-row-start-5 lg:tw-col-start-1 lg:tw-h-full"
                        showCtaButton={true}
                    />

                    <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-6 lg:tw-col-start-1 lg:tw-col-span-full lg:tw-hidden" />

                    <YourGuideToFindingTheRightInverter
                        userPreferences={userPreferences}
                        className="tw-row-start-7 lg:tw-row-start-5 lg:tw-col-start-2"
                    />
                </div>

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[8] tw-col-start-1 lg:tw-col-span-full" />

                <FaqSection
                    userPreferences={userPreferences}
                    className="tw-row-start-[9] lg:tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px] tw-max-w-7xl"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[10] tw-col-start-1 lg:tw-col-span-full" />

                <SocialHandles
                    userPreferences={userPreferences}
                    heading={{text1: "b0a3aa40-4b00-4bdd-88e0-67085fafa92b", text2: `c0f802cc-902b-4328-b631-a3fad8fc7d18`}}
                    className="tw-row-start-[11] tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px] tw-gap-[1rem] tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[12] tw-col-start-1 lg:tw-col-span-full" />
            </div>
        </>
    );
}

function HeroSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);
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

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-aspect-square lg:tw-aspect-[1280/380] tw-grid tw-grid-rows-[2rem_auto_auto_1rem_auto] lg:tw-grid-rows-[3rem_auto_auto_1rem_auto] lg:tw-grid-cols-[0_auto_minmax(0,1fr)] tw-text-center",
                className,
            )}
            id="top"
            ref={sectionRef}
        >
            <div className="tw-row-start-1 tw-col-start-1 tw-row-span-full tw-col-span-full tw-h-fit">
                {isScreenSizeBelow == null ? null : (
                    <FullWidthImage
                        relativePath={isScreenSizeBelow ? "/livguard/inverter-trolley/1/mobile-banner.jpg" : "/livguard/inverter-trolley/1/desktop-banner.jpg"}
                        key={isScreenSizeBelow ? "/livguard/inverter-trolley/1/mobile-banner.jpg" : "/livguard/inverter-trolley/1/desktop-banner.jpg"}
                    />
                )}
            </div>

            <div className="tw-row-start-2 tw-col-start-1 lg:tw-col-start-2">
                <DefaultTextAnimation className="tw-row-start-2 tw-col-start-1 lg:tw-col-start-2 lg-px-screen-edge-2 tw-z-[2]">
                    <div className="lg-text-banner tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start lg:tw-text-left">
                        {getVernacularString("c8044356-0123-4e47-a1b9-a453d40c6f41", userPreferences.language)}
                    </div>
                </DefaultTextAnimation>

                <DefaultTextAnimation className="tw-row-start-3 tw-col-start-1 lg:tw-col-start-2 lg-px-screen-edge-2 tw-z-[2]">
                    <div className="lg-text-banner tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start lg:tw-text-left">
                        {getVernacularString("a44c1ac7-94e3-4b5f-92a7-97d56aa17619", userPreferences.language)}
                    </div>
                </DefaultTextAnimation>
            </div>
        </div>
    );
}

function ExperienceHighPower({userPreferences, className}: {userPreferences: UserPreferences; className: string}) {
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "strength-and-stability": {
                humanReadableName: getVernacularString("cc0aca43-72cc-446a-9a6c-8243c3364c7b", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    const InverterUSPCard = ({title, description, imageRelativePath}: {title: string; description: string; imageRelativePath: string}) => {
        return (
            <div
                className={concatenateNonNullStringsWithSpaces(
                    "tw-place-self-center tw-grid tw-grid-rows-[1rem_auto_1rem_auto_1rem_auto_minmax(1rem,1fr)] tw-cols-[auto] tw-w-full tw-h-full tw-px-4 tw-py-4 lg-card tw-rounded-lg",
                )}
            >
                <div className="tw-row-start-2">
                    <FullWidthImage relativePath={imageRelativePath} className="tw-rounded-lg"/>
                </div>

                <div className="tw-row-start-4 tw-text-center lg-text-title1 lg-text-sondery-900">{title}</div>

                <div className="tw-row-start-6 tw-text-center lg-text-body lg-text-sondery-900">{description}</div>
            </div>
        );
    };

    const invertersData: Array<{titleTextContentPiece: string; bodyTextContentPiece: string; imageRelativePath: string}> = [
        {
            titleTextContentPiece: "656202ba-4d43-417e-ab8a-4d411da87ede",
            bodyTextContentPiece: "b1860dae-087d-4b2e-b55e-72b0d91de418",
            imageRelativePath: "/livguard/inverter-trolley/2/stylish-curve-design.jpg",
        },
        {
            titleTextContentPiece: "3a7552bb-96e1-4e59-b96c-8255ffe0166a",
            bodyTextContentPiece: "121d0e61-b0a4-462c-a167-07fdb7408680",
            imageRelativePath: "/livguard/inverter-trolley/2/wheel-tuffness.jpg",
        },
        {
            titleTextContentPiece: "60dd74c4-1b24-496b-8629-802beabbf14e",
            bodyTextContentPiece: "000ee25a-3c54-4f21-8df9-7f535b85c6c8",
            imageRelativePath: "/livguard/inverter-trolley/2/easy-front-door-access.jpg",
        },
        {
            titleTextContentPiece: "656202ba-4d43-417e-ab8a-4d411da87ede",
            bodyTextContentPiece: "b1860dae-087d-4b2e-b55e-72b0d91de418",
            imageRelativePath: "/livguard/inverter-trolley/2/stylish-curve-design.jpg",
        },
        {
            titleTextContentPiece: "3a7552bb-96e1-4e59-b96c-8255ffe0166a",
            bodyTextContentPiece: "121d0e61-b0a4-462c-a167-07fdb7408680",
            imageRelativePath: "/livguard/inverter-trolley/2/wheel-tuffness.jpg",
        },
        {
            titleTextContentPiece: "60dd74c4-1b24-496b-8629-802beabbf14e",
            bodyTextContentPiece: "000ee25a-3c54-4f21-8df9-7f535b85c6c8",
            imageRelativePath: "/livguard/inverter-trolley/2/easy-front-door-access.jpg",
        },
        {
            titleTextContentPiece: "656202ba-4d43-417e-ab8a-4d411da87ede",
            bodyTextContentPiece: "b1860dae-087d-4b2e-b55e-72b0d91de418",
            imageRelativePath: "/livguard/inverter-trolley/2/stylish-curve-design.jpg",
        },
        {
            titleTextContentPiece: "3a7552bb-96e1-4e59-b96c-8255ffe0166a",
            bodyTextContentPiece: "121d0e61-b0a4-462c-a167-07fdb7408680",
            imageRelativePath: "/livguard/inverter-trolley/2/wheel-tuffness.jpg",
        },
        {
            titleTextContentPiece: "60dd74c4-1b24-496b-8629-802beabbf14e",
            bodyTextContentPiece: "000ee25a-3c54-4f21-8df9-7f535b85c6c8",
            imageRelativePath: "/livguard/inverter-trolley/2/easy-front-door-access.jpg",
        },
    ];
    return (
        <>
            <div
                className={concatenateNonNullStringsWithSpaces("tw-w-full lg:tw-col-span-full", className)}
                id="strength-and-stability"
                ref={sectionRef}
            >
                <DefaultTextAnimation className="tw-flex tw-flex-col tw-items-center lg-text-headline lg:lg-px-screen-edge-2 lg:tw-pl-0 lg:tw-pr-0 tw-text-center lg:tw-text-left">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("71072fc8-967d-4e21-9922-2bab4b7513b5", userPreferences.language)}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("1d257cca-7858-42b7-ba71-cb411c5b6bf3", userPreferences.language)}} />
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-4 lg:tw-h-8" />

                <CarouselStyle5
                    items={invertersData.map((batteryData, batteryDataIndex) => (
                        <InverterUSPCard
                            title={getVernacularString(batteryData.titleTextContentPiece, userPreferences.language)}
                            description={getVernacularString(batteryData.bodyTextContentPiece, userPreferences.language)}
                            imageRelativePath={batteryData.imageRelativePath}
                            key={batteryDataIndex}
                        />
                    ))}
                    className="tw-mx-auto"
                    deselectedContainersClassName="tw-scale-[0.9] tw-h-full"
                    selectedContainerClassName="tw-h-full"
                    snapDotsDivisionFactor={3}
                />
            </div>
        </>
    );
}

function OurSuggestionsBasedOnYourChoice({userPreferences, className, products}: {userPreferences: UserPreferences; className?: string; products: Array<ProductDetails>}) {
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "your-power-your-choice": {
                humanReadableName: getVernacularString("59edff64-f0e3-4d70-be9a-14f568f43f2f", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

    // Implement UI for multiple elements if needed, using only one product for now
    const trolleyData = {
        batterySlug: products[0].slug,
        imageRelativeUrl: `/livguard/products/${products[0].slug}/thumbnail.png`,
        name: products[0].humanReadableModelNumber,
        description: products[0].description,
        warranty: products[0].specifications[1].value,
        capacity: products[0].specifications[0].value,
        grid: products[0].specifications[2].value,
        dimensions: products[0].specifications[3].value,
    };

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-w-full tw-grid tw-grid-flow-row tw-rounded-lg lg-px-screen-edge-2", className)}
            id="your-power-your-choice"
            ref={sectionRef}
        >
            <div
                className="lg-text-headline tw-place-self-center"
                dangerouslySetInnerHTML={{__html: getVernacularString("9b082fd9-8254-4ea0-a76f-f831d2bd3248", userPreferences.language)}}
            />
            <div className="lg-text-headline tw-place-self-center">{getVernacularString("3bee363a-d749-49b8-8f1e-fa1cc640c526", userPreferences.language)}</div>

            <VerticalSpacer className="tw-h-4 lg:tw-h-6" />

            <InverterCard
                userPreferences={userPreferences}
                batterySlug={`/product/${trolleyData.batterySlug}`}
                imageRelativeUrl={trolleyData.imageRelativeUrl}
                name={trolleyData.name}
                description={trolleyData.description}
                warranty={trolleyData.warranty}
                capacity={trolleyData.capacity}
                grid={trolleyData.grid}
                dimensions={trolleyData.dimensions}
            />

            {/* <VerticalSpacer className="tw-h-4 lg:tw-h-10" /> */}
        </div>
    );
}

function InverterCard({
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
    return (
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:tw-gap-x-2 lg-bg-new-background-500 lg-card tw-rounded-lg tw-p-4 lg:tw-p-8">
            <div className="tw-col-start-1 lg:tw-row-start-1 lg:tw-col-start-2 tw-grid tw-grid-flow-row tw-place-items-center">
                <div className="tw-h-full">
                    <FullHeightImage
                        relativePath={imageRelativeUrl}
                        className="tw-h-full"
                    />
                </div>

                <VerticalSpacer className="lg:tw-h-2" />

                <Link
                    className="tw-hidden lg:tw-block"
                    to={batterySlug}
                >
                    <button className="lg-cta-button">{getVernacularString("dd68b98c-5aa6-4f3f-824e-056ffa6ae4ee", userPreferences.language)}</button>
                </Link>
            </div>

            <VerticalSpacer className="lg:tw-hidden tw-h-4" />

            <div className="tw-col-start-1 lg:tw-row-start-1 lg:tw-col-start-1 tw-grid tw-grid-flow-row">
                <div className="lg-text-title1 tw-text-center lg:tw-text-left">{name}</div>

                <VerticalSpacer className="tw-h-2" />

                <div className="lg-text-body tw-text-center lg:tw-text-left">{description}</div>

                <VerticalSpacer className="tw-h-4" />

                <div className="tw-grid tw-grid-rows-[auto_auto_minmax(0,1fr)] md:max-lg:tw-grid-cols-1 md:max-lg:tw-grid-flow-row md:max-lg:tw-place-items-center md:max-lg:tw-place-self-center md:max-lg:tw-w-fit tw-grid-cols-2 tw-gap-x-4 tw-gap-y-8">
                    <div className="tw-row-start-1 tw-col-start-1 md:max-lg:tw-w-full tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2 lg:tw-place-self-start">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/inverter-trolley/3/range.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{getVernacularString("306e1020-9ae2-467a-b761-ad45d235b707", userPreferences.language)}</div>
                            <div className="tw-row-start-3">{warranty}</div>
                        </div>
                    </div>

                    <div className="tw-row-start-1 tw-col-start-2 md:max-lg:tw-w-full md:max-lg:tw-row-start-2 md:max-lg:tw-col-start-1 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/inverter-trolley/3/model.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{getVernacularString("713dcf1c-e56f-4cc8-8196-7cc7094baeb4", userPreferences.language)}</div>
                            <div className="tw-row-start-3">{capacity}</div>
                        </div>
                    </div>

                    <div className="tw-row-start-2 tw-col-start-1 md:max-lg:tw-w-full md:max-lg:tw-row-start-3 md:max-lg:tw-col-start-1 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/inverter-trolley/3/weight-with-wheels.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{getVernacularString("2f6077a8-553c-491d-967a-819dd2fd9a2a", userPreferences.language)}</div>
                            <div className="tw-row-start-3">{grid}</div>
                        </div>
                    </div>

                    <div className="tw-row-start-2 tw-col-start-2 md:max-lg:tw-w-full md:max-lg:tw-row-start-4 md:max-lg:tw-col-start-1 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/inverter-trolley/3/dimensions.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{getVernacularString("989926cd-1e5a-45c0-bf0c-7b4a3048d3fb", userPreferences.language)}</div>
                            <div className="tw-row-start-3">{dimensions}</div>
                        </div>
                    </div>
                </div>

                <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

                <Link
                    className="tw-place-self-center lg:tw-hidden"
                    to={batterySlug}
                >
                    <button className="lg-cta-button">{getVernacularString("dd68b98c-5aa6-4f3f-824e-056ffa6ae4ee", userPreferences.language)}</button>
                </Link>

                <VerticalSpacer className="tw-h-4 lg:tw-hidden" />
            </div>
        </div>
    );
}

function YourGuideToFindingTheRightInverter({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "your-guide": {
                humanReadableName: getVernacularString("2223a612-f480-45b4-86fb-d5d02dc1a69d", userPreferences.language),
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
            <div className="tw-row-start-2 tw-text-center lg-text-headline">{getVernacularString("e596f970-68cb-4c78-a74f-885ff89a0f84", userPreferences.language)}</div>
            <div
                className="tw-row-start-3 tw-text-center lg-text-headline"
                dangerouslySetInnerHTML={{__html: getVernacularString("da847308-2fc2-449f-9346-7372e8f72d97", userPreferences.language)}}
            />
            <div className="tw-row-start-5 tw-text-center lg-px-screen-edge-2">{getVernacularString("6e9b8409-2e42-4c63-9d68-9be787e999ab", userPreferences.language)}</div>

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
                            src="https://files.growthjockey.com/livguard/icons/stabilizer/download-catalogue.svg"
                        />
                        <div className="tw-row-start-1 tw-col-start-3 tw-flex tw-flex-row tw-items-center lg-text-body group-hover:!tw-text-secondary-100-light tw-transition-colors tw-duration-200">
                            {getVernacularString("51ae4bbd-0f66-42bc-b031-cc3e9dc4dc26", userPreferences.language)}
                        </div>
                    </a>
                    <Link
                        to="/inverter-for-home"
                        className="tw-h-full tw-w-full tw-grid tw-place-items-center"
                    >
                        <div className="tw-h-full tw-w-full tw-grid tw-items-center lg-cta-button tw-place-self-center">
                            {getVernacularString("a6db6f71-e1e6-4166-b5e0-9d2722918f17", userPreferences.language)}
                        </div>
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
            question: "a1d8ea9a-0849-49aa-826e-87bab380866b",
            answer: "47d12216-c8fc-4aa9-9bdb-29d8dcd0ab69",
        },
        {
            question: "e2f88f7e-1815-46e8-9aa1-01cefaca9f07",
            answer: "59ccc2c2-5029-4e43-889b-479f159893f3",
        },
        {
            question: "20500319-4842-4a4f-91ce-d2adbd17b524",
            answer: "d14ed9a8-72cb-4eea-847b-fc7ae260924b",
        },
        {
            question: "7e236ae3-2627-44bb-a955-082a1017453c",
            answer: "2a7ccdee-88af-4b50-b433-a26df20a5856",
        },
        {
            question: "f9132ecf-4676-4cae-a86b-f754884b1caf",
            answer: "677ad117-00ce-425f-92f5-a2e879a907a8",
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
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "social-handles": {
                humanReadableName: getVernacularString("01553562-bafd-4ad3-a18c-7b6cc113f03f", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
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
        <div
            className={concatenateNonNullStringsWithSpaces("[@media(max-width:1024px)]:lg-px-screen-edge tw-w-full tw-max-w-7xl tw-mx-auto", className)}
            id="social-handles"
            ref={sectionRef}
        >
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
