import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Layout from "../../../components/AppComponents/Layout";
import Breadcrumb from "../../../components/AppComponents/Breadcrumb";
import { useState } from "react";
import { fetchCreateSchool } from "../../../networks/libs/school";

const RegisterSchema = Yup.object().shape({
  school_name: Yup.string().required("Required"),
  principal_name: Yup.string().required("Required"),
  npsn: Yup.string().required("Required"),
});

export default function SchoolCreate() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const breadcrumbItems = [
    {
      title: "Data Sekolah",
      link: "/super-admin/school",
    },
    {
      title: "Buat Sekolah Baru",
      link: "/super-admin/school/create",
    },
  ];

  async function createSchool(values) {
    setIsLoading(true);
    await fetchCreateSchool(
      {
        school_name: values.school_name,
        principal_name: values.principal_name,
        npsn: values.npsn,
      },
      localStorage.getItem("token")
    )
      .then((response) => {
        setIsLoading(false);

        toast({
          position: "top",
          title: `Berhasil membuat Sekolah! `,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate("/super-admin/school");
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
    <Layout pageName="Buat Sekolah Baru">
      <Stack direction="column" spacing="40px">
        <Breadcrumb items={breadcrumbItems} />
        <Box>
          <Formik
            initialValues={{
              school_name: "",
              principal_name: "",
              npsn: "",
            }}
            validationSchema={RegisterSchema}
            onSubmit={(values, actions) => {
              createSchool(values);
              actions.setSubmitting(false);
            }}
          >
            {({ errors, touched, setFieldValue, isSubmitting, values }) => (
              <Form>
                <Stack direction="column" spacing="24px">
                  <Field name="school_name">
                    {({ field }) => (
                      <FormControl
                        id="school_name"
                        isInvalid={
                          errors.school_name !== undefined &&
                          touched.school_name
                        }
                      >
                        <FormLabel fontSize="xs" color="#595959">
                          Nama Sekolah
                        </FormLabel>

                        <Input
                          type="text"
                          placeholder="Nama Sekolah"
                          borderRadius="8px"
                          color="jsip.black"
                          _focus={{ border: "2px solid #00649A" }}
                          {...field}
                        />

                        {errors.school_name && touched.school_name ? (
                          <FormErrorMessage>
                            {errors.school_name}
                          </FormErrorMessage>
                        ) : null}
                      </FormControl>
                    )}
                  </Field>

                  <Field name="npsn">
                    {({ field }) => (
                      <FormControl
                        id="npsn"
                        isInvalid={errors.npsn !== undefined && touched.npsn}
                      >
                        <FormLabel fontSize="xs" color="#595959">
                          NPSN
                        </FormLabel>

                        <Input
                          type="text"
                          placeholder="NPSN"
                          borderRadius="8px"
                          color="jsip.black"
                          _focus={{ border: "2px solid #00649A" }}
                          {...field}
                        />

                        {errors.npsn && touched.npsn ? (
                          <FormErrorMessage>{errors.npsn}</FormErrorMessage>
                        ) : null}
                      </FormControl>
                    )}
                  </Field>

                  <Field name="principal_name">
                    {({ field }) => (
                      <FormControl
                        id="principal_name"
                        isInvalid={
                          errors.principal_name !== undefined &&
                          touched.principal_name
                        }
                      >
                        <FormLabel fontSize="xs" color="#595959">
                          Nama Kepala Sekolah
                        </FormLabel>

                        <Input
                          type="text"
                          placeholder="Nama Kepala Sekolah"
                          borderRadius="8px"
                          color="jsip.black"
                          _focus={{ border: "2px solid #00649A" }}
                          {...field}
                        />

                        {errors.principal_name && touched.principal_name ? (
                          <FormErrorMessage>
                            {errors.principal_name}
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
                    Tambah Sekolah Baru
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
