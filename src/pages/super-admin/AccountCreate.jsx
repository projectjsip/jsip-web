import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  SimpleGrid,
  Stack,
  useToast,
  Select as ChakraSelect,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import Breadcrumb from "../../components/AppComponents/Breadcrumb";
import Layout from "../../components/AppComponents/Layout";
import * as Yup from "yup";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { fetchRegister } from "../../networks/libs/auth";
import { useNavigate } from "react-router-dom";
import { fetchAllSchoolNoPaginate } from "../../networks/libs/school";
import AsyncSelect from "react-select/async";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().required("Required"),
  role: Yup.string().required("Required"),
  phone_number: Yup.string().required("Required"),
  identity_number: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

export default function AccountCreate() {
  const navigate = useNavigate();
  const toast = useToast();
  const [typePassword, setTypePassword] = useState("password");
  const [schools, setSchools] = useState([]);

  const breadcrumbItems = [
    {
      title: "Akun J-SIP",
      link: "/super-admin/account",
    },
    {
      title: "Buat Akun J-SIP Baru",
      link: "/super-admin/account/create",
    },
  ];

  const getAllSchool = async () => {
    await fetchAllSchoolNoPaginate(localStorage.getItem("token"))
      .then((response) => {
        const schoolsOptions = response.data?.content?.map((school) => ({
          value: school?.id,
          label: school?.school_name,
        }));

        setSchools(schoolsOptions);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getAllSchool();
  }, []);

  async function register(values) {
    if (values.role === "admin" && values.school_id === "") {
      toast({
        position: "top",
        title: "Isian pilih sekolah wajib diisi",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    await fetchRegister(
      {
        name: values.name,
        email: values.email,
        role: values.role,
        phone_number: values.phone_number.toString(),
        identity_number: values.identity_number,
        password: values.password,
        school_id: values.school_id ? values.school_id : undefined,
        position: values.position,
      },
      localStorage.getItem("token")
    )
      .then((response) => {
        toast({
          position: "top",
          title: `Berhasil membuat akun ${response.data.content.name}! `,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate("/super-admin/account");
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

  const filterSchool = (inputValue) => {
    return schools.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterSchool(inputValue));
    }, 1000);
  };

  return (
    <Layout pageName="Buat Akun J-SIP Baru">
      <Stack direction="column" spacing="40px">
        <Breadcrumb items={breadcrumbItems} />
        <Box>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              role: "",
              phone_number: "",
              identity_number: "",
              school_id: "",
              position: "",
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
                            <FormErrorMessage>{errors.email}</FormErrorMessage>
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
                          <FormErrorMessage>{errors.position}</FormErrorMessage>
                        ) : null}
                      </FormControl>
                    )}
                  </Field>

                  <Field name="role">
                    {({ field }) => (
                      <FormControl
                        id="role"
                        isInvalid={errors.role !== undefined && touched.role}
                      >
                        <FormLabel fontSize="xs" color="#595959">
                          Role
                        </FormLabel>

                        <ChakraSelect {...field} placeholder="Pilih Role">
                          <option value="admin">Admin Sekolah</option>
                          <option value="verifier">Verifikator Dinas</option>
                          <option value="super_admin">Super Admin</option>
                        </ChakraSelect>
                        {errors.role && touched.role ? (
                          <FormErrorMessage>{errors.role}</FormErrorMessage>
                        ) : null}
                      </FormControl>
                    )}
                  </Field>

                  {values.role === "admin" ? (
                    <>
                      <Field name="school_id">
                        {({ field }) => (
                          <FormControl
                            id="school_id"
                            isInvalid={
                              errors.school_id !== undefined &&
                              touched.school_id
                            }
                          >
                            <FormLabel fontSize="xs" color="#595959">
                              Pilih Sekolah
                            </FormLabel>

                            <AsyncSelect
                              cacheOptions
                              loadOptions={loadOptions}
                              defaultOptions
                              placeholder="Pilih sekolah.."
                              isClearable
                              value={values?.value}
                              onChange={(event) => {
                                setFieldValue("school_id", event?.value);
                              }}
                            />

                            {/* <Select {...field} placeholder="Pilih Sekolah">
                              {schools
                                ?.sort(
                                  (a, b) => a?.school_name - b?.school_name
                                )
                                ?.map((school) => (
                                  <option value={school?.id}>
                                    {school?.school_name}
                                  </option>
                                ))}
                            </Select> */}
                            {errors.school_id && touched.school_id ? (
                              <FormErrorMessage>
                                {errors.school_id}
                              </FormErrorMessage>
                            ) : null}
                          </FormControl>
                        )}
                      </Field>
                    </>
                  ) : null}

                  <Field name="password">
                    {({ field }) => (
                      <FormControl
                        id="password"
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
                          <FormErrorMessage>{errors.password}</FormErrorMessage>
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
                    Buat Akun Baru
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
