import {Dialog, Transition} from "@headlessui/react";
import React, {useContext} from "react";
import {Facebook, Twitter, Instagram, Linkedin, Youtube} from "react-bootstrap-icons";
import {ContentProviderContext} from "~/contexts/contentProviderContext";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {FormSubmissionSuccess} from "~/components/formSubmissionSuccess";
import type {UserPreferences} from "~/typeDefinitions";

export function SubscribeSuccessDialog({
    userPreferences,
    isSuccessDialogOpen,
    setSuccessDialogOpen,
}: {
    userPreferences: UserPreferences;
    isSuccessDialogOpen: boolean;
    setSuccessDialogOpen: React.Dispatch<boolean>;
}) {
    function tryToCloseSuccessDialogOpen() {
        setSuccessDialogOpen(false);
    }

    return (
        <Transition
            show={isSuccessDialogOpen}
            as={React.Fragment}
        >
            <Dialog
                as="div"
                className="tw-relative tw-z-50"
                onClose={tryToCloseSuccessDialogOpen}
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

                <Dialog.Panel className="lg-px-screen-edge tw-fixed lg:tw-max-w-[23rem] lg:tw-mx-auto tw-inset-0 tw-grid tw-grid-rows-1 tw-grid-cols-1 tw-justify-center tw-items-center">
                    <Transition.Child
                        as="div"
                        enter="tw-ease-out tw-transition-all tw-duration-200"
                        enterFrom="tw-opacity-0"
                        enterTo="tw-opacity-full"
                        leave="tw-ease-in tw-transition-all tw-duration-200"
                        leaveFrom="tw-opacity-full"
                        leaveTo="tw-opacity-0"
                    >
                        <FormSubmissionSuccess
                            userPreferences={userPreferences}
                            tryToCloseDialog={tryToCloseSuccessDialogOpen}
                        />
                    </Transition.Child>
                </Dialog.Panel>
            </Dialog>
        </Transition>
    );
}

export function SocialMediaIcons({className}: {className?: string}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-flex tw-justify-evenly lg:tw-justify-center lg:tw-gap-10", className)}>
            <a
                href="https://www.facebook.com/LivguardEnergy/"
                target="_blank"
                id="facebook_button"
            >
                <Facebook className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
            </a>
            <a
                href="https://twitter.com/LivguardEnergy"
                target="_blank"
                id="twitter_button"
            >
                <Twitter className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
            </a>
            <a
                href="https://www.instagram.com/livguardenergy/"
                target="_blank"
                id="instagram_button"
            >
                <Instagram className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
            </a>
            <a
                href="https://www.linkedin.com/company/livguard-energy/"
                target="_blank"
                id="linkedin_button"
            >
                <Linkedin className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
            </a>
            <a
                href="https://www.youtube.com/@LivguardEnergy"
                target="_blank"
                id="youtube_button"
            >
                <Youtube className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
            </a>
        </div>
    );
}

export function FooterSocialLogosAndCopyright({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge lg-bg-secondary-100", className)}>
            <VerticalSpacer className="tw-h-3" />

            <SocialMediaIcons />

            <VerticalSpacer className="tw-h-6" />

            {/* <div
                className="tw-text-center tw-w-full"
                dangerouslySetInnerHTML={{__html: contentData.getContent("footerCopyrightText")}}
            /> */}
            {/* <div dangerouslySetInnerHTML={{__html: contentData.getContent("footerCopyWriteText")}} /> */}
            {/* <div>{contentData.getContent("footerCopyWriteText")}</div> */}

            {/* <VerticalSpacer className="tw-h-6" /> */}
        </div>
    );
}
