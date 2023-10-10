import {useState} from "react";
import {CookieDialog} from "~/components/cookieDialog";
import {CampaignFooterComponent} from "~/components/footers/campaignFooterComponent";
import {HeaderComponent} from "~/components/headerComponent";
import {SecondaryNavigation} from "~/components/secondaryNavigation";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {SecondaryNavigationController} from "~/hooks/useSecondaryNavigationController";
import type {UserPreferences} from "~/typeDefinitions";

export function CampaignPageScaffold({
    userPreferences,
    children,
    redirectTo,
    showMobileMenuIcon,
    utmParameters,
    breadcrumbs,
    showContactCtaButton,
    showSearchOption,
    pageUrl,
    secondaryNavigationController,
}: {
    userPreferences: UserPreferences;
    children: any;
    redirectTo: string;
    showMobileMenuIcon: boolean;
    utmParameters: {
        [searchParameter: string]: string;
    };
    breadcrumbs?: Array<{humanReadableString: string; link: string}>;
    showContactCtaButton: boolean;
    showSearchOption: boolean;
    pageUrl: string;
    secondaryNavigationController?: SecondaryNavigationController;
}) {
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);
    const [isCookieDialogOpen, setIsCookieDialogOpen] = useState(false);
    return (
        <>
            {/* tw-grid tw-grid-rows-[auto_1fr_auto] tw-grid-flow-col tw-min-h-screen */}
            <div className="tw-flex tw-flex-col tw-items-stretch tw-min-h-screen">
                <HeaderComponent
                    userPreferences={userPreferences}
                    redirectTo={redirectTo}
                    showMobileMenuIcon={showMobileMenuIcon}
                    showSearchOption={showSearchOption}
                    showContactCtaButton={showContactCtaButton}
                    showContactDetails={false}
                    pageUrl={pageUrl}
                />

                {children}
                <div className="tw-flex-grow" />

                {secondaryNavigationController?.sections && <SecondaryNavigation secondaryNavigationController={secondaryNavigationController} />}
                {/* <VerticalSpacer className="tw-h-[5rem] lg:tw-h-[10rem]" /> */}

                <CampaignFooterComponent
                    utmParameters={utmParameters}
                    userPreferences={userPreferences}
                />

                {/* <FooterComponent
                    userPreferences={userPreferences}
                    utmParameters={utmParameters}
                /> */}

                {/* Suppress Haptik on campaign pages */}
                <style
                    dangerouslySetInnerHTML={{
                        __html: `
                        #haptik-xdk-wrapper {
                            display: none !important;
                        }

                        iframe#haptik-xdk-main-view {
                            display: none !important;
                        }

                        iframe.xdk-iframe {
                            display: none !important;
                        }
                    `,
                    }}
                />
                {/* /Suppress Haptik on campaign pages */}
            </div>

            <CookieDialog
                isCookieDialogOpen={isCookieDialogOpen}
                setIsCookieDialogOpen={setIsCookieDialogOpen}
                userPreferences={userPreferences}
            />
        </>
    );
}
