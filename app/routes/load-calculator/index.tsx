import {Dialog, Listbox, Transition} from "@headlessui/react";
import {InformationCircleIcon} from "@heroicons/react/20/solid";
import {ActionFunction, LoaderFunction, redirect} from "@remix-run/node";
import {Form, Link, useActionData, useSearchParams} from "@remix-run/react";
import React, {useEffect, useReducer, useState} from "react";
import {PlusCircleFill} from "react-bootstrap-icons";
import {useLoaderData} from "react-router";
import {toast} from "react-toastify";
import {insertLoadCalculatorEntry} from "~/backend/loadCalculator";
import {StickyBottomBar} from "~/components/bottomBar";
import {DefaultImageAnimation} from "~/components/defaultImageAnimation";
import {PageScaffold} from "~/components/pageScaffold";
import {EmptyFlexFiller} from "~/global-common-typescript/components/emptyFlexFiller";
import {FixedWidthImage} from "~/global-common-typescript/components/fixedWidthImage";
import {FullWidthImage} from "~/global-common-typescript/components/fullWidthImage";
import {ImageCdnProvider} from "~/global-common-typescript/components/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {getIntegerFromUnknown, getNonEmptyStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {concatenateNonNullStringsWithSpaces, createGroupByReducer, distinct, generateUuid, getIntegerArrayOfLength, getSingletonValueOrNull} from "~/global-common-typescript/utilities/utilities";
import {FaqSection} from "~/routes";
import {getUserPreferencesFromCookies} from "~/server/userPreferencesCookieHelper.server";
import {UserPreferences} from "~/typeDefinitions";
import {getRedirectToUrlFromRequest} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";

type ActionData = {
    error: string;
};

export const action: ActionFunction = async ({request}) => {
    const body = await request.formData();

    const loadCalculatorInputs = safeParse(getNonEmptyStringFromUnknown, body.get("loadCalculatorInputs"));

    if (loadCalculatorInputs == null) {
        const actionData: ActionData = {
            error: "Something went wrong!",
        };
        return actionData;
    }

    const id = await insertLoadCalculatorEntry(loadCalculatorInputs);

    if (id instanceof Error) {
        return id;
    }

    return redirect(`/load-calculator/${id}`);
};

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

    const actionData: ActionData = useActionData() as ActionData;

    useEffect(() => {
        if (actionData != null) {
            toast.error("actionData.error");
        }
    }, [actionData]);

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

            <AdditionalInputsSection
                userPreferences={userPreferences}
                loadCalculatorInputs={loadCalculatorInputs}
                dispatch={dispatch}
            />

            <VerticalSpacer className="tw-h-8" />

            <Form
                method="post"
                className="lg-px-screen-edge tw-flex tw-flex-col tw-items-center"
            >
                <input
                    type="text"
                    name="loadCalculatorInputs"
                    value={JSON.stringify(loadCalculatorInputs)}
                    readOnly
                    className="tw-hidden"
                />

                {/* TODO: Handle things like UTM here */}
                <button
                    type="submit"
                    // to={`/load-calculator?property_type=${loadCalculatorInputs.property.propertyType}`}
                    className=" lg-cta-button"
                >
                    Let's Plan
                </button>
            </Form>

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

            <PropertySelectionForTeaser
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

function PropertySelectionForTeaser({
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
                    // TODO: Get this data from enum
                    items={[
                        {
                            svgIcon: "/livguard/icons/home/5/1-bhk.svg",
                            content: "1 BHK",
                            value: "1-bhk",
                        },
                        {
                            svgIcon: "/livguard/icons/home/5/2-bhk.svg",
                            content: "2 BHK",
                            value: "2-bhk",
                        },
                        {
                            svgIcon: "/livguard/icons/home/5/3-bhk.svg",
                            content: "3 BHK",
                            value: "3-bhk",
                        },
                        {
                            svgIcon: "/livguard/icons/home/5/4-bhk.svg",
                            content: "4 BHK",
                            value: "4-bhk",
                        },
                        {
                            svgIcon: "/livguard/icons/home/5/villa.svg",
                            content: "Villa",
                            value: "villa",
                        },
                        {
                            svgIcon: "/livguard/icons/home/5/custom.svg",
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
                                    item.value == loadCalculatorInputs.property.propertyType ? "tw-bg-secondary-900-dark" : "lg-bg-secondary-300",
                                )}
                            >
                                {/* <FullWidthImage
                                    relativePath={item.icon}
                                    imageCdnProvider={ImageCdnProvider.Imgix}
                                /> */}
                                <object
                                    data={`https://files.growthjockey.com${item.svgIcon}`}
                                    className={concatenateNonNullStringsWithSpaces(
                                        "tw-w-full tw-h-full dark:tw-invert",
                                        item.value == loadCalculatorInputs.property.propertyType ? "!tw-invert-0" : null,
                                    )}
                                />
                            </div>
                            <div className={concatenateNonNullStringsWithSpaces(item.value == loadCalculatorInputs.property.propertyType ? "tw-text-secondary-900-dark" : null)}>{item.content}</div>
                        </button>
                    )}
                />
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
                    imageCdnProvider={ImageCdnProvider.Imgix}
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
                                <div className="lg-bg-primary-500 tw-h-12 tw-w-12 tw-rounded-full tw-p-2 tw-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
                                    <FullWidthImage
                                        relativePath={item.icon}
                                        imageCdnProvider={ImageCdnProvider.Imgix}
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
    const [isChangePropertyTypeDialogOpen, setIsChangePropertyTypeDialogOpen] = useState(false);
    const [currentlyChangingPropertyType, setCurrentlyChangingPropertyType] = useState<string | null>(null);

    function tryToOpenChangePropertyTypeDialog() {
        setIsChangePropertyTypeDialogOpen(true);
    }

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
                                if (item.value == loadCalculatorInputs.property.propertyType) {
                                    return;
                                }

                                setCurrentlyChangingPropertyType(item.value);
                                tryToOpenChangePropertyTypeDialog();
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
                                    imageCdnProvider={ImageCdnProvider.Imgix}
                                />
                            </div>
                            <div>{item.content}</div>
                        </button>
                    )}
                />
            </div>

            <ChangePropertyTypeDialog
                userPreferences={userPreferences}
                loadCalculatorInputs={loadCalculatorInputs}
                dispatch={dispatch}
                currentlyChangingPropertyType={currentlyChangingPropertyType}
                isChangePropertyTypeDialogOpen={isChangePropertyTypeDialogOpen}
                setIsChangePropertyTypeDialogOpen={setIsChangePropertyTypeDialogOpen}
            />
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
                                        <ItemBuilder
                                            items={Object.keys(room.devices.reduce(createGroupByReducer<Device, string>("deviceType"), {})).slice(0, 3)}
                                            itemBuilder={(deviceType, deviceTypeIndex) =>
                                                deviceTypeIndex < 2 || room.devices.length == 3 ? (
                                                    <div
                                                        className="tw-w-6 tw-h-8"
                                                        key={deviceTypeIndex}
                                                    >
                                                        <div className="tw-w-8 tw-h-8 lg-bg-secondary-900 tw-rounded-full tw-outline-3 tw-outline tw-outline-secondary-100-light dark:tw-outline-secondary-100-dark tw-flex tw-flex-col tw-justify-center tw-items-center">
                                                            <object
                                                                data={`https://files.growthjockey.com/livguard/icons/load-calculator/devices/${deviceType}.svg`}
                                                                className="tw-w-5 tw-h-5 tw-invert dark:tw-invert-0"
                                                            />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div
                                                        className="tw-w-6 tw-h-8"
                                                        key={deviceTypeIndex}
                                                    >
                                                        <div className="tw-w-8 tw-h-8 lg-bg-secondary-300 tw-rounded-full tw-outline-3 tw-outline tw-outline-secondary-100-light dark:tw-outline-secondary-100-dark tw-flex tw-flex-col tw-justify-center tw-items-center">
                                                            +{room.devices.length - 2}
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        />
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

function ChangePropertyTypeDialog({
    userPreferences,
    loadCalculatorInputs,
    dispatch,
    currentlyChangingPropertyType,
    isChangePropertyTypeDialogOpen,
    setIsChangePropertyTypeDialogOpen,
}: {
    userPreferences: UserPreferences;
    loadCalculatorInputs: LoadCalculatorInputs;
    dispatch: React.Dispatch<LoadCalculatorInputsAction>;
    currentlyChangingPropertyType: string | null;
    isChangePropertyTypeDialogOpen: boolean;
    setIsChangePropertyTypeDialogOpen: React.Dispatch<boolean>;
}) {
    // const [selectedDevices, setSelectedDevices] = useState<Array<Device>>([]);

    function tryToCloseChangePropertyTypeDialog() {
        setIsChangePropertyTypeDialogOpen(false);
    }

    if (currentlyChangingPropertyType == null) {
        return <></>;
    }

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
            show={isChangePropertyTypeDialogOpen}
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
                onClose={tryToCloseChangePropertyTypeDialog}
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
                            <div className="lg-text-title1">Are you sure you want to leave this section?</div>

                            <VerticalSpacer className="tw-h-4" />

                            <div className="lg-text-body">If you leave now, all your progress will be lost.</div>

                            <VerticalSpacer className="tw-h-8" />

                            <div className="tw-flex tw-flex-row tw-justify-between tw-items-center">
                                <button
                                    type="button"
                                    className=""
                                    onClick={tryToCloseChangePropertyTypeDialog}
                                >
                                    Go Back
                                </button>

                                <button
                                    type="button"
                                    className="lg-cta-button"
                                    onClick={() => {
                                        const action: LoadCalculatorInputsAction = {
                                            actionType: LoadCalculatorInputsActionType.SetPropertyType,
                                            payload: currentlyChangingPropertyType,
                                        };

                                        dispatch(action);

                                        tryToCloseChangePropertyTypeDialog();
                                    }}
                                >
                                    Proceed
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

                            <div className="lg-text-body-bold lg-text-secondary-900">Select Room Type</div>

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

                            <div className="lg-text-body-bold lg-text-secondary-900">Room Name</div>

                            <VerticalSpacer className="tw-h-2" />

                            <input
                                type="text"
                                className="tw-w-full lg-bg-secondary-300 tw-py-4 tw-px-4 tw-rounded-full tw-border tw-border-solid tw-border-secondary-900-light dark:tw-border-secondary-900-dark"
                                value={selectedRoomName}
                                onChange={(e) => setSelectedRoomName(e.target.value)}
                            />

                            <VerticalSpacer className="tw-h-8" />

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
    const [isNewDeviceDialogOpen, setIsNewDeviceDialogOpen] = useState(false);
    const [currentlyAddingDeviceType, setCurrentlyAddingDeviceType] = useState<string | null>(null);
    const [isEditDeviceDialogOpen, setIsEditDeviceDialogOpen] = useState(false);
    const [currentlyEditingDeviceType, setCurrentlyEditingDeviceType] = useState<string | null>(null);

    function tryToCloseEditRoomDialog() {
        setIsEditRoomDialogOpen(false);
    }

    function tryToOpenNewDeviceDialog() {
        setIsNewDeviceDialogOpen(true);
    }

    function tryToOpenEdotDeviceDialog() {
        setIsEditDeviceDialogOpen(true);
    }

    if (currentlyEditingRoomIndex == null) {
        return <></>;
    }

    const room = loadCalculatorInputs.property.rooms[currentlyEditingRoomIndex];
    const groupedDevices = room.devices.reduce(createGroupByReducer<Device, string>("deviceType"), {});
    const deviceTypeToDeviceCounts = Object.entries(groupedDevices).map((kvp) => ({deviceType: kvp[0], deviceCount: kvp[1].length}));

    return (
        <Transition
            show={isEditRoomDialogOpen}
            as={React.Fragment}
            beforeEnter={() => {
                setSelectedRoomName(loadCalculatorInputs.property.propertyName);
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
                            <div className="lg-text-title1">Edit {room.roomName}</div>

                            <VerticalSpacer className="tw-h-4" />

                            <div className="lg-text-body-bold lg-text-secondary-900">Selected Devices</div>

                            <VerticalSpacer className="tw-h-2" />

                            {room.devices.length == 0 ? (
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
                                                onClick={() => {
                                                    // const indexToExclude = selectedDevices.findIndex(device => device.deviceType == deviceTypeToDeviceCount.deviceType);
                                                    // setSelectedDevices([
                                                    //     ...selectedDevices.filter((device, deviceIndex) => deviceIndex != indexToExclude)
                                                    // ]);
                                                    setCurrentlyEditingDeviceType(deviceTypeToDeviceCount.deviceType);
                                                    tryToOpenEdotDeviceDialog();
                                                }}
                                                key={deviceTypeToDeviceCountIndex}
                                            >
                                                <div className="tw-w-8 tw-h-8 lg-bg-secondary-900 tw-rounded-full tw-flex tw-flex-col tw-justify-center tw-items-center">
                                                    <object
                                                        data={`https://files.growthjockey.com/livguard/icons/load-calculator/devices/${deviceTypeToDeviceCount.deviceType}.svg`}
                                                        className="tw-w-5 tw-h-5 tw-invert dark:tw-invert-0"
                                                    />
                                                </div>
                                                <div className="lg-text-icon">
                                                    <div>{getDeviceTypeDetails(deviceTypeToDeviceCount.deviceType).humanReadableString}</div>
                                                    <div>({deviceTypeToDeviceCount.deviceCount}x)</div>
                                                </div>
                                            </button>
                                        )}
                                    />
                                </div>
                            )}

                            <VerticalSpacer className="tw-h-8" />

                            <div className="lg-text-body-bold lg-text-secondary-900">Select Devices</div>

                            <VerticalSpacer className="tw-h-2" />

                            <div className="tw-h-40 tw-overflow-x-visible tw-overflow-y-auto">
                                <ItemBuilder
                                    items={distinct(Object.values(deviceTypeLibrary).map((deviceDetails) => deviceDetails.category))}
                                    itemBuilder={(deviceCategory, deviceCategoryIndex) => (
                                        <React.Fragment key={deviceCategoryIndex}>
                                            <div className="lg-text-body">{deviceCategory}</div>

                                            <VerticalSpacer className="tw-h-2" />

                                            <div className="tw-w-full tw-grid tw-grid-cols-5 tw-gap-x-2 tw-gap-y-2">
                                                <ItemBuilder
                                                    items={Object.entries(deviceTypeLibrary)
                                                        .filter((kvp) => kvp[1].category == deviceCategory)
                                                        .map((kvp) => kvp[0])}
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
                                                            <div className="tw-w-8 tw-h-8 lg-bg-secondary-900 tw-rounded-full tw-flex tw-flex-col tw-justify-center tw-items-center">
                                                                <object
                                                                    data={`https://files.growthjockey.com/livguard/icons/load-calculator/devices/${deviceType}.svg`}
                                                                    className="tw-w-5 tw-h-5 tw-invert dark:tw-invert-0"
                                                                />
                                                            </div>
                                                            <div className="lg-text-icon tw-whitespace-nowrap">{getDeviceTypeDetails(deviceType).humanReadableString}</div>
                                                        </button>
                                                    )}
                                                />
                                            </div>
                                        </React.Fragment>
                                    )}
                                    spaceBuilder={(spaceIndex) => (
                                        <VerticalSpacer
                                            className="tw-h-4"
                                            key={spaceIndex}
                                        />
                                    )}
                                />
                            </div>

                            <VerticalSpacer className="tw-h-8" />

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

                            <EditDeviceDialog
                                userPreferences={userPreferences}
                                loadCalculatorInputs={loadCalculatorInputs}
                                dispatch={dispatch}
                                currentlyEditingRoomIndex={currentlyEditingRoomIndex}
                                currentlyEditingDeviceType={currentlyEditingDeviceType}
                                setCurrentlyEditingDeviceType={setCurrentlyEditingDeviceType}
                                isEditDeviceDialogOpen={isEditDeviceDialogOpen}
                                setIsEditDeviceDialogOpen={setIsEditDeviceDialogOpen}
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
    const [quantity, setQuantity] = useState<number>(1);

    function tryToCloseAddDeviceDialog() {
        setIsAddDeviceDialogOpen(false);
    }

    if (currentlyEditingRoomIndex == null || currentlyAddingDeviceType == null) {
        return <></>;
    }

    return (
        <Transition
            show={isAddDeviceDialogOpen}
            as={React.Fragment}
            beforeEnter={() => {
                setQuantity(1);
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
                            <div className="lg-text-title1">Add {getDeviceTypeDetails(currentlyAddingDeviceType).humanReadableString}</div>

                            <VerticalSpacer className="tw-h-4" />

                            <div className="lg-text-body-bold">Select Quantity</div>

                            <VerticalSpacer className="tw-h-2" />

                            <div className="tw-grid tw-grid-cols-[5rem_minmax(0,1fr)_5rem] tw-items-center">
                                <div className="tw-row-start-1 tw-col-start-1 lg-bg-primary-500 tw-w-9 tw-h-9 tw-ml-2 tw-rounded-full tw-z-10" />

                                <input
                                    type="number"
                                    className="tw-row-start-1 tw-col-start-1 tw-col-span-3 lg-text-input tw-text-center"
                                    value={quantity}
                                    onChange={(e) => {
                                        const newQuantity = safeParse(getIntegerFromUnknown, e.target.value);
                                        if (newQuantity == null || newQuantity < 1 || newQuantity > 9) {
                                            return;
                                        }

                                        setQuantity(newQuantity);
                                    }}
                                />

                                <div className="tw-row-start-1 tw-col-start-3 tw-flex tw-flex-row tw-mr-4">
                                    <button
                                        className="tw-w-8 tw-h-8 tw-bg-secondary-700-dark tw-text-secondary-300-dark tw-flex tw-flex-col tw-items-center tw-justify-center tw-rounded-l-lg"
                                        onClick={() => {
                                            const newQuantity = quantity - 1;
                                            if (newQuantity < 1) {
                                                return;
                                            }

                                            setQuantity(newQuantity);
                                        }}
                                    >
                                        -
                                    </button>

                                    <button
                                        className="tw-w-8 tw-h-8 tw-bg-secondary-700-dark tw-text-secondary-300-dark tw-flex tw-flex-col tw-items-center tw-justify-center tw-rounded-r-lg tw-border-l tw-border-solid tw-border-secondary-300-dark"
                                        onClick={() => {
                                            const newQuantity = quantity + 1;
                                            if (newQuantity > 9) {
                                                return;
                                            }

                                            setQuantity(newQuantity);
                                        }}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <VerticalSpacer className="tw-h-4" />

                            <div className="tw-flex tw-flex-row tw-justify-center tw-items-center tw-gap-x-2">
                                <div className="lg-text-title2 tw-whitespace-nowrap">Power Draw: {getDeviceTypeDetails(currentlyAddingDeviceType).wattage * quantity} Watts</div>
                                <div className="lg-text-body">({getDeviceTypeDetails(currentlyAddingDeviceType).wattage} Watts per Device)</div>
                            </div>

                            <VerticalSpacer className="tw-h-8" />

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
                                            actionType: LoadCalculatorInputsActionType.AddDevices,
                                            payload: {
                                                roomIndex: currentlyEditingRoomIndex,
                                                devices: getIntegerArrayOfLength(quantity).map((index) => device),
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

function EditDeviceDialog({
    userPreferences,
    loadCalculatorInputs,
    dispatch,
    currentlyEditingRoomIndex,
    currentlyEditingDeviceType,
    setCurrentlyEditingDeviceType,
    isEditDeviceDialogOpen,
    setIsEditDeviceDialogOpen,
}: {
    userPreferences: UserPreferences;
    loadCalculatorInputs: LoadCalculatorInputs;
    dispatch: React.Dispatch<LoadCalculatorInputsAction>;
    currentlyEditingRoomIndex: number | null;
    currentlyEditingDeviceType: string | null;
    setCurrentlyEditingDeviceType: React.Dispatch<string | null>;
    isEditDeviceDialogOpen: boolean;
    setIsEditDeviceDialogOpen: React.Dispatch<boolean>;
}) {
    function tryToCloseEditDeviceDialog() {
        setIsEditDeviceDialogOpen(false);
    }

    if (currentlyEditingRoomIndex == null || currentlyEditingDeviceType == null) {
        return <></>;
    }

    const room = loadCalculatorInputs.property.rooms[currentlyEditingRoomIndex];
    const groupedDevices = room.devices.reduce(createGroupByReducer<Device, string>("deviceType"), {});

    const quantity = groupedDevices[currentlyEditingDeviceType].length;

    return (
        <Transition
            show={isEditDeviceDialogOpen}
            as={React.Fragment}
        >
            <Dialog
                as="div"
                className="tw-relative tw-z-50"
                onClose={tryToCloseEditDeviceDialog}
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
                            <div className="lg-text-title1">Edit {getDeviceTypeDetails(currentlyEditingDeviceType).humanReadableString}</div>

                            <VerticalSpacer className="tw-h-4" />

                            <div className="lg-text-body-bold">Quantity Selected</div>

                            <VerticalSpacer className="tw-h-2" />

                            <div className="tw-grid tw-grid-cols-[5rem_minmax(0,1fr)_5rem] tw-items-center">
                                <div className="tw-row-start-1 tw-col-start-1 lg-bg-primary-500 tw-w-9 tw-h-9 tw-ml-2 tw-rounded-full tw-z-10" />

                                <input
                                    type="number"
                                    className="tw-row-start-1 tw-col-start-1 tw-col-span-3 lg-text-input tw-text-center"
                                    value={quantity}
                                    disabled={true}
                                    // onChange={(e) => {
                                    //     const newQuantity = safeParse(getIntegerFromUnknown, e.target.value);
                                    //     if (newQuantity == null || newQuantity < 1 || newQuantity > 9) {
                                    //         return;
                                    //     }

                                    //     setQuantity(newQuantity);
                                    // }}
                                />

                                {/* <div className="tw-row-start-1 tw-col-start-3 tw-flex tw-flex-row tw-mr-4">
                                    <button
                                        className="tw-w-8 tw-h-8 tw-bg-secondary-700-dark tw-text-secondary-300-dark tw-flex tw-flex-col tw-items-center tw-justify-center tw-rounded-l-lg"
                                        // onClick={() => {
                                        //     const newQuantity = quantity - 1;
                                        //     if (newQuantity < 1) {
                                        //         return;
                                        //     }

                                        //     setQuantity(newQuantity);
                                        // }}
                                    >
                                        -
                                    </button>

                                    <button
                                        className="tw-w-8 tw-h-8 tw-bg-secondary-700-dark tw-text-secondary-300-dark tw-flex tw-flex-col tw-items-center tw-justify-center tw-rounded-r-lg tw-border-l tw-border-solid tw-border-secondary-300-dark"
                                        // onClick={() => {
                                        //     const newQuantity = quantity + 1;
                                        //     if (newQuantity > 9) {
                                        //         return;
                                        //     }

                                        //     setQuantity(newQuantity);
                                        // }}
                                    >
                                        +
                                    </button>
                                </div> */}
                            </div>

                            <VerticalSpacer className="tw-h-4" />

                            <div className="tw-flex tw-flex-row tw-justify-center tw-items-center tw-gap-x-2">
                                <div className="lg-text-title2 tw-whitespace-nowrap">Power Draw: {getDeviceTypeDetails(currentlyEditingDeviceType).wattage * quantity} Watts</div>
                                <div className="lg-text-body">({getDeviceTypeDetails(currentlyEditingDeviceType).wattage} Watts per Device)</div>
                            </div>

                            <VerticalSpacer className="tw-h-8" />

                            <div className="tw-flex tw-flex-row tw-justify-between tw-items-center">
                                <button
                                    type="button"
                                    className=""
                                    onClick={tryToCloseEditDeviceDialog}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    className="lg-cta-button"
                                    // disabled={selectedRoomName.length == 0}
                                    onClick={() => {
                                        const loadCalculatorInputsAction: LoadCalculatorInputsAction = {
                                            actionType: LoadCalculatorInputsActionType.RemoveDevice,
                                            payload: {
                                                roomIndex: currentlyEditingRoomIndex,
                                                deviceType: currentlyEditingDeviceType,
                                            },
                                        };

                                        dispatch(loadCalculatorInputsAction);

                                        setCurrentlyEditingDeviceType(null);
                                        tryToCloseEditDeviceDialog();
                                    }}
                                >
                                    Delete Device
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

            <VerticalSpacer className="tw-h-8" />

            <div className="tw-flex tw-flex-row tw-items-center tw-gap-x-2">
                <div className="tw-flex-none">Average Consumption</div>
                <InformationCircleIcon
                    className="tw-w-4 tw-h-4 tw-flex-none"
                    title="How much power you expect to consume"
                />
                <EmptyFlexFiller />
                <div className="tw-flex-none lg-text-body-bold lg-text-secondary-900">{loadCalculatorInputs.averageConsumption}%</div>
            </div>

            <VerticalSpacer className="tw-h-4" />

            <div className="tw-grid tw-grid-cols-[3rem_minmax(0,1fr)_3rem] tw-items-center">
                <input
                    type="range"
                    min="20"
                    max="100"
                    value={loadCalculatorInputs.averageConsumption}
                    onChange={(e) => {
                        const newAverageConsumption = safeParse(getIntegerFromUnknown, e.target.value);
                        if (newAverageConsumption == null || newAverageConsumption < 20 || newAverageConsumption > 100) {
                            return;
                        }

                        const action: LoadCalculatorInputsAction = {
                            actionType: LoadCalculatorInputsActionType.ChangeAverageConsumption,
                            payload: newAverageConsumption,
                        };

                        dispatch(action);
                    }}
                    className="tw-row-start-1 tw-col-start-1 tw-col-span-3 lg-range-input"
                />

                <div className="tw-row-start-1 tw-col-start-1 tw-relative tw-top-4 lg-text-icon">20%</div>
                <div className="tw-row-start-1 tw-col-start-3 tw-justify-self-end tw-relative tw-top-4 lg-text-icon">100%</div>
                {/* <div className="tw-row-start-1 tw-col-start-3 tw-justify-self-end tw-relative -tw-top-8">{loadCalculatorInputs.averageConsumption}%</div> */}
            </div>
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

export const deviceTypeLibrary: {[id: string]: {humanReadableString: string; category: string; wattage: number}} = {
    "a8450049-3fe8-4b8c-8796-fc3982a5e1ed": {
        humanReadableString: "LED",
        category: "Lighting",
        wattage: 5,
    },
    "2b74d3cf-6fc2-4c9e-b264-e1865138c394": {
        humanReadableString: "CFL",
        category: "Lighting",
        wattage: 22.5,
    },
    "43150663-bea9-4fa9-b273-1b92212f5d30": {
        humanReadableString: "Bulb",
        category: "Lighting",
        wattage: 65,
    },
    "aba012ef-4a0a-438f-afbe-8fcb92a95c6b": {
        humanReadableString: "Tubelight",
        category: "Lighting",
        wattage: 30,
    },
    "89066719-efd8-4e7e-be1c-16da3fc57330": {
        humanReadableString: "Table Lamp",
        category: "Lighting",
        wattage: 60,
    },
    "e289b9e5-78b3-44e9-86f3-ed0068f0addf": {
        humanReadableString: "Panel Lights",
        category: "Lighting",
        wattage: 14,
    },
    "97712354-86b6-4863-be85-e3d6d564b882": {
        humanReadableString: "Television",
        category: "Home Appliances",
        wattage: 180,
    },
    "003f0bae-1065-416e-8330-b82b732624ed": {
        humanReadableString: "Iron",
        category: "Home Appliances",
        wattage: 1280,
    },
    "d915052b-e216-4dbd-8fba-055d1b4af551": {
        humanReadableString: "Hair Appliances",
        category: "Home Appliances",
        wattage: 1600,
    },
    "f167dc54-7599-45ac-bd4e-e99393870267": {
        humanReadableString: "Fan",
        category: "Home Appliances",
        wattage: 60,
    },
    "f0896a88-d01f-44e3-8004-53a9bc5ad603": {
        humanReadableString: "Printer",
        category: "Home Appliances",
        wattage: 128,
    },
    "152594ae-c517-4e75-8f1e-8a58301f2ff3": {
        humanReadableString: "Computer",
        category: "Home Appliances",
        wattage: 200,
    },
    "ddef3ea3-c364-47c8-a3de-2af0a685ac95": {
        humanReadableString: "Set Top Box",
        category: "Home Appliances",
        wattage: 50,
    },
    "360aae7f-2bd0-4cb9-8083-df636906c55a": {
        humanReadableString: "Router",
        category: "Home Appliances",
        wattage: 25,
    },
    "75c95a14-5df5-4a15-bc31-03ce4f2f07b0": {
        humanReadableString: "Speaker",
        category: "Home Appliances",
        wattage: 80,
    },
    "3a401059-08d9-464b-9e56-e280a1c9919d": {
        humanReadableString: "Fridge",
        category: "Kitchen Appliances",
        wattage: 335,
    },
    "87702654-5068-44f5-befc-814fcb4da640": {
        humanReadableString: "Microwave Oven",
        category: "Kitchen Appliances",
        wattage: 800,
    },
    "2bf7a137-3aeb-456b-8a7c-8ae1aef146e2": {
        humanReadableString: "Mixer/Grinder",
        category: "Kitchen Appliances",
        wattage: 700,
    },
    "6e6ebc73-5deb-4c2f-b7f3-f6d596385d4e": {
        humanReadableString: "Water Purifier",
        category: "Kitchen Appliances",
        wattage: 90,
    },
    "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf": {
        humanReadableString: "Exhuast Fan",
        category: "Kitchen Appliances",
        wattage: 40,
    },
    "41ea7450-3f3b-41b8-b701-bfadac047e56": {
        humanReadableString: "Coffee Maker",
        category: "Kitchen Appliances",
        wattage: 1300,
    },
    "2091dc25-6837-483b-a6d1-8b2a43e13957": {
        humanReadableString: "Dishwasher",
        category: "Kitchen Appliances",
        wattage: 1800,
    },
    "d7a85e3a-3b8c-4f93-99ec-dce310df2713": {
        humanReadableString: "Induction Cooktop",
        category: "Kitchen Appliances",
        wattage: 2500,
    },
    "56b3b38d-ca34-4bda-a1c1-fe6b5032e122": {
        humanReadableString: "Air Conditioner",
        category: "Heavy Load Appliances",
        wattage: 1600,
    },
    "fbbb26c8-2550-4a31-b7c0-2720f72ede55": {
        humanReadableString: "Washing Machine",
        category: "Heavy Load Appliances",
        wattage: 600,
    },
    "a54d76f2-1ccb-4769-aa3d-5eaafd44843d": {
        humanReadableString: "Dessert Cooler",
        category: "Heavy Load Appliances",
        wattage: 380,
    },
    "56c4df60-b175-4c71-bcc9-ecfd2b5bc68a": {
        humanReadableString: "Geyser",
        category: "Heavy Load Appliances",
        wattage: 1800,
    },
    "59f3154c-0433-4086-8417-45f8e4fa0f3d": {
        humanReadableString: "Air Purifier",
        category: "Heavy Load Appliances",
        wattage: 215,
    },
    "1c9f3a15-34cf-4cde-83d8-3a06fdf26661": {
        humanReadableString: "Game Console",
        category: "Heavy Load Appliances",
        wattage: 75,
    },
    "54933747-ce3f-4f00-a003-a98eda1ce406": {
        humanReadableString: "Vacuum Cleaner",
        category: "Heavy Load Appliances",
        wattage: 900,
    },
    "966dafd8-21e7-448a-970e-38b0bebf8122": {
        humanReadableString: "Heater",
        category: "Heavy Load Appliances",
        wattage: 1400,
    },
    "276efb37-0741-419f-a743-725022423dc1": {
        humanReadableString: "Kettle",
        category: "Heavy Load Appliances",
        wattage: 1200,
    },
    "a36ecf7f-a597-4a46-a12e-44c82b5b8f56": {
        humanReadableString: "Toaster",
        category: "Heavy Load Appliances",
        wattage: 1200,
    },
    "0a85d525-7268-4aef-81bd-23e1246ddbfb": {
        humanReadableString: "Charger",
        category: "Accessories",
        wattage: 40,
    },
    "01bc2756-1b2b-4250-a927-c4c0722f5686": {
        humanReadableString: "CCTV Camera",
        category: "Accessories",
        wattage: 15,
    },
};

function enumFromStringValue<T>(enm: {[s: string]: T}, input: string): T | null {
    return (Object.values(enm) as unknown as string[]).includes(input) ? (input as unknown as T) : null;
}

export type LoadCalculatorInputs = {
    property: Property;
    backupHours: number;
    averageConsumption: number;
};

enum LoadCalculatorInputsActionType {
    SetPropertyType,
    AddRoom,
    // TODO: Remove this?
    EditRoom,
    AddDevices,
    RemoveDevice,
    ChangeBackupHours,
    ChangeAverageConsumption,
}

type LoadCalculatorInputsAction = {
    actionType: LoadCalculatorInputsActionType;
    payload: any;
};

export type Property = {
    propertyType: PropertyType;
    propertyName: string;
    rooms: Array<Room>;
};

export type Room = {
    roomType: string;
    roomName: string;
    devices: Array<Device>;
};

export type Device = {
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

            newState.property = propertyTemplates[propertyType];

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
        case LoadCalculatorInputsActionType.AddDevices: {
            // TODO: Validate that these exist?
            const roomIndex = action.payload.roomIndex;
            const devices = action.payload.devices;

            const newState: LoadCalculatorInputs = structuredClone(state);

            newState.property.rooms[roomIndex].devices.push(...devices);

            return newState;
        }
        case LoadCalculatorInputsActionType.RemoveDevice: {
            // TODO: Validate that these exist?
            const roomIndex = action.payload.roomIndex;
            const deviceType = action.payload.deviceType;

            const newState: LoadCalculatorInputs = structuredClone(state);

            newState.property.rooms[roomIndex].devices = newState.property.rooms[roomIndex].devices.filter((device) => device.deviceType != deviceType);
            console.log(newState.property.rooms[roomIndex].devices);

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
        property: propertyTemplates[propertyType],
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

const propertyTemplates: {[propertyType: string]: Property} = {
    "1-bhk": {
        propertyName: "",
        propertyType: PropertyType.OneBhk,
        rooms: [
            {
                roomName: "Bedroom 1",
                roomType: "dda75244-60f2-40e8-8936-d4ea2ae25f34",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Kitchen",
                roomType: "71824c29-731e-4625-9c66-cfde9763a46a",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                    {
                        // Fridge
                        deviceType: "3a401059-08d9-464b-9e56-e280a1c9919d",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Washroom",
                roomType: "be1a5624-4f6d-49b1-a7ea-45fdde15b0e8",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Hall",
                roomType: "c55cef3d-ea14-4810-926c-eac96452906d",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Router
                        deviceType: "360aae7f-2bd0-4cb9-8083-df636906c55a",
                        deviceDetails: {},
                    },
                ],
            },
        ],
    },
    "2-bhk": {
        propertyName: "",
        propertyType: PropertyType.TwoBhk,
        rooms: [
            {
                roomName: "Bedroom 1",
                roomType: "dda75244-60f2-40e8-8936-d4ea2ae25f34",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Bedroom 2",
                roomType: "dda75244-60f2-40e8-8936-d4ea2ae25f34",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Kitchen",
                roomType: "71824c29-731e-4625-9c66-cfde9763a46a",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                    {
                        // Fridge
                        deviceType: "3a401059-08d9-464b-9e56-e280a1c9919d",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Washroom",
                roomType: "be1a5624-4f6d-49b1-a7ea-45fdde15b0e8",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Hall",
                roomType: "c55cef3d-ea14-4810-926c-eac96452906d",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Router
                        deviceType: "360aae7f-2bd0-4cb9-8083-df636906c55a",
                        deviceDetails: {},
                    },
                    {
                        // Television
                        deviceType: "97712354-86b6-4863-be85-e3d6d564b882",
                        deviceDetails: {},
                    },
                    {
                        // Set top box
                        deviceType: "ddef3ea3-c364-47c8-a3de-2af0a685ac95",
                        deviceDetails: {},
                    },
                ],
            },
        ],
    },
    "3-bhk": {
        propertyName: "",
        propertyType: PropertyType.ThreeBhk,
        rooms: [
            {
                roomName: "Bedroom 1",
                roomType: "dda75244-60f2-40e8-8936-d4ea2ae25f34",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Bedroom 2",
                roomType: "dda75244-60f2-40e8-8936-d4ea2ae25f34",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Bedroom 3",
                roomType: "dda75244-60f2-40e8-8936-d4ea2ae25f34",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Kitchen",
                roomType: "71824c29-731e-4625-9c66-cfde9763a46a",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                    {
                        // Fridge
                        deviceType: "3a401059-08d9-464b-9e56-e280a1c9919d",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Washroom",
                roomType: "be1a5624-4f6d-49b1-a7ea-45fdde15b0e8",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Washroom",
                roomType: "be1a5624-4f6d-49b1-a7ea-45fdde15b0e8",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Hall",
                roomType: "c55cef3d-ea14-4810-926c-eac96452906d",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Router
                        deviceType: "360aae7f-2bd0-4cb9-8083-df636906c55a",
                        deviceDetails: {},
                    },
                    {
                        // Television
                        deviceType: "97712354-86b6-4863-be85-e3d6d564b882",
                        deviceDetails: {},
                    },
                    {
                        // Set top box
                        deviceType: "ddef3ea3-c364-47c8-a3de-2af0a685ac95",
                        deviceDetails: {},
                    },
                ],
            },
        ],
    },
    "4-bhk": {
        propertyName: "",
        propertyType: PropertyType.FourBhk,
        rooms: [
            {
                roomName: "Bedroom 1",
                roomType: "dda75244-60f2-40e8-8936-d4ea2ae25f34",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                    {
                        // Air conditioner
                        deviceType: "56b3b38d-ca34-4bda-a1c1-fe6b5032e122",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Bedroom 2",
                roomType: "dda75244-60f2-40e8-8936-d4ea2ae25f34",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                    {
                        // Air conditioner
                        deviceType: "56b3b38d-ca34-4bda-a1c1-fe6b5032e122",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Bedroom 3",
                roomType: "dda75244-60f2-40e8-8936-d4ea2ae25f34",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Bedroom 4",
                roomType: "dda75244-60f2-40e8-8936-d4ea2ae25f34",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Kitchen",
                roomType: "71824c29-731e-4625-9c66-cfde9763a46a",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                    {
                        // Fridge
                        deviceType: "3a401059-08d9-464b-9e56-e280a1c9919d",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Washroom",
                roomType: "be1a5624-4f6d-49b1-a7ea-45fdde15b0e8",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Washroom",
                roomType: "be1a5624-4f6d-49b1-a7ea-45fdde15b0e8",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Hall",
                roomType: "c55cef3d-ea14-4810-926c-eac96452906d",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Router
                        deviceType: "360aae7f-2bd0-4cb9-8083-df636906c55a",
                        deviceDetails: {},
                    },
                    {
                        // Television
                        deviceType: "97712354-86b6-4863-be85-e3d6d564b882",
                        deviceDetails: {},
                    },
                    {
                        // Set top box
                        deviceType: "ddef3ea3-c364-47c8-a3de-2af0a685ac95",
                        deviceDetails: {},
                    },
                ],
            },
        ],
    },
    villa: {
        propertyName: "",
        propertyType: PropertyType.Villa,
        rooms: [
            {
                roomName: "Bedroom 1",
                roomType: "dda75244-60f2-40e8-8936-d4ea2ae25f34",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                    {
                        // Air conditioner
                        deviceType: "56b3b38d-ca34-4bda-a1c1-fe6b5032e122",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Bedroom 2",
                roomType: "dda75244-60f2-40e8-8936-d4ea2ae25f34",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                    {
                        // Air conditioner
                        deviceType: "56b3b38d-ca34-4bda-a1c1-fe6b5032e122",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Bedroom 3",
                roomType: "dda75244-60f2-40e8-8936-d4ea2ae25f34",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                    {
                        // Air conditioner
                        deviceType: "56b3b38d-ca34-4bda-a1c1-fe6b5032e122",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Bedroom 4",
                roomType: "dda75244-60f2-40e8-8936-d4ea2ae25f34",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                    {
                        // Air conditioner
                        deviceType: "56b3b38d-ca34-4bda-a1c1-fe6b5032e122",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Bedroom 5",
                roomType: "dda75244-60f2-40e8-8936-d4ea2ae25f34",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Bedroom 6",
                roomType: "dda75244-60f2-40e8-8936-d4ea2ae25f34",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Bedroom 7",
                roomType: "dda75244-60f2-40e8-8936-d4ea2ae25f34",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Bedroom 8",
                roomType: "dda75244-60f2-40e8-8936-d4ea2ae25f34",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Charger
                        deviceType: "0a85d525-7268-4aef-81bd-23e1246ddbfb",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Kitchen",
                roomType: "71824c29-731e-4625-9c66-cfde9763a46a",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                    {
                        // Fridge
                        deviceType: "3a401059-08d9-464b-9e56-e280a1c9919d",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Washroom",
                roomType: "be1a5624-4f6d-49b1-a7ea-45fdde15b0e8",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Washroom",
                roomType: "be1a5624-4f6d-49b1-a7ea-45fdde15b0e8",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Washroom",
                roomType: "be1a5624-4f6d-49b1-a7ea-45fdde15b0e8",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Washroom",
                roomType: "be1a5624-4f6d-49b1-a7ea-45fdde15b0e8",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Exhaust fan
                        deviceType: "33bbcf19-e0cb-4eb6-8379-5c5226c2e8bf",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Hall",
                roomType: "c55cef3d-ea14-4810-926c-eac96452906d",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Router
                        deviceType: "360aae7f-2bd0-4cb9-8083-df636906c55a",
                        deviceDetails: {},
                    },
                    {
                        // Television
                        deviceType: "97712354-86b6-4863-be85-e3d6d564b882",
                        deviceDetails: {},
                    },
                    {
                        // Set top box
                        deviceType: "ddef3ea3-c364-47c8-a3de-2af0a685ac95",
                        deviceDetails: {},
                    },
                ],
            },
            {
                roomName: "Hall",
                roomType: "c55cef3d-ea14-4810-926c-eac96452906d",
                devices: [
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // LED
                        deviceType: "a8450049-3fe8-4b8c-8796-fc3982a5e1ed",
                        deviceDetails: {},
                    },
                    {
                        // Tubelight
                        deviceType: "aba012ef-4a0a-438f-afbe-8fcb92a95c6b",
                        deviceDetails: {},
                    },
                    {
                        // Ceiling fan
                        deviceType: "f167dc54-7599-45ac-bd4e-e99393870267",
                        deviceDetails: {},
                    },
                    {
                        // Router
                        deviceType: "360aae7f-2bd0-4cb9-8083-df636906c55a",
                        deviceDetails: {},
                    },
                    {
                        // Television
                        deviceType: "97712354-86b6-4863-be85-e3d6d564b882",
                        deviceDetails: {},
                    },
                    {
                        // Set top box
                        deviceType: "ddef3ea3-c364-47c8-a3de-2af0a685ac95",
                        deviceDetails: {},
                    },
                ],
            },
        ],
    },
    custom: {
        propertyName: "",
        propertyType: PropertyType.Custom,
        rooms: [],
    },
};
