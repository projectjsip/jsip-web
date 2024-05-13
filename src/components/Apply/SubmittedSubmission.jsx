/* eslint-disable react-hooks/exhaustive-deps */

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Skeleton,
  Text,
  Stack,
  Button,
  Box,
  Tag,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminPaginationFooter from "../../components/AppComponents/AdminPaginationFooter";
import { fetchAllBatch } from "../../networks/libs/batch";
import { translateStatus } from "../../utils/translate";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/user";

export default function SubmittedSubmission() {
  // const navigate = useNavigate();
  const user = useRecoilValue(userState)
  const [isLoading, setIsLoading] = useState(false);
  const [batch, setBatch] = useState([]);

  const getAllbatch = async (schoolId, page) => {
    try {
      setIsLoading(true);
      const response = await fetchAllBatch(
        localStorage.getItem("token"),
        schoolId,
        page
      );

      if (response.data.content) {
        setIsLoading(false);
        setBatch(response.data.content);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllbatch(user?.school_id, 1);
  }, []);

  const dataLength = batch?.total ?? 0; // Ganti sesuai panjang data
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
    getAllbatch(user?.school_id, page + 1);
  };

  return (
    <Stack direction="column" spacing="24px">
      <Skeleton isLoaded={!isLoading} borderRadius="8px">
        <Box overflow="auto">
          <Table variant="simple" borderRadius="8px" mb="24px">
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Nomor Legal</Th>
                <Th>Sekolah</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {batch?.data && batch?.data?.length > 0 ? (
                <>
                  {batch?.data?.map((sub, index) => (
                    <>
                      <Tr key={sub?.id}>
                        <Td>{index + 1}</Td>
                        <Td>
                          <Text fontWeight="700">{sub?.legal_id}</Text>
                        </Td>
                        <Td>
                          <Text as="span" fontWeight="700">
                            {sub?.school?.school_name}
                          </Text>{" "}
                          - NPSN : {sub?.school?.npsn}
                        </Td>
                        <Td>
                          <Tag variant="subtle" colorScheme="cyan">
                            {translateStatus(sub?.status)}
                          </Tag>{" "}
                        </Td>
                        <Td>
                          <Stack direction="row" spacing="8px">
                            <Link to={`/admin/apply/batch/${sub?.id}`}>
                              <Button
                                size="sm"
                                variant="jsip-primary"
                                leftIcon={<Icon icon="bx:show" />}
                              >
                                Lihat Detail
                              </Button>
                            </Link>
                            {sub?.status === "finished" ? (
                              <>
                                <ChakraLink
                                  href={`https://api.j-sip.com/generate-legal-pdf/${sub?.id}`}
                                  isExternal
                                >
                                  <Button
                                    size="sm"
                                    leftIcon={<Icon icon="bx:show" />}
                                  >
                                    Lihat Dokumen
                                  </Button>
                                </ChakraLink>
                              </>
                            ) : null}
                          </Stack>
                        </Td>
                      </Tr>
                    </>
                  ))}
                </>
              ) : (
                <>
                  <Tr>
                    <Td colSpan={5} textAlign="center">
                      Belum ada data pengajuan
                    </Td>
                  </Tr>
                </>
              )}
            </Tbody>
          </Table>
          <AdminPaginationFooter
            pageIndex={pageIndex}
            maxPage={maxPage}
            onChangePage={changePage}
            numberDisplayed={numberDisplayed}
            setNumberDisplayed={setNumberDisplayed}
          />
        </Box>
      </Skeleton>
    </Stack>
  );
}
