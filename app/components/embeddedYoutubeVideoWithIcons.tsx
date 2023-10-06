import {useState} from "react";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ImageCdnProvider} from "~/common--type-definitions/typeDefinitions";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {getMetadataForImage} from "~/utilities";

export function EmbeddedYoutubeVideoWithIcons({id, className, style, containerClassName}: {id: string; className?: string; style?: any; containerClassName?: string}) {
    const [showIcons, setShowIcons] = useState(true);

    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-relative tw-w-full tw-h-full", containerClassName)}>
            {showIcons && (
                <div className="tw-w-full tw-grid tw-grid-cols-4 tw-gap-x-2 lg:tw-gap-x-4 tw-px-3 lg:tw-px-14 tw-absolute tw-top-[0.375rem] lg:tw-top-[0.75rem] tw-justify-items-center tw-pointer-events-none">
                    <div className="tw-w-[3.75rem] tw-h-[3.75rem] lg:tw-h-[6.25rem] lg:tw-w-[6.25rem] tw-rounded-full">
                        <img
                            className="tw-brightness-0 tw-invert tw-h-full tw-w-full"
                            src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/international/icons/energy.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
                        />
                    </div>

                    <div className="tw-w-[3.75rem] tw-h-[3.75rem] lg:tw-h-[6.25rem] lg:tw-w-[6.25rem] tw-rounded-full">
                        <img
                            className="tw-brightness-0 tw-invert tw-h-full tw-w-full"
                            src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/international/icons/innovation.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
                        />
                    </div>

                    <div className="tw-w-[3.75rem] tw-h-[3.75rem] lg:tw-h-[6.25rem] lg:tw-w-[6.25rem] tw-rounded-full">
                        <img
                            className="tw-brightness-0 tw-invert tw-h-full tw-w-full"
                            src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/international/icons/excellence.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
                        />
                    </div>

                    <div className="tw-w-[3.75rem] tw-h-[3.75rem] lg:tw-h-[6.25rem] lg:tw-w-[6.25rem] tw-rounded-full">
                        <img
                            className="tw-brightness-0 tw-invert tw-h-full tw-w-full"
                            src={getAbsolutePathForRelativePath(getMetadataForImage("/livguard/international/icons/technology.svg").finalUrl, ImageCdnProvider.Bunny, null, null)}
                        />
                    </div>
                </div>
            )}

            <iframe
                title="Youtube"
                aria-hidden="true"
                className={concatenateNonNullStringsWithSpaces("tw-w-full tw-h-full", className)}
                style={style}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                webkitallowfullscreen="true"
                mozallowfullscreen="true"
                srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube.com/embed/${id}/?autoplay=1><img src=https://img.youtube.com/vi/${id}/hqdefault.jpg><span>▶</span></a>`}
            ></iframe>
        </div>
    );
}
