import {
  Stack,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
  Skeleton,
  InputRightElement,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import Layout from "../components/AppComponents/Layout";
import * as Yup from "yup";
import { isUserLoadingState } from "../recoil/user";
import { fetchUpdateProfilePassword } from "../networks/libs/auth";
import { Icon } from "@iconify/react";

const RegisterSchema = Yup.object().shape({
  password: Yup.string().required("Required"),
  old_password: Yup.string().required("Required"),
});

export default function UpdatePassword() {
  const toast = useToast();
  const isUserLoading = useRecoilValue(isUserLoadingState);

  const [typePassword, setTypePassword] = useState("password");

  async function register(values) {
    await fetchUpdateProfilePassword(
      {
        password: values.password,
        old_password: values.old_password,
      },
      localStorage.getItem("token")
    )
      .then((response) => {
        toast({
          position: "top",
          title: `Berhasil mengubah password ${response.data.content.name}! `,
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
    <Layout pageName="Update Password">
      <Stack spacing="40px" direction="column" minH="calc(100vh - 120px)">
        <Skeleton isLoaded={!isUserLoading}>
          <Box>
            <Formik
              initialValues={{
                password: "",
                old_password: "",
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
                    <Field name="old_password">
                      {({ field }) => (
                        <FormControl
                          id="old_password"
                          mt="24px"
                          isInvalid={
                            errors.old_password !== undefined &&
                            touched.old_password
                          }
                        >
                          <FormLabel fontSize="xs" color="#595959">
                            Password Lama
                          </FormLabel>
                          <InputGroup>
                            <InputLeftElement
                              pointerEvents="none"
                              children={<Icon icon="bx:lock" />}
                            />
                            <Input
                              type={typePassword}
                              placeholder="Password Lama"
                              borderRadius="8px"
                              color="jsip.black"
                              _focus={{ border: "2px solid #00649A" }}
                              {...field}
                            />
                            <InputRightElement
                              cursor="pointer"
                              onClick={() =>
                                setTypePassword((prev) =>
                                  prev === "old_password"
                                    ? "text"
                                    : "old_password"
                                )
                              }
                              children={
                                <Icon
                                  icon={
                                    typePassword === "password"
                                      ? "bx:show"
                                      : "bx:hide"
                                  }
                                />
                              }
                            />
                          </InputGroup>
                          {errors.old_password && touched.old_password ? (
                            <FormErrorMessage>
                              {errors.old_password}
                            </FormErrorMessage>
                          ) : null}
                        </FormControl>
                      )}
                    </Field>

                    <Field name="password">
                      {({ field }) => (
                        <FormControl
                          id="password"
                          mt="24px"
                          isInvalid={
                            errors.password !== undefined && touched.password
                          }
                        >
                          <FormLabel fontSize="xs" color="#595959">
                            Password Baru
                          </FormLabel>
                          <InputGroup>
                            <InputLeftElement
                              pointerEvents="none"
                              children={<Icon icon="bx:lock" />}
                            />
                            <Input
                              type={typePassword}
                              placeholder="Password Baru"
                              borderRadius="8px"
                              color="jsip.black"
                              _focus={{ border: "2px solid #00649A" }}
                              {...field}
                            />
                            <InputRightElement
                              cursor="pointer"
                              onClick={() =>
                                setTypePassword((prev) =>
                                  prev === "password" ? "text" : "password"
                                )
                              }
                              children={
                                <Icon
                                  icon={
                                    typePassword === "password"
                                      ? "bx:show"
                                      : "bx:hide"
                                  }
                                />
                              }
                            />
                          </InputGroup>
                          {errors.password && touched.password ? (
                            <FormErrorMessage>
                              {errors.password}
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
                      isLoading={isSubmitting}
                    >
                      Simpan Password
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
