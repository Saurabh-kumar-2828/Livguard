import {Dialog, Disclosure, Listbox, Popover, Transition} from "@headlessui/react";
import {Bars3Icon, ChevronRightIcon} from "@heroicons/react/20/solid";
import {Form, Link, useFetcher, useSubmit} from "@remix-run/react";
import React, {createRef, useContext, useEffect, useRef, useState} from "react";
import {BrightnessHighFill, Check2, ChevronDown, MoonStarsFill, Search, Telephone, X} from "react-bootstrap-icons";
import {FixedWidthImage} from "~/components/images/fixedWidthImage";
import {HorizontalSpacer} from "~/global-common-typescript/components/horizontalSpacer";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {ImageCdnProvider} from "~/common--type-definitions/typeDefinitions";
import {concatenateNonNullStringsWithSpaces, getIntegerArrayOfLength} from "~/global-common-typescript/utilities/utilities";
import {setHaptikLanguage} from "~/root";
import {OfferContactUsCta} from "~/components/offerContactUsCta";
import type {UserPreferences} from "~/typeDefinitions";
import {Language, Theme, languageToHumanFriendlyString, languageToShortHumanFriendlyFormat, themeToHumanFriendlyString} from "~/typeDefinitions";
import {getMetadataForImage} from "~/utilities";
import {ContentProviderContext} from "~/contexts/contentProviderContext";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";

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
                {/* <FirstBar
                    showContactDetails={showContactDetails}
                    userPreferences={userPreferences}
                    redirectTo={redirectTo}
                /> */}

                <SecondBar
                    showMobileMenuIcon={showMobileMenuIcon}
                    showSearchOption={showSearchOption}
                    showContactCtaButton={showContactCtaButton}
                    pageUrl={pageUrl}
                    userPreferences={userPreferences}
                    redirectTo={redirectTo}
                />
            </div>
        </>
    );
}

// function FirstBar({showContactDetails, userPreferences, redirectTo}: {showContactDetails: boolean; userPreferences: UserPreferences; redirectTo: string}) {
//     const submit = useSubmit();

//     const [isContactUsDialogOpen, setIsContactUsDialogOpen] = useState(false);

//     const languageOptions = [Language.English, Language.Hindi];
//     const [selectedLanguage, setSelectedLanguage] = useState(userPreferences.language);
//     const languageFormRef = useRef<HTMLFormElement>(null);
//     const previousLanguage = useRef(userPreferences.language);

//     useEffect(() => {
//         // Used to safegaurd against sending a language change request the moment a user enters the page
//         if (selectedLanguage != previousLanguage.current) {
//             submit(languageFormRef.current, {replace: true});
//             previousLanguage.current = selectedLanguage;
//             setHaptikLanguage(selectedLanguage);
//         }
//     }, [selectedLanguage]);

//     const themeOptions = [null, Theme.Light, Theme.Dark];
//     const [selectedTheme, setSelectedTheme] = useState(userPreferences.theme);
//     const themeFormRef = useRef<HTMLFormElement>(null);
//     const previousTheme = useRef(userPreferences.theme);

//     useEffect(() => {
//         // Used to safegaurd against sending a theme change request the moment a user enters the page
//         if (selectedTheme != previousTheme.current) {
//             submit(themeFormRef.current, {replace: true});
//             previousTheme.current = selectedTheme;

//             // TODO: Remove this now?
//             if (selectedTheme == Theme.Dark || (selectedTheme == null && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
//                 document.documentElement.classList.add("tw-dark");
//             } else {
//                 document.documentElement.classList.remove("tw-dark");
//             }
//         }
//     }, [selectedTheme]);

//     function tryToOpenContactUsDialog() {
//         setIsContactUsDialogOpen(true);
//     }

//     return (
//         <div className="tw-flex tw-flex-row tw-items-center lg-bg-secondary-300 lg-px-screen-edge tw-py-3">
//             {showContactDetails == false ? null : (
//                 <>
//                     <button
//                         onClick={tryToOpenContactUsDialog}
//                         className="tw-underline tw-underline-offset-4 lg:tw-hidden"
//                     >
//                         {contentData.getContent("headerS1T1")}
//                     </button>

//                     <div className="tw-hidden lg:tw-flex tw-flex-row tw-items-center lg:tw-text-[13px] xl:tw-text-[16px]">
//                         {contentData.getContent("headerContactUsDialogT2")}:
//                         <HorizontalSpacer className="tw-w-1" />
//                         <a href="tel:18001025551">1800-1025-551</a>
//                         <HorizontalSpacer className="tw-w-4 tw-border-r tw-border-solid tw-border-secondary-700-light dark:tw-border-secondary-700-dark" />
//                         <HorizontalSpacer className="tw-w-4" />
//                         {contentData.getContent("headerContactUsDialogT3")}:
//                         <HorizontalSpacer className="tw-w-1" />
//                         <a href="tel:+919205667999">+91 92056-67999</a>
//                     </div>
//                 </>
//             )}

//             <div className="tw-flex-1" />

//             <Link
//                 to="/offers"
//                 className="tw-hidden lg:tw-flex flex-row tw-justify-between tw-items-center tw-transition tw-duration-200 hover:lg-text-primary-500"
//             >
//                 <img
//                     className="tw-h-4 tw-w-4"
//                     src={
//                         userPreferences.theme === Theme.Light
//                             ? getAbsolutePathForRelativePath(getMetadataForImage("/livguard/icons/get-offers-light.png").finalUrl, ImageCdnProvider.Bunny, null, null)
//                             : getAbsolutePathForRelativePath(getMetadataForImage("/livguard/icons/get-offers-dark.png").finalUrl, ImageCdnProvider.Bunny, null, null)
//                     }
//                 />
//                 <HorizontalSpacer className="tw-w-1" />
//                 {contentData.getContent("9316f275-c395-4344-99d7-895d162602c0")}
//             </Link>
//             <HorizontalSpacer className="tw-w-5" />

//             {/* <Link
//                         to="/e-waste-management"
//                         target="_blank"
//                         className="tw-hidden lg:tw-flex flex-row tw-justify-between tw-items-center tw-transition tw-duration-200 hover:lg-text-primary-500"
//                     >
//                         <img
//                             className="tw-invert dark:tw-invert-0"
//                             src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/header/e-waste-management.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
//                         />
//                         <HorizontalSpacer className="tw-w-1" />
//                         {contentData.getContent("headerMenuSM8T6")}
//                     </Link> */}

//             <HorizontalSpacer className="tw-w-5" />

//             <Form
//                 method="post"
//                 action="/set-theme"
//                 ref={themeFormRef}
//                 className="tw-relative tw-h-6"
//             >
//                 <Listbox
//                     value={selectedTheme}
//                     onChange={setSelectedTheme}
//                 >
//                     <Listbox.Button className="lg-text-secondary-900">
//                         <BrightnessHighFill className="tw-w-6 tw-h-6 tw-block dark:tw-hidden" />
//                         <MoonStarsFill className="tw-w-6 tw-h-6 dark:tw-block tw-hidden" />
//                     </Listbox.Button>

//                     <Listbox.Options className="tw-absolute tw-z-[60] tw-top-12 tw-right-0 lg-text-secondary-900 tw-rounded-lg tw-overflow-hidden tw-w-max">
//                         <ItemBuilder
//                             items={themeOptions}
//                             itemBuilder={(item, itemIndex) => (
//                                 <Listbox.Option
//                                     value={item}
//                                     key={itemIndex}
//                                     as={React.Fragment}
//                                 >
//                                     {({active, selected}) => (
//                                         <li
//                                             className={concatenateNonNullStringsWithSpaces(
//                                                 "tw-w-full tw-min-w-max tw-grid tw-grid-cols-[minmax(0,1fr)_auto] tw-items-center tw-gap-x-2 tw-px-2 tw-py-2 tw-cursor-pointer tw-duration-200",
//                                                 active ? "lg-bg-primary-500 tw-text-secondary-900-dark" : "lg-bg-secondary-100",
//                                             )}
//                                         >
//                                             <div>{themeToHumanFriendlyString(userPreferences, item)}</div>
//                                             {selected ? <Check2 className="tw-w-5 tw-h-5" /> : <div className="tw-w-5 tw-h-5" />}
//                                         </li>
//                                     )}
//                                 </Listbox.Option>
//                             )}
//                             spaceBuilder={(spaceIndex) => (
//                                 <div
//                                     className="tw-h-px lg-bg-secondary-700"
//                                     key={spaceIndex}
//                                 />
//                             )}
//                         />
//                     </Listbox.Options>
//                 </Listbox>

//                 <input
//                     type="text"
//                     name="theme"
//                     value={selectedTheme ?? ""}
//                     readOnly
//                     className="tw-hidden"
//                 />

//                 <input
//                     type="text"
//                     name="redirectTo"
//                     value={redirectTo}
//                     readOnly
//                     className="tw-hidden"
//                 />
//             </Form>

//             <HorizontalSpacer className="tw-w-4 tw-border-r tw-border-solid tw-border-secondary-700-light dark:tw-border-secondary-700-dark" />

//             <HorizontalSpacer className="tw-w-4" />

//             <Form
//                 method="post"
//                 action="/set-language"
//                 ref={languageFormRef}
//                 className="tw-relative"
//             >
//                 <Listbox
//                     value={selectedLanguage}
//                     onChange={setSelectedLanguage}
//                 >
//                     <Listbox.Button className="lg-text-secondary-900 tw-grid tw-grid-cols-[1rem_1rem] tw-gap-x-2 tw-items-center lg:tw-text-[13px] xl:tw-text-[16px]">
//                         {languageToShortHumanFriendlyFormat(selectedLanguage)}
//                         <ChevronDown className="tw-w-4 tw-h-4" />
//                     </Listbox.Button>

//                     <Listbox.Options className="tw-absolute tw-z-[60] tw-top-12 tw-right-0 lg-text-secondary-900 tw-rounded-lg tw-overflow-hidden tw-w-max">
//                         <ItemBuilder
//                             items={languageOptions}
//                             itemBuilder={(item, itemIndex) => (
//                                 <Listbox.Option
//                                     value={item}
//                                     key={itemIndex}
//                                     as={React.Fragment}
//                                 >
//                                     {({active, selected}) => (
//                                         <li
//                                             className={concatenateNonNullStringsWithSpaces(
//                                                 "tw-w-full tw-min-w-max tw-grid tw-grid-cols-[minmax(0,1fr)_auto] tw-items-center tw-gap-x-2 tw-px-2 tw-py-2 tw-cursor-pointer tw-duration-200",
//                                                 active ? "lg-bg-primary-500 tw-text-secondary-900-dark" : "lg-bg-secondary-300",
//                                             )}
//                                         >
//                                             <div>{languageToHumanFriendlyString(item)}</div>
//                                             {selected ? (
//                                                 <Check2 className="tw-w-5 tw-h-5 lg:tw-h-3 lg:tw-w-3 xl:tw-h-5 xl:tw-w-5" />
//                                             ) : (
//                                                 <div className="tw-w-5 tw-h-5 lg:tw-h-3 lg:tw-w-3 xl:tw-h-5 xl:tw-w-5" />
//                                             )}
//                                         </li>
//                                     )}
//                                 </Listbox.Option>
//                             )}
//                             spaceBuilder={(spaceIndex) => (
//                                 <div
//                                     className="tw-h-px lg-bg-secondary-700"
//                                     key={spaceIndex}
//                                 />
//                             )}
//                         />
//                     </Listbox.Options>
//                 </Listbox>

//                 <input
//                     type="text"
//                     name="language"
//                     value={selectedLanguage}
//                     readOnly
//                     className="tw-hidden"
//                 />

//                 <input
//                     type="text"
//                     name="redirectTo"
//                     value={redirectTo}
//                     readOnly
//                     className="tw-hidden"
//                 />
//             </Form>

//             <ContactUsDialog
//                 userPreferences={userPreferences}
//                 isContactUsDialogOpen={isContactUsDialogOpen}
//                 setIsContactUsDialogOpen={setIsContactUsDialogOpen}
//             />
//         </div>
//     );
// }

function SecondBar({
    showMobileMenuIcon,
    showSearchOption,
    showContactCtaButton,
    pageUrl,
    userPreferences,
    redirectTo,
}: {
    showMobileMenuIcon: boolean;
    showSearchOption: boolean;
    showContactCtaButton: boolean;
    pageUrl: string;
    userPreferences: UserPreferences;
    redirectTo: string;
}) {
    const submit = useSubmit();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function tryToOpenMenu() {
        setIsMenuOpen(true);
    }

    const [isSearchOpen, setIsSearchOpen] = useState(false);

    function tryToOpenSearch() {
        setIsSearchOpen(true);
    }

    const languageOptions = [Language.English, Language.Hindi];
    const [selectedLanguage, setSelectedLanguage] = useState(userPreferences.language);
    const languageFormRef = useRef<HTMLFormElement>(null);
    const previousLanguage = useRef(userPreferences.language);

    const isScreenSizeBelow = useIsScreenSizeBelow(1024);

    useEffect(() => {
        // Used to safegaurd against sending a language change request the moment a user enters the page
        if (selectedLanguage != previousLanguage.current) {
            submit(languageFormRef.current, {replace: true});
            previousLanguage.current = selectedLanguage;
            if (!isScreenSizeBelow) {
                setHaptikLanguage(selectedLanguage);
            }
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
        // TODO: Resolve this custom media query some other way
        <div className="tw-px-6 [@media(max-width:1080px)]:!tw-px-2 tw-py-4 lg-bg-background-500 tw-flex tw-flex-row tw-items-center">
            <div className="tw-flex lg:tw-hidden tw-flex-row">
                <button
                    type="button"
                    onClick={tryToOpenMenu}
                >
                    <Bars3Icon className="tw-w-6 tw-h-6" />
                </button>

                <HorizontalSpacer className="tw-w-2" />
            </div>

            <Link to="/">
                <img
                    src={userPreferences.theme == Theme.Dark ? "https://files.growthjockey.com/livguard/icons/logo-dark.svg" : "https://files.growthjockey.com/livguard/icons/logo-light.svg"}
                    width={385}
                    height={96}
                    className="tw-w-auto tw-h-6 lg:tw-h-[2.2rem]"
                    key={userPreferences.theme == Theme.Dark ? "https://files.growthjockey.com/livguard/icons/logo-dark.svg" : "https://files.growthjockey.com/livguard/icons/logo-light.svg"}
                    alt="livguard-logo"
                />
            </Link>

            <div className="tw-w-6 tw-hidden lg:tw-flex" />

            <MenuDialogDesktop
                userPreferences={userPreferences}
                className="tw-hidden lg:tw-flex"
            />

            <div className="tw-flex-1" />

            {showSearchOption && (
                <button
                    type="button"
                    onClick={tryToOpenSearch}
                    className="tw-flex tw-flex-row tw-items-center"
                >
                    <Search className="tw-w-6 tw-h-6" />
                    <HorizontalSpacer className="tw-w-4" />
                    {/* <div className="lg:tw-text-[13px] xl:tw-text-[16px]">{contentData.getContent("headerS2T1")}</div> */}
                </button>
            )}

            {/* <Link
                to={"/load-calculator"}
                className="tw-bg-gradient-to-r tw-from-[#F25F60] tw-to-[#EB2A2B] tw-px-12 tw-py-1 tw-rounded-3xl lg:tw-text-white"
            >
                {contentData.getContent("headerLoadCalculator")}
            </Link> */}

            {showContactCtaButton && (
                <OfferContactUsCta
                    userPreferences={userPreferences}
                    textVernacId="offerPageCta"
                    className="tw-z-10 tw-hidden lg:tw-block"
                    pageUrl={pageUrl}
                />
            )}

            <MenuDialogMobile
                userPreferences={userPreferences}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
            />

            <SearchDialog
                userPreferences={userPreferences}
                isSearchOpen={isSearchOpen}
                setIsSearchOpen={setIsSearchOpen}
            />

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
                                                active ? "lg-bg-primary-500 tw-text-secondary-900-dark" : "lg-bg-secondary-100",
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
                                                active ? "lg-bg-primary-500 tw-text-secondary-900-dark" : "lg-bg-secondary-100",
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

        // <>
        //     <div className="lg-px-screen-edge tw-py-4 lg-bg-background-500 tw-flex tw-flex-row tw-items-center">
        //         {showMobileMenuIcon && (
        //             <div className="tw-flex tw-flex-row lg:tw-hidden">
        //                 <button
        //                     type="button"
        //                     onClick={tryToOpenMenu}
        //                 >
        //                     <Bars3Icon className="tw-w-6 tw-h-6" />
        //                 </button>

        //                 <HorizontalSpacer className="tw-w-2" />
        //             </div>
        //         )}

        //         <Link to="/">
        //             <div className="tw-block dark:tw-hidden">
        //                 <img
        //                     src="https://files.growthjockey.com/livguard/icons/logo-light.svg"
        //                     width={385}
        //                     height={96}
        //                     className="tw-w-auto tw-h-6"
        //                 />
        //             </div>

        //             <div className="dark:tw-block tw-hidden">
        //                 <img
        //                     src="https://files.growthjockey.com/livguard/icons/logo-dark.svg"
        //                     width={385}
        //                     height={96}
        //                     className="tw-w-auto tw-h-6"
        //                 />
        //             </div>
        //         </Link>

        //         <div className="tw-w-8 tw-hidden lg:tw-flex" />

        //         {showMobileMenuIcon && (
        //             <div className="tw-hidden [@media(min-width:1075px)]:tw-flex lg:tw-gap-x-4 xl:tw-gap-x-8 tw-items-center lg:tw-text-[13px] xl:tw-text-[16px]">
        //                 <button
        //                     type="button"
        //                     onClick={() => {
        //                         tryToOpenSubMenu(SubMenu.Inverters);
        //                     }}
        //                     className="tw-transition tw-duration-200 hover:lg-text-primary-500"
        //                 >
        //                     {contentData.getContent("headerMenuS1T1")}
        //                 </button>

        //                 <Link
        //                     to="/inverter-batteries"
        //                     className="tw-transition tw-duration-200 hover:lg-text-primary-500"
        //                 >
        //                     {contentData.getContent("headerMenuS1T2")}
        //                 </Link>

        //                 <button
        //                     type="button"
        //                     onClick={() => {
        //                         tryToOpenSubMenu(SubMenu.AutomotiveBatteries);
        //                     }}
        //                     className="tw-transition tw-duration-200 hover:lg-text-primary-500"
        //                 >
        //                     {contentData.getContent("headerMenuS1T3")}
        //                 </button>

        //                 <button
        //                     type="button"
        //                     onClick={() => {
        //                         tryToOpenSubMenu(SubMenu.Solar);
        //                     }}
        //                     className="tw-transition tw-duration-200 hover:lg-text-primary-500"
        //                 >
        //                     {contentData.getContent("headerMenuS1T4")}
        //                 </button>

        //                 <button
        //                     type="button"
        //                     onClick={() => {
        //                         tryToOpenSubMenu(SubMenu.AccessoriesAndotherBatteries);
        //                     }}
        //                     className="tw-transition tw-duration-200 hover:lg-text-primary-500"
        //                 >
        //                     {contentData.getContent("headerMenuS1T5")}
        //                 </button>

        //                 <Link
        //                     to="/dealer-for-inverters-and-batteries"
        //                     className="tw-transition tw-duration-200 hover:lg-text-primary-500"
        //                 >
        //                     {contentData.getContent("headerMenuS1T6")}
        //                 </Link>

        //                 {/* <a
        //                     href="/register-and-warranty-for-inverters.php"
        //                 >
        //                     {contentData.getContent("headerMenuS1T7")}
        //                 </a> */}

        //                 <button
        //                     type="button"
        //                     onClick={() => {
        //                         tryToOpenSubMenu(SubMenu.More);
        //                     }}
        //                     className="tw-transition tw-duration-200 hover:lg-text-primary-500"
        //                 >
        //                     {contentData.getContent("headerMenuS1T8")}
        //                 </button>

        //                 <Link
        //                     to={"/load-calculator"}
        //                     className="tw-bg-gradient-to-r tw-from-[#F25F60] tw-to-[#EB2A2B] tw-px-12 tw-py-1 tw-rounded-3xl lg:tw-text-white"
        //                 >
        //                     {contentData.getContent("headerLoadCalculator")}
        //                 </Link>
        //             </div>
        //         )}

        //         <div className="tw-flex-1" />

        //         {showSearchOption && (
        //             <button
        //                 type="button"
        //                 onClick={tryToOpenSearch}
        //                 className="tw-flex tw-flex-row tw-items-center"
        //             >
        //                 <Search className="tw-w-6 tw-h-6" />
        //                 <HorizontalSpacer className="tw-w-2" />
        //                 <div className="lg:tw-text-[13px] xl:tw-text-[16px]">{contentData.getContent("headerS2T1")}</div>
        //             </button>
        //         )}
        //         {showContactCtaButton && (
        //             <OfferContactUsCta
        //                 userPreferences={userPreferences}
        //                 textVernacId="offerPageCta"
        //                 className="tw-z-10 tw-hidden lg:tw-block"
        //                 pageUrl={pageUrl}
        //             />
        //         )}
        //     </div>

        //     <ContactUsDialog
        //         userPreferences={userPreferences}
        //         isContactUsDialogOpen={isContactUsDialogOpen}
        //         setIsContactUsDialogOpen={setIsContactUsDialogOpen}
        //     />

        //     {/* <MenuDialog
        //         userPreferences={userPreferences}
        //         isMenuOpen={isMenuOpen}
        //         setIsMenuOpen={setIsMenuOpen}
        //         menuState={menuState}
        //         currentlyOpenSubMenu={currentlyOpenSubMenu}
        //         setCurrentlyOpenSubMenu={setCurrentlyOpenSubMenu}
        //         subMenuState={subMenuState}
        //         tryToOpenSubMenu={tryToOpenSubMenu}
        //         tryToOpenContactUsLeadFormDialog={tryToOpenContactUsLeadFormDialog}
        //     />

        //     <SubMenuDialog
        //         userPreferences={userPreferences}
        //         currentlyOpenSubMenu={currentlyOpenSubMenu}
        //         setCurrentlyOpenSubMenu={setCurrentlyOpenSubMenu}
        //         subMenuState={subMenuState}
        //         utmParameters={utmParameters}
        //         pageUrl={pageUrl}
        //         setIsMenuOpen={setIsMenuOpen}
        //         tryToOpenContactUsLeadFormDialog={tryToOpenContactUsLeadFormDialog}
        //     /> */}

        //     <ContactUsLeadFormDialog
        //         userPreferences={userPreferences}
        //         isContactUsDialogOpen={isContactUsLeadFormDialogOpen}
        //         setIsContactUsDialogOpen={setIsContactUsLeadFormDialogOpen}
        //         utmParameters={utmParameters}
        //         pageUrl={pageUrl}
        //     />

        //     <SearchDialog
        //         userPreferences={userPreferences}
        //         isSearchOpen={isSearchOpen}
        //         setIsSearchOpen={setIsSearchOpen}
        //     />
        // </>
    );
}

const headerMenuItems: Array<HeaderItem> = [
    {
        contentId: "642467c3-8136-4523-b231-fa5aae9a075a",
        children: [
            {
                contentId: "b2d29598-d1f2-4766-a1ea-20d0fe9dd2f9",
                children: [
                    {
                        contentId: "2257b2c1-280c-49a6-9399-8abd4847993f",
                        to: "/inverter-for-home",
                    },
                    {
                        contentId: "a6d509fa-dc46-498b-b363-fbf309c70449",
                        to: "/high-capacity-inverters",
                    },
                    {
                        contentId: "824433d9-6781-46ab-afa1-a863ebef7038",
                        to: "/load-calculator",
                    },
                    // {
                    //     contentId: "e31c0b34-e22a-4cf2-a890-15a7356188d1",
                    //     to: "/inverter-trolley",
                    // },
                ],
                desktopClassName: "tw-row-start-1 tw-col-start-1 tw-pl-5 tw-pr-5 tw-pt-4 tw-pb-4 dark:tw-bg-new-background-border-500-dark",
                col: 1,
            },
            {
                contentId: "3618f17b-d59c-430d-99c0-a238adaea4e4",
                children: [
                    {
                        contentId: "categoryBatteriesS4TT",
                        to: "/inverter-batteries?id=0",
                    },
                    {
                        contentId: "categoryBatteriesS4ST",
                        to: "/inverter-batteries?id=1",
                    },
                    {
                        contentId: "categoryBatteriesS4STT",
                        to: "/inverter-batteries?id=2",
                    },
                ],
                desktopClassName: "tw-row-start-2 tw-col-start-1 tw-row-span-2 tw-content-start tw-pl-5 tw-pr-5 tw-pt-0 tw-pb-10 dark:tw-bg-new-background-border-500-dark",
                col: 1,
            },

            // {
            //     contentId: "4b1b2126-7ed2-4a31-98d8-74158e31022f",
            //     children: [
            //         {
            //             contentId: "7e54165c-1ab3-4284-8a68-7db0515f1c66",
            //             to: "/inverter-battery-combo",
            //         },
            //     ],
            //     desktopClassName:
            //         "tw-row-start-2 tw-col-start-1 tw-row-span-2 tw-h-full tw-content-start tw-pl-5 tw-pr-5 tw-pt-4 tw-pb-10 tw-bg-new-foreground-500-dark dark:tw-bg-new-background-border-500-dark",
            //     col: 1,
            // },
            {
                contentId: "4b1b2126-7ed2-4a31-98d8-74158e31022f",
                children: [
                    {
                        contentId: "7e54165c-1ab3-4284-8a68-7db0515f1c66",
                        to: "/inverter-battery-combo",
                    },
                ],
                desktopClassName: "tw-row-start-2 tw-col-start-1 tw-row-span-2 tw-content-start tw-pl-5 tw-pr-5 tw-pt-4 tw-bg-new-foreground-500-dark dark:tw-bg-new-background-500-dark",
                col: 2,
            },
            {
                contentId: "ead3f26e-89df-44b3-8237-774b924f13eb",
                children: [
                    // {
                    //     contentId: "0e58360b-6e83-47da-a0c5-afca55819e50",
                    //     to: "/load-calculator",
                    // },
                    {
                        contentId: "e31c0b34-e22a-4cf2-a890-15a7356188d1",
                        to: "/inverter-trolley",
                    },
                ],
                desktopClassName: "tw-row-start-2 tw-col-start-1 tw-row-span-2 tw-content-start tw-pl-5 tw-pr-5 tw-pt-4 tw-bg-new-foreground-500-dark dark:tw-bg-new-background-500-dark",
                col: 2,
            },
            {
                contentId: "97b49871-9e97-48b9-af09-e2b931a8e071",
                children: [
                    {
                        contentId: "0e58360b-6e83-47da-a0c5-afca55819e50",
                        to: "/load-calculator",
                    },
                ],
                desktopClassName: "tw-row-start-3 tw-col-start-2 tw-row-span-2 tw-h-full tw-content-start tw-pl-5 tw-pr-5 tw-pt-4 tw-bg-new-foreground-500-dark dark:tw-bg-new-background-500-dark",
                col: 2,
            },
            // {
            //     contentId: "380adfbe-cb27-4b22-b601-db704a8d13ce",
            //     children: [
            //         {
            //             contentId: "10a057de-1158-4f8b-8186-48571a720fc5",
            //             // TODO: Find lithium page from old site
            //             to: "/",
            //         },
            //         {
            //             contentId: "ac7ae8d2-3f3c-49a6-a6db-e8cbb8b3ed07",
            //             to: "/",
            //         },
            //         {
            //             contentId: "7596543b-c504-4ca0-817d-fc7f5dcefea7",
            //             to: "/",
            //         },
            //         {
            //             contentId: "8ccc369c-daa0-47d7-a568-1752d660d737",
            //             to: "/",
            //         },
            //         {
            //             contentId: "b42973cc-d1f0-4ddb-aba7-a030b7398ccb",
            //             to: "/",
            //         },
            //         {
            //             contentId: "e720a43a-b9cc-4925-9dcb-e37abb16ac28",
            //             to: "/",
            //         },
            //     ],
            //     desktopClassName: "tw-row-start-1 tw-col-start-3 tw-row-span-2 tw-pl-5 tw-pr-6 tw-pt-10 tw-pb-4 tw-bg-new-foreground-500-dark dark:tw-bg-new-foreground-500-light",
            // },

            // {
            //     contentId: "",
            //     children: [
            //         {
            //             contentId: "f54e5fcb-25a7-4af2-836c-75eff3e2916e",
            //             to: "/inverter-batteries",
            //         },
            //         {
            //             contentId: "816e8c1d-93cc-4629-b808-043e46fba2fd",
            //             children: [
            //                 {
            //                     contentId: "4254cae7-7bda-4303-bc24-80dcf71c0647",
            //                     to: "/car-and-suv-batteries/",
            //                 },
            //                 {
            //                     contentId: "d92c5f11-8777-4ec2-9aca-32061a9ea613",
            //                     to: "/two-wheeler-batteries/",
            //                 },
            //                 {
            //                     contentId: "ade7956e-a64e-4ade-8dbd-bfb9ffbe834a",
            //                     to: "/three-wheeler-batteries/",
            //                 },
            //                 {
            //                     contentId: "5da16ba5-b835-4eb5-9e86-d187a7186faf",
            //                     to: "/tractor-batteries/",
            //                 },
            //                 {
            //                     contentId: "b5eba6c1-c835-4f87-8f7b-d73951cf60b5",
            //                     to: "/bus-and-truck-batteries/",
            //                 },
            //                 {
            //                     contentId: "ef1a6048-3009-4268-b127-2affbacad4e1",
            //                     to: "/e-rickshaw-batteries/",
            //                 },
            //             ],
            //         },
            //         {
            //             contentId: "e057dd65-bdc4-4a61-9350-881e46db892a",
            //             to: "/solar-battery-for-home/",
            //         },
            //     ],
            // },
            // {
            //     contentId: "3272fdec-2fca-490f-b0fa-857a45df8f0e",
            //     children: [
            //         {
            //             contentId: "9bfdbf1f-fe80-49e2-a0de-166844aad521",
            //             to: "/inverter-for-home/",
            //         },
            //         {
            //             contentId: "fe8f481e-ad9b-4000-b462-8fa0fa334a14",
            //             to: "/high-capacity-inverters/",
            //         },
            //     ],
            // },
            // {
            //     contentId: "893bd439-ee92-4bfb-a05d-476854330caa",
            //     to: "https://www.livguardsolar.com/residential_solar",
            // },
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
            // {
            //     contentId: "b98f5c9e-16fc-4803-8494-1f54a8eb55c9",
            //     children: [
            //         {
            //             contentId: "0faf2ddb-4220-456c-a5fb-935716db76ec",
            //             children: [
            //                 {
            //                     contentId: "52a70998-083b-4b6e-977c-475295c0aa19",
            //                     to: "/e-rickshaw-charger/",
            //                 },
            //                 {
            //                     contentId: "15fbd08d-74e9-45f7-a7a1-645fd0679c14",
            //                     to: "/vrla-batteries/",
            //                 },
            //             ],
            //         },
            //         {
            //             contentId: "77534355-2fbc-4c69-851c-58a2e4034168",
            //             children: [
            //                 // {
            //                 //     contentId: "5d654da3-2d50-4150-86a1-633152d775c8",
            //                 //     to: "/stabilizer-for-AC-and-TV.php",
            //                 // },
            //                 {
            //                     contentId: "c4c67588-fe35-46da-8c07-d8e2ed05f7f4",
            //                     to: "/inverter-trolley/",
            //                 },
            //             ],
            //         },
            //     ],
            // },
        ],
        desktopClassName: "",
        colCount: 2,
    },
    {
        contentId: "407c0e47-9c3b-47b0-a1f2-13fc372dff9f",
        children: [
            {
                contentId: "006eee83-6cbd-4e55-ba78-da6e16626b7a",
                to: "https://www.livguardsolar.com/",
                // tw-h-full tw-content-start should not be required here, but somehow I have to add it for pixel-perfect UI. Investigate if possible.
                desktopClassName:
                    "tw-row-start-1 tw-col-start-2 tw-content-start tw-self-center tw-pl-6 tw-pr-6 tw-pt-4 [&>*]:!lgs-text-body [&>*]:tw-duration-200 [&>*]:hover:!tw-text-primary-500-light dark:tw-bg-new-background-border-500-dark",
                col: 1,
            },
            {
                contentId: "f7d7b56c-1e62-4fb6-a56b-bf6c98415380",
                to: "https://www.livguardsolar.com/understanding-solar",
                // tw-h-full tw-content-start should not be required here, but somehow I have to add it for pixel-perfect UI. Investigate if possible.
                desktopClassName:
                    "tw-row-start-2 tw-col-start-2 tw-content-start tw-self-center tw-pl-6 tw-pr-6 tw-pt-4 [&>*]:!lgs-text-body [&>*]:tw-duration-200 [&>*]:hover:!tw-text-primary-500-light dark:tw-bg-new-background-border-500-dark",
                col: 1,
            },
            {
                contentId: "f561a442-2c38-405e-9bb4-8ed3f9ed0359",
                to: "https://www.livguardsolar.com/latest-projects",
                // tw-h-full tw-content-start should not be required here, but somehow I have to add it for pixel-perfect UI. Investigate if possible.
                desktopClassName:
                    "tw-row-start-3 tw-col-start-2 tw-content-start tw-self-center tw-pl-6 tw-pr-6 tw-pt-4 [&>*]:!lgs-text-body [&>*]:tw-duration-200 [&>*]:hover:!tw-text-primary-500-light dark:tw-bg-new-background-border-500-dark",
                col: 1,
            },
            {
                contentId: "a9b2a2c7-9d4e-4908-8463-23cb3669bb1d",
                to: "https://www.livguardsolar.com/partner-with-us",
                // tw-h-full tw-content-start should not be required here, but somehow I have to add it for pixel-perfect UI. Investigate if possible.
                desktopClassName:
                    "tw-row-start-4 tw-col-start-2 tw-content-start tw-self-center tw-pl-6 tw-pr-6 tw-pt-4 [&>*]:!lgs-text-body [&>*]:tw-duration-200 [&>*]:hover:!tw-text-primary-500-light dark:tw-bg-new-background-border-500-dark",
                col: 1,
            },
            {
                contentId: "daaa6fb5-b78d-4d57-a8ba-7c54762979c9",
                children: [
                    {
                        contentId: "c22e2175-92ca-4d88-8fbe-3bbdce62ca16",
                        to: "https://www.livguardsolar.com/solculator",
                    },
                    {
                        contentId: "57a03ee7-ca2c-4a65-99ca-f462af61147d",
                        to: "https://www.livguardsolar.com/dealers",
                    },
                ],
                desktopClassName: "tw-row-start-4 tw-col-start-2 tw-content-start tw-self-center tw-pl-6 tw-pr-6 tw-pt-4 dark:tw-bg-new-background-border-500-dark",
                col: 1,
            },
            {
                contentId: "c26206f2-c606-486f-b8bc-4072e9afbf86",
                children: [
                    {
                        contentId: "f5ade0ea-e178-48ba-b86b-25923286d7f0",
                        to: "https://www.livguardsolar.com/solar-panels?id=mono-perc-half-cut",
                    },
                    {
                        contentId: "77e7fb4d-ac75-46a6-a46c-4cadabcf9092",
                        to: "https://www.livguardsolar.com/solar-panels?id=mono-perc",
                    },
                    {
                        contentId: "d77ea485-ddbf-4530-9181-525fc5b8082b",
                        to: "https://www.livguardsolar.com/solar-panels?id=polycrystalline",
                    },
                ],
                desktopClassName: "tw-row-start-3 tw-col-start-2 tw-row-span-2 tw-pl-6 tw-pr-6 tw-pt-4 tw-bg-new-foreground-500-dark dark:tw-bg-new-background-500-dark",
                col: 2,
            },
            {
                contentId: "51d76bcb-18b4-4d78-bf5b-c5a987fe1879",
                to: "https://www.livguardsolar.com/solar-batteries",
                // tw-h-full tw-content-start should not be required here, but somehow I have to add it for pixel-perfect UI. Investigate if possible.
                desktopClassName:
                    "tw-row-start-2 tw-col-start-2 tw-content-start tw-self-center tw-pl-6 tw-pr-6 tw-pt-4 [&>*]:!lgs-text-body-bold [&>*]:!lgs-text-primary-500 tw-bg-new-foreground-500-dark dark:tw-bg-new-background-500-dark",
                col: 2,
            },
            {
                contentId: "8c95d787-e92a-4e57-8eae-6402070e50db",
                children: [
                    {
                        contentId: "f4a2d034-5b81-4acc-9f92-5ac4f9c89809",
                        to: "https://www.livguardsolar.com/solar-on-grid-inverters",
                    },
                    {
                        contentId: "88de74d7-0089-4e9b-8129-8cd8657520ae",
                        to: "https://www.livguardsolar.com/solar-off-grid-inverters",
                    },
                    {
                        contentId: "1ce35128-7be7-48aa-bd66-83160476fd11",
                        to: "https://www.livguardsolar.com/hybrid-inverters",
                    },
                ],
                // tw-h-full tw-content-start should not be required here, but somehow I have to add it for pixel-perfect UI. Investigate if possible.
                desktopClassName: "tw-row-start-4 tw-col-start-2 tw-content-start tw-self-center tw-pl-6 tw-pr-6 tw-pt-4 tw-bg-new-foreground-500-dark dark:tw-bg-new-background-500-dark",
                col: 2,
            },
            {
                contentId: "46eb3f74-d78f-4ba2-b681-dd51a81bc914",
                to: "https://www.livguardsolar.com/charge-controller",
                // tw-h-full tw-content-start should not be required here, but somehow I have to add it for pixel-perfect UI. Investigate if possible.
                desktopClassName:
                    "tw-row-start-2 tw-col-start-2 tw-content-start tw-self-center tw-pl-6 tw-pr-6 tw-pt-4 [&>*]:!lgs-text-body-bold [&>*]:!lgs-text-primary-500 tw-bg-new-foreground-500-dark dark:tw-bg-new-background-500-dark",
                col: 2,
            },
            {
                contentId: "ad0d0afb-32f1-47e3-abb6-a2f6a1cdb1c0",
                to: "https://www.livguardsolar.com/solar-management-unit",
                // tw-h-full tw-content-start should not be required here, but somehow I have to add it for pixel-perfect UI. Investigate if possible.
                desktopClassName:
                    "tw-row-start-2 tw-col-start-2 tw-content-start tw-self-center tw-pl-6 tw-pr-6 tw-pt-4 tw-pb-6 [&>*]:!lgs-text-body-bold [&>*]:!lgs-text-primary-500 tw-bg-new-foreground-500-dark dark:tw-bg-new-background-500-dark",
                col: 2,
            },
        ],
        desktopClassName: "dark:!tw-bg-new-background-border-500-dark",
        colCount: 2,
    },
    {
        contentId: "e9624c2c-a16e-4f56-88a2-3e2710461b14",
        children: [
            {
                contentId: "4b90a927-4cc2-46de-8118-1aa103534ba6",
                children: [
                    {
                        contentId: "3be9fa84-b556-42a0-95d8-093c1254891a",
                        to: "/two-wheeler-batteries",
                    },
                    {
                        contentId: "c844f792-12c7-470d-87cf-317f70d4799a",
                        to: "/three-wheeler-batteries",
                    },
                    {
                        contentId: "23384cb7-5097-4db3-964c-3010ed24ea63",
                        to: "/car-and-suv-batteries",
                    },
                    {
                        contentId: "8c1ffd32-d901-4cae-b508-1ac6498f84f9",
                        to: "/bus-and-truck-batteries",
                    },
                    {
                        contentId: "fbbc862d-69ec-4906-8f81-7e139dcdf047",
                        to: "/tractor-batteries",
                    },
                    {
                        contentId: "8c1d602c-9b8c-42db-a63f-da5e63490357",
                        to: "/e-rickshaw-batteries",
                    },
                    // {
                    //     contentId: "7d99e64e-9019-4cb3-9331-c5232bf040df",
                    //     to: "/battery-finder",
                    // },
                ],
                desktopClassName: "tw-row-start-1 tw-col-start-1 tw-row-span-3 tw-h-full tw-content-start tw-pl-6 tw-pr-5 tw-pt-4 tw-pb-10 dark:tw-bg-new-background-border-500-dark",
                col: 1,
            },
            {
                contentId: "ead3f26e-89df-44b3-8237-774b924f13eb",
                children: [
                    {
                        contentId: "dc3dacb5-baa4-4fa3-8d27-a4b87fcd0158",
                        to: "/e-rickshaw-charger",
                    },
                ],
                desktopClassName: "tw-row-start-1 tw-col-start-2 tw-content-start tw-pl-6 tw-pr-5 tw-pt-4 tw-bg-new-foreground-500-dark dark:tw-bg-new-background-500-dark",
                col: 2,
            },
            {
                contentId: "97b49871-9e97-48b9-af09-e2b931a8e071",
                children: [
                    {
                        contentId: "7d99e64e-9019-4cb3-9331-c5232bf040df",
                        to: "/battery-finder",
                    },
                ],
                desktopClassName:
                    "tw-row-start-3 tw-col-start-1 tw-row-span-3 tw-content-start tw-h-full tw-pl-6 tw-pr-5 tw-pt-4 tw-pb-6 tw-pb-10 tw-bg-new-foreground-500-dark dark:tw-bg-new-background-500-dark",
                col: 2,
            },
        ],
        desktopClassName: "",
        colCount: 2,
    },
    {
        contentId: "b137744d-bc16-4100-afb4-8d3c2fb07793",
        children: [
            {
                contentId: "c577a2cf-745c-40b6-a9fa-cb1ef88d7cd3",
                to: "/pricing",
                col: 1,
                //Using a not so good way to control text color of these links, since they are L1 links but they have to look like L2 links
                desktopClassName:
                    "tw-content-start tw-pl-6 tw-pr-5 tw-pt-4 tw-bg-new-foreground-500-dark [&>*]:!lg-text-body-bold [&>*]:!lg-text-secondary-700 [&>*]:dark:!tw-text-new-foreground-500-dark [&>*]:dark:hover:!tw-text-primary-500-dark [&>*]:tw-transition-colors [&>*]:tw-duration-200 [&>*]:hover:!lg-text-primary-500 [&>*]:!tw-font-normal dark:tw-bg-new-background-border-500-dark",
            },
            {
                contentId: "f008f7bb-e106-4e04-8654-8f3e1d517979",
                to: "/offers",
                col: 1,
                desktopClassName:
                    "tw-content-start tw-pl-6 tw-pr-5 tw-pt-4 tw-bg-new-foreground-500-dark [&>*]:!lg-text-body-bold [&>*]:!lg-text-secondary-700 [&>*]:dark:!tw-text-new-foreground-500-dark [&>*]:dark:hover:!tw-text-primary-500-dark [&>*]:tw-transition-colors [&>*]:tw-duration-200 [&>*]:hover:!lg-text-primary-500 [&>*]:!tw-font-normal dark:tw-bg-new-background-border-500-dark",
            },
            {
                contentId: "739577f2-3578-4eaf-8b45-8b3de3372aa9",
                to: "/load-calculator",
                col: 1,
                desktopClassName:
                    "tw-content-start tw-pl-6 tw-pr-5 tw-pt-4 tw-bg-new-foreground-500-dark [&>*]:!lg-text-body-bold [&>*]:!lg-text-secondary-700 [&>*]:dark:!tw-text-new-foreground-500-dark [&>*]:dark:hover:!tw-text-primary-500-dark [&>*]:tw-transition-colors [&>*]:tw-duration-200 [&>*]:hover:!lg-text-primary-500 [&>*]:!tw-font-normal dark:tw-bg-new-background-border-500-dark",
            },
            {
                contentId: "0476c521-6376-4411-ba07-10ab93e5982f",
                to: "/battery-finder",
                col: 1,
                desktopClassName:
                    "tw-content-start tw-pl-6 tw-pr-5 tw-pt-4 tw-bg-new-foreground-500-dark [&>*]:!lg-text-body-bold [&>*]:!lg-text-secondary-700 [&>*]:dark:!tw-text-new-foreground-500-dark [&>*]:dark:hover:!tw-text-primary-500-dark [&>*]:tw-transition-colors [&>*]:tw-duration-200 [&>*]:hover:!lg-text-primary-500 [&>*]:!tw-font-normal dark:tw-bg-new-background-border-500-dark",
            },
            {
                contentId: "9b76016a-c05d-4687-899f-aa6157ebc51c",
                to: "https://www.livguardsolar.com/solar/solculator",
                col: 1,
                desktopClassName:
                    "tw-content-start tw-pl-6 tw-pr-5 tw-pt-4 tw-bg-new-foreground-500-dark dark:tw-bg-new-background-border-500-dark [&>*]:!lg-text-body-bold [&>*]:!lg-text-secondary-700 [&>*]:dark:!tw-text-new-foreground-500-dark [&>*]:dark:hover:!tw-text-primary-500-dark [&>*]:tw-transition-colors [&>*]:tw-duration-200 [&>*]:hover:!lg-text-primary-500 [&>*]:!tw-font-normal dark:tw-bg-new-background-border-500-dark",
            },
            {
                contentId: "454a8070-92b6-419a-af59-6f6253283c07",
                to: "/download-brochures",
                col: 1,
                desktopClassName:
                    "tw-content-start tw-pl-6 tw-pr-5 tw-pt-4 tw-pb-6 tw-bg-new-foreground-500-dark dark:tw-bg-new-background-border-500-dark [&>*]:!lg-text-body-bold [&>*]:!lg-text-secondary-700 [&>*]:dark:!tw-text-new-foreground-500-dark [&>*]:dark:hover:!tw-text-primary-500-dark [&>*]:tw-transition-colors [&>*]:tw-duration-200 [&>*]:hover:!lg-text-primary-500 [&>*]:!tw-font-normal dark:tw-bg-new-background-border-500-dark",
            },
        ],
        desktopClassName: "",
        colCount: 1,
    },
    {
        contentId: "1a1fc6c9-a8b2-4ae7-9154-9999e251449c",
        children: [
            {
                contentId: "96e824a1-876e-42ec-a9b5-2f68fea3a6d3",
                to: "/service",
                col: 1,
                desktopClassName:
                    "tw-content-start tw-pl-6 tw-pr-5 tw-pt-4 tw-bg-new-foreground-500-dark [&>*]:!lg-text-body-bold [&>*]:!lg-text-secondary-700 [&>*]:dark:!tw-text-new-foreground-500-dark [&>*]:dark:hover:!tw-text-primary-500-dark [&>*]:tw-transition-colors [&>*]:tw-duration-200 [&>*]:hover:!lg-text-primary-500 [&>*]:!tw-font-normal dark:tw-bg-new-background-border-500-dark",
            },
            {
                contentId: "4f0455d6-1f64-4f56-9cea-3d1655b10c5c",
                to: "/warranty",
                col: 1,
                desktopClassName:
                    "tw-content-start tw-pl-6 tw-pr-5 tw-pt-4 tw-pb-6 tw-bg-new-foreground-500-dark [&>*]:!lg-text-body-bold [&>*]:!lg-text-secondary-700 [&>*]:dark:!tw-text-new-foreground-500-dark [&>*]:dark:hover:!tw-text-primary-500-dark [&>*]:tw-transition-colors [&>*]:tw-duration-200 [&>*]:hover:!lg-text-primary-500 [&>*]:!tw-font-normal dark:tw-bg-new-background-border-500-dark",
            },
        ],
        desktopClassName: "tw-rounded-b-lg",
        colCount: 1,
    },
    {
        contentId: "86de9899-69e7-4cca-bc82-4f2e9efe405a",
        to: "/dealer-for-inverters-and-batteries",
    },
    {
        contentId: "902ff240-2339-4be5-98f0-741f1162f27f",
        // to: "/about-us",
        children: [
            {
                contentId: "ff7689df-232c-4839-a1ef-2d7fa388c667",
                to: "/about-us",
                col: 1,
                desktopClassName:
                    "tw-content-start tw-pl-6 tw-pr-5 tw-pt-4 tw-bg-new-foreground-500-dark [&>*]:!lg-text-body-bold [&>*]:!lg-text-secondary-700 [&>*]:dark:!tw-text-new-foreground-500-dark [&>*]:dark:hover:!tw-text-primary-500-dark [&>*]:tw-transition-colors [&>*]:tw-duration-200 [&>*]:hover:!lg-text-primary-500 [&>*]:!tw-font-normal dark:tw-bg-new-background-border-500-dark",
            },
            {
                contentId: "96c7b4e3-edf0-4ec8-aa70-67f7ee2ef73a",
                to: "/contact-us",
                col: 1,
                desktopClassName:
                    "tw-content-start tw-pl-6 tw-pr-5 tw-pt-4 tw-bg-new-foreground-500-dark [&>*]:!lg-text-body-bold [&>*]:!lg-text-secondary-700 [&>*]:dark:!tw-text-new-foreground-500-dark [&>*]:dark:hover:!tw-text-primary-500-dark [&>*]:tw-transition-colors [&>*]:tw-duration-200 [&>*]:hover:!lg-text-primary-500 [&>*]:!tw-font-normal dark:tw-bg-new-background-border-500-dark",
            },
            {
                contentId: "0bbd1db5-44c8-4953-8f29-1f58e19dc100",
                to: "/csr",
                col: 1,
                desktopClassName:
                    "tw-content-start tw-pl-6 tw-pr-5 tw-pt-4 tw-bg-new-foreground-500-dark [&>*]:!lg-text-body-bold [&>*]:!lg-text-secondary-700 [&>*]:dark:!tw-text-new-foreground-500-dark [&>*]:dark:hover:!tw-text-primary-500-dark [&>*]:tw-transition-colors [&>*]:tw-duration-200 [&>*]:hover:!lg-text-primary-500 [&>*]:!tw-font-normal dark:tw-bg-new-background-border-500-dark",
            },
            {
                contentId: "4df385d0-992d-4acc-b9d4-06964b6f1e0d",
                to: "/governance",
                col: 1,
                desktopClassName:
                    "tw-content-start tw-pl-6 tw-pr-5 tw-pt-4 tw-bg-new-foreground-500-dark [&>*]:!lg-text-body-bold [&>*]:!lg-text-secondary-700 [&>*]:dark:!tw-text-new-foreground-500-dark [&>*]:dark:hover:!tw-text-primary-500-dark [&>*]:tw-transition-colors [&>*]:tw-duration-200 [&>*]:hover:!lg-text-primary-500 [&>*]:!tw-font-normal dark:tw-bg-new-background-border-500-dark",
            },
            {
                contentId: "89fb5c95-3b83-4a5a-8bc9-aa810d620ee9",
                to: "/investors",
                col: 1,
                desktopClassName:
                    "tw-content-start tw-pl-6 tw-pr-5 tw-pt-4 tw-pb-6 tw-bg-new-foreground-500-dark [&>*]:!lg-text-body-bold [&>*]:!lg-text-secondary-700 [&>*]:dark:!tw-text-new-foreground-500-dark [&>*]:dark:hover:!tw-text-primary-500-dark [&>*]:tw-transition-colors [&>*]:tw-duration-200 [&>*]:hover:!lg-text-primary-500 [&>*]:!tw-font-normal dark:tw-bg-new-background-border-500-dark",
            },
            // {
            //     contentId: "af709c5d-4066-419b-b775-17a43a234c9f",
            //     children: [
            //         {
            //             contentId: "72516e54-5c6d-4723-a2b9-06ed6d3ae2c3",
            //             to: "/events/renewable-energy-india-expo",
            //         },
            //     ],
            //     desktopClassName: "tw-content-start tw-pl-6 tw-pr-5 tw-pt-4 tw-pb-6 tw-bg-new-foreground-500-dark dark:tw-bg-new-background-border-500-dark",
            //     col: 1,
            // },
        ],
        desktopClassName: "tw-rounded-b-lg",
        colCount: 1,
    },
];

function MenuDialogMobile({userPreferences, isMenuOpen, setIsMenuOpen}: {userPreferences: UserPreferences; isMenuOpen: boolean; setIsMenuOpen: React.Dispatch<boolean>}) {
    function tryToCloseMenu() {
        setIsMenuOpen(false);
    }

    return (
        // enter="tw-ease-out tw-transition-all tw-duration-1000"
        // leave="tw-ease-in tw-transition-all "

        <Transition
            show={isMenuOpen}
            as={React.Fragment}
            enter="tw-duration-200"
            enterFrom="tw-opacity-0"
            enterTo="tw-opacity-100"
            leave="tw-duration-200 tw-delay-[200ms]"
            leaveFrom="tw-opacity-100"
            leaveTo="tw-opacity-0"
        >
            <Dialog
                as="div"
                className="tw-fixed tw-inset-0 tw-z-[64] tw-isolate"
                onClose={tryToCloseMenu}
            >
                <div className="tw-absolute tw-inset-0 tw-bg-black tw-bg-opacity-[55%] tw-backdrop-blur -tw-z-10" />

                <Dialog.Panel className="tw-w-full tw-h-full tw-grid tw-grid-cols-[min(80vw,40rem)_1fr]">
                    <Transition.Child
                        as="div"
                        className="tw-col-start-1 tw-w-full tw-rounded-t-lg tw-p-8 tw-grid tw-grid-rows-[20.75rem_2rem_minmax(0,13.75rem)_3rem] tw-justify-items-center lg-bg-new-background-500 tw-overflow-y-auto tw-relative tw-duration-200"
                        enterFrom="-tw-translate-x-full"
                        enterTo="tw-translate-x-0"
                        leaveFrom="tw-translate-x-0"
                        leaveTo="-tw-translate-x-full"
                    >
                        <div className="tw-w-full tw-h-full tw-flex tw-flex-col tw-items-stretch">
                            <div className="tw-grid tw-grid-cols-[2rem_minmax(0,1fr)_auto_minmax(0,1fr)_2rem] tw-items-center tw-pt-6 tw-pb-4">
                                <img
                                    src={
                                        userPreferences.theme == Theme.Dark
                                            ? "https://files.growthjockey.com/livguard/icons/logo-dark.svg"
                                            : "https://files.growthjockey.com/livguard/icons/logo-light.svg"
                                    }
                                    width={385}
                                    height={96}
                                    className="tw-col-start-3 tw-w-auto tw-h-6"
                                    key={
                                        userPreferences.theme == Theme.Dark
                                            ? "https://files.growthjockey.com/livguard/icons/logo-dark.svg"
                                            : "https://files.growthjockey.com/livguard/icons/logo-light.svg"
                                    }
                                />

                                <button
                                    type="button"
                                    className="tw-col-start-5 tw-relative tw-bottom-6"
                                >
                                    <X
                                        className="tw-w-8 tw-h-8 tw-opacity-50"
                                        onClick={tryToCloseMenu}
                                    />
                                </button>
                            </div>

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
                                //         <div className="tw-flex-1 lg-text-title2">{contentData.getContent(item.linkTextTextContentPiece)}</div>
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
                    </Transition.Child>

                    <div
                        className="tw-col-start-2 tw-w-full tw-h-full"
                        onClick={tryToCloseMenu}
                    />
                </Dialog.Panel>
            </Dialog>
        </Transition>
    );
}

function MenuDialogDesktop({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const [showMenu, setShowMenu] = useState<number | null>(null);
    const contentData = useContext(ContentProviderContext);

    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-flex tw-gap-x-6 tw-items-center tw-text-[0.875rem]", className)}>
            <ItemBuilder
                items={headerMenuItems}
                itemBuilder={
                    (item, itemIndex) =>
                        item.to != null ? (
                            <Link
                                to={item.to}
                                className={concatenateNonNullStringsWithSpaces(
                                    "tw-duration-200 hover:lg-text-primary-500 tw-whitespace-nowrap",
                                    item.desktopClassName == null ? undefined : item.desktopClassName,
                                )}
                                key={itemIndex}
                                onMouseEnter={() => setShowMenu(null)}
                            >
                                {contentData.getContent(item.contentId)}
                            </Link>
                        ) : (
                            <div
                                // tw-h-6
                                className="tw-relative"
                                key={itemIndex}
                            >
                                <div>
                                    <>
                                        <button
                                            // tw-pb-6
                                            className="tw-group tw-duration-200 hover:lg-text-primary-500 tw-whitespace-nowrap tw-relative"
                                            onMouseEnter={() => setShowMenu(itemIndex)}
                                            // TODO: Add onMouseLeave here as well
                                            // onMouseLeave={() => setShowMenu(null)}
                                        >
                                            {contentData.getContent(item.contentId)}
                                            <div
                                                className={concatenateNonNullStringsWithSpaces(
                                                    "tw-absolute tw-inset-x-0 tw-h-1 -tw-bottom-[1.3125rem] lg-bg-primary-500 tw-duration-200",
                                                    showMenu === itemIndex ? "tw-opacity-100" : "tw-opacity-0",
                                                )}
                                            />
                                        </button>

                                        {/* TODO: Add relative to Popver and specify a smaller top instead */}
                                        {/* tw-top-14 */}
                                        {/* Final width: 768px = 48rem */}
                                        {showMenu == null
                                            ? null
                                            : showMenu === itemIndex && (
                                                  <div
                                                      onMouseLeave={() => setShowMenu(null)}
                                                      className="tw-grid tw-grid-flow-col tw-auto-cols-max tw-absolute tw-left-0 tw-top-[2.75rem] tw-rounded-b-lg tw-overflow-hidden"
                                                  >
                                                      {getIntegerArrayOfLength(item.colCount).map((_, currentColumnIndex) => (
                                                          <div
                                                              //   style={{
                                                              //       gridTemplateColumns: `repeat(${item.columnCount}, minmax(0,1fr))`,
                                                              //   }}
                                                              className={concatenateNonNullStringsWithSpaces(
                                                                  "tw-mt-1 xl:tw-mt-2 tw-w-fit tw-h-full tw-left-0 xl:tw-top-10 xl:tw-left-0 tw-overflow-hidden lg-bg-background-500 tw-items-start tw-text-left",
                                                                  item.desktopClassName == null ? undefined : item.desktopClassName,
                                                              )}
                                                              key={currentColumnIndex}
                                                          >
                                                              <ItemBuilder
                                                                  key={currentColumnIndex}
                                                                  items={item.children.filter((child) => child.col == currentColumnIndex + 1)}
                                                                  itemBuilder={(item, itemIndex) =>
                                                                      item.to != null && item.iconRelativePath == null ? (
                                                                          <div
                                                                              className={item.desktopClassName}
                                                                              key={itemIndex}
                                                                          >
                                                                              {item.to.startsWith("http") ? (
                                                                                  <a
                                                                                      href={item.to}
                                                                                      className="lg-text-title2 lg-text-primary-500 tw-w-fit tw-flex tw-items-center"
                                                                                  >
                                                                                      {contentData.getContent(item.contentId)}
                                                                                      <span>
                                                                                          <ChevronRightIcon className="tw-h-4 tw-w-4" />
                                                                                      </span>
                                                                                  </a>
                                                                              ) : (
                                                                                  <Link
                                                                                      to={item.to}
                                                                                      className="lg-text-title2 lg-text-primary-500 tw-w-fit tw-flex tw-items-center"
                                                                                  >
                                                                                      {contentData.getContent(item.contentId)}
                                                                                      <span>
                                                                                          <ChevronRightIcon className="tw-h-4 tw-w-4" />
                                                                                      </span>
                                                                                  </Link>
                                                                              )}
                                                                          </div>
                                                                      ) : item.to != null && item.iconRelativePath != null ? (
                                                                          <div
                                                                              className={item.desktopClassName}
                                                                              key={itemIndex}
                                                                          >
                                                                              <Link
                                                                                  to={item.to}
                                                                                  className="lg-text-title2 lg-text-primary-500 tw-text-center tw-w-fit tw-grid tw-grid-cols-1 tw-justify-items-center tw-gap-y-1 tw-mx-auto"
                                                                              >
                                                                                  <FixedWidthImage
                                                                                      relativePath={item.iconRelativePath}
                                                                                      width="4rem"
                                                                                  />

                                                                                  {contentData.getContent(item.contentId)}
                                                                              </Link>
                                                                          </div>
                                                                      ) : (
                                                                          <div
                                                                              className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-cols-1 tw-gap-y-2", item.desktopClassName)}
                                                                              key={itemIndex}
                                                                          >
                                                                              <div className="lg-text-body-bold lg-text-primary-500 tw-pb-2">{contentData.getContent(item.contentId)}</div>

                                                                              <ItemBuilder
                                                                                  items={item.children}
                                                                                  itemBuilder={(item, itemIndex) =>
                                                                                      item.to != null ? (
                                                                                          item.to.startsWith("http") ? (
                                                                                              <a
                                                                                                  href={item.to}
                                                                                                  className="lg-text-body dark:!tw-text-new-background-border-500-light hover:lg-text-primary-500 hover:dark:!tw-text-primary-500-dark tw-transition-colors tw-duration-200 tw-flex tw-items-center"
                                                                                                  key={itemIndex}
                                                                                              >
                                                                                                  {contentData.getContent(item.contentId)}
                                                                                                  <span>
                                                                                                      <ChevronRightIcon className="tw-h-4 tw-w-4" />
                                                                                                  </span>
                                                                                              </a>
                                                                                          ) : (
                                                                                              <Link
                                                                                                  to={item.to}
                                                                                                  className="lg-text-body dark:!tw-text-new-background-border-500-light hover:lg-text-primary-500 hover:dark:!tw-text-primary-500-dark tw-transition-colors tw-duration-200 tw-flex tw-items-center"
                                                                                                  key={itemIndex}
                                                                                              >
                                                                                                  {contentData.getContent(item.contentId)}
                                                                                                  <span>
                                                                                                      <ChevronRightIcon className="tw-h-4 tw-w-4" />
                                                                                                  </span>
                                                                                              </Link>
                                                                                          )
                                                                                      ) : (
                                                                                          <>
                                                                                              <div
                                                                                                  className="lg-text-body-bold"
                                                                                                  key={itemIndex}
                                                                                              >
                                                                                                  {contentData.getContent(item.contentId)}
                                                                                              </div>

                                                                                              <ItemBuilder
                                                                                                  items={item.children}
                                                                                                  itemBuilder={(item, itemIndex) =>
                                                                                                      item.to != null ? (
                                                                                                          <Link
                                                                                                              to={item.to}
                                                                                                              className="hover:lg-text-primary-500"
                                                                                                              key={itemIndex}
                                                                                                          >
                                                                                                              {contentData.getContent(item.contentId)}
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
                                                          </div>
                                                      ))}
                                                  </div>
                                              )}
                                    </>
                                </div>
                            </div>
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
                className="tw-relative tw-z-[65]"
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

    const contentData = useContext(ContentProviderContext);

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
                        <div className="tw-w-full lg-card lg-bg-secondary-100 tw-px-6 tw-py-6 tw-rounded-lg tw-flex tw-flex-col">
                            <div className="tw-grid tw-grid-cols-[1.5rem_minmax(0,1fr)_1.5rem]">
                                <div className="tw-row-start-1 tw-col-start-2 tw-w-full tw-text-center lg-text-headline">{contentData.getContent("headerContactUsDialogT1")}</div>
                                <button
                                    type="button"
                                    onClick={tryToCloseContactUsDialog}
                                    className="tw-row-start-1 tw-col-start-3"
                                >
                                    <X className="tw-w-6 tw-h-6" />
                                </button>
                            </div>

                            <VerticalSpacer className="tw-h-4" />

                            <div className="lg-text-title2">{contentData.getContent("headerContactUsDialogT3")}</div>

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

                            <div className="lg-text-title2">{contentData.getContent("headerContactUsDialogT2")}</div>

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
    const contentData = useContext(ContentProviderContext);
    return (
        <Disclosure>
            {({open}) => (
                <>
                    {/* , open ? "tw-bg-[#ed74741c]" : null)} */}
                    <Disclosure.Button className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-cols-[minmax(0,1fr)_1.5rem] tw-items-center", indentationLevel == 0 ? "tw-py-4" : "tw-py-2")}>
                        <div
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-text-left",
                                open ? "lg-text-primary-500 dark:!tw-text-primary-500-dark" : "dark:!tw-text-new-foreground-500-dark",
                                indentationLevel == 0 ? "lg-text-title2" : "lg-text-body-bold",
                            )}
                            style={{
                                paddingLeft: indentationLevel * headerMobileItemIndentation,
                            }}
                        >
                            {contentData.getContent(headerItemAccordion.contentId)}
                        </div>
                        <div className={concatenateNonNullStringsWithSpaces("tw-w-6 tw-h-6 tw-grid tw-place-items-center tw-duration-200", open ? "tw-rotate-90 lg-text-primary-500" : null)}>
                            <ChevronRightIcon
                                // className={concatenateNonNullStringsWithSpaces(indentationLevel == 0 ? "tw-w-6 tw-h-6" : "tw-w-4 tw-h-4")}
                                className="tw-w-6 tw-h-6"
                            />
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

                    {indentationLevel != 0 ? null : <div className="tw-h-px lg-bg-secondary-900 tw-opacity-50 tw-flex-none" />}
                </>
            )}
        </Disclosure>
    );
}

function HeaderItemLinkMobileComponent({headerItemLink, userPreferences, indentationLevel}: {headerItemLink: HeaderItemLink; userPreferences: UserPreferences; indentationLevel: number}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <>
            {/* item.to.startsWith("/") */}
            <a
                href={headerItemLink.to}
                className={concatenateNonNullStringsWithSpaces(indentationLevel == 0 ? "lg-text-title2 tw-py-4" : "lg-text-body-bold dark:!tw-text-new-foreground-500-dark tw-py-2")}
                style={{
                    paddingLeft: indentationLevel * headerMobileItemIndentation,
                }}
            >
                {contentData.getContent(headerItemLink.contentId)}
            </a>

            {indentationLevel != 0 ? null : <div className="tw-h-px lg-bg-secondary-900 tw-opacity-50 tw-flex-none" />}
        </>
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
    const contentData = useContext(ContentProviderContext);
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
                            {contentData.getContent(headerItemAccordion.contentId)}
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
    const contentData = useContext(ContentProviderContext);
    return (
        // item.to.startsWith("/")
        <Link
            to={headerItemLink.to}
            className="lg-text-title2"
            style={{
                paddingLeft: indentationLevel * headerMobileItemIndentation,
            }}
        >
            {contentData.getContent(headerItemLink.contentId)}
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
