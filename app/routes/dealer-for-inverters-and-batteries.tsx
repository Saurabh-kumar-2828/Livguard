import {GoogleMap, LoadScript, MarkerF} from "@react-google-maps/api";
import {ActionFunction, LinksFunction, LoaderFunction, MetaFunction} from "@remix-run/node";
import {Form, useActionData, useFetcher, useTransition} from "@remix-run/react";
import React, {useEffect, useState} from "react";
import {Facebook, Instagram, Linkedin, Twitter, X, Youtube} from "react-bootstrap-icons";
import {useLoaderData} from "react-router";
import {toast} from "react-toastify";
import {getDealerForCity, insertQueryLeads} from "~/backend/dealer.server";
import {StickyBottomBar} from "~/components/bottomBar";
import {SocialHandles} from "~/components/category/common";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {FAQSection} from "~/components/faqs";
import LivguardDialog from "~/components/livguardDialog";
import {OtpVerificationDialog} from "~/components/otpVerificationDialog";
import {PageScaffold} from "~/components/pageScaffold";
import {EmptyFlexFiller} from "~/global-common-typescript/components/emptyFlexFiller";
import {FixedHeightImage} from "~/global-common-typescript/components/fixedHeightImage";
import {FixedWidthImage} from "~/global-common-typescript/components/fixedWidthImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {getNonEmptyStringFromUnknown} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {concatenateNonNullStringsWithSpaces, generateUuid} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {emailIdValidationPattern, indianPhoneNumberValidationPattern, phoneNumberValidationPattern} from "~/global-common-typescript/utilities/validationPatterns";
import {ContactUsCta} from "~/routes";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import {Dealer, FormType, Language, UserPreferences} from "~/typeDefinitions";
import {getRedirectToUrlFromRequest} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";

export const meta: MetaFunction = ({data}: {data: LoaderData}) => {
    const userPreferences: UserPreferences = data.userPreferences;
    if (userPreferences.language == Language.English) {
        return {
            title: "Dealer Locator | Find Livguard inverter battery shop near me",
            description: "Find dealers near you with ease. Buy Livguard Inverter, inverter battries for your home through our authorized dealers.",
        };
    } else if (userPreferences.language == Language.Hindi) {
        return {
            title: "डीलर लोकेटर | नज़दीकी लिवगार्ड इनवर्टर बैटरी की दुकान खोजें",
            description: "अपने आस-पास के डीलरों को आसानी से खोजें। खरीदें अपने घर के लिए लिवगार्ड इनवर्टर, इनवर्टर बैटरी हमारे अधिकृत डीलरों के माध्यम से।",
        };
    } else {
        throw Error(`Undefined language ${userPreferences.language}`);
    }
};

export const links: LinksFunction = () => {
    return [{rel: "canonical", href: "https://www.livguard.com/dealer-for-inverters-and-batteries/"}];
};

type DealerLocatorActionData = {
    dealerList: Array<Dealer> | null;
    error: string | null;
};

export const action: ActionFunction = async ({request, params}) => {
    const body = await request.formData();

    const city = getNonEmptyStringFromUnknown(body.get("dealerLocation")) as string;
    const dealerList = await getDealerForCity(city);
    // TOOD: Handle dealerList error
    if (dealerList instanceof Error) {
        return {
            dealerList: null,
            error: dealerList.message,
        };
    }

    const result = await insertQueryLeads(city);
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
};

export const loader: LoaderFunction = async ({request, params}) => {
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
    // const initialDealerList: Array<Dealer> = [];

    const actionData = useActionData();

    const utmSearchParameters = useUtmSearchParameters();

    useEffect(() => {
        if (actionData != null && actionData.error != null) {
            toast.error(actionData.error);
        }
    }, [actionData]);

    return (
        <>
            <PageScaffold
                userPreferences={userPreferences}
                redirectTo={redirectTo}
                showMobileMenuIcon={true}
                utmParameters={utmSearchParameters}
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
                />
            </PageScaffold>

            <StickyBottomBar userPreferences={userPreferences} />

            <script
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
                                    "name": "Dealer Locator",
                                    "item": "https://www.livguard.com/inverter-batteries",
                                    "description": "Find the Livguard dealer near you"
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
                                    "name": "Dealer Locator",
                                    "url": "https://www.livguard.com/inverter-batteries",
                                    "description": "Find the Livguard dealer near you"
                                }
                            ]
                        }
                    `,
                }}
            />
        </>
    );
}

export function DealerLocatorPage({
    userPreferences,
    actionData,
    utmParameters,
    className,
}: {
    userPreferences: UserPreferences;
    actionData: DealerLocatorActionData;
    utmParameters: {
        [searchParameter: string]: string;
    };
    className: string;
}) {
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

                <div className="tw-flex tw-flex-col lg:tw-grid lg:tw-grid-cols-[minmax(0,2fr),minmax(0,1fr)] lg:tw-grid-rows-1 lg:tw-gap-x-4 lg:tw-items-center">
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
                                name="dealerLocation"
                                required
                                className="lg-text-input tw-w-full tw-text-center lg:tw-max-w-[22rem]"
                                placeholder={`${getVernacularString("dealerLocatorInputText", userPreferences.language)}`}
                            ></input>

                            {/* <FancySearchableSelect
                        id="city"
                        options={cityList.map((city, cityIndex) => ({
                            value: cityIndex,
                            label: city.name,
                        }))}
                        className="lg-text-input tw-w-full tw-text-center"
                        placeholder={`${getVernacularString("dealerLocatorInputText", userPreferences.language)}`}
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
                                name="dealerLocation"
                                className="tw-hidden"
                                readOnly
                            />

                            <button
                                type="submit"
                                className="lg-cta-button"
                                disabled={transition.state != "idle"}
                                onClick={() => {
                                    setDealerList(null);
                                    setShowMore(false);
                                }}
                            >
                                {`${getVernacularString("dealerLocatorButtonText", userPreferences.language)}`}
                            </button>
                        </Form>

                        {actionData == null ? null : actionData.dealerList == null || actionData.dealerList.length == 0 ? (
                            <>
                                <VerticalSpacer className="tw-h-4" />

                                <div className="lg-text-body tw-text-center lg-text-primary-500">{`${getVernacularString("noDealerLocatorText", userPreferences.language)}`} </div>
                            </>
                        ) : (
                            <>
                                <VerticalSpacer className="tw-h-4" />

                                {/* <Link
                                    to="#dealer-list"
                                    className="tw-block tw-text-title2 tw-text-center tw-px-4 tw-py-1 tw-border lg-border-secondary-900-dark tw-rounded-lg tw-w-fit tw-mx-auto"
                                >
                                    {`${getVernacularString("dealerLocatorShowText", userPreferences.language)} (${actionData.dealerList.length})`}
                                </Link> */}
                                <button
                                    type="button"
                                    className="tw-block tw-text-title2 tw-text-center tw-px-4 tw-py-1 tw-border lg-border-secondary-900-dark tw-rounded-lg tw-w-fit tw-mx-auto"
                                    onClick={() => document.getElementById("dealer-list")?.scrollIntoView()}
                                >
                                    {`${getVernacularString("dealerLocatorShowText", userPreferences.language)} (${actionData.dealerList.length})`}
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
                                <div className="lg-text-banner tw-text-center">{salutations[dealerList[0].stateCode][userPreferences.language]}</div>
                                <div className="lg-text-headline tw-text-center tw-py-1">{getVernacularString("dealerLocatorHighlightedText", userPreferences.language)}</div>
                                <div className="lg-text-title2 tw-text-center">{dealerList[0].city}</div>
                            </div>

                            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-3 lg:tw-gap-x-2 tw-gap-y-3">
                                <ItemBuilder
                                    items={dealerList}
                                    itemBuilder={(dealer, dealerIndex) => (
                                        <React.Fragment key={dealerIndex}>
                                            <DefaultElementAnimation>
                                                <div
                                                    className="tw-flex tw-flex-col tw-text-left lg-bg-secondary-100 tw-rounded-lg tw-p-4 tw-h-full"
                                                    key={dealerIndex}
                                                >
                                                    <div className="lg-text-title1">{dealer.name}</div>

                                                    <VerticalSpacer className="tw-h-4" />

                                                    <div className="lg-text-body">Dealer Address:</div>

                                                    <div className="lg-text-body">{`${dealer.address}, ${dealer.city}, ${dealer.state}, ${dealer.pinCode}`}</div>

                                                    <div className="lg-text-body">M: {dealer.phoneNumber}</div>

                                                    <EmptyFlexFiller />

                                                    <VerticalSpacer className="tw-h-4" />

                                                    <div className="tw-flex tw-flex-row tw-justify-center tw-p-2 tw-px-4 lg:tw-items-end">
                                                        {/* <button
                                                        type="button"
                                                        className="tw-bg-gradient-to-r tw-from-[#F25F60] tw-to-[#EB2A2B] tw-rounded-3xl tw-p-2 tw-px-4"
                                                    >
                                                        Enquire Now
                                                    </button> */}
                                                        <ContactUsCta
                                                            userPreferences={userPreferences}
                                                            textVernacId="landingPageBottomBarT2"
                                                            className="tw-z-10 lg:tw-place-self-end"
                                                            utmParameters={utmParameters}
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
    const defaultCenter = {
        lat: 21.7679,
        lng: 78.8718,
    };

    const defaultZoom: number = 4;

    const [mapCenter, setMapCenter] = useState(defaultCenter);
    const [zoomLevel, setZoomLevel] = useState(defaultZoom);

    const containerStyle = {
        width: "100%",
        height: "400px",
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

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyCek99jdIoNgCDfHdIblTJdEo5dOa4gRLY"
            // preventGoogleFontsLoading={true}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={mapCenter}
                zoom={zoomLevel}
            >
                {dealerList == null || dealerList.length == 0
                    ? null
                    : dealerList.slice(0, 5).map((dealer, dealerIndex) => (
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
                        name="dealerLocation"
                        placeholder="dealerLocation"
                    ></input>
                </Autocomplete> */}
            </GoogleMap>
        </LoadScript>
    );
}

function TroubleFindingDealers({
    userPreferences,
    utmParameters,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
}) {
    return (
        <div className="lg-px-screen-edge lg-bg-secondary-100 tw-flex tw-flex-col tw-justify-center tw-items-center">
            <VerticalSpacer className="tw-h-10" />

            <DefaultTextAnimation>
                <div className="lg-text-headline tw-text-center">{getVernacularString("dealerLocatorS2H", userPreferences.language)}</div>
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-3" />

            <DefaultTextAnimation>
                <div className="lg-text-title2 lg-text-secondary-700 tw-text-center">{getVernacularString("dealerLocatorS2T", userPreferences.language)}</div>
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-3" />

            <DefaultElementAnimation>
                <ContactUsCta
                    userPreferences={userPreferences}
                    textVernacId="dealerLocatorS2BT"
                    className="tw-z-10"
                    utmParameters={utmParameters}
                />
            </DefaultElementAnimation>

            <VerticalSpacer className="tw-h-10" />
        </div>
    );
}

function JoinLivguardNetwork({
    userPreferences,
    utmParameters,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
}) {
    return (
        <div className="lg-px-screen-edge lg-bg-secondary-100 tw-flex tw-flex-col tw-justify-center tw-items-center">
            <VerticalSpacer className="tw-h-10" />

            <DefaultTextAnimation>
                <div className="lg-text-headline tw-text-center">{getVernacularString("dealerLocatorS4H", userPreferences.language)}</div>
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-3" />

            <DefaultTextAnimation>
                <div className="lg-text-title2 lg-text-secondary-700 tw-text-center">{getVernacularString("dealerLocatorS4T", userPreferences.language)}</div>
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-3" />

            <DefaultElementAnimation>
                <ApplyNowForDealerCta
                    userPreferences={userPreferences}
                    textVernacId="dealerLocatorS4BT"
                    className="tw-z-10"
                    utmParameters={utmParameters}
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
    utmParameters,
}: {
    userPreferences: UserPreferences;
    textVernacId: string;
    className?: string;
    utmParameters: {
        [searchParameter: string]: string;
    };
}) {
    const [isApplyNowDialogOpen, setApplyNowDialogOpen] = useState(false);

    function tryToOpenpplyNowDialog() {
        setApplyNowDialogOpen(true);
    }

    return (
        <div className={className}>
            <button
                className="lg-cta-button"
                onClick={tryToOpenpplyNowDialog}
            >
                {getVernacularString(textVernacId, userPreferences.language)}
            </button>

            <ApplyNowForDealerDialog
                userPreferences={userPreferences}
                isApplyNowDialogOpen={isApplyNowDialogOpen}
                setApplyNowDialogOpen={setApplyNowDialogOpen}
                utmParameters={utmParameters}
            />
        </div>
    );
}

export function ApplyNowForDealerDialog({
    userPreferences,
    isApplyNowDialogOpen,
    setApplyNowDialogOpen,
    utmParameters,
}: {
    userPreferences: UserPreferences;
    isApplyNowDialogOpen: boolean;
    setApplyNowDialogOpen: React.Dispatch<boolean>;
    utmParameters: {
        [searchParameter: string]: string;
    };
}) {
    const fetcher = useFetcher();
    const [inputData, setInputData] = useState<{name: string; phoneNumber: string; emailId: string; city: string}>({name: "", phoneNumber: "", emailId: "", city: ""});
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
        }

        if (fetcher.data.type == FormType.applyForDealership) {
            setStep(3);
        }
    }, [fetcher.data]);

    function tryToCloseApplyNowDialog() {
        setApplyNowDialogOpen(false);
    }

    return (
        <>
            <LivguardDialog
                isDialogOpen={isApplyNowDialogOpen && step == 1}
                tryToCloseDialog={tryToCloseApplyNowDialog}
                title={getVernacularString("applyNowForDealerT1", userPreferences.language)}
                showCloseIcon={false}
            >
                <fetcher.Form
                    className="tw-w-full tw-flex tw-flex-col"
                    method="post"
                    action="/otp-verification"
                >
                    <div className="lg-text-body-bold lg-text-secondary-900 tw-pl-3">{`${getVernacularString("applyNowForDealerT2", userPreferences.language)}*`}</div>

                    <VerticalSpacer className="tw-h-2" />

                    <input
                        type="text"
                        className="lg-text-input"
                        name="phoneNumber"
                        pattern={indianPhoneNumberValidationPattern}
                        required
                        placeholder={getVernacularString("applyNowForDealerPH2", userPreferences.language)}
                        onChange={(e) => {
                            const newState = structuredClone(inputData);
                            newState.phoneNumber = e.target.value;
                            setInputData(newState);
                        }}
                    />

                    <VerticalSpacer className="tw-h-4" />

                    <div className="lg-text-body-bold lg-text-secondary-900 tw-pl-3">{`${getVernacularString("applyNowForDealerT3", userPreferences.language)}*`}</div>

                    <VerticalSpacer className="tw-h-2" />

                    <input
                        type="text"
                        className="lg-text-input"
                        name="name"
                        required
                        placeholder={getVernacularString("applyNowForDealerPH3", userPreferences.language)}
                        onChange={(e) => {
                            const newState = structuredClone(inputData);
                            newState.name = e.target.value;
                            setInputData(newState);
                        }}
                    />

                    <VerticalSpacer className="tw-h-4" />

                    <div className="lg-text-body-bold lg-text-secondary-900 tw-pl-3">{`${getVernacularString("applyNowForDealerT4", userPreferences.language)}*`}</div>

                    <VerticalSpacer className="tw-h-2" />

                    <input
                        type="text"
                        className="lg-text-input"
                        name="emailId"
                        pattern={emailIdValidationPattern}
                        required
                        placeholder={getVernacularString("applyNowForDealerPH4", userPreferences.language)}
                        onChange={(e) => {
                            const newState = structuredClone(inputData);
                            newState.emailId = e.target.value;
                            setInputData(newState);
                        }}
                    />

                    <VerticalSpacer className="tw-h-4" />

                    <div className="lg-text-body-bold lg-text-secondary-900 tw-pl-3">{`${getVernacularString("applyNowForDealerT5", userPreferences.language)}*`}</div>

                    <VerticalSpacer className="tw-h-2" />

                    <input
                        type="text"
                        className="lg-text-input"
                        name="city"
                        required
                        placeholder={getVernacularString("applyNowForDealerPH5", userPreferences.language)}
                        onChange={(e) => {
                            const newState = structuredClone(inputData);
                            newState.city = e.target.value;
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
                        value={FormType.applyForDealership}
                    />

                    <button
                        type="submit"
                        className="lg-cta-button tw-px-4 tw-self-center tw-w-60"
                        disabled={fetcher.state != "idle"}
                    >
                        {getVernacularString("applyNowForDealerT6", userPreferences.language)}
                    </button>
                </fetcher.Form>
            </LivguardDialog>

            <OtpVerificationDialog
                userPreferences={userPreferences}
                isDialogOpen={isApplyNowDialogOpen && step == 2}
                setIsDialogOpen={tryToCloseApplyNowDialog}
                inputData={inputData}
                fetcher={fetcher}
                utmParameters={utmParameters}
                leadId={leadId}
                formType={FormType.applyForDealership}
            />

            <FormSubmissionSuccessLivguardDialog
                userPreferences={userPreferences}
                isDialogOpen={isApplyNowDialogOpen && step == 3}
                tryToCloseDialog={tryToCloseApplyNowDialog}
            />
        </>
    );
}

export function FormSubmissionSuccess({userPreferences, tryToCloseDialog}: {userPreferences: UserPreferences; tryToCloseDialog: () => void}) {
    return (
        <div className="tw-w-full tw-bg-gradient-to-b tw-from-secondary-500-light tw-to-secondary-100-light dark:tw-from-secondary-500-dark dark:tw-to-secondary-100-dark lg-bg-secondary-100 tw-px-6 tw-pt-6 tw-rounded-lg tw-flex tw-flex-col tw-text-center tw-justify-center tw-items-center tw-relative">
            <button
                type="button"
                className="tw-absolute tw-top-6 tw-right-6"
                onClick={tryToCloseDialog}
            >
                <X className="tw-w-8 tw-h-8" />
            </button>

            <FixedWidthImage
                relativePath="/livguard/icons/confirmation.png"
                width="10rem"
            />

            <VerticalSpacer className="tw-h-2" />

            <div
                dangerouslySetInnerHTML={{__html: getVernacularString("successT1", userPreferences.language)}}
                className="lg-text-banner"
            />

            <VerticalSpacer className="tw-h-4" />

            <div
                dangerouslySetInnerHTML={{__html: getVernacularString("successT2", userPreferences.language)}}
                className="lg-text-title2"
            />

            <VerticalSpacer className="tw-h-8" />

            <div className="tw-w-full tw-flex tw-justify-evenly">
                <a
                    href="https://www.facebook.com/LivguardEnergy/"
                    target="_blank"
                >
                    <Facebook className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                </a>
                <a
                    href="https://twitter.com/LivguardEnergy"
                    target="_blank"
                >
                    <Twitter className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                </a>
                <a
                    href="https://www.instagram.com/livguardenergy/"
                    target="_blank"
                >
                    <Instagram className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                </a>
                <a
                    href="https://www.linkedin.com/company/livguard-energy/"
                    target="_blank"
                >
                    <Linkedin className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                </a>
                <a
                    href="https://www.youtube.com/@LivguardEnergy"
                    target="_blank"
                >
                    <Youtube className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                </a>
            </div>

            <VerticalSpacer className="tw-h-4" />

            <div
                dangerouslySetInnerHTML={{__html: getVernacularString("successT3", userPreferences.language)}}
                className="lg-text-body"
            />

            <VerticalSpacer className="tw-h-8" />

            <div className="tw-self-center">
                <FixedHeightImage
                    relativePath="/livguard/header/akshay.png"
                    height="13.75rem"
                />
            </div>
        </div>
    );
}

export function FormSubmissionSuccessLivguardDialog({userPreferences, isDialogOpen, tryToCloseDialog}: {userPreferences: UserPreferences; isDialogOpen: boolean; tryToCloseDialog: () => void}) {
    return (
        <LivguardDialog
            isDialogOpen={isDialogOpen}
            tryToCloseDialog={tryToCloseDialog}
            title={null}
            showCloseIcon={true}
        >
            <div className="tw-w-full tw-flex tw-flex-col tw-items-center tw-text-center">
                <FixedWidthImage
                    relativePath="/livguard/icons/confirmation.png"
                    width="10rem"
                />

                <VerticalSpacer className="tw-h-2" />

                <div
                    dangerouslySetInnerHTML={{__html: getVernacularString("successT1", userPreferences.language)}}
                    className="lg-text-banner"
                />

                <VerticalSpacer className="tw-h-4" />

                <div
                    dangerouslySetInnerHTML={{__html: getVernacularString("successT2", userPreferences.language)}}
                    className="lg-text-title2"
                />

                <VerticalSpacer className="tw-h-8" />

                <div className="tw-w-full tw-flex tw-justify-evenly">
                    <a
                        href="https://www.facebook.com/LivguardEnergy/"
                        target="_blank"
                    >
                        <Facebook className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                    <a
                        href="https://twitter.com/LivguardEnergy"
                        target="_blank"
                    >
                        <Twitter className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                    <a
                        href="https://www.instagram.com/livguardenergy/"
                        target="_blank"
                    >
                        <Instagram className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                    <a
                        href="https://www.linkedin.com/company/livguard-energy/"
                        target="_blank"
                    >
                        <Linkedin className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                    <a
                        href="https://www.youtube.com/@LivguardEnergy"
                        target="_blank"
                    >
                        <Youtube className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                </div>

                <VerticalSpacer className="tw-h-4" />

                <div
                    dangerouslySetInnerHTML={{__html: getVernacularString("successT3", userPreferences.language)}}
                    className="lg-text-body"
                />

                <VerticalSpacer className="tw-h-8" />

                <div className="tw-self-center">
                    <FixedHeightImage
                        relativePath="/livguard/header/akshay.png"
                        height="13.75rem"
                    />
                </div>
            </div>
        </LivguardDialog>
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
        <FAQSection
            faqs={faqs}
            userPreferences={userPreferences}
            className={className}
        />
    );
}

const salutations: {[key: string]: {[Language.English]: string; [Language.Hindi]: string}} = {
    AN: {[Language.English]: "Namaste", [Language.Hindi]: "नमस्ते!"},
    AD: {[Language.English]: "Namaste!", [Language.Hindi]: "नमस्ते!"},
    AP: {[Language.English]: "Namaste!", [Language.Hindi]: "नमस्ते!"},
    AS: {[Language.English]: "Namaskar!", [Language.Hindi]: "नमस्कार!"},
    BR: {[Language.English]: "Namaste!", [Language.Hindi]: "नमस्ते!!"},
    CG: {[Language.English]: "Sat sri akal!", [Language.Hindi]: "सत् श्री अकाल!"},
    CH: {[Language.English]: "Namaste!", [Language.Hindi]: "नमस्ते!!"},
    DNHDD: {[Language.English]: "Kem Chho!", [Language.Hindi]: "केम छो!"},
    DL: {[Language.English]: "Namaste!", [Language.Hindi]: "नमस्ते!!"},
    GA: {[Language.English]: "Namaste!", [Language.Hindi]: "नमस्ते!!"},
    GJ: {[Language.English]: "Kem Chho!", [Language.Hindi]: "केम छो!"},
    HR: {[Language.English]: "Namaste!", [Language.Hindi]: "नमस्ते!!"},
    HP: {[Language.English]: "Namaste!", [Language.Hindi]: "नमस्ते!"},
    JK: {[Language.English]: "Namaskar!", [Language.Hindi]: "नमस्कार!"},
    JH: {[Language.English]: "Pranaam!", [Language.Hindi]: "प्रणाम!"},
    KA: {[Language.English]: "Namaskara!", [Language.Hindi]: "नमस्कारा!"},
    KL: {[Language.English]: "Namaskaram!", [Language.Hindi]: "नमस्कराम!"},
    LD: {[Language.English]: "Namaskaram!", [Language.Hindi]: "नमस्कराम!"},
    MP: {[Language.English]: "Namaskar!", [Language.Hindi]: "नमस्कार!"},
    MH: {[Language.English]: "Namaskar!", [Language.Hindi]: "नमस्कार!"},
    MN: {[Language.English]: "Namaste!", [Language.Hindi]: "नमस्ते!"},
    ML: {[Language.English]: "Namaste!", [Language.Hindi]: "नमस्ते!"},
    MZ: {[Language.English]: "Namaste!", [Language.Hindi]: "नमस्ते!"},
    NL: {[Language.English]: "Namaste!", [Language.Hindi]: "नमस्ते!"},
    OD: {[Language.English]: "Namaskar!", [Language.Hindi]: "नमस्कार!"},
    PY: {[Language.English]: "Namaskar!", [Language.Hindi]: "नमस्कार!"},
    PB: {[Language.English]: "Sat sri akal!", [Language.Hindi]: "सत् श्री, अकाल"},
    RJ: {[Language.English]: "Namaste!", [Language.Hindi]: "नमस्ते!"},
    SK: {[Language.English]: "Namaste!", [Language.Hindi]: "नमस्ते!"},
    TN: {[Language.English]: "Vanakkam!", [Language.Hindi]: "वनक्कम!"},
    TS: {[Language.English]: "Namaste!", [Language.Hindi]: "नमस्ते!"},
    TR: {[Language.English]: "Kemon acho!", [Language.Hindi]: "केमोन आछो!"},
    UP: {[Language.English]: "Namaste!", [Language.Hindi]: "नमस्ते!"},
    UK: {[Language.English]: "Namaste!", [Language.Hindi]: "नमस्ते!"},
    WB: {[Language.English]: "Kemon acho!", [Language.Hindi]: "केमोन आछो!"},
};
