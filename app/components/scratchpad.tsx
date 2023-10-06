import {Combobox, Transition} from "@headlessui/react";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/20/solid";
import {Link} from "@remix-run/react";
import React, {MouseEventHandler, useState} from "react";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ImageCdnProvider} from "~/global-common-typescript/typeDefinitions";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {UserPreferences} from "~/typeDefinitions";
import {getMetadataForImage} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";

export function FancySearchableSelect<T>({
    items,
    selectedItem,
    setSelectedItem,
    filterFunction,
    renderFunction,
    placeholder,
    className,
    disabled,
    inputClassName,
}: {
    items: Array<T>;
    selectedItem: T | null;
    setSelectedItem: React.Dispatch<T | null>;
    filterFunction: (items: Array<T>, query: string) => Array<T>;
    renderFunction: (item: T) => string;
    placeholder: string;
    className?: string;
    disabled?: boolean;
    inputClassName?: string;
}) {
    const [query, setQuery] = useState("");
    // const [isOpen, setIsOpen] = useState(false);

    const filteredItems = query == "" ? items : filterFunction(items, query);

    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full", className)}>
            <Combobox
                value={selectedItem}
                onChange={setSelectedItem}
                disabled={disabled}
            >
                <div className="tw-relative">
                    <div className="tw-grid tw-grid-cols-[minmax(0,1fr)_2.875rem]">
                        <Combobox.Input
                            className={concatenateNonNullStringsWithSpaces("tw-row-start-1 tw-col-start-1 tw-col-span-2 lg-text-input tw-w-full", inputClassName)}
                            displayValue={renderFunction}
                            placeholder={placeholder}
                            onChange={(event) => {
                                setQuery(event.target.value);
                                // setIsOpen(true);
                            }}
                            // onFocus={() => {
                            //     setIsOpen(true);
                            // }}
                            // onBlur={() => {
                            //     setIsOpen(false);
                            // }}
                        />

                        <Combobox.Button className="tw-row-start-1 tw-col-start-2 tw-grid tw-place-items-center">
                            <ChevronUpDownIcon className="tw-h-4 tw-w-4" />
                        </Combobox.Button>
                    </div>

                    <Transition
                        as={React.Fragment}
                        leave="tw-transition tw-ease-in tw-duration-100"
                        leaveFrom="tw-opacity-100"
                        leaveTo="tw-opacity-0"
                        afterLeave={() => setQuery("")}
                    >
                        <Combobox.Options
                            // static={isOpen}
                            className="tw-absolute tw-z-40 tw-mt-1 tw-max-h-60 tw-w-full tw-overflow-auto tw-rounded-md tw-bg-white tw-py-1 tw-text-base tw-shadow-lg tw-ring-1 tw-ring-black tw-ring-opacity-5 focus:tw-outline-none sm:tw-text-sm"
                        >
                            {items.length == 0 ? (
                                <div className="tw-relative tw-cursor-default tw-select-none tw-py-2 tw-px-4 tw-text-gray-700">No results</div>
                            ) : filteredItems.length == 0 && query != "" ? (
                                <div className="tw-relative tw-cursor-default tw-select-none tw-py-2 tw-px-4 tw-text-gray-700">Nothing found</div>
                            ) : (
                                filteredItems.map((item, itemIndex) => (
                                    <Combobox.Option
                                        key={itemIndex}
                                        className={({active}) =>
                                            `tw-relative tw-cursor-default tw-select-none tw-py-2 tw-pl-10 tw-pr-4 ${active ? "tw-bg-primary-500-light tw-text-white" : "tw-text-gray-900"}`
                                        }
                                        value={item}
                                    >
                                        {({selected, active}) => (
                                            <>
                                                <span className={`tw-block tw-truncate ${selected ? "tw-font-medium" : "tw-font-normal"}`}>{renderFunction(item)}</span>
                                                {selected ? (
                                                    <span className={`tw-absolute tw-inset-y-0 tw-left-0 tw-flex tw-items-center tw-pl-3 ${active ? "tw-text-white" : "tw-text-primary-500-light"}`}>
                                                        <CheckIcon
                                                            className="tw-h-5 tw-w-5"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    );

    // const {isOpen, getToggleButtonProps, getMenuProps, getInputProps, getComboboxProps, highlightedIndex, getItemProps, openMenu, closeMenu, selectItem, selectedItem, setHighlightedIndex, reset} =
    //     useCombobox({
    //         items: options,
    //         onInputValueChange: ({inputValue}) => {
    //             const firstMatchIndex = options.findIndex((option) => option.label.toLowerCase().startsWith(inputValue.toLowerCase()));
    //             if (firstMatchIndex != -1) {
    //                 setHighlightedIndex(firstMatchIndex);
    //             }
    //         },
    //         onSelectedItemChange: ({selectedItem}) => {
    //             props.onChange(selectedItem);
    //             closeMenu();
    //             setOptions([selectedItem].concat(inputOptions.filter((option) => option.value != selectedItem.value)));
    //         },
    //         itemToString: (option) => option.label,
    //     });

    // props.datastore.highlightValueInCombobox = (item: string) => {
    //     const option = inputOptions.find((option) => option.label.toLowerCase().startsWith(item.toLowerCase()));
    //     if (option != null) {
    //         selectItem(option);
    //     }
    // };

    // return (
    //     <div className={props.className}>
    //         <div
    //             className="tw-w-full tw-flex tw-flex-row"
    //             {...getComboboxProps()}
    //         >
    //             <input
    //                 className={concatenateNonNullStringsWithSpaces(
    //                     "tw-flex-grow tw-p-4 tw-placeholder-textMuted tw-text-black tw-outline-none tw-rounded-tl-md tw-transition-200",
    //                     !isOpen ? "tw-rounded-bl-md" : null,
    //                 )}
    //                 placeholder="Please Select Your City"
    //                 onFocus={() => openMenu()}
    //                 onClick={() => openMenu()}
    //                 {...getInputProps()}
    //             />
    //             <button
    //                 className={concatenateNonNullStringsWithSpaces("tw-p-4 tw-rounded-tr-md tw-bg-white tw-text-black", !isOpen ? "tw-rounded-br-md" : null)}
    //                 {...getToggleButtonProps()}
    //             >
    //                 <ChevronDown className={concatenateNonNullStringsWithSpaces("tw-w-4 tw-h-4 tw-duration-200")} />
    //             </button>
    //         </div>

    //         {/* <div className="" */}
    //         <ul
    //             className="tw-absolute tw-z-10 tw-w-80 tw-max-h-60 tw-overflow-y-auto"
    //             {...getMenuProps()}
    //         >
    //             {isOpen &&
    //                 options.map((option, optionIndex) => (
    //                     <li
    //                         className={concatenateNonNullStringsWithSpaces(
    //                             "tw-flex tw-flex-row tw-items-center tw-p-4 tw-text-black",
    //                             highlightedIndex == optionIndex ? "tw-bg-primaryLight" : "tw-bg-white",
    //                             selectedItem?.value == option.value ? "tw-sticky tw-top-0" : null,
    //                         )}
    //                         key={optionIndex}
    //                         {...getItemProps({
    //                             item: option,
    //                             index: optionIndex,
    //                         })}
    //                     >
    //                         <div className="tw-flex-grow tw-text-left">{option.label}</div>
    //                         <RecordCircle className={concatenateNonNullStringsWithSpaces("tw-w-4 tw-h-4", selectedItem?.value == option.value ? "tw-text-primary" : "tw-text-textMuted")} />
    //                     </li>
    //                 ))}
    //         </ul>
    //     </div>
    // );
}

export function SearchableSelect<T>({
    items,
    selectedItem,
    setSelectedItem,
    filterFunction,
    renderFunction,
    placeholder,
    className,
    disabled,
    inputClassName,
}: {
    items: Array<T>;
    selectedItem: T | null;
    setSelectedItem: React.Dispatch<T | null>;
    filterFunction: (items: Array<T>, query: string) => Array<T>;
    renderFunction: (item: T) => string;
    placeholder: string;
    className?: string;
    disabled?: boolean;
    inputClassName?: string;
}) {
    const [query, setQuery] = useState("");
    // const [isOpen, setIsOpen] = useState(false);

    const allItems = query == "" ? items : filterFunction(items, query);
    const filteredItems = allItems.slice(0, 200);

    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full", className)}>
            <Combobox
                value={selectedItem}
                onChange={setSelectedItem}
                disabled={disabled}
            >
                <div className="tw-relative">
                    <div className="tw-grid tw-grid-cols-[minmax(0,1fr)_2.875rem]">
                        <Combobox.Input
                            className={concatenateNonNullStringsWithSpaces("tw-row-start-1 tw-col-start-1 tw-col-span-2 lg-text-input tw-w-full", inputClassName)}
                            displayValue={renderFunction}
                            placeholder={placeholder}
                            onChange={(event) => {
                                setQuery(event.target.value);
                                // setIsOpen(true);
                            }}
                            // onFocus={() => {
                            //     setIsOpen(true);
                            // }}
                            // onBlur={() => {
                            //     setIsOpen(false);
                            // }}
                        />

                        <Combobox.Button className="tw-row-start-1 tw-col-start-2 tw-grid tw-place-items-center">
                            <ChevronUpDownIcon className="tw-h-4 tw-w-4" />
                        </Combobox.Button>
                    </div>

                    <Transition
                        as={React.Fragment}
                        leave="tw-transition tw-ease-in tw-duration-100"
                        leaveFrom="tw-opacity-100"
                        leaveTo="tw-opacity-0"
                        afterLeave={() => setQuery("")}
                    >
                        <Combobox.Options
                            // static={isOpen}
                            className="tw-absolute tw-z-40 tw-mt-1 tw-max-h-60 tw-w-full tw-overflow-auto tw-rounded-md tw-bg-white tw-py-1 tw-text-base tw-shadow-lg tw-ring-1 tw-ring-black tw-ring-opacity-5 focus:tw-outline-none sm:tw-text-sm"
                        >
                            {items.length == 0 ? (
                                <div className="tw-relative tw-cursor-default tw-select-none tw-py-2 tw-px-4 tw-text-gray-700">No results</div>
                            ) : filteredItems.length == 0 && query != "" ? (
                                <div className="tw-relative tw-cursor-default tw-select-none tw-py-2 tw-px-4 tw-text-gray-700">Nothing found</div>
                            ) : (
                                filteredItems.map((item, itemIndex) => (
                                    <Combobox.Option
                                        key={itemIndex}
                                        className={({active}) =>
                                            `tw-relative tw-cursor-default tw-select-none tw-py-2 tw-pl-10 tw-pr-4 ${active ? "tw-bg-primary-500-light tw-text-white" : "tw-text-gray-900"}`
                                        }
                                        value={item}
                                    >
                                        {({selected, active}) => (
                                            <>
                                                <span className={`tw-block tw-truncate ${selected ? "tw-font-medium" : "tw-font-normal"}`}>{renderFunction(item)}</span>
                                                {selected ? (
                                                    <span className={`tw-absolute tw-inset-y-0 tw-left-0 tw-flex tw-items-center tw-pl-3 ${active ? "tw-text-white" : "tw-text-primary-500-light"}`}>
                                                        <CheckIcon
                                                            className="tw-h-5 tw-w-5"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    );

    // const {isOpen, getToggleButtonProps, getMenuProps, getInputProps, getComboboxProps, highlightedIndex, getItemProps, openMenu, closeMenu, selectItem, selectedItem, setHighlightedIndex, reset} =
    //     useCombobox({
    //         items: options,
    //         onInputValueChange: ({inputValue}) => {
    //             const firstMatchIndex = options.findIndex((option) => option.label.toLowerCase().startsWith(inputValue.toLowerCase()));
    //             if (firstMatchIndex != -1) {
    //                 setHighlightedIndex(firstMatchIndex);
    //             }
    //         },
    //         onSelectedItemChange: ({selectedItem}) => {
    //             props.onChange(selectedItem);
    //             closeMenu();
    //             setOptions([selectedItem].concat(inputOptions.filter((option) => option.value != selectedItem.value)));
    //         },
    //         itemToString: (option) => option.label,
    //     });

    // props.datastore.highlightValueInCombobox = (item: string) => {
    //     const option = inputOptions.find((option) => option.label.toLowerCase().startsWith(item.toLowerCase()));
    //     if (option != null) {
    //         selectItem(option);
    //     }
    // };

    // return (
    //     <div className={props.className}>
    //         <div
    //             className="tw-w-full tw-flex tw-flex-row"
    //             {...getComboboxProps()}
    //         >
    //             <input
    //                 className={concatenateNonNullStringsWithSpaces(
    //                     "tw-flex-grow tw-p-4 tw-placeholder-textMuted tw-text-black tw-outline-none tw-rounded-tl-md tw-transition-200",
    //                     !isOpen ? "tw-rounded-bl-md" : null,
    //                 )}
    //                 placeholder="Please Select Your City"
    //                 onFocus={() => openMenu()}
    //                 onClick={() => openMenu()}
    //                 {...getInputProps()}
    //             />
    //             <button
    //                 className={concatenateNonNullStringsWithSpaces("tw-p-4 tw-rounded-tr-md tw-bg-white tw-text-black", !isOpen ? "tw-rounded-br-md" : null)}
    //                 {...getToggleButtonProps()}
    //             >
    //                 <ChevronDown className={concatenateNonNullStringsWithSpaces("tw-w-4 tw-h-4 tw-duration-200")} />
    //             </button>
    //         </div>

    //         {/* <div className="" */}
    //         <ul
    //             className="tw-absolute tw-z-10 tw-w-80 tw-max-h-60 tw-overflow-y-auto"
    //             {...getMenuProps()}
    //         >
    //             {isOpen &&
    //                 options.map((option, optionIndex) => (
    //                     <li
    //                         className={concatenateNonNullStringsWithSpaces(
    //                             "tw-flex tw-flex-row tw-items-center tw-p-4 tw-text-black",
    //                             highlightedIndex == optionIndex ? "tw-bg-primaryLight" : "tw-bg-white",
    //                             selectedItem?.value == option.value ? "tw-sticky tw-top-0" : null,
    //                         )}
    //                         key={optionIndex}
    //                         {...getItemProps({
    //                             item: option,
    //                             index: optionIndex,
    //                         })}
    //                     >
    //                         <div className="tw-flex-grow tw-text-left">{option.label}</div>
    //                         <RecordCircle className={concatenateNonNullStringsWithSpaces("tw-w-4 tw-h-4", selectedItem?.value == option.value ? "tw-text-primary" : "tw-text-textMuted")} />
    //                     </li>
    //                 ))}
    //         </ul>
    //     </div>
    // );
}

export function ChipButtonWithText({
    isSelected,
    onClick,
    contentId,
    userPreferences,
    className,
}: {
    isSelected: boolean;
    onClick: () => void;
    contentId: string;
    userPreferences: UserPreferences;
    className?: string;
}) {
    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "tw-grid tw-grid-cols-1 tw-place-items-center lg-card tw-rounded-lg tw-px-4 tw-py-2 tw-duration-200 tw-cursor-pointer tw-w-max",
                isSelected ? "lg-bg-primary-500" : "lg-bg-secondary-100",
                className,
            )}
            onClick={onClick}
        >
            <div
                className={concatenateNonNullStringsWithSpaces("tw-whitespace-nowrap", isSelected ? "!tw-text-secondary-900-dark" : "lg-text-secondary-900")}
                dangerouslySetInnerHTML={{__html: getVernacularString(contentId, userPreferences.language)}}
            />
        </div>
    );
}

// TODO: Rename to ChipButtonWithIconAndText
export function ButtonWithIconAndText({
    isSelected,
    iconRelativePath,
    onClick,
    contentId,
    userPreferences,
}: {
    isSelected: boolean;
    iconRelativePath: string;
    onClick: () => void;
    contentId: string;
    userPreferences: UserPreferences;
}) {
    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "lg-card tw-grid tw-grid-cols-[1rem_auto_0.5rem_auto_minmax(1rem,1fr)] tw-place-items-center tw-rounded-lg tw-py-2 tw-transition-colors tw-duration-200 tw-cursor-pointer",
                isSelected ? "lg-bg-primary-500" : "lg-bg-secondary-100",
            )}
            onClick={onClick}
        >
            <div
                className={concatenateNonNullStringsWithSpaces(
                    "tw-col-start-2 tw-w-[2rem] tw-h-[2rem] tw-rounded-full tw-flex tw-flex-row tw-justify-center tw-items-center lg-card",
                    isSelected ? "!tw-bg-secondary-100-light" : null,
                )}
            >
                <img
                    className={isSelected ? "tw-brightness-0" : ""}
                    src={iconRelativePath}
                />
            </div>

            <div
                className={`tw-col-start-4 ${isSelected ? "!tw-text-secondary-900-dark" : "lg-text-secondary-900"}`}
                dangerouslySetInnerHTML={{__html: getVernacularString(contentId, userPreferences.language)}}
            />
        </div>
    );
}

export function CtaButtonLink({
    userPreferences,
    to,
    target,
    textVernacId,
    buttonClassName,
    linkClassName,
    linkContainerClassName,
}: {
    userPreferences: UserPreferences;
    to: string;
    target?: boolean;
    textVernacId: string;
    buttonClassName?: string;
    linkClassName?: string;
    linkContainerClassName?: string;
}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-overflow-hidden", linkContainerClassName)}>
            <Link
                className={concatenateNonNullStringsWithSpaces(
                    "tw-overflow-hidden tw-h-[calc(100%+2px)] tw-w-[calc(100%+2px)] lg-cta-button !tw-px-2 tw-text-center tw-relative tw-group tw-transition tw-duration-300 hover:tw-border-1 tw-h-full tw-grid tw-place-items-center tw-box-border",
                    linkClassName,
                )}
                to={to}
                target={target == null || !target ? "_self" : "_blank"}
            >
                <div className="tw-absolute tw-h-[calc(100%+2px)] tw-w-[calc(100%+2px)] -tw-left-[1px] tw-top-0 tw-rounded-full tw-inset-0 tw-m-auto tw-transition-opacity tw-ease-in tw-duration-300 tw-opacity-0 group-hover:tw-opacity-100 lg-cta-button-gradient"></div>
                <button
                    className={concatenateNonNullStringsWithSpaces("tw-text-center tw-relative tw-duration-300 group-hover:tw-text-secondary-900-dark tw-grid tw-place-items-center", buttonClassName)}
                    dangerouslySetInnerHTML={{__html: getVernacularString(textVernacId, userPreferences.language)}}
                />
            </Link>
        </div>
    );
}

export function CtaButton({
    userPreferences,
    onClick,
    textVernacId,
    buttonClassName,
    buttonContainerClassName,
    mainContainerClassName,
    disabled,
    type,
}: {
    userPreferences: UserPreferences;
    onClick: MouseEventHandler;
    textVernacId: string;
    buttonClassName?: string;
    buttonContainerClassName?: string;
    mainContainerClassName?: string;
    disabled?: boolean;
    type?: "button" | "reset" | "submit";
}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-overflow-hidden", mainContainerClassName)}>
            <div className="tw-overflow-hidden tw-h-[calc(100%+2px)] tw-w-[calc(100%+2px)]">
                <div
                    className={concatenateNonNullStringsWithSpaces(
                        "tw-overflow-hidden lg-cta-button tw-text-center tw-relative tw-group tw-transition tw-duration-300 tw-grid tw-h-full tw-place-items-center tw-box-border",
                        buttonContainerClassName,
                    )}
                >
                    <div className="tw-absolute tw-h-[calc(100%+2px)] tw-w-[calc(100%+2px)] -tw-left-[1px] tw-top-[-1px] tw-rounded-full tw-inset-0 tw-m-auto -tw-translate-x-full group-hover:tw-translate-x-0 tw-ease-in tw-duration-300 lg-cta-button-gradient"></div>
                    <button
                        type={type == null ? undefined : type}
                        onClick={onClick}
                        className={concatenateNonNullStringsWithSpaces(
                            "tw-text-center tw-relative tw-duration-300 group-hover:tw-text-secondary-900-dark tw-grid tw-place-items-center",
                            buttonClassName,
                        )}
                        disabled={disabled}
                    >
                        {getVernacularString(textVernacId, userPreferences.language)}
                    </button>
                </div>
            </div>
        </div>
    );
}

export function CtaOutlineButtonLink({
    userPreferences,
    to,
    target,
    textVernacId,
    buttonClassName,
    linkClassName,
    linkContainerClassName,
    imgPath,
    download,
}: {
    userPreferences: UserPreferences;
    to: string;
    target?: boolean;
    textVernacId: string;
    buttonClassName?: string;
    linkClassName?: string;
    linkContainerClassName?: string;
    imgPath?: string;
    download?: boolean;
}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-overflow-hidden tw-relative tw-rounded-full", linkContainerClassName)}>
            <Link
                className={concatenateNonNullStringsWithSpaces(
                    "lg-cta-outline-button tw-text-center tw-relative tw-group tw-transition tw-duration-300 hover:tw-border-1tw-h-full tw-grid tw-place-items-center",
                    linkClassName,
                )}
                to={to}
                target={target == null || !target ? "_self" : "_blank"}
                download={download ? true : false}
            >
                <div className="tw-absolute tw-h-[calc(100%+2px)] tw-w-[calc(100%+2px)] -tw-left-[1px] tw-top-0 tw-rounded-full tw-inset-0 tw-m-auto tw-opacity-0 group-hover:tw-opacity-100 tw-ease-in tw-duration-300 lg-cta-button-gradient"></div>
                <div className="tw-flex tw-gap-2 tw-justify-center tw-items-center">
                    {imgPath && (
                        <img
                            className="tw-row-start-1 tw-col-start-1 tw-h-4 tw-w-4 lg:tw-h-6 lg:tw-w-6 tw-place-self-center tw-transition-colors tw-duration-200 group-hover:tw-brightness-0 group-hover:tw-invert"
                            src={getAbsolutePathForRelativePath(getMetadataForImage(imgPath).finalUrl, ImageCdnProvider.Bunny, null, null)}
                            alt="icon"
                        />
                    )}
                    <button
                        className={concatenateNonNullStringsWithSpaces(
                            "tw-text-center tw-relative tw-duration-300 group-hover:tw-text-secondary-900-dark tw-grid tw-place-items-center",
                            buttonClassName,
                            imgPath ? "tw-text-secondary-300-dark" : "",
                        )}
                    >
                        {getVernacularString(textVernacId, userPreferences.language)}
                    </button>
                </div>
            </Link>
        </div>
    );
}

/**
 * The className hierarchy goes as follows - div.mainContainerClassName > div.buttonContainerClassName > button.buttonClassName
 */
export function CtaOutlineButton({
    userPreferences,
    onClick,
    textVernacId,
    buttonClassName,
    buttonContainerClassName,
    mainContainerClassName,
    disabled,
    type,
}: {
    userPreferences: UserPreferences;
    onClick: MouseEventHandler;
    textVernacId: string;
    buttonClassName?: string;
    buttonContainerClassName?: string;
    mainContainerClassName?: string;
    disabled?: boolean;
    type?: "button" | "reset" | "submit";
}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-overflow-hidden", mainContainerClassName)}>
            <div className="tw-overflow-hidden tw-h-[calc(100%+2px)] tw-w-[calc(100%+2px)]">
                <div
                    className={concatenateNonNullStringsWithSpaces(
                        "lg-cta-outline-button tw-text-center tw-relative tw-group tw-transition tw-duration-300 hover:tw-border-1 hover:tw-h-full tw-grid tw-place-items-center tw-box-border",
                        buttonContainerClassName,
                    )}
                >
                    <div className="tw-absolute tw-h-[calc(100%+2px)] tw-w-[calc(100%+2px)] -tw-left-[1px] tw-top-0 tw-rounded-full tw-inset-0 tw-m-auto tw-transition-opacity tw-ease-in tw-duration-300 tw-opacity-0 group-hover:tw-opacity-100 lg-cta-button-gradient"></div>
                    <button
                        type={type == null ? undefined : type}
                        onClick={onClick}
                        className={concatenateNonNullStringsWithSpaces(
                            "tw-text-center tw-relative tw-duration-300 group-hover:tw-text-secondary-900-dark tw-grid tw-place-items-center",
                            buttonClassName,
                        )}
                        disabled={disabled}
                    >
                        {getVernacularString(textVernacId, userPreferences.language)}
                    </button>
                </div>
            </div>
        </div>
    );
}

export function ImageAndContentCard({
    cardItem,
    userPreferences,
    largeFont,
    bestSeller,
}: {
    cardItem: {imgId: string; name: string};
    userPreferences: UserPreferences;
    largeFont?: boolean;
    bestSeller?: boolean;
}) {
    return (
        <div className="tw-grid tw-gap-2 lg:tw-gap-4 tw-px-2 md:tw-px-4 tw-py-4 lg:tw-py-6 lg-card-shadow tw-rounded-lg tw-overflow-hidden tw-relative tw-h-full">
            <div className="tw-rounded-lg tw-overflow-hidden">
                <FullWidthImage relativePath={cardItem.imgId} />
            </div>
            <div
                className={concatenateNonNullStringsWithSpaces(
                    "tw-text-center tw-mx-auto",
                    largeFont ? "lg-text-title2" : "lg-text-body tw-w-[58%] min-[490px]:max-[918px]:tw-w-3/4 lg:tw-w-[77%] xl:tw-w-3/5 2xl:tw-w-full",
                )}
            >
                {getVernacularString(cardItem.name, userPreferences.language)}
            </div>
            {bestSeller && (
                <div className="tw-absolute tw-right-0 tw-top-0 tw-w-fit tw-bg-primary-500-light lg-text-icon tw-font-semibold tw-text-secondary-100-light tw-py-1 tw-px-5">
                    {getVernacularString("f22a7acc-0168-4011-9eaf-6a8f3328f093", userPreferences.language)}
                </div>
            )}
        </div>
    );
}

// export function SocialMediaFeed({posts, className}: {posts: Array<any>; className?: string}) {
//     const isScreenSizeBelow = useIsScreenSizeBelow(1024);

//     return (
//         <>
//             {isScreenSizeBelow ? (
//                 <SocialMediaFeedMobile
//                     posts={posts}
//                     className={className}
//                 />
//             ) : (
//                 <SocialMediaFeedDesktop
//                     posts={posts}
//                     className={className}
//                 />
//             )}
//         </>
//     );
// }

// export function SocialMediaFeedDesktop({posts, className}: {posts: Array<any>; className?: string}) {
//     return <div className={concatenateNonNullStringsWithSpaces("tw-grid tw-max-h-[30rem] tw-overflow-y-scroll", className)}>{posts}</div>;
// }

// export function SocialMediaFeedMobile({posts, className}: {posts: Array<any>; className?: string}) {
//     return <div className={concatenateNonNullStringsWithSpaces("tw-grid tw-max-h-[20rem] tw-overflow-y-scroll", className)}>{posts}</div>;
// }
