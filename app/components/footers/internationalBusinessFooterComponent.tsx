import {ChevronRightIcon, PlusIcon} from "@heroicons/react/20/solid";
import {Link, useFetcher} from "@remix-run/react";
import {useEffect, useState} from "react";
import {GeoAltFill, GlobeAmericas, TelephoneFill} from "react-bootstrap-icons";
import {toast} from "react-toastify";
import {boolean} from "zod";
import {Accordion} from "~/components/accordian";
import {SocialMediaIcons, SubscribeSuccessDialog, FooterSocialLogosAndCopyright} from "~/components/footers/common";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {emailIdValidationPattern} from "~/global-common-typescript/utilities/validationPatterns";
import {Theme, type UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";

export function InternationalBusinessFooterComponent({
    userPreferences,
    utmParameters,
    productCategories,
    scrollToProductCategory,
    className,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
    productCategories: Array<string>;
    scrollToProductCategory: (categoryIndex: number, subCategoryIndex: number) => void;
    className?: string;
}) {
    // const [openDisclosureTitle, setOpenDisclosureTitle] = useState<string | null>(null);

    const fetcher = useFetcher();
    const isSubscriptionSuccess = fetcher.data != null && fetcher.data.error == null;

    const [isSubscribeSuccessDialogeOpen, setIsSubscribeSuccessDialogeOpen] = useState(false);

    useEffect(() => {
        if (fetcher.data == null) {
            return;
        }

        if (fetcher.data.error != null) {
            toast.error(fetcher.data.error);
            return;
        }

        setIsSubscribeSuccessDialogeOpen(isSubscriptionSuccess);
    }, [fetcher.data]);

    const aboutUsAccordianList = [
        {
            title: `${getVernacularString("cc92d2f4-4884-4d08-bd15-9ed54eaf1e4d", userPreferences.language)}`,
            link: "/contact-us",
            target: false,
        },
        {
            title: `${getVernacularString("f396f200-9afb-4408-85c2-fe7ed011e288", userPreferences.language)}`,
            link: "/global-ops",
            target: true,
        },
        {
            title: `${getVernacularString("3646d35c-629c-47af-902a-5ccc2941a5e5", userPreferences.language)}`,
            link: "/privacy-policy",
            target: true,
        },
        {
            title: `${getVernacularString("70e9b582-ab5a-492a-a426-5552a796bc6d", userPreferences.language)}`,
            link: "/csr",
            target: true,
        },
    ];

    const batteriesAccordianList = [
        {
            title: `${getVernacularString("6a54a900-6176-454c-9ef6-d9025fee97c9", userPreferences.language)}`,
            link: "/contact-us",
            target: false,
        },
    ];

    const solarAccordianList = [
        {
            title: `${getVernacularString("c64a5e9d-ba14-41ff-9925-bda948a97c97", userPreferences.language)}`,
            link: "/contact-us",
            target: false,
        },
    ];

    const GovernanceAccordianList = [
        // {
        //     title: `${getVernacularString("41d5c04e-ff29-4bfc-8082-b2245a96dd7a", userPreferences.language)}`,
        //     link: "/contact-us",
        //     target: false,
        // },
        // {
        //     title: `${getVernacularString("70e9b582-ab5a-492a-a426-5552a796bc6d", userPreferences.language)}`,
        //     link: "/global-ops",
        //     target: true,
        // },
        // {
        //     title: `${getVernacularString("35fe95ed-b847-4ac1-a6f6-5878d1a183ea", userPreferences.language)}`,
        //     link: "/privacy-policy",
        //     target: true,
        // },
        {
            title: `${getVernacularString("13a52500-50ab-4649-9811-a670bc78df8a", userPreferences.language)}`,
            link: "/e-waste-management",
            target: true,
        },
    ];

    return (
        <div className="lg-px-screen-edge lg:tw-px-0 tw-bg-secondary-100-light dark:tw-bg-background-500-dark">
            {/* TODO: Check if this is intentional, otherwise remove */}
            <VerticalSpacer className="tw-h-8 lg:tw-hidden" />

            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-rows-[auto] lg:tw-grid-cols-[25.5rem_repeat(4,minmax(0,1fr))_1.5rem] lg:tw-gap-x-8 lg:tw-gap-y-8 tw-pb-4">
                <div className="lg:tw-row-start-2 lg:tw-col-start-1 lg:tw-pl-[72px]">
                    <Link to="/">
                        <img
                            src={
                                userPreferences.theme == Theme.Dark
                                    ? "https://files.growthjockey.com/livguard/icons/international-business/logo-dark.svg"
                                    : "https://files.growthjockey.com/livguard/icons/international-business/logo-light.svg"
                            }
                            width={385}
                            height={96}
                            className="tw-w-auto tw-h-6 lg:tw-h-12"
                        />
                    </Link>

                    <VerticalSpacer className="tw-h-4 lg:tw-hidden" />
                </div>

                <div className="lg:tw-row-start-1 lg:tw-col-start-1 lg:tw-col-span-full tw-flex lg:tw-flex-row lg:tw-justify-between lg:tw-items-center lg:tw-px-[72px] tw-py-4 lg:tw-gap-10 tw-bg-[#f2f2f2] dark:tw-bg-secondary-100-dark tw-mx-[-1.5rem] lg:tw-mx-0 lg-px-screen-edge">
                    <div className="tw-flex tw-flex-col lg:tw-flex-row lg:tw-justify-start lg:tw-gap-10 lg:tw-items-center">
                        <div className="lg-text-secondary-900 lg-text-title1 lg:tw-max-w-[40rem]">{getVernacularString("6704bb3c-9278-4dc5-b945-d2fa6d625b60", userPreferences.language)}</div>

                        <VerticalSpacer className="tw-h-3 lg:tw-hidden" />

                        <fetcher.Form
                            method="post"
                            action="/subscribe"
                            className="tw-w-full lg:tw-max-w-sm"
                        >
                            <div className="tw-relative">
                                <input
                                    type="text"
                                    name="emailId"
                                    id="signup_email"
                                    pattern={emailIdValidationPattern}
                                    placeholder={getVernacularString("e64854e3-77ba-4364-96f9-3731e77a888d", userPreferences.language)}
                                    className="tw-bg-secondary-100-light dark:tw-bg-secondary-300-dark tw-outline dark:tw-outline-none tw-outline-1 tw-outline-secondary-500-light lg-text-secondary-900 tw-w-full tw-p-4 tw-rounded-full"
                                />

                                <input
                                    name="utmParameters"
                                    className="tw-hidden"
                                    readOnly
                                    value={JSON.stringify(utmParameters)}
                                />
                                <button
                                    type="submit"
                                    className="tw-absolute tw-top-2.5 tw-right-2.5 tw-bottom-0 tw-w-8 tw-h-8 tw-rounded-full lg-bg-secondary-100 tw-border tw-border-secondary-900-light dark:tw-border-secondary-900-dark"
                                >
                                    <ChevronRightIcon className="tw-w-8 tw-h-8" />
                                </button>
                            </div>
                        </fetcher.Form>
                    </div>

                    <SocialMediaIcons className="tw-hidden lg:tw-flex lg:tw-justify-self-end" />

                    <SubscribeSuccessDialog
                        userPreferences={userPreferences}
                        isSuccessDialogOpen={isSubscribeSuccessDialogeOpen}
                        setSuccessDialogOpen={setIsSubscribeSuccessDialogeOpen}
                    />

                    <VerticalSpacer className="tw-h-3 lg:tw-hidden" />
                </div>

                <VerticalSpacer className="tw-h-6 lg:tw-hidden" />

                <Accordion
                    title={getVernacularString("586b03b6-cd5a-4e80-88ac-ae3cdabc170c", userPreferences.language)}
                    panelItem={
                        <ItemBuilder
                            items={aboutUsAccordianList}
                            itemBuilder={(item, itemIndex) => (
                                <div
                                    className="lg-text-secondary-900"
                                    key={itemIndex}
                                >
                                    {item.target ? (
                                        <Link
                                            to={item.link}
                                            target="_blank"
                                        >
                                            {item.title}
                                        </Link>
                                    ) : (
                                        <Link to={item.link}>{item.title}</Link>
                                    )}
                                </div>
                            )}
                        />
                    }
                    className="lg:tw-hidden lg-international-shadow"
                    accordionPanelClassName="!tw-bg-[#f2f2f2] dark:!tw-bg-background-500-dark"
                />

                <VerticalSpacer className="tw-h-3 lg:tw-hidden" />

                <Accordion
                    title={getVernacularString("4293e069-961d-471a-b759-b506e1fa1d6b", userPreferences.language)}
                    panelItem={
                        <ItemBuilder
                            items={GovernanceAccordianList}
                            itemBuilder={(item, itemIndex) => (
                                <div
                                    className="lg-text-secondary-900"
                                    key={itemIndex}
                                >
                                    {item.target ? (
                                        <Link
                                            to={item.link}
                                            target="_blank"
                                        >
                                            {item.title}
                                        </Link>
                                    ) : (
                                        <Link to={item.link}>{item.title}</Link>
                                    )}
                                </div>
                            )}
                        />
                    }
                    className="lg:tw-hidden lg-international-shadow"
                    accordionPanelClassName="!tw-bg-[#f2f2f2] dark:!tw-bg-background-500-dark"
                />

                <VerticalSpacer className="tw-h-3 lg:tw-hidden" />

                <div
                    className="tw-text-left tw-p-5 tw-flex tw-justify-between tw-items-center tw-w-full lg-bg-secondary-100 tw-gap-x-4 lg:tw-hidden hover:tw-cursor-pointer tw-rounded-lg lg-international-shadow"
                    onClick={() => scrollToProductCategory(0, 0)}
                >
                    <div className="lg-text-secondary-900 tw-flex-1">{getVernacularString("e4352ec6-972a-46ff-85e6-a00de81e8d6d", userPreferences.language)}</div>
                    <div className="tw-h-6 tw-w-6 lg-bg-background-500 tw-rounded-lg tw-flex-0">
                        <PlusIcon />
                    </div>
                </div>

                <VerticalSpacer className="tw-h-3 lg:tw-hidden" />

                <Accordion
                    title={getVernacularString("89e965e6-e1cd-4494-acca-539e38484973", userPreferences.language)}
                    panelItem={
                        <ItemBuilder
                            items={batteriesAccordianList}
                            itemBuilder={(item, itemIndex) => (
                                <div
                                    className="lg-text-secondary-900"
                                    key={itemIndex}
                                >
                                    <div
                                        className="hover:tw-cursor-pointer"
                                        onClick={() => scrollToProductCategory(1, 0)}
                                    >
                                        {item.title}
                                    </div>
                                </div>
                            )}
                        />
                    }
                    className="lg:tw-hidden lg-international-shadow"
                    accordionPanelClassName="!tw-bg-[#f2f2f2] dark:!tw-bg-background-500-dark"
                />

                <VerticalSpacer className="tw-h-3 lg:tw-hidden" />

                <Accordion
                    title={getVernacularString("db1db71c-a35e-45d6-9a7d-8035c009f5ec", userPreferences.language)}
                    panelItem={
                        <ItemBuilder
                            items={solarAccordianList}
                            itemBuilder={(item, itemIndex) => (
                                <div
                                    className="lg-text-secondary-900"
                                    key={itemIndex}
                                >
                                    <div
                                        className="hover:tw-cursor-pointer"
                                        onClick={() => scrollToProductCategory(2, 0)}
                                    >
                                        {item.title}
                                    </div>
                                </div>
                            )}
                        />
                    }
                    className="lg:tw-hidden lg-international-shadow"
                    accordionPanelClassName="!tw-bg-[#f2f2f2] dark:!tw-bg-background-500-dark"
                />

                <VerticalSpacer className="tw-h-3 lg:tw-hidden" />

                <Accordion
                    defaultOpen={true}
                    title={getVernacularString("58ba11d4-9639-4ae9-b701-b99e4122c7a6", userPreferences.language)}
                    panelItem={
                        <div className="lg:tw-flex tw-flex-col">
                            <div className="tw-grid tw-grid-cols-[auto_1rem_minmax(0,1fr)] tw-items-center">
                                <TelephoneFill className="tw-h-6 tw-w-6 tw-col-start-1" />

                                <div className="tw-underline tw-col-start-3 tw-flex tw-flex-col tw-gap-1">
                                    <a href="tel:+9611700921">+961-1-700921</a>
                                    <a href="tel:+96179312446">+961-79-312446</a>
                                </div>
                            </div>

                            <VerticalSpacer className="tw-h-3" />

                            <div className="tw-grid tw-grid-cols-[auto_1rem_minmax(0,1fr)] tw-items-center">
                                <GlobeAmericas className="tw-h-6 tw-w-6 tw-col-start-1" />

                                <div className="tw-underline tw-col-start-3 tw-flex tw-flex-col tw-gap-1">
                                    <a href="mailto:info@gescolb.com">info@gescolb.com</a>
                                    <a href="mailto:export@sar-group.com">export@sar-group.com</a>
                                </div>
                            </div>

                            <VerticalSpacer className="tw-h-3" />

                            <div className="tw-grid tw-grid-cols-[auto_1rem_minmax(0,1fr)]">
                                <GeoAltFill className="tw-h-6 tw-w-6 tw-col-start-1" />

                                <div className="tw-col-start-3 tw-flex tw-flex-col tw-gap-1">
                                    <div>Lebanon Distributor - GESCO,</div>
                                    <div>Corniche EI Mazraa, Beirut, Lebanon</div>
                                </div>
                            </div>

                            <VerticalSpacer className="tw-h-3 tw-hidden lg:tw-block" />
                        </div>
                    }
                    className="lg:tw-hidden lg-international-shadow"
                    accordionPanelClassName="!tw-bg-[#f2f2f2] dark:!tw-bg-background-500-dark"
                />

                <VerticalSpacer className="tw-h-5 lg:tw-hidden" />

                <div className="tw-hidden lg:tw-row-start-3 lg:tw-col-start-1 lg:tw-flex tw-flex-col lg-text-secondary-900 tw-px-10 lg:tw-px-0 tw-text-center lg:tw-text-left lg:tw-pl-[4.5rem]">
                    <div>{getVernacularString("58ba11d4-9639-4ae9-b701-b99e4122c7a6", userPreferences.language)}</div>

                    <VerticalSpacer className="tw-h-4" />

                    <div className="tw-grid tw-grid-cols-[auto_1rem_minmax(0,1fr)]">
                        <TelephoneFill className="tw-h-6 tw-w-6 tw-col-start-1" />

                        <div className="tw-underline tw-col-start-3">
                            <a href="tel:+9611700921">+961-1-700921</a>
                        </div>
                    </div>

                    <VerticalSpacer className="tw-h-4" />

                    <div className="tw-grid tw-grid-cols-[auto_1rem_minmax(0,1fr)]">
                        <TelephoneFill className="tw-h-6 tw-w-6 tw-col-start-1" />

                        <div className="tw-underline tw-col-start-3">
                            <a href="tel:+96179312446">+961-79-312446</a>
                        </div>
                    </div>

                    <VerticalSpacer className="tw-h-3" />

                    <div className="tw-grid tw-grid-cols-[auto_1rem_minmax(0,1fr)] tw-items-center">
                        <GlobeAmericas className="tw-h-6 tw-w-6 tw-col-start-1" />

                        <div className="tw-underline tw-col-start-3 tw-flex tw-flex-col tw-gap-1">
                            <a href="mailto:info@gescolb.com">info@gescolb.com</a>
                            <a href="mailto:export@sar-group.com">export@sar-group.com</a>
                        </div>
                    </div>

                    <VerticalSpacer className="tw-h-3" />

                    <div className="tw-grid tw-grid-cols-[auto_1rem_minmax(0,1fr)]">
                        <GeoAltFill className="tw-h-6 tw-w-6 tw-col-start-1" />

                        <div className="tw-col-start-3 tw-flex tw-flex-col tw-gap-1">
                            <div>Lebanon Distributor - GESCO,</div>
                            <div>Corniche EI Mazraa, Beirut, Lebanon</div>
                        </div>
                    </div>
                </div>

                <VerticalSpacer className="tw-h-8 lg:tw-hidden" />

                {/* <FooterSocialLogosAndCopyright
                    userPreferences={userPreferences}
                    className="lg:tw-hidden tw-mx-[calc(-1*var(--lg-px-screen-edge))]"
                /> */}

                <div className="tw-hidden lg:tw-flex lg:tw-flex-col lg:tw-row-start-3 lg:tw-col-start-2 lg:tw-row-span-3">
                    <div className="lg-text-body-bold">{getVernacularString("586b03b6-cd5a-4e80-88ac-ae3cdabc170c", userPreferences.language)}</div>
                    <VerticalSpacer className="tw-h-1" />
                    <ItemBuilder
                        items={aboutUsAccordianList}
                        itemBuilder={(item, itemIndex) => (
                            <div
                                className="lg-text-secondary-900"
                                key={itemIndex}
                            >
                                {item.target ? (
                                    <Link
                                        to={item.link}
                                        target="_blank"
                                        className="tw-underline"
                                    >
                                        {item.title}
                                    </Link>
                                ) : (
                                    <Link
                                        to={item.link}
                                        className="tw-underline"
                                    >
                                        {item.title}
                                    </Link>
                                )}

                                <VerticalSpacer className="tw-h-1" />
                            </div>
                        )}
                    />

                    <VerticalSpacer className="tw-hidden lg:tw-flex lg:tw-h-8" />

                    <div className="lg-text-body-bold">{getVernacularString("4293e069-961d-471a-b759-b506e1fa1d6b", userPreferences.language)}</div>
                    <VerticalSpacer className="tw-h-1" />
                    <ItemBuilder
                        items={GovernanceAccordianList}
                        itemBuilder={(item, itemIndex) => (
                            <div
                                className="lg-text-secondary-900"
                                key={itemIndex}
                            >
                                {item.target ? (
                                    <Link
                                        to={item.link}
                                        target="_blank"
                                        className="tw-underline"
                                    >
                                        {item.title}
                                    </Link>
                                ) : (
                                    <Link
                                        to={item.link}
                                        className="tw-underline"
                                    >
                                        {item.title}
                                    </Link>
                                )}

                                <VerticalSpacer className="tw-h-1" />
                            </div>
                        )}
                    />
                </div>

                <div className="tw-hidden lg:tw-flex lg:tw-flex-col lg:tw-row-start-3 lg:tw-col-start-3 lg:tw-row-span-3">
                    <div
                        className="lg-text-body-bold hover:tw-cursor-pointer"
                        onClick={() => scrollToProductCategory(0, 0)}
                    >
                        {getVernacularString("e4352ec6-972a-46ff-85e6-a00de81e8d6d", userPreferences.language)}
                    </div>

                    {/* <VerticalSpacer className="tw-h-12" /> */}

                    {/* <div className="tw-flex tw-flex-col">
                        <div className="lg-text-body-bold">{getVernacularString("586b03b6-cd5a-4e80-88ac-ae3cdabc170c", userPreferences.language)}</div>
                        <VerticalSpacer className="tw-h-1" />
                        <ItemBuilder
                            items={aboutUsAccordianList}
                            itemBuilder={(item, itemIndex) => (
                                <div
                                    className="lg-text-secondary-900"
                                    key={itemIndex}
                                >
                                    {item.target ? (
                                        <Link
                                            to={item.link}
                                            target="_blank"
                                        >
                                            {item.title}
                                        </Link>
                                    ) : (
                                        <Link
                                            to={item.link}
                                            className="tw-underline"
                                        >
                                            {item.title}
                                        </Link>
                                    )}

                                    <VerticalSpacer className="tw-h-1" />
                                </div>
                            )}
                        />
                    </div> */}
                </div>

                <div className="tw-hidden lg:tw-flex lg:tw-flex-col lg:tw-row-start-3 lg:tw-col-start-4 lg:tw-row-span-3">
                    <div className="lg-text-body-bold">{getVernacularString("89e965e6-e1cd-4494-acca-539e38484973", userPreferences.language)}</div>
                    <VerticalSpacer className="tw-h-1" />
                    <ItemBuilder
                        items={batteriesAccordianList}
                        itemBuilder={(item, itemIndex) => (
                            <div
                                className="lg-text-secondary-900"
                                key={itemIndex}
                            >
                                <div
                                    className="tw-underline hover:tw-cursor-pointer"
                                    onClick={() => scrollToProductCategory(1, 0)}
                                >
                                    {item.title}
                                </div>

                                <VerticalSpacer className="tw-h-1" />
                            </div>
                        )}
                    />
                </div>

                <div className="tw-hidden lg:tw-flex lg:tw-flex-col lg:tw-row-start-3 lg:tw-col-start-5 lg:tw-row-span-3">
                    <div className="lg-text-body-bold">{getVernacularString("db1db71c-a35e-45d6-9a7d-8035c009f5ec", userPreferences.language)}</div>
                    <VerticalSpacer className="tw-h-1" />
                    <ItemBuilder
                        items={solarAccordianList}
                        itemBuilder={(item, itemIndex) => (
                            <div
                                className="lg-text-secondary-900"
                                key={itemIndex}
                            >
                                <div
                                    className="tw-underline hover:tw-cursor-pointer"
                                    onClick={() => scrollToProductCategory(2, 0)}
                                >
                                    {item.title}
                                </div>

                                <VerticalSpacer className="tw-h-1" />
                            </div>
                        )}
                    />
                </div>

                {/* <div className="tw-hidden lg:tw-flex lg:tw-flex-col lg:tw-row-start-3 lg:tw-col-start-2">
                    <button
                        type="button"
                        className="tw-text-left tw-underline"
                    >
                        {getVernacularString("e4352ec6-972a-46ff-85e6-a00de81e8d6d", userPreferences.language)}
                    </button>
                </div>

                <div className="tw-hidden lg:tw-flex lg:tw-flex-col lg:tw-row-start-3 lg:tw-col-start-3">
                    <button
                        type="button"
                        onClick={() => scrollToProductCategory(1, 0)}
                        className="tw-text-left tw-underline"
                    >
                        {getVernacularString("330a7f15-0687-4c44-bd72-a6e065e68a76", userPreferences.language)}
                    </button>
                </div>

                <div className="tw-hidden lg:tw-flex lg:tw-flex-col lg:tw-row-start-3 lg:tw-col-start-4">
                    <button
                        type="button"
                        onClick={() => scrollToProductCategory(2, 0)}
                        className="tw-text-left tw-underline"
                    >
                        {getVernacularString("972bdd2f-5007-4e40-be0f-c7ab8e22caf5", userPreferences.language)}
                    </button>
                </div> */}

                {/* <div className="lg:tw-row-start-7 lg:tw-col-start-1 lg:tw-col-span-full tw-hidden lg:tw-block lg-text-body tw-py-4 tw-text-left lg:tw-px-[72px]">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("footerCopyrightText", userPreferences.language)}} />
                </div> */}
            </div>
        </div>
    );
}
