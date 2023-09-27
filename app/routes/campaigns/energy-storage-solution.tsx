import {ChevronDoubleDownIcon} from "@heroicons/react/20/solid";
import type {LoaderFunction, V2_MetaFunction} from "@remix-run/node";
import type {FetcherWithComponents} from "@remix-run/react";
import {Link, useFetcher} from "@remix-run/react";
import {useContext, useEffect, useReducer, useRef, useState} from "react";
import {useInView} from "react-intersection-observer";
import {useResizeDetector} from "react-resize-detector";
import {useLoaderData} from "react-router";
import {toast} from "react-toastify";
import {Accordion} from "~/components/accordian";
import {CarouselStyle2} from "~/components/carouselStyle2";
import {ContactForm} from "~/components/contactUsForm";
import {ContactFormSuccess} from "~/components/contactUsFormSuccess";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultImageAnimation} from "~/components/defaultImageAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {FaqSectionInternal} from "~/components/faqs";
import {CoverImage} from "~/components/images/coverImage";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {StickyLandingPageBottomBar} from "~/components/landingPageBottomBar";
import {SecondaryNavigation} from "~/components/secondaryNavigation";
import {SecondaryNavigationControllerContext} from "~/contexts/secondaryNavigationControllerContext";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {ImageCdnProvider, type Uuid} from "~/global-common-typescript/typeDefinitions";
import {concatenateNonNullStringsWithSpaces, generateUuid} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {SecondaryNavigationController, useSecondaryNavigationController} from "~/hooks/useSecondaryNavigationController";
import {EnergySolutions, TransformingLives} from "~/routes";
import {CampaignPageScaffold} from "~/routes/campaigns/campaignPageScaffold.component";
import type {FormStateInputs, FormStateInputsAction} from "~/routes/lead-form.state";
import {FormStateInputsActionType, FormStateInputsReducer, createInitialFormState} from "~/routes/lead-form.state";
import {PowerPlannerTeaser} from "~/routes/load-calculator";
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
                href: "https://www.livguard.com/campaigns/energy-storage-solution/",
            },
            {
                title: "Take charge of your energy with livguard home inverters and inverter batteries",
            },
            {
                name: "description",
                content: "Empowering India with Unlimited Energy through Livguard's wide range of energy storage solutions of inverters, inverter batteries and more.",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/campaigns/energy-storage-solution/",
            },
            {
                property: "og:title",
                content: "Take charge of your energy with livguard home inverters and inverter batteries",
            },
            {
                property: "og:description",
                content: "Empowering India with Unlimited Energy through Livguard's wide range of energy storage solutions of inverters, inverter batteries and more.",
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
                    name: "Energy Storage Solution",
                    url: "https://www.livguard.com/campaigns/energy-storage-solution",
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
                href: "https://www.livguard.com/campaigns/energy-storage-solution/",
            },
            {
                title: "लिवगार्ड होम इनवर्टर और इनवर्टर बैटरी के साथ अपनी ऊर्जा का जिम्मेदारी लें",
            },
            {
                name: "description",
                content: "लिवगार्ड के इनवर्टर, इनवर्टर बैटरी और अन्य ऊर्जा संग्रहण समाधानों की विस्तृत श्रृंखला के माध्यम से असीमित ऊर्जा से सशक्त बनें।",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/campaigns/energy-storage-solution/",
            },
            {
                property: "og:title",
                content: "लिवगार्ड होम इनवर्टर और इनवर्टर बैटरी के साथ अपनी ऊर्जा का जिम्मेदारी लें",
            },
            {
                property: "og:description",
                content: "लिवगार्ड के इनवर्टर, इनवर्टर बैटरी और अन्य ऊर्जा संग्रहण समाधानों की विस्तृत श्रृंखला के माध्यम से असीमित ऊर्जा से सशक्त बनें।",
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
            <VerticalSpacer className="tw-row-start-3 tw-col-start-1 lg:tw-col-span-full tw-h-10 lg:tw-h-20" />
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
                        className="tw-row-start-4 tw-col-start-1 lg:tw-hidden"
                    />
                </>
            )}

            <VerticalSpacer className="tw-row-start-5 tw-col-start-1 tw-h-10 lg:tw-hidden" />

            <EnergySolutionsSection
                userPreferences={userPreferences}
                className="tw-row-start-6 tw-col-start-1 lg:tw-row-start-4 lg:tw-col-start-1 lg:tw-pl-[72px] xl:tw-pl-[120px]"
            />

            <VerticalSpacer className="tw-row-start-7 tw-col-start-1 tw-h-10 lg:tw-hidden lg:tw-h-20" />

            <QualityMeetsExpertise
                userPreferences={userPreferences}
                className="tw-row-start-8 tw-col-start-1 lg:tw-col-span-full lg:tw-row-start-4 lg:tw-col-start-2 lg:tw-pr-[72px] xl:tw-pr-[120px]"
            />

            <VerticalSpacer className="tw-row-start-[9] tw-col-start-1 tw-h-10 lg:tw-row-start-5 lg:tw-col-span-full lg:tw-h-20" />

            <LimitlessEnergy
                userPreferences={userPreferences}
                className="tw-row-start-10 tw-col-start-1 lg:tw-col-span-full lg:tw-row-start-6 lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-row-start-[11] tw-col-start-1 tw-h-10 lg:tw-row-start-[7] lg:tw-col-span-full lg:tw-h-20" />

            <PowerPlanner
                userPreferences={userPreferences}
                className="tw-row-start-[12] tw-col-start-1 lg:tw-col-span-full lg:tw-row-start-[8] lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-row-start-[13] tw-col-start-1 tw-h-10 lg:tw-row-start-[9] lg:tw-col-span-full lg:tw-h-20" />

            <TransformingLives
                userPreferences={userPreferences}
                className="tw-row-start-[14] tw-col-start-1 lg:tw-col-span-full lg:tw-row-start-[10] lg:tw-pl-[72px] xl:tw-pl-[120px]"
            />

            <VerticalSpacer className="tw-row-start-[15] tw-col-start-1 tw-h-10 lg:tw-row-start-[11] lg:tw-col-span-full lg:tw-h-20" />

            <FaqSection
                userPreferences={userPreferences}
                className="tw-row-start-[16] tw-col-start-1 lg:tw-col-span-full lg:tw-row-start-[12] lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-row-start-[17] tw-col-start-1 tw-h-10 lg:tw-row-start-[13] lg:tw-col-span-full lg:tw-h-20" />
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
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();
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
                "tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height)-7.5rem)] lg:tw-h-[calc(100vh-9rem)] tw-min-h-[calc(100vw*7/16)] ",
                className,
            )}
            id="top"
            ref={sectionRef}
        >
            <div
                className="tw-w-full tw-h-full tw-grid tw-grid-rows-[1.5rem_3rem_minmax(0,1fr)_auto_0.5rem_auto_1rem_auto_1rem_minmax(0,1fr)_auto_1.5rem] tw-justify-items-center tw-text-center lg:tw-text-left tw-relative lg:tw-grid-cols-2 tw-isolate"
                ref={ref}
            >
                {" "}
                {containerWidth == null || containerHeight == null ? null : (
                    <CoverImage
                        relativePath={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/hero-banners/lp-1-hero-mobile.jpg" : "/livguard/hero-banners/lp-1-hero-desktop.jpg"}
                        className="tw-row-start-1 tw-col-start-1 tw-row-span-full tw-col-span-full"
                        key={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/hero-banners/lp-1-hero-mobile.jpg" : "/livguard/hero-banners/lp-1-hero-desktop.jpg"}
                    />
                )}
                <DefaultTextAnimation className="tw-row-start-4 tw-col-start-1 lg:tw-place-self-start lg:tw-col-start-1">
                    <div
                        dangerouslySetInnerHTML={{__html: getVernacularString("landingPage1S1T1", userPreferences.language)}}
                        className="lg-text-banner lg-px-screen-edge tw-text-white lg:tw-pl-[120px]"
                    />
                </DefaultTextAnimation>
                <DefaultTextAnimation className="tw-row-start-6 tw-col-start-1 lg:tw-place-self-start lg:tw-max-w-[620px] lg:tw-col-start-1">
                    <div
                        dangerouslySetInnerHTML={{__html: getVernacularString("landingPage1S1T2", userPreferences.language)}}
                        className="lg-text-title1 lg-px-screen-edge tw-text-white lg:tw-pl-[120px]"
                    />
                </DefaultTextAnimation>
                <DefaultElementAnimation className="tw-row-[8] tw-col-start-1 lg:tw-place-self-start lg:tw-pl-[120px] lg:tw-col-start-1 lg:tw-hidden">
                    <Link
                        to="#contact-us-form-mobile"
                        className="lg-cta-button lg-px-screen-edge lg:tw-pl-[60px]"
                    >
                        {getVernacularString("landingPage1S1T3", userPreferences.language)}
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
                    <div
                        className="lg:tw-w-[25rem]"
                        id="contact-us-form-desktop"
                    >
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
            </div>
        </div>
    );
}

export function LimitlessEnergy({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const sectionData = [
        {
            imageRelativePath: "/livguard/landing-pages/1/section3/1.jpg",
            titleTextContentPiece: "landingPage1S3Slide1Title",
            bodyTextContentPiece: "landingPage1S3Slide1Body",
        },
        {
            imageRelativePath: "/livguard/landing-pages/1/section3/2.jpg",
            titleTextContentPiece: "landingPage1S3Slide2Title",
            bodyTextContentPiece: "landingPage1S3Slide2Body",
        },
        {
            imageRelativePath: "/livguard/landing-pages/1/section3/3.jpg",
            titleTextContentPiece: "landingPage1S3Slide3Title",
            bodyTextContentPiece: "landingPage1S3Slide3Body",
        },
    ];
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "limitless-energy": {
                humanReadableName: getVernacularString("556945af-1937-475d-8e41-0bea36fb1a86", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-flex tw-flex-col tw-justify-center tw-text-center tw-py-6", className)}
            id="limitless-energy"
            ref={sectionRef}
        >
            <div className="tw-px-6 lg-text-headline">
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("landingPage1S3HT1", userPreferences.language)}} />
                </DefaultTextAnimation>
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("landingPage1S3HT2", userPreferences.language)}} />
                </DefaultTextAnimation>
            </div>

            <VerticalSpacer className="tw-h-4" />

            <div className="lg:tw-hidden">
                <CarouselStyle2
                    userPreferences={userPreferences}
                    items={sectionData}
                />
            </div>

            <div className="tw-hidden lg:tw-block">
                <div className="tw-grid tw-grid-cols-3 tw-gap-8">
                    <ItemBuilder
                        items={sectionData}
                        itemBuilder={(item, itemIndex) => (
                            <div
                                className="tw-w-full tw-h-full tw-grid tw-grid-rows-[1.5rem_auto_1fr_auto_0_auto_1fr_1.5rem] tw-grid-cols-[1.5rem_minmax(0,1fr)_1.5rem] tw-gap-2"
                                key={itemIndex}
                            >
                                <DefaultImageAnimation className="tw-row-start-1 tw-col-start-1 tw-row-span-full tw-col-span-full">
                                    <FullWidthImage
                                        relativePath={item.imageRelativePath}
                                        className="tw-rounded-lg"
                                    />
                                </DefaultImageAnimation>

                                <DefaultTextAnimation className="tw-row-start-4 tw-col-start-2">
                                    <div className="lg-text-title1 tw-whitespace-pre-line tw-text-secondary-900-dark">{getVernacularString(item.titleTextContentPiece, userPreferences.language)}</div>
                                </DefaultTextAnimation>

                                <DefaultTextAnimation className="tw-row-start-6 tw-col-start-2">
                                    <div className="lg-text-body !tw-text-secondary-900-dark">{getVernacularString(item.bodyTextContentPiece, userPreferences.language)}</div>
                                </DefaultTextAnimation>
                            </div>
                        )}
                    />
                </div>
            </div>

            <VerticalSpacer className="tw-h-4" />

            <div className="tw-self-center tw-px-6">
                <Link to="/">
                    <div className="lg-cta-button">{getVernacularString("landingPage1S3BT", userPreferences.language)}</div>
                </Link>
            </div>
        </div>
    );
}

export function QualityMeetsExpertise({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "meets-expertise": {
                humanReadableName: getVernacularString("adfcccd0-8c11-4545-8773-5ff7fe6f6215", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge", className)}
            id="meets-expertise"
            ref={sectionRef}
        >
            <div className="tw-flex tw-flex-col">
                <div className="lg-text-headline tw-text-center">
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("landingPageS4HT1", userPreferences.language)}} />
                    </DefaultTextAnimation>
                    <DefaultTextAnimation>
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("landingPageS4HT2", userPreferences.language)}} />
                    </DefaultTextAnimation>
                </div>

                <VerticalSpacer className="tw-h-6" />

                <div className="tw-grid tw-grid-cols-[minmax(0,1fr),minmax(0,1fr)] tw-grid-rows-[minmax(0,1fr),minmax(0,1fr)] [@media(min-width:1080px)]:tw-grid-rows-2 tw-gap-2 tw-text-center lg:tw-gap-8">
                    <div className="tw-col-start-1 tw-row-start-1 lg-card tw-rounded-lg tw-py-8 lg:tw-py-16">
                        <DefaultElementAnimation>
                            <div className="lg-text-banner">{getVernacularString("landingPageS4Box1T1", userPreferences.language)}</div>
                            <VerticalSpacer className="tw-h-2" />
                            <div className="lg-text-titile2">{getVernacularString("landingPageS4Box1T2", userPreferences.language)}</div>
                        </DefaultElementAnimation>
                    </div>
                    <div className="tw-col-start-2 tw-row-start-1 lg-card tw-rounded-lg tw-py-8 lg:tw-py-16">
                        <DefaultElementAnimation>
                            <div className="lg-text-banner">{getVernacularString("landingPageS4Box2T1", userPreferences.language)}</div>
                            <VerticalSpacer className="tw-h-2" />
                            <div className="lg-text-titile2">{getVernacularString("landingPageS4Box2T2", userPreferences.language)}</div>
                        </DefaultElementAnimation>
                    </div>
                    <div className="tw-col-start-1 tw-row-start-2 lg-card tw-rounded-lg tw-py-8 lg:tw-py-16">
                        <DefaultElementAnimation>
                            <div className="lg-text-banner">{getVernacularString("landingPageS4Box3T1", userPreferences.language)}</div>
                            <VerticalSpacer className="tw-h-2" />
                            <div className="lg-text-titile2">{getVernacularString("landingPageS4Box3T2", userPreferences.language)}</div>
                        </DefaultElementAnimation>
                    </div>
                    <div className="tw-col-start-2 tw-row-start-2 lg-card tw-rounded-lg tw-py-8 lg:tw-py-16">
                        <DefaultElementAnimation>
                            <div className="lg-text-banner">{getVernacularString("landingPageS4Box4T1", userPreferences.language)}</div>
                            <VerticalSpacer className="tw-h-2" />
                            <div className="lg-text-titile2">{getVernacularString("landingPageS4Box4T2", userPreferences.language)}</div>
                        </DefaultElementAnimation>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function FaqSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const faqs = [
        {
            question: "landingPage1Q1Q",
            answer: "landingPage1Q1A",
        },
        {
            question: "landingPage1Q2Q",
            answer: "landingPage1Q2A",
        },
        {
            question: "landingPage1Q3Q",
            answer: "landingPage1Q3A",
        },
        {
            question: "landingPage1Q4Q",
            answer: "landingPage1Q4A",
        },
        {
            question: "landingPage1Q5Q",
            answer: "landingPage1Q5A",
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

function EnergySolutionsSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "energy-solutions": {
                humanReadableName: getVernacularString("f73b94be-d44a-48f8-a1b7-623071cf1fe0", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("", className)}
            id="energy-solutions"
            ref={sectionRef}
        >
            <EnergySolutions userPreferences={userPreferences} />
        </div>
    );
}

export function ContactFormSection({
    userPreferences,
    fetcher,
    otpFetcher,
    utmParameters,
    formStateInputs,
    dispatch,
    className,
    leadId,
    pageUrl,
}: {
    userPreferences: UserPreferences;
    fetcher: FetcherWithComponents<any>;
    otpFetcher: FetcherWithComponents<any>;
    utmParameters: {
        [searchParameter: string]: string;
    };
    formStateInputs: FormStateInputs;
    dispatch: React.Dispatch<FormStateInputsAction>;
    className?: string;
    leadId: Uuid;
    pageUrl: string;
}) {
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "reliable-power": {
                humanReadableName: getVernacularString("11372be1-3074-49ea-aaf7-ec9d0b3ca48e", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("", className)}
            id="reliable-power"
            ref={sectionRef}
        >
            <div id="contact-us-form-mobile">
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

export function PowerPlanner({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "power-planner": {
                humanReadableName: getVernacularString("8d7859c7-a9d9-44e9-a854-d43697bc3abd", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("", className)}
            id="power-planner"
            ref={sectionRef}
        >
            <PowerPlannerTeaser
                userPreferences={userPreferences}
                className={className}
            />
        </div>
    );
}
