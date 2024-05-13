import {
  Box,
  Container,
  Flex,
  Image,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { menus } from "./Navbar";
import { gotoElementByIdAdjusted } from "../../utils/paginationFunction";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <Box boxShadow="xl" w="100%" bgColor="jsip.primary">
        <Container maxW="container.xl" py="24px">
          <Stack
            direction={["column", "column", "row", "row"]}
            spacing="40px"
            alignItems="center"
          >
            <Stack
              direction="column"
              spacing="24px"
              alignItems={["center", "center", "start", "start"]}
            >
              <Image src="/jsip-logo-new.png" h="100px" />
              <Flex
                direction="column"
                alignItems={["center", "center", "start", "start"]}
              >
                <Text fontWeight="700" color="white">
                  J-Sistem Informasi Prestasi (J-SIP)
                </Text>
                <Text fontWeight="500" color="white">
                  Copyright © 2023
                </Text>
              </Flex>
            </Stack>
            <Spacer />
            <Stack
              direction={["column", "column", "row", "row"]}
              spacing={["16px", "16px", "40px", "40px"]}
            >
              {menus.map((menu) => (
                <Link
                  to={menu.link}
                  onClick={() => gotoElementByIdAdjusted(menu.id, 100)}
                >
                  <Text
                    fontWeight="700"
                    fontSize="16px"
                    color="white"
                    textAlign="center"
                  >
                    {menu.title}
                  </Text>
                </Link>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
}

export default Footer;
