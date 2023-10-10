import type {FetcherWithComponents} from "@remix-run/react";
import {useFetcher} from "@remix-run/react";
import {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import LivguardDialog from "~/components/livguardDialog";
import {FixedHeightImage} from "~/components/images/fixedHeightImage";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import type {Uuid} from "~/common--type-definitions/typeDefinitions";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {phoneNumberValidationPattern} from "~/global-common-typescript/utilities/validationPatterns";
import type {UserPreferences} from "~/typeDefinitions";
import {FormType} from "~/typeDefinitions";
import {ContentProviderContext} from "~/contexts/contentProviderContext";

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
    pageUrl,
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
    formType: string;
    pageUrl: string;
}) {
    const [resendTimeOut, setResendTimeOut] = useState(60);
    const otpFetcher = useFetcher();
    const [invalidOtp, setInvalidOtp] = useState(false);

    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);
    useEffect(() => {
        if (resendTimeOut > 0) {
            if (timeoutId != null) {
                clearTimeout(timeoutId);
            }
            let timeout = setTimeout(() => {
                setResendTimeOut(resendTimeOut - 1);
            }, 1000);
            setTimeoutId(timeout);
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

    const contentData = useContext(ContentProviderContext);

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
                        action={formType == FormType.leadFormSubmission || formType == FormType.offerContactUsSubmission ? "/lead-form-submission" : "/apply-for-dealership"}
                    >
                        <div className="tw-text-center lg-text-headline tw-px-8">
                            <div dangerouslySetInnerHTML={{__html: contentData.getContent("contactUsFAQT1")}} />
                        </div>

                        <div className="tw-h-8" />

                        <div className="tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10">
                            <div className="lg-text-title2 tw-pl-3 tw-text-white">{contentData.getContent("contactUsT2")}</div>

                            <VerticalSpacer className="tw-h-1" />

                            <input
                                type="text"
                                name="phoneNumber"
                                className="lg-text-input"
                                pattern={phoneNumberValidationPattern}
                                required
                                defaultValue={inputData.phoneNumber}
                                readOnly
                                placeholder={contentData.getContent("contactUsT2E")}
                            />
                        </div>

                        <VerticalSpacer className="tw-h-2" />

                        <div className="tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10">
                            <div className="lg-text-title2 tw-pl-3 tw-text-white">{contentData.getContent("contactUsOTPT3")}</div>

                            <VerticalSpacer className="tw-h-1" />

                            <div className="tw-relative">
                                <input
                                    type="text"
                                    name="otpSubmitted"
                                    className="lg-text-input"
                                    required
                                    placeholder={contentData.getContent("contactUsOTPT3E")}
                                />
                                {invalidOtp && (
                                    <div className="lg-text-primary-500 tw-absolute lg-text-icon tw-right-5 tw-top-0 tw-bottom-0 tw-pt-[18px]">{contentData.getContent("OfferInvalidOTP")}</div>
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
                                {contentData.getContent("OfferResendOTP")}
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
