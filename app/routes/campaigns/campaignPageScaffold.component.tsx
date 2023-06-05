import {FooterComponent, FooterSocialLogosAndCopyright} from "~/components/footerComponent";
import {HeaderComponent} from "~/components/headerComponent";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {UserPreferences} from "~/typeDefinitions";

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
    pageUrl?: string;
}) {
    return (
        <>
            {/* tw-grid tw-grid-rows-[auto_1fr_auto] tw-grid-flow-col tw-min-h-screen */}
            <div className="tw-flex tw-flex-col tw-items-stretch tw-min-h-screen">
                <HeaderComponent
                    userPreferences={userPreferences}
                    redirectTo={redirectTo}
                    showMobileMenuIcon={showMobileMenuIcon}
                    breadcrumbs={breadcrumbs}
                    showSearchOption={showSearchOption}
                    showContactCtaButton={showContactCtaButton}
                    pageUrl={pageUrl}
                />

                {children}
                <div className="tw-flex-grow" />

                {/* <VerticalSpacer className="tw-h-[5rem] lg:tw-h-[10rem]" /> */}

                <FooterSocialLogosAndCopyright
                    userPreferences={userPreferences}
                    className="tw-w-full"
                />
                {/* <FooterComponent
                    userPreferences={userPreferences}
                    utmParameters={utmParameters}
                /> */}
            </div>
        </>
    );
}
