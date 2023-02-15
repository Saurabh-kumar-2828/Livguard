import {Language} from "~/typeDefinitions";

export function getVernacularString(textContentPiece: string, language: Language) {
    if (!(textContentPiece in vernacularStrings)) {
        // @ts-ignore
        return vernacularStrings["invalidKey"][language];
    }

    // @ts-ignore
    return vernacularStrings[textContentPiece][language];
}

// @ts-ignore
const vernacularStrings: {[textContentPiece: string]: {[language: Language]: string}} = {
    "headerS1T1": {
        [Language.English]: "Customer Care: 18001025551",
        [Language.Hindi]: "ग्राहक सेवा: १८००१०२५५५१",
        [Language.Marathi]: "अनुवाद न केलेली पंक्ती",
    },
    "headerS2T1": {
        [Language.English]: "Search",
        [Language.Hindi]: "यहाँ खोजें",
        [Language.Marathi]: "अनुवाद न केलेली पंक्ती",
    },

    "homeS1T1": {
        [Language.English]: "Energy Unlimited",
        [Language.Hindi]: "असीमित ऊर्जा",
        [Language.Marathi]: "अनुवाद न केलेली पंक्ती",
    },
    "homeS1T2": {
        [Language.English]: "For a Constantly Evolving World",
        [Language.Hindi]: "बदलते भारत के लिए",
        [Language.Marathi]: "अनुवाद न केलेली पंक्ती",
    },
    "homeS1T3": {
        [Language.English]: "Get in Touch With Us",
        [Language.Hindi]: "बदलते भारत के लिए",
        [Language.Marathi]: "हमसे संपर्क करें",
    },
    "homeS2T1": {
        [Language.English]: "Energy Storage Solutions",
        [Language.Hindi]: "ऊर्जा संग्रहण समाधान",
        [Language.Marathi]: "हमसे संपर्क करें",
    },
    "homeS2T2": {
        [Language.English]: "To Power Up Your Future",
        [Language.Hindi]: "जिनसे आपका भविष्य रोशन हो",
        [Language.Marathi]: "हमसे संपर्क करें",
    },

    "invalidKey": {
        [Language.English]: "INVALID STRING REQUESTED",
        [Language.Hindi]: "INVALID STRING REQUESTED",
        [Language.Marathi]: "INVALID STRING REQUESTED",
    },

    "dummy": {
        [Language.English]: "Untranslated String",
        [Language.Hindi]: "बिन अनुवादित पंक्ति",
        [Language.Marathi]: "अनुवाद न केलेली पंक्ती",
    },
};
