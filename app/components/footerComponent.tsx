import {ArrowRightCircleIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import {Form, Link} from "@remix-run/react";
import React, {useState} from "react";
import {Facebook, Google, Instagram, Linkedin, Twitter, Youtube} from "react-bootstrap-icons";
import {Accordion} from "~/components/accordian";
import {FixedHeightImage} from "~/global-common-typescript/components/fixedHeightImage";
import {ImageCdnProvider} from "~/global-common-typescript/components/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {UserPreferences} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";

export function FooterComponent({userPreferences}: {userPreferences: UserPreferences}) {
    // const [openDisclosureTitle, setOpenDisclosureTitle] = useState<string | null>(null);

    return (
        <div className="lg-px-screen-edge">
            <div className="tw-hidden sm:tw-flex"></div>

            <VerticalSpacer className="tw-h-8" />

            <div className="tw-flex tw-flex-col sm:tw-hidden">
                <div className="tw-block dark:tw-hidden">
                    <Link to="/">
                        <FixedHeightImage
                            relativePath="/livguard/header/logo-100-light.jpg"
                            height="2rem"
                            imageCdnProvider={ImageCdnProvider.GrowthJockey}
                        />
                    </Link>
                </div>

                <div className="dark:tw-block tw-hidden">
                    <Link to="/">
                        <FixedHeightImage
                            relativePath="/livguard/header/logo-100-dark.jpg"
                            height="2rem"
                            imageCdnProvider={ImageCdnProvider.GrowthJockey}
                        />
                    </Link>
                </div>

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-secondary-900 lg-text-headline">{getVernacularString("footerSubscribeT1", userPreferences.language)}</div>

                <VerticalSpacer className="tw-h-3" />

                <Form>
                    <div className="tw-relative tw-w-full">
                        <input
                            type="text"
                            name="email"
                            placeholder={getVernacularString("footerSubscribeT2", userPreferences.language)}
                            className="lg-bg-secondary-300 lg-text-secondary-900 tw-w-full tw-p-4 tw-rounded-full"
                        />
                        <div className="tw-absolute tw-top-2.5 tw-right-2.5 tw-bottom-0 tw-w-8 tw-h-8 tw-rounded-full lg-bg-secondary-100 tw-border">
                            <ChevronRightIcon className="tw-w-8 tw-h-8" />
                        </div>
                    </div>
                </Form>

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
                                    <Link to={item.link}>{item.title}</Link>
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
                                    link: "https://www.livguard.com/inverters-for-home-use/",
                                },
                                {
                                    title: `${getVernacularString("footerDisclosure2T2", userPreferences.language)}`,
                                    link: "https://www.livguard.com/inverter-batteries/",
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
                                    link: "https://www.livguard.com/img/annual-return/MGT-7-LETPL-2022.pdf",
                                },
                                {
                                    title: `${getVernacularString("footerDisclosure7T2", userPreferences.language)}`,
                                    link: "https://www.livguard.com/img/annual-return/MGT-7-LBPL-2022.pdf",
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

                <VerticalSpacer className="tw-h-10" />

                <div className="tw-flex tw-flex-col lg-text-secondary-900 tw-px-10">
                    <div className="tw-text-center">{getVernacularString("footerContactT1", userPreferences.language)}</div>

                    <VerticalSpacer className="tw-h-8" />

                    <div className="tw-text-center">{getVernacularString("footerContactT2", userPreferences.language)}</div>

                    <VerticalSpacer className="tw-h-6" />

                    <div className="tw-text-center tw-underline">+91-124-4987 400</div>

                    <VerticalSpacer className="tw-h-6" />

                    <div className="tw-text-center tw-underline">
                        <a href="mailto:marketing@livguard.com">marketing@livguard.com</a>
                    </div>

                    <VerticalSpacer className="tw-h-6" />

                    <div className="tw-text-center tw-underline">
                        <a href="mailto:export@sar-group.com">export@sar-group.com</a>
                    </div>

                    <VerticalSpacer className="tw-h-6" />

                    <div className="tw-text-center">{getVernacularString("footerContactT3", userPreferences.language)}</div>
                </div>

                <VerticalSpacer className="tw-h-4" />

                <FooterSocialLogosAndCopywrite userPreferences={userPreferences} />
            </div>
        </div>
    );
}

export function FooterSocialLogosAndCopywrite({userPreferences}: {userPreferences: UserPreferences}) {
    return (
        <div className="lg-px-screen-edge">
            <VerticalSpacer className="tw-h-6" />

            <div className="tw-flex tw-justify-evenly">
                <a
                    href="https://www.facebook.com/LivguardEnergy/"
                    target="_blank"
                >
                    <Facebook className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                </a>
                <a
                    href="https://twitter.com/LivguardEnergy"
                    target="_blank"
                >
                    <Twitter className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                </a>
                <a
                    href="https://www.instagram.com/livguardenergy/"
                    target="_blank"
                >
                    <Instagram className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                </a>
                <a
                    href="https://www.linkedin.com/company/livguard-energy/"
                    target="_blank"
                >
                    <Linkedin className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
                </a>
                <a
                    href="https://www.youtube.com/@LivguardEnergy"
                    target="_blank"
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
