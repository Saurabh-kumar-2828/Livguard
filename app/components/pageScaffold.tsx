import {Link} from "@remix-run/react";
import {useEffect, useState} from "react";
import {CookieDialog} from "~/components/cookieDialog";
import {FindTheThiefDialog} from "~/components/find-the-thief/findTheThiefDialog";
import {InitialFindTheThiefDialogComponent} from "~/components/find-the-thief/initialFindTheThiefDialogComponent";
import {FooterComponent} from "~/components/footers/footerComponent";
import {HeaderComponent} from "~/components/headerComponent";
import {SecondaryNavigation} from "~/components/secondaryNavigation";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import useIsScreenSizeBelow from "~/hooks/useIsScreenSizeBelow";
import type {SecondaryNavigationController} from "~/hooks/useSecondaryNavigationController";
import type {UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";

export function PageScaffold({
    userPreferences,
    children,
    redirectTo,
    showMobileMenuIcon,
    utmParameters,
    breadcrumbs,
    pageUrl,
    secondaryNavigationController,
}: {
    userPreferences: UserPreferences;
    children: any;
    redirectTo: string;
    showMobileMenuIcon: boolean;
    utmParameters: {
        [searchParameter: string]: string;
    };
    breadcrumbs: Array<{contentId: string; link: string}>;
    pageUrl: string;
    secondaryNavigationController?: SecondaryNavigationController;
}) {
    const isScreenSizeBelow = useIsScreenSizeBelow(1024);

    const [isFindTheThiefDialogOpen, setIsFindTheThiefDialogOpen] = useState(false);
    const [isCookieDialogOpen, setIsCookieDialogOpen] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("cookiesAccepted") == null) {
            setIsFindTheThiefDialogOpen(false);
            return;
        }

        const treasureHuntStep = localStorage.getItem("treasureHuntStep");
        if (treasureHuntStep == null || treasureHuntStep == "0") {
            setIsFindTheThiefDialogOpen(true);
        }
    }, []);

    useEffect(() => {
        const treasureHuntStep = localStorage.getItem("treasureHuntStep");
        if (isCookieDialogOpen === false && localStorage.getItem("cookiesAccepted") != null && (treasureHuntStep == null || treasureHuntStep === "0")) {
            setTimeout(() => {
                setIsFindTheThiefDialogOpen(true);
            }, 1000);
        }
    }, [isCookieDialogOpen]);

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
                    pageUrl={pageUrl}
                />

                <FindTheThiefDialog
                    isDialogOpen={isFindTheThiefDialogOpen}
                    setIsDialogOpen={setIsFindTheThiefDialogOpen}
                    userPreferences={userPreferences}
                    showSunraysPattern={false}
                >
                    <InitialFindTheThiefDialogComponent
                        userPreferences={userPreferences}
                        buttonClickFunction={() => {
                            setIsFindTheThiefDialogOpen(false);
                            localStorage.setItem("treasureHuntStep", "1");
                            window.dispatchEvent(new Event("treasureHuntInitiated"));
                        }}
                    />
                </FindTheThiefDialog>

                <CookieDialog
                    userPreferences={userPreferences}
                    isCookieDialogOpen={isCookieDialogOpen}
                    setIsCookieDialogOpen={setIsCookieDialogOpen}
                />
            </div>
        </>
    );
}
