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
        [Language.Marathi]: "?????",
    },
    headerS2T1: {
        [Language.English]: "Search",
        [Language.Hindi]: "यहाँ खोजें",
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
        [Language.Hindi]: "?????",
        [Language.Marathi]: "?????",
    },
    homeS7H1T2: {
        [Language.English]: `<span class=\"lg-text-highlighted\">Solar Solutions</span>`,
        [Language.Hindi]: `<span class=\"lg-text-highlighted\">?????</span>`,
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
        [Language.English]: "Mr. Rakesh Malhotra ",
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
        [Language.English]: "Contact us at +91 18001025551 at any day of the week between 8 am to 8 pm, and our team will resolve it within 48 hours!",
        [Language.Hindi]: "हम सप्ताह के सभी दिन सुबह 8 बजे से रात 8 बजे के बीच +91 18001025551 पर उपलब्ध हैं।हम आपकी समस्या का समाधान 48 घंटों के अंदर करेंगे!",
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

    landingPage1S1T1: {
        [Language.English]: "Empowering India With Unlimited Energy",
        [Language.Hindi]: "सशक्त भारत के लिए असीमित ऊर्जा",
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

    landingPageS3HT1: {
        [Language.English]: "Quality Meets",
        [Language.Hindi]: `गुणवत्ता और <span class="lg-text-highlighted">विशेषज्ञता</span>`,
        [Language.Marathi]: "?????",
    },
    landingPageS3HT2: {
        [Language.English]: `<span class="lg-text-highlighted">Expertise</span>`,
        [Language.Hindi]: "का मेल",
        [Language.Marathi]: "?????",
    },
    landingPageS3Box1T1: {
        [Language.English]: "21000+",
        [Language.Hindi]: "21000+",
        [Language.Marathi]: "?????",
    },
    landingPageS3Box1T2: {
        [Language.English]: "Pincodes Served",
        [Language.Hindi]: "पिन कोड में उपलब्ध",
        [Language.Marathi]: "?????",
    },
    landingPageS3Box2T1: {
        [Language.English]: "40+",
        [Language.Hindi]: "40+",
        [Language.Marathi]: "?????",
    },
    landingPageS3Box2T2: {
        [Language.English]: "Service Centres",
        [Language.Hindi]: "सेवा केंद्र",
        [Language.Marathi]: "?????",
    },
    landingPageS3Box3T1: {
        [Language.English]: "4000+",
        [Language.Hindi]: "4000+",
        [Language.Marathi]: "?????",
    },
    landingPageS3Box3T2: {
        [Language.English]: "Dealers & Distributors",
        [Language.Hindi]: "डीलर और वितरक",
        [Language.Marathi]: "?????",
    },
    landingPageS3Box4T1: {
        [Language.English]: "1 Cr+",
        [Language.Hindi]: "1 Cr+",
        [Language.Marathi]: "?????",
    },
    landingPageS3Box4T2: {
        [Language.English]: "Happy Customers",
        [Language.Hindi]: "सुखी ग्राहक",
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
        [Language.English]: "Inverter Battery",
        [Language.Hindi]: "इन्वर्टर बैटरी",
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
        [Language.English]: "Inverter Battery",
        [Language.Hindi]: "इन्वर्टर बैटरी",
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
        [Language.English]: "Inverter Battery",
        [Language.Hindi]: "इन्वर्टर बैटरी",
        [Language.Marathi]: "?????",
    },

    footerCopyWriteText: {
        [Language.English]: "© Livguard 2023. All Rights Reserved",
        [Language.Hindi]: "© लिवगार्ड 2023। सभी अधिकार सुरक्षित",
        [Language.Marathi]: "INVALID STRING REQUESTED",
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
        [Language.Hindi]: "?????",
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
        [Language.Hindi]: "?????",
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
        [Language.Hindi]: "?????",
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
        [Language.Hindi]: "?????",
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
