import {useContext} from "react";
import {FullWidthImageInternal} from "~/global-common-typescript/components/images/fullWidthImage";
import {WebsiteConfigurationContext} from "~/global-common-typescript/contexts/websiteConfigurationContext";
import {getMetadataForImage} from "~/utilities";

export function FullWidthImage({relativePath, className, loading}: {relativePath: string; className?: string; loading?: "eager" | "lazy"}) {
    const websiteConfiguration = useContext(WebsiteConfigurationContext);

    const imageMetadata = getMetadataForImage(relativePath);

    return (
        <FullWidthImageInternal
            relativePath={relativePath}
            className={className}
            loading={loading}
            imageMetadata={imageMetadata}
            imageCdnProvider={websiteConfiguration.imageCdnProvider}
            resolutionMultiplier={1.5}
        />
    );
}
