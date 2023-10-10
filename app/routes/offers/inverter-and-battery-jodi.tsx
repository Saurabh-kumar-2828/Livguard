import {Dialog, Transition} from "@headlessui/react";
import type {LinksFunction, LoaderFunction, MetaFunction, V2_MetaFunction} from "@remix-run/node";
import {useFetcher, useLoaderData} from "@remix-run/react";
import React, {useContext, useReducer, useRef} from "react";
import {useEffect, useState} from "react";
import {CircleFill, X} from "react-bootstrap-icons";
import {useResizeDetector} from "react-resize-detector";
import {toast} from "react-toastify";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import LivguardDialog from "~/components/livguardDialog";
import {OfferPageBottomBar} from "~/components/offerPageBottomBar";
import {CoverImage} from "~/components/images/coverImage";
import {FixedWidthImage} from "~/components/images/fixedWidthImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import type {Uuid} from "~/common--type-definitions/typeDefinitions";
import {concatenateNonNullStringsWithSpaces, generateUuid} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {indianPhoneNumberValidationPattern} from "~/global-common-typescript/utilities/validationPatterns";
import {CampaignPageScaffold} from "~/routes/campaigns/campaignPageScaffold.component";
import {FormSubmissionSuccessLivguardDialog} from "~/routes/dealer-for-inverters-and-batteries";
import type {FormStateInputsAction} from "~/routes/lead-form.state";
import {FormStateInputsActionType, FormStateInputsReducer, createInitialFormState} from "~/routes/lead-form.state";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {UserPreferences} from "~/typeDefinitions";
import {FormType, Language} from "~/typeDefinitions";
import {appendSpaceToString, getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {getContentGenerator} from "~/vernacularProvider";
import {getVernacularFromBackend} from "~/backend/vernacularProvider.server";
import {ContentProviderContext} from "~/contexts/contentProviderContext";

export const meta: V2_MetaFunction = ({data: loaderData}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = loaderData.userPreferences;
    if (userPreferences.language == Language.English) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/offers/inverter-and-battery-jodi",
            },
            {
                title: "Buy Livguard Inverter Battery Combo and win cashback upto Rs. 1500",
            },
            {
                name: "description",
                content: "Experience an uninterrupted summer with Livguard Inverter and Battery Combos and enjoy up to ₹1500 cashback! The offer is for limited time grab it now",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/offers/inverter-and-battery-jodi",
            },
            {
                property: "og:title",
                content: "Buy Livguard Inverter Battery Combo and win cashback upto Rs. 1500",
            },
            {
                property: "og:description",
                content: "Experience an uninterrupted summer with Livguard Inverter and Battery Combos and enjoy up to ₹1500 cashback! The offer is for limited time grab it now",
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
                content: "",
            },
        ];
    } else if (userPreferences.language == Language.Hindi) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/offers/inverter-and-battery-jodi",
            },
            {
                title: "लिवगार्ड इन्वर्टर बैटरी कॉम्बो खरीदें और रुपये 1500 तक कैशबैक जीतें।",
            },
            {
                name: "description",
                content: "लिवगार्ड इन्वर्टर और बैटरी कॉम्बो के साथ गर्मी के मौसम को परेशानी मुक्त बनाएँ और ₹1500 तक कैशबैक का आनंद लें! ऑफर सीमित समय के लिए है इसे अभी खरीदें",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/offers/inverter-and-battery-jodi",
            },
            {
                property: "og:title",
                content: "लिवगार्ड इन्वर्टर बैटरी कॉम्बो खरीदें और रुपये 1500 तक कैशबैक जीतें।",
            },
            {
                property: "og:description",
                content: "लिवगार्ड इन्वर्टर और बैटरी कॉम्बो के साथ गर्मी के मौसम को परेशानी मुक्त बनाएँ और ₹1500 तक कैशबैक का आनंद लें! ऑफर सीमित समय के लिए है इसे अभी खरीदें",
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
                content: "",
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
};

export const loader: LoaderFunction = async ({request}) => {
    const userPreferences = await getUserPreferencesFromCookiesAndUrlSearchParameters(request);
    if (userPreferences instanceof Error) {
        throw userPreferences;
    }

    const vernacularData = getVernacularFromBackend("inverterBatteryJodiOfferPage", userPreferences.language);

    const loaderData: LoaderData = {
        userPreferences: userPreferences,
        redirectTo: getRedirectToUrlFromRequest(request),
        pageUrl: getUrlFromRequest(request),
        vernacularData: vernacularData,
    };

    return loaderData;
};

export default function () {
    const {userPreferences, redirectTo, pageUrl, vernacularData} = useLoaderData() as LoaderData;

    const utmSearchParameters = useUtmSearchParameters();

    return (
        <>
            <ContentProviderContext.Provider
                value={{
                    getContent: getContentGenerator(vernacularData),
                }}
            >
                <CampaignPageScaffold
                    userPreferences={userPreferences}
                    redirectTo={redirectTo}
                    showMobileMenuIcon={false}
                    utmParameters={utmSearchParameters}
                    showContactCtaButton={true}
                    showSearchOption={false}
                    pageUrl={pageUrl}
                >
                    <LandingPage
                        userPreferences={userPreferences}
                        utmParameters={utmSearchParameters}
                    />
                </CampaignPageScaffold>

                <OfferPageBottomBar
                    userPreferences={userPreferences}
                    pageUrl={pageUrl}
                />
            </ContentProviderContext.Provider>
        </>
    );
}

function LandingPage({
    userPreferences,
    utmParameters,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
}) {
    return (
        <div className="tw-grid tw-grid-rows-1 tw-grid-cols-1 lg:tw-grid-rows-1 lg:tw-grid-cols-6 tw-gap-x-8 tw-align-stretch">
            <HeroSection
                userPreferences={userPreferences}
                utmParameters={utmParameters}
                className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
            />

            <VerticalSpacer className="tw-row-start-2 tw-col-start-1 lg:tw-col-span-full tw-h-10 lg:tw-h-20" />

            <StepsToAvailCashback
                userPreferences={userPreferences}
                className="lg-px-screen-edge tw-row-start-3 tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-row-start-4 tw-col-start-1 lg:tw-col-span-full tw-h-10 lg:tw-h-20" />

            <TermsAndConditions
                userPreferences={userPreferences}
                className="lg-px-screen-edge tw-row-start-5 tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px]"
            />
        </div>
    );
}

export function HeroSection({
    userPreferences,
    utmParameters,
    className,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
    className?: string;
}) {
    const contentData = useContext(ContentProviderContext);
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();

    return (
        // screen = 48px + 56px + ? + 32px + 56px + 32px + 90px
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-h-[calc(100vh-13.625rem-var(--lg-mobile-ui-height))] lg:tw-h-[calc(100vh-9rem)] tw-min-h-[calc(100vw*7/16)] tw-overflow-hidden tw-grid tw-grid-rows-[1.5rem_3rem_minmax(0,1fr)_auto_1rem_auto_1rem_minmax(0,1fr)_auto_3rem] tw-justify-items-center tw-text-secondary-900-dark tw-relative",
                className,
            )}
            ref={ref}
        >
            {containerWidth == null || containerHeight == null ? null : (
                <CoverImage
                    relativePath={
                        containerHeight > containerWidth || containerWidth < 640
                            ? userPreferences.language == Language.English
                                ? "/livguard/offers/top-banner-mobile-english.png"
                                : "/livguard/offers/top-banner-mobile-hindi.png"
                            : userPreferences.language == Language.English
                            ? "/livguard/offers/top-banner-desktop-english.png"
                            : "/livguard/offers/top-banner-desktop-hindi.png"
                    }
                    className="tw-row-start-1 tw-col-start-1 tw-row-span-full"
                    key={
                        containerHeight > containerWidth || containerWidth < 640
                            ? userPreferences.language == Language.English
                                ? "/livguard/offers/top-banner-mobile-english.png"
                                : "/livguard/offers/top-banner-mobile-hindi.png"
                            : userPreferences.language == Language.English
                            ? "/livguard/offers/top-banner-desktop-english.png"
                            : "/livguard/offers/top-banner-desktop-hindi.png"
                    }
                />
            )}

            <div className="tw-absolute tw-left-5 tw-bottom-5">*T&C Apply</div>
        </div>
    );
}

export function StepsToAvailCashback({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    const steps = [
        {
            iconRelativePath: "livguard/icons/offers/step-1.svg",
            stepVernacId: "OfferStep1",
        },
        {
            iconRelativePath: "livguard/icons/offers/step-2.svg",
            stepVernacId: "OfferStep2",
        },
        {
            iconRelativePath: "livguard/icons/offers/step-3.svg",
            stepVernacId: "OfferStep3",
        },
        {
            iconRelativePath: "livguard/icons/offers/step-4.svg",
            stepVernacId: "OfferStep4",
        },
        {
            iconRelativePath: "livguard/icons/offers/step-5.svg",
            stepVernacId: "OfferStep5",
        },
        {
            iconRelativePath: "livguard/icons/offers/step-6.svg",
            stepVernacId: "OfferStep6",
        },
    ];

    return (
        <div className={className}>
            <div className="tw-flex tw-flex-col tw-items-center tw-justify-center">
                <DefaultTextAnimation>
                    <h1 className="lg-text-headline tw-text-center">
                        <div dangerouslySetInnerHTML={{__html: appendSpaceToString(contentData.getContent("OfferComboHT1"))}} />
                    </h1>
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-3 lg:tw-h-6" />

                <DefaultTextAnimation>
                    <div
                        className="lg-text-body tw-max-w-[45rem] tw-text-center"
                        dangerouslySetInnerHTML={{__html: appendSpaceToString(contentData.getContent("OfferComboHT2"))}}
                    />
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-3 lg:tw-h-6" />

                <DefaultTextAnimation>
                    <div className="lg-text-title1">{contentData.getContent("OfferComboHT3")}</div>
                </DefaultTextAnimation>
            </div>

            <VerticalSpacer className="tw-h-6 lg:tw-h-6" />

            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-3 tw-gap-6 lg:tw-gap-4">
                <ItemBuilder
                    items={steps}
                    itemBuilder={(step, stepIndex) => (
                        <div
                            className="lg-bg-secondary-100 tw-rounded-lg lg:tw-pl-[3.5rem] tw-p-6 tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-relative tw-isolate tw-gap-4 tw-h-[9rem] lg:tw-min-h-[10rem] tw-items-center"
                            key={stepIndex}
                        >
                            <div className="tw-absolute tw-inset-0 tw-grid tw-items-end">
                                <div className="-tw-z-10 tw-text-[12rem] tw-leading-[10rem] lg:tw-text-[14rem] lg:tw-leading-[11rem] tw-place-self-end lg:tw-place-self-start tw-font-bold tw-opacity-20 tw-pr-5 tw-place-items-end lg-text-secondary-300">{`${
                                    stepIndex + 1
                                }`}</div>
                            </div>
                            <div className="tw-col-start-1 tw-items-center">
                                <div className="tw-w-12 tw-h-12 lg-bg-secondary-300 tw-rounded-full tw-justify-items-center tw-grid">
                                    <div className="tw-w-6 tw-h-6 tw-place-self-center">
                                        <img
                                            src={`https://files.growthjockey.com/${step.iconRelativePath}`}
                                            alt="step-icon"
                                            className="tw-w-full tw-h-full"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="tw-col-start-2 tw-grid tw-grid-rows-[auto_minmax(0,1fr)] tw-items-start">
                                <div className="tw-row-start-1">{`${contentData.getContent("OfferStep")} ${stepIndex + 1}`}</div>
                                <div className="tw-row-start-2">{<div dangerouslySetInnerHTML={{__html: appendSpaceToString(contentData.getContent(step.stepVernacId))}} />}</div>
                            </div>
                        </div>
                    )}
                />
            </div>
        </div>
    );
}

export function TermsAndConditions({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    const [showTnCDialog, setShowTnCDialog] = useState(false);

    return (
        <div className={className}>
            <div className="tw-flex tw-flex-col tw-justify-start">
                <DefaultTextAnimation>
                    <div className="lg-text-title2">{contentData.getContent("OfferTnCApplied")}</div>
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-3" />

                <DefaultTextAnimation>
                    <li className="lg-text-body">{contentData.getContent("OfferTnCContent1")}</li>
                </DefaultTextAnimation>
                <DefaultTextAnimation>
                    <li className="lg-text-body">{contentData.getContent("OfferTnCContent2")}</li>
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-3" />

                <DefaultTextAnimation>
                    <div
                        className="lg-text-body tw-underline-offset-2 tw-underline hover:tw-cursor-pointer tw-w-fit"
                        onClick={() => {
                            setShowTnCDialog(true);
                        }}
                    >
                        {contentData.getContent("OfferTnCReadMore")}
                    </div>
                </DefaultTextAnimation>
            </div>

            <TermsAndConditionsDialog
                showTnCDialog={showTnCDialog}
                setShowTnCDialog={setShowTnCDialog}
                userPreferences={userPreferences}
            />
        </div>
    );
}

export function OfferContactUsCta({userPreferences, textVernacId, className, pageUrl}: {userPreferences: UserPreferences; textVernacId: string; className?: string; pageUrl: string}) {
    const contentData = useContext(ContentProviderContext);
    const [isOfferContactUsDialogOpen, setIsOfferContactUsDialogOpen] = useState(false);
    const utmParameters = useUtmSearchParameters();

    function tryToOpenOfferContactUsDialog() {
        setIsOfferContactUsDialogOpen(true);
    }

    return (
        <div className={className}>
            <button
                type="button"
                className="lg-cta-button !tw-px-6 tw-grid tw-grid-flow-col tw-gap-2 tw-items-center"
                onClick={tryToOpenOfferContactUsDialog}
            >
                <FixedWidthImage
                    relativePath="/livguard/icons/enquire_now.png"
                    width="1.25rem"
                />

                {contentData.getContent(textVernacId)}
            </button>

            <OfferContactUsDialog
                userPreferences={userPreferences}
                isOfferContactUsDialogOpen={isOfferContactUsDialogOpen}
                setIsOfferContactUsDialogOpen={setIsOfferContactUsDialogOpen}
                utmParameters={utmParameters}
                pageUrl={pageUrl}
            />
        </div>
    );
}

export function OfferContactUsDialog({
    userPreferences,
    isOfferContactUsDialogOpen,
    setIsOfferContactUsDialogOpen,
    utmParameters,
    pageUrl,
}: {
    userPreferences: UserPreferences;
    isOfferContactUsDialogOpen: boolean;
    setIsOfferContactUsDialogOpen: React.Dispatch<boolean>;
    utmParameters: {[searchParameter: string]: string};
    pageUrl: string;
}) {
    const contentData = useContext(ContentProviderContext);
    // TODO: Understand why we cannot use action for this
    const fetcher = useFetcher();
    const otpFetcher = useFetcher();
    const otpFieldRef = useRef(null);
    const phoneNumberRef = useRef(null);
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

    function tryToCloseOfferContactUsDialog() {
        setIsOfferContactUsDialogOpen(false);
        const action: FormStateInputsAction = {
            actionType: FormStateInputsActionType.TryToCloseDialog,
            payload: true,
        };
        dispatch(action);
    }

    return (
        <>
            <LivguardDialog
                isDialogOpen={isOfferContactUsDialogOpen && !formStateInputs.formSuccessfullySubmitted}
                tryToCloseDialog={tryToCloseOfferContactUsDialog}
                title={contentData.getContent("headerMenuS2T1")}
                showCloseIcon={false}
            >
                <fetcher.Form
                    className="tw-w-full tw-flex tw-flex-col"
                    method="post"
                    action="/lead-form-submission"
                >
                    <div className="lg-text-body-bold lg-text-secondary-900 tw-pl-3">{contentData.getContent("contactUsT3")}</div>

                    <VerticalSpacer className="tw-h-1" />

                    <input
                        type="text"
                        name="name"
                        required
                        className="lg-text-input"
                        onChange={(e) => {
                            const action: FormStateInputsAction = {
                                actionType: FormStateInputsActionType.SetName,
                                payload: e.target.value,
                            };
                            dispatch(action);
                        }}
                    />

                    <VerticalSpacer className="tw-h-2" />

                    {!formStateInputs.showOtpField ? (
                        <div className="lg-text-body-bold lg-text-secondary-900 tw-pl-3">{contentData.getContent("contactUsT2")}</div>
                    ) : (
                        <div className="tw-grid tw-w-full tw-items-center tw-grid-cols-[auto_0.5rem_minmax(0,1fr)] tw-pl-3">
                            <div
                                className="tw-col-start-1 tw-text-primary-500-light hover:tw-cursor-pointer lg-text-body-bold"
                                onClick={(e) => {
                                    const action: FormStateInputsAction = {
                                        actionType: FormStateInputsActionType.EditPhoneNumber,
                                        payload: true,
                                    };
                                    dispatch(action);
                                    if (phoneNumberRef.current != null) {
                                        phoneNumberRef.current.focus();
                                    }
                                }}
                            >
                                {contentData.getContent("phoneNumberChnage")}
                            </div>
                            <div className="tw-col-start-3 lg-text-secondary-900 lg-text-body-bold">{formStateInputs.inputData.phoneNumber}</div>
                        </div>
                    )}

                    <VerticalSpacer className="tw-h-1" />

                    {!formStateInputs.showOtpField ? (
                        <div className="tw-relative tw-w-full tw-items-center tw-grid">
                            <input
                                type="text"
                                name="phoneNumber"
                                pattern={indianPhoneNumberValidationPattern}
                                required
                                autoFocus={true}
                                className="lg-text-input tw-w-full"
                                disabled={formStateInputs.showOtpField}
                                defaultValue={formStateInputs.inputData.phoneNumber}
                                ref={phoneNumberRef}
                                onChange={(e) => {
                                    const phoneNumber = e.target.value;
                                    const action: FormStateInputsAction = {
                                        actionType: FormStateInputsActionType.SetPhoneNumber,
                                        payload: phoneNumber,
                                    };
                                    dispatch(action);
                                    if (phoneNumber.length == 10) {
                                        const action: FormStateInputsAction = {
                                            actionType: FormStateInputsActionType.SetShowOtpButton,
                                            payload: true,
                                        };
                                        dispatch(action);
                                    } else {
                                        const action: FormStateInputsAction = {
                                            actionType: FormStateInputsActionType.SetShowOtpButton,
                                            payload: false,
                                        };
                                        dispatch(action);
                                    }
                                }}
                                onBlur={(e) => {
                                    if (formStateInputs.inputData.phoneNumber.length == 10) {
                                        const action: FormStateInputsAction = {
                                            actionType: FormStateInputsActionType.SetShowOtpButton,
                                            payload: true,
                                        };
                                        dispatch(action);
                                    }
                                }}
                                onFocus={(e) => {
                                    if (formStateInputs.inputData.phoneNumber.length == 10) {
                                        const action: FormStateInputsAction = {
                                            actionType: FormStateInputsActionType.SetShowOtpButton,
                                            payload: true,
                                        };
                                        dispatch(action);
                                    }
                                }}
                            />
                            <div
                                className={concatenateNonNullStringsWithSpaces(
                                    "tw-absolute tw-right-2 tw-bg-gradient-to-r tw-from-[#F25F60] tw-to-[#EB2A2B] tw-rounded-full tw-px-2 tw-py-1 tw-items-center tw-text-secondary-100-light hover:tw-cursor-pointer",
                                    formStateInputs.showOtpButton ? "tw-opacity-100 tw-duration-100 tw-z-10" : "tw-opacity-0 -tw-z-100 tw-duration-100",
                                )}
                                onClick={(e) => {
                                    if (formStateInputs.inputData.name == "") {
                                        toast.error("Name field can't be empty");
                                        return;
                                    }
                                    const action: FormStateInputsAction = {
                                        actionType: FormStateInputsActionType.SendOtp,
                                        payload: true,
                                    };
                                    dispatch(action);
                                    if (otpFieldRef.current != null) {
                                        otpFieldRef.current.focus();
                                    }
                                    const data = new FormData();
                                    data.append("phoneNumber", formStateInputs.inputData.phoneNumber);
                                    data.append("name", formStateInputs.inputData.name);
                                    otpFetcher.submit(data, {method: "post", action: "/resend-otp"});
                                }}
                            >
                                {contentData.getContent("OfferFormGetOTP")}
                            </div>
                        </div>
                    ) : (
                        <div
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-flex tw-flex-col tw-w-full",
                                formStateInputs.showOtpField ? "tw-opacity-100 tw-duration-100 tw-z-10" : "tw-opacity-0 -tw-z-100",
                            )}
                        >
                            {/* <div className="lg-text-body-bold lg-text-secondary-900 tw-pl-3">{contentData.getContent("contactUsOTPT3")}</div>

                            <VerticalSpacer className="tw-h-1" /> */}

                            <div className="tw-relative">
                                <input
                                    type="text"
                                    name="otpSubmitted"
                                    className="lg-text-input"
                                    required
                                    placeholder={contentData.getContent("contactUsOTPT3E")}
                                    ref={otpFieldRef}
                                    onChange={(e) => {
                                        const action: FormStateInputsAction = {
                                            actionType: FormStateInputsActionType.SetOtpSubmitted,
                                            payload: e.target.value,
                                        };
                                        dispatch(action);
                                    }}
                                />
                                {formStateInputs.invalidOtp && (
                                    <div className="lg-text-primary-500 tw-absolute lg-text-icon tw-right-2 tw-top-0 tw-bottom-0 tw-pt-[18px]">{contentData.getContent("OfferInvalidOTP")}</div>
                                )}
                            </div>
                        </div>
                    )}

                    <VerticalSpacer className="tw-h-1" />

                    <div
                        className={concatenateNonNullStringsWithSpaces(
                            "tw-flex tw-flex-row tw-justify-between tw-w-full tw-px-3",
                            formStateInputs.showOtpField ? "tw-opacity-100 tw-duration-100 tw-z-10" : "tw-opacity-0 -tw-z-100",
                        )}
                    >
                        <div
                            className={concatenateNonNullStringsWithSpaces("lg-text-secondary-700 tw-text-[12px]", `${formStateInputs.resendTimeOut > 0 ? "undefined" : "hover:tw-cursor-pointer"}`)}
                            onClick={() => {
                                const action: FormStateInputsAction = {
                                    actionType: FormStateInputsActionType.SetIsOtpResent,
                                    payload: true,
                                };
                                dispatch(action);
                                const data = new FormData();
                                data.append("phoneNumber", formStateInputs.inputData.phoneNumber);
                                data.append("name", formStateInputs.inputData.name);
                                otpFetcher.submit(data, {method: "post", action: "/resend-otp"});
                            }}
                        >
                            {contentData.getContent("OfferResendOTP")}
                        </div>
                        <div className="lg-text-secondary-700 tw-text-[12px]">{`00:${formStateInputs.resendTimeOut}`}</div>
                    </div>

                    <VerticalSpacer className="tw-h-4" />

                    <input
                        name="utmParameters"
                        className="tw-hidden"
                        readOnly
                        value={JSON.stringify(utmParameters)}
                    />

                    <input
                        name="leadId"
                        className="tw-hidden"
                        readOnly
                        value={leadId.current}
                    />

                    <input
                        name="inputData"
                        className="tw-hidden"
                        readOnly
                        value={JSON.stringify(formStateInputs.inputData)}
                    />

                    <input
                        name="formType"
                        className="tw-hidden"
                        readOnly
                        value={FormType.offerContactUsSubmission}
                    />

                    <input
                        name="pageUrl"
                        className="tw-hidden"
                        readOnly
                        value={pageUrl}
                    />

                    <div className="tw-w-full tw-flex tw-flex-row tw-gap-x-2 tw-justify-center tw-items-center">
                        <input
                            type="checkbox"
                            name="termsAndConditionsChecked"
                            style={{accentColor: `${formStateInputs.inputData.termsAndConditionsChecked ? "#eb2a2b" : "white"}`}}
                            defaultChecked={formStateInputs.inputData.termsAndConditionsChecked}
                            required
                            onChange={(e) => {
                                const action: FormStateInputsAction = {
                                    actionType: FormStateInputsActionType.TermsAndConditionsCheckboxClicked,
                                    payload: e.target.value,
                                };
                                dispatch(action);
                            }}
                        />

                        <div dangerouslySetInnerHTML={{__html: contentData.getContent("termsAndConditionsCheckboxtext")}} />
                    </div>

                    <button
                        type="submit"
                        className="lg-cta-button tw-px-4 tw-self-center tw-w-60"
                        disabled={
                            fetcher.state != "idle" ||
                            formStateInputs.inputData.name == "" ||
                            formStateInputs.inputData.phoneNumber == "" ||
                            formStateInputs.inputData.phoneNumber.length != 10 ||
                            formStateInputs.inputData.otpSubmitted == "" ||
                            formStateInputs.inputData.otpSubmitted.length != 6
                        }
                    >
                        {contentData.getContent("contactUsT5")}
                    </button>
                </fetcher.Form>
            </LivguardDialog>

            <FormSubmissionSuccessLivguardDialog
                userPreferences={userPreferences}
                isDialogOpen={isOfferContactUsDialogOpen && formStateInputs.formSuccessfullySubmitted}
                tryToCloseDialog={tryToCloseOfferContactUsDialog}
            />
        </>
    );
}

export function TermsAndConditionsDialog({showTnCDialog, setShowTnCDialog, userPreferences}: {showTnCDialog: boolean; setShowTnCDialog: React.Dispatch<boolean>; userPreferences: UserPreferences}) {
    const contentData = useContext(ContentProviderContext);
    function tryToCloseTnCDialog() {
        setShowTnCDialog(false);
    }
    return (
        <Transition
            show={showTnCDialog}
            as={React.Fragment}
        >
            <Dialog
                as="div"
                className="tw-relative tw-z-50"
                onClose={tryToCloseTnCDialog}
            >
                <Transition.Child
                    as={React.Fragment}
                    enter="tw-ease-out tw-transition-all tw-duration-300"
                    enterFrom="tw-opacity-0"
                    enterTo="tw-opacity-100"
                    leave="tw-ease-in tw-transition-all tw-duration-300"
                    leaveFrom="tw-opacity-100"
                    leaveTo="tw-opacity-0"
                >
                    <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-[70%] tw-backdrop-blur" />
                </Transition.Child>

                <Dialog.Panel className="tw-fixed tw-bottom-0 lg:tw-right-0 lg:tw-top-0 tw-grid tw-grid-rows-1 tw-grid-cols-1 tw-place-items-center tw-justify-start">
                    <Transition.Child
                        as="div"
                        className="tw-w-full tw-h-[85vh] lg:tw-h-[100vh] lg:tw-w-[40rem] tw-overflow-y-auto lg-bg-secondary-100 tw-flex tw-flex-col lg-secondary-700-scrollbar tw-relative"
                        enter="tw-ease-in tw-transition-all tw-duration-300"
                        enterFrom="tw-h-0 lg:tw-w-0"
                        enterTo="tw-h-[85vh] lg:tw-w-[40rem]"
                        leave="tw-ease-out tw-transition-all tw-duration-300"
                        leaveFrom="tw-h-[85vh] lg:tw-w-[40rem]"
                        leaveTo="tw-h-0 lg:tw-w-0"
                    >
                        <div className="tw-grid tw-grid-flow-row tw-gap-1 tw-p-6 tw-pt-0 tw-h-full">
                            <div className="tw-h-16 tw-flex tw-items-center lg-bg-secondary-100 tw-sticky tw-top-0 lg-text-title1 tw-border-b-2 tw-border-solid lg-border-secondary-700">
                                {contentData.getContent("OfferTnCText")}
                                <button
                                    type="button"
                                    onClick={tryToCloseTnCDialog}
                                    className="lg-bg-secondary-300 tw-rounded-full tw-absolute tw-top-2 tw-right-2"
                                >
                                    <X className="tw-w-8 tw-h-8" />
                                </button>
                            </div>
                            <VerticalSpacer className="tw-h-3" />
                            <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-items-start tw-gap-3">
                                <CircleFill className="tw-w-2 tw-h-2 tw-mt-2" />
                                <div className="lg-text-body lg-text-secondary-700">{contentData.getContent("OfferTnCContent1")}</div>
                            </div>
                            <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-items-start tw-gap-3">
                                <CircleFill className="tw-w-2 tw-h-2 tw-mt-2" />
                                <div className="lg-text-body lg-text-secondary-700">{contentData.getContent("OfferTnCContent2")}</div>
                            </div>
                            <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-items-start tw-gap-3">
                                <CircleFill className="tw-w-2 tw-h-2 tw-mt-2" />
                                <div className="lg-text-body lg-text-secondary-700">{contentData.getContent("OfferTnCContent3")}</div>
                            </div>
                            <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-items-start tw-gap-3">
                                <CircleFill className="tw-w-2 tw-h-2 tw-mt-2" />
                                <div className="lg-text-body lg-text-secondary-700">{contentData.getContent("OfferTnCContent4")}</div>
                            </div>
                            <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-items-start tw-gap-3">
                                <CircleFill className="tw-w-2 tw-h-2 tw-mt-2" />
                                <div className="lg-text-body lg-text-secondary-700">{contentData.getContent("OfferTnCContent5")}</div>
                            </div>
                            <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-items-start tw-gap-3">
                                <CircleFill className="tw-w-2 tw-h-2 tw-mt-2" />
                                <div className="lg-text-body lg-text-secondary-700">{contentData.getContent("OfferTnCContent6")}</div>
                            </div>
                            <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-items-start tw-gap-3">
                                <CircleFill className="tw-w-2 tw-h-2 tw-mt-2" />
                                <div className="lg-text-body lg-text-secondary-700">{contentData.getContent("OfferTnCContent7")}</div>
                            </div>
                            <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-items-start tw-gap-3">
                                <CircleFill className="tw-w-2 tw-h-2 tw-mt-2" />
                                <div className="lg-text-body lg-text-secondary-700">{contentData.getContent("OfferTnCContent8")}</div>
                            </div>
                            <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-items-start tw-gap-3">
                                <CircleFill className="tw-w-2 tw-h-2 tw-mt-2" />
                                <div className="lg-text-body lg-text-secondary-700">{contentData.getContent("OfferTnCContent9")}</div>
                            </div>
                            <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-items-start tw-gap-3">
                                <CircleFill className="tw-w-2 tw-h-2 tw-mt-2" />
                                <div className="lg-text-body lg-text-secondary-700">{contentData.getContent("OfferTnCContent10")}</div>
                            </div>
                            <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-items-start tw-gap-3">
                                <CircleFill className="tw-w-2 tw-h-2 tw-mt-2" />
                                <div className="lg-text-body lg-text-secondary-700">{contentData.getContent("OfferTnCContent11")}</div>
                            </div>
                            <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-items-start tw-gap-3">
                                <CircleFill className="tw-w-2 tw-h-2 tw-mt-2" />
                                <div className="lg-text-body lg-text-secondary-700">{contentData.getContent("OfferTnCContent12")}</div>
                            </div>
                            <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-items-start tw-gap-3">
                                <CircleFill className="tw-w-2 tw-h-2 tw-mt-2" />
                                <div className="lg-text-body lg-text-secondary-700">{contentData.getContent("OfferTnCContent13")}</div>
                            </div>
                            <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-items-start tw-gap-3">
                                <CircleFill className="tw-w-2 tw-h-2 tw-mt-2" />
                                <div className="lg-text-body lg-text-secondary-700">{contentData.getContent("OfferTnCContent14")}</div>
                            </div>
                            <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-items-start tw-gap-3">
                                <CircleFill className="tw-w-2 tw-h-2 tw-mt-2" />
                                <div className="lg-text-body lg-text-secondary-700">{contentData.getContent("OfferTnCContent15")}</div>
                            </div>
                            <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-items-start tw-gap-3">
                                <CircleFill className="tw-w-2 tw-h-2 tw-mt-2" />
                                <div className="lg-text-body lg-text-secondary-700">{contentData.getContent("OfferTnCContent16")}</div>
                            </div>
                            <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-items-start tw-gap-3">
                                <CircleFill className="tw-w-2 tw-h-2 tw-mt-2" />
                                <div className="lg-text-body lg-text-secondary-700">{contentData.getContent("OfferTnCContent17")}</div>
                            </div>
                            <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-items-start tw-gap-3">
                                <CircleFill className="tw-w-2 tw-h-2 tw-mt-2" />
                                <div className="lg-text-body lg-text-secondary-700">{contentData.getContent("OfferTnCContent18")}</div>
                            </div>
                            <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-items-start tw-gap-3">
                                <CircleFill className="tw-w-2 tw-h-2 tw-mt-2" />
                                <div className="lg-text-body lg-text-secondary-700">{contentData.getContent("OfferTnCContent19")}</div>
                            </div>
                            <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-items-start tw-gap-3">
                                <CircleFill className="tw-w-2 tw-h-2 tw-mt-2" />
                                <div className="lg-text-body lg-text-secondary-700">{contentData.getContent("OfferTnCContent20")}</div>
                            </div>
                            <VerticalSpacer className="tw-h-20" />
                        </div>
                    </Transition.Child>
                </Dialog.Panel>
            </Dialog>
        </Transition>
    );
}
