import {useState} from "react";

type SecondaryNavigationSections = {
    [id: string]: {
        humanReadableName: string;
        isCurrentlyVisible: boolean;
    };
};

export type SecondaryNavigationController = {
    sections: SecondaryNavigationSections;
    setSections: React.Dispatch<React.SetStateAction<SecondaryNavigationSections>>;
};

export function useSecondaryNavigationController(): SecondaryNavigationController {
    const [sections, setSections] = useState<SecondaryNavigationSections>({});

    return {
        sections: sections,
        setSections: setSections,
    };
}
