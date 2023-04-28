import {FetcherWithComponents} from "@remix-run/react";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import LivguardDialog from "~/components/livguardDialog";
import {FixedHeightImage} from "~/global-common-typescript/components/fixedHeightImage";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {Uuid} from "~/global-common-typescript/typeDefinitions";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {phoneNumberValidationPattern} from "~/global-common-typescript/utilities/validationPatterns";
import {FormType, UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";

export function OtpVerificationDialog({
    userPreferences,
    fetcher,
    isDialogOpen,
    setIsDialogOpen,
    utmParameters,
    className,
    inputData,
    leadId,
    formType,
}: {
    userPreferences: UserPreferences;
    fetcher: FetcherWithComponents<any>;
    isDialogOpen: boolean;
    setIsDialogOpen: React.Dispatch<boolean>;
    utmParameters?: {
        [searchParameter: string]: string;
    };
    className?: string;
    inputData: {name: string; phoneNumber: string; emailId: string; city?: string};
    leadId: Uuid;
    formType: string
}) {
    function tryToCloseDialog() {
        setIsDialogOpen(false);
    }

    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge tw-flex tw-flex-col", className)}>
            <LivguardDialog
                isDialogOpen={isDialogOpen}
                tryToCloseDialog={tryToCloseDialog}
                title={null}
            >
                <DefaultElementAnimation>
                    <fetcher.Form
                        className="tw-grid tw-grid-cols-1 tw-grid-rows-[4rem_auto_0.5rem_auto_0.5rem_auto_0.5rem_auto_auto_4rem] tw-justify-items-center"
                        method="post"
                        action={formType == FormType.contactUsSubmission ? "/contact-us-submission" : "/apply-for-dealership"}
                    >
                        <div className="tw-row-start-1 tw-text-center lg-text-headline tw-px-8">
                            <div dangerouslySetInnerHTML={{__html: getVernacularString("contactUsFAQT1", userPreferences.language)}} />
                        </div>

                        <div className="tw-h-8" />

                        <div className="tw-row-start-2 tw-col-start-1 tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10">
                            <div className="lg-text-title2 tw-pl-3 tw-text-white">{getVernacularString("contactUsT2", userPreferences.language)}</div>

                            <VerticalSpacer className="tw-h-1" />

                            <input
                                type="text"
                                name="phoneNumber"
                                className="lg-text-input"
                                pattern={phoneNumberValidationPattern}
                                required
                                defaultValue={inputData.phoneNumber}
                                readOnly
                                placeholder={getVernacularString("contactUsT2E", userPreferences.language)}
                            />
                        </div>

                        <VerticalSpacer className="tw-h-2" />

                        <div className="tw-row-start-4 tw-col-start-1 tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10">
                            <div className="lg-text-title2 tw-pl-3 tw-text-white">{getVernacularString("contactUsOTPT3", userPreferences.language)}</div>

                            <VerticalSpacer className="tw-h-1" />

                            <input
                                type="text"
                                name="otpSubmitted"
                                className="lg-text-input"
                                required
                                placeholder={getVernacularString("contactUsOTPT3E", userPreferences.language)}
                            />
                        </div>

                        <VerticalSpacer className="tw-h-10" />

                        <div className="tw-self-center">
                            <FixedHeightImage
                                relativePath="/livguard/header/akshay.png"
                                height="13.75rem"
                            />
                        </div>

                        <div className="tw-col-start-1 tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10">
                            <button
                                type="submit"
                                className="lg-cta-button tw-px-4 tw-self-center tw-w-60"
                                disabled={fetcher.state != "idle"}
                            >
                                {getVernacularString("applyNowForDealerT6", userPreferences.language)}
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
                    </fetcher.Form>
                </DefaultElementAnimation>
            </LivguardDialog>
        </div>
    );
}
