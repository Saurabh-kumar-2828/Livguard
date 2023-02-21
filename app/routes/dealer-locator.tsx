import {Dialog, Transition} from "@headlessui/react";
import {GoogleMap, LoadScript, Marker, MarkerF} from "@react-google-maps/api";
import {Dialog, Transition} from "@headlessui/react";
import {GoogleMap, LoadScript, Marker, MarkerF} from "@react-google-maps/api";
import {ActionFunction, LoaderFunction} from "@remix-run/node";
import {Form, useActionData} from "@remix-run/react";
import React from "react";
import React from "react";
import {useEffect, useState} from "react";
import {Droplet, Facebook, Instagram, Linkedin, Twitter, X, Youtube} from "react-bootstrap-icons";
import {Droplet, Facebook, Instagram, Linkedin, Twitter, X, Youtube} from "react-bootstrap-icons";
import {useLoaderData} from "react-router";
import {getDealerForCity} from "~/backend/dealer.server";
import {StickyBottomBar} from "~/components/bottomBar";
import {StickyBottomBar} from "~/components/bottomBar";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {FooterSocialLogosAndCopywrite} from "~/components/footerComponent";
import {HeaderComponent} from "~/components/headerComponent";
import {StickyLandingPageBottomBar} from "~/components/landingPageBottomBar";
import {PageScaffold} from "~/components/pageScaffold";
import {FancySearchableSelect} from "~/components/scratchpad";
import {FixedHeightImage} from "~/global-common-typescript/components/fixedHeightImage";
import {FixedWidthImage} from "~/global-common-typescript/components/fixedWidthImage";
import {FullWidthImage} from "~/global-common-typescript/components/fullWidthImage";
import {ImageCdnProvider} from "~/global-common-typescript/components/growthJockeyImage";
import {PageScaffold} from "~/components/pageScaffold";
import {FancySearchableSelect} from "~/components/scratchpad";
import {FixedHeightImage} from "~/global-common-typescript/components/fixedHeightImage";
import {FixedWidthImage} from "~/global-common-typescript/components/fixedWidthImage";
import {FullWidthImage} from "~/global-common-typescript/components/fullWidthImage";
import {ImageCdnProvider} from "~/global-common-typescript/components/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {getNonEmptyStringFromUnknown} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {phoneNumberValidationPattern} from "~/global-common-typescript/utilities/validationPatterns";
import {ContactUsCta, FaqSection, ShowerSomeLoveOnSocialHandles} from "~/routes";
import {phoneNumberValidationPattern} from "~/global-common-typescript/utilities/validationPatterns";
import {ContactUsCta, FaqSection, ShowerSomeLoveOnSocialHandles} from "~/routes";
import {getUserPreferencesFromCookies} from "~/server/userPreferencesCookieHelper.server";
import {Dealer, UserPreferences} from "~/typeDefinitions";
import {getRedirectToUrlFromRequest} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";
import cityList from "~/cities.json";
import cityList from "~/cities.json";

type DealerLocatorActionData = {
    dealerList: Array<Dealer>;
    path: string;
    error: string;
type DealerLocatorActionData = {
    dealerList: Array<Dealer>;
    path: string;
    error: string;
};

export const action: ActionFunction = async ({request, params}) => {
    const body = await request.formData();

    const city = getNonEmptyStringFromUnknown(body.get("dealerLocation")) as string;
    const dealerList = await getDealerForCity(city);

<<<<<<< HEAD
    const actionData: DealerLocatorActionData = {
=======
    console.log("Hello ===>", city);

    console.log("delaer list ====>", dealerList);

    const actionData: ActionData = {
>>>>>>> 0a2798be2df38df4394963db8b18f63c0f010caf
        dealerList: dealerList,
        error: dealerList == null ? "No Dealer Present For Selected Location" : "",
        path: "/dealer-locator",
    };

    return actionData;
};

type LoaderData = {
    userPreferences: UserPreferences;
    redirectTo: string;
};

export const loader: LoaderFunction = async ({request, params}) => {
    const userPreferences = await getUserPreferencesFromCookies(request);
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
    const initialDealerList: Array<Dealer> = [];

    const actionData = useActionData();
    let isDealerFormSubmissionSuccess = false;
    let isContactUsSubmissionSuccess = false;

    // if (actionData != null && actionData.path == "/applyForDealership" && actionData.error == "") {
    //     isDealerFormSubmissionSuccess = true;
    // }
    const initialDealerList: Array<Dealer> = [];

    const actionData = useActionData();
    let isDealerFormSubmissionSuccess = false;
    let isContactUsSubmissionSuccess = false;

    // if (actionData != null && actionData.path == "/applyForDealership" && actionData.error == "") {
    //     isDealerFormSubmissionSuccess = true;
    // }

    // if (actionData != null && actionData.path == "/contactusSubmission" && actionData.error == "") {
    //     isContactUsSubmissionSuccess = true;
    // }

    console.log("Action Data ====>", actionData);
    console.log("Action Data ====>", actionData);

    return (
        <>
            <PageScaffold
            <PageScaffold
                userPreferences={userPreferences}
                redirectTo={redirectTo}
                showMobileMenuIcon={true}
            >
                <DealerLocatorPage
                    userPreferences={userPreferences}
                    actionData={actionData}
                />

                <VerticalSpacer className="tw-h-10" />

                <TroubleFindingDealers
                    userPreferences={userPreferences}
                    isContactUsSubmissionSuccess={isContactUsSubmissionSuccess}
                />

                <VerticalSpacer className="tw-h-10" />

                <FaqSection userPreferences={userPreferences} />

                <VerticalSpacer className="tw-h-10" />

                <JoinLivguardNetwork
                    userPreferences={userPreferences}
                    isDealerFormSubmissionSuccess={isDealerFormSubmissionSuccess}
                />

                <VerticalSpacer className="tw-h-10" />

                <ShowerSomeLoveOnSocialHandles
                    userPreferences={userPreferences}
                    heading={{text1: "dealerLocatorSocialHT1", text2: "dealerLocatorSocialHT2"}}
                />

                <VerticalSpacer className="tw-h-10" />
            </PageScaffold>

            <StickyBottomBar userPreferences={userPreferences} />
                showMobileMenuIcon={true}
            >
                <DealerLocatorPage
                    userPreferences={userPreferences}
                    actionData={actionData}
                />

                <VerticalSpacer className="tw-h-10" />

                <TroubleFindingDealers
                    userPreferences={userPreferences}
                    isContactUsSubmissionSuccess={isContactUsSubmissionSuccess}
                />

                <VerticalSpacer className="tw-h-10" />

                <FaqSection userPreferences={userPreferences} />

                <VerticalSpacer className="tw-h-10" />

                <JoinLivguardNetwork
                    userPreferences={userPreferences}
                    isDealerFormSubmissionSuccess={isDealerFormSubmissionSuccess}
                />

                <VerticalSpacer className="tw-h-10" />

                <ShowerSomeLoveOnSocialHandles
                    userPreferences={userPreferences}
                    heading={{text1: "dealerLocatorSocialHT1", text2: "dealerLocatorSocialHT2"}}
                />

                <VerticalSpacer className="tw-h-10" />
            </PageScaffold>

            <StickyBottomBar userPreferences={userPreferences} />
        </>
    );
}

function DealerLocatorPage({userPreferences, actionData}: {userPreferences: UserPreferences; actionData: DealerLocatorActionData}) {
function DealerLocatorPage({userPreferences, actionData}: {userPreferences: UserPreferences; actionData: DealerLocatorActionData}) {
    const [showDealers, setShowDealers] = useState(false);
    const [dealerList, setDealerList] = useState<Array<Dealer>>([]);
    const [selectedCity, setSelectedCity] = useState("");

    useEffect(() => {
        console.log("inside useEffect");
        if (actionData != null) {
            console.log("true condition", actionData.dealerList);
        if (actionData != null) {
            console.log("true condition", actionData.dealerList);
            setDealerList(actionData.dealerList);
        }
    }, [actionData]);
    }, [actionData]);

    if (actionData != null) {
    if (actionData != null) {
        console.log("new dealer list", actionData.dealerList);
    }
<<<<<<< HEAD
    const datastore = {};
    const datastore = {};
=======

    // const people = [
    //     {id: 1, name: "Wade Cooper"},
    //     {id: 2, name: "Arlene Mccoy"},
    //     {id: 3, name: "Devon Webb"},
    //     {id: 4, name: "Tom Cook"},
    //     {id: 5, name: "Tanya Fox"},
    //     {id: 6, name: "Hellen Schmidt"},
    // ];


    const people = [
        "Wade Cooper",
        "Arlene Mccoy",
        "Devon Webb",
        "Tom Cook",
        "Tanya Fox",
        "Hellen Schmidt",
    ];

    const [selected, setSelected] = useState(people[0]);
    const [query, setQuery] = useState("");
>>>>>>> 0a2798be2df38df4394963db8b18f63c0f010caf

    return (
        <div className="lg-px-screen-edge tw-flex tw-flex-col">
            <GoogleMapView dealerList={dealerList} />

            <VerticalSpacer className="tw-h-4" />

            <Form
                className="tw-flex tw-flex-col tw-items-center tw-justify-center"
                method="post"
            >
                {/* <input
                {/* <input
                    type="text"
                    name="dealerLocation"
                    className="lg-text-input tw-w-full tw-text-center"
                    placeholder={`${getVernacularString("dealerLocatorInputText", userPreferences.language)}`}
                ></input> */}

                {/* <FancySearchableSelect
                    id="city"
                    options={cityList.map((city, cityIndex) => ({
                        value: cityIndex,
                        label: city.name,
                    }))}
                    className="lg-text-input tw-w-full tw-text-center"
                    placeholder={`${getVernacularString("dealerLocatorInputText", userPreferences.language)}`}
<<<<<<< HEAD
                    onChange={(newValue) => setSelectedCity(newValue.value)} datastore={datastore}
                    />
                ></input> */}

                <FancySearchableSelect
                    id="city"
                    options={cityList.map((city, cityIndex) => ({
                        value: cityIndex,
                        label: city.name,
                    }))}
                    className="lg-text-input tw-w-full tw-text-center"
                    placeholder={`${getVernacularString("dealerLocatorInputText", userPreferences.language)}`}
                    onChange={(newValue) => setSelectedCity(newValue.value)} datastore={datastore}
                    />

                <VerticalSpacer className="tw-h-4" />
                <input type="text" name="dealerLocation" className="tw-hidden" readOnly />
                <input type="text" name="dealerLocation" className="tw-hidden" readOnly />
=======
                    onChange={(newValue) => setSelectedCity(newValue.value)}
                    datastore={datastore}
                /> */}

                <FancySearchableSelect
                    options={people}
                    selected={selected}
                    setSelected={setSelected}
                    // primaryAttribute="name"
                    query={query}
                    setQuery={setQuery}
                />

                <VerticalSpacer className="tw-h-4" />
                <input
                    type="text"
                    name="dealerLocation"
                    className="tw-hidden"
                    readOnly
                />
>>>>>>> 0a2798be2df38df4394963db8b18f63c0f010caf

                <button
                    type="submit"
                    className="lg-cta-button"
                >
                    {`${getVernacularString("dealerLocatorButtonText", userPreferences.language)}`}
                </button>
            </Form>

            {actionData && actionData.dealerList && actionData.dealerList.length > 0 && (
                <div
                    className="tw-text-title2 tw-text-center"
                    onClick={() => setShowDealers(true)}
                >
                    {`${getVernacularString("dealerLocatorShowText", userPreferences.language)} (${actionData.dealerList.length})`}
                </div>
            )}

            <VerticalSpacer className="tw-h-4" />

            {showDealers && (
                <div className="tw-flex tw-flex-col tw-gap-4">
                    <ItemBuilder
                        items={actionData.dealerList}
                        itemBuilder={(dealer, dealerIndex) => (
                            <div
                                className="tw-flex tw-flex-col tw-text-left lg-bg-secondary-100 tw-rounded-lg tw-p-4"
                                key={dealerIndex}
                            >
                                <div className="lg-text-title1">{dealer.name}</div>

                                <VerticalSpacer className="tw-h-4" />

                                <div className="lg-text-body">Dealer Address:</div>

                                <div className="lg-text-body">{`${dealer.address}, ${dealer.city}, ${dealer.state}, ${dealer.pinCode}`}</div>

                                <VerticalSpacer className="tw-h-4" />

                                <div className="tw-flex tw-flex-row tw-justify-between tw-p-2 tw-px-4">
                                    <button
                                        type="button"
                                        className="tw-bg-gradient-to-r tw-from-[#F25F60] tw-to-[#EB2A2B] tw-rounded-3xl tw-p-2 tw-px-4"
                                        className="tw-bg-gradient-to-r tw-from-[#F25F60] tw-to-[#EB2A2B] tw-rounded-3xl tw-p-2 tw-px-4"
                                    >
                                        Enquire Now
                                    </button>
                                    <button
                                        type="button"
                                        className="tw-border tw-border-secondary-700 tw-p-2 tw-px-4 tw-rounded-3xl"
                                        className="tw-border tw-border-secondary-700 tw-p-2 tw-px-4 tw-rounded-3xl"
                                    >
                                        Get Direction
                                    </button>
                                </div>
                            </div>
                        )}
                    />
                </div>
            )}
        </div>
    );
}

function GoogleMapView({dealerList}: {dealerList: Array<Dealer>}) {
    const defaultCenter = {
        lat: 21.7679,
        lng: 78.8718,
    };

    const defaultZoom: number = 4;

    const [mapCenter, setMapCenter] = useState(defaultCenter);
    const [zoomLevel, setZoomLevel] = useState(defaultZoom);
function GoogleMapView({dealerList}: {dealerList: Array<Dealer>}) {
    const defaultCenter = {
        lat: 21.7679,
        lng: 78.8718,
    };

    const defaultZoom: number = 4;

    const [mapCenter, setMapCenter] = useState(defaultCenter);
    const [zoomLevel, setZoomLevel] = useState(defaultZoom);

    const containerStyle = {
        width: "100%",
        height: "600px",
        class: "tw-rounded-lg",
    };

    const onLoad = (marker) => {
        console.log("marker: ", marker);
    };

    useEffect(() => {
        if (dealerList.length > 0) {
            const latCenter = dealerList.slice(0, 5).reduce((accumulator, dealer) => accumulator + Number(dealer.latitude), Number(0)) / 5;
            const lngCenter = dealerList.slice(0, 5).reduce((accumulator, dealer) => accumulator + Number(dealer.longitude), Number(0)) / 5;
            console.log("lat ====>", latCenter);
            console.log("lng ====>", lngCenter);
            setMapCenter({lat: latCenter, lng: lngCenter});
            setZoomLevel(12);
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
                center={mapCenter}
                zoom={zoomLevel}
            >
                {dealerList.length > 0 &&
                    dealerList.slice(0, 5).map((dealer) => (
                        <MarkerF
                            onLoad={onLoad}
                            position={{lat: Number(dealer.latitude), lng: Number(dealer.longitude)}}
                        />
                    ))}
                {dealerList.length > 0 &&
                    dealerList.slice(0, 5).map((dealer) => (
                        <MarkerF
                            onLoad={onLoad}
                            position={{lat: Number(dealer.latitude), lng: Number(dealer.longitude)}}
                        />
                    ))}
            </GoogleMap>
        </LoadScript>
    );
}

function TroubleFindingDealers({userPreferences, isContactUsSubmissionSuccess}: {userPreferences: UserPreferences; isContactUsSubmissionSuccess: boolean}) {
function TroubleFindingDealers({userPreferences, isContactUsSubmissionSuccess}: {userPreferences: UserPreferences; isContactUsSubmissionSuccess: boolean}) {
    return (
        <div className="lg-px-screen-edge lg-bg-secondary-100 tw-flex tw-flex-col tw-justify-center tw-items-center">
            <VerticalSpacer className="tw-h-10" />

            <DefaultTextAnimation>
                <div className="lg-text-headline tw-text-center">{getVernacularString("dealerLocatorS2H", userPreferences.language)}</div>
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-3" />

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
                    isContactUsSubmissionSuccess={isContactUsSubmissionSuccess}
                />
            </DefaultElementAnimation>

            <VerticalSpacer className="tw-h-10" />
        </div>
    );
}

function JoinLivguardNetwork({userPreferences, isDealerFormSubmissionSuccess}: {userPreferences: UserPreferences; isDealerFormSubmissionSuccess: boolean}) {
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

            <VerticalSpacer className="tw-h-3" />

            <DefaultElementAnimation>
                <ContactUsCta
                    userPreferences={userPreferences}
                    textVernacId="dealerLocatorS2BT"
                    className="tw-z-10"
                    isContactUsSubmissionSuccess={isContactUsSubmissionSuccess}
                />
            </DefaultElementAnimation>

            <VerticalSpacer className="tw-h-10" />
        </div>
    );
}

function JoinLivguardNetwork({userPreferences, isDealerFormSubmissionSuccess}: {userPreferences: UserPreferences; isDealerFormSubmissionSuccess: boolean}) {
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
                    isDealerFormSubmissionSuccess={isDealerFormSubmissionSuccess}
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
    isDealerFormSubmissionSuccess,
}: {
    userPreferences: UserPreferences;
    textVernacId: string;
    className?: string;
    isDealerFormSubmissionSuccess: boolean;
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
                isDealerFormSubmissionSuccess={isDealerFormSubmissionSuccess}
            />
        </div>
    );
}

export function ApplyNowForDealerDialog({
    userPreferences,
    isApplyNowDialogOpen,
    setApplyNowDialogOpen,
    isDealerFormSubmissionSuccess,
}: {
    userPreferences: UserPreferences;
    isApplyNowDialogOpen: boolean;
    setApplyNowDialogOpen: React.Dispatch<boolean>;
    isDealerFormSubmissionSuccess: boolean;
}) {
    function tryToCloseApplyNowDialog() {
        setApplyNowDialogOpen(false);
    }

    return (
        <Transition
            show={isApplyNowDialogOpen}
            as={React.Fragment}
        >
            <Dialog
                as="div"
                className="tw-relative tw-z-50"
                onClose={tryToCloseApplyNowDialog}
            >
                <Transition.Child
                    as={React.Fragment}
                    enter="tw-ease-out tw-transition-all tw-duration-200"
                    enterFrom="tw-opacity-0"
                    enterTo="tw-opacity-100"
                    leave="tw-ease-in tw-transition-all tw-duration-200"
                    leaveFrom="tw-opacity-100"
                    leaveTo="tw-opacity-0"
                <ApplyNowForDealerCta
                    userPreferences={userPreferences}
                    textVernacId="dealerLocatorS4BT"
                    className="tw-z-10"
                    isDealerFormSubmissionSuccess={isDealerFormSubmissionSuccess}
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
    isDealerFormSubmissionSuccess,
}: {
    userPreferences: UserPreferences;
    textVernacId: string;
    className?: string;
    isDealerFormSubmissionSuccess: boolean;
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
                isDealerFormSubmissionSuccess={isDealerFormSubmissionSuccess}
            />
        </div>
    );
}

export function ApplyNowForDealerDialog({
    userPreferences,
    isApplyNowDialogOpen,
    setApplyNowDialogOpen,
    isDealerFormSubmissionSuccess,
}: {
    userPreferences: UserPreferences;
    isApplyNowDialogOpen: boolean;
    setApplyNowDialogOpen: React.Dispatch<boolean>;
    isDealerFormSubmissionSuccess: boolean;
}) {
    function tryToCloseApplyNowDialog() {
        setApplyNowDialogOpen(false);
    }

    return (
        <Transition
            show={isApplyNowDialogOpen}
            as={React.Fragment}
        >
            <Dialog
                as="div"
                className="tw-relative tw-z-50"
                onClose={tryToCloseApplyNowDialog}
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

                <Dialog.Panel className="lg-px-screen-edge tw-fixed tw-inset-0 tw-grid tw-grid-rows-1 tw-grid-cols-1 tw-justify-center tw-items-center">
                    <Transition.Child
                        as={React.Fragment}
                        enter="tw-ease-out tw-transition-all tw-duration-200"
                        enterFrom="tw-opacity-0"
                        enterTo="tw-opacity-full"
                        leave="tw-ease-in tw-transition-all tw-duration-200"
                        leaveFrom="tw-opacity-full"
                        leaveTo="tw-opacity-0"
                    >
                        {isDealerFormSubmissionSuccess ? (
                            <FormSubmissionSuccess userPreferences={userPreferences} />
                        ) : (
                            <Form
                                className="tw-w-full tw-bg-gradient-to-b tw-from-secondary-500-light tw-to-secondary-100-light dark:tw-from-secondary-500-dark dark:tw-to-secondary-100-dark lg-bg-secondary-100 tw-px-6 tw-py-6 tw-rounded-lg tw-flex tw-flex-col"
                                method="post"
                                action="/apply-for-dealership"
                            >
                                <div className="tw-grid tw-grid-cols-[2rem_minmax(0,1fr)_2rem] tw-items-center">
                                    <div className="tw-row-start-1 tw-col-start-2 tw-flex-1 tw-text-center lg-text-headline">
                                        {getVernacularString("applyNowForDealerT1", userPreferences.language)}
                                    </div>
                                    <X
                                        className="tw-row-start-1 tw-col-start-3 tw-w-8 tw-h-8"
                                        onClick={tryToCloseApplyNowDialog}
                                    />
                                </div>

                                <VerticalSpacer className="tw-h-4" />

                                <div className="lg-text-title2 tw-pl-3">{getVernacularString("applyNowForDealerT2", userPreferences.language)}</div>

                                <VerticalSpacer className="tw-h-2" />

                                <input
                                    type="text"
                                    className="lg-text-input"
                                    name="phoneNumber"
                                    pattern={phoneNumberValidationPattern}
                                    required
                                    placeholder={getVernacularString("applyNowForDealerPH2", userPreferences.language)}
                                />

                                <VerticalSpacer className="tw-h-4" />

                                <div className="lg-text-title2 tw-pl-3">{getVernacularString("applyNowForDealerT3", userPreferences.language)}</div>

                                <VerticalSpacer className="tw-h-2" />

                                <input
                                    type="text"
                                    className="lg-text-input"
                                    name="name"
                                    required
                                    placeholder={getVernacularString("applyNowForDealerPH3", userPreferences.language)}
                                />

                                <VerticalSpacer className="tw-h-4" />

                                <div className="lg-text-title2 tw-pl-3">{`${getVernacularString("applyNowForDealerT4", userPreferences.language)}*`}</div>

                                <VerticalSpacer className="tw-h-2" />

                                <input
                                    type="text"
                                    className="lg-text-input"
                                    name="city"
                                    required
                                    placeholder={getVernacularString("applyNowForDealerPH4", userPreferences.language)}
                                />

                                <VerticalSpacer className="tw-h-8" />

                                <div className="tw-self-center">
                                    <FixedHeightImage
                                        relativePath="/livguard/header/akshay.png"
                                        height="13.75rem"
                                        imageCdnProvider={ImageCdnProvider.GrowthJockey}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="lg-cta-button tw-px-4 tw-self-center tw-w-60"
                                >
                                    {getVernacularString("applyNowForDealerT5", userPreferences.language)}
                                </button>
                            </Form>
                        )}
                    </Transition.Child>
                </Dialog.Panel>
            </Dialog>
        </Transition>
    );
}

export function FormSubmissionSuccess({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="tw-w-full tw-bg-gradient-to-b tw-from-secondary-500-light tw-to-secondary-100-light dark:tw-from-secondary-500-dark dark:tw-to-secondary-100-dark lg-bg-secondary-100 tw-px-6 tw-py-6 tw-rounded-lg tw-flex tw-flex-col tw-text-center tw-justify-center tw-items-center">
            <FixedWidthImage
                relativePath="/livguard/icons/confirmation.png"
                imageCdnProvider={ImageCdnProvider.GrowthJockey}
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
                className="lg-text-banner"
            />

            <VerticalSpacer className="tw-h-8" />

            <div className="tw-flex tw-justify-evenly">
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
                className="lg-text-banner"
            />

            <VerticalSpacer className="tw-h-8" />

            <div className="tw-self-center">
                <FixedHeightImage
                    relativePath="/livguard/header/akshay.png"
                    height="13.75rem"
                    imageCdnProvider={ImageCdnProvider.GrowthJockey}
                />
            </div>
                    <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-[55%] tw-backdrop-blur" />
                </Transition.Child>

                <Dialog.Panel className="lg-px-screen-edge tw-fixed tw-inset-0 tw-grid tw-grid-rows-1 tw-grid-cols-1 tw-justify-center tw-items-center">
                    <Transition.Child
                        as={React.Fragment}
                        enter="tw-ease-out tw-transition-all tw-duration-200"
                        enterFrom="tw-opacity-0"
                        enterTo="tw-opacity-full"
                        leave="tw-ease-in tw-transition-all tw-duration-200"
                        leaveFrom="tw-opacity-full"
                        leaveTo="tw-opacity-0"
                    >
                        {isDealerFormSubmissionSuccess ? (
                            <FormSubmissionSuccess userPreferences={userPreferences} />
                        ) : (
                            <Form
                                className="tw-w-full tw-bg-gradient-to-b tw-from-secondary-500-light tw-to-secondary-100-light dark:tw-from-secondary-500-dark dark:tw-to-secondary-100-dark lg-bg-secondary-100 tw-px-6 tw-py-6 tw-rounded-lg tw-flex tw-flex-col"
                                method="post"
                                action="/apply-for-dealership"
                            >
                                <div className="tw-grid tw-grid-cols-[2rem_minmax(0,1fr)_2rem] tw-items-center">
                                    <div className="tw-row-start-1 tw-col-start-2 tw-flex-1 tw-text-center lg-text-headline">
                                        {getVernacularString("applyNowForDealerT1", userPreferences.language)}
                                    </div>
                                    <X
                                        className="tw-row-start-1 tw-col-start-3 tw-w-8 tw-h-8"
                                        onClick={tryToCloseApplyNowDialog}
                                    />
                                </div>

                                <VerticalSpacer className="tw-h-4" />

                                <div className="lg-text-title2 tw-pl-3">{getVernacularString("applyNowForDealerT2", userPreferences.language)}</div>

                                <VerticalSpacer className="tw-h-2" />

                                <input
                                    type="text"
                                    className="lg-text-input"
                                    name="phoneNumber"
                                    pattern={phoneNumberValidationPattern}
                                    required
                                    placeholder={getVernacularString("applyNowForDealerPH2", userPreferences.language)}
                                />

                                <VerticalSpacer className="tw-h-4" />

                                <div className="lg-text-title2 tw-pl-3">{getVernacularString("applyNowForDealerT3", userPreferences.language)}</div>

                                <VerticalSpacer className="tw-h-2" />

                                <input
                                    type="text"
                                    className="lg-text-input"
                                    name="name"
                                    required
                                    placeholder={getVernacularString("applyNowForDealerPH3", userPreferences.language)}
                                />

                                <VerticalSpacer className="tw-h-4" />

                                <div className="lg-text-title2 tw-pl-3">{`${getVernacularString("applyNowForDealerT4", userPreferences.language)}*`}</div>

                                <VerticalSpacer className="tw-h-2" />

                                <input
                                    type="text"
                                    className="lg-text-input"
                                    name="city"
                                    required
                                    placeholder={getVernacularString("applyNowForDealerPH4", userPreferences.language)}
                                />

                                <VerticalSpacer className="tw-h-8" />

                                <div className="tw-self-center">
                                    <FixedHeightImage
                                        relativePath="/livguard/header/akshay.png"
                                        height="13.75rem"
                                        imageCdnProvider={ImageCdnProvider.GrowthJockey}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="lg-cta-button tw-px-4 tw-self-center tw-w-60"
                                >
                                    {getVernacularString("applyNowForDealerT5", userPreferences.language)}
                                </button>
                            </Form>
                        )}
                    </Transition.Child>
                </Dialog.Panel>
            </Dialog>
        </Transition>
    );
}

export function FormSubmissionSuccess({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="tw-w-full tw-bg-gradient-to-b tw-from-secondary-500-light tw-to-secondary-100-light dark:tw-from-secondary-500-dark dark:tw-to-secondary-100-dark lg-bg-secondary-100 tw-px-6 tw-py-6 tw-rounded-lg tw-flex tw-flex-col tw-text-center tw-justify-center tw-items-center">
            <FixedWidthImage
                relativePath="/livguard/icons/confirmation.png"
                imageCdnProvider={ImageCdnProvider.GrowthJockey}
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
                className="lg-text-banner"
            />

            <VerticalSpacer className="tw-h-8" />

            <div className="tw-flex tw-justify-evenly">
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
                className="lg-text-banner"
            />

            <VerticalSpacer className="tw-h-8" />

            <div className="tw-self-center">
                <FixedHeightImage
                    relativePath="/livguard/header/akshay.png"
                    height="13.75rem"
                    imageCdnProvider={ImageCdnProvider.GrowthJockey}
                />
            </div>
        </div>
    );
}
}
