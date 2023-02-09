/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                // transparent: "#00000000",
                "primary": "#00a2ed",
                "primary-1": "#1f40cb",
                "primary-2": "#051c2a",
                "bg": "#111111",
                "bg+1": "#2a2a2a",
                "fg": "#ffffff",
                "fg-1": "#b9b9b9",
                "contrast-bg": "#ffffff",
                "contrast-bg-1": "#f2f2f2",
                "contrast-fg": "#000000",
            },
            screens: {
                // "headerHideLinks": "1100px",
                // "headerChange": "640px",
                // "footerChange": "640px",
            },
            gridColumnStart: {
                "8": "8",
                "9": "9",
                "10": "10",
                "11": "11",
                "12": "12",
                "13": "13",
                "14": "14",
                "15": "15",
                "16": "16",
                "17": "17",
                "18": "18",
                "19": "19",
            },
            gridColumnEnd: {
                "-1": "-1",
            },
            gridRowStart: {
                "8": "8",
                "9": "9",
                "10": "10",
                "11": "11",
                "12": "12",
                "13": "13",
                "14": "14",
                "15": "15",
                "16": "16",
                "17": "17",
                "18": "18",
                "19": "19",
            },
            gridRowEnd: {
                "-1": "-1",
            },
        }
    },
    plugins: [],
    prefix: "tw-",
};
