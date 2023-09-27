import {CoverImage} from "~/components/images/coverImage";
import {FullHeightImage} from "~/components/images/fullHeightImage";
import {FullWidthImage} from "~/components/images/fullWidthImage";

import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";

export function InitialFindTheThiefDialogComponent({userPreferences, buttonClickFunction}: {userPreferences: UserPreferences; buttonClickFunction: React.MouseEventHandler<HTMLButtonElement>}) {
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);

    return (
        <div className="tw-overflow-hidden tw-rounded-lg tw-h-full lg:tw-max-w-4xl tw-grid tw-place-self-center tw-items-center tw-justify-center tw-grid-rows-[auto_auto] lg:tw-grid-rows-1 lg:tw-grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg-bg-secondary-100 tw-relative">
            <div className="tw-overflow-hidden tw-absolute tw-w-full tw-h-full tw-z-10 dark:tw-opacity-[30%]">
                <CoverImage
                    imageClassName="tw-rounded-lg"
                    relativePath="/livguard/find-the-thief/step-1-pattern.svg"
                />
            </div>
            <div className="tw-rounded-lg tw-row-start-1 lg:tw-col-start-1 tw-grid tw-grid-flow-row tw-grid-rows-1 tw-h-full tw-z-20">
                {isScreenSizeBelow ? (
                    <FullWidthImage
                        className="tw-rounded-t-lg lg:tw-rounded-tl-lg"
                        relativePath="/livguard/find-the-thief/step-1-mobile.jpg"
                    />
                ) : (
                    <FullWidthImage relativePath="/livguard/find-the-thief/step-1-desktop.jpg" />
                )}
            </div>

            <div className="tw-rounded-lg tw-row-start-2 lg:tw-row-start-1 lg:tw-col-start-2 tw-grid tw-grid-flow-row tw-grid-rows-[auto_auto] lg:tw-grid-rows-2 tw-p-4 lg:tw-p-8 max-lg:tw-text-center tw-z-20">
                <div className="tw-row-start-1 tw-grid tw-pb-4 tw-grid-flow-row">
                    <div className="lg-text-headline !tw-text-secondary-900-light dark:!tw-text-secondary-900-dark">
                        {getVernacularString("58790af6-e242-4064-9f92-8c7af56524f9", userPreferences.language)}
                    </div>
                    <div
                        className="lg-text-title2 !tw-text-secondary-900-light dark:!tw-text-secondary-900-dark"
                        dangerouslySetInnerHTML={{__html: getVernacularString("474f66f2-b713-4581-85de-39cad89f813f", userPreferences.language)}}
                    />

                    <VerticalSpacer className="tw-h-6" />

                    <div
                        className="lg-text-body"
                        dangerouslySetInnerHTML={{__html: getVernacularString("a8794019-66aa-4fa3-bd6d-4376e703626e", userPreferences.language)}}
                    />
                </div>
                <div className="tw-row-start-2 tw-grid tw-content-end">
                    <VerticalSpacer className="tw-h-6 lg:tw-hidden" />

                    <div
                        className="lg-text-body"
                        dangerouslySetInnerHTML={{__html: getVernacularString("850e8c45-a6a4-428b-9e11-4acd93205160", userPreferences.language)}}
                    />

                    <VerticalSpacer className="tw-h-4" />

                    <button
                        onClick={buttonClickFunction}
                        className="lg-cta-button max-lg:tw-place-self-center tw-w-fit lg:tw-px-24 lg:tw-py-4"
                    >
                        {getVernacularString("af17ff8e-ce85-491e-ba24-b430a512162a", userPreferences.language)}
                    </button>
                </div>
            </div>
        </div>
    );
}
