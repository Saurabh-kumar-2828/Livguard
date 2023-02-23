import {FetcherWithComponents} from "@remix-run/react";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {CoverImage} from "~/global-common-typescript/components/coverImage";
import {ImageCdnProvider} from "~/global-common-typescript/components/growthJockeyImage";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";

export function ContactForm({userPreferences, fetcher}: {userPreferences: UserPreferences; fetcher: FetcherWithComponents<any>}) {
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
                <fetcher.Form
                    className="tw-w-full tw-rounded-lg tw-grid tw-grid-rows-[2rem_auto_1rem_auto_1rem_auto_1rem_auto_2rem] tw-justify-items-center tw-overflow-hidden"
                    method="post"
                    action="/contact-us-submission"
                >
                    <CoverImage
                        relativePath="/livguard/contact form/contact_form_background.jpg"
                        imageCdnProvider={ImageCdnProvider.Imgix}
                        className="tw-row-[1/span_9] tw-col-start-1 tw-rounded-lg tw-opacity-70"
                    />

                    <div className="tw-row-start-2 tw-col-start-1 tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10">
                        <div className="lg-text-title2 tw-pl-3">{getVernacularString("contactUsT2", userPreferences.language)}</div>

                        <VerticalSpacer className="tw-h-1" />

                        <input
                            type="text"
                            name="phoneNumber"
                            className="lg-text-input"
                            placeholder={getVernacularString("contactUsT2E", userPreferences.language)}
                        />
                    </div>

                    <div className="tw-row-start-4 tw-col-start-1 tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10">
                        <div className="lg-text-title2 tw-pl-3">{getVernacularString("contactUsT3", userPreferences.language)}</div>

                        <VerticalSpacer className="tw-h-2" />

                        <input
                            type="text"
                            name="name"
                            className="lg-text-input"
                            placeholder={getVernacularString("contactUsT3E", userPreferences.language)}
                        />
                    </div>

                    <div className="tw-row-start-6 tw-col-start-1 tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10">
                        <div className="lg-text-title2 tw-pl-3">{getVernacularString("contactUsT4", userPreferences.language)}</div>

                        <VerticalSpacer className="tw-h-2" />

                        <input
                            type="text"
                            name="emailId"
                            className="lg-text-input"
                            placeholder={getVernacularString("contactUsT4E", userPreferences.language)}
                        />
                    </div>

                    <div className="tw-row-start-[8] tw-col-start-1 tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10">
                        <button
                            type="submit"
                            className="lg-cta-button tw-px-4 tw-self-center tw-w-60"
                        >
                            {getVernacularString("contactUsFormT4", userPreferences.language)}
                        </button>
                    </div>
                </fetcher.Form>
            </DefaultElementAnimation>
        </div>
    );
}
