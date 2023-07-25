import {Language} from "~/typeDefinitions";

export const enum ProductType {
    inverter = 0,
    battery = 1,
    combo = 2,
    automotiveBattery = 3,
}

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

export const allProductDetails: {[key: string]: {[key: string]: ProductDetails}} = {
    lg700e: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/inverters/lg750i/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/inverters/lg750i/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/inverters/lg750i/infographics/3.jpg",
                },
                {
                    image: "/livguard/products/inverters/lg750i/infographics/4.jpg",
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
                        image: "/livguard/products/inverters/lg750i/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg750i/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg750i/a-plus/3.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg750i/a-plus/4.jpg",
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
                    imageRelativePath: "/livguard/products/inverters/lgs900i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lgs900i",
                },
                {
                    title: "LG900",
                    imageRelativePath: "/livguard/products/inverters/lg900/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg900",
                },
                {
                    title: "LGS1000i",
                    imageRelativePath: "/livguard/products/inverters/lgs1000i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgs1000i",
                },
                {
                    title: "LG1100",
                    imageRelativePath: "/livguard/products/inverters/lg1100/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lg1100",
                },
            ],
            type: ProductType.inverter,
            metadata: {
                title: "Livguard i2-verter pro inverter Online 600VA with 3-Year warranty",
                description: "Buy Square Wave Inverter 600 VA, with a 3-year Warranty, Suitable inverter for small offices, homes, and small shops",
                canonicalUrl: `/product/lg700e`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "LG700E",
                    "url": "https://www.livguard.com/product/lg700e",
                    "image": "https://growthjockey.imgix.net/livguard/products/inverters/lg750i/infographics/1.jpg?w=508",
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
                    image: "/livguard/products/inverters/lg750i/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/inverters/lg750i/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/inverters/lg750i/infographics/3.jpg",
                },
                {
                    image: "/livguard/products/inverters/lg750i/infographics/4.jpg",
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
                    title: "मॉडल संख्या",
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
                        image: "/livguard/products/inverters/lg750i/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg750i/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg750i/a-plus/3.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg750i/a-plus/4.jpg",
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
                    imageRelativePath: "/livguard/products/inverters/lgs900i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lgs900i",
                },
                {
                    title: "LG900",
                    imageRelativePath: "/livguard/products/inverters/lg900/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg900",
                },
                {
                    title: "LGS1000i",
                    imageRelativePath: "/livguard/products/inverters/lgs1000i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgs1000i",
                },
                {
                    title: "LG1100",
                    imageRelativePath: "/livguard/products/inverters/lg1100/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lg1100",
                },
            ],
            type: ProductType.inverter,
            metadata: {
                title: "लिवगार्ड i2-वर्टर प्रो इनवर्टर ऑनलाइन 600 VA, 3 वर्ष की वारंटी के साथ",
                description: "ख़रीदें स्क्वायर वेव इनवर्टर 600 VA और 3 वर्ष की वारंटी के साथ, छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त।",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    lg900: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/inverters/lg950i/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/inverters/lg950i/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/inverters/lg950i/infographics/3.jpg",
                },
                {
                    image: "/livguard/products/inverters/lg950i/infographics/4.jpg",
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
                        image: "/livguard/products/inverters/lg950i/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg950i/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg950i/a-plus/3.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg950i/a-plus/4.jpg",
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
                    imageRelativePath: "/livguard/products/inverters/lgs1000i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgs1000i",
                },
                {
                    title: "LG1100",
                    imageRelativePath: "/livguard/products/inverters/lg1100/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1100",
                },
                {
                    title: "LGS1100i",
                    imageRelativePath: "/livguard/products/inverters/lgs1100i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgs1100i",
                },

                {
                    title: "LG1450i",
                    imageRelativePath: "/livguard/products/inverters/lg1450i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1450i",
                },
            ],
            type: ProductType.inverter,
            metadata: {
                title: "Livguard Square Wave Inverter Online 800VA",
                description: "Buy a Livguard i2 - verter pro Square Wave Inverter 800 VA  with a 3-year warranty. Suitable inverter for small offices, homes, and Small shops",
                canonicalUrl: `/product/lg900`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "LG900",
                    "url": "https://www.livguard.com/product/lg900",
                    "image": "https://growthjockey.imgix.net/livguard/products/inverters/lg950i/infographics/1.jpg?w=508",
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
                    image: "/livguard/products/inverters/lg950i/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/inverters/lg950i/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/inverters/lg950i/infographics/3.jpg",
                },
                {
                    image: "/livguard/products/inverters/lg950i/infographics/4.jpg",
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
                    title: "मॉडल संख्या",
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
                        image: "/livguard/products/inverters/lg950i/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg950i/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg950i/a-plus/3.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg950i/a-plus/4.jpg",
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
                    imageRelativePath: "/livguard/products/inverters/lgs1000i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgs1000i",
                },
                {
                    title: "LG1100",
                    imageRelativePath: "/livguard/products/inverters/lg1100/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1100",
                },
                {
                    title: "LGS1100i",
                    imageRelativePath: "/livguard/products/inverters/lgs1100i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgs1100i",
                },

                {
                    title: "LG1450i",
                    imageRelativePath: "/livguard/products/inverters/lg1450i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1450i",
                },
            ],
            type: ProductType.inverter,
            metadata: {
                title: "लिवगार्ड स्क्वायर वेव इनवर्टर ऑनलाइन 800VA",
                description: "ख़रीदें लिवगार्ड i2-वर्टर प्रो स्क्वायर वेव इनवर्टर 800 VA,  3 वर्ष की वारंटी के साथ। छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त।",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    lg1100: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/inverters/lg1150i/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/inverters/lg1150i/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/inverters/lg1150i/infographics/3.jpg",
                },
                {
                    image: "/livguard/products/inverters/lg1150i/infographics/4.jpg",
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
                        image: "/livguard/products/inverters/lg1150i/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg1150i/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg1150i/a-plus/3.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg1150i/a-plus/4.jpg",
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
                    imageRelativePath: "/livguard/products/inverters/lgs1100i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgs1100i",
                },
                {
                    title: "LG1450i",
                    imageRelativePath: "/livguard/products/inverters/lg1450i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1450i",
                },
                {
                    title: "LG1550i",
                    imageRelativePath: "/livguard/products/inverters/lg1550i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1550i",
                },
                {
                    title: "LGS1600",
                    imageRelativePath: "/livguard/products/inverters/lgs1600/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lgs1600",
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
                    "url": "https://www.livguard.com/product/lg1100",
                    "image": "https://growthjockey.imgix.net/livguard/products/inverters/lg1150i/infographics/1.jpg?w=508",
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
                    image: "/livguard/products/inverters/lg1150i/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/inverters/lg1150i/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/inverters/lg1150i/infographics/3.jpg",
                },
                {
                    image: "/livguard/products/inverters/lg1150i/infographics/4.jpg",
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
                    title: "मॉडल संख्या",
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
                        image: "/livguard/products/inverters/lg1150i/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg1150i/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg1150i/a-plus/3.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg1150i/a-plus/4.jpg",
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
                    imageRelativePath: "/livguard/products/inverters/lgs1100i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgs1100i",
                },
                {
                    title: "LG1450i",
                    imageRelativePath: "/livguard/products/inverters/lg1450i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1450i",
                },
                {
                    title: "LG1550i",
                    imageRelativePath: "/livguard/products/inverters/lg1550i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1550i",
                },
                {
                    title: "LGS1600",
                    imageRelativePath: "/livguard/products/inverters/lgs1600/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lgs1600",
                },
            ],
            type: ProductType.inverter,
            metadata: {
                title: "ख़रीदें स्क्वायर वेव इनवर्टर ऑनलाइन 900VA - लिवगार्ड",
                description: "पाइए लिवगार्ड i2-वर्टर प्रो स्क्वायर वेव इनवर्टर 900 VA, 3 वर्ष की सर्विस के भरोसे के साथ, श्रेणी में सर्वश्रेष्ठ सेवाओं और स्मार्ट एआई चार्जिंग से युक्त।",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    lg1450i: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/inverters/lg1450i/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/inverters/lg1450i/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/inverters/lg1450i/infographics/3.jpg",
                },
                {
                    image: "/livguard/products/inverters/lg1450i/infographics/4.jpg",
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
                    text: "Square Wave Inverter",
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
                        image: "/livguard/products/inverters/lg1450i/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg1450i/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg1450i/a-plus/3.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg1450i/a-plus/4.jpg",
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
                    imageRelativePath: "/livguard/products/inverters/lg1550i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1550i",
                },
                {
                    title: "LGS1600",
                    imageRelativePath: "/livguard/products/inverters/lgs1600/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lgs1600",
                },
                {
                    title: "LGS1700",
                    imageRelativePath: "/livguard/products/inverters/lgs1700/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lgs1700",
                },
                {
                    title: "LG1950i",
                    imageRelativePath: "/livguard/products/inverters/lg1950i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1950i",
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
                    "url": "https://www.livguard.com/product/lg1450i",
                    "image": "https://growthjockey.imgix.net/livguard/products/inverters/lg1450ii/infographics/1.jpg?w=508",
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
                    image: "/livguard/products/inverters/lg1450i/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/inverters/lg1450i/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/inverters/lg1450i/infographics/3.jpg",
                },
                {
                    image: "/livguard/products/inverters/lg1450i/infographics/4.jpg",
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
                    title: "मॉडल संख्या",
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
                        image: "/livguard/products/inverters/lg1450i/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg1450i/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg1450i/a-plus/3.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg1450i/a-plus/4.jpg",
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
                    imageRelativePath: "/livguard/products/inverters/lg1550i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1550i",
                },
                {
                    title: "LGS1600",
                    imageRelativePath: "/livguard/products/inverters/lgs1600/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lgs1600",
                },
                {
                    title: "LGS1700",
                    imageRelativePath: "/livguard/products/inverters/lgs1700/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lgs1700",
                },
                {
                    title: "LG1950i",
                    imageRelativePath: "/livguard/products/inverters/lg1950i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1950i",
                },
            ],
            type: ProductType.inverter,
            metadata: {
                title: "लिवगार्ड i2 - वर्टर प्रो स्क्वायर वेव इनवर्टर ऑनलाइन 1100VA",
                description: "ख़रीदें लिवगार्ड i2-वर्टर प्रो स्क्वायर वेव इनवर्टर 1100 VA 3 वर्ष की वारंटी के साथ। छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त।",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    lg1550i: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/inverters/lg1550i/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/inverters/lg1550i/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/inverters/lg1550i/infographics/3.jpg",
                },
                {
                    image: "/livguard/products/inverters/lg1550i/infographics/4.jpg",
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
                    text: "Square Wave Inverter",
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
                        image: "/livguard/products/inverters/lg1550i/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg1550i/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg1550i/a-plus/3.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg1550i/a-plus/4.jpg",
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
                    imageRelativePath: "/livguard/products/inverters/lgs1600/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lgs1600",
                },
                {
                    title: "LGS1700",
                    imageRelativePath: "/livguard/products/inverters/lgs1700/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lgs1700",
                },
                {
                    title: "LG1950i",
                    imageRelativePath: "/livguard/products/inverters/lg1950i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1950i",
                },
                {
                    title: "LG1450i",
                    imageRelativePath: "/livguard/products/inverters/lg1450i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1450i",
                },
            ],
            type: ProductType.inverter,
            metadata: {
                title: "Livguard i2-verter pro-Square Wave Inverter online",
                description:
                    "Get Livguard Square Wave Inverter 1100VA  with a 3-year warranty. Bring home the power of unlimited energy with our inverter. Suitable for small offices, homes, and small shops.",
                canonicalUrl: `/product/lg1550i`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "LG1550i",
                    "url": "https://www.livguard.com/product/lg1550i",
                    "image": "https://growthjockey.imgix.net/livguard/products/inverters/lg1550ii/infographics/1.jpg?w=508",
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
                    image: "/livguard/products/inverters/lg1550i/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/inverters/lg1550i/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/inverters/lg1550i/infographics/3.jpg",
                },
                {
                    image: "/livguard/products/inverters/lg1550i/infographics/4.jpg",
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
                    title: "मॉडल संख्या",
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
                        image: "/livguard/products/inverters/lg1550i/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg1550i/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg1550i/a-plus/3.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg1550i/a-plus/4.jpg",
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
                    imageRelativePath: "/livguard/products/inverters/lgs1600/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lgs1600",
                },
                {
                    title: "LGS1700",
                    imageRelativePath: "/livguard/products/inverters/lgs1700/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lgs1700",
                },
                {
                    title: "LG1950i",
                    imageRelativePath: "/livguard/products/inverters/lg1950i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1950i",
                },
                {
                    title: "LG1450i",
                    imageRelativePath: "/livguard/products/inverters/lg1450i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1450i",
                },
            ],
            type: ProductType.inverter,
            metadata: {
                title: "लिवगार्ड i2 - वर्टर प्रो- स्क्वायर वेव इनवर्टर ऑनलाइन",
                description: "पाइए लिवगार्ड स्क्वायर वेव इनवर्टर 1100VA,  3 वर्ष की वारंटी के साथ। घर लाएं असीमित ऊर्जा की शक्ति। छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त।",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    lg1950i: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/inverters/lg1950i/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/inverters/lg1950i/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/inverters/lg1950i/infographics/3.jpg",
                },
                {
                    image: "/livguard/products/inverters/lg1950i/infographics/4.jpg",
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
                    text: "Square Wave Inverter",
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
                        image: "/livguard/products/inverters/lg1950i/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg1950i/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg1950i/a-plus/3.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg1950i/a-plus/4.jpg",
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
                    imageRelativePath: "/livguard/products/inverters/lgs1700/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lgs1700",
                },
                {
                    title: "LGS1600",
                    imageRelativePath: "/livguard/products/inverters/lgs1600/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lgs1600",
                },
                {
                    title: "LG1550i",
                    imageRelativePath: "/livguard/products/inverters/lg1550i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1550i",
                },
                {
                    title: "LG1450i",
                    imageRelativePath: "/livguard/products/inverters/lg1450i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1450i",
                },
            ],
            type: ProductType.inverter,
            metadata: {
                title: "Buy Square Wave Inverter 1650va - Livgaurd",
                description: "Buy Livguard i2 - verter pro Square Wave Inverter 1100VA  with a 3-year warranty & Smart AI charging. Suitable inverter for small offices, homes, and small shops.",
                canonicalUrl: `/product/lg1950i`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "LG1950I",
                    "url": "https://www.livguard.com/product/lg1950i",
                    "image": "https://growthjockey.imgix.net/livguard/products/inverters/lg1950i/infographics/1.jpg?w=508",
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
                    image: "/livguard/products/inverters/lg1950i/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/inverters/lg1950i/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/inverters/lg1950i/infographics/3.jpg",
                },
                {
                    image: "/livguard/products/inverters/lg1950i/infographics/4.jpg",
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
                    title: "मॉडल संख्या",
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
                        image: "/livguard/products/inverters/lg1950i/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg1950i/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg1950i/a-plus/3.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg1950i/a-plus/4.jpg",
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
                    imageRelativePath: "/livguard/products/inverters/lgs1700/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lgs1700",
                },
                {
                    title: "LGS1600",
                    imageRelativePath: "/livguard/products/inverters/lgs1600/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lgs1600",
                },
                {
                    title: "LG1550i",
                    imageRelativePath: "/livguard/products/inverters/lg1550i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1550i",
                },
                {
                    title: "LG1450i",
                    imageRelativePath: "/livguard/products/inverters/lg1450i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1450i",
                },
            ],
            type: ProductType.inverter,
            metadata: {
                title: "ख़रीदें स्क्वायर वेव इनवर्टर 1650va - लिवगार्ड",
                description: "ख़रीदें लिवगार्ड i2-वर्टर प्रो स्क्वायर वेव इनवर्टर 1100VA , 3 वर्ष की वारंटी और स्मार्ट एआई चार्जिंग के साथ। छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त।",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    lgs900i: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/inverters/lgs900i/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/inverters/lgs900i/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/inverters/lgs900i/infographics/3.jpg",
                },
                {
                    image: "/livguard/products/inverters/lgs900i/infographics/4.jpg",
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
                    text: "Pure Sine Wave Inverter",
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
                        image: "/livguard/products/inverters/lg950i/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg950i/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg950i/a-plus/3.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg950i/a-plus/4.jpg",
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
                    imageRelativePath: "/livguard/products/inverters/lg900/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg900",
                },
                {
                    title: "LGS1000i",
                    imageRelativePath: "/livguard/products/inverters/lgs1000i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lgs1000i",
                },
                {
                    title: "LG1100",
                    imageRelativePath: "/livguard/products/inverters/lg1100/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1100",
                },
                {
                    title: "LGS1100i",
                    imageRelativePath: "/livguard/products/inverters/lgs1100i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lgs1100i",
                },
            ],
            type: ProductType.inverter,
            metadata: {
                title: "Pure Sine Wave Inverter 700VA Online - Livguard",
                description: "Get Livguard i2 - verter pro Pure Sine Wave inverter 700 VA  With a 3-year warranty and pure sine wave output. Experience energy unlimited",
                canonicalUrl: `/product/lgs900i`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "LGS900i",
                    "url": "https://www.livguard.com/product/lgs900i",
                    "image": "https://growthjockey.imgix.net/livguard/products/inverters/lgs900i/infographics/1.jpg?w=508",
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
                    image: "/livguard/products/inverters/lgs900i/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/inverters/lgs900i/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/inverters/lgs900i/infographics/3.jpg",
                },
                {
                    image: "/livguard/products/inverters/lgs900i/infographics/4.jpg",
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
                    title: "मॉडल संख्या",
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
                    value: "प्योर साइन वेव",
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
                        image: "/livguard/products/inverters/lg950i/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg950i/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg950i/a-plus/3.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lg950i/a-plus/4.jpg",
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
                    imageRelativePath: "/livguard/products/inverters/lg900/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg900",
                },
                {
                    title: "LGS1000i",
                    imageRelativePath: "/livguard/products/inverters/lgs1000i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lgs1000i",
                },
                {
                    title: "LG1100",
                    imageRelativePath: "/livguard/products/inverters/lg1100/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1100",
                },
                {
                    title: "LGS1100i",
                    imageRelativePath: "/livguard/products/inverters/lgs1100i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lgs1100i",
                },
            ],
            type: ProductType.inverter,
            metadata: {
                title: "प्योर साइन वेव इनवर्टर 700VA ऑनलाइन  - लिवगार्ड",
                description: "पाइए लिवगार्ड i2-वर्टर प्रो प्योर साइन वेव इनवर्टर 700 VA   3 वर्ष की वारंटी और प्योर साइन वेव आउटपुट के साथ। अनुभव करें असीमित ऊर्जा।",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    lgs1000i: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/inverters/lgs1000i/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/inverters/lgs1000i/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/inverters/lgs1000i/infographics/3.jpg",
                },
                {
                    image: "/livguard/products/inverters/lgs1000i/infographics/4.jpg",
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
                    text: "Pure Sine Wave Inverter",
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
                        image: "/livguard/products/inverters/lgs1000i/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lgs1000i/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lgs1000i/a-plus/3.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lgs1000i/a-plus/4.jpg",
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
                    imageRelativePath: "/livguard/products/inverters/lg900/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg900",
                },
                {
                    title: "LG1100",
                    imageRelativePath: "/livguard/products/inverters/lg1100/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1100",
                },
                {
                    title: "LGS1100i",
                    imageRelativePath: "/livguard/products/inverters/lgs1100i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lgs1100i",
                },
                {
                    title: "LG1450i",
                    imageRelativePath: "/livguard/products/inverters/lg1450i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1450i",
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
                    "url": "https://www.livguard.com/product/lgs1000i",
                    "image": "https://growthjockey.imgix.net/livguard/products/inverters/lgs1000i/infographics/1.jpg?w=508",
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
                    image: "/livguard/products/inverters/lgs1000i/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/inverters/lgs1000i/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/inverters/lgs1000i/infographics/3.jpg",
                },
                {
                    image: "/livguard/products/inverters/lgs1000i/infographics/4.jpg",
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
                    title: "मॉडल संख्या",
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
                    value: "प्योर साइन वेव",
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
                        image: "/livguard/products/inverters/lgs1000i/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lgs1000i/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lgs1000i/a-plus/3.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lgs1000i/a-plus/4.jpg",
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
                    imageRelativePath: "/livguard/products/inverters/lg900/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg900",
                },
                {
                    title: "LG1100",
                    imageRelativePath: "/livguard/products/inverters/lg1100/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1100",
                },
                {
                    title: "LGS1100i",
                    imageRelativePath: "/livguard/products/inverters/lgs1100i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lgs1100i",
                },
                {
                    title: "LG1450i",
                    imageRelativePath: "/livguard/products/inverters/lg1450i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1450i",
                },
            ],
            type: ProductType.inverter,
            metadata: {
                title: "ख़रीदें प्योर साइन वेव इनवर्टर 800 VA - लिवगार्ड",
                description: "ख़रीदें लिवगार्ड प्योर साइन वेव इनवर्टर 800VA  3 वर्ष की वारंटी के साथ। छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त इनवर्टर, सुनिश्चित वारंटी के साथ।",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    lgs1100i: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/inverters/lgs1100i/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/inverters/lgs1100i/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/inverters/lgs1100i/infographics/3.jpg",
                },
                {
                    image: "/livguard/products/inverters/lgs1100i/infographics/4.jpg",
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
                    text: "Pure Sine Wave Inverter",
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
                        image: "/livguard/products/inverters/lgs1100i/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lgs1100i/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lgs1100i/a-plus/3.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lgs1100i/a-plus/4.jpg",
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
                    imageRelativePath: "/livguard/products/inverters/lg1100/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1100",
                },
                {
                    title: "LG1450i",
                    imageRelativePath: "/livguard/products/inverters/lg1450i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1450i",
                },
                {
                    title: "LG1550i",
                    imageRelativePath: "/livguard/products/inverters/lg1550i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1550i",
                },
                {
                    title: "LGS1600",
                    imageRelativePath: "/livguard/products/inverters/lgs1600/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lgs1600",
                },
            ],
            type: ProductType.inverter,
            metadata: {
                title: "Livguard Pure Sine Wave inverter 900 VA Online",
                description: "Get Livguard Sine Wave inverter 900 VA, suitable for small offices, homes, and small shops. Comes with extra load handling capacity and supports all battery types",
                canonicalUrl: `/product/lgs1100i`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "LGS1100i",
                    "url": "https://www.livguard.com/product/lgs1100i",
                    "image": "https://growthjockey.imgix.net/livguard/products/inverters/lgs1100i/infographics/1.jpg?w=508",
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
                    image: "/livguard/products/inverters/lgs1100i/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/inverters/lgs1100i/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/inverters/lgs1100i/infographics/3.jpg",
                },
                {
                    image: "/livguard/products/inverters/lgs1100i/infographics/4.jpg",
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
                    title: "मॉडल संख्या",
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
                    value: "प्योर साइन वेव",
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
                        image: "/livguard/products/inverters/lgs1100i/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lgs1100i/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lgs1100i/a-plus/3.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lgs1100i/a-plus/4.jpg",
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
                    imageRelativePath: "/livguard/products/inverters/lg1100/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1100",
                },
                {
                    title: "LG1450i",
                    imageRelativePath: "/livguard/products/inverters/lg1450i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1450i",
                },
                {
                    title: "LG1550i",
                    imageRelativePath: "/livguard/products/inverters/lg1550i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1550i",
                },
                {
                    title: "LGS1600",
                    imageRelativePath: "/livguard/products/inverters/lgs1600/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lgs1600",
                },
            ],
            type: ProductType.inverter,
            metadata: {
                title: "लिवगार्ड प्योर साइन वेव इनवर्टर 900 VA ऑनलाइन",
                description: "पाइए लिवगार्ड साइन वेव इनवर्टर 900 VA, छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त, जो अतिरिक्त लोड संभालने की क्षमता और सभी प्रकार की बैटरी का समर्थन करता है।",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    lgs1700: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/inverters/lgs1700/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/inverters/lgs1700/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/inverters/lgs1700/infographics/3.jpg",
                },
                {
                    image: "/livguard/products/inverters/lgs1700/infographics/4.jpg",
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
                    text: "Pure Sine Wave Inverter",
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
                        image: "/livguard/products/inverters/lgs1700/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lgs1700/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lgs1700/a-plus/3.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lgs1700/a-plus/4.jpg",
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
                    imageRelativePath: "/livguard/products/inverters/lg1950i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1950i",
                },
                {
                    title: "LGS1600",
                    imageRelativePath: "/livguard/products/inverters/lgs1600/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lgs1600",
                },
                {
                    title: "LG1550i",
                    imageRelativePath: "/livguard/products/inverters/lg1550i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1550i",
                },
                {
                    title: "LG1450i",
                    imageRelativePath: "/livguard/products/inverters/lg1450i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1450i",
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
                    "url": "https://www.livguard.com/product/lgs1700",
                    "image": "https://growthjockey.imgix.net/livguard/products/inverters/lgs1700/infographics/1.jpg?w=508",
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
                    image: "/livguard/products/inverters/lgs1700/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/inverters/lgs1700/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/inverters/lgs1700/infographics/3.jpg",
                },
                {
                    image: "/livguard/products/inverters/lgs1700/infographics/4.jpg",
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
                    title: "मॉडल संख्या",
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
                    value: "प्योर साइन वेव",
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
                        image: "/livguard/products/inverters/lgs1700/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lgs1700/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lgs1700/a-plus/3.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lgs1700/a-plus/4.jpg",
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
                    imageRelativePath: "/livguard/products/inverters/lg1950i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1950i",
                },
                {
                    title: "LGS1600",
                    imageRelativePath: "/livguard/products/inverters/lgs1600/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lgs1600",
                },
                {
                    title: "LG1550i",
                    imageRelativePath: "/livguard/products/inverters/lg1550i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1550i",
                },
                {
                    title: "LG1450i",
                    imageRelativePath: "/livguard/products/inverters/lg1450i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1450i",
                },
            ],
            type: ProductType.inverter,
            metadata: {
                title: "प्योर साइन वेव इनवर्टर 1500 VA - लिवगार्ड ऑनलाइन",
                description: "ख़रीदें लिवगार्ड i-वर्टर प्रो, सुनिश्चित वारंटी और प्योर साइन वेव आउटपुट के साथ। स्मार्ट एआई चार्जिंग से युक्त इनवर्टर।",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    lgs1600: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/inverters/lgs1600/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/inverters/lgs1600/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/inverters/lgs1600/infographics/3.jpg",
                },
                {
                    image: "/livguard/products/inverters/lgs1600/infographics/4.jpg",
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
                    text: "Pure Sine Wave Inverter",
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
                        image: "/livguard/products/inverters/lgs900i/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lgs900i/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lgs900i/a-plus/3.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lgs900i/a-plus/4.jpg",
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
                    imageRelativePath: "/livguard/products/inverters/lgs1700/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lgs1700",
                },
                {
                    title: "LG1950i",
                    imageRelativePath: "/livguard/products/inverters/lg1950i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1950i",
                },
                {
                    title: "LG1550i",
                    imageRelativePath: "/livguard/products/inverters/lg1550i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1550i",
                },
                {
                    title: "LG1450i",
                    imageRelativePath: "/livguard/products/inverters/lg1450i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1450i",
                },
            ],
            type: ProductType.inverter,
            metadata: {
                title: "Livguard i-verter pro Pure Sine Wave inverter with 3-Year warranty",
                description: "Get Livguard i-verter pro pure sine wave inverter 1500 VA with a 3-year warranty.   Suitable inverter for small offices, homes, and small shops.",
                canonicalUrl: `/product/lgs1600`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "LGS1600",
                    "url": "https://www.livguard.com/product/lgs1600",
                    "image": "https://growthjockey.imgix.net/livguard/products/inverters/lgs1600/infographics/1.jpg?w=508",
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
                    image: "/livguard/products/inverters/lgs900i/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/inverters/lgs900i/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/inverters/lgs900i/infographics/3.jpg",
                },
                {
                    image: "/livguard/products/inverters/lgs900i/infographics/4.jpg",
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
                    title: "मॉडल संख्या",
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
                    value: "प्योर साइन वेव",
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
                        image: "/livguard/products/inverters/lgs900i/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lgs900i/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lgs900i/a-plus/3.jpg",
                    },
                    {
                        image: "/livguard/products/inverters/lgs900i/a-plus/4.jpg",
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
                    imageRelativePath: "/livguard/products/inverters/lgs1700/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lgs1700",
                },
                {
                    title: "LG1950i",
                    imageRelativePath: "/livguard/products/inverters/lg1950i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1950i",
                },
                {
                    title: "LG1550i",
                    imageRelativePath: "/livguard/products/inverters/lg1550i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1550i",
                },
                {
                    title: "LG1450i",
                    imageRelativePath: "/livguard/products/inverters/lg1450i/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/lg1450i",
                },
            ],
            type: ProductType.inverter,
            metadata: {
                title: "लिवगार्ड i - वर्टर प्रो प्योर साइन वेव इनवर्टर with 3 वर्ष की वारंटी के साथ",
                description: "पाइए लिवगार्ड i-वर्टर प्रो प्योर साइन वेव इनवर्टर 1500 VA 3 वर्ष की वारंटी के साथ। छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त इनवर्टर।",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    it9048st: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/batteries/it9048st/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it9048st/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it9048st/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |90Ah | Max. Warranty | Long Life Battery | Short Tubular Battery",
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
                    value: "Long Lasting Battery Life for an unlimited flow of energy",
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
                        image: "/livguard/products/batteries/it9048st/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it9048st/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it9048st/a-plus/3.jpg",
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
                    imageRelativePath: "/livguard/products/batteries/it1048st/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1048st",
                },
                {
                    title: "IT1172STT",
                    imageRelativePath: "/livguard/products/batteries/it1172stt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1172stt",
                },
                {
                    title: "IT1584TT",
                    imageRelativePath: "/livguard/products/batteries/it1584tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1584tt",
                },
                {
                    title: "IT1560STJ",
                    imageRelativePath: "/livguard/products/batteries/it1560stj/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1560stj",
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
                    "url": "https://www.livguard.com/product/it9048st",
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
                    image: "/livguard/products/batteries/it9048st/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it9048st/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it9048st/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |90Ah | Max. Warranty | Long Life Battery | Short Tubular Battery",
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
                    text: "शोर्ट ट्यूबलर",
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
                    title: "वारंटी",
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
                    title: "उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "29.3 ± 3%",
                },
                {
                    title: "मूल का देश",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/products/batteries/it9048st/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it9048st/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it9048st/a-plus/3.jpg",
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
                    imageRelativePath: "/livguard/products/batteries/it1048st/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1048st",
                },
                {
                    title: "IT1172STT",
                    imageRelativePath: "/livguard/products/batteries/it1172stt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1172stt",
                },
                {
                    title: "IT1584TT",
                    imageRelativePath: "/livguard/products/batteries/it1584tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1584tt",
                },
                {
                    title: "IT1560STJ",
                    imageRelativePath: "/livguard/products/batteries/it1560stj/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1560stj",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "लिवगार्ड INVERTUFF शोर्ट ट्यूबुलर 90 Ah ऑनलाइन",
                description: "पाइए लिवगार्ड INVERTUFF शोर्ट ट्यूबुलर 90 Ah इनवर्टर बैटरी ऑनलाइन 24+24* महीने की वारंटी के साथ; छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त।",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    it1048st: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/batteries/it1048st/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1048st/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1048st/infographics/3.jpg",
                },
            ],
            title: "Livguard |  Inverter Battery for Small Office, Home and Small Shops | Invertuff |100Ah | Max. Warranty |  Long Life Battery | Short Tubular Battery",
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
                    value: "Long Lasting Battery Life for an unlimited flow of energy",
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
                        image: "/livguard/products/batteries/it1048st/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1048st/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1048st/a-plus/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1172STT",
                    imageRelativePath: "/livguard/products/batteries/it1172stt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1172stt",
                },
                {
                    title: "IT1584TT",
                    imageRelativePath: "/livguard/products/batteries/it1584tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1584tt",
                },
                {
                    title: "IT1560STJ",
                    imageRelativePath: "/livguard/products/batteries/it1560stj/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1560stj",
                },
                {
                    title: "IT1548STJ",
                    imageRelativePath: "/livguard/products/batteries/it1548stj/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1548stj",
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
    "url": "https://www.livguard.com/product/it1048st",
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
                    image: "/livguard/products/batteries/it1048st/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1048st/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1048st/infographics/3.jpg",
                },
            ],
            title: "Livguard |  Inverter Battery for Small Office, Home and Small Shops | Invertuff |100Ah | Max. Warranty |  Long Life Battery | Short Tubular Battery",
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
                    text: "शोर्ट ट्यूबलर",
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
                    title: "वारंटी",
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
                    title: "उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "39.6 ± 3%",
                },
                {
                    title: "मूल का देश",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/products/batteries/it1048st/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1048st/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1048st/a-plus/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1172STT",
                    imageRelativePath: "/livguard/products/batteries/it1172stt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1172stt",
                },
                {
                    title: "IT1584TT",
                    imageRelativePath: "/livguard/products/batteries/it1584tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1584tt",
                },
                {
                    title: "IT1560STJ",
                    imageRelativePath: "/livguard/products/batteries/it1560stj/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1560stj",
                },
                {
                    title: "IT1548STJ",
                    imageRelativePath: "/livguard/products/batteries/it1548stj/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1548stj",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "शोर्ट ट्यूबुलर ऑनलाइन - लिवगार्ड 100 Ah बैटरी",
                description: "निरंतर ऊर्जा का आनंद लें लिवगार्ड INVERTUFF शोर्ट ट्यूबुलर 100 Ah बैटरी के साथ, जो 24+24* महीने की वारंटी के साथ आती है।",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    it1172stt: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/batteries/it1172stt/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1172stt/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1172stt/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |110Ah | Max. Warranty | Ultra Long Life Battery | Short Tall Tubular Battery",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "42 + 30* Months Warranty",
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
                    value: "42 + 30* Months",
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
                    value: "Long Lasting Battery Life for an unlimited flow of energy",
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
                        image: "/livguard/products/batteries/it1172stt/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1172stt/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1172stt/a-plus/3.jpg",
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
                    imageRelativePath: "/livguard/products/batteries/it1584tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1584tt",
                },
                {
                    title: "IT1560STJ",
                    imageRelativePath: "/livguard/products/batteries/it1560stj/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/it1560stj",
                },
                {
                    title: "IT1548STJ",
                    imageRelativePath: "/livguard/products/batteries/it1548stj/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/it1548stj",
                },
                {
                    title: "IT1548STT",
                    imageRelativePath: "/livguard/products/batteries/it1548stt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1548stt",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "Livguard INVERTUFF with 72-month warranty - Check Now",
                description: "Get an INVERTUFF Short Tall Tubular 110 Ah Battery from Livguard with a 42+30* month warranty. Enjoy a constant electricity supply for long periods of time.",
                canonicalUrl: `/product/it1172stt`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "IT1160STT",
                    "url": "https://www.livguard.com/product/it1172stt",
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
                    image: "/livguard/products/batteries/it1172stt/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1172stt/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1172stt/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |110Ah | Max. Warranty | Ultra Long Life Battery | Short Tall Tubular Battery",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "42 + 30* महीने वारंटी",
                },
                {
                    icon: "livguard/icons/battery_capacity.png",
                    text: "110 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "शोर्ट टॉल ट्यूबलर",
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
                    title: "वारंटी",
                    value: "42 + 30* महीने",
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
                    title: "मूल का देश",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/products/batteries/it1172stt/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1172stt/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1172stt/a-plus/3.jpg",
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
                    imageRelativePath: "/livguard/products/batteries/it1584tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1584tt",
                },
                {
                    title: "IT1560STJ",
                    imageRelativePath: "/livguard/products/batteries/it1560stj/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/it1560stj",
                },
                {
                    title: "IT1548STJ",
                    imageRelativePath: "/livguard/products/batteries/it1548stj/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/it1548stj",
                },
                {
                    title: "IT1548STT",
                    imageRelativePath: "/livguard/products/batteries/it1548stt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1548stt",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "लिवगार्ड INVERTUFF 72 महीने की वारंटी के साथ - अभी देखें",
                description: "पाइए लिवगार्ड INVERTUFF शोर्ट ट्यूबुलर 110 Ah  बैटरी 42+30* महीने की वारंटी के साथ। लंबे समय तक निरंतर ऊर्जा का आनंद लें।",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    it1584tt: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/batteries/it1584tt/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1584tt/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1584tt/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |150Ah | Max. Warranty | Ultra Long Life Battery | Tall Tubular Battery",
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
                    value: "Long Lasting Battery Life for an unlimited flow of energy",
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
                        image: "/livguard/products/batteries/it1584tt/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1584tt/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1584tt/a-plus/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1560STJ",
                    imageRelativePath: "/livguard/products/batteries/it1560stj/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1560stj",
                },
                {
                    title: "IT1548STJ",
                    imageRelativePath: "/livguard/products/batteries/it1548stj/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1548stj",
                },
                {
                    title: "IT1548STT",
                    imageRelativePath: "/livguard/products/batteries/it1548stt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1548stt",
                },
                {
                    title: "IT1560STT",
                    imageRelativePath: "/livguard/products/batteries/it1560stt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1560stt",
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
                    "url": "https://www.livguard.com/product/it1584tt",
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
                    image: "/livguard/products/batteries/it1584tt/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1584tt/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1584tt/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |150Ah | Max. Warranty | Ultra Long Life Battery | Tall Tubular Battery",
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
                    title: "वारंटी",
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
                    title: "उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "54.2 ± 3%",
                },
                {
                    title: "मूल का देश",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/products/batteries/it1584tt/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1584tt/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1584tt/a-plus/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1560STJ",
                    imageRelativePath: "/livguard/products/batteries/it1560stj/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1560stj",
                },
                {
                    title: "IT1548STJ",
                    imageRelativePath: "/livguard/products/batteries/it1548stj/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1548stj",
                },
                {
                    title: "IT1548STT",
                    imageRelativePath: "/livguard/products/batteries/it1548stt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1548stt",
                },
                {
                    title: "IT1560STT",
                    imageRelativePath: "/livguard/products/batteries/it1560stt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1560stt",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "लिवगार्ड INVERTUFF टॉल ट्यूबलर 150 Ah, 60+24 महीने की वारंटी के साथ",
                description: "ख़रीदें लिवगार्ड INVERTUFF टॉल ट्यूबलर 150 Ah बैटरी 60+24* महीने की वारंटी के साथ। लिवगार्ड INVERTUFF के साथ असीमित ऊर्जा का आनंद लें।",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    it1560stj: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/batteries/it1560stj/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1560stj/infographics/2.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |150Ah | Max. Warranty | Xtra Long Life Battery | Short Jumbo Tubular Battery",
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
                    value: "Long Lasting Battery Life for an unlimited flow of energy",
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
                        image: "/livguard/products/batteries/it1560stj/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1560stj/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1560stj/a-plus/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1548STJ",
                    imageRelativePath: "/livguard/products/batteries/it1548stj/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1548stj",
                },
                {
                    title: "IT1548STT",
                    imageRelativePath: "/livguard/products/batteries/it1548stt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1548stt",
                },
                {
                    title: "IT1560STT",
                    imageRelativePath: "/livguard/products/batteries/it1560stt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1560stt",
                },
                {
                    title: "IT1550TT",
                    imageRelativePath: "/livguard/products/batteries/it1550tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1550tt",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "Buy Short Tubular Jumbo 150 Ah Battery- Livguard",
                description: "Get Livguard INVERTUFF Short Tubular Jumbo150 Ah Battery with 36+24* Months warranty to benefit from a constant supply of electricity for long periods of time.",
                canonicalUrl: `/product/it1560stj`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "IT1554STJ",
                    "url": "https://www.livguard.com/product/it1560stj",
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
                    image: "/livguard/products/batteries/it1560stj/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1560stj/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1560stj/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |150Ah | Max. Warranty | Xtra Long Life Battery | Short Jumbo Tubular Battery",
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
                    text: "150 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "शोर्ट टॉल ट्यूबलर",
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
                    title: "वारंटी",
                    value: "42 + 24* महीने",
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
                    value: "46.9 ± 3%",
                },
                {
                    title: "मूल का देश",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/products/batteries/it1560stj/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1560stj/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1560stj/a-plus/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1548STJ",
                    imageRelativePath: "/livguard/products/batteries/it1548stj/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1548stj",
                },
                {
                    title: "IT1548STT",
                    imageRelativePath: "/livguard/products/batteries/it1548stt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1548stt",
                },
                {
                    title: "IT1560STT",
                    imageRelativePath: "/livguard/products/batteries/it1560stt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1560stt",
                },
                {
                    title: "IT1550TT",
                    imageRelativePath: "/livguard/products/batteries/it1550tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1550tt",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "ख़रीदें शोर्ट ट्यूबुलर जंबो 150 Ah बैटरी- लिवगार्ड",
                description: "पाइए लिवगार्ड INVERTUFF शोर्ट ट्यूबुलर जंबो 150 Ah बैटरी 36+24* महीने की वारंटी के साथ, असीमित ऊर्जा के अनुभव के लिए।",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    it1548stj: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/batteries/it1548stj/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1548stj/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1548stj/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |150Ah | Max. Warranty | Long Life Battery | Short Jumbo Tubular Battery",
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
                    value: "520 (L) X 275 (W) X 282 (H)",
                },
            ],
            features: [
                {
                    value: "Peace of mind with Best-In-Class Warranty",
                },
                {
                    value: "Long Lasting Battery Life for an unlimited flow of energy",
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
                        image: "/livguard/products/batteries/it1548stj/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1548stj/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1548stj/a-plus/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1548STT",
                    imageRelativePath: "/livguard/products/batteries/it1548stt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1548stt",
                },
                {
                    title: "IT1560STT",
                    imageRelativePath: "/livguard/products/batteries/it1560stt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1560stt",
                },
                {
                    title: "IT1550TT",
                    imageRelativePath: "/livguard/products/batteries/it1550tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1550tt",
                },
                {
                    title: "IT1572TT",
                    imageRelativePath: "/livguard/products/batteries/it1572tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1572tt",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "Livguard INVERTUFF Short Tubular 150 Ah Online",
                description: "Buy Livguard INVERTUFF Short Tubular Jumbo 150 Ah Battery at the best price with 24+24* Months warranty; best for homes, small offices, and small shops.",
                canonicalUrl: `/product/it1548stj`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "IT1542STJ",
                    "url": "https://www.livguard.com/product/it1548stj",
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
                    image: "/livguard/products/batteries/it1548stj/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1548stj/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1548stj/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |150Ah | Max. Warranty | Long Life Battery | Short Jumbo Tubular Battery",
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
                    text: "शोर्ट टॉल ट्यूबलर",
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
                    title: "वारंटी",
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
                    title: "उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "51.3 ± 3%",
                },
                {
                    title: "मूल का देश",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/products/batteries/it1548stj/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1548stj/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1548stj/a-plus/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1548STT",
                    imageRelativePath: "/livguard/products/batteries/it1548stt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1548stt",
                },
                {
                    title: "IT1560STT",
                    imageRelativePath: "/livguard/products/batteries/it1560stt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1560stt",
                },
                {
                    title: "IT1550TT",
                    imageRelativePath: "/livguard/products/batteries/it1550tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1550tt",
                },
                {
                    title: "IT1572TT",
                    imageRelativePath: "/livguard/products/batteries/it1572tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1572tt",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "लिवगार्ड INVERTUFF शोर्ट ट्यूबुलर 150 Ah ऑनलाइन",
                description: "ख़रीदें लिवगार्ड INVERTUFF शोर्ट ट्यूबुलर जंबो 150 Ah बैटरी सबसे एक दामों में, 24+24* महीने की वारंटी के साथ; छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त।",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    it1548stt: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/batteries/it1548stt/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1548stt/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1548stt/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |110Ah | Max. Warranty | Long Life Battery | Short Tall Tubular Battery",
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
                    value: "Long Lasting Battery Life for an unlimited flow of energy",
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
                        image: "/livguard/products/batteries/it1548stt/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1548stt/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1548stt/a-plus/3.jpg",
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
                    imageRelativePath: "/livguard/products/batteries/it1560stt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1560stt",
                },
                {
                    title: "IT1550TT",
                    imageRelativePath: "/livguard/products/batteries/it1550tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1550tt",
                },
                {
                    title: "IT1572TT",
                    imageRelativePath: "/livguard/products/batteries/it1572tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1572tt",
                },
                {
                    title: "IT1578TT",
                    imageRelativePath: "/livguard/products/batteries/it1578tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1578tt",
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
                    "url": "https://www.livguard.com/product/it1548stt",
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
                    image: "/livguard/products/batteries/it1548stt/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1548stt/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1548stt/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |110Ah | Max. Warranty | Long Life Battery | Short Tall Tubular Battery",
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
                    text: "शोर्ट टॉल ट्यूबलर",
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
                    title: "वारंटी",
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
                    title: "मूल का देश",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/products/batteries/it1548stt/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1548stt/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1548stt/a-plus/3.jpg",
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
                    imageRelativePath: "/livguard/products/batteries/it1560stt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1560stt",
                },
                {
                    title: "IT1550TT",
                    imageRelativePath: "/livguard/products/batteries/it1550tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1550tt",
                },
                {
                    title: "IT1572TT",
                    imageRelativePath: "/livguard/products/batteries/it1572tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1572tt",
                },
                {
                    title: "IT1578TT",
                    imageRelativePath: "/livguard/products/batteries/it1578tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1578tt",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "लिवगार्ड INVERTUFF शोर्ट टॉल ट्यूबुलर 150 Ah बैटरी",
                description: "ख़रीदें लिवगार्ड INVERTUFF शोर्ट टॉल ट्यूबुलर 150 Ah बैटरी 24+24* महीने की वारंटी के साथ। हमारी बैटरी सुनिश्चित बैटरी अवधि के साथ लंबे समय तक आपका साथ देगी।",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    it1560stt: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/batteries/it1560stt/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1560stt/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1560stt/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |110Ah | Max. Warranty |Xtra Long Life Battery | Short Tall Tubular Battery",
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
                    value: "Long Lasting Battery Life for an unlimited flow of energy",
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
                        image: "/livguard/products/batteries/it1560stt/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1560stt/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1560stt/a-plus/3.jpg",
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
                    imageRelativePath: "/livguard/products/batteries/it1550tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1550tt",
                },
                {
                    title: "IT1572TT",
                    imageRelativePath: "/livguard/products/batteries/it1572tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1572tt",
                },
                {
                    title: "IT1578TT",
                    imageRelativePath: "/livguard/products/batteries/it1578tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1578tt",
                },
                {
                    title: "IT1536TT",
                    imageRelativePath: "/livguard/products/batteries/it1536tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1536tt",
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
                    "url": "https://www.livguard.com/product/it1560stt",
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
                    image: "/livguard/products/batteries/it1560stt/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1560stt/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1560stt/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |110Ah | Max. Warranty |Xtra Long Life Battery | Short Tall Tubular Battery",
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
                    text: "शोर्ट टॉल ट्यूबलर",
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
                    title: "वारंटी",
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
                    title: "उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "52.2 ± 3%",
                },
                {
                    title: "मूल का देश",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/products/batteries/it1560stt/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1560stt/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1560stt/a-plus/3.jpg",
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
                    imageRelativePath: "/livguard/products/batteries/it1550tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1550tt",
                },
                {
                    title: "IT1572TT",
                    imageRelativePath: "/livguard/products/batteries/it1572tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1572tt",
                },
                {
                    title: "IT1578TT",
                    imageRelativePath: "/livguard/products/batteries/it1578tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1578tt",
                },
                {
                    title: "IT1536TT",
                    imageRelativePath: "/livguard/products/batteries/it1536tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1536tt",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "ख़रीदें शोर्ट टॉल ट्यूबुलर150Ah बैटरी 4 वर्ष की वारंटी के साथ",
                description: "36+24* महीने की वारंटी के साथ लिवगार्ड INVERTUFF शॉर्ट टॉल ट्यूबलर 150 Ah बैटरी ख़रीदें, फ्यूचरिस्टिक डिज़ाइन के साथ आपके घर की सुंदरता को बढ़ाने के लिए।",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    it1550tt: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/batteries/it1550tt/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1550tt/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1550tt/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |150Ah | Max. Warranty | Xtra Long Life Battery | Tall Tubular Battery",
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
                    value: "Long Lasting Battery Life for an unlimited flow of energy",
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
                        image: "/livguard/products/batteries/it1550tt/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1550tt/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1550tt/a-plus/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1572TT",
                    imageRelativePath: "/livguard/products/batteries/it1572tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1572tt",
                },
                {
                    title: "IT1578TT",
                    imageRelativePath: "/livguard/products/batteries/it1578tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1578tt",
                },
                {
                    title: "IT1536TT",
                    imageRelativePath: "/livguard/products/batteries/it1536tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1536tt",
                },
                {
                    title: "IT1548TT",
                    imageRelativePath: "/livguard/products/batteries/it1548tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1548tt",
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
                    "url": "https://www.livguard.com/product/it 1550tt",
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
                    image: "/livguard/products/batteries/it1550tt/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1550tt/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1550tt/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |150Ah | Max. Warranty | Xtra Long Life Battery | Tall Tubular Battery",
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
                    title: "वारंटी",
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
                    title: "उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "53.2 ± 3%",
                },
                {
                    title: "मूल का देश",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/products/batteries/it1550tt/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1550tt/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1550tt/a-plus/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1572TT",
                    imageRelativePath: "/livguard/products/batteries/it1572tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1572tt",
                },
                {
                    title: "IT1578TT",
                    imageRelativePath: "/livguard/products/batteries/it1578tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1578tt",
                },
                {
                    title: "IT1536TT",
                    imageRelativePath: "/livguard/products/batteries/it1536tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1536tt",
                },
                {
                    title: "IT1548TT",
                    imageRelativePath: "/livguard/products/batteries/it1548tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1548tt",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "लिवगार्ड INVERTUFF टॉल ट्यूबुलर150 Ah बैटरी ऑनलाइन",
                description: "36+14* महीने की वारंटी वाली लिवगार्ड INVERTUFF टॉल ट्यूबलर 150 Ah बैटरी के साथ असीमित ऊर्जा  का आनंद लें; छोटे कार्यालयों और घरों के लिए उपयुक्त।",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    it1572tt: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/batteries/it1572tt/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1572tt/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1572tt/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |150Ah | Max. Warranty | Ultra Long Life Battery | Tall Tubular Battery",
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
                    value: "42 + 30* Months",
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
                    value: "Long Lasting Battery Life for an unlimited flow of energy",
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
                        image: "/livguard/products/batteries/it1572tt/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1572tt/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1572tt/a-plus/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1578TT",
                    imageRelativePath: "/livguard/products/batteries/it1578tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1578tt",
                },
                {
                    title: "IT1536TT",
                    imageRelativePath: "/livguard/products/batteries/it1536tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1536tt",
                },
                {
                    title: "IT1548TT",
                    imageRelativePath: "/livguard/products/batteries/it1548tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1548tt",
                },
                {
                    title: "IT1636STJ",
                    imageRelativePath: "/livguard/products/batteries/it1636stj/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1636stj",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "Buy 150 Ah Tall Tubular Battery Online - Livguard",
                description: "Get Livguard INVERTUFF Tall Tubular 150 Ah Battery with a 54-month warranty, and enjoy a constant supply of electric power for long hours without any trouble.",
                canonicalUrl: `/product/it1572tt`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "IT1554TT",
                    "url": "https://www.livguard.com/product/it1572tt",
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
                    image: "/livguard/products/batteries/it1572tt/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1572tt/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1572tt/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |150Ah | Max. Warranty | Ultra Long Life Battery | Tall Tubular Battery",
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
                    title: "वारंटी",
                    value: "42 + 30* महीने",
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
                    value: "54.2 ± 3%",
                },
                {
                    title: "मूल का देश",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/products/batteries/it1572tt/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1572tt/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1572tt/a-plus/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1578TT",
                    imageRelativePath: "/livguard/products/batteries/it1578tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1578tt",
                },
                {
                    title: "IT1536TT",
                    imageRelativePath: "/livguard/products/batteries/it1536tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1536tt",
                },
                {
                    title: "IT1548TT",
                    imageRelativePath: "/livguard/products/batteries/it1548tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1548tt",
                },
                {
                    title: "IT1636STJ",
                    imageRelativePath: "/livguard/products/batteries/it1636stj/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1636stj",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "ख़रीदें 150 Ah टॉल ट्यूबुलर बैटरी ऑनलाइन  - लिवगार्ड",
                description: "पाइए लिवगार्ड INVERTUFF टॉल ट्यूबुलर 150 Ah बैटरी 54 महीने की वारंटी के साथ, और बिना किसी परेशानी के लंबे समय तक असीमित ऊर्जा का आनंद लें।",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    it1578tt: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/batteries/it1578tt/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1578tt/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1578tt/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |150Ah | Max. Warranty | Ultra Long Life Battery | Tall Tubular Battery",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "48 + 30* Months Warranty",
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
                    value: "48 + 30* Months",
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
                    value: "Long Lasting Battery Life for an unlimited flow of energy",
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
                        image: "/livguard/products/batteries/it1578tt/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1578tt/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1578tt/a-plus/3.jpg",
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
                    imageRelativePath: "/livguard/products/batteries/it1536tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1536tt",
                },
                {
                    title: "IT1548TT",
                    imageRelativePath: "/livguard/products/batteries/it1548tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1548tt",
                },
                {
                    title: "IT1636STJ",
                    imageRelativePath: "/livguard/products/batteries/it1636stj/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1636stj",
                },
                {
                    title: "IT1672TT",
                    imageRelativePath: "/livguard/products/batteries/it1672tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1672tt",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "INVERTUFF Short Tall Tubular 150 Ah Battery online- Livguard",
                description: "Buy INVERTUFF short tall tabular 150 Ah battery online from Livguard, with a 78-month warranty and High Charge Acceptance For Higher Backup.",
                canonicalUrl: `/product/it1578tt`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "IT1560TT",
                    "url": "https://www.livguard.com/product/it1578tt",
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
                    image: "/livguard/products/batteries/it1578tt/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1578tt/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1578tt/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |150Ah | Max. Warranty | Ultra Long Life Battery | Tall Tubular Battery",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "48 + 30* महीने वारंटी",
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
                    title: "वारंटी",
                    value: "48 + 30* महीने",
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
                    value: "54.2 ± 3%",
                },
                {
                    title: "मूल का देश",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/products/batteries/it1578tt/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1578tt/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1578tt/a-plus/3.jpg",
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
                    imageRelativePath: "/livguard/products/batteries/it1536tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1536tt",
                },
                {
                    title: "IT1548TT",
                    imageRelativePath: "/livguard/products/batteries/it1548tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1548tt",
                },
                {
                    title: "IT1636STJ",
                    imageRelativePath: "/livguard/products/batteries/it1636stj/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1636stj",
                },
                {
                    title: "IT1672TT",
                    imageRelativePath: "/livguard/products/batteries/it1672tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1672tt",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "INVERTUFF शोर्ट टॉल ट्यूबुलर 150 Ah बैटरी ऑनलाइन- लिवगार्ड",
                description: "ख़रीदें लिवगार्ड INVERTUFF शोर्ट टॉल ट्यूबुलर 150 Ah बैटरी ऑनलाइन, 78 महीने की वारंटी और उच्च बैकअप के लिए उच्च शुल्क स्वीकृति के साथ।",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    it1536tt: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/batteries/it1536tt/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1536tt/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1536tt/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |150Ah | Max. Warranty | Long Life Battery | Tall Tubular Battery",
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
                    value: "Long Lasting Battery Life for an unlimited flow of energy",
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
                        image: "/livguard/products/batteries/it1536tt/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1536tt/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1536tt/a-plus/3.jpg",
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
                    imageRelativePath: "/livguard/products/batteries/it1548tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1548tt",
                },
                {
                    title: "IT1636STJ",
                    imageRelativePath: "/livguard/products/batteries/it1636stj/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1636stj",
                },
                {
                    title: "IT1672TT",
                    imageRelativePath: "/livguard/products/batteries/it1672tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1672tt",
                },
                {
                    title: "IT1642TT",
                    imageRelativePath: "/livguard/products/batteries/it1642tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1642tt",
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
                    "url": "https://www.livguard.com/product/it1536tt",
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
                    image: "/livguard/products/batteries/it1536tt/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1536tt/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1536tt/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |150Ah | Max. Warranty | Long Life Battery | Tall Tubular Battery",
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
                    title: "वारंटी",
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
                    title: "मूल का देश",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/products/batteries/it1536tt/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1536tt/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1536tt/a-plus/3.jpg",
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
                    imageRelativePath: "/livguard/products/batteries/it1548tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1548tt",
                },
                {
                    title: "IT1636STJ",
                    imageRelativePath: "/livguard/products/batteries/it1636stj/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1636stj",
                },
                {
                    title: "IT1672TT",
                    imageRelativePath: "/livguard/products/batteries/it1672tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1672tt",
                },
                {
                    title: "IT1642TT",
                    imageRelativePath: "/livguard/products/batteries/it1642tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1642tt",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "ख़रीदें टॉल ट्यूबुलर 150 Ah बैटरी 18 महीने की वारंटी के साथ- लिवगार्ड",
                description: "पाइए लिवगार्ड INVERTUFF टॉल ट्यूबुलर 150 Ah बैटरी 18+18* महीने की वारंटी के साथ। घर लाएं असीमित ऊर्जा की शक्ति हमारी इनवर्टर  बैटरी के साथ।",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    it1548tt: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/batteries/it1548tt/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1548tt/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1548tt/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |150Ah | Max. Warranty | Long Life Battery | Tall Tubular Battery",
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
                    value: "Long Lasting Battery Life for an unlimited flow of energy",
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
                        image: "/livguard/products/batteries/it1548tt/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1548tt/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1548tt/a-plus/3.jpg",
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
                    imageRelativePath: "/livguard/products/batteries/it1636stj/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1636stj",
                },
                {
                    title: "IT1672TT",
                    imageRelativePath: "/livguard/products/batteries/it1672tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1672tt",
                },
                {
                    title: "IT1642TT",
                    imageRelativePath: "/livguard/products/batteries/it1642tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1642tt",
                },
                {
                    title: "IT1648TT",
                    imageRelativePath: "/livguard/products/batteries/it1648tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1648tt",
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
                    "url": "https://www.livguard.com/product/it1548tt",
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
                    image: "/livguard/products/batteries/it1548tt/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1548tt/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1548tt/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |150Ah | Max. Warranty | Long Life Battery | Tall Tubular Battery",
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
                    title: "वारंटी",
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
                    title: "उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "54.9 ± 3%",
                },
                {
                    title: "मूल का देश",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/products/batteries/it1548tt/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1548tt/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1548tt/a-plus/3.jpg",
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
                    imageRelativePath: "/livguard/products/batteries/it1636stj/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1636stj",
                },
                {
                    title: "IT1672TT",
                    imageRelativePath: "/livguard/products/batteries/it1672tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1672tt",
                },
                {
                    title: "IT1642TT",
                    imageRelativePath: "/livguard/products/batteries/it1642tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1642tt",
                },
                {
                    title: "IT1648TT",
                    imageRelativePath: "/livguard/products/batteries/it1648tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1648tt",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "ख़रीदें  INVERTUFF टॉल ट्यूबुलर 150 Ah ऑनलाइन- लिवगार्ड",
                description: "ख़रीदें लिवगार्ड INVERTUFF टॉल ट्यूबुलर 150 Ah बैटरी ऑनलाइन। लिवगार्ड बैटरी के साथ, असीमित ऊर्जा का अनुभव करें।",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    it1672tt: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/batteries/it1672tt/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1672tt/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1672tt/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |160Ah | Max. Warranty |Ultra Long Life Battery | Tall Tubular Battery",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "42 + 20* Months Warranty",
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
                    value: "42 + 20* Months",
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
                    value: "Long Lasting Battery Life for an unlimited flow of energy",
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
                        image: "/livguard/products/batteries/it1672tt/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1672tt/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1672tt/a-plus/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1642TT",
                    imageRelativePath: "/livguard/products/batteries/it1642tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1642tt",
                },
                {
                    title: "IT1648TT",
                    imageRelativePath: "/livguard/products/batteries/it1648tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1648tt",
                },
                {
                    title: "IT1860TT",
                    imageRelativePath: "/livguard/products/batteries/it1860tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1860tt",
                },
                {
                    title: "IT1872TT",
                    imageRelativePath: "/livguard/products/batteries/it1872tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1872tt",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "Livguard INVERTUFF Tall Tubular battery 160 Ah online",
                description: "Buy Livguard INVERTUFF Tall Tubular Jumbo 160 Ah Battery with 42+20* Months warranty, which is a suitable inverter battery for small offices, homes, and small shops.",
                canonicalUrl: `/product/it1672tt`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "IT1666TT",
                    "url": "https://www.livguard.com/product/it1672tt",
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
                    image: "/livguard/products/batteries/it1672tt/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1672tt/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1672tt/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |160Ah | Max. Warranty |Ultra Long Life Battery | Tall Tubular Battery",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "42 + 20* महीने वारंटी",
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
                    title: "वारंटी",
                    value: "42 + 20* महीने",
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
                    value: "54.2 ± 3%",
                },
                {
                    title: "मूल का देश",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/products/batteries/it1672tt/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1672tt/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1672tt/a-plus/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1642TT",
                    imageRelativePath: "/livguard/products/batteries/it1642tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1642tt",
                },
                {
                    title: "IT1648TT",
                    imageRelativePath: "/livguard/products/batteries/it1648tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1648tt",
                },
                {
                    title: "IT1860TT",
                    imageRelativePath: "/livguard/products/batteries/it1860tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1860tt",
                },
                {
                    title: "IT1872TT",
                    imageRelativePath: "/livguard/products/batteries/it1872tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1872tt",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "लिवगार्ड INVERTUFF टॉल ट्यूबुलर बैटरी 160 Ah ऑनलाइन",
                description: "ख़रीदें लिवगार्ड INVERTUFF टॉल ट्यूबुलर 160 Ah बैटरी, 42+20* महीने की वारंटी के साथ, जो छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त बैटरी है।",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    it1642tt: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/batteries/it1642tt/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1642tt/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1642tt/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |160Ah | Max. Warranty | Long Life Battery | Tall Tubular Battery",
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
                    value: "24 + 18* Months",
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
                    value: "Long Lasting Battery Life for an unlimited flow of energy",
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
                        image: "/livguard/products/batteries/it1642tt/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1642tt/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1642tt/a-plus/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1648TT",
                    imageRelativePath: "/livguard/products/batteries/it1648tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1648tt",
                },
                {
                    title: "IT1860TT",
                    imageRelativePath: "/livguard/products/batteries/it1860tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1860tt",
                },
                {
                    title: "IT1872TT",
                    imageRelativePath: "/livguard/products/batteries/it1872tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1872tt",
                },
                {
                    title: "IT2060TT",
                    imageRelativePath: "/livguard/products/batteries/it2060tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2060tt",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "Livguard 160 Ah Tall Tubular with 42 months warranty",
                description: "Get an INVERTUFF Tall Tubular 160 Ah Battery with a 24+18* Months warranty from Livguard online and enjoy a constant supply of electrical power.",
                canonicalUrl: `/product/it1642tt`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "IT1639TT",
                    "url": "https://www.livguard.com/product/it1642tt",
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
                    image: "/livguard/products/batteries/it1642tt/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1642tt/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1642tt/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |160Ah | Max. Warranty | Long Life Battery | Tall Tubular Battery",
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
                    text: "160 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "टॉल ट्यूबुलर",
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
                    value: "24 + 18* महीने",
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
                    value: "52.8 ± 3%",
                },
                {
                    title: "मूल का देश",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/products/batteries/it1642tt/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1642tt/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1642tt/a-plus/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1648TT",
                    imageRelativePath: "/livguard/products/batteries/it1648tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1648tt",
                },
                {
                    title: "IT1860TT",
                    imageRelativePath: "/livguard/products/batteries/it1860tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1860tt",
                },
                {
                    title: "IT1872TT",
                    imageRelativePath: "/livguard/products/batteries/it1872tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1872tt",
                },
                {
                    title: "IT2060TT",
                    imageRelativePath: "/livguard/products/batteries/it2060tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2060tt",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "लिवगार्ड  160 Ah टॉल ट्यूबुलर 42 महीने की वारंटी के साथ",
                description: "पाइए लिवगार्ड INVERTUFF टॉल ट्यूबुलर 160 Ah बैटरी, 24+18* महीने की वारंटी के साथ ऑनलाइन, और निरंतर ऊर्जा  का आनंद लें।",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    it1648tt: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/batteries/it1648tt/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1648tt/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1648tt/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |160Ah | Max. Warranty | Long Life Battery | Tall Tubular Battery",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "27 + 21* Months Warranty",
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
                    value: "27 + 21* Months",
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
                    value: "Long Lasting Battery Life for an unlimited flow of energy",
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
                        image: "/livguard/products/batteries/it1648tt/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1648tt/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1648tt/a-plus/3.jpg",
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
                    imageRelativePath: "/livguard/products/batteries/it1860tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1860tt",
                },
                {
                    title: "IT1872TT",
                    imageRelativePath: "/livguard/products/batteries/it1872tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1872tt",
                },
                {
                    title: "IT2060TT",
                    imageRelativePath: "/livguard/products/batteries/it2060tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2060tt",
                },
                {
                    title: "IT2072TT",
                    imageRelativePath: "/livguard/products/batteries/it2072tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2072tt",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "Livguard Tall Tubular 160 Ah battery with 48 months warranty",
                description: "The Livguard INVERTUFF Tall Tubular 160 Ah Battery with a 27+21* month warranty is built with a 3D grid design and high storage capacity.",
                canonicalUrl: `/product/it1648tt`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "IT1645TT",
                    "url": "https://www.livguard.com/product/it1648tt",
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
                    image: "/livguard/products/batteries/it1648tt/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1648tt/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1648tt/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |160Ah | Max. Warranty | Long Life Battery | Tall Tubular Battery",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "27 + 21* महीने वारंटी",
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
                    value: "27 + 21* महीने",
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
                    title: "मूल का देश",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/products/batteries/it1648tt/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1648tt/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1648tt/a-plus/3.jpg",
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
                    imageRelativePath: "/livguard/products/batteries/it1860tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1860tt",
                },
                {
                    title: "IT1872TT",
                    imageRelativePath: "/livguard/products/batteries/it1872tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1872tt",
                },
                {
                    title: "IT2060TT",
                    imageRelativePath: "/livguard/products/batteries/it2060tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2060tt",
                },
                {
                    title: "IT2072TT",
                    imageRelativePath: "/livguard/products/batteries/it2072tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2072tt",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "लिवगार्ड टॉल ट्यूबुलर 160 Ah बैटरी 48 महीने की वारंटी के साथ",
                description: "लिवगार्ड INVERTUFF टॉल ट्यूबलर 160 Ah बैटरी 27+21* महीने की वारंटी के साथ 3डी ग्रिड तकनीक और उच्च भंडारण क्षमता के साथ बनाई गई है।",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    it1860tt: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/batteries/it1860tt/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1860tt/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1860tt/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |180Ah | Max. Warranty |Xtra Long Life Battery | Tall Tubular Battery",
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
                    value: "Long Lasting Battery Life for an unlimited flow of energy",
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
                        image: "/livguard/products/batteries/it1860tt/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1860tt/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1860tt/a-plus/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1872TT",
                    imageRelativePath: "/livguard/products/batteries/it1872tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1872tt",
                },
                {
                    title: "IT2060TT",
                    imageRelativePath: "/livguard/products/batteries/it2060tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2060tt",
                },
                {
                    title: "IT2072TT",
                    imageRelativePath: "/livguard/products/batteries/it2072tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2072tt",
                },
                {
                    title: "IT2048TT",
                    imageRelativePath: "/livguard/products/batteries/it2048tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2048tt",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "Buy INVERTUFF Tall Tubular 180 Ah - Livguard Online",
                description: "Livguard INVERTUFF Tall Tubular 180 Ah Battery delivers satisfactory performance every time, with long and durable battery life and a 36+24* Months warranty.",
                canonicalUrl: `/product/it1860tt`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "IT1860TT",
                    "url": "https://www.livguard.com/product/it1860tt",
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
                    image: "/livguard/products/batteries/it1860tt/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1860tt/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1860tt/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |180Ah | Max. Warranty |Xtra Long Life Battery | Tall Tubular Battery",
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
                    text: "टॉल ट्यूबुलर",
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
                    title: "उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "55.0 ± 3%",
                },
                {
                    title: "मूल का देश",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/products/batteries/it1860tt/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1860tt/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1860tt/a-plus/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1872TT",
                    imageRelativePath: "/livguard/products/batteries/it1872tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1872tt",
                },
                {
                    title: "IT2060TT",
                    imageRelativePath: "/livguard/products/batteries/it2060tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2060tt",
                },
                {
                    title: "IT2072TT",
                    imageRelativePath: "/livguard/products/batteries/it2072tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2072tt",
                },
                {
                    title: "IT2048TT",
                    imageRelativePath: "/livguard/products/batteries/it2048tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2048tt",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "ख़रीदें INVERTUFF टॉल ट्यूबुलर 180 Ah - लिवगार्ड ऑनलाइन",
                description: "लिवगार्ड INVERTUFF टॉल ट्यूबलर 180 Ah बैटरी हर बार संतोषजनक प्रदर्शन देता है, लंबी बैटरी लाइफ और 36+24* महीने की वारंटी के साथ।",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    it2048tt: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/batteries/it2048tt/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it2048tt/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it2048tt/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |200Ah | Max. Warranty | Long Life Battery | Tall Tubular Battery",
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
                    value: "Long Lasting Battery Life for an unlimited flow of energy",
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
                        image: "/livguard/products/batteries/it2048tt/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it2048tt/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it2048tt/a-plus/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT2272TT",
                    imageRelativePath: "/livguard/products/batteries/it2272tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2272tt",
                },
                {
                    title: "IT2360TT",
                    imageRelativePath: "/livguard/products/batteries/it2360tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2360tt",
                },
                {
                    title: "IT2672TT",
                    imageRelativePath: "/livguard/products/batteries/it2672tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2672tt",
                },
                {
                    title: "IT2072TT",
                    imageRelativePath: "/livguard/products/batteries/it2072tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2072tt",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "Livguard INVERTUFF Tall Tubular 200 Ah Battery online",
                description: "Buy Livguard INVERTUFF Tall tubular 200 Ah battery with 24+24* months warranty, suitable for small offices, homes, and small shops.",
                canonicalUrl: `/product/it2048tt`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "IT2048TT",
                    "url": "https://www.livguard.com/product/it2048tt",
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
                    image: "/livguard/products/batteries/it2048tt/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it2048tt/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it2048tt/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |200Ah | Max. Warranty | Long Life Battery | Tall Tubular Battery",
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
                    text: "टॉल ट्यूबुलर",
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
                    title: "उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "51.3 ± 3%",
                },
                {
                    title: "मूल का देश",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/products/batteries/it2048tt/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it2048tt/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it2048tt/a-plus/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT2272TT",
                    imageRelativePath: "/livguard/products/batteries/it2272tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2272tt",
                },
                {
                    title: "IT2360TT",
                    imageRelativePath: "/livguard/products/batteries/it2360tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2360tt",
                },
                {
                    title: "IT2672TT",
                    imageRelativePath: "/livguard/products/batteries/it2672tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2672tt",
                },
                {
                    title: "IT2072TT",
                    imageRelativePath: "/livguard/products/batteries/it2072tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2072tt",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "लिवगार्ड INVERTUFF टॉल ट्यूबुलर 200 Ah बैटरी ऑनलाइन",
                description: "ख़रीदें लिवगार्ड INVERTUFF टॉल ट्यूबलर 200 Ah बैटरी 24+24* महीने की वारंटी के साथ, छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त।",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    it1872tt: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/batteries/it1872tt/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1872tt/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1872tt/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |180Ah | Max. Warranty | Ultra Long Life Battery | Tall Tubular Battery",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "48 + 24* Months Warranty",
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
                    value: "48 + 24* Months",
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
                    value: "Long Lasting Battery Life for an unlimited flow of energy",
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
                        image: "/livguard/products/batteries/it1872tt/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1872tt/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1872tt/a-plus/3.jpg",
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
                    imageRelativePath: "/livguard/products/batteries/it2060tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2060tt",
                },
                {
                    title: "IT2072TT",
                    imageRelativePath: "/livguard/products/batteries/it2072tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2072tt",
                },
                {
                    title: "IT2048TT",
                    imageRelativePath: "/livguard/products/batteries/it2048tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2048tt",
                },
                {
                    title: "IT2272TT",
                    imageRelativePath: "/livguard/products/batteries/it2272tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2272tt",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "Tall Tubular 180 Ah battery with 72 months warranty- Livguard",
                description: "Buy Livguard INVERTUFF Tall Tubular 180 Ah Battery with 42+24* Months warranty, which is a suitable Inverter for small offices, homes, and small shops",
                canonicalUrl: `/product/it1872tt`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "IT1866TT",
                    "url": "https://www.livguard.com/product/it1872tt",
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
                    image: "/livguard/products/batteries/it1872tt/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1872tt/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1872tt/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |180Ah | Max. Warranty | Ultra Long Life Battery | Tall Tubular Battery",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "48 + 24* महीने वारंटी",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "180 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "टॉल ट्यूबुलर",
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
                    value: "48 + 24* महीने",
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
                    title: "उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "55.0 ± 3%",
                },
                {
                    title: "मूल का देश",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/products/batteries/it1872tt/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1872tt/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1872tt/a-plus/3.jpg",
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
                    imageRelativePath: "/livguard/products/batteries/it2060tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2060tt",
                },
                {
                    title: "IT2072TT",
                    imageRelativePath: "/livguard/products/batteries/it2072tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2072tt",
                },
                {
                    title: "IT2048TT",
                    imageRelativePath: "/livguard/products/batteries/it2048tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2048tt",
                },
                {
                    title: "IT2272TT",
                    imageRelativePath: "/livguard/products/batteries/it2272tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2272tt",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "टॉल ट्यूबुलर 180 Ah बैटरी 72 महीने की वारंटी के साथ- लिवगार्ड",
                description: "ख़रीदें लिवगार्ड INVERTUFF  टॉल ट्यूबलर 180 Ah बैटरी  48+24* महीने की वारंटी के साथ , छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त।",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    it1636stj: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/batteries/it1636stj/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1636stj/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1636stj/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |160Ah | Max. Warranty | Long Life Battery | Short Jumbo Tubular Battery",
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
                    value: "Long Lasting Battery Life for an unlimited flow of energy",
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
                        image: "/livguard/products/batteries/it1636stj/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1636stj/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1636stj/a-plus/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1672TT",
                    imageRelativePath: "/livguard/products/batteries/it1560stj/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1672tt",
                },
                {
                    title: "IT1642TT",
                    imageRelativePath: "/livguard/products/batteries/it1572tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/it1642tt",
                },
                {
                    title: "IT1648TT",
                    imageRelativePath: "/livguard/products/batteries/it1578tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/it1648tt",
                },
                {
                    title: "IT1860TT",
                    imageRelativePath: "/livguard/products/batteries/it1578tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1860tt",
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
                    "url": "https://www.livguard.com/product/it1636stj",
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
                    image: "/livguard/products/batteries/it1636stj/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1636stj/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it1636stj/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |160Ah | Max. Warranty | Long Life Battery | Short Jumbo Tubular Battery",
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
                    text: "शोर्ट जंबो ट्यूबुलर",
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
                    title: "वारंटी",
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
                    title: "उत्पादक",
                    value: "लिवगार्ड",
                },
                {
                    title: "उत्पाद का वजन",
                    value: "51.3 ± 3%",
                },
                {
                    title: "मूल का देश",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/products/batteries/it1636stj/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1636stj/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it1636stj/a-plus/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT1672TT",
                    imageRelativePath: "/livguard/products/batteries/it1560stj/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1672tt",
                },
                {
                    title: "IT1642TT",
                    imageRelativePath: "/livguard/products/batteries/it1572tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/it1642tt",
                },
                {
                    title: "IT1648TT",
                    imageRelativePath: "/livguard/products/batteries/it1578tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/it1648tt",
                },
                {
                    title: "IT1860TT",
                    imageRelativePath: "/livguard/products/batteries/it1578tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1860tt",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "INVERTUFF शोर्ट ट्यूबुलर जंबो160 Ah बैटरी- लिवगार्ड ऑनलाइन",
                description: "पाइए लिवगार्ड INVERTUFF शोर्ट ट्यूबुलर जंबो160 Ah इनवर्टर बैटरी ऑनलाइन, 18+18* महीने की वारंटी के साथ। छोटे कार्यालयों और घरों के लिए उपयुक्त।",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    it2060tt: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/batteries/it2060tt/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it2060tt/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it2060tt/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |200Ah | Max. Warranty | Xtra Long Life Battery | Tall Tubular Battery",
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
                    value: "Long Lasting Battery Life for an unlimited flow of energy",
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
                        image: "/livguard/products/batteries/it2060tt/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it2060tt/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it2060tt/a-plus/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT2072TT",
                    imageRelativePath: "/livguard/products/batteries/it2072tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2072tt",
                },
                {
                    title: "IT2048TT",
                    imageRelativePath: "/livguard/products/batteries/it2048tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2048tt",
                },
                {
                    title: "IT2272TT",
                    imageRelativePath: "/livguard/products/batteries/it2272tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2272tt",
                },
                {
                    title: "IT2360TT",
                    imageRelativePath: "/livguard/products/batteries/it2360tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2360tt",
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
                    "url": "https://www.livguard.com/product/it2060tt",
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
                    image: "/livguard/products/batteries/it2060tt/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it2060tt/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it2060tt/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |200Ah | Max. Warranty | Xtra Long Life Battery | Tall Tubular Battery",
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
                    text: "टॉल ट्यूबुलर",
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
                    title: "वारंटी",
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
                    title: "मूल का देश",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/products/batteries/it2060tt/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it2060tt/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it2060tt/a-plus/3.jpg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "IT2072TT",
                    imageRelativePath: "/livguard/products/batteries/it2072tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2072tt",
                },
                {
                    title: "IT2048TT",
                    imageRelativePath: "/livguard/products/batteries/it2048tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2048tt",
                },
                {
                    title: "IT2272TT",
                    imageRelativePath: "/livguard/products/batteries/it2272tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2272tt",
                },
                {
                    title: "IT2360TT",
                    imageRelativePath: "/livguard/products/batteries/it2360tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2360tt",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "ख़रीदें INVERTUFF टॉल ट्यूबुलर 200 Ah - लिवगार्ड ऑनलाइन",
                description: "ख़रीदें लिवगार्ड INVERTUFF टॉल ट्यूबलर 200 Ah बैटरी 36+ 24*  महीने की वारंटी के साथ, छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त।",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    it2072tt: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/batteries/it2072tt/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it2072tt/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it2072tt/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |200Ah | Max. Warranty | Ultra Long Life Battery | Tall Tubular Battery",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "48 + 24* Months Warranty",
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
                    value: "48 + 24* Months",
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
                    value: "Long Lasting Battery Life for an unlimited flow of energy",
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
                        image: "/livguard/products/batteries/it2072tt/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it2072tt/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it2072tt/a-plus/3.jpg",
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
                    imageRelativePath: "/livguard/products/batteries/it2048tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2048tt",
                },
                {
                    title: "IT2272TT",
                    imageRelativePath: "/livguard/products/batteries/it2272tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2272tt",
                },
                {
                    title: "IT2360TT",
                    imageRelativePath: "/livguard/products/batteries/it2360tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2360tt",
                },
                {
                    title: "IT2672TT",
                    imageRelativePath: "/livguard/products/batteries/it2672tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2672tt",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "Buy INVERTUFF Tall Tubular 200 Ah Battery - Livguard",
                description: "Get Livguard INVERTUFF tall tubular 200 Ah battery with 48+24* months warranty, a suitable inverter for small offices, homes, and small shops.",
                canonicalUrl: `/product/it2072tt`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "IT2066TT",
                    "url": "https://www.livguard.com/product/it2072tt",
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
                    image: "/livguard/products/batteries/it2072tt/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it2072tt/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it2072tt/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |200Ah | Max. Warranty | Ultra Long Life Battery | Tall Tubular Battery",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "48 + 24* महीने वारंटी",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "200 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "टॉल ट्यूबुलर",
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
                    title: "वारंटी",
                    value: "48 + 24* महीने",
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
                    title: "मूल का देश",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/products/batteries/it2072tt/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it2072tt/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it2072tt/a-plus/3.jpg",
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
                    imageRelativePath: "/livguard/products/batteries/it2048tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2048tt",
                },
                {
                    title: "IT2272TT",
                    imageRelativePath: "/livguard/products/batteries/it2272tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2272tt",
                },
                {
                    title: "IT2360TT",
                    imageRelativePath: "/livguard/products/batteries/it2360tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2360tt",
                },
                {
                    title: "IT2672TT",
                    imageRelativePath: "/livguard/products/batteries/it2672tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2672tt",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "ख़रीदें INVERTUFF टॉल ट्यूबुलर 200 Ah बैटरी - लिवगार्ड",
                description: "ख़रीदें लिवगार्ड INVERTUFF टॉल ट्यूबलर 200 Ah बैटरी 48+24*  महीने की वारंटी के साथ, छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त।",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    it2272tt: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/batteries/it2272tt/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it2272tt/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it2272tt/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |220Ah | Max. Warranty |Ultra Long Life Battery | Tall Tubular Battery",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "48 + 24* Months Warranty",
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
                    value: "48 + 24* Months",
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
                    value: "Long Lasting Battery Life for an unlimited flow of energy",
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
                        image: "/livguard/products/batteries/it2272tt/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it2272tt/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it2272tt/a-plus/3.jpg",
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
                    imageRelativePath: "/livguard/products/batteries/it2360tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2360tt",
                },
                {
                    title: "IT2672TT",
                    imageRelativePath: "/livguard/products/batteries/it2672tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2672tt",
                },
                {
                    title: "IT2048TT",
                    imageRelativePath: "/livguard/products/batteries/it2048tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2048tt",
                },
                {
                    title: "IT2072TT",
                    imageRelativePath: "/livguard/products/batteries/it2072tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2072tt",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "Tall Tubular 220 Ah with 6-year warranty - Livguard",
                description: "Buy Livguard INVERTUFF Tall Tubular 220 Ah battery with 48+24* months warranty. Suitable inverter is for small offices, homes, and small shops?",
                canonicalUrl: `/product/it2272tt`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "IT2266TT",
                    "url": "https://www.livguard.com/product/it2272tt",
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
                    image: "/livguard/products/batteries/it2272tt/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it2272tt/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it2272tt/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |220Ah | Max. Warranty |Ultra Long Life Battery | Tall Tubular Battery",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "48 + 24* महीने वारंटी",
                },
                {
                    icon: "/livguard/icons/battery_capacity.png",
                    text: "220 Ah",
                },
                {
                    icon: "/livguard/icons/tall tubular white.png",
                    text: "टॉल ट्यूबुलर",
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
                    value: "48 + 24* महीने",
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
                    title: "मूल का देश",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/products/batteries/it2272tt/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it2272tt/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it2272tt/a-plus/3.jpg",
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
                    imageRelativePath: "/livguard/products/batteries/it2360tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2360tt",
                },
                {
                    title: "IT2672TT",
                    imageRelativePath: "/livguard/products/batteries/it2672tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2672tt",
                },
                {
                    title: "IT2048TT",
                    imageRelativePath: "/livguard/products/batteries/it2048tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2048tt",
                },
                {
                    title: "IT2072TT",
                    imageRelativePath: "/livguard/products/batteries/it2072tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2072tt",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "टॉल ट्यूबुलर 220 Ah 6 वर्ष की वारंटी के साथ - लिवगार्ड",
                description: "ख़रीदें लिवगार्ड INVERTUFF टॉल ट्यूबलर 220 Ah बैटरी  48+24*  महीने की वारंटी के साथ, छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त।",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    it2360tt: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/batteries/it2360tt/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it2360tt/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it2360tt/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |230Ah | Max. Warranty | Xtra Long Life Battery | Tall Tubular Battery",
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
                    value: "Long Lasting Battery Life for an unlimited flow of energy",
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
                        image: "/livguard/products/batteries/it2360tt/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it2360tt/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it2360tt/a-plus/3.jpg",
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
                    imageRelativePath: "/livguard/products/batteries/it2672tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2672tt",
                },
                {
                    title: "IT2272TT",
                    imageRelativePath: "/livguard/products/batteries/it2272tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2272tt",
                },
                {
                    title: "IT2048TT",
                    imageRelativePath: "/livguard/products/batteries/it2048tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2048tt",
                },
                {
                    title: "IT2072TT",
                    imageRelativePath: "/livguard/products/batteries/it2072tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2072tt",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "Tall Tubular 230 battery with 60 months warranty- Livguard",
                description: "Get Livguard INVERTUFF tall tubular 230 Ah battery with 36 +24* months warranty, suitable inverter for small offices, homes, and small shops.",
                canonicalUrl: `/product/it2360tt`,
                schema: `
                {
                    "@context": "http://schema.org",
                    "@type": "Product",
                    "name": "IT2360TT",
                    "url": "https://www.livguard.com/product/it2360tt",
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
                    image: "/livguard/products/batteries/it2360tt/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it2360tt/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it2360tt/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |230Ah | Max. Warranty | Xtra Long Life Battery | Tall Tubular Battery",
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
                    text: "टॉल ट्यूबुलर",
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
                    title: "वारंटी",
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
                    title: "मूल का देश",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/products/batteries/it2360tt/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it2360tt/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it2360tt/a-plus/3.jpg",
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
                    imageRelativePath: "/livguard/products/batteries/it2672tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2672tt",
                },
                {
                    title: "IT2272TT",
                    imageRelativePath: "/livguard/products/batteries/it2272tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2272tt",
                },
                {
                    title: "IT2048TT",
                    imageRelativePath: "/livguard/products/batteries/it2048tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2048tt",
                },
                {
                    title: "IT2072TT",
                    imageRelativePath: "/livguard/products/batteries/it2072tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2072tt",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "टॉल ट्यूबुलर 230 बैटरी 60 महीने की वारंटी के साथ -  लिवगार्ड",
                description: "ख़रीदें लिवगार्ड INVERTUFF टॉल ट्यूबलर 230 Ah बैटरी  36 +24* महीने की वारंटी के साथ, छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त।",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    it2672tt: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/batteries/it2672tt/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it2672tt/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it2672tt/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |260Ah | Max. Warranty |Ultra Long Life Battery | Tall Tubular Battery",
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
                    value: "Long Lasting Battery Life for an unlimited flow of energy",
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
                        image: "/livguard/products/batteries/it2672tt/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it2672tt/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it2672tt/a-plus/3.jpg",
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
                    imageRelativePath: "/livguard/products/batteries/it2360tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2360tt",
                },
                {
                    title: "IT2272TT",
                    imageRelativePath: "/livguard/products/batteries/it2272tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2272tt",
                },
                {
                    title: "IT2048TT",
                    imageRelativePath: "/livguard/products/batteries/it2048tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2048tt",
                },
                {
                    title: "IT2072TT",
                    imageRelativePath: "/livguard/products/batteries/it2072tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it2072tt",
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
                    "url": "https://www.livguard.com/product/it2672tt",
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
                    image: "/livguard/products/batteries/it2672tt/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/batteries/it2672tt/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/batteries/it2672tt/infographics/3.jpg",
                },
            ],
            title: "Livguard | Inverter Battery for Small Office, Home and Small Shops | Invertuff |260Ah | Max. Warranty |Ultra Long Life Battery | Tall Tubular Battery",
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
                    text: "टॉल ट्यूबुलर",
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
                    title: "मूल का देश",
                    value: "भारत",
                },
            ],
            productDescription: {
                description: "हमारी लिवगार्ड बैटरी अपने घर लायें और अनुभव करें असीमित ऊर्जा। 3डी ग्रिड तकनीक और बड़ी संग्रहण क्षमता के साथ बनी हमारी बैटरियाँ आपको लंबे समय तक संतुष्टि देंगी।",
                images: [
                    {
                        image: "/livguard/products/batteries/it2672tt/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it2672tt/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/batteries/it2672tt/a-plus/3.jpg",
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
                    imageRelativePath: "/livguard/products/batteries/it1560stj/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1560stj",
                },
                {
                    title: "IT1554TT",
                    imageRelativePath: "/livguard/products/batteries/it1572tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/it1572tt",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/products/batteries/it1578tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/it1578tt",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/products/batteries/it1578tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1578tt",
                },
            ],
            type: ProductType.battery,
            metadata: {
                title: "ख़रीदें लिवगार्ड INVERTUFF टॉल ट्यूबुलर 260 Ah बैटरी",
                description: "ख़रीदें लिवगार्ड INVERTUFF टॉल ट्यूबलर 260 Ah बैटरी; लंबे समय तक चलने वाली बैटरी लाइफ के साथ , ऊर्जा के असीमित प्रवाह के लिए।",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    "urban-combo": {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/jodis/urban-jodi/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/jodis/urban-jodi/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/jodis/urban-jodi/infographics/3.jpg",
                },
            ],
            title: "Livguard Inverter / Inverter Battery Combo i-verter pro / INVERTUFF Sinewave / Short Tall Tubular 900 VA / 150 Ah with 3 year / 36+24 Month Warranty.",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description: "Bring home the power of limitless energy with our amazingly curated combos. Made to perfectly match your needs efficiently.",
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
                description: "For your home, choose nothing but the best! With Livguard inverter and battery combo, unlock unlimited energy powered by amazing features",
                images: [
                    {
                        image: "/livguard/products/jodis/urban-jodi/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/jodis/urban-jodi/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/jodis/urban-jodi/a-plus/3.jpg",
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
                    imageRelativePath: "/livguard/products/batteries/it1560stj/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1560stj",
                },
                {
                    title: "IT1554TT",
                    imageRelativePath: "/livguard/products/batteries/it1572tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/it1572tt",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/products/batteries/it1578tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/it1578tt",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/products/batteries/it1578tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1578tt",
                },
            ],
            type: ProductType.combo,
            metadata: {
                title: "Buy Livguard Inverter and Battery Urban Combo Online",
                description: "Livguard Urban Combo comes with i-verter pro Sinewave 1500 VA Inverter and INVERTUFF Tall Tubular 150 Ah Battery Backed with Smart Artificial Intelligent Charging",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/products/jodis/urban-jodi/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/jodis/urban-jodi/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/jodis/urban-jodi/infographics/3.jpg",
                },
            ],
            title: "लिवगार्ड इनवर्टर / इनवर्टर बैटरी कॉम्बो i-वर्टर प्रो / INVERTUFF साइनवेव / शोर्ट ट्यूबुलर  900 VA / 150 Ah 3 वर्ष / 36+24* महीने की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description: "हमारे असीम कुशलता से तैयार किए गए कॉम्बो के साथ असीम ऊर्जा की शक्ति को घर लाएं। यह कॉम्बो आपकी आवश्यकताओं को पूरी तरह से कुशलता से मेल खाने के लिए बनाए गए हैं",
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
                    text: "साइन वेव + शोर्ट टॉल ट्यूबलर",
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
                    title: "उत्पादक",
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
                description: "अपने घर के लिए, कुछ आम नहीं बल्कि सबसे अच्छा चुनें! लिवगार्ड इन्वर्टर और बैटरी कॉम्बो के साथ, अद्भुत सुविधाओं द्वारा संचालित असीमित ऊर्जा अनलॉक करें।",
                images: [
                    {
                        image: "/livguard/products/jodis/urban-jodi/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/jodis/urban-jodi/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/jodis/urban-jodi/a-plus/3.jpg",
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
                    imageRelativePath: "/livguard/products/batteries/it1560stj/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1560stj",
                },
                {
                    title: "IT1554TT",
                    imageRelativePath: "/livguard/products/batteries/it1572tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/it1572tt",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/products/batteries/it1578tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/it1578tt",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/products/batteries/it1578tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1578tt",
                },
            ],
            type: ProductType.combo,
            metadata: {
                title: "ख़रीदें लिवगार्ड इनवर्टर और बैटरी अर्बन कॉम्बो ऑनलाइन",
                description: "लिवगार्ड अर्बन कॉम्बो, i-वर्टर प्रो साइन वेव 1500 VA इनवर्टर  और INVERTUFF टॉल ट्यूबलर 150 Ah बैटरी के साथ आती है। यह कॉम्बो स्मार्ट ए आई चार्जिंग से युक्त है।",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    "peace-of-mind-combo": {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/jodis/peace-of-mind-jodi/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/jodis/peace-of-mind-jodi/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/jodis/peace-of-mind-jodi/infographics/3.jpg",
                },
            ],
            title: "Livguard Inverter / Inverter Battery Combo i2-verter pro / INVERTUFF Square wave / Tall Tubular 1250 VA / 200 Ah with 3 year / 36+24 Month Warranty",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description: "Bring home the power of limitless energy with our amazingly curated combos. Made to perfectly match your needs efficiently.",
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
                description: "For your home, choose nothing but the best! With Livguard inverter and battery combo, unlock unlimited energy powered by amazing features",
                images: [
                    {
                        image: "/livguard/products/jodis/peace-of-mind-jodi/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/jodis/peace-of-mind-jodi/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/jodis/peace-of-mind-jodi/a-plus/3.jpg",
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
                    imageRelativePath: "/livguard/products/batteries/it1560stj/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1560stj",
                },
                {
                    title: "IT1554TT",
                    imageRelativePath: "/livguard/products/batteries/it1572tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/it1572tt",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/products/batteries/it1578tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/it1578tt",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/products/batteries/it1578tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1578tt",
                },
            ],
            type: ProductType.combo,
            metadata: {
                title: "Buy Livguard Inverter and battery peace of mind combo online",
                description: "Livguard Peace of mind Combo comes with an i2-verter pro Square wave 1250 VA Inverter and  INVERTUFF  Tall Tubular 200 Ah Battery",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/products/jodis/peace-of-mind-jodi/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/jodis/peace-of-mind-jodi/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/jodis/peace-of-mind-jodi/infographics/3.jpg",
                },
            ],
            title: "लिवगार्ड इनवर्टर / इनवर्टर बैटरी कॉम्बो i2-वर्टर प्रो / INVERTUFF स्क्वायर वेव / टॉल ट्यूबलर 1250 VA / 200 Ah 3 वर्ष / 36+24* महीने की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description: "हमारे असीम कुशलता से तैयार किए गए कॉम्बो के साथ असीम ऊर्जा की शक्ति को घर लाएं। यह कॉम्बो आपकी आवश्यकताओं को पूरी तरह से कुशलता से मेल खाने के लिए बनाए गए हैं",
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
                    text: "चौकोर तरंग + टॉल ट्यूबलर",
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
                    title: "उत्पादक",
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
                description: "अपने घर के लिए, कुछ आम नहीं बल्कि सबसे अच्छा चुनें! लिवगार्ड इन्वर्टर और बैटरी कॉम्बो के साथ, अद्भुत सुविधाओं द्वारा संचालित असीमित ऊर्जा अनलॉक करें।",
                images: [
                    {
                        image: "/livguard/products/jodis/peace-of-mind-jodi/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/jodis/peace-of-mind-jodi/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/jodis/peace-of-mind-jodi/a-plus/3.jpg",
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
                    imageRelativePath: "/livguard/products/batteries/it1560stj/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1560stj",
                },
                {
                    title: "IT1554TT",
                    imageRelativePath: "/livguard/products/batteries/it1572tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/it1572tt",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/products/batteries/it1578tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/it1578tt",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/products/batteries/it1578tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1578tt",
                },
            ],
            type: ProductType.combo,
            metadata: {
                title: "ख़रीदें लिवगार्ड इनवर्टर और बैटरी मन की शांति वाली कॉम्बो ऑनलाइन",
                description: "लिवगार्ड  मन की शांति वाली कॉम्बो,  i2-वर्टर प्रो स्क्वायर वेव 1250 VA इनवर्टर  और INVERTUFF टॉल ट्यूबलर 200 Ah बैटरी के साथ आती है।",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    "super-life-combo": {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/jodis/super-life-jodi/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/jodis/super-life-jodi/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/jodis/super-life-jodi/infographics/3.jpg",
                },
            ],
            title: "Livguard Inverter / Inverter Battery Combo i-verter pro / INVERTUFF Sinewave / Tall Tubular 1500 VA / 150 Ah with 3 year / 60+24 Month Warranty.",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description: "Bring home the power of limitless energy with our amazingly curated combos. Made to perfectly match your needs efficiently.",
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
                description: "For your home, choose nothing but the best! With Livguard inverter and battery combo, unlock unlimited energy powered by amazing features",
                images: [
                    {
                        image: "/livguard/products/jodis/super-life-jodi/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/jodis/super-life-jodi/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/jodis/super-life-jodi/a-plus/3.jpg",
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
                    imageRelativePath: "/livguard/products/batteries/it1560stj/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1560stj",
                },
                {
                    title: "IT1554TT",
                    imageRelativePath: "/livguard/products/batteries/it1572tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/it1572tt",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/products/batteries/it1578tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/it1578tt",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/products/batteries/it1578tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1578tt",
                },
            ],
            type: ProductType.combo,
            metadata: {
                title: "Buy Livguard Inverter and Battery super life Combo online",
                description: "Livguard Super life Combo comes with i-verter pro Sinewave 1500 VA Inverter and  INVERTUFF Tall Tubular 150 Ah  Battery with High Charge Acceptance For Higher Backup",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/products/jodis/super-life-jodi/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/jodis/super-life-jodi/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/jodis/super-life-jodi/infographics/3.jpg",
                },
            ],
            title: "लिवगार्ड इनवर्टर / इनवर्टर बैटरी कॉम्बो i-वर्टर प्रो / INVERTUFF साइनवेव / टॉल ट्यूबुलर  1500 VA / 150 Ah 3 वर्ष / 60+24* महीने की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description: "हमारे असीम कुशलता से तैयार किए गए कॉम्बो के साथ असीम ऊर्जा की शक्ति को घर लाएं। यह कॉम्बो आपकी आवश्यकताओं को पूरी तरह से कुशलता से मेल खाने के लिए बनाए गए हैं",
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
                    text: "साइन वेव + टॉल ट्यूबलर",
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
                    title: "उत्पादक",
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
                description: "अपने घर के लिए, कुछ आम नहीं बल्कि सबसे अच्छा चुनें! लिवगार्ड इन्वर्टर और बैटरी कॉम्बो के साथ, अद्भुत सुविधाओं द्वारा संचालित असीमित ऊर्जा अनलॉक करें।",
                images: [
                    {
                        image: "/livguard/products/jodis/super-life-jodi/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/jodis/super-life-jodi/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/jodis/super-life-jodi/a-plus/3.jpg",
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
                    imageRelativePath: "/livguard/products/batteries/it1560stj/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1560stj",
                },
                {
                    title: "IT1554TT",
                    imageRelativePath: "/livguard/products/batteries/it1572tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/it1572tt",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/products/batteries/it1578tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/it1578tt",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/products/batteries/it1578tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1578tt",
                },
            ],
            type: ProductType.combo,
            metadata: {
                title: "ख़रीदें लिवगार्ड इनवर्टर और बैटरी सुपर लाइफ कॉम्बो ऑनलाइन",
                description:
                    "लिवगार्ड सुपर लाइफ कॉम्बो, i-वर्टर प्रो साइन वेव 1500 VA इनवर्टर और INVERTUFF टॉल ट्यूबलर 150 Ah बैटरी के साथ आती है। यह कॉम्बो उच्च बैकअप के लिए उच्च शुल्क स्वीकृति के योग्य है।",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    "hi-power-combo": {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/jodis/hi-power-jodi/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/jodis/hi-power-jodi/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/jodis/hi-power-jodi/infographics/3.jpg",
                },
            ],
            title: "Livguard Inverter / Inverter Battery Combo Heavy Duty / INVERTUFF Sinewave / Tall Tubular 2000 VA / 260 Ah with 3 year / 42+30 Month Warranty.",
            subTitle: "(Suitable Inverter for small offices, homes, and small shops)",
            description: "Bring home the power of limitless energy with our amazingly curated combos. Made to perfectly match your needs efficiently.",
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
                description: "For your home, choose nothing but the best! With Livguard inverter and battery combo, unlock unlimited energy powered by amazing features",
                images: [
                    {
                        image: "/livguard/products/jodis/hi-power-jodi/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/jodis/hi-power-jodi/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/jodis/hi-power-jodi/a-plus/3.jpg",
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
                    imageRelativePath: "/livguard/products/batteries/it1560stj/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1560stj",
                },
                {
                    title: "IT1554TT",
                    imageRelativePath: "/livguard/products/batteries/it1572tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/it1572tt",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/products/batteries/it1578tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/it1578tt",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/products/batteries/it1578tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1578tt",
                },
            ],
            type: ProductType.combo,
            metadata: {
                title: "Buy Livguard Inverter and Battery Hi-power Combo online",
                description: "Livguard Hi-power combo comes with a Heavy Duty Sinewave 2000 VA  Inverter combined with INVERTUFF Tall Tubular 260 Ah Battery that has a Heavy load handling capacity",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/products/jodis/hi-power-jodi/infographics/1.jpg",
                },
                {
                    image: "/livguard/products/jodis/hi-power-jodi/infographics/2.jpg",
                },
                {
                    image: "/livguard/products/jodis/hi-power-jodi/infographics/3.jpg",
                },
            ],
            title: "लिवगार्ड इनवर्टर / इनवर्टर बैटरी कॉम्बो हेवी ड्यूटी / INVERTUFF साइनवेव / टॉल ट्यूबलर  2000 VA / 260 Ah 3 वर्ष / 42+30* महीने की वारंटी के साथ",
            subTitle: "(छोटे कार्यालयों, घरों और छोटी दुकानों के लिए उपयुक्त)",
            description: "हमारे असीम कुशलता से तैयार किए गए कॉम्बो के साथ असीम ऊर्जा की शक्ति को घर लाएं। यह कॉम्बो आपकी आवश्यकताओं को पूरी तरह से कुशलता से मेल खाने के लिए बनाए गए हैं",
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
                    text: "साइन वेव + टॉल ट्यूबलर",
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
                    title: "उत्पादक",
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
                description: "अपने घर के लिए, कुछ आम नहीं बल्कि सबसे अच्छा चुनें! लिवगार्ड इन्वर्टर और बैटरी कॉम्बो के साथ, अद्भुत सुविधाओं द्वारा संचालित असीमित ऊर्जा अनलॉक करें।",
                images: [
                    {
                        image: "/livguard/products/jodis/hi-power-jodi/a-plus/1.jpg",
                    },
                    {
                        image: "/livguard/products/jodis/hi-power-jodi/a-plus/2.jpg",
                    },
                    {
                        image: "/livguard/products/jodis/hi-power-jodi/a-plus/3.jpg",
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
                    imageRelativePath: "/livguard/products/batteries/it1560stj/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1560stj",
                },
                {
                    title: "IT1554TT",
                    imageRelativePath: "/livguard/products/batteries/it1572tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/it1572tt",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/products/batteries/it1578tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: true,
                    link: "/product/it1578tt",
                },
                {
                    title: "IT1560TT",
                    imageRelativePath: "/livguard/products/batteries/it1578tt/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/it1578tt",
                },
            ],
            type: ProductType.combo,
            metadata: {
                title: "ख़रीदें लिवगार्ड इनवर्टर और बैटरी हाई-पॉवर कॉम्बो ऑनलाइन",
                description:
                    "लिवगार्ड हाई-पावर कॉम्बो हैवी ड्यूटी साइन वेव 2000 VA इनवर्टर  के साथ आती है जिसमें INVERTUFF टॉल ट्यूबलर 260 Ah बैटरी है। यह कॉम्बो भारी लोड संभलने की क्षमता से युक्त है।",
                canonicalUrl: "",
                schema: `

                `,
            },
        },
    },
    ze38b20l: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/ze38b20l/infographics/1.png",
                },
            ],
            title: "Zing Eterna ZE 38B20 L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "36 + 36* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "35 Ah @ C₂₀",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "306(L) X 173(W) X 225(H) mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "Zing Eterna ZE 38B20 L",
                },
                {
                    title: "Warranty",
                    value: "36 + 36* Months",
                },
                {
                    title: "Capacity",
                    value: "35 Ah @ C₂₀",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
                {
                    title: "Dimensions",
                    value: "306(L) X 173(W) X 225(H) mm",
                },
            ],
            additionalInfo: [{title: "", value: ""}],
            productDescription: {
                description:
                    "Livguard Eterna ZE 38B20 L battery is engineered to suit all SUVs, mid-sized and large sedans. The internal structure is designed using latest technology that provides more power and reserve capacity to the battery making it reliable, consistent and truly maintenance-free.",
                images: [
                    {
                        image: "/livguard/products/automotive-batteries/ze38b20l/a-plus/1.jpeg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "ETERNA ZE 38B20L",
                    imageRelativePath: "/livguard/products/automotive-batteries/ze38b20l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/ze38b20l",
                },
                {
                    title: "ETERNA ZE 38B20R",
                    imageRelativePath: "/livguard/products/automotive-batteries/ze38b20r/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/ze38b20r",
                },
                {
                    title: "ETRENA ZE 55B24LS L",
                    imageRelativePath: "/livguard/products/automotive-batteries/ze55b24lsl/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/ze55b24lsl",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [{value: ""}],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/ze38b20l/infographics/1.png",
                },
            ],
            title: "Zing Eterna ZE 38B20 L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "36 + 36* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "35 Ah @ C₂₀",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "306(L) X 173(W) X 225(H) mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "Zing Eterna ZE 38B20 L",
                },
                {
                    title: "Warranty",
                    value: "36 + 36* Months",
                },
                {
                    title: "Capacity",
                    value: "35 Ah @ C₂₀",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
                {
                    title: "Dimensions",
                    value: "306(L) X 173(W) X 225(H) mm",
                },
            ],
            additionalInfo: [{title: "", value: ""}],
            productDescription: {
                description:
                    "Livguard Eterna ZE 38B20 L battery is engineered to suit all SUVs, mid-sized and large sedans. The internal structure is designed using latest technology that provides more power and reserve capacity to the battery making it reliable, consistent and truly maintenance-free.",
                images: [
                    {
                        image: "/livguard/products/automotive-batteries/ze38b20l/a-plus/1.jpeg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "ETERNA ZE 38B20L",
                    imageRelativePath: "/livguard/products/automotive-batteries/ze38b20l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/ze38b20l",
                },
                {
                    title: "ETERNA ZE 38B20R",
                    imageRelativePath: "/livguard/products/automotive-batteries/ze38b20r/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/ze38b20r",
                },
                {
                    title: "ETRENA ZE 55B24LS L",
                    imageRelativePath: "/livguard/products/automotive-batteries/ze55b24lsl/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/ze55b24lsl",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [{value: ""}],
        },
    },
    ze38b20r: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/ze38b20r/infographics/1.png",
                },
            ],
            title: "Zing Eterna ZE 38B20 R",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "36 + 36* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "35 Ah @ C₂₀",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "R",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "197(L) X 129(W) X 225(H) mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "Zing Eterna ZE 38B20 R",
                },
                {
                    title: "Warranty",
                    value: "36 + 36* Months",
                },
                {
                    title: "Capacity",
                    value: "35 Ah @ C₂₀",
                },
                {
                    title: "Polarity",
                    value: "R",
                },
                {
                    title: "Dimensions",
                    value: "197(L) X 129(W) X 225(H) mm",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Livguard Eterna ZE 38B20 R battery is engineered to suit all SUVs, mid-sized and large sedans. The internal structure is designed using latest technology that provides more power and reserve capacity to the battery making it reliable, consistent and truly maintenance-free.",
                images: [{image: "/livguard/products/automotive-batteries/ze38b20r/a-plus/1.jpeg"}],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "ETERNA ZE 38B20L",
                    imageRelativePath: "/livguard/products/automotive-batteries/ze38b20l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/ze38b20l",
                },
                {
                    title: "ETERNA ZE 38B20R",
                    imageRelativePath: "/livguard/products/automotive-batteries/ze38b20r/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/ze38b20r",
                },
                {
                    title: "ETRENA ZE 55B24LS L",
                    imageRelativePath: "/livguard/products/automotive-batteries/ze55b24lsl/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/ze55b24lsl",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/ze38b20r/infographics/1.png",
                },
            ],
            title: "Zing Eterna ZE 38B20 R",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "36 + 36* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "35 Ah @ C₂₀",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "R",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "197(L) X 129(W) X 225(H) mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "Zing Eterna ZE 38B20 R",
                },
                {
                    title: "Warranty",
                    value: "36 + 36* Months",
                },
                {
                    title: "Capacity",
                    value: "35 Ah @ C₂₀",
                },
                {
                    title: "Polarity",
                    value: "R",
                },
                {
                    title: "Dimensions",
                    value: "197(L) X 129(W) X 225(H) mm",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Livguard Eterna ZE 38B20 R battery is engineered to suit all SUVs, mid-sized and large sedans. The internal structure is designed using latest technology that provides more power and reserve capacity to the battery making it reliable, consistent and truly maintenance-free.",
                images: [{image: "/livguard/products/automotive-batteries/ze38b20r/a-plus/1.jpeg"}],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "ETERNA ZE 38B20L",
                    imageRelativePath: "/livguard/products/automotive-batteries/ze38b20l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/ze38b20l",
                },
                {
                    title: "ETERNA ZE 38B20R",
                    imageRelativePath: "/livguard/products/automotive-batteries/ze38b20r/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/ze38b20r",
                },
                {
                    title: "ETRENA ZE 55B24LS L",
                    imageRelativePath: "/livguard/products/automotive-batteries/ze55b24lsl/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/ze55b24lsl",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
    },
    ze55b24lsl: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/ze55b24lsl/infographics/1.png",
                },
            ],
            title: "Zing Eterna ZE 55B24 LS L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "36 + 36* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "45 Ah @ C₂₀",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "R",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "197(L) X 129(W) X 225(H) mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "Zing Eterna ZE 55B24 LS L",
                },
                {
                    title: "Warranty",
                    value: "36 + 36* Months",
                },
                {
                    title: "Capacity",
                    value: "45 Ah @ C₂₀",
                },
                {
                    title: "Polarity",
                    value: "R",
                },
                {
                    title: "Dimensions",
                    value: "197(L) X 129(W) X 225(H) mm",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Livguard Eterna ZE 55B24LS L battery is engineered to suit all SUVs, mid-sized and large sedans. The internal structure is designed using latest technology that provides more power and reserve capacity to the battery making it reliable, consistent and truly maintenance-free.",
                images: [
                    {
                        image: "/livguard/products/automotive-batteries/ze55b24lsl/a-plus/1.jpeg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "ETERNA ZE 38B20L",
                    imageRelativePath: "/livguard/products/automotive-batteries/ze38b20l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/ze38b20l",
                },
                {
                    title: "ETERNA ZE 38B20R",
                    imageRelativePath: "/livguard/products/automotive-batteries/ze38b20r/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/ze38b20r",
                },
                {
                    title: "ETRENA ZE 55B24LS L",
                    imageRelativePath: "/livguard/products/automotive-batteries/ze55b24lsl/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/ze55b24lsl",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/ze55b24lsl/infographics/1.png",
                },
            ],
            title: "Zing Eterna ZE 55B24 LS L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "36 + 36* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "45 Ah @ C₂₀",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "R",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "197(L) X 129(W) X 225(H) mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "Zing Eterna ZE 55B24 LS L",
                },
                {
                    title: "Warranty",
                    value: "36 + 36* Months",
                },
                {
                    title: "Capacity",
                    value: "45 Ah @ C₂₀",
                },
                {
                    title: "Polarity",
                    value: "R",
                },
                {
                    title: "Dimensions",
                    value: "197(L) X 129(W) X 225(H) mm",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Livguard Eterna ZE 55B24LS L battery is engineered to suit all SUVs, mid-sized and large sedans. The internal structure is designed using latest technology that provides more power and reserve capacity to the battery making it reliable, consistent and truly maintenance-free.",
                images: [
                    {
                        image: "/livguard/products/automotive-batteries/ze55b24lsl/a-plus/1.jpeg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "ETERNA ZE 38B20L",
                    imageRelativePath: "/livguard/products/automotive-batteries/ze38b20l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/ze38b20l",
                },
                {
                    title: "ETERNA ZE 38B20R",
                    imageRelativePath: "/livguard/products/automotive-batteries/ze38b20r/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/ze38b20r",
                },
                {
                    title: "ETRENA ZE 55B24LS L",
                    imageRelativePath: "/livguard/products/automotive-batteries/ze55b24lsl/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/ze55b24lsl",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
    },
    zu38b20l: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/zu38b20l/infographics/1.png",
                },
            ],
            title: "Zing Ultra ZU 38B20 L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "30 + 36* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "35 Ah @ C₂₀",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "197(L) X 129(W) X 225(H) mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "Zing Ultra ZU 38B20 L",
                },
                {
                    title: "Warranty",
                    value: "30 + 36* Months",
                },
                {
                    title: "Capacity",
                    value: "35 Ah @ C₂₀",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
                {
                    title: "Dimensions",
                    value: "197(L) X 129(W) X 225(H) mm",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Livguard Ultra ZU 38B20 L battery is engineered to suit all SUVs, mid-sized and large sedans. The internal structure is designed using latest technology that provides more power and reserve capacity to the battery making it reliable, consistent and truly maintenance-free.",
                images: [
                    {
                        image: "/livguard/products/automotive-batteries/zu38b20l/a-plus/1.jpeg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "ULTRA ZU 38B20 L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20l",
                },
                {
                    title: "ULTRA ZE 38B20 R",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20r/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20r",
                },
                {
                    title: "ULTRA ZU 38B20 BH L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20bhl/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20bhl",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/zu38b20l/infographics/1.png",
                },
            ],
            title: "Zing Ultra ZU 38B20 L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "30 + 36* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "35 Ah @ C₂₀",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "197(L) X 129(W) X 225(H) mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "Zing Ultra ZU 38B20 L",
                },
                {
                    title: "Warranty",
                    value: "30 + 36* Months",
                },
                {
                    title: "Capacity",
                    value: "35 Ah @ C₂₀",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
                {
                    title: "Dimensions",
                    value: "197(L) X 129(W) X 225(H) mm",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Livguard Ultra ZU 38B20 L battery is engineered to suit all SUVs, mid-sized and large sedans. The internal structure is designed using latest technology that provides more power and reserve capacity to the battery making it reliable, consistent and truly maintenance-free.",
                images: [
                    {
                        image: "/livguard/products/automotive-batteries/zu38b20l/a-plus/1.jpeg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "ULTRA ZU 38B20 L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20l",
                },
                {
                    title: "ULTRA ZE 38B20 R",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20r/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20r",
                },
                {
                    title: "ULTRA ZU 38B20 BH L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20bhl/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20bhl",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
    },
    zu38b20r: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/zu38b20r/infographics/1.png",
                },
            ],
            title: "Zing Ultra ZU 38B20 R",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "30 + 30* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "35 Ah @ C₂₀",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "197(L) X 129(W) X 225(H) mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "Zing Ultra ZU 38B20 R",
                },
                {
                    title: "Warranty",
                    value: "30 + 30* Months",
                },
                {
                    title: "Capacity",
                    value: "35 Ah @ C₂₀",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
                {
                    title: "Dimensions",
                    value: "197(L) X 129(W) X 225(H) mm",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Livguard Ultra ZU 38B20 R battery is engineered to suit all SUVs, mid-sized and large sedans. The internal structure is designed using latest technology that provides more power and reserve capacity to the battery making it reliable, consistent and truly maintenance-free.",
                images: [
                    {
                        image: "/livguard/products/automotive-batteries/zu38b20r/a-plus/1.jpeg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "ULTRA ZU 38B20 L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20l",
                },
                {
                    title: "ULTRA  ZE 38B20  R",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20r/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20r",
                },
                {
                    title: "ULTRA ZU 38B20 BH L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20bhl/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20bhl",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/zu38b20r/infographics/1.png",
                },
            ],
            title: "Zing Ultra ZU 38B20 R",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "30 + 30* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "35 Ah @ C₂₀",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "197(L) X 129(W) X 225(H) mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "Zing Ultra ZU 38B20 R",
                },
                {
                    title: "Warranty",
                    value: "30 + 30* Months",
                },
                {
                    title: "Capacity",
                    value: "35 Ah @ C₂₀",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
                {
                    title: "Dimensions",
                    value: "197(L) X 129(W) X 225(H) mm",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Livguard Ultra ZU 38B20 R battery is engineered to suit all SUVs, mid-sized and large sedans. The internal structure is designed using latest technology that provides more power and reserve capacity to the battery making it reliable, consistent and truly maintenance-free.",
                images: [
                    {
                        image: "/livguard/products/automotive-batteries/zu38b20r/a-plus/1.jpeg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "ULTRA ZU 38B20 L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20l",
                },
                {
                    title: "ULTRA  ZE 38B20  R",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20r/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20r",
                },
                {
                    title: "ULTRA ZU 38B20 BH L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20bhl/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20bhl",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
    },
    zu38b20bhl: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/zu38b20bhl/infographics/1.png",
                },
            ],
            title: "Zing Ultra ZU 38B20 BH L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "30 + 30* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "35 Ah @ C₂₀",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "197(L) X 129(W) X 225(H) mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "Zing Ultra ZU 38B20 BH L",
                },
                {
                    title: "Warranty",
                    value: "30 + 30* Months",
                },
                {
                    title: "Capacity",
                    value: "35 Ah @ C₂₀",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
                {
                    title: "Dimensions",
                    value: "197(L) X 129(W) X 225(H) mm",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Livguard Ultra ZU 38B20 BH L battery is engineered to suit all SUVs, mid-sized and large sedans. The internal structure is designed using latest technology that provides more power and reserve capacity to the battery making it reliable, consistent and truly maintenance-free.",
                images: [
                    {
                        image: "/livguard/products/automotive-batteries/zu38b20bhl/a-plus/1.jpeg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "ULTRA ZU 38B20 L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20l",
                },
                {
                    title: "ULTRA ZE 38B20 R",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20r/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20r",
                },
                {
                    title: "ULTRA ZU 38B20 BH L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20bhl/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20bhl",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/zu38b20bhl/infographics/1.png",
                },
            ],
            title: "Zing Ultra ZU 38B20 BH L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "30 + 30* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "35 Ah @ C₂₀",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "197(L) X 129(W) X 225(H) mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "Zing Ultra ZU 38B20 BH L",
                },
                {
                    title: "Warranty",
                    value: "30 + 30* Months",
                },
                {
                    title: "Capacity",
                    value: "35 Ah @ C₂₀",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
                {
                    title: "Dimensions",
                    value: "197(L) X 129(W) X 225(H) mm",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Livguard Ultra ZU 38B20 BH L battery is engineered to suit all SUVs, mid-sized and large sedans. The internal structure is designed using latest technology that provides more power and reserve capacity to the battery making it reliable, consistent and truly maintenance-free.",
                images: [
                    {
                        image: "/livguard/products/automotive-batteries/zu38b20bhl/a-plus/1.jpeg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "ULTRA ZU 38B20 L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20l",
                },
                {
                    title: "ULTRA ZE 38B20 R",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20r/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20r",
                },
                {
                    title: "ULTRA ZU 38B20 BH L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20bhl/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20bhl",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
    },
    zudin44lhl: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/zudin44lhl/infographics/1.png",
                },
            ],
            title: "Zing Ultra ZU DIN44 LH L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "30 + 30* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "44 Ah @ C₂₀",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "306(L) X 173(W) X 225(H) mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "Zing Ultra ZU DIN44 LH L",
                },
                {
                    title: "Warranty",
                    value: "30 + 30* Months",
                },
                {
                    title: "Capacity",
                    value: "44 Ah @ C₂₀",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
                {
                    title: "Dimensions",
                    value: "306(L) X 173(W) X 225(H) mm",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Livguard Ultra ZU DIN44 LH L battery is engineered to suit all SUVs, mid-sized and large sedans. The internal structure is designed using latest technology that provides more power and reserve capacity to the battery making it reliable, consistent and truly maintenance-free.",
                images: [
                    {
                        image: "/livguard/products/automotive-batteries/zudin44lhl/a-plus/1.jpeg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "ULTRA ZU 38B20 L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20l",
                },
                {
                    title: "ULTRA  ZE 38B20  R",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20r/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20r",
                },
                {
                    title: "ULTRA ZU 38B20 BH L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20bhl/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20bhl",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/zudin44lhl/infographics/1.png",
                },
            ],
            title: "Zing Ultra ZU DIN44 LH L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "30 + 30* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "44 Ah @ C₂₀",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "306(L) X 173(W) X 225(H) mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "Zing Ultra ZU DIN44 LH L",
                },
                {
                    title: "Warranty",
                    value: "30 + 30* Months",
                },
                {
                    title: "Capacity",
                    value: "44 Ah @ C₂₀",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
                {
                    title: "Dimensions",
                    value: "306(L) X 173(W) X 225(H) mm",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Livguard Ultra ZU DIN44 LH L battery is engineered to suit all SUVs, mid-sized and large sedans. The internal structure is designed using latest technology that provides more power and reserve capacity to the battery making it reliable, consistent and truly maintenance-free.",
                images: [
                    {
                        image: "/livguard/products/automotive-batteries/zudin44lhl/a-plus/1.jpeg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "ULTRA ZU 38B20 L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20l",
                },
                {
                    title: "ULTRA  ZE 38B20  R",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20r/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20r",
                },
                {
                    title: "ULTRA ZU 38B20 BH L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20bhl/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20bhl",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
    },
    zudin50l: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/zudin50l/infographics/1.png",
                },
            ],
            title: "Zing Ultra ZU DIN50 L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "30 + 30* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "50 Ah @ C₂₀",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "197(L) X 129(W) X 225(H) mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "Zing Ultra ZU DIN50 L",
                },
                {
                    title: "Warranty",
                    value: "30 + 30* Months",
                },
                {
                    title: "Capacity",
                    value: "50 Ah @ C₂₀",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
                {
                    title: "Dimensions",
                    value: "197(L) X 129(W) X 225(H) mm",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Livguard Ultra ZU DIN50 L battery is engineered to suit all SUVs, mid-sized and large sedans. The internal structure is designed using latest technology that provides more power and reserve capacity to the battery making it reliable, consistent and truly maintenance-free.",
                images: [
                    {
                        image: "/livguard/products/automotive-batteries/zudin50l/a-plus/1.jpeg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "ULTRA ZU 38B20 L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20l",
                },
                {
                    title: "ULTRA  ZE 38B20  R",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20r/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20r",
                },
                {
                    title: "ULTRA ZU 38B20 BH L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20bhl/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20bhl",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/zudin50l/infographics/1.png",
                },
            ],
            title: "Zing Ultra ZU DIN50 L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "30 + 30* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "50 Ah @ C₂₀",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "197(L) X 129(W) X 225(H) mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "Zing Ultra ZU DIN50 L",
                },
                {
                    title: "Warranty",
                    value: "30 + 30* Months",
                },
                {
                    title: "Capacity",
                    value: "50 Ah @ C₂₀",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
                {
                    title: "Dimensions",
                    value: "197(L) X 129(W) X 225(H) mm",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Livguard Ultra ZU DIN50 L battery is engineered to suit all SUVs, mid-sized and large sedans. The internal structure is designed using latest technology that provides more power and reserve capacity to the battery making it reliable, consistent and truly maintenance-free.",
                images: [
                    {
                        image: "/livguard/products/automotive-batteries/zudin50l/a-plus/1.jpeg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "ULTRA ZU 38B20 L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20l",
                },
                {
                    title: "ULTRA  ZE 38B20  R",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20r/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20r",
                },
                {
                    title: "ULTRA ZU 38B20 BH L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20bhl/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20bhl",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
    },
    zudin55r: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/zudin55r/infographics/1.png",
                },
            ],
            title: "Zing Ultra ZU DIN55 R",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "30 + 30* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "55 Ah @ C₂₀",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "R",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "197(L) X 129(W) X 225(H) mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "Zing Ultra ZU DIN55 R",
                },
                {
                    title: "Warranty",
                    value: "30 + 30* Months",
                },
                {
                    title: "Capacity",
                    value: "55 Ah @ C₂₀",
                },
                {
                    title: "Polarity",
                    value: "R",
                },
                {
                    title: "Dimensions",
                    value: "197(L) X 129(W) X 225(H) mm",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Livguard Ultra ZE ZU DIN55 R battery is engineered to suit all SUVs, mid-sized and large sedans. The internal structure is designed using latest technology that provides more power and reserve capacity to the battery making it reliable, consistent and truly maintenance-free.",
                images: [
                    {
                        image: "/livguard/products/automotive-batteries/zudin55r/a-plus/1.jpeg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "ULTRA ZU 38B20 L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20l",
                },
                {
                    title: "ULTRA  ZE 38B20  R",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20r/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20r",
                },
                {
                    title: "ULTRA ZU 38B20 BH L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20bhl/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20bhl",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/zudin55r/infographics/1.png",
                },
            ],
            title: "Zing Ultra ZU DIN55 R",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "30 + 30* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "55 Ah @ C₂₀",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "R",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "197(L) X 129(W) X 225(H) mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "Zing Ultra ZU DIN55 R",
                },
                {
                    title: "Warranty",
                    value: "30 + 30* Months",
                },
                {
                    title: "Capacity",
                    value: "55 Ah @ C₂₀",
                },
                {
                    title: "Polarity",
                    value: "R",
                },
                {
                    title: "Dimensions",
                    value: "197(L) X 129(W) X 225(H) mm",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Livguard Ultra ZE ZU DIN55 R battery is engineered to suit all SUVs, mid-sized and large sedans. The internal structure is designed using latest technology that provides more power and reserve capacity to the battery making it reliable, consistent and truly maintenance-free.",
                images: [
                    {
                        image: "/livguard/products/automotive-batteries/zudin55r/a-plus/1.jpeg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "ULTRA ZU 38B20 L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20l",
                },
                {
                    title: "ULTRA  ZE 38B20  R",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20r/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20r",
                },
                {
                    title: "ULTRA ZU 38B20 BH L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20bhl/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20bhl",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
    },
    zudin60l: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/zudin60l/infographics/1.png",
                },
            ],
            title: "Zing Ultra ZU DIN60 L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "30 + 30* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "60 Ah @ C₂₀",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "197(L) X 129(W) X 225(H) mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "Zing Ultra ZU DIN60 L",
                },
                {
                    title: "Warranty",
                    value: "30 + 30* Months",
                },
                {
                    title: "Capacity",
                    value: "60 Ah @ C₂₀",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
                {
                    title: "Dimensions",
                    value: "197(L) X 129(W) X 225(H) mm",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Livguard Ultra ZU DIN60 L battery is engineered to suit all SUVs, mid-sized and large sedans. The internal structure is designed using latest technology that provides more power and reserve capacity to the battery making it reliable, consistent and truly maintenance-free.",
                images: [
                    {
                        image: "/livguard/products/automotive-batteries/zudin60l/a-plus/1.jpeg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "ULTRA ZU 38B20 L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20l",
                },
                {
                    title: "ULTRA  ZE 38B20  R",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20r/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20r",
                },
                {
                    title: "ULTRA ZU 38B20 BH L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20bhl/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20bhl",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/zudin60l/infographics/1.png",
                },
            ],
            title: "Zing Ultra ZU DIN60 L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "30 + 30* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "60 Ah @ C₂₀",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "197(L) X 129(W) X 225(H) mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "Zing Ultra ZU DIN60 L",
                },
                {
                    title: "Warranty",
                    value: "30 + 30* Months",
                },
                {
                    title: "Capacity",
                    value: "60 Ah @ C₂₀",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
                {
                    title: "Dimensions",
                    value: "197(L) X 129(W) X 225(H) mm",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Livguard Ultra ZU DIN60 L battery is engineered to suit all SUVs, mid-sized and large sedans. The internal structure is designed using latest technology that provides more power and reserve capacity to the battery making it reliable, consistent and truly maintenance-free.",
                images: [
                    {
                        image: "/livguard/products/automotive-batteries/zudin60l/a-plus/1.jpeg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "ULTRA ZU 38B20 L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20l",
                },
                {
                    title: "ULTRA  ZE 38B20  R",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20r/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20r",
                },
                {
                    title: "ULTRA ZU 38B20 BH L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20bhl/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20bhl",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
    },
    zudin65lhl: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/zudin65lhl/infographics/1.png",
                },
            ],
            title: "Zing Ultra ZU DIN65 LH L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "30 + 30* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "65 Ah @ C₂₀",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "197(L) X 129(W) X 225(H) mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "Zing Ultra ZU DIN65 LH L",
                },
                {
                    title: "Warranty",
                    value: "30 + 30* Months",
                },
                {
                    title: "Capacity",
                    value: "65 Ah @ C₂₀",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
                {
                    title: "Dimensions",
                    value: "197(L) X 129(W) X 225(H) mm",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Livguard Ultra ZU DIN65 LH L battery is engineered to suit all SUVs, mid-sized and large sedans. The internal structure is designed using latest technology that provides more power and reserve capacity to the battery making it reliable, consistent and truly maintenance-free.",
                images: [
                    {
                        image: "/livguard/products/automotive-batteries/zudin65lhl/a-plus/1.jpeg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "ULTRA ZU 38B20 L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20l",
                },
                {
                    title: "ULTRA  ZE 38B20  R",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20r/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20r",
                },
                {
                    title: "ULTRA ZU 38B20 BH L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20bhl/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20bhl",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/zudin65lhl/infographics/1.png",
                },
            ],
            title: "Zing Ultra ZU DIN65 LH L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "30 + 30* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "65 Ah @ C₂₀",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "197(L) X 129(W) X 225(H) mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "Zing Ultra ZU DIN65 LH L",
                },
                {
                    title: "Warranty",
                    value: "30 + 30* Months",
                },
                {
                    title: "Capacity",
                    value: "65 Ah @ C₂₀",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
                {
                    title: "Dimensions",
                    value: "197(L) X 129(W) X 225(H) mm",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Livguard Ultra ZU DIN65 LH L battery is engineered to suit all SUVs, mid-sized and large sedans. The internal structure is designed using latest technology that provides more power and reserve capacity to the battery making it reliable, consistent and truly maintenance-free.",
                images: [
                    {
                        image: "/livguard/products/automotive-batteries/zudin65lhl/a-plus/1.jpeg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "ULTRA ZU 38B20 L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20l",
                },
                {
                    title: "ULTRA  ZE 38B20  R",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20r/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20r",
                },
                {
                    title: "ULTRA ZU 38B20 BH L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20bhl/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20bhl",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
    },
    zp38b20l: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/zp38b20l/infographics/1.png",
                },
            ],
            title: "Zing Primo ZP 38B20 L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "18 + 18* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "35 Ah @ C₂₀",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "306(L) X 173(W) X 225(H) mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "Zing Primo ZP 38B20 L",
                },
                {
                    title: "Warranty",
                    value: "18 + 18* Months",
                },
                {
                    title: "Capacity",
                    value: "35 Ah @ C₂₀",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
                {
                    title: "Dimensions",
                    value: "306(L) X 173(W) X 225(H) mm",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Livguard Primo ZP 38B20 L battery is engineered to suit all SUVs, mid-sized and large sedans. The internal structure is designed using latest technology that provides more power and reserve capacity to the battery making it reliable, consistent and truly maintenance-free.",
                images: [
                    {
                        image: "/livguard/products/automotive-batteries/zp38b20l/a-plus/1.jpeg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "PRIMO ZP 38B20 L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zp38b20l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zp38b20l",
                },
                {
                    title: "PRIMO ZP 70D26 L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zp70d26l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zp70d26l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/zp38b20l/infographics/1.png",
                },
            ],
            title: "Zing Primo ZP 38B20 L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "18 + 18* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "35 Ah @ C₂₀",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "306(L) X 173(W) X 225(H) mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "Zing Primo ZP 38B20 L",
                },
                {
                    title: "Warranty",
                    value: "18 + 18* Months",
                },
                {
                    title: "Capacity",
                    value: "35 Ah @ C₂₀",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
                {
                    title: "Dimensions",
                    value: "306(L) X 173(W) X 225(H) mm",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Livguard Primo ZP 38B20 L battery is engineered to suit all SUVs, mid-sized and large sedans. The internal structure is designed using latest technology that provides more power and reserve capacity to the battery making it reliable, consistent and truly maintenance-free.",
                images: [
                    {
                        image: "/livguard/products/automotive-batteries/zp38b20l/a-plus/1.jpeg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "PRIMO ZP 38B20 L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zp38b20l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zp38b20l",
                },
                {
                    title: "PRIMO ZP 70D26 L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zp70d26l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zp70d26l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
    },
    zp70d26l: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/zp70d26l/infographics/1.png",
                },
            ],
            title: "Zing Primo ZP 70D26 L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "18 + 18* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "35 Ah @ C₂₀",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "306(L) X 173(W) X 225(H) mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "Zing Primo ZP 70D26 L",
                },
                {
                    title: "Warranty",
                    value: "18 + 18* Months",
                },
                {
                    title: "Capacity",
                    value: "35 Ah @ C₂₀",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
                {
                    title: "Dimensions",
                    value: "306(L) X 173(W) X 225(H) mm",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Livguard Primo ZP 70D26 L battery is engineered to suit all SUVs, mid-sized and large sedans. The internal structure is designed using latest technology that provides more power and reserve capacity to the battery making it reliable, consistent and truly maintenance-free.",
                images: [
                    {
                        image: "/livguard/products/automotive-batteries/zp70d26l/a-plus/1.jpeg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "PRIMO ZP 38B20 L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zp38b20l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zp38b20l",
                },
                {
                    title: "PRIMO ZP 70D26 L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zp70d26l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zp70d26l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/zp70d26l/infographics/1.png",
                },
            ],
            title: "Zing Primo ZP 70D26 L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "18 + 18* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "35 Ah @ C₂₀",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "306(L) X 173(W) X 225(H) mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "Zing Primo ZP 70D26 L",
                },
                {
                    title: "Warranty",
                    value: "18 + 18* Months",
                },
                {
                    title: "Capacity",
                    value: "35 Ah @ C₂₀",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
                {
                    title: "Dimensions",
                    value: "306(L) X 173(W) X 225(H) mm",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Livguard Primo ZP 70D26 L battery is engineered to suit all SUVs, mid-sized and large sedans. The internal structure is designed using latest technology that provides more power and reserve capacity to the battery making it reliable, consistent and truly maintenance-free.",
                images: [
                    {
                        image: "/livguard/products/automotive-batteries/zp70d26l/a-plus/1.jpeg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "PRIMO ZP 38B20 L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zp38b20l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zp38b20l",
                },
                {
                    title: "PRIMO ZP 70D26 L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zp70d26l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zp70d26l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
    },
    pc38b20l: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/pc38b20l/infographics/1.png",
                },
            ],
            title: "Pro CAB PC 38B20L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "12 + 3 Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "35 Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "306 X 173 X 225 mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "Pro CAB PC 38B20L",
                },
                {
                    title: "Warranty",
                    value: "12 + 3 Months",
                },
                {
                    title: "Capacity",
                    value: "35 Ah",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
                {
                    title: "Dimensions",
                    value: "306 X 173 X 225 mm",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Livguard PRO CAB ZP 38B20 L battery is engineered to suit all SUVs, mid-sized and large sedans. The internal structure is designed using latest technology that provides more power and reserve capacity to the battery making it reliable, consistent and truly maintenance-free.",
                images: [
                    {
                        image: "/livguard/products/automotive-batteries/pc38b20l/a-plus/1.jpeg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "ETERNA ZE 38B20 L",
                    imageRelativePath: "/livguard/products/automotive-batteries/ze38b20l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/ze38b20l",
                },
                {
                    title: "PRIMO ZP 38B20 L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zp38b20l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zp38b20l",
                },
                {
                    title: "ULTRA ZU 38B20 L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/pc38b20l/infographics/1.png",
                },
            ],
            title: "Pro CAB PC 38B20L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "12 + 3 Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "35 Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "306 X 173 X 225 mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "Pro CAB PC 38B20L",
                },
                {
                    title: "Warranty",
                    value: "12 + 3 Months",
                },
                {
                    title: "Capacity",
                    value: "35 Ah",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
                {
                    title: "Dimensions",
                    value: "306 X 173 X 225 mm",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Livguard PRO CAB ZP 38B20 L battery is engineered to suit all SUVs, mid-sized and large sedans. The internal structure is designed using latest technology that provides more power and reserve capacity to the battery making it reliable, consistent and truly maintenance-free.",
                images: [
                    {
                        image: "/livguard/products/automotive-batteries/pc38b20l/a-plus/1.jpeg",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "ETERNA ZE 38B20 L",
                    imageRelativePath: "/livguard/products/automotive-batteries/ze38b20l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/ze38b20l",
                },
                {
                    title: "PRIMO ZP 38B20 L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zp38b20l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zp38b20l",
                },
                {
                    title: "ULTRA ZU 38B20 L",
                    imageRelativePath: "/livguard/products/automotive-batteries/zu38b20l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/zu38b20l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
    },
    "lgbtx2.5l": {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                },
            ],
            title: "MoRide LGBTX 2.5L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "24 + 24* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "2.5 Ah @ C₁₀",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "80 X 70 X 105 mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "MoRide LGBTX 2.5L",
                },
                {
                    title: "Warranty",
                    value: "24 + 24* Months",
                },
                {
                    title: "Capacity",
                    value: "2.5 Ah @ C₁₀",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
                {
                    title: "Dimensions",
                    value: "80 X 70 X 105 mm",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [
                    {
                        image: "/livguard/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "MoRide LGBTX 2.5L",
                    imageRelativePath: "/livguard/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgbtx2.5l",
                },
                {
                    title: "MoRide LGBTX 7L",
                    imageRelativePath: "/livguard/products/automotive-batteries/lgbtx7l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgbtx7l",
                },
                {
                    title: "MoRide LGBTX 9L",
                    imageRelativePath: "/livguard/products/automotive-batteries/lgbtx9l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgbtx9l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [
                {
                    value: "Special Lid Design: With engineered valve to provide longer life and better cranking ability.",
                },
                {
                    value: "Innovative AGM Separator: With high purity glass fibers are best suited for Indian Tough Road condition.",
                },
                {
                    value: "Terminal Technology: Reduces corrosion on terminals & extends battery life.",
                },
                {
                    value: "Special Grid Design: Helps in smooth power transmission by reducing the resistance.",
                },
            ],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                },
            ],
            title: "MoRide LGBTX 2.5L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "24 + 24* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "2.5 Ah @ C₁₀",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "80 X 70 X 105 mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "MoRide LGBTX 2.5L",
                },
                {
                    title: "Warranty",
                    value: "24 + 24* Months",
                },
                {
                    title: "Capacity",
                    value: "2.5 Ah @ C₁₀",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
                {
                    title: "Dimensions",
                    value: "80 X 70 X 105 mm",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [
                    {
                        image: "/livguard/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "MoRide LGBTX 2.5L",
                    imageRelativePath: "/livguard/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgbtx2.5l",
                },
                {
                    title: "MoRide LGBTX 7L",
                    imageRelativePath: "/livguard/products/automotive-batteries/lgbtx7l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgbtx7l",
                },
                {
                    title: "MoRide LGBTX 9L",
                    imageRelativePath: "/livguard/products/automotive-batteries/lgbtx9l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgbtx9l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [
                {
                    value: "Special Lid Design: With engineered valve to provide longer life and better cranking ability.",
                },
                {
                    value: "Innovative AGM Separator: With high purity glass fibers are best suited for Indian Tough Road condition.",
                },
                {
                    value: "Terminal Technology: Reduces corrosion on terminals & extends battery life.",
                },
                {
                    value: "Special Grid Design: Helps in smooth power transmission by reducing the resistance.",
                },
            ],
        },
    },
    lgbtx7l: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/lgbtx7l/thumbnail.png",
                },
            ],
            title: "MoRide LGBTX 7L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "24 + 24* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "7 Ah @ C₁₀",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "R",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "146 X 60 X 130 mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "MoRide LGBTX 7L",
                },
                {
                    title: "Warranty",
                    value: "24 + 24* Months",
                },
                {
                    title: "Capacity",
                    value: "7 Ah @ C₁₀",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
                {
                    title: "Dimensions",
                    value: "146 X 60 X 130 mm",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [
                    {
                        image: "/livguard/products/automotive-batteries/lgbtx7l/thumbnail.png",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "MoRide LGBTX 2.5L",
                    imageRelativePath: "/livguard/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgbtx2.5l",
                },
                {
                    title: "MoRide LGBTX 7L",
                    imageRelativePath: "/livguard/products/automotive-batteries/lgbtx7l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgbtx7l",
                },
                {
                    title: "MoRide LGBTX 9L",
                    imageRelativePath: "/livguard/products/automotive-batteries/lgbtx9l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgbtx9l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [
                {
                    value: "Special Lid Design: With engineered valve to provide longer life and better cranking ability.",
                },
                {
                    value: "Innovative AGM Separator: With high purity glass fibers are best suited for Indian Tough Road condition.",
                },
                {
                    value: "Terminal Technology: Reduces corrosion on terminals & extends battery life.",
                },
                {
                    value: "Special Grid Design: Helps in smooth power transmission by reducing the resistance.",
                },
            ],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/lgbtx7l/thumbnail.png",
                },
            ],
            title: "MoRide LGBTX 7L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "24 + 24* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "7 Ah @ C₁₀",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "R",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "146 X 60 X 130 mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "MoRide LGBTX 7L",
                },
                {
                    title: "Warranty",
                    value: "24 + 24* Months",
                },
                {
                    title: "Capacity",
                    value: "7 Ah @ C₁₀",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
                {
                    title: "Dimensions",
                    value: "146 X 60 X 130 mm",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [
                    {
                        image: "/livguard/products/automotive-batteries/lgbtx7l/thumbnail.png",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "MoRide LGBTX 2.5L",
                    imageRelativePath: "/livguard/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgbtx2.5l",
                },
                {
                    title: "MoRide LGBTX 7L",
                    imageRelativePath: "/livguard/products/automotive-batteries/lgbtx7l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgbtx7l",
                },
                {
                    title: "MoRide LGBTX 9L",
                    imageRelativePath: "/livguard/products/automotive-batteries/lgbtx9l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgbtx9l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [
                {
                    value: "Special Lid Design: With engineered valve to provide longer life and better cranking ability.",
                },
                {
                    value: "Innovative AGM Separator: With high purity glass fibers are best suited for Indian Tough Road condition.",
                },
                {
                    value: "Terminal Technology: Reduces corrosion on terminals & extends battery life.",
                },
                {
                    value: "Special Grid Design: Helps in smooth power transmission by reducing the resistance.",
                },
            ],
        },
    },
    lgbtx9l: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/lgbtx9l/thumbnail.png",
                },
            ],
            title: "MoRide LGBTX 9L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "24 + 24* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "9 Ah @ C₁₀",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "R",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "135 X 75 X 139 mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "MoRide LGBTX 9L",
                },
                {
                    title: "Warranty",
                    value: "24 + 24* Months",
                },
                {
                    title: "Capacity",
                    value: "9 Ah @ C₁₀",
                },
                {
                    title: "Polarity",
                    value: "R",
                },
                {
                    title: "Dimensions",
                    value: "135 X 75 X 139 mm",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [
                    {
                        image: "/livguard/products/automotive-batteries/lgbtx9l/thumbnail.png",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "MoRide LGBTX 2.5L",
                    imageRelativePath: "/livguard/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgbtx2.5l",
                },
                {
                    title: "MoRide LGBTX 7L",
                    imageRelativePath: "/livguard/products/automotive-batteries/lgbtx7l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgbtx7l",
                },
                {
                    title: "MoRide LGBTX 9L",
                    imageRelativePath: "/livguard/products/automotive-batteries/lgbtx9l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgbtx9l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [
                {
                    value: "Special Lid Design: With engineered valve to provide longer life and better cranking ability.",
                },
                {
                    value: "Innovative AGM Separator: With high purity glass fibers are best suited for Indian Tough Road condition.",
                },
                {
                    value: "Terminal Technology: Reduces corrosion on terminals & extends battery life.",
                },
                {
                    value: "Special Grid Design: Helps in smooth power transmission by reducing the resistance.",
                },
            ],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/lgbtx9l/thumbnail.png",
                },
            ],
            title: "MoRide LGBTX 9L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "24 + 24* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "9 Ah @ C₁₀",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "R",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "135 X 75 X 139 mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "MoRide LGBTX 9L",
                },
                {
                    title: "Warranty",
                    value: "24 + 24* Months",
                },
                {
                    title: "Capacity",
                    value: "9 Ah @ C₁₀",
                },
                {
                    title: "Polarity",
                    value: "R",
                },
                {
                    title: "Dimensions",
                    value: "135 X 75 X 139 mm",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [
                    {
                        image: "/livguard/products/automotive-batteries/lgbtx9l/thumbnail.png",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "MoRide LGBTX 2.5L",
                    imageRelativePath: "/livguard/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgbtx2.5l",
                },
                {
                    title: "MoRide LGBTX 7L",
                    imageRelativePath: "/livguard/products/automotive-batteries/lgbtx7l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgbtx7l",
                },
                {
                    title: "MoRide LGBTX 9L",
                    imageRelativePath: "/livguard/products/automotive-batteries/lgbtx9l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgbtx9l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [
                {
                    value: "Special Lid Design: With engineered valve to provide longer life and better cranking ability.",
                },
                {
                    value: "Innovative AGM Separator: With high purity glass fibers are best suited for Indian Tough Road condition.",
                },
                {
                    value: "Terminal Technology: Reduces corrosion on terminals & extends battery life.",
                },
                {
                    value: "Special Grid Design: Helps in smooth power transmission by reducing the resistance.",
                },
            ],
        },
    },
    lgzhhtx5: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/lgzhhtx5/thumbnail.png",
                },
            ],
            title: "MoRide LGZ HH TX5",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "24 + 24* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "5 Ah @ C₁₀",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "122 X 60 X 129 mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "MoRide LGZ HH TX5",
                },
                {
                    title: "Warranty",
                    value: "24 + 24* Months",
                },
                {
                    title: "Capacity",
                    value: "5 Ah @ C₁₀",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
                {
                    title: "Dimensions",
                    value: "122 X 60 X 129 mm",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [
                    {
                        image: "/livguard/products/automotive-batteries/lgzhhtx5/thumbnail.png",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "MoRide LGBTX 2.5L",
                    imageRelativePath: "/livguard/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgbtx2.5l",
                },
                {
                    title: "MoRide LGBTX 7L",
                    imageRelativePath: "/livguard/products/automotive-batteries/lgbtx7l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgbtx7l",
                },
                {
                    title: "MoRide LGBTX 9L",
                    imageRelativePath: "/livguard/products/automotive-batteries/lgbtx9l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgbtx9l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [
                {
                    value: "Special Lid Design: With engineered valve to provide longer life and better cranking ability.",
                },
                {
                    value: "Innovative AGM Separator: With high purity glass fibers are best suited for Indian Tough Road condition.",
                },
                {
                    value: "Terminal Technology: Reduces corrosion on terminals & extends battery life.",
                },
                {
                    value: "Special Grid Design: Helps in smooth power transmission by reducing the resistance.",
                },
            ],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/lgzhhtx5/thumbnail.png",
                },
            ],
            title: "MoRide LGZ HH TX5",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "24 + 24* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "5 Ah @ C₁₀",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "122 X 60 X 129 mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "MoRide LGZ HH TX5",
                },
                {
                    title: "Warranty",
                    value: "24 + 24* Months",
                },
                {
                    title: "Capacity",
                    value: "5 Ah @ C₁₀",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
                {
                    title: "Dimensions",
                    value: "122 X 60 X 129 mm",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [
                    {
                        image: "/livguard/products/automotive-batteries/lgzhhtx5/thumbnail.png",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "MoRide LGBTX 2.5L",
                    imageRelativePath: "/livguard/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgbtx2.5l",
                },
                {
                    title: "MoRide LGBTX 7L",
                    imageRelativePath: "/livguard/products/automotive-batteries/lgbtx7l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgbtx7l",
                },
                {
                    title: "MoRide LGBTX 9L",
                    imageRelativePath: "/livguard/products/automotive-batteries/lgbtx9l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgbtx9l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [
                {
                    value: "Special Lid Design: With engineered valve to provide longer life and better cranking ability.",
                },
                {
                    value: "Innovative AGM Separator: With high purity glass fibers are best suited for Indian Tough Road condition.",
                },
                {
                    value: "Terminal Technology: Reduces corrosion on terminals & extends battery life.",
                },
                {
                    value: "Special Grid Design: Helps in smooth power transmission by reducing the resistance.",
                },
            ],
        },
    },
    lgzhhtz4: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/lgzhhtz4/thumbnail.png",
                },
            ],
            title: "MoRide LGZ HH TZ4",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "24 + 24* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "3 Ah @ C₁₀",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "113 X 70 X 85 mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "MoRide LGZ HH TZ4",
                },
                {
                    title: "Warranty",
                    value: "24 + 24* Months",
                },
                {
                    title: "Capacity",
                    value: "3 Ah @ C₁₀",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
                {
                    title: "Dimensions",
                    value: "113 X 70 X 85 mm",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [
                    {
                        image: "/livguard/products/automotive-batteries/lgzhhtz4/thumbnail.png",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "MoRide LGBTX 2.5L",
                    imageRelativePath: "/livguard/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgbtx2.5l",
                },
                {
                    title: "MoRide LGBTX 7L",
                    imageRelativePath: "/livguard/products/automotive-batteries/lgbtx7l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgbtx7l",
                },
                {
                    title: "MoRide LGBTX 9L",
                    imageRelativePath: "/livguard/products/automotive-batteries/lgbtx9l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgbtx9l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [
                {
                    value: "Special Lid Design: With engineered valve to provide longer life and better cranking ability.",
                },
                {
                    value: "Innovative AGM Separator: With high purity glass fibers are best suited for Indian Tough Road condition.",
                },
                {
                    value: "Terminal Technology: Reduces corrosion on terminals & extends battery life.",
                },
                {
                    value: "Special Grid Design: Helps in smooth power transmission by reducing the resistance.",
                },
            ],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/lgzhhtz4/thumbnail.png",
                },
            ],
            title: "MoRide LGZ HH TZ4",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "24 + 24* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "3 Ah @ C₁₀",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "113 X 70 X 85 mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "MoRide LGZ HH TZ4",
                },
                {
                    title: "Warranty",
                    value: "24 + 24* Months",
                },
                {
                    title: "Capacity",
                    value: "3 Ah @ C₁₀",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
                {
                    title: "Dimensions",
                    value: "113 X 70 X 85 mm",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [
                    {
                        image: "/livguard/products/automotive-batteries/lgzhhtz4/thumbnail.png",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "MoRide LGBTX 2.5L",
                    imageRelativePath: "/livguard/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgbtx2.5l",
                },
                {
                    title: "MoRide LGBTX 7L",
                    imageRelativePath: "/livguard/products/automotive-batteries/lgbtx7l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgbtx7l",
                },
                {
                    title: "MoRide LGBTX 9L",
                    imageRelativePath: "/livguard/products/automotive-batteries/lgbtx9l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgbtx9l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [
                {
                    value: "Special Lid Design: With engineered valve to provide longer life and better cranking ability.",
                },
                {
                    value: "Innovative AGM Separator: With high purity glass fibers are best suited for Indian Tough Road condition.",
                },
                {
                    value: "Terminal Technology: Reduces corrosion on terminals & extends battery life.",
                },
                {
                    value: "Special Grid Design: Helps in smooth power transmission by reducing the resistance.",
                },
            ],
        },
    },
    lgzhhtz5: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/lgzhhtz5/thumbnail.png",
                },
            ],
            title: "MoRide LGZ HH TZ5",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "24 + 24* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "3 Ah @ C₁₀",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "113 X 70 X 85 mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "MoRide LGZ HH TZ5",
                },
                {
                    title: "Warranty",
                    value: "24 + 24* Months",
                },
                {
                    title: "Capacity",
                    value: "3 Ah @ C₁₀",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
                {
                    title: "Dimensions",
                    value: "113 X 70 X 85 mm",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [
                    {
                        image: "/livguard/products/automotive-batteries/lgzhhtz5/thumbnail.png",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "MoRide LGBTX 2.5L",
                    imageRelativePath: "/livguard/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgbtx2.5l",
                },
                {
                    title: "MoRide LGBTX 7L",
                    imageRelativePath: "/livguard/products/automotive-batteries/lgbtx7l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgbtx7l",
                },
                {
                    title: "MoRide LGBTX 9L",
                    imageRelativePath: "/livguard/products/automotive-batteries/lgbtx9l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgbtx9l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [
                {
                    value: "Special Lid Design: With engineered valve to provide longer life and better cranking ability.",
                },
                {
                    value: "Innovative AGM Separator: With high purity glass fibers are best suited for Indian Tough Road condition.",
                },
                {
                    value: "Terminal Technology: Reduces corrosion on terminals & extends battery life.",
                },
                {
                    value: "Special Grid Design: Helps in smooth power transmission by reducing the resistance.",
                },
            ],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/lgzhhtz5/thumbnail.png",
                },
            ],
            title: "MoRide LGZ HH TZ5",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "24 + 24* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "3 Ah @ C₁₀",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "113 X 70 X 85 mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "MoRide LGZ HH TZ5",
                },
                {
                    title: "Warranty",
                    value: "24 + 24* Months",
                },
                {
                    title: "Capacity",
                    value: "3 Ah @ C₁₀",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
                {
                    title: "Dimensions",
                    value: "113 X 70 X 85 mm",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [
                    {
                        image: "/livguard/products/automotive-batteries/lgzhhtz5/thumbnail.png",
                    },
                ],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "MoRide LGBTX 2.5L",
                    imageRelativePath: "/livguard/products/automotive-batteries/lgbtx2.5l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgbtx2.5l",
                },
                {
                    title: "MoRide LGBTX 7L",
                    imageRelativePath: "/livguard/products/automotive-batteries/lgbtx7l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgbtx7l",
                },
                {
                    title: "MoRide LGBTX 9L",
                    imageRelativePath: "/livguard/products/automotive-batteries/lgbtx9l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgbtx9l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [
                {
                    value: "Special Lid Design: With engineered valve to provide longer life and better cranking ability.",
                },
                {
                    value: "Innovative AGM Separator: With high purity glass fibers are best suited for Indian Tough Road condition.",
                },
                {
                    value: "Terminal Technology: Reduces corrosion on terminals & extends battery life.",
                },
                {
                    value: "Special Grid Design: Helps in smooth power transmission by reducing the resistance.",
                },
            ],
        },
    },
    lgb0erfp1500: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LG B0 ERFP1500",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "6 Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "100Ah",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LG B0 ERFP1500",
                },
                {
                    title: "Warranty",
                    value: "6 Months",
                },
                {
                    title: "Capacity",
                    value: "100Ah",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LG C0 ERTU1800",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgc0ertu1800",
                },
                {
                    title: "LG D0 ERTU2300",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgd0ertu2300",
                },
                {
                    title: "LG D0 ERTU2500",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgd0ertu2500",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LG B0 ERFP1500",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "6 Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "100Ah",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LG B0 ERFP1500",
                },
                {
                    title: "Warranty",
                    value: "6 Months",
                },
                {
                    title: "Capacity",
                    value: "100Ah",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LG C0 ERTU1800",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgc0ertu1800",
                },
                {
                    title: "LG D0 ERTU2300",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgc0ertu2300",
                },
                {
                    title: "LG D0 ERTU2500",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgc0ertu2500",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
    },
    lgc0ertu1800: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LG C0 ERTU1800",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "9 Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "110Ah",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LG C0 ERTU1800",
                },
                {
                    title: "Warranty",
                    value: "9 Months",
                },
                {
                    title: "Capacity",
                    value: "110Ah",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LG B0 ERFP1500",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgb0erfp1500",
                },
                {
                    title: "LG D0 ERTU2300",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgd0ertu2300",
                },
                {
                    title: "LG D0 ERTU2500",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgd0ertu2500",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LG C0 ERTU1800",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "9 Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "110Ah",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LG C0 ERTU1800",
                },
                {
                    title: "Warranty",
                    value: "9 Months",
                },
                {
                    title: "Capacity",
                    value: "110Ah",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LG B0 ERFP1500",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgc0ertu1500",
                },
                {
                    title: "LG D0 ERTU2300",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgc0ertu2300",
                },
                {
                    title: "LG D0 ERTU2500",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgc0ertu2500",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
    },
    lgd0ertu2300: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LG D0 ERTU2300",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "12 Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "130Ah",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LG D0 ERTU2300",
                },
                {
                    title: "Warranty",
                    value: "12 Months",
                },
                {
                    title: "Capacity",
                    value: "130Ah",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LG B0 ERFP1500",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgb0erfp1500",
                },
                {
                    title: "LG C0 ERTU1800",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgd0ertu1800",
                },
                {
                    title: "LG D0 ERTU2500",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgd0ertu2500",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LG D0 ERTU2300",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "12 Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "130Ah",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LG D0 ERTU2300",
                },
                {
                    title: "Warranty",
                    value: "12 Months",
                },
                {
                    title: "Capacity",
                    value: "130Ah",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LG B0 ERFP1500",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgb0erfp1500",
                },
                {
                    title: "LG C0 ERTU1800",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgd0ertu1800",
                },
                {
                    title: "LG D0 ERTU2500",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgd0ertu2500",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
    },
    lgd0ertu2500: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LG D0 ERTU2500",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "15 Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "140Ah",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LG D0 ERTU2500",
                },
                {
                    title: "Warranty",
                    value: "15 Months",
                },
                {
                    title: "Capacity",
                    value: "140Ah",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LG B0 ERFP1500",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgb0erfp1500",
                },
                {
                    title: "LG C0 ERTU1800",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgc0ertu1800",
                },
                {
                    title: "LG D0 ERTU2300",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgd0ertu2300",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LG D0 ERTU2500",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "15 Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "140Ah",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LG D0 ERTU2500",
                },
                {
                    title: "Warranty",
                    value: "15 Months",
                },
                {
                    title: "Capacity",
                    value: "140Ah",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LG B0 ERFP1500",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgb0erfp1500",
                },
                {
                    title: "LG C0 ERTU1800",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgc0ertu1800",
                },
                {
                    title: "LG D0 ERTU2300",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgd0ertu2300",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
    },
    lglff80r: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LGL FF 80 R",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "36 + 18* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "80Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "R",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGL FF 80 R",
                },
                {
                    title: "Warranty",
                    value: "36 + 18* Months",
                },
                {
                    title: "Capacity",
                    value: "80Ah",
                },
                {
                    title: "Polarity",
                    value: "R",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGL FF 80 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff80l",
                },
                {
                    title: "LGL FF 100H29R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff100h29r",
                },
                {
                    title: "LGL FF 100 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff100l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LGL FF 80 R",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "36 + 18* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "80Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "R",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGL FF 80 R",
                },
                {
                    title: "Warranty",
                    value: "36 + 18* Months",
                },
                {
                    title: "Capacity",
                    value: "80Ah",
                },
                {
                    title: "Polarity",
                    value: "R",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGL FF 80 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff80l",
                },
                {
                    title: "LGL FF 100H29R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff100h29r",
                },
                {
                    title: "LGL FF 100 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff100l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
    },
    lglff80l: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LGL FF 80 L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "36 + 18* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "80Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGL FF 80 L",
                },
                {
                    title: "Warranty",
                    value: "36 + 18* Months",
                },
                {
                    title: "Capacity",
                    value: "80Ah",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGL FF 80 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff80r",
                },
                {
                    title: "LGL FF 100H29R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff100h29r",
                },
                {
                    title: "LGL FF 100 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff100l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LGL FF 80 L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "36 + 18* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "80Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGL FF 80 L",
                },
                {
                    title: "Warranty",
                    value: "36 + 18* Months",
                },
                {
                    title: "Capacity",
                    value: "80Ah",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGL FF 80 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff80r",
                },
                {
                    title: "LGL FF 100H29R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff100h29r",
                },
                {
                    title: "LGL FF 100 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff100l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
    },
    lglff100h29r: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LGL FF 100H29 R",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "36 + 18* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "100Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "R",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGL FF 100H29 R",
                },
                {
                    title: "Warranty",
                    value: "36 + 18* Months",
                },
                {
                    title: "Capacity",
                    value: "100Ah",
                },
                {
                    title: "Polarity",
                    value: "R",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGL FF 80 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff80r",
                },
                {
                    title: "LGL FF 80 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff80l",
                },
                {
                    title: "LGL FF 100 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff100l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LGL FF 100H29 R",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "36 + 18* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "100Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "R",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGL FF 100H29 R",
                },
                {
                    title: "Warranty",
                    value: "36 + 18* Months",
                },
                {
                    title: "Capacity",
                    value: "100Ah",
                },
                {
                    title: "Polarity",
                    value: "R",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGL FF 80 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff80r",
                },
                {
                    title: "LGL FF 80 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff80l",
                },
                {
                    title: "LGL FF 100 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff100l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
    },
    lglff100l: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LGL FF 100 L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "36 + 18* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "100Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGL FF 100 L",
                },
                {
                    title: "Warranty",
                    value: "36 + 18* Months",
                },
                {
                    title: "Capacity",
                    value: "100Ah",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGL FF 80 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff80r",
                },
                {
                    title: "LGL FF 80 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff80l",
                },
                {
                    title: "LGL FF 100 H29 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff100h29r",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LGL FF 100 L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "36 + 18* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "100Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGL FF 100 L",
                },
                {
                    title: "Warranty",
                    value: "36 + 18* Months",
                },
                {
                    title: "Capacity",
                    value: "100Ah",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGL FF 80 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff80r",
                },
                {
                    title: "LGL FF 80 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff80l",
                },
                {
                    title: "LGL FF 100 H29 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff100h29r",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
    },
    lglnff130r: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LGLN FF 130 R",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "36 + 18* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "130Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "R",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGLN FF 130 R",
                },
                {
                    title: "Warranty",
                    value: "36 + 18* Months",
                },
                {
                    title: "Capacity",
                    value: "130Ah",
                },
                {
                    title: "Polarity",
                    value: "R",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGL FF 80 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff80r",
                },
                {
                    title: "LGL FF 80 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff80l",
                },
                {
                    title: "LGL FF 100 H29 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff100h29r",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LGLN FF 130 R",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "36 + 18* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "130Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "R",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGLN FF 130 R",
                },
                {
                    title: "Warranty",
                    value: "36 + 18* Months",
                },
                {
                    title: "Capacity",
                    value: "130Ah",
                },
                {
                    title: "Polarity",
                    value: "R",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGL FF 80 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff80r",
                },
                {
                    title: "LGL FF 80 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff80l",
                },
                {
                    title: "LGL FF 100 H29 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff100h29r",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
    },
    lglff180r: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LGL FF 180 R",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "36 + 18* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "180Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "R",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGL FF 180 R",
                },
                {
                    title: "Warranty",
                    value: "36 + 18* Months",
                },
                {
                    title: "Capacity",
                    value: "180Ah",
                },
                {
                    title: "Polarity",
                    value: "R",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGL FF 80 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff80r",
                },
                {
                    title: "LGL FF 80 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff80l",
                },
                {
                    title: "LGL FF 100 H29 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff100h29r",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LGL FF 180 R",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "36 + 18* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "180Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "R",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGL FF 180 R",
                },
                {
                    title: "Warranty",
                    value: "36 + 18* Months",
                },
                {
                    title: "Capacity",
                    value: "180Ah",
                },
                {
                    title: "Polarity",
                    value: "R",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGL FF 80 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff80r",
                },
                {
                    title: "LGL FF 80 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff80l",
                },
                {
                    title: "LGL FF 100 H29 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff100h29r",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
    },
    lglnhd150r: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LGLN HD 150 R",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "36 + 12* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "150Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "R",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGLN HD 150 R",
                },
                {
                    title: "Warranty",
                    value: "36 + 12* Months",
                },
                {
                    title: "Capacity",
                    value: "150Ah",
                },
                {
                    title: "Polarity",
                    value: "R",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGL FF 80 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff80r",
                },
                {
                    title: "LGL FF 80 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff80l",
                },
                {
                    title: "LGL FF 100 H29 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff100h29r",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LGLN HD 150 R",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "36 + 12* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "150Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "R",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGLN HD 150 R",
                },
                {
                    title: "Warranty",
                    value: "36 + 12* Months",
                },
                {
                    title: "Capacity",
                    value: "150Ah",
                },
                {
                    title: "Polarity",
                    value: "R",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGL FF 80 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff80r",
                },
                {
                    title: "LGL FF 80 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff80l",
                },
                {
                    title: "LGL FF 100 H29 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lglff100h29r",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
    },
    lghx8048r: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LGHX 8048 R",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "48 + 24* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "80Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "R",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGHX 8048 R",
                },
                {
                    title: "Warranty",
                    value: "48 + 24* Months",
                },
                {
                    title: "Capacity",
                    value: "80Ah",
                },
                {
                    title: "Polarity",
                    value: "R",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGHX 8048 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lghx8048l",
                },
                {
                    title: "LGHX 10048 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lghx10048l",
                },
                {
                    title: "LGHX 10048H29 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lghx10048h29r",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LGHX 8048 R",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "48 + 24* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "80Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "R",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGHX 8048 R",
                },
                {
                    title: "Warranty",
                    value: "48 + 24* Months",
                },
                {
                    title: "Capacity",
                    value: "80Ah",
                },
                {
                    title: "Polarity",
                    value: "R",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGHX 8048 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lghx8048l",
                },
                {
                    title: "LGHX 10048 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lghx10048l",
                },
                {
                    title: "LGHX 10048H29 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lghx10048h29r",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
    },
    lghx8048l: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LGHX 8048 L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "48 + 24* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "80Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGHX 8048 L",
                },
                {
                    title: "Warranty",
                    value: "48 + 24* Months",
                },
                {
                    title: "Capacity",
                    value: "80Ah",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGHX 8048 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lghx8048r",
                },
                {
                    title: "LGHX 10048 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lghx10048l",
                },
                {
                    title: "LGHX 10048H29 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lghx10048h29r",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LGHX 8048 L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "48 + 24* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "80Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGHX 8048 L",
                },
                {
                    title: "Warranty",
                    value: "48 + 24* Months",
                },
                {
                    title: "Capacity",
                    value: "80Ah",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGHX 8048 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lghx8048r",
                },
                {
                    title: "LGHX 10048 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lghx10048l",
                },
                {
                    title: "LGHX 10048H29 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lghx10048h29r",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
    },
    lghx10048l: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LGHX 10048 L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "48 + 24* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "100Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGHX 8048 L",
                },
                {
                    title: "Warranty",
                    value: "48 + 24* Months",
                },
                {
                    title: "Capacity",
                    value: "100Ah",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGHX 8048 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lghx8048r",
                },
                {
                    title: "LGHX 8048 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lghx8048l",
                },
                {
                    title: "LGHX 10048H29 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lghx10048h29r",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LGHX 10048 L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "48 + 24* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "100Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGHX 8048 L",
                },
                {
                    title: "Warranty",
                    value: "48 + 24* Months",
                },
                {
                    title: "Capacity",
                    value: "100Ah",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGHX 8048 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lghx8048r",
                },
                {
                    title: "LGHX 8048 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lghx8048l",
                },
                {
                    title: "LGHX 10048H29 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lghx10048h29r",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
    },
    lghx10048h29r: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LGHX 10048H29 R",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "48 + 24* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "100Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "R",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGHX 10048H29 R",
                },
                {
                    title: "Warranty",
                    value: "48 + 24* Months",
                },
                {
                    title: "Capacity",
                    value: "100Ah",
                },
                {
                    title: "Polarity",
                    value: "R",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGHX 8048 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lghx8048r",
                },
                {
                    title: "LGHX 8048 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lghx8048l",
                },
                {
                    title: "LGHX 10048H29 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lghx10048h29l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LGHX 10048H29 R",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "48 + 24* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "100Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "R",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGHX 10048H29 R",
                },
                {
                    title: "Warranty",
                    value: "48 + 24* Months",
                },
                {
                    title: "Capacity",
                    value: "100Ah",
                },
                {
                    title: "Polarity",
                    value: "R",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGHX 8048 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lghx8048r",
                },
                {
                    title: "LGHX 8048 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lghx8048l",
                },
                {
                    title: "LGHX 10048H29 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lghx10048h29l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
    },
    lgptr800r: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LGP TR800 R",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "36 + 18* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "80Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "R",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGP TR800 R",
                },
                {
                    title: "Warranty",
                    value: "36 + 18* Months",
                },
                {
                    title: "Capacity",
                    value: "80Ah",
                },
                {
                    title: "Polarity",
                    value: "R",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGP TR900 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgptr900l",
                },
                {
                    title: "LGP TR1000 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgptr1000l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LGP TR800 R",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "36 + 18* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "80Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "R",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGP TR800 R",
                },
                {
                    title: "Warranty",
                    value: "36 + 18* Months",
                },
                {
                    title: "Capacity",
                    value: "80Ah",
                },
                {
                    title: "Polarity",
                    value: "R",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGP TR900 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgptr900l",
                },
                {
                    title: "LGP TR1000 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgptr1000l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
    },
    lgptr900l: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LGP TR900 L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "36 + 18* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "90Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGP TR900 L",
                },
                {
                    title: "Warranty",
                    value: "36 + 18* Months",
                },
                {
                    title: "Capacity",
                    value: "90Ah",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGP TR800 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgptr800r",
                },
                {
                    title: "LGP TR1000 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgptr1000l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LGP TR900 L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "36 + 18* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "90Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGP TR900 L",
                },
                {
                    title: "Warranty",
                    value: "36 + 18* Months",
                },
                {
                    title: "Capacity",
                    value: "90Ah",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGP TR800 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgptr800r",
                },
                {
                    title: "LGP TR1000 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgptr1000l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
    },
    lgptr1000l: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LGP TR1000 L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "36 + 18* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "100Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGP TR1000 L",
                },
                {
                    title: "Warranty",
                    value: "36 + 18* Months",
                },
                {
                    title: "Capacity",
                    value: "100Ah",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGP TR800 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgptr800r",
                },
                {
                    title: "LGP TR900 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgptr900l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LGP TR1000 L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "36 + 18* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "100Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGP TR1000 L",
                },
                {
                    title: "Warranty",
                    value: "36 + 18* Months",
                },
                {
                    title: "Capacity",
                    value: "100Ah",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGP TR800 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgptr800r",
                },
                {
                    title: "LGP TR900 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgptr900l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
    },
    lgpxtr8048r: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LGPX TR8048 R",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "48 + 24* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "80Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "R",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGPX TR8048 R",
                },
                {
                    title: "Warranty",
                    value: "48 + 24* Months",
                },
                {
                    title: "Capacity",
                    value: "80Ah",
                },
                {
                    title: "Polarity",
                    value: "R",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGPX TR9048 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgpxtr9048l",
                },
                {
                    title: "LGPX TR10048 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgpxtr10048r",
                },
                {
                    title: "LGPX TR9048H29 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgpxtr9048h29l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LGPX TR8048 R",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "48 + 24* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "80Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "R",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGPX TR8048 R",
                },
                {
                    title: "Warranty",
                    value: "48 + 24* Months",
                },
                {
                    title: "Capacity",
                    value: "80Ah",
                },
                {
                    title: "Polarity",
                    value: "R",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGPX TR9048 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgpxtr9048l",
                },
                {
                    title: "LGPX TR10048 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgpxtr10048r",
                },
                {
                    title: "LGPX TR9048H29 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgpxtr9048h29l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
    },
    lgpxtr9048l: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LGPX TR9048 L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "48 + 24* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "90Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGPX TR9048 L",
                },
                {
                    title: "Warranty",
                    value: "48 + 24* Months",
                },
                {
                    title: "Capacity",
                    value: "90Ah",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGPX TR8048 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgpxtr8048r",
                },
                {
                    title: "LGPX TR10048 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgpxtr10048r",
                },
                {
                    title: "LGPX TR9048H29 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgpxtr9048h29l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LGPX TR9048 L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "48 + 24* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "90Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGPX TR9048 L",
                },
                {
                    title: "Warranty",
                    value: "48 + 24* Months",
                },
                {
                    title: "Capacity",
                    value: "90Ah",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGPX TR8048 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgpxtr8048r",
                },
                {
                    title: "LGPX TR10048 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgpxtr10048r",
                },
                {
                    title: "LGPX TR9048H29 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgpxtr9048h29l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
    },
    lgpxtr10048l: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LGPX TR10048 L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "48 + 24* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "100Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGPX TR10048 L",
                },
                {
                    title: "Warranty",
                    value: "48 + 24* Months",
                },
                {
                    title: "Capacity",
                    value: "100Ah",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGPX TR8048 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgpxtr8048r",
                },
                {
                    title: "LGPX TR9048 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgpxtr9048l",
                },
                {
                    title: "LGPX TR9048H29 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgpxtr9048h29l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LGPX TR10048 L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "48 + 24* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "100Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGPX TR10048 L",
                },
                {
                    title: "Warranty",
                    value: "48 + 24* Months",
                },
                {
                    title: "Capacity",
                    value: "100Ah",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGPX TR8048 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgpxtr8048r",
                },
                {
                    title: "LGPX TR9048 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgpxtr9048l",
                },
                {
                    title: "LGPX TR9048H29 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgpxtr9048h29l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
    },
    lgpxtr9048h29l: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LGPX TR9048 H29 L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "48 + 24* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "90Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGPX TR9048 H29 L",
                },
                {
                    title: "Warranty",
                    value: "48 + 24* Months",
                },
                {
                    title: "Capacity",
                    value: "90Ah",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGPX TR8048 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgpxtr8048r",
                },
                {
                    title: "LGPX TR9048 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgpxtr9048l",
                },
                {
                    title: "LGPX TR10048 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgpxtr10048l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LGPX TR9048 H29 L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "48 + 24* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "90Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGPX TR9048 H29 L",
                },
                {
                    title: "Warranty",
                    value: "48 + 24* Months",
                },
                {
                    title: "Capacity",
                    value: "90Ah",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGPX TR8048 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgpxtr8048r",
                },
                {
                    title: "LGPX TR9048 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgpxtr9048l",
                },
                {
                    title: "LGPX TR10048 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgpxtr10048l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
    },
    lgmf0ar32r: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LGM F0 AR32 R",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "18 Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "32Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "R",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGM F0 AR32 R",
                },
                {
                    title: "Warranty",
                    value: "18 Months",
                },
                {
                    title: "Capacity",
                    value: "32Ah",
                },
                {
                    title: "Polarity",
                    value: "R",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGM F0 AR60 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgmf0ar60l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LGM F0 AR32 R",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "18 Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "32Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "R",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGM F0 AR32 R",
                },
                {
                    title: "Warranty",
                    value: "18 Months",
                },
                {
                    title: "Capacity",
                    value: "32Ah",
                },
                {
                    title: "Polarity",
                    value: "R",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGM F0 AR60 L",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgmf0ar60l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
    },
    lgmf0ar60l: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LGM F0 AR60 L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "18 Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "60 Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGM F0 AR60 L",
                },
                {
                    title: "Warranty",
                    value: "18 Months",
                },
                {
                    title: "Capacity",
                    value: "60 Ah",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGM F0 AR32 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgmf0ar32r",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "LGM F0 AR60 L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "18 Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "60 Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGM F0 AR60 L",
                },
                {
                    title: "Warranty",
                    value: "18 Months",
                },
                {
                    title: "Capacity",
                    value: "60 Ah",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "LGM F0 AR32 R",
                    imageRelativePath: "",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/lgmf0ar32r",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
    },
    lglpp38b20l: {
        [Language.English]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/lglpp38b20l/thumbnail.png",
                },
            ],
            title: "LGL PP 38B20 L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "18 + 6* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "35 Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "197 (L) * 129 (W) * 225 (H) mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGM F0 AR60 L",
                },
                {
                    title: "Warranty",
                    value: "18 + 6* Months",
                },
                {
                    title: "Capacity",
                    value: "35 Ah",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
                {
                    title: "Dimensions",
                    value: "197 (L) * 129 (W) * 225 (H) mm",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "PC 38B20 L",
                    imageRelativePath: "/livguard/products/automotive-batteries/pc38b20l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/pc38b20l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "/livguard/products/automotive-batteries/lglpp38b20l/thumbnail.png",
                },
            ],
            title: "LGL PP 38B20 L",
            subTitle: "",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
            productIcons: [
                {
                    icon: "/livguard/icons/waranty.png",
                    text: "18 + 6* Months",
                },
                {
                    icon: "/livguard/icons/capacity.png",
                    text: "35 Ah",
                },
                {
                    icon: "/livguard/icons/polarity.svg",
                    text: "L",
                },
                {
                    icon: "/livguard/icons/dimensions.png",
                    text: "197 (L) * 129 (W) * 225 (H) mm",
                },
            ],
            specifications: [
                {
                    title: "Model Number",
                    value: "LGM F0 AR60 L",
                },
                {
                    title: "Warranty",
                    value: "18 + 6* Months",
                },
                {
                    title: "Capacity",
                    value: "35 Ah",
                },
                {
                    title: "Polarity",
                    value: "L",
                },
                {
                    title: "Dimensions",
                    value: "197 (L) * 129 (W) * 225 (H) mm",
                },
            ],
            additionalInfo: [],
            productDescription: {
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Sagittis id consectetur purus ut faucibus.",
                images: [],
            },
            reviews: {
                rating: 4.6,
                numberOfReviews: 120,
            },
            recommendedProducts: [
                {
                    title: "PC 38B20 L",
                    imageRelativePath: "/livguard/products/automotive-batteries/pc38b20l/thumbnail.png",
                    buttonText: "categoryViewProductButtontext",
                    bestseller: false,
                    link: "/product/pc38b20l",
                },
            ],
            type: ProductType.automotiveBattery,
            metadata: {
                title: "",
                description: "",
                canonicalUrl: "",
                schema: `

                `,
            },
            features: [],
        },
    },
};
