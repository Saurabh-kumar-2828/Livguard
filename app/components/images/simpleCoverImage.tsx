import {twMerge} from "tailwind-merge";
import {ImageCdnProvider} from "~/common--type-definitions/typeDefinitions";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {getMetadataForImage} from "~/utilities";

export function SimpleCoverImage({relativePath, className, loading}: {relativePath: string; className?: string; loading?: "eager" | "lazy"}) {
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
        <div className={twMerge("tw-w-full tw-h-full", className)}>
            <img
                className="tw-w-full tw-h-full tw-object-cover"
                style={{
                    aspectRatio: `${imageMetadata.width}/${imageMetadata.height}`,
                }}
                srcSet={srcSet}
                sizes={sizes}
                src={getAbsolutePathForRelativePath(imageMetadata.finalUrl, ImageCdnProvider.Bunny, null, null)}
                loading={loading ?? "lazy"}
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
