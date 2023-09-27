import {MouseEventHandler, useEffect, useState} from "react";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import thiefSvg from "~/components/find-the-thief/thief.svg";
import {Transition} from "@headlessui/react";

export function Thief({
    currentThiefLocation,
    onClick,
    thiefShowLocation,
    thiefClassName,
    direction,
}: {
    currentThiefLocation: number | null;
    onClick: MouseEventHandler<HTMLDivElement>;
    thiefShowLocation: number;
    thiefClassName?: string;
    direction: "left" | "right";
}) {
    return (
        <Transition
            as="div"
            enterFrom="tw-scale-0 tw-opacity-0"
            enterTo="tw-scale-100 tw-opacity-100"
            leaveFrom="tw-scale-100 tw-opacity-100"
            leaveTo="tw-scale-0 tw-opacity-0"
            show={currentThiefLocation === thiefShowLocation}
            onClick={onClick}
            className={concatenateNonNullStringsWithSpaces("tw-cursor-pointer tw-absolute tw-h-20 lg:tw-h-32 tw-aspect-auto tw-z-10 tw-transition-all tw-duration-1000", thiefClassName)}
        >
            <div className="tw-absolute tw-z-20 tw-h-full tw-w-full tw-opacity-0"></div>
            {/* TODO: Replace object with img */}
            <object
                type="image/svg+xml"
                data={thiefSvg}
                className={concatenateNonNullStringsWithSpaces("tw-h-full tw-z-10", direction === "right" ? "tw-scale-x-[-1]" : "")}
            >
                svg-animation
            </object>
        </Transition>
    );
}
