import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: { main: "#22C55E" },
        background: { default: "#F6F7F9" },
        text: { primary: "#111827" },
    },
    shape: { borderRadius: 12 },
    typography: {
        fontFamily: ["Inter", "system-ui", "Segoe UI", "Roboto", "Arial"].join(","),
        h5: { fontWeight: 700 },
    },
    components: {
        MuiPaper: { styleOverrides: { root: { borderRadius: 14 } } },
        MuiButton: {
            styleOverrides: {
                root: { borderRadius: 10, textTransform: "none", fontWeight: 600 },
            },
        },
    },
});
