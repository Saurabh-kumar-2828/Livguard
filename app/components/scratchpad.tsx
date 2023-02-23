import {Combobox, Transition} from "@headlessui/react";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/20/solid";
import React from "react";
import {useState} from "react";
import {ChevronDown, RecordCircle} from "react-bootstrap-icons";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";

// ; placeholder: string; onChange: (newValue: any) => void; datastore

// export function FancySearchableSelect<T>({
export function FancySearchableSelect<T extends string>({
    options,
    selected,
    setSelected,
    // primaryAttribute,
    query,
    setQuery,
    className,
}: {
    options: Array<T>;
    selected: T;
    setSelected: React.Dispatch<T>;
    // primaryAttribute: string;
    query: string;
    setQuery: React.Dispatch<string>;
    className?: string;
}) {
    // const filteredOptions = query == "" ? options : options.filter((option) => option[primaryAttribute].toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, "")));
    const filteredOptions = query == "" ? options : options.filter((option) => option.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, "")));

    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-top-16 tw-w-72 tw-z-10", className)}>
            <Combobox
                value={selected}
                onChange={setSelected}
            >
                <div className="tw-relative tw-mt-1">
                    <div className="tw-relative tw-w-full tw-cursor-default tw-overflow-hidden tw-rounded-lg tw-bg-white tw-text-left tw-shadow-md focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-white focus-visible:tw-ring-opacity-75 focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-teal-300 sm:tw-text-sm">
                        <Combobox.Input
                            className="tw-w-full tw-border-none tw-py-2 tw-pl-3 tw-pr-10 tw-text-sm tw-leading-5 tw-text-gray-900 focus:tw-ring-0"
                            displayValue={(option) => option}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className="tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-pr-2">
                            <ChevronUpDownIcon
                                className="tw-h-5 tw-w-5 tw-text-gray-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>

                    <Transition
                        as={React.Fragment}
                        leave="tw-transition tw-ease-in tw-duration-100"
                        leaveFrom="tw-opacity-100"
                        leaveTo="tw-opacity-0"
                        afterLeave={() => setQuery("")}
                    >
                        <Combobox.Options className="tw-absolute tw-mt-1 tw-max-h-60 tw-w-full tw-overflow-auto tw-rounded-md tw-bg-white tw-py-1 tw-text-base tw-shadow-lg tw-ring-1 tw-ring-black tw-ring-opacity-5 focus:tw-outline-none sm:tw-text-sm">
                            {filteredOptions.length == 0 && query != "" ? (
                                <div className="tw-relative tw-cursor-default tw-select-none tw-py-2 tw-px-4 tw-text-gray-700">Nothing found.</div>
                            ) : (
                                filteredOptions.map((option, optionIndex) => (
                                    <Combobox.Option
                                        key={optionIndex}
                                        className={({active}) => `tw-relative tw-cursor-default tw-select-none tw-py-2 tw-pl-10 tw-pr-4 ${active ? "tw-bg-teal-600 tw-text-white" : "tw-text-gray-900"}`}
                                        value={option}
                                    >
                                        {({selected, active}) => (
                                            <>
                                                <span className={`tw-block tw-truncate ${selected ? "tw-font-medium" : "tw-font-normal"}`}>{option}</span>
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
