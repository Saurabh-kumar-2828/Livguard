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
        [Language.English]: "Customer Care: 18001025551",
        [Language.Hindi]: "ग्राहक सेवा: १८००१०२५५५१",
        [Language.Marathi]: "?????",
    },
    headerS2T1: {
        [Language.English]: "Search",
        [Language.Hindi]: "यहाँ खोजें",
        [Language.Marathi]: "?????",
    },

    headerMenuS1T1: {
        [Language.English]: "Inverters",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    headerMenuS1T2: {
        [Language.English]: "Batteries",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    headerMenuS1T3: {
        [Language.English]: "Automotive Batteries",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    headerMenuS1T4: {
        [Language.English]: "Solar Solutions",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    headerMenuS1T5: {
        [Language.English]: "Accessories",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    headerMenuS1T6: {
        [Language.English]: "More",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    headerMenuS2T1: {
        [Language.English]: "Contact Us",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    headerMenuSM1T1: {
        [Language.English]: "Inverter",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    headerMenuSM1T2: {
        [Language.English]: "Home Inverters",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    headerMenuSM1T3: {
        [Language.English]: "Solar Inverter",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    headerMenuSM1T4: {
        [Language.English]: "High Capacity Inverters",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    headerMenuSM2T1: {
        [Language.English]: "Batteries",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    headerMenuSM2T2: {
        [Language.English]: "Inverter Batteries",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    headerMenuSM2T3: {
        [Language.English]: "Solar Batteries",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    headerMenuSM2T4: {
        [Language.English]: "Lithium Batteries",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    headerMenuSM2T5: {
        [Language.English]: "VRLA Batteries",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    headerMenuSM3T1: {
        [Language.English]: "Automotive Batteries",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    headerMenuSM3T2: {
        [Language.English]: "Car and SUV Batteries",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    headerMenuSM3T3: {
        [Language.English]: "Two Wheeler Batteries",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    headerMenuSM3T4: {
        [Language.English]: "E-Rikshaw Batteries",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    headerMenuSM3T5: {
        [Language.English]: "Bus & Truck Batteries",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    headerMenuSM3T6: {
        [Language.English]: "Tractor Batteries",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    headerMenuSM3T7: {
        [Language.English]: "Three Wheeler Batteries",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    headerMenuSM4T1: {
        [Language.English]: "Solar Solutions",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    headerMenuSM5T1: {
        [Language.English]: "Accessories",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    headerMenuSM5T2: {
        [Language.English]: "Stabilizer",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    headerMenuSM5T3: {
        [Language.English]: "E-Rikshaw Charger",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    headerMenuSM5T4: {
        [Language.English]: "Inverter Trolley",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    headerMenuSM6T1: {
        [Language.English]: "More",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    headerMenuSM6T2: {
        [Language.English]: "Locate Dealer",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    headerMenuSM6T3: {
        [Language.English]: "Register Your Product",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },

    homeS1T1: {
        [Language.English]: "Energy Unlimited",
        [Language.Hindi]: "असीमित ऊर्जा",
        [Language.Marathi]: "?????",
    },
    homeS1T2: {
        [Language.English]: "For a Constantly Evolving World",
        [Language.Hindi]: "बदलते भारत के लिए",
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
        [Language.Hindi]: "अतुल्य सेवाएँ",
        [Language.Marathi]: "?????",
    },
    homeS2C1T2: {
        [Language.English]:
            "With a PAN India presence with 40+ service centers, Livguard is just one call away to cater to your energy storage related needs. We always keep your product satisfaction as our priority, and empower you with unlimited energy.",
        [Language.Hindi]: "पूरे भारत में मौजूद 40+ सेवा केंद्रों के साथ लिवगार्ड आपकी असुविधाओं को दूर करने के लिए हमेशा एक कॉल दूर है। आपकी संतुष्टि हमारे लिए हमेशा सबसे महत्त्वपूर्ण है।",
        [Language.Marathi]: "?????",
    },
    homeS2C2T1: {
        [Language.English]: "Excelling Manufacturing",
        [Language.Hindi]: "श्रेष्ठ उत्पादन",
        [Language.Marathi]: "?????",
    },
    homeS2C2T2: {
        [Language.English]:
            "Livguard leaves no crumbs when it comes to perfecting their manufacturing processes. With our expertise of over 35 years in battery making, we work to deliver quality products, every time.",
        [Language.Hindi]:
            "लिवगार्ड अपनी उत्पादन प्रक्रियाओं को सर्वश्रेष्ठ बनाने में कोई कसर नहीं छोड़ता। हमारे 35+ वर्षों के अनुभव के साथ, हम ग्राहकों तक हमेशा अति-उत्तम समाधान पहुँचाने का प्रयत्न करते हैं।",
        [Language.Marathi]: "?????",
    },
    homeS3H1T1: {
        [Language.English]: "Experience Our",
        [Language.Hindi]: `<span class=\"lg-text-highlighted\">असीमित ऊर्जा</span> के`,
        [Language.Marathi]: "?????",
    },
    homeS3H1T2: {
        [Language.English]: `<span class=\"lg-text-highlighted\">Energy Solutions</span>`,
        [Language.Hindi]: "अनुभव का हिस्सा बनिये",
        [Language.Marathi]: "?????",
    },
    homeS3Tab1H: {
        [Language.English]: "Automotive Batteries",
        [Language.Hindi]: "वाहन की बैटरी",
        [Language.Marathi]: "?????",
    },
    homeS3Tab1HC1: {
        [Language.English]: "Energy Solutions",
        [Language.Hindi]: "ऊर्जा समाधान",
        [Language.Marathi]: "?????",
    },
    homeS3Tab1HC2: {
        [Language.English]: "Automotive Batteries",
        [Language.Hindi]: "वाहन की बैटरी",
        [Language.Marathi]: "?????",
    },
    homeS3Tab1C: {
        [Language.English]: "Experience limitless energy with our wide range range of automotive batteries, made to empower your fast-paced lifestyle with high performing products.",
        [Language.Hindi]:
            "ऑटोमोटिव बैटरियों की हमारी विस्तृत श्रृंखला के साथ असीमित ऊर्जा का अनुभव करें, जो उच्च प्रदर्शन वाले उत्पादों के साथ आपकी तेज़-तर्रार जीवन शैली को सशक्त बनाने के लिए बनाई गई है।",
        [Language.Marathi]: "?????",
    },
    homeS3Tab1BT: {
        [Language.English]: "Explore Batteries",
        [Language.Hindi]: "बैटरी देखें",
        [Language.Marathi]: "?????",
    },
    homeS3Tab2H: {
        [Language.English]: "Home Inverters",
        [Language.Hindi]: "घर के इन्वर्टर",
        [Language.Marathi]: "?????",
    },
    homeS3Tab2HC1: {
        [Language.English]: "Energy Solutions",
        [Language.Hindi]: "ऊर्जा समाधान",
        [Language.Marathi]: "?????",
    },
    homeS3Tab2HC2: {
        [Language.English]: "Home Inverters",
        [Language.Hindi]: "घर के इन्वर्टर",
        [Language.Marathi]: "?????",
    },
    homeS3Tab2C: {
        [Language.English]:
            "Visit our range of home inverters with sleek design made to bring unlimited flow of energy to your home. Backed by its sturdy build, pick the one that suits your home the best.",
        [Language.Hindi]:
            "आपके घर में ऊर्जा का असीमित प्रवाह लाने के लिए आकर्षक बनावट वाले होम इनवर्टर की हमारी श्रेणी पर जाएं। इसके मजबूत निर्माण के साथ, वह चुनें जो आपके घर के लिए सबसे उपयुक्त हो।",
        [Language.Marathi]: "?????",
    },
    homeS3Tab2BT: {
        [Language.English]: "Explore Inverters",
        [Language.Hindi]: "इनवर्टर देखें",
        [Language.Marathi]: "?????",
    },
    homeS3Tab3H: {
        [Language.English]: "Inverter Batteries",
        [Language.Hindi]: "इन्वर्टर बैटरी",
        [Language.Marathi]: "?????",
    },
    homeS3Tab3HC1: {
        [Language.English]: "Energy Solutions",
        [Language.Hindi]: "ऊर्जा समाधान",
        [Language.Marathi]: "?????",
    },
    homeS3Tab3HC2: {
        [Language.English]: "Inverter Batteries",
        [Language.Hindi]: "इन्वर्टर बैटरी",
        [Language.Marathi]: "?????",
    },
    homeS3Tab3C: {
        [Language.English]: "With industry’s first 3D grid technology, our range of inverter batteries are manufactured to meet the power backup requirements of your family efficiently.",
        [Language.Hindi]: "उद्योग की सबसे पहली 3डी ग्रिड तकनीक के साथ, हमारी इन्वर्टर बैटरी की श्रेणी आपके परिवार की पावर बैकअप आवश्यकताओं को कुशलतापूर्वक पूरा करने के लिए निर्मित की जाती है।",
        [Language.Marathi]: "?????",
    },
    homeS3Tab3BT: {
        [Language.English]: "Explore Batteries",
        [Language.Hindi]: "बैटरी देखें",
        [Language.Marathi]: "?????",
    },
    homeS3Tab4H: {
        [Language.English]: "Solar Solutions",
        [Language.Hindi]: "सौर समाधान",
        [Language.Marathi]: "?????",
    },
    homeS3Tab4HC1: {
        [Language.English]: "Energy Solutions",
        [Language.Hindi]: "ऊर्जा समाधान",
        [Language.Marathi]: "?????",
    },
    homeS3Tab4HC2: {
        [Language.English]: "Solar Solutions",
        [Language.Hindi]: "सौर समाधान",
        [Language.Marathi]: "?????",
    },
    homeS3Tab4C: {
        [Language.English]:
            "Solutions made to fit your specific needs, precisely. We are the experts in Solar Rooftop Solutions, which equip us to always bring the best in class products for your needs.",
        [Language.Hindi]:
            "आपकी विशिष्ट आवश्यकताओं को पूरा करने के लिए लाये गये सटीक समाधान। हम सोलर रूफटॉप समाधान के विशेषज्ञ हैं, जो हमें हमेशा आपकी जरूरतों के लिए श्रेणी में सर्वश्रेष्ठ उत्पाद लाने के लिए तैयार करते हैं।",
        [Language.Marathi]: "?????",
    },
    homeS3Tab4BT: {
        [Language.English]: "Explore Solar",
        [Language.Hindi]: "सौर देखें",
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
        [Language.English]: "Take Charge of Your Energy",
        [Language.Hindi]: "अपनी ऊर्जा ज़रूरतों को जानें",
        [Language.Marathi]: "?????",
    },
    homeS5H1T2: {
        [Language.English]: `With Our <span class=\"lg-text-highlighted\">Power Planner</span>`,
        [Language.Hindi]: `हमारे <span class=\"lg-text-highlighted\">पावर प्लानर</span> के साथ`,
        [Language.Marathi]: "?????",
    },
    homeS5T2: {
        [Language.English]: "Get tailored power solutions, use our Power Planner to find the right inverter and inverter battery options for your home.",
        [Language.Hindi]: "आपकी ज़रूरत के अनुसार समाधान पायें। हमारे पावर प्लानर का इस्तेमाल कर के अपने घर के लिए सही इन्वर्टर और इन्वर्टर बैटरी चुनें",
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
        [Language.Hindi]: "अपने घर का आकार चुनें",
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
        [Language.Hindi]: "अपने घर का आकार चुनें",
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
        [Language.Hindi]: `<span class=\"lg-text-highlighted\">सोलर रूफटॉप सलूशन</span> में`,
        [Language.Marathi]: "?????",
    },
    homeS7T2: {
        [Language.English]: "Powered by passion and fuelled by innovation, we have established ourself as the experts in the Solar Energy Solutions sector.",
        [Language.Hindi]: "आधुनिकता से प्रेरित और जुनून लेकर हम्मे ख़ुद को सौर ऊर्जा समाधानों के क्षेत्र में विशेषज्ञों के रूप में स्थापित किया है।",
        [Language.Marathi]: "?????",
    },
    homeS7T3: {
        [Language.English]: "With Livguard Solar, Get",
        [Language.Hindi]: "लिवगार्ड सौर ऊर्जा के साथ पाइए",
        [Language.Marathi]: "?????",
    },
    homeS7T4: {
        [Language.English]: "Tap Into Solar",
        [Language.Hindi]: "सौर ऊर्जा अनुभव करें",
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
            "एक मार्गदर्शक , एक संरक्षक, एक दूरदर्शी, और एक समग्र प्रेरक शक्ति, श्री राकेश मल्होत्रा ​​​​का उद्योग के संपर्क में, उनका जुनून और नए विचारों को जीवन में लाने की उनकी भावना कई अन्य उद्यमियों को प्रेरित करती रही है।",
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
            "SAR समूह के मुख्य स्तंभों में से एक और सच्चे उद्यमिता की पहचान, श्री नवनीत कपूर अपनी विशेषज्ञता और विश्वास के माध्यम से लिवगार्ड की प्रमुख ताकतों में से एक रहे हैं। उनका मानना है कि एक सफल व्यवसाय तब फलता-फूलता है जब उद्योग विशेषज्ञता के साथ उत्कृष्ट सेवा मिलती है।",
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
            "मार्केटिंग, बिक्री और रणनीति में वैश्विक अनुभव के साथ बी2बी और बी2सी चैनलों में 25 से अधिक वर्षों के अनुभव के साथ एक मार्गदर्शकों। श्री गुरप्रीत भाटिया एक उदाहरण हैं, जिसने एक अद्वितीय करियर मार्ग बनाया है।",
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
        [Language.English]: "What are inverter batteries and how do they operate?",
        [Language.Hindi]: "इन्वर्टर बैटरी क्या हैं और वे कैसे काम करती हैं?",
        [Language.Marathi]: "?????",
    },
    homeS9Q1A: {
        [Language.English]: "The inverter/UPS receives electrical energy in the form of stored chemical energy from the inverter batteries, and the other way around.",
        [Language.Hindi]: "इन्वर्टर / यूपीएस इन्वर्टर बैटरी से संग्रहीत रासायनिक ऊर्जा के रूप में विद्युत ऊर्जा प्राप्त करता है, और दूसरी तरफ।",
        [Language.Marathi]: "?????",
    },
    homeS9Q2Q: {
        [Language.English]: "How can I choose the best inverter battery for my home?",
        [Language.Hindi]: "अपने घर हेतु सर्वेश्रेष्ठ इन्वर्टर का चुनाव कैसे करे?",
        [Language.Marathi]: "?????",
    },
    homeS9Q2A: {
        [Language.English]: "This is dependent on how much power you need at home. All of your appliances can use Livguard inverters, which are created to meet their demands.",
        [Language.Hindi]: "यह इस बात पर निर्भर है कि आपको घर में कितनी बिजली की जरूरत है। आपके सभी उपकरण लिवगार्ड इनवर्टर का उपयोग कर सकते हैं, जो उनकी मांगों को पूरा करने के लिए बनाए गए हैं।",
        [Language.Marathi]: "?????",
    },
    homeS9Q3Q: {
        [Language.English]: "How much backup time can my inverter battery provide?",
        [Language.Hindi]: "मेरी इन्वर्टर बैटरी कितना बैकअप समय प्रदान कर सकती है?",
        [Language.Marathi]: "?????",
    },
    homeS9Q3A: {
        [Language.English]:
            "A battery's capacity for charging is expressed in ampere hours (Ah). An inverter battery's capacity is 1Ah if it can deliver 1 amp of electricity for 1 hour. The battery's capacity is 100Ah if it can deliver one amp of electricity for 100 hours. By calculating the load requirements by the number of hours of backup you require, you may determine the amount of inverter battery capacity needed for your home.",
        [Language.Hindi]:
            "चार्ज करने के लिए बैटरी की क्षमता एम्पीयर घंटे (आह) में व्यक्त की जाती है। एक इन्वर्टर बैटरी की क्षमता 1Ah है यदि यह 1 घंटे के लिए 1 amp बिजली दे सकती है। बैटरी की क्षमता सौAh है अगर यह सौ घंटे के लिए एक  एम्पेयर बिजली दे सकती है। आपके द्वारा आवश्यक बैकअप के घंटों की संख्या से लोड आवश्यकताओं की गणना करके, आप अपने घर के लिए आवश्यक इन्वर्टर बैटरी क्षमता की मात्रा निर्धारित कर सकते हैं।",
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
        [Language.Hindi]: "सेवा समाधान की खोज में?",
        [Language.Marathi]: "?????",
    },
    homeS9T3P2: {
        [Language.English]: "Contact us at",
        [Language.Hindi]: "सेवा समाधान की खोज में? हम सप्ताह के सभी दिन सुबह 8 बजे से रात 8 बजे के बीच",
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
        [Language.Hindi]: "ग्रहकों के लिए",
        [Language.Marathi]: "?????",
    },
    landingPage1S3Slide3Body: {
        [Language.English]:
            "With our well-rooted service network of over 40 service centers and availability of products across 21000+ pin codes, we are always ready to serve you with your problems as and when you need us.",
        [Language.Hindi]: "21000 पिन कोड में उपस्थित हमारे उत्पाद और सेवा केंद्रों के साथ हम हमेशा आपकी समस्याओं को मिटाने के लिए तैयार रहते हैं।",
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
        [Language.Hindi]: "सेवा केंद्र",
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
        [Language.Hindi]: "इन्वर्टर और बैटरी की",
        [Language.Marathi]: "?????",
    },
    landingPage2S4HT2: {
        [Language.English]: `With Our Top <span class="lg-text-highlighted">Jodis</span>`,
        [Language.Hindi]: `बेहतरीन <span class="lg-text-highlighted">जोड़ियाँ</span> आपके लिए`,
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
        [Language.English]: "The Urban Combo",
        [Language.Hindi]: "अर्बन कॉम्बो",
        [Language.Marathi]: "?????",
    },
    landingPage2S4J1Description: {
        [Language.English]:
            "A perfect combo to match the needs of your urban lifestyle, efficiently. With pure sine wave output and smart AI charging, this jodi can go on for hours and deliver a high backup.",
        [Language.Hindi]:
            "आपकी शहरी जीवन शैली की जरूरतों को कुशलता से पूरा करने के लिए एक आदर्श कॉम्बो। शुद्ध साइन वेव आउटपुट और स्मार्ट एआई चार्जिंग के साथ, यह जोड़ी घंटों तक चल सकती है और उच्च बैकअप प्रदान करती है।",
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
        [Language.English]: "The Rural Combo",
        [Language.Hindi]: " रूरल कॉम्बो",
        [Language.Marathi]: "?????",
    },
    landingPage2S4J2Description: {
        [Language.English]:
            "A Jodi that would assure your peace of mind with its long durability and high backup power. Precisely chosen battery paired with the sturdy inverter ensures a seamless flow of energy to meet your needs.",
        [Language.Hindi]:
            "एक जोड़ी जो अपने लंबे टिकाउपन और उच्च बैकअप शक्ति के साथ आपके मन की शांति सुनिश्चित करेगी। मजबूत इन्वर्टर के साथ सटीक रूप से चुनी गई बैटरी आपकी आवश्यकताओं को पूरा करने के लिए ऊर्जा का निर्बाध प्रवाह सुनिश्चित करती है।",
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
        [Language.English]: "The Super Life Combo",
        [Language.Hindi]: "सुपर लाइफ कॉम्बो",
        [Language.Marathi]: "?????",
    },
    landingPage2S4J3Description: {
        [Language.English]: "With a battery backed with the best-in-class warranty and a long-lasting inverter, this combo is just the right choice for your everyday energy requirements.",
        [Language.Hindi]: "बेस्ट-इन-क्लास वारंटी और लंबे समय तक चलने वाले इन्वर्टर के साथ समर्थित बैटरी के साथ, यह कॉम्बो आपकी रोजमर्रा की ऊर्जा आवश्यकताओं के लिए बिल्कुल सही विकल्प है।",
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
        [Language.English]: "The Hi-power Combo",
        [Language.Hindi]: "हाई-पॉवर कॉम्बो",
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
        [Language.Hindi]: "स्मार्ट और दमदार इन्वर्टर और बैटरी की जोड़ी",
        [Language.Marathi]: "?????",
    },
    landingPage3S1T2: {
        [Language.English]: "Empower your home with the perfect jodi to compliment your home needs",
        [Language.Hindi]: "अपने घर की जरूरतों को पूरा करने के लिए सही जोड़ी के साथ अपने घर को सशक्त बनाएं",
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
        [Language.Hindi]: "लिवगार्ड इन्वर्टर और इन्वर्टर बैटरी जोड़ी एक सहज अनुकूलता प्रदान करते हैं जो ऊर्जा के बिना रुकावट प्रवाह के लिए एक साथ जुड़ते हैं।",
        [Language.Marathi]: "?????",
    },
    landingPage3S7Slide2Heading: {
        [Language.English]: "Seamless Service",
        [Language.Hindi]: "निरंतर सेवा",
        [Language.Marathi]: "?????",
    },
    landingPage3S7Slide2Content: {
        [Language.English]: "With Livguard Jodis at your home, experience the comfort of hassle-free servicing for both the products, whenever you need.",
        [Language.Hindi]: "अपने घर पर लिवगार्ड जोड़ी के साथ,इन्वर्टर और इन्वर्टर बैटरी के लिए आरामदायक सर्विसिंग का अनुभव करें ,जब  भी आपको आवश्यकता हो।",
        [Language.Marathi]: "?????",
    },
    landingPage3S7Slide3Heading: {
        [Language.English]: "Long Life",
        [Language.Hindi]: "लंबा जीवन",
        [Language.Marathi]: "?????",
    },
    landingPage3S7Slide3Content: {
        [Language.English]: "The perfect match of inverter and inverter battery in Livguard Jodis ensure a longer , more efficient life of the products for you.",
        [Language.Hindi]: "लिवगार्ड जोड़ी में इन्वर्टर और इन्वर्टर बैटरी का सही मेल आपके उत्पादों का लंबा, अधिक कुशल जीवन सुनिश्चित करता है।",
        [Language.Marathi]: "?????",
    },
    landingPage3S7BT: {
        [Language.English]: "Reach out to Us",
        [Language.Hindi]: "हमसे संपर्क करें",
        [Language.Marathi]: "?????",
    },

    //Category Batteries
    categoryBattriesS1T1: {
        [Language.English]: "Strong Batteries",
        [Language.Hindi]: "स्ट्रॉंग बैटरी",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS1T2: {
        [Language.English]: "For A Limitless Experience",
        [Language.Hindi]: "एक असीम अनुभव के लिए",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS1T3: {
        [Language.English]: "Batteries with a powerful backup, made to empower your home with limitless energy whenever you need",
        [Language.Hindi]: "दमदार बैकअप वाली बैटरियां,जो आपकी जरूरतों के अनुसार, आपके घर को असीम ऊर्जा से सशक्त बनाने के लिए बनाई गई हैं",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS2HT1: {
        [Language.English]: "Batteries That Are",
        [Language.Hindi]: "बैटरी जो",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS2HT2: {
        [Language.English]: `<span class="lg-text-highlighted"> Meant To Last </span>`,
        [Language.Hindi]: `<span class="lg-text-highlighted"> सालों साल चलें </span>`,
        [Language.Marathi]: "?????",
    },
    categoryBattriesS2Slide1Heading: {
        [Language.English]: "Futuristic Design",
        [Language.Hindi]: "आधुनिक बनावट",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS2Slide1Description: {
        [Language.English]:
            "Livguard Inverter Batteries are manufactured with PPC Plastic to avoid leakage and keeping in mind the customer’s needs to deliver the safest and aesthetic designs for you",
        [Language.Hindi]: "लिवगार्ड की बैटरी पी पी सी प्लास्टिक से बनीं हैं, जो बैटरी को लीक होने से बचाती है  और ग्राहकों को हर बार सुंदर और सुरक्षित अनुभव देती हैं।",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS2Slide2Heading: {
        [Language.English]: "SuperTUFF 3D Grid",
        [Language.Hindi]: "सुपरटफ 3डी ग्रिड",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS2Slide2Description: {
        [Language.English]:
            "With the industry’s first Supertuff 3D Grid design paired with a double-sided pasting, Livguard Batteries hold negative active material 20% longer, resulting in a longer battery life",
        [Language.Hindi]: "उद्योग की सबसे पहली 3डी ग्रिड तकनीक और दो-तरफ़ पेस्टिंग से बनी लिवगार्ड बैटरी नेगेटिव ऐक्टिव मटेरियल को 20% ज़्यादा रोकती है, जो बैटरी की अवधि भी बढ़ती है।",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS2Slide3Heading: {
        [Language.English]: "Assured Warranty",
        [Language.Hindi]: "सुनिश्चित वारंटी",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS2Slide3Description: {
        [Language.English]:
            "The best-in-class warranties across all ranges as well as low maintenance requirements, make the Livguard Batteries suitable for all customers, whatever their needs may be",
        [Language.Hindi]: "सभी श्रेणियों में सर्वश्रेष्ठ वारंटी के साथ-साथ कम देखभाल की आवश्यकताएं Livguard बैटरियों को सभी ग्राहकों के लिए उपयुक्त बनाती हैं, चाहे उनकी कोई भी आवश्यकता हो।",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS2Slide4Heading: {
        [Language.English]: "Non- Woven Gauntlet",
        [Language.Hindi]: "गैर-बुना गौंटलेट",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS3T1: {
        [Language.English]: "Get To Know",
        [Language.Hindi]: `<span class="lg-text-highlighted">हमारी बैटरी</span> को`,
        [Language.Marathi]: "?????",
    },
    categoryBattriesS3T2: {
        [Language.English]: `<span class="lg-text-highlighted">Our Batteries</span> In Detail`,
        [Language.Hindi]: "विस्तार से समझें",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS3R1C2: {
        [Language.English]: "Flat Plate",
        [Language.Hindi]: "फ्लैट प्लेट",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS3R1C3: {
        [Language.English]: "Tubular",
        [Language.Hindi]: "ट्यूबलर प्लेट",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS3R2C1: {
        [Language.English]: "Cycle Life",
        [Language.Hindi]: "साइकिल अवधि",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS3R2C2: {
        [Language.English]: "Longer",
        [Language.Hindi]: "लंबा",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS3R2C3: {
        [Language.English]: "Limited",
        [Language.Hindi]: "सीमित",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS3R3C1: {
        [Language.English]: "Usability",
        [Language.Hindi]: "उपयुक्तता",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS3R3C2: {
        [Language.English]: "Suitable for high power cut applications",
        [Language.Hindi]: "उच्च पावर कट अनुप्रयोगों के लिए उपयुक्त",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS3R3C3: {
        [Language.English]: "Suitable for shorter duration applications",
        [Language.Hindi]: "कम अवधि के अनुप्रयोगों के लिए उपयुक्त",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS3R4C1: {
        [Language.English]: "Economical",
        [Language.Hindi]: "किफ़ायती",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS3R4C2: {
        [Language.English]: "Relatively Lower",
        [Language.Hindi]: "अपेक्षाकृत कम",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS3R4C3: {
        [Language.English]: "Relatively Higher",
        [Language.Hindi]: "उच्चतर",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS3R5C1: {
        [Language.English]: "Maintenace",
        [Language.Hindi]: "देखभाल",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS3R5C2: {
        [Language.English]: "Lower",
        [Language.Hindi]: "कम",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS3R5C3: {
        [Language.English]: "Comparatively Higher",
        [Language.Hindi]: "तुलनात्मक रूप से अधिक",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS3R6C1: {
        [Language.English]: "Options",
        [Language.Hindi]: "विकल्प",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS3R6C2: {
        [Language.English]: "No further are options available",
        [Language.Hindi]: "आगे कोई विकल्प उपलब्ध नहीं है",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS3R6C3: {
        [Language.English]: "Options include ST/TT/STJ/STT",
        [Language.Hindi]: "विकल्पों में एसटी/टीटी/एसटीजे/एसटीटी शामिल हैं",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS2Slide4Description: {
        [Language.English]: "The premium high-quality gauntlet provides extra strength to the tubular plate which reduces tube bursting and offers extra backup with a longer battery life",
        [Language.Hindi]: "प्रीमियम उच्च-क्वालिटी वाला गौंटलेट ट्यूबलर प्लेट को अतिरिक्त ताकत प्रदान करता है जो ट्यूब को फटने से बचाता है और लंबी बैटरी लाइफ के साथ अतिरिक्त बैकअप प्रदान करता है",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS4HT1: {
        [Language.English]: `<span class="lg-text-highlighted"> Our Suggestions </span>`,
        [Language.Hindi]: `<span class="lg-text-highlighted"> हमारे सुझाव </span>`,
        [Language.Marathi]: "?????",
    },
    categoryBattriesS4HT2: {
        [Language.English]: "Based On Your Choice",
        [Language.Hindi]: "आपकी पसंद के आधार पर",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS4Heading: {
        [Language.English]: "Select Battery Type",
        [Language.Hindi]: "बैटरी का टाइप चुनें",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS4BTFlat: {
        [Language.English]: "Flat Plate Battery",
        [Language.Hindi]: "फ्लैट प्लेट बैटरी",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS4BTTubular: {
        [Language.English]: "Tubular Battery",
        [Language.Hindi]: "ट्यूबुलर बैटरी",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS4SpecificationHeading: {
        [Language.English]: "Battery\nSpecifications",
        [Language.Hindi]: "बैटरी विवरण",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS4BT: {
        [Language.English]: "Explore Product",
        [Language.Hindi]: "विस्तार से देखें",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS4Slide1Heading: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS4Slide1Description: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS2Slide1KS1Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBattriesSlide1KS1Description: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS2Slide1KS2Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBattriesSlide1KS2Description: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS2Slide1KS3Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBattriesSlide1KS3Description: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS2Slide1KS4Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBattriesSlide1KS4Description: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS4Slide2Heading: {
        [Language.English]: "IT1584TT",
        [Language.Hindi]: "IT1584TT",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS4Slide2Description: {
        [Language.English]: "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
        [Language.Hindi]: "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS2Slide2KS1Title: {
        [Language.English]: "Warranty",
        [Language.Hindi]: "वारंटी",
        [Language.Marathi]: "?????",
    },
    categoryBattriesSlide2KS1Description: {
        [Language.English]: "60 + 24* Months",
        [Language.Hindi]: "60 + 24* महीने",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS2Slide2KS2Title: {
        [Language.English]: "Capacity",
        [Language.Hindi]: "क्षमता",
        [Language.Marathi]: "?????",
    },
    categoryBattriesSlide2KS2Description: {
        [Language.English]: "150 Ah",
        [Language.Hindi]: "150 Ah",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS2Slide2KS3Title: {
        [Language.English]: "3D Grid",
        [Language.Hindi]: "3D ग्रिड",
        [Language.Marathi]: "?????",
    },
    categoryBattriesSlide2KS3Description: {
        [Language.English]: "Longer Life",
        [Language.Hindi]: "लम्बी अवधी",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS2Slide2KS4Title: {
        [Language.English]: "Dimensions",
        [Language.Hindi]: "आयाम",
        [Language.Marathi]: "?????",
    },
    categoryBattriesSlide2KS4Description: {
        [Language.English]: "505 (L) X  188 (W) X 410 (H)",
        [Language.Hindi]: "505 (L) X  188 (W) X 410 (H)",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS5HT1: {
        [Language.English]: "Side-by-Side Overview",
        [Language.Hindi]: "बैटरी साथ देखें",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS5F1Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS5F2Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS5F3Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS5F4Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS5F5Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS5F6Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS5Slide1Heading: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS5Slide2Heading: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS5Slide3Heading: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS6HT1: {
        [Language.English]: `Suggested <span class="lg-text-highlighted">Jodis </span>`,
        [Language.Hindi]: `सुझायी गई <span class="lg-text-highlighted"> जोड़ियाँ </span>`,
        [Language.Marathi]: "?????",
    },
    categoryBattriesS6Jodi1Title: {
        [Language.English]: "The Urban Jodi",
        [Language.Hindi]: "अर्बन जोड़ी",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS6Jodi2Title: {
        [Language.English]: "The Peace of Mind Jodi",
        [Language.Hindi]: "मन की शांति वाला जोड़ी",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS6Jodi3Title: {
        [Language.English]: "The Super Life Jodi",
        [Language.Hindi]: "सुपर लाइफ जोड़ी",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS6Jodi4Title: {
        [Language.English]: "The Hi-Power Jodi",
        [Language.Hindi]: "हाई-पॉवर जोड़ी",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS6JodiButtontext: {
        [Language.English]: "Know More",
        [Language.Hindi]: "अधिक जानिए",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS6Buttontext: {
        [Language.English]: "Enquire Now",
        [Language.Hindi]: "संपर्क करें",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS8HT1: {
        [Language.English]: "Choose The Best",
        [Language.Hindi]: "घर लायें रोशनी",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS8HT2: {
        [Language.English]: `<span class="lg-text-highlighted"> Inverter Battery </span> For You`,
        [Language.Hindi]: `उचित <span class="lg-text-highlighted"> इनवर्टर बैटरी </span> से`,
        [Language.Marathi]: "?????",
    },
    categoryBattriesS8Description: {
        [Language.English]:
            "Find the suitable pick of inverter that fulfils your requirements with efficiency. Use our Buying Guide to get to know in detail about how you can buy your inverter and our Product Catalogue for product specifications",
        [Language.Hindi]: "हमारे ख़रीदने की मार्गदर्शिका और उत्पाद कैटलॉग का उपयोग करके अपने लिए उपयुक्त इन्वर्टर चुनें जो सहजता के साथ आपकी आवश्यकताओं को पूरा करें।",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS8B1T: {
        [Language.English]: "Buying Guide",
        [Language.Hindi]: "ख़रीदने की मार्गदर्शिका",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS8B2T: {
        [Language.English]: "Download Catalog",
        [Language.Hindi]: "उत्पाद कैटलॉग",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS8BT: {
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
        [Language.English]: "New Age Design",
        [Language.Hindi]: "नए ज़माने की डिज़ाइन",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS2Slide1Description: {
        [Language.English]:
            "Made with a team of experienced and skilled professionals, Livguard Inverters offer the best-in-class designs which complement your home along with a LED Display which indicates the current state of your inverter.",
        [Language.Hindi]:
            "अनुभवी और कुशल पेशेवरों की एक टीम के साथ बनाए गए लिवगार्ड इनवर्टर सर्वश्रेष्ठ बनावट प्रदान करते हैं। इनमें लगी एलईडी डिस्प्ले के साथ आप अपने इन्वर्टर की वर्तमान स्थिति को देख सकते हैं।",
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
            "लिवगार्ड इनवर्टर के साथ, आप 3 साल की लंबी वारंटी के साथ शांति का आनंद ले सकते हैं। यह फ्लैट वारंटी आपको किसी भी नुकसान के मामले में चिंता मुक्त रहने की अनुमति देती है। बस हमसे संपर्क करें और हम आपकी समस्या का समाधान करेंगे।",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS2Slide4Heading: {
        [Language.English]: "Dual Sensor Thermal Protect",
        [Language.Hindi]: "डुअल सेंसर थर्मल प्रोटेक्ट",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS2Slide4Description: {
        [Language.English]: "With Industry’s first thermal sensor for transformers, the sensor prevents the transformer from overheating and catching fire and enhances the life of your inverter.",
        [Language.Hindi]: "ट्रांसफॉर्मर के लिए उद्योग के पहले थर्मल सेंसर ट्रांसफॉर्मर को ज़्यादा गरम होने और आग पकड़ने से रोकता है और आपके इन्वर्टर के जीवन को बढ़ाता है।",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS3T1: {
        [Language.English]: `<span class="lg-text-highlighted">Choose Your Inverter</span>`,
        [Language.Hindi]: `<span class="lg-text-highlighted">अपना इन्वर्टर चुनें</span>`,
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
        [Language.English]: "Noise",
        [Language.Hindi]: "आवाज़",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS3R2C2: {
        [Language.English]: "No humming noise",
        [Language.Hindi]: "कोई आवाज़ नहीं",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS3R2C3: {
        [Language.English]: "Creates a humming noise",
        [Language.Hindi]: "आवाज़ पैदा करता है।",
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
        [Language.Hindi]: "चौकोर",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS4SpecificationHeading: {
        [Language.English]: "Inverter Specification",
        [Language.Hindi]: "इन्वर्टर  विवरण",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS4Slide1Heading: {
        [Language.English]: "LGS1100i",
        [Language.Hindi]: "LGS1100i",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS4Slide1Description: {
        [Language.English]: "Inverter for Small Offices, Homes, and Small Shops with Best-in-Class Warranty and Smart AI Charging. With an assured warranty and Pure Sine Wave output, experience energy unlimited at your home with this Livguard Inverter",
        [Language.Hindi]: "छोटे कार्यालयों, घरों और छोटी दुकानों के लिए इन्वर्टर, सर्वश्रेष्ठ श्रेणी की वारंटी और स्मार्ट एआई चार्जिंग के साथ    सुनिश्चित वारंटी और प्योर साइन वेव आउटपुट के साथ, हमारे लिवगार्ड इन्वर्टर के साथ अपने घर पर असीमित ऊर्जा का अनुभव करें",
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
        [Language.English]: "Inverter for Small Offices, Homes, and Small Shops with Best-in-Class Warranty and Smart AI Charging. Bring home the power of unlimited energy with our Inverter. Equipped with the best-in-class warranty and Smart AI Charging to offer a smooth flow of energy to you",
        [Language.Hindi]: "छोटे कार्यालयों, घरों और छोटी दुकानों के लिए इन्वर्टर, सर्वश्रेष्ठ श्रेणी की वारंटी और स्मार्ट एआई चार्जिंग के साथ    हमारे इन्वर्टर के साथ असीमित ऊर्जा की शक्ति घर लाएं। आपको ऊर्जा का सहज प्रवाह प्रदान करने के लिए उद्योग की सावराश्रेष्ठ वारंटी आवर स्मार्ट ए आई चार्जिंग के साथ बने इन्वर्टर।",
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
        [Language.English]: "The Rural Jodi",
        [Language.Hindi]: "रूरल कॉम्बो",
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
        [Language.Hindi]: "हमारे ख़रीदने की मार्गदर्शिका और उत्पाद कैटलॉग का उपयोग करके अपने लिए उपयुक्त इन्वर्टर चुनें जो सहजता के साथ आपकी आवश्यकताओं को पूरा करें।",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS8B1T: {
        [Language.English]: "Buying Guide",
        [Language.Hindi]: "ख़रीदने की मार्गदर्शिका",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS8B2T: {
        [Language.English]: "Download Catalog",
        [Language.Hindi]: "उत्पाद कैटलॉग",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS8BT: {
        [Language.English]: "Let's Plan Your Power",
        [Language.Hindi]: "अपनी ऊर्जा को प्लान करें",
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
    applyNowForDealerT4: {
        [Language.English]: "City",
        [Language.Hindi]: " शहर",
        [Language.Marathi]: "?????",
    },
    applyNowForDealerT5: {
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

    review1Name: {
        [Language.English]: "Thangamani M",
        [Language.Hindi]: "तंगमणि एम",
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
        [Language.Hindi]: "इन्वर्टर",
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
        [Language.Hindi]: `\"यह सस्ता और बेहतरीन प्रोडक्ट है। यह अच्छा दिखने वाला और अच्छा उत्पाद है और लिवगार्ड की सेवा बहुत अच्छी और सहायक है।\"`,
        [Language.Marathi]: "?????",
    },
    review2ProductName: {
        [Language.English]: "Inverter Battery",
        [Language.Hindi]: "इन्वर्टर बैटरी",
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
        [Language.Hindi]: "इन्वर्टर",
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
        [Language.Hindi]: `\"समय पर डिलीवरी और बैटरी बैकअप बहुत अच्छा है। स्थापना सेवाएं बहुत अच्छी थीं।\"`,
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
        [Language.Hindi]: "नए ऑफर और कहनियों के बारे में जानने वाले सबसे पहले बनिए",
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
        [Language.Hindi]: "बिक्री वापसी नीति",
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
        [Language.Hindi]: " घर के इनवर्टर",
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
        [Language.Hindi]: "सौर समाधान",
        [Language.Marathi]: "?????",
    },
    footerDisclosure4T1: {
        [Language.English]: "Solar Panels",
        [Language.Hindi]: "सौर पैनल",
        [Language.Marathi]: "?????",
    },
    footerDisclosure4T2: {
        [Language.English]: "Solar Grid Interactive Series",
        [Language.Hindi]: "सौर ग्रिड इंटरैक्टिव श्रेणी",
        [Language.Marathi]: "?????",
    },
    footerDisclosure4T3: {
        [Language.English]: "Solar Inverter",
        [Language.Hindi]: "सौर इनवर्टर",
        [Language.Marathi]: "?????",
    },
    footerDisclosure4T4: {
        [Language.English]: "Solar Management Unit",
        [Language.Hindi]: "सौर प्रबंधन इकाई",
        [Language.Marathi]: "?????",
    },
    footerDisclosure4T5: {
        [Language.English]: "Solar Charge Controller",
        [Language.Hindi]: "सौर चार्ज कंट्रोलर",
        [Language.Marathi]: "?????",
    },
    footerDisclosure4T6: {
        [Language.English]: "Solar LED Street Light",
        [Language.Hindi]: "सौर एल ई डी गली की बत्ती",
        [Language.Marathi]: "?????",
    },
    footerDisclosure4T7: {
        [Language.English]: "Solar Battery",
        [Language.Hindi]: "सौर बैटरी",
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
        [Language.Hindi]: "डीलर खोजक",
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
        [Language.Hindi]: "सेवा समर्थन",
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
        [Language.Hindi]: "प्लॉट नंबर २२१, फेज-१, उद्योग विहार, गुरुग्राम १२२०१६ हरियाणा, भारत",
        [Language.Marathi]: "?????",
    },
    footerContactT3: {
        [Language.English]: "#Energy Unlimited",
        [Language.Hindi]: "#असीमित ऊर्जा",
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
        [Language.English]: "Contact Us",
        [Language.Hindi]: "हमसे संपर्क करें",
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
        [Language.English]: `Get <span class=\"lg-text-highlighted\">Reliable Power</span>`,
        [Language.Hindi]: `<span class=\"lg-text-highlighted\">विश्वसनीय शक्ति</span>`,
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
        [Language.Hindi]: "घर",
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
        [Language.Hindi]: "सेवा",
        [Language.Marathi]: "?????",
    },
    downloadCatalogueBottomBarT1: {
        [Language.English]: "Download Catalog",
        [Language.Hindi]: "उत्पाद कैटलॉग",
        [Language.Marathi]: "?????",
    },


    invalidKey: {
        [Language.English]: "INVALID STRING REQUESTED",
        [Language.Hindi]: "INVALID STRING REQUESTED",
        [Language.Marathi]: "INVALID STRING REQUESTED",
    },

    "?????": {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
};
