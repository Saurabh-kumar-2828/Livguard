import {useContext} from "react";
import {Facebook, Instagram, Linkedin, Twitter, Youtube} from "react-bootstrap-icons";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {CoverImage} from "~/components/images/coverImage";
import {FixedWidthImage} from "~/components/images/fixedWidthImage";
import {ContentProviderContext} from "~/contexts/contentProviderContext";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import type {UserPreferences} from "~/typeDefinitions";

export function ContactFormSuccess({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-flex tw-flex-col lg:tw-max-w-[25rem] lg:tw-mx-auto", className)}>
            <div className="lg-text-headline tw-text-center lg:tw-hidden">
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent("contactUsFormHT1")}} />
                </DefaultTextAnimation>
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent("contactUsFormHT2")}} />
                </DefaultTextAnimation>
            </div>

            <VerticalSpacer className="tw-h-1 lg:tw-hidden" />

            <div className="lg-text-title2 tw-text-center lg:tw-hidden">{contentData.getContent("contactUsFormT3")}</div>

            <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

            <DefaultElementAnimation>
                <div className="tw-w-full tw-rounded-lg tw-grid tw-grid-rows-[5rem_minmax(0,fit-content)_0.5rem_minmax(0,fit-content_0.5rem_minmax(0,fit-content_0.5rem_minmax(0,fit-content_2rem] tw-overflow-hidden tw-relative">
                    <div
                        className="tw-absolute -tw-top-4 tw-left-0 tw-right-0 lg-lead-form-top-gradient tw-h-[4rem] tw-z-10"
                        style={{clipPath: "ellipse(50% 100% at 50% 0%)"}}
                    />

                    <div
                        className="tw-absolute tw-top-0 tw-left-0 tw-right-0 lg-lead-form-top-gradient tw-h-[4rem] tw-opacity-50 tw-z-10"
                        style={{clipPath: "ellipse(50% 100% at 50% 0%)"}}
                    />

                    <div className="tw-absolute tw-top-[2.5rem] tw-left-0 tw-right-0 tw-h-[2.5rem] tw-grid tw-justify-center tw-z-10">
                        <div className="tw-w-[2.5rem] tw-h-[2.5rem] tw-rounded-full tw-bg-secondary-100-light tw-grid tw-items-center tw-justify-center">
                            <img
                                src="https://www.livguard.com/static-assets/icons/form/livguard.svg"
                                alt="livguard"
                                className="tw-w-6 tw-h-6"
                            />
                        </div>
                    </div>

                    <CoverImage
                        relativePath="/livguard/contact-form/background.jpg"
                        className="tw-row-[1/span_9] tw-col-start-1 tw-rounded-lg tw-opacity-70"
                    />

                    <div className="tw-row-start-2 tw-col-start-1 tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10 tw-items-center">
                        <FixedWidthImage
                            relativePath="/livguard/icons/confirmation.png"
                            width="10rem"
                        />
                    </div>

                    <div className="tw-row-start-4 tw-col-start-1 tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10 tw-items-center tw-text-center">
                        <div
                            dangerouslySetInnerHTML={{__html: contentData.getContent("successT1")}}
                            className="lg-text-banner tw-text-secondary-100-light"
                        />
                    </div>

                    <div className="tw-row-start-6 tw-col-start-1 tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10 tw-items-center tw-text-center">
                        <div
                            dangerouslySetInnerHTML={{__html: contentData.getContent("successT2")}}
                            className="lg-text-title2 tw-text-secondary-100-light"
                        />
                    </div>

                    <div className="tw-row-start-[8] tw-col-start-1 tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10 tw-items-center tw-text-center">
                        <div className="tw-w-full tw-flex tw-justify-evenly">
                            <a
                                href="https://www.facebook.com/LivguardEnergy/"
                                target="_blank"
                            >
                                <Facebook className="tw-w-6 tw-h-6 hover:lg-text-primary-500 tw-text-secondary-100-light tw-mt-[6px] tw-duration-200" />
                            </a>
                            <a
                                href="https://twitter.com/LivguardEnergy"
                                target="_blank"
                            >
                                <Twitter className="tw-w-6 tw-h-6 hover:lg-text-primary-500 tw-text-secondary-100-light tw-mt-[6px] tw-duration-200" />
                            </a>
                            <a
                                href="https://www.instagram.com/livguardenergy/"
                                target="_blank"
                            >
                                <Instagram className="tw-w-6 tw-h-6 hover:lg-text-primary-500 tw-text-secondary-100-light tw-mt-[6px] tw-duration-200" />
                            </a>
                            <a
                                href="https://www.linkedin.com/company/livguard-energy/"
                                target="_blank"
                            >
                                <Linkedin className="tw-w-6 tw-h-6 hover:lg-text-primary-500 tw-text-secondary-100-light tw-mt-[6px] tw-duration-200" />
                            </a>
                            <a
                                href="https://www.youtube.com/@LivguardEnergy"
                                target="_blank"
                            >
                                <Youtube className="tw-w-6 tw-h-6 hover:lg-text-primary-500 tw-text-secondary-100-light tw-mt-[6px] tw-duration-200" />
                            </a>
                        </div>

                        <VerticalSpacer className="tw-h-4" />

                        <div
                            dangerouslySetInnerHTML={{__html: contentData.getContent("successT3")}}
                            className="lg-text-body tw-text-secondary-100-light"
                        />
                    </div>
                </div>
            </DefaultElementAnimation>
        </div>
    );
}
