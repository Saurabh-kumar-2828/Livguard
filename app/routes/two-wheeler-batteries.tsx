import type {LoaderFunction, V2_MetaFunction} from "@remix-run/node";
import {Link, useLoaderData} from "@remix-run/react";
import React, {useContext, useEffect, useReducer, useState} from "react";
import {Facebook, Instagram, Linkedin, Twitter, Youtube} from "react-bootstrap-icons";
import {useInView} from "react-intersection-observer";
import {StickyBottomBar} from "~/components/bottomBar";
import {CarouselStyle3} from "~/components/carouselStyle3";
import {CarouselStyle5} from "~/components/carouselStyle5";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {EmbeddedYoutubeVideo} from "~/components/embeddedYoutubeVideo";
import {FaqSectionInternal} from "~/components/faqs";
import {FilterAccordion} from "~/components/filterAccordion";
import {FullWidthImage} from "~/components/images/simpleFullWidthImage";
import {PageScaffold} from "~/components/pageScaffold";
import {ProductAndCategoryBottomBar} from "~/components/productAndCategoryBottomBar";
import {SecondaryNavigation} from "~/components/secondaryNavigation";
import {SecondaryNavigationControllerContext} from "~/contexts/secondaryNavigationControllerContext";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {ImageCdnProvider} from "~/global-common-typescript/typeDefinitions";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {SecondaryNavigationController, useSecondaryNavigationController} from "~/hooks/useSecondaryNavigationController";
import {FormSelectComponent} from "~/livguard-common-typescript/scratchpad";
import {ProductType, allProductDetails} from "~/productData";
import {DealerLocator} from "~/routes";
import type {BatteryFinderAction} from "~/routes/two-wheeler/index.state";
import {BatteryFinderActionType, batteryFinderInitialState, batteryFinderReducer} from "~/routes/two-wheeler/index.state";
import type {BatteryFinderState} from "~/routes/two-wheeler/index.types";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {UserPreferences} from "~/typeDefinitions";
import {Language} from "~/typeDefinitions";
import {getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest, secondaryNavThreshold} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";

export const meta: V2_MetaFunction = ({data: loaderData}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = loaderData.userPreferences;
    if (userPreferences.language == Language.English) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/two-wheeler-batteries",
            },
            {
                title: "Power Your Two-Wheeler with Livguard Batteries",
            },
            {
                name: "description",
                content: "Empower your ride with our range of Automotive Batteries. Experience uninterrupted power for your two-wheelers and enjoy limitless rides.",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/two-wheeler-batteries",
            },
            {
                property: "og:title",
                content: "Power Your Two-Wheeler with Livguard Batteries",
            },
            {
                property: "og:description",
                content: "Empower your ride with our range of Automotive Batteries. Experience uninterrupted power for your two-wheelers and enjoy limitless rides.",
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
                content: `${getAbsolutePathForRelativePath(getMetadataForImage("/livguard/two-wheeler/two-wheeler-og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null)}`,
            },
        ];
    } else if (userPreferences.language == Language.Hindi) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/two-wheeler-batteries",
            },
            {
                title: "लिवगार्ड बैटरी से अपने दोपहिया वाहन को शक्ति प्रदान करें",
            },
            {
                name: "description",
                content: "हमारी ऑटोमोटिव बैटरी की विभिन्न रेंज के साथ अपनी सवारी को सशक्त बनाएं। अपनी टू-व्हीलर्स के लिए निर्बाध ऊर्जा का अनुभव करें और असीमित सवारी का आनंद लें।",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/two-wheeler-batteries",
            },
            {
                property: "og:title",
                content: "लिवगार्ड बैटरी से अपने दोपहिया वाहन को शक्ति प्रदान करें",
            },
            {
                property: "og:description",
                content: "हमारी ऑटोमोटिव बैटरी की विभिन्न रेंज के साथ अपनी सवारी को सशक्त बनाएं। अपनी टू-व्हीलर्स के लिए निर्बाध ऊर्जा का अनुभव करें और असीमित सवारी का आनंद लें।",
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
                content: `${getAbsolutePathForRelativePath(getMetadataForImage("/livguard/two-wheeler/two-wheeler-og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null)}`,
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

export default () => {
    const {userPreferences, redirectTo, pageUrl} = useLoaderData() as LoaderData;

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
                    {contentId: "f46c6878-8d56-46f7-bfa0-f01c7a604436", link: "#"},
                ]}
                secondaryNavigationController={secondaryNavigationController}
            >
                <SecondaryNavigationControllerContext.Provider value={secondaryNavigationController}>
                    <TwoWheelerBatteriesPage
                        userPreferences={userPreferences}
                        secondaryNavigationController={secondaryNavigationController}
                    />
                </SecondaryNavigationControllerContext.Provider>
            </PageScaffold>

            <StickyBottomBar userPreferences={userPreferences} />

            <ProductAndCategoryBottomBar
                userPreferences={userPreferences}
                utmParameters={utmSearchParameters}
                pageUrl={pageUrl}
            />
        </>
    );
};

function TwoWheelerBatteriesPage({userPreferences, secondaryNavigationController}: {userPreferences: UserPreferences; secondaryNavigationController?: SecondaryNavigationController}) {
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);

    return (
        <>
            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-x-16 tw-items-start tw-justify-center">
                <HeroSection
                    userPreferences={userPreferences}
                    className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
                />

                <VerticalSpacer className="tw-row-start-2 tw-h-10 lg:tw-h-20 tw-col-start-1 lg:tw-col-span-full" />

                <StrongAutomotiveBatteries
                    userPreferences={userPreferences}
                    className="tw-row-start-4 tw-col-start-1 lg-px-screen-edge-2 lg:tw-px-0 tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-5 tw-col-start-1 lg:tw-col-span-full" />

                <OurSuggestionsBasedOnYourChoice
                    userPreferences={userPreferences}
                    className="tw-row-start-6 tw-col-start-1 lg:tw-col-span-full tw-w-full"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-7 tw-col-start-1 lg:tw-col-span-full" />

                <TopTwoWheelerBatteryPicks
                    userPreferences={userPreferences}
                    className="tw-row-start-8 lg:tw-col-span-full tw-w-full tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-9 tw-col-start-1 lg:tw-col-span-full" />

                <div className="tw-row-start-10 tw-grid lg:tw-grid-cols-[minmax(0,1fr)_minmax(0,2fr)] tw-col-span-full lg:lg-px-screen-edge-2 tw-gap-x-5 tw-max-w-7xl tw-mx-auto">
                    <DealerLocator
                        userPreferences={userPreferences}
                        className="tw-row-start-5 lg:tw-col-start-1 lg:tw-h-full"
                        showCtaButton={true}
                    />

                    <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-6 lg:tw-col-start-1 lg:tw-col-span-full lg:tw-hidden" />

                    <ChooseYourIdealTwoWheelerBattery
                        userPreferences={userPreferences}
                        className="tw-row-start-7 lg:tw-row-start-5 lg:tw-col-start-2"
                    />
                </div>

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[11] tw-col-start-1 lg:tw-col-span-full" />

                <FaqSection
                    userPreferences={userPreferences}
                    className="tw-row-start-[12] lg:tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px] tw-max-w-7xl"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[13] tw-col-start-1 lg:tw-col-span-full" />

                <SocialHandles
                    userPreferences={userPreferences}
                    heading={{text1: "b0a3aa40-4b00-4bdd-88e0-67085fafa92b", text2: `c0f802cc-902b-4328-b631-a3fad8fc7d18`}}
                    className="tw-row-start-[14] tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px] tw-gap-[1rem] tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[15] tw-col-start-1 lg:tw-col-span-full" />
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
                "tw-aspect-square lg:tw-aspect-[1280/380] tw-grid tw-grid-rows-[4rem_auto_auto_minmax(0,1fr)] lg:tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)] tw-text-center lg:tw-text-left lg:tw-grid-cols-1",
                className,
            )}
            id="top"
            ref={sectionRef}
        >
            <div className="tw-row-start-1 tw-col-start-1 tw-row-span-full tw-col-span-full">
                {isScreenSizeBelow == null ? null : (
                    <>
                        <FullWidthImage
                            relativePath={isScreenSizeBelow ? "/livguard/two-wheeler/1/mobile-banner.jpg" : "/livguard/two-wheeler/1/desktop-banner.jpg"}
                            key={isScreenSizeBelow ? "/livguard/two-wheeler/1/mobile-banner.jpg" : "/livguard/two-wheeler/1/desktop-banner.jpg"}
                        />
                    </>
                )}
            </div>

            <DefaultTextAnimation className="tw-row-start-2 tw-col-start-1 lg-px-screen-edge-2">
                <div className="lg-text-banner tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">
                    {getVernacularString("c106b24b-668c-4bc2-b9fe-747eea24944a", userPreferences.language)}
                </div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-3 tw-col-start-1 lg-px-screen-edge-2">
                <div className="lg-text-banner tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">
                    {getVernacularString("24038be1-0e21-4016-9f8e-17d3d522b20e", userPreferences.language)}
                </div>
            </DefaultTextAnimation>
        </div>
    );
}

function StrongAutomotiveBatteries({userPreferences, className}: {userPreferences: UserPreferences; className: string}) {
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "two-wheeler-battery": {
                humanReadableName: getVernacularString("27a6ac19-b8ed-43e6-927a-562bf232d8d6", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

    const BatteryCard = ({title, description, imageRelativePath}: {title: string; description: string; imageRelativePath: string}) => {
        return (
            <div
                className={concatenateNonNullStringsWithSpaces(
                    "tw-place-self-center tw-grid tw-grid-rows-[auto_1rem_auto_1rem_auto_minmax(1rem,1fr)] tw-cols-[auto] tw-w-full tw-h-full tw-px-4 tw-py-4 lg-card tw-rounded-lg",
                )}
            >
                <div className="tw-row-start-1">
                    <FullWidthImage relativePath={imageRelativePath} className="tw-rounded-lg"/>
                </div>

                <div className="tw-row-start-3 tw-text-center lg-text-title1 lg-text-secondary-900">{title}</div>

                <div className="tw-row-start-5 tw-text-center lg-text-body lg-text-secondary-900">{description}</div>
            </div>
        );
    };

    const batteriesData: Array<{titleTextContentPiece: string; bodyTextContentPiece: string; imageRelativePath: string}> = [
        {
            titleTextContentPiece: "4136551e-69a6-4500-b475-321dd6b4e658",
            bodyTextContentPiece: "34bb4867-d4f4-434d-a956-e3bb03c23b34",
            imageRelativePath: "/livguard/two-wheeler/2/cranking.jpg",
        },
        {
            titleTextContentPiece: "701881a3-e5f5-42b7-b41e-118fa30f47e0",
            bodyTextContentPiece: "7aaf5c28-e9df-4665-8aa7-5358869f54e8",
            imageRelativePath: "/livguard/two-wheeler/2/maintainance.jpg",
        },
        {
            titleTextContentPiece: "353cc560-e2f2-4e33-a948-607d46455471",
            bodyTextContentPiece: "fe83636f-3c6f-4450-a329-17edf6e7ea31",
            imageRelativePath: "/livguard/two-wheeler/2/battery-life.jpg",
        },
        {
            titleTextContentPiece: "8b863aa9-0f16-493f-94e0-232f4fabfda2",
            bodyTextContentPiece: "ce0ddd16-4361-477a-8ca3-3bee5c8fdc95",
            imageRelativePath: "/livguard/two-wheeler/2/maintainance.jpg",
        },
        {
            titleTextContentPiece: "4136551e-69a6-4500-b475-321dd6b4e658",
            bodyTextContentPiece: "34bb4867-d4f4-434d-a956-e3bb03c23b34",
            imageRelativePath: "/livguard/two-wheeler/2/cranking.jpg",
        },
        {
            titleTextContentPiece: "701881a3-e5f5-42b7-b41e-118fa30f47e0",
            bodyTextContentPiece: "7aaf5c28-e9df-4665-8aa7-5358869f54e8",
            imageRelativePath: "/livguard/two-wheeler/2/maintainance.jpg",
        },
        {
            titleTextContentPiece: "353cc560-e2f2-4e33-a948-607d46455471",
            bodyTextContentPiece: "fe83636f-3c6f-4450-a329-17edf6e7ea31",
            imageRelativePath: "/livguard/two-wheeler/2/battery-life.jpg",
        },
        {
            titleTextContentPiece: "8b863aa9-0f16-493f-94e0-232f4fabfda2",
            bodyTextContentPiece: "ce0ddd16-4361-477a-8ca3-3bee5c8fdc95",
            imageRelativePath: "/livguard/two-wheeler/2/maintainance.jpg",
        },
    ];

    return (
        <>
            <div
                className={concatenateNonNullStringsWithSpaces("tw-w-full lg:tw-col-span-full", className)}
                id="two-wheeler-battery"
                ref={sectionRef}
            >
                <DefaultTextAnimation className="tw-flex tw-flex-col tw-items-center lg-text-headline lg:lg-px-screen-edge-2 lg:tw-pl-0 lg:tw-pr-0 tw-text-center lg:tw-text-left">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("d3b47f52-f35c-4523-bb3f-0c4a55113f63", userPreferences.language)}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("83e88e8e-82c4-4a1f-9540-6551a24c703c", userPreferences.language)}} />
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-4 lg:tw-h-8" />

                <CarouselStyle5
                    items={batteriesData.map((batteryData, batteryDataIndex) => (
                        <BatteryCard
                            title={getVernacularString(batteryData.titleTextContentPiece, userPreferences.language)}
                            description={getVernacularString(batteryData.bodyTextContentPiece, userPreferences.language)}
                            imageRelativePath={batteryData.imageRelativePath}
                            key={batteryDataIndex}
                        />
                    ))}
                    className="tw-mx-auto"
                    deselectedContainersClassName="tw-scale-[0.9] tw-h-full"
                    selectedContainerClassName="tw-h-full"
                    snapDotsDivisionFactor={2}
                    itemContainerClassName="lg:tw-px-0"
                />
            </div>
        </>
    );
}

function TopTwoWheelerBatteryPicks({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const featuredProducts = [
        {
            productType: ProductType.automotiveBattery,
            name: allProductDetails["lgbtx2.5l"][userPreferences.language].humanReadableModelNumber,
            slug: "lgbtx2.5l",
            isBestSeller: true,
            capacity: allProductDetails["lgbtx2.5l"][userPreferences.language].specifications[2].value,
            // warranty: allProductDetails["lgbtx2.5l"][userPreferences.language].specifications[1].value,
            warranty: "48 + 30 * Months",
            price: allProductDetails["lgbtx2.5l"][userPreferences.language].price || null,
        },
        {
            productType: ProductType.automotiveBattery,
            name: allProductDetails["lgbtx7l"][userPreferences.language].humanReadableModelNumber,
            slug: "lgbtx7l",
            capacity: allProductDetails["lgbtx7l"][userPreferences.language].specifications[2].value,
            warranty: allProductDetails["lgbtx7l"][userPreferences.language].specifications[1].value,
            price: allProductDetails["lgbtx7l"][userPreferences.language].price || null,
        },
        {
            productType: ProductType.automotiveBattery,
            name: allProductDetails["lgbtx9l"][userPreferences.language].humanReadableModelNumber,
            slug: "lgbtx9l",
            capacity: allProductDetails["lgbtx9l"][userPreferences.language].specifications[2].value,
            warranty: allProductDetails["lgbtx9l"][userPreferences.language].specifications[1].value,
            price: allProductDetails["lgbtx9l"][userPreferences.language].price || null,
        },
        {
            productType: ProductType.automotiveBattery,
            name: allProductDetails["lgzhhtx5"][userPreferences.language].humanReadableModelNumber,
            slug: "lgzhhtx5",
            capacity: allProductDetails["lgzhhtx5"][userPreferences.language].specifications[2].value,
            warranty: allProductDetails["lgzhhtx5"][userPreferences.language].specifications[1].value,
            price: allProductDetails["lgzhhtx5"][userPreferences.language].price || null,
        },
        {
            productType: ProductType.automotiveBattery,
            name: allProductDetails["lgzhhtz4"][userPreferences.language].humanReadableModelNumber,
            slug: "lgzhhtz4",
            isBestSeller: true,
            capacity: allProductDetails["lgzhhtz4"][userPreferences.language].specifications[2].value,
            warranty: allProductDetails["lgzhhtz4"][userPreferences.language].specifications[1].value,
            price: allProductDetails["lgzhhtz4"][userPreferences.language].price || null,
        },
        {
            productType: ProductType.automotiveBattery,
            name: allProductDetails["lgzhhtz5"][userPreferences.language].humanReadableModelNumber,
            slug: "lgzhhtz5",
            capacity: allProductDetails["lgzhhtz5"][userPreferences.language].specifications[2].value,
            warranty: allProductDetails["lgzhhtz5"][userPreferences.language].specifications[1].value,
            price: allProductDetails["lgzhhtz5"][userPreferences.language].price || null,
        },
    ];

    function BatteryCard({
        slug,
        // TODO: Check if this can be removed now
        productType,
        userPreferences,
        isBestSeller,
        productName,
        productPrice,
        capacity,
        warranty,
    }: {
        slug: string;
        productType: ProductType;
        userPreferences: UserPreferences;
        isBestSeller?: boolean;
        productName: string;
        productPrice: string;
        capacity: string;
        warranty: string;
    }) {
        return (
            <Link
                to={`/product/${slug}`}
                className="tw-w-full tw-h-full tw-grid tw-grid-cols-1 tw-grid-flow-row tw-grid-rows-[1.5rem_auto] lg-card tw-rounded-lg"
            >
                {isBestSeller != null && isBestSeller === true ? (
                    <div className="tw-row-start-1 tw-h-full lg-stabilizers-best-seller-gradient tw-rounded-tr-lg tw-place-self-end tw-text-xs tw-px-3 tw-py-1 lg:tw-px-4 tw-flex tw-flex-row tw-items-center !tw-text-secondary-900-dark">
                        <span>{getVernacularString("14e0e286-5fd7-43aa-a6f3-5b3b9a0ec71f", userPreferences.language)}</span>
                    </div>
                ) : (
                    <VerticalSpacer className="tw-h-full" />
                )}

                <div className="tw-p-4 tw-grid tw-grid-flow-row tw-grid-rows-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_auto_auto_auto_auto]">
                    <div className="tw-row-start-2">
                        <FullWidthImage
                            className="tw-row-start-2"
                            relativePath={`/livguard/products/${slug}/thumbnail.png`}
                        />
                    </div>

                    <div className="tw-row-start-4 tw-w-full tw-text-center lg-text-body-bold lg-text-secondary-900">
                        {/* {convertProductInternalNameToPublicName(slug)} */}
                        {productName}
                    </div>

                    <VerticalSpacer className="tw-row-start-5 tw-h-2" />

                    <div className="tw-row-start-6 tw-place-self-center tw-grid tw-grid-cols-[minmax(0,1fr)_auto_0.5rem_70%_minmax(0,1fr)] tw-items-center tw-w-full">
                        <img
                            className="tw-col-start-2 tw-invert dark:tw-invert-0"
                            src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/two-wheeler/4/capacity.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
                        />
                        <span className="tw-col-start-4 tw-text-center">{capacity}</span>
                    </div>

                    <VerticalSpacer className="tw-row-start-7 tw-h-2" />

                    <div className="tw-row-start-8 tw-place-self-center tw-grid tw-grid-cols-[minmax(0,1fr)_auto_0.5rem_70%minmax(0,1fr)] tw-items-center tw-w-full">
                        <img
                            className="tw-col-start-2 tw-invert dark:tw-invert-0"
                            src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/two-wheeler/4/warranty.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
                        />
                        <span className="tw-col-start-4 tw-text-center">{warranty}</span>
                    </div>

                    <VerticalSpacer className="tw-row-start-9 tw-h-6" />

                    <div className="tw-row-start-10 tw-w-full tw-text-center lg-text-secondary-700">
                        {productPrice == null
                            ? getVernacularString("ccfce5e6-08ac-44b9-84ad-ef7891d7661b", userPreferences.language)
                            : `${getVernacularString("abce92ec-fd9a-4578-ab56-ddfd9fdafe72", userPreferences.language)}${productPrice}${getVernacularString(
                                  "0044b486-6eca-4e3a-abf0-102eede6e10c",
                                  userPreferences.language,
                              )}`}
                    </div>

                    <VerticalSpacer className="tw-row-start-11 tw-h-4" />

                    <button className="tw-row-start-12 lg-cta-outline-button lg-cta-outline-button-transition tw-text-primary-500-light dark:tw-text-secondary-100-light tw-w-full tw-text-center tw-px-1">
                        {getVernacularString("063dc56b-910e-4a48-acb8-8f52668a4c72", userPreferences.language)}
                    </button>
                </div>
            </Link>
        );
    }

    const [isViewMore, setIsViewMore] = useState(false);

    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "our-picks": {
                humanReadableName: getVernacularString("e8d7fe5b-5e59-4f65-aae6-5871d080cf20", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-px-3", className)}
            id="our-picks"
            ref={sectionRef}
        >
            <div className="tw-grid tw-grid-cols-1">
                <DefaultTextAnimation>
                    <h2
                        className="lg-text-headline tw-text-center"
                        dangerouslySetInnerHTML={{__html: getVernacularString("3e16fc04-40ab-4a32-aca8-bb10812fe30d", userPreferences.language)}}
                    />

                    <h2
                        className="lg-text-headline tw-text-center"
                        dangerouslySetInnerHTML={{__html: getVernacularString("52d70e49-05fc-47e2-93c0-104e51b58fbc", userPreferences.language)}}
                    />
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-6 lg:tw-h-12" />

                <div className="tw-grid tw-grid-cols-[repeat(2,minmax(0,1fr))] lg:tw-grid-cols-[repeat(auto-fill,14.5rem)] lg:tw-grid-flow-row-dense lg:tw-justify-center tw-gap-4 lg:tw-gap-8">
                    {!isViewMore && (
                        <>
                            {featuredProducts.slice(0, 4).map((featuredProduct, featuredProductIndex) => (
                                <BatteryCard
                                    slug={featuredProduct.slug}
                                    productType={featuredProduct.productType}
                                    productName={featuredProduct.name}
                                    productPrice={featuredProduct.price}
                                    capacity={`${featuredProduct.capacity} ${getVernacularString("c4c53678-fb9a-41c2-8782-de0690cffdd4", userPreferences.language)}`}
                                    warranty={`${featuredProduct.warranty} ${getVernacularString("95a938d7-dd71-46de-80b0-a417845dfb4d", userPreferences.language)}`}
                                    userPreferences={userPreferences}
                                    isBestSeller={featuredProduct.isBestSeller != null ? featuredProduct.isBestSeller : false}
                                    key={featuredProductIndex}
                                />
                            ))}
                        </>
                    )}

                    {isViewMore &&
                        featuredProducts.map((featuredProduct, featuredProductIndex) => (
                            <BatteryCard
                                slug={featuredProduct.slug}
                                productType={featuredProduct.productType}
                                productName={featuredProduct.name}
                                productPrice={featuredProduct.price}
                                capacity={`${featuredProduct.capacity} ${getVernacularString("c4c53678-fb9a-41c2-8782-de0690cffdd4", userPreferences.language)}`}
                                warranty={`${featuredProduct.warranty} ${getVernacularString("95a938d7-dd71-46de-80b0-a417845dfb4d", userPreferences.language)}`}
                                userPreferences={userPreferences}
                                isBestSeller={featuredProduct.isBestSeller != null ? featuredProduct.isBestSeller : false}
                                key={featuredProductIndex}
                            />
                        ))}
                </div>

                <VerticalSpacer className="tw-h-4 lg:tw-h-8" />

                <button
                    className="lg-cta-button tw-place-self-center"
                    onClick={() => setIsViewMore((prev) => !prev)}
                >
                    {isViewMore
                        ? getVernacularString("ac9a30fb-5654-4692-9995-84c2dbe8301b", userPreferences.language)
                        : getVernacularString("8993dcbc-2216-4dd2-954e-e8145571049f", userPreferences.language)}
                </button>
            </div>
        </div>
    );
}

function OurSuggestionsBasedOnYourChoice({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const [batteryFinderState, dispatch] = useReducer(batteryFinderReducer, batteryFinderInitialState(userPreferences.language));

    const brands = batteryFinderState.brands;

    const isScreenSizeBelow = useIsScreenSizeBelow(1024);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "our-range": {
                humanReadableName: getVernacularString("f455acf2-de2a-48bb-afa1-c1b400f1fc09", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-w-full tw-grid tw-grid-flow-row lg-bg-our-suggestions tw-rounded-lg", className)}
            id="our-range"
            ref={sectionRef}
        >
            <VerticalSpacer className="tw-h-6 lg:tw-h-10" />

            <div
                className="lg-text-headline tw-place-self-center"
                dangerouslySetInnerHTML={{__html: getVernacularString("9ccc8938-959c-4f36-8d66-286fa34771b5", userPreferences.language)}}
            />
            <div className="lg-text-headline tw-place-self-center">{getVernacularString("03fc5a7c-bfc0-4e96-a34a-f52b31be7b42", userPreferences.language)}</div>

            <VerticalSpacer className="tw-h-4 lg:tw-h-6" />

            <div className="tw-max-w-7xl tw-mx-auto tw-hidden tw-place-self-center lg:tw-w-full lg:tw-grid lg:tw-grid-flow-col lg:tw-grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] tw-items-center tw-gap-4 lg-px-screen-edge-2">
                <div>{getVernacularString("0dc1ec96-3b51-4314-ab45-9b5b542f66c5", userPreferences.language)}</div>
                <div>
                    <FormSelectComponent
                        items={brands}
                        itemBuilder={(item) => {
                            return item == null ? getVernacularString("51d56374-4d1d-46c1-8ef1-f72396e12e6a", userPreferences.language) : item;
                        }}
                        value={batteryFinderState.selectedBrand == null ? getVernacularString("51d56374-4d1d-46c1-8ef1-f72396e12e6a", userPreferences.language) : batteryFinderState.selectedBrand}
                        setValue={(item) => {
                            dispatch({
                                actionType: BatteryFinderActionType.setSelectedBrand,
                                payload: item,
                            });
                        }}
                        buttonClassName="disabled:tw-opacity-[0.4] disabled:!tw-bg-secondary-100-light"
                    />
                </div>
                <div>
                    <FormSelectComponent
                        items={batteryFinderState.segments}
                        itemBuilder={(item) => {
                            return item == "" ? getVernacularString("5793b8a3-16b1-4c11-bc37-ef5062160855", userPreferences.language) : item;
                        }}
                        value={batteryFinderState.selectedSegment == null ? getVernacularString("5793b8a3-16b1-4c11-bc37-ef5062160855", userPreferences.language) : batteryFinderState.selectedSegment}
                        setValue={(item) => {
                            dispatch({
                                actionType: BatteryFinderActionType.setSelectedSegment,
                                payload: item,
                            });
                        }}
                        disabled={batteryFinderState.selectedBrand == null}
                        buttonClassName="disabled:tw-opacity-[0.4] disabled:!tw-bg-secondary-100-light disabled:dark:tw-opacity-1 disabled:dark:!tw-bg-secondary-300-dark disabled:dark:!tw-text-secondary-900-dark"
                    />
                </div>
                <div>
                    <FormSelectComponent
                        items={batteryFinderState.models}
                        itemBuilder={(item) => {
                            return item == null ? getVernacularString("97f3fc31-1116-46f6-a385-d4df5e25bde1", userPreferences.language) : item;
                        }}
                        value={batteryFinderState.selectedModel == null ? getVernacularString("97f3fc31-1116-46f6-a385-d4df5e25bde1", userPreferences.language) : batteryFinderState.selectedModel}
                        setValue={(item) => {
                            dispatch({
                                actionType: BatteryFinderActionType.setSelectedModel,
                                payload: item,
                            });
                        }}
                        disabled={batteryFinderState.selectedBrand == null || batteryFinderState.selectedSegment == null}
                        buttonClassName="disabled:tw-opacity-[0.4] disabled:!tw-bg-secondary-100-light disabled:dark:tw-opacity-1 disabled:dark:!tw-bg-secondary-300-dark disabled:dark:!tw-text-secondary-900-dark"
                    />
                </div>

                <div
                    onClick={() => {
                        dispatch({
                            actionType: BatteryFinderActionType.findBatteries,
                            payload: userPreferences.language,
                        });
                    }}
                >
                    <button
                        className="lg-cta-button disabled:!tw-bg-none disabled:!tw-bg-secondary-300-light disabled:dark:!tw-bg-secondary-300-dark disabled:!tw-text-secondary-700-light disabled:dark:!tw-text-secondary-700-dark"
                        disabled={batteryFinderState.selectedModel == null}
                    >
                        {getVernacularString("3231d38a-1950-46eb-be3b-76bd8bce6998", userPreferences.language)}
                    </button>
                </div>
            </div>

            {isScreenSizeBelow && (
                <FilterAccordion
                    userPreferences={userPreferences}
                    panelItem={
                        <div className="lg-text-secondary-900">
                            <FilterMobile
                                userPreferences={userPreferences}
                                batteryFinderState={batteryFinderState}
                                dispatch={dispatch}
                            />
                        </div>
                    }
                    buttonTextContentId="c505d928-fde1-4ad6-95f4-2f3109e0e87f"
                    filterIcon="/livguard/two-wheeler/3/filter.svg"
                />
            )}

            <VerticalSpacer className="tw-h-4 lg:tw-h-6" />

            <CarouselStyle5
                // @ts-ignore
                items={batteryFinderState.recommendedBatteries?.map((battery, batteryIndex) => (
                    <BatteryCard
                        userPreferences={userPreferences}
                        {...battery}
                        key={batteryIndex}
                    />
                ))}
                slidesContainerClassName="!tw-auto-cols-[100%] lg:!tw-auto-cols-max tw-place-self-center tw-items-center"
                selectedContainerClassName="tw-h-full"
                deselectedContainersClassName="tw-scale-[0.9] tw-h-full"
                key={batteryFinderState.recommendedBatteries?.length}
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
    polarity,
    dimensions,
}: {
    userPreferences: UserPreferences;
    batterySlug: string;
    imageRelativeUrl: string;
    name: string;
    description: string;
    warranty: string;
    capacity: string;
    polarity: string;
    dimensions: string;
}) {
    return (
        <div className="tw-max-w-3xl tw-mx-auto tw-grid tw-grid-cols-1 lg:tw-grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:tw-gap-x-2 lg-bg-new-background-500 lg-card tw-rounded-lg tw-px-4 tw-py-3 lg:tw-py-6 lg:tw-px-8">
            <div className="tw-col-start-1 tw-grid tw-grid-flow-row tw-place-items-center">
                <div className="lg:tw-hidden lg-bg-primary-500 tw-text-secondary-900-dark tw-px-2 tw-py-1">{getVernacularString("7bcd803f-7cae-427b-9838-8c1966e13b01", userPreferences.language)}</div>
                <div className="tw-w-full tw-h-full">
                    <FullWidthImage relativePath={imageRelativeUrl} />
                </div>

                <Link
                    className="tw-hidden lg:tw-block"
                    to={batterySlug}
                >
                    <button className="lg-cta-button">{getVernacularString("063dc56b-910e-4a48-acb8-8f52668a4c72", userPreferences.language)}</button>
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
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/two-wheeler/3/warranty-icon.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{getVernacularString("2c6dc668-49ef-4913-88c1-904d6e9be1a2", userPreferences.language)}</div>
                            <div className="tw-row-start-3">{warranty}</div>
                        </div>
                    </div>

                    <div className="tw-row-start-1 tw-col-start-2 md:max-lg:tw-w-full md:max-lg:tw-row-start-2 md:max-lg:tw-col-start-1 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/two-wheeler/3/capacity-icon.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{getVernacularString("c73ece31-e0c3-4b1f-94c5-51d742ae3186", userPreferences.language)}</div>
                            <div className="tw-row-start-3">{capacity}</div>
                        </div>
                    </div>

                    <div className="tw-row-start-2 tw-col-start-1 md:max-lg:tw-w-full md:max-lg:tw-row-start-3 md:max-lg:tw-col-start-1 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/two-wheeler/3/polarity-icon.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{getVernacularString("0bbd2699-d61f-48ee-ae84-491a2ee102eb", userPreferences.language)}</div>
                            <div className="tw-row-start-3">{polarity}</div>
                        </div>
                    </div>

                    <div className="tw-row-start-2 tw-col-start-2 md:max-lg:tw-w-full md:max-lg:tw-row-start-4 md:max-lg:tw-col-start-1 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/two-wheeler/3/dimensions-icon.svg").finalUrl, ImageCdnProvider.Bunny, null, null)} />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)]">
                            <div className="tw-row-start-2">{getVernacularString("e44c8c4b-bf5d-412c-9ca4-27552ec79104", userPreferences.language)}</div>
                            <div className="tw-row-start-3">{dimensions}</div>
                        </div>
                    </div>
                </div>

                <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

                <Link
                    className="tw-place-self-center lg:tw-hidden"
                    to={batterySlug}
                >
                    <button className="lg-cta-button">{getVernacularString("063dc56b-910e-4a48-acb8-8f52668a4c72", userPreferences.language)}</button>
                </Link>

                <VerticalSpacer className="tw-h-4 lg:tw-hidden" />
            </div>
        </div>
    );
}

function ChooseYourIdealTwoWheelerBattery({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "ideal-battery": {
                humanReadableName: getVernacularString("5543107e-a9d0-476c-95fd-6d4bb7336373", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_1rem_auto_1rem_auto_minmax(0,1fr)] ", className)}
            id="ideal-battery"
            ref={sectionRef}
        >
            <div className="tw-row-start-2 tw-text-center lg-text-headline">{getVernacularString("b21c18a0-c411-4c08-adb9-cb1623a207bc", userPreferences.language)}</div>
            <div
                className="tw-row-start-3 tw-text-center lg-text-headline"
                dangerouslySetInnerHTML={{__html: getVernacularString("c0e900e7-59e1-45d8-b317-54988a6051ba", userPreferences.language)}}
            />
            <div className="tw-row-start-5 tw-text-center lg-px-screen-edge-2">{getVernacularString("114a82b5-b299-4bb9-8528-b295394771d8", userPreferences.language)}</div>

            <div className="tw-row-start-7 tw-grid tw-p-4 tw-justify-center tw-w-full">
                <div className="tw-w-fit tw-grid tw-grid-rows-2 lg:tw-grid-rows-1 lg:tw-grid-cols-2 tw-gap-4 tw-grid-flow-col">
                    <a
                        href="https://www.livguard.com/static-assets/leaflet-two-wheeler.pdf"
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
                        to="/battery-finder"
                        className="tw-h-full tw-w-full tw-grid tw-place-items-center"
                    >
                        <div className="tw-h-full tw-w-full tw-grid tw-items-center lg-cta-button tw-place-self-center">
                            {getVernacularString("1271cac7-693c-48bc-850f-16199416dd0e", userPreferences.language)}
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
            question: "155aff4b-cf5b-4505-aa8e-79bfc71ee080",
            answer: "7bd1fce8-1fe0-444a-946f-929ff649e51a",
        },
        {
            question: "dc74bd52-60c0-48a8-9be1-aae8e8b86f48",
            answer: "2f406215-26f7-4455-a693-e34bb075d033",
        },
        {
            question: "3cf70e58-d2db-4521-9d8c-08462e15991d",
            answer: "acb12340-7b82-42e4-b2be-b6b2902a9a29",
        },
        {
            question: "90ecdaa7-2d21-4ca1-a903-df431141b206",
            answer: "e558485f-f064-47a8-9285-9421d401f4a0",
        },
        {
            question: "fa8685b7-b634-4480-af54-afb41c3d1fba",
            answer: "d965a9bf-b309-4e09-8e63-636e6ff449bf",
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

export function FilterMobile({
    userPreferences,
    dispatch,
    batteryFinderState,
}: {
    userPreferences: UserPreferences;
    batteryFinderState: BatteryFinderState;
    dispatch: React.Dispatch<BatteryFinderAction>;
}) {
    const brands = batteryFinderState.brands;

    return (
        <>
            <div className="tw-place-self-center tw-w-full tw-grid tw-grid-flow-row tw-gap-y-6">
                <div>
                    <FormSelectComponent
                        items={brands}
                        itemBuilder={(item) => {
                            return item == null ? getVernacularString("51d56374-4d1d-46c1-8ef1-f72396e12e6a", userPreferences.language) : item;
                        }}
                        value={batteryFinderState.selectedBrand == null ? getVernacularString("51d56374-4d1d-46c1-8ef1-f72396e12e6a", userPreferences.language) : batteryFinderState.selectedBrand}
                        setValue={(item) => {
                            dispatch({
                                actionType: BatteryFinderActionType.setSelectedBrand,
                                payload: item,
                            });
                        }}
                        buttonClassName="disabled:tw-opacity-[0.4] disabled:!tw-bg-secondary-100-light"
                    />
                </div>
                <div>
                    <FormSelectComponent
                        items={batteryFinderState.segments}
                        itemBuilder={(item) => {
                            return item == "" ? getVernacularString("5793b8a3-16b1-4c11-bc37-ef5062160855", userPreferences.language) : item;
                        }}
                        value={batteryFinderState.selectedSegment == null ? getVernacularString("5793b8a3-16b1-4c11-bc37-ef5062160855", userPreferences.language) : batteryFinderState.selectedSegment}
                        setValue={(item) => {
                            dispatch({
                                actionType: BatteryFinderActionType.setSelectedSegment,
                                payload: item,
                            });
                        }}
                        disabled={batteryFinderState.selectedBrand == null}
                        buttonClassName="disabled:tw-opacity-[0.4] disabled:!tw-bg-secondary-100-light disabled:dark:tw-opacity-1 disabled:dark:!tw-bg-secondary-300-dark disabled:dark:!tw-text-secondary-900-dark"
                    />
                </div>
                <div>
                    <FormSelectComponent
                        items={batteryFinderState.models}
                        itemBuilder={(item) => {
                            return item == null ? getVernacularString("97f3fc31-1116-46f6-a385-d4df5e25bde1", userPreferences.language) : item;
                        }}
                        value={batteryFinderState.selectedModel == null ? getVernacularString("97f3fc31-1116-46f6-a385-d4df5e25bde1", userPreferences.language) : batteryFinderState.selectedModel}
                        setValue={(item) => {
                            dispatch({
                                actionType: BatteryFinderActionType.setSelectedModel,
                                payload: item,
                            });
                        }}
                        disabled={batteryFinderState.selectedBrand == null || batteryFinderState.selectedSegment == null}
                        buttonClassName="disabled:tw-opacity-[0.4] disabled:!tw-bg-secondary-100-light disabled:dark:tw-opacity-1 disabled:dark:!tw-bg-secondary-300-dark disabled:dark:!tw-text-secondary-900-dark"
                    />
                </div>

                <div
                    onClick={() => {
                        dispatch({
                            actionType: BatteryFinderActionType.findBatteries,
                            payload: userPreferences.language,
                        });
                    }}
                >
                    <button
                        className="tw-w-full lg-cta-button disabled:!tw-bg-none disabled:!tw-bg-secondary-300-light disabled:dark:!tw-bg-secondary-300-dark disabled:!tw-text-secondary-700-light disabled:dark:!tw-text-secondary-700-dark"
                        disabled={batteryFinderState.selectedModel == null}
                    >
                        {getVernacularString("3231d38a-1950-46eb-be3b-76bd8bce6998", userPreferences.language)}
                    </button>
                </div>
            </div>
        </>
    );
}
