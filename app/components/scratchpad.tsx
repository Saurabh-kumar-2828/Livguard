import {Combobox, Transition} from "@headlessui/react";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/20/solid";
import React, {useRef} from "react";
import {useState} from "react";
import {ChevronDown, RecordCircle} from "react-bootstrap-icons";
import {Uuid} from "~/global-common-typescript/typeDefinitions";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";

export function FancySearchableSelect<T extends string>({
    items,
    selectedItem,
    setSelectedItem,
    filterFunction,
    renderFunction,
    placeholder,
    className,
}: {
    items: Array<T>;
    selectedItem: T | null;
    setSelectedItem: React.Dispatch<T | null>;
    filterFunction: (items: Array<T>, query: string) => Array<T>;
    renderFunction: (item: T) => string;
    placeholder: string;
    className?: string;
}) {
    const [query, setQuery] = useState("");
    // const [isOpen, setIsOpen] = useState(false);

    const filteredItems = query == "" ? items : filterFunction(items, query);

    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-w-full", className)}>
            <Combobox
                value={selectedItem}
                onChange={setSelectedItem}
            >
                <div className="tw-relative">
                    <div className="tw-grid tw-grid-cols-[minmax(0,1fr)_2.875rem]">
                        <Combobox.Input
                            className="tw-row-start-1 tw-col-start-1 tw-col-span-2 lg-text-input tw-w-full"
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

                        <Combobox.Button
                            className="tw-row-start-1 tw-col-start-2 tw-grid tw-place-items-center"
                        >
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
                            {filteredItems.length == 0 && query != "" ? (
                                <div className="tw-relative tw-cursor-default tw-select-none tw-py-2 tw-px-4 tw-text-gray-700">Nothing found.</div>
                            ) : (
                                filteredItems.map((item, itemIndex) => (
                                    <Combobox.Option
                                        key={itemIndex}
                                        className={({active}) =>
                                            `tw-relative tw-cursor-default tw-select-none tw-py-2 tw-pl-10 tw-pr-4 ${active ? "tw-bg-teal-600 tw-text-white" : "tw-text-gray-900"}`
                                        }
                                        value={item}
                                    >
                                        {({selected, active}) => (
                                            <>
                                                <span className={`tw-block tw-truncate ${selected ? "tw-font-medium" : "tw-font-normal"}`}>{renderFunction(item)}</span>
                                                {selected ? (
                                                    <span className={`tw-absolute tw-inset-y-0 tw-left-0 tw-flex tw-items-center tw-pl-3 ${active ? "tw-text-white" : "tw-text-teal-600"}`}>
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
                "tw-grid tw-grid-cols-[1rem_auto_0.5rem_auto_minmax(1rem,1fr)] tw-place-items-center tw-rounded-lg tw-py-2 tw-transition-colors tw-duration-200 tw-cursor-pointer",
                isSelected ? "lg-bg-primary-500" : "lg-bg-secondary-100",
            )}
            onClick={onClick}
        >
            <div
                className={concatenateNonNullStringsWithSpaces(
                    "tw-col-start-2 tw-w-[2rem] tw-h-[2rem] tw-rounded-full tw-flex tw-flex-row tw-justify-center tw-items-center tw-shadow-[0px_4px_4px_0px_#00000040]",
                    isSelected ? "tw-bg-white" : "tw-bg-secondary-500-light",
                )}
            >
                <img
                    className={isSelected ? "tw-invert" : ""}
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
