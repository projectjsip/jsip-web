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
import { fetchUpdateMetadata } from "../../networks/libs/metadata";

const MetadataSchema = Yup.object().shape({
  meta_value: Yup.string().required("Required"),
});

function ModalUpdateMetadata({ onSuccess, metaType, metaValue, label }) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  async function updateMetadata(values) {
    setIsLoading(true);
    await fetchUpdateMetadata(
      {
        meta_value: values.meta_value,
      },
      localStorage.getItem("token"),
      metaType
    )
      .then((response) => {
        onSuccess();
        setIsLoading(false);

        toast({
          position: "top",
          title: `Berhasil mengubah data Metadata! `,
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
          <ModalHeader>Update Data Pendukung</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                meta_value: metaValue,
              }}
              validationSchema={MetadataSchema}
              onSubmit={(values, actions) => {
                updateMetadata(values);
                actions.setSubmitting(false);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <Stack direction="column" spacing="24px">
                    <Field name="meta_value">
                      {({ field }) => (
                        <FormControl
                          id="meta_value"
                          isInvalid={
                            errors.meta_value !== undefined &&
                            touched.meta_value
                          }
                        >
                          <FormLabel fontSize="xs" color="#595959">
                            {label}
                          </FormLabel>

                          <Input
                            type="text"
                            placeholder="Nilai"
                            borderRadius="8px"
                            color="jsip.black"
                            _focus={{ border: "2px solid #00649A" }}
                            {...field}
                          />

                          {errors.meta_value && touched.meta_value ? (
                            <FormErrorMessage>
                              {errors.meta_value}
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

export default ModalUpdateMetadata;
