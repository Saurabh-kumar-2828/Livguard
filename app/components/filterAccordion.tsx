import {Disclosure, Transition} from "@headlessui/react";
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/20/solid";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {getVernacularString} from "~/vernacularProvider";
import {UserPreferences} from "~/typeDefinitions";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {getMetadataForImage} from "~/utilities";
import {ImageCdnProvider} from "~/global-common-typescript/typeDefinitions";

export function FilterAccordion({
    userPreferences,
    panelItem,
    buttonTextContentId,
    filterIcon,
}: {
    userPreferences: UserPreferences;
    panelItem: JSX.Element;
    buttonTextContentId: string;
    filterIcon: string;
}) {
    return (
        <Disclosure defaultOpen={true}>
            {({open}) => (
                <div className={concatenateNonNullStringsWithSpaces("tw-px-3")}>
                    <Disclosure.Button
                        className={concatenateNonNullStringsWithSpaces(
                            "tw-text-left tw-p-5 tw-flex tw-justify-between tw-items-center tw-w-full tw-gap-x-4 lg-card",
                            `${open ? "tw-rounded-t-lg" : "tw-rounded-lg"}`,
                        )}
                    >
                        <div>
                            <img
                                src={getAbsolutePathForRelativePath(getMetadataForImage(filterIcon).finalUrl, ImageCdnProvider.Bunny, null, null)}
                                className="tw-brightness-0 tw-invert-0 dark:tw-invert"
                            />
                        </div>
                        <div className="lg-text-secondary-900 tw-flex-1 tw-text-center">{getVernacularString(buttonTextContentId, userPreferences.language)}</div>
                        <div className="tw-h-6 tw-w-6 lg-bg-background-500 tw-rounded-lg tw-flex-0">{open ? <ChevronUpIcon /> : <ChevronDownIcon />}</div>
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
                        <Disclosure.Panel className={concatenateNonNullStringsWithSpaces("tw-p-5 tw-rounded-b-lg tw-border-t tw-border-secondary-300 tw-flex tw-flex-col tw-gap-6")}>
                            {panelItem}
                        </Disclosure.Panel>
                    </Transition>
                </div>
            )}
        </Disclosure>
    );
}
