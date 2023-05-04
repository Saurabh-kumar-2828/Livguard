import {Dialog, Transition} from "@headlessui/react";
import {LinksFunction, LoaderFunction, MetaFunction} from "@remix-run/node";
import {useFetcher, useLoaderData} from "@remix-run/react";
import React from "react";
import {useEffect, useState} from "react";
import {CircleFill, X} from "react-bootstrap-icons";
import {useResizeDetector} from "react-resize-detector";
import {toast} from "react-toastify";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import LivguardDialog from "~/components/livguardDialog";
import {OfferPageBottomBar} from "~/components/offerPageBottomBar";
import {OtpVerificationDialog} from "~/components/otpVerificationDialog";
import {CoverImage} from "~/global-common-typescript/components/coverImage";
import {FixedHeightImage} from "~/global-common-typescript/components/fixedHeightImage";
import {FullWidthImage} from "~/global-common-typescript/components/fullWidthImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces, generateUuid} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {phoneNumberValidationPattern} from "~/global-common-typescript/utilities/validationPatterns";
import {CampaignPageScaffold} from "~/routes/campaigns/campaignPageScaffold.component";
import {FormSubmissionSuccessLivguardDialog} from "~/routes/dealer-for-inverters-and-batteries";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import {FormType, Language, UserPreferences} from "~/typeDefinitions";
import {appendSpaceToString, getRedirectToUrlFromRequest} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";

export const meta: MetaFunction = ({data}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = data.userPreferences;
    if (userPreferences.language == Language.English) {
        return {
            title: "Buy Livguard Inverter Battery Jodi and win cashback upto Rs. 1500",
            description: "Experience an uninterrupted summer with Livguard Inverter and Battery Jodis and enjoy up to ₹1500 cashback! The offer is for limited time grab it now",
        };
    } else if (userPreferences.language == Language.Hindi) {
        return {
            title: "लिवगार्ड इन्वर्टर बैटरी जोड़ी खरीदें और रुपये 1500 तक कैशबैक जीतें। ",
            description: "लिवगार्ड इन्वर्टर और बैटरी जोड़ी के साथ गर्मी के मौसम को परेशानी मुक्त बनाएँ और ₹1500 तक कैशबैक का आनंद लें! ऑफर सीमित समय के लिए है इसे अभी खरीदें",
        };
    } else {
        throw Error(`Undefined language ${userPreferences.language}`);
    }
};

export const links: LinksFunction = () => {
    return [{rel: "canonical", href: "https://www.livguard.com/offers/inverter-and-battery-jodi"}];
};

type LoaderData = {
    userPreferences: UserPreferences;
    redirectTo: string;
};

export const loader: LoaderFunction = async ({request}) => {
    const userPreferences = await getUserPreferencesFromCookiesAndUrlSearchParameters(request);
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
            <CampaignPageScaffold
                userPreferences={userPreferences}
                redirectTo={redirectTo}
                showMobileMenuIcon={false}
                utmParameters={utmSearchParameters}
                showContactCtaButton={true}
                showSearchOption={false}
            >
                <LandingPage
                    userPreferences={userPreferences}
                    utmParameters={utmSearchParameters}
                />
            </CampaignPageScaffold>

            <OfferPageBottomBar userPreferences={userPreferences} />

            {/* <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: `

                    `,
                }}
            /> */}
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


function HeroSection({
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
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();

    return (
        // screen = 48px + 56px + ? + 32px + 56px + 32px + 90px
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-h-[calc(100vh-19.625rem-var(--lg-mobile-ui-height))] lg:tw-h-[calc(100vh-9rem)] tw-overflow-hidden tw-grid tw-grid-rows-[1.5rem_3rem_minmax(0,1fr)_auto_1rem_auto_1rem_minmax(0,1fr)_auto_3rem] tw-justify-items-center tw-text-secondary-900-dark tw-relative",
                className,
            )}
            ref={ref}
        >
            {containerWidth == null || containerHeight == null ? null : (
                <CoverImage
                    relativePath={containerHeight > containerWidth ? "/livguard/offers/mobile.jpg" : "/livguard/offers/top-bannerdesktop.jpg"}
                    className="tw-row-start-1 tw-col-start-1 tw-row-span-full"
                    key={containerHeight > containerWidth ? "/livguard/offers/mobile.jpg" : "/livguard/offers/top-bannerdesktop.jpg"}
                />
            )}

            <div className="tw-absolute tw-left-5 tw-bottom-5">*T&C Apply</div>
        </div>
    );
}

export function StepsToAvailCashback({
    userPreferences,
    className,
}:{
    userPreferences: UserPreferences;
    className?: string;
}){
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
                        <div dangerouslySetInnerHTML={{__html: appendSpaceToString(getVernacularString("OfferJodiHT1", userPreferences.language))}} />
                    </h1>
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-3 lg:tw-h-6" />

                <DefaultTextAnimation>
                    <div
                        className="lg-text-body tw-max-w-[45rem] tw-text-center"
                        dangerouslySetInnerHTML={{__html: appendSpaceToString(getVernacularString("OfferJodiHT2", userPreferences.language))}}
                    />
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-3 lg:tw-h-6" />

                <DefaultTextAnimation>
                    <h1 className="lg-text-title1">{getVernacularString("OfferJodiHT3", userPreferences.language)}</h1>
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
                                <div className="-tw-z-10 tw-text-[12rem] tw-leading-[10rem] lg:tw-text-[14rem] lg:tw-leading-[11rem] tw-place-self-end lg:tw-place-self-start tw-font-bold tw-opacity-20 tw-pr-5 tw-place-items-end lg-text-secondary-300">{`${stepIndex + 1}`}</div>
                            </div>
                            <div className="tw-col-start-1 tw-items-center">
                                <div className="tw-w-12 tw-h-12 lg-bg-secondary-300 tw-rounded-full tw-justify-items-center tw-grid">
                                    <div className="tw-w-6 tw-h-6 tw-place-self-center">
                                        <img src={`https://files.growthjockey.com/${step.iconRelativePath}`} alt="step-icon" className="tw-w-full tw-h-full" />
                                    </div>
                                </div>
                            </div>
                            <div className="tw-col-start-2 tw-grid tw-grid-rows-[auto_minmax(0,1fr)] tw-items-start">
                                <div className="tw-row-start-1">{`${getVernacularString("OfferStep", userPreferences.language)} ${stepIndex + 1}`}</div>
                                <div className="tw-row-start-2">
                                    {<div dangerouslySetInnerHTML={{__html: appendSpaceToString(getVernacularString(step.stepVernacId, userPreferences.language))}} />}
                                </div>
                            </div>
                        </div>
                    )}
                />
            </div>
        </div>
    );
}

export function TermsAndConditions({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const [showTnCDialog, setShowTnCDialog] = useState(false);

    return (
        <div className={className}>
            <div className="tw-flex tw-flex-col tw-justify-start">
                <DefaultTextAnimation>
                    <div className="lg-text-title2">{getVernacularString("OfferTnCApplied", userPreferences.language)}</div>
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-3" />

                <DefaultTextAnimation>
                    <li className="lg-text-body">{getVernacularString("OfferTnCContent1", userPreferences.language)}</li>
                </DefaultTextAnimation>
                <DefaultTextAnimation>
                    <li className="lg-text-body">{getVernacularString("OfferTnCContent2", userPreferences.language)}</li>
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-3" />

                <DefaultTextAnimation>
                    <div className="lg-text-icon tw-underline-offset-2 tw-underline hover:tw-cursor-pointer" onClick={() => {setShowTnCDialog(true)}}>{getVernacularString("OfferTnCReadMore", userPreferences.language)}</div>
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

export function OfferContactUsCta({
    userPreferences,
    textVernacId,
    className,
}: {
    userPreferences: UserPreferences;
    textVernacId: string;
    className?: string;
}) {
    const [isOfferContactUsDialogOpen, setIsOfferContactUsDialogOpen] = useState(false);
    const utmParameters = useUtmSearchParameters();

    function tryToOpenOfferContactUsDialog() {
        setIsOfferContactUsDialogOpen(true);
    }

    return (
        <div className={className}>
            <button
                type="button"
                className="lg-cta-button !tw-px-6"
                onClick={tryToOpenOfferContactUsDialog}
            >
                {getVernacularString(textVernacId, userPreferences.language)}
            </button>

            <OfferContactUsDialog
                userPreferences={userPreferences}
                isOfferContactUsDialogOpen={isOfferContactUsDialogOpen}
                setIsOfferContactUsDialogOpen={setIsOfferContactUsDialogOpen}
                utmParameters={utmParameters}
            />
        </div>
    );
}

export function OfferContactUsDialog({
    userPreferences,
    isOfferContactUsDialogOpen,
    setIsOfferContactUsDialogOpen,
    utmParameters,
}: {
    userPreferences: UserPreferences;
    isOfferContactUsDialogOpen: boolean;
    setIsOfferContactUsDialogOpen: React.Dispatch<boolean>;
    utmParameters: {[searchParameter: string]: string};
}) {
    // TODO: Understand why we cannot use action for this
    const fetcher = useFetcher();
    const [inputData, setInputData] = useState<{name: string; phoneNumber: string; emailId: string}>({name: "", phoneNumber: "", emailId: ""});
    const [step, setStep] = useState(1);
    const leadId = generateUuid();

    useEffect(() => {
        if (fetcher.data == null) {
            return;
        }

        if (fetcher.data.error != null) {
            toast.error(fetcher.data.error);
            return;
        }

        if (fetcher.data.type == FormType.otpVerification) {
            setStep(2);
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({event: "submit"});
            return;
        }

        if (fetcher.data.type == FormType.contactUsSubmission) {
            setStep(3);
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({event: "otp_verified_lead"});
            return;
        }
    }, [fetcher.data]);

    function tryToCloseOfferContactUsDialog() {
        setIsOfferContactUsDialogOpen(false);
    }

    return (
        <>
            <LivguardDialog
                isDialogOpen={isOfferContactUsDialogOpen && step == 1}
                tryToCloseDialog={tryToCloseOfferContactUsDialog}
                title={getVernacularString("headerMenuS2T1", userPreferences.language)}
                showCloseIcon={false}
            >
                <fetcher.Form
                    className="tw-w-full tw-flex tw-flex-col"
                    method="post"
                    action="/otp-verification"
                >
                    <div className="lg-text-body-bold lg-text-secondary-900 tw-pl-3">{getVernacularString("contactUsT3", userPreferences.language)}</div>

                    <VerticalSpacer className="tw-h-2" />

                    <input
                        type="text"
                        name="name"
                        required
                        className="lg-text-input"
                        onChange={(e) => {
                            const newState = structuredClone(inputData);
                            newState.name = e.target.value;
                            setInputData(newState);
                        }}
                    />

                    <VerticalSpacer className="tw-h-4" />

                    <div className="lg-text-body-bold lg-text-secondary-900 tw-pl-3">{getVernacularString("contactUsT2", userPreferences.language)}</div>

                    <VerticalSpacer className="tw-h-2" />

                    <input
                        type="text"
                        name="phoneNumber"
                        pattern={phoneNumberValidationPattern}
                        required
                        className="lg-text-input"
                        onChange={(e) => {
                            const newState = structuredClone(inputData);
                            newState.phoneNumber = e.target.value;
                            setInputData(newState);
                        }}
                    />

                    <VerticalSpacer className="tw-h-8" />

                    <div className="tw-self-center">
                        <FixedHeightImage
                            relativePath="/livguard/header/akshay.png"
                            height="13.75rem"
                        />
                    </div>

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
                        value={leadId}
                    />

                    <input
                        name="formType"
                        className="tw-hidden"
                        readOnly
                        value={FormType.offerContactUsSubmission}
                    />

                    <button
                        type="submit"
                        className="lg-cta-button tw-px-4 tw-self-center tw-w-60"
                        disabled={fetcher.state != "idle" || inputData.name == "" || inputData.phoneNumber == ""}
                    >
                        {getVernacularString("OfferFormGetOTP", userPreferences.language)}
                    </button>
                </fetcher.Form>
            </LivguardDialog>

            <OtpVerificationDialog
                userPreferences={userPreferences}
                isDialogOpen={isOfferContactUsDialogOpen && step == 2}
                setIsDialogOpen={tryToCloseOfferContactUsDialog}
                inputData={inputData}
                fetcher={fetcher}
                utmParameters={utmParameters}
                leadId={leadId}
                formType={FormType.offerContactUsSubmission}
            />

            <FormSubmissionSuccessLivguardDialog
                userPreferences={userPreferences}
                isDialogOpen={isOfferContactUsDialogOpen && step == 3}
                tryToCloseDialog={tryToCloseOfferContactUsDialog}
            />
        </>
    );
}

export function TermsAndConditionsDialog({showTnCDialog, setShowTnCDialog, userPreferences}: {showTnCDialog: boolean; setShowTnCDialog: React.Dispatch<boolean>; userPreferences: UserPreferences}) {
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

                <Dialog.Panel className="tw-fixed tw-bottom-0 lg:tw-right-0 lg:tw-top-0 tw-grid tw-grid-rows-1 tw-grid-cols-1 tw-place-items-center tw-justify-start tw-overflow-auto">
                    <Transition.Child
                        as="div"
                        className="tw-w-full tw-h-[85vh] lg:tw-h-[100vh] lg:tw-w-[40rem] lg:tw-overflow-scroll tw-overflow-y-auto lg-bg-secondary-100 tw-rounded-lg tw-flex tw-flex-col lg-secondary-700-scrollbar tw-relative"
                        enter="tw-ease-in tw-transition-all tw-duration-300"
                        enterFrom="tw-h-0 lg:tw-w-0"
                        enterTo="tw-h-[85vh] lg:tw-w-[40rem]"
                        leave="tw-ease-out tw-transition-all tw-duration-300"
                        leaveFrom="tw-h-[85vh] lg:tw-w-[40rem]"
                        leaveTo="tw-h-0 lg:tw-w-0"
                    >
                        <div className="tw-grid tw-grid-flow-row tw-gap-1 tw-p-6 tw-pt-0 tw-h-full">
                            <div className="tw-h-16 tw-flex tw-items-center lg-bg-secondary-100 tw-sticky tw-top-0 lg-text-title1 tw-border-b-2 tw-border-solid lg-border-secondary-700">
                                {getVernacularString("OfferTnCText", userPreferences.language)}
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
                                <div className="lg-text-body lg-text-secondary-700">{getVernacularString("OfferTnCContent1", userPreferences.language)}</div>
                            </div>
                            <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-items-start tw-gap-3">
                                <CircleFill className="tw-w-2 tw-h-2 tw-mt-2" />
                                <div className="lg-text-body lg-text-secondary-700">{getVernacularString("OfferTnCContent2", userPreferences.language)}</div>
                            </div>
                            <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-items-start tw-gap-3">
                                <CircleFill className="tw-w-2 tw-h-2 tw-mt-2" />
                                <div className="lg-text-body lg-text-secondary-700">{getVernacularString("OfferTnCContent3", userPreferences.language)}</div>
                            </div>
                            <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-items-start tw-gap-3">
                                <CircleFill className="tw-w-2 tw-h-2 tw-mt-2" />
                                <div className="lg-text-body lg-text-secondary-700">{getVernacularString("OfferTnCContent4", userPreferences.language)}</div>
                            </div>
                            <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-items-start tw-gap-3">
                                <CircleFill className="tw-w-2 tw-h-2 tw-mt-2" />
                                <div className="lg-text-body lg-text-secondary-700">{getVernacularString("OfferTnCContent5", userPreferences.language)}</div>
                            </div>
                            <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-items-start tw-gap-3">
                                <CircleFill className="tw-w-2 tw-h-2 tw-mt-2" />
                                <div className="lg-text-body lg-text-secondary-700">{getVernacularString("OfferTnCContent6", userPreferences.language)}</div>
                            </div>
                            <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-items-start tw-gap-3">
                                <CircleFill className="tw-w-2 tw-h-2 tw-mt-2" />
                                <div className="lg-text-body lg-text-secondary-700">{getVernacularString("OfferTnCContent7", userPreferences.language)}</div>
                            </div>
                            <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-items-start tw-gap-3">
                                <CircleFill className="tw-w-2 tw-h-2 tw-mt-2" />
                                <div className="lg-text-body lg-text-secondary-700">{getVernacularString("OfferTnCContent8", userPreferences.language)}</div>
                            </div>
                            <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-items-start tw-gap-3">
                                <CircleFill className="tw-w-2 tw-h-2 tw-mt-2" />
                                <div className="lg-text-body lg-text-secondary-700">{getVernacularString("OfferTnCContent9", userPreferences.language)}</div>
                            </div>
                            <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-items-start tw-gap-3">
                                <CircleFill className="tw-w-2 tw-h-2 tw-mt-2" />
                                <div className="lg-text-body lg-text-secondary-700">{getVernacularString("OfferTnCContent10", userPreferences.language)}</div>
                            </div>
                            <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-items-start tw-gap-3">
                                <CircleFill className="tw-w-2 tw-h-2 tw-mt-2" />
                                <div className="lg-text-body lg-text-secondary-700">{getVernacularString("OfferTnCContent11", userPreferences.language)}</div>
                            </div>
                            <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-items-start tw-gap-3">
                                <CircleFill className="tw-w-2 tw-h-2 tw-mt-2" />
                                <div className="lg-text-body lg-text-secondary-700">{getVernacularString("OfferTnCContent12", userPreferences.language)}</div>
                            </div>
                            <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-items-start tw-gap-3">
                                <CircleFill className="tw-w-2 tw-h-2 tw-mt-2" />
                                <div className="lg-text-body lg-text-secondary-700">{getVernacularString("OfferTnCContent13", userPreferences.language)}</div>
                            </div>
                            <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-items-start tw-gap-3">
                                <CircleFill className="tw-w-2 tw-h-2 tw-mt-2" />
                                <div className="lg-text-body lg-text-secondary-700">{getVernacularString("OfferTnCContent14", userPreferences.language)}</div>
                            </div>
                            <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-items-start tw-gap-3">
                                <CircleFill className="tw-w-2 tw-h-2 tw-mt-2" />
                                <div className="lg-text-body lg-text-secondary-700">{getVernacularString("OfferTnCContent15", userPreferences.language)}</div>
                            </div>
                            <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-items-start tw-gap-3">
                                <CircleFill className="tw-w-2 tw-h-2 tw-mt-2" />
                                <div className="lg-text-body lg-text-secondary-700">{getVernacularString("OfferTnCContent16", userPreferences.language)}</div>
                            </div>
                            <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-items-start tw-gap-3">
                                <CircleFill className="tw-w-2 tw-h-2 tw-mt-2" />
                                <div className="lg-text-body lg-text-secondary-700">{getVernacularString("OfferTnCContent17", userPreferences.language)}</div>
                            </div>
                            <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-items-start tw-gap-3">
                                <CircleFill className="tw-w-2 tw-h-2 tw-mt-2" />
                                <div className="lg-text-body lg-text-secondary-700">{getVernacularString("OfferTnCContent18", userPreferences.language)}</div>
                            </div>
                            <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-items-start tw-gap-3">
                                <CircleFill className="tw-w-2 tw-h-2 tw-mt-2" />
                                <div className="lg-text-body lg-text-secondary-700">{getVernacularString("OfferTnCContent19", userPreferences.language)}</div>
                            </div>
                            <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-items-start tw-gap-3">
                                <CircleFill className="tw-w-2 tw-h-2 tw-mt-2" />
                                <div className="lg-text-body lg-text-secondary-700">{getVernacularString("OfferTnCContent20", userPreferences.language)}</div>
                            </div>
                            <VerticalSpacer className="tw-h-20" />
                        </div>
                    </Transition.Child>
                </Dialog.Panel>
            </Dialog>
        </Transition>
    );
}