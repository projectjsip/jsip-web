import { Box, Skeleton, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../components/AppComponents/Breadcrumb";
import Layout from "../../components/AppComponents/Layout";
import { fetchGetSubmission } from "../../networks/libs/apply";
import { formatter } from "../../utils/formatter";
import ModalDetailImage from "../../components/AppComponents/ModalDetailImage";

export default function AdminApplyDetail() {
  let { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [submission, setSubmission] = useState([]);

  useEffect(() => {
    const getSubmission = async () => {
      try {
        setIsLoading(true);
        const response = await fetchGetSubmission(
          localStorage.getItem("token"),
          id
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

    getSubmission(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const breadcrumbItems = [
    {
      title: "Pengajuan",
      link: "/admin/apply",
    },
    {
      title: "Detail Pengajuan",
      link: `/admin/apply/${submission?.id}`,
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
                <Text color="jsip.grey700">Tipe Identitas</Text>
                <Text textTransform="uppercase" fontWeight="700">
                  {submission?.identity_type}
                </Text>
              </Stack>
              <Stack direction="column" spacing="8px">
                <Text color="jsip.grey700">Nomor Identitas</Text>
                <Text textTransform="uppercase" fontWeight="700">
                  {submission?.identity_number}
                </Text>
              </Stack>
              <Stack direction="column" spacing="8px">
                <Text color="jsip.grey700">Nama Pemohon</Text>
                <Text textTransform="uppercase" fontWeight="700">
                  {submission?.applicant_name}
                </Text>
              </Stack>
              <Stack direction="column" spacing="8px">
                <Text color="jsip.grey700">Prestasi</Text>
                <Text textTransform="uppercase" fontWeight="700">
                  {submission?.achievement_description}
                </Text>
              </Stack>
              <Stack direction="column" spacing="8px" alignItems="start">
                <Text color="jsip.grey700">Foto Sertifikat</Text>
                <ModalDetailImage
                  src={submission?.certificate_image}
                  name="Foto Sertifikat"
                />
              </Stack>
              <Stack direction="column" spacing="8px" alignItems="start">
                <Text color="jsip.grey700">Foto Dokumentasi</Text>
                <ModalDetailImage
                  src={submission?.documentation_image}
                  name="Foto Dokumentasi"
                />
              </Stack>
              <Stack direction="column" spacing="8px" alignItems="start">
                <Text color="jsip.grey700">Foto Akun Bank</Text>
                <ModalDetailImage
                  src={submission?.bank_account_image}
                  name="Foto Akun Bank"
                />
              </Stack>
              {submission?.identity_image ? (
                <>
                  <Stack direction="column" spacing="8px" alignItems="start">
                    <Text color="jsip.grey700">Foto Identitas</Text>
                    <ModalDetailImage
                      src={submission?.identity_image}
                      name="Foto Identitas"
                    />
                  </Stack>
                </>
              ) : null}

              {submission?.family_card_image ? (
                <>
                  <Stack direction="column" spacing="8px" alignItems="start">
                    <Text color="jsip.grey700">Foto Kartu Keluarga</Text>
                    <ModalDetailImage
                      src={submission?.family_card_image}
                      name="Foto Kartu Keluarga"
                    />
                  </Stack>
                </>
              ) : null}

              <Stack direction="column" spacing="8px" alignItems="start">
                <Text color="jsip.grey700">Penyelenggara</Text>
                <Text fontWeight="700">
                  {submission?.organizer}
                </Text>
              </Stack>

              <Stack direction="column" spacing="8px" alignItems="start">
                <Text color="jsip.grey700">Info Tambahan</Text>
                <Text fontWeight="700">
                  {submission?.additional_info}
                </Text>
              </Stack>
              {submission?.submission_data?.proof_image &&
              submission?.submission_data?.reward_amount ? (
                <>
                  <Stack direction="column" spacing="8px" alignItems="start">
                    <Text color="jsip.grey700">Bukti Pembayaran</Text>
                    <ModalDetailImage
                      src={submission?.submission_data.proof_image}
                      name="Bukti Pembayaran"
                    />
                  </Stack>
                  <Stack direction="column" spacing="8px" alignItems="start">
                    <Text color="jsip.grey700">Total Reward</Text>
                    <Text fontWeight="700">
                      Rp{" "}
                      {formatter.format(
                        submission?.submission_data?.reward_amount
                      )}
                    </Text>
                  </Stack>
                </>
              ) : (
                <></>
              )}
            </Stack>
          </Box>
        </Skeleton>
      </Stack>
    </Layout>
  );
}
