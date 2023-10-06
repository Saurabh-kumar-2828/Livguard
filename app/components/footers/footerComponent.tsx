import {ChevronRightIcon} from "@heroicons/react/20/solid";
import {Link, useFetcher} from "@remix-run/react";
import {useEffect, useState} from "react";
import {Facebook, Instagram, Linkedin, Twitter, Youtube} from "react-bootstrap-icons";
import {toast} from "react-toastify";
import {Accordion, MoreAboutLivguardAccordian} from "~/components/accordian";
import {FooterSocialLogosAndCopyright, SocialMediaIcons, SubscribeSuccessDialog} from "~/components/footers/common";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import {emailIdValidationPattern} from "~/global-common-typescript/utilities/validationPatterns";
import {ContactUsCta} from "~/routes";
import type {UserPreferences} from "~/typeDefinitions";
import {Theme} from "~/typeDefinitions";
import {getVernacularString} from "~/vernacularProvider";

export function FooterComponent({
    userPreferences,
    utmParameters,
    pageUrl,
}: {
    userPreferences: UserPreferences;
    utmParameters: {
        [searchParameter: string]: string;
    };
    pageUrl: string;
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

    const shoppingToolsAccordianList = [
        {
            title: `${getVernacularString("06bdee07-e0a5-418c-8aab-90a5debb6b61", userPreferences.language)}`,
            link: "/pricing",
            target: false,
        },
        {
            title: `${getVernacularString("a934d750-a5a0-4b8b-b343-e6af45966c63", userPreferences.language)}`,
            link: "/offers",
            target: false,
        },
        // {
        //     title: `${getVernacularString("095a8a44-87c6-454e-8b5f-abed73e54c54", userPreferences.language)}`,
        //     link: "#",
        //     target: true,
        // },
        {
            title: `${getVernacularString("be39d262-3769-4f4c-8d54-3ed7d6500101", userPreferences.language)}`,
            link: "/load-calculator",
            target: false,
        },
        {
            title: `${getVernacularString("09d8b17e-501d-4fcd-8371-930579ff3265", userPreferences.language)}`,
            link: "/battery-finder",
            target: false,
        },
        {
            title: `${getVernacularString("1ab892b7-3762-49a6-a36b-205ed0980f2a", userPreferences.language)}`,
            link: "https://www.livguardsolar.com/solar/solculator",
            target: true,
        },
        {
            title: `${getVernacularString("7a2b7f51-c58b-4f43-bdf4-881209fe2acd", userPreferences.language)}`,
            link: "https://www.livguard.com/blog/",
            target: true,
        },
        // {
        //     title: `${getVernacularString("footerDisclosure1T7", userPreferences.language)}`,
        //     link: "/csr/",
        //     target: true,
        // },
        // {
        //     title: `${getVernacularString("footerDisclosure1T8", userPreferences.language)}`,
        //     link: "/video-gallery/",
        //     target: true,
        // },
        // {
        //     title: `${getVernacularString("footerDisclosure1T9", userPreferences.language)}`,
        //     link: "/sitemap.php",
        //     target: true,
        // },
    ];

    const companyAccordianList = [
        {
            title: `${getVernacularString("8c28a7c5-2e4e-4708-bd33-80358a9acaf2", userPreferences.language)}`,
            link: "/about-us",
            target: false,
        },
        {
            title: `${getVernacularString("121206cf-56f5-443a-a624-21cfe2d38070", userPreferences.language)}`,
            link: "/india-ops",
            target: false,
        },
        {
            title: `${getVernacularString("453c92b4-5576-4452-a2ce-92586e5eda28", userPreferences.language)}`,
            link: "/global-ops",
            target: false,
        },
        {
            title: `${getVernacularString("1acc9d47-614a-4fc6-8f8e-ab8d6ebc1ae6", userPreferences.language)}`,
            link: "/csr",
            target: false,
        },
        {
            title: `${getVernacularString("636ca3f4-627f-48c3-9f1b-d3490094d536", userPreferences.language)}`,
            link: "/e-waste-management",
            target: false,
        },
        {
            title: `${getVernacularString("69838ae8-eb67-4ea5-9179-990db737a138", userPreferences.language)}`,
            link: "/governance",
            target: false,
        },
        // {
        //     title: `${getVernacularString("footerDisclosure2T1", userPreferences.language)}`,
        //     link: "/inverter-for-home",
        //     target: false,
        // },
        // {
        //     title: `${getVernacularString("footerDisclosure2T2", userPreferences.language)}`,
        //     link: "/inverter-batteries",
        //     target: false,
        // },
        // {
        //     title: `${getVernacularString("footerDisclosure2T3", userPreferences.language)}`,
        //     link: "/high-capacity-inverters/",
        //     target: false,
        // },
    ];

    const dealerLocatorAccordionList = [
        {
            title: `${getVernacularString("35178fbf-bc7e-4b8b-a49a-17bff7feaa18", userPreferences.language)}`,
            link: "/dealer-for-inverters-and-batteries",
            target: false,
        },
        {
            title: `${getVernacularString("3cb60479-da6d-462c-879c-5a1b510630a4", userPreferences.language)}`,
            link: "https://battery-inverter-dealers.livguard.com/",
            target: true,
        },

        // {
        //     title: `${getVernacularString("footerDisclosure3T6", userPreferences.language)}`,
        //     link: "/car-and-suv-batteries/",
        //     target: true,
        // },
        // {
        //     title: `${getVernacularString("footerDisclosure3T1", userPreferences.language)}`,
        //     link: "/three-wheeler-batteries/",
        //     target: true,
        // },
        // {
        //     title: `${getVernacularString("footerDisclosure3T2", userPreferences.language)}`,
        //     link: "/tractor-batteries/",
        //     target: true,
        // },
        // {
        //     title: `${getVernacularString("footerDisclosure3T3", userPreferences.language)}`,
        //     link: "/bus-and-truck-batteries/",
        //     target: true,
        // },
        // {
        //     title: `${getVernacularString("footerDisclosure3T4", userPreferences.language)}`,
        //     link: "/two-wheeler-batteries/",
        //     target: true,
        // },
        // {
        //     title: `${getVernacularString("footerDisclosure3T5", userPreferences.language)}`,
        //     link: "/e-rickshaw-batteries/",
        //     target: true,
        // },
    ];

    const mediaAndGalleryAccordianList = [
        {
            title: `${getVernacularString("ff612253-40bd-4b64-b93d-955ff8097afd", userPreferences.language)}`,
            link: "/video-gallery",
            target: false,
        },
        // {
        //     title: `${getVernacularString("b58e0802-9926-42c7-8b21-b9bcac8f895f", userPreferences.language)}`,
        //     link: "#",
        //     target: false,
        // },
        // {
        //     title: `${getVernacularString("bfaf5f70-76d6-41fe-b11a-bf91f00af887", userPreferences.language)}`,
        //     link: "#",
        //     target: false,
        // },
        // {
        //     title: `${getVernacularString("footerDisclosure4T1", userPreferences.language)}`,
        //     link: "/solar-panels-for-home/",
        //     target: true,
        // },
        // {
        //     title: `${getVernacularString("footerDisclosure4T2", userPreferences.language)}`,
        //     link: "/solar-grid-interactive-series-for-home/",
        //     target: true,
        // },
        // {
        //     title: `${getVernacularString("footerDisclosure4T3", userPreferences.language)}`,
        //     link: "/solar-panels-and-inverters-for-home/",
        //     target: true,
        // },
        // {
        //     title: `${getVernacularString("footerDisclosure4T4", userPreferences.language)}`,
        //     link: "/solar-management-unit-for-home/",
        //     target: true,
        // },
        // {
        //     title: `${getVernacularString("footerDisclosure4T5", userPreferences.language)}`,
        //     link: "/solar-charge-controller-for-home/",
        //     target: true,
        // },
        // {
        //     title: `${getVernacularString("footerDisclosure4T6", userPreferences.language)}`,
        //     link: "/solar-led-street-light/",
        //     target: true,
        // },
        // {
        //     title: `${getVernacularString("footerDisclosure4T7", userPreferences.language)}`,
        //     link: "/solar-battery-for-home/",
        //     target: true,
        // },
    ];

    // const stabelizersAccordianList = [
    //     {
    //         title: `${getVernacularString("footerDisclosure5T1", userPreferences.language)}`,
    //         link: "/stabilizer-for-AC-and-TV.php",
    //         target: true,
    //     },
    // ];

    const supportAccordianList = [
        {
            title: `${getVernacularString("f1ab4d68-c36d-4484-851d-58a6c48bc4ee", userPreferences.language)}`,
            link: "/contact-us",
            target: false,
        },
        {
            title: `${getVernacularString("96e824a1-876e-42ec-a9b5-2f68fea3a6d3", userPreferences.language)}`,
            link: "/service",
            target: false,
        },
        {
            title: `${getVernacularString("4f0455d6-1f64-4f56-9cea-3d1655b10c5c", userPreferences.language)}`,
            link: "/warranty",
            target: false,
        },
        // {
        //     title: `${getVernacularString("4316557c-1532-401f-8030-390ea9bf4790", userPreferences.language)}`,
        //     link: "#",
        //     target: false,
        // },
        // {
        //     title: `${getVernacularString("5d9b749d-0a6e-42a2-abbb-bc2e441bb655", userPreferences.language)}`,
        //     link: "",
        //     target: false,
        // },
        // {
        //     title: `${getVernacularString("90920b9e-0139-4f28-a126-1768bc703953", userPreferences.language)}`,
        //     link: "",
        //     target: false,
        // },
        // {
        //     title: `${getVernacularString("footerDisclosure6T1", userPreferences.language)}`,
        //     link: "/battery-finder/",
        //     target: true,
        // },
        // {
        //     title: `${getVernacularString("footerDisclosure6T2", userPreferences.language)}`,
        //     link: "/dealer-for-inverters-and-batteries",
        //     target: false,
        // },
        // {
        //     title: `${getVernacularString("footerDisclosure6T3", userPreferences.language)}`,
        //     link: "/bmhr.php",
        //     target: true,
        // },
        // {
        //     title: `${getVernacularString("footerDisclosure6T4", userPreferences.language)}`,
        //     link: "/warranty/",
        //     target: false,
        // },
        // {
        //     title: `${getVernacularString("footerDisclosure6T5", userPreferences.language)}`,
        //     link: "/service/",
        //     target: false,
        // },
    ];

    const customerPoliciesAccordianList = [
        {
            title: `${getVernacularString("0c031708-7b42-4db6-ac33-902a7f0492f5", userPreferences.language)}`,
            link: "/terms-and-conditions",
            target: false,
        },
        {
            title: `${getVernacularString("286aa9a0-fadc-4b90-b967-3d300307fdbe", userPreferences.language)}`,
            link: "/sales-return-policy",
            target: false,
        },
        {
            title: `${getVernacularString("dd2edb48-b8fa-4f95-b0a0-5581ec7e8ad6", userPreferences.language)}`,
            link: "/privacy-policy",
            target: false,
        },
        // {
        //     title: `${getVernacularString("footerDisclosure7T1", userPreferences.language)}`,
        //     link: "https://www.livguard.com/static-assets/LBPL_Notice of Secured creditors meeting dt 01.04.2023.pdf",
        //     target: true,
        // },
        // {
        //     title: `${getVernacularString("footerDisclosure7T2", userPreferences.language)}`,
        //     link: "https://www.livguard.com/static-assets/LBPL_Notice of Unsecured creditors meeting dt 01.04.2023.pdf",
        //     target: true,
        // },
        // {
        //     title: `${getVernacularString("footerDisclosure7T3", userPreferences.language)}`,
        //     link: "https://www.livguard.com/static-assets/LETPL_Notice of Secured creditors meeting dt 01.04.2023.pdf",
        //     target: true,
        // },
        // {
        //     title: `${getVernacularString("footerDisclosure7T4", userPreferences.language)}`,
        //     link: "https://www.livguard.com/static-assets/MGT-7_2021-22_LBPL.pdf",
        //     target: true,
        // },
        // {
        //     title: `${getVernacularString("footerDisclosure7T4", userPreferences.language)}`,
        //     link: "https://www.livguard.com/static-assets/MGT-7_2021-22_LETPL.pdf",
        //     target: true,
        // },
        // {
        //     title: `${getVernacularString("footerDisclosure7T6", userPreferences.language)}`,
        //     link: "https://www.livguard.com/static-assets/LBPL_Notice of Secured creditors meeting dt 01.04.2023.pdf",
        //     target: true,
        // },
        // {
        //     title: `${getVernacularString("footerDisclosure7T7", userPreferences.language)}`,
        //     link: "https://www.livguard.com/static-assets/LBPL_Notice of Unsecured creditors meeting dt 01.04.2023.pdf",
        //     target: true,
        // },
        // {
        //     title: `${getVernacularString("footerDisclosure7T8", userPreferences.language)}`,
        //     link: "https://www.livguard.com/static-assets/LETPL_Notice of Secured creditors meeting dt 01.04.2023.pdf",
        //     target: true,
        // },
    ];
    const homeSolutionsAccordianList = [
        // {
        //     title: `${getVernacularString("1f8b2070-1c48-4396-999d-3195c96cabd7", userPreferences.language)}`,
        //     link: "#",
        //     target: false,
        // },
        {
            title: `${getVernacularString("89f3948f-ec87-4fd9-aaf7-b7ee99b2d900", userPreferences.language)}`,
            link: "/inverter-for-home",
            target: false,
        },
        {
            title: `${getVernacularString("4b6c134b-096e-49cf-9e12-d53c0e3cf059", userPreferences.language)}`,
            link: "/high-capacity-inverters",
            target: false,
        },
        {
            title: `${getVernacularString("0e58360b-6e83-47da-a0c5-afca55819e50", userPreferences.language)}`,
            link: "/load-calculator",
            target: false,
        },
        {
            title: `${getVernacularString("f76f3bd2-566f-44fe-bedb-c66cdfc42a0e", userPreferences.language)}`,
            link: "/inverter-trolley",
            target: false,
        },
        {
            title: `${getVernacularString("5e7fac2e-dfcc-4fde-90ac-99fec03abb21", userPreferences.language)}`,
            link: "/inverter-batteries",
            target: false,
        },
        // {
        //     title: `${getVernacularString("3b12adfb-c368-4141-bd61-b15487af1696", userPreferences.language)}`,
        //     link: "#",
        //     target: false,
        // },
    ];

    const automotiveSolutionsAccordianList = [
        // {
        //     title: `${getVernacularString("1f8b2070-1c48-4396-999d-3195c96cabd7", userPreferences.language)}`,
        //     link: "#",
        //     target: false,
        // },
        // {
        //     title: `${getVernacularString("89f3948f-ec87-4fd9-aaf7-b7ee99b2d900", userPreferences.language)}`,
        //     link: "/inverter-for-home",
        //     target: false,
        // },
        // {
        //     title: `${getVernacularString("4b6c134b-096e-49cf-9e12-d53c0e3cf059", userPreferences.language)}`,
        //     link: "/high-capacity-inverters",
        //     target: false,
        // },
        // {
        //     title: `${getVernacularString("0e58360b-6e83-47da-a0c5-afca55819e50", userPreferences.language)}`,
        //     link: "/load-calculator",
        //     target: false,
        // },
        // {
        //     title: `${getVernacularString("f76f3bd2-566f-44fe-bedb-c66cdfc42a0e", userPreferences.language)}`,
        //     link: "/inverter-trolley",
        //     target: false,
        // },
        // {
        //     title: `${getVernacularString("5e7fac2e-dfcc-4fde-90ac-99fec03abb21", userPreferences.language)}`,
        //     link: "/inverter-batteries",
        //     target: false,
        // },
        // {
        //     title: `${getVernacularString("3b12adfb-c368-4141-bd61-b15487af1696", userPreferences.language)}`,
        //     link: "#",
        //     target: false,
        // },
        {
            title: `${getVernacularString("27a6ac19-b8ed-43e6-927a-562bf232d8d6", userPreferences.language)}`,
            link: "/two-wheeler-batteries",
            target: false,
        },
        {
            title: `${getVernacularString("b56af9ea-2d7d-45e5-8886-d4a367bc7e89", userPreferences.language)}`,
            link: "/three-wheeler-batteries",
            target: false,
        },
        {
            title: `${getVernacularString("fa4d03f8-1288-4254-8af9-6135a878df8e", userPreferences.language)}`,
            link: "/car-and-suv-batteries",
            target: false,
        },
        {
            title: `${getVernacularString("831ac44b-7d9d-472f-8377-a700b9bd6596", userPreferences.language)}`,
            link: "/bus-and-truck-batteries",
            target: false,
        },
        {
            title: `${getVernacularString("10a9d622-6fcc-4689-9fdb-d245d46a491e", userPreferences.language)}`,
            link: "/tractor-batteries",
            target: false,
        },
        {
            title: `${getVernacularString("8aea3499-6fc0-40b3-b7fe-93f8504e9d7e", userPreferences.language)}`,
            link: "/e-rickshaw-batteries",
            target: false,
        },
        {
            title: `${getVernacularString("54504980-d98c-4f68-a7cc-bf716ecb905d", userPreferences.language)}`,
            link: "/battery-finder",
            target: false,
        },
        {
            title: `${getVernacularString("4f427a78-8c4f-4c36-833f-545a0d2a775d", userPreferences.language)}`,
            link: "/e-rickshaw-charger",
            target: false,
        },
    ];

    const solarSolutionsAccordianList = [
        {
            title: `${getVernacularString("c5d478da-fd36-446a-aae6-1bfe13607be1", userPreferences.language)}`,
            link: "https://www.livguardsolar.com/solar/solculator",
            target: true,
        },
        // {
        //     title: `${getVernacularString("1bb35c7d-3856-46ef-a49e-cd0241c6f828", userPreferences.language)}`,
        //     link: "#",
        //     target: false,
        // },
        {
            title: `${getVernacularString("6017a74c-fd49-4086-892d-e0548e7c7e51", userPreferences.language)}`,
            link: "https://www.livguard.com/solar-battery-for-home/",
            target: true,
        },
        // {
        //     title: `${getVernacularString("f3ba3cad-77ef-4a58-9760-2ef4cd33bb11", userPreferences.language)}`,
        //     link: "/battery-finder",
        //     target: false,
        // },
        {
            title: `${getVernacularString("d1df7722-e72b-4c08-94d9-5e8adc4d5a93", userPreferences.language)}`,
            link: "https://www.livguard.com/solar-panels-and-inverters-for-home/",
            target: true,
        },
        // {
        //     title: `${getVernacularString("f262e016-6ca4-44af-a202-a3ab02100dbb", userPreferences.language)}`,
        //     link: "#",
        //     target: false,
        // },
        // {
        //     title: `${getVernacularString("ea124d83-7e89-4cdf-b968-fc241583ce35", userPreferences.language)}`,
        //     link: "#",
        //     target: false,
        // },
        // {
        //     title: `${getVernacularString("05b8415f-616b-4aed-8c0b-fd31305c6026", userPreferences.language)}`,
        //     link: "#",
        //     target: false,
        // },
        // {
        //     title: `${getVernacularString("2f4de646-0e7c-424f-bcd4-52deb4003705", userPreferences.language)}`,
        //     link: "https://www.livguard.com/solar-panels-for-home/",
        //     target: true,
        // },
        // {
        //     title: `${getVernacularString("369e90db-f15f-4ec7-834f-46e460f1e0fd", userPreferences.language)}`,
        //     link: "#",
        //     target: false,
        // },
        // {
        //     title: `${getVernacularString("e9218e48-d0fa-40b4-9189-39e4d37c847d", userPreferences.language)}`,
        //     link: "#",
        //     target: false,
        // },
        // {
        //     title: `${getVernacularString("e02353bf-c629-4104-8b43-6fe8a43610cc", userPreferences.language)}`,
        //     link: "#",
        //     target: false,
        // },
        {
            title: `${getVernacularString("d590735a-b2e3-4e86-a9e6-7a3991bd8956", userPreferences.language)}`,
            link: "https://www.livguard.com/solar-charge-controller-for-home/index.php",
            target: true,
        },
        {
            title: `${getVernacularString("f12df3fc-ddaf-4809-b2dc-d34c218db76f", userPreferences.language)}`,
            link: "https://www.livguard.com/solar-management-unit-for-home/index.php",
            target: true,
        },
        {
            title: `${getVernacularString("93c283cc-941d-4382-aabb-67f017dd119b", userPreferences.language)}`,
            link: "https://www.livguard.com/solar-led-street-light/index.php",
            target: true,
        },
        {
            title: `${getVernacularString("e45100e2-66ca-4476-9822-c37e64ae5356", userPreferences.language)}`,
            link: "https://www.livguardsolar.com/",
            target: true,
        },
        // {
        //     title: `${getVernacularString("3387d316-f651-4fec-82e4-8b25c923a1b2", userPreferences.language)}`,
        //     link: "#",
        //     target: false,
        // },
        // {
        //     title: `${getVernacularString("8641e5e9-7f63-49a8-9586-30d0be4a8e98", userPreferences.language)}`,
        //     link: "#",
        //     target: false,
        // },
        // {
        //     title: `${getVernacularString("d000e8b7-9e75-48b2-a131-39864fe80130", userPreferences.language)}`,
        //     link: "#",
        //     target: false,
        // },
        // {
        //     title: `${getVernacularString("58860329-bf1a-40c4-ba47-6103a0b013db", userPreferences.language)}`,
        //     link: "#",
        //     target: false,
        // },
    ];
    return (
        <div className="lg-px-screen-edge lg:tw-px-0">
            {/* TODO: Check if this is intentional, otherwise remove */}
            <VerticalSpacer className="tw-h-8 lg:tw-hidden" />

            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-rows-[auto_2rem_auto_auto_auto_auto] lg:tw-grid-cols-[21.5rem_repeat(4,minmax(0,1fr))_1.5rem] lg:tw-gap-x-8 lg:tw-gap-y-4">
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

                <div className="lg:tw-row-start-1 lg:tw-col-start-1 lg:tw-col-span-full tw-flex lg:tw-flex-row lg:tw-justify-between lg:tw-items-center lg:tw-px-[72px] lg:tw-py-4 lg:tw-gap-10 lg:tw-bg-new-background-border-500-light lg:dark:tw-bg-new-background-border-500-dark">
                    <div className="tw-grid lg:tw-grid-cols-2 lg:tw-grid-rows-1 tw-grid-rows-[auto_auto] tw-grid-cols-1 lg:tw-items-center tw-w-full">
                        <div className="lg-text-secondary-900 lg-text-title2 lg:tw-max-w-[18.5rem]">{getVernacularString("footerSubscribeT1", userPreferences.language)}</div>

                        <VerticalSpacer className="tw-h-3 lg:tw-hidden" />

                        <fetcher.Form
                            method="post"
                            action="/subscribe"
                            className="tw-w-full lg:tw-max-w-sm tw-grid tw-justify-self-end"
                        >
                            <div className="tw-relative tw-grid tw-justify-items-end">
                                <input
                                    type="text"
                                    name="emailId"
                                    id="signup_email"
                                    pattern={emailIdValidationPattern}
                                    placeholder={getVernacularString("footerSubscribeT2", userPreferences.language)}
                                    className="tw-bg-secondary-100-light dark:tw-bg-secondary-300-dark  dark:tw-outline-none tw-outline-1 tw-outline-secondary-500-light lg-text-secondary-900 tw-w-full tw-p-4 tw-rounded-full tw-outline lg:tw-outline-none"
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

                    {/* <SocialMediaIcons className="tw-hidden lg:tw-flex lg:tw-justify-self-end" />

                    <SubscribeSuccessDialog
                        userPreferences={userPreferences}
                        isSuccessDialogOpen={isSubscribeSuccessDialogeOpen}
                        setSuccessDialogOpen={setIsSubscribeSuccessDialogeOpen}
                    /> */}

                    <VerticalSpacer className="tw-h-3 lg:tw-hidden" />
                </div>

                <VerticalSpacer className="tw-h-6 lg:tw-hidden" />

                <Accordion
                    title={getVernacularString("eb4e6810-b019-4d59-94b2-41351f268590", userPreferences.language)}
                    panelItem={
                        <ItemBuilder
                            items={shoppingToolsAccordianList}
                            itemBuilder={(item, itemIndex) => (
                                <div
                                    className="lg-text-secondary-900 hover:lg-text-primary-500"
                                    key={itemIndex}
                                >
                                    {item.target ? (
                                        <Link
                                            className="hover:lg-text-primary-500"
                                            to={item.link}
                                            target="_blank"
                                        >
                                            {item.title}
                                        </Link>
                                    ) : (
                                        <Link
                                            className="hover:lg-text-primary-500"
                                            to={item.link}
                                        >
                                            {item.title}
                                        </Link>
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
                    title={getVernacularString("bf233b5c-c4e0-4161-aa37-8d0eba708d4c", userPreferences.language)}
                    panelItem={
                        <ItemBuilder
                            items={companyAccordianList}
                            itemBuilder={(item, itemIndex) => (
                                <div
                                    className="lg-text-secondary-900 hover:lg-text-primary-500"
                                    key={itemIndex}
                                >
                                    <Link
                                        className="hover:lg-text-primary-500"
                                        to={item.link}
                                    >
                                        {item.title}
                                    </Link>
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
                    disclosurePanelContainerClassName="!tw-max-h-[unset]"
                    title={getVernacularString("fc828855-64e1-4be5-b95f-bee9fe4a3262", userPreferences.language)}
                    panelItem={
                        <ItemBuilder
                            items={dealerLocatorAccordionList}
                            itemBuilder={(item, itemIndex) => (
                                <div
                                    className="lg-text-secondary-900"
                                    key={itemIndex}
                                >
                                    <Link
                                        className="hover:lg-text-primary-500"
                                        to={item.link}
                                    >
                                        {item.title}
                                    </Link>
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
                    disclosurePanelContainerClassName="!tw-max-h-[unset]"
                    title={getVernacularString("6d46ed34-f819-4c0a-a7ca-29ac67f6486b", userPreferences.language)}
                    panelItem={
                        <ItemBuilder
                            items={mediaAndGalleryAccordianList}
                            itemBuilder={(item, itemIndex) => (
                                <div
                                    className="lg-text-secondary-900"
                                    key={itemIndex}
                                >
                                    <Link
                                        className="hover:lg-text-primary-500"
                                        to={item.link}
                                    >
                                        {item.title}
                                    </Link>
                                </div>
                            )}
                        />
                    }
                    className="lg:tw-hidden"
                    // openDisclosureTitle={openDisclosureTitle}
                    // setOpenDisclosureTitle={setOpenDisclosureTitle}
                />

                {/* <VerticalSpacer className="tw-h-3 lg:tw-hidden" />

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
                /> */}

                <VerticalSpacer className="tw-h-3 lg:tw-hidden" />

                <Accordion
                    disclosurePanelContainerClassName="!tw-max-h-[unset]"
                    title={getVernacularString("31850c84-bfb5-42cb-b470-489a351c2d99", userPreferences.language)}
                    panelItem={
                        <ItemBuilder
                            items={supportAccordianList}
                            itemBuilder={(item, itemIndex) => (
                                <div
                                    className="lg-text-secondary-900"
                                    key={itemIndex}
                                >
                                    <Link
                                        className="hover:lg-text-primary-500"
                                        to={item.link}
                                    >
                                        {item.title}
                                    </Link>
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
                    title={getVernacularString("c54ca3ff-b15f-445a-8e7b-c85985e5d355", userPreferences.language)}
                    panelItem={
                        <ItemBuilder
                            items={customerPoliciesAccordianList}
                            itemBuilder={(item, itemIndex) => (
                                <div
                                    className="lg-text-secondary-900"
                                    key={itemIndex}
                                >
                                    <Link
                                        to={item.link}
                                        className="hover:lg-text-primary-500"
                                        target="_blank"
                                    >
                                        {item.title}
                                    </Link>
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
                    disclosurePanelContainerClassName="!tw-max-h-[unset]"
                    title={getVernacularString("642467c3-8136-4523-b231-fa5aae9a075a", userPreferences.language)}
                    panelItem={
                        <ItemBuilder
                            items={homeSolutionsAccordianList}
                            itemBuilder={(item, itemIndex) => (
                                <div
                                    className="lg-text-secondary-900"
                                    key={itemIndex}
                                >
                                    <Link
                                        to={item.link}
                                        className="hover:lg-text-primary-500"
                                        target="_blank"
                                    >
                                        {item.title}
                                    </Link>
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
                    disclosurePanelContainerClassName="!tw-max-h-[unset]"
                    title={getVernacularString("e9624c2c-a16e-4f56-88a2-3e2710461b14", userPreferences.language)}
                    panelItem={
                        <ItemBuilder
                            items={automotiveSolutionsAccordianList}
                            itemBuilder={(item, itemIndex) => (
                                <div
                                    className="lg-text-secondary-900"
                                    key={itemIndex}
                                >
                                    <Link
                                        to={item.link}
                                        className="hover:lg-text-primary-500"
                                        target="_blank"
                                    >
                                        {item.title}
                                    </Link>
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
                    disclosurePanelContainerClassName="!tw-max-h-[unset]"
                    title={getVernacularString("3a186513-50e2-4738-8d17-0f8691fa7b1c", userPreferences.language)}
                    panelItem={
                        <ItemBuilder
                            items={solarSolutionsAccordianList}
                            itemBuilder={(item, itemIndex) => (
                                <div
                                    className="lg-text-secondary-900"
                                    key={itemIndex}
                                >
                                    <Link
                                        to={item.link}
                                        target="_blank"
                                        className="hover:lg-text-primary-500"
                                    >
                                        {item.title}
                                    </Link>
                                </div>
                            )}
                        />
                    }
                    className="lg:tw-hidden"
                    // openDisclosureTitle={openDisclosureTitle}
                    // setOpenDisclosureTitle={setOpenDisclosureTitle}
                />
                <VerticalSpacer className="tw-h-5 lg:tw-hidden" />

                <div className="lg:tw-row-start-5 lg:tw-col-start-1 tw-flex tw-flex-col lg-text-secondary-900 tw-px-10 lg:tw-px-0 tw-text-center tw-items-center lg:tw-items-start lg:tw-text-left lg:tw-pl-[4.5rem]">
                    <div className="lg-text-body-bold">{getVernacularString("c1e1b2f0-d75f-409c-b0f3-cbc9c2adeb00", userPreferences.language)}</div>
                    <VerticalSpacer className="tw-h-3" />
                    <div className="tw-w-fit tw-overflow-hidden tw-relative tw-group tw-transition !tw-text-center">
                        <ContactUsCta
                            utmParameters={utmParameters}
                            pageUrl={pageUrl}
                            userPreferences={userPreferences}
                            buttonClassName="!tw-bg-none !tw-p-0 !lg-text-body-bold !tw-text-secondary-900-light hover:!tw-text-primary-500-light hover:dark:!tw-text-primary-500-dark !tw-duration-200 dark:!tw-text-secondary-900-dark !tw-text-center"
                            textVernacId="639fd244-9283-4467-b186-6ee26321127b"
                            className="tw-overflow-hidden tw-text-center"
                        />
                        <span className="tw-hidden lg:tw-block tw-absolute -tw-left-[1px] tw-bottom-0 -tw-translate-x-full group-hover:tw-translate-x-0 tw-ease-in tw-duration-300 tw-h-[1px] tw-w-full lg-bg-primary-500"></span>
                    </div>

                    <VerticalSpacer className="tw-h-3" />

                    <div className="lg-text-body-bold tw-underline">{getVernacularString("6074c564-2033-43e5-8d9f-02d5c9052ca4", userPreferences.language)}</div>

                    {/* <VerticalSpacer className="tw-h-3" /> */}

                    <div>{getVernacularString("22156ff3-a4a5-4d59-ab0c-902c21b667f9", userPreferences.language)}</div>

                    <VerticalSpacer className="tw-h-3" />

                    <div className="tw-overflow-hidden hover:lg-text-primary-500 lg-text-secondary-900 tw-duration-200">
                        <a
                            className="tw-overflow-hidden tw-relative tw-group tw-transition"
                            href="tel:+911244987400"
                        >
                            {getVernacularString("6055a64a-ea5b-4d3d-b74d-bd999d984e2d", userPreferences.language)}
                            <span className="tw-hidden lg:tw-block tw-absolute -tw-left-[1px] tw-bottom-0 -tw-translate-x-full group-hover:tw-translate-x-0 tw-ease-in tw-duration-300 tw-h-[1px] tw-w-full lg-bg-primary-500"></span>
                        </a>
                    </div>
                    <VerticalSpacer className="tw-h-3" />

                    <div>{getVernacularString("3e0fdf22-5ffc-4168-b4a6-3bf6e47e197d", userPreferences.language)}</div>

                    <VerticalSpacer className="tw-h-3" />

                    <div className="tw-overflow-hidden hover:lg-text-primary-500 lg-text-secondary-900 tw-duration-200">
                        <a
                            className="tw-overflow-hidden tw-relative tw-group tw-transition"
                            href="https://www.livguard.com/"
                        >
                            www.livguard.com
                            <span className="tw-hidden lg:tw-block tw-absolute -tw-left-[1px] tw-bottom-0 -tw-translate-x-full group-hover:tw-translate-x-0 tw-ease-in tw-duration-300 tw-h-[1px] tw-w-full lg-bg-primary-500"></span>
                        </a>
                    </div>

                    <VerticalSpacer className="tw-h-3" />

                    <div className="tw-overflow-hidden hover:lg-text-primary-500 lg-text-secondary-900 tw-duration-200">
                        <a
                            className="tw-overflow-hidden tw-relative tw-group tw-transition"
                            href="mailto:marketing@livguard.com"
                        >
                            marketing@livguard.com
                            <span className="tw-hidden lg:tw-block tw-absolute -tw-left-[1px] tw-bottom-0 -tw-translate-x-full group-hover:tw-translate-x-0 tw-ease-in tw-duration-300 tw-h-[1px] tw-w-full lg-bg-primary-500"></span>
                        </a>
                    </div>

                    <VerticalSpacer className="tw-h-3" />

                    <div className="tw-overflow-hidden hover:lg-text-primary-500 lg-text-secondary-900 tw-duration-200">
                        <a
                            className="tw-overflow-hidden tw-relative tw-group tw-transition"
                            href="mailto:export@sar-group.com"
                        >
                            export@sar-group.com
                            <span className="tw-hidden lg:tw-block tw-absolute -tw-left-[1px] tw-bottom-0 -tw-translate-x-full group-hover:tw-translate-x-0 tw-ease-in tw-duration-300 tw-h-[1px] tw-w-full lg-bg-primary-500"></span>
                        </a>
                    </div>

                    <VerticalSpacer className="tw-h-3" />

                    <div>{getVernacularString("footerContactT3", userPreferences.language)}</div>

                    <VerticalSpacer className="tw-h-3 tw-hidden lg:tw-block" />
                    <div className="tw-hidden lg:tw-block">
                        <div className="tw-grid tw-grid-flow-col tw-max-w-[9.5rem] tw-justify-items-start tw-gap-2">
                            <Link
                                to="https://www.facebook.com/LivguardEnergy/"
                                target="_blank"
                                className=""
                            >
                                <Facebook className="tw-w-5 tw-h-5 hover:lg-text-primary-500 lg-text-secondary-700 tw-duration-200" />
                            </Link>
                            <Link
                                to="https://twitter.com/LivguardEnergy"
                                target="_blank"
                            >
                                <Twitter className="tw-w-5 tw-h-5 hover:lg-text-primary-500 lg-text-secondary-700 tw-duration-200" />
                            </Link>
                            <Link
                                to="https://www.instagram.com/livguardenergy/"
                                target="_blank"
                            >
                                <Instagram className="tw-w-5 tw-h-5 hover:lg-text-primary-500 lg-text-secondary-700 tw-duration-200" />
                            </Link>
                            <Link
                                to="https://www.linkedin.com/company/livguard-energy/"
                                target="_blank"
                            >
                                <Linkedin className="tw-w-5 tw-h-5 hover:lg-text-primary-500 lg-text-secondary-700 tw-duration-200" />
                            </Link>
                            <Link
                                to="https://www.youtube.com/@LivguardEnergy"
                                target="_blank"
                            >
                                <Youtube className="tw-w-5 tw-h-5 hover:lg-text-primary-500 lg-text-secondary-700 tw-duration-200" />
                            </Link>
                        </div>
                    </div>
                </div>

                <VerticalSpacer className="tw-h-2 lg:tw-hidden" />

                <FooterSocialLogosAndCopyright
                    userPreferences={userPreferences}
                    className="lg:tw-hidden tw-mx-[calc(-1*var(--lg-px-screen-edge))]"
                />

                <div className="tw-hidden lg:tw-flex lg:tw-flex-col lg:tw-row-start-3 lg:tw-col-start-2 lg:tw-row-span-3">
                    <div className="lg-text-title2 lg-text-primary-500">{getVernacularString("eb4e6810-b019-4d59-94b2-41351f268590", userPreferences.language)}</div>
                    <VerticalSpacer className="tw-h-1" />
                    <ItemBuilder
                        items={shoppingToolsAccordianList}
                        itemBuilder={(item, itemIndex) => (
                            <div
                                className="lg-text-secondary-900 tw-overflow-hidden"
                                key={itemIndex}
                            >
                                {item.target ? (
                                    <Link
                                        to={item.link}
                                        target="_blank"
                                        className="hover:lg-text-primary-500 tw-duration-300 tw-overflow-hidden tw-relative tw-group tw-transition"
                                    >
                                        {item.title}
                                        <span className="tw-absolute -tw-left-[1px] tw-bottom-0 -tw-translate-x-full group-hover:tw-translate-x-0 tw-ease-in tw-duration-300 tw-h-[1px] tw-w-full lg-bg-primary-500"></span>
                                    </Link>
                                ) : (
                                    <Link
                                        className="hover:lg-text-primary-500 tw-duration-300 tw-overflow-hidden tw-relative tw-group tw-transition"
                                        to={item.link}
                                    >
                                        {item.title}
                                        <span className="tw-absolute -tw-left-[1px] tw-bottom-0 -tw-translate-x-full group-hover:tw-translate-x-0 tw-ease-in tw-duration-300 tw-h-[1px] tw-w-full lg-bg-primary-500"></span>
                                    </Link>
                                )}

                                <VerticalSpacer className="tw-h-1" />
                            </div>
                        )}
                    />
                </div>

                <div className="tw-hidden lg:tw-flex lg:tw-flex-col lg:tw-row-start-3 lg:tw-col-start-3 lg:tw-row-span-3">
                    <div className="tw-flex tw-flex-col">
                        <div className="lg-text-title2 lg-text-primary-500">{getVernacularString("bf233b5c-c4e0-4161-aa37-8d0eba708d4c", userPreferences.language)}</div>
                        <VerticalSpacer className="tw-h-1" />
                        <ItemBuilder
                            items={companyAccordianList}
                            itemBuilder={(item, itemIndex) => (
                                <div
                                    className="lg-text-secondary-900 tw-overflow-hidden"
                                    key={itemIndex}
                                >
                                    {item.target ? (
                                        <Link
                                            to={item.link}
                                            target="_blank"
                                            className="hover:lg-text-primary-500 tw-duration-300 tw-overflow-hidden tw-relative tw-group tw-transition"
                                        >
                                            {item.title}
                                            <span className="tw-absolute -tw-left-[1px] tw-bottom-0 -tw-translate-x-full group-hover:tw-translate-x-0 tw-ease-in tw-duration-300 tw-h-[1px] tw-w-full lg-bg-primary-500"></span>
                                        </Link>
                                    ) : (
                                        <Link
                                            className="hover:lg-text-primary-500 tw-duration-300 tw-overflow-hidden tw-relative tw-group tw-transition"
                                            to={item.link}
                                        >
                                            {item.title}
                                            <span className="tw-absolute -tw-left-[1px] tw-bottom-0 -tw-translate-x-full group-hover:tw-translate-x-0 tw-ease-in tw-duration-300 tw-h-[1px] tw-w-full lg-bg-primary-500"></span>
                                        </Link>
                                    )}

                                    <VerticalSpacer className="tw-h-1" />
                                </div>
                            )}
                        />
                    </div>
                    {/* <VerticalSpacer className="tw-h-8" />
                    <div className="tw-flex tw-flex-col">
                        <div className="lg-text-title2 lg-text-primary-500">{getVernacularString("6d46ed34-f819-4c0a-a7ca-29ac67f6486b", userPreferences.language)}</div>
                        <VerticalSpacer className="tw-h-1" />
                        <ItemBuilder
                            items={mediaAndGalleryAccordianList}
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
                    </div> */}
                </div>

                <div className="tw-hidden lg:tw-flex lg:tw-flex-col lg:tw-row-start-3 lg:tw-col-start-4 lg:tw-row-span-3">
                    <div className="tw-flex tw-flex-col">
                        <div className="lg-text-title2 lg-text-primary-500">{getVernacularString("fc828855-64e1-4be5-b95f-bee9fe4a3262", userPreferences.language)}</div>
                        <VerticalSpacer className="tw-h-1" />
                        <ItemBuilder
                            items={dealerLocatorAccordionList}
                            itemBuilder={(item, itemIndex) => (
                                <div
                                    className="lg-text-secondary-900 tw-overflow-hidden"
                                    key={itemIndex}
                                >
                                    {item.target ? (
                                        <Link
                                            to={item.link}
                                            target="_blank"
                                            className="hover:lg-text-primary-500 tw-duration-300 tw-overflow-hidden tw-relative tw-group tw-transition"
                                        >
                                            {item.title}
                                            <span className="tw-absolute -tw-left-[1px] tw-bottom-0 -tw-translate-x-full group-hover:tw-translate-x-0 tw-ease-in tw-duration-300 tw-h-[1px] tw-w-full lg-bg-primary-500"></span>
                                        </Link>
                                    ) : (
                                        <Link
                                            className="hover:lg-text-primary-500 tw-duration-300 tw-overflow-hidden tw-relative tw-group tw-transition"
                                            to={item.link}
                                        >
                                            {item.title}
                                            <span className="tw-absolute -tw-left-[1px] tw-bottom-0 -tw-translate-x-full group-hover:tw-translate-x-0 tw-ease-in tw-duration-300 tw-h-[1px] tw-w-full lg-bg-primary-500"></span>
                                        </Link>
                                    )}

                                    <VerticalSpacer className="tw-h-1" />
                                </div>
                            )}
                        />
                    </div>
                    <VerticalSpacer className="tw-h-8" />
                    <div className="tw-flex tw-flex-col">
                        <div className="lg-text-title2 lg-text-primary-500">{getVernacularString("31850c84-bfb5-42cb-b470-489a351c2d99", userPreferences.language)}</div>
                        <VerticalSpacer className="tw-h-1" />
                        <ItemBuilder
                            items={supportAccordianList}
                            itemBuilder={(item, itemIndex) => (
                                <div
                                    className="lg-text-secondary-900 tw-overflow-hidden"
                                    key={itemIndex}
                                >
                                    {item.target ? (
                                        <Link
                                            to={item.link}
                                            target="_blank"
                                            className="hover:lg-text-primary-500 tw-duration-300 tw-overflow-hidden tw-relative tw-group tw-transition"
                                        >
                                            {item.title}
                                            <span className="tw-absolute -tw-left-[1px] tw-bottom-0 -tw-translate-x-full group-hover:tw-translate-x-0 tw-ease-in tw-duration-300 tw-h-[1px] tw-w-full lg-bg-primary-500"></span>
                                        </Link>
                                    ) : (
                                        <Link
                                            className="hover:lg-text-primary-500 tw-duration-300 tw-overflow-hidden tw-relative tw-group tw-transition"
                                            to={item.link}
                                        >
                                            {item.title}
                                            <span className="tw-absolute -tw-left-[1px] tw-bottom-0 -tw-translate-x-full group-hover:tw-translate-x-0 tw-ease-in tw-duration-300 tw-h-[1px] tw-w-full lg-bg-primary-500"></span>
                                        </Link>
                                    )}

                                    <VerticalSpacer className="tw-h-1" />
                                </div>
                            )}
                        />
                    </div>
                </div>

                <div className="tw-hidden lg:tw-flex lg:tw-flex-col lg:tw-row-start-3 lg:tw-col-start-5 lg:tw-row-span-3">
                    {/* <div className="tw-flex tw-flex-col">
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
                    <VerticalSpacer className="tw-h-8" /> */}
                    <div className="tw-hidden lg:tw-flex lg:tw-flex-col lg:tw-row-start-3 lg:tw-col-start-3 lg:tw-row-span-3">
                        <div className="tw-flex tw-flex-col">
                            <div className="lg-text-title2 lg-text-primary-500">{getVernacularString("c54ca3ff-b15f-445a-8e7b-c85985e5d355", userPreferences.language)}</div>
                            <VerticalSpacer className="tw-h-1" />
                            <ItemBuilder
                                items={customerPoliciesAccordianList}
                                itemBuilder={(item, itemIndex) => (
                                    <div
                                        className="lg-text-secondary-900 tw-overflow-hidden"
                                        key={itemIndex}
                                    >
                                        {item.target ? (
                                            <Link
                                                to={item.link}
                                                target="_blank"
                                                className="hover:lg-text-primary-500 tw-duration-300 tw-overflow-hidden tw-relative tw-group tw-transition"
                                            >
                                                {item.title}
                                                <span className="tw-absolute -tw-left-[1px] tw-bottom-0 -tw-translate-x-full group-hover:tw-translate-x-0 tw-ease-in tw-duration-300 tw-h-[1px] tw-w-full lg-bg-primary-500"></span>
                                            </Link>
                                        ) : (
                                            <Link
                                                className="hover:lg-text-primary-500 tw-duration-300 tw-overflow-hidden tw-relative tw-group tw-transition"
                                                to={item.link}
                                            >
                                                {item.title}
                                                <span className="tw-absolute -tw-left-[1px] tw-bottom-0 -tw-translate-x-full group-hover:tw-translate-x-0 tw-ease-in tw-duration-300 tw-h-[1px] tw-w-full lg-bg-primary-500"></span>
                                            </Link>
                                        )}

                                        <VerticalSpacer className="tw-h-1" />
                                    </div>
                                )}
                            />
                        </div>
                        <VerticalSpacer className="tw-h-8" />
                        <div className="tw-flex tw-flex-col">
                            <div className="lg-text-title2 lg-text-primary-500">{getVernacularString("6d46ed34-f819-4c0a-a7ca-29ac67f6486b", userPreferences.language)}</div>
                            <VerticalSpacer className="tw-h-1" />
                            <ItemBuilder
                                items={mediaAndGalleryAccordianList}
                                itemBuilder={(item, itemIndex) => (
                                    <div
                                        className="lg-text-secondary-900 tw-overflow-hidden"
                                        key={itemIndex}
                                    >
                                        {item.target ? (
                                            <Link
                                                to={item.link}
                                                target="_blank"
                                                className="hover:lg-text-primary-500 tw-duration-300 tw-overflow-hidden tw-relative tw-group tw-transition"
                                            >
                                                {item.title}
                                                <span className="tw-absolute -tw-left-[1px] tw-bottom-0 -tw-translate-x-full group-hover:tw-translate-x-0 tw-ease-in tw-duration-300 tw-h-[1px] tw-w-full lg-bg-primary-500"></span>
                                            </Link>
                                        ) : (
                                            <Link
                                                className="hover:lg-text-primary-500 tw-duration-300 tw-overflow-hidden tw-relative tw-group tw-transition"
                                                to={item.link}
                                            >
                                                {item.title}
                                                <span className="tw-absolute -tw-left-[1px] tw-bottom-0 -tw-translate-x-full group-hover:tw-translate-x-0 tw-ease-in tw-duration-300 tw-h-[1px] tw-w-full lg-bg-primary-500"></span>
                                            </Link>
                                        )}

                                        <VerticalSpacer className="tw-h-1" />
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                </div>
                <div className="tw-hidden lg:tw-grid lg:tw-row-start-7 lg:tw-col-start-1 lg:tw-col-span-full lg:tw-pl-[4.5rem]">
                    <div className="tw-grid tw-gap-4">
                        <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-4 tw-items-center">
                            <div className="lg-text-title2 lg-text-primary-500">{getVernacularString("642467c3-8136-4523-b231-fa5aae9a075a", userPreferences.language)}</div>{" "}
                            <hr className="tw-border-new-foreground-500-light dark:tw-border-new-foreground-500-dark" />
                        </div>
                        <div className="tw-flex tw-flex-wrap tw-gap-2 lg:tw-pr-[4.5rem]">
                            <ItemBuilder
                                items={homeSolutionsAccordianList}
                                itemBuilder={(item, itemIndex) => (
                                    <div
                                        className={concatenateNonNullStringsWithSpaces(
                                            "lg-text-secondary-900 tw-overflow-hidden",
                                            itemIndex === homeSolutionsAccordianList.length - 1 ? "" : "tw-border-r tw-pr-4 tw-border-new-foreground-500-light dark:tw-border-new-foreground-500-dark",
                                        )}
                                        key={itemIndex}
                                    >
                                        {item.target ? (
                                            <Link
                                                className="hover:lg-text-primary-500 tw-duration-300 tw-relative tw-group tw-transition"
                                                to={item.link}
                                                target="_blank"
                                            >
                                                {item.title}
                                                <span className="tw-absolute -tw-left-[1px] tw-bottom-0 -tw-translate-x-full group-hover:tw-translate-x-0 tw-ease-in tw-duration-300 tw-h-[1px] tw-w-full lg-bg-primary-500"></span>
                                            </Link>
                                        ) : (
                                            <Link
                                                className="hover:lg-text-primary-500 tw-duration-300 tw-relative tw-group tw-transition"
                                                to={item.link}
                                            >
                                                {item.title}
                                                <span className="tw-absolute -tw-left-[1px] tw-bottom-0 -tw-translate-x-full group-hover:tw-translate-x-0 tw-ease-in tw-duration-300 tw-h-[1px] tw-w-full lg-bg-primary-500"></span>
                                            </Link>
                                        )}

                                        <VerticalSpacer className="tw-h-1" />
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                </div>
                <VerticalSpacer className="tw-h-4 tw-col-start-1 tw-col-span-full" />
                <div className="tw-hidden lg:tw-grid lg:tw-row-start-8 lg:tw-col-start-1 lg:tw-col-span-full lg:tw-pl-[4.5rem]">
                    <div className="tw-grid tw-gap-4">
                        <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-4 tw-items-center">
                            <div className="lg-text-title2 lg-text-primary-500">{getVernacularString("e9624c2c-a16e-4f56-88a2-3e2710461b14", userPreferences.language)}</div>{" "}
                            <hr className="tw-border-new-foreground-500-light dark:tw-border-new-foreground-500-dark" />
                        </div>
                        <div className="tw-flex tw-flex-wrap tw-gap-2 lg:tw-pr-[4.5rem]">
                            <ItemBuilder
                                items={automotiveSolutionsAccordianList}
                                itemBuilder={(item, itemIndex) => (
                                    <div
                                        className={concatenateNonNullStringsWithSpaces(
                                            "lg-text-secondary-900 tw-overflow-hidden",
                                            itemIndex === automotiveSolutionsAccordianList.length - 1
                                                ? ""
                                                : "tw-border-r tw-pr-4 tw-border-new-foreground-500-light dark:tw-border-new-foreground-500-dark",
                                        )}
                                        key={itemIndex}
                                    >
                                        {item.target ? (
                                            <Link
                                                className="hover:lg-text-primary-500 tw-duration-300 tw-relative tw-group tw-transition"
                                                to={item.link}
                                                target="_blank"
                                            >
                                                {item.title}
                                                <span className="tw-absolute -tw-left-[1px] tw-bottom-0 -tw-translate-x-full group-hover:tw-translate-x-0 tw-ease-in tw-duration-300 tw-h-[1px] tw-w-full lg-bg-primary-500"></span>
                                            </Link>
                                        ) : (
                                            <Link
                                                className="hover:lg-text-primary-500 tw-duration-300 tw-relative tw-group tw-transition"
                                                to={item.link}
                                            >
                                                {item.title}
                                                <span className="tw-absolute -tw-left-[1px] tw-bottom-0 -tw-translate-x-full group-hover:tw-translate-x-0 tw-ease-in tw-duration-300 tw-h-[1px] tw-w-full lg-bg-primary-500"></span>
                                            </Link>
                                        )}

                                        <VerticalSpacer className="tw-h-1" />
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                </div>
                <VerticalSpacer className="tw-h-4 tw-col-start-1 tw-col-span-full" />
                <div className="tw-hidden lg:tw-grid lg:tw-row-start-9 lg:tw-col-start-1 lg:tw-col-span-full lg:tw-pl-[4.5rem]">
                    <div className="tw-grid tw-gap-4">
                        <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-4 tw-items-center">
                            <div className="lg-text-title2 lg-text-primary-500">{getVernacularString("3a186513-50e2-4738-8d17-0f8691fa7b1c", userPreferences.language)}</div>
                            <hr className="tw-border-new-foreground-500-light dark:tw-border-new-foreground-500-dark" />
                        </div>
                        <div className="tw-flex tw-flex-wrap tw-gap-2 lg:tw-pr-[4.5rem]">
                            <ItemBuilder
                                items={solarSolutionsAccordianList}
                                itemBuilder={(item, itemIndex) => (
                                    <div
                                        className={concatenateNonNullStringsWithSpaces(
                                            "lg-text-secondary-900 tw-overflow-hidden",
                                            itemIndex === solarSolutionsAccordianList.length - 1 ? "" : "tw-border-r tw-pr-4 tw-border-new-foreground-500-light dark:tw-border-new-foreground-500-dark",
                                        )}
                                        key={itemIndex}
                                    >
                                        {item.target ? (
                                            <Link
                                                className="hover:lg-text-primary-500 tw-duration-300 tw-overflow-hidden tw-relative tw-group tw-transition"
                                                to={item.link}
                                                target="_blank"
                                            >
                                                {item.title}
                                                <span className="tw-absolute -tw-left-[1px] tw-bottom-0 -tw-translate-x-full group-hover:tw-translate-x-0 tw-ease-in tw-duration-300 tw-h-[1px] tw-w-full lg-bg-primary-500"></span>
                                            </Link>
                                        ) : (
                                            <Link
                                                className="hover:lg-text-primary-500 tw-duration-300 tw-overflow-hidden tw-relative tw-group tw-transition"
                                                to={item.link}
                                            >
                                                {item.title}
                                                <span className="tw-absolute -tw-left-[1px] tw-bottom-0 -tw-translate-x-full group-hover:tw-translate-x-0 tw-ease-in tw-duration-300 tw-h-[1px] tw-w-full lg-bg-primary-500"></span>
                                            </Link>
                                        )}

                                        <VerticalSpacer className="tw-h-1" />
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                </div>
                <div className="tw-hidden lg:tw-grid lg:tw-row-start-7 lg:tw-col-start-1 lg:tw-col-span-full lg:tw-pl-[4.5rem]">
                    <div className="tw-grid tw-gap-4">
                        <div className="tw-grid tw-grid-cols-[auto_minmax(0,1fr)] tw-gap-4 tw-items-center">
                            <div className="lg-text-title2 lg-text-primary-500">{getVernacularString("642467c3-8136-4523-b231-fa5aae9a075a", userPreferences.language)}</div>{" "}
                            <hr className="tw-border-new-foreground-500-light dark:tw-border-new-foreground-500-dark" />
                        </div>
                        <div className="tw-flex tw-flex-wrap tw-gap-2 lg:tw-pr-[4.5rem]">
                            <ItemBuilder
                                items={homeSolutionsAccordianList}
                                itemBuilder={(item, itemIndex) => (
                                    <div
                                        className={concatenateNonNullStringsWithSpaces(
                                            "lg-text-secondary-900 hover:lg-text-primary-500 tw-duration-3000 tw-overflow-hidden tw-relative tw-group tw-transition",
                                            itemIndex === homeSolutionsAccordianList.length - 1 ? "" : "tw-border-r tw-pr-4 tw-border-new-foreground-500-light dark:tw-border-new-foreground-500-dark",
                                        )}
                                        key={itemIndex}
                                    >
                                        {item.target ? (
                                            <Link
                                                to={item.link}
                                                target="_blank"
                                            >
                                                {item.title}
                                                <span
                                                    className={concatenateNonNullStringsWithSpaces(
                                                        "tw-absolute -tw-left-[1px] tw-bottom-0 -tw-translate-x-full group-hover:tw-translate-x-0 tw-ease-in tw-duration-300 tw-h-[1px] tw-w-[calc(100%-1rem)] lg-bg-primary-500",
                                                        itemIndex === homeSolutionsAccordianList.length - 1 ? "tw-w-full" : "tw-w-[calc(100%-1rem)]",
                                                    )}
                                                ></span>
                                            </Link>
                                        ) : (
                                            <Link to={item.link}>
                                                {item.title}
                                                <span
                                                    className={concatenateNonNullStringsWithSpaces(
                                                        "tw-absolute -tw-left-[1px] tw-bottom-0 -tw-translate-x-full group-hover:tw-translate-x-0 tw-ease-in tw-duration-300 tw-h-[1px] tw-w-[calc(100%-1rem)] lg-bg-primary-500",
                                                        itemIndex === homeSolutionsAccordianList.length - 1 ? "tw-w-full" : "tw-w-[calc(100%-1rem)]",
                                                    )}
                                                ></span>
                                            </Link>
                                        )}
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                </div>

                <div className="lg:tw-row-start-10 tw-col-start-1 max-lg:tw-mx-[-24px] max-lg:tw-px-[24px] lg:tw-col-span-full lg-card lg-text-secondary-900 lg:tw-px-[72px]">
                    <MoreAboutLivguardAccordian
                        title={getVernacularString("69d20806-45ec-42e0-951e-54a4d0f46b14", userPreferences.language)}
                        panelItem={<MoreAboutLivguard userPreferences={userPreferences} />}
                    />
                </div>

                <div className="lg:tw-row-start-11 lg:tw-col-start-1 lg:tw-col-span-full lg-text-body max-lg:tw-pt-4 tw-pb-4 tw-text-center lg:tw-px-[72px]">
                    <div dangerouslySetInnerHTML={{__html: getVernacularString("footerCopyrightText", userPreferences.language)}} />
                </div>
            </div>
        </div>
    );
}

function MoreAboutLivguard({userPreferences}: {userPreferences: UserPreferences}) {
    const batteryRangeList: Array<string> = [
        "474e6e60-db1c-4c7e-b158-caf6a2425ee8",
        "2f15fc7f-1e7f-4a5d-a97b-899fdb3062f3",
        "8756b065-a52e-46d2-adfb-bc8ce1df4823",
        "53da8188-f07f-45dc-82fd-5ce27696264c",
        "3bce3717-9177-40a1-8099-179e3f142d0a",
        "ae660408-b213-4060-9059-3b53544297fa",
        "6a5d55f0-21cd-47a8-8f9d-7c0e1ec61e95",
    ];

    const chooseLivguardList: Array<string> = [
        "ba2310a2-9823-4536-8697-1cc83da9aa39",
        "c174476d-747e-44a8-8af6-41a6e5f26c92",
        "9285e6dc-7554-4b8d-b83b-1c462f3b315a",
        "7da9aca6-1493-44e1-9a51-e79f9b4be665",
    ];

    const exploreProductsList: Array<string> = ["0a491c8b-0c8a-406c-a482-89b144758687", "af744aeb-e34f-45e3-9372-27b08e600fbc", "dfa119d7-cdb6-46b8-83c4-9883e5a092b6"];

    const comprehensiveProductList: Array<string> = ["fdbebfc5-96cd-4191-934b-e7e89e58d702", "f9523785-9cb1-4f13-a127-f7a5b579510b", "da5cb87b-923e-40a1-b390-c3a5d28240d6"];

    const chooseLivguardSolarList: Array<string> = [
        "71defc8f-1ed1-4932-838c-96f54b881195",
        "1c938afb-620f-4fa7-b810-a0620654761c",
        "b0a7b74d-f238-4b96-8a8d-95eb3890620c",
        "4a719966-301a-4806-b94e-c7ab92349a1b",
    ];

    const exploreOfferingsList: Array<string> = ["27e83276-648e-44cb-8025-ebd5cfffa066", "20d810c2-8da8-4505-917a-26f1ccbd3dc2"];
    return (
        <div className="tw-grid tw-gap-6 md:tw-gap-8 md:tw-py-5 tw-pb-5">
            <div className="tw-grid tw-gap-2 md:tw-gap-4">
                <div className="lg-text-title2 lg-text-secondary-900">{getVernacularString("b65da678-f08a-46fd-ae2a-b2df56391d4d", userPreferences.language)}</div>
                <div className="lg-text-body lg-text-secondary-900">{getVernacularString("74a5eaf0-dc22-4227-8c5c-c1ee276a56bf", userPreferences.language)}</div>
            </div>

            <div className="tw-grid tw-gap-2 md:tw-gap-4">
                <div className="lg-text-title2 lg-text-secondary-900">{getVernacularString("573743ba-bd29-40fc-80e6-cd6fa1ce085f", userPreferences.language)}</div>
                <ul className="lg-text-body lg-text-secondary-900 tw-pl-[2rem] md:tw-pl-[3rem]">
                    <ItemBuilder
                        items={batteryRangeList}
                        itemBuilder={(item, itemIndex) => (
                            <li
                                key={itemIndex}
                                className="tw-list-disc"
                            >
                                {getVernacularString(item, userPreferences.language)}
                            </li>
                        )}
                    />
                </ul>
            </div>

            <div className="tw-grid tw-gap-2 md:tw-gap-4">
                <div className="lg-text-title2 lg-text-secondary-900">{getVernacularString("a5d385c8-e00d-4be5-826d-5bd117552929", userPreferences.language)}</div>
                <ul className="lg-text-body lg-text-secondary-900 tw-pl-[2rem] md:tw-pl-[3rem]">
                    <ItemBuilder
                        items={chooseLivguardList}
                        itemBuilder={(item, itemIndex) => (
                            <li
                                key={itemIndex}
                                className="tw-list-disc"
                            >
                                {getVernacularString(item, userPreferences.language)}
                            </li>
                        )}
                    />
                </ul>
            </div>

            <div className="tw-grid tw-gap-2 md:tw-gap-4">
                <div className="lg-text-title2 lg-text-secondary-900">{getVernacularString("f6ee6026-c1bc-4814-aaca-86b62c56080f", userPreferences.language)}</div>
                <div className="lg-text-body lg-text-secondary-900">{getVernacularString("2d795937-f920-49a8-b19d-6cb8073d4db3", userPreferences.language)}</div>
            </div>

            <div className="tw-grid tw-gap-2 md:tw-gap-4">
                <div className="lg-text-title2 lg-text-secondary-900">{getVernacularString("65b60823-257a-4725-99a7-77ce25e91288", userPreferences.language)}</div>
                <ul className="lg-text-body lg-text-secondary-900 tw-pl-[2rem] md:tw-pl-[3rem]">
                    <ItemBuilder
                        items={exploreProductsList}
                        itemBuilder={(item, itemIndex) => (
                            <li
                                key={itemIndex}
                                className="tw-list-disc"
                            >
                                {getVernacularString(item, userPreferences.language)}
                            </li>
                        )}
                    />
                </ul>
            </div>

            <div className="tw-grid tw-gap-2 md:tw-gap-4">
                <div className="lg-text-title2 lg-text-secondary-900">{getVernacularString("c842a2c6-1a3b-488e-a3ad-a668f45de854", userPreferences.language)}</div>
                <div className="lg-text-body lg-text-secondary-900">{getVernacularString("5956a05a-dd59-4e9a-aa1d-48aa55f236f5", userPreferences.language)}</div>
            </div>

            <div className="tw-grid tw-gap-2 md:tw-gap-4">
                <div className="lg-text-title2 lg-text-secondary-900">{getVernacularString("86526c6c-8a27-4e06-b4fa-da1b82cc3967", userPreferences.language)}</div>
                <div className="lg-text-body lg-text-secondary-900">{getVernacularString("797afe89-61fe-487d-924e-2975a3e29b34", userPreferences.language)}</div>
            </div>

            <div className="tw-grid tw-gap-2 md:tw-gap-4">
                <div className="lg-text-title2 lg-text-secondary-900">{getVernacularString("86184562-2338-4444-a867-bcabc36fd280", userPreferences.language)}</div>
                <ul className="lg-text-body lg-text-secondary-900 tw-pl-[2rem] md:tw-pl-[3rem]">
                    <ItemBuilder
                        items={comprehensiveProductList}
                        itemBuilder={(item, itemIndex) => (
                            <li
                                key={itemIndex}
                                className="tw-list-disc"
                            >
                                {getVernacularString(item, userPreferences.language)}
                            </li>
                        )}
                    />
                </ul>
            </div>

            <div className="tw-grid tw-gap-2 md:tw-gap-4">
                <div className="lg-text-title2 lg-text-secondary-900">{getVernacularString("7e6f0e05-9a06-4a17-9f8c-3cbf7dc65cf9", userPreferences.language)}</div>
                <ul className="lg-text-body lg-text-secondary-900 tw-pl-[2rem] md:tw-pl-[3rem]">
                    <ItemBuilder
                        items={chooseLivguardSolarList}
                        itemBuilder={(item, itemIndex) => (
                            <li
                                key={itemIndex}
                                className="tw-list-disc"
                            >
                                {getVernacularString(item, userPreferences.language)}
                            </li>
                        )}
                    />
                </ul>
            </div>

            <div className="tw-grid tw-gap-2 md:tw-gap-4">
                <div className="lg-text-title2 lg-text-secondary-900">{getVernacularString("2f3afb31-1745-461a-b06c-b6f82dad8007", userPreferences.language)}</div>
                <div className="lg-text-body lg-text-secondary-900">{getVernacularString("29323849-e8a8-4a1c-9ef9-792453e5aab3", userPreferences.language)}</div>
            </div>

            <div className="tw-grid tw-gap-2 md:tw-gap-4">
                <div className="lg-text-title2 lg-text-secondary-900">{getVernacularString("2105f9c8-df34-4807-97d6-eb502582c907", userPreferences.language)}</div>
                <ul className="lg-text-body lg-text-secondary-900 tw-pl-[2rem] md:tw-pl-[3rem]">
                    <ItemBuilder
                        items={exploreOfferingsList}
                        itemBuilder={(item, itemIndex) => (
                            <li
                                key={itemIndex}
                                className="tw-list-disc"
                            >
                                {getVernacularString(item, userPreferences.language)}
                            </li>
                        )}
                    />
                </ul>
            </div>

            <div className="tw-grid tw-gap-2 md:tw-gap-4">
                <div className="lg-text-title2 lg-text-secondary-900">{getVernacularString("618931ac-9e6c-4492-b9d1-2243eabbb2b6", userPreferences.language)}</div>
                <div className="lg-text-body lg-text-secondary-900">{getVernacularString("ef416060-345e-45c1-a6cb-763e9e6a12b7", userPreferences.language)}</div>
            </div>
        </div>
    );
}
