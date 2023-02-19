import {Dialog, Listbox, Transition} from "@headlessui/react";
import {Bars3Icon, ChevronRightIcon, LanguageIcon} from "@heroicons/react/20/solid";
import {Form, useSubmit} from "@remix-run/react";
import React, {useEffect, useRef, useState} from "react";
import {MoonStarsFill, Search, Telephone, X} from "react-bootstrap-icons";
import {FixedHeightImage} from "~/global-common-typescript/components/fixedHeightImage";
import {ImageCdnProvider} from "~/global-common-typescript/components/growthJockeyImage";
import {HorizontalSpacer} from "~/global-common-typescript/components/horizontalSpacer";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {getNonEmptyStringFromUnknown, safeParse} from "~/global-common-typescript/utilities/typeValidationUtilities";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {Language, languageToHumanFriendlyString, Theme, themeToHumanFriendlyString, UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";

export function HeaderComponent({userPreferences, redirectTo}: {userPreferences: UserPreferences; redirectTo: string}) {
    const submit = useSubmit();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    enum MenuState {
        Closed,
        Transitioning,
        Open,
    }
    const menuState = useRef<MenuState>(MenuState.Closed);

    function tryToOpenMenu() {
        if (menuState.current == MenuState.Closed) {
            setIsMenuOpen(true);
        }
    }

    function tryToCloseMenu() {
        if (menuState.current == MenuState.Open) {
            setIsMenuOpen(false);
        }
    }

    const [isSearchOpen, setIsSearchOpen] = useState(false);

    function tryToOpenSearch() {
        setIsSearchOpen(true);
    }

    function tryToCloseSearch() {
        setIsSearchOpen(false);
    }

    const languageOptions = [Language.English, Language.Hindi];
    const [selectedLanguage, setSelectedLanguage] = useState(userPreferences.language);
    const languageFormRef = useRef<HTMLFormElement>(null);
    const previousLanguage = useRef(userPreferences.language);

    useEffect(() => {
        // Used to safegaurd against sending a language change request the moment a user enters the page
        if (selectedLanguage != previousLanguage.current) {
            submit(languageFormRef.current, {replace: true});
            previousLanguage.current = selectedLanguage;
        }
    }, [selectedLanguage]);

    const themeOptions = [null, Theme.Light, Theme.Dark];
    const [selectedTheme, setSelectedTheme] = useState(userPreferences.theme);
    const themeFormRef = useRef<HTMLFormElement>(null);
    const previousTheme = useRef(userPreferences.theme);

    useEffect(() => {
        // Used to safegaurd against sending a theme change request the moment a user enters the page
        if (selectedTheme != previousTheme.current) {
            submit(themeFormRef.current, {replace: true});
            previousTheme.current = selectedTheme;

            if (selectedTheme == Theme.Dark || (selectedTheme == null && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
                document.documentElement.classList.add("tw-dark");
            } else {
                document.documentElement.classList.remove("tw-dark");
            }
        }
    }, [selectedTheme]);

    return (
        <div className="tw-flex tw-flex-col tw-items-stretch tw-sticky tw-top-0 tw-z-50">
            <div className="tw-flex tw-flex-row tw-items-center lg-bg-secondary-300 lg-px-screen-edge tw-py-3">
                <a href={`tel:${getVernacularString("headerS1T1", Language.English).slice(-11)}`}>{getVernacularString("headerS1T1", userPreferences.language)}</a>

                <div className="tw-flex-1" />

                <div className="tw-w-px tw-h-6 lg-bg-secondary-900" />

                <div className="tw-flex-1" />

                <Form
                    method="post"
                    action="/set-language"
                    ref={languageFormRef}
                    className="tw-relative"
                >
                    <Listbox
                        value={selectedLanguage}
                        onChange={setSelectedLanguage}
                    >
                        <Listbox.Button className="lg-bg-transparent lg-text-secondary-900 tw-grid tw-grid-cols-[auto_3rem] tw-gap-x-2 tw-items-center">
                            <LanguageIcon className="tw-w-6 tw-h-6" />
                            {languageToHumanFriendlyString(selectedLanguage)}
                        </Listbox.Button>

                        <Listbox.Options className="tw-absolute tw-z-50 tw-top-12 tw-left-0 tw-right-0 lg-text-secondary-900 tw-rounded-lg tw-overflow-hidden">
                            <ItemBuilder
                                items={languageOptions}
                                itemBuilder={(item, itemIndex) => (
                                    <Listbox.Option
                                        value={item}
                                        key={itemIndex}
                                        as={React.Fragment}
                                    >
                                        {({active, selected}) => <li className={concatenateNonNullStringsWithSpaces("tw-py-2 tw-text-center", selected ? "lg-bg-secondary-300" : "lg-bg-secondary-100")}>{languageToHumanFriendlyString(item)}</li>}
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

                    <input
                        type="text"
                        name="language"
                        value={selectedLanguage}
                        readOnly
                        className="tw-hidden"
                    />

                    <input
                        type="text"
                        name="redirectTo"
                        value={redirectTo}
                        readOnly
                        className="tw-hidden"
                    />
                </Form>
            </div>

            <div className="lg-px-screen-edge tw-py-4 lg-bg-background-500 tw-flex tw-flex-row tw-items-center">
                <button
                    type="button"
                    onClick={tryToOpenMenu}
                >
                    <Bars3Icon className="tw-w-6 tw-h-6" />
                </button>
                <HorizontalSpacer className="tw-w-2" />
                <FixedHeightImage
                    relativePath="/livguard/logo-256.png"
                    height="1.5rem"
                    imageCdnProvider={ImageCdnProvider.GrowthJockey}
                />

                <div className="tw-flex-1" />

                <button
                    type="button"
                    onClick={tryToOpenSearch}
                    className="tw-flex tw-flex-row tw-items-center"
                >
                    <Search className="tw-w-6 tw-h-6" />
                    <HorizontalSpacer className="tw-w-2" />
                    <div>{getVernacularString("headerS2T1", userPreferences.language)}</div>
                </button>

                <HorizontalSpacer className="tw-w-4" />

                <Form
                    method="post"
                    action="/set-theme"
                    ref={themeFormRef}
                    className="tw-relative"
                >
                    <Listbox
                        value={selectedTheme}
                        onChange={setSelectedTheme}
                    >
                        <Listbox.Button className="lg-bg-transparent lg-text-secondary-900">
                            <MoonStarsFill className="tw-w-6 tw-h-6" />
                        </Listbox.Button>

                        <Listbox.Options className="tw-absolute tw-z-50 tw-top-12 tw-right-0 tw-w-28 lg-text-secondary-900 tw-rounded-lg tw-overflow-hidden">
                            <ItemBuilder
                                items={themeOptions}
                                itemBuilder={(item, itemIndex) => (
                                    <Listbox.Option
                                        value={item}
                                        key={itemIndex}
                                        as={React.Fragment}
                                    >
                                        {({active, selected}) => <li className={concatenateNonNullStringsWithSpaces("tw-py-2 tw-text-center", selected ? "lg-bg-secondary-300" : "lg-bg-secondary-100")}>{themeToHumanFriendlyString(item)}</li>}
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

                    <input
                        type="text"
                        name="theme"
                        value={selectedTheme ?? ""}
                        readOnly
                        className="tw-hidden"
                    />

                    <input
                        type="text"
                        name="redirectTo"
                        value={redirectTo}
                        readOnly
                        className="tw-hidden"
                    />
                </Form>
            </div>

            {/* Menu */}
            <Transition
                show={isMenuOpen}
                as={React.Fragment}
                beforeEnter={() => (menuState.current = MenuState.Transitioning)}
                afterEnter={() => (menuState.current = MenuState.Open)}
                beforeLeave={() => (menuState.current = MenuState.Transitioning)}
                afterLeave={() => (menuState.current = MenuState.Closed)}
            >
                <Dialog
                    as="div"
                    className="tw-relative tw-z-50"
                    onClose={tryToCloseMenu}
                >
                    <Transition.Child
                        as={React.Fragment}
                        enter="tw-ease-out tw-transition-all tw-duration-200"
                        enterFrom="tw-opacity-0"
                        enterTo="tw-opacity-100"
                        leave="tw-ease-in tw-transition-all tw-duration-200 tw-delay-[200ms]"
                        leaveFrom="tw-opacity-100"
                        leaveTo="tw-opacity-0"
                    >
                        <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-[55%] tw-backdrop-blur" />
                    </Transition.Child>

                    <Dialog.Panel className="tw-fixed tw-left-6 tw-right-6 tw-bottom-0 tw-overflow-y-auto tw-grid tw-grid-cols">
                        <Transition.Child
                            as={React.Fragment}
                            enter="tw-ease-out tw-transition-all tw-duration-200"
                            enterFrom="tw-scale-0 tw-rotate-180"
                            enterTo="tw-scale-100 tw-rotate-0"
                            leave="tw-ease-in tw-transition-all tw-duration-200 tw-delay-[200ms]"
                            leaveFrom="tw-scale-100 tw-rotate-0"
                            leaveTo="tw-scale-0 tw-rotate-180"
                        >
                            <button
                                type="button"
                                className="tw-justify-self-center lg-bg-secondary-300 tw-rounded-full"
                                onClick={tryToCloseMenu}
                            >
                                <X className="tw-w-10 tw-h-10 lg-text-secondary-700" />
                            </button>
                        </Transition.Child>

                        <VerticalSpacer className="tw-h-6" />

                        <div className="tw-w-full tw-max-h-[calc(100vh-5.5rem)] tw-rounded-t-lg tw-p-8 tw-grid tw-grid-rows-[minmax(14rem,1fr)_2rem_13.75rem_3rem] tw-justify-items-center tw-relative">
                            <Transition.Child
                                as={React.Fragment}
                                enter="tw-ease-out tw-transition-all tw-duration-200"
                                enterFrom="tw-translate-y-full"
                                enterTo="tw-translate-y-0"
                                leave="tw-ease-in tw-transition-all tw-duration-200 tw-delay-[200ms]"
                                leaveFrom="tw-translate-y-0"
                                leaveTo="tw-translate-y-full"
                            >
                                <div className="tw-absolute tw-inset-0 lg-bg-secondary-300 tw-rounded-t-lg -tw-z-10" />
                            </Transition.Child>

                            <div className="tw-w-full tw-flex tw-flex-col tw-gap-y-4 tw-items-stretch tw-max-h-full tw-overflow-y-auto">
                                <ItemBuilder
                                    items={[
                                        {
                                            linkTextTextContentPiece: "headerMenuS1T1",
                                            link: "",
                                            enterClassName: "tw-delay-[250ms]",
                                        },
                                        {
                                            linkTextTextContentPiece: "headerMenuS1T2",
                                            link: "",
                                            enterClassName: "tw-delay-[300ms]",
                                        },
                                        {
                                            linkTextTextContentPiece: "headerMenuS1T3",
                                            link: "",
                                            enterClassName: "tw-delay-[350ms]",
                                        },
                                        {
                                            linkTextTextContentPiece: "headerMenuS1T4",
                                            link: "",
                                            enterClassName: "tw-delay-[400ms]",
                                        },
                                        {
                                            linkTextTextContentPiece: "headerMenuS1T5",
                                            link: "",
                                            enterClassName: "tw-delay-[450ms]",
                                        },
                                    ]}
                                    itemBuilder={(item, itemIndex) => (
                                        <div
                                            className="tw-flex tw-flex-row"
                                            key={itemIndex}
                                        >
                                            <Transition.Child
                                                as={React.Fragment}
                                                enter={concatenateNonNullStringsWithSpaces("tw-ease-out tw-transition-all", item.enterClassName)}
                                                enterFrom="tw-translate-y-[1em] tw-opacity-0"
                                                enterTo="tw-translate-y-0 tw-opacity-full"
                                                leave="tw-ease-in tw-transition-all tw-duration-200"
                                                leaveFrom="tw-translate-y-0 tw-opacity-full"
                                                leaveTo="tw-translate-y-[1em] tw-opacity-0"
                                            >
                                                <div className="tw-flex-1 lg-text-title1">{getVernacularString(item.linkTextTextContentPiece, userPreferences.language)}</div>
                                            </Transition.Child>

                                            <Transition.Child
                                                as={React.Fragment}
                                                enter={concatenateNonNullStringsWithSpaces("tw-ease-out tw-transition-all", item.enterClassName)}
                                                enterFrom="tw-translate-y-[1em] tw-opacity-0"
                                                enterTo="tw-translate-y-0 tw-opacity-full"
                                                leave="tw-ease-in tw-transition-all tw-duration-200"
                                                leaveFrom="tw-translate-y-0 tw-opacity-full"
                                                leaveTo="tw-translate-y-[1em] tw-opacity-0"
                                            >
                                                <div className="tw-flex-none tw-w-7 tw-h-7 lg-bg-secondary-500 tw-rounded-full tw-flex tw-flex-row tw-items-center tw-justify-center">
                                                    <ChevronRightIcon className="tw-w-6 tw-h-6" />
                                                </div>
                                            </Transition.Child>
                                        </div>
                                    )}
                                />
                            </div>

                            <VerticalSpacer className="tw-h-8" />

                            <Transition.Child
                                as="div"
                                enter="tw-ease-out tw-transition-all tw-duration-200 tw-delay-200"
                                enterFrom="tw-opacity-0"
                                enterTo="tw-opacity-full"
                                leave="tw-ease-in tw-transition-all tw-duration-200"
                                leaveFrom="tw-opacity-full"
                                leaveTo="tw-opacity-0"
                            >
                                <FixedHeightImage
                                    relativePath="/livguard/header/akshay.png"
                                    height="13.75rem"
                                    imageCdnProvider={ImageCdnProvider.GrowthJockey}
                                />
                            </Transition.Child>

                            <Transition.Child
                                as={React.Fragment}
                                enter="tw-ease-out tw-transition-all tw-duration-200 tw-delay-200"
                                enterFrom="tw-opacity-0"
                                enterTo="tw-opacity-full"
                                leave="tw-ease-in tw-transition-all tw-duration-200"
                                leaveFrom="tw-opacity-full"
                                leaveTo="tw-opacity-0"
                            >
                                <button
                                    type="button"
                                    className="lg-cta-button tw-px-4"
                                >
                                    <div className="tw-grid tw-grid-cols-[1.5rem_2rem_auto_2rem_1.5rem]">
                                        <Telephone className="tw-col-start-1 tw-w-6 tw-h-6" />
                                        <div className="tw-col-start-3">{getVernacularString("headerMenuS2T1", userPreferences.language)}</div>
                                    </div>
                                </button>
                            </Transition.Child>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </Transition>

            {/* Search */}
            <Transition
                show={isSearchOpen}
                as={React.Fragment}
            >
                <Dialog
                    as="div"
                    className="tw-relative tw-z-50"
                    onClose={tryToCloseSearch}
                >
                    <Dialog.Panel className="tw-fixed tw-inset-0 tw-grid tw-grid-rows-[5.25rem_minmax(0,1fr)]">
                        <Transition.Child
                            as={React.Fragment}
                            enter="tw-ease-out tw-transition-all tw-duration-200"
                            enterFrom="-tw-translate-y-full"
                            enterTo="tw-translate-y-0"
                            leave="tw-ease-in tw-transition-all tw-duration-200 tw-delay-[200ms]"
                            leaveFrom="tw-translate-y-0"
                            leaveTo="-tw-translate-y-full"
                        >
                            <div className="tw-w-full lg-bg-secondary-300 tw-p-4">
                                <input
                                    type="text"
                                    className="tw-w-full tw-bg-transparent tw-py-4 tw-pr-4 tw-pl-14 tw-rounded-full tw-border tw-border-solid tw-border-secondary-900-light dark:tw-border-secondary-900-dark"
                                />
                                <Search className="tw-absolute tw-top-[1.875rem] tw-left-8 tw-w-6 tw-h-6" />
                            </div>
                        </Transition.Child>

                        <Transition.Child
                            as={React.Fragment}
                            enter="tw-ease-out tw-transition-all tw-duration-200"
                            enterFrom="tw-translate-x-full"
                            enterTo="tw-translate-x-0"
                            leave="tw-ease-in tw-transition-all tw-duration-200 tw-delay-[200ms]"
                            leaveFrom="tw-translate-x-0"
                            leaveTo="tw-translate-x-full"
                        >
                            <div className="tw-w-full tw-h-full lg-bg-secondary-100"></div>
                        </Transition.Child>

                        <Transition.Child
                            as={React.Fragment}
                            enter="tw-ease-out tw-transition-all tw-duration-200"
                            enterFrom="tw-scale-0 tw-rotate-180"
                            enterTo="tw-scale-100 tw-rotate-0"
                            leave="tw-ease-in tw-transition-all tw-duration-200 tw-delay-[200ms]"
                            leaveFrom="tw-scale-100 tw-rotate-0"
                            leaveTo="tw-scale-0 tw-rotate-180"
                        >
                            <button
                                type="button"
                                className="tw-absolute tw-bottom-8 tw-left-1/2 -tw-translate-x-1/2 lg-bg-secondary-300 tw-rounded-full tw-p-3"
                                onClick={tryToCloseSearch}
                            >
                                <X className="tw-w-10 tw-h-10 lg-text-secondary-700" />
                            </button>
                        </Transition.Child>
                    </Dialog.Panel>
                </Dialog>
            </Transition>
        </div>
    );
}
