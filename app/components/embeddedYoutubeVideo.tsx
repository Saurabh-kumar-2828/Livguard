import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";

export function EmbeddedYoutubeVideo({id, className, style, containerClassName}: {id: string; className?: string, style?: any, containerClassName?: string}) {
    return (
        <div className={containerClassName}>
            <iframe
                title="Youtube"
                aria-hidden="true"
                className={concatenateNonNullStringsWithSpaces("tw-w-full", className)}
                style={style}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                webkitallowfullscreen="true"
                mozallowfullscreen="true"
                srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube.com/embed/${id}/?autoplay=1><img src=https://img.youtube.com/vi/${id}/hqdefault.jpg><span>▶</span></a>`}
                loading="lazy"
            ></iframe>
        </div>
    );
}
