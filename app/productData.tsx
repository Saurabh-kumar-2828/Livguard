import {Language} from "~/typeDefinitions";

export type ProductInfo = {
    images: Array<{image: string}>;
    title: string;
    description: string;
    productIcons: Array<{icon: string; text: string}>;
    specifications: Array<{title: string; value: string}>;
    features: Array<{value: string}>;
    additionalInfo: Array<{title: string; value: string}>;
    productDescription: {description: string; images: Array<{image: string}>};
    reviews: {rating: number; numberOfReviews: number};
};

export const allProductDetails: {[key: string]: {[key: string]: ProductInfo; [key: string]: ProductInfo}} = {
    LG750i: {
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
            title: "Inverter for Small Offices, Homes, and Small Shops with Best-in-Class Warranty and Smart AI Charging.",
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
                    icon: "/livguard/icons/squareWave.png",
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
                rating: 5,
                numberOfReviews: 120,
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
            title: "छोटे कार्यालयों, घरों और छोटी दुकानों के लिए इन्वर्टर, सर्वश्रेष्ठ श्रेणी की वारंटी और स्मार्ट एआई चार्जिंग के साथ",
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
                    icon: "/livguard/icons/squareWave.png",
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
                rating: 5,
                numberOfReviews: 120,
            },
        },
    },
    LG950i: {
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
            title: "Inverter for Small Offices, Homes, and Small Shops with Best-in-Class Warranty and Smart AI Charging.",
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
                    icon: "/livguard/icons/squareWave.png",
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
                rating: 5,
                numberOfReviews: 120,
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
            title: "छोटे कार्यालयों, घरों और छोटी दुकानों के लिए इन्वर्टर, सर्वश्रेष्ठ श्रेणी की वारंटी और स्मार्ट एआई चार्जिंग के साथ",
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
                    icon: "/livguard/icons/squareWave.png",
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
                rating: 5,
                numberOfReviews: 120,
            },
        },
    },
    LG1100: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "Inverter for Small Offices, Homes, and Small Shops with Best-in-Class Warranty and Smart AI Charging.",
            description: "Bring home the power of unlimited energy with our Inverter. Equipped with the best-in-class warranty and Smart AI Charging to offer a smooth flow of energy to you.",
            productIcons: [
                {
                    icon: "",
                    text: "3 Year Warranty",
                },
                {
                    icon: "",
                    text: "900 VA",
                },
                {
                    icon: "",
                    text: "Square Wave Inverter ",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "छोटे कार्यालयों, घरों और छोटी दुकानों के लिए इन्वर्टर, सर्वश्रेष्ठ श्रेणी की वारंटी और स्मार्ट एआई चार्जिंग के साथ",
            description:
                "हमारे इन्वर्टर के साथ असीमित ऊर्जा की शक्ति घर लाएं। आपको ऊर्जा का सहज प्रवाह प्रदान करने के लिए उद्योग की सावराश्रेष्ठ वारंटी आवर स्मार्ट ए आई चार्जिंग के साथ बने इन्वर्टर।",
            productIcons: [
                {
                    icon: "",
                    text: "3 वर्ष वारंटी",
                },
                {
                    icon: "",
                    text: "900VA",
                },
                {
                    icon: "",
                    text: "स्क्वायर वेव इनवर्टर",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
    },
    LG1450i: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "Inverter for Small Offices, Homes, and Small Shops with Best-in-Class Warranty and Smart AI Charging.",
            description: "Bring home the power of unlimited energy with our Inverter. Equipped with the best-in-class warranty and Smart AI Charging to offer a smooth flow of energy to you.",
            productIcons: [
                {
                    icon: "",
                    text: "3 Year Warranty",
                },
                {
                    icon: "",
                    text: "1100 VA",
                },
                {
                    icon: "",
                    text: "Square Wave Inverter ",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "छोटे कार्यालयों, घरों और छोटी दुकानों के लिए इन्वर्टर, सर्वश्रेष्ठ श्रेणी की वारंटी और स्मार्ट एआई चार्जिंग के साथ",
            description:
                "हमारे इन्वर्टर के साथ असीमित ऊर्जा की शक्ति घर लाएं। आपको ऊर्जा का सहज प्रवाह प्रदान करने के लिए उद्योग की सावराश्रेष्ठ वारंटी आवर स्मार्ट ए आई चार्जिंग के साथ बने इन्वर्टर।",
            productIcons: [
                {
                    icon: "",
                    text: "3 वर्ष वारंटी",
                },
                {
                    icon: "",
                    text: "1100VA",
                },
                {
                    icon: "",
                    text: "स्क्वायर वेव इनवर्टर",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
    },
    LG1950i: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "Inverter for Small Offices, Homes, and Small Shops with Best-in-Class Warranty and Smart AI Charging.",
            description: "Bring home the power of unlimited energy with our Inverter. Equipped with the best-in-class warranty and Smart AI Charging to offer a smooth flow of energy to you.",
            productIcons: [
                {
                    icon: "",
                    text: "3 Year Warranty",
                },
                {
                    icon: "",
                    text: "1650 VA",
                },
                {
                    icon: "",
                    text: "Square Wave Inverter ",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "छोटे कार्यालयों, घरों और छोटी दुकानों के लिए इन्वर्टर, सर्वश्रेष्ठ श्रेणी की वारंटी और स्मार्ट एआई चार्जिंग के साथ",
            description:
                "हमारे इन्वर्टर के साथ असीमित ऊर्जा की शक्ति घर लाएं। आपको ऊर्जा का सहज प्रवाह प्रदान करने के लिए उद्योग की सावराश्रेष्ठ वारंटी आवर स्मार्ट ए आई चार्जिंग के साथ बने इन्वर्टर।",
            productIcons: [
                {
                    icon: "",
                    text: "3 वर्ष वारंटी",
                },
                {
                    icon: "",
                    text: "1250VA",
                },
                {
                    icon: "",
                    text: "स्क्वायर वेव इनवर्टर",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
    },
    LGS900i: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "Inverter for Small Offices, Homes, and Small Shops with Best-in-Class Warranty and Smart AI Charging.",
            description: "With an assured warranty and Pure Sine Wave output, experience energy unlimited at your home with this Livguard Inverter",
            productIcons: [
                {
                    icon: "",
                    text: "3 Year Warranty",
                },
                {
                    icon: "",
                    text: "700 VA",
                },
                {
                    icon: "",
                    text: "Pure Sine Wave Inverter ",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "छोटे कार्यालयों, घरों और छोटी दुकानों के लिए इन्वर्टर, सर्वश्रेष्ठ श्रेणी की वारंटी और स्मार्ट एआई चार्जिंग के साथ",
            description: "सुनिश्चित वारंटी और प्योर साइन वेव आउटपुट के साथ, हमारे लिवगार्ड इन्वर्टर के साथ अपने घर पर असीमित ऊर्जा का अनुभव करें।",
            productIcons: [
                {
                    icon: "",
                    text: "3 वर्ष वारंटी",
                },
                {
                    icon: "",
                    text: "700VA",
                },
                {
                    icon: "",
                    text: "प्योर साइन वेव इनवर्टर",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
    },
    LGS1000i: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "Inverter for Small Offices, Homes, and Small Shops with Best-in-Class Warranty and Smart AI Charging.",
            description: "With an assured warranty and Pure Sine Wave output, experience energy unlimited at your home with this Livguard Inverter",
            productIcons: [
                {
                    icon: "",
                    text: "3 Year Warranty",
                },
                {
                    icon: "",
                    text: "800 VA",
                },
                {
                    icon: "",
                    text: "Pure Sine Wave Inverter ",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "छोटे कार्यालयों, घरों और छोटी दुकानों के लिए इन्वर्टर, सर्वश्रेष्ठ श्रेणी की वारंटी और स्मार्ट एआई चार्जिंग के साथ",
            description: "सुनिश्चित वारंटी और प्योर साइन वेव आउटपुट के साथ, हमारे लिवगार्ड इन्वर्टर के साथ अपने घर पर असीमित ऊर्जा का अनुभव करें",
            productIcons: [
                {
                    icon: "",
                    text: "3 वर्ष वारंटी",
                },
                {
                    icon: "",
                    text: "800VA",
                },
                {
                    icon: "",
                    text: "प्योर साइन वेव इनवर्टर",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
    },
    LGS1100i: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "Inverter for Small Offices, Homes, and Small Shops with Best-in-Class Warranty and Smart AI Charging.",
            description: "With an assured warranty and Pure Sine Wave output, experience energy unlimited at your home with this Livguard Inverter",
            productIcons: [
                {
                    icon: "",
                    text: "3 Year Warranty",
                },
                {
                    icon: "",
                    text: "900 VA",
                },
                {
                    icon: "",
                    text: "Pure Sine Wave Inverter ",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "छोटे कार्यालयों, घरों और छोटी दुकानों के लिए इन्वर्टर, सर्वश्रेष्ठ श्रेणी की वारंटी और स्मार्ट एआई चार्जिंग के साथ",
            description: "सुनिश्चित वारंटी और प्योर साइन वेव आउटपुट के साथ, हमारे लिवगार्ड इन्वर्टर के साथ अपने घर पर असीमित ऊर्जा का अनुभव करें",
            productIcons: [
                {
                    icon: "",
                    text: "3 वर्ष वारंटी",
                },
                {
                    icon: "",
                    text: "900VA",
                },
                {
                    icon: "",
                    text: "प्योर साइन वेव इनवर्टर",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
    },
    LGS1700: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "Inverter for Small Offices, Homes, and Small Shops with Best-in-Class Warranty and Smart AI Charging.",
            description: "With an assured warranty and Pure Sine Wave output, experience energy unlimited at your home with this Livguard Inverter",
            productIcons: [
                {
                    icon: "",
                    text: "3 Year Warranty",
                },
                {
                    icon: "",
                    text: "1500 VA",
                },
                {
                    icon: "",
                    text: "Pure Sine Wave Inverter ",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "छोटे कार्यालयों, घरों और छोटी दुकानों के लिए इन्वर्टर, सर्वश्रेष्ठ श्रेणी की वारंटी और स्मार्ट एआई चार्जिंग के साथ",
            description: "सुनिश्चित वारंटी और प्योर साइन वेव आउटपुट के साथ, हमारे लिवगार्ड इन्वर्टर के साथ अपने घर पर असीमित ऊर्जा का अनुभव करें",
            productIcons: [
                {
                    icon: "",
                    text: "3 वर्ष वारंटी",
                },
                {
                    icon: "",
                    text: "1500VA",
                },
                {
                    icon: "",
                    text: "प्योर साइन वेव इनवर्टर",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
    },
    LGS900i: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "Inverter for Small Offices, Homes, and Small Shops with Best-in-Class Warranty and Smart AI Charging.",
            description: "With an assured warranty and Pure Sine Wave output, experience energy unlimited at your home with this Livguard Inverter",
            productIcons: [
                {
                    icon: "",
                    text: "3 Year Warranty",
                },
                {
                    icon: "",
                    text: "1500 VA",
                },
                {
                    icon: "",
                    text: "Pure Sine Wave Inverter ",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "छोटे कार्यालयों, घरों और छोटी दुकानों के लिए इन्वर्टर, सर्वश्रेष्ठ श्रेणी की वारंटी और स्मार्ट एआई चार्जिंग के साथ",
            description: "सुनिश्चित वारंटी और प्योर साइन वेव आउटपुट के साथ, हमारे लिवगार्ड इन्वर्टर के साथ अपने घर पर असीमित ऊर्जा का अनुभव करें",
            productIcons: [
                {
                    icon: "",
                    text: "3 वर्ष वारंटी",
                },
                {
                    icon: "",
                    text: "1500VA",
                },
                {
                    icon: "",
                    text: "प्योर साइन वेव इनवर्टर",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
    },
    IT9048ST: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: " Inverter Battery for Home & small spaces with Maximum Warranty, Long Life & Extra Backup.",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "",
                    text: "24 + 24* Months Warranty",
                },
                {
                    icon: "",
                    text: "90 Ah",
                },
                {
                    icon: "",
                    text: "Short Tubular",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "घर और छोटी जगहों के लिए इन्वर्टर बैटरी, अधिकतम वारंटी, लंबे जीवन और अतिरिक्त बैकअप के साथ",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "",
                    text: "24 + 24* महीने वारंटी",
                },
                {
                    icon: "",
                    text: "90 Ah",
                },
                {
                    icon: "",
                    text: "शोर्ट ट्यूबलर ",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
    },
    IT1048ST: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: " Inverter Battery for Home & small spaces with Maximum Warranty, Long Life & Extra Backup.",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "",
                    text: "24 + 24* Months Warranty",
                },
                {
                    icon: "",
                    text: "100 Ah",
                },
                {
                    icon: "",
                    text: "Short Tubular",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "घर और छोटी जगहों के लिए इन्वर्टर बैटरी, अधिकतम वारंटी, लंबे जीवन और अतिरिक्त बैकअप के साथ",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "",
                    text: "24 + 24* महीने वारंटी",
                },
                {
                    icon: "",
                    text: "100 Ah",
                },
                {
                    icon: "",
                    text: "शोर्ट ट्यूबलर ",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
    },
    IT1160STT: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: " Inverter Battery for Home & small spaces with Maximum Warranty, Long Life & Extra Backup.",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "",
                    text: "42 + 18* Months Warranty",
                },
                {
                    icon: "",
                    text: "110 Ah",
                },
                {
                    icon: "",
                    text: "Short Tall Tubular",
                },
                {
                    icon: "",
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
                    value: "48 + 18* Months",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "घर और छोटी जगहों के लिए इन्वर्टर बैटरी, अधिकतम वारंटी, लंबे जीवन और अतिरिक्त बैकअप के साथ",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "",
                    text: "42 + 18* महीने वारंटी",
                },
                {
                    icon: "",
                    text: "110 Ah",
                },
                {
                    icon: "",
                    text: "शोर्ट लंबा ट्यूबलर  ",
                },
                {
                    icon: "",
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
                    title: " उत्पादक",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
    },
    IT1584TT: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: " Inverter Battery for Home & small spaces with Maximum Warranty, Long Life & Extra Backup.",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "",
                    text: "60 + 24* Months Warranty",
                },
                {
                    icon: "",
                    text: "150 Ah",
                },
                {
                    icon: "",
                    text: "Tall Tubular",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "घर और छोटी जगहों के लिए इन्वर्टर बैटरी, अधिकतम वारंटी, लंबे जीवन और अतिरिक्त बैकअप के साथ",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "",
                    text: "60 + 24* महीने वारंटी",
                },
                {
                    icon: "",
                    text: "150 Ah",
                },
                {
                    icon: "",
                    text: "लंबा ट्यूबलर  ",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
    },
    IT1554STJ: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: " Inverter Battery for Home & small spaces with Maximum Warranty, Long Life & Extra Backup.",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "",
                    text: "36 + 18* Months Warranty",
                },
                {
                    icon: "",
                    text: "150 Ah",
                },
                {
                    icon: "",
                    text: "Short Jumbo Tubular",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "घर और छोटी जगहों के लिए इन्वर्टर बैटरी, अधिकतम वारंटी, लंबे जीवन और अतिरिक्त बैकअप के साथ",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "",
                    text: "42 + 18* महीने वारंटी",
                },
                {
                    icon: "",
                    text: "110 Ah",
                },
                {
                    icon: "",
                    text: "शोर्ट लंबा ट्यूबलर  ",
                },
                {
                    icon: "",
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
                    title: " उत्पादक",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
    },
    IT1542STJ: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: " Inverter Battery for Home & small spaces with Maximum Warranty, Long Life & Extra Backup.",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "",
                    text: "24 + 18* Months Warranty",
                },
                {
                    icon: "",
                    text: "150 Ah",
                },
                {
                    icon: "",
                    text: "Short Jumbo Tubular",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "घर और छोटी जगहों के लिए इन्वर्टर बैटरी, अधिकतम वारंटी, लंबे जीवन और अतिरिक्त बैकअप के साथ",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "",
                    text: "24 + 18* महीने वारंटी",
                },
                {
                    icon: "",
                    text: "150 Ah",
                },
                {
                    icon: "",
                    text: "शोर्ट लंबा ट्यूबलर  ",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
    },
    IT1548STT: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: " Inverter Battery for Home & small spaces with Maximum Warranty, Long Life & Extra Backup.",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "",
                    text: "24 + 24* Months Warranty",
                },
                {
                    icon: "",
                    text: "150 Ah",
                },
                {
                    icon: "",
                    text: "Short Tall Tubular",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "घर और छोटी जगहों के लिए इन्वर्टर बैटरी, अधिकतम वारंटी, लंबे जीवन और अतिरिक्त बैकअप के साथ",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "",
                    text: "24 + 24* महीने वारंटी",
                },
                {
                    icon: "",
                    text: "150 Ah",
                },
                {
                    icon: "",
                    text: "शोर्ट लंबा ट्यूबलर  ",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
    },
    IT1560STT: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: " Inverter Battery for Home & small spaces with Maximum Warranty, Long Life & Extra Backup.",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "",
                    text: "36 + 24* Months Warranty",
                },
                {
                    icon: "",
                    text: "150 Ah",
                },
                {
                    icon: "",
                    text: "Short Tall Tubular",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "घर और छोटी जगहों के लिए इन्वर्टर बैटरी, अधिकतम वारंटी, लंबे जीवन और अतिरिक्त बैकअप के साथ",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "",
                    text: "36 + 24* महीने वारंटी",
                },
                {
                    icon: "",
                    text: "150 Ah",
                },
                {
                    icon: "",
                    text: "शोर्ट लंबा ट्यूबलर  ",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
    },
    IT1550TT: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: " Inverter Battery for Home & small spaces with Maximum Warranty, Long Life & Extra Backup.",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "",
                    text: "36 + 14* Months Warranty",
                },
                {
                    icon: "",
                    text: "150 Ah",
                },
                {
                    icon: "",
                    text: "Tall Tubular",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "घर और छोटी जगहों के लिए इन्वर्टर बैटरी, अधिकतम वारंटी, लंबे जीवन और अतिरिक्त बैकअप के साथ",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "",
                    text: "36 + 14* महीने वारंटी",
                },
                {
                    icon: "",
                    text: "150 Ah",
                },
                {
                    icon: "",
                    text: "लंबा ट्यूबलर  ",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
    },
    IT1554TT: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: " Inverter Battery for Home & small spaces with Maximum Warranty, Long Life & Extra Backup.",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "",
                    text: "42 + 12* Months Warranty",
                },
                {
                    icon: "",
                    text: "150 Ah",
                },
                {
                    icon: "",
                    text: "Tall Tubular",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "घर और छोटी जगहों के लिए इन्वर्टर बैटरी, अधिकतम वारंटी, लंबे जीवन और अतिरिक्त बैकअप के साथ",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "",
                    text: "42 + 12* महीने वारंटी",
                },
                {
                    icon: "",
                    text: "150 Ah",
                },
                {
                    icon: "",
                    text: "लंबा ट्यूबलर  ",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
    },
    IT1560TT: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: " Inverter Battery for Home & small spaces with Maximum Warranty, Long Life & Extra Backup.",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "",
                    text: "48 + 12* Months Warranty",
                },
                {
                    icon: "",
                    text: "150 Ah",
                },
                {
                    icon: "",
                    text: "Tall Tubular",
                },
                {
                    icon: "",
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
                    value: "48 + 12* Months",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "घर और छोटी जगहों के लिए इन्वर्टर बैटरी, अधिकतम वारंटी, लंबे जीवन और अतिरिक्त बैकअप के साथ",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "",
                    text: "48 + 12* महीने वारंटी",
                },
                {
                    icon: "",
                    text: "150 Ah",
                },
                {
                    icon: "",
                    text: "लंबा ट्यूबलर  ",
                },
                {
                    icon: "",
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
                    value: "48 + 12* महीने",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
    },
    IT1536TT: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: " Inverter Battery for Home & small spaces with Maximum Warranty, Long Life & Extra Backup.",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "",
                    text: "18 + 18* Months Warranty",
                },
                {
                    icon: "",
                    text: "150 Ah",
                },
                {
                    icon: "",
                    text: "Tall Tubular",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "घर और छोटी जगहों के लिए इन्वर्टर बैटरी, अधिकतम वारंटी, लंबे जीवन और अतिरिक्त बैकअप के साथ",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "",
                    text: "18 + 18* महीने वारंटी",
                },
                {
                    icon: "",
                    text: "150 Ah",
                },
                {
                    icon: "",
                    text: "लंबा ट्यूबलर  ",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
    },
    IT1548TT: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: " Inverter Battery for Home & small spaces with Maximum Warranty, Long Life & Extra Backup.",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "",
                    text: "30 + 18* Months Warranty",
                },
                {
                    icon: "",
                    text: "150 Ah",
                },
                {
                    icon: "",
                    text: "Tall Tubular",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "घर और छोटी जगहों के लिए इन्वर्टर बैटरी, अधिकतम वारंटी, लंबे जीवन और अतिरिक्त बैकअप के साथ",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "",
                    text: "30 + 18* महीने वारंटी",
                },
                {
                    icon: "",
                    text: "150 Ah",
                },
                {
                    icon: "",
                    text: "लंबा ट्यूबलर  ",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
    },
    IT1666TT: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: " Inverter Battery for Home & small spaces with Maximum Warranty, Long Life & Extra Backup.",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "",
                    text: "42 + 24* Months Warranty",
                },
                {
                    icon: "",
                    text: "160 Ah",
                },
                {
                    icon: "",
                    text: "Tall Tubular",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "घर और छोटी जगहों के लिए इन्वर्टर बैटरी, अधिकतम वारंटी, लंबे जीवन और अतिरिक्त बैकअप के साथ",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "",
                    text: "42 + 24* महीने वारंटी",
                },
                {
                    icon: "",
                    text: "160 Ah",
                },
                {
                    icon: "",
                    text: " लंबा ट्यूबुलर ",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
    },
    IT1639TT: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: " Inverter Battery for Home & small spaces with Maximum Warranty, Long Life & Extra Backup.",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "",
                    text: "21 + 18* Months Warranty",
                },
                {
                    icon: "",
                    text: "160 Ah",
                },
                {
                    icon: "",
                    text: "Tall Tubular",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "घर और छोटी जगहों के लिए इन्वर्टर बैटरी, अधिकतम वारंटी, लंबे जीवन और अतिरिक्त बैकअप के साथ",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "",
                    text: "21 + 18* महीने वारंटी",
                },
                {
                    icon: "",
                    text: "160 Ah",
                },
                {
                    icon: "",
                    text: " लंबा ट्यूबुलर ",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
    },
    IT1645TT: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: " Inverter Battery for Home & small spaces with Maximum Warranty, Long Life & Extra Backup.",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "",
                    text: "27 + 18* Months Warranty",
                },
                {
                    icon: "",
                    text: "160 Ah",
                },
                {
                    icon: "",
                    text: "Tall Tubular",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "घर और छोटी जगहों के लिए इन्वर्टर बैटरी, अधिकतम वारंटी, लंबे जीवन और अतिरिक्त बैकअप के साथ",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "",
                    text: "27 + 18* महीने वारंटी",
                },
                {
                    icon: "",
                    text: "160 Ah",
                },
                {
                    icon: "",
                    text: " लंबा ट्यूबुलर ",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
    },
    IT1860TT: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: " Inverter Battery for Home & small spaces with Maximum Warranty, Long Life & Extra Backup.",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "",
                    text: "36 + 24* Months Warranty",
                },
                {
                    icon: "",
                    text: "180 Ah",
                },
                {
                    icon: "",
                    text: "Tall Tubular",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "घर और छोटी जगहों के लिए इन्वर्टर बैटरी, अधिकतम वारंटी, लंबे जीवन और अतिरिक्त बैकअप के साथ",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "",
                    text: "36 + 24* महीने वारंटी",
                },
                {
                    icon: "",
                    text: "180 Ah",
                },
                {
                    icon: "",
                    text: " लंबा ट्यूबुलर ",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
    },
    IT1866TT: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: " Inverter Battery for Home & small spaces with Maximum Warranty, Long Life & Extra Backup.",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "",
                    text: "42 + 24* Months Warranty",
                },
                {
                    icon: "",
                    text: "180 Ah",
                },
                {
                    icon: "",
                    text: "Tall Tubular",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "घर और छोटी जगहों के लिए इन्वर्टर बैटरी, अधिकतम वारंटी, लंबे जीवन और अतिरिक्त बैकअप के साथ",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "",
                    text: "42 + 24* महीने वारंटी",
                },
                {
                    icon: "",
                    text: "180 Ah",
                },
                {
                    icon: "",
                    text: " लंबा ट्यूबुलर ",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
    },
    IT1636STJ: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: " Inverter Battery for Home & small spaces with Maximum Warranty, Long Life & Extra Backup.",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "",
                    text: "18 + 18* Months Warranty",
                },
                {
                    icon: "",
                    text: "160 Ah",
                },
                {
                    icon: "",
                    text: "Short Jumbo Tubular",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "घर और छोटी जगहों के लिए इन्वर्टर बैटरी, अधिकतम वारंटी, लंबे जीवन और अतिरिक्त बैकअप के साथ",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "",
                    text: "18 + 18* महीने वारंटी",
                },
                {
                    icon: "",
                    text: "160 Ah",
                },
                {
                    icon: "",
                    text: " शोर्ट जंबो ट्यूबुलर ",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
    },
    IT2060TT: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: " Inverter Battery for Home & small spaces with Maximum Warranty, Long Life & Extra Backup.",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "",
                    text: "36 + 24* Months Warranty",
                },
                {
                    icon: "",
                    text: "200 Ah",
                },
                {
                    icon: "",
                    text: "Tall Tubular",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "घर और छोटी जगहों के लिए इन्वर्टर बैटरी, अधिकतम वारंटी, लंबे जीवन और अतिरिक्त बैकअप के साथ",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "",
                    text: "36 + 24* महीने वारंटी",
                },
                {
                    icon: "",
                    text: "200 Ah",
                },
                {
                    icon: "",
                    text: "लंबा ट्यूबुलर ",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
    },
    IT2066TT: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: " Inverter Battery for Home & small spaces with Maximum Warranty, Long Life & Extra Backup.",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "",
                    text: "42 + 24* Months Warranty",
                },
                {
                    icon: "",
                    text: "200 Ah",
                },
                {
                    icon: "",
                    text: "Tall Tubular",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "घर और छोटी जगहों के लिए इन्वर्टर बैटरी, अधिकतम वारंटी, लंबे जीवन और अतिरिक्त बैकअप के साथ",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "",
                    text: "42 + 24* महीने वारंटी",
                },
                {
                    icon: "",
                    text: "200 Ah",
                },
                {
                    icon: "",
                    text: "लंबा ट्यूबुलर ",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
    },
    IT2266TT: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: " Inverter Battery for Home & small spaces with Maximum Warranty, Long Life & Extra Backup.",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "",
                    text: "42 + 24* Months Warranty",
                },
                {
                    icon: "",
                    text: "220 Ah",
                },
                {
                    icon: "",
                    text: "Tall Tubular",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "घर और छोटी जगहों के लिए इन्वर्टर बैटरी, अधिकतम वारंटी, लंबे जीवन और अतिरिक्त बैकअप के साथ",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "",
                    text: "42 + 24* महीने वारंटी",
                },
                {
                    icon: "",
                    text: "220 Ah",
                },
                {
                    icon: "",
                    text: "लंबा ट्यूबुलर ",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
    },
    IT2360TT: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: " Inverter Battery for Home & small spaces with Maximum Warranty, Long Life & Extra Backup.",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "",
                    text: "36 + 24* Months Warranty",
                },
                {
                    icon: "",
                    text: "230 Ah",
                },
                {
                    icon: "",
                    text: "Tall Tubular",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "घर और छोटी जगहों के लिए इन्वर्टर बैटरी, अधिकतम वारंटी, लंबे जीवन और अतिरिक्त बैकअप के साथ",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "",
                    text: "36 + 24* महीने वारंटी",
                },
                {
                    icon: "",
                    text: "200 Ah",
                },
                {
                    icon: "",
                    text: "लंबा ट्यूबुलर ",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
    },
    IT2672TT: {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: " Inverter Battery for Home & small spaces with Maximum Warranty, Long Life & Extra Backup.",
            description:
                "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
            productIcons: [
                {
                    icon: "",
                    text: "42 + 30* Months Warranty",
                },
                {
                    icon: "",
                    text: "260 Ah",
                },
                {
                    icon: "",
                    text: "Tall Tubular",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "घर और छोटी जगहों के लिए इन्वर्टर बैटरी, अधिकतम वारंटी, लंबे जीवन और अतिरिक्त बैकअप के साथ",
            description:
                "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
            productIcons: [
                {
                    icon: "",
                    text: "42 + 30* महीने वारंटी",
                },
                {
                    icon: "",
                    text: "260 Ah",
                },
                {
                    icon: "",
                    text: "लंबा ट्यूबुलर ",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
    },
    "The Urban Jodi": {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "Inverter and Inverter Battery Combo for Small Office, Home and Small Shops.",
            description: "Bring home the power of limitless energy with our amazingly curated Jodi combos. Made to perfectly match your needs efficiently.",
            productIcons: [
                {
                    icon: "",
                    text: "3 Years | 36 + 24* Months Warranty",
                },
                {
                    icon: "",
                    text: "1250VA | 200 Ah",
                },
                {
                    icon: "",
                    text: "Square wave + Tall Tubular",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "छोटे कार्यालय, घर और छोटी दुकानों के लिए साइन वेव इन्वर्टर और इन्वर्टर बैटरी कॉम्बो",
            description: "हमारे असीम कुशलता से तैयार किए गए जोड़ी कॉम्बो के साथ असीम ऊर्जा की शक्ति को घर लाएं। यह कॉम्बो आपकी आवश्यकताओं को पूरी तरह से कुशलता से मेल खाने के लिए बनाए गए हैं",
            productIcons: [
                {
                    icon: "",
                    text: "3 वर्ष | 36 + 24* वारंटी",
                },
                {
                    icon: "",
                    text: "900VA | 150Ah",
                },
                {
                    icon: "",
                    text: "साइन वेव + शोर्ट लंबा ट्यूबलर ",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
    },
    "The Rural Jodi": {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "Inverter and Inverter Battery Combo for Small Office, Home and Small Shops.",
            description: "Bring home the power of limitless energy with our amazingly curated Jodi combos. Made to perfectly match your needs efficiently.",
            productIcons: [
                {
                    icon: "",
                    text: "3 Years | 36 + 24* Months Warranty",
                },
                {
                    icon: "",
                    text: "1250VA | 200 Ah",
                },
                {
                    icon: "",
                    text: "Square wave + Tall Tubular",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "छोटे कार्यालय, घर और छोटी दुकानों के लिए साइन वेव इन्वर्टर और इन्वर्टर बैटरी कॉम्बो",
            description: "हमारे असीम कुशलता से तैयार किए गए जोड़ी कॉम्बो के साथ असीम ऊर्जा की शक्ति को घर लाएं। यह कॉम्बो आपकी आवश्यकताओं को पूरी तरह से कुशलता से मेल खाने के लिए बनाए गए हैं",
            productIcons: [
                {
                    icon: "",
                    text: "3 वर्ष | 36 + 24* वारंटी",
                },
                {
                    icon: "",
                    text: "1250VA | 200Ah",
                },
                {
                    icon: "",
                    text: "चौकोर तरंग + लंबा ट्यूबलर ",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
    },
    "The Super Life Jodi": {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: " Sinewave Inverter and Inverter Battery Combo for Small Office, Home and Small Shops.",
            description: "Bring home the power of limitless energy with our amazingly curated Jodi combos. Made to perfectly match your needs efficiently.",
            productIcons: [
                {
                    icon: "",
                    text: "3 Years | 60 + 24* Months Warranty",
                },
                {
                    icon: "",
                    text: "1500VA | 150 Ah",
                },
                {
                    icon: "",
                    text: "Sinewave + Tall Tubular",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "छोटे कार्यालय, घर और छोटी दुकानों के लिए साइन वेव इन्वर्टर और इन्वर्टर बैटरी कॉम्बो",
            description: "हमारे असीम कुशलता से तैयार किए गए जोड़ी कॉम्बो के साथ असीम ऊर्जा की शक्ति को घर लाएं। यह कॉम्बो आपकी आवश्यकताओं को पूरी तरह से कुशलता से मेल खाने के लिए बनाए गए हैं",
            productIcons: [
                {
                    icon: "",
                    text: "3 वर्ष | 60 + 24* वारंटी",
                },
                {
                    icon: "",
                    text: "1500VA | 150Ah",
                },
                {
                    icon: "",
                    text: "साइन वेव + लंबा ट्यूबलर ",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
    },
    "The Hi Power Jodi": {
        [Language.English]: {
            images: [
                {
                    image: "",
                },
            ],
            title: " Sinewave Inverter and Inverter Battery Combo for Small Office, Home and Small Shops.",
            description: "Bring home the power of limitless energy with our amazingly curated Jodi combos. Made to perfectly match your needs efficiently.",
            productIcons: [
                {
                    icon: "",
                    text: "3 Years | 42 + 30* Months Warranty",
                },
                {
                    icon: "",
                    text: "2000VA | 260 Ah",
                },
                {
                    icon: "",
                    text: "Sinewave + Tall Tubular",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
        [Language.Hindi]: {
            images: [
                {
                    image: "",
                },
            ],
            title: "छोटे कार्यालय, घर और छोटी दुकानों के लिए साइन वेव इन्वर्टर और इन्वर्टर बैटरी कॉम्बो",
            description: "हमारे असीम कुशलता से तैयार किए गए जोड़ी कॉम्बो के साथ असीम ऊर्जा की शक्ति को घर लाएं। यह कॉम्बो आपकी आवश्यकताओं को पूरी तरह से कुशलता से मेल खाने के लिए बनाए गए हैं",
            productIcons: [
                {
                    icon: "",
                    text: "3 वर्ष | 42 + 30* वारंटी",
                },
                {
                    icon: "",
                    text: "2000VA | 260Ah",
                },
                {
                    icon: "",
                    text: "साइन वेव + लंबा ट्यूबलर ",
                },
                {
                    icon: "",
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
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                    {
                        image: "",
                    },
                ],
            },
            reviews: {
                rating: 5,
                numberOfReviews: 120,
            },
        },
    },
};
