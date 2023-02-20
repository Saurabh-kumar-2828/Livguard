import {GoogleMap, LoadScript, Marker} from "@react-google-maps/api";
import {ActionFunction, LoaderFunction} from "@remix-run/node";
import {Form, useActionData} from "@remix-run/react";
import {useEffect, useState} from "react";
import {Droplet} from "react-bootstrap-icons";
import {useLoaderData} from "react-router";
import {getDealerForCity} from "~/backend/dealer.server";
import {FooterSocialLogosAndCopywrite} from "~/components/footerComponent";
import {HeaderComponent} from "~/components/headerComponent";
import {StickyLandingPageBottomBar} from "~/components/landingPageBottomBar";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {getNonEmptyStringFromUnknown} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {getUserPreferencesFromCookies} from "~/server/userPreferencesCookieHelper.server";
import {Dealer, UserPreferences} from "~/typeDefinitions";
import {getRedirectToUrlFromRequest} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";

type ActionData = {
    dealerList : Array<Dealer>;
};

export const action: ActionFunction = async ({request,params}) => {
    const body = await request.formData();

    const city = getNonEmptyStringFromUnknown(body.get("dealerLocation")) as string;
    const dealerList = await getDealerForCity(city);

    console.log("Hello ===>",city);

    console.log("delaer list ====>",dealerList);

    const actionData : ActionData = {
        dealerList: dealerList,
    }

    return actionData;
}

type LoaderData = {
    userPreferences: UserPreferences;
    redirectTo: string;
};

export const loader: LoaderFunction = async ({request,params}) => {
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
    const initialDealerList : Array<Dealer> = [];

    const actionData = useActionData() as ActionData;

    return (
        <>
            <HeaderComponent
                userPreferences={userPreferences}
                redirectTo={redirectTo}
                showMobileMenuIcon={false}
            />
            <DealerLocatorPage userPreferences={userPreferences} actionData={actionData}/>
            <FooterSocialLogosAndCopywrite userPreferences={userPreferences} />
            <StickyLandingPageBottomBar userPreferences={userPreferences} />
        </>
    );
}

function DealerLocatorPage({userPreferences, actionData}: {userPreferences: UserPreferences; actionData: ActionData}) {
    const [showDealers, setShowDealers] = useState(false);
    const [dealerList, setDealerList] = useState<Array<Dealer>>([]);

    useEffect(() => {
        if(actionData != null){
            setDealerList(actionData.dealerList);
        }
    },[actionData])


    if(actionData != null){
        console.log("new dealer list", actionData.dealerList);
    }


    const containerStyle = {
        width: "100%",
        height: "600px",
        class:"tw-rounded-lg"
    };

    const center = {
        lat: -3.745,
        lng: -38.523,
    };

    return (
        <div className="lg-px-screen-edge tw-flex tw-flex-col">
            <LoadScript googleMapsApiKey="AIzaSyCek99jdIoNgCDfHdIblTJdEo5dOa4gRLY">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                >
                    {/* Child components, such as markers, info windows, etc. */}
                {dealerList.length > 0 &&
                    <ItemBuilder
                        items={actionData.dealerList}
                        itemBuilder={(dealer,dealerIndex) => (
                            <Marker
                                icon={<Droplet className="tw-h-8 tw-w-8" />}
                                position={{lat:dealer.latitude,lng:dealer.longitude}}
                            />
                        )}
                    />
                }

                </GoogleMap>
            </LoadScript>

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

                <VerticalSpacer className="tw-h-4" />

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
                                        className="tw-bg-gradient-to-r tw-from-[#F25F60] tw-to-[#EB2A2B] tw-rounded-lg tw-p-2 tw-px-4"
                                    >
                                        Enquire Now
                                    </button>
                                    <button
                                        type="button"
                                        className="tw-border tw-border-secondary-700 tw-p-2 tw-px-4 tw-rounded-lg"
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


