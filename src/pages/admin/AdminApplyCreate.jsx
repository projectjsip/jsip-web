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
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import Breadcrumb from "../../components/AppComponents/Breadcrumb";
import React, { useState } from "react";
import Layout from "../../components/AppComponents/Layout";
import * as Yup from "yup";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { fetchApply } from "../../networks/libs/apply";

const ApplySchema = Yup.object().shape({
  identity_type: Yup.string().required("Required"),
  identity_number: Yup.string().required("Required"),
  applicant_name: Yup.string().required("Required"),
  achievement_description: Yup.string()
    .required("Required")
    .max(100, "Maksimum 100 karakter"),
  certificate_image: Yup.mixed().required("Required"),
  documentation_image: Yup.mixed().required("Required"),
  bank_account_image: Yup.mixed().required("Required"),
  identity_image: Yup.mixed().required("Required"),
  family_card_image: Yup.mixed().required("Required"),
  organizer: Yup.string()
    .required("Required")
    .max(150, "Maksimum 150 karakter"),
});

export default function AdminApplyCreate() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const breadcrumbItems = [
    {
      title: "Pengajuan",
      link: "/admin/apply",
    },
    {
      title: "Buat Pengajuan Baru",
      link: "/admin/apply/create",
    },
  ];

  async function apply(values) {
    setIsLoading(true);
    await fetchApply(
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
      localStorage.getItem("token")
    )
      .then((response) => {
        setIsLoading(false);
        toast({
          position: "top",
          title: `Berhasil membuat pengajuan baru! `,
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
    <Layout pageName="Buat Pengajuan Baru">
      <Stack direction="column" spacing="40px">
        <Breadcrumb items={breadcrumbItems} />
        <Box>
          <Formik
            initialValues={{
              identity_type: "",
              identity_number: "",
              applicant_name: "",
              achievement_description: "",
              certificate_image: null,
              documentation_image: null,
              bank_account_image: null,
              identity_image: null,
              family_card_image: null,
              additional_info: "",
              organizer: "",
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

                          <Select {...field} placeholder="Pilih Tipe Identitas">
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
                          {errors.identity_number && touched.identity_number ? (
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

                  <Button
                    w="100%"
                    size="lg"
                    variant="jsip-primary"
                    type="submit"
                    isLoading={isLoading}
                    _hover={{}}
                  >
                    Buat Pengajuan Baru
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Layout>
  );
}
