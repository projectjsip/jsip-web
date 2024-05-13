import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Stack,
  Text,
  Spacer,
  Box,
  useToast,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import {
  fetchFinishSubmission,
} from "../../networks/libs/apply";

function ModalFinishSubmission({ id, onSuccess }) {
  const toast = useToast();
  const [isLoadingSubmission, setIsLoadingSubmission] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function onFinishSubmission() {
    setIsLoadingSubmission(true);
    await fetchFinishSubmission(localStorage.getItem("token"), id)
      .then((response) => {
        setIsLoadingSubmission(false);
        onSuccess(true);
        toast({
          position: "top",
          title: `Berhasil menyelesaikan proses pengajuan!`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((error) => {
        setIsLoadingSubmission(false);
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
    <div>
      <Button
        variant="jsip-primary"
        rightIcon={<Icon icon="bx:send" />}
        onClick={onOpen}
      >
        Selesaikan Pengajuan
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex" alignItems="center">
            <Box mr="8px">
              <Icon icon="bx:info-circle" color="green" fontSize="30px" />
            </Box>{" "}
            Selesaikan Pengajuan
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack direction="column" spacing="24px" alignItems="center">
              <Text textAlign="center">
                Anda yakin ingin menyelesaikan pengajuan?
              </Text>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button variant="secondary" mr={3} onClick={onClose}>
              Batal
            </Button>
            <Spacer />
            <Button
              colorScheme="green"
              onClick={onFinishSubmission}
              isLoading={isLoadingSubmission}
            >
              Kirim
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ModalFinishSubmission;
