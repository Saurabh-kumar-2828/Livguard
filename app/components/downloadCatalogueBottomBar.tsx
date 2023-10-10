import {DocumentIcon} from "@heroicons/react/20/solid";
import {useContext} from "react";
import {FixedWidthImage} from "~/components/images/fixedWidthImage";
import {ContentProviderContext} from "~/contexts/contentProviderContext";
import {Spacer} from "~/global-common-typescript/components/spacer";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {UserPreferences} from "~/typeDefinitions";

export function DownloadCatalogueBottomBar({userPreferences}: {userPreferences: UserPreferences}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className="lg:tw-hidden tw-sticky tw-bottom-0 lg-bg-secondary-100 lg-card lg-sticky-bottom-bar-shadow tw-rounded-t-lg tw-flex tw-flex-row tw-py-[0.8125rem] tw-text-center tw-justify-between lg:tw-justify-center lg:tw-gap-10 tw-px-2 tw-z-[63]">
            <div className="tw-flex tw-flex-row tw-items-center tw-text-center lg-bg-secondary-100 tw-rounded-3xl tw-p-2 tw-px-5">
                <a
                    href="https://www.livguard.com/static-assets/livguard-ib-leaflet.pdf"
                    download
                    className="tw-flex tw-flex-row tw-items-center"
                    target="_blank"
                >
                    <FixedWidthImage
                        relativePath="/livguard/icons/downloadCatalogue.png"
                        width="1.5rem"
                    />
                    <Spacer className="tw-w-2" />
                    <div className="lg-text-icon">{contentData.getContent("downloadCatalogueBottomBarT1")}</div>
                </a>
            </div>

            <div className="tw-bg-gradient-to-r tw-from-[#F25F60] tw-to-[#EB2A2B] tw-rounded-3xl tw-p-2 tw-px-5">
                <a
                    href="tel:18001025551"
                    className="tw-flex tw-flex-row tw-items-center tw-text-center"
                >
                    <FixedWidthImage
                        relativePath="/livguard/icons/enquire_now.png"
                        width="1.5rem"
                    />
                    <Spacer className="tw-w-2" />
                    <div className="lg-text-icon tw-text-[#FFFFFF]">{contentData.getContent("landingPageBottomBarT2")}</div>
                </a>
            </div>
        </div>
    );
}
