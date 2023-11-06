import {Popover} from "@headlessui/react";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import React, {useContext} from "react";
import {useState} from "react";
import {ContentProviderContext} from "~/contexts/contentProviderContext";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import useMediaQuery from "~/global-common-typescript/hooks/useMediaQuery";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import type {SecondaryNavigationController} from "~/hooks/useSecondaryNavigationController";
import {scrollToElementById} from "~/utilities";

export function SecondaryNavigation({secondaryNavigationController}: {secondaryNavigationController: SecondaryNavigationController}) {
    const items = Object.entries(secondaryNavigationController.sections);
    const [isSecondaryNavOpenMobile, setIsSecondaryNavOpenMobile] = useState(false);
    const contentData = useContext(ContentProviderContext);

    return items.length == 0 ? null : (
        <React.Fragment>
            <div className="tw-w-full tw-fixed tw-left-0 tw-top-40 tw-z-[60] hover:tw-cursor-pointer">
                <div
                    className={concatenateNonNullStringsWithSpaces(
                        "tw-absolute tw-left-0 tw-grid tw-grid-cols-[auto_1.5rem] lg:tw-grid-cols-[auto_2rem] tw-grid-flow-col tw-transition-transform tw-duration-200",
                        isSecondaryNavOpenMobile ? "tw-translate-x-0" : " -tw-translate-x-[calc(100%-1.5rem)] lg:-tw-translate-x-[calc(100%-2rem)]",
                    )}
                >
                    <div className="lg-card lg-bg-secondary-100 tw-rounded-l-none tw-p-4 tw-grid tw-gap-y-2 tw-grid-cols-1 tw-w-max">
                        <ItemBuilder
                            items={items}
                            itemBuilder={(item, itemIndex) => (
                                <button
                                    type="button"
                                    className="tw-text-left tw-w-fit lg:hover:lg-text-primary-500"
                                    onClick={() => {
                                        scrollToElementById(item[0]);
                                        setIsSecondaryNavOpenMobile(false);
                                    }}
                                    key={itemIndex}
                                >
                                    <div className={item[1].isCurrentlyVisible ? "lg-text-primary-500" : ""}>{item[1].humanReadableName}</div>
                                </button>
                            )}
                        />
                    </div>
                    <div
                        className="max-lg:tw-self-center max-lg:tw-bg-gradient-to-r max-lg:tw-from-[#F25F60] max-lg:tw-to-[#EB2A2B] tw-py-4 tw-w-full tw-text-secondary-900-dark tw-justify-self-center tw-grid tw-place-items-center tw-rounded-r-xl lg:tw-relative max-lg:tw-py-8"
                        onClick={() => setIsSecondaryNavOpenMobile((prev) => !prev)}
                    >
                        <svg
                            className="tw-hidden lg:tw-block lg:tw-absolute lg:tw-h-full lg:tw-w-full lg:tw-inset-0"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="75"
                            viewBox="0 0 20 75"
                            fill="none"
                        >
                            <path
                                d="M-1 74.1666L12.7949 67.9877C16.9946 66.1065 19.6977 61.934 19.6977 57.3321V16.8344C19.6977 12.2326 16.9946 8.06004 12.7949 6.1789L-1 -4.57764e-05V74.1666Z"
                                fill="url(#paint0_linear_5947_401)"
                                fill-opacity="0.8"
                            />
                            <defs>
                                <linearGradient
                                    id="paint0_linear_5947_401"
                                    x1="43.3957"
                                    y1="12.8761"
                                    x2="-1.51067"
                                    y2="12.8761"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop
                                        offset="0.0352784"
                                        stop-color="#F25F60"
                                    />
                                    <stop
                                        offset="1"
                                        stop-color="#EB2A2B"
                                    />
                                </linearGradient>
                            </defs>
                        </svg>
                        {/* {isSecondaryNavOpenMobile ? <ChevronLeftIcon className="tw-h-6  lg:tw-h-8 lg:tw-z-10" /> : <ChevronRightIcon className="tw-h-6 lg:tw-h-8 lg:tw-z-10" />} */}

                        <div className="tw-rotate-90 tw-grid tw-w-[5rem] tw-items-center -tw-translate-x-6 tw-text-center max-lg:tw-text-[.75rem] max-lg:-tw-translate-x-7">
                            {contentData.getContent("2dfd3730-84d5-46ab-bc31-6f0a85dea07f")}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
