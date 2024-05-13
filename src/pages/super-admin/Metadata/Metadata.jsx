import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Skeleton,
  Stack,
  Box,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Layout from "../../../components/AppComponents/Layout";
import { fetchAllMetadata } from "../../../networks/libs/metadata";
import ModalUpdateMetadata from "../../../components/Metadata/ModalUpdateMetadata";

export default function Metadata() {
  const [isLoading, setIsLoading] = useState(false);
  const [metadatas, setMetadatas] = useState([]);

  const getAllMetadata = async () => {
    try {
      setIsLoading(true);
      const response = await fetchAllMetadata(localStorage.getItem("token"));

      if (response.data.content) {
        setIsLoading(false);
        setMetadatas(response.data.content);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllMetadata();
  }, []);

  return (
    <Layout pageName="Data Pendukung">
      <Stack direction="column" spacing="24px">
        <Skeleton isLoaded={!isLoading} borderRadius="8px">
          <Box overflow="auto">
            <Table variant="simple" borderRadius="8px" mb="24px">
              <Thead>
                <Tr>
                  <Th>No</Th>
                  <Th>Data Label</Th>
                  <Th>Data Type</Th>
                  <Th>Nilai</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {metadatas && metadatas?.length > 0 ? (
                  <>
                    {metadatas?.map((meta, index) => (
                      <>
                        <Tr key={meta?.id}>
                          <Td>{index + 1}</Td>
                          <Td>{meta?.meta_label}</Td>
                          <Td>{meta?.meta_type}</Td>
                          <Td>{meta?.meta_value}</Td>
                          <Td>
                            <ModalUpdateMetadata
                              label={meta?.meta_label}
                              metaType={meta?.meta_type}
                              metaValue={meta?.meta_value}
                              onSuccess={() => getAllMetadata()}
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
                        Belum ada data metadata
                      </Td>
                    </Tr>
                  </>
                )}
              </Tbody>
            </Table>
          </Box>
        </Skeleton>
      </Stack>
    </Layout>
  );
}
