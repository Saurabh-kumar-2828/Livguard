import {useState} from "react";
import {FixedWidthImage} from "~/components/images/fixedWidthImage";
import {Spacer} from "~/global-common-typescript/components/spacer";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {ContactUsDialog} from "~/routes";
import {UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";

export function StickyLandingPage3BottomBar({
    userPreferences,
    utmParameters,
    pageUrl,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
    pageUrl: string;
}) {
    return (
        <div className="tw-sticky tw-bottom-0 lg-bg-secondary-100 lg-card lg-sticky-bottom-bar-shadow tw-rounded-t-lg tw-flex tw-flex-row tw-py-[0.8125rem] tw-text-center tw-justify-center tw-gap-x-10 tw-px-10 tw-z-[63] lg:tw-hidden">
            <div className="tw-bg-gradient-to-r tw-from-[#F25F60] tw-to-[#EB2A2B] tw-rounded-3xl tw-p-2 tw-px-5">
                <a
                    href="#contact-us-form-mobile"
                    className="tw-flex tw-flex-row tw-items-center tw-text-center"
                >
                    <FixedWidthImage
                        relativePath="/livguard/icons/enquire_now.png"
                        width="1.5rem"
                    />
                    <Spacer className="tw-w-2" />
                    <div className="lg-text-icon tw-text-[#FFFFFF]">{getVernacularString("landingPageBottomBarT2", userPreferences.language)}</div>
                </a>
            </div>
        </div>
    );
}
