import {Language} from "~/typeDefinitions";

export function getVernacularString(textContentPiece: string, language: Language): string {
    if (!(textContentPiece in vernacularStrings)) {
        console.log("Invalid string requested: ", textContentPiece);
        // @ts-ignore
        return vernacularStrings["invalidKey"][language];
    }

    // TODO: Debugging
    // const translation = vernacularStrings[textContentPiece][language];
    // if (translation == "?????") {
    //     return `${textContentPiece} - ${translation}`;
    // } else {
    //     return translation;
    // }

    // @ts-ignore
    return vernacularStrings[textContentPiece][language];
}

// Hack 48af9f18-d006-44b5-88fc-bf514c7d4b67
export function addVernacularString(
    id: string,
    value: {
        [Language.English]: string;
        [Language.Hindi]: string;
    },
) {
    vernacularStrings[id] = value;
}
// /Hack

// @ts-ignore
const vernacularStrings: {[textContentPiece: string]: {[language: Language]: string}} = {
    headerS1T1: {
        [Language.English]: "Get In Touch",
        [Language.Hindi]: "हमसे जुड़िये",
    },
    headerS2T1: {
        [Language.English]: "Search",
        [Language.Hindi]: "यहाँ खोजें",
    },

    headerMenuS1T1: {
        [Language.English]: "Inverters",
        [Language.Hindi]: "इनवर्टर",
    },
    headerMenuS1T2: {
        [Language.English]: "Inverter Batteries",
        [Language.Hindi]: "इनवर्टर बैटरी",
    },
    headerMenuS1T3: {
        [Language.English]: "Automotive Batteries",
        [Language.Hindi]: "ऑटोमोटिव बैटरी",
    },
    headerMenuS1T4: {
        [Language.English]: "Solar",
        [Language.Hindi]: "सोलर सलूशन",
    },
    headerMenuS1T5: {
        [Language.English]: "Accessories",
        [Language.Hindi]: "सहायक उपकरण",
    },
    headerMenuS1T6: {
        [Language.English]: "Dealer Locator",
        [Language.Hindi]: "डीलर ढूँढें",
    },
    headerMenuS1T7: {
        [Language.English]: "Register Your Product",
        [Language.Hindi]: "उत्पाद रजिस्टर करवायें",
    },
    headerMenuS1T8: {
        [Language.English]: "More",
        [Language.Hindi]: "और देखें",
    },
    headerMenuS2T1: {
        [Language.English]: "Contact Us",
        [Language.Hindi]: "हमसे संपर्क करें",
    },
    "360f578c-4a1f-49a7-baf8-ee0680fb3301": {
        [Language.English]: "Request a Call Back",
        [Language.Hindi]: "कॉल बैक का अनुरोध करें",
    },
    headerMenuSM1T1: {
        [Language.English]: "Inverters",
        [Language.Hindi]: "इनवर्टर",
    },
    headerMenuSM1T2: {
        [Language.English]: "Home Inverters",
        [Language.Hindi]: "होम इनवर्टर",
    },
    headerMenuSM1T3: {
        [Language.English]: "High Capacity Inverters",
        [Language.Hindi]: "हाय-कैपेसिटी इनवर्टर",
    },
    headerMenuSM2T1: {
        [Language.English]: "Inverter Batteries",
        [Language.Hindi]: "इनवर्टर बैटरी",
    },
    headerMenuSM3T1: {
        [Language.English]: "Automotive Batteries",
        [Language.Hindi]: "ऑटोमोटिव बैटरी",
    },
    headerMenuSM3T2: {
        [Language.English]: "Car and SUV Batteries",
        [Language.Hindi]: "गाड़ी और SUV बैटरी",
    },
    headerMenuSM3T3: {
        [Language.English]: "Two Wheeler Batteries",
        [Language.Hindi]: "2-पहिया बैटरी",
    },
    headerMenuSM3T4: {
        [Language.English]: "Bus & Truck Batteries",
        [Language.Hindi]: "बस और ट्रक की बैटरी",
    },
    headerMenuSM3T5: {
        [Language.English]: "Tractor Batteries",
        [Language.Hindi]: "ट्रैक्टर बैटरी",
    },
    headerMenuSM3T6: {
        [Language.English]: "Three Wheeler Batteries",
        [Language.Hindi]: "3-पहिया बैटरी",
    },
    headerMenuSM3T7: {
        [Language.English]: "E-Rickshaw Batteries",
        [Language.Hindi]: "ई-रिक्शा की बैटरी",
    },
    headerMenuSM4T1: {
        [Language.English]: "Solar",
        [Language.Hindi]: "सोलर",
    },
    headerMenuSM4T2: {
        [Language.English]: "Solar Inverters",
        [Language.Hindi]: "सोलर इनवर्टर",
    },
    headerMenuSM4T3: {
        [Language.English]: "Solar Batteries",
        [Language.Hindi]: "सोलर बैटरी",
    },
    headerMenuSM4T4: {
        [Language.English]: "Solar Solutions",
        [Language.Hindi]: "सोलर सलूशन",
    },
    headerMenuSM5T1: {
        [Language.English]: "Accessories & Other Batteries",
        [Language.Hindi]: "सहायक उपकरण",
    },
    headerMenuSM5T2: {
        [Language.English]: "Stabilizer",
        [Language.Hindi]: "स्टेबिलाइजर्स",
    },
    headerMenuSM5T3: {
        [Language.English]: "E-Rikshaw Chargers",
        [Language.Hindi]: "ई-रिक्शा चार्जर",
    },
    headerMenuSM5T4: {
        [Language.English]: "Lithium Batteries",
        [Language.Hindi]: "लिथियम बैटरी",
    },
    headerMenuSM5T5: {
        [Language.English]: "VRLA Batteries",
        [Language.Hindi]: "VRLA बैटरी",
    },
    headerMenuSM5T6: {
        [Language.English]: "Inverter Trolley",
        [Language.Hindi]: "इनवर्टर ट्राली",
    },
    headerMenuSM6T1: {
        [Language.English]: "Dealer Locator",
        [Language.Hindi]: "डीलर ढूँढें",
    },
    headerMenuSM7T1: {
        [Language.English]: "Register Your Product",
        [Language.Hindi]: "उत्पाद रजिस्टर करवायें",
    },
    headerMenuSM8T1: {
        [Language.English]: "More",
        [Language.Hindi]: "और देखें",
    },
    headerMenuSM8T2: {
        [Language.English]: "About Us",
        [Language.Hindi]: "हमारे बारे में",
    },
    headerMenuSM8T3: {
        [Language.English]: "Blogs",
        [Language.Hindi]: "ब्लॉग",
    },
    "7ad4abbd-2d09-4f4a-9605-f0f2c5008fa8": {
        [Language.English]: "Offers",
        [Language.Hindi]: "ऑफर्स",
    },
    "088ccfe9-7891-49bd-b01f-2ea4836b0342": {
        [Language.English]: "Contact Us",
        [Language.Hindi]: "हमसे संपर्क करें",
    },
    "9316f275-c395-4344-99d7-895d162602c0": {
        [Language.English]: "Get Offers",
        [Language.Hindi]: "ऑफर्स पाएं",
    },
    "0d7eacab-de68-49a3-a0d2-c25eba53a1e3": {
        [Language.English]: "E-Waste Management",
        [Language.Hindi]: "ई-वेस्ट मैनेजमेंट",
    },
    headerMenuSM8T6: {
        [Language.English]: "E-Waste Management",
        [Language.Hindi]: "ई-वेस्ट मैनेजमेंट",
    },
    headerContactUsDialogT1: {
        [Language.English]: "Get In Touch With Us",
        [Language.Hindi]: "हमसे जुड़िये",
    },
    headerContactUsDialogT2: {
        [Language.English]: "Service",
        [Language.Hindi]: "सर्विस",
    },
    headerContactUsDialogT3: {
        [Language.English]: "Sales Enquiry",
        [Language.Hindi]: "बिक्री पूछताछ",
    },

    homeS1T1: {
        [Language.English]: "Uninterrupted Power",
        [Language.Hindi]: "निरंतर ऊर्जा",
    },
    homeS1T2: {
        [Language.English]: "With Livguard",
        [Language.Hindi]: "लिवगार्ड के साथ",
    },
    homeS1T3: {
        [Language.English]: "Get in Touch With Us",
        [Language.Hindi]: "हमसे संपर्क करें",
    },
    homeS2T1: {
        [Language.English]: "Energy Storage Solutions",
        [Language.Hindi]: "ऊर्जा संग्रहण समाधान",
    },
    homeS2T2: {
        [Language.English]: "To Power Up Your Future",
        [Language.Hindi]: "जिनसे आपका भविष्य रोशन हो",
    },
    homeS2C1T1: {
        [Language.English]: "Best in Class Services",
        [Language.Hindi]: "अतुल्य सर्विस",
    },
    homeS2C1T2: {
        [Language.English]:
            "With a PAN India presence with 40+ service centers, Livguard is just one call away to cater to your energy storage related needs. We always keep your product satisfaction as our priority, and empower you with unlimited energy.",
        [Language.Hindi]: "पूरे भारत में मौजूद 40+ सर्विस केंद्रों के साथ लिवगार्ड आपकी असुविधाओं को दूर करने के लिए हमेशा एक कॉल दूर है। आपकी संतुष्टि हमारे लिए हमेशा सबसे महत्त्वपूर्ण है।",
    },
    homeS2C2T1: {
        [Language.English]: "Manufacturing Excellence",
        [Language.Hindi]: "श्रेष्ठ उत्पादन",
    },
    homeS2C2T2: {
        [Language.English]:
            "At Livguard, perfection is not an option, it's the only standard. Uncompromising quality is our promise. Livguard's refined manufacturing processes deliver reliable products every time.",
        [Language.Hindi]:
            "लिवगार्ड में, श्रेष्ठता कोई विकल्प नहीं है, यह एकमात्र मानक है। बिना किसी समझौते वाली क्वालिटी हमारा वादा है। लिवगार्ड की परिष्कृत निर्माण प्रक्रियाएं हर बार विश्वसनीय उत्पाद प्रदान करती हैं।",
    },
    homeS3H1T1: {
        [Language.English]: "Experience Our",
        [Language.Hindi]: "अनुभव करें हमारे",
    },
    homeS3H1T2: {
        [Language.English]: `<span class="lg-text-highlighted">Energy Solutions</span>`,
        [Language.Hindi]: `<span class="lg-text-highlighted">ऊर्जा संग्रहण समाधान</span>`,
    },
    homeS3Tab1H: {
        [Language.English]: "Automotive Batteries",
        [Language.Hindi]: "ऑटोमोटिव बैटरी",
    },
    homeS3Tab1HC1: {
        [Language.English]: "Energy Solutions",
        [Language.Hindi]: "ऊर्जा समाधान",
    },
    homeS3Tab1HC2: {
        [Language.English]: "Automotive Batteries",
        [Language.Hindi]: "ऑटोमोटिव बैटरी",
    },
    homeS3Tab1C: {
        [Language.English]: "Experience limitless energy with our wide range range of automotive batteries, made to empower your fast-paced lifestyle with high performing products.",
        [Language.Hindi]:
            "ऑटोमोटिव बैटरियों की हमारी विस्तृत श्रृंखला के साथ असीमित ऊर्जा का अनुभव करें, जो उच्च प्रदर्शन वाले उत्पादों के साथ आपकी तेज़-तर्रार जीवन शैली को सशक्त बनाने के लिए बनाई गई है।",
    },
    homeS3Tab1BT: {
        [Language.English]: "Explore Auto Batteries",
        [Language.Hindi]: "ऑटो बैटरी देखें",
    },
    homeS3Tab2H: {
        [Language.English]: "Home Inverters",
        [Language.Hindi]: "होम इनवर्टर",
    },
    homeS3Tab2HC1: {
        [Language.English]: "Energy Solutions",
        [Language.Hindi]: "ऊर्जा समाधान",
    },
    homeS3Tab2HC2: {
        [Language.English]: "Home Inverters",
        [Language.Hindi]: "होम इनवर्टर",
    },
    homeS3Tab2C: {
        [Language.English]:
            "Visit our range of home inverters with sleek design made to bring unlimited flow of energy to your home. Backed by its sturdy build, pick the one that suits your home the best.",
        [Language.Hindi]: "आपके घर में ऊर्जा का असीमित प्रवाह लाने के लिए आकर्षक बनावट वाले होम इनवर्टर की हमारी श्रेणी पर जाएं। इसके मजबूत निर्माण के साथ, वह चुनें जो आपके होम लिए सबसे उपयुक्त हो।",
    },
    homeS3Tab2BT: {
        [Language.English]: "Explore Inverters",
        [Language.Hindi]: "इनवर्टर देखें",
    },
    homeS3Tab3H: {
        [Language.English]: "Inverter Batteries",
        [Language.Hindi]: "इनवर्टर बैटरी",
    },
    homeS3Tab3HC1: {
        [Language.English]: "Energy Solutions",
        [Language.Hindi]: "ऊर्जा समाधान",
    },
    homeS3Tab3HC2: {
        [Language.English]: "Inverter Batteries",
        [Language.Hindi]: "इनवर्टर बैटरी",
    },
    homeS3Tab3C: {
        [Language.English]: "With industry’s first 3D grid technology, our range of inverter batteries are manufactured to meet the power backup requirements of your family efficiently.",
        [Language.Hindi]: "उद्योग की सबसे पहली 3डी ग्रिड तकनीक के साथ, हमारी इनवर्टर बैटरी की श्रेणी आपके परिवार की पावर बैकअप आवश्यकताओं को कुशलतापूर्वक पूरा करने के लिए निर्मित की जाती है।",
    },
    homeS3Tab3BT: {
        [Language.English]: "Explore Inverter Batteries",
        [Language.Hindi]: "इनवर्टर बैटरी देखें",
    },
    homeS3Tab4H: {
        [Language.English]: "Solar Solutions",
        [Language.Hindi]: "सोलर सलूशन",
    },
    homeS3Tab4HC1: {
        [Language.English]: "Energy Solutions",
        [Language.Hindi]: "ऊर्जा समाधान",
    },
    homeS3Tab4HC2: {
        [Language.English]: "Solar Solutions",
        [Language.Hindi]: "सोलर सलूशन",
    },
    homeS3Tab4C: {
        [Language.English]:
            "Solutions made to fit your specific needs, precisely. We are the experts in Solar Rooftop Solutions, which equip us to always bring the best in class products for your needs.",
        [Language.Hindi]:
            "आपकी विशिष्ट आवश्यकताओं को पूरा करने के लिए लाये गये सटीक सलूशन। हम सोलर रूफटॉप सलूशन के एक्सपर्ट हैं, जो हमें हमेशा आपकी जरूरतों के लिए श्रेणी में सर्वश्रेष्ठ उत्पाद लाने के लिए तैयार करते हैं।",
    },
    homeS3Tab4BT: {
        [Language.English]: "Explore Solar",
        [Language.Hindi]: "सोलर देखें",
    },
    homeS3Tab5H: {
        [Language.English]: "Other Accessories",
        [Language.Hindi]: "सहायक उपकरण",
    },
    homeS3Tab5HC1: {
        [Language.English]: "Energy Solutions",
        [Language.Hindi]: "ऊर्जा समाधान",
    },
    homeS3Tab5HC2: {
        [Language.English]: "Other Accessories",
        [Language.Hindi]: "सहायक उपकरण",
    },
    homeS3Tab5C: {
        [Language.English]: "Explore accessories which perfectly compliment your products, with our curated range of choices. Built with the finest materials, these accessories will last long.",
        [Language.Hindi]: "हमारे सहायक उपकरणों की श्रेणी आपके घर की ज़रूरतों को भली भाँति समझ कर उनको बेहतर बनाते हैं । यह उपकरण श्रेष्ठ सामग्री से बने हैं जो सालों साल आपका साथ देंगे।",
    },
    homeS3Tab5BT: {
        [Language.English]: "Explore Accesories",
        [Language.Hindi]: "उपकरण देखें",
    },
    homeS4H1T1: {
        [Language.English]: "We Are",
        [Language.Hindi]: "हम श्रेणी में",
    },
    homeS4H1T2: {
        [Language.English]: `<span class="lg-text-highlighted">One of A Kind</span>`,
        [Language.Hindi]: `<span class="lg-text-highlighted">सबसे अलग हैं</span>`,
    },
    homeS4T2: {
        [Language.English]: "With Livguard, you are always in trusted hands",
        [Language.Hindi]: "लिवगार्ड के साथ आप हमेशा भरोसेमंद हाथों में हैं",
    },
    homeS4T3: {
        [Language.English]:
            "In just 9 years, Livguard has become the fastest-growing Energy Storage Solutions brand. Our zeal to develop a complete and connected ecosystem of happy customers, committed partners, & the best quality every time has made us the choice of people nationwide.",
        [Language.Hindi]:
            "केवल 9 वर्षों में, लिवगार्ड सबसे तेज़ी से बढ़ने वाला ऊर्जा संग्रहण समाधान का ब्रांड बन गया है। हमारा पूर्ण रूप से बनाया गया संतुष्ट ग्राहकों और डीलरों का नेटवर्क हमे उनकी सबसे पहली पसंद बनाता है।",
    },
    homeS5H1T1: {
        [Language.English]: "Plan Your Power Needs",
        [Language.Hindi]: "अपनी ऊर्जा ज़रूरतों को जानें",
    },
    homeS5H1T2: {
        [Language.English]: `With Livguard <span class="lg-text-highlighted">Power Planner</span>`,
        [Language.Hindi]: `हमारे <span class="lg-text-highlighted">पावर प्लानर</span> के साथ`,
    },
    homeS5T2: {
        [Language.English]:
            "Take charge of your power needs with Livguard's load calculator- Power Planned. Your key to personalised power solutions. It helps you find the perfect inverter and inverter battery options for your home, ensuring uninterrupted power supply at all times. ",
        [Language.Hindi]:
            "आपकी ज़रूरत के अनुसार समाधान पायें, लिवगार्ड के लोड कैलकुलेटर- पावर प्लानर के साथ।यह आपको अपने घर के लिए सही इनवर्टर और इनवर्टर बैटरी विकल्प खोजने में मदद करता है, और हर समय बिना रुकावट ऊर्जा का प्रवाह सुनिश्चित करता है।",
    },
    homeS5T3: {
        [Language.English]: "Maximize your Power Potential in 3 easy steps!",
        [Language.Hindi]: "3 आसान चरणों में अपनी ऊर्जा ज़रूरतें निकालें",
    },
    homeS5Step1T1: {
        [Language.English]: "Step1 :",
        [Language.Hindi]: "चरण 1:",
    },
    homeS5Step1T2: {
        [Language.English]: "Choose your property type",
        [Language.Hindi]: "अपने घर का प्रकार चुनें",
    },
    homeS5Step2T1: {
        [Language.English]: "Step2 :",
        [Language.Hindi]: "चरण 2:",
    },
    homeS5Step2T2: {
        [Language.English]: "Add your preferred devices",
        [Language.Hindi]: "अपने पसंदीदा उपकरण जोड़ें",
    },
    homeS5Step3T1: {
        [Language.English]: "Step3 :",
        [Language.Hindi]: "चरण 3:",
    },
    homeS5Step3T2: {
        [Language.English]: "Set your required backup hours and average load consumption",
        [Language.Hindi]: "ज़रूरत अनुसार बैकअप के घंटे और औसत लोड खपत चुनें",
    },
    homeS5T5P1: {
        [Language.English]: "Let’s start your power planning",
        [Language.Hindi]: "अपनी पावर प्लानिंग शुरू करें",
    },
    homeS5T5P2: {
        [Language.English]: "Choose your property type",
        [Language.Hindi]: "अपने घर का प्रकार चुनें",
    },
    homeS5T5P3: {
        [Language.English]: "Add your preferred devices",
        [Language.Hindi]: "अपने पसंदीदा उपकरण जोड़ें",
    },
    homeS5T5P4: {
        [Language.English]: "Select by Devices",
        [Language.Hindi]: "डिवाइस के अनुसार चुनें",
    },
    homeS5T5P5: {
        [Language.English]: "Select by Rooms",
        [Language.Hindi]: "कमरे के अनुसार चयन करें",
    },
    homeS5T6: {
        [Language.English]: "Let’s Plan",
        [Language.Hindi]: "नतीजा निकालें",
    },
    "c4c839c0-582d-4f53-be91-6730977f87aa": {
        [Language.English]: `Take Charge of Your Energy`,
        [Language.Hindi]: "अपनी ऊर्जा ज़रूरतों के लिए",
    },
    "aab3e140-baaf-46ce-a405-be90c45ef157": {
        [Language.English]: `With Our <span class="lg-text-highlighted">Power Planner</span>`,
        [Language.Hindi]: `आज़माएँ हमारा <span class="lg-text-highlighted">पावर प्लानर</span>`,
    },
    "5591c0ca-fe8b-42ae-8154-d7bab6ce721e": {
        [Language.English]: `Get tailored power solutions, use our Power Planner to find the right inverter and inverter battery options for your home.`,
        [Language.Hindi]: "अपनी ऊर्जा ज़रूरतों के अनुसार समाधान पाएँ। हमारे पावर प्लानर का इस्तेमाल करके अपने घर के लिए सही इनवर्टर और इनवर्टर बैटरी विकल्प ढूँढें।",
    },
    homeS6H1T1: {
        [Language.English]: `<span class="lg-text-highlighted">Transforming Lives</span> With`,
        [Language.Hindi]: `ग्राहकों के <span class="lg-text-highlighted">बदलते जीवन</span>`,
    },
    homeS6H1T2: {
        [Language.English]: "Energy Storage Solutions",
        [Language.Hindi]: "ऊर्जा संग्रहण समाधानों से",
    },
    homeS7H1T1: {
        [Language.English]: "Pioneers in Rooftop",
        [Language.Hindi]: "मार्गदर्शक",
    },
    homeS7H1T2: {
        [Language.English]: `<span class="lg-text-highlighted">Solar Solutions</span>`,
        [Language.Hindi]: `<span class="lg-text-highlighted">रूफटॉप सोलर सलूशन</span> में`,
    },
    homeS7T2: {
        [Language.English]: "Powered by passion and fuelled by innovation, we have established ourself as the experts in the Solar Energy Solutions sector.",
        [Language.Hindi]: "आधुनिकता से प्रेरित होकर और अपने जुनून को लेकर हमने ख़ुद को  सोलर सलूशन के क्षेत्र में एक्सपर्ट के रूप में स्थापित किया है।",
    },
    homeS7T3: {
        [Language.English]: "Three Reasons to Choose Livguard Solar",
        [Language.Hindi]: "तीन वजहें लिवगार्ड सोलर चुनने की",
    },
    homeS7T4: {
        [Language.English]: "Tap Into Solar",
        [Language.Hindi]: "सोलर ऊर्जा अनुभव करें",
    },
    homeS7S1T1: {
        [Language.English]: "Tailor-made\nEnd-to-End Solutions",
        [Language.Hindi]: "विशिष्ट रूप से\nबनाये गये समाधान",
    },
    homeS7S1T2: {
        [Language.English]: "Through our service experts and tools, we make sure that our solutions always fit your exact needs.",
        [Language.Hindi]: "हमारे सर्विस एक्सपर्ट और उपकरणों के माध्यम से, हम यह सुनिश्चित करते हैं कि हमारे समाधान हमेशा आपकी सटीक आवश्यकताओं को पूरा करें।",
    },
    homeS7S2T1: {
        [Language.English]: "One-Click\nService Support",
        [Language.Hindi]: "एक-क्लिक\nसमर्थन",
    },
    homeS7S2T2: {
        [Language.English]: "With LivMonitor 360, we are a one-click away customer support service (Pan India) for you to get resolutions quickly and effortlessly.",
        [Language.Hindi]: "लिवमोनिटर 360 के साथ, हम देश भर में आपकी सअमस्याओं का समाधान करने के लिए एक बस क्लिक दूर हैं।",
    },
    homeS7S3T1: {
        [Language.English]: "Long-Lasting\nProducts",
        [Language.Hindi]: "लंबी अवधि\nवाले उत्पाद",
    },
    homeS7S3T2: {
        [Language.English]: "We offer 25 years of panel warranty & a warranty of 7 years on inverter batteries for a longer, more durable life for solar solutions for you.",
        [Language.Hindi]: "हम ज़्यादा लंबे समय तक चलने वाले उत्पादों के लिए आपको 25 वर्षों की पैनल वारंटी और 7 वर्षों की इनवर्टर बैटरी वारंटी देते हैं।",
    },
    homeS8H1T1: {
        [Language.English]: "Meet Our",
        [Language.Hindi]: "मिलिए हमारे",
    },
    homeS8H1T2: {
        [Language.English]: `<span class="lg-text-highlighted">Leadership</span>`,
        [Language.Hindi]: `<span class="lg-text-highlighted">मार्गदर्शकों</span> से`,
    },
    homeS8Slide1T1: {
        [Language.English]: "Mr. Rakesh Malhotra",
        [Language.Hindi]: "श्री. राकेश मल्होत्रा",
    },
    homeS8Slide1T2: {
        [Language.English]: "(Founder & Mentor)",
        [Language.Hindi]: "(संस्थापक और संरक्षक)",
    },
    homeS8Slide1T3: {
        [Language.English]:
            "A leader, a mentor, a visionary, and an overall driving force, Mr. Rakesh Malhotra's exposure to the industry, his passion and his spirit to bring new and innovative ideas to life continues to motivate many other entrepreneurs.",
        [Language.Hindi]:
            "एक मार्गदर्शक , एक उपदेशक, एक दूरदर्शी, और एक समग्र प्रेरक शक्ति, श्री राकेश मल्होत्रा ​​​​का उद्योग के संपर्क में, उनका जुनून और नए विचारों को जीवन में लाने की उनकी भावना कई अन्य उद्यमियों को प्रेरित करती रही है।",
    },
    homeS8Slide2T1: {
        [Language.English]: "Mr. Navneet Kapoor",
        [Language.Hindi]: "श्री नवनीत कपूर",
    },
    homeS8Slide2T2: {
        [Language.English]: "(Co-founder & Chairman)",
        [Language.Hindi]: "(सह-संस्थापक और अध्यक्ष)",
    },
    homeS8Slide2T3: {
        [Language.English]:
            "One of the main pillars of the SAR Group and a hallmark of true entrepreneurship, Mr. Navneet Kapoor has been among the key forces behind Livguard through his expertise and belief that a successful business thrives when outstanding service is coupled with industry expertise and innovation.",
        [Language.Hindi]:
            "SAR ग्रुप के मुख्य स्तंभों में से एक और सच्चे उद्यमिता की पहचान, श्री नवनीत कपूर अपनी विशेषज्ञता और विश्वास के माध्यम से लिवगार्ड की प्रमुख ताकतों में से एक रहे हैं। उनका मानना है कि एक सफल व्यवसाय तब फलता-फूलता है जब उद्योग विशेषज्ञता के साथ उत्कृष्ट सर्विस मिलती है।",
    },
    homeS8Slide3T1: {
        [Language.English]: "Mr. Gurpreet Bhatia",
        [Language.Hindi]: "श्री गुरप्रीत भाटिया",
    },
    homeS8Slide3T2: {
        [Language.English]: "(CEO)",
        [Language.Hindi]: "(सीईओ)",
    },
    homeS8Slide3T3: {
        [Language.English]:
            "A dynamic leader with a formidable experience of over 25 years in B2B & B2C channels coupled with global experience in marketing, sales, and strategy. Mr. Gurpreet Bhatia is an impeccable example of someone who has created a unique career trajectory.",
        [Language.Hindi]:
            "मार्केटिंग, सेल्स और रणनीति में वैश्विक अनुभव के साथ बी2बी और बी2सी चैनलों में 25 से अधिक वर्षों के अनुभव के साथ एक मार्गदर्शकों। श्री गुरप्रीत भाटिया एक उदाहरण हैं, जिसने एक अद्वितीय करियर मार्ग बनाया है।",
    },
    homeS8Slide4T1: {
        [Language.English]: "Mr. Alankar Mittal",
        [Language.Hindi]: "श्री अलंकार मित्तल",
    },
    homeS8Slide4T2: {
        [Language.English]: "(Executive VP)",
        [Language.Hindi]: "(एग्जीक्यूटिव वी पी)",
    },
    homeS8Slide4T3: {
        [Language.English]:
            "Extremely committed and iron-willed, Mr. Alankar Mittal believes leadership is not about a title or a designation. It is about impact, influence, and inspiration. His massive experience of over 20 years continues to be a driving force for many.",
        [Language.Hindi]:
            "अत्यधिक प्रतिबद्ध और मज़बूत इच्छाशक्ति वाले श्री अलंकार मित्तल का मानना ​​है कि नेतृत्व किसी उपाधि या पदनाम के बारे में नहीं है, यह प्रभाव और प्रेरणा के बारे में है। 20 से अधिक वर्षों का उनका व्यापक अनुभव कई लोगों के लिए प्रेरक शक्ति बना हुआ है।",
    },
    homeS9H1T1: {
        [Language.English]: "Frequently Asked",
        [Language.Hindi]: "अक्सर पूछे जाने",
    },
    homeS9H1T2: {
        [Language.English]: `<span class="lg-text-highlighted">Questions</span>`,
        [Language.Hindi]: `वाले <span class="lg-text-highlighted"> सवाल</span>`,
    },
    homeS9Q1Q: {
        [Language.English]: "Which inverter battery is best for my use?",
        [Language.Hindi]: "मेरे उपयोग के लिए कौन सी इन्वर्टर बैटरी सबसे अच्छी है?",
    },
    homeS9Q1A: {
        [Language.English]: `Livguard's <a href="/load-calculator" class="tw-underline">Power Planner</a>, a Load Calculator tool helps you find the best inverter battery for your energy needs. Trust Livguard for superior performance and durability.`,
        [Language.Hindi]: `लिवगार्ड का <a href="/load-calculator" class="tw-underline">पावर प्लानर</a>, एक लोड कैलकुलेटर टूल आपको आपकी ऊर्जा आवश्यकताओं के लिए सबसे अच्छी इन्वर्टर बैटरी ढूंढने में मदद करता है। उत्कृष्ट प्रदर्शन और लंबे जीवन के लिए लिवगार्ड पर भरोसा करें।`,
    },
    homeS9Q2Q: {
        [Language.English]: "How to connect inverter to battery ?",
        [Language.Hindi]: " इनवर्टर को बैटरी से कैसे कनेक्ट करें?",
    },
    homeS9Q2A: {
        [Language.English]: `Connecting an inverter to a battery is a simple process of ensuring compatibility, connecting the cables, and testing. <a href="/inverter-batteries" class="tw-underline">Livguard Inverter Batteries</a> are designed for seamless compatibility and superior performance, ensuring reliable and uninterrupted power supply for your home or office.`,
        [Language.Hindi]: `इनवर्टर को बैटरी से कनेक्ट करना एक सरल प्रक्रिया है जिसमें संगतता की सुनिश्चितता, केबल कनेक्शन और टेस्टिंग शामिल होती है। <a href="/inverter-batteries" class="tw-underline">लिवगार्ड इन्वर्टर बैटरी</a> सुविधाजनक संगतता और बेहतर प्रदर्शन के लिए डिज़ाइन की गई हैं, जो आपके घर या ऑफिस के लिए विश्वसनीय और अविराम बिजली आपूर्ति सुनिश्चित करती हैं।`,
    },
    homeS9Q3Q: {
        [Language.English]: "Which inverter is best for home?",
        [Language.Hindi]: "कौन सा इन्वर्टर घर के लिए सबसे अच्छा है?",
    },
    homeS9Q3A: {
        [Language.English]: `When it comes to selecting the best inverter for your home, Livguard Inverter is the top choice. Use our <a href="/load-calculator" class="tw-underline">Power Planner</a>, your personal load calculator to find the right inverter for you.`,
        [Language.Hindi]: `जब आपके घर के लिए सर्वश्रेष्ठ इन्वर्टर चुनने की बात आती है, तो लिवगार्ड इन्वर्टर शीर्ष विकल्प है। आपके लिए सही इन्वर्टर खोजने के लिए हमारे <a href="/load-calculator" class="tw-underline">पावर प्लानर</a>, आपके व्यक्तिगत लोड कैलकुलेटर का उपयोग करें।`,
    },
    homeS9Q4Q: {
        [Language.English]: "Are inverters for the home and the office different? ",
        [Language.Hindi]: "क्या घर और ऑफिस के लिए इनवर्टर अलग-अलग हैं?",
    },
    homeS9Q4A: {
        [Language.English]: `Inverters are the same for both homes and offices, however, their capacities differ based on power needs & backup required. Whether you need an inverter for your home or business, Livguard has a variety of <a href="/inverter-batteries" class="tw-underline">quality and durable options</a> to choose from.`,
        [Language.Hindi]: `इन्वर्टर घरों और कार्यालयों दोनों के लिए समान हैं, हालांकि, बिजली की जरूरतों और आवश्यक बैकअप के आधार पर उनकी क्षमता भिन्न होती है। चाहे आपको अपने घर या व्यवसाय के लिए इन्वर्टर की आवश्यकता हो, लिवगार्ड के पास चुनने के लिए कई प्रकार के <a href="/inverter-batteries" class="tw-underline">विकल्प</a> हैं।`,
    },
    homeS9Q5Q: {
        [Language.English]: "How does the Power Planner work?",
        [Language.Hindi]: "मेरे उपयोग के लिए कौन सी इन्वर्टर बैटरी सबसे अच्छी है?",
    },
    homeS9Q5A: {
        [Language.English]: `The <a href="/load-calculator" class="tw-underline">Livguard Power Planner</a> is a personalised Load Calculator that suggests you the best Livguard Inverter and Inverter Battery based on devices you choose, backup hours needed, and average power use. It guarantees reliable power backup solution for your home.`,
        [Language.Hindi]: `<a href="/load-calculator" class="tw-underline">लिवगार्ड का पावर प्लानर</a>, एक लोड कैलकुलेटर टूल आपको आपकी ऊर्जा आवश्यकताओं के लिए सबसे अच्छी इन्वर्टर बैटरी ढूंढने में मदद करता है। उत्कृष्ट प्रदर्शन और लंबे जीवन के लिए लिवगार्ड पर भरोसा करें।`,
    },
    homeS9T2P1: {
        [Language.English]: "Got questions on your mind?",
        [Language.Hindi]: "क्या आपके मन में कुछ सवाल हैं?",
    },
    homeS9T2P2: {
        [Language.English]: "Find your answers here",
        [Language.Hindi]: "अपने सभी जवाब यहाँ पाइए",
    },
    homeS9T3P1: {
        [Language.English]: "Looking for service resolution?",
        [Language.Hindi]: "सर्विस समाधान की खोज में?",
    },
    homeS9T3P2: {
        [Language.English]: "Contact us at",
        [Language.Hindi]: "हम सप्ताह के सभी दिन सुबह 8 बजे से रात 8 बजे के बीच",
    },
    homeS9T3P3: {
        [Language.English]: "+91 18001025551",
        [Language.Hindi]: "+91 18001025551",
    },
    homeS9T3P4: {
        [Language.English]: "at any day of the week between 8 am to 8 pm, and our team will resolve it within 48 hours!",
        [Language.Hindi]: "पर उपलब्ध हैं।हम आपकी समस्या का समाधान 48 घंटों के अंदर करेंगे!",
    },
    homeS10H1T1: {
        [Language.English]: "We Are",
        [Language.Hindi]: "हम हर",
    },
    homeS10H1T2: {
        [Language.English]: `<span class="lg-text-highlighted">Everywhere!</span>`,
        [Language.Hindi]: `<span class="lg-text-highlighted">जगह हैं!</span>`,
    },
    homeS10T2: {
        [Language.English]: "Available Across 21000+ Pincodes",
        [Language.Hindi]: "21000+ पिन कोड में उपलब्ध",
    },
    homeS10T3: {
        [Language.English]: "Find My Dealer",
        [Language.Hindi]: "नज़दीकी डीलर खोजें",
    },
    homeS11H1T1: {
        [Language.English]: "Shower Some Love",
        [Language.Hindi]: "प्यार बरसाएं हमारे",
    },
    homeS11H1T2: {
        [Language.English]: `On Our <span class="lg-text-highlighted">Social Handles</span>`,
        [Language.Hindi]: `<span class="lg-text-highlighted">सोशल हैंडल</span> पर!`,
    },
    homeS11T2: {
        [Language.English]: "Find Us On",
        [Language.Hindi]: "हमें यहाँ तलाशें",
    },
    homeS12H1T1: {
        [Language.English]: `Powerful <span class="lg-text-highlighted">Purpose</span>`,
        [Language.Hindi]: `शक्तिशाली <span class="lg-text-highlighted">उद्देश्य</span>`,
    },
    homeS12H1T2: {
        [Language.English]: "Powerful Impact",
        [Language.Hindi]: "शक्तिशाली प्रभाव",
    },
    homeS12T2: {
        [Language.English]:
            "Livguard, through its Corporate Social Responsibility, fulfills its commitment towards the community. We persistently make efforts to bring an impact on the lives of people around us with significant actions in the fields of",
        [Language.Hindi]:
            "लिवगार्ड, अपने कॉर्पोरेट सामाजिक उत्तरदायित्व के माध्यम से, समुदाय के प्रति अपनी ज़िम्मेदारियों को पूरा करता है। हम लगातार अपने आसपास के लोगों के जीवन पर प्रभाव लाने के लिए महत्वपूर्ण कार्यों के साथ प्रयास करते हैं, निम्नलिखित क्षेत्रों में",
    },
    homeS12T3P1: {
        [Language.English]: "Education Promotion",
        [Language.Hindi]: "शिक्षा क्षेत्र",
    },
    homeS12T3P2: {
        [Language.English]: "Healthcare Promotion",
        [Language.Hindi]: "स्वास्थ्य क्षेत्र",
    },
    homeS12T3P3: {
        [Language.English]: "Livelihood Promotion",
        [Language.Hindi]: "आजीविका क्षेत्र",
    },
    homeS12T3P4: {
        [Language.English]: "Ensuring Environmental Stability",
        [Language.Hindi]: "पर्यावरणीय स्थिरता क्षेत्र",
    },
    homeS12T4: {
        [Language.English]: "Know More",
        [Language.Hindi]: "अधिक जानिए",
    },
    homeS13H1T1: {
        [Language.English]: `In The <span class="lg-text-highlighted">News</span>`,
        [Language.Hindi]: "???",
    },

    landingPage1S1T1: {
        [Language.English]: `Empowering India With <br /> Unlimited Energy`,
        [Language.Hindi]: `सशक्त भारत के लिए <br /> असीमित ऊर्जा`,
    },
    landingPage1S1T2: {
        [Language.English]: "Transition into a world of Futuristic Products backed by Unmatched Quality",
        [Language.Hindi]: "बेजोड़ गुणों से बने आधुनिक उपकरणों का अनुभव करें ",
    },
    landingPage1S1T3: {
        [Language.English]: "Connect Now",
        [Language.Hindi]: "संपर्क करें",
    },

    landingPage1S3HT1: {
        [Language.English]: "Transforming Energy Experiences",
        [Language.Hindi]: "हिस्सा बनिये",
    },
    landingPage1S3HT2: {
        [Language.English]: `With <span class="lg-text-highlighted">Limitless Energy</span>`,
        [Language.Hindi]: `<span class="lg-text-highlighted">असीमित ऊर्जा</span> के अनुभव का`,
    },
    landingPage1S3Slide1Title: {
        [Language.English]: "Futuristic Products",
        [Language.Hindi]: "आधुनिक उत्पाद",
    },
    landingPage1S3Slide1Body: {
        [Language.English]: "At Livguard, we strive to stay up to date with the changing needs in the energy storage solution sector and adapt proactively to meet those needs effectively.",
        [Language.Hindi]: "हम ऊर्जा संग्रहण समाधान क्षेत्र में बदलती जरूरतों के साथ अद्यतित रहने का प्रयास करते हैं और उन जरूरतों को प्रभावित ढंग से पूरा करने के लिए सक्रिय रूप से तत्पर रहते हैं।",
    },
    landingPage1S3Slide2Title: {
        [Language.English]: "End-to-end Energy Storage Solutions",
        [Language.Hindi]: "हर ज़रूरत के लिए समाधान",
    },
    landingPage1S3Slide2Body: {
        [Language.English]: "Whether home solutions or mobility solutions, Livguard offers a complete range of energy solutions that meet your needs with outstanding performance.",
        [Language.Hindi]: "घर संबंधित हो या वाहन संबंधित, लिवगार्ड के साथ आपको अपनी हर ज़रूरत के लिए उत्पाद मिलेंगे, जो आपकी उम्मीदों पर खड़े उतरेंगे।",
    },
    landingPage1S3Slide3Title: {
        [Language.English]: "Customer Centric",
        [Language.Hindi]: "सबसे पहले ग्राहक",
    },
    landingPage1S3Slide3Body: {
        [Language.English]:
            "With our well-rooted service network of over 40 service centers and availability of products across 21000+ pin codes, we are always ready to serve you with your problems as and when you need us.",
        [Language.Hindi]: "21000 पिन कोड में उपस्थित हमारे उत्पाद और सर्विस केंद्रों के साथ हम हमेशा आपकी समस्याओं को मिटाने के लिए तैयार रहते हैं।",
    },
    landingPage1S3BT: {
        [Language.English]: "Explore Now",
        [Language.Hindi]: "पता करें",
    },

    landingPageS4HT1: {
        [Language.English]: "Quality Meets",
        [Language.Hindi]: `गुणवत्ता और <span class="lg-text-highlighted">विशेषज्ञता</span>`,
    },
    landingPageS4HT2: {
        [Language.English]: `<span class="lg-text-highlighted">Expertise</span>`,
        [Language.Hindi]: "का मेल",
    },
    landingPageS4Box1T1: {
        [Language.English]: "21000+",
        [Language.Hindi]: "21000+",
    },
    landingPageS4Box1T2: {
        [Language.English]: "Pincodes Served",
        [Language.Hindi]: "पिन कोड में उपलब्ध",
    },
    landingPageS4Box2T1: {
        [Language.English]: "40+",
        [Language.Hindi]: "40+",
    },
    landingPageS4Box2T2: {
        [Language.English]: "Service Centres",
        [Language.Hindi]: "सर्विस केंद्र",
    },
    landingPageS4Box3T1: {
        [Language.English]: "4000+",
        [Language.Hindi]: "4000+",
    },
    landingPageS4Box3T2: {
        [Language.English]: "Dealers & Distributors",
        [Language.Hindi]: "डीलर और वितरक",
    },
    landingPageS4Box4T1: {
        [Language.English]: "1 Cr+",
        [Language.Hindi]: "1 Cr+",
    },
    landingPageS4Box4T2: {
        [Language.English]: "Happy Customers",
        [Language.Hindi]: "सुखी ग्राहक",
    },
    landingPage2S1T1: {
        [Language.English]: `Go Limitless with <br /> Best in Class Products`,
        [Language.Hindi]: `उत्तमता जो आपको <br /> असीमित बनाये`,
    },
    landingPage2S1T2: {
        [Language.English]: "Made with experience and manufactured till perfection",
        [Language.Hindi]: "अपनी कला में अनुभव रखने वाले माहिर लोगों द्वारा बनाये गये उत्पाद",
    },
    landingPage2S1T3: {
        [Language.English]: "Connect Now",
        [Language.Hindi]: "संपर्क करें",
    },
    landingPage2S4HT1: {
        [Language.English]: "Explore Unlimited Energy",
        [Language.Hindi]: "इनवर्टर और बैटरी की",
    },
    landingPage2S4HT2: {
        [Language.English]: `With Our Top <span class="[@media(max-width:1024px)]:lg-text-highlighted lg:lg-text-title1">Combo</span>`,
        [Language.Hindi]: `बेहतरीन <span class="[@media(max-width:1024px)]:lg-text-highlighted lg:lg-text-title1">जोड़ियाँ</span> आपके लिए`,
    },
    landingPage2S4CTABT: {
        [Language.English]: "Know More",
        [Language.Hindi]: "अधिक जानिए",
    },

    landingPage2S4KeySpecificationTitle: {
        [Language.English]: "Key Specifications of The Combo",
        [Language.Hindi]: "कॉम्बो के मुख्य स्पेसिफिकेशन",
    },
    landingPage2S4Specification1Title: {
        [Language.English]: "Warranty",
        [Language.Hindi]: "गारंटी",
    },
    landingPage2S4Specification2Title: {
        [Language.English]: "Rating",
        [Language.Hindi]: "रेटिंग",
    },
    landingPage2S4Specification3Title: {
        [Language.English]: "Capacity",
        [Language.Hindi]: "कैपेसिटी",
    },
    landingPage2S4Specification4Title: {
        [Language.English]: "Techonolgy ",
        [Language.Hindi]: "तकनीकी",
    },

    landingPage2S4J1Title: {
        [Language.English]: "The Urban Combo",
        [Language.Hindi]: "अर्बन कॉम्बो",
    },
    landingPage2S4J1Description: {
        [Language.English]:
            "A perfect Combo to match the needs of your urban lifestyle, efficiently. With pure sine wave output and smart AI charging, this combo can go on for hours and take heavy loads of appliances.",
        [Language.Hindi]:
            "आपकी शहरी जीवन शैली की जरूरतों को कुशलता से पूरा करने के लिए एक आदर्श कॉम्बो। शुद्ध साइन वेव आउटपुट और स्मार्ट एआई चार्जिंग के साथ, यह कॉम्बो घंटों तक चल सकती है और उपकरणों का भारी लोड उठा सकती है।",
    },
    landingPage2S4J1Specification1Content: {
        [Language.English]: "60 Months",
        [Language.Hindi]: "60 महीने",
    },
    landingPage2S4J1Specification2Content: {
        [Language.English]: "3500 VA",
        [Language.Hindi]: "3500 वीए",
    },
    landingPage2S4J1Specification3Content: {
        [Language.English]: "150 Ah",
        [Language.Hindi]: "150 एएच",
    },
    landingPage2S4J1Specification4Content: {
        [Language.English]: "Sine Wave",
        [Language.Hindi]: "साइन तरंग",
    },
    landingPage2S4J2Title: {
        [Language.English]: "The Peace of Mind Combo",
        [Language.Hindi]: "मन की शांति वाली कॉम्बो",
    },
    landingPage2S4J2Description: {
        [Language.English]:
            "A Combo that would assure your peace of mind with its long durability and high backup power. Precisely chosen battery paired with the sturdy inverter ensures a seamless flow of energy to meet your needs.",
        [Language.Hindi]:
            "एक कॉम्बो जो अपने लंबे जीवन और उच्च बैकअप शक्ति के साथ आपके मन की शांति सुनिश्चित करेगी। मजबूत इनवर्टर के साथ सटीक रूप से चुनी गई बैटरी आपकी आवश्यकताओं को पूरा करने के लिए ऊर्जा का निर्बाध प्रवाह सुनिश्चित करती है।",
    },
    landingPage2S4J2Specification1Content: {
        [Language.English]: "60 Months",
        [Language.Hindi]: "60 महीने",
    },
    landingPage2S4J2Specification2Content: {
        [Language.English]: "1500 VA",
        [Language.Hindi]: "1500 वीए",
    },
    landingPage2S4J2Specification3Content: {
        [Language.English]: "200 Ah",
        [Language.Hindi]: "200 एएच",
    },
    landingPage2S4J2Specification4Content: {
        [Language.English]: "Sqaure Wave",
        [Language.Hindi]: "चौकोर तरंग",
    },
    landingPage2S4J3Title: {
        [Language.English]: "The Super Life Combo",
        [Language.Hindi]: "सुपर लाइफ कॉम्बो",
    },
    landingPage2S4J3Description: {
        [Language.English]: "With a battery backed with the best-in-class warranty and a long-lasting inverter, this Combo is just the right choice for your everyday energy requirements.",
        [Language.Hindi]: "बेस्ट-इन-क्लास वारंटी और लंबे समय तक चलने वाले इनवर्टर के साथ समर्थित बैटरी के साथ, यह कॉम्बो आपकी रोजमर्रा की ऊर्जा आवश्यकताओं के लिए बिल्कुल सही विकल्प है।",
    },
    landingPage2S4J3Specification1Content: {
        [Language.English]: "84 Months",
        [Language.Hindi]: "84 महीने",
    },
    landingPage2S4J3Specification2Content: {
        [Language.English]: "3500 VA",
        [Language.Hindi]: "3500 वीए",
    },
    landingPage2S4J3Specification3Content: {
        [Language.English]: "150 Ah",
        [Language.Hindi]: "150 एएच",
    },
    landingPage2S4J3Specification4Content: {
        [Language.English]: "Sine Wave",
        [Language.Hindi]: "साइन तरंग",
    },
    landingPage2S4J4Title: {
        [Language.English]: "The Hi-power Combo",
        [Language.Hindi]: "हाई-पॉवर कॉम्बो",
    },
    landingPage2S4J4Description: {
        [Language.English]:
            "The perfect Combo to meet the backup requirements for long hours. Smart AI charging along with the pure sinewave output delivers a smooth and efficient energy flow with enhanced life.",
        [Language.Hindi]:
            "लंबे समय तक बैकअप आवश्यकताओं को पूरा करने के लिए एकदम सही कॉम्बो। शुद्ध साइनवेव आउटपुट के साथ स्मार्ट एआई चार्जिंग बेहतर जीवन के साथ एक सहज और कुशल ऊर्जा प्रवाह प्रदान करता है।",
    },
    landingPage2S4J4Specification1Content: {
        [Language.English]: "72 Months",
        [Language.Hindi]: "72 महीने",
    },
    landingPage2S4J4Specification2Content: {
        [Language.English]: "800 VA",
        [Language.Hindi]: "800 वीए",
    },
    landingPage2S4J4Specification3Content: {
        [Language.English]: "260 Ah",
        [Language.Hindi]: "260 एएच",
    },
    landingPage2S4J4Specification4Content: {
        [Language.English]: "Sine Wave",
        [Language.Hindi]: "साइन तरंग",
    },

    landingPage2S5HT1: {
        [Language.English]: "Why",
        [Language.Hindi]: `<span class="lg-text-highlighted">लिवगार्ड कॉम्बो</span>`,
    },
    landingPage2S5HT2: {
        [Language.English]: `<span class="lg-text-highlighted">Livguard Combo?</span>`,
        [Language.Hindi]: "बेहतर क्यों है",
    },
    landingPage2S5LivH: {
        [Language.English]: "Livguard",
        [Language.Hindi]: "लिवगार्ड",
    },
    landingPage2S5T1: {
        [Language.English]: "AI Charing",
        [Language.Hindi]: "एआई चार्जिंग",
    },
    landingPage2S5T2: {
        [Language.English]: "3D Grid Technology",
        [Language.Hindi]: "3डी ग्रिड तकनीक",
    },
    landingPage2S5T3: {
        [Language.English]: "Longer Life",
        [Language.Hindi]: "लंबी अवधि",
    },
    landingPage2S5T4: {
        [Language.English]: "Better Battery Compatibility",
        [Language.Hindi]: "बेहतर बैटरी संगति",
    },
    landingPage2S5OBH: {
        [Language.English]: "Other Brand",
        [Language.Hindi]: "अन्य ब्रांड",
    },
    landingPage2S7HT1: {
        [Language.English]: "Explore our",
        [Language.Hindi]: "आपके लिए",
    },
    landingPage2S7HT2: {
        [Language.English]: `<span class="lg-text-highlighted">Star Products</span>`,
        [Language.Hindi]: `हमारे सबसे <span class="lg-text-highlighted">बेहतरीन उत्पाद</span>`,
    },
    landingPage2S7CTABT: {
        [Language.English]: "View product",
        [Language.Hindi]: "विस्तार से देखें",
    },

    landingPage3S1T1: {
        [Language.English]: `Smart & Strong Home Inverter and Battery <span class="lg-text-highlighted">Combo</span>`,
        [Language.Hindi]: `घर के लिए स्मार्ट और स्ट्रॉंग इनवर्टर और बैटरी <span class="lg-text-highlighted">कॉम्बो</span>`,
    },
    landingPage3S1T2: {
        [Language.English]: "Empower your home with the perfect combo to compliment your home needs",
        [Language.Hindi]: "अपने घर को सशक्त बनाएँ सही इनवर्टर और बैटरी की कॉम्बो के साथ",
    },
    landingPage3S1T3: {
        [Language.English]: "Connect Now",
        [Language.Hindi]: "संपर्क करें",
    },
    landingPage3S3T1: {
        [Language.English]: "Enter Location,city or Pincode",
        [Language.Hindi]: "?????",
    },
    landingPage3S3T2: {
        [Language.English]: "Use Current Location",
        [Language.Hindi]: "?????",
    },
    landingPage3S3T3: {
        [Language.English]: "Find My Dealer",
        [Language.Hindi]: "?????",
    },

    landingPage3S7HT1: {
        [Language.English]: `Top Reasons to Buy Home`,
        [Language.Hindi]: `घर के लिए इनवर्टर और बैटरी <span class="lg-text-highlighted">कॉम्बो</span>`,
    },
    landingPage3S7HT2: {
        [Language.English]: `Inverter and Battery <span class="lg-text-highlighted">Combo</span>`,
        [Language.Hindi]: `ख़रीदने के मुख्य कारण`,
    },

    landingPage3S7Slide1Heading: {
        [Language.English]: "Effortless Compatibility",
        [Language.Hindi]: "सहज अनुकूलता",
    },
    landingPage3S7Slide1Content: {
        [Language.English]: "Livguard inverter and inverter battery combos offer a seamless compatibility which combine together for an uninterrupted flow of energy.",
        [Language.Hindi]: "लिवगार्ड इनवर्टर और इनवर्टर बैटरी कॉम्बो एक सहज अनुकूलता प्रदान करते हैं जो ऊर्जा के बिना रुकावट प्रवाह के लिए एक साथ जुड़ते हैं।",
    },
    landingPage3S7Slide2Heading: {
        [Language.English]: "Seamless Service",
        [Language.Hindi]: "निरंतर सर्विस",
    },
    landingPage3S7Slide2Content: {
        [Language.English]: "With Livguard Combos at your home, experience the comfort of hassle-free servicing for both the products, whenever you need.",
        [Language.Hindi]: "अपने घर पर लिवगार्ड कॉम्बो के साथ,इनवर्टर और इनवर्टर बैटरी के लिए आरामदायक सर्विसिंग का अनुभव करें ,जब  भी आपको आवश्यकता हो।",
    },
    landingPage3S7Slide3Heading: {
        [Language.English]: "Long Life",
        [Language.Hindi]: "लंबा जीवन",
    },
    landingPage3S7Slide3Content: {
        [Language.English]: "The perfect match of inverter and inverter battery in Livguard Combos ensure a longer , more efficient life of the products for you.",
        [Language.Hindi]: "लिवगार्ड कॉम्बो में इनवर्टर और इनवर्टर बैटरी का सही मेल आपके उत्पादों का लंबा, अधिक कुशल जीवन सुनिश्चित करता है।",
    },
    landingPage3S7BT: {
        [Language.English]: "Reach out to Us",
        [Language.Hindi]: "हमसे संपर्क करें",
    },

    //Category Batteries
    categoryBatteriesS1T1: {
        [Language.English]: "Strong Inverter Batteries",
        [Language.Hindi]: "स्ट्रॉंग इनवर्टर बैटरी",
    },
    categoryBatteriesS1T2: {
        [Language.English]: "For A Limitless Experience",
        [Language.Hindi]: "एक असीम अनुभव के लिए",
    },
    categoryBatteriesS1T3: {
        [Language.English]: "Inverter Batteries with a powerful backup, made to empower your home with limitless energy whenever you need",
        [Language.Hindi]: "दमदार बैकअप वाली इनवर्टर बैटरियां,जो आपकी जरूरतों के अनुसार, आपके घर को असीम ऊर्जा से सशक्त बनाने के लिए बनाई गई हैं",
    },
    categoryBatteriesS2HT1: {
        [Language.English]: "Strong Batteries That Are",
        [Language.Hindi]: "स्ट्रॉंग इनवर्टर बैटरी",
    },
    categoryBatteriesS2HT2: {
        [Language.English]: `<span class="lg-text-highlighted">Meant To Last</span>`,
        [Language.Hindi]: `<span class="lg-text-highlighted">स्जो सालों साल चलें</span>`,
    },
    categoryBatteriesS2Slide1Heading: {
        [Language.English]: "Futuristic Design",
        [Language.Hindi]: "आधुनिक बनावट",
    },
    categoryBatteriesS2Slide1Description: {
        [Language.English]:
            "Livguard Inverter Batteries are manufactured with PPC Plastic to avoid leakage and keeping in mind the customer’s needs to deliver the safest and aesthetic designs for you",
        [Language.Hindi]: "लिवगार्ड की इनवर्टर बैटरी पी पी सी प्लास्टिक से बनीं हैं, जो बैटरी को लीक होने से बचाती है  और ग्राहकों को हर बार सुंदर और सुरक्षित अनुभव देती हैं।",
    },
    categoryBatteriesS2Slide2Heading: {
        [Language.English]: "SuperTUFF 3D Grid",
        [Language.Hindi]: "सुपरटफ 3डी ग्रिड",
    },
    categoryBatteriesS2Slide2Description: {
        [Language.English]:
            "With the industry’s first Supertuff 3D Grid design paired with a double-sided pasting, Livguard Inverter Batteries hold negative active material 20% longer, resulting in a longer battery life",
        [Language.Hindi]: "उद्योग की सबसे पहली 3डी ग्रिड तकनीक और दो-तरफ़ पेस्टिंग से बनी लिवगार्ड इनवर्टर बैटरी नेगेटिव ऐक्टिव मटेरियल को 20% ज़्यादा रोकती है, जो बैटरी की अवधि भी बढ़ती है।",
    },
    categoryBatteriesS2Slide3Heading: {
        [Language.English]: "Assured Warranty",
        [Language.Hindi]: "सुनिश्चित वारंटी",
    },
    categoryBatteriesS2Slide3Description: {
        [Language.English]:
            "The best-in-class warranties across all ranges as well as low maintenance requirements, make the Livguard Inverter Batteries suitable for all customers, whatever their needs may be",
        [Language.Hindi]: "सभी श्रेणियों में सर्वश्रेष्ठ वारंटी के साथ-साथ कम देखभाल की आवश्यकताएं लिवगार्ड इनवर्टर बैटरी को सभी ग्राहकों के लिए उपयुक्त बनाती हैं, चाहे उनकी कोई भी आवश्यकता हो।",
    },
    categoryBatteriesS2Slide4Heading: {
        [Language.English]: "Non- Woven Gauntlet",
        [Language.Hindi]: "गैर-बुना गौंटलेट",
    },
    categoryBatteriesS3T1: {
        [Language.English]: "Get To Know",
        [Language.Hindi]: `<span class="lg-text-highlighted">हमारी बैटरी</span> को`,
    },
    categoryBatteriesS3T2: {
        [Language.English]: `<span class="lg-text-highlighted">Our Batteries</span> In Detail`,
        [Language.Hindi]: "विस्तार से समझें",
    },
    categoryBatteriesS3R1C2: {
        [Language.English]: "Flat Plate",
        [Language.Hindi]: "फ्लैट प्लेट",
    },
    categoryBatteriesS3R1C3: {
        [Language.English]: "Tubular",
        [Language.Hindi]: "ट्यूबलर प्लेट",
    },
    categoryBatteriesS3R2C1: {
        [Language.English]: "Cycle Life",
        [Language.Hindi]: "साइकिल जीवन",
    },
    categoryBatteriesS3R2C2: {
        [Language.English]: "Longer",
        [Language.Hindi]: "लंबा",
    },
    categoryBatteriesS3R2C3: {
        [Language.English]: "Assures a longer cycle life that empowers your home for the long run.",
        [Language.Hindi]: "लंबी साइकिल जीवन का वादा जो आपके घर को लंबे समय तक के लिए सशक्त करे।",
    },
    categoryBatteriesS3R3C1: {
        [Language.English]: "Application Suitability",
        [Language.Hindi]: "आप्लिकेशन उपयुक्तता",
    },
    categoryBatteriesS3R3C2: {
        [Language.English]: "Suitable for high power cut applications",
        [Language.Hindi]: "लंबे समय के बिजली कट के लिए उपयुक्त।",
    },
    categoryBatteriesS3R3C3: {
        [Language.English]: "Suitable for high-power cut applications.",
        [Language.Hindi]: "लंबे समय के बिजली कट के लिए उपयुक्त।",
    },
    categoryBatteriesS3R4C1: {
        [Language.English]: "Cost of Ownership",
        [Language.Hindi]: "मालिकी की क़ीमत",
    },
    categoryBatteriesS3R4C2: {
        [Language.English]: "Relatively Lower",
        [Language.Hindi]: "अपेक्षाकृत कम",
    },
    categoryBatteriesS3R4C3: {
        [Language.English]: "Highly Economical, with various options to choose from.",
        [Language.Hindi]: "अत्यधिक किफायती, विभिन्न विकल्पों के साथ।",
    },
    categoryBatteriesS3R5C1: {
        [Language.English]: "Maintenace",
        [Language.Hindi]: "मेंटेनेंस",
    },
    categoryBatteriesS3R5C2: {
        [Language.English]: "Lower",
        [Language.Hindi]: "कम",
    },
    categoryBatteriesS3R5C3: {
        [Language.English]: "Hassle-free usage with low maintenance requirements.",
        [Language.Hindi]: "परेशानी मुक्त उपयोग कम देख-रेख की आवश्यकता के साथ।",
    },
    categoryBatteriesS3R6C1: {
        [Language.English]: "Options",
        [Language.Hindi]: "विकल्प",
    },
    categoryBatteriesS3R6C2: {
        [Language.English]: "No further are options available",
        [Language.Hindi]: "आगे कोई विकल्प उपलब्ध नहीं है",
    },
    categoryBatteriesS3R6C3: {
        [Language.English]: "Options include ST/TT/STJ/STT",
        [Language.Hindi]: "विकल्पों में एसटी/टीटी/एसटीजे/एसटीटी शामिल हैं",
    },
    categoryBatteriesS2Slide4Description: {
        [Language.English]: "The premium high-quality gauntlet provides extra strength to the tubular plate which reduces tube bursting and offers extra backup with a longer battery life",
        [Language.Hindi]: "प्रीमियम उच्च-क्वालिटी वाला गौंटलेट ट्यूबलर प्लेट को अतिरिक्त ताकत प्रदान करता है जो ट्यूब को फटने से बचाता है और लंबी बैटरी लाइफ के साथ अतिरिक्त बैकअप प्रदान करता है",
    },
    categoryBatteriesS4HT1: {
        [Language.English]: `<span class="lg-text-highlighted">Our Suggestion</span>`,
        [Language.Hindi]: `<span class="lg-text-highlighted">हमारा सुझाव</span>`,
    },
    categoryBatteriesS4HT2: {
        [Language.English]: "To Power Up Your Home",
        [Language.Hindi]: "आपके घर को रोशन करने के लिए",
    },
    categoryBatteriesS4Heading: {
        [Language.English]: "Select Battery Type",
        [Language.Hindi]: "बैटरी का टाइप चुनें",
    },
    categoryBatteriesS4TT: {
        [Language.English]: "Long Lasting",
        [Language.Hindi]: "लाँग लास्टिंग",
    },
    categoryBatteriesS4ST: {
        [Language.English]: "Extra Long Lasting",
        [Language.Hindi]: "एक्स्ट्रा लाँग लास्टिंग",
    },
    categoryBatteriesS4STT: {
        [Language.English]: "Ultra Long Lasting",
        [Language.Hindi]: "अल्ट्रा लाँग लास्टिंग",
    },
    categoryBatteriesS4SpecificationHeading: {
        [Language.English]: "Battery\nSpecifications",
        [Language.Hindi]: "बैटरी विवरण",
    },
    categoryBatteriesS4BT: {
        [Language.English]: "Explore Product",
        [Language.Hindi]: "विस्तार से देखें",
    },
    categoryBatteriesS2KS1Title: {
        [Language.English]: "Warranty",
        [Language.Hindi]: "वारंटी",
    },
    categoryBatteriesS2KS3Title: {
        [Language.English]: "3D Grid",
        [Language.Hindi]: "3D ग्रिड",
    },
    categoryBatteriesS2KS2Title: {
        [Language.English]: "Capacity",
        [Language.Hindi]: "क्षमता",
    },
    categoryBatteriesS2KS4Title: {
        [Language.English]: "Dimensions",
        [Language.Hindi]: "आयाम",
    },
    categoryBatteriesS4Slide1Heading: {
        [Language.English]: "IT1048ST",
        [Language.Hindi]: "IT1048ST",
    },
    categoryBatteriesS4Slide1Description: {
        [Language.English]:
            "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
        [Language.Hindi]:
            "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
    },
    categoryBatteriesSlide1KS1Description: {
        [Language.English]: "24 + 24* Months",
        [Language.Hindi]: "24 + 24* महीने",
    },
    categoryBatteriesSlide1KS2Description: {
        [Language.English]: "100 Ah",
        [Language.Hindi]: "100 Ah",
    },
    categoryBatteriesSlide1KS3Description: {
        [Language.English]: "Longer Life",
        [Language.Hindi]: "लम्बी अवधी",
    },
    categoryBatteriesSlide1KS4Description: {
        [Language.English]: "520(L) x 218(W) x 290(H)",
        [Language.Hindi]: "520(L) x 218(W) x 290(H)",
    },
    categoryBatteriesS4Slide2Heading: {
        [Language.English]: "IT1560STT",
        [Language.Hindi]: "IT1560STT",
    },
    categoryBatteriesS4Slide2Description: {
        [Language.English]:
            "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
        [Language.Hindi]:
            "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
    },
    categoryBatteriesSlide2KS1Description: {
        [Language.English]: "36 + 24* Months",
        [Language.Hindi]: "36 + 24* महीने",
    },
    categoryBatteriesSlide2KS2Description: {
        [Language.English]: "150 Ah",
        [Language.Hindi]: "150 Ah",
    },
    categoryBatteriesSlide2KS3Description: {
        [Language.English]: "Longer Life",
        [Language.Hindi]: "लम्बी अवधी",
    },
    categoryBatteriesSlide2KS4Description: {
        [Language.English]: "505(L) x 188(W) x 367(H)",
        [Language.Hindi]: "505(L) x 188(W) x 367(H)",
    },
    categoryBatteriesS4Slide3Heading: {
        [Language.English]: "IT1560STT",
        [Language.Hindi]: "IT1560STT",
    },
    categoryBatteriesS4Slide3Description: {
        [Language.English]:
            "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
        [Language.Hindi]:
            "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
    },
    categoryBatteriesSlide3KS1Description: {
        [Language.English]: "60 + 24* Months",
        [Language.Hindi]: "60 + 24* महीने",
    },
    categoryBatteriesSlide3KS2Description: {
        [Language.English]: "150 Ah",
        [Language.Hindi]: "150 Ah",
    },
    categoryBatteriesSlide3KS3Description: {
        [Language.English]: "Longer Life",
        [Language.Hindi]: "लम्बी अवधी",
    },
    categoryBatteriesSlide3KS4Description: {
        [Language.English]: "505(L) x 188(W) x 410(H)",
        [Language.Hindi]: "505(L) x 188(W) x 410(H)",
    },
    categoryBatteriesS4Slide1TypeDescription: {
        [Language.English]: "Batteries with an assured 4-year warranty to power up your home",
        [Language.Hindi]: "आपके घर को बिना किसी रुकावट के ऊर्जा देने के लिए 4 साल की सुनिश्चित वारंटी के साथ बनी बैटरी",
    },
    categoryBatteriesS4Slide2TypeDescription: {
        [Language.English]: "Experience unlimited energy with these 5-Year warranty batteries ",
        [Language.Hindi]: "इन 5 साल की वारंटी वाली बैटरी के साथ असीमित ऊर्जा का अनुभव करें",
    },
    categoryBatteriesS4Slide3TypeDescription: {
        [Language.English]: "Batteries with 7-year warranty to charge up your home for long-run",
        [Language.Hindi]: "आपके घर को लंबे समय तक प्रकाशित रखने के लिए 7 साल की वारंटी के साथ बैटरी",
    },
    categoryBatteriesS4Slide4TypeDescription: {
        [Language.English]: "Compliments your home with its compact size and higher backup.",
        [Language.Hindi]: "अपने कॉम्पैक्ट आकार और उच्च बैकअप के साथ अपने घर को बेहतर बनाने वाला विकल्प।",
    },
    categoryBatteriesS4Slide4Heading: {
        [Language.English]: "IT1636STJ",
        [Language.Hindi]: "IT1636STJ",
    },
    categoryBatteriesS4Slide4Description: {
        [Language.English]:
            "Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.",
        [Language.Hindi]:
            "बिना किसी परेशानी के लंबे समय तक बिजली के बिना रुकावट प्रवाह का आनंद लें। बेहतर प्रदर्शन के लिए हमारी बैटरी उद्योग की सबसे पहली 3डी ग्रिड तकनीक से बनाई गई है, जो बैटरी की लाँभी अवधि निश्चित करती है।",
    },
    categoryBatteriesSlide4KS1Description: {
        [Language.English]: "18 + 18* Months",
        [Language.Hindi]: "18 + 18* महीने",
    },
    categoryBatteriesSlide4KS2Description: {
        [Language.English]: "160 Ah",
        [Language.Hindi]: "160 Ah",
    },
    categoryBatteriesSlide4KS3Description: {
        [Language.English]: "Longer Life",
        [Language.Hindi]: "लम्बी अवधी",
    },
    categoryBatteriesSlide4KS4Description: {
        [Language.English]: "505 (L) X 188 (W) X 367 (H)",
        [Language.Hindi]: "505 (L) X 188 (W) X 367 (H)",
    },
    categoryBatteriesS4RelatedProductsHeading: {
        [Language.English]: "Related Products",
        [Language.Hindi]: "संबंधित उत्पाद",
    },
    categoryBatteriesS5HT1: {
        [Language.English]: "Side-by-Side Overview",
        [Language.Hindi]: "बैटरी साथ देखें",
    },
    categoryBatteriesS5F1Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
    },
    categoryBatteriesS5F2Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
    },
    categoryBatteriesS5F3Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
    },
    categoryBatteriesS5F4Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
    },
    categoryBatteriesS5F5Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
    },
    categoryBatteriesS5F6Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
    },
    categoryBatteriesS5Slide1Heading: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
    },
    categoryBatteriesS5Slide2Heading: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
    },
    categoryBatteriesS5Slide3Heading: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
    },
    categoryBatteriesS6HT1: {
        [Language.English]: `Suggested <span class="lg-text-highlighted">Combos</span>`,
        [Language.Hindi]: `सुझायी गई <span class="lg-text-highlighted">कॉम्बो</span>`, // TODO: Fix
    },
    categoryBatteriesS6Combo1Title: {
        [Language.English]: "The Urban Combo",
        [Language.Hindi]: "अर्बन जोड़ी",
    },
    categoryBatteriesS6Combo2Title: {
        [Language.English]: "The Peace of Mind Combo",
        [Language.Hindi]: "मन की शांति वाला जोड़ी",
    },
    categoryBatteriesS6Combo3Title: {
        [Language.English]: "The Super Life Combo",
        [Language.Hindi]: "सुपर लाइफ जोड़ी",
    },
    categoryBatteriesS6Combo4Title: {
        [Language.English]: "The Hi-Power Combo",
        [Language.Hindi]: "हाई-पॉवर कॉम्बो",
    },
    categoryBatteriesS6ComboButtontext: {
        [Language.English]: "View Product",
        [Language.Hindi]: "अधिक जानिए",
    },
    categoryBatteriesS6Buttontext: {
        [Language.English]: "Enquire Now",
        [Language.Hindi]: "संपर्क करें",
    },
    categoryBatteriesS8HT1: {
        [Language.English]: "Choose The Best",
        [Language.Hindi]: "घर लायें रोशनी",
    },
    categoryBatteriesS8HT2: {
        [Language.English]: `<span class="lg-text-highlighted">Inverter Battery</span> For You`,
        [Language.Hindi]: `उचित <span class="lg-text-highlighted">इनवर्टर बैटरी</span> से`,
    },
    categoryBatteriesS8Description: {
        [Language.English]:
            "Find the suitable pick of inverter that fulfils your requirements with efficiency. Use our Buying Guide to get to know in detail about how you can buy your inverter and our Product Catalogue for product specifications",
        [Language.Hindi]: "हमारे बाइंग गाइड और प्रोडक्ट कैटलॉग का उपयोग करके अपने लिए उपयुक्त इनवर्टर चुनें जो सहजता के साथ आपकी आवश्यकताओं को पूरा करें।",
    },
    categoryBatteriesS8B1T: {
        [Language.English]: "Buying Guide",
        [Language.Hindi]: "बाइंग गाइड",
    },
    categoryBatteriesS8B2T: {
        [Language.English]: "Download Catalog",
        [Language.Hindi]: "डाउनलोड कैटलॉग",
    },
    categoryBatteriesS8BT: {
        [Language.English]: "Let's Plan Your Power",
        [Language.Hindi]: "अपनी ऊर्जा को प्लान करें",
    },

    //Category Inverters
    categoryInvertersS1T1: {
        [Language.English]: "Smart Inverters",
        [Language.Hindi]: "स्मार्ट इनवर्टर",
    },
    categoryInvertersS1T2: {
        [Language.English]: "For A Limitless Experience",
        [Language.Hindi]: "एक असीम अनुभव के लिए",
    },
    categoryInvertersS1T3: {
        [Language.English]: "Inverters made with high-quality materials to ensure an unlimited flow of energy for you.",
        [Language.Hindi]: "आपके लिए ऊर्जा की असीमित प्रवाह सुनिश्चित करने के लिए उच्च कोटी की सामग्री से बने स्मार्ट इनवर्टर।",
    },
    categoryInvertersS2HT1: {
        [Language.English]: "Empower Your Home",
        [Language.Hindi]: "अपने घर को करें सशक्त ",
    },
    categoryInvertersS2HT2: {
        [Language.English]: `With <span class="lg-text-highlighted">Livguard Inverters</span>`,
        [Language.Hindi]: `<span class="lg-text-highlighted">लिवगार्ड इनवर्टर</span> के साथ`,
    },
    categoryInvertersS2Slide1Heading: {
        [Language.English]: "New Edge Design",
        [Language.Hindi]: "नए कोने वाले डिज़ाइन",
    },
    categoryInvertersS2Slide1Description: {
        [Language.English]:
            "Made with a team of experienced and skilled professionals, Livguard Inverters offer the best-in-class designs which complement your home along with a LED Display which indicates the current state of your inverter.",
        [Language.Hindi]:
            "अनुभवी और कुशल पेशेवरों की एक टीम के साथ बनाए गए लिवगार्ड इनवर्टर सर्वश्रेष्ठ बनावट प्रदान करते हैं। इनमें लगी एलईडी डिस्प्ले के साथ आप अपने इनवर्टर की वर्तमान स्थिति को देख सकते हैं।",
    },
    categoryInvertersS2Slide2Heading: {
        [Language.English]: "AI Charging",
        [Language.Hindi]: "एआई चार्जिंग",
    },
    categoryInvertersS2Slide2Description: {
        [Language.English]:
            "The AI Charging in our inverters automatically reads the battery’s charging voltage, backup & charge percentage and charges according to the battery needs. It also prevents overcharging for enhanced battery life.",
        [Language.Hindi]:
            "हमारे इनवर्टर में एआई चार्जिंग स्वचालित रूप से बैटरी की चार्जिंग वोल्टेज, बैकअप और चार्ज प्रतिशत को पढ़ती है और बैटरी की जरूरतों के अनुसार चार्ज करती है। यह बैटरी की लाइफ बढ़ाने के लिए ज़रूरत से ज़्यादा चार्जिंग को भी रोकती है।",
    },
    categoryInvertersS2Slide3Heading: {
        [Language.English]: "Assured Warranty",
        [Language.Hindi]: "सुनिश्चित वारंटी",
    },
    categoryInvertersS2Slide3Description: {
        [Language.English]:
            "With Livguard inverters, you can enjoy peace with the long warranty of 3 years. This flat warranty allows you to stay worry-free in case of any damages. Just reach out to us and we will take care of it for you.",
        [Language.Hindi]:
            "लिवगार्ड इनवर्टर के साथ, आप 3 साल की लंबी वारंटी के साथ शांति का आनंद ले सकते हैं। यह फ्लैट वारंटी आपको किसी भी नुकसान के मामले में चिंता मुक्त रहने के लिए सशक्त करती है। बस हमसे संपर्क करें और हम आपकी समस्या का समाधान करेंगे।",
    },
    categoryInvertersS2Slide4Heading: {
        [Language.English]: "Dual Sensor Thermal Protect",
        [Language.Hindi]: "डुअल सेंसर थर्मल प्रोटेक्ट",
    },
    categoryInvertersS2Slide4Description: {
        [Language.English]: "With Industry’s first thermal sensor for transformers, the sensor prevents the transformer from overheating and catching fire and enhances the life of your inverter.",
        [Language.Hindi]: "ट्रांसफॉर्मर के लिए उद्योग के पहले थर्मल सेंसर ट्रांसफॉर्मर को ज़्यादा गरम होने और आग पकड़ने से रोकता है और आपके इनवर्टर के जीवन को बढ़ाता है।",
    },
    categoryInvertersS3T1: {
        [Language.English]: `<span class="lg-text-highlighted">Choose Your Inverter</span>`,
        [Language.Hindi]: `<span class="lg-text-highlighted">अपना इनवर्टर चुनें</span>`,
    },
    categoryInvertersS3T2: {
        [Language.English]: "Based On Your Needs",
        [Language.Hindi]: "अपनी ज़रुरत अनुसार",
    },
    categoryInvertersS3R1C2: {
        [Language.English]: "Sine Wave",
        [Language.Hindi]: "साइन वेव",
    },
    categoryInvertersS3R1C3: {
        [Language.English]: "Square Wave",
        [Language.Hindi]: "स्क्वायर वेव",
    },
    categoryInvertersS3R2C1: {
        [Language.English]: "Technology",
        [Language.Hindi]: "तकनीक",
    },
    categoryInvertersS3R2C2: {
        [Language.English]: "Advanced + Ai Technology for better performance.",
        [Language.Hindi]: " एडवांस + ए आई तकनीक बेहतर प्रदर्शन के लिए।",
    },
    categoryInvertersS3R2C3: {
        [Language.English]: "Ai Technology for efficient charging and performance",
        [Language.Hindi]: "ए आई तकनीक, कुशल चार्जिंग और प्रदर्शन के लिए।",
    },
    categoryInvertersS3R3C1: {
        [Language.English]: "Device Support",
        [Language.Hindi]: "उपकरण समर्थन",
    },
    categoryInvertersS3R3C2: {
        [Language.English]: "Smooth backup for essential as well as sensitive appliances like Computers, Laptops, Refrigerators, and Ovens.",
        [Language.Hindi]: "आवश्यक और संवेदनशील उपकरणों जैसे कंप्यूटर, लैपटॉप, फ्रिज और ओवन के लिये सहज बैकअप।",
    },
    categoryInvertersS3R3C3: {
        [Language.English]: "Smooth backup for essential appliances like fans, lights, and motors.",
        [Language.Hindi]: "पंखे, लाइट और मोटर जैसे आवश्यक उपकरणों के लिए सहज बैकअप।",
    },
    categoryInvertersS3R4C1: {
        [Language.English]: "Safety",
        [Language.Hindi]: "सुरक्षा",
    },
    categoryInvertersS3R4C2: {
        [Language.English]: "Helps to maintain the longevity of appliances.",
        [Language.Hindi]: "उपकरणों की लंबी उमर बनाए रखने में मदद करता है।",
    },
    categoryInvertersS3R4C3: {
        [Language.English]: "--",
        [Language.Hindi]: "--",
    },
    categoryInvertersS3R5C1: {
        [Language.English]: "Price",
        [Language.Hindi]: "कीमत",
    },
    categoryInvertersS3R5C2: {
        [Language.English]: "Little expensive",
        [Language.Hindi]: "थोडा महंगा।",
    },
    categoryInvertersS3R5C3: {
        [Language.English]: "Economical option",
        [Language.Hindi]: "आर्थिक विकल्प।",
    },
    categoryInvertersS4HT1: {
        [Language.English]: `<span class="lg-text-highlighted">Our Suggestions</span>`,
        [Language.Hindi]: `<span class="lg-text-highlighted">हमारे सुझाव</span>`,
    },
    categoryInvertersS4HT2: {
        [Language.English]: "Based On Your Choice",
        [Language.Hindi]: "आपकी पसंद के आधार पर",
    },
    categoryInvertersS4Heading: {
        [Language.English]: "Select Inverter Type",
        [Language.Hindi]: "इनवर्टर का टाइप चुनें",
    },
    categoryInvertersS4BTFlat: {
        [Language.English]: "Sine",
        [Language.Hindi]: "साइन",
    },
    categoryInvertersS4BTTubular: {
        [Language.English]: "Square",
        [Language.Hindi]: "स्क्वायर",
    },
    categoryInvertersS4SpecificationHeading: {
        [Language.English]: "Inverter Specification",
        [Language.Hindi]: "इनवर्टर  विवरण",
    },
    categoryInvertersS4Slide1Heading: {
        [Language.English]: "LGS1100i",
        [Language.Hindi]: "LGS1100i",
    },
    categoryInvertersS4Slide1Description: {
        [Language.English]:
            "Inverter for Small Offices, Homes, and Small Shops with Best-in-Class Warranty and Smart AI Charging. With an assured warranty and Pure Sine Wave output, experience energy unlimited at your home with this Livguard Inverter",
        [Language.Hindi]:
            "छोटे कार्यालयों, घरों और छोटी दुकानों के लिए इनवर्टर, सर्वश्रेष्ठ श्रेणी की वारंटी और स्मार्ट एआई चार्जिंग के साथ    सुनिश्चित वारंटी और प्योर साइन वेव आउटपुट के साथ, हमारे लिवगार्ड इनवर्टर के साथ अपने घर पर असीमित ऊर्जा का अनुभव करें",
    },
    categoryInvertersS2Slide1KS1Title: {
        [Language.English]: "Warranty",
        [Language.Hindi]: "वारंटी",
    },
    categoryInvertersSlide1KS1Description: {
        [Language.English]: "3 Years",
        [Language.Hindi]: "3 साल",
    },
    categoryInvertersS2Slide1KS2Title: {
        [Language.English]: "Capacity",
        [Language.Hindi]: "क्षमता",
    },
    categoryInvertersSlide1KS2Description: {
        [Language.English]: "900VA",
        [Language.Hindi]: "900VA",
    },
    categoryInvertersS2Slide1KS3Title: {
        [Language.English]: "AI Charging",
        [Language.Hindi]: "ए आई चार्जिंग",
    },
    categoryInvertersSlide1KS3Description: {
        [Language.English]: "DSP Processor",
        [Language.Hindi]: "डी एस पी प्रोसेसर",
    },
    categoryInvertersS2Slide1KS4Title: {
        [Language.English]: "Dimensions",
        [Language.Hindi]: "आयाम",
    },
    categoryInvertersSlide1KS4Description: {
        [Language.English]: "275(L) X 297(W) X 123(H)",
        [Language.Hindi]: "275(L) X 297(W) X 123(H)",
    },
    categoryInvertersS4Slide2Heading: {
        [Language.English]: "LG1550i",
        [Language.Hindi]: "LG1550i",
    },
    categoryInvertersS4Slide2Description: {
        [Language.English]:
            "Inverter for Small Offices, Homes, and Small Shops with Best-in-Class Warranty and Smart AI Charging. Bring home the power of unlimited energy with our Inverter. Equipped with the best-in-class warranty and Smart AI Charging to offer a smooth flow of energy to you",
        [Language.Hindi]:
            "छोटे कार्यालयों, घरों और छोटी दुकानों के लिए इनवर्टर, सर्वश्रेष्ठ श्रेणी की वारंटी और स्मार्ट एआई चार्जिंग के साथ    हमारे इनवर्टर के साथ असीमित ऊर्जा की शक्ति घर लाएं। आपको ऊर्जा का सहज प्रवाह प्रदान करने के लिए उद्योग की सावराश्रेष्ठ वारंटी आवर स्मार्ट ए आई चार्जिंग के साथ बने इनवर्टर।",
    },
    categoryInvertersS2Slide2KS1Title: {
        [Language.English]: "Warranty",
        [Language.Hindi]: "वारंटी",
    },
    categoryInvertersSlide2KS1Description: {
        [Language.English]: "3 Years",
        [Language.Hindi]: "3 साल",
    },
    categoryInvertersS2Slide2KS2Title: {
        [Language.English]: "Capacity",
        [Language.Hindi]: "क्षमता",
    },
    categoryInvertersSlide2KS2Description: {
        [Language.English]: "1250VA",
        [Language.Hindi]: "1250VA",
    },
    categoryInvertersS2Slide2KS3Title: {
        [Language.English]: "AI Charging",
        [Language.Hindi]: "ए आई चार्जिंग",
    },
    categoryInvertersSlide2KS3Description: {
        [Language.English]: "DSP Processor",
        [Language.Hindi]: "डी एस पी प्रोसेसर",
    },
    categoryInvertersS2Slide2KS4Title: {
        [Language.English]: "Dimensions",
        [Language.Hindi]: "आयाम",
    },
    categoryInvertersSlide2KS4Description: {
        [Language.English]: "275(L) X 281(W) X 145(H)",
        [Language.Hindi]: "275(L) X 281(W) X 145(H)",
    },
    categoryInvertersS4RelatedProductsHeading: {
        [Language.English]: "Related Products",
        [Language.Hindi]: "संबंधित उत्पाद",
    },
    categoryInvertersS4BT: {
        [Language.English]: "Explore Product",
        [Language.Hindi]: "विस्तार से देखें",
    },
    categoryInvertersS5HT1: {
        [Language.English]: "Side-by-Side Overview",
        [Language.Hindi]: "इनवर्टर साथ देखें",
    },
    categoryInvertersS5F1Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
    },
    categoryInvertersS5F2Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
    },
    categoryInvertersS5F3Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
    },
    categoryInvertersS5F4Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
    },
    categoryInvertersS5F5Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
    },
    categoryInvertersS5F6Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
    },
    categoryInvertersS5Slide1Heading: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
    },
    categoryInvertersS5Slide2Heading: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
    },
    categoryInvertersS5Slide3Heading: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
    },
    categoryInvertersS6HT1: {
        [Language.English]: `Suggested <span class="lg-text-highlighted">Combos</span>`,
        [Language.Hindi]: `सुझायी गई <span class="lg-text-highlighted">कॉम्बो</span>`, // TODO: Fix
    },
    categoryInvertersS6Combo1Title: {
        [Language.English]: "The Urban Combo",
        [Language.Hindi]: "अर्बन कॉम्बो",
    },
    categoryInvertersS6Combo2Title: {
        [Language.English]: "The Peace Of Mind Combo",
        [Language.Hindi]: "मन की शांति वाली कॉम्बो",
    },
    categoryInvertersS6Combo3Title: {
        [Language.English]: "The Super Life Combo",
        [Language.Hindi]: "सुपर लाइफ कॉम्बो",
    },
    categoryInvertersS6Combo4Title: {
        [Language.English]: "The Hi-Power Combo",
        [Language.Hindi]: "हाई-पॉवर कॉम्बो",
    },
    categoryInvertersS6ComboButtontext: {
        [Language.English]: "Know More",
        [Language.Hindi]: "अधिक जानिए",
    },
    categoryInvertersS6Buttontext: {
        [Language.English]: "Enquire Now",
        [Language.Hindi]: "संपर्क करें",
    },
    categoryInvertersS8HT1: {
        [Language.English]: "Choose The Best",
        [Language.Hindi]: "घर लायें रोशनी",
    },
    categoryInvertersS8HT2: {
        [Language.English]: `<span class="lg-text-highlighted">Inverter</span> For You`,
        [Language.Hindi]: `उचित <span class="lg-text-highlighted">इनवर्टर बैटरी</span> से`,
    },
    categoryInvertersS8Description: {
        [Language.English]:
            "Find the suitable pick of inverter that fulfils your requirements with efficiency. Use our Buying Guide to get to know in detail about how you can buy your inverter and our Product Catalogue for product specifications",
        [Language.Hindi]: "हमारे बाइंग गाइड और प्रोडक्ट कैटलॉग का उपयोग करके अपने लिए उपयुक्त इनवर्टर चुनें जो सहजता के साथ आपकी आवश्यकताओं को पूरा करें।",
    },
    categoryInvertersS8B1T: {
        [Language.English]: "Buying Guide",
        [Language.Hindi]: "बाइंग गाइड",
    },
    categoryInvertersS8B2T: {
        [Language.English]: "Download Catalog",
        [Language.Hindi]: "डाउनलोड कैटलॉग",
    },
    categoryInvertersS8BT: {
        [Language.English]: "Let's Plan Your Power",
        [Language.Hindi]: "अपनी ऊर्जा को प्लान करें",
    },
    noDealerLocatorText: {
        [Language.English]: "No Dealer Found",
        [Language.Hindi]: "कोई डीलर नहीं मिला",
    },

    dealerLocatorInputText: {
        [Language.English]: "Enter Location, City, State or Zip Code",
        [Language.Hindi]: "स्थान, शहर, राज्य या ज़िप कोड भरें",
    },
    dealerLocatorButtonText: {
        [Language.English]: "Find My Dealer",
        [Language.Hindi]: "नज़दीकी डीलर खोजें",
    },
    dealerLocatorShowText: {
        [Language.English]: "Show Dealers List",
        [Language.Hindi]: "डीलर सूची दिखाएं",
    },
    dealerLocatorS2H: {
        [Language.English]: "Trouble Finding Dealers?",
        [Language.Hindi]: "डीलर खोजने में परेशानी?",
    },
    dealerLocatorS2T: {
        [Language.English]: "Get in touch with us for a faster resolution",
        [Language.Hindi]: "तेज़ समाधान के लिए हमसे संपर्क करें",
    },
    dealerLocatorS2BT: {
        [Language.English]: "Contact Us",
        [Language.Hindi]: "संपर्क करें",
    },
    dealerLocatorS4H: {
        [Language.English]: "Join The Livguard Network",
        [Language.Hindi]: "लिवगार्ड नेटवर्क से जुड़ें",
    },
    dealerLocatorS4T: {
        [Language.English]: "With 4000+ dealers & distributors",
        [Language.Hindi]: "4000+ डीलरों और वितरकों के साथ",
    },
    dealerLocatorS4BT: {
        [Language.English]: "Apply Now",
        [Language.Hindi]: "अभी अप्लाई करें",
    },
    dealerLocatorSocialHT1: {
        [Language.English]: "Catch Dealers",
        [Language.Hindi]: `जानिये <span class="lg-text-highlighted">लिवगार्ड</span>`,
    },
    dealerLocatorSocialHT2: {
        [Language.English]: `<span class="lg-text-highlighted">Talking About Livguard</span>`,
        [Language.Hindi]: `<span class="lg-text-highlighted">डीलर नेटवर्क</span> को`,
    },
    dealerLocatorHighlightedText: {
        [Language.English]: "Dealers Near You",
        [Language.Hindi]: "आप के नज़दीकी डीलर",
    },
    applyNowForDealerT1: {
        [Language.English]: "Become A Dealer Now",
        [Language.Hindi]: "लिवगार्ड डीलर बनें",
    },
    applyNowForDealerT2: {
        [Language.English]: "Phone Number",
        [Language.Hindi]: " मोबाइल नंबर",
    },
    applyNowForDealerT3: {
        [Language.English]: "Name",
        [Language.Hindi]: "नाम",
    },
    applyNowForDealerT5: {
        [Language.English]: "City",
        [Language.Hindi]: " शहर",
    },
    applyNowForDealerT4: {
        [Language.English]: "Email",
        [Language.Hindi]: "ई-मेल",
    },
    applyNowForDealerT6: {
        [Language.English]: "Submit",
        [Language.Hindi]: "सबमिट करें",
    },
    applyNowForDealerPH2: {
        [Language.English]: "Please Enter Your Mobile",
        [Language.Hindi]: "कृपया अपना मोबाइल नंबर डालें",
    },
    applyNowForDealerPH3: {
        [Language.English]: "Please Enter Your Name",
        [Language.Hindi]: "कृपया अपना नाम डालें",
    },
    applyNowForDealerPH4: {
        [Language.English]: "Please Enter Your Email",
        [Language.Hindi]: "कृपया अपनी ई-मेल डालें",
    },
    applyNowForDealerPH5: {
        [Language.English]: "Please Select Your City",
        [Language.Hindi]: "कृपया अपना शहर चुनें",
    },
    successT1: {
        [Language.English]: `Thank <br /> You!`,
        [Language.Hindi]: "धन्यवाद!",
    },
    successT2: {
        [Language.English]: `Hang on, you'll receive a <br /> call from our team soon`,
        [Language.Hindi]: `प्रतीक्षा करें, हम आपसे <br /> जल्द संपर्क करेंगे`,
    },
    successT3: {
        [Language.English]: `Till then, show some love to our <br /> social handles!`,
        [Language.Hindi]: `तब तक हमारे सोशल मीडिया <br /> पर प्यार बरसाएँ`,
    },
    productPageSpecifications: {
        [Language.English]: "Specifications",
        [Language.Hindi]: "विवरण",
    },
    productPageProductDescription: {
        [Language.English]: "Product Description",
        [Language.Hindi]: "उत्पाद विवरण",
    },
    productPageFeatures: {
        [Language.English]: "Features",
        [Language.Hindi]: " विशेषताएँ",
    },
    productPageAdditionalInfo: {
        [Language.English]: "Additional Info",
        [Language.Hindi]: "अतिरिक्त जानकारी",
    },
    productPageNumberReviewBefore: {
        [Language.English]: "Based on",
        [Language.Hindi]: "पर आधारित",
    },
    productPageNumberReviewAfter: {
        [Language.English]: "Reviews",
        [Language.Hindi]: "रिव्यूज़ के आधार पर",
    },
    categoryViewProductButtontext: {
        [Language.English]: "View Product",
        [Language.Hindi]: "विस्तार से देखें",
    },
    categoryViewComboButtontext: {
        [Language.English]: "View Combo",
        [Language.Hindi]: "विस्तार से देखें",
    },
    review1Name: {
        [Language.English]: "Rehan",
        [Language.Hindi]: "रेहान",
    },
    review1State: {
        [Language.English]: "Uttar Pradesh",
        [Language.Hindi]: "उत्तर प्रदेश",
    },
    review1Message: {
        [Language.English]: `"Small issues are easily solved through video calls. Moreover, maintenance also poses zero issues. If you ask me for feedback, I would give Livguard combo a 10/10!"`,
        [Language.Hindi]: `"छोटी-मोटी परेशानियाँ वीडियो कॉल के साथ ही सुलझा दी जाती हैं। मेंटेनेंस को लेकर भी कोई दिक़्क़त नहीं है। यदि आप मुझसे पूछें, तो मैं लिवगार्ड कॉम्बो को 10/10 दूंगा!"`,
    },
    review1ProductName: {
        [Language.English]: "Inverter",
        [Language.Hindi]: "इनवर्टर",
    },
    review2Name: {
        [Language.English]: "Rishab",
        [Language.Hindi]: "रिषभ",
    },
    review2State: {
        [Language.English]: "Uttar Pradesh",
        [Language.Hindi]: "उत्तर प्रदेश",
    },
    review2Message: {
        [Language.English]: `"I have been using Livguard inverter and batteries from the past 3 years now, and they are still performing so well!"`,
        [Language.Hindi]: `"मैं पिछले 3 साल से लिवगार्ड इनवर्टर और बैटरी का इस्तेमाल कर रहा हूँ, घर पर भी और अपने शो रूम में भी, और यह आज भी पहले जैसे ही काम कर रहे हैं!"`,
    },
    review2ProductName: {
        [Language.English]: "Inverter Battery",
        [Language.Hindi]: "इनवर्टर बैटरी",
    },
    review3Name: {
        [Language.English]: "Ganesh",
        [Language.Hindi]: "गणेश",
    },
    review3State: {
        [Language.English]: "Maharashtra",
        [Language.Hindi]: "महाराष्ट्र",
    },
    review3Message: {
        [Language.English]: `"Great product. Great product. Go for it without a doubt."`,
        [Language.Hindi]: `"अच्छा उत्पाद। अच्छा उत्पाद। इसके लिए बिना किसी संदेह के जाएं।"`,
    },
    review3ProductName: {
        [Language.English]: "Inverter",
        [Language.Hindi]: "इनवर्टर",
    },
    review4Name: {
        [Language.English]: "Dev Chauhan",
        [Language.Hindi]: "देव चौहान",
    },
    review4State: {
        [Language.English]: "Uttar Pradesh",
        [Language.Hindi]: "उत्तर प्रदेश",
    },
    review4Message: {
        [Language.English]: `"Deliver on time & battery backup is very good. Installation services was very good."`,
        [Language.Hindi]: `"समय पर डिलीवरी और बैटरी बैकअप बहुत अच्छा है। स्थापना सर्विसएं बहुत अच्छी थीं।"`,
    },
    review4ProductName: {
        [Language.English]: "Combo",
        [Language.Hindi]: "जोड़ि",
    },

    footerCopyrightText: {
        [Language.English]: `© Livguard 2023. All Rights Reserved | Technology Partner - <a href="https://growthjockey.com" target="_blank" class="tw-underline hover:tw-text-[#00a2ed]">GrowthJockey</a>`,
        [Language.Hindi]: `© लिवगार्ड 2023। सभी अधिकार सुरक्षित | प्रौद्योगिकी भागीदार - <a href="https://growthjockey.com">GrowthJockey</a>`,
    },
    "aefcb24c-ff32-4530-a8e8-1fe009daa883": {
        [Language.English]: `© Livguard 2023. All Rights Reserved | Get in touch - <a href="mailto:export@sar-group.com" class="tw-underline hover:tw-text-blue-600">export@sar-group.com</a>`,
        [Language.Hindi]: `© लिवगार्ड 2023। सभी अधिकार सुरक्षित | संपर्क करें - <a href="mailto:export@sar-group.com" class="tw-underline hover:tw-text-blue-600">export@sar-group.com</a>`,
    },

    footerSubscribeT1: {
        [Language.English]: "Be the first to find out about new stories & latest offers!",
        [Language.Hindi]: " नए ऑफर और कहनियों के बारे में जानने वाले सबसे पहले बनिए!",
    },
    footerSubscribeT2: {
        [Language.English]: "Enter Your Email To Subscribe",
        [Language.Hindi]: "सब्सक्राइब करने के लिए ईमेल डालें",
    },
    footerDisclosure1H: {
        [Language.English]: "About Us",
        [Language.Hindi]: "हमारे बारे में",
    },
    footerDisclosure1T1: {
        [Language.English]: "Contact Us",
        [Language.Hindi]: "हमसे संपर्क करें",
    },
    footerDisclosure1T2: {
        [Language.English]: "Global Reach",
        [Language.Hindi]: "वैश्विक पहुँच",
    },
    footerDisclosure1T3: {
        [Language.English]: "Blog",
        [Language.Hindi]: "ब्लॉग",
    },
    footerDisclosure1T4: {
        [Language.English]: "Privacy Policy",
        [Language.Hindi]: "गोपनीयता नीति",
    },
    footerDisclosure1T5: {
        [Language.English]: "Sales Return Policy",
        [Language.Hindi]: "सेल्स वापसी नीति",
    },
    footerDisclosure1T6: {
        [Language.English]: "Terms and conditions",
        [Language.Hindi]: "नियम और शर्तें",
    },
    footerDisclosure1T7: {
        [Language.English]: "CSR",
        [Language.Hindi]: "कॉर्पोरेट सामाजिक उत्तरदायित्व",
    },
    footerDisclosure1T8: {
        [Language.English]: "Video Gallery",
        [Language.Hindi]: "वीडियो गैलरी",
    },
    footerDisclosure1T9: {
        [Language.English]: "Sitemap",
        [Language.Hindi]: "साइट मैप",
    },
    footerDisclosure2H: {
        [Language.English]: "Inverters and Batteries",
        [Language.Hindi]: "इनवर्टर और बैटरी",
    },
    footerDisclosure2T1: {
        [Language.English]: "Home Inverters",
        [Language.Hindi]: " होम इनवर्टर",
    },
    footerDisclosure2T2: {
        [Language.English]: "Inverter Batteries",
        [Language.Hindi]: "इनवर्टर बैटरी",
    },
    footerDisclosure2T3: {
        [Language.English]: "High Capacity Inverters ",
        [Language.Hindi]: "उच्च क्षमता वाले इनवर्टर",
    },
    footerDisclosure3H: {
        [Language.English]: "Automotive Batteries",
        [Language.Hindi]: "ऑटोमोटिव बैटरी",
    },
    footerDisclosure3T1: {
        [Language.English]: "3-wheeler batteries",
        [Language.Hindi]: "3-पहिया बैटरी",
    },
    footerDisclosure3T2: {
        [Language.English]: "Tractor Batteries",
        [Language.Hindi]: "ट्रैक्टर बैटरी",
    },
    footerDisclosure3T3: {
        [Language.English]: "Bus and Truck Batteries",
        [Language.Hindi]: "बस और ट्रक की बैटरी",
    },
    footerDisclosure3T4: {
        [Language.English]: "2-wheeler Batteries",
        [Language.Hindi]: "2-पहिया बैटरी",
    },
    footerDisclosure3T5: {
        [Language.English]: "E-Rickshaw Batteries",
        [Language.Hindi]: "ई-रिक्शा की बैटरी",
    },
    footerDisclosure3T6: {
        [Language.English]: "Car and SUV Batteries",
        [Language.Hindi]: "गाड़ी और SUV बैटरी",
    },
    footerDisclosure4H: {
        [Language.English]: "Solar Solutions",
        [Language.Hindi]: "सोलर सलूशन",
    },
    footerDisclosure4T1: {
        [Language.English]: "Solar Panels",
        [Language.Hindi]: "सोलर पैनल",
    },
    footerDisclosure4T2: {
        [Language.English]: "Solar Grid Interactive Series",
        [Language.Hindi]: "सोलर ग्रिड इंटरैक्टिव श्रेणी",
    },
    footerDisclosure4T3: {
        [Language.English]: "Solar Inverter",
        [Language.Hindi]: "सोलर इनवर्टर",
    },
    footerDisclosure4T4: {
        [Language.English]: "Solar Management Unit",
        [Language.Hindi]: "सोलर प्रबंधन इकाई",
    },
    footerDisclosure4T5: {
        [Language.English]: "Solar Charge Controller",
        [Language.Hindi]: "सोलर चार्ज कंट्रोलर",
    },
    footerDisclosure4T6: {
        [Language.English]: "Solar LED Street Light",
        [Language.Hindi]: "सोलर एल ई डी बत्ती",
    },
    footerDisclosure4T7: {
        [Language.English]: "Solar Battery",
        [Language.Hindi]: "सोलर बैटरी",
    },
    footerDisclosure5H: {
        [Language.English]: "Stabilisers",
        [Language.Hindi]: "स्टेबिलाइजर्स",
    },
    footerDisclosure5T1: {
        [Language.English]: "Digital Stabilisers",
        [Language.Hindi]: "डिजिटल स्टेबिलाइजर्स",
    },
    footerDisclosure6H: {
        [Language.English]: "How can we help?",
        [Language.Hindi]: "हम आपकी कैसे सहायता कर सकते हैं?",
    },
    footerDisclosure6T1: {
        [Language.English]: "Battery Finder",
        [Language.Hindi]: "बैटरी खोजक",
    },
    footerDisclosure6T2: {
        [Language.English]: "Dealer Locator",
        [Language.Hindi]: "डीलर लोकेटर",
    },
    footerDisclosure6T3: {
        [Language.English]: "BMHR",
        [Language.Hindi]: "बी एम ऐच आर",
    },
    footerDisclosure6T4: {
        [Language.English]: "Register Your Product",
        [Language.Hindi]: "अपना उत्पाद पंजीकृत करें",
    },
    footerDisclosure6T5: {
        [Language.English]: "Service Support",
        [Language.Hindi]: "सर्विस समर्थन",
    },
    footerDisclosure7H: {
        [Language.English]: "Investor",
        [Language.Hindi]: "निवेशक",
    },
    footerDisclosure7T1: {
        [Language.English]: "LBPL_Notice of Secured creditors meeting dt 01/04/2023",
        [Language.Hindi]: "LBPL_Notice of Secured creditors meeting dt 01/04/2023",
    },
    footerDisclosure7T2: {
        [Language.English]: "LBPL_Notice of Unsecured creditors meeting dt 01/04/2023",
        [Language.Hindi]: "LBPL_Notice of Unsecured creditors meeting dt 01/04/2023",
    },
    footerDisclosure7T3: {
        [Language.English]: "LETPL_Notice of Secured creditors meeting dt 01/04/2023",
        [Language.Hindi]: "LETPL_Notice of Secured creditors meeting dt 01/04/2023",
    },
    footerDisclosure7T4: {
        [Language.English]: "MGT-7_2021-22_LBPL",
        [Language.Hindi]: "MGT-7_2021-22_LBPL",
    },
    footerDisclosure7T5: {
        [Language.English]: "MGT-7_2021-22_LETPL",
        [Language.Hindi]: "MGT-7_2021-22_LETPL",
    },
    footerDisclosure7T6: {
        [Language.English]: "LBPL Notice dt 01/04/2023",
        [Language.Hindi]: "LBPL Notice dt 01/04/2023",
    },
    footerDisclosure7T7: {
        [Language.English]: "LBPL Notice dt 01/04/2023",
        [Language.Hindi]: "LBPL Notice dt 01/04/2023",
    },
    footerDisclosure7T8: {
        [Language.English]: "LETPL Notice dt 01/04/2023",
        [Language.Hindi]: "LETPL Notice dt 01/04/2023",
    },
    footerContactT1: {
        [Language.English]: "GET IN TOUCH With Us",
        [Language.Hindi]: "संपर्क करें",
    },
    "footerContactT1.5": {
        [Language.English]: "Livguard Energy Technologies Private Limited",
        [Language.Hindi]: "Livguard Energy Technologies Private Limited",
    },
    footerContactT2: {
        [Language.English]: "Registered Office - Plot No. 221, Phase-I, Udyog Vihar, Gurgaon 122016 Haryana, India",
        [Language.Hindi]: "Registered Office - Plot No. 221, Phase-I, Udyog Vihar, Gurgaon 122016 Haryana, India",
    },
    "footerContactT2.5": {
        [Language.English]: "CIN - U51909HR2014FTC091348",
        [Language.Hindi]: "CIN - U51909HR2014FTC091348",
    },
    footerContactT3: {
        [Language.English]: "#EnergyUnlimited",
        [Language.Hindi]: "#असीमितऊर्जा",
    },
    landingPageBottomBarT1: {
        [Language.English]: "Find My Dealer",
        [Language.Hindi]: "डीलर खोजें",
    },
    landingPageBottomBarT2: {
        [Language.English]: "Enquire now",
        [Language.Hindi]: "संपर्क करें",
    },
    contactUsT1: {
        [Language.English]: "Connect with Livguard Expert Today",
        [Language.Hindi]: "आज ही लिवगार्ड एक्सपर्ट से जुड़ें",
    },
    contactUsT2: {
        [Language.English]: "Phone Number",
        [Language.Hindi]: "मोबाइल नंबर",
    },
    contactUsT2E: {
        [Language.English]: "Please Enter Your Mobile Number",
        [Language.Hindi]: "कृपया अपना मोबाइल नंबर डालें",
    },
    contactUsT3: {
        [Language.English]: "Name",
        [Language.Hindi]: "नाम",
    },
    contactUsT3E: {
        [Language.English]: "Please Enter Your Name",
        [Language.Hindi]: "कृपया अपना नाम डालें",
    },
    contactUsT4: {
        [Language.English]: "Email",
        [Language.Hindi]: "ई-मेल",
    },
    contactUsT4E: {
        [Language.English]: "Please Enter Your Email",
        [Language.Hindi]: "कृपया अपनी ई-मेल डालें",
    },
    contactUsT5: {
        [Language.English]: "Submit",
        [Language.Hindi]: "सबमिट करें",
    },
    contactUsT6: {
        [Language.English]: "Thank\nYou!",
        [Language.Hindi]: "धन्यवाद!",
    },
    contactUsT7: {
        [Language.English]: "Hang on, you'll receive a\ncall from our team soon",
        [Language.Hindi]: "प्रतीक्षा करें, हम आपसे जल्द संपर्क करेंगे",
    },
    contactUsT8: {
        [Language.English]: "Till then, show some love to our\nsocial handles!",
        [Language.Hindi]: "तब तक हमारे सोशल मीडिया पर प्यार बरसाएँ",
    },

    contactUsOTPT3: {
        [Language.English]: "OTP Verification",
        [Language.Hindi]: "ओटीपी पुष्टि",
    },
    contactUsOTPT3E: {
        [Language.English]: "Please Enter Your OTP",
        [Language.Hindi]: "कृपया अपना ओटीपी दर्ज करें",
    },
    contactUsFAQT1: {
        [Language.English]: `<span class="lg-text-highlighted tw-text-secondary-900-dark">Please Verify</span> <br/> Your Phone`,
        [Language.Hindi]: `कृपया अपना <span class="lg-text-highlighted tw-text-secondary-900-dark">फ़ोन सत्यापित</span> करें`,
    },

    contactUsFormHT1: {
        [Language.English]: `Get <span class="lg-text-highlighted tw-text-secondary-900-dark">Reliable Power</span>`,
        [Language.Hindi]: `<span class="lg-text-highlighted tw-text-secondary-900-dark">विश्वसनीय शक्ति</span>`,
    },
    contactUsFormHT2: {
        [Language.English]: "With Livguard",
        [Language.Hindi]: "लिवगार्ड के साथ",
    },
    contactUsFormT3: {
        [Language.English]: "Connect Today",
        [Language.Hindi]: "आज ही जुड़ें",
    },
    contactUsFormT4: {
        [Language.English]: "Let's Connect",
        [Language.Hindi]: "सबमिट करें",
    },
    downloadFormHT1: {
        [Language.English]: "Fill This Form to",
        [Language.Hindi]: "सबमिट करें",
    },
    downloadFormHT2: {
        [Language.English]: `<span class="lg-text-highlighted tw-text-secondary-900-dark">Download Catalog</span>`,
        [Language.Hindi]: "सबमिट करें",
    },
    downloadFormT3: {
        [Language.English]: "Get Catalog Link",
        [Language.Hindi]: "सबमिट करें",
    },

    bottomBarT1: {
        [Language.English]: "Home",
        [Language.Hindi]: "होम",
    },
    bottomBarT2: {
        [Language.English]: "Inverters",
        [Language.Hindi]: "इनवर्टर",
    },
    bottomBarT3: {
        [Language.English]: "Power Planner",
        [Language.Hindi]: "पावर प्लानर",
    },
    bottomBarT4: {
        [Language.English]: "Dealers",
        [Language.Hindi]: "डीलर",
    },
    bottomBarT5: {
        [Language.English]: "Support",
        [Language.Hindi]: "सर्विस",
    },
    downloadCatalogueBottomBarT1: {
        [Language.English]: "Download Catalog",
        [Language.Hindi]: "उत्पाद कैटलॉग",
    },
    productPageSuggestedProduct: {
        [Language.English]: `Suggested <span class="lg-text-highlighted">Products</span>`,
        [Language.Hindi]: `सुझाए गए <span class="lg-text-highlighted">उत्पाद</span>`,
    },

    loadCalculatorS1T1: {
        [Language.English]: `Plan Your Power Needs <br/>With Livguard <span class="lg-text-highlighted">Power Planner</span>`,
        [Language.Hindi]: 'अपनी ऊर्जा ज़रूरतों को जानें <br/>हमारे <span class="lg-text-highlighted">पावर प्लानर</span> के साथ',
    },
    loadCalculatorS1T2: {
        [Language.English]:
            "Take charge of your power needs with Livguard's load calculator- Power Planner. Your key to personalised power solutions. It helps you find the perfect inverter and inverter battery options for your home, ensuring uninterrupted power supply at all times.",
        [Language.Hindi]:
            "आपकी ज़रूरत के अनुसार समाधान पायें, लिवगार्ड के लोड कैलकुलेटर- पावर प्लानर के साथ।यह आपको अपने होम लिए सही इनवर्टर और इनवर्टर बैटरी विकल्प खोजने में मदद करता है, और हर समय बिना रुकावट ऊर्जा का प्रवाह सुनिश्चित करता है।",
    },
    loadCalculatorRecommendationsS1T1: {
        [Language.English]: "Utilisation",
        [Language.Hindi]: "खपत",
    },
    loadCalculatorRecommendationsS1T2: {
        [Language.English]: "Hours",
        [Language.Hindi]: "घंटे",
    },
    loadCalculatorRecommendationsS1T4: {
        [Language.English]: "is your total house load",
        [Language.Hindi]: "आपका कुल हाउस लोड है",
    },
    loadCalculatorRecommendationsS2H1: {
        [Language.English]: `<span class="lg-text-highlighted">Top Choices</span> For You`,
        [Language.Hindi]: `<span class="lg-text-highlighted">शीर्ष सुझाव</span> आपके लिए`,
    },
    loadCalculatorRecommendationsS2H2: {
        [Language.English]: "Hand Picked For Your Needs",
        [Language.Hindi]: "आपकी आवश्यकताओं के अनुसार",
    },
    loadCalculatorRecommendationsS2T1: {
        [Language.English]: "Inverters",
        [Language.Hindi]: "इनवर्टर",
    },
    loadCalculatorRecommendationsS2T2: {
        [Language.English]: "Batteries",
        [Language.Hindi]: "बैटरी",
    },
    loadCalculatorRecommendationsS2T3: {
        [Language.English]: "Quick View",
        [Language.Hindi]: "तुरंत देखें",
    },
    loadCalculatorRecommendationsS2T4: {
        [Language.English]: "Match",
        [Language.Hindi]: "मैच",
    },
    loadCalculatorRecommendationsS2T5: {
        [Language.English]: "View More Inverters",
        [Language.Hindi]: "और इनवर्टर देखें",
    },
    loadCalculatorRecommendationsS2T6: {
        [Language.English]: "VA Capacity",
        [Language.Hindi]: "VA कैपेसिटी",
    },
    loadCalculatorRecommendationsS2T7: {
        [Language.English]: "Months Warranty",
        [Language.Hindi]: "वारंटी",
    },
    loadCalculatorRecommendationsS2T8: {
        [Language.English]: "Ah Capacity",
        [Language.Hindi]: "Ah कैपेसिटी",
    },
    loadCalculatorRecommendationsS2T9: {
        [Language.English]: "View More Batteries",
        [Language.Hindi]: "और बैटरी देखें",
    },
    loadCalculatorRecommendationsS3H1: {
        [Language.English]: "A Quick Guide to",
        [Language.Hindi]: "एक सरल गाइड",
    },
    loadCalculatorRecommendationsS3H2: {
        [Language.English]: `Choosing the <span class="lg-text-highlighted">Right Product</span>`,
        [Language.Hindi]: `<span class="lg-text-highlighted">सही उत्पाद</span> चुनने के लिए`,
    },
    loadCalculatorRecommendationsS2CTA1: {
        [Language.English]: "Connect To A Dealer",
        [Language.Hindi]: "हमारे डीलर से जुड़ें",
    },
    loadCalculatorRecommendationsS2CTA2: {
        [Language.English]: "Explore Inverters",
        [Language.Hindi]: "इनवर्टर देखें",
    },
    loadCalculatorRecommendationsS2CTA3: {
        [Language.English]: "Explore Batteries",
        [Language.Hindi]: "बैटरी देखें",
    },
    loadCalculatorRecommendationsS4CTA1: {
        [Language.English]: "Connect To A Dealer",
        [Language.Hindi]: "हमारे डीलर से जुड़ें",
    },
    loadCalculatorAdditionalInputsT1: {
        [Language.English]: "I would require",
        [Language.Hindi]: "मुझे एक दिन में",
    },
    loadCalculatorAdditionalInputsT2: {
        [Language.English]: "Hours of backup in a day",
        [Language.Hindi]: "घंटे के बैकअप की ज़रूरत है",
    },
    loadCalculatorAdditionalInputsT3: {
        [Language.English]: "Average Consumption ",
        [Language.Hindi]: "सामान्य खपत",
    },
    loadCalculatorAdditionalInputsT4: {
        [Language.English]: "Let's Plan",
        [Language.Hindi]: "नतीजा निकालें",
    },
    loadCalculatorAdditionalInputsT5: {
        [Language.English]: "Add Device",
        [Language.Hindi]: "उपकरण जोड़ें",
    },
    loadCalculatorAdditionalInputsT6: {
        [Language.English]: "Total Watts",
        [Language.Hindi]: "कुल वाट",
    },
    loadCalculatorNewUIHeader1: {
        [Language.English]: "Device",
        [Language.Hindi]: "उपकरण",
    },
    loadCalculatorNewUIHeader2: {
        [Language.English]: "Usage per device",
        [Language.Hindi]: "प्रति उपकरण खपत",
    },
    loadCalculatorNewUIHeader3: {
        [Language.English]: "Qty",
        [Language.Hindi]: "संख्या",
    },
    loadCalculatorNewUIHeader4: {
        [Language.English]: "Total",
        [Language.Hindi]: "कुल",
    },

    categoryInveterPageFAQQ1Q: {
        [Language.English]: "Which inverter is best for home?",
        [Language.Hindi]: "कौन सा इन्वर्टर घर के लिए सबसे अच्छा है?",
    },
    categoryInveterPageFAQQ1A: {
        [Language.English]: `When it comes to selecting the best inverter for your home, Livguard Inverter is the top choice. Use our <a href="/load-calculator" class="tw-underline">Power Planner</a>, your personal load calculator to find the right inverter for you.`,
        [Language.Hindi]: `जब आपके घर के लिए सर्वश्रेष्ठ इन्वर्टर चुनने की बात आती है, तो लिवगार्ड इन्वर्टर शीर्ष विकल्प है। आपके लिए सही इन्वर्टर खोजने के लिए हमारे <a href="/load-calculator" class="tw-underline">पावर प्लानर</a>, आपके व्यक्तिगत लोड कैलकुलेटर का उपयोग करें।`,
    },
    categoryInveterPageFAQQ2Q: {
        [Language.English]: "What is sine wave inverter?",
        [Language.Hindi]: "साइन वेव इन्वर्टर क्या होता है?",
    },
    categoryInveterPageFAQQ2A: {
        [Language.English]: `A sine wave inverter produces a smooth & consistent electrical output which is essential for powering electronics like computers, TVs, and other household appliances. Choose <a href="/inverter-batteries" class="tw-underline">Livguard's Pure Sine wave inverters</a>for smooth backup.`,
        [Language.Hindi]: `एक साइन वेव इन्वर्टर एक सुचारू और सुसंगत विद्युत उत्पादन उत्पन्न करता है जो कंप्यूटर, टीवी और अन्य घरेलू उपकरणों जैसे इलेक्ट्रॉनिक्स को शक्ति प्रदान करने के लिए आवश्यक है। बिना रुकावट बैकअप के लिए<a href="/inverter-batteries" class="tw-underline">लिवगार्ड के प्योर साइन वेव इनवर्टर</a>चुनें।`,
    },
    categoryInveterPageFAQQ3Q: {
        [Language.English]: "How many home appliances can I run on a home inverter?",
        [Language.Hindi]: "होम इन्वर्टर पर मैं कितने घरेलू उपकरण चला सकता हूँ?",
    },
    categoryInveterPageFAQQ3A: {
        [Language.English]: `The number of home appliances a  <a href="/inverter-batteries" class="tw-underline">Livguard Inverter</a> can run depends on its capacity and power consumption. Livguard offers a wide range of inverters with different capacities that are suitable for various applications of your daily use`,
        [Language.Hindi]: `<a href="/inverter-batteries" class="tw-underline">लिवगार्ड इन्वर्टर</a> कितने घरेलू उपकरणों को चला सकता है, यह इसकी क्षमता और बिजली की खपत पर निर्भर करता है। लिवगार्ड विभिन्न क्षमताओं वाले इनवर्टर की एक विस्तृत श्रृंखला प्रदान करता है जो आपके दैनिक उपयोग के विभिन्न अनुप्रयोगों के लिए उपयुक्त हैं।`,
    },
    categoryInveterPageFAQQ4Q: {
        [Language.English]: "Are inverters for the home and the office different? ",
        [Language.Hindi]: "क्या घर और ऑफिस के लिए इनवर्टर अलग-अलग हैं?",
    },
    categoryInveterPageFAQQ4A: {
        [Language.English]: `Inverters are the same for both homes and offices, however, their capacities differ based on power needs & backup required. Whether you need an inverter for your home or business, <a href="/inverter-batteries" class="tw-underline">Livguard Inverters</a> are the right choice for you.`,
        [Language.Hindi]: `इन्वर्टर घरों और कार्यालयों दोनों के लिए समान हैं, हालांकि, बिजली की जरूरतों और आवश्यक बैकअप के आधार पर उनकी क्षमता भिन्न होती है। चाहे आपको अपने घर या व्यवसाय के लिए इन्वर्टर की आवश्यकता हो, <a href="/load-calculator" class="tw-underline">लिवगार्ड इनवर्टर</a> आपके लिए सही विकल्प हैं।`,
    },
    categoryInveterPageFAQQ5Q: {
        [Language.English]: "How does an inverter work?",
        [Language.Hindi]: "इन्वर्टर कैसे काम करता है?",
    },
    categoryInveterPageFAQQ5A: {
        [Language.English]: `An inverter converts DC (direct current) power from a battery or solar panel into AC (alternating current) power, which can power appliances. <a href="/inverter-batteries" class="tw-underline">Livguard Inverters</a>come with a variety of features and options for an unlimited flow of energy for you.`,
        [Language.Hindi]: `एक इन्वर्टर DC (डायरेक्ट करंट) पावर को बैटरी या सोलर पैनल से AC (अल्टरनेटिंग करंट) पावर में परिवर्तित करता है, जो बिजली के उपकरणों को चला सकता है। <a href="/inverter-batteries" class="tw-underline">लिवगार्ड इनवर्टर</a> आपके लिए ऊर्जा के असीमित प्रवाह के लिए कई प्रकार की विशेषताओं और विकल्पों के साथ आते हैं।`,
    },
    categoryBatteryPageFAQQ1Q: {
        [Language.English]: "Which inverter battery is best for my use? ",
        [Language.Hindi]: "मेरे उपयोग के लिए कौन सी इन्वर्टर बैटरी सबसे अच्छी है?",
    },
    categoryBatteryPageFAQQ1A: {
        [Language.English]: `Livguard's <a href="/load-calculator" class="tw-underline">Power Planner</a>, a Load Calculator tool helps you find the best inverter battery for your energy needs. Trust Livguard for superior performance and durability.`,
        [Language.Hindi]: `लिवगार्ड का <a href="/load-calculator" class="tw-underline">पावर प्लानर</a>, एक लोड कैलकुलेटर टूल आपको आपकी ऊर्जा आवश्यकताओं के लिए सबसे अच्छी इन्वर्टर बैटरी ढूंढने में मदद करता है। उत्कृष्ट प्रदर्शन और लंबे जीवन के लिए लिवगार्ड पर भरोसा करें।`,
    },
    categoryBatteryPageFAQQ2Q: {
        [Language.English]: "How to connect inverter to battery ?",
        [Language.Hindi]: " इनवर्टर को बैटरी से कैसे कनेक्ट करें?",
    },
    categoryBatteryPageFAQQ2A: {
        [Language.English]: `Connecting an inverter to a battery is a simple process of ensuring compatibility, connecting the cables, and testing. <a href="/inverter-batteries" class="tw-underline">Livguard Inverter Batteries</a> are designed for seamless compatibility and superior performance, ensuring a reliable and uninterrupted power supply for your home or office.`,
        [Language.Hindi]: `इनवर्टर को बैटरी से कनेक्ट करना एक सरल प्रक्रिया है जिसमें संगतता की सुनिश्चितता, केबल कनेक्शन और टेस्टिंग शामिल होती है। <a href="/inverter-batteries" class="tw-underline">लिवगार्ड इन्वर्टर बैटरी </a> सुविधाजनक संगतता और बेहतर प्रदर्शन के लिए डिज़ाइन की गई हैं, जो आपके घर या ऑफिस के लिए विश्वसनीय और अविराम बिजली आपूर्ति सुनिश्चित करती हैं।`,
    },
    categoryBatteryPageFAQQ3Q: {
        [Language.English]: "How to check inverter battery health ?",
        [Language.Hindi]: "इन्वर्टर बैटरी की स्वास्थ्य की जाँच कैसे करें?",
    },
    categoryBatteryPageFAQQ3A: {
        [Language.English]: `To check your inverter battery's health, disconnect it from the inverter and measure its voltage using a multimeter. <a href="/inverter-batteries" class="tw-underline">Livguard Inverter Batteries</a> are designed with advanced technology and undergo rigorous testing, ensuring long-lasting durability and superior performance for reliable and uninterrupted power supply at home or office.`,
        [Language.Hindi]: `इन्वर्टर बैटरी की स्वास्थ्य जांचने के लिए, इसे इनवर्टर से डिस्कनेक्ट करें और मल्टीमीटर का उपयोग करके उसकी वोल्टेज मापें। <a href="/inverter-batteries" class="tw-underline">लिवगार्ड इन्वर्टर बैटरी</a> उन्नत तकनीक के साथ डिज़ाइन की गई हैं और कड़ी मेहनत से टेस्ट की जाती हैं, इससे आपको घर या ऑफिस के लिए दुर्लभ और अविराम बिजली आपूर्ति के लिए दृढ़ और बेहतर प्रदर्शन का विश्वास होगा।`,
    },
    categoryBatteryPageFAQQ4Q: {
        [Language.English]: "How much backup time can my inverter battery provide?",
        [Language.Hindi]: "मेरी इनवर्टर बैटरी कितना समय बैकअप प्रदान कर सकती है?",
    },
    categoryBatteryPageFAQQ4A: {
        [Language.English]: `An inverter converts DC (direct current) power from a battery or solar panel into AC (alternating current) power, which can power appliances. <a href="/inverter-batteries" class="tw-underline">Livguard Inverters</a>come with a variety of features and options for an unlimited flow of energy for you.`,
        [Language.Hindi]: `एक इन्वर्टर DC (डायरेक्ट करंट) पावर को बैटरी या सोलर पैनल से AC (अल्टरनेटिंग करंट) पावर में परिवर्तित करता है, जो बिजली के उपकरणों को चला सकता है। <a href="/inverter-batteries" class="tw-underline">लिवगार्ड इनवर्टर</a> आपके लिए ऊर्जा के असीमित प्रवाह के लिए कई प्रकार की विशेषताओं और विकल्पों के साथ आते हैं।`,
    },
    categoryBatteryPageFAQQ5Q: {
        [Language.English]: "How long does the inverter battery last?",
        [Language.Hindi]: "इन्वर्टर की बैटरी कितने समय तक चलती है?",
    },
    categoryBatteryPageFAQQ5A: {
        [Language.English]: `On average, a well-maintained Inverter Battery can last between 2 to 5 years, but it's important to keep an eye on its performance and replace it when necessary. Choose <a href="/inverter-batteries" class="tw-underline">Livguard inverter batteries</a> for long and durable support.`,
        [Language.Hindi]: `औसतन, एक सुव्यवस्थित इन्वर्टर बैटरी 2 से 5 साल के बीच चल सकती है, लेकिन इसके प्रदर्शन पर नज़र रखना और आवश्यकता पड़ने पर इसे बदलना महत्वपूर्ण है। लंबे और टिकाऊ सपोर्ट के लिए <a href="/inverter-batteries" class="tw-underline">लिवगार्ड इनवर्टर बैटरी</a> चुनें।`,
    },
    dealerLocatorPageFAQQ1Q: {
        [Language.English]: "Can I avail financing options as a customer at these dealer locations?",
        [Language.Hindi]: "क्या मैं इन डीलर स्थानों पर वित्त के विकल्प का लाभ उठा सकता हूँ?",
    },
    dealerLocatorPageFAQQ1A: {
        [Language.English]: `Yes, Livguard has multiple financing opportunities available for our consumers for their ease. We are in partnership with Bajaj Finance and Paytail and consumers can choose any of the two options for the same. Call us at <a href="tel:18001025551" class="tw-underline">18001025551</a>`,
        [Language.Hindi]: `हां, लिवगार्ड के पास हमारे उपभोक्ताओं के लिए उनकी आसानी के लिए वित्तपोषण के कई अवसर उपलब्ध हैं। हम बजाज फाइनेंस और पे टेल के साथ साझेदारी कर रहे हैं और उपभोक्ता इसके लिए दो विकल्पों में से कोई भी चुन सकते हैं। हमें  <a href="tel:18001025551" class="tw-underline">18001025551</a> पर कॉल करें।`,
    },
    dealerLocatorPageFAQQ2Q: {
        [Language.English]: "Will a dealer help me in installation?",
        [Language.Hindi]: "क्या कोई डीलर इंस्टालेशन में मेरी मदद करेगा?",
    },
    dealerLocatorPageFAQQ2A: {
        [Language.English]: `It depends on dealer to dealer. Most of our channel partners provide installation services at their end. If you face any problem, you can reach out to our service team, LivServ at <a href="tel:18001025551" class="tw-underline">18001025551</a>`,
        [Language.Hindi]: `यह डीलर से डीलर पर निर्भर करता है। हमारे अधिकांश चैनल पार्टनर अपनी ओर से इंस्टालेशन सेवाएं प्रदान करते हैं। यदि आपको कोई समस्या आती है, तो आप <a href="tel:18001025551" class="tw-underline">18001025551</a> पर हमारी सर्विस टीम, लिवसर्व से संपर्क कर सकते हैं।`,
    },
    dealerLocatorPageFAQQ3Q: {
        [Language.English]: "How can I become a partner with Livguard?",
        [Language.Hindi]: "मैं लिवगार्ड का पार्टनर कैसे बन सकता हूं?",
    },
    dealerLocatorPageFAQQ3A: {
        [Language.English]: `We are pleased to know that you want to join us on our growth journey. Please share your details like name, contact number, pin code, city, state to our official mail id- <a href="mailto:marketing@livguard.com" class="tw-underline">marketing@livguard.com</a>. You will hear from us soon.`,
        [Language.Hindi]: `हमें यह जानकर प्रसन्नता हुई कि आप हमारी विकास यात्रा में हमारे साथ जुड़ना चाहते हैं। कृपया अपना विवरण जैसे नाम, संपर्क नंबर, पिन कोड, शहर, राज्य हमारे आधिकारिक मेल आईडी-<a href="mailto:marketing@livguard.com" class="tw-underline"> marketing@livguard.com</a> पर साझा करें। हम आपसे जल्द से जल्द संपर्क करेंगे।`,
    },
    dealerLocatorPageFAQQ4Q: {
        [Language.English]: "What if my nearby dealer is not open or is not answering to my request?",
        [Language.Hindi]: "क्या होगा यदि मेरा नजदीकी डीलर खुला नहीं है या मेरे अनुरोध का उत्तर नहीं दे रहा है?",
    },
    dealerLocatorPageFAQQ4A: {
        [Language.English]: `In case you are unable to connect with your nearby Livguard dealer, you can reach out to us on our sales number <a href="tel:9205667999" class="tw-underline">9205667999</a>. We are always happy to help and prioritise your comfort above all`,
        [Language.Hindi]: `यदि आप अपने नजदीकी लिवगार्ड डीलर से जुड़ने में असमर्थ हैं, तो आप हमारे बिक्री नंबर <a href="tel:9205667999" class="tw-underline">9205667999</a> पर हमसे संपर्क कर सकते हैं।`,
    },
    dealerLocatorPageFAQQ5Q: {
        [Language.English]: "How can I file a service request?",
        [Language.Hindi]: "मैं सेवा अनुरोध कैसे दर्ज कर सकता हूं?",
    },
    dealerLocatorPageFAQQ5A: {
        [Language.English]: `In order to file a service request for your Livguard inverter or inverter battery, you can reach out to the dealer. If that doesn’t work, you can reach out to our service team at <a href="tel:18001025551" class="tw-underline">18001025551</a> and we will help you out.`,
        [Language.Hindi]: `अपने लिवगार्ड इन्वर्टर या इन्वर्टर बैटरी के लिए सेवा अनुरोध दर्ज करने के लिए, आप डीलर से संपर्क कर सकते हैं। यदि वह काम नहीं करता है, तो आप <a href="tel:18001025551" class="tw-underline">18001025551</a> पर हमारी सेवा टीम से संपर्क कर सकते हैं और हम आपकी मदद करेंगे।`,
    },
    landingPage1Q1Q: {
        [Language.English]: "Which inverter battery is best for my use?",
        [Language.Hindi]: "मेरे उपयोग के लिए कौन सी इन्वर्टर बैटरी सबसे अच्छी है?",
    },
    landingPage1Q1A: {
        [Language.English]: `Livguard's <a href="/load-calculator" class="tw-underline">Power Planner</a>, a Load Calculator tool helps you find the best inverter battery for your energy needs. Trust Livguard for superior performance and durability.`,
        [Language.Hindi]: `लिवगार्ड का <a href="/load-calculator" class="tw-underline">पावर प्लानर</a>, एक लोड कैलकुलेटर टूल आपको आपकी ऊर्जा आवश्यकताओं के लिए सबसे अच्छी इन्वर्टर बैटरी ढूंढने में मदद करता है। उत्कृष्ट प्रदर्शन और लंबे जीवन के लिए लिवगार्ड पर भरोसा करें।`,
    },
    landingPage1Q2Q: {
        [Language.English]: "How to connect inverter to battery ?",
        [Language.Hindi]: " इनवर्टर को बैटरी से कैसे कनेक्ट करें?",
    },
    landingPage1Q2A: {
        [Language.English]: `Connecting an inverter to a battery is a simple process of ensuring compatibility, connecting the cables, and testing. <a href="/inverter-batteries" class="tw-underline">Livguard Inverter Batteries</a> are designed for seamless compatibility and superior performance, ensuring reliable and uninterrupted power supply for your home or office.`,
        [Language.Hindi]: `इनवर्टर को बैटरी से कनेक्ट करना एक सरल प्रक्रिया है जिसमें संगतता की सुनिश्चितता, केबल कनेक्शन और टेस्टिंग शामिल होती है। <a href="/inverter-batteries" class="tw-underline">लिवगार्ड इन्वर्टर बैटरी</a> सुविधाजनक संगतता और बेहतर प्रदर्शन के लिए डिज़ाइन की गई हैं, जो आपके घर या ऑफिस के लिए विश्वसनीय और अविराम बिजली आपूर्ति सुनिश्चित करती हैं।`,
    },
    landingPage1Q3Q: {
        [Language.English]: "Which inverter is best for home?",
        [Language.Hindi]: "कौन सा इन्वर्टर घर के लिए सबसे अच्छा है?",
    },
    landingPage1Q3A: {
        [Language.English]: `When it comes to selecting the best inverter for your home, Livguard Inverter is the top choice. Use our <a href="/load-calculator" class="tw-underline">Power Planner</a>, your personal load calculator to find the right inverter for you.`,
        [Language.Hindi]: `जब आपके घर के लिए सर्वश्रेष्ठ इन्वर्टर चुनने की बात आती है, तो लिवगार्ड इन्वर्टर शीर्ष विकल्प है। आपके लिए सही इन्वर्टर खोजने के लिए हमारे <a href="/load-calculator" class="tw-underline">पावर प्लानर</a>, आपके व्यक्तिगत लोड कैलकुलेटर का उपयोग करें।`,
    },
    landingPage1Q4Q: {
        [Language.English]: "Are inverters for the home and the office different? ",
        [Language.Hindi]: "क्या घर और ऑफिस के लिए इनवर्टर अलग-अलग हैं?",
    },
    landingPage1Q4A: {
        [Language.English]: `Inverters are the same for both homes and offices, however, their capacities differ based on power needs & backup required. Whether you need an inverter for your home or business, Livguard has a variety of <a href="/inverter-batteries" class="tw-underline">quality and durable options</a> to choose from.`,
        [Language.Hindi]: `इन्वर्टर घरों और कार्यालयों दोनों के लिए समान हैं, हालांकि, बिजली की जरूरतों और आवश्यक बैकअप के आधार पर उनकी क्षमता भिन्न होती है। चाहे आपको अपने घर या व्यवसाय के लिए इन्वर्टर की आवश्यकता हो, लिवगार्ड के पास चुनने के लिए कई प्रकार के <a href="/inverter-batteries" class="tw-underline">विकल्प</a> हैं।`,
    },
    landingPage1Q5Q: {
        [Language.English]: "How does the Power Planner work?",
        [Language.Hindi]: "मेरे उपयोग के लिए कौन सी इन्वर्टर बैटरी सबसे अच्छी है?",
    },
    landingPage1Q5A: {
        [Language.English]: `The <a href="/load-calculator" class="tw-underline">Livguard Power Planner </a> is a personalised Load Calculator that suggests you the best Livguard Inverter and Inverter Battery based on devices you choose, backup hours needed, and average power use. It guarantees reliable power backup solution for your home.`,
        [Language.Hindi]: `<a href="/load-calculator" class="tw-underline">लिवगार्ड का पावर प्लानर </a>, एक लोड कैलकुलेटर टूल आपको आपकी ऊर्जा आवश्यकताओं के लिए सबसे अच्छी इन्वर्टर बैटरी ढूंढने में मदद करता है। उत्कृष्ट प्रदर्शन और लंबे जीवन के लिए लिवगार्ड पर भरोसा करें।`,
    },
    landingPage2Q1Q: {
        [Language.English]: "How to check inverter battery health ?",
        [Language.Hindi]: "इन्वर्टर बैटरी की स्वास्थ्य की जाँच कैसे करें?",
    },
    landingPage2Q1A: {
        [Language.English]: `To check your inverter battery's health, disconnect it from the inverter and measure its voltage using a multimeter. <a href="/inverter-batteries" class="tw-underline"> Livguard Inverter Batteries</a>are designed with advanced technology and undergo rigorous testing, ensuring long-lasting durability and superior performance for reliable and uninterrupted power supply at home or office.`,
        [Language.Hindi]: `इन्वर्टर बैटरी की स्वास्थ्य जांचने के लिए, इसे इनवर्टर से डिस्कनेक्ट करें और मल्टीमीटर का उपयोग करके उसकी वोल्टेज मापें। <a href="/inverter-batteries" class="tw-underline">लिवगार्ड इन्वर्टर बैटरी</a> उन्नत तकनीक के साथ डिज़ाइन की गई हैं और कड़ी मेहनत से टेस्ट की जाती हैं, इससे आपको घर या ऑफिस के लिए दुर्लभ और अविराम बिजली आपूर्ति के लिए दृढ़ और बेहतर प्रदर्शन का विश्वास होगा।`,
    },
    landingPage2Q2Q: {
        [Language.English]: "How many home appliances can I run on a home inverter?",
        [Language.Hindi]: " होम इन्वर्टर पर मैं कितने घरेलू उपकरण चला सकता हूँ?",
    },
    landingPage2Q2A: {
        [Language.English]: `The number of home appliances a <a href="/inverter-batteries" class="tw-underline">Livguard Inverter</a> can run depends on its capacity and power consumption. Livguard offers a wide range of inverters with different capacities that are suitable for various applications of your daily use.`,
        [Language.Hindi]: `<a href="/inverter-batteries" class="tw-underline">लिवगार्ड इन्वर्टर</a> कितने घरेलू उपकरणों को चला सकता है, यह इसकी क्षमता और बिजली की खपत पर निर्भर करता है। लिवगार्ड विभिन्न क्षमताओं वाले इनवर्टर की एक विस्तृत श्रृंखला प्रदान करता है जो आपके दैनिक उपयोग के विभिन्न अनुप्रयोगों के लिए उपयुक्त हैं।`,
    },
    landingPage2Q3Q: {
        [Language.English]: "What is sine wave inverter?",
        [Language.Hindi]: "साइन वेव इन्वर्टर क्या होता है?",
    },
    landingPage2Q3A: {
        [Language.English]: `A sine wave inverter produces a smooth & consistent electrical output which is essential for powering electronics like computers, TVs, and other household appliances. Choose <a href="/inverter-batteries" class="tw-underline">Livguard's Pure Sine wave inverters</a> for smooth backup.`,
        [Language.Hindi]: `एक साइन वेव इन्वर्टर एक सुचारू और सुसंगत विद्युत उत्पादन उत्पन्न करता है जो कंप्यूटर, टीवी और अन्य घरेलू उपकरणों जैसे इलेक्ट्रॉनिक्स को शक्ति प्रदान करने के लिए आवश्यक है। बिना रुकावट बैकअप के लिए <a href="/inverter-batteries" class="tw-underline">लिवगार्ड के प्योर साइन वेव इनवर्टर</a> चुनें।`,
    },
    landingPage2Q4Q: {
        [Language.English]: "How to connect inverter to battery ? ",
        [Language.Hindi]: " इनवर्टर को बैटरी से कैसे कनेक्ट करें?",
    },
    landingPage2Q4A: {
        [Language.English]: `Connecting an inverter to a battery is a simple process of ensuring compatibility, connecting the cables, and testing. <a href="/inverter-batteries" class="tw-underline">Livguard Inverter Batteries</a> are designed for seamless compatibility and superior performance, ensuring a reliable and uninterrupted power supply for your home or office.`,
        [Language.Hindi]: `इनवर्टर को बैटरी से कनेक्ट करना एक सरल प्रक्रिया है जिसमें संगतता की सुनिश्चितता, केबल कनेक्शन और टेस्टिंग शामिल होती है। <a href="/inverter-batteries" class="tw-underline">लिवगार्ड इन्वर्टर बैटरी</a> सुविधाजनक संगतता और बेहतर प्रदर्शन के लिए डिज़ाइन की गई हैं, जो आपके घर या ऑफिस के लिए विश्वसनीय और अविराम बिजली आपूर्ति सुनिश्चित करती हैं।`,
    },
    landingPage2Q5Q: {
        [Language.English]: "How to select the right inverter and inverter battery for my home?",
        [Language.Hindi]: "अपने घर के लिए सही इनवर्टर और इनवर्टर बैटरी का चयन कैसे करें?",
    },
    landingPage2Q5A: {
        [Language.English]: `Selecting the right inverter and battery for your home is essential for uninterrupted power backup during outages. With the <a href="/category/load-calculator" class="tw-underline">Livguard Power Planner</a> you can easily select the perfect combination based on your property type, appliances, and budget.`,
        [Language.Hindi]: `अपवाद के दौरान अविराम बिजली बैकअप के लिए सही इनवर्टर और बैटरी चुनना आपके घर के लिए आवश्यक है। <a href="/category/load-calculator" class="tw-underline">लिवगार्ड पावर प्लानर</a> के साथ आप अपनी संपत्ति के प्रकार, उपकरणों और बजट के आधार पर सही कंबिनेशन का आसानी से चयन कर सकते हैं।`,
    },
    landingPage3FAQQ1Q: {
        [Language.English]: "How can I file a service request?",
        [Language.Hindi]: "मैं सेवा अनुरोध कैसे दर्ज कर सकता हूं?",
    },
    landingPage3FAQQ1A: {
        [Language.English]: `In order to file a service request for your Livguard inverter or inverter battery, you can reach out to the dealer. If that doesn’t work, you can reach out to our service team at <a href="tel:18001025551" <a href="/load-calculator" class="tw-underline">18001025551</a> and we will help you out.`,
        [Language.Hindi]: `अपने लिवगार्ड इन्वर्टर या इन्वर्टर बैटरी के लिए सेवा अनुरोध दर्ज करने के लिए, आप डीलर से संपर्क कर सकते हैं। यदि वह काम नहीं करता है, तो आप <a href="tel:18001025551" <a href="/load-calculator" class="tw-underline">18001025551</a> पर हमारी सेवा टीम से संपर्क कर सकते हैं और हम आपकी मदद करेंगे।`,
    },
    landingPage3FAQQ2Q: {
        [Language.English]: "Can I avail financing options as a customer at these dealer locations?",
        [Language.Hindi]: "क्या मैं इन डीलर स्थानों पर वित्त के विकल्प का लाभ उठा सकता हूँ?",
    },
    landingPage3FAQQ2A: {
        [Language.English]: `Yes, Livguard has multiple financing opportunities available for our consumers for their ease. We are in partnership with Bajaj Finance and Paytail and consumers can choose any of the two options for the same. Call us at <a href="tel:18001025551" <a href="/load-calculator" class="tw-underline">18001025551</a>`,
        [Language.Hindi]: `हां, लिवगार्ड के पास हमारे उपभोक्ताओं के लिए उनकी आसानी के लिए वित्तपोषण के कई अवसर उपलब्ध हैं। हम बजाज फाइनेंस और पे टेल के साथ साझेदारी कर रहे हैं और उपभोक्ता इसके लिए दो विकल्पों में से कोई भी चुन सकते हैं। हमें  <a href="tel:18001025551" <a href="/load-calculator" class="tw-underline">18001025551</a> पर कॉल करें।`,
    },
    landingPage3FAQQ3Q: {
        [Language.English]: "How to select the right inverter and inverter battery for my home?",
        [Language.Hindi]: "अपने घर के लिए सही इनवर्टर और इनवर्टर बैटरी का चयन कैसे करें?",
    },
    landingPage3FAQQ3A: {
        [Language.English]: `Selecting the right inverter and battery for your home is essential for uninterrupted power backup during outages. With the <a href="/load-calculator">Livguard Power Planner</a> you can easily select the perfect combination based on your property type, appliances, and budget.`,
        [Language.Hindi]: `अपवाद के दौरान अविराम बिजली बैकअप के लिए सही इनवर्टर और बैटरी चुनना आपके घर के लिए आवश्यक है। <a href="/load-calculator">लिवगार्ड पावर प्लानर</a> के साथ आप अपनी संपत्ति के प्रकार, उपकरणों और बजट के आधार पर सही कंबिनेशन का आसानी से चयन कर सकते हैं।`,
    },
    landingPage3FAQQ4Q: {
        [Language.English]: "Will a dealer help me in installation?",
        [Language.Hindi]: "क्या कोई डीलर इंस्टालेशन में मेरी मदद करेगा?",
    },
    landingPage3FAQQ4A: {
        [Language.English]: `It depends on dealer to dealer. Most of our channel partners provide installation services at their end. If you face any problem, you can reach out to our service team, LivServ at <a href="tel:18001025551" <a href="/load-calculator" class="tw-underline">18001025551</a>`,
        [Language.Hindi]: `यह डीलर से डीलर पर निर्भर करता है। हमारे अधिकांश चैनल पार्टनर अपनी ओर से इंस्टालेशन सेवाएं प्रदान करते हैं। यदि आपको कोई समस्या आती है, तो आप <a href="tel:18001025551" <a href="/load-calculator" class="tw-underline">18001025551</a> पर हमारी सर्विस टीम, लिवसर्व से संपर्क कर सकते हैं।`,
    },
    landingPage3FAQQ5Q: {
        [Language.English]: "What Are the Benefits of Buying an Inverter with Battery of the same brand?",
        [Language.Hindi]: "एक ही ब्रांड के इनवर्टर और बैटरी खरीदने के क्या फायदे होते हैं?",
    },
    landingPage3FAQQ5A: {
        [Language.English]: `Buying an inverter and battery of the same brand, like Livguard Inverter Battery, ensures compatibility and reliability. Use the <a href="/load-calculator">Livguard Power Planner</a> to choose the perfect combination based on your needs and budget.`,
        [Language.Hindi]: `एक ही ब्रांड के इनवर्टर और बैटरी खरीदने से, जैसे लिवगार्ड इनवर्टर  बैटरी, आपको संगतता और विश्वसनीयता की आश्वासन होता है। <a href="/load-calculator">लिवगार्ड पावर प्लानर</a> आपकी आवश्यकताओं और बजट के आधार पर सही कंबिनेशन का चयन करने में मदद कर सकता है।`,
    },

    headerLoadCalculator: {
        [Language.English]: "Load Calculator",
        [Language.Hindi]: "लोड कैलकुलेटर",
    },

    "propertyType-1-bhk": {
        [Language.English]: "1 BHK",
        [Language.Hindi]: "1 BHK",
    },
    "propertyType-2-bhk": {
        [Language.English]: "2 BHK",
        [Language.Hindi]: "2 BHK",
    },
    "propertyType-3-bhk": {
        [Language.English]: "3 BHK",
        [Language.Hindi]: "3 BHK",
    },
    "propertyType-4-bhk": {
        [Language.English]: "4 BHK",
        [Language.Hindi]: "4 BHK",
    },
    "propertyType-villa": {
        [Language.English]: "Villa",
        [Language.Hindi]: "विला",
    },
    "propertyType-custom": {
        [Language.English]: "Custom",
        [Language.Hindi]: "कस्टम",
    },
    "75a44862-4242-4b1b-a7b7-bd6b57e40da7": {
        [Language.English]: "Total Capacity",
        [Language.Hindi]: "कुल कैपेसिटी",
    },
    "750f6ea3-5bc7-4589-a49e-55015d845288": {
        [Language.English]: "Battery Required",
        [Language.Hindi]: "बैटरी आवश्यक",
    },
    "2d7f7aaa-9ae0-4db0-932b-0714a82a39bf": {
        [Language.English]: "Batteries Required",
        [Language.Hindi]: "बैटरी आवश्यक",
    },
    "313dd4e5-acd4-4f7c-a48c-0fe0379f1b5e": {
        [Language.English]: "Battery",
        [Language.Hindi]: "बैटरी",
    },
    "cfab263f-0175-43fb-91e5-fccc64209d36": {
        [Language.English]: "Home",
        [Language.Hindi]: "होम",
    },
    "ee7b3699-a35c-4ad9-981d-ee178abd03e3": {
        [Language.English]: "Dealer Locator",
        [Language.Hindi]: "डीलर लोकेटर",
    },
    "cea6d04c-15b9-4c11-8d83-2e51af979f54": {
        [Language.English]: "Load Calculator",
        [Language.Hindi]: "लोड कैलकुलेटर",
    },
    "ded4f739-d43e-47af-ad85-2f4885413cfc": {
        [Language.English]: "Our Recommendations",
        [Language.Hindi]: "हमारे सुझाव",
    },
    "09b8631b-98e0-4ae8-bafb-65bb57001872": {
        [Language.English]: "Inverter Batteries",
        [Language.Hindi]: "इनवर्टर बैटरी",
    },
    "377e65a0-631b-4188-b63a-7ae3661bbe85": {
        [Language.English]: "Inverters for home",
        [Language.Hindi]: "घर के लिए इनवर्टर",
    },
    "7f1b0663-3535-464c-86c9-78967d00dcc8": {
        [Language.English]: "Product",
        [Language.Hindi]: "उत्पाद",
    },
    "d502b3fa-3677-4a4a-add3-05647aed0690": {
        [Language.English]: "Home",
        [Language.Hindi]: "होम",
    },
    "af3ba663-53b9-4e18-b3ca-9ea9f80d5134": {
        [Language.English]: "Offers",
        [Language.Hindi]: "ऑफर्स",
    },
    "966a0e78-306b-45e9-ad8f-2b6a0c969baf": {
        [Language.English]: "Can I combine two offers?",
        [Language.Hindi]: "क्या मैं दो ऑफरों को संयोजित कर सकता हूँ?",
    },
    "c5752ff7-5992-4b5d-8952-c7268f991508": {
        [Language.English]:
            "Unfortunately, Livguard's offer terms and conditions do not allow the combination of multiple offers. Each offer is designed to provide the best value individually, ensuring that customers can benefit from specific promotions.",
        [Language.Hindi]:
            "दुर्भाग्य से, लिवगार्ड के प्रस्ताव के नियम और शर्तें इसकी अनुमति नहीं देते हैं| अनेक प्रस्तावों का संयोजन. प्रत्येक ऑफ़र को व्यक्तिगत रूप से सर्वोत्तम मूल्य प्रदान करने के लिए डिज़ाइन किया गया है, यह सुनिश्चित करते हुए कि ग्राहक विशिष्ट प्रचारों से लाभान्वित हो सकें।",
    },
    "3f92c05d-76c1-42b5-acb5-b80c2bd92433": {
        [Language.English]: "Are these offers available nationwide?",
        [Language.Hindi]: "क्या ये ऑफर देश भर में समान रूप से उपलब्ध हैं?",
    },
    "091214cd-663a-4560-9b6d-af4a48fa424b": {
        [Language.English]:
            "Yes, Livguard's offers are available nationwide. We strive to provide our energy solutions and promotional offers to customers across the country, ensuring everyone can take advantage of our products and promotions.",
        [Language.Hindi]:
            "हां, लिवगार्ड के ऑफर देशभर में उपलब्ध हैं। हम प्रयास करते हैं देश भर में ग्राहकों को हमारे ऊर्जा समाधान और प्रचार प्रस्ताव प्रदान करना, यह सुनिश्चित करना कि हर कोई हमारे उत्पादों और प्रचारों का लाभ उठा सके।",
    },
    "3eee040c-50a3-48d3-86b3-6bc76e59e2a0": {
        [Language.English]: "What should I do if I am facing troubles in availing an offer?",
        [Language.Hindi]: "यदि मुझे कोई ऑफर मिलने में परेशानी हो रही है, तो मैं क्या करूँ?",
    },
    "0aed81ce-bf2b-4c77-bd84-f1bced9f1dca": {
        [Language.English]:
            "If you are experiencing any difficulties in availing of one of our offers, we apologize for the inconvenience. Please reach out to our customer support team at 1800-1025-551. They will assist you in resolving the issue and ensuring you can take full advantage of the offer.",
        [Language.Hindi]:
            "हमारे किसी ऑफर का लाभ उठाने में अगर आपको कोई परेशानी आ रही है, तो इस असुविधा के लिए हम क्षमा चाहते हैं। कृपया 1800-1025-551 पर हमारी ग्राहक सहायता टीम से संपर्क करें। वे समस्या को सुलझाने में आपकी सहायता करेंगे और यह सुनिश्चित करेंगे कि आप ऑफ़र का पूरा लाभ उठा सकें।",
    },
    "ef4dd710-d4a8-48c0-ac6a-8e735cb47ea7": {
        [Language.English]: "Do you have any EMI or financing offers?",
        [Language.Hindi]: "क्या आपके पास EMI या वित्तीय ऑफर हैं",
    },
    "34982c2c-6e0f-44be-ae61-00a435a5c754": {
        [Language.English]:
            "Yes, Livguard offers convenient EMI (Equated Monthly Installments) and financing options for our customers. We understand that energy solutions can involve a significant investment, and our EMI and financing offers allow you to manage the cost more comfortably. Please refer to the specific terms and conditions of each offer for further details.",
        [Language.Hindi]:
            "हां, लिवगार्ड, हमारे ग्राहकों के लिए, सुविधाजनक ईएमआई (समान मासिक किश्तें) और वित्तीय सहायता प्रदान करता है  । हम समझते हैं कि ऊर्जा समाधानों में महत्वपूर्ण निवेश शामिल हो सकता है, और हमारी ईएमआई और वित्तीय सहायता आपको लागत को अधिक आराम से प्रबंधित करने की अनुमति देती है। अधिक जानकारी के लिए, कृपया प्रत्येक ऑफर के विशिष्ट नियम और शर्तें देखें ।",
    },
    "7c20c250-9b65-47fe-b9e7-705d731d2dac": {
        [Language.English]: "What happens if an offer I availed is no longer available or changes?",
        [Language.Hindi]: "यदि मैंने एक ऑफर का लाभ उठाया है और वह अब उपलब्ध नहीं है या बदल गया है, तो क्या होगा?",
    },
    "e9d7f2b1-4824-4534-976d-afad6e4c9d75": {
        [Language.English]:
            "In the event that an offer you have availed of is no longer available or has been modified, we understand your concern. Rest assured, if you have already availed of the offer, you will continue to receive the benefits as per the terms and conditions applicable at the time of your purchase. However, any changes or modifications to an offer will be communicated to customers in advance to ensure transparency and provide alternative options whenever possible.",
        [Language.Hindi]:
            "उस स्थिति में आपने जिस ऑफ़र का लाभ उठाया है अगर वह अब उपलब्ध नहीं है या संशोधित कर दिया गया है, हम आपकी चिंता को समझते हैं। निश्चिंत रहें, यदि आपने पहले ही ऑफर का लाभ उठा लिया है, तो आपको उस समय लागू नियमों और शर्तों के अनुसार लाभ मिलता रहेगा। हालाँकि, पारदर्शिता सुनिश्चित करने और जब भी संभव हो विकल्प प्रदान करने के लिए किसी ऑफ़र में कोई भी बदलाव या संशोधन ग्राहकों को पहले से सूचित किया जाएगा।",
    },
    OfferComboHT1: {
        [Language.English]: `Beat The Heat with Power-Packed <span class="lg-text-highlighted">Cashback</span>`,
        [Language.Hindi]: `गर्मी को मात दें पावर-पैक्ड <span class="lg-text-highlighted">कैशबैक</span> के साथ`,
    },
    OfferComboHT2: {
        [Language.English]: `For the first time ever, Livguard brings a striking cashback offer for you. Experience an uninterrupted summer with our Inverter and Battery Combos and enjoy big savings with upto <b>₹1500 cashback!</b>`,
        [Language.Hindi]: `पहली बार आपके लिए, हम लाएँ है एक बेहतरीन ऑफर। अपनी गर्मी के मौसम को परेशानी मुक्त बनाएँ हमारे इनवर्टर और बैटरी कॉम्बो के साथ, और  <b>₹1500 तक के कैशबैक</b> के साथ बड़ी बचत का आनंद लें!`,
    },
    OfferComboHT3: {
        [Language.English]: "Avail your cashback in 6 easy steps",
        [Language.Hindi]: "6 आसान चरणों में अपना कैशबैक प्राप्त करें",
    },
    OfferStep1: {
        [Language.English]: `<b>Buy Inverter & Inverter Battery</b> Combo from Livguard`,
        [Language.Hindi]: `<b>ख़रीदें लिवगार्ड इनवर्टर और बैटरी</b> कॉम्बो`,
    },
    OfferStep2: {
        [Language.English]: `<b>Send 'Hi'</b> to us on LivServ WhatsApp mobile number <b>(+91 7428191000)</b>`,
        [Language.Hindi]: `LivServ whatsapp मोबाइल नंबर <b>(+91 7428191000) पर हमें ‘Hi’ भेजें</b>`,
    },
    OfferStep3: {
        [Language.English]: `<b>Select warranty registration from</b> the given options`,
        [Language.Hindi]: `दिये गये विकल्पों में से अपना <b>वारंटी पंजीकरण चुनें</b>`,
    },
    OfferStep4: {
        [Language.English]: `Fill warranty registration form for the purchased combo along with your UPI id and <b>submit the form</b>`,
        [Language.Hindi]: `खरीदी गई कॉम्बो के लिए वारंटी पंजीकरण फॉर्म अपनी यूपीआई आईडी के साथ भरें और <b>फॉर्म सबमिट करें</b>`,
    },
    OfferStep5: {
        [Language.English]: `You will get a <b>call from the Authorized LivServ</b> call center post registration`,
        [Language.Hindi]: `पंजीकरण के बाद आपको अधिकृत <b>LivServ कॉल सेंटर से कॉल मिलेगी</b>`,
    },
    OfferStep6: {
        [Language.English]: `You will get <b>up to Rs. 1500 cashback</b> in your registered UPI id within 20 days post verification`,
        [Language.Hindi]: `पुष्टि के 20 दिनों के भीतर आपको अपनी पंजीकृत यूपीआई <b>आईडी में रु. 1500 तक कैशबैक</b> जोड़ दिया जाएगा`,
    },
    OfferStep: {
        [Language.English]: "Step",
        [Language.Hindi]: "चरण",
    },
    OfferTnCApplied: {
        [Language.English]: "T&Cs Applied",
        [Language.Hindi]: "नियम और शर्तें लागू",
    },
    OfferTnCContent1: {
        [Language.English]: `"Cashback offer" is applicable from 5th May’23 to 31st May’23.`,
        [Language.Hindi]: `"कैशबैक ऑफ़र" 5 मई'23 से 31 मई'23 तक लागू होगा।`,
    },
    OfferTnCContent2: {
        [Language.English]: "This offer is applicable on the combo purchase (a combo includes selected Livguard Inverter Batteries & any Livguard Inverter) from the company’s Authorized Dealer only.",
        [Language.Hindi]: "यह ऑफ़र केवल कंपनी के अधिकृत डीलर से कॉम्बो खरीद (कॉम्बो में चयनित लिवगार्ड इनवर्टर बैटरी और किसी भी लिवगार्ड इनवर्टर शामिल होते हैं) पर लागू होगा।",
    },
    OfferTnCContent3: {
        [Language.English]: "The consumer can avail of the cashback only after registering the combo (under the offer) on LivServ WhatsApp mobile number (+91 7428191000).",
        [Language.Hindi]: "उपभोक्ता केवल तब कैशबैक का लाभ उठा सकता है जब वह कॉम्बो (ऑफ़र के तहत) को LivServ whatsapp मोबाइल नंबर (+91 7428191000) पर पंजीकृत होगा।",
    },
    OfferTnCContent4: {
        [Language.English]: `To avail of the cashback offer say “Hi” to LivServ WhatsApp mobile number (+91 7428191000).`,
        [Language.Hindi]: `कैशबैक ऑफ़र का लाभ उठाने के लिए LivServ whatsapp मोबाइल नंबर (+91 7428191000) पर "Hi" कहें।`,
    },
    OfferTnCContent5: {
        [Language.English]:
            "If a consumer buys a combo and does the warranty registration for only one of those products from the purchased combo, he/she will not be eligible for the cashback offer.",
        [Language.Hindi]: "यदि कोई उपभोगता कॉम्बो खरीदता है और खरीदे गए कॉम्बो में से किसी एक उत्पाद के लिए वॉरंटी पंजीकरण करता है, तो वह कैशबैक ऑफ़र के लिए पात्र नहीं होगा।",
    },
    OfferTnCContent6: {
        [Language.English]: "Warranty registration through LivServ is mandatory to be eligible for this cashback offer.",
        [Language.Hindi]: "लिवसर्व के माध्यम से वारंटी पंजीकरण करना इस कैशबैक ऑफ़र के लिए पात्र होने के लिए अनिवार्य है।",
    },
    OfferTnCContent7: {
        [Language.English]: "Only 1 cashback offer can be availed per registered mobile number and multiple combos will not be eligible for the cashback offer.",
        [Language.Hindi]:
            "केवल 1 कॉम्बो के इनवर्टरऔर बैटरी पर पंजीकृत मोबाइल नंबर पर कैशबैक दिया जाएगा। यानी, यदि किसी ग्राहक ने 1 इनवर्टरऔर कई बैटरियों को खरीदा तो वह केवल 1 कॉम्बो पर लागू होने वाले छूट के लिए पात्र होगा।",
    },
    OfferTnCContent8: {
        [Language.English]:
            "Cashback will be given on only 1 combo of inverter & battery per registered mobile number. i.e. even if a customer buys 1 inverter & multiple batteries then he/she will be eligible for only 1 combo applicable discount as per models purchased.",
        [Language.Hindi]:
            "केवल 1 कॉम्बो के इनवर्टर और बैटरी पर पंजीकृत मोबाइल नंबर पर कैशबैक दिया जाएगा। यानी, यदि किसी ग्राहक ने 1 इनवर्टर और कई बैटरियों को खरीदा तो वह केवल 1 कॉम्बो पर लागू होने वाले छूट के लिए पात्र होगा।",
    },
    OfferTnCContent9: {
        [Language.English]:
            "Customer needs to submit all relevant details of the purchased combo, that includes Product Details, Product Serial Nos., Date of Purchase, Dealer Name & Contact, Warranty card, Purchase Invoice/Bill, Product Image, UPI Id (for customer’s cashback) and Customer personal details.",
        [Language.Hindi]:
            "ग्राहकों को खरीदे गए कॉम्बो के सभी संबंधित विवरण देने की आवश्यकता है, जिसमें उत्पाद विवरण, उत्पाद सीरियल नंबर, खरीद की तारीख, विक्रेता का नाम और संपर्क, वारंटी कार्ड, खरीद चालान/बिल, उत्पाद छवि, UPI आईडी (ग्राहक के कैशबैक के लिए) और ग्राहक के व्यक्तिगत विवरण।",
    },
    OfferTnCContent10: {
        [Language.English]: "Customer needs to register both products in the combo on the LivServ app in a single window, otherwise the same will not be considered for the “Cashback offer”.",
        [Language.Hindi]: `ग्राहक को कॉम्बो में दोनों उत्पादों को LivServ App पर एक ही विंडो में पंजीकृत करने की आवश्यकता होती है, अन्यथा इसे "कैशबैक ऑफ़र" के लिए मान्य नहीं किया जाएगा।`,
    },
    OfferTnCContent11: {
        [Language.English]:
            "After the submission, the company will do a verification check through the LivServ call center, to validate the purchase and correctly record/verify all relevant details for processing the cashback.",
        [Language.Hindi]:
            "प्रस्तुति के बाद, कंपनी LivServ कॉल सेंटर के माध्यम से सत्यापन जांच करेगी, ताकि खरीद को सत्यापित किया जा सके और कैशबैक की प्रक्रिया के लिए सभी संबंधित विवरणों को सही ढंग से रिकॉर्ड/सत्यापित किया जा सके।",
    },
    OfferTnCContent12: {
        [Language.English]:
            "The cashback will be credited to the consumer’s linked UPI ID shared at the time of warranty registration on the LivServ page within 20 days of registration. (Selected Livguard Inverter battery + any Livguard Inverter).",
        [Language.Hindi]:
            "कैशबैक को ग्राहक के साथ-साथ LivServ पेज पर वारंटी पंजीकरण के समय साझा की गई UPI आईडी में पंजीकरण के 20 दिनों के भीतर क्रेडिट किया जाएगा। (चयनित लिवगार्ड इनवर्टर बैटरी + किसी भी लिवगार्ड इनवर्टर)",
    },
    OfferTnCContent13: {
        [Language.English]: "The purchase date needs to be within the scheme period, i.e. 5th May’23 to 31st May’23 only.",
        [Language.Hindi]: "खरीद की तारीख को योजना की अवधि के भीतर होनी चाहिए, अर्थात् 5 मई'23 से 31 मई'23।",
    },
    OfferTnCContent14: {
        [Language.English]: "Company may validate the serial numbers of the products for audit. In case of discrepancy, the company’s decision shall be final and binding.",
        [Language.Hindi]: "कंपनी उत्पादों के सीरियल नंबरों की सत्यापन के लिए ऑडिट कर सकती है। विसंगति के मामले में, कंपनी का निर्णय अंतिम और बाध्यकारी होगा।",
    },
    OfferTnCContent15: {
        [Language.English]:
            "Company reserves the right to discontinue/extend/modify this scheme at any time without prior notice. The decision of the company will have final binding & all disputes are subject to area Jurisdiction.",
        [Language.Hindi]:
            "कंपनी को बिना पूर्व सूचना के इस योजना को किसी भी समय बंद करने / बढ़ाने / संशोधित करने का अधिकार सुरक्षित है। कंपनी के निर्णय का अंतिम बंधन होगा और सभी विवाद क्षेत्र न्यायाधिकरण के अधीन होंगे।",
    },
    OfferTnCContent16: {
        [Language.English]:
            "This scheme is applicable on All Livguard Inverters & Select Inverter Battery Combos. To know more about the select Inverter Batteries kindly refer to the scheme brochure, or poster or speak with your Authorised Livguard Dealer.",
        [Language.Hindi]:
            "इस योजना का लागू होना सभी लिवगार्ड इनवर्टर और चयनित इनवर्टरबैटरी कॉम्बो पर है। चयनित इनवर्टर बैटरियों के बारे में अधिक जानकारी के लिए कृपया योजना के ब्रोशर, पोस्टर या अपने अधिकृत लिवगार्ड विक्रेता से संपर्क करें।",
    },
    OfferTnCContent17: {
        [Language.English]: "In case of any query related to this offer, you may contact us on LivServ toll-free number 18001025551.",
        [Language.Hindi]: "इस ऑफ़र से संबंधित किसी भी प्रश्न के लिए, आप हमसे LivServ टोल फ्री नंबर 18001025551 पर संपर्क कर सकते हैं।",
    },
    OfferTnCContent18: {
        [Language.English]: "This offer is applicable to all of India.",
        [Language.Hindi]: "यह ऑफ़र पूरे भारत के लिए लागू है।",
    },
    OfferTnCContent19: {
        [Language.English]: "This Offer is applicable to non-solar inverters only.",
        [Language.Hindi]: "यह ऑफ़र केवल गैर-सोलर इनवर्टरों पर ही लागू है।",
    },
    OfferTnCContent20: {
        [Language.English]: "Ref: LG/CB/IB-INV/May/2023/00.",
        [Language.Hindi]: "संदर्भ: LG/CB/IB-INV/May/2023/00.",
    },
    OfferTnCReadMore: {
        [Language.English]: "Read More",
        [Language.Hindi]: "और पढ़ें",
    },
    OfferTnCText: {
        [Language.English]: "Terms & Conditions",
        [Language.Hindi]: "नियम और शर्तें",
    },
    OfferFormGetOTP: {
        [Language.English]: "Get OTP",
        [Language.Hindi]: "ओटीपी प्राप्त करें",
    },
    OfferResendOTP: {
        [Language.English]: "Resend OTP",
        [Language.Hindi]: "ओटीपी पुनः भेजें",
    },
    OfferInvalidOTP: {
        [Language.English]: "Invalid OTP",
        [Language.Hindi]: "अमान्य ओटीपी",
    },
    ormTrackingH1: {
        [Language.English]: "ORM Tracking Form",
        [Language.Hindi]: "ओआरएम ट्रैकिंग फॉर्म",
    },
    ormTrackingFormT1: {
        [Language.English]: "Product",
        [Language.Hindi]: "उत्पाद",
    },
    ormTrackingFormT2: {
        [Language.English]: "Sentiment",
        [Language.Hindi]: "भाव",
    },
    ormTrackingFormT3: {
        [Language.English]: "Date released",
        [Language.Hindi]: "तारीख जारी",
    },
    ormTrackingFormT4: {
        [Language.English]: "Name",
        [Language.Hindi]: "नाम",
    },
    ormTrackingFormT5: {
        [Language.English]: "Phone Number",
        [Language.Hindi]: "फ़ोन नंबर",
    },
    ormTrackingFormT6: {
        [Language.English]: "Email",
        [Language.Hindi]: "ईमेल",
    },
    ormTrackingFormT7: {
        [Language.English]: "Service No.",
        [Language.Hindi]: "सेवा संख्या",
    },
    ormTrackingFormT8: {
        [Language.English]: "Location / City",
        [Language.Hindi]: "स्थान / शहर",
    },
    ormTrackingFormT9: {
        [Language.English]: "State",
        [Language.Hindi]: "राज्य",
    },
    ormTrackingFormT10: {
        [Language.English]: "District",
        [Language.Hindi]: "ज़िला",
    },
    ormTrackingFormT11: {
        [Language.English]: "Address",
        [Language.Hindi]: "पता",
    },
    ormTrackingFormT12: {
        [Language.English]: "Pin Code",
        [Language.Hindi]: "पिन कोड",
    },
    ormTrackingFormT13: {
        [Language.English]: "Query Details",
        [Language.Hindi]: "प्रश्न विवरण",
    },
    ormTrackingFormProduct1: {
        [Language.English]: "Inverter",
        [Language.Hindi]: "इनवर्टर",
    },
    ormTrackingFormProduct2: {
        [Language.English]: "Battery",
        [Language.Hindi]: "बैटरी",
    },
    ormTrackingFormProduct3: {
        [Language.English]: "Inverter & Battery",
        [Language.Hindi]: "इनवर्टर और बैटरी",
    },
    ormTrackingFormProduct4: {
        [Language.English]: "Solar",
        [Language.Hindi]: "सोलर",
    },
    ormTrackingFormSentiment1: {
        [Language.English]: "Neutral",
        [Language.Hindi]: "न्यूट्रल",
    },
    ormTrackingFormSentiment2: {
        [Language.English]: "Positive",
        [Language.Hindi]: "सकारात्मक",
    },
    ormTrackingFormSentiment3: {
        [Language.English]: "Negative",
        [Language.Hindi]: "नकारात्मक",
    },
    ormTrackingFormSubmit: {
        [Language.English]: "Submit",
        [Language.Hindi]: "सब्मिट",
    },
    offerPageCta: {
        [Language.English]: "Contact Now",
        [Language.Hindi]: "अभी संपर्क करें",
    },

    "?????": {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
    },

    invalidKey: {
        [Language.English]: "INVALID STRING REQUESTED",
        [Language.Hindi]: "INVALID STRING REQUESTED",
    },
    dealerLocatorBottomBarT1: {
        [Language.English]: "Cashback Offer",
        [Language.Hindi]: "कैशबैक ऑफर",
    },
    dealerLocatorBottomBarT2: {
        [Language.English]: "Become A Dealer",
        [Language.Hindi]: "डीलर बनें",
    },
    termsAndConditionsCheckboxtext: {
        [Language.English]: `<div class="tw-text-[12px] lg-text-secondary-700">I accept the <a href="https://www.livguard.com/terms-and-conditions.php" target="_blank" class="lg-text-secondary-900 tw-font-semibold">term of use</a> & <a href="https://www.livguard.com/privacy-policy.php" target="_blank" class="lg-text-secondary-900 tw-font-semibold">Privacy policy</a></div>`,
        [Language.Hindi]: `<div class="tw-text-[12px] lg-text-secondary-700">मैं <a href="https://www.livguard.com/terms-and-conditions.php" target="_blank" class="lg-text-secondary-900 tw-font-semibold">नियम और शर्तें</a> और <a href="https://www.livguard.com/privacy-policy.php" target="_blank" class="lg-text-secondary-900 tw-font-semibold">गोपनीयता नीति</a> को स्वीकार करता/करती हूँ।</div>`,
    },
    termsAndConditionsCheckboxtext2: {
        [Language.English]: `<div class="tw-text-[12px] tw-text-secondary-700-dark">I accept the <a href="https://www.livguard.com/terms-and-conditions.php" target="_blank" class="tw-text-secondary-900-dark tw-font-semibold">term of use</a> & <a href="https://www.livguard.com/privacy-policy.php" target="_blank" class="tw-text-secondary-900-dark tw-font-semibold">Privacy policy</a></div>`,
        [Language.Hindi]: `<div class="tw-text-[12px] tw-text-secondary-700-dark">मैं <a href="https://www.livguard.com/terms-and-conditions.php" target="_blank" class="tw-text-secondary-900-dark tw-font-semibold">नियम और शर्तें</a> और <a href="https://www.livguard.com/privacy-policy.php" target="_blank" class="tw-text-secondary-900-dark tw-font-semibold">गोपनीयता नीति</a> को स्वीकार करता/करती हूँ।</div>`,
    },
    phoneNumberChnage: {
        [Language.English]: "Change",
        [Language.Hindi]: "चेंज",
    },
    "15a15952-4fe9-4c9e-b07f-fb1467a3614d": {
        [Language.English]: "Contact Us",
        [Language.Hindi]: "संपर्क",
    },
    "f2e43648-a6bb-4144-a594-280b68479566": {
        [Language.English]: `Product<br/>Catalog`,
        [Language.Hindi]: `प्रोडक्ट<br/>कैटलॉग`,
    },
    "e9eefbbc-302b-4d0e-8736-8b124a4c9baf": {
        [Language.English]: `Dealer<br/>Locator`,
        [Language.Hindi]: `डीलर<br/>ढूँढें`,
    },
    "089e932e-69bf-479d-8c0b-21257fc4a8dc": {
        [Language.English]: `Contact<br/>Us`,
        [Language.Hindi]: `संपर्क<br/>करें`,
    },
    "10ac51a9-2893-40c1-ad80-5017883e890f": {
        [Language.English]: `Enquire<br/>Now`,
        [Language.Hindi]: `संपर्क<br/>करें`,
    },
    "8f342209-314d-41f9-ac39-3370d9d96fcb": {
        [Language.English]: `Tubular`,
        [Language.Hindi]: `ट्यूबुलर`,
    },
    "dd873e80-f5f5-48a6-8429-04efadff2720": {
        [Language.English]: `Step into the future with Livguard's Tubular Inverter Batteries. Enjoy the freedom to choose your warranty, and experience hassle-free, low-maintenance power solutions designed to meet the unique needs of your home.`,
        [Language.Hindi]: `लिवगार्ड ट्यूबुलर बैटरी के साथ ऊर्जा के भविष्य का हिस्सा बनें। अपनी ज़रूरत अनुसार वारंटी चुनने की आज़ादी के साथ सरल और कम मेंटेनेंस वाले ऊर्जा समाधानों का अनुभव करें।`,
    },
    "0593d2e0-e3ec-41c2-9ea8-5bf5fe8e1940": {
        [Language.English]: `Assures a longer cycle life that empowers your home for the long run.`,
        [Language.Hindi]: "लंबी साइकिल जीवन का वादा जो आपके घर को लंबे समय तक के लिए सशक्त करे।",
    },
    "59681e39-779a-4a64-be41-6272b33277e4": {
        [Language.English]: `Suitable for high-power cut applications.`,
        [Language.Hindi]: "लंबे समय के बिजली कट के लिए उपयुक्त।",
    },
    "5b9b5e8e-558b-46b5-aed4-8694bdcf47ab": {
        [Language.English]: `Highly Economical, with various options to choose from.`,
        [Language.Hindi]: "अत्यधिक किफायती, विभिन्न विकल्पों के साथ।",
    },
    "c04c64d1-8625-41c1-b2a1-aea0ec578adb": {
        [Language.English]: `Hassle-free usage with low maintenance requirements.`,
        [Language.Hindi]: "परेशानी मुक्त उपयोग कम देख-रेख की आवश्यकता के साथ।",
    },
    "28d2dcd2-f0a8-4314-b3d0-981ddf2444b9": {
        [Language.English]: `Best <span class="lg-text-highlighted">Offers</span>`,
        [Language.Hindi]: `सर्वश्रेष्ठ <span class="lg-text-highlighted">ऑफर्स</span>`,
    },
    "5b7f29b4-216f-4c13-ac5d-811cc4cb1733": {
        [Language.English]: `Power-Packed and Ready`,
        [Language.Hindi]: `शक्ति से भरे और तैयार`,
    },
    "7b226d84-b7f2-4f94-8626-67627cb47c28": {
        [Language.English]: `Inverter & Battery Offers`,
        [Language.Hindi]: `इनवर्टर & बैटरी ऑफर्स `,
    },
    "e3f844b6-79ab-47fd-a25c-67fadebeae73": {
        [Language.English]: `Automotive Offers`,
        [Language.Hindi]: `ऑटोमोटिव ऑफर्स`,
    },
    "ddf400a4-3900-4561-85fb-1447c8693412": {
        [Language.English]: `Solar Offers`,
        [Language.Hindi]: `सोलर ऑफर्स`,
    },
    "46c68fad-1e6e-442c-ab3c-fc09234693d2": {
        [Language.English]: `Accessories Offers`,
        [Language.Hindi]: `सहायक उपकरण ऑफर्स`,
    },
    "5ac20616-07fb-44f4-bf6f-c5e16b272eb8": {
        [Language.English]: `Our Featured <span class="lg-text-highlighted">Products</span>`,
        [Language.Hindi]: `हमारे विशेष <span class="lg-text-highlighted">उत्पाद</span>`,
    },
    "3a0f3353-3cde-4043-9cf5-714be3fa406d": {
        [Language.English]: `LG700E`,
        [Language.Hindi]: `LG700E`,
    },
    "6dfe6fec-f82b-43e8-b9ca-6757423f56d1": {
        [Language.English]: `LGS1100i`,
        [Language.Hindi]: `LGS1100i`,
    },
    "ae3c747b-5b1a-4d8f-863f-caf3db8f0569": {
        [Language.English]: `IT1548TT`,
        [Language.Hindi]: `IT1548TT`,
    },
    "051eb599-fedc-46ea-be7c-5d857fad1d76": {
        [Language.English]: `IT2272TT`,
        [Language.Hindi]: `IT2272TT`,
    },
    "771acd9e-b288-4898-8e7e-f098012ee548": {
        [Language.English]: `The Urban Combo`,
        [Language.Hindi]: `अर्बन जोड़ी`,
    },
    "479fcb6e-0031-476c-81aa-24551d3252ad": {
        [Language.English]: `The Peace of Mind Combo`,
        [Language.Hindi]: `मन की शांति वाला जोड़ी`,
    },
    "d3aedfd8-f2fa-4ade-a208-bf9ffcaf299d": {
        [Language.English]: `The Super Life Combo`,
        [Language.Hindi]: `सुपर लाइफ जोड़ी`,
    },
    "1daec891-8315-4e82-9f5f-649c5e29af09": {
        [Language.English]: `The Hi-Power Combo`,
        [Language.Hindi]: `हाई-पॉवर कॉम्बो`,
    },
    "a8de768d-be36-4746-b3d4-ee72e6dbe3a6": {
        [Language.English]: `3 Year Warranty`,
        [Language.Hindi]: `3 वर्ष वारंटी`,
    },
    "fac6f9bf-7f72-487d-b802-4e2e9a1d520f": {
        [Language.English]: `600 VA Capacity`,
        [Language.Hindi]: `600 VA कैपेसिटी`,
    },
    "ede80aa8-51b8-4695-adb7-0fd148def188": {
        [Language.English]: `900 VA Capacity`,
        [Language.Hindi]: `900 VA कैपेसिटी`,
    },
    "9d144768-a8e3-49be-8b89-b27300a9769a": {
        [Language.English]: `30 + 18* Months Warranty`,
        [Language.Hindi]: `30 + 18* महीने वारंटी`,
    },
    "68195aa4-ec44-46ec-8b74-51e341e4ed66": {
        [Language.English]: `150 Ah Capacity`,
        [Language.Hindi]: `150 Ah कैपेसिटी`,
    },
    "33862866-bbdb-46ad-a797-f7fbd07df131": {
        [Language.English]: `48 + 24* Months Warranty`,
        [Language.Hindi]: `48 + 24* महीने वारंटी`,
    },
    "e42d6d5a-4b06-45de-b675-cc467d47d4b4": {
        [Language.English]: `220 Ah Capacity`,
        [Language.Hindi]: `220 Ah कैपेसिटी`,
    },
    "4a6d0641-1194-4e47-9ed8-57f27989c541": {
        [Language.English]: `3 Years | 36 + 24* Months Warranty`,
        [Language.Hindi]: `3 वर्ष | 36 + 24* महीने वारंटी`,
    },
    "f0aaf884-f888-4743-b6f3-2a22a6472038": {
        [Language.English]: `1250VA | 200Ah`,
        [Language.Hindi]: `1250VA | 200Ah कैपेसिटी`,
    },
    "c79c879d-a81a-4348-8684-f5c745c0c701": {
        [Language.English]: `3 Years | 60 + 24* Months Warranty`,
        [Language.Hindi]: `3 Years | 60 + 24* महीने वारंटी`,
    },
    "32b02219-4da3-4ef3-9014-8aec2d563414": {
        [Language.English]: `1500VA | 150 Ah Capacity`,
        [Language.Hindi]: `1500VA | 150 Ah कैपेसिटी`,
    },
    "7c7cb84c-8890-4044-87fa-03264f5a5d9c": {
        [Language.English]: `3 Years | 42 + 30* Months Warranty`,
        [Language.Hindi]: `3 Years | 42 + 30* महीने वारंटी`,
    },
    "2f80ec77-0512-4838-aeef-308518466ecd": {
        [Language.English]: `2000VA | 260 Ah Capacity`,
        [Language.Hindi]: `2000VA | 260 Ah कैपेसिटी`,
    },
    "8b0f4c66-acde-442e-84b2-f73479b94b8b": {
        [Language.English]: `LG1950I`,
        [Language.Hindi]: `LG1950I`,
    },
    "20184ae3-2f4e-467f-b440-e446ae611331": {
        [Language.English]: `1650 VA Capacity`,
        [Language.Hindi]: `1650 VA कैपेसिटी`,
    },
    "9c479fcb-3f9a-47e2-a882-bd8f7d0a07c0": {
        [Language.English]: `3 Year Warranty`,
        [Language.Hindi]: `3 वर्ष वारंटी`,
    },
    "e2bd393e-eae8-4746-b5e2-2ec4da81e734": {
        [Language.English]: `LGS1700`,
        [Language.Hindi]: `LGS1700`,
    },
    "05b5a3d3-5023-4549-b8af-87c5e284b022": {
        [Language.English]: `1500 VA Capacity`,
        [Language.Hindi]: `1500 VA कैपेसिटी`,
    },
    "81bdfd50-fab0-419b-a8d3-2116c190ba9f": {
        [Language.English]: `3 Year Warranty`,
        [Language.Hindi]: `3 वर्ष वारंटी`,
    },
    "2cac1604-155d-4a6a-950b-e33233842875": {
        [Language.English]: `IT1584TT`,
        [Language.Hindi]: `IT1584TT`,
    },
    "7b2dc937-de7d-4c76-9f7a-6a804267562e": {
        [Language.English]: `60 + 24* Months Warranty`,
        [Language.Hindi]: `60 + 24* महीने वारंटी`,
    },
    "c41f16ec-4789-43a2-81cd-74852fa07169": {
        [Language.English]: `150 Ah Capacity`,
        [Language.Hindi]: `150 Ah कैपेसिटी`,
    },
    "1b97fd62-2934-44ca-8665-fd0471d099b1": {
        [Language.English]: `IT1578TT`,
        [Language.Hindi]: `IT1578TT`,
    },
    "d997eb4d-3ffc-4b1a-a4f5-e88ae9aabcee": {
        [Language.English]: `48 + 30* Months Warranty`,
        [Language.Hindi]: `48 + 30* महीने वारंटी`,
    },
    "0224e287-af94-47fa-8ca4-410424c8861c": {
        [Language.English]: `150 Ah Capacity`,
        [Language.Hindi]: `150 Ah कैपेसिटी`,
    },
    contactFormS1T1: {
        [Language.English]: "Get In Touch With Us",
        [Language.Hindi]: "हमसे संपर्क करें",
    },
    contactFormS1T2: {
        [Language.English]: "Find answers to your queries, without any hassle",
        [Language.Hindi]: "बिना किसी परेशानी के अपने प्रश्नों के उत्तर पाएं",
    },
    contactUsS3H: {
        [Language.English]: `We Are <span class="lg-text-highlighted">Listening</span>`,
        [Language.Hindi]: `हम <span class="lg-text-highlighted">आपको सुन</span> रहे हैं`,
    },
    contactUsS3Feedback: {
        [Language.English]: "Feedback",
        [Language.Hindi]: "प्रतिक्रिया",
    },
    contactUsS3Complaint: {
        [Language.English]: "Complaint",
        [Language.Hindi]: "शिकायत",
    },
    contactUsS3FeedbackFormT1: {
        [Language.English]: "Rate Our Product",
        [Language.Hindi]: "हमारे उत्पाद का मूल्यांकन करें",
    },
    contactUsS3FormEmailText: {
        [Language.English]: "Your Email",
        [Language.Hindi]: "आपकी ईमेल",
    },
    contactUsS3FormNameText: {
        [Language.English]: "Your Name",
        [Language.Hindi]: "आपका नाम",
    },
    contactUsS3FormEmailPlaceholder: {
        [Language.English]: "Enter Email",
        [Language.Hindi]: "ईमेल दर्ज करें",
    },
    contactUsS3FormNamePlaceholder: {
        [Language.English]: "Enter Full Name",
        [Language.Hindi]: "पूरा नाम दर्ज करें",
    },
    contactUsS3FormProductText: {
        [Language.English]: "Choose Product (Optional)",
        [Language.Hindi]: " उत्पाद चुनें(वैकल्पिक)",
    },
    contactUsS3FeedbackFormDetailText: {
        [Language.English]: "What would you like to change in our delivery system to enhance the customer satisfaction?",
        [Language.Hindi]: "ग्राहकों की संतुष्टि बढ़ाने के लिए आप हमारी डिलीवरी सिस्टम में क्या बदलाव करना चाहेंगे?",
    },
    contactUsS3FeedbackFormDetailPlaceholder: {
        [Language.English]: "Start writing, we are hearing..",
        [Language.Hindi]: "कृपया अपने विचार यहां व्यक्त करें...",
    },
    contactUsTermsAndConditionsCheckboxtext: {
        [Language.English]: `<div class="lg-text-secondary-900 lg-text-icon">
                                I acknowledge that I have read, understood, and agree to abide by the
                                <a href="https://www.livguard.com/terms-and-conditions.php" target="_blank" class="tw-underline tw-underline-offset-2 tw-font-semibold">terms and conditions</a>
                                and
                                <a href="https://www.livguard.com/privacy-policy.php" target="_blank" class="tw-underline tw-underline-offset-2 tw-font-semibold">privacy policy</a>
                                outlined by the website.`,
        [Language.Hindi]: `<div class="lg-text-secondary-900 lg-text-icon">
                                मैं स्वीकार करता हूं कि मैंने वेबसाइट द्वारा निर्दिष्ट
                                <a href="https://www.livguard.com/terms-and-conditions.php" target="_blank" class="tw-underline tw-underline-offset-2 tw-font-semibold">नियम और शर्तें</a>
                                तथा
                                <a href="https://www.livguard.com/privacy-policy.php" target="_blank" class="tw-underline tw-underline-offset-2 tw-font-semibold">गोपनीयता नीति</a>
                                को पढ़ा और समझा है, और उसका पालन करने के लिए सहमत हूं।`,
    },
    contactUsS3FormButtonText: {
        [Language.English]: "Submit info",
        [Language.Hindi]: "सूचना जमा करें ",
    },
    contactUsS3ComplaintFormRadioText: {
        [Language.English]: "What is your complaint about?",
        [Language.Hindi]: "आपकी शिकायत किस संबंध में है?",
    },
    contactUsS3ComplaintFormRadioOption1: {
        [Language.English]: "Product Related",
        [Language.Hindi]: "उत्पाद संबंधित",
    },
    contactUsS3ComplaintFormRadioOption2: {
        [Language.English]: "Service Related",
        [Language.Hindi]: "सेवा संबंधित",
    },
    contactUsS3ComplaintFormDetailText: {
        [Language.English]: "What is troubling you? Please let us know",
        [Language.Hindi]: "आपको क्या परेशान कर रहा है? कृपया हमें बताएं",
    },
    contactUsS3ComplaintFormDetailPlaceholder: {
        [Language.English]: "Describe your concern here...",
        [Language.Hindi]: "अपनी समस्या का विवरण यहां करें...",
    },

    contactUsS3FormNumberText: {
        [Language.English]: "Your Contact Number",
        [Language.Hindi]: "आपका संपर्क नंबर",
    },
    contactUsS3FormNumberPlaceholder: {
        [Language.English]: "Enter Contact Number",
        [Language.Hindi]: "संपर्क नंबर दर्ज करें",
    },
    contactUsS2H: {
        [Language.English]: `Click, <span class="lg-text-highlighted">Connect,</span> Power Up`,
        [Language.Hindi]: `क्लिक करें, <span class="lg-text-highlighted">जुड़ें</span>, ऊर्जा प्राप्त करें`,
    },
    contactUsS2HText: {
        [Language.English]: "Customer care is our main concern. Connect with us at your ease. We are available Monday to Friday, from 8:00 am to 8:30 pm",
        [Language.Hindi]: "ग्राहक सेवा हमारे लिए सबसे ज़रूरी है। अपनी सुविधा के अनुसार हमसे संपर्क करें। हम सोमवार से शुक्रवार तक, सुबह 8:00 बजे से शाम 8:30 बजे तक उपलब्ध हैं।",
    },
    contactUsS2Option1Text: {
        [Language.English]: "Talk to us through our toll free number",
        [Language.Hindi]: "हमारे टोल फ्री नंबर पर हमसे बात करें",
    },
    contactUsS2Option1ButtonText: {
        [Language.English]: "Call Us",
        [Language.Hindi]: "हमें कॉल करें",
    },
    contactUsS2Option2Text: {
        [Language.English]: "Send us a message and talk to our experts",
        [Language.Hindi]: "हमें एक मैसेज करें और हमारे विशेषज्ञों से बात करें",
    },
    contactUsS2Option2ButtonText: {
        [Language.English]: "Chat With Us",
        [Language.Hindi]: "हमसे बात करें ",
    },
    contactUsS2Option3Text: {
        [Language.English]: "Drop us an Email with your concern",
        [Language.Hindi]: "अपनी चिंता के सम्बन्ध में हमें एक ईमेल भेजें",
    },
    contactUsS2Option3ButtonText: {
        [Language.English]: "Email Us",
        [Language.Hindi]: "हमें मेल करें",
    },
    contactUsS2Option4Text: {
        [Language.English]: "Get seamless service for your Livguard product",
        [Language.Hindi]: "अपने लिवगार्ड उत्पाद के लिए बिना रुकावट की सर्विस प्राप्त करें",
    },
    contactUsS2Option4ButtonText: {
        [Language.English]: "Request Service",
        [Language.Hindi]: "सर्विस अनुरोध करें",
    },
    contactUsS4H: {
        [Language.English]: `Our <span class="lg-text-highlighted">Operations</span>`,
        [Language.Hindi]: `हमारे <span class="lg-text-highlighted">संचालन</span>`,
    },
    contactUsS4Option1Heading: {
        [Language.English]: "India Operations",
        [Language.Hindi]: "भारत संचालन",
    },
    contactUsS4Option1Text: {
        [Language.English]: "Livguard, with its widespread network of dealers, distributors, and service providers, aims to deliver limitless energy experiences to all.",
        [Language.Hindi]: "लिवगार्ड, अपने व्यापक डीलरों, वितरकों और सेवा प्रदाताओं के साथ, सभी को असीमित ऊर्जा अनुभव प्रदान करने का लक्ष्य रखता है।",
    },
    contactUsS4Option2Heading: {
        [Language.English]: "International Operations",
        [Language.Hindi]: "वैश्विक संचालन",
    },
    contactUsS4Option2Text: {
        [Language.English]: "Livguard has established connections in many countries, which enable them to seize opportunities in the Global Energy Storage Solutions Sector.",
        [Language.Hindi]: "लिवगार्ड ने कई देशों में संपर्क स्थापित किए हैं, जिससे उन्हें वैश्विक ऊर्जा संग्रहण समाधानों के क्षेत्र में मौकों का लाभ उठाने की क्षमता हासिल हुई है। ",
    },
    contactUsS4ButtonText: {
        [Language.English]: "Know More",
        [Language.Hindi]: "अधिक जानिए",
    },
    contactUsS5H: {
        [Language.English]: `<span class="lg-text-highlighted">Explore Careers</span> <br/> At Livguard`,
        [Language.Hindi]: `लिवगार्ड के साथ अपना<br/> <span class="lg-text-highlighted">करियर बनाएं</span>`,
    },
    contactUsS5Text: {
        [Language.English]: "Be a part of Livguard's energy-packed team. Drop us a mail with your field of interest and we will get back to you!",
        [Language.Hindi]: "लिवगार्ड की टीम का हिस्सा बनें। हमें अपने रुचि के क्षेत्र के बारे में बताते हुए एक मेल भेजें और हम आपसे संपर्क करेंगे!",
    },
    contactUsS5ButtonText: {
        [Language.English]: "Apply Now",
        [Language.Hindi]: "अप्लाई करें",
    },
    contactPageFeedbackSuccessLowRatingMessage: {
        [Language.English]: "Stay tuned, our team will connect with you soon to know more about your experience",
        [Language.Hindi]: "हमारे साथ बने रहें, आपके अनुभव के बारे में अधिक जानने के लिए हमारी टीम जल्द ही आपसे संपर्क करेगी।",
    },
    contactPageFeedbackSuccessHighRatingMessage: {
        [Language.English]: "Your feedback is valuable for us, and motivates us to get better",
        [Language.Hindi]: "आपके विचार हमारे लिए महत्वपूर्ण हैं, और हमें बेहतर बनने के लिए प्रेरित करते हैं।",
    },
    contactPageComplaintSuccessMessage: {
        [Language.English]: "Stay rest assured, our team will connect with you soon.",
        [Language.Hindi]: "निश्चिंत रहें। हम आपसे जल्द ही संपर्क करेंगे।",
    },
    contactPagesuccessT1: {
        [Language.English]: `Thank You!`,
        [Language.Hindi]: "धन्यवाद!",
    },
    "48aa62c2-244f-45ac-9750-56016d86d5b9": {
        [Language.English]: "Please Select Your Product",
        [Language.Hindi]: "कृपया अपना उत्पाद चुनें",
    },
    "ab28480c-7f98-45fc-8bb0-e15cd633b31b": {
        [Language.English]: "Inverters",
        [Language.Hindi]: "इनवर्टर",
    },
    "3373177a-78dd-4930-8a52-96800b5de45e": {
        [Language.English]: "Inverter Batteries",
        [Language.Hindi]: "इनवर्टर बैटरी",
    },
    "6b5c90fb-35f1-4f34-9064-46c4cbd94eaa": {
        [Language.English]: "Automotive Batteries",
        [Language.Hindi]: "ऑटोमोटिव बैटरी",
    },
    "e9977450-be65-4c1b-9eb6-c2224246a81a": {
        [Language.English]: "Lithium Batteries",
        [Language.Hindi]: "लिथियम बैटरी",
    },
    "178f037b-d4e3-41dc-b44d-dc4468fa4c74": {
        [Language.English]: "Solar Solutions",
        [Language.Hindi]: "सोलर सलूशन",
    },
    "49cca91d-11f0-463a-8d24-873cf9428e62": {
        [Language.English]: "Other Products",
        [Language.Hindi]: "अन्य उत्पाद",
    },
    "abce92ec-fd9a-4578-ab56-ddfd9fdafe72": {
        [Language.English]: "Starting from ₹",
        [Language.Hindi]: "₹",
    },
    "0044b486-6eca-4e3a-abf0-102eede6e10c": {
        [Language.English]: "/-",
        [Language.Hindi]: "/- से शुरू",
    },

    "063dc56b-910e-4a48-acb8-8f52668a4c72": {
        [Language.English]: "view battery",
        [Language.Hindi]: "उत्पाद देखें",
    },
    "14e0e286-5fd7-43aa-a6f3-5b3b9a0ec71f": {
        [Language.English]: "Best Seller",
        [Language.Hindi]: "श्रेष्ठ विकल्प",
    },
    "e1b52be2-199b-48da-b5da-ab126f163411": {
        [Language.English]: "ZING PRIMO ZP 70D26 L",
        [Language.Hindi]: "?????",
    },
    "7674034f-6ba5-49aa-8a27-0fb8076dd0c9": {
        [Language.English]: "1500VA Capacity",
        [Language.Hindi]: "?????",
    },
    "34ac44bc-1ed5-40eb-898b-d9f3f3b1252a": {
        [Language.English]: "72 Months Warranty",
        [Language.Hindi]: "?????",
    },
    "b9e34b6e-972e-4246-a393-6450421e4813": {
        [Language.English]: "Offers coming soon!",
        [Language.Hindi]: "ऑफर जल्दी ही आने वाले हैं!",
    },
    "8110c3a9-9ce4-4fb6-9133-eed73ee34e88": {
        [Language.English]: `Bring home the best products at <span class="lg-text-primary-500">0% interest</span> with our trusted finance partners`,
        [Language.Hindi]: `<span class="lg-text-highlighted">0% ब्याज</span> पर घर लाये बेहतरीन प्रोडक्ट्स, भरोसेमंद फाइनेंस पार्टनर्स के साथ`,
    },
    "f0453469-c11f-46c4-b462-ad4445abfc46": {
        [Language.English]: "Offer valid till: ",
        [Language.Hindi]: "ऑफर की अवधि: ",
    },
    "df574a28-5854-4ceb-a9ec-9bfe5dec1b17": {
        [Language.English]: "",
        [Language.Hindi]: " तक",
    },
    "4d53d9a4-bbd6-464b-be5c-f0bab1defe02": {
        [Language.English]: "Avail Offer",
        [Language.Hindi]: "ऑफर का लाभ उठाएं",
    },
    "71bf111f-fc1f-4026-baeb-9b4981a8aba9": {
        [Language.English]: `Watch <span class="lg-text-highlighted">Digital Film</span>`,
        [Language.Hindi]: "?????",
    },
    "dfa03024-6e74-45c6-9634-8d83833930f3": {
        [Language.English]: `Charged Up <span class="lg-text-highlighted">Deals</span> For You`,
        [Language.Hindi]: `ऊर्जा से भरपूर <span class="lg-text-highlighted">डील्स</span>`,
    },
    "0931e2ce-74c8-49b3-84d0-760b290166eb": {
        [Language.English]: `Best deals and offers curated specially for you`,
        [Language.Hindi]: `आपके लिए विशेष रूप से चुनी गई सबसे बेहतरीन डील्स और ऑफर्स`,
    },
    "3b44dc3a-1029-454b-ab4f-748b8cf16a8a": {
        [Language.English]: "Oops! No Active Offers",
        [Language.Hindi]: "ओहो! कोई ऑफर चालू नहीं",
    },
    "e4b32997-8139-4b74-8508-0b3ee57977a2": {
        [Language.English]: "Stay tuned, take a look at our products till then",
        [Language.Hindi]: "जुड़े रहें, तब तक हमारे उत्पादों श्रेणी देखें",
    },
    "4391ead5-8016-4a2f-9132-0b6370b40cd3": {
        [Language.English]: "Explore Inverter and Batteries",
        [Language.Hindi]: "इनवर्टर और बैटरी देखें",
    },
    "cf35b042-9f06-44d4-b0c3-f7ed9399e400": {
        [Language.English]: "Explore Automotive Batteries",
        [Language.Hindi]: "ऑटोमोटिव बैटरी देखें",
    },
    "1945f91a-ddb2-42ab-99d0-f094a02094b0": {
        [Language.English]: "Explore Solar",
        [Language.Hindi]: "सोलर देखें",
    },
    "15f8008f-5fa5-4b55-9876-916ff55cf323": {
        [Language.English]: "Explore Accessories",
        [Language.Hindi]: "सहायक उपकरण देखें",
    },
    // Service Page Vernac Strings Start
    "84ec1aea-1f61-4508-ae92-cd3647247ef1": {
        [Language.English]: `Home`,
        [Language.Hindi]: "होम",
    },
    "9672b1a1-0713-48e3-98a2-17322eda6ff2": {
        [Language.English]: `Service`,
        [Language.Hindi]: "सर्विस",
    },
    "1f489840-705d-44b1-a18a-73a2645594de": {
        [Language.English]: `Reliable Service`,
        [Language.Hindi]: "विश्वसनीय सर्विस",
    },
    "5a7fe2d5-9f46-4bb4-814e-7f075f8ca843": {
        [Language.English]: `For Uninterrupted Power Supply`,
        [Language.Hindi]: "निरंतर ऊर्जा के लिए",
    },
    "2cc7bf42-cb40-4316-8429-f65309b51501": {
        [Language.English]: `Effortless <span class="lg-text-highlighted">Services</span>`,
        [Language.Hindi]: `बिना कठिनाई <span class="lg-text-highlighted">सर्विस</span>`,
    },

    "f4a43cd6-7aea-444f-8f0f-6499ebedb2bf": {
        [Language.English]: `For Limitless Energy Solutions`,
        [Language.Hindi]: "असीमित ऊर्जा समाधानों के लिए",
    },
    "521eb4a5-fa32-4ac8-aa40-b8866848e565": {
        [Language.English]: `Pan India Presence`,
        [Language.Hindi]: "पूरे भारत में मौजूदगी",
    },
    "dce77179-dece-4a32-87e8-571459bccdbb": {
        [Language.English]: `Service Excellence`,
        [Language.Hindi]: "सर्वश्रेष्ठ सर्विस",
    },
    "4fc10235-8e85-48c9-9202-916a0bda22db": {
        [Language.English]: `Quick Resolution`,
        [Language.Hindi]: "तेज़ समाधान",
    },
    "3815727b-e9b3-4e71-a167-1c85c66b9e1d": {
        [Language.English]: `At Livguard, our mission is to ensure a seamless and uninterrupted energy solution journey for you, always. With LivServ, our dedicated service platform, we simplify and streamline the service resolution process. From inverters and inverter battery services, car battery servicing to stabilizer services - we've got all your energy needs covered!`,
        [Language.Hindi]:
            "लिवगार्ड में, हमारा उद्देश्य आपके लिए एक बिना रुकावट और मन की शांति से भरपूर ऊर्जा की यात्रा संभव कराना है। हमारे सर्विस समाधान प्लेटफ़ॉर्म, लिवसर्व के साथ, हम आपकी सर्विस से संबंधित दुविधाओं को ख़त्म करने की प्रक्रिया को सहज बनाते हैं। इनवर्टर से लेकर इनवर्टर बैटरी की सर्विस, गाड़ी की बैटरी कि सर्विस से लेकर स्टेबलाइजर की सर्विस तक - हम आपकी सभी ऊर्जा संबंधित ज़रूरतों का ख़याल रखते हैं!",
    },
    "3ed955c3-a090-4862-9132-e08af40bc379": {
        [Language.English]: `Click, <span class="lg-text-highlighted">Connect,</span> Power Up`,
        [Language.Hindi]: `एक क्लिक में हमसे <span class="lg-text-highlighted">जुड़ें</span>`,
    },

    "58490cb1-5f27-4f67-98d3-939b5a3b9b10": {
        [Language.English]: `Request A <span class="lg-text-highlighted">Service</span>`,
        [Language.Hindi]: `<span class="lg-text-highlighted">सर्विस</span>अनुरोध करें`,
    },
    "1cc00f3b-4b94-4e16-bc4f-a0337877d25e": {
        [Language.English]: `Please describe the issue you are facing`,
        [Language.Hindi]: "कृपया अपनी दुविधा हमें बताएँ",
    },
    "2f725e91-eb31-4d56-898a-87db94a21e48": {
        [Language.English]: `Describe your concern here...`,
        [Language.Hindi]: "अपनी बात यहाँ व्यक्त करें…",
    },
    "43e7ced0-33d1-46a2-ab06-4e50dae64256": {
        [Language.English]: `Select Your Product`,
        [Language.Hindi]: "अपना उत्पाद चुनें",
    },
    "17cfa283-6fcc-4a49-9dfe-a392e0310b27": {
        [Language.English]: `Your Contact Number`,
        [Language.Hindi]: "आपका मोबाइल नंबर",
    },
    "1e90dca7-b78f-4231-b2df-644a3b0322d1": {
        [Language.English]: `Enter Contact Number`,
        [Language.Hindi]: "अपना मोबाइल नंबर डालें",
    },
    "31241b10-2784-43df-a2ea-a614c9ef7468": {
        [Language.English]: `Your Pin Code`,
        [Language.Hindi]: "आपका पिन कोड",
    },
    "848eb522-5221-4035-ac77-94338e97ac9c": {
        [Language.English]: `Enter Pin Code`,
        [Language.Hindi]: "अपना पिन कोड डालें",
    },
    "a1a00432-ed7a-4e11-9e9b-4cc783a6776a": {
        [Language.English]: `Your City`,
        [Language.Hindi]: "आपका शहर",
    },
    "c5702705-3fa4-4f7d-a706-4e22ea024aac": {
        [Language.English]: `Enter Your City`,
        [Language.Hindi]: "अपना शहर डालें",
    },
    "7de002e7-afeb-40d5-8bf5-6f2cd2be88ea": {
        [Language.English]: `Your Email`,
        [Language.Hindi]: "आपकी ईमेल",
    },
    "01fce108-4fe0-40c2-bb3a-3fb980fcec72": {
        [Language.English]: `Enter Email`,
        [Language.Hindi]: "अपनी ईमेल डालें",
    },
    "6a37e3ee-a8a6-4999-9494-80465aaad48d": {
        [Language.English]: `Your Name`,
        [Language.Hindi]: "आपका नाम",
    },
    "a0d68490-ad84-47fb-863c-2a9c812feaec": {
        [Language.English]: `Enter Full Name`,
        [Language.Hindi]: "अपना पूरा नाम डालें",
    },
    "d8a55222-554d-48c5-a638-118f37baf66b": {
        [Language.English]: `Your State`,
        [Language.Hindi]: "आपका राज्य",
    },
    "981952eb-5f5c-4b14-b4e8-f1b766851c64": {
        [Language.English]: `Enter Your State`,
        [Language.Hindi]: "अपना राज्य डालें",
    },
    "5d393e57-cef0-497c-b9c6-87e469e34fe8": {
        [Language.English]: `Service Number (Optional)`,
        [Language.Hindi]: "सर्विस नंबर",
    },
    "54ff368f-0a01-443e-b940-9a9240cbe783": {
        [Language.English]: `Enter Service Number`,
        [Language.Hindi]: "सर्विस नंबर डालें",
    },
    "0bc7a8cd-72d0-4f85-ab9d-39abdb269e6a": {
        [Language.English]: `Submit`,
        [Language.Hindi]: "सबमिट करें",
    },
    "6d0f2700-ee1b-4215-b60c-f920ba0d0a2b": {
        [Language.English]: `Thank You!`,
        [Language.Hindi]: "?????",
    },
    "d0b96a23-94c3-45c9-af3e-0722264c7ed5": {
        [Language.English]: `Hang on, our team will get in touch with you shortly.`,
        [Language.Hindi]: "?????",
    },
    "74058229-5e75-4efe-833c-18009f248c6a": {
        [Language.English]: `Join Our 2 Crore`,
        [Language.Hindi]: "जुड़िए हमारे 2 करोड़",
    },
    "afe86242-a8aa-4955-8951-516c560fc956": {
        [Language.English]: `<span class="lg-text-highlighted">Happy Users</span>`,
        [Language.Hindi]: `<span class="lg-text-highlighted">सुखी सदस्यों के साथ</span>`,
    },
    "aec063e5-c0a7-4ec7-8d66-8c2a92b61b5d": {
        [Language.English]: `Warranty`,
        [Language.Hindi]: "आसान ",
    },
    "cbe9f24f-08f3-4448-aeb5-556dc08fd017": {
        [Language.English]: `Registration Made Easy`,
        [Language.Hindi]: "वारंटी पंजीकरण",
    },
    "d1030527-97b8-4772-9810-e98c5c0b30c3": {
        [Language.English]: `Register Now`,
        [Language.Hindi]: "अभी पंजीकरण करें",
    },
    "0a3cd411-749e-4d0a-8d1e-36bbf631e462": {
        [Language.English]: `Hang on, our team will get in touch with your shortly.`,
        [Language.Hindi]: "?????",
    },
    "5816ad28-9bb2-42c3-8c82-e70a3f4e6f6c": {
        [Language.English]: `What should I do if my product is not working correctly?`,
        [Language.Hindi]: `यदि मेरा उत्पाद सही ढंग से काम नहीं कर रहा है तो मुझे क्या करना चाहिए?`,
    },
    "cb66e8d5-12ac-4de1-b33d-feaa972bc919": {
        [Language.English]: `If you experience any issues with your Livguard product, you can simply connect with our service experts, and they will solve your issue! Reach out to us at 18001025551.`,
        [Language.Hindi]: `यदि आप अपने लिवगार्ड उत्पाद के साथ किसी भी समस्या का अनुभव करते हैं, तो आप बस हमारे सेवा विशेषज्ञों से जुड़ सकते हैं, और वे आपकी समस्या का समाधान करेंगे! 18001025551 पर हमसे संपर्क करें।`,
    },
    "05424c86-424b-477a-9701-a55a7e04f02c": {
        [Language.English]: `What if my product needs service after the warranty period?`,
        [Language.Hindi]: `यदि मेरे उत्पाद को वारंटी अवधि के बाद सेवा की आवश्यकता हो तो क्या होगा?`,
    },
    "e00b0eba-3686-4dd5-bb24-f28b0e0aa159": {
        [Language.English]: `Even after the warranty period, Livguard is committed to providing exceptional service to our customers. If your product requires service or repair, you can reach out to us at 18001025551.`,
        [Language.Hindi]: `वारंटी अवधि के बाद भी, लिवगार्ड हमारे ग्राहकों को असाधारण सेवा प्रदान करने के लिए प्रतिबद्ध है। यदि आपके उत्पाद को सेवा या मरम्मत की आवश्यकता है, तो आप 18001025551 पर हमसे संपर्क कर सकते हैं।`,
    },
    "5269b845-bdc3-4fd9-ab53-e095b44a5352": {
        [Language.English]: "How do I request a service or repair?",
        [Language.Hindi]: `मैं किसी सेवा या मरम्मत का अनुरोध कैसे करूँ?`,
    },
    "08e6c940-69e6-4f33-b3f8-6966c67b3a3c": {
        [Language.English]: `To request a service or repair for your Livguard E-Rickshaw battery, simply visit our website and fill out the service request form. Our dedicated service team will promptly reach out to you and schedule the necessary assistance. We strive to provide efficient and hassle-free service to ensure your battery is back up and running in no time.`,
        [Language.Hindi]: `अपनी लिवगार्ड ई-रिक्शा बैटरी के लिए सेवा या मरम्मत का अनुरोध करने के लिए, बस हमारी वेबसाइट पर जाएँ और सेवा अनुरोध फ़ॉर्म भरें। हमारी समर्पित सेवा टीम तुरंत आप तक पहुंचेगी और आवश्यक सहायता निर्धारित करेगी। हम यह सुनिश्चित करने के लिए कुशल और परेशानी मुक्त सेवा प्रदान करने का प्रयास करते हैं कि आपकी बैटरी कुछ ही समय में वापस चालू हो जाए।`,
    },
    "39a32866-2d52-4cbb-80cf-43cc0a991304": {
        [Language.English]: `How can I register for a warranty?`,
        [Language.Hindi]: `मैं वारंटी के लिए कैसे पंजीकरण कर सकता हूं?`,
    },
    "4536af23-ca20-4466-8be7-5ff576707344": {
        [Language.English]: `Registering your Livguard product for warranty is easy. Visit our website and navigate to the warranty registration page. Fill in the required details, including the purchase information, battery serial number, and your contact information. Once registered, you can enjoy the benefits of our comprehensive warranty coverage, providing peace of mind for your battery investment.`,
        [Language.Hindi]: `वारंटी के लिए अपने लिवगार्ड उत्पाद को पंजीकृत करना आसान है। हमारी वेबसाइट पर जाएँ और वारंटी पंजीकरण पृष्ठ पर जाएँ। खरीदारी की जानकारी, बैटरी क्रमांक और अपनी संपर्क जानकारी सहित आवश्यक विवरण भरें। एक बार पंजीकृत होने के बाद, आप हमारे व्यापक वारंटी कवरेज का लाभ उठा सकते हैं, जो आपके बैटरी निवेश के लिए मानसिक शांति प्रदान करता है।`,
    },
    "b2d4555f-0f65-464c-b02e-b9c4a9893cc2": {
        [Language.English]: `What happens if the product cannot be repaired?`,
        [Language.Hindi]: `यदि उत्पाद की मरम्मत नहीं की जा सकती तो क्या होगा?`,
    },
    "db94ebb0-3c50-4cc4-9a4c-75548b10b158": {
        [Language.English]: `In rare cases where a repair is not feasible, Livguard offers suitable alternatives for your needs. Our team will assess the situation and provide you with replacement options or suggest an upgraded model that meets your requirements.`,
        [Language.Hindi]: `उन असामान्य मामलों में जहां मरम्मत संभव नहीं है, लिवगार्ड आपकी आवश्यकताओं के लिए उपयुक्त विकल्प प्रदान करता है। हमारी टीम स्थिति का आकलन करेगी और आपको प्रतिस्थापन विकल्प प्रदान करेगी या एक उन्नत मॉडल का सुझाव देगी जो आपकी आवश्यकताओं को पूरा करता हो।`,
    },

    // Service Page Vernac Strings End

    // Stabilizer Page Vernac Strings Start
    "dead4984-38fc-490e-8b38-0670a9a03631": {
        [Language.English]: `Best Voltage`,
        [Language.Hindi]: "?????",
    },
    "e716f6b1-74ad-4087-80e1-fb88fb9a44ce": {
        [Language.English]: `Stabilizers for Home`,
        [Language.Hindi]: "?????",
    },
    "10653f56-45cc-4317-9951-d6db74523397": {
        [Language.English]: `Livguard, aims at offering “Smart and Innovative energy solutions” to its customers. Our company is determined at delivering quality`,
        [Language.Hindi]: "?????",
    },
    "612038bf-767c-475f-beca-aa4428c56d9f": {
        [Language.English]: `Stabilizers That Are`,
        [Language.Hindi]: "?????",
    },
    "4a65b232-e2e5-4a85-9004-a84a5e04f91d": {
        [Language.English]: `<span class="lg-text-highlighted">Meant To Last</span>`,
        [Language.Hindi]: "?????",
    },
    "342e7f22-6183-4d16-afd9-3f4e05c36a04": {
        [Language.English]: `Stabilizers`,
        [Language.Hindi]: "?????",
    },
    "d0d3b5e3-a618-4174-b3a8-14e8d6d11ff2": {
        [Language.English]: `For Home`,
        [Language.Hindi]: "?????",
    },
    "076cf02d-0b8a-4af2-9e0f-63d1804402d2": {
        [Language.English]: `For&nbsp;AC`,
        [Language.Hindi]: "?????",
    },
    "c3597ec0-a4b1-47b6-bdba-13b6e53f3cd9": {
        [Language.English]: `For&nbsp;Mains`,
        [Language.Hindi]: "?????",
    },
    "b82414bd-0f13-4401-a592-84cbc4f9a4e2": {
        [Language.English]: `For&nbsp;TVs`,
        [Language.Hindi]: "?????",
    },
    "33655fc5-1527-4744-a163-bd6217eac5b4": {
        [Language.English]: `For&nbsp;Refrigerators`,
        [Language.Hindi]: "?????",
    },
    "92897a67-ff1d-4e6c-804f-4f69dd03db4d": {
        [Language.English]: `We Are`,
        [Language.Hindi]: "?????",
    },
    "53b219cb-fdee-4ea2-aff4-858f5c63aed0": {
        [Language.English]: `<span class="lg-text-highlighted">Everywhere!</span>`,
        [Language.Hindi]: "?????",
    },
    "24bb85a9-42af-4302-b21b-dece9f9d0d21": {
        [Language.English]: `Available Across 21000+ Pincodes`,
        [Language.Hindi]: "?????",
    },
    "db232019-b302-4eb7-a10c-05b17e72a800": {
        [Language.English]: `Find My Dealer`,
        [Language.Hindi]: "?????",
    },
    "53bbe30f-9859-42e5-add2-64dd0de0d415": {
        [Language.English]: `Choose The`,
        [Language.Hindi]: "?????",
    },
    "91461747-63e3-4cfa-bacf-715015891ee8": {
        [Language.English]: `<span class="lg-text-highlighted">Right Stabilizer</span> For You`,
        [Language.Hindi]: "?????",
    },
    "8e88b1c7-bac7-4b9e-a112-5fc7431b4ccd": {
        [Language.English]: `Find the suitable pick of inverter that fulfils your requirements with efficiency. Use our Buying Guide to get to know in detail about how you can buy your inverter battery and our
        Product Catalogue for product specifications`,
        [Language.Hindi]: "?????",
    },
    "b3660763-f092-42d4-a97d-76a34dd701f6": {
        [Language.English]: `Buying Guide`,
        [Language.Hindi]: "?????",
    },
    "51ae4bbd-0f66-42bc-b031-cc3e9dc4dc26": {
        [Language.English]: `Download Catalogue`,
        [Language.Hindi]: "?????",
    },
    "1271cac7-693c-48bc-850f-16199416dd0e": {
        [Language.English]: `Plan Your Power`,
        [Language.Hindi]: "?????",
    },

    "b0a3aa40-4b00-4bdd-88e0-67085fafa92b": {
        [Language.English]: `Shower Some Love`,
        [Language.Hindi]: "?????",
    },
    "c0f802cc-902b-4328-b631-a3fad8fc7d18": {
        [Language.English]: `On Our <span class="lg-text-highlighted">Social Handles</span>`,
        [Language.Hindi]: "?????",
    },
    //Stabilizer Page Vernac Strings End

    //About Us Page Vernac Strings Start
    "849dabf7-0fa6-47e6-a1f8-e4f544306f7c": {
        [Language.English]: "Home",
        [Language.Hindi]: "होम",
    },
    "6d164881-cc49-4447-8460-d6fa6cf7a14f": {
        [Language.English]: "About Us",
        [Language.Hindi]: "हमारे बारे में",
    },
    "b38f6ec8-1c38-44ef-b016-93da7ed7bf19": {
        [Language.English]: `Bringing <span class="lg-text-highlighted">Unlimited Energy</span> To Every Household`,
        [Language.Hindi]: "?????",
    },
    "540952b6-a7ef-453f-a6e5-cd8953fa4222": {
        [Language.English]: `Who <span class="lg-text-highlighted">We Are</span>`,
        [Language.Hindi]: "?????",
    },
    "55c526fa-c19d-4a73-a460-62c333174a1b": {
        [Language.English]: `About Livguard`,
        [Language.Hindi]: "?????",
    },
    "a95dff17-79db-4ac9-b9aa-2518f93919c5": {
        [Language.English]: `With our customer-centric approach, we aim to empower everyone across the nation with limitless energy. Our diverse product portfolio, spanning from automotive batteries, inverters and inverter batteries, to stabilizers and residential solar solutions, ushers in a new era of innovative energy products.`,
        [Language.Hindi]: "?????",
    },
    "8a35dff2-079c-4638-a96a-8100d04a72b6": {
        [Language.English]: `Our Mission`,
        [Language.Hindi]: "?????",
    },
    "4e49216b-9457-488a-860e-3fb97ba34100": {
        [Language.English]: `Establish Livguard as a strong player in energy-solution space in India. We will achieve this by developing an ecosystem of delighted customers, committed partners, exceptional product quality and delightful service.`,
        [Language.Hindi]: "?????",
    },
    "68b1762f-e31f-4110-bf87-3afc487d7edf": {
        [Language.English]: `Our Vision`,
        [Language.Hindi]: "?????",
    },
    "373fedff-da89-4396-b215-ed4099abfcf9": {
        [Language.English]: `To be a global leader in energy storage products driven by innovative technology and excellence in manufacturing & services.`,
        [Language.Hindi]: "?????",
    },
    "75b7261b-7ced-4385-891a-ecfe8123bab5": {
        [Language.English]: `Our <span class="lg-text-highlighted">Presence</span>`,
        [Language.Hindi]: `?????`,
    },
    "bc06ea32-4286-48ed-bde2-5a5c7250ff67": {
        [Language.English]: `India Operations`,
        [Language.Hindi]: `?????`,
    },
    "78cd576b-2c66-4cf1-b4db-209d0543a659": {
        [Language.English]: `Livguard, with its widespread network of dealers, distributors, and service providers, aims to deliver limitless energy experiences to all.`,
        [Language.Hindi]: `?????`,
    },
    "02195d6b-8516-4598-9214-d1b13866d85b": {
        [Language.English]: `Know More`,
        [Language.Hindi]: `?????`,
    },
    "8ae1096b-408d-4d55-8005-78574a7b5815": {
        [Language.English]: `International Operations`,
        [Language.Hindi]: `?????`,
    },
    "812b45ce-01e5-4ecb-9595-33766948660f": {
        [Language.English]: `Livguard has established connections in many countries, which enable them to seize opportunities in the Global Energy Storage Solutions Sector.`,
        [Language.Hindi]: `?????`,
    },
    "2adcc683-70f0-4b39-be83-73211ea28f20": {
        [Language.English]: `<span class="lg-text-highlighted">Explore Careers</span> <br/> At Livguard`,
        [Language.Hindi]: `?????`,
    },
    "1aa2a41b-b500-43bb-b0cd-b9999f5e442b": {
        [Language.English]: `Be a part of Livguard's energy-packed team. Drop us a mail with your field of interest and we will get back to you!`,
        [Language.Hindi]: `?????`,
    },
    "c1a8bbb2-f085-4c71-8082-7e292fcde4e7": {
        [Language.English]: `Apply Now`,
        [Language.Hindi]: `?????`,
    },
    "13f6e1c4-d97c-46cf-8ddb-52712843410b": {
        [Language.English]: `Meet Our`,
        [Language.Hindi]: `?????`,
    },
    "cb60764f-1758-4b61-a998-8f7acc7b0b92": {
        [Language.English]: `<span class="lg-text-highlighted">Leaders</span>`,
        [Language.Hindi]: `?????`,
    },
    "d867ff63-d4bf-49ae-8ac7-7290a76caef3": {
        [Language.English]: "Mr. Rakesh Malhotra",
        [Language.Hindi]: "श्री. राकेश मल्होत्रा",
    },
    "755f8e01-18c9-4883-956c-5851e4e3885f": {
        [Language.English]: "(Founder & Mentor)",
        [Language.Hindi]: "(संस्थापक और संरक्षक)",
    },
    "8ddd1acf-9b2d-41f4-b4cd-e2395c211c88": {
        [Language.English]:
            "A leader, a mentor, a visionary, and an overall driving force, Mr. Rakesh Malhotra's exposure to the industry, his passion and his spirit to bring new and innovative ideas to life continues to motivate many other entrepreneurs.",
        [Language.Hindi]:
            "एक मार्गदर्शक , एक उपदेशक, एक दूरदर्शी, और एक समग्र प्रेरक शक्ति, श्री राकेश मल्होत्रा ​​​​का उद्योग के संपर्क में, उनका जुनून और नए विचारों को जीवन में लाने की उनकी भावना कई अन्य उद्यमियों को प्रेरित करती रही है।",
    },
    "4ca82802-b39e-4844-9586-82ce4b095cff": {
        [Language.English]: "Mr. Gurpreet Bhatia",
        [Language.Hindi]: "श्री गुरप्रीत भाटिया",
    },
    "23fd4d15-8063-44e1-be03-a3aa6585d33b": {
        [Language.English]: "(CEO)",
        [Language.Hindi]: "(सीईओ)",
    },
    "4f82218c-1156-4660-b634-a1231d82d457": {
        [Language.English]:
            "A dynamic leader with a formidable experience of over 25 years in B2B & B2C channels coupled with global experience in marketing, sales, and strategy. Mr. Gurpreet Bhatia is an impeccable example of someone who has created a unique career trajectory.",
        [Language.Hindi]:
            "मार्केटिंग, सेल्स और रणनीति में वैश्विक अनुभव के साथ बी2बी और बी2सी चैनलों में 25 से अधिक वर्षों के अनुभव के साथ एक मार्गदर्शक। श्री गुरप्रीत भाटिया एक उदाहरण हैं, जिसने एक अद्वितीय करियर मार्ग बनाया है।",
    },
    "54c7930a-aed3-4efc-b2eb-68a7b5b87ae2": {
        [Language.English]: "Mr. Navneet Kapoor",
        [Language.Hindi]: "श्री नवनीत कपूर",
    },
    "5267b971-9cbf-41dc-9cf8-abb2f8d7f2c5": {
        [Language.English]: "(Co-founder & Chairman)",
        [Language.Hindi]: "(सह-संस्थापक और अध्यक्ष)",
    },
    "07d2f8d0-b81b-4dd3-a547-1adef20b3fea": {
        [Language.English]:
            "One of the main pillars of the SAR Group and a hallmark of true entrepreneurship, Mr. Navneet Kapoor has been among the key forces behind Livguard through his expertise and belief that a successful business thrives when outstanding service is coupled with industry expertise and innovation.",
        [Language.Hindi]:
            "SAR ग्रुप के मुख्य स्तंभों में से एक और सच्चे उद्यमिता की पहचान, श्री नवनीत कपूर अपनी विशेषज्ञता और विश्वास के माध्यम से लिवगार्ड की प्रमुख ताकतों में से एक रहे हैं। उनका मानना है कि एक सफल व्यवसाय तब फलता-फूलता है जब उद्योग विशेषज्ञता के साथ उत्कृष्ट सेवा मिलती है!",
    },
    "4d638603-3fff-4920-b8b2-927d6a748d54": {
        [Language.English]: "Mr. Alankar Mittal",
        [Language.Hindi]: "श्री अलंकार मित्तल",
    },
    "62e2f1af-3ce5-4558-a8aa-3cbd1e48ee87": {
        [Language.English]: "(Executive VP)",
        [Language.Hindi]: "(एग्जीक्यूटिव वी पी)",
    },
    "fca6fd65-7e15-40dc-a89a-52895912401f": {
        [Language.English]:
            "Extremely committed and iron-willed, Mr. Alankar Mittal believes leadership is not about a title or a designation. It is about impact, influence, and inspiration. His massive experience of over 20 years continues to be a driving force for many.",
        [Language.Hindi]:
            "अत्यधिक प्रतिबद्ध और मज़बूत इच्छाशक्ति वाले श्री अलंकार मित्तल का मानना ​​है कि नेतृत्व किसी उपाधि या पदनाम के बारे में नहीं है, यह प्रभाव और प्रेरणा के बारे में है। 20 से अधिक वर्षों का उनका व्यापक अनुभव कई लोगों के लिए प्रेरक शक्ति बना हुआ है।",
    },
    "389859cd-81c3-4b9a-95ad-b38dde856511": {
        [Language.English]: `Our <span class="lg-text-highlighted">Values</span>`,
        [Language.Hindi]: `?????`,
    },
    "0840f752-7ac4-4277-8e49-5cf832119941": {
        [Language.English]: `AIM & ACT`,
        [Language.Hindi]: `?????`,
    },
    "8c3a35da-197a-422d-93e0-331f1a9370e4": {
        [Language.English]: "A",
        [Language.Hindi]: "?????",
    },
    "795f5dfe-542d-4eaa-a26d-90effc18a849": {
        [Language.English]: `<span class="lg-text-primary-500">A</span>im outside your comfort zone`,
        [Language.Hindi]: `?????`,
    },
    "b2620aa3-0677-4330-9b99-ef2c0d7170cd": {
        [Language.English]: "I",
        [Language.Hindi]: "?????",
    },
    "59a5ec6f-6eba-4395-9047-bec0c8bec32e": {
        [Language.English]: `<span class="lg-text-primary-500">I</span>nspire and energize your team`,
        [Language.Hindi]: `?????`,
    },
    "dac92472-0230-4fe5-a152-bb6aab17c8e0": {
        [Language.English]: "M",
        [Language.Hindi]: "?????",
    },
    "bffefb3c-8634-4f2b-bc52-e7c4d487da23": {
        [Language.English]: `<span class="lg-text-primary-500">M</span>easure, track and review your results.`,
        [Language.Hindi]: `?????`,
    },
    "d83054c4-751b-4bc1-a061-fd43e39c177c": {
        [Language.English]: "A",
        [Language.Hindi]: "?????",
    },
    "8e99838f-3d77-4c89-955e-9411d2e447eb": {
        [Language.English]: `<span class="lg-text-primary-500">A</span>nalyze customer needs and being their champion.`,
        [Language.Hindi]: `?????`,
    },
    "2bbf5d96-c268-4c3a-ad76-0bc5d3dc5bc5": {
        [Language.English]: "C",
        [Language.Hindi]: "?????",
    },
    "6bf5ab86-1ff2-42d6-b20e-b3641dc69d28": {
        [Language.English]: `<span class="lg-text-primary-500">C</span>ommunicate honestly and listen carefully.`,
        [Language.Hindi]: `?????`,
    },
    "d5435550-b3aa-493f-9513-56bc9e701701": {
        [Language.English]: "T",
        [Language.Hindi]: "?????",
    },
    "d54dcad5-4ae4-4300-ab3a-e44d26e2a82a": {
        [Language.English]: `<span class="lg-text-primary-500">T</span>rust and create winning Teams`,
        [Language.Hindi]: `?????`,
    },
    "310ad3b5-2e4a-409b-9622-c1389c366dbd": {
        [Language.English]: `Empowered By <span class="lg-text-highlighted">SAR</span>`,
        [Language.Hindi]: `?????`,
    },
    "b005d8fa-48dc-4f1a-acee-4afdeec1a1d2": {
        [Language.English]: `Our Guidance & Motivation`,
        [Language.Hindi]: `?????`,
    },
    "4a0ff6e2-3456-4e80-a100-dd0437e1e1a5": {
        [Language.English]: `Established in 1988 by visionaries Mr. Rakesh Malhotra and Mr. Navneet Kapoor, the SAR Group has been at the forefront of creating a safer, better future through innovative and
        eco-friendly brands. These brands include Livpure, Livguard, Lectrix, Ncubate, and HEKA. Over the decades, the group has carved a strong niche for itself, leading the market in areas
        such as Water Purification, Batteries, Inverters, Electric Vehicles, and Venture Capital.`,
        [Language.Hindi]: `?????`,
    },
    "1dac654a-dcb3-48bf-9b14-2e08470548d9": {
        [Language.English]: `Our Sister Companies`,
        [Language.Hindi]: `?????`,
    },
    // International page - Lebanon
    "c7a9f807-dc1c-484e-990a-710af6961b66": {
        [Language.English]: `Inverters`,
        [Language.Hindi]: `محولات`,
    },
    "c9aeea78-b3fc-4174-9dcb-67cce19773cf": {
        [Language.English]: `Batteries`,
        [Language.Hindi]: `?????`,
    },
    "fe7e9e0d-8d73-4d4d-9d59-1beda4550084": {
        [Language.English]: `Solar`,
        [Language.Hindi]: `?????`,
    },
    "e3803682-49d9-4fb0-b444-a8f7de1d15a2": {
        [Language.English]: `Empowering Advanced<br/>Energy Solutions`,
        [Language.Hindi]: "تمكين حلول<br/>الطاقة المتقدمة",
    },
    "39eabaec-19d2-45df-9abd-d45e783cfdcc": {
        [Language.English]: `Contact Livguard Expert Today`,
        [Language.Hindi]: "تواصل مع خبراء ليفغارد",
    },
    "ca34d256-88ce-4a33-a03b-d416c7f3f2d3": {
        [Language.English]: `Who We Are`,
        [Language.Hindi]: `من نحن`,
    },
    "610220d1-def4-4ce0-94bc-00344568570e": {
        [Language.English]: `Driven by innovation and an unwavering commitment to sustainability, Livguard continues to redefine the landscape of energy storage solutions. Offering an array of quality products including automotive batteries, inverters, and residential solar solutions, we're not just powering homes and businesses, but also supporting the world's shift to a cleaner future. Pioneering in our approach, we stand dedicated to deliver limitless energy, as we stride towards shaping a world where energy is accessible, efficient, and sustainable.`,
        [Language.Hindi]: `مدفوعة بالابتكار والالتزام الثابت بالاستدامة ، تواصل ليفغارد إعادة تعريف مشهد حلول تخزين الطاقة. نحن نقدم مجموعة متنوعة من المنتجات عالية الجودة بما في ذلك بطاريات السيارات والمحولات وحلول الطاقة الشمسية المنزلية. لا نقوم فقط بتزويد المنازل والشركات بالطاقة ، بل ندعم أيضًا انتقال العالم نحو مستقبل أنظف. نكرس أنفسنا لنهجنا المبتكر ، فنحن ملتزمون بتوفير طاقة لا حدود لها ، ونسعى جاهدين نحو صياغة عالم تكون فيه الطاقة متاحة بسهولة وفعالة ومستدامة.`,
    },
    "e567b471-cc33-47a0-94fb-f1eda4724960": {
        [Language.English]: `Why Livguard`,
        [Language.Hindi]: `لماذا ليفغارد`,
    },
    "7bebe0ba-863e-4074-96c6-65e11c05099c": {
        [Language.English]: `For an unparalleled experience`,
        [Language.Hindi]: `تجربة لا مثيل لها`,
    },
    // "f5e9cdf7-6cf3-4c63-85e3-c0bd296204bf": {
    //     [Language.English]: `As a part of the reputable SAR Group with a rich legacy of 35 years, Livguard has been at the forefront of providing sophisticated energy solutions with its global presence in the international market...`,
    // },
    "9fe1351b-a1a6-4ae5-be0a-9426c5ed9b12": {
        [Language.English]: `As a part of the reputable SAR Group with a rich legacy of 35 years, Livguard has been at the forefront of providing sophisticated energy solutions with its global presence in the international market. With our cutting-edge technology in energy storage solutions like inverter, inverter tubular batteries, solar solutions, automotive solutions, e-rickshaw batteries, and more; we have garnered the trust of millions of customers throughout the globe. Supported by state-of-the-art, advanced plants and a skilled research team, we continue to build our aim of making the world a better and brighter place.`,
        [Language.Hindi]: `باعتبارنا جزءاً من مجموعة إس إي آر SAR المميزة والتي تتمتع بإرث ثري يمتد إلى 35 عاماً، كانت ليفغارد في طليعة توفير حلول الطاقة المتطورة من خلال تواجدها العالمي في السوق الدولية. ومن خلال تقنيتنا المتطورة في حلول تخزين الطاقة مثل رافعات الجهد، والبطاريات، وحلول الطاقة الشمسية، وبطاريات السيارات، وبطاريات العربات الإلكترونية، والمزيد؛ فقد تمكنا من كسب  ثقة ملايين العملاء في جميع أنحاء العالم. من خلال دعم أحدث المصانع المتقدمة وفريق من الباحثين المهرة، ونحن نواصل بناء هدفنا المتمثل في جعل العالم مكاناً أفضل وأكثر إشراقاً.`,
    },
    "a0700edd-f810-4d32-a628-b7c67972c5db": {
        [Language.English]: `Get In Touch With Us`,
        [Language.Hindi]: `تواصل معنا`,
    },
    "38c490a1-bee1-4081-a32f-2837ebbfecab": {
        [Language.English]: `Our customer support is available Monday to Friday: 8am-6:00pm. Average answer time: 24h`,
        [Language.Hindi]: `دعم عملائنا متاح من الاثنين إلى الجمعة: من الساعة ٨ صباحاً حتى الساعة ٦ مساءً. الوقت المتوقع للاستجابة خلال: ٢٤ ساعة`,
    },
    "e9af9941-5944-4105-a9dd-9de72308536a": {
        [Language.English]: `Leading Energy Solutions To Energize The World`,
        [Language.Hindi]: `لتنشيط العالم حلول الطاقة الرائدة`,
    },
    "d2f9f210-6beb-4cf9-87b2-5cd8c5d5d66d": {
        [Language.English]: `35+`,
        [Language.Hindi]: `35+`,
    },
    "61565ab8-f715-495d-9029-09eb1426a986": {
        [Language.English]: `Years of legacy`,
        [Language.Hindi]: `سنة من الخبرة`,
    },
    "0c8bad55-25e9-479e-8714-21a3feb0abac": {
        [Language.English]: `35+`,
        [Language.Hindi]: `35+`,
    },
    "15b52a40-b4e0-4044-a74b-998f658de179": {
        [Language.English]: `Countries and Counting`,
        [Language.Hindi]: `تواجد في أكثر من دولة`,
    },
    "f27f64b7-f12d-4a10-9ad6-cf0ed54bcc9a": {
        [Language.English]: `200 Mn+`,
        [Language.Hindi]: `200M+`,
    },
    "c4f0437e-3d91-4f49-81f2-6ecdab6c94d3": {
        [Language.English]: `Channel Partners`,
        [Language.Hindi]: `أكثر من مليون شريك`,
    },
    "08c13aeb-9558-4fe6-a6d2-9cc12c7f62bb": {
        [Language.English]: `Explore Our Categories`,
        [Language.Hindi]: `تعرف على فئاتنا`,
    },
    "c9264ed3-d08a-4c9a-9de2-604105e8fb83": {
        [Language.English]: `Featured Products`,
        [Language.Hindi]: `المنتجات المميزة`,
    },
    "5a2cf17f-40da-4f67-8fe0-8d08d7401f1c": {
        [Language.English]: `All Featured Products`,
        [Language.Hindi]: `?????`,
    },
    "89e965e6-e1cd-4494-acca-539e38484973": {
        [Language.English]: `Batteries`,
        [Language.Hindi]: `البطاريات`,
    },
    "6a54a900-6176-454c-9ef6-d9025fee97c9": {
        [Language.English]: `Inverter Batteries`,
        [Language.Hindi]: `بطاريات للمحولات`,
    },
    "db1db71c-a35e-45d6-9a7d-8035c009f5ec": {
        [Language.English]: `Solar`,
        [Language.Hindi]: `شمسي`,
    },
    "c64a5e9d-ba14-41ff-9925-bda948a97c97": {
        [Language.English]: `Solar Batteries`,
        [Language.Hindi]: `بطاريات الطاقة الشمسية`,
    },
    "50420609-5320-4ac3-8157-0f8397a29900": {
        [Language.English]: `Download Catalogue`,
        [Language.Hindi]: `تنزيل دليل المستخدم`,
    },
    "7304b064-f70b-4ff8-8fd5-4c9dcf994143": {
        [Language.English]: `Download Catalogue for Batteries`,
        [Language.Hindi]: `تنزيل كتالوج البطاريات`,
    },
    "51d64204-748f-4791-86c1-be0258c896ef": {
        [Language.English]: `Download Catalogue for Solar`,
        [Language.Hindi]: `تحميل كتالوج للطاقة الشمسية`,
    },
    "b6fd32e9-4eaa-4f00-9b37-99c4c6959e22": {
        [Language.English]: "Show Less",
        [Language.Hindi]: `تظهر أقل`,
    },
    "04dea09c-912e-4573-9a7f-7f13ebd0d8f2": {
        [Language.English]: `View All Products`,
        [Language.Hindi]: `عرض جميع المنتجات`,
    },
    "edf58613-1a70-43ea-abaa-5bc822f90ced": {
        [Language.English]: "City",
        [Language.Hindi]: `المدينة`,
    },
    "9ff2ffc9-633e-482a-b720-c015f9c4aea4": {
        [Language.English]: "Please enter city",
        [Language.Hindi]: `أدخل المدينة`,
    },
    "0819dd0a-c836-4176-a121-888513e3bc8a": {
        [Language.English]: "Zip Code",
        [Language.Hindi]: `الرمز البريدي`,
    },
    "4c2ec5ee-e69d-477a-a882-cf4e3254a6e0": {
        [Language.English]: "Please enter zip code",
        [Language.Hindi]: `أدخل الرمز البريدي`,
    },
    "bf76b096-bc3b-4739-827f-71fa327931d6": {
        [Language.English]: "Customer Care: ",
        [Language.Hindi]: `خدمة العملاء`,
    },
    "e4352ec6-972a-46ff-85e6-a00de81e8d6d": {
        [Language.English]: "Featured Products",
        [Language.Hindi]: `المنتجات المميزة`,
    },
    "330a7f15-0687-4c44-bd72-a6e065e68a76": {
        [Language.English]: "Batteries",
        [Language.Hindi]: `البطاريات`,
    },
    "972bdd2f-5007-4e40-be0f-c7ab8e22caf5": {
        [Language.English]: "Solar",
        [Language.Hindi]: `شمسي`,
    },
    "58ba11d4-9639-4ae9-b701-b99e4122c7a6": {
        [Language.English]: "Get in touch with us",
        [Language.Hindi]: `تواصل معنا`,
    },
    "50cc12a0-8bca-46cd-ae1e-37aa23b7cc5c": {
        [Language.English]: `Download Info`,
        [Language.Hindi]: `?????`,
    },
    "4dbd6d59-b14a-43e7-968a-04b44513e509": {
        [Language.English]: `Talk to us on a quick call`,
        [Language.Hindi]: `تواصل معنا عبر مكالمة سريعة`,
    },
    "310ebdda-7d6d-4ff3-bdab-d8be5722b5f3": {
        [Language.English]: "Call Us",
        [Language.Hindi]: "اتصل بنا",
    },
    "e120af86-fd42-46cf-9c34-9862535fc3e4": {
        [Language.English]: "Drop us an Email with your concern",
        [Language.Hindi]: "للاستفسارات عبر البريد الالكتروني",
    },
    "4d277726-1e3a-48af-9dc8-55d2cae52861": {
        [Language.English]: "Email Us",
        [Language.Hindi]: "تواصل معنا عبر البريد الالكتروني",
    },
    "abc9495a-14d2-4c15-91ea-603c413935c8": {
        [Language.English]: "Service",
        [Language.Hindi]: "الخدمة",
    },
    "ca8542ad-35b6-46bc-bb66-6f133efda660": {
        [Language.English]: `Name`,
        [Language.Hindi]: `الاسم`,
    },
    "d2147fbf-37be-4867-b05a-5d955232d4ae": {
        [Language.English]: `Enter Your Name`,
        [Language.Hindi]: `الرجاء إدخال الاسم`,
    },
    "a7dca451-3b2d-4c5a-a3f0-60d50765e7ae": {
        [Language.English]: `Phone Number`,
        [Language.Hindi]: `رقم الهاتف`,
    },
    "4cc79e16-057f-4d9a-a485-5ede1ac4bec6": {
        [Language.English]: `Enter Your Contact Number`,
        [Language.Hindi]: `الرجاء إدخال رقم الهاتف المحمول`,
    },
    "03692181-3b16-4c29-a125-37832d186f8b": {
        [Language.English]: `Email`,
        [Language.Hindi]: `البريد الإلكتروني`,
    },

    "ab22c1ba-35c8-4435-8d2a-1d978582abc8": {
        [Language.English]: `Enter Your E-mail `,
        [Language.Hindi]: `الرجاء إدخال البريد الإلكتروني`,
    },
    "7fcce52e-a757-41ee-92e7-d6e54fc3d8a9": {
        [Language.English]: `Required Battery Quantity`,
        [Language.Hindi]: `?????`,
    },
    "a6eb5ef2-e65b-4d52-ba90-e07f86b7390e": {
        [Language.English]: `Select Quantity`,
        [Language.Hindi]: `?????`,
    },
    "bb6ae191-31a7-4cdc-8654-f1f4c3c9f4f5": {
        [Language.English]: `I accept the terms of use & Privacy policy`,
        [Language.Hindi]: `أوافق على شروط الاستخدام وسياسة الخصوصية`,
    },
    "779190ac-85b3-4bb2-b02a-bd3932455bf1": {
        [Language.English]: `Submit`,
        [Language.Hindi]: `إرسال`,
    },
    "e64854e3-77ba-4364-96f9-3731e77a888d": {
        [Language.English]: `Enter Your Email To Subscribe`,
        [Language.Hindi]: `للاشتراك: أدخل بريدك الإلكتروني`,
    },
    "6704bb3c-9278-4dc5-b945-d2fa6d625b60": {
        [Language.English]: `Be the first to find out about new stories & latest offers!`,
        [Language.Hindi]: `كن أول من يكتشف القصص الجديدة وأحدث العروض!`,
    },
    "d95cf021-4361-4855-b77f-fdaf49848385": {
        [Language.English]: "Service",
        [Language.Hindi]: "الخدمة",
    },
    "6c5ae599-d51b-4089-92f7-ccfad1cd6f92": {
        [Language.English]: `Thank You!`,
        [Language.Hindi]: `شكراً لك`,
    },
    "c5e3ae47-a9e3-49b1-a414-2bd6d2d5737c": {
        [Language.English]: `We have received your details, you'll receive a call from our team soon.`,
        [Language.Hindi]: `شكراً لمشاركتنا تفاصيلك، ستتلقى اتصالاً من فريقنا قريباً.`,
    },
    "5389e85c-776b-4979-86df-1b323b6ca815": {
        [Language.English]: `Till then, show some love to our social handles!`,
        [Language.Hindi]: `???`,
    },

    internationalProductsIt200exttCapacity: {
        [Language.English]: `200AH @ C20`,
        [Language.Hindi]: `200AH @ C20`,
    },
    internationalProductsIt200exttWarranty: {
        [Language.English]: `24 Months Warranty`,
        [Language.Hindi]: `24 كفالة لعدة أشهر`,
    },
    internationalProductsIt230exttCapacity: {
        [Language.English]: `230AH @ C20`,
        [Language.Hindi]: `230AH @ C20`,
    },
    internationalProductsIt230exttWarranty: {
        [Language.English]: `24 Months Warranty`,
        [Language.Hindi]: `24 كفالة لعدة أشهر`,
    },
    internationalProductsIt260exttCapacity: {
        [Language.English]: `260AH @ C20`,
        [Language.Hindi]: `260AH @ C20`,
    },
    internationalProductsIt260exttWarranty: {
        [Language.English]: `24 Months Warranty`,
        [Language.Hindi]: `24 كفالة لعدة أشهر`,
    },
    internationalProductsIt180exttCapacity: {
        [Language.English]: `180AH @ C20`,
        [Language.Hindi]: `180AH @ C20`,
    },
    internationalProductsIt180exttWarranty: {
        [Language.English]: `24 Months Warranty`,
        [Language.Hindi]: `24 كفالة لعدة أشهر`,
    },
    internationalProductsIt160exttCapacity: {
        [Language.English]: `160AH @ C20`,
        [Language.Hindi]: `160AH @ C20`,
    },
    internationalProductsIt160exttWarranty: {
        [Language.English]: `24 Months Warranty`,
        [Language.Hindi]: `24 كفالة لعدة أشهر`,
    },
    internationalProductsIt150exttCapacity: {
        [Language.English]: `150AH @ C20`,
        [Language.Hindi]: `150AH @ C20`,
    },
    internationalProductsIt150exttWarranty: {
        [Language.English]: `24 Months Warranty`,
        [Language.Hindi]: `24 كفالة لعدة أشهر`,
    },
    internationalProductsIt110exsttCapacity: {
        [Language.English]: `110AH @ C20`,
        [Language.Hindi]: `110AH @ C20`,
    },
    internationalProductsIt110exsttWarranty: {
        [Language.English]: `24 Months Warranty`,
        [Language.Hindi]: `24 كفالة لعدة أشهر`,
    },
    internationalProductsIt100exstCapacity: {
        [Language.English]: `100AH @ C20`,
        [Language.Hindi]: `100AH @ C20`,
    },
    internationalProductsIt100exstWarranty: {
        [Language.English]: `24 Months Warranty`,
        [Language.Hindi]: `24 كفالة لعدة أشهر`,
    },
    internationalProductsLs18060pttexCapacity: {
        [Language.English]: `180AH @ C10`,
        [Language.Hindi]: `180AH @ C10`,
    },
    internationalProductsLs18060pttexWarranty: {
        [Language.English]: `24 Months Warranty`,
        [Language.Hindi]: `24 كفالة لعدة أشهر`,
    },
    internationalProductsLs20060ttexCapacity: {
        [Language.English]: `200AH @ C10`,
        [Language.Hindi]: `200AH @ C10`,
    },
    internationalProductsLs20060ttexWarranty: {
        [Language.English]: `24 Months Warranty`,
        [Language.Hindi]: `24 كفالة لعدة أشهر`,
    },
    internationalProductsLs24060ttexCapacity: {
        [Language.English]: `240AH @ C10`,
        [Language.Hindi]: `240AH @ C10`,
    },
    internationalProductsLs24060ttexWarranty: {
        [Language.English]: `24 Months Warranty`,
        [Language.Hindi]: `24 كفالة لعدة أشهر`,
    },

    "cc92d2f4-4884-4d08-bd15-9ed54eaf1e4d": {
        [Language.English]: `Contact Us`,
        [Language.Hindi]: `?????`,
    },
    "f396f200-9afb-4408-85c2-fe7ed011e288": {
        [Language.English]: `Global Reach`,
        [Language.Hindi]: `?????`,
    },
    "3646d35c-629c-47af-902a-5ccc2941a5e5": {
        [Language.English]: `Privacy Policy`,
        [Language.Hindi]: `?????`,
    },
    "586b03b6-cd5a-4e80-88ac-ae3cdabc170c": {
        [Language.English]: `About Us`,
        [Language.Hindi]: `?????`,
    },
    "41d5c04e-ff29-4bfc-8082-b2245a96dd7a": {
        [Language.English]: `E-Waste Management`,
        [Language.Hindi]: `?????`,
    },
    "70e9b582-ab5a-492a-a426-5552a796bc6d": {
        [Language.English]: `CSR`,
        [Language.Hindi]: `?????`,
    },
    "35fe95ed-b847-4ac1-a6f6-5878d1a183ea": {
        [Language.English]: `Investor`,
        [Language.Hindi]: `?????`,
    },
    "4293e069-961d-471a-b759-b506e1fa1d6b": {
        [Language.English]: `Governance`,
        [Language.Hindi]: `?????`,
    },
    "13a52500-50ab-4649-9811-a670bc78df8a": {
        [Language.English]: `E-Waste Management`,
        [Language.Hindi]: `?????`,
    },
    "501d17d3-de19-4710-9597-67c48bfdd52c": {
        [Language.English]: `© Livguard `,
        [Language.Hindi]: `?????`,
    },
    "ceb7cbb7-9f86-48fa-9781-e5b5c17f2c69": {
        [Language.English]: `. All Rights Reserved`,
        [Language.Hindi]: `?????`,
    },
    //About Us Page Vernac Strings End

    // Battery finder
    "454f7c18-bc20-49a9-a1f8-273420f2679b": {
        [Language.English]: `Choose Your Vehicle`,
        [Language.Hindi]: `?????`,
    },
    "4ca84917-22f8-40be-acfe-4b3fca449539": {
        [Language.English]: `2 Wheeler`,
        [Language.Hindi]: `?????`,
    },
    "418de152-95ee-488d-b491-a86293219636": {
        [Language.English]: `3 Wheeler`,
        [Language.Hindi]: `?????`,
    },
    "9f009968-050d-4d5b-84bd-6396fb16b925": {
        [Language.English]: `Bus and Truck`,
        [Language.Hindi]: `?????`,
    },
    "669014e9-bd1e-4e30-ab8a-64c3900b7d51": {
        [Language.English]: `Tractor`,
        [Language.Hindi]: `?????`,
    },
    "ea72fad1-6f0f-48bd-ba19-65be3fae44f1": {
        [Language.English]: `Car and SUV`,
        [Language.Hindi]: `?????`,
    },
    "dc5a454d-ec59-48fd-a3e9-f834038d7cdb": {
        [Language.English]: `E-Rikshaw`,
        [Language.Hindi]: `?????`,
    },
    "18953b2c-d9bf-4992-bcbd-903f9c78c0e7": {
        [Language.English]: `Select Brand`,
        [Language.Hindi]: `?????`,
    },
    "4990cdb1-9ee8-44d0-876f-3a668f2e7f9b": {
        [Language.English]: `Select Model`,
        [Language.Hindi]: `?????`,
    },
    "e2131e40-08cc-401d-958c-46baa3fa8642": {
        [Language.English]: `Select Fuel Type`,
        [Language.Hindi]: `?????`,
    },
    "112996e0-2850-4283-af77-7514a386d172": {
        [Language.English]: `Find Ideal Battery`,
        [Language.Hindi]: `?????`,
    },
    "d11295cc-c71b-40d3-b0c3-6dfb96473a3a": {
        [Language.English]: `Know In Detail About`,
        [Language.Hindi]: `?????`,
    },
    "7738908b-a43c-4ef9-8bb7-1f0d44e60899": {
        [Language.English]: `Livguard delivers robust, durable batteries designed to keep two wheelers running in even the harshest weather. These batteries are designed for low maintenance, high cranking efficiency, safety, and long life. Tailored to enhance both the performance and overall productivity of the two wheeler, Livguard proudly supports India's agricultural sector with reliable, high-performing two wheeler batteries.`,
        [Language.Hindi]: `?????`,
    },
    "f6d0539b-16df-443a-af9c-2ae6f79765a4": {
        [Language.English]: `Livguard delivers robust, durable batteries designed to keep three wheelers running in even the harshest weather. These batteries are designed for low maintenance, high cranking efficiency, safety, and long life. Tailored to enhance both the performance and overall productivity of the three wheeler, Livguard proudly supports India's agricultural sector with reliable, high-performing three wheeler batteries.`,
        [Language.Hindi]: `?????`,
    },
    "c635c871-90ac-480c-83d3-8032728f3059": {
        [Language.English]: `Livguard delivers robust, durable batteries designed to keep buses and trucks running in even the harshest weather. These batteries are designed for low maintenance, high cranking efficiency, safety, and long life. Tailored to enhance both the performance and overall productivity of the bus and truck, Livguard proudly supports India's agricultural sector with reliable, high-performing bus and truck batteries.`,
        [Language.Hindi]: `?????`,
    },
    "171cb335-6ec4-44d1-a289-b0b231024c0b": {
        [Language.English]: `Livguard delivers robust, durable batteries designed to keep tractors running in even the harshest weather. These batteries are designed for low maintenance, high cranking efficiency, safety, and long life. Tailored to enhance both the performance and overall productivity of the tractor, Livguard proudly supports India's agricultural sector with reliable, high-performing tractor batteries.`,
        [Language.Hindi]: `?????`,
    },
    "6dd9224e-2bae-425d-8687-767059c99732": {
        [Language.English]: `Livguard delivers robust, durable batteries designed to keep cars and SUVs running in even the harshest weather. These batteries are designed for low maintenance, high cranking efficiency, safety, and long life. Tailored to enhance both the performance and overall productivity of the car and SUV, Livguard proudly supports India's agricultural sector with reliable, high-performing car and SUV batteries.`,
        [Language.Hindi]: `?????`,
    },
    "be93e4e6-cf77-4b1a-a418-5b22214fbaf6": {
        [Language.English]: `Livguard delivers robust, durable batteries designed to keep E-Rikshaws running in even the harshest weather. These batteries are designed for low maintenance, high cranking efficiency, safety, and long life. Tailored to enhance both the performance and overall productivity of the E-Rikshaw, Livguard proudly supports India's agricultural sector with reliable, high-performing E-Rikshaw batteries.`,
        [Language.Hindi]: `?????`,
    },
    "8b6be5de-9c57-461a-8ec5-106f29eccaca": {
        [Language.English]: `Know More`,
        [Language.Hindi]: `?????`,
    },
    // /Battery finder
    // Video gallery
    "4ee70b17-b4be-4c8a-8c87-b12f9b26373f": {
        [Language.English]: `Video Gallery`,
        [Language.Hindi]: `?????`,
    },
    "c33cf682-8be6-4efe-a683-2f56c8e9b860": {
        [Language.English]: `Our <span class="lg-text-highlighted">Video Gallery</span>`,
        [Language.Hindi]: `?????`,
    },
    // /Video gallery

    //HKVA Vernac Strings Start
    "1333b617-c9a4-4b8c-b6ae-652d2b17c58b": {
        [Language.English]: `HKVA Inverters For`,
        [Language.Hindi]: `?????`,
    },
    "f7ab7eb5-83ec-4ced-b179-c9ad29f8673e": {
        [Language.English]: `High-Load Appliances`,
        [Language.Hindi]: `?????`,
    },
    "6576ec8d-6a69-482e-b4e9-9f11b9b01dfd": {
        [Language.English]: `Inverters made to empower your home with Limitless Energy at all times.`,
        [Language.Hindi]: `?????`,
    },
    "eaa6ffa9-a509-4be1-8f5e-93a008f86aaf": {
        [Language.English]: `Experience <span class="lg-text-highlighted">High Power</span> And`,
        [Language.Hindi]: `?????`,
    },
    "354321fa-4e5e-4cc5-80a4-07a320dfe654": {
        [Language.English]: `Higher Convenience`,
        [Language.Hindi]: `?????`,
    },
    "ceb40b2c-64aa-4279-a44b-88fdfa0f6940": {
        [Language.English]: `New Generation Technology`,
        [Language.Hindi]: `?????`,
    },
    "82a58556-3b79-42da-99fa-fb37bf75fc76": {
        [Language.English]: `Inverters built with MOSFET Based PWM Technology, which brings greater efficiency, dynamic stability, and reduced electricity bills.`,
        [Language.Hindi]: `?????`,
    },
    "bdf346b3-6536-4eb0-bf84-833185c53ec6": {
        [Language.English]: `Intelligent Battery Charging`,
        [Language.Hindi]: `?????`,
    },
    "312aecd5-8481-4cad-867d-70f3cca7a78c": {
        [Language.English]: `Find your ideal power inverter with Auto Sense Intelligent Control (ASIC) that makes your batteries last longer, as compared to ordinary UPS.`,
        [Language.Hindi]: `?????`,
    },
    "9b22fdf1-dec8-48c8-9710-f0d8ac89b7d9": {
        [Language.English]: `Interactive LCD Display`,
        [Language.Hindi]: `?????`,
    },
    "6aa6f045-8ba1-4157-a838-c794bc015eba": {
        [Language.English]: `Experience the convenience of uninterrupted energy with the user-friendly and easy-to-understand LCD display, that reflects all modes of operation and parameters.`,
        [Language.Hindi]: `?????`,
    },
    "bfc88889-a1cb-4fc0-9823-aa2596efdde8": {
        [Language.English]: `Guaranteed Protection`,
        [Language.Hindi]: `?????`,
    },
    "6a0ce82e-1378-4cfd-a26f-83152e0ec09a": {
        [Language.English]: `Bring home inverters packed with safety features including Overload Protection, MCB Protection, Battery Full Charge, Battery Low Voltage, Over Temperature, and Short Circuit Protection. `,
        [Language.Hindi]: `?????`,
    },
    "b3b052f7-ef5b-43d1-b426-279e9c05ca84": {
        [Language.English]: `Choose <span class="lg-text-highlighted">Your Inverter</span>`,
        [Language.Hindi]: `?????`,
    },
    "354448cd-c3be-4427-b3a5-c3f5cf7afaf9": {
        [Language.English]: `Based On Your Needs`,
        [Language.Hindi]: `?????`,
    },
    "0bcd7c25-b650-4085-990b-36795b06c1f5": {
        [Language.English]: `HKVA`,
        [Language.Hindi]: `?????`,
    },
    "7618d425-96b8-4402-9ffb-50f4a69efbf9": {
        [Language.English]: `Home Inverter`,
        [Language.Hindi]: `?????`,
    },
    "1685c892-2604-467b-835b-751154288554": {
        [Language.English]: `Power Capacity`,
        [Language.Hindi]: `?????`,
    },
    "1e7e9b6c-9b4b-43c9-876c-3b1eb84c555f": {
        [Language.English]: `Designed for commercial and industrial applications that require high power capacities.`,
        [Language.Hindi]: `?????`,
    },
    "a5350102-acd3-4024-a3ef-bcf478522fbb": {
        [Language.English]: `Designed for residential use, for powering household appliances, electronics, and providing backup power during outages.`,
        [Language.Hindi]: `?????`,
    },
    "a331300e-7f4f-4937-b652-be74e52427fa": {
        [Language.English]: `Load Handling Capability`,
        [Language.Hindi]: `?????`,
    },
    "86034731-4b04-4172-8ba3-bc4f6ba538a7": {
        [Language.English]: `Suitable for high-power requirement appliances like machinery, industrial equipment, data canters etc`,
        [Language.Hindi]: `?????`,
    },
    "45f25658-b0ea-4f47-aee0-99769c6be404": {
        [Language.English]: `Suitable for handling appliances with Lighter Load capacity.`,
        [Language.Hindi]: `?????`,
    },
    "72d5d1e9-8be5-4207-8b96-24ca298341ec": {
        [Language.English]: `Scalability`,
        [Language.Hindi]: `?????`,
    },
    "3e617d69-c451-401f-aba2-40937134cee3": {
        [Language.English]: `Built to enable multiple unit connection and supports scalability.`,
        [Language.Hindi]: `?????`,
    },
    "d293fd91-73a4-4cb9-94b1-fa261e25f284": {
        [Language.English]: `Built for individual use for individual homes and small-scale applications.`,
        [Language.Hindi]: `?????`,
    },
    "2ae8f286-2ead-4d34-9c10-b28b49c90149": {
        [Language.English]: `Technical Advancements`,
        [Language.Hindi]: `?????`,
    },
    "32461cc4-3f7b-403d-b4f3-b4b413c39c59": {
        [Language.English]: `Equipped with advanced features and technology to cater to specific needs of commercial and industrial settings`,
        [Language.Hindi]: `?????`,
    },
    "f1a96b7a-bb14-4c20-803a-81373f0195fc": {
        [Language.English]: `-`,
        [Language.Hindi]: `?????`,
    },
    "32366348-8f4d-4253-959f-f9b586c26b25": {
        [Language.English]: `<span class="lg-text-highlighted">Powerhouse Inverters</span>`,
        [Language.Hindi]: `?????`,
    },
    "33d1aa29-9949-4a28-92f3-4c27ce30d244": {
        [Language.English]: `for Heavy-Duty Appliances`,
        [Language.Hindi]: `?????`,
    },
    "7854d25c-c385-49b5-b1e5-e1127f1d1e5d": {
        [Language.English]: `Recommended`,
        [Language.Hindi]: `?????`,
    },
    "96915132-3fda-47ff-8bbb-b35a33432e74": {
        [Language.English]: `ih-verter LGS 2500`,
        [Language.Hindi]: `?????`,
    },
    "0a4f9eab-f48f-47a8-bec9-a1c06c452bb9": {
        [Language.English]: `Find the ideal battery that suits your two-wheeler. Use our Buying Guide to get to know in detail about how you can buy your battery and our Product Catalogue for product specifications`,
        [Language.Hindi]: `?????`,
    },
    "be198f94-415e-4384-87d4-3887e8cd8a2c": {
        [Language.English]: `Warranty`,
        [Language.Hindi]: `?????`,
    },
    "c4d0e968-550c-4289-a333-6a4c7cc59a76": {
        [Language.English]: `24 Months`,
        [Language.Hindi]: `?????`,
    },
    "7ee64780-1190-49dc-a305-0f6e9551e8aa": {
        [Language.English]: `Capacity`,
        [Language.Hindi]: `?????`,
    },
    "b3a5db70-edb5-4d97-ac68-34948136ef74": {
        [Language.English]: `2000 VA / 24V`,
        [Language.Hindi]: `?????`,
    },
    "94ba8c21-8088-4d61-a674-4f9d4ec28744": {
        [Language.English]: `Technology`,
        [Language.Hindi]: `?????`,
    },
    "61866568-5831-4f41-9db7-1058f8b67154": {
        [Language.English]: `Longer Life`,
        [Language.Hindi]: `?????`,
    },
    "781a0678-8e4b-4543-bda3-c80a5cf30176": {
        [Language.English]: `Dimensions`,
        [Language.Hindi]: `?????`,
    },
    "3f7043c1-174e-4714-8d63-7b44d67a1f41": {
        [Language.English]: `275 x 320 x 275 mm`,
        [Language.Hindi]: `?????`,
    },
    "dd68b98c-5aa6-4f3f-824e-056ffa6ae4ee": {
        [Language.English]: `Explore Product`,
        [Language.Hindi]: `?????`,
    },
    "857b8564-8171-4ea0-b4eb-940b767fb270": {
        [Language.English]: `Power Up with`,
        [Language.Hindi]: `?????`,
    },
    "6cf663f6-3c72-4bbd-93a6-f9e53a53cc08": {
        [Language.English]: `<span class="lg-text-highlighted">High-Capacity Inverters</span>`,
        [Language.Hindi]: `?????`,
    },
    "f4b66650-853d-4dd7-946f-1cda1f5c724a": {
        [Language.English]: `Best Seller`,
        [Language.Hindi]: `?????`,
    },
    "0d96f3ca-0045-405f-bc18-1fd584bfd934": {
        [Language.English]: `ih-verter LGS 2500`,
        [Language.Hindi]: `?????`,
    },
    "ebcab455-5e5e-4a46-a814-780f81fd1297": {
        [Language.English]: `1500VA Capacity`,
        [Language.Hindi]: `?????`,
    },
    "348082cf-b5a1-43eb-bc24-9797a5b50d02": {
        [Language.English]: `72 Months Warranty`,
        [Language.Hindi]: `?????`,
    },
    "5a00bddd-f110-4ef7-8eae-40524a72dd91": {
        [Language.English]: `Starting from ₹`,
        [Language.Hindi]: `?????`,
    },
    "0febb66a-4aa4-4e78-8a17-14c49f5d6a86": {
        [Language.English]: `/-`,
        [Language.Hindi]: `?????`,
    },
    "b6b6bee5-c2b4-4221-8776-7e55212e5a0e": {
        [Language.English]: `View Product`,
        [Language.Hindi]: `?????`,
    },
    "a5bdaea0-3ac4-4e61-bb56-15921022d881": {
        [Language.English]: `Your Guide to Finding The`,
        [Language.Hindi]: `?????`,
    },
    "cd0ff218-fadc-488a-a3b8-f97beffed82b": {
        [Language.English]: `<span class="lg-text-highlighted">Right Inverter</span>`,
        [Language.Hindi]: `?????`,
    },
    "b137befb-819f-4e24-a9f1-8a8a7fefeb3a": {
        [Language.English]: `Find the suitable pick of inverter that fulfils your requirements with efficiency. Use our Buying Guide to get to know in detail about how you can buy your inverter and our Product Catalogue for product specifications`,
        [Language.Hindi]: `?????`,
    },
    "8d939846-726e-4b7a-a834-a985292cec9b": {
        [Language.English]: `Buying Guide`,
        [Language.Hindi]: `?????`,
    },
    "d44ffe14-87dd-42e8-8550-0b82ac2dad04": {
        [Language.English]: `Download Catalogue`,
        [Language.Hindi]: `?????`,
    },
    "bfcd956a-49a7-4586-b645-b6b1a4e20a83": {
        [Language.English]: `Plan Your Power`,
        [Language.Hindi]: `?????`,
    },
    "4810d194-34b9-4aec-b27b-61905a838517": {
        [Language.English]: `Can I use an inverter for fridge?`,
        [Language.Hindi]: `?????`,
    },
    "adf7b4db-adfb-47fe-8a4e-6290465e6abb": {
        [Language.English]: `Yes you can opt for Livguard Sinewave inverter depending on the power requirement of the Fridge . The easiest way to find the right inverter that fits your needs is to use the Load calculator, called the Power Planner(link to Power Planner).`,
        [Language.Hindi]: `?????`,
    },
    "7fe9f5d4-00a9-41a1-a09e-facb4f63ee0b": {
        [Language.English]: `Can I run an AC on inverter?`,
        [Language.Hindi]: `?????`,
    },
    "3b1d76dd-c2bb-4d9f-b56d-d682a0cd42de": {
        [Language.English]: `Yes, depending on the AC load (tonnage), You can choose the ideal Livguard High Rating Inverter, designed specially to take care of the surge current arising due to switching ON of the AC compressor. Take a look Livguard's range if inverters to empower your home with Limitless enegry.`,
        [Language.Hindi]: `?????`,
    },
    "22698520-ae75-494a-a16b-4afc4ac1992c": {
        [Language.English]: `What happens if you overload an inverter?`,
        [Language.Hindi]: `?????`,
    },
    "7e5ac090-a155-46f8-8461-404c710b925d": {
        [Language.English]: `The most common reason for a power overload is when the inverter reaches its peak power output. The best way to avoid this is by using a high-capacity inverter that produces clean AC power when and where needed. Livguard power inverters are designed for stable power delivery to ensure the safety of your equipment and appliances.`,
        [Language.Hindi]: `?????`,
    },
    "a78c0c49-ffb7-4dce-aa79-308daa5623a4": {
        [Language.English]: `What appliances can be operated on Livguard's high-capacity inverters at home?`,
        [Language.Hindi]: `?????`,
    },
    "31c4c4e8-2c27-4d1f-abce-9bffd83915b2": {
        [Language.English]: `The various appliances that can be operated on Livguard's high-capacity inverters include a fridge, AC, washing machine, microwave, steam iron etc. at home. Livguard power inverters are designed for stable power delivery to ensure the safety of your equipment and appliances.`,
        [Language.Hindi]: `?????`,
    },
    "9f264c8e-4212-43c1-a101-8f680845d25c": {
        [Language.English]: `What are high-capacity inverters?`,
        [Language.Hindi]: `?????`,
    },
    "64882f53-b9a6-4486-89a7-5c673f36a258": {
        [Language.English]: `Livguard's “ih-verter” systems are an ideal option for residential and commercial power back-up. They are a cohesive power backup system that produces clean AC power when and where it's needed. Livguard power inverters are designed for stable power delivery to ensure the safety of your equipment and appliances.`,
        [Language.Hindi]: `?????`,
    },

    //Inverter Trolley Vernac Strings Start
    "c8044356-0123-4e47-a1b9-a453d40c6f41": {
        [Language.English]: `Inverter Trolley`,
        [Language.Hindi]: `?????`,
    },
    "a44c1ac7-94e3-4b5f-92a7-97d56aa17619": {
        [Language.English]: `Livguard, aims at offering “Smart and Innovative energy solutions” to its customers. Our company is determined at delivering quality`,
        [Language.Hindi]: `?????`,
    },
    "71072fc8-967d-4e21-9922-2bab4b7513b5": {
        [Language.English]: `Batteries That Are`,
        [Language.Hindi]: `?????`,
    },
    "1d257cca-7858-42b7-ba71-cb411c5b6bf3": {
        [Language.English]: `<span class="lg-text-highlighted">Meant To Last</span>`,
        [Language.Hindi]: `?????`,
    },
    "656202ba-4d43-417e-ab8a-4d411da87ede": {
        [Language.English]: `Futuristic Design`,
        [Language.Hindi]: `?????`,
    },
    "b1860dae-087d-4b2e-b55e-72b0d91de418": {
        [Language.English]: `Livguard Inverter Batteries are manufactured with PPC Plastic to avoid leakage and keeping in mind the customer’s needs to deliver the safest and aesthetic designs for you`,
        [Language.Hindi]: `?????`,
    },
    "9b082fd9-8254-4ea0-a76f-f831d2bd3248": {
        [Language.English]: `<span class="lg-text-highlighted">Our Suggestions</span>`,
        [Language.Hindi]: `?????`,
    },
    "3bee363a-d749-49b8-8f1e-fa1cc640c526": {
        [Language.English]: `Based On Your Choice`,
        [Language.Hindi]: `?????`,
    },
    "6abe737b-e0b3-4b27-8d3e-45e0555ca4fd": {
        [Language.English]: `Trolley`,
        [Language.Hindi]: `?????`,
    },
    "a64d10d2-45b4-4263-8903-3b5ba891181f": {
        [Language.English]: `Enjoy a constant supply of electric power for long hours without any trouble. Built with the Industry’s first and patented 3D Grid technology to ensure long-lasting life with enhanced performance.`,
        [Language.Hindi]: `?????`,
    },
    "ee044c57-6d8d-43ec-9a6f-8b8457c56963": {
        [Language.English]: `Inverter Specification`,
        [Language.Hindi]: `?????`,
    },
    "49106fd2-d12b-454d-a3ea-24a793de49b6": {
        [Language.English]: `Warranty`,
        [Language.Hindi]: `?????`,
    },
    "965c45f7-f888-4d22-bd3a-cad183c42e7e": {
        [Language.English]: `24 Months`,
        [Language.Hindi]: `?????`,
    },
    "71bd364d-bc35-416e-92ee-212a82b4d833": {
        [Language.English]: `Capacity`,
        [Language.Hindi]: `?????`,
    },
    "31f21f05-2ce7-46d8-9971-1102f33f1569": {
        [Language.English]: `1500 VA`,
        [Language.Hindi]: `?????`,
    },
    "5999ee40-e846-4dab-a5f5-6f0b31575546": {
        [Language.English]: `3D Grid`,
        [Language.Hindi]: `?????`,
    },
    "0432ce29-748f-4de1-89b5-f80453c3c429": {
        [Language.English]: `Longer Life`,
        [Language.Hindi]: `?????`,
    },
    "75fd8c06-fd2d-422c-8cd2-c972065f72e2": {
        [Language.English]: `Dimensions`,
        [Language.Hindi]: `?????`,
    },
    "0de3fa1c-d195-45dd-9670-155370379e7a": {
        [Language.English]: `275(L) X 277(W) X 153(H) mm`,
        [Language.Hindi]: `?????`,
    },
    "b537cb7c-46f5-4d95-b329-8e2745900f0a": {
        [Language.English]: `Explore Product`,
        [Language.Hindi]: `?????`,
    },
    "e596f970-68cb-4c78-a74f-885ff89a0f84": {
        [Language.English]: `Choose The`,
        [Language.Hindi]: `?????`,
    },
    "da847308-2fc2-449f-9346-7372e8f72d97": {
        [Language.English]: `<span class="lg-text-highlighted">Right Battery</span> For You`,
        [Language.Hindi]: `?????`,
    },
    "6e9b8409-2e42-4c63-9d68-9be787e999ab": {
        [Language.English]: `Find the suitable pick of inverter that fulfils your requirements with efficiency. Use our Buying Guide to get to know in detail about how you can buy your inverter and our Product Catalogue for product specifications`,
        [Language.Hindi]: `?????`,
    },
    "1f38d219-7fb1-4b45-84d8-d28ea3bd3a71": {
        [Language.English]: `Buying Guide`,
        [Language.Hindi]: `?????`,
    },
    "af4fabfc-67ee-488b-be62-5a17bac10daf": {
        [Language.English]: `Download Catalogue`,
        [Language.Hindi]: `?????`,
    },
    "fcb9e80f-e552-41af-81fc-6ade228105ab": {
        [Language.English]: `Plan Your Power`,
        [Language.Hindi]: `?????`,
    },
    "a1d8ea9a-0849-49aa-826e-87bab380866b": {
        [Language.English]: `FAQ Q1`,
        [Language.Hindi]: `?????`,
    },
    "47d12216-c8fc-4aa9-9bdb-29d8dcd0ab69": {
        [Language.English]: `FAQ A1`,
        [Language.Hindi]: `?????`,
    },
    "e2f88f7e-1815-46e8-9aa1-01cefaca9f07": {
        [Language.English]: `FAQ Q2`,
        [Language.Hindi]: `?????`,
    },
    "59ccc2c2-5029-4e43-889b-479f159893f3": {
        [Language.English]: `FAQ A2`,
        [Language.Hindi]: `?????`,
    },
    "20500319-4842-4a4f-91ce-d2adbd17b524": {
        [Language.English]: `FAQ Q3`,
        [Language.Hindi]: `?????`,
    },
    "d14ed9a8-72cb-4eea-847b-fc7ae260924b": {
        [Language.English]: `FAQ A3`,
        [Language.Hindi]: `?????`,
    },
    "f9132ecf-4676-4cae-a86b-f754884b1caf": {
        [Language.English]: `FAQ Q4`,
        [Language.Hindi]: `?????`,
    },
    "677ad117-00ce-425f-92f5-a2e879a907a8": {
        [Language.English]: `FAQ A4`,
        [Language.Hindi]: `?????`,
    },
    "036a4ed1-77f5-4a67-bc17-c3a2d364e21d": {
        [Language.English]: `FAQ Q5`,
        [Language.Hindi]: `?????`,
    },
    "c14fc130-2857-4951-a934-54186d7824b8": {
        [Language.English]: `FAQ A5`,
        [Language.Hindi]: `?????`,
    },
    "10a749b0-d7b2-4c29-add5-a4afb989249d": {
        [Language.English]: `View More`,
        [Language.Hindi]: `?????`,
    },
    "05dd627c-2d81-4390-a8ec-4543cb8b8cd7": {
        [Language.English]: `Show Less`,
        [Language.Hindi]: `?????`,
    },

    //E Rickshaw Charger vernac start
    "cf6da0b7-e5ad-4b79-b0a5-65a72b31b132": {
        [Language.English]: `Efficiency in Every Move`,
        [Language.Hindi]: `?????`,
    },
    "1e3021a0-0a0d-479a-84eb-bcc17a9747a0": {
        [Language.English]: `Livguard E-Rickshaw Batteries`,
        [Language.Hindi]: `?????`,
    },
    "e012e585-3558-420d-8614-393e2ecfd8bc": {
        [Language.English]: `Make every journey power packed with the best E-Rickshaw battery for your ride`,
        [Language.Hindi]: `?????`,
    },
    "6148b8eb-4751-480f-96ef-b8ef9a1754a0": {
        [Language.English]: `<span class="lg-text-highlighted">Superior Features</span>`,
        [Language.Hindi]: `?????`,
    },
    "5323b1af-564e-435c-8e06-2d3041494551": {
        [Language.English]: `For A Supreme Performance`,
        [Language.Hindi]: `?????`,
    },
    "2fb36c26-a28f-4b1a-878a-fdb7d122caf4": {
        [Language.English]: `<span class="lg-text-highlighted">Our Suggestions</span>`,
        [Language.Hindi]: `?????`,
    },
    "b15faf10-0686-425c-abf7-50c35e7f1658": {
        [Language.English]: `Based On Your Choice`,
        [Language.Hindi]: `?????`,
    },
    "22669d2d-400b-4699-9d1c-2dd7078949b5": {
        [Language.English]: `Recommended`,
        [Language.Hindi]: `?????`,
    },
    "79ecf90e-de5b-47f3-ad78-2ab6c8b38c14": {
        [Language.English]: `E-Rickshaw Charger Black`,
        [Language.Hindi]: `?????`,
    },
    "73741111-9f1f-4c7c-b9c7-678fda1b62c5": {
        [Language.English]: `Lorem ipsum dolor sit amet. Sit accusamus facere et numquam nihil qui dolor impedit ut velit ....`,
        [Language.Hindi]: `?????`,
    },
    "46e8b48e-8f18-4d30-892d-9bdf5b3e76f6": {
        [Language.English]: `Warranty`,
        [Language.Hindi]: `?????`,
    },
    "8b0eae76-d68a-41e3-ae04-ac2663f60e09": {
        [Language.English]: `24 + 24* Months`,
        [Language.Hindi]: `?????`,
    },
    "761454b0-a898-4f44-a557-65fc8d21069f": {
        [Language.English]: `Capacity`,
        [Language.Hindi]: `?????`,
    },
    "32af45e9-f996-4fec-a122-e2e00e6c34c2": {
        [Language.English]: `7 Ah`,
        [Language.Hindi]: `?????`,
    },
    "30ae7d41-ad39-4778-b8e1-3e205fb71af8": {
        [Language.English]: `3D Grid`,
        [Language.Hindi]: `?????`,
    },
    "002950ee-d6b9-4b1d-a619-30c4917302b3": {
        [Language.English]: `Longer Life`,
        [Language.Hindi]: `?????`,
    },
    "77b93075-16aa-4d56-a897-842797e65523": {
        [Language.English]: `Dimensions`,
        [Language.Hindi]: `?????`,
    },
    "90d584ae-5ce3-451c-bf58-6e0b2d713463": {
        [Language.English]: `275(L) X 277(W) X 153(H) mm`,
        [Language.Hindi]: `?????`,
    },
    "e48d4eeb-f921-45f5-b023-680f699816c5": {
        [Language.English]: `Explore Product`,
        [Language.Hindi]: `?????`,
    },
    "bd79396d-6510-44b5-b0cc-222450998828": {
        [Language.English]: `Discover More`,
        [Language.Hindi]: `?????`,
    },
    "a3079b91-9d9c-4adc-9859-158932a6b433": {
        [Language.English]: `<span class="lg-text-highlighted>E-Rickshaw Video Guide</span>"`,
        [Language.Hindi]: `?????`,
    },
    "449e3c56-4dd9-4495-b968-a4ef45533fbb": {
        [Language.English]: `Choose the`,
        [Language.Hindi]: `?????`,
    },
    "e8fb1edc-fdbc-4bc9-b660-012d4cbb10f5": {
        [Language.English]: `<span class="lg-text-highlighted">Right Battery</span> For You`,
        [Language.Hindi]: `?????`,
    },
    "698f4100-216f-4ce8-89be-80b336b942ed": {
        [Language.English]: `Find the suitable pick of inverter that fulfils your requirements with efficiency. Use our Buying Guide to get to know in detail about how you can buy your inverter and our Product Catalogue for product specifications`,
        [Language.Hindi]: `?????`,
    },
    "50f5f8f9-afaf-4793-97e9-201bdaeeb853": {
        [Language.English]: `Buying Guide`,
        [Language.Hindi]: `?????`,
    },
    "214695af-9a93-4d51-909a-c3574f457997": {
        [Language.English]: `Download Catalogue`,
        [Language.Hindi]: `?????`,
    },
    "92797775-c5d0-49a7-93e4-b35314cddc6f": {
        [Language.English]: `Plan Your Power`,
        [Language.Hindi]: `?????`,
    },
    "323526ea-ed1b-4b23-af2e-ecaed76b5b5b": {
        [Language.English]: `FAQ Q1`,
        [Language.Hindi]: `?????`,
    },
    "1e7321f5-ccd6-4785-8e8b-3ea11cfebb41": {
        [Language.English]: `FAQ A1`,
        [Language.Hindi]: `?????`,
    },
    "bc46294e-c29b-4a11-b855-6f79390476de": {
        [Language.English]: `FAQ Q2`,
        [Language.Hindi]: `?????`,
    },
    "e692619d-2df7-4fc4-b2bc-dfdad15e52f8": {
        [Language.English]: `FAQ A2`,
        [Language.Hindi]: `?????`,
    },
    "840f6a27-cb5a-441c-b158-eff37cbfb968": {
        [Language.English]: `FAQ Q3`,
        [Language.Hindi]: `?????`,
    },
    "c9fde4b2-0b06-4239-a7c9-e03d1f374ba3": {
        [Language.English]: `FAQ A3`,
        [Language.Hindi]: `?????`,
    },
    "eab3ebfe-f04a-47a6-89ff-5f296bae7056": {
        [Language.English]: `FAQ Q4`,
        [Language.Hindi]: `?????`,
    },
    "07ace5c9-f216-4df2-abe7-d7f041394ad4": {
        [Language.English]: `FAQ A4`,
        [Language.Hindi]: `?????`,
    },
    "3b0e9005-84e1-4c8a-8aa5-020c321322f7": {
        [Language.English]: `FAQ Q5`,
        [Language.Hindi]: `?????`,
    },
    "7231c617-3d3c-46fb-8b7c-daf31ca2cafe": {
        [Language.English]: `FAQ A5`,
        [Language.Hindi]: `?????`,
    },
    "cefeeda8-fa1a-41c4-bb8c-d53b052ca9d0": {
        [Language.English]: `Futuristic Design`,
        [Language.Hindi]: `?????`,
    },
    "16cbfbfb-a3c7-4dae-99e7-52b422c31104": {
        [Language.English]: `Livguard Inverter Batteries are manufactured with PPC Plastic to avoid leakage and keeping in mind the customer’s needs to deliver the safest and aesthetic designs for you`,
        [Language.Hindi]: `?????`,
    },
    "c17b911e-a564-4192-a363-11def77e12b9": {
        [Language.English]: `Starting From `,
        [Language.Hindi]: `?????`,
    },
    "28c8bd29-74e4-425b-8654-9d0f51a98cba": {
        [Language.English]: `/-`,
        [Language.Hindi]: `?????`,
    },
    "450429b9-9d3a-47e8-acdc-667773c39d28": {
        [Language.English]: `Livguard `,
        [Language.Hindi]: `?????`,
    },
    "d9eec0e4-1258-4ff7-8871-4d530e2c8424": {
        [Language.English]: `is a Complete End-to-End Solution Provider for E-mobility`,
        [Language.Hindi]: `?????`,
    },
    "3f724c0f-7cd3-4c2e-b320-a8d48ee22cd3": {
        [Language.English]: `Connect with Us`,
        [Language.Hindi]: ``,
    },
    "30f39249-45bb-45cb-a674-bcbe3df9710e": {
        [Language.English]: `<span class="lg-text-highlighted">E-mobility</span> Solutions`,
        [Language.Hindi]: `?????`,
    },
    "f81436a4-b523-4061-b646-6d92691558ac": {
        [Language.English]: `Li-Battery`,
        [Language.Hindi]: `?????`,
    },
    "9a55d278-dd6f-45e5-a3cd-2b60df7085fb": {
        [Language.English]: `DC-DC`,
        [Language.Hindi]: `?????`,
    },
    "ff52743c-c468-41df-9cc8-6288f4ed9e0c": {
        [Language.English]: `Motor`,
        [Language.Hindi]: `?????`,
    },
    "4a5e6924-7308-4054-af6e-076c9d0f7ebb": {
        [Language.English]: `BMS, IoT-Analytics`,
        [Language.Hindi]: `?????`,
    },
    "9c43c2af-9a25-4db7-b2a7-5de061f50c6b": {
        [Language.English]: `Charger`,
        [Language.Hindi]: `?????`,
    },
    "fdc2da8c-7208-4586-8d53-c4e695106585": {
        [Language.English]: `Controller`,
        [Language.Hindi]: `?????`,
    },
    "0972912b-220b-4ee1-8804-f5400ed35247": {
        [Language.English]: `With our customer-centric approach, we aim to empower everyone across the nation with limitless energy. Our diverse product portfolio, spanning from automotive batteries, inverters and inverter batteries, to stabilizers and residential solar solutions, ushers in a new era of innovative energy products.`,
        [Language.Hindi]: `?????`,
    },
    "839a039a-24f0-4be7-8c56-9baf569a006c": {
        [Language.English]: `Why <span class="lg-text-highlighted">Choose</span> Us`,
        [Language.Hindi]: `?????`,
    },
    "98a3947e-f747-4ed8-81df-fb966d2e05c5": {
        [Language.English]: `With our customer-centric approach, we aim to empower everyone across the nation with limitless energy. Our diverse product portfolio, spanning from automotive batteries, inverters and inverter batteries, to stabilizers and residential solar solutions, ushers in a new era of innovative energy products.`,
        [Language.Hindi]: `?????`,
    },
    "06cdcb60-4fd5-49e0-a640-fca8898d55e0": {
        [Language.English]: `Our Mission`,
        [Language.Hindi]: `?????`,
    },
    "b339f978-1e57-47c9-8402-1c34ea02f66d": {
        [Language.English]: `Establish Livguard as a strong player in energy-solution space in India. We will achieve this by developing an ecosystem of delighted customers, committed partners, exceptional product quality and delightful service.`,
        [Language.Hindi]: `?????`,
    },
    "b159ebed-e057-4d21-9362-eee84ce38fb6": {
        [Language.English]: `Our Vision`,
        [Language.Hindi]: `?????`,
    },
    "a88d1585-3cce-464d-925c-3ddff5526b09": {
        [Language.English]: `To be a global leader in energy storage products driven by innovative technology and excellence in manufacturing & services.`,
        [Language.Hindi]: `?????`,
    },
    "b24ae6c1-e9ff-4195-9e2b-3491f4ae01b1": {
        [Language.English]: `Current <span class="lg-text-highlighted">Business Landscape</span>`,
        [Language.Hindi]: `?????`,
    },
    "4de0722e-80e6-4e87-960d-91c2efb131db": {
        [Language.English]: `Sept-2023`,
        [Language.Hindi]: `?????`,
    },
    "15a51924-fad4-489e-a6a2-0a0e82ee3434": {
        [Language.English]: `IATF 16949:2015 Certificate`,
        [Language.Hindi]: `?????`,
    },
    "a4b92fab-45f9-4440-8364-58ed72240c19": {
        [Language.English]: `Plan from TUV SUD Asia`,
        [Language.Hindi]: `?????`,
    },
    "5ef91974-9065-4189-96e3-db71ce9771be": {
        [Language.English]: `Our <span class="lg-text-highlighted">Certifications</span>`,
        [Language.Hindi]: `?????`,
    },
    "45b2c5d2-cf75-40be-bbaf-57e929c22828": {
        [Language.English]: `Sept-2023`,
        [Language.Hindi]: `?????`,
    },
    "61480ca5-73da-452d-86a4-0ee2981f322f": {
        [Language.English]: `IATF 16949:2015 Certificate`,
        [Language.Hindi]: `?????`,
    },
    "8490141e-9269-434d-83cb-a746a345a84d": {
        [Language.English]: `Plan from TUV SUD Asia`,
        [Language.Hindi]: `?????`,
    },
    "776efacc-bd35-4b34-80ce-e7ceb01a3f1f": {
        [Language.English]: `Legacy of`,
        [Language.Hindi]: `?????`,
    },
    "83b23d97-4f66-4838-844b-1ac515a72681": {
        [Language.English]: `30+ years`,
        [Language.Hindi]: `?????`,
    },
    "9282ac4f-ae32-4033-a3ee-98e2973fcb28": {
        [Language.English]: `Wide range`,
        [Language.Hindi]: `?????`,
    },
    "1ccecae3-b11a-480f-b9cc-e0dd22a1ef72": {
        [Language.English]: `Product Portfolio`,
        [Language.Hindi]: `?????`,
    },
    "503a9e8c-3f0d-4e64-9cdc-d04db357908e": {
        [Language.English]: `PAN India`,
        [Language.Hindi]: `?????`,
    },
    "1b722a5b-f096-43af-9ca0-a8eaadf68a51": {
        [Language.English]: `Service Network`,
        [Language.Hindi]: `?????`,
    },
    "cfab32fb-ae56-4c8a-8e4c-79802cf5fb59": {
        [Language.English]: `Revenue FY23`,
        [Language.Hindi]: `?????`,
    },
    "2d112cc9-a076-4e80-8e40-fd4b9368fd85": {
        [Language.English]: `USD 470Mn`,
        [Language.Hindi]: `?????`,
    },
    "98eb0f6b-e093-4f20-8d32-9f731e8a27d2": {
        [Language.English]: `Extensive`,
        [Language.Hindi]: `?????`,
    },
    "062f06fe-eafa-4ae8-b8d0-de4e25b67f54": {
        [Language.English]: `Manufacturing Capacity`,
        [Language.Hindi]: `?????`,
    },
    "7674811d-eb93-411a-9a5e-06cd3a052895": {
        [Language.English]: `Strong Network of`,
        [Language.Hindi]: `?????`,
    },
    "01f3da01-fbc6-4522-9f3c-319955a0a114": {
        [Language.English]: `Distribution & People`,
        [Language.Hindi]: `?????`,
    },
    "5833e10b-79c9-4f71-ba98-0a23d4999194": {
        [Language.English]: `Meet Our Leaders`,
        [Language.Hindi]: `?????`,
    },
    "fa87f6a2-b572-4742-a928-a3c85fb52e2f": {
        [Language.English]: `Our <span class="lg-text-highlighted">Manufacturing Plant</span>`,
        [Language.Hindi]: `?????`,
    },
    "c6d0ac89-bf45-4974-9585-d6e5ceec6849": {
        [Language.English]: `Livguard has established itself as a strong player in the energy solution space in India. With our offerings in automotive batteries, Inverters and Inverter Batteries, Stabilizers, Residential Solar Solutions, we are bringing in a new dimension of smart energy products.`,
        [Language.Hindi]: `?????`,
    },
    "387ff60d-9f20-4e2f-b0fd-0fa92591b722": {
        [Language.English]: `Livguard Manufacturing Plant`,
        [Language.Hindi]: `?????`,
    },
    "41c60984-c721-414b-9ebf-838604bb70b3": {
        [Language.English]: `Total Factory Area: `,
        [Language.Hindi]: `?????`,
    },
    "89db53cb-3d7d-4f7b-96ba-21ae5d09d39d": {
        [Language.English]: `32K Sq Ft.`,
        [Language.Hindi]: `?????`,
    },
    "46e6c304-5826-4d6b-bf9b-6cf61eed070a": {
        [Language.English]: `Plant Capacity: `,
        [Language.Hindi]: `?????`,
    },
    "5b0971a6-a16b-47ce-9e10-169d9fa4bd89": {
        [Language.English]: `2.5 Lac Packs Per Annum Manesar`,
        [Language.Hindi]: `?????`,
    },
    "f085747f-308f-4ca7-8c1d-8f944dc6a664": {
        [Language.English]: `<span class="lg-text-highlighted">Partner</span> with Us`,
        [Language.Hindi]: `?????`,
    },

    //Two Wheeler Page Vernac Strings Start
    "c106b24b-668c-4bc2-b9fe-747eea24944a": {
        [Language.English]: `Uninterrupted Power`,
        [Language.Hindi]: `?????`,
    },
    "24038be1-0e21-4016-9f8e-17d3d522b20e": {
        [Language.English]: `For Your Two-Wheelers`,
        [Language.Hindi]: `?????`,
    },
    "7751ea6c-f22e-4cbf-b6a7-45dfc655bdc1": {
        [Language.English]: `Empower your ride with our range of Automotive Batteries. From Two and Three Wheeler batteries to Car and Truck Batteries, Livguard covers it all`,
        [Language.Hindi]: `?????`,
    },
    "d3b47f52-f35c-4523-bb3f-0c4a55113f63": {
        [Language.English]: `Strong <span class="lg-text-highlighted">Automotive Batteries</span>`,
        [Language.Hindi]: `?????`,
    },
    "83e88e8e-82c4-4a1f-9540-6551a24c703c": {
        [Language.English]: `To Drive Your Journey Forward`,
        [Language.Hindi]: `?????`,
    },
    "4136551e-69a6-4500-b475-321dd6b4e658": {
        [Language.English]: `Better Cranking Power`,
        [Language.Hindi]: `?????`,
    },
    "34bb4867-d4f4-434d-a956-e3bb03c23b34": {
        [Language.English]: `Livguard Automotive Batteries are made with the perfect blend of Grid Structure and Plate Chemistry to ensure a more efficient and higher cranking power.`,
        [Language.Hindi]: `?????`,
    },
    "701881a3-e5f5-42b7-b41e-118fa30f47e0": {
        [Language.English]: `Easy Maintenance`,
        [Language.Hindi]: `?????`,
    },
    "7aaf5c28-e9df-4665-8aa7-5358869f54e8": {
        [Language.English]: `The durable design and technology that helps in improving efficiency and reducing waste makes Livguard automotive batteries the ideal pick for you`,
        [Language.Hindi]: `?????`,
    },
    "353cc560-e2f2-4e33-a948-607d46455471": {
        [Language.English]: `Performance with Safety`,
        [Language.Hindi]: `?????`,
    },
    "fe83636f-3c6f-4450-a329-17edf6e7ea31": {
        [Language.English]: `Our Automotive Batteries for cars, two-wheelers, trucks, tractors and more are engineered with high safety standards and assured performance to ensure a limitless experience for you`,
        [Language.Hindi]: `?????`,
    },
    "b21c18a0-c411-4c08-adb9-cb1623a207bc": {
        [Language.English]: `Choose Your Ideal`,
        [Language.Hindi]: `?????`,
    },
    "c0e900e7-59e1-45d8-b317-54988a6051ba": {
        [Language.English]: `<span class="lg-text-highlighted">Two Wheeler</span> Battery`,
        [Language.Hindi]: `?????`,
    },
    "114a82b5-b299-4bb9-8528-b295394771d8": {
        [Language.English]:
            "Find the ideal battery that suits your two-wheeler. Use our Buying Guide to get to know in detail about how you can buy your battery and our Product Catalogue for product specifications",
        [Language.Hindi]: `?????`,
    },
    "a1ac20a8-c430-4a35-b262-2ff35b480344": {
        [Language.English]: `Find My Battery`,
        [Language.Hindi]: `?????`,
    },
    "897a4524-8f8b-4a11-9eab-0d08a2c6242d": {
        [Language.English]: "Starting from ₹",
        [Language.Hindi]: "₹",
    },
    "00e77ff4-ada2-4182-83bb-5fae21004db9": {
        [Language.English]: "/-",
        [Language.Hindi]: "/- से शुरू",
    },
    "3e16fc04-40ab-4a32-aca8-bb10812fe30d": {
        [Language.English]: `Top <span class="lg-text-highlighted">Two-Wheeler</span>`,
        [Language.Hindi]: "?????",
    },
    "52d70e49-05fc-47e2-93c0-104e51b58fbc": {
        [Language.English]: `Battery Picks`,
        [Language.Hindi]: "?????",
    },
    "cd191eb4-b171-47b1-ab0e-21e4f3259011": {
        [Language.English]: `Best Seller`,
        [Language.Hindi]: "?????",
    },
    "2b42baca-b2b7-489c-b1a2-2d25d18f9ffd": {
        [Language.English]: `<span class="lg-text-highlighted">Our Suggestions</span>`,
        [Language.Hindi]: "?????",
    },
    "d4091725-079a-4f18-831c-03cc7bb2ec09": {
        [Language.English]: `Based On Your Choice`,
        [Language.Hindi]: "?????",
    },
    "0dc1ec96-3b51-4314-ab45-9b5b542f66c5": {
        [Language.English]: `Filter`,
        [Language.Hindi]: "?????",
    },
    "51d56374-4d1d-46c1-8ef1-f72396e12e6a": {
        [Language.English]: `Select Manufacturer`,
        [Language.Hindi]: "?????",
    },
    "5793b8a3-16b1-4c11-bc37-ef5062160855": {
        [Language.English]: `Select Segment`,
        [Language.Hindi]: "?????",
    },
    "97f3fc31-1116-46f6-a385-d4df5e25bde1": {
        [Language.English]: `Select Model`,
        [Language.Hindi]: "?????",
    },
    "3231d38a-1950-46eb-be3b-76bd8bce6998": {
        [Language.English]: `Apply`,
        [Language.Hindi]: "?????",
    },
    "e9d54eec-71d3-4c7e-aa3e-265e7c7db57f": {
        [Language.English]: `MoRide LGBTX 7L`,
        [Language.Hindi]: "?????",
    },
    "5cce2027-a1dd-4e17-983d-52d22b1dd958": {
        [Language.English]:
            "Find the ideal battery that suits your two-wheeler. Use our Buying Guide to get to know in detail about how you can buy your battery and our Product Catalogue for product specifications",
        [Language.Hindi]: "?????",
    },
    "211ca435-d909-41ca-8a4a-8ecddfc46a30": {
        [Language.English]: `24 + 24* Months`,
        [Language.Hindi]: "?????",
    },
    "a5e5e57c-b7a4-498c-a46b-11d7a196ccad": {
        [Language.English]: `7 Ah`,
        [Language.Hindi]: "?????",
    },
    "5d3c4456-c255-43f1-80cd-17e092379dc7": {
        [Language.English]: `R`,
        [Language.Hindi]: "?????",
    },
    "4b9c2c47-f63d-4641-895d-2fe1f3cc9fc0": {
        [Language.English]: `275(L) X 277(W) X 153(H) mm`,
        [Language.Hindi]: "?????",
    },
    "7bcd803f-7cae-427b-9838-8c1966e13b01": {
        [Language.English]: `Recommended`,
        [Language.Hindi]: "?????",
    },
    "42bd678d-83ef-4935-a3aa-7e9406887b28": {
        [Language.English]: `Explore Product`,
        [Language.Hindi]: "?????",
    },
    "2c6dc668-49ef-4913-88c1-904d6e9be1a2": {
        [Language.English]: `Warranty`,
        [Language.Hindi]: "?????",
    },
    "c73ece31-e0c3-4b1f-94c5-51d742ae3186": {
        [Language.English]: `Capacity`,
        [Language.Hindi]: "?????",
    },
    "0bbd2699-d61f-48ee-ae84-491a2ee102eb": {
        [Language.English]: `Polarity`,
        [Language.Hindi]: "?????",
    },
    "e44c8c4b-bf5d-412c-9ca4-27552ec79104": {
        [Language.English]: `Dimensions`,
        [Language.Hindi]: "?????",
    },

    "03af4bc6-64c9-4819-8b24-32aa3e2ef3f1": {
        [Language.English]: `How to find the best two-wheeler battery?`,
        [Language.Hindi]: "?????",
    },
    "9e54904b-adb2-4589-89c9-c1e4c407a454": {
        [Language.English]: `When it comes to two-wheeler batteries, quality is the most important thing to consider. Livguard excels in manufacturing robust and reliable two-wheeler batteries. Our Automotive Batteries(link to page) are designed to offer superior performance, easy handling, and low maintenance requirements.`,
        [Language.Hindi]: "?????",
    },
    "346c1030-2edd-4ba5-94d0-32f877f452be": {
        [Language.English]: `Which battery is best for bikes?`,
        [Language.Hindi]: "?????",
    },
    "1e94b867-5da8-4c8c-befe-4d3018a8bb56": {
        [Language.English]: `Livguard's range of MoRide battery(Link to best selling product) is the best for bikes. They are high-performance two-wheeler batteries designed to deliver a power-packed ride through the narrow lanes and tough terrains of India. Livguard MoRide two-wheeler batteries offer more cranking power, more consistent performance and more battery life.`,
        [Language.Hindi]: "?????",
    },
    "666f5b25-c71d-41b4-8695-2f2f29a2915c": {
        [Language.English]: `What is the life of a two-wheeler bike battery?`,
        [Language.Hindi]: "?????",
    },
    "fb9a1ce5-7522-442d-89b0-10387f9dbecd": {
        [Language.English]: `An average two-wheeler bike battery lasts between 2-3 years depending upon the usage. There are many factors that affect the batteries’ lifecycle. Such as:<br>
        - Overloading the battery<br>
        - Faulty voltage regulator<br>
        - Leaky circuit<br>
        - Heat and vibration<br>
        Livguards range of Two-wheeler batteries(Link to page) are made to power your ride with better performance and efficiency.`,
        [Language.Hindi]: "?????",
    },
    "77454b24-599c-4a4a-a980-abe2ea759eda": {
        [Language.English]: `How can I improve my bike battery life?`,
        [Language.Hindi]: "?????",
    },
    "44842d1f-5e7a-4ace-83f8-1e02bf0e4b81": {
        [Language.English]: `A few careful steps and guidelines can extend the life of your bike's battery by several years. These include:<br>
        - Use the right battery<br>
        - Keep the battery charged<br>
        - Follow a maintenance schedule<br>
        Livguard's range of MoRide(link to best selling MoRide battery) batteries is the best for bikes. They offer more cranking power, more consistent performance and more battery life. They are easy to handle and low on maintenance.`,
        [Language.Hindi]: "?????",
    },
    "eb26cf7b-27ef-4778-b611-eaa017322540": {
        [Language.English]: `Which two-wheeler bike battery is suitable for 200cc bikes?`,
        [Language.Hindi]: "?????",
    },
    "2266d6d4-5dfe-4850-bd66-e2fa675eb9a5": {
        [Language.English]: `Livguard's BTX9L(link to product) is the best battery for 200cc bikes. Its battery capacity is 9Ah and provides more consistent performance.`,
        [Language.Hindi]: "?????",
    },
    "de841654-95b1-424b-a000-e70cde20f666": {
        [Language.English]: "1500VA Capacity",
        [Language.Hindi]: "?????",
    },
    "f31a5e79-e3fd-44a7-a077-b012913af431": {
        [Language.English]: "72 Months Warranty",
        [Language.Hindi]: "?????",
    },

    //Car and SUV Vernac Strings Start

    "835eb595-c459-46db-a37a-f310363e1733": {
        [Language.English]: " Simply amaZING Batteries",
        [Language.Hindi]: "?????",
    },
    "4abfa328-bde2-4190-b944-71556401c22c": {
        [Language.English]: "With Best in Class Warranties",
        [Language.Hindi]: "?????",
    },
    "1d0accca-ec98-4ea1-89b9-88072cf5881d": {
        [Language.English]: "Make every ride an adventure with Livguard's range of Car & SUV batteries. Select and buy the ideal one that fits your Car and SUV's needs",
        [Language.Hindi]: "?????",
    },
    "32311f43-f3bd-4137-8d35-381f0bfff7bf": {
        [Language.English]: `Strong <span class="lg-text-highlighted">Automotive Batteries</span>`,
        [Language.Hindi]: "?????",
    },
    "30486bb4-8e46-4f90-87e0-1ecf2addaba4": {
        [Language.English]: "To Drive Your Journey Forward",
        [Language.Hindi]: "?????",
    },
    "f6ffda18-14b4-4973-9f1d-8394404caae0": {
        [Language.English]: "Best In Class Warranty",
        [Language.Hindi]: "?????",
    },
    "a3d4f75e-dfc7-4a1e-b227-f7ba59c7415d": {
        [Language.English]: "Experience unmatched performance for your car and SUV with peace of mind of our best-in-class warranty, for each Ah battery category",
        [Language.Hindi]: "?????",
    },
    "035647a1-11fd-46c8-9779-6ca45d66aef9": {
        [Language.English]: "Maintenance Free",
        [Language.Hindi]: "?????",
    },
    "7e6ef891-fa59-4673-b436-af77ecff2da0": {
        [Language.English]: "Batteries made with Advance Calcium Technology for a smooth and maintenance-free battery life.",
        [Language.Hindi]: "?????",
    },
    "c5b351d6-0747-4a75-8e47-48f20f9adb0f": {
        [Language.English]: "Smooth Start",
        [Language.Hindi]: "?????",
    },
    "521768ff-9aa1-41fe-b403-5fbeaf100b3b": {
        [Language.English]: "Car and SUV batteries built with Unique Active Material for seamless ignition, during every ride.",
        [Language.Hindi]: "?????",
    },
    "79f76b0b-3fce-4d4f-8fb8-4a468a20420b": {
        [Language.English]: "Long Battery Life",
        [Language.Hindi]: "????????",
    },
    "559a1118-7d22-4c63-8838-c246921b9361": {
        [Language.English]: "Experience unparalleled longevity of batteries, with the use of Tough Radial Grid design to keep you moving always.",
        [Language.Hindi]: "?????",
    },
    "1d2d55db-13cc-47d8-b960-9aa8906e1922": {
        [Language.English]: `<span class="lg-text-highlighted">Our Suggestions</span>`,
        [Language.Hindi]: "?????",
    },
    "cd8f0fe0-3dae-485f-aa06-dac1a5450012": {
        [Language.English]: "Based On Your Choice",
        [Language.Hindi]: "?????",
    },
    "c505d928-fde1-4ad6-95f4-2f3109e0e87f": {
        [Language.English]: "Filter",
        [Language.Hindi]: "?????",
    },
    "38a5a09b-8b40-42ea-8d49-52cce1c949c2": {
        [Language.English]: "Select Manufacturer",
        [Language.Hindi]: "?????",
    },
    "89d6339c-70c9-4b06-aada-fc1800ed6018": {
        [Language.English]: "Select Segment",
        [Language.Hindi]: "?????",
    },
    "c7f85209-525c-4954-8450-f5dd4b3c3d1e": {
        [Language.English]: "Select Model",
        [Language.Hindi]: "?????",
    },
    "9e1abe1a-e9ab-47a1-ae4a-36b66a06af82": {
        [Language.English]: "Select Fuel",
        [Language.Hindi]: "?????",
    },
    "85423d3b-8623-4b4b-b4f1-48953aa4fee7": {
        [Language.English]: "Apply",
        [Language.Hindi]: "?????",
    },
    "e2ceac17-9977-44d4-933b-1f221aed6c85": {
        [Language.English]: "Recommended",
        [Language.Hindi]: "",
    },
    "30de7643-a5bc-49a0-b85f-bfa770836330": {
        [Language.English]: "Explore Battery",
        [Language.Hindi]: "?????",
    },
    "95a938d7-dd71-46de-80b0-a417845dfb4d": {
        [Language.English]: "Warranty",
        [Language.Hindi]: "?????",
    },
    "c4c53678-fb9a-41c2-8782-de0690cffdd4": {
        [Language.English]: "Capacity",
        [Language.Hindi]: "?????",
    },
    "05bda873-c84c-4376-8a17-6503ac9d2820": {
        [Language.English]: "Polarity",
        [Language.Hindi]: "?????",
    },
    "9c719db5-fa53-423e-9b96-a77602b3c5bc": {
        [Language.English]: "Dimensions",
        [Language.Hindi]: "?????",
    },
    "7c0a4fcb-46bb-4f91-bad3-c2edf00a1950": {
        [Language.English]: "ZING ULTRA ZU 38B20 L",
        [Language.Hindi]: "?????",
    },
    "b356a538-622e-4f20-9c08-82c959a57934": {
        [Language.English]:
            "Find the ideal battery that suits your two-wheeler. Use our Buying Guide to get to know in detail about how you can buy your battery and our Product Catalogue for product specifications",
        [Language.Hindi]: "?????",
    },
    "c064ffe8-b794-4e21-baf5-56a5515a28f5": {
        [Language.English]: "Warranty",
        [Language.Hindi]: "?????",
    },
    "aaabaf03-79df-4e72-9785-855769b39789": {
        [Language.English]: "30+30* Months",
        [Language.Hindi]: "?????",
    },
    "cb10db44-cef3-48d4-9e58-bdf3994ab36c": {
        [Language.English]: "Capacity",
        [Language.Hindi]: "?????",
    },
    "0ae2cd6e-1165-41a6-82ec-977fda0f326b": {
        [Language.English]: "35 Ah @C 2O",
        [Language.Hindi]: "?????",
    },
    "192b8ada-bbdd-44cc-a446-eaea0eb04fff": {
        [Language.English]: "Polarity",
        [Language.Hindi]: "?????",
    },
    "c4503ffb-5eec-496c-88ad-3b9436fe9b47": {
        [Language.English]: "L",
        [Language.Hindi]: "?????",
    },
    "c813406c-6efb-41c1-8106-b75ef5856aa8": {
        [Language.English]: "Dimensions",
        [Language.Hindi]: "?????",
    },
    "fac2ba5d-65a2-4873-be4e-42ac01cd401e": {
        [Language.English]: "197(L) x 129(W) x 225(H) mm",
        [Language.Hindi]: "?????",
    },
    "72238b02-d35a-497e-be9d-1d1f2742dd6d": {
        [Language.English]: `Top <span class="lg-text-highlighted">Car & SUV</span>`,
        [Language.Hindi]: "?????",
    },
    "7dccb0a9-930e-498d-bc45-194b73920af2": {
        [Language.English]: "Battery Picks",
        [Language.Hindi]: "",
    },
    "281b48d3-22ce-4806-905b-6d88896ed020": {
        [Language.English]: "Eterna",
        [Language.Hindi]: "?????",
    },
    "98d02101-07aa-4103-963b-c1675daa1576": {
        [Language.English]: "Ultra",
        [Language.Hindi]: "?????",
    },
    "ee5b08fe-e6f1-4a6d-ab99-31aeb1abe1bc": {
        [Language.English]: "Primo",
        [Language.Hindi]: "?????",
    },
    "17d7345c-0b35-4984-b6c8-1c82bf3ae2ce": {
        [Language.English]: "Pro Cab",
        [Language.Hindi]: "?????",
    },
    "299dcb87-0cc8-489e-a94b-596cd3335156": {
        [Language.English]: "Pro Cab +",
        [Language.Hindi]: "?????",
    },
    "5bda278a-5862-4086-ab7c-f54aa5a0df4c": {
        [Language.English]: "Zing Eterna",
        [Language.Hindi]: "?????",
    },
    "370fbb82-0ac6-4fb3-bfdf-02b69882b943": {
        [Language.English]: "Best Seller",
        [Language.Hindi]: "?????",
    },
    "550d6911-0818-4aa4-aa5b-13f72a16006b": {
        [Language.English]: "Zing Eterna ZE 38B20 L",
        [Language.Hindi]: "?????",
    },
    "d5ec2af4-0493-42aa-af9e-8be6f13f2208": {
        [Language.English]: "Zing Eterna ZE 38B20 R",
        [Language.Hindi]: "?????",
    },
    "c200a3c3-2788-4260-aa83-65bd64943b40": {
        [Language.English]: "Zing Eterna ZE 55B24LS L",
        [Language.Hindi]: "?????",
    },
    "bdbd5dc8-b00f-4ff4-a98c-845d26ccffda": {
        [Language.English]: "1500VA Capacity",
        [Language.Hindi]: "?????",
    },
    "0061a02b-31d0-4ea3-a5a2-0eec5013365a": {
        [Language.English]: "72 Months Warranty",
        [Language.Hindi]: "?????",
    },
    "00ffb138-e09f-4367-8122-f852a57f4c98": {
        [Language.English]: "Starting from  ₹ ",
        [Language.Hindi]: "?????",
    },
    "5d0a2e9e-ca60-407c-a167-01953328876c": {
        [Language.English]: "/-",
        [Language.Hindi]: "?????",
    },
    "d93bb3f7-4979-4b40-88c8-fae1cee412e5": {
        [Language.English]: "View Product",
        [Language.Hindi]: "?????",
    },
    "16c43b68-0710-47d2-953d-2e0ac5c33f9d": {
        [Language.English]: "Zing Ultra",
        [Language.Hindi]: "?????",
    },
    "63efc0ee-4a39-48eb-a1c2-23895f1ec0a7": {
        [Language.English]: "Zing Ultra ZU 38B20 L",
        [Language.Hindi]: "?????",
    },
    "dd3020ef-66a4-4ac3-bb78-fb7fd80db08e": {
        [Language.English]: `Zing Ultra ZU 38B20 R`,
        [Language.Hindi]: `?????`,
    },
    "b5878967-eab1-47ef-bebe-ed939fadf376": {
        [Language.English]: `Zing Ultra ZU 38B20 BH L`,
        [Language.Hindi]: `?????`,
    },
    "21094d77-3a84-4bd0-97e6-0e3c0b8cad0d": {
        [Language.English]: `Zing Ultra ZU DIN44 LH L`,
        [Language.Hindi]: `?????`,
    },
    "b1db6c14-244d-4743-9599-75bb008a2cd2": {
        [Language.English]: `Zing Ultra ZU DIN50 L`,
        [Language.Hindi]: `?????`,
    },
    "212eea82-704c-49fa-bfa9-352f6a75ad30": {
        [Language.English]: `Zing Ultra ZU DIN55 R`,
        [Language.Hindi]: `?????`,
    },
    "5161c418-80ff-4bed-b328-641b24d6a0c5": {
        [Language.English]: `Zing Ultra ZU DIN60 L`,
        [Language.Hindi]: `?????`,
    },
    "bd10a04d-f213-4a57-b01d-be91035a3e9c": {
        [Language.English]: `Zing Ultra ZU DIN65 LH L`,
        [Language.Hindi]: `?????`,
    },
    "f2314bd0-7e41-4ce1-9b84-08b02a2ccaa9": {
        [Language.English]: "Zing Primo",
        [Language.Hindi]: "?????",
    },
    "0d7ccc05-97d7-40a4-95e6-86b1b371f74a": {
        [Language.English]: "Zing Primo ZP 38B20 L",
        [Language.Hindi]: "?????",
    },
    "4a4eccc2-bf48-4e2c-be60-05d97913d1e8": {
        [Language.English]: "Zing Primo ZP 70D26 L",
        [Language.Hindi]: "?????",
    },
    "50836139-5c57-4eee-88e4-69f83fb371ab": {
        [Language.English]: "Pro Cab",
        [Language.Hindi]: "?????",
    },
    "d1756624-057c-4bf3-9284-5f5d155b70e3": {
        [Language.English]: "Pro Cab PC 38B20 L",
        [Language.Hindi]: "?????",
    },
    "3dd8ef5c-fbb6-42e3-ba7a-32ac98bef635": {
        [Language.English]: "Choose Your Ideal",
        [Language.Hindi]: "?????",
    },
    "a1cd74ff-061a-4631-916b-66ca35810235": {
        [Language.English]: `<span class="lg-text-highlighted">Car & SUV</span> Battery`,
        [Language.Hindi]: "?????",
    },
    "9e3c8233-9c58-4c24-b87c-fd99c33ff11e": {
        [Language.English]:
            "Find the ideal battery that fits perfectly with your Car and SUV. Use our Buying Guide to get to know in detail about how you can buy your battery and our Product Catalogue for product specifications",
        [Language.Hindi]: "?????",
    },
    "2e95883c-ae7a-46d4-91c7-baff1724f551": {
        [Language.English]: "Can we charge a dead car battery?",
        [Language.Hindi]: "?????",
    },
    "e5dc6e92-092d-4879-8e6f-869818c6fe35": {
        [Language.English]:
            "A car battery is considered discharged when the voltage drops below 12 volts. And if the car battery is below 12 volts, use a dedicated charger to charge it. Consider Livguard's range (link to page) of cars and SUV batteries for a smooth experience.",
        [Language.Hindi]: "?????",
    },
    "c7184bc7-e542-4611-9a62-ad9459b1c6ec": {
        [Language.English]: "Does a car battery discharge in cold weather?",
        [Language.Hindi]: "?????",
    },
    "1a580e9e-7d49-4c5e-b99a-4c75b5788551": {
        [Language.English]:
            "Cold temperatures thicken motor oil, making it harder to turn the engine over. A cold battery has less cranking power, thus making it difficult to start in cold weather. Livguard automotive batteries (link to page) are made with higher cranking power to deliver a smooth experience",
        [Language.Hindi]: "?????",
    },
    "9d49ec97-e7f0-4fb7-90ad-23f73ed28b69": {
        [Language.English]: "What is the average life of a car battery? How to find the best car battery?",
        [Language.Hindi]: "?????",
    },
    "93d6fb1c-e245-43ee-a440-43938bc33b1d": {
        [Language.English]:
            "Car batteries usually last between 3 and 5 years. There are many factors which decide the average life of a battery. To find the best car battery visit Livguard's Automotive Battery (link to page) range.",
        [Language.Hindi]: "?????",
    },
    "348ff8a2-eb90-4f43-8099-306938e8f7cb": {
        [Language.English]: "How do I choose a car battery?",
        [Language.Hindi]: "?????",
    },
    "ec314aa6-aed3-4ef2-96d4-9627a4241bc4": {
        [Language.English]: `To find the right battery power for your vehicle, you need to consider a few important factors.<br>
        The cold-cranking amps (CCA): Cranking amps are the measure of the battery's starting power.<br>
        Reserve capacity (RC) of the battery: It refers to a battery's standing power.<br>
        The standard requirements of your vehicle.<br>
        Size and brand<br>
        Livguard’s battery finder is the best way to help you find the right battery for your vehicle.<br>`,
        [Language.Hindi]: "?????",
    },
    "09cfe0e4-6cf2-4624-96d2-814f38c3a7b7": {
        [Language.English]: "What is a maintenance-free Car battery?",
        [Language.Hindi]: "?????",
    },
    "a334719f-b502-42db-ad3d-61020e863d49": {
        [Language.English]:
            "A maintenance-free car battery implies that the manufacturer didn’t provide any means of maintaining the water/acid level in the battery. This means it can only be replaced if the battery boils dry. Therefore, buying a maintenance-free battery from a trusted and renowned manufacturer like Livguard is imperative. We provide robust, sturdy and long-lasting batteries for every road condition in India. Livguard’s Zing ETERNA battery (link to product page) for Cars & SUVs is an ideal choice with a double-lid design which prevents external damage and terminal corrosion for a maintenance-free life.",
        [Language.Hindi]: "?????",
    },
    "e2e8a837-7ec1-4291-9838-aaf60d3bc843": {
        [Language.English]: "35 Ah @ C₂₀",
        [Language.Hindi]: "?????",
    },
    "4f1fafa4-d985-4be7-a5d0-7f1e49255824": {
        [Language.English]: "36+36* Months Warranty",
        [Language.Hindi]: "?????",
    },
    "ff61389f-35a0-4cf1-88cd-613b51b70ff8": {
        [Language.English]: "35 Ah @ C₂₀",
        [Language.Hindi]: "?????",
    },
    "3c8221ff-8df4-4cd0-ba47-930d75e848b9": {
        [Language.English]: "36+36* Months Warranty",
        [Language.Hindi]: "?????",
    },
    "5295b378-d248-4114-bf3d-5a12db6e779e": {
        [Language.English]: "45 Ah @ C₂₀",
        [Language.Hindi]: "?????",
    },
    "dc12b69e-67f3-47c3-8887-4153756f4140": {
        [Language.English]: "36+36* Months Warranty",
        [Language.Hindi]: "?????",
    },

    //Tractor Page Vernac Strings Start
    "1ff75fcb-01bd-4946-84bc-f759d4dad669": {
        [Language.English]: "The Pradhan Of Batteries",
        [Language.Hindi]: "?????",
    },
    "d11c39cc-f5a5-412e-acfa-a08385f2fd26": {
        [Language.English]: "For Powerful Tractors",
        [Language.Hindi]: "?????",
    },
    "6dfb8a56-4b0a-48d1-a976-7bb6f235c9c2": {
        [Language.English]: "Empowering India's agriculture segment with power-packed tractor battery choices",
        [Language.Hindi]: "?????",
    },
    "c15def47-2c4f-4e42-ba57-102da4f0ee11": {
        [Language.English]: `<span class="lg-text-highlighted">Superior Features</span>`,
        [Language.Hindi]: "?????",
    },
    "7547aa62-ca76-48e4-9fb0-62cea563108c": {
        [Language.English]: "For A Supreme Performance",
        [Language.Hindi]: "?????",
    },
    "054be978-134a-4185-9c1c-af2e2115a679": {
        [Language.English]: "All Weather Performance",
        [Language.Hindi]: "?????",
    },
    "52f9b679-cbea-492f-be72-97980bbd8f4f": {
        [Language.English]: "Livguard Automotive Batteries are made with the perfect blend of Grid Structure and Plate Chemistry to ensure a more efficient and higher cranking power.",
        [Language.Hindi]: "?????",
    },
    "55d766c4-1a47-4ba3-bb6f-299997cb27ee": {
        [Language.English]: "Long Service Life",
        [Language.Hindi]: "?????",
    },
    "3d8116d8-57fd-461c-916d-060537ceda59": {
        [Language.English]:
            "Our Automotive Batteries for cars, two-wheelers, trucks, tractors and more are engineered with high safety standards and assured performance to ensure a limitless experience for you",
        [Language.Hindi]: "?????",
    },
    "2e1d6311-034a-4ee3-8f50-bee164a05906": {
        [Language.English]: "Low Maintenance ",
        [Language.Hindi]: "?????",
    },
    "141b0934-353a-4b48-ba96-69afbe2bc115": {
        [Language.English]: "The durable design and technology that helps in improving efficiency and reducing waste makes Livguard automotive batteries the ideal pick for you",
        [Language.Hindi]: "?????",
    },
    "0e93ec35-4468-4b70-a176-bd13df7e5e63": {
        [Language.English]: `Our <span class="lg-text-highlighted">Top Picks</span> For Your`,
        [Language.Hindi]: "?????",
    },
    "ab60649d-e18a-4461-8cc3-2e9e0b2150ab": {
        [Language.English]: "Limitless Growth",
        [Language.Hindi]: "?????",
    },
    "3daf8d68-a883-4175-b8b5-6dca9724201a": {
        [Language.English]: "Pradhaan",
        [Language.Hindi]: "?????",
    },
    "e2420ef0-f6c0-48df-b14f-e801d8273618": {
        [Language.English]: "Pradhaan Xtralife",
        [Language.Hindi]: "?????",
    },
    "1acb2c77-192a-4aff-8293-2a85cc28de1c": {
        [Language.English]: "Pradhan LGL FF TR90 L",
        [Language.Hindi]: "?????",
    },
    "fbfd6623-21b5-46cd-91b4-b42c51957987": {
        [Language.English]: "Lorem ipsum dolor sit amet. Sit accusamus facere et numquam nihil qui dolor impedit ut velit ....",
        [Language.Hindi]: "?????",
    },
    "7a706b0b-70b9-4880-9ef1-c90f1fde1dc0": {
        [Language.English]: "Warranty",
        [Language.Hindi]: "?????",
    },
    "7df7a369-4108-454a-90e4-0846ad1610ee": {
        [Language.English]: "24 + 24* Months",
        [Language.Hindi]: "?????",
    },
    "20746cd1-a2d8-4dba-bc90-7632e05cc1f9": {
        [Language.English]: "Capacity",
        [Language.Hindi]: "?????",
    },
    "db1eec3b-ce03-42ae-89a2-4b6f19ce8f2d": {
        [Language.English]: "7 Ah",
        [Language.Hindi]: "?????",
    },
    "0761744f-33a9-4cce-9cb6-340ca934e7c0": {
        [Language.English]: "3D Grid",
        [Language.Hindi]: "?????",
    },
    "6224bdb8-9b67-46aa-bb09-34bf7ef69421": {
        [Language.English]: "Longer Life",
        [Language.Hindi]: "?????",
    },
    "38ae7f11-a012-4361-8f9a-397405fbfac7": {
        [Language.English]: "Dimensions",
        [Language.Hindi]: "?????",
    },
    "e06d3d4a-dd54-4c26-b31b-33e3615f92b4": {
        [Language.English]: "275(L) X 277(W) X 153(H) mm",
        [Language.Hindi]: "?????",
    },
    "7451874c-1eb6-429b-8588-8a7aafbd4e6b": {
        [Language.English]: "Starting from  ₹",
        [Language.Hindi]: "?????",
    },
    "8dd8194a-1425-444a-8cb6-f878e74deafc": {
        [Language.English]: "/-",
        [Language.Hindi]: "?????",
    },
    "f1e465b1-e9fe-4bb0-85bc-b15f4f59212b": {
        [Language.English]: "Humraahi LGL FF 100 L",
        [Language.Hindi]: "?????",
    },
    "d369315b-4984-4bd1-a6d2-2f93a23ba265": {
        [Language.English]: "Lorem ipsum dolor sit amet. Sit accusamus facere et numquam nihil qui dolor impedit ut velit ....",
        [Language.Hindi]: "?????",
    },
    "a586fc3e-db19-4e87-8a21-42606fadf4f1": {
        [Language.English]: "24 + 24* Months",
        [Language.Hindi]: "?????",
    },
    "d93b1f36-897b-4a48-bbdf-e711392d0d09": {
        [Language.English]: "7 Ah",
        [Language.Hindi]: "?????",
    },
    "ad4c3394-bb30-4900-9e0c-9a29bde7ab19": {
        [Language.English]: "Longer Life",
        [Language.Hindi]: "?????",
    },
    "9f4d3993-7938-40f7-b514-4c5413a9f219": {
        [Language.English]: "275(L) X 277(W) X 153(H) mm",
        [Language.Hindi]: "?????",
    },
    "27518d22-a27d-4519-b01a-18d1fed070ed": {
        [Language.English]: `Choose The`,
        [Language.Hindi]: "?????",
    },
    "4092b04f-c277-4ec3-b313-0844337ae7df": {
        [Language.English]: `<span class="lg-text-highlighted">Right Battery</span> For You`,
        [Language.Hindi]: "?????",
    },
    "c92fa811-4140-4bef-86a4-6034b9ad2cf9": {
        [Language.English]:
            "Find the suitable pick of inverter that fulfils your requirements with efficiency. Use our Buying Guide to get to know in detail about how you can buy your inverter and our Product Catalogue for product specifications",
        [Language.Hindi]: "?????",
    },
    "ec0d9e43-a1e3-414a-b6fe-01114e016fd3": {
        [Language.English]: "Buying Guide",
        [Language.Hindi]: "?????",
    },
    "b0b06e47-de82-4dba-acc2-90e3b74df96b": {
        [Language.English]: "Download Catalogue",
        [Language.Hindi]: "?????",
    },
    "734ba5fc-030e-4c78-a3c3-b31ae30e1f51": {
        [Language.English]: "Find My Battery",
        [Language.Hindi]: "?????",
    },
    "6a9dcdf2-db86-4d1a-a9aa-0431dc441372": {
        [Language.English]: "Which is the best farm tractor battery?",
        [Language.Hindi]: "?????",
    },
    "775f35e2-464a-4571-a75e-babbc97ac4d2": {
        [Language.English]:
            "The best tractor battery for agriculture may vary on the needs of the individual buying it. Livguard's Pradhan is an ideal choice for your agricultural vehicles. They are designed for an unmatched performance of tractors with high energy demands.",
        [Language.Hindi]: "?????",
    },
    "a5472cd9-0d41-4450-88ed-d7c07c18a319": {
        [Language.English]: "How can I find the best battery for tractor?",
        [Language.Hindi]: "?????",
    },
    "550c8080-9893-46ac-92bf-b317fc9aaeb4": {
        [Language.English]:
            "When looking for the best tractor battery, consider factors like power, durability, and weather resistance. For a reliable choice that meets all these criteria, Livguard's range of tractor batteries is an ideal option for you to explore.",
        [Language.Hindi]: "?????",
    },
    "a46b2d72-9f30-4fc6-ac40-48427ed1f401": {
        [Language.English]: "What should be the capacity of a diesel tractor battery?",
        [Language.Hindi]: "?????",
    },
    "477e9287-3dd5-4d80-99b2-49cab09dcc3d": {
        [Language.English]: "Livguard's 12-volt tractor battery has the capacity of 80ah, 90Ah & 100Ah which are the ideal for a diesel tractor battery.",
        [Language.Hindi]: "?????",
    },
    "8bf5fb61-8c2c-4728-b93f-0b291817209e": {
        [Language.English]: "What are the signs of a failing tractor battery?",
        [Language.Hindi]: "?????",
    },
    "563e329b-a70c-4093-9ec9-e07c9942721d": {
        [Language.English]:
            "Common signs of a failing tractor battery can include difficulty in starting the tractor, dimming lights, and decreased electrical functions. If you experience such issues, it's wise to consider Livguard batteries, which are known for their reliability and long-lasting performance.",
        [Language.Hindi]: "?????",
    },
    "9b90fd59-08ca-4378-b846-3f364b90d058": {
        [Language.English]: "Are heavy-duty tractor batteries suitable for all types of tractors?",
        [Language.Hindi]: "?????",
    },
    "aaa8b7ad-37fa-4782-8f3a-68f3690cf08b": {
        [Language.English]:
            "While most tractors can utilize heavy-duty batteries, the right choice depends on your specific vehicle's requirements. Livguard's range of heavy-duty tractor batteries is designed to cater to a broad spectrum of tractors, providing robust performance and durability.",
        [Language.Hindi]: "?????",
    },

    //Bus and truck vernac strings start
    "67dd15a8-c016-43f0-8715-e7ba18ca5c38": {
        [Language.English]: `Empowering`,
        [Language.Hindi]: `?????`,
    },
    "7853d640-7e57-4678-af5d-8631f2ec6cf7": {
        [Language.English]: `Limitless Journeys`,
        [Language.Hindi]: `?????`,
    },
    "cc5f0cf2-f523-4726-83b6-e950d6007ef4": {
        [Language.English]: `Robust Bus and Truck Batteries made to deliver excellence every time`,
        [Language.Hindi]: `?????`,
    },
    "853e41c9-26ed-409d-a636-03af2124e7bb": {
        [Language.English]: `<span class="lg-text-highlighted">Superior Features</span>`,
        [Language.Hindi]: `?????`,
    },
    "dcfc64d7-ca43-4e45-a11a-f0c4fe765152": {
        [Language.English]: `For A Supreme Performance`,
        [Language.Hindi]: `?????`,
    },
    "70f2a04d-bc31-4848-9509-f77f40137e84": {
        [Language.English]: `Long Battery Life`,
        [Language.Hindi]: `?????`,
    },
    "fbba1481-db00-4e47-8a74-8382af5b4ac4": {
        [Language.English]: `Made with a Robust Design and Double Clad Separation, our Automotive Batteries are made to last long and deliver a seamless experience`,
        [Language.Hindi]: `?????`,
    },
    "75c7f633-bbb4-4a79-bdcb-5b817da7c076": {
        [Language.English]: `Better Cranking Power`,
        [Language.Hindi]: `?????`,
    },
    "c5bf4b2a-a0a8-4d43-9b84-c25c048dd079": {
        [Language.English]: `Our Automotive Batteries for cars, two-wheelers, trucks, tractors and more are engineered with high safety standards and assured performance to ensure a limitless experience for you`,
        [Language.Hindi]: `?????`,
    },
    "3bed811b-de77-40ab-8181-86efbf684059": {
        [Language.English]: `Corrosion Resistance Terminal`,
        [Language.Hindi]: `?????`,
    },
    "fc26240d-32c8-47bc-a2bf-c29c0a25e6af": {
        [Language.English]: `The durable design and technology that helps in improving efficiency and reducing waste makes Livguard automotive batteries the ideal pick for you`,
        [Language.Hindi]: `?????`,
    },
    "537716c2-f2d4-48af-b779-46cfd71501d7": {
        [Language.English]: `Explore Our`,
        [Language.Hindi]: `?????`,
    },
    "8ffe8884-7063-4944-98d1-a54fe742262d": {
        [Language.English]: `<span class="lg-text-highlighted">Bus & Truck Batteries</span>`,
        [Language.Hindi]: `?????`,
    },
    "f22a7acc-0168-4011-9eaf-6a8f3328f093": {
        [Language.English]: `Best Seller`,
        [Language.Hindi]: `?????`,
    },
    "fdb7af25-0b1a-4052-90ff-99ec30711c30": {
        [Language.English]: `1500VA Capacity`,
        [Language.Hindi]: `?????`,
    },
    "9fb9e463-7ee3-42b3-96f2-858a032733ac": {
        [Language.English]: `72 Months Warranty`,
        [Language.Hindi]: `?????`,
    },
    "48ad8c65-8ec7-4a35-be5f-e73180099178": {
        [Language.English]: `Starting from ₹`,
        [Language.Hindi]: `?????`,
    },
    "584c3b75-5cd8-4b82-ba73-b105838035d6": {
        [Language.English]: `/-`,
        [Language.Hindi]: `?????`,
    },
    "d2731f76-051f-4f2b-ac83-2a83f690c401": {
        [Language.English]: `View Product`,
        [Language.Hindi]: `?????`,
    },
    "c46c205c-ffdc-4791-a3f9-b4a839925185": {
        [Language.English]: `Choose The`,
        [Language.Hindi]: `?????`,
    },
    "ea7ce343-ef9d-447e-95ff-578d437bcd97": {
        [Language.English]: `<span class="lg-text-highlighted">Right Battery</span> For You`,
        [Language.Hindi]: `?????`,
    },
    "13754e87-5d5e-46f4-9f02-6f84770a8ec8": {
        [Language.English]: `Find the suitable pick of inverter that fulfils your requirements with efficiency. Use our Buying Guide to get to know in detail about how you can buy your inverter and our Product Catalogue for product specifications`,
        [Language.Hindi]: `?????`,
    },
    "b0a19244-9a60-4fd6-93a7-d0224c9d95d5": {
        [Language.English]: `Buying Guide`,
        [Language.Hindi]: `?????`,
    },
    "f28967c2-99fe-44dc-96cb-6d926c5ea4df": {
        [Language.English]: `Download Catalogue`,
        [Language.Hindi]: `?????`,
    },
    "2c8b3327-a317-4ad0-9c09-d6dbb0846c5c": {
        [Language.English]: `Find My Battery`,
        [Language.Hindi]: `?????`,
    },
    "2b84c09e-60d6-4590-9f2a-a8b058c94087": {
        [Language.English]: `What should I consider before buying commercial truck batteries?`,
        [Language.Hindi]: `?????`,
    },
    "0acdb496-94a8-487b-a73d-829546437963": {
        [Language.English]: `Consider factors like power requirement, vehicle model, weather conditions, and regular usage. Livguard's range of truck battery offers high cranking power, superior performance and durability, making them an excellent choice for commercial trucks.`,
        [Language.Hindi]: `?????`,
    },
    "3db5b6a7-0861-41ff-8d90-2ffbac60bf69": {
        [Language.English]: `How to select best battery for a diesel truck?`,
        [Language.Hindi]: `?????`,
    },
    "4023e870-1e78-41f9-a528-2640381c5288": {
        [Language.English]: `Choosing a battery for a diesel truck involves considering power needs, engine size, and weather conditions. Livguard batteries, with high cranking power and exceptional durability, are well-suited to meet the needs of diesel trucks.`,
        [Language.Hindi]: `?????`,
    },
    "7f21538b-0330-4a9b-a3fc-937390f6967a": {
        [Language.English]: `How can I properly maintain a 24-volt truck battery`,
        [Language.Hindi]: `?????`,
    },
    "e0581f37-46a0-472c-94e6-c7205e04d466": {
        [Language.English]: `Proper maintenance of a 24-volt truck battery includes regular cleaning, avoiding overcharging, and ensuring it stays adequately charged. Livguard's 24-volt truck batteries are designed for longevity and reliability, reducing the need for frequent maintenance.`,
        [Language.Hindi]: `?????`,
    },
    "df814438-bb8d-441c-85b2-55609037be4f": {
        [Language.English]: `Will someone help me with my truck battery installation?`,
        [Language.Hindi]: `?????`,
    },
    "e4e5ac1d-e5a5-4ae8-8a8b-3e05d9264d1b": {
        [Language.English]: `?????`,
        [Language.Hindi]: `?????`,
    },
    "ad3d0c4f-7438-4436-b607-322798870bf8": {
        [Language.English]: `Does higher bus battery capacity mean a longer battery life for a bus?`,
        [Language.Hindi]: `?????`,
    },
    "64eb212f-e988-4ec9-8cd9-c8af0bdb1f63": {
        [Language.English]: `Typically, higher battery capacity can extend a bus's operational period between charges. However, battery life also depends on factors like usage, maintenance, and quality. Livguard's bus batteries, with their high capacities, ensure prolonged battery life while delivering exceptional performance.`,
        [Language.Hindi]: `?????`,
    },
    "a504cf0b-8c7c-4afe-b5e2-925f9576d1c0": {
        [Language.English]: `Humraahi`,
        [Language.Hindi]: `?????`,
    },
    "da25b231-d277-41c9-bd06-494ce7b53ae7": {
        [Language.English]: `Humraahi Xtralife`,
        [Language.Hindi]: `?????`,
    },

    //Three Wheeler vernac strings start
    "aa7c13b1-5476-452b-aa90-6d19bf361db4": {
        [Language.English]: `Power on Wheels`,
        [Language.Hindi]: `?????`,
    },
    "fc06f9c9-c5a3-4631-a62b-3884075b1aa2": {
        [Language.English]: `Three-Wheeler Battery Solutions`,
        [Language.Hindi]: `?????`,
    },
    "51532ae7-57b6-4c23-9622-ecfcd21e8985": {
        [Language.English]: `Battery Solutions that power up your ride with Limitless energy, for a long and smooth performance`,
        [Language.Hindi]: `?????`,
    },
    "75dfe585-c7bc-4497-a8a7-23bb1ed11625": {
        [Language.English]: `<span class="lg-text-highlighted">Reliability</span>`,
        [Language.Hindi]: `?????`,
    },
    "942ecb94-3de6-477e-9dea-5079f62a04c3": {
        [Language.English]: `You Can Experience`,
        [Language.Hindi]: `?????`,
    },
    "c9209f83-6335-404e-ad8e-491d010741d3": {
        [Language.English]: `Long Battery Life`,
        [Language.Hindi]: `?????`,
    },
    "267f262c-3030-43e4-bae7-b778518d7ee2": {
        [Language.English]: `Made with a Robust Design and Double Clad Separation, our Automotive Batteries are made to last long and deliver a seamless experience`,
        [Language.Hindi]: `?????`,
    },
    "22d2b329-b855-4127-9e99-edb36347d88b": {
        [Language.English]: `Easy Maintenance`,
        [Language.Hindi]: `?????`,
    },
    "adf2ff19-2a54-4ca7-9b4d-d2881ad856fc": {
        [Language.English]: `The durable design and technology that helps in improving efficiency and reducing waste makes Livguard automotive batteries the ideal pick for you`,
        [Language.Hindi]: `?????`,
    },
    "c31a4732-aa1f-4973-b2fd-f3b0371c2895": {
        [Language.English]: `Performance with Safety`,
        [Language.Hindi]: `?????`,
    },
    "3b7b22d2-54c3-4ad6-9a7d-e8fede699840": {
        [Language.English]: `Our Automotive Batteries for cars, two-wheelers, trucks, tractors and more are engineered with high safety standards and assured performance to ensure a limitless experience for you`,
        [Language.Hindi]: `?????`,
    },
    "baedfb58-af7c-4126-baa3-63f5ad0ce156": {
        [Language.English]: `<span class="lg-text-highlighted">Three-Wheeler Batteries</span>`,
        [Language.Hindi]: `?????`,
    },
    "836d0f37-0171-4ac9-b4c8-79bd9aaf0afc": {
        [Language.English]: `For Unmatched power`,
        [Language.Hindi]: `?????`,
    },
    "4f1b53b9-36a8-4a0e-b693-4f92e8a1b32b": {
        [Language.English]: `Recommended`,
        [Language.Hindi]: `?????`,
    },
    "bd815d59-dd50-4f9f-85c3-dc769977e6c2": {
        [Language.English]: `Autoz LGM F0 AR32 R`,
        [Language.Hindi]: `?????`,
    },
    "f9ef50be-3d8c-4059-9967-3a764e178cbc": {
        [Language.English]: `Experience the resilience of Livguard Autoz batteries, uniquely crafted for three-wheelers. Power up your ride with efficient and limitless performance.`,
        [Language.Hindi]: `?????`,
    },
    "8ef7eb7a-a46a-46b2-9479-cb31ce29ea98": {
        [Language.English]: `Warranty`,
        [Language.Hindi]: `?????`,
    },
    "cc1b08f2-9903-4bd2-bf8a-974d2a76c080": {
        [Language.English]: `24 + 24* Months`,
        [Language.Hindi]: `?????`,
    },
    "28225ecc-5c09-4c69-a82a-0614dc248123": {
        [Language.English]: `Capacity`,
        [Language.Hindi]: `?????`,
    },
    "75fec07e-0cd9-418b-900e-0990e945000e": {
        [Language.English]: `7 Ah`,
        [Language.Hindi]: `?????`,
    },
    "d71a4882-3a3c-4e2d-a884-071523e265d1": {
        [Language.English]: `Polarity`,
        [Language.Hindi]: `?????`,
    },
    "7bd29c13-e15d-48bd-9e24-c63c2c60a63c": {
        [Language.English]: `R`,
        [Language.Hindi]: `?????`,
    },
    "ff09f4be-754d-49ed-95bb-9223ab5d383e": {
        [Language.English]: `Dimensions`,
        [Language.Hindi]: `?????`,
    },
    "81298034-bd2c-4ad2-99af-2c80b6ea07a8": {
        [Language.English]: `275(L) X 277(W) X 153(H) mm`,
        [Language.Hindi]: `?????`,
    },
    "d7631d6c-a568-464f-8411-e1840750556a": {
        [Language.English]: `Explore Product`,
        [Language.Hindi]: `?????`,
    },
    "d06ea4a8-87f2-40b0-a235-bfae5e318be3": {
        [Language.English]: `Find the <span class="lg-text-highlighted">Right Battery</span>`,
        [Language.Hindi]: `?????`,
    },
    "976354a4-d9b7-414f-a717-dcffa9018f98": {
        [Language.English]: `For Your Three Wheeler`,
        [Language.Hindi]: `?????`,
    },
    "b568d9fc-34b7-48ba-adaf-0c05c9e24168": {
        [Language.English]: `Equip your auto, tempo, or any other three-wheeler with the right battery that delivers effortless efficiency. Use our battery finder to find your ideal battery.`,
        [Language.Hindi]: `?????`,
    },
    "ca013e47-dc92-49c5-be2d-411b99f72797": {
        [Language.English]: `Buying Guide`,
        [Language.Hindi]: `?????`,
    },
    "d957d3ac-7468-48a8-84bd-b73e6c8e0f98": {
        [Language.English]: `Download Catalogue`,
        [Language.Hindi]: `?????`,
    },
    "8262f4de-6523-4ea4-a68e-4df5cd684074": {
        [Language.English]: `Find My Battery`,
        [Language.Hindi]: `?????`,
    },
    "af9ad542-bdcc-4eb4-aa38-c87d36ec9bda": {
        [Language.English]: `What should I consider before auto battery?`,
        [Language.Hindi]: `?????`,
    },
    "d1db1197-f5ee-4126-9fc2-a554820c24b4": {
        [Language.English]: `Acknowledging that auto-rickshaws have compact engines and dynamos, they need a battery that not only charges rapidly but also supports multiple starts throughout the day. Additionally, a battery with an extended warranty and a robust design is advantageous. With these considerations, the Livguard Autoz series emerges as the top choice for auto batteries in the market.`,
        [Language.Hindi]: `?????`,
    },
    "adddec59-1e50-4af6-a40f-a0b1144464d1": {
        [Language.English]: `Can extreme winter affect my three wheeler battery?`,
        [Language.Hindi]: `?????`,
    },
    "03ed45bf-cd92-4800-b855-c88e8b73e543": {
        [Language.English]: `Yes, extreme winter can impact battery performance. However, Livguard's three-wheeler batteries are designed with advanced technology to withstand harsh weather conditions, ensuring consistent performance and longer life.`,
        [Language.Hindi]: `?????`,
    },
    "87a69e85-3480-486c-babf-fb05e6936a76": {
        [Language.English]: `How often should I replace my three-wheeler battery?`,
        [Language.Hindi]: `?????`,
    },
    "18fced89-0dde-4bef-a1ec-7b3929eb9434": {
        [Language.English]: `The replacement of a battery for a three-wheeler depends on usage and maintenance. However, on average, it might need replacement every 2-3 years. To ensure optimum performance and longevity, choosing a reliable brand like Livguard, known for its durability and excellent service, is recommended.`,
        [Language.Hindi]: `?????`,
    },
    "c442cd80-c2c3-4c56-91a9-30530b22d5e6": {
        [Language.English]: `What are some signs that my three-wheeler battery needs replacing?`,
        [Language.Hindi]: `?????`,
    },
    "77fa3233-d479-405c-9984-052c8fb751bc": {
        [Language.English]: `Signs that your three-wheeler battery might need replacement include slow engine crank, difficulty in starting the vehicle, dimming headlights, and weak horn. For a hassle-free ride, consider Livguard's auto batteries, known for their reliable performance and long-lasting service.`,
        [Language.Hindi]: `?????`,
    },
    "d760e95e-4074-4ec7-af0e-9c296cf4d41d": {
        [Language.English]: `What is the typical lifespan of a three-wheeler battery?`,
        [Language.Hindi]: `?????`,
    },
    "83afccfb-5c2b-4cd8-893c-4a9757b630f6": {
        [Language.English]: `The typical lifespan of a three-wheeler battery can vary, often lasting 3-5 years. However, Livguard Autoz series batteries, designed with advanced technology, deliver an extended lifespan along with superior performance and quick charging, enhancing the overall efficiency of your vehicle.`,
        [Language.Hindi]: `?????`,
    },

    //E Rickshaw batteries vernac start
    "67f761e4-5c9d-4ef7-87fa-df19fc2b92aa": {
        [Language.English]: `E-Rickshaw Chargers`,
        [Language.Hindi]: `?????`,
    },
    "45e0486f-a7d7-407a-82d2-7435396fde97": {
        [Language.English]: ` For Energizing Every Ride`,
        [Language.Hindi]: `?????`,
    },
    "91c8d137-eccb-4a0f-9799-3e2340ac54f7": {
        [Language.English]: `Make every journey count, with fast chargers for your E-Rickshaw vehicle`,
        [Language.Hindi]: `?????`,
    },
    "3e08230a-fc5d-4191-abfa-6b6be76e983f": {
        [Language.English]: `<span class="lg-text-highlighted">Unmatched Performance</span>`,
        [Language.Hindi]: `?????`,
    },
    "eb77dfed-047e-4fb7-bfb2-bbe06d128a93": {
        [Language.English]: `for Smooth Journeys`,
        [Language.Hindi]: `?????`,
    },
    "75c8e077-526b-4517-a52a-36a858dbb06e": {
        [Language.English]: `Enhanced Battery Life`,
        [Language.Hindi]: `?????`,
    },
    "61b03b16-b490-4ae2-95ff-ffd4ef994b9b": {
        [Language.English]: `Experience extended battery life with Livguard's e-rickshaw charger, which delicately nurtures your battery for longer, reliable rides.`,
        [Language.Hindi]: `?????`,
    },
    "d660f7e7-4945-4d60-ac65-ee35d44644c4": {
        [Language.English]: `Efficient Energy Usage`,
        [Language.Hindi]: `?????`,
    },
    "ea91df06-eee3-4f24-bac2-b4d0484c9c26": {
        [Language.English]: `Livguard's range of e-rickshaw chargers use less electricity, making your rides not just eco-friendly, but also pocket-friendly.`,
        [Language.Hindi]: `?????`,
    },
    "bbdf4cee-9f7c-475a-a464-ef1ef26204b8": {
        [Language.English]: `Efficient Water Usage`,
        [Language.Hindi]: `?????`,
    },
    "24233427-5ce6-4924-bea6-56eef727ef86": {
        [Language.English]: `Our chargers use less water during the charging process, to ensure the efficiency and longevity of your e-rickshaw battery.`,
        [Language.Hindi]: `?????`,
    },
    "8a8c6ad0-848e-4cdc-8570-3fc2d05abf5e": {
        [Language.English]: `Overcharge Protection`,
        [Language.Hindi]: `?????`,
    },
    "2dd6ceca-eaa9-4b31-89a2-60d1b54a1237": {
        [Language.English]: `Chargers made with built-in overcharge protection, to prevent battery damage and ensure reliable performance.`,
        [Language.Hindi]: `?????`,
    },
    "8b08775f-905e-4826-a595-9001b888bead": {
        [Language.English]: `Low Voltage Charging`,
        [Language.Hindi]: `?????`,
    },
    "48127946-a89e-46bc-95ec-1baf8e68b072": {
        [Language.English]: `Experience hassle-free charging with chargers that charge even during low input voltages, ensuring your journey never stops.`,
        [Language.Hindi]: `?????`,
    },
    "368be9b9-37b1-4c94-9b54-9c7b8bbea351": {
        [Language.English]: `<span class="lg-text-highlighted">Our Suggestions</span>`,
        [Language.Hindi]: `?????`,
    },
    "e102bc0e-f831-4631-abb2-60f166440bbe": {
        [Language.English]: `Based On Your Choice`,
        [Language.Hindi]: `?????`,
    },
    "3ae8e96f-5ed1-4f8c-8e2f-194f16674982": {
        [Language.English]: `Recommended`,
        [Language.Hindi]: `?????`,
    },
    "daa1c57b-8e64-4766-8c7b-e1cc4b7ad6af": {
        [Language.English]: `E-Shakti LG B0 ERFP 1500`,
        [Language.Hindi]: `?????`,
    },
    "c19e20cc-9aba-4be4-82af-c5ae4df4388c": {
        [Language.English]: `Find the suitable pick of e-rickshaw battery that fulfils your requirements with efficiency. Use our Buying Guide to get to know in detail about how you can buy your inverter and our Product Catalogue for product specifications`,
        [Language.Hindi]: `?????`,
    },
    "b384b853-774d-4227-b7e5-03dd24f5f1aa": {
        [Language.English]: `Warranty`,
        [Language.Hindi]: `?????`,
    },
    "da734ae5-dad1-4f03-9c87-179fd1df47df": {
        [Language.English]: `24 Months`,
        [Language.Hindi]: `?????`,
    },
    "b6a49b1c-fa41-4958-a2ed-79f87707416c": {
        [Language.English]: `Capacity`,
        [Language.Hindi]: `?????`,
    },
    "a40bbd47-d6bf-4e1c-8ab7-1287bb3c2836": {
        [Language.English]: `2000 VA / 24V`,
        [Language.Hindi]: `?????`,
    },
    "2d4c7020-d295-4227-a8bf-c4ba7e047228": {
        [Language.English]: `3D Grid`,
        [Language.Hindi]: `?????`,
    },
    "3778f571-6279-4606-87df-a2fa9de75495": {
        [Language.English]: `Longer Life`,
        [Language.Hindi]: `?????`,
    },
    "151dfac3-66f4-4aa0-be1a-d92228015ee2": {
        [Language.English]: `Dimensions`,
        [Language.Hindi]: `?????`,
    },
    "898383a9-ce03-49b8-8089-2f97e944e57d": {
        [Language.English]: `275 x 320 x 275 mm`,
        [Language.Hindi]: `?????`,
    },
    "ecd16719-acbe-4e6a-860b-7918b8f22367": {
        [Language.English]: `Explore Product`,
        [Language.Hindi]: `?????`,
    },
    "98c90c88-6fc4-4786-b130-a52ce614d5d0": {
        [Language.English]: `Discover More`,
        [Language.Hindi]: `?????`,
    },
    "73095405-033a-4718-b6de-e4d0b6dbc0f6": {
        [Language.English]: `E-Rickshaw <span class="lg-text-highlighted">Video Guide</span>`,
        [Language.Hindi]: `?????`,
    },
    "c52ecf6e-bc7d-4934-88d1-43660af8fe2d": {
        [Language.English]: `Featured Products`,
        [Language.Hindi]: `?????`,
    },
    "bdd593f6-18f6-47d2-af26-af2a71693731": {
        [Language.English]: `<span class="lg-text-highlighted">For Your E-Rickshaw</span> For You`,
        [Language.Hindi]: `?????`,
    },
    "66e82d76-b469-46b4-87fe-0e2b1a73118e": {
        [Language.English]: `Boost your rides with the perfect e-rickshaw charger. Refer to our Buying Guide for detailed purchasing information and explore our Product Catalogue for specifications.`,
        [Language.Hindi]: `?????`,
    },
    "c20eb3fa-8458-41e1-bd97-43b2fffd0d41": {
        [Language.English]: `Buying Guide`,
        [Language.Hindi]: `?????`,
    },
    "b49dbc60-f847-409f-bb7d-5af0301d3136": {
        [Language.English]: `Download Catalogue`,
        [Language.Hindi]: `?????`,
    },
    "eab21892-bbf3-4c28-9d48-b98ff57f3f55": {
        [Language.English]: `Find My Battery`,
        [Language.Hindi]: `?????`,
    },
    "fcf882cd-32fe-4605-ae76-ccc436083dc8": {
        [Language.English]: `How long does an e-rickshaw battery backup typically last?`,
        [Language.Hindi]: `?????`,
    },
    "9c01d6ce-aa22-4501-8e14-61c8c01595f0": {
        [Language.English]: `Typically, an e-rickshaw battery backup can last for around 70-100 km per charge depending on usage. However, Livguard e-rickshaw batteries are designed for longer-lasting performance, providing extended backup to keep you moving.`,
        [Language.Hindi]: `?????`,
    },
    "4f6beddb-8033-415a-aa74-4e7e0a0c3614": {
        [Language.English]: `When should i start looking for a new e rickshaw battery?`,
        [Language.Hindi]: `?????`,
    },
    "f0e5f88d-99dc-4f6e-8f67-4fbfba8311d6": {
        [Language.English]: `Consider replacing your e-rickshaw battery when you notice slower speeds, reduced range, or frequent power losses. Livguard's e-rickshaw batteries, designed with advanced technology for high cranking power and low maintenance, are a perfect replacement choice to ensure efficient performance.`,
        [Language.Hindi]: `?????`,
    },
    "d957964f-b824-40d0-8a81-0c2958f0505d": {
        [Language.English]: `Which is the best e rickshaw battery? `,
        [Language.Hindi]: `?????`,
    },
    "d486239a-3eed-49e6-aaf7-085f124ce7fd": {
        [Language.English]: `The best e-rickshaw battery balances performance, durability, and affordability. Livguard e-rickshaw batteries stand out with their superior technology, high cranking power, enhanced safety standards, and extended battery life, making them a top choice for consistent, powerful performance.`,
        [Language.Hindi]: `?????`,
    },
    "9f69d5c7-3b61-4452-bfa5-4e346343cfed": {
        [Language.English]: `How long can a 120Ah e-rickshaw battery last on a single charge?`,
        [Language.Hindi]: `?????`,
    },
    "b2832b89-7c80-4a76-82b0-d48f3e873ed9": {
        [Language.English]: `Typically, a 120Ah e-rickshaw battery can last quite long on a single charge depending on the usage and conditions. However, with Livguard's 120Ah e-rickshaw batteries, you can expect extended duration thanks to their superior design, advanced technology, and high energy density for consistent power supply.`,
        [Language.Hindi]: `?????`,
    },
    "79bd524d-8eef-453c-a170-8de1c9aff661": {
        [Language.English]: `How do I properly charge my e-rickshaw battery?`,
        [Language.Hindi]: `?????`,
    },
    "374a7225-1b73-4299-952e-e3af648d303d": {
        [Language.English]: `Properly charging your e-rickshaw battery involves a steady power source and ensuring complete charging cycles. Livguard's e-rickshaw batteries are designed for efficient charging, long life, and consistent power supply, ensuring your e-rickshaw performs optimally at all times with correct charging practices.`,
        [Language.Hindi]: `?????`,
    },
    "713355d6-1d59-4ecb-af08-1e9a651bddc1": {
        [Language.English]: `Top <span class="lg-text-highlighted">Tractor</span>`,
        [Language.Hindi]: `?????`,
    },
    "8993dcbc-2216-4dd2-954e-e8145571049f": {
        [Language.English]: `View More`,
        [Language.Hindi]: `?????`,
    },
    "ac9a30fb-5654-4692-9995-84c2dbe8301b": {
        [Language.English]: `Show Less`,
        [Language.Hindi]: `?????`,
    },
    "16052fa6-9c46-49f5-b3dc-a90ba4a0cd64": {
        [Language.English]: `Can an e-rickshaw charger recharge deeply discharged batteries?`,
        [Language.Hindi]: `?????`,
    },
    "276a2fc2-4ad5-46b1-8e1a-898f4ad48ac2": {
        [Language.English]: `E-rickshaw chargers can recharge deeply discharged batteries, but using the right charger is vital. Livguard's e-rickshaw battery chargers, designed with advanced technology, adeptly handle deeply discharged batteries, ensuring longevity and a consistent power supply.`,
        [Language.Hindi]: `?????`,
    },
    "d172e8a9-1a56-44ac-9624-f6909bc7ab64": {
        [Language.English]: `Can I use any charger for my e-rickshaw battery?`,
        [Language.Hindi]: `?????`,
    },
    "1b7d7fa0-ce6b-455f-8f4c-a042dea09650": {
        [Language.English]: `While some chargers do consume more power, it's not the same with every charger. Livguard's e-rickshaw chargers are engineered for energy efficiency, providing optimal charging without consuming excess electricity.`,
        [Language.Hindi]: `?????`,
    },
    "6d7b3095-b837-47c2-a733-55d13c7cbe32": {
        [Language.English]: `How can I maximize the performance of my e-rickshaw charger?`,
        [Language.Hindi]: `?????`,
    },
    "b9a59c4c-1212-4d95-9127-5cd030d7b940": {
        [Language.English]: `Low input voltage can often hamper the charging process. However, Livguard e-rickshaw chargers are designed to efficiently charge even in low voltage conditions, ensuring your vehicle is always ready for the road.`,
        [Language.Hindi]: `?????`,
    },
    "a5d60a5a-54f8-41aa-a381-fa75ff5d1b0c": {
        [Language.English]: `Who can I contact for E-Rickshawshaw charger repairing?`,
        [Language.Hindi]: `?????`,
    },
    "0479936a-0406-42b9-a22a-985b38cc4179": {
        [Language.English]: `For any repairs concerning your Livguard e-rickshaw charger, it's best to contact our dedicated service team. They can provide necessary guidance and arrange for a qualified technician to address the issue.  Simply call us at - 1800-1025-551`,
        [Language.Hindi]: `?????`,
    },
    "da71434e-3e83-47b4-bce6-087f5e55e293": {
        [Language.English]: `What E-Rickshawshaw battery charger specifications should I look for before buying?`,
        [Language.Hindi]: `?????`,
    },
    "db980c86-e5b7-4a2e-bb2c-f3cbbd6a952d": {
        [Language.English]: `Before purchasing an e-rickshaw battery charger, you should look for features like automatic cut-off, equalization capability, and compatibility with your battery type. Choosing a Livguard e-rickshaw charger assures you of all these specifications and more, offering a secure and efficient charging experience.`,
        [Language.Hindi]: `?????`,
    },
};
