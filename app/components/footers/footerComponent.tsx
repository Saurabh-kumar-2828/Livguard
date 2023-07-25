import {ChevronRightIcon} from "@heroicons/react/20/solid";
import {Link, useFetcher} from "@remix-run/react";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {Accordion} from "~/components/accordian";
import {FooterSocialLogosAndCopyright, SocialMediaIcons, SubscribeSuccessDialog} from "~/components/footers/common";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {emailIdValidationPattern} from "~/global-common-typescript/utilities/validationPatterns";
import type {UserPreferences} from "~/typeDefinitions";
import {Theme} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";

export function FooterComponent({
    userPreferences,
    utmParameters,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
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
            title: `${getVernacularString("footerDisclosure1T1", userPreferences.language)}`,
            link: "/contact-us",
            target: false,
        },
        {
            title: `${getVernacularString("footerDisclosure1T2", userPreferences.language)}`,
            link: "/global-reach.php",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure1T3", userPreferences.language)}`,
            link: "/blog/",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure1T4", userPreferences.language)}`,
            link: "/privacy-policy.php",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure1T5", userPreferences.language)}`,
            link: "/sales-return-policy.php",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure1T6", userPreferences.language)}`,
            link: "/terms-and-conditions.php",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure1T7", userPreferences.language)}`,
            link: "/csr-initiatives.php",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure1T8", userPreferences.language)}`,
            link: "/video-gallery.php",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure1T9", userPreferences.language)}`,
            link: "/sitemap.php",
            target: true,
        },
    ];

    const invertersAndBatteriesAccordianList = [
        {
            title: `${getVernacularString("footerDisclosure2T1", userPreferences.language)}`,
            link: "/inverter-for-home",
            target: false,
        },
        {
            title: `${getVernacularString("footerDisclosure2T2", userPreferences.language)}`,
            link: "/inverter-batteries",
            target: false,
        },
        {
            title: `${getVernacularString("footerDisclosure2T3", userPreferences.language)}`,
            link: "/high-capacity-inverters",
            target: true,
        },
    ];

    const automotiveBatteriesAccordionList = [
        {
            title: `${getVernacularString("footerDisclosure3T6", userPreferences.language)}`,
            link: "/car-and-suv-batteries/",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure3T1", userPreferences.language)}`,
            link: "/three-wheeler-batteries/",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure3T2", userPreferences.language)}`,
            link: "/tractor-batteries/",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure3T3", userPreferences.language)}`,
            link: "/bus-and-truck-batteries/",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure3T4", userPreferences.language)}`,
            link: "/two-wheeler-batteries/",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure3T5", userPreferences.language)}`,
            link: "/e-rickshaw-batteries/",
            target: true,
        },
    ];

    const solarSolutionsAccordianList = [
        {
            title: `${getVernacularString("footerDisclosure4T1", userPreferences.language)}`,
            link: "/solar-panels-for-home/",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure4T2", userPreferences.language)}`,
            link: "/solar-grid-interactive-series-for-home/",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure4T3", userPreferences.language)}`,
            link: "/solar-panels-and-inverters-for-home/",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure4T4", userPreferences.language)}`,
            link: "/solar-management-unit-for-home/",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure4T5", userPreferences.language)}`,
            link: "/solar-charge-controller-for-home/",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure4T6", userPreferences.language)}`,
            link: "/solar-led-street-light/",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure4T7", userPreferences.language)}`,
            link: "/solar-battery-for-home/",
            target: true,
        },
    ];

    const stabelizersAccordianList = [
        {
            title: `${getVernacularString("footerDisclosure5T1", userPreferences.language)}`,
            link: "/stabilizer-for-AC-and-TV.php",
            target: true,
        },
    ];

    const howCanWehelpAccordianList = [
        {
            title: `${getVernacularString("footerDisclosure6T1", userPreferences.language)}`,
            link: "/battery-finder.php",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure6T2", userPreferences.language)}`,
            link: "/dealer-for-inverters-and-batteries",
            target: false,
        },
        {
            title: `${getVernacularString("footerDisclosure6T3", userPreferences.language)}`,
            link: "/bmhr.php",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure6T4", userPreferences.language)}`,
            link: "/register-and-warranty-for-inverters.php",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure6T5", userPreferences.language)}`,
            link: "/contact.php",
            target: true,
        },
    ];

    const investersAccordianList = [
        {
            title: `${getVernacularString("footerDisclosure7T1", userPreferences.language)}`,
            link: "https://www.livguard.com/static-assets/LBPL_Notice of Secured creditors meeting dt 01.04.2023.pdf",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure7T2", userPreferences.language)}`,
            link: "https://www.livguard.com/static-assets/LBPL_Notice of Unsecured creditors meeting dt 01.04.2023.pdf",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure7T3", userPreferences.language)}`,
            link: "https://www.livguard.com/static-assets/LETPL_Notice of Secured creditors meeting dt 01.04.2023.pdf",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure7T4", userPreferences.language)}`,
            link: "https://www.livguard.com/static-assets/MGT-7_2021-22_LBPL.pdf",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure7T4", userPreferences.language)}`,
            link: "https://www.livguard.com/static-assets/MGT-7_2021-22_LETPL.pdf",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure7T6", userPreferences.language)}`,
            link: "https://www.livguard.com/static-assets/LBPL_Notice of Secured creditors meeting dt 01.04.2023.pdf",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure7T7", userPreferences.language)}`,
            link: "https://www.livguard.com/static-assets/LBPL_Notice of Unsecured creditors meeting dt 01.04.2023.pdf",
            target: true,
        },
        {
            title: `${getVernacularString("footerDisclosure7T8", userPreferences.language)}`,
            link: "https://www.livguard.com/static-assets/LETPL_Notice of Secured creditors meeting dt 01.04.2023.pdf",
            target: true,
        },
    ];

    return (
        <div className="lg-px-screen-edge lg:tw-px-0">
            {/* TODO: Check if this is intentional, otherwise remove */}
            <VerticalSpacer className="tw-h-8 lg:tw-hidden" />

            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-rows-[auto_2rem_auto_2rem_auto_auto] lg:tw-grid-cols-[21.5rem_repeat(4,minmax(0,1fr))_1.5rem] lg:tw-gap-x-8 lg:tw-gap-y-4">
                <div className="lg:tw-row-start-3 lg:tw-col-start-1 lg:tw-pl-[72px]">
                    <Link to="/">
                        <img
                            src={userPreferences.theme == Theme.Dark ? "https://files.growthjockey.com/livguard/icons/logo-dark.svg" : "https://files.growthjockey.com/livguard/icons/logo-light.svg"}
                            width={385}
                            height={96}
                            className="tw-w-auto tw-h-6 lg:tw-h-12"
                        />
                    </Link>

                    <VerticalSpacer className="tw-h-4 lg:tw-hidden" />
                </div>

                <div className="lg:tw-row-start-1 lg:tw-col-start-1 lg:tw-col-span-full tw-flex lg:tw-flex-row lg:tw-justify-between lg:tw-items-center lg:lg-bg-secondary-100 lg:tw-px-[72px] lg:tw-py-4 lg:tw-gap-10">
                    <div className="tw-flex tw-flex-col lg:tw-flex-row lg:tw-justify-start lg:tw-gap-10 lg:tw-items-center">
                        <div className="lg-text-secondary-900 lg-text-title1 lg:tw-max-w-[40rem]">{getVernacularString("footerSubscribeT1", userPreferences.language)}</div>

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
                                    placeholder={getVernacularString("footerSubscribeT2", userPreferences.language)}
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
                    title={getVernacularString("footerDisclosure1H", userPreferences.language)}
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
                    className="lg:tw-hidden"
                    // openDisclosureTitle={openDisclosureTitle}
                    // setOpenDisclosureTitle={setOpenDisclosureTitle}
                />

                <VerticalSpacer className="tw-h-3 lg:tw-hidden" />

                <Accordion
                    title={getVernacularString("footerDisclosure2H", userPreferences.language)}
                    panelItem={
                        <ItemBuilder
                            items={invertersAndBatteriesAccordianList}
                            itemBuilder={(item, itemIndex) => (
                                <div
                                    className="lg-text-secondary-900"
                                    key={itemIndex}
                                >
                                    <div className="lg-text-secondary-900">
                                        <Link to={item.link}>{item.title}</Link>
                                    </div>
                                </div>
                            )}
                        />
                    }
                    className="lg:tw-hidden"
                    // openDisclosureTitle={openDisclosureTitle}
                    // setOpenDisclosureTitle={setOpenDisclosureTitle}
                />

                <VerticalSpacer className="tw-h-3 lg:tw-hidden" />
                <Accordion
                    title={getVernacularString("footerDisclosure3H", userPreferences.language)}
                    panelItem={
                        <ItemBuilder
                            items={automotiveBatteriesAccordionList}
                            itemBuilder={(item, itemIndex) => (
                                <div
                                    className="lg-text-secondary-900"
                                    key={itemIndex}
                                >
                                    <div
                                        className="lg-text-secondary-900"
                                        key={itemIndex}
                                    >
                                        <Link to={item.link}>{item.title}</Link>
                                    </div>
                                </div>
                            )}
                        />
                    }
                    className="lg:tw-hidden"
                    // openDisclosureTitle={openDisclosureTitle}
                    // setOpenDisclosureTitle={setOpenDisclosureTitle}
                />

                <VerticalSpacer className="tw-h-3 lg:tw-hidden" />

                <Accordion
                    title={getVernacularString("footerDisclosure4H", userPreferences.language)}
                    panelItem={
                        <ItemBuilder
                            items={solarSolutionsAccordianList}
                            itemBuilder={(item, itemIndex) => (
                                <div
                                    className="lg-text-secondary-900"
                                    key={itemIndex}
                                >
                                    <div
                                        className="lg-text-secondary-900"
                                        key={itemIndex}
                                    >
                                        <Link to={item.link}>{item.title}</Link>
                                    </div>
                                </div>
                            )}
                        />
                    }
                    className="lg:tw-hidden"
                    // openDisclosureTitle={openDisclosureTitle}
                    // setOpenDisclosureTitle={setOpenDisclosureTitle}
                />

                <VerticalSpacer className="tw-h-3 lg:tw-hidden" />

                <Accordion
                    title={getVernacularString("footerDisclosure5H", userPreferences.language)}
                    panelItem={
                        <ItemBuilder
                            items={stabelizersAccordianList}
                            itemBuilder={(item, itemIndex) => (
                                <div
                                    className="lg-text-secondary-900"
                                    key={itemIndex}
                                >
                                    <div
                                        className="lg-text-secondary-900"
                                        key={itemIndex}
                                    >
                                        <Link to={item.link}>{item.title}</Link>
                                    </div>
                                </div>
                            )}
                        />
                    }
                    className="lg:tw-hidden"
                    // openDisclosureTitle={openDisclosureTitle}
                    // setOpenDisclosureTitle={setOpenDisclosureTitle}
                />

                <VerticalSpacer className="tw-h-3 lg:tw-hidden" />

                <Accordion
                    title={getVernacularString("footerDisclosure6H", userPreferences.language)}
                    panelItem={
                        <ItemBuilder
                            items={howCanWehelpAccordianList}
                            itemBuilder={(item, itemIndex) => (
                                <div
                                    className="lg-text-secondary-900"
                                    key={itemIndex}
                                >
                                    <div
                                        className="lg-text-secondary-900"
                                        key={itemIndex}
                                    >
                                        <Link to={item.link}>{item.title}</Link>
                                    </div>
                                </div>
                            )}
                        />
                    }
                    className="lg:tw-hidden"
                    // openDisclosureTitle={openDisclosureTitle}
                    // setOpenDisclosureTitle={setOpenDisclosureTitle}
                />

                <VerticalSpacer className="tw-h-3 lg:tw-hidden" />

                <Accordion
                    title={getVernacularString("footerDisclosure7H", userPreferences.language)}
                    panelItem={
                        <ItemBuilder
                            items={investersAccordianList}
                            itemBuilder={(item, itemIndex) => (
                                <div
                                    className="lg-text-secondary-900"
                                    key={itemIndex}
                                >
                                    <div
                                        className="lg-text-secondary-900"
                                        key={itemIndex}
                                    >
                                        <Link
                                            to={item.link}
                                            target="_blank"
                                        >
                                            {item.title}
                                        </Link>
                                    </div>
                                </div>
                            )}
                        />
                    }
                    className="lg:tw-hidden"
                    // openDisclosureTitle={openDisclosureTitle}
                    // setOpenDisclosureTitle={setOpenDisclosureTitle}
                />

                <VerticalSpacer className="tw-h-5 lg:tw-hidden" />

                <div className="lg:tw-row-start-5 lg:tw-col-start-1 tw-flex tw-flex-col lg-text-secondary-900 tw-px-10 lg:tw-px-0 tw-text-center lg:tw-text-left lg:tw-pl-[4.5rem]">
                    <div>{getVernacularString("footerContactT1", userPreferences.language)}</div>

                    <VerticalSpacer className="tw-h-4" />

                    <div>{getVernacularString("footerContactT1.5", userPreferences.language)}</div>

                    <VerticalSpacer className="tw-h-3" />

                    <div>{getVernacularString("footerContactT2", userPreferences.language)}</div>

                    <VerticalSpacer className="tw-h-3" />

                    <div>{getVernacularString("footerContactT2.5", userPreferences.language)}</div>

                    <VerticalSpacer className="tw-h-3" />

                    <div className="tw-underline">
                        <a href="tel:18001025551">+91-124-4987 400</a>
                    </div>

                    <VerticalSpacer className="tw-h-3" />

                    <div className="tw-underline">
                        <a href="mailto:marketing@livguard.com">marketing@livguard.com</a>
                    </div>

                    <VerticalSpacer className="tw-h-3" />

                    <div className="tw-underline">
                        <a href="mailto:export@sar-group.com">export@sar-group.com</a>
                    </div>

                    <VerticalSpacer className="tw-h-3" />

                    <div>{getVernacularString("footerContactT3", userPreferences.language)}</div>

                    <VerticalSpacer className="tw-h-3 tw-hidden lg:tw-block" />
                </div>

                <VerticalSpacer className="tw-h-2 lg:tw-hidden" />

                <FooterSocialLogosAndCopyright
                    userPreferences={userPreferences}
                    className="lg:tw-hidden tw-mx-[calc(-1*var(--lg-px-screen-edge))]"
                />

                <div className="tw-hidden lg:tw-flex lg:tw-flex-col lg:tw-row-start-3 lg:tw-col-start-2 lg:tw-row-span-3">
                    <div className="lg-text-body-bold">{getVernacularString("footerDisclosure1H", userPreferences.language)}</div>
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
                                    <Link to={item.link}>{item.title}</Link>
                                )}

                                <VerticalSpacer className="tw-h-1" />
                            </div>
                        )}
                    />
                </div>

                <div className="tw-hidden lg:tw-flex lg:tw-flex-col lg:tw-row-start-3 lg:tw-col-start-3 lg:tw-row-span-3">
                    <div className="tw-flex tw-flex-col">
                        <div className="lg-text-body-bold">{getVernacularString("footerDisclosure2H", userPreferences.language)}</div>
                        <VerticalSpacer className="tw-h-1" />
                        <ItemBuilder
                            items={invertersAndBatteriesAccordianList}
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

                                    <VerticalSpacer className="tw-h-1" />
                                </div>
                            )}
                        />
                    </div>
                    <VerticalSpacer className="tw-h-8" />
                    <div className="tw-flex tw-flex-col">
                        <div className="lg-text-body-bold">{getVernacularString("footerDisclosure4H", userPreferences.language)}</div>
                        <VerticalSpacer className="tw-h-1" />
                        <ItemBuilder
                            items={solarSolutionsAccordianList}
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

                                    <VerticalSpacer className="tw-h-1" />
                                </div>
                            )}
                        />
                    </div>
                </div>

                <div className="tw-hidden lg:tw-flex lg:tw-flex-col lg:tw-row-start-3 lg:tw-col-start-4 lg:tw-row-span-3">
                    <div className="tw-flex tw-flex-col">
                        <div className="lg-text-body-bold">{getVernacularString("footerDisclosure3H", userPreferences.language)}</div>
                        <VerticalSpacer className="tw-h-1" />
                        <ItemBuilder
                            items={automotiveBatteriesAccordionList}
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

                                    <VerticalSpacer className="tw-h-1" />
                                </div>
                            )}
                        />
                    </div>
                    <VerticalSpacer className="tw-h-8" />
                    <div className="tw-flex tw-flex-col">
                        <div className="lg-text-body-bold">{getVernacularString("footerDisclosure6H", userPreferences.language)}</div>
                        <VerticalSpacer className="tw-h-1" />
                        <ItemBuilder
                            items={howCanWehelpAccordianList}
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

                                    <VerticalSpacer className="tw-h-1" />
                                </div>
                            )}
                        />
                    </div>
                </div>

                <div className="tw-hidden lg:tw-flex lg:tw-flex-col lg:tw-row-start-3 lg:tw-col-start-5 lg:tw-row-span-3">
                    <div className="tw-flex tw-flex-col">
                        <div className="lg-text-body-bold">{getVernacularString("footerDisclosure5H", userPreferences.language)}</div>
                        <VerticalSpacer className="tw-h-1" />
                        <ItemBuilder
                            items={stabelizersAccordianList}
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

                                    <VerticalSpacer className="tw-h-1" />
                                </div>
                            )}
                        />
                    </div>
                    <VerticalSpacer className="tw-h-8" />
                    <div className="tw-flex tw-flex-col">
                        <div className="lg-text-body-bold">{getVernacularString("footerDisclosure7H", userPreferences.language)}</div>
                        <VerticalSpacer className="tw-h-1" />
                        <ItemBuilder
                            items={investersAccordianList}
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

                                    <VerticalSpacer className="tw-h-1" />
                                </div>
                            )}
                        />
                    </div>
                </div>

                <div className="lg:tw-row-start-7 lg:tw-col-start-1 lg:tw-col-span-full tw-hidden lg:tw-block lg-text-body tw-py-4 tw-text-left lg:tw-px-[72px]">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("footerCopyrightText", userPreferences.language)}} />
                </div>
            </div>
        </div>
    );
}