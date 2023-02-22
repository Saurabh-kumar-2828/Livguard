import {FixedWidthImage} from "~/global-common-typescript/components/fixedWidthImage";
import {ImageCdnProvider} from "~/global-common-typescript/components/growthJockeyImage";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";

export function StickyBottomBar({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="tw-sticky tw-bottom-0 lg-bg-secondary-300 tw-rounded-t-lg tw-grid tw-grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] tw-py-[0.8125rem] tw-text-center tw-z-50">
            <div className="tw-row-start-1 tw-col-start-2 tw-flex tw-flex-col tw-items-center tw-text-center tw-gap-y-2">
                {/* <div className="tw-w-8 tw-h-8 tw-rounded-full lg-bg-secondary-500" /> */}
                {/* <FixedWidthImage
                    relativePath="/livguard/bottom-bar/home-inverter.png"
                    width="2rem"
                    imageCdnProvider={ImageCdnProvider.Imgix}
                /> */}
                <object
                    data="https://files.growthjockey.com/livguard/icons/bottom-bar/1.svg"
                    className="tw-w-6 tw-h-6 dark:tw-invert"
                />
                <div className="lg-text-icon">
                    {getVernacularString("bottomBarT1", userPreferences.language)}
                </div>
            </div>

            <div className="tw-row-start-1 tw-col-start-4 tw-flex tw-flex-col tw-items-center tw-gap-y-2">
                <object
                    data="https://files.growthjockey.com/livguard/icons/bottom-bar/2.svg"
                    className="tw-w-6 tw-h-6 dark:tw-invert"
                />
                <div className="lg-text-icon">
                    {getVernacularString("bottomBarT2", userPreferences.language)}
                </div>
            </div>

            {/* TODO: Figure out the top properly */}
            <div className="tw-row-start-1 tw-col-start-6 tw-h-[2.875rem] tw-relative tw-top-[-1.7rem] tw-flex tw-flex-col tw-items-center tw-overflow-visible tw-gap-y-[0.4rem]">
                <img
                    src="https://growthjockey.imgix.net/livguard/bottom-bar/load-calculator.gif"
                    width={64}
                    height={64}
                    className="tw-w-14 tw-h-14 tw-rounded-full"
                />
                <div className="lg-text-icon">
                    {getVernacularString("bottomBarT3", userPreferences.language)}
                </div>
            </div>

            <div className="tw-row-start-1 tw-col-start-8 tw-flex tw-flex-col tw-items-center tw-gap-y-2">
                <object
                    data="https://files.growthjockey.com/livguard/icons/bottom-bar/4.svg"
                    className="tw-w-6 tw-h-6 dark:tw-invert"
                />
                <div className="lg-text-icon">
                    {getVernacularString("bottomBarT4", userPreferences.language)}
                </div>
            </div>

            <div className="tw-row-start-1 tw-col-start-10 tw-flex tw-flex-col tw-items-center tw-gap-y-2">
                <object
                    data="https://files.growthjockey.com/livguard/icons/bottom-bar/5.svg"
                    className="tw-w-6 tw-h-6 dark:tw-invert"
                />
                <div className="lg-text-icon">
                    {getVernacularString("bottomBarT5", userPreferences.language)}
                </div>
            </div>
        </div>
    );
}
