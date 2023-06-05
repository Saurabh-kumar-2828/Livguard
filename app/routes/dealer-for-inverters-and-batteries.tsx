import {GoogleMap, LoadScript, MarkerF} from "@react-google-maps/api";
import {ActionFunction, LinksFunction, LoaderFunction, MetaFunction} from "@remix-run/node";
import {Form, useActionData, useFetcher, useTransition} from "@remix-run/react";
import React, {useEffect, useReducer, useRef, useState} from "react";
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
import {Uuid} from "~/global-common-typescript/typeDefinitions";
import {getNonEmptyStringFromUnknown} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {concatenateNonNullStringsWithSpaces, generateUuid} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {emailIdValidationPattern, indianPhoneNumberValidationPattern} from "~/global-common-typescript/utilities/validationPatterns";
import {ContactUsCta} from "~/routes";
import {FormStateInputsAction, FormStateInputsActionType, FormStateInputsReducer, createInitialFormState} from "~/routes/lead-form.state";
import {getUserPreferencesFromCookiesAndUrlSearchParameters} from "~/server/utilities.server";
import {Dealer, Language, UserPreferences} from "~/typeDefinitions";
import {getRedirectToUrlFromRequest, getUrlFromRequest} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";
import {DealerLocatorPageBottomBar} from "~/components/DealerLocatorPageBottomBar";

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
    pageUrl: string;
};

export const loader: LoaderFunction = async ({request, params}) => {
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
    const [isApplyNowDialogOpen, setIsApplyNowDialogOpen] = useState(false);

    const actionData = useActionData();

    const utmSearchParameters = useUtmSearchParameters();

    useEffect(() => {
        if (actionData != null && actionData.error != null) {
            toast.error(actionData.error);
        }
    }, [actionData]);

    return (
        <div className="tw-flex tw-flex-col tw-relative">
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
                    pageUrl={pageUrl}
                    setIsApplyNowDialogOpen={setIsApplyNowDialogOpen}
                />
            </PageScaffold>

            <DealerLocatorPageBottomBar
                userPreferences={userPreferences}
                setApplyNowDialogOpen={setIsApplyNowDialogOpen}
            />

            <ApplyNowForDealerDialog
                userPreferences={userPreferences}
                isApplyNowDialogOpen={isApplyNowDialogOpen}
                setApplyNowDialogOpen={setIsApplyNowDialogOpen}
                utmParameters={utmSearchParameters}
                pageUrl={pageUrl}
            />

            <div className="tw-sticky tw-left-[1rem] tw-bottom-[1.75rem] tw-bg-gradient-to-r tw-from-[#F25F60] tw-to-[#EB2A2B] tw-rounded-full tw-py-2 tw-px-4 tw-max-w-fit">
                <a
                    href="/offers/inverter-and-battery-jodi"
                    className="tw-grid tw-grid-cols-[auto_.5rem_auto] tw-items-center"
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
                    <div className="tw-col-start-3 tw-text-white">{getVernacularString("dealerLocatorBottomBarT1", userPreferences.language)}</div>
                </a>
            </div>

            {/* <StickyBottomBar userPreferences={userPreferences} /> */}

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
        </div>
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
    const defaultCenter = {
        lat: 21.7679,
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

    return (
        // LoadScript/GoogleMap produces an empty div before the actual useful div, so provide a dummy 0 height row for it
        <div className="tw-w-full tw-h-[400px] tw-grid tw-grid-rows-[0_auto] tw-grid-cols-1 tw-place-items-center">
            <LoadScript
                googleMapsApiKey="AIzaSyA0DUwYgpbnSjeUpjDxjUVcNEFTEvur4i4"
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
                    pageUrl={pageUrl}
                />
            </DefaultElementAnimation>

            <VerticalSpacer className="tw-h-10" />
        </div>
    );
}

function JoinLivguardNetwork({userPreferences, setIsApplyNowDialogOpen}: {userPreferences: UserPreferences; setIsApplyNowDialogOpen: React.Dispatch<React.SetStateAction<boolean>>}) {
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
    function tryToOpenpplyNowDialog() {
        setIsApplyNowDialogOpen(true);
    }

    return (
        <div className={className}>
            <button
                className="lg-cta-button"
                onClick={tryToOpenpplyNowDialog}
            >
                {getVernacularString(textVernacId, userPreferences.language)}
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
    const fetcher = useFetcher();
    const otpFetcher = useFetcher();
    const otpFieldRef = useRef(null);
    const phoneNumberRef = useRef(null);
    const leadId = useRef<Uuid>(generateUuid());

    const [FormStateInputs, dispatch] = useReducer(FormStateInputsReducer, createInitialFormState());
    const [resendTimeOut, setResendTimeOut] = useState(0);

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
        if (FormStateInputs.isOtpresent) {
            toast.success("OTP resent successfully");
        } else {
            toast.success("OTP sent successfully");
        }
        setResendTimeOut(60);
    }, [otpFetcher.data]);

    useEffect(() => {
        if (resendTimeOut > 0) {
            setTimeout(() => {
                setResendTimeOut(resendTimeOut - 1);
            }, 1000);
        }
    }, [resendTimeOut]);

    function tryToCloseApplyNowDialog() {
        setApplyNowDialogOpen(false);
        setResendTimeOut(0);
        const action: FormStateInputsAction = {
            actionType: FormStateInputsActionType.TryToCloseDialog,
            payload: true,
        };
        dispatch(action);
    }

    return (
        <>
            <LivguardDialog
                isDialogOpen={isApplyNowDialogOpen && !FormStateInputs.formSuccessfullySubmitted}
                tryToCloseDialog={tryToCloseApplyNowDialog}
                title={getVernacularString("applyNowForDealerT1", userPreferences.language)}
                showCloseIcon={true}
            >
                <fetcher.Form
                    className="tw-w-full tw-flex tw-flex-col"
                    method="post"
                    action="/apply-for-dealership"
                >
                    <div className="lg-text-body-bold lg-text-secondary-900 tw-pl-3">{`${getVernacularString("applyNowForDealerT3", userPreferences.language)}*`}</div>

                    <VerticalSpacer className="tw-h-1" />

                    <input
                        type="text"
                        className="lg-text-input"
                        name="name"
                        required
                        placeholder={getVernacularString("applyNowForDealerPH3", userPreferences.language)}
                        onChange={(e) => {
                            const action: FormStateInputsAction = {
                                actionType: FormStateInputsActionType.SetName,
                                payload: e.target.value,
                            };
                            dispatch(action);
                        }}
                    />

                    <VerticalSpacer className="tw-h-2" />

                    <div className="lg-text-body-bold lg-text-secondary-900 tw-pl-3">{`${getVernacularString("applyNowForDealerT4", userPreferences.language)}*`}</div>

                    <VerticalSpacer className="tw-h-1" />

                    <input
                        type="text"
                        className="lg-text-input"
                        name="emailId"
                        pattern={emailIdValidationPattern}
                        required
                        placeholder={getVernacularString("applyNowForDealerPH4", userPreferences.language)}
                        onChange={(e) => {
                            const action: FormStateInputsAction = {
                                actionType: FormStateInputsActionType.SetEmail,
                                payload: e.target.value,
                            };
                            dispatch(action);
                        }}
                    />

                    <VerticalSpacer className="tw-h-2" />

                    <div className="lg-text-body-bold lg-text-secondary-900 tw-pl-3">{`${getVernacularString("applyNowForDealerT2", userPreferences.language)}*`}</div>

                    <VerticalSpacer className="tw-h-1" />

                    <div className="tw-relative tw-w-full tw-items-center tw-grid">
                        <input
                            type="text"
                            name="phoneNumber"
                            pattern={indianPhoneNumberValidationPattern}
                            required
                            className="lg-text-input tw-w-full"
                            disabled={FormStateInputs.showOtpField}
                            ref={phoneNumberRef}
                            onChange={(e) => {
                                const phoneNumber = e.target.value;
                                const action: FormStateInputsAction = {
                                    actionType: FormStateInputsActionType.SetPhoneNumber,
                                    payload: phoneNumber,
                                };
                                dispatch(action);
                                if (FormStateInputs.inputData.phoneNumber.length == 10) {
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
                                if (FormStateInputs.inputData.phoneNumber.length == 10) {
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
                                FormStateInputs.showOtpButton ? "tw-opacity-100 tw-duration-100 tw-z-10" : "tw-opacity-0 -tw-z-100 tw-duration-100",
                            )}
                            onClick={(e) => {
                                if (FormStateInputs.inputData.name == "") {
                                    toast.error("Name field can't be empty");
                                    return;
                                }
                                const action: FormStateInputsAction = {
                                    actionType: FormStateInputsActionType.SendOtp,
                                    payload: true,
                                };
                                dispatch(action);
                                setResendTimeOut(60);
                                if (otpFieldRef.current != null) {
                                    otpFieldRef.current.focus();
                                }
                                const data = new FormData();
                                data.append("phoneNumber", FormStateInputs.inputData.phoneNumber);
                                data.append("name", FormStateInputs.inputData.name);
                                otpFetcher.submit(data, {method: "post", action: "/resend-otp"});
                            }}
                        >
                            {getVernacularString("OfferFormGetOTP", userPreferences.language)}
                        </div>
                        <div
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-absolute tw-right-2 hover:tw-cursor-pointer",
                                FormStateInputs.showOtpField && !FormStateInputs.showOtpButton ? "tw-opacity-100 tw-duration-100 tw-z-10" : "tw-opacity-0 -tw-z-100 tw-duration-100",
                            )}
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
                            <img
                                src="https://files.growthjockey.com/livguard/icons/form/edit-phone-number.svg"
                                alt="edit number"
                                className="tw-w-6 tw-h-6"
                            />
                        </div>
                    </div>

                    <VerticalSpacer className="tw-h-2" />

                    <div className="lg-text-body-bold lg-text-secondary-900 tw-pl-3">{`${getVernacularString("applyNowForDealerT5", userPreferences.language)}*`}</div>

                    <VerticalSpacer className="tw-h-1" />

                    <input
                        type="text"
                        className="lg-text-input"
                        name="city"
                        required
                        placeholder={getVernacularString("applyNowForDealerPH5", userPreferences.language)}
                        onChange={(e) => {
                            const action: FormStateInputsAction = {
                                actionType: FormStateInputsActionType.SetCity,
                                payload: e.target.value,
                            };
                            dispatch(action);
                        }}
                    />

                    <VerticalSpacer className="tw-h-2" />

                    <div
                        className={concatenateNonNullStringsWithSpaces(
                            "tw-flex tw-flex-col tw-w-full",
                            FormStateInputs.showOtpField ? "tw-opacity-100 tw-duration-100 tw-z-10" : "tw-opacity-0 -tw-z-100",
                        )}
                    >
                        <div className="lg-text-body-bold lg-text-secondary-900 tw-pl-3">{getVernacularString("contactUsOTPT3", userPreferences.language)}</div>

                        <VerticalSpacer className="tw-h-1" />

                        <div className="tw-relative">
                            <input
                                type="text"
                                name="otpSubmitted"
                                className="lg-text-input"
                                required
                                placeholder={getVernacularString("contactUsOTPT3E", userPreferences.language)}
                                ref={otpFieldRef}
                                onChange={(e) => {
                                    const action: FormStateInputsAction = {
                                        actionType: FormStateInputsActionType.SetPhoneNumber,
                                        payload: e.target.value,
                                    };
                                    dispatch(action);
                                }}
                            />
                            {FormStateInputs.invalidOtp && (
                                <div className="lg-text-primary-500 tw-absolute lg-text-icon tw-right-2 tw-top-0 tw-bottom-0 tw-pt-[18px]">
                                    {getVernacularString("OfferInvalidOTP", userPreferences.language)}
                                </div>
                            )}
                        </div>
                    </div>
                    <VerticalSpacer className="tw-h-1" />

                    <div
                        className={concatenateNonNullStringsWithSpaces(
                            "tw-flex tw-flex-row tw-justify-between tw-w-full tw-px-3",
                            FormStateInputs.showOtpField ? "tw-opacity-100 tw-duration-100 tw-z-10" : "tw-opacity-0 -tw-z-100",
                        )}
                    >
                        <div
                            className={concatenateNonNullStringsWithSpaces("lg-text-secondary-700 tw-text-[12px]", `${resendTimeOut > 0 ? "undefined" : "hover:tw-cursor-pointer"}`)}
                            onClick={() => {
                                const action: FormStateInputsAction = {
                                    actionType: FormStateInputsActionType.SetIsOtpResent,
                                    payload: true,
                                };
                                dispatch(action);
                                const data = new FormData();
                                data.append("phoneNumber", FormStateInputs.inputData.phoneNumber);
                                data.append("name", FormStateInputs.inputData.name);
                                otpFetcher.submit(data, {method: "post", action: "/resend-otp"});
                            }}
                        >
                            {getVernacularString("OfferResendOTP", userPreferences.language)}
                        </div>
                        <div className="lg-text-secondary-700 tw-text-[12px]">{`00:${resendTimeOut}`}</div>
                    </div>

                    <VerticalSpacer className="tw-h-8" />

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
                        value={JSON.stringify(FormStateInputs.inputData)}
                    />

                    <input
                        name="pageUrl"
                        className="tw-hidden"
                        readOnly
                        value={pageUrl}
                    />

                    <button
                        type="submit"
                        className="lg-cta-button tw-px-4 tw-self-center tw-w-60"
                        disabled={
                            fetcher.state != "idle" ||
                            FormStateInputs.inputData.name == "" ||
                            FormStateInputs.inputData.email == "" ||
                            FormStateInputs.inputData.phoneNumber == "" ||
                            FormStateInputs.inputData.phoneNumber.length != 10 ||
                            FormStateInputs.inputData.otpSubmitted == "" ||
                            FormStateInputs.inputData.otpSubmitted.length != 6 ||
                            FormStateInputs.inputData.city == ""
                        }
                    >
                        {getVernacularString("applyNowForDealerT6", userPreferences.language)}
                    </button>
                </fetcher.Form>
            </LivguardDialog>

            <FormSubmissionSuccessLivguardDialog
                userPreferences={userPreferences}
                isDialogOpen={isApplyNowDialogOpen && FormStateInputs.formSuccessfullySubmitted}
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

            {/* <div className="tw-self-center">
                <FixedHeightImage
                    relativePath="/livguard/header/akshay.png"
                    height="13.75rem"
                />
            </div> */}
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

                <VerticalSpacer className="tw-h-4" />

                <div
                    dangerouslySetInnerHTML={{__html: getVernacularString("successT1", userPreferences.language)}}
                    className="lg-text-banner"
                />

                <VerticalSpacer className="tw-h-8" />

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

                <VerticalSpacer className="tw-h-8" />

                <div
                    dangerouslySetInnerHTML={{__html: getVernacularString("successT3", userPreferences.language)}}
                    className="lg-text-body"
                />

                <VerticalSpacer className="tw-h-8" />

                {/* <div className="tw-self-center">
                    <FixedHeightImage
                        relativePath="/livguard/header/akshay.png"
                        height="13.75rem"
                    />
                </div> */}
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
        <FaqSectionInternal
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
