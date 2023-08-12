import {Dialog, Disclosure, Listbox, Popover, Transition} from "@headlessui/react";
import {Bars3Icon, ChevronRightIcon} from "@heroicons/react/20/solid";
import {Form, Link, useFetcher, useNavigate, useSubmit} from "@remix-run/react";
import React, {useEffect, useRef, useState} from "react";
import {ArrowLeftShort, ArrowLeftShort, BrightnessHighFill, Check2, ChevronDown, MoonStarsFill, Search, Telephone, X} from "react-bootstrap-icons";
import {useResizeDetector} from "react-resize-detector";
import {HorizontalSpacer} from "~/global-common-typescript/components/horizontalSpacer";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {ImageCdnProvider} from "~/global-common-typescript/typeDefinitions";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {OfferContactUsCta} from "~/routes/offers/inverter-and-battery-jodi";
import type {UserPreferences} from "~/typeDefinitions";
import {Language, Theme, languageToHumanFriendlyString, languageToShortHumanFriendlyFormat, themeToHumanFriendlyString} from "~/typeDefinitions";
import {getMetadataForImage} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";
import {ContactUsDialog as ContactUsLeadFormDialog} from "~/routes";
import {FixedHeightImage} from "~/components/images/fixedHeightImage";

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
    pageUrl: string;
}) {
    return (
        <>
            <div className="tw-flex tw-flex-col tw-items-stretch tw-sticky tw-top-0 tw-z-[60]">
                <FirstBar
                    showContactDetails={showContactDetails}
                    userPreferences={userPreferences}
                    redirectTo={redirectTo}
                />

                <SecondBar
                    showMobileMenuIcon={showMobileMenuIcon}
                    showSearchOption={showSearchOption}
                    showContactCtaButton={showContactCtaButton}
                    pageUrl={pageUrl}
                    userPreferences={userPreferences}
                />
            </div>
        </>
    );
}

function FirstBar({showContactDetails, userPreferences, redirectTo}: {showContactDetails: boolean; userPreferences: UserPreferences; redirectTo: string}) {
    const submit = useSubmit();

    const [isContactUsDialogOpen, setIsContactUsDialogOpen] = useState(false);

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

    function tryToOpenContactUsDialog() {
        setIsContactUsDialogOpen(true);
    }

    return (
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
                    className="tw-h-4 tw-w-4"
                    src={
                        userPreferences.theme === Theme.Light
                            ? getAbsolutePathForRelativePath(getMetadataForImage("/livguard/icons/get-offers-light.png").finalUrl, ImageCdnProvider.Bunny, null, null)
                            : getAbsolutePathForRelativePath(getMetadataForImage("/livguard/icons/get-offers-dark.png").finalUrl, ImageCdnProvider.Bunny, null, null)
                    }
                />
                <HorizontalSpacer className="tw-w-1" />
                {getVernacularString("9316f275-c395-4344-99d7-895d162602c0", userPreferences.language)}
            </Link>
            <HorizontalSpacer className="tw-w-5" />

            {/* <Link
                        to="/e-waste-management"
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

            <ContactUsDialog
                userPreferences={userPreferences}
                isContactUsDialogOpen={isContactUsDialogOpen}
                setIsContactUsDialogOpen={setIsContactUsDialogOpen}
            />
        </div>
    );
}

function SecondBar({
    showMobileMenuIcon,
    showSearchOption,
    showContactCtaButton,
    pageUrl,
    userPreferences,
}: {
    showMobileMenuIcon: boolean;
    showSearchOption: boolean;
    showContactCtaButton: boolean;
    pageUrl: string;
    userPreferences: UserPreferences;
}) {
    const isMobile = useIsScreenSizeBelow(1024);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuState = useRef<MenuState>(MenuState.Closed);

    function tryToOpenMenu() {
        if (menuState.current == MenuState.Closed) {
            setIsMenuOpen(true);
        }
    }

    const [isContactUsDialogOpen, setIsContactUsDialogOpen] = useState(false);

    const utmParameters = useUtmSearchParameters();

    const [currentlyOpenSubMenu, setCurrentlyOpenSubMenu] = useState<SubMenu | null>(null);
    const subMenuState = useRef<MenuState>(MenuState.Closed);

    function tryToOpenSubMenu(subMenu: SubMenu) {
        if (subMenuState.current == MenuState.Closed) {
            setCurrentlyOpenSubMenu(subMenu);
            setIsMenuOpen(false);
        }
    }

    function tryToOpenContactUsDialog() {
        setIsContactUsDialogOpen(true);
    }

    const [isSearchOpen, setIsSearchOpen] = useState(false);

    function tryToOpenSearch() {
        setIsSearchOpen(true);
    }

    const [isContactUsLeadFormDialogOpen, setIsContactUsLeadFormDialogOpen] = useState(false);
    function tryToOpenContactUsLeadFormDialog() {
        setIsContactUsLeadFormDialogOpen(true);
    }
    const {width: containerWidth, ref: resizeRef} = useResizeDetector();

    return (
        // <div className="lg-px-screen-edge tw-py-4 lg-bg-background-500 tw-flex tw-flex-row tw-items-center">
        //     {showMobileMenuIcon && isMobile != null && isMobile == true && (
        //         <div className="tw-flex tw-flex-row">
        //             <button
        //                 type="button"
        //                 onClick={tryToOpenMenu}
        //             >
        //                 <Bars3Icon className="tw-w-6 tw-h-6" />
        //             </button>

        //             <HorizontalSpacer className="tw-w-2" />
        //         </div>
        //     )}

        //     <Link to="/">
        //         <img
        //             src={userPreferences.theme == Theme.Dark ? "https://files.growthjockey.com/livguard/icons/logo-dark.svg" : "https://files.growthjockey.com/livguard/icons/logo-light.svg"}
        //             width={385}
        //             height={96}
        //             className="tw-w-auto tw-h-6"
        //             key={userPreferences.theme == Theme.Dark ? "https://files.growthjockey.com/livguard/icons/logo-dark.svg" : "https://files.growthjockey.com/livguard/icons/logo-light.svg"}
        //         />
        //     </Link>

        //     {showMobileMenuIcon && isMobile != null && isMobile == false && (
        //         <>
        //             <div className="tw-w-8" />

        //             <MenuDialogDesktop userPreferences={userPreferences} />
        //         </>
        //     )}

        //     <div className="tw-flex-1" />

        //     {showSearchOption && (
        //         <button
        //             type="button"
        //             onClick={tryToOpenSearch}
        //             className="tw-flex tw-flex-row tw-items-center"
        //         >
        //             <Search className="tw-w-6 tw-h-6" />
        //             <HorizontalSpacer className="tw-w-2" />
        //             <div className="lg:tw-text-[13px] xl:tw-text-[16px]">{getVernacularString("headerS2T1", userPreferences.language)}</div>
        //         </button>
        //     )}

        //     {/* <Link
        //         to={"/load-calculator"}
        //         className="tw-bg-gradient-to-r tw-from-[#F25F60] tw-to-[#EB2A2B] tw-px-12 tw-py-1 tw-rounded-3xl lg:tw-text-white"
        //     >
        //         {getVernacularString("headerLoadCalculator", userPreferences.language)}
        //     </Link> */}

        //     {showContactCtaButton && (
        //         <OfferContactUsCta
        //             userPreferences={userPreferences}
        //             textVernacId="offerPageCta"
        //             className="tw-z-10 tw-hidden lg:tw-block"
        //             pageUrl={pageUrl}
        //         />
        //     )}

        //     <MenuDialogMobile
        //         userPreferences={userPreferences}
        //         isMenuOpen={isMenuOpen}
        //         setIsMenuOpen={setIsMenuOpen}
        //         menuState={menuState}
        //     />

        //     <SearchDialog
        //         userPreferences={userPreferences}
        //         isSearchOpen={isSearchOpen}
        //         setIsSearchOpen={setIsSearchOpen}
        //     />
        // </div>
        <>
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
                tryToOpenContactUsLeadFormDialog={tryToOpenContactUsLeadFormDialog}
            />

            <SubMenuDialog
                userPreferences={userPreferences}
                currentlyOpenSubMenu={currentlyOpenSubMenu}
                setCurrentlyOpenSubMenu={setCurrentlyOpenSubMenu}
                subMenuState={subMenuState}
                utmParameters={utmParameters}
                pageUrl={pageUrl}
                setIsMenuOpen={setIsMenuOpen}
                tryToOpenContactUsLeadFormDialog={tryToOpenContactUsLeadFormDialog}
            />

            <ContactUsLeadFormDialog
                userPreferences={userPreferences}
                isContactUsDialogOpen={isContactUsLeadFormDialogOpen}
                setIsContactUsDialogOpen={setIsContactUsLeadFormDialogOpen}
                utmParameters={utmParameters}
                pageUrl={pageUrl}
            />

            <SearchDialog
                userPreferences={userPreferences}
                isSearchOpen={isSearchOpen}
                setIsSearchOpen={setIsSearchOpen}
            />
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
    tryToOpenSubMenu,
    tryToOpenContactUsLeadFormDialog,
}: {
    userPreferences: UserPreferences;
    isMenuOpen: boolean;
    setIsMenuOpen: React.Dispatch<boolean>;
    menuState: React.MutableRefObject<MenuState>;
    currentlyOpenSubMenu: SubMenu | null;
    setCurrentlyOpenSubMenu: React.Dispatch<SubMenu | null>;
    subMenuState: React.MutableRefObject<MenuState>;
    tryToOpenSubMenu: (subMenu: SubMenu) => void;
    tryToOpenContactUsLeadFormDialog: () => void;
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

                <Dialog.Panel className="tw-fixed tw-left-6 tw-right-6 tw-top-6 lg:tw-top-[unset] tw-bottom-0 tw-max-w-lg tw-overflow-hidden tw-grid tw-grid-cols-1 tw-grid-rows-[auto_auto_minmax(0,1fr)]">
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

                    <div className="tw-w-full tw-h-full lg:tw-max-h-[40rem] tw-rounded-t-lg tw-p-8 tw-grid tw-grid-rows-1 tw-justify-items-center tw-relative">
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
                                        link: "/warranty",
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
                                        link: "/e-waste-management",
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

                        {/* <Transition.Child
                            as={React.Fragment}
                            enter="tw-ease-out tw-transition-all tw-duration-200 tw-delay-200"
                            enterFrom="tw-opacity-0"
                            enterTo="tw-opacity-full"
                            leave="tw-ease-in tw-transition-all tw-duration-200"
                            leaveFrom="tw-opacity-full"
                            leaveTo="tw-opacity-0"
                        >
                            <button
                                className="lg-cta-button tw-px-4 tw-z-10"
                                onClick={() => {
                                    tryToCloseMenu();
                                    tryToOpenContactUsLeadFormDialog();
                                }}
                            >
                                <div className="tw-grid tw-grid-cols-[1.5rem_2rem_auto_2rem_1.5rem] tw-items-center">
                                    <Telephone className="tw-col-start-1 tw-w-6 tw-h-6" />
                                    <div className="tw-col-start-3">{getVernacularString("360f578c-4a1f-49a7-baf8-ee0680fb3301", userPreferences.language)}</div>
                                </div>
                            </button>
                        </Transition.Child> */}
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
    setIsMenuOpen,
    tryToOpenContactUsLeadFormDialog,
}: {
    userPreferences: UserPreferences;
    currentlyOpenSubMenu: SubMenu | null;
    setCurrentlyOpenSubMenu: React.Dispatch<SubMenu | null>;
    subMenuState: React.MutableRefObject<MenuState>;
    utmParameters: {[searchParameter: string]: string};
    pageUrl: string;
    setIsMenuOpen: React.Dispatch<boolean>;
    tryToOpenContactUsLeadFormDialog: () => void;
}) {
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);

    function tryToCloseSubMenu() {
        if (subMenuState.current == MenuState.Open) {
            setCurrentlyOpenSubMenu(null);
            if (isScreenSizeBelow) {
                setIsMenuOpen(true);
            }
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

                <Dialog.Panel className="tw-fixed tw-left-6 tw-right-6 tw-top-6 lg:tw-top-[unset] tw-bottom-0 tw-max-w-lg tw-overflow-hidden tw-grid tw-grid-cols-1 tw-grid-rows-[auto_auto_minmax(0,1fr)]">
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

                    <div className="tw-w-full tw-h-full lg:tw-h-[40rem] tw-rounded-t-lg tw-p-8 tw-grid tw-grid-rows-1 tw-justify-items-center tw-relative">
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

                        <div
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-w-full tw-h-full tw-flex tw-flex-col tw-gap-y-4 tw-items-stretch",
                                currentlyOpenSubMenu === SubMenu.More ? "tw-overflow-y-scroll" : "",
                            )}
                        >
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
                                                  link: "/high-capacity-inverters",
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
                                                  link: "/e-rickshaw-charger/",
                                                  external: false,
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
                                                  link: "/inverter-trolley/",
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
                                                  link: "/about-us",
                                                  external: false,
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "headerMenuSM8T6",
                                                  enterClassName: "tw-delay-[300ms]",
                                                  link: "/e-waste-management",
                                                  external: false,
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "headerMenuSM8T3",
                                                  enterClassName: "tw-delay-[350ms]",
                                                  link: "/blog/",
                                                  external: true,
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "7ad4abbd-2d09-4f4a-9605-f0f2c5008fa8",
                                                  enterClassName: "tw-delay-[400ms]",
                                                  link: "/offers",
                                                  external: false,
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "088ccfe9-7891-49bd-b01f-2ea4836b0342",
                                                  enterClassName: "tw-delay-[450ms]",
                                                  link: "/contact-us",
                                                  external: false,
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "6808dbb4-84a3-4aa6-87a0-4820bb7ddfb0",
                                                  enterClassName: "tw-delay-[500ms]",
                                                  link: "/service",
                                                  external: false,
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "2ab590ad-712c-420c-8315-896e4be9a0ac",
                                                  enterClassName: "tw-delay-[550ms]",
                                                  link: "/battery-finder",
                                                  external: false,
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "0bbd1db5-44c8-4953-8f29-1f58e19dc100",
                                                  enterClassName: "tw-delay-[600ms]",
                                                  link: "/csr",
                                                  external: false,
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "8aaec14c-68d6-4339-995d-d89919fc1ffa",
                                                  enterClassName: "tw-delay-[650ms]",
                                                  link: "/investors",
                                                  external: false,
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "4df385d0-992d-4acc-b9d4-06964b6f1e0d",
                                                  enterClassName: "tw-delay-[700ms]",
                                                  link: "/governance",
                                                  external: false,
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "dd54a06c-aee0-454f-8ed0-1182a37187d5",
                                                  enterClassName: "tw-delay-[750ms]",
                                                  link: "/video-gallery",
                                                  external: false,
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "b6b548ef-74b3-4aaa-81a4-be225b88ace9",
                                                  enterClassName: "tw-delay-[800ms]",
                                                  link: "/terms-and-conditions",
                                                  external: false,
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "8bbd3952-3ad1-46de-afa5-b79c841b3378",
                                                  enterClassName: "tw-delay-[850ms]",
                                                  link: "/privacy-policy",
                                                  external: false,
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "93e0fa70-2449-4565-a741-ea91931b2864",
                                                  enterClassName: "tw-delay-[900ms]",
                                                  link: "/sales-return-policy",
                                                  external: false,
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "096a9841-f21e-4920-adc9-1bcb10a4f35f",
                                                  enterClassName: "tw-delay-[950ms]",
                                                  link: "/india-ops",
                                                  external: false,
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "df025538-0d6a-4954-aba0-4234b2d34565",
                                                  enterClassName: "tw-delay-[1000ms]",
                                                  link: "/global-ops",
                                                  external: false,
                                                  download: null,
                                              },
                                              {
                                                  linkTextTextContentPiece: "c13afdef-ed06-4b83-be72-772fbb7a5706",
                                                  enterClassName: "tw-delay-[1050ms]",
                                                  link: "/pricing",
                                                  external: false,
                                                  download: null,
                                              },
                                              //   {
                                              //       linkTextTextContentPiece: "eb9141ce-2ee8-4dcd-a007-7ccb7f451071",
                                              //       enterClassName: "tw-delay-[750ms]",
                                              //       link: "/",
                                              //       external: false,
                                              //       download: null,
                                              //   },
                                              //   {
                                              //       linkTextTextContentPiece: "2483941c-5ae4-4903-bbab-a163b3df02bd",
                                              //       enterClassName: "tw-delay-[800ms]",
                                              //       link: "/",
                                              //       external: false,
                                              //       download: null,
                                              //   },
                                              //   {
                                              //       linkTextTextContentPiece: "070dc123-0784-470f-b9d1-8a46ad3c5b81",
                                              //       enterClassName: "tw-delay-[850ms]",
                                              //       link: "/",
                                              //       external: false,
                                              //       download: null,
                                              //   },
                                          ]
                                        : []
                                }
                                itemBuilder={(item, itemIndex) => (
                                    <InternalOrExternalOrDownloadLink
                                        to={item.link}
                                        external={item.external}
                                        download={item.download}
                                        className="tw-flex tw-flex-row tw-pr-2"
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

                        {/* <VerticalSpacer className="tw-h-8" /> */}

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
                                className="lg-cta-button tw-px-4 tw-z-10"
                                onClick={() => {
                                    tryToCloseSubMenu();
                                    setIsMenuOpen(false);
                                    tryToOpenContactUsLeadFormDialog();
                                }}
                            >
                                <div className="tw-grid tw-grid-cols-[1.5rem_2rem_auto_2rem_1.5rem] tw-items-center">
                                    <Telephone className="tw-col-start-1 tw-w-6 tw-h-6" />
                                    <div className="tw-col-start-3">{getVernacularString("360f578c-4a1f-49a7-baf8-ee0680fb3301", userPreferences.language)}</div>
                                </div>
                            </button>
                        </Transition.Child> */}
                    </div>
                </Dialog.Panel>
            </Dialog>
        </Transition>
    );
}

const headerMenuItems: Array<HeaderItem> = [
    {
        contentId: "07871c3d-b0ce-4d09-8cad-f2258217eb53",
        children: [
            {
                contentId: "58ab0356-4a3b-4ec9-b2a2-1b36ac4dee0f",
                children: [
                    {
                        contentId: "f54e5fcb-25a7-4af2-836c-75eff3e2916e",
                        to: "/inverter-batteries",
                    },
                    {
                        contentId: "816e8c1d-93cc-4629-b808-043e46fba2fd",
                        children: [
                            {
                                contentId: "4254cae7-7bda-4303-bc24-80dcf71c0647",
                                to: "/car-and-suv-batteries/",
                            },
                            {
                                contentId: "d92c5f11-8777-4ec2-9aca-32061a9ea613",
                                to: "/two-wheeler-batteries/",
                            },
                            {
                                contentId: "ade7956e-a64e-4ade-8dbd-bfb9ffbe834a",
                                to: "/three-wheeler-batteries/",
                            },
                            {
                                contentId: "5da16ba5-b835-4eb5-9e86-d187a7186faf",
                                to: "/tractor-batteries/",
                            },
                            {
                                contentId: "b5eba6c1-c835-4f87-8f7b-d73951cf60b5",
                                to: "/bus-and-truck-batteries/",
                            },
                            {
                                contentId: "ef1a6048-3009-4268-b127-2affbacad4e1",
                                to: "/e-rickshaw-batteries/",
                            },
                        ],
                    },
                    {
                        contentId: "e057dd65-bdc4-4a61-9350-881e46db892a",
                        to: "/solar-battery-for-home/",
                    },
                ],
            },
            {
                contentId: "3272fdec-2fca-490f-b0fa-857a45df8f0e",
                children: [
                    {
                        contentId: "9bfdbf1f-fe80-49e2-a0de-166844aad521",
                        to: "/inverter-for-home/",
                    },
                    {
                        contentId: "fe8f481e-ad9b-4000-b462-8fa0fa334a14",
                        to: "/high-capacity-inverters/",
                    },
                ],
            },
            {
                contentId: "893bd439-ee92-4bfb-a05d-476854330caa",
                to: "https://www.livguardsolar.com/residential_solar",
            },
            // E-Mobility solutions
            // {
            //     contentId: "b9da5f04-2f6a-48be-8942-9fadf03543bb",
            //     children: [
            //         {
            //             contentId: "02f100e3-8bad-4161-9306-f2b4604bfb6e",
            //             to: "#",
            //         }
            //     ],
            // },
            {
                contentId: "b98f5c9e-16fc-4803-8494-1f54a8eb55c9",
                children: [
                    {
                        contentId: "0faf2ddb-4220-456c-a5fb-935716db76ec",
                        children: [
                            {
                                contentId: "52a70998-083b-4b6e-977c-475295c0aa19",
                                to: "/e-rickshaw-charger/",
                            },
                            {
                                contentId: "15fbd08d-74e9-45f7-a7a1-645fd0679c14",
                                to: "/vrla-batteries/",
                            },
                        ],
                    },
                    {
                        contentId: "77534355-2fbc-4c69-851c-58a2e4034168",
                        children: [
                            // {
                            //     contentId: "5d654da3-2d50-4150-86a1-633152d775c8",
                            //     to: "/stabilizer-for-AC-and-TV.php",
                            // },
                            {
                                contentId: "c4c67588-fe35-46da-8c07-d8e2ed05f7f4",
                                to: "/inverter-trolley/",
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        contentId: "22f65f90-4e23-41ef-8eee-ad3ad43d3cc1",
        children: [
            {
                contentId: "acc5d1b0-6eeb-4d83-8d9e-b10124c39f3f",
                to: "/about-us/",
            },
            {
                contentId: "8a05cd2e-d60d-4eb4-9c04-28aa17936671",
                to: "/india-ops/",
            },
            {
                contentId: "49162714-5f92-492f-af84-355a69688f70",
                to: "/global-ops/",
            },
            {
                contentId: "c00c6383-63f2-4dc0-b65b-ef1ecfb4ee2c",
                to: "/careers/",
            },
        ],
    },
    {
        contentId: "6ca8db68-b2e4-41bc-a910-97750f73b9be",
        children: [
            {
                contentId: "d59a87d7-e624-4437-bfd8-57ccc3ac9b0f",
                to: "https://www.livguard.com/blog/",
            },
            {
                contentId: "3da06e51-2ce1-41cc-b7b0-e50f014643a2",
                to: "https://www.livguard.com/blog/category/inverters/",
            },
            {
                contentId: "09d53d44-f25f-4340-a67a-77c1e483c764",
                to: "https://www.livguard.com/blog/category/inverter-batteries/",
            },
            {
                contentId: "429677df-14ea-4491-8aca-5044787bfa5d",
                to: "https://www.livguard.com/blog/category/stabilizer/",
            },
            {
                contentId: "570fb1bb-e61c-4447-8a52-0eb8cccba564",
                children: [
                    {
                        contentId: "5ae37b56-b08d-4928-adf7-5a5827f199ab",
                        to: "https://www.livguard.com/blog/category/solar-solution-2/solar-solution/",
                    },
                    {
                        contentId: "c4965a0f-b4e4-4afd-9e5f-fda80734f3b4",
                        to: "https://www.livguard.com/blog/category/solar-solution-2/solar-panels/",
                    },
                ],
            },
            {
                contentId: "2d020521-337f-4e2e-b526-22c915bfb563",
                children: [
                    {
                        contentId: "57dfdb7b-3b26-4918-81fc-15aee33119a6",
                        to: "https://www.livguard.com/blog/category/automotive-battery/two-wheeler-batteries/",
                    },
                    {
                        contentId: "109fecc7-85fc-46c2-9f6f-a7b330bfe03b",
                        to: "https://www.livguard.com/blog/category/automotive-battery/car-batteries/",
                    },
                    {
                        contentId: "fbbf41f7-9141-4c3a-8e2d-6203f59bb511",
                        to: "https://www.livguard.com/blog/category/automotive-battery/e-rickshaw-batteries/",
                    },
                    {
                        contentId: "5ad559b4-eb41-457b-a460-01611bca3e59",
                        to: "https://www.livguard.com/blog/category/automotive-battery/commercial-vehicle-batteries/",
                    },
                ],
            },
        ],
    },
    {
        contentId: "6168e049-da78-4bc6-923b-9446914b8912",
        children: [
            {
                contentId: "6645babc-8e36-4cdb-8271-16caff597f22",
                to: "/dealer-for-inverters-and-batteries",
            },
            {
                contentId: "6168e049-da78-4bc6-923b-9446914b8912",
                to: "/contact-us",
            },
        ],
    },
    {
        contentId: "ae2b8d62-1469-4c68-a9fa-2cd416ed578c",
        children: [
            {
                contentId: "98f2d242-eb78-4ff3-882e-fbc504673165",
                to: "/pricing/",
            },
            {
                contentId: "384acc41-febb-4514-a621-31d2054166f5",
                to: "/e-waste-management/",
            },
            {
                contentId: "e7df1392-3354-4f8c-82a4-9d284da7d9bb",
                children: [
                    {
                        contentId: "b5fa862c-0c81-4c6e-ad0c-d49d3473d6d4",
                        to: "/governance/",
                    },
                    {
                        contentId: "78d6e103-5022-4d48-8ea7-94b38566d327",
                        to: "/investors/",
                    },
                    {
                        contentId: "a9df629a-e685-4822-be66-f59678e45cbc",
                        to: "/csr/",
                    },
                ],
            },
            {
                contentId: "e65f1b7c-554e-4815-bf97-d3848070204b",
                to: "/sales-return-policy/",
            },
            {
                contentId: "cc357c04-cde6-47c5-ab55-416eb27446a0",
                to: "/video-gallery/",
            },
            {
                contentId: "3e513ee8-0bbb-4cfa-861f-be8710ebffec",
                to: "/privacy-policy/",
            },
            {
                contentId: "49e991e9-4cae-4bb3-bc47-539ee1f4b222",
                to: "/terms-and-conditions/",
            },
        ],
    },
    // {
    //     contentId: "headerMenuS1T6",
    //     to: "/dealer-for-inverters-and-batteries",
    // },
    // {
    //     linkTextTextContentPiece: "headerMenuS1T1",
    //     enterClassName: "tw-delay-[250ms]",
    //     subMenu: SubMenu.Inverters,
    //     link: null,
    // },
    // {
    //     linkTextTextContentPiece: "headerMenuS1T2",
    //     enterClassName: "tw-delay-[300ms]",
    //     subMenu: null,
    //     link: "/inverter-batteries",
    // },
    // {
    //     linkTextTextContentPiece: "headerMenuS1T3",
    //     enterClassName: "tw-delay-[350ms]",
    //     subMenu: SubMenu.AutomotiveBatteries,
    //     link: null,
    // },
    // {
    //     linkTextTextContentPiece: "headerMenuS1T4",
    //     enterClassName: "tw-delay-[400ms]",
    //     subMenu: SubMenu.Solar,
    //     link: null,
    // },
    // {
    //     linkTextTextContentPiece: "headerMenuS1T5",
    //     enterClassName: "tw-delay-[450ms]",
    //     subMenu: SubMenu.AccessoriesAndotherBatteries,
    //     link: null,
    // },
    // {
    //     linkTextTextContentPiece: "headerMenuS1T6",
    //     enterClassName: "tw-delay-[500ms]",
    //     subMenu: null,
    //     link: "/dealer-for-inverters-and-batteries",
    // },
    // {
    //     linkTextTextContentPiece: "headerMenuS1T7",
    //     enterClassName: "tw-delay-[550ms]",
    //     subMenu: null,
    //     link: "register-and-warranty-for-inverters.php",
    // },
    // {
    //     linkTextTextContentPiece: "headerMenuS1T8",
    //     enterClassName: "tw-delay-[600ms]",
    //     subMenu: SubMenu.More,
    //     link: null,
    // },
    // {
    //     linkTextTextContentPiece: "9316f275-c395-4344-99d7-895d162602c0",
    //     enterClassName: "tw-delay-[650ms]",
    //     subMenu: null,
    //     link: "/offers",
    // },
    // {
    //     linkTextTextContentPiece: "0d7eacab-de68-49a3-a0d2-c25eba53a1e3",
    //     enterClassName: "tw-delay-[700ms]",
    //     subMenu: null,
    //     link: "/e-waste-management.php",
    // },
];

function MenuDialogMobile({
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
    function tryToCloseMenu() {
        if (menuState.current == MenuState.Open) {
            setIsMenuOpen(false);
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
                className="tw-fixed tw-inset-0 tw-z-[60] tw-isolate"
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
                    <div className="tw-absolute tw-inset-0 tw-bg-black tw-bg-opacity-[55%] tw-backdrop-blur -tw-z-10" />
                </Transition.Child>

                <Dialog.Panel className="tw-w-full tw-h-full tw-grid tw-grid-cols-[1.5rem_auto_1.5rem] tw-grid-rows-[1.5rem_2.5rem_1.5rem_minmax(0,1fr)]">
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
                            className="tw-row-start-2 tw-col-start-2 tw-justify-self-center lg-bg-new-background-500 tw-rounded-full"
                            onClick={tryToCloseMenu}
                        >
                            <X className="tw-w-10 tw-h-10 lg-text-new-foreground-500" />
                        </button>
                    </Transition.Child>

                    <div className="tw-row-start-4 tw-col-start-2 tw-w-full tw-rounded-t-lg tw-p-8 tw-grid tw-grid-rows-[20.75rem_2rem_minmax(0,13.75rem)_3rem] tw-justify-items-center lg-bg-new-background-500 tw-overflow-y-auto">
                        <div className="tw-w-full tw-h-full tw-flex tw-flex-col tw-gap-y-4 tw-items-stretch">
                            <ItemBuilder
                                items={headerMenuItems}
                                itemBuilder={(item, itemIndex) => (
                                    <HeaderItemMobileComponent
                                        headerItem={item}
                                        userPreferences={userPreferences}
                                        indentationLevel={0}
                                        key={itemIndex}
                                    />
                                )}

                                // <button
                                //     className="tw-flex tw-flex-row tw-text-left"
                                //     key={itemIndex}
                                //     onClick={() => {
                                //         if (item.subMenu != null) {
                                //             tryToOpenSubMenu(item.subMenu);
                                //         } else {
                                //             if (item.link.startsWith("/")) {
                                //                 // TODO: This will break if the link is from the old website! Use with caution!
                                //                 navigate(item.link);
                                //             } else {
                                //                 window.open(item.link, "_blank");
                                //             }
                                //             tryToCloseMenu();
                                //         }
                                //     }}
                                // >
                                //     <Transition.Child
                                //         as={React.Fragment}
                                //         enter={concatenateNonNullStringsWithSpaces("tw-ease-out tw-transition-all", item.enterClassName)}
                                //         enterFrom="tw-translate-y-[1em] tw-opacity-0"
                                //         enterTo="tw-translate-y-0 tw-opacity-full"
                                //         leave="tw-ease-in tw-transition-all tw-duration-200"
                                //         leaveFrom="tw-translate-y-0 tw-opacity-full"
                                //         leaveTo="tw-translate-y-[1em] tw-opacity-0"
                                //     >
                                //         <div className="tw-flex-1 lg-text-title2">{getVernacularString(item.linkTextTextContentPiece, userPreferences.language)}</div>
                                //     </Transition.Child>

                                //     <Transition.Child
                                //         as={React.Fragment}
                                //         enter={concatenateNonNullStringsWithSpaces("tw-ease-out tw-transition-all", item.enterClassName)}
                                //         enterFrom="tw-translate-y-[1em] tw-opacity-0"
                                //         enterTo="tw-translate-y-0 tw-opacity-full"
                                //         leave="tw-ease-in tw-transition-all tw-duration-200"
                                //         leaveFrom="tw-translate-y-0 tw-opacity-full"
                                //         leaveTo="tw-translate-y-[1em] tw-opacity-0"
                                //     >
                                //         <div className="tw-flex-none tw-w-7 tw-h-7 tw-bg-secondary-300-light dark:tw-bg-secondary-500-dark tw-rounded-full tw-flex tw-flex-row tw-items-center tw-justify-center">
                                //             <ChevronRightIcon className="tw-w-6 tw-h-6" />
                                //         </div>
                                //     </Transition.Child>
                                // </button>
                            />
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </Transition>
    );
}

function MenuDialogDesktop({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="tw-flex tw-gap-x-8 tw-items-center tw-text-[16px]">
            <ItemBuilder
                items={headerMenuItems}
                itemBuilder={
                    (item, itemIndex) =>
                        item.to != null ? (
                            <Link
                                to={item.to}
                                className="tw-duration-200 hover:lg-text-primary-500 tw-whitespace-nowrap"
                                key={itemIndex}
                            >
                                {getVernacularString(item.contentId, userPreferences.language)}
                            </Link>
                        ) : (
                            <Popover key={itemIndex}>
                                {({open}) => (
                                    <>
                                        <Popover.Button className="tw-duration-200 hover:lg-text-primary-500 tw-whitespace-nowrap tw-grid tw-grid-cols-[minmax(0,1fr)_1.25rem] tw-items-center tw-gap-x-2">
                                            {getVernacularString(item.contentId, userPreferences.language)}
                                            <ChevronRightIcon className={concatenateNonNullStringsWithSpaces("tw-w-5 tw-h-5 tw-duration-200", open == true ? "-tw-rotate-90" : "tw-rotate-90")} />
                                        </Popover.Button>

                                        {/* TODO: Add relative to Popver and specify a smaller top instead */}
                                        {/* tw-top-14 */}
                                        <Popover.Panel className="tw-absolute tw-top-[7.5rem] tw-left-[10%] tw-right-[10%] tw-p-10 tw-rounded-lg lg-bg-background-500 tw-grid tw-grid-cols-4 tw-gap-x-8 tw-gap-y-8 tw-items-start">
                                            <ItemBuilder
                                                items={item.children}
                                                itemBuilder={(item, itemIndex) =>
                                                    item.to != null ? (
                                                        <Link
                                                            to={item.to}
                                                            className="lg-text-title2 tw-w-fit hover:lg-text-primary-500"
                                                            key={itemIndex}
                                                        >
                                                            {getVernacularString(item.contentId, userPreferences.language)}
                                                        </Link>
                                                    ) : (
                                                        <div
                                                            className="tw-grid tw-grid-cols-1 tw-gap-y-2"
                                                            key={itemIndex}
                                                        >
                                                            <div className="lg-text-title2 tw-pb-2">{getVernacularString(item.contentId, userPreferences.language)}</div>

                                                            <ItemBuilder
                                                                items={item.children}
                                                                itemBuilder={(item, itemIndex) =>
                                                                    item.to != null ? (
                                                                        <Link
                                                                            to={item.to}
                                                                            className="lg-text-body-bold hover:lg-text-primary-500"
                                                                            key={itemIndex}
                                                                        >
                                                                            {getVernacularString(item.contentId, userPreferences.language)}
                                                                        </Link>
                                                                    ) : (
                                                                        <>
                                                                            <div className="lg-text-body-bold">{getVernacularString(item.contentId, userPreferences.language)}</div>

                                                                            <ItemBuilder
                                                                                items={item.children}
                                                                                itemBuilder={(item, itemIndex) =>
                                                                                    item.to != null ? (
                                                                                        <Link
                                                                                            to={item.to}
                                                                                            className="hover:lg-text-primary-500"
                                                                                            key={itemIndex}
                                                                                        >
                                                                                            {getVernacularString(item.contentId, userPreferences.language)}
                                                                                        </Link>
                                                                                    ) : (
                                                                                        <div>Max recursion depth reached</div>
                                                                                    )
                                                                                }
                                                                            />
                                                                        </>
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    )
                                                }
                                            />
                                        </Popover.Panel>
                                    </>
                                )}
                            </Popover>
                        )

                    // <HeaderItemDesktopComponent
                    // />
                }
            />
        </div>
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

type HeaderItem = HeaderItemLink | HeaderItemAccordion;

type HeaderItemLink = {
    contentId: string;
    to: string;
};

type HeaderItemAccordion = {
    contentId: string;
    children: Array<HeaderItem>;
};

const headerMobileItemIndentation = 16;

function HeaderItemMobileComponent({headerItem, userPreferences, indentationLevel}: {headerItem: HeaderItem; userPreferences: UserPreferences; indentationLevel: number}) {
    return headerItem.to != null ? (
        <HeaderItemLinkMobileComponent
            headerItemLink={headerItem as HeaderItemLink}
            userPreferences={userPreferences}
            indentationLevel={indentationLevel}
        />
    ) : (
        <HeaderItemAccordionMobileComponent
            headerItemAccordion={headerItem as HeaderItemAccordion}
            userPreferences={userPreferences}
            indentationLevel={indentationLevel}
        />
    );
}

function HeaderItemAccordionMobileComponent({
    headerItemAccordion,
    userPreferences,
    indentationLevel,
}: {
    headerItemAccordion: HeaderItemAccordion;
    userPreferences: UserPreferences;
    indentationLevel: number;
}) {
    return (
        <Disclosure>
            {({open}) => (
                <>
                    {/* , open ? "tw-bg-[#ed74741c]" : null)} */}
                    <Disclosure.Button className="tw-grid tw-grid-cols-[minmax(0,1fr)_1.5rem] tw-items-center">
                        <div
                            className="lg-text-title2 tw-text-left"
                            style={{
                                paddingLeft: indentationLevel * headerMobileItemIndentation,
                            }}
                        >
                            {getVernacularString(headerItemAccordion.contentId, userPreferences.language)}
                        </div>
                        <div className={concatenateNonNullStringsWithSpaces("tw-w-6 tw-h-6 lg-card tw-rounded-full tw-grid tw-place-items-center tw-duration-200", open ? "tw-rotate-90" : null)}>
                            <ChevronRightIcon className="tw-w-5 tw-h-5" />
                        </div>
                    </Disclosure.Button>

                    <Disclosure.Panel as={React.Fragment}>
                        <ItemBuilder
                            items={headerItemAccordion.children}
                            itemBuilder={(item, itemIndex) => (
                                <HeaderItemMobileComponent
                                    headerItem={item}
                                    userPreferences={userPreferences}
                                    indentationLevel={indentationLevel + 1}
                                    key={itemIndex}
                                />
                            )}
                        />
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}

function HeaderItemLinkMobileComponent({headerItemLink, userPreferences, indentationLevel}: {headerItemLink: HeaderItemLink; userPreferences: UserPreferences; indentationLevel: number}) {
    return (
        // item.to.startsWith("/")
        <Link
            to={headerItemLink.to}
            className="lg-text-title2"
            style={{
                paddingLeft: indentationLevel * headerMobileItemIndentation,
            }}
        >
            {getVernacularString(headerItemLink.contentId, userPreferences.language)}
        </Link>
    );
}

function HeaderItemDesktopComponent({headerItem, userPreferences, indentationLevel}: {headerItem: HeaderItem; userPreferences: UserPreferences; indentationLevel: number}) {
    return headerItem.to != null ? (
        <HeaderItemLinkDesktopComponent
            headerItemLink={headerItem as HeaderItemLink}
            userPreferences={userPreferences}
            indentationLevel={indentationLevel}
        />
    ) : (
        <HeaderItemAccordionDesktopComponent
            headerItemAccordion={headerItem as HeaderItemAccordion}
            userPreferences={userPreferences}
            indentationLevel={indentationLevel}
        />
    );
}

function HeaderItemAccordionDesktopComponent({
    headerItemAccordion,
    userPreferences,
    indentationLevel,
}: {
    headerItemAccordion: HeaderItemAccordion;
    userPreferences: UserPreferences;
    indentationLevel: number;
}) {
    return (
        <Disclosure>
            {({open}) => (
                <>
                    {/* , open ? "tw-bg-[#ed74741c]" : null)} */}
                    <Disclosure.Button className="tw-grid tw-grid-cols-[minmax(0,1fr)_1.5rem] tw-items-center">
                        <div
                            className="lg-text-title2 tw-text-left"
                            style={{
                                paddingLeft: indentationLevel * headerMobileItemIndentation,
                            }}
                        >
                            {getVernacularString(headerItemAccordion.contentId, userPreferences.language)}
                        </div>
                        <div
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-w-6 tw-h-6 tw-rounded-full lg-bg-secondary-100 tw-grid tw-place-items-center tw-duration-200",
                                open ? "tw-rotate-90" : null,
                            )}
                        >
                            <ChevronRightIcon className="tw-w-5 tw-h-5" />
                        </div>
                    </Disclosure.Button>

                    <Disclosure.Panel as={React.Fragment}>
                        <ItemBuilder
                            items={headerItemAccordion.children}
                            itemBuilder={(item, itemIndex) => (
                                <HeaderItemDesktopComponent
                                    headerItem={item}
                                    userPreferences={userPreferences}
                                    indentationLevel={indentationLevel + 1}
                                    key={itemIndex}
                                />
                            )}
                        />
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}

function HeaderItemLinkDesktopComponent({headerItemLink, userPreferences, indentationLevel}: {headerItemLink: HeaderItemLink; userPreferences: UserPreferences; indentationLevel: number}) {
    return (
        // item.to.startsWith("/")
        <Link
            to={headerItemLink.to}
            className="lg-text-title2"
            style={{
                paddingLeft: indentationLevel * headerMobileItemIndentation,
            }}
        >
            {getVernacularString(headerItemLink.contentId, userPreferences.language)}
        </Link>
    );
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
    {keyword: "Automotive Battery", link: "/battery-finder", title: "Batteries for every type of vehicle", score: 1},
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
