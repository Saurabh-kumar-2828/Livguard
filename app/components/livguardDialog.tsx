import {Dialog, Transition} from "@headlessui/react";
import React from "react";
import {X} from "react-bootstrap-icons";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";

export default function LivguardDialog({isDialogOpen, tryToCloseDialog, beforeEnter, title, children, showCloseIcon}: {isDialogOpen: boolean, tryToCloseDialog: () => void, beforeEnter?: () => void, title?: string | null, children, showCloseIcon: boolean}) {
    return (
        <Transition
            show={isDialogOpen}
            as={React.Fragment}
        >
            <Dialog
                as="div"
                className="tw-relative tw-z-50"
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
                    <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-[55%] tw-backdrop-blur" />
                </Transition.Child>

                <Dialog.Panel className="lg-px-screen-edge tw-py-[var(--lg-px-screen-edge)] tw-fixed tw-inset-0 tw-grid tw-grid-rows-1 tw-grid-cols-1 tw-place-items-center">
                    <Transition.Child
                        as="div"
                        className="tw-w-full tw-max-w-[23rem] tw-max-h-full tw-overflow-y-auto tw-bg-gradient-to-b tw-from-secondary-500-light tw-to-secondary-100-light dark:tw-from-secondary-500-dark dark:tw-to-secondary-100-dark lg-bg-secondary-100 tw-px-6 tw-py-6 tw-rounded-lg tw-flex tw-flex-col lg-secondary-700-scrollbar tw-relative"
                        enter="tw-ease-out tw-transition-all tw-duration-200"
                        enterFrom="tw-opacity-0"
                        enterTo="tw-opacity-full"
                        leave="tw-ease-in tw-transition-all tw-duration-200"
                        leaveFrom="tw-opacity-full"
                        leaveTo="tw-opacity-0"
                        beforeEnter={beforeEnter}
                    >
                        {showCloseIcon &&
                            <button
                                type="button"
                                onClick={tryToCloseDialog}
                                className="lg-bg-secondary-300 tw-rounded-full tw-absolute tw-top-2 tw-right-2"
                            >
                                <X className="tw-w-8 tw-h-8" />
                            </button>
                        }

                        {title == null ? null : (
                            <>
                                <div className="tw-row-start-1 tw-col-start-2 tw-flex-1 tw-text-center lg-text-headline tw-px-8">{title}</div>
                                <VerticalSpacer className="tw-h-4" />
                            </>
                        )}

                        {children}
                    </Transition.Child>
                </Dialog.Panel>
            </Dialog>
        </Transition>
    );
}
