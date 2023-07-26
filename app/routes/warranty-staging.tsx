import {Dialog, Transition} from "@headlessui/react";
import {ActionFunction, LinksFunction, LoaderFunction, json} from "@remix-run/node";
import {Form, Link, useActionData, useFetcher, useSubmit} from "@remix-run/react";
import React, {useEffect, useReducer, useRef} from "react";
import {useState} from "react";
import {Envelope, Telephone, Whatsapp, X} from "react-bootstrap-icons";
import {useResizeDetector} from "react-resize-detector";
import {useLoaderData} from "react-router";
import {toast} from "react-toastify";
import {insertWarrantyFormLeads, uploadFileToS3} from "~/backend/dealer.server";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {CoverImage} from "~/components/images/coverImage";
import {FixedWidthImage} from "~/components/images/fixedWidthImage";
import {PageScaffold} from "~/components/pageScaffold";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {ImageCdnProvider} from "~/global-common-typescript/typeDefinitions";
import {getStringFromUnknown, getUuidFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {concatenateNonNullStringsWithSpaces, generateUuid} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {emailIdValidationPattern, indianPhoneNumberValidationPattern, pinCodeValidationPattern} from "~/global-common-typescript/utilities/validationPatterns";
import {FaqSectionInternal} from "~/components/faqs";
import {useEmblaCarouselWithIndex} from "~/hooks/useEmblaCarouselWithIndex";
import {FormSelectComponent} from "~/livguard-common-typescript/scratchpad";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {UserPreferences} from "~/typeDefinitions";
import {appendSpaceToString, getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";
import {
    WarrantyFormActionTypes,
    WarrantyFormReducer,
    WarrantyFormStateInputsAction,
    warrantyFormErrorMessages,
    warrantyFormInitialState,
    WarrantyFormFieldKeys,
    WarrantyFormStateInputs,
} from "~/routes/warranty-form-state";
import {getFormSelectProductItems} from "~/routes/contact-us";
import {SocialMediaIcons} from "~/components/footers/common";

// export const meta: MetaFunction = ({data}: {data: LoaderData}) => {
//     const userPreferences: UserPreferences = data.userPreferences;
//     if (userPreferences.language == Language.English) {
//         return {
//             title: "Buy Inverter Battery Online at Best Prices In India",
//             description: "Invest in the best inverter batteries for your home with Livguard. Experience efficiency and comfort with the battery's long life",
//         };
//     } else if (userPreferences.language == Language.Hindi) {
//         return {
//             title: "भारत में सर्वोत्तम मूल्य पर इनवर्टर बैटरी ऑनलाइन खरीदें",
//             description: "लिवगार्ड के साथ अपने घर के लिए सर्वश्रेष्ठ इनवर्टर बैटरी में निवेश करें। बैटरी के लंबे जीवन के साथ क्षमता और आराम का अनुभव करें",
//         };
//     } else {
//         throw Error(`Undefined language ${userPreferences.language}`);
//     }
// };

export const links: LinksFunction = () => {
    return [{rel: "canonical", href: "https://www.livguard.com/contact-us/"}];
};

export type ActionData = {
    error: string | null;
};

export const action: ActionFunction = async ({request, params}) => {
    const body = await request.formData();

    const uuid = safeParse(getUuidFromUnknown, body.get("uuid"));
    const jsonData = safeParse(getStringFromUnknown, body.get("registerFormDetails"));
    if (jsonData != null) {
        const jsonDataParsed = JSON.parse(jsonData);

        if (jsonDataParsed != null) {
            const contactNumber = safeParse(getStringFromUnknown, jsonDataParsed.contactNumber);
            const email = safeParse(getStringFromUnknown, jsonDataParsed.contactNumber);
            const name = safeParse(getStringFromUnknown, jsonDataParsed.contactNumber);
            const pincode = safeParse(getStringFromUnknown, jsonDataParsed.contactNumber);
            const city = safeParse(getStringFromUnknown, jsonDataParsed.contactNumber);
            const state = safeParse(getStringFromUnknown, jsonDataParsed.contactNumber);
            const products = safeParse(getStringFromUnknown, jsonDataParsed.contactNumber);

            if (contactNumber == null || email == null || name == null || pincode == null || city == null || state == null || products == null || uuid == null) {
                const actionData: ActionData = {
                    error: "Inputs cannot be null! Error code: 2efe2d0b-c43b-4679-8eb2-f55be853623b",
                };
                return json(actionData);
            }

            jsonDataParsed.products = await Promise.all(
                jsonDataParsed.products.map(async (product, productIndex) => {
                    const fileBlob = body.get(`purchaseProof${productIndex}`);

                    let fileObj = {
                        fileBlob: fileBlob,
                        name: product.purchaseProof,
                    };

                    const imageUrl = await uploadFileToS3(fileObj);
                    return {
                        ...product,
                        purchaseProof: imageUrl,
                    };
                }),
            );

            const insertResult = await insertWarrantyFormLeads(uuid, jsonDataParsed);

            if (insertResult instanceof Error) {
                const actionData: ActionData = {
                    error: "Error in submiting form! Error code: 7b84af66-174a-4b89-bbfa-3a51d9aa8862",
                };
                return json(actionData);
            }

            // localStorage.setItem("warrantyFormRecordUUID", uuid);

            const actionData: ActionData = {
                error: null,
            };

            return json(actionData);
        }
    }

    const actionData: ActionData = {
        error: "Products cannot be null! Error code: ed2e5952-7818-4bfc-9f18-fc1d6e947df0",
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
                <WarrantyRegistrationPage
                    userPreferences={userPreferences}
                    utmParameters={utmSearchParameters}
                    actionData={actionData}
                />
            </PageScaffold>
        </>
    );
}

function WarrantyRegistrationPage({userPreferences, utmParameters, actionData}: {userPreferences: UserPreferences; utmParameters: {[searchParameter: string]: string}; actionData: ActionData}) {
    return (
        <div className="tw-grid tw-grid-cols-1 tw-gap-x-16 tw-items-start tw-justify-center">
            <HeroSection
                userPreferences={userPreferences}
                className="tw-row-start-1 tw-w-full"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-14 tw-row-start-2" />

            <RegisterInMinutes
                userPreferences={userPreferences}
                className="tw-row-start-5 tw-max-w-3xl tw-mx-auto lg-px-screen-edge-2"
                actionData={actionData}
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-4" />

            <SeamlessService
                userPreferences={userPreferences}
                className="tw-row-start-3 tw-max-w-7xl tw-mx-auto"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-6" />

            <ContactTeamOfExperts
                userPreferences={userPreferences}
                className="tw-row-start-7 tw-max-w-7xl tw-mx-auto"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[8]" />

            <RequestAServiceBanner
                userPreferences={userPreferences}
                className="tw-row-start-9 tw-max-w-7xl tw-mx-auto lg-px-screen-edge-2"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-10" />

            <FaqSection
                userPreferences={userPreferences}
                className="tw-row-start-11 tw-max-w-7xl tw-mx-auto lg-px-screen-edge-2"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-12" />
        </div>
    );
}

function HeroSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height)-9.5rem)] lg:tw-h-[70vh] tw-grid tw-grid-rows-[minmax(3.5rem,1fr)_auto_auto_1rem_auto_3rem] lg:tw-grid-rows-[minmax(0,1fr)_auto_auto_1rem_auto_minmax(0,1fr)] tw-text-center lg:tw-grid-cols-2",
                className,
            )}
            ref={ref}
        >
            {containerWidth == null || containerHeight == null ? null : (
                <CoverImage
                    relativePath={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/warranty/1/warranty_mobile_banner.jpg" : "/livguard/warranty/1/warranty_banner_desktop.jpg"}
                    className="tw-row-start-1 tw-col-start-1 tw-col-span-full tw-row-span-full"
                    key={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/contact-us/1/mobile_hero.jpg" : "/livguard/contact-us/1/desktop_hero.jpg"}
                />
            )}

            <DefaultTextAnimation className="tw-row-start-2 tw-col-start-1">
                <div className="lg-text-banner lg-px-screen-edge-2 tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">
                    {getVernacularString("8a3404ac-d12b-47f2-bc31-5d9411a55fde", userPreferences.language)}
                </div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-3 tw-col-start-1">
                <div className="lg-text-banner lg-px-screen-edge-2 tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">
                    {getVernacularString("e979cb3b-1a68-45bd-a7cd-0e20d389f91d", userPreferences.language)}
                </div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-5 tw-col-start-1">
                <div className="lg-text-body lg-px-screen-edge-2 !tw-text-secondary-900-dark">{getVernacularString("e631b621-5214-4ef4-a2d6-1b6126137c00", userPreferences.language)}</div>
            </DefaultTextAnimation>
        </div>
    );
}

function SeamlessService({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    function ReadMore({text, className}: {text: string; className?: string}) {
        const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();
        const [isReadMore, setIsReadMore] = useState(false);
        const toggleReadMore = () => {
            setIsReadMore(!isReadMore);
        };

        const [cutoffIndex, setCutoffIndex] = useState(0);
        useEffect(() => {
            if (containerHeight !== undefined && containerWidth !== undefined) {
                if (containerWidth < 640) {
                    setCutoffIndex(225);
                    return;
                }

                setCutoffIndex(444);
            }
        }, [containerWidth]);

        return (
            <div
                className={className}
                ref={ref}
            >
                <p className="lg-text-body">
                    <span dangerouslySetInnerHTML={{__html: !isReadMore && text.length > cutoffIndex ? `${text.slice(0, cutoffIndex)}<span>...</span>` : text}} />
                    &nbsp;
                    <span
                        onClick={toggleReadMore}
                        className="tw-text-primary-500-dark tw-underline tw-cursor-pointer"
                    >
                        {text.length > cutoffIndex && <>{isReadMore ? "Show Less" : "Read More"}</>}
                    </span>
                </p>
            </div>
        );
    }

    function SeamlessServiceCard({iconUrl, title, className}: {iconUrl: string; title: string; className?: string}) {
        return (
            <>
                <div className={concatenateNonNullStringsWithSpaces("tw-flex tw-flex-col tw-items-center tw-justify-center lg:tw-flex-row tw-px-2", className)}>
                    <div className="tw-rounded-full tw-w-16 tw-h-16 lg-bg-secondary-100 tw-mb-2 lg:tw-mr-2 lg:tw-mb-0 tw-flex tw-justify-center tw-items-center">
                        <img
                            src={getAbsolutePathForRelativePath(getMetadataForImage(iconUrl).finalUrl, ImageCdnProvider.Bunny, null, null)}
                            alt=""
                            className="tw-invert dark:tw-invert-0"
                        />
                    </div>
                    <div className="tw-text-center">{title}</div>
                </div>
            </>
        );
    }

    const seamlessServices = [
        {
            iconUrl: "/livguard/warranty/2/quick-registration.svg",
            title: getVernacularString("5f2ff78d-56a6-4f19-87d2-03342967850b", userPreferences.language),
        },
        {
            iconUrl: "/livguard/warranty/2/paperless-warranty.svg",
            title: getVernacularString("08cd30f4-21ca-442c-8533-0a0ea8519c3b", userPreferences.language),
        },
        {
            iconUrl: "/livguard/warranty/2/effortless-experience.svg",
            title: getVernacularString("a0e00e4e-7130-489c-9fe1-7a9fad0f3aa7", userPreferences.language),
        },
    ];

    return (
        <>
            <div className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-rows-[auto_0.5rem_auto_1rem_auto_2rem_auto_1rem_auto_minmax(0,1fr)] lg-px-screen-edge-2", className)}>
                <div
                    dangerouslySetInnerHTML={{__html: getVernacularString("4c465a92-fb45-41f3-9fc5-dfed80962b12", userPreferences.language)}}
                    className="tw-row-start-1 lg-text-headline tw-text-center tw-mb-1"
                />

                <div className="tw-row-start-3 lg-text-title2 tw-text-center">{getVernacularString("dc2254fc-6ca8-49f7-a007-7e833db77009", userPreferences.language)}</div>

                <ReadMore
                    className="tw-row-start-5 tw-text-center"
                    text={getVernacularString("7bd7f0d0-1ba0-43f9-82be-0d7f05c21578", userPreferences.language)}
                />

                <div className="tw-row-start-7 lg-text-title2 tw-text-center">{getVernacularString("7ad4e46b-f080-4885-a39b-7b752906698f", userPreferences.language)}</div>

                <div className="tw-row-start-9 tw-grid tw-grid-cols-[repeat(3,minmax(0,1fr))] lg:lg-px-screen-edge-2">
                    {seamlessServices.map((serviceSpeciality, index) => {
                        return (
                            <SeamlessServiceCard
                                key={index}
                                title={serviceSpeciality.title}
                                iconUrl={serviceSpeciality.iconUrl}
                                className={index !== seamlessServices.length - 1 ? "lg:tw-border-r-2 lg:tw-border-secondary-300-dark" : ""}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
}

function RegisterInMinutes({userPreferences, className, actionData}: {userPreferences: UserPreferences; className?: string; actionData: ActionData}) {
    const {emblaRef, emblaApi, selectedIndex} = useEmblaCarouselWithIndex({loop: false});
    const utmSearchParameters = useUtmSearchParameters();

    const [isRegisterProductFormSubmitted, setIsRegisterProductFormSubmitted] = useState(false);
    const [isRegisterProductFormTermsAndConditionsChecked, setIsRegisterProductFormTermsAndConditionsChecked] = useState(true);
    const [registerProductFormSelectedProduct, setRegisterProductFormSelectedProduct] = useState([
        {
            productType: "",
            serialNumber: "",
            proofOfPurchase: "",
        },
    ]);

    const uuidRef = useRef(generateUuid());

    const [registerFormStepNumber, setRegisterFormStepNumber] = useState(1);

    const [warrantyFormState, dispatchWarrantyFormAction] = useReducer(WarrantyFormReducer, warrantyFormInitialState);
    const [warrantyDateOfBirthSubmitted, setWarrantyDateOfBirthSubmitted] = useState(false);
    const fetcher = useFetcher();

    useEffect(() => {
        if (fetcher.data == null) {
            return;
        }

        if (fetcher.data.error != null) {
            toast.error(fetcher.data.error);
            return;
        }

        if (fetcher.data.submitedSuccessfully) {
            setWarrantyDateOfBirthSubmitted(true);
        }
    }, [fetcher.data]);

    const validateFormStep1 = () => {
        // Checking if any field is either empty or invalid based on the provided pattern
        return Object.keys(warrantyFormState).every((key) => {
            const enumKey: keyof typeof WarrantyFormFieldKeys = key as WarrantyFormFieldKeys;
            if (warrantyFormState[enumKey] == null || warrantyFormState[enumKey] === "") {
                toast.error(warrantyFormErrorMessages[enumKey].emptyMessage);
                return false;
            }

            // Checking if a pattern has been provided for this key
            if (Object.keys(warrantyFormErrorMessages[enumKey]).includes("pattern") && warrantyFormErrorMessages[enumKey].pattern !== "") {
                // Since products are stored in an array, their validation has to be handled slightly differently
                if (key !== WarrantyFormFieldKeys.products) {
                    // Since there is only one non string key in WarrantyFormFieldKeys enum, we have already filtered that, so we can safely use ts-ignore for this error
                    if (!warrantyFormState[enumKey].match(warrantyFormErrorMessages[enumKey].pattern)) {
                        // If pattern doesn't match, show invalid message
                        toast.error(warrantyFormErrorMessages[enumKey].invalidMessage);
                        return false;
                    }
                }
            }
            return true;
        });
    };

    const validateFormStep2 = () => {
        return warrantyFormState.products.every((product, productIndex) => {
            return Object.keys(product).every((key) => {
                if (key in product && product[key] != null && product[key] !== "") {
                    return true;
                }

                toast.error(`${warrantyFormErrorMessages[WarrantyFormFieldKeys.products][key].emptyMessage} for product ${productIndex + 1}`);
                return false;
            });
        });
    };

    let submit = useSubmit();
    const submitRef = useRef<HTMLFormElement>();

    const [isViewProductFormSubmitted, setIsViewProductFormSubmitted] = useState(false);
    const [isViewProductFormTermsAndConditionsChecked, setIsViewProductFormTermsAndConditionsChecked] = useState(true);
    const [viewProductFormOption, setViewProductFormOption] = useState(getVernacularString("contactUsS3ComplaintFormRadioOption1", userPreferences.language));

    useEffect(() => {
        if (actionData != null) {
            if (actionData.error != null) {
                toast.error("Error in submitting form! Error code: 8893a658-1ab9-43e3-8998-2031d9a00672");
                return;
            }

            setIsRegisterProductFormSubmitted(true);

            // if (actionData.formType != null) {
            //     if (actionData.formType == "registerProductForm") {
            //         setIsRegisterProductFormSubmitted(true);
            //     } else if (actionData.formType == "viewProductForm") {
            //         setIsViewProductFormSubmitted(true);
            //     }
            // }
        }
    }, [actionData]);

    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-flow-row tw-grid-cols-1 tw-justify-center tw-w-full", className)}>
            <DefaultTextAnimation className="tw-row-start-1 lg-text-headline tw-text-center tw-w-full">
                <div dangerouslySetInnerHTML={{__html: appendSpaceToString(getVernacularString("b4c42c87-1ee1-4f06-8cff-abe7751a025c", userPreferences.language))}} />
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-6 tw-row-start-2" />

            {/* <div className="tw-grid tw-row-start-3 tw-grid-cols-2 tw-gap-2 tw-items-center tw-px-2">
                <button
                    className={`tw-rounded tw-flex-none sm:tw-flex tw-max-w-fit tw-p-3 tw-gap-2  ${selectedIndex == 0 ? "lg-bg-gradient-dark" : "tw-bg-black"}`}
                    onClick={() => emblaApi?.scrollTo(0)}
                >
                    <div className="lg-bg-secondary-100 tw-max-w-fit  tw-m-auto sm:tw-m-2 tw-p-3 tw-aspect-square tw-w-20 tw-rounded-full tw-flex tw-justify-center tw-items-center">
                        <img
                            src="https://files.growthjockey.com/livguard/icons/warranty/register-product.svg"
                            alt=""
                        />
                    </div>
                    <p className="tw-self-center tw-text-center">{getVernacularString("headerMenuS1T7", userPreferences.language)}</p>
                </button>
                <button
                    className={`tw-rounded tw-flex-none sm:tw-flex tw-p-3 tw-max-w-fit tw-gap-2  ${selectedIndex == 1 ? "lg-bg-gradient-dark" : "tw-bg-black"} `}
                    onClick={() => emblaApi?.scrollTo(1)}
                >
                    <div className="lg-bg-secondary-100 tw-m-auto sm:tw-m-2 tw-p-3 tw-max-w-fit tw-aspect-square tw-w-20 tw-rounded-full tw-flex tw-justify-center tw-items-center">
                        <img
                            src="https://files.growthjockey.com/livguard/icons/warranty/register-product.svg"
                            alt=""
                        />
                    </div>
                    <p className="tw-self-center tw-text-center">{getVernacularString("13c626bb-768d-46c7-917e-bff245315f64", userPreferences.language)}</p>
                </button>
            </div> */}

            <div className="tw-row-start-3 tw-col-span-full tw-w-full">
                <div
                    className="tw-overflow-hidden tw-w-full"
                    // ref={emblaRef}
                >
                    <div className="tw-grid tw-grid-flow-col tw-auto-cols-[100%] tw-gap-2 tw-w-full">
                        <div className="tw-grid tw-grid-flow-row tw-w-full">
                            {!isRegisterProductFormSubmitted ? (
                                <Form
                                    method="post"
                                    className="tw-grid tw-grid-flow-row tw-w-full tw-gap-4"
                                    encType="multipart/form-data"
                                    ref={submitRef}
                                >
                                    {registerFormStepNumber === 1 ? (
                                        <>
                                            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-4 lg:tw-gap-2">
                                                <div className="tw-row-start-1 tw-col-start-1 tw-grid tw-grid-flow-row tw-gap-2">
                                                    <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">
                                                        {getVernacularString("7ce4697b-82b4-47c3-944d-0c7edbcd1ccd", userPreferences.language)}
                                                    </div>

                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        className="lg-text-input"
                                                        pattern={indianPhoneNumberValidationPattern}
                                                        placeholder={getVernacularString("74bef278-2e4e-4568-868b-7ce5d50df6e2", userPreferences.language)}
                                                        value={warrantyFormState.contactNumber}
                                                        onChange={(e) => {
                                                            const action: WarrantyFormStateInputsAction = {
                                                                type: WarrantyFormActionTypes.SetContactNumber,
                                                                payload: e.target.value,
                                                            };
                                                            dispatchWarrantyFormAction(action);
                                                        }}
                                                    />
                                                </div>

                                                <div className="tw-row-start-2 lg:tw-row-start-1 tw-col-start-1 lg:tw-col-start-2 tw-grid tw-grid-flow-row tw-gap-2">
                                                    <div className="lg-text-body lg-text-secondary-900">{getVernacularString("1e26fc77-d6ce-496f-8a43-b0ff4d3f1f7e", userPreferences.language)}</div>

                                                    <input
                                                        type="email"
                                                        name="emailId"
                                                        pattern={emailIdValidationPattern}
                                                        className="lg-text-input"
                                                        placeholder={getVernacularString("17b9c40e-9c7d-4a19-8202-b294967fdff8", userPreferences.language)}
                                                        value={warrantyFormState.email}
                                                        onChange={(e) => {
                                                            const action: WarrantyFormStateInputsAction = {
                                                                type: WarrantyFormActionTypes.SetEmail,
                                                                payload: e.target.value,
                                                            };
                                                            dispatchWarrantyFormAction(action);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-4 lg:tw-gap-2">
                                                <div className="tw-col-start-1 tw-grid tw-grid-flow-row tw-gap-2">
                                                    <div className="lg-text-body lg-text-secondary-900">{getVernacularString("70c4b348-67de-4873-bb1e-8d060f7d98c8", userPreferences.language)}</div>

                                                    <input
                                                        type="text"
                                                        name="name"
                                                        className="lg-text-input"
                                                        placeholder={getVernacularString("5249c7c4-1840-410d-b6c7-f4c53ab8369a", userPreferences.language)}
                                                        value={warrantyFormState.name}
                                                        onChange={(e) => {
                                                            const action: WarrantyFormStateInputsAction = {
                                                                type: WarrantyFormActionTypes.SetName,
                                                                payload: e.target.value,
                                                            };
                                                            dispatchWarrantyFormAction(action);
                                                        }}
                                                    />
                                                </div>

                                                <div className="tw-col-start-1 lg:tw-col-start-2 tw-grid tw-grid-flow-row tw-gap-2">
                                                    <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">
                                                        {getVernacularString("53927c84-bd54-4a11-b284-7f3844f30c4e", userPreferences.language)}
                                                    </div>

                                                    <input
                                                        type="number"
                                                        name="pinCode"
                                                        pattern={pinCodeValidationPattern}
                                                        className="lg-text-input"
                                                        placeholder={getVernacularString("a73f6868-bb95-4bc4-9911-aed2ae6cc695", userPreferences.language)}
                                                        value={warrantyFormState.pincode}
                                                        onChange={(e) => {
                                                            const action: WarrantyFormStateInputsAction = {
                                                                type: WarrantyFormActionTypes.SetPincode,
                                                                payload: e.target.value,
                                                            };
                                                            dispatchWarrantyFormAction(action);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-4 lg:tw-gap-2">
                                                <div className="tw-col-start-1 tw-grid tw-grid-flow-row tw-gap-2">
                                                    <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">
                                                        {getVernacularString("5132b06f-9057-4e22-a21e-aca383247dda", userPreferences.language)}
                                                    </div>
                                                    <input
                                                        type="text"
                                                        placeholder={getVernacularString("154d8f5a-9084-4860-b588-c17bb178226e", userPreferences.language)}
                                                        name="city"
                                                        className="lg-text-input"
                                                        value={warrantyFormState.city}
                                                        onChange={(e) => {
                                                            const action: WarrantyFormStateInputsAction = {
                                                                type: WarrantyFormActionTypes.SetCity,
                                                                payload: e.target.value,
                                                            };
                                                            dispatchWarrantyFormAction(action);
                                                        }}
                                                    />
                                                </div>

                                                <div className="tw-col-start-1 lg:tw-col-start-2 tw-grid tw-grid-flow-row tw-gap-2">
                                                    <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">
                                                        {getVernacularString("a677f88a-dabc-45d5-8542-9954d0c7535b", userPreferences.language)}
                                                    </div>

                                                    <input
                                                        type="text"
                                                        placeholder={getVernacularString("9fdfab81-7e99-4e76-8fbb-d1c3b634a735", userPreferences.language)}
                                                        name="state"
                                                        className="lg-text-input"
                                                        value={warrantyFormState.state}
                                                        onChange={(e) => {
                                                            const action: WarrantyFormStateInputsAction = {
                                                                type: WarrantyFormActionTypes.SetState,
                                                                payload: e.target.value,
                                                            };
                                                            dispatchWarrantyFormAction(action);
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="tw-place-self-center tw-w-full tw-mt-2 tw-grid tw-justify-items-center">
                                                <button
                                                    type="button"
                                                    className="tw-w-full lg-cta-button lg:tw-w-1/2"
                                                    onClick={() => {
                                                        if (validateFormStep1()) {
                                                            setRegisterFormStepNumber(2);
                                                        }
                                                    }}
                                                >
                                                    {getVernacularString("79acc43f-692e-439a-ae40-75f7f0e60c95", userPreferences.language)}
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        registerFormStepNumber === 2 && (
                                            <>
                                                <div className="tw-grid tw-gap-y-8">
                                                    {warrantyFormState.products.map((productField, index) => (
                                                        <RegisterFormProductInputFields
                                                            userPreferences={userPreferences}
                                                            index={index}
                                                            warrantyFormState={warrantyFormState}
                                                            dispatchWarrantyFormAction={dispatchWarrantyFormAction}
                                                            key={index}
                                                        />
                                                    ))}
                                                </div>

                                                <div className="tw-grid tw-grid-cols-2 tw-gap-2">
                                                    <button
                                                        type="button"
                                                        className="tw-cursor-pointer tw-col-start-1 tw-row-start-1 lg-text-body lg-text-secondary-900 tw-border lg-border-primary-500 tw-my-3 tw-w-full tw-place-self-center lg:tw-place-self-start tw-rounded-full tw-p-2 tw-col-span-1"
                                                        onClick={() => {
                                                            const action: WarrantyFormStateInputsAction = {
                                                                type: WarrantyFormActionTypes.SetProducts,
                                                                payload: {
                                                                    type: "addProduct",
                                                                },
                                                            };
                                                            dispatchWarrantyFormAction(action);
                                                        }}
                                                    >
                                                        {getVernacularString("988b89be-d6ef-4008-9faf-c5b6cb3eea06", userPreferences.language)}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className={`tw-cursor-pointer tw-col-start-2 tw-row-start-1 lg-text-primary-500 tw-my-3 tw-w-full tw-place-self-start tw-p-2 tw-pl-0 tw-col-span-1 ${
                                                            warrantyFormState.products.length < 2 ? "tw-hidden" : ""
                                                        }`}
                                                        onClick={() => {
                                                            const action: WarrantyFormStateInputsAction = {
                                                                type: WarrantyFormActionTypes.RemoveProductFromIndex,
                                                                payload: warrantyFormState.products.length - 1,
                                                            };
                                                            dispatchWarrantyFormAction(action);
                                                        }}
                                                    >
                                                        {getVernacularString("46655054-3f4d-46b5-ad00-510a9f00de36", userPreferences.language)}
                                                    </button>
                                                    <div className="tw-row-start-3 lg:tw-row-start-2 tw-col-start-1 tw-col-span-2 tw-flex tw-gap-2">
                                                        <input
                                                            type="checkbox"
                                                            name="termsAndConditionsChecked"
                                                            style={{accentColor: `${isRegisterProductFormTermsAndConditionsChecked ? "#eb2a2b" : "white"}`}}
                                                            defaultChecked={isRegisterProductFormTermsAndConditionsChecked}
                                                            required
                                                            onChange={(e) => {
                                                                setIsRegisterProductFormTermsAndConditionsChecked(!isRegisterProductFormTermsAndConditionsChecked);
                                                            }}
                                                        />

                                                        <div dangerouslySetInnerHTML={{__html: getVernacularString("contactUsTermsAndConditionsCheckboxtext", userPreferences.language)}} />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={(event) => {
                                                            if (validateFormStep2()) {
                                                                submit(submitRef.current != undefined ? submitRef.current : null);
                                                                return true;
                                                            } else {
                                                                return false;
                                                            }
                                                        }}
                                                        className="tw-cursor-pointer tw-row-start-4 lg:tw-row-start-3 tw-col-start-1 tw-col-span-2 lg:tw-col-span-1 tw-my-3 tw-w-full lg-text-body lg-cta-button !tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start tw-rounded-full tw-p-3"
                                                    >
                                                        {getVernacularString("contactUsS3FormButtonText", userPreferences.language)}
                                                    </button>
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
                                                    value="registerProductForm"
                                                />
                                                <input
                                                    readOnly
                                                    name="termsAndConditionsChecked"
                                                    className="tw-hidden"
                                                    value={isRegisterProductFormTermsAndConditionsChecked ? "True" : "False"}
                                                />

                                                <input
                                                    readOnly
                                                    name="registerFormDetails"
                                                    className="tw-hidden"
                                                    value={JSON.stringify(warrantyFormState)}
                                                />

                                                <input
                                                    readOnly
                                                    name="uuid"
                                                    className="tw-hidden"
                                                    value={uuidRef.current}
                                                />
                                            </>
                                        )
                                    )}
                                </Form>
                            ) : (
                                // <ContactFormSuccess userPreferences={userPreferences} />
                                <div className="tw-grid tw-grid-rows-[minmax(2rem,1fr)_auto_2rem_auto_1.25rem_auto_2rem_auto_2.5rem_auto_1.5rem_auto_minmax(2rem,1fr)] tw-w-full tw-h-full tw-rounded-lg tw-border lg-border-secondary-700 tw-justify-center tw-px-6 lg:tw-px-12">
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

                                    <div className="tw-row-start-6 tw-text-center">
                                        {!warrantyDateOfBirthSubmitted
                                            ? getVernacularString("10fb7b8f-7d05-4bf3-9267-ea07410b3e49", userPreferences.language)
                                            : getVernacularString("41bcbb30-f453-487a-be09-bdb22ac8e49c", userPreferences.language)}
                                    </div>

                                    {!warrantyDateOfBirthSubmitted ? (
                                        <fetcher.Form
                                            method="post"
                                            action="/warranty/date-of-birth"
                                            className="tw-row-start-8 tw-grid tw-grid-flow-row"
                                        >
                                            <div className="lg-text-body lg-text-secondary-900">{getVernacularString("b034be5d-2864-4ab3-bdac-d5a12e40e8d8", userPreferences.language)}</div>

                                            <VerticalSpacer className="tw-h-2" />

                                            <input
                                                type="date"
                                                name="dateOfBirth"
                                                className="lg-text-input"
                                                placeholder={getVernacularString("b680144d-0d44-4f46-af80-dcacabae78de", userPreferences.language)}
                                            />

                                            <input
                                                readOnly
                                                name="uuid"
                                                className="tw-hidden"
                                                value={uuidRef.current}
                                            />

                                            <VerticalSpacer className="tw-h-6" />

                                            <button
                                                type="submit"
                                                className="lg-cta-button tw-place-self-center"
                                            >
                                                {getVernacularString("cf74f848-853c-493e-acc9-fb054f374e63", userPreferences.language)}
                                            </button>
                                        </fetcher.Form>
                                    ) : (
                                        <></>
                                    )}

                                    <SocialMediaIcons className="tw-row-start-10 tw-w-full tw-justify-center" />

                                    <div
                                        dangerouslySetInnerHTML={{__html: getVernacularString("bf43b0f2-2e29-4290-a7a6-4fc1bb305c56", userPreferences.language)}}
                                        className="tw-row-start-12 tw-text-center lg-text-body"
                                    />

                                    {/* {rating <div 3 ? (
                                        <div
                                            dangerouslySetInnerHTML={{ __html: getVernacularString("contactPageFeedbackSuccessLowRatingMessage", userPreferences.language) }}
                                            className="lg-text-body tw-row-start-6 tw-text-center"
                                        />
                                    ) : (
                                        <div
                                            dangerouslySetInnerHTML={{ __html: getVernacularString("contactPageFeedbackSuccessHighRatingMessage", userPreferences.language) }}
                                            className="lg-text-body tw-row-start-6 tw-text-center"
                                        />
                                    )} */}
                                </div>
                            )}
                        </div>

                        {/* <div className="tw-grid tw-grid-flow-row">
                            {!isViewProductFormSubmitted ? (
                                <Form
                                    method="post"
                                    className="tw-grid  tw-gap-3 lg:tw-px-2"
                                >

                                    <div className="tw-grid tw-gap-6 tw-row-start-1">
                                        <VerticalSpacer className="tw-h-2 tw-row-start-1" />
                                        <div className="tw-grid tw-row-start-2">
                                            <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">{getVernacularString("contactUsS3FormNumberText", userPreferences.language)}</div>

                                            <input
                                                type="text"
                                                name="phone"
                                                className="lg-text-input tw-row-start-2"
                                                pattern={indianPhoneNumberValidationPattern}
                                                placeholder={getVernacularString("contactUsS3FormNumberPlaceholder", userPreferences.language)}
                                            />
                                        </div>

                                        <div className="tw-flex tw-row-start-3 tw-col-start-1 tw-overflow-hidden tw-w-11/12 tw-justify-center tw-items-center">
                                            <p>..................................................................................................................</p>
                                            <span className="tw-text-white">OR</span>
                                            <span>............................................................................................................</span>
                                        </div>

                                        <div className="tw-grid tw-row-start-4">
                                            <div className="tw-col-start-1 tw-grid ">
                                                <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">
                                                    {getVernacularString("f0b96564-0f72-493f-8d69-11a797004751", userPreferences.language)}
                                                </div>

                                                <input
                                                    type="text"
                                                    name="serialNumber"
                                                    className="lg-text-input"
                                                    placeholder={getVernacularString("cc30e4da-6578-4fe7-8526-5ee7337a6515", userPreferences.language)}
                                                    required
                                                />
                                            </div>

                                            
                                        </div>

                                        <div className="tw-grid tw-row-start-5 tw-grid-flow-col tw-items-center tw-gap-2">
                                            <input
                                                type="checkbox"
                                                name="termsAndConditionsCheckedCheckbox"
                                                style={{accentColor: `${isViewProductFormTermsAndConditionsChecked ? "#eb2a2b" : "white"}`}}
                                                defaultChecked={isViewProductFormTermsAndConditionsChecked}
                                                required
                                                onChange={(e) => {
                                                    setIsViewProductFormTermsAndConditionsChecked(!isViewProductFormTermsAndConditionsChecked);
                                                }}
                                            />

                                            <div dangerouslySetInnerHTML={{__html: getVernacularString("contactUsTermsAndConditionsCheckboxtext", userPreferences.language)}} />
                                        </div>
                                        <button
                                            type="submit"
                                            className="tw-row-start- lg-text-body tw-px-10 tw-py-4 lg-cta-button !tw-text-secondary-900-dark tw-w-1/2 tw-place-self-center lg:tw-place-self-start"
                                        >
                                            {getVernacularString("contactUsS3FormButtonText", userPreferences.language)}
                                        </button>
                                    </div>
                                    <div className="tw-row-start-2">
                                        <input
                                            name="utmParameters"
                                            className="tw-hidden"
                                            readOnly
                                            value={JSON.stringify(utmSearchParameters)}
                                        />
                                        <input
                                            readOnly
                                            className="tw-hidden"
                                            value="viewProductForm"
                                            name="formType"
                                        />
                                        <input
                                            readOnly
                                            name="termsAndConditionsChecked"
                                            className="tw-hidden"
                                            value={isViewProductFormTermsAndConditionsChecked ? "True" : "False"}
                                        />
                                    </div>
                                </Form>
                            ) : (
                                <div className="tw-grid tw-grid-rows-[3.5rem_auto_2rem_auto_1.5rem_auto_1.5rem_auto_1.5rem_auto_minmax(0,1fr)] tw-w-full tw-h-full tw-rounded-lg tw-border lg-border-secondary-700 tw-justify-center">
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

                                    <SocialMediaIcons className="tw-row-start-[8] tw-w-full tw-justify-center" />

                                    <div
                                        dangerouslySetInnerHTML={{__html: getVernacularString("successT3", userPreferences.language)}}
                                        className="lg-text-icon tw-row-start-[10] tw-text-center"
                                    />
                                </div>
                            )}
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

function RegisterFormProductInputFields({
    userPreferences,
    index,
    warrantyFormState,
    dispatchWarrantyFormAction,
}: {
    userPreferences: UserPreferences;
    index: number;
    warrantyFormState: WarrantyFormStateInputs;
    dispatchWarrantyFormAction: React.Dispatch<WarrantyFormStateInputsAction>;
}) {
    const formSelectItems = getFormSelectProductItems(userPreferences.language);
    return (
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-grid-flow-row tw-gap-2">
            {index > 0 && <p className="tw-row-start-1 ">{`${getVernacularString("3060b50b-5b8c-4feb-9abe-4d18a51e39e1", userPreferences.language)} ${index + 1}`}</p>}
            <div className="tw-grid tw-row-start-2 tw-col-start-1 tw-gap-2">
                <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">{getVernacularString("69e30a83-d3d3-4ff3-bba7-b56849edd3c0", userPreferences.language)}</div>

                <FormSelectComponent
                    items={formSelectItems}
                    itemBuilder={(item) => (item == "" ? `${getVernacularString("69e30a83-d3d3-4ff3-bba7-b56849edd3c0", userPreferences.language)}` : `<div class="">${item}</div>`)}
                    value={warrantyFormState.products[index].productType}
                    setValue={(item) => {
                        const action: WarrantyFormStateInputsAction = {
                            type: WarrantyFormActionTypes.SetProducts,
                            payload: {
                                productIndex: index,
                                type: "productType",
                                value: item,
                            },
                        };
                        dispatchWarrantyFormAction(action);
                    }}
                    buttonClassName="!tw-rounded-full"
                />
            </div>
            <div className="tw-grid tw-row-start-3 tw-col-start-1 lg:tw-row-start-2 lg:tw-col-start-2 tw-grid-flow-row tw-gap-2">
                <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">{getVernacularString("f0b96564-0f72-493f-8d69-11a797004751", userPreferences.language)}</div>

                <input
                    type="text"
                    placeholder={getVernacularString("cc30e4da-6578-4fe7-8526-5ee7337a6515", userPreferences.language)}
                    name={`serialNumber${index}`}
                    value={warrantyFormState.products[index].serialNumber}
                    onChange={(event) => {
                        const action: WarrantyFormStateInputsAction = {
                            type: WarrantyFormActionTypes.SetProducts,
                            payload: {
                                productIndex: index,
                                type: "serialNumber",
                                value: event.target?.value,
                            },
                        };
                        dispatchWarrantyFormAction(action);
                    }}
                    className="lg-text-input"
                />
            </div>
            <div className="tw-grid tw-row-start-4 lg:tw-row-start-3 tw-grid-flow-row tw-gap-2">
                <div className="lg-text-body lg-text-secondary-900 tw-row-start-1 tw-col-start-1">{getVernacularString("a678f917-a247-4e95-99f2-303db4d122c9", userPreferences.language)}</div>

                <input
                    type="file"
                    accept="image/*"
                    name={`purchaseProof${index}`}
                    className="lg-text-input tw-col-start-1 tw-w-1/2 lg:tw-w-full"
                    onChange={(e) => {
                        if (e.target.files != null && e.target.files.length > 0) {
                            const action: WarrantyFormStateInputsAction = {
                                type: WarrantyFormActionTypes.SetProducts,
                                payload: {
                                    productIndex: index,
                                    type: "purchaseProof",
                                    value: e.target.files[0].name,
                                },
                            };
                            dispatchWarrantyFormAction(action);
                        }
                    }}
                    placeholder={getVernacularString("ae64dabe-c22a-429b-9868-5b19b57559a8", userPreferences.language)}
                />
                <p className="lg-text-secondary-900 lg-text-icon tw-row-start-3 tw-w-1/2 lg:tw-w-full">{getVernacularString("a704f8f5-79db-437c-8f23-d64a634899a7", userPreferences.language)}</p>

                {index !== warrantyFormState.products.length - 1 && (
                    <>
                        <VerticalSpacer className="tw-h-4" />
                        <button
                            className="lg-cta-outline-button !lg-text-secondary-900 tw-w-1/2 lg:tw-w-full tw-px-2"
                            onClick={() => {
                                const action: WarrantyFormStateInputsAction = {
                                    type: WarrantyFormActionTypes.RemoveProductFromIndex,
                                    payload: index,
                                };
                                dispatchWarrantyFormAction(action);
                            }}
                        >
                            {getVernacularString("7c3fd7d9-651f-4e02-803e-a5bf1efdc519", userPreferences.language)}
                        </button>
                    </>
                )}
            </div>
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

                                    {dialogType == "call-us" && <Telephone className="tw-w-6 tw-h-6 tw-flex-0" />}

                                    {dialogType == "email-us" && <Envelope className="tw-w-6 tw-h-6 tw-flex-0" />}

                                    {dialogType == "chat-with-us" && <Whatsapp className="tw-w-6 tw-h-6 tw-flex-0" />}
                                </div>
                            </Link>

                            <VerticalSpacer className="tw-h-4" />

                            {dialogType !== "chat-with-us" && (
                                <>
                                    <div className="lg-text-title2">{getVernacularString("headerContactUsDialogT3", userPreferences.language)}</div>

                                    <VerticalSpacer className="tw-h-2" />

                                    <Link
                                        to={dialogType == "call-us" ? "tel:+91 92056-67999" : dialogType == "email-us" ? "mailto:marketing@livguard.com" : "https://wa.me/9205667999"}
                                        className="tw-w-full lg-bg-primary-500 tw-text-secondary-900-dark tw-py-3 tw-px-4 tw-rounded-full"
                                    >
                                        <div className="tw-flex tw-flex-row tw-items-center">
                                            <div className="tw-flex-1">{dialogType == "call-us" ? "+91 92056-67999" : dialogType == "email-us" ? "marketing@livguard.com" : "+91 92056-67999"}</div>

                                            {dialogType == "call-us" && <Telephone className="tw-w-6 tw-h-6 tw-flex-0" />}

                                            {dialogType == "email-us" && <Envelope className="tw-w-6 tw-h-6 tw-flex-0" />}

                                            {dialogType == "chat-with-us" && <Whatsapp className="tw-w-6 tw-h-6 tw-flex-0" />}
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

function ContactTeamOfExperts({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const [isContactUsDialogOpen, setIsContactUsDialogOpen] = useState(false);
    const [dialogOptions, setDialogOptions] = useState<{dialogType: string; headerTextContentId: string}>({dialogType: "call-us", headerTextContentId: "84b91d23-dc94-48a8-ac22-24fb97f95e4d"});

    const contactUsCardsContent = [
        {
            iconUrl: "https://files.growthjockey.com/livguard/icons/warranty/phone-signal.svg",
            cardTextID: "995ba2bf-62b1-402f-a8d0-9928081e37c5",
            buttonCtaTextID: "84b91d23-dc94-48a8-ac22-24fb97f95e4d",
            dialogType: "call-us",
        },
        {
            iconUrl: "https://files.growthjockey.com/livguard/icons/warranty/whatsapp-white.svg",
            cardTextID: "399595dc-4684-42cb-bf32-e0ce0ba8fc28",
            buttonCtaTextID: "793169c2-90d3-47a6-8d4e-ea93ae0ec10d",
            dialogType: "chat-with-us",
        },
        {
            iconUrl: "https://files.growthjockey.com/livguard/icons/warranty/email-white.svg",
            cardTextID: "a92293f2-bba1-45c6-83f0-b6b757d4fc89",
            buttonCtaTextID: "86298c75-2db2-45aa-8b4d-67be07715e63",
            dialogType: "email-us",
        },
    ];

    function ContactCard({iconUrl, cardTextID, buttonCtaTextID, dialogType}: {iconUrl: string; cardTextID: string; buttonCtaTextID: string; dialogType: string}) {
        return (
            <div className="tw-grid tw-grid-rows-[auto_minmax(1rem,1fr)_min-content_1rem_auto] lg:tw-border lg:tw-rounded-lg lg:lg-border-secondary-100 lg:tw-px-10 lg:tw-py-6">
                <div className="tw-flex tw-justify-center tw-row-start-1">
                    <div className="tw-flex tw-rounded-full lg-bg-secondary-100 tw-h-20 tw-w-20 tw-items-center tw-justify-center">
                        <img
                            src={iconUrl}
                            alt=""
                            className="tw-invert dark:tw-invert-0"
                        />
                    </div>
                </div>

                <div className="tw-flex tw-justify-center tw-row-start-3">
                    <div className="tw-text-center lg-text-body">{getVernacularString(cardTextID, userPreferences.language)}</div>
                </div>
                <div className="tw-flex tw-justify-center tw-row-start-5">
                    <button
                        className="lg-cta-button tw-w-[11.875rem]"
                        onClick={() => {
                            setDialogOptions({dialogType: dialogType, headerTextContentId: buttonCtaTextID});
                            setIsContactUsDialogOpen(true);
                        }}
                    >
                        {getVernacularString(buttonCtaTextID, userPreferences.language)}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-grid lg-px-screen-edge-2 tw-items-center tw-w-full", className)}>
            <DefaultTextAnimation className="lg-text-headline tw-text-center">
                <div dangerouslySetInnerHTML={{__html: appendSpaceToString(getVernacularString("4e6a2a00-461a-4407-a51e-ebee08a59f1f", userPreferences.language))}} />
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-2" />

            <DefaultTextAnimation className="lg-text-headline tw-text-center">
                <div className="lg-text-title2">{getVernacularString("94cc6e89-af38-4bdf-9c02-f666eb559837", userPreferences.language)}</div>
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-6" />

            <div className="tw-grid tw-w-full tw-justify-center tw-grid-cols-1 tw-gap-y-10 lg:tw-gap-y-0 lg:tw-gap-x-16 lg:tw-grid-cols-3 tw-grid-flow-row lg:tw-grid-flow-col lg:tw-justify-between">
                <ItemBuilder
                    items={contactUsCardsContent}
                    itemBuilder={(item, itemIndex) => {
                        return (
                            <ContactCard
                                iconUrl={item.iconUrl}
                                cardTextID={item.cardTextID}
                                buttonCtaTextID={item.buttonCtaTextID}
                                dialogType={item.dialogType}
                                key={itemIndex}
                            />
                        );
                    }}
                />
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

function RequestAServiceBanner({userPreferences, className}: {userPreferences: UserPreferences; className: string}) {
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-h-[60vh] lg:tw-h-[40vh] tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_auto_1rem_auto_2.5rem] lg:tw-grid-rows-[minmax(0,1fr)_auto_auto_0.5rem_auto_minmax(0,1fr)] tw-text-center lg:tw-text-left lg:tw-grid-cols-[minmax(0,1fr)_minmax(0,1fr)]",
                className,
            )}
            ref={ref}
        >
            {containerWidth == null || containerHeight == null ? null : (
                <>
                    <CoverImage
                        relativePath={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/warranty/5/banner-mobile.jpg" : "/livguard/warranty/5/banner-desktop.jpg"}
                        className="tw-row-start-1 tw-col-start-1 tw-row-span-full tw-col-span-full"
                        key={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/warranty/5/banner-mobile.jpg" : "/livguard/warranty/5/banner-desktop.jpg"}
                        imageClassName="tw-rounded-lg lg:tw-rounded-[1.25rem]"
                    />
                </>
            )}

            <DefaultTextAnimation className="tw-row-start-3 lg:tw-row-start-2 tw-col-start-1">
                <div className="lg-text-banner lg-px-screen-edge-2 tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start tw-text-center">
                    {getVernacularString("16deb412-ea49-403d-9f2d-b8279dabd5a7", userPreferences.language)}
                </div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-4 lg:tw-row-start-3 tw-col-start-1">
                <div className="lg-text-body lg-px-screen-edge-2 !tw-text-secondary-900-dark tw-text-center">
                    {getVernacularString("1156ca19-8b0c-4c06-bd91-23e394bdee5f", userPreferences.language)}
                </div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-flex tw-justify-center tw-row-start-6 lg:tw-row-start-5 tw-col-start-1 lg-px-screen-edge-2">
                <Link to="/service">
                    <button className="lg-text-body tw-px-10 tw-py-4 lg-cta-button tw-max-w-fit !tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-center tw-text-center">
                        {getVernacularString("51d7f3dd-6922-4a86-8934-2eaf5ec55433", userPreferences.language)}
                    </button>
                </Link>
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
