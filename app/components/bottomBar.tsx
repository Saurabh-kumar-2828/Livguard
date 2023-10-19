import {Link} from "@remix-run/react";
import {useContext, useState} from "react";
import SupportDialog from "~/components/supportDialog";
import {ContentProviderContext} from "~/contexts/contentProviderContext";
import {UserPreferences} from "~/typeDefinitions";

export function StickyBottomBar({userPreferences}: {userPreferences: UserPreferences}) {
    const contentData = useContext(ContentProviderContext);
    const [isSupportDialogOpen, setIsSupportDialogOpen] = useState(false);

    const tryToCloseSupportDialog = () => {
        setIsSupportDialogOpen(false);
    };
    return (
        <div className="tw-sticky lg:tw-hidden tw-bottom-0 lg-bg-secondary-100 lg-card lg-sticky-bottom-bar-shadow tw-rounded-t-lg tw-grid tw-grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] tw-py-[0.8125rem] tw-text-center tw-z-[63]">
            <div className="tw-row-start-1 tw-col-start-2">
                <Link
                    to="/energy-solutions"
                    className="tw-flex tw-flex-col tw-items-center tw-text-center tw-gap-y-2"
                >
                    <img
                        src="https://files.growthjockey.com/livguard/icons/bottom-bar/energy-solution.svg"
                        className="tw-w-6 tw-h-6 dark:tw-invert"
                    />
                    <div
                        className="lg-text-icon"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("e39f4d11-25b9-44e9-a976-057e24ad9b7f")}}
                    />
                </Link>
            </div>

            <div className="tw-row-start-1 tw-col-start-4 tw-flex tw-flex-col tw-items-center tw-gap-y-2">
                <Link
                    to="/dealer-for-inverters-and-batteries"
                    className="tw-flex tw-flex-col tw-items-center tw-text-center tw-gap-y-2"
                >
                    <img
                        src="https://files.growthjockey.com/livguard/icons/bottom-bar/dealer.svg"
                        className="tw-w-6 tw-h-6 dark:tw-invert"
                    />
                    <div className="lg-text-icon">{contentData.getContent("bottomBarT4")}</div>
                </Link>
            </div>

            {/* TODO: Figure out the top properly */}
            <div className="tw-row-start-1 tw-col-start-6 tw-h-[2.875rem] tw-relative tw-top-[-1.7rem] tw-flex tw-flex-col tw-items-center tw-overflow-visible tw-gap-y-[0.4rem]">
                <Link
                    to="/load-calculator"
                    className="tw-flex tw-flex-col tw-items-center tw-text-center tw-gap-y-2"
                >
                    <img
                        // src="https://growthjockey.imgix.net/livguard/bottom-bar/load-calculator.gif"
                        src="https://files.growthjockey.com/livguard/icons/load-calculator-icon.svg"
                        width={64}
                        height={64}
                        className="tw-w-14 tw-h-14 tw-rounded-full"
                    />
                    <div
                        className="lg-text-icon"
                        dangerouslySetInnerHTML={{__html: contentData.getContent("fd934962-ffce-41c6-ac8d-ebee55615f2b")}}
                    />
                </Link>
            </div>

            <div className="tw-row-start-1 tw-col-start-8 tw-flex tw-flex-col tw-items-center tw-gap-y-2">
                <Link
                    to="/pricing"
                    className="tw-flex tw-flex-col tw-items-center tw-text-center tw-gap-y-2"
                >
                    <img
                        src="https://files.growthjockey.com/livguard/icons/bottom-bar/pricing.svg"
                        className="tw-w-6 tw-h-6 dark:tw-invert"
                    />
                    <div className="lg-text-icon">{contentData.getContent("c13afdef-ed06-4b83-be72-772fbb7a5706")}</div>
                </Link>
            </div>

            <div className="tw-row-start-1 tw-col-start-10 tw-flex tw-flex-col tw-items-center tw-gap-y-2">
                <div
                    onClick={() => setIsSupportDialogOpen(true)}
                    className="tw-flex tw-flex-col tw-items-center tw-text-center tw-gap-y-2"
                >
                    <img
                        src="https://files.growthjockey.com/livguard/icons/bottom-bar/support.svg"
                        className="tw-w-6 tw-h-6 dark:tw-invert"
                    />

                    <div className="lg-text-icon">{contentData.getContent("bottomBarT5")}</div>
                </div>
            </div>

            <SupportDialog
                isSupportDialogOpen={isSupportDialogOpen}
                tryToCloseSupportDialog={tryToCloseSupportDialog}
            />
        </div>
    );
}
