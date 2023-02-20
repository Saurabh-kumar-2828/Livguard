import {FixedWidthImage} from "~/global-common-typescript/components/fixedWidthImage";
import {ImageCdnProvider} from "~/global-common-typescript/components/growthJockeyImage";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {UserPreferences} from "~/typeDefinitions";

export function StickyBottomBar({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="tw-sticky tw-bottom-0 lg-bg-secondary-300 tw-rounded-t-lg tw-grid tw-grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] tw-py-[0.8125rem] tw-text-center">
            <div className="tw-row-start-1 tw-col-start-2 tw-flex tw-flex-col tw-items-center tw-text-center tw-gap-y-1">
                {/* <div className="tw-w-8 tw-h-8 tw-rounded-full lg-bg-secondary-500" /> */}
                {/* <FixedWidthImage
                    relativePath="/livguard/bottom-bar/home-inverter.png"
                    width="2rem"
                    imageCdnProvider={ImageCdnProvider.GrowthJockey}
                /> */}
                <object
                    data="https://files.growthjockey.com/livguard/icons/bottom-bar/1.svg"
                    className="tw-w-8 tw-h-8 dark:tw-invert"
                />
                <div className="lg-text-icon">
                    Home
                    <br />
                    Inverters
                </div>
            </div>

            <div className="tw-row-start-1 tw-col-start-4 tw-flex tw-flex-col tw-items-center tw-gap-y-1">
                <object
                    data="https://files.growthjockey.com/livguard/icons/bottom-bar/2.svg"
                    className="tw-w-8 tw-h-8 dark:tw-invert"
                />
                <div className="lg-text-icon">
                    Other
                    <br />
                    Products
                </div>
            </div>

            {/* TODO: Figure out the top properly */}
            <div className="tw-row-start-1 tw-col-start-6 tw-h-[2.875rem] tw-relative tw-top-[-1.7rem] tw-flex tw-flex-col tw-items-center tw-overflow-visible tw-gap-y-1">
                <img
                    src="https://growthjockey.imgix.net/livguard/bottom-bar/load-calculator.gif"
                    width={64}
                    height={64}
                    className="tw-rounded-full"
                />
                <VerticalSpacer className="tw-h-1" />
                <div className="lg-text-icon">
                    Plan My
                    <br />
                    Power
                </div>
            </div>

            <div className="tw-row-start-1 tw-col-start-8 tw-flex tw-flex-col tw-items-center tw-gap-y-1">
                <object
                    data="https://files.growthjockey.com/livguard/icons/bottom-bar/4.svg"
                    className="tw-w-8 tw-h-8 dark:tw-invert"
                />
                <div className="lg-text-icon">
                    Find My
                    <br />
                    Dealer
                </div>
            </div>

            <div className="tw-row-start-1 tw-col-start-10 tw-flex tw-flex-col tw-items-center tw-gap-y-1">
                <object
                    data="https://files.growthjockey.com/livguard/icons/bottom-bar/5.svg"
                    className="tw-w-8 tw-h-8 dark:tw-invert"
                />
                <div className="lg-text-icon">
                    Contact
                    <br />
                    Support
                </div>
            </div>
        </div>
    );
}
