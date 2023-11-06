import {Link} from "@remix-run/react";
import {useContext, useEffect} from "react";
import {useInView} from "react-intersection-observer";
import {SimpleCoverImage} from "~/components/images/simpleCoverImage";
import {ContentProviderContext} from "~/contexts/contentProviderContext";
import {SecondaryNavigationControllerContext} from "~/contexts/secondaryNavigationControllerContext";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {Theme, UserPreferences} from "~/typeDefinitions";
import {secondaryNavThreshold} from "~/utilities";

export enum DialogType {
    initialDialog = 0,
    firstRewardDialog = 1,
    secondClueDialog = 2,
}

export function DealerLocator({
    userPreferences,
    showCtaButton,
    className,
    currentThiefLocation,
    setCurrentThiefLocation,
    setDialogType,
    setIsDialogOpen,
    secondaryNavigationName,
}: {
    userPreferences: UserPreferences;
    showCtaButton: boolean;
    className?: string;
    currentThiefLocation?: number | null;
    setCurrentThiefLocation?: React.Dispatch<number>;
    setDialogType?: React.Dispatch<DialogType>;
    setIsDialogOpen?: React.Dispatch<boolean>;
    secondaryNavigationName?: string;
}) {
    const contentData = useContext(ContentProviderContext);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "dealer-locator": {
                humanReadableName: secondaryNavigationName == null ? contentData.getContent("0cb6d442-7df4-4272-a36d-9f956bdd8a54") : contentData.getContent(secondaryNavigationName),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);

    return (
        <div
            id="dealer-locator"
            ref={sectionRef}
            className={concatenateNonNullStringsWithSpaces("[@media(max-width:1024px)]:lg-px-screen-edge tw-relative", className)}
        >
            <div className="tw-relative lg-card tw-h-[21.875rem] tw-overflow-hidden lg:tw-h-full lg:tw-min-h-[31.25rem] lg:tw-px-2">
                <div className="tw-flex tw-flex-col tw-absolute tw-m-auto tw-top-0 tw-left-0 tw-right-0 tw-bottom-0 tw-justify-center tw-items-center">
                    <div className="tw-absolute tw-inset-0">
                        <SimpleCoverImage relativePath={userPreferences.theme == Theme.Dark ? "/livguard/home/10/1-dark.jpg" : "/livguard/home/10/1-light.jpg"} />
                    </div>

                    <div className="tw-z-10 lg-text-headline tw-text-center">
                        <div dangerouslySetInnerHTML={{__html: contentData.getContent("homeS10H1T1")}} />
                        <div dangerouslySetInnerHTML={{__html: contentData.getContent("homeS10H1T2")}} />
                    </div>

                    <VerticalSpacer className="tw-h-1" />

                    <div className="tw-z-10 lg-text-title2 tw-text-center">{contentData.getContent("homeS10T2")}</div>

                    {showCtaButton && (
                        <>
                            <VerticalSpacer className="tw-h-6" />

                            <Link
                                to="/dealer-for-inverters-and-batteries"
                                className="tw-z-10 lg-cta-button"
                            >
                                {contentData.getContent("homeS10T3")}
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
