import {Link} from "@remix-run/react";
import {useContext} from "react";
import {DefaultImageAnimation} from "~/components/defaultImageAnimation";
import {FixedWidthImage} from "~/components/images/fixedWidthImage";
import {ContentProviderContext} from "~/contexts/contentProviderContext";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {UserPreferences} from "~/typeDefinitions";

// TODO: Rename to something sensible
// TODO: Remove the other occurence
export function MiniPowerPlannerTeaser({userPreferences, className}: {userPreferences: UserPreferences; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={className}>
            <div className="tw-h-full lg:lg-card tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center tw-p-6 tw-rounded-lg">
                <h2 className="tw-flex tw-flex-col [@media(max-width:1024px)]:lg-text-headline lg:lg-text-title2 tw-text-center tw-whitespace-nowrap">
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent("c4c839c0-582d-4f53-be91-6730977f87aa")}} />
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent("aab3e140-baaf-46ce-a405-be90c45ef157")}} />
                </h2>

                <VerticalSpacer className="tw-h-4" />

                <div>{contentData.getContent("5591c0ca-fe8b-42ae-8154-d7bab6ce721e")}</div>

                <VerticalSpacer className="tw-h-4" />

                <DefaultImageAnimation className="">
                    <FixedWidthImage
                        relativePath="/livguard/products/super-life-combo/thumbnail.png"
                        width="10rem"
                    />
                </DefaultImageAnimation>

                <VerticalSpacer className="tw-h-4" />

                <div className="tw-row-start-4 tw-col-start-1 lg:tw-row-start-5 lg:tw-col-start-2 lg-px-screen-edge tw-flex tw-flex-col tw-items-center">
                    <Link
                        to="/load-calculator"
                        className=" lg-cta-button"
                    >
                        {contentData.getContent("homeS5T6")}
                    </Link>
                </div>
            </div>
        </div>
    );
}
