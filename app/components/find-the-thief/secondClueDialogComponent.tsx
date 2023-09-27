import {FullWidthImage} from "~/components/images/fullWidthImage";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import {UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";

export function SecondClueDialogComponent({userPreferences, buttonClickFunction}: {userPreferences: UserPreferences; buttonClickFunction: React.MouseEventHandler<HTMLButtonElement>}) {
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);
    return (
        <div className="lg-bg-secondary-100 lg:tw-max-w-4xl tw-h-full tw-grid tw-grid-flow-row lg:tw-grid-flow-col lg:tw-grid-cols-[minmax(0,1fr)_minmax(0,1fr)] tw-auto-rows-auto tw-rounded-lg lg:tw-justify-self-center">
            <div className="tw-row-start-1 lg:tw-col-start-1 tw-h-full">
                {isScreenSizeBelow ? (
                    <FullWidthImage
                        className="tw-rounded-t-lg"
                        relativePath="/livguard/find-the-thief/step-2-mobile.jpg"
                    />
                ) : (
                    <FullWidthImage
                        className="tw-rounded-l-lg"
                        relativePath="/livguard/find-the-thief/step-2-desktop.jpg"
                    />
                )}
            </div>

            <div className="tw-row-start-2 lg:tw-row-start-1 lg:tw-col-start-2 tw-grid tw-grid-flow-row tw-auto-rows-max tw-px-5 tw-py-4 lg:tw-py-6 lg:tw-content-center">
                <div className="lg-text-headline tw-text-secondary-900-light dark:tw-text-secondary-900-dark">
                    {getVernacularString("6dd8ca3b-6542-4fc4-81ce-6183b8359ec5", userPreferences.language)}
                </div>
                <div
                    className="lg-text-title1 tw-text-secondary-900-light dark:tw-text-secondary-900-dark"
                    dangerouslySetInnerHTML={{__html: getVernacularString("99a6da97-c8bf-4ce3-b95a-611ec00c880a", userPreferences.language)}}
                />

                <VerticalSpacer className="tw-h-2" />

                <div className="lg-text-body">{getVernacularString("23992b81-60ed-4164-9e5c-91dcc6752f39", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-4" />

                <img
                    src="https://files.growthjockey.com/livguard/icons/load-calculator-icon.svg"
                    className="tw-h-16 tw-w-16 tw-place-self-center"
                />

                <VerticalSpacer className="tw-h-6" />

                <div className="lg-text-body">{getVernacularString("7ec1488f-530c-40b6-a86b-dc2ea8840310", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-4" />

                <button
                    className="lg-cta-button tw-w-fit lg:tw-w-4/5 tw-place-self-center"
                    onClick={buttonClickFunction}
                >
                    {getVernacularString("3e9f691e-f760-4691-b6d8-85733ce4d416", userPreferences.language)}
                </button>
            </div>
        </div>
    );
}
