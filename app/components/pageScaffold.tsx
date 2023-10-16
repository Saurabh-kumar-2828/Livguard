import {Link} from "@remix-run/react";
import {useContext, useEffect, useState} from "react";
import {Whatsapp} from "react-bootstrap-icons";
import {CookieDialog} from "~/components/cookieDialog";
import {FindTheThiefDialog} from "~/components/find-the-thief/findTheThiefDialog";
import {InitialFindTheThiefDialogComponent} from "~/components/find-the-thief/initialFindTheThiefDialogComponent";
import {FooterComponent} from "~/components/footers/footerComponent";
import {HeaderComponent} from "~/components/headerComponent";
import {SecondaryNavigation} from "~/components/secondaryNavigation";
import {ContentProviderContext} from "~/contexts/contentProviderContext";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import type {SecondaryNavigationController} from "~/hooks/useSecondaryNavigationController";
import type {UserPreferences} from "~/typeDefinitions";

export function PageScaffold({
    userPreferences,
    children,
    redirectTo,
    showMobileMenuIcon,
    utmParameters,
    breadcrumbs,
    pageUrl,
    secondaryNavigationController,
    doNotOpenDialogue,
}: {
    userPreferences: UserPreferences;
    children: any;
    redirectTo: string;
    showMobileMenuIcon: boolean;
    doNotOpenDialogue?: string | null;
    utmParameters: {
        [searchParameter: string]: string;
    };
    breadcrumbs: Array<{contentId: string; link: string}>;
    pageUrl: string;
    secondaryNavigationController?: SecondaryNavigationController;
}) {
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);
    const contentData = useContext(ContentProviderContext);
    const [isCookieDialogOpen, setIsCookieDialogOpen] = useState(false);

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
                    showContactDetails={true}
                    pageUrl={pageUrl}
                />

                <Link
                    to="https://api.whatsapp.com/send?phone=9599198444"
                    className="tw-fixed tw-z-[64] tw-bottom-[8.3125rem] sm:tw-bottom-[2.875rem] tw-right-4 tw-w-[3rem] tw-aspect-square tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-bg-[#25D366] lg:tw-hidden tw-text-secondary-100-light"
                >
                    <Whatsapp className="tw-w-[1.75rem] tw-h-[1.75rem]" />
                </Link>

                {children}
                <div className="tw-flex-grow" />

                {secondaryNavigationController?.sections && <SecondaryNavigation secondaryNavigationController={secondaryNavigationController} />}

                {breadcrumbs == null ? null : (
                    <div className="lg-px-screen-edge lg-card tw-flex tw-flex-row tw-items-center tw-py-1">
                        <ItemBuilder
                            items={breadcrumbs}
                            itemBuilder={(item, itemIndex) => (
                                <Link
                                    to={item.link}
                                    key={itemIndex}
                                >
                                    {contentData.getContent(item.contentId)}
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
                    pageUrl={pageUrl}
                />

                <CookieDialog
                    userPreferences={userPreferences}
                    isCookieDialogOpen={isCookieDialogOpen}
                    setIsCookieDialogOpen={setIsCookieDialogOpen}
                />
            </div>
        </>
    );
}
