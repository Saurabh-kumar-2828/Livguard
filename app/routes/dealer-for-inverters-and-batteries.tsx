import {GoogleMap, LoadScript, MarkerF} from "@react-google-maps/api";
import type {ActionFunction, LinksFunction, LoaderFunction, MetaFunction, V2_MetaFunction} from "@remix-run/node";
import {Form, Link, useActionData, useFetcher, useTransition} from "@remix-run/react";
import React, {useContext, useEffect, useReducer, useRef, useState} from "react";
import {Facebook, Instagram, Linkedin, Twitter, X, Youtube} from "react-bootstrap-icons";
import {useLoaderData} from "react-router";
import {toast} from "react-toastify";
import {getDealerForCity, insertQueryLeads} from "~/backend/dealer.server";
import {SocialHandles} from "~/components/category/common";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {FaqSectionInternal} from "~/components/faqs";
import LivguardDialog from "~/components/livguardDialog";
import {PageScaffold} from "~/components/pageScaffold";
import {EmptyFlexFiller} from "~/global-common-typescript/components/emptyFlexFiller";
import {FixedWidthImage} from "~/components/images/fixedWidthImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {ImageCdnProvider, ImageMetadata, type Uuid} from "~/common--type-definitions/typeDefinitions";
import {getNonEmptyStringFromUnknown} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {concatenateNonNullStringsWithSpaces, generateUuid} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {emailIdValidationPattern, indianPhoneNumberValidationPattern} from "~/global-common-typescript/utilities/validationPatterns";
import {ContactUsCta} from "~/routes";
import type {FormStateInputsAction} from "~/routes/lead-form.state";
import {FormStateInputsActionType, FormStateInputsReducer, createInitialFormState} from "~/routes/lead-form.state";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import type {Dealer, UserPreferences} from "~/typeDefinitions";
import {Language} from "~/typeDefinitions";
import {getMetadataForImage, getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {getContentGenerator} from "~/vernacularProvider";
import {StickyBottomBar} from "~/components/bottomBar";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {getVernacularFromBackend} from "~/backend/vernacularProvider.server";
import {ContentProviderContext} from "~/contexts/contentProviderContext";
import {getImageMetadataLibraryFromBackend, getMetadataForImageServerSide} from "~/backend/imageMetaDataLibrary.server";
import {ImageProviderContext} from "~/contexts/imageMetaDataContext";
import {FormSubmissionSuccessLivguardDialog} from "~/components/formSubmissionSuccessLivguardDialog";

export const meta: V2_MetaFunction = ({data: loaderData}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = loaderData.userPreferences;
    if (userPreferences.language == Language.English) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "https://www.livguard.com/dealer-for-inverters-and-batteries/",
            },
            {
                title: "Dealer Locator | Find Livguard inverter battery shop near you",
            },
            {
                name: "description",
                content: "Locate authorized dealers near you to easily purchase Livguard Inverters and Inverter batteries. Contact the Livguard customer care number for enquiry",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/dealer-for-inverters-and-batteries/",
            },
            {
                property: "og:title",
                content: "Dealer Locator | Find Livguard inverter battery shop near you",
            },
            {
                property: "og:description",
                content: "Locate authorized dealers near you to easily purchase Livguard Inverters and Inverter batteries. Contact the Livguard customer care number for enquiry",
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
            {
                "script:ld+json": {
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    itemListElement: [
                        {
                            "@type": "ListItem",
                            position: 1,
                            name: "LivGuard",
                            item: "https://www.livguard.com/",
                            description:
                                " We Are One of A Kind With Livguard, you are always in trusted hands. In just 9 years, Livguard has become the fastest-growing Energy Storage Solutions brand. Our zeal to develop a complete and connected ecosystem of happy customers, committed partners, & the best quality every time has made us the choice of people nationwide.",
                            image: [" https://files.growthjockey.com/livguard/icons/logo-dark.svg"],
                        },
                        {
                            "@type": "ListItem",
                            position: 2,
                            name: "Dealer Locator",
                            item: "https://www.livguard.com/inverter-batteries",
                            description: "Find the Livguard dealer near you",
                        },
                        {
                            "@type": "SiteNavigationElement",
                            name: "Livguard",
                            url: "https://www.livguard.com/",
                            description:
                                " We Are One of A Kind With Livguard, you are always in trusted hands. In just 9 years, Livguard has become the fastest-growing Energy Storage Solutions brand. Our zeal to develop a complete and connected ecosystem of happy customers, committed partners, & the best quality every time has made us the choice of people nationwide.",
                            image: ["https://files.growthjockey.com/livguard/icons/logo-dark.svg"],
                        },
                        {
                            "@type": "SiteNavigationElement",
                            name: "Dealer Locator",
                            url: "https://www.livguard.com/inverter-batteries",
                            description: "Find the Livguard dealer near you",
                        },
                    ],
                },
            },
        ];
    } else if (userPreferences.language == Language.Hindi) {
        return [
            {
                tagName: "link",
                rel: "canonical",
                href: "",
            },
            {
                title: "डीलर लोकेटर | नज़दीकी लिवगार्ड इनवर्टर बैटरी की दुकान खोजें",
            },
            {
                name: "description",
                content: "लिवगार्ड इनवर्टर और इन्वर्टर बैटरी आसानी से खरीदने के लिए अपने आस-पास अधिकृत डीलरों का पता लगाएं। सहायता के लिए लिवगार्ड ग्राहक सेवा नंबर पर संपर्क करें",
            },
            {
                property: "og:url",
                content: "https://www.livguard.com/dealer-for-inverters-and-batteries/",
            },
            {
                property: "og:title",
                content: "डीलर लोकेटर | नज़दीकी लिवगार्ड इनवर्टर बैटरी की दुकान खोजें",
            },
            {
                property: "og:description",
                content: "लिवगार्ड इनवर्टर और इन्वर्टर बैटरी आसानी से खरीदने के लिए अपने आस-पास अधिकृत डीलरों का पता लगाएं। सहायता के लिए लिवगार्ड ग्राहक सेवा नंबर पर संपर्क करें",
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

type DealerLocatorActionData = {
    dealerList: Array<Dealer> | null;
    error: string | null;
};

export const action: ActionFunction = async ({request, params}) => {
    const body = await request.formData();

    const query = getNonEmptyStringFromUnknown(body.get("query")) as string;
    const dealerList = await getDealerForCity(query);
    // TOOD: Handle dealerList error
    if (dealerList instanceof Error) {
        return {
            dealerList: null,
            error: dealerList.message,
        };
    }

    const result = await insertQueryLeads(query);
    if (result instanceof Error) {
        return {
            dealerList: null,
            error: result.message,
        };
    }

    const actionData: DealerLocatorActionData = {
        dealerList: dealerList,
        error: null,
    };
    return actionData;
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

export const loader: LoaderFunction = async ({request, params}) => {
    const userPreferences = await getUserPreferencesFromCookiesAndUrlSearchParameters(request);
    if (userPreferences instanceof Error) {
        throw userPreferences;
    }

    const vernacularData = getVernacularFromBackend("dealerLocatorPage", userPreferences.language);
    const imageMetaDataLibrary = getImageMetadataLibraryFromBackend("dealerLocatorPage");
    const ogBanner = getAbsolutePathForRelativePath(getMetadataForImageServerSide("/livguard/common/og-banner.jpg").finalUrl, ImageCdnProvider.Bunny, 764, null);

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
    const [isApplyNowDialogOpen, setIsApplyNowDialogOpen] = useState(false);

    const actionData = useActionData();

    const utmSearchParameters = useUtmSearchParameters();

    useEffect(() => {
        if (actionData != null && actionData.error != null) {
            toast.error(actionData.error);
        }
    }, [actionData]);

    return (
        <>
            <ImageProviderContext.Provider value={imageMetaDataLibrary}>
                <ContentProviderContext.Provider
                    value={{
                        getContent: getContentGenerator(vernacularData),
                    }}
                >
                    <div className="tw-flex tw-flex-col tw-relative">
                        <PageScaffold
                            userPreferences={userPreferences}
                            redirectTo={redirectTo}
                            showMobileMenuIcon={true}
                            utmParameters={utmSearchParameters}
                            pageUrl={pageUrl}
                            breadcrumbs={[
                                {contentId: "cfab263f-0175-43fb-91e5-fccc64209d36", link: "/"},
                                {contentId: "ee7b3699-a35c-4ad9-981d-ee178abd03e3", link: "#"},
                            ]}
                        >
                            <DealerLocatorPage
                                userPreferences={userPreferences}
                                actionData={actionData}
                                utmParameters={utmSearchParameters}
                                className="lg:tw-px-[60px]"
                                pageUrl={pageUrl}
                                setIsApplyNowDialogOpen={setIsApplyNowDialogOpen}
                            />
                        </PageScaffold>

                        {/* <DealerLocatorPageBottomBar
                userPreferences={userPreferences}
                setApplyNowDialogOpen={setIsApplyNowDialogOpen}
            /> */}

                        <ApplyNowForDealerDialog
                            userPreferences={userPreferences}
                            isApplyNowDialogOpen={isApplyNowDialogOpen}
                            setApplyNowDialogOpen={setIsApplyNowDialogOpen}
                            utmParameters={utmSearchParameters}
                            pageUrl={pageUrl}
                        />

                        {/* <div className="tw-hidden lg:tw-block tw-sticky tw-left-[1rem] tw-bottom-[1.75rem] tw-bg-gradient-to-r tw-from-[#F25F60] tw-to-[#EB2A2B] tw-rounded-full tw-py-2 tw-px-4 tw-max-w-fit">
                <a
                    href="/offers/inverter-and-battery-jodi"
                    className="tw-grid tw-grid-cols-[auto_0.5rem_auto] tw-items-center"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="tw-col-start-1"
                    >
                        <path
                            d="M20.5373 11.285C20.4488 11.1039 20.4488 10.8962 20.5373 10.7151L21.3579 9.03657C21.8147 8.10196 21.4527 6.988 20.5338 6.50044L18.8834 5.62474C18.7053 5.5303 18.5833 5.36221 18.5484 5.16373L18.2256 3.32344C18.0459 2.29881 17.0981 1.61028 16.0683 1.75599L14.2183 2.01767C14.0187 2.04585 13.8212 1.98166 13.6764 1.84154L12.3336 0.542515C11.5859 -0.180817 10.4146 -0.18086 9.66691 0.542515L8.32406 1.84167C8.17917 1.98183 7.98173 2.0459 7.7821 2.0178L5.93218 1.75612C4.90201 1.61033 3.95455 2.29894 3.77481 3.32357L3.45203 5.16378C3.41719 5.36229 3.29511 5.53034 3.11709 5.62483L1.46667 6.50053C0.54775 6.98805 0.185783 8.10209 0.642624 9.0367L1.46311 10.7152C1.55162 10.8963 1.55162 11.104 1.46311 11.2851L0.642581 12.9636C0.18574 13.8982 0.547707 15.0122 1.46663 15.4998L3.11705 16.3755C3.29511 16.4699 3.41719 16.638 3.45203 16.8365L3.77481 18.6768C3.93844 19.6095 4.73825 20.2637 5.65748 20.2636C5.74801 20.2636 5.83988 20.2572 5.93222 20.2442L7.78214 19.9825C7.98164 19.9542 8.17921 20.0185 8.3241 20.1586L9.66691 21.4576C10.0408 21.8194 10.5204 22.0002 11.0002 22.0001C11.4799 22.0001 11.9598 21.8193 12.3335 21.4576L13.6764 20.1586C13.8213 20.0185 14.0188 19.9545 14.2183 19.9825L16.0683 20.2442C17.0986 20.3899 18.0459 19.7014 18.2256 18.6767L18.5485 16.8365C18.5833 16.638 18.7054 16.4699 18.8834 16.3755L20.5338 15.4998C21.4527 15.0122 21.8147 13.8982 21.3579 12.9636L20.5373 11.285ZM8.46246 5.29019C9.74516 5.29019 10.7887 6.33377 10.7887 7.61646C10.7887 8.89916 9.74516 9.94273 8.46246 9.94273C7.17977 9.94273 6.13619 8.89916 6.13619 7.61646C6.13619 6.33377 7.17977 5.29019 8.46246 5.29019ZM7.26175 15.6357C7.13787 15.7596 6.97549 15.8216 6.81316 15.8216C6.65082 15.8216 6.4884 15.7596 6.36457 15.6357C6.11681 15.388 6.11681 14.9862 6.36457 14.7385L14.7387 6.3644C14.9864 6.11665 15.3881 6.11665 15.6359 6.3644C15.8836 6.61216 15.8836 7.01387 15.6359 7.26163L7.26175 15.6357ZM13.5379 16.71C12.2552 16.71 11.2116 15.6664 11.2116 14.3837C11.2116 13.101 12.2552 12.0575 13.5379 12.0575C14.8206 12.0575 15.8642 13.101 15.8642 14.3837C15.8642 15.6664 14.8206 16.71 13.5379 16.71Z"
                            fill="#FCFCFC"
                        />
                    </svg>
                    <div className="tw-col-start-3 tw-text-white">{contentData.getContent("dealerLocatorBottomBarT1")}</div>
                </a>
            </div> */}

                        <StickyBottomBar userPreferences={userPreferences} />
                    </div>
                </ContentProviderContext.Provider>
            </ImageProviderContext.Provider>
        </>
    );
}

export function DealerLocatorPage({
    userPreferences,
    actionData,
    utmParameters,
    className,
    pageUrl,
    setIsApplyNowDialogOpen,
}: {
    userPreferences: UserPreferences;
    actionData: DealerLocatorActionData;
    utmParameters: {
        [searchParameter: string]: string;
    };
    className: string;
    pageUrl: string;
    setIsApplyNowDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const contentData = useContext(ContentProviderContext);
    const transition = useTransition();

    const [dealerList, setDealerList] = useState<Array<Dealer> | null>([]);
    // const [selectedCity, setSelectedCity] = useState("");
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        if (actionData != null) {
            if (actionData.dealerList == null) {
                setDealerList(null);
            } else if (!showMore) {
                setDealerList(actionData.dealerList.slice(0, 5));
            } else {
                // TODO: Add more incrementally
                setDealerList(actionData.dealerList);
            }
        }
    }, [actionData, showMore]);

    // const people = ["Wade Cooper", "Arlene Mccoy", "Devon Webb", "Tom Cook", "Tanya Fox", "Hellen Schmidt"];
    // let cities: Array<string> =  [];

    // cityList.map((city) => cities.push(city.name));

    // const [selected, setSelected] = useState(cities[0]);
    // const [query, setQuery] = useState("");

    return (
        <>
            <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge tw-flex tw-flex-col", className)}>
                <VerticalSpacer className="tw-h-4 lg:tw-h-8" />

                <div className="tw-flex tw-flex-col lg:tw-grid lg:tw-grid-cols-[minmax(0,2fr),minmax(0,1fr)] lg:tw-grid-rows-1 lg:tw-gap-x-4 lg:tw-items-center tw-w-full tw-max-w-7xl tw-mx-auto">
                    <div className="tw-col-start-1 tw-row-start-1">
                        <GoogleMapView dealerList={dealerList} />
                    </div>

                    <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

                    <div className="tw-col-start-2 tw-row-start-1">
                        <Form
                            className="tw-flex tw-flex-col tw-items-center tw-justify-center"
                            method="post"
                        >
                            <input
                                type="text"
                                name="query"
                                required
                                className="lg-text-input tw-w-full tw-text-center lg:tw-max-w-[22rem]"
                                placeholder={`${contentData.getContent("dealerLocatorInputText")}`}
                            ></input>

                            {/* <FancySearchableSelect
                                id="city"
                                options={cityList.map((city, cityIndex) => ({
                                    value: cityIndex,
                                    label: city.name,
                                }))}
                                className="lg-text-input tw-w-full tw-text-center"
                                placeholder={`${contentData.getContent("dealerLocatorInputText")}`}
                                onChange={(newValue) => setSelectedCity(newValue.value)}
                                datastore={datastore}
                            /> */}

                            {/* <FancySearchableSelect
                                options={cities}
                                selected={selected}
                                setSelected={setSelected}
                                // primaryAttribute="name"
                                query={query}
                                setQuery={setQuery}
                            /> */}

                            <VerticalSpacer className="tw-h-4" />
                            <input
                                type="text"
                                name="query"
                                className="tw-hidden"
                                readOnly
                            />

                            <button
                                type="submit"
                                className="lg-cta-button"
                                disabled={transition.state != "idle"}
                                onSubmit={() => {
                                    setDealerList(null);
                                    setShowMore(false);
                                }}
                            >
                                {`${contentData.getContent("dealerLocatorButtonText")}`}
                            </button>
                        </Form>

                        {actionData == null ? null : actionData.dealerList == null || actionData.dealerList.length == 0 ? (
                            <>
                                <VerticalSpacer className="tw-h-4" />

                                <div className="lg-text-body tw-text-center lg-text-primary-500">{`${contentData.getContent("noDealerLocatorText")}`} </div>
                            </>
                        ) : (
                            <>
                                <VerticalSpacer className="tw-h-4" />

                                {/* <Link
                                    to="#dealer-list"
                                    className="tw-block tw-text-title2 tw-text-center tw-px-4 tw-py-1 tw-border lg-border-secondary-900-dark tw-rounded-lg tw-w-fit tw-mx-auto"
                                >
                                    {`${contentData.getContent("dealerLocatorShowText")} (${actionData.dealerList.length})`}
                                </Link> */}
                                <button
                                    type="button"
                                    className="tw-block tw-text-title2 tw-text-center tw-px-4 tw-py-1 tw-border lg-border-secondary-900-dark tw-rounded-lg tw-w-fit tw-mx-auto"
                                    onClick={() => document.getElementById("dealer-list")?.scrollIntoView()}
                                >
                                    {`${contentData.getContent("dealerLocatorShowText")} (${actionData.dealerList.length})`}
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {dealerList == null || dealerList.length == 0 ? null : (
                    <>
                        <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

                        <div
                            className="tw-flex tw-flex-col tw-gap-4"
                            id="dealer-list"
                        >
                            <div className="tw-flex tw-flex-col tw-gap-1">
                                <div className="lg-text-banner tw-text-center">{userPreferences.language === Language.Hindi ? "नमस्ते!" : "Namaste"}</div>
                                <div className="lg-text-headline tw-text-center tw-py-1">{contentData.getContent("dealerLocatorHighlightedText")}</div>
                                {/* <div className="lg-text-title2 tw-text-center">{dealerList[0].city}</div> */}
                            </div>

                            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-3 lg:tw-gap-x-2 tw-gap-y-3">
                                <ItemBuilder
                                    items={dealerList}
                                    itemBuilder={(dealer, dealerIndex) => (
                                        <React.Fragment key={dealerIndex}>
                                            <DefaultElementAnimation>
                                                <div
                                                    className="tw-flex tw-flex-col tw-text-left lg-bg-secondary-100 tw-rounded-lg tw-p-4 tw-h-full lg-card"
                                                    key={dealerIndex}
                                                >
                                                    <div className="lg-text-title1">{dealer.name}</div>

                                                    <VerticalSpacer className="tw-h-4" />

                                                    <div className="lg-text-body">Dealer Address:</div>

                                                    <div className="lg-text-body">{`${dealer.address}, ${dealer.city}, ${dealer.state}, ${dealer.pinCode}`}</div>

                                                    <div className="lg-text-body">M: {dealer.phoneNumber}</div>

                                                    <EmptyFlexFiller />

                                                    <VerticalSpacer className="tw-h-4" />

                                                    <div className="tw-overflow-hidden tw-flex tw-flex-col sm:tw-flex-row tw-gap-y-2 sm:tw-gap-x-2 tw-justify-center tw-p-2 tw-px-4 lg:tw-items-end">
                                                        {/* <button
                                                        type="button"
                                                        className="tw-bg-gradient-to-r tw-from-[#F25F60] tw-to-[#EB2A2B] tw-rounded-3xl tw-p-2 tw-px-4"
                                                    >
                                                        Enquire Now
                                                    </button> */}
                                                        {dealer.gmbLink == null ? null : (
                                                            <Link
                                                                className="lg-cta-outline-button tw-text-center tw-relative tw-group tw-transition tw-duration-200 hover:tw-border-y-2 hover:tw-border-x-2 hover:tw-px-[3rem] hover:tw-h-full tw-grid tw-place-items-center tw-box-border"
                                                                to={dealer.gmbLink}
                                                                target="_blank"
                                                            >
                                                                <div className="tw-absolute tw-h-[calc(100%+4px)] tw-w-[calc(100%+4px)] -tw-left-[2px] tw-top-0 tw-rounded-full tw-inset-0 tw-m-auto tw-opacity-0 group-hover:tw-opacity-100 tw-duration-200 tw-ease-in lg-cta-button-gradient"></div>
                                                                <button className="tw-text-center tw-relative tw-duration-200 group-hover:tw-text-secondary-900-dark tw-grid tw-place-items-center">
                                                                    {contentData.getContent("5b6a1674-797b-430e-a1d0-19a052886b10")}
                                                                </button>
                                                            </Link>
                                                        )}

                                                        <ContactUsCta
                                                            userPreferences={userPreferences}
                                                            textVernacId="landingPageBottomBarT2"
                                                            className="tw-z-10 lg:tw-place-self-end max-sm:tw-w-full"
                                                            buttonClassName="tw-border-y-2 tw-border-transparent max-sm:tw-w-full"
                                                            utmParameters={utmParameters}
                                                            pageUrl={pageUrl}
                                                        />

                                                        {/* <button
                                                        type="button"
                                                        className="tw-border tw-border-secondary-700 tw-p-2 tw-px-4 tw-rounded-3xl"
                                                    >
                                                        Get Direction
                                                    </button> */}
                                                    </div>
                                                </div>
                                            </DefaultElementAnimation>
                                        </React.Fragment>
                                    )}
                                />
                            </div>

                            {!showMore && actionData && actionData.dealerList && actionData.dealerList.length > 6 && (
                                <div
                                    className="lg-text-headline lg-text-secondary-900 tw-text-center tw-underline hover:tw-cursor-pointer"
                                    onClick={() => setShowMore(true)}
                                >
                                    Find More
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <TroubleFindingDealers
                userPreferences={userPreferences}
                utmParameters={utmParameters}
                pageUrl={pageUrl}
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <FaqSection
                userPreferences={userPreferences}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <JoinLivguardNetwork
                userPreferences={userPreferences}
                utmParameters={utmParameters}
                pageUrl={pageUrl}
                setIsApplyNowDialogOpen={setIsApplyNowDialogOpen}
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />

            <SocialHandles
                userPreferences={userPreferences}
                heading={{text1: "dealerLocatorSocialHT1", text2: "dealerLocatorSocialHT2"}}
                className="lg:tw-px-[72px] xl:tw-px-[120px]"
            />

            <VerticalSpacer className="tw-h-10 lg:tw-h-20" />
        </>
    );
}

function GoogleMapView({dealerList}: {dealerList: Array<Dealer> | null}) {
    const contentData = useContext(ContentProviderContext);
    const defaultCenter = {
        lat: 22.7679,
        lng: 78.8718,
    };

    const defaultZoom: number = 4;

    const [mapCenter, setMapCenter] = useState(defaultCenter);
    const [zoomLevel, setZoomLevel] = useState(defaultZoom);

    const containerStyle = {
        width: "100%",
        height: "100%",
        borderRadius: "8px",
        class: "tw-rounded-lg",
    };

    useEffect(() => {
        if (dealerList != null && dealerList.length > 0) {
            let index = 0;
            let sumLat = 0;
            let sumLng = 0;
            let sumDealer = 0;
            for (const dealer of dealerList) {
                if (index >= 5) {
                    break;
                }
                if (dealer.latitude != null && dealer.longitude != null) {
                    sumLat = sumLat + Number(dealer.latitude);
                    sumLng = sumLng + Number(dealer.longitude);
                    index++;
                    sumDealer++;
                }
            }
            const latCenter = sumLat / sumDealer;
            const lngCenter = sumLng / sumDealer;
            setMapCenter({lat: latCenter, lng: lngCenter});
            setZoomLevel(10);
        }
    }, [dealerList]);

    // const defaultDealerList = [
    //     {
    //         latitude: 31.7044,
    //         longitude: 76.16479,
    //     },
    //     {
    //         latitude: 25.99603,
    //         longitude: 79.45776,
    //     },
    //     {
    //         latitude: 25.41947,
    //         longitude: 83.67293,
    //     },
    //     {
    //         latitude: 28.64052,
    //         longitude: 77.32437,
    //     },
    //     {
    //         latitude: 28.74203,
    //         longitude: 77.1195,
    //     },
    //     {
    //         latitude: 15.26114,
    //         longitude: 76.37456,
    //     },
    //     {
    //         latitude: 19.97968,
    //         longitude: 79.27921,
    //     },
    //     {
    //         latitude: 28.65211,
    //         longitude: 77.1286,
    //     },
    //     {
    //         latitude: 28.52288,
    //         longitude: 77.18139,
    //     },
    //     {
    //         latitude: 17.16849,
    //         longitude: 82.05851,
    //     },
    //     {
    //         latitude: 17.69796,
    //         longitude: 83.20543,
    //     },
    //     {
    //         latitude: 30.79618,
    //         longitude: 76.03275,
    //     },
    //     {
    //         latitude: 31.68518,
    //         longitude: 76.1078,
    //     },
    //     {
    //         latitude: 12.90029,
    //         longitude: 76.38844,
    //     },
    //     {
    //         latitude: 26.44855,
    //         longitude: 80.31696,
    //     },
    //     {
    //         latitude: 26.45426,
    //         longitude: 82.76955,
    //     },
    //     {
    //         latitude: 31.2771,
    //         longitude: 75.36876,
    //     },
    //     {
    //         latitude: 26.16525,
    //         longitude: 82.36887,
    //     },
    //     {
    //         latitude: 8.27179,
    //         longitude: 77.17952,
    //     },
    //     {
    //         latitude: 29.04067,
    //         longitude: 79.25006,
    //     },
    //     {
    //         latitude: 17.25124,
    //         longitude: 80.15665,
    //     },
    //     {
    //         latitude: 27.57864,
    //         longitude: 81.59674,
    //     },
    //     {
    //         latitude: 12.14021,
    //         longitude: 78.1413,
    //     },
    //     {
    //         latitude: 27.35463,
    //         longitude: 81.83778,
    //     },
    //     {
    //         latitude: 19.95879,
    //         longitude: 73.76025,
    //     },
    //     {
    //         latitude: 23.22632,
    //         longitude: 77.43658,
    //     },
    //     {
    //         latitude: 21.63265,
    //         longitude: 85.59152,
    //     },
    //     {
    //         latitude: 13.04992,
    //         longitude: 80.08938,
    //     },
    //     {
    //         latitude: 28.62028,
    //         longitude: 77.41877,
    //     },
    //     {
    //         latitude: 23.45911,
    //         longitude: 85.09041,
    //     },
    //     {
    //         latitude: 25.42893,
    //         longitude: 78.53965,
    //     },
    //     {
    //         latitude: 28.58368,
    //         longitude: 77.36842,
    //     },
    //     {
    //         latitude: 21.81734,
    //         longitude: 80.18375,
    //     },
    //     {
    //         latitude: 25.04337,
    //         longitude: 79.67775,
    //     },
    //     {
    //         latitude: 28.64425,
    //         longitude: 77.22412,
    //     },
    //     {
    //         latitude: 27.86427,
    //         longitude: 77.20269,
    //     },
    //     {
    //         latitude: 26.17944,
    //         longitude: 86.38154,
    //     },
    //     {
    //         latitude: 12.29453,
    //         longitude: 76.63514,
    //     },
    //     {
    //         latitude: 12.84909,
    //         longitude: 80.06436,
    //     },
    //     {
    //         latitude: 17.29237,
    //         longitude: 74.18767,
    //     },
    //     {
    //         latitude: 22.04841,
    //         longitude: 82.12496,
    //     },
    //     {
    //         latitude: 23.52184,
    //         longitude: 77.8112,
    //     },
    //     {
    //         latitude: 27.09332,
    //         longitude: 83.2708,
    //     },
    //     {
    //         latitude: 17.59293,
    //         longitude: 80.6978,
    //     },
    //     {
    //         latitude: 29.98341,
    //         longitude: 75.39926,
    //     },
    //     {
    //         latitude: 27.60427,
    //         longitude: 75.14704,
    //     },
    //     {
    //         latitude: 19.99985,
    //         longitude: 73.84428,
    //     },
    //     {
    //         latitude: 14.29661,
    //         longitude: 74.49795,
    //     },
    //     {
    //         latitude: 24.43499,
    //         longitude: 85.52911,
    //     },
    //     {
    //         latitude: 13.31502,
    //         longitude: 77.13641,
    //     },
    //     {
    //         latitude: 26.9588,
    //         longitude: 79.78894,
    //     },
    //     {
    //         latitude: 30.26576,
    //         longitude: 75.23686,
    //     },
    //     {
    //         latitude: 23.6532,
    //         longitude: 86.13619,
    //     },
    //     {
    //         latitude: 24.74726,
    //         longitude: 72.20502,
    //     },
    //     {
    //         latitude: 25.30398,
    //         longitude: 73.1684,
    //     },
    //     {
    //         latitude: 25.21421,
    //         longitude: 74.25476,
    //     },
    //     {
    //         latitude: 22.66634,
    //         longitude: 76.74401,
    //     },
    //     {
    //         latitude: 28.38354,
    //         longitude: 79.45166,
    //     },
    //     {
    //         latitude: 23.99305,
    //         longitude: 85.35201,
    //     },
    //     {
    //         latitude: 27.87106,
    //         longitude: 81.50152,
    //     },
    //     {
    //         latitude: 23.61603,
    //         longitude: 77.42923,
    //     },
    //     {
    //         latitude: 19.87677,
    //         longitude: 75.35339,
    //     },
    //     {
    //         latitude: 11.7738,
    //         longitude: 79.67779,
    //     },
    //     {
    //         latitude: 27.73911,
    //         longitude: 78.57159,
    //     },
    //     {
    //         latitude: 15.85496,
    //         longitude: 74.5147,
    //     },
    //     {
    //         latitude: 28.63333,
    //         longitude: 75.38679,
    //     },
    //     {
    //         latitude: 22.96789,
    //         longitude: 76.05491,
    //     },
    //     {
    //         latitude: 28.76547,
    //         longitude: 77.50586,
    //     },
    //     {
    //         latitude: 15.86041,
    //         longitude: 74.51131,
    //     },
    //     {
    //         latitude: 23.61944,
    //         longitude: 85.5198,
    //     },
    //     {
    //         latitude: 12.92684,
    //         longitude: 79.34958,
    //     },
    //     {
    //         latitude: 30.2592,
    //         longitude: 77.07662,
    //     },
    //     {
    //         latitude: 26.36034,
    //         longitude: 79.41401,
    //     },
    //     {
    //         latitude: 17.76854,
    //         longitude: 77.13252,
    //     },
    //     {
    //         latitude: 23.09736,
    //         longitude: 72.58832,
    //     },
    //     {
    //         latitude: 26.70203,
    //         longitude: 76.9029,
    //     },
    //     {
    //         latitude: 19.22139,
    //         longitude: 77.66703,
    //     },
    //     {
    //         latitude: 28.89077,
    //         longitude: 76.5649,
    //     },
    //     {
    //         latitude: 19.13599,
    //         longitude: 74.73379,
    //     },
    //     {
    //         latitude: 24.18642,
    //         longitude: 86.3068,
    //     },
    //     {
    //         latitude: 26.21811,
    //         longitude: 78.2206,
    //     },
    //     {
    //         latitude: 26.9711,
    //         longitude: 83.59294,
    //     },
    //     {
    //         latitude: 28.7193,
    //         longitude: 78.28925,
    //     },
    //     {
    //         latitude: 23.66498,
    //         longitude: 86.07924,
    //     },
    //     {
    //         latitude: 24.09626,
    //         longitude: 77.68958,
    //     },
    //     {
    //         latitude: 26.90113,
    //         longitude: 77.77898,
    //     },
    //     {
    //         latitude: 26.24121,
    //         longitude: 83.24876,
    //     },
    //     {
    //         latitude: 13.00021,
    //         longitude: 76.09524,
    //     },
    //     {
    //         latitude: 23.80257,
    //         longitude: 85.82447,
    //     },
    //     {
    //         latitude: 24.84368,
    //         longitude: 87.83883,
    //     },
    //     {
    //         latitude: 23.11551,
    //         longitude: 81.69663,
    //     },
    //     {
    //         latitude: 26.78626,
    //         longitude: 83.39451,
    //     },
    //     {
    //         latitude: 25.75994,
    //         longitude: 84.15429,
    //     },
    //     {
    //         latitude: 30.28137,
    //         longitude: 77.99025,
    //     },
    //     {
    //         latitude: 31.3838,
    //         longitude: 75.38176,
    //     },
    //     {
    //         latitude: 10.82465,
    //         longitude: 78.69535,
    //     },
    //     {
    //         latitude: 23.35108,
    //         longitude: 85.31734,
    //     },
    //     {
    //         latitude: 30.83583,
    //         longitude: 76.18952,
    //     },
    //     {
    //         latitude: 21.87553,
    //         longitude: 88.18811,
    //     },
    //     {
    //         latitude: 12.94174,
    //         longitude: 80.14272,
    //     },
    //     {
    //         latitude: 26.25483,
    //         longitude: 88.18051,
    //     },
    //     {
    //         latitude: 27.20805,
    //         longitude: 78.02193,
    //     },
    //     {
    //         latitude: 21.157149,
    //         longitude: 79.624536,
    //     },
    //     {
    //         latitude: 25.3001,
    //         longitude: 73.92083,
    //     },
    //     {
    //         latitude: 28.64519,
    //         longitude: 77.16817,
    //     },
    //     {
    //         latitude: 30.61403,
    //         longitude: 76.85199,
    //     },
    //     {
    //         latitude: 15.33097,
    //         longitude: 75.12,
    //     },
    //     {
    //         latitude: 29.98009,
    //         longitude: 78.04575,
    //     },
    //     {
    //         latitude: 27.917,
    //         longitude: 78.07252,
    //     },
    //     {
    //         latitude: 26.49891,
    //         longitude: 90.55193,
    //     },
    //     {
    //         latitude: 13.04902,
    //         longitude: 77.57582,
    //     },
    //     {
    //         latitude: 18.85829,
    //         longitude: 82.58083,
    //     },
    //     {
    //         latitude: 25.55396,
    //         longitude: 84.86591,
    //     },
    //     {
    //         latitude: 25.31113,
    //         longitude: 72.99941,
    //     },
    //     {
    //         latitude: 30.59016,
    //         longitude: 75.28015,
    //     },
    //     {
    //         latitude: 20.36535,
    //         longitude: 72.92193,
    //     },
    //     {
    //         latitude: 32.90342,
    //         longitude: 75.07084,
    //     },
    //     {
    //         latitude: 30.21652,
    //         longitude: 77.04166,
    //     },
    //     {
    //         latitude: 31.18707,
    //         longitude: 75.98351,
    //     },
    //     {
    //         latitude: 31.874777,
    //         longitude: 75.514196,
    //     },
    //     {
    //         latitude: 11.00428,
    //         longitude: 77.56133,
    //     },
    //     {
    //         latitude: 27.19822,
    //         longitude: 73.73985,
    //     },
    //     {
    //         latitude: 26.49844,
    //         longitude: 90.55183,
    //     },
    //     {
    //         latitude: 26.52206,
    //         longitude: 89.19994,
    //     },
    //     {
    //         latitude: 26.91161,
    //         longitude: 70.91794,
    //     },
    //     {
    //         latitude: 29.19029,
    //         longitude: 79.52528,
    //     },
    //     {
    //         latitude: 29.06491,
    //         longitude: 79.5159,
    //     },
    //     {
    //         latitude: 22.01154,
    //         longitude: 82.57366,
    //     },
    //     {
    //         latitude: 29.31777,
    //         longitude: 76.32397,
    //     },
    //     {
    //         latitude: 12.98166,
    //         longitude: 76.11144,
    //     },
    //     {
    //         latitude: 15.13591,
    //         longitude: 76.91923,
    //     },
    //     {
    //         latitude: 31.4553,
    //         longitude: 74.92329,
    //     },
    //     {
    //         latitude: 19.17692,
    //         longitude: 77.30459,
    //     },
    //     {
    //         latitude: 25.24584,
    //         longitude: 86.97965,
    //     },
    //     {
    //         latitude: 20.88094,
    //         longitude: 76.20191,
    //     },
    //     {
    //         latitude: 21.22202,
    //         longitude: 72.89579,
    //     },
    //     {
    //         latitude: 26.70357,
    //         longitude: 92.4792,
    //     },
    //     {
    //         latitude: 22.67712,
    //         longitude: 74.94748,
    //     },
    //     {
    //         latitude: 26.33988,
    //         longitude: 92.66629,
    //     },
    //     {
    //         latitude: 28.83423,
    //         longitude: 78.75686,
    //     },
    //     {
    //         latitude: 21.20276,
    //         longitude: 72.78216,
    //     },
    //     {
    //         latitude: 28.46036,
    //         longitude: 77.08332,
    //     },
    //     {
    //         latitude: 28.6101,
    //         longitude: 77.09354,
    //     },
    //     {
    //         latitude: 22.18667,
    //         longitude: 78.76728,
    //     },
    //     {
    //         latitude: 22.19101,
    //         longitude: 84.58032,
    //     },
    //     {
    //         latitude: 28.35556,
    //         longitude: 76.93773,
    //     },
    //     {
    //         latitude: 21.89189,
    //         longitude: 83.39647,
    //     },
    //     {
    //         latitude: 25.42142,
    //         longitude: 86.11664,
    //     },
    //     {
    //         latitude: 26.03572,
    //         longitude: 85.1499,
    //     },
    //     {
    //         latitude: 26.65278,
    //         longitude: 82.13311,
    //     },
    //     {
    //         latitude: 28.57652,
    //         longitude: 78.56342,
    //     },
    //     {
    //         latitude: 33.59543,
    //         longitude: 75.16427,
    //     },
    //     {
    //         latitude: 26.62314,
    //         longitude: 92.78998,
    //     },
    //     {
    //         latitude: 30.68814,
    //         longitude: 76.4072,
    //     },
    //     {
    //         latitude: 27.13084,
    //         longitude: 81.69851,
    //     },
    //     {
    //         latitude: 28.83886,
    //         longitude: 78.24946,
    //     },
    //     {
    //         latitude: 27.703,
    //         longitude: 78.08687,
    //     },
    //     {
    //         latitude: 23.80569,
    //         longitude: 83.70141,
    //     },
    //     {
    //         latitude: 31.64067,
    //         longitude: 75.00144,
    //     },
    //     {
    //         latitude: 23.26207,
    //         longitude: 77.42789,
    //     },
    //     {
    //         latitude: 15.49491,
    //         longitude: 73.82082,
    //     },
    //     {
    //         latitude: 12.97028,
    //         longitude: 77.54649,
    //     },
    //     {
    //         latitude: 28.61231,
    //         longitude: 77.35438,
    //     },
    //     {
    //         latitude: 28.79386,
    //         longitude: 77.13951,
    //     },
    //     {
    //         latitude: 10.73092,
    //         longitude: 78.71805,
    //     },
    //     {
    //         latitude: 31.816936,
    //         longitude: 75.370799,
    //     },
    //     {
    //         latitude: 28.63163,
    //         longitude: 77.39182,
    //     },
    //     {
    //         latitude: 21.2434,
    //         longitude: 75.29402,
    //     },
    //     {
    //         latitude: 30.26209,
    //         longitude: 75.24074,
    //     },
    //     {
    //         latitude: 26.89335,
    //         longitude: 74.32007,
    //     },
    //     {
    //         latitude: 12.93541,
    //         longitude: 77.56889,
    //     },
    //     {
    //         latitude: 28.5852,
    //         longitude: 77.08961,
    //     },
    //     {
    //         latitude: 12.93105,
    //         longitude: 77.57358,
    //     },
    //     {
    //         latitude: 26.6325,
    //         longitude: 82.98067,
    //     },
    //     {
    //         latitude: 13.10285,
    //         longitude: 80.29027,
    //     },
    //     {
    //         latitude: 21.81229,
    //         longitude: 80.19228,
    //     },
    //     {
    //         latitude: 32.012,
    //         longitude: 75.14621,
    //     },
    //     {
    //         latitude: 9.8919,
    //         longitude: 76.69758,
    //     },
    //     {
    //         latitude: 12.90091,
    //         longitude: 79.46383,
    //     },
    //     {
    //         latitude: 22.46454,
    //         longitude: 70.06107,
    //     },
    //     {
    //         latitude: 24.84073,
    //         longitude: 77.87207,
    //     },
    //     {
    //         latitude: 16.16392,
    //         longitude: 74.82421,
    //     },
    //     {
    //         latitude: 23.86525,
    //         longitude: 88.53757,
    //     },
    //     {
    //         latitude: 27.39733,
    //         longitude: 80.12599,
    //     },
    //     {
    //         latitude: 13.94136,
    //         longitude: 75.56024,
    //     },
    //     {
    //         latitude: 23.85176,
    //         longitude: 87.58762,
    //     },
    //     {
    //         latitude: 30.84229,
    //         longitude: 76.66597,
    //     },
    //     {
    //         latitude: 22.34639,
    //         longitude: 87.11268,
    //     },
    //     {
    //         latitude: 20.88289,
    //         longitude: 75.99403,
    //     },
    //     {
    //         latitude: 23.6644,
    //         longitude: 74.01387,
    //     },
    //     {
    //         latitude: 24.87035,
    //         longitude: 92.55978,
    //     },
    //     {
    //         latitude: 26.75896,
    //         longitude: 82.14166,
    //     },
    //     {
    //         latitude: 19.56665,
    //         longitude: 74.64913,
    //     },
    //     {
    //         latitude: 13.40298,
    //         longitude: 78.0479,
    //     },
    //     {
    //         latitude: 15.51305,
    //         longitude: 73.77211,
    //     },
    //     {
    //         latitude: 16.95559,
    //         longitude: 81.78455,
    //     },
    //     {
    //         latitude: 13.04663,
    //         longitude: 80.18203,
    //     },
    //     {
    //         latitude: 17.31068,
    //         longitude: 76.81511,
    //     },
    //     {
    //         latitude: 30.4828,
    //         longitude: 76.4061,
    //     },
    //     {
    //         latitude: 19.13983,
    //         longitude: 72.85478,
    //     },
    //     {
    //         latitude: 22.03088,
    //         longitude: 82.6708,
    //     },
    //     {
    //         latitude: 31.11749,
    //         longitude: 75.78057,
    //     },
    //     {
    //         latitude: 26.68851,
    //         longitude: 88.23852,
    //     },
    //     {
    //         latitude: 25.44122,
    //         longitude: 81.87175,
    //     },
    //     {
    //         latitude: 23.90881,
    //         longitude: 86.17979,
    //     },
    //     {
    //         latitude: 18.84717,
    //         longitude: 77.53256,
    //     },
    //     {
    //         latitude: 28.61921,
    //         longitude: 76.98608,
    //     },
    //     {
    //         latitude: 28.50812,
    //         longitude: 72.80262,
    //     },
    //     {
    //         latitude: 34.09766,
    //         longitude: 74.81204,
    //     },
    //     {
    //         latitude: 30.66686,
    //         longitude: 76.29274,
    //     },
    //     {
    //         latitude: 28.63485,
    //         longitude: 77.29852,
    //     },
    //     {
    //         latitude: 30.59989,
    //         longitude: 74.25627,
    //     },
    //     {
    //         latitude: 24.95443,
    //         longitude: 84.0263,
    //     },
    //     {
    //         latitude: 25.89167,
    //         longitude: 78.33568,
    //     },
    //     {
    //         latitude: 26.65022,
    //         longitude: 81.96968,
    //     },
    //     {
    //         latitude: 17.35669,
    //         longitude: 82.53721,
    //     },
    //     {
    //         latitude: 29.09383,
    //         longitude: 75.96604,
    //     },
    //     {
    //         latitude: 22.74756,
    //         longitude: 75.89097,
    //     },
    //     {
    //         latitude: 24.6023,
    //         longitude: 87.08045,
    //     },
    //     {
    //         latitude: 17.58529,
    //         longitude: 80.32843,
    //     },
    //     {
    //         latitude: 24.07887,
    //         longitude: 85.4749,
    //     },
    //     {
    //         latitude: 27.72071,
    //         longitude: 77.50458,
    //     },
    //     {
    //         latitude: 23.80101,
    //         longitude: 86.44195,
    //     },
    //     {
    //         latitude: 21.225201,
    //         longitude: 72.88822,
    //     },
    //     {
    //         latitude: 21.72345,
    //         longitude: 73.03684,
    //     },
    //     {
    //         latitude: 26.9054,
    //         longitude: 83.98096,
    //     },
    //     {
    //         latitude: 20.83252,
    //         longitude: 85.08969,
    //     },
    //     {
    //         latitude: 10.93462,
    //         longitude: 79.10142,
    //     },
    //     {
    //         latitude: 21.76265,
    //         longitude: 80.05051,
    //     },
    //     {
    //         latitude: 25.12442,
    //         longitude: 75.84279,
    //     },
    //     {
    //         latitude: 28.65265,
    //         longitude: 77.35213,
    //     },
    //     {
    //         latitude: 29.98351,
    //         longitude: 76.95235,
    //     },
    //     {
    //         latitude: 22.17112,
    //         longitude: 73.58419,
    //     },
    //     {
    //         latitude: 23.2739,
    //         longitude: 88.30795,
    //     },
    //     {
    //         latitude: 19.04549,
    //         longitude: 73.02345,
    //     },
    //     {
    //         latitude: 25.91127,
    //         longitude: 86.78656,
    //     },
    //     {
    //         latitude: 15.81442,
    //         longitude: 74.8485,
    //     },
    //     {
    //         latitude: 32.03388,
    //         longitude: 75.03159,
    //     },
    //     {
    //         latitude: 22.27118,
    //         longitude: 73.72479,
    //     },
    //     {
    //         latitude: 28.59229,
    //         longitude: 77.33881,
    //     },
    //     {
    //         latitude: 21.21433,
    //         longitude: 72.86159,
    //     },
    //     {
    //         latitude: 20.89331,
    //         longitude: 74.77863,
    //     },
    //     {
    //         latitude: 31.37491,
    //         longitude: 75.574,
    //     },
    //     {
    //         latitude: 23.18421,
    //         longitude: 77.49142,
    //     },
    //     {
    //         latitude: 24.86441,
    //         longitude: 92.37098,
    //     },
    //     {
    //         latitude: 12.66791,
    //         longitude: 79.28155,
    //     },
    //     {
    //         latitude: 20.58911,
    //         longitude: 74.19985,
    //     },
    //     {
    //         latitude: 26.86825,
    //         longitude: 78.91686,
    //     },
    //     {
    //         latitude: 30.83429,
    //         longitude: 76.67304,
    //     },
    //     {
    //         latitude: 27.07419,
    //         longitude: 78.08926,
    //     },
    //     {
    //         latitude: 29.8102,
    //         longitude: 76.74177,
    //     },
    //     {
    //         latitude: 29.38978,
    //         longitude: 79.12787,
    //     },
    //     {
    //         latitude: 26.62064,
    //         longitude: 80.45403,
    //     },
    //     {
    //         latitude: 29.97629,
    //         longitude: 77.5538,
    //     },
    //     {
    //         latitude: 28.40388,
    //         longitude: 77.84898,
    //     },
    //     {
    //         latitude: 21.20277,
    //         longitude: 72.7822,
    //     },
    //     {
    //         latitude: 23.32987,
    //         longitude: 86.36105,
    //     },
    //     {
    //         latitude: 32.76295,
    //         longitude: 74.84481,
    //     },
    //     {
    //         latitude: 28.06499,
    //         longitude: 80.09593,
    //     },
    //     {
    //         latitude: 26.80368,
    //         longitude: 82.75797,
    //     },
    //     {
    //         latitude: 9.75862,
    //         longitude: 77.11537,
    //     },
    //     {
    //         latitude: 24.27087,
    //         longitude: 86.64532,
    //     },
    //     {
    //         latitude: 24.60663,
    //         longitude: 74.2984,
    //     },
    //     {
    //         latitude: 12.73438,
    //         longitude: 77.83093,
    //     },
    //     {
    //         latitude: 10.63956,
    //         longitude: 76.03172,
    //     },
    //     {
    //         latitude: 23.35504,
    //         longitude: 85.33833,
    //     },
    //     {
    //         latitude: 27.88499,
    //         longitude: 79.90934,
    //     },
    //     {
    //         latitude: 28.68938,
    //         longitude: 77.29077,
    //     },
    //     {
    //         latitude: 30.65886,
    //         longitude: 76.28574,
    //     },
    //     {
    //         latitude: 22.08878,
    //         longitude: 83.43751,
    //     },
    //     {
    //         latitude: 12.89901,
    //         longitude: 77.62192,
    //     },
    //     {
    //         latitude: 25.93092,
    //         longitude: 82.0044,
    //     },
    //     {
    //         latitude: 23.43841,
    //         longitude: 75.87619,
    //     },
    //     {
    //         latitude: 23.82225,
    //         longitude: 86.39511,
    //     },
    //     {
    //         latitude: 28.30678,
    //         longitude: 78.9405,
    //     },
    //     {
    //         latitude: 22.0917,
    //         longitude: 69.26894,
    //     },
    //     {
    //         latitude: 22.99089,
    //         longitude: 72.604,
    //     },
    //     {
    //         latitude: 23.79247,
    //         longitude: 86.42363,
    //     },
    //     {
    //         latitude: 29.99879,
    //         longitude: 78.19011,
    //     },
    //     {
    //         latitude: 15.64556,
    //         longitude: 74.5126,
    //     },
    //     {
    //         latitude: 31.33061,
    //         longitude: 75.58253,
    //     },
    //     {
    //         latitude: 24.81561,
    //         longitude: 92.79897,
    //     },
    //     {
    //         latitude: 24.59958,
    //         longitude: 74.58739,
    //     },
    //     {
    //         latitude: 23.34502,
    //         longitude: 75.03567,
    //     },
    //     {
    //         latitude: 14.02419,
    //         longitude: 75.9197,
    //     },
    //     {
    //         latitude: 26.10064,
    //         longitude: 84.29377,
    //     },
    //     {
    //         latitude: 32.47039,
    //         longitude: 75.3226,
    //     },
    //     {
    //         latitude: 17.22203,
    //         longitude: 79.95174,
    //     },
    //     {
    //         latitude: 27.57311,
    //         longitude: 81.58637,
    //     },
    //     {
    //         latitude: 22.78852,
    //         longitude: 86.18483,
    //     },
    //     {
    //         latitude: 30.8341,
    //         longitude: 76.19347,
    //     },
    //     {
    //         latitude: 28.70022,
    //         longitude: 77.3053,
    //     },
    //     {
    //         latitude: 21.26743,
    //         longitude: 72.95925,
    //     },
    //     {
    //         latitude: 12.8408,
    //         longitude: 77.67596,
    //     },
    //     {
    //         latitude: 11.2415,
    //         longitude: 78.8953,
    //     },
    //     {
    //         latitude: 26.89983,
    //         longitude: 83.96515,
    //     },
    //     {
    //         latitude: 27.35899,
    //         longitude: 95.3133,
    //     },
    //     {
    //         latitude: 29.80576,
    //         longitude: 76.39084,
    //     },
    //     {
    //         latitude: 13.04602,
    //         longitude: 80.11256,
    //     },
    //     {
    //         latitude: 25.81791,
    //         longitude: 85.3969,
    //     },
    //     {
    //         latitude: 25.01271,
    //         longitude: 85.63942,
    //     },
    //     {
    //         latitude: 12.41586,
    //         longitude: 78.21879,
    //     },
    //     {
    //         latitude: 23.8454,
    //         longitude: 80.38398,
    //     },
    //     {
    //         latitude: 26.84787,
    //         longitude: 85.58034,
    //     },
    //     {
    //         latitude: 22.82809,
    //         longitude: 87.25048,
    //     },
    //     {
    //         latitude: 22.28449,
    //         longitude: 70.79982,
    //     },
    //     {
    //         latitude: 24.83075,
    //         longitude: 87.21135,
    //     },
    //     {
    //         latitude: 21.60334,
    //         longitude: 71.22034,
    //     },
    //     {
    //         latitude: 28.64882,
    //         longitude: 77.16403,
    //     },
    //     {
    //         latitude: 28.67604,
    //         longitude: 77.39385,
    //     },
    //     {
    //         latitude: 20.48011,
    //         longitude: 77.47719,
    //     },
    //     {
    //         latitude: 21.67006,
    //         longitude: 87.43222,
    //     },
    //     {
    //         latitude: 30.36616,
    //         longitude: 76.48037,
    //     },
    //     {
    //         latitude: 27.13115,
    //         longitude: 78.00661,
    //     },
    //     {
    //         latitude: 25.41158,
    //         longitude: 86.65572,
    //     },
    //     {
    //         latitude: 31.12584,
    //         longitude: 75.4785,
    //     },
    //     {
    //         latitude: 26.0115,
    //         longitude: 92.86348,
    //     },
    //     {
    //         latitude: 26.62691,
    //         longitude: 92.79817,
    //     },
    //     {
    //         latitude: 28.8907,
    //         longitude: 79.26415,
    //     },
    //     {
    //         latitude: 26.86969,
    //         longitude: 80.90739,
    //     },
    //     {
    //         latitude: 11.87968,
    //         longitude: 78.91991,
    //     },
    //     {
    //         latitude: 19.37025,
    //         longitude: 73.07579,
    //     },
    //     {
    //         latitude: 29.64118,
    //         longitude: 77.31935,
    //     },
    //     {
    //         latitude: 12.72195,
    //         longitude: 77.82696,
    //     },
    //     {
    //         latitude: 21.29299,
    //         longitude: 77.51624,
    //     },
    //     {
    //         latitude: 23.19285,
    //         longitude: 79.91564,
    //     },
    //     {
    //         latitude: 21.174,
    //         longitude: 72.8713,
    //     },
    //     {
    //         latitude: 26.84103,
    //         longitude: 80.87999,
    //     },
    //     {
    //         latitude: 22.4196,
    //         longitude: 72.89853,
    //     },
    //     {
    //         latitude: 26.87993,
    //         longitude: 75.23844,
    //     },
    //     {
    //         latitude: 23.78508,
    //         longitude: 86.39827,
    //     },
    //     {
    //         latitude: 20.93261,
    //         longitude: 77.75674,
    //     },
    //     {
    //         latitude: 25.66575,
    //         longitude: 86.02741,
    //     },
    //     {
    //         latitude: 9.55476,
    //         longitude: 76.53245,
    //     },
    //     {
    //         latitude: 13.2411,
    //         longitude: 77.49902,
    //     },
    //     {
    //         latitude: 26.75899,
    //         longitude: 82.13905,
    //     },
    //     {
    //         latitude: 12.29994,
    //         longitude: 76.6253,
    //     },
    //     {
    //         latitude: 26.61866,
    //         longitude: 80.67101,
    //     },
    //     {
    //         latitude: 23.33883,
    //         longitude: 76.83693,
    //     },
    //     {
    //         latitude: 28.63998,
    //         longitude: 77.10089,
    //     },
    //     {
    //         latitude: 16.98489,
    //         longitude: 74.13021,
    //     },
    //     {
    //         latitude: 30.91965,
    //         longitude: 75.91569,
    //     },
    //     {
    //         latitude: 20.53277,
    //         longitude: 73.18035,
    //     },
    //     {
    //         latitude: 28.60609,
    //         longitude: 77.03576,
    //     },
    //     {
    //         latitude: 22.62533,
    //         longitude: 86.22363,
    //     },
    //     {
    //         latitude: 22.25492,
    //         longitude: 73.19838,
    //     },
    //     {
    //         latitude: 27.86429,
    //         longitude: 77.20268,
    //     },
    //     {
    //         latitude: 29.53974,
    //         longitude: 75.70992,
    //     },
    //     {
    //         latitude: 12.22743,
    //         longitude: 79.65145,
    //     },
    //     {
    //         latitude: 31.96625,
    //         longitude: 74.9099,
    //     },
    //     {
    //         latitude: 26.17844,
    //         longitude: 91.74463,
    //     },
    //     {
    //         latitude: 26.44872,
    //         longitude: 74.63766,
    //     },
    //     {
    //         latitude: 12.90386,
    //         longitude: 76.38584,
    //     },
    //     {
    //         latitude: 30.02619,
    //         longitude: 77.14998,
    //     },
    //     {
    //         latitude: 29.47429,
    //         longitude: 76.18987,
    //     },
    //     {
    //         latitude: 20.47268,
    //         longitude: 84.23573,
    //     },
    //     {
    //         latitude: 27.22708,
    //         longitude: 78.24143,
    //     },
    //     {
    //         latitude: 31.99384,
    //         longitude: 75.51065,
    //     },
    //     {
    //         latitude: 26.4278,
    //         longitude: 80.38419,
    //     },
    //     {
    //         latitude: 23.36629,
    //         longitude: 85.31085,
    //     },
    //     {
    //         latitude: 21.89642,
    //         longitude: 83.40991,
    //     },
    //     {
    //         latitude: 26.09308,
    //         longitude: 74.50315,
    //     },
    //     {
    //         latitude: 30.77244,
    //         longitude: 76.00003,
    //     },
    //     {
    //         latitude: 26.01265,
    //         longitude: 92.86382,
    //     },
    //     {
    //         latitude: 23.50257,
    //         longitude: 78.95455,
    //     },
    //     {
    //         latitude: 15.35898,
    //         longitude: 75.13542,
    //     },
    //     {
    //         latitude: 28.89993,
    //         longitude: 76.58345,
    //     },
    //     {
    //         latitude: 26.22668,
    //         longitude: 72.96141,
    //     },
    //     {
    //         latitude: 29.13484,
    //         longitude: 76.70385,
    //     },
    //     {
    //         latitude: 23.83946,
    //         longitude: 78.75165,
    //     },
    //     {
    //         latitude: 27.30951,
    //         longitude: 82.79447,
    //     },
    //     {
    //         latitude: 23.66876,
    //         longitude: 86.44027,
    //     },
    //     {
    //         latitude: 24.83811,
    //         longitude: 92.82918,
    //     },
    //     {
    //         latitude: 25.25382,
    //         longitude: 83.33769,
    //     },
    //     {
    //         latitude: 13.7843,
    //         longitude: 77.78998,
    //     },
    //     {
    //         latitude: 25.92721,
    //         longitude: 85.3296,
    //     },
    //     {
    //         latitude: 29.75604,
    //         longitude: 78.47395,
    //     },
    //     {
    //         latitude: 14.4636,
    //         longitude: 75.91637,
    //     },
    //     {
    //         latitude: 22.84617,
    //         longitude: 88.65778,
    //     },
    //     {
    //         latitude: 25.38435,
    //         longitude: 82.58788,
    //     },
    //     {
    //         latitude: 20.13532,
    //         longitude: 76.57324,
    //     },
    //     {
    //         latitude: 28.82959,
    //         longitude: 77.09445,
    //     },
    //     {
    //         latitude: 28.59693,
    //         longitude: 76.28902,
    //     },
    //     {
    //         latitude: 23.03055,
    //         longitude: 76.71536,
    //     },
    //     {
    //         latitude: 28.3833,
    //         longitude: 79.45177,
    //     },
    //     {
    //         latitude: 30.66649,
    //         longitude: 76.29063,
    //     },
    //     {
    //         latitude: 28.83415,
    //         longitude: 78.75685,
    //     },
    //     {
    //         latitude: 28.53144,
    //         longitude: 77.25638,
    //     },
    //     {
    //         latitude: 27.20803,
    //         longitude: 78.02197,
    //     },
    //     {
    //         latitude: 27.881274,
    //         longitude: 78.062409,
    //     },
    //     {
    //         latitude: 26.82298,
    //         longitude: 92.77906,
    //     },
    //     {
    //         latitude: 15.34629,
    //         longitude: 75.13635,
    //     },
    //     {
    //         latitude: 28.77936,
    //         longitude: 76.33588,
    //     },
    //     {
    //         latitude: 23.60435,
    //         longitude: 72.96137,
    //     },
    //     {
    //         latitude: 25.98275,
    //         longitude: 79.45315,
    //     },
    //     {
    //         latitude: 16.77823,
    //         longitude: 74.55717,
    //     },
    //     {
    //         latitude: 23.80423,
    //         longitude: 91.48951,
    //     },
    //     {
    //         latitude: 24.85838,
    //         longitude: 92.47726,
    //     },
    //     {
    //         latitude: 12.43026,
    //         longitude: 78.21923,
    //     },
    //     {
    //         latitude: 25.43836,
    //         longitude: 81.85637,
    //     },
    //     {
    //         latitude: 24.64557,
    //         longitude: 77.30978,
    //     },
    //     {
    //         latitude: 23.96061,
    //         longitude: 86.80579,
    //     },
    //     {
    //         latitude: 28.48047,
    //         longitude: 77.12712,
    //     },
    //     {
    //         latitude: 27.93425,
    //         longitude: 72.50755,
    //     },
    //     {
    //         latitude: 15.52173,
    //         longitude: 78.98571,
    //     },
    //     {
    //         latitude: 26.87409,
    //         longitude: 81.02821,
    //     },
    //     {
    //         latitude: 30.47241,
    //         longitude: 77.1333,
    //     },
    //     {
    //         latitude: 23.70578,
    //         longitude: 75.99803,
    //     },
    //     {
    //         latitude: 28.4019,
    //         longitude: 76.89192,
    //     },
    //     {
    //         latitude: 31.48623,
    //         longitude: 74.7882,
    //     },
    //     {
    //         latitude: 9.81541,
    //         longitude: 78.09722,
    //     },
    //     {
    //         latitude: 25.0342,
    //         longitude: 87.59049,
    //     },
    //     {
    //         latitude: 26.04076,
    //         longitude: 84.04896,
    //     },
    //     {
    //         latitude: 21.96085,
    //         longitude: 70.79002,
    //     },
    //     {
    //         latitude: 23.29475,
    //         longitude: 72.34818,
    //     },
    //     {
    //         latitude: 23.19766,
    //         longitude: 77.43498,
    //     },
    //     {
    //         latitude: 26.24842,
    //         longitude: 77.40913,
    //     },
    //     {
    //         latitude: 26.59952,
    //         longitude: 83.6739,
    //     },
    //     {
    //         latitude: 27.8295,
    //         longitude: 77.877,
    //     },
    //     {
    //         latitude: 22.93492,
    //         longitude: 81.08254,
    //     },
    //     {
    //         latitude: 28.76191,
    //         longitude: 77.50163,
    //     },
    //     {
    //         latitude: 29.54443,
    //         longitude: 77.58779,
    //     },
    //     {
    //         latitude: 24.7967,
    //         longitude: 85.0366,
    //     },
    //     {
    //         latitude: 30.7996,
    //         longitude: 76.91229,
    //     },
    //     {
    //         latitude: 28.20676,
    //         longitude: 78.25608,
    //     },
    //     {
    //         latitude: 28.10855,
    //         longitude: 77.01375,
    //     },
    //     {
    //         latitude: 12.87069,
    //         longitude: 80.05403,
    //     },
    //     {
    //         latitude: 26.15258,
    //         longitude: 74.0028,
    //     },
    //     {
    //         latitude: 27.14749,
    //         longitude: 81.96322,
    //     },
    //     {
    //         latitude: 11.75202,
    //         longitude: 75.49692,
    //     },
    //     {
    //         latitude: 25.53123,
    //         longitude: 78.99286,
    //     },
    //     {
    //         latitude: 23.45483,
    //         longitude: 75.4222,
    //     },
    //     {
    //         latitude: 25.58905,
    //         longitude: 83.57935,
    //     },
    //     {
    //         latitude: 28.66496,
    //         longitude: 77.14194,
    //     },
    //     {
    //         latitude: 20.92709,
    //         longitude: 79.00413,
    //     },
    //     {
    //         latitude: 29.19304,
    //         longitude: 73.20594,
    //     },
    //     {
    //         latitude: 25.3922,
    //         longitude: 86.93372,
    //     },
    //     {
    //         latitude: 12.29939,
    //         longitude: 76.62855,
    //     },
    //     {
    //         latitude: 20.04908,
    //         longitude: 80.62471,
    //     },
    //     {
    //         latitude: 26.41527,
    //         longitude: 82.12458,
    //     },
    //     {
    //         latitude: 27.94555,
    //         longitude: 80.77625,
    //     },
    //     {
    //         latitude: 21.16966,
    //         longitude: 77.31235,
    //     },
    //     {
    //         latitude: 16.46761,
    //         longitude: 73.65123,
    //     },
    //     {
    //         latitude: 27.8892,
    //         longitude: 79.9084,
    //     },
    //     {
    //         latitude: 12.98856,
    //         longitude: 78.1812,
    //     },
    //     {
    //         latitude: 11.7235,
    //         longitude: 78.95693,
    //     },
    //     {
    //         latitude: 13.20977,
    //         longitude: 79.09219,
    //     },
    //     {
    //         latitude: 8.9797,
    //         longitude: 76.71741,
    //     },
    //     {
    //         latitude: 26.10148,
    //         longitude: 83.54383,
    //     },
    //     {
    //         latitude: 19.0073,
    //         longitude: 75.7561,
    //     },
    //     {
    //         latitude: 26.51175,
    //         longitude: 80.40361,
    //     },
    //     {
    //         latitude: 30.34527,
    //         longitude: 76.41589,
    //     },
    //     {
    //         latitude: 30.62581,
    //         longitude: 76.38563,
    //     },
    //     {
    //         latitude: 25.2394,
    //         longitude: 78.46941,
    //     },
    //     {
    //         latitude: 29.2409,
    //         longitude: 77.01164,
    //     },
    //     {
    //         latitude: 17.92866,
    //         longitude: 83.42418,
    //     },
    //     {
    //         latitude: 28.44547,
    //         longitude: 78.78297,
    //     },
    //     {
    //         latitude: 25.99636,
    //         longitude: 84.40585,
    //     },
    //     {
    //         latitude: 26.77254,
    //         longitude: 80.91919,
    //     },
    //     {
    //         latitude: 29.9234,
    //         longitude: 75.55163,
    //     },
    //     {
    //         latitude: 8.72831,
    //         longitude: 77.71065,
    //     },
    //     {
    //         latitude: 25.7576,
    //         longitude: 82.70992,
    //     },
    //     {
    //         latitude: 27.77066,
    //         longitude: 80.72961,
    //     },
    //     {
    //         latitude: 28.51464,
    //         longitude: 77.02891,
    //     },
    //     {
    //         latitude: 23.60751,
    //         longitude: 83.61638,
    //     },
    //     {
    //         latitude: 29.7954,
    //         longitude: 77.87488,
    //     },
    //     {
    //         latitude: 30.29369,
    //         longitude: 77.30144,
    //     },
    //     {
    //         latitude: 25.95567,
    //         longitude: 80.15881,
    //     },
    //     {
    //         latitude: 21.8102,
    //         longitude: 84.96283,
    //     },
    //     {
    //         latitude: 24.74764,
    //         longitude: 80.77588,
    //     },
    //     {
    //         latitude: 30.87197,
    //         longitude: 75.8795,
    //     },
    //     {
    //         latitude: 20.34974,
    //         longitude: 85.90184,
    //     },
    //     {
    //         latitude: 23.11532,
    //         longitude: 81.69793,
    //     },
    //     {
    //         latitude: 27.23896,
    //         longitude: 94.11084,
    //     },
    //     {
    //         latitude: 26.22795,
    //         longitude: 84.36569,
    //     },
    //     {
    //         latitude: 23.6191,
    //         longitude: 77.42979,
    //     },
    //     {
    //         latitude: 30.65401,
    //         longitude: 76.84899,
    //     },
    //     {
    //         latitude: 29.92116,
    //         longitude: 78.09996,
    //     },
    //     {
    //         latitude: 28.68141,
    //         longitude: 77.17717,
    //     },
    //     {
    //         latitude: 32.22337,
    //         longitude: 75.54708,
    //     },
    //     {
    //         latitude: 25.87687,
    //         longitude: 86.59109,
    //     },
    //     {
    //         latitude: 28.07809,
    //         longitude: 80.47749,
    //     },
    //     {
    //         latitude: 9.00287,
    //         longitude: 76.58372,
    //     },
    //     {
    //         latitude: 26.28156,
    //         longitude: 72.9906,
    //     },
    //     {
    //         latitude: 31.01672,
    //         longitude: 76.37332,
    //     },
    //     {
    //         latitude: 13.21483,
    //         longitude: 75.00354,
    //     },
    //     {
    //         latitude: 26.34706,
    //         longitude: 92.68616,
    //     },
    //     {
    //         latitude: 23.61603,
    //         longitude: 77.42923,
    //     },
    //     {
    //         latitude: 28.72319,
    //         longitude: 77.84415,
    //     },
    //     {
    //         latitude: 26.70342,
    //         longitude: 92.47685,
    //     },
    //     {
    //         latitude: 20.3336,
    //         longitude: 73.88697,
    //     },
    //     {
    //         latitude: 29.20251,
    //         longitude: 77.97012,
    //     },
    //     {
    //         latitude: 28.70529,
    //         longitude: 77.28311,
    //     },
    //     {
    //         latitude: 20.02779,
    //         longitude: 73.79515,
    //     },
    //     {
    //         latitude: 29.02763,
    //         longitude: 77.68417,
    //     },
    //     {
    //         latitude: 28.66916,
    //         longitude: 75.03654,
    //     },
    //     {
    //         latitude: 32.25662,
    //         longitude: 75.58018,
    //     },
    //     {
    //         latitude: 26.18656,
    //         longitude: 73.70811,
    //     },
    //     {
    //         latitude: 27.13878,
    //         longitude: 77.78052,
    //     },
    //     {
    //         latitude: 28.36044,
    //         longitude: 76.53404,
    //     },
    // ];

    return (
        // LoadScript/GoogleMap produces an empty div before the actual useful div, so provide a dummy 0 height row for it
        <div className="tw-w-full tw-h-[400px] tw-grid tw-grid-rows-[0_auto] tw-grid-cols-1 tw-place-items-center">
            <LoadScript
                googleMapsApiKey="AIzaSyA0DUwYgpbnSjeUpjDxjUVcNEFTEvur4i4"
                // libraries={["visualization"]}
                // preventGoogleFontsLoading={true}
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={mapCenter}
                    zoom={zoomLevel}
                >
                    {dealerList == null || dealerList.length == 0
                        ? // defaultDealerList.map((dealer, dealerIndex) => (
                          //       <MarkerF
                          //           position={{lat: Number(dealer.latitude), lng: Number(dealer.longitude)}}
                          //           key={dealerIndex}
                          //       />
                          //   ))
                          null
                        : dealerList.map((dealer, dealerIndex) => (
                              <MarkerF
                                  position={{lat: Number(dealer.latitude), lng: Number(dealer.longitude)}}
                                  key={dealerIndex}
                              />
                          ))}

                    {/* <Autocomplete
                        onLoad={()}
                    >
                        <input
                            type="text"
                            name="query"
                            placeholder="query"
                        ></input>
                    </Autocomplete> */}
                </GoogleMap>
            </LoadScript>
        </div>
    );
}

function TroubleFindingDealers({
    userPreferences,
    utmParameters,
    pageUrl,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
    pageUrl: string;
}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className="lg-px-screen-edge lg-bg-secondary-100 tw-flex tw-flex-col tw-justify-center tw-items-center">
            <VerticalSpacer className="tw-h-10" />

            <DefaultTextAnimation>
                <div className="lg-text-headline tw-text-center">{contentData.getContent("dealerLocatorS2H")}</div>
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-3" />

            <DefaultTextAnimation>
                <div className="lg-text-title2 lg-text-secondary-700 tw-text-center">{contentData.getContent("dealerLocatorS2T")}</div>
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-3" />

            <DefaultElementAnimation>
                <ContactUsCta
                    userPreferences={userPreferences}
                    textVernacId="dealerLocatorS2BT"
                    className="tw-z-10"
                    utmParameters={utmParameters}
                    pageUrl={pageUrl}
                />
            </DefaultElementAnimation>

            <VerticalSpacer className="tw-h-10" />
        </div>
    );
}

function JoinLivguardNetwork({userPreferences, setIsApplyNowDialogOpen}: {userPreferences: UserPreferences; setIsApplyNowDialogOpen: React.Dispatch<React.SetStateAction<boolean>>}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className="lg-px-screen-edge lg-bg-secondary-100 tw-flex tw-flex-col tw-justify-center tw-items-center">
            <VerticalSpacer className="tw-h-10" />

            <DefaultTextAnimation>
                <div className="lg-text-headline tw-text-center">{contentData.getContent("dealerLocatorS4H")}</div>
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-3" />

            <DefaultTextAnimation>
                <div className="lg-text-title2 lg-text-secondary-700 tw-text-center">{contentData.getContent("dealerLocatorS4T")}</div>
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-3" />

            <DefaultElementAnimation>
                <ApplyNowForDealerCta
                    userPreferences={userPreferences}
                    textVernacId="dealerLocatorS4BT"
                    className="tw-z-10"
                    setIsApplyNowDialogOpen={setIsApplyNowDialogOpen}
                />
            </DefaultElementAnimation>

            <VerticalSpacer className="tw-h-10" />
        </div>
    );
}

export function ApplyNowForDealerCta({
    userPreferences,
    textVernacId,
    className,
    setIsApplyNowDialogOpen,
}: {
    userPreferences: UserPreferences;
    textVernacId: string;
    className?: string;
    setIsApplyNowDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const contentData = useContext(ContentProviderContext);
    function tryToOpenpplyNowDialog() {
        setIsApplyNowDialogOpen(true);
    }

    return (
        <div className={className}>
            <button
                className="lg-cta-button"
                onClick={tryToOpenpplyNowDialog}
            >
                {contentData.getContent(textVernacId)}
            </button>
        </div>
    );
}

export function ApplyNowForDealerDialog({
    userPreferences,
    isApplyNowDialogOpen,
    setApplyNowDialogOpen,
    utmParameters,
    pageUrl,
}: {
    userPreferences: UserPreferences;
    isApplyNowDialogOpen: boolean;
    setApplyNowDialogOpen: React.Dispatch<boolean>;
    utmParameters: {
        [searchParameter: string]: string;
    };
    pageUrl: string;
}) {
    const contentData = useContext(ContentProviderContext);
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

    function tryToCloseApplyNowDialog() {
        setApplyNowDialogOpen(false);
        const action: FormStateInputsAction = {
            actionType: FormStateInputsActionType.TryToCloseDialog,
            payload: true,
        };
        dispatch(action);
    }

    return (
        <>
            <LivguardDialog
                isDialogOpen={isApplyNowDialogOpen && !formStateInputs.formSuccessfullySubmitted}
                tryToCloseDialog={tryToCloseApplyNowDialog}
                title={contentData.getContent("applyNowForDealerT1")}
                showCloseIcon={true}
            >
                <fetcher.Form
                    className="tw-w-full tw-flex tw-flex-col"
                    method="post"
                    action="/apply-for-dealership"
                >
                    <div className="lg-text-body-bold lg-text-secondary-900 tw-pl-3">{`${contentData.getContent("applyNowForDealerT3")}*`}</div>

                    <VerticalSpacer className="tw-h-1" />

                    <input
                        type="text"
                        className="lg-text-input"
                        name="name"
                        required
                        placeholder={contentData.getContent("applyNowForDealerPH3")}
                        onChange={(e) => {
                            const action: FormStateInputsAction = {
                                actionType: FormStateInputsActionType.SetName,
                                payload: e.target.value,
                            };
                            dispatch(action);
                        }}
                    />

                    <VerticalSpacer className="tw-h-2" />

                    <div className="lg-text-body-bold lg-text-secondary-900 tw-pl-3">{`${contentData.getContent("applyNowForDealerT4")}*`}</div>

                    <VerticalSpacer className="tw-h-1" />

                    <input
                        type="text"
                        className="lg-text-input"
                        name="emailId"
                        pattern={emailIdValidationPattern}
                        required
                        placeholder={contentData.getContent("applyNowForDealerPH4")}
                        onChange={(e) => {
                            const action: FormStateInputsAction = {
                                actionType: FormStateInputsActionType.SetEmail,
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

                    {formStateInputs.showOtpField && (
                        <div
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-flex tw-flex-row tw-justify-between tw-w-full tw-px-3",
                                formStateInputs.showOtpField ? "tw-opacity-100 tw-duration-100 tw-z-10" : "tw-opacity-0 -tw-z-100",
                            )}
                        >
                            <div
                                className={concatenateNonNullStringsWithSpaces(
                                    "lg-text-secondary-700 tw-text-[12px]",
                                    `${formStateInputs.resendTimeOut > 0 ? "undefined" : "hover:tw-cursor-pointer"}`,
                                )}
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
                    )}

                    <VerticalSpacer className="tw-h-2" />

                    <div className="lg-text-body-bold lg-text-secondary-900 tw-pl-3">{`${contentData.getContent("applyNowForDealerT5")}*`}</div>

                    <VerticalSpacer className="tw-h-1" />

                    <input
                        type="text"
                        className="lg-text-input"
                        name="city"
                        required
                        placeholder={contentData.getContent("applyNowForDealerPH5")}
                        onChange={(e) => {
                            const action: FormStateInputsAction = {
                                actionType: FormStateInputsActionType.SetCity,
                                payload: e.target.value,
                            };
                            dispatch(action);
                        }}
                    />

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
                            formStateInputs.inputData.email == "" ||
                            formStateInputs.inputData.phoneNumber == "" ||
                            formStateInputs.inputData.phoneNumber.length != 10 ||
                            formStateInputs.inputData.otpSubmitted == "" ||
                            formStateInputs.inputData.otpSubmitted.length != 6 ||
                            formStateInputs.inputData.city == ""
                        }
                    >
                        {contentData.getContent("applyNowForDealerT6")}
                    </button>
                </fetcher.Form>
            </LivguardDialog>

            <FormSubmissionSuccessLivguardDialog
                userPreferences={userPreferences}
                isDialogOpen={isApplyNowDialogOpen && formStateInputs.formSuccessfullySubmitted}
                tryToCloseDialog={tryToCloseApplyNowDialog}
            />
        </>
    );
}

export function FaqSection({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const faqs = [
        {
            question: "dealerLocatorPageFAQQ1Q",
            answer: "dealerLocatorPageFAQQ1A",
        },
        {
            question: "dealerLocatorPageFAQQ2Q",
            answer: "dealerLocatorPageFAQQ2A",
        },
        {
            question: "dealerLocatorPageFAQQ3Q",
            answer: "dealerLocatorPageFAQQ3A",
        },
        {
            question: "dealerLocatorPageFAQQ4Q",
            answer: "dealerLocatorPageFAQQ4A",
        },
        {
            question: "dealerLocatorPageFAQQ5Q",
            answer: "dealerLocatorPageFAQQ5A",
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

// const salutations: {[key: string]: {[Language.English]: string; [Language.Hindi]: string}} = {
//     AN: {[Language.English]: "Namaste", [Language.Hindi]: "नमस्ते!"},
//     AD: {[Language.English]: "Namaste!", [Language.Hindi]: "नमस्ते!"},
//     AP: {[Language.English]: "Namaste!", [Language.Hindi]: "नमस्ते!"},
//     AS: {[Language.English]: "Namaskar!", [Language.Hindi]: "नमस्कार!"},
//     BR: {[Language.English]: "Namaste!", [Language.Hindi]: "नमस्ते!!"},
//     CG: {[Language.English]: "Sat sri akal!", [Language.Hindi]: "सत् श्री अकाल!"},
//     CH: {[Language.English]: "Namaste!", [Language.Hindi]: "नमस्ते!!"},
//     DNHDD: {[Language.English]: "Kem Chho!", [Language.Hindi]: "केम छो!"},
//     DL: {[Language.English]: "Namaste!", [Language.Hindi]: "नमस्ते!!"},
//     GA: {[Language.English]: "Namaste!", [Language.Hindi]: "नमस्ते!!"},
//     GJ: {[Language.English]: "Kem Chho!", [Language.Hindi]: "केम छो!"},
//     HR: {[Language.English]: "Namaste!", [Language.Hindi]: "नमस्ते!!"},
//     HP: {[Language.English]: "Namaste!", [Language.Hindi]: "नमस्ते!"},
//     JK: {[Language.English]: "Namaskar!", [Language.Hindi]: "नमस्कार!"},
//     JH: {[Language.English]: "Pranaam!", [Language.Hindi]: "प्रणाम!"},
//     KA: {[Language.English]: "Namaskara!", [Language.Hindi]: "नमस्कारा!"},
//     KL: {[Language.English]: "Namaskaram!", [Language.Hindi]: "नमस्कराम!"},
//     LD: {[Language.English]: "Namaskaram!", [Language.Hindi]: "नमस्कराम!"},
//     MP: {[Language.English]: "Namaskar!", [Language.Hindi]: "नमस्कार!"},
//     MH: {[Language.English]: "Namaskar!", [Language.Hindi]: "नमस्कार!"},
//     MN: {[Language.English]: "Namaste!", [Language.Hindi]: "नमस्ते!"},
//     ML: {[Language.English]: "Namaste!", [Language.Hindi]: "नमस्ते!"},
//     MZ: {[Language.English]: "Namaste!", [Language.Hindi]: "नमस्ते!"},
//     NL: {[Language.English]: "Namaste!", [Language.Hindi]: "नमस्ते!"},
//     OD: {[Language.English]: "Namaskar!", [Language.Hindi]: "नमस्कार!"},
//     PY: {[Language.English]: "Namaskar!", [Language.Hindi]: "नमस्कार!"},
//     PB: {[Language.English]: "Sat sri akal!", [Language.Hindi]: "सत् श्री, अकाल"},
//     RJ: {[Language.English]: "Namaste!", [Language.Hindi]: "नमस्ते!"},
//     SK: {[Language.English]: "Namaste!", [Language.Hindi]: "नमस्ते!"},
//     TN: {[Language.English]: "Vanakkam!", [Language.Hindi]: "वनक्कम!"},
//     TS: {[Language.English]: "Namaste!", [Language.Hindi]: "नमस्ते!"},
//     TR: {[Language.English]: "Kemon acho!", [Language.Hindi]: "केमोन आछो!"},
//     UP: {[Language.English]: "Namaste!", [Language.Hindi]: "नमस्ते!"},
//     UK: {[Language.English]: "Namaste!", [Language.Hindi]: "नमस्ते!"},
//     WB: {[Language.English]: "Kemon acho!", [Language.Hindi]: "केमोन आछो!"},
// };
