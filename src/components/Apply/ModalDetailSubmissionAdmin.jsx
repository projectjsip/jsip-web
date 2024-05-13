import {
  Box,
  Button,
  Skeleton,
  Stack,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Tag,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { fetchGetSubmission } from "../../networks/libs/apply";
import { Icon } from "@iconify/react";
import ModalDetailImage from "../AppComponents/ModalDetailImage";
import { statusColor, translateStatusTracking } from "../../utils/translate";
import { formatter } from "../../utils/formatter";

function ModalDetailSubmissionAdmin({
  id,
  statusApply,
  reasonRejected,
  proofImage,
  rewardAmount,
}) {
  const modalDetail = useDisclosure();

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
  }, [id]);

  return (
    <>
      <Button
        size="sm"
        variant="jsip-primary"
        leftIcon={<Icon icon="bx:show" />}
        onClick={modalDetail.onOpen}
      >
        Lihat Detail
      </Button>

      <Modal
        size="xl"
        isCentered
        isOpen={modalDetail.isOpen}
        onClose={modalDetail.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex" alignItems="center">
            Detail Pengajuan
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody maxH="500px" overflow="auto">
            <Stack direction="column" spacing="20px">
              <Stack direction="column" spacing="24px" alignItems="start">
                <Stack direction="column" spacing="4px" alignItems="start">
                  <Text color="jsip.grey700">Status</Text>
                  <Tag variant="subtle" colorScheme={statusColor(statusApply)}>
                    {translateStatusTracking(statusApply)}
                  </Tag>
                </Stack>

                {statusApply === "rejected" ? (
                  <>
                    <Stack direction="column" spacing="4px" alignItems="start">
                      <Text color="jsip.grey700">Alasan ditolak</Text>
                      <Text fontWeight="700">
                        {reasonRejected ? reasonRejected : "-"}
                      </Text>
                    </Stack>
                  </>
                ) : null}

                {statusApply === "accepted" && rewardAmount ? (
                  <>
                    <Stack direction="column" spacing="4px" alignItems="start">
                      <Text color="jsip.grey700">Total Reward</Text>
                      <Text fontWeight="700">
                        Rp {formatter.format(rewardAmount)}
                      </Text>
                    </Stack>
                  </>
                ) : null}

                {statusApply === "accepted" && proofImage ? (
                  <>
                    <Stack direction="column" spacing="4px" alignItems="start">
                      <Text color="jsip.grey700">Bukti Pembayaran</Text>
                      <ModalDetailImage
                        src={proofImage}
                        name="Bukti Pembayaran"
                      />
                    </Stack>
                  </>
                ) : null}
              </Stack>
              <Accordion allowToggle defaultIndex={[0]}>
                <AccordionItem borderRadius="8px" border="1px solid black">
                  <h2>
                    <AccordionButton>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        fontSize="18px"
                        fontWeight="700"
                      >
                        Data Pengajuan
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
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
                          <Stack
                            direction="column"
                            spacing="8px"
                            alignItems="start"
                          >
                            <Text color="jsip.grey700">Foto Sertifikat</Text>
                            <ModalDetailImage
                              src={submission?.certificate_image}
                              name="Foto Sertifikat"
                            />
                          </Stack>
                          <Stack
                            direction="column"
                            spacing="8px"
                            alignItems="start"
                          >
                            <Text color="jsip.grey700">Foto Dokumentasi</Text>
                            <ModalDetailImage
                              src={submission?.documentation_image}
                              name="Foto Dokumentasi"
                            />
                          </Stack>
                          <Stack
                            direction="column"
                            spacing="8px"
                            alignItems="start"
                          >
                            <Text color="jsip.grey700">Foto Akun Bank</Text>
                            <ModalDetailImage
                              src={submission?.bank_account_image}
                              name="Foto Akun Bank"
                            />
                          </Stack>

                          {submission?.identity_image ? (
                            <>
                              <Stack
                                direction="column"
                                spacing="8px"
                                alignItems="start"
                              >
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
                              <Stack
                                direction="column"
                                spacing="8px"
                                alignItems="start"
                              >
                                <Text color="jsip.grey700">
                                  Foto Kartu Keluarga
                                </Text>
                                <ModalDetailImage
                                  src={submission?.family_card_image}
                                  name="Foto Kartu Keluarga"
                                />
                              </Stack>
                            </>
                          ) : null}

                          <Stack
                            direction="column"
                            spacing="8px"
                            alignItems="start"
                          >
                            <Text color="jsip.grey700">Penyelenggara</Text>
                            <Text fontWeight="700">
                              {submission?.organizer}
                            </Text>
                          </Stack>
                          
                          <Stack
                            direction="column"
                            spacing="8px"
                            alignItems="start"
                          >
                            <Text color="jsip.grey700">Info Tambahan</Text>
                            <Text textTransform="uppercase" fontWeight="700">
                              {submission?.additional_info}
                            </Text>
                          </Stack>
                        </Stack>
                      </Box>
                    </Skeleton>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button variant="secondary" mr={3} onClick={modalDetail.onClose}>
              Tutup
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalDetailSubmissionAdmin;
