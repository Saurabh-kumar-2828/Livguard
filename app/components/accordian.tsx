import {Disclosure, Transition} from "@headlessui/react";
import {MinusIcon, PlusIcon} from "@heroicons/react/20/solid";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";

export function Accordion({
    title,
    panelItem,
    className,
    defaultOpen,
    accordionPanelClassName,
}: {
    title: string;
    panelItem: JSX.Element;
    className?: string;
    defaultOpen?: boolean;
    accordionPanelClassName?: string;
}) {
    return (
        <Disclosure defaultOpen={defaultOpen ?? false}>
            {({open}) => (
                <div className={concatenateNonNullStringsWithSpaces("lg-card", className)}>
                    <Disclosure.Button
                        className={concatenateNonNullStringsWithSpaces(
                            "tw-text-left tw-p-5 tw-flex tw-justify-between tw-items-center tw-w-full tw-gap-x-4",
                            `${open ? "tw-rounded-t-lg" : "tw-rounded-lg"}`,
                        )}
                    >
                        <div className="lg-text-secondary-900 tw-flex-1">{title}</div>
                        <div className="tw-h-6 tw-w-6 lg-bg-background-500 tw-rounded-lg tw-flex-0">{open ? <MinusIcon /> : <PlusIcon />}</div>
                    </Disclosure.Button>

                    <Transition
                        show={open}
                        enter="tw-transition-all tw-ease-in-out tw-duration-200 tw-overflow-hidden"
                        enterFrom="tw-max-h-0 tw-opacity-0"
                        enterTo="tw-max-h-[30rem] tw-opacity-full"
                        leave="tw-transition-all tw-ease-in-out tw-duration-200 tw-overflow-hidden"
                        leaveFrom="tw-max-h-[30rem] tw-opacity-full"
                        leaveTo="tw-max-h-0 tw-opacity-0"
                    >
                        <Disclosure.Panel
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-p-5 tw-rounded-b-lg tw-border-t tw-border-secondary-300 tw-flex tw-flex-col tw-gap-6",
                                accordionPanelClassName,
                            )}
                        >
                            {panelItem}
                        </Disclosure.Panel>
                    </Transition>
                </div>
            )}
        </Disclosure>
    );
}

// openDisclosureTitle,
// setOpenDisclosureTitle,

// openDisclosureTitle: string | null;
// setOpenDisclosureTitle: React.Dispatch<React.SetStateAction<string | null>>;

// const ref = useRef(null);

// useEffect(() => {
//     const isCurrentDisclosureOpen = ref.current.getAttribute("aria-expanded") == "true";

//     if (isCurrentDisclosureOpen) {
//         if (title != openDisclosureTitle) {
//             ref.current.click(null);
//         }
//     }
// }, [openDisclosureTitle]);
