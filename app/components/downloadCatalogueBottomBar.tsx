import {DocumentIcon} from "@heroicons/react/20/solid";
import {FixedWidthImage} from "~/global-common-typescript/components/fixedWidthImage";
import {ImageCdnProvider} from "~/global-common-typescript/components/growthJockeyImage";
import {Spacer} from "~/global-common-typescript/components/spacer";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";

export function DownloadCatalogueBottomBar({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="tw-sticky tw-bottom-0 lg-bg-secondary-300 tw-rounded-t-lg tw-flex tw-flex-row tw-py-[0.8125rem] tw-text-center tw-justify-between tw-px-10 tw-z-50">
            <div className="tw-flex tw-flex-row tw-items-center tw-text-center lg-bg-secondary-100 tw-rounded-3xl tw-p-2 tw-px-5">
                <a
                    href="https://files.growthjockey.com/livguard/files/livguard-ib-leaflet.pdf"
                    download
                    className="tw-flex tw-flex-row tw-items-center"
                    target="_blank"
                >
                    <FixedWidthImage
                        relativePath="/livguard/icons/downloadCatalogue.png"
                        width="1.5rem"
                        imageCdnProvider={ImageCdnProvider.GrowthJockey}
                    />
                    <Spacer className="tw-w-2" />
                    <div className="lg-text-icon">{getVernacularString("downloadCatalogueBottomBarT1", userPreferences.language)}</div>
                </a>
            </div>

            <div className="tw-flex tw-flex-row tw-items-center tw-text-center tw-bg-gradient-to-r tw-from-[#F25F60] tw-to-[#EB2A2B] tw-rounded-3xl tw-p-2 tw-px-5">
                <FixedWidthImage
                    relativePath="/livguard/icons/enquire_now.png"
                    width="1.5rem"
                    imageCdnProvider={ImageCdnProvider.GrowthJockey}
                />
                <Spacer className="tw-w-2" />
                <div className="lg-text-icon">{getVernacularString("landingPageBottomBarT2", userPreferences.language)}</div>
            </div>
        </div>
    );
}
