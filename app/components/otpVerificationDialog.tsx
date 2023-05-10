import type {FetcherWithComponents} from "@remix-run/react";
import { useFetcher} from "@remix-run/react";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import LivguardDialog from "~/components/livguardDialog";
import {FixedHeightImage} from "~/global-common-typescript/components/fixedHeightImage";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import type {Uuid} from "~/global-common-typescript/typeDefinitions";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {phoneNumberValidationPattern} from "~/global-common-typescript/utilities/validationPatterns";
import type { UserPreferences} from "~/typeDefinitions";
import {FormType} from "~/typeDefinitions";
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
    pageUrl
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
    pageUrl: string;
}) {
    const [resendTimeOut, setResendTimeOut] = useState(60);
    const otpFetcher = useFetcher();
    const [invalidOtp, setInvalidOtp] = useState(false);

    useEffect(() => {
        if (resendTimeOut > 0) {
            setTimeout(() => {
                setResendTimeOut(resendTimeOut - 1);
            }, 1000);
        }
    }, [resendTimeOut]);

    useEffect(() => {
        if (otpFetcher.data == null) {
            return;
        } else if (otpFetcher.data.error != null) {
            toast.error(otpFetcher.data.error);
            return;
        }
        toast.success("OTP resent successfully");
        setResendTimeOut(60);
    }, [otpFetcher.data]);

    useEffect(() => {
        if (fetcher.data == null) {
            return;
        } else if (fetcher.data.error != null) {
            setInvalidOtp(true);
            return;
        }
    }, [fetcher.data]);

    function tryToCloseDialog() {
        setIsDialogOpen(false);
    }

    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge tw-flex tw-flex-col", className)}>
            <LivguardDialog
                isDialogOpen={isDialogOpen}
                tryToCloseDialog={tryToCloseDialog}
                title={null}
                showCloseIcon={true}
            >
                <DefaultElementAnimation>
                    <fetcher.Form
                        className="tw-grid tw-grid-cols-1 tw-justify-items-center"
                        method="post"
                        action={formType == FormType.contactUsSubmission || formType == FormType.offerContactUsSubmission ? "/contact-us-submission" : "/apply-for-dealership"}
                    >
                        <div className="tw-text-center lg-text-headline tw-px-8">
                            <div dangerouslySetInnerHTML={{__html: getVernacularString("contactUsFAQT1", userPreferences.language)}} />
                        </div>

                        <div className="tw-h-8" />

                        <div className="tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10">
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

                        <div className="tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10">
                            <div className="lg-text-title2 tw-pl-3 tw-text-white">{getVernacularString("contactUsOTPT3", userPreferences.language)}</div>

                            <VerticalSpacer className="tw-h-1" />

                            <div className="tw-relative">
                                <input
                                    type="text"
                                    name="otpSubmitted"
                                    className="lg-text-input"
                                    required
                                    placeholder={getVernacularString("contactUsOTPT3E", userPreferences.language)}
                                />
                                {invalidOtp && (
                                    <div className="lg-text-primary-500 tw-absolute lg-text-icon tw-right-5 tw-top-0 tw-bottom-0 tw-pt-[18px]">
                                        {getVernacularString("OfferInvalidOTP", userPreferences.language)}
                                    </div>
                                )}
                            </div>
                        </div>
                        <VerticalSpacer className="tw-h-1" />

                        <div className="tw-flex tw-flex-row tw-justify-between tw-w-full lg-px-screen-edge tw-z-10">
                            <div
                                className={concatenateNonNullStringsWithSpaces("lg-text-secondary-700 tw-text-[12px]", `${resendTimeOut > 0 ? "undefined" : "hover:tw-cursor-pointer"}`)}
                                onClick={() => {
                                    const data = new FormData();
                                    data.append("phoneNumber", inputData.phoneNumber);
                                    data.append("name", inputData.name);
                                    otpFetcher.submit(data, {method: "post", action: "/resend-otp"});
                                }}
                            >
                                {getVernacularString("OfferResendOTP", userPreferences.language)}
                            </div>
                            <div className="lg-text-secondary-700 tw-text-[12px]">{`${resendTimeOut}:00`}</div>
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
                            value={formType}
                        />
                        <input
                            name="pageUrl"
                            className="tw-hidden"
                            readOnly
                            value={pageUrl}
                        />
                    </fetcher.Form>
                </DefaultElementAnimation>
            </LivguardDialog>
        </div>
    );
}
