/* eslint-disable jsx-a11y/alt-text */

import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Circle,
  Flex,
  IconButton,
  Image,
  Show,
  Skeleton,
  Stack,
  Text,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { fetchLoggedUser } from "../../networks/libs/auth";
import { useRecoilState } from "recoil";
import { isUserLoadingState, userState } from "../../recoil/user";
import Logout from "../Logout";

export const superAdminMenu = [
  {
    title: "Dashboard",
    icon: "bxs:dashboard",
    link: "/super-admin/dashboard",
  },
  {
    title: "Akun",
    icon: "bxs:user-account",
    link: "/super-admin/account",
  },
  {
    title: "Data Pemerintah",
    icon: "bxs:bank",
    link: "/super-admin/goverment",
  },
  {
    title: "Data Sekolah",
    icon: "bxs:school",
    link: "/super-admin/school",
  },
  {
    title: "Banner",
    icon: "bxs:image",
    link: "/super-admin/banner",
  },
  {
    title: "Foto Galeri",
    icon: "bxs:image",
    link: "/super-admin/gallery",
  },
  {
    title: "Data Pendukung",
    icon: "bxs:data",
    link: "/super-admin/metadata",
  },
];

function Layout({ pageName, children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [isUserLoading, setIsUserLoading] = useRecoilState(isUserLoadingState);

  const [pathname, setpathname] = useState("");
  useEffect(() => {
    setpathname(window.location.pathname);
  }, []);

  const getLoggedUser = async () => {
    try {
      const response = await fetchLoggedUser(localStorage.getItem("token"));

      if (response.data.content) {
        setIsUserLoading(false);
        setUser(response.data.content);
      } else {
        navigate("/login");
        setIsUserLoading(false);
      }
    } catch (error) {
      navigate("/login");
      setIsUserLoading(false);
    }
  };

  useEffect(() => {
    setIsUserLoading(true);
    getLoggedUser(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const adminMenus = [
    {
      title: "Dashboard",
      icon: "bxs:dashboard",
      link: "/admin/dashboard",
    },
    {
      title: "Pengajuan",
      icon: "bxs:book-add",
      link: "/admin/apply",
    },
    {
      title: "Tracking",
      icon: "bxs:file-find",
      link: "/tracking",
    },
  ];

  const verifierMenus = [
    // {
    //   title: "Dashboard",
    //   icon: "bxs:dashboard",
    //   link: "/verifier/dashboard",
    // },
    {
      title: "Pengajuan Sekolah",
      icon: "bxs:book-add",
      link: "/verifier/batch",
    },
  ];

  const getRoleMenus = () => {
    let menus = [];
    const role = user?.role;

    if (role === "super_admin") menus = superAdminMenu;
    else if (role === "admin") menus = adminMenus;
    else if (role === "verifier") menus = verifierMenus;

    return menus;
  };

  const AvatarProfile = () => {
    return (
      <Menu>
        <MenuButton>
          <Flex
            direction="row"
            alignItems="center"
            // onClick={() => navigate("/profile")}
            cursor="pointer"
          >
            <Circle border="1px solid #00649A" mr="8px" p="2px">
              <Avatar name={user?.name} size="sm" />
            </Circle>
            <Flex direction="column" alignItems="start">
              <Text fontWeight="700" fontSize="14px" color="jsip.black">
                Hello, {user?.name} 👋
              </Text>
              <Text fontSize="14px" color="jsip.grey700">
                {user?.role}
              </Text>
            </Flex>
          </Flex>
        </MenuButton>
        <MenuList>
          <MenuItem
            icon={<Icon icon="bx:user" />}
            onClick={() => navigate("/profile")}
          >
            Profile
          </MenuItem>
          <MenuItem
            icon={<Icon icon="bx:lock-alt" />}
            onClick={() => navigate("/update-password")}
          >
            Update Password
          </MenuItem>
          <MenuDivider />
          <Logout />
        </MenuList>
      </Menu>
    );
  };

  const RenderMenus = () => {
    return (
      <Stack direction="column" spacing="20px" alignItems="start" w="100%">
        {getRoleMenus().map((superAdmin) => (
          <Link
            key={superAdmin.link}
            to={superAdmin.link}
            style={{ width: "100%" }}
          >
            <Box
              key={superAdmin.title}
              cursor="pointer"
              bgColor={pathname.includes(superAdmin.link) ? "jsip.primary" : ""}
              color={
                pathname.includes(superAdmin.link)
                  ? "jsip.white"
                  : "jsip.primary"
              }
              p="10px"
              w="100%"
              borderRadius="8px"
              _hover={{
                bgColor: "jsip.primary",
                color: "jsip.white",
              }}
              transition="0.5s ease"
            >
              <Stack direction="row" spacing="10px" alignItems="center">
                <Icon icon={superAdmin.icon} />
                <Text fontWeight="700">{superAdmin.title}</Text>
              </Stack>
            </Box>
          </Link>
        ))}
      </Stack>
    );
  };

  const Notification = () => {
    return (
      <>
        {user?.role !== "super_admin" ? (
          <>
            <Link to="/notification">
              <Box mr="20px" fontSize="24px" color="jsip.primary">
                <Icon icon="bx:bell" />
              </Box>
            </Link>
          </>
        ) : null}
      </>
    );
  };
  return (
    <>
      <head>
        <title>J-SIP</title>
        <meta name="description" content="J-SIP" />
        <link rel="icon" type="image/png" href="/jsip-logo.png" />
      </head>
      <Box minH="100vh">
        <Flex direction="row">
          <Box minW="280px">
            <Show above="md">
              <Flex direction="column" borderRight="1px solid #E1E7EC" h="100%">
                <Stack
                  py="20px"
                  direction="row"
                  alignItems="center"
                  alignSelf="center"
                  spacing="10px"
                >
                  <Image src="/jsip-logo-new.png" h="60px" objectFit="cover" />
                </Stack>
                {/* <Divider /> */}
                <Box
                  minW="280px"
                  maxW="280px"
                  minH="calc(100vh - 80px)"
                  p="10px 20px"
                >
                  <Flex
                    justifyContent="space-between"
                    direction="column"
                    h="100%"
                  >
                    <RenderMenus />
                  </Flex>
                </Box>
              </Flex>
            </Show>
          </Box>

          <Box
            maxW={[
              "100%",
              "100%",
              "calc(100vw - 280px)",
              "calc(100vw - 280px)",
            ]}
            minW={[
              "100%",
              "100%",
              "calc(100vw - 280px)",
              "calc(100vw - 280px)",
            ]}
          >
            <Flex direction="column">
              <Box p={["16px", "16px", "21px 40px", "21px 40px"]}>
                <Flex
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text
                    fontWeight="700"
                    fontSize={["16px", "16px", "20px", "20px"]}
                    color="jsip.black"
                  >
                    {pageName}
                  </Text>
                  <Show above="md">
                    <Skeleton isLoaded={!isUserLoading}>
                      <Flex alignItems="center">
                        <Notification />
                        <AvatarProfile />
                      </Flex>
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
                          <RenderMenus />
                        </DrawerBody>

                        <DrawerFooter>
                          <Flex alignItems="center">
                            <Notification />
                            <AvatarProfile />
                          </Flex>
                        </DrawerFooter>
                      </DrawerContent>
                    </Drawer>
                  </Show>
                </Flex>
              </Box>
              <Box
                p={["16px", "16px", "20px 40px", "20px 40px"]}
                minH="calc(100vh - 80px)"
              >
                {children}
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default Layout;
