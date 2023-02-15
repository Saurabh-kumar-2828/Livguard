import {ArrowRightCircleIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import {Form, Link} from "@remix-run/react";
import React, {useState} from "react";
import {Accordion} from "~/components/reusableComponets/accordian";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {UserPreferences} from "~/typeDefinitions";

export function FooterComponent({userPreferences}: {userPreferences: UserPreferences}) {
    const [openDisclosureTitle, setOpenDisclosureTitle] = useState<string | null>(null);

    return (
        <div className="tw-p-4">
            <div className="tw-hidden sm:tw-flex"></div>

            <div className="tw-flex tw-flex-col sm:tw-hidden">
                <VerticalSpacer className="tw-h-6" />

                <div className="lg-text-secondary-900 lg-mobile-heading">Be the first to find out about new stories & latest offers!</div>

                <VerticalSpacer className="tw-h-6" />

                <Form>
                    <div className="tw-relative tw-w-full">
                        <input type="text" name="subscribeMail" placeholder="Enter Your Email To Subscribe" className="lg-bg-secondary-300 lg-text-secondary-700 tw-w-full tw-p-2 tw-rounded-3xl" />
                        <div className="tw-absolute tw-top-0 tw-right-1 tw-bottom-0 tw-m-auto tw-w-7 tw-h-7 tw-rounded-full lg-bg-secondary-100 tw-border">
                            <ChevronRightIcon className="tw-m-auto" />
                        </div>
                    </div>
                </Form>

                <VerticalSpacer className="tw-h-6" />

                <Accordion
                    title="About Us"
                    panelItem={
                        <ItemBuilder
                            items={[
                                {
                                    title: "Contact Us",
                                    link: "https://livguard.com/contact.php",
                                },
                                {
                                    title: "Global Reach",
                                    link: "https://livguard.com/global-reach.php",
                                },
                                {
                                    title: "Blog",
                                    link: "https://livguard.com/blog.php",
                                },
                                {
                                    title: "Privacy Policy",
                                    link: "https://livguard.com/privacy-policy.php",
                                },
                                {
                                    title: "Sales Return Policy",
                                    link: "https://livguard.com/sales-return-policy.php",
                                },
                                {
                                    title: "Terms and Conditions",
                                    link: "https://livguard.com/terms-and-conditions.php",
                                },
                                {
                                    title: "CSR Policy",
                                    link: "https://www.livguard.com/pdf/CSR%20Policy%20(LBPL).pdf",
                                },
                                {
                                    title: "Video Gallery",
                                    link: "https://livguard.com/video-galery.php",
                                },
                                {
                                    title: "Sitemap",
                                    link: "https://livguard.com/sitemap.php",
                                },
                            ]}
                            itemBuilder={(item, itemIndex) => (
                                <div className="lg-text-secondary-900 lg-mobile-bodyText" key={itemIndex}>
                                    <Link to={item.link}>{item.title}</Link>
                                </div>
                            )}
                        />
                    }
                    openDisclosureTitle={openDisclosureTitle}
                    setOpenDisclosureTitle={setOpenDisclosureTitle}
                />

                <VerticalSpacer className="tw-h-6" />

                <Accordion
                    title="Inverters & Batteries"
                    panelItem={
                        <ItemBuilder
                            items={[
                                {
                                    title: "Home Inverters",
                                    link: "https://www.livguard.com/inverters-for-home-use/",
                                },
                                {
                                    title: "Inverter Batteries",
                                    link: "https://www.livguard.com/inverter-batteries/",
                                },
                                {
                                    title: "High Capacity Inverters",
                                    link: "https://www.livguard.com/high-capacity-inverters/",
                                },
                            ]}
                            itemBuilder={(item, itemIndex) => (
                                <div className="lg-text-secondary-900 lg-mobile-bodyText" key={itemIndex}>
                                    <div className="lg-text-secondary-900 lg-mobile-bodyText" key={itemIndex}>
                                        <Link to={item.link}>{item.title}</Link>
                                    </div>
                                </div>
                            )}
                        />
                    }
                    openDisclosureTitle={openDisclosureTitle}
                    setOpenDisclosureTitle={setOpenDisclosureTitle}
                />

                <VerticalSpacer className="tw-h-6" />
                <Accordion
                    title="Automotive Battries"
                    panelItem={
                        <ItemBuilder
                            items={[
                                {
                                    title: "3 Wheeler Batteries",
                                    link: "https://www.livguard.com/three-wheeler-batteries/",
                                },
                                {
                                    title: "Tractor Batteries",
                                    link: "https://www.livguard.com/tractor-batteries/",
                                },
                                {
                                    title: "Bus & Truck Batteries",
                                    link: "https://www.livguard.com/bus-and-truck-batteries/",
                                },
                                {
                                    title: "2 Wheeler Batteries",
                                    link: "https://www.livguard.com/tow-wheeler-batteries/",
                                },
                                {
                                    title: "E-Rickshaw Batteries",
                                    link: "https://www.livguard.com/erickshaw-batteries/",
                                },
                            ]}
                            itemBuilder={(item, itemIndex) => (
                                <div className="lg-text-secondary-900 lg-mobile-bodyText" key={itemIndex}>
                                    <div className="lg-text-secondary-900 lg-mobile-bodyText" key={itemIndex}>
                                        <Link to={item.link}>{item.title}</Link>
                                    </div>
                                </div>
                            )}
                        />
                    }
                    openDisclosureTitle={openDisclosureTitle}
                    setOpenDisclosureTitle={setOpenDisclosureTitle}
                />

                <VerticalSpacer className="tw-h-6" />

                <Accordion
                    title="Solar Solutions"
                    panelItem={
                        <ItemBuilder
                            items={[
                                {
                                    title: "Solar Panels",
                                    link: "https://www.livguard.com/solar-panels-for-home/",
                                },
                                {
                                    title: "Solar Grid Interactive Series",
                                    link: "https://www.livguard.com/solar-grid-interactive-series-for-home/",
                                },
                                {
                                    title: "Solar Inverter",
                                    link: "https://www.livguard.com/solar-panels-and-inverters-for-home/",
                                },
                                {
                                    title: "Solar Management Unit",
                                    link: "https://www.livguard.com/solar-management-unit-for-home/",
                                },
                                {
                                    title: "Solar Management Unit",
                                    link: "https://www.livguard.com/solar-charge-controller-for-home/",
                                },
                                {
                                    title: "Solar Management Unit",
                                    link: "https://www.livguard.com/solar-led-street-light/",
                                },
                                {
                                    title: "Solar Battery",
                                    link: "https://www.livguard.com/solar-battery-for-home/",
                                },
                            ]}
                            itemBuilder={(item, itemIndex) => (
                                <div className="lg-text-secondary-900 lg-mobile-bodyText" key={itemIndex}>
                                    <div className="lg-text-secondary-900 lg-mobile-bodyText" key={itemIndex}>
                                        <Link to={item.link}>{item.title}</Link>
                                    </div>
                                </div>
                            )}
                        />
                    }
                    openDisclosureTitle={openDisclosureTitle}
                    setOpenDisclosureTitle={setOpenDisclosureTitle}
                />

                <VerticalSpacer className="tw-h-6" />

                <Accordion
                    title="Stabilizers"
                    panelItem={
                        <ItemBuilder
                            items={[
                                {
                                    title: "Digital Stabilizers",
                                    link: "https://www.livguard.com/stabilizer-for-AC-and-TV.php",
                                },
                            ]}
                            itemBuilder={(item, itemIndex) => (
                                <div className="lg-text-secondary-900 lg-mobile-bodyText" key={itemIndex}>
                                    <div className="lg-text-secondary-900 lg-mobile-bodyText" key={itemIndex}>
                                        <Link to={item.link}>{item.title}</Link>
                                    </div>
                                </div>
                            )}
                        />
                    }
                    openDisclosureTitle={openDisclosureTitle}
                    setOpenDisclosureTitle={setOpenDisclosureTitle}
                />

                <VerticalSpacer className="tw-h-6" />

                <Accordion
                    title="How can we help?"
                    panelItem={
                        <ItemBuilder
                            items={[
                                {
                                    title: "Battery Finder",
                                    link: "https://www.livguard.com/battery-finder.php",
                                },
                                {
                                    title: "Dealer Locator",
                                    link: "https://www.livguard.com/dealer-locator-for-invertors-and-batteries.php",
                                },
                                {
                                    title: "BMHR",
                                    link: "https://www.livguard.com/bmhr.php",
                                },
                                {
                                    title: "Register Your Product",
                                    link: "https://www.livguard.com/register-and-warranty-for-inverters.php",
                                },
                                {
                                    title: "Service Support",
                                    link: "https://www.livguard.com/contact.php",
                                },
                            ]}
                            itemBuilder={(item, itemIndex) => (
                                <div className="lg-text-secondary-900 lg-mobile-bodyText" key={itemIndex}>
                                    <div className="lg-text-secondary-900 lg-mobile-bodyText" key={itemIndex}>
                                        <Link to={item.link}>{item.title}</Link>
                                    </div>
                                </div>
                            )}
                        />
                    }
                    openDisclosureTitle={openDisclosureTitle}
                    setOpenDisclosureTitle={setOpenDisclosureTitle}
                />

                <VerticalSpacer className="tw-h-6" />

                <Accordion
                    title="Investor"
                    panelItem={
                        <ItemBuilder
                            items={[
                                {
                                    title: "LETPL Annual return– 2021-22",
                                    link: "https://www.livguard.com/img/annual-return/MGT-7-LETPL-2022.pdf",
                                },
                                {
                                    title: "LBPL Annual return– 2021-22",
                                    link: "https://www.livguard.com/img/annual-return/MGT-7-LBPL-2022.pdf",
                                },
                            ]}
                            itemBuilder={(item, itemIndex) => (
                                <div className="lg-text-secondary-900 lg-mobile-bodyText" key={itemIndex}>
                                    <div className="lg-text-secondary-900 lg-mobile-bodyText" key={itemIndex}>
                                        <Link to={item.link}>{item.title}</Link>
                                    </div>
                                </div>
                            )}
                        />
                    }
                    openDisclosureTitle={openDisclosureTitle}
                    setOpenDisclosureTitle={setOpenDisclosureTitle}
                />

                <VerticalSpacer className="tw-h-10" />

                <div className="tw-flex tw-flex-col lg-text-secondary-900 tw-px-10">
                    <div className="lg-mobile-title2 tw-text-center">GET IN TOUCH</div>

                    <VerticalSpacer className="tw-h-8" />

                    <div className="lg-mobile-bodyText tw-text-center">Plot No. 221, Phase-I, Udyog Vihar, Gurgaon 122016 Haryana, India</div>

                    <VerticalSpacer className="tw-h-6" />

                    <div className="lg-mobile-bodyText tw-text-center tw-underline">+91-124-4987 400</div>

                    <VerticalSpacer className="tw-h-6" />

                    <div className="lg-mobile-bodyText tw-text-center tw-underline">
                        <a href="mailto:marketing@livguard.com">marketing@livguard.com</a>
                    </div>

                    <VerticalSpacer className="tw-h-6" />

                    <div className="lg-mobile-bodyText tw-text-center tw-underline">
                        <a href="mailto:export@sar-group.com">export@sar-group.com</a>
                    </div>

                    <VerticalSpacer className="tw-h-6" />

                    <div className="lg-mobile-bodyText tw-text-center">#EnergyUnlimited</div>

                    <VerticalSpacer className="tw-h-6" />
                </div>
            </div>
        </div>
    );
}
