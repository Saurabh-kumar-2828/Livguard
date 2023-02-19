import {Language} from "~/typeDefinitions";

export function getVernacularString(textContentPiece: string, language: Language): string {
    if (!(textContentPiece in vernacularStrings)) {
        // @ts-ignore
        return vernacularStrings["invalidKey"][language];
    }

    // @ts-ignore
    return vernacularStrings[textContentPiece][language];
}

// @ts-ignore
const vernacularStrings: {[textContentPiece: string]: {[language: Language]: string}} = {
    headerS1T1: {
        [Language.English]: "Customer Care: 18001025551",
        [Language.Hindi]: "ग्राहक सेवा: १८००१०२५५५१",
        [Language.Marathi]: "OOOOO",
    },
    headerS2T1: {
        [Language.English]: "Search",
        [Language.Hindi]: "यहाँ खोजें",
        [Language.Marathi]: "OOOOO",
    },

    headerMenuS1T1: {
        [Language.English]: "Inverters & Batteries",
        [Language.Hindi]: "OOOOO",
        [Language.Marathi]: "OOOOO",
    },
    headerMenuS1T2: {
        [Language.English]: "Automotive Batteries",
        [Language.Hindi]: "OOOOO",
        [Language.Marathi]: "OOOOO",
    },
    headerMenuS1T3: {
        [Language.English]: "Solar Solutions",
        [Language.Hindi]: "OOOOO",
        [Language.Marathi]: "OOOOO",
    },
    headerMenuS1T4: {
        [Language.English]: "Accesories",
        [Language.Hindi]: "OOOOO",
        [Language.Marathi]: "OOOOO",
    },
    headerMenuS1T5: {
        [Language.English]: "More",
        [Language.Hindi]: "OOOOO",
        [Language.Marathi]: "OOOOO",
    },
    headerMenuS2T1: {
        [Language.English]: "Contact Us",
        [Language.Hindi]: "OOOOO",
        [Language.Marathi]: "OOOOO",
    },

    homeS1T1: {
        [Language.English]: "Energy Unlimited",
        [Language.Hindi]: "असीमित ऊर्जा",
        [Language.Marathi]: "OOOOO",
    },
    homeS1T2: {
        [Language.English]: "For a Constantly Evolving World",
        [Language.Hindi]: "बदलते भारत के लिए",
        [Language.Marathi]: "OOOOO",
    },
    homeS1T3: {
        [Language.English]: "Get in Touch With Us",
        [Language.Hindi]: "बदलते भारत के लिए",
        [Language.Marathi]: "OOOOO",
    },
    homeS2T1: {
        [Language.English]: "Energy Storage Solutions",
        [Language.Hindi]: "ऊर्जा संग्रहण समाधान",
        [Language.Marathi]: "OOOOO",
    },
    homeS2T2: {
        [Language.English]: "To Power Up Your Future",
        [Language.Hindi]: "जिनसे आपका भविष्य रोशन हो",
        [Language.Marathi]: "OOOOO",
    },
    homeS2C1T1: {
        [Language.English]: "Best in Class Services",
        [Language.Hindi]: "अतुल्य सेवाएँ",
        [Language.Marathi]: "OOOOO",
    },
    homeS2C1T2: {
        [Language.English]:
            "Livguard leaves no crumbs when it comes to perfecting their manufacturing processes. With our expertise of over 35 years in battery making, we work to deliver quality products, every time.",
        [Language.Hindi]: "पूरे भारत में मौजूद 40+ सेवा केंद्रों के साथ लिवगार्ड आपकी असुविधाओं को दूर करने के लिए हमेशा एक कॉल दूर है। आपकी संतुष्टि हमारे लिए हमेशा सबसे महत्त्वपूर्ण है।",
        [Language.Marathi]: "OOOOO",
    },
    homeS2C2T1: {
        [Language.English]: "Excelling Manufacturing",
        [Language.Hindi]: "श्रेष्ठ उत्पादन",
        [Language.Marathi]: "OOOOO",
    },
    homeS2C2T2: {
        [Language.English]:
            "With a PAN India presence with 40+ service centers, Livguard is just one call away to cater to your energy storage related needs. We always keep your product satisfaction as our priority, and empower you with unlimited energy.",
        [Language.Hindi]:
            "लिवगार्ड अपनी उत्पादन प्रक्रियाओं को सर्वश्रेष्ठ बनाने में कोई कसर नहीं छोड़ता। हमारे 35+ वर्षों के अनुभव के साथ, हम ग्राहकों तक हमेशा अति-उत्तम समाधान पहुँचाने का प्रयत्न करते हैं।",
        [Language.Marathi]: "OOOOO",
    },
    homeS3H1T1: {
        [Language.English]: "Experience Our",
        [Language.Hindi]: `<span class=\"lg-text-highlighted\">असीमित ऊर्जा</span> के`,
        [Language.Marathi]: "OOOOO",
    },
    homeS3H1T2: {
        [Language.English]: `<span class=\"lg-text-highlighted\">Energy Solutions</span>`,
        [Language.Hindi]: "अनुभव का हिस्सा बनिये",
        [Language.Marathi]: "OOOOO",
    },
    homeS3Tab1H: {
        [Language.English]: "Automotive Batteries",
        [Language.Hindi]: "वाहन की बैटरी",
        [Language.Marathi]: "OOOOO",
    },
    homeS3Tab1HC1: {
        [Language.English]: "Energy Solutions",
        [Language.Hindi]: "ऊर्जा समाधान",
        [Language.Marathi]: "OOOOO",
    },
    homeS3Tab1HC2: {
        [Language.English]: "Automotive Batteries",
        [Language.Hindi]: "वाहन की बैटरी",
        [Language.Marathi]: "OOOOO",
    },
    homeS3Tab1C: {
        [Language.English]: "Experience limitless energy with our wide range range of automotive batteries, made to empower your fast-paced lifestyle with high performing products.",
        [Language.Hindi]:
            "ऑटोमोटिव बैटरियों की हमारी विस्तृत श्रृंखला के साथ असीमित ऊर्जा का अनुभव करें, जो उच्च प्रदर्शन वाले उत्पादों के साथ आपकी तेज़-तर्रार जीवन शैली को सशक्त बनाने के लिए बनाई गई है।",
        [Language.Marathi]: "OOOOO",
    },
    homeS3Tab1BT: {
        [Language.English]: "Explore Batteries",
        [Language.Hindi]: "बैटरी देखें",
        [Language.Marathi]: "OOOOO",
    },
    homeS3Tab2H: {
        [Language.English]: "Home Inverters",
        [Language.Hindi]: "घर के इन्वर्टर",
        [Language.Marathi]: "OOOOO",
    },
    homeS3Tab2HC1: {
        [Language.English]: "Energy Solutions",
        [Language.Hindi]: "ऊर्जा समाधान",
        [Language.Marathi]: "OOOOO",
    },
    homeS3Tab2HC2: {
        [Language.English]: "Home Inverters",
        [Language.Hindi]: "घर के इन्वर्टर",
        [Language.Marathi]: "OOOOO",
    },
    homeS3Tab2C: {
        [Language.English]:
            "Visit our range of home inverters with sleek design made to bring unlimited flow of energy to your home. Backed by its sturdy build, pick the one that suits your home the best.",
        [Language.Hindi]:
            "आपके घर में ऊर्जा का असीमित प्रवाह लाने के लिए आकर्षक बनावट वाले होम इनवर्टर की हमारी श्रेणी पर जाएं। इसके मजबूत निर्माण के साथ, वह चुनें जो आपके घर के लिए सबसे उपयुक्त हो।",
        [Language.Marathi]: "OOOOO",
    },
    homeS3Tab2BT: {
        [Language.English]: "Explore Inverters",
        [Language.Hindi]: "इनवर्टर देखें",
        [Language.Marathi]: "OOOOO",
    },
    homeS3Tab3H: {
        [Language.English]: "Inverter Batteries",
        [Language.Hindi]: "इन्वर्टर बैटरी",
        [Language.Marathi]: "OOOOO",
    },
    homeS3Tab3HC1: {
        [Language.English]: "Energy Solutions",
        [Language.Hindi]: "ऊर्जा समाधान",
        [Language.Marathi]: "OOOOO",
    },
    homeS3Tab3HC2: {
        [Language.English]: "Inverter Batteries",
        [Language.Hindi]: "इन्वर्टर बैटरी",
        [Language.Marathi]: "OOOOO",
    },
    homeS3Tab3C: {
        [Language.English]: "With industry’s first 3D grid technology, our range of inverter batteries are manufactured to meet the power backup requirements of your family efficiently.",
        [Language.Hindi]: "उद्योग की सबसे पहली 3डी ग्रिड तकनीक के साथ, हमारी इन्वर्टर बैटरी की श्रेणी आपके परिवार की पावर बैकअप आवश्यकताओं को कुशलतापूर्वक पूरा करने के लिए निर्मित की जाती है।",
        [Language.Marathi]: "OOOOO",
    },
    homeS3Tab3BT: {
        [Language.English]: "Explore Batteries",
        [Language.Hindi]: "बैटरी देखें",
        [Language.Marathi]: "OOOOO",
    },
    homeS3Tab4H: {
        [Language.English]: "Solar Solutions",
        [Language.Hindi]: "सौर समाधान",
        [Language.Marathi]: "OOOOO",
    },
    homeS3Tab4HC1: {
        [Language.English]: "Energy Solutions",
        [Language.Hindi]: "ऊर्जा समाधान",
        [Language.Marathi]: "OOOOO",
    },
    homeS3Tab4HC2: {
        [Language.English]: "Solar Solutions",
        [Language.Hindi]: "सौर समाधान",
        [Language.Marathi]: "OOOOO",
    },
    homeS3Tab4C: {
        [Language.English]:
            "Solutions made to fit your specific needs, precisely. We are the experts in Solar Rooftop Solutions, which equip us to always bring the best in class products for your needs.",
        [Language.Hindi]:
            "आपकी विशिष्ट आवश्यकताओं को पूरा करने के लिए लाये गये सटीक समाधान। हम सोलर रूफटॉप समाधान के विशेषज्ञ हैं, जो हमें हमेशा आपकी जरूरतों के लिए श्रेणी में सर्वश्रेष्ठ उत्पाद लाने के लिए तैयार करते हैं।",
        [Language.Marathi]: "OOOOO",
    },
    homeS3Tab4BT: {
        [Language.English]: "Explore Solar",
        [Language.Hindi]: "सौर देखें",
        [Language.Marathi]: "OOOOO",
    },
    homeS3Tab5H: {
        [Language.English]: "Other Accessories",
        [Language.Hindi]: "सहायक उपकरण",
        [Language.Marathi]: "OOOOO",
    },
    homeS3Tab5HC1: {
        [Language.English]: "Energy Solutions",
        [Language.Hindi]: "ऊर्जा समाधान",
        [Language.Marathi]: "OOOOO",
    },
    homeS3Tab5HC2: {
        [Language.English]: "Other Accessories",
        [Language.Hindi]: "सहायक उपकरण",
        [Language.Marathi]: "OOOOO",
    },
    homeS3Tab5C: {
        [Language.English]: "Explore accessories which perfectly compliment your products, with our curated range of choices. Built with the finest materials, these accessories will last long.",
        [Language.Hindi]: "हमारे सहायक उपकरणों की श्रेणी आपके घर की ज़रूरतों को भली भाँति समझ कर उनको बेहतर बनाते हैं । यह उपकरण श्रेष्ठ सामग्री से बने हैं जो सालों साल आपका साथ देंगे।",
        [Language.Marathi]: "OOOOO",
    },
    homeS3Tab5BT: {
        [Language.English]: "Explore Accesories",
        [Language.Hindi]: "उपकरण देखें",
        [Language.Marathi]: "OOOOO",
    },
    homeS4H1T1: {
        [Language.English]: "We Are",
        [Language.Hindi]: "हम श्रेणी में",
        [Language.Marathi]: "OOOOO",
    },
    homeS4H1T2: {
        [Language.English]: `<span class=\"lg-text-highlighted\">One of A Kind</span>`,
        [Language.Hindi]: `<span class=\"lg-text-highlighted\">सबसे अलग हैं</span>`,
        [Language.Marathi]: "OOOOO",
    },
    homeS4T2: {
        [Language.English]: "With Livguard, you are always in trusted hands",
        [Language.Hindi]: "लिवगार्ड के साथ आप हमेशा भरोसेमंद हाथों में हैं",
        [Language.Marathi]: "OOOOO",
    },
    homeS4T3: {
        [Language.English]:
            "In just 9 years, Livguard has become the fastest-growing Energy Storage Solutions brand. Our zeal to develop a complete and connected ecosystem of happy customers, committed partners, & the best quality every time has made us the choice of people nationwide.",
        [Language.Hindi]:
            "केवल 9 वर्षों में, लिवगार्ड सबसे तेज़ी से बढ़ने वाला ऊर्जा संग्रहण समाधान का ब्रांड बन गया है। हमारा पूर्ण रूप से बनाया गया संतुष्ट ग्राहकों और डीलरों का नेटवर्क हमे उनकी सबसे पहली पसंद बनाता है।",
        [Language.Marathi]: "OOOOO",
    },
    homeS5H1T1: {
        [Language.English]: "Take Charge of Your Energy",
        [Language.Hindi]: "अपनी ऊर्जा ज़रूरतों को जानें",
        [Language.Marathi]: "OOOOO",
    },
    homeS5H1T2: {
        [Language.English]: `With Our <span class=\"lg-text-highlighted\">Power Planner</span>`,
        [Language.Hindi]: `हमारे <span class=\"lg-text-highlighted\">पावर प्लानर</span> के साथ`,
        [Language.Marathi]: "OOOOO",
    },
    homeS5T2: {
        [Language.English]: "Get tailored power solutions, use our Power Planner to find the right inverter and inverter battery options for your home.",
        [Language.Hindi]: "आपकी ज़रूरत के अनुसार समाधान पायें। हमारे पावर प्लानर का इस्तेमाल कर के अपने घर के लिए सही इन्वर्टर और इन्वर्टर बैटरी चुनें",
        [Language.Marathi]: "OOOOO",
    },
    homeS5T3: {
        [Language.English]: "Maximize your Power Potential in 3 easy steps!",
        [Language.Hindi]: "3 आसान चरणों में अपनी ऊर्जा ज़रूरतें निकालें",
        [Language.Marathi]: "OOOOO",
    },
    homeS5Step1T1: {
        [Language.English]: "Step1 :",
        [Language.Hindi]: "चरण 1:",
        [Language.Marathi]: "OOOOO",
    },
    homeS5Step1T2: {
        [Language.English]: "Choose your property type",
        [Language.Hindi]: "अपने घर का आकार चुनें",
        [Language.Marathi]: "OOOOO",
    },
    homeS5Step2T1: {
        [Language.English]: "Step2 :",
        [Language.Hindi]: "चरण 2:",
        [Language.Marathi]: "OOOOO",
    },
    homeS5Step2T2: {
        [Language.English]: "Add your preferred devices",
        [Language.Hindi]: "अपने पसंदीदा उपकरण जोड़ें",
        [Language.Marathi]: "OOOOO",
    },
    homeS5Step3T1: {
        [Language.English]: "Step3 :",
        [Language.Hindi]: "चरण 3:",
        [Language.Marathi]: "OOOOO",
    },
    homeS5Step3T2: {
        [Language.English]: "Set your required backup hours and average load consumption",
        [Language.Hindi]: "ज़रूरत अनुसार बैकअप के घंटे और औसत लोड खपत चुनें",
        [Language.Marathi]: "OOOOO",
    },
    homeS5T5P1: {
        [Language.English]: "Let’s start your power planning",
        [Language.Hindi]: "अपनी पावर प्लानिंग शुरू करें",
        [Language.Marathi]: "OOOOO",
    },
    homeS5T5P2: {
        [Language.English]: "Choose your property type",
        [Language.Hindi]: "अपने घर का आकार चुनें",
        [Language.Marathi]: "OOOOO",
    },
    homeS5T6: {
        [Language.English]: "Let’s Plan",
        [Language.Hindi]: "नतीजा निकालें",
        [Language.Marathi]: "OOOOO",
    },
    homeS6H1T1: {
        [Language.English]: `<span class=\"lg-text-highlighted\">Transforming Lives</span> With`,
        [Language.Hindi]: `ग्राहकों के <span class=\"lg-text-highlighted\">बदलते जीवन</span>`,
        [Language.Marathi]: "OOOOO",
    },
    homeS6H1T2: {
        [Language.English]: "Energy Storage Solutions",
        [Language.Hindi]: "ऊर्जा संग्रहण समाधानों से",
        [Language.Marathi]: "OOOOO",
    },
    homeS7H1T1: {
        [Language.English]: "Pioneers in Rooftop",
        [Language.Hindi]: "OOOOO",
        [Language.Marathi]: "OOOOO",
    },
    homeS7H1T2: {
        [Language.English]: `<span class=\"lg-text-highlighted\">Solar Solutions</span>`,
        [Language.Hindi]: `<span class=\"lg-text-highlighted\">OOOOO</span>`,
        [Language.Marathi]: "OOOOO",
    },
    homeS7T2: {
        [Language.English]: "Powered by passion and fuelled by innovation, we have established ourself as the experts in the Solar Energy Solutions sector.",
        [Language.Hindi]: "आधुनिकता से प्रेरित और जुनून लेकर हम्मे ख़ुद को सौर ऊर्जा समाधानों के क्षेत्र में विशेषज्ञों के रूप में स्थापित किया है।",
        [Language.Marathi]: "OOOOO",
    },
    homeS7T3: {
        [Language.English]: "With Livguard Solar, Get",
        [Language.Hindi]: "लिवगार्ड सौर ऊर्जा के साथ पाइए",
        [Language.Marathi]: "OOOOO",
    },
    homeS7T4: {
        [Language.English]: "Tap Into Solar",
        [Language.Hindi]: "सौर ऊर्जा अनुभव करें",
        [Language.Marathi]: "OOOOO",
    },
    homeS7S1T1: {
        [Language.English]: "Tailor Made\nEnd-To-End Solutions",
        [Language.Hindi]: "OOOOO",
        [Language.Marathi]: "OOOOO",
    },
    homeS7S1T2: {
        [Language.English]: "Through our service experts and tools, we make sure that our solutions always fit your exact needs.",
        [Language.Hindi]: "OOOOO",
        [Language.Marathi]: "OOOOO",
    },
    homeS7S2T1: {
        [Language.English]: "OOOOO",
        [Language.Hindi]: "OOOOO",
        [Language.Marathi]: "OOOOO",
    },
    homeS7S2T2: {
        [Language.English]: "OOOOO",
        [Language.Hindi]: "OOOOO",
        [Language.Marathi]: "OOOOO",
    },
    homeS7S3T1: {
        [Language.English]: "OOOOO",
        [Language.Hindi]: "OOOOO",
        [Language.Marathi]: "OOOOO",
    },
    homeS7S3T2: {
        [Language.English]: "OOOOO",
        [Language.Hindi]: "OOOOO",
        [Language.Marathi]: "OOOOO",
    },
    homeS8H1T1: {
        [Language.English]: "Meet Our",
        [Language.Hindi]: "मिलिए हमारे",
        [Language.Marathi]: "OOOOO",
    },
    homeS8H1T2: {
        [Language.English]: `<span class=\"lg-text-highlighted\">Leadership</span>`,
        [Language.Hindi]: `<span class=\"lg-text-highlighted\">मार्गदर्शकों</span> से`,
        [Language.Marathi]: "OOOOO",
    },
    homeS8Slide1T1: {
        [Language.English]: "Mr. Rakesh Malhotra ",
        [Language.Hindi]: "श्री. राकेश मल्होत्रा",
        [Language.Marathi]: "OOOOO",
    },
    homeS8Slide1T2: {
        [Language.English]: "(Founder & Mentor)",
        [Language.Hindi]: "(संस्थापक और संरक्षक)",
        [Language.Marathi]: "OOOOO",
    },
    homeS8Slide1T3: {
        [Language.English]:
            "A leader, a mentor, a visionary, and an overall driving force, Mr. Rakesh Malhotra's exposure to the industry, his passion and his spirit to bring new and innovative ideas to life continues to motivate many other entrepreneurs.",
        [Language.Hindi]:
            "एक मार्गदर्शक , एक संरक्षक, एक दूरदर्शी, और एक समग्र प्रेरक शक्ति, श्री राकेश मल्होत्रा ​​​​का उद्योग के संपर्क में, उनका जुनून और नए विचारों को जीवन में लाने की उनकी भावना कई अन्य उद्यमियों को प्रेरित करती रही है।",
        [Language.Marathi]: "OOOOO",
    },
    homeS9H1T1: {
        [Language.English]: "Frequently Asked",
        [Language.Hindi]: "अक्सर पूछे जाने",
        [Language.Marathi]: "OOOOO",
    },
    homeS9H1T2: {
        [Language.English]: `<span class=\"lg-text-highlighted\">Questions</span>`,
        [Language.Hindi]: `वाले <span class=\"lg-text-highlighted\"> सवाल</span>`,
        [Language.Marathi]: "OOOOO",
    },
    homeS9Q1Q: {
        [Language.English]: "What are inverter batteries and how do they operate?",
        [Language.Hindi]: "इन्वर्टर बैटरी क्या हैं और वे कैसे काम करती हैं?",
        [Language.Marathi]: "OOOOO",
    },
    homeS9Q1A: {
        [Language.English]: "The inverter/UPS receives electrical energy in the form of stored chemical energy from the inverter batteries, and the other way around.",
        [Language.Hindi]: "इन्वर्टर / यूपीएस इन्वर्टर बैटरी से संग्रहीत रासायनिक ऊर्जा के रूप में विद्युत ऊर्जा प्राप्त करता है, और दूसरी तरफ।",
        [Language.Marathi]: "OOOOO",
    },
    homeS9Q2Q: {
        [Language.English]: "How can a home choose the best inverter battery?",
        [Language.Hindi]: "अपने घर हेतु सर्वेश्रेष्ठ इन्वर्टर का चुनाव कैसे करे?",
        [Language.Marathi]: "OOOOO",
    },
    homeS9Q2A: {
        [Language.English]: "This is dependent on how much power you need at home. All of your appliances can use Livguard inverters, which are created to meet their demands.",
        [Language.Hindi]: "यह इस बात पर निर्भर है कि आपको घर में कितनी बिजली की जरूरत है। आपके सभी उपकरण लिवगार्ड इनवर्टर का उपयोग कर सकते हैं, जो उनकी मांगों को पूरा करने के लिए बनाए गए हैं।",
        [Language.Marathi]: "OOOOO",
    },
    homeS9Q3Q: {
        [Language.English]: "How much backup time can my inverter battery provide?",
        [Language.Hindi]: "मेरी इन्वर्टर बैटरी कितना बैकअप समय प्रदान कर सकती है?",
        [Language.Marathi]: "OOOOO",
    },
    homeS9Q3A: {
        [Language.English]:
            "A battery's capacity for charging is expressed in ampere hours (Ah). An inverter battery's capacity is 1Ah if it can deliver 1 amp of electricity for 1 hour. The battery's capacity is 100Ah if it can deliver one amp of electricity for 100 hours. By calculating the load requirements by the number of hours of backup you require, you may determine the amount of inverter battery capacity needed for your home.",
        [Language.Hindi]:
            "चार्ज करने के लिए बैटरी की क्षमता एम्पीयर घंटे (आह) में व्यक्त की जाती है। एक इन्वर्टर बैटरी की क्षमता 1Ah है यदि यह 1 घंटे के लिए 1 amp बिजली दे सकती है। बैटरी की क्षमता सौAh है अगर यह सौ घंटे के लिए एक  एम्पेयर बिजली दे सकती है। आपके द्वारा आवश्यक बैकअप के घंटों की संख्या से लोड आवश्यकताओं की गणना करके, आप अपने घर के लिए आवश्यक इन्वर्टर बैटरी क्षमता की मात्रा निर्धारित कर सकते हैं।",
        [Language.Marathi]: "OOOOO",
    },
    homeS9T2P1: {
        [Language.English]: "Got questions on your mind?",
        [Language.Hindi]: "क्या आपके मन में कुछ सवाल हैं?",
        [Language.Marathi]: "OOOOO",
    },
    homeS9T2P2: {
        [Language.English]: "Find your answers here",
        [Language.Hindi]: "अपने सभी जवाब यहाँ पाइए",
        [Language.Marathi]: "OOOOO",
    },
    homeS9T3P1: {
        [Language.English]: "Looking for service resolution?",
        [Language.Hindi]: "सेवा समाधान की खोज में?",
        [Language.Marathi]: "OOOOO",
    },
    homeS9T3P2: {
        [Language.English]: "Contact us at +91 18001025551 at any day of the week between 8 am to 8 pm, and our team will resolve it within 48 hours!",
        [Language.Hindi]: "हम सप्ताह के सभी दिन सुबह 8 बजे से रात 8 बजे के बीच +91 18001025551 पर उपलब्ध हैं।हम आपकी समस्या का समाधान 48 घंटों के अंदर करेंगे!",
        [Language.Marathi]: "OOOOO",
    },
    homeS10H1T1: {
        [Language.English]: "We Are",
        [Language.Hindi]: "हम हर",
        [Language.Marathi]: "OOOOO",
    },
    homeS10H1T2: {
        [Language.English]: `<span class=\"lg-text-highlighted\">Everywhere!</span>`,
        [Language.Hindi]: `<span class=\"lg-text-highlighted\">जगह हैं!</span>`,
        [Language.Marathi]: "OOOOO",
    },
    homeS10T2: {
        [Language.English]: "Available Across 21000+ Pincodes",
        [Language.Hindi]: "21000+ पिन कोड में उपलब्ध",
        [Language.Marathi]: "OOOOO",
    },
    homeS10T3: {
        [Language.English]: "Find My Dealer",
        [Language.Hindi]: "नज़दीकी डीलर खोजें",
        [Language.Marathi]: "OOOOO",
    },
    homeS11H1T1: {
        [Language.English]: "Shower Some Love",
        [Language.Hindi]: "प्यार बरसाएं हमारे",
        [Language.Marathi]: "OOOOO",
    },
    homeS11H1T2: {
        [Language.English]: `On Our <span class=\"lg-text-highlighted\">Social Handles</span>`,
        [Language.Hindi]: `<span class=\"lg-text-highlighted\">सोशल हैंडल</span> पर!`,
        [Language.Marathi]: "OOOOO",
    },
    homeS11T2: {
        [Language.English]: "Find Us On",
        [Language.Hindi]: "हमें यहाँ तलाशें",
        [Language.Marathi]: "OOOOO",
    },
    homeS12H1T1: {
        [Language.English]: `Powerful <span class=\"lg-text-highlighted\">Purpose</span>`,
        [Language.Hindi]: `शक्तिशाली <span class=\"lg-text-highlighted\">उद्देश्य</span>`,
        [Language.Marathi]: "OOOOO",
    },
    homeS12H1T2: {
        [Language.English]: "Powerful Impact",
        [Language.Hindi]: "शक्तिशाली प्रभाव",
        [Language.Marathi]: "OOOOO",
    },
    homeS12T2: {
        [Language.English]:
            "Livguard, through its Corporate Social Responsibility, fulfills its commitment towards the community. We persistently make efforts to bring an impact on the lives of people around us with significant actions in the fields of",
        [Language.Hindi]:
            "लिवगार्ड, अपने कॉर्पोरेट सामाजिक उत्तरदायित्व के माध्यम से, समुदाय के प्रति अपनी ज़िम्मेदारियों को पूरा करता है। हम लगातार अपने आसपास के लोगों के जीवन पर प्रभाव लाने के लिए महत्वपूर्ण कार्यों के साथ प्रयास करते हैं, निम्नलिखित क्षेत्रों में",
        [Language.Marathi]: "OOOOO",
    },
    homeS12T3P1: {
        [Language.English]: "Education Promotion",
        [Language.Hindi]: "शिक्षा क्षेत्र",
        [Language.Marathi]: "OOOOO",
    },
    homeS12T3P2: {
        [Language.English]: "Healthcare Promotion",
        [Language.Hindi]: "स्वास्थ्य क्षेत्र",
        [Language.Marathi]: "OOOOO",
    },
    homeS12T3P3: {
        [Language.English]: "Livelihood Promotion",
        [Language.Hindi]: "आजीविका क्षेत्र",
        [Language.Marathi]: "OOOOO",
    },
    homeS12T3P4: {
        [Language.English]: "Ensuring Environmental Stability",
        [Language.Hindi]: "पर्यावरणीय स्थिरता क्षेत्र",
        [Language.Marathi]: "OOOOO",
    },

    landingPage1S1T1: {
        [Language.English]: "Empowering India With Unlimited Energy",
        [Language.Hindi]: "सशक्त भारत के लिए असीमित ऊर्जा",
        [Language.Marathi]: "OOOOO",
    },
    landingPage1S1T2: {
        [Language.English]: "Transition into a world of Futuristic Products backed by Unmatched Quality",
        [Language.Hindi]: "बेजोड़ गुणों से बने आधुनिक उपकरणों का अनुभव करें ",
        [Language.Marathi]: "OOOOO",
    },
    landingPage1S1T3: {
        [Language.English]: "Connect Now",
        [Language.Hindi]: "संपर्क करें",
        [Language.Marathi]: "OOOOO",
    },
    landingPageS3HT1: {
        [Language.English]: "Quality Meets",
        [Language.Hindi]: `गुणवत्ता और <span class="lg-text-highlighted">विशेषज्ञता</span>`,
        [Language.Marathi]: "OOOOO",
    },
    landingPageS3HT2: {
        [Language.English]: `<span class="lg-text-highlighted">Expertise</span>`,
        [Language.Hindi]: "का मेल",
        [Language.Marathi]: "OOOOO",
    },
    landingPageS3Box1T1: {
        [Language.English]: "21000+",
        [Language.Hindi]: "21000+",
        [Language.Marathi]: "OOOOO",
    },
    landingPageS3Box1T2: {
        [Language.English]: "Pincodes Served",
        [Language.Hindi]: "पिन कोड में उपलब्ध",
        [Language.Marathi]: "OOOOO",
    },
    landingPageS3Box2T1: {
        [Language.English]: "40+",
        [Language.Hindi]: "40+",
        [Language.Marathi]: "OOOOO",
    },
    landingPageS3Box2T2: {
        [Language.English]: "Service Centres",
        [Language.Hindi]: "सेवा केंद्र",
        [Language.Marathi]: "OOOOO",
    },
    landingPageS3Box3T1: {
        [Language.English]: "4000+",
        [Language.Hindi]: "4000+",
        [Language.Marathi]: "OOOOO",
    },
    landingPageS3Box3T2: {
        [Language.English]: "Dealers & Distributors",
        [Language.Hindi]: "डीलर और वितरक",
        [Language.Marathi]: "OOOOO",
    },
    landingPageS3Box4T1: {
        [Language.English]: "1 Cr+",
        [Language.Hindi]: "1 Cr+",
        [Language.Marathi]: "OOOOO",
    },
    landingPageS3Box4T2: {
        [Language.English]: "Happy Customers",
        [Language.Hindi]: "सुखी ग्राहक",
        [Language.Marathi]: "OOOOO",
    },
    landingPage2S1T1: {
        [Language.English]: "Go Limitless with Best in Class Products",
        [Language.Hindi]: "उत्तमता जो आपको असीमित बनाये",
        [Language.Marathi]: "OOOOO",
    },
    landingPage2S1T2: {
        [Language.English]: "Made with experience and manufactured till perfection",
        [Language.Hindi]: "अपनी कला में अनुभव रखने वाले माहिर लोगों द्वारा बनाये गये उत्पाद",
        [Language.Marathi]: "OOOOO",
    },
    landingPage2S1T3: {
        [Language.English]: "Connect Now",
        [Language.Hindi]: "संपर्क करें",
        [Language.Marathi]: "OOOOO",
    },
    landingPage2S4HT1: {
        [Language.English]: "Explore Unlimited Energy",
        [Language.Hindi]: "इन्वर्टर और बैटरी की",
        [Language.Marathi]: "OOOOO",
    },
    landingPage2S4HT2: {
        [Language.English]: `With Our Top <span class="lg-text-highlighted">Jodis</span>`,
        [Language.Hindi]: `बेहतरीन <span class="lg-text-highlighted">जोड़ियाँ</span> आपके लिए`,
        [Language.Marathi]: "OOOOO",
    },
    landingPage2S4CTABT: {
        [Language.English]: "Know More",
        [Language.Hindi]: "अधिक जानिए",
        [Language.Marathi]: "OOOOO",
    },
    landingPage2S4J1Title: {
        [Language.English]: "The Urban Combo",
        [Language.Hindi]: "OOOOO",
        [Language.Marathi]: "OOOOO",
    },
    landingPage2S4KeySpecificationTitle: {
        [Language.English]: "Key Specifications of The Jodi",
        [Language.Hindi]: "OOOOO",
        [Language.Marathi]: "OOOOO",
    },

    landingPage2S4J1Description: {
        [Language.English]: "OOOOO",
        [Language.Hindi]: "OOOOO",
        [Language.Marathi]: "OOOOO",
    },
    landingPage2S4J1Specification1Title: {
        [Language.English]: "OOOOO",
        [Language.Hindi]: "OOOOO",
        [Language.Marathi]: "OOOOO",
    },
    landingPage2S4J1Specification1Content: {
        [Language.English]: "OOOOO",
        [Language.Hindi]: "OOOOO",
        [Language.Marathi]: "OOOOO",
    },
    landingPage2S4J1Specification2Title: {
        [Language.English]: "OOOOO",
        [Language.Hindi]: "OOOOO",
        [Language.Marathi]: "OOOOO",
    },
    landingPage2S4J1Specification2Content: {
        [Language.English]: "OOOOO",
        [Language.Hindi]: "OOOOO",
        [Language.Marathi]: "OOOOO",
    },
    landingPage2S4J1Specification3Title: {
        [Language.English]: "OOOOO",
        [Language.Hindi]: "OOOOO",
        [Language.Marathi]: "OOOOO",
    },
    landingPage2S4J1Specification3Content: {
        [Language.English]: "OOOOO",
        [Language.Hindi]: "OOOOO",
        [Language.Marathi]: "OOOOO",
    },
    landingPage2S4J1Specification4Title: {
        [Language.English]: "OOOOO",
        [Language.Hindi]: "OOOOO",
        [Language.Marathi]: "OOOOO",
    },
    landingPage2S4J1Specification4Content: {
        [Language.English]: "OOOOO",
        [Language.Hindi]: "OOOOO",
        [Language.Marathi]: "OOOOO",
    },

    landingPage2S5HT1: {
        [Language.English]: "Why",
        [Language.Hindi]: `<span class="lg-text-highlighted"> लिवगार्ड जोड़ी </span>`,
        [Language.Marathi]: "OOOOO",
    },
    landingPage2S5HT2: {
        [Language.English]: `<span class="lg-text-highlighted">Livguard Jodi?</span>`,
        [Language.Hindi]: "बेहतर क्यों  है",
        [Language.Marathi]: "OOOOO",
    },
    landingPage2S5LivH: {
        [Language.English]: "Livguard",
        [Language.Hindi]: "लिवगार्ड",
        [Language.Marathi]: "OOOOO",
    },
    landingPage2S5T1: {
        [Language.English]: "AI Charing",
        [Language.Hindi]: "एआई चार्जिंग",
        [Language.Marathi]: "OOOOO",
    },
    landingPage2S5T2: {
        [Language.English]: "3D Grid Technology",
        [Language.Hindi]: "3डी ग्रिड तकनीक",
        [Language.Marathi]: "OOOOO",
    },
    landingPage2S5T3: {
        [Language.English]: "Longer Life",
        [Language.Hindi]: "लंबी अवधि",
        [Language.Marathi]: "OOOOO",
    },
    landingPage2S5T4: {
        [Language.English]: "Better Battery Compatibility",
        [Language.Hindi]: "बेहतर बैटरी संगति",
        [Language.Marathi]: "OOOOO",
    },
    landingPage2S5OBH: {
        [Language.English]: "Other Brand",
        [Language.Hindi]: "अन्य ब्रांड",
        [Language.Marathi]: "OOOOO",
    },
    landingPage2S7HT1: {
        [Language.English]: "Explore our",
        [Language.Hindi]: "आपके लिए",
        [Language.Marathi]: "OOOOO",
    },
    landingPage2S7HT2: {
        [Language.English]: `<span class="lg-text-highlighted">Star Products</span>`,
        [Language.Hindi]: `हमारे सबसे <span class="lg-text-highlighted">बेहतरीन उत्पाद</span>`,
        [Language.Marathi]: "OOOOO",
    },
    landingPage2S7CTABT: {
        [Language.English]: "View product",
        [Language.Hindi]: "विस्तार से देखें",
        [Language.Marathi]: "OOOOO",
    },

    landingPage3S1T1: {
        [Language.English]: "Smart & Strong Inverter and Battery Jodis",
        [Language.Hindi]: "स्मार्ट और दमदार इन्वर्टर और बैटरी की जोड़ी",
        [Language.Marathi]: "OOOOO",
    },
    landingPage3S1T2: {
        [Language.English]: "Empower your home with the perfect jodi to compliment your home needs",
        [Language.Hindi]: "अपने घर की जरूरतों को पूरा करने के लिए सही जोड़ी के साथ अपने घर को सशक्त बनाएं",
        [Language.Marathi]: "OOOOO",
    },
    landingPage3S1T3: {
        [Language.English]: "Connect Now",
        [Language.Hindi]: "संपर्क करें",
        [Language.Marathi]: "OOOOO",
    },
    landingPage3S3T1: {
        [Language.English]: "Enter Location,city or Pincode",
        [Language.Hindi]: "OOOOO",
        [Language.Marathi]: "OOOOO",
    },
    landingPage3S3T2: {
        [Language.English]: "Use Current Location",
        [Language.Hindi]: "OOOOO",
        [Language.Marathi]: "OOOOO",
    },
    landingPage3S3T3: {
        [Language.English]: "Find My Dealer",
        [Language.Hindi]: "OOOOO",
        [Language.Marathi]: "OOOOO",
    },

    landingPage3S7HT1: {
        [Language.English]: `Tap Into <span class="lg-text-highlighted">Efficiency</span>`,
        [Language.Hindi]: "लिवगार्ड जोड़ी के साथ",
        [Language.Marathi]: "OOOOO",
    },
    landingPage3S7HT2: {
        [Language.English]: "With Livguard Jodis",
        [Language.Hindi]: `<span class="lg-text-highlighted"> क्षमता </span> में निवेश करें`,
        [Language.Marathi]: "OOOOO",
    },

    landingPage3S7Slide1Heading: {
        [Language.English]: "Effortless Compatibility",
        [Language.Hindi]: "सहज अनुकूलता",
        [Language.Marathi]: "OOOOO",
    },
    landingPage3S7Slide1Ccontent: {
        [Language.English]: "Livguard inverter and inverter battery jodis offer a seamless compatibility which combine together for an uninterrupted flow of energy.",
        [Language.Hindi]: "लिवगार्ड इन्वर्टर और इन्वर्टर बैटरी जोड़ी एक सहज अनुकूलता प्रदान करते हैं जो ऊर्जा के बिना रुकावट प्रवाह के लिए एक साथ जुड़ते हैं।",
        [Language.Marathi]: "OOOOO",
    },
    landingPage3S7Slide1BT: {
        [Language.English]: "OOOOO",
        [Language.Hindi]: "OOOOO",
        [Language.Marathi]: "OOOOO",
    },
    landingPage3S7Slide2Heading: {
        [Language.English]: "Seamless Service",
        [Language.Hindi]: "निरंतर सेवा",
        [Language.Marathi]: "OOOOO",
    },
    landingPage3S7Slide2Ccontent: {
        [Language.English]: "With Livguard Jodis at your home, experience the comfort of hassle-free servicing for both the products, whenever you need.",
        [Language.Hindi]: "अपने घर पर लिवगार्ड जोड़ी के साथ,इन्वर्टर और इन्वर्टर बैटरी के लिए आरामदायक सर्विसिंग का अनुभव करें ,जब  भी आपको आवश्यकता हो।",
        [Language.Marathi]: "OOOOO",
    },
    landingPage3S7Slide2BT: {
        [Language.English]: "OOOOO",
        [Language.Hindi]: "OOOOO",
        [Language.Marathi]: "OOOOO",
    },
    landingPage3S7Slide3Heading: {
        [Language.English]: "Long Life",
        [Language.Hindi]: "लंबा जीवन",
        [Language.Marathi]: "OOOOO",
    },
    landingPage3S7Slide3Ccontent: {
        [Language.English]: "The perfect match of inverter and inverter battery in Livguard Jodis ensure a longer , more efficient life of the products for you.",
        [Language.Hindi]: "लिवगार्ड जोड़ी में इन्वर्टर और इन्वर्टर बैटरी का सही मेल आपके उत्पादों का लंबा, अधिक कुशल जीवन सुनिश्चित करता है।",
        [Language.Marathi]: "OOOOO",
    },
    landingPage3S7Slide3BT: {
        [Language.English]: "OOOOO",
        [Language.Hindi]: "OOOOO",
        [Language.Marathi]: "OOOOO",
    },

    //Category Batteries
    categoryBattriesS1T1: {
        [Language.English]: "Strong Batteries",
        [Language.Hindi]: "मजबूत बैटरी",
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
            "With the industry’s first 3D Grid design paired with a double-sided pasting, Livguard Batteries hold negative active material 20% longer, resulting in a longer battery life",
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
        [Language.English]: "Tubular Batteries",
        [Language.Hindi]: "ट्यूबुलर बैटरी",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS4SpecificationHeading: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS4BT: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
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
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS4Slide2Description: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS2Slide2KS1Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBattriesSlide2KS1Description: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS2Slide2KS2Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBattriesSlide2KS2Description: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS2Slide2KS3Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBattriesSlide2KS3Description: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS2Slide2KS4Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBattriesSlide2KS4Description: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
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
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS6Jodi2Title: {
        [Language.English]: "The Rural Jodi",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS6Jodi3Title: {
        [Language.English]: "The Super Life Jodi",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS6Jodi4Title: {
        [Language.English]: "The Hi-Power Jodi",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS6JodiButtontext: {
        [Language.English]: "Know More",
        [Language.Hindi]: "अधिक जानिए",
        [Language.Marathi]: "?????",
    },
    categoryBattriesS6Buttontext: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
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
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS4BT: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS4Slide1Heading: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS4Slide1Description: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS2Slide1KS1Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryInvertersSlide1KS1Description: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS2Slide1KS2Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryInvertersSlide1KS2Description: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS2Slide1KS3Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryInvertersSlide1KS3Description: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS2Slide1KS4Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryInvertersSlide1KS4Description: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS4Slide2Heading: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS4Slide2Description: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS2Slide2KS1Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryInvertersSlide2KS1Description: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS2Slide2KS2Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryInvertersSlide2KS2Description: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS2Slide2KS3Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryInvertersSlide2KS3Description: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS2Slide2KS4Title: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryInvertersSlide2KS4Description: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
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
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS6Jodi2Title: {
        [Language.English]: "The Rural Jodi",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS6Jodi3Title: {
        [Language.English]: "The Super Life Jodi",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS6Jodi4Title: {
        [Language.English]: "The Hi-Power Jodi",
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS6JodiButtontext: {
        [Language.English]: "Know More",
        [Language.Hindi]: "अधिक जानिए",
        [Language.Marathi]: "?????",
    },
    categoryInvertersS6Buttontext: {
        [Language.English]: "?????",
        [Language.Hindi]: "?????",
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

    review1Name: {
        [Language.English]: "Thangamani M",
        [Language.Hindi]: "तंगमणि एम",
        [Language.Marathi]: "OOOOO",
    },
    review1State: {
        [Language.English]: "Tamil Nadu",
        [Language.Hindi]: "तमिलनाडु",
        [Language.Marathi]: "OOOOO",
    },
    review1Message: {
        [Language.English]: `\"Suitable for looking mid price range with long warranty Installation done recently, good product and support and demo given by Livguard.Value for money, will update the review later on backup timing.\"`,
        [Language.Hindi]: `\"लंबी वारंटी के साथ मध्य मूल्य सीमा देखने के लिए उपयुक्त। स्थापना, हाल ही में की गई, अच्छा उत्पाद और समर्थन और  लिवगार्ड द्वारा दिया गया डेमो। पैसा वसूल,समीक्षा को बाद में बैकअप टाइमिंग पर अपडेट करेंगे\"`,
        [Language.Marathi]: "OOOOO",
    },
    review1ProductName: {
        [Language.English]: "Inverter Battery",
        [Language.Hindi]: "इन्वर्टर बैटरी",
        [Language.Marathi]: "OOOOO",
    },
    review2Name: {
        [Language.English]: "Ankit",
        [Language.Hindi]: "अंकित",
        [Language.Marathi]: "OOOOO",
    },
    review2State: {
        [Language.English]: "Delhi",
        [Language.Hindi]: "दिल्ली",
        [Language.Marathi]: "OOOOO",
    },
    review2Message: {
        [Language.English]: `\"It's cheap and best product. This is good looking and nice product and the service of livgaurd is too good and supportive.\"`,
        [Language.Hindi]: `\"यह सस्ता और बेहतरीन प्रोडक्ट है। यह अच्छा दिखने वाला और अच्छा उत्पाद है और लिवगार्ड की सेवा बहुत अच्छी और सहायक है।\"`,
        [Language.Marathi]: "OOOOO",
    },
    review2ProductName: {
        [Language.English]: "Inverter Battery",
        [Language.Hindi]: "इन्वर्टर बैटरी",
        [Language.Marathi]: "OOOOO",
    },
    review3Name: {
        [Language.English]: "Ganesh",
        [Language.Hindi]: "गणेश",
        [Language.Marathi]: "OOOOO",
    },
    review3State: {
        [Language.English]: "Maharashtra",
        [Language.Hindi]: "महाराष्ट्र",
        [Language.Marathi]: "OOOOO",
    },
    review3Message: {
        [Language.English]: `\"Great product. Great product. Go for it without a doubt.\"`,
        [Language.Hindi]: `\"अच्छा उत्पाद। अच्छा उत्पाद। इसके लिए बिना किसी संदेह के जाएं।\"`,
        [Language.Marathi]: "OOOOO",
    },
    review3ProductName: {
        [Language.English]: "Inverter Battery",
        [Language.Hindi]: "इन्वर्टर बैटरी",
        [Language.Marathi]: "OOOOO",
    },
    review4Name: {
        [Language.English]: "Dev Chauhan",
        [Language.Hindi]: "देव चौहान",
        [Language.Marathi]: "OOOOO",
    },
    review4State: {
        [Language.English]: "Uttar Pradesh",
        [Language.Hindi]: "उतार प्रदेश",
        [Language.Marathi]: "OOOOO",
    },
    review4Message: {
        [Language.English]: `\"Deliver on time & battery backup is very good. Installation services was very good.\"`,
        [Language.Hindi]: `\"समय पर डिलीवरी और बैटरी बैकअप बहुत अच्छा है। स्थापना सेवाएं बहुत अच्छी थीं।\"`,
        [Language.Marathi]: "OOOOO",
    },
    review4ProductName: {
        [Language.English]: "Inverter Battery",
        [Language.Hindi]: "इन्वर्टर बैटरी",
        [Language.Marathi]: "OOOOO",
    },

    footerCopyWriteText: {
        [Language.English]: "© Livguard 2023. All Rights Reserved",
        [Language.Hindi]: "© लिवगार्ड 2023। सभी अधिकार सुरक्षित",
        [Language.Marathi]: "INVALID STRING REQUESTED",
    },

    footerDisclosure1H: {
        [Language.English]: "About Us",
        [Language.Hindi]: "हमारे बारे में",
        [Language.Marathi]: "OOOOO",
    },
    footerDisclosure1T1: {
        [Language.English]: "Contact Us",
        [Language.Hindi]: "हमसे संपर्क करें",
        [Language.Marathi]: "OOOOO",
    },
    footerDisclosure1T2: {
        [Language.English]: "Global Reach",
        [Language.Hindi]: "वैश्विक पहुँच",
        [Language.Marathi]: "OOOOO",
    },
    footerDisclosure1T3: {
        [Language.English]: "Blog",
        [Language.Hindi]: "ब्लॉग",
        [Language.Marathi]: "OOOOO",
    },
    footerDisclosure1T4: {
        [Language.English]: "Privacy Policy",
        [Language.Hindi]: "गोपनीयता नीति",
        [Language.Marathi]: "OOOOO",
    },
    footerDisclosure1T5: {
        [Language.English]: "Sales Return Policy",
        [Language.Hindi]: "बिक्री वापसी नीति",
        [Language.Marathi]: "OOOOO",
    },
    footerDisclosure1T6: {
        [Language.English]: "Terms and conditions",
        [Language.Hindi]: "नियम और शर्तें",
        [Language.Marathi]: "OOOOO",
    },
    footerDisclosure1T7: {
        [Language.English]: "CSR Policy",
        [Language.Hindi]: "कॉर्पोरेट सामाजिक उत्तरदायित्व नीति",
        [Language.Marathi]: "OOOOO",
    },
    footerDisclosure1T8: {
        [Language.English]: "Video Gallery",
        [Language.Hindi]: "वीडियो गैलरी",
        [Language.Marathi]: "OOOOO",
    },
    footerDisclosure1T9: {
        [Language.English]: "Sitemap",
        [Language.Hindi]: "OOOOO",
        [Language.Marathi]: "OOOOO",
    },
    footerDisclosure2H: {
        [Language.English]: "Inverters and Batteries",
        [Language.Hindi]: "इनवर्टर और बैटरी",
        [Language.Marathi]: "OOOOO",
    },
    footerDisclosure2T1: {
        [Language.English]: "Home Inverters",
        [Language.Hindi]: " घर के इनवर्टर",
        [Language.Marathi]: "OOOOO",
    },
    footerDisclosure2T2: {
        [Language.English]: "Inverter Batteries",
        [Language.Hindi]: "इनवर्टर बैटरी",
        [Language.Marathi]: "OOOOO",
    },
    footerDisclosure2T3: {
        [Language.English]: "High Capacity Inverters ",
        [Language.Hindi]: "उच्च क्षमता वाले इनवर्टर",
        [Language.Marathi]: "OOOOO",
    },
    footerDisclosure3H: {
        [Language.English]: "Automotive Batteries",
        [Language.Hindi]: "ऑटोमोटिव बैटरी",
        [Language.Marathi]: "OOOOO",
    },
    footerDisclosure3T1: {
        [Language.English]: "3-wheeler batteries",
        [Language.Hindi]: "3-पहिया बैटरी",
        [Language.Marathi]: "OOOOO",
    },
    footerDisclosure3T2: {
        [Language.English]: "Tractor Batteries",
        [Language.Hindi]: "ट्रैक्टर बैटरी",
        [Language.Marathi]: "OOOOO",
    },
    footerDisclosure3T3: {
        [Language.English]: "Bus and Truck Batteries",
        [Language.Hindi]: "बस और ट्रक की बैटरी",
        [Language.Marathi]: "OOOOO",
    },
    footerDisclosure3T4: {
        [Language.English]: "2-wheeler Batteries",
        [Language.Hindi]: "2-पहिया बैटरी",
        [Language.Marathi]: "OOOOO",
    },
    footerDisclosure3T5: {
        [Language.English]: "E-Rickshaw Batteries",
        [Language.Hindi]: "ई-रिक्शा की बैटरी",
        [Language.Marathi]: "OOOOO",
    },
    footerDisclosure4H: {
        [Language.English]: "Solar Solutions",
        [Language.Hindi]: "सौर समाधान",
        [Language.Marathi]: "OOOOO",
    },
    footerDisclosure4T1: {
        [Language.English]: "Solar Panels",
        [Language.Hindi]: "सौर पैनल",
        [Language.Marathi]: "OOOOO",
    },
    footerDisclosure4T2: {
        [Language.English]: "Solar Grid Interactive Series",
        [Language.Hindi]: "OOOOO",
        [Language.Marathi]: "OOOOO",
    },
    footerDisclosure4T3: {
        [Language.English]: "Solar Inverter",
        [Language.Hindi]: "सौर इनवर्टर",
        [Language.Marathi]: "OOOOO",
    },
    footerDisclosure4T4: {
        [Language.English]: "Solar Management Unit",
        [Language.Hindi]: "सौर प्रबंधन इकाई",
        [Language.Marathi]: "OOOOO",
    },
    footerDisclosure4T5: {
        [Language.English]: "Solar Charge Controller",
        [Language.Hindi]: "OOOOO",
        [Language.Marathi]: "OOOOO",
    },
    footerDisclosure4T6: {
        [Language.English]: "Solar LED Street Light",
        [Language.Hindi]: "सौर एल ई डी गली की बत्ती",
        [Language.Marathi]: "OOOOO",
    },
    footerDisclosure4T7: {
        [Language.English]: "Solar Battery",
        [Language.Hindi]: "सौर बैटरी",
        [Language.Marathi]: "OOOOO",
    },
    footerDisclosure5H: {
        [Language.English]: "Stabilisers",
        [Language.Hindi]: "स्टेबिलाइजर्स",
        [Language.Marathi]: "OOOOO",
    },
    footerDisclosure5T1: {
        [Language.English]: "Digital Stabilisers",
        [Language.Hindi]: "डिजिटल स्टेबिलाइजर्स",
        [Language.Marathi]: "OOOOO",
    },
    footerDisclosure6H: {
        [Language.English]: "How can we help?",
        [Language.Hindi]: "हम आपकी कैसे सहायता कर सकते हैं?",
        [Language.Marathi]: "OOOOO",
    },
    footerDisclosure6T1: {
        [Language.English]: "Battery Finder",
        [Language.Hindi]: "बैटरी खोजक",
        [Language.Marathi]: "OOOOO",
    },
    footerDisclosure6T2: {
        [Language.English]: "Dealer Locator",
        [Language.Hindi]: "डीलर खोजक",
        [Language.Marathi]: "OOOOO",
    },
    footerDisclosure6T3: {
        [Language.English]: "BMHR",
        [Language.Hindi]: "बी एम ऐच आर",
        [Language.Marathi]: "OOOOO",
    },
    footerDisclosure6T4: {
        [Language.English]: "Register Your Product",
        [Language.Hindi]: "अपना उत्पाद पंजीकृत करें",
        [Language.Marathi]: "OOOOO",
    },
    footerDisclosure6T5: {
        [Language.English]: "Service Support",
        [Language.Hindi]: "सेवा समर्थन",
        [Language.Marathi]: "OOOOO",
    },
    footerDisclosure7H: {
        [Language.English]: "Investor",
        [Language.Hindi]: "निवेशक",
        [Language.Marathi]: "OOOOO",
    },
    footerDisclosure7T1: {
        [Language.English]: "LETPL Annual return– 2021-22",
        [Language.Hindi]: "LETPL वार्षिक विवरण– 2021-22",
        [Language.Marathi]: "OOOOO",
    },
    footerDisclosure7T2: {
        [Language.English]: "LBPL Annual return– 2021-22",
        [Language.Hindi]: "LBPL वार्षिक विवरण– 2021-22",
        [Language.Marathi]: "OOOOO",
    },
    footerContactT1: {
        [Language.English]: "GET IN TOUCH",
        [Language.Hindi]: "संपर्क करें",
        [Language.Marathi]: "OOOOO",
    },
    footerContactT2: {
        [Language.English]: "Plot No. 221, Phase-I, Udyog Vihar, Gurgaon 122016 Haryana, India",
        [Language.Hindi]: "प्लॉट नंबर २२१, फेज-१, उद्योग विहार, गुरुग्राम १२२०१६ हरियाणा, भारत",
        [Language.Marathi]: "OOOOO",
    },
    footerContactT3: {
        [Language.English]: "#Energy Unlimited",
        [Language.Hindi]: "OOOOO",
        [Language.Marathi]: "OOOOO",
    },

    invalidKey: {
        [Language.English]: "INVALID STRING REQUESTED",
        [Language.Hindi]: "INVALID STRING REQUESTED",
        [Language.Marathi]: "INVALID STRING REQUESTED",
    },

    OOOOO: {
        [Language.English]: "OOOOO",
        [Language.Hindi]: "OOOOO",
        [Language.Marathi]: "OOOOO",
    },
};
