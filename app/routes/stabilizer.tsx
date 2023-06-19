import {LoaderFunction} from "@remix-run/node";
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
import {Theme, UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";
import {convertProductInternalNameToPublicName, getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {CarouselStyle5} from "~/components/carouselStyle5";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {CarouselStyle3} from "~/components/carouselStyle3";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {ProductType} from "~/productData";
import {useState} from "react";

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

enum StabilizerType {
    forAC = 0,
    forMains = 1,
    forTVs = 2,
    forRefrigerator = 3,
}

export default () => {
    const {userPreferences, redirectTo} = useLoaderData() as LoaderData;

    const utmSearchParameters = useUtmSearchParameters();

    return (
        <>
            <PageScaffold
                userPreferences={userPreferences}
                redirectTo={redirectTo}
                showMobileMenuIcon={true}
                utmParameters={utmSearchParameters}
                breadcrumbs={[]}
            >
                <StabilizerPage userPreferences={userPreferences} />
            </PageScaffold>
        </>
    );
};

function StabilizerPage({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <>
            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-x-16 tw-items-start tw-justify-center">
                <HeroSection
                    userPreferences={userPreferences}
                    className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
                />

                <VerticalSpacer className="tw-h-10 tw-row-start-2 tw-col-start-1 lg:tw-col-span-full" />

                <StabilizersThatAreMeantToLast
                    userPreferences={userPreferences}
                    className="tw-row-start-3 tw-col-start-1 tw-col-span-full lg-px-screen-edge-2 lg:tw-px-0"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-4 tw-col-start-1 lg:tw-col-span-full" />

                <StabilizersForHome
                    userPreferences={userPreferences}
                    className="tw-row-start-5 lg:tw-col-span-full"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-6 tw-col-start-1 lg:tw-col-span-full" />

                <div className="tw-row-start-7 tw-grid lg:tw-grid-cols-[minmax(0,1fr)_minmax(0,2fr)] tw-col-span-full lg:lg-px-screen-edge-2 tw-gap-x-5">
                    <WeAreEverywhere
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

                <FaqSection
                    userPreferences={userPreferences}
                    className="tw-row-start-9 lg:tw-row-start-9 lg:tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-10 lg:tw-row-start-10 tw-col-start-1 lg:tw-col-span-full" />

                <SocialHandles
                    userPreferences={userPreferences}
                    heading={{text1: "b0a3aa40-4b00-4bdd-88e0-67085fafa92b", text2: `c0f802cc-902b-4328-b631-a3fad8fc7d18`}}
                    className="tw-row-start-11 lg:tw-row-start-11 tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px] tw-gap-[1rem]"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-12 lg:tw-row-start-12 tw-col-start-1 lg:tw-col-span-full" />
            </div>
        </>
    );
}

function HeroSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height)-9.5rem)] lg:tw-h-[70vh] tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_1rem_auto_1.5rem] lg:tw-grid-rows-[minmax(0,1fr)_auto_auto_1rem_auto_3.5rem] lg:tw-grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] tw-text-center",
                className,
            )}
            ref={ref}
        >
            {containerWidth == null || containerHeight == null ? null : (
                <CoverImage
                    relativePath={
                        containerHeight > containerWidth || containerWidth < 640 ? "/livguard/services-page/6/service_mobile_banner.jpg" : "/livguard/services-page/6/service_desktop_banner.jpg"
                    }
                    className="tw-row-start-1 tw-col-start-1 tw-row-span-full lg:tw-col-span-full"
                    key={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/services-page/6/service_mobile_banner.jpg" : "/livguard/services-page/6/service_desktop_banner.jpg"}
                />
            )}

            <DefaultTextAnimation className="tw-row-start-2 tw-col-start-1 lg:tw-col-start-2">
                <div className="lg-text-banner tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">
                    {getVernacularString("dead4984-38fc-490e-8b38-0670a9a03631", userPreferences.language)}
                </div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-3 tw-col-start-1 lg:tw-col-start-2">
                <div className="lg-text-banner tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">
                    {getVernacularString("e716f6b1-74ad-4087-80e1-fb88fb9a44ce", userPreferences.language)}
                </div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-5 tw-col-start-1 lg:tw-col-start-2">
                <div className="lg-text-body !tw-text-secondary-900-dark">{getVernacularString("10653f56-45cc-4317-9951-d6db74523397", userPreferences.language)}</div>
            </DefaultTextAnimation>
        </div>
    );
}

function StabilizersThatAreMeantToLast({userPreferences, className}: {userPreferences: UserPreferences; className: string}) {
    const StabilizerCard = ({title, description, imageRelativePath}: {title: string; description: string; imageRelativePath: string}) => {
        return (
            <div
                className={concatenateNonNullStringsWithSpaces(
                    "tw-grid tw-grid-rows-[1rem_auto_1rem_auto_1rem_auto_minmax(1rem,1fr)] tw-cols-[auto] tw-w-full tw-h-full tw-px-4 tw-py-4 tw-bg-secondary-100-dark tw-rounded-lg",
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
            titleTextContentPiece: "categoryBatteriesS2Slide1Heading",
            bodyTextContentPiece: "categoryBatteriesS2Slide1Description",
            imageRelativePath: "/livguard/category/batteries/2/1.jpg",
        },
        {
            titleTextContentPiece: "categoryBatteriesS2Slide2Heading",
            bodyTextContentPiece: "categoryBatteriesS2Slide2Description",
            imageRelativePath: "/livguard/category/batteries/2/2.jpg",
        },
        {
            titleTextContentPiece: "categoryBatteriesS2Slide3Heading",
            bodyTextContentPiece: "categoryBatteriesS2Slide3Description",
            imageRelativePath: "/livguard/category/batteries/2/3.jpg",
        },
        {
            titleTextContentPiece: "categoryBatteriesS2Slide4Heading",
            bodyTextContentPiece: "categoryBatteriesS2Slide4Description",
            imageRelativePath: "/livguard/category/batteries/2/4.jpg",
        },
        {
            titleTextContentPiece: "categoryBatteriesS2Slide4Heading",
            bodyTextContentPiece: "categoryBatteriesS2Slide4Description",
            imageRelativePath: "/livguard/category/batteries/2/4.jpg",
        },
        {
            titleTextContentPiece: "categoryBatteriesS2Slide4Heading",
            bodyTextContentPiece: "categoryBatteriesS2Slide4Description",
            imageRelativePath: "/livguard/category/batteries/2/4.jpg",
        },
        {
            titleTextContentPiece: "categoryBatteriesS2Slide4Heading",
            bodyTextContentPiece: "categoryBatteriesS2Slide4Description",
            imageRelativePath: "/livguard/category/batteries/2/4.jpg",
        },
    ];

    return (
        <>
            <div className={className}>
                <DefaultTextAnimation className="tw-flex tw-flex-col tw-items-center lg-text-headline lg-px-screen-edge-2 lg:tw-pl-0 lg:tw-pr-0 tw-text-center lg:tw-text-left">
                    <div>{getVernacularString("612038bf-767c-475f-beca-aa4428c56d9f", userPreferences.language)}</div>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("4a65b232-e2e5-4a85-9004-a84a5e04f91d", userPreferences.language)}} />
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-4 lg:tw-h-8" />

                <CarouselStyle5
                    items={stabilizersData.map((batteryData, batteryDataIndex) => (
                        <StabilizerCard
                            title={getVernacularString(batteryData.titleTextContentPiece, userPreferences.language)}
                            description={getVernacularString(batteryData.bodyTextContentPiece, userPreferences.language)}
                            imageRelativePath={batteryData.imageRelativePath}
                            key={batteryDataIndex}
                        />
                    ))}
                    className="tw-mx-auto"
                />
            </div>
        </>
    );
}

function StabilizersForHome({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
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

    const [selectedStabilizerType, setSelectedStabilizerType] = useState<StabilizerType>(StabilizerType.forAC);

    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-px-3 lg:lg-px-screen-edge-2", className)}>
            <div className="tw-grid tw-grid-cols-1">
                <h2 className="lg-text-headline tw-text-center">
                    <span className="lg-text-highlighted">{getVernacularString("342e7f22-6183-4d16-afd9-3f4e05c36a04", userPreferences.language)}</span>
                </h2>

                <h2 className="lg-text-headline tw-text-center">{getVernacularString("d0d3b5e3-a618-4174-b3a8-14e8d6d11ff2", userPreferences.language)}</h2>

                <VerticalSpacer className="tw-h-2" />

                <StabilizerTypeSelector
                    userPreferences={userPreferences}
                    selectedStabilizerType={selectedStabilizerType}
                    setSelectedStabilizerType={setSelectedStabilizerType}
                />

                <VerticalSpacer className="tw-h-6" />

                <div className="tw-grid tw-grid-cols-[repeat(2,minmax(0,1fr))] lg:tw-grid-cols-[repeat(auto-fill,minmax(14.5rem,1fr))] tw-gap-4 lg:tw-gap-8">
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

function StabilizerTypeSelector({
    userPreferences,
    className,
    selectedStabilizerType,
    setSelectedStabilizerType,
}: {
    userPreferences: UserPreferences;
    className?: string;
    selectedStabilizerType: number;
    setSelectedStabilizerType: Function;
}) {
    const typeSelectorButtonsContent = [
        {
            iconUrl: "",
            iconUrlSelected: "https://files.growthjockey.com/livguard/icons/stabilizer/for-ac.svg",
            textContentPiece: "076cf02d-0b8a-4af2-9e0f-63d1804402d2",
        },
        {
            iconUrl: "https://files.growthjockey.com/livguard/icons/stabilizer/for-mains.svg",
            iconUrlSelected: "",
            textContentPiece: "c3597ec0-a4b1-47b6-bdba-13b6e53f3cd9",
        },
        {
            iconUrl: "https://files.growthjockey.com/livguard/icons/stabilizer/for-tvs.svg",
            iconUrlSelected: "",
            textContentPiece: "b82414bd-0f13-4401-a592-84cbc4f9a4e2",
        },
        {
            iconUrl: "https://files.growthjockey.com/livguard/icons/stabilizer/for-refrigerator.svg",
            iconUrlSelected: "",
            textContentPiece: "33655fc5-1527-4744-a163-bd6217eac5b4",
        },
    ];

    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-flex flex-row lg:tw-justify-center tw-px-4 tw-overflow-x-scroll no-scrollbar", className)}>
            {/* Adding temporarily since UI is not finalised, discussed with Komal, will be changed*/}
            <style>
                {`
                    .no-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                    
                    /* Hide scrollbar for IE, Edge and Firefox */
                    .no-scrollbar {
                        -ms-overflow-style: none;  /* IE and Edge */
                        scrollbar-width: none;  /* Firefox */
                    }`}
            </style>
            {typeSelectorButtonsContent.map((typeSelector, typeSelectorIndex) => {
                const isSelected = selectedStabilizerType === typeSelectorIndex;
                return (
                    <div
                        className={concatenateNonNullStringsWithSpaces(
                            "tw-grid tw-grid-cols-[1rem_auto_0.5rem_auto_minmax(1rem,1fr)] tw-mx-4 tw-place-items-center tw-rounded-lg tw-py-2",
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
                            <img src={isSelected ? typeSelector.iconUrlSelected : typeSelector.iconUrl} />
                        </div>

                        <div
                            className="tw-col-start-4"
                            dangerouslySetInnerHTML={{__html: getVernacularString(typeSelector.textContentPiece, userPreferences.language)}}
                        />
                    </div>
                );
            })}
        </div>
    );
}

function StabilizerCard({
    slug,
    productType,
    productName,
    productPrice,
    userPreferences,
    isBestSeller,
    className,
}: {
    slug: string;
    productType: ProductType;
    productName: string;
    productPrice: string;
    userPreferences: UserPreferences;
    isBestSeller: boolean;
    className?: string;
}) {
    return (
        <Link
            to={`/product/${slug}`}
            className={concatenateNonNullStringsWithSpaces("tw-w-full tw-h-full tw-grid tw-grid-cols-1 lg-bg-secondary-100 tw-rounded-lg", className)}
        >
            {isBestSeller != null && isBestSeller === true ? (
                <div className="tw-row-start-1 tw-h-1rem lg-stabilizers-best-seller-gradient tw-rounded-tr-lg tw-place-self-end tw-text-xs tw-px-3 tw-py-1 lg:tw-px-4 tw-flex tw-flex-row tw-items-center">
                    <span>Best Seller</span>
                </div>
            ) : (
                <VerticalSpacer className="tw-h-[1.5rem]" />
            )}

            <div className="tw-p-4">
                <FullWidthImage
                    relativePath={`/livguard/products/${productType == ProductType.battery ? "batteries" : productType == ProductType.inverter ? "inverters" : "jodis"}/${slug}/thumbnail.png`}
                />

                <div className="tw-w-full tw-capitalize tw-text-center lg-text-body-bold lg-text-secondary-900">{ProductType[`${productType}`]}</div>
                <div className="tw-w-full tw-text-center lg-text-body-bold lg-text-secondary-900">{productName}</div>

                <VerticalSpacer className="tw-h-2" />

                <div className="tw-w-full tw-text-center lg-text-secondary-700">
                    {getVernacularString("c17b911e-a564-4192-a363-11def77e12b9", userPreferences.language)}
                    {productPrice}
                    {getVernacularString("28c8bd29-74e4-425b-8654-9d0f51a98cba", userPreferences.language)}
                </div>

                <VerticalSpacer className="tw-h-4" />

                <div className="tw-w-full tw-text-center lg-text-body-bold lg-text-primary-500">{getVernacularString("063dc56b-910e-4a48-acb8-8f52668a4c72", userPreferences.language)}</div>
            </div>
        </Link>
    );
}

function WeAreEverywhere({userPreferences, showCtaButton, className}: {userPreferences: UserPreferences; showCtaButton: boolean; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("[@media(max-width:1024px)]:lg-px-screen-edge", className)}>
            <div className="tw-relative lg-bg-secondary-100 tw-rounded-lg tw-h-[350px] tw-overflow-hidden lg:tw-h-full lg:tw-px-2">
                <div className="tw-flex tw-flex-col tw-absolute tw-m-auto tw-top-0 tw-left-0 tw-right-0 tw-bottom-0 tw-justify-center tw-items-center">
                    <div className="tw-absolute tw-inset-0">
                        <CoverImage relativePath={userPreferences.theme == Theme.Dark ? "/livguard/home/10/1-dark.jpg" : "/livguard/home/10/1-light.jpg"} />
                    </div>

                    <div className="tw-z-10 lg-text-headline tw-text-center">
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("92897a67-ff1d-4e6c-804f-4f69dd03db4d", userPreferences.language)}} />
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("53b219cb-fdee-4ea2-aff4-858f5c63aed0", userPreferences.language)}} />
                    </div>

                    <VerticalSpacer className="tw-h-1" />

                    <div className="tw-z-10 lg-text-title2">{getVernacularString("24bb85a9-42af-4302-b21b-dece9f9d0d21", userPreferences.language)}</div>

                    {showCtaButton && (
                        <>
                            <VerticalSpacer className="tw-h-6" />

                            <Link
                                to="/dealer-for-inverters-and-batteries"
                                className="tw-z-10 lg-cta-button"
                            >
                                {getVernacularString("db232019-b302-4eb7-a10c-05b17e72a800", userPreferences.language)}
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

function ChooseTheBestStabilizer({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_1rem_auto_1rem_auto_minmax(0,1fr)] ", className)}>
            <div className="tw-row-start-2 tw-text-center lg-text-headline">{getVernacularString("53bbe30f-9859-42e5-add2-64dd0de0d415", userPreferences.language)}</div>
            <div
                className="tw-row-start-3 tw-text-center lg-text-headline"
                dangerouslySetInnerHTML={{__html: getVernacularString("91461747-63e3-4cfa-bacf-715015891ee8", userPreferences.language)}}
            />
            <div className="tw-row-start-5 tw-text-center lg-px-screen-edge-2">{getVernacularString("8e88b1c7-bac7-4b9e-a112-5fc7431b4ccd", userPreferences.language)}</div>

            <div className="tw-row-start-7 tw-w-full tw-grid tw-grid-cols-[minmax(0,1fr)_minmax(0,1fr)] tw-p-4 tw-gap-4">
                <a
                    href="https://www.livguard.com/static-assets/livguard-buying-guide.pdf"
                    download
                    target="_blank"
                    className="tw-bg-secondary-100-dark tw-py-4 tw-rounded-lg tw-grid tw-grid-cols-[auto_1rem_auto_minmax(0,1fr)] tw-h-full tw-p-4"
                >
                    <img
                        className="tw-row-start-1 tw-col-start-1 tw-place-self-center"
                        src="https://files.growthjockey.com/livguard/icons/stabilizer/buying-guide.svg"
                    />
                    <div className="tw-row-start-1 tw-col-start-3 tw-flex tw-flex-row tw-items-center lg-text-body">
                        {getVernacularString("b3660763-f092-42d4-a97d-76a34dd701f6", userPreferences.language)}
                    </div>
                </a>
                <a
                    href="https://www.livguard.com/static-assets/livguard-ib-leaflet.pdf"
                    download
                    target="_blank"
                    className="tw-bg-secondary-100-dark tw-py-4 tw-rounded-lg tw-grid tw-grid-cols-[auto_1rem_auto_minmax(0,1fr)] tw-h-full tw-p-4"
                >
                    <img
                        className="tw-row-start-1 tw-col-start-1 tw-place-self-center"
                        src="https://files.growthjockey.com/livguard/icons/stabilizer/download-catalogue.svg"
                    />
                    <div className="tw-row-start-1 tw-col-start-3 tw-flex tw-flex-row tw-items-center lg-text-body">
                        {getVernacularString("51ae4bbd-0f66-42bc-b031-cc3e9dc4dc26", userPreferences.language)}
                    </div>
                </a>
            </div>

            <VerticalSpacer className="tw-row-start-8 tw-h-6" />

            <Link
                to="/load-calculator"
                className="tw-row-start-9 tw-grid tw-place-items-center"
            >
                <div className="lg-cta-button tw-place-self-center">{getVernacularString("1271cac7-693c-48bc-850f-16199416dd0e", userPreferences.language)}</div>
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
        <div className={concatenateNonNullStringsWithSpaces("[@media(max-width:1024px)]:lg-px-screen-edge tw-w-full tw-max-w-7xl tw-mx-auto", className)}>
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
