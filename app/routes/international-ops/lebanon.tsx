import {Dialog, Menu, Transition} from "@headlessui/react";
import type {ActionFunction, LinksFunction, LoaderFunction, MetaFunction} from "@remix-run/node";
import type {FetcherWithComponents} from "@remix-run/react";
import {Link, useFetcher} from "@remix-run/react";
import React, {Ref, useEffect, useRef, useState} from "react";
import {ArrowRight, ChevronDown, ChevronRight, Facebook, Instagram, Linkedin, Twitter, X, Youtube} from "react-bootstrap-icons";
import {useResizeDetector} from "react-resize-detector";
import {useLoaderData} from "react-router";
import {toast} from "react-toastify";
import {insertInternationalPageLeads} from "~/backend/dealer.server";
import {sendEmail} from "~/backend/email.server";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {EmbeddedYoutubeVideo} from "~/components/embeddedYoutubeVideo";
import {CoverImage} from "~/components/images/coverImage";
import {FixedWidthImage} from "~/components/images/fixedWidthImage";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {HiddenFormField} from "~/global-common-typescript/components/hiddenFormField";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {ImageCdnProvider} from "~/global-common-typescript/typeDefinitions";
import {getStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {concatenateNonNullStringsWithSpaces, generateUuid} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {emailIdValidationPattern, phoneNumberValidationPattern} from "~/global-common-typescript/utilities/validationPatterns";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import useIsMobile from "~/hooks/useIsScreenSizeBelow";
import {FormSelectComponent} from "~/livguard-common-typescript/scratchpad";
import {InternationalPageScaffold} from "~/routes/international-ops/internationalPageScaffold.component";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {UserPreferences} from "~/typeDefinitions";
import {Language} from "~/typeDefinitions";
import {getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";

export const meta: MetaFunction = ({data}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = data.userPreferences;
    if (userPreferences.language == Language.English) {
        return {
            title: "Your Energy Partners in Global Markets | Livguard Experts",
            description: "Contact Livguard Experts for limitless energy solutions in global markets. With 35 years of legacy, 35+ countries presence. Explore our product categories.",
            "og:title": "",
            "og:site_name": "",
            "og:url": "",
            "og:description": "",
            "og:type": "",
            "og:image": "",
        };
    } else if (userPreferences.language == Language.Hindi) {
        return {
            title: "شركاء طاقتك في الأسواق العالمية | خبراء ليفجار",
            description: "اتصل بخبراء ليفجارد للحصول على حلول طاقة لا حدود لها في الأسواق العالمية. بتراث يمتد لـ 35 عامًا وتواجد في أكثر من 35 دولة. استكشف فئات منتجاتنا.",
        };
    } else {
        throw Error(`Undefined language ${userPreferences.language}`);
    }
};

export const links: LinksFunction = () => {
    return [{rel: "canonical", href: "https://www.livguard.com/international/lebanon"}];
};

type LoaderData = {
    userPreferences: UserPreferences;
    redirectTo: string;
    pageUrl: string;
};

type ActionData = {
    error: string | null;
};

export const action: ActionFunction = async ({request, params}) => {
    const body = await request.formData();

    const name = safeParse(getStringFromUnknown, body.get("name"));
    const phoneNumber = safeParse(getStringFromUnknown, body.get("phoneNumber"));
    const email = safeParse(getStringFromUnknown, body.get("email"));
    const batteryQuantity = safeParse(getStringFromUnknown, body.get("batteryQuantity"));
    const city = safeParse(getStringFromUnknown, body.get("city"));
    const pinCode = safeParse(getStringFromUnknown, body.get("pinCode"));
    const termsAndConditionsChecked = safeParse(getStringFromUnknown, body.get("termsAndConditionsChecked"));
    const utmParameters = safeParse(getStringFromUnknown, body.get("utmParameters"));
    const pageUrl = safeParse(getStringFromUnknown, body.get("pageUrl"));

    if (name == null || phoneNumber == null || email == null || termsAndConditionsChecked == null || city == null || pinCode == null || utmParameters == null || pageUrl == null) {
        const actionData: ActionData = {
            error: "Inputs cannot be null! Error code: 4a4b3811-c7b9-4be6-a3de-c88fca555419",
        };
        return actionData;
    }

    const result = await insertInternationalPageLeads(generateUuid(), {
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        batteryQuantity: batteryQuantity,
        city: city,
        pinCode: pinCode,
        termsAndConditionsChecked: termsAndConditionsChecked,
        utmParameters: utmParameters,
        pageUrl: pageUrl,
    });

    if (result instanceof Error) {
        const actionData: ActionData = {
            error: "Error in submitting form! Error code: 362967f1-990a-4429-ab46-b5e287b332b9",
        };
        return actionData;
    }

    // TODO: Enable when email template and recipient list clarity is provided
    // const emailResult = await sendEmail(
    //     JSON.stringify({
    //         name: name,
    //         phoneNumber: phoneNumber,
    //         email: email,
    //         batteryQuantity: batteryQuantity,
    //         city: city,
    //         pinCode: pinCode,
    //         termsAndConditionsChecked: termsAndConditionsChecked,
    //         utmParameters: utmParameters,
    //         pageUrl: pageUrl,
    //     }),
    //     ["taranpreet.singh@growthjockey.com"],
    // );

    // if (emailResult instanceof Error) {
    //     const actionData: ActionData = {
    //         error: "Error in sending email! Error code: 3ec643f2-ffdb-4f6c-8b5e-070f96a13653",
    //     };
    //     return actionData;
    // }

    const actionData: ActionData = {
        error: null,
    };

    return actionData;
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

    const utmSearchParameters = useUtmSearchParameters();

    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
    const [selectedSubCategoryIndex, setSelectedSubCategoryIndex] = useState(0);

    const productCategories = ["e4352ec6-972a-46ff-85e6-a00de81e8d6d", "330a7f15-0687-4c44-bd72-a6e065e68a76", "972bdd2f-5007-4e40-be0f-c7ab8e22caf5"];
    const scrollToProductCategory = (categoryIndex: number, subCategoryIndex: number) => {
        setSelectedCategoryIndex(categoryIndex);
        setSelectedSubCategoryIndex(subCategoryIndex);
        const productCategoriesDiv = document.getElementById("product-categories");
        const y = productCategoriesDiv?.getBoundingClientRect().top ?? 0;
        scrollTo({
            top: window.scrollY + y - 64,
        });
    };

    return (
        <>
            <InternationalPageScaffold
                userPreferences={userPreferences}
                redirectTo={redirectTo}
                showMobileMenuIcon={true}
                utmParameters={utmSearchParameters}
                showContactCtaButton={false}
                showSearchOption={false}
                pageUrl={pageUrl}
                productCategories={productCategories}
                scrollToProductCategory={scrollToProductCategory}
            >
                <InternationalPageLebanon
                    userPreferences={userPreferences}
                    utmParameters={utmSearchParameters}
                    pageUrl={pageUrl}
                    selectedCategoryIndex={selectedCategoryIndex}
                    setSelectedCategoryIndex={setSelectedCategoryIndex}
                    selectedSubCategoryIndex={selectedSubCategoryIndex}
                    setSelectedSubCategoryIndex={setSelectedSubCategoryIndex}
                />
            </InternationalPageScaffold>

            {/* {
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: `
                        {
                            "@type": "SiteNavigationElement",
                            "name": "Contact Us",
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
            } */}
        </>
    );
}

function InternationalPageLebanon({
    userPreferences,
    utmParameters,
    pageUrl,
    selectedCategoryIndex,
    setSelectedCategoryIndex,
    selectedSubCategoryIndex,
    setSelectedSubCategoryIndex,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
    pageUrl: string;
    selectedCategoryIndex: number;
    setSelectedCategoryIndex: React.Dispatch<number>;
    selectedSubCategoryIndex: number;
    setSelectedSubCategoryIndex: React.Dispatch<number>;
}) {
    const fetcher = useFetcher();

    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [batteryQuantity, setBatteryQuantity] = useState(getVernacularString("a6eb5ef2-e65b-4d52-ba90-e07f86b7390e", userPreferences.language));
    const [city, setCity] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [termsAndConditionsChecked, setTermsAndConditionsChecked] = useState(true);

    const [formSuccessfullySubmitted, setFormSuccessfullySubmitted] = useState(false);

    useEffect(() => {
        if (fetcher.data == null) {
            return;
        }

        if (fetcher.data.error != null) {
            toast.error(fetcher.data.error);
            return;
        }

        setFormSuccessfullySubmitted(true);
    }, [fetcher.data]);

    return (
        <div className="tw-grid tw-grid-cols-1 tw-items-start tw-justify-center tw-bg-secondary-100-light dark:tw-bg-background-500-dark">
            <HeroSection
                userPreferences={userPreferences}
                className="tw-row-start-1 tw-col-start-1 lg:tw-col-span-full"
                utmParameters={utmParameters}
                pageUrl={pageUrl}
                fetcher={fetcher}
                name={name}
                setName={setName}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                email={email}
                setEmail={setEmail}
                batteryQuantity={batteryQuantity}
                setBatteryQuantity={setBatteryQuantity}
                city={city}
                setCity={setCity}
                pinCode={pinCode}
                setPinCode={setPinCode}
                termsAndConditionsChecked={termsAndConditionsChecked}
                setTermsAndConditionsChecked={setTermsAndConditionsChecked}
                formSuccessfullySubmitted={formSuccessfullySubmitted}
                setFormSuccessfullySubmitted={setFormSuccessfullySubmitted}
            />

            <div className="tw-block lg:tw-hidden tw-z-10">
                {!formSuccessfullySubmitted ? (
                    <InternationalBusinessContactForm
                        userPreferences={userPreferences}
                        utmParameters={utmParameters}
                        pageUrl={pageUrl}
                        fetcher={fetcher}
                        name={name}
                        setName={setName}
                        phoneNumber={phoneNumber}
                        setPhoneNumber={setPhoneNumber}
                        email={email}
                        setEmail={setEmail}
                        batteryQuantity={batteryQuantity}
                        setBatteryQuantity={setBatteryQuantity}
                        city={city}
                        setCity={setCity}
                        pinCode={pinCode}
                        setPinCode={setPinCode}
                        termsAndConditionsChecked={termsAndConditionsChecked}
                        setTermsAndConditionsChecked={setTermsAndConditionsChecked}
                        formSuccessfullySubmitted={formSuccessfullySubmitted}
                        setFormSuccessfullySubmitted={setFormSuccessfullySubmitted}
                    />
                ) : (
                    <InternationalBusinessContactFormSuccess userPreferences={userPreferences} />
                )}
            </div>

            <NumbersSection userPreferences={userPreferences} />

            <div className="tw-w-full">
                <CategoriesSection
                    userPreferences={userPreferences}
                    selectedCategoryIndex={selectedCategoryIndex}
                    setSelectedCategoryIndex={setSelectedCategoryIndex}
                    selectedSubCategoryIndex={selectedSubCategoryIndex}
                    setSelectedSubCategoryIndex={setSelectedSubCategoryIndex}
                />
            </div>

            <WhoWeAreSection userPreferences={userPreferences} />

            <WhyLivguardSection userPreferences={userPreferences} />

            <GetInTouchWithUsSection userPreferences={userPreferences} />
        </div>
    );
}

function HeroSection({
    userPreferences,
    className,
    utmParameters,
    pageUrl,
    fetcher,
    name,
    setName,
    phoneNumber,
    setPhoneNumber,
    email,
    setEmail,
    batteryQuantity,
    setBatteryQuantity,
    city,
    setCity,
    pinCode,
    setPinCode,
    termsAndConditionsChecked,
    setTermsAndConditionsChecked,
    formSuccessfullySubmitted,
    setFormSuccessfullySubmitted,
}: {
    userPreferences: UserPreferences;
    className?: string;
    utmParameters: {
        [searchParameter: string]: string;
    };
    pageUrl: string;
    fetcher: FetcherWithComponents<any>;
    name: string;
    setName: React.Dispatch<string>;
    phoneNumber: string;
    setPhoneNumber: React.Dispatch<string>;
    email: string;
    setEmail: React.Dispatch<string>;
    batteryQuantity: string;
    setBatteryQuantity: React.Dispatch<string>;
    city: string;
    setCity: React.Dispatch<string>;
    pinCode: string;
    setPinCode: React.Dispatch<string>;
    termsAndConditionsChecked: boolean;
    setTermsAndConditionsChecked: React.Dispatch<boolean>;
    formSuccessfullySubmitted: boolean;
    setFormSuccessfullySubmitted: React.Dispatch<boolean>;
}) {
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "lg-px-screen-edge md:tw-px-20",
                "tw-h-fit tw-min-h-[calc(100vh-var(--lg-header-height)-var(--lg-mobile-ui-height)-7.5rem)] lg:tw-min-h-[calc(100vh-6.5rem)]",
                "tw-grid tw-grid-cols-1 tw-grid-rows-[minmax(0,1fr)_auto_minmax(0,1fr)_auto] lg:tw-grid-cols-[minmax(0,1fr)_25rem] tw-gap-y-4 lg:tw-gap-x-6 lg:tw-gap-y-4 tw-justify-items-center",
                "tw-text-center lg:tw-text-left tw-relative tw-isolate",
                className,
            )}
            ref={ref}
        >
            {/* <CoverImage
                relativePath="/livguard/landing-pages/2/hero_image.jpg"
                className="tw-absolute tw-inset-0 -tw-z-10"
            /> */}

            {containerWidth == null || containerHeight == null ? null : (
                <CoverImage
                    relativePath={
                        containerHeight > containerWidth || containerWidth < 640 ? "/livguard/international/lebanon/1/banner-mobile.png" : "/livguard/international/lebanon/1/banner-desktop.png"
                    }
                    className="tw-absolute tw-inset-0 -tw-z-10"
                    key={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/international/lebanon/1/banner-mobile.png" : "/livguard/international/lebanon/1/banner-desktop.png"}
                />
            )}

            <DefaultTextAnimation className="tw-row-start-2 tw-col-start-1 lg:tw-row-start-2 lg:tw-col-start-1 tw-mx-[calc(-1*var(--lg-px-screen-edge))] lg-text-banner tw-text-center tw-text-white">
                <div dangerouslySetInnerHTML={{__html: getVernacularString("e3803682-49d9-4fb0-b444-a8f7de1d15a2", userPreferences.language)}} />
            </DefaultTextAnimation>

            <div className="tw-row-start-4 tw-col-start-1 lg:tw-row-start-4 lg:tw-col-start-1 tw-w-full tw-self-end">
                <img src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/offers/1/all-products.png").finalUrl, ImageCdnProvider.Bunny, null, null)} />
            </div>

            <div className="tw-row-start-4 tw-col-start-1 lg:tw-row-start-1 lg:tw-col-start-2 lg:tw-row-span-full tw-hidden lg:tw-block tw-self-center tw-w-full">
                {!formSuccessfullySubmitted ? (
                    <InternationalBusinessContactForm
                        userPreferences={userPreferences}
                        utmParameters={utmParameters}
                        pageUrl={pageUrl}
                        fetcher={fetcher}
                        name={name}
                        setName={setName}
                        phoneNumber={phoneNumber}
                        setPhoneNumber={setPhoneNumber}
                        email={email}
                        setEmail={setEmail}
                        batteryQuantity={batteryQuantity}
                        setBatteryQuantity={setBatteryQuantity}
                        city={city}
                        setCity={setCity}
                        pinCode={pinCode}
                        setPinCode={setPinCode}
                        termsAndConditionsChecked={termsAndConditionsChecked}
                        setTermsAndConditionsChecked={setTermsAndConditionsChecked}
                        formSuccessfullySubmitted={formSuccessfullySubmitted}
                        setFormSuccessfullySubmitted={setFormSuccessfullySubmitted}
                    />
                ) : (
                    <InternationalBusinessContactFormSuccess userPreferences={userPreferences} />
                )}
            </div>
        </div>
    );
}

function NumbersSection({userPreferences}: {userPreferences: UserPreferences}) {
    const {width: containerWidth, height: containerHeight, ref} = useResizeDetector();

    return (
        <div>
            <div
                className="tw-py-10 lg:tw-pt-20 lg:tw-pb-20 tw-text-white tw-relative tw-overflow-hidden"
                ref={ref}
            >
                {containerWidth == null || containerHeight == null ? null : (
                    // <CoverImage
                    //     relativePath={
                    //         containerHeight > containerWidth || containerWidth < 640 ? "/livguard/international/lebanon/2/banner-mobile.jpg" : "/livguard/international/lebanon/2/banner-desktop.jpg"
                    //     }
                    //     className="tw-absolute tw-inset-0 tw-bg-background-500-light"
                    //     key={containerHeight > containerWidth || containerWidth < 640 ? "/livguard/international/lebanon/2/banner-mobile.jpg" : "/livguard/international/lebanon/2/banner-desktop.jpg"}
                    //     imageClassName="tw-absolute tw-bottom-0"
                    // />
                    <img
                        src={
                            containerHeight > containerWidth || containerWidth < 1024
                                ? `${getAbsolutePathForRelativePath(
                                      getMetadataForImage("/livguard/international/lebanon/2/banner-mobile.jpg").finalUrl,
                                      ImageCdnProvider.Bunny,
                                      null,
                                      null,
                                  )}&gravity=0.5x0.5`
                                : `${getAbsolutePathForRelativePath(
                                      getMetadataForImage("/livguard/international/lebanon/2/banner-desktop.jpg").finalUrl,
                                      ImageCdnProvider.Bunny,
                                      3840,
                                      2160,
                                  )}&gravity=0.8x0.5`
                        }
                        key={
                            containerHeight > containerWidth || containerWidth < 1024
                                ? `${getAbsolutePathForRelativePath(getMetadataForImage("/livguard/international/lebanon/2/banner-mobile.jpg").finalUrl, ImageCdnProvider.Bunny, null, null)}`
                                : `${getAbsolutePathForRelativePath(getMetadataForImage("/livguard/international/lebanon/2/banner-desktop.jpg").finalUrl, ImageCdnProvider.Bunny, 3840, 2160)}`
                        }
                        className="tw-absolute tw-bottom-0 tw-w-full tw-bg-background-500-light tw-object-cover"
                    />
                )}

                <div className="tw-w-full tw-grid tw-grid-cols-1 lg:tw-grid-cols-3 tw-gap-y-[4.5rem] tw-max-w-7xl tw-mx-auto lg-px-screen-edge-2">
                    <div className="tw-col-span-full tw-w-full tw-z-[2]">
                        <div className="tw-text-center lg-text-headline tw-max-w-[35rem] tw-mx-auto">{getVernacularString("e9af9941-5944-4105-a9dd-9de72308536a", userPreferences.language)}</div>
                    </div>

                    <div className="tw-w-full tw-z-[2]">
                        <div className="tw-w-full tw-text-center tw-text-[3.75rem] lg:tw-text-[5rem] tw-leading-none tw-pb-1 lg:tw-pb-4 tw-whitespace-nowrap">
                            {getVernacularString("d2f9f210-6beb-4cf9-87b2-5cd8c5d5d66d", userPreferences.language)}
                        </div>

                        <div className="tw-w-full tw-text-center tw-text-[1.5rem] lg:tw-text-[2rem] tw-leading-none tw-whitespace-nowrap">
                            {getVernacularString("61565ab8-f715-495d-9029-09eb1426a986", userPreferences.language)}
                        </div>
                    </div>

                    <div className="tw-w-full tw-z-[2]">
                        <div className="tw-w-full tw-text-center tw-text-[3.75rem] lg:tw-text-[5rem] tw-leading-none tw-pb-1 lg:tw-pb-4 tw-whitespace-nowrap">
                            {getVernacularString("0c8bad55-25e9-479e-8714-21a3feb0abac", userPreferences.language)}
                        </div>

                        <div className="tw-w-full tw-text-center tw-text-[1.5rem] lg:tw-text-[2rem] tw-leading-none tw-whitespace-nowrap">
                            {getVernacularString("15b52a40-b4e0-4044-a74b-998f658de179", userPreferences.language)}
                        </div>
                    </div>

                    <div className="tw-w-full tw-z-[2]">
                        <div className="tw-w-full tw-text-center tw-text-[3.75rem] lg:tw-text-[5rem] tw-leading-none tw-pb-1 lg:tw-pb-4 tw-whitespace-nowrap">
                            {getVernacularString("f27f64b7-f12d-4a10-9ad6-cf0ed54bcc9a", userPreferences.language)}
                        </div>

                        <div className="tw-w-full tw-text-center tw-text-[1.5rem] lg:tw-text-[2rem] tw-leading-none tw-whitespace-nowrap">
                            {getVernacularString("c4f0437e-3d91-4f49-81f2-6ecdab6c94d3", userPreferences.language)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CategoriesSection({
    userPreferences,
    selectedCategoryIndex,
    setSelectedCategoryIndex,
    selectedSubCategoryIndex,
    setSelectedSubCategoryIndex,
}: {
    userPreferences: UserPreferences;
    selectedCategoryIndex: number;
    setSelectedCategoryIndex: React.Dispatch<number>;
    selectedSubCategoryIndex: number;
    setSelectedSubCategoryIndex: React.Dispatch<number>;
}) {
    const categories: Array<{
        title: string;
        iconRelativePath: string;
        subCategories: Array<{
            title: string;
            iconRelativePath: string;
            products: Array<{
                imageRelativeUrl: string;
                name: string;
                price: string;
                capacityTextPiece: string;
                warrantyTextPiece: string;
                dataSheetLink: string | null;
            }>;
        }>;
    }> = [
        {
            title: "c9264ed3-d08a-4c9a-9de2-604105e8fb83",
            iconRelativePath: "/livguard/home/3/3-icon.png",
            subCategories: [
                {
                    title: "5a2cf17f-40da-4f67-8fe0-8d08d7401f1c",
                    iconRelativePath: "/livguard/home/3/3-icon.png",
                    products: [
                        {
                            imageRelativeUrl: "/livguard/international/products/it200extt.png",
                            name: "IT200EXTT",
                            price: "XX,XXX",
                            capacityTextPiece: "internationalProductsIt200exttCapacity",
                            warrantyTextPiece: "internationalProductsIt200exttWarranty",
                            dataSheetLink: "https://www.livguard.com/static-assets/international-business/data-sheets/it200extt.pdf",
                        },
                        {
                            imageRelativeUrl: "/livguard/international/products/it230extt.png",
                            name: "IT230EXTT",
                            price: "XX,XXX",
                            capacityTextPiece: "internationalProductsIt230exttCapacity",
                            warrantyTextPiece: "internationalProductsIt230exttWarranty",
                            dataSheetLink: "https://www.livguard.com/static-assets/international-business/data-sheets/it230extt.pdf",
                        },
                        {
                            imageRelativeUrl: "/livguard/international/products/it260extt.png",
                            name: "IT260EXTT",
                            price: "XX,XXX",
                            capacityTextPiece: "internationalProductsIt260exttCapacity",
                            warrantyTextPiece: "internationalProductsIt260exttWarranty",
                            dataSheetLink: "https://www.livguard.com/static-assets/international-business/data-sheets/it260extt.pdf",
                        },
                        {
                            imageRelativeUrl: "/livguard/international/products/ls18060pttex.png",
                            name: "LS18060PTTEX",
                            price: "XX,XXX",
                            capacityTextPiece: "internationalProductsLs18060pttexCapacity",
                            warrantyTextPiece: "internationalProductsLs18060pttexWarranty",
                            dataSheetLink: "https://www.livguard.com/static-assets/international-business/data-sheets/ls20060ttex.pdf",
                        },
                        {
                            imageRelativeUrl: "/livguard/international/products/ls20060ttex.png",
                            name: "LS20060TTEX",
                            price: "XX,XXX",
                            capacityTextPiece: "internationalProductsLs20060ttexCapacity",
                            warrantyTextPiece: "internationalProductsLs20060ttexWarranty",
                            dataSheetLink: "https://www.livguard.com/static-assets/international-business/data-sheets/ls20060ttex.pdf",
                        },
                        {
                            imageRelativeUrl: "/livguard/international/products/ls24060ttex.png",
                            name: "LS24060TTEX",
                            price: "XX,XXX",
                            capacityTextPiece: "internationalProductsLs24060ttexCapacity",
                            warrantyTextPiece: "internationalProductsLs24060ttexWarranty",
                            dataSheetLink: "https://www.livguard.com/static-assets/international-business/data-sheets/ls24060ttex.pdf",
                        },
                    ],
                },
            ],
        },
        {
            title: "89e965e6-e1cd-4494-acca-539e38484973",
            iconRelativePath: "/livguard/home/3/3-icon.png",
            subCategories: [
                {
                    title: "6a54a900-6176-454c-9ef6-d9025fee97c9",
                    iconRelativePath: "/livguard/home/3/3-icon.png",
                    products: [
                        {
                            imageRelativeUrl: "/livguard/international/products/it200extt.png",
                            name: "IT200EXTT",
                            price: "XX,XXX",
                            capacityTextPiece: "internationalProductsIt200exttCapacity",
                            warrantyTextPiece: "internationalProductsIt200exttWarranty",
                            dataSheetLink: null,
                        },
                        {
                            imageRelativeUrl: "/livguard/international/products/it230extt.png",
                            name: "IT230EXTT",
                            price: "XX,XXX",
                            capacityTextPiece: "internationalProductsIt230exttCapacity",
                            warrantyTextPiece: "internationalProductsIt230exttWarranty",
                            dataSheetLink: null,
                        },
                        {
                            imageRelativeUrl: "/livguard/international/products/it260extt.png",
                            name: "IT260EXTT",
                            price: "XX,XXX",
                            capacityTextPiece: "internationalProductsIt260exttCapacity",
                            warrantyTextPiece: "internationalProductsIt260exttWarranty",
                            dataSheetLink: null,
                        },
                        {
                            imageRelativeUrl: "/livguard/international/products/it180extt.png",
                            name: "IT180EXTT",
                            price: "XX,XXX",
                            capacityTextPiece: "internationalProductsIt180exttCapacity",
                            warrantyTextPiece: "internationalProductsIt180exttWarranty",
                            dataSheetLink: null,
                        },
                        {
                            imageRelativeUrl: "/livguard/international/products/it160extt.png",
                            name: "IT160EXTT",
                            price: "XX,XXX",
                            capacityTextPiece: "internationalProductsIt160exttCapacity",
                            warrantyTextPiece: "internationalProductsIt160exttWarranty",
                            dataSheetLink: null,
                        },
                        {
                            imageRelativeUrl: "/livguard/international/products/it150extt.png",
                            name: "IT150EXTT",
                            price: "XX,XXX",
                            capacityTextPiece: "internationalProductsIt150exttCapacity",
                            warrantyTextPiece: "internationalProductsIt150exttWarranty",
                            dataSheetLink: null,
                        },
                        {
                            imageRelativeUrl: "/livguard/international/products/it110exstt.png",
                            name: "IT110EXSTT",
                            price: "XX,XXX",
                            capacityTextPiece: "internationalProductsIt110exsttCapacity",
                            warrantyTextPiece: "internationalProductsIt110exsttWarranty",
                            dataSheetLink: null,
                        },
                        {
                            imageRelativeUrl: "/livguard/international/products/it100exst.png",
                            name: "IT100EXST",
                            price: "XX,XXX",
                            capacityTextPiece: "internationalProductsIt100exstCapacity",
                            warrantyTextPiece: "internationalProductsIt100exstWarranty",
                            dataSheetLink: null,
                        },
                    ],
                },
            ],
        },
        {
            title: "db1db71c-a35e-45d6-9a7d-8035c009f5ec",
            iconRelativePath: "/livguard/home/3/4-icon.png",
            subCategories: [
                {
                    title: "c64a5e9d-ba14-41ff-9925-bda948a97c97",
                    iconRelativePath: "/livguard/home/3/4-icon.png",
                    products: [
                        {
                            imageRelativeUrl: "/livguard/international/products/ls18060pttex.png",
                            name: "LS18060PTTEX",
                            price: "XX,XXX",
                            capacityTextPiece: "internationalProductsLs18060pttexCapacity",
                            warrantyTextPiece: "internationalProductsLs18060pttexWarranty",
                            dataSheetLink: null,
                        },
                        {
                            imageRelativeUrl: "/livguard/international/products/ls20060ttex.png",
                            name: "LS20060TTEX",
                            price: "XX,XXX",
                            capacityTextPiece: "internationalProductsLs20060ttexCapacity",
                            warrantyTextPiece: "internationalProductsLs20060ttexWarranty",
                            dataSheetLink: null,
                        },
                        {
                            imageRelativeUrl: "/livguard/international/products/ls24060ttex.png",
                            name: "LS24060TTEX",
                            price: "XX,XXX",
                            capacityTextPiece: "internationalProductsLs24060ttexCapacity",
                            warrantyTextPiece: "internationalProductsLs24060ttexWarranty",
                            dataSheetLink: null,
                        },
                    ],
                },
            ],
        },
    ];

    const products = selectedCategoryIndex == -1 ? [] : categories[selectedCategoryIndex].subCategories[selectedSubCategoryIndex].products;

    const [isViewMore, setIsViewMore] = useState(false);

    const isScreenSizeBelow = useIsScreenSizeBelow(1024);

    //Added so that all accordions being closed state never happens on desktop
    useEffect(() => {
        if (!isScreenSizeBelow && selectedCategoryIndex === -1) {
            setSelectedCategoryIndex(0);
        }
    }, [isScreenSizeBelow]);

    const ref = useRef<HTMLDivElement | null>(null);

    return (
        <div
            className="tw-w-full lg-px-screen-edge md:tw-px-20 tw-py-10 lg:tw-py-20 tw-max-w-7xl tw-mx-auto"
            id="product-categories"
            ref={ref}
        >
            <div className="tw-w-full lg-text-headline tw-pb-6">{getVernacularString("08c13aeb-9558-4fe6-a6d2-9cc12c7f62bb", userPreferences.language)}</div>

            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-[20rem_minmax(0,1fr)] tw-gap-x-6 tw-gap-y-6">
                <div className="tw-grid lg:tw-grid-rows-[max-content_max-content_minmax(0,1fr)] tw-grid-cols-1 tw-gap-y-4">
                    <ItemBuilder
                        items={categories}
                        itemBuilder={(category, categoryIndex) => (
                            <div
                                className="tw-w-full tw-relative"
                                key={categoryIndex}
                            >
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (isScreenSizeBelow && categoryIndex === selectedCategoryIndex) {
                                            setSelectedCategoryIndex(-1);
                                        } else {
                                            setSelectedCategoryIndex(categoryIndex);
                                        }
                                        setSelectedSubCategoryIndex(0);
                                        setIsViewMore(false);
                                        ref.current?.scrollIntoView();
                                    }}
                                    className="tw-w-full lg-bg-secondary-100 dark:tw-bg-secondary-300-dark lg-international-shadow tw-p-4 tw-rounded-lg lg-text-title2 tw-grid tw-grid-cols-[auto_minmax(0,1fr)_2rem] tw-items-center tw-gap-x-4"
                                >
                                    <div
                                        className={concatenateNonNullStringsWithSpaces(
                                            "tw-w-12 tw-h-12 tw-grid tw-place-items-center tw-rounded-full tw-duration-200",
                                            categoryIndex == selectedCategoryIndex ? "lg-bg-primary-500" : "lg-bg-secondary-100 lg-contact-us-card-shadow",
                                        )}
                                    >
                                        <FixedWidthImage
                                            width="1.5rem"
                                            relativePath={category.iconRelativePath}
                                            className={categoryIndex === selectedCategoryIndex ? "tw-invert-0" : "tw-invert dark:tw-invert-0"}
                                        />
                                    </div>

                                    <div className="tw-text-left">{getVernacularString(category.title, userPreferences.language)}</div>

                                    <div className="tw-text-[1.5rem] md:tw-text-[2rem] tw-place-self-center">{categoryIndex == selectedCategoryIndex ? "–" : "+"}</div>
                                </button>

                                {categoryIndex != selectedCategoryIndex || selectedCategoryIndex == 0 || selectedCategoryIndex == -1 ? null : (
                                    <div className="tw-grid tw-grid-cols-1 tw-gap-y-2 tw-pt-2">
                                        <ItemBuilder
                                            items={category.subCategories}
                                            itemBuilder={(subCategory, subCategoryIndex) => (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedSubCategoryIndex(subCategoryIndex);
                                                        setIsViewMore(false);
                                                    }}
                                                    className="lg-bg-secondary-100 dark:tw-bg-secondary-300-dark tw-p-2 tw-pl-8 tw-rounded-lg lg-text-body-bold tw-grid tw-grid-cols-[auto_minmax(0,1fr)_1.5rem] tw-items-center tw-gap-x-4"
                                                    key={subCategoryIndex}
                                                >
                                                    <div
                                                        className={concatenateNonNullStringsWithSpaces(
                                                            "tw-w-10 tw-h-10 tw-grid tw-place-items-center tw-rounded-full tw-duration-200",
                                                            subCategoryIndex == selectedSubCategoryIndex ? "lg-bg-primary-500" : "lg-contact-us-card-shadow",
                                                        )}
                                                    >
                                                        <FixedWidthImage
                                                            width="1.25rem"
                                                            relativePath={subCategory.iconRelativePath}
                                                        />
                                                    </div>

                                                    <div className="tw-text-left">{getVernacularString(subCategory.title, userPreferences.language)}</div>

                                                    {/* <div className="tw-place-self-center">{subCategoryIndex == selectedSubCategoryIndex ? "-" : "+"}</div> */}
                                                </button>
                                            )}
                                        />
                                    </div>
                                )}

                                {isScreenSizeBelow == null || isScreenSizeBelow == false || categoryIndex != selectedCategoryIndex || selectedCategoryIndex == -1 ? null : (
                                    <ExploreOurCategoriesGrid
                                        userPreferences={userPreferences}
                                        products={products}
                                        isViewMore={isViewMore}
                                        setIsViewMore={setIsViewMore}
                                        className="tw-pt-6"
                                    />
                                )}
                            </div>
                        )}
                    />
                </div>

                {isScreenSizeBelow == null ||
                    (isScreenSizeBelow && (
                        <div className="tw-w-full tw-grid tw-justify-items-center">
                            <DownloadCatalogueButton userPreferences={userPreferences} />
                        </div>
                    ))}

                {isScreenSizeBelow == null || isScreenSizeBelow == true ? null : (
                    <>
                        <ExploreOurCategoriesGrid
                            userPreferences={userPreferences}
                            products={products}
                            isViewMore={isViewMore}
                            setIsViewMore={setIsViewMore}
                        />
                    </>
                )}
            </div>
        </div>
    );
}

function ExploreOurCategoriesGrid({
    userPreferences,
    products,
    isViewMore,
    setIsViewMore,
    className,
}: {
    userPreferences: UserPreferences;
    products: Array<{
        imageRelativeUrl: string;
        name: string;
        price: string;
        capacityTextPiece: string;
        warrantyTextPiece: string;
        dataSheetLink: string | null;
    }>;
    isViewMore: boolean;
    setIsViewMore: React.Dispatch<boolean>;
    className?: string;
}) {
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);

    const [breakLength, setBreakLength] = useState(6);

    useEffect(() => {
        if (isScreenSizeBelow != null && isScreenSizeBelow) {
            setBreakLength(4);
            return;
        }

        setBreakLength(6);
    }, [isScreenSizeBelow]);

    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-cols-1 tw-gap-y-6 tw-content-start", className)}>
            {/* lg:tw-grid-cols-[auto-fill(minmax(16rem,20rem))] */}
            <div className="tw-grid tw-grid-cols-2 sm:tw-grid-cols-3 tw-gap-x-2 tw-gap-y-4 md:tw-gap-x-4 tw-grid-flow-row">
                {isViewMore
                    ? products.map((product, productIndex) => {
                          return (
                              <ProductCard
                                  userPreferences={userPreferences}
                                  imageUrl={product.imageRelativeUrl}
                                  name={product.name}
                                  price={product.price}
                                  capacityText={getVernacularString(product.capacityTextPiece, userPreferences.language)}
                                  warrantyText={getVernacularString(product.warrantyTextPiece, userPreferences.language)}
                                  dataSheetLink={product.dataSheetLink}
                                  key={productIndex}
                              />
                          );
                      })
                    : products.slice(0, breakLength).map((product, productIndex) => {
                          return (
                              <ProductCard
                                  userPreferences={userPreferences}
                                  imageUrl={product.imageRelativeUrl}
                                  name={product.name}
                                  price={product.price}
                                  capacityText={getVernacularString(product.capacityTextPiece, userPreferences.language)}
                                  warrantyText={getVernacularString(product.warrantyTextPiece, userPreferences.language)}
                                  dataSheetLink={product.dataSheetLink}
                                  key={productIndex}
                              />
                          );
                      })}
            </div>

            <ExploreOurCategoriesGridCtaRow
                userPreferences={userPreferences}
                products={products}
                isViewMore={isViewMore}
                setIsViewMore={setIsViewMore}
                // className="tw-grid lg:tw-hidden"
            />
        </div>
    );
}

function ExploreOurCategoriesGridCtaRow({
    userPreferences,
    products,
    isViewMore,
    setIsViewMore,
    className,
}: {
    userPreferences: UserPreferences;
    products: Array<{
        imageRelativeUrl: string;
        name: string;
        price: string;
        capacityTextPiece: string;
        warrantyTextPiece: string;
        dataSheetLink: string | null;
    }>;
    isViewMore: boolean;
    setIsViewMore: React.Dispatch<boolean>;
    className?: string;
}) {
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);

    const [breakLength, setBreakLength] = useState(6);

    useEffect(() => {
        if (isScreenSizeBelow != null && isScreenSizeBelow) {
            setBreakLength(4);
            return;
        }

        setBreakLength(6);
    }, [isScreenSizeBelow]);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-grid tw-grid-cols-[repeat(2,auto)] lg:tw-grid-rows-[repeat(2,auto)] lg:tw-grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:tw-gap-y-6 lg:tw-justify-items-center tw-gap-x-0 tw-justify-center tw-items-center",
                className,
            )}
        >
            {products.length <= breakLength ? null : (
                <button
                    type="button"
                    className="lg-cta-outline-button !tw-text-primary-500-light dark:!tw-text-secondary-900-dark lg-bg-secondary-100 tw-w-fit lg:tw-w-full lg:tw-col-start-2"
                    onClick={() => {
                        setIsViewMore(!isViewMore);
                    }}
                >
                    {isViewMore
                        ? getVernacularString("b6fd32e9-4eaa-4f00-9b37-99c4c6959e22", userPreferences.language)
                        : getVernacularString("04dea09c-912e-4573-9a7f-7f13ebd0d8f2", userPreferences.language)}
                </button>
            )}

            {isScreenSizeBelow != null && isScreenSizeBelow ? null : (
                <div className="tw-w-full lg:tw-col-start-2">
                    <DownloadCatalogueButton userPreferences={userPreferences} />
                </div>
            )}
        </div>
    );
}

function DownloadCatalogueButton({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <Menu
            as="div"
            className="tw-relative"
        >
            <Menu.Button className="lg-cta-button tw-px-8 tw-w-fit lg:tw-w-full tw-grid tw-grid-cols-[minmax(0,1fr)_0.5rem_auto]">
                <div className="tw-col-start-1">{getVernacularString("50420609-5320-4ac3-8157-0f8397a29900", userPreferences.language)}</div>
                <ChevronDown className="tw-h-4 tw-col-start-3" />
            </Menu.Button>

            <Menu.Items className="tw-absolute tw-top-12 tw-left-0 tw-w-max  lg-bg-background-500 tw-border-2 tw-border-solid tw-border-primary-500-light tw-rounded-lg tw-grid tw-grid-cols-1">
                <Menu.Item>
                    <a
                        href="https://www.livguard.com/static-assets/international-business/livguard-batteries.pdf"
                        download
                        className="tw-w-fit tw-px-4 tw-py-2"
                        target="_blank"
                        rel="noreferrer"
                    >
                        {getVernacularString("7304b064-f70b-4ff8-8fd5-4c9dcf994143", userPreferences.language)}
                    </a>
                </Menu.Item>

                <div className="tw-w-full tw-h-px lg-bg-secondary-500" />

                <Menu.Item>
                    <a
                        href="https://www.livguard.com/static-assets/international-business/livguard-solar.pdf"
                        download
                        className="tw-w-fit tw-px-4 tw-py-2"
                        target="_blank"
                        rel="noreferrer"
                    >
                        {getVernacularString("51d64204-748f-4791-86c1-be0258c896ef", userPreferences.language)}
                    </a>
                </Menu.Item>
            </Menu.Items>
        </Menu>
    );
}

function ProductCard({
    userPreferences,
    imageUrl,
    name,
    price,
    capacityText,
    warrantyText,
    dataSheetLink,
}: {
    userPreferences: UserPreferences;
    imageUrl: string;
    name: string;
    price: string;
    capacityText: string;
    warrantyText: string;
    dataSheetLink: string | null;
}) {
    return (
        <div className="tw-grid tw-grid-flow-row lg-bg-secondary-100 dark:tw-bg-secondary-300-dark lg-international-shadow tw-rounded-lg tw-py-3 tw-px-2 lg:tw-py-6 lg:tw-px-4 tw-justify-items-center tw-gap-2">
            <div className="tw-w-full tw-aspect-square tw-grid tw-place-items-center">
                <FullWidthImage
                    relativePath={imageUrl}
                    key={imageUrl}
                />
            </div>

            <div className="tw-grid tw-grid-flow-col tw-items-center tw-gap-x-2 lg-text-title2">
                <img
                    className="tw-h-4 md:tw-h-5 dark:tw-invert"
                    src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/international/icons/voltage.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
                />
                <span className="tw-text-center">{capacityText}</span>
            </div>

            <div className="lg-text-icon">{name}</div>

            {/* <div>Starting From</div>

            <div>₹ {price}</div> */}

            <div className="tw-grid tw-grid-flow-col tw-items-center tw-gap-x-2 lg-text-icon">
                <img
                    className="tw-h-3 md:tw-h-[0.875rem] dark:tw-invert"
                    src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/international/icons/warranty.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
                />
                <span>{warrantyText}</span>
            </div>

            <VerticalSpacer className="tw-h-6" />

            {dataSheetLink == null ? null : (
                <a
                    href={dataSheetLink}
                    download
                    target="_blank"
                    rel="noreferrer"
                    // className="tw-mx-[calc(-1*var(--lg-px-screen-edge))] lg-text-primary-500 lg-text-body-bold tw-pt-4 tw-grid tw-grid-cols-[auto_auto] tw-items-center tw-justify-center tw-gap-x-2 tw-whitespace-nowrap tw-overflow-visible"
                    className="lg-cta-outline-button tw-px-4 !tw-text-primary-500-light dark:!tw-text-secondary-900-dark lg-text-body-bold  tw-text-center"
                >
                    {getVernacularString("50cc12a0-8bca-46cd-ae1e-37aa23b7cc5c", userPreferences.language)}
                    {/* <ChevronRight className="tw-h-4 md:tw-h-5" /> */}
                </a>
            )}
        </div>
    );
}

function WhoWeAreSection({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="lg-px-screen-edge md:tw-px-20 tw-py-10 lg:tw-py-20 tw-bg-background-500-light dark:!tw-bg-secondary-100-dark">
            <div className="tw-w-full tw-max-w-7xl tw-mx-auto">
                <div className="tw-w-full lg-text-headline lg-text-primary-500 tw-pb-6">{getVernacularString("ca34d256-88ce-4a33-a03b-d416c7f3f2d3", userPreferences.language)}</div>

                <div className="tw-w-full">{getVernacularString("610220d1-def4-4ce0-94bc-00344568570e", userPreferences.language)}</div>
            </div>
        </div>
    );
}

function WhyLivguardSection({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        // tw-py-10 lg:tw-py-20
        <div className="lg-px-screen-edge md:tw-px-20 tw-py-10 lg:tw-py-10">
            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-items-center tw-gap-x-12 tw-gap-y-6 tw-max-w-7xl tw-mx-auto">
                <div className="tw-w-full lg:tw-py-10">
                    <div className="tw-w-full lg-text-headline lg-text-primary-500 lg:tw-pb-2">{getVernacularString("e567b471-cc33-47a0-94fb-f1eda4724960", userPreferences.language)}</div>

                    <div className="lg-text-title2 tw-w-full tw-pb-4 lg:tw-pb-7">{getVernacularString("7bebe0ba-863e-4074-96c6-65e11c05099c", userPreferences.language)}</div>

                    {/* f5e9cdf7-6cf3-4c63-85e3-c0bd296204bf */}

                    <div className="tw-w-full">{getVernacularString("9fe1351b-a1a6-4ae5-be0a-9426c5ed9b12", userPreferences.language)}</div>
                </div>

                <div className="tw-w-full">
                    <EmbeddedYoutubeVideo
                        id="mpnBoJvAlMk"
                        style={{aspectRatio: "560/315"}}
                    />
                </div>
            </div>
        </div>
    );
}

function GetInTouchWithUsSection({userPreferences}: {userPreferences: UserPreferences}) {
    const [isContactUsDialogOpen, setIsContactUsDialogOpen] = useState(false);
    // TODO: Fix this
    const [dialogOptions, setDialogOptions] = useState<{dialogType: string; headerTextContentId: string}>({dialogType: "call-us", headerTextContentId: "contactUsS2Option1ButtonText"});

    function CallUsCard() {
        return (
            <div className="tw-w-full tw-grid tw-grid-cols-1 tw-items-center">
                <div className="tw-row-start-1 tw-rounded-full lg-bg-secondary-100 lg-contact-us-card-shadow tw-h-16 tw-w-16 tw-grid tw-items-center tw-justify-center tw-place-self-center">
                    <img
                        className="tw-w-8 tw-h-8 tw-invert dark:tw-invert-0"
                        src="https://files.growthjockey.com/livguard/icons/contact-us/call-us.svg"
                    />
                </div>

                <VerticalSpacer className="tw-h-4 tw-row-start-2" />

                <div className="tw-row-start-3 tw-grid tw-grid-flow-row tw-gap-4 tw-h-full">
                    <div className="lg-text-body tw-row-start-1 tw-place-self-center tw-text-center">{getVernacularString("4dbd6d59-b14a-43e7-968a-04b44513e509", userPreferences.language)}</div>

                    <button
                        type="button"
                        className="lg-cta-button tw-w-full tw-place-self-center tw-self-end tw-row-start-2 !tw-px-[0] tw-max-w-[12rem]"
                        onClick={() => {
                            setDialogOptions({dialogType: "call-us", headerTextContentId: "310ebdda-7d6d-4ff3-bdab-d8be5722b5f3"});
                            setIsContactUsDialogOpen(true);
                        }}
                    >
                        {getVernacularString("310ebdda-7d6d-4ff3-bdab-d8be5722b5f3", userPreferences.language)}
                    </button>
                </div>
            </div>
        );
    }

    function EmailUsCard() {
        return (
            <div className="tw-w-full tw-grid tw-grid-cols-1 tw-items-center tw-h-full">
                <div className="tw-row-start-1 tw-rounded-full lg-bg-secondary-100 lg-contact-us-card-shadow tw-h-16 tw-w-16 tw-grid tw-items-center tw-justify-center tw-place-self-center">
                    <img
                        className="tw-w-8 tw-h-8 tw-invert dark:tw-invert-0"
                        src="https://files.growthjockey.com/livguard/icons/contact-us/email-us.svg"
                    />
                </div>

                <VerticalSpacer className="tw-h-4 tw-row-start-2" />

                <div className="tw-row-start-3 tw-grid tw-grid-flow-row tw-gap-4 tw-h-full">
                    <div className="lg-text-body tw-row-start-1 tw-text-center">{getVernacularString("e120af86-fd42-46cf-9c34-9862535fc3e4", userPreferences.language)}</div>

                    <button
                        type="button"
                        className="lg-cta-button tw-w-full tw-place-self-center tw-self-end tw-row-start-2 !tw-px-[0] tw-max-w-[12rem]"
                        onClick={() => {
                            setDialogOptions({dialogType: "email-us", headerTextContentId: "4d277726-1e3a-48af-9dc8-55d2cae52861"});
                            setIsContactUsDialogOpen(true);
                        }}
                    >
                        {getVernacularString("4d277726-1e3a-48af-9dc8-55d2cae52861", userPreferences.language)}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="lg-px-screen-edge md:tw-px-20 tw-py-10 lg:tw-py-20 tw-bg-secondary-100-light dark:!tw-bg-background-500-dark">
            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-[minmax(20rem,1fr)_minmax(0,1fr)_auto] tw-items-center tw-gap-x-12 tw-gap-y-6 tw-max-w-7xl tw-mx-auto">
                <div className="tw-w-full lg:tw-py-10">
                    <div className="tw-w-full lg-text-headline tw-pb-2">{getVernacularString("a0700edd-f810-4d32-a628-b7c67972c5db", userPreferences.language)}</div>

                    <div className="tw-w-full">{getVernacularString("38c490a1-bee1-4081-a32f-2837ebbfecab", userPreferences.language)}</div>
                </div>

                <div className="lg:tw-col-start-3 tw-w-full tw-grid tw-grid-cols-2 lg:tw-grid-cols-2 tw-gap-x-6 tw-gap-y-6">
                    <CallUsCard />

                    <EmailUsCard />
                </div>

                <InternationalBusinessContactUsDialog
                    userPreferences={userPreferences}
                    isContactUsDialogOpen={isContactUsDialogOpen}
                    setIsContactUsDialogOpen={setIsContactUsDialogOpen}
                    headerTextContentId={dialogOptions.headerTextContentId}
                    dialogType={dialogOptions.dialogType}
                />
            </div>
        </div>
    );
}

function InternationalBusinessContactUsDialog({
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

                            <div className="lg-text-title2">{getVernacularString("d95cf021-4361-4855-b77f-fdaf49848385", userPreferences.language)}</div>

                            <VerticalSpacer className="tw-h-2" />

                            {dialogType == "call-us" ? (
                                <>
                                    <Link
                                        to="tel:+96179312446"
                                        className="tw-w-full lg-bg-primary-500 tw-text-secondary-900-dark tw-py-3 tw-px-4 tw-rounded-full"
                                    >
                                        <div className="tw-flex tw-flex-row tw-items-center">
                                            <div className="tw-flex-1">+96179312446</div>
                                            <img
                                                className="tw-w-6 tw-h-6 tw-flex-0"
                                                src="https://files.growthjockey.com/livguard/icons/contact-us/call-us-dialog.svg"
                                            />
                                        </div>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="mailto:info@gescolb.com"
                                        className="tw-w-full lg-bg-primary-500 tw-text-secondary-900-dark tw-py-3 tw-px-4 tw-rounded-full"
                                    >
                                        <div className="tw-flex tw-flex-row tw-items-center">
                                            <div className="tw-flex-1">info@gescolb.com</div>
                                            <img
                                                className="tw-w-6 tw-h-6 tw-flex-0"
                                                src="https://files.growthjockey.com/livguard/icons/contact-us/email-us-dialog.svg"
                                            />
                                        </div>
                                    </Link>

                                    <VerticalSpacer className="tw-h-4" />

                                    <Link
                                        to="mailto:khushboo.sethi@sar-group.com"
                                        className="tw-w-full lg-bg-primary-500 tw-text-secondary-900-dark tw-py-3 tw-px-4 tw-rounded-full"
                                    >
                                        <div className="tw-flex tw-flex-row tw-items-center">
                                            <div className="tw-flex-1">khushboo.sethi@sar-group.com</div>
                                            <img
                                                className="tw-w-6 tw-h-6 tw-flex-0"
                                                src="https://files.growthjockey.com/livguard/icons/contact-us/email-us-dialog.svg"
                                            />
                                        </div>
                                    </Link>

                                    <VerticalSpacer className="tw-h-4" />

                                    <Link
                                        to="mailto:export@sar-group.com"
                                        className="tw-w-full lg-bg-primary-500 tw-text-secondary-900-dark tw-py-3 tw-px-4 tw-rounded-full"
                                    >
                                        <div className="tw-flex tw-flex-row tw-items-center">
                                            <div className="tw-flex-1">export@sar-group.com</div>
                                            <img
                                                className="tw-w-6 tw-h-6 tw-flex-0"
                                                src="https://files.growthjockey.com/livguard/icons/contact-us/email-us-dialog.svg"
                                            />
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

export function InternationalBusinessContactForm({
    userPreferences,
    utmParameters,
    pageUrl,
    className,
    fetcher,
    name,
    setName,
    phoneNumber,
    setPhoneNumber,
    email,
    setEmail,
    batteryQuantity,
    setBatteryQuantity,
    city,
    setCity,
    pinCode,
    setPinCode,
    termsAndConditionsChecked,
    setTermsAndConditionsChecked,
    formSuccessfullySubmitted,
    setFormSuccessfullySubmitted,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
    pageUrl: string;
    className?: string;
    fetcher: FetcherWithComponents<any>;
    name: string;
    setName: React.Dispatch<string>;
    phoneNumber: string;
    setPhoneNumber: React.Dispatch<string>;
    email: string;
    setEmail: React.Dispatch<string>;
    batteryQuantity: string;
    setBatteryQuantity: React.Dispatch<string>;
    city: string;
    setCity: React.Dispatch<string>;
    pinCode: string;
    setPinCode: React.Dispatch<string>;
    termsAndConditionsChecked: boolean;
    setTermsAndConditionsChecked: React.Dispatch<boolean>;
    formSuccessfullySubmitted: boolean;
    setFormSuccessfullySubmitted: React.Dispatch<boolean>;
}) {
    const [step, setStep] = useState(0);

    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-flex tw-flex-col tw-z-[70] tw-isolate", className)}>
            <fetcher.Form
                className="tw-w-full lg:tw-rounded-[0.8rem] tw-grid tw-grid-rows-[2rem_auto_2rem_auto_1rem_auto_1rem_auto_1rem_auto_2.25rem_auto_0.15rem_auto_3rem] tw-relative tw-overflow-visible"
                method="post"
                onSubmit={(e) => {
                    if (step == 0) {
                        e.preventDefault();

                        setStep(1);

                        return;
                    }
                }}
            >
                {/* <div
                    className="tw-absolute -tw-top-4 tw-left-0 tw-right-0 lg-lead-form-top-gradient tw-h-[4rem] tw-z-10"
                    style={{clipPath: "ellipse(50% 100% at 50% 0%)"}}
                />

                <div
                    className="tw-absolute tw-top-0 tw-left-0 tw-right-0 lg-lead-form-top-gradient tw-h-[4rem] tw-opacity-50 tw-z-10"
                    style={{clipPath: "ellipse(50% 100% at 50% 0%)"}}
                />

                <div className="tw-absolute tw-top-[2.5rem] tw-left-0 tw-right-0 tw-h-[2.5rem] tw-grid tw-justify-center tw-z-10">
                    <div className="tw-w-[2.5rem] tw-h-[2.5rem] tw-rounded-full tw-bg-secondary-100-light tw-grid tw-items-center tw-justify-center">
                        <img
                            src="https://files.growthjockey.com/livguard/icons/form/livguard.svg"
                            alt="livguard"
                            className="tw-w-6 tw-h-6"
                        />
                    </div>
                </div> */}

                <div className="tw-absolute tw-w-full tw-h-full tw-inset-0 tw-rounded-lg tw-overflow-hidden tw-bg-[#e9e9e9] tw-opacity-80 tw-z-8" />

                <div className="tw-row-start-2 tw-w-full tw-text-[1.5rem] !tw-text-black tw-text-center tw-z-10">
                    {getVernacularString("39eabaec-19d2-45df-9abd-d45e783cfdcc", userPreferences.language)}
                </div>

                {step == 0 ? (
                    <>
                        <div className="tw-row-start-4 tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10">
                            <div className="lg-text-body-bold tw-pl-3 !tw-text-black">{getVernacularString("ca8542ad-35b6-46bc-bb66-6f133efda660", userPreferences.language)}</div>

                            <VerticalSpacer className="tw-h-1" />

                            <input
                                type="text"
                                name="name"
                                className="lg-text-input dark:!tw-border-black"
                                required
                                placeholder={getVernacularString("d2147fbf-37be-4867-b05a-5d955232d4ae", userPreferences.language)}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="tw-row-start-6 tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10">
                            <div className="lg-text-body-bold tw-pl-3 !tw-text-black">{getVernacularString("a7dca451-3b2d-4c5a-a3f0-60d50765e7ae", userPreferences.language)}</div>

                            <VerticalSpacer className="tw-h-1" />

                            <input
                                type="text"
                                name="phoneNumber"
                                className="lg-text-input dark:!tw-border-black"
                                pattern={phoneNumberValidationPattern}
                                required
                                placeholder={getVernacularString("4cc79e16-057f-4d9a-a485-5ede1ac4bec6", userPreferences.language)}
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>

                        <div className="tw-row-start-[8] tw-col-start-1 tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10">
                            <div className="lg-text-body-bold tw-pl-3 !tw-text-black">{getVernacularString("03692181-3b16-4c29-a125-37832d186f8b", userPreferences.language)}</div>

                            <VerticalSpacer className="tw-h-1" />

                            <input
                                type="text"
                                name="emailId"
                                className="lg-text-input dark:!tw-border-black"
                                pattern={emailIdValidationPattern}
                                required
                                placeholder={getVernacularString("ab22c1ba-35c8-4435-8d2a-1d978582abc8", userPreferences.language)}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="tw-row-start-[10] tw-col-start-1 tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-20">
                            <div className="lg-text-body-bold tw-pl-3 !tw-text-black">{getVernacularString("7fcce52e-a757-41ee-92e7-d6e54fc3d8a9", userPreferences.language)}</div>

                            <VerticalSpacer className="tw-h-1" />

                            <FormSelectComponent
                                items={["1", "2", "5", "10", "More than 10"]}
                                itemBuilder={(item) => (item == null ? `${getVernacularString("a6eb5ef2-e65b-4d52-ba90-e07f86b7390e", userPreferences.language)}` : `<div class="">${item}</div>`)}
                                value={batteryQuantity}
                                setValue={(item) => setBatteryQuantity(item)}
                                key={userPreferences.language}
                                buttonClassName="!tw-rounded-full tw-px-4 dark:!tw-border-black"
                            />
                        </div>

                        <div className="tw-row-start-[12] tw-w-full tw-flex tw-flex-row tw-gap-x-2 tw-justify-center tw-items-center lg-px-screen-edge tw-z-10">
                            <input
                                type="checkbox"
                                name="termsAndConditionsChecked"
                                style={{accentColor: `${termsAndConditionsChecked ? "#eb2a2b" : "white"}`}}
                                checked={termsAndConditionsChecked}
                                required
                                onChange={(e) => setTermsAndConditionsChecked(e.target.checked)}
                            />

                            <div
                                dangerouslySetInnerHTML={{__html: getVernacularString("bb6ae191-31a7-4cdc-8654-f1f4c3c9f4f5", userPreferences.language)}}
                                className="!tw-text-black"
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="tw-row-start-4 tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10">
                            <div className="lg-text-body-bold tw-pl-3 !tw-text-black">{getVernacularString("edf58613-1a70-43ea-abaa-5bc822f90ced", userPreferences.language)}</div>

                            <VerticalSpacer className="tw-h-1" />

                            <input
                                type="text"
                                name="city"
                                className="lg-text-input dark:!tw-border-black"
                                required
                                placeholder={getVernacularString("9ff2ffc9-633e-482a-b720-c015f9c4aea4", userPreferences.language)}
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>

                        <div className="tw-row-start-6 tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10">
                            <div className="lg-text-body-bold tw-pl-3 !tw-text-black">{getVernacularString("0819dd0a-c836-4176-a121-888513e3bc8a", userPreferences.language)}</div>

                            <VerticalSpacer className="tw-h-1" />

                            <input
                                type="text"
                                name="pinCode"
                                className="lg-text-input dark:!tw-border-black"
                                // TODO: Ensure this works for international pages
                                // pattern={pinCodeValidationPattern}
                                required
                                placeholder={getVernacularString("4c2ec5ee-e69d-477a-a882-cf4e3254a6e0", userPreferences.language)}
                                value={pinCode}
                                onChange={(e) => setPinCode(e.target.value)}
                            />
                        </div>

                        <HiddenFormField
                            name="name"
                            value={name}
                            required={true}
                        />

                        <HiddenFormField
                            name="email"
                            value={email}
                            required={true}
                            pattern={emailIdValidationPattern}
                        />

                        <HiddenFormField
                            name="phoneNumber"
                            value={phoneNumber}
                            required={true}
                            pattern={phoneNumberValidationPattern}
                        />

                        <HiddenFormField
                            name="batteryQuantity"
                            value={batteryQuantity}
                            required={true}
                        />

                        <HiddenFormField
                            name="termsAndConditionsChecked"
                            value={termsAndConditionsChecked ? "on" : "off"}
                            required={true}
                        />

                        <HiddenFormField
                            name="utmParameters"
                            value={JSON.stringify(utmParameters)}
                            required={true}
                        />

                        <HiddenFormField
                            name="pageUrl"
                            value={pageUrl}
                            required={true}
                        />

                        {/* <div className="tw-row-start-6 tw-col-start-1 tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10">
                            <div className="lg-text-body-bold tw-pl-3 tw-text-white">{getVernacularString("contactUsT4", userPreferences.language)}</div>

                            <VerticalSpacer className="tw-h-1" />

                            <input
                                type="text"
                                name="emailId"
                                className="lg-text-input"
                                pattern={emailIdValidationPattern}
                                required
                                placeholder={getVernacularString("contactUsT4E", userPreferences.language)}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div> */}
                    </>
                )}

                <div className="tw-row-start-[14] tw-col-start-1 tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10">
                    <button
                        type="submit"
                        className="lg-cta-button disabled:!tw-bg-none disabled:!tw-bg-[#474546] tw-px-4 tw-self-center tw-w-60 !tw-text-white"
                        // disabled={fetcher.state != "idle" || name == "" || email == "" || phoneNumber == ""}
                        disabled={
                            name === "" ||
                            phoneNumber === "" ||
                            email === "" ||
                            batteryQuantity === getVernacularString("a6eb5ef2-e65b-4d52-ba90-e07f86b7390e", userPreferences.language) ||
                            termsAndConditionsChecked == false
                        }
                    >
                        {getVernacularString("779190ac-85b3-4bb2-b02a-bd3932455bf1", userPreferences.language)}
                    </button>
                </div>
            </fetcher.Form>
        </div>
    );
}

function InternationalBusinessContactFormSuccess({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-flex tw-flex-col lg:tw-max-w-[25rem] lg:tw-mx-auto tw-h-full", className)}>
            {/* tw-grid-rows-[5rem_min-content_0.5rem_max-content_0.5rem_max-content_0.5rem_max-content_2rem] */}
            <div className="tw-w-full lg:tw-rounded-lg tw-grid tw-grid-cols-1 tw-overflow-hidden tw-relative tw-h-full">
                <div
                    className="tw-absolute -tw-top-4 tw-left-0 tw-right-0 lg-lead-form-top-gradient tw-h-[4rem] tw-z-10"
                    style={{clipPath: "ellipse(50% 100% at 50% 0%)"}}
                />

                <div
                    className="tw-absolute tw-top-0 tw-left-0 tw-right-0 lg-lead-form-top-gradient tw-h-[4rem] tw-opacity-50 tw-z-10"
                    style={{clipPath: "ellipse(50% 100% at 50% 0%)"}}
                />

                <div className="tw-absolute tw-top-[2.5rem] tw-left-0 tw-right-0 tw-h-[2.5rem] tw-grid tw-justify-center tw-z-10">
                    <div className="tw-w-[2.5rem] tw-h-[2.5rem] tw-rounded-full tw-bg-secondary-100-light tw-grid tw-items-center tw-justify-center">
                        <img
                            src="https://files.growthjockey.com/livguard/icons/form/livguard.svg"
                            alt="livguard"
                            className="tw-w-6 tw-h-6"
                        />
                    </div>
                </div>

                <div className="tw-absolute tw-inset-0">
                    <CoverImage
                        relativePath="/livguard/contact-form/background.jpg"
                        className="tw-rounded-lg tw-opacity-70"
                    />
                </div>

                <VerticalSpacer className="tw-h-24" />

                <div className="tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10 tw-items-center">
                    <FixedWidthImage
                        relativePath="/livguard/icons/confirmation.png"
                        width="10rem"
                    />
                </div>

                <VerticalSpacer className="tw-h-2" />

                <div className="tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10 tw-items-center tw-text-center">
                    <div
                        dangerouslySetInnerHTML={{__html: getVernacularString("6c5ae599-d51b-4089-92f7-ccfad1cd6f92", userPreferences.language)}}
                        className="lg-text-banner tw-text-secondary-100-light"
                    />
                </div>

                <VerticalSpacer className="tw-h-2" />

                <div className="tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10 tw-items-center tw-text-center">
                    <div
                        dangerouslySetInnerHTML={{__html: getVernacularString("c5e3ae47-a9e3-49b1-a414-2bd6d2d5737c", userPreferences.language)}}
                        className="lg-text-title2 tw-text-secondary-100-light"
                    />
                </div>

                <VerticalSpacer className="tw-h-2" />

                <div className="tw-col-start-1 tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10 tw-items-center tw-text-center">
                    <div className="tw-w-full tw-flex tw-justify-evenly">
                        <a
                            href="https://www.facebook.com/LivguardEnergy/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Facebook className="tw-w-6 tw-h-6 hover:lg-text-primary-500 tw-text-secondary-100-light tw-mt-[6px] tw-duration-200" />
                        </a>
                        <a
                            href="https://twitter.com/LivguardEnergy"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Twitter className="tw-w-6 tw-h-6 hover:lg-text-primary-500 tw-text-secondary-100-light tw-mt-[6px] tw-duration-200" />
                        </a>
                        <a
                            href="https://www.instagram.com/livguardenergy/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Instagram className="tw-w-6 tw-h-6 hover:lg-text-primary-500 tw-text-secondary-100-light tw-mt-[6px] tw-duration-200" />
                        </a>
                        <a
                            href="https://www.linkedin.com/company/livguard-energy/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Linkedin className="tw-w-6 tw-h-6 hover:lg-text-primary-500 tw-text-secondary-100-light tw-mt-[6px] tw-duration-200" />
                        </a>
                        <a
                            href="https://www.youtube.com/@LivguardEnergy"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Youtube className="tw-w-6 tw-h-6 hover:lg-text-primary-500 tw-text-secondary-100-light tw-mt-[6px] tw-duration-200" />
                        </a>
                    </div>

                    <VerticalSpacer className="tw-h-4" />

                    <div
                        dangerouslySetInnerHTML={{__html: getVernacularString("5389e85c-776b-4979-86df-1b323b6ca815", userPreferences.language)}}
                        className="lg-text-body tw-text-secondary-100-light"
                    />
                </div>

                <VerticalSpacer className="tw-h-8" />
            </div>
        </div>
    );
}
