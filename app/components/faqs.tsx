import {Accordion} from "~/components/accordian";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";

export function FAQSection({
    userPreferences,
    className,
    faqs,
}: {
    userPreferences: UserPreferences;
    className?: string;
    faqs: Array<{
        question: string;
        answer: string;
    }>;
}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("lg-px-screen-edge", className)}>
            <div className="tw-grid tw-grid-rows-[auto,minmax(0,1fr),auto] lg:tw-grid-rows-[auto,(minmax(0,1fr)] lg:tw-grid-cols-[minmax(0,2fr),minmax(0,3fr)] tw-gap-y-4">
                <div className="tw-row-start-1 lg:tw-row-start-1 lg:tw-col-start-1 tw-flex tw-flex-col">
                    <div className="lg-text-headline tw-text-center lg:tw-text-left">
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS9H1T1", userPreferences.language)}} />
                        <div dangerouslySetInnerHTML={{__html: getVernacularString("homeS9H1T2", userPreferences.language)}} />
                    </div>

                    <VerticalSpacer className="tw-h-4" />

                    <div className="lg-text-body tw-text-center lg:tw-text-left">
                        <div>{getVernacularString("homeS9T2P1", userPreferences.language)}</div>
                        <div>{getVernacularString("homeS9T2P2", userPreferences.language)}</div>
                    </div>
                </div>

                <div className="tw-row-start-2 lg:tw-row-start-1 lg:tw-col-start-2 lg:tw-row-span-full tw-flex tw-flex-col tw-gap-y-3">
                    <ItemBuilder
                        items={faqs}
                        itemBuilder={(item, itemIndex) => (
                            <Accordion
                                title={getVernacularString(item.question, userPreferences.language)}
                                panelItem={
                                    <div
                                        className="lg-text-secondary-900"
                                        key={itemIndex}
                                    >
                                        <div dangerouslySetInnerHTML={{__html: getVernacularString(item.answer, userPreferences.language)}} />
                                    </div>
                                }
                                key={itemIndex}
                            />
                        )}
                    />
                </div>

                <div className="tw-row-start-3 lg:tw-row-start-2 lg:tw-col-start-1 lg-text-body tw-text-center lg:tw-text-left lg:tw-w-[25rem]">
                    <div>{getVernacularString("homeS9T3P1", userPreferences.language)}</div>
                    <div>
                        {getVernacularString("homeS9T3P2", userPreferences.language)}{" "}
                        <a
                            href="tel:18001025551"
                            className="tw-underline"
                        >
                            {getVernacularString("homeS9T3P3", userPreferences.language)}
                        </a>{" "}
                        {getVernacularString("homeS9T3P4", userPreferences.language)}
                    </div>
                </div>
            </div>
        </div>
    );
}
