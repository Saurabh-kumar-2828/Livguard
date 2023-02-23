import {Dialog, Transition} from "@headlessui/react";
import {Autocomplete, GoogleMap, LoadScript, Marker, MarkerF} from "@react-google-maps/api";
import {ActionFunction, LoaderFunction} from "@remix-run/node";
import {Form, useActionData, useFetcher} from "@remix-run/react";
import React from "react";
import {useEffect, useState} from "react";
import {Droplet, Facebook, Instagram, Linkedin, Twitter, X, Youtube} from "react-bootstrap-icons";
import {useLoaderData} from "react-router";
import {getDealerForCity} from "~/backend/dealer.server";
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
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {getNonEmptyStringFromUnknown} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {emailIdValidationPattern, phoneNumberValidationPattern} from "~/global-common-typescript/utilities/validationPatterns";
import {ContactUsCta, FaqSection, ShowerSomeLoveOnSocialHandles} from "~/routes";
import {getUserPreferencesFromCookies} from "~/server/userPreferencesCookieHelper.server";
import {Dealer, Language, salutations, UserPreferences} from "~/typeDefinitions";
import {getRedirectToUrlFromRequest} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";
import cityList from "~/cities.json";

// TODO: Rework for fetcher
type DealerLocatorActionData = {
    dealerList: Array<Dealer>;
    path: string;
    error: string;
};

export const action: ActionFunction = async ({request, params}) => {
    const body = await request.formData();

    const city = getNonEmptyStringFromUnknown(body.get("dealerLocation")) as string;
    const dealerList = await getDealerForCity(city);

    const actionData: DealerLocatorActionData = {
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

    return (
        <>
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
                />

                <VerticalSpacer className="tw-h-10" />

                <FaqSection userPreferences={userPreferences} />

                <VerticalSpacer className="tw-h-10" />

                <JoinLivguardNetwork
                    userPreferences={userPreferences}
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

export function DealerLocatorPage({userPreferences, actionData}: {userPreferences: UserPreferences; actionData: DealerLocatorActionData}) {
    const [showDealers, setShowDealers] = useState(false);
    const [dealerList, setDealerList] = useState<Array<Dealer>>([]);
    // const [selectedCity, setSelectedCity] = useState("");
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        if (actionData != null) {
            if (!showMore) {
                setDealerList(actionData.dealerList.slice(0, 5));
            } else {
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
        <div className="lg-px-screen-edge tw-flex tw-flex-col">
            <VerticalSpacer className="tw-h-2" />

            <GoogleMapView dealerList={dealerList} />

            <VerticalSpacer className="tw-h-4" />

            <Form
                className="tw-flex tw-flex-col tw-items-center tw-justify-center"
                method="post"
            >
                <input
                    type="text"
                    name="dealerLocation"
                    className="lg-text-input tw-w-full tw-text-center"
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
                >
                    {`${getVernacularString("dealerLocatorButtonText", userPreferences.language)}`}
                </button>
            </Form>

            <VerticalSpacer className="tw-h-2" />

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
                    <div className="tw-flex tw-flex-col tw-gap-1">
                        <div className="lg-text-banner tw-text-center">{salutations[dealerList[0].stateCode][userPreferences.language]}</div>
                        <div className="lg-text-headline lg-text-highlighted tw-text-center tw-py-1">{getVernacularString("dealerLocatorHighlightedText", userPreferences.language)}</div>
                        <div className="lg-text-title2 tw-text-center">{dealerList[0].city}</div>
                    </div>

                    <VerticalSpacer className="tw-h-1" />

                    <ItemBuilder
                        items={dealerList}
                        itemBuilder={(dealer, dealerIndex) => (
                            <React.Fragment key={dealerIndex}>
                                <DefaultElementAnimation>
                                    <div
                                        className="tw-flex tw-flex-col tw-text-left lg-bg-secondary-100 tw-rounded-lg tw-p-4"
                                        key={dealerIndex}
                                    >
                                        <div className="lg-text-title1">{dealer.name}</div>

                                        <VerticalSpacer className="tw-h-4" />

                                        <div className="lg-text-body">Dealer Address:</div>

                                        <div className="lg-text-body">{`${dealer.address}, ${dealer.city}, ${dealer.state}, ${dealer.pinCode}`}</div>

                                        <VerticalSpacer className="tw-h-4" />

                                        <div className="tw-flex tw-flex-row tw-justify-center tw-p-2 tw-px-4">
                                            {/* <button
                                                type="button"
                                                className="tw-bg-gradient-to-r tw-from-[#F25F60] tw-to-[#EB2A2B] tw-rounded-3xl tw-p-2 tw-px-4"
                                            >
                                                Enquire Now
                                            </button> */}
                                            <ContactUsCta
                                                userPreferences={userPreferences}
                                                textVernacId="landingPageBottomBarT2"
                                                className="tw-z-10"
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

                    <VerticalSpacer className="tw-h-4" />

                    {!showMore && actionData.dealerList.length > 5 && (
                        <div
                            className="lg-text-headline lg-text-secondary-300 tw-text-center tw-underline hover:tw-cursor-pointer"
                            onClick={() => setShowMore(true)}
                        >
                            Find More
                        </div>
                    )}
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

    const containerStyle = {
        width: "100%",
        height: "400px",
        borderRadius: "8px",
        class: "tw-rounded-lg",
    };

    const onLoad = (marker) => {
        console.log("marker: ", marker);
    };

    useEffect(() => {
        if (dealerList.length > 0) {
            const latCenter = dealerList.slice(0, 5).reduce((accumulator, dealer) => accumulator + Number(dealer.latitude), Number(0)) / 5;
            const lngCenter = dealerList.slice(0, 5).reduce((accumulator, dealer) => accumulator + Number(dealer.longitude), Number(0)) / 5;
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
            >
                {dealerList.length > 0 &&
                    dealerList.slice(0, 5).map((dealer) => (
                        <MarkerF
                            onLoad={onLoad}
                            position={{lat: Number(dealer.latitude), lng: Number(dealer.longitude)}}
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

function TroubleFindingDealers({userPreferences}: {userPreferences: UserPreferences;}) {
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
                />
            </DefaultElementAnimation>

            <VerticalSpacer className="tw-h-10" />
        </div>
    );
}

function JoinLivguardNetwork({userPreferences}: {userPreferences: UserPreferences;}) {
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
}: {
    userPreferences: UserPreferences;
    textVernacId: string;
    className?: string;
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
            />
        </div>
    );
}

export function ApplyNowForDealerDialog({
    userPreferences,
    isApplyNowDialogOpen,
    setApplyNowDialogOpen,
}: {
    userPreferences: UserPreferences;
    isApplyNowDialogOpen: boolean;
    setApplyNowDialogOpen: React.Dispatch<boolean>;
}) {

    const fetcher = useFetcher();

    const isDealerFormSubmissionSuccess = fetcher.data != null && fetcher.data.error == null;

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
                            <FormSubmissionSuccess userPreferences={userPreferences} tryToCloseDialog={tryToCloseApplyNowDialog}/>
                        ) : (
                            <fetcher.Form
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
                                    name="emailId"
                                    pattern={emailIdValidationPattern}
                                    required
                                    placeholder={getVernacularString("applyNowForDealerPH4", userPreferences.language)}
                                />

                                <VerticalSpacer className="tw-h-4" />

                                <div className="lg-text-title2 tw-pl-3">{`${getVernacularString("applyNowForDealerT5", userPreferences.language)}*`}</div>

                                <VerticalSpacer className="tw-h-2" />

                                <input
                                    type="text"
                                    className="lg-text-input"
                                    name="city"
                                    required
                                    placeholder={getVernacularString("applyNowForDealerPH5", userPreferences.language)}
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
                                    {getVernacularString("applyNowForDealerT6", userPreferences.language)}
                                </button>
                            </fetcher.Form>
                        )}
                    </Transition.Child>
                </Dialog.Panel>
            </Dialog>
        </Transition>
    );
}

export function FormSubmissionSuccess({userPreferences, tryToCloseDialog}: {userPreferences: UserPreferences, tryToCloseDialog: () => void}) {
    return (
        <div className="tw-w-full tw-bg-gradient-to-b tw-from-secondary-500-light tw-to-secondary-100-light dark:tw-from-secondary-500-dark dark:tw-to-secondary-100-dark lg-bg-secondary-100 tw-px-6 tw-pt-6 tw-rounded-lg tw-flex tw-flex-col tw-text-center tw-justify-center tw-items-center tw-relative">
            <button type="button" className="tw-absolute tw-top-6 tw-right-6" onClick={tryToCloseDialog}>
                <X className="tw-w-8 tw-h-8" />
            </button>

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
                    imageCdnProvider={ImageCdnProvider.GrowthJockey}
                />
            </div>
        </div>
    );
}
