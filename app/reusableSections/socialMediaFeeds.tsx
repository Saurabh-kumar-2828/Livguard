import {useContext, useEffect, useState} from "react";
import {InstagramEmbed} from "react-social-media-embed/dist/components/embeds/InstagramEmbed.js";
import {ContentProviderContext} from "~/contexts/contentProviderContext";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {UserPreferences} from "~/typeDefinitions";

export function SocialMediaFeeds({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    enum SocialMediaPosts {
        facebook,
        instagram,
        twitter,
    }
    const posts = [
        {
            type: SocialMediaPosts.instagram,
            url: "https://www.instagram.com/p/Cy-ynRcI2dk/",
        },
        {
            type: SocialMediaPosts.instagram,
            url: "https://www.instagram.com/p/Cy-JcxvoX-j/",
        },
        {
            type: SocialMediaPosts.instagram,
            url: "https://www.instagram.com/p/Cy0AT3uobFO/",
        },
        {
            type: SocialMediaPosts.instagram,
            url: "https://www.instagram.com/p/CyVpgzRI4xi/",
        },
        {
            type: SocialMediaPosts.instagram,
            url: "https://www.instagram.com/p/CyQevh2I5EL/",
        },
        {
            type: SocialMediaPosts.instagram,
            url: "https://www.instagram.com/p/CyQUrMOofZ2/",
        },
        {
            type: SocialMediaPosts.instagram,
            url: "https://www.instagram.com/p/CyOIfogoCmF/",
        },
        {
            type: SocialMediaPosts.instagram,
            url: "https://www.instagram.com/p/CyFq1euI-yP/",
        },
        {
            type: SocialMediaPosts.instagram,
            url: "https://www.instagram.com/p/CyFyzSpo_Rq/",
        },
        {
            type: SocialMediaPosts.instagram,
            url: "https://www.instagram.com/p/CyIc-IWIRF2/",
        },
        {
            type: SocialMediaPosts.instagram,
            url: "https://www.instagram.com/p/Cx4b9zjoXx8/",
        },
        {
            type: SocialMediaPosts.instagram,
            url: "https://www.instagram.com/p/Cx4MiEhoCAe/",
        },
        // {
        //     type: SocialMediaPosts.instagram,
        //     url: "https://www.instagram.com/p/Cx13SgBo5-h/",
        // },
        // {
        //     type: SocialMediaPosts.instagram,
        //     url: "https://www.instagram.com/reel/Cydg6oOoSgU",
        // },
    ];

    const [documentState, setDocumentState] = useState<Document | undefined>(undefined);
    const [windowState, setWindowState] = useState<Window | undefined>(undefined);

    useEffect(() => {
        setDocumentState(document);
        setWindowState(window);
    }, []);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces(
                "lg-px-screen-edge-2 lg:tw-px-[72px] xl:tw-px-[120px] tw-py-6 md:tw-py-10 tw-w-full tw-grid tw-grid-flow-row lg-bg-new-background-border-500 tw-overflow-hidden",
                className,
            )}
        >
            <div
                className="lg-text-headline tw-text-center"
                dangerouslySetInnerHTML={{__html: contentData.getContent("f5a76b54-fbf2-4ae1-91a2-e61a0cf06541")}}
            />
            <VerticalSpacer className="tw-h-6 lg:tw-h-8" />
            <div className="tw-w-full tw-max-w-7xl tw-mx-auto tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-py-4 tw-max-h-[20rem] md:tw-max-h-[30rem] tw-gap-x-4 tw-gap-y-4 tw-h-fit tw-overflow-y-scroll">
                {documentState != undefined && windowState != undefined && (
                    <ItemBuilder
                        items={posts}
                        itemBuilder={(post, postIndex) => (
                            <div
                                className="tw-w-full tw-aspect-auto tw-overflow-x-hidden"
                                key={postIndex}
                            >
                                {/* {post.type === SocialMediaPosts.facebook && (
                                    <FacebookEmbed
                                        url={post.url}
                                        height={"100%"}
                                        width={"100%"}
                                        frame={{
                                            window: windowState,
                                            document: documentState,
                                        }}
                                    />
                                )} */}
                                {post.type === SocialMediaPosts.instagram && (
                                    <>
                                        {/* Please do not remove this comment */}
                                        {/* className="instagram-media" */}
                                        <InstagramEmbed
                                            url={post.url}
                                            height={"100%"}
                                            width={"100%"}
                                            frame={{
                                                window: windowState,
                                                document: documentState,
                                            }}
                                        />
                                        {/* <iframe
                                            src={`${post.url}/embed/captioned`}
                                            title="instagram"
                                            id={`instagramEmbed${postIndex}`}
                                            allowTransparency={true}
                                            allowFullScreen={true}
                                            style={{
                                                width: "calc(100% - 2px)",
                                                backgroundColor: "white",
                                                borderRadius: "3px",
                                                minWidth: "326px",
                                                padding: "0px",
                                            }}
                                        /> */}
                                    </>
                                )}
                                {/* {post.type === SocialMediaPosts.twitter && (
                                    <TwitterEmbed
                                        url={post.url}
                                        height={"100%"}
                                        width={"100%"}
                                    />
                                )} */}
                            </div>
                        )}
                    />
                )}
            </div>
        </div>
    );
}
