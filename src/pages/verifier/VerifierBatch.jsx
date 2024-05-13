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
import Layout from "../../components/AppComponents/Layout";
import AdminPaginationFooter from "../../components/AppComponents/AdminPaginationFooter";
import { fetchAllBatch } from "../../networks/libs/batch";
import { fetchAllSchoolNoPaginate } from "../../networks/libs/school";
import { translateStatus } from "../../utils/translate";
import AsyncSelect from "react-select/async";

export default function VerifierBatch() {
  // const navigate = useNavigate();
  const [isLoadingSchool, setIsLoadingSchool] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [batch, setBatch] = useState([]);
  const [schools, setSchools] = useState([]);
  const [schoolId, setSchoolId] = useState("");

  const getAllSchool = async () => {
    setIsLoadingSchool(true);
    await fetchAllSchoolNoPaginate(localStorage.getItem("token"))
      .then((response) => {
        const schoolsOptions = response.data?.content?.map((school) => ({
          value: school?.id,
          label: school?.school_name,
        }));

        setSchools(schoolsOptions);
        setIsLoadingSchool(false);
      })
      .catch((error) => {
        setIsLoadingSchool(false);
      });
  };

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
    getAllSchool();
    getAllbatch(schoolId, 1);
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
    getAllbatch(schoolId, page + 1);
  };

  const filterSchool = (inputValue) => {
    return schools.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterSchool(inputValue));
    }, 1000);
  };

  return (
    <Layout pageName="Pengajuan Sekolah">
      <Stack direction="column" spacing="24px">
        <Stack
          spacing="8px"
          direction={["column", "column", "row", "row"]}
          alignItems="center"
        >
          <Box minW={["100%", "100%", "400px", "400px"]}>
            <Skeleton isLoaded={!isLoadingSchool} borderRadius="8px">
              <AsyncSelect
                cacheOptions
                loadOptions={loadOptions}
                defaultOptions
                placeholder="Pilih sekolah.."
                isClearable
                value={schoolId?.value}
                onChange={(event) => {
                  setSchoolId(event?.value);
                  getAllbatch(event?.value, 1);
                }}
              />
            </Skeleton>
          </Box>
        </Stack>

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
                              <Link to={`/verifier/batch/${sub?.id}`}>
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
    </Layout>
  );
}
