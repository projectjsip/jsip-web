const tableTheme = {
    variants: {
        simple: {
            table: {
                thead: {
                    bgColor: "#00649A",
                    borderRadius: "8px",
                    th: {
                        textTransform: "capitalize",
                        fontWeight: "700",
                        fontSize: "16px",
                        color: "white",
                        letterSpacing: "0.005em",
                        padding: "16px",
                    },
                },
                tfoot: {
                    bgColor: "#00649A",
                    th: {
                        textTransform: "capitalize",
                        fontWeight: "700",
                        fontSize: "16px",
                        color: "white",
                        letterSpacing: "0.005em",
                    },
                    td: {
                        padding: "8px 16px",
                    },
                },
                color: "#212934",
                fontSize: "14px",
                fontWeight: "500",
                borderRadius: "8px",
                overflow: "hidden",
            },
            tbody: {
                td: {
                    padding: "16px",
                },
            },
        },
    },
};

export default tableTheme;
