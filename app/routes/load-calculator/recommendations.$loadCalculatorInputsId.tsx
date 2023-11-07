import {LoaderFunction} from "@remix-run/node";
import {Link} from "@remix-run/react";
import {PlusCircleFill} from "react-bootstrap-icons";
import {useLoaderData} from "react-router";
import {getLoadCalculatorEntry, getLoadCalculatorOutputs, LoadCalculatorOutputs} from "~/backend/loadCalculator.server";
import {StickyBottomBar} from "~/components/bottomBar";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {PageScaffold} from "~/components/pageScaffold";
import {CoverImage} from "~/components/images/coverImage";
import {EmptyFlexFiller} from "~/global-common-typescript/components/emptyFlexFiller";
import {FixedWidthImage} from "~/components/images/fixedWidthImage";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {getUuidFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {useEmblaCarouselWithIndex} from "~/hooks/useEmblaCarouselWithIndex";
import {FaqSection, SolarSolutions} from "~/routes";
import {LoadCalculatorInputs} from "~/routes/load-calculator/index.types";
import {OurBatteriesSectionInternal} from "~/routes/__category/inverter-batteries";
import {OurInvertersSectionInternal} from "~/routes/__category/inverter-for-home";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import {UserPreferences} from "~/typeDefinitions";
import {appendSpaceToString, convertProductInternalNameToPublicName, getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {getContentGenerator} from "~/vernacularProvider";
import {getVernacularFromBackend} from "~/backend/vernacularProvider.server";
import {ContentProviderContext} from "~/contexts/contentProviderContext";
import {useContext} from "react";
import {ImageMetadata} from "~/common--type-definitions/typeDefinitions";
import {getImageMetadataLibraryForPage, getImageMetadataLibraryFromBackend} from "~/backend/imageMetaDataLibrary.server";
import {ImageProviderContext} from "~/contexts/imageMetaDataContext";

type LoaderData = {
    userPreferences: UserPreferences;
    redirectTo: string;
    loadCalculatorInputs: LoadCalculatorInputs;
    loadCalculatorOutputs: LoadCalculatorOutputs;
    vernacularData: {
        [id: string]: string;
    };
    pageUrl: string;
    imageMetaDataLibrary: {
        [relativePath: string]: ImageMetadata | undefined;
    };
};

export const loader: LoaderFunction = async ({request, params}) => {
    const userPreferences = await getUserPreferencesFromCookiesAndUrlSearchParameters(request);
    if (userPreferences instanceof Error) {
        throw userPreferences;
    }

    const loadCalculatorInputsId = safeParse(getUuidFromUnknown, params.loadCalculatorInputsId);
    if (loadCalculatorInputsId == null) {
        throw loadCalculatorInputsId;
    }

    const loadCalculatorInputs = await getLoadCalculatorEntry(loadCalculatorInputsId);
    if (loadCalculatorInputs instanceof Error) {
        throw loadCalculatorInputs;
    }

    const loadCalculatorOutputs = await getLoadCalculatorOutputs(loadCalculatorInputs, userPreferences);

    const vernacularData = getVernacularFromBackend("loadCalculatorResultPage", userPreferences.language);
    const imageMetaDataLibrary = {
        ...getImageMetadataLibraryForPage(loadCalculatorOutputs.recommendedInverters.map((product) => `/livguard/products/${product.model}/thumbnail.png`)),
        ...getImageMetadataLibraryForPage(loadCalculatorOutputs.recommendedBatteries.map((product) => `/livguard/products/${product.model}/thumbnail.png`)),
        ...getImageMetadataLibraryFromBackend("loadCalculatorResultPage"),
    };

    const loaderData: LoaderData = {
        userPreferences: userPreferences,
        redirectTo: getRedirectToUrlFromRequest(request),
        loadCalculatorInputs: loadCalculatorInputs,
        loadCalculatorOutputs: loadCalculatorOutputs,
        pageUrl: getUrlFromRequest(request),
        vernacularData: vernacularData,
        imageMetaDataLibrary: imageMetaDataLibrary,
    };

    return loaderData;
};

export default function () {
    const {userPreferences, redirectTo, loadCalculatorInputs, loadCalculatorOutputs, pageUrl, vernacularData, imageMetaDataLibrary} = useLoaderData() as LoaderData;

    const utmSearchParameters = useUtmSearchParameters();

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
                            {contentId: "cea6d04c-15b9-4c11-8d83-2e51af979f54", link: "/load-calculator"},
                            {contentId: "ded4f739-d43e-47af-ad85-2f4885413cfc", link: "#"},
                        ]}
                    >
                        <LoadCalculatorResult
                            userPreferences={userPreferences}
                            loadCalculatorInputs={loadCalculatorInputs}
                            loadCalculatorOutputs={loadCalculatorOutputs}
                        />
                    </PageScaffold>

                    <StickyBottomBar userPreferences={userPreferences} />
                </ContentProviderContext.Provider>
            </ImageProviderContext.Provider>
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
    const contentData = useContext(ContentProviderContext);
    return (
        <>
            <VerticalSpacer className="lg:tw-h-20" />

            <TotalLoadSection
                userPreferences={userPreferences}
                loadCalculatorInputs={loadCalculatorInputs}
                loadCalculatorOutputs={loadCalculatorOutputs}
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <div className="lg-px-screen-edge lg-text-headline tw-text-center">
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent("loadCalculatorRecommendationsS2H1")}} />
                </DefaultTextAnimation>
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent("loadCalculatorRecommendationsS2H2")}} />
                </DefaultTextAnimation>
            </div>

            {loadCalculatorOutputs.recommendedInverters != null || loadCalculatorOutputs.recommendedBatteries != null ? (
                <>
                    <TopChoicesSection
                        userPreferences={userPreferences}
                        loadCalculatorOutputs={loadCalculatorOutputs}
                    />

                    <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

                    <OurSuggestionsSection userPreferences={userPreferences} />
                </>
            ) : (
                <>
                    <VerticalSpacer className="tw-h-6" />

                    <SolarSolutions userPreferences={userPreferences} />

                    <VerticalSpacer className="tw-h-6" />

                    <DefaultElementAnimation className="lg-px-screen-edge tw-w-full tw-flex tw-flex-col tw-items-center">
                        <div className="lg-cta-outline-button">{contentData.getContent("loadCalculatorRecommendationsS4CTA1")}</div>
                    </DefaultElementAnimation>
                </>
            )}

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <FaqSection
                userPreferences={userPreferences}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />
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
    const contentData = useContext(ContentProviderContext);
    return (
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-[minmax(0,3fr)_minmax(0,2fr)] xl:tw-grid-cols-[minmax(0,4fr)_minmax(0,2fr)] lg:tw-px-[72px] xl:tw-px-[120px]">
            <div className="tw-row-start-1 tw-col-start-1 tw-w-full tw-aspect-[2/1] tw-overflow-hidden">
                <CoverImage relativePath="/livguard/load-calculator/1.jpg" />
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
                        <div className="lg-text-icon tw-text-secondary-900-dark tw-whitespace-nowrap">{contentData.getContent(`propertyType-${loadCalculatorInputs.property.propertyType}`)}</div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-bg-secondary-900-dark tw-w-10 tw-h-10 tw-rounded-full tw-flex tw-flex-col tw-justify-center tw-items-center">
                            <img
                                src="https://images.growthjockey.com/livguard/load-calculator/utilisation.svg"
                                className="tw-w-6 tw-h-6"
                            />
                        </div>
                        <div className="lg-text-icon tw-text-secondary-900-dark tw-whitespace-nowrap">
                            {loadCalculatorInputs.averageConsumption}% {contentData.getContent("loadCalculatorRecommendationsS1T1")}
                        </div>

                        <div className="tw-row-start-1 tw-col-start-3 tw-bg-secondary-900-dark tw-w-10 tw-h-10 tw-rounded-full tw-flex tw-flex-col tw-justify-center tw-items-center">
                            <img
                                src="https://images.growthjockey.com/livguard/load-calculator/hours.svg"
                                className="tw-w-6 tw-h-6"
                            />
                        </div>
                        <div className="lg-text-icon tw-text-secondary-900-dark tw-whitespace-nowrap">
                            {loadCalculatorInputs.backupHours} {contentData.getContent("loadCalculatorRecommendationsS1T2")}
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
                            <div className="tw-text-title2 tw-text-secondary-900-dark">{contentData.getContent("loadCalculatorRecommendationsS1T4")}</div>
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
    const contentData = useContext(ContentProviderContext);
    return (
        <div className="tw-flex tw-flex-col">
            {loadCalculatorOutputs.recommendedInverters == null || loadCalculatorOutputs.recommendedBatteries == null ? null : (
                <>
                    <VerticalSpacer className="tw-h-6" />

                    <div className="lg-px-screen-edge tw-w-full tw-grid tw-grid-cols lg:tw-justify-center">
                        <div>
                            <div className="lg-bg-primary-500 tw-p-4 tw-rounded-lg tw-grid tw-grid-cols-1 lg:tw-grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] tw-justify-items-center tw-items-center tw-gap-x-4 tw-gap-y-4">
                                <div className="tw-col-span-full">
                                    <div className="tw-w-full tw-text-center lg-text-title2 lg-text-secondary-100">
                                        {contentData.getContent("75a44862-4242-4b1b-a7b7-bd6b57e40da7")}: {loadCalculatorOutputs.totalWatts}W, {Math.round(loadCalculatorOutputs.ah)}Ah
                                    </div>

                                    <VerticalSpacer className="tw-h-2" />

                                    <div className="tw-w-full tw-text-center lg-text-secondary-100">
                                        {appendSpaceToString(String(loadCalculatorOutputs.recommendedInverters[0].nBatteries))}
                                        {loadCalculatorOutputs.recommendedInverters[0].nBatteries == 1
                                            ? contentData.getContent("750f6ea3-5bc7-4589-a49e-55015d845288")
                                            : contentData.getContent("2d7f7aaa-9ae0-4db0-932b-0714a82a39bf")}
                                    </div>
                                </div>

                                <HorizontalInverterRecommendationCard
                                    recommendation={loadCalculatorOutputs.recommendedInverters[0]}
                                    userPreferences={userPreferences}
                                    className="lg:tw-justify-self-end"
                                />

                                <PlusCircleFill className="tw-w-8 tw-h-8 lg-text-secondary-100 lg-bg-secondary-900 tw-rounded-full" />

                                <HorizontalBatteryRecommendationCard
                                    recommendation={loadCalculatorOutputs.recommendedBatteries[0]}
                                    userPreferences={userPreferences}
                                    className="lg:tw-justify-self-end"
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}

            {loadCalculatorOutputs.recommendedInverters == null ? null : (
                <>
                    <VerticalSpacer className="tw-h-6" />

                    <div className="lg-px-screen-edge tw-w-full lg-text-title1 tw-text-center">{contentData.getContent("loadCalculatorRecommendationsS2T1")}</div>

                    <VerticalSpacer className="tw-h-6" />

                    <div className="tw-w-full tw-grid tw-grid-cols-1 tw-grid-rows-1 tw-overflow-x-auto tw-pl-6 tw-pr-[calc(1.5rem-1px)]">
                        <div className="tw-flex tw-flex-row tw-gap-x-4 lg:tw-justify-center">
                            <ItemBuilder
                                items={loadCalculatorOutputs.recommendedInverters}
                                itemBuilder={(recommendation, recommendationIndex) => (
                                    <VerticalInverterRecommendationCard
                                        recommendation={recommendation}
                                        userPreferences={userPreferences}
                                        key={recommendationIndex}
                                    />
                                )}
                            />

                            <Link
                                to="/inverter-for-home"
                                className="tw-w-60 tw-h-full tw-flex-none tw-flex tw-flex-col tw-items-center lg-card-shadow-hack"
                            >
                                <VerticalSpacer className="tw-h-3" />

                                <div className="tw-w-full tw-h-full lg-bg-secondary-100 tw-rounded-lg tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center tw-p-4 lg-text-title2 tw-border tw-border-solid tw-border-primary-500-light">
                                    {contentData.getContent("loadCalculatorRecommendationsS2T5")}
                                </div>
                            </Link>

                            <div className="tw-w-px tw-h-full tw-flex-none tw-bg-transparent" />
                        </div>
                    </div>
                </>
            )}

            {loadCalculatorOutputs.recommendedBatteries == null ? null : (
                <>
                    <VerticalSpacer className="tw-h-8" />

                    <div className="lg-px-screen-edge tw-w-full lg-text-title1 tw-text-center">{contentData.getContent("loadCalculatorRecommendationsS2T2")}</div>

                    <VerticalSpacer className="tw-h-6" />

                    <div className="tw-w-full tw-grid tw-grid-cols-1 tw-grid-rows-1 tw-overflow-x-auto tw-pl-6 tw-pr-[calc(1.5rem-1px)]">
                        <div className="tw-flex tw-flex-row tw-gap-x-4 lg:tw-justify-center">
                            <ItemBuilder
                                items={loadCalculatorOutputs.recommendedBatteries}
                                itemBuilder={(recommendation, recommendationIndex) => (
                                    <VerticalBatteryRecommendationCard
                                        recommendation={recommendation}
                                        userPreferences={userPreferences}
                                        key={recommendationIndex}
                                    />
                                )}
                            />

                            <Link
                                to="/inverter-batteries"
                                className="tw-w-60 tw-h-full tw-flex-none tw-flex tw-flex-col tw-items-center lg-card-shadow-hack"
                            >
                                <VerticalSpacer className="tw-h-3" />

                                <div className="tw-w-full tw-h-full lg-bg-secondary-100 tw-rounded-lg tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center tw-p-4 lg-text-title2 tw-border tw-border-solid tw-border-primary-500-light">
                                    {contentData.getContent("loadCalculatorRecommendationsS2T9")}
                                </div>
                            </Link>

                            <div className="tw-w-px tw-h-full tw-flex-none tw-bg-transparent" />
                        </div>
                    </div>
                </>
            )}

            <VerticalSpacer className="tw-h-10" />

            <DefaultElementAnimation className="lg-px-screen-edge tw-self-center">
                <Link to="/dealer-for-inverters-and-batteries">
                    <div className="lg-cta-button">{contentData.getContent("loadCalculatorRecommendationsS2CTA1")}</div>
                </Link>
            </DefaultElementAnimation>
        </div>
    );
}

function OurSuggestionsSection({userPreferences}: {userPreferences: UserPreferences}) {
    const contentData = useContext(ContentProviderContext);
    const {emblaRef, emblaApi, selectedIndex} = useEmblaCarouselWithIndex({loop: true});

    return (
        <div className="tw-flex tw-flex-col tw-justify-center">
            <div className="lg-px-screen-edge-2 lg-text-headline tw-text-center">
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent("loadCalculatorRecommendationsS3H1")}} />
                </DefaultTextAnimation>
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent("loadCalculatorRecommendationsS3H2")}} />
                </DefaultTextAnimation>
            </div>

            <VerticalSpacer className="tw-h-6" />

            <div className="tw-grid tw-grid-cols-2 tw-items-center tw-max-w-[350px] tw-min-w-[350px] tw-place-self-center">
                <button
                    type="button"
                    className={concatenateNonNullStringsWithSpaces(
                        "tw-w-full tw-py-1 tw-text-center tw-border-solid tw-border-r lg-border-secondary-900",
                        selectedIndex == 0 ? "lg-text-secondary-900 tw-underline tw-underline-offset-4" : null,
                    )}
                    onClick={() => emblaApi?.scrollTo(0)}
                >
                    {contentData.getContent("headerMenuS1T1")}
                </button>

                <button
                    type="button"
                    className={concatenateNonNullStringsWithSpaces(
                        "tw-w-full tw-py-1 tw-text-center tw-border-solid tw-border-l lg-border-secondary-900",
                        selectedIndex == 1 ? "lg-text-secondary-900 tw-underline tw-underline-offset-4" : null,
                    )}
                    onClick={() => emblaApi?.scrollTo(1)}
                >
                    {contentData.getContent("headerMenuS1T2")}
                </button>
            </div>

            <div className="tw-max-w-[350px] tw-min-w-[350px] tw-place-self-center">
                <VerticalSpacer className="tw-h-4 tw-border-solid tw-border-b lg-border-secondary-900" />
            </div>

            <VerticalSpacer className="tw-h-6" />

            <div
                className="tw-overflow-hidden"
                ref={emblaRef}
            >
                <div className="tw-grid tw-grid-flow-col tw-auto-cols-[100%]">
                    <div className="tw-h-full tw-flex tw-flex-col tw-place-self-center">
                        <OurInvertersSectionInternal userPreferences={userPreferences} />

                        <VerticalSpacer className="tw-h-4" />
                        <EmptyFlexFiller />

                        <DefaultElementAnimation className="lg-px-screen-edge tw-self-center">
                            <Link to="/inverter-for-home">
                                <div className="lg-cta-button">{contentData.getContent("loadCalculatorRecommendationsS2CTA2")}</div>
                            </Link>
                        </DefaultElementAnimation>
                    </div>

                    <div className="tw-h-full tw-flex tw-flex-col tw-place-self-center">
                        <OurBatteriesSectionInternal userPreferences={userPreferences} />

                        <VerticalSpacer className="tw-h-4" />
                        <EmptyFlexFiller />

                        <DefaultElementAnimation className="lg-px-screen-edge tw-self-center">
                            <Link to="/inverter-batteries">
                                <div className="lg-cta-button">{contentData.getContent("loadCalculatorRecommendationsS2CTA3")}</div>
                            </Link>
                        </DefaultElementAnimation>
                    </div>
                </div>
            </div>
        </div>
    );
}

function HorizontalInverterRecommendationCard({
    recommendation,
    userPreferences,
    className,
}: {
    recommendation: {
        model: string;
        score: number;
        humanFriendlyString: string;
        nBatteries: number;
        capacity: string;
        warranty: string;
    };
    userPreferences: UserPreferences;
    className?: string;
}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <a
            href={`/product/${recommendation.model}`}
            className={concatenateNonNullStringsWithSpaces("tw-w-full tw-max-w-[25rem] tw-h-full tw-flex-none tw-flex tw-flex-col tw-items-center", className)}
        >
            {/* <Link
            to={`/product/${recommendation.model}`}
            className={concatenateNonNullStringsWithSpaces("tw-w-full tw-max-w-[25rem] tw-h-full tw-flex-none tw-flex tw-flex-col tw-items-center", className)}
        > */}
            <VerticalSpacer className="tw-h-3" />

            <div className="tw-w-full tw-h-full lg-bg-secondary-100 tw-rounded-lg tw-flex tw-flex-col tw-items-center tw-text-center">
                <div className="tw-rounded-full tw-w-fit tw-px-2 tw-py-0 tw-whitespace-nowrap tw-relative tw-top-[-0.625rem]">&nbsp;</div>

                <div className="tw-w-full tw-px-4 tw-flex tw-flex-row tw-justify-center tw-gap-x-4">
                    <FixedWidthImage
                        relativePath={`/livguard/products/${recommendation.model}/thumbnail.png`}
                        width="6rem"
                    />

                    <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-y-1">
                        <FixedWidthImage
                            relativePath="/livguard/icons/capacity.png"
                            width="1.5rem"
                            className="tw-invert dark:tw-invert-0"
                        />

                        <div className="lg-text-secondary-900 lg-text-icon">
                            {recommendation.capacity}
                            {contentData.getContent("loadCalculatorRecommendationsS2T6")}
                        </div>
                    </div>

                    <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-y-1">
                        <FixedWidthImage
                            relativePath="/livguard/icons/waranty.png"
                            width="1.5rem"
                            className="tw-invert dark:tw-invert-0"
                        />

                        <div className="lg-text-secondary-900 lg-text-icon">
                            {recommendation.warranty} {contentData.getContent("loadCalculatorRecommendationsS2T7")}
                        </div>
                    </div>
                </div>

                <VerticalSpacer className="tw-h-4" />

                <div className="tw-w-full tw-px-4 tw-flex tw-flex-row tw-justify-between tw-gap-x-4">
                    <div className="lg-text-secondary-900 lg-text-body-bold">
                        {recommendation.humanFriendlyString.length > 0 ? recommendation.humanFriendlyString : convertProductInternalNameToPublicName(recommendation.model)}
                    </div>

                    <div className="lg-text-secondary-700 tw-underline tw-underline-offset-4">{contentData.getContent("loadCalculatorRecommendationsS2T3")}</div>
                </div>

                <VerticalSpacer className="tw-h-4" />
            </div>
            {/* </Link> */}
        </a>
    );
}

function HorizontalBatteryRecommendationCard({
    recommendation,
    userPreferences,
    className,
}: {
    recommendation: {
        model: string;
        score: number;
        humanFriendlyString: string;
        nBatteries: number;
        capacity: string;
        warranty: string;
    };
    userPreferences: UserPreferences;
    className?: string;
}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <a
            href={`/product/${recommendation.model}`}
            className={concatenateNonNullStringsWithSpaces("tw-w-full tw-max-w-[25rem] tw-h-full tw-flex-none tw-flex tw-flex-col tw-items-center", className)}
        >
            {/* <Link
            to={`/product/${recommendation.model}`}
            className={concatenateNonNullStringsWithSpaces("tw-w-full tw-max-w-[25rem] tw-h-full tw-flex-none tw-flex tw-flex-col tw-items-center", className)}
        > */}
            <VerticalSpacer className="tw-h-3" />

            <div className="tw-w-full tw-h-full lg-bg-secondary-100 tw-rounded-lg tw-flex tw-flex-col tw-items-center tw-text-center">
                <div className="lg-bg-secondary-500 tw-text-secondary-900-dark tw-rounded-full tw-w-fit tw-px-2 tw-py-0 tw-whitespace-nowrap tw-relative tw-top-[-0.625rem]">
                    {contentData.getContent("313dd4e5-acd4-4f7c-a48c-0fe0379f1b5e")} x{recommendation.nBatteries}
                </div>

                <div className="tw-w-full tw-px-4 tw-flex tw-flex-row tw-justify-center tw-gap-x-4">
                    <FixedWidthImage
                        relativePath={`/livguard/products/${recommendation.model}/thumbnail.png`}
                        width="6rem"
                    />

                    <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-y-1">
                        <FixedWidthImage
                            relativePath="/livguard/icons/battery_capacity.png"
                            width="1.25rem"
                            className="tw-invert dark:tw-invert-0"
                        />

                        <div className="lg-text-secondary-900 lg-text-icon">
                            {recommendation.capacity}
                            {contentData.getContent("loadCalculatorRecommendationsS2T8")}
                        </div>
                    </div>

                    <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-y-1">
                        <FixedWidthImage
                            relativePath="/livguard/icons/waranty.png"
                            width="1.5rem"
                            className="tw-invert dark:tw-invert-0"
                        />

                        <div className="lg-text-secondary-900 lg-text-icon">
                            {recommendation.warranty} {contentData.getContent("loadCalculatorRecommendationsS2T10")}
                        </div>
                    </div>
                </div>

                <VerticalSpacer className="tw-h-4" />

                <div className="tw-w-full tw-px-4 tw-flex tw-flex-row tw-justify-between tw-gap-x-4">
                    <div className="lg-text-secondary-900 lg-text-body-bold">
                        {recommendation.humanFriendlyString.length > 0 ? recommendation.humanFriendlyString : convertProductInternalNameToPublicName(recommendation.model)}
                    </div>

                    <div className="lg-text-secondary-700 tw-underline tw-underline-offset-4">{contentData.getContent("loadCalculatorRecommendationsS2T3")}</div>
                </div>

                <VerticalSpacer className="tw-h-4" />
            </div>
            {/* </Link> */}
        </a>
    );
}

function VerticalInverterRecommendationCard({
    recommendation,
    userPreferences,
    className,
}: {
    recommendation: {
        model: string;
        score: number;
        humanFriendlyString: string;
        nBatteries: number;
        capacity: string;
        warranty: string;
    };
    toastMessage?: string;
    userPreferences: UserPreferences;
    className?: string;
}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <a
            href={`/product/${recommendation.model}`}
            className={concatenateNonNullStringsWithSpaces("lg-card-shadow-hack tw-w-60 tw-h-full tw-flex-none tw-flex tw-flex-col tw-items-center", className)}
        >
            {/* <Link
            to={`/product/${recommendation.model}`}
            className={concatenateNonNullStringsWithSpaces("tw-w-60 tw-h-full tw-flex-none tw-flex tw-flex-col tw-items-center", className)}
        > */}
            <VerticalSpacer className="tw-h-3" />

            <div className="tw-w-full tw-h-full lg-bg-secondary-100 lg-card tw-rounded-lg tw-flex tw-flex-col tw-items-center tw-text-center">
                <div className="lg-cta-button tw-w-fit tw-px-2 tw-py-0 tw-whitespace-nowrap tw-relative -tw-top-3">
                    {recommendation.score}/10 {contentData.getContent("loadCalculatorRecommendationsS2T4")}
                </div>

                <VerticalSpacer className="tw-h-4" />

                {/* TODO: Temp hack */}
                {/* <div className="lg-text-secondary-900">{recommendation.humanFriendlyString}</div> */}
                <div className="lg-text-secondary-900 tw-px-4 lg-text-body-bold">
                    {recommendation.humanFriendlyString.length > 0 ? recommendation.humanFriendlyString : convertProductInternalNameToPublicName(recommendation.model)}
                </div>

                <VerticalSpacer className="tw-h-2" />

                <div className="tw-w-full tw-px-4 tw-flex tw-flex-row tw-justify-center tw-items-center tw-gap-x-1">
                    <FixedWidthImage
                        relativePath="/livguard/icons/capacity.png"
                        width="1.5rem"
                        className="tw-invert dark:tw-invert-0"
                    />

                    <div className="lg-text-secondary-900 lg-text-icon">
                        {recommendation.capacity}
                        {contentData.getContent("loadCalculatorRecommendationsS2T6")}
                    </div>
                </div>

                <VerticalSpacer className="tw-h-2" />

                <div className="tw-w-full tw-px-4 tw-flex tw-flex-row tw-justify-center tw-items-center tw-gap-x-1">
                    <FixedWidthImage
                        relativePath="/livguard/icons/waranty.png"
                        width="1.5rem"
                        className="tw-invert dark:tw-invert-0"
                    />

                    <div className="lg-text-secondary-900 lg-text-icon">
                        {recommendation.warranty}

                        {contentData.getContent("loadCalculatorRecommendationsS2T7")}
                    </div>
                </div>

                <VerticalSpacer className="tw-h-4" />

                {/* TODO: Temp hack, remove once we fix product image! */}
                <FullWidthImage relativePath={`/livguard/products/${recommendation.model}/thumbnail.png`} />

                {/* <div className="tw-w-full tw-aspect-[5/3]">
                    <CoverImage
                        relativePath={`/livguard/products/${recommendation.model}/thumbnail.png`}
                    />
                </div> */}

                <EmptyFlexFiller />

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-secondary-700 tw-underline tw-underline-offset-4">{contentData.getContent("loadCalculatorRecommendationsS2T3")}</div>

                <VerticalSpacer className="tw-h-4" />
            </div>
            {/* </Link> */}
        </a>
    );
}

function VerticalBatteryRecommendationCard({
    recommendation,
    userPreferences,
    className,
}: {
    recommendation: {
        model: string;
        score: number;
        humanFriendlyString: string;
        nBatteries: number;
        capacity: number;
        warranty: number;
    };
    toastMessage?: string;
    userPreferences: UserPreferences;
    className?: string;
}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <a
            href={`/product/${recommendation.model}`}
            className={concatenateNonNullStringsWithSpaces("lg-card-shadow-hack tw-w-60 tw-h-full tw-flex-none tw-flex tw-flex-col tw-items-center", className)}
        >
            {/* <Link
            to={`/product/${recommendation.model}`}
            className={concatenateNonNullStringsWithSpaces("tw-w-60 tw-h-full tw-flex-none tw-flex tw-flex-col tw-items-center", className)}
        > */}
            <VerticalSpacer className="tw-h-3" />

            <div className="tw-w-full tw-h-full lg-bg-secondary-100 lg-card tw-rounded-lg tw-flex tw-flex-col tw-items-center tw-text-center">
                <div className="lg-cta-button tw-w-fit tw-px-2 tw-py-0 tw-whitespace-nowrap tw-relative -tw-top-3">
                    {recommendation.score}/10 {contentData.getContent("loadCalculatorRecommendationsS2T4")}
                </div>

                <VerticalSpacer className="tw-h-4" />

                {/* TODO: Temp hack */}
                {/* <div className="lg-text-secondary-900">{recommendation.humanFriendlyString}</div> */}
                <div className="lg-text-secondary-900 tw-px-4 lg-text-body-bold">
                    {recommendation.humanFriendlyString.length > 0 ? recommendation.humanFriendlyString : convertProductInternalNameToPublicName(recommendation.model)}
                </div>

                <VerticalSpacer className="tw-h-2" />

                <div className="tw-w-full tw-px-4 tw-flex tw-flex-row tw-justify-center tw-items-center tw-gap-x-1">
                    <FixedWidthImage
                        relativePath="/livguard/icons/battery_capacity.png"
                        width="1.25rem"
                        className="tw-invert dark:tw-invert-0"
                    />

                    <div className="lg-text-secondary-900 lg-text-icon">
                        {recommendation.capacity}
                        {contentData.getContent("loadCalculatorRecommendationsS2T8")}
                    </div>
                </div>

                <VerticalSpacer className="tw-h-2" />

                <div className="tw-w-full tw-px-4 tw-flex tw-flex-row tw-justify-center tw-items-center tw-gap-x-1">
                    <FixedWidthImage
                        relativePath="/livguard/icons/waranty.png"
                        width="1.5rem"
                        className="tw-invert dark:tw-invert-0"
                    />

                    <div className="lg-text-secondary-900 lg-text-icon">
                        {recommendation.warranty} {contentData.getContent("loadCalculatorRecommendationsS2T10")}
                    </div>
                </div>

                <VerticalSpacer className="tw-h-4" />

                <FullWidthImage relativePath={`/livguard/products/${recommendation.model}/thumbnail.png`} />

                <EmptyFlexFiller />

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-secondary-700 tw-underline tw-underline-offset-4">{contentData.getContent("loadCalculatorRecommendationsS2T3")}</div>

                <VerticalSpacer className="tw-h-4" />
            </div>
            {/* </Link> */}
        </a>
    );
}
