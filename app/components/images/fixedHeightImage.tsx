import {useContext} from "react";
import {FixedHeightImageInternal} from "~/global-common-typescript/components/images/fixedHeightImage";
import {WebsiteConfigurationContext} from "~/global-common-typescript/contexts/websiteConfigurationContext";
import {getMetadataForImage} from "~/utilities";

export function FixedHeightImage({relativePath, height, className, loading}: {relativePath: string; height: string; className?: string; loading?: "eager" | "lazy"}) {
    const websiteConfiguration = useContext(WebsiteConfigurationContext);

    const imageMetadata = getMetadataForImage(relativePath);

    return (
        <FixedHeightImageInternal
            relativePath={relativePath}
            height={height}
            className={className}
            loading={loading}
            imageMetadata={imageMetadata}
            imageCdnProvider={websiteConfiguration.imageCdnProvider}
            resolutionMultiplier={1.5}
        />
    );
}
