import {useContext} from "react";
import {Facebook, Twitter, Instagram, Linkedin, Youtube} from "react-bootstrap-icons";
import {FixedWidthImage} from "~/components/images/fixedWidthImage";
import LivguardDialog from "~/components/livguardDialog";
import {ContentProviderContext} from "~/contexts/contentProviderContext";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {UserPreferences} from "~/typeDefinitions";

export function FormSubmissionSuccessLivguardDialog({userPreferences, isDialogOpen, tryToCloseDialog}: {userPreferences: UserPreferences; isDialogOpen: boolean; tryToCloseDialog: () => void}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <LivguardDialog
            isDialogOpen={isDialogOpen}
            tryToCloseDialog={tryToCloseDialog}
            title={null}
            showCloseIcon={true}
        >
            <div className="tw-w-full tw-flex tw-flex-col tw-items-center tw-text-center">
                <FixedWidthImage
                    relativePath="/livguard/icons/confirmation.png"
                    width="10rem"
                />

                <VerticalSpacer className="tw-h-4" />

                <div
                    dangerouslySetInnerHTML={{__html: contentData.getContent("successT1")}}
                    className="lg-text-banner"
                />

                <VerticalSpacer className="tw-h-8" />

                <div
                    dangerouslySetInnerHTML={{__html: contentData.getContent("successT2")}}
                    className="lg-text-title2"
                />

                <VerticalSpacer className="tw-h-8" />

                <div className="tw-w-full tw-flex tw-justify-evenly">
                    <a
                        href="https://www.facebook.com/LivguardEnergy/"
                        target="_blank"
                    >
                        <Facebook className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                    <a
                        href="https://twitter.com/LivguardEnergy"
                        target="_blank"
                    >
                        <Twitter className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                    <a
                        href="https://www.instagram.com/livguardenergy/"
                        target="_blank"
                    >
                        <Instagram className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                    <a
                        href="https://www.linkedin.com/company/livguard-energy/"
                        target="_blank"
                    >
                        <Linkedin className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                    <a
                        href="https://www.youtube.com/@LivguardEnergy"
                        target="_blank"
                    >
                        <Youtube className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                    </a>
                </div>

                <VerticalSpacer className="tw-h-8" />

                <div
                    dangerouslySetInnerHTML={{__html: contentData.getContent("successT3")}}
                    className="lg-text-body"
                />

                <VerticalSpacer className="tw-h-8" />

                {/* <div className="tw-self-center">
                    <FixedHeightImage
                        relativePath="/livguard/header/akshay.png"
                        height="13.75rem"
                    />
                </div> */}
            </div>
        </LivguardDialog>
    );
}
