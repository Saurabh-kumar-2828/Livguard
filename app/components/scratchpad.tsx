
import {ChevronDown, RecordCircle} from "react-bootstrap-icons";
import {Fragment, useState} from "react";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useCombobox} from "downshift";

export function FancySearchableSelect(props: {id: string; className?: string; placeholder: string; options: Array<{value: number; label: string}>; onChange: (newValue: any) => void; datastore}) {

    const inputOptions = props.options;

    const [options, setOptions] = useState(inputOptions);
    const {isOpen, getToggleButtonProps, getMenuProps, getInputProps, getComboboxProps, highlightedIndex, getItemProps, openMenu, closeMenu, selectItem, selectedItem, setHighlightedIndex, reset} =
        useCombobox({
            items: options,
            onInputValueChange: ({inputValue}) => {
                const firstMatchIndex = options.findIndex((option) => option.label.toLowerCase().startsWith(inputValue.toLowerCase()));
                if (firstMatchIndex != -1) {
                    setHighlightedIndex(firstMatchIndex);
                }
            },
            onSelectedItemChange: ({selectedItem}) => {
                props.onChange(selectedItem);
                closeMenu();
                setOptions([selectedItem].concat(inputOptions.filter((option) => option.value != selectedItem.value)));
            },
            itemToString: (option) => option.label,
        });

    props.datastore.highlightValueInCombobox = (item: string) => {
        const option = inputOptions.find((option) => option.label.toLowerCase().startsWith(item.toLowerCase()));
        if (option != null) {
            selectItem(option);
        }
    };

    return (
        <div className={props.className}>
            <div
                className="tw-w-full tw-flex tw-flex-row"
                {...getComboboxProps()}
            >
                <input
                    className={concatenateNonNullStringsWithSpaces(
                        "tw-flex-grow tw-p-4 tw-placeholder-textMuted tw-text-black tw-outline-none tw-rounded-tl-md tw-transition-200",
                        !isOpen ? "tw-rounded-bl-md" : null,
                    )}
                    placeholder="Please Select Your City"
                    onFocus={() => openMenu()}
                    onClick={() => openMenu()}
                    {...getInputProps()}
                />
                <button
                    className={concatenateNonNullStringsWithSpaces("tw-p-4 tw-rounded-tr-md tw-bg-white tw-text-black", !isOpen ? "tw-rounded-br-md" : null)}
                    {...getToggleButtonProps()}
                >
                    <ChevronDown className={concatenateNonNullStringsWithSpaces("tw-w-4 tw-h-4 tw-duration-200")} />
                </button>
            </div>

            {/* <div className="" */}
            <ul
                className="tw-absolute tw-z-10 tw-w-80 tw-max-h-60 tw-overflow-y-auto"
                {...getMenuProps()}
            >
                {isOpen &&
                    options.map((option, optionIndex) => (
                        <li
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-flex tw-flex-row tw-items-center tw-p-4 tw-text-black",
                                highlightedIndex == optionIndex ? "tw-bg-primaryLight" : "tw-bg-white",
                                selectedItem?.value == option.value ? "tw-sticky tw-top-0" : null,
                            )}
                            key={optionIndex}
                            {...getItemProps({
                                item: option,
                                index: optionIndex,
                            })}
                        >
                            <div className="tw-flex-grow tw-text-left">{option.label}</div>
                            <RecordCircle className={concatenateNonNullStringsWithSpaces("tw-w-4 tw-h-4", selectedItem?.value == option.value ? "tw-text-primary" : "tw-text-textMuted")} />
                        </li>
                    ))}
            </ul>
        </div>
    );
}
