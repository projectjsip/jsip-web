import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  Skeleton,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import Breadcrumb from "../../components/AppComponents/Breadcrumb";
import React, { useEffect, useState } from "react";
import Layout from "../../components/AppComponents/Layout";
import * as Yup from "yup";
import { Icon } from "@iconify/react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchGetSubmission,
  fetchUpdateApply,
} from "../../networks/libs/apply";
import ModalDeleteApply from "../../components/Apply/ModalDeleteApply";
import ModalDetailImage from "../../components/AppComponents/ModalDetailImage";

const ApplySchema = Yup.object().shape({
  identity_type: Yup.string().required("Required"),
  identity_number: Yup.string().required("Required"),
  applicant_name: Yup.string().required("Required"),
  achievement_description: Yup.string()
    .required("Required")
    .max(100, "Maksimum 100 karakter"),
  organizer: Yup.string()
    .required("Required")
    .max(150, "Maksimum 150 karakter"),
  //   certificate_image: Yup.mixed().required("Required"),
  //   documentation_image: Yup.mixed().required("Required"),
  //   bank_account_image: Yup.mixed().required("Required"),
  //   identity_image: Yup.mixed().required("Required"),
  //   family_card_image: Yup.mixed().required("Required"),
});

export default function AdminApplyEdit() {
  let { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const breadcrumbItems = [
    {
      title: "Pengajuan",
      link: "/admin/apply",
    },
    {
      title: "Edit Pengajuan",
      link: `/admin/apply/edit${id}`,
    },
  ];

  const [isLoadingSubmission, setIsLoadingSubmission] = useState(false);
  const [submission, setSubmission] = useState([]);

  useEffect(() => {
    const getSubmission = async () => {
      try {
        setIsLoadingSubmission(true);
        const response = await fetchGetSubmission(
          localStorage.getItem("token"),
          id
        );

        if (response.data.content) {
          setIsLoadingSubmission(false);
          setSubmission(response.data.content);
        } else {
          setIsLoadingSubmission(false);
        }
      } catch (error) {
        setIsLoadingSubmission(false);
      }
    };

    getSubmission(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function apply(values) {
    setIsLoading(true);
    await fetchUpdateApply(
      {
        identity_type: values.identity_type,
        identity_number: values.identity_number,
        applicant_name: values.applicant_name,
        achievement_description: values.achievement_description,
        certificate_image: values.certificate_image,
        documentation_image: values.documentation_image,
        bank_account_image: values.bank_account_image,
        identity_image: values.identity_image,
        family_card_image: values.family_card_image,
        additional_info: values.additional_info,
        organizer: values.organizer,
      },
      localStorage.getItem("token"),
      id
    )
      .then((response) => {
        setIsLoading(false);
        toast({
          position: "top",
          title: `Berhasil mengubah pengajuan! `,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate("/admin/apply");
      })
      .catch((error) => {
        setIsLoading(false);
        toast({
          position: "top",
          title: error.response.data.info,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  }
  return (
    <Layout pageName="Edit Pengajuan">
      <Stack direction="column" spacing="40px">
        <Breadcrumb items={breadcrumbItems} />
        <Skeleton isLoaded={!isLoadingSubmission}>
          <Box>
            <Formik
              initialValues={{
                identity_type: submission?.identity_type,
                identity_number: submission?.identity_number,
                applicant_name: submission?.applicant_name,
                achievement_description: submission?.achievement_description,
                certificate_image: null,
                documentation_image: null,
                bank_account_image: null,
                identity_image: null,
                family_card_image: null,
                additional_info: submission?.additional_info,
                organizer: submission?.organizer,
              }}
              validationSchema={ApplySchema}
              onSubmit={(values) => {
                apply(values);
              }}
            >
              {({ errors, touched, setFieldValue }) => (
                <Form>
                  <Stack direction="column" spacing="24px">
                    <SimpleGrid columns={[1, 1, 2, 2]} gap="24px">
                      <Field name="identity_type">
                        {({ field }) => (
                          <FormControl
                            id="role"
                            isInvalid={
                              errors.identity_type !== undefined &&
                              touched.identity_type
                            }
                          >
                            <FormLabel fontSize="xs" color="#595959">
                              Tipe Identitas
                            </FormLabel>

                            <Select
                              {...field}
                              placeholder="Pilih Tipe Identitas"
                            >
                              <option value="nisn">NISN</option>
                              <option value="nip">NIP</option>
                              <option value="nik">NIK</option>
                            </Select>
                            {errors.identity_type && touched.identity_type ? (
                              <FormErrorMessage>
                                {errors.identity_type}
                              </FormErrorMessage>
                            ) : null}
                          </FormControl>
                        )}
                      </Field>

                      <Field name="identity_number">
                        {({ field }) => (
                          <FormControl
                            id="identity_number"
                            isInvalid={
                              errors.identity_number !== undefined &&
                              touched.identity_number
                            }
                          >
                            <FormLabel fontSize="xs" color="#595959">
                              Nomor Identitas
                            </FormLabel>

                            <InputGroup>
                              <Input
                                placeholder="Nomor Identitas"
                                borderRadius="8px"
                                color="jsip.black"
                                _focus={{ border: "2px solid #00649A" }}
                                {...field}
                              />
                              <InputLeftElement
                                pointerEvents="none"
                                children={<Icon icon="bx:id-card" />}
                              />
                            </InputGroup>
                            {errors.identity_number &&
                            touched.identity_number ? (
                              <FormErrorMessage>
                                {errors.identity_number}
                              </FormErrorMessage>
                            ) : null}
                          </FormControl>
                        )}
                      </Field>
                    </SimpleGrid>

                    <Field name="applicant_name">
                      {({ field }) => (
                        <FormControl
                          id="applicant_name"
                          isInvalid={
                            errors.applicant_name !== undefined &&
                            touched.applicant_name
                          }
                        >
                          <FormLabel fontSize="xs" color="#595959">
                            Nama Pemohon
                          </FormLabel>

                          <InputGroup>
                            <Input
                              type="text"
                              placeholder="Nama Pemohon"
                              borderRadius="8px"
                              color="jsip.black"
                              _focus={{ border: "2px solid #00649A" }}
                              {...field}
                            />
                            <InputLeftElement
                              pointerEvents="none"
                              children={<Icon icon="bx:user" />}
                            />
                          </InputGroup>
                          {errors.applicant_name && touched.applicant_name ? (
                            <FormErrorMessage>
                              {errors.applicant_name}
                            </FormErrorMessage>
                          ) : null}
                        </FormControl>
                      )}
                    </Field>

                    <Field name="achievement_description">
                      {({ field }) => (
                        <FormControl
                          id="achievement_description"
                          isInvalid={
                            errors.achievement_description !== undefined &&
                            touched.achievement_description
                          }
                        >
                          <FormLabel fontSize="xs" color="#595959">
                            Prestasi
                          </FormLabel>

                          <InputGroup>
                            <Input
                              type="text"
                              placeholder="Contoh: Juara 2 Lomba Cerdas Cermat"
                              borderRadius="8px"
                              color="jsip.black"
                              _focus={{ border: "2px solid #00649A" }}
                              {...field}
                            />
                            <InputLeftElement
                              pointerEvents="none"
                              children={<Icon icon="bx:trophy" />}
                            />
                          </InputGroup>
                          {errors.achievement_description &&
                          touched.achievement_description ? (
                            <FormErrorMessage>
                              {errors.achievement_description}
                            </FormErrorMessage>
                          ) : null}
                        </FormControl>
                      )}
                    </Field>

                    <Field name="certificate_image">
                      {({ field }) => (
                        <FormControl
                          id="certificate_image"
                          isInvalid={
                            errors.certificate_image !== undefined &&
                            touched.certificate_image
                          }
                        >
                          <FormLabel fontSize="xs" color="#595959">
                            Dokumen Sertifikat
                          </FormLabel>

                          <Stack
                            direction="column"
                            spacing="8px"
                            alignItems="start"
                          >
                            <Input
                              type="file"
                              placeholder="Dokumen Sertifikat"
                              borderRadius="8px"
                              color="jsip.black"
                              _focus={{ border: "2px solid #00649A" }}
                              onChange={(event) => {
                                setFieldValue(
                                  "certificate_image",
                                  event.currentTarget.files[0]
                                );
                              }}
                            />

                            <ModalDetailImage
                              src={submission?.certificate_image}
                              name="Dokumen Sertifikat"
                            />
                          </Stack>
                          {errors.certificate_image &&
                          touched.certificate_image ? (
                            <FormErrorMessage>
                              {errors.certificate_image}
                            </FormErrorMessage>
                          ) : null}
                        </FormControl>
                      )}
                    </Field>

                    <Field name="documentation_image">
                      {({ field }) => (
                        <FormControl
                          id="documentation_image"
                          isInvalid={
                            errors.documentation_image !== undefined &&
                            touched.documentation_image
                          }
                        >
                          <FormLabel fontSize="xs" color="#595959">
                            Foto Dokumentasi
                          </FormLabel>

                          <Stack
                            direction="column"
                            spacing="8px"
                            alignItems="start"
                          >
                            <Input
                              type="file"
                              placeholder="Foto Dokumentasi"
                              borderRadius="8px"
                              color="jsip.black"
                              _focus={{ border: "2px solid #00649A" }}
                              onChange={(event) => {
                                setFieldValue(
                                  "documentation_image",
                                  event.currentTarget.files[0]
                                );
                              }}
                            />

                            <ModalDetailImage
                              src={submission?.documentation_image}
                              name="Foto Dokumentasi"
                            />
                          </Stack>
                          {errors.documentation_image &&
                          touched.documentation_image ? (
                            <FormErrorMessage>
                              {errors.documentation_image}
                            </FormErrorMessage>
                          ) : null}
                        </FormControl>
                      )}
                    </Field>

                    <Field name="bank_account_image">
                      {({ field }) => (
                        <FormControl
                          id="bank_account_image"
                          isInvalid={
                            errors.bank_account_image !== undefined &&
                            touched.bank_account_image
                          }
                        >
                          <FormLabel fontSize="xs" color="#595959">
                            Foto Akun Bank
                          </FormLabel>

                          <Stack
                            direction="column"
                            spacing="8px"
                            alignItems="start"
                          >
                            <Input
                              type="file"
                              placeholder="Foto Akun Bank"
                              borderRadius="8px"
                              color="jsip.black"
                              _focus={{ border: "2px solid #00649A" }}
                              onChange={(event) => {
                                setFieldValue(
                                  "bank_account_image",
                                  event.currentTarget.files[0]
                                );
                              }}
                            />

                            <ModalDetailImage
                              src={submission?.bank_account_image}
                              name="Foto Akun Bank"
                            />
                          </Stack>
                          {errors.bank_account_image &&
                          touched.bank_account_image ? (
                            <FormErrorMessage>
                              {errors.bank_account_image}
                            </FormErrorMessage>
                          ) : null}
                        </FormControl>
                      )}
                    </Field>

                    <Field name="identity_image">
                      {({ field }) => (
                        <FormControl
                          id="identity_image"
                          isInvalid={
                            errors.identity_image !== undefined &&
                            touched.identity_image
                          }
                        >
                          <FormLabel fontSize="xs" color="#595959">
                            Foto Identitas
                          </FormLabel>

                          <Stack
                            direction="column"
                            spacing="8px"
                            alignItems="start"
                          >
                            <Input
                              type="file"
                              placeholder="Foto Identitas"
                              borderRadius="8px"
                              color="jsip.black"
                              _focus={{ border: "2px solid #00649A" }}
                              onChange={(event) => {
                                setFieldValue(
                                  "identity_image",
                                  event.currentTarget.files[0]
                                );
                              }}
                            />

                            <ModalDetailImage
                              src={submission?.identity_image}
                              name="Foto Identitas"
                            />
                          </Stack>

                          {errors.identity_image && touched.identity_image ? (
                            <FormErrorMessage>
                              {errors.identity_image}
                            </FormErrorMessage>
                          ) : null}
                        </FormControl>
                      )}
                    </Field>

                    <Field name="family_card_image">
                      {({ field }) => (
                        <FormControl
                          id="family_card_image"
                          isInvalid={
                            errors.family_card_image !== undefined &&
                            touched.family_card_image
                          }
                        >
                          <FormLabel fontSize="xs" color="#595959">
                            Foto Kartu Keluarga
                          </FormLabel>

                          <Stack
                            direction="column"
                            spacing="8px"
                            alignItems="start"
                          >
                            <Input
                              type="file"
                              placeholder="Foto Kartu Keluarga"
                              borderRadius="8px"
                              color="jsip.black"
                              _focus={{ border: "2px solid #00649A" }}
                              onChange={(event) => {
                                setFieldValue(
                                  "family_card_image",
                                  event.currentTarget.files[0]
                                );
                              }}
                            />

                            <ModalDetailImage
                              src={submission?.family_card_image}
                              name="Foto Kartu Keluarga"
                            />
                          </Stack>
                          {errors.family_card_image &&
                          touched.family_card_image ? (
                            <FormErrorMessage>
                              {errors.family_card_image}
                            </FormErrorMessage>
                          ) : null}
                        </FormControl>
                      )}
                    </Field>

                    <Field name="organizer">
                      {({ field }) => (
                        <FormControl
                          id="organizer"
                          isInvalid={
                            errors.organizer !== undefined && touched.organizer
                          }
                        >
                          <FormLabel fontSize="xs" color="#595959">
                            Penyelenggara
                          </FormLabel>

                          <Textarea
                            placeholder="Penyelenggara"
                            borderRadius="8px"
                            color="jsip.black"
                            _focus={{ border: "2px solid #00649A" }}
                            {...field}
                          />

                          {errors.organizer && touched.organizer ? (
                            <FormErrorMessage>
                              {errors.organizer}
                            </FormErrorMessage>
                          ) : null}
                        </FormControl>
                      )}
                    </Field>

                    <Field name="additional_info">
                      {({ field }) => (
                        <FormControl
                          id="additional_info"
                          isInvalid={
                            errors.additional_info !== undefined &&
                            touched.additional_info
                          }
                        >
                          <FormLabel fontSize="xs" color="#595959">
                            Info Tambahan
                          </FormLabel>

                          <Textarea
                            placeholder="Info Tambahan"
                            borderRadius="8px"
                            color="jsip.black"
                            _focus={{ border: "2px solid #00649A" }}
                            {...field}
                          />

                          {errors.additional_info && touched.additional_info ? (
                            <FormErrorMessage>
                              {errors.additional_info}
                            </FormErrorMessage>
                          ) : null}
                        </FormControl>
                      )}
                    </Field>

                    <Stack
                      spacing="24px"
                      direction={[
                        "column-reverse",
                        "column-reverse",
                        "row",
                        "row",
                      ]}
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <ModalDeleteApply id={id} />
                      <Button
                        w={["100%", "100%", "fit-content", "fit-content"]}
                        size="lg"
                        variant="jsip-primary"
                        type="submit"
                        isLoading={isLoading}
                        _hover={{}}
                      >
                        Simpan Pengajuan
                      </Button>
                    </Stack>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Box>
        </Skeleton>
      </Stack>
    </Layout>
  );
}
