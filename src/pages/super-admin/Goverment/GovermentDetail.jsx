import { Box, Image, Skeleton, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGetGoverment } from "../../../networks/libs/goverment";
import Layout from "../../../components/AppComponents/Layout";
import Breadcrumb from "../../../components/AppComponents/Breadcrumb";

export default function GovermentDetail() {
  let { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [goverment, setgoverment] = useState([]);

  useEffect(() => {
    const getGoverment = async () => {
      try {
        setIsLoading(true);
        const response = await fetchGetGoverment(
          localStorage.getItem("token"),
          id
        );

        if (response.data.content) {
          setIsLoading(false);
          setgoverment(response.data.content);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    };

    getGoverment(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const breadcrumbItems = [
    {
      title: "Data Pemerintah",
      link: "/super-admin/goverment",
    },
    {
      title: "Detail Data Pemerintah",
      link: `/super-admin/goverment/${goverment?.id}`,
    },
  ];
  return (
    <Layout pageName="Detail Pengajuan">
      <Stack direction="column" spacing="40px">
        <Breadcrumb items={breadcrumbItems} />
        <Skeleton isLoaded={!isLoading}>
          <Box>
            <Stack direction="column" spacing="24px">
              <Stack direction="column" spacing="8px">
                <Text color="jsip.grey700">Nama</Text>
                <Text textTransform="uppercase" fontWeight="700">
                  {goverment?.name}
                </Text>
              </Stack>
              <Stack direction="column" spacing="8px">
                <Text color="jsip.grey700">Posisi</Text>
                <Text textTransform="uppercase" fontWeight="700">
                  {goverment?.position}
                </Text>
              </Stack>
              <Stack direction="column" spacing="8px">
                <Text color="jsip.grey700">Foto</Text>
                <Image
                  src={goverment?.profile_image}
                  h="120px"
                  w="120px"
                  objectFit="contain"
                />
                <Text textTransform="uppercase" fontWeight="700">
                  {goverment?.applicant_name}
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Skeleton>
      </Stack>
    </Layout>
  );
}
