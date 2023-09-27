import {ArrowDownOnSquareStackIcon, DocumentIcon} from "@heroicons/react/20/solid";
import {Link} from "@remix-run/react";
import {useState} from "react";
import {PencilSquare} from "react-bootstrap-icons";
import {FixedWidthImage} from "~/components/images/fixedWidthImage";
import {Spacer} from "~/global-common-typescript/components/spacer";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {ContactUsDialog} from "~/routes";
import {UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";

export function ProductAndCategoryBottomBar({userPreferences, utmParameters, pageUrl}: {userPreferences: UserPreferences; utmParameters: {[searchParameter: string]: string}; pageUrl: string}) {
    const [isContactUsDialogOpen, setIsContactUsDialogOpen] = useState(false);

    function tryToOpenContactUsDialog() {
        setIsContactUsDialogOpen(true);
    }

    return (
        <div className="lg:tw-hidden tw-sticky tw-bottom-0 lg-bg-secondary-100 lg-card lg-sticky-bottom-bar-shadow tw-rounded-t-lg tw-grid tw-grid-cols-4 tw-py-[0.8125rem] tw-text-center tw-px-2 tw-z-[63]">
            <div className="tw-flex tw-flex-col tw-items-center tw-gap-y-2">
                <Link
                    to="/dealer-for-inverters-and-batteries"
                    className="tw-flex tw-flex-col tw-items-center tw-text-center tw-gap-y-2"
                >
                    <img
                        src="https://files.growthjockey.com/livguard/icons/bottom-bar/4.svg"
                        className="tw-w-6 tw-h-6 dark:tw-invert"
                    />
                    <div
                        className="lg-text-icon"
                        dangerouslySetInnerHTML={{
                            __html: getVernacularString("e9eefbbc-302b-4d0e-8736-8b124a4c9baf", userPreferences.language),
                        }}
                    />
                </Link>
            </div>

            <div className="tw-flex tw-flex-col tw-items-center tw-gap-y-2">
                <a
                    href="https://www.livguard.com/static-assets/livguard-ib-leaflet.pdf"
                    download
                    className="tw-flex tw-flex-col tw-items-center tw-text-center tw-gap-y-2"
                    target="_blank"
                >
                    <ArrowDownOnSquareStackIcon className="tw-w-6 tw-h-6 lg-secondary-900" />
                    <div
                        className="lg-text-icon"
                        dangerouslySetInnerHTML={{
                            __html: getVernacularString("f2e43648-a6bb-4144-a594-280b68479566", userPreferences.language),
                        }}
                    />
                </a>
            </div>

            <div className="tw-flex tw-flex-col tw-items-center tw-gap-y-2">
                <button
                    type="button"
                    onClick={tryToOpenContactUsDialog}
                    className="tw-flex tw-flex-col tw-items-center tw-text-center tw-gap-y-2"
                >
                    <PencilSquare className="tw-w-6 tw-h-6 lg-secondary-900" />
                    <div
                        className="lg-text-icon"
                        dangerouslySetInnerHTML={{
                            __html: getVernacularString("10ac51a9-2893-40c1-ad80-5017883e890f", userPreferences.language),
                        }}
                    />
                </button>
            </div>

            <div className="tw-flex tw-flex-col tw-items-center tw-gap-y-2">
                <a
                    href="tel:+919205667999"
                    className="tw-flex tw-flex-col tw-items-center tw-text-center tw-gap-y-2"
                >
                    <img
                        src="https://files.growthjockey.com/livguard/icons/bottom-bar/5.svg"
                        className="tw-w-6 tw-h-6 dark:tw-invert"
                    />
                    <div
                        className="lg-text-icon"
                        dangerouslySetInnerHTML={{
                            __html: getVernacularString("089e932e-69bf-479d-8c0b-21257fc4a8dc", userPreferences.language),
                        }}
                    />
                </a>
            </div>

            <ContactUsDialog
                userPreferences={userPreferences}
                isContactUsDialogOpen={isContactUsDialogOpen}
                setIsContactUsDialogOpen={setIsContactUsDialogOpen}
                utmParameters={utmParameters}
                pageUrl={pageUrl}
            />
        </div>
    );
}
