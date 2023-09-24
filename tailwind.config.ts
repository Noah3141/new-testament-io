import { type Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: colors.teal[50],
                    100: colors.teal[100],
                    200: colors.teal[200],
                    300: colors.teal[300],
                    400: colors.teal[400],
                    500: colors.teal[500],
                    600: colors.teal[600],
                    700: colors.teal[700],
                    800: colors.teal[800],
                    900: colors.teal[900],
                    950: colors.teal[950],
                },
                secondary: {
                    50: colors.amber[50],
                    100: colors.amber[100],
                    200: colors.amber[200],
                    300: colors.amber[300],
                    400: colors.amber[400],
                    500: colors.amber[500],
                    600: colors.amber[600],
                    700: colors.amber[700],
                    800: colors.amber[800],
                    900: colors.amber[900],
                    950: colors.amber[950],
                },
                basic: {
                    50: colors.zinc[50],
                    100: colors.zinc[100],
                    200: colors.zinc[200],
                    300: colors.zinc[300],
                    400: colors.zinc[400],
                    500: colors.zinc[500],
                    600: colors.zinc[600],
                    700: colors.zinc[700],
                    800: colors.zinc[800],
                    900: colors.zinc[900],
                    950: colors.zinc[950],
                },
            },
        },
    },
    plugins: [],
} satisfies Config;
