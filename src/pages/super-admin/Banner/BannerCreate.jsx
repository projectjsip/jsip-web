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
import { fetchCreateJumbotron } from "../../../networks/libs/jumbotron";
import { useState } from "react";

const RegisterSchema = Yup.object().shape({
  image: Yup.mixed().required("Required"),
});

export default function BannerCreate() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const breadcrumbItems = [
    {
      title: "Banner",
      link: "/super-admin/banner",
    },
    {
      title: "Buat Banner Baru",
      link: "/super-admin/banner/create",
    },
  ];

  async function createBanner(values) {
    setIsLoading(true);
    await fetchCreateJumbotron(
      {
        image: values.image,
      },
      localStorage.getItem("token")
    )
      .then((response) => {
        setIsLoading(false);

        toast({
          position: "top",
          title: `Berhasil membuat banner! `,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate("/super-admin/banner");
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
    <Layout pageName="Buat Banner Baru">
      <Stack direction="column" spacing="40px">
        <Breadcrumb items={breadcrumbItems} />
        <Box>
          <Formik
            initialValues={{
              image: "",
            }}
            validationSchema={RegisterSchema}
            onSubmit={(values, actions) => {
              createBanner(values);
              actions.setSubmitting(false);
            }}
          >
            {({ errors, touched, setFieldValue, isSubmitting, values }) => (
              <Form>
                <Stack direction="column" spacing="24px">
                  <Field name="image">
                    {({ field }) => (
                      <FormControl
                        id="image"
                        isInvalid={errors.image !== undefined && touched.image}
                      >
                        <FormLabel fontSize="xs" color="#595959">
                          Gambar Banner
                        </FormLabel>

                        <Input
                          type="file"
                          placeholder="Gambar Banner"
                          borderRadius="8px"
                          color="jsip.black"
                          _focus={{ border: "2px solid #00649A" }}
                          onChange={(event) => {
                            setFieldValue(
                              "image",
                              event.currentTarget.files[0]
                            );
                          }}
                        />

                        {errors.image && touched.image ? (
                          <FormErrorMessage>{errors.image}</FormErrorMessage>
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
                    Tambah Banner Baru
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
