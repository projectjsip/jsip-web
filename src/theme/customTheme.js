import { extendTheme } from "@chakra-ui/react";
import buttonTheme from "./button";
import fonts from "./font";
import tableTheme from "./table";

const colors = {
  jsip: {
    primary: "#00649A",
    accent: "#EE9A31",
    white: "#fdfdfd",
    black: "#1d1d1d",
    success: "#37BE6E",
    warning: "#FFC107",
    danger: "#D72D2D",
    grey: "#4e4e4e",
    primary100: "#E2FAFD",
    primary200: "#C0F4FC",
    primary300: "#8BEAF9",
    primary400: "#38DBF5",
    primary500: "#0BB1CB",
    primary600: "#0994AA",
    primary700: "#077B8D",
    primary800: "#065D6B",
    primary900: "#043F49",
    accent100: "#FDF3E7",
    accent200: "#F9DCB8",
    accent300: "#F5C589",
    accent400: "#F1AE5A",
    accent500: "#EE9A31",
    accent600: "#E78913",
    accent700: "#CB7811",
    accent800: "#A5620E",
    accent900: "#76460A",
    grey100: "#F8F9FA",
    grey200: "#E1E7EC",
    grey300: "#D5DDE5",
    grey400: "#CCD4DB",
    grey500: "#AEBECD",
    grey600: "#929FB1",
    grey700: "#6E7A8A",
    grey800: "#404B5A",
    grey900: "#212934",
    success100: "#E7F8EE",
    success200: "#D0F1DD",
    success300: "#9CE2B9",
    success400: "#69D394",
    success500: "#37BE6E",
    success600: "#30A660",
    success700: "#2A9255",
    success800: "#1F6B3E",
    success900: "#154729",
    warning100: "#FFF5D6",
    warning200: "#FFEBAD",
    warning300: "#FFDE7A",
    warning400: "#FFD24C",
    warning500: "#FFC107",
    warning600: "#DBA400",
    warning700: "#B88A00",
    warning800: "#8A6700",
    warning900: "#664D00",
    danger100: "#FBEAEA",
    danger200: "#F5CCCC",
    danger300: "#EDA1A1",
    danger400: "#DF5858",
    danger500: "#D72D2D",
    danger600: "#BC2424",
    danger700: "#9F1E1E",
    danger800: "#811818",
    danger900: "#5A1111",
  },
};

const components = {
  Button: buttonTheme,
  Table: tableTheme
};

const customTheme = extendTheme({
  colors,
  fonts,
  components,
});

export default customTheme;
