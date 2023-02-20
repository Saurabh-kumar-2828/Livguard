import {Form} from "@remix-run/react";
import {FixedHeightImage} from "~/global-common-typescript/components/fixedHeightImage";
import {ImageCdnProvider} from "~/global-common-typescript/components/growthJockeyImage";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";

export function ContactForm({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="lg-px-screen-edge" id="contactUs">
            <Form className="tw-w-full tw-bg-gradient-to-b tw-from-secondary-500-light tw-to-secondary-100-light dark:tw-from-secondary-500-dark dark:tw-to-secondary-100-dark lg-bg-secondary-100 tw-px-6 tw-py-6 tw-rounded-lg tw-flex tw-flex-col">
                <div className="tw-grid tw-grid-cols-[2rem_minmax(0,1fr)_2rem] tw-items-center">
                    <div className="tw-row-start-1 tw-col-start-2 tw-flex-1 tw-text-center lg-text-headline">{getVernacularString("contactUsT1", userPreferences.language)}</div>
                </div>

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-title2 tw-pl-3">{getVernacularString("contactUsT2", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-2" />

                <input
                    type="text"
                    className="lg-bg-secondary-300 tw-py-4 tw-px-4 tw-rounded-full tw-border tw-border-solid tw-border-secondary-900-light dark:tw-border-secondary-900-dark"
                />

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-title2 tw-pl-3">{getVernacularString("contactUsT3", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-2" />

                <input
                    type="text"
                    className="lg-bg-secondary-300 tw-py-4 tw-px-4 tw-rounded-full tw-border tw-border-solid tw-border-secondary-900-light dark:tw-border-secondary-900-dark"
                />

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-title2 tw-pl-3">{getVernacularString("contactUsT4", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-2" />

                <input
                    type="text"
                    className="lg-bg-secondary-300 tw-py-4 tw-px-4 tw-rounded-full tw-border tw-border-solid tw-border-secondary-900-light dark:tw-border-secondary-900-dark"
                />

                <VerticalSpacer className="tw-h-8" />

                <div className="tw-self-center">
                    <FixedHeightImage
                        relativePath="/livguard/header/akshay.png"
                        height="13.75rem"
                        imageCdnProvider={ImageCdnProvider.GrowthJockey}
                    />
                </div>

                <button
                    type="submit"
                    className="lg-cta-button tw-px-4 tw-self-center tw-w-60"
                >
                    {getVernacularString("contactUsT5", userPreferences.language)}
                </button>
            </Form>
        </div>
    );
}
