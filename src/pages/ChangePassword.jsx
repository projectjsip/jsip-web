import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as Yup from "yup";
import { fetchChangePassword } from "../networks/libs/auth";

const LoginSchema = Yup.object().shape({
  confirm_password: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

export default function ChangePassword() {
  let { token } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const toast = useToast();
  const [typePassword, setTypePassword] = useState("password");

  async function login(values) {
    if (values.password !== values.confirm_password) {
      toast({
        position: "top",
        title: "Password dan konfirmasi password harus sama.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    await fetchChangePassword({
      token: token,
      password: values.password,
    })
      .then((response) => {
        setIsSuccess(true);
        setIsLoading(false);

        toast({
          position: "top",
          title: `Ubah password berhasil, silahkan login ulang`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((error) => {
        setIsSuccess(false);
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
    <Box bgColor="jsip.primary" minH="100vh">
      <Container>
        <Center minH="100vh">
          <Stack direction="column" spacing="40px" alignItems="center" w="100%">
            <Image src="/jsip-logo-new.png" h="220px" objectFit="contain" />
            <Box
              w="100%"
              bgColor="white"
              p="16px"
              borderRadius="8px"
              boxShadow="md"
            >
              <Stack direction="column" spacing="24px">
                <Text
                  fontWeight="700"
                  color="jsip.black"
                  fontSize="24px"
                  alignSelf="center"
                >
                  Update Password
                </Text>
                {isSuccess ? (
                  <>
                    <Stack
                      direction="column"
                      spacing="20p"
                      alignItems="center"
                      w="100%"
                    >
                      <Text textAlign="center">
                        Password berhasil diupdate, silahkan klik tombol dibawah
                        untuk login kembali.
                      </Text>
                      <Link to="/login" style={{ width: "100%" }}>
                        <Button
                          w="100%"
                          size="lg"
                          variant="jsip-primary"
                          type="submit"
                          mt="24px"
                        >
                          Login
                        </Button>
                      </Link>
                    </Stack>
                  </>
                ) : (
                  <>
                    <Formik
                      initialValues={{
                        confirm_password: "",
                        password: "",
                      }}
                      validationSchema={LoginSchema}
                      onSubmit={(values, actions) => {
                        login(values);
                        actions.setSubmitting(false);
                      }}
                    >
                      {({ errors, touched }) => (
                        <Form>
                          <Field name="password">
                            {({ field }) => (
                              <FormControl
                                id="password"
                                mt="24px"
                                isInvalid={
                                  errors.password !== undefined &&
                                  touched.password
                                }
                              >
                                <FormLabel fontSize="xs" color="#595959">
                                  Password
                                </FormLabel>
                                <InputGroup>
                                  <InputLeftElement
                                    pointerEvents="none"
                                    children={<Icon icon="bx:lock" />}
                                  />
                                  <Input
                                    type={typePassword}
                                    placeholder="Password"
                                    borderRadius="8px"
                                    color="jsip.black"
                                    _focus={{ border: "2px solid #00649A" }}
                                    {...field}
                                  />
                                  <InputRightElement
                                    cursor="pointer"
                                    onClick={() =>
                                      setTypePassword((prev) =>
                                        prev === "password"
                                          ? "text"
                                          : "password"
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

                          <Field name="confirm_password">
                            {({ field }) => (
                              <FormControl
                                id="confirm_password"
                                mt="24px"
                                isInvalid={
                                  errors.confirm_password !== undefined &&
                                  touched.confirm_password
                                }
                              >
                                <FormLabel fontSize="xs" color="#595959">
                                  Konfirmasi Password
                                </FormLabel>
                                <InputGroup>
                                  <InputLeftElement
                                    pointerEvents="none"
                                    children={<Icon icon="bx:lock" />}
                                  />
                                  <Input
                                    type={typePassword}
                                    placeholder="Konfirmasi Password"
                                    borderRadius="8px"
                                    color="jsip.black"
                                    _focus={{ border: "2px solid #00649A" }}
                                    {...field}
                                  />
                                  <InputRightElement
                                    cursor="pointer"
                                    onClick={() =>
                                      setTypePassword((prev) =>
                                        prev === "password"
                                          ? "text"
                                          : "password"
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
                                {errors.confirm_password &&
                                touched.confirm_password ? (
                                  <FormErrorMessage>
                                    {errors.confirm_password}
                                  </FormErrorMessage>
                                ) : null}
                              </FormControl>
                            )}
                          </Field>

                          <Button
                            w="100%"
                            rightIcon={<Icon icon="bx:right-arrow-alt" />}
                            size="lg"
                            variant="jsip-primary"
                            type="submit"
                            mt="24px"
                            isLoading={isLoading}
                          >
                            Update Password
                          </Button>
                        </Form>
                      )}
                    </Formik>
                  </>
                )}
              </Stack>
            </Box>
          </Stack>
        </Center>
      </Container>
    </Box>
  );
}
