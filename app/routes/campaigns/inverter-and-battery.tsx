import {CheckCircleIcon, ChevronDoubleDownIcon, XCircleIcon} from "@heroicons/react/20/solid";
import type {LoaderFunction, V2_MetaFunction} from "@remix-run/node";
import type {FetcherWithComponents} from "@remix-run/react";
import {Link, useFetcher} from "@remix-run/react";
import {useEffect, useReducer, useRef, useState, useContext} from "react";
import {useInView} from "react-intersection-observer";
import {useLoaderData} from "react-router";
import {toast} from "react-toastify";
import {CarouselStyle5} from "~/components/carouselStyle5";
import {ContactForm} from "~/components/contactUsForm";
import {ContactFormSuccess} from "~/components/contactUsFormSuccess";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {FaqSectionInternal} from "~/components/faqs";
import {CoverImage} from "~/components/images/coverImage";
import {FixedWidthImage} from "~/components/images/fixedWidthImage";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {StickyLandingPageBottomBar} from "~/components/landingPageBottomBar";
import {SecondaryNavigationControllerContext} from "~/contexts/secondaryNavigationControllerContext";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {SecondaryNavigation} from "~/components/secondaryNavigation";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {ImageCdnProvider, type Uuid} from "~/common--type-definitions/typeDefinitions";
import {concatenateNonNullStringsWithSpaces, generateUuid} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {SecondaryNavigationController, useSecondaryNavigationController} from "~/hooks/useSecondaryNavigationController";
import {EnergySolutions, TransformingLives} from "~/routes";
import {CampaignPageScaffold} from "~/routes/campaigns/campaignPageScaffold.component";
import {ContactFormSection, PowerPlanner, QualityMeetsExpertise} from "~/routes/campaigns/energy-storage-solution";
import type {FormStateInputs, FormStateInputsAction} from "~/routes/lead-form.state";
import {FormStateInputsActionType, FormStateInputsReducer, createInitialFormState} from "~/routes/lead-form.state";
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
                href: "https://www.livguard.com/campaigns/inverter-and-battery/",
            },
            {
                title: "Best in Class Livgaurd Home Inverters and Batteries",
            },
            {
                name: "description",
                content: "Power up your home with long-lasting Livguard smart inverters and inverter batteries. Explore our wide range of energy storage solutions",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/campaigns/inverter-and-battery/",
            },
            {
                property: "og:title",
                content: "Best in Class Livgaurd Home Inverters and Batteries",
            },
            {
                property: "og:description",
                content: "Power up your home with long-lasting Livguard smart inverters and inverter batteries. Explore our wide range of energy storage solutions",
            },
            {
                property: "og:site_name",
                content: "Livguard",
            },
            {
                property: "og:type",
                content: "Website",
            },
            {
                property: "og:image",
                content: `${getAbsolutePathForRelativePath(getMetadataForImage("/livguard/terms-and-conditions/og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null)}`,
            },
            {
                "script:ld+json": {
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    name: "Inverter and Battery Combo",
                    url: "https://www.livguard.com/campaigns/inverter-and-battery-jodi/",
                    logo: "",
                    sameAs: "",
                },
            },
        ];
    } else if (userPreferences.language == Language.Hindi) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/campaigns/inverter-and-battery/",
            },
            {
                title: "श्रेणी में सर्वश्रेष्ठ लिवगर्ड होम इनवर्टर और बैटरी देखे",
            },
            {
                name: "description",
                content: "लंबे समय तक चलने वाले लिवगार्ड स्मार्ट इनवर्टर और इनवर्टर बैटरी से अपने घर को ऊर्जा दें। ऊर्जा संग्रहण समाधानों की हमारी विस्तृत श्रृंखला का अन्वेषण करें",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/campaigns/inverter-and-battery/",
            },
            {
                property: "og:title",
                content: "श्रेणी में सर्वश्रेष्ठ लिवगर्ड होम इनवर्टर और बैटरी देखे",
            },
            {
                property: "og:description",
                content: "लंबे समय तक चलने वाले लिवगार्ड स्मार्ट इनवर्टर और इनवर्टर बैटरी से अपने घर को ऊर्जा दें। ऊर्जा संग्रहण समाधानों की हमारी विस्तृत श्रृंखला का अन्वेषण करें",
            },
            {
                property: "og:site_name",
                content: "Livguard",
            },
            {
                property: "og:type",
                content: "Website",
            },
            {
                property: "og:image",
                content: `${getAbsolutePathForRelativePath(getMetadataForImage("/livguard/terms-and-conditions/og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null)}`,
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

export default function () {
    const {userPreferences, redirectTo, pageUrl} = useLoaderData() as LoaderData;

    const utmSearchParameters = useUtmSearchParameters();

    const secondaryNavigationController = useSecondaryNavigationController();

    return (
        <>
            <CampaignPageScaffold
                userPreferences={userPreferences}
                redirectTo={redirectTo}
                showMobileMenuIcon={false}
                utmParameters={utmSearchParameters}
                showContactCtaButton={false}
                showSearchOption={true}
                pageUrl={pageUrl}
                secondaryNavigationController={secondaryNavigationController}
            >
                <SecondaryNavigationControllerContext.Provider value={secondaryNavigationController}>
                    <LandingPage
                        userPreferences={userPreferences}
                        utmParameters={utmSearchParameters}
                        pageUrl={pageUrl}
                        secondaryNavigationController={secondaryNavigationController}
                    />
                </SecondaryNavigationControllerContext.Provider>
            </CampaignPageScaffold>

            <StickyLandingPageBottomBar userPreferences={userPreferences} />
        </>
    );
}

function LandingPage({
    userPreferences,
    utmParameters,
    pageUrl,
    secondaryNavigationController,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
    pageUrl: string;
    secondaryNavigationController?: SecondaryNavigationController;
}) {
    const fetcher = useFetcher();
    const otpFetcher = useFetcher();
    const leadId = useRef<Uuid>(generateUuid());

    const [formStateInputs, dispatch] = useReducer(FormStateInputsReducer, createInitialFormState());

    useEffect(() => {
        if (fetcher.data == null) {
            return;
        }

        if (fetcher.data.error != null) {
            toast.error(fetcher.data.error);
            const action: FormStateInputsAction = {
                actionType: FormStateInputsActionType.SetInvalidOtp,
                payload: true,
            };
            dispatch(action);
            return;
        }

        const action: FormStateInputsAction = {
            actionType: FormStateInputsActionType.SetFormSuccessfullySubmited,
            payload: true,
        };
        dispatch(action);
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({event: "submit"});
        return;
    }, [fetcher.data]);

    useEffect(() => {
        if (otpFetcher.data == null) {
            return;
        } else if (otpFetcher.data.error != null) {
            toast.error(otpFetcher.data.error);
            return;
        }
        if (formStateInputs.isOtpresent) {
            toast.success("OTP resent successfully");
        } else {
            toast.success("OTP sent successfully");
        }
    }, [otpFetcher.data]);

    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);
    useEffect(() => {
        if (formStateInputs.resendTimeOut > 0 && formStateInputs.showOtpField) {
            if (timeoutId != null) {
                clearTimeout(timeoutId);
            }
            let timeout = setTimeout(() => {
                const action: FormStateInputsAction = {
                    actionType: FormStateInputsActionType.SetResendTimeOut,
                    payload: formStateInputs.resendTimeOut - 1,
                };
                dispatch(action);
            }, 1000);
            setTimeoutId(timeout);
        }
    }, [formStateInputs.resendTimeOut]);

    const utmSearchParameters = useUtmSearchParameters();

    const isScreenSizeBelow = useIsScreenSizeBelow(1024);

    return (
        <div className="tw-grid tw-grid-rows-1 tw-grid-cols-1 lg:tw-grid-rows-1 lg:tw-grid-cols-[minmax(0,1fr),minmax(0,1fr)] tw-gap-x-1 tw-align-stretch">
            <HeroSection
                userPreferences={userPreferences}
                className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
                fetcher={fetcher}
                otpFetcher={otpFetcher}
                utmParameters={utmSearchParameters}
                formStateInputs={formStateInputs}
                dispatch={dispatch}
                leadId={leadId.current}
                pageUrl={pageUrl}
            />

            <VerticalSpacer className="tw-row-start-2 lg:tw-row-start-3 tw-col-start-1 lg:tw-col-span-full tw-h-10 lg:tw-h-20" />

            {isScreenSizeBelow && (
                <>
                    <ContactFormSection
                        userPreferences={userPreferences}
                        fetcher={fetcher}
                        otpFetcher={otpFetcher}
                        utmParameters={utmSearchParameters}
                        formStateInputs={formStateInputs}
                        dispatch={dispatch}
                        leadId={leadId.current}
                        pageUrl={pageUrl}
                        className="tw-row-start-3 tw-col-start-1 lg:tw-hidden"
                    />
                </>
            )}

            <VerticalSpacer className="tw-row-start-4 tw-col-start-1 tw-h-10 lg:tw-hidden" />

            <EnergySolutions
                userPreferences={userPreferences}
                className="tw-row-start-5 tw-col-start-1 lg:tw-row-start-4 lg:tw-col-start-1 lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-row-start-6 lg:tw-row-start-[5] lg:tw-col-span-full lg:tw-h-20 tw-h-10" />

            {isScreenSizeBelow && (
                <>
                    <div className="tw-grid tw-grid-rows-[auto,auto,auto] tw-grid-cols-1 lg:tw-grid-rows-1 lg:tw-grid-cols-[minmax(0,4fr),minmax(0,3fr)] tw-row-start-7 tw-col-start-1 lg:tw-row-start-5 lg:tw-col-span-full">
                        <ComboSection
                            userPreferences={userPreferences}
                            className="tw-row-start-1 tw-col-start-1 lg:tw-pl-[72px] xl:tw-pl-[120px]"
                        />

                        <VerticalSpacer className="tw-h-10 tw-row-start-2 lg:tw-hidden" />

                        <WhyLivguardCombo
                            userPreferences={userPreferences}
                            className="tw-row-start-3 lg:tw-row-start-1 lg:tw-col-start-2 lg:tw-pr-[72px] xl:tw-pr-[120px]"
                        />
                    </div>

                    <VerticalSpacer className="tw-row-start-[8] tw-h-10 lg:tw-row-start-[6] lg:tw-col-span-full lg:tw-h-20" />

                    <PowerPlanner
                        userPreferences={userPreferences}
                        className="tw-row-start-9 tw-col-start-1 lg:tw-row-start-7 lg:tw-col-span-full lg:tw-px-[120px]"
                    />
                </>
            )}

            <VerticalSpacer className="tw-row-start-[10] tw-col-start-1 tw-h-10 lg:tw-row-start-[8] lg:tw-col-span-full lg:tw-h-20" />

            <QualityMeetsExpertise
                userPreferences={userPreferences}
                className="tw-row-start-[11] tw-col-start-1 lg:tw-col-span-full lg:tw-row-start-4 lg:tw-col-start-2 lg:tw-pr-[72px] xl:tw-pr-[120px]"
            />
            {!isScreenSizeBelow && (
                <>
                    <div className="tw-grid tw-grid-rows-1 tw-grid-cols-[minmax(0,4fr),minmax(0,3fr)] tw-col-start-1 tw-row-start-6 lg:tw-col-span-full">
                        <ComboSection
                            userPreferences={userPreferences}
                            className="tw-row-start-1 tw-col-start-1 lg:tw-pl-[72px] xl:tw-pl-[120px]"
                        />

                        <WhyLivguardCombo
                            userPreferences={userPreferences}
                            className="tw-row-start-1 tw-col-start-2 lg:tw-pr-[72px] xl:tw-pr-[120px]"
                        />
                    </div>

                    <VerticalSpacer className="tw-row-start-[7] lg:tw-col-span-full lg:tw-h-20" />

                    <PowerPlanner
                        userPreferences={userPreferences}
                        className="tw-col-start-1 tw-row-start-8 lg:tw-col-span-full lg:tw-px-[120px]"
                    />
                </>
            )}

            <VerticalSpacer className="tw-row-start-[12] tw-col-start-1 tw-h-10 lg:tw-row-start-[9] lg:tw-col-span-full lg:tw-h-20" />

            <ExploreStarProducts
                userPreferences={userPreferences}
                className="tw-row-start-[13] tw-col-start-1 lg:tw-row-start-[10] lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-row-start-[14] tw-col-start-1 tw-h-10 lg:tw-row-start-[11] lg:tw-col-span-full lg:tw-h-20" />

            <TransformingLives
                userPreferences={userPreferences}
                className="tw-row-start-[15] tw-col-start-1 lg:tw-row-start-[12] lg:tw-col-span-full lg:tw-pl-[72px] xl:tw-pl-[120px]"
            />

            <VerticalSpacer className="tw-row-start-[16] tw-col-start-1 tw-h-10 lg:tw-row-start-[13] lg:tw-col-span-full lg:tw-h-20" />

            <FaqSection
                userPreferences={userPreferences}
                className="tw-row-start-[17] tw-col-start-1 lg:tw-row-start-[14] lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-row-start-[18] tw-col-start-1 tw-h-10 lg:tw-row-start-[15] lg:tw-col-span-full lg:tw-h-20" />
        </div>
    );
}

function HeroSection({
    userPreferences,
    className,
    fetcher,
    otpFetcher,
    utmParameters,
    formStateInputs,
    dispatch,
    leadId,
    pageUrl,
}: {
    userPreferences: UserPreferences;
    className?: string;
    fetcher: FetcherWithComponents<any>;
    otpFetcher: FetcherWithComponents<any>;
    utmParameters: {
        [searchParameter: string]: string;
    };
    formStateInputs: FormStateInputs;
    dispatch: React.Dispatch<FormStateInputsAction>;
    leadId: Uuid;
    pageUrl: string;
}) {
    // const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    // const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    // useEffect(() => {
    //     secondaryNavigationController.setSections((previousSections) => ({
    //         ...previousSections,
    //         top: {
    //             humanReadableName: getVernacularString("9fc64723-0e15-4211-983a-ba03cf9a4d41", userPreferences.language),
    //             isCurrentlyVisible: sectionInView,
    //         },
    //     }));
    // }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height)-7.5rem)] lg:tw-h-[calc(100vh-9rem)] tw-min-h-[calc(100vw*7/16)] tw-grid tw-grid-rows-[1.5rem_3rem_minmax(0,1fr)_auto_0.5rem_auto_1rem_auto_1rem_minmax(0,1fr)_auto_1.5rem] tw-justify-items-center tw-text-center lg:tw-text-left tw-relative lg:tw-grid-cols-2 tw-isolate",
                className,
            )}
            // id="top"
            // ref={sectionRef}
        >
            <CoverImage
                relativePath="/livguard/landing-pages/2/hero_image.jpg"
                className="tw-row-[1/span_12] tw-col-start-1 lg:tw-col-span-full -tw-z-10"
            />

            <DefaultTextAnimation className="tw-row-start-4 tw-col-start-1 lg:tw-place-self-start lg:tw-col-start-1">
                <div
                    dangerouslySetInnerHTML={{__html: getVernacularString("landingPage2S1T1", userPreferences.language)}}
                    className="lg-text-banner lg-px-screen-edge tw-text-white lg:tw-pl-[120px]"
                />
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-6 tw-col-start-1 lg:tw-place-self-start lg:tw-max-w-[620px] lg:tw-col-start-1">
                <div
                    dangerouslySetInnerHTML={{__html: getVernacularString("landingPage2S1T2", userPreferences.language)}}
                    className="lg-text-title1 lg-px-screen-edge tw-text-white lg:tw-pl-[120px]"
                />
            </DefaultTextAnimation>

            <DefaultElementAnimation className="tw-row-[8] tw-col-start-1 lg:tw-place-self-start lg:tw-pl-[120px] lg:tw-col-start-1 lg:tw-hidden">
                <Link
                    to="#contact-us-form-mobile"
                    className="lg-cta-button lg-px-screen-edge lg:tw-pl-[60px]"
                >
                    {getVernacularString("landingPage2S1T3", userPreferences.language)}
                </Link>
            </DefaultElementAnimation>

            <div className="tw-row-[11] tw-col-start-1 tw-col-span-full">
                <Link
                    to="#contact-us-form-mobile"
                    className="tw-block lg:tw-hidden"
                >
                    <ChevronDoubleDownIcon className="tw-w-12 tw-h-12 lg-text-primary-500 tw-animate-bounce" />
                </Link>

                <Link
                    to="#energy-solutions"
                    className="tw-hidden lg:tw-block"
                >
                    <ChevronDoubleDownIcon className="tw-w-12 tw-h-12 lg-text-primary-500 tw-animate-bounce" />
                </Link>
            </div>

            <div className="tw-hidden lg:tw-flex lg:tw-items-center lg:tw-justify-center lg:tw-col-start-2 lg:tw-row-start-1 lg:tw-row-span-full">
                {!formStateInputs.formSuccessfullySubmitted ? (
                    <ContactForm
                        userPreferences={userPreferences}
                        fetcher={fetcher}
                        otpFetcher={otpFetcher}
                        utmParameters={utmParameters}
                        formStateInputs={formStateInputs}
                        dispatch={dispatch}
                        leadId={leadId}
                        pageUrl={pageUrl}
                    />
                ) : (
                    <ContactFormSuccess userPreferences={userPreferences} />
                )}
            </div>
        </div>
    );
}

export function ComboSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const comboData: Array<{
        title: string;
        description: string;
        keySpecifications: Array<{keySpecificationContent: string; keySpecificationIconRelativePath: string}>;
        comboImageRelativePath: string;
    }> = [
        {
            title: `${getVernacularString("landingPage2S4J1Title", userPreferences.language)}`,
            description: `${getVernacularString("landingPage2S4J1Description", userPreferences.language)}`,
            keySpecifications: [
                {
                    keySpecificationContent: `${getVernacularString("landingPage2S4J1Specification1Content", userPreferences.language)}`,
                    keySpecificationIconRelativePath: "/livguard/inverter-batteries/4/home-warranty.svg",
                },
                {
                    keySpecificationContent: `${getVernacularString("landingPage2S4J1Specification2Content", userPreferences.language)}`,
                    keySpecificationIconRelativePath: "/livguard/icons/battery_capacity.png",
                },
                {
                    keySpecificationContent: `${getVernacularString("landingPage2S4J1Specification3Content", userPreferences.language)}`,
                    keySpecificationIconRelativePath: "/livguard/inverter-batteries/4/inverter-capacity.svg",
                },
                {
                    keySpecificationContent: `${getVernacularString("landingPage2S4J1Specification4Content", userPreferences.language)}`,
                    keySpecificationIconRelativePath: "/livguard/icons/technology.png",
                },
            ],
            comboImageRelativePath: "/livguard/products/urban-combo/thumbnail.png",
        },
        {
            title: `${getVernacularString("landingPage2S4J2Title", userPreferences.language)}`,
            description: `${getVernacularString("landingPage2S4J2Description", userPreferences.language)}`,
            keySpecifications: [
                {
                    keySpecificationContent: `${getVernacularString("landingPage2S4J2Specification1Content", userPreferences.language)}`,
                    keySpecificationIconRelativePath: "/livguard/inverter-batteries/4/home-warranty.svg",
                },
                {
                    keySpecificationContent: `${getVernacularString("landingPage2S4J2Specification2Content", userPreferences.language)}`,
                    keySpecificationIconRelativePath: "/livguard/icons/battery_capacity.png",
                },
                {
                    keySpecificationContent: `${getVernacularString("landingPage2S4J2Specification3Content", userPreferences.language)}`,
                    keySpecificationIconRelativePath: "/livguard/inverter-batteries/4/inverter-capacity.svg",
                },
                {
                    keySpecificationContent: `${getVernacularString("landingPage2S4J2Specification4Content", userPreferences.language)}`,
                    keySpecificationIconRelativePath: "/livguard/icons/technology.png",
                },
            ],
            comboImageRelativePath: "/livguard/products/peace-of-mind-combo/thumbnail.png",
        },
        {
            title: `${getVernacularString("landingPage2S4J3Title", userPreferences.language)}`,
            description: `${getVernacularString("landingPage2S4J3Description", userPreferences.language)}`,
            keySpecifications: [
                {
                    keySpecificationContent: `${getVernacularString("landingPage2S4J3Specification1Content", userPreferences.language)}`,
                    keySpecificationIconRelativePath: "/livguard/inverter-batteries/4/home-warranty.svg",
                },
                {
                    keySpecificationContent: `${getVernacularString("landingPage2S4J3Specification2Content", userPreferences.language)}`,
                    keySpecificationIconRelativePath: "/livguard/icons/battery_capacity.png",
                },
                {
                    keySpecificationContent: `${getVernacularString("landingPage2S4J3Specification3Content", userPreferences.language)}`,
                    keySpecificationIconRelativePath: "/livguard/inverter-batteries/4/inverter-capacity.svg",
                },
                {
                    keySpecificationContent: `${getVernacularString("landingPage2S4J3Specification4Content", userPreferences.language)}`,
                    keySpecificationIconRelativePath: "/livguard/icons/technology.png",
                },
            ],
            comboImageRelativePath: "/livguard/products/super-life-combo/thumbnail.png",
        },
        {
            title: `${getVernacularString("landingPage2S4J4Title", userPreferences.language)}`,
            description: `${getVernacularString("landingPage2S4J4Description", userPreferences.language)}`,
            keySpecifications: [
                {
                    keySpecificationContent: `${getVernacularString("landingPage2S4J4Specification1Content", userPreferences.language)}`,
                    keySpecificationIconRelativePath: "/livguard/inverter-batteries/4/home-warranty.svg",
                },
                {
                    keySpecificationContent: `${getVernacularString("landingPage2S4J4Specification2Content", userPreferences.language)}`,
                    keySpecificationIconRelativePath: "/livguard/icons/battery_capacity.png",
                },
                {
                    keySpecificationContent: `${getVernacularString("landingPage2S4J4Specification3Content", userPreferences.language)}`,
                    keySpecificationIconRelativePath: "/livguard/inverter-batteries/4/inverter-capacity.svg",
                },
                {
                    keySpecificationContent: `${getVernacularString("landingPage2S4J4Specification4Content", userPreferences.language)}`,
                    keySpecificationIconRelativePath: "/livguard/icons/technology.png",
                },
            ],
            comboImageRelativePath: "/livguard/products/urban-combo/thumbnail.png",
        },
    ];
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "our-top-combo": {
                humanReadableName: getVernacularString("1f5379fc-7cc5-40f6-8715-6a86a77073cc", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center", className)}
            id="our-top-combo"
            ref={sectionRef}
        >
            <div className="">
                <div className="lg-text-headline lg-px-screen-edge">
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("landingPage2S4HT1", userPreferences.language)}} />
                    </DefaultTextAnimation>
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("landingPage2S4HT2", userPreferences.language)}} />
                    </DefaultTextAnimation>
                </div>

                <VerticalSpacer className="tw-h-6" />
            </div>

            {/* <ComboCarousel
                userPreferences={userPreferences}
                items={comboData}
            /> */}
            <CarouselStyle5
                items={comboData.map((comboData, comboDataIndex) => (
                    <BatteryCard
                        name={comboData.title}
                        description={comboData.description}
                        imageRelativeUrl={comboData.comboImageRelativePath}
                        warranty={comboData.keySpecifications[0].keySpecificationContent}
                        capacity={comboData.keySpecifications[2].keySpecificationContent}
                        rating={comboData.keySpecifications[1].keySpecificationContent}
                        technology={comboData.keySpecifications[3].keySpecificationContent}
                        userPreferences={userPreferences}
                        batterySlug="/"
                        key={comboDataIndex}
                        buttonTextVernacId="da0c3ceb-64b6-40b0-8b87-b14e68a03dc6"
                    />
                ))}
                slidesContainerClassName="!tw-auto-cols-[100%] lg:!tw-auto-cols-max tw-place-self-center tw-items-center"
                selectedContainerClassName="tw-h-full"
                deselectedContainersClassName="tw-scale-[0.9] tw-h-full"
                autoplayDelay={null}
            />
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
    rating,
    technology,
    buttonTextVernacId,
}: {
    userPreferences: UserPreferences;
    batterySlug: string;
    imageRelativeUrl: string;
    name: string;
    description: string;
    warranty: string;
    capacity: string;
    rating: string;
    technology: string;
    buttonTextVernacId?: string;
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
                    <button className="lg-cta-button">
                        {buttonTextVernacId == null
                            ? getVernacularString("063dc56b-910e-4a48-acb8-8f52668a4c72", userPreferences.language)
                            : getVernacularString(buttonTextVernacId, userPreferences.language)}
                    </button>
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
                            <img
                                src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/two-wheeler/3/warranty-icon.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
                                alt="warranty"
                            />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)] tw-justify-self-start">
                            <div className="tw-row-start-2 tw-font-bold tw-text-left">{getVernacularString("2c6dc668-49ef-4913-88c1-904d6e9be1a2", userPreferences.language)}</div>
                            <div className="tw-row-start-3 tw-text-left">{warranty}</div>
                        </div>
                    </div>

                    <div className="tw-row-start-1 tw-col-start-2 md:max-lg:tw-w-full md:max-lg:tw-row-start-2 md:max-lg:tw-col-start-1 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img
                                src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/two-wheeler/3/capacity-icon.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
                                alt="capacity"
                            />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)] tw-justify-self-start">
                            <div className="tw-row-start-2 tw-font-bold">{getVernacularString("landingPage2S4Specification2Title", userPreferences.language)}</div>
                            <div className="tw-row-start-3">{rating}</div>
                        </div>
                    </div>

                    <div className="tw-row-start-2 tw-col-start-1 md:max-lg:tw-w-full md:max-lg:tw-row-start-3 md:max-lg:tw-col-start-1 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img
                                src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/two-wheeler/3/polarity-icon.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
                                alt="polarity"
                            />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)] tw-justify-self-start">
                            <div className="tw-row-start-2 tw-font-bold">{getVernacularString("c73ece31-e0c3-4b1f-94c5-51d742ae3186", userPreferences.language)}</div>
                            <div className="tw-row-start-3">{capacity}</div>
                        </div>
                    </div>

                    <div className="tw-row-start-2 tw-col-start-2 md:max-lg:tw-w-full md:max-lg:tw-row-start-4 md:max-lg:tw-col-start-1 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-x-2">
                        <div className="tw-place-self-center tw-row-start-1 tw-col-start-1 tw-h-10 tw-w-10 lg-bg-primary-500 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-p-1">
                            <img
                                src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/two-wheeler/3/dimensions-icon.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
                                alt="dimension"
                            />
                        </div>

                        <div className="tw-row-start-1 tw-col-start-2 tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_minmax(0,1fr)] tw-justify-self-start">
                            <div className="tw-row-start-2 tw-font-bold">{getVernacularString("categoryInvertersS3R2C1", userPreferences.language)}</div>
                            <div className="tw-row-start-3">{technology}</div>
                        </div>
                    </div>
                </div>

                <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

                <Link
                    className="tw-place-self-center lg:tw-hidden"
                    to={batterySlug}
                >
                    <button className="lg-cta-button">
                        {buttonTextVernacId == null
                            ? getVernacularString("063dc56b-910e-4a48-acb8-8f52668a4c72", userPreferences.language)
                            : getVernacularString(buttonTextVernacId, userPreferences.language)}
                    </button>
                    {/* <button className="lg-cta-button">{buttonTextVernacId == null ? getVernacularString("063dc56b-910e-4a48-acb8-8f52668a4c72", userPreferences.language) : getVernacularString("buttonTextVernacId", userPreferences.language)}</button> */}
                </Link>

                <VerticalSpacer className="tw-h-4 lg:tw-hidden" />
            </div>
        </div>
    );
}

export function WhyLivguardCombo({userPreferences, className}: {userPreferences: UserPreferences; className: string}) {
    const sectionData = [
        {
            image: "/livguard/products/urban-combo/thumbnail.png",
            title: `${getVernacularString("landingPage2S5LivH", userPreferences.language)}`,
            content1: `${getVernacularString("landingPage2S5T1", userPreferences.language)}`,
            content2: `${getVernacularString("landingPage2S5T2", userPreferences.language)}`,
            content3: `${getVernacularString("landingPage2S5T3", userPreferences.language)}`,
            content4: `${getVernacularString("landingPage2S5T4", userPreferences.language)}`,
            highlighted: true,
        },
        {
            image: "/livguard/landing-pages/2/other_brands.png",
            title: `${getVernacularString("landingPage2S5OBH", userPreferences.language)}`,
            content1: `${getVernacularString("landingPage2S5T1", userPreferences.language)}`,
            content2: `${getVernacularString("landingPage2S5T2", userPreferences.language)}`,
            content3: `${getVernacularString("landingPage2S5T3", userPreferences.language)}`,
            content4: `${getVernacularString("landingPage2S5T4", userPreferences.language)}`,
            highlighted: false,
        },
    ];
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "why-livguard-combo": {
                humanReadableName: getVernacularString("a70a34a0-4f68-4ff6-9bc5-3000c1191f7d", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge tw-h-full", className)}
            id="why-livguard-combo"
            ref={sectionRef}
        >
            <div className="tw-flex tw-flex-col lg:tw-h-[89%]">
                <div className="lg-text-headline tw-text-center">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("landingPage2S5HT1", userPreferences.language)}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("landingPage2S5HT2", userPreferences.language)}} />
                </div>

                <VerticalSpacer className="tw-h-10" />

                <div>
                    <div className="tw-grid tw-grid-cols-[minmax(0,1fr)_minmax(0,1fr)] tw-gap-3 tw-flex-1">
                        <ItemBuilder
                            items={sectionData}
                            itemBuilder={(item, itemIndex) => (
                                <div
                                    key={itemIndex}
                                    className={`tw-col-start-${itemIndex + 1} lg-bg-secondary-100 tw-rounded-lg tw-p-3 lg:tw-px-6 tw-flex tw-flex-col tw-justify-center lg-card-shadow`}
                                >
                                    <div className="tw-flex tw-items-center tw-justify-center">
                                        <FixedWidthImage
                                            relativePath={item.image}
                                            width="150px"
                                        />
                                    </div>

                                    <VerticalSpacer className="tw-h-4" />

                                    <div className="lg-text-title1 tw-text-left lg:tw-place-self-left">{item.title}</div>

                                    <VerticalSpacer className="tw-h-4" />

                                    <div className="tw-flex tw-flex-row tw-justify-between tw-items-center">
                                        <div className="tw-text-body">{item.content1}</div>
                                        <div className="tw-w-5">
                                            {item.highlighted ? (
                                                <CheckCircleIcon className="tw-h-5 tw-w-5 lg-text-primary-500 tw-rounded-full -tw-translate-y-[.10rem]" />
                                            ) : (
                                                <XCircleIcon className="tw-h-5 tw-w-5 lg-text-secondary-500 tw-rounded-full -tw-translate-y-[.10rem]" />
                                            )}
                                        </div>
                                    </div>

                                    <div className="tw-border lg-border-secondary-300 tw-mb-2 tw-mt-1" />

                                    <div className="tw-flex tw-flex-row tw-justify-between tw-items-center">
                                        <div className="tw-text-body">{item.content2}</div>
                                        <div className="tw-w-5">
                                            {item.highlighted ? (
                                                <CheckCircleIcon className="tw-h-5 tw-w-5 lg-text-primary-500 tw-rounded-full -tw-translate-y-[.10rem]" />
                                            ) : (
                                                <XCircleIcon className="tw-h-5 tw-w-5 lg-text-secondary-500 tw-rounded-full -tw-translate-y-[.10rem]" />
                                            )}
                                        </div>
                                    </div>

                                    <div className="tw-border lg-border-secondary-300 tw-mb-2 tw-mt-1" />

                                    <div className="tw-flex tw-flex-row tw-justify-between tw-items-center">
                                        <div className="tw-text-body">{item.content3}</div>
                                        <div className="tw-w-5">
                                            {item.highlighted ? (
                                                <CheckCircleIcon className="tw-h-5 tw-w-5 lg-text-primary-500 tw-rounded-full -tw-translate-y-[.10rem]" />
                                            ) : (
                                                <XCircleIcon className="tw-h-5 tw-w-5 lg-text-secondary-500 tw-rounded-full -tw-translate-y-[.10rem]" />
                                            )}
                                        </div>
                                    </div>

                                    <div className="tw-border lg-border-secondary-300 tw-mb-2 tw-mt-1" />

                                    <div className="tw-flex tw-flex-row tw-justify-between tw-items-center">
                                        <div className="tw-text-body">{item.content4}</div>
                                        <div className="tw-w-5">
                                            {item.highlighted ? (
                                                <CheckCircleIcon className="tw-h-5 tw-w-5 lg-text-primary-500 tw-rounded-full -tw-translate-y-[.10rem]" />
                                            ) : (
                                                <XCircleIcon className="tw-h-5 tw-w-5 lg-text-secondary-500 tw-rounded-full -tw-translate-y-[.10rem]" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        />

                        {/* <div className="tw-col-start-2 tw-row-start-1 tw-place-self-center">
                            V/S
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function ExploreStarProducts({userPreferences, className}: {userPreferences: UserPreferences; className: string}) {
    const sectionData = [
        {
            title: "LG700E",
            image: "/livguard/products/lg700e/thumbnail.png",
            bestSeller: true,
        },
        {
            title: "LGS1100i",
            image: "/livguard/products/lgs1100i/thumbnail.png",
            bestSeller: false,
        },
        {
            title: "IT1550TT",
            image: "/livguard/products/it1550tt/thumbnail.png",
            bestSeller: false,
        },
        {
            title: "IT2060TT",
            image: "/livguard/products/it2060tt/thumbnail.png",
            bestSeller: true,
        },
    ];
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "star-products": {
                humanReadableName: getVernacularString("9dc9953c-6891-4dd0-a5f2-70eafce21303", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge tw-w-full tw-max-w-7xl tw-mx-auto", className)}
            id="star-products"
            ref={sectionRef}
        >
            <div className="tw-flex tw-flex-col">
                <div className="lg-text-headline tw-text-center">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("landingPage2S7HT1", userPreferences.language)}} />
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("landingPage2S7HT2", userPreferences.language)}} />
                </div>

                <VerticalSpacer className="tw-h-6" />

                <div className="tw-grid tw-grid-cols-[minmax(0,1fr),minmax(0,1fr)] tw-grid-rows-[minmax(0,1fr),minmax(0,1fr)] lg:tw-grid-rows-1 lg:tw-grid-cols-4 tw-gap-x-2 lg:tw-gap-x-4 tw-gap-y-10">
                    <ItemBuilder
                        items={sectionData}
                        itemBuilder={(product, productIndex) => (
                            <DefaultElementAnimation key={productIndex}>
                                <div className={`tw-row-start-${productIndex / 2 + 1} tw-col-start-${(productIndex % 2) + 1} lg-card tw-rounded-lg`}>
                                    <div className="tw-flex tw-flex-col tw-justify-between tw-relative tw-px-3">
                                        {product.bestSeller && (
                                            <div className="tw-absolute tw-right-0 tw-top-0 lg-text-icon tw-px-2 tw-rounded-tr-lg lg-bg-primary-500 tw-pt-[2px] tw-text-white"> Best Seller </div>
                                        )}

                                        <VerticalSpacer className="tw-h-8" />

                                        <div className="tw-text-body tw-text-center">{product.title}</div>

                                        <VerticalSpacer className="tw-h-4" />

                                        <FullWidthImage relativePath={product.image} />

                                        <VerticalSpacer className="tw-h-4" />

                                        <div className="lg-cta-button tw-translate-y-4 tw-px-4 tw-text-center tw-items-center">
                                            <Link to={`/product/${product.title.toLowerCase()}`}>{getVernacularString("landingPage2S7CTABT", userPreferences.language)}</Link>
                                        </div>
                                    </div>
                                </div>
                            </DefaultElementAnimation>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

export function FaqSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const faqs = [
        {
            question: "landingPage2Q1Q",
            answer: "landingPage2Q1A",
        },
        {
            question: "landingPage2Q2Q",
            answer: "landingPage2Q2A",
        },
        {
            question: "landingPage2Q3Q",
            answer: "landingPage2Q3A",
        },
        {
            question: "landingPage2Q4Q",
            answer: "landingPage2Q4A",
        },
        {
            question: "landingPage2Q5Q",
            answer: "landingPage2Q5A",
        },
    ];
    return (
        <div className={concatenateNonNullStringsWithSpaces("", className)}>
            <FaqSectionInternal
                faqs={faqs}
                userPreferences={userPreferences}
                className={className}
            />
        </div>
    );
}
