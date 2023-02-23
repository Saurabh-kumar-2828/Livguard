import {Dialog, Listbox, Transition} from "@headlessui/react";
import {InformationCircleIcon, ShareIcon} from "@heroicons/react/20/solid";
import {ActionFunction, LoaderFunction, redirect} from "@remix-run/node";
import {Link, useActionData, useSearchParams} from "@remix-run/react";
import React, {useEffect, useReducer, useState} from "react";
import {PlusCircleFill} from "react-bootstrap-icons";
import {useLoaderData} from "react-router";
import {getLoadCalculatorEntry} from "~/backend/loadCalculator";
import {StickyBottomBar} from "~/components/bottomBar";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultImageAnimation} from "~/components/defaultImageAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {PageScaffold} from "~/components/pageScaffold";
import {CoverImage} from "~/global-common-typescript/components/coverImage";
import {EmptyFlexFiller} from "~/global-common-typescript/components/emptyFlexFiller";
import {FixedHeightImage} from "~/global-common-typescript/components/fixedHeightImage";
import {FixedWidthImage} from "~/global-common-typescript/components/fixedWidthImage";
import {FullWidthImage} from "~/global-common-typescript/components/fullWidthImage";
import {ImageCdnProvider} from "~/global-common-typescript/components/growthJockeyImage";
import {HorizontalSpacer} from "~/global-common-typescript/components/horizontalSpacer";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {getIntegerFromUnknown, getNonEmptyStringFromUnknown, getUuidFromUnkown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {concatenateNonNullStringsWithSpaces, createGroupByReducer, distinct, generateUuid, getIntegerArrayOfLength, getSingletonValueOrNull} from "~/global-common-typescript/utilities/utilities";
import {useEmlbaCarouselWithIndex} from "~/hooks/useEmlbaCarouselWithIndex";
import {FaqSection, SolarSolutions} from "~/routes";
import {OurBatteriesSectionInternal} from "~/routes/category/batteries";
import {OurInvertersSectionInternal} from "~/routes/category/inverters";
import {deviceTypeLibrary, LoadCalculatorInputs} from "~/routes/load-calculator";
import {getUserPreferencesFromCookies} from "~/server/userPreferencesCookieHelper.server";
import {UserPreferences} from "~/typeDefinitions";
import {getRedirectToUrlFromRequest} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";

type LoaderData = {
    userPreferences: UserPreferences;
    redirectTo: string;
    loadCalculatorInputs: LoadCalculatorInputs;
};

export const loader: LoaderFunction = async ({request, params}) => {
    const userPreferences = await getUserPreferencesFromCookies(request);
    if (userPreferences instanceof Error) {
        throw userPreferences;
    }

    const loadCalculatorInputsId = safeParse(getUuidFromUnkown, params.loadCalculatorInputsId);
    if (loadCalculatorInputsId == null) {
        throw loadCalculatorInputsId;
    }

    const loadCalculatorInputs = await getLoadCalculatorEntry(loadCalculatorInputsId);
    if (loadCalculatorInputs instanceof Error) {
        throw loadCalculatorInputs;
    }

    const loaderData: LoaderData = {
        userPreferences: userPreferences,
        redirectTo: getRedirectToUrlFromRequest(request),
        loadCalculatorInputs: loadCalculatorInputs,
    };

    return loaderData;
};

export default function () {
    const {userPreferences, redirectTo, loadCalculatorInputs} = useLoaderData() as LoaderData;

    // TODO: Scroll to top if required

    return (
        <>
            <PageScaffold
                userPreferences={userPreferences}
                redirectTo={redirectTo}
                showMobileMenuIcon={true}
            >
                <LoadCalculatorResult
                    userPreferences={userPreferences}
                    loadCalculatorInputs={loadCalculatorInputs}
                />
            </PageScaffold>

            <StickyBottomBar userPreferences={userPreferences} />
        </>
    );
}

function LoadCalculatorResult({userPreferences, loadCalculatorInputs}: {userPreferences: UserPreferences; loadCalculatorInputs: LoadCalculatorInputs}) {
    const loadCalculatorOutputs = getLoadCalculatorOutputs(loadCalculatorInputs);

    return (
        <>
            <TotalLoadSection
                userPreferences={userPreferences}
                loadCalculatorInputs={loadCalculatorInputs}
                loadCalculatorOutputs={loadCalculatorOutputs}
            />

            <VerticalSpacer className="tw-h-10" />

            {loadCalculatorOutputs.recommendedInverters != null || loadCalculatorOutputs.recommendedBatteries != null ? (
                <>
                    <TopChoicesSection
                        userPreferences={userPreferences}
                        loadCalculatorOutputs={loadCalculatorOutputs}
                    />

                    <VerticalSpacer className="tw-h-10" />

                    <OurSuggestionsSection userPreferences={userPreferences} />
                </>
            ) : (
                <>
                    <SolarSolutions userPreferences={userPreferences} />

                    <VerticalSpacer className="tw-h-6" />

                    <DefaultElementAnimation className="lg-px-screen-edge tw-w-full tw-flex tw-flex-col tw-items-center">
                        <div className="lg-cta-outline-button">{getVernacularString("loadCalculatorRecommendationsS4CTA1", userPreferences.language)}</div>
                    </DefaultElementAnimation>
                </>
            )}

            <VerticalSpacer className="tw-h-10" />

            <FaqSection userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-8" />
        </>
    );
}

function TotalLoadSection({
    userPreferences,
    loadCalculatorInputs,
    loadCalculatorOutputs,
}: {
    userPreferences: UserPreferences;
    loadCalculatorInputs: LoadCalculatorInputs;
    loadCalculatorOutputs: LoadCalculatorOutputs;
}) {
    return (
        <div className="tw-flex tw-flex-col">
            <div className="tw-w-full tw-aspect-[2/1] tw-overflow-hidden">
                <CoverImage
                    relativePath="/livguard/load-calculator/1.jpg"
                    imageCdnProvider={ImageCdnProvider.GrowthJockey}
                />
            </div>

            <div className="lg-px-screen-edge">
                <div className="tw-w-full tw-h-full tw-grid tw-bg-gradient-to-r tw-from-[#F25F60] tw-to-[#EB2A2B] tw-rounded-b-lg tw-grid-rows-[3rem_minmax(0,1fr)_1.5rem] tw-grid-cols-1 tw-gap-y-4">
                    <div className="tw-grid tw-grid-rows-[auto_auto] tw-grid-cols-[repeat(3,3rem)] tw-justify-center tw-justify-items-center tw-align-center tw-gap-x-6 tw-gap-y-1.5 tw-relative -tw-top-5 tw-text-center">
                        <div className="tw-row-start-1 tw-col-start-1 tw-bg-secondary-900-dark tw-w-10 tw-h-10 tw-rounded-full tw-flex tw-flex-col tw-justify-center tw-items-center">
                            <object
                                data="https://images.growthjockey.com/livguard/load-calculator/home.svg"
                                className="tw-w-6 tw-h-6"
                            />
                        </div>
                        <div className="lg-text-icon tw-text-secondary-900-dark tw-whitespace-nowrap">
                            {getVernacularString(`propertyType-${loadCalculatorInputs.property.propertyType}`, userPreferences.language)}
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-bg-secondary-900-dark tw-w-10 tw-h-10 tw-rounded-full tw-flex tw-flex-col tw-justify-center tw-items-center">
                            <object
                                data="https://images.growthjockey.com/livguard/load-calculator/utilisation.svg"
                                className="tw-w-6 tw-h-6"
                            />
                        </div>
                        <div className="lg-text-icon tw-text-secondary-900-dark tw-whitespace-nowrap">
                            {loadCalculatorInputs.averageConsumption}% {getVernacularString("loadCalculatorRecommendationsS1T1", userPreferences.language)}
                        </div>

                        <div className="tw-row-start-1 tw-col-start-3 tw-bg-secondary-900-dark tw-w-10 tw-h-10 tw-rounded-full tw-flex tw-flex-col tw-justify-center tw-items-center">
                            <object
                                data="https://images.growthjockey.com/livguard/load-calculator/hours.svg"
                                className="tw-w-6 tw-h-6"
                            />
                        </div>
                        <div className="lg-text-icon tw-text-secondary-900-dark tw-whitespace-nowrap">
                            {loadCalculatorInputs.backupHours} {getVernacularString("loadCalculatorRecommendationsS1T2", userPreferences.language)}
                        </div>
                    </div>

                    <div className="tw-row-start-2 tw-col-start-1 tw-px-8 tw-flex tw-flex-row tw-gap-x-8">
                        <object
                            data="https://images.growthjockey.com/livguard/load-calculator/output.svg"
                            className="tw-w-12 tw-h-12 tw-invert"
                        />
                        <div className="tw-flex tw-flex-col">
                            <div className="lg-text-banner tw-text-secondary-900-dark">
                                {loadCalculatorOutputs.averageWatts}W, {Math.round(loadCalculatorOutputs.ah)}Ah
                            </div>
                            <div className="tw-text-title2 tw-text-secondary-900-dark">{getVernacularString("loadCalculatorRecommendationsS1T4", userPreferences.language)}</div>
                        </div>
                    </div>
                </div>
            </div>

            <VerticalSpacer className="tw-h-6" />

            <div className="tw-px-screen-edge tw-flex tw-flex-row tw-justify-center tw-items-center lg-text-secondary-700">
                <ShareIcon className="tw-w-4 tw-h-4" />
                <HorizontalSpacer className="tw-w-2" />
                Share
            </div>
        </div>
    );
}

function TopChoicesSection({userPreferences, loadCalculatorOutputs}: {userPreferences: UserPreferences; loadCalculatorOutputs: LoadCalculatorOutputs}) {
    return (
        <div className="tw-flex tw-flex-col">
            <div className="lg-px-screen-edge lg-text-headline tw-text-center">
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("loadCalculatorRecommendationsS2H1", userPreferences.language)}} />
                </DefaultTextAnimation>
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("loadCalculatorRecommendationsS2H2", userPreferences.language)}} />
                </DefaultTextAnimation>
            </div>

            {loadCalculatorOutputs.recommendedInverters == null ? null : (
                <>
                    <VerticalSpacer className="tw-h-6" />

                    <div className="lg-px-screen-edge tw-w-full lg-text-title1 tw-text-center">{getVernacularString("loadCalculatorRecommendationsS2T1", userPreferences.language)}</div>

                    <VerticalSpacer className="tw-h-2" />

                    <div className="tw-w-full tw-grid tw-grid-cols-1 tw-grid-rows-1 tw-overflow-x-auto tw-pl-6 tw-pr-[calc(1.5rem-1px)]">
                        <div className="tw-flex tw-flex-row tw-gap-x-4">
                            <ItemBuilder
                                items={loadCalculatorOutputs.recommendedInverters}
                                itemBuilder={(recommendation, recommendationIndex) => (
                                    <Link
                                        to={`/product/${recommendation.model}`}
                                        className="tw-w-40 tw-h-full tw-flex-none tw-flex tw-flex-col tw-items-center"
                                        key={recommendationIndex}
                                    >
                                        <VerticalSpacer className="tw-h-3" />

                                        <div className="tw-w-full lg-bg-secondary-100 tw-rounded-lg tw-flex tw-flex-col tw-items-center tw-text-center">
                                            <div className="lg-cta-button tw-w-fit tw-px-2 tw-py-0 tw-whitespace-nowrap tw-relative -tw-top-3">
                                                {recommendation.score}/10 {getVernacularString("loadCalculatorRecommendationsS2T4", userPreferences.language)}
                                            </div>

                                            <VerticalSpacer className="tw-h-4" />

                                            <div className="lg-text-secondary-900">{recommendation.model}</div>

                                            <VerticalSpacer className="tw-h-4" />

                                            <FullWidthImage
                                                relativePath={`/livguard/inverter images/${recommendation.model}.png`}
                                                imageCdnProvider={ImageCdnProvider.GrowthJockey}
                                            />
                                        </div>

                                        <VerticalSpacer className="tw-h-4" />

                                        <div className="lg-text-secondary-700 tw-underline tw-underline-offset-4">
                                            {getVernacularString("loadCalculatorRecommendationsS2T3", userPreferences.language)}
                                        </div>

                                        <VerticalSpacer className="tw-h-4" />
                                    </Link>
                                )}
                            />
                            <div className="tw-w-px tw-h-full tw-flex-none tw-bg-transparent" />
                        </div>
                    </div>
                </>
            )}

            {loadCalculatorOutputs.recommendedBatteries == null ? null : (
                <>
                    <VerticalSpacer className="tw-h-6" />

                    <div className="lg-px-screen-edge tw-w-full lg-text-title1 tw-text-center">{getVernacularString("loadCalculatorRecommendationsS2T2", userPreferences.language)}</div>

                    <VerticalSpacer className="tw-h-2" />

                    <div className="tw-w-full tw-grid tw-grid-cols-1 tw-grid-rows-1 tw-overflow-x-auto tw-pl-6 tw-pr-[calc(1.5rem-1px)]">
                        <div className="tw-flex tw-flex-row tw-gap-x-4">
                            <ItemBuilder
                                items={loadCalculatorOutputs.recommendedBatteries}
                                itemBuilder={(recommendation, recommendationIndex) => (
                                    <Link
                                        to={`/product/${recommendation.model}`}
                                        className="tw-w-40 tw-h-full tw-flex-none tw-flex tw-flex-col tw-items-center"
                                        key={recommendationIndex}
                                    >
                                        <VerticalSpacer className="tw-h-3" />

                                        <div className="tw-w-full lg-bg-secondary-100 tw-rounded-lg tw-flex tw-flex-col tw-items-center tw-text-center">
                                            <div className="lg-cta-button tw-w-fit tw-px-2 tw-py-0 tw-whitespace-nowrap tw-relative -tw-top-3">
                                                {recommendation.score}/10 {getVernacularString("loadCalculatorRecommendationsS2T4", userPreferences.language)}
                                            </div>

                                            <VerticalSpacer className="tw-h-4" />

                                            <div className="lg-text-secondary-900">{recommendation.model}</div>

                                            <VerticalSpacer className="tw-h-4" />

                                            <FullWidthImage
                                                relativePath={`/livguard/battery images/${recommendation.model}.png`}
                                                imageCdnProvider={ImageCdnProvider.GrowthJockey}
                                            />
                                        </div>

                                        <VerticalSpacer className="tw-h-4" />

                                        <div className="lg-text-secondary-700 tw-underline tw-underline-offset-4">
                                            {getVernacularString("loadCalculatorRecommendationsS2T3", userPreferences.language)}
                                        </div>

                                        <VerticalSpacer className="tw-h-4" />
                                    </Link>
                                )}
                            />
                            <div className="tw-w-px tw-h-full tw-flex-none tw-bg-transparent" />
                        </div>
                    </div>
                </>
            )}

            <VerticalSpacer className="tw-h-6" />

            <DefaultElementAnimation className="lg-px-screen-edge tw-self-center">
                <Link to="/dealer-locator">
                    <div className="lg-cta-button">{getVernacularString("loadCalculatorRecommendationsS2CTA1", userPreferences.language)}</div>
                </Link>
            </DefaultElementAnimation>
        </div>
    );
}

function OurSuggestionsSection({userPreferences}: {userPreferences: UserPreferences}) {
    const {emblaRef, emblaApi, selectedIndex} = useEmlbaCarouselWithIndex({loop: true});

    return (
        <div>
            <div className="lg-px-screen-edge lg-text-headline tw-text-center">
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("loadCalculatorRecommendationsS3H1", userPreferences.language)}} />
                </DefaultTextAnimation>
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("loadCalculatorRecommendationsS3H2", userPreferences.language)}} />
                </DefaultTextAnimation>
            </div>

            <VerticalSpacer className="tw-h-6" />

            <div className="lg-px-screen-edge tw-grid tw-grid-cols-2 tw-items-center">
                <button
                    type="button"
                    className={concatenateNonNullStringsWithSpaces(
                        "tw-w-full tw-py-1 tw-text-center tw-border-solid tw-border-r lg-border-secondary-900",
                        selectedIndex == 0 ? "lg-text-secondary-900 tw-underline tw-underline-offset-4" : null,
                    )}
                    onClick={() => emblaApi?.scrollTo(0)}
                >
                    {getVernacularString("headerMenuS1T1", userPreferences.language)}
                </button>

                <button
                    type="button"
                    className={concatenateNonNullStringsWithSpaces(
                        "tw-w-full tw-py-1 tw-text-center tw-border-solid tw-border-l lg-border-secondary-900",
                        selectedIndex == 1 ? "lg-text-secondary-900 tw-underline tw-underline-offset-4" : null,
                    )}
                    onClick={() => emblaApi?.scrollTo(1)}
                >
                    {getVernacularString("headerMenuS1T2", userPreferences.language)}
                </button>
            </div>

            <div className="lg-px-screen-edge">
                <VerticalSpacer className="tw-h-4 tw-border-solid tw-border-b lg-border-secondary-900" />
            </div>

            <VerticalSpacer className="tw-h-6" />

            <div
                className="tw-overflow-hidden"
                ref={emblaRef}
            >
                <div className="tw-grid tw-grid-flow-col tw-auto-cols-[100%]">
                    <div className="tw-flex tw-flex-col">
                        <OurInvertersSectionInternal userPreferences={userPreferences} />

                        <VerticalSpacer className="tw-h-4" />

                        <DefaultElementAnimation className="lg-px-screen-edge tw-self-center">
                            <Link to="/category/inverters">
                                <div className="lg-cta-button">{getVernacularString("loadCalculatorRecommendationsS2CTA2", userPreferences.language)}</div>
                            </Link>
                        </DefaultElementAnimation>
                    </div>

                    <div className="tw-flex tw-flex-col">
                        <OurBatteriesSectionInternal userPreferences={userPreferences} />

                        <VerticalSpacer className="tw-h-4" />

                        <DefaultElementAnimation className="lg-px-screen-edge tw-self-center">
                            <Link to="/category/inverters">
                                <div className="lg-cta-button">{getVernacularString("loadCalculatorRecommendationsS2CTA3", userPreferences.language)}</div>
                            </Link>
                        </DefaultElementAnimation>
                    </div>
                </div>
            </div>
        </div>
    );
}

type LoadCalculatorOutputs = {
    totalWatts: number;
    averageWatts: number;
    ah: number;
    recommendedInverters: Array<{model: string; score: number}> | null;
    recommendedBatteries: Array<{model: string; score: number}> | null;
};

function getLoadCalculatorOutputs(loadCalculatorInputs: LoadCalculatorInputs): LoadCalculatorOutputs {
    const totalWatts = loadCalculatorInputs.property.rooms
        .flatMap((room) => room.devices)
        .map((device) => deviceTypeLibrary[device.deviceType])
        .reduce((totalWatts_, device) => (totalWatts_ += device.wattage), 0);

    const voltage = 220;
    const efficiencyFactor = 0.7;
    const safetyFactor = 0.8;

    const averageWatts = (totalWatts * loadCalculatorInputs.averageConsumption) / 100;
    const ah = (averageWatts / voltage / efficiencyFactor / safetyFactor) * loadCalculatorInputs.backupHours;

    const loadCalculatorOutputs: LoadCalculatorOutputs = {
        totalWatts: totalWatts,
        averageWatts: averageWatts,
        ah: ah,
        recommendedInverters: null,
        recommendedBatteries: null,
    };

    if (averageWatts < 600 && ah < 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG750i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 9048ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 700 && ah < 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS900i",
                score: 10,
            },
            {
                model: "LG850i",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 9048ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 800 && ah < 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1000i",
                score: 10,
            },
            {
                model: "LG950i",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 9048ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 1100 && ah < 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1450i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 9048ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 1250 && ah < 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1550i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 9048ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 1500 && ah < 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1700",
                score: 10,
            },
            {
                model: "LGS1600",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 9048ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 1650 && ah < 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1950i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 9048ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 2000 && ah < 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS2500",
                score: 10,
            },
            {
                model: "LG2300",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 9048ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 2500 && ah < 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS3000",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 9048ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 3500 && ah < 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS4000",
                score: 10,
            },
            {
                model: "LG3500",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 9048ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 4000 && ah < 90) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 9048ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 600 && ah < 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG750i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1048ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 700 && ah < 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS900i",
                score: 10,
            },
            {
                model: "LG850i",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1048ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 800 && ah < 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1000i",
                score: 10,
            },
            {
                model: "LG950i",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1048ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 1100 && ah < 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1450i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1048ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 1250 && ah < 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1550i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1048ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 1500 && ah < 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1700",
                score: 10,
            },
            {
                model: "LGS1600",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1048ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 1650 && ah < 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1950i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1048ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 2000 && ah < 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS2500",
                score: 10,
            },
            {
                model: "LG2300",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1048ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 2500 && ah < 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS3000",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1048ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 3500 && ah < 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS4000",
                score: 10,
            },
            {
                model: "LG3500",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1048ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 4000 && ah < 100) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1048ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 600 && ah < 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG750i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1160STT",
                score: 10,
            },
        ];
    } else if (averageWatts < 700 && ah < 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS900i",
                score: 10,
            },
            {
                model: "LG850i",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1160STT",
                score: 10,
            },
        ];
    } else if (averageWatts < 800 && ah < 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1000i",
                score: 10,
            },
            {
                model: "LG950i",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1160STT",
                score: 10,
            },
        ];
    } else if (averageWatts < 1100 && ah < 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1450i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1160STT",
                score: 10,
            },
        ];
    } else if (averageWatts < 1250 && ah < 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1550i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1160STT",
                score: 10,
            },
        ];
    } else if (averageWatts < 1500 && ah < 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1700",
                score: 10,
            },
            {
                model: "LGS1600",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1160STT",
                score: 10,
            },
        ];
    } else if (averageWatts < 1650 && ah < 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1950i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1160STT",
                score: 10,
            },
        ];
    } else if (averageWatts < 2000 && ah < 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS2500",
                score: 10,
            },
            {
                model: "LG2300",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1160STT",
                score: 10,
            },
        ];
    } else if (averageWatts < 2500 && ah < 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS3000",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1160STT",
                score: 10,
            },
        ];
    } else if (averageWatts < 3500 && ah < 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS4000",
                score: 10,
            },
            {
                model: "LG3500",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1160STT",
                score: 10,
            },
        ];
    } else if (averageWatts < 4000 && ah < 110) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1160STT",
                score: 10,
            },
        ];
    } else if (averageWatts < 600 && ah < 120) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG750i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 481200ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 700 && ah < 120) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS900i",
                score: 10,
            },
            {
                model: "LG850i",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 481200ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 800 && ah < 120) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1000i",
                score: 10,
            },
            {
                model: "LG950i",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 481200ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 1100 && ah < 120) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1450i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 481200ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 1250 && ah < 120) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1550i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 481200ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 1500 && ah < 120) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1700",
                score: 10,
            },
            {
                model: "LGS1600",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 481200ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 1650 && ah < 120) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1950i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 481200ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 2000 && ah < 120) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS2500",
                score: 10,
            },
            {
                model: "LG2300",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 481200ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 2500 && ah < 120) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS3000",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 481200ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 3500 && ah < 120) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS4000",
                score: 10,
            },
            {
                model: "LG3500",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 481200ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 4000 && ah < 120) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 481200ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 600 && ah < 135) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG750i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 481400ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 700 && ah < 135) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS900i",
                score: 10,
            },
            {
                model: "LG850i",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 481400ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 800 && ah < 135) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1000i",
                score: 10,
            },
            {
                model: "LG950i",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 481400ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 1100 && ah < 135) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1450i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 481400ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 1250 && ah < 135) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1550i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 481400ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 1500 && ah < 135) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1700",
                score: 10,
            },
            {
                model: "LGS1600",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 481400ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 1650 && ah < 135) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1950i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 481400ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 2000 && ah < 135) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS2500",
                score: 10,
            },
            {
                model: "LG2300",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 481400ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 2500 && ah < 135) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS3000",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 481400ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 3500 && ah < 135) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS4000",
                score: 10,
            },
            {
                model: "LG3500",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 481400ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 4000 && ah < 135) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 481400ST",
                score: 10,
            },
        ];
    } else if (averageWatts < 600 && ah < 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG750i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1584TT",
                score: 11,
            },
            {
                model: "IT 1560TT",
                score: 10,
            },
            {
                model: "IT 1560STT",
                score: 9,
            },
            {
                model: "IT 1554TT",
                score: 8,
            },
            {
                model: "IT 1554STJ",
                score: 7,
            },
            {
                model: "IT 1550TT",
                score: 6,
            },
            {
                model: "IT 1548TT",
                score: 5,
            },
            {
                model: "IT 1548STT",
                score: 4,
            },
            {
                model: "IT 1542STJ",
                score: 3,
            },
            {
                model: "IT 1536TT",
                score: 2,
            },
            {
                model: "IT 1536FP",
                score: 1,
            },
        ];
    } else if (averageWatts < 700 && ah < 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS900i",
                score: 10,
            },
            {
                model: "LG850i",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1584TT",
                score: 11,
            },
            {
                model: "IT 1560TT",
                score: 10,
            },
            {
                model: "IT 1560STT",
                score: 9,
            },
            {
                model: "IT 1554TT",
                score: 8,
            },
            {
                model: "IT 1554STJ",
                score: 7,
            },
            {
                model: "IT 1550TT",
                score: 6,
            },
            {
                model: "IT 1548TT",
                score: 5,
            },
            {
                model: "IT 1548STT",
                score: 4,
            },
            {
                model: "IT 1542STJ",
                score: 3,
            },
            {
                model: "IT 1536TT",
                score: 2,
            },
            {
                model: "IT 1536FP",
                score: 1,
            },
        ];
    } else if (averageWatts < 800 && ah < 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1000i",
                score: 10,
            },
            {
                model: "LG950i",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1584TT",
                score: 11,
            },
            {
                model: "IT 1560TT",
                score: 10,
            },
            {
                model: "IT 1560STT",
                score: 9,
            },
            {
                model: "IT 1554TT",
                score: 8,
            },
            {
                model: "IT 1554STJ",
                score: 7,
            },
            {
                model: "IT 1550TT",
                score: 6,
            },
            {
                model: "IT 1548TT",
                score: 5,
            },
            {
                model: "IT 1548STT",
                score: 4,
            },
            {
                model: "IT 1542STJ",
                score: 3,
            },
            {
                model: "IT 1536TT",
                score: 2,
            },
            {
                model: "IT 1536FP",
                score: 1,
            },
        ];
    } else if (averageWatts < 1100 && ah < 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1450i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1584TT",
                score: 11,
            },
            {
                model: "IT 1560TT",
                score: 10,
            },
            {
                model: "IT 1560STT",
                score: 9,
            },
            {
                model: "IT 1554TT",
                score: 8,
            },
            {
                model: "IT 1554STJ",
                score: 7,
            },
            {
                model: "IT 1550TT",
                score: 6,
            },
            {
                model: "IT 1548TT",
                score: 5,
            },
            {
                model: "IT 1548STT",
                score: 4,
            },
            {
                model: "IT 1542STJ",
                score: 3,
            },
            {
                model: "IT 1536TT",
                score: 2,
            },
            {
                model: "IT 1536FP",
                score: 1,
            },
        ];
    } else if (averageWatts < 1250 && ah < 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1550i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1584TT",
                score: 11,
            },
            {
                model: "IT 1560TT",
                score: 10,
            },
            {
                model: "IT 1560STT",
                score: 9,
            },
            {
                model: "IT 1554TT",
                score: 8,
            },
            {
                model: "IT 1554STJ",
                score: 7,
            },
            {
                model: "IT 1550TT",
                score: 6,
            },
            {
                model: "IT 1548TT",
                score: 5,
            },
            {
                model: "IT 1548STT",
                score: 4,
            },
            {
                model: "IT 1542STJ",
                score: 3,
            },
            {
                model: "IT 1536TT",
                score: 2,
            },
            {
                model: "IT 1536FP",
                score: 1,
            },
        ];
    } else if (averageWatts < 1500 && ah < 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1700",
                score: 10,
            },
            {
                model: "LGS1600",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1584TT",
                score: 11,
            },
            {
                model: "IT 1560TT",
                score: 10,
            },
            {
                model: "IT 1560STT",
                score: 9,
            },
            {
                model: "IT 1554TT",
                score: 8,
            },
            {
                model: "IT 1554STJ",
                score: 7,
            },
            {
                model: "IT 1550TT",
                score: 6,
            },
            {
                model: "IT 1548TT",
                score: 5,
            },
            {
                model: "IT 1548STT",
                score: 4,
            },
            {
                model: "IT 1542STJ",
                score: 3,
            },
            {
                model: "IT 1536TT",
                score: 2,
            },
            {
                model: "IT 1536FP",
                score: 1,
            },
        ];
    } else if (averageWatts < 1650 && ah < 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1950i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1584TT",
                score: 11,
            },
            {
                model: "IT 1560TT",
                score: 10,
            },
            {
                model: "IT 1560STT",
                score: 9,
            },
            {
                model: "IT 1554TT",
                score: 8,
            },
            {
                model: "IT 1554STJ",
                score: 7,
            },
            {
                model: "IT 1550TT",
                score: 6,
            },
            {
                model: "IT 1548TT",
                score: 5,
            },
            {
                model: "IT 1548STT",
                score: 4,
            },
            {
                model: "IT 1542STJ",
                score: 3,
            },
            {
                model: "IT 1536TT",
                score: 2,
            },
            {
                model: "IT 1536FP",
                score: 1,
            },
        ];
    } else if (averageWatts < 2000 && ah < 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS2500",
                score: 10,
            },
            {
                model: "LG2300",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1584TT",
                score: 11,
            },
            {
                model: "IT 1560TT",
                score: 10,
            },
            {
                model: "IT 1560STT",
                score: 9,
            },
            {
                model: "IT 1554TT",
                score: 8,
            },
            {
                model: "IT 1554STJ",
                score: 7,
            },
            {
                model: "IT 1550TT",
                score: 6,
            },
            {
                model: "IT 1548TT",
                score: 5,
            },
            {
                model: "IT 1548STT",
                score: 4,
            },
            {
                model: "IT 1542STJ",
                score: 3,
            },
            {
                model: "IT 1536TT",
                score: 2,
            },
            {
                model: "IT 1536FP",
                score: 1,
            },
        ];
    } else if (averageWatts < 2500 && ah < 150) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS3000",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1584TT",
                score: 11,
            },
            {
                model: "IT 1560TT",
                score: 10,
            },
            {
                model: "IT 1560STT",
                score: 9,
            },
            {
                model: "IT 1554TT",
                score: 8,
            },
            {
                model: "IT 1554STJ",
                score: 7,
            },
            {
                model: "IT 1550TT",
                score: 6,
            },
            {
                model: "IT 1548TT",
                score: 5,
            },
            {
                model: "IT 1548STT",
                score: 4,
            },
            {
                model: "IT 1542STJ",
                score: 3,
            },
            {
                model: "IT 1536TT",
                score: 2,
            },
            {
                model: "IT 1536FP",
                score: 1,
            },
        ];
    } else if (averageWatts < 3500 && ah < 120) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS4000",
                score: 10,
            },
            {
                model: "LG3500",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1584TT",
                score: 11,
            },
            {
                model: "IT 1560TT",
                score: 10,
            },
            {
                model: "IT 1560STT",
                score: 9,
            },
            {
                model: "IT 1554TT",
                score: 8,
            },
            {
                model: "IT 1554STJ",
                score: 7,
            },
            {
                model: "IT 1550TT",
                score: 6,
            },
            {
                model: "IT 1548TT",
                score: 5,
            },
            {
                model: "IT 1548STT",
                score: 4,
            },
            {
                model: "IT 1542STJ",
                score: 3,
            },
            {
                model: "IT 1536TT",
                score: 2,
            },
            {
                model: "IT 1536FP",
                score: 1,
            },
        ];
    } else if (averageWatts < 4000 && ah < 120) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1584TT",
                score: 11,
            },
            {
                model: "IT 1560TT",
                score: 10,
            },
            {
                model: "IT 1560STT",
                score: 9,
            },
            {
                model: "IT 1554TT",
                score: 8,
            },
            {
                model: "IT 1554STJ",
                score: 7,
            },
            {
                model: "IT 1550TT",
                score: 6,
            },
            {
                model: "IT 1548TT",
                score: 5,
            },
            {
                model: "IT 1548STT",
                score: 4,
            },
            {
                model: "IT 1542STJ",
                score: 3,
            },
            {
                model: "IT 1536TT",
                score: 2,
            },
            {
                model: "IT 1536FP",
                score: 1,
            },
        ];
    } else if (averageWatts < 600 && ah < 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG750i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1666TT",
                score: 10,
            },
            {
                model: "IT 1645TT",
                score: 9,
            },
            {
                model: "IT 1639TT",
                score: 8,
            },
            {
                model: "IT 1636STJ",
                score: 7,
            },
        ];
    } else if (averageWatts < 700 && ah < 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS900i",
                score: 10,
            },
            {
                model: "LG850i",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1666TT",
                score: 10,
            },
            {
                model: "IT 1645TT",
                score: 9,
            },
            {
                model: "IT 1639TT",
                score: 8,
            },
            {
                model: "IT 1636STJ",
                score: 7,
            },
        ];
    } else if (averageWatts < 800 && ah < 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1000i",
                score: 10,
            },
            {
                model: "LG950i",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1666TT",
                score: 10,
            },
            {
                model: "IT 1645TT",
                score: 9,
            },
            {
                model: "IT 1639TT",
                score: 8,
            },
            {
                model: "IT 1636STJ",
                score: 7,
            },
        ];
    } else if (averageWatts < 1100 && ah < 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1450i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1666TT",
                score: 10,
            },
            {
                model: "IT 1645TT",
                score: 9,
            },
            {
                model: "IT 1639TT",
                score: 8,
            },
            {
                model: "IT 1636STJ",
                score: 7,
            },
        ];
    } else if (averageWatts < 1250 && ah < 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1550i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1666TT",
                score: 10,
            },
            {
                model: "IT 1645TT",
                score: 9,
            },
            {
                model: "IT 1639TT",
                score: 8,
            },
            {
                model: "IT 1636STJ",
                score: 7,
            },
        ];
    } else if (averageWatts < 1500 && ah < 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1700",
                score: 10,
            },
            {
                model: "LGS1600",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1666TT",
                score: 10,
            },
            {
                model: "IT 1645TT",
                score: 9,
            },
            {
                model: "IT 1639TT",
                score: 8,
            },
            {
                model: "IT 1636STJ",
                score: 7,
            },
        ];
    } else if (averageWatts < 1650 && ah < 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1950i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1666TT",
                score: 10,
            },
            {
                model: "IT 1645TT",
                score: 9,
            },
            {
                model: "IT 1639TT",
                score: 8,
            },
            {
                model: "IT 1636STJ",
                score: 7,
            },
        ];
    } else if (averageWatts < 2000 && ah < 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS2500",
                score: 10,
            },
            {
                model: "LG2300",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1666TT",
                score: 10,
            },
            {
                model: "IT 1645TT",
                score: 9,
            },
            {
                model: "IT 1639TT",
                score: 8,
            },
            {
                model: "IT 1636STJ",
                score: 7,
            },
        ];
    } else if (averageWatts < 2500 && ah < 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS3000",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1666TT",
                score: 10,
            },
            {
                model: "IT 1645TT",
                score: 9,
            },
            {
                model: "IT 1639TT",
                score: 8,
            },
            {
                model: "IT 1636STJ",
                score: 7,
            },
        ];
    } else if (averageWatts < 3500 && ah < 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS4000",
                score: 10,
            },
            {
                model: "LG3500",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1666TT",
                score: 10,
            },
            {
                model: "IT 1645TT",
                score: 9,
            },
            {
                model: "IT 1639TT",
                score: 8,
            },
            {
                model: "IT 1636STJ",
                score: 7,
            },
        ];
    } else if (averageWatts < 4000 && ah < 160) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1666TT",
                score: 10,
            },
            {
                model: "IT 1645TT",
                score: 9,
            },
            {
                model: "IT 1639TT",
                score: 8,
            },
            {
                model: "IT 1636STJ",
                score: 7,
            },
        ];
    } else if (averageWatts < 600 && ah < 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG750i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1866TT",
                score: 10,
            },
            {
                model: "IT 1860TT",
                score: 9,
            },
            {
                model: "IT 1848STJ",
                score: 8,
            },
        ];
    } else if (averageWatts < 700 && ah < 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS900i",
                score: 10,
            },
            {
                model: "LG850i",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1866TT",
                score: 10,
            },
            {
                model: "IT 1860TT",
                score: 9,
            },
            {
                model: "IT 1848STJ",
                score: 8,
            },
        ];
    } else if (averageWatts < 800 && ah < 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1000i",
                score: 10,
            },
            {
                model: "LG950i",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1866TT",
                score: 10,
            },
            {
                model: "IT 1860TT",
                score: 9,
            },
            {
                model: "IT 1848STJ",
                score: 8,
            },
        ];
    } else if (averageWatts < 1100 && ah < 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1450i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1866TT",
                score: 10,
            },
            {
                model: "IT 1860TT",
                score: 9,
            },
            {
                model: "IT 1848STJ",
                score: 8,
            },
        ];
    } else if (averageWatts < 1250 && ah < 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1550i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1866TT",
                score: 10,
            },
            {
                model: "IT 1860TT",
                score: 9,
            },
            {
                model: "IT 1848STJ",
                score: 8,
            },
        ];
    } else if (averageWatts < 1500 && ah < 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1700",
                score: 10,
            },
            {
                model: "LGS1600",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1866TT",
                score: 10,
            },
            {
                model: "IT 1860TT",
                score: 9,
            },
            {
                model: "IT 1848STJ",
                score: 8,
            },
        ];
    } else if (averageWatts < 1650 && ah < 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1950i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1866TT",
                score: 10,
            },
            {
                model: "IT 1860TT",
                score: 9,
            },
            {
                model: "IT 1848STJ",
                score: 8,
            },
        ];
    } else if (averageWatts < 2000 && ah < 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS2500",
                score: 10,
            },
            {
                model: "LG2300",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1866TT",
                score: 10,
            },
            {
                model: "IT 1860TT",
                score: 9,
            },
            {
                model: "IT 1848STJ",
                score: 8,
            },
        ];
    } else if (averageWatts < 2500 && ah < 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS3000",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1866TT",
                score: 10,
            },
            {
                model: "IT 1860TT",
                score: 9,
            },
            {
                model: "IT 1848STJ",
                score: 8,
            },
        ];
    } else if (averageWatts < 3500 && ah < 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS4000",
                score: 10,
            },
            {
                model: "LG3500",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1866TT",
                score: 10,
            },
            {
                model: "IT 1860TT",
                score: 9,
            },
            {
                model: "IT 1848STJ",
                score: 8,
            },
        ];
    } else if (averageWatts < 4000 && ah < 180) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 1866TT",
                score: 10,
            },
            {
                model: "IT 1860TT",
                score: 9,
            },
            {
                model: "IT 1848STJ",
                score: 8,
            },
        ];
    } else if (averageWatts < 600 && ah < 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG750i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (averageWatts < 700 && ah < 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS900i",
                score: 10,
            },
            {
                model: "LG850i",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (averageWatts < 800 && ah < 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1000i",
                score: 10,
            },
            {
                model: "LG950i",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (averageWatts < 1100 && ah < 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1450i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (averageWatts < 1250 && ah < 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1550i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (averageWatts < 1500 && ah < 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1700",
                score: 10,
            },
            {
                model: "LGS1600",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (averageWatts < 1650 && ah < 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1950i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (averageWatts < 2000 && ah < 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS2500",
                score: 10,
            },
            {
                model: "LG2300",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (averageWatts < 2500 && ah < 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS3000",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (averageWatts < 3500 && ah < 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS4000",
                score: 10,
            },
            {
                model: "LG3500",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (averageWatts < 4000 && ah < 200) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2066TT",
                score: 10,
            },
            {
                model: "IT 2060TT",
                score: 9,
            },
            {
                model: "IT 2048TT",
                score: 8,
            },
        ];
    } else if (averageWatts < 600 && ah < 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG750i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
        ];
    } else if (averageWatts < 700 && ah < 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS900i",
                score: 10,
            },
            {
                model: "LG850i",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
        ];
    } else if (averageWatts < 800 && ah < 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1000i",
                score: 10,
            },
            {
                model: "LG950i",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
        ];
    } else if (averageWatts < 1100 && ah < 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1450i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
        ];
    } else if (averageWatts < 1250 && ah < 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1550i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
        ];
    } else if (averageWatts < 1500 && ah < 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1700",
                score: 10,
            },
            {
                model: "LGS1600",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
        ];
    } else if (averageWatts < 1650 && ah < 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1950i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
        ];
    } else if (averageWatts < 2000 && ah < 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS2500",
                score: 10,
            },
            {
                model: "LG2300",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
        ];
    } else if (averageWatts < 2500 && ah < 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS3000",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
        ];
    } else if (averageWatts < 3500 && ah < 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS4000",
                score: 10,
            },
            {
                model: "LG3500",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
        ];
    } else if (averageWatts < 4000 && ah < 220) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2266TT",
                score: 10,
            },
        ];
    } else if (averageWatts < 600 && ah < 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG750i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
        ];
    } else if (averageWatts < 700 && ah < 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS900i",
                score: 10,
            },
            {
                model: "LG850i",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
        ];
    } else if (averageWatts < 800 && ah < 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1000i",
                score: 10,
            },
            {
                model: "LG950i",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
        ];
    } else if (averageWatts < 1100 && ah < 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1450i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
        ];
    } else if (averageWatts < 1250 && ah < 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1550i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
        ];
    } else if (averageWatts < 1500 && ah < 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1700",
                score: 10,
            },
            {
                model: "LGS1600",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
        ];
    } else if (averageWatts < 1650 && ah < 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1950i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
        ];
    } else if (averageWatts < 2000 && ah < 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS2500",
                score: 10,
            },
            {
                model: "LG2300",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
        ];
    } else if (averageWatts < 2500 && ah < 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS3000",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
        ];
    } else if (averageWatts < 3500 && ah < 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS4000",
                score: 10,
            },
            {
                model: "LG3500",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
        ];
    } else if (averageWatts < 4000 && ah < 230) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2360TT",
                score: 10,
            },
        ];
    } else if (averageWatts < 600 && ah < 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG750i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (averageWatts < 700 && ah < 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS900i",
                score: 10,
            },
            {
                model: "LG850i",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (averageWatts < 800 && ah < 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1000i",
                score: 10,
            },
            {
                model: "LG950i",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (averageWatts < 1100 && ah < 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1450i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (averageWatts < 1250 && ah < 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1550i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (averageWatts < 1500 && ah < 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS1700",
                score: 10,
            },
            {
                model: "LGS1600",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (averageWatts < 1650 && ah < 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LG1950i",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (averageWatts < 2000 && ah < 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS2500",
                score: 10,
            },
            {
                model: "LG2300",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (averageWatts < 2500 && ah < 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS3000",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (averageWatts < 3500 && ah < 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS4000",
                score: 10,
            },
            {
                model: "LG3500",
                score: 9,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    } else if (averageWatts < 4000 && ah < 260) {
        loadCalculatorOutputs.recommendedInverters = [
            {
                model: "LGS5000",
                score: 10,
            },
        ];
        loadCalculatorOutputs.recommendedBatteries = [
            {
                model: "IT 2672TT",
                score: 10,
            },
        ];
    }

    return loadCalculatorOutputs;
}
