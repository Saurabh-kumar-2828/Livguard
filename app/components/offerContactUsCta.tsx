import {useContext, useState} from "react";
import {FixedWidthImage} from "~/components/images/fixedWidthImage";
import {ContentProviderContext} from "~/contexts/contentProviderContext";
import {useUtmSearchParameters} from "~/global-common-typescript/utilities/utmSearchParameters";
import {OfferContactUsDialog} from "~/components/offerContactUsDialog";
import {UserPreferences} from "~/typeDefinitions";

export function OfferContactUsCta({userPreferences, textVernacId, className, pageUrl}: {userPreferences: UserPreferences; textVernacId: string; className?: string; pageUrl: string}) {
    const contentData = useContext(ContentProviderContext);
    const [isOfferContactUsDialogOpen, setIsOfferContactUsDialogOpen] = useState(false);
    const utmParameters = useUtmSearchParameters();

    function tryToOpenOfferContactUsDialog() {
        setIsOfferContactUsDialogOpen(true);
    }

    return (
        <div className={className}>
            <button
                type="button"
                className="lg-cta-button !tw-px-6 tw-grid tw-grid-flow-col tw-gap-2 tw-items-center"
                onClick={tryToOpenOfferContactUsDialog}
            >
                <FixedWidthImage
                    relativePath="/livguard/icons/enquire_now.png"
                    width="1.25rem"
                />

                {contentData.getContent(textVernacId)}
            </button>

            <OfferContactUsDialog
                userPreferences={userPreferences}
                isOfferContactUsDialogOpen={isOfferContactUsDialogOpen}
                setIsOfferContactUsDialogOpen={setIsOfferContactUsDialogOpen}
                utmParameters={utmParameters}
                pageUrl={pageUrl}
            />
        </div>
    );
}
