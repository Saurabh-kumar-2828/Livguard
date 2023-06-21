import {Dialog, Transition} from "@headlessui/react";
import {ActionFunction, LinksFunction, MetaFunction, LoaderFunction, json} from "@remix-run/node";
import {Form, Link, useActionData} from "@remix-run/react";
import React, {useEffect} from "react";
import {useState} from "react";
import {Envelope, StarFill, Telephone, Whatsapp, X} from "react-bootstrap-icons";
import {useResizeDetector} from "react-resize-detector";
import {useLoaderData} from "react-router";
import {toast} from "react-toastify";
import {insertContactFormLeads} from "~/backend/dealer.server";
import {ContactFormSuccess} from "~/components/contactUsFormSuccess";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {SocialMediaIcons} from "~/components/footerComponent";
import {CoverImage} from "~/components/images/coverImage";
import {FixedWidthImage} from "~/components/images/fixedWidthImage";
import {PageScaffold} from "~/components/pageScaffold";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {getStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {concatenateNonNullStringsWithSpaces, generateUuid} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {emailIdValidationPattern, indianPhoneNumberValidationPattern} from "~/global-common-typescript/utilities/validationPatterns";
import {useEmlbaCarouselWithIndex} from "~/hooks/useEmlbaCarouselWithIndex";
import {FormSelectComponent} from "~/livguard-common-typescript/scratchpad";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {UserPreferences} from "~/typeDefinitions";
import {Language} from "~/typeDefinitions";
import {appendSpaceToString, getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";

export const meta: MetaFunction = ({data}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = data.userPreferences;
    if (userPreferences.language == Language.English) {
        return {
            title: "Get in Touch with Livguard: Contact Us Today",
            description: "Get in touch with Livguard's customer care. Call our toll-free number for support and solutions. Contact us today!",
            "og:title": "Get in Touch with Livguard: Contact Us Today",
            "og:site_name": "Livguard",
            "og:url": "https://www.livguard.com/contact-us",
            "og:description": "Get in touch with Livguard's customer care. Call our toll-free number for support and solutions. Contact us today!",
            "og:type": "website",
            "og:image": "",
        };
    } else if (userPreferences.language == Language.Hindi) {
        return {
            title: "लिवगार्ड से संपर्क करें: आज ही हमसे संपर्क करें",
            description: "?????",
        };
    } else {
        throw Error(`Undefined language ${userPreferences.language}`);
    }
};

export const links: LinksFunction = () => {
    return [{rel: "canonical", href: "https://www.livguard.com/contact-us/"}];
};

export type ActionData = {
    error: string | null;
    formType: string | null;
};

export const action: ActionFunction = async ({request, params}) => {
    const body = await request.formData();

    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~ inside action data ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

    const name = safeParse(getStringFromUnknown, body.get("name"));
    const emailId = safeParse(getStringFromUnknown, body.get("emailId"));
    const utmParameters = safeParse(getStringFromUnknown, body.get("utmParameters"));
    const formType = safeParse(getStringFromUnknown, body.get("formType"));
    const termsAndConditionsChecked = safeParse(getStringFromUnknown, body.get("termsAndConditionsChecked"));
    const details = safeParse(getStringFromUnknown, body.get("queryDetails"));
    let phoneNumber: string | null = "";
    let product: string | null = "";
    let rating: string | null = "";
    let complaintType: string | null = "";

    if (formType == "complaintForm") {
        phoneNumber = safeParse(getStringFromUnknown, body.get("phoneNumber"));
        complaintType = safeParse(getStringFromUnknown, body.get("complaintOption"));
    }

    if (formType == "feedbackForm") {
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
        console.log("ABCDDDDDDDDD");
        const actionData: ActionData = {
            error: "Inputs cann't be null! Error code: 2dc8402e-24b3-4a7e-9024-64cc9ba14ad4",
            formType: null,
        };
        return json(actionData);
    }

    const utmParametersDecoded = JSON.parse(utmParameters);

    if (formType == "feedbackForm") {
        const insertResult = await insertContactFormLeads(generateUuid(), {
            name: name,
            emailId: emailId,
            product: product,
            rating: rating,
            detials: details,
            formType: formType,
            utmParameters: utmParametersDecoded,
            termsAndConditionsChecked: termsAndConditionsChecked,
        });
        if (insertResult instanceof Error) {
            const actionData: ActionData = {
                error: "Error in submitting form! Error code: 48584397-7140-40fa-93e2-4804fc63ca40",
                formType: formType,
            };
            return json(actionData);
        }
    } else {
        const insertResult = await insertContactFormLeads(generateUuid(), {
            name: name,
            emailId: emailId,
            phoneNumber: phoneNumber,
            complaintType: complaintType,
            detials: details,
            formType: formType,
            utmParameters: utmParametersDecoded,
            termsAndConditionsChecked: termsAndConditionsChecked,
        });
        if (insertResult instanceof Error) {
            const actionData: ActionData = {
                error: "Error in submitting form! Error code: a6f5b2c8-c0a9-41e2-a093-268158313671",
                formType: formType,
            };
            return json(actionData);
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

    return (
        <>
            <PageScaffold
                userPreferences={userPreferences}
                redirectTo={redirectTo}
                showMobileMenuIcon={true}
                utmParameters={utmSearchParameters}
                breadcrumbs={[
                    {contentId: "cfab263f-0175-43fb-91e5-fccc64209d36", link: "/"},
                    {contentId: "09b8631b-98e0-4ae8-bafb-65bb57001872", link: "#"},
                ]}
            >
                <ContactPage
                    userPreferences={userPreferences}
                    utmParameters={utmSearchParameters}
                    actionData={actionData}
                />
            </PageScaffold>

            {
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: `
                        {
                            "@type": "SiteNavigationElement",
                            "name": "Contact us",
                            "url": "https://www.livguard.com/contact-us",
                            "telephone": "+919205667999",
                            "contactType": "",
                            "streetAddress": "SAR Group Plot No. 221, Udyog Vihar Phase 1, Sector 20",
                            "addressLocality": "Gurugram",
                            "addressRegion": "Haryana",
                            "postalCode": "122016",
                            "addressCountry": "India",
                            "E-mail": "marketing@livguard.com, export@sar-group.com"
                          }
                        `,
                    }}
                ></script>
            }

            {/* <ProductAndCategoryBottomBar
                userPreferences={userPreferences}
                utmParameters={utmSearchParameters}
                pageUrl={pageUrl}
            /> */}

            {/* <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: `
                        {
                            "@context": "https://schema.org",
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                {
                                    "@type": "ListItem",
                                    "position": 1,
                                    "name": "LivGuard",
                                    "item": "https://www.livguard.com/",
                                    "description": " We Are One of A Kind With Livguard, you are always in trusted hands. In just 9 years, Livguard has become the fastest-growing Energy Storage Solutions brand. Our zeal to develop a complete and connected ecosystem of happy customers, committed partners, & the best quality every time has made us the choice of people nationwide.",
                                    "image": [
                                        " https://files.growthjockey.com/livguard/icons/logo-dark.svg"
                                    ]
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "name": "Inverters Batteries",
                                    "item": "https://www.livguard.com/inverter-batteries",
                                    "description": " Inverter batteries with a powerful backup, made to empower your home with limitless energy whenever you need",
                                    "image": [
                                        "https://growthjockey.imgix.net/livguard/category/batteries/2/3.jpg?w=714.7166748046875"
                                    ]
                                },
                                {
                                    "@type": "SiteNavigationElement",
                                    "name": "Livguard",
                                    "url": "https://www.livguard.com/",
                                    "description": " We Are One of A Kind With Livguard, you are always in trusted hands. In just 9 years, Livguard has become the fastest-growing Energy Storage Solutions brand. Our zeal to develop a complete and connected ecosystem of happy customers, committed partners, & the best quality every time has made us the choice of people nationwide.",
                                    "image": [
                                        "https://files.growthjockey.com/livguard/icons/logo-dark.svg"
                                    ]
                                },
                                {
                                    "@type": "SiteNavigationElement",
                                    "name": "Inverters Batteries",
                                    "url": "https://www.livguard.com/inverter-batteries",
                                    "description": "Inverter batteries with a powerful backup, made to empower your home with limitless energy whenever you need",
                                    "image": [
                                        "https://growthjockey.imgix.net/livguard/category/batteries/2/3.jpg?w=714.7166748046875"
                                    ]
                                }
                            ]
                        }
                    `,
                }}
            /> */}
        </>
    );
}

function ContactPage({userPreferences, utmParameters, actionData}: {userPreferences: UserPreferences; utmParameters: {[searchParameter: string]: string}; actionData: ActionData}) {
    return (
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-x-16 tw-items-start tw-justify-center">
            <HeroSection
                userPreferences={userPreferences}
                className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-2 tw-col-start-1 lg:tw-col-span-full" />

            <div className="tw-row-start-3 tw-col-start-1 lg:tw-col-span-full tw-grid tw-grid-cols-[minmax(0,1fr)_minmax(0,1fr)] tw-gap-x-16 lg-px-screen-edge-2">
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
            </div>

            <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-6 lg:tw-row-start-4 tw-col-start-1 lg:tw-col-span-full" />

            <OurPresence
                userPreferences={userPreferences}
                className="tw-row-start-7 lg:tw-row-start-5 tw-col-start-1 lg:tw-col-span-full"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[8] lg:tw-row-start-6 tw-col-start-1 lg:tw-col-span-full" />

            <ExploreCareers
                userPreferences={userPreferences}
                className="tw-row-start-[9] lg:tw-row-start-7 tw-col-start-1 lg:tw-col-span-full"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[10] lg:tw-row-start-[8] tw-col-start-1 lg:tw-col-span-full" />
        </div>
    );
}

function HeroSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height)-9.5rem)] lg:tw-h-[70vh] tw-grid tw-grid-rows-[3.5rem_auto_1rem_auto_minmax(0,1fr)] lg:tw-grid-rows-[minmax(0,1fr)_auto_1rem_auto_minmax(0,1fr)] tw-text-center lg:tw-text-left",
                className,
            )}
            ref={ref}
        >
            {/* <CoverImage
                relativePath="/livguard/category/batteries/1/1.jpg"
                className="tw-row-[1/span_12] tw-col-start-1"
                alt="Inverter battery"
            /> */}

            {/* {containerWidth == null || containerHeight == null ? null : (
                <CoverImage
                    relativePath={
                        containerHeight > containerWidth || containerWidth < 640
                            ? userPreferences.language == Language.English
                                ? "/livguard/category/batteries/1/desktop_hero.jpg"
                                : "/livguard/category/batteries/1/.jpg"
                            : userPreferences.language == Language.English
                            ? "/livguard/category/batteries/1/.jpg"
                            : "/livguard/category/batteries/1/.jpg"
                    }
                    className="tw-row-start-1 tw-col-start-1 tw-row-span-full"
                    key={
                        containerHeight > containerWidth || containerWidth < 640
                            ? userPreferences.language == Language.English
                                ? "/livguard/category/batteries/1/.jpg"
                                : "/livguard/category/batteries/1/.jpg"
                            : userPreferences.language == Language.English
                            ? "/livguard/category/batteries/1/.jpg"
                            : "/livguard/category/batteries/1/.jpg"
                    }
                />
            )} */}

            {containerWidth == null || containerHeight == null ? null : (
                <CoverImage
                    relativePath={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/contact-us/1/mobile_hero.jpg" : "/livguard/contact-us/1/desktop_hero.jpg"}
                    className="tw-row-start-1 tw-col-start-1 tw-row-span-full"
                    key={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/contact-us/1/mobile_hero.jpg" : "/livguard/contact-us/1/desktop_hero.jpg"}
                />
            )}

            <DefaultTextAnimation className="tw-row-start-2 tw-col-start-1">
                <div className="lg-text-banner lg-px-screen-edge-2 tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">
                    {getVernacularString("contactFormS1T1", userPreferences.language)}
                </div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-4 tw-col-start-1">
                <div className="lg-text-title1 lg-px-screen-edge-2 tw-text-secondary-900-dark">{getVernacularString("contactFormS1T2", userPreferences.language)}</div>
            </DefaultTextAnimation>
        </div>
    );
}

function WeAreListening({userPreferences, className, actionData}: {userPreferences: UserPreferences; className?: string; actionData: ActionData}) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const utmSearchParameters = useUtmSearchParameters();

    const [isFeedbackFormSubmitted, setIsFeedbackFormSubmitted] = useState(false);
    const [isFeedbackFormTermsAndConditionsChecked, setIsFeedbackFormTermsAndConditionsChecked] = useState(true);
    const [feedbackFormSelectedProduct, setFeedbackFormSelectedProduct] = useState(getVernacularString("ormTrackingFormProduct1", userPreferences.language));

    const [isComplaintFormSubmitted, setIsComplaintFormSubmitted] = useState(false);
    const [isComplaintFormTermsAndConditionsChecked, setIsComplaintFormTermsAndConditionsChecked] = useState(true);
    const [complaintFormOption, setComplaintFormOption] = useState(getVernacularString("contactUsS3ComplaintFormRadioOption1", userPreferences.language));

    const [rating, setRating] = useState(0);

    useEffect(() => {
        if (actionData != null) {
            if (actionData.error != null) {
                toast.error("ERROR in submitting form");
                return;
            }

            if (actionData.formType != null) {
                if (actionData.formType == "feedbackForm") {
                    setIsFeedbackFormSubmitted(true);
                } else if (actionData.formType == "complaintForm") {
                    setIsComplaintFormSubmitted(true);
                }
            }
        }
    }, [actionData]);

    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-rows-[auto_1rem_auto_1.5rem_minmax(0,1fr)] tw-w-full", className)}>
            <DefaultTextAnimation className="tw-row-start-1 lg-text-headline tw-text-center lg:tw-text-left">
                <div dangerouslySetInnerHTML={{__html: appendSpaceToString(getVernacularString("contactUsS3H", userPreferences.language))}} />
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-4 tw-row-start-2" />

            <div className="tw-row-start-3 tw-grid tw-grid-cols-[minmax(0,max-content)_1rem_minmax(0,max-content)] lg:tw-pl-0 tw-place-self-center lg:tw-place-self-start">
                <div
                    className={concatenateNonNullStringsWithSpaces(
                        "tw-max-w-fit tw-p-4 tw-rounded-md tw-grid tw-items-center tw-justify-center tw-col-start-1 hover:tw-cursor-pointer",
                        `${selectedIndex == 0 ? "tw-bg-primary-500-light" : "lg-bg-secondary-100"}`,
                    )}
                    onClick={() => setSelectedIndex(0)}
                >
                    <div className={`lg-text-body tw-font-bold ${selectedIndex === 0 ? "!tw-text-secondary-900-dark" : "lg-text-secondary-900"}`}>
                        {getVernacularString("contactUsS3Feedback", userPreferences.language)}
                    </div>
                </div>

                <div
                    className={concatenateNonNullStringsWithSpaces(
                        "tw-max-w-fit tw-p-4 tw-rounded-md tw-grid tw-items-center tw-justify-center tw-col-start-3 hover:tw-cursor-pointer",
                        `${selectedIndex == 1 ? "tw-bg-primary-500-light" : "lg-bg-secondary-100"}`,
                    )}
                    onClick={() => setSelectedIndex(1)}
                >
                    <div className={`lg-text-body tw-font-bold ${selectedIndex === 1 ? "!tw-text-secondary-900-dark" : "lg-text-secondary-900"}`}>
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
                                className="tw-grid tw-grid-flow-row tw-gap-4 lg:tw-px-2 tw-place-self-start"
                            >
                                <div className="tw-grid tw-row-start-1 tw-grid-flow-row tw-justify-center tw-gap-2">
                                    <div className="tw-grid tw-row-start-1 tw-max-w-fit tw-grid-flow-col tw-gap-2">
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

                                    <div className="tw-row-start-2 ">
                                        <div className="lg-text-body lg-text-secondary-900 tw-text-center">{getVernacularString("contactUsS3FeedbackFormT1", userPreferences.language)}</div>
                                    </div>
                                </div>

                                <div className="tw-grid tw-row-start-2 tw-grid-cols-2 tw-gap-2">
                                    <div className="tw-col-start-1 tw-grid tw-grid-flow-row tw-gap-2">
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

                                    <div className="tw-col-start-2 tw-grid tw-grid-flow-row tw-gap-2">
                                        <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">{getVernacularString("contactUsS3FormNameText", userPreferences.language)}</div>

                                        <input
                                            type="text"
                                            name="name"
                                            className="lg-text-input"
                                            placeholder={getVernacularString("contactUsS3FormNamePlaceholder", userPreferences.language)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="tw-grid tw-row-start-3 tw-grid-flow-row tw-gap-2">
                                    <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">{getVernacularString("contactUsS3FormProductText", userPreferences.language)}</div>

                                    <div className="tw-row-start-2">
                                        <FormSelectComponent
                                            items={[
                                                getVernacularString("ormTrackingFormProduct1", userPreferences.language),
                                                getVernacularString("ormTrackingFormProduct2", userPreferences.language),
                                                getVernacularString("ormTrackingFormProduct3", userPreferences.language),
                                                getVernacularString("ormTrackingFormProduct4", userPreferences.language),
                                            ]}
                                            itemBuilder={(item) =>
                                                item == null ? `${getVernacularString("ormTrackingFormProduct1", userPreferences.language)}` : `<div class="tw-py-1">${item}</div>`
                                            }
                                            value={feedbackFormSelectedProduct}
                                            setValue={(item) =>
                                                item != null
                                                    ? setFeedbackFormSelectedProduct(item)
                                                    : setFeedbackFormSelectedProduct(getVernacularString("ormTrackingFormProduct1", userPreferences.language))
                                            }
                                            // buttonClassName="!tw-rounded-full"
                                        />
                                    </div>
                                </div>

                                <div className="tw-grid tw-row-start-4 tw-grid-flow-row tw-gap-2">
                                    <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">{getVernacularString("contactUsS3FeedbackFormDetailText", userPreferences.language)}</div>

                                    <textarea
                                        name="queryDetails"
                                        className="lg-text-input !tw-rounded-lg tw-row-start-2"
                                        placeholder={getVernacularString("contactUsS3FeedbackFormDetailPlaceholder", userPreferences.language)}
                                        rows={3}
                                    />
                                </div>

                                <div className="tw-grid tw-row-start-5 tw-grid-flow-col tw-gap-4 tw-items-start">
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
                                    value={feedbackFormSelectedProduct}
                                />

                                <button
                                    type="submit"
                                    className="tw-row-start-6 lg-text-body tw-px-10 tw-py-4 lg-cta-button tw-max-w-fit !tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start"
                                    disabled={rating == 0 || feedbackFormSelectedProduct == ""}
                                >
                                    {getVernacularString("contactUsS3FormButtonText", userPreferences.language)}
                                </button>
                            </Form>
                        ) : (
                            // <ContactFormSuccess userPreferences={userPreferences} />
                            <div className="tw-grid tw-grid-rows-[minmax(0,1fr)_auto_2rem_auto_2rem_auto_1.5rem_auto_2rem_auto_minmax(1rem,1fr)] tw-w-full tw-h-full tw-rounded-lg tw-border lg-border-secondary-700 tw-justify-center tw-place-self-center tw-px-16">
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
                            className="tw-grid tw-grid-flow-row tw-gap-4 lg:tw-px-2  tw-place-self-center"
                        >
                            <div className="tw-grid tw-row-start-1 tw-grid-flow-row tw-gap-2">
                                <div className="lg-text-body lg-text-secondary-900 tw-row-start-1 tw-text-left">
                                    {getVernacularString("contactUsS3ComplaintFormRadioText", userPreferences.language)}
                                </div>

                                <div className="tw-row-start-2 tw-grid tw-grid-rows-[auto_1rem_auto] tw-grid-cols-1 lg:tw-grid-cols-[minmax(0,max-content)_1rem_minmax(0,max-content)] lg:tw-row-start-1">
                                    <div className="tw-col-start-1 tw-row-start-1 tw-grid tw-grid-cols-[auto_.5rem_auto] tw-max-w-fit tw-items-center">
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

                                    <div className="tw-row-start-2 tw-col-start-1 lg:tw-col-start-3 lg:tw-row-start-1 tw-grid tw-grid-cols-[auto_.5rem_auto] tw-max-w-fit tw-items-center">
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

                            <div className="tw-grid tw-row-start-2 tw-grid-flow-row tw-gap-2">
                                <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">{getVernacularString("contactUsS3ComplaintFormDetailText", userPreferences.language)}</div>

                                <textarea
                                    name="queryDetails"
                                    className="lg-text-input !tw-rounded-lg tw-row-start-2"
                                    placeholder={getVernacularString("contactUsS3ComplaintFormDetailPlaceholder", userPreferences.language)}
                                    rows={3}
                                />
                            </div>

                            <div className="tw-grid tw-row-start-3 tw-grid-flow-row tw-gap-2">
                                <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">{getVernacularString("contactUsS3FormNumberText", userPreferences.language)}</div>

                                <input
                                    type="text"
                                    name="phoneNumber"
                                    className="lg-text-input tw-row-start-2"
                                    pattern={indianPhoneNumberValidationPattern}
                                    placeholder={getVernacularString("contactUsS3FormNumberPlaceholder", userPreferences.language)}
                                />
                            </div>

                            <div className="tw-grid tw-row-start-4 tw-grid-cols-2 tw-gap-2">
                                <div className="tw-col-start-1 tw-grid tw-grid-flow-row tw-gap-2">
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

                                <div className="tw-col-start-2 tw-grid tw-grid-flow-row tw-gap-2">
                                    <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">{getVernacularString("contactUsS3FormNameText", userPreferences.language)}</div>

                                    <input
                                        type="text"
                                        name="name"
                                        className="lg-text-input"
                                        placeholder={getVernacularString("contactUsS3FormNamePlaceholder", userPreferences.language)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="tw-grid tw-row-start-5 tw-grid-flow-col tw-gap-4 tw-items-start">
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

                            <input
                                name="utmParameters"
                                className="tw-hidden"
                                readOnly
                                value={JSON.stringify(utmSearchParameters)}
                            />
                            <input
                                readOnly
                                className="tw-hidden"
                                value="complaintForm"
                                name="formType"
                            />
                            <input
                                readOnly
                                name="termsAndConditionsChecked"
                                className="tw-hidden"
                                value={isComplaintFormTermsAndConditionsChecked ? "True" : "False"}
                            />

                            <button
                                type="submit"
                                className="tw-row-start-6 lg-text-body tw-px-10 tw-py-4 lg-cta-button !tw-text-secondary-900-dark tw-max-w-fit tw-place-self-center lg:tw-place-self-start"
                            >
                                {getVernacularString("contactUsS3FormButtonText", userPreferences.language)}
                            </button>
                        </Form>
                    ) : (
                        // <ContactFormSuccess userPreferences={userPreferences} />
                        <div className="tw-grid tw-grid-rows-[minmax(0,1fr)_auto_2rem_auto_1.5rem_auto_1.5rem_auto_1.5rem_auto_minmax(1rem,1fr)] tw-w-full tw-h-full tw-rounded-lg tw-border lg-border-secondary-700 tw-justify-center tw-place-self-center tw-px-16">
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
            <div className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full lg:tw-row-start-1 lg:lg-bg-secondary-300 lg-text-secondary-900 tw-rounded-lg tw-grid tw-grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:tw-grid-cols-[auto_1.5rem_minmax(0,1fr)] tw-items-center lg:tw-px-4 lg:tw-py-4">
                <div className="tw-row-start-1 tw-col-start-2 lg:tw-col-start-1 tw-rounded-full lg-bg-secondary-100 tw-h-16 tw-w-16 lg:tw-h-20 lg:tw-w-20 tw-grid tw-items-center tw-justify-center tw-place-self-center">
                    <img
                        className={"tw-w-8 tw-h-8 lg:tw-w-10 lg:tw-h-10 tw-invert dark:tw-invert-0"}
                        src="https://files.growthjockey.com/livguard/icons/contact-us/call-us.svg"
                    />
                </div>

                <VerticalSpacer className="tw-h-4 tw-row-start-2 lg:tw-hidden" />

                <div className="tw-row-start-3 lg:tw-row-start-1 tw-col-start-2 lg:tw-col-start-3 tw-grid tw-grid-flow-row tw-gap-4">
                    <div className="lg-text-body tw-row-start-1 tw-place-self-center lg:tw-place-self-start tw-text-center lg:tw-text-left">
                        {getVernacularString("contactUsS2Option1Text", userPreferences.language)}
                    </div>

                    <button
                        className="lg-cta-button tw-w-full lg:tw-w-[8.375rem] tw-place-self-center lg:tw-place-self-start tw-row-start-2 !tw-px-[0]"
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
            <div className="tw-row-start-1 tw-col-start-3 lg:tw-col-span-full lg:tw-row-start-2 lg:lg-bg-secondary-300 lg-text-secondary-900 tw-rounded-lg tw-grid tw-grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:tw-grid-cols-[auto_1.5rem_minmax(0,1fr)] tw-items-center lg:tw-px-4 lg:tw-py-4">
                <div className="tw-row-start-1 tw-col-start-2 lg:tw-col-start-1 tw-rounded-full lg-bg-secondary-100 tw-h-16 tw-w-16 lg:tw-h-20 lg:tw-w-20 tw-grid tw-items-center tw-justify-center tw-place-self-center">
                    <img
                        className="tw-w-8 tw-h-8 lg:tw-w-10 lg:tw-h-10 tw-invert dark:tw-invert-0"
                        src="https://files.growthjockey.com/livguard/icons/contact-us/whatsapp-us.svg"
                    />
                </div>

                <VerticalSpacer className="tw-h-4 tw-row-start-2 lg:tw-row-start-1 lg:tw-hidden" />

                <div className="tw-row-start-3 lg:tw-row-start-1 tw-col-start-2 lg:tw-col-start-3 tw-grid tw-grid-flow-row tw-gap-4">
                    <div className="lg-text-body tw-row-start-1 tw-text-center lg:tw-text-left">{getVernacularString("contactUsS2Option2Text", userPreferences.language)}</div>

                    <button
                        className="lg-cta-outline-button tw-w-full lg:tw-w-[8.375rem] tw-place-self-center lg:tw-place-self-start tw-row-start-2 !tw-px-[0]"
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
            <div className="tw-row-start-3 tw-col-start-1 lg:tw-col-span-full lg:tw-row-start-3 lg:lg-bg-secondary-300 lg-text-secondary-900 tw-rounded-lg tw-grid tw-grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:tw-grid-rows-[auto] lg:tw-grid-cols-[auto_1.5rem_minmax(0,1fr)] tw-items-center lg:tw-px-4 lg:tw-py-4">
                <div className="tw-row-start-1 tw-col-start-2 lg:tw-col-start-1 tw-rounded-full lg-bg-secondary-100 tw-h-16 tw-w-16 lg:tw-h-20 lg:tw-w-20 tw-grid tw-items-center tw-justify-center tw-place-self-center">
                    <img
                        className="tw-w-8 tw-h-8 lg:tw-w-10 lg:tw-h-10 tw-invert dark:tw-invert-0"
                        src="https://files.growthjockey.com/livguard/icons/contact-us/email-us.svg"
                    />
                </div>

                <VerticalSpacer className="tw-h-4 tw-row-start-2 lg:tw-row-start-1 lg:tw-hidden" />

                <div className="tw-row-start-3 lg:tw-row-start-1 tw-col-start-2 lg:tw-col-start-3 tw-grid tw-grid-flow-row tw-gap-4">
                    <div className="lg-text-body tw-row-start-1 tw-text-center lg:tw-text-left">{getVernacularString("contactUsS2Option3Text", userPreferences.language)}</div>

                    <button
                        className="lg-cta-outline-button tw-w-full lg:tw-w-[8.375rem] tw-place-self-center lg:tw-place-self-start tw-row-start-2 !tw-px-[0]"
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
            <div className="tw-row-start-3 tw-col-start-3 lg:tw-col-span-full lg:tw-row-start-4 lg:lg-bg-secondary-300 lg-text-secondary-900 tw-rounded-lg tw-grid tw-grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:tw-grid-cols-[auto_1.5rem_minmax(0,1fr)] tw-items-center lg:tw-px-4 lg:tw-py-4">
                <div className="tw-row-start-1 tw-col-start-2 lg:tw-col-start-1 tw-rounded-full lg-bg-secondary-100 tw-h-16 tw-w-16 lg:tw-h-20 lg:tw-w-20 tw-grid tw-items-center tw-justify-center tw-place-self-center">
                    <img
                        className="tw-w-8 tw-h-8 lg:tw-w-10 lg:tw-h-10 tw-invert dark:tw-invert-0"
                        src="https://files.growthjockey.com/livguard/icons/contact-us/request-service.svg"
                    />
                </div>

                <VerticalSpacer className="tw-h-4 tw-row-start-2 lg:tw-row-start-1 lg:tw-hidden" />

                <div className="tw-row-start-3 lg:tw-row-start-1 tw-col-start-2 lg:tw-col-start-3 tw-grid tw-grid-flow-row tw-gap-4">
                    <div className="lg-text-body tw-row-start-1 tw-text-center lg:tw-text-left">{getVernacularString("contactUsS2Option4Text", userPreferences.language)}</div>

                    <Link
                        className="lg-cta-outline-button tw-w-full lg:tw-w-[8.375rem] tw-place-self-center lg:tw-place-self-start tw-row-start-2 !tw-px-[0] tw-text-center"
                        to="/service"
                        target="_blank"
                    >
                        {getVernacularString("contactUsS2Option4ButtonText", userPreferences.language)}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-flow-row lg-px-screen-edge-2 lg:tw-pl-0", className)}>
            <DefaultTextAnimation className="tw-row-start-1 lg-text-headline tw-text-center lg:tw-text-left">
                <div dangerouslySetInnerHTML={{__html: appendSpaceToString(getVernacularString("contactUsS2H", userPreferences.language))}} />
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-2 lg:tw-h-4 tw-row-start-2" />

            <DefaultTextAnimation className="tw-row-start-3 lg-text-headline tw-text-center lg:tw-text-left">
                <div className="lg-text-body">{getVernacularString("contactUsS2HText", userPreferences.language)}</div>
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-4 lg:tw-h-6 tw-row-start-4" />

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
                                    <div className="tw-flex-1">{dialogType == "call-us" ? "800-1025-551" : dialogType == "email-us" ? "livserv@sar-group.com" : "7428191000"}</div>

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

                            <div className="lg-text-title2">{getVernacularString("headerContactUsDialogT3", userPreferences.language)}</div>

                            <VerticalSpacer className="tw-h-2" />

                            <Link
                                to={dialogType == "call-us" ? "tel:+919205667999" : dialogType == "email-us" ? "mailto:marketing@livguard.com" : "https://wa.me/920566799"}
                                className="tw-w-full lg-bg-primary-500 tw-text-secondary-900-dark tw-py-3 tw-px-4 tw-rounded-full"
                            >
                                <div className="tw-flex tw-flex-row tw-items-center">
                                    <div className="tw-flex-1">{dialogType == "call-us" ? "+91 92056-67999" : dialogType == "email-us" ? "marketing@livguard.com" : "+91 92056-6799"}</div>

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
                        </div>
                    </Transition.Child>
                </Dialog.Panel>

                <div onClick={tryToCloseContactUsDialog} />
            </Dialog>
        </Transition>
    );
}

function OurPresence({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-flow-row tw-justify-left lg-px-screen-edge-2 tw-max-w-7xl tw-mx-auto", className)}>
            <DefaultTextAnimation className="tw-row-start-1 lg-text-headline tw-text-center">
                <div dangerouslySetInnerHTML={{__html: appendSpaceToString(getVernacularString("contactUsS4H", userPreferences.language))}} />
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-6 tw-row-start-2" />

            <div className="tw-row-start-3 tw-grid tw-grid-cols-1 tw-grid-rows-2 lg:tw-grid-cols-2 lg:tw-grid-rows-1 tw-gap-x-16 tw-gap-y-8">
                <div className="tw-row-start-1 tw-col-start-1 tw-rounded-lg tw-border lg-border-secondary-900 tw-grid tw-grid-rows-[auto_1rem_minmax(0,1fr)] lg:tw-grid-rows-1 lg:tw-grid-cols-[auto_2rem_minmax(0,1fr)] tw-p-4 tw-items-center">
                    <div className="tw-col-start-1 tw-row-start-1 tw-rounded-full lg-bg-secondary-100 tw-h-[6.25rem] tw-w-[6.25rem] tw-grid tw-items-center tw-justify-center tw-place-self-center lg:tw-place-self-start">
                        <img
                            src="https://files.growthjockey.com/livguard/icons/contact-us/india.svg"
                            alt="india-operations"
                            className="tw-w-[3.5rem] tw-h-[3.5rem]"
                        />
                    </div>

                    <div className="tw-col-start-1 tw-row-start-3 lg:tw-col-start-3 lg:tw-row-start-1 tw-grid tw-grid-rows-[auto_.5rem_minmax(0,1fr)_.5rem_auto]">
                        <div className="lg-text-body tw-font-bold tw-row-start-1 tw-text-center lg:tw-text-left">{getVernacularString("contactUsS4Option1Heading", userPreferences.language)}</div>

                        <div className="lg-text-body tw-row-start-3 tw-text-center lg:tw-text-left">{getVernacularString("contactUsS4Option1Text", userPreferences.language)}</div>

                        <Link
                            to="/"
                            className="lg-cta-outline-button tw-max-w-fit tw-row-start-5 tw-place-self-center lg:tw-place-self-start"
                        >
                            {getVernacularString("contactUsS4ButtonText", userPreferences.language)}
                        </Link>
                    </div>
                </div>

                <div className="tw-row-start-2 tw-col-start-1 lg:tw-col-start-2 lg:tw-row-start-1 tw-rounded-lg tw-border lg-border-secondary-900 tw-grid tw-grid-rows-[auto_1rem_minmax(0,1fr)] lg:tw-grid-rows-1 tw-grid-cols-[auto_2rem_minmax(0,1fr)] tw-p-4 tw-items-center">
                    <div className="tw-col-start-1 tw-row-start-1 tw-rounded-full lg-bg-secondary-100 tw-h-[6.25rem] tw-w-[6.25rem] tw-grid tw-items-center tw-justify-center tw-place-self-center lg:tw-place-self-start">
                        <img
                            src="https://files.growthjockey.com/livguard/icons/contact-us/international.svg"
                            alt="international-operations"
                            className="tw-w-[3.5rem] tw-h-[3.5rem]"
                        />
                    </div>

                    <div className="tw-col-start-1 tw-row-start-3 lg:tw-col-start-3 lg:tw-row-start-1 tw-grid tw-grid-rows-[auto_.5rem_minmax(0,1fr)_.5rem_auto]">
                        <div className="lg-text-body tw-font-bold tw-row-start-1 tw-text-center lg:tw-text-left">{getVernacularString("contactUsS4Option2Heading", userPreferences.language)}</div>

                        <div className="lg-text-body tw-row-start-3 tw-text-center lg:tw-text-left">{getVernacularString("contactUsS4Option2Text", userPreferences.language)}</div>

                        <Link
                            to="/"
                            className="lg-cta-outline-button tw-max-w-fit tw-row-start-5 tw-place-self-center lg:tw-place-self-start"
                        >
                            {getVernacularString("contactUsS4ButtonText", userPreferences.language)}
                        </Link>
                    </div>
                </div>
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
