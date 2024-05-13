import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Skeleton,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Icon } from "@iconify/react";
import Layout from "../../../components/AppComponents/Layout";
import {
  fetchCreateUpdateRegent,
  fetchGetAllGoverment,
} from "../../../networks/libs/goverment";

const GovermentSchema = Yup.object().shape({
  regent_name: Yup.string().required("Required"),
  vice_regent_name: Yup.string().required("Required"),
  period: Yup.string().required("Required"),
});

export default function Goverment() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const toast = useToast();

  const [regent, setRegent] = useState([]);

  const getAllRegent = async () => {
    try {
      setIsLoading(true);
      const response = await fetchGetAllGoverment(
        localStorage.getItem("token")
      );

      if (response.data.content) {
        setIsLoading(false);
        setRegent(response.data.content);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllRegent();
  }, []);

  async function createUpdateRegent(values) {
    setIsLoadingUpdate(true);
    await fetchCreateUpdateRegent(
      {
        regent_name: values?.regent_name,
        regent_profile_image: values?.regent_profile_image,
        vice_regent_name: values?.vice_regent_name,
        vice_regent_profile_image: values?.vice_regent_profile_image,
        period: values?.period,
      },
      localStorage.getItem("token")
    )
      .then((response) => {
        setIsLoadingUpdate(false);
        toast({
          position: "top",
          title: `Berhasil menyimpan data pemerintah! `,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        getAllRegent();
      })
      .catch((error) => {
        setIsLoadingUpdate(false);
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
    <Layout pageName="Data Pemerintah">
      <Stack direction="column" spacing="40px">
        <Skeleton isLoaded={!isLoading}>
          <Box>
            <Formik
              initialValues={{
                regent_name: regent?.regent_name,
                regent_profile_image: null,
                vice_regent_name: regent?.vice_regent_name,
                vice_regent_profile_image: null,
                period: regent?.period,
              }}
              validationSchema={GovermentSchema}
              onSubmit={(values) => {
                createUpdateRegent(values);
              }}
            >
              {({ errors, touched, setFieldValue }) => (
                <Form>
                  <Stack direction="column" spacing="24px">
                    <SimpleGrid columns={[1, 1, 2, 2]} gap="20px">
                      <Stack direction="column" spacing="24px">
                        <Field name="regent_name">
                          {({ field }) => (
                            <FormControl
                              id="regent_name"
                              isInvalid={
                                errors.regent_name !== undefined &&
                                touched.regent_name
                              }
                            >
                              <FormLabel fontSize="xs" color="#595959">
                                Nama Bupati
                              </FormLabel>

                              <InputGroup>
                                <Input
                                  type="text"
                                  placeholder="Nama Bupati"
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
                              {errors.regent_name && touched.regent_name ? (
                                <FormErrorMessage>
                                  {errors.regent_name}
                                </FormErrorMessage>
                              ) : null}
                            </FormControl>
                          )}
                        </Field>

                        <Field name="regent_profile_image">
                          {({ field }) => (
                            <FormControl
                              id="regent_profile_image"
                              isInvalid={
                                errors.regent_profile_image !== undefined &&
                                touched.regent_profile_image
                              }
                            >
                              <FormLabel fontSize="xs" color="#595959">
                                Foto Bupati
                              </FormLabel>

                              <Input
                                type="file"
                                placeholder="Foto Bupati"
                                borderRadius="8px"
                                color="jsip.black"
                                _focus={{ border: "2px solid #00649A" }}
                                onChange={(event) => {
                                  setFieldValue(
                                    "regent_profile_image",
                                    event.currentTarget.files[0]
                                  );
                                }}
                              />
                              
                              {regent?.regent_profile_image && (
                                <Image
                                  mt="24px"
                                  src={regent?.regent_profile_image}
                                  h="120px"
                                  w="auto"
                                  objectFit="contain"
                                />
                              )}

                              {errors.regent_profile_image &&
                              touched.regent_profile_image ? (
                                <FormErrorMessage>
                                  {errors.regent_profile_image}
                                </FormErrorMessage>
                              ) : null}
                            </FormControl>
                          )}
                        </Field>
                      </Stack>
                      <Stack direction="column" spacing="24px">
                        <Field name="vice_regent_name">
                          {({ field }) => (
                            <FormControl
                              id="vice_regent_name"
                              isInvalid={
                                errors.vice_regent_name !== undefined &&
                                touched.vice_regent_name
                              }
                            >
                              <FormLabel fontSize="xs" color="#595959">
                                Nama Wakil Bupati
                              </FormLabel>

                              <InputGroup>
                                <Input
                                  type="text"
                                  placeholder="Nama Wakil Bupati"
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
                              {errors.vice_regent_name &&
                              touched.vice_regent_name ? (
                                <FormErrorMessage>
                                  {errors.vice_regent_name}
                                </FormErrorMessage>
                              ) : null}
                            </FormControl>
                          )}
                        </Field>

                        <Field name="vice_regent_profile_image">
                          {({ field }) => (
                            <FormControl
                              id="vice_regent_profile_image"
                              isInvalid={
                                errors.vice_regent_profile_image !==
                                  undefined && touched.vice_regent_profile_image
                              }
                            >
                              <FormLabel fontSize="xs" color="#595959">
                                Foto Wakil Bupati
                              </FormLabel>

                              <Input
                                type="file"
                                placeholder="Foto Bupati"
                                borderRadius="8px"
                                color="jsip.black"
                                _focus={{ border: "2px solid #00649A" }}
                                onChange={(event) => {
                                  setFieldValue(
                                    "vice_regent_profile_image",
                                    event.currentTarget.files[0]
                                  );
                                }}
                              />

                              {regent?.vice_regent_profile_image && (
                                <Image
                                  mt="24px"
                                  src={regent?.vice_regent_profile_image}
                                  h="120px"
                                  w="auto"
                                  objectFit="contain"
                                />
                              )}

                              {errors.vice_regent_profile_image &&
                              touched.vice_regent_profile_image ? (
                                <FormErrorMessage>
                                  {errors.vice_regent_profile_image}
                                </FormErrorMessage>
                              ) : null}
                            </FormControl>
                          )}
                        </Field>
                      </Stack>
                    </SimpleGrid>

                    <Field name="period">
                      {({ field }) => (
                        <FormControl
                          id="period"
                          isInvalid={
                            errors.period !== undefined && touched.period
                          }
                        >
                          <FormLabel fontSize="xs" color="#595959">
                            Periode
                          </FormLabel>

                          <InputGroup>
                            <Input
                              placeholder="Periode"
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
                          {errors.period && touched.period ? (
                            <FormErrorMessage>{errors.period}</FormErrorMessage>
                          ) : null}
                        </FormControl>
                      )}
                    </Field>
                    <Button
                      w="100%"
                      size="lg"
                      variant="jsip-primary"
                      type="submit"
                      isLoading={isLoadingUpdate}
                      _hover={{}}
                    >
                      Simpan Data Pemerintah
                    </Button>
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
