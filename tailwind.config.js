/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./root.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
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
        },
    },
    plugins: [],
    prefix: "tw-",
};
