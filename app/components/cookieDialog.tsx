import {useEffect, useState} from "react";
import {X} from "react-bootstrap-icons";
import {HorizontalSpacer} from "~/global-common-typescript/components/horizontalSpacer";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import type {UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";

export function CookieDialog({
    userPreferences,
    isCookieDialogOpen,
    setIsCookieDialogOpen,
}: {
    userPreferences: UserPreferences;
    isCookieDialogOpen: boolean;
    setIsCookieDialogOpen: React.Dispatch<boolean>;
}) {
    useEffect(() => {
        const cookiesAccepted = localStorage.getItem("cookiesAccepted");
        if (cookiesAccepted == null) {
            setIsCookieDialogOpen(true);
        }
    }, []);

    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-bottom-[4.5rem] lg:tw-bottom-0 tw-w-full tw-z-[65]", isCookieDialogOpen ? "tw-absolute" : "tw-hidden")}>
            {/* Enable this div if an overlay behind the dialog is needed */}
            {/* <div
                className="tw-fixed tw-inset-0 tw-bg-black/30"
                aria-hidden="true"
            /> */}
            <div className="tw-w-full tw-fixed tw-bottom-0 tw-grid tw-items-center tw-justify-center lg-card lg-bg-secondary-100 tw-rounded-none">
                <div className="tw-grid tw-auto-rows-auto lg:tw-grid-rows-1 tw-grid-cols-1 lg:tw-auto-cols-auto lg-px-screen-edge-2 tw-py-4 lg:tw-py-6 tw-self-center">
                    <button
                        onClick={() => {
                            setIsCookieDialogOpen(false);
                            localStorage.setItem("cookiesAccepted", "false");
                            window.dispatchEvent(new Event("cookiesAccepted"));
                        }}
                        className="tw-row-start-1 lg:tw-col-start-5 tw-self-start tw-justify-self-end"
                    >
                        <X className="tw-h-8 tw-w-8" />
                    </button>

                    <HorizontalSpacer className="max-lg:tw-hidden tw-w-4 lg:tw-col-start-4" />

                    <HorizontalSpacer className="max-lg:tw-hidden tw-w-4 lg:tw-col-start-2" />

                    <div
                        className="tw-row-start-2 lg:tw-row-start-1 lg:tw-col-start-1 tw-self-center"
                        dangerouslySetInnerHTML={{__html: getVernacularString("c5054f84-2266-408e-87f1-bf4cce619706", userPreferences.language)}}
                    />

                    <VerticalSpacer className="tw-row-start-3 lg:tw-hidden tw-h-4" />

                    <button
                        onClick={() => {
                            setIsCookieDialogOpen(false);
                            localStorage.setItem("cookiesAccepted", "true");
                            window.dispatchEvent(new Event("cookiesAccepted"));
                        }}
                        className="tw-row-start-4 lg:tw-row-start-1 lg:tw-col-start-3 tw-h-fit lg-cta-button tw-self-end tw-text-center"
                    >
                        {getVernacularString("286eb099-4488-4fa6-a2aa-23132972a9de", userPreferences.language)}
                    </button>
                </div>
            </div>

            {/* <Popover className="tw-relative">
                <Popover.Panel className="tw-absolute tw-bottom-0 tw-z-10 tw-w-full tw-h-fit tw-opacity-100 lg-card lg-bg-secondary-100 tw-grid tw-items-center tw-pb-10 tw-pt-4 lg:tw-py-10">
                    <div className="tw-grid tw-auto-rows-auto lg:tw-grid-rows-1 tw-grid-cols-1 lg:tw-auto-cols-auto lg-px-screen-edge-2 tw-self-center">
                        <Popover.Button className="tw-row-start-1 lg:tw-col-start-4 tw-self-start tw-justify-self-end">
                            <X className="tw-h-8 tw-w-8" />
                        </Popover.Button>

                        <HorizontalSpacer className="max-lg:tw-hidden tw-w-4 lg:tw-col-start-3" />

                        <div className="tw-row-start-2 lg:tw-row-start-1 lg:tw-col-start-1 tw-self-center">
                            {getVernacularString("c5054f84-2266-408e-87f1-bf4cce619706", userPreferences.language)}
                        </div>

                        <VerticalSpacer className="tw-row-start-3 lg:tw-hidden tw-h-4" />

                        <Popover.Button className="tw-row-start-4 lg:tw-row-start-1 lg:tw-col-start-2 tw-h-fit lg-cta-button tw-self-end tw-text-center">
                            {getVernacularString("286eb099-4488-4fa6-a2aa-23132972a9de", userPreferences.language)}
                        </Popover.Button>
                    </div>
                </Popover.Panel>
                <Popover.Button>Cookie Policy</Popover.Button>
            </Popover> */}
        </div>
    );
}
