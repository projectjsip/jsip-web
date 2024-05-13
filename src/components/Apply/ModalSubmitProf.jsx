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
  ModalBody,
  ModalCloseButton,
  Spacer,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  useToast,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  fetchConfirmFundProof,
  fetchGetSubmission,
} from "../../networks/libs/apply";
import { Icon } from "@iconify/react";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import ModalDetailImage from "../AppComponents/ModalDetailImage";
import {
  numberWithSeparator,
  releaseSeparatorFromString,
} from "../../utils/formatter";

const ProfSchema = Yup.object().shape({
  proof_image: Yup.mixed().required("Required"),
  reward_amount: Yup.number().required("Required"),
});

function ModalSubmitProf({ id, onChangeStatus, proofImage, rewardAmount }) {
  const toast = useToast();
  const modalDetail = useDisclosure();

  const [isLoadingConfirmFundProof, setIsLoadingConfirmFundProof] =
    useState(false);
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

  async function onConfirmFundProof(values) {
    setIsLoadingConfirmFundProof(true);
    await fetchConfirmFundProof(
      {
        proof_image: values.proof_image,
        reward_amount: values.reward_amount,
      },
      localStorage.getItem("token"),
      id
    )
      .then((response) => {
        setIsLoadingConfirmFundProof(false);
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
        setIsLoadingConfirmFundProof(false);
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
        {proofImage && rewardAmount
          ? "Lihat Detail"
          : "Tambah Bukti Pembayaran"}
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
          <ModalBody maxH="500px" overflow="auto" pb="20px">
            <Formik
              initialValues={{
                proof_image: "",
                reward_amount: rewardAmount,
              }}
              validationSchema={ProfSchema}
              onSubmit={(values, actions) => {
                onConfirmFundProof(values);
                actions.setSubmitting(false);
              }}
            >
              {({ errors, touched, setFieldValue, isSubmitting, values }) => (
                <Form>
                  <Stack direction="column" spacing="24px">
                    <Field name="proof_image">
                      {({ field }) => (
                        <FormControl
                          id="proof_image"
                          isInvalid={
                            errors.proof_image !== undefined &&
                            touched.proof_image
                          }
                        >
                          <FormLabel fontSize="xs" color="#595959">
                            Bukti Pembayaran
                          </FormLabel>

                          <Input
                            type="file"
                            placeholder="Bukti Pembayaran"
                            borderRadius="8px"
                            color="jsip.black"
                            _focus={{ border: "2px solid #00649A" }}
                            onChange={(event) => {
                              setFieldValue(
                                "proof_image",
                                event.currentTarget.files[0]
                              );
                            }}
                          />

                          {proofImage ? (
                            <>
                              <Box mt="10px">
                                <ModalDetailImage
                                  src={proofImage}
                                  name="Foto Bukti Pembayaran"
                                />
                              </Box>
                            </>
                          ) : null}

                          {errors.proof_image && touched.proof_image ? (
                            <FormErrorMessage>
                              {errors.proof_image}
                            </FormErrorMessage>
                          ) : null}
                        </FormControl>
                      )}
                    </Field>

                    <Field name="reward_amount">
                      {({ field }) => (
                        <FormControl
                          id="reward_amount"
                          isInvalid={
                            errors.reward_amount !== undefined &&
                            touched.reward_amount
                          }
                        >
                          <FormLabel fontSize="xs" color="#595959">
                            Total Pembayaran
                          </FormLabel>

                          <InputGroup>
                            <InputLeftAddon>Rp</InputLeftAddon>
                            <Input
                              onChange={(e) => {
                                setFieldValue(
                                  "reward_amount",
                                  releaseSeparatorFromString(
                                    e.target.value || "0"
                                  )
                                );
                              }}
                              value={numberWithSeparator(
                                parseInt(values.reward_amount || "0")
                              )}
                              onWheel={(e) => e.currentTarget.blur()}
                              placeholder="Nominal Bonus"
                            />
                          </InputGroup>

                          {errors.reward_amount && touched.reward_amount ? (
                            <FormErrorMessage>
                              {errors.reward_amount}
                            </FormErrorMessage>
                          ) : null}
                        </FormControl>
                      )}
                    </Field>

                    <Accordion allowToggle>
                      <AccordionItem
                        borderRadius="8px"
                        border="1px solid black"
                      >
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
                                  <Text color="jsip.grey700">
                                    Tipe Identitas
                                  </Text>
                                  <Text
                                    textTransform="uppercase"
                                    fontWeight="700"
                                  >
                                    {submission?.identity_type}
                                  </Text>
                                </Stack>
                                <Stack direction="column" spacing="8px">
                                  <Text color="jsip.grey700">
                                    Nomor Identitas
                                  </Text>
                                  <Text
                                    textTransform="uppercase"
                                    fontWeight="700"
                                  >
                                    {submission?.identity_number}
                                  </Text>
                                </Stack>
                                <Stack direction="column" spacing="8px">
                                  <Text color="jsip.grey700">Nama Pemohon</Text>
                                  <Text
                                    textTransform="uppercase"
                                    fontWeight="700"
                                  >
                                    {submission?.applicant_name}
                                  </Text>
                                </Stack>
                                <Stack direction="column" spacing="8px">
                                  <Text color="jsip.grey700">Prestasi</Text>
                                  <Text
                                    textTransform="uppercase"
                                    fontWeight="700"
                                  >
                                    {submission?.achievement_description}
                                  </Text>
                                </Stack>
                                <Stack
                                  direction="column"
                                  spacing="8px"
                                  alignItems="start"
                                >
                                  <Text color="jsip.grey700">
                                    Foto Sertifikat
                                  </Text>
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
                                  <Text color="jsip.grey700">
                                    Foto Dokumentasi
                                  </Text>
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
                                  <Text color="jsip.grey700">
                                    Foto Akun Bank
                                  </Text>
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
                                      <Text color="jsip.grey700">
                                        Foto Identitas
                                      </Text>
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
                                  <Text color="jsip.grey700">
                                    Penyelenggara
                                  </Text>
                                  <Text fontWeight="700">
                                    {submission?.organizer}
                                  </Text>
                                </Stack>

                                <Stack
                                  direction="column"
                                  spacing="8px"
                                  alignItems="start"
                                >
                                  <Text color="jsip.grey700">
                                    Info Tambahan
                                  </Text>
                                  <Text
                                    textTransform="uppercase"
                                    fontWeight="700"
                                  >
                                    {submission?.additional_info}
                                  </Text>
                                </Stack>
                              </Stack>
                            </Box>
                          </Skeleton>
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>

                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Button
                        variant="secondary"
                        mr={3}
                        onClick={modalDetail.onClose}
                      >
                        Tutup
                      </Button>
                      <Spacer />
                      <Button
                        variant="jsip-primary"
                        isLoading={isLoadingConfirmFundProof}
                        type="submit"
                      >
                        Simpan
                      </Button>
                    </Stack>
                  </Stack>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalSubmitProf;
