import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Spacer,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { fetchUpdateSchool } from "../../networks/libs/school";

const SchoolSchema = Yup.object().shape({
  school_name: Yup.string().required("Required"),
  principal_name: Yup.string().required("Required"),
  npsn: Yup.string().required("Required"),
});

function ModalUpdateSchool({ id, onSuccess, schoolName, principalName, npsn }) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  async function createSchool(values) {
    setIsLoading(true);
    await fetchUpdateSchool(
      {
        school_name: values.school_name,
        principal_name: values.principal_name,
        npsn: values.npsn,
      },
      localStorage.getItem("token"),
      id
    )
      .then((response) => {
        onSuccess();
        setIsLoading(false);

        toast({
          position: "top",
          title: `Berhasil mengubah data Sekolah! `,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        onClose();
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
    <>
      <Button
        size="sm"
        colorScheme="green"
        leftIcon={<Icon icon="bx:edit" />}
        onClick={onOpen}
      >
        Edit
      </Button>

      <Modal size="xl" isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Data Sekolah</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                school_name: schoolName,
                principal_name: principalName,
                npsn: npsn,
              }}
              validationSchema={SchoolSchema}
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

                    <Flex direction="row" pb="10px">
                      <Button variant="outline" mr={3} onClick={onClose}>
                        Batalkan
                      </Button>
                      <Spacer />
                      <Button
                        variant="jsip-primary"
                        isLoading={isLoading}
                        _hover={{}}
                        type="submit"
                      >
                        Simpan
                      </Button>
                    </Flex>
                  </Stack>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalUpdateSchool;
