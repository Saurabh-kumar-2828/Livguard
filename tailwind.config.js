/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./root.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary-500": {
                    light: "#eb2a2b",
                    dark: "#eb2a2b",
                },
                "background-500": {
                    light: "#ebebeb",
                    dark: "#020202",
                },
                "secondary-100": {
                    light: "#fcfcfc",
                    dark: "#1f2022",
                },
                "secondary-300": {
                    light: "#b1b1b1",
                    dark: "#474546",
                },
                "secondary-500": {
                    light: "#655f61",
                    dark: "#655f61",
                },
                "secondary-700": {
                    light: "#474546",
                    dark: "#b1b1b1",
                },
                "secondary-900": {
                    light: "#1f2022",
                    dark: "#fcfcfc",
                },  
            },
            gridColumnStart: {
                8: "8",
                9: "9",
                10: "10",
                11: "11",
                12: "12",
                13: "13",
                14: "14",
                15: "15",
                16: "16",
                17: "17",
                18: "18",
                19: "19",
            },
            gridColumnEnd: {
                "-1": "-1",
            },
            gridRowStart: {
                8: "8",
                9: "9",
                10: "10",
                11: "11",
                12: "12",
                13: "13",
                14: "14",
                15: "15",
                16: "16",
                17: "17",
                18: "18",
                19: "19",
            },
            gridRowEnd: {
                "-1": "-1",
            },
        },
    },
    plugins: [],
    prefix: "tw-",
};
