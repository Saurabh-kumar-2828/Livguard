import {Bars3Icon, LanguageIcon} from "@heroicons/react/20/solid";
import {LoaderFunction} from "@remix-run/node";
import {Form, useLoaderData, useSubmit} from "@remix-run/react";
import {useState} from "react";
import {Search, Telephone, X, XCircleFill} from "react-bootstrap-icons";
import {HorizontalSpacer} from "~/global-common-typescript/components/horizontalSpacer";
import {Language, UserPreferences} from "~/typeDefinitions";
import {getUrlFromRequest} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";
import {Dialog, Transition} from "@headlessui/react";
import React from "react";
import {FixedHeightImage} from "~/global-common-typescript/components/fixedHeightImage";
import {ImageCdnProvider} from "~/global-common-typescript/components/growthJockeyImage";
import {FixedWidthImage} from "~/global-common-typescript/components/fixedWidthImage";
import {FullWidthImage} from "~/global-common-typescript/components/fullWidthImage";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";

export function HeaderComponent({userPreferences, redirectTo}: {userPreferences: UserPreferences; redirectTo: string}) {
    const submit = useSubmit();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="tw-flex tw-flex-col tw-items-stretch tw-sticky tw-top-0 tw-z-50">
            <div className="tw-flex tw-flex-row tw-items-center lg-bg-secondary-300 lg-px-screen-edge tw-py-3">
                <div>{getVernacularString("headerS1T1", userPreferences.language)}</div>
                <div className="tw-flex-1" />
                <div className="tw-w-px tw-h-6 lg-bg-secondary-900" />
                <div className="tw-flex-1" />
                <LanguageIcon className="tw-w-6 tw-h-6" />
                <div>
                    <Form
                        method="post"
                        action="/set-language"
                        onChange={(e) => {
                            submit(e.currentTarget, {replace: true});
                        }}
                    >
                        <select name="language" className="lg-bg-secondary-300 lg-text-secondary-900 tw-px-2 tw-appearance-none" defaultValue={userPreferences.language}>
                            <option value={Language.English} className="lg-bg-secondary-100">
                                English
                            </option>
                            <option value={Language.Hindi} className="lg-bg-secondary-100">
                                हिंदी
                            </option>
                            <option value={Language.Marathi} className="lg-bg-secondary-100">
                                मराठी
                            </option>
                        </select>

                        <input type="text" name="redirectTo" value={redirectTo} readOnly className="tw-hidden" />
                    </Form>
                </div>
            </div>

            <div className="lg-px-screen-edge tw-py-4 lg-bg-background-500 tw-flex tw-flex-row tw-items-center">
                <button onClick={() => setIsMenuOpen(true)}>
                    <Bars3Icon className="tw-w-6 tw-h-6" />
                </button>
                <HorizontalSpacer className="tw-w-2" />
                <FixedHeightImage relativePath="/livguard/logo-256.png" height="1.5rem" imageCdnProvider={ImageCdnProvider.Imgix} />

                <div className="tw-flex-1" />

                <Search className="tw-w-6 tw-h-6" />
                <HorizontalSpacer className="tw-w-2" />
                <div>{getVernacularString("headerS2T1", userPreferences.language)}</div>
            </div>

            <Transition appear show={isMenuOpen} as={React.Fragment}>
                <Dialog as="div" className="tw-relative tw-z-50" onClose={() => setIsMenuOpen(false)}>
                    <Transition.Child
                        as={React.Fragment}
                        enter="tw-ease-out tw-duration-200"
                        enterFrom="tw-opacity-0"
                        enterTo="tw-opacity-100"
                        leave="tw-ease-in tw-duration-200"
                        leaveFrom="tw-opacity-100"
                        leaveTo="tw-opacity-0"
                    >
                        <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-[55%] tw-backdrop-blur" />
                    </Transition.Child>

                    <div className="tw-fixed tw-left-6 tw-right-6 tw-bottom-0 tw-overflow-y-auto">
                        <div className="tw-w-full tw-min-h-full tw-flex tw-items-center tw-justify-center">
                            <Transition.Child
                                as={React.Fragment}
                                enter="tw-ease-out tw-duration-200"
                                enterFrom="tw-opacity-0 tw-scale-95"
                                enterTo="tw-opacity-100 tw-scale-100"
                                leave="tw-ease-in tw-duration-200"
                                leaveFrom="tw-opacity-100 tw-scale-100"
                                leaveTo="tw-opacity-0 tw-scale-95"
                            >
                                <Dialog.Panel className="tw-w-full tw-transition-all tw-flex tw-flex-col tw-items-center">
                                    <button className="lg-bg-secondary-300 tw-rounded-full" onClick={() => setIsMenuOpen(false)}>
                                        <X className="tw-w-10 tw-h-10 lg-text-secondary-700" />
                                    </button>

                                    <VerticalSpacer className="tw-h-6" />

                                    <div className="tw-w-full tw-rounded-t-lg lg-bg-secondary-300 tw-p-8 tw-flex tw-flex-col tw-items-center">
                                        <div className="tw-mt-2">
                                            test<br />
                                            test<br />
                                            test<br />
                                            test<br />
                                            test<br />
                                            test<br />
                                            test<br />
                                            test<br />
                                            test<br />
                                            test<br />
                                            test<br />
                                            test<br />
                                            test<br />
                                            test<br />
                                            test<br />
                                        </div>

                                        <button className="lg-cta-button tw-px-4">
                                            <div className="tw-grid tw-grid-cols-[1.5rem_2rem_auto_2rem_1.5rem]">
                                                <Telephone className="tw-col-start-1 tw-w-6 tw-h-6" />
                                                <div className="tw-col-start-3">Contact Us</div>
                                            </div>
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}
