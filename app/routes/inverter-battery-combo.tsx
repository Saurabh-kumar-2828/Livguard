import {ChevronDoubleDownIcon} from "@heroicons/react/20/solid";
import type {LoaderFunction, V2_MetaFunction} from "@remix-run/node";
import type {FetcherWithComponents} from "@remix-run/react";
import {Link, useFetcher} from "@remix-run/react";
import {useContext, useEffect, useReducer, useRef, useState} from "react";
import {useInView} from "react-intersection-observer";
import {useResizeDetector} from "react-resize-detector";
import {useLoaderData} from "react-router";
import {toast} from "react-toastify";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {EmbeddedYoutubeVideo} from "~/components/embeddedYoutubeVideo";
import {FaqSectionInternal} from "~/components/faqs";
import {CoverImage} from "~/components/images/coverImage";
import {FullWidthImage} from "~/components/images/simpleFullWidthImage";
import {StickyLandingPage3BottomBar} from "~/components/landingPage3BottomBar";
import {LandingPage3Carousel} from "~/components/landingPage3Carousel";
import {PageScaffold} from "~/components/pageScaffold";
import {SecondaryNavigationControllerContext} from "~/contexts/secondaryNavigationControllerContext";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import type {ImageMetadata, Uuid} from "~/common--type-definitions/typeDefinitions";
import {ImageCdnProvider} from "~/common--type-definitions/typeDefinitions";
import {concatenateNonNullStringsWithSpaces, generateUuid} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {SecondaryNavigationController, useSecondaryNavigationController} from "~/hooks/useSecondaryNavigationController";
import {ContactUsCta, TransformingLives} from "~/routes";
import {ComboSection, WhyLivguardCombo} from "~/routes/campaigns/inverter-and-battery";
import type {FormStateInputs, FormStateInputsAction} from "~/routes/lead-form.state";
import {FormStateInputsActionType, FormStateInputsReducer, createInitialFormState} from "~/routes/lead-form.state";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {UserPreferences} from "~/typeDefinitions";
import {Language} from "~/typeDefinitions";
import {getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest, secondaryNavThreshold} from "~/utilities";
import {getContentGenerator} from "~/vernacularProvider";
import {ContentProviderContext} from "~/contexts/contentProviderContext";
import {getVernacularFromBackend} from "~/backend/vernacularProvider.server";
import {getImageMetadataLibraryFromBackend, getMetadataForImageServerSide} from "~/backend/imageMetaDataLibrary.server";
import {ImageProviderContext} from "~/contexts/imageMetaDataContext";

export const meta: V2_MetaFunction = ({data: loaderData}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = loaderData.userPreferences;
    if (userPreferences.language == Language.English) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.Livguard.com/campaigns/inverter-and-battery-jodi/",
            },
            {
                title: "Livguard Smart & Strong Inverter and Battery Combos",
            },
            {
                name: "description",
                content: "Empower your home with Livguard smart inverter and battery combos to compliment your home's energy needs.",
            },
            {
                property: "og:url",
                content: "https://www.Livguard.com/campaigns/inverter-and-battery-jodi/",
            },
            {
                property: "og:title",
                content: "Livguard Smart & Strong Inverter and Battery Combos",
            },
            {
                property: "og:description",
                content: "Empower your home with Livguard smart inverter and battery combos to compliment your home's energy needs.",
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
                content: loaderData.ogBanner,
            },
            {
                "script:ld+json": {
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    name: "Inverter and Battery",
                    url: "https://www.livguard.com/campaigns/inverter-and-battery/",
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
                href: "https://www.Livguard.com/campaigns/inverter-and-battery-jodi/",
            },
            {
                title: "लिवगार्ड स्मार्ट और मजबूत इनवर्टर और बैटरी जोड़ी देखे",
            },
            {
                name: "description",
                content: "अपने घर की ऊर्जा जरूरतों को पूरा करने के लिए लिवगार्ड स्मार्ट इनवर्टर और बैटरी जोड़ी के साथ अपने घर को सशक्त बनाएं।",
            },
            {
                property: "og:url",
                content: "https://www.Livguard.com/campaigns/inverter-and-battery-jodi/",
            },
            {
                property: "og:title",
                content: "लिवगार्ड स्मार्ट और मजबूत इनवर्टर और बैटरी जोड़ी देखे",
            },
            {
                property: "og:description",
                content: "अपने घर की ऊर्जा जरूरतों को पूरा करने के लिए लिवगार्ड स्मार्ट इनवर्टर और बैटरी जोड़ी के साथ अपने घर को सशक्त बनाएं।",
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
                content: loaderData.ogBanner,
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
    imageMetaDataLibrary: {
        [relativePath: string]: ImageMetadata | undefined;
    };
    ogBanner: string;
};

export const loader: LoaderFunction = async ({request}) => {
    const userPreferences = await getUserPreferencesFromCookiesAndUrlSearchParameters(request);
    if (userPreferences instanceof Error) {
        throw userPreferences;
    }

    const vernacularData = getVernacularFromBackend("inverterBatteryComboPage", userPreferences.language);
    const imageMetaDataLibrary = getImageMetadataLibraryFromBackend("inverterBatteryComboPage");
    const ogBanner = getAbsolutePathForRelativePath(getMetadataForImageServerSide("/livguard/terms-and-conditions/og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null);

    const loaderData: LoaderData = {
        userPreferences: userPreferences,
        redirectTo: getRedirectToUrlFromRequest(request),
        pageUrl: getUrlFromRequest(request),
        vernacularData: vernacularData,
        imageMetaDataLibrary: imageMetaDataLibrary,
        ogBanner: ogBanner,
    };

    return loaderData;
};

export default function () {
    const {userPreferences, redirectTo, pageUrl, vernacularData, imageMetaDataLibrary} = useLoaderData() as LoaderData;

    const utmSearchParameters = useUtmSearchParameters();

    const secondaryNavigationController = useSecondaryNavigationController();

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
                        showMobileMenuIcon={false}
                        utmParameters={utmSearchParameters}
                        pageUrl={pageUrl}
                        breadcrumbs={[
                            {contentId: "cfab263f-0175-43fb-91e5-fccc64209d36", link: "/"},
                            {contentId: "fd6848f1-04eb-4f76-845f-e56d93835de6", link: "#"},
                        ]}
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
                    </PageScaffold>

                    <StickyLandingPage3BottomBar
                        userPreferences={userPreferences}
                        utmParameters={utmSearchParameters}
                        pageUrl={pageUrl}
                    />
                </ContentProviderContext.Provider>
            </ImageProviderContext.Provider>
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
        if (timeoutId != null) {
            clearTimeout(timeoutId);
        }
        if (formStateInputs.resendTimeOut > 0 && formStateInputs.showOtpField) {
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
        <div className="tw-grid tw-grid-rows-1 tw-grid-cols-1 lg:tw-grid-rows-1 lg:tw-grid-cols-[minmax(0,3fr),minmax(0,2fr)] tw-gap-x-1 tw-align-stretch tw-pb-10 lg:tw-pb-20">
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
            {/* <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-2 lg:tw-hidden tw-col-start-1 tw-col-span-full" /> */}
            {/* {isScreenSizeBelow && (
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
            )} */}

            <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-4 lg:tw-row-start-5 tw-col-start-1 tw-col-span-full" />

            <WhyLivguardComboSection
                userPreferences={userPreferences}
                className="tw-row-start-5 lg:tw-row-start-6 lg:tw-col-span-full tw-max-w-7xl tw-mx-auto tw-w-full"
            />
            <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-6 lg:tw-row-start-7 tw-col-start-1 tw-col-span-full" />

            <OurCombos
                userPreferences={userPreferences}
                className="tw-row-start-7  tw-col-start-1 lg:tw-row-start-8 lg:tw-col-start-1 lg:tw-col-span-2"
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

            <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-8 lg:tw-row-start-9 tw-col-start-1 tw-col-span-full" />

            <TvcSection
                userPreferences={userPreferences}
                utmParameters={utmParameters}
                className="tw-row-start-9 tw-col-start-1 lg:tw-row-start-10 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px] tw-max-w-7xl tw-w-full tw-m-auto"
                pageUrl={pageUrl}
            />
            <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-10 lg:tw-row-start-11 tw-col-start-1 tw-col-span-full" />

            <TapIntoEfficiency
                userPreferences={userPreferences}
                utmParameters={utmParameters}
                className="tw-col-start-1 tw-row-start-[11] lg:tw-row-start-12 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
                pageUrl={pageUrl}
            />
            <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-12 lg:tw-row-start-[13] tw-col-start-1 tw-col-span-full" />

            <TransformingLives
                userPreferences={userPreferences}
                className="tw-col-start-1 tw-row-start-[13] lg:tw-row-start-[14] lg:tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
            />
            <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[14] lg:tw-row-start-[15] tw-col-start-1 tw-col-span-full" />

            <FaqSection
                userPreferences={userPreferences}
                className="tw-row-start-[15] tw-col-start-1 lg:tw-row-start-[16] lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
            />
        </div>
    );
}

// function HeroSection({
//     userPreferences,
//     className,
//     fetcher,
//     otpFetcher,
//     utmParameters,
//     formStateInputs,
//     dispatch,
//     leadId,
//     pageUrl,
// }: {
//     userPreferences: UserPreferences;
//     className?: string;
//     fetcher: FetcherWithComponents<any>;
//     otpFetcher: FetcherWithComponents<any>;
//     utmParameters: {
//         [searchParameter: string]: string;
//     };
//     formStateInputs: FormStateInputs;
//     dispatch: React.Dispatch<FormStateInputsAction>;
//     leadId: Uuid;
//     pageUrl: string;
// }) {
//     const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();

//     const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
//     const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
//     useEffect(() => {
//         secondaryNavigationController.setSections((previousSections) => ({
//             ...previousSections,
//             top: {
//                 humanReadableName: contentData.getContent("9fc64723-0e15-4211-983a-ba03cf9a4d41"),
//                 isCurrentlyVisible: sectionInView,
//             },
//         }));
//     }, [sectionRef, sectionInView]);
//     return (
//         <div
//             className={concatenateNonNullStringsWithSpaces("tw-h-fit", className)}
//             id="top"
//             ref={sectionRef}
//         >
//             <div
//                 className={`tw-w-full tw-grid tw-justify-items-center tw-text-center lg:tw-text-left tw-relative lg:tw-grid-cols-2 tw-isolate`}
//                 ref={ref}
//             >
//                 {/* {containerWidth == null || containerHeight == null ? null : containerHeight > containerWidth || containerWidth < 640 ? (
//                 <div className="tw-row-start-1 tw-col-start-1 tw-row-span-full tw-col-span-full tw-w-full tw-h-full tw-relative -tw-z-10">
//                     <img
//                         src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/hero-banners/akshay-mobile.jpg")?.finalUrl, ImageCdnProvider.Bunny, 1080, 1080)}
//                         className="tw-w-full tw-h-full tw-absolute tw-inset-0 tw-object-cover -tw-z-10"
//                         key={"/livguard/hero-banners/akshay-mobile.jpg"}
//                     />
//                 </div>
//             ) : (
//                 <img
//                     src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/hero-banners/akshay-desktop.jpg")?.finalUrl, ImageCdnProvider.Bunny, 1080, null)}
//                     className="tw-w-full tw-h-full tw-absolute tw-inset-0 tw-object-cover tw-object-left-bottom -tw-z-10"
//                     key={"/livguard/hero-banners/akshay-desktop.jpg"}
//                 />
//             )} */}

//                 <div className="tw-row-start-1 tw-col-start-1 tw-row-span-full tw-col-span-full tw-w-full tw-h-fit tw-relative -tw-z-10">
//                     {/* <FullWidthImage relativePath="/livguard/inverter-batteries-combo/1/combo-desktop-banner.jpg" /> */}
//                     {containerWidth == null || containerWidth < 1024 ? (
//                         <FullWidthImage  relativePath="/livguard/inverter-batteries-combo/1/combo-mobile-banner.png" />
//                     ) : (
//                         <FullWidthImage relativePath="/livguard/inverter-batteries-combo/1/combo-desktop-banner.jpg" />
//                     )}

//                     {containerWidth == null ? null : (
//                         <>
//                             {/* <img
//                                 src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/common/akshay.png")?.finalUrl, ImageCdnProvider.Bunny, null, null)}
//                                 alt="Akshay Kumar"
//                                 className={concatenateNonNullStringsWithSpaces(
//                                     "tw-absolute",
//                                     containerWidth < 768 ? "tw-bottom-0 tw-right-0 tw-w-[30%]" : containerWidth < 1024 ? "tw-bottom-0 tw-right-0 tw-h-3/5" : "tw-bottom-0 tw-left-[30%] tw-h-3/5",
//                                 )}
//                             /> */}

//                             <img
//                                 src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/lp3/1/combo.png")?.finalUrl, ImageCdnProvider.Bunny, 240, null)}
//                                 alt="Livguard inverter-battery combo"
//                                 className={concatenateNonNullStringsWithSpaces(
//                                     "tw-absolute",
//                                     containerWidth < 768 ? "tw-bottom-0 tw-left-0 tw-w-3/5" : containerWidth < 1024 ? "tw-bottom-0 tw-left-0 tw-w-3/5" : "-tw-bottom-5 tw-left-[120px] tw-h-1/2",
//                                 )}
//                             />
//                         </>
//                     )}
//                 </div>

//                 <div className="tw-row-start-1 tw-col-start-1 lg:tw-place-self-start lg:tw-col-start-1 tw-pt-36 lg:tw-pt-8 tw-h-fit">
//                     <DefaultTextAnimation className="">
//                         <div
//                             dangerouslySetInnerHTML={{__html: contentData.getContent("0532fdf6-0988-4275-a797-3c8db1cacc2f")}}
//                             className="lg-text-banner lg-px-screen-edge lg:tw-pl-[120px] sm:max-lg:tw-w-4/5 sm:max-lg:tw-mx-auto"
//                         />
//                     </DefaultTextAnimation>

//                     <VerticalSpacer className="tw-h-2" />

//                     {/* <DefaultTextAnimation className="tw-row-start-6 tw-col-start-1 lg:tw-place-self-start lg:tw-max-w-[620px] lg:tw-col-start-1">
//                         <div
//                             dangerouslySetInnerHTML={{__html: contentData.getContent("landingPage3S1T2")}}
//                             className="lg-text-title1 lg-px-screen-edge tw-text-white lg:tw-pl-[120px]"
//                         />
//                     </DefaultTextAnimation> */}

//                     <DefaultElementAnimation className="lg:tw-pl-[120px]">
//                         <Link
//                             to="#contact-us-form-mobile"
//                             className="lg-cta-button lg-px-screen-edge lg:tw-pl-[60px] tw-w-fit max-lg:tw-mx-auto"
//                         >
//                             {contentData.getContent("landingPage3S1T3")}
//                         </Link>
//                     </DefaultElementAnimation>
//                 </div>

//                 {/* <div className="tw-row-[11] tw-col-start-1 tw-col-span-full">
//                     <Link
//                         to="#contact-us-form-mobile"
//                         className="tw-block lg:tw-hidden"
//                     >
//                         <ChevronDoubleDownIcon className="tw-w-12 tw-h-12 lg-text-primary-500 tw-animate-bounce" />
//                     </Link>

//                     <Link
//                         to="#energy-solutions"
//                         className="tw-hidden lg:tw-block"
//                     >
//                         <ChevronDoubleDownIcon className="tw-w-12 tw-h-12 lg-text-primary-500 tw-animate-bounce" />
//                     </Link>
//                 </div> */}

//                 {/* <div className="tw-hidden lg:tw-flex lg:tw-items-center lg:tw-justify-center lg:tw-col-start-2 lg:tw-row-start-1 lg:tw-row-span-full">
//                     <div
//                         className="lg:tw-w-[25rem]"
//                         id="contact-us-form-desktop"
//                     >
//                         {!formStateInputs.formSuccessfullySubmitted ? (
//                             <ContactForm
//                                 userPreferences={userPreferences}
//                                 fetcher={fetcher}
//                                 otpFetcher={otpFetcher}
//                                 utmParameters={utmParameters}
//                                 formStateInputs={formStateInputs}
//                                 dispatch={dispatch}
//                                 leadId={leadId}
//                                 pageUrl={pageUrl}
//                             />
//                         ) : (
//                             <ContactFormSuccess userPreferences={userPreferences} />
//                         )}
//                     </div>
//                 </div> */}
//             </div>
//         </div>
//     );
// }
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
    const contentData = useContext(ContentProviderContext);
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();

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
                "tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height)-7.5rem)] lg:tw-h-[calc(100vh-9rem)] tw-min-h-[calc(100vw*7/16)]",

                className,
            )}
            // id="top"
            // ref={sectionRef}
        >
            <div
                className={`tw-h-full tw-w-full tw-grid tw-justify-items-center tw-text-center lg:tw-text-left tw-relative lg:tw-grid-cols-2 tw-isolate ${
                    containerWidth == null || containerWidth < 380
                        ? "tw-grid-rows-[1.5rem_0_0_auto_0.5rem_auto_1rem_auto_1rem_minmax(0,1fr)_auto_1.5rem]"
                        : containerWidth < 1028
                        ? "tw-grid-rows-[1.5rem_3rem_0_auto_0.5rem_auto_1rem_auto_1rem_minmax(0,1fr)_auto_1.5rem]"
                        : "tw-grid-rows-[1.5rem_3rem_minmax(0,1fr)_auto_0.5rem_auto_1rem_auto_1rem_minmax(0,1fr)_auto_1.5rem]"
                }`}
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
                                    containerWidth < 768 ? "tw-bottom-0 tw-right-0 tw-w-[30%]" : containerWidth < 1024 ? "tw-bottom-0 tw-right-0 tw-h-3/5" : "tw-bottom-0 tw-right-[5%] tw-h-3/5",
                                )}
                            />

                            <img
                                src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/lp3/1/combo.png")?.finalUrl, ImageCdnProvider.Bunny, 360, null)}
                                alt="Livguard inverter-battery combo"
                                className={concatenateNonNullStringsWithSpaces(
                                    "tw-absolute",
                                    containerWidth < 768 ? "tw-bottom-0 tw-left-0 tw-w-2/5" : containerWidth < 1024 ? "tw-bottom-0 tw-left-0 tw-h-3/5" : "tw-bottom-[-5rem] tw-right-[20%] tw-h-3/5",
                                )}
                            />
                        </>
                    )}
                </div>

                <DefaultTextAnimation className="tw-row-start-4 tw-col-start-1 lg:tw-place-self-start lg:tw-col-start-1">
                    <div
                        dangerouslySetInnerHTML={{__html: contentData.getContent("landingPage3S1T1")}}
                        className="lg-text-banner lg-px-screen-edge tw-text-white lg:tw-pl-[120px]"
                    />
                </DefaultTextAnimation>

                <DefaultTextAnimation className="tw-row-start-6 tw-col-start-1 lg:tw-place-self-start lg:tw-max-w-[620px] lg:tw-col-start-1">
                    <div
                        dangerouslySetInnerHTML={{__html: contentData.getContent("landingPage3S1T2")}}
                        className="lg-text-title1 lg-px-screen-edge tw-text-white lg:tw-pl-[120px]"
                    />
                </DefaultTextAnimation>

                <DefaultElementAnimation className="tw-row-[8] tw-col-start-1 lg:tw-place-self-start lg:tw-pl-[120px] lg:tw-col-start-1 tw-mb-4">
                    <ContactUsCta
                        userPreferences={userPreferences}
                        textVernacId={"24923d9b-841d-4411-8e09-b68ff2cac742"}
                        className="tw-z-10"
                        utmParameters={utmParameters}
                        pageUrl={pageUrl}
                    />
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

                {/* <div className="tw-hidden lg:tw-flex lg:tw-items-center lg:tw-justify-center lg:tw-col-start-2 lg:tw-row-start-1 lg:tw-row-span-full">
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
                </div> */}
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
//                     dangerouslySetInnerHTML={{__html: contentData.getContent("landingPage3S1T1")}}
//                     className="lg-text-banner lg-px-screen-edge tw-text-white"
//                 />
//             </DefaultTextAnimation>

//             <DefaultTextAnimation className="tw-row-start-6 tw-col-start-1">
//                 <div
//                     dangerouslySetInnerHTML={{__html: contentData.getContent("landingPage3S1T2")}}
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
    const contentData = useContext(ContentProviderContext);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "watch-digital-film": {
                humanReadableName: contentData.getContent("e543a55b-6744-49a7-8d5f-6cf2641ca056"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-flex tw-flex-col tw-justify-center tw-items-center", className)}
            id="watch-digital-film"
            ref={sectionRef}
        >
            <div className="lg-text-headline">
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent("71bf111f-fc1f-4026-baeb-9b4981a8aba9")}} />
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
    const contentData = useContext(ContentProviderContext);
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
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "battery-combo": {
                humanReadableName: contentData.getContent("0778c1ff-2e3c-4773-889f-6f01e0e58f0e"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-flex tw-flex-col tw-justify-center tw-items-center", className)}
            id="battery-combo"
            ref={sectionRef}
        >
            <div className="lg-text-headline">
                <DefaultTextAnimation>
                    <div
                        dangerouslySetInnerHTML={{__html: contentData.getContent("landingPage3S7HT1")}}
                        className="tw-text-center"
                    />
                </DefaultTextAnimation>
                <DefaultTextAnimation>
                    <div
                        dangerouslySetInnerHTML={{__html: contentData.getContent("landingPage3S7HT2")}}
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
                            className={`tw-col-start-${cardIndex + 1} lg-card lg-card-shadow-hack tw-p-2 tw-pt-6 tw-w-full tw-h-full tw-flex tw-flex-col tw-items-center tw-text-center`}
                            key={cardIndex}
                        >
                            <div className="tw-row-start-2 lg:tw-col-start-1 tw-text-center lg:te-text-left lg:tw-h-full tw-flex-1 tw-flex tw-flex-col">
                                <DefaultTextAnimation>
                                    <div
                                        className="lg-text-title1"
                                        dangerouslySetInnerHTML={{__html: contentData.getContent(card.titleTextContentPiece)}}
                                    />
                                </DefaultTextAnimation>

                                <div className="tw-h-2" />

                                <DefaultTextAnimation className="tw-flex-1">
                                    <div className="lg-text-body lg-text-secondary-700 tw-flex-1">{contentData.getContent(card.bodyTextContentPiece)}</div>
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
        <div className={concatenateNonNullStringsWithSpaces("", className)}>
            <FaqSectionInternal
                faqs={faqs}
                userPreferences={userPreferences}
                className={className}
            />
        </div>
    );
}

function DealerLocator({userPreferences, showCtaButton, className}: {userPreferences: UserPreferences; showCtaButton: boolean; className?: string}) {
    const contentData = useContext(ContentProviderContext);
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
                            <div dangerouslySetInnerHTML={{__html: contentData.getContent("homeS10H1T1")}} />
                            <div dangerouslySetInnerHTML={{__html: contentData.getContent("homeS10H1T2")}} />
                        </div>

                        <VerticalSpacer className="tw-h-1" />

                        <div className="tw-z-10 lg-text-title2 tw-text-center">{contentData.getContent("homeS10T2")}</div>

                        {showCtaButton && (
                            <>
                                <VerticalSpacer className="tw-h-6" />

                                <Link
                                    to="/dealer-for-inverters-and-batteries"
                                    className="tw-z-10 lg-cta-button"
                                >
                                    {contentData.getContent("homeS10T3")}
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
                                <div dangerouslySetInnerHTML={{__html: contentData.getContent("homeS10H1T1")}} />
                                <div dangerouslySetInnerHTML={{__html: contentData.getContent("homeS10H1T2")}} />
                            </div>

                            <VerticalSpacer className="tw-h-1" />

                            <div className="tw-z-10 lg-text-title2 tw-text-center">{contentData.getContent("homeS10T2")}</div>

                            {showCtaButton && (
                                <>
                                    <VerticalSpacer className="tw-h-6" />

                                    <Link
                                        to="/dealer-for-inverters-and-batteries"
                                        className="tw-z-10 lg-cta-button"
                                    >
                                        {contentData.getContent("homeS10T3")}
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

function WhyLivguardComboSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "livguard-combo": {
                humanReadableName: contentData.getContent("b708a357-961a-4b28-afec-1e538023a140"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("", className)}
            id="livguard-combo"
            ref={sectionRef}
        >
            <WhyLivguardCombo
                userPreferences={userPreferences}
                className=""
            />
        </div>
    );
}

function OurCombos({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "our-combos": {
                humanReadableName: contentData.getContent("e0e7bba0-3200-4edf-870d-4c03a86ce636"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("", className)}
            id="our-combos"
            ref={sectionRef}
        >
            <ComboSection
                userPreferences={userPreferences}
                className=""
            />
        </div>
    );
}
