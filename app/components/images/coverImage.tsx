import {useContext} from "react";
import {CoverImageInternal} from "~/global-common-typescript/components/images/coverImage";
import {WebsiteConfigurationContext} from "~/global-common-typescript/contexts/websiteConfigurationContext";
import {getMetadataForImage} from "~/utilities";

export function CoverImage({relativePath, className, loading}: {relativePath: string; className?: string, loading?: "eager" | "lazy"}) {
    const websiteConfiguration = useContext(WebsiteConfigurationContext);

    const imageMetadata = getMetadataForImage(relativePath);

    return (
        <CoverImageInternal
            relativePath={relativePath}
            className={className}
            loading={loading}
            imageMetadata={imageMetadata}
            imageCdnProvider={websiteConfiguration.imageCdnProvider}
        />
    );
}