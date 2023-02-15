import {Language} from "~/typeDefinitions";

export function getVernacularString(textContentPiece: string, language: Language) {
    if (!(textContentPiece in vernacularStrings)) {
        return "PANIC - Content not translated!";
    }

    // @ts-ignore
    return vernacularStrings[textContentPiece][language];
}

// @ts-ignore
const vernacularStrings: {[textContentPiece: string]: {[language: Language]: string}} = {
    "homeS1T1": {
        [Language.English]: "Customer Care: 18001025551",
        [Language.Hindi]: "सशक्त भारत के लिए असीमित ऊर्जा",
        [Language.Marathi]: "सशक्त asda भारत rty लिए vxcv ऊर्जा",
    },
};
