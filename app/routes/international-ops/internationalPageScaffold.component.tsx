import {useContext} from "react";
import {InternationalBusinessFooterComponent} from "~/components/footers/internationalBusinessFooterComponent";
import {ContentProviderContext} from "~/contexts/contentProviderContext";
import {InternationalBusinessHeaderComponent} from "~/routes/international-ops/internationalBusinessHeaderComponent";
import type {UserPreferences} from "~/typeDefinitions";

export function InternationalPageScaffold({
    userPreferences,
    children,
    redirectTo,
    showMobileMenuIcon,
    utmParameters,
    breadcrumbs,
    showContactCtaButton,
    showSearchOption,
    pageUrl,
    productCategories,
    scrollToProductCategory,
}: {
    userPreferences: UserPreferences;
    children: any;
    redirectTo: string;
    showMobileMenuIcon: boolean;
    utmParameters: {
        [searchParameter: string]: string;
    };
    breadcrumbs?: Array<{humanReadableString: string; link: string}>;
    showContactCtaButton: boolean;
    showSearchOption: boolean;
    pageUrl: string;
    productCategories: Array<string>;
    scrollToProductCategory: (categoryIndex: number, subCategoryIndex: number) => void;
}) {
    const currentYear = new Date().getFullYear();
    const contentData = useContext(ContentProviderContext);
    return (
        <>
            {/* tw-grid tw-grid-rows-[auto_1fr_auto] tw-grid-flow-col tw-min-h-screen */}
            <div className="tw-flex tw-flex-col tw-items-stretch tw-min-h-screen">
                <InternationalBusinessHeaderComponent
                    userPreferences={userPreferences}
                    redirectTo={redirectTo}
                    pageUrl={pageUrl}
                />

                {children}
                <div className="tw-flex-grow" />

                {/* <VerticalSpacer className="tw-h-[5rem] lg:tw-h-[10rem]" /> */}

                <InternationalBusinessFooterComponent
                    userPreferences={userPreferences}
                    utmParameters={utmParameters}
                    productCategories={productCategories}
                    scrollToProductCategory={scrollToProductCategory}
                />

                <div className="tw-text-center lg:tw-text-left tw-py-6 lg:tw-pl-[4.5rem] tw-bg-[#f2f2f2] dark:tw-bg-secondary-100-dark">
                    {contentData.getContent("501d17d3-de19-4710-9597-67c48bfdd52c")}
                    {currentYear}
                    {contentData.getContent("ceb7cbb7-9f86-48fa-9781-e5b5c17f2c69")}
                </div>

                {/* <FooterComponent
                    userPreferences={userPreferences}
                    utmParameters={utmParameters}
                /> */}

                {/* Suppress Haptik on international pages */}
                <style
                    dangerouslySetInnerHTML={{
                        __html: `
                        #haptik-xdk-wrapper {
                            display: none !important;
                        }

                        iframe#haptik-xdk-main-view {
                            display: none !important;
                        }

                        iframe.xdk-iframe {
                            display: none !important;
                        }
                    `,
                    }}
                />
                {/* /Suppress Haptik on international pages */}
            </div>
        </>
    );
}
