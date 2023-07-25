import {FooterSocialLogosAndCopyright} from "~/components/footers/common";
import type {UserPreferences} from "~/typeDefinitions";

export function CampaignFooterComponent({
    userPreferences,
    utmParameters,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
}) {
    return (
        <FooterSocialLogosAndCopyright
            userPreferences={userPreferences}
            className="tw-w-full"
        />
    );
}
