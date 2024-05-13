/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/AppComponents/Navbar";
import {
  Box,
  Center,
  Container,
  Input,
  Stack,
  Text,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
  InputGroup,
  InputLeftElement,
  Button,
  Skeleton,
} from "@chakra-ui/react";
import { fetchAllSchoolWithFilter } from "../networks/libs/school";
import { Icon } from "@iconify/react";
import { fetchHistories } from "../networks/libs/apply";
import HistoryModal from "../components/History/HistoryModal";
import AdminPaginationFooter from "../components/AppComponents/AdminPaginationFooter";

export default function History() {
  const inputRef = useRef();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHistories, setIsLoadingHistories] = useState(false);

  const [histories, setHistories] = useState({});
  const [NPSN, setNPSN] = useState("");
  const [search, setSearch] = useState("");
  const handleChangeKeyword = (value) => {
    setSearch(value);

    if (!isOpen) {
      onToggle();
    }

    if (!value) {
      onClose();
    }

    if (value.length >= 3 && !isLoading) {
      getAllSchool(value);
    }
  };

  const [schools, setSchools] = useState([]);

  const getAllSchool = async (keyword) => {
    setIsLoading(true);
    await fetchAllSchoolWithFilter(keyword)
      .then((response) => {
        setIsLoading(false);
        setSchools(response.data.content);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const getHistories = async (page) => {
    setIsLoadingHistories(true);
    await fetchHistories(NPSN, page)
      .then((response) => {
        setIsLoadingHistories(false);
        setHistories(response.data.content);
      })
      .catch((error) => {
        setIsLoadingHistories(false);
      });
  };

  useEffect(() => {
    getHistories(1);
  }, []);

  const dataLength = histories?.total ?? 0; // Ganti sesuai panjang data
  const [pageIndex, setPageIndex] = useState(0);
  const [numberDisplayed, setNumberDisplayed] = useState("15");
  const maxPage = Math.floor(
    dataLength / parseInt(numberDisplayed) +
      (dataLength % parseInt(numberDisplayed) === 0 ? 0 : 1)
  );
  const changePage = (page) => {
    if (page < 0) return;
    if (page >= maxPage) return;
    setPageIndex(page);
    getHistories(page + 1);
  };

  return (
    <Box pb="120px">
      <Navbar />
      <Box bgColor="jsip.primary" mb="20px" pt="60px">
        <Container maxW="container.md">
          <Center py="60px">
            <Stack direction="column" spacing="5px" alignItems="center">
              <Text
                color="white"
                fontSize={["30px", "30px", "40px", "40px"]}
                fontWeight="800"
                textAlign="center"
              >
                Riwayat Pengajuan Prestasi
              </Text>
              <Text
                color="white"
                fontSize="16px"
                fontWeight="400"
                textAlign="center"
              >
                Daftar pengajuan prestasi yang berhasil diajukan
              </Text>
            </Stack>
          </Center>
        </Container>
      </Box>
      <Container maxW="container.sm">
        <Box bgColor="white" p="20px" borderRadius="20px" boxShadow="md">
          <Text mb="4px">Pilih Nama Sekolah</Text>
          <InputGroup>
            <Input
              size="lg"
              placeholder="Ketik nama sekolah anda"
              // @ts-ignore
              ref={inputRef}
              value={search}
              onChange={(event) => handleChangeKeyword(event.target.value)}
            />

            <InputLeftElement
              h="100%"
              pointerEvents="none"
              children={
                <Box color="jsip.grey700">
                  <Icon icon="bxs:school" fontSize="20px" />
                </Box>
              }
            />
          </InputGroup>

          <Popover
            returnFocusOnClose={true}
            isOpen={isOpen}
            onClose={onClose}
            closeOnBlur={true}
            // @ts-ignore
            initialFocusRef={inputRef}
          >
            <PopoverTrigger>
              <Box></Box>
            </PopoverTrigger>
            <PopoverContent
              borderRadius="16px"
              boxShadow="0px 16px 40px rgba(33, 41, 52, 0.2)"
              w="100%"
            >
              <PopoverBody p="20px" w="100%">
                <Skeleton isLoaded={!isLoading}>
                  <Stack
                    direction="column"
                    spacing="20px"
                    w={["100%", "100%", "560px", "560px"]}
                  >
                    {schools && schools?.length > 0 ? (
                      <>
                        {schools?.map((school) => (
                          <Text
                            key={school?.id}
                            color="lmsb.grey700"
                            _hover={{ color: "lmsb.primary" }}
                            cursor="pointer"
                            onClick={() => {
                              setSearch(school?.school_name);
                              setNPSN(school?.npsn);
                              onClose();
                            }}
                          >
                            <Text as="span" fontWeight="800">
                              {school?.school_name}
                            </Text>{" "}
                            - NPSN: {school?.npsn}
                          </Text>
                        ))}
                      </>
                    ) : (
                      <>
                        <Text color="lmsb.grey700" alignSelf="center">
                          Sekolah tidak ditemukan
                        </Text>
                      </>
                    )}
                  </Stack>
                </Skeleton>
              </PopoverBody>
            </PopoverContent>
          </Popover>

          <Button
            variant="jsip-primary"
            w="100%"
            mt="20px"
            onClick={getHistories}
            _hover={{}}
            isLoading={isLoadingHistories}
          >
            Lacak
          </Button>
        </Box>
      </Container>
      <Container maxW="container.sm" py="40px">
        <Skeleton isLoaded={!isLoadingHistories}>
          <Stack direction="column" spacing="20px" alignItems="center">
            {histories?.data && histories?.data.length > 0 ? (
              <>
                {histories?.data?.map((history) => (
                  <HistoryModal history={history} />
                ))}
                <AdminPaginationFooter
                  pageIndex={pageIndex}
                  maxPage={maxPage}
                  onChangePage={changePage}
                  numberDisplayed={numberDisplayed}
                  setNumberDisplayed={setNumberDisplayed}
                  showBaris={false}
                />
              </>
            ) : (
              <>
                <Center>
                  <Text>Belum ada riwayat</Text>
                </Center>
              </>
            )}
          </Stack>
        </Skeleton>
      </Container>
    </Box>
  );
}
