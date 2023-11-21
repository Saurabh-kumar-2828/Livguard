import type {LoaderFunction, V2_MetaFunction} from "@remix-run/node";
import {Link, useLoaderData} from "@remix-run/react";
import {useEffect, useState, useContext} from "react";
import {Facebook, Instagram, Linkedin, Twitter, Youtube} from "react-bootstrap-icons";
import {useInView} from "react-intersection-observer";
import {useResizeDetector} from "react-resize-detector";
import {getVernacularFromBackend} from "~/backend/vernacularProvider.server";
import {CarouselStyle3} from "~/components/carouselStyle3";
import {CarouselStyle5} from "~/components/carouselStyle5";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {EmbeddedYoutubeVideo} from "~/components/embeddedYoutubeVideo";
import {FaqSectionInternal} from "~/components/faqs";
import {CoverImage} from "~/components/images/coverImage";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {PageScaffold} from "~/components/pageScaffold";
import {ProductAndCategoryBottomBar} from "~/components/productAndCategoryBottomBar";
import {SecondaryNavigation} from "~/components/secondaryNavigation";
import {ContentProviderContext} from "~/contexts/contentProviderContext";
import {SecondaryNavigationControllerContext} from "~/contexts/secondaryNavigationControllerContext";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {SecondaryNavigationController, useSecondaryNavigationController} from "~/hooks/useSecondaryNavigationController";
import {ProductType} from "~/productData.types";
import {DealerLocator} from "~/reusableSections/dealerLocator";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {UserPreferences} from "~/typeDefinitions";
import {Language} from "~/typeDefinitions";
import {getRedirectToUrlFromRequest, getUrlFromRequest, secondaryNavThreshold} from "~/utilities";
import {getContentGenerator} from "~/vernacularProvider";
import { SocialMediaFeedsSection } from ".";

export const meta: V2_MetaFunction = ({data: loaderData}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = loaderData.userPreferences;
    if (userPreferences.language == Language.English) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/stabilizer",
            },
            {
                title: "Empower Your Home with Livguard Stabilizers",
            },
            {
                name: "description",
                content: "Experience seamless and steady energy with high-quality, feature-led solutions for AC, TV, and more with Livguard voltage stabilizers.",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/stabilizer",
            },
            {
                property: "og:title",
                content: "Empower Your Home with Livguard Stabilizers",
            },
            {
                property: "og:description",
                content: "Experience seamless and steady energy with high-quality, feature-led solutions for AC, TV, and more with Livguard voltage stabilizers.",
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
                content: "https://growthjockey.imgix.net/livguard/home/3/2.jpg?w=764.140625",
            },
        ];
    } else if (userPreferences.language == Language.Hindi) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/stabilizer",
            },
            {
                title: "लिवगार्ड स्टेबलाइजर्स के साथ अपने घर को सशक्त बनाएं",
            },
            {
                name: "description",
                content: "लिवगार्ड वोल्टेज स्टेबलाइजर्स के साथ एसी, टीवी और अन्य के लिए उच्च-गुणवत्ता, फीचर-आधारित समाधानों के साथ निर्बाध और स्थिर ऊर्जा का अनुभव करें।",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/stabilizer",
            },
            {
                property: "og:title",
                content: "लिवगार्ड स्टेबलाइजर्स के साथ अपने घर को सशक्त बनाएं",
            },
            {
                property: "og:description",
                content: "लिवगार्ड वोल्टेज स्टेबलाइजर्स के साथ एसी, टीवी और अन्य के लिए उच्च-गुणवत्ता, फीचर-आधारित समाधानों के साथ निर्बाध और स्थिर ऊर्जा का अनुभव करें।",
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
                content: "https://growthjockey.imgix.net/livguard/home/3/2.jpg?w=764.140625",
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
    vernacularData: {
        [id: string]: string;
    };
};

export const loader: LoaderFunction = async ({request}) => {
    const userPreferences = await getUserPreferencesFromCookiesAndUrlSearchParameters(request);
    if (userPreferences instanceof Error) {
        throw userPreferences;
    }

    const vernacularData = getVernacularFromBackend("stabilizerPage", userPreferences.language);

    const loaderData: LoaderData = {
        userPreferences: userPreferences,
        redirectTo: getRedirectToUrlFromRequest(request),
        pageUrl: getUrlFromRequest(request),
        vernacularData: vernacularData,
    };

    return loaderData;
};

enum StabilizerType {
    forAC = 0,
    forMains = 1,
    forTVs = 2,
    forRefrigerator = 3,
}

export default () => {
    const {userPreferences, redirectTo, pageUrl, vernacularData} = useLoaderData() as LoaderData;

    const utmSearchParameters = useUtmSearchParameters();
    const secondaryNavigationController = useSecondaryNavigationController();

    return (
        <>
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
                        {contentId: "273b847e-61e5-4a66-8c6d-a0539da153e2", link: "#"},
                    ]}
                >
                    <SecondaryNavigationControllerContext.Provider value={secondaryNavigationController}>
                        <StabilizerPage
                            userPreferences={userPreferences}
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
        </>
    );
};

function StabilizerPage({userPreferences, secondaryNavigationController}: {userPreferences: UserPreferences; secondaryNavigationController?: SecondaryNavigationController}) {
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);

    return (
        <>
            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-x-16 tw-items-start tw-justify-center">
                <HeroSection
                    userPreferences={userPreferences}
                    className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-2 tw-col-start-1 tw-col-span-full" />

                <StabilizersThatAreMeantToLast
                    userPreferences={userPreferences}
                    className="tw-row-start-3 tw-col-start-1 lg-px-screen-edge-2 lg:tw-px-0 tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-4 tw-col-start-1 lg:tw-col-span-full" />

                <StabilizersForHome
                    userPreferences={userPreferences}
                    className="tw-row-start-5 lg:tw-col-span-full tw-w-full tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-6 tw-col-start-1 lg:tw-col-span-full" />

                <div className="tw-row-start-7 tw-grid lg:tw-grid-cols-[minmax(0,1fr)_minmax(0,2fr)] tw-col-span-full lg:lg-px-screen-edge-2 tw-gap-x-5 tw-max-w-7xl tw-mx-auto">
                    <DealerLocator
                        userPreferences={userPreferences}
                        className="tw-row-start-5 lg:tw-col-start-1 lg:tw-h-full"
                        showCtaButton={true}
                    />

                    <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-6 lg:tw-col-start-1 lg:tw-col-span-full lg:tw-hidden" />

                    <ChooseTheBestStabilizer
                        userPreferences={userPreferences}
                        className="tw-row-start-7 lg:tw-row-start-5 lg:tw-col-start-2"
                    />
                </div>

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-8 lg:tw-row-start-8 tw-col-start-1 lg:tw-col-span-full" />

                <SocialMediaFeedsSection
                    userPreferences={userPreferences}
                    className="tw-row-start-9 lg:tw-row-start-9 tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px] tw-gap-[1rem] tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-10 lg:tw-row-start-10 tw-col-start-1 lg:tw-col-span-full" />

                <FaqSection
                    userPreferences={userPreferences}
                    className="tw-row-start-11 lg:tw-row-start-11 lg:tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px] tw-max-w-7xl"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-12 lg:tw-row-start-12 tw-col-start-1 lg:tw-col-span-full" />
            </div>
        </>
    );
}

function HeroSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    // const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();
    const isScreenSizeBelow = useIsScreenSizeBelow(640);
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
            className={concatenateNonNullStringsWithSpaces(
                "tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height)-9.5rem)] lg:tw-h-[70vh] tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_1rem_auto_1.5rem] lg:tw-grid-rows-[minmax(0,1fr)_auto_auto_1rem_auto_3.5rem] lg:tw-grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] tw-text-center",
                className,
            )}
            // id="top"
            // ref={sectionRef}
        >
            <CoverImage
                relativePath={isScreenSizeBelow ? "/livguard/stabilizer/1/stabilizer-banner-mobile.jpg" : "/livguard/stabilizer/1/stabilizer-banner-desktop.jpg"}
                className="tw-row-start-1 tw-col-start-1 tw-row-span-full lg:tw-col-span-full"
                key={isScreenSizeBelow ? "/livguard/stabilizer/1/stabilizer-banner-mobile.jpg" : "/livguard/stabilizer/1/stabilizer-banner-desktop.jpg"}
            />

            <DefaultTextAnimation className="tw-row-start-2 tw-col-start-1 lg:tw-col-start-2 lg-px-screen-edge-2 lg:tw-px-0">
                <div className="lg-text-banner tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">{contentData.getContent("dead4984-38fc-490e-8b38-0670a9a03631")}</div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-3 tw-col-start-1 lg:tw-col-start-2 lg-px-screen-edge-2 lg:tw-px-0">
                <div className="lg-text-banner tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">{contentData.getContent("e716f6b1-74ad-4087-80e1-fb88fb9a44ce")}</div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-5 tw-col-start-1 lg:tw-col-start-2 lg-px-screen-edge-2 lg:tw-px-0">
                <div className="lg-text-body !tw-text-secondary-900-dark">{contentData.getContent("10653f56-45cc-4317-9951-d6db74523397")}</div>
            </DefaultTextAnimation>
        </div>
    );
}

function StabilizersThatAreMeantToLast({userPreferences, className}: {userPreferences: UserPreferences; className: string}) {
    const contentData = useContext(ContentProviderContext);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "meant-to-last": {
                humanReadableName: contentData.getContent("8bb57774-d155-41f1-bf07-6906c1026203"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

    const StabilizerCard = ({title, description, imageRelativePath}: {title: string; description: string; imageRelativePath: string}) => {
        return (
            <div
                className={concatenateNonNullStringsWithSpaces(
                    "tw-place-self-center tw-grid tw-grid-rows-[1rem_auto_1rem_auto_1rem_auto_minmax(1rem,1fr)] tw-cols-[auto] tw-w-full tw-h-full tw-px-4 tw-py-4 lg-bg-secondary-100 tw-rounded-lg",
                )}
            >
                <div className="tw-row-start-2">
                    <FullWidthImage relativePath={imageRelativePath} />
                </div>

                <div className="tw-row-start-4 tw-text-center lg-text-title1">{title}</div>

                <div className="tw-row-start-6 tw-text-center lg-text-body">{description}</div>
            </div>
        );
    };

    const stabilizersData: Array<{titleTextContentPiece: string; bodyTextContentPiece: string; imageRelativePath: string}> = [
        {
            titleTextContentPiece: "cefeeda8-fa1a-41c4-bb8c-d53b052ca9d0",
            bodyTextContentPiece: "16cbfbfb-a3c7-4dae-99e7-52b422c31104",
            imageRelativePath: "/livguard/category/batteries/2/1.jpg",
        },
        {
            titleTextContentPiece: "cefeeda8-fa1a-41c4-bb8c-d53b052ca9d0",
            bodyTextContentPiece: "16cbfbfb-a3c7-4dae-99e7-52b422c31104",
            imageRelativePath: "/livguard/category/batteries/2/1.jpg",
        },
        {
            titleTextContentPiece: "cefeeda8-fa1a-41c4-bb8c-d53b052ca9d0",
            bodyTextContentPiece: "16cbfbfb-a3c7-4dae-99e7-52b422c31104",
            imageRelativePath: "/livguard/category/batteries/2/1.jpg",
        },
        {
            titleTextContentPiece: "cefeeda8-fa1a-41c4-bb8c-d53b052ca9d0",
            bodyTextContentPiece: "16cbfbfb-a3c7-4dae-99e7-52b422c31104",
            imageRelativePath: "/livguard/category/batteries/2/1.jpg",
        },
        {
            titleTextContentPiece: "cefeeda8-fa1a-41c4-bb8c-d53b052ca9d0",
            bodyTextContentPiece: "16cbfbfb-a3c7-4dae-99e7-52b422c31104",
            imageRelativePath: "/livguard/category/batteries/2/1.jpg",
        },
        {
            titleTextContentPiece: "cefeeda8-fa1a-41c4-bb8c-d53b052ca9d0",
            bodyTextContentPiece: "16cbfbfb-a3c7-4dae-99e7-52b422c31104",
            imageRelativePath: "/livguard/category/batteries/2/1.jpg",
        },
        {
            titleTextContentPiece: "cefeeda8-fa1a-41c4-bb8c-d53b052ca9d0",
            bodyTextContentPiece: "16cbfbfb-a3c7-4dae-99e7-52b422c31104",
            imageRelativePath: "/livguard/category/batteries/2/1.jpg",
        },
        {
            titleTextContentPiece: "cefeeda8-fa1a-41c4-bb8c-d53b052ca9d0",
            bodyTextContentPiece: "16cbfbfb-a3c7-4dae-99e7-52b422c31104",
            imageRelativePath: "/livguard/category/batteries/2/1.jpg",
        },
    ];

    return (
        <>
            <div
                className={concatenateNonNullStringsWithSpaces("tw-w-full lg:tw-col-span-full", className)}
                id="meant-to-last"
                ref={sectionRef}
            >
                <DefaultTextAnimation className="tw-flex tw-flex-col tw-items-center lg-text-headline lg-px-screen-edge-2 lg:tw-pl-0 lg:tw-pr-0 tw-text-center lg:tw-text-left">
                    <div>{contentData.getContent("612038bf-767c-475f-beca-aa4428c56d9f")}</div>
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent("4a65b232-e2e5-4a85-9004-a84a5e04f91d")}} />
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-4 lg:tw-h-8" />

                <CarouselStyle5
                    items={stabilizersData.map((batteryData, batteryDataIndex) => (
                        <StabilizerCard
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

function StabilizersForHome({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "stabilizers-for-home": {
                humanReadableName: contentData.getContent("c00d2678-dc68-4ded-99aa-4612742a4542"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

    const featuredProducts = [
        {
            productType: ProductType.battery,
            stabilizerType: StabilizerType.forAC,
            name: "LA 410 XS",
            slug: "it1584tt",
            isBestSeller: true,
            price: "XXXXX",
        },
        {
            productType: ProductType.inverter,
            stabilizerType: StabilizerType.forMains,
            name: "LA 413 DP",
            slug: "lgs1600",
            price: "XXXXX",
        },
        {
            productType: ProductType.battery,
            stabilizerType: StabilizerType.forTVs,
            name: "LA 413 XS",
            price: "XXXXX",
            slug: "it1584tt",
        },
        {
            productType: ProductType.inverter,
            stabilizerType: StabilizerType.forRefrigerator,
            name: "LA 413 XS",
            price: "XXXXX",
            slug: "lgs1600",
        },
        {
            productType: ProductType.battery,
            stabilizerType: StabilizerType.forAC,
            slug: "it1584tt",
            name: "LA 517 XA",
            price: "XXXXX",
            isBestSeller: true,
        },
        {
            productType: ProductType.inverter,
            stabilizerType: StabilizerType.forMains,
            slug: "lgs1600",
            price: "XXXXX",
            name: "LA 417 VX",
        },
        {
            productType: ProductType.battery,
            stabilizerType: StabilizerType.forTVs,
            slug: "it1584tt",
            price: "XXXXX",
            name: "LA 415 XS",
        },
        {
            productType: ProductType.inverter,
            stabilizerType: StabilizerType.forRefrigerator,
            slug: "lgs1600",
            isBestSeller: true,
            name: "LA 415 XS",
            price: "XXXXX",
        },
        {
            productType: ProductType.battery,
            stabilizerType: StabilizerType.forAC,
            slug: "it1584tt",
            isBestSeller: true,
            price: "XXXXX",
            name: "LA 413 DP",
        },
        {
            productType: ProductType.inverter,
            stabilizerType: StabilizerType.forMains,
            slug: "lgs1600",
            price: "XXXXX",
            name: "LA 413 DP",
        },
        {
            productType: ProductType.battery,
            stabilizerType: StabilizerType.forTVs,
            slug: "it1584tt",
            isBestSeller: true,
            price: "XXXXX",
            name: "LA 413 DP",
        },
        {
            productType: ProductType.inverter,
            stabilizerType: StabilizerType.forRefrigerator,
            slug: "lgs1600",
            price: "XXXXX",
            name: "LA 413 DP",
        },
        {
            productType: ProductType.battery,
            stabilizerType: StabilizerType.forAC,
            slug: "it1584tt",
            isBestSeller: true,
            price: "XXXXX",
            name: "LA 413 DP",
        },
        {
            productType: ProductType.inverter,
            stabilizerType: StabilizerType.forMains,
            isBestSeller: true,
            slug: "lgs1600",
            price: "XXXXX",
            name: "LA 413 DP",
        },
        {
            productType: ProductType.battery,
            stabilizerType: StabilizerType.forTVs,
            slug: "it1584tt",
            isBestSeller: true,
            price: "XXXXX",
            name: "LA 413 DP",
        },
        {
            productType: ProductType.inverter,
            stabilizerType: StabilizerType.forRefrigerator,
            slug: "lgs1600",
            price: "XXXXX",
            name: "LA 413 DP",
        },
        {
            productType: ProductType.battery,
            stabilizerType: StabilizerType.forAC,
            slug: "it1584tt",
            price: "XXXXX",
            name: "LA 413 DP",
        },
        {
            productType: ProductType.inverter,
            stabilizerType: StabilizerType.forMains,
            slug: "lgs1600",
            isBestSeller: true,
            price: "XXXXX",
            name: "LA 413 DP",
        },
        {
            productType: ProductType.battery,
            stabilizerType: StabilizerType.forTVs,
            slug: "it1584tt",
            price: "XXXXX",
            name: "LA 413 DP",
        },
        {
            productType: ProductType.inverter,
            stabilizerType: StabilizerType.forRefrigerator,
            slug: "lgs1600",
            price: "XXXXX",
            name: "LA 413 DP",
        },
        {
            productType: ProductType.battery,
            stabilizerType: StabilizerType.forAC,
            slug: "it1584tt",
            price: "XXXXX",
            name: "LA 413 DP",
        },
        {
            productType: ProductType.inverter,
            stabilizerType: StabilizerType.forMains,
            slug: "lgs1600",
            isBestSeller: true,
            price: "XXXXX",
            name: "LA 413 DP",
        },
        {
            productType: ProductType.battery,
            stabilizerType: StabilizerType.forTVs,
            slug: "it1584tt",
            price: "XXXXX",
            name: "LA 413 DP",
        },
        {
            productType: ProductType.inverter,
            stabilizerType: StabilizerType.forRefrigerator,
            slug: "lgs1600",
            price: "XXXXX",
            name: "LA 413 DP",
        },
        {
            productType: ProductType.battery,
            stabilizerType: StabilizerType.forAC,
            slug: "it1584tt",
            price: "XXXXX",
            name: "LA 413 DP",
        },
        {
            productType: ProductType.inverter,
            stabilizerType: StabilizerType.forMains,
            slug: "lgs1600",
            price: "XXXXX",
            name: "LA 413 DP",
        },
        {
            productType: ProductType.battery,
            stabilizerType: StabilizerType.forTVs,
            slug: "it1584tt",
            price: "XXXXX",
            name: "LA 413 DP",
        },
        {
            productType: ProductType.inverter,
            stabilizerType: StabilizerType.forRefrigerator,
            slug: "lgs1600",
            price: "XXXXX",
            name: "LA 413 DP",
        },
        {
            productType: ProductType.battery,
            stabilizerType: StabilizerType.forAC,
            slug: "it1584tt",
            price: "XXXXX",
            name: "LA 413 DP",
        },
        {
            productType: ProductType.inverter,
            stabilizerType: StabilizerType.forMains,
            slug: "lgs1600",
            price: "XXXXX",
            name: "LA 413 DP",
        },
        {
            productType: ProductType.battery,
            stabilizerType: StabilizerType.forTVs,
            slug: "it1584tt",
            price: "XXXXX",
            name: "LA 413 DP",
        },
        {
            productType: ProductType.inverter,
            stabilizerType: StabilizerType.forRefrigerator,
            slug: "lgs1600",
            price: "XXXXX",
            name: "LA 413 DP",
        },
        {
            productType: ProductType.battery,
            stabilizerType: StabilizerType.forAC,
            slug: "it1584tt",
            price: "XXXXX",
            name: "LA 413 DP",
        },
        {
            productType: ProductType.inverter,
            stabilizerType: StabilizerType.forMains,
            slug: "lgs1600",
            price: "XXXXX",
            name: "LA 413 DP",
        },
        {
            productType: ProductType.battery,
            stabilizerType: StabilizerType.forTVs,
            slug: "it1584tt",
            price: "XXXXX",
            name: "LA 413 DP",
        },
        {
            productType: ProductType.inverter,
            stabilizerType: StabilizerType.forRefrigerator,
            slug: "lgs1600",
            price: "XXXXX",
            name: "LA 413 DP",
        },
    ];

    const typeSelectorButtonsContent = [
        {
            iconUrl: "https://files.growthjockey.com/livguard/icons/stabilizer/for-AC.svg",
            textContentPiece: "076cf02d-0b8a-4af2-9e0f-63d1804402d2",
        },
        {
            iconUrl: "https://files.growthjockey.com/livguard/icons/stabilizer/for-mains.svg",
            textContentPiece: "c3597ec0-a4b1-47b6-bdba-13b6e53f3cd9",
        },
        {
            iconUrl: "https://files.growthjockey.com/livguard/icons/stabilizer/for-tvs.svg",
            textContentPiece: "b82414bd-0f13-4401-a592-84cbc4f9a4e2",
        },
        {
            iconUrl: "https://files.growthjockey.com/livguard/icons/stabilizer/for-refrigerator.svg",
            textContentPiece: "33655fc5-1527-4744-a163-bd6217eac5b4",
        },
    ];

    function StabilizerCard({
        slug,
        productType,
        productName,
        productPrice,
        userPreferences,
        isBestSeller,
    }: {
        slug: string;
        productType: ProductType;
        productName: string;
        productPrice: string;
        userPreferences: UserPreferences;
        isBestSeller: boolean;
    }) {
        return (
            <Link
                to={`/product/${slug}`}
                className="tw-w-full tw-h-full tw-grid tw-grid-cols-1 lg-bg-secondary-100 tw-rounded-lg"
            >
                {isBestSeller != null && isBestSeller === true ? (
                    <div className="tw-row-start-1 tw-h-1rem lg-stabilizers-best-seller-gradient tw-rounded-tr-lg tw-place-self-end tw-text-xs tw-px-3 tw-py-1 lg:tw-px-4 tw-flex tw-flex-row tw-items-center !tw-text-secondary-900-dark">
                        <span>Best Seller</span>
                    </div>
                ) : (
                    <VerticalSpacer className="tw-h-[1.5rem]" />
                )}

                <div className="tw-p-4">
                    <FullWidthImage relativePath={`/livguard/products/${slug}/thumbnail.png`} />

                    <div className="tw-w-full tw-capitalize tw-text-center lg-text-body-bold lg-text-secondary-900">{ProductType[`${productType}`]}</div>
                    <div className="tw-w-full tw-text-center lg-text-body-bold lg-text-secondary-900">{productName}</div>

                    <VerticalSpacer className="tw-h-2" />

                    <div className="tw-w-full tw-text-center lg-text-secondary-700">
                        {contentData.getContent("c17b911e-a564-4192-a363-11def77e12b9")}
                        {productPrice}
                        {contentData.getContent("28c8bd29-74e4-425b-8654-9d0f51a98cba")}
                    </div>

                    <VerticalSpacer className="tw-h-4" />

                    <div className="tw-w-full tw-text-center lg-text-body-bold lg-text-primary-500">{contentData.getContent("063dc56b-910e-4a48-acb8-8f52668a4c72")}</div>
                </div>
            </Link>
        );
    }

    const [selectedStabilizerType, setSelectedStabilizerType] = useState<StabilizerType>(StabilizerType.forAC);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-px-3", className)}
            id="stabilizers-for-home"
            ref={sectionRef}
        >
            <div className="tw-grid tw-grid-cols-1">
                <h2 className="lg-text-headline tw-text-center">
                    <span className="lg-text-highlighted">{contentData.getContent("342e7f22-6183-4d16-afd9-3f4e05c36a04")}</span>
                </h2>

                <h2 className="lg-text-headline tw-text-center">{contentData.getContent("d0d3b5e3-a618-4174-b3a8-14e8d6d11ff2")}</h2>

                <VerticalSpacer className="tw-h-2" />

                <div className="tw-grid tw-auto-rows-auto tw-grid-cols-[minmax(auto,1fr)_minmax(auto,1fr)] tw-gap-4 lg-px-screen-edge-2 lg:tw-flex lg:tw-flex-row lg:tw-justify-center">
                    {/* TODO: Replace with ButtonWithIconAndText */}
                    {typeSelectorButtonsContent.map((typeSelector, typeSelectorIndex) => {
                        const isSelected = selectedStabilizerType === typeSelectorIndex;
                        return (
                            <div
                                className={concatenateNonNullStringsWithSpaces(
                                    "tw-grid tw-grid-cols-[1rem_auto_0.5rem_auto_minmax(1rem,1fr)] tw-place-items-center tw-rounded-lg tw-py-2 tw-transition-colors tw-duration-200 tw-cursor-pointer",
                                    isSelected ? "lg-bg-primary-500" : "lg-bg-secondary-100",
                                )}
                                onClick={() => {
                                    setSelectedStabilizerType(typeSelectorIndex);
                                }}
                                key={typeSelectorIndex}
                            >
                                <div
                                    className={concatenateNonNullStringsWithSpaces(
                                        "tw-col-start-2 tw-w-[2rem] tw-h-[2rem] tw-rounded-full tw-flex tw-flex-row tw-justify-center tw-items-center tw-shadow-[0px_4px_4px_0px_#00000040]",
                                        isSelected ? "tw-bg-white" : "tw-bg-secondary-500-light",
                                    )}
                                >
                                    <img
                                        className={isSelected ? "tw-invert" : ""}
                                        src={typeSelector.iconUrl}
                                    />
                                </div>

                                <div
                                    className={`tw-col-start-4 ${isSelected ? "!tw-text-secondary-900-dark" : "lg-text-secondary-900"}`}
                                    dangerouslySetInnerHTML={{__html: contentData.getContent(typeSelector.textContentPiece)}}
                                />
                            </div>
                        );
                    })}
                </div>

                <VerticalSpacer className="tw-h-6" />

                <div className="tw-grid tw-grid-cols-[repeat(2,minmax(0,1fr))] lg:tw-grid-cols-[repeat(auto-fill,14.5rem)] lg:tw-grid-flow-row-dense lg:tw-justify-center tw-gap-4 lg:tw-gap-8">
                    {featuredProducts
                        .filter((product) => product.stabilizerType === selectedStabilizerType)
                        .sort((product) => (product.isBestSeller === true ? -1 : 1))
                        .map((featuredProduct, featuredProductIndex) => (
                            <StabilizerCard
                                slug={featuredProduct.slug}
                                productType={featuredProduct.productType}
                                productName={featuredProduct.name}
                                productPrice={featuredProduct.price}
                                userPreferences={userPreferences}
                                isBestSeller={featuredProduct.isBestSeller != null ? featuredProduct.isBestSeller : false}
                                key={featuredProductIndex}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}

function ChooseTheBestStabilizer({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "choose-best-stabilizer": {
                humanReadableName: contentData.getContent("c5937b05-1396-4be3-a508-6478d48700aa"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_1rem_auto_1rem_auto_minmax(0,1fr)] ", className)}
            id="choose-best-stabilizer"
            ref={sectionRef}
        >
            <div className="tw-row-start-2 tw-text-center lg-text-headline">{contentData.getContent("53bbe30f-9859-42e5-add2-64dd0de0d415")}</div>
            <div
                className="tw-row-start-3 tw-text-center lg-text-headline"
                dangerouslySetInnerHTML={{__html: contentData.getContent("91461747-63e3-4cfa-bacf-715015891ee8")}}
            />
            <div className="tw-row-start-5 tw-text-center lg-px-screen-edge-2">{contentData.getContent("8e88b1c7-bac7-4b9e-a112-5fc7431b4ccd")}</div>

            <div className="tw-row-start-7 tw-w-full tw-grid tw-grid-cols-[minmax(0,1fr)_minmax(0,1fr)] tw-p-4 tw-gap-4">
                <a
                    href="https://www.livguard.com/static-assets/livguard-buying-guide.pdf"
                    download
                    target="_blank"
                    className="lg-bg-secondary-100 tw-py-4 tw-rounded-lg tw-grid tw-grid-cols-[auto_1rem_auto_minmax(0,1fr)] tw-h-full tw-p-4"
                >
                    <img
                        className="tw-row-start-1 tw-col-start-1 tw-place-self-center"
                        src="https://files.growthjockey.com/livguard/icons/stabilizer/buying-guide.svg"
                    />
                    <div className="tw-row-start-1 tw-col-start-3 tw-flex tw-flex-row tw-items-center lg-text-body">{contentData.getContent("b3660763-f092-42d4-a97d-76a34dd701f6")}</div>
                </a>
                <a
                    href="https://www.livguard.com/static-assets/livguard-ib-leaflet.pdf"
                    download
                    target="_blank"
                    className="lg-bg-secondary-100 tw-py-4 tw-rounded-lg tw-grid tw-grid-cols-[auto_1rem_auto_minmax(0,1fr)] tw-h-full tw-p-4"
                >
                    <img
                        className="tw-row-start-1 tw-col-start-1 tw-place-self-center"
                        src="https://files.growthjockey.com/livguard/icons/stabilizer/download-catalogue.svg"
                    />
                    <div className="tw-row-start-1 tw-col-start-3 tw-flex tw-flex-row tw-items-center lg-text-body">{contentData.getContent("51ae4bbd-0f66-42bc-b031-cc3e9dc4dc26")}</div>
                </a>
            </div>

            <VerticalSpacer className="tw-row-start-8 tw-h-6" />

            <Link
                to="/load-calculator"
                className="tw-row-start-9 tw-grid tw-place-items-center"
            >
                <div className="lg-cta-button tw-place-self-center">{contentData.getContent("1271cac7-693c-48bc-850f-16199416dd0e")}</div>
            </Link>

            <VerticalSpacer className="lg:tw-row-start-10 tw-hidden lg:tw-block lg:tw-h-12" />
        </div>
    );
}

function FaqSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const faqs = [
        {
            question: "homeS9Q1Q",
            answer: "homeS9Q1A",
        },
        {
            question: "homeS9Q2Q",
            answer: "homeS9Q2A",
        },
        {
            question: "homeS9Q3Q",
            answer: "homeS9Q3A",
        },
        {
            question: "homeS9Q4Q",
            answer: "homeS9Q4A",
        },
        {
            question: "homeS9Q5Q",
            answer: "homeS9Q5A",
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
    const contentData = useContext(ContentProviderContext);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "social-handles": {
                humanReadableName: contentData.getContent("01553562-bafd-4ad3-a18c-7b6cc113f03f"),
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
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent(heading.text1)}} />

                    <div dangerouslySetInnerHTML={{__html: contentData.getContent(heading.text2)}} />
                </div>

                <VerticalSpacer className="tw-h-4" />

                <CarouselStyle3 items={embeddedVideos} />

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-body">{contentData.getContent("homeS11T2")}</div>

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
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent(heading.text1)}} />

                    <div dangerouslySetInnerHTML={{__html: contentData.getContent(heading.text2)}} />
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

                                <div className="lg-text-body">{contentData.getContent("homeS11T2")}</div>

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
