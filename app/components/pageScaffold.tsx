import {Link} from "@remix-run/react";
import {FooterComponent} from "~/components/footerComponent";
import {HeaderComponent} from "~/components/headerComponent";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";

export function PageScaffold({
    userPreferences,
    children,
    redirectTo,
    showMobileMenuIcon,
    utmParameters,
    breadcrumbs,
}: {
    userPreferences: UserPreferences;
    children: any;
    redirectTo: string;
    showMobileMenuIcon: boolean;
    utmParameters: {
        [searchParameter: string]: string;
    };
    breadcrumbs: Array<{contentId: string; link: string}>;
}) {
    return (
        <>
            {/* tw-grid tw-grid-rows-[auto_1fr_auto] tw-grid-flow-col tw-min-h-screen */}
            <div className="tw-flex tw-flex-col tw-items-stretch tw-min-h-screen">
                <HeaderComponent
                    userPreferences={userPreferences}
                    redirectTo={redirectTo}
                    showMobileMenuIcon={showMobileMenuIcon}
                    showSearchOption={true}
                    showContactCtaButton={false}
                />

                {children}
                <div className="tw-flex-grow" />

                {breadcrumbs == null ? null : (
                    <div className="lg-px-screen-edge lg-bg-secondary-100 lg:tw-bg-[#b1b1b1] tw-flex tw-flex-row tw-items-center tw-py-1">
                        <ItemBuilder
                            items={breadcrumbs}
                            itemBuilder={(item, itemIndex) => (
                                <Link
                                    to={item.link}
                                    key={itemIndex}
                                >
                                    {getVernacularString(item.contentId, userPreferences.language)}
                                </Link>
                            )}
                            spaceBuilder={(spaceIndex) => (
                                // <CaretRight className="tw-w-8 tw-h-4 tw-px-2" key={spaceIndex} />
                                <div
                                    className="tw-px-2"
                                    key={spaceIndex}
                                >
                                    {">"}
                                </div>
                            )}
                        />
                    </div>
                )}

                <FooterComponent
                    userPreferences={userPreferences}
                    utmParameters={utmParameters}
                />
            </div>
        </>
    );
}
