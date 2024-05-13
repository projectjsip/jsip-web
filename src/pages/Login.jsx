import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spacer,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { fetchLogin } from "../networks/libs/auth";

const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

export default function Login() {
  const navigate = useNavigate();
  const toast = useToast();
  const [typePassword, setTypePassword] = useState("password");

  async function login(values) {
    await fetchLogin({
      email: values.email,
      password: values.password,
    })
      .then((response) => {
        toast({
          position: "top",
          title: `Selamat Datang ${response.data.content.user.name}! `,
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        localStorage.setItem("token", response.data.content.access_token);
        localStorage.setItem("email", response.data.content.user.email);
        localStorage.setItem("name", response.data.content.user.name);
        localStorage.setItem(
          "phone_number",
          response.data.content.user.phone_number
        );
        localStorage.setItem("id", response.data.content.user.id);

        if (response.data.content.user.role === "super_admin") {
          navigate("/super-admin/dashboard");
        } else if (response.data.content.user.role === "verifier") {
          navigate("/verifier/batch");
        } else if (response.data.content.user.role === "admin") {
          navigate("/admin/dashboard");
        }
      })
      .catch((error) => {
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
                  Login
                </Text>
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                    authType: "basic_auth",
                  }}
                  validationSchema={LoginSchema}
                  onSubmit={(values, actions) => {
                    login(values);
                    actions.setSubmitting(false);
                  }}
                >
                  {({ errors, touched, setFieldValue, isSubmitting }) => (
                    <Form>
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

                      <Flex mt="20px">
                        <Spacer />
                        <Link to="/forgot-password">
                          <Text
                            color="jsip.primary"
                            fontWeight="700"
                            fontSize="14px"
                          >
                            Lupa Password?
                          </Text>
                        </Link>
                      </Flex>

                      <Button
                        w="100%"
                        rightIcon={<Icon icon="bx:right-arrow-alt" />}
                        size="lg"
                        variant="jsip-primary"
                        type="submit"
                        mt="24px"
                        isLoading={isSubmitting}
                      >
                        Login
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Stack>
            </Box>
          </Stack>
        </Center>
        {/* <SimpleGrid
          columns={[1, 1, 2, 2]}
          bg={[
            "",
            "",
            "linear-gradient(90deg, rgba(20,108,148,1) 0%, rgba(255,255,255,1) 50%)",
            "linear-gradient(90deg, rgba(20,108,148,1) 0%, rgba(255,255,255,1) 50%)",
          ]}
        >
          <Box>
            <Show above="md">
              <Box minH="100vh">
                <Container maxW="container.sm" px="16px" minH="100vh">
                  <Center minH="100vh" display="flex" flexDirection="column">
                    <Image src="/jsip-logo.png" h="200px" mb="24px" />
                    <Text color="jsip.white" fontSize="32px" fontWeight="700">
                      Selamat Datang!
                    </Text>
                  </Center>
                </Container>
              </Box>
            </Show>
          </Box>
        </SimpleGrid> */}
      </Container>
    </Box>
  );
}
