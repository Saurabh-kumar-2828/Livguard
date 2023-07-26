import {ChevronDoubleDownIcon} from "@heroicons/react/20/solid";
import type {LinksFunction, LoaderFunction, MetaFunction} from "@remix-run/node";
import type {FetcherWithComponents} from "@remix-run/react";
import {Link, useFetcher} from "@remix-run/react";
import {useEffect, useReducer, useRef} from "react";
import {useResizeDetector} from "react-resize-detector";
import {useLoaderData} from "react-router";
import {toast} from "react-toastify";
import {ContactForm} from "~/components/contactUsForm";
import {ContactFormSuccess} from "~/components/contactUsFormSuccess";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {EmbeddedYoutubeVideo} from "~/components/embeddedYoutubeVideo";
import {FaqSectionInternal} from "~/components/faqs";
import {CoverImage} from "~/components/images/coverImage";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {StickyLandingPage3BottomBar} from "~/components/landingPage3BottomBar";
import {LandingPage3Carousel} from "~/components/landingPage3Carousel";
import {StickyLandingPageBottomBar} from "~/components/landingPageBottomBar";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import type {Uuid} from "~/global-common-typescript/typeDefinitions";
import {ImageCdnProvider} from "~/global-common-typescript/typeDefinitions";
import {concatenateNonNullStringsWithSpaces, generateUuid} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {ContactUsCta, TransformingLives} from "~/routes";
import {CampaignPageScaffold} from "~/routes/campaigns/campaignPageScaffold.component";
import {ComboSection, WhyLivguardCombo} from "~/routes/campaigns/inverter-and-battery";
import type {FormStateInputs, FormStateInputsAction} from "~/routes/lead-form.state";
import {FormStateInputsActionType, FormStateInputsReducer, createInitialFormState} from "~/routes/lead-form.state";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {UserPreferences} from "~/typeDefinitions";
import {Language} from "~/typeDefinitions";
import {getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";

export const meta: MetaFunction = ({data}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = data.userPreferences;
    if (userPreferences.language == Language.English) {
        return {
            title: "Livguard Smart & Strong Inverter and Battery Combos",
            description: "Empower your home with Livguard smart inverter and battery jodis to compliment your home's energy needs.",
        };
    } else if (userPreferences.language == Language.Hindi) {
        return {
            title: "लिवगार्ड स्मार्ट और मजबूत इनवर्टर और बैटरी जोड़ी देखे",
            description: "अपने घर की ऊर्जा जरूरतों को पूरा करने के लिए लिवगार्ड स्मार्ट इनवर्टर और बैटरी जोड़ी के साथ अपने घर को सशक्त बनाएं।",
        };
    } else {
        throw Error(`Undefined language ${userPreferences.language}`);
    }
};

export const links: LinksFunction = () => {
    return [{rel: "canonical", href: "https://www.Livguard.com/campaigns/inverter-and-battery-jodi/"}];
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

    return (
        <>
            <CampaignPageScaffold
                userPreferences={userPreferences}
                redirectTo={redirectTo}
                showMobileMenuIcon={false}
                utmParameters={utmSearchParameters}
                showContactCtaButton={false}
                showSearchOption={true}
            >
                <LandingPage
                    userPreferences={userPreferences}
                    utmParameters={utmSearchParameters}
                    pageUrl={pageUrl}
                />
            </CampaignPageScaffold>

            <StickyLandingPage3BottomBar
                userPreferences={userPreferences}
                utmParameters={utmSearchParameters}
                pageUrl={pageUrl}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: `
                        {
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            "name": "Inverter and Battery",
                            "url": "https://www.livguard.com/campaigns/inverter-and-battery/",
                            "logo": "",
                            "sameAs": ""
                        }
                    `,
                }}
            />
        </>
    );
}

function LandingPage({
    userPreferences,
    utmParameters,
    pageUrl,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
    pageUrl: string;
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

    useEffect(() => {
        if (formStateInputs.resendTimeOut > 0 && formStateInputs.showOtpField) {
            setTimeout(() => {
                const action: FormStateInputsAction = {
                    actionType: FormStateInputsActionType.SetResendTimeOut,
                    payload: formStateInputs.resendTimeOut - 1,
                };
                dispatch(action);
            }, 1000);
        }
    }, [formStateInputs.resendTimeOut]);

    const utmSearchParameters = useUtmSearchParameters();

    return (
        <div className="tw-grid tw-grid-rows-1 tw-grid-cols-1 lg:tw-grid-rows-1 lg:tw-grid-cols-[minmax(0,3fr),minmax(0,2fr)] tw-gap-x-1 tw-align-stretch tw-gap-y-10 lg:tw-gap-y-20 tw-pb-10 lg:tw-pb-20">
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

            <div
                className="tw-row-start-2 tw-col-start-1 lg:tw-hidden"
                id="contact-us-form-mobile"
            >
                {!formStateInputs.formSuccessfullySubmitted ? (
                    <ContactForm
                        userPreferences={userPreferences}
                        fetcher={fetcher}
                        otpFetcher={otpFetcher}
                        utmParameters={utmSearchParameters}
                        formStateInputs={formStateInputs}
                        dispatch={dispatch}
                        leadId={leadId.current}
                        pageUrl={pageUrl}
                    />
                ) : (
                    <ContactFormSuccess userPreferences={userPreferences} />
                )}
            </div>

            <WhyLivguardCombo
                userPreferences={userPreferences}
                className="tw-row-start-3 lg:tw-row-start-2 lg:tw-col-span-full lg:tw-pr-[72px] xl:tw-pr-[120px]"
            />

            <ComboSection
                userPreferences={userPreferences}
                className="tw-row-start-4 tw-col-start-1 lg:tw-row-start-3 lg:tw-col-start-1 lg:tw-col-span-2"
            />

            {/* <DealerLocator
                userPreferences={userPreferences}
                showCtaButton={true}
                className="tw-row-start-4 tw-col-start-1 lg:tw-row-start-2 lg:tw-col-start-2 lg:tw-pr-[72px] xl:tw-pr-[120px] tw-h-full"
            /> */}

            {/* <PowerPlannerTeaser
                userPreferences={userPreferences}
                className="tw-row-start-5 tw-col-start-1 lg:tw-row-start-3 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
            /> */}

            {/* <ExploreStarProducts
                userPreferences={userPreferences}
                className="tw-row-start-6 tw-col-start-1 lg:tw-row-start-4 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
            /> */}

            <TvcSection
                userPreferences={userPreferences}
                utmParameters={utmParameters}
                className="tw-row-start-5 tw-col-start-1 lg:tw-row-start-4 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
                pageUrl={pageUrl}
            />

            <TapIntoEfficiency
                userPreferences={userPreferences}
                utmParameters={utmParameters}
                className="tw-row-start-6 tw-col-start-1 lg:tw-row-start-5 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
                pageUrl={pageUrl}
            />

            <TransformingLives
                userPreferences={userPreferences}
                className="tw-row-start-7 tw-col-start-1 lg:tw-row-start-6 lg:tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <FaqSection
                userPreferences={userPreferences}
                className="tw-row-start-8 tw-col-start-1 lg:tw-row-start-7 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
            />
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

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height)-7.5rem)] lg:tw-h-[calc(100vh-9rem)] tw-min-h-[calc(100vw*7/16)] tw-grid tw-justify-items-center tw-text-center lg:tw-text-left tw-relative lg:tw-grid-cols-2 tw-isolate",
                containerWidth == null || containerWidth < 380
                    ? "tw-grid-rows-[1.5rem_0_0_auto_0.5rem_auto_1rem_auto_1rem_minmax(0,1fr)_auto_1.5rem]"
                    : "tw-grid-rows-[1.5rem_3rem_0_auto_0.5rem_auto_1rem_auto_1rem_minmax(0,1fr)_auto_1.5rem]",
                className,
            )}
            ref={ref}
        >
            {/* {containerWidth == null || containerHeight == null ? null : containerHeight > containerWidth || containerWidth < 640 ? (
                <div className="tw-row-start-1 tw-col-start-1 tw-row-span-full tw-col-span-full tw-w-full tw-h-full tw-relative -tw-z-10">
                    <img
                        src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/hero-banners/akshay-mobile.jpg")?.finalUrl, ImageCdnProvider.Bunny, 1080, 1080)}
                        className="tw-w-full tw-h-full tw-absolute tw-inset-0 tw-object-cover -tw-z-10"
                        key={"/livguard/hero-banners/akshay-mobile.jpg"}
                    />
                </div>
            ) : (
                <img
                    src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/hero-banners/akshay-desktop.jpg")?.finalUrl, ImageCdnProvider.Bunny, 1080, null)}
                    className="tw-w-full tw-h-full tw-absolute tw-inset-0 tw-object-cover tw-object-left-bottom -tw-z-10"
                    key={"/livguard/hero-banners/akshay-desktop.jpg"}
                />
            )} */}

            <div className="tw-row-start-1 tw-col-start-1 tw-row-span-full tw-col-span-full tw-w-full tw-h-full tw-relative -tw-z-10">
                <CoverImage relativePath="/livguard/lp3/1/bg.jpg" />

                {containerWidth == null ? null : (
                    <>
                        <img
                            src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/common/akshay.png")?.finalUrl, ImageCdnProvider.Bunny, null, null)}
                            alt="Akshay Kumar"
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-absolute",
                                containerWidth < 768 ? "tw-bottom-0 tw-right-0 tw-w-[30%]" : containerWidth < 1024 ? "tw-bottom-0 tw-right-0 tw-h-3/5" : "tw-bottom-0 tw-left-[30%] tw-h-3/5",
                            )}
                        />

                        <img
                            src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/lp3/1/combo.png")?.finalUrl, ImageCdnProvider.Bunny, 360, null)}
                            alt="Livguard inverter-battery combo"
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-absolute",
                                containerWidth < 768 ? "tw-bottom-0 tw-left-0 tw-w-2/5" : containerWidth < 1024 ? "tw-bottom-0 tw-left-0 tw-h-3/5" : "tw-bottom-[-5rem] tw-left-8 tw-h-3/5",
                            )}
                        />
                    </>
                )}
            </div>

            <DefaultTextAnimation className="tw-row-start-4 tw-col-start-1 lg:tw-place-self-start lg:tw-col-start-1">
                <div
                    dangerouslySetInnerHTML={{__html: getVernacularString("landingPage3S1T1", userPreferences.language)}}
                    className="lg-text-banner lg-px-screen-edge tw-text-white lg:tw-pl-[120px]"
                />
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-6 tw-col-start-1 lg:tw-place-self-start lg:tw-max-w-[620px] lg:tw-col-start-1">
                <div
                    dangerouslySetInnerHTML={{__html: getVernacularString("landingPage3S1T2", userPreferences.language)}}
                    className="lg-text-title1 lg-px-screen-edge tw-text-white lg:tw-pl-[120px]"
                />
            </DefaultTextAnimation>

            <DefaultElementAnimation className="tw-row-[8] tw-col-start-1 lg:tw-place-self-start lg:tw-pl-[120px] lg:tw-col-start-1 lg:tw-hidden">
                <Link
                    to="#contact-us-form-mobile"
                    className="lg-cta-button lg-px-screen-edge lg:tw-pl-[60px]"
                >
                    {getVernacularString("landingPage3S1T3", userPreferences.language)}
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
    );
}

// function HeroSection({
//     userPreferences,
//     utmParameters,
//     className,
//     pageUrl,
// }: {
//     userPreferences: UserPreferences;
//     utmParameters: {
//         [searchParameter: string]: string;
//     };
//     className?: string;
//     pageUrl: string;
// }) {
//     // const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();
//     const [isContactUsDialogOpen, setIsContactUsDialogOpen] = useState(false);

//     return (
//         <div
//             className={concatenateNonNullStringsWithSpaces(
//                 className,
//                 "tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height)-7.5rem)] lg:tw-h-[calc(100vh-9rem)] tw-min-h-[calc(100vw*7/16)] tw-grid tw-grid-rows-[1.5rem_3rem_minmax(0,1fr)_auto_0.5rem_auto_1rem_auto_1rem_minmax(0,1fr)_auto_1.5rem] tw-justify-items-center tw-text-center tw-isolate",
//             )}
//             // ref={ref}
//             // onClick={() => setIsContactUsDialogOpen(true)}
//         >
//             {/* {containerWidth == null || containerHeight == null ? null : (
//                 <CoverImage
//                     relativePath={
//                         containerHeight > containerWidth || containerWidth < 640
//                             ? userPreferences.language == Language.English
//                                 ? "/livguard/landing-pages/3/top-banner-mobile-english.jpg"
//                                 : "/livguard/landing-pages/3/top-banner-mobile-hindi.jpg"
//                             : userPreferences.language == Language.English
//                             ? "/livguard/landing-pages/3/top-banner-desktop-english.jpg"
//                             : "/livguard/landing-pages/3/top-banner-desktop-hindi.jpg"
//                     }
//                     className="tw-row-start-1 tw-col-start-1 tw-row-span-full"
//                     key={
//                         containerHeight > containerWidth || containerWidth < 640
//                             ? userPreferences.language == Language.English
//                                 ? "/livguard/landing-pages/3/top-banner-mobile-english.jpg"
//                                 : "/livguard/landing-pages/3/top-banner-mobile-hindi.jpg"
//                             : userPreferences.language == Language.English
//                             ? "/livguard/landing-pages/3/top-banner-desktop-english.jpg"
//                             : "/livguard/landing-pages/3/top-banner-desktop-hindi.jpg"
//                     }
//                 />
//             )} */}

//             <CoverImage
//                 relativePath="/livguard/landing-pages/3/hero_image.jpg"
//                 className="tw-row-[1/span_12] tw-col-start-1 -tw-z-10"
//             />

//             <DefaultTextAnimation className="tw-row-start-4 tw-col-start-1">
//                 <div
//                     dangerouslySetInnerHTML={{__html: getVernacularString("landingPage3S1T1", userPreferences.language)}}
//                     className="lg-text-banner lg-px-screen-edge tw-text-white"
//                 />
//             </DefaultTextAnimation>

//             <DefaultTextAnimation className="tw-row-start-6 tw-col-start-1">
//                 <div
//                     dangerouslySetInnerHTML={{__html: getVernacularString("landingPage3S1T2", userPreferences.language)}}
//                     className="lg-text-title1 lg-px-screen-edge tw-text-white"
//                 />
//             </DefaultTextAnimation>

//             <DefaultElementAnimation className="tw-row-[8] tw-col-start-1">
//                 <ContactUsCta
//                     userPreferences={userPreferences}
//                     textVernacId="landingPage3S1T3"
//                     className="tw-z-10"
//                     utmParameters={utmParameters}
//                     pageUrl={pageUrl}
//                 />
//             </DefaultElementAnimation>

//             {/* <ChevronDoubleDownIcon className="tw-row-[11] tw-col-start-1 tw-w-12 tw-h-12 lg-text-primary-500 tw-animate-bounce" /> */}

//             <ContactUsDialog
//                 userPreferences={userPreferences}
//                 isContactUsDialogOpen={isContactUsDialogOpen}
//                 setIsContactUsDialogOpen={setIsContactUsDialogOpen}
//                 utmParameters={utmParameters}
//                 pageUrl={pageUrl}
//             />
//         </div>
//     );
// }

export function TvcSection({
    userPreferences,
    utmParameters,
    className,
    pageUrl,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
    className?: string;
    pageUrl: string;
}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-flex tw-flex-col tw-justify-center tw-items-center", className)}>
            <div className="lg-text-headline">
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("71bf111f-fc1f-4026-baeb-9b4981a8aba9", userPreferences.language)}} />
                </DefaultTextAnimation>
            </div>

            <VerticalSpacer className="tw-h-6" />

            <EmbeddedYoutubeVideo
                id="ZtywGUDhzqw"
                className="tw-w-full tw-h-full"
                containerClassName="tw-w-full tw-aspect-video tw-max-w-7xl tw-mx-auto"
            />
        </div>
    );
}

export function TapIntoEfficiency({
    userPreferences,
    utmParameters,
    className,
    pageUrl,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
    className?: string;
    pageUrl: string;
}) {
    const sectionData = [
        {
            imageRelativePath: "/livguard/landing-pages/3/1.jpg",
            titleTextContentPiece: "landingPage3S7Slide1Heading",
            bodyTextContentPiece: "landingPage3S7Slide1Content",
        },
        {
            imageRelativePath: "/livguard/landing-pages/3/2.jpg",
            titleTextContentPiece: "landingPage3S7Slide2Heading",
            bodyTextContentPiece: "landingPage3S7Slide2Content",
        },
        {
            imageRelativePath: "/livguard/landing-pages/3/3.jpg",
            titleTextContentPiece: "landingPage3S7Slide3Heading",
            bodyTextContentPiece: "landingPage3S7Slide3Content",
        },
    ];

    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-flex tw-flex-col tw-justify-center tw-items-center", className)}>
            <div className="lg-text-headline">
                <DefaultTextAnimation>
                    <div
                        dangerouslySetInnerHTML={{__html: getVernacularString("landingPage3S7HT1", userPreferences.language)}}
                        className="tw-text-center"
                    />
                </DefaultTextAnimation>
                <DefaultTextAnimation>
                    <div
                        dangerouslySetInnerHTML={{__html: getVernacularString("landingPage3S7HT2", userPreferences.language)}}
                        className="tw-text-center"
                    />
                </DefaultTextAnimation>
            </div>
            <VerticalSpacer className="tw-h-6" />
            <div className="tw-block lg:tw-hidden tw-w-full">
                <LandingPage3Carousel
                    userPreferences={userPreferences}
                    items={sectionData}
                />
            </div>
            <div className="tw-hidden lg:tw-grid tw-grid-cols-3 tw-gap-4">
                <ItemBuilder
                    items={sectionData}
                    itemBuilder={(card, cardIndex) => (
                        <div
                            className={`tw-col-start-${cardIndex + 1} tw-w-full tw-h-full tw-flex tw-flex-col tw-items-center tw-text-center`}
                            key={cardIndex}
                        >
                            <div className="tw-row-start-2 lg:tw-col-start-1 tw-text-center lg:te-text-left lg:tw-h-full tw-flex-1 tw-flex tw-flex-col">
                                <DefaultTextAnimation>
                                    <div className="lg-text-title1">{getVernacularString(card.titleTextContentPiece, userPreferences.language)}</div>
                                </DefaultTextAnimation>

                                <div className="tw-h-2" />

                                <DefaultTextAnimation className="tw-flex-1">
                                    <div className="lg-text-body lg-text-secondary-700 tw-flex-1">{getVernacularString(card.bodyTextContentPiece, userPreferences.language)}</div>
                                </DefaultTextAnimation>
                            </div>
                            <VerticalSpacer className="tw-h-4 tw-flex-1" />
                            <div className="tw-row-start-1 lg:tw-col-start-2 lg:tw-row-start-1 tw-w-full">
                                <FullWidthImage
                                    relativePath={card.imageRelativePath}
                                    className="tw-rounded-lg tw-w-full"
                                />
                            </div>
                        </div>
                    )}
                />
            </div>

            <VerticalSpacer className="tw-h-8 tw-flex-1" />

            <ContactUsCta
                userPreferences={userPreferences}
                textVernacId="landingPage3S7BT"
                className="tw-z-10"
                utmParameters={utmParameters}
                pageUrl={pageUrl}
            />
        </div>
    );
}

export function FaqSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const faqs = [
        {
            question: "landingPage3FAQQ1Q",
            answer: "landingPage3FAQQ1A",
        },
        {
            question: "landingPage3FAQQ2Q",
            answer: "landingPage3FAQQ2A",
        },
        {
            question: "landingPage3FAQQ3Q",
            answer: "landingPage3FAQQ3A",
        },
        {
            question: "landingPage3FAQQ4Q",
            answer: "landingPage3FAQQ4A",
        },
        {
            question: "landingPage3FAQQ5Q",
            answer: "landingPage3FAQQ5A",
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

function DealerLocator({userPreferences, showCtaButton, className}: {userPreferences: UserPreferences; showCtaButton: boolean; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge", className)}>
            <div className="tw-block lg:tw-hidden lg:tw-w-full">
                <div className="tw-relative lg-bg-secondary-100 tw-rounded-lg tw-h-[350px] lg:tw-h-full tw-overflow-hidden">
                    <div className="tw-flex tw-flex-col tw-absolute tw-m-auto tw-top-0 tw-left-0 tw-right-0 tw-bottom-0 tw-justify-center tw-items-center">
                        <div className="tw-absolute tw-inset-0">
                            <video
                                src="https://files.growthjockey.com/livguard/videos/home/10/1-dark.mp4"
                                className="tw-row-[1/span_12] tw-col-start-1 tw-w-full tw-h-full tw-object-cover tw-hidden dark:tw-block"
                                autoPlay={true}
                                muted={true}
                                loop={true}
                                controls={false}
                            />

                            <video
                                src="https://files.growthjockey.com/livguard/videos/home/10/1-light.mp4"
                                className="tw-row-[1/span_12] tw-col-start-1 tw-w-full tw-h-full tw-object-cover dark:tw-hidden tw-block"
                                autoPlay={true}
                                muted={true}
                                loop={true}
                                controls={false}
                            />
                        </div>

                        <div className="tw-z-10 lg-text-headline tw-text-center">
                            <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS10H1T1", userPreferences.language)}} />
                            <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS10H1T2", userPreferences.language)}} />
                        </div>

                        <VerticalSpacer className="tw-h-1" />

                        <div className="tw-z-10 lg-text-title2 tw-text-center">{getVernacularString("homeS10T2", userPreferences.language)}</div>

                        {showCtaButton && (
                            <>
                                <VerticalSpacer className="tw-h-6" />

                                <Link
                                    to="/dealer-for-inverters-and-batteries"
                                    className="tw-z-10 lg-cta-button"
                                >
                                    {getVernacularString("homeS10T3", userPreferences.language)}
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="tw-hidden lg:tw-block tw-w-full tw-h-full">
                <div className="tw-w full tw-h-full lg-bg-secondary-100 tw-py-20 tw-px-30 tw-rounded-lg">
                    <div className="tw-relative lg-bg-secondary-100 tw-rounded-lg tw-overflow-hidden tw-h-full tw-m-auto">
                        <div className="tw-flex tw-flex-col tw-absolute tw-m-auto tw-top-0 tw-left-0 tw-right-0 tw-bottom-0 tw-justify-center tw-items-center">
                            <div className="tw-absolute tw-inset-0">
                                <video
                                    src="https://files.growthjockey.com/livguard/videos/home/10/1-dark.mp4"
                                    className="tw-row-[1/span_12] tw-col-start-1 tw-w-full tw-h-full tw-hidden dark:tw-block"
                                    autoPlay={true}
                                    muted={true}
                                    loop={true}
                                    controls={false}
                                />

                                <video
                                    src="https://files.growthjockey.com/livguard/videos/home/10/1-light.mp4"
                                    className="tw-row-[1/span_12] tw-col-start-1 tw-w-full tw-h-full dark:tw-hidden tw-block"
                                    autoPlay={true}
                                    muted={true}
                                    loop={true}
                                    controls={false}
                                />
                            </div>

                            <div className="tw-z-10 lg-text-headline tw-text-center">
                                <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS10H1T1", userPreferences.language)}} />
                                <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS10H1T2", userPreferences.language)}} />
                            </div>

                            <VerticalSpacer className="tw-h-1" />

                            <div className="tw-z-10 lg-text-title2 tw-text-center">{getVernacularString("homeS10T2", userPreferences.language)}</div>

                            {showCtaButton && (
                                <>
                                    <VerticalSpacer className="tw-h-6" />

                                    <Link
                                        to="/dealer-for-inverters-and-batteries"
                                        className="tw-z-10 lg-cta-button"
                                    >
                                        {getVernacularString("homeS10T3", userPreferences.language)}
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
