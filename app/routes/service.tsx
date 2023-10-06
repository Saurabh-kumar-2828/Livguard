import {Dialog, Transition} from "@headlessui/react";
import type {ActionFunction, LoaderFunction, V2_MetaFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import {Form, Link, useActionData, useFetcher, useLoaderData} from "@remix-run/react";
import React, {useContext, useEffect, useRef, useState} from "react";
import {X} from "react-bootstrap-icons";
import {useInView} from "react-intersection-observer";
import {useResizeDetector} from "react-resize-detector";
import {toast} from "react-toastify";
import {verifyOtp} from "~/backend/authentication.server";
import {insertServiceRequests} from "~/backend/dealer.server";
import {sendDataToFreshsales} from "~/backend/freshsales.server";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {EmbeddedYoutubeVideo} from "~/components/embeddedYoutubeVideo";
import {FaqSectionInternal} from "~/components/faqs";
import {FixedWidthImage} from "~/components/images/fixedWidthImage";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {PageScaffold} from "~/components/pageScaffold";
import {SecondaryNavigation} from "~/components/secondaryNavigation";
import {TestimonialsCarousel} from "~/components/testimonialsCarousel";
import {SecondaryNavigationControllerContext} from "~/contexts/secondaryNavigationControllerContext";
import {HiddenFormField} from "~/global-common-typescript/components/hiddenFormField";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {ImageCdnProvider} from "~/common--type-definitions/typeDefinitions";
import {getStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {concatenateNonNullStringsWithSpaces, generateUuid} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {emailIdValidationPattern, indianPhoneNumberValidationPattern, pinCodeValidationPattern} from "~/global-common-typescript/utilities/validationPatterns";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {SecondaryNavigationController, useSecondaryNavigationController} from "~/hooks/useSecondaryNavigationController";
import {FormSelectComponent} from "~/livguard-common-typescript/scratchpad";
import {getFormSelectProductItems} from "~/routes/contact-us";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {UserPreferences} from "~/typeDefinitions";
import {Language, Theme} from "~/typeDefinitions";
import {appendSpaceToString, getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest, secondaryNavThreshold} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";

export const meta: V2_MetaFunction = ({data: loaderData}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = loaderData.userPreferences;
    if (userPreferences.language == Language.English) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/service",
            },
            {
                title: "Livguard Services - Reliable Solutions for Your Power Needs",
            },
            {
                name: "description",
                content: "Get reliable and effective Livguard services that ensure seamless performance of your automotive, home, and industrial needs. Contact us for expert solutions.",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/service",
            },
            {
                property: "og:title",
                content: "Livguard Services - Reliable Solutions for Your Power Needs",
            },
            {
                property: "og:description",
                content: "Get reliable and effective Livguard services that ensure seamless performance of your automotive, home, and industrial needs. Contact us for expert solutions.",
            },
            {
                property: "og:site_name",
                content: "Livguard",
            },
            {
                property: "og:type",
                content: "website",
            },
            {
                property: "og:image",
                content: `${getAbsolutePathForRelativePath(getMetadataForImage("/livguard/service/service-og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null)}`,
            },
            {
                "script:ld+json": {
                    "@type": "SiteNavigationElement",
                    name: "Service",
                    url: "https://www.livguard.com/contact-us",
                    telephone: "+91 92056-67999",
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
                href: "https://www.livguard.com/service",
            },
            {
                title: "लिवगार्ड सेवाएं - आपकी बिजली की आवश्यकताओं के लिए विश्वसनीय समाधान",
            },
            {
                name: "description",
                content: "लिवगार्ड सेवाएं प्रदान करती हैं विश्वसनीय और प्रभावी समाधान जो आपके घरेलू और औद्योगिक आवश्यकताओं को सुनिश्चित करते हैं। विशेषज्ञ समाधान के लिए हमसे संपर्क करें।",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/service",
            },
            {
                property: "og:title",
                content: "लिवगार्ड सेवाएं - आपकी बिजली की आवश्यकताओं के लिए विश्वसनीय समाधान",
            },
            {
                property: "og:description",
                content: "लिवगार्ड सेवाएं प्रदान करती हैं विश्वसनीय और प्रभावी समाधान जो आपके घरेलू और औद्योगिक आवश्यकताओं को सुनिश्चित करते हैं। विशेषज्ञ समाधान के लिए हमसे संपर्क करें।",
            },
            {
                property: "og:site_name",
                content: "Livguard",
            },
            {
                property: "og:type",
                content: "website",
            },
            {
                property: "og:image",
                content: `${getAbsolutePathForRelativePath(getMetadataForImage("/livguard/service/service-og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null)}`,
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

export type ActionData = {
    error: string | null;
    isInvalidOtp?: boolean;
};

export const action: ActionFunction = async ({request, params}) => {
    const body = await request.formData();

    const issueDetails = safeParse(getStringFromUnknown, body.get("issueDetails"));
    const contactNumber = safeParse(getStringFromUnknown, body.get("contactNumber"));
    const emailId = safeParse(getStringFromUnknown, body.get("emailId"));
    const name = safeParse(getStringFromUnknown, body.get("name"));
    const pinCode = safeParse(getStringFromUnknown, body.get("pinCode"));
    const city = safeParse(getStringFromUnknown, body.get("city"));
    const state = safeParse(getStringFromUnknown, body.get("state"));
    const serviceNumber = safeParse(getStringFromUnknown, body.get("serviceNumber")); //optional field
    const termsAndConditionsChecked = safeParse(getStringFromUnknown, body.get("termsAndConditionsChecked"));
    const utmParameters = safeParse(getStringFromUnknown, body.get("utmParameters"));
    const product = safeParse(getStringFromUnknown, body.get("product"));
    const otpSubmitted = safeParse(getStringFromUnknown, body.get("otpSubmitted"));

    const otpVerificationResult = await verifyOtp(contactNumber, otpSubmitted);

    if (!otpVerificationResult.success) {
        const actionData: ActionData = {
            error: "Please enter valid otp! Error code: bfed12fa-bdd7-4b4d-b4ff-fc779dd7f788",
            isInvalidOtp: true,
        };
        return json(actionData);
    }

    if (
        issueDetails == null ||
        contactNumber == null ||
        emailId == null ||
        name == null ||
        pinCode == null ||
        city == null ||
        state == null ||
        termsAndConditionsChecked == null ||
        utmParameters == null ||
        product == null
    ) {
        const actionData: ActionData = {
            error: "Inputs cannot be null! Error code: af16f518-6eef-4b8c-9ccf-34f86cee43c7",
        };
        return json(actionData);
    }

    const utmParametersDecoded = JSON.parse(utmParameters);

    const leadId = generateUuid();

    const insertResult = await insertServiceRequests(leadId, {
        issueDetails: issueDetails,
        product: product,
        contactNumber: contactNumber,
        emailId: emailId,
        name: name,
        pinCode: pinCode,
        city: city,
        state: state,
        serviceNumber: serviceNumber,
        utmParameters: utmParametersDecoded,
        termsAndConditionsChecked: termsAndConditionsChecked,
    });

    if (insertResult instanceof Error) {
        const actionData: ActionData = {
            error: "Error in submiting form! Error code: 7b84af66-174a-4b89-bbfa-3a51d9aa8862",
        };
        return json(actionData);
    }

    const pageUrl = getUrlFromRequest(request);

    const freshsalesResult = await sendDataToFreshsales(leadId, {mobile_number: contactNumber, first_name: name, email: emailId, city: city, otpVerified: true}, utmParametersDecoded, pageUrl);
    if (freshsalesResult instanceof Error) {
        const actionData: ActionData = {
            error: "Error in submitting form! Error code: 0177ace3-f07e-454a-a27f-f210d67702a9",
        };
        return json(actionData);
    }

    const actionData: ActionData = {
        error: null,
    };

    return json(actionData);
};

export default () => {
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
                    {contentId: "84ec1aea-1f61-4508-ae92-cd3647247ef1", link: "/"},
                    {contentId: "9672b1a1-0713-48e3-98a2-17322eda6ff2", link: "#"},
                ]}
                secondaryNavigationController={secondaryNavigationController}
            >
                <SecondaryNavigationControllerContext.Provider value={secondaryNavigationController}>
                    <ServicesPage
                        userPreferences={userPreferences}
                        actionData={actionData}
                        secondaryNavigationController={secondaryNavigationController}
                    />
                </SecondaryNavigationControllerContext.Provider>
            </PageScaffold>
        </>
    );
};

function ServicesPage({
    userPreferences,
    actionData,
    secondaryNavigationController,
}: {
    userPreferences: UserPreferences;
    actionData: {error: string | null};
    secondaryNavigationController?: SecondaryNavigationController;
}) {
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);

    return (
        <>
            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-x-16 tw-items-start tw-justify-center">
                <HeroSection
                    userPreferences={userPreferences}
                    className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-2 tw-col-start-1 lg:tw-col-span-full" />

                <EffortlessService
                    userPreferences={userPreferences}
                    className="tw-row-start-3 tw-col-start-1 lg:tw-col-span-full tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-4 tw-col-start-1 lg:tw-col-span-full" />

                <ClickConnectPowerUpSection
                    userPreferences={userPreferences}
                    className="tw-row-start-5 lg:tw-col-span-full lg-px-screen-edge-2 tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-6 tw-col-start-1 lg:tw-col-span-full" />

                <RequestAService
                    userPreferences={userPreferences}
                    className="tw-row-start-7 tw-max-w-4xl lg:lg-px-screen-edge-2 tw-mx-auto tw-justify-center lg:tw-col-span-full"
                    actionData={actionData}
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-8 tw-col-start-1 lg:tw-col-span-full" />

                <Testimonials
                    userPreferences={userPreferences}
                    className="lg:lg-px-screen-edge-2 tw-row-start-9 lg:tw-col-span-full tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-10 tw-col-start-1 lg:tw-col-span-full" />

                <WarrantyBanner
                    userPreferences={userPreferences}
                    className="lg:lg-px-screen-edge-2 tw-row-start-11 lg:tw-col-span-full tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-12 tw-col-start-1 lg:tw-col-span-full" />

                {/* TODO: Change row numbers when WarrantyBanner is enabled */}

                <FaqSection
                    userPreferences={userPreferences}
                    className="lg:lg-px-screen-edge-2 tw-row-start-13 lg:tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px] tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-14 tw-col-start-1 lg:tw-col-span-full" />
            </div>
        </>
    );
}

function HeroSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);
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
                "tw-aspect-square lg:tw-aspect-[1280/380] tw-grid tw-grid-rows-[minmax(0,1fr)_auto_5rem_2rem] lg:tw-grid-rows-[minmax(0,1fr)_auto_minmax(0,1fr)] tw-text-center lg:tw-text-left",
                className,
            )}
            id="top"
            ref={sectionRef}
        >
            <div className="tw-row-start-1 tw-col-start-1 tw-row-span-full tw-col-span-full">
                {isScreenSizeBelow == null ? null : (
                    <FullWidthImage
                        relativePath={isScreenSizeBelow ? "/livguard/service/1/mobile-banner.jpg" : "/livguard/service/1/desktop-banner.jpg"}
                        key={isScreenSizeBelow ? "/livguard/service/1/mobile-banner.jpg" : "/livguard/service/1/desktop-banner.jpg"}
                    />
                )}
            </div>
            <DefaultTextAnimation className="tw-row-start-2 tw-col-start-1">
                <div className="lg-text-banner lg-px-screen-edge-2 tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">
                    {getVernacularString("1f489840-705d-44b1-a18a-73a2645594de", userPreferences.language)}
                </div>
            </DefaultTextAnimation>
        </div>
    );
}

function EffortlessService({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "effortless-services": {
                humanReadableName: getVernacularString("20672940-27d8-4e36-a37e-cdabf2bfedb1", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

    function ReadMore({text, className}: {text: string; className?: string}) {
        const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();
        const [isReadMore, setIsReadMore] = useState(false);
        const toggleReadMore = () => {
            setIsReadMore(!isReadMore);
        };
        return (
            <div
                className={className}
                ref={ref}
            >
                {containerHeight !== undefined && containerWidth !== undefined && (containerHeight > containerWidth || containerWidth < 640) ? (
                    <p className="lg-text-body">
                        {!isReadMore && text.length > 135 ? text.slice(0, 135) + "..." : text}&nbsp;
                        <span
                            onClick={toggleReadMore}
                            className="tw-text-primary-500-dark tw-underline"
                        >
                            {text.length > 135 && <>{isReadMore ? "Show Less" : "Read More"}</>}
                        </span>
                    </p>
                ) : (
                    <p className="lg-text-body">{text}</p>
                )}
            </div>
        );
    }

    function ServiceSpecialityCard({iconUrl, title, className}: {iconUrl?: string; title: string; className?: string}) {
        return (
            <>
                <div className={concatenateNonNullStringsWithSpaces("tw-flex tw-flex-col tw-items-center tw-justify-center lg:tw-flex-row tw-px-2", className)}>
                    <div className="tw-rounded-full tw-w-16 tw-h-16 lg-card tw-mb-2 lg:tw-mr-2 lg:tw-mb-0 tw-flex tw-justify-center tw-items-center">
                        <img
                            src={iconUrl}
                            alt=""
                            className="tw-invert dark:tw-invert-0"
                        />
                    </div>
                    <div className="tw-text-center">{title}</div>
                </div>
            </>
        );
    }

    const serviceSpecialities = [
        {
            iconUrl: "https://files.growthjockey.com/livguard/icons/service/pan-india-presence.svg",
            title: getVernacularString("521eb4a5-fa32-4ac8-aa40-b8866848e565", userPreferences.language),
        },
        {
            iconUrl: "https://files.growthjockey.com/livguard/icons/service/service-excellence.svg",
            title: getVernacularString("dce77179-dece-4a32-87e8-571459bccdbb", userPreferences.language),
        },
        {
            iconUrl: "https://files.growthjockey.com/livguard/icons/service/quick-resolution.svg",
            title: getVernacularString("4fc10235-8e85-48c9-9202-916a0bda22db", userPreferences.language),
        },
    ];

    return (
        <>
            <div
                className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-rows-[auto_auto_1rem_auto_1.25rem_auto_minmax(0,1fr)] lg-px-screen-edge-2", className)}
                id="effortless-services"
                ref={sectionRef}
            >
                <div
                    dangerouslySetInnerHTML={{__html: getVernacularString("2cc7bf42-cb40-4316-8429-f65309b51501", userPreferences.language)}}
                    className="tw-row-start-1 lg-text-headline tw-text-center tw-mb-1"
                />

                <div className="tw-row-start-2 lg-text-title2 tw-text-center">{getVernacularString("f4a43cd6-7aea-444f-8f0f-6499ebedb2bf", userPreferences.language)}</div>

                <ReadMore
                    className="tw-row-start-4 tw-text-center"
                    text={getVernacularString("3815727b-e9b3-4e71-a167-1c85c66b9e1d", userPreferences.language)}
                />

                <div className="tw-row-start-6 tw-grid tw-grid-cols-[repeat(3,minmax(0,1fr))] lg:lg-px-screen-edge-2">
                    {serviceSpecialities.map((serviceSpeciality, index) => {
                        return (
                            <ServiceSpecialityCard
                                key={index}
                                title={serviceSpeciality.title}
                                iconUrl={serviceSpeciality.iconUrl}
                                className={index !== serviceSpecialities.length - 1 ? "lg:tw-border-r-2 lg:tw-border-secondary-300-dark" : ""}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
}

function RequestAService({userPreferences, className, actionData}: {userPreferences: UserPreferences; className?: string; actionData: ActionData}) {
    const utmSearchParameters = useUtmSearchParameters();

    const [isServiceRequestFormSubmitted, setIsServiceRequestFormSubmitted] = useState(false);
    const [isServiceRequestFormTermsAndConditionsChecked, setIsServiceRequestFormTermsAndConditionsChecked] = useState(true);
    const [serviceRequestFormSelectedProduct, setServiceRequestFormSelectedProduct] = useState<null | number>(null);

    const productItems = getFormSelectProductItems(userPreferences.language);

    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "request-a-service": {
                humanReadableName: getVernacularString("91a2a7a5-561e-4fd7-bb9f-76969e89b296", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

    useEffect(() => {
        if (actionData != null) {
            if (actionData.error != null) {
                if (actionData.isInvalidOtp) {
                    toast.error("Please enter valid OTP. Error code: 7729ab93-6723-468b-9510-705891533cce");
                    setInvalidOtp(true);
                    return;
                }
                setInvalidOtp(false);
                toast.error("ERROR in submitting form");
                return;
            }

            setIsServiceRequestFormSubmitted(true);
        }
    }, [actionData]);

    const [showOtpField, setShowOtpField] = useState(false);
    const [showOtpButton, setShowOtpButton] = useState(false);
    const [resendTimeOut, setResendTimeOut] = useState(0);
    const [invalidOtp, setInvalidOtp] = useState(false);
    const [isOtpResent, setIsOtpResent] = useState(false);
    const phoneNumberRef = useRef<HTMLInputElement | null>(null);
    const otpFieldRef = useRef<HTMLInputElement | null>(null);

    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

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
                setResendTimeOut((prev) => prev - 1);
            }, 1000);
            setTimeoutId(timeout);
        }
    }, [resendTimeOut]);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-flow-row tw-justify-center lg:tw-justify-left tw-w-full", className)}
            id="request-a-service"
            ref={sectionRef}
        >
            <div className="tw-row-start-1 lg-text-headline tw-text-center tw-w-full">
                <div dangerouslySetInnerHTML={{__html: appendSpaceToString(getVernacularString("58490cb1-5f27-4f67-98d3-939b5a3b9b10", userPreferences.language))}} />
            </div>

            <VerticalSpacer className="tw-h-4 tw-row-start-2" />

            <div className="tw-row-start-4 tw-col-span-full lg-px-screen-edge-2 lg:tw-px-0 tw-w-full">
                <div className="tw-overflow-hidden tw-h-full tw-w-full">
                    <div className="tw-grid tw-grid-flow-col tw-auto-cols-[100%] tw-items-stretch tw-h-full tw-w-full">
                        <div className="tw-grid tw-grid-glow-rows tw-h-full">
                            {!isServiceRequestFormSubmitted ? (
                                <Form
                                    method="post"
                                    className="tw-grid tw-grid-flow-row tw-gap-x-4 tw-w-full"
                                >
                                    <div className="tw-grid tw-grid-flow-col tw-gap-2">
                                        <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">{getVernacularString("1cc00f3b-4b94-4e16-bc4f-a0337877d25e", userPreferences.language)}</div>

                                        <textarea
                                            name="issueDetails"
                                            className="lg-text-input !tw-rounded-lg tw-row-start-2"
                                            placeholder={getVernacularString("2f725e91-eb31-4d56-898a-87db94a21e48", userPreferences.language)}
                                            rows={3}
                                            required
                                        />
                                    </div>

                                    <VerticalSpacer className="tw-h-4 lg:tw-col-span-full" />

                                    <div className="tw-grid lg:tw-grid-cols-2 tw-gap-4">
                                        <div className="lg:tw-col-start-1 tw-grid tw-grid-flow-row tw-gap-2">
                                            <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">
                                                {getVernacularString("43e7ced0-33d1-46a2-ab06-4e50dae64256", userPreferences.language)}
                                            </div>

                                            <div className="tw-row-start-2">
                                                <FormSelectComponent
                                                    items={productItems}
                                                    itemBuilder={(item) =>
                                                        item == null ? getVernacularString("48aa62c2-244f-45ac-9750-56016d86d5b9", userPreferences.language) : `<div>${item}</div>`
                                                    }
                                                    value={serviceRequestFormSelectedProduct == null ? null : productItems[serviceRequestFormSelectedProduct]}
                                                    setValue={(item) => (item != null ? setServiceRequestFormSelectedProduct(productItems.indexOf(item)) : setServiceRequestFormSelectedProduct(null))}
                                                    buttonClassName="!tw-rounded-full"
                                                />
                                            </div>
                                        </div>

                                        <div className="lg:tw-col-start-2 tw-grid tw-grid-flow-row tw-gap-2">
                                            <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">
                                                {getVernacularString("7de002e7-afeb-40d5-8bf5-6f2cd2be88ea", userPreferences.language)}
                                            </div>

                                            <input
                                                type="text"
                                                name="emailId"
                                                className="lg-text-input"
                                                pattern={emailIdValidationPattern}
                                                placeholder={getVernacularString("01fce108-4fe0-40c2-bb3a-3fb980fcec72", userPreferences.language)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <VerticalSpacer className="tw-h-4 lg:tw-col-span-full" />

                                    <div className="tw-grid lg:tw-grid-cols-2 tw-gap-4">
                                        <div className="lg:tw-col-start-1 tw-grid tw-grid-flow-row tw-gap-2">
                                            <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">
                                                {getVernacularString("6a37e3ee-a8a6-4999-9494-80465aaad48d", userPreferences.language)}
                                            </div>

                                            <input
                                                type="text"
                                                name="name"
                                                value={name}
                                                onChange={(e) => {
                                                    setName(e.target.value);
                                                }}
                                                className="lg-text-input"
                                                placeholder={getVernacularString("a0d68490-ad84-47fb-863c-2a9c812feaec", userPreferences.language)}
                                                required
                                            />
                                        </div>

                                        <div className="lg:tw-col-start-2 tw-grid tw-grid-flow-row tw-gap-2">
                                            {/* <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">
                                                {getVernacularString("17cfa283-6fcc-4a49-9dfe-a392e0310b27", userPreferences.language)}
                                            </div>

                                            <input
                                                type="text"
                                                name="contactNumber"
                                                className="lg-text-input"
                                                pattern={indianPhoneNumberValidationPattern}
                                                placeholder={getVernacularString("1e90dca7-b78f-4231-b2df-644a3b0322d1", userPreferences.language)}
                                                required
                                            /> */}
                                            <div className="tw-grid lg:tw-col-start-1 tw-grid-flow-row tw-gap-2">
                                                {!showOtpField ? (
                                                    <div className="lg-text-secondary-900">{getVernacularString("17cfa283-6fcc-4a49-9dfe-a392e0310b27", userPreferences.language)}</div>
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
                                                        <div className="tw-col-start-3 lg-text-secondary-900 lg-text-body-bold">{phoneNumber}</div>
                                                    </div>
                                                )}

                                                {!showOtpField ? (
                                                    <div className="tw-relative tw-w-full tw-items-center tw-grid">
                                                        <input
                                                            type="text"
                                                            name="phoneNumber"
                                                            pattern={indianPhoneNumberValidationPattern}
                                                            placeholder={getVernacularString("1e90dca7-b78f-4231-b2df-644a3b0322d1", userPreferences.language)}
                                                            required
                                                            className="lg-text-input tw-w-full"
                                                            disabled={showOtpField}
                                                            defaultValue={phoneNumber}
                                                            ref={phoneNumberRef}
                                                            onChange={(e) => {
                                                                setPhoneNumber(e.target.value);
                                                                if (e.target.value.length == 10) {
                                                                    setShowOtpButton(true);
                                                                } else {
                                                                    setShowOtpButton(false);
                                                                }
                                                            }}
                                                            onBlur={(e) => {
                                                                if (phoneNumber.length == 10) {
                                                                    setShowOtpButton(true);
                                                                }
                                                            }}
                                                            onFocus={(e) => {
                                                                if (phoneNumber.length == 10) {
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
                                                                if (name.length === 0) {
                                                                    toast.error("Name cannot be null! Error code: 3b08d311-0e27-477e-b2dc-38eb172db2f7");
                                                                    return;
                                                                }
                                                                setShowOtpButton(false);
                                                                setShowOtpField(true);
                                                                setResendTimeOut(60);

                                                                if (otpFieldRef.current != null) {
                                                                    otpFieldRef.current.focus();
                                                                }
                                                                const data = new FormData();
                                                                data.append("phoneNumber", phoneNumber);
                                                                data.append("name", name);
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
                                        </div>
                                    </div>

                                    <div className="tw-grid lg:tw-grid-cols-2">
                                        <div
                                            className={concatenateNonNullStringsWithSpaces(
                                                "tw-w-full tw-px-3 lg:tw-col-start-2",
                                                showOtpField ? "tw-flex tw-flex-row tw-justify-between tw-opacity-100 tw-duration-100 tw-z-10" : "tw-hidden tw-opacity-0 -tw-z-100",
                                            )}
                                        >
                                            <div
                                                className={concatenateNonNullStringsWithSpaces(
                                                    "lg-text-secondary-700 tw-text-[12px]",
                                                    `${resendTimeOut > 0 ? "undefined" : "hover:tw-cursor-pointer"}`,
                                                )}
                                                onClick={() => {
                                                    setIsOtpResent(true);
                                                    setResendTimeOut(60);

                                                    const data = new FormData();
                                                    data.append("phoneNumber", phoneNumber);
                                                    data.append("name", name);
                                                    otpFetcher.submit(data, {method: "post", action: "/resend-otp"});
                                                }}
                                            >
                                                {getVernacularString("OfferResendOTP", userPreferences.language)}
                                            </div>
                                            <div className="lg-text-secondary-700 tw-text-[12px]">{`00:${resendTimeOut}`}</div>
                                        </div>
                                    </div>

                                    <VerticalSpacer className="tw-h-4 lg:tw-col-span-full" />

                                    <div className="tw-grid lg:tw-grid-cols-2 tw-gap-4 tw-items-start">
                                        <div className="lg:tw-col-start-1 tw-grid tw-grid-flow-row tw-gap-2">
                                            <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">
                                                {getVernacularString("31241b10-2784-43df-a2ea-a614c9ef7468", userPreferences.language)}
                                            </div>

                                            <input
                                                type="text"
                                                name="pinCode"
                                                pattern={pinCodeValidationPattern}
                                                className="lg-text-input"
                                                placeholder={getVernacularString("848eb522-5221-4035-ac77-94338e97ac9c", userPreferences.language)}
                                                required
                                            />
                                        </div>

                                        <div className="lg:tw-col-start-2 tw-grid tw-grid-flow-row tw-gap-2">
                                            <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">
                                                {getVernacularString("a1a00432-ed7a-4e11-9e9b-4cc783a6776a", userPreferences.language)}
                                            </div>

                                            <input
                                                type="text"
                                                name="city"
                                                className="lg-text-input"
                                                placeholder={getVernacularString("c5702705-3fa4-4f7d-a706-4e22ea024aac", userPreferences.language)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <VerticalSpacer className="tw-h-4 lg:tw-col-span-full" />

                                    <div className="tw-grid lg:tw-grid-cols-2 tw-gap-4 tw-items-start">
                                        <div className="lg:tw-col-start-1 tw-grid tw-grid-flow-row tw-gap-2">
                                            <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">
                                                {getVernacularString("d8a55222-554d-48c5-a638-118f37baf66b", userPreferences.language)}
                                            </div>

                                            <input
                                                type="text"
                                                name="state"
                                                className="lg-text-input"
                                                placeholder={getVernacularString("981952eb-5f5c-4b14-b4e8-f1b766851c64", userPreferences.language)}
                                                required
                                            />
                                        </div>

                                        <div className="lg:tw-col-start-2 tw-grid tw-grid-flow-row tw-gap-2">
                                            <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">
                                                {getVernacularString("5d393e57-cef0-497c-b9c6-87e469e34fe8", userPreferences.language)}
                                            </div>

                                            <input
                                                type="text"
                                                name="serviceNumber"
                                                className="lg-text-input"
                                                placeholder={getVernacularString("54ff368f-0a01-443e-b940-9a9240cbe783", userPreferences.language)}
                                            />
                                        </div>
                                    </div>

                                    <VerticalSpacer className="tw-h-4 lg:tw-col-span-full" />

                                    <div className="tw-grid tw-grid-flow-col tw-gap-4 tw-items-start tw-my-3 lg:tw-mt-0 lg:tw-mb-3">
                                        <input
                                            type="checkbox"
                                            name="termsAndConditionsChecked"
                                            style={{accentColor: `${isServiceRequestFormTermsAndConditionsChecked ? "#eb2a2b" : "white"}`}}
                                            defaultChecked={isServiceRequestFormTermsAndConditionsChecked}
                                            required
                                            onChange={(e) => {
                                                setIsServiceRequestFormTermsAndConditionsChecked(!isServiceRequestFormTermsAndConditionsChecked);
                                            }}
                                        />

                                        <div dangerouslySetInnerHTML={{__html: getVernacularString("contactUsTermsAndConditionsCheckboxtext", userPreferences.language)}} />
                                    </div>

                                    <VerticalSpacer className="tw-h-4 lg:tw-col-span-full" />

                                    <input
                                        name="utmParameters"
                                        className="tw-hidden"
                                        readOnly
                                        value={JSON.stringify(utmSearchParameters)}
                                    />
                                    <input
                                        readOnly
                                        name="termsAndConditionsChecked"
                                        className="tw-hidden"
                                        value={isServiceRequestFormTermsAndConditionsChecked ? "True" : "False"}
                                    />
                                    <input
                                        readOnly
                                        name="product"
                                        className="tw-hidden"
                                        value={serviceRequestFormSelectedProduct == null ? "" : productItems[serviceRequestFormSelectedProduct]}
                                    />

                                    <HiddenFormField
                                        name="contactNumber"
                                        value={phoneNumber}
                                    />

                                    <button
                                        type="submit"
                                        className="tw-self-stretch lg-text-body tw-px-10 tw-py-4 lg-cta-button !tw-text-secondary-900-dark tw-place-self-stretch lg:tw-place-self-center"
                                        disabled={serviceRequestFormSelectedProduct == null || otpFetcher.data == null || !otpSubmitted}
                                    >
                                        {getVernacularString("0bc7a8cd-72d0-4f85-ab9d-39abdb269e6a", userPreferences.language)}
                                    </button>
                                </Form>
                            ) : (
                                <div className="tw-grid tw-grid-rows-[4.5rem_auto_2rem_auto_2rem_auto_minmax(0,1fr)_4.5rem] tw-w-full tw-h-full tw-rounded-lg tw-border lg-border-secondary-700 tw-justify-center tw-px-16 tw-w-full">
                                    <div className="tw-row-start-2 tw-w-full tw-grid tw-justify-center">
                                        <FixedWidthImage
                                            relativePath="/livguard/icons/confirmation.png"
                                            width="10rem"
                                        />
                                    </div>

                                    <div
                                        dangerouslySetInnerHTML={{__html: getVernacularString("6d0f2700-ee1b-4215-b60c-f920ba0d0a2b", userPreferences.language)}}
                                        className="lg-text-banner tw-row-start-4 tw-text-center"
                                    />

                                    <div
                                        dangerouslySetInnerHTML={{__html: getVernacularString("d0b96a23-94c3-45c9-af3e-0722264c7ed5", userPreferences.language)}}
                                        className="lg-text-body tw-row-start-6 tw-text-center"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ClickConnectPowerUpSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const [isContactUsDialogOpen, setIsContactUsDialogOpen] = useState(false);
    const [dialogOptions, setDialogOptions] = useState<{dialogType: string; headerTextContentId: string}>({dialogType: "", headerTextContentId: "call-us"});
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            connect: {
                humanReadableName: getVernacularString("d0a88af5-fba8-43cd-bda5-813e7363db53", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

    function CallUsCard() {
        return (
            <div className="tw-row-start-5 lg:tw-row-start-1 lg:tw-w-full lg:tw-col-start-1 lg-card tw-grid tw-grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] tw-items-center tw-p-4">
                <div className="tw-row-start-1 tw-col-start-2 lg:tw-col-start-1 lg:tw-col-span-full lg-card tw-rounded-full tw-h-16 tw-w-16 lg:tw-h-20 lg:tw-w-20 tw-grid tw-items-center tw-justify-center tw-place-self-center">
                    <img
                        className={"tw-w-8 tw-h-8 lg:tw-w-10 lg:tw-h-10 tw-invert dark:tw-invert-0"}
                        src="https://files.growthjockey.com/livguard/icons/service/call-us.svg"
                    />
                </div>

                <VerticalSpacer className="tw-h-4 tw-row-start-2" />

                <div className="tw-h-full tw-row-start-3 tw-col-start-2 lg:tw-col-start-1 lg:tw-col-span-full tw-grid tw-grid-flow-row tw-gap-4">
                    <div className="lg-text-body tw-row-start-1 tw-place-self-center lg:tw-place-self-start lg:tw-text-center">
                        {getVernacularString("contactUsS2Option1Text", userPreferences.language)}
                    </div>

                    <button
                        className="lg-cta-button tw-w-full !tw-px-6 tw-justify-self-center tw-self-end tw-row-start-2"
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
            <div className="tw-row-start-7 lg:tw-row-start-1 lg:tw-col-start-2 lg-card tw-grid tw-grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] tw-items-center tw-p-4">
                <div className="tw-row-start-1 tw-col-start-2 lg:tw-col-start-1 lg:tw-col-span-full lg-card tw-rounded-full tw-h-16 tw-w-16 lg:tw-h-20 lg:tw-w-20 tw-grid tw-items-center tw-justify-center tw-place-self-center">
                    <img
                        className="tw-w-8 tw-h-8 lg:tw-w-10 lg:tw-h-10 tw-invert dark:tw-invert-0"
                        src="https://files.growthjockey.com/livguard/icons/service/whatsapp-us.svg"
                    />
                </div>

                <VerticalSpacer className="tw-h-4 tw-row-start-2" />

                <div className="tw-h-full tw-row-start-3 tw-col-start-2 lg:tw-col-start-1 lg:tw-col-span-full tw-grid tw-grid-flow-row tw-gap-4">
                    <div className="lg-text-body tw-row-start-1 lg:tw-text-center">{getVernacularString("contactUsS2Option2Text", userPreferences.language)}</div>

                    <button
                        className="lg-cta-button tw-w-full !tw-px-6 tw-place-self-center tw-self-end tw-row-start-2"
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
            <div className="tw-row-start-[9] lg:tw-row-start-1 lg:tw-col-start-3 lg-card tw-grid tw-grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] tw-items-center tw-p-4">
                <div className="tw-row-start-1 tw-col-start-2 lg:tw-col-start-1 lg:tw-col-span-full lg-card tw-rounded-full tw-h-16 tw-w-16 lg:tw-h-20 lg:tw-w-20 tw-grid tw-items-center tw-justify-center tw-place-self-center">
                    <img
                        className="tw-w-8 tw-h-8 lg:tw-w-10 lg:tw-h-10 tw-invert dark:tw-invert-0"
                        src="https://files.growthjockey.com/livguard/icons/service/email-us.svg"
                    />
                </div>

                <VerticalSpacer className="tw-h-4 tw-row-start-2" />

                <div className="tw-h-full tw-row-start-3 tw-col-start-2 lg:tw-col-start-1 lg:tw-col-span-full tw-grid tw-grid-flow-row tw-gap-4">
                    <div className="lg-text-body tw-row-start-1 lg:tw-text-center">{getVernacularString("contactUsS2Option3Text", userPreferences.language)}</div>

                    <button
                        className="lg-cta-button tw-w-full !tw-px-6 tw-justify-self-center tw-self-end tw-row-start-2"
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

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-flow-row", className)}
            id="connect"
            ref={sectionRef}
        >
            <DefaultTextAnimation className="tw-row-start-1 lg-text-headline tw-text-center">
                <div dangerouslySetInnerHTML={{__html: appendSpaceToString(getVernacularString("3ed955c3-a090-4862-9132-e08af40bc379", userPreferences.language))}} />
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-2 lg:tw-h-4 tw-row-start-2" />

            <div className="lg:tw-grid lg:tw-grid-rows-[minmax(0,1fr)_auto_1rem_auto_minmax(0,1fr)] lg:tw-grid-cols-[minmax(0,7fr)_minmax(0,3fr)]  lg:tw-rounded-lg lg:tw-py-6">
                <DefaultTextAnimation className="tw-row-start-3 lg:tw-row-start-2 lg:tw-col-start-2 lg-text-headline tw-text-center lg:tw-text-left lg:tw-place-self-center lg:tw-px-16">
                    <div className="lg-text-body lg:tw-text-center">{getVernacularString("contactUsS2HText", userPreferences.language)}</div>
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-2 lg:tw-h-6 tw-row-start-4 lg:tw-hidden" />

                <div className="lg:tw-row-span-full lg:tw-col-start-1 lg:tw-border-r-2 lg:tw-border-[#B1B1B1] lg:tw-grid lg:tw-auto-cols-[minmax(0,1fr)] lg:tw-gap-x-12 lg:tw-py-5 lg:tw-px-12">
                    <CallUsCard />

                    <VerticalSpacer className="tw-h-2 lg:tw-h-6 tw-row-start-6 lg:tw-hidden" />

                    <WhatsappUsCard />

                    <VerticalSpacer className="tw-h-2 lg:tw-h-6 tw-row-start-[8] lg:tw-hidden" />

                    <EmailUsCard />
                </div>

                <VerticalSpacer className="tw-h-2 lg:tw-h-6 tw-row-start-3 lg:tw-hidden" />

                <div className="lg:tw-row-start-4 lg:tw-col-start-2 tw-w-full tw-max-w-[10rem] lg:tw-max-w-[unset] tw-mx-auto tw-grid tw-grid-cols-1 lg:tw-grid-cols-[4rem_8rem] tw-justify-center lg:tw-items-center tw-gap-x-4 tw-gap-y-4">
                    <FullWidthImage relativePath={`/livguard/service/3/1-${userPreferences.theme == Theme.Light ? "light" : "dark"}.png`} />

                    <a href="https://play.google.com/store/apps/details?id=com.sar.mylivserv">
                        <FullWidthImage relativePath={`/livguard/service/3/2-${userPreferences.theme == Theme.Light ? "light" : "dark"}.png`} />
                    </a>
                </div>
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
                                to={dialogType == "call-us" ? "tel:1800-1025-551" : dialogType == "email-us" ? "mailto:livserv@sar-group.com" : "https://wa.me/7428191000"}
                                className="tw-w-full lg-bg-primary-500 tw-text-secondary-900-dark tw-py-3 tw-px-4 tw-rounded-full"
                            >
                                <div className="tw-flex tw-flex-row tw-items-center">
                                    <div className="tw-flex-1">{dialogType == "call-us" ? "1800-1025-551" : dialogType == "email-us" ? "livserv@sar-group.com" : "7428191000"}</div>

                                    {dialogType == "call-us" && (
                                        <img
                                            className="tw-w-6 tw-h-6 tw-flex-0"
                                            src="https://files.growthjockey.com/livguard/icons/service/call-us-dialog.svg"
                                        />
                                    )}

                                    {dialogType == "email-us" && (
                                        <img
                                            className="tw-w-6 tw-h-6 tw-flex-0"
                                            src="https://files.growthjockey.com/livguard/icons/service/email-us-dialog.svg"
                                        />
                                    )}

                                    {dialogType == "chat-with-us" && (
                                        <img
                                            className="tw-w-6 tw-h-6 tw-flex-0"
                                            src="https://files.growthjockey.com/livguard/icons/service/whatsapp-us-dialog.svg"
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
                                        to={dialogType == "call-us" ? "tel:+919205667999" : dialogType == "email-us" ? "marketing@livguard.com" : "https://wa.me/9205667999"}
                                        className="tw-w-full lg-bg-primary-500 tw-text-secondary-900-dark tw-py-3 tw-px-4 tw-rounded-full"
                                    >
                                        <div className="tw-flex tw-flex-row tw-items-center">
                                            <div className="tw-flex-1">{dialogType == "call-us" ? "+91 92056-67999" : dialogType == "email-us" ? "marketing@livguard.com" : "+91 92056-67999"}</div>

                                            {dialogType == "call-us" && (
                                                <img
                                                    className="tw-w-6 tw-h-6 tw-flex-0"
                                                    src="https://files.growthjockey.com/livguard/icons/service/call-us-dialog.svg"
                                                />
                                            )}

                                            {dialogType == "email-us" && (
                                                <img
                                                    className="tw-w-6 tw-h-6 tw-flex-0"
                                                    src="https://files.growthjockey.com/livguard/icons/service/email-us-dialog.svg"
                                                />
                                            )}

                                            {dialogType == "chat-with-us" && (
                                                <img
                                                    className="tw-w-6 tw-h-6 tw-flex-0"
                                                    src="https://files.growthjockey.com/livguard/icons/service/whatsapp-us-dialog.svg"
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

function Testimonials({userPreferences, className}: {userPreferences: UserPreferences; className: string}) {
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            testimonials: {
                humanReadableName: getVernacularString("4dfaa3c8-918c-46d3-a2a7-865f2ac6a9b7", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    return (
        <>
            <div
                className={className}
                id="testimonials"
                ref={sectionRef}
            >
                <DefaultTextAnimation className="tw-flex tw-flex-col tw-items-center lg-text-headline lg-px-screen-edge-2 lg:tw-pl-0 lg:tw-pr-0 tw-text-center lg:tw-text-left">
                    <div>{getVernacularString("74058229-5e75-4efe-833c-18009f248c6a", userPreferences.language)}</div>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("afe86242-a8aa-4955-8951-516c560fc956", userPreferences.language)}} />
                </DefaultTextAnimation>

                <VerticalSpacer className="tw-h-4 lg:tw-h-4" />

                <TestimonialsCarousel
                    userPreferences={userPreferences}
                    testimonials={[
                        {
                            video: (
                                <EmbeddedYoutubeVideo
                                    id="rVC-ncTBhls"
                                    style={{aspectRatio: "560/315"}}
                                    className="tw-rounded-lg"
                                />
                            ),
                            name: `${getVernacularString("review1Name", userPreferences.language)}`,
                            rating: 5,
                            state: `${getVernacularString("review1State", userPreferences.language)}`,
                            message: `${getVernacularString("review1Message", userPreferences.language)}`,
                            productImage: "/livguard/products/peace-of-mind-combo/thumbnail.png",
                            // productName: `${getVernacularString("review1ProductName", userPreferences.language)}`,
                        },
                        // {
                        //     video: (
                        //         <EmbeddedYoutubeVideo
                        //             id="pNMTMVDWtiU"
                        //             style={{aspectRatio: "560/315"}}
                        //         />
                        //     ),
                        //     name: `${getVernacularString("review2Name", userPreferences.language)}`,
                        //     rating: 5,
                        //     state: `${getVernacularString("review2State", userPreferences.language)}`,
                        //     message: `${getVernacularString("review2Message", userPreferences.language)}`,
                        //     productImage: "/livguard/products/urban-combo/thumbnail.png",
                        //     productName: `${getVernacularString("review2ProductName", userPreferences.language)}`,
                        // },
                        {
                            name: `${getVernacularString("review3Name", userPreferences.language)}`,
                            rating: 5,
                            state: `${getVernacularString("review3State", userPreferences.language)}`,
                            message: `${getVernacularString("review3Message", userPreferences.language)}`,
                            productImage: "/livguard/products/lgs1100i/thumbnail.png",
                            // productName: `${getVernacularString("review3ProductName", userPreferences.language)}`,
                        },
                        {
                            name: `${getVernacularString("review4Name", userPreferences.language)}`,
                            rating: 4,
                            state: `${getVernacularString("review4State", userPreferences.language)}`,
                            message: `${getVernacularString("review4Message", userPreferences.language)}`,
                            productImage: "/livguard/products/urban-combo/thumbnail.png",
                            // productName: `${getVernacularString("review4ProductName", userPreferences.language)}`,
                        },
                    ]}
                />
            </div>
        </>
    );
}

function WarrantyBanner({userPreferences, className}: {userPreferences: UserPreferences; className: string}) {
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            warranty: {
                humanReadableName: getVernacularString("872214aa-3d2c-4a10-935b-257b5dbde56f", userPreferences.language),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-aspect-square lg:tw-aspect-[1280/380] tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_auto_1rem_auto_2.5rem] lg:tw-grid-rows-[minmax(0,1fr)_auto_auto_1.25rem_auto_minmax(0,1fr)] tw-text-center lg:tw-text-left lg:tw-grid-cols-[minmax(0,1fr)_minmax(0,1fr)]",
                className,
            )}
            id="warranty"
            ref={sectionRef}
        >
            <div className="tw-row-start-1 tw-col-start-1 tw-row-span-full tw-col-span-full ">
                {isScreenSizeBelow == null ? null : (
                    <FullWidthImage
                        relativePath={isScreenSizeBelow ? "/livguard/service/6/warranty-mobile-banner.jpg" : "/livguard/service/6/warranty-desktop-banner.jpg"}
                        className="lg:tw-rounded-lg"
                        key={isScreenSizeBelow ? "/livguard/service/6/warranty-mobile-banner.jpg" : "/livguard/service/6/warranty-desktop-banner.jpg"}
                    />
                )}
            </div>

            <DefaultTextAnimation className="tw-row-start-3 lg:tw-row-start-2 tw-col-start-1">
                <div className="lg-text-banner lg-px-screen-edge-2 tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start tw-text-center">
                    {getVernacularString("aec063e5-c0a7-4ec7-8d66-8c2a92b61b5d", userPreferences.language)}
                </div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-4 lg:tw-row-start-3 tw-col-start-1">
                <div className="lg-text-title1 lg-px-screen-edge-2 tw-text-secondary-900-dark !tw-font-normal tw-text-center">
                    {getVernacularString("cbe9f24f-08f3-4448-aeb5-556dc08fd017", userPreferences.language)}
                </div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-flex tw-justify-center tw-row-start-6 lg:tw-row-start-5 tw-col-start-1 lg-px-screen-edge-2 tw-z-10">
                <Link to="/warranty">
                    <button className="lg-text-body tw-px-16 tw-py-4 lg-cta-button tw-max-w-fit !tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-center tw-text-center">
                        {getVernacularString("d1030527-97b8-4772-9810-e98c5c0b30c3", userPreferences.language)}
                    </button>
                </Link>
            </DefaultTextAnimation>
        </div>
    );
}

function FaqSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const faqs = [
        {
            question: "5269b845-bdc3-4fd9-ab53-e095b44a5352",
            answer: "08e6c940-69e6-4f33-b3f8-6966c67b3a3c",
        },
        {
            question: "39a32866-2d52-4cbb-80cf-43cc0a991304",
            answer: "4536af23-ca20-4466-8be7-5ff576707344",
        },
        {
            question: "5816ad28-9bb2-42c3-8c82-e70a3f4e6f6c",
            answer: "cb66e8d5-12ac-4de1-b33d-feaa972bc919",
        },
        {
            question: "05424c86-424b-477a-9701-a55a7e04f02c",
            answer: "e00b0eba-3686-4dd5-bb24-f28b0e0aa159",
        },
        {
            question: "b2d4555f-0f65-464c-b02e-b9c4a9893cc2",
            answer: "db94ebb0-3c50-4cc4-9a4c-75548b10b158",
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
