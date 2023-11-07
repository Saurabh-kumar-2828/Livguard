import {Dialog, Transition} from "@headlessui/react";
import type {ActionFunction, LoaderFunction, V2_MetaFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import {Form, Link, useActionData, useFetcher, useSubmit, useTransition} from "@remix-run/react";
import React, {useContext, useEffect, useReducer, useRef, useState} from "react";
import {Envelope, Telephone, Whatsapp, X} from "react-bootstrap-icons";
import {useInView} from "react-intersection-observer";
import {useResizeDetector} from "react-resize-detector";
import {useLoaderData} from "react-router";
import {toast} from "react-toastify";
import {insertWarrantyFormLeads, uploadFileToS3} from "~/backend/dealer.server";
import {sendDataToFreshsales} from "~/backend/freshsales.server";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {FaqSectionInternal} from "~/components/faqs";
import {SocialMediaIcons} from "~/components/footers/common";
import {FixedWidthImage} from "~/components/images/fixedWidthImage";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {PageScaffold} from "~/components/pageScaffold";
import {SecondaryNavigation} from "~/components/secondaryNavigation";
import {SecondaryNavigationControllerContext} from "~/contexts/secondaryNavigationControllerContext";
import {HiddenFormField} from "~/global-common-typescript/components/hiddenFormField";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {ImageCdnProvider, ImageMetadata} from "~/common--type-definitions/typeDefinitions";
import {getStringFromUnknown, getUuidFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {concatenateNonNullStringsWithSpaces, generateUuid} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {emailIdValidationPattern, indianPhoneNumberValidationPattern, pinCodeValidationPattern} from "~/global-common-typescript/utilities/validationPatterns";
import {useEmblaCarouselWithIndex} from "~/hooks/useEmblaCarouselWithIndex";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {SecondaryNavigationController, useSecondaryNavigationController} from "~/hooks/useSecondaryNavigationController";
import {FormSelectComponent} from "~/livguard-common-typescript/scratchpad";
import {getFormSelectProductItems} from "~/routes/contact-us";
import type {WarrantyFormStateInputs, WarrantyFormStateInputsAction} from "~/routes/warranty-form-state";
import {WarrantyFormActionTypes, WarrantyFormFieldKeys, WarrantyFormReducer, warrantyFormErrorMessages, warrantyFormInitialState} from "~/routes/warranty-form-state";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import {Language, type UserPreferences} from "~/typeDefinitions";
import {appendSpaceToString, getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest, secondaryNavThreshold} from "~/utilities";
import {getContentGenerator} from "~/vernacularProvider";
import {GenericActionData} from "./lead-form-submission";
import {getVernacularFromBackend} from "~/backend/vernacularProvider.server";
import {ContentProviderContext} from "~/contexts/contentProviderContext";
import {getImageMetadataLibraryFromBackend, getMetadataForImageServerSide} from "~/backend/imageMetaDataLibrary.server";
import {ImageProviderContext} from "~/contexts/imageMetaDataContext";

export const meta: V2_MetaFunction = ({data: loaderData}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = loaderData.userPreferences;
    if (userPreferences.language == Language.English) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/warranty",
            },
            {
                title: "Livguard Warranty: Protect Your Investment Today",
            },
            {
                name: "description",
                content: "Comprehensive Livguard warranty protects your purchases with reliable coverage and peace of mind. Explore now!",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/warranty",
            },
            {
                property: "og:title",
                content: "Livguard Warranty: Protect Your Investment Today",
            },
            {
                property: "og:description",
                content: "Comprehensive Livguard warranty protects your purchases with reliable coverage and peace of mind. Explore now!",
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
                content: loaderData.ogBanner,
            },
        ];
    } else if (userPreferences.language == Language.Hindi) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/warranty",
            },
            {
                title: "लिवगार्ड वारंटी: आज ही अपने निवेश को सुरक्षित करें।",
            },
            {
                name: "description",
                content: "लिवगार्ड की व्यापक वारंटी आपकी खरीदारी की प्रमुखता के साथ विश्वसनीय कवरेज और चिंता मुक्ति प्रदान करती है। अभी खोजें!",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/warranty",
            },
            {
                property: "og:title",
                content: "लिवगार्ड वारंटी: आज ही अपने निवेश को सुरक्षित करें।",
            },
            {
                property: "og:description",
                content: "लिवगार्ड की व्यापक वारंटी आपकी खरीदारी की प्रमुखता के साथ विश्वसनीय कवरेज और चिंता मुक्ति प्रदान करती है। अभी खोजें!",
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
                content: loaderData.ogBanner,
            },
        ];
    } else {
        throw Error(`Undefined language ${userPreferences.language}`);
    }
};

export type ActionData = {
    error: string | null;
};

export const action: ActionFunction = async ({request, params}) => {
    const body = await request.formData();

    const uuid = safeParse(getUuidFromUnknown, body.get("uuid"));
    const utmParameters = safeParse(getStringFromUnknown, body.get("utmParameters"));
    const jsonData = safeParse(getStringFromUnknown, body.get("registerFormDetails"));
    if (jsonData != null) {
        const jsonDataParsed = JSON.parse(jsonData);

        if (jsonDataParsed != null) {
            const contactNumber = safeParse(getStringFromUnknown, jsonDataParsed.contactNumber);
            const email = safeParse(getStringFromUnknown, jsonDataParsed.email);
            const name = safeParse(getStringFromUnknown, jsonDataParsed.name);
            const pincode = safeParse(getStringFromUnknown, jsonDataParsed.pincode);
            const city = safeParse(getStringFromUnknown, jsonDataParsed.city);
            const state = safeParse(getStringFromUnknown, jsonDataParsed.state);
            const products = jsonDataParsed.products;

            if (contactNumber == null || email == null || name == null || pincode == null || city == null || state == null || products == null || uuid == null || utmParameters == null) {
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

            const utmParametersDecoded = JSON.parse(utmParameters);
            const pageUrl = getUrlFromRequest(request);

            const freshsalesResult = await sendDataToFreshsales(uuid, {mobile_number: contactNumber, first_name: name, email: email, city: city, otpVerified: true}, utmParametersDecoded, pageUrl);
            if (freshsalesResult instanceof Error) {
                const actionData: GenericActionData = {
                    error: "Error in submitting form! Error code: 0177ace3-f07e-454a-a27f-f210d67702a9",
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

    const vernacularData = getVernacularFromBackend("warrantyPage", userPreferences.language);
    const imageMetaDataLibrary = getImageMetadataLibraryFromBackend("warrantyPage");
    const ogBanner = getAbsolutePathForRelativePath(getMetadataForImageServerSide("/livguard/warranty/warranty-og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null);

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
    const actionData = useActionData() as ActionData;
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
                        showMobileMenuIcon={true}
                        utmParameters={utmSearchParameters}
                        pageUrl={pageUrl}
                        breadcrumbs={[
                            {contentId: "cfab263f-0175-43fb-91e5-fccc64209d36", link: "/"},
                            {contentId: "237533ce-d6ab-4735-8064-14567ca50a48", link: "#"},
                        ]}
                        secondaryNavigationController={secondaryNavigationController}
                    >
                        <SecondaryNavigationControllerContext.Provider value={secondaryNavigationController}>
                            <WarrantyRegistrationPage
                                userPreferences={userPreferences}
                                utmParameters={utmSearchParameters}
                                secondaryNavigationController={secondaryNavigationController}
                                actionData={actionData}
                            />
                        </SecondaryNavigationControllerContext.Provider>
                    </PageScaffold>
                </ContentProviderContext.Provider>
            </ImageProviderContext.Provider>
        </>
    );
}

function WarrantyRegistrationPage({
    userPreferences,
    utmParameters,
    actionData,
    secondaryNavigationController,
}: {
    userPreferences: UserPreferences;
    utmParameters: {[searchParameter: string]: string};
    actionData: ActionData;
    secondaryNavigationController?: SecondaryNavigationController;
}) {
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);

    return (
        <div className="tw-grid tw-grid-cols-1 tw-gap-x-16 tw-items-start tw-justify-center">
            <HeroSection
                userPreferences={userPreferences}
                className="tw-row-start-1 tw-w-full"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-2" />

            <SeamlessService
                userPreferences={userPreferences}
                className="tw-row-start-3 tw-max-w-7xl tw-mx-auto"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-4" />

            <RegisterInMinutes
                userPreferences={userPreferences}
                className="tw-row-start-5 tw-max-w-3xl tw-mx-auto lg-px-screen-edge-2"
                actionData={actionData}
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-6" />

            <ContactTeamOfExperts
                userPreferences={userPreferences}
                className="tw-row-start-7 tw-max-w-7xl tw-mx-auto"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20 tw-row-start-[8]" />

            <RequestAServiceBanner
                userPreferences={userPreferences}
                className="tw-row-start-9 tw-max-w-7xl tw-mx-auto"
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
    const contentData = useContext(ContentProviderContext);
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);
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
                "tw-aspect-square lg:tw-aspect-[1280/380] tw-grid tw-grid-rows-[minmax(3.5rem,1fr)_auto_auto_1rem_auto_3rem] lg:tw-grid-rows-[minmax(0,1fr)_auto_auto_1rem_auto_minmax(0,1fr)] lg:tw-text-start tw-text-center lg:tw-grid-cols-2",
                className,
            )}
            // id="top"
            // ref={sectionRef}
        >
            <div className="tw-row-start-1 tw-col-start-1 tw-col-span-full tw-row-span-full">
                {useIsScreenSizeBelow == null ? null : (
                    <FullWidthImage
                        relativePath={isScreenSizeBelow ? "/livguard/warranty/1/mobile-banner.jpg" : "/livguard/warranty/1/desktop-banner.jpg"}
                        className=""
                        key={isScreenSizeBelow ? "/livguard/warranty/1/mobile-banner.jpg" : "/livguard/warranty/1/desktop-banner.jpg"}
                    />
                )}
            </div>

            <DefaultTextAnimation className="tw-row-start-2 tw-col-start-1">
                <div className="lg-text-banner lg-px-screen-edge-2 tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">
                    {contentData.getContent("8a3404ac-d12b-47f2-bc31-5d9411a55fde")}
                </div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-3 tw-col-start-1">
                <div className="lg-text-banner lg-px-screen-edge-2 tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start">
                    {contentData.getContent("e979cb3b-1a68-45bd-a7cd-0e20d389f91d")}
                </div>
            </DefaultTextAnimation>

            {/* <DefaultTextAnimation className="tw-row-start-5 tw-col-start-1">
                <div className="lg-text-body lg-px-screen-edge-2 !tw-text-secondary-900-dark">{contentData.getContent("e631b621-5214-4ef4-a2d6-1b6126137c00")}</div>
            </DefaultTextAnimation> */}
        </div>
    );
}

function SeamlessService({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            benefits: {
                humanReadableName: contentData.getContent("6b8d915d-0091-4666-817a-e9b9d2eab472"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

    function ReadMore({text, className}: {text: string; className?: string}) {
        // const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();
        // const [isReadMore, setIsReadMore] = useState(false);
        // const toggleReadMore = () => {
        //     setIsReadMore(!isReadMore);
        // };

        // const [cutoffIndex, setCutoffIndex] = useState(0);
        // useEffect(() => {
        //     if (containerHeight !== undefined && containerWidth !== undefined) {
        //         if (containerWidth < 640) {
        //             setCutoffIndex(225);
        //             return;
        //         }

        //         setCutoffIndex(444);
        //     }
        // }, [containerWidth]);

        return (
            <div
                className={className}
                // ref={ref}
            >
                {/* <p className="lg-text-body">
                    <span dangerouslySetInnerHTML={{__html: !isReadMore && text.length > cutoffIndex ? `${text.slice(0, cutoffIndex)}<span>...</span>` : text}} />
                    &nbsp;
                    <span
                        onClick={toggleReadMore}
                        className="tw-text-primary-500-dark tw-underline tw-cursor-pointer"
                    >
                        {text.length > cutoffIndex && <>{isReadMore ? "Show Less" : "Read More"}</>}
                    </span>
                </p> */}

                <div className="lg-text-body" dangerouslySetInnerHTML={{__html: text}} />

            </div>
        );
    }

    function SeamlessServiceCard({iconUrl, title, className}: {iconUrl: string; title: string; className?: string}) {
        return (
            <>
                <div className={concatenateNonNullStringsWithSpaces("tw-flex tw-flex-col tw-items-center tw-justify-center lg:tw-flex-row tw-px-2", className)}>
                    <div className="tw-w-16 tw-h-16 lg-card tw-rounded-full tw-mb-2 lg:tw-mr-2 lg:tw-mb-0 tw-flex tw-justify-center tw-items-center">
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
            title: contentData.getContent("5f2ff78d-56a6-4f19-87d2-03342967850b"),
        },
        {
            iconUrl: "/livguard/warranty/2/paperless-warranty.svg",
            title: contentData.getContent("08cd30f4-21ca-442c-8533-0a0ea8519c3b"),
        },
        {
            iconUrl: "/livguard/warranty/2/effortless-experience.svg",
            title: contentData.getContent("a0e00e4e-7130-489c-9fe1-7a9fad0f3aa7"),
        },
    ];

    return (
        <>
            <div
                className={concatenateNonNullStringsWithSpaces("tw-w-full tw-grid tw-grid-rows-[auto_0.5rem_auto_1rem_auto_2rem_auto_1rem_auto_minmax(0,1fr)] lg-px-screen-edge-2", className)}
                id="benefits"
                ref={sectionRef}
            >
                <div
                    dangerouslySetInnerHTML={{__html: contentData.getContent("4c465a92-fb45-41f3-9fc5-dfed80962b12")}}
                    className="tw-row-start-1 lg-text-headline tw-text-center tw-mb-1"
                />

                <div
                    className="tw-row-start-3 lg-text-title2 tw-text-center"
                    dangerouslySetInnerHTML={{__html: contentData.getContent("dc2254fc-6ca8-49f7-a007-7e833db77009")}}
                ></div>

                <ReadMore
                    className="tw-row-start-5 tw-text-center"
                    text={contentData.getContent("7bd7f0d0-1ba0-43f9-82be-0d7f05c21578")}
                />

                <div className="tw-row-start-7 lg-text-title2 tw-text-center">{contentData.getContent("7ad4e46b-f080-4885-a39b-7b752906698f")}</div>

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
    const contentData = useContext(ContentProviderContext);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "register-in-minutes": {
                humanReadableName: contentData.getContent("a5ee9b69-adfe-49ac-9256-cff986b899b7"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

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

    const [showOtpField, setShowOtpField] = useState(false);
    const [showOtpButton, setShowOtpButton] = useState(false);
    const [resendTimeOut, setResendTimeOut] = useState(0);
    const [invalidOtp, setInvalidOtp] = useState(false);
    const [isOtpResent, setIsOtpResent] = useState(false);
    const phoneNumberRef = useRef<HTMLInputElement | null>(null);
    const otpFieldRef = useRef<HTMLInputElement | null>(null);

    const [otpSubmitted, setIsOtpSubmitted] = useState(false);
    const otpFetcher = useFetcher();
    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);

    const otpValidateFetcher = useFetcher();

    const transition = useTransition();

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
        // Validating OTP
        const data = new FormData();
        data.append("phoneNumber", warrantyFormState.contactNumber);
        data.append("otpSubmitted", warrantyFormState.otpSubmitted);
        otpValidateFetcher.submit(data, {method: "post", action: "/warranty/validate-otp"});
    };

    useEffect(() => {
        if (otpValidateFetcher.data != null) {
            const data = otpValidateFetcher.data;

            if (data.error != null) {
                toast.error(data.error);
                return;
            }

            if (data.isInvalidOtp != null && data.isInvalidOtp) {
                setInvalidOtp(true);
                return;
            }

            // Checking if any field is either empty or invalid based on the provided pattern
            Object.keys(warrantyFormState).every((key) => {
                const enumKey: keyof typeof WarrantyFormFieldKeys = key as WarrantyFormFieldKeys;
                if (warrantyFormState[enumKey] == null || warrantyFormState[enumKey] === "") {
                    toast.error(warrantyFormErrorMessages[enumKey].emptyMessage);
                    return;
                }

                // Checking if a pattern has been provided for this key
                if (Object.keys(warrantyFormErrorMessages[enumKey]).includes("pattern") && warrantyFormErrorMessages[enumKey].pattern !== "") {
                    // Since products are stored in an array, their validation has to be handled slightly differently
                    if (key !== WarrantyFormFieldKeys.products) {
                        // Since there is only one non string key in WarrantyFormFieldKeys enum, we have already filtered that, so we can safely use ts-ignore for this error
                        if (!warrantyFormState[enumKey].match(warrantyFormErrorMessages[enumKey].pattern)) {
                            // If pattern doesn't match, show invalid message
                            toast.error(warrantyFormErrorMessages[enumKey].invalidMessage);
                            return;
                        }
                    }
                }
                // setIsStep1Valid(true);
                setRegisterFormStepNumber(2);
            });
        }
    }, [otpValidateFetcher.data]);

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
    const [viewProductFormOption, setViewProductFormOption] = useState(contentData.getContent("contactUsS3ComplaintFormRadioOption1"));

    useEffect(() => {
        if (actionData != null) {
            if (actionData.error != null) {
                toast.error(actionData.error);
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
        <div
            className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-flow-row tw-grid-cols-1 tw-justify-center tw-w-full", className)}
            id="register-in-minutes"
            ref={sectionRef}
        >
            <DefaultTextAnimation className="tw-row-start-1 lg-text-headline tw-text-center tw-w-full">
                <div dangerouslySetInnerHTML={{__html: appendSpaceToString(contentData.getContent("b4c42c87-1ee1-4f06-8cff-abe7751a025c"))}} />
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-6 tw-row-start-2" />

            <div className="tw-row-start-3 tw-col-span-full tw-w-full">
                <div
                    className="tw-overflow-hidden tw-w-full tw-px-3"
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
                                            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-x-4 lg:tw-gap-x-2">
                                                <div className="tw-col-start-1 tw-grid tw-grid-flow-row tw-gap-2">
                                                    <div className="lg-text-body lg-text-secondary-900">{contentData.getContent("70c4b348-67de-4873-bb1e-8d060f7d98c8")}</div>

                                                    <input
                                                        type="text"
                                                        name="name"
                                                        className="lg-text-input"
                                                        placeholder={contentData.getContent("5249c7c4-1840-410d-b6c7-f4c53ab8369a")}
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
                                                {/* <div className="tw-row-start-1 tw-col-start-1 tw-grid tw-grid-flow-row tw-gap-2">
                                                    <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">
                                                        {contentData.getContent("7ce4697b-82b4-47c3-944d-0c7edbcd1ccd")}
                                                    </div>

                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        className="lg-text-input"
                                                        pattern={indianPhoneNumberValidationPattern}
                                                        placeholder={contentData.getContent("74bef278-2e4e-4568-868b-7ce5d50df6e2")}
                                                        value={warrantyFormState.contactNumber}
                                                        onChange={(e) => {
                                                            const action: WarrantyFormStateInputsAction = {
                                                                type: WarrantyFormActionTypes.SetContactNumber,
                                                                payload: e.target.value,
                                                            };
                                                            dispatchWarrantyFormAction(action);
                                                        }}
                                                    />
                                                </div> */}
                                                <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

                                                <div className="tw-grid tw-grid-cols-1 lg:tw-col-start-2 tw-gap-4 lg:tw-gap-2">
                                                    {!showOtpField ? (
                                                        <div className="lg-text-secondary-900">{contentData.getContent("17cfa283-6fcc-4a49-9dfe-a392e0310b27")}</div>
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
                                                                {contentData.getContent("phoneNumberChnage")}
                                                            </div>
                                                            <div className="tw-col-start-3 lg-text-secondary-900 lg-text-body-bold">{warrantyFormState.contactNumber}</div>
                                                        </div>
                                                    )}

                                                    {!showOtpField ? (
                                                        <div className="tw-relative tw-w-full tw-items-center tw-grid">
                                                            <input
                                                                type="text"
                                                                name="phone"
                                                                pattern={indianPhoneNumberValidationPattern}
                                                                placeholder={contentData.getContent("1e90dca7-b78f-4231-b2df-644a3b0322d1")}
                                                                required
                                                                className="lg-text-input tw-w-full"
                                                                disabled={showOtpField}
                                                                defaultValue={warrantyFormState.contactNumber}
                                                                ref={phoneNumberRef}
                                                                onChange={(e) => {
                                                                    dispatchWarrantyFormAction({
                                                                        type: WarrantyFormActionTypes.SetContactNumber,
                                                                        payload: e.target.value,
                                                                    });
                                                                    if (e.target.value.length == 10) {
                                                                        setShowOtpButton(true);
                                                                    } else {
                                                                        setShowOtpButton(false);
                                                                    }
                                                                }}
                                                                onBlur={(e) => {
                                                                    if (warrantyFormState.contactNumber.length == 10) {
                                                                        setShowOtpButton(true);
                                                                    }
                                                                }}
                                                                onFocus={(e) => {
                                                                    if (warrantyFormState.contactNumber.length == 10) {
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
                                                                    if (warrantyFormState.name.length === 0) {
                                                                        toast.error("Name cannot be null! Error code: 5a262b97-40ca-4d1a-8d65-2751adeee7a6");
                                                                        return;
                                                                    }
                                                                    setShowOtpButton(false);
                                                                    setShowOtpField(true);
                                                                    setResendTimeOut(60);

                                                                    if (otpFieldRef.current != null) {
                                                                        otpFieldRef.current.focus();
                                                                    }
                                                                    const data = new FormData();
                                                                    data.append("phoneNumber", warrantyFormState.contactNumber);
                                                                    data.append("name", warrantyFormState.name);
                                                                    otpFetcher.submit(data, {method: "post", action: "/resend-otp"});
                                                                }}
                                                            >
                                                                {contentData.getContent("OfferFormGetOTP")}
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
                                                                    placeholder={contentData.getContent("contactUsOTPT3E")}
                                                                    ref={otpFieldRef}
                                                                    value={warrantyFormState.otpSubmitted}
                                                                    onChange={(e) => {
                                                                        if (e.target.value.length > 0) {
                                                                            setIsOtpSubmitted(true);
                                                                        }
                                                                        dispatchWarrantyFormAction({
                                                                            type: WarrantyFormActionTypes.SetOtpSubmitted,
                                                                            payload: e.target.value,
                                                                        });
                                                                    }}
                                                                />
                                                                {invalidOtp && (
                                                                    <div className="lg-text-primary-500 tw-absolute lg-text-icon tw-right-2 tw-top-0 tw-bottom-0 tw-pt-[18px]">
                                                                        {contentData.getContent("OfferInvalidOTP")}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="tw-grid lg:tw-col-start-2">
                                                    <div
                                                        className={concatenateNonNullStringsWithSpaces(
                                                            "tw-w-full tw-px-3",
                                                            showOtpField ? "tw-flex tw-flex-row tw-justify-between tw-opacity-100 tw-duration-100 tw-z-10" : "tw-hidden tw-opacity-0 -tw-z-100",
                                                        )}
                                                    >
                                                        <div
                                                            className={concatenateNonNullStringsWithSpaces(
                                                                "lg-text-secondary-700 tw-text-[12px]",
                                                                `${resendTimeOut > 0 ? undefined : "hover:tw-cursor-pointer"}`,
                                                            )}
                                                            onClick={() => {
                                                                setIsOtpResent(true);
                                                                setResendTimeOut(60);

                                                                const data = new FormData();
                                                                data.append("phoneNumber", warrantyFormState.contactNumber);
                                                                data.append("name", warrantyFormState.name);
                                                                otpFetcher.submit(data, {method: "post", action: "/resend-otp"});
                                                            }}
                                                        >
                                                            {contentData.getContent("OfferResendOTP")}
                                                        </div>
                                                        <div className="lg-text-secondary-700 tw-text-[12px]">{`00:${resendTimeOut}`}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-4 lg:tw-gap-2">
                                                <div className="tw-row-start-2 lg:tw-row-start-1 tw-col-start-1 tw-grid tw-grid-flow-row tw-gap-2">
                                                    <div className="lg-text-body lg-text-secondary-900">{contentData.getContent("1e26fc77-d6ce-496f-8a43-b0ff4d3f1f7e")}</div>

                                                    <input
                                                        type="email"
                                                        name="emailId"
                                                        pattern={emailIdValidationPattern}
                                                        className="lg-text-input"
                                                        placeholder={contentData.getContent("17b9c40e-9c7d-4a19-8202-b294967fdff8")}
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

                                                <div className="tw-col-start-1 lg:tw-col-start-2 tw-grid tw-grid-flow-row tw-gap-2">
                                                    <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">{contentData.getContent("53927c84-bd54-4a11-b284-7f3844f30c4e")}</div>

                                                    <input
                                                        type="number"
                                                        name="pinCode"
                                                        pattern={pinCodeValidationPattern}
                                                        className="lg-text-input"
                                                        placeholder={contentData.getContent("a73f6868-bb95-4bc4-9911-aed2ae6cc695")}
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
                                                    <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">{contentData.getContent("5132b06f-9057-4e22-a21e-aca383247dda")}</div>
                                                    <input
                                                        type="text"
                                                        placeholder={contentData.getContent("154d8f5a-9084-4860-b588-c17bb178226e")}
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
                                                    <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">{contentData.getContent("a677f88a-dabc-45d5-8542-9954d0c7535b")}</div>

                                                    <input
                                                        type="text"
                                                        placeholder={contentData.getContent("9fdfab81-7e99-4e76-8fbb-d1c3b634a735")}
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
                                                    className="tw-w-full lg-cta-button lg:tw-w-1/2 disabled:!tw-bg-none disabled:!tw-bg-secondary-300-light disabled:dark:!tw-bg-secondary-300-dark disabled:!tw-text-secondary-700-light disabled:dark:!tw-text-secondary-700-dark"
                                                    onClick={() => {
                                                        validateFormStep1();
                                                    }}
                                                    disabled={otpFetcher.data == null || !otpSubmitted}
                                                >
                                                    {contentData.getContent("79acc43f-692e-439a-ae40-75f7f0e60c95")}
                                                </button>
                                            </div>

                                            <HiddenFormField
                                                name="phone"
                                                value={warrantyFormState.contactNumber}
                                            />
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
                                                        {contentData.getContent("988b89be-d6ef-4008-9faf-c5b6cb3eea06")}
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
                                                        {contentData.getContent("46655054-3f4d-46b5-ad00-510a9f00de36")}
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

                                                        <div dangerouslySetInnerHTML={{__html: contentData.getContent("contactUsTermsAndConditionsCheckboxtext")}} />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        disabled={transition.state != "idle"}
                                                        onClick={(event) => {
                                                            if (validateFormStep2()) {
                                                                submit(submitRef.current != undefined ? submitRef.current : null);
                                                                return true;
                                                            } else {
                                                                return false;
                                                            }
                                                        }}
                                                        className="tw-cursor-pointer tw-row-start-4 lg:tw-row-start-3 tw-col-start-1 tw-col-span-2 lg:tw-col-span-1 tw-my-3 tw-w-full lg-text-body lg-cta-button !tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start tw-rounded-full tw-p-3 disabled:!tw-bg-none disabled:!tw-bg-secondary-300-light disabled:dark:!tw-bg-secondary-300-dark disabled:!tw-text-secondary-700-light disabled:dark:!tw-text-secondary-700-dark"
                                                    >
                                                        {contentData.getContent("contactUsS3FormButtonText")}
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
                                                    value={JSON.stringify({
                                                        ...warrantyFormState,
                                                        products: warrantyFormState.products.map((product) => ({
                                                            ...product,
                                                            internalId: undefined,
                                                        })),
                                                        nextInternalId: undefined,
                                                    })}
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
                                        dangerouslySetInnerHTML={{__html: contentData.getContent("contactPagesuccessT1")}}
                                        className="lg-text-banner tw-row-start-4 tw-text-center"
                                    />

                                    <div className="tw-row-start-6 tw-text-center">
                                        {!warrantyDateOfBirthSubmitted
                                            ? contentData.getContent("10fb7b8f-7d05-4bf3-9267-ea07410b3e49")
                                            : contentData.getContent("41bcbb30-f453-487a-be09-bdb22ac8e49c")}
                                    </div>

                                    {!warrantyDateOfBirthSubmitted ? (
                                        <fetcher.Form
                                            method="post"
                                            action="/warranty/date-of-birth"
                                            className="tw-row-start-8 tw-grid tw-grid-flow-row"
                                        >
                                            <div className="lg-text-body lg-text-secondary-900">{contentData.getContent("b034be5d-2864-4ab3-bdac-d5a12e40e8d8")}</div>

                                            <VerticalSpacer className="tw-h-2" />

                                            <input
                                                type="date"
                                                name="dateOfBirth"
                                                className="lg-text-input"
                                                placeholder={contentData.getContent("b680144d-0d44-4f46-af80-dcacabae78de")}
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
                                                {contentData.getContent("cf74f848-853c-493e-acc9-fb054f374e63")}
                                            </button>
                                        </fetcher.Form>
                                    ) : (
                                        <></>
                                    )}

                                    <SocialMediaIcons className="tw-row-start-10 tw-w-full tw-justify-center" />

                                    <div
                                        dangerouslySetInnerHTML={{__html: contentData.getContent("bf43b0f2-2e29-4290-a7a6-4fc1bb305c56")}}
                                        className="tw-row-start-12 tw-text-center lg-text-body"
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
    const contentData = useContext(ContentProviderContext);
    const formSelectItems = getFormSelectProductItems(userPreferences.language);
    return (
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-grid-flow-row tw-gap-2">
            {index > 0 && <p className="tw-row-start-1 ">{`${contentData.getContent("3060b50b-5b8c-4feb-9abe-4d18a51e39e1")} ${index + 1}`}</p>}
            <div className="tw-grid tw-row-start-2 tw-col-start-1 tw-gap-2">
                <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">{contentData.getContent("69e30a83-d3d3-4ff3-bba7-b56849edd3c0")}</div>

                <FormSelectComponent
                    items={formSelectItems}
                    itemBuilder={(item) => (item == "" ? `${contentData.getContent("69e30a83-d3d3-4ff3-bba7-b56849edd3c0")}` : `<div class="">${item}</div>`)}
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
                <div className="lg-text-body lg-text-secondary-900 tw-row-start-1">{contentData.getContent("f0b96564-0f72-493f-8d69-11a797004751")}</div>

                <input
                    type="text"
                    placeholder={contentData.getContent("cc30e4da-6578-4fe7-8526-5ee7337a6515")}
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
                <div className="lg-text-body lg-text-secondary-900 tw-row-start-1 tw-col-start-1">{contentData.getContent("a678f917-a247-4e95-99f2-303db4d122c9")}</div>

                <input
                    type="file"
                    accept="image/*"
                    name={`purchaseProof${index}`}
                    className="lg-text-input tw-col-start-1 tw-w-1/2 lg:tw-w-full"
                    // value={warrantyFormState.products[index].purchaseProof}
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
                    placeholder={contentData.getContent("ae64dabe-c22a-429b-9868-5b19b57559a8")}
                    key={warrantyFormState.products[index].internalId}
                />
                <p className="lg-text-secondary-900 lg-text-icon tw-row-start-3 tw-w-1/2 lg:tw-w-full">{contentData.getContent("a704f8f5-79db-437c-8f23-d64a634899a7")}</p>

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
                            {contentData.getContent("7c3fd7d9-651f-4e02-803e-a5bf1efdc519")}
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
    const contentData = useContext(ContentProviderContext);

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
                        <div className="tw-w-full lg:tw-max-w-[30rem] tw-mx-auto lg-card lg-bg-secondary-100 tw-px-6 tw-py-6 tw-rounded-lg tw-flex tw-flex-col">
                            <div className="tw-grid tw-grid-cols-[1.5rem_minmax(0,1fr)_1.5rem]">
                                <div className="tw-row-start-1 tw-col-start-2 tw-w-full tw-text-center lg-text-headline">{contentData.getContent(headerTextContentId)}</div>
                                <button
                                    type="button"
                                    onClick={tryToCloseContactUsDialog}
                                    className="tw-row-start-1 tw-col-start-3"
                                >
                                    <X className="tw-w-6 tw-h-6" />
                                </button>
                            </div>

                            <VerticalSpacer className="tw-h-4" />

                            <div className="lg-text-title2">{contentData.getContent("headerContactUsDialogT2")}</div>

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
                                    <div className="lg-text-title2">{contentData.getContent("headerContactUsDialogT3")}</div>

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
    const contentData = useContext(ContentProviderContext);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "contact-us": {
                humanReadableName: contentData.getContent("f1ab4d68-c36d-4484-851d-58a6c48bc4ee"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

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
                    <div className="tw-flex lg-card tw-rounded-full tw-h-20 tw-w-20 tw-items-center tw-justify-center">
                        <img
                            src={iconUrl}
                            alt=""
                            className="tw-invert dark:tw-invert-0"
                        />
                    </div>
                </div>

                <div className="tw-flex tw-justify-center tw-row-start-3">
                    <div className="tw-text-center lg-text-body">{contentData.getContent(cardTextID)}</div>
                </div>
                <div className="tw-flex tw-justify-center tw-row-start-5">
                    <button
                        className="lg-cta-button tw-w-[11.875rem]"
                        onClick={() => {
                            setDialogOptions({dialogType: dialogType, headerTextContentId: buttonCtaTextID});
                            setIsContactUsDialogOpen(true);
                        }}
                    >
                        {contentData.getContent(buttonCtaTextID)}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-grid lg-px-screen-edge-2 tw-items-center tw-w-full", className)}
            id="contact-us"
            ref={sectionRef}
        >
            <DefaultTextAnimation className="lg-text-headline tw-text-center">
                <div dangerouslySetInnerHTML={{__html: appendSpaceToString(contentData.getContent("4e6a2a00-461a-4407-a51e-ebee08a59f1f"))}} />
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-2" />

            <DefaultTextAnimation className="lg-text-headline tw-text-center">
                <div dangerouslySetInnerHTML={{__html: appendSpaceToString(contentData.getContent("94cc6e89-af38-4bdf-9c02-f666eb559837"))}} />
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
    const contentData = useContext(ContentProviderContext);
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "request-a-service": {
                humanReadableName: contentData.getContent("bd423b50-de84-4397-9141-ac7b3527feb9"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-aspect-squre lg:tw-aspect-[1280/380] tw-grid tw-grid-rows-[minmax(0,1fr)_auto_auto_auto_1rem_auto_2.5rem] lg:tw-grid-rows-[minmax(0,1fr)_auto_auto_0.5rem_auto_minmax(0,1fr)] tw-text-center lg:tw-text-left lg:tw-grid-cols-[minmax(0,1fr)_minmax(0,1fr)]",
                className,
            )}
            id="request-a-service"
            ref={sectionRef}
        >
            <div className="tw-row-start-1 tw-col-start-1 tw-row-span-full tw-col-span-full">
                {isScreenSizeBelow == null ? null : (
                    <FullWidthImage
                        relativePath={isScreenSizeBelow ? "/livguard/service/1/mobile-banner.jpg" : "/livguard/service/1/desktop-banner.jpg"}
                        className="lg:tw-rounded-lg"
                        key={isScreenSizeBelow ? "/livguard/service/1/mobile-banner.jpg" : "/livguard/service/1/desktop-banner.jpg"}
                    />
                )}
            </div>

            <DefaultTextAnimation className="tw-row-start-3 lg:tw-row-start-2 tw-col-start-1 lg-px-screen-edge-2">
                <div className="lg-text-banner tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-start tw-text-center">
                    {contentData.getContent("16deb412-ea49-403d-9f2d-b8279dabd5a7")}
                </div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-row-start-4 lg:tw-row-start-3 tw-col-start-1 lg-px-screen-edge-2">
                <div className="lg-text-body !tw-text-secondary-900-dark tw-text-center">{contentData.getContent("1156ca19-8b0c-4c06-bd91-23e394bdee5f")}</div>
            </DefaultTextAnimation>

            <DefaultTextAnimation className="tw-flex tw-justify-center tw-row-start-6 lg:tw-row-start-5 tw-col-start-1 tw-z-10">
                <Link to="/service">
                    <button className="lg-text-body tw-px-10 tw-py-4 lg-cta-button tw-max-w-fit !tw-text-secondary-900-dark tw-place-self-center lg:tw-place-self-center tw-text-center">
                        {contentData.getContent("51d7f3dd-6922-4a86-8934-2eaf5ec55433")}
                    </button>
                </Link>
            </DefaultTextAnimation>
        </div>
    );
}

function FaqSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const faqs = [
        {
            question: "6c28b053-fb02-4e4f-8a8c-c12e13b26a6b",
            answer: "193ae870-2a1b-43dc-8976-c8d1ffac716e",
        },
        {
            question: "117094f1-4ea2-4f22-9bf6-b20b644a6564",
            answer: "09563cfb-01e9-42a4-b0e7-231b595c71c0",
        },
        {
            question: "c202866a-f6b2-4896-8f6c-9c5031e19a3c",
            answer: "daddd312-ee59-4332-a260-1650057bbc98",
        },
        {
            question: "1b52a6be-e8ae-415a-913a-ec5c882e70d3",
            answer: "8d2ef3a8-7ebf-4e1d-9d3e-35e69168d3ab",
        },
        {
            question: "f87ac2d7-a88e-4183-9b63-eabf706a7bce",
            answer: "3fbca4dc-48bf-44df-836c-ff8f24e08063",
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
