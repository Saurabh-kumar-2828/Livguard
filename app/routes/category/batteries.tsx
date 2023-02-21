import {ChevronDoubleDownIcon} from "@heroicons/react/20/solid";
import {LoaderFunction} from "@remix-run/node";
import {useState} from "react";
import {useLoaderData} from "react-router";
import {PageScaffold} from "~/components/pageScaffold";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {getUserPreferencesFromCookies} from "~/server/userPreferencesCookieHelper.server";
import {BatteryType, UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";
import {DealerLocator, FaqSection, ShowerSomeLoveOnSocialHandles} from "~/routes";
import {getRedirectToUrlFromRequest} from "~/utilities";
import {OurSegestionsComponent, ProductCardComponent, ProductOverviewComponent, WhatsBestForYouComponent} from "~/components/category/common";
import {ImageCdnProvider} from "~/global-common-typescript/components/growthJockeyImage";
import {CoverImage} from "~/global-common-typescript/components/coverImage";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {CategoryCarousel1} from "~/components/categoryCarousel1";
import {FullWidthImage} from "~/global-common-typescript/components/fullWidthImage";

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

    console.log("url in page", redirectTo);

    return (
        <>
            <PageScaffold
                userPreferences={userPreferences}
                redirectTo={redirectTo}
                showMobileMenuIcon={true}
            >
                <CategoryPage userPreferences={userPreferences} />
            </PageScaffold>
            <StickyBottomBar userPreferences={userPreferences} />
        </>
    );
}

function CategoryPage({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <>
            <HeroSection userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <BatteriesAreMentToLast userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <OurSuggestionsSection userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <SideBySideOverviewSection userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <SuggestedJodiSection userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <DealerLocator
                userPreferences={userPreferences}
                showCtaButton={true}
            />

            <VerticalSpacer className="tw-h-10" />

            <ChooseBestInverterBattery userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <FaqSection userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-10" />

            <ShowerSomeLoveOnSocialHandles
                userPreferences={userPreferences}
                heading={{text1: "dealerLocatorSocialHT1", text2: "dealerLocatorSocialHT2"}}
            />

            <VerticalSpacer className="tw-h-10" />
        </>
    );
}

function HeroSection({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height)-7.5rem-4.75rem)] tw-grid tw-grid-rows-[1.5rem_3rem_minmax(0,1fr)_auto_0.5rem_auto_1rem_auto_1rem_minmax(0,1fr)_auto_1.5rem] tw-justify-items-center tw-text-center">
            <CoverImage
                relativePath="/livguard/category/batteries/hero_image_battery.jpg"
                className="tw-row-[1/span_12] tw-col-start-1"
                imageCdnProvider={ImageCdnProvider.GrowthJockey}
            />

            <DefaultTextAnimation className="tw-row-start-4 tw-col-start-1">
                <div className="lg-text-banner lg-px-screen-edge">{getVernacularString("categoryBattriesS1T1", userPreferences.language)}</div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-6 tw-col-start-1">
                <div className="lg-text-title1 lg-px-screen-edge">{getVernacularString("categoryBattriesS1T2", userPreferences.language)}</div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-[8] tw-col-start-1">
                <div className="lg-text-body lg-px-screen-edge">{getVernacularString("categoryBattriesS1T3", userPreferences.language)}</div>
            </DefaultTextAnimation>

            <ChevronDoubleDownIcon className="tw-row-[11] tw-col-start-1 tw-w-12 tw-h-12 lg-text-primary-500 tw-animate-bounce" />
        </div>
    );
}

export function BatteriesAreMentToLast({userPreferences}: {userPreferences: UserPreferences}) {
    const sectionData: Array<{titleTextContentPiece: string; bodyTextContentPiece: string; imageRelativePath: string}> = [
        {
            titleTextContentPiece: "categoryBattriesS2Slide1Heading",
            bodyTextContentPiece: "categoryBattriesS2Slide1Description",
            imageRelativePath: "/livguard/category/batteries/battery _futuristic_design.jpg",
        },
        {
            titleTextContentPiece: "categoryBattriesS2Slide2Heading",
            bodyTextContentPiece: "categoryBattriesS2Slide2Description",
            imageRelativePath: "/livguard/category/batteries/battery _supertuff_3d_grid.jpg",
        },
        {
            titleTextContentPiece: "categoryBattriesS2Slide3Heading",
            bodyTextContentPiece: "categoryBattriesS2Slide3Description",
            imageRelativePath: "/livguard/category/batteries/battery _warranty _low maintenance_aspect.jpg",
        },
        {
            titleTextContentPiece: "categoryBattriesS2Slide4Heading",
            bodyTextContentPiece: "categoryBattriesS2Slide4Description",
            imageRelativePath: "/livguard/category/batteries/battery _non_woven_gauntlet.jpg",
        },
    ];

    return (
        <div className="tw-flex tw-flex-col">
            <div className="lg-text-headline tw-text-center">
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("categoryBattriesS2HT1", userPreferences.language)}} />
                </DefaultTextAnimation>
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("categoryBattriesS2HT2", userPreferences.language)}} />
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

function ChooseYourBattery({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="lg-px-screen-edge">
            <div className="tw-flex tw-flex-col tw-items-center">
                <div className="lg-text-headline tw-text-center">
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("categoryBattriesS3HT1", userPreferences.language)}} />
                    </DefaultTextAnimation>
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("categoryBattriesS3HT2", userPreferences.language)}} />
                    </DefaultTextAnimation>
                </div>

                <VerticalSpacer className="tw-h-6" />

                <DefaultTextAnimation>
                    <div className="lg-text-title2 tw-text-center">{getVernacularString("categoryBattriesS4Heading", userPreferences.language)}</div>
                </DefaultTextAnimation>

                <div className="tw-grid tw-grid-cols-[minmax(0,1fr),minmax(0,1fr)] tw-gap-4">
                    <DefaultElementAnimation>
                        {/* <div
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-col-start-1 tw-flex tw-flex-row tw-items-center tw-rounded-lg hover:tw-cursor-pointer tw-p-2 tw-gap-2",
                                `${secledtedBatteryType == BatteryType.flat ? "lg-bg-primary-500 lg-text-secondary-900" : "lg-bg-secondary-700 lg-text-secondary-100"} `,
                            )}
                            onClick={() => setsecledtedBatteryType(BatteryType.flat)}
                        >
                            <div className="tw-h-6 tw-w-6">
                                <FullWidthImage
                                    relativePath="/livguard/icons/flatPlate.png"
                                    imageCdnProvider={ImageCdnProvider.GrowthJockey}
                                />
                            </div>
                            <div className={concatenateNonNullStringsWithSpaces("tw-text-body", `${secledtedBatteryType == BatteryType.flat ? "lg-text-secondary-900" : "lg-text-secondary-100"}`)}>
                                {getVernacularString("categoryBattriesS4BTFlat", userPreferences.language)}
                            </div>
                        </div> */}
                    </DefaultElementAnimation>

                    <DefaultElementAnimation>
                        {/* <div
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-col-start-2 tw-flex tw-flex-row tw-items-center tw-rounded-lg hover:tw-cursor-pointer tw-p-2 tw-gap-2",
                                `${secledtedBatteryType == BatteryType.tubular ? "lg-bg-primary-500 lg-text-secondary-900" : "lg-bg-secondary-700 lg-text-secondary-100"} `,
                            )}
                            onClick={() => setsecledtedBatteryType(BatteryType.tubular)}
                        >
                            <div className="tw-h-6 tw-w-6 tw-overflow-hidden">
                                <FullWidthImage
                                    relativePath="/livguard/icons/tallTubular.png"
                                    imageCdnProvider={ImageCdnProvider.GrowthJockey}
                                />
                            </div>
                            <div className={concatenateNonNullStringsWithSpaces("tw-text-body", `${secledtedBatteryType == BatteryType.tubular ? "lg-text-secondary-900" : "lg-text-secondary-100"}`)}>
                                {getVernacularString("categoryBattriesS4BTTubular", userPreferences.language)}
                            </div>
                        </div> */}
                    </DefaultElementAnimation>
                </div>

                <VerticalSpacer className="tw-h-4" />

                {/* <OurSegestionsComponent
                    vernacularContent={secledtedBatteryType == BatteryType.flat ? sectionData[0] : sectionData[1]}
                    backgroundColor={secledtedBatteryType == BatteryType.flat ? "primary-500" : "secondary-100"}
                /> */}

                <VerticalSpacer className="tw-h-10" />

                <DefaultElementAnimation>
                    <div className="lg-cta-button ">{getVernacularString("categoryBattriesS4BT", userPreferences.language)}</div>
                </DefaultElementAnimation>
            </div>
        </div>
    );
}

export function OurSuggestionsSection({userPreferences}: {userPreferences: UserPreferences}) {
    const [secledtedBatteryType, setsecledtedBatteryType] = useState(BatteryType.flat);

    const sectionData: Array<{
        heading: string;
        description: string;
        specificationHeading: string;
        keySpecifications: Array<{keySpecificationTitle: string; keySpecificationContent: string; keySpecificationIconRelativePath: string}>;
        imageRelativePath: string;
    }> = [
        {
            heading: `${getVernacularString("categoryBattriesS4Slide1Heading", userPreferences.language)}`,
            description: `${getVernacularString("categoryBattriesS4Slide1Description", userPreferences.language)}`,
            specificationHeading: `${getVernacularString("categoryBattriesS4SpecificationHeading", userPreferences.language)}`,
            keySpecifications: [
                {
                    keySpecificationTitle: getVernacularString("categoryBattriesS2Slide1KS1Title", userPreferences.language),
                    keySpecificationContent: getVernacularString("categoryBattriesSlide1KS1Description", userPreferences.language),
                    keySpecificationIconRelativePath: "/livguard/icons/waranty.png",
                },
                {
                    keySpecificationTitle: getVernacularString("categoryBattriesS2Slide1KS2Title", userPreferences.language),
                    keySpecificationContent: getVernacularString("categoryBattriesSlide1KS2Description", userPreferences.language),
                    keySpecificationIconRelativePath: "/livguard/icons/capacity.png",
                },
                {
                    keySpecificationTitle: getVernacularString("categoryBattriesS2Slide1KS3Title", userPreferences.language),
                    keySpecificationContent: getVernacularString("categoryBattriesSlide1KS3Description", userPreferences.language),
                    keySpecificationIconRelativePath: "/livguard/icons/3dGrid.png",
                },
                {
                    keySpecificationTitle: getVernacularString("categoryBattriesS2Slide1KS4Title", userPreferences.language),
                    keySpecificationContent: getVernacularString("categoryBattriesSlide1KS4Description", userPreferences.language),
                    keySpecificationIconRelativePath: "/livguard/icons/dimensions.png",
                },
            ],
            imageRelativePath: "/livguard/battery images/IT 1048ST.png",
        },
        {
            heading: `${getVernacularString("categoryBattriesS4Slide2Heading", userPreferences.language)}`,
            description: `${getVernacularString("categoryBattriesS4Slid21Description", userPreferences.language)}`,
            specificationHeading: `${getVernacularString("categoryBattriesS4SpecificationHeading", userPreferences.language)}`,
            keySpecifications: [
                {
                    keySpecificationTitle: getVernacularString("categoryBattriesS2Slide2KS1Title", userPreferences.language),
                    keySpecificationContent: getVernacularString("categoryBattriesSlide2KS1Description", userPreferences.language),
                    keySpecificationIconRelativePath: "/livguard/icons/waranty.png",
                },
                {
                    keySpecificationTitle: getVernacularString("categoryBattriesS2Slide2KS2Title", userPreferences.language),
                    keySpecificationContent: getVernacularString("categoryBattriesSlide2KS2Description", userPreferences.language),
                    keySpecificationIconRelativePath: "/livguard/icons/capacity.png",
                },
                {
                    keySpecificationTitle: getVernacularString("categoryBattriesS2Slide2KS3Title", userPreferences.language),
                    keySpecificationContent: getVernacularString("categoryBattriesSlide2KS3Description", userPreferences.language),
                    keySpecificationIconRelativePath: "/livguard/icons/3dGrid.png",
                },
                {
                    keySpecificationTitle: getVernacularString("categoryBattriesS2Slide2KS4Title", userPreferences.language),
                    keySpecificationContent: getVernacularString("categoryBattriesSlide2KS4Description", userPreferences.language),
                    keySpecificationIconRelativePath: "/livguard/icons/dimensions.png",
                },
            ],
            imageRelativePath: "/livguard/battery images/IT 1536TT.png",
        },
    ];

    return (
        <div className="lg-px-screen-edge">
            <div className="tw-flex tw-flex-col tw-items-center">
                <div className="lg-text-headline tw-text-center">
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("categoryBattriesS4HT1", userPreferences.language)}} />
                    </DefaultTextAnimation>
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("categoryBattriesS4HT2", userPreferences.language)}} />
                    </DefaultTextAnimation>
                </div>

                <VerticalSpacer className="tw-h-6" />

                <DefaultTextAnimation>
                    <div className="lg-text-title2 tw-text-center">{getVernacularString("categoryBattriesS4Heading", userPreferences.language)}</div>
                </DefaultTextAnimation>

                <div className="tw-grid tw-grid-cols-[minmax(0,1fr),minmax(0,1fr)] tw-gap-4">
                    <DefaultElementAnimation>
                        <div
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-col-start-1 tw-flex tw-flex-row tw-items-center tw-rounded-lg hover:tw-cursor-pointer tw-p-2 tw-gap-2",
                                `${secledtedBatteryType == BatteryType.flat ? "lg-bg-primary-500 lg-text-secondary-900" : "lg-bg-secondary-700 lg-text-secondary-100"} `,
                            )}
                            onClick={() => setsecledtedBatteryType(BatteryType.flat)}
                        >
                            <div className="tw-h-6 tw-w-6">
                                <FullWidthImage
                                    relativePath="/livguard/icons/flatPlate.png"
                                    imageCdnProvider={ImageCdnProvider.GrowthJockey}
                                />
                            </div>
                            <div className={concatenateNonNullStringsWithSpaces("tw-text-body", `${secledtedBatteryType == BatteryType.flat ? "lg-text-secondary-900" : "lg-text-secondary-100"}`)}>
                                {getVernacularString("categoryBattriesS4BTFlat", userPreferences.language)}
                            </div>
                        </div>
                    </DefaultElementAnimation>

                    <DefaultElementAnimation>
                        <div
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-col-start-2 tw-flex tw-flex-row tw-items-center tw-rounded-lg hover:tw-cursor-pointer tw-p-2 tw-gap-2",
                                `${secledtedBatteryType == BatteryType.tubular ? "lg-bg-primary-500 lg-text-secondary-900" : "lg-bg-secondary-700 lg-text-secondary-100"} `,
                            )}
                            onClick={() => setsecledtedBatteryType(BatteryType.tubular)}
                        >
                            <div className="tw-h-6 tw-w-6 tw-overflow-hidden">
                                <FullWidthImage
                                    relativePath="/livguard/icons/tallTubular.png"
                                    imageCdnProvider={ImageCdnProvider.GrowthJockey}
                                />
                            </div>
                            <div className={concatenateNonNullStringsWithSpaces("tw-text-body", `${secledtedBatteryType == BatteryType.tubular ? "lg-text-secondary-900" : "lg-text-secondary-100"}`)}>
                                {getVernacularString("categoryBattriesS4BTTubular", userPreferences.language)}
                            </div>
                        </div>
                    </DefaultElementAnimation>
                </div>

                <VerticalSpacer className="tw-h-4" />

                <OurSegestionsComponent
                    vernacularContent={secledtedBatteryType == BatteryType.flat ? sectionData[0] : sectionData[1]}
                    backgroundColor={secledtedBatteryType == BatteryType.flat ? "primary-500" : "secondary-100"}
                />

                <VerticalSpacer className="tw-h-10" />

                <DefaultElementAnimation>
                    <div className="lg-cta-button ">{getVernacularString("categoryBattriesS4BT", userPreferences.language)}</div>
                </DefaultElementAnimation>
            </div>
        </div>
    );
}

export function SideBySideOverviewSection({userPreferences}: {userPreferences: UserPreferences}) {
    const productOverview: Array<{
        heading: string;
        image: string;
        features: Array<{title: string; highlighted: boolean}>;
    }> = [
        {
            image: "",
            heading: `${getVernacularString("categoryBattriesS5Slide1Heading", userPreferences.language)}`,
            features: [
                {
                    title: `${getVernacularString("categoryBattriesS5F1Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBattriesS5F2Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBattriesS5F3Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBattriesS5F4Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBattriesS5F5Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBattriesS5F6Title", userPreferences.language)}`,
                    highlighted: true,
                },
            ],
        },
        {
            image: "",
            heading: `${getVernacularString("categoryBattriesS5Slide2Heading", userPreferences.language)}`,
            features: [
                {
                    title: `${getVernacularString("categoryBattriesS5F1Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBattriesS5F2Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBattriesS5F3Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBattriesS5F4Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBattriesS5F5Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBattriesS5F6Title", userPreferences.language)}`,
                    highlighted: true,
                },
            ],
        },
        {
            image: "",
            heading: `${getVernacularString("categoryBattriesS5Slide3Heading", userPreferences.language)}`,
            features: [
                {
                    title: `${getVernacularString("categoryBattriesS5F1Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBattriesS5F2Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBattriesS5F3Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBattriesS5F4Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBattriesS5F5Title", userPreferences.language)}`,
                    highlighted: true,
                },
                {
                    title: `${getVernacularString("categoryBattriesS5F6Title", userPreferences.language)}`,
                    highlighted: true,
                },
            ],
        },
    ];

    return (
        <div className="lg-px-screen-edge">
            <div className="tw-flex tw-flex-col">
                <div className="lg-text-headline tw-text-center">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("categoryBattriesS5HT1", userPreferences.language)}} />
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

export function SuggestedJodiSection({userPreferences}: {userPreferences: UserPreferences}) {
    const jodisData: Array<{
        title: string;
        imageRelativePath: string;
        buttonText: string;
        bestseller: boolean;
    }> = [
        {
            title: `${getVernacularString("categoryBattriesS6Jodi1Title", userPreferences.language)}`,
            imageRelativePath: "/livguard/category/jodi/urban_jodi.png",
            buttonText: `${getVernacularString("categoryBattriesS6JodiButtontext", userPreferences.language)}`,
            bestseller: false,
        },
        {
            title: `${getVernacularString("categoryBattriesS6Jodi2Title", userPreferences.language)}`,
            imageRelativePath: "/livguard/category/jodi/rural_jodi.png",
            buttonText: `${getVernacularString("categoryBattriesS6JodiButtontext", userPreferences.language)}`,
            bestseller: true,
        },
        {
            title: `${getVernacularString("categoryBattriesS6Jodi3Title", userPreferences.language)}`,
            imageRelativePath: "/livguard/category/jodi/super_life_jodi.png",
            buttonText: `${getVernacularString("categoryBattriesS6JodiButtontext", userPreferences.language)}`,
            bestseller: true,
        },
        {
            title: `${getVernacularString("categoryBattriesS6Jodi4Title", userPreferences.language)}`,
            imageRelativePath: "/livguard/category/jodi/urban_jodi.png",
            buttonText: `${getVernacularString("categoryBattriesS6JodiButtontext", userPreferences.language)}`,
            bestseller: false,
        },
    ];

    return (
        <div className="lg-px-screen-edge">
            <div className="tw-flex tw-flex-col">
                <div className="lg-text-headline tw-text-center">
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("categoryBattriesS6HT1", userPreferences.language)}} />
                    </DefaultTextAnimation>
                </div>
            </div>

            <VerticalSpacer className="tw-h-10" />

            <div className="tw-grid tw-grid-cols-[minmax(0,1fr),minmax(0,1fr)] tw-grid-rows-[minmax(0,1fr),minmax(0,1fr)] tw-gap-x-3 tw-gap-y-10">
                <ItemBuilder
                    items={jodisData}
                    itemBuilder={(jodi, jodiIndex) => (
                        <ProductCardComponent
                            vernacularContent={jodi}
                            key={jodiIndex}
                        />
                    )}
                />
            </div>

            <VerticalSpacer className="tw-h-6" />

            <DefaultElementAnimation>
                <div className="lg-cta-outline-button">{getVernacularString("categoryBattriesS6Buttontext", userPreferences.language)}</div>
            </DefaultElementAnimation>
        </div>
    );
}

export function ChooseBestInverterBattery({userPreferences}: {userPreferences: UserPreferences}) {
    const sectionData: {
        description: string;
        downloadButtons: Array<{iconRelativePath: string; text: string}>;
        buttonText: string;
    } = {
        description: `${getVernacularString("categoryBattriesS8Description", userPreferences.language)}`,
        downloadButtons: [
            {
                iconRelativePath: "/livguard/icons/buyingGuide.png",
                text: `${getVernacularString("categoryBattriesS8B1T", userPreferences.language)}`,
            },
            {
                iconRelativePath: "/livguard/icons/downloadCatalogue.png",
                text: `${getVernacularString("categoryBattriesS8B2T", userPreferences.language)}`,
            },
        ],
        buttonText: `${getVernacularString("categoryBattriesS8BT", userPreferences.language)}`,
    };

    return (
        <div className="lg-px-screen-edge">
            <div className="tw-flex tw-flex-col">
                <div className="lg-text-headline tw-text-center">
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("categoryBattriesS8HT1", userPreferences.language)}} />
                    </DefaultTextAnimation>
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("categoryBattriesS8HT2", userPreferences.language)}} />
                    </DefaultTextAnimation>
                </div>

                <VerticalSpacer className="tw-h-6" />

                <WhatsBestForYouComponent vernacularContent={sectionData} />
            </div>
        </div>
    );
}

function StickyBottomBar({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="tw-sticky tw-bottom-0 lg-bg-secondary-300 tw-rounded-t-lg tw-grid tw-grid-cols-[2fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr_auto_2fr] tw-py-[0.8125rem]">
            <div className="tw-row-start-1 tw-col-start-2 tw-flex tw-flex-col tw-items-center tw-text-center">
                <div className="tw-w-8 tw-h-8 tw-rounded-full lg-bg-primary-500" />
                <div className="lg-text-icon">Something</div>
            </div>

            <div className="tw-row-start-1 tw-col-start-4 tw-flex tw-flex-col tw-items-center">
                <div className="tw-w-8 tw-h-8 tw-rounded-full lg-bg-primary-500" />
                <div className="lg-text-icon">Something</div>
            </div>

            <div className="tw-row-start-1 tw-col-start-6 tw-flex tw-flex-col tw-items-center">
                {/* <div className="tw-w-16 tw-h-16 tw-rounded-full lg-bg-primary-500" /> */}
                <div className="lg-text-icon">Something</div>
            </div>

            <div className="tw-row-start-1 tw-col-start-8 tw-flex tw-flex-col tw-items-center">
                <div className="tw-w-8 tw-h-8 tw-rounded-full lg-bg-primary-500" />
                <div className="lg-text-icon">Something</div>
            </div>

            <div className="tw-row-start-1 tw-col-start-10 tw-flex tw-flex-col tw-items-center">
                <div className="tw-w-8 tw-h-8 tw-rounded-full lg-bg-primary-500" />
                <div className="lg-text-icon">Something</div>
            </div>
        </div>
    );
}
