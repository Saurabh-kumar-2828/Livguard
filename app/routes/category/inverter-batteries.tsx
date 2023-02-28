import {ChevronDoubleDownIcon} from "@heroicons/react/20/solid";
import {LoaderFunction, MetaFunction} from "@remix-run/node";
import {Link} from "@remix-run/react";
import {useState} from "react";
import {useLoaderData} from "react-router";
import {Accordion} from "~/components/accordian";
import {OurSuggestionsComponent, ProductCardComponent, ProductOverviewComponent, SocialHandles, WhatsBestForYouComponent} from "~/components/category/common";
import {CategoryCarousel1} from "~/components/categoryCarousel1";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {DownloadCatalogueBottomBar} from "~/components/downloadCatalogueBottomBar";
import {FAQSection} from "~/components/faqs";
import {PageScaffold} from "~/components/pageScaffold";
import {CoverImage} from "~/global-common-typescript/components/coverImage";
import {FixedWidthImage} from "~/global-common-typescript/components/fixedWidthImage";
import {FullWidthImage} from "~/global-common-typescript/components/fullWidthImage";
import {ImageCdnProvider} from "~/global-common-typescript/components/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {DealerLocator, ShowerSomeLoveOnSocialHandles} from "~/routes";
import {getUserPreferencesFromCookies} from "~/server/userPreferencesCookieHelper.server";
import {BatteryType, UserPreferences} from "~/typeDefinitions";
import {getRedirectToUrlFromRequest} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";

export const meta: MetaFunction = () => {
    return {
        title: "Buy Inverter Battery Online at Best Prices In India",
        desscription: "Invest in the best inverter batteries for your home with Livguard. Experience efficiency and comfort with the battery's long life",
    };
};

type LoaderData = {
    userPreferences: UserPreferences;
    redirectTo: string;
};

export const loader: LoaderFunction = async ({request}) => {
    const userPreferences = await getUserPreferencesFromCookies(request);
    if (userPreferences instanceof Error) {
        throw userPreferences;
    }

    const loaderData: LoaderData = {
        userPreferences: userPreferences,
        redirectTo: getRedirectToUrlFromRequest(request),
    };

    return loaderData;
};

export default function () {
    const {userPreferences, redirectTo} = useLoaderData() as LoaderData;

    const utmSearchParameters = useUtmSearchParameters();

    return (
        <>
            <PageScaffold
                userPreferences={userPreferences}
                redirectTo={redirectTo}
                showMobileMenuIcon={true}
                utmParameters={utmSearchParameters}
            >
                <CategoryPage userPreferences={userPreferences} utmParameters={utmSearchParameters} />
            </PageScaffold>
            <DownloadCatalogueBottomBar userPreferences={userPreferences} />
        </>
    );
}

function CategoryPage({userPreferences, utmParameters}: {userPreferences: UserPreferences; utmParameters: {[searchParameter: string]: string}}) {
    return (
        <>
            <HeroSection userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-8 lg:tw-h-[72px]" />

            <BatteriesAreMeantToLast
                userPreferences={userPreferences}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-[72px]" />

            <OurBatteriesSection
                userPreferences={userPreferences}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-[72px]" />

            <OurSuggestionsSection
                userPreferences={userPreferences}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-[72px]" />

            {/* <SideBySideOverviewSection userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" /> */}

            <SuggestedJodiSection
                userPreferences={userPreferences}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-[72px]" />

            <div className="tw-grid tw-grid-cols-1 tw-grid-rows-2 lg:tw-grid-cols-[minmax(0,2fr),minmax(0,3fr)] lg:tw-grid-rows-1 tw-gap-y-10 lg:tw-gap-x-4 lg:tw-px-[72px] xl:tw-px-[120px]">
                <DealerLocator
                    userPreferences={userPreferences}
                    showCtaButton={true}
                    className="tw-row-start-1 tw-col-start-1 lg:tw-row-span-full lg:tw-col-start-1 lg:tw-h-full"
                />

                <ChooseBestInverterBattery
                    userPreferences={userPreferences}
                    utmParameters={utmParameters}
                    className="tw-row-start-2 lg:tw-col-start-2 lg:tw-row-start-1"
                />
            </div>

            <VerticalSpacer className="tw-h-10 lg:tw-h-[72px]" />

            <FaqSection
                userPreferences={userPreferences}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-[50px]" />

            <SocialHandles
                userPreferences={userPreferences}
                heading={{text1: "dealerLocatorSocialHT1", text2: "dealerLocatorSocialHT2"}}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-[72px]" />
        </>
    );
}

function HeroSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height))-4.5rem] lg:tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height))] tw-grid tw-grid-rows-[1.5rem_3rem_minmax(0,1fr)_auto_0.5rem_auto_1rem_auto_1rem_minmax(0,1fr)_auto_1.5rem] tw-justify-items-center tw-text-center",
                className,
            )}
        >
            <CoverImage
                relativePath="/livguard/category/batteries/1/1.jpg"
                className="tw-row-[1/span_12] tw-col-start-1"
                imageCdnProvider={ImageCdnProvider.Imgix}
                alt="Inverter battery"
            />

            <DefaultTextAnimation className="tw-row-start-4 tw-col-start-1">
                <div className="lg-text-banner lg-px-screen-edge tw-text-secondary-900-dark">{getVernacularString("categoryBatteriesS1T1", userPreferences.language)}</div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-6 tw-col-start-1">
                <div className="lg-text-title1 lg-px-screen-edge tw-text-secondary-900-dark">{getVernacularString("categoryBatteriesS1T2", userPreferences.language)}</div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-[8] tw-col-start-1">
                <div className="lg-text-body lg-px-screen-edge !tw-text-secondary-900-dark">{getVernacularString("categoryBatteriesS1T3", userPreferences.language)}</div>
            </DefaultTextAnimation>

            <ChevronDoubleDownIcon className="tw-row-[11] tw-col-start-1 tw-w-12 tw-h-12 lg-text-primary-500 tw-animate-bounce" />
        </div>
    );
}

function BatteriesAreMeantToLast({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const sectionData: Array<{titleTextContentPiece: string; bodyTextContentPiece: string; imageRelativePath: string}> = [
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
    ];

    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-flex tw-flex-col", className)}>
            <div className="lg-text-headline tw-text-center">
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("categoryBatteriesS2HT1", userPreferences.language)}} />
                </DefaultTextAnimation>
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("categoryBatteriesS2HT2", userPreferences.language)}} />
                </DefaultTextAnimation>
            </div>

            <VerticalSpacer className="tw-h-6" />

            <CategoryCarousel1
                userPreferences={userPreferences}
                items={sectionData}
            />
        </div>
    );
}

// function ChooseYourBattery({userPreferences}: {userPreferences: UserPreferences}) {
//     return (
//         <div className="lg-px-screen-edge">
//             <div className="tw-flex tw-flex-col tw-items-center">
//                 <div className="lg-text-headline tw-text-center">
//                     <DefaultTextAnimation>
//                         <div dangerouslySetInnerHTML={{__html: getVernacularString("categoryBatteriesS3HT1", userPreferences.language)}} />
//                     </DefaultTextAnimation>
//                     <DefaultTextAnimation>
//                         <div dangerouslySetInnerHTML={{__html: getVernacularString("categoryBatteriesS3HT2", userPreferences.language)}} />
//                     </DefaultTextAnimation>
//                 </div>

//                 <VerticalSpacer className="tw-h-6" />

//                 <DefaultTextAnimation>
//                     <div className="lg-text-title2 tw-text-center">{getVernacularString("categoryBatteriesS4Heading", userPreferences.language)}</div>
//                 </DefaultTextAnimation>

//                 <div className="tw-grid tw-grid-cols-[minmax(0,1fr),minmax(0,1fr)] tw-gap-4">
//                     <DefaultElementAnimation>
//                         {/* <div
//                             className={concatenateNonNullStringsWithSpaces(
//                                 "tw-col-start-1 tw-flex tw-flex-row tw-items-center tw-rounded-lg hover:tw-cursor-pointer tw-p-2 tw-gap-2",
//                                 `${selectedBatteryType == BatteryType.flat ? "lg-bg-primary-500 lg-text-secondary-900" : "lg-bg-secondary-700 lg-text-secondary-100"} `,
//                             )}
//                             onClick={() => setSelectedBatteryType(BatteryType.flat)}
//                         >
//                             <div className="tw-h-6 tw-w-6">
//                                 <FullWidthImage
//                                     relativePath="/livguard/icons/flatPlate.png"
//                                     imageCdnProvider={ImageCdnProvider.Imgix}
//                                 />
//                             </div>
//                             <div className={concatenateNonNullStringsWithSpaces("tw-text-body", `${selectedBatteryType == BatteryType.flat ? "lg-text-secondary-900" : "lg-text-secondary-100"}`)}>
//                                 {getVernacularString("categoryBatteriesS4BTFlat", userPreferences.language)}
//                             </div>
//                         </div> */}
//                     </DefaultElementAnimation>

//                     <DefaultElementAnimation>
//                         {/* <div
//                             className={concatenateNonNullStringsWithSpaces(
//                                 "tw-col-start-2 tw-flex tw-flex-row tw-items-center tw-rounded-lg hover:tw-cursor-pointer tw-p-2 tw-gap-2",
//                                 `${selectedBatteryType == BatteryType.tubular ? "lg-bg-primary-500 lg-text-secondary-900" : "lg-bg-secondary-700 lg-text-secondary-100"} `,
//                             )}
//                             onClick={() => setSelectedBatteryType(BatteryType.tubular)}
//                         >
//                             <div className="tw-h-6 tw-w-6 tw-overflow-hidden">
//                                 <FullWidthImage
//                                     relativePath="/livguard/icons/tallTubular.png"
//                                     imageCdnProvider={ImageCdnProvider.Imgix}
//                                 />
//                             </div>
//                             <div className={concatenateNonNullStringsWithSpaces("tw-text-body", `${selectedBatteryType == BatteryType.tubular ? "lg-text-secondary-900" : "lg-text-secondary-100"}`)}>
//                                 {getVernacularString("categoryBatteriesS4BTTubular", userPreferences.language)}
//                             </div>
//                         </div> */}
//                     </DefaultElementAnimation>
//                 </div>

//                 <VerticalSpacer className="tw-h-4" />

//                 {/* <OurSuggestionsComponent
//                     vernacularContent={selectedBatteryType == BatteryType.flat ? sectionData[0] : sectionData[1]}
//                     backgroundColor={selectedBatteryType == BatteryType.flat ? "primary-500" : "secondary-100"}
//                 /> */}

//                 <VerticalSpacer className="tw-h-10" />

//                 <DefaultElementAnimation>
//                     <div className="lg-cta-button ">{getVernacularString("categoryBatteriesS4BT", userPreferences.language)}</div>
//                 </DefaultElementAnimation>
//             </div>
//         </div>
//     );
// }

export function OurBatteriesSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-flex tw-flex-col lg:tw-items-center lg:tw-justify-center", className)}>
            <div className="lg-text-screen-edge lg-text-headline tw-text-center">
                <div dangerouslySetInnerHTML={{__html: getVernacularString("categoryBatteriesS3T1", userPreferences.language)}} />
                <div dangerouslySetInnerHTML={{__html: getVernacularString("categoryBatteriesS3T2", userPreferences.language)}} />
            </div>

            <VerticalSpacer className="tw-h-6" />

            <OurBatteriesSectionInternal
                userPreferences={userPreferences}
            />
        </div>
    );
}

export function OurBatteriesSectionInternal({userPreferences}: {userPreferences: UserPreferences;}) {
    return (
        <div
            className="lg-px-screen-edge tw-grid tw-grid-rows-[repeat(7,auto)] tw-grid-cols-[4.5rem_minmax(0,1fr)_minmax(0,1fr)] lg:tw-grid-cols-[4.5rem_22rem_22rem] tw-gap-x-2"
        >
            {/* <div className="tw-row-start-1 tw-col-start-1 tw-row-span-full tw-w-full tw-h-full tw-bg-gradient-to-l tw-from-[#F25F60] tw-to-[#EB2A2B] tw-rounded-lg" /> */}

            <div className="tw-row-start-1 tw-col-start-2 tw-row-span-full tw-w-full tw-h-full lg-bg-secondary-100 tw-rounded-lg" />

            <div className="tw-row-start-1 tw-col-start-3 tw-row-span-full tw-w-full tw-h-full lg-bg-secondary-300 tw-rounded-lg" />

            <div className="tw-row-start-1 tw-col-start-2 tw-px-5">
                <div className="tw-flex lg:tw-hidden tw-justify-center tw-items-center">
                    <FullWidthImage
                        relativePath="/livguard/category/batteries/4/1.png"
                        imageCdnProvider={ImageCdnProvider.Imgix}
                    />
                </div>
                <div className="tw-hidden lg:tw-flex tw-justify-center tw-items-center">
                    <FixedWidthImage
                        relativePath="/livguard/category/batteries/4/1.png"
                        imageCdnProvider={ImageCdnProvider.Imgix}
                        width="10rem"
                    />
                </div>
            </div>

            <div className="tw-row-start-1 tw-col-start-3 tw-px-5">
                <div className="tw-flex lg:tw-hidden tw-justify-center tw-items-center">
                    <FullWidthImage
                        relativePath="/livguard/category/batteries/4/2.png"
                        imageCdnProvider={ImageCdnProvider.Imgix}
                    />
                </div>
                <div className="tw-hidden lg:tw-flex tw-justify-center tw-items-center">
                    <FixedWidthImage
                        relativePath="/livguard/category/batteries/4/2.png"
                        imageCdnProvider={ImageCdnProvider.Imgix}
                        width="10rem"
                    />
                </div>
            </div>

            <div className="tw-row-start-2 tw-col-start-2 tw-px-4 lg-text-title2 tw-pb-3 tw-text-center">{getVernacularString("categoryBatteriesS3R1C2", userPreferences.language)}</div>

            <div className="tw-row-start-2 tw-col-start-3 tw-px-4 lg-text-title2 tw-pb-3 tw-text-center">{getVernacularString("categoryBatteriesS3R1C3", userPreferences.language)}</div>

            <div className="tw-row-start-3 tw-col-start-1 tw-mx-2 tw-py-3 lg-text-icon tw-border-solid tw-border-b tw-border-secondary-900-dark tw-border-opacity-50 tw-text-secondary-900">
                {getVernacularString("categoryBatteriesS3R2C1", userPreferences.language)}
            </div>

            <div className="tw-row-start-3 tw-col-start-2 tw-mx-4 tw-py-3 tw-text-center tw-border-solid tw-border-b tw-border-secondary-300-dark tw-border-opacity-50">
                {getVernacularString("categoryBatteriesS3R2C2", userPreferences.language)}
            </div>

            <div className="tw-row-start-3 tw-col-start-3 tw-mx-4 tw-py-3 tw-text-center tw-border-solid tw-border-b tw-border-secondary-100-dark tw-border-opacity-50">
                {getVernacularString("categoryBatteriesS3R2C3", userPreferences.language)}
            </div>

            <div className="tw-row-start-4 tw-col-start-1 tw-mx-2 tw-py-3 lg-text-icon tw-border-solid tw-border-b tw-border-secondary-900-dark tw-border-opacity-50 tw-text-secondary-900">
                {getVernacularString("categoryBatteriesS3R3C1", userPreferences.language)}
            </div>

            <div className="tw-row-start-4 tw-col-start-2 tw-mx-4 tw-py-3 tw-text-center tw-border-solid tw-border-b tw-border-secondary-300-dark tw-border-opacity-50">
                {getVernacularString("categoryBatteriesS3R3C2", userPreferences.language)}
            </div>

            <div className="tw-row-start-4 tw-col-start-3 tw-mx-4 tw-py-3 tw-text-center tw-border-solid tw-border-b tw-border-secondary-100-dark tw-border-opacity-50">
                {getVernacularString("categoryBatteriesS3R3C3", userPreferences.language)}
            </div>

            <div className="tw-row-start-5 tw-col-start-1 tw-mx-2 tw-py-3 lg-text-icon tw-border-solid tw-border-b tw-border-secondary-900-dark tw-border-opacity-50 tw-text-secondary-900">
                {getVernacularString("categoryBatteriesS3R4C1", userPreferences.language)}
            </div>

            <div className="tw-row-start-5 tw-col-start-2 tw-mx-4 tw-py-3 tw-text-center tw-border-solid tw-border-b tw-border-secondary-300-dark tw-border-opacity-50">
                {getVernacularString("categoryBatteriesS3R4C2", userPreferences.language)}
            </div>

            <div className="tw-row-start-5 tw-col-start-3 tw-mx-4 tw-py-3 tw-text-center tw-border-solid tw-border-b tw-border-secondary-100-dark tw-border-opacity-50">
                {getVernacularString("categoryBatteriesS3R4C3", userPreferences.language)}
            </div>

            <div className="tw-row-start-6 tw-col-start-1 tw-mx-2 tw-py-3 lg-text-icon tw-border-solid tw-border-b tw-border-secondary-900-dark tw-border-opacity-50 tw-text-secondary-900">
                {getVernacularString("categoryBatteriesS3R5C1", userPreferences.language)}
            </div>

            <div className="tw-row-start-6 tw-col-start-2 tw-mx-4 tw-py-3 tw-text-center tw-border-solid tw-border-b tw-border-secondary-300-dark tw-border-opacity-50">
                {getVernacularString("categoryBatteriesS3R5C2", userPreferences.language)}
            </div>

            <div className="tw-row-start-6 tw-col-start-3 tw-mx-4 tw-py-3 tw-text-center tw-border-solid tw-border-b tw-border-secondary-100-dark tw-border-opacity-50">
                {getVernacularString("categoryBatteriesS3R5C3", userPreferences.language)}
            </div>

            <div className="tw-row-start-7 tw-col-start-1 tw-mx-2 tw-py-3 lg-text-icon tw-text-secondary-900">{getVernacularString("categoryBatteriesS3R6C1", userPreferences.language)}</div>

            <div className="tw-row-start-7 tw-col-start-2 tw-mx-4 tw-py-3 tw-text-center">{getVernacularString("categoryBatteriesS3R6C2", userPreferences.language)}</div>

            <div className="tw-row-start-7 tw-col-start-3 tw-mx-4 tw-py-3 tw-text-center">{getVernacularString("categoryBatteriesS3R6C3", userPreferences.language)}</div>
        </div>
    );
}

export function OurSuggestionsSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const [selectedBatteryType, setSelectedBatteryType] = useState(BatteryType.flat);

    const sectionData: Array<{
        heading: string;
        description: string;
        specificationHeading: string;
        keySpecifications: Array<{keySpecificationTitle: string; keySpecificationContent: string; keySpecificationIconRelativePath: string}>;
        imageRelativePath: string;
        relatedProductsHeading: string;
        relatedProducts: Array<string>;
    }> = [
        // {
        //     heading: `${getVernacularString("categoryBatteriesS4Slide1Heading", userPreferences.language)}`,
        //     description: `${getVernacularString("categoryBatteriesS4Slide1Description", userPreferences.language)}`,
        //     specificationHeading: `${getVernacularString("categoryBatteriesS4SpecificationHeading", userPreferences.language)}`,
        //     keySpecifications: [
        //         {
        //             keySpecificationTitle: getVernacularString("categoryBatteriesS2Slide1KS1Title", userPreferences.language),
        //             keySpecificationContent: getVernacularString("categoryBatteriesSlide1KS1Description", userPreferences.language),
        //             keySpecificationIconRelativePath: "/livguard/icons/waranty.png",
        //         },
        //         {
        //             keySpecificationTitle: getVernacularString("categoryBatteriesS2Slide1KS2Title", userPreferences.language),
        //             keySpecificationContent: getVernacularString("categoryBatteriesSlide1KS2Description", userPreferences.language),
        //             keySpecificationIconRelativePath: "/livguard/icons/capacity.png",
        //         },
        //         {
        //             keySpecificationTitle: getVernacularString("categoryBatteriesS2Slide1KS3Title", userPreferences.language),
        //             keySpecificationContent: getVernacularString("categoryBatteriesSlide1KS3Description", userPreferences.language),
        //             keySpecificationIconRelativePath: "/livguard/icons/3dGrid.png",
        //         },
        //         {
        //             keySpecificationTitle: getVernacularString("categoryBatteriesS2Slide1KS4Title", userPreferences.language),
        //             keySpecificationContent: getVernacularString("categoryBatteriesSlide1KS4Description", userPreferences.language),
        //             keySpecificationIconRelativePath: "/livguard/icons/dimensions.png",
        //         },
        //     ],
        //     imageRelativePath: "/livguard/battery images/IT 1048ST.png",
        // },
        {
            heading: `${getVernacularString("categoryBatteriesS4Slide2Heading", userPreferences.language)}`,
            description: `${getVernacularString("categoryBatteriesS4Slide2Description", userPreferences.language)}`,
            specificationHeading: `${getVernacularString("categoryBatteriesS4SpecificationHeading", userPreferences.language)}`,
            keySpecifications: [
                {
                    keySpecificationTitle: getVernacularString("categoryBatteriesS2Slide2KS1Title", userPreferences.language),
                    keySpecificationContent: getVernacularString("categoryBatteriesSlide2KS1Description", userPreferences.language),
                    keySpecificationIconRelativePath: "/livguard/icons/waranty.png",
                },
                {
                    keySpecificationTitle: getVernacularString("categoryBatteriesS2Slide2KS2Title", userPreferences.language),
                    keySpecificationContent: getVernacularString("categoryBatteriesSlide2KS2Description", userPreferences.language),
                    keySpecificationIconRelativePath: "/livguard/icons/capacity.png",
                },
                {
                    keySpecificationTitle: getVernacularString("categoryBatteriesS2Slide2KS3Title", userPreferences.language),
                    keySpecificationContent: getVernacularString("categoryBatteriesSlide2KS3Description", userPreferences.language),
                    keySpecificationIconRelativePath: "/livguard/icons/3dGrid.png",
                },
                {
                    keySpecificationTitle: getVernacularString("categoryBatteriesS2Slide2KS4Title", userPreferences.language),
                    keySpecificationContent: getVernacularString("categoryBatteriesSlide2KS4Description", userPreferences.language),
                    keySpecificationIconRelativePath: "/livguard/icons/dimensions.png",
                },
            ],
            imageRelativePath: "/livguard/battery images/IT 1536TT.png",
            relatedProductsHeading: getVernacularString("categoryBatteriesS4RelatedProductsHeading", userPreferences.language),
            relatedProducts: ["IT1554STJ", "IT1550TT", "IT1560STT", "IT1584TT", "IT1639TT"],
        },
    ];

    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge", className)}>
            <div className="tw-flex tw-flex-col tw-items-center">
                <div className="lg-text-headline tw-text-center">
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("categoryBatteriesS4HT1", userPreferences.language)}} />
                    </DefaultTextAnimation>
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("categoryBatteriesS4HT2", userPreferences.language)}} />
                    </DefaultTextAnimation>
                </div>

                <VerticalSpacer className="tw-h-6" />

                {/* <DefaultTextAnimation>
                    <div className="lg-text-title2 tw-text-center">{getVernacularString("categoryBatteriesS4Heading", userPreferences.language)}</div>
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-4" /> */}

                {/* <div className="tw-w-full tw-grid tw-grid-cols-[minmax(0,1fr),minmax(0,1fr)] tw-gap-4">
                    <DefaultElementAnimation>
                        <button
                            type="button"
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-col-start-1 tw-w-full tw-flex tw-flex-row tw-items-center tw-rounded-lg hover:tw-cursor-pointer tw-p-2 tw-gap-2",
                                `${selectedBatteryType == BatteryType.flat ? "lg-bg-primary-500 lg-text-secondary-900" : "lg-bg-secondary-700 lg-text-secondary-100"} `,
                            )}
                            onClick={() => setSelectedBatteryType(BatteryType.flat)}
                        >
                            <div className="tw-h-8 tw-w-8 tw-bg-secondary-900-dark tw-rounded-full tw-p-2">
                                <FullWidthImage
                                    relativePath="/livguard/icons/flat-plate.png"
                                    imageCdnProvider={ImageCdnProvider.Imgix}
                                />
                            </div>
                            <div className={concatenateNonNullStringsWithSpaces("tw-text-body", `${selectedBatteryType == BatteryType.flat ? "tw-text-secondary-900-dark" : "lg-text-secondary-100"}`)}>
                                {getVernacularString("categoryBatteriesS4BTFlat", userPreferences.language)}
                            </div>
                        </button>
                    </DefaultElementAnimation>

                    <DefaultElementAnimation>
                        <button
                            type="button"
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-col-start-2 tw-w-full tw-flex tw-flex-row tw-items-center tw-rounded-lg hover:tw-cursor-pointer tw-p-2 tw-gap-2",
                                `${selectedBatteryType == BatteryType.tubular ? "lg-bg-primary-500 lg-text-secondary-900" : "lg-bg-secondary-700 lg-text-secondary-100"} `,
                            )}
                            onClick={() => setSelectedBatteryType(BatteryType.tubular)}
                        >
                            <div className="tw-h-8 tw-w-8 tw-bg-secondary-900-dark tw-rounded-full tw-p-2">
                                <FullWidthImage
                                    relativePath="/livguard/icons/tall-tubular.png"
                                    imageCdnProvider={ImageCdnProvider.Imgix}
                                />
                            </div>
                            <div className={concatenateNonNullStringsWithSpaces("lg-text-body", `${selectedBatteryType == BatteryType.tubular ? "tw-text-secondary-900-dark" : "lg-text-secondary-100"}`)}>
                                {getVernacularString("categoryBatteriesS4BTTubular", userPreferences.language)}
                            </div>
                        </button>
                    </DefaultElementAnimation>
                </div> */}

                {/* <VerticalSpacer className="tw-h-4" /> */}

                <OurSuggestionsComponent
                    vernacularContent={selectedBatteryType == BatteryType.flat ? sectionData[0] : sectionData[1]}
                    // className={selectedBatteryType == BatteryType.flat ? "lg-bg-secondary-300" : "lg-bg-secondary-100"}
                    className="lg-bg-secondary-100"
                />
            </div>
        </div>
    );
}

export function SideBySideOverviewSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const productOverview: Array<{
        heading: string;
        image: string;
        features: Array<{title: string; highlighted: boolean}>;
    }> = [
        {
            image: "",
            heading: `${getVernacularString("categoryBatteriesS5Slide1Heading", userPreferences.language)}`,
            features: [
                {
                    title: `${getVernacularString("categoryBatteriesS5F1Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBatteriesS5F2Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBatteriesS5F3Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBatteriesS5F4Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBatteriesS5F5Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBatteriesS5F6Title", userPreferences.language)}`,
                    highlighted: true,
                },
            ],
        },
        {
            image: "",
            heading: `${getVernacularString("categoryBatteriesS5Slide2Heading", userPreferences.language)}`,
            features: [
                {
                    title: `${getVernacularString("categoryBatteriesS5F1Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBatteriesS5F2Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBatteriesS5F3Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBatteriesS5F4Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBatteriesS5F5Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBatteriesS5F6Title", userPreferences.language)}`,
                    highlighted: true,
                },
            ],
        },
        {
            image: "",
            heading: `${getVernacularString("categoryBatteriesS5Slide3Heading", userPreferences.language)}`,
            features: [
                {
                    title: `${getVernacularString("categoryBatteriesS5F1Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBatteriesS5F2Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBatteriesS5F3Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBatteriesS5F4Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBatteriesS5F5Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBatteriesS5F6Title", userPreferences.language)}`,
                    highlighted: true,
                },
            ],
        },
    ];

    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge", className)}>
            <div className="tw-flex tw-flex-col">
                <div className="lg-text-headline tw-text-center">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("categoryBatteriesS5HT1", userPreferences.language)}} />
                </div>

                <VerticalSpacer className="tw-h-6" />

                <div className="tw-flex tw-flex-row tw-gap-3 tw-overflow-auto tw-w-full">
                    <ItemBuilder
                        items={productOverview}
                        itemBuilder={(productOverview, productIndex) => (
                            <ProductOverviewComponent
                                vernacularContent={productOverview}
                                className="tw-min-w-[40%]"
                                key={productIndex}
                            />
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

export function SuggestedJodiSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const jodisData: Array<{
        title: string;
        imageRelativePath: string;
        buttonText: string;
        bestseller: boolean;
        link: string;
    }> = [
        {
            title: `${getVernacularString("categoryBatteriesS6Jodi1Title", userPreferences.language)}`,
            imageRelativePath: "/livguard/category/jodi/urban_jodi.png",
            buttonText: "categoryViewProductButtontext",
            bestseller: false,
            link: `/product/urban-jodi`,
        },
        {
            title: `${getVernacularString("categoryBatteriesS6Jodi2Title", userPreferences.language)}`,
            imageRelativePath: "/livguard/category/jodi/rural_jodi.png",
            buttonText: "categoryViewProductButtontext",
            bestseller: true,
            link: `/product/peace-of-mind-jodi`,
        },
        {
            title: `${getVernacularString("categoryBatteriesS6Jodi3Title", userPreferences.language)}`,
            imageRelativePath: "/livguard/category/jodi/super_life_jodi.png",
            buttonText: "categoryViewProductButtontext",
            bestseller: true,
            link: `/product/super-life-jodi`,
        },
        {
            title: `${getVernacularString("categoryBatteriesS6Jodi4Title", userPreferences.language)}`,
            imageRelativePath: "/livguard/category/jodi/hi_power_jodi.png",
            buttonText: "categoryViewProductButtontext",
            bestseller: false,
            link: `/product/hi-power-jodi`,
        },
    ];

    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge tw-flex tw-flex-col", className)}>
            <div className="tw-flex tw-flex-col">
                <div className="lg-text-headline tw-text-center">
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("categoryBatteriesS6HT1", userPreferences.language)}} />
                    </DefaultTextAnimation>
                </div>
            </div>

            <VerticalSpacer className="tw-h-10" />

            <div className="tw-grid tw-grid-cols-[minmax(0,1fr),minmax(0,1fr)] tw-grid-rows-[minmax(0,1fr),minmax(0,1fr)] lg:tw-grid-rows-1 lg:tw-grid-cols-4 tw-gap-x-2 lg:tw-gap-x-4 tw-gap-y-10">
                <ItemBuilder
                    items={jodisData}
                    itemBuilder={(jodi, jodiIndex) => (
                        <div
                            className={`lg-bg-secondary-100 tw-rounded-lg`}
                            key={jodiIndex}
                        >
                            <ProductCardComponent
                                vernacularContent={jodi}
                                key={jodiIndex}
                                userPreferences={userPreferences}
                            />
                        </div>
                    )}
                />
            </div>

            <VerticalSpacer className="tw-h-4" />
        </div>
    );
}

export function ChooseBestInverterBattery({userPreferences, utmParameters, className}: {userPreferences: UserPreferences; utmParameters: {[searchParameter: string]: string}; className?: string}) {
    const sectionData: {
        description: string;
        downloadButtons: Array<{iconRelativePath: string; text: string; downloadLink: string; popup: boolean}>;
        buttonText: string;
    } = {
        description: `${getVernacularString("categoryBatteriesS8Description", userPreferences.language)}`,
        downloadButtons: [
            {
                iconRelativePath: "/livguard/icons/buyingGuide.png",
                text: `${getVernacularString("categoryBatteriesS8B1T", userPreferences.language)}`,
                downloadLink: "https://files.growthjockey.com/livguard/files/livguard-buying-guide.pdf",
                popup: false,
            },
            {
                iconRelativePath: "/livguard/icons/downloadCatalogue.png",
                text: `${getVernacularString("categoryBatteriesS8B2T", userPreferences.language)}`,
                downloadLink: "https://files.growthjockey.com/livguard/files/livguard-ib-leaflet.pdf",
                popup: true,
            },
        ],
        buttonText: `${getVernacularString("categoryBatteriesS8BT", userPreferences.language)}`,
    };

    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge", className)}>
            <div className="tw-flex tw-flex-col">
                <div className="lg-text-headline tw-text-center">
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("categoryBatteriesS8HT1", userPreferences.language)}} />
                    </DefaultTextAnimation>
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("categoryBatteriesS8HT2", userPreferences.language)}} />
                    </DefaultTextAnimation>
                </div>

                <VerticalSpacer className="tw-h-6" />

                <WhatsBestForYouComponent
                    vernacularContent={sectionData}
                    userPreferences={userPreferences}
                    utmParameters={utmParameters}
                />
            </div>
        </div>
    );
}

export function FaqSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const faqs = [
        {
            question: "categoryBatteryPageFAQQ1Q",
            answer: "categoryBatteryPageFAQQ1A",
        },
        {
            question: "categoryBatteryPageFAQQ2Q",
            answer: "categoryBatteryPageFAQQ2A",
        },
        {
            question: "categoryBatteryPageFAQQ3Q",
            answer: "categoryBatteryPageFAQQ3A",
        },
        {
            question: "categoryBatteryPageFAQQ4Q",
            answer: "categoryBatteryPageFAQQ4A",
        },
        {
            question: "categoryBatteryPageFAQQ5Q",
            answer: "categoryBatteryPageFAQQ5A",
        },
    ];

    return (
        <FAQSection
            faqs={faqs}
            userPreferences={userPreferences}
            className={className}
        />
    );
}
