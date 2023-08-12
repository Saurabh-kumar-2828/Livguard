import {useContext} from "react";
import {FullHeightImageInternal} from "~/global-common-typescript/components/images/fullHeightImage";
import {WebsiteConfigurationContext} from "~/global-common-typescript/contexts/websiteConfigurationContext";
import {getMetadataForImage} from "~/utilities";

export function FullHeightImage({relativePath, className, loading}: {relativePath: string; className?: string, loading?: "eager" | "lazy"}) {
    const websiteConfiguration = useContext(WebsiteConfigurationContext);

    const imageMetadata = getMetadataForImage(relativePath);

    return (
        <FullHeightImageInternal
            relativePath={relativePath}
            className={className}
            loading={loading}
            imageMetadata={imageMetadata}
            imageCdnProvider={websiteConfiguration.imageCdnProvider}
            resolutionMultiplier={1.5}
        />
    );
}
