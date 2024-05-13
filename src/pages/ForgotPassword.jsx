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
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { fetchForgotPassword } from "../networks/libs/auth";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().required("Required"),
});

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessForgotPassword, setIsSuccessForgotPassword] = useState(false);
  const toast = useToast();

  async function forgotPassword(values) {
    setIsLoading(true);
    await fetchForgotPassword({
      email: values.email,
    })
      .then((response) => {
        setIsLoading(false);
        setIsSuccessForgotPassword(true);
        toast({
          position: "top",
          title: `Kami telah mengirimkan email untuk memperbarui password. Cek email kamu`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((error) => {
        setIsLoading(false);
        setIsSuccessForgotPassword(false);

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
                  Lupa Password
                </Text>
                {isSuccessForgotPassword ? (
                  <>
                    <Text textAlign="center">
                      Permintaan lupa password telah dikirimkan ke email anda,
                      silahkan cek email anda.
                    </Text>
                  </>
                ) : (
                  <>
                    <Formik
                      initialValues={{
                        email: "",
                      }}
                      validationSchema={ForgotPasswordSchema}
                      onSubmit={(values, actions) => {
                        forgotPassword(values);
                        actions.setSubmitting(false);
                      }}
                    >
                      {({ errors, touched }) => (
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

                          <Button
                            w="100%"
                            rightIcon={<Icon icon="bx:right-arrow-alt" />}
                            size="lg"
                            variant="jsip-primary"
                            type="submit"
                            mt="24px"
                            isLoading={isLoading}
                          >
                            Kirim Permintaan
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
