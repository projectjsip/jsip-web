import { Box, Stack, Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

function Breadcrumb({ items }) {
  return (
    <>
      <Stack
        direction="row"
        spacing="10px"
        fontSize="14px"
        divider={
          <Box bgColor="white" border="none">
            <Icon icon="bx:chevron-right" color="lmsb.black" fontSize="18px" />
          </Box>
        }
        alignItems="center"
        flexWrap="wrap"
      >
        {items.map((item, index) => (
          <Link to={item.link} key={item.title} passHref>
            <Text
              color={index + 1 !== items.length ? "jsip.primary" : "lmsb.black"}
              fontWeight="600"
            >
              {item.title}
            </Text>
          </Link>
        ))}
      </Stack>
    </>
  );
}

export default Breadcrumb;
