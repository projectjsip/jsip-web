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
  //   Input,
  Button,
  Spacer,
  Box,
  Tag,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchGetAllSubmission } from "../../networks/libs/apply";
import { statusColor, translateStatusTracking } from "../../utils/translate";
import AdminPaginationFooter from "../AppComponents/AdminPaginationFooter";

function AllSubmission() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [submission, setSubmission] = useState([]);

  const getAllSubmission = async (page) => {
    try {
      setIsLoading(true);
      const response = await fetchGetAllSubmission(
        localStorage.getItem("token"),
        "all",
        page
      );

      if (response.data.content) {
        setIsLoading(false);
        setSubmission(response.data.content);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllSubmission(1);
  }, []);

  const dataLength = submission?.data?.length ?? 0; // Ganti sesuai panjang data
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
    getAllSubmission(page + 1);
  };
  return (
    <>
      <Stack direction="column" spacing="24px">
        <Stack
          spacing="8px"
          direction={["column", "column", "row", "row"]}
          alignItems="center"
        >
          {/* <Input
            placeholder="Cari pengajuan..."
            maxW={["100%", "100%", "300px", "300px"]}
          /> */}
          <Spacer />
          <Button
            w={["100%", "100%", "fit-content", "fit-content"]}
            variant="jsip-primary"
            onClick={() => navigate("/admin/apply/create")}
            rightIcon={<Icon icon="bx:plus" />}
          >
            Buat Pengajuan Baru
          </Button>
        </Stack>

        <Skeleton isLoaded={!isLoading} borderRadius="8px">
          <Box overflow="auto">
            <Table variant="simple" borderRadius="8px" mb="24px">
              <Thead>
                <Tr>
                  <Th>No</Th>
                  <Th>Nomor Identitas</Th>
                  <Th>Nama Pemohon</Th>
                  <Th>Info Tambahan</Th>
                  <Th>Status</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {submission?.data && submission?.data?.length > 0 ? (
                  <>
                    {submission?.data?.map((sub, index) => (
                      <>
                        {Math.floor(index / parseInt(numberDisplayed, 10)) ===
                          pageIndex && (
                          <Tr key={sub?.id}>
                            <Td>{index + 1}</Td>
                            <Td>
                              <Text fontWeight="700">
                                <Text as="span" textTransform="uppercase">
                                  {sub?.identity_type}
                                </Text>{" "}
                                - {sub?.identity_number}
                              </Text>
                            </Td>
                            <Td>{sub?.applicant_name}</Td>
                            <Td>
                              {sub?.additional_info
                                ? sub?.additional_info
                                : "-"}
                            </Td>
                            <Td>
                              <Tag
                                variant="subtle"
                                colorScheme={statusColor(sub?.status)}
                              >
                                {translateStatusTracking(sub?.status)}
                              </Tag>
                            </Td>
                            <Td>
                              <Stack direction="row" spacing="8px">
                                <Link to={`/admin/apply/${sub?.id}`}>
                                  <Button
                                    size="sm"
                                    variant="jsip-primary"
                                    leftIcon={<Icon icon="bx:show" />}
                                  >
                                    Lihat Detail
                                  </Button>
                                </Link>
                                {sub?.status === "process" ? (
                                  <>
                                    <Link to={`/admin/apply/edit/${sub?.id}`}>
                                      <Button
                                        size="sm"
                                        colorScheme="green"
                                        leftIcon={<Icon icon="bx:edit" />}
                                      >
                                        Edit
                                      </Button>
                                    </Link>
                                  </>
                                ) : null}
                              </Stack>
                            </Td>
                          </Tr>
                        )}
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
    </>
  );
}

export default AllSubmission;
