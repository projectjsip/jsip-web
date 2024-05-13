import {
  Avatar,
  Circle,
  Flex,
  Stack,
  Text,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  useToast,
  Skeleton,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useRecoilValue } from "recoil";
import Layout from "../components/AppComponents/Layout";
import * as Yup from "yup";
import { isUserLoadingState, userState } from "../recoil/user";
import { fetchUpdateProfile } from "../networks/libs/auth";
import { Icon } from "@iconify/react";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().required("Required"),
  phone_number: Yup.string().required("Required"),
  identity_number: Yup.string().required("Required"),
  principal_name: Yup.string().required("Required"),
});

export default function Profile() {
  const toast = useToast();
  const user = useRecoilValue(userState);
  const isUserLoading = useRecoilValue(isUserLoadingState);

  async function register(values) {
    await fetchUpdateProfile(
      {
        name: values.name,
        email: values.email,
        phone_number: values.phone_number.toString(),
        identity_number: values.identity_number,
        position: values.position,
        principal_name: values.principal_name,
      },
      localStorage.getItem("token")
    )
      .then((response) => {
        toast({
          position: "top",
          title: `Berhasil mengubah data akun ${response.data.content.name}! `,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((error) => {
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
    <Layout pageName="Profile">
      <Stack spacing="40px" direction="column" minH="calc(100vh - 120px)">
        <Stack spacing="16px" direction="column" alignItems="center">
          <Circle border="1px solid #00649A" p="2px">
            <Avatar name={user?.name} size="xl" />
          </Circle>
          <Flex direction="column" alignItems="center">
            <Text fontWeight="700" fontSize="24px" color="jsip.black">
              {user?.name}
            </Text>
            <Text fontSize="14px" color="jsip.grey700">
              {user?.role}
            </Text>
          </Flex>
        </Stack>
        <Skeleton isLoaded={!isUserLoading}>
          <Box>
            <Formik
              initialValues={{
                name: user?.name,
                email: user?.email,
                phone_number: user?.phone_number,
                identity_number: user?.identity_number,
                position: user?.position,
                principal_name: user?.school?.principal_name,
              }}
              validationSchema={RegisterSchema}
              onSubmit={(values, actions) => {
                register(values);
                actions.setSubmitting(false);
              }}
            >
              {({ errors, touched, setFieldValue, isSubmitting, values }) => (
                <Form>
                  <Stack direction="column" spacing="24px">
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
                            NIK
                          </FormLabel>

                          <InputGroup>
                            <Input
                              placeholder="NIK"
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

                    <Field name="name">
                      {({ field }) => (
                        <FormControl
                          id="name"
                          isInvalid={errors.name !== undefined && touched.name}
                        >
                          <FormLabel fontSize="xs" color="#595959">
                            Nama
                          </FormLabel>

                          <InputGroup>
                            <Input
                              type="text"
                              placeholder="Nama"
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
                          {errors.name && touched.name ? (
                            <FormErrorMessage>{errors.name}</FormErrorMessage>
                          ) : null}
                        </FormControl>
                      )}
                    </Field>

                    <SimpleGrid columns={[1, 1, 2, 2]} gap="24px">
                      <Field name="email">
                        {({ field }) => (
                          <FormControl
                            id="email"
                            isInvalid={
                              errors.email !== undefined && touched.email
                            }
                          >
                            <FormLabel fontSize="xs" color="#595959">
                              Alamat E-mail
                            </FormLabel>

                            <InputGroup>
                              <Input
                                type="email"
                                placeholder="E-mail"
                                borderRadius="8px"
                                color="jsip.black"
                                _focus={{ border: "2px solid #00649A" }}
                                {...field}
                              />
                              <InputLeftElement
                                pointerEvents="none"
                                children={<Icon icon="bx:envelope" />}
                              />
                            </InputGroup>
                            {errors.email && touched.email ? (
                              <FormErrorMessage>
                                {errors.email}
                              </FormErrorMessage>
                            ) : null}
                          </FormControl>
                        )}
                      </Field>

                      <Field name="phone_number">
                        {({ field }) => (
                          <FormControl
                            id="phone_number"
                            isInvalid={
                              errors.phone_number !== undefined &&
                              touched.phone_number
                            }
                          >
                            <FormLabel fontSize="xs" color="#595959">
                              Nomor Telepon
                            </FormLabel>

                            <InputGroup>
                              <Input
                                type="number"
                                placeholder="Nomor Telepon"
                                borderRadius="8px"
                                color="jsip.black"
                                _focus={{ border: "2px solid #00649A" }}
                                {...field}
                              />
                              <InputLeftElement
                                pointerEvents="none"
                                children={<Icon icon="bx:phone" />}
                              />
                            </InputGroup>
                            {errors.phone_number && touched.phone_number ? (
                              <FormErrorMessage>
                                {errors.phone_number}
                              </FormErrorMessage>
                            ) : null}
                          </FormControl>
                        )}
                      </Field>
                    </SimpleGrid>

                    <Field name="position">
                      {({ field }) => (
                        <FormControl
                          id="position"
                          isInvalid={
                            errors.position !== undefined && touched.position
                          }
                        >
                          <FormLabel fontSize="xs" color="#595959">
                            Posisi
                          </FormLabel>

                          <InputGroup>
                            <Input
                              placeholder="Posisi"
                              borderRadius="8px"
                              color="jsip.black"
                              _focus={{ border: "2px solid #00649A" }}
                              {...field}
                            />
                            <InputLeftElement
                              pointerEvents="none"
                              children={<Icon icon="bx:user-plus" />}
                            />
                          </InputGroup>
                          {errors.position && touched.position ? (
                            <FormErrorMessage>
                              {errors.position}
                            </FormErrorMessage>
                          ) : null}
                        </FormControl>
                      )}
                    </Field>

                    {user?.role === "admin" ? (
                      <>
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

                              <InputGroup>
                                <Input
                                  placeholder="Nama Kepala Sekolah"
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
                              {errors.principal_name &&
                              touched.principal_name ? (
                                <FormErrorMessage>
                                  {errors.principal_name}
                                </FormErrorMessage>
                              ) : null}
                            </FormControl>
                          )}
                        </Field>
                      </>
                    ) : null}

                    <Button
                      w="100%"
                      size="lg"
                      variant="jsip-primary"
                      type="submit"
                      isLoading={isSubmitting}
                    >
                      Simpan Profil
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
