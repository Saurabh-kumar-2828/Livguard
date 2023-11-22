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
import {ImageCdnProvider, type Uuid} from "~/common--type-definitions/typeDefinitions";
import {concatenateNonNullStringsWithSpaces, generateUuid} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {indianPhoneNumberValidationPattern} from "~/global-common-typescript/utilities/validationPatterns";
import {CampaignPageScaffold} from "~/routes/campaigns/campaignPageScaffold.component";
import {FormSubmissionSuccessLivguardDialog} from "~/components/formSubmissionSuccessLivguardDialog";
import type {FormStateInputsAction} from "~/routes/lead-form.state";
import {FormStateInputsActionType, FormStateInputsReducer, createInitialFormState} from "~/routes/lead-form.state";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {UserPreferences} from "~/typeDefinitions";
import {FormType, Language} from "~/typeDefinitions";
import {appendSpaceToString, getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {getContentGenerator} from "~/vernacularProvider";
import {getVernacularFromBackend} from "~/backend/vernacularProvider.server";
import {ContentProviderContext} from "~/contexts/contentProviderContext";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";

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
                content: `${getAbsolutePathForRelativePath(getMetadataForImage("/livguard/common/og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null)}`,
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
                content: `${getAbsolutePathForRelativePath(getMetadataForImage("/livguard/common/og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null)}`,
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
            iconRelativePath: "icons/offers/step-1.svg",
            stepVernacId: "OfferStep1",
        },
        {
            iconRelativePath: "icons/offers/step-2.svg",
            stepVernacId: "OfferStep2",
        },
        {
            iconRelativePath: "icons/offers/step-3.svg",
            stepVernacId: "OfferStep3",
        },
        {
            iconRelativePath: "icons/offers/step-4.svg",
            stepVernacId: "OfferStep4",
        },
        {
            iconRelativePath: "icons/offers/step-5.svg",
            stepVernacId: "OfferStep5",
        },
        {
            iconRelativePath: "icons/offers/step-6.svg",
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
                                            src={`https://www.livguard.com/static-assets/${step.iconRelativePath}`}
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
