import type {FetcherWithComponents} from "@remix-run/react";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {CoverImage} from "~/components/images/coverImage";
import {FixedHeightImage} from "~/components/images/fixedHeightImage";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import type {Uuid} from "~/common--type-definitions/typeDefinitions";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {indianPhoneNumberValidationPattern} from "~/global-common-typescript/utilities/validationPatterns";
import type {UserPreferences} from "~/typeDefinitions";
import {FormType} from "~/typeDefinitions";
import {useContext} from "react";
import {ContentProviderContext} from "~/contexts/contentProviderContext";

export function OtpVerificationForm({
    userPreferences,
    fetcher,
    utmParameters,
    className,
    inputData,
    leadId,
    formType,
    pageUrl,
}: {
    userPreferences: UserPreferences;
    fetcher: FetcherWithComponents<any>;
    utmParameters?: {
        [searchParameter: string]: string;
    };
    className?: string;
    inputData: {name: string; phoneNumber: string; emailId: string; city?: string};
    leadId: Uuid;
    formType: string;
    pageUrl: string;
}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge tw-flex tw-flex-col", className)}>
            <DefaultElementAnimation>
                <fetcher.Form
                    className="tw-w-full tw-rounded-[0.8rem] lg:tw-min-w-[30rem] lg:tw-max-w-[30rem] lg:tw-mx-auto tw-grid tw-grid-cols-1 tw-grid-rows-[4rem_auto_0.5rem_auto_0.5rem_auto_0.5rem_auto_auto_4rem] tw-justify-items-center tw-overflow-hidden"
                    method="post"
                    action={formType == FormType.leadFormSubmission ? "/lead-form-submission" : "/apply-for-dealership"}
                >
                    <CoverImage
                        relativePath="/livguard/contact-form/background.jpg"
                        className="tw-row-[1/span_10] tw-col-start-1 tw-rounded-lg tw-overflow-gidden tw-opacity-70"
                    />

                    <div className="tw-row-start-2 tw-col-start-1 tw-text-center lg-text-headline tw-px-8 tw-z-10">
                        <div dangerouslySetInnerHTML={{__html: contentData.getContent("contactUsFAQT1")}} />
                    </div>

                    <div className="tw-h-8 tw-row-start-3" />

                    <div className="tw-row-start-4 tw-col-start-1 tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10">
                        <div className="lg-text-title2 tw-pl-3 tw-text-white">{contentData.getContent("contactUsT2")}</div>

                        <VerticalSpacer className="tw-h-1" />

                        <input
                            type="text"
                            name="phoneNumber"
                            className="lg-text-input"
                            pattern={indianPhoneNumberValidationPattern}
                            required
                            defaultValue={inputData.phoneNumber}
                            readOnly
                            placeholder={contentData.getContent("contactUsT2E")}
                        />
                    </div>

                    <VerticalSpacer className="tw-h-2 tw-row-start-5" />

                    <div className="tw-row-start-6 tw-col-start-1 tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10">
                        <div className="lg-text-title2 tw-pl-3 tw-text-white">{contentData.getContent("contactUsOTPT3")}</div>

                        <VerticalSpacer className="tw-h-1" />

                        <input
                            type="text"
                            name="otpSubmitted"
                            className="lg-text-input"
                            required
                            placeholder={contentData.getContent("contactUsOTPT3E")}
                        />
                    </div>

                    <VerticalSpacer className="tw-h-10 tw-row-start-7" />

                    <div className="tw-self-center tw-row-start-[8] tw-col-start-1">
                        <FixedHeightImage
                            relativePath="/livguard/header/akshay.png"
                            height="13.75rem"
                        />
                    </div>

                    <div className="tw-col-start-1 tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10 tw-row-start-[9]">
                        <button
                            type="submit"
                            className="lg-cta-button tw-px-4 tw-self-center tw-w-60"
                            disabled={fetcher.state != "idle"}
                        >
                            {contentData.getContent("applyNowForDealerT6")}
                        </button>
                    </div>
                    <input
                        name="utmParameters"
                        className="tw-hidden"
                        readOnly
                        value={JSON.stringify(utmParameters)}
                    />
                    <input
                        name="inputData"
                        className="tw-hidden"
                        readOnly
                        value={JSON.stringify(inputData)}
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
                        value={leadId}
                    />
                    <input
                        name="pageUrl"
                        className="tw-hidden"
                        readOnly
                        value={pageUrl}
                    />
                </fetcher.Form>
            </DefaultElementAnimation>
        </div>
    );
}
