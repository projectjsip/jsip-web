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
  Spacer,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Textarea,
  RadioGroup,
  Radio,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  fetchConfirmReviewStatus,
  fetchGetSubmission,
} from "../../networks/libs/apply";
import { Icon } from "@iconify/react";
import ModalDetailImage from "../AppComponents/ModalDetailImage";

function ModalDetailApply({
  id,
  isRejected,
  reasonRejected,
  onChangeStatus,
  statusApply,
}) {
  const toast = useToast();
  const modalDetail = useDisclosure();

  const [status, setStatus] = useState(isRejected);
  const [reason, setReason] = useState(reasonRejected);
  const [isLoadingConfirmStatus, setIsLoadingConfirmStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submission, setSubmission] = useState([]);

  useEffect(() => {
    setStatus(isRejected);
    setReason(reasonRejected);
  }, [isRejected, reasonRejected]);

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

  async function onConfirmStatus() {
    setIsLoadingConfirmStatus(true);
    await fetchConfirmReviewStatus(
      {
        is_rejected: status,
        reason: reason ? reason : undefined,
      },
      localStorage.getItem("token"),
      id
    )
      .then((response) => {
        setIsLoadingConfirmStatus(false);
        onChangeStatus(true);
        toast({
          position: "top",
          title: `Berhasil mengubah status pengajuan! `,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        modalDetail.onClose();
      })
      .catch((error) => {
        setIsLoadingConfirmStatus(false);
        toast({
          position: "top",
          title: error.response.data.info
            ? error.response.data.info
            : error.response.data.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  }

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
              {statusApply === "process" ? (
                <>
                  <Stack direction="column" spacing="5px">
                    <Text color="jsip.grey700">Apakah diterima?</Text>
                    <RadioGroup
                      onChange={(value) => {
                        setStatus(value);
                        setReason("");
                      }}
                      value={status}
                    >
                      <Stack direction="row" spacing="30px">
                        <Radio value="false">Diterima</Radio>
                        <Radio value="true">Ditolak</Radio>
                      </Stack>
                    </RadioGroup>
                  </Stack>
                  <Stack direction="column" spacing="5px">
                    <Text color="jsip.grey700">Alasan ditolak</Text>
                    <Textarea
                      isDisabled={status === "false"}
                      value={reason}
                      onChange={(event) => setReason(event.target.value)}
                    ></Textarea>
                  </Stack>
                </>
              ) : null}

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
            <Spacer />
            {statusApply === "process" ? (
              <>
                <Button
                  variant="jsip-primary"
                  isLoading={isLoadingConfirmStatus}
                  onClick={onConfirmStatus}
                >
                  Simpan
                </Button>
              </>
            ) : null}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalDetailApply;
