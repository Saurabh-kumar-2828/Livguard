import {useContext} from "react";
import {ContentProviderContext} from "~/contexts/contentProviderContext";
import {OfferContactUsCta} from "~/components/offerContactUsCta";
import {UserPreferences} from "~/typeDefinitions";

export function OfferPageBottomBar({userPreferences, pageUrl}: {userPreferences: UserPreferences; pageUrl: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className="tw-sticky tw-bottom-0 lg-bg-secondary-100 lg-card lg-sticky-bottom-bar-shadow tw-rounded-t-lg tw-flex tw-flex-row tw-py-[0.8125rem] tw-text-center tw-justify-center tw-gap-x-10 tw-px-10 tw-z-[63] lg:tw-hidden">
            <OfferContactUsCta
                userPreferences={userPreferences}
                textVernacId="offerPageCta"
                pageUrl={pageUrl}
            />
            {/* <div className="tw-bg-gradient-to-r tw-from-[#F25F60] tw-to-[#EB2A2B] tw-rounded-3xl tw-p-2 tw-px-10">
                <a
                    href="tel:18001025551"
                    className="tw-flex tw-flex-row tw-items-center tw-text-center"
                >
                    <FixedWidthImage
                        relativePath="/livguard/icons/enquire_now.png"
                        width="1.5rem"
                    />
                    <Spacer className="tw-w-2" />
                    <div className="lg-text-body !tw-text-[#FFFFFF]">{contentData.getContent("landingPageBottomBarT2")}</div>
                </a>
            </div> */}
        </div>
    );
}
