import {Dialog, Listbox, Transition} from "@headlessui/react";
import {Bars3Icon, ChevronRightIcon} from "@heroicons/react/20/solid";
import {Form, Link, useFetcher, useNavigate, useSubmit} from "@remix-run/react";
import React, {useEffect, useRef, useState} from "react";
import {ArrowLeftShort, BrightnessHighFill, Check2, ChevronDown, MoonStarsFill, Search, Telephone, X} from "react-bootstrap-icons";
import {FixedHeightImage} from "~/components/images/fixedHeightImage";
import {HorizontalSpacer} from "~/global-common-typescript/components/horizontalSpacer";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {OfferContactUsCta} from "~/routes/offers/inverter-and-battery-jodi";
import type {UserPreferences} from "~/typeDefinitions";
import {Language, Theme, languageToHumanFriendlyString, languageToShortHumanFriendlyFormat, themeToHumanFriendlyString} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";
import {ContactUsDialog as ContactUsLeadFormDialog} from "~/routes";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {useResizeDetector} from "react-resize-detector";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {getMetadataForImage} from "~/utilities";
import {ImageCdnProvider} from "~/global-common-typescript/typeDefinitions";

enum MenuState {
    Closed,
    Transitioning,
    Open,
}

enum SubMenu {
    Inverters,
    Batteries,
    AutomotiveBatteries,
    Solar,
    AccessoriesAndotherBatteries,
    DealerLocator,
    RegisterYourBrand,
    More,
}

export function HeaderComponent({
    userPreferences,
    redirectTo,
    showMobileMenuIcon,
    showSearchOption,
    showContactCtaButton,
    showContactDetails,
    pageUrl,
}: {
    userPreferences: UserPreferences;
    redirectTo: string;
    showMobileMenuIcon: boolean;
    showSearchOption: boolean;
    showContactCtaButton: boolean;
    showContactDetails: boolean;
    pageUrl?: string;
}) {
    const submit = useSubmit();

    const [isContactUsDialogOpen, setIsContactUsDialogOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuState = useRef<MenuState>(MenuState.Closed);

    function tryToOpenMenu() {
        if (menuState.current == MenuState.Closed) {
            setIsMenuOpen(true);
        }
    }

    const [currentlyOpenSubMenu, setCurrentlyOpenSubMenu] = useState<SubMenu | null>(null);
    const subMenuState = useRef<MenuState>(MenuState.Closed);

    function tryToOpenSubMenu(subMenu: SubMenu) {
        if (subMenuState.current == MenuState.Closed) {
            setCurrentlyOpenSubMenu(subMenu);
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

            // TODO: Remove this now?
            if (selectedTheme == Theme.Dark || (selectedTheme == null && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
                document.documentElement.classList.add("tw-dark");
            } else {
                document.documentElement.classList.remove("tw-dark");
            }
        }
    }, [selectedTheme]);

    return (
        <>
            <div className="tw-flex tw-flex-col tw-items-stretch tw-sticky tw-top-0 tw-z-[60]">
                <div className="tw-flex tw-flex-row tw-items-center lg-bg-secondary-300 lg-px-screen-edge tw-py-3">
                    {showContactDetails == false ? null : (
                        <>
                            <button
                                onClick={tryToOpenContactUsDialog}
                                className="tw-underline tw-underline-offset-4 lg:tw-hidden"
                            >
                                {getVernacularString("headerS1T1", userPreferences.language)}
                            </button>

                            <div className="tw-hidden lg:tw-flex tw-flex-row tw-items-center lg:tw-text-[13px] xl:tw-text-[16px]">
                                {getVernacularString("headerContactUsDialogT2", userPreferences.language)}:
                                <HorizontalSpacer className="tw-w-1" />
                                <a href="tel:18001025551">1800-1025-551</a>
                                <HorizontalSpacer className="tw-w-4 tw-border-r tw-border-solid tw-border-secondary-700-light dark:tw-border-secondary-700-dark" />
                                <HorizontalSpacer className="tw-w-4" />
                                {getVernacularString("headerContactUsDialogT3", userPreferences.language)}:
                                <HorizontalSpacer className="tw-w-1" />
                                <a href="tel:+919205667999">+91 92056-67999</a>
                            </div>
                        </>
                    )}

                    <div className="tw-flex-1" />

                    <Link
                        to="/offers"
                        className="tw-hidden lg:tw-flex flex-row tw-justify-between tw-items-center tw-transition tw-duration-200 hover:lg-text-primary-500"
                    >
                        <img
                            className="tw-invert dark:tw-invert-0"
                            src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/header/get-offers.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
                        />
                        <HorizontalSpacer className="tw-w-1" />
                        {getVernacularString("9316f275-c395-4344-99d7-895d162602c0", userPreferences.language)}
                    </Link>
                    <HorizontalSpacer className="tw-w-5" />

                    {/* <Link
                        to="/e-waste-management.php"
                        target="_blank"
                        className="tw-hidden lg:tw-flex flex-row tw-justify-between tw-items-center tw-transition tw-duration-200 hover:lg-text-primary-500"
                    >
                        <img
                            className="tw-invert dark:tw-invert-0"
                            src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/header/e-waste-management.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
                        />
                        <HorizontalSpacer className="tw-w-1" />
                        {getVernacularString("headerMenuSM8T6", userPreferences.language)}
                    </Link> */}

                    <HorizontalSpacer className="tw-w-5" />

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
                            <Listbox.Button className="lg-text-secondary-900">
                                <BrightnessHighFill className="tw-w-6 tw-h-6 tw-block dark:tw-hidden" />
                                <MoonStarsFill className="tw-w-6 tw-h-6 dark:tw-block tw-hidden" />
                            </Listbox.Button>

                            <Listbox.Options className="tw-absolute tw-z-[60] tw-top-12 tw-right-0 lg-text-secondary-900 tw-rounded-lg tw-overflow-hidden tw-w-max">
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
                                                        "tw-w-full tw-min-w-max tw-grid tw-grid-cols-[minmax(0,1fr)_auto] tw-items-center tw-gap-x-2 tw-px-2 tw-py-2 tw-cursor-pointer tw-duration-200",
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

                    <HorizontalSpacer className="tw-w-4 tw-border-r tw-border-solid tw-border-secondary-700-light dark:tw-border-secondary-700-dark" />

                    <HorizontalSpacer className="tw-w-4" />

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
                            <Listbox.Button className="lg-text-secondary-900 tw-grid tw-grid-cols-[1rem_1rem] tw-gap-x-2 tw-items-center lg:tw-text-[13px] xl:tw-text-[16px]">
                                {languageToShortHumanFriendlyFormat(selectedLanguage)}
                                <ChevronDown className="tw-w-4 tw-h-4" />
                            </Listbox.Button>

                            <Listbox.Options className="tw-absolute tw-z-[60] tw-top-12 tw-right-0 lg-text-secondary-900 tw-rounded-lg tw-overflow-hidden tw-w-max">
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
                                                        "tw-w-full tw-min-w-max tw-grid tw-grid-cols-[minmax(0,1fr)_auto] tw-items-center tw-gap-x-2 tw-px-2 tw-py-2 tw-cursor-pointer tw-duration-200",
                                                        active ? "lg-bg-primary-500 tw-text-secondary-900-dark" : "lg-bg-secondary-300",
                                                    )}
                                                >
                                                    <div>{languageToHumanFriendlyString(item)}</div>
                                                    {selected ? (
                                                        <Check2 className="tw-w-5 tw-h-5 lg:tw-h-3 lg:tw-w-3 xl:tw-h-5 xl:tw-w-5" />
                                                    ) : (
                                                        <div className="tw-w-5 tw-h-5 lg:tw-h-3 lg:tw-w-3 xl:tw-h-5 xl:tw-w-5" />
                                                    )}
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
                        <div className="tw-flex tw-flex-row lg:tw-hidden">
                            <button
                                type="button"
                                onClick={tryToOpenMenu}
                            >
                                <Bars3Icon className="tw-w-6 tw-h-6" />
                            </button>

                            <HorizontalSpacer className="tw-w-2" />
                        </div>
                    )}

                    <Link to="/">
                        <div className="tw-block dark:tw-hidden">
                            <img
                                src="https://files.growthjockey.com/livguard/icons/logo-light.svg"
                                width={385}
                                height={96}
                                className="tw-w-auto tw-h-6"
                            />
                        </div>

                        <div className="dark:tw-block tw-hidden">
                            <img
                                src="https://files.growthjockey.com/livguard/icons/logo-dark.svg"
                                width={385}
                                height={96}
                                className="tw-w-auto tw-h-6"
                            />
                        </div>
                    </Link>

                    <div className="tw-w-8 tw-hidden lg:tw-flex" />

                    {showMobileMenuIcon && (
                        <div className="tw-hidden [@media(min-width:1075px)]:tw-flex lg:tw-gap-x-4 xl:tw-gap-x-8 tw-items-center lg:tw-text-[13px] xl:tw-text-[16px]">
                            <button
                                type="button"
                                onClick={() => {
                                    tryToOpenSubMenu(SubMenu.Inverters);
                                }}
                                className="tw-transition tw-duration-200 hover:lg-text-primary-500"
                            >
                                {getVernacularString("headerMenuS1T1", userPreferences.language)}
                            </button>

                            <Link
                                to="/inverter-batteries"
                                className="tw-transition tw-duration-200 hover:lg-text-primary-500"
                            >
                                {getVernacularString("headerMenuS1T2", userPreferences.language)}
                            </Link>

                            <button
                                type="button"
                                onClick={() => {
                                    tryToOpenSubMenu(SubMenu.AutomotiveBatteries);
                                }}
                                className="tw-transition tw-duration-200 hover:lg-text-primary-500"
                            >
                                {getVernacularString("headerMenuS1T3", userPreferences.language)}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    tryToOpenSubMenu(SubMenu.Solar);
                                }}
                                className="tw-transition tw-duration-200 hover:lg-text-primary-500"
                            >
                                {getVernacularString("headerMenuS1T4", userPreferences.language)}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    tryToOpenSubMenu(SubMenu.AccessoriesAndotherBatteries);
                                }}
                                className="tw-transition tw-duration-200 hover:lg-text-primary-500"
                            >
                                {getVernacularString("headerMenuS1T5", userPreferences.language)}
                            </button>

                            <Link
                                to="/dealer-for-inverters-and-batteries"
                                className="tw-transition tw-duration-200 hover:lg-text-primary-500"
                            >
                                {getVernacularString("headerMenuS1T6", userPreferences.language)}
                            </Link>

                            {/* <a
                            href="/register-and-warranty-for-inverters.php"
                        >
                            {getVernacularString("headerMenuS1T7", userPreferences.language)}
                        </a> */}

                            <button
                                type="button"
                                onClick={() => {
                                    tryToOpenSubMenu(SubMenu.More);
                                }}
                                className="tw-transition tw-duration-200 hover:lg-text-primary-500"
                            >
                                {getVernacularString("headerMenuS1T8", userPreferences.language)}
                            </button>

                            <Link
                                to={"/load-calculator"}
                                className="tw-bg-gradient-to-r tw-from-[#F25F60] tw-to-[#EB2A2B] tw-px-12 tw-py-1 tw-rounded-3xl lg:tw-text-white"
                            >
                                {getVernacularString("headerLoadCalculator", userPreferences.language)}
                            </Link>
                        </div>
                    )}

                    <div className="tw-flex-1" />

                    {showSearchOption && (
                        <button
                            type="button"
                            onClick={tryToOpenSearch}
                            className="tw-flex tw-flex-row tw-items-center"
                        >
                            <Search className="tw-w-6 tw-h-6" />
                            <HorizontalSpacer className="tw-w-2" />
                            <div className="lg:tw-text-[13px] xl:tw-text-[16px]">{getVernacularString("headerS2T1", userPreferences.language)}</div>
                        </button>
                    )}
                    {showContactCtaButton && (
                        <OfferContactUsCta
                            userPreferences={userPreferences}
                            textVernacId="offerPageCta"
                            className="tw-z-10 tw-hidden lg:tw-block"
                            pageUrl={pageUrl}
                        />
                    )}
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
                    currentlyOpenSubMenu={currentlyOpenSubMenu}
                    setCurrentlyOpenSubMenu={setCurrentlyOpenSubMenu}
                    subMenuState={subMenuState}
                    tryToOpenSubMenu={tryToOpenSubMenu}
                />

                <SubMenuDialog
                    userPreferences={userPreferences}
                    currentlyOpenSubMenu={currentlyOpenSubMenu}
                    setCurrentlyOpenSubMenu={setCurrentlyOpenSubMenu}
                    subMenuState={subMenuState}
                />

                <SearchDialog
                    userPreferences={userPreferences}
                    isSearchOpen={isSearchOpen}
                    setIsSearchOpen={setIsSearchOpen}
                />
            </div>
        </>
    );
}

function MenuDialog({
    userPreferences,
    isMenuOpen,
    setIsMenuOpen,
    menuState,
    currentlyOpenSubMenu,
    setCurrentlyOpenSubMenu,
    subMenuState,
    tryToOpenSubMenu,
}: {
    userPreferences: UserPreferences;
    isMenuOpen: boolean;
    setIsMenuOpen: React.Dispatch<boolean>;
    menuState: React.MutableRefObject<MenuState>;
    currentlyOpenSubMenu: SubMenu | null;
    setCurrentlyOpenSubMenu: React.Dispatch<SubMenu | null>;
    subMenuState: React.MutableRefObject<MenuState>;
    tryToOpenSubMenu: (subMenu: SubMenu) => void;
}) {
    const navigate = useNavigate();

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
                className="tw-relative tw-z-[60]"
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

                    <div className="tw-w-full tw-max-h-[calc(100vh-5.5rem)] tw-rounded-t-lg tw-p-8 tw-grid tw-grid-rows-[minmax(0,20.75re)_2rem_minmax(0,13.75rem)_3rem] tw-justify-items-center tw-relative">
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
                                        subMenu: null,
                                        link: "/inverter-batteries",
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
                                        subMenu: SubMenu.Solar,
                                        link: null,
                                    },
                                    {
                                        linkTextTextContentPiece: "headerMenuS1T5",
                                        enterClassName: "tw-delay-[450ms]",
                                        subMenu: SubMenu.AccessoriesAndotherBatteries,
                                        link: null,
                                    },
                                    {
                                        linkTextTextContentPiece: "headerMenuS1T6",
                                        enterClassName: "tw-delay-[500ms]",
                                        subMenu: null,
                                        link: "/dealer-for-inverters-and-batteries",
                                    },
                                    {
                                        linkTextTextContentPiece: "headerMenuS1T7",
                                        enterClassName: "tw-delay-[550ms]",
                                        subMenu: null,
                                        link: "register-and-warranty-for-inverters.php",
                                    },
                                    {
                                        linkTextTextContentPiece: "headerMenuS1T8",
                                        enterClassName: "tw-delay-[600ms]",
                                        subMenu: SubMenu.More,
                                        link: null,
                                    },
                                    {
                                        linkTextTextContentPiece: "9316f275-c395-4344-99d7-895d162602c0",
                                        enterClassName: "tw-delay-[650ms]",
                                        subMenu: null,
                                        link: "/offers",
                                    },
                                    {
                                        linkTextTextContentPiece: "0d7eacab-de68-49a3-a0d2-c25eba53a1e3",
                                        enterClassName: "tw-delay-[700ms]",
                                        subMenu: null,
                                        link: "/e-waste-management.php",
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
                                                if (item.link.startsWith("/")) {
                                                    // TODO: This will break if the link is from the old website! Use with caution!
                                                    navigate(item.link);
                                                } else {
                                                    window.open(item.link, "_blank");
                                                }
                                                tryToCloseMenu();
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

                        <VerticalSpacer className="tw-h-[3.625rem]" />

                        {/* Removed Akshay to add Get Offers and E-Waste Management links to Mobile Menu */}
                        {/* <Transition.Child
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
                            />
                        </Transition.Child> */}

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
                                className="lg-cta-button tw-px-4 tw-z-10"
                            >
                                <div className="tw-grid tw-grid-cols-[1.5rem_2rem_auto_2rem_1.5rem] tw-items-center">
                                    <Telephone className="tw-col-start-1 tw-w-6 tw-h-6" />
                                    <div className="tw-col-start-3">{getVernacularString("headerMenuS2T1", userPreferences.language)}</div>
                                </div>
                            </a>
                        </Transition.Child>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </Transition>
    );
}

function SubMenuDialog({
    userPreferences,
    currentlyOpenSubMenu,
    setCurrentlyOpenSubMenu,
    subMenuState,
}: {
    userPreferences: UserPreferences;
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
                className="tw-relative tw-z-[60]"
                onClose={tryToCloseSubMenu}
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

                <Dialog.Panel className="tw-fixed tw-left-6 tw-right-6 tw-bottom-0 tw-max-w-lg tw-overflow-y-auto tw-grid tw-grid-cols tw-overflow-x-hidden">
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

                    <div className="tw-w-full tw-max-h-[calc(100vh-5.5rem)] tw-rounded-t-lg tw-p-8 tw-grid tw-grid-rows-[minmax(0,20.75rem)_2rem_minmax(0,13.75rem)_3rem] tw-justify-items-center tw-relative">
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
                                            : currentlyOpenSubMenu == SubMenu.Solar
                                            ? getVernacularString("headerMenuSM4T1", userPreferences.language)
                                            : currentlyOpenSubMenu == SubMenu.AccessoriesAndotherBatteries
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
                                                  link: "/inverter-for-home",
                                                  external: false,
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "headerMenuSM1T3",
                                                  enterClassName: "tw-delay-[300ms]",
                                                  link: "/high-capacity-inverters/",
                                                  external: true,
                                                  download: null,
                                              },
                                          ]
                                        : currentlyOpenSubMenu == SubMenu.Batteries
                                        ? []
                                        : currentlyOpenSubMenu == SubMenu.AutomotiveBatteries
                                        ? [
                                              {
                                                  linkTextTextContentPiece: "headerMenuSM3T2",
                                                  enterClassName: "tw-delay-[250ms]",
                                                  link: "/car-and-suv-batteries/",
                                                  external: true,
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "headerMenuSM3T3",
                                                  enterClassName: "tw-delay-[300ms]",
                                                  link: "/two-wheeler-batteries/",
                                                  external: true,
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "headerMenuSM3T4",
                                                  enterClassName: "tw-delay-[350ms]",
                                                  link: "/bus-and-truck-batteries/",
                                                  external: true,
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "headerMenuSM3T5",
                                                  enterClassName: "tw-delay-[400ms]",
                                                  link: "/tractor-batteries/",
                                                  external: true,
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "headerMenuSM3T6",
                                                  enterClassName: "tw-delay-[450ms]",
                                                  link: "/three-wheeler-batteries/",
                                                  external: true,
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "headerMenuSM3T7",
                                                  enterClassName: "tw-delay-[500ms]",
                                                  link: "/e-rickshaw-batteries/",
                                                  external: true,
                                                  download: null,
                                              },
                                          ]
                                        : currentlyOpenSubMenu == SubMenu.Solar
                                        ? [
                                              {
                                                  linkTextTextContentPiece: "headerMenuSM4T2",
                                                  enterClassName: "tw-delay-[250ms]",
                                                  link: "/solar-panels-and-inverters-for-home/",
                                                  external: true,
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "headerMenuSM4T3",
                                                  enterClassName: "tw-delay-[300ms]",
                                                  link: "/solar-battery-for-home/",
                                                  external: true,
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "headerMenuSM4T4",
                                                  enterClassName: "tw-delay-[350ms]",
                                                  link: "https://www.livguardsolar.com/",
                                                  external: true,
                                                  download: null,
                                              },
                                          ]
                                        : currentlyOpenSubMenu == SubMenu.AccessoriesAndotherBatteries
                                        ? [
                                              {
                                                  linkTextTextContentPiece: "headerMenuSM5T2",
                                                  enterClassName: "tw-delay-[250ms]",
                                                  link: "/stabilizer-for-AC-and-TV.php",
                                                  external: true,
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "headerMenuSM5T3",
                                                  enterClassName: "tw-delay-[300ms]",
                                                  link: "/E-rickshaw-charger-category/",
                                                  external: true,
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "headerMenuSM5T4",
                                                  enterClassName: "tw-delay-[350ms]",
                                                  link: "/inverter-batteries",
                                                  external: false,
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "headerMenuSM5T5",
                                                  enterClassName: "tw-delay-[400ms]",
                                                  link: "/vrla-batteries/",
                                                  external: true,
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "headerMenuSM5T6",
                                                  enterClassName: "tw-delay-[450ms]",
                                                  link: "/lg-trolley-category/",
                                                  external: true,
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
                                                  link: "/about.php",
                                                  external: true,
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "headerMenuSM8T6",
                                                  enterClassName: "tw-delay-[300ms]",
                                                  link: "/e-waste-management.php",
                                                  external: true,
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "headerMenuSM8T3",
                                                  enterClassName: "tw-delay-[350ms]",
                                                  link: "/blog/",
                                                  external: true,
                                                  download: null,
                                              },
                                          ]
                                        : []
                                }
                                itemBuilder={(item, itemIndex) => (
                                    <InternalOrExternalOrDownloadLink
                                        to={item.link}
                                        external={item.external}
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
                                className="lg-cta-button tw-px-4 tw-z-10"
                            >
                                <div className="tw-grid tw-grid-cols-[1.5rem_2rem_auto_2rem_1.5rem] tw-items-center">
                                    <Telephone className="tw-col-start-1 tw-w-6 tw-h-6" />
                                    <div className="tw-col-start-3">{getVernacularString("headerMenuS2T1", userPreferences.language)}</div>
                                </div>
                            </a>
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

    const queryFetcher = useFetcher();

    function tryToCloseSearch() {
        setIsSearchOpen(false);
        // setQuery("");
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

            const formData = new FormData();
            formData.set("searchTerm", query);

            queryFetcher.submit(formData, {method: "post", action: "/track-search-query"});
        }
    }, [query]);

    return (
        <Transition
            show={isSearchOpen}
            beforeEnter={() => setQuery("")}
            as={React.Fragment}
        >
            <Dialog
                as="div"
                className="tw-relative tw-z-[60]"
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
                        <div className="tw-w-full lg-bg-secondary-300 tw-p-4 tw-relative">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="tw-w-full tw-bg-transparent tw-py-4 tw-pr-4 tw-pl-14 tw-rounded-full tw-border tw-border-solid tw-border-secondary-900-light dark:tw-border-secondary-900-dark"
                            />
                            <Search className="tw-absolute tw-top-8 tw-left-8 tw-w-6 tw-h-6" />
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
                                            // TODO: Convert to link once we convert everything to new website
                                            <a
                                                href={`${result.link}?q=${query}`}
                                                key={resultIndex}
                                                className="lg-bg-secondary-700 tw-p-4 tw-flex tw-flex-row tw-justify-between tw-items-center tw-rounded-lg"
                                                onClick={tryToCloseSearch}
                                            >
                                                <div className="lg-text-body-bold lg-text-secondary-100">{result.title}</div>

                                                <div className="lg-text-secondary-300">{result.keyword}</div>
                                            </a>
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
                className="tw-relative tw-z-[60]"
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
                        </div>
                    </Transition.Child>
                </Dialog.Panel>

                <div onClick={tryToCloseContactUsDialog} />
            </Dialog>
        </Transition>
    );
}

function InternalOrExternalOrDownloadLink({to, external, download, className, children}: {to: string; external: boolean; download: string | null; className?: string; children}) {
    if (download != null) {
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
    } else if (external) {
        return (
            <a
                href={to}
                className={className}
            >
                {children}
            </a>
        );
    } else {
        return (
            <Link
                to={to}
                className={className}
            >
                {children}
            </Link>
        );
    }
}

type SearchQuery = {
    keyword: string;
    link: string;
    title: string;
    score: number;
};

const searchQueries: Array<SearchQuery> = [
    {keyword: "Inverter", link: "/inverter-for-home/", title: "Buy Best Inverter for Home at the Lowest Price in India ", score: 1},
    {keyword: "Inverter", link: "/inverter-for-home/", title: "Livguard Home Inverters", score: 2},
    {keyword: "Inverter", link: "/solar-panels-and-inverters-for-home/", title: "Solar Inverter for Home", score: 2},
    {keyword: "Inverter", link: "/high-capacity-inverters/", title: "Livguard High-Capacity Inverters", score: 2},
    {keyword: "Inverter", link: "/inverters-for-home-use/i-Verter-LGS-1100.php", title: "i-Verter LGS 1100", score: 2},
    {keyword: "Inverter", link: "/inverters-for-home-use/i-verter-LGS-1700.php", title: "i-Verter LGS 1700", score: 2},
    {keyword: "Inverter", link: "/inverters-for-home-use/i-verter-LGS-900.php", title: "i-Verter LGS 900", score: 2},
    {keyword: "Inverter", link: "/inverters-for-home-use/i2-verter-LG-1100.php", title: "i2-Verter LG 1100", score: 2},
    {keyword: "Inverter", link: "/inverters-for-home-use/i2-verter-LG-1700.php", title: "i2-Verter LG 1700", score: 2},
    {keyword: "Inverter", link: "/inverters-for-home-use/i2-verter-LG-900.php", title: "i2-Verter LG 900", score: 2},
    {keyword: "Inverter", link: "/inverters-for-home-use/i2-verter-LG-700.php", title: "i2-Verter LG 700", score: 2},
    {keyword: "Inverter", link: "/high-capacity-inverters/ih-verter-LG2300.php", title: "ih-verter LG2300", score: 2},
    {keyword: "Inverter", link: "/high-capacity-inverters/ih-verter-LG3500.php", title: "ih-verter LG3500", score: 2},
    {keyword: "Inverter", link: "/high-capacity-inverters/ih-verter-LG5000.php", title: "ih-verter LG5000", score: 2},
    {keyword: "Inverter", link: "/high-capacity-inverters/ih-verter-LGS-2500.php", title: "ih-verter LGS 2500", score: 2},
    {keyword: "Inverter", link: "/high-capacity-inverters/ih-verter-LGS-3000.php", title: "ih-verter LGS 3000", score: 2},
    {keyword: "Inverter", link: "/high-capacity-inverters/ih-verter-LGS-4000.php", title: "ih-verter LGS 4000", score: 2},
    {keyword: "Inverter", link: "", title: "Livguard : Buy inverter, batteries and all types of home energy storage solutions", score: 3},
    {keyword: "Battery", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 1},
    {keyword: "Battery", link: "/batteries.php", title: "Batteries for All Your Needs", score: 2},
    {keyword: "Battery", link: "", title: "Livguard : Buy inverter, batteries and all types of home energy storage solutions", score: 3},
    {keyword: "Dealer", link: "/dealer-for-inverters-and-batteries/", title: "Dealer Locator | Find Livguard inverter battery shop near me  ", score: 1},
    {keyword: "Near", link: "/dealer-for-inverters-and-batteries/", title: "Dealer Locator | Find Livguard inverter battery shop near me  ", score: 1},
    {keyword: "Store", link: "/dealer-for-inverters-and-batteries/", title: "Dealer Locator | Find Livguard inverter battery shop near me  ", score: 1},
    {keyword: "Buy", link: "/dealer-for-inverters-and-batteries/", title: "Dealer Locator | Find Livguard inverter battery shop near me  ", score: 1},
    {keyword: "Sine", link: "/inverter-for-home/", title: "Buy Best Inverter for Home at the Lowest Price in India ", score: 1},
    {keyword: "Square", link: "/inverter-for-home/", title: "Buy Best Inverter for Home at the Lowest Price in India ", score: 1},
    {keyword: "Automotive Battery", link: "/automotive-batteries.php", title: "Batteries for every type of vehicle", score: 1},
    {keyword: "Automotive Battery", link: "", title: "Livguard : Buy inverter, batteries and all types of home energy storage solutions", score: 2},
    {keyword: "Home Battery", link: "/inverter-batteries/", title: "Livguard : Buy inverter, batteries and all types of home energy storage solutions", score: 1},
    {keyword: "Solar", link: "", title: "Livguard : Buy inverter, batteries and all types of home energy storage solutions", score: 2},
    {keyword: "Combo", link: "", title: "Livguard : Buy inverter, batteries and all types of home energy storage solutions", score: 3},
    {keyword: "Car Battery", link: "/car-and-suv-batteries/", title: "Find the right battery for your car", score: 1},
    {keyword: "Car Battery", link: "", title: "Livguard : Buy inverter, batteries and all types of home energy storage solutions", score: 2},
    {keyword: "E-Rickshaw Battery", link: "/erickshaw-batteries/", title: "Livguard E Rickshaw Battery", score: 1},
    {keyword: "Tempo Battery", link: "", title: "Livguard : Buy inverter, batteries and all types of home energy storage solutions", score: 3},
    {keyword: "Truck Battery", link: "", title: "Livguard : Buy inverter, batteries and all types of home energy storage solutions", score: 3},
    {keyword: "Service ", link: "", title: "Livguard : Buy inverter, batteries and all types of home energy storage solutions", score: 3},
    {keyword: "Accessories ", link: "", title: "Livguard : Buy inverter, batteries and all types of home energy storage solutions", score: 1},
    {keyword: "3D Grid ", link: "/inverter-for-home/", title: "Buy Best Inverter for Home at the Lowest Price in India ", score: 2},
    {keyword: "AI Charging", link: "/inverters-for-home-use/i-Verter-LGS-1100.php", title: "i-Verter LGS 1100", score: 2},
    {keyword: "AI Charging", link: "/inverters-for-home-use/i-verter-LGS-1700.php", title: "i-Verter LGS 1700", score: 2},
    {keyword: "AI Charging", link: "/inverters-for-home-use/i-verter-LGS-900.php", title: "i-Verter LGS 900", score: 2},
    {keyword: "AI Charging", link: "/inverters-for-home-use/i2-verter-LG-1100.php", title: "i2-Verter LG 1100", score: 2},
    {keyword: "AI Charging", link: "/inverters-for-home-use/i2-verter-LG-1700.php", title: "i2-Verter LG 1700", score: 2},
    {keyword: "AI Charging", link: "/inverters-for-home-use/i2-verter-LG-900.php", title: "i2-Verter LG 900", score: 2},
    {keyword: "AI Charging", link: "/inverters-for-home-use/i2-verter-LG-700.php", title: "i2-Verter LG 700", score: 2},
    {keyword: "AI Charging", link: "/inverter-for-home/", title: "Buy Best Inverter for Home at the Lowest Price in India ", score: 1},
    {keyword: "Tubular", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "Flat Plate", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "Long Life", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "Load Calculator", link: "/load-calculator", title: "Plan the power consumption requirements of your home ", score: 1},
    {keyword: "Load", link: "/load-calculator", title: "Plan the power consumption requirements of your home ", score: 1},
    {keyword: "Power Planner", link: "/load-calculator", title: "Plan the power consumption requirements of your home ", score: 1},
    {keyword: "700VA", link: "/inverter-for-home/", title: "Buy Best Inverter for Home at the Lowest Price in India ", score: 2},
    {keyword: "600VA", link: "/inverter-for-home/", title: "Buy Best Inverter for Home at the Lowest Price in India ", score: 2},
    {keyword: "800VA", link: "/inverter-for-home/", title: "Buy Best Inverter for Home at the Lowest Price in India ", score: 2},
    {keyword: "900VA", link: "/inverter-for-home/", title: "Buy Best Inverter for Home at the Lowest Price in India ", score: 2},
    {keyword: "1100VA", link: "/inverter-for-home/", title: "Buy Best Inverter for Home at the Lowest Price in India ", score: 2},
    {keyword: "1250VA", link: "/inverter-for-home/", title: "Buy Best Inverter for Home at the Lowest Price in India ", score: 2},
    {keyword: "1500VA", link: "/inverter-for-home/", title: "Buy Best Inverter for Home at the Lowest Price in India ", score: 2},
    {keyword: "1650VA", link: "/inverter-for-home/", title: "Buy Best Inverter for Home at the Lowest Price in India ", score: 2},
    {keyword: "2000VA", link: "/inverter-for-home/", title: "Buy Best Inverter for Home at the Lowest Price in India ", score: 2},
    {keyword: "2500VA", link: "/inverter-for-home/", title: "Buy Best Inverter for Home at the Lowest Price in India ", score: 2},
    {keyword: "3500VA", link: "/inverter-for-home/", title: "Buy Best Inverter for Home at the Lowest Price in India ", score: 2},
    {keyword: "4000VA", link: "/inverter-for-home/", title: "Buy Best Inverter for Home at the Lowest Price in India ", score: 2},
    {keyword: "600VA", link: "/inverters-for-home-use/i2-verter-LG-700.php", title: "i2-Verter LG 700", score: 1},
    {keyword: "800VA", link: "/inverters-for-home-use/i-verter-LGS-900.php", title: "i-Verter LGS 900", score: 1},
    {keyword: "900VA", link: "/inverters-for-home-use/i2-verter-LG-1100.php", title: "i2-Verter LG 1100", score: 1},
    {keyword: "1500VA", link: "/inverters-for-home-use/i-verter-LGS-1700.php", title: "i-Verter LGS 1700", score: 1},
    {keyword: "2000VA", link: "/high-capacity-inverters/ih-verter-LG2300.php", title: "ih-verter LG2300", score: 1},
    {keyword: "2500VA", link: "/high-capacity-inverters/ih-verter-LGS-3000.php", title: "ih-verter LGS 3000", score: 1},
    {keyword: "3500VA", link: "/high-capacity-inverters/ih-verter-LGS-4000.php", title: "ih-verter LGS 4000", score: 1},
    {keyword: "90Ah", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "100Ah", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "110Ah", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "120Ah", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "135Ah", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "150Ah", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "160Ah", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "180Ah", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "200Ah", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "220Ah", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "230Ah", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "260Ah", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "100Ah", link: "/solar-battery-for-home/Solar-Battery-LS-10060TT.php", title: "Livguard Solar Battery LS-10060TT", score: 1},
    {keyword: "120Ah", link: "/erickshaw-batteries/E-Shakti-LG-C0-ERTU-1800.php", title: "E-Shakti LG C0 ERTU 1800", score: 1},
    {keyword: "120Ah", link: "/vrla-batteries/vrla-lgv12-120.php", title: "LGV12-120", score: 1},
    {keyword: "135Ah", link: "/solar-battery-for-home/Solar-battery-LS-13560TT.php", title: "Livguard Solar Battery LS-13560TT", score: 1},
    {keyword: "150Ah", link: "/inverter-batteries/invertuff-IT-1554TT.php", title: "Invertuff IT 1554TT", score: 1},
    {keyword: "160Ah", link: "/inverter-batteries/invertuff-IT-1666TT.php", title: "Invertuff IT 1666TT", score: 1},
    {keyword: "180Ah", link: "/inverter-batteries/invertuff-IT-1866TT.php", title: "Invertuff IT 1866TT", score: 1},
    {keyword: "200Ah", link: "/inverter-batteries/invertuff-IT-1536FP.php", title: "Invertuff IT 1536FP", score: 1},
    {keyword: "220Ah", link: "/inverter-batteries/invertuff-IT-2266TT.php", title: "Invertuff IT 2266TT", score: 1},
    {keyword: "IT 2060TT", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1550TT", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1639TT", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 2360TT", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 2048TT", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1666TT", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1554TT", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1860TT", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 2266TT", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1645TT", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1548TT", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1560TT", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1536TT ", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1866TT", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 2066TT", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 2672TT", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1584TT", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1636STJ", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1554STJ", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1542STJ", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1848STJ", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT481400ST", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT481500ST", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1048ST", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 9048ST", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 481200ST", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1560STT", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1548STT", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1160STT", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1536FP", link: "/inverter-batteries/", title: "Buy Inverter Battery Online at Best Prices In India ", score: 2},
    {keyword: "IT 1666TT", link: "/inverter-batteries/invertuff-IT-1666TT.php", title: "Invertuff IT 1666TT", score: 1},
    {keyword: "IT 1554TT", link: "/inverter-batteries/invertuff-IT-1554TT.php", title: "Invertuff IT 1554TT", score: 1},
    {keyword: "IT 2266TT", link: "/inverter-batteries/invertuff-IT-2266TT.php", title: "Invertuff IT 2266TT", score: 1},
    {keyword: "IT 1560TT", link: "/inverter-batteries/invertuff-IT-1560TT.php", title: "Inverter, Car Battery, Solar Panel at Best Price in India - Livguard", score: 1},
    {keyword: "IT 1866TT", link: "/inverter-batteries/invertuff-IT-1866TT.php", title: "Invertuff IT 1866TT", score: 1},
    {keyword: "IT 1536FP", link: "/inverter-batteries/invertuff-IT-1536FP.php", title: "Invertuff IT 1536FP", score: 1},
];
