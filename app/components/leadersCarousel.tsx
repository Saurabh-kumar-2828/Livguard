import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import Autoplay from "embla-carousel-autoplay";
import {StarFill} from "react-bootstrap-icons";
import {FixedWidthImage} from "~/components/images/fixedWidthImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces, getIntegerArrayOfLength} from "~/global-common-typescript/utilities/utilities";
import {useEmlbaCarouselWithIndex} from "~/hooks/useEmlbaCarouselWithIndex";
import {UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";

export function LeadersCarousel({userPreferences, leaders}: {userPreferences: UserPreferences; leaders: Array<{image: string; name: string; designation: string; bio: string}>}) {
    const {emblaRef, emblaApi, selectedIndex} = useEmlbaCarouselWithIndex({loop: true}, 8000);

    return (
        <div className="lg:tw-h-full">
            <div
                className="tw-overflow-hidden lg:tw-h-full"
                ref={emblaRef}
            >
                <div className="tw-grid tw-grid-flow-col tw-auto-cols-[100%] tw-text-secondary-900-dark lg:tw-h-full tw-gap-x-2">
                    <ItemBuilder
                        items={leaders}
                        itemBuilder={(leader, leaderIndex) => (
                            <div
                                className="[@media(max-width:1024px)]:lg-px-screen-edge tw-pt-5 lg:tw-h-full"
                                key={leaderIndex}
                            >
                                <div className="tw-h-full tw-relative lg-bg-primary-500 tw-rounded-lg tw-p-6">
                                    <div className="tw-grid tw-grid-cols-[auto_auto] tw-grid-rows-[minmax(0,calc(8rem-2.75rem))] tw-justify-between tw-items-end">
                                        <FixedWidthImage
                                            relativePath={leader.image}
                                            width="8rem"
                                            className="tw-rounded-full"
                                        />

                                        <div className="tw-h-full tw-flex tw-flex-row tw-items-start tw-gap-x-4">
                                            <button
                                                type="button"
                                                className="tw-rounded-full tw-p-1 tw-border tw-border-solid tw-border-secondary-900-dark"
                                                onClick={() => emblaApi?.scrollPrev()}
                                            >
                                                <ChevronLeftIcon className="tw-w-6 tw-h-6" />
                                            </button>

                                            <button
                                                type="button"
                                                className="tw-rounded-full tw-p-1 tw-border tw-border-solid tw-border-secondary-900-dark"
                                                onClick={() => emblaApi?.scrollNext()}
                                            >
                                                <ChevronRightIcon className="tw-w-6 tw-h-6" />
                                            </button>
                                        </div>
                                    </div>

                                    <VerticalSpacer className="tw-h-4" />

                                    <div className="tw-flex tw-flex-col">
                                        <div className="lg-text-headline !tw-text-secondary-900-dark">{getVernacularString(leader.name, userPreferences.language)}</div>

                                        <VerticalSpacer className="tw-h-1" />

                                        <div className="lg-text-title2 !tw-text-secondary-900-dark">{getVernacularString(leader.designation, userPreferences.language)}</div>

                                        <VerticalSpacer className="tw-h-4" />

                                        <div className="lg-text-body !tw-text-secondary-900-dark">{getVernacularString(leader.bio, userPreferences.language)}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}
