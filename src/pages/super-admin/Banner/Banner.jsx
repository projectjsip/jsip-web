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
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import Layout from "../../../components/AppComponents/Layout";
import { fetchGetAllJumbotron } from "../../../networks/libs/jumbotron";
import ModalDeleteBanner from "../../../components/Banner/ModalDeleteBanner";
import { Link } from "react-router-dom";
import AdminPaginationFooter from "../../../components/AppComponents/AdminPaginationFooter";
import ModalDetailImage from "../../../components/AppComponents/ModalDetailImage";

export default function Banner() {
  const [isLoading, setIsLoading] = useState(false);
  const [banners, setbanners] = useState([]);

  const getAllBanner = async () => {
    try {
      setIsLoading(true);
      const response = await fetchGetAllJumbotron(
        localStorage.getItem("token")
      );

      if (response.data.content) {
        setIsLoading(false);
        setbanners(response.data.content);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllBanner();
  }, []);

  const dataLength = banners?.data?.length ?? 0; // Ganti sesuai panjang data
  const [pageIndex, setPageIndex] = useState(0);
  const [numberDisplayed, setNumberDisplayed] = useState("5");
  const maxPage = Math.floor(
    dataLength / parseInt(numberDisplayed) +
      (dataLength % parseInt(numberDisplayed) === 0 ? 0 : 1)
  );
  const changePage = (page) => {
    if (page < 0) return;
    if (page >= maxPage) return;
    setPageIndex(page);
  };

  return (
    <Layout pageName="Data Banner">
      <Stack direction="column" spacing="24px">
        <Stack
          spacing="4px"
          direction={["column", "column", "row", "row"]}
          alignItems="center"
        >
          <Spacer />
          <Link to="/super-admin/banner/create">
            <Button
              w={["100%", "100%", "fit-content", "fit-content"]}
              variant="jsip-primary"
              rightIcon={<Icon icon="bx:plus" />}
            >
              Buat Banner Baru
            </Button>
          </Link>
        </Stack>

        <Skeleton isLoaded={!isLoading} borderRadius="8px">
          <Box overflow="auto">
            <Table variant="simple" borderRadius="8px" mb="24px">
              <Thead>
                <Tr>
                  <Th>No</Th>
                  <Th>Foto</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {banners?.data && banners?.data?.length > 0 ? (
                  <>
                    {banners?.data?.map((sub, index) => (
                      <>
                        {Math.floor(index / parseInt(numberDisplayed, 10)) ===
                          pageIndex && (
                          <Tr key={sub?.id}>
                            <Td>{index + 1}</Td>
                            <Td>
                              <ModalDetailImage
                                src={sub?.image_url}
                                name="Foto"
                              />
                            </Td>
                            <Td>
                              <ModalDeleteBanner
                                id={sub?.id}
                                onSuccess={() => getAllBanner()}
                              />
                            </Td>
                          </Tr>
                        )}
                      </>
                    ))}
                  </>
                ) : (
                  <>
                    <Tr>
                      <Td colSpan={4} textAlign="center">
                        Belum ada data banner
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
