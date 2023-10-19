import {Dialog, Transition} from "@headlessui/react";
import {Link} from "@remix-run/react";
import React, {useContext} from "react";
import {X} from "react-bootstrap-icons";
import {ContentProviderContext} from "~/contexts/contentProviderContext";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";

export default function SupportDialog({isSupportDialogOpen, tryToCloseSupportDialog}: {isSupportDialogOpen: boolean; tryToCloseSupportDialog: () => void}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <Transition
            show={isSupportDialogOpen}
            as={React.Fragment}
        >
            <Dialog
                as="div"
                className="tw-relative tw-z-[60] tw-w-full"
                onClose={tryToCloseSupportDialog}
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
                    <div onClick={tryToCloseSupportDialog} />

                    <Transition.Child
                        as={React.Fragment}
                        enter="tw-ease-out tw-transition-all tw-duration-200"
                        enterFrom="tw-opacity-0"
                        enterTo="tw-opacity-full"
                        leave="tw-ease-in tw-transition-all tw-duration-200"
                        leaveFrom="tw-opacity-full"
                        leaveTo="tw-opacity-0"
                    >
                        <div className="tw-w-full lg:tw-max-w-[30rem] tw-mx-auto lg-card lg-bg-secondary-100 tw-px-6 tw-py-6 tw-rounded-lg tw-flex tw-flex-col">
                            <div className="tw-grid tw-grid-cols-[1.5rem_minmax(0,1fr)_1.5rem]">
                                <div className="tw-row-start-1 tw-col-start-2 tw-w-full tw-text-center lg-text-headline">{contentData.getContent("headerMenuS2T1")}</div>
                                <button
                                    type="button"
                                    onClick={tryToCloseSupportDialog}
                                    className="tw-row-start-1 tw-col-start-3"
                                >
                                    <X className="tw-w-6 tw-h-6" />
                                </button>
                            </div>

                            <VerticalSpacer className="tw-h-4" />

                            <div className="lg-text-title2">{contentData.getContent("1e2cde6f-fb53-4b4a-8044-6aae22b4c361")}</div>

                            <VerticalSpacer className="tw-h-2" />

                            <Link
                                to="tel:1800-1025-551"
                                className="tw-w-full lg-bg-primary-500 tw-text-secondary-900-dark tw-py-3 tw-px-4 tw-rounded-full"
                            >
                                <div className="tw-flex tw-flex-row tw-items-center">
                                    <div className="tw-flex-1">1800-1025-551</div>

                                    <img
                                        className="tw-w-6 tw-h-6 tw-flex-0"
                                        src="https://files.growthjockey.com/livguard/icons/contact-us/call-us-dialog.svg"
                                        alt="call-us"
                                    />
                                </div>
                            </Link>

                            <VerticalSpacer className="tw-h-4" />

                            <div className="lg-text-title2">{contentData.getContent("SupportS2Option2ButtonText")}</div>

                            <VerticalSpacer className="tw-h-2" />

                            <Link
                                to="https://api.whatsapp.com/send?phone=9599198444"
                                className="tw-w-full lg-bg-primary-500 tw-text-secondary-900-dark tw-py-3 tw-px-4 tw-rounded-full"
                            >
                                <div className="tw-flex tw-flex-row tw-items-center">
                                    <div className="tw-flex-1">{"+91 95991-98444"}</div>

                                    <img
                                        className="tw-w-6 tw-h-6 tw-flex-0"
                                        src="https://files.growthjockey.com/livguard/icons/contact-us/whatsapp-us-dialog.svg"
                                    />
                                </div>
                            </Link>

                            <VerticalSpacer className="tw-h-4" />

                            <div className="lg-text-title2">{contentData.getContent("headerSupportDialogT3")}</div>

                            <VerticalSpacer className="tw-h-2" />

                            <Link
                                to="tel:9205667999"
                                className="tw-w-full lg-bg-primary-500 tw-text-secondary-900-dark tw-py-3 tw-px-4 tw-rounded-full"
                            >
                                <div className="tw-flex tw-flex-row tw-items-center">
                                    <div className="tw-flex-1">{9205667999}</div>

                                    <img
                                        className="tw-w-6 tw-h-6 tw-flex-0"
                                        src="https://files.growthjockey.com/livguard/icons/contact-us/call-us-dialog.svg"
                                        alt="call-us"
                                    />
                                </div>
                            </Link>
                        </div>
                    </Transition.Child>
                </Dialog.Panel>

                <div onClick={tryToCloseSupportDialog} />
            </Dialog>
        </Transition>
    );
}
