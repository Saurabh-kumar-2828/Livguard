import {Link} from "@remix-run/react";
import {FixedWidthImage} from "~/global-common-typescript/components/fixedWidthImage";
import {ImageCdnProvider} from "~/global-common-typescript/components/growthJockeyImage";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";

export function StickyBottomBar({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="tw-sticky tw-bottom-0 lg-bg-secondary-300 tw-rounded-t-lg tw-grid tw-grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] tw-py-[0.8125rem] tw-text-center tw-z-50">
            <div className="tw-row-start-1 tw-col-start-2">
                <Link
                    to="/"
                    className="tw-flex tw-flex-col tw-items-center tw-text-center tw-gap-y-2"
                >
                    <object
                        data="https://files.growthjockey.com/livguard/icons/bottom-bar/1.svg"
                        className="tw-w-6 tw-h-6 dark:tw-invert tw-pointer-events-none"
                    />

                    <div className="lg-text-icon">{getVernacularString("bottomBarT1", userPreferences.language)}</div>
                </Link>
            </div>

            <div className="tw-row-start-1 tw-col-start-4 tw-flex tw-flex-col tw-items-center tw-gap-y-2">
                <Link
                    to="/category/inverters"
                    className="tw-flex tw-flex-col tw-items-center tw-text-center tw-gap-y-2 tw-relative"
                >
                    <object
                        data="https://files.growthjockey.com/livguard/icons/bottom-bar/2.svg"
                        className="tw-w-6 tw-h-6 dark:tw-invert tw-pointer-events-none"
                    />
                    <div className="lg-text-icon">{getVernacularString("bottomBarT2", userPreferences.language)}</div>

                    {/* <div className="lg-bg-primary-500 tw-rounded-full tw-text-icon tw-text-secondary-900-dark tw-absolute -tw-top-5 tw-right-0 tw-left-0 tw-mx-auto tw-text-center tw-text-[0.6rem]">
                        Trending
                    </div> */}
                </Link>
            </div>

            {/* TODO: Figure out the top properly */}
            <div className="tw-row-start-1 tw-col-start-6 tw-h-[2.875rem] tw-relative tw-top-[-1.7rem] tw-flex tw-flex-col tw-items-center tw-overflow-visible tw-gap-y-[0.4rem]">
                <Link
                    to="/load-calculator"
                    className="tw-flex tw-flex-col tw-items-center tw-text-center tw-gap-y-2"
                >
                    <img
                        src="https://growthjockey.imgix.net/livguard/bottom-bar/load-calculator.gif"
                        width={64}
                        height={64}
                        className="tw-w-14 tw-h-14 tw-rounded-full"
                    />

                    <div className="lg-text-icon">{getVernacularString("bottomBarT3", userPreferences.language)}</div>
                </Link>
            </div>

            <div className="tw-row-start-1 tw-col-start-8 tw-flex tw-flex-col tw-items-center tw-gap-y-2">
                <Link
                    to="/dealer-locator"
                    className="tw-flex tw-flex-col tw-items-center tw-text-center tw-gap-y-2"
                >
                    <object
                        data="https://files.growthjockey.com/livguard/icons/bottom-bar/4.svg"
                        className="tw-w-6 tw-h-6 dark:tw-invert tw-pointer"
                    />
                    <div className="lg-text-icon">{getVernacularString("bottomBarT4", userPreferences.language)}</div>
                </Link>
            </div>

            <div className="tw-row-start-1 tw-col-start-10 tw-flex tw-flex-col tw-items-center tw-gap-y-2">
                <a
                    href="tel:18001025551"
                    className="tw-flex tw-flex-col tw-items-center tw-text-center tw-gap-y-2"
                >
                    <a href="tel:18001025551">
                        <object
                            data="https://files.growthjockey.com/livguard/icons/bottom-bar/5.svg"
                            className="tw-w-6 tw-h-6 dark:tw-invert tw-pointer-events-none"
                        />
                    </a>

                    <div className="lg-text-icon">{getVernacularString("bottomBarT5", userPreferences.language)}</div>
                </a>
            </div>
        </div>
    );
}
