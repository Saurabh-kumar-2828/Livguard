import {Language} from "~/typeDefinitions";

export function getVernacularString(textContentPiece: string, language: Language): string {
    if (!(textContentPiece in vernacularStrings)) {
        // @ts-ignore
        return vernacularStrings["invalidKey"][language];
    }

    // TODO: Debugging
    const translation = vernacularStrings[textContentPiece][language];
    if (translation == "?????") {
        return `${textContentPiece} - ${translation}`;
    } else {
        return translation;
    }

    // @ts-ignore
    return vernacularStrings[textContentPiece][language];
}

// @ts-ignore
const vernacularStrings: {[textContentPiece: string]: {[language: Language]: string}} = {
    headerS1T1: {
        [Language.English]: "Get In Touch",
        [Language.Hindi]: "हमसे जुड़िये",
        [Language.Marathi]: "?????",
    },
    headerS2T1: {
        [Language.English]: "Search",
        [Language.Hindi]: "यहाँ खोजें",
        [Language.Marathi]: "?????",
    },

    headerMenuS1T1: {
        [Language.English]: "Inverters",
        [Language.Hindi]: "इनवर्टर",
        [Language.Marathi]: "?????",
    },
    headerMenuS1T2: {
        [Language.English]: "Inverter Batteries",
        [Language.Hindi]: "इनवर्टर बैटरी",
        [Language.Marathi]: "?????",
    },
    headerMenuS1T3: {
        [Language.English]: "Automotive Batteries",
        [Language.Hindi]: "ऑटोमोटिव बैटरी",
        [Language.Marathi]: "?????",
    },
    headerMenuS1T4: {
        [Language.English]: "Solar Solutions",
        [Language.Hindi]: "सोलर सलूशन",
        [Language.Marathi]: "?????",
    },
    headerMenuS1T5: {
        [Language.English]: "Accessories",
        [Language.Hindi]: "सहायक उपकरण",
        [Language.Marathi]: "?????",
    },
    headerMenuS1T6: {
        [Language.English]: "Dealer Locator",
        [Language.Hindi]: "डीलर ढूँढें",
        [Language.Marathi]: "?????",
    },
    headerMenuS1T7: {
        [Language.English]: "Register Your Product",
        [Language.Hindi]: "उत्पाद रजिस्टर करवायें",
        [Language.Marathi]: "?????",
    },
    headerMenuS1T8: {
        [Language.English]: "More",
        [Language.Hindi]: "और देखें",
        [Language.Marathi]: "?????",
    },
    headerMenuS2T1: {
        [Language.English]: "Contact Us",
        [Language.Hindi]: "हमसे संपर्क करें",
        [Language.Marathi]: "?????",
    },
    headerMenuSM1T1: {
        [Language.English]: "Inverters",
        [Language.Hindi]: "इनवर्टर",
        [Language.Marathi]: "?????",
    },
    headerMenuSM1T2: {
        [Language.English]: "Home Inverters",
        [Language.Hindi]: "होम इनवर्टर",
        [Language.Marathi]: "?????",
    },
    headerMenuSM1T3: {
        [Language.English]: "Solar Inverters",
        [Language.Hindi]: "सोलर इनवर्टर",
        [Language.Marathi]: "?????",
    },
    headerMenuSM1T4: {
        [Language.English]: "High Capacity Inverters",
        [Language.Hindi]: "हाय-कैपेसिटी इनवर्टर",
        [Language.Marathi]: "?????",
    },
    headerMenuSM2T1: {
        [Language.English]: "Inverter Batteries",
        [Language.Hindi]: "इनवर्टर बैटरी",
        [Language.Marathi]: "?????",
    },
    headerMenuSM2T2: {
        [Language.English]: "Inverter Batteries",
        [Language.Hindi]: "इनवर्टर बैटरी",
        [Language.Marathi]: "?????",
    },
    headerMenuSM2T3: {
        [Language.English]: "Solar Batteries",
        [Language.Hindi]: "सोलर बैटरी",
        [Language.Marathi]: "?????",
    },
    headerMenuSM2T4: {
        [Language.English]: "Lithium Batteries",
        [Language.Hindi]: "लिथियम बैटरी",
        [Language.Marathi]: "?????",
    },
    headerMenuSM2T5: {
        [Language.English]: "VRLA Batteries",
        [Language.Hindi]: "VRLA बैटरी",
        [Language.Marathi]: "?????",
    },
    headerMenuSM3T1: {
        [Language.English]: "Automotive Batteries",
        [Language.Hindi]: "ऑटोमोटिव बैटरी",
        [Language.Marathi]: "?????",
    },
    headerMenuSM3T2: {
        [Language.English]: "Car and SUV Batteries",
        [Language.Hindi]: "गाड़ी और SUV बैटरी",
        [Language.Marathi]: "?????",
    },
    headerMenuSM3T3: {
        [Language.English]: "Two Wheeler Batteries",
        [Language.Hindi]: "2-पहिया बैटरी",
        [Language.Marathi]: "?????",
    },
    headerMenuSM3T4: {
        [Language.English]: "E-Rikshaw Batteries",
        [Language.Hindi]: "ई-रिक्शा की बैटरी",
        [Language.Marathi]: "?????",
    },
    headerMenuSM3T5: {
        [Language.English]: "Bus & Truck Batteries",
        [Language.Hindi]: "बस और ट्रक की बैटरी",
        [Language.Marathi]: "?????",
    },
    headerMenuSM3T6: {
        [Language.English]: "Tractor Batteries",
        [Language.Hindi]: "ट्रैक्टर बैटरी",
        [Language.Marathi]: "?????",
    },
    headerMenuSM3T7: {
        [Language.English]: "Three Wheeler Batteries",
        [Language.Hindi]: "3-पहिया बैटरी",
        [Language.Marathi]: "?????",
    },
    headerMenuSM4T1: {
        [Language.English]: "Solar Solutions",
        [Language.Hindi]: "सोलर सलूशन",
        [Language.Marathi]: "?????",
    },
    headerMenuSM5T1: {
        [Language.English]: "Accessories",
        [Language.Hindi]: "सहायक उपकरण",
        [Language.Marathi]: "?????",
    },
    headerMenuSM5T2: {
        [Language.English]: "Stabilizer",
        [Language.Hindi]: "स्टेबिलाइजर्स",
        [Language.Marathi]: "?????",
    },
    headerMenuSM5T3: {
        [Language.English]: "E-Rikshaw Chargers",
        [Language.Hindi]: "ई-रिक्शा चार्जर",
        [Language.Marathi]: "?????",
    },
    headerMenuSM5T4: {
        [Language.English]: "Inverter Trolley",
        [Language.Hindi]: "इनवर्टर ट्राली",
        [Language.Marathi]: "?????",
    },
    headerMenuSM6T1: {
        [Language.English]: "Dealer Locator",
        [Language.Hindi]: "डीलर ढूँढें",
        [Language.Marathi]: "?????",
    },
    headerMenuSM7T1: {
        [Language.English]: "Register Your Product",
        [Language.Hindi]: "उत्पाद रजिस्टर करवायें",
        [Language.Marathi]: "?????",
    },
    headerMenuSM8T1: {
        [Language.English]: "More",
        [Language.Hindi]: "और देखें",
        [Language.Marathi]: "?????",
    },
    headerMenuSM8T2: {
        [Language.English]: "About Us",
        [Language.Hindi]: "हमारे बारे में",
        [Language.Marathi]: "?????",
    },
    headerMenuSM8T3: {
        [Language.English]: "Blogs",
        [Language.Hindi]: "ब्लॉग",
        [Language.Marathi]: "?????",
    },
    headerMenuSM8T4: {
        [Language.English]: "LETPL Annual return 2021-22",
        [Language.Hindi]: "LETPL वार्षिक विवरण– 2021-22",
        [Language.Marathi]: "?????",
    },
    headerMenuSM8T5: {
        [Language.English]: "LBPL Annual return 2021-22",
        [Language.Hindi]: "LBPL वार्षिक विवरण– 2021-22",
        [Language.Marathi]: "?????",
    },
    headerMenuSM8T6: {
        [Language.English]: "E-Waste Management",
        [Language.Hindi]: "ई-वेस्ट मैनेजमेंट",
        [Language.Marathi]: "?????",
    },
    headerContactUsDialogT1: {
        [Language.English]: "Get In Touch With Us",
        [Language.Hindi]: "हमसे जुड़िये",
        [Language.Marathi]: "?????",
    },
    headerContactUsDialogT2: {
        [Language.English]: "Service",
        [Language.Hindi]: "सर्विस",
        [Language.Marathi]: "?????",
    },
    headerContactUsDialogT3: {
        [Language.English]: "Connect with Livguard Inverter Expert",
        [Language.Hindi]: "लिवगार्ड इन्वर्टर एक्सपर्ट से जुड़ें",
        [Language.Marathi]: "?????",
    },

    homeS1T1: {
        [Language.English]: "Uninterrupted Power",
        [Language.Hindi]: "निरंतर ऊर्जा",
        [Language.Marathi]: "?????",
    },
    homeS1T2: {
        [Language.English]: "With Livguard",
        [Language.Hindi]: "लिवगार्ड के साथ",
        [Language.Marathi]: "?????",
    },
    homeS1T3: {
        [Language.English]: "Get in Touch With Us",
        [Language.Hindi]: "बदलते भारत के लिए",
        [Language.Marathi]: "?????",
    },
    homeS2T1: {
        [Language.English]: "Energy Storage Solutions",
        [Language.Hindi]: "ऊर्जा संग्रहण समाधान",
        [Language.Marathi]: "?????",
    },
    homeS2T2: {
        [Language.English]: "To Power Up Your Future",
        [Language.Hindi]: "जिनसे आपका भविष्य रोशन हो",
        [Language.Marathi]: "?????",
    },
    homeS2C1T1: {
        [Language.English]: "Best in Class Services",
        [Language.Hindi]: "अतुल्य सर्विस",
        [Language.Marathi]: "?????",
    },
    homeS2C1T2: {
        [Language.English]:
            "With a PAN India presence with 40+ service centers, Livguard is just one call away to cater to your energy storage related needs. We always keep your product satisfaction as our priority, and empower you with unlimited energy.",
        [Language.Hindi]: "पूरे भारत में मौजूद 40+ सर्विस केंद्रों के साथ लिवगार्ड आपकी असुविधाओं को दूर करने के लिए हमेशा एक कॉल दूर है। आपकी संतुष्टि हमारे लिए हमेशा सबसे महत्त्वपूर्ण है।",
        [Language.Marathi]: "?????",
    },
    homeS2C2T1: {
        [Language.English]: "Manufacturing Excellence",
        [Language.Hindi]: "श्रेष्ठ उत्पादन",
        [Language.Marathi]: "?????",
    },
    homeS2C2T2: {
        [Language.English]:
            "At Livguard, perfection is not an option, it's the only standard. Uncompromising quality is our promise. Livguard's refined manufacturing processes deliver reliable products every time.",
        [Language.Hindi]:
            "लिवगार्ड में, श्रेष्ठता कोई विकल्प नहीं है, यह एकमात्र मानक है। बिना किसी समझौते वाली क्वालिटी हमारा वादा है। लिवगार्ड की परिष्कृत निर्माण प्रक्रियाएं हर बार विश्वसनीय उत्पाद प्रदान करती हैं।",
        [Language.Marathi]: "?????",
    },
    homeS3H1T1: {
        [Language.English]: "Experience Our",
        [Language.Hindi]: "अनुभव करें हमारे",
        [Language.Marathi]: "?????",
    },
    homeS3H1T2: {
        [Language.English]: `<span class=\"lg-text-highlighted\">Energy Solutions</span>`,
        [Language.Hindi]: `<span class=\"lg-text-highlighted\">ऊर्जा संग्रहण समाधान</span>`,
        [Language.Marathi]: "?????",
    },
    homeS3Tab1H: {
        [Language.English]: "Automotive Batteries",
        [Language.Hindi]: "ऑटोमोटिव बैटरी",
        [Language.Marathi]: "?????",
    },
    homeS3Tab1HC1: {
        [Language.English]: "Energy Solutions",
        [Language.Hindi]: "ऊर्जा समाधान",
        [Language.Marathi]: "?????",
    },
    homeS3Tab1HC2: {
        [Language.English]: "Automotive Batteries",
        [Language.Hindi]: "ऑटोमोटिव बैटरी",
        [Language.Marathi]: "?????",
    },
    homeS3Tab1C: {
        [Language.English]: "Experience limitless energy with our wide range range of automotive batteries, made to empower your fast-paced lifestyle with high performing products.",
        [Language.Hindi]:
            "ऑटोमोटिव बैटरियों की हमारी विस्तृत श्रृंखला के साथ असीमित ऊर्जा का अनुभव करें, जो उच्च प्रदर्शन वाले उत्पादों के साथ आपकी तेज़-तर्रार जीवन शैली को सशक्त बनाने के लिए बनाई गई है।",
        [Language.Marathi]: "?????",
    },
    homeS3Tab1BT: {
        [Language.English]: "Explore Auto Batteries",
        [Language.Hindi]: "ऑटो बैटरी देखें",
        [Language.Marathi]: "?????",
    },
    homeS3Tab2H: {
        [Language.English]: "Home Inverters",
        [Language.Hindi]: "होम इनवर्टर",
        [Language.Marathi]: "?????",
    },
    homeS3Tab2HC1: {
        [Language.English]: "Energy Solutions",
        [Language.Hindi]: "ऊर्जा समाधान",
        [Language.Marathi]: "?????",
    },
    homeS3Tab2HC2: {
        [Language.English]: "Home Inverters",
        [Language.Hindi]: "होम इनवर्टर",
        [Language.Marathi]: "?????",
    },
    homeS3Tab2C: {
        [Language.English]:
            "Visit our range of home inverters with sleek design made to bring unlimited flow of energy to your home. Backed by its sturdy build, pick the one that suits your home the best.",
        [Language.Hindi]: "आपके घर में ऊर्जा का असीमित प्रवाह लाने के लिए आकर्षक बनावट वाले होम इनवर्टर की हमारी श्रेणी पर जाएं। इसके मजबूत निर्माण के साथ, वह चुनें जो आपके होम लिए सबसे उपयुक्त हो।",
        [Language.Marathi]: "?????",
    },
    homeS3Tab2BT: {
        [Language.English]: "Explore Inverters",
        [Language.Hindi]: "इनवर्टर देखें",
        [Language.Marathi]: "?????",
    },
    homeS3Tab3H: {
        [Language.English]: "Inverter Batteries",
        [Language.Hindi]: "इनवर्टर बैटरी",
        [Language.Marathi]: "?????",
    },
    homeS3Tab3HC1: {
        [Language.English]: "Energy Solutions",
        [Language.Hindi]: "ऊर्जा समाधान",
        [Language.Marathi]: "?????",
    },
    homeS3Tab3HC2: {
        [Language.English]: "Inverter Batteries",
        [Language.Hindi]: "इनवर्टर बैटरी",
        [Language.Marathi]: "?????",
    },
    homeS3Tab3C: {
        [Language.English]: "With industry’s first 3D grid technology, our range of inverter batteries are manufactured to meet the power backup requirements of your family efficiently.",
        [Language.Hindi]: "उद्योग की सबसे पहली 3डी ग्रिड तकनीक के साथ, हमारी इनवर्टर बैटरी की श्रेणी आपके परिवार की पावर बैकअप आवश्यकताओं को कुशलतापूर्वक पूरा करने के लिए निर्मित की जाती है।",
        [Language.Marathi]: "?????",
    },
    homeS3Tab3BT: {
        [Language.English]: "Explore Inverter Batteries",
        [Language.Hindi]: "इनवर्टर बैटरी देखें",
        [Language.Marathi]: "?????",
    },
    homeS3Tab4H: {
        [Language.English]: "Solar Solutions",
        [Language.Hindi]: "सोलर सलूशन",
        [Language.Marathi]: "?????",
    },
    homeS3Tab4HC1: {
        [Language.English]: "Energy Solutions",
        [Language.Hindi]: "ऊर्जा समाधान",
        [Language.Marathi]: "?????",
    },
    homeS3Tab4HC2: {
        [Language.English]: "Solar Solutions",
        [Language.Hindi]: "सोलर सलूशन",
        [Language.Marathi]: "?????",
    },
    homeS3Tab4C: {
        [Language.English]:
            "Solutions made to fit your specific needs, precisely. We are the experts in Solar Rooftop Solutions, which equip us to always bring the best in class products for your needs.",
        [Language.Hindi]:
            "आपकी विशिष्ट आवश्यकताओं को पूरा करने के लिए लाये गये सटीक सलूशन। हम सोलर रूफटॉप सलूशन के एक्सपर्ट हैं, जो हमें हमेशा आपकी जरूरतों के लिए श्रेणी में सर्वश्रेष्ठ उत्पाद लाने के लिए तैयार करते हैं।",
        [Language.Marathi]: "?????",
    },
    homeS3Tab4BT: {
        [Language.English]: "Explore Solar",
        [Language.Hindi]: "सोलर देखें",
        [Language.Marathi]: "?????",
    },
    homeS3Tab5H: {
        [Language.English]: "Other Accessories",
        [Language.Hindi]: "सहायक उपकरण",
        [Language.Marathi]: "?????",
    },
    homeS3Tab5HC1: {
        [Language.English]: "Energy Solutions",
        [Language.Hindi]: "ऊर्जा समाधान",
        [Language.Marathi]: "?????",
    },
    homeS3Tab5HC2: {
        [Language.English]: "Other Accessories",
        [Language.Hindi]: "सहायक उपकरण",
        [Language.Marathi]: "?????",
    },
    homeS3Tab5C: {
        [Language.English]: "Explore accessories which perfectly compliment your products, with our curated range of choices. Built with the finest materials, these accessories will last long.",
        [Language.Hindi]: "हमारे सहायक उपकरणों की श्रेणी आपके घर की ज़रूरतों को भली भाँति समझ कर उनको बेहतर बनाते हैं । यह उपकरण श्रेष्ठ सामग्री से बने हैं जो सालों साल आपका साथ देंगे।",
        [Language.Marathi]: "?????",
    },
    homeS3Tab5BT: {
        [Language.English]: "Explore Accesories",
        [Language.Hindi]: "उपकरण देखें",
        [Language.Marathi]: "?????",
    },
    homeS4H1T1: {
        [Language.English]: "We Are",
        [Language.Hindi]: "हम श्रेणी में",
        [Language.Marathi]: "?????",
    },
    homeS4H1T2: {
        [Language.English]: `<span class=\"lg-text-highlighted\">One of A Kind</span>`,
        [Language.Hindi]: `<span class=\"lg-text-highlighted\">सबसे अलग हैं</span>`,
        [Language.Marathi]: "?????",
    },
    homeS4T2: {
        [Language.English]: "With Livguard, you are always in trusted hands",
        [Language.Hindi]: "लिवगार्ड के साथ आप हमेशा भरोसेमंद हाथों में हैं",
        [Language.Marathi]: "?????",
    },
    homeS4T3: {
        [Language.English]:
            "In just 9 years, Livguard has become the fastest-growing Energy Storage Solutions brand. Our zeal to develop a complete and connected ecosystem of happy customers, committed partners, & the best quality every time has made us the choice of people nationwide.",
        [Language.Hindi]:
            "केवल 9 वर्षों में, लिवगार्ड सबसे तेज़ी से बढ़ने वाला ऊर्जा संग्रहण समाधान का ब्रांड बन गया है। हमारा पूर्ण रूप से बनाया गया संतुष्ट ग्राहकों और डीलरों का नेटवर्क हमे उनकी सबसे पहली पसंद बनाता है।",
        [Language.Marathi]: "?????",
    },
    homeS5H1T1: {
        [Language.English]: "Plan Your Power Needs",
        [Language.Hindi]: "अपनी ऊर्जा ज़रूरतों को जानें",
        [Language.Marathi]: "?????",
    },
    homeS5H1T2: {
        [Language.English]: `With Livguard <span class=\"lg-text-highlighted\">Power Planner</span>`,
        [Language.Hindi]: `हमारे <span class=\"lg-text-highlighted\">पावर प्लानर</span> के साथ`,
        [Language.Marathi]: "?????",
    },
    homeS5T2: {
        [Language.English]:
            "Take charge of your power needs with Livguard's load calculator- Power Planned. Your key to personalised power solutions. It helps you find the perfect inverter and inverter battery options for your home, ensuring uninterrupted power supply at all times. ",
        [Language.Hindi]:
            "आपकी ज़रूरत के अनुसार समाधान पायें, लिवगार्ड के लोड कैलकुलेटर- पावर प्लानर के साथ।यह आपको अपने घर के लिए सही इनवर्टर और इनवर्टर बैटरी विकल्प खोजने में मदद करता है, और हर समय बिना रुकावट ऊर्जा का प्रवाह सुनिश्चित करता है।",
        [Language.Marathi]: "?????",
    },
    homeS5T3: {
        [Language.English]: "Maximize your Power Potential in 3 easy steps!",
        [Language.Hindi]: "3 आसान चरणों में अपनी ऊर्जा ज़रूरतें निकालें",
        [Language.Marathi]: "?????",
    },
    homeS5Step1T1: {
        [Language.English]: "Step1 :",
        [Language.Hindi]: "चरण 1:",
        [Language.Marathi]: "?????",
    },
    homeS5Step1T2: {
        [Language.English]: "Choose your property type",
        [Language.Hindi]: "अपने घर का प्रकार चुनें",
        [Language.Marathi]: "?????",
    },
    homeS5Step2T1: {
        [Language.English]: "Step2 :",
        [Language.Hindi]: "चरण 2:",
        [Language.Marathi]: "?????",
    },
    homeS5Step2T2: {
        [Language.English]: "Add your preferred devices",
        [Language.Hindi]: "अपने पसंदीदा उपकरण जोड़ें",
        [Language.Marathi]: "?????",
    },
    homeS5Step3T1: {
        [Language.English]: "Step3 :",
        [Language.Hindi]: "चरण 3:",
        [Language.Marathi]: "?????",
    },
    homeS5Step3T2: {
        [Language.English]: "Set your required backup hours and average load consumption",
        [Language.Hindi]: "ज़रूरत अनुसार बैकअप के घंटे और औसत लोड खपत चुनें",
        [Language.Marathi]: "?????",
    },
    homeS5T5P1: {
        [Language.English]: "Let’s start your power planning",
        [Language.Hindi]: "अपनी पावर प्लानिंग शुरू करें",
        [Language.Marathi]: "?????",
    },
    homeS5T5P2: {
        [Language.English]: "Choose your property type",
        [Language.Hindi]: "अपने घर का प्रकार चुनें",
        [Language.Marathi]: "?????",
    },
    homeS5T6: {
        [Language.English]: "Let’s Plan",
        [Language.Hindi]: "नतीजा निकालें",
        [Language.Marathi]: "?????",
    },
    homeS6H1T1: {
        [Language.English]: `<span class=\"lg-text-highlighted\">Transforming Lives</span> With`,
        [Language.Hindi]: `ग्राहकों के <span class=\"lg-text-highlighted\">बदलते जीवन</span>`,
        [Language.Marathi]: "?????",
    },
    homeS6H1T2: {
        [Language.English]: "Energy Storage Solutions",
        [Language.Hindi]: "ऊर्जा संग्रहण समाधानों से",
        [Language.Marathi]: "?????",
    },
    homeS7H1T1: {
        [Language.English]: "Pioneers in Rooftop",
        [Language.Hindi]: "मार्गदर्शक",
        [Language.Marathi]: "?????",
    },
    homeS7H1T2: {
        [Language.English]: `<span class=\"lg-text-highlighted\">Solar Solutions</span>`,
        [Language.Hindi]: `<span class=\"lg-text-highlighted\">रूफटॉप सोलर सलूशन</span> में`,
        [Language.Marathi]: "?????",
    },
    homeS7T2: {
        [Language.English]: "Powered by passion and fuelled by innovation, we have established ourself as the experts in the Solar Energy Solutions sector.",
        [Language.Hindi]: "आधुनिकता से प्रेरित होकर और अपने जुनून को लेकर हमने ख़ुद को  सोलर सलूशन के क्षेत्र में एक्सपर्ट के रूप में स्थापित किया है।",
        [Language.Marathi]: "?????",
    },
    homeS7T3: {
        [Language.English]: "Three Reasons to Choose Livguard Solar",
        [Language.Hindi]: "तीन वजहें लिवगार्ड सोलर चुनने की",
        [Language.Marathi]: "?????",
    },
    homeS7T4: {
        [Language.English]: "Tap Into Solar",
        [Language.Hindi]: "सोलर ऊर्जा अनुभव करें",
        [Language.Marathi]: "?????",
    },
    homeS7S1T1: {
        [Language.English]: "Tailor-made\nEnd-to-End Solutions",
        [Language.Hindi]: "विशिष्ट रूप से\nबनाये गये समाधान",
        [Language.Marathi]: "?????",
    },
    homeS7S1T2: {
        [Language.English]: "Through our service experts and tools, we make sure that our solutions always fit your exact needs.",
        [Language.Hindi]: "हमारे सर्विस एक्सपर्ट और उपकरणों के माध्यम से, हम यह सुनिश्चित करते हैं कि हमारे समाधान हमेशा आपकी सटीक आवश्यकताओं को पूरा करें।",
        [Language.Marathi]: "?????",
    },
    homeS7S2T1: {
        [Language.English]: "One-Click\nService Support",
        [Language.Hindi]: "एक-क्लिक\nसमर्थन",
        [Language.Marathi]: "?????",
    },
    homeS7S2T2: {
        [Language.English]: "With LivMonitor 360, we are a one-click away customer support service (Pan India) for you to get resolutions quickly and effortlessly.",
        [Language.Hindi]: "लिवमोनिटर 360 के साथ, हम देश भर में आपकी सअमस्याओं का समाधान करने के लिए एक बस क्लिक दूर हैं।",
        [Language.Marathi]: "?????",
    },
    homeS7S3T1: {
        [Language.English]: "Long-Lasting\nProducts",
        [Language.Hindi]: "लंबी अवधि\nवाले उत्पाद",
        [Language.Marathi]: "?????",
    },
    homeS7S3T2: {
        [Language.English]: "We offer 25 years of panel warranty & a warranty of 7 years on inverter batteries for a longer, more durable life for solar solutions for you.",
        [Language.Hindi]: "हम ज़्यादा लंबे समय तक चलने वाले उत्पादों के लिए आपको 25 वर्षों की पैनल वारंटी और 7 वर्षों की इनवर्टर बैटरी वारंटी देते हैं।",
        [Language.Marathi]: "?????",
    },
    homeS8H1T1: {
        [Language.English]: "Meet Our",
        [Language.Hindi]: "मिलिए हमारे",
        [Language.Marathi]: "?????",
    },
    homeS8H1T2: {
        [Language.English]: `<span class=\"lg-text-highlighted\">Leadership</span>`,
        [Language.Hindi]: `<span class=\"lg-text-highlighted\">मार्गदर्शकों</span> से`,
        [Language.Marathi]: "?????",
    },
    homeS8Slide1T1: {
        [Language.English]: "Mr. Rakesh Malhotra",
        [Language.Hindi]: "श्री. राकेश मल्होत्रा",
        [Language.Marathi]: "?????",
    },
    homeS8Slide1T2: {
        [Language.English]: "(Founder & Mentor)",
        [Language.Hindi]: "(संस्थापक और संरक्षक)",
        [Language.Marathi]: "?????",
    },
    homeS8Slide1T3: {
        [Language.English]:
            "A leader, a mentor, a visionary, and an overall driving force, Mr. Rakesh Malhotra's exposure to the industry, his passion and his spirit to bring new and innovative ideas to life continues to motivate many other entrepreneurs.",
        [Language.Hindi]:
            "एक मार्गदर्शक , एक उपदेशक, एक दूरदर्शी, और एक समग्र प्रेरक शक्ति, श्री राकेश मल्होत्रा ​​​​का उद्योग के संपर्क में, उनका जुनून और नए विचारों को जीवन में लाने की उनकी भावना कई अन्य उद्यमियों को प्रेरित करती रही है।",
        [Language.Marathi]: "?????",
    },
    homeS8Slide2T1: {
        [Language.English]: "Mr. Navneet Kapoor",
        [Language.Hindi]: "श्री नवनीत कपूर",
        [Language.Marathi]: "?????",
    },
    homeS8Slide2T2: {
        [Language.English]: "(Co-founder & Chairman)",
        [Language.Hindi]: "(सह-संस्थापक और अध्यक्ष)",
        [Language.Marathi]: "?????",
    },
    homeS8Slide2T3: {
        [Language.English]:
            "One of the main pillars of the SAR Group and a hallmark of true entrepreneurship, Mr. Navneet Kapoor has been among the key forces behind Livguard through his expertise and belief that a successful business thrives when outstanding service is coupled with industry expertise and innovation.",
        [Language.Hindi]:
            "SAR ग्रुप के मुख्य स्तंभों में से एक और सच्चे उद्यमिता की पहचान, श्री नवनीत कपूर अपनी विशेषज्ञता और विश्वास के माध्यम से लिवगार्ड की प्रमुख ताकतों में से एक रहे हैं। उनका मानना है कि एक सफल व्यवसाय तब फलता-फूलता है जब उद्योग विशेषज्ञता के साथ उत्कृष्ट सर्विस मिलती है।",
        [Language.Marathi]: "?????",
    },
    homeS8Slide3T1: {
        [Language.English]: "Mr. Gurpreet Bhatia",
        [Language.Hindi]: "श्री गुरप्रीत भाटिया",
        [Language.Marathi]: "?????",
    },
    homeS8Slide3T2: {
        [Language.English]: "(CEO)",
        [Language.Hindi]: "(सीईओ)",
        [Language.Marathi]: "?????",
    },
    homeS8Slide3T3: {
        [Language.English]:
            "A dynamic leader with a formidable experience of over 25 years in B2B & B2C channels coupled with global experience in marketing, sales, and strategy. Mr. Gurpreet Bhatia is an impeccable example of someone who has created a unique career trajectory.",
        [Language.Hindi]:
            "मार्केटिंग, सेल्स और रणनीति में वैश्विक अनुभव के साथ बी2बी और बी2सी चैनलों में 25 से अधिक वर्षों के अनुभव के साथ एक मार्गदर्शकों। श्री गुरप्रीत भाटिया एक उदाहरण हैं, जिसने एक अद्वितीय करियर मार्ग बनाया है।",
        [Language.Marathi]: "?????",
    },
    homeS8Slide4T1: {
        [Language.English]: "Mr. Alankar Mittal",
        [Language.Hindi]: "श्री अलंकार मित्तल",
        [Language.Marathi]: "?????",
    },
    homeS8Slide4T2: {
        [Language.English]: "(Executive VP)",
        [Language.Hindi]: "(एग्जीक्यूटिव वी पी)",
        [Language.Marathi]: "?????",
    },
    homeS8Slide4T3: {
        [Language.English]:
            "Extremely committed and iron-willed, Mr. Alankar Mittal believes leadership is not about a title or a designation. It is about impact, influence, and inspiration. His massive experience of over 20 years continues to be a driving force for many.",
        [Language.Hindi]:
            "अत्यधिक प्रतिबद्ध और मज़बूत इच्छाशक्ति वाले श्री अलंकार मित्तल का मानना ​​है कि नेतृत्व किसी उपाधि या पदनाम के बारे में नहीं है, यह प्रभाव और प्रेरणा के बारे में है। 20 से अधिक वर्षों का उनका व्यापक अनुभव कई लोगों के लिए प्रेरक शक्ति बना हुआ है।",
        [Language.Marathi]: "?????",
    },
    homeS9H1T1: {
        [Language.English]: "Frequently Asked",
        [Language.Hindi]: "अक्सर पूछे जाने",
        [Language.Marathi]: "?????",
    },
    homeS9H1T2: {
        [Language.English]: `<span class=\"lg-text-highlighted\">Questions</span>`,
        [Language.Hindi]: `वाले <span class=\"lg-text-highlighted\"> सवाल</span>`,
        [Language.Marathi]: "?????",
    },
    homeS9Q1Q: {
        [Language.English]: "Which inverter battery is best for my use?",
        [Language.Hindi]: "मेरे उपयोग के लिए कौन सी इन्वर्टर बैटरी सबसे अच्छी है?",
        [Language.Marathi]: "?????",
    },
    homeS9Q1A: {
        [Language.English]: `Livguard's <a href="/load-calculator" class="tw-underline">Power Planner</a>, a Load Calculator tool helps you find the best inverter battery for your energy needs. Trust Livguard for superior performance and durability.`,
        [Language.Hindi]: `लिवगार्ड का <a href="/load-calculator" class="tw-underline">पावर प्लानर</a>, एक लोड कैलकुलेटर टूल आपको आपकी ऊर्जा आवश्यकताओं के लिए सबसे अच्छी इन्वर्टर बैटरी ढूंढने में मदद करता है। उत्कृष्ट प्रदर्शन और लंबे जीवन के लिए लिवगार्ड पर भरोसा करें।`,
        [Language.Marathi]: "?????",
    },
    homeS9Q2Q: {
        [Language.English]: "How to connect inverter to battery ?",
        [Language.Hindi]: " इनवर्टर को बैटरी से कैसे कनेक्ट करें?",
        [Language.Marathi]: "?????",
    },
    homeS9Q2A: {
        [Language.English]: `Connecting an inverter to a battery is a simple process of ensuring compatibility, connecting the cables, and testing. <a href="/category/batteries" class="tw-underline">Livguard Inverter Batteries</a> are designed for seamless compatibility and superior performance, ensuring reliable and uninterrupted power supply for your home or office.`,
        [Language.Hindi]: `इनवर्टर को बैटरी से कनेक्ट करना एक सरल प्रक्रिया है जिसमें संगतता की सुनिश्चितता, केबल कनेक्शन और टेस्टिंग शामिल होती है। <a href="/category/batteries" class="tw-underline">लिवगार्ड इन्वर्टर बैटरी</a> सुविधाजनक संगतता और बेहतर प्रदर्शन के लिए डिज़ाइन की गई हैं, जो आपके घर या ऑफिस के लिए विश्वसनीय और अविराम बिजली आपूर्ति सुनिश्चित करती हैं।`,
        [Language.Marathi]: "?????",
    },
    homeS9Q3Q: {
        [Language.English]: "Which inverter is best for home?",
        [Language.Hindi]: "कौन सा इन्वर्टर घर के लिए सबसे अच्छा है?",
        [Language.Marathi]: "?????",
    },
    homeS9Q3A: {
        [Language.English]: `When it comes to selecting the best inverter for your home, Livguard Inverter is the top choice. Use our <a href="/load-calculator" class="tw-underline">Power Planner</a>, your personal load calculator to find the right inverter for you.`,
        [Language.Hindi]: `जब आपके घर के लिए सर्वश्रेष्ठ इन्वर्टर चुनने की बात आती है, तो लिवगार्ड इन्वर्टर शीर्ष विकल्प है। आपके लिए सही इन्वर्टर खोजने के लिए हमारे <a href="/load-calculator" class="tw-underline">पावर प्लानर</a>, आपके व्यक्तिगत लोड कैलकुलेटर का उपयोग करें।`,
        [Language.Marathi]: "?????",
    },
    homeS9Q4Q: {
        [Language.English]: "Are inverters for the home and the office different? ",
        [Language.Hindi]: "क्या घर और ऑफिस के लिए इनवर्टर अलग-अलग हैं?",
        [Language.Marathi]: "?????",
    },
    homeS9Q4A: {
        [Language.English]: `Inverters are the same for both homes and offices, however, their capacities differ based on power needs & backup required. Whether you need an inverter for your home or business, Livguard has a variety of <a href="/category/inverters" class="tw-underline">quality and durable options</a> to choose from.`,
        [Language.Hindi]: `इन्वर्टर घरों और कार्यालयों दोनों के लिए समान हैं, हालांकि, बिजली की जरूरतों और आवश्यक बैकअप के आधार पर उनकी क्षमता भिन्न होती है। चाहे आपको अपने घर या व्यवसाय के लिए इन्वर्टर की आवश्यकता हो, लिवगार्ड के पास चुनने के लिए कई प्रकार के <a href="/category/inverters" class="tw-underline">विकल्प</a> हैं।`,
        [Language.Marathi]: "?????",
    },
    homeS9Q5Q: {
        [Language.English]: "How does the Power Planner work?",
        [Language.Hindi]: "मेरे उपयोग के लिए कौन सी इन्वर्टर बैटरी सबसे अच्छी है?",
        [Language.Marathi]: "?????",
    },
    homeS9Q5A: {
        [Language.English]: `The <a href="/load-calculator" class="tw-underline">Livguard Power Planner</a> is a personalised Load Calculator that suggests you the best Livguard Inverter and Inverter Battery based on devices you choose, backup hours needed, and average power use. It guarantees reliable power backup solution for your home.`,
        [Language.Hindi]: `<a href="/load-calculator" class="tw-underline">लिवगार्ड का पावर प्लानर</a>, एक लोड कैलकुलेटर टूल आपको आपकी ऊर्जा आवश्यकताओं के लिए सबसे अच्छी इन्वर्टर बैटरी ढूंढने में मदद करता है। उत्कृष्ट प्रदर्शन और लंबे जीवन के लिए लिवगार्ड पर भरोसा करें।`,
        [Language.Marathi]: "?????",
    },
    homeS9T2P1: {
        [Language.English]: "Got questions on your mind?",
        [Language.Hindi]: "क्या आपके मन में कुछ सवाल हैं?",
        [Language.Marathi]: "?????",
    },
    homeS9T2P2: {
        [Language.English]: "Find your answers here",
        [Language.Hindi]: "अपने सभी जवाब यहाँ पाइए",
        [Language.Marathi]: "?????",
    },
    homeS9T3P1: {
        [Language.English]: "Looking for service resolution?",
        [Language.Hindi]: "सर्विस समाधान की खोज में?",
        [Language.Marathi]: "?????",
    },
    homeS9T3P2: {
        [Language.English]: "Contact us at",
        [Language.Hindi]: "हम सप्ताह के सभी दिन सुबह 8 बजे से रात 8 बजे के बीच",
        [Language.Marathi]: "?????",
    },
    homeS9T3P3: {
        [Language.English]: "+91 18001025551",
        [Language.Hindi]: "+91 18001025551",
        [Language.Marathi]: "?????",
    },
    homeS9T3P4: {
        [Language.English]: "at any day of the week between 8 am to 8 pm, and our team will resolve it within 48 hours!",
        [Language.Hindi]: "पर उपलब्ध हैं।हम आपकी समस्या का समाधान 48 घंटों के अंदर करेंगे!",
        [Language.Marathi]: "?????",
    },
    homeS10H1T1: {
        [Language.English]: "We Are",
        [Language.Hindi]: "हम हर",
        [Language.Marathi]: "?????",
    },
    homeS10H1T2: {
        [Language.English]: `<span class=\"lg-text-highlighted\">Everywhere!</span>`,
        [Language.Hindi]: `<span class=\"lg-text-highlighted\">जगह हैं!</span>`,
        [Language.Marathi]: "?????",
    },
    homeS10T2: {
        [Language.English]: "Available Across 21000+ Pincodes",
        [Language.Hindi]: "21000+ पिन कोड में उपलब्ध",
        [Language.Marathi]: "?????",
    },
    homeS10T3: {
        [Language.English]: "Find My Dealer",
        [Language.Hindi]: "नज़दीकी डीलर खोजें",
        [Language.Marathi]: "?????",
    },
    homeS11H1T1: {
        [Language.English]: "Shower Some Love",
        [Language.Hindi]: "प्यार बरसाएं हमारे",
        [Language.Marathi]: "?????",
    },
    homeS11H1T2: {
        [Language.English]: `On Our <span class=\"lg-text-highlighted\">Social Handles</span>`,
        [Language.Hindi]: `<span class=\"lg-text-highlighted\">सोशल हैंडल</span> पर!`,
        [Language.Marathi]: "?????",
    },
    homeS11T2: {
        [Language.English]: "Find Us On",
        [Language.Hindi]: "हमें यहाँ तलाशें",
        [Language.Marathi]: "?????",
    },
    homeS12H1T1: {
        [Language.English]: `Powerful <span class=\"lg-text-highlighted\">Purpose</span>`,
        [Language.Hindi]: `शक्तिशाली <span class=\"lg-text-highlighted\">उद्देश्य</span>`,
        [Language.Marathi]: "?????",
    },
    homeS12H1T2: {
        [Language.English]: "Powerful Impact",
        [Language.Hindi]: "शक्तिशाली प्रभाव",
        [Language.Marathi]: "?????",
    },
    homeS12T2: {
        [Language.English]:
            "Livguard, through its Corporate Social Responsibility, fulfills its commitment towards the community. We persistently make efforts to bring an impact on the lives of people around us with significant actions in the fields of",
        [Language.Hindi]:
            "लिवगार्ड, अपने कॉर्पोरेट सामाजिक उत्तरदायित्व के माध्यम से, समुदाय के प्रति अपनी ज़िम्मेदारियों को पूरा करता है। हम लगातार अपने आसपास के लोगों के जीवन पर प्रभाव लाने के लिए महत्वपूर्ण कार्यों के साथ प्रयास करते हैं, निम्नलिखित क्षेत्रों में",
        [Language.Marathi]: "?????",
    },
    homeS12T3P1: {
        [Language.English]: "Education Promotion",
        [Language.Hindi]: "शिक्षा क्षेत्र",
        [Language.Marathi]: "?????",
    },
    homeS12T3P2: {
        [Language.English]: "Healthcare Promotion",
        [Language.Hindi]: "स्वास्थ्य क्षेत्र",
        [Language.Marathi]: "?????",
    },
    homeS12T3P3: {
        [Language.English]: "Livelihood Promotion",
        [Language.Hindi]: "आजीविका क्षेत्र",
        [Language.Marathi]: "?????",
    },
    homeS12T3P4: {
        [Language.English]: "Ensuring Environmental Stability",
        [Language.Hindi]: "पर्यावरणीय स्थिरता क्षेत्र",
        [Language.Marathi]: "?????",
    },
    homeS12T4: {
        [Language.English]: "Know More",
        [Language.Hindi]: "अधिक जानिए",
        [Language.Marathi]: "?????",
    },

    landingPage1S1T1: {
        [Language.English]: `Empowering India With <br /> Unlimited Energy`,
        [Language.Hindi]: `सशक्त भारत के लिए <br /> असीमित ऊर्जा`,
        [Language.Marathi]: "?????",
    },
    landingPage1S1T2: {
        [Language.English]: "Transition into a world of Futuristic Products backed by Unmatched Quality",
        [Language.Hindi]: "बेजोड़ गुणों से बने आधुनिक उपकरणों का अनुभव करें ",
        [Language.Marathi]: "?????",
    },
    landingPage1S1T3: {
        [Language.English]: "Connect Now",
        [Language.Hindi]: "संपर्क करें",
        [Language.Marathi]: "?????",
    },

    landingPage1S3HT1: {
        [Language.English]: "Transforming Energy Experiences",
        [Language.Hindi]: "हिस्सा बनिये",
        [Language.Marathi]: "?????",
    },
    landingPage1S3HT2: {
        [Language.English]: `With <span class="lg-text-highlighted"> Limitless Energy</span>`,
        [Language.Hindi]: `<span class="lg-text-highlighted">असीमित ऊर्जा</span> के अनुभव का`,
        [Language.Marathi]: "?????",
    },
    landingPage1S3Slide1Title: {
        [Language.English]: "Futuristic Products",
        [Language.Hindi]: "आधुनिक उत्पाद",
        [Language.Marathi]: "?????",
    },
    landingPage1S3Slide1Body: {
        [Language.English]: "At Livguard, we strive to stay up to date with the changing needs in the energy storage solution sector and adapt proactively to meet those needs effectively.",
        [Language.Hindi]: "हम ऊर्जा संग्रहण समाधान क्षेत्र में बदलती जरूरतों के साथ अद्यतित रहने का प्रयास करते हैं और उन जरूरतों को प्रभावित ढंग से पूरा करने के लिए सक्रिय रूप से तत्पर रहते हैं।",
        [Language.Marathi]: "?????",
    },
    landingPage1S3Slide2Title: {
        [Language.English]: "End-to-end Energy Storage Solutions",
        [Language.Hindi]: "हर ज़रूरत के लिए समाधान",
        [Language.Marathi]: "?????",
    },
    landingPage1S3Slide2Body: {
        [Language.English]: "Whether home solutions or mobility solutions, Livguard offers a complete range of energy solutions that meet your needs with outstanding performance.",
        [Language.Hindi]: "घर संबंधित हो या वाहन संबंधित, लिवगार्ड के साथ आपको अपनी हर ज़रूरत के लिए उत्पाद मिलेंगे, जो आपकी उम्मीदों पर खड़े उतरेंगे।",
        [Language.Marathi]: "?????",
    },
    landingPage1S3Slide3Title: {
        [Language.English]: "Customer Centric",
        [Language.Hindi]: "सबसे पहले ग्राहक",
        [Language.Marathi]: "?????",
    },
    landingPage1S3Slide3Body: {
        [Language.English]:
            "With our well-rooted service network of over 40 service centers and availability of products across 21000+ pin codes, we are always ready to serve you with your problems as and when you need us.",
        [Language.Hindi]: "21000 पिन कोड में उपस्थित हमारे उत्पाद और सर्विस केंद्रों के साथ हम हमेशा आपकी समस्याओं को मिटाने के लिए तैयार रहते हैं।",
        [Language.Marathi]: "?????",
    },
    landingPage1S3BT: {
        [Language.English]: "Explore Now",
        [Language.Hindi]: "पता करें",
        [Language.Marathi]: "?????",
    },

    landingPageS4HT1: {
        [Language.English]: "Quality Meets",
        [Language.Hindi]: `गुणवत्ता और <span class="lg-text-highlighted">विशेषज्ञता</span>`,
        [Language.Marathi]: "?????",
    },
    landingPageS4HT2: {
        [Language.English]: `<span class="lg-text-highlighted">Expertise</span>`,
        [Language.Hindi]: "का मेल",
        [Language.Marathi]: "?????",
    },
    landingPageS4Box1T1: {
        [Language.English]: "21000+",
        [Language.Hindi]: "21000+",
        [Language.Marathi]: "?????",
    },
    landingPageS4Box1T2: {
        [Language.English]: "Pincodes Served",
        [Language.Hindi]: "पिन कोड में उपलब्ध",
        [Language.Marathi]: "?????",
    },
    landingPageS4Box2T1: {
        [Language.English]: "40+",
        [Language.Hindi]: "40+",
        [Language.Marathi]: "?????",
    },
    landingPageS4Box2T2: {
        [Language.English]: "Service Centres",
        [Language.Hindi]: "सर्विस केंद्र",
        [Language.Marathi]: "?????",
    },
    landingPageS4Box3T1: {
        [Language.English]: "4000+",
        [Language.Hindi]: "4000+",
        [Language.Marathi]: "?????",
    },
    landingPageS4Box3T2: {
        [Language.English]: "Dealers & Distributors",
        [Language.Hindi]: "डीलर और वितरक",
        [Language.Marathi]: "?????",
    },
    landingPageS4Box4T1: {
        [Language.English]: "1 Cr+",
        [Language.Hindi]: "1 Cr+",
        [Language.Marathi]: "?????",
    },
    landingPageS4Box4T2: {
        [Language.English]: "Happy Customers",
        [Language.Hindi]: "सुखी ग्राहक",
        [Language.Marathi]: "?????",
    },
    landingPage2S1T1: {
        [Language.English]: `Go Limitless with <br /> Best in Class Products`,
        [Language.Hindi]: `उत्तमता जो आपको <br /> असीमित बनाये`,
        [Language.Marathi]: "?????",
    },
    landingPage2S1T2: {
        [Language.English]: "Made with experience and manufactured till perfection",
        [Language.Hindi]: "अपनी कला में अनुभव रखने वाले माहिर लोगों द्वारा बनाये गये उत्पाद",
        [Language.Marathi]: "?????",
    },
    landingPage2S1T3: {
        [Language.English]: "Connect Now",
        [Language.Hindi]: "संपर्क करें",
        [Language.Marathi]: "?????",
    },
    landingPage2S4HT1: {
        [Language.English]: "Explore Unlimited Energy",
        [Language.Hindi]: "इनवर्टर और बैटरी की",
        [Language.Marathi]: "?????",
    },
    landingPage2S4HT2: {
        [Language.English]: `With Our Top <span class="[@media(max-width:1024px)]:lg-text-highlighted lg:lg-text-title1">Jodis</span>`,
        [Language.Hindi]: `बेहतरीन <span class="[@media(max-width:1024px)]:lg-text-highlighted lg:lg-text-title1">जोड़ियाँ</span> आपके लिए`,
        [Language.Marathi]: "?????",
    },
    landingPage2S4CTABT: {
        [Language.English]: "Know More",
        [Language.Hindi]: "अधिक जानिए",
        [Language.Marathi]: "?????",
    },

    landingPage2S4KeySpecificationTitle: {
        [Language.English]: "Key Specifications of The Jodi",
        [Language.Hindi]: "जोड़ी के मुख्य स्पेसिफिकेशन",
        [Language.Marathi]: "?????",
    },
    landingPage2S4Specification1Title: {
        [Language.English]: "Warranty",
        [Language.Hindi]: "गारंटी",
        [Language.Marathi]: "?????",
    },
    landingPage2S4Specification2Title: {
        [Language.English]: "Rating",
        [Language.Hindi]: "रेटिंग",
        [Language.Marathi]: "?????",
    },
    landingPage2S4Specification3Title: {
        [Language.English]: "Capacity",
        [Language.Hindi]: "कैपेसिटी",
        [Language.Marathi]: "?????",
    },
    landingPage2S4Specification4Title: {
        [Language.English]: "Techonolgy ",
        [Language.Hindi]: "तकनीकी",
        [Language.Marathi]: "?????",
    },

    landingPage2S4J1Title: {
        [Language.English]: "The Urban Jodi",
        [Language.Hindi]: "अर्बन जोड़ी",
        [Language.Marathi]: "?????",
    },
    landingPage2S4J1Description: {
        [Language.English]:
            "A perfect Jodi to match the needs of your urban lifestyle, efficiently. With pure sine wave output and smart AI charging, this jodi can go on for hours and take heavy loads of appliances.",
        [Language.Hindi]:
            "आपकी शहरी जीवन शैली की जरूरतों को कुशलता से पूरा करने के लिए एक आदर्श जोड़ी। शुद्ध साइन वेव आउटपुट और स्मार्ट एआई चार्जिंग के साथ, यह जोड़ी घंटों तक चल सकती है और उपकरणों का भारी लोड उठा सकती है।",
        [Language.Marathi]: "?????",
    },
    landingPage2S4J1Specification1Content: {
        [Language.English]: "60 Months",
        [Language.Hindi]: "60 महीने",
        [Language.Marathi]: "?????",
    },
    landingPage2S4J1Specification2Content: {
        [Language.English]: "3500 VA",
        [Language.Hindi]: "3500 वीए",
        [Language.Marathi]: "?????",
    },
    landingPage2S4J1Specification3Content: {
        [Language.English]: "150 Ah",
        [Language.Hindi]: "150 एएच",
        [Language.Marathi]: "?????",
    },
    landingPage2S4J1Specification4Content: {
        [Language.English]: "Sine Wave",
        [Language.Hindi]: "साइन तरंग",
        [Language.Marathi]: "?????",
    },
    landingPage2S4J2Title: {
        [Language.English]: "The Peace of Mind Jodi",
        [Language.Hindi]: "मन की शांति वाली जोड़ी",
        [Language.Marathi]: "?????",
    },
    landingPage2S4J2Description: {
        [Language.English]:
            "A Jodi that would assure your peace of mind with its long durability and high backup power. Precisely chosen battery paired with the sturdy inverter ensures a seamless flow of energy to meet your needs.",
        [Language.Hindi]:
            "एक जोड़ी जो अपने लंबे जीवन और उच्च बैकअप शक्ति के साथ आपके मन की शांति सुनिश्चित करेगी। मजबूत इनवर्टर के साथ सटीक रूप से चुनी गई बैटरी आपकी आवश्यकताओं को पूरा करने के लिए ऊर्जा का निर्बाध प्रवाह सुनिश्चित करती है।",
        [Language.Marathi]: "?????",
    },
    landingPage2S4J2Specification1Content: {
        [Language.English]: "60 Months",
        [Language.Hindi]: "60 महीने",
        [Language.Marathi]: "?????",
    },
    landingPage2S4J2Specification2Content: {
        [Language.English]: "1500 VA",
        [Language.Hindi]: "1500 वीए",
        [Language.Marathi]: "?????",
    },
    landingPage2S4J2Specification3Content: {
        [Language.English]: "200 Ah",
        [Language.Hindi]: "200 एएच",
        [Language.Marathi]: "?????",
    },
    landingPage2S4J2Specification4Content: {
        [Language.English]: "Sqaure Wave",
        [Language.Hindi]: "चौकोर तरंग",
        [Language.Marathi]: "?????",
    },
    landingPage2S4J3Title: {
        [Language.English]: "The Super Life Jodi",
        [Language.Hindi]: "सुपर लाइफ जोड़ी",
        [Language.Marathi]: "?????",
    },
    landingPage2S4J3Description: {
        [Language.English]: "With a battery backed with the best-in-class warranty and a long-lasting inverter, this Jodi is just the right choice for your everyday energy requirements.",
        [Language.Hindi]: "बेस्ट-इन-क्लास वारंटी और लंबे समय तक चलने वाले इनवर्टर के साथ समर्थित बैटरी के साथ, यह कॉम्बो आपकी रोजमर्रा की ऊर्जा आवश्यकताओं के लिए बिल्कुल सही विकल्प है।",
        [Language.Marathi]: "?????",
    },
    landingPage2S4J3Specification1Content: {
        [Language.English]: "84 Months",
        [Language.Hindi]: "84 महीने",
        [Language.Marathi]: "?????",
    },
    landingPage2S4J3Specification2Content: {
        [Language.English]: "3500 VA",
        [Language.Hindi]: "3500 वीए",
        [Language.Marathi]: "?????",
    },
    landingPage2S4J3Specification3Content: {
        [Language.English]: "150 Ah",
        [Language.Hindi]: "150 एएच",
        [Language.Marathi]: "?????",
    },
    landingPage2S4J3Specification4Content: {
        [Language.English]: "Sine Wave",
        [Language.Hindi]: "साइन तरंग",
        [Language.Marathi]: "?????",
    },
    landingPage2S4J4Title: {
        [Language.English]: "The Hi-power Jodi",
        [Language.Hindi]: "हाई-पॉवर जोड़ी",
        [Language.Marathi]: "?????",
    },
    landingPage2S4J4Description: {
        [Language.English]:
            "The perfect Jodi to meet the backup requirements for long hours. Smart AI charging along with the pure sinewave output delivers a smooth and efficient energy flow with enhanced life.",
        [Language.Hindi]:
            "लंबे समय तक बैकअप आवश्यकताओं को पूरा करने के लिए एकदम सही जोड़ी। शुद्ध साइनवेव आउटपुट के साथ स्मार्ट एआई चार्जिंग बेहतर जीवन के साथ एक सहज और कुशल ऊर्जा प्रवाह प्रदान करता है।",
        [Language.Marathi]: "?????",
    },
    landingPage2S4J4Specification1Content: {
        [Language.English]: "72 Months",
        [Language.Hindi]: "72 महीने",
        [Language.Marathi]: "?????",
    },
    landingPage2S4J4Specification2Content: {
        [Language.English]: "800 VA",
        [Language.Hindi]: "800 वीए",
        [Language.Marathi]: "?????",
    },
    landingPage2S4J4Specification3Content: {
        [Language.English]: "260 Ah",
        [Language.Hindi]: "260 एएच",
        [Language.Marathi]: "?????",
    },
    landingPage2S4J4Specification4Content: {
        [Language.English]: "Sine Wave",
        [Language.Hindi]: "साइन तरंग",
        [Language.Marathi]: "?????",
    },

    landingPage2S5HT1: {
        [Language.English]: "Why",
        [Language.Hindi]: `<span class="lg-text-highlighted"> लिवगार्ड जोड़ी </span>`,
        [Language.Marathi]: "?????",
    },
    landingPage2S5HT2: {
        [Language.English]: `<span class="lg-text-highlighted">Livguard Jodi?</span>`,
        [Language.Hindi]: "बेहतर क्यों  है",
        [Language.Marathi]: "?????",
    },
    landingPage2S5LivH: {
        [Language.English]: "Livguard",
        [Language.Hindi]: "लिवगार्ड",
        [Language.Marathi]: "?????",
    },
    landingPage2S5T1: {
        [Language.English]: "AI Charing",
        [Language.Hindi]: "एआई चार्जिंग",
        [Language.Marathi]: "?????",
    },
    landingPage2S5T2: {
        [Language.English]: "3D Grid Technology",
        [Language.Hindi]: "3डी ग्रिड तकनीक",
        [Language.Marathi]: "?????",
    },
    landingPage2S5T3: {
        [Language.English]: "Longer Life",
        [Language.Hindi]: "लंबी अवधि",
        [Language.Marathi]: "?????",
    },
    landingPage2S5T4: {
        [Language.English]: "Better Battery Compatibility",
        [Language.Hindi]: "बेहतर बैटरी संगति",
        [Language.Marathi]: "?????",
    },
    landingPage2S5OBH: {
        [Language.English]: "Other Brand",
        [Language.Hindi]: "अन्य ब्रांड",
        [Language.Marathi]: "?????",
    },
    landingPage2S7HT1: {
        [Language.English]: "Explore our",
        [Language.Hindi]: "आपके लिए",
        [Language.Marathi]: "?????",
    },
    landingPage2S7HT2: {
        [Language.English]: `<span class="lg-text-highlighted">Star Products</span>`,
        [Language.Hindi]: `हमारे सबसे <span class="lg-text-highlighted">बेहतरीन उत्पाद</span>`,
        [Language.Marathi]: "?????",
    },
    landingPage2S7CTABT: {
        [Language.English]: "View product",
        [Language.Hindi]: "विस्तार से देखें",
        [Language.Marathi]: "?????",
    },

    landingPage3S1T1: {
        [Language.English]: "Smart & Strong Inverter and Battery Jodis",
        [Language.Hindi]: "स्मार्ट और दमदार इनवर्टर और बैटरी की जोड़ी",
        [Language.Marathi]: "?????",
    },
    landingPage3S1T2: {
        [Language.English]: "Empower your home with the perfect jodi to compliment your home needs",
        [Language.Hindi]: "अपने घर को सशक्त बनाएँ सही इनवर्टर और बैटरी की जोड़ी के साथ",
        [Language.Marathi]: "?????",
    },
    landingPage3S1T3: {
        [Language.English]: "Connect Now",
        [Language.Hindi]: "संपर्क करें",
        [Language.Marathi]: "?????",
    },
    landingPage3S3T1: {
        [Language.English]: "Enter Location,city or Pincode",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    landingPage3S3T2: {
        [Language.English]: "Use Current Location",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    landingPage3S3T3: {
        [Language.English]: "Find My Dealer",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },

    landingPage3S7HT1: {
        [Language.English]: `Tap Into <span class="lg-text-highlighted">Efficiency</span>`,
        [Language.Hindi]: "लिवगार्ड जोड़ी के साथ",
        [Language.Marathi]: "?????",
    },
    landingPage3S7HT2: {
        [Language.English]: "With Livguard Jodis",
        [Language.Hindi]: `<span class="lg-text-highlighted"> क्षमता </span> में निवेश करें`,
        [Language.Marathi]: "?????",
    },

    landingPage3S7Slide1Heading: {
        [Language.English]: "Effortless Compatibility",
        [Language.Hindi]: "सहज अनुकूलता",
        [Language.Marathi]: "?????",
    },
    landingPage3S7Slide1Content: {
        [Language.English]: "Livguard inverter and inverter battery jodis offer a seamless compatibility which combine together for an uninterrupted flow of energy.",
        [Language.Hindi]: "लिवगार्ड इनवर्टर और इनवर्टर बैटरी जोड़ी एक सहज अनुकूलता प्रदान करते हैं जो ऊर्जा के बिना रुकावट प्रवाह के लिए एक साथ जुड़ते हैं।",
        [Language.Marathi]: "?????",
    },
    landingPage3S7Slide2Heading: {
        [Language.English]: "Seamless Service",
        [Language.Hindi]: "निरंतर सर्विस",
        [Language.Marathi]: "?????",
    },
    landingPage3S7Slide2Content: {
        [Language.English]: "With Livguard Jodis at your home, experience the comfort of hassle-free servicing for both the products, whenever you need.",
        [Language.Hindi]: "अपने घर पर लिवगार्ड जोड़ी के साथ,इनवर्टर और इनवर्टर बैटरी के लिए आरामदायक सर्विसिंग का अनुभव करें ,जब  भी आपको आवश्यकता हो।",
        [Language.Marathi]: "?????",
    },
    landingPage3S7Slide3Heading: {
        [Language.English]: "Long Life",
        [Language.Hindi]: "लंबा जीवन",
        [Language.Marathi]: "?????",
    },
    landingPage3S7Slide3Content: {
        [Language.English]: "The perfect match of inverter and inverter battery in Livguard Jodis ensure a longer , more efficient life of the products for you.",
        [Language.Hindi]: "लिवगार्ड जोड़ी में इनवर्टर और इनवर्टर बैटरी का सही मेल आपके उत्पादों का लंबा, अधिक कुशल जीवन सुनिश्चित करता है।",
        [Language.Marathi]: "?????",
    },
    landingPage3S7BT: {
        [Language.English]: "Reach out to Us",
        [Language.Hindi]: "हमसे संपर्क करें",
        [Language.Marathi]: "?????",
    },

    //Category Batteries
    categoryBatteriesS1T1: {
        [Language.English]: "Strong Inverter Batteries",
        [Language.Hindi]: "स्ट्रॉंग इनवर्टर बैटरी",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS1T2: {
        [Language.English]: "For A Limitless Experience",
        [Language.Hindi]: "एक असीम अनुभव के लिए",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS1T3: {
        [Language.English]: "Inverter Batteries with a powerful backup, made to empower your home with limitless energy whenever you need",
        [Language.Hindi]: "दमदार बैकअप वाली इनवर्टर बैटरियां,जो आपकी जरूरतों के अनुसार, आपके घर को असीम ऊर्जा से सशक्त बनाने के लिए बनाई गई हैं",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS2HT1: {
        [Language.English]: "Strong Batteries That Are",
        [Language.Hindi]: "स्ट्रॉंग इनवर्टर बैटरी",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS2HT2: {
        [Language.English]: `<span class="lg-text-highlighted"> Meant To Last </span>`,
        [Language.Hindi]: `<span class="lg-text-highlighted">स्जो सालों साल चलें </span>`,
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS2Slide1Heading: {
        [Language.English]: "Futuristic Design",
        [Language.Hindi]: "आधुनिक बनावट",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS2Slide1Description: {
        [Language.English]:
            "Livguard Inverter Batteries are manufactured with PPC Plastic to avoid leakage and keeping in mind the customer’s needs to deliver the safest and aesthetic designs for you",
        [Language.Hindi]: "लिवगार्ड की इनवर्टर बैटरी पी पी सी प्लास्टिक से बनीं हैं, जो बैटरी को लीक होने से बचाती है  और ग्राहकों को हर बार सुंदर और सुरक्षित अनुभव देती हैं।",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS2Slide2Heading: {
        [Language.English]: "SuperTUFF 3D Grid",
        [Language.Hindi]: "सुपरटफ 3डी ग्रिड",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS2Slide2Description: {
        [Language.English]:
            "With the industry’s first Supertuff 3D Grid design paired with a double-sided pasting, Livguard Inverter Batteries hold negative active material 20% longer, resulting in a longer battery life",
        [Language.Hindi]: "उद्योग की सबसे पहली 3डी ग्रिड तकनीक और दो-तरफ़ पेस्टिंग से बनी लिवगार्ड इनवर्टर बैटरी नेगेटिव ऐक्टिव मटेरियल को 20% ज़्यादा रोकती है, जो बैटरी की अवधि भी बढ़ती है।",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS2Slide3Heading: {
        [Language.English]: "Assured Warranty",
        [Language.Hindi]: "सुनिश्चित वारंटी",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS2Slide3Description: {
        [Language.English]:
            "The best-in-class warranties across all ranges as well as low maintenance requirements, make the Livguard Inverter Batteries suitable for all customers, whatever their needs may be",
        [Language.Hindi]: "सभी श्रेणियों में सर्वश्रेष्ठ वारंटी के साथ-साथ कम देखभाल की आवश्यकताएं लिवगार्ड इनवर्टर बैटरी को सभी ग्राहकों के लिए उपयुक्त बनाती हैं, चाहे उनकी कोई भी आवश्यकता हो।",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS2Slide4Heading: {
        [Language.English]: "Non- Woven Gauntlet",
        [Language.Hindi]: "गैर-बुना गौंटलेट",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS3T1: {
        [Language.English]: "Get To Know",
        [Language.Hindi]: `<span class="lg-text-highlighted">हमारी बैटरी</span> को`,
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS3T2: {
        [Language.English]: `<span class="lg-text-highlighted">Our Batteries</span> In Detail`,
        [Language.Hindi]: "विस्तार से समझें",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS3R1C2: {
        [Language.English]: "Flat Plate",
        [Language.Hindi]: "फ्लैट प्लेट",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS3R1C3: {
        [Language.English]: "Tubular",
        [Language.Hindi]: "ट्यूबलर प्लेट",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS3R2C1: {
        [Language.English]: "Cycle Life",
        [Language.Hindi]: "साइकिल अवधि",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS3R2C2: {
        [Language.English]: "Longer",
        [Language.Hindi]: "लंबा",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS3R2C3: {
        [Language.English]: "Limited",
        [Language.Hindi]: "सीमित",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS3R3C1: {
        [Language.English]: "Usability",
        [Language.Hindi]: "उपयुक्तता",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS3R3C2: {
        [Language.English]: "Suitable for high power cut applications",
        [Language.Hindi]: "उच्च पावर कट अनुप्रयोगों के लिए उपयुक्त",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS3R3C3: {
        [Language.English]: "Suitable for shorter duration applications",
        [Language.Hindi]: "कम अवधि के अनुप्रयोगों के लिए उपयुक्त",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS3R4C1: {
        [Language.English]: "Economical",
        [Language.Hindi]: "किफ़ायती",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS3R4C2: {
        [Language.English]: "Relatively Lower",
        [Language.Hindi]: "अपेक्षाकृत कम",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS3R4C3: {
        [Language.English]: "Relatively Higher",
        [Language.Hindi]: "उच्चतर",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS3R5C1: {
        [Language.English]: "Maintenace",
        [Language.Hindi]: "देखभाल",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS3R5C2: {
        [Language.English]: "Lower",
        [Language.Hindi]: "कम",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS3R5C3: {
        [Language.English]: "Comparatively Higher",
        [Language.Hindi]: "तुलनात्मक रूप से अधिक",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS3R6C1: {
        [Language.English]: "Options",
        [Language.Hindi]: "विकल्प",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS3R6C2: {
        [Language.English]: "No further are options available",
        [Language.Hindi]: "आगे कोई विकल्प उपलब्ध नहीं है",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS3R6C3: {
        [Language.English]: "Options include ST/TT/STJ/STT",
        [Language.Hindi]: "विकल्पों में एसटी/टीटी/एसटीजे/एसटीटी शामिल हैं",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS2Slide4Description: {
        [Language.English]: "The premium high-quality gauntlet provides extra strength to the tubular plate which reduces tube bursting and offers extra backup with a longer battery life",
        [Language.Hindi]: "प्रीमियम उच्च-क्वालिटी वाला गौंटलेट ट्यूबलर प्लेट को अतिरिक्त ताकत प्रदान करता है जो ट्यूब को फटने से बचाता है और लंबी बैटरी लाइफ के साथ अतिरिक्त बैकअप प्रदान करता है",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS4HT1: {
        [Language.English]: `<span class="lg-text-highlighted">Our Suggestion</span>`,
        [Language.Hindi]: `<span class="lg-text-highlighted">हमारा सुझाव</span>`,
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS4HT2: {
        [Language.English]: "To Power Up Your Home",
        [Language.Hindi]: "आपके घर को रोशन करने के लिए",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS4Heading: {
        [Language.English]: "Select Battery Type",
        [Language.Hindi]: "बैटरी का टाइप चुनें",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS4BTFlat: {
        [Language.English]: "Flat Plate Battery",
        [Language.Hindi]: "फ्लैट प्लेट बैटरी",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS4BTTubular: {
        [Language.English]: "Tubular Battery",
        [Language.Hindi]: "ट्यूबुलर बैटरी",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS4SpecificationHeading: {
        [Language.English]: "Battery\nSpecifications",
        [Language.Hindi]: "बैटरी विवरण",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS4BT: {
        [Language.English]: "Explore Product",
        [Language.Hindi]: "विस्तार से देखें",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS4Slide1Heading: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS4Slide1Description: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS2Slide1KS1Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesSlide1KS1Description: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS2Slide1KS2Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesSlide1KS2Description: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS2Slide1KS3Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesSlide1KS3Description: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS2Slide1KS4Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesSlide1KS4Description: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS4Slide2Heading: {
        [Language.English]: "IT1584TT",
        [Language.Hindi]: "IT1584TT",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS4Slide2Description: {
        [Language.English]:
            "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
        [Language.Hindi]:
            "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS2Slide2KS1Title: {
        [Language.English]: "Warranty",
        [Language.Hindi]: "वारंटी",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesSlide2KS1Description: {
        [Language.English]: "60 + 24* Months",
        [Language.Hindi]: "60 + 24* महीने",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS2Slide2KS2Title: {
        [Language.English]: "Capacity",
        [Language.Hindi]: "क्षमता",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesSlide2KS2Description: {
        [Language.English]: "150 Ah",
        [Language.Hindi]: "150 Ah",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS2Slide2KS3Title: {
        [Language.English]: "3D Grid",
        [Language.Hindi]: "3D ग्रिड",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesSlide2KS3Description: {
        [Language.English]: "Longer Life",
        [Language.Hindi]: "लम्बी अवधी",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS2Slide2KS4Title: {
        [Language.English]: "Dimensions",
        [Language.Hindi]: "आयाम",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesSlide2KS4Description: {
        [Language.English]: "505 (L) X  188 (W) X 410 (H)",
        [Language.Hindi]: "505 (L) X  188 (W) X 410 (H)",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS4RelatedProductsHeading: {
        [Language.English]: "Related Products",
        [Language.Hindi]: "संबंधित उत्पाद",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS5HT1: {
        [Language.English]: "Side-by-Side Overview",
        [Language.Hindi]: "बैटरी साथ देखें",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS5F1Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS5F2Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS5F3Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS5F4Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS5F5Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS5F6Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS5Slide1Heading: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS5Slide2Heading: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS5Slide3Heading: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS6HT1: {
        [Language.English]: `Suggested <span class="lg-text-highlighted">Jodis </span>`,
        [Language.Hindi]: `सुझायी गई <span class="lg-text-highlighted"> जोड़ियाँ </span>`,
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS6Jodi1Title: {
        [Language.English]: "The Urban Jodi",
        [Language.Hindi]: "अर्बन जोड़ी",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS6Jodi2Title: {
        [Language.English]: "The Peace of Mind Jodi",
        [Language.Hindi]: "मन की शांति वाला जोड़ी",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS6Jodi3Title: {
        [Language.English]: "The Super Life Jodi",
        [Language.Hindi]: "सुपर लाइफ जोड़ी",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS6Jodi4Title: {
        [Language.English]: "The Hi-Power Jodi",
        [Language.Hindi]: "हाई-पॉवर जोड़ी",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS6JodiButtontext: {
        [Language.English]: "View Product",
        [Language.Hindi]: "अधिक जानिए",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS6Buttontext: {
        [Language.English]: "Enquire Now",
        [Language.Hindi]: "संपर्क करें",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS8HT1: {
        [Language.English]: "Choose The Best",
        [Language.Hindi]: "घर लायें रोशनी",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS8HT2: {
        [Language.English]: `<span class="lg-text-highlighted"> Inverter Battery </span> For You`,
        [Language.Hindi]: `उचित <span class="lg-text-highlighted"> इनवर्टर बैटरी </span> से`,
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS8Description: {
        [Language.English]:
            "Find the suitable pick of inverter that fulfils your requirements with efficiency. Use our Buying Guide to get to know in detail about how you can buy your inverter and our Product Catalogue for product specifications",
        [Language.Hindi]: "हमारे बाइंग गाइड और प्रोडक्ट कैटलॉग का उपयोग करके अपने लिए उपयुक्त इनवर्टर चुनें जो सहजता के साथ आपकी आवश्यकताओं को पूरा करें।",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS8B1T: {
        [Language.English]: "Buying Guide",
        [Language.Hindi]: "बाइंग गाइड",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS8B2T: {
        [Language.English]: "Download Catalog",
        [Language.Hindi]: "डाउनलोड कैटलॉग",
        [Language.Marathi]: "?????",
    },
    categoryBatteriesS8BT: {
        [Language.English]: "Let's Plan Your Power",
        [Language.Hindi]: "अपनी ऊर्जा को प्लान करें",
        [Language.Marathi]: "?????",
    },

    //Category Inverters
    categoryInvertersS1T1: {
        [Language.English]: "Smart Inverters",
        [Language.Hindi]: "स्मार्ट इनवर्टर",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS1T2: {
        [Language.English]: "For A Limitless Experience",
        [Language.Hindi]: "एक असीम अनुभव के लिए",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS1T3: {
        [Language.English]: "Inverters made with high-quality materials to ensure an unlimited flow of energy for you.",
        [Language.Hindi]: "आपके लिए ऊर्जा की असीमित प्रवाह सुनिश्चित करने के लिए उच्च कोटी की सामग्री से बने स्मार्ट इनवर्टर।",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS2HT1: {
        [Language.English]: "Empower Your Home",
        [Language.Hindi]: "अपने घर को करें सशक्त ",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS2HT2: {
        [Language.English]: `With <span class="lg-text-highlighted"> Livguard Inverters </span>`,
        [Language.Hindi]: `<span class="lg-text-highlighted"> लिवगार्ड इनवर्टर </span> के साथ`,
        [Language.Marathi]: "?????",
    },
    categoryInvertersS2Slide1Heading: {
        [Language.English]: "New Edge Design",
        [Language.Hindi]: "नए कोने वाले डिज़ाइन",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS2Slide1Description: {
        [Language.English]:
            "Made with a team of experienced and skilled professionals, Livguard Inverters offer the best-in-class designs which complement your home along with a LED Display which indicates the current state of your inverter.",
        [Language.Hindi]:
            "अनुभवी और कुशल पेशेवरों की एक टीम के साथ बनाए गए लिवगार्ड इनवर्टर सर्वश्रेष्ठ बनावट प्रदान करते हैं। इनमें लगी एलईडी डिस्प्ले के साथ आप अपने इनवर्टर की वर्तमान स्थिति को देख सकते हैं।",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS2Slide2Heading: {
        [Language.English]: "AI Charging",
        [Language.Hindi]: "एआई चार्जिंग",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS2Slide2Description: {
        [Language.English]:
            "The AI Charging in our inverters automatically reads the battery’s charging voltage, backup & charge percentage and charges according to the battery needs. It also prevents overcharging for enhanced battery life.",
        [Language.Hindi]:
            "हमारे इनवर्टर में एआई चार्जिंग स्वचालित रूप से बैटरी की चार्जिंग वोल्टेज, बैकअप और चार्ज प्रतिशत को पढ़ती है और बैटरी की जरूरतों के अनुसार चार्ज करती है। यह बैटरी की लाइफ बढ़ाने के लिए ज़रूरत से ज़्यादा चार्जिंग को भी रोकती है।",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS2Slide3Heading: {
        [Language.English]: "Assured Warranty",
        [Language.Hindi]: "सुनिश्चित वारंटी",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS2Slide3Description: {
        [Language.English]:
            "With Livguard inverters, you can enjoy peace with the long warranty of 3 years. This flat warranty allows you to stay worry-free in case of any damages. Just reach out to us and we will take care of it for you.",
        [Language.Hindi]:
            "लिवगार्ड इनवर्टर के साथ, आप 3 साल की लंबी वारंटी के साथ शांति का आनंद ले सकते हैं। यह फ्लैट वारंटी आपको किसी भी नुकसान के मामले में चिंता मुक्त रहने के लिए सशक्त करती है। बस हमसे संपर्क करें और हम आपकी समस्या का समाधान करेंगे।",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS2Slide4Heading: {
        [Language.English]: "Dual Sensor Thermal Protect",
        [Language.Hindi]: "डुअल सेंसर थर्मल प्रोटेक्ट",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS2Slide4Description: {
        [Language.English]: "With Industry’s first thermal sensor for transformers, the sensor prevents the transformer from overheating and catching fire and enhances the life of your inverter.",
        [Language.Hindi]: "ट्रांसफॉर्मर के लिए उद्योग के पहले थर्मल सेंसर ट्रांसफॉर्मर को ज़्यादा गरम होने और आग पकड़ने से रोकता है और आपके इनवर्टर के जीवन को बढ़ाता है।",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS3T1: {
        [Language.English]: `<span class="lg-text-highlighted">Choose Your Inverter</span>`,
        [Language.Hindi]: `<span class="lg-text-highlighted">अपना इनवर्टर चुनें</span>`,
        [Language.Marathi]: "?????",
    },
    categoryInvertersS3T2: {
        [Language.English]: "Based On Your Needs",
        [Language.Hindi]: "अपनी ज़रुरत अनुसार",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS3R1C2: {
        [Language.English]: "Sine Wave",
        [Language.Hindi]: "साइन वेव",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS3R1C3: {
        [Language.English]: "Square Wave",
        [Language.Hindi]: "स्क्वायर वेव",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS3R2C1: {
        [Language.English]: "Technology",
        [Language.Hindi]: "तकनीक",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS3R2C2: {
        [Language.English]: "Advanced + Ai Technology",
        [Language.Hindi]: " एडवांस + एआई तकनीक",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS3R2C3: {
        [Language.English]: "Ai Technology",
        [Language.Hindi]: "एआई तकनीक",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS3R3C1: {
        [Language.English]: "Device Support",
        [Language.Hindi]: "उपकरण समर्थन",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS3R3C2: {
        [Language.English]: "Supports sensitive appliances like Computers, Laptops, Refrigerators, Ovens",
        [Language.Hindi]: "कंप्यूटर, लैपटॉप, फ्रिज, ओवन जैसे उपकरणों का समर्थन करता है।",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS3R3C3: {
        [Language.English]: "Supports basic appliances like fans, lights, motors",
        [Language.Hindi]: "पंखे, रोशनी, मोटर जैसे उपकरणों का समर्थन करता है।",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS3R4C1: {
        [Language.English]: "Safety",
        [Language.Hindi]: "सुरक्षा",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS3R4C2: {
        [Language.English]: "High safety of appliances",
        [Language.Hindi]: "उपकरणों की उच्च सुरक्षा",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS3R4C3: {
        [Language.English]: "Moderate safety of appliances",
        [Language.Hindi]: "उपकरणों की सीमित सुरक्षा।",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS3R5C1: {
        [Language.English]: "Price",
        [Language.Hindi]: "कीमत",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS3R5C2: {
        [Language.English]: "Little expensive",
        [Language.Hindi]: "थोडा महंगा।",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS3R5C3: {
        [Language.English]: "Economical option",
        [Language.Hindi]: "आर्थिक विकल्प।",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS4HT1: {
        [Language.English]: `<span class="lg-text-highlighted"> Our Suggestions </span>`,
        [Language.Hindi]: `<span class="lg-text-highlighted"> हमारे सुझाव </span>`,
        [Language.Marathi]: "?????",
    },
    categoryInvertersS4HT2: {
        [Language.English]: "Based On Your Choice",
        [Language.Hindi]: "आपकी पसंद के आधार पर",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS4Heading: {
        [Language.English]: "Select Inverter Type",
        [Language.Hindi]: "इनवर्टर का टाइप चुनें",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS4BTFlat: {
        [Language.English]: "Sine",
        [Language.Hindi]: "साइन",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS4BTTubular: {
        [Language.English]: "Square",
        [Language.Hindi]: "स्क्वायर",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS4SpecificationHeading: {
        [Language.English]: "Inverter Specification",
        [Language.Hindi]: "इनवर्टर  विवरण",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS4Slide1Heading: {
        [Language.English]: "LGS1100i",
        [Language.Hindi]: "LGS1100i",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS4Slide1Description: {
        [Language.English]:
            "Inverter for Small Offices, Homes, and Small Shops with Best-in-Class Warranty and Smart AI Charging. With an assured warranty and Pure Sine Wave output, experience energy unlimited at your home with this Livguard Inverter",
        [Language.Hindi]:
            "छोटे कार्यालयों, घरों और छोटी दुकानों के लिए इनवर्टर, सर्वश्रेष्ठ श्रेणी की वारंटी और स्मार्ट एआई चार्जिंग के साथ    सुनिश्चित वारंटी और प्योर साइन वेव आउटपुट के साथ, हमारे लिवगार्ड इनवर्टर के साथ अपने घर पर असीमित ऊर्जा का अनुभव करें",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS2Slide1KS1Title: {
        [Language.English]: "Warranty",
        [Language.Hindi]: "वारंटी",
        [Language.Marathi]: "?????",
    },
    categoryInvertersSlide1KS1Description: {
        [Language.English]: "3 Years",
        [Language.Hindi]: "3 साल",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS2Slide1KS2Title: {
        [Language.English]: "Capacity",
        [Language.Hindi]: "क्षमता",
        [Language.Marathi]: "?????",
    },
    categoryInvertersSlide1KS2Description: {
        [Language.English]: "900VA",
        [Language.Hindi]: "900VA",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS2Slide1KS3Title: {
        [Language.English]: "AI Charging",
        [Language.Hindi]: "ए आई चार्जिंग",
        [Language.Marathi]: "?????",
    },
    categoryInvertersSlide1KS3Description: {
        [Language.English]: "DSP Processor",
        [Language.Hindi]: "डी एस पी प्रोसेसर",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS2Slide1KS4Title: {
        [Language.English]: "Dimensions",
        [Language.Hindi]: "आयाम",
        [Language.Marathi]: "?????",
    },
    categoryInvertersSlide1KS4Description: {
        [Language.English]: "275(L) X 297(W) X 123(H)",
        [Language.Hindi]: "275(L) X 297(W) X 123(H)",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS4Slide2Heading: {
        [Language.English]: "LG1550i",
        [Language.Hindi]: "LG1550i",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS4Slide2Description: {
        [Language.English]:
            "Inverter for Small Offices, Homes, and Small Shops with Best-in-Class Warranty and Smart AI Charging. Bring home the power of unlimited energy with our Inverter. Equipped with the best-in-class warranty and Smart AI Charging to offer a smooth flow of energy to you",
        [Language.Hindi]:
            "छोटे कार्यालयों, घरों और छोटी दुकानों के लिए इनवर्टर, सर्वश्रेष्ठ श्रेणी की वारंटी और स्मार्ट एआई चार्जिंग के साथ    हमारे इनवर्टर के साथ असीमित ऊर्जा की शक्ति घर लाएं। आपको ऊर्जा का सहज प्रवाह प्रदान करने के लिए उद्योग की सावराश्रेष्ठ वारंटी आवर स्मार्ट ए आई चार्जिंग के साथ बने इनवर्टर।",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS2Slide2KS1Title: {
        [Language.English]: "Warranty",
        [Language.Hindi]: "वारंटी",
        [Language.Marathi]: "?????",
    },
    categoryInvertersSlide2KS1Description: {
        [Language.English]: "3 Years",
        [Language.Hindi]: "3 साल",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS2Slide2KS2Title: {
        [Language.English]: "Capacity",
        [Language.Hindi]: "क्षमता",
        [Language.Marathi]: "?????",
    },
    categoryInvertersSlide2KS2Description: {
        [Language.English]: "1250VA",
        [Language.Hindi]: "1250VA",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS2Slide2KS3Title: {
        [Language.English]: "AI Charging",
        [Language.Hindi]: "ए आई चार्जिंग",
        [Language.Marathi]: "?????",
    },
    categoryInvertersSlide2KS3Description: {
        [Language.English]: "DSP Processor",
        [Language.Hindi]: "डी एस पी प्रोसेसर",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS2Slide2KS4Title: {
        [Language.English]: "Dimensions",
        [Language.Hindi]: "आयाम",
        [Language.Marathi]: "?????",
    },
    categoryInvertersSlide2KS4Description: {
        [Language.English]: "275(L) X 281(W) X 145(H)",
        [Language.Hindi]: "275(L) X 281(W) X 145(H)",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS4RelatedProductsHeading: {
        [Language.English]: "Related Products",
        [Language.Hindi]: "संबंधित उत्पाद",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS4BT: {
        [Language.English]: "Explore Product",
        [Language.Hindi]: "विस्तार से देखें",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS5HT1: {
        [Language.English]: "Side-by-Side Overview",
        [Language.Hindi]: "इनवर्टर साथ देखें",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS5F1Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS5F2Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS5F3Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS5F4Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS5F5Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS5F6Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS5Slide1Heading: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS5Slide2Heading: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS5Slide3Heading: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS6HT1: {
        [Language.English]: `Suggested <span class="lg-text-highlighted">Jodis </span>`,
        [Language.Hindi]: `सुझायी गई <span class="lg-text-highlighted"> जोड़ियाँ </span>`,
        [Language.Marathi]: "?????",
    },
    categoryInvertersS6Jodi1Title: {
        [Language.English]: "The Urban Jodi",
        [Language.Hindi]: "अर्बन कॉम्बो",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS6Jodi2Title: {
        [Language.English]: "The Peace Of Mind Jodi",
        [Language.Hindi]: "मन की शांति वाली जोड़ी",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS6Jodi3Title: {
        [Language.English]: "The Super Life Jodi",
        [Language.Hindi]: "सुपर लाइफ कॉम्बो",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS6Jodi4Title: {
        [Language.English]: "The Hi-Power Jodi",
        [Language.Hindi]: "हाई-पॉवर कॉम्बो",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS6JodiButtontext: {
        [Language.English]: "Know More",
        [Language.Hindi]: "अधिक जानिए",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS6Buttontext: {
        [Language.English]: "Enquire Now",
        [Language.Hindi]: "संपर्क करें",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS8HT1: {
        [Language.English]: "Choose The Best",
        [Language.Hindi]: "घर लायें रोशनी",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS8HT2: {
        [Language.English]: `<span class="lg-text-highlighted"> Inverter Battery </span> For You`,
        [Language.Hindi]: `उचित <span class="lg-text-highlighted"> इनवर्टर बैटरी </span> से`,
        [Language.Marathi]: "?????",
    },
    categoryInvertersS8Description: {
        [Language.English]:
            "Find the suitable pick of inverter that fulfils your requirements with efficiency. Use our Buying Guide to get to know in detail about how you can buy your inverter and our Product Catalogue for product specifications",
        [Language.Hindi]: "हमारे बाइंग गाइड और प्रोडक्ट कैटलॉग का उपयोग करके अपने लिए उपयुक्त इनवर्टर चुनें जो सहजता के साथ आपकी आवश्यकताओं को पूरा करें।",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS8B1T: {
        [Language.English]: "Buying Guide",
        [Language.Hindi]: "बाइंग गाइड",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS8B2T: {
        [Language.English]: "Download Catalog",
        [Language.Hindi]: "डाउनलोड कैटलॉग",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS8BT: {
        [Language.English]: "Let's Plan Your Power",
        [Language.Hindi]: "अपनी ऊर्जा को प्लान करें",
        [Language.Marathi]: "?????",
    },
    noDealerLocatorText: {
        [Language.English]: "No Dealer Found",
        [Language.Hindi]: "कोई डीलर नहीं मिला",
        [Language.Marathi]: "?????",
    },

    dealerLocatorInputText: {
        [Language.English]: "Enter Location, City, or Zip Code",
        [Language.Hindi]: "स्थान, शहर या ज़िप कोड भरे",
        [Language.Marathi]: "?????",
    },
    dealerLocatorButtonText: {
        [Language.English]: "Find My Dealer",
        [Language.Hindi]: "नज़दीकी डीलर खोजें",
        [Language.Marathi]: "?????",
    },
    dealerLocatorShowText: {
        [Language.English]: "Show Dealers List",
        [Language.Hindi]: "डीलर सूची दिखाएं",
        [Language.Marathi]: "?????",
    },
    dealerLocatorS2H: {
        [Language.English]: "Trouble Finding Dealers?",
        [Language.Hindi]: "डीलर खोजने में परेशानी?",
        [Language.Marathi]: "?????",
    },
    dealerLocatorS2T: {
        [Language.English]: "Get in touch with us for a faster resolution",
        [Language.Hindi]: "तेज़ समाधान के लिए हमसे संपर्क करें",
        [Language.Marathi]: "?????",
    },
    dealerLocatorS2BT: {
        [Language.English]: "Contact Us",
        [Language.Hindi]: "संपर्क करें",
        [Language.Marathi]: "?????",
    },
    dealerLocatorS4H: {
        [Language.English]: "Join The Livguard Network",
        [Language.Hindi]: "लिवगार्ड नेटवर्क से जुड़ें",
        [Language.Marathi]: "?????",
    },
    dealerLocatorS4T: {
        [Language.English]: "With 4000+ dealers & distributors",
        [Language.Hindi]: "4000+ डीलरों और वितरकों के साथ",
        [Language.Marathi]: "?????",
    },
    dealerLocatorS4BT: {
        [Language.English]: "Apply Now",
        [Language.Hindi]: "अभी अप्लाई करें",
        [Language.Marathi]: "?????",
    },
    dealerLocatorSocialHT1: {
        [Language.English]: "Catch Dealers",
        [Language.Hindi]: `जानिये <span class="lg-text-highlighted"> लिवगार्ड </span>`,
        [Language.Marathi]: "?????",
    },
    dealerLocatorSocialHT2: {
        [Language.English]: `<span class="lg-text-highlighted"> Talking About Livguard </span>`,
        [Language.Hindi]: `<span class="lg-text-highlighted"> डीलर नेटवर्क </span> को`,
        [Language.Marathi]: "?????",
    },
    dealerLocatorHighlightedText: {
        [Language.English]: "Dealers Near You",
        [Language.Hindi]: "आप के नज़दीकी डीलर",
        [Language.Marathi]: "OOOOO",
    },

    applyNowForDealerT1: {
        [Language.English]: "Become A Dealer Now",
        [Language.Hindi]: "लिवगार्ड डीलर बनें",
        [Language.Marathi]: "?????",
    },
    applyNowForDealerT2: {
        [Language.English]: "Phone Number",
        [Language.Hindi]: " मोबाइल नंबर",
        [Language.Marathi]: "?????",
    },
    applyNowForDealerT3: {
        [Language.English]: "Name",
        [Language.Hindi]: "नाम",
        [Language.Marathi]: "?????",
    },
    applyNowForDealerT5: {
        [Language.English]: "City",
        [Language.Hindi]: " शहर",
        [Language.Marathi]: "?????",
    },
    applyNowForDealerT4: {
        [Language.English]: "Email",
        [Language.Hindi]: "ई-मेल",
        [Language.Marathi]: "?????",
    },
    applyNowForDealerT6: {
        [Language.English]: "Submit",
        [Language.Hindi]: "सबमिट करें",
        [Language.Marathi]: "?????",
    },
    applyNowForDealerPH2: {
        [Language.English]: "Please Enter Your Mobile",
        [Language.Hindi]: "कृपया अपना मोबाइल नंबर डालें",
        [Language.Marathi]: "?????",
    },
    applyNowForDealerPH3: {
        [Language.English]: "Please Enter Your Name",
        [Language.Hindi]: "कृपया अपना नाम डालें",
        [Language.Marathi]: "?????",
    },
    applyNowForDealerPH4: {
        [Language.English]: "Please Enter Your Email",
        [Language.Hindi]: "कृपया अपनी ई-मेल डालें",
        [Language.Marathi]: "?????",
    },
    applyNowForDealerPH5: {
        [Language.English]: "Please Select Your City",
        [Language.Hindi]: "कृपया अपना शहर चुनें",
        [Language.Marathi]: "?????",
    },
    successT1: {
        [Language.English]: `Thank <br /> You!`,
        [Language.Hindi]: "धन्यवाद!",
        [Language.Marathi]: "?????",
    },
    successT2: {
        [Language.English]: `Hang on, you'll receive a <br /> call from our team soon`,
        [Language.Hindi]: `प्रतीक्षा करें, हम आपसे <br /> जल्द संपर्क करेंगे`,
        [Language.Marathi]: "?????",
    },
    successT3: {
        [Language.English]: `Till then, show some love to our <br /> social handles!`,
        [Language.Hindi]: `तब तक हमारे सोशल मीडिया <br /> पर प्यार बरसाएँ`,
        [Language.Marathi]: "?????",
    },
    productPageSpecifications: {
        [Language.English]: "Specifications",
        [Language.Hindi]: "विवरण",
        [Language.Marathi]: "?????",
    },
    productPageProductDescription: {
        [Language.English]: "Product Description",
        [Language.Hindi]: "उत्पाद विवरण",
        [Language.Marathi]: "?????",
    },
    productPageFeatures: {
        [Language.English]: "Features",
        [Language.Hindi]: " विशेषताएँ",
        [Language.Marathi]: "?????",
    },
    productPageAdditionalInfo: {
        [Language.English]: "Additional Info",
        [Language.Hindi]: "अतिरिक्त जानकारी",
        [Language.Marathi]: "?????",
    },
    productPageNumberReviewBefore: {
        [Language.English]: "Based on",
        [Language.Hindi]: "",
        [Language.Marathi]: "?????",
    },
    productPageNumberReviewAfter: {
        [Language.English]: "Reviews",
        [Language.Hindi]: "रिव्यूज़ के आधार पर",
        [Language.Marathi]: "?????",
    },
    categoryViewProductButtontext: {
        [Language.English]: "View Product",
        [Language.Hindi]: "विस्तार से देखें",
        [Language.Marathi]: "?????",
    },
    review1Name: {
        [Language.English]: "Thangamani M",
        [Language.Hindi]: "विस्तार से देखें",
        [Language.Marathi]: "?????",
    },
    review1State: {
        [Language.English]: "Tamil Nadu",
        [Language.Hindi]: "तमिलनाडु",
        [Language.Marathi]: "?????",
    },
    review1Message: {
        [Language.English]: `\"Suitable for looking mid price range with long warranty Installation done recently, good product and support and demo given by Livguard.Value for money, will update the review later on backup timing.\"`,
        [Language.Hindi]: `\"लंबी वारंटी के साथ मध्य मूल्य सीमा देखने के लिए उपयुक्त। स्थापना, हाल ही में की गई, अच्छा उत्पाद और समर्थन और  लिवगार्ड द्वारा दिया गया डेमो। पैसा वसूल,समीक्षा को बाद में बैकअप टाइमिंग पर अपडेट करेंगे\"`,
        [Language.Marathi]: "?????",
    },
    review1ProductName: {
        [Language.English]: "Inverter",
        [Language.Hindi]: "इनवर्टर",
        [Language.Marathi]: "?????",
    },
    review2Name: {
        [Language.English]: "Ankit",
        [Language.Hindi]: "अंकित",
        [Language.Marathi]: "?????",
    },
    review2State: {
        [Language.English]: "Delhi",
        [Language.Hindi]: "दिल्ली",
        [Language.Marathi]: "?????",
    },
    review2Message: {
        [Language.English]: `\"It's cheap and best product. This is good looking and nice product and the service of livgaurd is too good and supportive.\"`,
        [Language.Hindi]: `\"यह सस्ता और बेहतरीन प्रोडक्ट है। यह अच्छा दिखने वाला और अच्छा उत्पाद है और लिवगार्ड की सर्विस बहुत अच्छी और सहायक है।\"`,
        [Language.Marathi]: "?????",
    },
    review2ProductName: {
        [Language.English]: "Inverter Battery",
        [Language.Hindi]: "इनवर्टर बैटरी",
        [Language.Marathi]: "?????",
    },
    review3Name: {
        [Language.English]: "Ganesh",
        [Language.Hindi]: "गणेश",
        [Language.Marathi]: "?????",
    },
    review3State: {
        [Language.English]: "Maharashtra",
        [Language.Hindi]: "महाराष्ट्र",
        [Language.Marathi]: "?????",
    },
    review3Message: {
        [Language.English]: `\"Great product. Great product. Go for it without a doubt.\"`,
        [Language.Hindi]: `\"अच्छा उत्पाद। अच्छा उत्पाद। इसके लिए बिना किसी संदेह के जाएं।\"`,
        [Language.Marathi]: "?????",
    },
    review3ProductName: {
        [Language.English]: "Inverter",
        [Language.Hindi]: "इनवर्टर",
        [Language.Marathi]: "?????",
    },
    review4Name: {
        [Language.English]: "Dev Chauhan",
        [Language.Hindi]: "देव चौहान",
        [Language.Marathi]: "?????",
    },
    review4State: {
        [Language.English]: "Uttar Pradesh",
        [Language.Hindi]: "उतार प्रदेश",
        [Language.Marathi]: "?????",
    },
    review4Message: {
        [Language.English]: `\"Deliver on time & battery backup is very good. Installation services was very good.\"`,
        [Language.Hindi]: `\"समय पर डिलीवरी और बैटरी बैकअप बहुत अच्छा है। स्थापना सर्विसएं बहुत अच्छी थीं।\"`,
        [Language.Marathi]: "?????",
    },
    review4ProductName: {
        [Language.English]: "Jodi",
        [Language.Hindi]: "जोड़ि",
        [Language.Marathi]: "?????",
    },

    footerCopyWriteText: {
        [Language.English]: "© Livguard 2023. All Rights Reserved",
        [Language.Hindi]: "© लिवगार्ड 2023। सभी अधिकार सुरक्षित",
        [Language.Marathi]: "INVALID STRING REQUESTED",
    },

    footerSubscribeT1: {
        [Language.English]: "Be the first to find out about new stories & latest offers!",
        [Language.Hindi]: " नए ऑफर और कहनियों के बारे में जानने वाले सबसे पहले बनिए!",
        [Language.Marathi]: "?????",
    },
    footerSubscribeT2: {
        [Language.English]: "Enter Your Email To Subscribe",
        [Language.Hindi]: "सब्सक्राइब करने के लिए ईमेल डालें",
        [Language.Marathi]: "?????",
    },
    footerDisclosure1H: {
        [Language.English]: "About Us",
        [Language.Hindi]: "हमारे बारे में",
        [Language.Marathi]: "?????",
    },
    footerDisclosure1T1: {
        [Language.English]: "Contact Us",
        [Language.Hindi]: "हमसे संपर्क करें",
        [Language.Marathi]: "?????",
    },
    footerDisclosure1T2: {
        [Language.English]: "Global Reach",
        [Language.Hindi]: "वैश्विक पहुँच",
        [Language.Marathi]: "?????",
    },
    footerDisclosure1T3: {
        [Language.English]: "Blog",
        [Language.Hindi]: "ब्लॉग",
        [Language.Marathi]: "?????",
    },
    footerDisclosure1T4: {
        [Language.English]: "Privacy Policy",
        [Language.Hindi]: "गोपनीयता नीति",
        [Language.Marathi]: "?????",
    },
    footerDisclosure1T5: {
        [Language.English]: "Sales Return Policy",
        [Language.Hindi]: "सेल्स वापसी नीति",
        [Language.Marathi]: "?????",
    },
    footerDisclosure1T6: {
        [Language.English]: "Terms and conditions",
        [Language.Hindi]: "नियम और शर्तें",
        [Language.Marathi]: "?????",
    },
    footerDisclosure1T7: {
        [Language.English]: "CSR Policy",
        [Language.Hindi]: "कॉर्पोरेट सामाजिक उत्तरदायित्व नीति",
        [Language.Marathi]: "?????",
    },
    footerDisclosure1T8: {
        [Language.English]: "Video Gallery",
        [Language.Hindi]: "वीडियो गैलरी",
        [Language.Marathi]: "?????",
    },
    footerDisclosure1T9: {
        [Language.English]: "Sitemap",
        [Language.Hindi]: "साइट मैप",
        [Language.Marathi]: "?????",
    },
    footerDisclosure2H: {
        [Language.English]: "Inverters and Batteries",
        [Language.Hindi]: "इनवर्टर और बैटरी",
        [Language.Marathi]: "?????",
    },
    footerDisclosure2T1: {
        [Language.English]: "Home Inverters",
        [Language.Hindi]: " होम इनवर्टर",
        [Language.Marathi]: "?????",
    },
    footerDisclosure2T2: {
        [Language.English]: "Inverter Batteries",
        [Language.Hindi]: "इनवर्टर बैटरी",
        [Language.Marathi]: "?????",
    },
    footerDisclosure2T3: {
        [Language.English]: "High Capacity Inverters ",
        [Language.Hindi]: "उच्च क्षमता वाले इनवर्टर",
        [Language.Marathi]: "?????",
    },
    footerDisclosure3H: {
        [Language.English]: "Automotive Batteries",
        [Language.Hindi]: "ऑटोमोटिव बैटरी",
        [Language.Marathi]: "?????",
    },
    footerDisclosure3T1: {
        [Language.English]: "3-wheeler batteries",
        [Language.Hindi]: "3-पहिया बैटरी",
        [Language.Marathi]: "?????",
    },
    footerDisclosure3T2: {
        [Language.English]: "Tractor Batteries",
        [Language.Hindi]: "ट्रैक्टर बैटरी",
        [Language.Marathi]: "?????",
    },
    footerDisclosure3T3: {
        [Language.English]: "Bus and Truck Batteries",
        [Language.Hindi]: "बस और ट्रक की बैटरी",
        [Language.Marathi]: "?????",
    },
    footerDisclosure3T4: {
        [Language.English]: "2-wheeler Batteries",
        [Language.Hindi]: "2-पहिया बैटरी",
        [Language.Marathi]: "?????",
    },
    footerDisclosure3T5: {
        [Language.English]: "E-Rickshaw Batteries",
        [Language.Hindi]: "ई-रिक्शा की बैटरी",
        [Language.Marathi]: "?????",
    },
    footerDisclosure4H: {
        [Language.English]: "Solar Solutions",
        [Language.Hindi]: "सोलर सलूशन",
        [Language.Marathi]: "?????",
    },
    footerDisclosure4T1: {
        [Language.English]: "Solar Panels",
        [Language.Hindi]: "सोलर पैनल",
        [Language.Marathi]: "?????",
    },
    footerDisclosure4T2: {
        [Language.English]: "Solar Grid Interactive Series",
        [Language.Hindi]: "सोलर ग्रिड इंटरैक्टिव श्रेणी",
        [Language.Marathi]: "?????",
    },
    footerDisclosure4T3: {
        [Language.English]: "Solar Inverter",
        [Language.Hindi]: "सोलर इनवर्टर",
        [Language.Marathi]: "?????",
    },
    footerDisclosure4T4: {
        [Language.English]: "Solar Management Unit",
        [Language.Hindi]: "सोलर प्रबंधन इकाई",
        [Language.Marathi]: "?????",
    },
    footerDisclosure4T5: {
        [Language.English]: "Solar Charge Controller",
        [Language.Hindi]: "सोलर चार्ज कंट्रोलर",
        [Language.Marathi]: "?????",
    },
    footerDisclosure4T6: {
        [Language.English]: "Solar LED Street Light",
        [Language.Hindi]: "सोलर एल ई डी बत्ती",
        [Language.Marathi]: "?????",
    },
    footerDisclosure4T7: {
        [Language.English]: "Solar Battery",
        [Language.Hindi]: "सोलर बैटरी",
        [Language.Marathi]: "?????",
    },
    footerDisclosure5H: {
        [Language.English]: "Stabilisers",
        [Language.Hindi]: "स्टेबिलाइजर्स",
        [Language.Marathi]: "?????",
    },
    footerDisclosure5T1: {
        [Language.English]: "Digital Stabilisers",
        [Language.Hindi]: "डिजिटल स्टेबिलाइजर्स",
        [Language.Marathi]: "?????",
    },
    footerDisclosure6H: {
        [Language.English]: "How can we help?",
        [Language.Hindi]: "हम आपकी कैसे सहायता कर सकते हैं?",
        [Language.Marathi]: "?????",
    },
    footerDisclosure6T1: {
        [Language.English]: "Battery Finder",
        [Language.Hindi]: "बैटरी खोजक",
        [Language.Marathi]: "?????",
    },
    footerDisclosure6T2: {
        [Language.English]: "Dealer Locator",
        [Language.Hindi]: "डीलर लोकेटर",
        [Language.Marathi]: "?????",
    },
    footerDisclosure6T3: {
        [Language.English]: "BMHR",
        [Language.Hindi]: "बी एम ऐच आर",
        [Language.Marathi]: "?????",
    },
    footerDisclosure6T4: {
        [Language.English]: "Register Your Product",
        [Language.Hindi]: "अपना उत्पाद पंजीकृत करें",
        [Language.Marathi]: "?????",
    },
    footerDisclosure6T5: {
        [Language.English]: "Service Support",
        [Language.Hindi]: "सर्विस समर्थन",
        [Language.Marathi]: "?????",
    },
    footerDisclosure7H: {
        [Language.English]: "Investor",
        [Language.Hindi]: "निवेशक",
        [Language.Marathi]: "?????",
    },
    footerDisclosure7T1: {
        [Language.English]: "LETPL Annual return– 2021-22",
        [Language.Hindi]: "LETPL वार्षिक विवरण– 2021-22",
        [Language.Marathi]: "?????",
    },
    footerDisclosure7T2: {
        [Language.English]: "LBPL Annual return– 2021-22",
        [Language.Hindi]: "LBPL वार्षिक विवरण– 2021-22",
        [Language.Marathi]: "?????",
    },
    footerContactT1: {
        [Language.English]: "GET IN TOUCH",
        [Language.Hindi]: "संपर्क करें",
        [Language.Marathi]: "?????",
    },
    footerContactT2: {
        [Language.English]: "Plot No. 221, Phase-I, Udyog Vihar, Gurgaon 122016 Haryana, India",
        [Language.Hindi]: "प्लॉट नंबर 221, फेज-1, उद्योग विहार, गुरुग्राम 122016 हरियाणा, भारत",
        [Language.Marathi]: "?????",
    },
    footerContactT3: {
        [Language.English]: "#EnergyUnlimited",
        [Language.Hindi]: "#असीमितऊर्जा",
        [Language.Marathi]: "?????",
    },
    landingPageBottomBarT1: {
        [Language.English]: "Find my Dealer",
        [Language.Hindi]: "डीलर खोजें",
        [Language.Marathi]: "?????",
    },
    landingPageBottomBarT2: {
        [Language.English]: "Enquire now",
        [Language.Hindi]: "संपर्क करें",
        [Language.Marathi]: "?????",
    },
    contactUsT1: {
        [Language.English]: "Connect with Livguard Expert Today",
        [Language.Hindi]: "आज ही लिवगार्ड एक्सपर्ट से जुड़ें",
        [Language.Marathi]: "?????",
    },
    contactUsT2: {
        [Language.English]: "Phone Number",
        [Language.Hindi]: "मोबाइल नंबर",
        [Language.Marathi]: "?????",
    },
    contactUsT2E: {
        [Language.English]: "Please Enter Your Mobile Number",
        [Language.Hindi]: "कृपया अपना मोबाइल नंबर डालें",
        [Language.Marathi]: "?????",
    },
    contactUsT3: {
        [Language.English]: "Name",
        [Language.Hindi]: "नाम",
        [Language.Marathi]: "?????",
    },
    contactUsT3E: {
        [Language.English]: "Please Enter Your Name",
        [Language.Hindi]: "कृपया अपना नाम डालें",
        [Language.Marathi]: "?????",
    },
    contactUsT4: {
        [Language.English]: "Email",
        [Language.Hindi]: "ई-मेल",
        [Language.Marathi]: "?????",
    },
    contactUsT4E: {
        [Language.English]: "Please Enter Your Email",
        [Language.Hindi]: "कृपया अपनी ई-मेल डालें",
        [Language.Marathi]: "?????",
    },
    contactUsT5: {
        [Language.English]: "Submit",
        [Language.Hindi]: "सबमिट करें",
        [Language.Marathi]: "?????",
    },
    contactUsT6: {
        [Language.English]: "Thank\nYou!",
        [Language.Hindi]: "धन्यवाद!",
        [Language.Marathi]: "?????",
    },
    contactUsT7: {
        [Language.English]: "Hang on, you'll receive a\ncall from our team soon",
        [Language.Hindi]: "प्रतीक्षा करें, हम आपसे जल्द संपर्क करेंगे",
        [Language.Marathi]: "?????",
    },
    contactUsT8: {
        [Language.English]: "Till then, show some love to our\nsocial handles!",
        [Language.Hindi]: "तब तक हमारे सोशल मीडिया पर प्यार बरसाएँ",
        [Language.Marathi]: "?????",
    },

    contactUsFormHT1: {
        [Language.English]: `Get <span class=\"lg-text-highlighted tw-text-secondary-900-dark\">Reliable Power</span>`,
        [Language.Hindi]: `<span class=\"lg-text-highlighted tw-text-secondary-900-dark\">विश्वसनीय शक्ति</span>`,
        [Language.Marathi]: "?????",
    },
    contactUsFormHT2: {
        [Language.English]: "With Livguard",
        [Language.Hindi]: "लिवगार्ड के साथ",
        [Language.Marathi]: "?????",
    },
    contactUsFormT3: {
        [Language.English]: "Connect Today",
        [Language.Hindi]: "आज ही जुड़ें",
        [Language.Marathi]: "?????",
    },
    contactUsFormT4: {
        [Language.English]: "Let's Connect",
        [Language.Hindi]: "सबमिट करें",
        [Language.Marathi]: "?????",
    },

    bottomBarT1: {
        [Language.English]: "Home",
        [Language.Hindi]: "होम",
        [Language.Marathi]: "?????",
    },
    bottomBarT2: {
        [Language.English]: "Inverters",
        [Language.Hindi]: "इनवर्टर",
        [Language.Marathi]: "?????",
    },
    bottomBarT3: {
        [Language.English]: "Power Planner",
        [Language.Hindi]: "पावर प्लानर",
        [Language.Marathi]: "?????",
    },
    bottomBarT4: {
        [Language.English]: "Dealers",
        [Language.Hindi]: "डीलर",
        [Language.Marathi]: "?????",
    },
    bottomBarT5: {
        [Language.English]: "Support",
        [Language.Hindi]: "सर्विस",
        [Language.Marathi]: "?????",
    },
    downloadCatalogueBottomBarT1: {
        [Language.English]: "Download Catalog",
        [Language.Hindi]: "उत्पाद कैटलॉग",
        [Language.Marathi]: "?????",
    },
    productPageSuggestedProduct: {
        [Language.English]: `Suggested <span class=\"lg-text-highlighted\">Products</span>`,
        [Language.Hindi]: `सुझाए गए <span class=\"lg-text-highlighted\">उत्पाद</span>`,
        [Language.Marathi]: "?????",
    },

    loadCalculatorS1T1: {
        [Language.English]: `Plan Your Power Needs <br/>With Livguard <span class=\"lg-text-highlighted\">Power Planner</span>`,
        [Language.Hindi]: 'अपनी ऊर्जा ज़रूरतों को जानें <br/>हमारे <span class="lg-text-highlighted">पावर प्लानर </span> के साथ',
        [Language.Marathi]: "?????",
    },
    loadCalculatorS1T2: {
        [Language.English]:
            "Take charge of your power needs with Livguard's load calculator- Power Planner. Your key to personalised power solutions. It helps you find the perfect inverter and inverter battery options for your home, ensuring uninterrupted power supply at all times.",
        [Language.Hindi]:
            "आपकी ज़रूरत के अनुसार समाधान पायें, लिवगार्ड के लोड कैलकुलेटर- पावर प्लानर के साथ।यह आपको अपने होम लिए सही इनवर्टर और इनवर्टर बैटरी विकल्प खोजने में मदद करता है, और हर समय बिना रुकावट ऊर्जा का प्रवाह सुनिश्चित करता है।",
        [Language.Marathi]: "?????",
    },
    loadCalculatorRecommendationsS1T1: {
        [Language.English]: "Utilisation",
        [Language.Hindi]: "खपत",
        [Language.Marathi]: "?????",
    },
    loadCalculatorRecommendationsS1T2: {
        [Language.English]: "Hours",
        [Language.Hindi]: "घंटे",
        [Language.Marathi]: "?????",
    },
    loadCalculatorRecommendationsS1T4: {
        [Language.English]: "is your total house load",
        [Language.Hindi]: "आपका कुल हाउस लोड है",
        [Language.Marathi]: "?????",
    },
    loadCalculatorRecommendationsS2H1: {
        [Language.English]: `<span class=\"lg-text-highlighted\">Top Choices</span> For You`,
        [Language.Hindi]: `<span class=\"lg-text-highlighted\">शीर्ष सुझाव</span> आपके लिए`,
        [Language.Marathi]: "?????",
    },
    loadCalculatorRecommendationsS2H2: {
        [Language.English]: "Hand Picked For Your Needs",
        [Language.Hindi]: "आपकी आवश्यकताओं के अनुसार",
        [Language.Marathi]: "?????",
    },
    loadCalculatorRecommendationsS2T1: {
        [Language.English]: "Inverters",
        [Language.Hindi]: "इनवर्टर",
        [Language.Marathi]: "?????",
    },
    loadCalculatorRecommendationsS2T2: {
        [Language.English]: "Batteries",
        [Language.Hindi]: "बैटरी",
        [Language.Marathi]: "?????",
    },
    loadCalculatorRecommendationsS2T3: {
        [Language.English]: "Quick View",
        [Language.Hindi]: "तुरंत देखें",
        [Language.Marathi]: "?????",
    },
    loadCalculatorRecommendationsS2T4: {
        [Language.English]: "Match",
        [Language.Hindi]: "मैच",
        [Language.Marathi]: "?????",
    },
    loadCalculatorRecommendationsS3H1: {
        [Language.English]: "A Quick Guide to",
        [Language.Hindi]: "एक सरल गाइड",
        [Language.Marathi]: "?????",
    },
    loadCalculatorRecommendationsS3H2: {
        [Language.English]: `Choosing the <span class=\"lg-text-highlighted\">Right Product</span>`,
        [Language.Hindi]: `<span class=\"lg-text-highlighted\">सही उत्पाद</span> चुनने के लिए`,
        [Language.Marathi]: "?????",
    },
    loadCalculatorRecommendationsS2CTA1: {
        [Language.English]: "Connect To A Dealer",
        [Language.Hindi]: "हमारे डीलर से जुड़ें",
        [Language.Marathi]: "?????",
    },
    loadCalculatorRecommendationsS2CTA2: {
        [Language.English]: "Explore Inverters",
        [Language.Hindi]: "इनवर्टर देखें",
        [Language.Marathi]: "?????",
    },
    loadCalculatorRecommendationsS2CTA3: {
        [Language.English]: "Explore Batteries",
        [Language.Hindi]: "बैटरी देखें",
        [Language.Marathi]: "?????",
    },
    loadCalculatorAdditionalInputsT1: {
        [Language.English]: "I would require",
        [Language.Hindi]: "मुझे एक दिन में",
        [Language.Marathi]: "?????",
    },
    loadCalculatorAdditionalInputsT2: {
        [Language.English]: "Hours of backup in a day",
        [Language.Hindi]: "घंटे के बैकअप की ज़रूरत है",
        [Language.Marathi]: "?????",
    },
    loadCalculatorAdditionalInputsT3: {
        [Language.English]: "Average Consumption ",
        [Language.Hindi]: "सामान्य खपत",
        [Language.Marathi]: "?????",
    },
    loadCalculatorAdditionalInputsT4: {
        [Language.English]: "Let's Plan",
        [Language.Hindi]: "नतीजा निकालें",
        [Language.Marathi]: "?????",
    },

    categoryInveterPageFAQQ1Q: {
        [Language.English]: "Which inverter is best for home?",
        [Language.Hindi]: "कौन सा इन्वर्टर घर के लिए सबसे अच्छा है?",
        [Language.Marathi]: "?????",
    },
    categoryInveterPageFAQQ1A: {
        [Language.English]: `When it comes to selecting the best inverter for your home, Livguard Inverter is the top choice. Use our <a href="/load-calculator" class="tw-underline">Power Planner</a>, your personal load calculator to find the right inverter for you.`,
        [Language.Hindi]: `जब आपके घर के लिए सर्वश्रेष्ठ इन्वर्टर चुनने की बात आती है, तो लिवगार्ड इन्वर्टर शीर्ष विकल्प है। आपके लिए सही इन्वर्टर खोजने के लिए हमारे <a href="/load-calculator" class="tw-underline">पावर प्लानर</a>, आपके व्यक्तिगत लोड कैलकुलेटर का उपयोग करें।`,
        [Language.Marathi]: "?????",
    },
    categoryInveterPageFAQQ2Q: {
        [Language.English]: "What is sine wave inverter?",
        [Language.Hindi]: "साइन वेव इन्वर्टर क्या होता है?",
        [Language.Marathi]: "?????",
    },
    categoryInveterPageFAQQ2A: {
        [Language.English]: `A sine wave inverter produces a smooth & consistent electrical output which is essential for powering electronics like computers, TVs, and other household appliances. Choose <a href="/category/inverters" class="tw-underline">Livguard's Pure Sine wave inverters</a>for smooth backup.`,
        [Language.Hindi]: `एक साइन वेव इन्वर्टर एक सुचारू और सुसंगत विद्युत उत्पादन उत्पन्न करता है जो कंप्यूटर, टीवी और अन्य घरेलू उपकरणों जैसे इलेक्ट्रॉनिक्स को शक्ति प्रदान करने के लिए आवश्यक है। बिना रुकावट बैकअप के लिए<a href="/category/inverters" class="tw-underline">लिवगार्ड के प्योर साइन वेव इनवर्टर</a>चुनें।`,
        [Language.Marathi]: "?????",
    },
    categoryInveterPageFAQQ3Q: {
        [Language.English]: "How many home appliances can I run on a home inverter?",
        [Language.Hindi]: "होम इन्वर्टर पर मैं कितने घरेलू उपकरण चला सकता हूँ?",
        [Language.Marathi]: "?????",
    },
    categoryInveterPageFAQQ3A: {
        [Language.English]: `The number of home appliances a  <a href="/category/inverters" class="tw-underline">Livguard Inverter</a> can run depends on its capacity and power consumption. Livguard offers a wide range of inverters with different capacities that are suitable for various applications of your daily use`,
        [Language.Hindi]: `<a href="/category/inverters" class="tw-underline">लिवगार्ड इन्वर्टर</a> कितने घरेलू उपकरणों को चला सकता है, यह इसकी क्षमता और बिजली की खपत पर निर्भर करता है। लिवगार्ड विभिन्न क्षमताओं वाले इनवर्टर की एक विस्तृत श्रृंखला प्रदान करता है जो आपके दैनिक उपयोग के विभिन्न अनुप्रयोगों के लिए उपयुक्त हैं।`,
        [Language.Marathi]: "?????",
    },
    categoryInveterPageFAQQ4Q: {
        [Language.English]: "Are inverters for the home and the office different? ",
        [Language.Hindi]: "क्या घर और ऑफिस के लिए इनवर्टर अलग-अलग हैं?",
        [Language.Marathi]: "?????",
    },
    categoryInveterPageFAQQ4A: {
        [Language.English]: `Inverters are the same for both homes and offices, however, their capacities differ based on power needs & backup required. Whether you need an inverter for your home or business, <a href="/category/inverters" class="tw-underline">Livguard Inverters</a> are the right choice for you.`,
        [Language.Hindi]: `इन्वर्टर घरों और कार्यालयों दोनों के लिए समान हैं, हालांकि, बिजली की जरूरतों और आवश्यक बैकअप के आधार पर उनकी क्षमता भिन्न होती है। चाहे आपको अपने घर या व्यवसाय के लिए इन्वर्टर की आवश्यकता हो, <a href="/load-calculator" class="tw-underline">लिवगार्ड इनवर्टर</a> आपके लिए सही विकल्प हैं।`,
        [Language.Marathi]: "?????",
    },
    categoryInveterPageFAQQ5Q: {
        [Language.English]: "How does an inverter work?",
        [Language.Hindi]: "इन्वर्टर कैसे काम करता है?",
        [Language.Marathi]: "?????",
    },
    categoryInveterPageFAQQ5A: {
        [Language.English]: `An inverter converts DC (direct current) power from a battery or solar panel into AC (alternating current) power, which can power appliances. <a href="/category/inverters" class="tw-underline">Livguard Inverters</a>come with a variety of features and options for an unlimited flow of energy for you.`,
        [Language.Hindi]: `एक इन्वर्टर DC (डायरेक्ट करंट) पावर को बैटरी या सोलर पैनल से AC (अल्टरनेटिंग करंट) पावर में परिवर्तित करता है, जो बिजली के उपकरणों को चला सकता है। <a href="/category/inverters" class="tw-underline">लिवगार्ड इनवर्टर</a> आपके लिए ऊर्जा के असीमित प्रवाह के लिए कई प्रकार की विशेषताओं और विकल्पों के साथ आते हैं।`,
        [Language.Marathi]: "?????",
    },
    categoryBatteryPageFAQQ1Q: {
        [Language.English]: "Which inverter battery is best for my use? ",
        [Language.Hindi]: "मेरे उपयोग के लिए कौन सी इन्वर्टर बैटरी सबसे अच्छी है?",
        [Language.Marathi]: "?????",
    },
    categoryBatteryPageFAQQ1A: {
        [Language.English]: `Livguard's <a href="/load-calculator" class="tw-underline">Power Planner</a>, a Load Calculator tool helps you find the best inverter battery for your energy needs. Trust Livguard for superior performance and durability.`,
        [Language.Hindi]: `लिवगार्ड का <a href="/load-calculator" class="tw-underline">पावर प्लानर</a>, एक लोड कैलकुलेटर टूल आपको आपकी ऊर्जा आवश्यकताओं के लिए सबसे अच्छी इन्वर्टर बैटरी ढूंढने में मदद करता है। उत्कृष्ट प्रदर्शन और लंबे जीवन के लिए लिवगार्ड पर भरोसा करें।`,
        [Language.Marathi]: "?????",
    },
    categoryBatteryPageFAQQ2Q: {
        [Language.English]: "How to connect inverter to battery ?",
        [Language.Hindi]: " इनवर्टर को बैटरी से कैसे कनेक्ट करें?",
        [Language.Marathi]: "?????",
    },
    categoryBatteryPageFAQQ2A: {
        [Language.English]: `Connecting an inverter to a battery is a simple process of ensuring compatibility, connecting the cables, and testing. <a href="/category/batteries" class="tw-underline">Livguard Inverter Batteries</a> are designed for seamless compatibility and superior performance, ensuring a reliable and uninterrupted power supply for your home or office.`,
        [Language.Hindi]: `इनवर्टर को बैटरी से कनेक्ट करना एक सरल प्रक्रिया है जिसमें संगतता की सुनिश्चितता, केबल कनेक्शन और टेस्टिंग शामिल होती है। <a href="/category/batteries" class="tw-underline">लिवगार्ड इन्वर्टर बैटरी </a> सुविधाजनक संगतता और बेहतर प्रदर्शन के लिए डिज़ाइन की गई हैं, जो आपके घर या ऑफिस के लिए विश्वसनीय और अविराम बिजली आपूर्ति सुनिश्चित करती हैं।`,
        [Language.Marathi]: "?????",
    },
    categoryBatteryPageFAQQ3Q: {
        [Language.English]: "How to check inverter battery health ?",
        [Language.Hindi]: "इन्वर्टर बैटरी की स्वास्थ्य की जाँच कैसे करें?",
        [Language.Marathi]: "?????",
    },
    categoryBatteryPageFAQQ3A: {
        [Language.English]: `To check your inverter battery's health, disconnect it from the inverter and measure its voltage using a multimeter. <a href="/category/batteries" class="tw-underline">Livguard Inverter Batteries</a> are designed with advanced technology and undergo rigorous testing, ensuring long-lasting durability and superior performance for reliable and uninterrupted power supply at home or office.`,
        [Language.Hindi]: `इन्वर्टर बैटरी की स्वास्थ्य जांचने के लिए, इसे इनवर्टर से डिस्कनेक्ट करें और मल्टीमीटर का उपयोग करके उसकी वोल्टेज मापें। <a href="/category/batteries" class="tw-underline">लिवगार्ड इन्वर्टर बैटरी</a> उन्नत तकनीक के साथ डिज़ाइन की गई हैं और कड़ी मेहनत से टेस्ट की जाती हैं, इससे आपको घर या ऑफिस के लिए दुर्लभ और अविराम बिजली आपूर्ति के लिए दृढ़ और बेहतर प्रदर्शन का विश्वास होगा।`,
        [Language.Marathi]: "?????",
    },
    categoryBatteryPageFAQQ4Q: {
        [Language.English]: "How much backup time can my inverter battery provide?",
        [Language.Hindi]: "मेरी इनवर्टर बैटरी कितना समय बैकअप प्रदान कर सकती है?",
        [Language.Marathi]: "?????",
    },
    categoryBatteryPageFAQQ4A: {
        [Language.English]: `An inverter converts DC (direct current) power from a battery or solar panel into AC (alternating current) power, which can power appliances. <a href="/category/inverters" class="tw-underline">Livguard Inverters</a>come with a variety of features and options for an unlimited flow of energy for you.`,
        [Language.Hindi]: `एक इन्वर्टर DC (डायरेक्ट करंट) पावर को बैटरी या सोलर पैनल से AC (अल्टरनेटिंग करंट) पावर में परिवर्तित करता है, जो बिजली के उपकरणों को चला सकता है। <a href="/category/inverters" class="tw-underline">लिवगार्ड इनवर्टर</a> आपके लिए ऊर्जा के असीमित प्रवाह के लिए कई प्रकार की विशेषताओं और विकल्पों के साथ आते हैं।`,
        [Language.Marathi]: "?????",
    },
    categoryBatteryPageFAQQ5Q: {
        [Language.English]: "How long does the inverter battery last?",
        [Language.Hindi]: "इन्वर्टर की बैटरी कितने समय तक चलती है?",
        [Language.Marathi]: "?????",
    },
    categoryBatteryPageFAQQ5A: {
        [Language.English]: `On average, a well-maintained Inverter Battery can last between 2 to 5 years, but it's important to keep an eye on its performance and replace it when necessary. Choose <a href="/category/batteries" class="tw-underline">Livguard inverter batteries</a> for long and durable support.`,
        [Language.Hindi]: `औसतन, एक सुव्यवस्थित इन्वर्टर बैटरी 2 से 5 साल के बीच चल सकती है, लेकिन इसके प्रदर्शन पर नज़र रखना और आवश्यकता पड़ने पर इसे बदलना महत्वपूर्ण है। लंबे और टिकाऊ सपोर्ट के लिए <a href="/category/batteries" class="tw-underline">लिवगार्ड इनवर्टर बैटरी</a> चुनें।`,
        [Language.Marathi]: "?????",
    },
    dealerLocatorPageFAQQ1Q: {
        [Language.English]: "Can I avail financing options as a customer at these dealers locations?",
        [Language.Hindi]: "क्या मैं इन डीलर स्थानों पर वित्त के विकल्प का लाभ उठा सकता हूँ?",
        [Language.Marathi]: "?????",
    },
    dealerLocatorPageFAQQ1A: {
        [Language.English]: `Yes, Livguard has multiple financing opportunities available for our consumers for their ease. We are in partnership with Bajaj Finance and Paytail and consumers can choose any of the two options for the same. Call us at <a href="tel:18001025551">18001025551</a>`,
        [Language.Hindi]: `हां, लिवगार्ड के पास हमारे उपभोक्ताओं के लिए उनकी आसानी के लिए वित्तपोषण के कई अवसर उपलब्ध हैं। हम बजाज फाइनेंस और पे टेल के साथ साझेदारी कर रहे हैं और उपभोक्ता इसके लिए दो विकल्पों में से कोई भी चुन सकते हैं। हमें  <a href="tel:18001025551">18001025551</a> पर कॉल करें।`,
        [Language.Marathi]: "?????",
    },
    dealerLocatorPageFAQQ2Q: {
        [Language.English]: "Will a dealer help me in installation?",
        [Language.Hindi]: "क्या कोई डीलर इंस्टालेशन में मेरी मदद करेगा?",
        [Language.Marathi]: "?????",
    },
    dealerLocatorPageFAQQ2A: {
        [Language.English]: `It depends on dealer to dealer. Most of our channel partners provide installation services at their end. If you face any problem, you can reach out to our service team, LivServ at <a href="tel:18001025551">18001025551</a>`,
        [Language.Hindi]: `यह डीलर से डीलर पर निर्भर करता है। हमारे अधिकांश चैनल पार्टनर अपनी ओर से इंस्टालेशन सेवाएं प्रदान करते हैं। यदि आपको कोई समस्या आती है, तो आप <a href="tel:18001025551">18001025551</a> पर हमारी सर्विस टीम, लिवसर्व से संपर्क कर सकते हैं।`,
        [Language.Marathi]: "?????",
    },
    dealerLocatorPageFAQQ3Q: {
        [Language.English]: "How can I become a partner with Livguard?",
        [Language.Hindi]: "मैं लिवगार्ड का पार्टनर कैसे बन सकता हूं?",
        [Language.Marathi]: "?????",
    },
    dealerLocatorPageFAQQ3A: {
        [Language.English]: `We are pleased to know that you want to join us on our growth journey. Please share your details like name, contact number, pin code, city, state to our official mail id- <a href="mailto:marketing@livguard.com">marketing@livguard.com</a>. You will hear from us soon.`,
        [Language.Hindi]: `हमें यह जानकर प्रसन्नता हुई कि आप हमारी विकास यात्रा में हमारे साथ जुड़ना चाहते हैं। कृपया अपना विवरण जैसे नाम, संपर्क नंबर, पिन कोड, शहर, राज्य हमारे आधिकारिक मेल आईडी-<a href="mailto:marketing@livguard.com"> marketing@livguard.com</a> पर साझा करें। हम आपसे जल्द से जल्द संपर्क करेंगे।`,
        [Language.Marathi]: "?????",
    },
    dealerLocatorPageFAQQ4Q: {
        [Language.English]: "What if my nearby dealer is not open or is not answering to my request?",
        [Language.Hindi]: "क्या होगा यदि मेरा नजदीकी डीलर खुला नहीं है या मेरे अनुरोध का उत्तर नहीं दे रहा है?",
        [Language.Marathi]: "?????",
    },
    dealerLocatorPageFAQQ4A: {
        [Language.English]: `In case you are unable to connect with your nearby Livguard dealer, you can reach out to us on our sales number <a href="tel:9205667999">9205667999</a>. We are always happy to help and prioritise your comfort above all`,
        [Language.Hindi]: `यदि आप अपने नजदीकी लिवगार्ड डीलर से जुड़ने में असमर्थ हैं, तो आप हमारे बिक्री नंबर <a href="tel:9205667999">9205667999</a> पर हमसे संपर्क कर सकते हैं।`,
        [Language.Marathi]: "?????",
    },
    dealerLocatorPageFAQQ5Q: {
        [Language.English]: "How can I file a service request?",
        [Language.Hindi]: "मैं सेवा अनुरोध कैसे दर्ज कर सकता हूं?",
        [Language.Marathi]: "?????",
    },
    dealerLocatorPageFAQQ5A: {
        [Language.English]: `In order to file a service request for your Livguard inverter or inverter battery, you can reach out to the dealer. If that doesn’t work, you can reach out to our service team at <a href="tel:18001025551">18001025551</a> and we will help you out.`,
        [Language.Hindi]: `अपने लिवगार्ड इन्वर्टर या इन्वर्टर बैटरी के लिए सेवा अनुरोध दर्ज करने के लिए, आप डीलर से संपर्क कर सकते हैं। यदि वह काम नहीं करता है, तो आप <a href="tel:18001025551">18001025551</a> पर हमारी सेवा टीम से संपर्क कर सकते हैं और हम आपकी मदद करेंगे।`,
        [Language.Marathi]: "?????",
    },
    landingPage1Q1Q: {
        [Language.English]: "Which inverter battery is best for my use?",
        [Language.Hindi]: "मेरे उपयोग के लिए कौन सी इन्वर्टर बैटरी सबसे अच्छी है?",
        [Language.Marathi]: "?????",
    },
    landingPage1Q1A: {
        [Language.English]: `Livguard's <a href="/load-calculator" class="tw-underline">Power Planner</a>, a Load Calculator tool helps you find the best inverter battery for your energy needs. Trust Livguard for superior performance and durability.`,
        [Language.Hindi]: `लिवगार्ड का <a href="/load-calculator" class="tw-underline">पावर प्लानर</a>, एक लोड कैलकुलेटर टूल आपको आपकी ऊर्जा आवश्यकताओं के लिए सबसे अच्छी इन्वर्टर बैटरी ढूंढने में मदद करता है। उत्कृष्ट प्रदर्शन और लंबे जीवन के लिए लिवगार्ड पर भरोसा करें।`,
        [Language.Marathi]: "?????",
    },
    landingPage1Q2Q: {
        [Language.English]: "How to connect inverter to battery ?",
        [Language.Hindi]: " इनवर्टर को बैटरी से कैसे कनेक्ट करें?",
        [Language.Marathi]: "?????",
    },
    landingPage1Q2A: {
        [Language.English]: `Connecting an inverter to a battery is a simple process of ensuring compatibility, connecting the cables, and testing. <a href="/category/batteries" class="tw-underline">Livguard Inverter Batteries</a> are designed for seamless compatibility and superior performance, ensuring reliable and uninterrupted power supply for your home or office.`,
        [Language.Hindi]: `इनवर्टर को बैटरी से कनेक्ट करना एक सरल प्रक्रिया है जिसमें संगतता की सुनिश्चितता, केबल कनेक्शन और टेस्टिंग शामिल होती है। <a href="/category/batteries" class="tw-underline">लिवगार्ड इन्वर्टर बैटरी</a> सुविधाजनक संगतता और बेहतर प्रदर्शन के लिए डिज़ाइन की गई हैं, जो आपके घर या ऑफिस के लिए विश्वसनीय और अविराम बिजली आपूर्ति सुनिश्चित करती हैं।`,
        [Language.Marathi]: "?????",
    },
    landingPage1Q3Q: {
        [Language.English]: "Which inverter is best for home?",
        [Language.Hindi]: "कौन सा इन्वर्टर घर के लिए सबसे अच्छा है?",
        [Language.Marathi]: "?????",
    },
    landingPage1Q3A: {
        [Language.English]: `When it comes to selecting the best inverter for your home, Livguard Inverter is the top choice. Use our <a href="/load-calculator" class="tw-underline">Power Planner</a>, your personal load calculator to find the right inverter for you.`,
        [Language.Hindi]: `जब आपके घर के लिए सर्वश्रेष्ठ इन्वर्टर चुनने की बात आती है, तो लिवगार्ड इन्वर्टर शीर्ष विकल्प है। आपके लिए सही इन्वर्टर खोजने के लिए हमारे <a href="/load-calculator" class="tw-underline">पावर प्लानर</a>, आपके व्यक्तिगत लोड कैलकुलेटर का उपयोग करें।`,
        [Language.Marathi]: "?????",
    },
    landingPage1Q4Q: {
        [Language.English]: "Are inverters for the home and the office different? ",
        [Language.Hindi]: "क्या घर और ऑफिस के लिए इनवर्टर अलग-अलग हैं?",
        [Language.Marathi]: "?????",
    },
    landingPage1Q4A: {
        [Language.English]: `Inverters are the same for both homes and offices, however, their capacities differ based on power needs & backup required. Whether you need an inverter for your home or business, Livguard has a variety of <a href="/category/inverters" class="tw-underline">quality and durable options</a> to choose from.`,
        [Language.Hindi]: `इन्वर्टर घरों और कार्यालयों दोनों के लिए समान हैं, हालांकि, बिजली की जरूरतों और आवश्यक बैकअप के आधार पर उनकी क्षमता भिन्न होती है। चाहे आपको अपने घर या व्यवसाय के लिए इन्वर्टर की आवश्यकता हो, लिवगार्ड के पास चुनने के लिए कई प्रकार के <a href="/category/inverters" class="tw-underline">विकल्प</a> हैं।`,
        [Language.Marathi]: "?????",
    },
    landingPage1Q5Q: {
        [Language.English]: "How does the Power Planner work?",
        [Language.Hindi]: "मेरे उपयोग के लिए कौन सी इन्वर्टर बैटरी सबसे अच्छी है?",
        [Language.Marathi]: "?????",
    },
    landingPage1Q5A: {
        [Language.English]: `The Livguard Power Planner is a personalised Load Calculator that suggests you the best Livguard Inverter and Inverter Battery based on devices you choose, backup hours needed, and average power use. It guarantees reliable power backup solution for your home.`,
        [Language.Hindi]: `लिवगार्ड का पावर प्लानर, एक लोड कैलकुलेटर टूल आपको आपकी ऊर्जा आवश्यकताओं के लिए सबसे अच्छी इन्वर्टर बैटरी ढूंढने में मदद करता है। उत्कृष्ट प्रदर्शन और लंबे जीवन के लिए लिवगार्ड पर भरोसा करें।`,
        [Language.Marathi]: "?????",
    },
    landingPage2Q1Q: {
        [Language.English]: "How to check inverter battery health ?",
        [Language.Hindi]: "इन्वर्टर बैटरी की स्वास्थ्य की जाँच कैसे करें?",
        [Language.Marathi]: "?????",
    },
    landingPage2Q1A: {
        [Language.English]: `To check your inverter battery's health, disconnect it from the inverter and measure its voltage using a multimeter. <a href="/category/batteries" class="tw-underline"> Livguard Inverter Batteries</a>are designed with advanced technology and undergo rigorous testing, ensuring long-lasting durability and superior performance for reliable and uninterrupted power supply at home or office.`,
        [Language.Hindi]: `इन्वर्टर बैटरी की स्वास्थ्य जांचने के लिए, इसे इनवर्टर से डिस्कनेक्ट करें और मल्टीमीटर का उपयोग करके उसकी वोल्टेज मापें। <a href="/category/batteries" class="tw-underline">लिवगार्ड इन्वर्टर बैटरी</a> उन्नत तकनीक के साथ डिज़ाइन की गई हैं और कड़ी मेहनत से टेस्ट की जाती हैं, इससे आपको घर या ऑफिस के लिए दुर्लभ और अविराम बिजली आपूर्ति के लिए दृढ़ और बेहतर प्रदर्शन का विश्वास होगा।`,
        [Language.Marathi]: "?????",
    },
    landingPage2Q2Q: {
        [Language.English]: "How many home appliances can I run on a home inverter?",
        [Language.Hindi]: " होम इन्वर्टर पर मैं कितने घरेलू उपकरण चला सकता हूँ?",
        [Language.Marathi]: "?????",
    },
    landingPage2Q2A: {
        [Language.English]: `The number of home appliances a <a href="/category/inverters" class="tw-underline">Livguard Inverter</a> can run depends on its capacity and power consumption. Livguard offers a wide range of inverters with different capacities that are suitable for various applications of your daily use.`,
        [Language.Hindi]: `<a href="/category/inverters" class="tw-underline">लिवगार्ड इन्वर्टर</a> कितने घरेलू उपकरणों को चला सकता है, यह इसकी क्षमता और बिजली की खपत पर निर्भर करता है। लिवगार्ड विभिन्न क्षमताओं वाले इनवर्टर की एक विस्तृत श्रृंखला प्रदान करता है जो आपके दैनिक उपयोग के विभिन्न अनुप्रयोगों के लिए उपयुक्त हैं।`,
        [Language.Marathi]: "?????",
    },
    landingPage2Q3Q: {
        [Language.English]: "What is sine wave inverter?",
        [Language.Hindi]: "साइन वेव इन्वर्टर क्या होता है?",
        [Language.Marathi]: "?????",
    },
    landingPage2Q3A: {
        [Language.English]: `A sine wave inverter produces a smooth & consistent electrical output which is essential for powering electronics like computers, TVs, and other household appliances. Choose <a href="/category/inverters" class="tw-underline">Livguard's Pure Sine wave inverters</a> for smooth backup.`,
        [Language.Hindi]: `एक साइन वेव इन्वर्टर एक सुचारू और सुसंगत विद्युत उत्पादन उत्पन्न करता है जो कंप्यूटर, टीवी और अन्य घरेलू उपकरणों जैसे इलेक्ट्रॉनिक्स को शक्ति प्रदान करने के लिए आवश्यक है। बिना रुकावट बैकअप के लिए <a href="/category/inverters" class="tw-underline">लिवगार्ड के प्योर साइन वेव इनवर्टर</a> चुनें।`,
        [Language.Marathi]: "?????",
    },
    landingPage2Q4Q: {
        [Language.English]: "How to connect inverter to battery ? ",
        [Language.Hindi]: " इनवर्टर को बैटरी से कैसे कनेक्ट करें?",
        [Language.Marathi]: "?????",
    },
    landingPage2Q4A: {
        [Language.English]: `Connecting an inverter to a battery is a simple process of ensuring compatibility, connecting the cables, and testing. <a href="/category/batteries" class="tw-underline">Livguard Inverter Batteries</a> are designed for seamless compatibility and superior performance, ensuring a reliable and uninterrupted power supply for your home or office.`,
        [Language.Hindi]: `इनवर्टर को बैटरी से कनेक्ट करना एक सरल प्रक्रिया है जिसमें संगतता की सुनिश्चितता, केबल कनेक्शन और टेस्टिंग शामिल होती है। <a href="/category/batteries" class="tw-underline">लिवगार्ड इन्वर्टर बैटरी</a> सुविधाजनक संगतता और बेहतर प्रदर्शन के लिए डिज़ाइन की गई हैं, जो आपके घर या ऑफिस के लिए विश्वसनीय और अविराम बिजली आपूर्ति सुनिश्चित करती हैं।`,
        [Language.Marathi]: "?????",
    },
    landingPage2Q5Q: {
        [Language.English]: "How to select the right inverter and inverter battery for my home?",
        [Language.Hindi]: "अपने घर के लिए सही इनवर्टर और इनवर्टर बैटरी का चयन कैसे करें?",
        [Language.Marathi]: "?????",
    },
    landingPage2Q5A: {
        [Language.English]: `Selecting the right inverter and battery for your home is essential for uninterrupted power backup during outages. With the <a href="/category/load-calculator" class="tw-underline">Livguard Power Planner</a> you can easily select the perfect combination based on your property type, appliances, and budget.`,
        [Language.Hindi]: `अपवाद के दौरान अविराम बिजली बैकअप के लिए सही इनवर्टर और बैटरी चुनना आपके घर के लिए आवश्यक है। <a href="/category/load-calculator" class="tw-underline">लिवगार्ड पावर प्लानर</a> के साथ आप अपनी संपत्ति के प्रकार, उपकरणों और बजट के आधार पर सही कंबिनेशन का आसानी से चयन कर सकते हैं।`,
        [Language.Marathi]: "?????",
    },
    landingPage3Q1Q: {
        [Language.English]: "How can I file a service request?",
        [Language.Hindi]: "मैं सेवा अनुरोध कैसे दर्ज कर सकता हूं?",
        [Language.Marathi]: "?????",
    },
    landingPage3Q1A: {
        [Language.English]: `In order to file a service request for your Livguard inverter or inverter battery, you can reach out to the dealer. If that doesn’t work, you can reach out to our service team at <a href="tel:18001025551">18001025551</a> and we will help you out.`,
        [Language.Hindi]: `अपने लिवगार्ड इन्वर्टर या इन्वर्टर बैटरी के लिए सेवा अनुरोध दर्ज करने के लिए, आप डीलर से संपर्क कर सकते हैं। यदि वह काम नहीं करता है, तो आप <a href="tel:18001025551">18001025551</a> पर हमारी सेवा टीम से संपर्क कर सकते हैं और हम आपकी मदद करेंगे।`,
        [Language.Marathi]: "?????",
    },
    landingPage3Q2Q: {
        [Language.English]: "Can I avail financing options as a customer at these dealers locations?",
        [Language.Hindi]: "क्या मैं इन डीलर स्थानों पर वित्त के विकल्प का लाभ उठा सकता हूँ?",
        [Language.Marathi]: "?????",
    },
    landingPage3Q2A: {
        [Language.English]: `Yes, Livguard has multiple financing opportunities available for our consumers for their ease. We are in partnership with Bajaj Finance and Paytail and consumers can choose any of the two options for the same. Call us at <a href="tel:18001025551">18001025551</a>`,
        [Language.Hindi]: `हां, लिवगार्ड के पास हमारे उपभोक्ताओं के लिए उनकी आसानी के लिए वित्तपोषण के कई अवसर उपलब्ध हैं। हम बजाज फाइनेंस और पे टेल के साथ साझेदारी कर रहे हैं और उपभोक्ता इसके लिए दो विकल्पों में से कोई भी चुन सकते हैं। हमें  <a href="tel:18001025551">18001025551</a> पर कॉल करें।`,
        [Language.Marathi]: "?????",
    },
    landingPage3Q3Q: {
        [Language.English]: "Will a dealer help me in installation?",
        [Language.Hindi]: "क्या कोई डीलर इंस्टालेशन में मेरी मदद करेगा?",
        [Language.Marathi]: "?????",
    },
    landingPage3Q3A: {
        [Language.English]: `It depends on dealer to dealer. Most of our channel partners provide installation services at their end. If you face any problem, you can reach out to our service team, LivServ at <a href="tel:18001025551">18001025551</a>`,
        [Language.Hindi]: `यह डीलर से डीलर पर निर्भर करता है। हमारे अधिकांश चैनल पार्टनर अपनी ओर से इंस्टालेशन सेवाएं प्रदान करते हैं। यदि आपको कोई समस्या आती है, तो आप <a href="tel:18001025551">18001025551</a> पर हमारी सर्विस टीम, लिवसर्व से संपर्क कर सकते हैं।`,
        [Language.Marathi]: "?????",
    },
    landingPage3Q4Q: {
        [Language.English]: "How to select the right inverter and inverter battery for my home?",
        [Language.Hindi]: "अपने घर के लिए सही इनवर्टर और इनवर्टर बैटरी का चयन कैसे करें?",
        [Language.Marathi]: "?????",
    },
    landingPage3Q4A: {
        [Language.English]: `Selecting the right inverter and battery for your home is essential for uninterrupted power backup during outages. With the <a href="/load-calculator">Livguard Power Planner</a> you can easily select the perfect combination based on your property type, appliances, and budget.`,
        [Language.Hindi]: `अपवाद के दौरान अविराम बिजली बैकअप के लिए सही इनवर्टर और बैटरी चुनना आपके घर के लिए आवश्यक है। <a href="/load-calculator">लिवगार्ड पावर प्लानर</a> के साथ आप अपनी संपत्ति के प्रकार, उपकरणों और बजट के आधार पर सही कंबिनेशन का आसानी से चयन कर सकते हैं।`,
        [Language.Marathi]: "?????",
    },
    landingPage3Q5Q: {
        [Language.English]: "What Are the Benefits of Buying an Inverter with Battery of the same brand?",
        [Language.Hindi]: "एक ही ब्रांड के इनवर्टर और बैटरी खरीदने के क्या फायदे होते हैं?",
        [Language.Marathi]: "?????",
    },
    landingPage3Q5A: {
        [Language.English]: `Buying an inverter and battery of the same brand, like Livguard Inverter Battery, ensures compatibility and reliability. Use the <a href="/load-calculator">Livguard Power Planner</a> to choose the perfect combination based on your needs and budget.`,
        [Language.Hindi]: `एक ही ब्रांड के इनवर्टर और बैटरी खरीदने से, जैसे लिवगार्ड इनवर्टर  बैटरी, आपको संगतता और विश्वसनीयता की आश्वासन होता है। <a href="/load-calculator">लिवगार्ड पावर प्लानर</a> आपकी आवश्यकताओं और बजट के आधार पर सही कंबिनेशन का चयन करने में मदद कर सकता है।`,
        [Language.Marathi]: "?????",
    },

    "propertyType-1-bhk": {
        [Language.English]: "1 BHK",
        [Language.Hindi]: "1 BHK",
        [Language.Marathi]: "?????",
    },
    "propertyType-2-bhk": {
        [Language.English]: "2 BHK",
        [Language.Hindi]: "2 BHK",
        [Language.Marathi]: "?????",
    },
    "propertyType-3-bhk": {
        [Language.English]: "3 BHK",
        [Language.Hindi]: "3 BHK",
        [Language.Marathi]: "?????",
    },
    "propertyType-4-bhk": {
        [Language.English]: "4 BHK",
        [Language.Hindi]: "4 BHK",
        [Language.Marathi]: "?????",
    },
    "propertyType-villa": {
        [Language.English]: "Villa",
        [Language.Hindi]: "विला",
        [Language.Marathi]: "?????",
    },
    "propertyType-custom": {
        [Language.English]: "Custom",
        [Language.Hindi]: "कस्टम",
        [Language.Marathi]: "?????",
    },

    "?????": {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },

    invalidKey: {
        [Language.English]: "INVALID STRING REQUESTED",
        [Language.Hindi]: "INVALID STRING REQUESTED",
        [Language.Marathi]: "INVALID STRING REQUESTED",
    },
};
