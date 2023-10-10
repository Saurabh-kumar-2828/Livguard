import {useContext, useEffect} from "react";
import {useInView} from "react-intersection-observer";
import {Accordion} from "~/components/accordian";
import {ContentProviderContext} from "~/contexts/contentProviderContext";
import {SecondaryNavigationControllerContext} from "~/contexts/secondaryNavigationControllerContext";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {UserPreferences} from "~/typeDefinitions";
import {secondaryNavThreshold} from "~/utilities";

export function FaqSectionInternal({
    userPreferences,
    className,
    faqs,
    textClassName,
}: {
    userPreferences: UserPreferences;
    className?: string;
    faqs: Array<{
        question: string;
        answer: string;
    }>;
    textClassName?: string;
}) {
    const contentData = useContext(ContentProviderContext);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            faq: {
                humanReadableName: contentData.getContent("3479de37-c724-4254-a536-acf8c8de4c20"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("tw-h-full tw-w-full lg-px-screen-edge tw-max-w-7xl tw-mx-auto", className)}
            id="faq"
            ref={sectionRef}
        >
            <div className="tw-h-full tw-grid tw-grid-rows-[auto,minmax(0,1fr),auto] lg:tw-grid-rows-[fit-content_minmax(0,1fr)_auto_(minmax(0,1fr)_auto] tw-gap-x-4 tw-gap-y-4">
                <div className="tw-row-start-1 lg:tw-row-start-1 lg:tw-col-start-1 lg:tw-col-span-full tw-flex tw-flex-col">
                    <div className={concatenateNonNullStringsWithSpaces("lg-text-headline tw-text-center", textClassName)}>
                        <div dangerouslySetInnerHTML={{__html: `${contentData.getContent("homeS9H1T1")} ${contentData.getContent("homeS9H1T2")}`}} />
                    </div>

                    <VerticalSpacer className="tw-h-2" />

                    <div className={concatenateNonNullStringsWithSpaces("lg-text-body tw-text-center", textClassName)}>
                        <div>
                            {contentData.getContent("homeS9T2P1")} {contentData.getContent("homeS9T2P2")}
                        </div>
                    </div>
                </div>

                <div className="tw-row-start-2 lg:tw-row-start-2 lg:tw-col-start-1 lg:tw-col-span-full tw-flex tw-flex-col tw-gap-y-3">
                    <ItemBuilder
                        items={faqs}
                        itemBuilder={(item, itemIndex) => (
                            <Accordion
                                title={contentData.getContent(item.question)}
                                panelItem={
                                    <div
                                        className="lg-text-secondary-900"
                                        key={itemIndex}
                                    >
                                        <div dangerouslySetInnerHTML={{__html: contentData.getContent(item.answer)}} />
                                    </div>
                                }
                                key={itemIndex}
                            />
                        )}
                    />
                </div>

                <div
                    className={concatenateNonNullStringsWithSpaces(
                        "tw-w-full tw-row-start-3 lg:tw-row-start-3 lg:tw-col-start-1 lg:tw-self-end lg:tw-justify-self-center lg:tw-col-span-full lg-text-body tw-text-center",
                        textClassName,
                    )}
                >
                    <div>{contentData.getContent("homeS9T3P1")}</div>
                    <div>
                        {contentData.getContent("homeS9T3P2")}{" "}
                        <a
                            href="tel:18001025551"
                            className="tw-underline"
                        >
                            {contentData.getContent("homeS9T3P3")}
                        </a>{" "}
                        {contentData.getContent("homeS9T3P4")}
                    </div>
                </div>
            </div>
        </div>
    );
}
