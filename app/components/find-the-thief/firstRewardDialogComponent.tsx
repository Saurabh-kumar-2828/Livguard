import {Link, useFetcher} from "@remix-run/react";
import {useEffect, useState} from "react";
import {Oval} from "react-loader-spinner";
import {toast} from "react-toastify";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {ImageCdnProvider} from "~/global-common-typescript/typeDefinitions";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {Theme, UserPreferences} from "~/typeDefinitions";
import {getMetadataForImage} from "~/utilities";
import {getVernacularString} from "~/vernacularProvider";
import confettiAnimationData from "~/components/find-the-thief/confetti-lottie.json";
import Lottie from "lottie-react";

export function FirstRewardDialogComponent({userPreferences, buttonClickFunction}: {userPreferences: UserPreferences; buttonClickFunction: React.MouseEventHandler<HTMLButtonElement>}) {
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);
    const fetcher = useFetcher();
    const [couponCode, setCouponCode] = useState<string | null>(null);

    useEffect(() => {
        fetcher.submit(
            {},
            {
                action: "/find-the-thief/generate-coupon-code",
                method: "POST",
            },
        );
    }, []);

    useEffect(() => {
        if (fetcher.data != null) {
            if (fetcher.data.error != null) {
                toast(fetcher.data.error);
                return;
            }

            localStorage.setItem("couponCode", fetcher.data.couponCode);
            setCouponCode(fetcher.data.couponCode);
        }
    }, [fetcher.data]);

    const [isCodeCopied, setIsCodeCopied] = useState(false);

    return (
        <div className="tw-rounded-lg tw-h-full lg:tw-max-w-4xl tw-grid tw-place-self-center tw-items-center tw-justify-center tw-auto-rows-max lg:tw-grid-rows-1 lg:tw-grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg-bg-secondary-100 max-lg:tw-py-4 max-lg:tw-px-6">
            <div className="tw-rounded-lg tw-row-start-1 lg:tw-col-start-1 tw-grid tw-grid-flow-row tw-grid-rows-1 lg:tw-grid-rows-[repeat(3,auto)_minmax(0,1fr)] tw-h-full lg:tw-p-6 max-lg:tw-text-center">
                <div
                    className="lg-text-headline"
                    dangerouslySetInnerHTML={{__html: getVernacularString("6b3b89fd-ba28-481a-86ee-8932e25ef249", userPreferences.language)}}
                />
                <div
                    className="tw-text-[1.5rem] md:tw-text-[2.125rem] tw-leading-[1.75rem] md:tw-leading-[2.5rem] tw-text-secondary-900-light dark:tw-text-secondary-900-dark"
                    dangerouslySetInnerHTML={{__html: getVernacularString("9d0d2fb1-93ce-40e7-ae8a-afd396c7159f", userPreferences.language)}}
                />
                <VerticalSpacer className="tw-h-4 lg:tw-h-8" />
                <div className="tw-rounded-t-lg lg:tw-rounded-tl-lg tw-w-2/3 tw-max-w-xs tw-h-full tw-px-4 tw-grid tw-place-self-center tw-relative">
                    <FullWidthImage relativePath="/livguard/find-the-thief/treasure-inverter.png" />
                    <div className="tw-absolute tw-inset-0 tw-m-auto">
                        <Lottie
                            animationData={confettiAnimationData}
                            loop={true}
                            autoplay={true}
                        />
                    </div>
                </div>
            </div>

            <div className="tw-row-start-2 lg:tw-row-start-1 lg:tw-col-start-2 tw-grid tw-grid-flow-row tw-grid-rows-[auto_auto] lg:tw-auto-rows-max tw-py-4 lg:lg-bg-new-background-border-500 tw-rounded-lg lg:tw-p-6">
                <VerticalSpacer className="lg:tw-h-6" />

                <div className="lg-text-title1 tw-text-secondary-900-light dark:tw-text-secondary-900-dark">
                    {getVernacularString("011c1d97-5ae2-4392-b789-a422bc75b9ee", userPreferences.language)}
                </div>

                <VerticalSpacer className="lg:tw-h-2" />

                <div
                    className="lg-text-body"
                    dangerouslySetInnerHTML={{__html: getVernacularString("773cc962-c03e-4643-9f7b-bb9d6eeab67b", userPreferences.language)}}
                />

                <VerticalSpacer className="tw-h-6" />

                <div className="tw-grid tw-grid-flow-col tw-gap-x-3 tw-grid-cols-[1.5rem_auto]">
                    <div className="lg-bg-primary-500 !tw-text-secondary-900-dark tw-grid tw-place-items-center tw-w-full tw-aspect-square tw-rounded-full">1</div>
                    <div>{getVernacularString("4c03ff14-2235-45bd-a773-cf027c81fd86", userPreferences.language)}</div>
                </div>
                <VerticalSpacer className="tw-h-6" />

                {/* <div
                    onClick={() => {
                        if (couponCode != null) {
                            navigator.clipboard.writeText(couponCode);
                            setIsCodeCopied(true);
                        }
                    }}
                    className="tw-border-dashed tw-border lg-border-primary-500 tw-text-center tw-grid tw-rounded-full tw-relative tw-py-2"
                >
                    {couponCode == null ? (
                        <Oval
                            height={24}
                            width={24}
                            color={userPreferences.theme === Theme.Light ? "#1F2022" : "#F2F2F2"}
                            wrapperStyle={{}}
                            wrapperClass="lg:tw-col-span-full tw-justify-self-center"
                            ariaLabel="oval-loading"
                            secondaryColor={userPreferences.theme === Theme.Light ? "#474546" : "#F2F2F280"}
                            strokeWidth={4}
                            strokeWidthSecondary={4}
                        />
                    ) : (
                        couponCode
                    )}
                    <div className="tw-absolute -tw-top-6 tw-right-4">
                        {!isCodeCopied
                            ? getVernacularString("a71eedc4-b0f8-46b3-88d1-c7427315de8c", userPreferences.language)
                            : getVernacularString("eee1a98d-b9ab-4ee5-bde6-bcb2cdc26ece", userPreferences.language)}
                    </div>
                    <button
                        disabled={couponCode == null}
                        className="tw-absolute tw-bottom-0 tw-top-0 tw-my-auto tw-right-4 tw-h-6 tw-w-6"
                    >
                        <img
                            className={isCodeCopied ? "svg-icon-primary-color" : ""}
                            src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/find-the-thief/copy-icon.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
                        />
                    </button>
                </div>

                <VerticalSpacer className="tw-h-3" /> */}

                <div className="tw-grid tw-grid-flow-col tw-grid-cols-[max-content_auto] tw-gap-x-3">
                    <div className="lg-bg-primary-500 !tw-text-secondary-900-dark tw-grid tw-place-items-center tw-h-6 tw-w-6 tw-rounded-full">2</div>
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("8e337c72-d495-4840-9fcc-3670a8e9bd83", userPreferences.language)}} />
                </div>
                {/* <VerticalSpacer className="tw-h-3" />

                <div className="tw-grid tw-grid-flow-col tw-grid-cols-[max-content_auto] tw-gap-x-3">
                    <div className="lg-bg-primary-500 !tw-text-secondary-900-dark tw-grid tw-place-items-center tw-h-6 tw-w-6 tw-rounded-full">3</div>
                    <div>{getVernacularString("10f2f51f-a177-48ec-be50-990650be4f59", userPreferences.language)}</div>
                </div> */}

                <VerticalSpacer className="tw-h-10 md:tw-h-20" />

                <div
                    className="tw-place-self-center"
                    dangerouslySetInnerHTML={{__html: getVernacularString("e8190da2-de31-41e3-a749-f3e77acc2807", userPreferences.language)}}
                />

                <VerticalSpacer className="tw-h-2" />

                <button
                    onClick={buttonClickFunction}
                    className="lg-cta-button tw-place-self-center tw-w-fit lg:tw-px-24"
                >
                    {getVernacularString("bc3184f6-0f40-4633-bca8-1e9c2c21852a", userPreferences.language)}
                </button>

                <VerticalSpacer className="tw-h-4" />

                <Link
                    to="/terms-and-conditions/social-media"
                    className="tw-place-self-center lg-text-icon"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("98395654-ab14-47c2-9ba8-bb52a9297368", userPreferences.language)}} />
                </Link>
            </div>
        </div>
    );
}
