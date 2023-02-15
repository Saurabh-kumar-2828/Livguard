import {Disclosure, Transition} from "@headlessui/react";
import {MinusIcon, PlusIcon} from "@heroicons/react/20/solid";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";

export function Accordion({
    title,
    panelItem,
    openDisclosure,
    setOpenDisclosure,
}: {
    title: string;
    panelItem: JSX.Element;
    openDisclosure: string;
    setOpenDisclosure: React.Dispatch<React.SetStateAction<string>>;
}) {
    console.log("current open disclosure ===>",openDisclosure)
    return (
        <Disclosure defaultOpen={title == openDisclosure}>
            {title == openDisclosure ? (
                ({open,close}) => (
                    /* Use the `open` state to conditionally change the direction of an icon. */
                    <div key={`${title}-open`} className={`${title}-open`}>
                        <Disclosure.Button
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-p-5 tw-flex tw-justify-between tw-items-center tw-w-full lg-bg-secondary-100",
                                `${open ? "tw-rounded-t-lg" : "tw-rounded-lg"}`,
                            )}
                            id={`${openDisclosure}-open`}
                            onClick={() => {
                                close();
                                console.log("button cicked");
                            }}
                        >
                            <div className="lg-mobile-title2 lg-text-secondary-900">{title}</div>
                            <div className="tw-h-6 tw-w-6 lg-bg-background-500 tw-rounded-md">{open ? <MinusIcon /> : <PlusIcon />}</div>
                        </Disclosure.Button>

                        <Transition
                            enter="tw-transition tw-ease-linear tw-duration-500 tw-transform"
                            enterFrom="tw-opacity-0 -tw-translate-h-full"
                            enterTo="tw-opacity-100 tw-translate-h-0"
                            leave="tw-transition tw-ease-in-out tw-duration-500 tw-transform"
                            leaveFrom="tw-opacity-100 tw-translate-h-0"
                            leaveTo="tw-opacity-0 -tw-translate-h-full"
                        >
                            <Disclosure.Panel className="tw-p-5 tw-pb-10 tw-rounded-b-lg lg-bg-secondary-300 tw-opacity-70 tw-flex tw-flex-col tw-gap-6">{panelItem}</Disclosure.Panel>
                        </Transition>
                    </div>
                )
            ) : (
                <>
                    <Disclosure.Button
                        className={concatenateNonNullStringsWithSpaces("tw-p-5 tw-flex tw-justify-between tw-items-center tw-w-full lg-bg-secondary-100 tw-rounded-lg", "")}
                        onClick={() => {
                            setOpenDisclosure(title);
                        }}
                    >
                        <div className="lg-mobile-title2 lg-text-secondary-900">{title}</div>
                        <div className="tw-h-6 tw-w-6 lg-bg-background-500 tw-rounded-md">
                            <PlusIcon />
                        </div>
                    </Disclosure.Button>
                </>
            )}
        </Disclosure>
    );
}