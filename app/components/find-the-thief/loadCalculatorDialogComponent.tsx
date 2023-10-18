import {Link, useFetcher} from "@remix-run/react";
import React, {useContext, useEffect, useRef, useState} from "react";
import {toast} from "react-toastify";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {HiddenFormField} from "~/global-common-typescript/components/hiddenFormField";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {indianPhoneNumberValidationPattern} from "~/global-common-typescript/utilities/validationPatterns";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {UserPreferences} from "~/typeDefinitions";
import {ContentProviderContext} from "~/contexts/contentProviderContext";

export function LoadCalculatorDialogComponent({
    userPreferences,
    setIsDialogOpen,
    couponCode,
    setCouponCode,
}: {
    userPreferences: UserPreferences;
    setIsDialogOpen: React.Dispatch<boolean>;
    couponCode: string;
    setCouponCode: React.Dispatch<string>;
}) {
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);

    return (
        <div className="tw-rounded-lg tw-h-full lg:tw-max-w-4xl tw-grid tw-place-self-center tw-items-center tw-justify-center tw-auto-rows-max lg:tw-grid-rows-1 lg-bg-secondary-100">
            {isScreenSizeBelow ? (
                <LoadCalculatorDialogMobile
                    userPreferences={userPreferences}
                    setIsDialogOpen={setIsDialogOpen}
                    couponCode={couponCode}
                    setCouponCode={setCouponCode}
                />
            ) : (
                <LoadCalculatorDialogDesktop
                    userPreferences={userPreferences}
                    setIsDialogOpen={setIsDialogOpen}
                    couponCode={couponCode}
                    setCouponCode={setCouponCode}
                />
            )}
        </div>
    );
}

function LoadCalculatorDialogMobile({
    userPreferences,
    setIsDialogOpen,
    couponCode,
    setCouponCode,
}: {
    userPreferences: UserPreferences;
    setIsDialogOpen: React.Dispatch<boolean>;
    couponCode: string;
    setCouponCode: React.Dispatch<string>;
}) {
    const [step, setStep] = useState(1);

    return (
        <div className="tw-px-4 tw-py-8 tw-z-[64]">
            {step === 0 && (
                <VictoryComponent
                    userPreferences={userPreferences}
                    setStep={setStep}
                />
            )}

            {step === 1 && (
                <FormSection
                    userPreferences={userPreferences}
                    setStep={setStep}
                    couponCode={couponCode}
                    setCouponCode={setCouponCode}
                />
                // <ThankYouSection
                //     userPreferences={userPreferences}
                //     setIsDialogOpen={setIsDialogOpen}
                // />
            )}

            {step === 2 && (
                <ThankYouSection
                    userPreferences={userPreferences}
                    setIsDialogOpen={setIsDialogOpen}
                />
            )}
        </div>
    );
}

function LoadCalculatorDialogDesktop({
    userPreferences,
    setIsDialogOpen,
    couponCode,
    setCouponCode,
}: {
    userPreferences: UserPreferences;
    setIsDialogOpen: React.Dispatch<boolean>;
    couponCode: string;
    setCouponCode: React.Dispatch<string>;
}) {
    const [step, setStep] = useState(1);
    return (
        <div className="tw-w-full tw-h-full tw-grid tw-grid-cols-2 tw-grid-rows-1">
            <div className="tw-col-start-1 tw-px-8 tw-py-6">
                <VictoryComponent userPreferences={userPreferences} />
            </div>

            <div className="tw-col-start-2 tw-px-8 tw-py-6 lg-bg-new-background-border-500 tw-rounded-lg tw-grid tw-items-center">
                {step === 1 && (
                    <FormSection
                        userPreferences={userPreferences}
                        setStep={setStep}
                        couponCode={couponCode}
                        setCouponCode={setCouponCode}
                    />
                    // <ThankYouSection
                    //     userPreferences={userPreferences}
                    //     setIsDialogOpen={setIsDialogOpen}
                    // />
                )}
                {step === 2 && (
                    <ThankYouSection
                        userPreferences={userPreferences}
                        setIsDialogOpen={setIsDialogOpen}
                    />
                )}
            </div>
        </div>
    );
}

function VictoryComponent({userPreferences, setStep, className}: {userPreferences: UserPreferences; setStep?: React.Dispatch<number>; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-flow-row")}>
            <div className="lg-text-primary-500 lg-text-headline tw-place-self-center lg:tw-justify-self-start tw-text-center lg:tw-text-left">
                {contentData.getContent("e6419d6a-b775-4e93-81e5-9a18b1a1c809")}
            </div>
            <div
                className=" tw-place-self-center lg:tw-justify-self-start tw-text-center lg:tw-text-left tw-text-[1.5rem] md:tw-text-[2.125rem] tw-leading-[1.75rem] md:tw-leading-[2.5rem]"
                dangerouslySetInnerHTML={{__html: contentData.getContent("fb5b1b3a-a82c-4968-a9da-25b3cd9d62db")}}
            />
            <div
                dangerouslySetInnerHTML={{__html: contentData.getContent("f34a013d-dc49-425b-bc87-984766a35a2d")}}
                className="lg-text-body tw-place-self-center lg:tw-justify-self-start tw-text-center lg:tw-hidden"
            />

            <VerticalSpacer className="tw-h-4 lg:tw-h-8" />
            <div className="tw-w-2/3 tw-max-w-xs tw-h-full tw-px-4 tw-place-self-center tw-relative tw-z-10">
                <FullWidthImage relativePath="/livguard/find-the-thief/inverter-battery.png" />
                <div className="tw-absolute tw-inset-0 tw-m-auto">
                    {/* <Lottie
                        animationData={confettiAnimationData}
                        loop
                        play
                        className="tw-w-full tw-h-full"
                    /> */}
                </div>
            </div>

            <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

            <button
                onClick={() => {
                    if (setStep != null) {
                        setStep(1);
                    }
                }}
                className="lg-cta-button tw-w-fit tw-place-self-center lg:tw-hidden tw-z-20"
            >
                {contentData.getContent("78b0281f-e8cf-4b38-82c0-23382b168795")}
            </button>
        </div>
    );
}

function FormSection({
    userPreferences,
    setStep,
    className,
    couponCode,
    setCouponCode,
}: {
    userPreferences: UserPreferences;
    setStep?: React.Dispatch<number>;
    className?: string;
    couponCode: string;
    setCouponCode: React.Dispatch<string>;
}) {
    const contentData = useContext(ContentProviderContext);
    const [showOtpField, setShowOtpField] = useState(false);
    const [showOtpButton, setShowOtpButton] = useState(false);
    const [resendTimeOut, setResendTimeOut] = useState(0);
    const [invalidOtp, setInvalidOtp] = useState(false);
    const [isOtpResent, setIsOtpResent] = useState(false);
    const phoneNumberRef = useRef<HTMLInputElement | null>(null);
    const otpFieldRef = useRef<HTMLInputElement | null>(null);

    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [otpSubmitted, setIsOtpSubmitted] = useState(false);
    const otpFetcher = useFetcher();
    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);
    const utmParameters = useUtmSearchParameters();

    useEffect(() => {
        if (otpFetcher.data == null) {
            return;
        } else if (otpFetcher.data.error != null) {
            toast.error(otpFetcher.data.error);
            setInvalidOtp(true);
            return;
        }
        setInvalidOtp(false);
        if (isOtpResent) {
            toast.success("OTP resent successfully");
            setIsOtpResent(true);
        } else {
            toast.success("OTP sent successfully");
        }
    }, [otpFetcher.data]);

    useEffect(() => {
        if (resendTimeOut > 0 && showOtpField) {
            if (timeoutId != null) {
                clearTimeout(timeoutId);
            }
            let timeout = setTimeout(() => {
                setResendTimeOut((prev) => prev - 1);
            }, 1000);
            setTimeoutId(timeout);
        }
    }, [resendTimeOut]);

    const formFetcher = useFetcher();
    useEffect(() => {
        if (formFetcher.data != null) {
            if (formFetcher.data.error != null) {
                toast(formFetcher.data.error);
                return;
            }

            if (setStep != null) {
                setStep(2);
            }

            localStorage.setItem("treasureHuntStep", "4");
        }
    }, [formFetcher.data]);
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-flow-row")}>
            <div className="lg:tw-hidden lg-text-primary-500 lg-text-headline tw-place-self-center tw-text-center">{contentData.getContent("e6419d6a-b775-4e93-81e5-9a18b1a1c809")}</div>
            <div
                className="lg:tw-hidden tw-place-self-center tw-text-center tw-text-[1.5rem] md:tw-text-[2.125rem] tw-leading-[1.75rem] md:tw-leading-[2.5rem]"
                dangerouslySetInnerHTML={{__html: contentData.getContent("fb5b1b3a-a82c-4968-a9da-25b3cd9d62db")}}
            />
            <div
                dangerouslySetInnerHTML={{__html: contentData.getContent("f34a013d-dc49-425b-bc87-984766a35a2d")}}
                className="lg-text-body tw-place-self-center lg:tw-justify-self-start tw-text-center lg:tw-text-left"
            />

            <VerticalSpacer className="tw-h-4" />

            <formFetcher.Form
                className="tw-grid tw-grid-flow-row tw-gap-y-4"
                method="post"
                action="/find-the-thief/lead-submission"
            >
                <div className="tw-gap-2 tw-grid">
                    {/* <label htmlFor="name">{contentData.getContent("79436419-5a42-4720-be85-19bc0b46c7bb")}</label> */}
                    <input
                        type="text"
                        name="name"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                        className="lg-text-secondary-900 lg-text-input !tw-bg-transparent placeholder:tw-font-semibold placeholder:tw-text-secondary-700 dark:placeholder:tw-text-secondary-700-dark tw-w-full tw-rounded-full"
                        placeholder={contentData.getContent("79436419-5a42-4720-be85-19bc0b46c7bb")}
                    />
                </div>

                <div className="tw-gap-2 tw-grid">
                    {/* <label htmlFor="email">{contentData.getContent("fe032013-d1e7-45d7-9c0c-d289c5f80c52")}</label> */}
                    <input
                        type="email"
                        name="email"
                        required
                        className="lg-text-secondary-900 lg-text-input !tw-bg-transparent placeholder:tw-font-semibold placeholder:tw-text-secondary-700 dark:placeholder:tw-text-secondary-700-dark tw-w-full tw-rounded-full"
                        placeholder={contentData.getContent("fe032013-d1e7-45d7-9c0c-d289c5f80c52")}
                    />
                </div>
                <div>
                    <div className="tw-grid tw-grid-flow-row tw-gap-2">
                        {!showOtpField ? (
                            // <label>{contentData.getContent("b24cf3a3-c834-487e-8ca3-5f78e02a267e")}</label>
                            ""
                        ) : (
                            // <div className="lg-text-secondary-900">{contentData.getContent("17cfa283-6fcc-4a49-9dfe-a392e0310b27")}</div>
                            <div className="tw-grid tw-w-full tw-items-center tw-grid-cols-[auto_0.5rem_minmax(0,1fr)] tw-pl-3">
                                <div
                                    className="tw-col-start-1 tw-text-primary-500-light hover:tw-cursor-pointer lg-text-body-bold"
                                    onClick={(e) => {
                                        setShowOtpField(false);
                                        setResendTimeOut(0);
                                        if (phoneNumberRef.current != null) {
                                            phoneNumberRef.current.focus();
                                        }
                                    }}
                                >
                                    {contentData.getContent("phoneNumberChnage")}
                                </div>
                                <div className="tw-col-start-3 lg-text-secondary-900 lg-text-body-bold">{phoneNumber}</div>
                            </div>
                        )}

                        {!showOtpField ? (
                            <div className="tw-relative tw-w-full tw-items-center tw-grid">
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    pattern={indianPhoneNumberValidationPattern}
                                    placeholder={contentData.getContent("b24cf3a3-c834-487e-8ca3-5f78e02a267e")}
                                    required
                                    className="lg-text-secondary-900 lg-text-input !tw-bg-transparent placeholder:tw-font-semibold placeholder:tw-text-secondary-700 dark:placeholder:tw-text-secondary-700-dark tw-w-full"
                                    disabled={showOtpField}
                                    defaultValue={phoneNumber}
                                    ref={phoneNumberRef}
                                    onChange={(e) => {
                                        setPhoneNumber(e.target.value);
                                        if (e.target.value.length == 10) {
                                            setShowOtpButton(true);
                                        } else {
                                            setShowOtpButton(false);
                                        }
                                    }}
                                    onBlur={(e) => {
                                        if (phoneNumber.length == 10) {
                                            setShowOtpButton(true);
                                        }
                                    }}
                                    onFocus={(e) => {
                                        if (phoneNumber.length == 10) {
                                            setShowOtpButton(true);
                                        }
                                    }}
                                />
                                <div
                                    className={concatenateNonNullStringsWithSpaces(
                                        "tw-absolute tw-right-2 tw-bg-gradient-to-r tw-from-[#F25F60] tw-to-[#EB2A2B] tw-rounded-full tw-px-2 tw-py-1 tw-items-center tw-text-secondary-100-light hover:tw-cursor-pointer",
                                        showOtpButton ? "tw-opacity-100 tw-duration-100 tw-z-10" : "tw-opacity-0 -tw-z-10 tw-duration-100",
                                    )}
                                    onClick={(e) => {
                                        if (name.length === 0) {
                                            toast.error("Name cannot be null! Error code: 3b08d311-0e27-477e-b2dc-38eb172db2f7");
                                            return;
                                        }
                                        setShowOtpButton(false);
                                        setShowOtpField(true);
                                        setResendTimeOut(60);

                                        if (otpFieldRef.current != null) {
                                            otpFieldRef.current.focus();
                                        }
                                        const data = new FormData();
                                        data.append("phoneNumber", phoneNumber);
                                        data.append("name", name);
                                        otpFetcher.submit(data, {method: "post", action: "/resend-otp"});
                                    }}
                                >
                                    {contentData.getContent("OfferFormGetOTP")}
                                </div>
                            </div>
                        ) : (
                            <div
                                className={concatenateNonNullStringsWithSpaces(
                                    "tw-w-full",
                                    showOtpField ? "tw-flex tw-flex-col tw-opacity-100 tw-duration-100 tw-z-10" : "tw-hidden tw-opacity-0 -tw-z-100",
                                )}
                            >
                                <div className="tw-relative">
                                    <input
                                        type="text"
                                        name="otpSubmitted"
                                        className="lg-text-secondary-900 lg-text-input !tw-bg-transparent placeholder:tw-font-semibold placeholder:tw-text-secondary-700 dark:placeholder:tw-text-secondary-700-dark"
                                        required
                                        placeholder={contentData.getContent("contactUsOTPT3E")}
                                        ref={otpFieldRef}
                                        onChange={(e) => {
                                            setIsOtpSubmitted(true);
                                        }}
                                    />
                                    {invalidOtp && (
                                        <div className="lg-text-secondary-900 lg-text-primary-500 tw-absolute lg-text-icon tw-right-2 tw-top-0 tw-bottom-0 tw-pt-[18px]">
                                            {contentData.getContent("OfferInvalidOTP")}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div
                        className={concatenateNonNullStringsWithSpaces(
                            "tw-w-full tw-px-3 lg:tw-col-start-1",
                            showOtpField ? "tw-flex tw-flex-row tw-justify-between tw-opacity-100 tw-duration-100 tw-z-10" : "tw-hidden tw-opacity-0 -tw-z-100",
                        )}
                    >
                        <div
                            className={concatenateNonNullStringsWithSpaces("lg-text-secondary-700 tw-text-[12px]", `${resendTimeOut > 0 ? "undefined" : "hover:tw-cursor-pointer"}`)}
                            onClick={() => {
                                setIsOtpResent(true);
                                setResendTimeOut(60);

                                const data = new FormData();
                                data.append("phoneNumber", phoneNumber);
                                data.append("name", name);
                                otpFetcher.submit(data, {method: "post", action: "/resend-otp"});
                            }}
                        >
                            {contentData.getContent("OfferResendOTP")}
                        </div>
                        <div className="lg-text-secondary-700 tw-text-[12px]">{`00:${resendTimeOut}`}</div>
                    </div>
                </div>

                {/* <div className="tw-gap-2 tw-grid">
                    <input
                        type="text"
                        name="userName"
                        required
                        className="lg-text-secondary-900 lg-text-input !tw-bg-transparent placeholder:tw-font-semibold placeholder:tw-text-secondary-700 dark:placeholder:tw-text-secondary-700-dark tw-w-full tw-rounded-full"
                        placeholder={contentData.getContent("88d4bc6f-64ee-4910-8b1e-27ad5aea32c1")}
                    />
                </div> */}
                <HiddenFormField
                    name="phoneNumber"
                    value={phoneNumber}
                />

                <HiddenFormField
                    name="utmParameters"
                    value={JSON.stringify(utmParameters)}
                />

                <VerticalSpacer className="max-lg:tw-hidden lg:tw-h-2" />

                <button
                    type="submit"
                    className="lg-cta-button tw-w-fit tw-place-self-center lg:tw-w-full"
                >
                    {contentData.getContent("2a9b9149-ae09-452b-b02d-8ab5b8850557")}
                </button>
            </formFetcher.Form>
        </div>
    );
}

function ThankYouSection({userPreferences, className, setIsDialogOpen}: {userPreferences: UserPreferences; className?: string; setIsDialogOpen: React.Dispatch<boolean>}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-grid tw-grid-flow-row tw-relative")}>
            <div className="lg-text-headline tw-place-self-center tw-text-center">{contentData.getContent("29a1dc30-0f20-4075-b14e-52197e83f059")}</div>
            <div
                className=" tw-place-self-center tw-text-center tw-text-[1.5rem] md:tw-text-[2.125rem] tw-leading-[1.75rem] md:tw-leading-[2.5rem]"
                dangerouslySetInnerHTML={{__html: contentData.getContent("1a109702-9407-4945-aa54-acde384ace7a")}}
            />

            <VerticalSpacer className="tw-h-4" />

            <div className="lg-text-body tw-place-self-center tw-text-center">{contentData.getContent("37118df1-c2d2-4cbb-af54-288487236384")}</div>

            <VerticalSpacer className="tw-h-4" />

            <div className="tw-w-full max-lg:tw-px-20 lg:tw-px-28">
                <FullWidthImage relativePath="/livguard/find-the-thief/reward.png" />
            </div>

            <VerticalSpacer className="tw-h-4" />

            <div className="tw-grid tw-grid-flow-col tw-grid-cols-1 tw-gap-x-3 tw-w-full tw-text-center">
                {/* <div className="lg-bg-primary-500 !tw-text-secondary-900-dark tw-grid tw-place-items-center tw-h-6 tw-w-6 tw-rounded-full">2</div> */}
                <div dangerouslySetInnerHTML={{__html: contentData.getContent("8e337c72-d495-4840-9fcc-3670a8e9bd83")}} />
            </div>

            <VerticalSpacer className="tw-h-8" />

            <Link
                to="https://www.facebook.com/LivguardEnergy/videos/355148986863116/"
                target="_blank"
                rel="noopener noreferrer"
                className="lg-cta-button tw-w-fit tw-place-self-center"
            >
                {contentData.getContent("99c5d78c-5238-4d07-a03d-f1ee21241ac0")}
            </Link>

            {/* <VerticalSpacer className="tw-h-8" />

            <div className="tw-border-2 tw-border-dashed tw-border-primary-500-dark tw-rounded-md tw-p-2">
                <div
                    dangerouslySetInnerHTML={{__html: contentData.getContent("38d347bc-e85b-46f2-82a0-dd41a118daaf")}}
                    className="tw-text-center lg-text-body tw-px-12"
                />
            </div> */}
        </div>
    );
}
