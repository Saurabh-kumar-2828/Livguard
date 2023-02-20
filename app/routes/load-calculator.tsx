import {Dialog, Listbox, Transition} from "@headlessui/react";
import {InformationCircleIcon} from "@heroicons/react/20/solid";
import {LoaderFunction} from "@remix-run/node";
import {Link, useSearchParams} from "@remix-run/react";
import React, {useEffect} from "react";
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
import {Uuid} from "~/global-common-typescript/typeDefinitions";
import {getIntegerFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {concatenateNonNullStringsWithSpaces, getSingletonValueOrNull} from "~/global-common-typescript/utilities/utilities";
import {FaqSection} from "~/routes";
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
                showMobileMenuIcon={true}
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

            <VerticalSpacer className="tw-h-8" />

            <AdditionalInputsSection
                userPreferences={userPreferences}
                loadCalculatorInputs={loadCalculatorInputs}
                dispatch={dispatch}
            />

            <VerticalSpacer className="tw-h-8" />

            <div className="lg-px-screen-edge tw-flex tw-flex-col tw-items-center">
                {/* TODO: Handle things like UTM here */}
                <button
                    type="submit"
                    // to={`/load-calculator?property_type=${loadCalculatorInputs.property.propertyType}`}
                    className=" lg-cta-button"
                    disabled={true}
                >
                    Let's Plan
                </button>
            </div>

            <VerticalSpacer className="tw-h-8" />

            <FaqSection userPreferences={userPreferences} />

            <VerticalSpacer className="tw-h-8" />
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
    const [isEditRoomDialogOpen, setIsEditRoomDialogOpen] = useState(false);
    const [currentlyEditingRoomIndex, setCurrentlyEditingRoomIndex] = useState<number | null>(null);

    function tryToOpenNewRoomDialog() {
        setIsNewRoomDialogOpen(true);
    }

    function tryToOpenEditRoomDialog() {
        setIsEditRoomDialogOpen(true);
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
                    itemBuilder={(room, roomIndex) => (
                        <button
                            type="button"
                            className="tw-w-full lg-bg-secondary-100 tw-rounded-lg tw-grid tw-grid-rows-[auto_0.25rem_auto_0.75rem_auto] tw-grid-cols-[minmax(0,1fr)_0.5rem_auto] tw-justify-items-start tw-p-4 tw-group tw-duration-200"
                            key={roomIndex}
                            // onClick={() => {
                            //     const loadCalculatorInputsAction: LoadCalculatorInputsAction = {
                            //         actionType: LoadCalculatorInputsActionType.SetPropertyType,
                            //         payload: item.value,
                            //     };

                            //     dispatch(loadCalculatorInputsAction);
                            // }}
                            onClick={() => {
                                setCurrentlyEditingRoomIndex(roomIndex);
                                tryToOpenEditRoomDialog();
                            }}
                        >
                            <div className="tw-row-start-1 tw-col-start-1 tw-col-span-3">{room.roomName}</div>

                            <div className="tw-row-start-3 tw-col-start-1 tw-col-span-3">{`${room.devices.length} Devices`}</div>

                            <div className="tw-row-start-5 tw-col-start-1 tw-flex tw-flex-row">
                                {room.devices.length == 0 ? (
                                    <PlusCircleFill className="tw-w-8 tw-h-8 lg-text-secondary-700" />
                                ) : (
                                    <>
                                        <div className="tw-w-6 tw-h-8">
                                            <div className="tw-w-8 tw-h-8 lg-bg-secondary-900 tw-rounded-full tw-outline-1 tw-outline tw-outline-secondary-100-light dark:tw-outline-secondary-100-dark" />
                                        </div>
                                        <div className="tw-w-6 tw-h-8">
                                            <div className="tw-w-8 tw-h-8 lg-bg-secondary-900 tw-rounded-full tw-outline tw-outline-secondary-100-light dark:tw-outline-secondary-100-dark" />
                                        </div>
                                        <div className="tw-w-6 tw-h-8">
                                            <div className="tw-w-8 tw-h-8 lg-bg-secondary-900 tw-rounded-full tw-outline tw-outline-secondary-100-light dark:tw-outline-secondary-100-dark" />
                                        </div>

                                        {/* <ItemBuilder
                                            items={room.devices}
                                            itemBuilder={(device, deviceIndex) => (

                                            )}
                                        /> */}
                                    </>
                                )}
                            </div>

                            <div className="tw-row-start-5 tw-col-start-3 lg-text-primary-500 tw-self-center">Edit</div>
                        </button>
                    )}
                />

                <button
                    type="button"
                    className="tw-w-full tw-h-[7.5rem] tw-rounded-lg tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-y-2 tw-group tw-duration-200 lg-bg-secondary-100"
                    onClick={tryToOpenNewRoomDialog}
                >
                    <PlusCircleFill className="tw-w-8 tw-h-8 lg-text-secondary-700" />
                    <div>Add Room</div>
                </button>
            </div>

            <NewRoomDialog
                userPreferences={userPreferences}
                loadCalculatorInputs={loadCalculatorInputs}
                dispatch={dispatch}
                isNewRoomDialogOpen={isNewRoomDialogOpen}
                setIsNewRoomDialogOpen={setIsNewRoomDialogOpen}
            />

            <EditRoomDialog
                userPreferences={userPreferences}
                loadCalculatorInputs={loadCalculatorInputs}
                dispatch={dispatch}
                currentlyEditingRoomIndex={currentlyEditingRoomIndex}
                isEditRoomDialogOpen={isEditRoomDialogOpen}
                setIsEditRoomDialogOpen={setIsEditRoomDialogOpen}
            />
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

function NewRoomDialog({
    userPreferences,
    loadCalculatorInputs,
    dispatch,
    isNewRoomDialogOpen,
    setIsNewRoomDialogOpen,
}: {
    userPreferences: UserPreferences;
    loadCalculatorInputs: LoadCalculatorInputs;
    dispatch: React.Dispatch<LoadCalculatorInputsAction>;
    isNewRoomDialogOpen: boolean;
    setIsNewRoomDialogOpen: React.Dispatch<boolean>;
}) {
    const [selectedRoomName, setSelectedRoomName] = useState("");
    const [selectedRoomType, setSelectedRoomType] = useState("dda75244-60f2-40e8-8936-d4ea2ae25f34");

    function tryToCloseNewRoomDialog() {
        setIsNewRoomDialogOpen(false);
    }

    function recalculateNewRoomName() {
        // TODO: Only change the name if it has not been modified by user?
        const countOfExistingRoomsWithSameType = loadCalculatorInputs.property.rooms.filter((room) => room.roomType == selectedRoomType).length;

        setSelectedRoomName(`${getRoomTypeDetails(selectedRoomType).humanReadableString} ${countOfExistingRoomsWithSameType + 1}`);
    }

    useEffect(() => {
        recalculateNewRoomName();
    }, [selectedRoomType]);

    return (
        <Transition
            show={isNewRoomDialogOpen}
            as={React.Fragment}
            beforeEnter={() => {
                setSelectedRoomType("dda75244-60f2-40e8-8936-d4ea2ae25f34");
                // useEffect is not called if type is already set to the same value, so recalculate name manually
                recalculateNewRoomName();
            }}
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
                    <div
                        className="tw-w-full tw-h-full"
                        // onClick={tryToCloseNewRoomDialog}
                    />

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
                            <div className="lg-text-title1">Add Room</div>

                            <VerticalSpacer className="tw-h-4" />

                            <div className="lg-text-title1">Select Room Typezz</div>

                            <VerticalSpacer className="tw-h-2" />

                            <Listbox
                                value={selectedRoomType}
                                onChange={setSelectedRoomType}
                            >
                                <Listbox.Button className="tw-w-full lg-bg-secondary-300 tw-py-4 tw-px-4 tw-rounded-full tw-border tw-border-solid tw-border-secondary-900-light dark:tw-border-secondary-900-dark tw-text-left">
                                    {getRoomTypeDetails(selectedRoomType).humanReadableString}
                                </Listbox.Button>

                                <Listbox.Options className="tw-absolute tw-z-50 tw-left-12 tw-right-12 tw-h-60 lg-text-secondary-900 tw-rounded-lg tw-overflow-auto">
                                    <ItemBuilder
                                        items={Object.entries(roomTypeLibrary)}
                                        itemBuilder={(roomTypeKvp, roomTypeKvpIndex) => (
                                            <Listbox.Option
                                                value={roomTypeKvp[0]}
                                                key={roomTypeKvpIndex}
                                                as={React.Fragment}
                                            >
                                                {({active, selected}) => (
                                                    <li className={concatenateNonNullStringsWithSpaces("tw-p-4", selected ? "lg-bg-secondary-300" : "lg-bg-secondary-100")}>
                                                        {roomTypeKvp[1].humanReadableString}
                                                    </li>
                                                )}
                                            </Listbox.Option>
                                        )}
                                        spaceBuilder={(spaceIndex) => (
                                            <div
                                                className="tw-mx-2 tw-h-px lg-bg-secondary-700"
                                                key={spaceIndex}
                                            />
                                        )}
                                    />
                                </Listbox.Options>
                            </Listbox>

                            <VerticalSpacer className="tw-h-4" />

                            <div className="lg-text-title1">Room Name</div>

                            <VerticalSpacer className="tw-h-2" />

                            <input
                                type="text"
                                className="tw-w-full lg-bg-secondary-300 tw-py-4 tw-px-4 tw-rounded-full tw-border tw-border-solid tw-border-secondary-900-light dark:tw-border-secondary-900-dark"
                                value={selectedRoomName}
                                onChange={(e) => setSelectedRoomName(e.target.value)}
                            />

                            <VerticalSpacer className="tw-h-32" />

                            <div className="tw-flex tw-flex-row tw-justify-between tw-items-center">
                                <button
                                    type="button"
                                    className=""
                                    onClick={tryToCloseNewRoomDialog}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    className="lg-cta-button"
                                    disabled={selectedRoomName.length == 0}
                                    onClick={() => {
                                        const room: Room = {
                                            roomType: selectedRoomType,
                                            roomName: selectedRoomName,
                                            devices: [],
                                        };

                                        const action: LoadCalculatorInputsAction = {
                                            actionType: LoadCalculatorInputsActionType.AddRoom,
                                            payload: room,
                                        };

                                        dispatch(action);

                                        tryToCloseNewRoomDialog();
                                    }}
                                >
                                    Add Room
                                </button>
                            </div>
                        </div>
                    </Transition.Child>

                    <div
                        className="tw-w-full tw-h-full"
                        // onClick={tryToCloseNewRoomDialog}
                    />
                </Dialog.Panel>
            </Dialog>
        </Transition>
    );
}

function EditRoomDialog({
    userPreferences,
    loadCalculatorInputs,
    dispatch,
    currentlyEditingRoomIndex,
    isEditRoomDialogOpen,
    setIsEditRoomDialogOpen,
}: {
    userPreferences: UserPreferences;
    loadCalculatorInputs: LoadCalculatorInputs;
    dispatch: React.Dispatch<LoadCalculatorInputsAction>;
    currentlyEditingRoomIndex: number | null;
    isEditRoomDialogOpen: boolean;
    setIsEditRoomDialogOpen: React.Dispatch<boolean>;
}) {
    const [selectedRoomName, setSelectedRoomName] = useState("");
    const [selectedDevices, setSelectedDevices] = useState<Array<Device>>([]);
    const [isNewDeviceDialogOpen, setIsNewDeviceDialogOpen] = useState(false);
    const [currentlyAddingDeviceType, setCurrentlyAddingDeviceType] = useState<string | null>(null);
    const [currentlyEditingDeviceIndex, setCurrentlyEditingDeviceIndex] = useState<number | null>(null);

    function tryToCloseEditRoomDialog() {
        setIsEditRoomDialogOpen(false);
    }

    function tryToOpenNewDeviceDialog() {
        setIsNewDeviceDialogOpen(true);
    }

    if (currentlyEditingRoomIndex == null) {
        return <></>;
    }

    const room = loadCalculatorInputs.property.rooms[currentlyEditingRoomIndex];
    const groupedDevices = selectedDevices.reduce(createGroupByReducer<Device, string>("deviceType"), {});
    const deviceTypeToDeviceCounts = Object.entries(groupedDevices).map((kvp) => ({deviceType: kvp[0], deviceCount: kvp[1].length}));

    // function recalculateNewRoomName() {
    //     // TODO: Only change the name if it has not been modified by user?
    //     const countOfExistingRoomsWithSameType = loadCalculatorInputs.property.rooms.filter(room => room.roomType == selectedRoomType).length;

    //     setSelectedRoomName(`${getRoomTypeDetails(selectedRoomType).humanReadableString} ${countOfExistingRoomsWithSameType + 1}`);
    // }

    // useEffect(() => {
    //     recalculateNewRoomName();
    // }, [selectedRoomType]);

    return (
        <Transition
            show={isEditRoomDialogOpen}
            as={React.Fragment}
            beforeEnter={() => {
                setSelectedDevices(room.devices);
                setSelectedRoomName(loadCalculatorInputs.property.propertyName);
                // useEffect is not called if type is already set to the same value, so recalculate name manually
                // recalculateNewRoomName();
            }}
        >
            <Dialog
                as="div"
                className="tw-relative tw-z-50"
                onClose={tryToCloseEditRoomDialog}
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
                    <div />

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
                            <div className="lg-text-title1">Edit Room</div>

                            <VerticalSpacer className="tw-h-4" />

                            <div className="lg-text-title1">Selected Devices</div>

                            <VerticalSpacer className="tw-h-2" />

                            {selectedDevices.length == 0 ? (
                                <div className="tw-w-full tw-grid tw-grid-cols-5 tw-gap-x-2 tw-gap-y-2">
                                    <div className="tw-w-full tw-flex tw-flex-col tw-items-center tw-gap-y-2 tw-text-center">
                                        <PlusCircleFill className="tw-w-8 tw-h-8 lg-text-secondary-700" />
                                        <div className="lg-text-icon tw-whitespace-nowrap">No device</div>
                                    </div>
                                </div>
                            ) : (
                                <div className="tw-w-full tw-grid tw-grid-cols-5 tw-gap-x-2 tw-gap-y-2">
                                    <ItemBuilder
                                        items={deviceTypeToDeviceCounts}
                                        itemBuilder={(deviceTypeToDeviceCount, deviceTypeToDeviceCountIndex) => (
                                            <button
                                                type="button"
                                                className="tw-w-full tw-flex tw-flex-col tw-items-center tw-gap-y-2 tw-text-center"
                                                // onClick={() => {
                                                //     const indexToExclude = selectedDevices.findIndex(device => device.deviceType == deviceTypeToDeviceCount.deviceType);
                                                //     setSelectedDevices([
                                                //         ...selectedDevices.filter((device, deviceIndex) => deviceIndex != indexToExclude)
                                                //     ]);
                                                // }}
                                                key={deviceTypeToDeviceCountIndex}
                                            >
                                                <div className="tw-w-8 tw-h-8 lg-bg-secondary-900 tw-rounded-full" />
                                                <div className="lg-text-icon tw-whitespace-nowrap">
                                                    {deviceTypeToDeviceCount.deviceCount}x {getDeviceTypeDetails(deviceTypeToDeviceCount.deviceType).humanReadableString}
                                                </div>
                                            </button>
                                        )}
                                    />
                                </div>
                            )}

                            <VerticalSpacer className="tw-h-4" />

                            <div className="lg-text-title1">Select Devices</div>

                            <VerticalSpacer className="tw-h-2" />

                            <div className="lg-text-title1">Lighting</div>

                            <VerticalSpacer className="tw-h-2" />

                            <div className="tw-w-full tw-grid tw-grid-cols-5 tw-gap-x-2 tw-gap-y-2">
                                <ItemBuilder
                                    items={[
                                        "dda75244-60f2-40e8-8936-d4ea2ae25f34",
                                        "2b74d3cf-6fc2-4c9e-b264-e1865138c394",
                                        "43150663-bea9-4fa9-b273-1b92212f5d30",
                                        "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                                        "89066719-efd8-4e7e-be1c-16da3fc57330",
                                        "e289b9e5-78b3-44e9-86f3-ed0068f0addf",
                                    ]}
                                    itemBuilder={(deviceType, deviceTypeIndex) => (
                                        <button
                                            type="button"
                                            className="tw-w-full tw-flex tw-flex-col tw-items-center tw-gap-y-2 tw-text-center"
                                            // onClick={() => {
                                            //     setSelectedDevices([
                                            //         ...selectedDevices,
                                            //         {
                                            //             deviceType: deviceType,
                                            //             deviceDetails: {},
                                            //         },
                                            //     ]);
                                            // }}
                                            onClick={() => {
                                                setCurrentlyAddingDeviceType(deviceType);
                                                tryToOpenNewDeviceDialog();
                                            }}
                                            key={deviceTypeIndex}
                                        >
                                            <div className="tw-w-8 tw-h-8 lg-bg-secondary-900 tw-rounded-full" />
                                            <div className="lg-text-icon tw-whitespace-nowrap">{getDeviceTypeDetails(deviceType).humanReadableString}</div>
                                        </button>
                                    )}
                                />
                            </div>

                            <VerticalSpacer className="tw-h-32" />

                            {/* <div className="tw-flex tw-flex-row tw-justify-between tw-items-center">
                                <button
                                    type="button"
                                    className=""
                                    onClick={tryToCloseEditRoomDialog}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    className="lg-cta-button"
                                    // disabled={selectedRoomName.length == 0}
                                    onClick={() => {
                                        const loadCalculatorInputsAction: LoadCalculatorInputsAction = {
                                            actionType: LoadCalculatorInputsActionType.EditRoom,
                                            payload: {
                                                roomIndex: currentlyEditingRoomIndex,
                                                roomName: selectedRoomName,
                                                devices: selectedDevices,
                                            },
                                        };

                                        dispatch(loadCalculatorInputsAction);

                                        tryToCloseEditRoomDialog();
                                    }}
                                >
                                    Update Devices
                                </button>
                            </div> */}

                            <div className="tw-flex tw-flex-row tw-justify-center tw-items-center">
                                <button
                                    type="button"
                                    className=""
                                    onClick={tryToCloseEditRoomDialog}
                                >
                                    Back
                                </button>
                            </div>

                            <NewDeviceDialog
                                userPreferences={userPreferences}
                                loadCalculatorInputs={loadCalculatorInputs}
                                dispatch={dispatch}
                                currentlyEditingRoomIndex={currentlyEditingRoomIndex}
                                currentlyAddingDeviceType={currentlyAddingDeviceType}
                                isAddDeviceDialogOpen={isNewDeviceDialogOpen}
                                setIsAddDeviceDialogOpen={setIsNewDeviceDialogOpen}
                            />
                        </div>
                    </Transition.Child>
                </Dialog.Panel>

                <div />
            </Dialog>
        </Transition>
    );
}

function NewDeviceDialog({
    userPreferences,
    loadCalculatorInputs,
    dispatch,
    currentlyEditingRoomIndex,
    currentlyAddingDeviceType,
    isAddDeviceDialogOpen,
    setIsAddDeviceDialogOpen,
}: {
    userPreferences: UserPreferences;
    loadCalculatorInputs: LoadCalculatorInputs;
    dispatch: React.Dispatch<LoadCalculatorInputsAction>;
    currentlyEditingRoomIndex: number | null;
    currentlyAddingDeviceType: string | null;
    isAddDeviceDialogOpen: boolean;
    setIsAddDeviceDialogOpen: React.Dispatch<boolean>;
}) {
    // const [selectedDevices, setSelectedDevices] = useState<Array<Device>>([]);

    function tryToCloseAddDeviceDialog() {
        setIsAddDeviceDialogOpen(false);
    }

    if (currentlyEditingRoomIndex == null || currentlyAddingDeviceType == null) {
        return <></>;
    }

    const room = loadCalculatorInputs.property.rooms[currentlyEditingRoomIndex];

    // function recalculateNewRoomName() {
    //     // TODO: Only change the name if it has not been modified by user?
    //     const countOfExistingRoomsWithSameType = loadCalculatorInputs.property.rooms.filter(room => room.roomType == selectedRoomType).length;

    //     setSelectedRoomName(`${getRoomTypeDetails(selectedRoomType).humanReadableString} ${countOfExistingRoomsWithSameType + 1}`);
    // }

    // useEffect(() => {
    //     recalculateNewRoomName();
    // }, [selectedRoomType]);

    return (
        <Transition
            show={isAddDeviceDialogOpen}
            as={React.Fragment}
            beforeEnter={() => {
                // setSelectedDevices(room.devices);
                // setSelectedRoomName(loadCalculatorInputs.property.propertyName);
                // useEffect is not called if type is already set to the same value, so recalculate name manually
                // recalculateNewRoomName();
            }}
        >
            <Dialog
                as="div"
                className="tw-relative tw-z-50"
                onClose={tryToCloseAddDeviceDialog}
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
                    <div />

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
                            <div className="lg-text-title1">Add Device</div>

                            <VerticalSpacer className="tw-h-4" />

                            <div className="tw-flex tw-flex-row tw-gap-x-2">
                                <div className="tw-font-bold">Device Name:</div>
                                <div>{getDeviceTypeDetails(currentlyAddingDeviceType).humanReadableString}</div>
                            </div>

                            <VerticalSpacer className="tw-h-32" />

                            <div className="tw-flex tw-flex-row tw-justify-between tw-items-center">
                                <button
                                    type="button"
                                    className=""
                                    onClick={tryToCloseAddDeviceDialog}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    className="lg-cta-button"
                                    // disabled={selectedRoomName.length == 0}
                                    onClick={() => {
                                        const device: Device = {
                                            deviceType: currentlyAddingDeviceType,
                                            deviceDetails: {},
                                        };

                                        const loadCalculatorInputsAction: LoadCalculatorInputsAction = {
                                            actionType: LoadCalculatorInputsActionType.AddDevice,
                                            payload: {
                                                roomIndex: currentlyEditingRoomIndex,
                                                device: device,
                                            },
                                        };

                                        dispatch(loadCalculatorInputsAction);

                                        tryToCloseAddDeviceDialog();
                                    }}
                                >
                                    Add Device
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </Dialog.Panel>

                <div />
            </Dialog>
        </Transition>
    );
}

function AdditionalInputsSection({
    userPreferences,
    loadCalculatorInputs,
    dispatch,
}: {
    userPreferences: UserPreferences;
    loadCalculatorInputs: LoadCalculatorInputs;
    dispatch: React.Dispatch<LoadCalculatorInputsAction>;
}) {
    return (
        <div className="lg-px-screen-edge">
            <div className="tw-flex tw-flex-row tw-justify-center tw-items-center tw-gap-x-2">
                <div>I would require</div>
                <div className="tw-flex tw-flex-row">
                    <button
                        type="button"
                        className="tw-w-6 tw-h-8 lg-bg-secondary-100 tw-rounded-l-lg tw-flex tw-flex-col tw-items-center tw-justify-center"
                        onClick={(e) => {
                            const newBackupHours = loadCalculatorInputs.backupHours - 1;
                            if (newBackupHours < 1) {
                                return;
                            }

                            const action: LoadCalculatorInputsAction = {
                                actionType: LoadCalculatorInputsActionType.ChangeBackupHours,
                                payload: newBackupHours,
                            };

                            dispatch(action);
                        }}
                    >
                        -
                    </button>
                    <input
                        className="tw-w-12 tw-h-8 lg-bg-secondary-100 tw-text-center"
                        value={loadCalculatorInputs.backupHours}
                        onChange={(e) => {
                            const newBackupHours = safeParse(getIntegerFromUnknown, e.target.value);
                            if (newBackupHours == null || newBackupHours < 1 || newBackupHours > 24) {
                                return;
                            }

                            const action: LoadCalculatorInputsAction = {
                                actionType: LoadCalculatorInputsActionType.ChangeBackupHours,
                                payload: newBackupHours,
                            };

                            dispatch(action);
                        }}
                    />
                    <button
                        type="button"
                        className="tw-w-6 tw-h-8 lg-bg-secondary-100 tw-rounded-r-lg tw-flex tw-flex-col tw-items-center tw-justify-center"
                        onClick={(e) => {
                            const newBackupHours = loadCalculatorInputs.backupHours + 1;
                            if (newBackupHours > 24) {
                                return;
                            }

                            const action: LoadCalculatorInputsAction = {
                                actionType: LoadCalculatorInputsActionType.ChangeBackupHours,
                                payload: newBackupHours,
                            };

                            dispatch(action);
                        }}
                    >
                        +
                    </button>
                </div>
                <div>hours of backup</div>
            </div>

            {/* <VerticalSpacer className="tw-h-8" />

            <div className="tw-flex tw-flex-row tw-items-center tw-gap-x-2">
                <div>Average Consumption</div>
                <InformationCircleIcon className="tw-w-4 tw-h-4" title="How much power you expect to consume" />
            </div> */}
        </div>
    );
}

enum PropertyType {
    OneBhk = "1-bhk",
    TwoBhk = "2-bhk",
    ThreeBhk = "3-bhk",
    FourBhk = "4-bhk",
    Villa = "villa",
    Custom = "custom",
}

const roomTypeLibrary: {[id: string]: {humanReadableString: string}} = {
    "dda75244-60f2-40e8-8936-d4ea2ae25f34": {
        humanReadableString: "Bedroom",
    },
    "71824c29-731e-4625-9c66-cfde9763a46a": {
        humanReadableString: "Kitchen",
    },
    "be1a5624-4f6d-49b1-a7ea-45fdde15b0e8": {
        humanReadableString: "Washroom",
    },
    "c55cef3d-ea14-4810-926c-eac96452906d": {
        humanReadableString: "Hall",
    },
    "9a64e953-54fe-46b7-955c-4165936bb5fb": {
        humanReadableString: "Living Room",
    },
    "a88a6db2-2c94-4a88-bf1b-c991830db16f": {
        humanReadableString: "Dining Room",
    },
    "2a1fb75c-2256-4cd1-adaf-9fcb7cf31da1": {
        humanReadableString: "Balcony",
    },
    "0f78ca82-a628-4ed3-812f-223566f5416d": {
        humanReadableString: "Pooja Room",
    },
};

const deviceTypeLibrary: {[id: string]: {humanReadableString: string}} = {
    "dda75244-60f2-40e8-8936-d4ea2ae25f34": {
        humanReadableString: "Tubelight",
    },
    "2b74d3cf-6fc2-4c9e-b264-e1865138c394": {
        humanReadableString: "CFL",
    },
    "43150663-bea9-4fa9-b273-1b92212f5d30": {
        humanReadableString: "Bulb",
    },
    "aba012ef-4a0a-438f-afbe-8fcb92a95c6b": {
        humanReadableString: "Panel Light",
    },
    "89066719-efd8-4e7e-be1c-16da3fc57330": {
        humanReadableString: "Fridge",
    },
    "e289b9e5-78b3-44e9-86f3-ed0068f0addf": {
        humanReadableString: "Induction",
    },
    "97712354-86b6-4863-be85-e3d6d564b882": {
        humanReadableString: "",
    },
    "003f0bae-1065-416e-8330-b82b732624ed": {
        humanReadableString: "",
    },
    "d915052b-e216-4dbd-8fba-055d1b4af551": {
        humanReadableString: "",
    },
    "f167dc54-7599-45ac-bd4e-e99393870267": {
        humanReadableString: "",
    },
    "f0896a88-d01f-44e3-8004-53a9bc5ad603": {
        humanReadableString: "",
    },
    "152594ae-c517-4e75-8f1e-8a58301f2ff3": {
        humanReadableString: "",
    },
    "ddef3ea3-c364-47c8-a3de-2af0a685ac95": {
        humanReadableString: "",
    },
    "360aae7f-2bd0-4cb9-8083-df636906c55a": {
        humanReadableString: "",
    },
    "3a401059-08d9-464b-9e56-e280a1c9919d": {
        humanReadableString: "",
    },
    "87702654-5068-44f5-befc-814fcb4da640": {
        humanReadableString: "",
    },
    "2bf7a137-3aeb-456b-8a7c-8ae1aef146e2": {
        humanReadableString: "",
    },
    "6e6ebc73-5deb-4c2f-b7f3-f6d596385d4e": {
        humanReadableString: "",
    },
    "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf": {
        humanReadableString: "",
    },
    "41ea7450-3f3b-41b8-b701-bfadac047e56": {
        humanReadableString: "",
    },
    "2091dc25-6837-483b-a6d1-8b2a43e13957": {
        humanReadableString: "",
    },
    "d7a85e3a-3b8c-4f93-99ec-dce310df2713": {
        humanReadableString: "",
    },
    "56b3b38d-ca34-4bda-a1c1-fe6b5032e122": {
        humanReadableString: "",
    },
    "a3c27bb6-ea8f-4bd6-8992-f144296f0f15": {
        humanReadableString: "",
    },
    "fbbb26c8-2550-4a31-b7c0-2720f72ede55": {
        humanReadableString: "",
    },
    "a54d76f2-1ccb-4769-aa3d-5eaafd44843d": {
        humanReadableString: "",
    },
    "56c4df60-b175-4c71-bcc9-ecfd2b5bc68a": {
        humanReadableString: "",
    },
    "59f3154c-0433-4086-8417-45f8e4fa0f3d": {
        humanReadableString: "",
    },
    "1c9f3a15-34cf-4cde-83d8-3a06fdf26661": {
        humanReadableString: "",
    },
    "54933747-ce3f-4f00-a003-a98eda1ce406": {
        humanReadableString: "",
    },
    "966dafd8-21e7-448a-970e-38b0bebf8122": {
        humanReadableString: "",
    },
    "276efb37-0741-419f-a743-725022423dc1": {
        humanReadableString: "",
    },
    "a36ecf7f-a597-4a46-a12e-44c82b5b8f56": {
        humanReadableString: "",
    },
    "0a85d525-7268-4aef-81bd-23e1246ddbfb": {
        humanReadableString: "",
    },
    "01bc2756-1b2b-4250-a927-c4c0722f5686": {
        humanReadableString: "",
    },
    "2a438f07-e1b3-4e99-8f88-a4d24dd3c38e": {
        humanReadableString: "",
    },
    "007e9e8f-8ada-4c0f-9369-b76808473513": {
        humanReadableString: "",
    },
    "5f3aca95-d610-4819-a5eb-ad1ad36d1c94": {
        humanReadableString: "",
    },
    "c1e2d778-bedb-453a-a19d-b1417266b622": {
        humanReadableString: "",
    },
    "cf75c40f-4692-42de-85cb-8a642d6a9820": {
        humanReadableString: "",
    },
    "8992664a-df3e-44d5-95aa-54f1413d4ce9": {
        humanReadableString: "",
    },
    "3833d768-81ca-4c1b-b533-4d1f8046fe3e": {
        humanReadableString: "",
    },
    "c8807ba8-d44d-4cfb-9ae4-9f354c749308": {
        humanReadableString: "",
    },
    "7537e99d-b72a-4d23-b807-54fc6826997a": {
        humanReadableString: "",
    },
    "f4800b07-e3d1-464e-b660-70ed04c86257": {
        humanReadableString: "",
    },
    "e0d8de56-b39e-4d04-b746-41f69ca399bc": {
        humanReadableString: "",
    },
    "2b012560-1aa2-4b04-9c3f-a0ab77fb2acf": {
        humanReadableString: "",
    },
    "68b326c5-97c1-4971-87d4-69861ec0b5bf": {
        humanReadableString: "",
    },
    "21234f7d-72a2-42a2-bf44-23a0eea7f2ae": {
        humanReadableString: "",
    },
    "d20df829-ebe0-4694-a367-5314977bf22b": {
        humanReadableString: "",
    },
    "404060ab-2e3b-412f-ae69-5c523a464b45": {
        humanReadableString: "",
    },
};

function enumFromStringValue<T>(enm: {[s: string]: T}, input: string): T | null {
    return (Object.values(enm) as unknown as string[]).includes(input) ? (input as unknown as T) : null;
}

type LoadCalculatorInputs = {
    property: Property;
    backupHours: number;
    averageConsumption: number;
};

enum LoadCalculatorInputsActionType {
    SetPropertyType,
    AddRoom,
    // TODO: Remove this?
    EditRoom,
    AddDevice,
    ChangeBackupHours,
    ChangeAverageConsumption,
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
    roomType: string;
    roomName: string;
    devices: Array<Device>;
};

type Device = {
    deviceType: string;
    // deviceName: string;
    deviceDetails: any;
};

function loadCalculatorInputsReducer(state: LoadCalculatorInputs, action: LoadCalculatorInputsAction): LoadCalculatorInputs {
    switch (action.actionType) {
        case LoadCalculatorInputsActionType.SetPropertyType: {
            // TODO: Validate that these exist?
            const propertyType = action.payload;

            const newState: LoadCalculatorInputs = structuredClone(state);

            newState.property.propertyType = propertyType;

            return newState;
        }
        case LoadCalculatorInputsActionType.AddRoom: {
            // TODO: Validate that these exist?
            const propertyName = action.payload;

            const newState: LoadCalculatorInputs = structuredClone(state);

            newState.property.rooms.push(action.payload);

            return newState;
        }
        case LoadCalculatorInputsActionType.EditRoom: {
            // TODO: Validate that these exist?
            const roomIndex = action.payload.roomIndex;
            const roomName = action.payload.roomName;
            const devices = action.payload.devices;

            const newState: LoadCalculatorInputs = structuredClone(state);

            newState.property.rooms[roomIndex].roomName = roomName;
            newState.property.rooms[roomIndex].devices = devices;

            return newState;
        }
        case LoadCalculatorInputsActionType.AddDevice: {
            // TODO: Validate that these exist?
            const roomIndex = action.payload.roomIndex;
            const device = action.payload.device;

            const newState: LoadCalculatorInputs = structuredClone(state);

            newState.property.rooms[roomIndex].devices.push(device);

            return newState;
        }
        case LoadCalculatorInputsActionType.ChangeBackupHours: {
            // TODO: Validate that these exist?
            const backupHours = action.payload;

            const newState: LoadCalculatorInputs = structuredClone(state);

            newState.backupHours = backupHours;

            return newState;
        }
        case LoadCalculatorInputsActionType.ChangeAverageConsumption: {
            // TODO: Validate that these exist?
            const averageConsumption = action.payload;

            const newState: LoadCalculatorInputs = structuredClone(state);

            newState.averageConsumption = averageConsumption;

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
            rooms: [
                {
                    roomType: "2a1fb75c-2256-4cd1-adaf-9fcb7cf31da1",
                    roomName: "Test",
                    devices: [],
                },
            ],
        },
        backupHours: 4,
        averageConsumption: 50,
    };

    return state;
}

function getRoomTypeDetails(roomType: string) {
    if (!(roomType in roomTypeLibrary)) {
        throw new Error(`Encountered unexpected RoomType ${roomType}`);
    }

    return roomTypeLibrary[roomType];
}

function getDeviceTypeDetails(deviceType: string) {
    if (!(deviceType in deviceTypeLibrary)) {
        throw new Error(`Encountered unexpected DeviceType ${deviceType}`);
    }

    return deviceTypeLibrary[deviceType];
}
