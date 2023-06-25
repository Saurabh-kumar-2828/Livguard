import React, {useEffect, useState} from "react";
import {ActionFunction, LinksFunction, LoaderFunction, MetaFunction, json} from "@remix-run/node";
import {Form, Link, useActionData, useLoaderData} from "@remix-run/react";
import {Dialog, Transition} from "@headlessui/react";
import {toast} from "react-toastify";
import {useResizeDetector} from "react-resize-detector";
import {X} from "react-bootstrap-icons";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces, generateUuid} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {getStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {emailIdValidationPattern, indianPhoneNumberValidationPattern} from "~/global-common-typescript/utilities/validationPatterns";
import {FormSelectComponent} from "~/livguard-common-typescript/scratchpad";
import {insertServiceRequests} from "~/backend/dealer.server";
import {FixedWidthImage} from "~/components/images/fixedWidthImage";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {CoverImage} from "~/components/images/coverImage";
import {PageScaffold} from "~/components/pageScaffold";
import {TestimonialsCarousel} from "~/components/testimonialsCarousel";
import {FaqSectionInternal} from "~/components/faqs";
import {EmbeddedYoutubeVideo} from "~/components/embeddedYoutubeVideo";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import {Language, UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";
import {appendSpaceToString, getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";

export const meta: MetaFunction = ({data}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = data.userPreferences;
    if (userPreferences.language == Language.English) {
        return {
            title: "Livguard Services - Reliable Solutions for Your Power Needs",
            description: "Get reliable and effective Livguard services that ensure seamless performance of your automotive, home, and industrial needs. Contact us for expert solutions.",
            "og:title": "Livguard Services - Reliable Solutions for Your Power Needs",
            "og:site_name": "Livguard",
            "og:url": "https://www.livguard.com/service",
            "og:description": "Get reliable and effective Livguard services that ensure seamless performance of your automotive, home, and industrial needs. Contact us for expert solutions.",
            "og:type": "website",
            "og:image": "",
        };
    } else if (userPreferences.language == Language.Hindi) {
        return {
            title: "?????",
            description: "?????",
        };
    } else {
        throw Error(`Undefined language ${userPreferences.language}`);
    }
};

export const links: LinksFunction = () => {
    return [{rel: "canonical", href: "https://www.livguard.com/service"}];
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

    const insertResult = await insertServiceRequests(generateUuid(), {
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

    const actionData: ActionData = {
        error: null,
    };

    return json(actionData);
};

export default () => {
    const {userPreferences, redirectTo} = useLoaderData() as LoaderData;
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
                    {contentId: "84ec1aea-1f61-4508-ae92-cd3647247ef1", link: "/"},
                    {contentId: "9672b1a1-0713-48e3-98a2-17322eda6ff2", link: "#"},
                ]}
            >
                <ServicesPage
                    userPreferences={userPreferences}
                    actionData={actionData}
                />
            </PageScaffold>
        </>
    );
};

function ServicesPage({userPreferences, actionData}: {userPreferences: UserPreferences; actionData: {error: string | null}}) {
    return (
        <>
            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-x-16 tw-items-start tw-justify-center">
                <HeroSection
                    userPreferences={userPreferences}
                    className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
                />

                <VerticalSpacer className="tw-h-10 tw-row-start-2 tw-col-start-1 lg:tw-col-span-full" />

                <EffortlessService
                    userPreferences={userPreferences}
                    className="tw-row-start-3 tw-col-start-1 lg:tw-col-span-full tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-4 tw-col-start-1 lg:tw-col-span-full" />

                <RequestAService
                    userPreferences={userPreferences}
                    className="tw-row-start-7 lg:tw-row-start-5 tw-col-start-1 tw-max-w-7xl lg:tw-justify-self-end"
                    actionData={actionData}
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-6 tw-col-start-1 lg:tw-col-span-full lg:tw-hidden" />

                <ClickConnectPowerUpSection
                    userPreferences={userPreferences}
                    className="tw-row-start-5 lg:tw-row-start-5 lg:tw-col-start-2 tw-max-w-7xl lg:tw-justify-self-start"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-8 lg:tw-row-start-6 tw-col-start-1 lg:tw-col-span-full" />

                <Testimonials
                    userPreferences={userPreferences}
                    className="lg:lg-pl-screen-edge-2 lg:lg-pr-screen-edge-2 tw-row-start-9 lg:tw-row-start-7 lg:tw-col-span-full tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-10 lg:tw-row-start-8 tw-col-start-1 lg:tw-col-span-full" />

                <WarrantyBanner
                    userPreferences={userPreferences}
                    className="lg:lg-pl-screen-edge-2 lg:lg-pr-screen-edge-2 tw-row-start-11 lg:tw-row-start-9 lg:tw-col-span-full"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-12 lg:tw-row-start-10 tw-col-start-1 lg:tw-col-span-full" />

                <FaqSection
                    userPreferences={userPreferences}
                    className="tw-row-start-13 lg:tw-row-start-11 lg:tw-col-start-1 lg:tw-col-span-full lg:tw-px-[72px] xl:tw-px-[120px] tw-max-w-7xl tw-mx-auto"
                />

                <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-14 lg:tw-row-start-12 tw-col-start-1 lg:tw-col-span-full" />
            </div>
        </>
    );
}

function HeroSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height)-9.5rem)] lg:tw-h-[70vh] tw-grid tw-grid-rows-[minmax(0,1fr)_auto_1rem_auto_minmax(0,1fr)] lg:tw-grid-rows-[minmax(0,1fr)_auto_1rem_auto_minmax(0,1fr)] tw-text-center lg:tw-text-left",
                className,
            )}
            ref={ref}
        >
            {containerWidth == null || containerHeight == null ? null : (
                <CoverImage
                    relativePath={
                        containerHeight > containerWidth || containerWidth < 640 ? "/livguard/services-page/6/service_mobile_banner.jpg" : "/livguard/services-page/6/service_desktop_banner.jpg"
                    }
                    className="tw-row-start-1 tw-col-start-1 tw-row-span-full"
                    key={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/services-page/6/service_mobile_banner.jpg" : "/livguard/services-page/6/service_desktop_banner.jpg"}
                />
            )}

            <DefaultTextAnimation className="tw-row-start-2 tw-col-start-1">
                <div className="lg-text-banner lg-px-screen-edge-2 tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">
                    {getVernacularString("1f489840-705d-44b1-a18a-73a2645594de", userPreferences.language)}
                </div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-4 tw-col-start-1">
                <div className="lg-text-title1 lg-px-screen-edge-2 tw-text-secondary-900-dark">{getVernacularString("5a7fe2d5-9f46-4bb4-814e-7f075f8ca843", userPreferences.language)}</div>
            </DefaultTextAnimation>
        </div>
    );
}

function EffortlessService({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
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
                    <div className="tw-rounded-full tw-w-16 tw-h-16 lg-bg-secondary-100 tw-mb-2 lg:tw-mr-2 lg:tw-mb-0 tw-flex tw-justify-center tw-items-center">
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
            <div className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-rows-[auto_auto_1rem_auto_1rem_auto_minmax(0,1fr)] lg-px-screen-edge-2", className)}>
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

function RequestAService({userPreferences, className, actionData}: {userPreferences: UserPreferences; className?: string; actionData: {error: string | null}}) {
    const utmSearchParameters = useUtmSearchParameters();

    const [isServiceRequestFormSubmitted, setIsServiceRequestFormSubmitted] = useState(false);
    const [isServiceRequestFormTermsAndConditionsChecked, setIsServiceRequestFormTermsAndConditionsChecked] = useState(true);
    const [serviceRequestFormSelectedProduct, setServiceRequestFormSelectedProduct] = useState(getVernacularString("ormTrackingFormProduct1", userPreferences.language));

    useEffect(() => {
        if (actionData != null) {
            if (actionData.error != null) {
                toast.error("ERROR in submitting form");
                return;
            }

            setIsServiceRequestFormSubmitted(true);
        }
    }, [actionData]);

    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-flow-row tw-justify-center lg:tw-justify-left lg:lg-pl-screen-edge-2 tw-h-full", className)}>
            <DefaultTextAnimation className="tw-row-start-1 lg-text-headline lg-px-screen-edge-2 lg:tw-pl-0 tw-text-center lg:tw-text-left">
                <div dangerouslySetInnerHTML={{__html: appendSpaceToString(getVernacularString("58490cb1-5f27-4f67-98d3-939b5a3b9b10", userPreferences.language))}} />
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-4 tw-row-start-2" />

            <div className="tw-row-start-4 tw-col-span-full lg-px-screen-edge-2 lg:tw-px-0">
                <div className="tw-overflow-hidden tw-h-full">
                    <div className="tw-grid tw-grid-flow-col tw-auto-cols-[100%] tw-items-stretch tw-h-full">
                        <div className="tw-grid tw-grid-glow-rows tw-h-full">
                            {!isServiceRequestFormSubmitted ? (
                                <Form
                                    method="post"
                                    className="tw-grid tw-grid-flow-row tw-gap-4"
                                >
                                    <div className="tw-grid tw-row-start-1 tw-grid-flow-col tw-gap-2">
                                        <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">{getVernacularString("1cc00f3b-4b94-4e16-bc4f-a0337877d25e", userPreferences.language)}</div>

                                        <textarea
                                            name="issueDetails"
                                            className="lg-text-input !tw-rounded-lg tw-row-start-2"
                                            placeholder={getVernacularString("2f725e91-eb31-4d56-898a-87db94a21e48", userPreferences.language)}
                                            rows={3}
                                            required
                                        />
                                    </div>

                                    <div className="tw-grid tw-row-start-2 lg:tw-grid-cols-2 tw-gap-2">
                                        <div className="lg:tw-col-start-1 tw-grid tw-grid-flow-row tw-gap-2">
                                            <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">
                                                {getVernacularString("43e7ced0-33d1-46a2-ab06-4e50dae64256", userPreferences.language)}
                                            </div>

                                            <div className="tw-row-start-2">
                                                <FormSelectComponent
                                                    items={[
                                                        getVernacularString("ormTrackingFormProduct1", userPreferences.language),
                                                        getVernacularString("ormTrackingFormProduct2", userPreferences.language),
                                                        getVernacularString("ormTrackingFormProduct3", userPreferences.language),
                                                        getVernacularString("ormTrackingFormProduct4", userPreferences.language),
                                                    ]}
                                                    itemBuilder={(item) =>
                                                        item == null ? getVernacularString("ormTrackingFormProduct1", userPreferences.language) : `<div class="tw-py-1">${item}</div>`
                                                    }
                                                    value={serviceRequestFormSelectedProduct}
                                                    setValue={(item) =>
                                                        item != null
                                                            ? setServiceRequestFormSelectedProduct(item)
                                                            : setServiceRequestFormSelectedProduct(getVernacularString("ormTrackingFormProduct1", userPreferences.language))
                                                    }
                                                    buttonClassName="!tw-rounded-full"
                                                />
                                            </div>
                                        </div>

                                        <div className="lg:tw-col-start-2 tw-grid tw-grid-flow-row tw-gap-2">
                                            <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">
                                                {getVernacularString("17cfa283-6fcc-4a49-9dfe-a392e0310b27", userPreferences.language)}
                                            </div>

                                            <input
                                                type="text"
                                                name="contactNumber"
                                                className="lg-text-input"
                                                pattern={indianPhoneNumberValidationPattern}
                                                placeholder={getVernacularString("1e90dca7-b78f-4231-b2df-644a3b0322d1", userPreferences.language)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="tw-grid tw-row-start-3 lg:tw-grid-cols-2 tw-gap-2">
                                        <div className="lg:tw-col-start-1 tw-grid tw-grid-flow-row tw-gap-2">
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

                                        <div className="lg:tw-col-start-2 tw-grid tw-grid-flow-row tw-gap-2">
                                            <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">
                                                {getVernacularString("6a37e3ee-a8a6-4999-9494-80465aaad48d", userPreferences.language)}
                                            </div>

                                            <input
                                                type="text"
                                                name="name"
                                                className="lg-text-input"
                                                placeholder={getVernacularString("a0d68490-ad84-47fb-863c-2a9c812feaec", userPreferences.language)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="tw-grid tw-row-start-4 lg:tw-grid-cols-2 tw-gap-2 tw-items-start">
                                        <div className="lg:tw-col-start-1 tw-grid tw-grid-flow-row tw-gap-2">
                                            <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">
                                                {getVernacularString("31241b10-2784-43df-a2ea-a614c9ef7468", userPreferences.language)}
                                            </div>

                                            <input
                                                type="text"
                                                name="pinCode"
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

                                    <div className="tw-grid tw-row-start-5 lg:tw-grid-cols-2 tw-gap-2 tw-items-start">
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

                                    <div className="tw-grid tw-row-start-6 tw-grid-flow-col tw-gap-4 tw-items-start tw-my-3 lg:tw-mt-0 lg:tw-mb-3">
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
                                        value={serviceRequestFormSelectedProduct}
                                    />

                                    <button
                                        type="submit"
                                        className="tw-row-start-7 tw-self-stretch lg-text-body tw-px-10 tw-py-4 lg-cta-button !tw-text-secondary-900-dark tw-place-self-stretch lg:tw-place-self-start"
                                    >
                                        {getVernacularString("0bc7a8cd-72d0-4f85-ab9d-39abdb269e6a", userPreferences.language)}
                                    </button>
                                </Form>
                            ) : (
                                <div className="tw-grid tw-grid-rows-[4.5rem_auto_2rem_auto_2rem_auto_minmax(0,1fr)_4.5rem] tw-w-full tw-h-full tw-rounded-lg tw-border lg-border-secondary-700 tw-justify-center tw-px-16">
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
    const [dialogOptions, setDialogOptions] = useState<{dialogType: string; headerTextContentId: string}>({dialogType: "", headerTextContentId: ""});

    function CallUsCard() {
        return (
            <div className="tw-row-start-5 lg:lg-bg-secondary-300 lg-text-secondary-900 tw-rounded-lg tw-grid tw-grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:tw-grid-cols-[auto_1.5rem_minmax(0,1fr)] tw-items-center tw-px-4 tw-py-4">
                <div className="tw-row-start-1 tw-col-start-2 lg:tw-col-start-1 tw-rounded-full lg-bg-secondary-100 tw-h-16 tw-w-16 lg:tw-h-20 lg:tw-w-20 tw-grid tw-items-center tw-justify-center tw-place-self-center">
                    <img
                        className={"tw-w-8 tw-h-8 lg:tw-w-10 lg:tw-h-10 tw-invert dark:tw-invert-0"}
                        src="https://files.growthjockey.com/livguard/icons/service/call-us.svg"
                    />
                </div>

                <VerticalSpacer className="tw-h-4 tw-row-start-2 lg:tw-hidden" />

                <div className="tw-row-start-3 lg:tw-row-start-1 tw-col-start-2 lg:tw-col-start-3 tw-grid tw-grid-flow-row tw-gap-4">
                    <div className="lg-text-body tw-row-start-1 tw-place-self-center lg:tw-place-self-start">{getVernacularString("contactUsS2Option1Text", userPreferences.language)}</div>

                    <button
                        className="lg-cta-button tw-w-[11.875rem] tw-place-self-center lg:tw-place-self-start tw-row-start-2"
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
            <div className="tw-row-start-7 lg:lg-bg-secondary-300 lg-text-secondary-900 tw-rounded-lg tw-grid tw-grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:tw-grid-cols-[auto_1.5rem_minmax(0,1fr)] tw-items-center tw-px-4 tw-py-4">
                <div className="tw-row-start-1 tw-col-start-2 lg:tw-col-start-1 tw-rounded-full lg-bg-secondary-100 tw-h-16 tw-w-16 lg:tw-h-20 lg:tw-w-20 tw-grid tw-items-center tw-justify-center tw-place-self-center">
                    <img
                        className="tw-w-8 tw-h-8 lg:tw-w-10 lg:tw-h-10 tw-invert dark:tw-invert-0"
                        src="https://files.growthjockey.com/livguard/icons/service/whatsapp-us.svg"
                    />
                </div>

                <VerticalSpacer className="tw-h-4 tw-row-start-2 lg:tw-row-start-1 lg:tw-hidden" />

                <div className="tw-row-start-3 lg:tw-row-start-1 tw-col-start-2 lg:tw-col-start-3 tw-grid tw-grid-flow-row tw-gap-4">
                    <div className="lg-text-body tw-row-start-1">{getVernacularString("contactUsS2Option2Text", userPreferences.language)}</div>

                    <button
                        className="lg-cta-button tw-w-[11.875rem] tw-place-self-center lg:tw-place-self-start tw-row-start-2"
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
            <div className="tw-row-start-[9] lg:lg-bg-secondary-300 lg-text-secondary-900 tw-rounded-lg tw-grid tw-grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:tw-grid-cols-[auto_1.5rem_minmax(0,1fr)] tw-items-center tw-px-4 tw-py-4">
                <div className="tw-row-start-1 tw-col-start-2 lg:tw-col-start-1 tw-rounded-full lg-bg-secondary-100 tw-h-16 tw-w-16 lg:tw-h-20 lg:tw-w-20 tw-grid tw-items-center tw-justify-center tw-place-self-center">
                    <img
                        className="tw-w-8 tw-h-8 lg:tw-w-10 lg:tw-h-10 tw-invert dark:tw-invert-0"
                        src="https://files.growthjockey.com/livguard/icons/service/email-us.svg"
                    />
                </div>

                <VerticalSpacer className="tw-h-4 tw-row-start-2 lg:tw-row-start-1 lg:tw-hidden" />

                <div className="tw-row-start-3 lg:tw-row-start-1 tw-col-start-2 lg:tw-col-start-3 tw-grid tw-grid-flow-row tw-gap-4">
                    <div className="lg-text-body tw-row-start-1">{getVernacularString("contactUsS2Option3Text", userPreferences.language)}</div>

                    <button
                        className="lg-cta-button tw-w-[11.875rem] tw-place-self-center lg:tw-place-self-start tw-row-start-2"
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
        <div className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-flow-row lg-px-screen-edge-2 lg:tw-pl-0 lg:lg-pr-screen-edge-2", className)}>
            <DefaultTextAnimation className="tw-row-start-1 lg-text-headline tw-text-center lg:tw-text-left">
                <div dangerouslySetInnerHTML={{__html: appendSpaceToString(getVernacularString("contactUsS2H", userPreferences.language))}} />
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-2 lg:tw-h-4 tw-row-start-2" />

            <DefaultTextAnimation className="tw-row-start-3 lg-text-headline tw-text-center lg:tw-text-left">
                <div className="lg-text-body">{getVernacularString("contactUsS2HText", userPreferences.language)}</div>
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-2 lg:tw-h-6 tw-row-start-4" />

            <CallUsCard />

            <VerticalSpacer className="tw-h-2 lg:tw-h-6 tw-row-start-6" />

            <WhatsappUsCard />

            <VerticalSpacer className="tw-h-2 lg:tw-h-6 tw-row-start-[8]" />

            <EmailUsCard />

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
                                to={dialogType == "call-us" ? "tel:800-1025-551" : dialogType == "email-us" ? "mailto:livserv@sar-group.com" : "https://wa.me/7428191000"}
                                className="tw-w-full lg-bg-primary-500 tw-text-secondary-900-dark tw-py-3 tw-px-4 tw-rounded-full"
                            >
                                <div className="tw-flex tw-flex-row tw-items-center">
                                    <div className="tw-flex-1">{dialogType == "call-us" ? "800-1025-551" : dialogType == "email-us" ? "livserv@sar-group.com" : "7428191000"}</div>

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

                            <div className="lg-text-title2">{getVernacularString("headerContactUsDialogT3", userPreferences.language)}</div>

                            <VerticalSpacer className="tw-h-2" />

                            <Link
                                to={dialogType == "call-us" ? "tel:+919205667999" : dialogType == "email-us" ? "marketing@livguard.com" : "https://wa.me/920566799"}
                                className="tw-w-full lg-bg-primary-500 tw-text-secondary-900-dark tw-py-3 tw-px-4 tw-rounded-full"
                            >
                                <div className="tw-flex tw-flex-row tw-items-center">
                                    <div className="tw-flex-1">{dialogType == "call-us" ? "+91 92056-67999" : dialogType == "email-us" ? "marketing@livguard.com" : "+91 92056-6799"}</div>

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
                        </div>
                    </Transition.Child>
                </Dialog.Panel>

                <div onClick={tryToCloseContactUsDialog} />
            </Dialog>
        </Transition>
    );
}

function Testimonials({userPreferences, className}: {userPreferences: UserPreferences; className: string}) {
    return (
        <>
            <div className={className}>
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
                                />
                            ),
                            name: `${getVernacularString("review1Name", userPreferences.language)}`,
                            rating: 5,
                            state: `${getVernacularString("review1State", userPreferences.language)}`,
                            message: `${getVernacularString("review1Message", userPreferences.language)}`,
                            productImage: "/livguard/products/jodis/peace-of-mind-jodi/thumbnail.png",
                            productName: `${getVernacularString("review1ProductName", userPreferences.language)}`,
                        },
                        {
                            video: (
                                <EmbeddedYoutubeVideo
                                    id="pNMTMVDWtiU"
                                    style={{aspectRatio: "560/315"}}
                                />
                            ),
                            name: `${getVernacularString("review2Name", userPreferences.language)}`,
                            rating: 5,
                            state: `${getVernacularString("review2State", userPreferences.language)}`,
                            message: `${getVernacularString("review2Message", userPreferences.language)}`,
                            productImage: "/livguard/products/jodis/urban-jodi/thumbnail.png",
                            productName: `${getVernacularString("review2ProductName", userPreferences.language)}`,
                        },
                        {
                            name: `${getVernacularString("review3Name", userPreferences.language)}`,
                            rating: 5,
                            state: `${getVernacularString("review3State", userPreferences.language)}`,
                            message: `${getVernacularString("review3Message", userPreferences.language)}`,
                            productImage: "/livguard/products/inverters/lgs1100i/thumbnail.png",
                            productName: `${getVernacularString("review3ProductName", userPreferences.language)}`,
                        },
                        {
                            name: `${getVernacularString("review4Name", userPreferences.language)}`,
                            rating: 4,
                            state: `${getVernacularString("review4State", userPreferences.language)}`,
                            message: `${getVernacularString("review4Message", userPreferences.language)}`,
                            productImage: "/livguard/products/jodis/urban-jodi/thumbnail.png",
                            productName: `${getVernacularString("review4ProductName", userPreferences.language)}`,
                        },
                    ]}
                />
            </div>
        </>
    );
}

function WarrantyBanner({userPreferences, className}: {userPreferences: UserPreferences; className: string}) {
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-h-[60vh] lg:tw-h-[40vh] tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_auto_1rem_auto_2.5rem] lg:tw-grid-rows-[minmax(0,1fr)_auto_auto_1.25rem_auto_minmax(0,1fr)] tw-text-center lg:tw-text-left lg:tw-grid-cols-[minmax(0,1fr)_minmax(0,1fr)]",
                className,
            )}
            ref={ref}
        >
            {containerWidth == null || containerHeight == null ? null : (
                <>
                    <CoverImage
                        relativePath={
                            containerHeight > containerWidth || containerWidth < 640 ? "/livguard/services-page/6/warranty_mobile_banner.jpg" : "/livguard/services-page/6/warranty_banner_desktop.jpg"
                        }
                        className="tw-row-start-1 tw-col-start-1 tw-row-span-full tw-col-span-full"
                        key={
                            containerHeight > containerWidth || containerWidth < 640 ? "/livguard/services-page/6/warranty_mobile_banner.jpg" : "/livguard/services-page/6/warranty_banner_desktop.jpg"
                        }
                    />
                </>
            )}

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

            <DefaultTextAnimation className="tw-flex tw-justify-center tw-row-start-6 lg:tw-row-start-5 tw-col-start-1 lg-px-screen-edge-2">
                <button className="lg-text-body tw-px-10 tw-py-4 lg-cta-button tw-max-w-fit !tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-center tw-text-center">
                    {getVernacularString("d1030527-97b8-4772-9810-e98c5c0b30c3", userPreferences.language)}
                </button>
            </DefaultTextAnimation>
        </div>
    );
}

function FaqSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const faqs = [
        {
            question: "homeS9Q1Q",
            answer: "homeS9Q1A",
        },
        {
            question: "homeS9Q2Q",
            answer: "homeS9Q2A",
        },
        {
            question: "homeS9Q3Q",
            answer: "homeS9Q3A",
        },
        {
            question: "homeS9Q4Q",
            answer: "homeS9Q4A",
        },
        {
            question: "homeS9Q5Q",
            answer: "homeS9Q5A",
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
