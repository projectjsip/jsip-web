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
import { Link } from "react-router-dom";
import { fetchGetAllGallery } from "../../../networks/libs/gallery";
import ModalDeleteGallery from "../../../components/Gallery/ModalDeleteGallery";
import AdminPaginationFooter from "../../../components/AppComponents/AdminPaginationFooter";
import ModalDetailImage from "../../../components/AppComponents/ModalDetailImage";

export default function Gallery() {
  const [isLoading, setIsLoading] = useState(false);
  const [galleries, setgalleries] = useState([]);

  const getAllGallery = async () => {
    try {
      setIsLoading(true);
      const response = await fetchGetAllGallery(localStorage.getItem("token"));

      if (response.data.content) {
        setIsLoading(false);
        setgalleries(response.data.content);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllGallery();
  }, []);

  const dataLength = galleries?.data?.length ?? 0; // Ganti sesuai panjang data
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
    <Layout pageName="Data Foto Galeri">
      <Stack direction="column" spacing="24px">
        <Stack
          spacing="4px"
          direction={["column", "column", "row", "row"]}
          alignItems="center"
        >
          <Spacer />
          <Link to="/super-admin/gallery/create">
            <Button
              w={["100%", "100%", "fit-content", "fit-content"]}
              variant="jsip-primary"
              rightIcon={<Icon icon="bx:plus" />}
            >
              Tambah Foto
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
                {galleries?.data && galleries?.data?.length > 0 ? (
                  <>
                    {galleries?.data?.map((sub, index) => (
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
                              <ModalDeleteGallery
                                id={sub?.id}
                                onSuccess={() => getAllGallery()}
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
