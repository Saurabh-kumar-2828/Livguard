import {Dialog, Transition} from "@headlessui/react";
import type {ActionFunction, LinksFunction, LoaderFunction, MetaFunction, V2_MetaFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import {Form, Link, useActionData, useFetcher} from "@remix-run/react";
import React, {useContext, useEffect, useRef, useState} from "react";
import {StarFill, X} from "react-bootstrap-icons";
import {useResizeDetector} from "react-resize-detector";
import {useLoaderData} from "react-router";
import {toast} from "react-toastify";
import {getDealersForPinCode, insertContactFormLeads} from "~/backend/dealer.server";
import {sendEmail} from "~/backend/email.server";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {SocialMediaIcons} from "~/components/footers/common";
import {CoverImage} from "~/components/images/coverImage";
import {FixedWidthImage} from "~/components/images/fixedWidthImage";
import {PageScaffold} from "~/components/pageScaffold";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {getStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {concatenateNonNullStringsWithSpaces, generateUuid} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {emailIdValidationPattern, indianPhoneNumberValidationPattern, pinCodeValidationPattern} from "~/global-common-typescript/utilities/validationPatterns";
import {FormSelectComponent} from "~/livguard-common-typescript/scratchpad";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {Dealer, UserPreferences} from "~/typeDefinitions";
import {Language, Theme} from "~/typeDefinitions";
import {appendSpaceToString, getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest, secondaryNavThreshold} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";
import type {DealerActionData} from "~/routes/contact-us/get-dealers-for-pin-code";
import {HiddenFormField} from "~/global-common-typescript/components/hiddenFormField";
import {FancySearchableSelect, Loader} from "~/components/scratchpad";
import {verifyOtp} from "~/backend/authentication.server";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ImageCdnProvider} from "~/common--type-definitions/typeDefinitions";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {SecondaryNavigationController, useSecondaryNavigationController} from "~/hooks/useSecondaryNavigationController";
import {SecondaryNavigationControllerContext} from "~/contexts/secondaryNavigationControllerContext";
import {SecondaryNavigation} from "~/components/secondaryNavigation";
import {useInView} from "react-intersection-observer";
import useMediaQuery from "~/global-common-typescript/hooks/useMediaQuery";

export const meta: V2_MetaFunction = ({data: loaderData}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = loaderData.userPreferences;
    if (userPreferences.language == Language.English) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/contact-us",
            },
            {
                title: "Get in Touch with Livguard: Contact Us Today",
            },
            {
                name: "description",
                content: "Get in touch with Livguard's customer care. Call our toll-free number for support and solutions. Contact us today!",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/contact-us",
            },
            {
                property: "og:title",
                content: "Get in Touch with Livguard: Contact Us Today",
            },
            {
                property: "og:description",
                content: "Get in touch with Livguard's customer care. Call our toll-free number for support and solutions. Contact us today!",
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
                content: `${getAbsolutePathForRelativePath(getMetadataForImage("/livguard/contact-us/contact-us-og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null)}`,
            },
            {
                "script:ld+json": {
                    "@type": "SiteNavigationElement",
                    name: "Contact Us",
                    url: "https://www.livguard.com/contact-us",
                    telephone: "+919205667999",
                    contactType: "",
                    streetAddress: "SAR Group Plot No. 221, Udyog Vihar Phase 1, Sector 20",
                    addressLocality: "Gurugram",
                    addressRegion: "Haryana",
                    postalCode: "122016",
                    addressCountry: "India",
                    "E-mail": "marketing@livguard.com, export@sar-group.com",
                },
            },
        ];
    } else if (userPreferences.language == Language.Hindi) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/contact-us",
            },
            {
                title: "लिवगार्ड से संपर्क करें: आज ही हमसे संपर्क करें",
            },
            {
                name: "description",
                content: "ग्राहक सहायता  नंबर पर संपर्क करें और लिवगार्ड से जुड़ें। समर्थन और समाधान के लिए हमारे टोल-फ्री नंबर पर कॉल करें।",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/contact-us",
            },
            {
                property: "og:title",
                content: "लिवगार्ड से संपर्क करें: आज ही हमसे संपर्क करें",
            },
            {
                property: "og:description",
                content: "ग्राहक सहायता  नंबर पर संपर्क करें और लिवगार्ड से जुड़ें। समर्थन और समाधान के लिए हमारे टोल-फ्री नंबर पर कॉल करें।",
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
                content: `${getAbsolutePathForRelativePath(getMetadataForImage("/livguard/contact-us/contact-us-og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null)}`,
            },
        ];
    } else {
        throw Error(`Undefined language ${userPreferences.language}`);
    }
};

export type ActionData = {
    error: string | null;
    formType: string | null;
    isInvalidOtp?: boolean;
};

export const action: ActionFunction = async ({request, params}) => {
    const body = await request.formData();

    const name = safeParse(getStringFromUnknown, body.get("name"));
    const emailId = safeParse(getStringFromUnknown, body.get("emailId"));
    const utmParameters = safeParse(getStringFromUnknown, body.get("utmParameters"));
    const formType = safeParse(getStringFromUnknown, body.get("formType"));
    const termsAndConditionsChecked = safeParse(getStringFromUnknown, body.get("termsAndConditionsChecked"));
    const details = safeParse(getStringFromUnknown, body.get("queryDetails"));
    const phoneNumber = safeParse(getStringFromUnknown, body.get("phoneNumber"));
    const otpSubmitted = safeParse(getStringFromUnknown, body.get("otpSubmitted"));
    let product: string | null = "";
    let rating: string | null = "";
    let complaintType: string | null = "";
    let selectedDealerCode: string | null = "";

    const otpVerificationResult = await verifyOtp(phoneNumber, otpSubmitted);

    if (formType == "enquiryForm") {
        if (!otpVerificationResult.success) {
            const actionData: ActionData = {
                error: "Please enter valid otp! Error code: c07a58df-5019-4f01-8edf-6f75d62b644c",
                formType: "enquiryForm",
                isInvalidOtp: true,
            };
            return json(actionData);
        }
        complaintType = safeParse(getStringFromUnknown, body.get("complaintOption"));
        selectedDealerCode = safeParse(getStringFromUnknown, body.get("selectedDealerCode"));
    }

    if (formType == "feedbackForm") {
        if (!otpVerificationResult.success) {
            const actionData: ActionData = {
                error: "Please enter valid otp! Error code: c905c37c-bb49-4ede-8886-15ed59d433ef",
                formType: "feedbackForm",
                isInvalidOtp: true,
            };
            return json(actionData);
        }
        product = safeParse(getStringFromUnknown, body.get("product"));
        rating = safeParse(getStringFromUnknown, body.get("rating"));
    }

    if (
        utmParameters == null ||
        name == null ||
        emailId == null ||
        phoneNumber == null ||
        formType == null ||
        rating == null ||
        product == null ||
        termsAndConditionsChecked == null ||
        details == null ||
        complaintType == null
    ) {
        const actionData: ActionData = {
            error: "Inputs can't be null! Error code: 2dc8402e-24b3-4a7e-9024-64cc9ba14ad4",
            formType: null,
        };
        return json(actionData);
    }

    const utmParametersDecoded = JSON.parse(utmParameters);
    const pageUrl = getUrlFromRequest(request);

    const freshSalesData = {
        mobile_number: phoneNumber,
        first_name: name,
        email: emailId,
        otpVerified: true,
    };

    if (formType == "feedbackForm") {
        const insertResult = await insertContactFormLeads(
            generateUuid(),
            {
                name: name,
                emailId: emailId,
                product: product,
                rating: rating,
                details: details,
                formType: formType,
                utmParameters: utmParametersDecoded,
                termsAndConditionsChecked: termsAndConditionsChecked,
            },
            utmParametersDecoded,
            pageUrl,
            freshSalesData,
        );
        if (insertResult instanceof Error) {
            const actionData: ActionData = {
                error: "Error in submitting form! Error code: 48584397-7140-40fa-93e2-4804fc63ca40",
                formType: formType,
            };
            return json(actionData);
        }

        const emailResult = await sendEmail(
            JSON.stringify({
                name: name,
                emailId: emailId,
                phoneNumber: phoneNumber,
                complaintType: complaintType,
                details: details,
                formType: formType,
                utmParameters: utmParameters,
                termsAndConditionsChecked: termsAndConditionsChecked,
            }),
            ["livserv@sar-group.com", "shobheet.gupta@livguard.com"],
            "Contact Us Page Lead Submitted",
        );

        if (emailResult instanceof Error) {
            const actionData: ActionData = {
                error: "Error in sending email! Error code: d7218e0d-fbac-4f77-a1cf-c596a1297f56",
                formType: formType,
            };
            return actionData;
        }
    } else {
        const insertResult = await insertContactFormLeads(
            generateUuid(),
            {
                name: name,
                emailId: emailId,
                phoneNumber: phoneNumber,
                selectedDealerCode: selectedDealerCode,
                complaintType: complaintType,
                details: details,
                formType: formType,
                utmParameters: utmParametersDecoded,
                termsAndConditionsChecked: termsAndConditionsChecked,
            },
            utmParametersDecoded,
            pageUrl,
            freshSalesData,
        );
        if (insertResult instanceof Error) {
            const actionData: ActionData = {
                error: "Error in submitting form! Error code: a6f5b2c8-c0a9-41e2-a093-268158313671",
                formType: formType,
            };
            return json(actionData);
        }

        const emailResult = await sendEmail(
            JSON.stringify({
                name: name,
                emailId: emailId,
                phoneNumber: phoneNumber,
                selectedDealerCode: selectedDealerCode,
                complaintType: complaintType,
                details: details,
                formType: formType,
                utmParameters: utmParameters,
                termsAndConditionsChecked: termsAndConditionsChecked,
            }),
            ["shobheet.gupta@livguard.com"],
            "Contact Us Page Lead Submitted",
        );

        if (emailResult instanceof Error) {
            const actionData: ActionData = {
                error: "Error in sending email! Error code: eca6f639-b169-43db-a953-8a7267b2acd9",
                formType: formType,
            };
            return actionData;
        }
    }

    const actionData: ActionData = {
        error: null,
        formType: formType,
    };

    return json(actionData);
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

    const actionData = useActionData() as ActionData;

    const utmSearchParameters = useUtmSearchParameters();

    const secondaryNavigationController = useSecondaryNavigationController();

    return (
        <>
            <PageScaffold
                userPreferences={userPreferences}
                redirectTo={redirectTo}
                showMobileMenuIcon={true}
                utmParameters={utmSearchParameters}
                pageUrl={pageUrl}
                breadcrumbs={[
                    {contentId: "cfab263f-0175-43fb-91e5-fccc64209d36", link: "/"},
                    {contentId: "15a15952-4fe9-4c9e-b07f-fb1467a3614d", link: "#"},
                ]}
                secondaryNavigationController={secondaryNavigationController}
            >
                <SecondaryNavigationControllerContext.Provider value={secondaryNavigationController}>
                    <ContactPage
                        userPreferences={userPreferences}
                        utmParameters={utmSearchParameters}
                        actionData={actionData}
                        pageUrl={pageUrl}
                        secondaryNavigationController={secondaryNavigationController}
                    />
                </SecondaryNavigationControllerContext.Provider>
            </PageScaffold>
        </>
    );
}

function ContactPage({
    userPreferences,
    utmParameters,
    actionData,
    pageUrl,
    secondaryNavigationController,
}: {
    userPreferences: UserPreferences;
    utmParameters: {[searchParameter: string]: string};
    actionData: ActionData;
    pageUrl: string;
    secondaryNavigationController?: SecondaryNavigationController;
}) {
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);
    return (
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-x-16 tw-items-start tw-justify-center">
            <HeroSection
                userPreferences={userPreferences}
                utmParameters={utmParameters}
                pageUrl={pageUrl}
                className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
            />
            <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-2 tw-col-start-1 lg:tw-col-span-full" />

            <div className="tw-row-start-4 tw-col-start-1 lg:tw-col-span-full tw-grid tw-grid-cols-[minmax(0,1fr)_minmax(0,1fr)] tw-gap-x-16 lg-px-screen-edge-2 tw-max-w-7xl tw-mx-auto tw-w-full">
                {isScreenSizeBelow ? (
                    <>
                        <ClickConnectPowerUpSection
                            userPreferences={userPreferences}
                            className="tw-row-start-1 tw-col-span-full lg:tw-col-span-1 lg:tw-row-start-1 lg:tw-col-start-2 lg:tw-max-w-2xl lg:tw-justify-self-start"
                        />

                        <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-2 tw-col-start-1 lg:tw-col-span-full lg:tw-hidden" />

                        <WeAreListening
                            userPreferences={userPreferences}
                            className="tw-row-start-3 tw-col-span-full lg:tw-col-span-1 lg:tw-row-start-1 lg:tw-col-start-1 lg:tw-max-w-2xl lg:tw-justify-self-end"
                            actionData={actionData}
                        />
                    </>
                ) : (
                    <>
                        <WeAreListening
                            userPreferences={userPreferences}
                            className="tw-row-start-3 tw-col-span-full lg:tw-col-span-1 lg:tw-row-start-1 lg:tw-col-start-1 lg:tw-max-w-2xl lg:tw-justify-self-end"
                            actionData={actionData}
                        />

                        <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-2 tw-col-start-1 lg:tw-col-span-full lg:tw-hidden" />
                        <ClickConnectPowerUpSection
                            userPreferences={userPreferences}
                            className="tw-row-start-1 tw-col-span-full lg:tw-col-span-1 lg:tw-row-start-1 lg:tw-col-start-2 lg:tw-max-w-2xl lg:tw-justify-self-start"
                        />
                    </>
                )}
            </div>

            <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-5 lg:tw-row-start-4 tw-col-start-1 lg:tw-col-span-full" />

            <OurPresence
                userPreferences={userPreferences}
                className="tw-row-start-6 lg:tw-row-start-5 tw-col-start-1 lg:tw-col-span-full"
                headingTextContentId="contactUsS4H"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[7] lg:tw-row-start-6 tw-col-start-1 lg:tw-col-span-full" />

            {/* <ExploreCareers
                userPreferences={userPreferences}
                className="tw-row-start-[9] lg:tw-row-start-7 tw-col-start-1 lg:tw-col-span-full"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[10] lg:tw-row-start-[8] tw-col-start-1 lg:tw-col-span-full" /> */}
        </div>
    );
}

function HeroSection({
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
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-aspect-square lg:tw-aspect-[1280/380] tw-grid tw-grid-rows-[3.5rem_auto_1rem_auto_minmax(0,1fr)] lg:tw-grid-rows-[minmax(0,1fr)_auto_1rem_auto_minmax(0,1fr)] tw-text-center lg:tw-text-left",
                className
            )}
        >
            <div className="tw-row-start-1 tw-col-start-1 tw-row-span-full">
                {isScreenSizeBelow == null ? null : (
                    <FullWidthImage
                        relativePath={isScreenSizeBelow ? "/livguard/contact-us/1/mobile-banner.jpg" : "/livguard/contact-us/1/desktop-banner.jpg"}
                        key={isScreenSizeBelow ? "/livguard/contact-us/1/mobile-banner.jpg" : "/livguard/contact-us/1/desktop-banner.jpg"}
                    />
                )}
            </div>
            <DefaultTextAnimation className="tw-row-start-2 tw-col-start-1">
                <div className="lg-text-banner lg-px-screen-edge-2 tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">
                    {getVernacularString("contactFormS1T1", userPreferences.language)}
                </div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-4 tw-col-start-1">
                <div className="lg-text-title1 lg-px-screen-edge-2 tw-text-secondary-900-dark">{getVernacularString("contactFormS1T2", userPreferences.language)}</div>
            </DefaultTextAnimation>
            <DefaultTextAnimation className="tw-row-start-5 tw-col-start-1">
                <div className="lg-text-title1 lg-px-screen-edge-2 tw-text-secondary-900-dark">{getVernacularString("contactFormS1T3", userPreferences.language)}</div>
            </DefaultTextAnimation>
        </div>
    );
}

function WeAreListening({userPreferences, className, actionData}: {userPreferences: UserPreferences; className?: string; actionData: ActionData}) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const utmSearchParameters = useUtmSearchParameters();

    const [isFeedbackFormSubmitted, setIsFeedbackFormSubmitted] = useState(false);
    const [isFeedbackFormTermsAndConditionsChecked, setIsFeedbackFormTermsAndConditionsChecked] = useState(true);
    const [feedbackFormSelectedProduct, setFeedbackFormSelectedProduct] = useState<null | number>(null);

    const [isComplaintFormSubmitted, setIsComplaintFormSubmitted] = useState(false);
    const [isComplaintFormTermsAndConditionsChecked, setIsComplaintFormTermsAndConditionsChecked] = useState(true);
    const [complaintFormOption, setComplaintFormOption] = useState(0);

    const [rating, setRating] = useState(0);

    const productItems = getFormSelectProductItems(userPreferences.language);

    useEffect(() => {
        if (actionData != null) {
            if (actionData.error != null) {
                toast.error(actionData.error);
                if (actionData.isInvalidOtp != null && actionData.isInvalidOtp == true) {
                    setInvalidOtp(true);
                }
                setIsFeedbackFormButtonDisabled(false);
                setIsComplaintFormButtonDisabled(false);
                return;
            }
            setInvalidOtp(false);

            if (actionData.formType != null) {
                if (actionData.formType == "feedbackForm") {
                    setIsFeedbackFormSubmitted(true);
                } else if (actionData.formType == "enquiryForm") {
                    setIsComplaintFormSubmitted(true);
                }
            }
        }
    }, [actionData]);

    const [isFeedbackFormButtonDisabled, setIsFeedbackFormButtonDisabled] = useState(false);
    const [isComplaintFormButtonDisabled, setIsComplaintFormButtonDisabled] = useState(false);

    const [pinCode, setPinCode] = useState("");
    const [dealers, setDealers] = useState<Array<Dealer> | null>(null);
    const dealerFetcher = useFetcher();
    const [selectedDealerIndex, setSelectedDealerIndex] = useState<number | null>(null);
    const [selectedDealerCode, setSelectedDealerCode] = useState("");

    useEffect(() => {
        if (dealerFetcher.data != null) {
            if (dealerFetcher.data.error != null) {
                toast.error(dealerFetcher.data.error);
                return;
            }
            if (dealerFetcher.data.dealers.length === 0) {
                toast.error("No dealers found for this pincode");
            }

            setDealers(dealerFetcher.data.dealers);
        }
    }, [dealerFetcher.data]);

    const [showOtpField, setShowOtpField] = useState(false);
    const [showOtpButton, setShowOtpButton] = useState(false);
    const [resendTimeOut, setResendTimeOut] = useState(0);
    const [invalidOtp, setInvalidOtp] = useState(false);
    const [isOtpResent, setIsOtpResent] = useState(false);
    const phoneNumberRef = useRef<HTMLInputElement | null>(null);
    const otpFieldRef = useRef<HTMLInputElement | null>(null);
    const [complaintFormPhoneNumber, setComplaintFormPhoneNumber] = useState("");
    const [complaintFormName, setComplaintFormName] = useState("");

    const [feedbackFormPhoneNumber, setFeedbackFormPhoneNumber] = useState("");
    const [feedbackFormName, setFeedbackFormName] = useState("");

    const [otpSubmitted, setIsOtpSubmitted] = useState(false);
    const otpFetcher = useFetcher();
    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (otpFetcher.data == null) {
            return;
        } else if (otpFetcher.data.error != null) {
            toast.error(otpFetcher.data.error);
            return;
        }
        if (isOtpResent) {
            toast.success("OTP resent successfully");
        } else {
            toast.success("OTP sent successfully");
        }
    }, [otpFetcher.data]);

    useEffect(() => {
        if (resendTimeOut > 0 && showOtpField) {
            if (timeoutId != null) {
                clearTimeout(timeoutId);
            }
            let timeout = setTimeout(() => {
                // const action: FormStateInputsAction = {
                //     actionType: FormStateInputsActionType.SetResendTimeOut,
                //     payload: formStateInputs.resendTimeOut - 1,
                // };
                // dispatch(action);
                setResendTimeOut((prev) => prev - 1);
            }, 1000);
            setTimeoutId(timeout);
        }
    }, [resendTimeOut]);

    const resetOtpState = () => {
        setShowOtpButton(false);
        setShowOtpField(false);
        setInvalidOtp(false);
        setIsOtpResent(false);
        setResendTimeOut(0);
        setFeedbackFormName("");
        setFeedbackFormPhoneNumber("");
        setComplaintFormName("");
        setComplaintFormPhoneNumber("");
    };
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold * 1.5});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "we-are-listening": {
                humanReadableName: getVernacularString("96713da3-cefd-4b58-9fb7-eca758ca2214", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-rows-[auto_1rem_auto_1.5rem_minmax(0,1fr)] tw-w-full", className)}
            id="we-are-listening"
            ref={sectionRef}
        >
            <DefaultTextAnimation className="tw-row-start-1 lg-text-headline tw-text-center lg:tw-text-left">
                <div dangerouslySetInnerHTML={{__html: appendSpaceToString(getVernacularString("contactUsS3H", userPreferences.language))}} />
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-4 tw-row-start-2" />

            <div className="tw-row-start-3 tw-grid tw-grid-cols-[minmax(0,max-content)_1rem_minmax(0,max-content)] lg:tw-pl-0 tw-place-self-center lg:tw-place-self-start">
                <div
                    className={concatenateNonNullStringsWithSpaces(
                        "tw-max-w-fit tw-p-4 tw-rounded-md tw-grid tw-items-center tw-justify-center tw-col-start-1 hover:tw-cursor-pointer",
                        `${selectedIndex == 0 ? "tw-bg-primary-500-light" : "lg-card"}`,
                    )}
                    onClick={() => {
                        setSelectedIndex(0);
                        resetOtpState();
                    }}
                >
                    <div className={`lg-text-body tw-font-bold tw-px-6 ${selectedIndex === 0 ? "!tw-text-secondary-900-dark" : "lg-text-secondary-900"}`}>
                        {getVernacularString("contactUsS3Feedback", userPreferences.language)}
                    </div>
                </div>

                <div
                    className={concatenateNonNullStringsWithSpaces(
                        "tw-max-w-fit tw-p-4 tw-rounded-md tw-grid tw-items-center tw-justify-center tw-col-start-3 hover:tw-cursor-pointer",
                        `${selectedIndex == 1 ? "tw-bg-primary-500-light" : "lg-card"}`,
                    )}
                    onClick={() => {
                        setSelectedIndex(1);
                        resetOtpState();
                    }}
                >
                    <div className={`lg-text-body tw-font-bold tw-px-6 ${selectedIndex === 1 ? "!tw-text-secondary-900-dark" : "lg-text-secondary-900"}`}>
                        {getVernacularString("contactUsS3Complaint", userPreferences.language)}
                    </div>
                </div>
            </div>

            <VerticalSpacer className="tw-h-12 tw-row-start-4" />

            <div className="tw-row-start-5 tw-col-span-full lg:tw-px-0">
                <div className="tw-grid tw-grid-flow-row tw-h-full tw-justify-center lg:tw-justify-normal">
                    {selectedIndex == 0 ? (
                        !isFeedbackFormSubmitted ? (
                            <Form
                                method="post"
                                className="tw-grid tw-grid-flow-row tw-gap-x-4 lg:tw-px-2 tw-place-self-start"
                                onSubmit={() => {
                                    setIsFeedbackFormButtonDisabled(true);
                                }}
                            >
                                <div className="tw-grid tw-grid-flow-row tw-justify-start tw-gap-2">
                                    <div className="tw-row-start-1">
                                        <div className="lg-text-body lg-text-secondary-900 tw-text-left">{getVernacularString("contactUsS3FeedbackFormT1", userPreferences.language)}</div>
                                    </div>
                                    <div className="tw-grid tw-row-start-2 tw-max-w-fit tw-grid-flow-col tw-gap-2 tw-mb-1">
                                        <ItemBuilder
                                            items={[1, 2, 3, 4, 5]}
                                            itemBuilder={(item, itemIndex) => (
                                                <StarFill
                                                    className={concatenateNonNullStringsWithSpaces(
                                                        "tw-w-9 tw-h-9",
                                                        `${itemIndex < rating ? "tw-text-primary-500-light" : "tw-text-secondary-700-dark"}`,
                                                    )}
                                                    onClick={() => {
                                                        setRating(item);
                                                    }}
                                                    key={itemIndex}
                                                />
                                            )}
                                        />
                                    </div>
                                </div>

                                <VerticalSpacer className="tw-h-4 lg:tw-col-span-full" />

                                <div className="tw-grid tw-grid-flow-row tw-gap-2">
                                    <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">{getVernacularString("contactUsS3FormEmailText", userPreferences.language)}</div>

                                    <input
                                        type="text"
                                        name="emailId"
                                        className="lg-text-input"
                                        pattern={emailIdValidationPattern}
                                        placeholder={getVernacularString("contactUsS3FormEmailPlaceholder", userPreferences.language)}
                                        required
                                    />
                                </div>

                                <VerticalSpacer className="tw-h-4 lg:tw-col-span-full" />

                                <div className="tw-grid tw-grid-flow-row tw-gap-2">
                                    <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">{getVernacularString("contactUsS3FormNameText", userPreferences.language)}</div>

                                    <input
                                        type="text"
                                        name="name"
                                        onChange={(e) => {
                                            setFeedbackFormName(e.target.value);
                                        }}
                                        value={feedbackFormName}
                                        className="lg-text-input"
                                        placeholder={getVernacularString("contactUsS3FormNamePlaceholder", userPreferences.language)}
                                        required
                                    />
                                </div>

                                <VerticalSpacer className="tw-h-4 lg:tw-col-span-full" />

                                <div className="tw-grid lg:tw-col-start-1 tw-grid-flow-row tw-gap-2">
                                    {!showOtpField ? (
                                        <div className="lg-text-secondary-900">{getVernacularString("contactUsS3FormNumberText", userPreferences.language)}</div>
                                    ) : (
                                        <div className="tw-grid tw-w-full tw-items-center tw-grid-cols-[auto_0.5rem_minmax(0,1fr)] tw-pl-3">
                                            <div
                                                className="tw-col-start-1 tw-text-primary-500-light hover:tw-cursor-pointer lg-text-body-bold"
                                                onClick={(e) => {
                                                    setShowOtpField(false);
                                                    setResendTimeOut(0);
                                                    if (phoneNumberRef.current != null) {
                                                        phoneNumberRef.current.focus();
                                                    }
                                                }}
                                            >
                                                {getVernacularString("phoneNumberChnage", userPreferences.language)}
                                            </div>
                                            <div className="tw-col-start-3 lg-text-secondary-900 lg-text-body-bold">{feedbackFormPhoneNumber}</div>
                                        </div>
                                    )}

                                    {!showOtpField ? (
                                        <div className="tw-relative tw-w-full tw-items-center tw-grid">
                                            <input
                                                type="text"
                                                name="phoneNumber"
                                                pattern={indianPhoneNumberValidationPattern}
                                                placeholder={getVernacularString("contactUsS3FormNumberPlaceholder", userPreferences.language)}
                                                required
                                                className="lg-text-input tw-w-full"
                                                disabled={showOtpField}
                                                defaultValue={feedbackFormPhoneNumber}
                                                ref={phoneNumberRef}
                                                onChange={(e) => {
                                                    setFeedbackFormPhoneNumber(e.target.value);
                                                    if (e.target.value.length == 10) {
                                                        setShowOtpButton(true);
                                                    } else {
                                                        setShowOtpButton(false);
                                                    }
                                                }}
                                                onBlur={(e) => {
                                                    if (feedbackFormPhoneNumber.length == 10) {
                                                        setShowOtpButton(true);
                                                    }
                                                }}
                                                onFocus={(e) => {
                                                    if (feedbackFormPhoneNumber.length == 10) {
                                                        setShowOtpButton(true);
                                                    }
                                                }}
                                            />
                                            <div
                                                className={concatenateNonNullStringsWithSpaces(
                                                    "tw-absolute tw-right-2 tw-bg-gradient-to-r tw-from-[#F25F60] tw-to-[#EB2A2B] tw-rounded-full tw-px-2 tw-py-1 tw-items-center tw-text-secondary-100-light hover:tw-cursor-pointer",
                                                    showOtpButton ? "tw-opacity-100 tw-duration-100 tw-z-10" : "tw-opacity-0 -tw-z-10 tw-duration-100",
                                                )}
                                                onClick={(e) => {
                                                    if (feedbackFormName.length === 0) {
                                                        toast.error("Name cannot be null! Error code: 23cebcc3-500d-4533-83c9-e5110429fc47");
                                                        return;
                                                    }
                                                    setShowOtpButton(false);
                                                    setShowOtpField(true);
                                                    setResendTimeOut(60);

                                                    if (otpFieldRef.current != null) {
                                                        otpFieldRef.current.focus();
                                                    }
                                                    const data = new FormData();
                                                    data.append("phoneNumber", feedbackFormPhoneNumber);
                                                    data.append("name", feedbackFormName);
                                                    otpFetcher.submit(data, {method: "post", action: "/resend-otp"});
                                                }}
                                            >
                                                {getVernacularString("OfferFormGetOTP", userPreferences.language)}
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            className={concatenateNonNullStringsWithSpaces(
                                                "tw-w-full",
                                                showOtpField ? "tw-flex tw-flex-col tw-opacity-100 tw-duration-100 tw-z-10" : "tw-hidden tw-opacity-0 -tw-z-100",
                                            )}
                                        >
                                            <div className="tw-relative">
                                                <input
                                                    type="text"
                                                    name="otpSubmitted"
                                                    className="lg-text-input"
                                                    required
                                                    placeholder={getVernacularString("contactUsOTPT3E", userPreferences.language)}
                                                    ref={otpFieldRef}
                                                    onChange={(e) => {
                                                        setIsOtpSubmitted(true);
                                                    }}
                                                />
                                                {invalidOtp && (
                                                    <div className="lg-text-primary-500 tw-absolute lg-text-icon tw-right-2 tw-top-0 tw-bottom-0 tw-pt-[18px]">
                                                        {getVernacularString("OfferInvalidOTP", userPreferences.language)}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div
                                    className={concatenateNonNullStringsWithSpaces(
                                        "tw-w-full tw-px-3 lg:tw-col-start-1",
                                        showOtpField ? "tw-flex tw-flex-row tw-justify-between tw-opacity-100 tw-duration-100 tw-z-10" : "tw-hidden tw-opacity-0 -tw-z-100",
                                    )}
                                >
                                    <div
                                        className={concatenateNonNullStringsWithSpaces("lg-text-secondary-700 tw-text-[12px]", `${resendTimeOut > 0 ? "undefined" : "hover:tw-cursor-pointer"}`)}
                                        onClick={() => {
                                            setIsOtpResent(true);
                                            setResendTimeOut(60);

                                            const data = new FormData();
                                            data.append("phoneNumber", feedbackFormPhoneNumber);
                                            data.append("name", feedbackFormName);
                                            otpFetcher.submit(data, {method: "post", action: "/resend-otp"});
                                        }}
                                    >
                                        {getVernacularString("OfferResendOTP", userPreferences.language)}
                                    </div>
                                    <div className="lg-text-secondary-700 tw-text-[12px]">{`00:${resendTimeOut}`}</div>
                                </div>

                                <VerticalSpacer className="tw-h-4 lg:tw-col-span-full" />

                                <div className="tw-grid tw-grid-flow-row tw-gap-2">
                                    <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">{getVernacularString("contactUsS3FormProductText", userPreferences.language)}</div>

                                    <div className="tw-row-start-2">
                                        <FormSelectComponent
                                            items={[null, ...productItems]}
                                            itemBuilder={(item) =>
                                                item == null ? `${getVernacularString("48aa62c2-244f-45ac-9750-56016d86d5b9", userPreferences.language)}` : `<div class="tw-py-1">${item}</div>`
                                            }
                                            value={feedbackFormSelectedProduct == null ? null : productItems[feedbackFormSelectedProduct]}
                                            setValue={(item) => (item != null ? setFeedbackFormSelectedProduct(productItems.indexOf(item)) : setFeedbackFormSelectedProduct(null))}
                                            buttonClassName="!tw-rounded-full"
                                        />
                                    </div>
                                </div>

                                <VerticalSpacer className="tw-h-4 lg:tw-col-span-full" />

                                <div className="tw-grid tw-grid-flow-row tw-gap-2">
                                    <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">{getVernacularString("contactUsS3FeedbackFormDetailText", userPreferences.language)}</div>

                                    <textarea
                                        name="queryDetails"
                                        className="lg-text-input !tw-rounded-lg tw-row-start-2"
                                        placeholder={getVernacularString("contactUsS3FeedbackFormDetailPlaceholder", userPreferences.language)}
                                        rows={3}
                                    />
                                </div>

                                <VerticalSpacer className="tw-h-4 lg:tw-col-span-full" />

                                <div className="tw-grid tw-grid-flow-col tw-gap-4 tw-items-start">
                                    <input
                                        type="checkbox"
                                        name="termsAndConditionsChecked"
                                        style={{accentColor: `${isFeedbackFormTermsAndConditionsChecked ? "#eb2a2b" : "white"}`}}
                                        defaultChecked={isFeedbackFormTermsAndConditionsChecked}
                                        required
                                        onChange={(e) => {
                                            setIsFeedbackFormTermsAndConditionsChecked(!isFeedbackFormTermsAndConditionsChecked);
                                        }}
                                        className="tw-flex-none"
                                    />

                                    <div
                                        dangerouslySetInnerHTML={{__html: getVernacularString("contactUsTermsAndConditionsCheckboxtext", userPreferences.language)}}
                                        className="tw-flex-1"
                                    />
                                </div>

                                <input
                                    name="utmParameters"
                                    className="tw-hidden"
                                    readOnly
                                    value={JSON.stringify(utmSearchParameters)}
                                />
                                <input
                                    readOnly
                                    name="formType"
                                    className="tw-hidden"
                                    value="feedbackForm"
                                />
                                <input
                                    readOnly
                                    name="rating"
                                    className="tw-hidden"
                                    value={rating}
                                />
                                <input
                                    readOnly
                                    name="termsAndConditionsChecked"
                                    className="tw-hidden"
                                    value={isFeedbackFormTermsAndConditionsChecked ? "True" : "False"}
                                />
                                <input
                                    readOnly
                                    name="product"
                                    className="tw-hidden"
                                    value={feedbackFormSelectedProduct == null ? "" : productItems[feedbackFormSelectedProduct]}
                                />

                                <HiddenFormField
                                    name="phoneNumber"
                                    value={feedbackFormPhoneNumber}
                                />

                                <VerticalSpacer className="tw-h-4 lg:tw-col-span-full" />

                                <button
                                    type="submit"
                                    className="lg-text-body tw-px-10 tw-py-4 lg-cta-button tw-max-w-fit !tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start"
                                    disabled={rating == 0 || isFeedbackFormButtonDisabled || otpFetcher.data == null || !otpSubmitted}
                                >
                                    {getVernacularString("contactUsS3FormButtonText", userPreferences.language)}
                                </button>
                            </Form>
                        ) : (
                            // <ContactFormSuccess userPreferences={userPreferences} />
                            <div className="tw-grid tw-grid-rows-[minmax(2rem,1fr)_auto_2rem_auto_2rem_auto_1.5rem_auto_2rem_auto_minmax(2rem,1fr)] tw-w-full tw-h-full tw-rounded-lg tw-border lg-border-secondary-700 tw-justify-center tw-place-self-center tw-px-16">
                                <div className="tw-row-start-2 tw-w-full tw-grid tw-justify-center">
                                    <FixedWidthImage
                                        relativePath="/livguard/icons/confirmation.png"
                                        width="10rem"
                                    />
                                </div>

                                <div
                                    dangerouslySetInnerHTML={{__html: getVernacularString("contactPagesuccessT1", userPreferences.language)}}
                                    className="lg-text-banner tw-row-start-4 tw-text-center"
                                />

                                {rating < 3 ? (
                                    <div
                                        dangerouslySetInnerHTML={{__html: getVernacularString("contactPageFeedbackSuccessLowRatingMessage", userPreferences.language)}}
                                        className="lg-text-body tw-row-start-6 tw-text-center"
                                    />
                                ) : (
                                    <>
                                        <div
                                            dangerouslySetInnerHTML={{__html: getVernacularString("contactPageFeedbackSuccessHighRatingMessage", userPreferences.language)}}
                                            className="lg-text-body tw-row-start-6 tw-text-center"
                                        />
                                        <SocialMediaIcons className="tw-row-start-[8] tw-w-full tw-justify-center" />

                                        <div
                                            dangerouslySetInnerHTML={{__html: getVernacularString("successT3", userPreferences.language)}}
                                            className="lg-text-icon tw-row-start-[10] tw-text-center"
                                        />
                                    </>
                                )}
                            </div>
                        )
                    ) : !isComplaintFormSubmitted ? (
                        <Form
                            method="post"
                            className="tw-grid tw-grid-flow-row lg:tw-grid-cols-2 lg:tw-gap-x-4 lg:tw-px-2 tw-place-self-center"
                            onSubmit={() => {
                                setIsComplaintFormButtonDisabled(true);
                            }}
                        >
                            <div className="tw-grid tw-grid-flow-row tw-gap-2 lg:tw-col-span-full">
                                <div className="lg-text-body lg-text-secondary-900 tw-row-start-1 tw-text-left">
                                    {getVernacularString("contactUsS3ComplaintFormRadioText", userPreferences.language)}
                                </div>

                                <div className="tw-row-start-3 tw-grid tw-grid-rows-[auto_1rem_auto] tw-grid-cols-[auto_1rem_auto_minmax(0,1fr)] lg:tw-grid-cols-[minmax(0,max-content)_1rem_minmax(0,max-content)]">
                                    <div className="tw-col-start-1 tw-row-start-1 tw-grid tw-grid-cols-[auto_0.5rem_auto] tw-max-w-fit tw-items-center">
                                        <input
                                            type="radio"
                                            id="product"
                                            name="complaintOption"
                                            className="tw-col-start-1 tw-w-4 tw-h-4"
                                            value={getVernacularString("contactUsS3ComplaintFormRadioOption1", userPreferences.language)}
                                            style={{
                                                accentColor: `${complaintFormOption == getVernacularString("contactUsS3ComplaintFormRadioOption1", userPreferences.language) ? "#eb2a2b" : "white"}`,
                                            }}
                                            onClick={() => setComplaintFormOption(getVernacularString("contactUsS3ComplaintFormRadioOption1", userPreferences.language))}
                                        />
                                        <div className="tw-col-start-3 lg-text-body">{getVernacularString("contactUsS3ComplaintFormRadioOption1", userPreferences.language)}</div>
                                    </div>

                                    {/* <VerticalSpacer className="tw-h-1 tw-row-start-2 lg:tw-hidden" /> */}

                                    <div className="tw-row-start-1 tw-col-start-3 lg:tw-col-start-3 lg:tw-row-start-1 tw-grid tw-grid-cols-[auto_0.5rem_auto] tw-max-w-fit tw-items-center">
                                        <input
                                            type="radio"
                                            id="service"
                                            name="complaintOption"
                                            className="tw-col-start-1 tw-w-4 tw-h-4"
                                            value={getVernacularString("contactUsS3ComplaintFormRadioOption2", userPreferences.language)}
                                            style={{
                                                accentColor: `${complaintFormOption == getVernacularString("contactUsS3ComplaintFormRadioOption2", userPreferences.language) ? "#eb2a2b" : "white"}`,
                                            }}
                                            onClick={() => setComplaintFormOption(getVernacularString("contactUsS3ComplaintFormRadioOption2", userPreferences.language))}
                                        />
                                        <div className="tw-col-start-3 lg-text-body">{getVernacularString("contactUsS3ComplaintFormRadioOption2", userPreferences.language)}</div>
                                    </div>
                                </div>
                            </div>

                            <VerticalSpacer className="tw-h-4" />

                            <div className="tw-grid tw-grid-flow-row tw-gap-2 lg:tw-col-span-full">
                                <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">{getVernacularString("contactUsS3ComplaintFormDetailText", userPreferences.language)}</div>

                                <textarea
                                    name="queryDetails"
                                    className="lg-text-input !tw-rounded-lg tw-row-start-2"
                                    placeholder={getVernacularString("contactUsS3ComplaintFormDetailPlaceholder", userPreferences.language)}
                                    required
                                    rows={3}
                                />
                            </div>

                            <VerticalSpacer className="tw-h-4" />

                            <div className="lg:tw-col-start-1 tw-grid tw-grid-flow-row tw-gap-2">
                                <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">{getVernacularString("contactUsS3FormNameText", userPreferences.language)}</div>

                                <input
                                    type="text"
                                    name="name"
                                    onChange={(e) => {
                                        setComplaintFormName(e.target.value);
                                    }}
                                    value={complaintFormName}
                                    className="lg-text-input"
                                    placeholder={getVernacularString("contactUsS3FormNamePlaceholder", userPreferences.language)}
                                    required
                                />
                            </div>

                            <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

                            <div className="lg:tw-col-start-2 tw-grid tw-grid-flow-row tw-gap-2">
                                <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">{getVernacularString("contactUsS3FormEmailText", userPreferences.language)}</div>

                                <input
                                    type="text"
                                    name="emailId"
                                    className="lg-text-input"
                                    pattern={emailIdValidationPattern}
                                    placeholder={getVernacularString("contactUsS3FormEmailPlaceholder", userPreferences.language)}
                                    required
                                />
                            </div>

                            <VerticalSpacer className="tw-h-4" />

                            <div className="tw-grid lg:tw-col-start-1 tw-grid-flow-row tw-gap-2">
                                {!showOtpField ? (
                                    <div className="lg-text-secondary-900">{getVernacularString("contactUsS3FormNumberText", userPreferences.language)}</div>
                                ) : (
                                    <div className="tw-grid tw-w-full tw-items-center tw-grid-cols-[auto_0.5rem_minmax(0,1fr)] tw-pl-3">
                                        <div
                                            className="tw-col-start-1 tw-text-primary-500-light hover:tw-cursor-pointer lg-text-body-bold"
                                            onClick={(e) => {
                                                setShowOtpField(false);
                                                setResendTimeOut(0);
                                                if (phoneNumberRef.current != null) {
                                                    phoneNumberRef.current.focus();
                                                }
                                            }}
                                        >
                                            {getVernacularString("phoneNumberChnage", userPreferences.language)}
                                        </div>
                                        <div className="tw-col-start-3 lg-text-secondary-900 lg-text-body-bold">{complaintFormPhoneNumber}</div>
                                    </div>
                                )}

                                {!showOtpField ? (
                                    <div className="tw-relative tw-w-full tw-items-center tw-grid">
                                        <input
                                            type="text"
                                            name="phoneNumber"
                                            pattern={indianPhoneNumberValidationPattern}
                                            placeholder={getVernacularString("contactUsS3FormNumberPlaceholder", userPreferences.language)}
                                            required
                                            className="lg-text-input tw-w-full"
                                            disabled={showOtpField}
                                            defaultValue={complaintFormPhoneNumber}
                                            ref={phoneNumberRef}
                                            onChange={(e) => {
                                                setComplaintFormPhoneNumber(e.target.value);
                                                if (e.target.value.length == 10) {
                                                    setShowOtpButton(true);
                                                } else {
                                                    setShowOtpButton(false);
                                                }
                                            }}
                                            onBlur={(e) => {
                                                if (complaintFormPhoneNumber.length == 10) {
                                                    setShowOtpButton(true);
                                                }
                                            }}
                                            onFocus={(e) => {
                                                if (complaintFormPhoneNumber.length == 10) {
                                                    setShowOtpButton(true);
                                                }
                                            }}
                                        />
                                        <div
                                            className={concatenateNonNullStringsWithSpaces(
                                                "tw-absolute tw-right-2 tw-bg-gradient-to-r tw-from-[#F25F60] tw-to-[#EB2A2B] tw-rounded-full tw-px-2 tw-py-1 tw-items-center tw-text-secondary-100-light hover:tw-cursor-pointer",
                                                showOtpButton ? "tw-opacity-100 tw-duration-100 tw-z-10" : "tw-opacity-0 -tw-z-10 tw-duration-100",
                                            )}
                                            onClick={(e) => {
                                                if (complaintFormName.length === 0) {
                                                    toast.error("Name cannot be null! Error code: 8cff595c-911e-4d1b-88bd-ef79e0c9b2c6");
                                                    return;
                                                }
                                                setShowOtpButton(false);
                                                setShowOtpField(true);
                                                setResendTimeOut(60);

                                                if (otpFieldRef.current != null) {
                                                    otpFieldRef.current.focus();
                                                }
                                                const data = new FormData();
                                                data.append("phoneNumber", complaintFormPhoneNumber);
                                                data.append("name", complaintFormName);
                                                otpFetcher.submit(data, {method: "post", action: "/resend-otp"});
                                            }}
                                        >
                                            {getVernacularString("OfferFormGetOTP", userPreferences.language)}
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        className={concatenateNonNullStringsWithSpaces(
                                            "tw-w-full",
                                            showOtpField ? "tw-flex tw-flex-col tw-opacity-100 tw-duration-100 tw-z-10" : "tw-hidden tw-opacity-0 -tw-z-100",
                                        )}
                                    >
                                        <div className="tw-relative">
                                            <input
                                                type="text"
                                                name="otpSubmitted"
                                                className="lg-text-input"
                                                required
                                                placeholder={getVernacularString("contactUsOTPT3E", userPreferences.language)}
                                                ref={otpFieldRef}
                                                onChange={(e) => {
                                                    setIsOtpSubmitted(true);
                                                }}
                                            />
                                            {invalidOtp && (
                                                <div className="lg-text-primary-500 tw-absolute lg-text-icon tw-right-2 tw-top-0 tw-bottom-0 tw-pt-[18px]">
                                                    {getVernacularString("OfferInvalidOTP", userPreferences.language)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div
                                className={concatenateNonNullStringsWithSpaces(
                                    "tw-w-full tw-px-3 lg:tw-col-start-1 lg:tw-hidden",
                                    showOtpField ? "tw-flex tw-flex-row tw-justify-between tw-opacity-100 tw-duration-100 tw-z-10" : "tw-hidden tw-opacity-0 -tw-z-100",
                                )}
                            >
                                <div
                                    className={concatenateNonNullStringsWithSpaces("lg-text-secondary-700 tw-text-[12px]", `${resendTimeOut > 0 ? "undefined" : "hover:tw-cursor-pointer"}`)}
                                    onClick={() => {
                                        setIsOtpResent(true);
                                        setResendTimeOut(60);

                                        const data = new FormData();
                                        data.append("phoneNumber", complaintFormPhoneNumber);
                                        data.append("name", complaintFormName);
                                        otpFetcher.submit(data, {method: "post", action: "/resend-otp"});
                                    }}
                                >
                                    {getVernacularString("OfferResendOTP", userPreferences.language)}
                                </div>
                                <div className="lg-text-secondary-700 tw-text-[12px]">{`00:${resendTimeOut}`}</div>
                            </div>

                            <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

                            <div className="lg:tw-col-start-2 tw-grid tw-grid-flow-row tw-gap-2">
                                <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">{getVernacularString("10cb3115-ba0a-4e30-af0b-de71d6240f73", userPreferences.language)}</div>

                                <input
                                    type="text"
                                    name="pincode"
                                    pattern={pinCodeValidationPattern}
                                    value={pinCode}
                                    onChange={async (e) => {
                                        setPinCode(e.target.value);
                                        if (e.target.value.length < 6) {
                                            setDealers(null);
                                            return;
                                        }
                                        if (e.target.value.length == 6) {
                                            const data = new FormData();
                                            data.append("pincode", e.target.value);
                                            dealerFetcher.submit(data, {method: "post", action: "/contact-us/get-dealers-for-pin-code"});
                                        }
                                    }}
                                    maxLength={6}
                                    className="lg-text-input"
                                    placeholder={getVernacularString("de42afeb-0e61-47c6-917f-db597603506a", userPreferences.language)}
                                    required
                                />
                            </div>

                            <div
                                className={concatenateNonNullStringsWithSpaces(
                                    "max-lg:tw-hidden tw-w-full tw-px-3 lg:tw-col-start-1",
                                    showOtpField ? "tw-flex tw-flex-row tw-justify-between tw-opacity-100 tw-duration-100 tw-z-10" : "tw-hidden tw-opacity-0 -tw-z-100",
                                )}
                            >
                                <div
                                    className={concatenateNonNullStringsWithSpaces("lg-text-secondary-700 tw-text-[12px]", `${resendTimeOut > 0 ? "undefined" : "hover:tw-cursor-pointer"}`)}
                                    onClick={() => {
                                        setIsOtpResent(true);
                                        setResendTimeOut(60);

                                        const data = new FormData();
                                        data.append("phoneNumber", complaintFormPhoneNumber);
                                        data.append("name", complaintFormName);
                                        otpFetcher.submit(data, {method: "post", action: "/resend-otp"});
                                    }}
                                >
                                    {getVernacularString("OfferResendOTP", userPreferences.language)}
                                </div>
                                <div className="lg-text-secondary-700 tw-text-[12px]">{`00:${resendTimeOut}`}</div>
                            </div>

                            <VerticalSpacer className="tw-h-4 lg:tw-col-span-full" />

                            {dealerFetcher.state !== "idle" ? (
                                <Loader
                                    userPreferences={userPreferences}
                                    className="lg:tw-col-span-full tw-justify-self-center"
                                />
                            ) : (
                                <div className="tw-grid tw-gap-2 lg:tw-col-span-full">
                                    <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">{getVernacularString("76bb0c30-c244-4815-b68d-a1780f8c697e", userPreferences.language)}</div>

                                    <FancySearchableSelect
                                        items={
                                            dealers == null
                                                ? []
                                                : dealers.map((dealer, dealerIndex) => {
                                                      return {
                                                          name: dealer.name,
                                                          area: dealer.area,
                                                          index: dealerIndex,
                                                      };
                                                  })
                                        }
                                        selectedItem={
                                            dealers == null || selectedDealerIndex == null
                                                ? null
                                                : {
                                                      name: dealers[selectedDealerIndex].name,
                                                      area: dealers[selectedDealerIndex].area,
                                                      index: selectedDealerIndex,
                                                  }
                                        }
                                        placeholder={getVernacularString("11eba4f7-13aa-45bd-93bd-31d98b72531a", userPreferences.language)}
                                        // setSelectedItem={(dealer) => {
                                        //     console.log(dealer);
                                        //     setSelectedDealerCode(dealer.dealerCode);
                                        //     setSelectedDealerIndex(dealer.index);
                                        // }}
                                        setSelectedItem={(item) => {
                                            if (item == null) {
                                                return null;
                                            }
                                            setSelectedDealerIndex(item.index);
                                            return {
                                                name: item.name,
                                                area: item.area,
                                            };
                                        }}
                                        filterFunction={(items, query) => items.filter((item) => item.name.toLowerCase().startsWith(query.toLowerCase()))}
                                        renderFunction={(item) => {
                                            if (item == null) {
                                                return "";
                                            }
                                            return `${item.name} - ${item.area}`;
                                        }}
                                        disabled={dealers == null}
                                        inputClassName="disabled:tw-opacity-[0.6] disabled:!tw-bg-secondary-100-light disabled:dark:tw-opacity-1 disabled:dark:!tw-bg-secondary-300-dark disabled:dark:!tw-text-secondary-900-dark"
                                    />

                                    {/* <FormSelectComponent
                                        items={
                                            dealers == null
                                                ? []
                                                : dealers?.map((dealer, dealerIndex) => {
                                                      return {
                                                          name: dealer.name,
                                                          area: dealer.area,
                                                          address: dealer.address,
                                                          index: dealerIndex,
                                                      };
                                                  })
                                        }
                                        itemBuilder={(dealer) => {
                                            return dealer == null
                                                ? getVernacularString("11eba4f7-13aa-45bd-93bd-31d98b72531a", userPreferences.language)
                                                : `
                                                <div
                                                    className="tw-m-4 tw-grid tw-grid-rows-[auto_minmax(0,1fr)] tw-grid-flow-row"
                                                >
                                                    ${dealer.name == "" ? "Select Dealer" : `<div className="lg-text-body-bold">${dealer?.name} - ${dealer?.area}</div>`}

                                                </div>
                                            `;
                                        }}
                                        value={
                                            selectedDealerIndex == null
                                                ? {name: "", area: "", index: -1}
                                                : {name: dealers[selectedDealerIndex].name, area: dealers[selectedDealerIndex].area, index: selectedDealerIndex}
                                        }
                                        setValue={(dealer) => setSelectedDealerIndex(dealer?.index)}
                                        buttonClassName="disabled:tw-opacity-[0.4] disabled:!tw-bg-secondary-100-light disabled:dark:tw-opacity-1 disabled:dark:!tw-bg-secondary-300-dark disabled:dark:!tw-text-secondary-900-dark"
                                        disabled={dealers == null}
                                    /> */}
                                </div>
                            )}

                            <VerticalSpacer className="tw-h-4 lg:tw-col-span-full" />

                            <div className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-flow-col tw-gap-4 tw-items-start lg:tw-col-span-full")}>
                                <input
                                    type="checkbox"
                                    name="termsAndConditionsChecked"
                                    style={{accentColor: `${isComplaintFormTermsAndConditionsChecked ? "#eb2a2b" : "white"}`}}
                                    defaultChecked={isComplaintFormTermsAndConditionsChecked}
                                    required
                                    onChange={(e) => {
                                        setIsComplaintFormTermsAndConditionsChecked(!isComplaintFormTermsAndConditionsChecked);
                                    }}
                                    className="tw-flex-none"
                                />

                                <div
                                    dangerouslySetInnerHTML={{__html: getVernacularString("contactUsTermsAndConditionsCheckboxtext", userPreferences.language)}}
                                    className="tw-flex-1"
                                />
                            </div>

                            <VerticalSpacer className="tw-h-4" />

                            <input
                                name="utmParameters"
                                className="tw-hidden"
                                readOnly
                                value={JSON.stringify(utmSearchParameters)}
                            />
                            <input
                                readOnly
                                className="tw-hidden"
                                value="enquiryForm"
                                name="formType"
                            />
                            <input
                                readOnly
                                name="termsAndConditionsChecked"
                                className="tw-hidden"
                                value={isComplaintFormTermsAndConditionsChecked ? "True" : "False"}
                            />

                            <HiddenFormField
                                name="selectedDealerCode"
                                value={selectedDealerIndex == null || dealers == null ? "" : dealers[selectedDealerIndex].dealerCode}
                            />

                            <HiddenFormField
                                name="phoneNumber"
                                value={complaintFormPhoneNumber}
                            />

                            <button
                                type="submit"
                                className={concatenateNonNullStringsWithSpaces(
                                    // dealerFetcher.state === "submitting" || (dealers != null && dealers.length > 0) ? "tw-row-start-9 lg:tw-row-start-7" : "tw-row-start-8 lg:tw-row-start-6",
                                    "lg:tw-col-span-full lg-text-body tw-px-10 tw-py-4 lg-cta-button !tw-text-secondary-900-dark tw-max-w-fit tw-place-self-center lg:tw-place-self-start",
                                )}
                                disabled={complaintFormOption === 0 || isComplaintFormButtonDisabled || otpFetcher.data == null || !otpSubmitted}
                            >
                                {getVernacularString("contactUsS3FormButtonText", userPreferences.language)}
                            </button>
                        </Form>
                    ) : (
                        // <ContactFormSuccess userPreferences={userPreferences} />
                        <div className="tw-grid tw-grid-rows-[minmax(2rem,1fr)_auto_2rem_auto_1.5rem_auto_1.5rem_auto_1.5rem_auto_minmax(2rem,1fr)] tw-w-full tw-h-full tw-rounded-lg tw-border lg-border-secondary-700 tw-justify-center tw-place-self-center tw-px-16">
                            <div className="tw-row-start-2 tw-w-full tw-grid tw-justify-center">
                                <FixedWidthImage
                                    relativePath="/livguard/icons/confirmation.png"
                                    width="10rem"
                                />
                            </div>

                            <div
                                dangerouslySetInnerHTML={{__html: getVernacularString("contactPagesuccessT1", userPreferences.language)}}
                                className="lg-text-banner tw-row-start-4 tw-text-center"
                            />

                            <div
                                dangerouslySetInnerHTML={{__html: getVernacularString("contactPageComplaintSuccessMessage", userPreferences.language)}}
                                className="lg-text-body tw-row-start-6 tw-text-center"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function ClickConnectPowerUpSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const [isContactUsDialogOpen, setIsContactUsDialogOpen] = useState(false);
    const [dialogOptions, setDialogOptions] = useState<{dialogType: string; headerTextContentId: string}>({dialogType: "", headerTextContentId: ""});

    function CallUsCard() {
        return (
            <div className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full lg:tw-row-start-1 lg:lg-card lg-text-secondary-900 tw-rounded-lg tw-grid tw-grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:tw-grid-cols-[auto_1.5rem_minmax(0,1fr)] tw-items-center lg:tw-px-4 lg:tw-py-4">
                <div className="tw-row-start-1 tw-col-start-2 lg:tw-col-start-1 tw-rounded-full lg-card tw-h-16 tw-w-16 lg:tw-h-20 lg:tw-w-20 tw-grid tw-items-center tw-justify-center tw-place-self-center">
                    <img
                        className={"tw-w-8 tw-h-8 lg:tw-w-10 lg:tw-h-10 tw-invert dark:tw-invert-0"}
                        src="https://files.growthjockey.com/livguard/icons/contact-us/call-us.svg"
                    />
                </div>

                <VerticalSpacer className="tw-h-4 tw-row-start-2 lg:tw-hidden" />

                <div className="tw-row-start-3 lg:tw-row-start-1 tw-col-start-2 lg:tw-col-start-3 tw-grid tw-grid-flow-row tw-gap-4 tw-h-full">
                    <div className="lg-text-body tw-row-start-1 tw-place-self-center lg:tw-place-self-start tw-text-center lg:tw-text-left">
                        {getVernacularString("contactUsS2Option1Text", userPreferences.language)}
                    </div>

                    <button
                        className="lg-cta-button tw-w-full lg:tw-w-[8.375rem] tw-place-self-center tw-self-end lg:tw-place-self-start tw-row-start-2 !tw-px-[0]"
                        onClick={() => {
                            setDialogOptions({dialogType: "call-us", headerTextContentId: "contactUsS2Option1ButtonText"});
                            setIsContactUsDialogOpen(true);
                        }}
                    >
                        {getVernacularString("contactUsS2Option1ButtonText", userPreferences.language)}
                    </button>
                </div>
            </div>
        );
    }

    function WhatsappUsCard() {
        return (
            <div className="tw-row-start-1 tw-col-start-3 lg:tw-col-span-full lg:tw-row-start-2 lg:lg-card lg-text-secondary-900 tw-rounded-lg tw-grid tw-grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:tw-grid-cols-[auto_1.5rem_minmax(0,1fr)] tw-items-center lg:tw-px-4 lg:tw-py-4 tw-h-full">
                <div className="tw-row-start-1 tw-col-start-2 lg:tw-col-start-1 tw-rounded-full lg-card tw-h-16 tw-w-16 lg:tw-h-20 lg:tw-w-20 tw-grid tw-items-center tw-justify-center tw-place-self-center">
                    <img
                        className="tw-w-8 tw-h-8 lg:tw-w-10 lg:tw-h-10 tw-invert dark:tw-invert-0"
                        src="https://files.growthjockey.com/livguard/icons/contact-us/whatsapp-us.svg"
                    />
                </div>

                <VerticalSpacer className="tw-h-4 tw-row-start-2 lg:tw-row-start-1 lg:tw-hidden" />

                <div className="tw-row-start-3 lg:tw-row-start-1 tw-col-start-2 lg:tw-col-start-3 tw-grid tw-grid-flow-row tw-gap-4 tw-h-full">
                    <div className="lg-text-body tw-row-start-1 tw-text-center lg:tw-text-left">{getVernacularString("contactUsS2Option2Text", userPreferences.language)}</div>

                    <button
                        className="lg-cta-button tw-w-full lg:tw-w-[8.375rem] tw-place-self-center tw-self-end lg:tw-place-self-start tw-row-start-2 !tw-px-[0]"
                        onClick={() => {
                            setDialogOptions({dialogType: "chat-with-us", headerTextContentId: "contactUsS2Option2ButtonText"});
                            setIsContactUsDialogOpen(true);
                        }}
                    >
                        {getVernacularString("contactUsS2Option2ButtonText", userPreferences.language)}
                    </button>
                </div>
            </div>
        );
    }

    function EmailUsCard() {
        return (
            <div className="tw-row-start-3 tw-col-start-1 lg:tw-col-span-full lg:tw-row-start-3 lg:lg-card lg-text-secondary-900 tw-rounded-lg tw-grid tw-grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:tw-grid-rows-[auto] lg:tw-grid-cols-[auto_1.5rem_minmax(0,1fr)] tw-items-center lg:tw-px-4 lg:tw-py-4 tw-h-full">
                <div className="tw-row-start-1 tw-col-start-2 lg:tw-col-start-1 tw-rounded-full lg-card tw-h-16 tw-w-16 lg:tw-h-20 lg:tw-w-20 tw-grid tw-items-center tw-justify-center tw-place-self-center">
                    <img
                        className="tw-w-8 tw-h-8 lg:tw-w-10 lg:tw-h-10 tw-invert dark:tw-invert-0"
                        src="https://files.growthjockey.com/livguard/icons/contact-us/email-us.svg"
                    />
                </div>

                <VerticalSpacer className="tw-h-4 tw-row-start-2 lg:tw-row-start-1 lg:tw-hidden" />

                <div className="tw-row-start-3 lg:tw-row-start-1 tw-col-start-2 lg:tw-col-start-3 tw-grid tw-grid-flow-row tw-gap-4 tw-h-full">
                    <div className="lg-text-body tw-row-start-1 tw-text-center lg:tw-text-left">{getVernacularString("contactUsS2Option3Text", userPreferences.language)}</div>

                    <button
                        className="lg-cta-button tw-w-full lg:tw-w-[8.375rem] tw-place-self-center tw-self-end lg:tw-place-self-start tw-row-start-2 !tw-px-[0]"
                        onClick={() => {
                            setDialogOptions({dialogType: "email-us", headerTextContentId: "contactUsS2Option3ButtonText"});
                            setIsContactUsDialogOpen(true);
                        }}
                    >
                        {getVernacularString("contactUsS2Option3ButtonText", userPreferences.language)}
                    </button>
                </div>
            </div>
        );
    }

    function RequestAServiceCard() {
        return (
            <div className="tw-row-start-3 tw-col-start-3 lg:tw-col-span-full lg:tw-row-start-4 lg:lg-card lg-text-secondary-900 tw-rounded-lg tw-grid tw-grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:tw-grid-cols-[auto_1.5rem_minmax(0,1fr)] tw-items-center lg:tw-px-4 lg:tw-py-4">
                <div className="tw-row-start-1 tw-col-start-2 lg:tw-col-start-1 tw-rounded-full lg-card tw-h-16 tw-w-16 lg:tw-h-20 lg:tw-w-20 tw-grid tw-items-center tw-justify-center tw-place-self-center">
                    <img
                        className="tw-w-8 tw-h-8 lg:tw-w-10 lg:tw-h-10 tw-invert dark:tw-invert-0"
                        src="https://files.growthjockey.com/livguard/icons/contact-us/request-service.svg"
                    />
                </div>

                <VerticalSpacer className="tw-h-4 tw-row-start-2 lg:tw-row-start-1 lg:tw-hidden" />

                <div className="tw-row-start-3 lg:tw-row-start-1 tw-col-start-2 lg:tw-col-start-3 tw-grid tw-grid-flow-row tw-gap-4 tw-h-full">
                    <div className="lg-text-body tw-row-start-1 tw-text-center lg:tw-text-left">{getVernacularString("contactUsS2Option4Text", userPreferences.language)}</div>

                    <Link
                        className="lg-cta-button tw-w-full lg:tw-w-[8.375rem] tw-place-self-center tw-self-end lg:tw-place-self-start tw-row-start-2 !tw-px-[0] tw-text-center"
                        to="/service"
                    >
                        {getVernacularString("contactUsS2Option4ButtonText", userPreferences.language)}
                    </Link>
                </div>
            </div>
        );
    }
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold * 2});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "click-connect": {
                humanReadableName: getVernacularString("7ec2537f-9154-4f04-a3ad-d7a33fa78494", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-rows-[auto_0.5rem_auto_1rem_auto_minmax(0,1fr)] lg-px-screen-edge-2 lg:tw-px-0", className)}
            id="click-connect"
            ref={sectionRef}
        >
            <DefaultTextAnimation className="tw-row-start-1 lg-text-headline tw-text-center lg:tw-text-left">
                <div dangerouslySetInnerHTML={{__html: appendSpaceToString(getVernacularString("contactUsS2H", userPreferences.language))}} />
            </DefaultTextAnimation>

            {/* <VerticalSpacer className="tw-h-2 lg:tw-h-4 tw-row-start-2" /> */}

            <DefaultTextAnimation className="tw-row-start-3 lg-text-headline tw-text-center lg:tw-text-left">
                <div className="lg-text-body">{getVernacularString("contactUsS2HText", userPreferences.language)}</div>
            </DefaultTextAnimation>

            {/* <VerticalSpacer className="tw-h-4 lg:tw-h-6 tw-row-start-4" /> */}

            <div className="tw-row-start-5 tw-grid tw-grid-rows-[auto_2rem_auto] lg:tw-grid-rows-[auto_auto_auto_auto] tw-grid-cols-[minmax(0,1fr)_2rem_minmax(0,1fr)] lg:tw-gap-6">
                <CallUsCard />

                <WhatsappUsCard />

                <EmailUsCard />

                <RequestAServiceCard />
            </div>

            <ContactUsDialog
                userPreferences={userPreferences}
                isContactUsDialogOpen={isContactUsDialogOpen}
                setIsContactUsDialogOpen={setIsContactUsDialogOpen}
                headerTextContentId={dialogOptions.headerTextContentId}
                dialogType={dialogOptions.dialogType}
            />
        </div>
    );
}

function ContactUsDialog({
    userPreferences,
    isContactUsDialogOpen,
    setIsContactUsDialogOpen,
    headerTextContentId,
    dialogType,
}: {
    userPreferences: UserPreferences;
    isContactUsDialogOpen: boolean;
    setIsContactUsDialogOpen: React.Dispatch<boolean>;
    headerTextContentId: string;
    dialogType: string;
}) {
    function tryToCloseContactUsDialog() {
        setIsContactUsDialogOpen(false);
    }

    return (
        <Transition
            show={isContactUsDialogOpen}
            as={React.Fragment}
        >
            <Dialog
                as="div"
                className="tw-relative tw-z-[60] tw-w-full"
                onClose={tryToCloseContactUsDialog}
            >
                <Transition.Child
                    as={React.Fragment}
                    enter="tw-ease-out tw-transition-all tw-duration-200"
                    enterFrom="tw-opacity-0"
                    enterTo="tw-opacity-100"
                    leave="tw-ease-in tw-transition-all tw-duration-200"
                    leaveFrom="tw-opacity-100"
                    leaveTo="tw-opacity-0"
                >
                    <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-[55%] tw-backdrop-blur" />
                </Transition.Child>

                <Dialog.Panel className="lg-px-screen-edge tw-fixed tw-inset-0 tw-grid tw-grid-rows-[1fr_auto_1fr] tw-grid-cols-1 tw-justify-center tw-items-center">
                    <div onClick={tryToCloseContactUsDialog} />

                    <Transition.Child
                        as={React.Fragment}
                        enter="tw-ease-out tw-transition-all tw-duration-200"
                        enterFrom="tw-opacity-0"
                        enterTo="tw-opacity-full"
                        leave="tw-ease-in tw-transition-all tw-duration-200"
                        leaveFrom="tw-opacity-full"
                        leaveTo="tw-opacity-0"
                    >
                        <div className="tw-w-full lg:tw-max-w-[30rem] tw-mx-auto tw-bg-gradient-to-b tw-from-secondary-500-light tw-to-secondary-100-light dark:tw-from-secondary-500-dark dark:tw-to-secondary-100-dark lg-bg-secondary-100 tw-px-6 tw-py-6 tw-rounded-lg tw-flex tw-flex-col">
                            <div className="tw-grid tw-grid-cols-[1.5rem_minmax(0,1fr)_1.5rem]">
                                <div className="tw-row-start-1 tw-col-start-2 tw-w-full tw-text-center lg-text-headline">{getVernacularString(headerTextContentId, userPreferences.language)}</div>
                                <button
                                    type="button"
                                    onClick={tryToCloseContactUsDialog}
                                    className="tw-row-start-1 tw-col-start-3"
                                >
                                    <X className="tw-w-6 tw-h-6" />
                                </button>
                            </div>

                            <VerticalSpacer className="tw-h-4" />

                            <div className="lg-text-title2">{getVernacularString("headerContactUsDialogT2", userPreferences.language)}</div>

                            <VerticalSpacer className="tw-h-2" />

                            <Link
                                to={dialogType == "call-us" ? "tel:8001025551" : dialogType == "email-us" ? "mailto:livserv@sar-group.com" : "https://wa.me/7428191000"}
                                className="tw-w-full lg-bg-primary-500 tw-text-secondary-900-dark tw-py-3 tw-px-4 tw-rounded-full"
                            >
                                <div className="tw-flex tw-flex-row tw-items-center">
                                    <div className="tw-flex-1">{dialogType == "call-us" ? "1800-1025-551" : dialogType == "email-us" ? "livserv@sar-group.com" : "+91 74281-91000"}</div>

                                    {dialogType == "call-us" && (
                                        <img
                                            className="tw-w-6 tw-h-6 tw-flex-0"
                                            src="https://files.growthjockey.com/livguard/icons/contact-us/call-us-dialog.svg"
                                        />
                                    )}

                                    {dialogType == "email-us" && (
                                        <img
                                            className="tw-w-6 tw-h-6 tw-flex-0"
                                            src="https://files.growthjockey.com/livguard/icons/contact-us/email-us-dialog.svg"
                                        />
                                    )}

                                    {dialogType == "chat-with-us" && (
                                        <img
                                            className="tw-w-6 tw-h-6 tw-flex-0"
                                            src="https://files.growthjockey.com/livguard/icons/contact-us/whatsapp-us-dialog.svg"
                                        />
                                    )}
                                </div>
                            </Link>

                            <VerticalSpacer className="tw-h-4" />

                            {dialogType !== "chat-with-us" && (
                                <>
                                    <div className="lg-text-title2">{getVernacularString("headerContactUsDialogT3", userPreferences.language)}</div>

                                    <VerticalSpacer className="tw-h-2" />

                                    <Link
                                        to={dialogType == "call-us" ? "tel:+919205667999" : dialogType == "email-us" ? "mailto:marketing@livguard.com" : "https://wa.me/9205667999"}
                                        className="tw-w-full lg-bg-primary-500 tw-text-secondary-900-dark tw-py-3 tw-px-4 tw-rounded-full"
                                    >
                                        <div className="tw-flex tw-flex-row tw-items-center">
                                            <div className="tw-flex-1">{dialogType == "call-us" ? "+91 92056-67999" : dialogType == "email-us" ? "marketing@livguard.com" : "+91 92056-67999"}</div>

                                            {dialogType == "call-us" && (
                                                <img
                                                    className="tw-w-6 tw-h-6 tw-flex-0"
                                                    src="https://files.growthjockey.com/livguard/icons/contact-us/call-us-dialog.svg"
                                                />
                                            )}

                                            {dialogType == "email-us" && (
                                                <img
                                                    className="tw-w-6 tw-h-6 tw-flex-0"
                                                    src="https://files.growthjockey.com/livguard/icons/contact-us/email-us-dialog.svg"
                                                />
                                            )}

                                            {dialogType == "chat-with-us" && (
                                                <img
                                                    className="tw-w-6 tw-h-6 tw-flex-0"
                                                    src="https://files.growthjockey.com/livguard/icons/contact-us/whatsapp-us-dialog.svg"
                                                />
                                            )}
                                        </div>
                                    </Link>
                                </>
                            )}
                        </div>
                    </Transition.Child>
                </Dialog.Panel>

                <div onClick={tryToCloseContactUsDialog} />
            </Dialog>
        </Transition>
    );
}

export function OurPresence({userPreferences, className, headingTextContentId}: {userPreferences: UserPreferences; className?: string; headingTextContentId: string}) {
    const presenceData = [
        {
            imageUrl: "/livguard/contact-us/3/India.png",
            title: "contactUsS4Option1Heading",
            description: "contactUsS4Option1Text",
            buttonText: "contactUsS4ButtonText",
            buttonLink: "/india-ops",
        },
        {
            imageUrl: "/livguard/contact-us/3/International.png",
            title: "contactUsS4Option2Heading",
            description: "contactUsS4Option2Text",
            buttonText: "contactUsS4ButtonText",
            buttonLink: "/global-ops",
        },
    ];
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "our-operations": {
                humanReadableName: getVernacularString("591ebee7-9d2d-416f-8942-29e3840cc4c4", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-flow-row tw-justify-left lg-px-screen-edge-2 tw-max-w-7xl tw-mx-auto", className)}
            id="our-operations"
            ref={sectionRef}
        >
            <DefaultTextAnimation className="tw-row-start-1 lg-text-headline tw-text-center">
                <div dangerouslySetInnerHTML={{__html: appendSpaceToString(getVernacularString(headingTextContentId, userPreferences.language))}} />
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-6 tw-row-start-2" />

            <div className="tw-row-start-3 tw-grid tw-grid-cols-1 tw-grid-rows-2 tw-grid-flow-row lg:tw-grid-cols-2 lg:tw-grid-rows-1 lg:tw-grid-flow-col tw-gap-x-4 tw-gap-y-8">
                {presenceData.map((presence, presenceIndex) => {
                    return (
                        <div
                            className="lg-card tw-grid tw-grid-rows-[auto_1rem_minmax(0,1fr)] lg:tw-grid-rows-1 lg:tw-grid-cols-[auto_2rem_minmax(0,1fr)] tw-items-center tw-rounded-lg lg-card"
                            key={presenceIndex}
                        >
                            {/* <div className="tw-row-start-1 tw-w-[calc(100%+1px)] tw-h-full lg:tw-w-full lg:tw-h-[calc(100%+2px)] tw-px-4 tw-py-3 tw-bg-new-background-border-500-light dark:tw-bg-new-background-border-500-dark tw-rounded-t-lg lg:tw-rounded-tl-lg lg:tw-rounded-bl-lg lg:tw-rounded-t-none lg:tw-grid lg:tw-items-center"> */}
                            <div className="tw-w-full tw-py-4 tw-rounded-r-lg tw-grid tw-justify-items-center lg-card lg:tw-h-full lg:tw-p-4 lg:tw-grid lg:tw-items-center tw-border-none">
                                <img
                                    src={getAbsolutePathForRelativePath(getMetadataForImage(presence.imageUrl).finalUrl, ImageCdnProvider.Bunny, null, null)}
                                    className="tw-w-[6.25rem] tw-h-[6.25rem]"
                                />
                            </div>
                            {/* </div> */}

                            <div className="tw-col-start-1 tw-row-start-3 lg:tw-col-start-3 lg:tw-row-start-1 tw-grid tw-grid-rows-[auto_0.5rem_minmax(0,1fr)_0.5rem_auto_1rem] tw-px-6 tw-py-2">
                                <div className="lg-text-body tw-font-bold tw-row-start-1 tw-text-center lg:tw-text-left">{getVernacularString(presence.title, userPreferences.language)}</div>

                                <div className="lg-text-body tw-row-start-3 tw-text-center lg:tw-text-left">{getVernacularString(presence.description, userPreferences.language)}</div>

                                <Link
                                    to={presence.buttonLink}
                                    className="lg-cta-outline-button lg-cta-outline-button-transition hover:tw-px-[3.125rem] tw-row-start-5 tw-place-self-center lg:tw-place-self-start"
                                >
                                    {getVernacularString(presence.buttonText, userPreferences.language)}
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function ExploreCareers({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge-2 tw-max-w-7xl tw-mx-auto", className)}>
            <div className="tw-p-6 lg-contact-gradient-light dark:lg-contact-gradient-dark tw-rounded-lg tw-grid tw-grid-rows-[auto_1rem_auto_1rem_minmax(0,1fr)_1rem_auto] lg:tw-grid-rows-1 lg:tw-grid-cols-[auto_2rem_20rem_2rem_minmax(0,1fr)_2rem_auto] tw-items-center">
                <div className="tw-w-[7.75rem] tw-h-[7.75rem] tw-col-start-1 tw-row-start-1 lg-bg-secondary-100 tw-rounded-full tw-grid tw-justify-center tw-items-center tw-place-self-center lg:tw-place-self-start">
                    <img
                        src="https://files.growthjockey.com/livguard/icons/contact-us/hiring.svg"
                        alt="hiring"
                        className="tw-w-[4rem] tw-h-[4rem]"
                    />
                </div>

                <div
                    className="tw-row-start-3 tw-col-start-1 lg:tw-row-start-1 lg:tw-col-start-3 lg-text-headline tw-text-center lg:tw-text-left"
                    dangerouslySetInnerHTML={{__html: appendSpaceToString(getVernacularString("contactUsS5H", userPreferences.language))}}
                />

                <div className="tw-row-start-5 tw-col-start-1 lg:tw-row-start-1 lg:tw-col-start-5 tw-text-center lg:tw-text-left lg:tw-max-w-[20rem] lg:tw-place-self-center">
                    {getVernacularString("contactUsS5Text", userPreferences.language)}
                </div>

                <Link
                    className="tw-row-start-7 tw-col-start-1 lg:tw-row-start-1 lg:tw-col-start-7 tw-place-self-center lg-cta-button tw-max-w-fit"
                    to="/"
                >
                    {getVernacularString("contactUsS5ButtonText", userPreferences.language)}
                </Link>
            </div>
        </div>
    );
}

export function getFormSelectProductItems(language: Language): string[] {
    return [
        getVernacularString("ab28480c-7f98-45fc-8bb0-e15cd633b31b", language),
        getVernacularString("3373177a-78dd-4930-8a52-96800b5de45e", language),
        getVernacularString("6b5c90fb-35f1-4f34-9064-46c4cbd94eaa", language),
        getVernacularString("e9977450-be65-4c1b-9eb6-c2224246a81a", language),
        getVernacularString("178f037b-d4e3-41dc-b44d-dc4468fa4c74", language),
        getVernacularString("49cca91d-11f0-463a-8d24-873cf9428e62", language),
    ];
}
