import {Dialog, Transition} from "@headlessui/react";
import React from "react";
import {X} from "react-bootstrap-icons";
import {CoverImage} from "~/components/images/coverImage";
import {UserPreferences} from "~/typeDefinitions";

export function FindTheThiefDialog({
    isDialogOpen,
    setIsDialogOpen,
    userPreferences,
    children,
    showSunraysPattern,
}: {
    isDialogOpen: boolean;
    setIsDialogOpen: React.Dispatch<boolean>;
    userPreferences: UserPreferences;
    children: any;
    showSunraysPattern?: boolean;
}) {
    function tryToCloseDialog() {
        setIsDialogOpen(false);
    }

    return (
        <Transition
            as={React.Fragment}
            show={isDialogOpen}
        >
            <Dialog
                as="div"
                className="tw-relative tw-z-[64] tw-w-full"
                onClose={tryToCloseDialog}
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
                    {showSunraysPattern == null || showSunraysPattern === false ? (
                        <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-[55%] tw-backdrop-blur" />
                    ) : (
                        <div className="tw-fixed tw-inset-0 tw-z-10 tw-bg-black tw-bg-opacity-[80%] tw-backdrop-blur">
                            <CoverImage relativePath="/livguard/find-the-thief/step-2-pattern.png" />
                        </div>
                    )}
                </Transition.Child>

                <Dialog.Panel className="lg-px-screen-edge tw-fixed tw-inset-0 tw-grid tw-grid-rows-[minmax(1.5rem,1fr)_auto_minmax(0,1fr)] lg:tw-grid-rows-[minmax(0,1fr)_auto_minmax(0,1fr)] tw-grid-cols-1 tw-justify-center tw-items-center tw-z-20">
                    <div onClick={tryToCloseDialog} />

                    <Transition.Child
                        as={React.Fragment}
                        enter="tw-ease-out tw-transition-all tw-duration-200"
                        enterFrom="tw-opacity-0"
                        enterTo="tw-opacity-full"
                        leave="tw-ease-in tw-transition-all tw-duration-200"
                        leaveFrom="tw-opacity-full"
                        leaveTo="tw-opacity-0"
                    >
                        <div className="tw-w-fit tw-inset-0 tw-m-auto lg:tw-max-w-4xl tw-h-full tw-grid tw-relative">
                            <button
                                onClick={() => setIsDialogOpen(false)}
                                className="tw-absolute -tw-top-5 -tw-right-5 tw-h-10 tw-w-10 lg-bg-secondary-100 lg-card tw-grid tw-place-items-center tw-z-30"
                            >
                                <X className="tw-h-6 tw-w-6" />
                            </button>
                            <div className="tw-max-h-full tw-overflow-auto">{children}</div>
                        </div>
                    </Transition.Child>
                </Dialog.Panel>
            </Dialog>
        </Transition>
    );
}
