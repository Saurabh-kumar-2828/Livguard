import {Dialog, Transition} from "@headlessui/react";
import {ArrowRightCircleIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import {Form, Link, useFetcher} from "@remix-run/react";
import React, {useEffect, useState} from "react";
import {Facebook, Google, Instagram, Linkedin, Twitter, Youtube} from "react-bootstrap-icons";
import {toast} from "react-toastify";
import {Accordion} from "~/components/accordian";
import {FixedHeightImage} from "~/global-common-typescript/components/fixedHeightImage";
import {ImageCdnProvider} from "~/global-common-typescript/components/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {emailIdValidationPattern} from "~/global-common-typescript/utilities/validationPatterns";
import {FormSubmissionSuccess} from "~/routes/dealer-locator";
import {UserPreferences} from "~/typeDefinitions";
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

    return (
        <div className="lg-px-screen-edge">
            <VerticalSpacer className="tw-h-8" />

            <div className="tw-flex tw-flex-col">
                <div className="tw-block dark:tw-hidden">
                    <Link to="/">
                        <object
                            data="https://files.growthjockey.com/livguard/icons/logo-light.svg"
                            className="tw-h-6 tw-pointer-events-none"
                        />
                    </Link>
                </div>

                <div className="dark:tw-block tw-hidden">
                    <Link to="/">
                        <object
                            data="https://files.growthjockey.com/livguard/icons/logo-dark.svg"
                            className="tw-h-6 tw-pointer-events-none"
                        />
                    </Link>
                </div>

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-secondary-900 lg-text-headline">{getVernacularString("footerSubscribeT1", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-3" />

                <fetcher.Form
                    method="post"
                    action="/subscribe"
                >
                    <div className="tw-relative tw-w-full">
                        <input
                            type="text"
                            name="emailId"
                            pattern={emailIdValidationPattern}
                            placeholder={getVernacularString("footerSubscribeT2", userPreferences.language)}
                            className="lg-bg-secondary-300 lg-text-secondary-900 tw-w-full tw-p-4 tw-rounded-full"
                        />

                        <input
                            name="utmParameters"
                            className="tw-hidden"
                            readOnly
                            value={JSON.stringify(utmParameters)}
                        />
                        <button
                            type="submit"
                            className="tw-absolute tw-top-2.5 tw-right-2.5 tw-bottom-0 tw-w-8 tw-h-8 tw-rounded-full lg-bg-secondary-100 tw-border"
                        >
                            <ChevronRightIcon className="tw-w-8 tw-h-8" />
                        </button>
                    </div>
                </fetcher.Form>

                <SubscribeSuccessDialog
                    userPreferences={userPreferences}
                    isSuccessDialogOpen={isSubscribeSuccessDialogeOpen}
                    setSuccessDialogOpen={setIsSubscribeSuccessDialogeOpen}
                />

                <VerticalSpacer className="tw-h-3" />

                <Accordion
                    title={getVernacularString("footerDisclosure1H", userPreferences.language)}
                    panelItem={
                        <ItemBuilder
                            items={[
                                {
                                    title: `${getVernacularString("footerDisclosure1T1", userPreferences.language)}`,
                                    link: "https://livguard.com/contact.php",
                                },
                                {
                                    title: `${getVernacularString("footerDisclosure1T2", userPreferences.language)}`,
                                    link: "https://livguard.com/global-reach.php",
                                },
                                {
                                    title: `${getVernacularString("footerDisclosure1T3", userPreferences.language)}`,
                                    link: "https://livguard.com/blog.php",
                                },
                                {
                                    title: `${getVernacularString("footerDisclosure1T4", userPreferences.language)}`,
                                    link: "https://livguard.com/privacy-policy.php",
                                },
                                {
                                    title: `${getVernacularString("footerDisclosure1T5", userPreferences.language)}`,
                                    link: "https://livguard.com/sales-return-policy.php",
                                },
                                {
                                    title: `${getVernacularString("footerDisclosure1T6", userPreferences.language)}`,
                                    link: "https://livguard.com/terms-and-conditions.php",
                                },
                                {
                                    title: `${getVernacularString("footerDisclosure1T7", userPreferences.language)}`,
                                    link: "https://www.livguard.com/pdf/CSR%20Policy%20(LBPL).pdf",
                                },
                                {
                                    title: `${getVernacularString("footerDisclosure1T8", userPreferences.language)}`,
                                    link: "https://livguard.com/video-galery.php",
                                },
                                {
                                    title: `${getVernacularString("footerDisclosure1T9", userPreferences.language)}`,
                                    link: "https://livguard.com/sitemap.php",
                                },
                            ]}
                            itemBuilder={(item, itemIndex) => (
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
                            )}
                        />
                    }
                    // openDisclosureTitle={openDisclosureTitle}
                    // setOpenDisclosureTitle={setOpenDisclosureTitle}
                />

                <VerticalSpacer className="tw-h-3" />

                <Accordion
                    title={getVernacularString("footerDisclosure2H", userPreferences.language)}
                    panelItem={
                        <ItemBuilder
                            items={[
                                {
                                    title: `${getVernacularString("footerDisclosure2T1", userPreferences.language)}`,
                                    link: "https://www.livguard.com/category/inverters",
                                },
                                {
                                    title: `${getVernacularString("footerDisclosure2T2", userPreferences.language)}`,
                                    link: "https://www.livguard.com/category/batteries",
                                },
                                {
                                    title: `${getVernacularString("footerDisclosure2T3", userPreferences.language)}`,
                                    link: "https://www.livguard.com/high-capacity-inverters/",
                                },
                            ]}
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
                    // openDisclosureTitle={openDisclosureTitle}
                    // setOpenDisclosureTitle={setOpenDisclosureTitle}
                />

                <VerticalSpacer className="tw-h-3" />
                <Accordion
                    title={getVernacularString("footerDisclosure3H", userPreferences.language)}
                    panelItem={
                        <ItemBuilder
                            items={[
                                {
                                    title: `${getVernacularString("footerDisclosure3T1", userPreferences.language)}`,
                                    link: "https://www.livguard.com/three-wheeler-batteries/",
                                },
                                {
                                    title: `${getVernacularString("footerDisclosure3T2", userPreferences.language)}`,
                                    link: "https://www.livguard.com/tractor-batteries/",
                                },
                                {
                                    title: `${getVernacularString("footerDisclosure3T3", userPreferences.language)}`,
                                    link: "https://www.livguard.com/bus-and-truck-batteries/",
                                },
                                {
                                    title: `${getVernacularString("footerDisclosure3T4", userPreferences.language)}`,
                                    link: "https://www.livguard.com/tow-wheeler-batteries/",
                                },
                                {
                                    title: `${getVernacularString("footerDisclosure3T5", userPreferences.language)}`,
                                    link: "https://www.livguard.com/erickshaw-batteries/",
                                },
                            ]}
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
                    // openDisclosureTitle={openDisclosureTitle}
                    // setOpenDisclosureTitle={setOpenDisclosureTitle}
                />

                <VerticalSpacer className="tw-h-3" />

                <Accordion
                    title={getVernacularString("footerDisclosure4H", userPreferences.language)}
                    panelItem={
                        <ItemBuilder
                            items={[
                                {
                                    title: `${getVernacularString("footerDisclosure4T1", userPreferences.language)}`,
                                    link: "https://www.livguard.com/solar-panels-for-home/",
                                },
                                {
                                    title: `${getVernacularString("footerDisclosure4T2", userPreferences.language)}`,
                                    link: "https://www.livguard.com/solar-grid-interactive-series-for-home/",
                                },
                                {
                                    title: `${getVernacularString("footerDisclosure4T3", userPreferences.language)}`,
                                    link: "https://www.livguard.com/solar-panels-and-inverters-for-home/",
                                },
                                {
                                    title: `${getVernacularString("footerDisclosure4T4", userPreferences.language)}`,
                                    link: "https://www.livguard.com/solar-management-unit-for-home/",
                                },
                                {
                                    title: `${getVernacularString("footerDisclosure4T5", userPreferences.language)}`,
                                    link: "https://www.livguard.com/solar-charge-controller-for-home/",
                                },
                                {
                                    title: `${getVernacularString("footerDisclosure4T6", userPreferences.language)}`,
                                    link: "https://www.livguard.com/solar-led-street-light/",
                                },
                                {
                                    title: `${getVernacularString("footerDisclosure4T7", userPreferences.language)}`,
                                    link: "https://www.livguard.com/solar-battery-for-home/",
                                },
                            ]}
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
                    // openDisclosureTitle={openDisclosureTitle}
                    // setOpenDisclosureTitle={setOpenDisclosureTitle}
                />

                <VerticalSpacer className="tw-h-3" />

                <Accordion
                    title={getVernacularString("footerDisclosure5H", userPreferences.language)}
                    panelItem={
                        <ItemBuilder
                            items={[
                                {
                                    title: `${getVernacularString("footerDisclosure5T1", userPreferences.language)}`,
                                    link: "https://www.livguard.com/stabilizer-for-AC-and-TV.php",
                                },
                            ]}
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
                    // openDisclosureTitle={openDisclosureTitle}
                    // setOpenDisclosureTitle={setOpenDisclosureTitle}
                />

                <VerticalSpacer className="tw-h-3" />

                <Accordion
                    title={getVernacularString("footerDisclosure6H", userPreferences.language)}
                    panelItem={
                        <ItemBuilder
                            items={[
                                {
                                    title: `${getVernacularString("footerDisclosure6T1", userPreferences.language)}`,
                                    link: "https://www.livguard.com/battery-finder.php",
                                },
                                {
                                    title: `${getVernacularString("footerDisclosure6T2", userPreferences.language)}`,
                                    link: "https://www.livguard.com/dealer-locator-for-invertors-and-batteries.php",
                                },
                                {
                                    title: `${getVernacularString("footerDisclosure6T3", userPreferences.language)}`,
                                    link: "https://www.livguard.com/bmhr.php",
                                },
                                {
                                    title: `${getVernacularString("footerDisclosure6T4", userPreferences.language)}`,
                                    link: "https://www.livguard.com/register-and-warranty-for-inverters.php",
                                },
                                {
                                    title: `${getVernacularString("footerDisclosure6T5", userPreferences.language)}`,
                                    link: "https://www.livguard.com/contact.php",
                                },
                            ]}
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
                    // openDisclosureTitle={openDisclosureTitle}
                    // setOpenDisclosureTitle={setOpenDisclosureTitle}
                />

                <VerticalSpacer className="tw-h-3" />

                <Accordion
                    title={getVernacularString("footerDisclosure7H", userPreferences.language)}
                    panelItem={
                        <ItemBuilder
                            items={[
                                {
                                    title: `${getVernacularString("footerDisclosure7T1", userPreferences.language)}`,
                                    link: "https://files.growthjockey.com/livguard/files/LBPL_Notice of Secured creditors meeting dt 01.04.2023.pdf",
                                },
                                {
                                    title: `${getVernacularString("footerDisclosure7T2", userPreferences.language)}`,
                                    link: "https://files.growthjockey.com/livguard/files/LBPL_Notice of Unsecured creditors meeting dt 01.04.2023.pdf",
                                },
                                {
                                    title: `${getVernacularString("footerDisclosure7T3", userPreferences.language)}`,
                                    link: "https://files.growthjockey.com/livguard/files/LETPL_Notice of Secured creditors meeting dt 01.04.2023.pdf",
                                },
                            ]}
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
                    // openDisclosureTitle={openDisclosureTitle}
                    // setOpenDisclosureTitle={setOpenDisclosureTitle}
                />

                <VerticalSpacer className="tw-h-5" />

                <div className="tw-flex tw-flex-col lg-text-secondary-900 tw-px-10">
                    <div className="tw-text-center">{getVernacularString("footerContactT1", userPreferences.language)}</div>

                    <VerticalSpacer className="tw-h-4" />

                    <div className="tw-text-center">{getVernacularString("footerContactT2", userPreferences.language)}</div>

                    <VerticalSpacer className="tw-h-3" />

                    <div className="tw-text-center tw-underline">
                        <a href="tel:18001025551">+91-124-4987 400</a>
                    </div>

                    <VerticalSpacer className="tw-h-3" />

                    <div className="tw-text-center tw-underline">
                        <a href="mailto:marketing@livguard.com">marketing@livguard.com</a>
                    </div>

                    <VerticalSpacer className="tw-h-3" />

                    <div className="tw-text-center tw-underline">
                        <a href="mailto:export@sar-group.com">export@sar-group.com</a>
                    </div>

                    <VerticalSpacer className="tw-h-3" />

                    <div className="tw-text-center">{getVernacularString("footerContactT3", userPreferences.language)}</div>
                </div>

                <VerticalSpacer className="tw-h-2" />

                <FooterSocialLogosAndCopyright userPreferences={userPreferences} />
            </div>
        </div>
    );
}

export function FooterSocialLogosAndCopyright({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="lg-px-screen-edge">
            <VerticalSpacer className="tw-h-3" />

            <div className="tw-flex tw-justify-evenly lg:tw-justify-center lg:tw-gap-1">
                <a
                    href="https://www.facebook.com/LivguardEnergy/"
                    target="_blank"
                    className="lg:tw-px-8"
                >
                    <Facebook className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                </a>
                <a
                    href="https://twitter.com/LivguardEnergy"
                    target="_blank"
                    className="lg:tw-px-8"
                >
                    <Twitter className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                </a>
                <a
                    href="https://www.instagram.com/livguardenergy/"
                    target="_blank"
                    className="lg:tw-px-8"
                >
                    <Instagram className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                </a>
                <a
                    href="https://www.linkedin.com/company/livguard-energy/"
                    target="_blank"
                    className="lg:tw-px-8"
                >
                    <Linkedin className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                </a>
                <a
                    href="https://www.youtube.com/@LivguardEnergy"
                    target="_blank"
                    className="lg:tw-px-8"
                >
                    <Youtube className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                </a>
            </div>

            <VerticalSpacer className="tw-h-6" />

            <div className="lg-text-body tw-text-center">{getVernacularString("footerCopyWriteText", userPreferences.language)}</div>

            <VerticalSpacer className="tw-h-6" />
        </div>
    );
}

export function SubscribeSuccessDialog({
    userPreferences,
    isSuccessDialogOpen,
    setSuccessDialogOpen,
}: {
    userPreferences: UserPreferences;
    isSuccessDialogOpen: boolean;
    setSuccessDialogOpen: React.Dispatch<boolean>;
}) {
    function tryToCloseSuccessDialogOpen() {
        setSuccessDialogOpen(false);
    }

    return (
        <Transition
            show={isSuccessDialogOpen}
            as={React.Fragment}
        >
            <Dialog
                as="div"
                className="tw-relative tw-z-50"
                onClose={tryToCloseSuccessDialogOpen}
            >
                <Transition.Child
                    as={React.Fragment}
                    enter="tw-ease-out tw-transition-all tw-duration-200"
                    enterFrom="tw-opacity-0"
                    enterTo="tw-opacity-100"
                    leave="tw-ease-in tw-transition-all tw-duration-200"
                    leaveFrom="tw-opacity-100"
                    leaveTo="tw-opacity-0"
                >
                    <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-[55%] tw-backdrop-blur" />
                </Transition.Child>

                <Dialog.Panel className="lg-px-screen-edge tw-fixed tw-inset-0 tw-grid tw-grid-rows-1 tw-grid-cols-1 tw-justify-center tw-items-center">
                    <Transition.Child
                        as="div"
                        enter="tw-ease-out tw-transition-all tw-duration-200"
                        enterFrom="tw-opacity-0"
                        enterTo="tw-opacity-full"
                        leave="tw-ease-in tw-transition-all tw-duration-200"
                        leaveFrom="tw-opacity-full"
                        leaveTo="tw-opacity-0"
                    >
                        <FormSubmissionSuccess
                            userPreferences={userPreferences}
                            tryToCloseDialog={tryToCloseSuccessDialogOpen}
                        />
                    </Transition.Child>
                </Dialog.Panel>
            </Dialog>
        </Transition>
    );
}
