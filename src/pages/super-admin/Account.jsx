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
import { Link } from "react-router-dom";
import Layout from "../../components/AppComponents/Layout";
import { fetchAllUser } from "../../networks/libs/user";
import AdminPaginationFooter from "../../components/AppComponents/AdminPaginationFooter";
import ModalDeleteAccount from "../../components/Account/ModalDeleteAccount";

export default function Account() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [users, setusers] = useState([]);

  const getAllusers = async (search, page) => {
    setIsLoading(true);
    await fetchAllUser(localStorage.getItem("token"), search, page)
      .then((response) => {
        setIsLoading(false);
        setusers(response.data.content);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getAllusers("", 1);
  }, []);

  const handleChangeKeyword = (value) => {
    setSearchKeyword(value);
    getAllusers(value, 1);
  };

  const dataLength = users?.total ?? 0; // Ganti sesuai panjang data
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
    setSearchKeyword("");
    getAllusers("", page + 1);
  };

  return (
    <Layout pageName="Data Akun J-SIP">
      <Stack direction="column" spacing="24px">
        <Stack
          spacing="4px"
          direction={["column", "column", "row", "row"]}
          alignItems="center"
        >
          <Input
            placeholder="Cari nama akun..."
            maxW={["100%", "100%", "300px", "300px"]}
            value={searchKeyword}
            onChange={(event) => handleChangeKeyword(event.target.value)}
          />
          <Spacer />
          <Link to="/super-admin/account/create">
            <Button
              w={["100%", "100%", "fit-content", "fit-content"]}
              variant="jsip-primary"
              rightIcon={<Icon icon="bx:plus" />}
            >
              Buat Akun Baru
            </Button>
          </Link>
        </Stack>

        <Skeleton isLoaded={!isLoading} borderRadius="8px">
          <Box overflow="auto">
            <Table variant="simple" borderRadius="8px" mb="24px">
              <Thead>
                <Tr>
                  <Th>No</Th>
                  <Th>Nama</Th>
                  <Th>Email</Th>
                  <Th>Role</Th>
                  <Th>Nomor Telepon</Th>
                  <Th>Nomor Identitas</Th>
                  <Th>Posisi</Th>
                  <Th>Nama Sekolah</Th>
                  <Th>Nama Kepala Sekolah</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users?.data && users?.data?.length > 0 ? (
                  <>
                    {users?.data?.map((user, index) => (
                      <>
                        <Tr key={user?.id}>
                          <Td>{index + 1}</Td>
                          <Td fontWeight="700">{user?.name}</Td>
                          <Td>{user?.email}</Td>
                          <Td>{user?.role}</Td>
                          <Td>{user?.phone_number}</Td>
                          <Td>{user?.identity_number}</Td>
                          <Td>{user?.position}</Td>
                          <Td>
                            {user?.school?.school_name
                              ? user?.school?.school_name
                              : "-"}
                          </Td>
                          <Td>
                            {user?.school?.principal_name
                              ? user?.school?.principal_name
                              : "-"}
                          </Td>
                          <Td>
                            <ModalDeleteAccount
                              id={user?.id}
                              onSuccess={() => getAllusers("")}
                            />
                          </Td>
                        </Tr>
                      </>
                    ))}
                  </>
                ) : (
                  <>
                    <Tr>
                      <Td colSpan={9} textAlign="center">
                        Belum ada data akun J-SIP
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
