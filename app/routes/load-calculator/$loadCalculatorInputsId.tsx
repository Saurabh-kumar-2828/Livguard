import {ShareIcon} from "@heroicons/react/20/solid";
import {LoaderFunction} from "@remix-run/node";
import {Link} from "@remix-run/react";
import {useLoaderData} from "react-router";
import {getLoadCalculatorEntry, getLoadCalculatorOutputs, LoadCalculatorOutputs} from "~/backend/loadCalculator.server";
import {StickyBottomBar} from "~/components/bottomBar";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {PageScaffold} from "~/components/pageScaffold";
import {CoverImage} from "~/global-common-typescript/components/coverImage";
import {EmptyFlexFiller} from "~/global-common-typescript/components/emptyFlexFiller";
import {FullWidthImage} from "~/global-common-typescript/components/fullWidthImage";
import {ImageCdnProvider} from "~/global-common-typescript/components/growthJockeyImage";
import {HorizontalSpacer} from "~/global-common-typescript/components/horizontalSpacer";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {getUuidFromUnkown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {useEmlbaCarouselWithIndex} from "~/hooks/useEmlbaCarouselWithIndex";
import {FaqSection, SolarSolutions} from "~/routes";
import {LoadCalculatorInputs} from "~/routes/load-calculator/index.types";
import {OurBatteriesSectionInternal} from "~/routes/__category/inverter-batteries";
import {OurInvertersSectionInternal} from "~/routes/__category/inverter-for-home";
import {getUserPreferencesFromCookies} from "~/server/userPreferencesCookieHelper.server";
import {UserPreferences} from "~/typeDefinitions";
import {getRedirectToUrlFromRequest} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";

type LoaderData = {
    userPreferences: UserPreferences;
    redirectTo: string;
    loadCalculatorInputs: LoadCalculatorInputs;
    loadCalculatorOutputs: LoadCalculatorOutputs;
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

    const loadCalculatorOutputs = await getLoadCalculatorOutputs(loadCalculatorInputs);

    const loaderData: LoaderData = {
        userPreferences: userPreferences,
        redirectTo: getRedirectToUrlFromRequest(request),
        loadCalculatorInputs: loadCalculatorInputs,
        loadCalculatorOutputs: loadCalculatorOutputs,
    };

    return loaderData;
};

export default function () {
    const {userPreferences, redirectTo, loadCalculatorInputs, loadCalculatorOutputs} = useLoaderData() as LoaderData;

    const utmSearchParameters = useUtmSearchParameters();

    return (
        <>
            <PageScaffold
                userPreferences={userPreferences}
                redirectTo={redirectTo}
                showMobileMenuIcon={true}
                utmParameters={utmSearchParameters}
                breadcrumbs={[
                    {humanReadableString: "Home", link: "/"},
                    {humanReadableString: "Load Calculator", link: "/load-calculator"},
                    {humanReadableString: "Your Results", link: "#"},
                ]}
            >
                <LoadCalculatorResult
                    userPreferences={userPreferences}
                    loadCalculatorInputs={loadCalculatorInputs}
                    loadCalculatorOutputs={loadCalculatorOutputs}
                />
            </PageScaffold>

            <StickyBottomBar userPreferences={userPreferences} />
        </>
    );
}

function LoadCalculatorResult({
    userPreferences,
    loadCalculatorInputs,
    loadCalculatorOutputs,
}: {
    userPreferences: UserPreferences;
    loadCalculatorInputs: LoadCalculatorInputs;
    loadCalculatorOutputs: LoadCalculatorOutputs;
}) {
    return (
        <>
            <TotalLoadSection
                userPreferences={userPreferences}
                loadCalculatorInputs={loadCalculatorInputs}
                loadCalculatorOutputs={loadCalculatorOutputs}
            />

            <VerticalSpacer className="tw-h-10" />

            <div className="lg-px-screen-edge lg-text-headline tw-text-center">
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("loadCalculatorRecommendationsS2H1", userPreferences.language)}} />
                </DefaultTextAnimation>
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("loadCalculatorRecommendationsS2H2", userPreferences.language)}} />
                </DefaultTextAnimation>
            </div>

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
                    <VerticalSpacer className="tw-h-6" />

                    <SolarSolutions userPreferences={userPreferences} />

                    <VerticalSpacer className="tw-h-6" />

                    <DefaultElementAnimation className="lg-px-screen-edge tw-w-full tw-flex tw-flex-col tw-items-center">
                        <div className="lg-cta-outline-button">{getVernacularString("loadCalculatorRecommendationsS4CTA1", userPreferences.language)}</div>
                    </DefaultElementAnimation>
                </>
            )}

            <VerticalSpacer className="tw-h-10" />

            <FaqSection
                userPreferences={userPreferences}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
            />

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
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:tw-px-[72px] xl:tw-px-[120px]">
            <div className="tw-row-start-1 tw-col-start-1 tw-w-full tw-aspect-[2/1] tw-overflow-hidden">
                <CoverImage
                    relativePath="/livguard/load-calculator/1.jpg"
                    imageCdnProvider={ImageCdnProvider.Imgix}
                />
            </div>

            <div className="tw-row-start-2 tw-col-start-1 lg:tw-row-start-1 lg:tw-col-start-2 lg-px-screen-edge lg:tw-self-center lg:tw-px-0">
                <div className="tw-w-full tw-h-full tw-grid tw-bg-gradient-to-r tw-from-[#F25F60] tw-to-[#EB2A2B] tw-rounded-b-lg lg:tw-rounded-r-lg lg:tw-rounded-bl-none tw-grid-rows-[3rem_minmax(0,1fr)_1.5rem] tw-grid-cols-1 tw-gap-y-4">
                    <div className="tw-grid tw-grid-rows-[auto_auto] tw-grid-cols-[repeat(3,3rem)] tw-justify-center tw-justify-items-center tw-align-center tw-gap-x-6 tw-gap-y-1.5 tw-relative -tw-top-5 tw-text-center">
                        <div className="tw-row-start-1 tw-col-start-1 tw-bg-secondary-900-dark tw-w-10 tw-h-10 tw-rounded-full tw-flex tw-flex-col tw-justify-center tw-items-center">
                            <img
                                src="https://images.growthjockey.com/livguard/load-calculator/home.svg"
                                className="tw-w-6 tw-h-6"
                            />
                        </div>
                        <div className="lg-text-icon tw-text-secondary-900-dark tw-whitespace-nowrap">
                            {getVernacularString(`propertyType-${loadCalculatorInputs.property.propertyType}`, userPreferences.language)}
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-bg-secondary-900-dark tw-w-10 tw-h-10 tw-rounded-full tw-flex tw-flex-col tw-justify-center tw-items-center">
                            <img
                                src="https://images.growthjockey.com/livguard/load-calculator/utilisation.svg"
                                className="tw-w-6 tw-h-6"
                            />
                        </div>
                        <div className="lg-text-icon tw-text-secondary-900-dark tw-whitespace-nowrap">
                            {loadCalculatorInputs.averageConsumption}% {getVernacularString("loadCalculatorRecommendationsS1T1", userPreferences.language)}
                        </div>

                        <div className="tw-row-start-1 tw-col-start-3 tw-bg-secondary-900-dark tw-w-10 tw-h-10 tw-rounded-full tw-flex tw-flex-col tw-justify-center tw-items-center">
                            <img
                                src="https://images.growthjockey.com/livguard/load-calculator/hours.svg"
                                className="tw-w-6 tw-h-6"
                            />
                        </div>
                        <div className="lg-text-icon tw-text-secondary-900-dark tw-whitespace-nowrap">
                            {loadCalculatorInputs.backupHours} {getVernacularString("loadCalculatorRecommendationsS1T2", userPreferences.language)}
                        </div>
                    </div>

                    <div className="tw-row-start-2 tw-col-start-1 tw-px-8 tw-flex tw-flex-row tw-justify-center tw-gap-x-8">
                        <img
                            src="https://images.growthjockey.com/livguard/load-calculator/output.svg"
                            className="tw-w-12 tw-h-12 tw-invert"
                        />
                        <div className="tw-flex tw-flex-col">
                            <div className="lg-text-banner tw-text-secondary-900-dark">
                                {loadCalculatorOutputs.totalWatts}W, {Math.round(loadCalculatorOutputs.ah)}Ah
                            </div>
                            <div className="tw-text-title2 tw-text-secondary-900-dark">{getVernacularString("loadCalculatorRecommendationsS1T4", userPreferences.language)}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <VerticalSpacer className="tw-h-6" />

            <div className="tw-px-screen-edge tw-flex tw-flex-row tw-justify-center tw-items-center lg-text-secondary-700">
                <ShareIcon className="tw-w-4 tw-h-4" />
                <HorizontalSpacer className="tw-w-2" />
                Share
            </div> */}
        </div>
    );
}

function TopChoicesSection({userPreferences, loadCalculatorOutputs}: {userPreferences: UserPreferences; loadCalculatorOutputs: LoadCalculatorOutputs}) {
    return (
        <div className="tw-flex tw-flex-col">
            {loadCalculatorOutputs.recommendedInverters == null ? null : (
                <>
                    <VerticalSpacer className="tw-h-6" />

                    <div className="lg-px-screen-edge tw-w-full lg-text-title1 tw-text-center">{getVernacularString("loadCalculatorRecommendationsS2T1", userPreferences.language)}</div>

                    <VerticalSpacer className="tw-h-2" />

                    <div className="tw-w-full tw-grid tw-grid-cols-1 tw-grid-rows-1 tw-overflow-x-auto tw-pl-6 tw-pr-[calc(1.5rem-1px)]">
                        <div className="tw-flex tw-flex-row tw-gap-x-4 sm:tw-justify-center">
                            <ItemBuilder
                                items={loadCalculatorOutputs.recommendedInverters}
                                itemBuilder={(recommendation, recommendationIndex) => (
                                    <Link
                                        to={`/product/${recommendation.model}`.replace(" ", "")}
                                        className="tw-w-40 tw-h-full tw-flex-none tw-flex tw-flex-col tw-items-center"
                                        key={recommendationIndex}
                                    >
                                        <VerticalSpacer className="tw-h-3" />

                                        <div className="tw-w-full lg-bg-secondary-100 tw-rounded-lg tw-flex tw-flex-col tw-items-center tw-text-center">
                                            <div className="lg-cta-button tw-w-fit tw-px-2 tw-py-0 tw-whitespace-nowrap tw-relative -tw-top-3">
                                                {recommendation.score}/10 {getVernacularString("loadCalculatorRecommendationsS2T4", userPreferences.language)}
                                            </div>

                                            <VerticalSpacer className="tw-h-4" />

                                            {/* TODO: Temp hack */}
                                            {/* <div className="lg-text-secondary-900">{recommendation.humanFriendlyString}</div> */}
                                            <div className="lg-text-secondary-900 tw-px-4">
                                                {recommendation.humanFriendlyString.length > 0 ? recommendation.humanFriendlyString : recommendation.model}
                                            </div>

                                            <VerticalSpacer className="tw-h-2" />

                                            <div className="lg-text-secondary-900 tw-px-4">
                                                {recommendation.capacity}VA Capacity
                                            </div>

                                            <div className="lg-text-secondary-900 tw-px-4">
                                                {recommendation.warranty} Month Warranty
                                            </div>

                                            <VerticalSpacer className="tw-h-4" />

                                            <FullWidthImage
                                                relativePath={`/livguard/inverter images/${recommendation.model}.png`}
                                                imageCdnProvider={ImageCdnProvider.Imgix}
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

                    <VerticalSpacer className="tw-h-2" />

                    <Link
                        to="/inverter-for-home"
                        className="lg-px-screen-edge tw-w-full tw-text-center lg-text-secondary-700 tw-underline tw-underline-offset-4"
                    >
                        {getVernacularString("loadCalculatorRecommendationsS2T5", userPreferences.language)}
                    </Link>
                </>
            )}

            {loadCalculatorOutputs.recommendedBatteries == null ? null : (
                <>
                    <VerticalSpacer className="tw-h-6" />

                    <div className="lg-px-screen-edge tw-w-full lg-text-title1 tw-text-center">{getVernacularString("loadCalculatorRecommendationsS2T2", userPreferences.language)}</div>

                    <VerticalSpacer className="tw-h-2" />

                    <div className="tw-w-full tw-grid tw-grid-cols-1 tw-grid-rows-1 tw-overflow-x-auto tw-pl-6 tw-pr-[calc(1.5rem-1px)]">
                        <div className="tw-flex tw-flex-row tw-gap-x-4 sm:tw-justify-center">
                            <ItemBuilder
                                items={loadCalculatorOutputs.recommendedBatteries}
                                itemBuilder={(recommendation, recommendationIndex) => (
                                    <Link
                                        to={`/product/${recommendation.model.replace(" ", "")}`}
                                        className="tw-w-40 tw-h-full tw-flex-none tw-flex tw-flex-col tw-items-center"
                                        key={recommendationIndex}
                                    >
                                        <VerticalSpacer className="tw-h-3" />

                                        <div className="tw-w-full lg-bg-secondary-100 tw-rounded-lg tw-flex tw-flex-col tw-items-center tw-text-center">
                                            <div className="lg-cta-button tw-w-fit tw-px-2 tw-py-0 tw-whitespace-nowrap tw-relative -tw-top-3">
                                                {recommendation.score}/10 {getVernacularString("loadCalculatorRecommendationsS2T4", userPreferences.language)}
                                            </div>

                                            <VerticalSpacer className="tw-h-4" />

                                            {/* TODO: Temp hack */}
                                            {/* <div className="lg-text-secondary-900">{recommendation.humanFriendlyString}</div> */}
                                            <div className="lg-text-secondary-900 tw-px-4">
                                                {recommendation.humanFriendlyString.length > 0 ? recommendation.humanFriendlyString : recommendation.model}
                                            </div>

                                            <VerticalSpacer className="tw-h-2" />

                                            <div className="lg-text-secondary-900 tw-px-4">
                                                {recommendation.capacity}Ah Capacity
                                            </div>

                                            <div className="lg-text-secondary-900 tw-px-4">
                                                {recommendation.warranty} Month Warranty
                                            </div>

                                            <VerticalSpacer className="tw-h-4" />

                                            <FullWidthImage
                                                relativePath={`/livguard/battery-images/${recommendation.model}.png`}
                                                imageCdnProvider={ImageCdnProvider.Imgix}
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

                    <VerticalSpacer className="tw-h-2" />

                    <Link
                        to="/inverter-for-home"
                        className="lg-px-screen-edge tw-w-full tw-text-center lg-text-secondary-700 tw-underline tw-underline-offset-4"
                    >
                        {getVernacularString("loadCalculatorRecommendationsS2T5", userPreferences.language)}
                    </Link>
                </>
            )}

            <VerticalSpacer className="tw-h-6" />

            <DefaultElementAnimation className="lg-px-screen-edge tw-self-center">
                <Link to="/dealer-for-inverters-and-batteries">
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
            <div className="lg-px-screen-edge-2 lg-text-headline tw-text-center">
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("loadCalculatorRecommendationsS3H1", userPreferences.language)}} />
                </DefaultTextAnimation>
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("loadCalculatorRecommendationsS3H2", userPreferences.language)}} />
                </DefaultTextAnimation>
            </div>

            <VerticalSpacer className="tw-h-6" />

            <div className="lg-px-screen-edge-2 tw-grid tw-grid-cols-2 tw-items-center">
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

            <div className="lg-px-screen-edge-2">
                <VerticalSpacer className="tw-h-4 tw-border-solid tw-border-b lg-border-secondary-900" />
            </div>

            <VerticalSpacer className="tw-h-6" />

            <div
                className="tw-overflow-hidden"
                ref={emblaRef}
            >
                <div className="tw-grid tw-grid-flow-col tw-auto-cols-[100%]">
                    <div className="tw-h-full tw-flex tw-flex-col tw-max-w-2xl">
                        <OurInvertersSectionInternal userPreferences={userPreferences} />

                        <VerticalSpacer className="tw-h-4" />
                        <EmptyFlexFiller />

                        <DefaultElementAnimation className="lg-px-screen-edge tw-self-center">
                            <Link to="/inverter-for-home">
                                <div className="lg-cta-button">{getVernacularString("loadCalculatorRecommendationsS2CTA2", userPreferences.language)}</div>
                            </Link>
                        </DefaultElementAnimation>
                    </div>

                    <div className="tw-h-full tw-flex tw-flex-col tw-max-w-2xl">
                        <OurBatteriesSectionInternal userPreferences={userPreferences} />

                        <VerticalSpacer className="tw-h-4" />
                        <EmptyFlexFiller />

                        <DefaultElementAnimation className="lg-px-screen-edge tw-self-center">
                            <Link to="/inverter-batteries">
                                <div className="lg-cta-button">{getVernacularString("loadCalculatorRecommendationsS2CTA3", userPreferences.language)}</div>
                            </Link>
                        </DefaultElementAnimation>
                    </div>
                </div>
            </div>
        </div>
    );
}
