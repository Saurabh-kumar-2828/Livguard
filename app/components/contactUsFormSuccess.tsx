import {Facebook, Instagram, Linkedin, Twitter, Youtube} from "react-bootstrap-icons";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {CoverImage} from "~/global-common-typescript/components/coverImage";
import {FixedHeightImage} from "~/global-common-typescript/components/fixedHeightImage";
import {FixedWidthImage} from "~/global-common-typescript/components/fixedWidthImage";
import {ImageCdnProvider} from "~/global-common-typescript/components/growthJockeyImage";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";

export function ContactFormSuccess({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div
            className="lg-px-screen-edge tw-flex tw-flex-col"
            id="contactUs"
        >
            <div className="lg-text-headline tw-text-center">
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("contactUsFormHT1", userPreferences.language)}} />
                </DefaultTextAnimation>
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("contactUsFormHT2", userPreferences.language)}} />
                </DefaultTextAnimation>
            </div>

            <VerticalSpacer className="tw-h-1" />

            <div className="lg-text-title2 tw-text-center">{getVernacularString("contactUsFormT3", userPreferences.language)}</div>

            <VerticalSpacer className="tw-h-4" />

            <DefaultElementAnimation>
                <div className="tw-w-full tw-rounded-lg tw-grid tw-grid-rows-[2rem_auto_1rem_auto_1rem_auto_1rem_auto_2rem] tw-justify-items-center tw-overflow-hidden">
                    <CoverImage
                        relativePath="/livguard/contact form/contact_form_background.jpg"
                        imageCdnProvider={ImageCdnProvider.GrowthJockey}
                        className="tw-row-[1/span_9] tw-col-start-1 tw-rounded-lg tw-opacity-70"
                    />

                    <div className="tw-row-start-2 tw-col-start-1 tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10">
                        <FixedWidthImage
                            relativePath="/livguard/icons/confirmation.png"
                            imageCdnProvider={ImageCdnProvider.GrowthJockey}
                            width="10rem"
                        />
                    </div>

                    <div className="tw-row-start-4 tw-col-start-1 tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10">
                        <div
                            dangerouslySetInnerHTML={{__html: getVernacularString("successT1", userPreferences.language)}}
                            className="lg-text-banner"
                        />
                    </div>

                    <div className="tw-row-start-6 tw-col-start-1 tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10">
                        <div
                            dangerouslySetInnerHTML={{__html: getVernacularString("successT2", userPreferences.language)}}
                            className="lg-text-banner"
                        />
                    </div>

                    <div className="tw-row-start-[8] tw-col-start-1 tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10">
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

                        <VerticalSpacer className="tw-h-4" />

                        <div
                            dangerouslySetInnerHTML={{__html: getVernacularString("successT3", userPreferences.language)}}
                            className="lg-text-banner"
                        />
                    </div>
                </div>
            </DefaultElementAnimation>
        </div>
    );
}
