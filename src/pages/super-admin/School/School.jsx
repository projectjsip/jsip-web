import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Skeleton,
  Stack,
  Button,
  Spacer,
  Box,
  Input,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import Layout from "../../../components/AppComponents/Layout";
import { Link } from "react-router-dom";
import { fetchAllSchool } from "../../../networks/libs/school";
import ModalUpdateSchool from "../../../components/School/ModalUpdateSchool";
import AdminPaginationFooter from "../../../components/AppComponents/AdminPaginationFooter";

export default function School() {
  const [isLoading, setIsLoading] = useState(false);
  const [school, setSchool] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  const getAllschool = async (filter, page) => {
    setIsLoading(true);
    await fetchAllSchool(localStorage.getItem("token"), filter, page)
      .then((response) => {
        setIsLoading(false);
        setSchool(response.data.content);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getAllschool("", 1);
  }, []);

  const handleChangeKeyword = (value) => {
    setSearchKeyword(value);
    getAllschool(value, 1);
  };

  const dataLength = school?.total ?? 0; // Ganti sesuai panjang data
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
    getAllschool("", page + 1);
  };

  return (
    <Layout pageName="Data Sekolah">
      <Stack direction="column" spacing="24px">
        <Stack
          spacing="4px"
          direction={["column", "column", "row", "row"]}
          alignItems="center"
        >
          <Input
            placeholder="Cari nama sekolah..."
            maxW={["100%", "100%", "300px", "300px"]}
            value={searchKeyword}
            onChange={(event) => handleChangeKeyword(event.target.value)}
          />
          <Spacer />
          <Link to="/super-admin/school/create">
            <Button
              w={["100%", "100%", "fit-content", "fit-content"]}
              variant="jsip-primary"
              rightIcon={<Icon icon="bx:plus" />}
            >
              Buat Sekolah Baru
            </Button>
          </Link>
        </Stack>

        <Skeleton isLoaded={!isLoading} borderRadius="8px">
          <Box overflow="auto">
            <Table variant="simple" borderRadius="8px" mb="24px">
              <Thead>
                <Tr>
                  <Th>No</Th>
                  <Th>Nama Sekolah</Th>
                  <Th>NPSN</Th>
                  <Th>Nama Kepala Sekolah</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {school?.data && school?.data?.length > 0 ? (
                  <>
                    {school?.data?.map((sch, index) => (
                      <>
                        <Tr key={sch?.id}>
                          <Td>{index + 1}</Td>
                          <Td>{sch?.school_name}</Td>
                          <Td>{sch?.npsn}</Td>
                          <Td>{sch?.principal_name}</Td>
                          <Td>
                            <ModalUpdateSchool
                              id={sch?.id}
                              onSuccess={() => getAllschool()}
                              schoolName={sch?.school_name}
                              npsn={sch?.npsn}
                              principalName={sch?.principal_name}
                            />
                          </Td>
                        </Tr>
                      </>
                    ))}
                  </>
                ) : (
                  <>
                    <Tr>
                      <Td colSpan={4} textAlign="center">
                        Belum ada data sekolah
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
              showBaris={false}
            />
          </Box>
        </Skeleton>
      </Stack>
    </Layout>
  );
}
