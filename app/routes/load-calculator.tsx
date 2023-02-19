import {Dialog, Transition} from "@headlessui/react";
import {LoaderFunction} from "@remix-run/node";
import {Link, useSearchParams} from "@remix-run/react";
import React from "react";
import {useReducer, useState} from "react";
import {PlusCircleFill} from "react-bootstrap-icons";
import {useLoaderData} from "react-router";
import {StickyBottomBar} from "~/components/bottomBar";
import {DefaultImageAnimation} from "~/components/defaultImageAnimation";
import {PageScaffold} from "~/components/pageScaffold";
import {FixedWidthImage} from "~/global-common-typescript/components/fixedWidthImage";
import {FullWidthImage} from "~/global-common-typescript/components/fullWidthImage";
import {ImageCdnProvider} from "~/global-common-typescript/components/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces, getSingletonValueOrNull} from "~/global-common-typescript/utilities/utilities";
import {getUserPreferencesFromCookies} from "~/server/userPreferencesCookieHelper.server";
import {UserPreferences} from "~/typeDefinitions";
import {getRedirectToUrlFromRequest} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";

type LoaderData = {
    userPreferences: UserPreferences;
    redirectTo: string;
};

export const loader: LoaderFunction = async ({request}) => {
    const userPreferences = await getUserPreferencesFromCookies(request);
    if (userPreferences instanceof Error) {
        throw userPreferences;
    }

    const loaderData: LoaderData = {
        userPreferences: userPreferences,
        redirectTo: getRedirectToUrlFromRequest(request),
    };

    // TODO: Load property_type as well

    return loaderData;
};

export default function () {
    const {userPreferences, redirectTo} = useLoaderData() as LoaderData;

    // TODO: Scroll to top if required

    return (
        <>
            <PageScaffold
                userPreferences={userPreferences}
                redirectTo={redirectTo}
            >
                <LoadCalculator userPreferences={userPreferences} />
            </PageScaffold>

            <StickyBottomBar userPreferences={userPreferences} />
        </>
    );
}

function LoadCalculator({userPreferences}: {userPreferences: UserPreferences}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const propertyType = getSingletonValueOrNull(searchParams.getAll("property_type"));

    const [loadCalculatorInputs, dispatch] = useReducer(
        loadCalculatorInputsReducer,
        {propertyType: propertyType == null ? PropertyType.ThreeBhk : enumFromStringValue(PropertyType, propertyType) ?? PropertyType.ThreeBhk},
        createInitialState,
    );

    return (
        <>
            <VerticalSpacer className="tw-h-8" />

            <PowerPlannerIntroduction userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-8" />

            <PropertySelection
                userPreferences={userPreferences}
                loadCalculatorInputs={loadCalculatorInputs}
                dispatch={dispatch}
            />

            <VerticalSpacer className="tw-h-8" />

            <RoomSelection
                userPreferences={userPreferences}
                loadCalculatorInputs={loadCalculatorInputs}
                dispatch={dispatch}
            />

            <VerticalSpacer className="tw-h-8" />

            <DeviceSelection
                userPreferences={userPreferences}
                loadCalculatorInputs={loadCalculatorInputs}
                dispatch={dispatch}
            />
        </>
    );
}

// TODO: Rename to something sensible
export function PowerPlannerTeaser({userPreferences}: {userPreferences: UserPreferences}) {
    const [loadCalculatorInputs, dispatch] = useReducer(loadCalculatorInputsReducer, {propertyType: PropertyType.ThreeBhk}, createInitialState);

    return (
        <div>
            <PowerPlannerIntroduction userPreferences={userPreferences} />

            <PropertySelection
                userPreferences={userPreferences}
                loadCalculatorInputs={loadCalculatorInputs}
                dispatch={dispatch}
            />

            <VerticalSpacer className="tw-h-4" />

            <div className="lg-px-screen-edge tw-flex tw-flex-col tw-items-center">
                {/* TODO: Handle things like UTM here */}
                <Link
                    to={`/load-calculator?property_type=${loadCalculatorInputs.property.propertyType}`}
                    className=" lg-cta-button"
                >
                    {getVernacularString("homeS5T6", userPreferences.language)}
                </Link>
            </div>
        </div>
    );
}

function PowerPlannerIntroduction({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="lg-px-screen-edge tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center">
            <div className="tw-flex tw-flex-col lg-text-headline tw-text-center">
                <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS5H1T1", userPreferences.language)}} />
                <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS5H1T2", userPreferences.language)}} />
            </div>

            <VerticalSpacer className="tw-h-4" />

            <div>{getVernacularString("homeS5T2", userPreferences.language)}</div>

            <VerticalSpacer className="tw-h-4" />

            <DefaultImageAnimation>
                <FixedWidthImage
                    relativePath="/livguard/home/5/1.png"
                    width="10rem"
                    imageCdnProvider={ImageCdnProvider.GrowthJockey}
                />
            </DefaultImageAnimation>

            <VerticalSpacer className="tw-h-4" />

            <div className="lg-text-title2">{getVernacularString("homeS5T3", userPreferences.language)}</div>

            <VerticalSpacer className="tw-h-4" />

            <div className="tw-flex tw-flex-col tw-gap-4">
                <ItemBuilder
                    items={[
                        {
                            icon: "/livguard/home/5/step-1.png",
                            stepIndex: getVernacularString("homeS5Step1T1", userPreferences.language),
                            stepContent: getVernacularString("homeS5Step1T2", userPreferences.language),
                        },
                        {
                            icon: "/livguard/home/5/step-2.png",
                            stepIndex: getVernacularString("homeS5Step2T1", userPreferences.language),
                            stepContent: getVernacularString("homeS5Step2T2", userPreferences.language),
                        },
                        {
                            icon: "/livguard/home/5/step-3.png",
                            stepIndex: getVernacularString("homeS5Step3T1", userPreferences.language),
                            stepContent: getVernacularString("homeS5Step3T2", userPreferences.language),
                        },
                    ]}
                    itemBuilder={(item, itemIndex) => (
                        <div
                            className="lg-bg-secondary-100 tw-rounded-lg tw-px-4 tw-py-2 tw-grid tw-grid-cols-[auto,minmax(0,1fr)] tw-grid-rows-[auto,auto] tw-gap-x-4"
                            key={itemIndex}
                        >
                            <div className="tw-row-start-1 tw-col-start-1 tw-row-span-2">
                                <div className="lg-bg-primary-500 tw-h-12 tw-w-12 tw-rounded-full tw-p-2">
                                    <FullWidthImage
                                        relativePath={item.icon}
                                        imageCdnProvider={ImageCdnProvider.GrowthJockey}
                                    />
                                </div>
                            </div>

                            <div className="tw-row-start-1 tw-col-start-2">
                                <div className="lg-text-body-bold tw-text-left">{item.stepIndex}</div>
                            </div>

                            <div className="tw-row-start-2 tw-col-start-2">
                                <div className="lg-text-body tw-text-left">{item.stepContent}</div>
                            </div>
                        </div>
                    )}
                />
            </div>
        </div>
    );
}

function PropertySelection({
    userPreferences,
    loadCalculatorInputs,
    dispatch,
}: {
    userPreferences: UserPreferences;
    loadCalculatorInputs: LoadCalculatorInputs;
    dispatch: React.Dispatch<LoadCalculatorInputsAction>;
}) {
    return (
        <div className="lg-px-screen-edge tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center">
            <VerticalSpacer className="tw-h-4" />

            <div className="lg-text-title2 tw-text-center">{getVernacularString("homeS5T5P1", userPreferences.language)}</div>
            <div className="lg-text-body tw-text-center lg-text-secondary-900">{getVernacularString("homeS5T5P2", userPreferences.language)}</div>

            <VerticalSpacer className="tw-h-4" />

            <div className="tw-w-full tw-grid tw-grid-cols-3 tw-gap-2">
                <ItemBuilder
                    items={[
                        {
                            icon: "/livguard/home/5/1-bhk.png",
                            content: "1 BHK",
                            value: "1-bhk",
                        },
                        {
                            icon: "/livguard/home/5/2-bhk.png",
                            content: "2 BHK",
                            value: "2-bhk",
                        },
                        {
                            icon: "/livguard/home/5/3-bhk.png",
                            content: "3 BHK",
                            value: "3-bhk",
                        },
                        {
                            icon: "/livguard/home/5/4-bhk.png",
                            content: "4 BHK",
                            value: "4-bhk",
                        },
                        {
                            icon: "/livguard/home/5/villa.png",
                            content: "Villa",
                            value: "villa",
                        },
                        {
                            icon: "/livguard/home/5/custom.png",
                            content: "Custom",
                            value: "custom",
                        },
                    ]}
                    itemBuilder={(item, itemIndex) => (
                        <button
                            type="button"
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-rounded-lg tw-flex tw-items-center tw-gap-2 tw-py-3 tw-px-2 tw-group tw-duration-200",
                                item.value == loadCalculatorInputs.property.propertyType ? "lg-bg-primary-500" : "lg-bg-secondary-100",
                            )}
                            key={itemIndex}
                            onClick={() => {
                                const loadCalculatorInputsAction: LoadCalculatorInputsAction = {
                                    actionType: LoadCalculatorInputsActionType.SetPropertyType,
                                    payload: item.value,
                                };

                                dispatch(loadCalculatorInputsAction);
                            }}
                        >
                            <div
                                className={concatenateNonNullStringsWithSpaces(
                                    "tw-rounded-full tw-w-8 tw-h-8 tw-p-1.5",
                                    item.value == loadCalculatorInputs.property.propertyType ? "lg-bg-secondary-900" : "lg-bg-secondary-700",
                                )}
                            >
                                <FullWidthImage
                                    relativePath={item.icon}
                                    imageCdnProvider={ImageCdnProvider.GrowthJockey}
                                />
                            </div>
                            <div>{item.content}</div>
                        </button>
                    )}
                />
            </div>
        </div>
    );
}

function RoomSelection({
    userPreferences,
    loadCalculatorInputs,
    dispatch,
}: {
    userPreferences: UserPreferences;
    loadCalculatorInputs: LoadCalculatorInputs;
    dispatch: React.Dispatch<LoadCalculatorInputsAction>;
}) {
    const [isNewRoomDialogOpen, setIsNewRoomDialogOpen] = useState(false);

    function tryToOpenNewRoomDialog() {
        setIsNewRoomDialogOpen(true);
    }

    function tryToCloseNewRoomDialog() {
        setIsNewRoomDialogOpen(false);
    }

    return (
        <div className="lg-px-screen-edge tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center">
            <VerticalSpacer className="tw-h-4" />

            <div className="lg-text-title2 tw-text-center">{getVernacularString("homeS5T5P1", userPreferences.language)}</div>
            <div className="lg-text-body tw-text-center lg-text-secondary-900">{getVernacularString("homeS5T5P2", userPreferences.language)}</div>

            <VerticalSpacer className="tw-h-4" />

            <div className="tw-w-full tw-grid tw-grid-cols-2 tw-gap-2">
                <ItemBuilder
                    items={loadCalculatorInputs.property.rooms}
                    itemBuilder={(item, itemIndex) => (
                        <button
                            type="button"
                            className="tw-rounded-lg tw-flex tw-items-center tw-gap-2 tw-py-3 tw-px-2 tw-group tw-duration-200"
                            key={itemIndex}
                            // onClick={() => {
                            //     const loadCalculatorInputsAction: LoadCalculatorInputsAction = {
                            //         actionType: LoadCalculatorInputsActionType.SetPropertyType,
                            //         payload: item.value,
                            //     };

                            //     dispatch(loadCalculatorInputsAction);
                            // }}
                        >
                            <div>Room</div>
                            <div className="tw-rounded-full tw-w-8 tw-h-8 tw-p-1.5">
                                <FullWidthImage
                                    relativePath={item.icon}
                                    imageCdnProvider={ImageCdnProvider.GrowthJockey}
                                />
                            </div>
                            {/* <div>{item.content}</div> */}
                            <div>Room</div>
                        </button>
                    )}
                />

                <button
                    type="button"
                    className="tw-rounded-lg tw-flex tw-flex-col tw-items-center tw-group tw-duration-200 lg-bg-secondary-100"
                    onClick={tryToOpenNewRoomDialog}
                >
                    <PlusCircleFill className="tw-w-8 tw-h-8 lg-text-secondary-700" />
                    <div>Add Room</div>
                </button>
            </div>

            {/* New room dialog */}
            <Transition
                show={isNewRoomDialogOpen}
                as={React.Fragment}
            >
                <Dialog
                    as="div"
                    className="tw-relative tw-z-50"
                    onClose={tryToCloseNewRoomDialog}
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
                        <div className="tw-w-full tw-h-full" onClick={tryToCloseNewRoomDialog} />

                        <Transition.Child
                            as={React.Fragment}
                            enter="tw-ease-out tw-transition-all tw-duration-200"
                            enterFrom="tw-opacity-0"
                            enterTo="tw-opacity-full"
                            leave="tw-ease-in tw-transition-all tw-duration-200"
                            leaveFrom="tw-opacity-full"
                            leaveTo="tw-opacity-0"
                        >
                            <div className="tw-w-full lg-bg-secondary-100 tw-px-6 tw-py-6 tw-rounded-lg">
                                <div className="lg-text-title1">
                                    Add Room
                                </div>

                                <VerticalSpacer className="tw-h-4" />

                                <div className="lg-text-title1">
                                    Room Name
                                </div>

                                <VerticalSpacer className="tw-h-2" />

                                <input
                                    type="text"
                                    className="tw-w-full lg-bg-secondary-300 tw-py-4 tw-px-4 tw-rounded-full tw-border tw-border-solid tw-border-secondary-900-light dark:tw-border-secondary-900-dark"
                                />

                                <VerticalSpacer className="tw-h-4" />

                                <div className="lg-text-title1">
                                    Select Room Type
                                </div>

                                <VerticalSpacer className="tw-h-2" />

                                <input
                                    type="text"
                                    className="tw-w-full lg-bg-secondary-300 tw-py-4 tw-px-4 tw-rounded-full tw-border tw-border-solid tw-border-secondary-900-light dark:tw-border-secondary-900-dark"
                                />

                                <VerticalSpacer className="tw-h-32" />

                                <div className="tw-flex tw-flex-row tw-justify-between tw-items-center">
                                    <button type="button" className="" onClick={tryToCloseNewRoomDialog}>
                                        Cancel
                                    </button>

                                    <button type="button" className="lg-cta-button">
                                        Add Room
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>

                        <div className="tw-w-full tw-h-full" onClick={tryToCloseNewRoomDialog} />
                    </Dialog.Panel>
                </Dialog>
            </Transition>
        </div>
    );
}

function DeviceSelection({
    userPreferences,
    loadCalculatorInputs,
    dispatch,
}: {
    userPreferences: UserPreferences;
    loadCalculatorInputs: LoadCalculatorInputs;
    dispatch: React.Dispatch<LoadCalculatorInputsAction>;
}) {
    return <div />;
}

enum PropertyType {
    OneBhk = "1-bhk",
    TwoBhk = "2-bhk",
    ThreeBhk = "3-bhk",
    FourBhk = "4-bhk",
    Villa = "villa",
    Custom = "custom",
}

enum RoomType {
    Bedroom,
    Kitchen,
    Washroom,
    Hall,
    LivingRoom,
    DiningRoom,
    Balcony,
    PoojaRoom,
}

enum DeviceType {}

function enumFromStringValue<T>(enm: {[s: string]: T}, input: string): T | null {
    return (Object.values(enm) as unknown as string[]).includes(input) ? (input as unknown as T) : null;
}

type LoadCalculatorInputs = {
    property: Property;
};

enum LoadCalculatorInputsActionType {
    SetPropertyType,
}

type LoadCalculatorInputsAction = {
    actionType: LoadCalculatorInputsActionType;
    payload: any;
};

type Property = {
    propertyType: PropertyType;
    propertyName: string;
    rooms: Array<Room>;
};

type Room = {
    roomType: RoomType;
    roomName: string;
    devices: Array<Device>;
};

type Device = {
    deviceType: DeviceType;
    deviceName: string;
    // TODO
    deviceDetails: any; // <--------
};

function loadCalculatorInputsReducer(state: LoadCalculatorInputs, action: LoadCalculatorInputsAction): LoadCalculatorInputs {
    switch (action.actionType) {
        case LoadCalculatorInputsActionType.SetPropertyType: {
            const newState: LoadCalculatorInputs = structuredClone(state);
            newState.property.propertyType = action.payload;

            return newState;
        }
        default: {
            const exhaustiveCheck: never = action.actionType;
            throw new Error(`Encountered unexpected LoadCalculatorInputsActionType: ${action.actionType}`);
        }
    }
}

function createInitialState({propertyType}: {propertyType: PropertyType}) {
    const state: LoadCalculatorInputs = {
        property: {
            propertyType: propertyType,
            propertyName: "New property",
            rooms: [],
        },
    };

    return state;
}
