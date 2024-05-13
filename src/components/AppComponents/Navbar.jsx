import {
  Avatar,
  Box,
  Button,
  Circle,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Image,
  Show,
  Skeleton,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { fetchLoggedUser } from "../../networks/libs/auth";
import { userState } from "../../recoil/user";
import { gotoElementByIdAdjusted } from "../../utils/paginationFunction";

export const menus = [
  { title: "Beranda", link: "/#beranda", id: "beranda" },
  { title: "Tutorial Pengajuan", link: "/#tutorial", id: "tutorial" },
  { title: "Syarat", link: "/#syarat", id: "syarat" },
  { title: "Tentang J-SIP", link: "/#about", id: "about" },
  { title: "Tracking", link: "/tracking", id: "" },
  { title: "Riwayat", link: "/history", id: "" },
];

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useRecoilState(userState);

  const getLoggedUser = async () => {
    try {
      const response = await fetchLoggedUser(localStorage.getItem("token"));
      if (response.data.content) {
        setIsLoading(false);
        setUser(response.data.content);
      } else {
        setUser({});
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setUser({});
    }
  };

  const fullUrl = window.location.href;

  useEffect(() => {
    const splitUrl = fullUrl.split("/")[3];
    const removeUrl = splitUrl.replace("#", "");
    setTimeout(() => {
      gotoElementByIdAdjusted(removeUrl, 100);
    }, 200);
  }, [fullUrl]);

  useEffect(() => {
    setIsLoading(true);
    getLoggedUser(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkUserRedirect = () => {
    if (user?.role === "super_admin") {
      return "/super-admin/dashboard";
    } else if (user?.role === "admin") {
      return "/admin/dashboard";
    } else if (user?.role === "verifier") {
      return "/verifier/batch";
    }
  };

  const AvatarProfile = () => {
    return (
      <Link to={checkUserRedirect()}>
        <Flex direction="row" alignItems="center" cursor="pointer">
          <Circle border="1px solid #00649A" mr="8px" p="2px">
            <Avatar name={user?.name} size="xs" />
          </Circle>
          <Flex direction="column">
            <Text fontWeight="700" fontSize="14px" color="jsip.black">
              Hello, {user?.name} 👋
            </Text>
          </Flex>
        </Flex>
      </Link>
    );
  };
  return (
    <Box
      zIndex={2}
      boxShadow="md"
      position="fixed"
      top={0}
      w="100%"
      bgColor="white"
    >
      <Container maxW="container.xl" py="8px">
        <Flex direction="row" w="100%" alignItems="center">
          <Stack direction="row" spacing="24px" alignItems="center">
            <Image src="/jsip-logo-new.png" h="48px" />

            <Show above="md">
              {menus.map((menu) => (
                <>
                  <Link
                    to={menu.link}
                    onClick={() => gotoElementByIdAdjusted(menu.id, 100)}
                  >
                    <Text
                      fontWeight="700"
                      fontSize="14px"
                      color="jsip.grey800"
                      cursor="pointer"
                    >
                      {menu.title}
                    </Text>
                  </Link>
                </>
              ))}
            </Show>
          </Stack>

          <Spacer />

          <Show above="md">
            <Skeleton isLoaded={!isLoading}>
              {!user?.name ? (
                <>
                  <Link to="/login">
                    <Button variant="jsip-primary" size="sm">
                      Login
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <AvatarProfile />
                </>
              )}
            </Skeleton>
          </Show>

          <Show below="md">
            <IconButton
              onClick={onOpen}
              aria-label=""
              icon={<Icon icon="bx:menu-alt-right" fontSize="18px" />}
            />

            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              finalFocusRef={btnRef}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerHeader>
                  <Flex direction="row" alignItems="center">
                    <Text>J-SIP</Text>
                    <DrawerCloseButton />
                  </Flex>
                </DrawerHeader>

                <DrawerBody>
                  <Stack direction="column" spacing="24px" alignItems="end">
                    {menus.map((menu) => (
                      <>
                        <Link
                          to={menu.link}
                          onClick={() => gotoElementByIdAdjusted(menu.id, 100)}
                        >
                          <Text
                            fontWeight="700"
                            fontSize="14px"
                            color="jsip.grey800"
                            cursor="pointer"
                          >
                            {menu.title}
                          </Text>
                        </Link>
                      </>
                    ))}
                  </Stack>
                </DrawerBody>

                <DrawerFooter>
                  <AvatarProfile />
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </Show>
        </Flex>
      </Container>
    </Box>
  );
}

export default Navbar;
