import {Disclosure, Transition} from "@headlessui/react";
import {MinusIcon, PlusIcon} from "@heroicons/react/20/solid";
import {useEffect, useRef} from "react";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";

export function Accordion({
    title,
    panelItem,
    // openDisclosureTitle,
    // setOpenDisclosureTitle,
}: {
    title: string;
    panelItem: JSX.Element;
    // openDisclosureTitle: string | null;
    // setOpenDisclosureTitle: React.Dispatch<React.SetStateAction<string | null>>;
}) {
    const ref = useRef(null);

    // useEffect(() => {
    //     const isCurrentDisclosureOpen = ref.current.getAttribute("aria-expanded") == "true";

    //     if (isCurrentDisclosureOpen) {
    //         if (title != openDisclosureTitle) {
    //             ref.current.click(null);
    //         }
    //     }
    // }, [openDisclosureTitle]);

    return (
        <Disclosure>
            {({open, close}) => (
                <>
                    <Disclosure.Button
                        className={concatenateNonNullStringsWithSpaces(
                            "tw-p-5 tw-flex tw-justify-between tw-items-center tw-w-full lg-bg-secondary-100",
                            `${open ? "tw-rounded-t-lg" : "tw-rounded-lg"}`,
                        )}
                        ref={ref}
                    >
                        <div className="lg-mobile-title2 lg-text-secondary-900">{title}</div>
                        <div className="tw-h-6 tw-w-6 lg-bg-background-500 tw-rounded-md">{open ? <MinusIcon /> : <PlusIcon />}</div>
                    </Disclosure.Button>

                    <Transition
                        enter="tw-transition tw-ease-linear tw-duration-500 tw-transform"
                        enterFrom="-tw-translate-h-[7.5rem]"
                        enterTo="tw-translate-h-0"
                        leave="tw-transition tw-ease-in-out tw-duration-500 tw-transform"
                        leaveFrom="tw-translate-h-0"
                        leaveTo="-tw-translate-h-[7.5rem]"
                    >
                        <Disclosure.Panel className="tw-p-5 tw-pb-10 tw-rounded-b-lg lg-bg-secondary-300 tw-opacity-70 tw-flex tw-flex-col tw-gap-6">{panelItem}</Disclosure.Panel>
                    </Transition>
                </>
            )}
        </Disclosure>
    );
}
