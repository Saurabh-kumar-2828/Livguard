import {createContext} from "react";
import {ImageCdnProvider} from "~/global-common-typescript/components/growthJockeyImage";
import {WebsiteConfiguration} from "~/typeDefinitions";

export const WebsiteConfigurationContext = createContext<WebsiteConfiguration>({
    websiteBaseUrl: "localhost:3000",
    debugMode: false,
    imageCdnProvider: ImageCdnProvider.GrowthJockey,
});
