import {CheckCircleIcon, XCircleIcon} from "@heroicons/react/20/solid";
import {Link} from "@remix-run/react";
import React, {useContext, useEffect} from "react";
import {Facebook, Instagram, Linkedin, Twitter, Youtube} from "react-bootstrap-icons";
import {useInView} from "react-intersection-observer";
import {CarouselStyle3} from "~/components/carouselStyle3";
import {CarouselStyle4} from "~/components/carouselStyle4";
import {DefaultElementAnimation} from "~/components/defaultElementAnimation";
import {DefaultImageAnimation} from "~/components/defaultImageAnimation";
import {DefaultTextAnimation} from "~/components/defaultTextAnimation";
import {EmbeddedYoutubeVideo} from "~/components/embeddedYoutubeVideo";
import {FixedWidthImage} from "~/components/images/fixedWidthImage";
import {FullWidthImage} from "~/components/images/fullWidthImage";
import {SecondaryNavigationControllerContext} from "~/contexts/secondaryNavigationControllerContext";
import {getAbsolutePathForRelativePath} from "~/global-common-typescript/components/images/growthJockeyImage";
import {ItemBuilder} from "~/global-common-typescript/components/itemBuilder";
import {VerticalSpacer} from "~/global-common-typescript/components/verticalSpacer";
import {ImageCdnProvider} from "~/common--type-definitions/typeDefinitions";
import {concatenateNonNullStringsWithSpaces} from "~/global-common-typescript/utilities/utilities";
import type {ProductDetailsRecommendedProduct} from "~/productData.types";
import {HumanReadableModelNumbersForSuggestions} from "~/routes/__category/inverter-batteries";
import type {UserPreferences} from "~/typeDefinitions";
import {convertProductInternalNameToPublicName, getMetadataForImage, secondaryNavThreshold} from "~/utilities";

import {ContentProviderContext} from "~/contexts/contentProviderContext";

export function EmpowerYourHomeComponent({userPreferences, item}: {userPreferences: UserPreferences; item: {imageRelativePath: string; titleTextContentPiece: string; bodyTextContentPiece: string}}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className="tw-grid tw-grid-cols-1 tw-grid-rows-[auto,minmax(0,1fr)] tw-gap-6 lg:tw-grid-cols-[minmax(0,2fr),minmax(0,3fr)] lg:tw-grid-rows-1 lg:tw-gap-10 tw-items-center tw-justify-center">
            <div className="tw-row-start-1 lg:tw-col-start-1 tw-text-center lg:tw-text-left lg:tw-pl-20">
                <DefaultTextAnimation>
                    <div className="lg-text-title1">{contentData.getContent(item.titleTextContentPiece)}</div>
                </DefaultTextAnimation>

                <div className="tw-h-2" />

                <DefaultTextAnimation className="tw-flex-1">
                    <div className="lg-text-body lg-text-secondary-700">{contentData.getContent(item.bodyTextContentPiece)}</div>
                </DefaultTextAnimation>
            </div>
            <div className="tw-row-start-2 lg:tw-col-start-2 lg:tw-row-start-1">
                <DefaultImageAnimation>
                    <FullWidthImage
                        relativePath={item.imageRelativePath}
                        className="tw-rounded-lg"
                    />
                </DefaultImageAnimation>
            </div>
        </div>
    );
}

export function OurSuggestionsComponent({
    vernacularContent,
    userPreferences,
    className,
    humanReadableModelNumbersForSuggestions,
}: {
    vernacularContent: {
        heading: string;
        description: string;
        specificationHeading: string;
        keySpecifications: Array<{keySpecificationTitle: string; keySpecificationContent: string; keySpecificationIconRelativePath: string}>;
        imagesRelativePath: string;
        link: string;
        modelNumber: string;
        exploreButton: string;
        relatedProductsHeading: string;
        relatedProducts: Array<string>;
    };
    userPreferences: UserPreferences;
    className?: string;
    humanReadableModelNumbersForSuggestions: HumanReadableModelNumbersForSuggestions;
}) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div>
            <div
                className={concatenateNonNullStringsWithSpaces(
                    "lg-px-screen-edge tw-grid tw-grid-rows-1 tw-grid-cols-1 tw-grid-flow-row lg:tw-grid-rows-[2rem,auto,2rem] lg:tw-grid-cols-[minmax(0,3fr),minmax(0,2fr)] lg-card tw-rounded-lg tw-w-full tw-items-center",
                    className,
                )}
            >
                <VerticalSpacer className="tw-h-8" />

                <div className="tw-row-start-1 tw-col-span lg:tw-col-start-1 tw-flex tw-flex-col tw-w-full lg:tw-row-start-2 lg:tw-pl-20">
                    <VerticalSpacer className="tw-h-4" />

                    <DefaultTextAnimation>
                        <div className="lg-text-title1 tw-text-center lg:tw-text-left">{humanReadableModelNumbersForSuggestions[vernacularContent.heading.toLocaleLowerCase()]}</div>
                        <div className="lg-text-title1 tw-text-center lg:tw-text-left">{vernacularContent.modelNumber.toUpperCase()}</div>
                    </DefaultTextAnimation>

                    <VerticalSpacer className="tw-h-4" />

                    <DefaultTextAnimation>
                        <div className="tw-text-body tw-text-center lg:tw-text-left tw-max-w-[35rem]">{vernacularContent.description}</div>
                    </DefaultTextAnimation>

                    <VerticalSpacer className="tw-h-10" />

                    <DefaultTextAnimation>
                        <div className="lg-text-title1 tw-text-center lg:tw-text-left">{vernacularContent.specificationHeading}</div>
                    </DefaultTextAnimation>

                    <VerticalSpacer className="tw-h-4" />

                    <div className="tw-grid tw-grid-cols-[minmax(0,1fr),minmax(0,1fr)] tw-grid-rows-[minmax(0,1fr),minmax(0,1fr)] tw-gap-x-3 tw-gap-y-10">
                        <ItemBuilder
                            items={vernacularContent.keySpecifications}
                            itemBuilder={(keySpecification, keySpecificationIndex) => (
                                <div
                                    className={`tw-row-start-${keySpecificationIndex / 2 + 1} tw-col-start-${(keySpecificationIndex % 2) + 1} tw-flex tw-flex-row tw-items-between tw-gap-3`}
                                    key={keySpecificationIndex}
                                >
                                    <div className={`tw-flex tw-min-w-[40px] tw-h-[40px] lg:tw-w-12 lg:tw-h-12 tw-rounded-full tw-items-center tw-justify-center lg-card`}>
                                        <FixedWidthImage
                                            relativePath={keySpecification.keySpecificationIconRelativePath}
                                            width="2rem"
                                            className="tw-place-self-center tw-invert dark:tw-invert-0"
                                        />
                                    </div>

                                    <div className="tw-flex tw-flex-col tw-gap-1">
                                        <div className="lg-text-body tw-font-bold">{keySpecification.keySpecificationTitle}</div>
                                        <div className="lg-text-body">{keySpecification.keySpecificationContent}</div>
                                    </div>
                                </div>
                            )}
                        />
                    </div>

                    <VerticalSpacer className="tw-h-8" />

                    <Link
                        to={vernacularContent.link}
                        className="lg-cta-button tw-w-fit lg:tw-place-self-start tw-place-self-center"
                    >
                        {" "}
                        {vernacularContent.exploreButton}{" "}
                    </Link>
                </div>

                <div className="tw-row-start-2 lg:tw-col-start-2 tw-flex tw-flex-col tw-items-center tw-justify-center">
                    <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

                    <div className="tw-rounded-lg tw-w-full tw-flex tw-justify-center">
                        <FixedWidthImage
                            relativePath={`${vernacularContent.imagesRelativePath}${vernacularContent.heading.toLowerCase()}/thumbnail.png`}
                            width="250px"
                            className="tw-mx-auto"
                        />
                    </div>

                    {/* <VerticalSpacer className="tw-h-16 lg:tw-hidden" /> */}

                    <DefaultTextAnimation>
                        <div className="lg-text-title1 tw-text-center">{vernacularContent.relatedProductsHeading}</div>
                    </DefaultTextAnimation>

                    <VerticalSpacer
                        className="tw-h-4"
                        lg:tw-hidden
                    />

                    {vernacularContent.relatedProducts.length > 3 ? (
                        <CarouselStyle4
                            items={vernacularContent.relatedProducts.map((relatedProduct, relatedProductIndex) => (
                                <Link
                                    to={`/product/${relatedProduct}`}
                                    className="lg-card tw-rounded-lg tw-flex lg:tw-max-w-[200px] tw-flex-col tw-p-4 tw-gap-y-2 lg:tw-justify-center lg:tw-items-center"
                                    key={relatedProductIndex}
                                >
                                    <div className="tw-w-full lg-text-body-bold tw-text-center">{humanReadableModelNumbersForSuggestions[relatedProduct]}</div>
                                    <div className="tw-w-full lg-text-body-bold tw-text-center">{relatedProduct.toUpperCase()}</div>
                                    <FullWidthImage relativePath={`${vernacularContent.imagesRelativePath}${relatedProduct}/thumbnail.png`} />
                                </Link>
                            ))}
                            className="lg:tw-max-w-[440px]"
                            key={vernacularContent.relatedProducts.length}
                        />
                    ) : (
                        <div className="tw-flex tw-flex-row tw-justify-center tw-w-full tw-gap-x-2">
                            <ItemBuilder
                                items={vernacularContent.relatedProducts}
                                itemBuilder={(item, itemIndex) => (
                                    <Link
                                        to={`/product/${item}`}
                                        className="lg-card tw-rounded-lg tw-flex tw-flex-col tw-p-4 tw-gap-y-2 lg:tw-justify-center tw-w-[200px] tw-w-max-[200px] lg:tw-items-center"
                                        key={itemIndex}
                                    >
                                        {/* <div className="tw-w-full lg-text-body-bold tw-text-center">{convertProductInternalNameToPublicName(item)}</div> */}
                                        <div className="tw-w-full lg-text-body-bold tw-text-center">{humanReadableModelNumbersForSuggestions[vernacularContent.heading.toLocaleLowerCase()]}</div>
                                        <div className="tw-w-full lg-text-body-bold tw-text-center">{item.toUpperCase()}</div>
                                        <FullWidthImage relativePath={`${vernacularContent.imagesRelativePath}${item}/thumbnail.png`} />
                                    </Link>
                                )}
                            />
                        </div>
                    )}
                </div>

                <VerticalSpacer className="tw-h-4" />
            </div>
        </div>
    );
}

export function ProductCardComponent({recommendedProduct, ctaTextId, userPreferences, item, humanReadableModelNumbersForSuggestions}: {recommendedProduct?: ProductDetailsRecommendedProduct; ctaTextId?: string; userPreferences: UserPreferences; item?: string; humanReadableModelNumbersForSuggestions: HumanReadableModelNumbersForSuggestions; }) {
    const contentData = useContext(ContentProviderContext);
    return (
        <div className="tw-w-full tw-h-full tw-grid tw-grid-rows-[repeat(2,auto)_minmax(0,1fr)_repeat(2,auto)] tw-grid-flow-row tw-justify-stretch tw-relative tw-px-3 lg-card tw-rounded-lg">
            {/* {item.bestseller && (
                <div className="tw-absolute tw-right-0 tw-top-0 lg-text-icon tw-px-2 tw-rounded-tr-lg lg-bg-primary-500 lg-text-secondary-900 tw-text-white tw-pt-[2px]"> Best Seller </div>
            )} */}

            <VerticalSpacer className="tw-h-8" />

            <DefaultTextAnimation>
                <div className="tw-text-body tw-text-center">{humanReadableModelNumbersForSuggestions[item]}</div>
                <div className="tw-text-body tw-text-center">{item.toUpperCase()}</div>
            </DefaultTextAnimation>

            {/* <VerticalSpacer className="tw-h-4" /> */}

            <DefaultImageAnimation className="tw-row-start-4">
                <div className="tw-px-4 tw-rounded-lg">
                    <FullWidthImage relativePath={`/livguard/products/${item}/thumbnail.png`} />
                </div>
            </DefaultImageAnimation>

            <VerticalSpacer className="tw-h-1 tw-row-start-5" />

            <DefaultElementAnimation className="tw-row-start-6">
                <Link
                    to={`/product/${item}`}
                    className="lg-cta-button tw-translate-y-4 tw-px-4 tw-text-center tw-items-center"
                >
                    {contentData.getContent(ctaTextId ?? "categoryViewProductButtontext")}
                </Link>
            </DefaultElementAnimation>
        </div>
    );
}

export function WhatsBestForYouComponent({
    vernacularContent,
    userPreferences,
    utmParameters,
}: {
    vernacularContent: {
        description: string;
        downloadButtons: Array<{iconRelativePath: string; text: string; downloadLink: string; popup: boolean}>;
        buttonText: string;
    };
    userPreferences: UserPreferences;
    utmParameters: {[searchParameter: string]: string};
}) {
    return (
        <div className="tw-flex tw-flex-col tw-justify-between tw-items-center">
            <DefaultTextAnimation>
                <div className="lg-text-body tw-text-center lg:tw-max-w-[35rem]">{vernacularContent.description}</div>
            </DefaultTextAnimation>

            <VerticalSpacer className="tw-h-4" />

            <div className="max-lg:tw-w-fit tw-grid">
                <DefaultElementAnimation className="max-lg:tw-w-full">
                    <div className="tw-grid tw-grid-flow-row tw-w-full lg:tw-w-fit lg:tw-grid-cols-[minmax(0,1fr),minmax(0,1fr)] tw-gap-3 tw-h-full">
                        <ItemBuilder
                            items={vernacularContent.downloadButtons}
                            itemBuilder={(downloadButton, downloadButtonIndex) => (
                                <React.Fragment key={downloadButtonIndex}>
                                    {downloadButton.popup ? (
                                        <DownloadCta
                                            userPreferences={userPreferences}
                                            textVernacId="categoryInvertersS8B2T"
                                            className="tw-z-10 hover:tw-cursor-pointer"
                                            utmParameters={utmParameters}
                                        />
                                    ) : (
                                        // <a
                                        //     href={downloadButton.downloadLink}
                                        //     key={downloadButtonIndex}
                                        //     download
                                        //     target={"_blank"}
                                        //     className="tw-h-full"
                                        // >
                                        //     <div
                                        //         className={`tw-col-start-${downloadButtonIndex + 1} tw-flex tw-flex-row lg-card tw-rounded-lg lg-cta-outline-button lg-cta-outline-button-transition ${
                                        //             downloadButtonIndex == 1 ? "tw-p-2 lg:tw-p-4" : "tw-p-4"
                                        //         } tw-justify-start tw-items-center tw-gap-3 tw-h-full`}
                                        //     >
                                        //         <div className="tw-h-8 tw-min-w-[32px]">
                                        //             <FullWidthImage relativePath={downloadButton.iconRelativePath} />
                                        //         </div>
                                        //         <div className="lg-text-title2">{downloadButton.text}</div>
                                        //     </div>
                                        // </a>
                                        <a
                                            href={downloadButton.downloadLink}
                                            download
                                            target="_blank"
                                            className="tw-w-full lg:tw-w-fit lg-cta-outline-button lg-cta-outline-button-category-section-transition-ops tw-py-3 tw-rounded-full tw-grid tw-justify-items-center tw-grid-cols-[minmax(0,1fr)_auto_1rem_auto_minmax(0,1fr)] tw-group tw-h-full tw-px-4"
                                        >
                                            <img
                                                className="tw-row-start-1 tw-col-start-2 tw-h-4 tw-w-4 lg:tw-h-6 lg:tw-w-6 tw-place-self-center tw-transition-colors tw-duration-200 group-hover:tw-brightness-0 group-hover:tw-invert"
                                                src={getAbsolutePathForRelativePath(getMetadataForImage(downloadButton.iconRelativePath).finalUrl, ImageCdnProvider.Bunny, null, null)}
                                            />
                                            <div className="tw-row-start-1 tw-col-start-4 tw-flex tw-flex-row tw-items-center lg-text-body group-hover:!tw-text-secondary-100-light tw-transition-colors tw-duration-200">
                                                {downloadButton.text}
                                            </div>
                                        </a>
                                    )}
                                </React.Fragment>
                            )}
                        />
                    </div>
                </DefaultElementAnimation>

                <VerticalSpacer className="tw-h-4" />

                <DefaultElementAnimation className="tw-w-full lg:tw-w-fit tw-justify-self-center">
                    <Link
                        to="/load-calculator"
                        className="tw-w-full lg:tw-w-fit"
                    >
                        <div className="lg-cta-button tw-w-full lg:tw-w-fit tw-text-center">{vernacularContent.buttonText}</div>
                    </Link>
                </DefaultElementAnimation>
            </div>
        </div>
    );
}

export function ProductOverviewComponent({
    vernacularContent,
    className,
}: {
    vernacularContent: {
        heading: string;
        image: string;
        features: Array<{title: string; highlighted: boolean}>;
    };
    className: string;
}) {
    return (
        <div className={concatenateNonNullStringsWithSpaces("tw-flex tw-flex-col tw-justify-between tw-px-4 lg-bg-secondary-100 tw-rounded-lg", className)}>
            <div className="lg-bg-secondary-500 tw-rounded-lg -tw-translate-x-5"></div>

            <VerticalSpacer className="tw-h-4" />

            <div className="lg-text-title2">{vernacularContent.heading}</div>

            <VerticalSpacer className="tw-h-4" />

            <div className="tw-flex tw-flex-col">
                <ItemBuilder
                    items={vernacularContent.features}
                    itemBuilder={(feature, featureIndex) => (
                        <div
                            className={concatenateNonNullStringsWithSpaces(
                                "tw-flex tw-flex-row tw-py-1 tw-justify-between tw-items-center",
                                `${featureIndex == vernacularContent.features.length - 1 ? "" : "tw-border-b"}`,
                            )}
                        >
                            <div className="lg-text-body">{feature.title}</div>
                            <div className="tw-w-5">
                                {feature.highlighted ? (
                                    <CheckCircleIcon className="tw-h-5 tw-w-5 lg-text-primary-500 tw-rounded-full -tw-translate-y-[.10rem]" />
                                ) : (
                                    <XCircleIcon className="tw-h-5 tw-w-5 lg-text-secondary-500 tw-rounded-full -tw-translate-y-[.10rem]" />
                                )}
                            </div>
                        </div>
                    )}
                />
            </div>

            <VerticalSpacer className="tw-h-4" />
        </div>
    );
}

export function DownloadCta({
    userPreferences,
    textVernacId,
    utmParameters,
    className,
}: {
    userPreferences: UserPreferences;
    textVernacId: string;
    utmParameters: {[searchParameter: string]: string};
    className?: string;
}) {
    // const [isDownloadDialogOpen, setIsDownloadDialogOpen] = useState(false);

    // function tryToOpenDownloadDialog() {
    //     setIsDownloadDialogOpen(true);
    // }
    const contentData = useContext(ContentProviderContext);
    return (
        <div className={className}>
            <a
                href="https://www.livguard.com/static-assets/livguard-ib-leaflet.pdf"
                download
                className={"tw-flex tw-flex-row lg-bg-secondary-100 tw-rounded-lg tw-p-2 lg:tw-p-4 tw-justify-start tw-items-center tw-gap-3"}
                target="_blank"
            >
                <div className="tw-h-8 tw-min-w-[32px]">
                    <FullWidthImage relativePath="/livguard/icons/downloadCatalogue.png" />
                </div>
                <div className="lg-text-title2">{contentData.getContent(textVernacId)}</div>
            </a>

            {/* <div
                className={"tw-flex tw-flex-row lg-bg-secondary-100 tw-rounded-lg tw-p-2 lg:tw-p-4 tw-justify-start tw-items-center tw-gap-3"}
                onClick={tryToOpenDownloadDialog}
            >
                <div className="tw-h-8 tw-min-w-[32px]">
                    <FullWidthImage
                        relativePath="/livguard/icons/downloadCatalogue.png"
                    />
                </div>
                <div className="lg-text-title2">{contentData.getContent(textVernacId)}</div>
            </div> */}

            {/* <DownloadDialog
                userPreferences={userPreferences}
                isDownloadDialogOpen={isDownloadDialogOpen}
                setIsDownloadDialogOpen={setIsDownloadDialogOpen}
                utmParameters={utmParameters}
            /> */}
        </div>
    );
}

// export function DownloadDialog({
//     userPreferences,
//     isDownloadDialogOpen,
//     setIsDownloadDialogOpen,
//     utmParameters,
// }: {
//     userPreferences: UserPreferences;
//     isDownloadDialogOpen: boolean;
//     setIsDownloadDialogOpen: React.Dispatch<boolean>;
//     utmParameters: {[searchParameter: string]: string};
// }) {
//     // TODO: Understand why we cannot use action for this
//     const fetcher = useFetcher();

//     const [formSubmittedSuccessfully, setFormSubmittedSuccessfully] = useState(false);

//     useEffect(() => {
//         if (fetcher.data == null) {
//             return;
//         }

//         if (fetcher.data.error != null) {
//             toast.error(fetcher.data.error);
//             return;
//         }

//         setFormSubmittedSuccessfully(true);
//     }, [fetcher.data]);

//     function tryToCloseDownloadDialog() {
//         setIsDownloadDialogOpen(false);
//     }

//     return (
//         <Transition
//             show={isDownloadDialogOpen}
//             as={React.Fragment}
//         >
//             <Dialog
//                 as="div"
//                 className="tw-relative tw-z-50"
//                 onClose={tryToCloseDownloadDialog}
//             >
//                 <Transition.Child
//                     as={React.Fragment}
//                     enter="tw-ease-out tw-transition-all tw-duration-200"
//                     enterFrom="tw-opacity-0"
//                     enterTo="tw-opacity-100"
//                     leave="tw-ease-in tw-transition-all tw-duration-200"
//                     leaveFrom="tw-opacity-100"
//                     leaveTo="tw-opacity-0"
//                 >
//                     <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-[55%] tw-backdrop-blur" />
//                 </Transition.Child>

//                 <Dialog.Panel className="lg-px-screen-edge tw-fixed tw-inset-0 tw-max-w-[30rem] tw-mx-auto tw-grid tw-grid-rows-1 tw-grid-cols-1 tw-justify-center tw-items-center">
//                     <Transition.Child
//                         as="div"
//                         enter="tw-ease-out tw-transition-all tw-duration-200"
//                         enterFrom="tw-opacity-0"
//                         enterTo="tw-opacity-full"
//                         leave="tw-ease-in tw-transition-all tw-duration-200"
//                         leaveFrom="tw-opacity-full"
//                         leaveTo="tw-opacity-0"
//                     >
//                         {formSubmittedSuccessfully ? (
//                             <DownloadFormSubmissionSuccess
//                                 userPreferences={userPreferences}
//                                 tryToCloseDialog={tryToCloseDownloadDialog}
//                             />
//                         ) : (
//                             <div
//                                 className="lg-px-screen-edge tw-flex tw-flex-col"
//                                 id="contactUs"
//                             >
//                                 <VerticalSpacer className="tw-h-4" />

//                                 <DefaultElementAnimation>
//                                     <fetcher.Form
//                                         className="tw-w-full tw-rounded-lg tw-grid tw-grid-rows-[2rem_auto_1rem_auto_1rem_auto_1rem_auto_1rem_auto_2rem] tw-justify-items-center tw-overflow-hidden"
//                                         method="post"
//                                         action="/contact-us-submission"
//                                     >
//                                         <CoverImage
//                                             relativePath="/livguard/contact-form/background.jpg"
//                                             className="tw-row-[1/span_11] tw-col-start-1 tw-rounded-lg tw-opacity-70"
//                                         />

//                                         <div className="tw-row-start-2 tw-col-start-1 lg-text-title1 tw-text-center lg-text-secondary-900-dark tw-z-10">
//                                             <DefaultTextAnimation>
//                                                 <div dangerouslySetInnerHTML={{__html: contentData.getContent("downloadFormHT1")}} />
//                                             </DefaultTextAnimation>
//                                             <DefaultTextAnimation>
//                                                 <div dangerouslySetInnerHTML={{__html: contentData.getContent("downloadFormHT2")}} />
//                                             </DefaultTextAnimation>
//                                         </div>

//                                         <div className="tw-row-start-4 tw-col-start-1 tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10">
//                                             <div className="lg-text-title2 tw-pl-3">{contentData.getContent("contactUsT2")}</div>

//                                             <input
//                                                 type="text"
//                                                 name="phoneNumber"
//                                                 pattern={phoneNumberValidationPattern}
//                                                 required
//                                                 className="lg-text-input"
//                                                 placeholder={contentData.getContent("contactUsT2E")}
//                                             />
//                                         </div>

//                                         <div className="tw-row-start-6 tw-col-start-1 tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10">
//                                             <div className="lg-text-title2 tw-pl-3">{contentData.getContent("contactUsT3")}</div>

//                                             <input
//                                                 type="text"
//                                                 name="name"
//                                                 required
//                                                 className="lg-text-input"
//                                                 placeholder={contentData.getContent("contactUsT3E")}
//                                             />
//                                         </div>

//                                         <div className="tw-row-start-[8] tw-col-start-1 tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10">
//                                             <div className="lg-text-title2 tw-pl-3">{contentData.getContent("contactUsT4")}</div>

//                                             <input
//                                                 type="text"
//                                                 name="emailId"
//                                                 pattern={emailIdValidationPattern}
//                                                 required
//                                                 className="lg-text-input"
//                                                 placeholder={contentData.getContent("contactUsT4E")}
//                                             />
//                                         </div>

//                                         <input
//                                             name="utmParameters"
//                                             className="tw-hidden"
//                                             readOnly
//                                             value={JSON.stringify(utmParameters)}
//                                         />

//                                         <div className="tw-row-start-[10] tw-col-start-1 tw-flex tw-flex-col tw-w-full lg-px-screen-edge tw-z-10">
//                                             <button
//                                                 type="submit"
//                                                 className="lg-cta-button tw-px-4 tw-self-center tw-w-60"
//                                             >
//                                                 {contentData.getContent("downloadFormT3")}
//                                             </button>
//                                         </div>
//                                     </fetcher.Form>
//                                 </DefaultElementAnimation>
//                             </div>
//                         )}
//                     </Transition.Child>
//                 </Dialog.Panel>
//             </Dialog>
//         </Transition>
//     );
// }

// function DownloadFormSubmissionSuccess({userPreferences, tryToCloseDialog}: {userPreferences: UserPreferences; tryToCloseDialog: () => void}) {
//     return (
//         <div className="tw-w-full lg-card lg-bg-secondary-100 tw-px-6 tw-pt-6 tw-rounded-lg tw-flex tw-flex-col tw-text-center tw-justify-center tw-items-center tw-relative">
//             <button
//                 type="button"
//                 className="tw-absolute tw-top-6 tw-right-6"
//                 onClick={tryToCloseDialog}
//             >
//                 <X className="tw-w-8 tw-h-8" />
//             </button>

//             <FixedWidthImage
//                 relativePath="/livguard/icons/confirmation.png"
//                 width="10rem"
//             />

//             <VerticalSpacer className="tw-h-2" />

//             <div
//                 dangerouslySetInnerHTML={{__html: contentData.getContent("successT1")}}
//                 className="lg-text-banner"
//             />

//             <VerticalSpacer className="tw-h-4" />

//             <div
//                 dangerouslySetInnerHTML={{__html: contentData.getContent("downloadSuccessT2")}}
//                 className="lg-text-title2"
//             />

//             <VerticalSpacer className="tw-h-8" />

//             <a
//                 href="https://www.livguard.com/static-assets/livguard-ib-leaflet.pdf"
//                 className="lg-text-body"
//             >
//                 <div
//                     dangerouslySetInnerHTML={{__html: contentData.getContent("downloadSuccessT3")}}
//                     className="lg-text-body"
//                 />
//             </a>

//             <VerticalSpacer className="tw-h-8" />

//             <div className="tw-w-full tw-flex tw-justify-evenly">
//                 <a
//                     href="https://www.facebook.com/LivguardEnergy/"
//                     target="_blank"
//                 >
//                     <Facebook className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
//                 </a>
//                 <a
//                     href="https://twitter.com/LivguardEnergy"
//                     target="_blank"
//                 >
//                     <Twitter className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
//                 </a>
//                 <a
//                     href="https://www.instagram.com/livguardenergy/"
//                     target="_blank"
//                 >
//                     <Instagram className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
//                 </a>
//                 <a
//                     href="https://www.linkedin.com/company/livguard-energy/"
//                     target="_blank"
//                 >
//                     <Linkedin className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
//                 </a>
//                 <a
//                     href="https://www.youtube.com/@LivguardEnergy"
//                     target="_blank"
//                 >
//                     <Youtube className="tw-w-6 tw-h-6 hover:lg-text-primary-500 lg-text-secondary-700 tw-mt-[6px] tw-duration-200" />
//                 </a>
//             </div>
//         </div>
//     );
// }

export function SocialHandles({userPreferences, heading, className}: {userPreferences: UserPreferences; heading: {text1: string; text2: string}; className?: string}) {
    const contentData = useContext(ContentProviderContext);
    const secondaryNavigationController = useContext(SecondaryNavigationControllerContext);
    const {ref: sectionRef, inView: sectionInView} = useInView({threshold: secondaryNavThreshold});
    useEffect(() => {
        secondaryNavigationController.setSections((previousSections) => ({
            ...previousSections,
            "social-handles": {
                humanReadableName: contentData.getContent("01553562-bafd-4ad3-a18c-7b6cc113f03f"),
                isCurrentlyVisible: sectionInView,
            },
        }));
    }, [sectionRef, sectionInView]);
    const embeddedVideos = [
        <EmbeddedYoutubeVideo
            id="b6gqLXTnZnw"
            style={{aspectRatio: "560/315"}}
        />,
        <EmbeddedYoutubeVideo
            id="CRabeGp9800"
            style={{aspectRatio: "560/315"}}
        />,
        <EmbeddedYoutubeVideo
            id="tFj9GJcjq6s"
            style={{aspectRatio: "560/315"}}
        />,
    ];

    return (
        <div
            className={concatenateNonNullStringsWithSpaces("[@media(max-width:1024px)]:lg-px-screen-edge tw-w-full tw-max-w-7xl tw-mx-auto", className)}
            id="social-handles"
            ref={sectionRef}
        >
            <div className="tw-flex tw-flex-col tw-rounded-lg tw-text-center lg-px-screen-edge lg:tw-hidden">
                <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

                <div className="lg-text-headline">
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent(heading.text1)}} />

                    <div dangerouslySetInnerHTML={{__html: contentData.getContent(heading.text2)}} />
                </div>

                <VerticalSpacer className="tw-h-4" />

                <CarouselStyle3 items={embeddedVideos} />

                <VerticalSpacer className="tw-h-4" />

                <div className="lg-text-body">{contentData.getContent("homeS11T2")}</div>

                <VerticalSpacer className="tw-h-2" />

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

                <VerticalSpacer className="tw-h-4" />
            </div>

            <div className="tw-hidden lg:tw-flex tw-flex-col tw-justify-center tw-text-center">
                <VerticalSpacer className="tw-h-4 lg:tw-hidden" />

                <div className="lg-text-headline">
                    <div dangerouslySetInnerHTML={{__html: contentData.getContent(heading.text1)}} />

                    <div dangerouslySetInnerHTML={{__html: contentData.getContent(heading.text2)}} />
                </div>

                <VerticalSpacer className="tw-h-8" />

                <div className="tw-grid tw-grid-cols-3 tw-gap-2">
                    <ItemBuilder
                        items={embeddedVideos}
                        itemBuilder={(video, videoIndex) => (
                            <div
                                className="tw-flex tw-flex-col lg-card tw-rounded-lg tw-pb-4 tw-overflow-hidden"
                                key={videoIndex}
                            >
                                {video}

                                <VerticalSpacer className="tw-h-2" />

                                <div className="lg-text-body">{contentData.getContent("homeS11T2")}</div>

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
                            </div>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}
