import type {FetcherWithComponents} from "@remix-run/react";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {CoverImage} from "~/global-common-typescript/components/coverImage";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import type {Uuid} from "~/global-common-typescript/typeDefinitions";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {emailIdValidationPattern, indianPhoneNumberValidationPattern} from "~/global-common-typescript/utilities/validationPatterns";
import type { UserPreferences} from "~/typeDefinitions";
import {FormType} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";

export function ContactForm({
    userPreferences,
    fetcher,
    utmParameters,
    className,
    inputData,
    setInputData,
    leadId,
    pageUrl
}: {
    userPreferences: UserPreferences;
    fetcher: FetcherWithComponents<any>;
    utmParameters: {
        [searchParameter: string]: string;
    };
    className?: string;
    inputData: {name: string; phoneNumber: string; emailId: string};
    setInputData: React.Dispatch<React.SetStateAction<{name: string; phoneNumber: string; emailId: string}>>;
    leadId: Uuid;
    pageUrl: string;
}) {
    return (
        <div
            className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge tw-flex tw-flex-col", className)}
            id="contactUs"
        >
            <div className="lg-text-headline tw-text-center lg:tw-hidden">
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("contactUsFormHT1", userPreferences.language)}} />
                </DefaultTextAnimation>
                <DefaultTextAnimation>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("contactUsFormHT2", userPreferences.language)}} />
                </DefaultTextAnimation>
            </div>

            <VerticalSpacer className="tw-h-1 lg:tw-hidden" />

            <div className="lg-text-title2 tw-text-center lg:tw-hidden">{getVernacularString("contactUsFormT3", userPreferences.language)}</div>

            <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

            <DefaultElementAnimation>
                <fetcher.Form
                    className="tw-w-full tw-rounded-[0.8rem] lg:tw-min-w-[30rem] lg:tw-max-w-[30rem] lg:tw-mx-auto tw-grid tw-grid-rows-[3rem_auto_0.5rem_auto_0.5rem_auto_0.5rem_auto_3rem] tw-justify-items-center tw-overflow-hidden"
                    method="post"
                    action="/otp-verification"
                >
                    <CoverImage
                        relativePath="/livguard/contact form/contact_form_background.jpg"
                        className="tw-row-[1/span_9] tw-col-start-1 tw-rounded-lg tw-overflow-gidden tw-opacity-70"
                    />

                    <div className="tw-row-start-2 tw-col-start-1 tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10">
                        <div className="lg-text-title2 tw-pl-3 tw-text-white">{getVernacularString("contactUsT2", userPreferences.language)}</div>

                        <VerticalSpacer className="tw-h-1" />

                        <input
                            type="text"
                            name="phoneNumber"
                            className="lg-text-input"
                            pattern={indianPhoneNumberValidationPattern}
                            required
                            placeholder={getVernacularString("contactUsT2E", userPreferences.language)}
                            onChange={(e) => {
                                const newState = structuredClone(inputData);
                                newState.phoneNumber = e.target.value;
                                setInputData(newState);
                            }}
                        />
                    </div>

                    <div className="tw-row-start-4 tw-col-start-1 tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10">
                        <div className="lg-text-title2 tw-pl-3 tw-text-white">{getVernacularString("contactUsT3", userPreferences.language)}</div>

                        <VerticalSpacer className="tw-h-2" />

                        <input
                            type="text"
                            name="name"
                            className="lg-text-input"
                            required
                            placeholder={getVernacularString("contactUsT3E", userPreferences.language)}
                            onChange={(e) => {
                                const newState = structuredClone(inputData);
                                newState.name = e.target.value;
                                setInputData(newState);
                            }}
                        />
                    </div>

                    <div className="tw-row-start-6 tw-col-start-1 tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10">
                        <div className="lg-text-title2 tw-pl-3 tw-text-white">{getVernacularString("contactUsT4", userPreferences.language)}</div>

                        <VerticalSpacer className="tw-h-2" />

                        <input
                            type="text"
                            name="emailId"
                            className="lg-text-input"
                            pattern={emailIdValidationPattern}
                            required
                            placeholder={getVernacularString("contactUsT4E", userPreferences.language)}
                            onChange={(e) => {
                                const newState = structuredClone(inputData);
                                newState.emailId = e.target.value;
                                setInputData(newState);
                            }}
                        />
                    </div>

                    <input
                        name="utmParameters"
                        className="tw-hidden"
                        readOnly
                        value={JSON.stringify(utmParameters)}
                    />

                    <input
                        name="leadId"
                        className="tw-hidden"
                        readOnly
                        value={leadId}
                    />

                    <input
                        name="formType"
                        className="tw-hidden"
                        readOnly
                        value={FormType.contactUsSubmission}
                    />

                    <input
                        name="pageUrl"
                        className="tw-hidden"
                        readOnly
                        value={pageUrl}
                    />

                    <div className="tw-row-start-[8] tw-col-start-1 tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10">
                        <button
                            type="submit"
                            className="lg-cta-button tw-px-4 tw-self-center tw-w-60"
                            disabled={fetcher.state != "idle"}
                        >
                            {getVernacularString("contactUsFormT4", userPreferences.language)}
                        </button>
                    </div>
                </fetcher.Form>
            </DefaultElementAnimation>
        </div>
    );
}
