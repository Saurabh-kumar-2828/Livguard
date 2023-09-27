import {Listbox} from "@headlessui/react";
import {Form, Link, useSubmit} from "@remix-run/react";
import React, {useEffect, useRef, useState} from "react";
import {BrightnessHighFill, Check2, ChevronDown, MoonStarsFill} from "react-bootstrap-icons";
import {HorizontalSpacer} from "~/global-common-typescript/components/horizontalSpacer";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {ImageCdnProvider} from "~/global-common-typescript/typeDefinitions";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import type {UserPreferences} from "~/typeDefinitions";
import {Language, Theme, themeToHumanFriendlyString} from "~/typeDefinitions";
import {getMetadataForImage} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";

export function InternationalBusinessHeaderComponent({userPreferences, redirectTo, pageUrl}: {userPreferences: UserPreferences; redirectTo: string; pageUrl?: string}) {
    const submit = useSubmit();

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
                    <div className="tw-hidden lg:tw-flex tw-flex-row tw-items-center lg:tw-text-[13px] xl:tw-text-[16px]">
                        {getVernacularString("bf76b096-bc3b-4739-827f-71fa327931d6", userPreferences.language)}
                        <HorizontalSpacer className="tw-w-1" />
                        <a href="tel:+9611700921">+961-1-700921</a>
                    </div>

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
                                {selectedLanguage == Language.English ? "EN" : "AR"}
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
                                                    <div>{item == Language.English ? "English" : "عربي"}</div>
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
                    <Link to="/">
                        <img
                            src={
                                userPreferences.theme == Theme.Dark
                                    ? getAbsolutePathForRelativePath(getMetadataForImage("/livguard/international/header/logo-light.svg").finalUrl, ImageCdnProvider.Bunny, null, null)
                                    : getAbsolutePathForRelativePath(getMetadataForImage("/livguard/international/header/logo-dark.svg").finalUrl, ImageCdnProvider.Bunny, null, null)
                            }
                            width={385}
                            height={96}
                            alt="Livguard logo"
                            className="tw-w-auto tw-h-6"
                        />
                    </Link>

                    <div className="tw-flex-1" />
                </div>
            </div>
        </>
    );
}
