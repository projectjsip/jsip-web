import React, { useEffect, useState } from "react";
import Layout from "../../components/AppComponents/Layout";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/user";
import { fetchTrackingBySchoolId } from "../../networks/libs/school";
import {
  Box,
  Button,
  Circle,
  Show,
  SimpleGrid,
  Skeleton,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import moment from "moment";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [isLoadingTracking, setIsLoadingTracking] = useState(false);
  const [tracking, setTracking] = useState({});

  const user = useRecoilValue(userState);

  const getTracking = async () => {
    const npsn = user?.school?.npsn;

    setIsLoadingTracking(true);
    await fetchTrackingBySchoolId({ NPSN: npsn })
      .then((response) => {
        setIsLoadingTracking(false);
        setTracking(response.data.content);
      })
      .catch((error) => {
        setIsLoadingTracking(false);
      });
  };

  useEffect(() => {
    getTracking(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.school?.npsn]);

  return (
    <Layout pageName="Dashboard">
      <Skeleton isLoaded={!isLoadingTracking}>
        <Stack direction="column" spacing="20px">
          {tracking?.school && (
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
          )}
          {tracking?.tracking && (
            <>
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
                      Tracking Pengajuan Berlangsung
                    </Text>
                    <Spacer />
                    <Link to={`/tracking?npsn=${user?.school?.npsn}`}>
                      <Button size="sm">Lihat Detail</Button>
                    </Link>
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
                    <Show above="md">
                      <Box position="relative" w="100%">
                        <Box
                          bgColor="#00649A40"
                          h="7px"
                          w="100%"
                          position="absolute"
                          top="12px"
                        ></Box>
                        <SimpleGrid
                          gap="20px"
                          columns={tracking?.tracking?.detail.length}
                        >
                          {tracking?.tracking?.detail?.map((tr, index) => (
                            <>
                              <Box>
                                <Stack
                                  direction="column"
                                  spacing="10px"
                                  alignItems="center"
                                >
                                  <Circle
                                    bgColor="#00649A"
                                    color="white"
                                    minW="30px"
                                    minH="30px"
                                    fontWeight={700}
                                    zIndex={2}
                                  />
                                  <Stack
                                    direction="column"
                                    spacing="0px"
                                    w="100%"
                                    alignItems="center"
                                  >
                                    <Text
                                      fontSize="16px"
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
                              </Box>
                            </>
                          ))}
                        </SimpleGrid>
                      </Box>
                    </Show>
                    <Show below="md">
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
                                {index + 1 <
                                tracking?.tracking?.detail?.length ? (
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
                                <Stack
                                  direction="column"
                                  spacing="0px"
                                  w="100%"
                                >
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
                    </Show>
                  </Box>
                </Stack>
              </Box>
            </>
          )}
        </Stack>
      </Skeleton>
    </Layout>
  );
}
