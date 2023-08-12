import {useContext, useEffect} from "react";
import {FullWidthImageInternal} from "~/global-common-typescript/components/images/fullWidthImage";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {WebsiteConfigurationContext} from "~/global-common-typescript/contexts/websiteConfigurationContext";
import {ImageCdnProvider} from "~/global-common-typescript/typeDefinitions";
import {getMetadataForImage} from "~/utilities";

export function FullWidthImage({relativePath, className, loading}: {relativePath: string; className?: string; loading?: "eager" | "lazy"}) {
    const websiteConfiguration = useContext(WebsiteConfigurationContext);

    const imageMetadata = getMetadataForImage(relativePath);

    // TODO: Optimize later with useMemo
    const screenWidths = [480, 720, 1280, 1366, 1920, 2560, 3840];
    const srcSet = screenWidths.map((size) => `${getAbsolutePathForRelativePath(imageMetadata.finalUrl, ImageCdnProvider.Bunny, size, null)} ${size}w`).join(", ");
    const sizes = screenWidths.map((size) => `(max-width: ${size}px) ${size}w`).join(", ");
    return (
        // <img
        //     src={getAbsolutePathForRelativePath(imageMetadata.finalUrl, ImageCdnProvider.Bunny, null, null)}
        //     style={{aspectRatio: `${imageMetadata.width}/${imageMetadata.height}`}}
        // />
        <div className="tw-w-full">
            <img
                className="tw-w-full"
                style={{
                    aspectRatio: `${imageMetadata.width}/${imageMetadata.height}`,
                }}
                srcSet={srcSet}
                sizes={sizes}
                src={getAbsolutePathForRelativePath(imageMetadata.finalUrl, ImageCdnProvider.Bunny, null, null)}
            />
        </div>
        // <FullWidthImageInternal
        //     relativePath={relativePath}
        //     className={className}
        //     loading={loading}
        //     imageMetadata={imageMetadata}
        //     imageCdnProvider={websiteConfiguration.imageCdnProvider}
        //     resolutionMultiplier={1.5}
        // />
    );
}