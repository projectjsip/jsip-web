/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import Layout from "../../components/AppComponents/Layout";
import {
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Skeleton,
  Text,
  Box,
  Tag,
  Flex,
  Spacer,
  Link as ChakraLink,
  Button,
  Link,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../components/AppComponents/Breadcrumb";
import {
  fetchAllSubmissionByBatchId,
  fetchBatchDetail,
} from "../../networks/libs/batch";
import AdminPaginationFooter from "../../components/AppComponents/AdminPaginationFooter";

import {
  statusColor,
  translateStatus,
  translateStatusTracking,
} from "../../utils/translate";
import ModalDetailApply from "../../components/Apply/ModalDetailApply";
import ModalSubmitProf from "../../components/Apply/ModalSubmitProf";
import { Icon } from "@iconify/react";
import ModalFundDistribution from "../../components/Apply/ModalFundDistribution";
import ModalFinishSubmission from "../../components/Apply/ModalFinishSubmission";

export default function VerifierBatchDetail() {
  let { id } = useParams();

  const breadcrumbItems = [
    {
      title: "Pengajuan",
      link: "/verifier/batch",
    },
    {
      title: "Detail Pengajuan",
      link: `/verifier/batch/${id}`,
    },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBatchDetail, setIsLoadingBatchDetail] = useState(false);
  const [batch, setBatch] = useState([]);
  const [batchDetail, setBatchDetail] = useState({});

  const getSubmissionByBatchId = async (page) => {
    try {
      setIsLoading(true);
      const response = await fetchAllSubmissionByBatchId(
        localStorage.getItem("token"),
        id,
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

  const getBatchDetail = async (page) => {
    try {
      setIsLoadingBatchDetail(true);
      const response = await fetchBatchDetail(
        localStorage.getItem("token"),
        id
      );

      if (response.data.content) {
        setIsLoadingBatchDetail(false);
        setBatchDetail(response.data.content);
      } else {
        setIsLoadingBatchDetail(false);
      }
    } catch (error) {
      setIsLoadingBatchDetail(false);
    }
  };

  useEffect(() => {
    getSubmissionByBatchId(1);
    getBatchDetail();
  }, []);

  const dataLength = batch?.total ?? 0; // Ganti sesuai panjang data
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
    getSubmissionByBatchId(page + 1);
  };

  return (
    <>
      <Layout pageName="Detail Pengajuan Sekolah">
        <Stack direction="column" spacing="40px">
          <Breadcrumb items={breadcrumbItems} />
          <Skeleton isLoaded={!isLoadingBatchDetail} borderRadius="8px">
            <Box
              p="20px"
              boxShadow="md"
              borderRadius="20px"
              borderLeft="5px solid"
              borderColor="jsip.primary"
            >
              <Stack direction="row" spacing="20px" alignItems="center">
                <Stack direction="column" spacing="20px" alignItems="start">
                  <Tag variant="subtle" fontWeight="700">
                    {batchDetail?.legal_id}
                  </Tag>
                  <Stack direction="column" spacing="0px">
                    <Text fontWeight="700"></Text>
                    <Text fontWeight="700">
                      {batchDetail?.school?.school_name} - NPSN :{" "}
                      {batchDetail?.school?.npsn}
                    </Text>
                    <Text>{batchDetail?.school?.principal_name}</Text>
                  </Stack>
                </Stack>

                <Spacer />
                <Stack direction="column" spacing="20px" alignItems="end">
                  <Tag variant="subtle" colorScheme="cyan" size="lg">
                    {translateStatus(batchDetail?.status)}
                  </Tag>

                  {batchDetail?.status !== "finished" ? (
                    <>
                      {batchDetail?.status === "submit_to_verifier" ||
                      batchDetail?.status === "on_review" ? (
                        <>
                          <ModalFundDistribution
                            id={id}
                            onSuccess={() => getBatchDetail()}
                          />
                        </>
                      ) : null}

                      {batchDetail?.status === "fund_distribution" ? (
                        <>
                          <ModalFinishSubmission
                            id={id}
                            onSuccess={() => getBatchDetail()}
                          />
                        </>
                      ) : null}
                    </>
                  ) : (
                    <>
                      <ChakraLink
                        href={`https://api.j-sip.com/generate-legal-pdf/${batchDetail?.id}`}
                        isExternal
                      >
                        <Button size="sm" leftIcon={<Icon icon="bx:show" />}>
                          Lihat Dokumen
                        </Button>
                      </ChakraLink>
                    </>
                  )}
                </Stack>
              </Stack>
            </Box>
          </Skeleton>
          <Skeleton isLoaded={!isLoading} borderRadius="8px">
            <Box overflow="auto">
              <Text fontWeight="700" mb="24px">
                List Pengajuan
              </Text>
              <Table variant="simple" borderRadius="8px" mb="24px">
                <Thead>
                  <Tr>
                    <Th>No</Th>
                    <Th>Nomor Identitas</Th>
                    <Th>Nama Pemohon</Th>
                    <Th>Deskripsi Prestasi</Th>
                    <Th>Info Tambahan</Th>
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
                              <Text fontWeight="700">
                                <Text as="span" textTransform="uppercase">
                                  {sub?.identity_type}
                                </Text>{" "}
                                - {sub?.identity_number}
                              </Text>
                            </Td>
                            <Td>{sub?.applicant_name}</Td>
                            <Td>{sub?.achievement_description}</Td>
                            <Td>{sub?.additional_info}</Td>
                            <Td>
                              <Flex direction="column" alignItems="start">
                                <Tag
                                  variant="subtle"
                                  colorScheme={statusColor(
                                    sub?.submission_data?.status
                                  )}
                                >
                                  {translateStatusTracking(
                                    sub?.submission_data?.status
                                  )}
                                </Tag>{" "}
                                {sub?.submission_data?.proof_image &&
                                sub?.submission_data?.reward_amount ? (
                                  <>
                                    <Tag
                                      variant="subtle"
                                      colorScheme="green"
                                      mt="5px"
                                    >
                                      <Stack
                                        direction="row"
                                        alignItems="center"
                                        spacing="5px"
                                      >
                                        <Text>Bukti Pembayaran</Text>{" "}
                                        <Icon icon="bx:check-circle" />
                                      </Stack>
                                    </Tag>
                                  </>
                                ) : null}
                              </Flex>
                            </Td>
                            <Td>
                              <Stack direction="row" spacing="8px">
                                {sub?.submission_data?.status === "accepted" &&
                                batchDetail?.status === "fund_distribution" ? (
                                  <>
                                    <ModalSubmitProf
                                      id={sub?.id}
                                      statusApply={sub?.submission_data?.status}
                                      onChangeStatus={() =>
                                        getSubmissionByBatchId(1)
                                      }
                                      proofImage={
                                        sub?.submission_data?.proof_image
                                      }
                                      rewardAmount={
                                        sub?.submission_data?.reward_amount
                                      }
                                    />
                                  </>
                                ) : (
                                  <>
                                    <ModalDetailApply
                                      id={sub?.id}
                                      isRejected={
                                        sub?.submission_data?.is_rejected
                                          ? "true"
                                          : "false"
                                      }
                                      reasonRejected={
                                        sub?.submission_data?.reason
                                          ? sub?.submission_data?.reason
                                          : ""
                                      }
                                      statusApply={sub?.submission_data?.status}
                                      onChangeStatus={() =>
                                        getSubmissionByBatchId(1)
                                      }
                                    />
                                  </>
                                )}

                                {sub?.certificate_url ? (
                                  <>
                                    <Link
                                      href={sub?.certificate_url}
                                      color="jsip.primary"
                                      isExternal
                                    >
                                      <Button variant="outline" size="sm">
                                        Download Sertifikat
                                      </Button>
                                    </Link>
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
    </>
  );
}
