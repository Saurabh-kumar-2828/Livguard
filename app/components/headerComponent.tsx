import {Dialog, Listbox, Transition} from "@headlessui/react";
import {Bars3Icon, ChevronRightIcon, LanguageIcon} from "@heroicons/react/20/solid";
import {Form, Link, useNavigate, useSubmit} from "@remix-run/react";
import React, {useEffect, useRef, useState} from "react";
import {ArrowLeftShort, BrightnessHighFill, BrightnessLowFill, Check2, ChevronDown, MoonStarsFill, PhoneFill, Search, Telephone, X} from "react-bootstrap-icons";
import {FixedHeightImage} from "~/global-common-typescript/components/fixedHeightImage";
import {FixedWidthImage} from "~/global-common-typescript/components/fixedWidthImage";
import {ImageCdnProvider} from "~/global-common-typescript/components/growthJockeyImage";
import {HorizontalSpacer} from "~/global-common-typescript/components/horizontalSpacer";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces, distinct} from "~/global-common-typescript/utilities/utilities";
import {Language, languageToHumanFriendlyString, languageToShortHumanFriendlyFormat, Theme, themeToHumanFriendlyString, UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";

enum MenuState {
    Closed,
    Transitioning,
    Open,
}

enum SubMenu {
    Inverters,
    Batteries,
    AutomotiveBatteries,
    SolarSolutions,
    Accessories,
    DealerLocator,
    RegisterYourBrand,
    More,
}

export function HeaderComponent({userPreferences, redirectTo, showMobileMenuIcon}: {userPreferences: UserPreferences; redirectTo: string; showMobileMenuIcon: boolean}) {
    const submit = useSubmit();

    const [isContactUsDialogOpen, setIsContactUsDialogOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuState = useRef<MenuState>(MenuState.Closed);

    function tryToOpenMenu() {
        if (menuState.current == MenuState.Closed) {
            setIsMenuOpen(true);
        }
    }

    function tryToOpenContactUsDialog() {
        setIsContactUsDialogOpen(true);
    }

    const [isSearchOpen, setIsSearchOpen] = useState(false);

    function tryToOpenSearch() {
        setIsSearchOpen(true);
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
                <button
                    onClick={tryToOpenContactUsDialog}
                    className="tw-underline tw-underline-offset-4"
                >
                    {getVernacularString("headerS1T1", userPreferences.language)}
                </button>

                <div className="tw-flex-1" />

                <Form
                    method="post"
                    action="/set-theme"
                    ref={themeFormRef}
                    className="tw-relative tw-h-6"
                >
                    <Listbox
                        value={selectedTheme}
                        onChange={setSelectedTheme}
                    >
                        <Listbox.Button className="lg-bg-transparent lg-text-secondary-900">
                            <BrightnessHighFill className="tw-w-6 tw-h-6 tw-block dark:tw-hidden" />
                            <MoonStarsFill className="tw-w-6 tw-h-6 dark:tw-block tw-hidden" />
                        </Listbox.Button>

                        <Listbox.Options className="tw-absolute tw-z-50 tw-top-12 tw-right-0 tw-w-40 lg-text-secondary-900 tw-rounded-lg tw-overflow-hidden">
                            <ItemBuilder
                                items={themeOptions}
                                itemBuilder={(item, itemIndex) => (
                                    <Listbox.Option
                                        value={item}
                                        key={itemIndex}
                                        as={React.Fragment}
                                    >
                                        {({active, selected}) => (
                                            <li
                                                className={concatenateNonNullStringsWithSpaces(
                                                    "tw-w-full tw-grid tw-grid-cols-[minmax(0,1fr)_auto] tw-items-center tw-gap-x-2 tw-px-2 tw-py-2 tw-cursor-pointer tw-duration-200",
                                                    active ? "lg-bg-primary-500 tw-text-secondary-900-dark" : "lg-bg-secondary-300",
                                                )}
                                            >
                                                <div>{themeToHumanFriendlyString(userPreferences, item)}</div>
                                                {selected ? <Check2 className="tw-w-5 tw-h-5" /> : <div className="tw-w-5 tw-h-5" />}
                                            </li>
                                        )}
                                    </Listbox.Option>
                                )}
                                spaceBuilder={(spaceIndex) => (
                                    <div
                                        className="tw-h-px lg-bg-secondary-700"
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

                <HorizontalSpacer className="tw-w-3" />

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
                        <Listbox.Button className="lg-bg-transparent lg-text-secondary-900 tw-grid tw-grid-cols-[1rem_1rem] tw-gap-x-2 tw-items-center">
                            {languageToShortHumanFriendlyFormat(selectedLanguage)}
                            <ChevronDown className="tw-w-4 tw-h-4" />
                        </Listbox.Button>

                        <Listbox.Options className="tw-absolute tw-z-50 tw-top-12 -tw-left-8 tw-right-0 lg-text-secondary-900 tw-rounded-lg tw-overflow-hidden">
                            <ItemBuilder
                                items={languageOptions}
                                itemBuilder={(item, itemIndex) => (
                                    <Listbox.Option
                                        value={item}
                                        key={itemIndex}
                                        as={React.Fragment}
                                    >
                                        {({active, selected}) => (
                                            <li
                                                className={concatenateNonNullStringsWithSpaces(
                                                    "tw-w-full tw-grid tw-grid-cols-[minmax(0,1fr)_auto] tw-items-center tw-gap-x-2 tw-px-2 tw-py-2 tw-cursor-pointer tw-duration-200",
                                                    active ? "lg-bg-primary-500 tw-text-secondary-900-dark" : "lg-bg-secondary-300",
                                                )}
                                            >
                                                <div>{languageToHumanFriendlyString(item)}</div>
                                                {selected ? <Check2 className="tw-w-5 tw-h-5" /> : <div className="tw-w-5 tw-h-5" />}
                                            </li>
                                        )}
                                    </Listbox.Option>
                                )}
                                spaceBuilder={(spaceIndex) => (
                                    <div
                                        className="tw-h-px lg-bg-secondary-700"
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
                {showMobileMenuIcon && (
                    <>
                        <button
                            type="button"
                            onClick={tryToOpenMenu}
                        >
                            <Bars3Icon className="tw-w-6 tw-h-6" />
                        </button>
                        <HorizontalSpacer className="tw-w-2" />
                    </>
                )}

                <Link to="/">
                    <div className="tw-block dark:tw-hidden">
                        <object
                            data="https://files.growthjockey.com/livguard/icons/logo-light.svg"
                            className="tw-h-6"
                        />
                    </div>

                    <div className="dark:tw-block tw-hidden">
                        <object
                            data="https://files.growthjockey.com/livguard/icons/logo-dark.svg"
                            className="tw-h-6"
                        />
                    </div>
                </Link>

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
            </div>

            <ContactUsDialog
                userPreferences={userPreferences}
                isContactUsDialogOpen={isContactUsDialogOpen}
                setIsContactUsDialogOpen={setIsContactUsDialogOpen}
            />

            <MenuDialog
                userPreferences={userPreferences}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                menuState={menuState}
            />

            <SearchDialog
                userPreferences={userPreferences}
                isSearchOpen={isSearchOpen}
                setIsSearchOpen={setIsSearchOpen}
            />
        </div>
    );
}

function MenuDialog({
    userPreferences,
    isMenuOpen,
    setIsMenuOpen,
    menuState,
}: {
    userPreferences: UserPreferences;
    isMenuOpen: boolean;
    setIsMenuOpen: React.Dispatch<boolean>;
    menuState: React.MutableRefObject<MenuState>;
}) {
    const [currentlyOpenSubMenu, setCurrentlyOpenSubMenu] = useState<SubMenu | null>(null);
    const subMenuState = useRef<MenuState>(MenuState.Closed);

    function tryToOpenSubMenu(subMenu: SubMenu) {
        if (subMenuState.current == MenuState.Closed) {
            setCurrentlyOpenSubMenu(subMenu);
        }
    }

    function tryToCloseMenu() {
        if (menuState.current == MenuState.Open) {
            setIsMenuOpen(false);
            setCurrentlyOpenSubMenu(null);
        }
    }

    return (
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
                            className="tw-justify-self-center tw-bg-background-500-light dark:tw-bg-secondary-300-dark tw-rounded-full"
                            onClick={tryToCloseMenu}
                        >
                            <X className="tw-w-10 tw-h-10 lg-text-secondary-700" />
                        </button>
                    </Transition.Child>

                    <VerticalSpacer className="tw-h-6" />

                    <div className="tw-w-full tw-max-h-[calc(100vh-5.5rem)] tw-rounded-t-lg tw-p-8 tw-grid tw-grid-rows-[20.75rem_2rem_minmax(0,13.75rem)_3rem] tw-justify-items-center tw-relative">
                        <Transition.Child
                            as={React.Fragment}
                            enter="tw-ease-out tw-transition-all tw-duration-200"
                            enterFrom="tw-translate-y-full"
                            enterTo="tw-translate-y-0"
                            leave="tw-ease-in tw-transition-all tw-duration-200 tw-delay-[200ms]"
                            leaveFrom="tw-translate-y-0"
                            leaveTo="tw-translate-y-full"
                        >
                            <div className="tw-absolute tw-inset-0 tw-bg-background-500-light dark:tw-bg-secondary-300-dark tw-rounded-t-lg -tw-z-10" />
                        </Transition.Child>

                        <div className="tw-w-full tw-h-full tw-flex tw-flex-col tw-gap-y-4 tw-items-stretch">
                            <ItemBuilder
                                items={[
                                    {
                                        linkTextTextContentPiece: "headerMenuS1T1",
                                        enterClassName: "tw-delay-[250ms]",
                                        subMenu: SubMenu.Inverters,
                                        link: null,
                                    },
                                    {
                                        linkTextTextContentPiece: "headerMenuS1T2",
                                        enterClassName: "tw-delay-[300ms]",
                                        subMenu: SubMenu.Batteries,
                                        link: null,
                                    },
                                    {
                                        linkTextTextContentPiece: "headerMenuS1T3",
                                        enterClassName: "tw-delay-[350ms]",
                                        subMenu: SubMenu.AutomotiveBatteries,
                                        link: null,
                                    },
                                    {
                                        linkTextTextContentPiece: "headerMenuS1T4",
                                        enterClassName: "tw-delay-[400ms]",
                                        subMenu: null,
                                        link: "https://www.livguardsolar.com/",
                                    },
                                    {
                                        linkTextTextContentPiece: "headerMenuS1T5",
                                        enterClassName: "tw-delay-[450ms]",
                                        subMenu: SubMenu.Accessories,
                                        link: null,
                                    },
                                    {
                                        linkTextTextContentPiece: "headerMenuS1T6",
                                        enterClassName: "tw-delay-[500ms]",
                                        subMenu: null,
                                        link: "/dealer-locator",
                                    },
                                    {
                                        linkTextTextContentPiece: "headerMenuS1T7",
                                        enterClassName: "tw-delay-[550ms]",
                                        subMenu: null,
                                        link: "https://www.livguard.com/register-and-warranty-for-inverters.php",
                                    },
                                    {
                                        linkTextTextContentPiece: "headerMenuS1T8",
                                        enterClassName: "tw-delay-[600ms]",
                                        subMenu: SubMenu.More,
                                        link: null,
                                    },
                                ]}
                                itemBuilder={(item, itemIndex) => (
                                    <button
                                        className="tw-flex tw-flex-row tw-text-left"
                                        key={itemIndex}
                                        onClick={() => {
                                            if (item.subMenu != null) {
                                                tryToOpenSubMenu(item.subMenu);
                                            } else {
                                                window.open(item.link, "_blank");
                                            }
                                        }}
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
                                            <div className="tw-flex-1 lg-text-title2">{getVernacularString(item.linkTextTextContentPiece, userPreferences.language)}</div>
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
                                            <div className="tw-flex-none tw-w-7 tw-h-7 tw-bg-secondary-300-light dark:tw-bg-secondary-500-dark tw-rounded-full tw-flex tw-flex-row tw-items-center tw-justify-center">
                                                <ChevronRightIcon className="tw-w-6 tw-h-6" />
                                            </div>
                                        </Transition.Child>
                                    </button>
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
                            <a
                                href="tel:18001025551"
                                className="lg-cta-button tw-px-4"
                            >
                                <div className="tw-grid tw-grid-cols-[1.5rem_2rem_auto_2rem_1.5rem]">
                                    <Telephone className="tw-col-start-1 tw-w-6 tw-h-6" />
                                    <div className="tw-col-start-3">{getVernacularString("headerMenuS2T1", userPreferences.language)}</div>
                                </div>
                            </a>
                        </Transition.Child>
                    </div>
                </Dialog.Panel>

                <SubMenuDialog
                    userPreferences={userPreferences}
                    setIsMenuOpen={setIsMenuOpen}
                    tryToCloseMenu={tryToCloseMenu}
                    menuState={menuState}
                    currentlyOpenSubMenu={currentlyOpenSubMenu}
                    setCurrentlyOpenSubMenu={setCurrentlyOpenSubMenu}
                    subMenuState={subMenuState}
                />
            </Dialog>
        </Transition>
    );
}

function SubMenuDialog({
    userPreferences,
    setIsMenuOpen,
    tryToCloseMenu,
    menuState,
    currentlyOpenSubMenu,
    setCurrentlyOpenSubMenu,
    subMenuState,
}: {
    userPreferences: UserPreferences;
    setIsMenuOpen: React.Dispatch<boolean>;
    tryToCloseMenu: () => void;
    menuState: React.MutableRefObject<MenuState>;
    currentlyOpenSubMenu: SubMenu | null;
    setCurrentlyOpenSubMenu: React.Dispatch<SubMenu | null>;
    subMenuState: React.MutableRefObject<MenuState>;
}) {
    function tryToCloseSubMenu() {
        if (subMenuState.current == MenuState.Open) {
            setCurrentlyOpenSubMenu(null);
        }
    }

    return (
        <Transition
            show={currentlyOpenSubMenu != null}
            as={React.Fragment}
            beforeEnter={() => (subMenuState.current = MenuState.Transitioning)}
            afterEnter={() => (subMenuState.current = MenuState.Open)}
            beforeLeave={() => (subMenuState.current = MenuState.Transitioning)}
            afterLeave={() => (subMenuState.current = MenuState.Closed)}
        >
            <Dialog
                as="div"
                className="tw-relative tw-z-50"
                onClose={tryToCloseSubMenu}
            >
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
                            className="tw-justify-self-center tw-bg-background-500-light dark:tw-bg-secondary-300-dark tw-rounded-full"
                            onClick={tryToCloseSubMenu}
                        >
                            <ArrowLeftShort className="tw-w-10 tw-h-10 lg-text-secondary-700" />
                        </button>
                    </Transition.Child>

                    <VerticalSpacer className="tw-h-6" />

                    <div className="tw-w-full tw-max-h-[calc(100vh-5.5rem)] tw-rounded-t-lg tw-p-8 tw-grid tw-grid-rows-[20.75rem_2rem_minmax(0,13.75rem)_3rem] tw-justify-items-center tw-relative">
                        <Transition.Child
                            as={React.Fragment}
                            enter="tw-ease-out tw-transition-all tw-duration-200"
                            enterFrom="tw-translate-x-full"
                            enterTo="tw-translate-x-0"
                            leave="tw-ease-in tw-transition-all tw-duration-200 tw-delay-[200ms]"
                            leaveFrom="tw-translate-x-0"
                            leaveTo="tw-translate-x-full"
                        >
                            <div className="tw-absolute tw-inset-0 tw-bg-background-500-light dark:tw-bg-secondary-300-dark tw-rounded-t-lg -tw-z-10" />
                        </Transition.Child>

                        <div className="tw-w-full tw-h-full tw-flex tw-flex-col tw-gap-y-4 tw-items-stretch">
                            <Transition.Child
                                as={React.Fragment}
                                // enter="tw-ease-out tw-transition-all tw-delay-[200ms]"
                                // enterFrom="tw-translate-y-[1em] tw-opacity-0"
                                // enterTo="tw-translate-y-0 tw-opacity-full"
                                // leave="tw-ease-in tw-transition-all tw-duration-200"
                                // leaveFrom="tw-translate-y-0 tw-opacity-full"
                                // leaveTo="tw-translate-y-[1em] tw-opacity-0"
                                leave="tw-ease-in tw-transition-all tw-duration-200"
                                leaveFrom="tw-translate-y-0 tw-opacity-full"
                                leaveTo="tw-translate-y-[1em] tw-opacity-0"
                            >
                                <div
                                    className="tw-w-fit tw-flex tw-flex-row tw-items-center tw-gap-x-2"
                                    onClick={tryToCloseSubMenu}
                                >
                                    <ArrowLeftShort className="tw-w-4 tw-h-4" />
                                    <div>
                                        {currentlyOpenSubMenu == SubMenu.Inverters
                                            ? getVernacularString("headerMenuSM1T1", userPreferences.language)
                                            : currentlyOpenSubMenu == SubMenu.Batteries
                                            ? getVernacularString("headerMenuSM2T1", userPreferences.language)
                                            : currentlyOpenSubMenu == SubMenu.AutomotiveBatteries
                                            ? getVernacularString("headerMenuSM3T1", userPreferences.language)
                                            : currentlyOpenSubMenu == SubMenu.SolarSolutions
                                            ? getVernacularString("headerMenuSM4T1", userPreferences.language)
                                            : currentlyOpenSubMenu == SubMenu.Accessories
                                            ? getVernacularString("headerMenuSM5T1", userPreferences.language)
                                            : currentlyOpenSubMenu == SubMenu.DealerLocator
                                            ? getVernacularString("headerMenuSM6T1", userPreferences.language)
                                            : currentlyOpenSubMenu == SubMenu.RegisterYourBrand
                                            ? getVernacularString("headerMenuSM7T1", userPreferences.language)
                                            : null}
                                    </div>
                                </div>
                            </Transition.Child>

                            <ItemBuilder
                                items={
                                    currentlyOpenSubMenu == SubMenu.Inverters
                                        ? [
                                              {
                                                  linkTextTextContentPiece: "headerMenuSM1T2",
                                                  enterClassName: "tw-delay-[250ms]",
                                                  link: "/category/inverters",
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "headerMenuSM1T3",
                                                  enterClassName: "tw-delay-[300ms]",
                                                  link: "https://www.livguard.com/solar-panels-and-inverters-for-home/",
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "headerMenuSM1T4",
                                                  enterClassName: "tw-delay-[350ms]",
                                                  link: "https://www.livguard.com/high-capacity-inverters/",
                                                  download: null,
                                              },
                                          ]
                                        : currentlyOpenSubMenu == SubMenu.Batteries
                                        ? [
                                              {
                                                  linkTextTextContentPiece: "headerMenuSM2T2",
                                                  enterClassName: "tw-delay-[250ms]",
                                                  link: "/category/batteries",
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "headerMenuSM2T3",
                                                  enterClassName: "tw-delay-[300ms]",
                                                  link: "https://www.livguard.com/solar-battery-for-home/",
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "headerMenuSM2T4",
                                                  enterClassName: "tw-delay-[350ms]",
                                                  link: "/",
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "headerMenuSM2T5",
                                                  enterClassName: "tw-delay-[400ms]",
                                                  link: "https://www.livguard.com/vrla-batteries/",
                                                  download: null,
                                              },
                                          ]
                                        : currentlyOpenSubMenu == SubMenu.AutomotiveBatteries
                                        ? [
                                              {
                                                  linkTextTextContentPiece: "headerMenuSM3T2",
                                                  enterClassName: "tw-delay-[250ms]",
                                                  link: "https://www.livguard.com/car-and-suv-batteries/",
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "headerMenuSM3T3",
                                                  enterClassName: "tw-delay-[300ms]",
                                                  link: "https://www.livguard.com/two-wheeler-batteries/",
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "headerMenuSM3T4",
                                                  enterClassName: "tw-delay-[350ms]",
                                                  link: "https://www.livguard.com/erickshaw-batteries/",
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "headerMenuSM3T5",
                                                  enterClassName: "tw-delay-[400ms]",
                                                  link: "/",
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "headerMenuSM3T6",
                                                  enterClassName: "tw-delay-[450ms]",
                                                  link: "https://www.livguard.com/tractor-batteries/",
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "headerMenuSM3T7",
                                                  enterClassName: "tw-delay-[450ms]",
                                                  link: "https://www.livguard.com/three-wheeler-batteries/",
                                                  download: null,
                                              },
                                          ]
                                        : currentlyOpenSubMenu == SubMenu.SolarSolutions
                                        ? []
                                        : currentlyOpenSubMenu == SubMenu.Accessories
                                        ? [
                                              {
                                                  linkTextTextContentPiece: "headerMenuSM5T2",
                                                  enterClassName: "tw-delay-[250ms]",
                                                  link: "https://www.livguard.com/stabilizer-for-AC-and-TV.php",
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "headerMenuSM5T3",
                                                  enterClassName: "tw-delay-[300ms]",
                                                  link: "https://www.livguard.com/E-rickshaw-charger-category/",
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "headerMenuSM5T4",
                                                  enterClassName: "tw-delay-[350ms]",
                                                  link: "https://www.livguard.com/lg-trolley-category/",
                                                  download: null,
                                              },
                                          ]
                                        : currentlyOpenSubMenu == SubMenu.DealerLocator
                                        ? []
                                        : currentlyOpenSubMenu == SubMenu.RegisterYourBrand
                                        ? []
                                        : currentlyOpenSubMenu == SubMenu.More
                                        ? [
                                              {
                                                  linkTextTextContentPiece: "headerMenuSM8T2",
                                                  enterClassName: "tw-delay-[250ms]",
                                                  link: "https://www.livguard.com/about.php",
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "headerMenuSM8T3",
                                                  enterClassName: "tw-delay-[300ms]",
                                                  link: "https://www.livguard.com/blog/",
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "headerMenuSM8T4",
                                                  enterClassName: "tw-delay-[300ms]",
                                                  link: "https://files.growthjockey.com/livguard/files/MGT-7-LETPL-2022.pdf",
                                                  download: "LETPL Annual return 2021-22",
                                              },
                                              {
                                                  linkTextTextContentPiece: "headerMenuSM8T5",
                                                  enterClassName: "tw-delay-[300ms]",
                                                  link: "https://files.growthjockey.com/livguard/files/MGT-7-LBPL-2022.pdf",
                                                  download: "LBPL Annual return 2021-22",
                                              },
                                          ]
                                        : []
                                }
                                itemBuilder={(item, itemIndex) => (
                                    <InternalOrExternalOrDownloadLink
                                        to={item.link}
                                        download={item.download}
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
                                            <div className="tw-flex-1 lg-text-title2">{getVernacularString(item.linkTextTextContentPiece, userPreferences.language)}</div>
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
                                            <div className="tw-flex-none tw-w-7 tw-h-7 tw-bg-secondary-300-light dark:tw-bg-secondary-500-dark tw-rounded-full tw-flex tw-flex-row tw-items-center tw-justify-center">
                                                <ChevronRightIcon className="tw-w-6 tw-h-6" />
                                            </div>
                                        </Transition.Child>
                                    </InternalOrExternalOrDownloadLink>
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
    );
}

function SearchDialog({userPreferences, isSearchOpen, setIsSearchOpen}: {userPreferences: UserPreferences; isSearchOpen: boolean; setIsSearchOpen: React.Dispatch<boolean>}) {
    const [query, setQuery] = useState<string>("");
    const [searchResults, setSearchResults] = useState<Array<SearchQuery> | null>(null);

    function tryToCloseSearch() {
        setIsSearchOpen(false);
        setQuery("");
    }

    useEffect(() => {
        if (query.length == 0) {
            setSearchResults(null);
        } else {
            const queryLowerCase = query.toLowerCase();

            const results = searchQueries
                .filter((searchQuery) => searchQuery.keyword.toLowerCase().includes(queryLowerCase))
                .sort((searchQuery1, searchQuery2) => searchQuery1.score - searchQuery2.score);

            setSearchResults(results);
        }
    }, [query]);

    return (
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
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
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
                        <div className="tw-w-full tw-h-full lg-bg-secondary-100">
                            {searchResults == null ? (
                                <div className="tw-w-full tw-h-full lg-px-screen-edge tw-flex tw-flex-col tw-justify-center tw-items-center">Start typing to search</div>
                            ) : searchResults.length == 0 ? (
                                <div className="tw-w-full tw-h-full lg-px-screen-edge tw-flex tw-flex-col tw-justify-center tw-items-center">No results found</div>
                            ) : (
                                <div className="tw-px-4 tw-py-2 tw-flex tw-flex-col tw-gap-y-2 tw-overflow-scroll">
                                    <ItemBuilder
                                        // TODO: Remove slicing, add scrolling instead
                                        items={searchResults.slice(0, 6)}
                                        itemBuilder={(result, resultIndex) => (
                                            <Link
                                                to={result.link}
                                                key={resultIndex}
                                                className="lg-bg-secondary-700 tw-p-4 tw-flex tw-flex-row tw-justify-between tw-items-center tw-rounded-lg"
                                                onClick={tryToCloseSearch}
                                            >
                                                <div className="lg-text-body-bold lg-text-secondary-100">{result.title}</div>

                                                <div className="lg-text-secondary-300">{result.keyword}</div>
                                            </Link>
                                        )}
                                    />

                                    <VerticalSpacer className="tw-h-2" />
                                </div>
                            )}
                        </div>
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
    );
}

function ContactUsDialog({
    userPreferences,
    isContactUsDialogOpen,
    setIsContactUsDialogOpen,
}: {
    userPreferences: UserPreferences;
    isContactUsDialogOpen: boolean;
    setIsContactUsDialogOpen: React.Dispatch<boolean>;
}) {
    function tryToCloseContactUsDialog() {
        setIsContactUsDialogOpen(false);
    }

    return (
        <Transition
            show={isContactUsDialogOpen}
            as={React.Fragment}
        >
            <Dialog
                as="div"
                className="tw-relative tw-z-50"
                onClose={tryToCloseContactUsDialog}
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
                    <div onClick={tryToCloseContactUsDialog} />

                    <Transition.Child
                        as={React.Fragment}
                        enter="tw-ease-out tw-transition-all tw-duration-200"
                        enterFrom="tw-opacity-0"
                        enterTo="tw-opacity-full"
                        leave="tw-ease-in tw-transition-all tw-duration-200"
                        leaveFrom="tw-opacity-full"
                        leaveTo="tw-opacity-0"
                    >
                        <div className="tw-w-full tw-bg-gradient-to-b tw-from-secondary-500-light tw-to-secondary-100-light dark:tw-from-secondary-500-dark dark:tw-to-secondary-100-dark lg-bg-secondary-100 tw-px-6 tw-py-6 tw-rounded-lg tw-flex tw-flex-col">
                            <div className="tw-grid tw-grid-cols-[1.5rem_minmax(0,1fr)_1.5rem]">
                                <div className="tw-row-start-1 tw-col-start-2 tw-w-full tw-text-center lg-text-headline">
                                    {getVernacularString("headerContactUsDialogT1", userPreferences.language)}
                                </div>
                                <button
                                    type="button"
                                    onClick={tryToCloseContactUsDialog}
                                    className="tw-row-start-1 tw-col-start-3"
                                >
                                    <X className="tw-w-6 tw-h-6" />
                                </button>
                            </div>

                            <VerticalSpacer className="tw-h-4" />

                            <div className="lg-text-title2">{getVernacularString("headerContactUsDialogT2", userPreferences.language)}</div>

                            <VerticalSpacer className="tw-h-2" />

                            <a
                                href="tel:18001025551"
                                className="tw-w-full lg-bg-primary-500 tw-text-secondary-900-dark tw-py-3 tw-px-4 tw-rounded-full"
                            >
                                <div className="tw-flex tw-flex-row tw-items-center">
                                    <div className="tw-flex-1">1800-1025-551</div>

                                    <Telephone className="tw-w-6 tw-h-6 tw-flex-0" />
                                </div>
                            </a>

                            <VerticalSpacer className="tw-h-4" />

                            <div className="lg-text-title2">{getVernacularString("headerContactUsDialogT3", userPreferences.language)}</div>

                            <VerticalSpacer className="tw-h-2" />

                            <a
                                href="tel:+919205667999"
                                className="tw-w-full lg-bg-primary-500 tw-text-secondary-900-dark tw-py-3 tw-px-4 tw-rounded-full"
                            >
                                <div className="tw-flex tw-flex-row tw-items-center">
                                    <div className="tw-flex-1">+91 92056-67999</div>

                                    <Telephone className="tw-w-6 tw-h-6 tw-flex-0" />
                                </div>
                            </a>
                        </div>
                    </Transition.Child>
                </Dialog.Panel>

                <div onClick={tryToCloseContactUsDialog} />
            </Dialog>
        </Transition>
    );
}

function InternalOrExternalOrDownloadLink({to, download, className, children}: {to: string; download: string | null; className?: string; children}) {
    if (to[0] == "/") {
        return (
            <Link
                to={to}
                className={className}
            >
                {children}
            </Link>
        );
    } else if (download == null) {
        return (
            <a
                href={to}
                className={className}
            >
                {children}
            </a>
        );
    }

    return (
        <a
            href={to}
            className={className}
            download={download}
            target="_blank"
        >
            {children}
        </a>
    );
}

type SearchQuery = {
    keyword: string;
    informalName: string;
    link: string;
    title: string;
    score: number;
};

const searchQueries: Array<SearchQuery> = [
    {keyword: "Inverter", informalName: "Category(Inverter)", link: "https://www.livguard.com/inverter for home/", title: "Buy Best Inverter for Home at the Lowest Price in India ", score: 1},
    {keyword: "Inverter", informalName: "Product", link: "https://www.livguard.com/inverter for home/", title: "Livguard Home Inverters", score: 2},
    {keyword: "Inverter", informalName: "Product", link: "https://www.livguard.com/solar-panels-and-inverters-for-home/", title: "Solar Inverter for Home", score: 2},
    {keyword: "Inverter", informalName: "Product", link: "https://www.livguard.com/high-capacity-inverters/", title: "Livguard High-Capacity Inverters", score: 2},
    {keyword: "Inverter", informalName: "Product", link: "https://www.livguard.com/inverters-for-home-use/i-Verter-LGS-1100.php", title: "i-Verter LGS 1100", score: 2},
    {keyword: "Inverter", informalName: "Product", link: "https://www.livguard.com/inverters-for-home-use/i-verter-LGS-1700.php", title: "i-Verter LGS 1700", score: 2},
    {keyword: "Inverter", informalName: "Product", link: "https://www.livguard.com/inverters-for-home-use/i-verter-LGS-900.php", title: "i-Verter LGS 900", score: 2},
    {keyword: "Inverter", informalName: "Product", link: "https://www.livguard.com/inverters-for-home-use/i2-verter-LG-1100.php", title: "i2-Verter LG 1100", score: 2},
    {keyword: "Inverter", informalName: "Product", link: "https://www.livguard.com/inverters-for-home-use/i2-verter-LG-1700.php", title: "i2-Verter LG 1700", score: 2},
    {keyword: "Inverter", informalName: "Product", link: "https://www.livguard.com/inverters-for-home-use/i2-verter-LG-900.php", title: "i2-Verter LG 900", score: 2},
    {keyword: "Inverter", informalName: "Product", link: "https://www.livguard.com/inverters-for-home-use/i2-verter-LG-700.php", title: "i2-Verter LG 700", score: 2},
    {keyword: "Inverter", informalName: "Product", link: "https://www.livguard.com/high-capacity-inverters/ih-verter-LG2300.php", title: "ih-verter LG2300", score: 2},
    {keyword: "Inverter", informalName: "Product", link: "https://www.livguard.com/high-capacity-inverters/ih-verter-LG3500.php", title: "ih-verter LG3500", score: 2},
    {keyword: "Inverter", informalName: "Product", link: "https://www.livguard.com/high-capacity-inverters/ih-verter-LG5000.php", title: "ih-verter LG5000", score: 2},
    {keyword: "Inverter", informalName: "Product", link: "https://www.livguard.com/high-capacity-inverters/ih-verter-LGS-2500.php", title: "ih-verter LGS 2500", score: 2},
    {keyword: "Inverter", informalName: "Product", link: "https://www.livguard.com/high-capacity-inverters/ih-verter-LGS-3000.php", title: "ih-verter LGS 3000", score: 2},
    {keyword: "Inverter", informalName: "Product", link: "https://www.livguard.com/high-capacity-inverters/ih-verter-LGS-4000.php", title: "ih-verter LGS 4000", score: 2},
    {keyword: "Inverter", informalName: "Home", link: "https://www.livguard.com", title: "Livguard : Buy inverter, batteries and all types of home energy storage solutions", score: 3},
    {keyword: "Battery", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 1},
    {keyword: "Battery", informalName: "Category (Generic)", link: "https://www.livguard.com/batteries.php", title: "Batteries for All Your Needs", score: 2},
    {keyword: "Battery", informalName: "Home", link: "https://www.livguard.com", title: "Livguard : Buy inverter, batteries and all types of home energy storage solutions", score: 3},
    {
        keyword: "Dealer",
        informalName: "Dealer Locater",
        link: "https://www.livguard.com/dealer for inverters and batteries/",
        title: "Dealer Locator | Find Livguard inverter battery shop near me  ",
        score: 1,
    },
    {
        keyword: "Near",
        informalName: "Dealer Locater",
        link: "https://www.livguard.com/dealer for inverters and batteries/",
        title: "Dealer Locator | Find Livguard inverter battery shop near me  ",
        score: 1,
    },
    {
        keyword: "Store",
        informalName: "Dealer Locater",
        link: "https://www.livguard.com/dealer for inverters and batteries/",
        title: "Dealer Locator | Find Livguard inverter battery shop near me  ",
        score: 1,
    },
    {
        keyword: "Buy",
        informalName: "Dealer Locater",
        link: "https://www.livguard.com/dealer for inverters and batteries/",
        title: "Dealer Locator | Find Livguard inverter battery shop near me  ",
        score: 1,
    },
    {keyword: "Sine", informalName: "Category(Inverter)", link: "https://www.livguard.com/inverter for home/", title: "Buy Best Inverter for Home at the Lowest Price in India ", score: 1},
    {keyword: "Square", informalName: "Category(Inverter)", link: "https://www.livguard.com/inverter for home/", title: "Buy Best Inverter for Home at the Lowest Price in India ", score: 1},
    {keyword: "Automotive Battery", informalName: "Category (Automotive)", link: "https://www.livguard.com/automotive-batteries.php", title: "Batteries for every type of vehicle", score: 1},
    {keyword: "Automotive Battery", informalName: "Home", link: "https://www.livguard.com", title: "Livguard : Buy inverter, batteries and all types of home energy storage solutions", score: 2},
    {
        keyword: "Home Battery",
        informalName: "Category ",
        link: "https://www.livguard.com/inverter-batteries/",
        title: "Livguard : Buy inverter, batteries and all types of home energy storage solutions",
        score: 1,
    },
    {keyword: "Solar", informalName: "Home", link: "https://www.livguard.com", title: "Livguard : Buy inverter, batteries and all types of home energy storage solutions", score: 2},
    {keyword: "Jodi", informalName: "Home", link: "https://www.livguard.com", title: "Livguard : Buy inverter, batteries and all types of home energy storage solutions", score: 3},
    {keyword: "Car Battery", informalName: "Category ", link: "https://www.livguard.com/car-and-suv-batteries/", title: "Find the right battery for your car", score: 1},
    {keyword: "Car Battery", informalName: "Home", link: "https://www.livguard.com", title: "Livguard : Buy inverter, batteries and all types of home energy storage solutions", score: 2},
    {keyword: "E-Rickshaw Battery", informalName: "Category ", link: "https://www.livguard.com/erickshaw-batteries/", title: "Livguard E Rickshaw Battery", score: 1},
    {keyword: "Tempo Battery", informalName: "Home", link: "https://www.livguard.com", title: "Livguard : Buy inverter, batteries and all types of home energy storage solutions", score: 3},
    {keyword: "Truck Battery", informalName: "Home", link: "https://www.livguard.com", title: "Livguard : Buy inverter, batteries and all types of home energy storage solutions", score: 3},
    {keyword: "Service ", informalName: "Home", link: "https://www.livguard.com", title: "Livguard : Buy inverter, batteries and all types of home energy storage solutions", score: 3},
    {keyword: "Accessories ", informalName: "Home", link: "https://www.livguard.com", title: "Livguard : Buy inverter, batteries and all types of home energy storage solutions", score: 1},
    {keyword: "3D Grid ", informalName: "Category(Inverter)", link: "https://www.livguard.com/inverter for home/", title: "Buy Best Inverter for Home at the Lowest Price in India ", score: 2},
    {keyword: "AI Charging", informalName: "Product", link: "https://www.livguard.com/inverters-for-home-use/i-Verter-LGS-1100.php", title: "i-Verter LGS 1100", score: 2},
    {keyword: "AI Charging", informalName: "Product", link: "https://www.livguard.com/inverters-for-home-use/i-verter-LGS-1700.php", title: "i-Verter LGS 1700", score: 2},
    {keyword: "AI Charging", informalName: "Product", link: "https://www.livguard.com/inverters-for-home-use/i-verter-LGS-900.php", title: "i-Verter LGS 900", score: 2},
    {keyword: "AI Charging", informalName: "Product", link: "https://www.livguard.com/inverters-for-home-use/i2-verter-LG-1100.php", title: "i2-Verter LG 1100", score: 2},
    {keyword: "AI Charging", informalName: "Product", link: "https://www.livguard.com/inverters-for-home-use/i2-verter-LG-1700.php", title: "i2-Verter LG 1700", score: 2},
    {keyword: "AI Charging", informalName: "Product", link: "https://www.livguard.com/inverters-for-home-use/i2-verter-LG-900.php", title: "i2-Verter LG 900", score: 2},
    {keyword: "AI Charging", informalName: "Product", link: "https://www.livguard.com/inverters-for-home-use/i2-verter-LG-700.php", title: "i2-Verter LG 700", score: 2},
    {keyword: "AI Charging", informalName: "Category(Inverter)", link: "https://www.livguard.com/inverter for home/", title: "Buy Best Inverter for Home at the Lowest Price in India ", score: 1},
    {keyword: "Tubular", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "Flat Plate", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "Long Life", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "Load Calculator", informalName: "Load Calculator", link: "https://www.livguard.com/Load-Calculator", title: "Plan the power consumption requirements of your home ", score: 1},
    {keyword: "Load", informalName: "Load Calculator", link: "https://www.livguard.com/Load-Calculator", title: "Plan the power consumption requirements of your home ", score: 1},
    {keyword: "Power Planner", informalName: "Load Calculator", link: "https://www.livguard.com/Load-Calculator", title: "Plan the power consumption requirements of your home ", score: 1},
    {keyword: "600VA", informalName: "Category(Inverter)", link: "https://www.livguard.com/inverter for home/", title: "Buy Best Inverter for Home at the Lowest Price in India ", score: 1},
    {keyword: "700VA", informalName: "Category(Inverter)", link: "https://www.livguard.com/inverter for home/", title: "Buy Best Inverter for Home at the Lowest Price in India ", score: 1},
    {keyword: "800VA", informalName: "Category(Inverter)", link: "https://www.livguard.com/inverter for home/", title: "Buy Best Inverter for Home at the Lowest Price in India ", score: 1},
    {keyword: "900VA", informalName: "Category(Inverter)", link: "https://www.livguard.com/inverter for home/", title: "Buy Best Inverter for Home at the Lowest Price in India ", score: 1},
    {keyword: "1100VA", informalName: "Category(Inverter)", link: "https://www.livguard.com/inverter for home/", title: "Buy Best Inverter for Home at the Lowest Price in India ", score: 1},
    {keyword: "1250VA", informalName: "Category(Inverter)", link: "https://www.livguard.com/inverter for home/", title: "Buy Best Inverter for Home at the Lowest Price in India ", score: 1},
    {keyword: "1500VA", informalName: "Category(Inverter)", link: "https://www.livguard.com/inverter for home/", title: "Buy Best Inverter for Home at the Lowest Price in India ", score: 1},
    {keyword: "1650VA", informalName: "Category(Inverter)", link: "https://www.livguard.com/inverter for home/", title: "Buy Best Inverter for Home at the Lowest Price in India ", score: 1},
    {keyword: "2000VA", informalName: "Category(Inverter)", link: "https://www.livguard.com/inverter for home/", title: "Buy Best Inverter for Home at the Lowest Price in India ", score: 1},
    {keyword: "2500VA", informalName: "Category(Inverter)", link: "https://www.livguard.com/inverter for home/", title: "Buy Best Inverter for Home at the Lowest Price in India ", score: 1},
    {keyword: "3500VA", informalName: "Category(Inverter)", link: "https://www.livguard.com/inverter for home/", title: "Buy Best Inverter for Home at the Lowest Price in India ", score: 1},
    {keyword: "4000VA", informalName: "Category(Inverter)", link: "https://www.livguard.com/inverter for home/", title: "Buy Best Inverter for Home at the Lowest Price in India ", score: 1},
    {keyword: "600VA", informalName: "Product", link: "https://www.livguard.com/inverters-for-home-use/i2-verter-LG-700.php", title: "i2-Verter LG 700", score: 1},
    {keyword: "800VA", informalName: "Product", link: "https://www.livguard.com/inverters-for-home-use/i-verter-LGS-900.php", title: "i-Verter LGS 900", score: 1},
    {keyword: "900VA", informalName: "Product", link: "https://www.livguard.com/inverters-for-home-use/i2-verter-LG-1100.php", title: "i2-Verter LG 1100", score: 1},
    {keyword: "1500VA", informalName: "Product", link: "https://www.livguard.com/inverters-for-home-use/i-verter-LGS-1700.php", title: "i-Verter LGS 1700", score: 1},
    {keyword: "2000VA", informalName: "Product", link: "https://www.livguard.com/high-capacity-inverters/ih-verter-LG2300.php", title: "ih-verter LG2300", score: 1},
    {keyword: "2500VA", informalName: "Product", link: "https://www.livguard.com/high-capacity-inverters/ih-verter-LGS-3000.php", title: "ih-verter LGS 3000", score: 1},
    {keyword: "3500VA", informalName: "Product", link: "https://www.livguard.com/high-capacity-inverters/ih-verter-LGS-4000.php", title: "ih-verter LGS 4000", score: 1},
    {keyword: "90Ah", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 1},
    {keyword: "100Ah", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 1},
    {keyword: "110Ah", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 1},
    {keyword: "120Ah", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 1},
    {keyword: "135Ah", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 1},
    {keyword: "150Ah", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 1},
    {keyword: "160Ah", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 1},
    {keyword: "180Ah", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 1},
    {keyword: "200Ah", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 1},
    {keyword: "220Ah", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 1},
    {keyword: "230Ah", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 1},
    {keyword: "260Ah", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 1},
    {keyword: "100Ah", informalName: "Product", link: "https://www.livguard.com/solar-battery-for-home/Solar-Battery-LS-10060TT.php", title: "Livguard Solar Battery LS-10060TT", score: 1},
    {keyword: "120Ah", informalName: "Product", link: "https://www.livguard.com/erickshaw-batteries/E-Shakti-LG-C0-ERTU-1800.php", title: "E-Shakti LG C0 ERTU 1800", score: 1},
    {keyword: "120Ah", informalName: "Product", link: "https://www.livguard.com/vrla-batteries/vrla-lgv12-120.php", title: "LGV12-120", score: 1},
    {keyword: "135Ah", informalName: "Product", link: "https://www.livguard.com/solar-battery-for-home/Solar-battery-LS-13560TT.php", title: "Livguard Solar Battery LS-13560TT", score: 1},
    {keyword: "150Ah", informalName: "Product", link: "https://www.livguard.com/inverter-batteries/invertuff-IT-1554TT.php", title: "Invertuff IT 1554TT", score: 1},
    {keyword: "160Ah", informalName: "Product", link: "https://www.livguard.com/inverter-batteries/invertuff-IT-1666TT.php", title: "Invertuff IT 1666TT", score: 1},
    {keyword: "180Ah", informalName: "Product", link: "https://www.livguard.com/inverter-batteries/invertuff-IT-1866TT.php", title: "Invertuff IT 1866TT", score: 1},
    {keyword: "200Ah", informalName: "Product", link: "https://www.livguard.com/inverter-batteries/invertuff-IT-1536FP.php", title: "Invertuff IT 1536FP", score: 1},
    {keyword: "220Ah", informalName: "Product", link: "https://www.livguard.com/inverter-batteries/invertuff-IT-2266TT.php", title: "Invertuff IT 2266TT", score: 1},
    {keyword: "IT 2060TT", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1550TT", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1639TT", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 2360TT", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 2048TT", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1666TT", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1554TT", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1860TT", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 2266TT", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1645TT", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1548TT", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1560TT", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1536TT", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1866TT", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 2066TT", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 2672TT", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1584TT", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1636STJ", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1554STJ", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1542STJ", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1848STJ", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT481400ST", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT481500ST", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1048ST", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 9048ST", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 481200ST", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1560STT", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1548STT", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1160STT", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1536FP", informalName: "Category(IB)", link: "https://www.livguard.com/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1666TT", informalName: "Product", link: "https://www.livguard.com/inverter-batteries/invertuff-IT-1666TT.php", title: "Invertuff IT 1666TT", score: 2},
    {keyword: "IT 1554TT", informalName: "Product", link: "https://www.livguard.com/inverter-batteries/invertuff-IT-1554TT.php", title: "Invertuff IT 1554TT", score: 2},
    {keyword: "IT 2266TT", informalName: "Product", link: "https://www.livguard.com/inverter-batteries/invertuff-IT-2266TT.php", title: "Invertuff IT 2266TT", score: 2},
    {
        keyword: "IT 1560TT",
        informalName: "Product",
        link: "https://www.livguard.com/inverter-batteries/invertuff-IT-1560TT.php",
        title: "Inverter, Car Battery, Solar Panel at Best Price in India - Livguard",
        score: 2,
    },
    {keyword: "IT 1866TT", informalName: "Product", link: "https://www.livguard.com/inverter-batteries/invertuff-IT-1866TT.php", title: "Invertuff IT 1866TT", score: 2},
    {keyword: "IT 1536FP", informalName: "Product", link: "https://www.livguard.com/inverter-batteries/invertuff-IT-1536FP.php", title: "Invertuff IT 1536FP", score: 2},
];
