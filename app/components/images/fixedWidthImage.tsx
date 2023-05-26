import {useContext} from "react";
import {FixedWidthImageInternal} from "~/global-common-typescript/components/images/fixedWidthImage";
import {WebsiteConfigurationContext} from "~/global-common-typescript/contexts/websiteConfigurationContext";
import {getMetadataForImage} from "~/utilities";

export function FixedWidthImage({relativePath, width, className, loading}: {relativePath: string; width: string; className?: string; loading?: "eager" | "lazy"}) {
    const websiteConfiguration = useContext(WebsiteConfigurationContext);

    const imageMetadata = getMetadataForImage(relativePath);

    return (
        <FixedWidthImageInternal
            relativePath={relativePath}
            width={width}
            className={className}
            loading={loading}
            imageMetadata={imageMetadata}
            imageCdnProvider={websiteConfiguration.imageCdnProvider}
        />
    );
}
