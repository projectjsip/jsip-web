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
  Circle,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tag,
  Link,
} from "@chakra-ui/react";
import {
  fetchAllSchoolWithFilter,
  fetchTrackingBySchoolId,
} from "../networks/libs/school";
import { Icon } from "@iconify/react";
import moment from "moment";
import { statusColor, translateStatusTracking } from "../utils/translate";
import { useSearchParams } from "react-router-dom";

export default function Tracking() {
  const [searchParams] = useSearchParams();
  const npsn = searchParams.get("npsn");

  const inputRef = useRef();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTracking, setIsLoadingTracking] = useState(false);

  const [tracking, setTracking] = useState({});
  const [NPSN, setNPSN] = useState(npsn);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setNPSN(npsn);
  }, [npsn]);

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

  const getTracking = async () => {
    setIsLoadingTracking(true);
    await fetchTrackingBySchoolId({ NPSN })
      .then((response) => {
        setIsLoadingTracking(false);
        setTracking(response.data.content);
      })
      .catch((error) => {
        setIsLoadingTracking(false);
      });
  };

  useEffect(() => {
    if (npsn) {
      getTracking(); // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [npsn]);

  return (
    <Box pb="120px">
      <Navbar />
      <Box position="relative" pt="60px">
        <Box bgColor="jsip.primary" minH="30vh">
          <Container
            maxW="container.md"
            minH={["40vh", "40vh", "35vh", "35vh"]}
          >
            <Center minH="30vh">
              <Stack direction="column" spacing="5px" alignItems="center">
                <Text
                  color="white"
                  fontSize={["30px", "30px", "40px", "40px"]}
                  fontWeight="800"
                  textAlign="center"
                >
                  Tracking Pengajuan Prestasi
                </Text>
                <Text color="white" fontSize="18px" textAlign="center">
                  Pilih sekolah anda untuk memulai Tracking.
                </Text>
              </Stack>
            </Center>
          </Container>
        </Box>
        <Container
          maxW="container.sm"
          position="absolute"
          bottom={-20}
          left={0}
          right={0}
        >
          <Box bgColor="white" p="20px" borderRadius="20px" boxShadow="md">
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
                      maxH="200px"
                      overflow="auto"
                    >
                      {schools && schools?.length > 0 ? (
                        <>
                          {schools
                            ?.sort((a, b) => a?.npsn - b?.npsn)
                            ?.map((school) => (
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
              onClick={getTracking}
              _hover={{}}
              isLoading={isLoadingTracking}
            >
              Lacak
            </Button>
          </Box>
        </Container>
      </Box>
      {tracking?.school && (
        <Container maxW="container.sm" mt="120px">
          <Box p="20px" bgColor="white" boxShadow="md" borderRadius="20px">
            <Stack direction="column" spacing="20px">
              <Stack direction="row" alignItems="center" spacing="10px">
                <Box
                  p="10px"
                  bgColor="jsip.primary"
                  color="white"
                  borderRadius="8px"
                >
                  <Icon icon="bxs:school" fontSize="20px" />
                </Box>
                <Text fontWeight="700" fontSize="20px">
                  Data Sekolah
                </Text>
              </Stack>
              <Stack direction="column" spacing="5px">
                <Text fontSize="14px" color="jsip.grey700">
                  Nama Sekolah
                </Text>
                <Text fontWeight="700" fontSize="18px">
                  {tracking?.school?.school_name}
                </Text>
              </Stack>
              <Stack direction="column" spacing="5px">
                <Text fontSize="14px" color="jsip.grey700">
                  Nama Kepalah Sekolah
                </Text>
                <Text fontWeight="700" fontSize="18px">
                  {tracking?.school?.principal_name}
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Container>
      )}

      {tracking?.tracking && (
        <Container maxW="container.sm" mt="40px">
          <Box
            p="20px"
            bgColor="white"
            boxShadow="md"
            borderRadius="20px"
            w="100%"
          >
            <Stack direction="column" spacing="20px" w="100%">
              <Stack direction="row" alignItems="center" spacing="10px">
                <Box
                  p="10px"
                  bgColor="jsip.primary"
                  color="white"
                  borderRadius="8px"
                >
                  <Icon icon="bxs:school" fontSize="20px" />
                </Box>
                <Text fontWeight="700" fontSize="20px">
                  Data Tracking
                </Text>
              </Stack>

              <Stack direction="column" spacing="5px">
                <Text fontSize="14px" color="jsip.grey700">
                  Nomor
                </Text>
                <Text fontWeight="700" fontSize="18px">
                  {tracking?.tracking?.legal_id}
                </Text>
              </Stack>

              <Box w="100%">
                <Box position="relative" w="100%">
                  <Stack direction="column" spacing="20px" w="100%">
                    {tracking?.tracking?.detail?.map((tr, index) => (
                      <Stack
                        direction="row"
                        alignItems="start"
                        spacing={["16px", "16px", "24px", "24px"]}
                        key={tr?.tracking_name}
                        w="100%"
                        h="100%"
                      >
                        <Box position="relative" h="100%">
                          <Circle
                            bgColor="#00649A"
                            color="white"
                            minW="30px"
                            minH="30px"
                            fontWeight={700}
                            zIndex={2}
                          />
                          {index + 1 < tracking?.tracking?.detail?.length ? (
                            <>
                              <Box
                                position="absolute"
                                w="8px"
                                h="50px"
                                left="11px"
                                bg="#00649A40"
                              />
                            </>
                          ) : null}
                        </Box>
                        <Stack direction="column" spacing="20px" w="100%">
                          <Stack direction="column" spacing="0px" w="100%">
                            <Text
                              fontSize="18px"
                              fontWeight="700"
                              color="#2E2E2E"
                              textTransform="capitalize"
                            >
                              {tr?.tracking_status}
                            </Text>
                            {tr?.time && (
                              <Text color="#606062" fontSize="14px">
                                {moment(new Date(tr?.time)).format(
                                  "DD MMMM YYYY, hh:mm"
                                )}
                              </Text>
                            )}
                          </Stack>
                        </Stack>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              </Box>

              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Nomor</Th>
                    <Th>Nama</Th>
                    <Th>Deskripsi</Th>
                    <Th>Status</Th>
                    <Th>Download</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {tracking?.tracking?.applicant?.map((applicant) => (
                    <Tr>
                      <Td fontWeight="700">{applicant?.id}</Td>
                      <Td>{applicant?.applicant_name}</Td>
                      <Td>{applicant?.achievement_description}</Td>
                      <Td>
                        <Tag
                          variant="subtle"
                          colorScheme={statusColor(applicant?.status)}
                        >
                          {translateStatusTracking(applicant?.status)}
                        </Tag>
                      </Td>
                      <Td>
                        {applicant?.certificate_url ? (
                          <>
                            <Link
                              href={applicant?.certificate_url}
                              color="jsip.primary"
                              isExternal
                            >
                              Download Sertifikat
                            </Link>
                          </>
                        ) : null}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Stack>
          </Box>
        </Container>
      )}
    </Box>
  );
}
