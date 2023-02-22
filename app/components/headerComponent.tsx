import {Dialog, Listbox, Transition} from "@headlessui/react";
import {Bars3Icon, ChevronRightIcon, LanguageIcon} from "@heroicons/react/20/solid";
import {Form, Link, useNavigate, useSubmit} from "@remix-run/react";
import React, {useEffect, useRef, useState} from "react";
import {ArrowLeftShort, BrightnessHighFill, BrightnessLowFill, Check2, MoonStarsFill, Search, Telephone, X} from "react-bootstrap-icons";
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

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuState = useRef<MenuState>(MenuState.Closed);

    function tryToOpenMenu() {
        if (menuState.current == MenuState.Closed) {
            setIsMenuOpen(true);
        }
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
                <a href="tel:18001025551">{getVernacularString("headerS1T1", userPreferences.language)}</a>

                <HorizontalSpacer className="tw-w-3" />

                <div className="tw-w-px tw-h-4 lg-bg-secondary-900" />

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
                        <Listbox.Button className="lg-bg-transparent lg-text-secondary-900 tw-grid tw-grid-cols-[auto_1.5rem] tw-gap-x-2 tw-items-center">
                            <object
                                data="https://files.growthjockey.com/livguard/icons/header/vernacular.svg"
                                className="tw-w-4 tw-h-4 dark:tw-invert"
                            />
                            {languageToShortHumanFriendlyFormat(selectedLanguage)}
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

                <div className="tw-block dark:tw-hidden">
                    <Link to="/">
                        <FixedHeightImage
                            relativePath="/livguard/header/logo-100-light.jpg"
                            height="1.5rem"
                            imageCdnProvider={ImageCdnProvider.GrowthJockey}
                        />
                    </Link>
                </div>

                <div className="dark:tw-block tw-hidden">
                    <Link to="/">
                        <FixedHeightImage
                            relativePath="/livguard/header/logo-100-dark.jpg"
                            height="1.5rem"
                            imageCdnProvider={ImageCdnProvider.GrowthJockey}
                        />
                    </Link>
                </div>

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
    const [searchResults, setSearchResults] = useState<Array<{keyword: string; page: string}> | null>(null);

    function tryToCloseSearch() {
        setIsSearchOpen(false);
    }

    useEffect(() => {
        if (query.length == 0) {
            setSearchResults(null);
        } else {
            const queryLowerCase = query.toLowerCase();

            const results = searchQueries.filter((searchQuery) => searchQuery.keyword.toLowerCase().includes(queryLowerCase)).sort((searchQuery1, searchQuery2) => searchQuery1.score - searchQuery2.score);

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
                                                to={pageToLink[result.page] ?? "/"}
                                                key={resultIndex}
                                                className="lg-bg-secondary-700 tw-p-4 tw-flex tw-flex-row tw-justify-between tw-items-center tw-rounded-lg"
                                            >
                                                <div className="lg-text-body-bold lg-text-secondary-100">{result.page}</div>

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
    }
    else if(download == null){
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

const pageToLink: {[page: string]: string} = {
    Home: "/",
    "Load Calculator": "/load-calculator",
};

const searchQueries = [
    {
        keyword: "Inverter",
        page: "Home",
        score: 1,
    },
    {
        keyword: "Inverter",
        page: "LP1",
        score: 1,
    },
    {
        keyword: "Inverter",
        page: "LP2",
        score: 1,
    },
    {
        keyword: "Inverter",
        page: "LP3",
        score: 1,
    },
    {
        keyword: "Inverter",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "Inverter",
        page: "Product",
        score: 1,
    },
    {
        keyword: "Battery",
        page: "Home",
        score: 1,
    },
    {
        keyword: "Battery",
        page: "LP1",
        score: 1,
    },
    {
        keyword: "Battery",
        page: "LP2",
        score: 1,
    },
    {
        keyword: "Battery",
        page: "LP3",
        score: 1,
    },
    {
        keyword: "Battery",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "Battery",
        page: "Product",
        score: 1,
    },
    {
        keyword: "Dealer",
        page: "Dealer Locater",
        score: 1,
    },
    {
        keyword: "Near",
        page: "Dealer Locater",
        score: 1,
    },
    {
        keyword: "Store",
        page: "Dealer Locater",
        score: 1,
    },
    {
        keyword: "Buy",
        page: "Dealer Locater",
        score: 1,
    },
    {
        keyword: "Sine",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "Sine",
        page: "Product",
        score: 1,
    },
    {
        keyword: "Square",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "Square",
        page: "Product",
        score: 1,
    },
    {
        keyword: "Automotive Battery",
        page: "Home",
        score: 1,
    },
    {
        keyword: "Automotive Battery",
        page: "LP1",
        score: 1,
    },
    {
        keyword: "Automotive Battery",
        page: "LP2",
        score: 1,
    },
    {
        keyword: "Home Battery",
        page: "Home",
        score: 1,
    },
    {
        keyword: "Home Battery",
        page: "LP1",
        score: 1,
    },
    {
        keyword: "Home Battery",
        page: "LP2",
        score: 1,
    },
    {
        keyword: "Solar",
        page: "Home",
        score: 1,
    },
    {
        keyword: "Solar",
        page: "LP1",
        score: 1,
    },
    {
        keyword: "Solar",
        page: "LP2",
        score: 1,
    },
    {
        keyword: "Jodi",
        page: "Home",
        score: 1,
    },
    {
        keyword: "Jodi",
        page: "LP3",
        score: 1,
    },
    {
        keyword: "Car Battery",
        page: "Home",
        score: 1,
    },
    {
        keyword: "Car Battery",
        page: "LP1",
        score: 1,
    },
    {
        keyword: "Car Battery",
        page: "LP2",
        score: 1,
    },
    {
        keyword: "E-Rickshaw Battery",
        page: "Home",
        score: 1,
    },
    {
        keyword: "E-Rickshaw Battery",
        page: "LP1",
        score: 1,
    },
    {
        keyword: "E-Rickshaw Battery",
        page: "LP2",
        score: 1,
    },
    {
        keyword: "Tempo Battery",
        page: "Home",
        score: 1,
    },
    {
        keyword: "Tempo Battery",
        page: "LP1",
        score: 1,
    },
    {
        keyword: "Tempo Battery",
        page: "LP2",
        score: 1,
    },
    {
        keyword: "Truck Battery",
        page: "Home",
        score: 1,
    },
    {
        keyword: "Truck Battery",
        page: "LP1",
        score: 1,
    },
    {
        keyword: "Truck Battery",
        page: "LP2",
        score: 1,
    },
    {
        keyword: "Service ",
        page: "Home",
        score: 1,
    },
    {
        keyword: "Accessories ",
        page: "Home",
        score: 1,
    },
    {
        keyword: "Accessories ",
        page: "LP1",
        score: 1,
    },
    {
        keyword: "Accessories ",
        page: "LP2",
        score: 1,
    },
    {
        keyword: "3D Grid ",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "3D Grid ",
        page: "Product",
        score: 1,
    },
    {
        keyword: "AI Charging",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "AI Charging",
        page: "Product",
        score: 1,
    },
    {
        keyword: "Tubular",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "Tubular",
        page: "Product",
        score: 1,
    },
    {
        keyword: "Flat Plate",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "Flat Plate",
        page: "Product",
        score: 1,
    },
    {
        keyword: "Long Life",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "Long Life",
        page: "Product",
        score: 1,
    },
    {
        keyword: "Load Calculator",
        page: "Load Calculator",
        score: 1,
    },
    {
        keyword: "Load",
        page: "Load Calculator",
        score: 1,
    },
    {
        keyword: "Power Planner",
        page: "Load Calculator",
        score: 1,
    },
    {
        keyword: "600VA",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "700VA",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "800VA",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "900VA",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "1100VA",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "1250VA",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "1500VA",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "1650VA",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "2000VA",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "2500VA",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "3500VA",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "4000VA",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "600VA",
        page: "Product",
        score: 1,
    },
    {
        keyword: "700VA",
        page: "Product",
        score: 1,
    },
    {
        keyword: "800VA",
        page: "Product",
        score: 1,
    },
    {
        keyword: "900VA",
        page: "Product",
        score: 1,
    },
    {
        keyword: "1100VA",
        page: "Product",
        score: 1,
    },
    {
        keyword: "1250VA",
        page: "Product",
        score: 1,
    },
    {
        keyword: "1500VA",
        page: "Product",
        score: 1,
    },
    {
        keyword: "1650VA",
        page: "Product",
        score: 1,
    },
    {
        keyword: "2000VA",
        page: "Product",
        score: 1,
    },
    {
        keyword: "2500VA",
        page: "Product",
        score: 1,
    },
    {
        keyword: "3500VA",
        page: "Product",
        score: 1,
    },
    {
        keyword: "4000VA",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LG2300",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LG3500",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LG5000",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LGS2500",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LGS3000",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LGS4000",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LGS5000",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LG1150i",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LG1450i",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LG1550i",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LG1950i",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LG750i",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LG850i",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LG950i",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LGS1000i",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LGS1100i",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LGS1600",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LGS1700",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LGS900i",
        page: "Product",
        score: 1,
    },
    {
        keyword: "90Ah",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "100Ah",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "110Ah",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "120Ah",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "135Ah",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "150Ah",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "160Ah",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "180Ah",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "200Ah",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "220Ah",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "230Ah",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "260Ah",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "90Ah",
        page: "Product",
        score: 1,
    },
    {
        keyword: "100Ah",
        page: "Product",
        score: 1,
    },
    {
        keyword: "110Ah",
        page: "Product",
        score: 1,
    },
    {
        keyword: "120Ah",
        page: "Product",
        score: 1,
    },
    {
        keyword: "135Ah",
        page: "Product",
        score: 1,
    },
    {
        keyword: "150Ah",
        page: "Product",
        score: 1,
    },
    {
        keyword: "160Ah",
        page: "Product",
        score: 1,
    },
    {
        keyword: "180Ah",
        page: "Product",
        score: 1,
    },
    {
        keyword: "200Ah",
        page: "Product",
        score: 1,
    },
    {
        keyword: "220Ah",
        page: "Product",
        score: 1,
    },
    {
        keyword: "230Ah",
        page: "Product",
        score: 1,
    },
    {
        keyword: "260Ah",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 2060TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1550TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1639TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 2360TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 2048TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1666TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1554TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1860TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 2266TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1645TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1548TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1560TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1536TT ",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1866TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 2066TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 2672TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1584TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1636STJ",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1554STJ",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1542STJ",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1848STJ",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT481400ST",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT481500ST",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1048ST",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 9048ST",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 481200ST",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1560STT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1548STT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1160STT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1536FP",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 2060TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1550TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1639TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 2360TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 2048TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1666TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1554TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1860TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 2266TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1645TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1548TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1560TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1536TT ",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1866TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 2066TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 2672TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1584TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1636STJ",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1554STJ",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1542STJ",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1848STJ",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT481400ST",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT481500ST",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1048ST",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 9048ST",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 481200ST",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1560STT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1548STT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1160STT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1536FP",
        page: "Product",
        score: 1,
    },
    {
        keyword: "इन्वर्टर",
        page: "Home",
        score: 1,
    },
    {
        keyword: "इन्वर्टर",
        page: "LP1",
        score: 1,
    },
    {
        keyword: "इन्वर्टर",
        page: "LP2",
        score: 1,
    },
    {
        keyword: "इन्वर्टर",
        page: "LP3",
        score: 1,
    },
    {
        keyword: "इन्वर्टर",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "इन्वर्टर",
        page: "Product",
        score: 1,
    },
    {
        keyword: "बैटरी",
        page: "Home",
        score: 1,
    },
    {
        keyword: "बैटरी",
        page: "LP1",
        score: 1,
    },
    {
        keyword: "बैटरी",
        page: "LP2",
        score: 1,
    },
    {
        keyword: "बैटरी",
        page: "LP3",
        score: 1,
    },
    {
        keyword: "बैटरी",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "बैटरी",
        page: "Product",
        score: 1,
    },
    {
        keyword: "डीलर",
        page: "Dealer Locater",
        score: 1,
    },
    {
        keyword: "निकत",
        page: "Dealer Locater",
        score: 1,
    },
    {
        keyword: "दुकान",
        page: "Dealer Locater",
        score: 1,
    },
    {
        keyword: "खरीद",
        page: "Dealer Locater",
        score: 1,
    },
    {
        keyword: "साइन",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "साइन",
        page: "Product",
        score: 1,
    },
    {
        keyword: "चौकोर",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "चौकोर",
        page: "Product",
        score: 1,
    },
    {
        keyword: "ऑटोमोटिव बैटरी",
        page: "Home",
        score: 1,
    },
    {
        keyword: "ऑटोमोटिव बैटरी",
        page: "LP1",
        score: 1,
    },
    {
        keyword: "ऑटोमोटिव बैटरी",
        page: "LP2",
        score: 1,
    },
    {
        keyword: "घरेलु बैटरी",
        page: "Home",
        score: 1,
    },
    {
        keyword: "घरेलु बैटरी",
        page: "LP1",
        score: 1,
    },
    {
        keyword: "घरेलु बैटरी",
        page: "LP2",
        score: 1,
    },
    {
        keyword: "सोलर",
        page: "Home",
        score: 1,
    },
    {
        keyword: "सोलर",
        page: "LP1",
        score: 1,
    },
    {
        keyword: "सोलर",
        page: "LP2",
        score: 1,
    },
    {
        keyword: "जोड़ी",
        page: "Home",
        score: 1,
    },
    {
        keyword: "जोड़ी",
        page: "LP3",
        score: 1,
    },
    {
        keyword: "कार बैटरी",
        page: "Home",
        score: 1,
    },
    {
        keyword: "कार बैटरी",
        page: "LP1",
        score: 1,
    },
    {
        keyword: "कार बैटरी",
        page: "LP2",
        score: 1,
    },
    {
        keyword: "इ-रिक्शा बैटरी",
        page: "Home",
        score: 1,
    },
    {
        keyword: "इ-रिक्शा बैटरी",
        page: "LP1",
        score: 1,
    },
    {
        keyword: "इ-रिक्शा बैटरी",
        page: "LP2",
        score: 1,
    },
    {
        keyword: "टेम्पो बैटरी",
        page: "Home",
        score: 1,
    },
    {
        keyword: "टेम्पो बैटरी",
        page: "LP1",
        score: 1,
    },
    {
        keyword: "टेम्पो बैटरी",
        page: "LP2",
        score: 1,
    },
    {
        keyword: "ट्रक बैटरी",
        page: "Home",
        score: 1,
    },
    {
        keyword: "ट्रक बैटरी",
        page: "LP1",
        score: 1,
    },
    {
        keyword: "ट्रक बैटरी",
        page: "LP2",
        score: 1,
    },
    {
        keyword: "सेवा",
        page: "Home",
        score: 1,
    },
    {
        keyword: "एक्सेसरीज",
        page: "Home",
        score: 1,
    },
    {
        keyword: "एक्सेसरीज",
        page: "LP1",
        score: 1,
    },
    {
        keyword: "एक्सेसरीज",
        page: "LP2",
        score: 1,
    },
    {
        keyword: "3द ग्रिड",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "3द ग्रिड",
        page: "Product",
        score: 1,
    },
    {
        keyword: "एआई चार्जिंग",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "एआई चार्जिंग",
        page: "Product",
        score: 1,
    },
    {
        keyword: "ट्यूबलर",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "ट्यूबलर",
        page: "Product",
        score: 1,
    },
    {
        keyword: "फ्लैट प्लेट",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "फ्लैट प्लेट",
        page: "Product",
        score: 1,
    },
    {
        keyword: " टिकाऊ ",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: " टिकाऊ ",
        page: "Product",
        score: 1,
    },
    {
        keyword: "लोड कैलकुलेटर",
        page: "Load Calculator",
        score: 1,
    },
    {
        keyword: "लोड ",
        page: "Load Calculator",
        score: 1,
    },
    {
        keyword: "पावर प्लानर",
        page: "Load Calculator",
        score: 1,
    },
    {
        keyword: "600VA",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "700VA",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "800VA",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "900VA",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "1100VA",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "1250VA",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "1500VA",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "1650VA",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "2000VA",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "2500VA",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "3500VA",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "4000VA",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "600VA",
        page: "Product",
        score: 1,
    },
    {
        keyword: "700VA",
        page: "Product",
        score: 1,
    },
    {
        keyword: "800VA",
        page: "Product",
        score: 1,
    },
    {
        keyword: "900VA",
        page: "Product",
        score: 1,
    },
    {
        keyword: "1100VA",
        page: "Product",
        score: 1,
    },
    {
        keyword: "1250VA",
        page: "Product",
        score: 1,
    },
    {
        keyword: "1500VA",
        page: "Product",
        score: 1,
    },
    {
        keyword: "1650VA",
        page: "Product",
        score: 1,
    },
    {
        keyword: "2000VA",
        page: "Product",
        score: 1,
    },
    {
        keyword: "2500VA",
        page: "Product",
        score: 1,
    },
    {
        keyword: "3500VA",
        page: "Product",
        score: 1,
    },
    {
        keyword: "4000VA",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LG2300",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LG3500",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LG5000",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LGS2500",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LGS3000",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LGS4000",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LGS5000",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LG1150i",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LG1450i",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LG1550i",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LG1950i",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LG750i",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LG850i",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LG950i",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LGS1000i",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LGS1100i",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LGS1600",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LGS1700",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LGS900i",
        page: "Product",
        score: 1,
    },
    {
        keyword: "90Ah",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "100Ah",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "110Ah",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "120Ah",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "135Ah",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "150Ah",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "160Ah",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "180Ah",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "200Ah",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "220Ah",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "230Ah",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "260Ah",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "90Ah",
        page: "Product",
        score: 1,
    },
    {
        keyword: "100Ah",
        page: "Product",
        score: 1,
    },
    {
        keyword: "110Ah",
        page: "Product",
        score: 1,
    },
    {
        keyword: "120Ah",
        page: "Product",
        score: 1,
    },
    {
        keyword: "135Ah",
        page: "Product",
        score: 1,
    },
    {
        keyword: "150Ah",
        page: "Product",
        score: 1,
    },
    {
        keyword: "160Ah",
        page: "Product",
        score: 1,
    },
    {
        keyword: "180Ah",
        page: "Product",
        score: 1,
    },
    {
        keyword: "200Ah",
        page: "Product",
        score: 1,
    },
    {
        keyword: "220Ah",
        page: "Product",
        score: 1,
    },
    {
        keyword: "230Ah",
        page: "Product",
        score: 1,
    },
    {
        keyword: "260Ah",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 2060TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1550TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1639TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 2360TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 2048TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1666TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1554TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1860TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 2266TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1645TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1548TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1560TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1536TT ",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1866TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 2066TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 2672TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1584TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1636STJ",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1554STJ",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1542STJ",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1848STJ",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT481400ST",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT481500ST",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1048ST",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 9048ST",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 481200ST",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1560STT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1548STT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1160STT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1536FP",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 2060TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1550TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1639TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 2360TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 2048TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1666TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1554TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1860TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 2266TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1645TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1548TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1560TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1536TT ",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1866TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 2066TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 2672TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1584TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1636STJ",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1554STJ",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1542STJ",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1848STJ",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT481400ST",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT481500ST",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1048ST",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 9048ST",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 481200ST",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1560STT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1548STT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1160STT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1536FP",
        page: "Product",
        score: 1,
    },
    {
        keyword: "इन्वर्टर",
        page: "Home",
        score: 1,
    },
    {
        keyword: "इन्वर्टर",
        page: "LP1",
        score: 1,
    },
    {
        keyword: "इन्वर्टर",
        page: "LP2",
        score: 1,
    },
    {
        keyword: "इन्वर्टर",
        page: "LP3",
        score: 1,
    },
    {
        keyword: "इन्वर्टर",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "इन्वर्टर",
        page: "Product",
        score: 1,
    },
    {
        keyword: "बैटरी",
        page: "Home",
        score: 1,
    },
    {
        keyword: "बैटरी",
        page: "LP1",
        score: 1,
    },
    {
        keyword: "बैटरी",
        page: "LP2",
        score: 1,
    },
    {
        keyword: "बैटरी",
        page: "LP3",
        score: 1,
    },
    {
        keyword: "बैटरी",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "बैटरी",
        page: "Product",
        score: 1,
    },
    {
        keyword: "डीलर",
        page: "Dealer Locater",
        score: 1,
    },
    {
        keyword: "निकत",
        page: "Dealer Locater",
        score: 1,
    },
    {
        keyword: "दुकान",
        page: "Dealer Locater",
        score: 1,
    },
    {
        keyword: "खरीद",
        page: "Dealer Locater",
        score: 1,
    },
    {
        keyword: "साइन",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "साइन",
        page: "Product",
        score: 1,
    },
    {
        keyword: "चौकोर",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "चौकोर",
        page: "Product",
        score: 1,
    },
    {
        keyword: "ऑटोमोटिव बैटरी",
        page: "Home",
        score: 1,
    },
    {
        keyword: "ऑटोमोटिव बैटरी",
        page: "LP1",
        score: 1,
    },
    {
        keyword: "ऑटोमोटिव बैटरी",
        page: "LP2",
        score: 1,
    },
    {
        keyword: "घरेलु बैटरी",
        page: "Home",
        score: 1,
    },
    {
        keyword: "घरेलु बैटरी",
        page: "LP1",
        score: 1,
    },
    {
        keyword: "घरेलु बैटरी",
        page: "LP2",
        score: 1,
    },
    {
        keyword: "सोलर",
        page: "Home",
        score: 1,
    },
    {
        keyword: "सोलर",
        page: "LP1",
        score: 1,
    },
    {
        keyword: "सोलर",
        page: "LP2",
        score: 1,
    },
    {
        keyword: "जोड़ी",
        page: "Home",
        score: 1,
    },
    {
        keyword: "जोड़ी",
        page: "LP3",
        score: 1,
    },
    {
        keyword: "कार बैटरी",
        page: "Home",
        score: 1,
    },
    {
        keyword: "कार बैटरी",
        page: "LP1",
        score: 1,
    },
    {
        keyword: "कार बैटरी",
        page: "LP2",
        score: 1,
    },
    {
        keyword: "इ-रिक्शा बैटरी",
        page: "Home",
        score: 1,
    },
    {
        keyword: "इ-रिक्शा बैटरी",
        page: "LP1",
        score: 1,
    },
    {
        keyword: "इ-रिक्शा बैटरी",
        page: "LP2",
        score: 1,
    },
    {
        keyword: "टेम्पो बैटरी",
        page: "Home",
        score: 1,
    },
    {
        keyword: "टेम्पो बैटरी",
        page: "LP1",
        score: 1,
    },
    {
        keyword: "टेम्पो बैटरी",
        page: "LP2",
        score: 1,
    },
    {
        keyword: "ट्रक बैटरी",
        page: "Home",
        score: 1,
    },
    {
        keyword: "ट्रक बैटरी",
        page: "LP1",
        score: 1,
    },
    {
        keyword: "ट्रक बैटरी",
        page: "LP2",
        score: 1,
    },
    {
        keyword: "सेवा",
        page: "Home",
        score: 1,
    },
    {
        keyword: "एक्सेसरीज",
        page: "Home",
        score: 1,
    },
    {
        keyword: "एक्सेसरीज",
        page: "LP1",
        score: 1,
    },
    {
        keyword: "एक्सेसरीज",
        page: "LP2",
        score: 1,
    },
    {
        keyword: "3द ग्रिड",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "3द ग्रिड",
        page: "Product",
        score: 1,
    },
    {
        keyword: "एआई चार्जिंग",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "एआई चार्जिंग",
        page: "Product",
        score: 1,
    },
    {
        keyword: "ट्यूबलर",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "ट्यूबलर",
        page: "Product",
        score: 1,
    },
    {
        keyword: "फ्लैट प्लेट",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "फ्लैट प्लेट",
        page: "Product",
        score: 1,
    },
    {
        keyword: " टिकाऊ ",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: " टिकाऊ ",
        page: "Product",
        score: 1,
    },
    {
        keyword: "लोड कैलकुलेटर",
        page: "Load Calculator",
        score: 1,
    },
    {
        keyword: "लोड ",
        page: "Load Calculator",
        score: 1,
    },
    {
        keyword: "पावर प्लानर",
        page: "Load Calculator",
        score: 1,
    },
    {
        keyword: "600VA",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "700VA",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "800VA",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "900VA",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "1100VA",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "1250VA",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "1500VA",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "1650VA",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "2000VA",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "2500VA",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "3500VA",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "4000VA",
        page: "Category(Inverter)",
        score: 1,
    },
    {
        keyword: "600VA",
        page: "Product",
        score: 1,
    },
    {
        keyword: "700VA",
        page: "Product",
        score: 1,
    },
    {
        keyword: "800VA",
        page: "Product",
        score: 1,
    },
    {
        keyword: "900VA",
        page: "Product",
        score: 1,
    },
    {
        keyword: "1100VA",
        page: "Product",
        score: 1,
    },
    {
        keyword: "1250VA",
        page: "Product",
        score: 1,
    },
    {
        keyword: "1500VA",
        page: "Product",
        score: 1,
    },
    {
        keyword: "1650VA",
        page: "Product",
        score: 1,
    },
    {
        keyword: "2000VA",
        page: "Product",
        score: 1,
    },
    {
        keyword: "2500VA",
        page: "Product",
        score: 1,
    },
    {
        keyword: "3500VA",
        page: "Product",
        score: 1,
    },
    {
        keyword: "4000VA",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LG2300",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LG3500",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LG5000",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LGS2500",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LGS3000",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LGS4000",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LGS5000",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LG1150i",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LG1450i",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LG1550i",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LG1950i",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LG750i",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LG850i",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LG950i",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LGS1000i",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LGS1100i",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LGS1600",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LGS1700",
        page: "Product",
        score: 1,
    },
    {
        keyword: "LGS900i",
        page: "Product",
        score: 1,
    },
    {
        keyword: "90Ah",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "100Ah",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "110Ah",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "120Ah",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "135Ah",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "150Ah",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "160Ah",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "180Ah",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "200Ah",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "220Ah",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "230Ah",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "260Ah",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "90Ah",
        page: "Product",
        score: 1,
    },
    {
        keyword: "100Ah",
        page: "Product",
        score: 1,
    },
    {
        keyword: "110Ah",
        page: "Product",
        score: 1,
    },
    {
        keyword: "120Ah",
        page: "Product",
        score: 1,
    },
    {
        keyword: "135Ah",
        page: "Product",
        score: 1,
    },
    {
        keyword: "150Ah",
        page: "Product",
        score: 1,
    },
    {
        keyword: "160Ah",
        page: "Product",
        score: 1,
    },
    {
        keyword: "180Ah",
        page: "Product",
        score: 1,
    },
    {
        keyword: "200Ah",
        page: "Product",
        score: 1,
    },
    {
        keyword: "220Ah",
        page: "Product",
        score: 1,
    },
    {
        keyword: "230Ah",
        page: "Product",
        score: 1,
    },
    {
        keyword: "260Ah",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 2060TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1550TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1639TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 2360TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 2048TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1666TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1554TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1860TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 2266TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1645TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1548TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1560TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1536TT ",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1866TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 2066TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 2672TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1584TT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1636STJ",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1554STJ",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1542STJ",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1848STJ",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT481400ST",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT481500ST",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1048ST",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 9048ST",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 481200ST",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1560STT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1548STT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1160STT",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 1536FP",
        page: "Category(IB)",
        score: 1,
    },
    {
        keyword: "IT 2060TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1550TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1639TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 2360TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 2048TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1666TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1554TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1860TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 2266TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1645TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1548TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1560TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1536TT ",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1866TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 2066TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 2672TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1584TT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1636STJ",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1554STJ",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1542STJ",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1848STJ",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT481400ST",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT481500ST",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1048ST",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 9048ST",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 481200ST",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1560STT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1548STT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1160STT",
        page: "Product",
        score: 1,
    },
    {
        keyword: "IT 1536FP",
        page: "Product",
        score: 1,
    },
];
