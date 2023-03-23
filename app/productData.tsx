import {Language} from "~/typeDefinitions";

export const enum ProductType {
    inverter = 0,
    battery = 1,
    jodi = 2,
};

export type ProductDetails = {
    images: Array<{image: string}>;
    title: string;
    subTitle: string;
    description: string;
    productIcons: Array<{icon: string; text: string}>;
    specifications: Array<{title: string; value: string}>;
    features: Array<{value: string}>;
    additionalInfo: Array<{title: string; value: string}>;
    productDescription: {description: string; images: Array<{image: string}>};
    reviews: {rating: number; numberOfReviews: number};
    recommendedProducts: Array<{title: string; imageRelativePath: string; buttonText: string; bestseller: boolean; link: string}>;
    type: ProductType;
    metadata: {
        canonicalUrl: string;
        title: string;
        description: string;
        schema: string;
    };
};

export const allProductDetails: {[key: string]: {[key: string]: ProductDetails; [key: string]: ProductDetails}} = {
    LG700E: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/product/inverter/LG750i/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/inverter/LG750i/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/inverter/LG750i/infographic/3.jpg",
                },
                {
                    image: "/livguard/product/inverter/LG750i/infographic/4.jpg",
                },
            ],
            title: "Livguard i2-verter pro Square Wave inverter 600 VA with 3-Year Warranty(LG700E Square Wave 600VA)",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description: "Bring home the power of unlimited energy with our Inverter. Equipped with the best-in-class warranty and Smart AI Charging to offer a smooth flow of energy to you.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "3 Year Warranty",
                },
                {
                    icon: "/livguard/icons/inverter_capacity.png",
                    text: "600 VA",
                },
                {
                    icon: "/livguard/icons/square wave white.png",
                    text: "Square Wave Inverter",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "275(L) X 205(W) X 124(H)",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "i2-verter pro",
                },
                {
                    title: "Warranty",
                    value: "3 Years",
                },
                {
                    title: "Package Contents",
                    value: "Inverter and User Manual",
                },
                {
                    title: "Rating",
                    value: "600VA",
                },
                {
                    title: "Dimensions",
                    value: "275(L) X 205(W) X 124(H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with 3 Years of Warranty",
                },
                {
                    value: "Backed with Smart Artificial Intelligent Charging",
                },
                {
                    value: "Premium New Age Design with LED Display for indications of current status of your inverter",
                },
                {
                    value: "Fault Detection for Overcharging, Overload & Short Circuit etc.",
                },
                {
                    value: "Supports All Battery Types",
                },
            ],
            additionalInfo: [
                {
                    title: "Manufacturer",
                    value: "Livguard",
                },
                {
                    title: "Item Weight",
                    value: "7 Kg",
                },
                {
                    title: "Country Of Origin",
                    value: "India",
                },
            ],
            productDescription: {
                description: "With our Inverter at your home, say goodbye to the problem of frequent power cuts and enjoy a smooth, steady flow of energy to power your day-to-day routine.",
                images: [
                    {
                        image: "/livguard/product/inverter/LG750i/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG750i/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG750i/A+/3.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG750i/A+/4.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGS900i",
                    imageRelativePath: "/livguard/inverter images/LGS900i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LGS900i",
                },
                {
                    title: "LG900",
                    imageRelativePath: "/livguard/inverter images/LG900.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG900",
                },
                {
                    title: "LGS1000i",
                    imageRelativePath: "/livguard/inverter images/LLGS1000i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/LGS1000i",
                },
                {
                    title: "LG1100",
                    imageRelativePath: "/livguard/inverter images/LG1100.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/LG1100",
                },
            ],
            type: ProductType.inverter,
            metadata: {
                title: "Livguard i2-verter pro inverter Online 600VA with 3-Year warranty",
                description: "Buy Square Wave Inverter 600 VA, with a 3-year Warranty, Suitable inverter for small offices, homes, and small shops ",
                canonicalUrl: `/product/lg700e`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "LG700E",
                    "url": "https://www.livguard.com/product/LG700E",
                    "image": "https://growthjockey.imgix.net/livguard/product/inverter/LG750i/infographic/1.jpg?w=508",
                    "description": "",
                    "brand": {
                            "@type": "Brand",
                            "name": "Livgaurd"
                    }
            }

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/product/inverter/LG750i/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/inverter/LG750i/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/inverter/LG750i/infographic/3.jpg",
                },
                {
                    image: "/livguard/product/inverter/LG750i/infographic/4.jpg",
                },
            ],
            title: "लिवगार्ड i2-वर्टर प्रो स्क्वायर वेव इन्वर्टर 600 VA 3 वर्ष की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त",
            description:
                "हमारे इन्वर्टर के साथ असीमित ऊर्जा की शक्ति घर लाएं। आपको ऊर्जा का सहज प्रवाह प्रदान करने के लिए उद्योग की सावराश्रेष्ठ वारंटी आवर स्मार्ट ए आई चार्जिंग के साथ बने इन्वर्टर।",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "3 वर्ष वारंटी",
                },
                {
                    icon: "/livguard/icons/inverter_capacity.png",
                    text: "600VA",
                },
                {
                    icon: "/livguard/icons/square wave white.png",
                    text: "स्क्वायर वेव इनवर्टर",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "275(L) X 205(W) X 124(H)",
                },
            ],
            specifications: [
                {
                    title: "मॉडल संख्या ",
                    value: "i2-वर्टर प्रो",
                },
                {
                    title: "वारंटी",
                    value: "3 वर्ष",
                },
                {
                    title: "पैकेज सामग्री",
                    value: "इनवर्टर और उपयोगकर्ता मैन्युअल",
                },
                {
                    title: "रेटिंग",
                    value: "600VA",
                },
                {
                    title: "आयाम",
                    value: "275(L) X 205(W) X 124(H)",
                },
            ],
            features: [
                {
                    value: "मन की शांति 3 वर्ष की वारंटी के साथ",
                },
                {
                    value: "स्मार्ट ए आई चार्जिंग से युक्त इनवर्टर",
                },
                {
                    value: "नये दौर की बनावट और LED डिस्प्ले के साथ, जो इनवर्टर के वर्तमान स्थिति दर्शाता है",
                },
                {
                    value: "ओवरचार्जिंग, ओवरलोड और शॉर्ट सर्किट आदि के लिए फॉल्ट डिटेक्शन।",
                },
                {
                    value: "सभी प्रकार की बैटरी के लिए उचित",
                },
            ],
            additionalInfo: [
                {
                    title: "उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "7 Kg",
                },
                {
                    title: "मूल का देश",
                    value: "भारत",
                },
            ],
            productDescription: {
                description:
                    "अपने घर पर हमारे इन्वर्टर के साथ, बार-बार बिजली कटौती की समस्या को अलविदा कहें और अपनी रोज़ाना दिनचर्या को बिना रुकावट चलाने के लिए ऊर्जा के एक सहज, स्थिर प्रवाह का आनंद लें।",
                images: [
                    {
                        image: "/livguard/product/inverter/LG750i/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG750i/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG750i/A+/3.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG750i/A+/4.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGS900i",
                    imageRelativePath: "/livguard/inverter images/LGS900i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LGS900i",
                },
                {
                    title: "LG900",
                    imageRelativePath: "/livguard/inverter images/LG900.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG900",
                },
                {
                    title: "LGS1000i",
                    imageRelativePath: "/livguard/inverter images/LLGS1000i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/LGS1000i",
                },
                {
                    title: "LG1100",
                    imageRelativePath: "/livguard/inverter images/LG1100.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/LG1100",
                },
            ],
            type: ProductType.inverter,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    LG900: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/product/inverter/LG950i/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/inverter/LG950i/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/inverter/LG950i/infographic/3.jpg",
                },
                {
                    image: "/livguard/product/inverter/LG950i/infographic/4.jpg",
                },
            ],
            title: "Livguard i2-verter pro Square Wave inverter 800 VA with 3-Year Warranty",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description: "Bring home the power of unlimited energy with our Inverter. Equipped with the best-in-class warranty and Smart AI Charging to offer a smooth flow of energy to you.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "3 Year Warranty",
                },
                {
                    icon: "/livguard/icons/inverter_capacity.png",
                    text: "800 VA",
                },
                {
                    icon: "/livguard/icons/square wave white.png",
                    text: "Square Wave Inverter",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "275(L) X 242(W) X 124(H)",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "i2-verter pro",
                },
                {
                    title: "Warranty",
                    value: "3 Years",
                },
                {
                    title: "Package Contents",
                    value: "Inverter and User Manual",
                },
                {
                    title: "Rating",
                    value: "800VA",
                },
                {
                    title: "Dimensions",
                    value: "275(L) X 242(W) X 124(H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with 3 Years of Warranty",
                },
                {
                    value: "Backed with Smart Artificial Intelligent Charging",
                },
                {
                    value: "Premium New Age Design with LED Display for indications of current status of your inverter",
                },
                {
                    value: "Fault Detection for Overcharging, Overload & Short Circuit etc.",
                },
                {
                    value: "Supports All Battery Types",
                },
            ],
            additionalInfo: [
                {
                    title: "Manufacturer",
                    value: "Livguard",
                },
                {
                    title: "Item Weight",
                    value: "8.2 Kg",
                },
                {
                    title: "Country Of Origin",
                    value: "India",
                },
            ],
            productDescription: {
                description: "With our Inverter at your home, say goodbye to the problem of frequent power cuts and enjoy a smooth, steady flow of energy to power your day-to-day routine.",
                images: [
                    {
                        image: "/livguard/product/inverter/LG950i/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG950i/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG950i/A+/3.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG950i/A+/4.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGS1000i",
                    imageRelativePath: "/livguard/inverter images/LGS1000i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/LGS1000i",
                },
                {
                    title: "LG1100",
                    imageRelativePath: "/livguard/inverter images/LG1100.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1100",
                },
                {
                    title: "LGS1100i",
                    imageRelativePath: "/livguard/inverter images/Livguard-LGS1100iPV_power-verter-Inverter-Front.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/LGS1100i",
                },

                {
                    title: "LG1450i",
                    imageRelativePath: "/livguard/inverter images/LG1450i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1450i",
                },
            ],
            type: ProductType.inverter,
            metadata: {
                title: "Livguard Square Wave Inverter Online 800VA",
                description: "Buy a Livguard i2 - verter pro Square Wave Inverter 800 VA  with a 3-year warranty. Suitable inverter for small offices, homes, and Small shops ",
                canonicalUrl: `/product/lg900`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "LG900",
                    "url": "https://www.livguard.com/product/LG900",
                    "image": "https://growthjockey.imgix.net/livguard/product/inverter/LG950i/infographic/1.jpg?w=508",
                    "description": "",
                    "brand": {
                            "@type": "Brand",
                            "name": "Livgaurd"
                    }
            }

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/product/inverter/LG950i/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/inverter/LG950i/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/inverter/LG950i/infographic/3.jpg",
                },
                {
                    image: "/livguard/product/inverter/LG950i/infographic/4.jpg",
                },
            ],
            title: "लिवगार्ड i2-वर्टर प्रो स्क्वायर वेव इन्वर्टर 800 VA 3 वर्ष की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description:
                "हमारे इन्वर्टर के साथ असीमित ऊर्जा की शक्ति घर लाएं। आपको ऊर्जा का सहज प्रवाह प्रदान करने के लिए उद्योग की सावराश्रेष्ठ वारंटी आवर स्मार्ट ए आई चार्जिंग के साथ बने इन्वर्टर।",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "3 वर्ष वारंटी",
                },
                {
                    icon: "/livguard/icons/inverter_capacity.png",
                    text: "800VA",
                },
                {
                    icon: "/livguard/icons/square wave white.png",
                    text: "स्क्वायर वेव इनवर्टर",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "275(L) X 242(W) X 124(H)",
                },
            ],
            specifications: [
                {
                    title: "मॉडल संख्या ",
                    value: "i2-वर्टर प्रो",
                },
                {
                    title: "वारंटी",
                    value: "3 वर्ष",
                },
                {
                    title: "पैकेज सामग्री",
                    value: "इनवर्टर और उपयोगकर्ता मैन्युअल",
                },
                {
                    title: "रेटिंग",
                    value: "600VA",
                },
                {
                    title: "आयाम",
                    value: "275(L) X 242(W) X 124(H)",
                },
            ],
            features: [
                {
                    value: "मन की शांति 3 वर्ष की वारंटी के साथ",
                },
                {
                    value: "स्मार्ट ए आई चार्जिंग से युक्त इनवर्टर",
                },
                {
                    value: "नये दौर की बनावट और LED डिस्प्ले के साथ, जो इनवर्टर के वर्तमान स्थिति दर्शाता है",
                },
                {
                    value: "ओवरचार्जिंग, ओवरलोड और शॉर्ट सर्किट आदि के लिए फॉल्ट डिटेक्शन।",
                },
                {
                    value: "सभी प्रकार की बैटरी के लिए उचित",
                },
            ],
            additionalInfo: [
                {
                    title: "उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "8.2 Kg",
                },
                {
                    title: "मूल का देश",
                    value: "भारत",
                },
            ],
            productDescription: {
                description:
                    "अपने घर पर हमारे इन्वर्टर के साथ, बार-बार बिजली कटौती की समस्या को अलविदा कहें और अपनी रोज़ाना दिनचर्या को बिना रुकावट चलाने के लिए ऊर्जा के एक सहज, स्थिर प्रवाह का आनंद लें।",
                images: [
                    {
                        image: "/livguard/product/inverter/LG950i/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG950i/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG950i/A+/3.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG950i/A+/4.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGS1000i",
                    imageRelativePath: "/livguard/inverter images/LGS1000i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/LGS1000i",
                },
                {
                    title: "LG1100",
                    imageRelativePath: "/livguard/inverter images/LG1100.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1100",
                },
                {
                    title: "LGS1100i",
                    imageRelativePath: "/livguard/inverter images/Livguard-LGS1100iPV_power-verter-Inverter-Front.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/LGS1100i",
                },

                {
                    title: "LG1450i",
                    imageRelativePath: "/livguard/inverter images/LG1450i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1450i",
                },
            ],
            type: ProductType.inverter,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    LG1100: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/product/inverter/LG1150i/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/inverter/LG1150i/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/inverter/LG1150i/infographic/3.jpg",
                },
                {
                    image: "/livguard/product/inverter/LG1150i/infographic/4.jpg",
                },
            ],
            title: "Livguard i2-verter pro Square Wave inverter 900 VA with 3-Year Warranty",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description: "Bring home the power of unlimited energy with our Inverter. Equipped with the best-in-class warranty and Smart AI Charging to offer a smooth flow of energy to you",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "3 Year Warranty",
                },
                {
                    icon: "/livguard/icons/inverter_capacity.png",
                    text: "900 VA",
                },
                {
                    icon: "/livguard/icons/square wave white.png",
                    text: "Square Wave Inverter ",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "275(L) X 242(W) X 124(H)",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "i2-verter pro",
                },
                {
                    title: "Warranty",
                    value: "3 Years",
                },
                {
                    title: "Package Contents",
                    value: "Inverter and User Manual",
                },
                {
                    title: "Rating",
                    value: "900VA",
                },
                {
                    title: "Dimensions",
                    value: "275(L) X 242(W) X 124(H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with 3 Years of Warranty",
                },
                {
                    value: "Backed with Smart Artificial Intelligent Charging",
                },
                {
                    value: "Premium New Age Design with LED Display for indications of current status of your inverter",
                },
                {
                    value: "Fault Detection for Overcharging, Overload & Short Circuit etc.",
                },
                {
                    value: "Supports All Battery Types",
                },
            ],
            additionalInfo: [
                {
                    title: "Manufacturer",
                    value: "Livguard",
                },
                {
                    title: "Item Weight",
                    value: "9 Kg",
                },
                {
                    title: "Country Of Origin",
                    value: "India",
                },
            ],
            productDescription: {
                description: "With our Inverter at your home, say goodbye to the problem of frequent power cuts and enjoy a smooth, steady flow of energy to power your day-to-day routine.",
                images: [
                    {
                        image: "/livguard/product/inverter/LG1150i/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG1150i/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG1150i/A+/3.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG1150i/A+/4.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGS1100i",
                    imageRelativePath: "/livguard/inverter images/Livguard-LGS1100iPV_power-verter-Inverter-Front.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/LGS1100i",
                },
                {
                    title: "LG1450i",
                    imageRelativePath: "/livguard/inverter images/LG1450i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1450i",
                },
                {
                    title: "LG1550i",
                    imageRelativePath: "/livguard/inverter images/LG1550i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1550i",
                },
                {
                    title: "LGS1600",
                    imageRelativePath: "/livguard/inverter images/LGS1600.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LGS1600",
                },
            ],
            type: ProductType.inverter,
            metadata: {
                title: "Buy Square Wave Inverter Online 900VA - Livguard",
                description: "Get Livguard i2 - verter pro Square Wave Inverter 900 VA with a 3-year service promise, equipped with the best-in-class services and smart AI charging.",
                canonicalUrl: `/product/lg1100`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "LG1100",
                    "url": "https://www.livguard.com/product/LG1100",
                    "image": "https://growthjockey.imgix.net/livguard/product/inverter/LG1150i/infographic/1.jpg?w=508",
                    "description": "",
                    "brand": {
                            "@type": "Brand",
                            "name": "Livgaurd"
                    }
            }

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/product/inverter/LG1150i/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/inverter/LG1150i/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/inverter/LG1150i/infographic/3.jpg",
                },
                {
                    image: "/livguard/product/inverter/LG1150i/infographic/4.jpg",
                },
            ],
            title: "लिवगार्ड i2-वर्टर प्रो स्क्वायर वेव इन्वर्टर 900 VA 3 वर्ष की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description:
                "हमारे इन्वर्टर के साथ असीमित ऊर्जा की शक्ति घर लाएं। आपको ऊर्जा का सहज प्रवाह प्रदान करने के लिए उद्योग की सावराश्रेष्ठ वारंटी आवर स्मार्ट ए आई चार्जिंग के साथ बने इन्वर्टर।",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "3 वर्ष वारंटी",
                },
                {
                    icon: "/livguard/icons/inverter_capacity.png",
                    text: "900VA",
                },
                {
                    icon: "/livguard/icons/square wave white.png",
                    text: "स्क्वायर वेव इनवर्टर",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "275(L) X 242(W) X 124(H)",
                },
            ],
            specifications: [
                {
                    title: "मॉडल संख्या ",
                    value: "i2-वर्टर प्रो",
                },
                {
                    title: "वारंटी",
                    value: "3 वर्ष",
                },
                {
                    title: "पैकेज सामग्री",
                    value: "इनवर्टर और उपयोगकर्ता मैन्युअल",
                },
                {
                    title: "रेटिंग",
                    value: "900VA",
                },
                {
                    title: "आयाम",
                    value: "275(L) X 242(W) X 124(H)",
                },
            ],
            features: [
                {
                    value: "मन की शांति 3 वर्ष की वारंटी के साथ",
                },
                {
                    value: "स्मार्ट ए आई चार्जिंग से युक्त इनवर्टर",
                },
                {
                    value: "नये दौर की बनावट और LED डिस्प्ले के साथ, जो इनवर्टर के वर्तमान स्थिति दर्शाता है",
                },
                {
                    value: "ओवरचार्जिंग, ओवरलोड और शॉर्ट सर्किट आदि के लिए फॉल्ट डिटेक्शन।",
                },
                {
                    value: "सभी प्रकार की बैटरी के लिए उचित",
                },
            ],
            additionalInfo: [
                {
                    title: "उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "9 Kg",
                },
                {
                    title: "मूल का देश",
                    value: "भारत",
                },
            ],
            productDescription: {
                description:
                    "अपने घर पर हमारे इन्वर्टर के साथ, बार-बार बिजली कटौती की समस्या को अलविदा कहें और अपनी रोज़ाना दिनचर्या को बिना रुकावट चलाने के लिए ऊर्जा के एक सहज, स्थिर प्रवाह का आनंद लें।",
                images: [
                    {
                        image: "/livguard/product/inverter/LG1150i/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG1150i/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG1150i/A+/3.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG1150i/A+/4.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGS1100i",
                    imageRelativePath: "/livguard/inverter images/Livguard-LGS1100iPV_power-verter-Inverter-Front.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/LGS1100i",
                },
                {
                    title: "LG1450i",
                    imageRelativePath: "/livguard/inverter images/LG1450i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1450i",
                },
                {
                    title: "LG1550i",
                    imageRelativePath: "/livguard/inverter images/LG1550i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1550i",
                },
                {
                    title: "LGS1600",
                    imageRelativePath: "/livguard/inverter images/LGS1600.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LGS1600",
                },
            ],
            type: ProductType.inverter,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    LG1450i: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/product/inverter/LG1450i/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/inverter/LG1450i/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/inverter/LG1450i/infographic/3.jpg",
                },
                {
                    image: "/livguard/product/inverter/LG1450i/infographic/4.jpg",
                },
            ],
            title: "Livguard i2-verter pro Square Wave inverter 1100 VA with 3-Year Warranty",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description: "Bring home the power of unlimited energy with our Inverter. Equipped with the best-in-class warranty and Smart AI Charging to offer a smooth flow of energy to you.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "3 Year Warranty",
                },
                {
                    icon: "/livguard/icons/inverter_capacity.png",
                    text: "1100 VA",
                },
                {
                    icon: "/livguard/icons/square wave white.png",
                    text: "Square Wave Inverter ",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "275(L) X 281(W) X 145(H)",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "i2-verter pro",
                },
                {
                    title: "Warranty",
                    value: "3 Years",
                },
                {
                    title: "Package Contents",
                    value: "Inverter and User Manual",
                },
                {
                    title: "Rating",
                    value: "1100VA",
                },
                {
                    title: "Dimensions",
                    value: "275(L) X 281(W) X 145(H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with 3 Years of Warranty",
                },
                {
                    value: "Backed with Smart Artificial Intelligent Charging",
                },
                {
                    value: "Extra Load Handling capacity",
                },
                {
                    value: "Fault Detection for Overcharging, Overload & Short Circuit etc.",
                },
                {
                    value: "Supports All Battery Types",
                },
            ],
            additionalInfo: [
                {
                    title: "Manufacturer",
                    value: "Livguard",
                },
                {
                    title: "Item Weight",
                    value: "11.4 Kg",
                },
                {
                    title: "Country Of Origin",
                    value: "India",
                },
            ],
            productDescription: {
                description: "With our Inverter at your home, say goodbye to the problem of frequent power cuts and enjoy a smooth, steady flow of energy to power your day-to-day routine.",
                images: [
                    {
                        image: "/livguard/product/inverter/LG1450i/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG1450i/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG1450i/A+/3.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG1450i/A+/4.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LG1550i",
                    imageRelativePath: "/livguard/inverter images/LG1550i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1550i",
                },
                {
                    title: "LGS1600",
                    imageRelativePath: "/livguard/inverter images/LGS1600.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LGS1600",
                },
                {
                    title: "LGS1700",
                    imageRelativePath: "/livguard/inverter images/LGS1700.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LGS1700",
                },
                {
                    title: "LG1950i",
                    imageRelativePath: "/livguard/inverter images/LG1950i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1950i",
                },
            ],
            type: ProductType.inverter,
            metadata: {
                title: "Livguard i2-verter pro Sqaure Wave Inverter Online 1100VA",
                description: "Buy Livguard i2 - verter pro Square Wave Inverter 1100 VA with a 3-Year warranty. Suitable for small offices, homes, and small shops",
                canonicalUrl: `/product/lg1450i`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "LG1450i",
                    "url": "https://www.livguard.com/product/LG1450i",
                    "image": "https://growthjockey.imgix.net/livguard/product/inverter/LG1450ii/infographic/1.jpg?w=508",
                    "description": "",
                    "brand": {
                            "@type": "Brand",
                            "name": "Livgaurd"
                    }
            }

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/product/inverter/LG1450i/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/inverter/LG1450i/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/inverter/LG1450i/infographic/3.jpg",
                },
                {
                    image: "/livguard/product/inverter/LG1450i/infographic/4.jpg",
                },
            ],
            title: "लिवगार्ड i2-वर्टर प्रो स्क्वायर वेव इन्वर्टर 1100 VA 3 वर्ष की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description:
                "हमारे इन्वर्टर के साथ असीमित ऊर्जा की शक्ति घर लाएं। आपको ऊर्जा का सहज प्रवाह प्रदान करने के लिए उद्योग की सावराश्रेष्ठ वारंटी आवर स्मार्ट ए आई चार्जिंग के साथ बने इन्वर्टर।",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "3 वर्ष वारंटी",
                },
                {
                    icon: "/livguard/icons/inverter_capacity.png",
                    text: "1100VA",
                },
                {
                    icon: "/livguard/icons/square wave white.png",
                    text: "स्क्वायर वेव इनवर्टर",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "275(L) X 281(W) X 145(H)",
                },
            ],
            specifications: [
                {
                    title: "मॉडल संख्या ",
                    value: "i2-वर्टर प्रो",
                },
                {
                    title: "वारंटी",
                    value: "3 वर्ष",
                },
                {
                    title: "पैकेज सामग्री",
                    value: "इनवर्टर और उपयोगकर्ता मैन्युअल",
                },
                {
                    title: "रेटिंग",
                    value: "1100VA",
                },
                {
                    title: "आयाम",
                    value: "275(L) X 281(W) X 145(H)",
                },
            ],
            features: [
                {
                    value: "मन की शांति 3 वर्ष की वारंटी के साथ",
                },
                {
                    value: "स्मार्ट ए आई चार्जिंग से युक्त इनवर्टर",
                },
                {
                    value: "अधिकतम लोड हैंडलिंग क्षमता",
                },
                {
                    value: "ओवरचार्जिंग, ओवरलोड और शॉर्ट सर्किट आदि के लिए फॉल्ट डिटेक्शन।",
                },
                {
                    value: "सभी प्रकार की बैटरी के लिए उचित",
                },
            ],
            additionalInfo: [
                {
                    title: "उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "11.40 Kg",
                },
                {
                    title: "मूल का देश",
                    value: "भारत",
                },
            ],
            productDescription: {
                description:
                    "अपने घर पर हमारे इन्वर्टर के साथ, बार-बार बिजली कटौती की समस्या को अलविदा कहें और अपनी रोज़ाना दिनचर्या को बिना रुकावट चलाने के लिए ऊर्जा के एक सहज, स्थिर प्रवाह का आनंद लें।",
                images: [
                    {
                        image: "/livguard/product/inverter/LG1450i/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG1450i/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG1450i/A+/3.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG1450i/A+/4.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LG1550i",
                    imageRelativePath: "/livguard/inverter images/LG1550i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1550i",
                },
                {
                    title: "LGS1600",
                    imageRelativePath: "/livguard/inverter images/LGS1600.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LGS1600",
                },
                {
                    title: "LGS1700",
                    imageRelativePath: "/livguard/inverter images/LGS1700.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LGS1700",
                },
                {
                    title: "LG1950i",
                    imageRelativePath: "/livguard/inverter images/LG1950i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1950i",
                },
            ],
            type: ProductType.inverter,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    LG1550i: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/product/inverter/LG1550i/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/inverter/LG1550i/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/inverter/LG1550i/infographic/3.jpg",
                },
                {
                    image: "/livguard/product/inverter/LG1550i/infographic/4.jpg",
                },
            ],
            title: "Livguard i2-verter pro Square Wave inverter 1100 VA with 3-Year Warranty",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description: "Bring home the power of unlimited energy with our Inverter. Equipped with the best-in-class warranty and Smart AI Charging to offer a smooth flow of energy to you.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "3 Year Warranty",
                },
                {
                    icon: "/livguard/icons/inverter_capacity.png",
                    text: "1250 VA",
                },
                {
                    icon: "/livguard/icons/square wave white.png",
                    text: "Square Wave Inverter ",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "275(L) X 281(W) X 145(H)",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "i2-verter pro",
                },
                {
                    title: "Warranty",
                    value: "3 Years",
                },
                {
                    title: "Package Contents",
                    value: "Inverter and User Manual",
                },
                {
                    title: "Rating",
                    value: "1250VA",
                },
                {
                    title: "Dimensions",
                    value: "275(L) X 281(W) X 145(H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with 3 Years of Warranty",
                },
                {
                    value: "Backed with Smart Artificial Intelligent Charging",
                },
                {
                    value: "Extra Load Handling capacity",
                },
                {
                    value: "Fault Detection for Overcharging, Overload & Short Circuit etc.",
                },
                {
                    value: "Supports All Battery Types",
                },
            ],
            additionalInfo: [
                {
                    title: "Manufacturer",
                    value: "Livguard",
                },
                {
                    title: "Item Weight",
                    value: "12.02 Kg",
                },
                {
                    title: "Country Of Origin",
                    value: "India",
                },
            ],
            productDescription: {
                description: "With our Inverter at your home, say goodbye to the problem of frequent power cuts and enjoy a smooth, steady flow of energy to power your day-to-day routine.",
                images: [
                    {
                        image: "/livguard/product/inverter/LG1550i/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG1550i/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG1550i/A+/3.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG1550i/A+/4.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGS1600",
                    imageRelativePath: "/livguard/inverter images/LGS1600.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LGS1600",
                },
                {
                    title: "LGS1700",
                    imageRelativePath: "/livguard/inverter images/LGS1700.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LGS1700",
                },
                {
                    title: "LG1950i",
                    imageRelativePath: "/livguard/inverter images/LG1950i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1950i",
                },
                {
                    title: "LG1450i",
                    imageRelativePath: "/livguard/inverter images/LG1450i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1450i",
                },
            ],
            type: ProductType.inverter,
            metadata: {
                title: "Livguard i2-verter pro-Square Wave Inverter online",
                description: "Get Livguard Square Wave Inverter 1100VA  with a 3-year warranty. Bring home the power of unlimited energy with our inverter. Suitable for small offices, homes, and small shops.",
                canonicalUrl: `/product/lg1550i`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "LG1550i",
                    "url": "https://www.livguard.com/product/LG1550i",
                    "image": "https://growthjockey.imgix.net/livguard/product/inverter/LG1550ii/infographic/1.jpg?w=508",
                    "description": "",
                    "brand": {
                            "@type": "Brand",
                            "name": "Livgaurd"
                    }
            }

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/product/inverter/LG1550i/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/inverter/LG1550i/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/inverter/LG1550i/infographic/3.jpg",
                },
                {
                    image: "/livguard/product/inverter/LG1550i/infographic/4.jpg",
                },
            ],
            title: "लिवगार्ड i2-वर्टर प्रो स्क्वायर वेव इन्वर्टर 1250 VA 3 वर्ष की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description:
                "हमारे इन्वर्टर के साथ असीमित ऊर्जा की शक्ति घर लाएं। आपको ऊर्जा का सहज प्रवाह प्रदान करने के लिए उद्योग की सावराश्रेष्ठ वारंटी आवर स्मार्ट ए आई चार्जिंग के साथ बने इन्वर्टर।",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "3 वर्ष वारंटी",
                },
                {
                    icon: "/livguard/icons/inverter_capacity.png",
                    text: "1250VA",
                },
                {
                    icon: "/livguard/icons/square wave white.png",
                    text: "स्क्वायर वेव इनवर्टर",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "275(L) X 281(W) X 145(H)",
                },
            ],
            specifications: [
                {
                    title: "मॉडल संख्या ",
                    value: "i2-वर्टर प्रो",
                },
                {
                    title: "वारंटी",
                    value: "3 वर्ष",
                },
                {
                    title: "पैकेज सामग्री",
                    value: "इनवर्टर और उपयोगकर्ता मैन्युअल",
                },
                {
                    title: "रेटिंग",
                    value: "1250VA",
                },
                {
                    title: "आयाम",
                    value: "275(L) X 281(W) X 145(H)",
                },
            ],
            features: [
                {
                    value: "मन की शांति 3 वर्ष की वारंटी के साथ",
                },
                {
                    value: "स्मार्ट ए आई चार्जिंग से युक्त इनवर्टर",
                },
                {
                    value: "अधिकतम लोड हैंडलिंग क्षमता",
                },
                {
                    value: "ओवरचार्जिंग, ओवरलोड और शॉर्ट सर्किट आदि के लिए फॉल्ट डिटेक्शन।",
                },
                {
                    value: "सभी प्रकार की बैटरी के लिए उचित",
                },
            ],
            additionalInfo: [
                {
                    title: "उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "12.02 Kg",
                },
                {
                    title: "मूल का देश",
                    value: "भारत",
                },
            ],
            productDescription: {
                description:
                    "अपने घर पर हमारे इन्वर्टर के साथ, बार-बार बिजली कटौती की समस्या को अलविदा कहें और अपनी रोज़ाना दिनचर्या को बिना रुकावट चलाने के लिए ऊर्जा के एक सहज, स्थिर प्रवाह का आनंद लें।",
                images: [
                    {
                        image: "/livguard/product/inverter/LG1550i/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG1550i/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG1550i/A+/3.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG1550i/A+/4.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGS1600",
                    imageRelativePath: "/livguard/inverter images/LGS1600.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LGS1600",
                },
                {
                    title: "LGS1700",
                    imageRelativePath: "/livguard/inverter images/LGS1700.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LGS1700",
                },
                {
                    title: "LG1950i",
                    imageRelativePath: "/livguard/inverter images/LG1950i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1950i",
                },
                {
                    title: "LG1450i",
                    imageRelativePath: "/livguard/inverter images/LG1450i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1450i",
                },
            ],
            type: ProductType.inverter,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    LG1950i: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/product/inverter/LG1950i/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/inverter/LG1950i/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/inverter/LG1950i/infographic/3.jpg",
                },
                {
                    image: "/livguard/product/inverter/LG1950i/infographic/4.jpg",
                },
            ],
            title: "Livguard i2-verter pro Square Wave inverter 1650 VA with 3-Year Warranty",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description: "Bring home the power of unlimited energy with our Inverter. Equipped with the best-in-class warranty and Smart AI Charging to offer a smooth flow of energy to you.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "3 Year Warranty",
                },
                {
                    icon: "/livguard/icons/inverter_capacity.png",
                    text: "1650 VA",
                },
                {
                    icon: "/livguard/icons/square wave white.png",
                    text: "Square Wave Inverter ",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "275(L) X 281(W) X 145(H)",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "i2-verter pro",
                },
                {
                    title: "Warranty",
                    value: "3 Years",
                },
                {
                    title: "Package Contents",
                    value: "Inverter and User Manual",
                },
                {
                    title: "Rating",
                    value: "1650VA",
                },
                {
                    title: "Dimensions",
                    value: "275(L) X 281(W) X 145(H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with 3 Years of Warranty",
                },
                {
                    value: "Backed with Smart Artificial Intelligent Charging",
                },
                {
                    value: "Extra Load Handling capacity",
                },
                {
                    value: "Fault Detection for Overcharging, Overload & Short Circuit etc.",
                },
                {
                    value: "Supports All Battery Types",
                },
            ],
            additionalInfo: [
                {
                    title: "Manufacturer",
                    value: "Livguard",
                },
                {
                    title: "Item Weight",
                    value: "13.5 Kg",
                },
                {
                    title: "Country Of Origin",
                    value: "India",
                },
            ],
            productDescription: {
                description: "With our Inverter at your home, say goodbye to the problem of frequent power cuts and enjoy a smooth, steady flow of energy to power your day-to-day routine.",
                images: [
                    {
                        image: "/livguard/product/inverter/LG1950i/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG1950i/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG1950i/A+/3.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG1950i/A+/4.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGS1700",
                    imageRelativePath: "/livguard/inverter images/LGS1700.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LGS1700",
                },
                {
                    title: "LGS1600",
                    imageRelativePath: "/livguard/inverter images/LGS1600.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LGS1600",
                },
                {
                    title: "LG1550i",
                    imageRelativePath: "/livguard/inverter images/LG1550i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1550i",
                },
                {
                    title: "LG1450i",
                    imageRelativePath: "/livguard/inverter images/LG1450i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1450i",
                },
            ],
            type: ProductType.inverter,
            metadata: {
                title: "Buy Square Wave Inverter 1650va - Livgaurd",
                description: "Buy Livguard i2 - verter pro Square Wave Inverter 1100VA  with a 3-year warranty & Smart AI charging. Suitable inverter for small offices, homes, and small shops. ",
                canonicalUrl: `/product/lg1950i`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "LG1950I",
                    "url": "https://www.livguard.com/product/LG1950I",
                    "image": "https://growthjockey.imgix.net/livguard/product/inverter/LG1950Ii/infographic/1.jpg?w=508",
                    "description": "",
                    "brand": {
                            "@type": "Brand",
                            "name": "Livgaurd"
                    }
            }

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/product/inverter/LG1950i/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/inverter/LG1950i/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/inverter/LG1950i/infographic/3.jpg",
                },
                {
                    image: "/livguard/product/inverter/LG1950i/infographic/4.jpg",
                },
            ],
            title: "लिवगार्ड i2-वर्टर प्रो स्क्वायर वेव इन्वर्टर 1650 VA 3 वर्ष की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description:
                "हमारे इन्वर्टर के साथ असीमित ऊर्जा की शक्ति घर लाएं। आपको ऊर्जा का सहज प्रवाह प्रदान करने के लिए उद्योग की सावराश्रेष्ठ वारंटी आवर स्मार्ट ए आई चार्जिंग के साथ बने इन्वर्टर।",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "3 वर्ष वारंटी",
                },
                {
                    icon: "/livguard/icons/inverter_capacity.png",
                    text: "1250VA",
                },
                {
                    icon: "/livguard/icons/square wave white.png",
                    text: "स्क्वायर वेव इनवर्टर",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "275(L) X 281(W) X 145(H)",
                },
            ],
            specifications: [
                {
                    title: "मॉडल संख्या ",
                    value: "i2-वर्टर प्रो",
                },
                {
                    title: "वारंटी",
                    value: "3 वर्ष",
                },
                {
                    title: "पैकेज सामग्री",
                    value: "इनवर्टर और उपयोगकर्ता मैन्युअल",
                },
                {
                    title: "रेटिंग",
                    value: "1250VA",
                },
                {
                    title: "आयाम",
                    value: "275(L) X 281(W) X 145(H)",
                },
            ],
            features: [
                {
                    value: "मन की शांति 3 वर्ष की वारंटी के साथ",
                },
                {
                    value: "स्मार्ट ए आई चार्जिंग से युक्त इनवर्टर",
                },
                {
                    value: "अधिकतम लोड हैंडलिंग क्षमता",
                },
                {
                    value: "ओवरचार्जिंग, ओवरलोड और शॉर्ट सर्किट आदि के लिए फॉल्ट डिटेक्शन।",
                },
                {
                    value: "सभी प्रकार की बैटरी के लिए उचित",
                },
            ],
            additionalInfo: [
                {
                    title: "उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "12.02 Kg",
                },
                {
                    title: "मूल का देश",
                    value: "भारत",
                },
            ],
            productDescription: {
                description:
                    "अपने घर पर हमारे इन्वर्टर के साथ, बार-बार बिजली कटौती की समस्या को अलविदा कहें और अपनी रोज़ाना दिनचर्या को बिना रुकावट चलाने के लिए ऊर्जा के एक सहज, स्थिर प्रवाह का आनंद लें।",
                images: [
                    {
                        image: "/livguard/product/inverter/LG1950i/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG1950i/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG1950i/A+/3.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG1950i/A+/4.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGS1700",
                    imageRelativePath: "/livguard/inverter images/LGS1700.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LGS1700",
                },
                {
                    title: "LGS1600",
                    imageRelativePath: "/livguard/inverter images/LGS1600.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LGS1600",
                },
                {
                    title: "LG1550i",
                    imageRelativePath: "/livguard/inverter images/LG1550i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1550i",
                },
                {
                    title: "LG1450i",
                    imageRelativePath: "/livguard/inverter images/LG1450i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1450i",
                },
            ],
            type: ProductType.inverter,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    LGS900i: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/product/inverter/LGS900i/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/inverter/LGS900i/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/inverter/LGS900i/infographic/3.jpg",
                },
                {
                    image: "/livguard/product/inverter/LGS900i/infographic/4.jpg",
                },
            ],
            title: "Livguard i-verter pro Pure Sine Wave inverter 700 VA with 3-Year Warranty",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description: "With an assured warranty and Pure Sine Wave output, experience energy unlimited at your home with this Livguard Inverter",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "3 Year Warranty",
                },
                {
                    icon: "/livguard/icons/inverter_capacity.png",
                    text: "700 VA",
                },
                {
                    icon: "/livguard/icons/sine wave white.png",
                    text: "Pure Sine Wave Inverter ",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "275(L) X 297(W) X 123(H)",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "i-verter pro",
                },
                {
                    title: "Warranty",
                    value: "3 Years",
                },
                {
                    title: "Package Contents",
                    value: "Inverter and User Manual",
                },
                {
                    title: "Rating",
                    value: "700VA",
                },
                {
                    title: "Dimensions",
                    value: "275(L) X 297(W) X 123(H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with 3 Years of Warranty",
                },
                {
                    value: "Pure Sinewave Output",
                },
                {
                    value: "Backed with Smart Artificial Intelligent Charging",
                },
                {
                    value: "Premium New Age Design with LED Display",
                },
                {
                    value: "Supports All Battery Types",
                },
            ],
            additionalInfo: [
                {
                    title: "Manufacturer",
                    value: "Livguard",
                },
                {
                    title: "Item Weight",
                    value: "8 Kg",
                },
                {
                    title: "Country Of Origin",
                    value: "India",
                },
            ],
            productDescription: {
                description:
                    "Looking for an inverter that looks good and works even better? Your search ends here! With Livguard inverter at your home, enjoy unlimited energy backed with amazing features to power your home",
                images: [
                    {
                        image: "/livguard/product/inverter/LG950i/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG950i/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG950i/A+/3.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG950i/A+/4.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LG900",
                    imageRelativePath: "/livguard/inverter images/LG900.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG900",
                },
                {
                    title: "LGS1000i",
                    imageRelativePath: "/livguard/inverter images/LGS1000i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LGS1000i",
                },
                {
                    title: "LG1100",
                    imageRelativePath: "/livguard/inverter images/LG1100.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1100",
                },
                {
                    title: "LGS1100i",
                    imageRelativePath: "/livguard/inverter images/LGS1100i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LGS1100i",
                },
            ],
            type: ProductType.inverter,
            metadata: {
                title: "Pure Sine Wave Inverter 700VA Online - Livguard",
                description: "Get Livguard i2 - verter pro Pure Sine Wave inverter 700 VA  With a 3-year warranty and pure sine wave output. Experience energy unlimited  ",
                canonicalUrl: `/product/lgs900i`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "LGS900i",
                    "url": "https://www.livguard.com/product/LGS900i",
                    "image": "https://growthjockey.imgix.net/livguard/product/inverter/LGS900i/infographic/1.jpg?w=508",
                    "description": "",
                    "brand": {
                            "@type": "Brand",
                            "name": "Livgaurd"
                    }
            }

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/product/inverter/LGS900i/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/inverter/LGS900i/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/inverter/LGS900i/infographic/3.jpg",
                },
                {
                    image: "/livguard/product/inverter/LGS900i/infographic/4.jpg",
                },
            ],
            title: "लिवगार्ड i-वर्टर प्रो स्क्वायर वेव इन्वर्टर 700 VA 3 वर्ष की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description: "सुनिश्चित वारंटी और प्योर साइन वेव आउटपुट के साथ, हमारे लिवगार्ड इन्वर्टर के साथ अपने घर पर असीमित ऊर्जा का अनुभव करें।",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "3 वर्ष वारंटी",
                },
                {
                    icon: "/livguard/icons/inverter_capacity.png",
                    text: "700VA",
                },
                {
                    icon: "/livguard/icons/sine wave white.png",
                    text: "प्योर साइन वेव इनवर्टर",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "275(L) X 297(W) X 123(H)",
                },
            ],
            specifications: [
                {
                    title: "मॉडल संख्या ",
                    value: "i-वर्टर प्रो",
                },
                {
                    title: "वारंटी",
                    value: "3 वर्ष",
                },
                {
                    title: "पैकेज सामग्री",
                    value: "इनवर्टर और उपयोगकर्ता मैन्युअल",
                },
                {
                    title: "रेटिंग",
                    value: "700VA",
                },
                {
                    title: "आयाम",
                    value: "275(L) X 297(W) X 123(H)",
                },
            ],
            features: [
                {
                    value: "मन की शांति 3 वर्ष की वारंटी के साथ",
                },
                {
                    value: "प्योर साइन वेव ",
                },
                {
                    value: "स्मार्ट ए आई चार्जिंग से युक्त इनवर्टर",
                },
                {
                    value: "नये दौर की बनावट और LED डिस्प्ले के साथ, जो इनवर्टर के वर्तमान स्थिति दर्शाता है",
                },
                {
                    value: "सभी प्रकार की बैटरी के लिए उचित",
                },
            ],
            additionalInfo: [
                {
                    title: "उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "8 Kg",
                },
                {
                    title: "मूल का देश",
                    value: "भारत",
                },
            ],
            productDescription: {
                description:
                    "क्या आप अच्छा दिखने वाला और उससे भी बेहतर काम करने वाला इन्वर्टर ढूंढ रहे हैं? आपकी खोज यहाँ समाप्त होती है! अपने घर पर लिवगार्ड इन्वर्टर के साथ, अपने घर को सशक्त बनाने के लिए अद्भुत सुविधाओं के साथ असीमित ऊर्जा का आनंद लें।।",
                images: [
                    {
                        image: "/livguard/product/inverter/LG950i/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG950i/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG950i/A+/3.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LG950i/A+/4.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LG900",
                    imageRelativePath: "/livguard/inverter images/LG900.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG900",
                },
                {
                    title: "LGS1000i",
                    imageRelativePath: "/livguard/inverter images/LGS1000i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LGS1000i",
                },
                {
                    title: "LG1100",
                    imageRelativePath: "/livguard/inverter images/LG1100.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1100",
                },
                {
                    title: "LGS1100i",
                    imageRelativePath: "/livguard/inverter images/LGS1100i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LGS1100i",
                },
            ],
            type: ProductType.inverter,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    LGS1000i: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/product/inverter/LGS1000i/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/inverter/LGS1000i/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/inverter/LGS1000i/infographic/3.jpg",
                },
                {
                    image: "/livguard/product/inverter/LGS1000i/infographic/4.jpg",
                },
            ],
            title: "Livguard i-verter pro Pure Sine Wave inverter 800 VA with 3-Year Warranty",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description: "With an assured warranty and Pure Sine Wave output, experience energy unlimited at your home with this Livguard Inverter",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "3 Year Warranty",
                },
                {
                    icon: "/livguard/icons/inverter_capacity.png",
                    text: "800 VA",
                },
                {
                    icon: "/livguard/icons/sine wave white.png",
                    text: "Pure Sine Wave Inverter ",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "275(L) X 297(W) X 123(H)",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "i-verter pro",
                },
                {
                    title: "Warranty",
                    value: "3 Years",
                },
                {
                    title: "Package Contents",
                    value: "Inverter and User Manual",
                },
                {
                    title: "Rating",
                    value: "800VA",
                },
                {
                    title: "Dimensions",
                    value: "275(L) X 297(W) X 123(H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with 3 Years of Warranty",
                },
                {
                    value: "Pure Sinewave Output",
                },
                {
                    value: "Backed with Smart Artificial Intelligent Charging",
                },
                {
                    value: "Premium New Age Design with LED Display",
                },
                {
                    value: "Supports All Battery Types",
                },
            ],
            additionalInfo: [
                {
                    title: "Manufacturer",
                    value: "Livguard",
                },
                {
                    title: "Item Weight",
                    value: "9 Kg",
                },
                {
                    title: "Country Of Origin",
                    value: "India",
                },
            ],
            productDescription: {
                description:
                    "Looking for an inverter that looks good and works even better? Your search ends here! With Livguard inverter at your home, enjoy unlimited energy backed with amazing features to power your home",
                images: [
                    {
                        image: "/livguard/product/inverter/LGS1000i/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LGS1000i/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LGS1000i/A+/3.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LGS1000i/A+/4.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LG900",
                    imageRelativePath: "/livguard/inverter images/LG900.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG900",
                },
                {
                    title: "LG1100",
                    imageRelativePath: "/livguard/inverter images/LG1100.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1100",
                },
                {
                    title: "LGS1100i",
                    imageRelativePath: "/livguard/inverter images/LGS1100i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LGS1100i",
                },
                {
                    title: "LG1450i",
                    imageRelativePath: "/livguard/inverter images/LG1450i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1450i",
                },
            ],
            type: ProductType.inverter,
            metadata: {
                title: "Buy Pure Sine Wave inverter 800 VA - Livguard",
                description: "Buy Livguard Pure Sine Wave Inverter 800VA  with a 3-year warranty, a suitable inverter for small offices, homes, and small shops, with an assured warranty.",
                canonicalUrl: `/product/lgs1000i`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "LGS1000i",
                    "url": "https://www.livguard.com/product/LGS1000i",
                    "image": "https://growthjockey.imgix.net/livguard/product/inverter/LGS1000i/infographic/1.jpg?w=508",
                    "description": "",
                    "brand": {
                            "@type": "Brand",
                            "name": "Livgaurd"
                    }
            }

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/product/inverter/LGS1000i/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/inverter/LGS1000i/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/inverter/LGS1000i/infographic/3.jpg",
                },
                {
                    image: "/livguard/product/inverter/LGS1000i/infographic/4.jpg",
                },
            ],
            title: "लिवगार्ड i2-वर्टर प्रो स्क्वायर वेव इन्वर्टर 800 VA 3 वर्ष की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description: "सुनिश्चित वारंटी और प्योर साइन वेव आउटपुट के साथ, हमारे लिवगार्ड इन्वर्टर के साथ अपने घर पर असीमित ऊर्जा का अनुभव करें",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "3 वर्ष वारंटी",
                },
                {
                    icon: "/livguard/icons/inverter_capacity.png",
                    text: "800VA",
                },
                {
                    icon: "/livguard/icons/sine wave white.png",
                    text: "प्योर साइन वेव इनवर्टर",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "275(L) X 297(W) X 123(H)",
                },
            ],
            specifications: [
                {
                    title: "मॉडल संख्या ",
                    value: "i-वर्टर प्रो",
                },
                {
                    title: "वारंटी",
                    value: "3 वर्ष",
                },
                {
                    title: "पैकेज सामग्री",
                    value: "इनवर्टर और उपयोगकर्ता मैन्युअल",
                },
                {
                    title: "रेटिंग",
                    value: "800VA",
                },
                {
                    title: "आयाम",
                    value: "275(L) X 297(W) X 123(H)",
                },
            ],
            features: [
                {
                    value: "मन की शांति 3 वर्ष की वारंटी के साथ",
                },
                {
                    value: "प्योर साइन वेव ",
                },
                {
                    value: "स्मार्ट ए आई चार्जिंग से युक्त इनवर्टर",
                },
                {
                    value: "नये दौर की बनावट और LED डिस्प्ले के साथ, जो इनवर्टर के वर्तमान स्थिति दर्शाता है",
                },
                {
                    value: "सभी प्रकार की बैटरी के लिए उचित",
                },
            ],
            additionalInfo: [
                {
                    title: "उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "9 Kg",
                },
                {
                    title: "मूल का देश",
                    value: "भारत",
                },
            ],
            productDescription: {
                description:
                    "क्या आप अच्छा दिखने वाला और उससे भी बेहतर काम करने वाला इन्वर्टर ढूंढ रहे हैं? आपकी खोज यहाँ समाप्त होती है! अपने घर पर लिवगार्ड इन्वर्टर के साथ, अपने घर को सशक्त बनाने के लिए अद्भुत सुविधाओं के साथ असीमित ऊर्जा का आनंद लें।।",
                images: [
                    {
                        image: "/livguard/product/inverter/LGS1000i/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LGS1000i/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LGS1000i/A+/3.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LGS1000i/A+/4.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LG900",
                    imageRelativePath: "/livguard/inverter images/LG900.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG900",
                },
                {
                    title: "LG1100",
                    imageRelativePath: "/livguard/inverter images/LG1100.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1100",
                },
                {
                    title: "LGS1100i",
                    imageRelativePath: "/livguard/inverter images/LGS1100i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LGS1100i",
                },
                {
                    title: "LG1450i",
                    imageRelativePath: "/livguard/inverter images/LG1450i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1450i",
                },
            ],
            type: ProductType.inverter,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    LGS1100i: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/product/inverter/LGS1100i/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/inverter/LGS1100i/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/inverter/LGS1100i/infographic/3.jpg",
                },
                {
                    image: "/livguard/product/inverter/LGS1100i/infographic/4.jpg",
                },
            ],
            title: "Livguard i-verter pro Pure Sine Wave inverter 900 VA with 3-Year Warranty",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description: "With an assured warranty and Pure Sine Wave output, experience energy unlimited at your home with this Livguard Inverter",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "3 Year Warranty",
                },
                {
                    icon: "/livguard/icons/inverter_capacity.png",
                    text: "900 VA",
                },
                {
                    icon: "/livguard/icons/sine wave white.png",
                    text: "Pure Sine Wave Inverter ",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "275(L) X 297(W) X 123(H)",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "i-verter pro",
                },
                {
                    title: "Warranty",
                    value: "3 Years",
                },
                {
                    title: "Package Contents",
                    value: "Inverter and User Manual",
                },
                {
                    title: "Rating",
                    value: "900VA",
                },
                {
                    title: "Dimensions",
                    value: "275(L) X 297(W) X 123(H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with 3 Years of Warranty",
                },
                {
                    value: "Pure Sinewave Output",
                },
                {
                    value: "Backed with Smart Artificial Intelligent Charging",
                },
                {
                    value: "Premium New Age Design with LED Display",
                },
                {
                    value: "Supports All Battery Types",
                },
            ],
            additionalInfo: [
                {
                    title: "Manufacturer",
                    value: "Livguard",
                },
                {
                    title: "Item Weight",
                    value: "10 Kg",
                },
                {
                    title: "Country Of Origin",
                    value: "India",
                },
            ],
            productDescription: {
                description:
                    "Looking for an inverter that looks good and works even better? Your search ends here! With Livguard inverter at your home, enjoy unlimited energy backed with amazing features to power your home",
                images: [
                    {
                        image: "/livguard/product/inverter/LGS1100i/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LGS1100i/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LGS1100i/A+/3.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LGS1100i/A+/4.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LG1100",
                    imageRelativePath: "/livguard/inverter images/LG1100.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1100",
                },
                {
                    title: "LG1450i",
                    imageRelativePath: "/livguard/inverter images/LG1450i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1450i",
                },
                {
                    title: "LG1550i",
                    imageRelativePath: "/livguard/inverter images/LG1550i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1550i",
                },
                {
                    title: "LGS1600",
                    imageRelativePath: "/livguard/inverter images/LGS1600.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LGS1600",
                },
            ],
            type: ProductType.inverter,
            metadata: {
                title: "Livguard Pure Sine Wave inverter 900 VA Online",
                description: " Get Livguard Sine Wave inverter 900 VA, suitable for small offices, homes, and small shops. Comes with extra load handling capacity and supports all battery types",
                canonicalUrl: `/product/lgs1100i`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "LGS1100i",
                    "url": "https://www.livguard.com/product/LGS1100i",
                    "image": "https://growthjockey.imgix.net/livguard/product/inverter/LGS1100i/infographic/1.jpg?w=508",
                    "description": "",
                    "brand": {
                            "@type": "Brand",
                            "name": "Livgaurd"
                    }
            }

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/product/inverter/LGS1100i/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/inverter/LGS1100i/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/inverter/LGS1100i/infographic/3.jpg",
                },
                {
                    image: "/livguard/product/inverter/LGS1100i/infographic/4.jpg",
                },
            ],
            title: "लिवगार्ड i-वर्टर प्रो स्क्वायर वेव इन्वर्टर 900 VA 3 वर्ष की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description: "सुनिश्चित वारंटी और प्योर साइन वेव आउटपुट के साथ, हमारे लिवगार्ड इन्वर्टर के साथ अपने घर पर असीमित ऊर्जा का अनुभव करें",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "3 वर्ष वारंटी",
                },
                {
                    icon: "/livguard/icons/inverter_capacity.png",
                    text: "900VA",
                },
                {
                    icon: "/livguard/icons/sine wave white.png",
                    text: "प्योर साइन वेव इनवर्टर",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "275(L) X 297(W) X 123(H)",
                },
            ],
            specifications: [
                {
                    title: "मॉडल संख्या ",
                    value: "i-वर्टर प्रो",
                },
                {
                    title: "वारंटी",
                    value: "3 वर्ष",
                },
                {
                    title: "पैकेज सामग्री",
                    value: "इनवर्टर और उपयोगकर्ता मैन्युअल",
                },
                {
                    title: "रेटिंग",
                    value: "900VA",
                },
                {
                    title: "आयाम",
                    value: "275(L) X 297(W) X 123(H)",
                },
            ],
            features: [
                {
                    value: "मन की शांति 3 वर्ष की वारंटी के साथ",
                },
                {
                    value: "प्योर साइन वेव ",
                },
                {
                    value: "स्मार्ट ए आई चार्जिंग से युक्त इनवर्टर",
                },
                {
                    value: "नये दौर की बनावट और LED डिस्प्ले के साथ, जो इनवर्टर के वर्तमान स्थिति दर्शाता है",
                },
                {
                    value: "सभी प्रकार की बैटरी के लिए उचित",
                },
            ],
            additionalInfo: [
                {
                    title: "उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "10 Kg",
                },
                {
                    title: "मूल का देश",
                    value: "भारत",
                },
            ],
            productDescription: {
                description:
                    "क्या आप अच्छा दिखने वाला और उससे भी बेहतर काम करने वाला इन्वर्टर ढूंढ रहे हैं? आपकी खोज यहाँ समाप्त होती है! अपने घर पर लिवगार्ड इन्वर्टर के साथ, अपने घर को सशक्त बनाने के लिए अद्भुत सुविधाओं के साथ असीमित ऊर्जा का आनंद लें।।",
                images: [
                    {
                        image: "/livguard/product/inverter/LGS1100i/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LGS1100i/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LGS1100i/A+/3.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LGS1100i/A+/4.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LG1100",
                    imageRelativePath: "/livguard/inverter images/LG1100.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1100",
                },
                {
                    title: "LG1450i",
                    imageRelativePath: "/livguard/inverter images/LG1450i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1450i",
                },
                {
                    title: "LG1550i",
                    imageRelativePath: "/livguard/inverter images/LG1550i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1550i",
                },
                {
                    title: "LGS1600",
                    imageRelativePath: "/livguard/inverter images/LGS1600.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LGS1600",
                },
            ],
            type: ProductType.inverter,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    LGS1700: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/product/inverter/LGS1700/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/inverter/LGS1700/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/inverter/LGS1700/infographic/3.jpg",
                },
                {
                    image: "/livguard/product/inverter/LGS1700/infographic/4.jpg",
                },
            ],
            title: "Livguard i-verter pro Pure Sine Wave inverter 1500 VA with 3-Year Warranty",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description: "With an assured warranty and Pure Sine Wave output, experience energy unlimited at your home with this Livguard Inverter",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "3 Year Warranty",
                },
                {
                    icon: "/livguard/icons/inverter_capacity.png",
                    text: "1500 VA",
                },
                {
                    icon: "/livguard/icons/sine wave white.png",
                    text: "Pure Sine Wave Inverter ",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "275(L) X 318(W) X 143(H)",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "i-verter pro",
                },
                {
                    title: "Warranty",
                    value: "3 Years",
                },
                {
                    title: "Package Contents",
                    value: "Inverter and User Manual",
                },
                {
                    title: "Rating",
                    value: "1500VA",
                },
                {
                    title: "Dimensions",
                    value: "275(L) X 318(W) X 143(H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with 3 Years of Warranty",
                },
                {
                    value: "Pure Sinewave Output",
                },
                {
                    value: "Backed with Smart Artificial Intelligent Charging",
                },
                {
                    value: "Extra Load Handling capacity",
                },
                {
                    value: "Supports All Battery Types",
                },
            ],
            additionalInfo: [
                {
                    title: "Manufacturer",
                    value: "Livguard",
                },
                {
                    title: "Item Weight",
                    value: "13.36 Kg",
                },
                {
                    title: "Country Of Origin",
                    value: "India",
                },
            ],
            productDescription: {
                description:
                    "Looking for an inverter that looks good and works even better? Your search ends here! With Livguard inverter at your home, enjoy unlimited energy backed with amazing features to power your home",
                images: [
                    {
                        image: "/livguard/product/inverter/LGS1700/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LGS1700/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LGS1700/A+/3.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LGS1700/A+/4.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LG1950i",
                    imageRelativePath: "/livguard/inverter images/LG1950i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1950i",
                },
                {
                    title: "LGS1600",
                    imageRelativePath: "/livguard/inverter images/LGS1600.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LGS1600",
                },
                {
                    title: "LG1550i",
                    imageRelativePath: "/livguard/inverter images/LG1550i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1550i",
                },
                {
                    title: "LG1450i",
                    imageRelativePath: "/livguard/inverter images/LG1450i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1450i",
                },
            ],
            type: ProductType.inverter,
            metadata: {
                title: "Pure Sine Wave Inverter 1500 VA - Livguard Online",
                description: "Buy Livguard i-verter pro with an assured warranty and Pure Sine Wave output. Backed with smart artificial intelligent charging",
                canonicalUrl: `/product/lgs1700`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "LGS1700",
                    "url": "https://www.livguard.com/product/LGS1700",
                    "image": "https://growthjockey.imgix.net/livguard/product/inverter/LGS1700/infographic/1.jpg?w=508",
                    "description": "",
                    "brand": {
                            "@type": "Brand",
                            "name": "Livgaurd"
                    }
            }

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/product/inverter/LGS1700/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/inverter/LGS1700/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/inverter/LGS1700/infographic/3.jpg",
                },
                {
                    image: "/livguard/product/inverter/LGS1700/infographic/4.jpg",
                },
            ],
            title: "लिवगार्ड i-वर्टर प्रो स्क्वायर वेव इन्वर्टर 1500 VA 3 वर्ष की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description: "सुनिश्चित वारंटी और प्योर साइन वेव आउटपुट के साथ, हमारे लिवगार्ड इन्वर्टर के साथ अपने घर पर असीमित ऊर्जा का अनुभव करें",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "3 वर्ष वारंटी",
                },
                {
                    icon: "/livguard/icons/inverter_capacity.png",
                    text: "1500VA",
                },
                {
                    icon: "/livguard/icons/sine wave white.png",
                    text: "प्योर साइन वेव इनवर्टर",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "275(L) X 318(W) X 143(H)",
                },
            ],
            specifications: [
                {
                    title: "मॉडल संख्या ",
                    value: "i-वर्टर प्रो",
                },
                {
                    title: "वारंटी",
                    value: "3 वर्ष",
                },
                {
                    title: "पैकेज सामग्री",
                    value: "इनवर्टर और उपयोगकर्ता मैन्युअल",
                },
                {
                    title: "रेटिंग",
                    value: "1500VA",
                },
                {
                    title: "आयाम",
                    value: "275(L) X 318(W) X 143(H)",
                },
            ],
            features: [
                {
                    value: "मन की शांति 3 वर्ष की वारंटी के साथ",
                },
                {
                    value: "प्योर साइन वेव ",
                },
                {
                    value: "स्मार्ट ए आई चार्जिंग से युक्त इनवर्टर",
                },
                {
                    value: "अधिकतम लोड हैंडलिंग क्षमता",
                },
                {
                    value: "सभी प्रकार की बैटरी के लिए उचित",
                },
            ],
            additionalInfo: [
                {
                    title: "उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "13.36 Kg",
                },
                {
                    title: "मूल का देश",
                    value: "भारत",
                },
            ],
            productDescription: {
                description:
                    "क्या आप अच्छा दिखने वाला और उससे भी बेहतर काम करने वाला इन्वर्टर ढूंढ रहे हैं? आपकी खोज यहाँ समाप्त होती है! अपने घर पर लिवगार्ड इन्वर्टर के साथ, अपने घर को सशक्त बनाने के लिए अद्भुत सुविधाओं के साथ असीमित ऊर्जा का आनंद लें।।",
                images: [
                    {
                        image: "/livguard/product/inverter/LGS1700/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LGS1700/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LGS1700/A+/3.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LGS1700/A+/4.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LG1950i",
                    imageRelativePath: "/livguard/inverter images/LG1950i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1950i",
                },
                {
                    title: "LGS1600",
                    imageRelativePath: "/livguard/inverter images/LGS1600.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LGS1600",
                },
                {
                    title: "LG1550i",
                    imageRelativePath: "/livguard/inverter images/LG1550i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1550i",
                },
                {
                    title: "LG1450i",
                    imageRelativePath: "/livguard/inverter images/LG1450i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1450i",
                },
            ],
            type: ProductType.inverter,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    LGS1600: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/product/inverter/LGS1600/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/inverter/LGS1600/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/inverter/LGS1600/infographic/3.jpg",
                },
                {
                    image: "/livguard/product/inverter/LGS1600/infographic/4.jpg",
                },
            ],
            title: "Livguard i-verter pro Pure Sine Wave inverter 1500 VA with 3-Year Warranty",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description: "With an assured warranty and Pure Sine Wave output, experience energy unlimited at your home with this Livguard Inverter",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "3 Year Warranty",
                },
                {
                    icon: "/livguard/icons/inverter_capacity.png",
                    text: "1500 VA",
                },
                {
                    icon: "/livguard/icons/sine wave white.png",
                    text: "Pure Sine Wave Inverter ",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "275(L) X 318(W) X 143(H)",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "i-verter pro",
                },
                {
                    title: "Warranty",
                    value: "3 Years",
                },
                {
                    title: "Package Contents",
                    value: "Inverter and User Manual",
                },
                {
                    title: "Rating",
                    value: "1500VA",
                },
                {
                    title: "Dimensions",
                    value: "275(L) X 318(W) X 143(H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with 3 Years of Warranty",
                },
                {
                    value: "Pure Sinewave Output",
                },
                {
                    value: "Backed with Smart Artificial Intelligent Charging",
                },
                {
                    value: "Extra Load Handling capacity",
                },
                {
                    value: "Supports All Battery Types",
                },
            ],
            additionalInfo: [
                {
                    title: "Manufacturer",
                    value: "Livguard",
                },
                {
                    title: "Item Weight",
                    value: "14.2 Kg",
                },
                {
                    title: "Country Of Origin",
                    value: "India",
                },
            ],
            productDescription: {
                description:
                    "Looking for an inverter that looks good and works even better? Your search ends here! With Livguard inverter at your home, enjoy unlimited energy backed with amazing features to power your home",
                images: [
                    {
                        image: "/livguard/product/inverter/LGS900i/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LGS900i/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LGS900i/A+/3.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LGS900i/A+/4.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGS1700",
                    imageRelativePath: "/livguard/inverter images/LGS1700.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LGS1700",
                },
                {
                    title: "LG1950i",
                    imageRelativePath: "/livguard/inverter images/LG1950i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1950i",
                },
                {
                    title: "LG1550i",
                    imageRelativePath: "/livguard/inverter images/LG1550i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1550i",
                },
                {
                    title: "LG1450i",
                    imageRelativePath: "/livguard/inverter images/LG1450i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1450i",
                },
            ],
            type: ProductType.inverter,
            metadata: {
                title: "Livguard i-verter pro Pure Sine Wave inverter with 3-Year warranty",
                description: "Get Livguard i-verter pro pure sine wave inverter 1500 VA with a 3-year warranty.   Suitable inverter for small offices, homes, and small shops. ",
                canonicalUrl: `/product/lgs1600`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "LGS1600",
                    "url": "https://www.livguard.com/product/LGS1600",
                    "image": "https://growthjockey.imgix.net/livguard/product/inverter/LGS1600/infographic/1.jpg?w=508",
                    "description": "",
                    "brand": {
                            "@type": "Brand",
                            "name": "Livgaurd"
                    }
            }


                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/product/inverter/LGS900i/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/inverter/LGS900i/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/inverter/LGS900i/infographic/3.jpg",
                },
                {
                    image: "/livguard/product/inverter/LGS900i/infographic/4.jpg",
                },
            ],
            title: "लिवगार्ड i-वर्टर प्रो स्क्वायर वेव इन्वर्टर 1500 VA 3 वर्ष की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description: "सुनिश्चित वारंटी और प्योर साइन वेव आउटपुट के साथ, हमारे लिवगार्ड इन्वर्टर के साथ अपने घर पर असीमित ऊर्जा का अनुभव करें",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "3 वर्ष वारंटी",
                },
                {
                    icon: "/livguard/icons/inverter_capacity.png",
                    text: "1500VA",
                },
                {
                    icon: "/livguard/icons/sine wave white.png",
                    text: "प्योर साइन वेव इनवर्टर",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "275(L) X 318(W) X 143(H)",
                },
            ],
            specifications: [
                {
                    title: "मॉडल संख्या ",
                    value: "i-वर्टर प्रो",
                },
                {
                    title: "वारंटी",
                    value: "3 वर्ष",
                },
                {
                    title: "पैकेज सामग्री",
                    value: "इनवर्टर और उपयोगकर्ता मैन्युअल",
                },
                {
                    title: "रेटिंग",
                    value: "1500VA",
                },
                {
                    title: "आयाम",
                    value: "275(L) X 318(W) X 143(H)",
                },
            ],
            features: [
                {
                    value: "मन की शांति 3 वर्ष की वारंटी के साथ",
                },
                {
                    value: "प्योर साइन वेव ",
                },
                {
                    value: "स्मार्ट ए आई चार्जिंग से युक्त इनवर्टर",
                },
                {
                    value: "अधिकतम लोड हैंडलिंग क्षमता",
                },
                {
                    value: "सभी प्रकार की बैटरी के लिए उचित",
                },
            ],
            additionalInfo: [
                {
                    title: "उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "14.2 Kg",
                },
                {
                    title: "मूल का देश",
                    value: "भारत",
                },
            ],
            productDescription: {
                description:
                    "क्या आप अच्छा दिखने वाला और उससे भी बेहतर काम करने वाला इन्वर्टर ढूंढ रहे हैं? आपकी खोज यहाँ समाप्त होती है! अपने घर पर लिवगार्ड इन्वर्टर के साथ, अपने घर को सशक्त बनाने के लिए अद्भुत सुविधाओं के साथ असीमित ऊर्जा का आनंद लें।।",
                images: [
                    {
                        image: "/livguard/product/inverter/LGS900i/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LGS900i/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LGS900i/A+/3.jpg",
                    },
                    {
                        image: "/livguard/product/inverter/LGS900i/A+/4.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGS1700",
                    imageRelativePath: "/livguard/inverter images/LGS1700.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LGS1700",
                },
                {
                    title: "LG1950i",
                    imageRelativePath: "/livguard/inverter images/LG1950i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1950i",
                },
                {
                    title: "LG1550i",
                    imageRelativePath: "/livguard/inverter images/LG1550i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1550i",
                },
                {
                    title: "LG1450i",
                    imageRelativePath: "/livguard/inverter images/LG1450i.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG1450i",
                },
            ],
            type: ProductType.inverter,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    IT9048ST: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -9048ST/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -9048ST/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -9048ST/infographic/3.jpg",
                },
            ],
            title: " Livguard INVERTUFF Short Tubular 90 Ah Battery with 24+24* Months Warranty",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "24 + 24* Months Warranty",
                },
                {
                    icon: "livguard/icons/inverter_capacity.png",
                    text: "90 Ah",
                },
                {
                    icon: "/livguard/icons/sine wave white.png",
                    text: "Short Tubular",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "410 (L) X 174 (W) X 230 (H)",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "INVERTUFF",
                },
                {
                    title: "Warranty",
                    value: "24 + 24* Months",
                },
                {
                    title: "Package Contents",
                    value: "Inverter Battery, Warranty card, Float Indicator, Petroleum Jelly, Nut bolt set",
                },
                {
                    title: "Rating",
                    value: "90 Ah",
                },
                {
                    title: "Dimensions",
                    value: "410 (L) X 174 (W) X 230 (H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with Best-In-Class Warranty",
                },
                {
                    value: "Long Lasting Battery Life for an unlimited flow of energy ",
                },
                {
                    value: "Tuff Futuristic Design to complement the aesthetics of your home",
                },
                {
                    value: "High Charge Acceptance For Higher Backup",
                },
                {
                    value: "Low Maintenance for an effortless experience",
                },
            ],
            additionalInfo: [
                {
                    title: "Manufacturer",
                    value: "Livguard",
                },
                {
                    title: "Item Weight",
                    value: "29.3 ± 3% Kg",
                },
                {
                    title: "Country Of Origin",
                    value: "India",
                },
            ],
            productDescription: {
                description:
                    "With our Livguard battery at your home, experience what limitless energy feels like. Built with a 3D grid design and high storage capacity, Livguard inverter batteries deliver satisfactory performance every time, with long and durable battery life",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -9048ST/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -9048ST/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -9048ST/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1048ST",
                    imageRelativePath: "/livguard/battery images/IT 1048ST.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1048ST",
                },
                {
                    title: "IT1584TT",
                    imageRelativePath: "/livguard/battery images/IT 1584TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1584TT",
                },
                {
                    title: "IT1554STJ",
                    imageRelativePath: "/livguard/battery images/IT 1554STJ.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1554STJ",
                },
                {
                    title: "IT1542STJ",
                    imageRelativePath: "/livguard/battery images/IT 1542STJ.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1542STJ",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "Livguard INVERTUFF Short Tubular 90 Ah Online",
                description: "Get an INVERTUFF Short Tubular 90 Ah inverter battery online from Livguard with a 24+24* warranty; ideal for households, small businesses, and workplaces.",
                canonicalUrl: `/product/it9048st`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "IT9048ST",
                    "url": "https://www.livguard.com/product/IT9048ST",
                    "image": "https://growthjockey.imgix.net/livguard/battery%20images/IT%209048ST.png?w=508",
                    "description": "",
                    "brand": {
                            "@type": "Brand",
                            "name": "Livgaurd"
                    }
            }

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery  9048ST/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery  9048ST/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery  9048ST/infographic/3.jpg",
                },
            ],
            title: "लिवगार्ड INVERTUFF शोर्ट ट्यूबुलर 90 Ah बैटरी 24+24* महीने की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "24 + 24* महीने वारंटी",
                },
                {
                    icon: "livguard/icons/inverter_capacity.png",
                    text: "90 Ah",
                },
                {
                    icon: "/livguard/icons/sine wave white.png",
                    text: "शोर्ट ट्यूबलर ",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "410 (L) X 174 (W) X 230 (H)",
                },
            ],
            specifications: [
                {
                    title: "मॉडल संख्या",
                    value: "INVERTUFF",
                },
                {
                    title: "वारंटी ",
                    value: "24 + 24* महीने",
                },
                {
                    title: "पैकेज सामग्री",
                    value: "इन्वर्टर बैटरी, वारंटी कार्ड, फ्लोट इंडिकेटर, पेट्रोलियम जेली, नट बोल्ट सेट",
                },
                {
                    title: "रेटिंग",
                    value: "90 Ah",
                },
                {
                    title: "आयाम",
                    value: "410 (L) X 174 (W) X 230 (H)",
                },
            ],
            features: [
                {
                    value: "मन की शांति सर्वोत्तम वारंटी वारंटी के साथ",
                },
                {
                    value: "ऊर्जा के असीमित प्रवाह के लिए लंबे समय तक चलने वाली बैटरी लाइफ़",
                },
                {
                    value: "आधुनिक Tuff बनावट जो आपके घर की सुंदरता को भी बढ़ाये",
                },
                {
                    value: "उच्च बैकअप के लिए उच्च शुल्क स्वीकृति",
                },
                {
                    value: "सहज अनुभव के लिए कम मेंटेनेंस",
                },
            ],
            additionalInfo: [
                {
                    title: " उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "29.3 ± 3%",
                },
                {
                    title: "मूल का देश ",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery  9048ST/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery  9048ST/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery  9048ST/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1048ST",
                    imageRelativePath: "/livguard/battery images/IT 1048ST.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1048ST",
                },
                {
                    title: "IT1584TT",
                    imageRelativePath: "/livguard/battery images/IT 1584TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1584TT",
                },
                {
                    title: "IT1554STJ",
                    imageRelativePath: "/livguard/battery images/IT 1554STJ.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1554STJ",
                },
                {
                    title: "IT1542STJ",
                    imageRelativePath: "/livguard/battery images/IT 1542STJ.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1542STJ",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    IT1048ST: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -1048ST/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1048ST/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1048ST/infographic/3.jpg",
                },
            ],
            title: "Livguard INVERTUFF Short Tubular 100 Ah Battery with 24+24* Months Warranty",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "24 + 24* Months Warranty",
                },
                {
                    icon: "livguard/icons/inverter_capacity.png",
                    text: "100 Ah",
                },
                {
                    icon: "/livguard/icons/sine wave white.png",
                    text: "Short Tubular",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "520 (L) X 218 (W) X 290 (H)",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "INVERTUFF",
                },
                {
                    title: "Warranty",
                    value: "24 + 24* Months",
                },
                {
                    title: "Package Contents",
                    value: "Inverter Battery, Warranty card, Float Indicator, Petroleum Jelly, Nut bolt set",
                },
                {
                    title: "Rating",
                    value: "100 Ah",
                },
                {
                    title: "Dimensions",
                    value: "520 (L) X 218 (W) X 290 (H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with Best-In-Class Warranty",
                },
                {
                    value: "Long Lasting Battery Life for an unlimited flow of energy ",
                },
                {
                    value: "Tuff Futuristic Design to complement the aesthetics of your home",
                },
                {
                    value: "High Charge Acceptance For Higher Backup",
                },
                {
                    value: "Low Maintenance for an effortless experience",
                },
            ],
            additionalInfo: [
                {
                    title: "Manufacturer",
                    value: "Livguard",
                },
                {
                    title: "Item Weight",
                    value: "39.6 ± 3%",
                },
                {
                    title: "Country Of Origin",
                    value: "India",
                },
            ],
            productDescription: {
                description:
                    "With our Livguard battery at your home, experience what limitless energy feels like. Built with a 3D grid design and high storage capacity, Livguard inverter batteries deliver satisfactory performance every time, with long and durable battery life",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -1048ST/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1048ST/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1048ST/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1584TT",
                    imageRelativePath: "/livguard/battery images/IT 1584TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1584TT",
                },
                {
                    title: "IT1554STJ",
                    imageRelativePath: "/livguard/battery images/IT 1554STJ.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1554STJ",
                },
                {
                    title: "IT1542STJ",
                    imageRelativePath: "/livguard/battery images/IT 1542STJ.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1542STJ",
                },
                {
                    title: "IT1548TT",
                    imageRelativePath: "/livguard/battery images/IT 1548TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1548TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "Short Tubular 100 Ah Battery Online- Livguard",
                description: "Enjoy constant electric power with a 100 Ah INVERTUFF Short Tubular Battery from Livguard with a 24+24* warranty. It's great for homes, offices, and small companies",
                canonicalUrl: `/product/it1048st`,
                schema: `

{
    "@context": "http://schema.org",
    "@type": "Product",
    "name": "IT1048ST",
    "url": "https://www.livguard.com/product/IT1048ST",
    "image": "https://growthjockey.imgix.net/livguard/battery%20images/IT%201048ST.png?w=508",
    "description": "",
    "brand": {
            "@type": "Brand",
            "name": "Livgaurd"
    }
}



                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -1048ST/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1048ST/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1048ST/infographic/3.jpg",
                },
            ],
            title: "लिवगार्ड INVERTUFF शोर्ट ट्यूबुलर 100 Ah बैटरी 24+24* महीने की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "24 + 24* महीने वारंटी",
                },
                {
                    icon: "livguard/icons/battery_capacity.png",
                    text: "100 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "शोर्ट ट्यूबलर ",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "520 (L) X 218 (W) X 290 (H)",
                },
            ],
            specifications: [
                {
                    title: "मॉडल संख्या",
                    value: "INVERTUFF",
                },
                {
                    title: "वारंटी ",
                    value: "24 + 24* महीने",
                },
                {
                    title: "पैकेज सामग्री",
                    value: "इन्वर्टर बैटरी, वारंटी कार्ड, फ्लोट इंडिकेटर, पेट्रोलियम जेली, नट बोल्ट सेट",
                },
                {
                    title: "रेटिंग",
                    value: "100 Ah",
                },
                {
                    title: "आयाम",
                    value: "520 (L) X 218 (W) X 290 (H)",
                },
            ],
            features: [
                {
                    value: "मन की शांति सर्वोत्तम वारंटी वारंटी के साथ",
                },
                {
                    value: "ऊर्जा के असीमित प्रवाह के लिए लंबे समय तक चलने वाली बैटरी लाइफ़",
                },
                {
                    value: "आधुनिक Tuff बनावट जो आपके घर की सुंदरता को भी बढ़ाये",
                },
                {
                    value: "उच्च बैकअप के लिए उच्च शुल्क स्वीकृति",
                },
                {
                    value: "सहज अनुभव के लिए कम मेंटेनेंस",
                },
            ],
            additionalInfo: [
                {
                    title: " उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "39.6 ± 3%",
                },
                {
                    title: "मूल का देश ",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -1048ST/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1048ST/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1048ST/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1584TT",
                    imageRelativePath: "/livguard/battery images/IT 1584TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1584TT",
                },
                {
                    title: "IT1554STJ",
                    imageRelativePath: "/livguard/battery images/IT 1554STJ.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1554STJ",
                },
                {
                    title: "IT1542STJ",
                    imageRelativePath: "/livguard/battery images/IT 1542STJ.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1542STJ",
                },
                {
                    title: "IT1548TT",
                    imageRelativePath: "/livguard/battery images/IT 1548TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1548TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    IT1160STT: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -1160STT/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1160STT/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1160STT/infographic/3.jpg",
                },
            ],
            title: " Livguard INVERTUFF Short Tall Tubular 110 Ah Battery with 42+18* Months Warranty",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "42 + 18* Months Warranty",
                },
                {
                    icon: "livguard/icons/battery_capacity.png",
                    text: "110 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "Short Tall Tubular",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "505 (L) X 188 (W) X 367 (H)",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "INVERTUFF",
                },
                {
                    title: "Warranty",
                    value: "42 + 18* Months",
                },
                {
                    title: "Package Contents",
                    value: "Inverter Battery, Warranty card, Float Indicator, Petroleum Jelly, Nut bolt set",
                },
                {
                    title: "Rating",
                    value: "110 Ah",
                },
                {
                    title: "Dimensions",
                    value: "505 (L) X 188 (W) X 367 (H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with Best-In-Class Warranty",
                },
                {
                    value: "Long Lasting Battery Life for an unlimited flow of energy ",
                },
                {
                    value: "Tuff Futuristic Design to complement the aesthetics of your home",
                },
                {
                    value: "High Charge Acceptance For Higher Backup",
                },
                {
                    value: "Low Maintenance for an effortless experience",
                },
            ],
            additionalInfo: [
                {
                    title: "Manufacturer",
                    value: "Livguard",
                },
                {
                    title: "Item Weight",
                    value: "46.9 ± 3%",
                },
                {
                    title: "Country Of Origin",
                    value: "India",
                },
            ],
            productDescription: {
                description:
                    "With our Livguard battery at your home, experience what limitless energy feels like. Built with a 3D grid design and high storage capacity, Livguard inverter batteries deliver satisfactory performance every time, with long and durable battery life",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -1160STT/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1160STT/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1160STT/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LG1150i",
                    imageRelativePath: "/livguard/inverter images/Inverter-power-verter-SQ_R.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/LG1150i",
                },
                {
                    title: "LG950i",
                    imageRelativePath: "/livguard/inverter images/LGS1700PV-SW_.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG950i",
                },
                {
                    title: "LGS1000i",
                    imageRelativePath: "/livguard/inverter images/FDS_LGS3000.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LGS1000i",
                },
                {
                    title: "LGS1100i",
                    imageRelativePath: "/livguard/inverter images/Livguard-LGS1100iPV_power-verter-Inverter-Front.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/LGS1100i",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "Livguard INVERTUFF with 60-month warranty - Check Now",
                description: "Get an INVERTUFF Short Tall Tubular 110 Ah Battery from Livguard with a 42+18* month warranty. Enjoy a constant electricity supply for long periods of time.",
                canonicalUrl: `/product/it1160stt`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "IT1160STT",
                    "url": "https://www.livguard.com/product/IT1160STT",
                    "image": "https://growthjockey.imgix.net/livguard/battery%20images/IT%201160ST.png?w=508",
                    "description": "",
                    "brand": {
                            "@type": "Brand",
                            "name": "Livgaurd"
                    }
            }


                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -1160STT/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1160STT/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1160STT/infographic/3.jpg",
                },
            ],
            title: "लिवगार्ड INVERTUFF शोर्ट टॉल ट्यूबुलर 110 Ah बैटरी 42+18* महीने की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "42 + 18* महीने वारंटी",
                },
                {
                    icon: "livguard/icons/battery_capacity.png",
                    text: "110 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "शोर्ट टॉल ट्यूबलर  ",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "505 (L) X 188 (W) X 367 (H)",
                },
            ],
            specifications: [
                {
                    title: "मॉडल संख्या",
                    value: "INVERTUFF",
                },
                {
                    title: "वारंटी ",
                    value: "48 + 18* महीने",
                },
                {
                    title: "पैकेज सामग्री",
                    value: "इन्वर्टर बैटरी, वारंटी कार्ड, फ्लोट इंडिकेटर, पेट्रोलियम जेली, नट बोल्ट सेट",
                },
                {
                    title: "रेटिंग",
                    value: "110 Ah",
                },
                {
                    title: "आयाम",
                    value: "505 (L) X 188 (W) X 367 (H)",
                },
            ],
            features: [
                {
                    value: "मन की शांति सर्वोत्तम वारंटी वारंटी के साथ",
                },
                {
                    value: "ऊर्जा के असीमित प्रवाह के लिए लंबे समय तक चलने वाली बैटरी लाइफ़",
                },
                {
                    value: "आधुनिक Tuff बनावट जो आपके घर की सुंदरता को भी बढ़ाये",
                },
                {
                    value: "उच्च बैकअप के लिए उच्च शुल्क स्वीकृति",
                },
                {
                    value: "सहज अनुभव के लिए कम मेंटेनेंस",
                },
            ],
            additionalInfo: [
                {
                    title: "उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "46.9 ± 3%",
                },
                {
                    title: "मूल का देश ",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -1160STT/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1160STT/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1160STT/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LG1150i",
                    imageRelativePath: "/livguard/inverter images/Inverter-power-verter-SQ_R.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/LG1150i",
                },
                {
                    title: "LG950i",
                    imageRelativePath: "/livguard/inverter images/LGS1700PV-SW_.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LG950i",
                },
                {
                    title: "LGS1000i",
                    imageRelativePath: "/livguard/inverter images/FDS_LGS3000.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/LGS1000i",
                },
                {
                    title: "LGS1100i",
                    imageRelativePath: "/livguard/inverter images/Livguard-LGS1100iPV_power-verter-Inverter-Front.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/LGS1100i",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    IT1584TT: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -1584TT/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1584TT/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1584TT/infographic/3.jpg",
                },
            ],
            title: " Livguard INVERTUFF Tall Tubular 150 Ah Battery with 60+24* Months Warranty",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "60 + 24* Months Warranty",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "150 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "Tall Tubular",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "INVERTUFF",
                },
                {
                    title: "Warranty",
                    value: "60 + 24* Months",
                },
                {
                    title: "Package Contents",
                    value: "Inverter Battery, Warranty card, Float Indicator, Petroleum Jelly, Nut bolt set",
                },
                {
                    title: "Rating",
                    value: "150 Ah",
                },
                {
                    title: "Dimensions",
                    value: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with Best-In-Class Warranty",
                },
                {
                    value: "Long Lasting Battery Life for an unlimited flow of energy ",
                },
                {
                    value: "Tuff Futuristic Design to complement the aesthetics of your home",
                },
                {
                    value: "High Charge Acceptance For Higher Backup",
                },
                {
                    value: "Low Maintenance for an effortless experience",
                },
            ],
            additionalInfo: [
                {
                    title: "Manufacturer",
                    value: "Livguard",
                },
                {
                    title: "Item Weight",
                    value: "54.2 ± 3%",
                },
                {
                    title: "Country Of Origin",
                    value: "India",
                },
            ],
            productDescription: {
                description:
                    "With our Livguard battery at your home, experience what limitless energy feels like. Built with a 3D grid design and high storage capacity, Livguard inverter batteries deliver satisfactory performance every time, with long and durable battery life",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -1584TT/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1584TT/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1584TT/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1554STJ",
                    imageRelativePath: "/livguard/battery images/IT 1554STJ.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1554STJ",
                },
                {
                    title: "IT1542STJ",
                    imageRelativePath: "/livguard/battery images/IT 1542STJ.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1542STJ",
                },
                {
                    title: "IT1548TT",
                    imageRelativePath: "/livguard/battery images/IT 1548TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1548TT",
                },
                {
                    title: "IT1560STT",
                    imageRelativePath: "/livguard/battery images/IT 1560STT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1560STT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "Livguard INVERTUFF Tall Tubular 150 Ah with 60+24 month Warranty",
                description: "Buy INVERTUFF Tall Tubular 150 Ah Battery with 60+24* Months warranty from Livguard. Enjoy uninterrupted power with Livguard INVERTUFF.",
                canonicalUrl: `/product/it1584tt`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "IT1584TT",
                    "url": "https://www.livguard.com/product/IT1584TT",
                    "image": "https://growthjockey.imgix.net/livguard/battery%20images/IT%201584ST.png?w=508",
                    "description": "",
                    "brand": {
                            "@type": "Brand",
                            "name": "Livgaurd"
                    }
            }

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -1584TT/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1584TT/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1584TT/infographic/3.jpg",
                },
            ],
            title: "लिवगार्ड INVERTUFF टॉल ट्यूबलर 150 Ah बैटरी 60+24* महीने की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "60 + 24* महीने वारंटी",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "150 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "टॉल ट्यूबलर  ",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            specifications: [
                {
                    title: "मॉडल संख्या",
                    value: "INVERTUFF",
                },
                {
                    title: "वारंटी ",
                    value: "60 + 24* महीने",
                },
                {
                    title: "पैकेज सामग्री",
                    value: "इन्वर्टर बैटरी, वारंटी कार्ड, फ्लोट इंडिकेटर, पेट्रोलियम जेली, नट बोल्ट सेट",
                },
                {
                    title: "रेटिंग",
                    value: "150 Ah",
                },
                {
                    title: "आयाम",
                    value: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            features: [
                {
                    value: "मन की शांति सर्वोत्तम वारंटी वारंटी के साथ",
                },
                {
                    value: "ऊर्जा के असीमित प्रवाह के लिए लंबे समय तक चलने वाली बैटरी लाइफ़",
                },
                {
                    value: "आधुनिक Tuff बनावट जो आपके घर की सुंदरता को भी बढ़ाये",
                },
                {
                    value: "उच्च बैकअप के लिए उच्च शुल्क स्वीकृति",
                },
                {
                    value: "सहज अनुभव के लिए कम मेंटेनेंस",
                },
            ],
            additionalInfo: [
                {
                    title: " उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "54.2 ± 3%",
                },
                {
                    title: "मूल का देश ",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -1584TT/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1584TT/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1584TT/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1554STJ",
                    imageRelativePath: "/livguard/battery images/IT 1554STJ.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1554STJ",
                },
                {
                    title: "IT1542STJ",
                    imageRelativePath: "/livguard/battery images/IT 1542STJ.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1542STJ",
                },
                {
                    title: "IT1548TT",
                    imageRelativePath: "/livguard/battery images/IT 1548TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1548TT",
                },
                {
                    title: "IT1560STT",
                    imageRelativePath: "/livguard/battery images/IT 1560STT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1560STT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    IT1554STJ: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -1554STJ/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1554STJ/infographic/2.jpg",
                },
            ],
            title: " Livguard INVERTUFF Short Jumbo Tubular 150 Ah Battery with 36+18* Months Warranty",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "36 + 18* Months Warranty",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "150 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "Short Jumbo Tubular",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "520 (L) X 275 (W) X 282 (H)",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "INVERTUFF",
                },
                {
                    title: "Warranty",
                    value: "36 + 18* Months",
                },
                {
                    title: "Package Contents",
                    value: "Inverter Battery, Warranty card, Float Indicator, Petroleum Jelly, Nut bolt set",
                },
                {
                    title: "Rating",
                    value: "150 Ah",
                },
                {
                    title: "Dimensions",
                    value: "505 (L) X 188 (W) X 367 (H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with Best-In-Class Warranty",
                },
                {
                    value: "Long Lasting Battery Life for an unlimited flow of energy ",
                },
                {
                    value: "Tuff Futuristic Design to complement the aesthetics of your home",
                },
                {
                    value: "High Charge Acceptance For Higher Backup",
                },
                {
                    value: "Low Maintenance for an effortless experience",
                },
            ],
            additionalInfo: [
                {
                    title: "Manufacturer",
                    value: "Livguard",
                },
                {
                    title: "Item Weight",
                    value: "54.2 ± 3%",
                },
                {
                    title: "Country Of Origin",
                    value: "India",
                },
            ],
            productDescription: {
                description:
                    "With our Livguard battery at your home, experience what limitless energy feels like. Built with a 3D grid design and high storage capacity, Livguard inverter batteries deliver satisfactory performance every time, with long and durable battery life",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -1554STJ/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1554STJ/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1554STJ/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1542STJ",
                    imageRelativePath: "/livguard/battery images/IT 1542STJ.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1542STJ",
                },
                {
                    title: "IT1548TT",
                    imageRelativePath: "/livguard/battery images/IT 1548TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1548TT",
                },
                {
                    title: "IT1560STT",
                    imageRelativePath: "/livguard/battery images/IT 1560STT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1560STT",
                },
                {
                    title: "IT1550TT",
                    imageRelativePath: "/livguard/battery images/IT 1550TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1550TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "Buy Short Tubular Jumbo 150 Ah Battery- Livguard",
                description: "Get Livguard INVERTUFF Short Tubular Jumbo150 Ah Battery with 36+18* Months warranty to benefit from a constant supply of electricity for long periods of time.",
                canonicalUrl: `/product/it1554stj`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "IT1554STJ",
                    "url": "https://www.livguard.com/product/IT1554STJ",
                    "image": "https://growthjockey.imgix.net/livguard/battery%20images/IT%201554STJ.png?w=508",
                    "description": "",
                    "brand": {
                            "@type": "Brand",
                            "name": "Livgaurd"
                    }
            }

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -1554STJ/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1554STJ/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1554STJ/infographic/3.jpg",
                },
            ],
            title: "लिवगार्ड INVERTUFF  शोर्ट जंबो ट्यूबुलर  150 Ah बैटरी 36+18* महीने की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "42 + 18* महीने वारंटी",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "150 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "शोर्ट टॉल ट्यूबलर  ",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "505 (L) X 188 (W) X 367 (H)",
                },
            ],
            specifications: [
                {
                    title: "मॉडल संख्या",
                    value: "INVERTUFF",
                },
                {
                    title: "वारंटी ",
                    value: "48 + 18* महीने",
                },
                {
                    title: "पैकेज सामग्री",
                    value: "इन्वर्टर बैटरी, वारंटी कार्ड, फ्लोट इंडिकेटर, पेट्रोलियम जेली, नट बोल्ट सेट",
                },
                {
                    title: "रेटिंग",
                    value: "110 Ah",
                },
                {
                    title: "आयाम",
                    value: "505 (L) X 188 (W) X 367 (H)",
                },
            ],
            features: [
                {
                    value: "मन की शांति सर्वोत्तम वारंटी वारंटी के साथ",
                },
                {
                    value: "ऊर्जा के असीमित प्रवाह के लिए लंबे समय तक चलने वाली बैटरी लाइफ़",
                },
                {
                    value: "आधुनिक Tuff बनावट जो आपके घर की सुंदरता को भी बढ़ाये",
                },
                {
                    value: "उच्च बैकअप के लिए उच्च शुल्क स्वीकृति",
                },
                {
                    value: "सहज अनुभव के लिए कम मेंटेनेंस",
                },
            ],
            additionalInfo: [
                {
                    title: "उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "46.9 ± 3%",
                },
                {
                    title: "मूल का देश ",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -1554STJ/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1554STJ/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1554STJ/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1542STJ",
                    imageRelativePath: "/livguard/battery images/IT 1542STJ.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1542STJ",
                },
                {
                    title: "IT1548TT",
                    imageRelativePath: "/livguard/battery images/IT 1548TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1548TT",
                },
                {
                    title: "IT1560STT",
                    imageRelativePath: "/livguard/battery images/IT 1560STT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1560STT",
                },
                {
                    title: "IT1550TT",
                    imageRelativePath: "/livguard/battery images/IT 1550TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1550TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    IT1542STJ: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -1542STJ/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1542STJ/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1542STJ/infographic/3.jpg",
                },
            ],
            title: " Livguard INVERTUFF Short Jumbo Tubular 150 Ah Battery with 24+18* Months Warranty",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "24 + 18* Months Warranty",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "150 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "Short Jumbo Tubular",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "520 (L) X 275 (W) X 282 (H)",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "INVERTUFF",
                },
                {
                    title: "Warranty",
                    value: "24 + 18* Months",
                },
                {
                    title: "Package Contents",
                    value: "Inverter Battery, Warranty card, Float Indicator, Petroleum Jelly, Nut bolt set",
                },
                {
                    title: "Rating",
                    value: "150 Ah",
                },
                {
                    title: "Dimensions",
                    value: "520 (L) X 275 (W) X 282 (H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with Best-In-Class Warranty",
                },
                {
                    value: "Long Lasting Battery Life for an unlimited flow of energy ",
                },
                {
                    value: "Tuff Futuristic Design to complement the aesthetics of your home",
                },
                {
                    value: "High Charge Acceptance For Higher Backup",
                },
                {
                    value: "Low Maintenance for an effortless experience",
                },
            ],
            additionalInfo: [
                {
                    title: "Manufacturer",
                    value: "Livguard",
                },
                {
                    title: "Item Weight",
                    value: "51.3 ± 3%",
                },
                {
                    title: "Country Of Origin",
                    value: "India",
                },
            ],
            productDescription: {
                description:
                    "With our Livguard battery at your home, experience what limitless energy feels like. Built with a 3D grid design and high storage capacity, Livguard inverter batteries deliver satisfactory performance every time, with long and durable battery life",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -1542STJ/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1542STJ/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1542STJ/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1548TT",
                    imageRelativePath: "/livguard/battery images/IT 1548TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1548TT",
                },
                {
                    title: "IT1560STT",
                    imageRelativePath: "/livguard/battery images/IT 1560STT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1560STT",
                },
                {
                    title: "IT1550TT",
                    imageRelativePath: "/livguard/battery images/IT 1550TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1550TT",
                },
                {
                    title: "IT1554TT",
                    imageRelativePath: "/livguard/battery images/IT 1554TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1554TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "Livguard INVERTUFF Short Tubular 150 Ah Online",
                description: "Buy Livguard INVERTUFF Short Tubular Jumbo 150 Ah Battery at the best price with 24+18* Months warranty; best for homes, small offices, and small shops.",
                canonicalUrl: `/product/it1542stj`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "IT1542STJ",
                    "url": "https://www.livguard.com/product/IT1542STJ",
                    "image": "https://growthjockey.imgix.net/livguard/battery%20images/IT%201542STJ.png?w=508",
                    "description": "",
                    "brand": {
                            "@type": "Brand",
                            "name": "Livgaurd"
                    }
            }

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -1542STJ/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1542STJ/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1542STJ/infographic/3.jpg",
                },
            ],
            title: "लिवगार्ड INVERTUFF  शोर्ट जंबो ट्यूबुलर  150 Ah बैटरी 24+18* महीने की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "24 + 18* महीने वारंटी",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "150 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "शोर्ट टॉल ट्यूबलर  ",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "520 (L) X 275 (W) X 282 (H)",
                },
            ],
            specifications: [
                {
                    title: "मॉडल संख्या",
                    value: "INVERTUFF",
                },
                {
                    title: "वारंटी ",
                    value: "24 + 18* महीने",
                },
                {
                    title: "पैकेज सामग्री",
                    value: "इन्वर्टर बैटरी, वारंटी कार्ड, फ्लोट इंडिकेटर, पेट्रोलियम जेली, नट बोल्ट सेट",
                },
                {
                    title: "रेटिंग",
                    value: "150 Ah",
                },
                {
                    title: "आयाम",
                    value: "520 (L) X 275 (W) X 282 (H)",
                },
            ],
            features: [
                {
                    value: "मन की शांति सर्वोत्तम वारंटी वारंटी के साथ",
                },
                {
                    value: "ऊर्जा के असीमित प्रवाह के लिए लंबे समय तक चलने वाली बैटरी लाइफ़",
                },
                {
                    value: "आधुनिक Tuff बनावट जो आपके घर की सुंदरता को भी बढ़ाये",
                },
                {
                    value: "उच्च बैकअप के लिए उच्च शुल्क स्वीकृति",
                },
                {
                    value: "सहज अनुभव के लिए कम मेंटेनेंस",
                },
            ],
            additionalInfo: [
                {
                    title: " उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "51.3 ± 3%",
                },
                {
                    title: "मूल का देश ",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -1542STJ/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1542STJ/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1542STJ/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1548TT",
                    imageRelativePath: "/livguard/battery images/IT 1548TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1548TT",
                },
                {
                    title: "IT1560STT",
                    imageRelativePath: "/livguard/battery images/IT 1560STT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1560STT",
                },
                {
                    title: "IT1550TT",
                    imageRelativePath: "/livguard/battery images/IT 1550TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1550TT",
                },
                {
                    title: "IT1554TT",
                    imageRelativePath: "/livguard/battery images/IT 1554TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1554TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    IT1548STT: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -1548STT/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1548STT/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1548STT/infographic/3.jpg",
                },
            ],
            title: " Livguard INVERTUFF Short Tall Tubular 150 Ah Battery with 24+24* Months Warranty",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "24 + 24* Months Warranty",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "150 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "Short Tall Tubular",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "505 (L) X 188 (W) X 367 (H)",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "INVERTUFF",
                },
                {
                    title: "Warranty",
                    value: "24 + 24* Months",
                },
                {
                    title: "Package Contents",
                    value: "Inverter Battery, Warranty card, Float Indicator, Petroleum Jelly, Nut bolt set",
                },
                {
                    title: "Rating",
                    value: "150 Ah",
                },
                {
                    title: "Dimensions",
                    value: "505 (L) X 188 (W) X 367 (H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with Best-In-Class Warranty",
                },
                {
                    value: "Long Lasting Battery Life for an unlimited flow of energy ",
                },
                {
                    value: "Tuff Futuristic Design to complement the aesthetics of your home",
                },
                {
                    value: "High Charge Acceptance For Higher Backup",
                },
                {
                    value: "Low Maintenance for an effortless experience",
                },
            ],
            additionalInfo: [
                {
                    title: "Manufacturer",
                    value: "Livguard",
                },
                {
                    title: "Item Weight",
                    value: "47.6 ± 3%",
                },
                {
                    title: "Country Of Origin",
                    value: "India",
                },
            ],
            productDescription: {
                description:
                    "With our Livguard battery at your home, experience what limitless energy feels like. Built with a 3D grid design and high storage capacity, Livguard inverter batteries deliver satisfactory performance every time, with long and durable battery life",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -1548STT/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1548STT/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1548STT/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1560STT",
                    imageRelativePath: "/livguard/Battery-images/IT1548STT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1560STT",
                },
                {
                    title: "IT1550TT",
                    imageRelativePath: "/livguard/battery-images/IT1550TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1550TT",
                },
                {
                    title: "IT1554TT",
                    imageRelativePath: "/livguard/battery-images/IT1554TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1554TT",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/battery-images/IT1560TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1560TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "Livguard INVERTUFF Short Tall Tubular 150 Ah Battery",
                description: "Buy Livguard INVERTUFF Short Tall Tubular 150 Ah Battery with 24+24* months warranty. Our batteries deliver satisfactory performance with long and durable battery life.",
                canonicalUrl: `/product/it1548stt`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "IT1548STT",
                    "url": "https://www.livguard.com/product/IT1548STT",
                    "image": "https://growthjockey.imgix.net/livguard/battery%20images/IT%201548STT.png?w=508",
                    "description": "",
                    "brand": {
                            "@type": "Brand",
                            "name": "Livgaurd"
                    }
            }

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -1548STT/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1548STT/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1548STT/infographic/3.jpg",
                },
            ],
            title: "लिवगार्ड INVERTUFF शोर्ट टॉल ट्यूबलर  150 Ah बैटरी 24+24* महीने की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "24 + 24* महीने वारंटी",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "150 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "शोर्ट टॉल ट्यूबलर  ",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "505 (L) X 188 (W) X 367 (H)",
                },
            ],
            specifications: [
                {
                    title: "मॉडल संख्या",
                    value: "INVERTUFF",
                },
                {
                    title: "वारंटी ",
                    value: "24 + 24* महीने",
                },
                {
                    title: "पैकेज सामग्री",
                    value: "इन्वर्टर बैटरी, वारंटी कार्ड, फ्लोट इंडिकेटर, पेट्रोलियम जेली, नट बोल्ट सेट",
                },
                {
                    title: "रेटिंग",
                    value: "150 Ah",
                },
                {
                    title: "आयाम",
                    value: "505 (L) X 188 (W) X 367 (H)",
                },
            ],
            features: [
                {
                    value: "मन की शांति सर्वोत्तम वारंटी वारंटी के साथ",
                },
                {
                    value: "ऊर्जा के असीमित प्रवाह के लिए लंबे समय तक चलने वाली बैटरी लाइफ़",
                },
                {
                    value: "आधुनिक Tuff बनावट जो आपके घर की सुंदरता को भी बढ़ाये",
                },
                {
                    value: "उच्च बैकअप के लिए उच्च शुल्क स्वीकृति",
                },
                {
                    value: "सहज अनुभव के लिए कम मेंटेनेंस",
                },
            ],
            additionalInfo: [
                {
                    title: "उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "47.6 ± 3%",
                },
                {
                    title: "मूल का देश ",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -1548STT/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1548STT/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1548STT/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1560STT",
                    imageRelativePath: "/livguard/battery-images/IT1548STT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1560STT",
                },
                {
                    title: "IT1550TT",
                    imageRelativePath: "/livguard/battery-images/IT1550TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1550TT",
                },
                {
                    title: "IT1554TT",
                    imageRelativePath: "/livguard/battery-images/IT1554TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1554TT",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/battery-images/IT1560TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1560TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    IT1560STT: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -1560STT/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1560STT/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1560STT/infographic/3.jpg",
                },
            ],
            title: " Livguard INVERTUFF Short Tall Tubular 150 Ah Battery with 36+24* Months Warranty",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "36 + 24* Months Warranty",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "150 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "Short Tall Tubular",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "505 (L) X 188 (W) X 367 (H)",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "INVERTUFF",
                },
                {
                    title: "Warranty",
                    value: "36 + 24* Months",
                },
                {
                    title: "Package Contents",
                    value: "Inverter Battery, Warranty card, Float Indicator, Petroleum Jelly, Nut bolt set",
                },
                {
                    title: "Rating",
                    value: "150 Ah",
                },
                {
                    title: "Dimensions",
                    value: "505 (L) X 188 (W) X 367 (H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with Best-In-Class Warranty",
                },
                {
                    value: "Long Lasting Battery Life for an unlimited flow of energy ",
                },
                {
                    value: "Tuff Futuristic Design to complement the aesthetics of your home",
                },
                {
                    value: "High Charge Acceptance For Higher Backup",
                },
                {
                    value: "Low Maintenance for an effortless experience",
                },
            ],
            additionalInfo: [
                {
                    title: "Manufacturer",
                    value: "Livguard",
                },
                {
                    title: "Item Weight",
                    value: "52.2 ± 3%",
                },
                {
                    title: "Country Of Origin",
                    value: "India",
                },
            ],
            productDescription: {
                description:
                    "With our Livguard battery at your home, experience what limitless energy feels like. Built with a 3D grid design and high storage capacity, Livguard inverter batteries deliver satisfactory performance every time, with long and durable battery life",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -1560STT/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1560STT/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1560STT/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1550TT",
                    imageRelativePath: "/livguard/battery images/IT 1550TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1550TT",
                },
                {
                    title: "IT1554TT",
                    imageRelativePath: "/livguard/battery images/IT 1554TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1554TT",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/battery images/IT 1560TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1560TT",
                },
                {
                    title: "IT1536TT",
                    imageRelativePath: "/livguard/battery images/IT 1536TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1560TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "Buy Short Tall Tubular 150Ah Battery with 4-year warranty- Livguard",
                description: "Get the 36+24* month warranty INVERTUFF Short Tall Tubular 150 Ah Battery, with  Futuristic Design to complement the aesthetics of your home",
                canonicalUrl: `/product/it1560stt`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "IT1560STT",
                    "url": "https://www.livguard.com/product/IT1560STT",
                    "image": "https://growthjockey.imgix.net/livguard/battery%20images/IT%201560STT.png?w=508",
                    "description": "",
                    "brand": {
                            "@type": "Brand",
                            "name": "Livgaurd"
                    }
            }

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -1560STT/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1560STT/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1560STT/infographic/3.jpg",
                },
            ],
            title: "लिवगार्ड INVERTUFF शोर्ट टॉल ट्यूबलर  150 Ah बैटरी 36+24* महीने की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "36 + 24* महीने वारंटी",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "150 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "शोर्ट टॉल ट्यूबलर  ",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "505 (L) X 188 (W) X 367 (H)",
                },
            ],
            specifications: [
                {
                    title: "मॉडल संख्या",
                    value: "INVERTUFF",
                },
                {
                    title: "वारंटी ",
                    value: "36 + 24* महीने",
                },
                {
                    title: "पैकेज सामग्री",
                    value: "इन्वर्टर बैटरी, वारंटी कार्ड, फ्लोट इंडिकेटर, पेट्रोलियम जेली, नट बोल्ट सेट",
                },
                {
                    title: "रेटिंग",
                    value: "150 Ah",
                },
                {
                    title: "आयाम",
                    value: "505 (L) X 188 (W) X 367 (H)",
                },
            ],
            features: [
                {
                    value: "मन की शांति सर्वोत्तम वारंटी वारंटी के साथ",
                },
                {
                    value: "ऊर्जा के असीमित प्रवाह के लिए लंबे समय तक चलने वाली बैटरी लाइफ़",
                },
                {
                    value: "आधुनिक Tuff बनावट जो आपके घर की सुंदरता को भी बढ़ाये",
                },
                {
                    value: "उच्च बैकअप के लिए उच्च शुल्क स्वीकृति",
                },
                {
                    value: "सहज अनुभव के लिए कम मेंटेनेंस",
                },
            ],
            additionalInfo: [
                {
                    title: " उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "52.2 ± 3%",
                },
                {
                    title: "मूल का देश ",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -1560STT/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1560STT/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1560STT/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1550TT",
                    imageRelativePath: "/livguard/battery images/IT 1550TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1550TT",
                },
                {
                    title: "IT1554TT",
                    imageRelativePath: "/livguard/battery images/IT 1554TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1554TT",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/battery images/IT 1560TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1560TT",
                },
                {
                    title: "IT1536TT",
                    imageRelativePath: "/livguard/battery images/IT 1536TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1560TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    IT1550TT: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -1550TT/inforgraphic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1550TT/inforgraphic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1550TT/inforgraphic/3.jpg",
                },
            ],
            title: " Livguard INVERTUFF Tall Tubular 150 Ah Battery with 36+14* Months Warranty",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "36 + 14* Months Warranty",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "150 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "Tall Tubular",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "INVERTUFF",
                },
                {
                    title: "Warranty",
                    value: "36 + 14* Months",
                },
                {
                    title: "Package Contents",
                    value: "Inverter Battery, Warranty card, Float Indicator, Petroleum Jelly, Nut bolt set",
                },
                {
                    title: "Rating",
                    value: "150 Ah",
                },
                {
                    title: "Dimensions",
                    value: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with Best-In-Class Warranty",
                },
                {
                    value: "Long Lasting Battery Life for an unlimited flow of energy ",
                },
                {
                    value: "Tuff Futuristic Design to complement the aesthetics of your home",
                },
                {
                    value: "High Charge Acceptance For Higher Backup",
                },
                {
                    value: "Low Maintenance for an effortless experience",
                },
            ],
            additionalInfo: [
                {
                    title: "Manufacturer",
                    value: "Livguard",
                },
                {
                    title: "Item Weight",
                    value: "53.2 ± 3%",
                },
                {
                    title: "Country Of Origin",
                    value: "India",
                },
            ],
            productDescription: {
                description:
                    "With our Livguard battery at your home, experience what limitless energy feels like. Built with a 3D grid design and high storage capacity, Livguard inverter batteries deliver satisfactory performance every time, with long and durable battery life",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -1550TT/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1550TT/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1550TT/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1554TT",
                    imageRelativePath: "/livguard/battery images/IT 1554TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1554TT",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/battery images/IT 1560TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1560TT",
                },
                {
                    title: "IT1536TT",
                    imageRelativePath: "/livguard/battery images/IT 1536TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1560TT",
                },
                {
                    title: "IT1548TT",
                    imageRelativePath: "/livguard/battery images/IT 1548TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1548TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "Livguard INVERTUFF Tall Tubular 150 Ah Battery Online",
                description: "Enjoy a constant supply of electric power with INVERTUFF Tall Tubular 150 Ah Battery with 36+14* Months warranty from Livguard; great for small offices and homes.",
                canonicalUrl: `/product/it1550tt`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "IT 1550TT",
                    "url": "https://www.livguard.com/product/IT 1550TT",
                    "image": "https://growthjockey.imgix.net/livguard/battery%20images/IT%201550TT.png?w=508",
                    "description": "",
                    "brand": {
                            "@type": "Brand",
                            "name": "Livgaurd"
                    }
            }

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -1550TT/inforgraphic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1550TT/inforgraphic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1550TT/inforgraphic/3.jpg",
                },
            ],
            title: "लिवगार्ड INVERTUFF टॉल ट्यूबलर 150 Ah बैटरी 36+14* महीने की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "36 + 14* महीने वारंटी",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "150 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "टॉल ट्यूबलर",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            specifications: [
                {
                    title: "मॉडल संख्या",
                    value: "INVERTUFF",
                },
                {
                    title: "वारंटी ",
                    value: "36 + 14* महीने",
                },
                {
                    title: "पैकेज सामग्री",
                    value: "इन्वर्टर बैटरी, वारंटी कार्ड, फ्लोट इंडिकेटर, पेट्रोलियम जेली, नट बोल्ट सेट",
                },
                {
                    title: "रेटिंग",
                    value: "150 Ah",
                },
                {
                    title: "आयाम",
                    value: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            features: [
                {
                    value: "मन की शांति सर्वोत्तम वारंटी वारंटी के साथ",
                },
                {
                    value: "ऊर्जा के असीमित प्रवाह के लिए लंबे समय तक चलने वाली बैटरी लाइफ़",
                },
                {
                    value: "आधुनिक Tuff बनावट जो आपके घर की सुंदरता को भी बढ़ाये",
                },
                {
                    value: "उच्च बैकअप के लिए उच्च शुल्क स्वीकृति",
                },
                {
                    value: "सहज अनुभव के लिए कम मेंटेनेंस",
                },
            ],
            additionalInfo: [
                {
                    title: " उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "53.2 ± 3%",
                },
                {
                    title: "मूल का देश ",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -1550TT/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1550TT/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1550TT/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1554TT",
                    imageRelativePath: "/livguard/battery images/IT 1554TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1554TT",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/battery images/IT 1560TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1560TT",
                },
                {
                    title: "IT1536TT",
                    imageRelativePath: "/livguard/battery images/IT 1536TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1560TT",
                },
                {
                    title: "IT1548TT",
                    imageRelativePath: "/livguard/battery images/IT 1548TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1548TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    IT1554TT: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -1554TT/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1554TT/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1554TT/infographic/3.jpg",
                },
            ],
            title: " Livguard INVERTUFF Tall Tubular 150 Ah Battery with 42+12* Months Warranty",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "42 + 12* Months Warranty",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "150 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "Tall Tubular",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "INVERTUFF",
                },
                {
                    title: "Warranty",
                    value: "42 + 12* Months",
                },
                {
                    title: "Package Contents",
                    value: "Inverter Battery, Warranty card, Float Indicator, Petroleum Jelly, Nut bolt set",
                },
                {
                    title: "Rating",
                    value: "150 Ah",
                },
                {
                    title: "Dimensions",
                    value: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with Best-In-Class Warranty",
                },
                {
                    value: "Long Lasting Battery Life for an unlimited flow of energy ",
                },
                {
                    value: "Tuff Futuristic Design to complement the aesthetics of your home",
                },
                {
                    value: "High Charge Acceptance For Higher Backup",
                },
                {
                    value: "Low Maintenance for an effortless experience",
                },
            ],
            additionalInfo: [
                {
                    title: "Manufacturer",
                    value: "Livguard",
                },
                {
                    title: "Item Weight",
                    value: "54.2 ± 3%",
                },
                {
                    title: "Country Of Origin",
                    value: "India",
                },
            ],
            productDescription: {
                description:
                    "With our Livguard battery at your home, experience what limitless energy feels like. Built with a 3D grid design and high storage capacity, Livguard inverter batteries deliver satisfactory performance every time, with long and durable battery life",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -1554TT/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1554TT/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1554TT/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/battery images/IT 1560TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1560TT",
                },
                {
                    title: "IT1536TT",
                    imageRelativePath: "/livguard/battery images/IT 1536TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1560TT",
                },
                {
                    title: "IT1548TT",
                    imageRelativePath: "/livguard/battery images/IT 1548TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1548TT",
                },
                {
                    title: "IT1636STJ",
                    imageRelativePath: "/livguard/battery images/IT 1636STJ.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1636STJ",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "Buy 150 Ah Tall Tubular Battery Online - Livguard",
                description: "Get Livguard INVERTUFF Tall Tubular 150 Ah Battery with a 54-month warranty, and enjoy a constant supply of electric power for long hours without any trouble.",
                canonicalUrl: `/product/it1554tt`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "IT1554TT",
                    "url": "https://www.livguard.com/product/IT1554TT",
                    "image": "https://growthjockey.imgix.net/livguard/battery%20images/IT%201554TT.png?w=508",
                    "description": "",
                    "brand": {
                            "@type": "Brand",
                            "name": "Livgaurd"
                    }
            }

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -1554TT/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1554TT/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1554TT/infographic/3.jpg",
                },
            ],
            title: "लिवगार्ड INVERTUFF टॉल ट्यूबलर 150 Ah बैटरी 42+12* महीने की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "42 + 12* महीने वारंटी",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "150 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "टॉल ट्यूबलर  ",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            specifications: [
                {
                    title: "मॉडल संख्या",
                    value: "INVERTUFF",
                },
                {
                    title: "वारंटी ",
                    value: "42 + 12* महीने",
                },
                {
                    title: "पैकेज सामग्री",
                    value: "इन्वर्टर बैटरी, वारंटी कार्ड, फ्लोट इंडिकेटर, पेट्रोलियम जेली, नट बोल्ट सेट",
                },
                {
                    title: "रेटिंग",
                    value: "150 Ah",
                },
                {
                    title: "आयाम",
                    value: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            features: [
                {
                    value: "मन की शांति सर्वोत्तम वारंटी वारंटी के साथ",
                },
                {
                    value: "ऊर्जा के असीमित प्रवाह के लिए लंबे समय तक चलने वाली बैटरी लाइफ़",
                },
                {
                    value: "आधुनिक Tuff बनावट जो आपके घर की सुंदरता को भी बढ़ाये",
                },
                {
                    value: "उच्च बैकअप के लिए उच्च शुल्क स्वीकृति",
                },
                {
                    value: "सहज अनुभव के लिए कम मेंटेनेंस",
                },
            ],
            additionalInfo: [
                {
                    title: " उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "54.2 ± 3%",
                },
                {
                    title: "मूल का देश ",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -1554TT/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1554TT/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1554TT/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/battery images/IT 1560TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1560TT",
                },
                {
                    title: "IT1536TT",
                    imageRelativePath: "/livguard/battery images/IT 1536TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1560TT",
                },
                {
                    title: "IT1548TT",
                    imageRelativePath: "/livguard/battery images/IT 1548TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1548TT",
                },
                {
                    title: "IT1636STJ",
                    imageRelativePath: "/livguard/battery images/IT 1636STJ.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1636STJ",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    IT1560TT: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -1560TT/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1560TT/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1560TT/infographic/3.jpg",
                },
            ],
            title: " Livguard INVERTUFF Short Tall Tubular 150 Ah Battery with 36+24* Months Warranty",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "36 + 24* Months Warranty",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "150 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "Tall Tubular",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "INVERTUFF",
                },
                {
                    title: "Warranty",
                    value: "36 + 24* Months",
                },
                {
                    title: "Package Contents",
                    value: "Inverter Battery, Warranty card, Float Indicator, Petroleum Jelly, Nut bolt set",
                },
                {
                    title: "Rating",
                    value: "150 Ah",
                },
                {
                    title: "Dimensions",
                    value: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with Best-In-Class Warranty",
                },
                {
                    value: "Long Lasting Battery Life for an unlimited flow of energy ",
                },
                {
                    value: "Tuff Futuristic Design to complement the aesthetics of your home",
                },
                {
                    value: "High Charge Acceptance For Higher Backup",
                },
                {
                    value: "Low Maintenance for an effortless experience",
                },
            ],
            additionalInfo: [
                {
                    title: "Manufacturer",
                    value: "Livguard",
                },
                {
                    title: "Item Weight",
                    value: "54.2 ± 3%",
                },
                {
                    title: "Country Of Origin",
                    value: "India",
                },
            ],
            productDescription: {
                description:
                    "With our Livguard battery at your home, experience what limitless energy feels like. Built with a 3D grid design and high storage capacity, Livguard inverter batteries deliver satisfactory performance every time, with long and durable battery life",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -1560TT/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1560TT/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1560TT/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1536TT",
                    imageRelativePath: "/livguard/battery images/IT 1536TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1560TT",
                },
                {
                    title: "IT1548TT",
                    imageRelativePath: "/livguard/battery images/IT 1548TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1548TT",
                },
                {
                    title: "IT1636STJ",
                    imageRelativePath: "/livguard/battery images/IT 1636STJ.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1636STJ",
                },
                {
                    title: "IT1666TT",
                    imageRelativePath: "/livguard/battery images/IT 1666TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1666TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "INVERTUFF Short Tall Tubular 150 Ah Battery online- Livguard",
                description: "Buy INVERTUFF short tall tabular 150 Ah battery online from Livguard, with a 50-month warranty and High Charge Acceptance For Higher Backup.",
                canonicalUrl: `/product/it1560tt`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "IT1560TT",
                    "url": "https://www.livguard.com/product/IT1560TT",
                    "image": "https://growthjockey.imgix.net/livguard/battery%20images/IT%201560TT.png?w=508",
                    "description": "",
                    "brand": {
                            "@type": "Brand",
                            "name": "Livgaurd"
                    }
            }

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -1560TT/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1560TT/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1560TT/infographic/3.jpg",
                },
            ],
            title: "लिवगार्ड INVERTUFF टॉल ट्यूबलर 150 Ah बैटरी 48+12* महीने की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "36 + 24* महीने वारंटी",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "150 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "टॉल ट्यूबलर  ",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            specifications: [
                {
                    title: "मॉडल संख्या",
                    value: "INVERTUFF",
                },
                {
                    title: "वारंटी ",
                    value: "36 + 24* महीने",
                },
                {
                    title: "पैकेज सामग्री",
                    value: "इन्वर्टर बैटरी, वारंटी कार्ड, फ्लोट इंडिकेटर, पेट्रोलियम जेली, नट बोल्ट सेट",
                },
                {
                    title: "रेटिंग",
                    value: "150 Ah",
                },
                {
                    title: "आयाम",
                    value: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            features: [
                {
                    value: "मन की शांति सर्वोत्तम वारंटी वारंटी के साथ",
                },
                {
                    value: "ऊर्जा के असीमित प्रवाह के लिए लंबे समय तक चलने वाली बैटरी लाइफ़",
                },
                {
                    value: "आधुनिक Tuff बनावट जो आपके घर की सुंदरता को भी बढ़ाये",
                },
                {
                    value: "उच्च बैकअप के लिए उच्च शुल्क स्वीकृति",
                },
                {
                    value: "सहज अनुभव के लिए कम मेंटेनेंस",
                },
            ],
            additionalInfo: [
                {
                    title: " उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "54.2 ± 3%",
                },
                {
                    title: "मूल का देश ",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -1560TT/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1560TT/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1560TT/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1536TT",
                    imageRelativePath: "/livguard/battery images/IT 1536TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1560TT",
                },
                {
                    title: "IT1548TT",
                    imageRelativePath: "/livguard/battery images/IT 1548TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1548TT",
                },
                {
                    title: "IT1636STJ",
                    imageRelativePath: "/livguard/battery images/IT 1636STJ.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1636STJ",
                },
                {
                    title: "IT1666TT",
                    imageRelativePath: "/livguard/battery images/IT 1666TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1666TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    IT1536TT: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -1536TT/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1536TT/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1536TT/infographic/3.jpg",
                },
            ],
            title: " Livguard INVERTUFF Tall Tubular 150 Ah Battery with 18+18* Months Warranty",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "18 + 18* Months Warranty",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "150 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "Tall Tubular",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "INVERTUFF",
                },
                {
                    title: "Warranty",
                    value: "18 + 18* Months",
                },
                {
                    title: "Package Contents",
                    value: "Inverter Battery, Warranty card, Float Indicator, Petroleum Jelly, Nut bolt set",
                },
                {
                    title: "Rating",
                    value: "150 Ah",
                },
                {
                    title: "Dimensions",
                    value: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with Best-In-Class Warranty",
                },
                {
                    value: "Long Lasting Battery Life for an unlimited flow of energy ",
                },
                {
                    value: "Tuff Futuristic Design to complement the aesthetics of your home",
                },
                {
                    value: "High Charge Acceptance For Higher Backup",
                },
                {
                    value: "Low Maintenance for an effortless experience",
                },
            ],
            additionalInfo: [
                {
                    title: "Manufacturer",
                    value: "Livguard",
                },
                {
                    title: "Item Weight",
                    value: "52.8 ± 3%",
                },
                {
                    title: "Country Of Origin",
                    value: "India",
                },
            ],
            productDescription: {
                description:
                    "With our Livguard battery at your home, experience what limitless energy feels like. Built with a 3D grid design and high storage capacity, Livguard inverter batteries deliver satisfactory performance every time, with long and durable battery life",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -1536TT/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1536TT/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1536TT/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1548TT",
                    imageRelativePath: "/livguard/battery images/IT 1548TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1548TT",
                },
                {
                    title: "IT1636STJ",
                    imageRelativePath: "/livguard/battery images/IT 1636STJ.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1636STJ",
                },
                {
                    title: "IT1666TT",
                    imageRelativePath: "/livguard/battery images/IT 1666TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1666TT",
                },
                {
                    title: "IT1639TT",
                    imageRelativePath: "/livguard/battery images/IT 1639TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1639TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "Buy Tall Tubular 150 Ah battery with 18 months warranty- Livguard",
                description: "Get a Livguard INVERTUFF Tall Tubular 150 Ah Battery with an 18+18* month warranty. Bring home the power of unlimited energy with our inverter battery.",
                canonicalUrl: `/product/it1536tt`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "IT1536TT",
                    "url": "https://www.livguard.com/product/IT1536TT",
                    "image": "https://growthjockey.imgix.net/livguard/battery%20images/IT%201536TT.png?w=508",
                    "description": "",
                    "brand": {
                            "@type": "Brand",
                            "name": "Livgaurd"
                    }
            }

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -1536TT/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1536TT/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1536TT/infographic/3.jpg",
                },
            ],
            title: "लिवगार्ड INVERTUFF टॉल ट्यूबलर 150 Ah बैटरी 18+18* महीने की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "18 + 18* महीने वारंटी",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "150 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "टॉल ट्यूबलर  ",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            specifications: [
                {
                    title: "मॉडल संख्या",
                    value: "INVERTUFF",
                },
                {
                    title: "वारंटी ",
                    value: "18 + 18* महीने",
                },
                {
                    title: "पैकेज सामग्री",
                    value: "इन्वर्टर बैटरी, वारंटी कार्ड, फ्लोट इंडिकेटर, पेट्रोलियम जेली, नट बोल्ट सेट",
                },
                {
                    title: "रेटिंग",
                    value: "150 Ah",
                },
                {
                    title: "आयाम",
                    value: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            features: [
                {
                    value: "मन की शांति सर्वोत्तम वारंटी वारंटी के साथ",
                },
                {
                    value: "ऊर्जा के असीमित प्रवाह के लिए लंबे समय तक चलने वाली बैटरी लाइफ़",
                },
                {
                    value: "आधुनिक Tuff बनावट जो आपके घर की सुंदरता को भी बढ़ाये",
                },
                {
                    value: "उच्च बैकअप के लिए उच्च शुल्क स्वीकृति",
                },
                {
                    value: "सहज अनुभव के लिए कम मेंटेनेंस",
                },
            ],
            additionalInfo: [
                {
                    title: "उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "52.8 ± 3%",
                },
                {
                    title: "मूल का देश ",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -1536TT/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1536TT/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1536TT/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1548TT",
                    imageRelativePath: "/livguard/battery images/IT 1548TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1548TT",
                },
                {
                    title: "IT1636STJ",
                    imageRelativePath: "/livguard/battery images/IT 1636STJ.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1636STJ",
                },
                {
                    title: "IT1666TT",
                    imageRelativePath: "/livguard/battery images/IT 1666TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1666TT",
                },
                {
                    title: "IT1639TT",
                    imageRelativePath: "/livguard/battery images/IT 1639TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1639TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    IT1548TT: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -1548TT/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1548TT/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1548TT/infographic/3.jpg",
                },
            ],
            title: " Livguard INVERTUFF Tall Tubular 150 Ah Battery with 30+18* Months Warranty",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "30 + 18* Months Warranty",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "150 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "Tall Tubular",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "INVERTUFF",
                },
                {
                    title: "Warranty",
                    value: "30 + 18* Months",
                },
                {
                    title: "Package Contents",
                    value: "Inverter Battery, Warranty card, Float Indicator, Petroleum Jelly, Nut bolt set",
                },
                {
                    title: "Rating",
                    value: "150 Ah",
                },
                {
                    title: "Dimensions",
                    value: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with Best-In-Class Warranty",
                },
                {
                    value: "Long Lasting Battery Life for an unlimited flow of energy ",
                },
                {
                    value: "Tuff Futuristic Design to complement the aesthetics of your home",
                },
                {
                    value: "High Charge Acceptance For Higher Backup",
                },
                {
                    value: "Low Maintenance for an effortless experience",
                },
            ],
            additionalInfo: [
                {
                    title: "Manufacturer",
                    value: "Livguard",
                },
                {
                    title: "Item Weight",
                    value: "54.9 ± 3%",
                },
                {
                    title: "Country Of Origin",
                    value: "India",
                },
            ],
            productDescription: {
                description:
                    "With our Livguard battery at your home, experience what limitless energy feels like. Built with a 3D grid design and high storage capacity, Livguard inverter batteries deliver satisfactory performance every time, with long and durable battery life",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -1548TT/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1548TT/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1548TT/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1636STJ",
                    imageRelativePath: "/livguard/battery images/IT 1636STJ.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1636STJ",
                },
                {
                    title: "IT1666TT",
                    imageRelativePath: "/livguard/battery images/IT 1666TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1666TT",
                },
                {
                    title: "IT1639TT",
                    imageRelativePath: "/livguard/battery images/IT 1639TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1639TT",
                },
                {
                    title: "IT1645TT",
                    imageRelativePath: "/livguard/battery images/IT 1645TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1645TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "Buy INVERTUFF Tall Tubular 150 Ah Online - Livguard",
                description: "Buy INVERTUFF tall tubular 150 Ah online from Livguard. With our Livguard battery at your home, experience what limitless energy feels like.",
                canonicalUrl: `/product/it1548tt`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "IT1548TT",
                    "url": "https://www.livguard.com/product/IT1548TT",
                    "image": "https://growthjockey.imgix.net/livguard/battery%20images/IT%201548TT.png?w=508",
                    "description": "",
                    "brand": {
                            "@type": "Brand",
                            "name": "Livgaurd"
                    }
            }

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -1548TT/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1548TT/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1548TT/infographic/3.jpg",
                },
            ],
            title: "लिवगार्ड INVERTUFF टॉल ट्यूबलर 150 Ah बैटरी 30+18* महीने की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "30 + 18* महीने वारंटी",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "150 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "टॉल ट्यूबलर  ",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            specifications: [
                {
                    title: "मॉडल संख्या",
                    value: "INVERTUFF",
                },
                {
                    title: "वारंटी ",
                    value: "30 + 18* महीने",
                },
                {
                    title: "पैकेज सामग्री",
                    value: "इन्वर्टर बैटरी, वारंटी कार्ड, फ्लोट इंडिकेटर, पेट्रोलियम जेली, नट बोल्ट सेट",
                },
                {
                    title: "रेटिंग",
                    value: "150 Ah",
                },
                {
                    title: "आयाम",
                    value: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            features: [
                {
                    value: "मन की शांति सर्वोत्तम वारंटी वारंटी के साथ",
                },
                {
                    value: "ऊर्जा के असीमित प्रवाह के लिए लंबे समय तक चलने वाली बैटरी लाइफ़",
                },
                {
                    value: "आधुनिक Tuff बनावट जो आपके घर की सुंदरता को भी बढ़ाये",
                },
                {
                    value: "उच्च बैकअप के लिए उच्च शुल्क स्वीकृति",
                },
                {
                    value: "सहज अनुभव के लिए कम मेंटेनेंस",
                },
            ],
            additionalInfo: [
                {
                    title: " उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "54.9 ± 3%",
                },
                {
                    title: "मूल का देश ",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -1548TT/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1548TT/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1548TT/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1636STJ",
                    imageRelativePath: "/livguard/battery images/IT 1636STJ.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1636STJ",
                },
                {
                    title: "IT1666TT",
                    imageRelativePath: "/livguard/battery images/IT 1666TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1666TT",
                },
                {
                    title: "IT1639TT",
                    imageRelativePath: "/livguard/battery images/IT 1639TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1639TT",
                },
                {
                    title: "IT1645TT",
                    imageRelativePath: "/livguard/battery images/IT 1645TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1645TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    IT1666TT: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -1666TT/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1666TT/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1666TT/infographic/3.jpg",
                },
            ],
            title: " Livguard INVERTUFF Tall Tubular 160 Ah Battery with 42+24* Months Warranty",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "42 + 24* Months Warranty",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "160 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "Tall Tubular",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "INVERTUFF",
                },
                {
                    title: "Warranty",
                    value: "42 + 24* Months",
                },
                {
                    title: "Package Contents",
                    value: "Inverter Battery, Warranty card, Float Indicator, Petroleum Jelly, Nut bolt set",
                },
                {
                    title: "Rating",
                    value: "160 Ah",
                },
                {
                    title: "Dimensions",
                    value: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with Best-In-Class Warranty",
                },
                {
                    value: "Long Lasting Battery Life for an unlimited flow of energy ",
                },
                {
                    value: "Tuff Futuristic Design to complement the aesthetics of your home",
                },
                {
                    value: "High Charge Acceptance For Higher Backup",
                },
                {
                    value: "Low Maintenance for an effortless experience",
                },
            ],
            additionalInfo: [
                {
                    title: "Manufacturer",
                    value: "Livguard",
                },
                {
                    title: "Item Weight",
                    value: "54.2 ± 3%",
                },
                {
                    title: "Country Of Origin",
                    value: "India",
                },
            ],
            productDescription: {
                description:
                    "With our Livguard battery at your home, experience what limitless energy feels like. Built with a 3D grid design and high storage capacity, Livguard inverter batteries deliver satisfactory performance every time, with long and durable battery life",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -1666TT/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1666TT/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1666TT/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1639TT",
                    imageRelativePath: "/livguard/battery images/IT 1639TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1639TT",
                },
                {
                    title: "IT1645TT",
                    imageRelativePath: "/livguard/battery images/IT 1645TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1645TT",
                },
                {
                    title: "IT1860TT",
                    imageRelativePath: "/livguard/battery images/IT 1860TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1860TT",
                },
                {
                    title: "IT1866TT",
                    imageRelativePath: "/livguard/battery images/IT 1866TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1866TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "Livguard INVERTUFF Tall Tubular battery 160 Ah online",
                description: "Buy Livguard INVERTUFF Tall Tubular Jumbo 160 Ah Battery with 42+24* Months warranty, which is a suitable inverter battery for small offices, homes, and small shops.",
                canonicalUrl: `/product/it1666tt`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "IT1666TT",
                    "url": "https://www.livguard.com/product/IT1666TT",
                    "image": "https://growthjockey.imgix.net/livguard/battery%20images/IT%201666TT.png?w=508",
                    "description": "",
                    "brand": {
                            "@type": "Brand",
                            "name": "Livgaurd"
                    }
            }

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -1666TT/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1666TT/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1666TT/infographic/3.jpg",
                },
            ],
            title: "लिवगार्ड INVERTUFF टॉल ट्यूबलर 160 Ah बैटरी 42+24* महीने की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "42 + 24* महीने वारंटी",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "160 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "टॉल ट्यूबुलर",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            specifications: [
                {
                    title: "मॉडल संख्या",
                    value: "INVERTUFF",
                },
                {
                    title: "वारंटी ",
                    value: "42 + 24* महीने",
                },
                {
                    title: "पैकेज सामग्री",
                    value: "इन्वर्टर बैटरी, वारंटी कार्ड, फ्लोट इंडिकेटर, पेट्रोलियम जेली, नट बोल्ट सेट",
                },
                {
                    title: "रेटिंग",
                    value: "160 Ah",
                },
                {
                    title: "आयाम",
                    value: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            features: [
                {
                    value: "मन की शांति सर्वोत्तम वारंटी वारंटी के साथ",
                },
                {
                    value: "ऊर्जा के असीमित प्रवाह के लिए लंबे समय तक चलने वाली बैटरी लाइफ़",
                },
                {
                    value: "आधुनिक Tuff बनावट जो आपके घर की सुंदरता को भी बढ़ाये",
                },
                {
                    value: "उच्च बैकअप के लिए उच्च शुल्क स्वीकृति",
                },
                {
                    value: "सहज अनुभव के लिए कम मेंटेनेंस",
                },
            ],
            additionalInfo: [
                {
                    title: " उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "54.2 ± 3%",
                },
                {
                    title: "मूल का देश ",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -1666TT/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1666TT/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1666TT/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1639TT",
                    imageRelativePath: "/livguard/battery images/IT 1639TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1639TT",
                },
                {
                    title: "IT1645TT",
                    imageRelativePath: "/livguard/battery images/IT 1645TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1645TT",
                },
                {
                    title: "IT1860TT",
                    imageRelativePath: "/livguard/battery images/IT 1860TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1860TT",
                },
                {
                    title: "IT1866TT",
                    imageRelativePath: "/livguard/battery images/IT 1866TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1866TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    IT1639TT: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -1639TT/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1639TT/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1639TT/infographic/3.jpg",
                },
            ],
            title: " Livguard INVERTUFF Tall Tubular 160 Ah Battery with 21+18* Months Warranty",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "21 + 18* Months Warranty",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "160 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "Tall Tubular",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "INVERTUFF",
                },
                {
                    title: "Warranty",
                    value: "21 + 18* Months",
                },
                {
                    title: "Package Contents",
                    value: "Inverter Battery, Warranty card, Float Indicator, Petroleum Jelly, Nut bolt set",
                },
                {
                    title: "Rating",
                    value: "160 Ah",
                },
                {
                    title: "Dimensions",
                    value: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with Best-In-Class Warranty",
                },
                {
                    value: "Long Lasting Battery Life for an unlimited flow of energy ",
                },
                {
                    value: "Tuff Futuristic Design to complement the aesthetics of your home",
                },
                {
                    value: "High Charge Acceptance For Higher Backup",
                },
                {
                    value: "Low Maintenance for an effortless experience",
                },
            ],
            additionalInfo: [
                {
                    title: "Manufacturer",
                    value: "Livguard",
                },
                {
                    title: "Item Weight",
                    value: "52.8 ± 3%",
                },
                {
                    title: "Country Of Origin",
                    value: "India",
                },
            ],
            productDescription: {
                description:
                    "With our Livguard battery at your home, experience what limitless energy feels like. Built with a 3D grid design and high storage capacity, Livguard inverter batteries deliver satisfactory performance every time, with long and durable battery life",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -1639TT/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1639TT/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1639TT/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1645TT",
                    imageRelativePath: "/livguard/battery images/IT 1645TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1645TT",
                },
                {
                    title: "IT1860TT",
                    imageRelativePath: "/livguard/battery images/IT 1860TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1860TT",
                },
                {
                    title: "IT1866TT",
                    imageRelativePath: "/livguard/battery images/IT 1866TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1866TT",
                },
                {
                    title: "IT2060TT",
                    imageRelativePath: "/livguard/battery images/IT 2060TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2060TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "Livguard 160 Ah Tall Tubular with 39 months warranty",
                description: "Get an INVERTUFF Tall Tubular 160 Ah Battery with a 21+18* Months warranty from Livguard online and enjoy a constant supply of electrical power.",
                canonicalUrl: `/product/it1639tt`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "IT1639TT",
                    "url": "https://www.livguard.com/product/IT1639TT",
                    "image": "https://growthjockey.imgix.net/livguard/battery%20images/IT%201639TT.png?w=508",
                    "description": "",
                    "brand": {
                            "@type": "Brand",
                            "name": "Livgaurd"
                    }
            }

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -1639TT/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1639TT/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1639TT/infographic/3.jpg",
                },
            ],
            title: "लिवगार्ड INVERTUFF टॉल ट्यूबलर  160 Ah बैटरी 21+18* महीने की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "21 + 18* महीने वारंटी",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "160 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "टॉल ट्यूबुलर ",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "505 (L) X 188 (W) X  410 (H)",
                },
            ],
            specifications: [
                {
                    title: "मॉडल संख्या",
                    value: "INVERTUFF",
                },
                {
                    title: "वारंटी ",
                    value: "21 + 18* महीने",
                },
                {
                    title: "पैकेज सामग्री",
                    value: "इन्वर्टर बैटरी, वारंटी कार्ड, फ्लोट इंडिकेटर, पेट्रोलियम जेली, नट बोल्ट सेट",
                },
                {
                    title: "रेटिंग",
                    value: "160 Ah",
                },
                {
                    title: "आयाम",
                    value: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            features: [
                {
                    value: "मन की शांति सर्वोत्तम वारंटी वारंटी के साथ",
                },
                {
                    value: "ऊर्जा के असीमित प्रवाह के लिए लंबे समय तक चलने वाली बैटरी लाइफ़",
                },
                {
                    value: "आधुनिक Tuff बनावट जो आपके घर की सुंदरता को भी बढ़ाये",
                },
                {
                    value: "उच्च बैकअप के लिए उच्च शुल्क स्वीकृति",
                },
                {
                    value: "सहज अनुभव के लिए कम मेंटेनेंस",
                },
            ],
            additionalInfo: [
                {
                    title: " उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "52.8 ± 3%",
                },
                {
                    title: "मूल का देश ",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -1639TT/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1639TT/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1639TT/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1645TT",
                    imageRelativePath: "/livguard/battery images/IT 1645TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1645TT",
                },
                {
                    title: "IT1860TT",
                    imageRelativePath: "/livguard/battery images/IT 1860TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1860TT",
                },
                {
                    title: "IT1866TT",
                    imageRelativePath: "/livguard/battery images/IT 1866TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1866TT",
                },
                {
                    title: "IT2060TT",
                    imageRelativePath: "/livguard/battery images/IT 2060TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2060TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    IT1645TT: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -1645TT/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1645TT/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1645TT/infographic/3.jpg",
                },
            ],
            title: " Livguard INVERTUFF Tall Tubular 160 Ah Battery with 27+18* Months Warranty",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "27 + 18* Months Warranty",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "160 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "Tall Tubular",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "INVERTUFF",
                },
                {
                    title: "Warranty",
                    value: "27 + 18* Months",
                },
                {
                    title: "Package Contents",
                    value: "Inverter Battery, Warranty card, Float Indicator, Petroleum Jelly, Nut bolt set",
                },
                {
                    title: "Rating",
                    value: "160 Ah",
                },
                {
                    title: "Dimensions",
                    value: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with Best-In-Class Warranty",
                },
                {
                    value: "Long Lasting Battery Life for an unlimited flow of energy ",
                },
                {
                    value: "Tuff Futuristic Design to complement the aesthetics of your home",
                },
                {
                    value: "High Charge Acceptance For Higher Backup",
                },
                {
                    value: "Low Maintenance for an effortless experience",
                },
            ],
            additionalInfo: [
                {
                    title: "Manufacturer",
                    value: "Livguard",
                },
                {
                    title: "Item Weight",
                    value: "54.9 ± 3%",
                },
                {
                    title: "Country Of Origin",
                    value: "India",
                },
            ],
            productDescription: {
                description:
                    "With our Livguard battery at your home, experience what limitless energy feels like. Built with a 3D grid design and high storage capacity, Livguard inverter batteries deliver satisfactory performance every time, with long and durable battery life",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -1645TT/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1645TT/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1645TT/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1860TT",
                    imageRelativePath: "/livguard/battery images/IT 1860TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1860TT",
                },
                {
                    title: "IT1866TT",
                    imageRelativePath: "/livguard/battery images/IT 1866TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1866TT",
                },
                {
                    title: "IT2060TT",
                    imageRelativePath: "/livguard/battery images/IT 2060TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2060TT",
                },
                {
                    title: "IT2066TT",
                    imageRelativePath: "/livguard/battery images/IT 2066TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2066TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "Livguard Tall Tubular 160 Ah battery with 45 months warranty",
                description: "The Livguard INVERTUFF Tall Tubular 160 Ah Battery with a 27+18* month warranty is built with a 3D grid design and high storage capacity. ",
                canonicalUrl: `/product/it1645tt`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "IT1645TT",
                    "url": "https://www.livguard.com/product/IT1645TT",
                    "image": "https://growthjockey.imgix.net/livguard/battery%20images/IT%201645TT.png?w=508",
                    "description": "",
                    "brand": {
                            "@type": "Brand",
                            "name": "Livgaurd"
                    }
            }

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -1645TT/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1645TT/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1645TT/infographic/3.jpg",
                },
            ],
            title: "लिवगार्ड INVERTUFF टॉल ट्यूबलर 160 Ah बैटरी 27+18* महीने की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "27 + 18* महीने वारंटी",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "160 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "टॉल ट्यूबुलर ",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "505 (L) X 188 (W) X  410 (H)",
                },
            ],
            specifications: [
                {
                    title: "मॉडल संख्या",
                    value: "INVERTUFF",
                },
                {
                    title: "वारंटी",
                    value: "21 + 18* महीने",
                },
                {
                    title: "पैकेज सामग्री",
                    value: "इन्वर्टर बैटरी, वारंटी कार्ड, फ्लोट इंडिकेटर, पेट्रोलियम जेली, नट बोल्ट सेट",
                },
                {
                    title: "रेटिंग",
                    value: "160 Ah",
                },
                {
                    title: "आयाम",
                    value: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            features: [
                {
                    value: "मन की शांति सर्वोत्तम वारंटी वारंटी के साथ",
                },
                {
                    value: "ऊर्जा के असीमित प्रवाह के लिए लंबे समय तक चलने वाली बैटरी लाइफ़",
                },
                {
                    value: "आधुनिक Tuff बनावट जो आपके घर की सुंदरता को भी बढ़ाये",
                },
                {
                    value: "उच्च बैकअप के लिए उच्च शुल्क स्वीकृति",
                },
                {
                    value: "सहज अनुभव के लिए कम मेंटेनेंस",
                },
            ],
            additionalInfo: [
                {
                    title: "उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "54.9 ± 3%",
                },
                {
                    title: "मूल का देश ",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -1645TT/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1645TT/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1645TT/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1860TT",
                    imageRelativePath: "/livguard/battery images/IT 1860TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1860TT",
                },
                {
                    title: "IT1866TT",
                    imageRelativePath: "/livguard/battery images/IT 1866TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1866TT",
                },
                {
                    title: "IT2060TT",
                    imageRelativePath: "/livguard/battery images/IT 2060TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2060TT",
                },
                {
                    title: "IT2066TT",
                    imageRelativePath: "/livguard/battery images/IT 2066TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2066TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    IT1860TT: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -1860TT/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1860TT/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1860TT/infographic/3.jpg",
                },
            ],
            title: " Livguard INVERTUFF Tall Tubular 180 Ah Battery with 36+24* Months Warranty",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops),",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "36 + 24* Months Warranty",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "180 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "Tall Tubular",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "INVERTUFF",
                },
                {
                    title: "Warranty",
                    value: "36 + 24* Months",
                },
                {
                    title: "Package Contents",
                    value: "Inverter Battery, Warranty card, Float Indicator, Petroleum Jelly, Nut bolt set",
                },
                {
                    title: "Rating",
                    value: "180 Ah",
                },
                {
                    title: "Dimensions",
                    value: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with Best-In-Class Warranty",
                },
                {
                    value: "Long Lasting Battery Life for an unlimited flow of energy ",
                },
                {
                    value: "Tuff Futuristic Design to complement the aesthetics of your home",
                },
                {
                    value: "High Charge Acceptance For Higher Backup",
                },
                {
                    value: "Low Maintenance for an effortless experience",
                },
            ],
            additionalInfo: [
                {
                    title: "Manufacturer",
                    value: "Livguard",
                },
                {
                    title: "Item Weight",
                    value: "55.0 ± 3%",
                },
                {
                    title: "Country Of Origin",
                    value: "India",
                },
            ],
            productDescription: {
                description:
                    "With our Livguard battery at your home, experience what limitless energy feels like. Built with a 3D grid design and high storage capacity, Livguard inverter batteries deliver satisfactory performance every time, with long and durable battery life",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -1860TT/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1860TT/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1860TT/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1866TT",
                    imageRelativePath: "/livguard/battery images/IT 1866TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1866TT",
                },
                {
                    title: "IT2060TT",
                    imageRelativePath: "/livguard/battery images/IT 2060TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2060TT",
                },
                {
                    title: "IT2066TT",
                    imageRelativePath: "/livguard/battery images/IT 2066TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2066TT",
                },
                {
                    title: "IT2048TT",
                    imageRelativePath: "/livguard/battery images/IT 2048TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2048TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "Buy INVERTUFF Tall Tubular 180 Ah - Livguard Online",
                description: "Livguard INVERTUFF Tall Tubular 180 Ah Battery delivers satisfactory performance every time, with long and durable battery life and a 36+24* Months warranty. ",
                canonicalUrl: `/product/it1860tt`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "IT1860TT",
                    "url": "https://www.livguard.com/product/IT1860TT",
                    "image": "https://growthjockey.imgix.net/livguard/battery%20images/IT%201860TT.png?w=508",
                    "description": "",
                    "brand": {
                            "@type": "Brand",
                            "name": "Livgaurd"
                    }
            }

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -1860TT/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1860TT/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1860TT/infographic/3.jpg",
                },
            ],
            title: "लिवगार्ड INVERTUFF टॉल ट्यूबलर 180 Ah बैटरी 36+24* महीने की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "36 + 24* महीने वारंटी",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "180 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "टॉल ट्यूबुलर ",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "505 (L) X 188 (W) X  410 (H)",
                },
            ],
            specifications: [
                {
                    title: "मॉडल संख्या",
                    value: "INVERTUFF",
                },
                {
                    title: "वारंटी ",
                    value: "36 + 24* महीने",
                },
                {
                    title: "पैकेज सामग्री",
                    value: "इन्वर्टर बैटरी, वारंटी कार्ड, फ्लोट इंडिकेटर, पेट्रोलियम जेली, नट बोल्ट सेट",
                },
                {
                    title: "रेटिंग",
                    value: "180 Ah",
                },
                {
                    title: "आयाम",
                    value: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            features: [
                {
                    value: "मन की शांति सर्वोत्तम वारंटी वारंटी के साथ",
                },
                {
                    value: "ऊर्जा के असीमित प्रवाह के लिए लंबे समय तक चलने वाली बैटरी लाइफ़",
                },
                {
                    value: "आधुनिक Tuff बनावट जो आपके घर की सुंदरता को भी बढ़ाये",
                },
                {
                    value: "उच्च बैकअप के लिए उच्च शुल्क स्वीकृति",
                },
                {
                    value: "सहज अनुभव के लिए कम मेंटेनेंस",
                },
            ],
            additionalInfo: [
                {
                    title: " उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "55.0 ± 3%",
                },
                {
                    title: "मूल का देश ",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -1860TT/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1860TT/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1860TT/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1866TT",
                    imageRelativePath: "/livguard/battery images/IT 1866TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1866TT",
                },
                {
                    title: "IT2060TT",
                    imageRelativePath: "/livguard/battery images/IT 2060TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2060TT",
                },
                {
                    title: "IT2066TT",
                    imageRelativePath: "/livguard/battery images/IT 2066TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2066TT",
                },
                {
                    title: "IT2048TT",
                    imageRelativePath: "/livguard/battery images/IT 2048TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2048TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    IT2048TT: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -2048TT/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -2048TT/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -2048TT/infographic/3.jpg",
                },
            ],
            title: " Livguard INVERTUFF Tall Tubular 200 Ah Battery with 24+24* Months Warranty",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "24 + 24* Months Warranty",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "200 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "Tall Tubular",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "INVERTUFF",
                },
                {
                    title: "Warranty",
                    value: "24 + 24* Months",
                },
                {
                    title: "Package Contents",
                    value: "Inverter Battery, Warranty card, Float Indicator, Petroleum Jelly, Nut bolt set",
                },
                {
                    title: "Rating",
                    value: "200 Ah",
                },
                {
                    title: "Dimensions",
                    value: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with Best-In-Class Warranty",
                },
                {
                    value: "Long Lasting Battery Life for an unlimited flow of energy ",
                },
                {
                    value: "Tuff Futuristic Design to complement the aesthetics of your home",
                },
                {
                    value: "High Charge Acceptance For Higher Backup",
                },
                {
                    value: "Low Maintenance for an effortless experience",
                },
            ],
            additionalInfo: [
                {
                    title: "Manufacturer",
                    value: "Livguard",
                },
                {
                    title: "Item Weight",
                    value: "51.3 ± 3%",
                },
                {
                    title: "Country Of Origin",
                    value: "India",
                },
            ],
            productDescription: {
                description:
                    "With our Livguard battery at your home, experience what limitless energy feels like. Built with a 3D grid design and high storage capacity, Livguard inverter batteries deliver satisfactory performance every time, with long and durable battery life",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -2048TT/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -2048TT/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -2048TT/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT2266TT",
                    imageRelativePath: "/livguard/battery images/IT 2266TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2266TT",
                },
                {
                    title: "IT2360TT",
                    imageRelativePath: "/livguard/battery images/IT 2360TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2360TT",
                },
                {
                    title: "IT2672TT",
                    imageRelativePath: "/livguard/battery images/IT 2672TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2672TT",
                },
                {
                    title: "IT2066TT",
                    imageRelativePath: "/livguard/battery images/IT 2066TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2066TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "Livguard INVERTUFF Tall Tubular 200 Ah Battery online",
                description: "Buy Livguard INVERTUFF Tall tubular 200 Ah battery with 24+24* months warranty, suitable for small offices, homes, and small shops. ",
                canonicalUrl: `/product/it2048tt`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "IT2048TT",
                    "url": "https://www.livguard.com/product/IT2048TT",
                    "image": "https://growthjockey.imgix.net/livguard/battery%20images/IT%202048TT.png?w=508",
                    "description": "",
                    "brand": {
                            "@type": "Brand",
                            "name": "Livgaurd"
                    }
            }

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -2048TT/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -2048TT/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -2048TT/infographic/3.jpg",
                },
            ],
            title: "लिवगार्ड INVERTUFF टॉल ट्यूबलर 200 Ah बैटरी 24+24* महीने की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "24 + 24* महीने वारंटी",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "200 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "टॉल ट्यूबुलर ",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "505 (L) X 188 (W) X  410 (H)",
                },
            ],
            specifications: [
                {
                    title: "मॉडल संख्या",
                    value: "INVERTUFF",
                },
                {
                    title: "वारंटी ",
                    value: "24 + 24* महीने",
                },
                {
                    title: "पैकेज सामग्री",
                    value: "इन्वर्टर बैटरी, वारंटी कार्ड, फ्लोट इंडिकेटर, पेट्रोलियम जेली, नट बोल्ट सेट",
                },
                {
                    title: "रेटिंग",
                    value: "200 Ah",
                },
                {
                    title: "आयाम",
                    value: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            features: [
                {
                    value: "मन की शांति सर्वोत्तम वारंटी वारंटी के साथ",
                },
                {
                    value: "ऊर्जा के असीमित प्रवाह के लिए लंबे समय तक चलने वाली बैटरी लाइफ़",
                },
                {
                    value: "आधुनिक Tuff बनावट जो आपके घर की सुंदरता को भी बढ़ाये",
                },
                {
                    value: "उच्च बैकअप के लिए उच्च शुल्क स्वीकृति",
                },
                {
                    value: "सहज अनुभव के लिए कम मेंटेनेंस",
                },
            ],
            additionalInfo: [
                {
                    title: " उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "51.3 ± 3%",
                },
                {
                    title: "मूल का देश ",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -2048TT/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -2048TT/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -2048TT/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT2266TT",
                    imageRelativePath: "/livguard/battery images/IT 2266TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2266TT",
                },
                {
                    title: "IT2360TT",
                    imageRelativePath: "/livguard/battery images/IT 2360TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2360TT",
                },
                {
                    title: "IT2672TT",
                    imageRelativePath: "/livguard/battery images/IT 2672TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2672TT",
                },
                {
                    title: "IT2066TT",
                    imageRelativePath: "/livguard/battery images/IT 2066TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2066TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    IT1866TT: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -1866TT/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1866TT/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1866TT/infographic/3.jpg",
                },
            ],
            title: " Livguard INVERTUFF Tall Tubular 180 Ah Battery with 42+24* Months Warranty",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "42 + 24* Months Warranty",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "180 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "Tall Tubular",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "INVERTUFF",
                },
                {
                    title: "Warranty",
                    value: "42 + 24* Months",
                },
                {
                    title: "Package Contents",
                    value: "Inverter Battery, Warranty card, Float Indicator, Petroleum Jelly, Nut bolt set",
                },
                {
                    title: "Rating",
                    value: "180 Ah",
                },
                {
                    title: "Dimensions",
                    value: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with Best-In-Class Warranty",
                },
                {
                    value: "Long Lasting Battery Life for an unlimited flow of energy ",
                },
                {
                    value: "Tuff Futuristic Design to complement the aesthetics of your home",
                },
                {
                    value: "High Charge Acceptance For Higher Backup",
                },
                {
                    value: "Low Maintenance for an effortless experience",
                },
            ],
            additionalInfo: [
                {
                    title: "Manufacturer",
                    value: "Livguard",
                },
                {
                    title: "Item Weight",
                    value: "55.0 ± 3%",
                },
                {
                    title: "Country Of Origin",
                    value: "India",
                },
            ],
            productDescription: {
                description:
                    "With our Livguard battery at your home, experience what limitless energy feels like. Built with a 3D grid design and high storage capacity, Livguard inverter batteries deliver satisfactory performance every time, with long and durable battery life",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -1866TT/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1866TT/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1866TT/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT2060TT",
                    imageRelativePath: "/livguard/battery images/IT 2060TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2060TT",
                },
                {
                    title: "IT2066TT",
                    imageRelativePath: "/livguard/battery images/IT 2066TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2066TT",
                },
                {
                    title: "IT2048TT",
                    imageRelativePath: "/livguard/battery images/IT 2048TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2048TT",
                },
                {
                    title: "IT2266TT",
                    imageRelativePath: "/livguard/battery images/IT 2266TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2266TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "Tall Tubular 180 Ah battery with 66 months warranty- Livguard",
                description: "Buy Livguard INVERTUFF Tall Tubular 180 Ah Battery with 42+24* Months warranty, which is a suitable Inverter for small offices, homes, and small shops",
                canonicalUrl: `/product/it1866tt`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "IT1866TT",
                    "url": "https://www.livguard.com/product/IT1866TT",
                    "image": "https://growthjockey.imgix.net/livguard/battery%20images/IT%201866TT.png?w=508",
                    "description": "",
                    "brand": {
                            "@type": "Brand",
                            "name": "Livgaurd"
                    }
            }

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -1866TT/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1866TT/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1866TT/infographic/3.jpg",
                },
            ],
            title: "लिवगार्ड INVERTUFF टॉल ट्यूबलर 180 Ah बैटरी 42+24* महीने की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "42 + 24* महीने वारंटी",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "180 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: " टॉल ट्यूबुलर ",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "505 (L) X 188 (W) X  410 (H)",
                },
            ],
            specifications: [
                {
                    title: "मॉडल संख्या",
                    value: "INVERTUFF",
                },
                {
                    title: "वारंटी ",
                    value: "42 + 24* महीने",
                },
                {
                    title: "पैकेज सामग्री",
                    value: "इन्वर्टर बैटरी, वारंटी कार्ड, फ्लोट इंडिकेटर, पेट्रोलियम जेली, नट बोल्ट सेट",
                },
                {
                    title: "रेटिंग",
                    value: "180 Ah",
                },
                {
                    title: "आयाम",
                    value: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            features: [
                {
                    value: "मन की शांति सर्वोत्तम वारंटी वारंटी के साथ",
                },
                {
                    value: "ऊर्जा के असीमित प्रवाह के लिए लंबे समय तक चलने वाली बैटरी लाइफ़",
                },
                {
                    value: "आधुनिक Tuff बनावट जो आपके घर की सुंदरता को भी बढ़ाये",
                },
                {
                    value: "उच्च बैकअप के लिए उच्च शुल्क स्वीकृति",
                },
                {
                    value: "सहज अनुभव के लिए कम मेंटेनेंस",
                },
            ],
            additionalInfo: [
                {
                    title: " उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "55.0 ± 3%",
                },
                {
                    title: "मूल का देश ",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -1866TT/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1866TT/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1866TT/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT2060TT",
                    imageRelativePath: "/livguard/battery images/IT 2060TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2060TT",
                },
                {
                    title: "IT2066TT",
                    imageRelativePath: "/livguard/battery images/IT 2066TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2066TT",
                },
                {
                    title: "IT2048TT",
                    imageRelativePath: "/livguard/battery images/IT 2048TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2048TT",
                },
                {
                    title: "IT2266TT",
                    imageRelativePath: "/livguard/battery images/IT 2266TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2266TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    IT1636STJ: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -1636STJ/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1636STJ/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1636STJ/infographic/3.jpg",
                },
            ],
            title: " Livguard INVERTUFF Short Jumbo Tubular 160 Ah Battery with 18+18* Months Warranty",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "18 + 18* Months Warranty",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "160 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "Short Jumbo Tubular",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "505 (L) X 188 (W) X 367 (H)",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "INVERTUFF",
                },
                {
                    title: "Warranty",
                    value: "18 + 18* Months",
                },
                {
                    title: "Package Contents",
                    value: "Inverter Battery, Warranty card, Float Indicator, Petroleum Jelly, Nut bolt set",
                },
                {
                    title: "Rating",
                    value: "160 Ah",
                },
                {
                    title: "Dimensions",
                    value: "505 (L) X 188 (W) X 367 (H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with Best-In-Class Warranty",
                },
                {
                    value: "Long Lasting Battery Life for an unlimited flow of energy ",
                },
                {
                    value: "Tuff Futuristic Design to complement the aesthetics of your home",
                },
                {
                    value: "High Charge Acceptance For Higher Backup",
                },
                {
                    value: "Low Maintenance for an effortless experience",
                },
            ],
            additionalInfo: [
                {
                    title: "Manufacturer",
                    value: "Livguard",
                },
                {
                    title: "Item Weight",
                    value: "51.3 ± 3%",
                },
                {
                    title: "Country Of Origin",
                    value: "India",
                },
            ],
            productDescription: {
                description:
                    "With our Livguard battery at your home, experience what limitless energy feels like. Built with a 3D grid design and high storage capacity, Livguard inverter batteries deliver satisfactory performance every time, with long and durable battery life",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -1636STJ/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1636STJ/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -1636STJ/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1554STJ",
                    imageRelativePath: "/livguard/battery images/IT 1554STJ.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1554STJ",
                },
                {
                    title: "IT1554TT",
                    imageRelativePath: "/livguard/battery images/IT 1554TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/IT1554TT",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/battery images/IT 1560TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/IT1560TT",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/battery images/IT 1560TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1560TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "INVERTUFF Short Tubular Jumbo160 Ah battery - Livguard online",
                description: "Get an INVERTUFF short tubular 160 Ah inverter battery online from Livguard with an 18+18* warranty; ideal for households, small shops, and workplaces.",
                canonicalUrl: `/product/it1636stj`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "IT1636STJ",
                    "url": "https://www.livguard.com/product/IT1636STJ",
                    "image": "https://growthjockey.imgix.net/livguard/battery%20images/IT%201636STJ.png?w=508",
                    "description": "",
                    "brand": {
                            "@type": "Brand",
                            "name": "Livgaurd"
                    }
            }
            </s

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -1636STJ/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1636STJ/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -1636STJ/infographic/3.jpg",
                },
            ],
            title: "लिवगार्ड INVERTUFF शोर्ट जंबो ट्यूबुलर 160 Ah बैटरी 18+18* महीने की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "18 + 18* महीने वारंटी",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "160 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: " शोर्ट जंबो ट्यूबुलर ",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "520 (L) X 275 (W) X  282 (H)",
                },
            ],
            specifications: [
                {
                    title: "मॉडल संख्या",
                    value: "INVERTUFF",
                },
                {
                    title: "वारंटी ",
                    value: "42 + 24* महीने",
                },
                {
                    title: "पैकेज सामग्री",
                    value: "इन्वर्टर बैटरी, वारंटी कार्ड, फ्लोट इंडिकेटर, पेट्रोलियम जेली, नट बोल्ट सेट",
                },
                {
                    title: "रेटिंग",
                    value: "160 Ah",
                },
                {
                    title: "आयाम",
                    value: "520 (L) X 275 (W) X 282 (H)",
                },
            ],
            features: [
                {
                    value: "मन की शांति सर्वोत्तम वारंटी वारंटी के साथ",
                },
                {
                    value: "ऊर्जा के असीमित प्रवाह के लिए लंबे समय तक चलने वाली बैटरी लाइफ़",
                },
                {
                    value: "आधुनिक Tuff बनावट जो आपके घर की सुंदरता को भी बढ़ाये",
                },
                {
                    value: "उच्च बैकअप के लिए उच्च शुल्क स्वीकृति",
                },
                {
                    value: "सहज अनुभव के लिए कम मेंटेनेंस",
                },
            ],
            additionalInfo: [
                {
                    title: " उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "51.3 ± 3%",
                },
                {
                    title: "मूल का देश ",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery  1636STJ/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery  1636STJ/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery  1636STJ/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1554STJ",
                    imageRelativePath: "/livguard/battery images/IT 1554STJ.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1554STJ",
                },
                {
                    title: "IT1554TT",
                    imageRelativePath: "/livguard/battery images/IT 1554TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/IT1554TT",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/battery images/IT 1560TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/IT1560TT",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/battery images/IT 1560TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1560TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    IT2060TT: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -2060TT/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -2060TT/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -2060TT/infographic/3.jpg",
                },
            ],
            title: " Livguard INVERTUFF Tall Tubular 200 Ah Battery with 36+24* Months Warranty",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "36 + 24* Months Warranty",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "200 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "Tall Tubular",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "INVERTUFF",
                },
                {
                    title: "Warranty",
                    value: "36 + 24* Months",
                },
                {
                    title: "Package Contents",
                    value: "Inverter Battery, Warranty card, Float Indicator, Petroleum Jelly, Nut bolt set",
                },
                {
                    title: "Rating",
                    value: "160 Ah",
                },
                {
                    title: "Dimensions",
                    value: "505 (L) X 188 (W) X 210 (H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with Best-In-Class Warranty",
                },
                {
                    value: "Long Lasting Battery Life for an unlimited flow of energy ",
                },
                {
                    value: "Tuff Futuristic Design to complement the aesthetics of your home",
                },
                {
                    value: "High Charge Acceptance For Higher Backup",
                },
                {
                    value: "Low Maintenance for an effortless experience",
                },
            ],
            additionalInfo: [
                {
                    title: "Manufacturer",
                    value: "Livguard",
                },
                {
                    title: "Item Weight",
                    value: "51.3 ± 3%",
                },
                {
                    title: "Country Of Origin",
                    value: "India",
                },
            ],
            productDescription: {
                description:
                    "With our Livguard battery at your home, experience what limitless energy feels like. Built with a 3D grid design and high storage capacity, Livguard inverter batteries deliver satisfactory performance every time, with long and durable battery life",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -2060TT/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -2060TT/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -2060TT/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT2066TT",
                    imageRelativePath: "/livguard/battery images/IT 2066TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2066TT",
                },
                {
                    title: "IT2048TT",
                    imageRelativePath: "/livguard/battery images/IT 2048TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2048TT",
                },
                {
                    title: "IT2266TT",
                    imageRelativePath: "/livguard/battery images/IT 2266TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2266TT",
                },
                {
                    title: "IT2360TT",
                    imageRelativePath: "/livguard/battery images/IT 2360TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2360TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "Buy INVERTUFF Tall Tubular 200 Ah - Livguard Online",
                description: "Get Livguard INVERTUFF Tall Tubular 200 Ah Battery with 36+ 24*  months warranty. It is a suitable inverter for small offices, homes, and small shops.",
                canonicalUrl: `/product/it2060tt`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "IT2060TT",
                    "url": "https://www.livguard.com/product/IT2060TT",
                    "image": "https://growthjockey.imgix.net/livguard/battery%20images/IT%202060TT.png?w=508",
                    "description": "",
                    "brand": {
                            "@type": "Brand",
                            "name": "Livgaurd"
                    }
            }

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -2060TT/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -2060TT/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -2060TT/infographic/3.jpg",
                },
            ],
            title: "लिवगार्ड INVERTUFF टॉल ट्यूबलर 200 Ah बैटरी 36+24* महीने की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "36 + 24* महीने वारंटी",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "200 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "टॉल ट्यूबुलर ",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "520 (L) X 275 (W) X  282 (H)",
                },
            ],
            specifications: [
                {
                    title: "मॉडल संख्या",
                    value: "INVERTUFF",
                },
                {
                    title: "वारंटी ",
                    value: "36 + 24* महीने",
                },
                {
                    title: "पैकेज सामग्री",
                    value: "इन्वर्टर बैटरी, वारंटी कार्ड, फ्लोट इंडिकेटर, पेट्रोलियम जेली, नट बोल्ट सेट",
                },
                {
                    title: "रेटिंग",
                    value: "200 Ah",
                },
                {
                    title: "आयाम",
                    value: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            features: [
                {
                    value: "मन की शांति सर्वोत्तम वारंटी वारंटी के साथ",
                },
                {
                    value: "ऊर्जा के असीमित प्रवाह के लिए लंबे समय तक चलने वाली बैटरी लाइफ़",
                },
                {
                    value: "आधुनिक Tuff बनावट जो आपके घर की सुंदरता को भी बढ़ाये",
                },
                {
                    value: "उच्च बैकअप के लिए उच्च शुल्क स्वीकृति",
                },
                {
                    value: "सहज अनुभव के लिए कम मेंटेनेंस",
                },
            ],
            additionalInfo: [
                {
                    title: "उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "51.3 ± 3%",
                },
                {
                    title: "मूल का देश ",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -2060TT/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -2060TT/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -2060TT/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT2066TT",
                    imageRelativePath: "/livguard/battery images/IT 2066TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2066TT",
                },
                {
                    title: "IT2048TT",
                    imageRelativePath: "/livguard/battery images/IT 2048TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2048TT",
                },
                {
                    title: "IT2266TT",
                    imageRelativePath: "/livguard/battery images/IT 2266TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2266TT",
                },
                {
                    title: "IT2360TT",
                    imageRelativePath: "/livguard/battery images/IT 2360TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2360TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    IT2066TT: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -2066TT/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -2066TT/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -2066TT/infographic/3.jpg",
                },
            ],
            title: " Livguard INVERTUFF Tall Tubular 200 Ah Battery with 42+24* Months Warranty",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "42 + 24* Months Warranty",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "200 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "Tall Tubular",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "INVERTUFF",
                },
                {
                    title: "Warranty",
                    value: "42 + 24* Months",
                },
                {
                    title: "Package Contents",
                    value: "Inverter Battery, Warranty card, Float Indicator, Petroleum Jelly, Nut bolt set",
                },
                {
                    title: "Rating",
                    value: "200 Ah",
                },
                {
                    title: "Dimensions",
                    value: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with Best-In-Class Warranty",
                },
                {
                    value: "Long Lasting Battery Life for an unlimited flow of energy ",
                },
                {
                    value: "Tuff Futuristic Design to complement the aesthetics of your home",
                },
                {
                    value: "High Charge Acceptance For Higher Backup",
                },
                {
                    value: "Low Maintenance for an effortless experience",
                },
            ],
            additionalInfo: [
                {
                    title: "Manufacturer",
                    value: "Livguard",
                },
                {
                    title: "Item Weight",
                    value: "58.9 ± 3%",
                },
                {
                    title: "Country Of Origin",
                    value: "India",
                },
            ],
            productDescription: {
                description:
                    "With our Livguard battery at your home, experience what limitless energy feels like. Built with a 3D grid design and high storage capacity, Livguard inverter batteries deliver satisfactory performance every time, with long and durable battery life",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -2066TT/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -2066TT/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -2066TT/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT2048TT",
                    imageRelativePath: "/livguard/battery images/IT 2048TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2048TT",
                },
                {
                    title: "IT2266TT",
                    imageRelativePath: "/livguard/battery images/IT 2266TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2266TT",
                },
                {
                    title: "IT2360TT",
                    imageRelativePath: "/livguard/battery images/IT 2360TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2360TT",
                },
                {
                    title: "IT2672TT",
                    imageRelativePath: "/livguard/battery images/IT 2672TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2672TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "Buy INVERTUFF Tall Tubular 200 Ah Battery - Livguard",
                description: "Get Livguard INVERTUFF tall tubular 200 Ah battery with 36 +24* months warranty, a suitable inverter for small offices, homes, and small shops. ",
                canonicalUrl: `/product/it2066tt`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "IT2066TT",
                    "url": "https://www.livguard.com/product/IT2066TT",
                    "image": "https://growthjockey.imgix.net/livguard/battery%20images/IT%202066TT.png?w=508",
                    "description": "",
                    "brand": {
                            "@type": "Brand",
                            "name": "Livgaurd"
                    }
            }

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -2066TT/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -2066TT/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -2066TT/infographic/3.jpg",
                },
            ],
            title: "लिवगार्ड INVERTUFF टॉल ट्यूबलर 200 Ah बैटरी 42+24* महीने की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "42 + 24* महीने वारंटी",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "200 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "टॉल ट्यूबुलर ",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "520 (L) X 275 (W) X  282 (H)",
                },
            ],
            specifications: [
                {
                    title: "मॉडल संख्या",
                    value: "INVERTUFF",
                },
                {
                    title: "वारंटी ",
                    value: "42 + 24* महीने",
                },
                {
                    title: "पैकेज सामग्री",
                    value: "इन्वर्टर बैटरी, वारंटी कार्ड, फ्लोट इंडिकेटर, पेट्रोलियम जेली, नट बोल्ट सेट",
                },
                {
                    title: "रेटिंग",
                    value: "200 Ah",
                },
                {
                    title: "आयाम",
                    value: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            features: [
                {
                    value: "मन की शांति सर्वोत्तम वारंटी वारंटी के साथ",
                },
                {
                    value: "ऊर्जा के असीमित प्रवाह के लिए लंबे समय तक चलने वाली बैटरी लाइफ़",
                },
                {
                    value: "आधुनिक Tuff बनावट जो आपके घर की सुंदरता को भी बढ़ाये",
                },
                {
                    value: "उच्च बैकअप के लिए उच्च शुल्क स्वीकृति",
                },
                {
                    value: "सहज अनुभव के लिए कम मेंटेनेंस",
                },
            ],
            additionalInfo: [
                {
                    title: "उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "58.9 ± 3%",
                },
                {
                    title: "मूल का देश ",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -2066TT/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -2066TT/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -2066TT/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT2048TT",
                    imageRelativePath: "/livguard/battery images/IT 2048TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2048TT",
                },
                {
                    title: "IT2266TT",
                    imageRelativePath: "/livguard/battery images/IT 2266TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2266TT",
                },
                {
                    title: "IT2360TT",
                    imageRelativePath: "/livguard/battery images/IT 2360TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2360TT",
                },
                {
                    title: "IT2672TT",
                    imageRelativePath: "/livguard/battery images/IT 2672TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2672TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    IT2266TT: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -2266TT/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -2266TT/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -2266TT/infographic/3.jpg",
                },
            ],
            title: " Livguard INVERTUFF Tall Tubular 220 Ah Battery with 42+24* Months Warranty",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "42 + 24* Months Warranty",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "220 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "Tall Tubular",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "INVERTUFF",
                },
                {
                    title: "Warranty",
                    value: "42 + 24* Months",
                },
                {
                    title: "Package Contents",
                    value: "Inverter Battery, Warranty card, Float Indicator, Petroleum Jelly, Nut bolt set",
                },
                {
                    title: "Rating",
                    value: "220 Ah",
                },
                {
                    title: "Dimensions",
                    value: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with Best-In-Class Warranty",
                },
                {
                    value: "Long Lasting Battery Life for an unlimited flow of energy ",
                },
                {
                    value: "Tuff Futuristic Design to complement the aesthetics of your home",
                },
                {
                    value: "High Charge Acceptance For Higher Backup",
                },
                {
                    value: "Low Maintenance for an effortless experience",
                },
            ],
            additionalInfo: [
                {
                    title: "Manufacturer",
                    value: "Livguard",
                },
                {
                    title: "Item Weight",
                    value: "63.3 ± 3%",
                },
                {
                    title: "Country Of Origin",
                    value: "India",
                },
            ],
            productDescription: {
                description:
                    "With our Livguard battery at your home, experience what limitless energy feels like. Built with a 3D grid design and high storage capacity, Livguard inverter batteries deliver satisfactory performance every time, with long and durable battery life",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -2266TT/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -2266TT/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -2266TT/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT2360TT",
                    imageRelativePath: "/livguard/battery images/IT 2360TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2360TT",
                },
                {
                    title: "IT2672TT",
                    imageRelativePath: "/livguard/battery images/IT 2672TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2672TT",
                },
                {
                    title: "IT2048TT",
                    imageRelativePath: "/livguard/battery images/IT 2048TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2048TT",
                },
                {
                    title: "IT2066TT",
                    imageRelativePath: "/livguard/battery images/IT 2066TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2066TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "Tall Tubular 220 Ah with 3-year warranty - Livguard",
                description: "Buy Livguard INVERTUFF Tall Tubular 220 Ah battery with 42+24* months warranty. Suitable inverter is for small offices, homes, and small shops?",
                canonicalUrl: `/product/it2266tt`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "IT2266TT",
                    "url": "https://www.livguard.com/product/IT2266TT",
                    "image": "https://growthjockey.imgix.net/livguard/battery%20images/IT%202266TT.png?w=508",
                    "description": "",
                    "brand": {
                            "@type": "Brand",
                            "name": "Livgaurd"
                    }
            }

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -2266TT/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -2266TT/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -2266TT/infographic/3.jpg",
                },
            ],
            title: "लिवगार्ड INVERTUFF टॉल ट्यूबलर 220 Ah बैटरी 42+24* महीने की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "42 + 24* महीने वारंटी",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "220 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "टॉल ट्यूबुलर ",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "505 (L) X 188 (W) X  410 (H)",
                },
            ],
            specifications: [
                {
                    title: "मॉडल संख्या",
                    value: "INVERTUFF",
                },
                {
                    title: "वारंटी ",
                    value: "42 + 24* महीने",
                },
                {
                    title: "पैकेज सामग्री",
                    value: "इन्वर्टर बैटरी, वारंटी कार्ड, फ्लोट इंडिकेटर, पेट्रोलियम जेली, नट बोल्ट सेट",
                },
                {
                    title: "रेटिंग",
                    value: "220 Ah",
                },
                {
                    title: "आयाम",
                    value: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            features: [
                {
                    value: "मन की शांति सर्वोत्तम वारंटी वारंटी के साथ",
                },
                {
                    value: "ऊर्जा के असीमित प्रवाह के लिए लंबे समय तक चलने वाली बैटरी लाइफ़",
                },
                {
                    value: "आधुनिक Tuff बनावट जो आपके घर की सुंदरता को भी बढ़ाये",
                },
                {
                    value: "उच्च बैकअप के लिए उच्च शुल्क स्वीकृति",
                },
                {
                    value: "सहज अनुभव के लिए कम मेंटेनेंस",
                },
            ],
            additionalInfo: [
                {
                    title: "उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "63.3 ± 3%",
                },
                {
                    title: "मूल का देश ",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -2266TT/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -2266TT/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -2266TT/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT2360TT",
                    imageRelativePath: "/livguard/battery images/IT 2360TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2360TT",
                },
                {
                    title: "IT2672TT",
                    imageRelativePath: "/livguard/battery images/IT 2672TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2672TT",
                },
                {
                    title: "IT2048TT",
                    imageRelativePath: "/livguard/battery images/IT 2048TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2048TT",
                },
                {
                    title: "IT2066TT",
                    imageRelativePath: "/livguard/battery images/IT 2066TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2066TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    IT2360TT: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -2360TT/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -2360TT/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -2360TT/infographic/3.jpg",
                },
            ],
            title: " Livguard INVERTUFF Tall Tubular 230 Ah Battery with 36+24* Months Warranty",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "36 + 24* Months Warranty",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "230 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "Tall Tubular",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "INVERTUFF",
                },
                {
                    title: "Warranty",
                    value: "36 + 24* Months",
                },
                {
                    title: "Package Contents",
                    value: "Inverter Battery, Warranty card, Float Indicator, Petroleum Jelly, Nut bolt set",
                },
                {
                    title: "Rating",
                    value: "230 Ah",
                },
                {
                    title: "Dimensions",
                    value: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with Best-In-Class Warranty",
                },
                {
                    value: "Long Lasting Battery Life for an unlimited flow of energy ",
                },
                {
                    value: "Tuff Futuristic Design to complement the aesthetics of your home",
                },
                {
                    value: "High Charge Acceptance For Higher Backup",
                },
                {
                    value: "Low Maintenance for an effortless experience",
                },
            ],
            additionalInfo: [
                {
                    title: "Manufacturer",
                    value: "Livguard",
                },
                {
                    title: "Item Weight",
                    value: "57.5 ± 3%",
                },
                {
                    title: "Country Of Origin",
                    value: "India",
                },
            ],
            productDescription: {
                description:
                    "With our Livguard battery at your home, experience what limitless energy feels like. Built with a 3D grid design and high storage capacity, Livguard inverter batteries deliver satisfactory performance every time, with long and durable battery life",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -2360TT/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -2360TT/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -2360TT/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT2672TT",
                    imageRelativePath: "/livguard/battery images/IT 2672TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2672TT",
                },
                {
                    title: "IT2266TT",
                    imageRelativePath: "/livguard/battery images/IT 2266TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2266TT",
                },
                {
                    title: "IT2048TT",
                    imageRelativePath: "/livguard/battery images/IT 2048TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2048TT",
                },
                {
                    title: "IT2066TT",
                    imageRelativePath: "/livguard/battery images/IT 2066TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2066TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "Tall Tubular 230 battery with 60 months warranty- Livguard ",
                description: "Get Livguard INVERTUFF tall tubular 230 Ah battery with 36 +24* months warranty, suitable inverter for small offices, homes, and small shops. ",
                canonicalUrl: `/product/it2360tt`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "IT2360TT",
                    "url": "https://www.livguard.com/product/IT2360TT",
                    "image": "https://growthjockey.imgix.net/livguard/battery%20images/IT%202360TT.png?w=508",
                    "description": "",
                    "brand": {
                            "@type": "Brand",
                            "name": "Livgaurd"
                    }
            }

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -2360TT/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -2360TT/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -2360TT/infographic/3.jpg",
                },
            ],
            title: "लिवगार्ड INVERTUFF टॉल ट्यूबलर 230 Ah बैटरी 36+24* महीने की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "36 + 24* महीने वारंटी",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "200 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "टॉल ट्यूबुलर ",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "520 (L) X 275 (W) X  282 (H)",
                },
            ],
            specifications: [
                {
                    title: "मॉडल संख्या",
                    value: "INVERTUFF",
                },
                {
                    title: "वारंटी ",
                    value: "36 + 24* महीने",
                },
                {
                    title: "पैकेज सामग्री",
                    value: "इन्वर्टर बैटरी, वारंटी कार्ड, फ्लोट इंडिकेटर, पेट्रोलियम जेली, नट बोल्ट सेट",
                },
                {
                    title: "रेटिंग",
                    value: "230 Ah",
                },
                {
                    title: "आयाम",
                    value: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            features: [
                {
                    value: "मन की शांति सर्वोत्तम वारंटी वारंटी के साथ",
                },
                {
                    value: "ऊर्जा के असीमित प्रवाह के लिए लंबे समय तक चलने वाली बैटरी लाइफ़",
                },
                {
                    value: "आधुनिक Tuff बनावट जो आपके घर की सुंदरता को भी बढ़ाये",
                },
                {
                    value: "उच्च बैकअप के लिए उच्च शुल्क स्वीकृति",
                },
                {
                    value: "सहज अनुभव के लिए कम मेंटेनेंस",
                },
            ],
            additionalInfo: [
                {
                    title: "उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "57.5 ± 3%",
                },
                {
                    title: "मूल का देश ",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -2360TT/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -2360TT/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -2360TT/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT2672TT",
                    imageRelativePath: "/livguard/battery images/IT 2672TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2672TT",
                },
                {
                    title: "IT2266TT",
                    imageRelativePath: "/livguard/battery images/IT 2266TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2266TT",
                },
                {
                    title: "IT2048TT",
                    imageRelativePath: "/livguard/battery images/IT 2048TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2048TT",
                },
                {
                    title: "IT2066TT",
                    imageRelativePath: "/livguard/battery images/IT 2066TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2066TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    IT2672TT: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -2672TT/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -2672TT/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -2672TT/infographic/3.jpg",
                },
            ],
            title: " Livguard INVERTUFF Tall Tubular 260 Ah Battery with 42+30* Months Warranty",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "42 + 30* Months Warranty",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "260 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "Tall Tubular",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "INVERTUFF",
                },
                {
                    title: "Warranty",
                    value: "42 + 30* Months",
                },
                {
                    title: "Package Contents",
                    value: "Inverter Battery, Warranty card, Float Indicator, Petroleum Jelly, Nut bolt set",
                },
                {
                    title: "Rating",
                    value: "260 Ah",
                },
                {
                    title: "Dimensions",
                    value: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with Best-In-Class Warranty",
                },
                {
                    value: "Long Lasting Battery Life for an unlimited flow of energy ",
                },
                {
                    value: "Tuff Futuristic Design to complement the aesthetics of your home",
                },
                {
                    value: "High Charge Acceptance For Higher Backup",
                },
                {
                    value: "Low Maintenance for an effortless experience",
                },
            ],
            additionalInfo: [
                {
                    title: "Manufacturer",
                    value: "Livguard",
                },
                {
                    title: "Item Weight",
                    value: "70.0 ± 3%",
                },
                {
                    title: "Country Of Origin",
                    value: "India",
                },
            ],
            productDescription: {
                description:
                    "With our Livguard battery at your home, experience what limitless energy feels like. Built with a 3D grid design and high storage capacity, Livguard inverter batteries deliver satisfactory performance every time, with long and durable battery life",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -2672TT/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -2672TT/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -2672TT/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT2360TT",
                    imageRelativePath: "/livguard/battery images/IT 2360TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2360TT",
                },
                {
                    title: "IT2266TT",
                    imageRelativePath: "/livguard/battery images/IT 2266TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2266TT",
                },
                {
                    title: "IT2048TT",
                    imageRelativePath: "/livguard/battery images/IT 2048TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2048TT",
                },
                {
                    title: "IT2066TT",
                    imageRelativePath: "/livguard/battery images/IT 2066TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT2066TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "Buy Livguard INVERTUFF Tall Tubular 260 Ah Battery",
                description: "Buy Livguard INVERTUFF Tall Tubular 260 Ah Battery with Long Lasting Battery Life for an unlimited flow of energy",
                canonicalUrl: `/product/it2672tt`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "IT2672TT",
                    "url": "https://www.livguard.com/product/IT2672TT",
                    "image": "https://growthjockey.imgix.net/livguard/battery%20images/IT%202672TT.png?w=508",
                    "description": "",
                    "brand": {
                            "@type": "Brand",
                            "name": "Livgaurd"
                    }
            }

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/product/Batteries/Battery -2672TT/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -2672TT/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/Batteries/Battery -2672TT/infographic/3.jpg",
                },
            ],
            title: "लिवगार्ड INVERTUFF टॉल ट्यूबलर 260 Ah बैटरी 42+30* महीने की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "42 + 30* महीने वारंटी",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "260 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "टॉल ट्यूबुलर ",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "505 (L) X 188 (W) X  410 (H)",
                },
            ],
            specifications: [
                {
                    title: "मॉडल संख्या",
                    value: "INVERTUFF",
                },
                {
                    title: "वारंटी ",
                    value: "42 + 30* महीने",
                },
                {
                    title: "पैकेज सामग्री",
                    value: "इन्वर्टर बैटरी, वारंटी कार्ड, फ्लोट इंडिकेटर, पेट्रोलियम जेली, नट बोल्ट सेट",
                },
                {
                    title: "रेटिंग",
                    value: "260 Ah",
                },
                {
                    title: "आयाम",
                    value: "505 (L) X 188 (W) X 410 (H)",
                },
            ],
            features: [
                {
                    value: "मन की शांति सर्वोत्तम वारंटी वारंटी के साथ",
                },
                {
                    value: "ऊर्जा के असीमित प्रवाह के लिए लंबे समय तक चलने वाली बैटरी लाइफ़",
                },
                {
                    value: "आधुनिक Tuff बनावट जो आपके घर की सुंदरता को भी बढ़ाये",
                },
                {
                    value: "उच्च बैकअप के लिए उच्च शुल्क स्वीकृति",
                },
                {
                    value: "सहज अनुभव के लिए कम मेंटेनेंस",
                },
            ],
            additionalInfo: [
                {
                    title: "उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "70.0 ± 3%",
                },
                {
                    title: "मूल का देश ",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/product/Batteries/Battery -2672TT/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -2672TT/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/Batteries/Battery -2672TT/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1554STJ",
                    imageRelativePath: "/livguard/battery images/IT 1554STJ.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1554STJ",
                },
                {
                    title: "IT1554TT",
                    imageRelativePath: "/livguard/battery images/IT 1554TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/IT1554TT",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/battery images/IT 1560TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/IT1560TT",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/battery images/IT 1560TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1560TT",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    "urban-jodi": {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/product/jodis/the urban jodi/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/jodis/the urban jodi/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/jodis/the urban jodi/infographic/3.jpg",
                },
            ],
            title: "Livguard Inverter / Inverter Battery Jodi i-verter pro / INVERTUFF Sinewave / Short Tall Tubular 900 VA / 150 Ah with 3 year / 36+24 Month Warranty.",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description: "Bring home the power of limitless energy with our amazingly curated Jodi combos. Made to perfectly match your needs efficiently.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "3 Years | 36 + 24* Months Warranty",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "1250VA | 200 Ah",
                },
                {
                    icon: "/livguard/icons/technology.png",
                    text: "Square wave + Tall Tubular",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "275 (L) X 281 (W) X 145 (H)",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "i2-verter pro | INVERTUFF",
                },
                {
                    title: "Warranty",
                    value: "3 Years | 36 + 24* Months Warranty",
                },
                {
                    title: "Package Contents",
                    value: "Inverter Battery, Warranty card, Float Indicator, Petroleum Jelly, Nut bolt set",
                },
                {
                    title: "Rating",
                    value: "1250VA | 200 Ah",
                },
                {
                    title: "Dimensions",
                    value: "275 (L) X 281 (W) X 145 (H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with Best-In-Class Warranty",
                },
                {
                    value: "Backed with Smart Artificial Intelligent Charging",
                },
                {
                    value: "Extra Load Handling capacity",
                },
                {
                    value: "Long Lasting Battery Life for an unlimited flow of energy",
                },
                {
                    value: "High Charge Acceptance For Higher Backup",
                },
            ],
            additionalInfo: [
                {
                    title: "Manufacturer",
                    value: "Livguard",
                },
                {
                    title: "Item Weight",
                    value: "63.3 ± 3%",
                },
                {
                    title: "Country Of Origin",
                    value: "India",
                },
            ],
            productDescription: {
                description: "For your home, choose nothing but the best! With Livguard inverter and battery jodi, unlock unlimited energy powered by amazing features",
                images: [
                    {
                        image: "/livguard/product/jodis/the urban jodi/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/jodis/the urban jodi/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/jodis/the urban jodi/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1554STJ",
                    imageRelativePath: "/livguard/battery images/IT 1554STJ.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1554STJ",
                },
                {
                    title: "IT1554TT",
                    imageRelativePath: "/livguard/battery images/IT 1554TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/IT1554TT",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/battery images/IT 1560TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/IT1560TT",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/battery images/IT 1560TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1560TT",
                },
            ],
            type: ProductType.jodi,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/product/jodis/the urban jodi/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/jodis/the urban jodi/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/jodis/the urban jodi/infographic/3.jpg",
                },
            ],
            title: "लिवगार्ड इनवर्टर / इनवर्टर बैटरी जोड़ी i-वर्टर प्रो / INVERTUFF साइनवेव / शोर्ट ट्यूबुलर  900 VA / 150 Ah 3 वर्ष / 36+24* महीने की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description: "हमारे असीम कुशलता से तैयार किए गए जोड़ी कॉम्बो के साथ असीम ऊर्जा की शक्ति को घर लाएं। यह कॉम्बो आपकी आवश्यकताओं को पूरी तरह से कुशलता से मेल खाने के लिए बनाए गए हैं",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "3 वर्ष | 36 + 24* वारंटी",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "900VA | 150Ah",
                },
                {
                    icon: "/livguard/icons/technology.png",
                    text: "साइन वेव + शोर्ट टॉल ट्यूबलर ",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "275(L) X 297(W) X 123(H)",
                },
            ],
            specifications: [
                {
                    title: "मॉडल संख्या",
                    value: "i-verter pro | INVERTUFF",
                },
                {
                    title: "वारंटी",
                    value: "3 वर्ष | 36 + 24*",
                },
                {
                    title: "पैकेज सामग्री",
                    value: "इन्वर्टर बैटरी, वारंटी कार्ड, फ्लोट इंडिकेटर, पेट्रोलियम जेली, नट बोल्ट सेट",
                },
                {
                    title: "रेटिंग",
                    value: "आयाम",
                },
            ],
            features: [
                {
                    value: "मन की शांति सर्वोत्तम वारंटी वारंटी के साथ",
                },
                {
                    value: "प्योर साइन वेव",
                },
                {
                    value: "स्मार्ट ए आई चार्जिंग से युक्त इनवर्टर",
                },
                {
                    value: "ऊर्जा के असीमित प्रवाह के लिए लंबे समय तक चलने वाली बैटरी लाइफ़",
                },
                {
                    value: "उच्च बैकअप के लिए उच्च शुल्क स्वीकृति",
                },
            ],
            additionalInfo: [
                {
                    title: " उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "62.2±3%",
                },
                {
                    title: "मूल का देश",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "अपने घर के लिए, कुछ आम नहीं बल्कि सबसे अच्छा चुनें! लिवगार्ड इन्वर्टर और बैटरी जोड़ी के साथ, अद्भुत सुविधाओं द्वारा संचालित असीमित ऊर्जा अनलॉक करें।",
                images: [
                    {
                        image: "/livguard/product/jodis/the urban jodi/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/jodis/the urban jodi/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/jodis/the urban jodi/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1554STJ",
                    imageRelativePath: "/livguard/battery images/IT 1554STJ.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1554STJ",
                },
                {
                    title: "IT1554TT",
                    imageRelativePath: "/livguard/battery images/IT 1554TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/IT1554TT",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/battery images/IT 1560TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/IT1560TT",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/battery images/IT 1560TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1560TT",
                },
            ],
            type: ProductType.jodi,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    "peace-of-mind-jodi": {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/product/jodis/the rural jodi/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/jodis/the rural jodi/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/jodis/the rural jodi/infographic/3.jpg",
                },
            ],
            title: "Livguard Inverter / Inverter Battery Jodi i2-verter pro / INVERTUFF Square wave / Tall Tubular 1250 VA / 200 Ah with 3 year / 36+24 Month Warranty",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description: "Bring home the power of limitless energy with our amazingly curated Jodi combos. Made to perfectly match your needs efficiently.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "3 Years | 36 + 24* Months Warranty",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "1250VA | 200 Ah",
                },
                {
                    icon: "/livguard/icons/technology.png",
                    text: "Square wave + Tall Tubular",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "275 (L) X 281 (W) X 145 (H)",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "i2-verter pro | INVERTUFF",
                },
                {
                    title: "Warranty",
                    value: "3 Years | 36 + 24* Months Warranty",
                },
                {
                    title: "Package Contents",
                    value: "Inverter Battery, Warranty card, Float Indicator, Petroleum Jelly, Nut bolt set",
                },
                {
                    title: "Rating",
                    value: "1250VA | 200 Ah",
                },
                {
                    title: "Dimensions",
                    value: "275 (L) X 281 (W) X 145 (H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with Best-In-Class Warranty",
                },
                {
                    value: "Backed with Smart Artificial Intelligent Charging",
                },
                {
                    value: "Extra Load Handling capacity",
                },
                {
                    value: "Long Lasting Battery Life for an unlimited flow of energy",
                },
                {
                    value: "High Charge Acceptance For Higher Backup",
                },
            ],
            additionalInfo: [
                {
                    title: "Manufacturer",
                    value: "Livguard",
                },
                {
                    title: "Item Weight",
                    value: "63.3 ± 3%",
                },
                {
                    title: "Country Of Origin",
                    value: "India",
                },
            ],
            productDescription: {
                description: "For your home, choose nothing but the best! With Livguard inverter and battery jodi, unlock unlimited energy powered by amazing features",
                images: [
                    {
                        image: "/livguard/product/jodis/the rural jodi/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/jodis/the rural jodi/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/jodis/the rural jodi/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1554STJ",
                    imageRelativePath: "/livguard/battery images/IT 1554STJ.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1554STJ",
                },
                {
                    title: "IT1554TT",
                    imageRelativePath: "/livguard/battery images/IT 1554TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/IT1554TT",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/battery images/IT 1560TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/IT1560TT",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/battery images/IT 1560TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1560TT",
                },
            ],
            type: ProductType.jodi,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/product/jodis/the rural jodi/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/jodis/the rural jodi/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/jodis/the rural jodi/infographic/3.jpg",
                },
            ],
            title: "लिवगार्ड इनवर्टर / इनवर्टर बैटरी जोड़ी i2-वर्टर प्रो / INVERTUFF स्क्वायर वेव / टॉल ट्यूबलर 1250 VA / 200 Ah 3 वर्ष / 36+24* महीने की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description: "हमारे असीम कुशलता से तैयार किए गए जोड़ी कॉम्बो के साथ असीम ऊर्जा की शक्ति को घर लाएं। यह कॉम्बो आपकी आवश्यकताओं को पूरी तरह से कुशलता से मेल खाने के लिए बनाए गए हैं",
            productIcons: [
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "3 वर्ष | 36 + 24* वारंटी",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "1250VA | 200Ah",
                },
                {
                    icon: "/livguard/icons/technology.png",
                    text: "चौकोर तरंग + टॉल ट्यूबलर ",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "275(L) X 281(W) X 145(H)",
                },
            ],
            specifications: [
                {
                    title: "मॉडल संख्या",
                    value: "i2-verter pro | INVERTUFF",
                },
                {
                    title: "वारंटी",
                    value: "3 वर्ष | 36 + 24*",
                },
                {
                    title: "पैकेज सामग्री",
                    value: "इन्वर्टर बैटरी, वारंटी कार्ड, फ्लोट इंडिकेटर, पेट्रोलियम जेली, नट बोल्ट सेट",
                },
                {
                    title: "रेटिंग",
                    value: "1250VA | 200Ah",
                },
                {
                    title: "आयाम",
                    value: "275(L) X 281(W) X 145(H)",
                },
            ],
            features: [
                {
                    value: "मन की शांति सर्वोत्तम वारंटी वारंटी के साथ",
                },
                {
                    value: "प्योर साइन वेव",
                },
                {
                    value: "स्मार्ट ए आई चार्जिंग से युक्त इनवर्टर",
                },
                {
                    value: "ऊर्जा के असीमित प्रवाह के लिए लंबे समय तक चलने वाली बैटरी लाइफ़",
                },
                {
                    value: "उच्च बैकअप के लिए उच्च शुल्क स्वीकृति",
                },
            ],
            additionalInfo: [
                {
                    title: " उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "63.3±3%",
                },
                {
                    title: "मूल का देश",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "अपने घर के लिए, कुछ आम नहीं बल्कि सबसे अच्छा चुनें! लिवगार्ड इन्वर्टर और बैटरी जोड़ी के साथ, अद्भुत सुविधाओं द्वारा संचालित असीमित ऊर्जा अनलॉक करें।",
                images: [
                    {
                        image: "/livguard/product/jodis/the rural jodi/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/jodis/the rural jodi/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/jodis/the rural jodi/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1554STJ",
                    imageRelativePath: "/livguard/battery images/IT 1554STJ.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1554STJ",
                },
                {
                    title: "IT1554TT",
                    imageRelativePath: "/livguard/battery images/IT 1554TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/IT1554TT",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/battery images/IT 1560TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/IT1560TT",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/battery images/IT 1560TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1560TT",
                },
            ],
            type: ProductType.jodi,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    "super-life-jodi": {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/product/jodis/the super life jodi/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/jodis/the super life jodi/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/jodis/the super life jodi/infographic/3.jpg",
                },
            ],
            title: " Livguard Inverter / Inverter Battery Jodi i-verter pro / INVERTUFF Sinewave / Tall Tubular 1500 VA / 150 Ah with 3 year / 60+24 Month Warranty.",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description: "Bring home the power of limitless energy with our amazingly curated Jodi combos. Made to perfectly match your needs efficiently.",
            productIcons: [
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "3 Years | 60 + 24* Months Warranty",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "1500VA | 150 Ah",
                },
                {
                    icon: "/livguard/icons/technology.png",
                    text: "Sinewave + Tall Tubular",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "275 (L) X 318 (W) X 143 (H)",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "i-verter pro | INVERTUFF",
                },
                {
                    title: "Warranty",
                    value: "3 Years | 60 + 24* Months Warranty",
                },
                {
                    title: "Package Contents",
                    value: "Inverter Battery, Warranty card, Float Indicator, Petroleum Jelly, Nut bolt set",
                },
                {
                    title: "Rating",
                    value: "1500VA | 150 Ah",
                },
                {
                    title: "Dimensions",
                    value: "275 (L) X 318 (W) X 143 (H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with Best-In-Class Warranty",
                },
                {
                    value: "Pure Sinewave Output",
                },
                {
                    value: "Backed with Smart Artificial Intelligent Charging",
                },
                {
                    value: "Long Lasting Battery Life for an unlimited flow of energy",
                },
                {
                    value: "High Charge Acceptance For Higher Backup",
                },
            ],
            additionalInfo: [
                {
                    title: "Manufacturer",
                    value: "Livguard",
                },
                {
                    title: "Item Weight",
                    value: "68.4 ± 3%",
                },
                {
                    title: "Country Of Origin",
                    value: "India",
                },
            ],
            productDescription: {
                description: "For your home, choose nothing but the best! With Livguard inverter and battery jodi, unlock unlimited energy powered by amazing features",
                images: [
                    {
                        image: "/livguard/product/jodis/the super life jodi/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/jodis/the super life jodi/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/jodis/the super life jodi/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1554STJ",
                    imageRelativePath: "/livguard/battery images/IT 1554STJ.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1554STJ",
                },
                {
                    title: "IT1554TT",
                    imageRelativePath: "/livguard/battery images/IT 1554TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/IT1554TT",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/battery images/IT 1560TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/IT1560TT",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/battery images/IT 1560TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1560TT",
                },
            ],
            type: ProductType.jodi,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/product/jodis/the super life jodi/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/jodis/the super life jodi/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/jodis/the super life jodi/infographic/3.jpg",
                },
            ],
            title: "लिवगार्ड इनवर्टर / इनवर्टर बैटरी जोड़ी i-वर्टर प्रो / INVERTUFF साइनवेव / टॉल ट्यूबुलर  1500 VA / 150 Ah 3 वर्ष / 60+24* महीने की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description: "हमारे असीम कुशलता से तैयार किए गए जोड़ी कॉम्बो के साथ असीम ऊर्जा की शक्ति को घर लाएं। यह कॉम्बो आपकी आवश्यकताओं को पूरी तरह से कुशलता से मेल खाने के लिए बनाए गए हैं",
            productIcons: [
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "3 वर्ष | 60 + 24* वारंटी",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "1500VA | 150Ah",
                },
                {
                    icon: "/livguard/icons/technology.png",
                    text: "साइन वेव + टॉल ट्यूबलर ",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "275(L) X 318(W) X 143(H)",
                },
            ],
            specifications: [
                {
                    title: "मॉडल संख्या",
                    value: "i-verter pro | INVERTUFF",
                },
                {
                    title: "वारंटी",
                    value: "3 वर्ष | 60 + 24*",
                },
                {
                    title: "पैकेज सामग्री",
                    value: "इन्वर्टर बैटरी, वारंटी कार्ड, फ्लोट इंडिकेटर, पेट्रोलियम जेली, नट बोल्ट सेट",
                },
                {
                    title: "रेटिंग",
                    value: "1500VA | 150Ah",
                },
                {
                    title: "आयाम",
                    value: "275(L) X 318(W) X 143(H)",
                },
            ],
            features: [
                {
                    value: "मन की शांति सर्वोत्तम वारंटी वारंटी के साथ",
                },
                {
                    value: "प्योर साइन वेव",
                },
                {
                    value: "स्मार्ट ए आई चार्जिंग से युक्त इनवर्टर",
                },
                {
                    value: "ऊर्जा के असीमित प्रवाह के लिए लंबे समय तक चलने वाली बैटरी लाइफ़",
                },
                {
                    value: "उच्च बैकअप के लिए उच्च शुल्क स्वीकृति",
                },
            ],
            additionalInfo: [
                {
                    title: " उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "68.4 ±3%",
                },
                {
                    title: "मूल का देश",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "अपने घर के लिए, कुछ आम नहीं बल्कि सबसे अच्छा चुनें! लिवगार्ड इन्वर्टर और बैटरी जोड़ी के साथ, अद्भुत सुविधाओं द्वारा संचालित असीमित ऊर्जा अनलॉक करें।",
                images: [
                    {
                        image: "/livguard/product/jodis/the super life jodi/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/jodis/the super life jodi/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/jodis/the super life jodi/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1554STJ",
                    imageRelativePath: "/livguard/battery images/IT 1554STJ.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1554STJ",
                },
                {
                    title: "IT1554TT",
                    imageRelativePath: "/livguard/battery images/IT 1554TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/IT1554TT",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/battery images/IT 1560TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/IT1560TT",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/battery images/IT 1560TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1560TT",
                },
            ],
            type: ProductType.jodi,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    "hi-power-jodi": {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/product/jodis/the hi-power jodi/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/jodis/the hi-power jodi/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/jodis/the hi-power jodi/infographic/3.jpg",
                },
            ],
            title: "Livguard Inverter / Inverter Battery Jodi Heavy Duty / INVERTUFF Sinewave / Tall Tubular 2000 VA / 260 Ah with 3 year / 42+30 Month Warranty.",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description: "Bring home the power of limitless energy with our amazingly curated Jodi combos. Made to perfectly match your needs efficiently.",
            productIcons: [
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "3 Years | 42 + 30* Months Warranty",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "2000VA | 260 Ah",
                },
                {
                    icon: "/livguard/icons/technology.png",
                    text: "Sinewave + Tall Tubular",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "275 (L) X 320 (W) X 275 (H)",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "Heavy Duty | INVERTUFF",
                },
                {
                    title: "Warranty",
                    value: "3 Years | 42 + 30* Months Warranty",
                },
                {
                    title: "Package Contents",
                    value: "Inverter Battery, Warranty card, Float Indicator, Petroleum Jelly, Nut bolt set",
                },
                {
                    title: "Rating",
                    value: "2000VA | 260 Ah",
                },
                {
                    title: "Dimensions",
                    value: "275 (L) X 320 (W) X 275 (H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with Best-In-Class Warranty",
                },
                {
                    value: "Pure Sinewave Output",
                },
                {
                    value: "Backed with Smart Artificial Intelligent Charging",
                },
                {
                    value: "Heavy load handling capacity",
                },
                {
                    value: "Long Lasting Battery Life for an unlimited flow of energy",
                },
            ],
            additionalInfo: [
                {
                    title: "Manufacturer",
                    value: "Livguard",
                },
                {
                    title: "Item Weight",
                    value: "92.6 ± 3%",
                },
                {
                    title: "Country Of Origin",
                    value: "India",
                },
            ],
            productDescription: {
                description: "For your home, choose nothing but the best! With Livguard inverter and battery jodi, unlock unlimited energy powered by amazing features",
                images: [
                    {
                        image: "/livguard/product/jodis/the hi-power jodi/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/jodis/the hi-power jodi/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/jodis/the hi-power jodi/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1554STJ",
                    imageRelativePath: "/livguard/battery images/IT 1554STJ.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1554STJ",
                },
                {
                    title: "IT1554TT",
                    imageRelativePath: "/livguard/battery images/IT 1554TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/IT1554TT",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/battery images/IT 1560TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/IT1560TT",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/battery images/IT 1560TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1560TT",
                },
            ],
            type: ProductType.jodi,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/product/jodis/the hi-power jodi/infographic/1.jpg",
                },
                {
                    image: "/livguard/product/jodis/the hi-power jodi/infographic/2.jpg",
                },
                {
                    image: "/livguard/product/jodis/the hi-power jodi/infographic/3.jpg",
                },
            ],
            title: "लिवगार्ड इनवर्टर / इनवर्टर बैटरी जोड़ी हेवी ड्यूटी / INVERTUFF साइनवेव / टॉल ट्यूबलर  2000 VA / 260 Ah 3 वर्ष / 42+30* महीने की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description: "हमारे असीम कुशलता से तैयार किए गए जोड़ी कॉम्बो के साथ असीम ऊर्जा की शक्ति को घर लाएं। यह कॉम्बो आपकी आवश्यकताओं को पूरी तरह से कुशलता से मेल खाने के लिए बनाए गए हैं",
            productIcons: [
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "3 वर्ष | 42 + 30* वारंटी",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "2000VA | 260Ah",
                },
                {
                    icon: "/livguard/icons/technology.png",
                    text: "साइन वेव + टॉल ट्यूबलर ",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "275(L) X 320(W) X 275(H)",
                },
            ],
            specifications: [
                {
                    title: "मॉडल संख्या",
                    value: "Heavy Duty | INVERTUFF",
                },
                {
                    title: "वारंटी",
                    value: "3 वर्ष | 42 + 30*",
                },
                {
                    title: "पैकेज सामग्री",
                    value: "इन्वर्टर बैटरी, वारंटी कार्ड, फ्लोट इंडिकेटर, पेट्रोलियम जेली, नट बोल्ट सेट",
                },
                {
                    title: "रेटिंग",
                    value: "2000VA | 260Ah",
                },
                {
                    title: "आयाम",
                    value: "275(L) X 320(W) X 275(H)",
                },
            ],
            features: [
                {
                    value: "मन की शांति सर्वोत्तम वारंटी वारंटी के साथ",
                },
                {
                    value: "प्योर साइन वेव",
                },
                {
                    value: "स्मार्ट ए आई चार्जिंग से युक्त इनवर्टर",
                },
                {
                    value: "ऊर्जा के असीमित प्रवाह के लिए लंबे समय तक चलने वाली बैटरी लाइफ़",
                },
                {
                    value: "उच्च बैकअप के लिए उच्च शुल्क स्वीकृति",
                },
            ],
            additionalInfo: [
                {
                    title: " उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "62.2±3%",
                },
                {
                    title: "मूल का देश",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "अपने घर के लिए, कुछ आम नहीं बल्कि सबसे अच्छा चुनें! लिवगार्ड इन्वर्टर और बैटरी जोड़ी के साथ, अद्भुत सुविधाओं द्वारा संचालित असीमित ऊर्जा अनलॉक करें।",
                images: [
                    {
                        image: "/livguard/product/jodis/the hi-power jodi/A+/1.jpg",
                    },
                    {
                        image: "/livguard/product/jodis/the hi-power jodi/A+/2.jpg",
                    },
                    {
                        image: "/livguard/product/jodis/the hi-power jodi/A+/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1554STJ",
                    imageRelativePath: "/livguard/battery images/IT 1554STJ.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1554STJ",
                },
                {
                    title: "IT1554TT",
                    imageRelativePath: "/livguard/battery images/IT 1554TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/IT1554TT",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/battery images/IT 1560TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/IT1560TT",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/battery images/IT 1560TT.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/IT1560TT",
                },
            ],
            type: ProductType.jodi,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
};
