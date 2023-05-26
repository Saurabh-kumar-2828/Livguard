import type {FetcherWithComponents} from "@remix-run/react";
import {useRef} from "react";
import {toast} from "react-toastify";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {CoverImage} from "~/components/images/coverImage";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import type {Uuid} from "~/global-common-typescript/typeDefinitions";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {emailIdValidationPattern, indianPhoneNumberValidationPattern} from "~/global-common-typescript/utilities/validationPatterns";
import type {FormStateInputs, FormStateInputsAction} from "~/routes/lead-form.state";
import { FormStateInputsActionType} from "~/routes/lead-form.state";
import type {UserPreferences} from "~/typeDefinitions";
import {FormType} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";

export function ContactForm({
    userPreferences,
    fetcher,
    otpFetcher,
    utmParameters,
    formStateInputs,
    dispatch,
    className,
    leadId,
    pageUrl,
    resendTimeOut,
    setResendTimeOut,
}: {
    userPreferences: UserPreferences;
    fetcher: FetcherWithComponents<any>;
    otpFetcher: FetcherWithComponents<any>;
    utmParameters: {
        [searchParameter: string]: string;
    };
    formStateInputs: FormStateInputs;
    dispatch: React.Dispatch<FormStateInputsAction>;
    className?: string;
    leadId: Uuid;
    pageUrl: string;
    resendTimeOut: number;
    setResendTimeOut: React.Dispatch<number>;
}) {
    const otpFieldRef = useRef(null);
    const phoneNumberRef = useRef(null);

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
                    className="tw-w-full tw-rounded-[0.8rem] lg:tw-min-w-[25rem] lg:tw-max-w-[25rem] lg:tw-mx-auto tw-grid tw-grid-rows-[3rem_auto_0.25rem_auto_0.25rem_auto_0.25rem_auto_2.25rem_auto_3rem] tw-overflow-hidden tw-relative"
                    method="post"
                    action="/contact-us-submission"
                >
                    <CoverImage
                        relativePath="/livguard/contact form/contact_form_background.jpg"
                        className="tw-absolute tw-w-full tw-h-full tw-inset-0 tw-rounded-lg tw-overflow-gidden tw-opacity-70 tw-z-8"
                    />

                    <div className="tw-row-start-2 tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10">
                        <div className="lg-text-body-bold tw-pl-3 tw-text-white">{getVernacularString("contactUsT3", userPreferences.language)}</div>

                        <VerticalSpacer className="tw-h-1" />

                        <input
                            type="text"
                            name="name"
                            className="lg-text-input"
                            required
                            placeholder={getVernacularString("contactUsT3E", userPreferences.language)}
                            onChange={(e) => {
                                const action: FormStateInputsAction = {
                                    actionType: FormStateInputsActionType.SetName,
                                    payload: e.target.value,
                                };
                                dispatch(action);
                            }}
                        />
                    </div>

                    <div className="tw-row-start-4 tw-col-start-1 tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10">
                        <div className="lg-text-body-bold tw-pl-3 tw-text-white">{getVernacularString("contactUsT4", userPreferences.language)}</div>

                        <VerticalSpacer className="tw-h-1" />

                        <input
                            type="text"
                            name="emailId"
                            className="lg-text-input"
                            pattern={emailIdValidationPattern}
                            required
                            placeholder={getVernacularString("contactUsT4E", userPreferences.language)}
                            onChange={(e) => {
                                const action: FormStateInputsAction = {
                                    actionType: FormStateInputsActionType.SetEmail,
                                    payload: e.target.value,
                                };
                                dispatch(action);
                            }}
                        />
                    </div>

                    <div className="tw-row-start-6 tw-col-start-1 tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10">
                        <div className="lg-text-body-bold tw-pl-3 tw-text-white">{getVernacularString("contactUsT2", userPreferences.language)}</div>

                        <VerticalSpacer className="tw-h-1" />

                        <div className="tw-relative tw-w-full tw-items-center tw-grid">
                            <input
                                type="text"
                                name="phoneNumber"
                                pattern={indianPhoneNumberValidationPattern}
                                required
                                className="lg-text-input tw-w-full"
                                disabled={formStateInputs.showOtpField}
                                ref={phoneNumberRef}
                                placeholder={getVernacularString("contactUsT2E", userPreferences.language)}
                                onChange={(e) => {
                                    const phoneNumber = e.target.value;
                                    const action: FormStateInputsAction = {
                                        actionType: FormStateInputsActionType.SetPhoneNumber,
                                        payload: phoneNumber,
                                    };
                                    dispatch(action);
                                    if (phoneNumber.length == 10) {
                                        const action: FormStateInputsAction = {
                                            actionType: FormStateInputsActionType.SetShowOtpButton,
                                            payload: true,
                                        };
                                        dispatch(action);
                                    } else {
                                        const action: FormStateInputsAction = {
                                            actionType: FormStateInputsActionType.SetShowOtpButton,
                                            payload: false,
                                        };
                                        dispatch(action);
                                    }
                                }}
                                onBlur={(e) => {
                                    if (formStateInputs.inputData.phoneNumber.length == 10) {
                                        const action: FormStateInputsAction = {
                                            actionType: FormStateInputsActionType.SetShowOtpButton,
                                            payload: true,
                                        };
                                        dispatch(action);
                                    }
                                }}
                            />
                            <div
                                className={concatenateNonNullStringsWithSpaces(
                                    "tw-absolute tw-right-2 tw-bg-gradient-to-r tw-from-[#F25F60] tw-to-[#EB2A2B] tw-rounded-full tw-px-2 tw-py-1 tw-items-center tw-text-secondary-100-light hover:tw-cursor-pointer",
                                    formStateInputs.showOtpButton ? "tw-opacity-100 tw-duration-100 tw-z-10" : "tw-opacity-0 -tw-z-100 tw-duration-100",
                                )}
                                onClick={(e) => {
                                    if (formStateInputs.inputData.name == "") {
                                        toast.error("Name field can't be empty");
                                        return;
                                    }
                                    const action: FormStateInputsAction = {
                                        actionType: FormStateInputsActionType.SendOtp,
                                        payload: true,
                                    };
                                    dispatch(action);
                                    setResendTimeOut(60);
                                    if (otpFieldRef.current != null) {
                                        otpFieldRef.current.focus();
                                    }
                                    const data = new FormData();
                                    data.append("phoneNumber", formStateInputs.inputData.phoneNumber);
                                    data.append("name", formStateInputs.inputData.name);
                                    otpFetcher.submit(data, {method: "post", action: "/resend-otp"});
                                }}
                            >
                                {getVernacularString("OfferFormGetOTP", userPreferences.language)}
                            </div>
                            <div
                                className={concatenateNonNullStringsWithSpaces(
                                    "tw-absolute tw-right-2 hover:tw-cursor-pointer",
                                    formStateInputs.showOtpField && !formStateInputs.showOtpButton ? "tw-opacity-100 tw-duration-100 tw-z-10" : "tw-opacity-0 -tw-z-100 tw-duration-100",
                                )}
                                onClick={(e) => {
                                    const action: FormStateInputsAction = {
                                        actionType: FormStateInputsActionType.EditPhoneNumber,
                                        payload: true,
                                    };
                                    dispatch(action);
                                    if (phoneNumberRef.current != null) {
                                        phoneNumberRef.current.focus();
                                    }
                                }}
                            >
                                <img
                                    src="https://files.growthjockey.com/livguard/icons/form/edit-phone-number.svg"
                                    alt="edit number"
                                    className="tw-w-6 tw-h-6"
                                />
                            </div>
                        </div>
                    </div>

                    <VerticalSpacer className="tw-h-2 tw-row-start-7" />

                    <div className="tw-row-start-[8] tw-flex tw-flex-col tw-w-full lg-px-screen-edge">
                        <div
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-flex tw-flex-col tw-w-full",
                                formStateInputs.showOtpField ? "tw-opacity-100 tw-duration-100 tw-z-10" : "tw-opacity-0 -tw-z-100",
                            )}
                        >
                            <div className="lg-text-body-bold tw-pl-3 tw-text-secondary-100-light">{getVernacularString("contactUsOTPT3", userPreferences.language)}</div>

                            <VerticalSpacer className="tw-h-1" />

                            <div className="tw-relative">
                                <input
                                    type="text"
                                    name="otpSubmitted"
                                    className="lg-text-input"
                                    required
                                    placeholder={getVernacularString("contactUsOTPT3E", userPreferences.language)}
                                    ref={otpFieldRef}
                                    onChange={(e) => {
                                        const action: FormStateInputsAction = {
                                            actionType: FormStateInputsActionType.SetOtpSubmitted,
                                            payload: e.target.value,
                                        };
                                        dispatch(action);
                                    }}
                                />
                                {formStateInputs.invalidOtp && (
                                    <div className="lg-text-primary-500 tw-absolute lg-text-icon tw-right-2 tw-top-0 tw-bottom-0 tw-pt-[18px]">
                                        {getVernacularString("OfferInvalidOTP", userPreferences.language)}
                                    </div>
                                )}
                            </div>
                        </div>
                        <VerticalSpacer className="tw-h-1" />

                        <div
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-flex tw-flex-row tw-justify-between tw-w-full tw-px-3",
                                formStateInputs.showOtpField ? "tw-opacity-100 tw-duration-100 tw-z-10" : "tw-opacity-0 -tw-z-100",
                            )}
                        >
                            <div
                                className={concatenateNonNullStringsWithSpaces("tw-text-secondary-100-light tw-text-[12px]", `${resendTimeOut > 0 ? "undefined" : "hover:tw-cursor-pointer"}`)}
                                onClick={() => {
                                    const action: FormStateInputsAction = {
                                        actionType: FormStateInputsActionType.SetIsOtpResent,
                                        payload: true,
                                    };
                                    dispatch(action);
                                    const data = new FormData();
                                    data.append("phoneNumber", formStateInputs.inputData.phoneNumber);
                                    data.append("name", formStateInputs.inputData.name);
                                    otpFetcher.submit(data, {method: "post", action: "/resend-otp"});
                                }}
                            >
                                {getVernacularString("OfferResendOTP", userPreferences.language)}
                            </div>
                            <div className="tw-text-secondary-100-light tw-text-[12px]">{`00:${resendTimeOut}`}</div>
                        </div>
                    </div>

                    <VerticalSpacer className="tw-h-8 tw-row-start-[9]" />

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
                        name="inputData"
                        className="tw-hidden"
                        readOnly
                        value={JSON.stringify(formStateInputs.inputData)}
                    />

                    <input
                        name="pageUrl"
                        className="tw-hidden"
                        readOnly
                        value={pageUrl}
                    />

                    <div className="tw-row-start-[10] tw-col-start-1 tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10">
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
